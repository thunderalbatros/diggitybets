import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BattleManager } from '../src/battles/battle-manager.ts';
import { TournamentManager } from '../src/tournament/tournament-manager.ts';
import { HuntHubDatabase } from '../src/db/database.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const testDbPath = path.resolve(__dirname, 'test_phase3.db');

try { if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath); } catch {}

console.log('--- Running Phase 3: Bonus Buy vs Spins Modes & King of the Hill Tests ---');

// ============================================================================
// 1. BattleManager: BONUS_BUY vs SPINS Modes
// ============================================================================
console.log('\n[Test 1] BattleManager: BONUS_BUY Mode (2.01x vs 1.01x comparison)...');
const battleMgr = new BattleManager();
assert.equal(battleMgr.getState().gameMode, 'BONUS_BUY');

battleMgr.openLobby(10, '$50 Bonus Buy Duel', 'BONUS_BUY');
const p1Join = battleMgr.joinLobby(
  { id: 'u1', kickId: 101, username: 'SlotMaster', displayName: 'SlotMaster' },
  { name: 'Wanted Dead or a Wild' }
);
const p2Join = battleMgr.joinLobby(
  { id: 'u2', kickId: 102, username: 'GatesGod', displayName: 'GatesGod' },
  { name: 'Gates of Olympus 1000' }
);
assert.equal(p1Join.success, true);
assert.equal(p2Join.success, true);
assert.equal(battleMgr.getState().status, 'READY');

// Set multipliers: Player A = 2.01x vs Player B = 1.01x
battleMgr.setPlayerMultiplier('A', 2.01);
battleMgr.setPlayerMultiplier('B', 1.01);
assert.equal(battleMgr.getState().playerA?.multiplier, 2.01);
assert.equal(battleMgr.getState().playerB?.multiplier, 1.01);

// Auto-resolve: 2.01 > 1.01 -> Player A is WINNER, Player B is LOSER
const resolvedBuy = battleMgr.resolveBattle();
assert.equal(resolvedBuy.winner, 'A');
assert.equal(resolvedBuy.playerA?.result, 'WINNER');
assert.equal(resolvedBuy.playerB?.result, 'LOSER');
console.log('  ✓ 2.01x vs 1.01x correctly resolves Player A as WINNER and Player B as LOSER.');

console.log('\n[Test 2] BattleManager: SPINS Mode (1-Click Winner Resolution)...');
battleMgr.setGameMode('SPINS');
assert.equal(battleMgr.getState().gameMode, 'SPINS');

// Open a fresh lobby without KotH for a pure 1v1 spins test
battleMgr.setKothActive(false);
battleMgr.openLobby(10, '1v1 Quick Spins', 'SPINS');
battleMgr.joinLobby(
  { id: 'u3', kickId: 103, username: 'SpinPro', displayName: 'SpinPro' },
  { name: 'Le Bandit' }
);
battleMgr.joinLobby(
  { id: 'u4', kickId: 104, username: 'RipCityDude', displayName: 'RipCityDude' },
  { name: 'RIP City' }
);

// Streamer clicks [ 🏆 Winner ] for Player B directly
const resolvedSpins = battleMgr.resolveWinnerDirectly('B');
assert.equal(resolvedSpins.winner, 'B');
assert.equal(resolvedSpins.playerB?.result, 'WINNER');
assert.equal(resolvedSpins.playerA?.result, 'LOSER');
console.log('  ✓ SPINS mode: 1-click winner resolution directly marks chosen player WINNER and rival LOSER.');

// ============================================================================
// 2. TournamentManager: 8-Bracket in BONUS_BUY vs SPINS Modes
// ============================================================================
console.log('\n[Test 3] TournamentManager: BONUS_BUY score comparison vs SPINS 1-click advance...');
const tourney = new TournamentManager();
assert.equal(tourney.getState().gameMode, 'BONUS_BUY');

tourney.openLobby('8-Bracket Test', 10, '$100');

// Fill 8 players
for (let i = 1; i <= 8; i++) {
  const res = tourney.joinLobby(
    { id: `u_${i}`, kickId: 200 + i, username: `Competitor${i}`, displayName: `Competitor${i}` },
    `Slot_${i}`
  );
  assert.equal(res.success, true);
}
assert.equal(tourney.getState().participants.length, 8);
assert.equal(tourney.getState().status, 'IN_PROGRESS');

// Match 1 (Quarterfinal 1): BONUS_BUY mode with 2.01 vs 1.01
const m1Before = tourney.getState().matches.find(m => m.id === 'm1');
assert.ok(m1Before?.player1 && m1Before?.player2);
const expectedP1 = m1Before.player1;
const expectedP2 = m1Before.player2;

