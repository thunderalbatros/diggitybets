import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import { HuntHubDatabase } from '../src/db/database.ts';
import { OverlayServer } from '../src/hub/overlay-server.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');

async function requestJson(url: string, method = 'GET', body?: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : undefined;
    const req = http.request(
      url,
      {
        method,
        headers: data
          ? {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(data),
            }
          : {},
      },
      (res) => {
        let respBody = '';
        res.on('data', (c) => (respBody += c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(respBody));
          } catch {
            resolve(respBody);
          }
        });
      }
    );
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function runPhase6Tests() {
  console.log('\n--- Running Phase 6: $DIG Economy, Weekly Store Stock, House Games Shield & Stake Vector SVG Tests ---');

  const db = new HuntHubDatabase(':memory:');

  // =========================================================================
  // 1. Controlled Emission with "Live-Stream Gate" (Max 100 $DIG / hour)
  // =========================================================================
  console.log('• Testing Live-Stream Gate, Chat-to-Earn (+5/5m, max 60/h), Watch-to-Earn (+10/15m, max 40/h) & Channel Points (100 $DIG/session) ...');

  const baseTime = 1_750_000_000_000;

  // 1a. Stream Offline blocks both Chat-to-Earn and Watch-to-Earn
  db.setStreamLive(false);
  assert.strictEqual(db.isStreamLive(), false, 'Stream should be offline');

  const offlineChat = db.recordChatEarn(9001, 'viewer_one', 'vamos diggity buen bono!', baseTime);
  assert.strictEqual(offlineChat.awarded, false);
  assert.strictEqual(offlineChat.reason, 'STREAM_OFFLINE');

  const offlineWatch = db.recordWatchHeartbeat('viewer_one', baseTime);
  assert.strictEqual(offlineWatch.awarded, false);
  assert.strictEqual(offlineWatch.reason, 'STREAM_OFFLINE');
  assert.strictEqual(db.getUserByUsername('viewer_one')?.points_balance, 0, 'Zero points awarded while stream is offline');

  // 1b. Enable Live-Stream Gate
  db.setStreamLive(true, 'live_session_test_1');
  assert.strictEqual(db.isStreamLive(), true);
  assert.strictEqual(db.getStreamSessionId(), 'live_session_test_1');

  // Emote-only messages must not earn Chat-to-Earn
  const emoteOnly = db.recordChatEarn(9001, 'viewer_one', ':emote123: :kekw:', baseTime);
  assert.strictEqual(emoteOnly.awarded, false);
  assert.strictEqual(emoteOnly.reason, 'EMOTE_OR_SPAM');

  // Valid organic chat message awards +5 $DIG
  const chat1 = db.recordChatEarn(9001, 'viewer_one', 'tremendo multiplicador en gates!', baseTime);
  assert.strictEqual(chat1.awarded, true);
  assert.strictEqual(chat1.amount, 5);
  assert.strictEqual(chat1.newBalance, 5);

  // Cooldown check (< 5 minutes = 300_000 ms)
  const chatCooldown = db.recordChatEarn(9001, 'viewer_one', 'otro mensaje antes de 5 min', baseTime + 120_000);
  assert.strictEqual(chatCooldown.awarded, false);
  assert.strictEqual(chatCooldown.reason, 'CHAT_COOLDOWN_5M');

  // Accumulate remaining 11 chat rewards in the same hour (total 12 * 5 = 60 $DIG)
  for (let i = 1; i < 12; i++) {
    const res = db.recordChatEarn(9001, 'viewer_one', `mensaje organico numero ${i}`, baseTime + i * 300_000);
    assert.strictEqual(res.awarded, true, `Chat #${i + 1} should award +5 $DIG`);
  }
  assert.strictEqual(db.getUserByUsername('viewer_one')?.points_balance, 60, 'User should have 60 $DIG from 12 chats in 1 hour');

  // Watch-to-Earn (+10 $DIG every 15m = 900_000 ms, max 40 $DIG/h)
  for (let w = 0; w < 4; w++) {
    const wRes = db.recordWatchHeartbeat('viewer_one', baseTime + w * 900_000);
    assert.strictEqual(wRes.awarded, true, `Watch heartbeat #${w + 1} should award +10 $DIG`);
    assert.strictEqual(wRes.amount, 10);
  }
  assert.strictEqual(db.getUserByUsername('viewer_one')?.points_balance, 100, 'Combined Chat (60) + Watch (40) = 100 $DIG/hour');

  // Cooldown check on Watch-to-Earn
  const watchCooldown = db.recordWatchHeartbeat('viewer_one', baseTime + 3 * 900_000 + 60_000);
  assert.strictEqual(watchCooldown.awarded, false);
  assert.strictEqual(watchCooldown.reason, 'WATCH_COOLDOWN_15M');

  // 1c. Channel Points Bridge: 100 $DIG and max 1 redemption per stream session per user
  const cp1 = db.processChannelPointRedemption('kick_cp_001', 'reward_100_dig', 9002, 'cp_tester');
  assert.strictEqual(cp1.alreadyProcessed, false);
  assert.strictEqual(cp1.sessionLimitReached, false);
  assert.strictEqual(cp1.newBalance, 100, 'Channel Points bridge must credit exactly 100 $DIG');

  // Duplicate redemptionId is idempotent
  const cpDup = db.processChannelPointRedemption('kick_cp_001', 'reward_100_dig', 9002, 'cp_tester');
  assert.strictEqual(cpDup.alreadyProcessed, true);

  // Second distinct redemption in the SAME stream session is blocked
  const cpSecondSameSession = db.processChannelPointRedemption('kick_cp_002', 'reward_100_dig', 9002, 'cp_tester');
  assert.strictEqual(cpSecondSameSession.alreadyProcessed, false);
  assert.strictEqual(cpSecondSameSession.sessionLimitReached, true);
  assert.strictEqual(db.getUserByKickId(9002)?.points_balance, 100, 'Balance remains 100 $DIG during same stream session');

  // Starting a NEW stream session allows another redemption
  db.setStreamLive(true, 'live_session_test_2');
  const cpNewSession = db.processChannelPointRedemption('kick_cp_003', 'reward_100_dig', 9002, 'cp_tester');
  assert.strictEqual(cpNewSession.alreadyProcessed, false);
  assert.strictEqual(cpNewSession.sessionLimitReached, false);
  assert.strictEqual(cpNewSession.newBalance, 200);
  console.log('  ✓ Live-Stream Gate, Chat-to-Earn (60/h), Watch-to-Earn (40/h) & Channel Points (100/session) verified');

  // =========================================================================
  // 2. Store Prices, Weekly Stock Limits & Stake VIP Discount
  // =========================================================================
  console.log('• Testing Store Prices, Weekly Stock Limits (2/week), Cooldowns (14d) & Stake VIP Discount (4,000 vs 6,000 $DIG) ...');

  const regularUser = db.upsertUser(9003, 'regular_buyer');
  const vipUser = db.upsertUser(9004, 'vip_stake_buyer');
  const thirdUser = db.upsertUser(9005, 'third_buyer');

  db.creditPoints(regularUser.id, 25000, 'TEST_FUND');
  db.creditPoints(vipUser.id, 25000, 'TEST_FUND');
  db.creditPoints(thirdUser.id, 25000, 'TEST_FUND');

  // Mark vip_stake_buyer as Stake Affiliate Verified under code diggitybets
  db.db.prepare('UPDATE users SET stake_username = ?, stake_verified = 1 WHERE id = ?').run('vip_stake_acc', vipUser.id);

  // 2a. Weekly Raffle: 50 $DIG per ticket (Unlimited stock)
  const raffleRes = db.buyRaffleTickets(regularUser.id, regularUser.username, 3);
  assert.strictEqual(raffleRes.success, true);
  assert.strictEqual(raffleRes.totalTickets, 3);
  assert.strictEqual(db.getUserById(regularUser.id)?.points_balance, 24850, '3 Raffle tickets must cost 150 $DIG (50 $DIG each)');

  // 2b. VIP Streamer Discord Role: 500 $DIG (Max 1x per account)
  const vipRole1 = db.createStoreRedemption(regularUser.id, regularUser.username, 'VIP Streamer Discord Role', 500);
  assert.strictEqual(vipRole1.success, true);
  assert.strictEqual(vipRole1.effectiveCost, 500);
  assert.strictEqual(db.getUserById(regularUser.id)?.points_balance, 24350);

  const vipRole2 = db.createStoreRedemption(regularUser.id, regularUser.username, 'VIP Streamer Discord Role', 500);
  assert.strictEqual(vipRole2.success, false);
  assert.ok(vipRole2.error?.includes('LIMIT REACHED'), 'VIP Discord Role must be limited to 1x per account');

  // 2c. Guaranteed 1v1 Battle Entry: 1,000 $DIG (weekly_stock_limit = 6, 14-day cooldown per user)
  const battle1 = db.createStoreRedemption(regularUser.id, regularUser.username, 'Guaranteed 1v1 Battle Entry', 1000);
  assert.strictEqual(battle1.success, true);
  assert.strictEqual(battle1.effectiveCost, 1000);
  assert.strictEqual(battle1.remainingStock, 5);

  // Same user trying again within 14 days gets COOLDOWN ACTIVE
  const battleSameUser = db.createStoreRedemption(regularUser.id, regularUser.username, 'Guaranteed 1v1 Battle Entry', 1000);
  assert.strictEqual(battleSameUser.success, false);
  assert.ok(battleSameUser.error?.includes('COOLDOWN ACTIVE'), '1v1 Battle Entry must enforce 14-day cooldown per user');

  // Second user buys the 2nd weekly unit of 1v1 Battle Entry (VIP user pays 800 $DIG)
  const battle2 = db.createStoreRedemption(vipUser.id, vipUser.username, 'Guaranteed 1v1 Battle Entry', 1000);
  assert.strictEqual(battle2.success, true);
  assert.strictEqual(battle2.effectiveCost, 800);
  assert.strictEqual(battle2.remainingStock, 4);

  // 4 additional users buy up the remaining 4 units
  for (let i = 0; i < 4; i++) {
    const u = db.upsertUser(9100 + i, `battle_buyer_${i}`);
    db.creditPoints(u.id, 5000, 'TEST_FUND');
    const res = db.createStoreRedemption(u.id, u.username, 'Guaranteed 1v1 Battle Entry', 1000);
    assert.strictEqual(res.success, true);
  }

  // 7th purchase attempt in same week -> SOLD OUT THIS WEEK!
  const battle7 = db.createStoreRedemption(thirdUser.id, thirdUser.username, 'Guaranteed 1v1 Battle Entry', 1000);
  assert.strictEqual(battle7.success, false);
  assert.ok(battle7.error?.includes('SOLD OUT THIS WEEK'), '1v1 Battle Entry must block 7th purchase in same week');

  // 2d. Guaranteed 8-Bracket Tourney Entry: 1,500 $DIG regular / 1,200 $DIG VIP (weekly_stock_limit = 6)
  const tourney1 = db.createStoreRedemption(regularUser.id, regularUser.username, 'Guaranteed 8-Bracket Tourney Entry', 1500);
  assert.strictEqual(tourney1.success, true);
  assert.strictEqual(tourney1.effectiveCost, 1500);
  assert.strictEqual(tourney1.remainingStock, 5);

  // VIP user gets 1,200 $DIG
  const tourney2 = db.createStoreRedemption(vipUser.id, vipUser.username, 'Guaranteed 8-Bracket Tourney Entry', 1500);
  assert.strictEqual(tourney2.success, true);
  assert.strictEqual(tourney2.effectiveCost, 1200);
  assert.strictEqual(tourney2.remainingStock, 4);

  // 4 additional users buy up the remaining 4 units
  for (let i = 0; i < 4; i++) {
    const u = db.upsertUser(9200 + i, `tourney_buyer_${i}`);
    db.creditPoints(u.id, 5000, 'TEST_FUND');
    const res = db.createStoreRedemption(u.id, u.username, 'Guaranteed 8-Bracket Tourney Entry', 1500);
    assert.strictEqual(res.success, true);
  }

  // 7th purchase attempt -> SOLD OUT THIS WEEK!
  const tourney7 = db.createStoreRedemption(thirdUser.id, thirdUser.username, 'Guaranteed 8-Bracket Tourney Entry', 1500);
  assert.strictEqual(tourney7.success, false);
  assert.ok(tourney7.error?.includes('SOLD OUT THIS WEEK'), '8-Bracket Tourney Entry must block 7th purchase in same week');

  // 2e. $20 Bonus Buy Split Profit (50/50): 3,000 $DIG regular vs 2,400 $DIG Stake VIP (weekly_stock_limit = 3)
  const splitRegBefore = db.getUserById(regularUser.id)!.points_balance;
  const splitRegular = db.createStoreRedemption(regularUser.id, regularUser.username, '$20 Bonus Buy Split Profit (50/50)', 3000);
  assert.strictEqual(splitRegular.success, true);
  assert.strictEqual(splitRegular.effectiveCost, 3000);
  assert.strictEqual(splitRegular.remainingStock, 2);
  assert.strictEqual(db.getUserById(regularUser.id)!.points_balance, splitRegBefore - 3000, 'Regular user pays 3,000 $DIG');

  const splitVipBefore = db.getUserById(vipUser.id)!.points_balance;
  const splitVip = db.createStoreRedemption(vipUser.id, vipUser.username, '$20 Bonus Buy Split Profit (50/50)', 3000);
  assert.strictEqual(splitVip.success, true);
  assert.strictEqual(splitVip.effectiveCost, 2400, 'Stake-verified VIP user automatically pays 2,400 $DIG');
  assert.strictEqual(splitVip.remainingStock, 1);
  assert.strictEqual(db.getUserById(vipUser.id)!.points_balance, splitVipBefore - 2400);

  // 3rd weekly unit of $20 Bonus Buy Split Profit
  const split3 = db.createStoreRedemption(thirdUser.id, thirdUser.username, '$20 Bonus Buy Split Profit (50/50)', 3000);
  assert.strictEqual(split3.success, true);
  assert.strictEqual(split3.remainingStock, 0);

  // 4th weekly attempt on $20 Bonus Buy Split Profit is blocked
  const fourthUser = db.upsertUser(9006, 'fourth_buyer');
  db.creditPoints(fourthUser.id, 5000, 'TEST_FUND');
  const split4 = db.createStoreRedemption(fourthUser.id, fourthUser.username, '$20 Bonus Buy Split Profit (50/50)', 3000);
  assert.strictEqual(split4.success, false);
  assert.ok(split4.error?.includes('SOLD OUT THIS WEEK'));
  console.log('  ✓ Store Catalog prices, weekly stock limits (6/6 and 3/3), 14-day cooldown, and Stake VIP discount verified');

  // =========================================================================
  // 3. Anti-Exploit Shield in #house-games (95% RTP, Max Bet 50, Max Win 500)
  // =========================================================================
  console.log('• Testing Anti-Exploit Shield in #house-games (RTP 95.00%, MAX BET = 50 $DIG, MAX WIN CAP = 500 $DIG) ...');

  const hrUser = db.upsertUser(9010, 'high_roller');
  db.creditPoints(hrUser.id, 1000, 'TEST_FUND');

  // Rejects bet > 50 $DIG
  const overMaxBet = db.processHouseGameBet('high_roller', 'limbo', 51, 2.0);
  assert.strictEqual(overMaxBet.success, false);
  assert.ok(overMaxBet.error?.includes('MAX_BET_EXCEEDED'));
  assert.strictEqual(db.getUserByUsername('high_roller')?.points_balance, 1000);

  // Caps net profit at +500 $DIG (50 $DIG bet hitting 100x = 5,000 gross -> capped at 50 + 500 = 550 gross)
  const bigHit = db.processHouseGameBet('high_roller', 'limbo', 50, 100);
  assert.strictEqual(bigHit.success, true);
  assert.strictEqual(bigHit.rtp, 95.0);
  assert.strictEqual(bigHit.cappedPayout, 550, 'Gross payout must be capped at bet (50) + maxWinCap (500) = 550 $DIG');
  assert.strictEqual(bigHit.netProfit, 500, 'Net profit must never exceed +500 $DIG');
  assert.strictEqual(bigHit.newBalance, 1500);
  console.log('  ✓ Backend processHouseGameBet enforces 95.00% RTP, MAX_BET = 50 $DIG, and MAX_WIN_CAP = 500 $DIG net');

  // =========================================================================
  // 4. HTTP Endpoints on OverlayServer (/api/store/stock, /api/watch/heartbeat, /api/games/bet)
  // =========================================================================
  console.log('• Testing OverlayServer HTTP Endpoints for Phase 6 ...');

  const testPort = 3966;
  const server = new OverlayServer({ port: testPort, db });
  await new Promise((r) => setTimeout(r, 150));

  try {
    const stockResp = await requestJson(`http://127.0.0.1:${testPort}/api/store/stock?username=vip_stake_buyer`);
    assert.ok(Array.isArray(stockResp.catalog), 'Stock endpoint must return catalog array');
    const splitItem = stockResp.catalog.find((c: any) => c.key === 'bonus_split_20');
    assert.ok(splitItem, 'bonus_split_20 must exist in catalog');
    assert.strictEqual(splitItem.effectiveCost, 2400, 'VIP user gets 2,400 $DIG effective cost in catalog endpoint');
    assert.strictEqual(splitItem.remainingStock, 0);
    assert.strictEqual(splitItem.soldOut, true);

    const hbResp = await requestJson(`http://127.0.0.1:${testPort}/api/watch/heartbeat`, 'POST', {
      username: 'http_watcher',
    });
    assert.strictEqual(hbResp.awarded, true);
    assert.strictEqual(hbResp.amount, 10);
    assert.strictEqual(hbResp.newBalance, 10);

    const betResp = await requestJson(`http://127.0.0.1:${testPort}/api/games/bet`, 'POST', {
      username: 'high_roller',
      game: 'plinko',
      betAmount: 60,
      rawMultiplier: 2.0,
    });
    assert.strictEqual(betResp.success, false);
    assert.ok(betResp.error?.includes('MAX_BET_EXCEEDED'));
    console.log('  ✓ OverlayServer HTTP endpoints (/api/store/stock, /api/watch/heartbeat, /api/games/bet) verified');
  } finally {
    server.close();
  }

  // =========================================================================
  // 5. Frontend DOM, House Games Code & Transparent Vector Stake SVG Checks
  // =========================================================================
  console.log('• Testing Frontend HTML/JS/CSS for Store Stock Pills, 95% RTP House Games & Transparent Stake SVG ...');

  const indexHtml = fs.readFileSync(path.join(repoRoot, 'index.html'), 'utf8');
  assert.ok(!indexHtml.includes('stake-promo-logo.png'), 'index.html must NOT reference raster stake-promo-logo.png');
  assert.ok(indexHtml.includes('social-logo-stake'), 'index.html must include transparent vector <svg class="... social-logo-stake">');
  assert.ok(indexHtml.includes('data-stock-pill="battle_entry"'), 'index.html must include weekly stock pill for 1v1 Battle');
  assert.ok(indexHtml.includes('data-stock-pill="tourney_entry"'), 'index.html must include weekly stock pill for 8-Bracket Tourney');
  assert.ok(indexHtml.includes('data-stock-pill="bonus_split_20"'), 'index.html must include weekly stock pill for $20 Bonus Buy Split');
  assert.ok(indexHtml.includes('id="bonus-split-vip-tag"'), 'index.html must include Stake VIP discount badge on $20 Split card');
  assert.ok(indexHtml.includes('95.00% RTP · Max Bet 50 $DIG · Max Win 500 $DIG'), 'index.html must display Phase 6 RTP and caps in #house-games');

  const houseGamesJs = fs.readFileSync(path.join(repoRoot, 'site', 'js', 'house-games.js'), 'utf8');
  assert.ok(houseGamesJs.includes('this.rtp = 95.00;'), 'house-games.js must set this.rtp = 95.00');
  assert.ok(houseGamesJs.includes('this.maxBet = 50;'), 'house-games.js must set this.maxBet = 50');
  assert.ok(houseGamesJs.includes('this.maxWinCap = 500;'), 'house-games.js must set this.maxWinCap = 500');
  assert.ok(houseGamesJs.includes('capGrossPayout('), 'house-games.js must enforce capGrossPayout across games');

  const provablyFairJs = fs.readFileSync(path.join(repoRoot, 'site', 'js', 'provably-fair.js'), 'utf8');
  assert.ok(provablyFairJs.includes('0.95 / (1.0 - float)'), 'provably-fair.js Crash formula must use 0.95 (95% RTP)');
  assert.ok(provablyFairJs.includes('0.95 / float'), 'provably-fair.js Limbo formula must use 0.95 (95% RTP)');

  console.log('  ✓ Frontend HTML, Stake SVG vector logo, Store Stock pills, and 95% RTP House Games verified');
  console.log('✅ ALL PHASE 6 TESTS PASSED!\n');
}

runPhase6Tests().catch((err) => {
  console.error('❌ Phase 6 tests failed:', err);
  process.exit(1);
});
