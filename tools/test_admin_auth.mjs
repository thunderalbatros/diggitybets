/**
 * tools/test_admin_auth.mjs — Regression tests for Worker admin authentication (Gate A1).
 * Reproduces the forged-header attack (any username + static public token) and verifies
 * that only HMAC-signed, unexpired tokens (or the break-glass secret) are accepted.
 *
 * Run: node tools/test_admin_auth.mjs
 */
import assert from 'node:assert/strict';
import worker, { issueAdminToken, issueUserToken } from '../worker/index.js';

const SECRET = 'unit-test-secret-0123456789abcdef';
const URL_ADMIN = 'https://diggitybets.vip/api/admin/store-redemptions';
const LEGACY_PUBLIC_TOKEN = 'diggity_stream_deck_v1';

async function call(headers, env) {
  const res = await worker.fetch(new Request(URL_ADMIN, { method: 'GET', headers }), env, {});
  return res.status;
}

async function callEndpoint(path, method, headers, body, env) {
  const res = await worker.fetch(
    new Request(`https://diggitybets.vip${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', ...headers },
      body: body ? JSON.stringify(body) : undefined
    }),
    env,
    { waitUntil() {} }
  );
  let json = null;
  try { json = await res.json(); } catch (_) {}
  return { status: res.status, json };
}

const results = [];
async function test(name, fn) {
  try {
    await fn();
    results.push({ name, ok: true });
    console.log(`  PASS  ${name}`);
  } catch (err) {
    results.push({ name, ok: false });
    console.log(`  FAIL  ${name}\n        ${err.message}`);
  }
}

const withSecret = { ADMIN_API_SECRET: SECRET };
const noSecret = {};

await test('legacy public token + arbitrary username is rejected (no secret configured)', async () => {
  assert.equal(await call({ 'x-admin-user': 'zz', 'x-admin-token': LEGACY_PUBLIC_TOKEN }, noSecret), 403);
});

await test('legacy public token + arbitrary username is rejected (secret configured)', async () => {
  assert.equal(await call({ 'x-admin-user': 'zz', 'x-admin-token': LEGACY_PUBLIC_TOKEN }, withSecret), 403);
});

await test('legacy public token + real streamer username is rejected', async () => {
  assert.equal(await call({ 'x-admin-user': 'diggitybets', 'x-admin-token': LEGACY_PUBLIC_TOKEN }, withSecret), 403);
});

await test('missing token is rejected', async () => {
  assert.equal(await call({ 'x-admin-user': 'diggitybets' }, withSecret), 403);
});

await test('fails closed when ADMIN_API_SECRET is not configured (even with a "valid-looking" token)', async () => {
  const token = await issueAdminToken({ username: 'diggitybets', kickId: 88254585 }, SECRET);
  assert.equal(await call({ 'x-admin-user': 'diggitybets', 'x-admin-token': token }, noSecret), 403);
});

await test('valid signed token for an admin is accepted', async () => {
  const token = await issueAdminToken({ username: 'diggitybets', kickId: 88254585 }, SECRET);
  assert.equal(await call({ 'x-admin-user': 'diggitybets', 'x-admin-token': token }, withSecret), 200);
});

await test('signed token for a non-admin identity is rejected', async () => {
  const token = await issueAdminToken({ username: 'randomviewer', kickId: 123 }, SECRET);
  assert.equal(await call({ 'x-admin-user': 'randomviewer', 'x-admin-token': token }, withSecret), 403);
});

await test('token signed with a different secret is rejected', async () => {
  const token = await issueAdminToken({ username: 'diggitybets', kickId: 88254585 }, 'another-secret-xxxxxxxxxxxxxxxx');
  assert.equal(await call({ 'x-admin-user': 'diggitybets', 'x-admin-token': token }, withSecret), 403);
});

await test('tampered payload is rejected', async () => {
  const token = await issueAdminToken({ username: 'randomviewer', kickId: 123 }, SECRET);
  const [, sig] = token.split('.');
  const forgedPayload = Buffer.from(JSON.stringify({ u: 'diggitybets', k: 88254585, exp: Date.now() + 3_600_000 })).toString('base64url');
  assert.equal(await call({ 'x-admin-user': 'diggitybets', 'x-admin-token': `${forgedPayload}.${sig}` }, withSecret), 403);
});

await test('expired token is rejected', async () => {
  const token = await issueAdminToken({ username: 'diggitybets', kickId: 88254585 }, SECRET, -1000);
  assert.equal(await call({ 'x-admin-user': 'diggitybets', 'x-admin-token': token }, withSecret), 403);
});

await test('break-glass: exact ADMIN_API_SECRET as token is accepted', async () => {
  assert.equal(await call({ 'x-admin-user': 'diggitybets', 'x-admin-token': SECRET }, withSecret), 200);
});

await test('cross-site Origin is rejected even with a valid token', async () => {
  const token = await issueAdminToken({ username: 'diggitybets', kickId: 88254585 }, SECRET);
  assert.equal(await call({ origin: 'https://evil.example', 'x-admin-user': 'diggitybets', 'x-admin-token': token }, withSecret), 403);
});

await test('N3: arbitrary *.workers.dev and chrome-extension:// origins are rejected', async () => {
  const token = await issueAdminToken({ username: 'diggitybets', kickId: 88254585 }, SECRET);
  assert.equal(await call({ origin: 'https://attacker.workers.dev', 'x-admin-token': token }, withSecret), 403);
  assert.equal(await call({ origin: 'chrome-extension://abcdefghijklmnop', 'x-admin-token': token }, withSecret), 403);
});

await test('N1: /api/profile/update blocks unauthenticated and cross-user IDOR wallet hijacking', async () => {
  const noAuth = await callEndpoint('/api/profile/update', 'POST', {}, { username: 'victim', crypto_ltc: 'ltc1qattacker' }, withSecret);
  assert.equal(noAuth.status, 403);

  const attackerToken = await issueUserToken({ username: 'attacker', kickId: 999 }, SECRET);
  const crossUser = await callEndpoint('/api/profile/update', 'POST', { 'x-user-token': attackerToken }, { username: 'victim', crypto_ltc: 'ltc1qattacker' }, withSecret);
  assert.equal(crossUser.status, 403);

  const victimToken = await issueUserToken({ username: 'victim', kickId: 555 }, SECRET);
  const ownUser = await callEndpoint('/api/profile/update', 'POST', { 'x-user-token': victimToken }, { username: 'victim', crypto_ltc: 'ltc1qvictim' }, withSecret);
  assert.equal(ownUser.status, 200);
});

await test('N1: /api/privacy/purge rejects forged x-admin-user header without cryptographic token', async () => {
  const forged = await callEndpoint('/api/privacy/purge', 'POST', { 'x-admin-user': 'victim' }, { username: 'victim' }, withSecret);
  assert.equal(forged.status, 403);

  const victimToken = await issueUserToken({ username: 'victim', kickId: 555 }, SECRET);
  const validPurge = await callEndpoint('/api/privacy/purge', 'POST', { 'x-user-token': victimToken }, { username: 'victim' }, withSecret);
  assert.equal(validPurge.status, 200);
});

await test('N2: all 11 stream/bot/overlay mutation endpoints reject unauthenticated POSTs', async () => {
  const protectedRoutes = [
    ['/api/kick/chat/announce', { username: 'hacker', eventType: 'battle' }],
    ['/api/sync/state', { battleState: { status: 'PWNED' } }],
    ['/api/overlay/celebration', { winner: 'hacker' }],
    ['/api/companion/capture', { action: 'AUTO_VERIFY_BOUNTY_BET', betId: 'house:123456' }],
    ['/api/battle/update', { status: 'COMPLETED' }],
    ['/api/tourney/update', { status: 'COMPLETED' }],
    ['/api/wheel/spin-complete', { winner: 'hacker', announce: true }],
    ['/api/wheel/duo/queues', { battleQueue: [] }],
    ['/api/wheel/duo/mode', { mode: 'tourney' }],
    ['/api/wheel/duo/spin', { winner: 'hacker' }],
    ['/api/hunt/spotlight/clear', {}],
    ['/api/wheel/csgo/active-pool', { chatters: ['hacker'] }]
  ];

  for (const [route, payload] of protectedRoutes) {
    const res = await callEndpoint(route, 'POST', {}, payload, withSecret);
    assert.equal(res.status, 403, `Expected 403 on unauthenticated POST ${route}, got ${res.status}`);
  }

  const adminToken = await issueAdminToken({ username: 'diggitybets', kickId: 88254585 }, SECRET);
  const adminSync = await callEndpoint('/api/sync/state', 'POST', { 'x-admin-token': adminToken }, { battleState: { status: 'LOBBY' } }, withSecret);
  assert.equal(adminSync.status, 200);
});

await test('N5: /api/store/redeem requires user session token and ignores client-spoofed stakeVerified', async () => {
  const unauthRedeem = await callEndpoint('/api/store/redeem', 'POST', {}, { username: 'viewer1', voucherTitle: '$20 Bonus Buy Split Profit (50/50)' }, withSecret);
  assert.equal(unauthRedeem.status, 403);

  const userToken = await issueUserToken({ username: 'viewer1', kickId: 777 }, SECRET);
  const spoofedVip = await callEndpoint(
    '/api/store/redeem',
    'POST',
    { 'x-user-token': userToken },
    { username: 'viewer1', voucherTitle: '$20 Bonus Buy Split Profit (50/50)', stakeVerified: true },
    withSecret
  );
  assert.equal(spoofedVip.status, 200);
  assert.equal(spoofedVip.json.effectiveCost, 3000, 'Unverified user spoofing stakeVerified:true must still be charged 3000 $DIG');
  assert.equal(spoofedVip.json.stakeVerified, false);
});

await test('Overlay & Event Rules Pipeline: 1-call max (!battle/!tourney first call wins), !guess renewal & lock, !sr max 3 active + winner spot release', async () => {
  const botSession = await issueUserToken({ username: 'DiggityBot', kickId: 12345 }, SECRET);
  const sessRes = await callEndpoint('/api/auth/session', 'GET', { cookie: `hh_session=${encodeURIComponent(botSession)}` }, null, withSecret);
  assert.equal(sessRes.status, 200);
  assert.equal(sessRes.json.isAdmin, true, 'DiggityBot must be recognized as admin');
  assert.ok(sessRes.json.adminToken, 'Session endpoint must issue adminToken for DiggityBot');

  const tarkToken = await issueAdminToken({ username: 'tarkansky', kickId: 88254585 }, SECRET);

  // 1. !battle & !tourney: strictly 1 call per spectator per event, only the FIRST call is valid
  const q1 = await callEndpoint('/api/wheel/duo/queues', 'POST', { 'x-admin-token': tarkToken }, { mode: 'battle', username: 'viewerA', slotName: 'Sky Drop' }, withSecret);
  assert.equal(q1.status, 200);
  const q2 = await callEndpoint('/api/wheel/duo/queues', 'POST', { 'x-admin-token': tarkToken }, { mode: 'battle', username: 'viewerA', slotName: 'Le Bandit' }, withSecret);
  assert.equal(q2.status, 200);
  assert.equal(q2.json.battleQueue.length, 1, 'Only 1 entry per spectator allowed in !battle');
  assert.equal(q2.json.battleQueue[0].slotName, 'Sky Drop', 'First call must remain valid and not be overwritten by second call');

  // 2. !guess: 1 active entry per spectator (renews on correction), ignored once guessesLocked is true
  await callEndpoint('/api/chat/command', 'POST', { 'x-admin-token': tarkToken }, { username: 'viewerA', content: '!guess 1200' }, withSecret);
  await callEndpoint('/api/chat/command', 'POST', { 'x-admin-token': tarkToken }, { username: 'viewerA', content: '!guess 1850' }, withSecret);
  await callEndpoint('/api/sync/state', 'POST', { 'x-admin-token': tarkToken }, { guessesLocked: true }, withSecret);
  await callEndpoint('/api/chat/command', 'POST', { 'x-admin-token': tarkToken }, { username: 'viewerA', content: '!guess 9999' }, withSecret);
  await callEndpoint('/api/chat/command', 'POST', { 'x-admin-token': tarkToken }, { username: 'viewerB', content: '!guess 500' }, withSecret);
  const syncAfterGuess = await callEndpoint('/api/sync/state', 'GET', {}, null, withSecret);
  assert.equal(syncAfterGuess.json.guesses.length, 1, 'Locked guess contest must reject new spectators');
  assert.equal(syncAfterGuess.json.guesses[0].guess, 1850, 'Renewal before lock must update to 1850, and post-lock 9999 must be ignored');

  // 3. !sr: max 3 active entries per spectator; winning on roulette frees 1 spot
  await callEndpoint('/api/chat/command', 'POST', { 'x-admin-token': tarkToken }, { username: 'viewerA', content: '!sr Sugar Rush' }, withSecret);
  await callEndpoint('/api/chat/command', 'POST', { 'x-admin-token': tarkToken }, { username: 'viewerA', content: '!sr Sweet Bonanza' }, withSecret);
  await callEndpoint('/api/chat/command', 'POST', { 'x-admin-token': tarkToken }, { username: 'viewerA', content: '!sr Gates of Olympus' }, withSecret);
  await callEndpoint('/api/chat/command', 'POST', { 'x-admin-token': tarkToken }, { username: 'viewerA', content: '!sr Wanted Dead or a Wild' }, withSecret);
  let syncSr = await callEndpoint('/api/sync/state', 'GET', {}, null, withSecret);
  assert.equal(syncSr.json.slotRequests.length, 3, 'Max 3 active !sr calls per spectator');

  // Simulate Sugar Rush winning on Roulette (removed from queue -> 2/3 active -> frees 1 spot for 4th request)
  const remainingQueue = syncSr.json.slotRequests.slice(1);
  await callEndpoint('/api/sync/state', 'POST', { 'x-admin-token': tarkToken }, { slotRequests: remainingQueue }, withSecret);
  await callEndpoint('/api/chat/command', 'POST', { 'x-admin-token': tarkToken }, { username: 'viewerA', content: '!sr Wanted Dead or a Wild' }, withSecret);
  syncSr = await callEndpoint('/api/sync/state', 'GET', {}, null, withSecret);
  assert.equal(syncSr.json.slotRequests.length, 3, 'After 1 slot wins and is removed, 1 spot is freed for a new !sr call');
  assert.equal(syncSr.json.slotRequests[2].name, 'Wanted Dead or a Wild');
});

await test('7-Day $DIG Loyalty Streak: 1-click claim works for new & existing users, progresses Day 1..7 (+50..+300), and resets to Day 1 after Day 7', async () => {
  const dbUsers = new Map();
  const mockDb = {
    prepare(sql) {
      let args = [];
      const stmt = {
        bind(...a) { args = a; return stmt; },
        async first() {
          if (/SELECT \* FROM users WHERE LOWER\(username\) = LOWER/.test(sql) || /SELECT id, kick_id, username/.test(sql)) {
            return dbUsers.get(String(args[0] || '').toLowerCase()) || null;
          }
          if (/SELECT COUNT\(\*\) AS cnt FROM users/.test(sql)) return { cnt: dbUsers.size };
          if (/SELECT COUNT\(\*\) AS higher FROM users/.test(sql)) return { higher: 0 };
          return null;
        },
        async all() {
          return { results: [...dbUsers.values()] };
        },
        async run() {
          if (/INSERT INTO users/.test(sql) && args.length >= 13) {
            const u = String(args[2]).toLowerCase();
            dbUsers.set(u, {
              id: args[0],
              kick_id: args[1],
              username: u,
              display_name: args[3],
              avatar: args[4],
              points_balance: Number(args[10] || 0),
              monthly_points: Number(args[10] || 0),
              monthly_cycle: args[5],
              tourneys_won: args[6],
              hunt_hits: args[7],
              is_sub: args[8],
              last_streak_claim_date: args[11] || '',
              streak_day: Number(args[12] || 0),
              stake_verified: 0,
              is_shadowbanned: 0,
              first_seen_at: args[9],
              last_seen_at: args[9]
            });
          } else if (/UPDATE users[\s\S]*SET display_name = \?1/.test(sql)) {
            for (const row of dbUsers.values()) {
              if (row.id === args[10]) {
                row.points_balance = Number(args[2]);
                row.monthly_points = Number(args[3]);
                row.last_streak_claim_date = String(args[8] || '');
                row.streak_day = Number(args[11] || 0);
              }
            }
          }
          return { meta: { changes: 1 } };
        }
      };
      return stmt;
    }
  };

  const envWithDb = { ...withSecret, DB: mockDb };
  const yesterdayKey = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);

  // Day 1 claim by a brand new spectator (even without OAuth token yet)
  const d1Res = await callEndpoint('/api/leaderboard/sync-user', 'POST', { origin: 'https://diggitybets.vip' }, { username: 'streakviewer', streakBonusDelta: 50, claimStreak: true }, envWithDb);
  assert.equal(d1Res.status, 200);
  assert.equal(d1Res.json.viewerProfile.pointsBalance, 50, 'Day 1 claim must award +50 $DIG');
  assert.equal(d1Res.json.viewerProfile.streakDay, 1, 'Day 1 claim must set streakDay = 1');
  assert.equal(d1Res.json.userToken, undefined, 'Unauthenticated streak claim must never mint a session token');

  // Duplicate claim on the same day must be ignored
  const dupRes = await callEndpoint('/api/leaderboard/sync-user', 'POST', { origin: 'https://diggitybets.vip' }, { username: 'streakviewer', streakBonusDelta: 50, claimStreak: true }, envWithDb);
  assert.equal(dupRes.json.viewerProfile.pointsBalance, 50, 'Second claim on same UTC day must not award extra points');

  // Simulate consecutive Days 2 through 7 (+75, +100, +125, +150, +200, +300)
  const expectedRewards = [50, 75, 100, 125, 150, 200, 300];
  let expectedBal = 50;
  for (let day = 2; day <= 7; day++) {
    dbUsers.get('streakviewer').last_streak_claim_date = yesterdayKey;
    const res = await callEndpoint('/api/leaderboard/sync-user', 'POST', { origin: 'https://diggitybets.vip' }, { username: 'streakviewer', streakBonusDelta: expectedRewards[day - 1], claimStreak: true }, envWithDb);
    expectedBal += expectedRewards[day - 1];
    assert.equal(res.json.viewerProfile.streakDay, day, `Expected streakDay = ${day}`);
    assert.equal(res.json.viewerProfile.pointsBalance, expectedBal, `Expected balance ${expectedBal} on Day ${day}`);
  }

  // Day 8 (after Day 7 completed yesterday) must automatically reset to Day 1 (+50 $DIG)
  dbUsers.get('streakviewer').last_streak_claim_date = yesterdayKey;
  const resetRes = await callEndpoint('/api/leaderboard/sync-user', 'POST', { origin: 'https://diggitybets.vip' }, { username: 'streakviewer', streakBonusDelta: 50, claimStreak: true }, envWithDb);
  expectedBal += 50;
  assert.equal(resetRes.json.viewerProfile.streakDay, 1, 'After Day 7, streak must reset to Day 1');
  assert.equal(resetRes.json.viewerProfile.pointsBalance, expectedBal, 'Reset Day 1 must award +50 $DIG');
});

await test('Spectator Privilege Isolation: @emers0n never gets isAdmin:true, overlaySyncToken never unlocks /api/auth/session', async () => {
  const emersonToken = await issueUserToken({ username: 'emers0n', kickId: 999888 }, SECRET);
  const overlayToken = await issueAdminToken({ username: 'diggitybot', kickId: 1000477168, role: 'overlay_sync' }, SECRET);

  // 1. overlaySyncToken alone must never authenticate /api/auth/session
  const overlaySess = await callEndpoint('/api/auth/session', 'GET', { 'x-admin-token': overlayToken }, null, withSecret);
  assert.equal(overlaySess.json.isAdmin, false, 'overlay_sync token must never unlock admin session');

  // 2. Spectator (@emers0n) with user token (even if stale overlay token is sent) must get isAdmin: false
  const emersonSess = await callEndpoint('/api/auth/session', 'GET', { 'x-user-token': emersonToken, 'x-admin-token': overlayToken }, null, withSecret);
  assert.equal(emersonSess.json.authenticated, true);
  assert.equal(emersonSess.json.username, 'emers0n');
  assert.equal(emersonSess.json.isAdmin, false, 'Spectator @emers0n must never receive isAdmin: true');
  assert.equal(emersonSess.json.adminToken, undefined, 'Spectator @emers0n must never receive adminToken');
});

const failed = results.filter((r) => !r.ok).length;
console.log(`\nAdmin & Endpoint Auth tests: ${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