tourney.setMatchResult('m1', 2.01, 1.01);
const m1 = tourney.getState().matches.find(m => m.id === 'm1');
assert.equal(m1?.status, 'FINISHED');
assert.equal(m1?.winner?.kickId, expectedP1.kickId);
assert.equal(m1?.loser?.kickId, expectedP2.kickId);
// Winner advances to Semifinal 1 (m5 player 1)
const m5 = tourney.getState().matches.find(m => m.id === 'm5');
assert.equal(m5?.player1?.kickId, expectedP1.kickId);
console.log('  ✓ Tournament QF1 (BONUS_BUY): 2.01 > 1.01 advances winner to Semifinal 1.');

// Switch Tournament to SPINS mode for Match 2
tourney.setGameMode('SPINS');
assert.equal(tourney.getState().gameMode, 'SPINS');

// Match 2 (Quarterfinal 2): SPINS mode 1-click winner
const m2Before = tourney.getState().matches.find(m => m.id === 'm2');
const p2Competitor = m2Before?.player2; // Competitor 5
assert.ok(p2Competitor);

tourney.setMatchWinnerDirectly('m2', 'player2');
const m2After = tourney.getState().matches.find(m => m.id === 'm2');
assert.equal(m2After?.status, 'FINISHED');
assert.equal(m2After?.winner?.kickId, p2Competitor?.kickId);
assert.equal(m2After?.loser?.kickId, m2Before?.player1?.kickId);

// Winner of m2 advances to Semifinal 1 (m5 player 2)
const m5After = tourney.getState().matches.find(m => m.id === 'm5');
assert.equal(m5After?.player2?.kickId, p2Competitor?.kickId);
assert.equal(m5After?.status, 'RUNNING'); // Both QF1 and QF2 winners present
console.log('  ✓ Tournament QF2 (SPINS): 1-click winner advances competitor to Semifinal 1.');

// ============================================================================
// 3. King of the Hill (KotH): Streak 1 -> 2 -> 3 -> 4, Retirement & $20 Prize
// ============================================================================
console.log('\n[Test 4] King of the Hill: Streak progression 1 -> 2 -> 3 and Voluntary Cashout...');
const kothMgr = new BattleManager();
kothMgr.setKothActive(true);
assert.equal(kothMgr.getState().kothActive, true);
assert.equal(kothMgr.getState().currentStreak, 0);
assert.equal(kothMgr.getState().reigningKing, null);

// Match 1: Challenger Alpha vs Challenger Beta
kothMgr.openLobby(10, 'King of the Hill 1v1');
kothMgr.joinLobby(
  { id: 'kingA', kickId: 301, username: 'IronKing', displayName: 'IronKing' },
  { name: 'Gates of Olympus' }
);
kothMgr.joinLobby(
  { id: 'chalB', kickId: 302, username: 'Challenger1', displayName: 'Challenger1' },
  { name: 'Sweet Bonanza' }
);

// Alpha wins Match 1
kothMgr.setPlayerMultiplier('A', 5.50);
kothMgr.setPlayerMultiplier('B', 1.20);
kothMgr.resolveBattle();

const state1 = kothMgr.getState();
assert.equal(state1.reigningKing?.kickId, 301);
assert.equal(state1.currentStreak, 1);
assert.equal(state1.awaitingKingDecision, true);
assert.equal(state1.lastWinnerPrizeAwarded, false);
console.log('  ✓ Victory 1/4: IronKing is reigningKing, streak = 1/4, awaiting decision.');

// King decides to continue (defend throne)
kothMgr.kingDecideContinue();
const stateAfterCont1 = kothMgr.getState();
assert.equal(stateAfterCont1.awaitingKingDecision, false);
assert.equal(stateAfterCont1.playerA?.kickId, 301);
assert.equal(stateAfterCont1.playerB, null); // Challenger seat open!
assert.equal(stateAfterCont1.status, 'LOBBY');

// Match 2: Challenger 2 joins seat B
kothMgr.joinLobby(
  { id: 'chalC', kickId: 303, username: 'Challenger2', displayName: 'Challenger2' },
  { name: 'Tombstone RIP' }
);
assert.equal(kothMgr.getState().status, 'READY');

// IronKing wins Match 2
kothMgr.resolveWinnerDirectly('A');
const state2 = kothMgr.getState();
assert.equal(state2.currentStreak, 2);
assert.equal(state2.awaitingKingDecision, true);
console.log('  ✓ Victory 2/4: IronKing streak = 2/4, awaiting decision.');

// King continues again to Match 3
kothMgr.kingDecideContinue();
kothMgr.joinLobby(
  { id: 'chalD', kickId: 304, username: 'Challenger3', displayName: 'Challenger3' },
  { name: 'Chaos Crew 2' }
);
kothMgr.resolveWinnerDirectly('A');
const state3 = kothMgr.getState();
assert.equal(state3.currentStreak, 3);
assert.equal(state3.awaitingKingDecision, true);
console.log('  ✓ Victory 3/4: IronKing streak = 3/4, awaiting decision.');

// TEST VOLUNTARY CASHOUT / RETIREMENT AT 3 WINS
const retireRes = kothMgr.kingDecideRetire();
assert.equal(retireRes.retiredKing?.username, 'IronKing');
assert.equal(retireRes.streak, 3);
assert.equal(kothMgr.getState().currentStreak, 0);
assert.equal(kothMgr.getState().reigningKing, null);
assert.equal(kothMgr.getState().playerA, null);
assert.equal(kothMgr.getState().playerB, null);
console.log('  ✓ Voluntary Cashout: King safely retired with 3 wins, throne cleanly reset.');

// ============================================================================
// 4. King of the Hill: 4-Streak Grand Champion ($20 Prize Auto-Award)
// ============================================================================
console.log('\n[Test 5] King of the Hill: 4-Streak Champion Run & Automatic $20 Prize...');
const champMgr = new BattleManager();
champMgr.setKothActive(true);

// Round 1
champMgr.openLobby(10, 'KotH Championship Run');
champMgr.joinLobby({ id: 'uChamp', kickId: 999, username: 'DiggityKing' }, { name: 'Wanted' });
champMgr.joinLobby({ id: 'uFodder1', kickId: 801, username: 'Fodder1' }, { name: 'Slot1' });
champMgr.resolveWinnerDirectly('A');
assert.equal(champMgr.getState().currentStreak, 1);

// Round 2
champMgr.kingDecideContinue();
champMgr.joinLobby({ id: 'uFodder2', kickId: 802, username: 'Fodder2' }, { name: 'Slot2' });
champMgr.resolveWinnerDirectly('A');
assert.equal(champMgr.getState().currentStreak, 2);

// Round 3
champMgr.kingDecideContinue();
champMgr.joinLobby({ id: 'uFodder3', kickId: 803, username: 'Fodder3' }, { name: 'Slot3' });
champMgr.resolveWinnerDirectly('A');
assert.equal(champMgr.getState().currentStreak, 3);

// Round 4 (Championship Match)
champMgr.kingDecideContinue();
champMgr.joinLobby({ id: 'uFodder4', kickId: 804, username: 'Fodder4' }, { name: 'Slot4' });
champMgr.resolveWinnerDirectly('A');

const champState = champMgr.getState();
assert.equal(champState.currentStreak, 4);
assert.equal(champState.lastWinnerPrizeAwarded, true);
assert.equal(champState.awaitingKingDecision, false); // No further decisions needed: they reached the cap!
console.log('  ✓ 4-Streak Champion: currentStreak = 4/4, lastWinnerPrizeAwarded = true.');

// ============================================================================
// 5. Database: Automatic $20 Prize Redemption Creation in Store Redemptions
// ============================================================================
console.log('\n[Test 6] Database: createKothPrizeRedemption auto-logging to Admin Tab 1...');
const db = new HuntHubDatabase(testDbPath);

// Setup user with crypto payout addresses
const champUser = db.upsertUser(999, 'DiggityKing');
db.updateUserProfile(champUser.id, {
  stake_username: 'DiggityKingStake',
  crypto_ltc: 'ltc1q98f4jd82kjs...',
  crypto_sol: 'SoL9999999999999...'
});

// Auto-record KotH $20 prize
const redemption = db.createKothPrizeRedemption(
  { id: champUser.id, kickId: 999, username: 'DiggityKing' },
  'King of the Hill - $20 Cashout (4 Streak Champion)'
);

assert.ok(redemption.id);
assert.equal(redemption.kick_username, 'DiggityKing');
assert.equal(redemption.cost_points, 0); // Spectator-free! No points deducted
assert.equal(redemption.status, 'PENDING');
assert.equal(redemption.voucher_title, 'King of the Hill - $20 Cashout (4 Streak Champion)');

// Verify it appears in streamer Admin Hub Tab 1 redemptions queue with joined crypto addresses
const pendingClaims = db.getStoreRedemptions('PENDING');
const foundClaim = pendingClaims.find(c => c.id === redemption.id);
assert.ok(foundClaim);
assert.equal(foundClaim.stake_username, 'DiggityKingStake');
assert.equal(foundClaim.crypto_ltc, 'ltc1q98f4jd82kjs...');
assert.equal(foundClaim.crypto_sol, 'SoL9999999999999...');

// Streamer approves $20 payout with 1-click in Admin Hub
const approveRes = db.approveStoreRedemption(foundClaim.id);
assert.equal(approveRes.success, true);
const fulfilledClaims = db.getStoreRedemptions('FULFILLED');
assert.ok(fulfilledClaims.find(c => c.id === redemption.id));
console.log('  ✓ $20 KotH prize redemption logged into store_redemptions table with 1-click crypto wallets.');

try { fs.unlinkSync(testDbPath); } catch {}

console.log('\n======================================================');
console.log('🎉 ALL PHASE 3 TESTS PASSED (100% SUCCESS)');
console.log('======================================================\n');
