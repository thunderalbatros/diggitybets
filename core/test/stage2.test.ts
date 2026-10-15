import assert from 'node:assert/strict';
import { BattleManager } from '../src/battles/battle-manager.ts';
import { TournamentManager } from '../src/tournament/tournament-manager.ts';

console.log('--- Running Stage 2 Battle & Tournament Engine Tests ---');

// ==========================================
// Test Suite 1: Battle Manager (1v1)
// ==========================================
console.log('[Battle Test 1] Initialization & Open Lobby...');
const battle = new BattleManager();
assert.equal(battle.getState().status, 'IDLE');

battle.openLobby(20, '$100 Tip');
assert.equal(battle.getState().status, 'LOBBY');
assert.equal(battle.getState().betAmount, 20);

console.log('[Battle Test 2] Players Join Lobby...');
const joinA = battle.joinLobby(
  { id: 'u1', kickId: 101, username: 'PlayerOne', displayName: 'Player One' },
  { name: 'Wanted Dead or a Wild', provider: 'Hacksaw Gaming' }
);
assert.equal(joinA.success, true);
assert.equal(joinA.playerSlot, 'A');
assert.equal(battle.getState().status, 'LOBBY'); // Still waiting for B

const joinB = battle.joinLobby(
  { id: 'u2', kickId: 102, username: 'PlayerTwo', displayName: 'Player Two' },
  { name: 'Gates of Olympus 1000', provider: 'Pragmatic Play' }
);
assert.equal(joinB.success, true);
assert.equal(joinB.playerSlot, 'B');
assert.equal(battle.getState().status, 'READY'); // Ready to play!

console.log('[Battle Test 3] Reject 3rd Player...');
const joinC = battle.joinLobby(
  { id: 'u3', kickId: 103, username: 'ThirdGuy' },
  { name: 'San Quentin' }
);
assert.equal(joinC.success, false);

console.log('[Battle Test 4] Enter Payouts & Resolve Winner...');
// Player A wins $50 on $20 bet -> 2.50x
battle.setPlayerPayout('A', 50);
assert.equal(battle.getState().playerA?.multiplier, 2.5);

// Player B wins $240 on $20 bet -> 12.00x
battle.setPlayerPayout('B', 240);
assert.equal(battle.getState().playerB?.multiplier, 12);

battle.resolveBattle();
const resolved = battle.getState();
assert.equal(resolved.status, 'RESOLVED');
assert.equal(resolved.winner, 'B'); // Player B won!

// ==========================================
// Test Suite 2: Tournament Manager (8-Bracket)
// ==========================================
console.log('\n[Tourney Test 1] Initialization & Open Lobby...');
const tourney = new TournamentManager();
tourney.openLobby('Mega Slot Cup', 15, '$300 Prize');
assert.equal(tourney.getState().status, 'LOBBY');

console.log('[Tourney Test 2] Register 8 Players and Auto-Seed...');
for (let i = 1; i <= 8; i++) {
  const res = tourney.joinLobby(
    { id: `t_user_${i}`, kickId: 200 + i, username: `SlotGamer${i}`, displayName: `Slot Gamer ${i}` },
    `Slot Title ${i}`
  );
  assert.equal(res.success, true);
}

// Once 8th player joins, it should automatically seed and enter IN_PROGRESS!
assert.equal(tourney.getState().status, 'IN_PROGRESS');
assert.equal(tourney.getState().participants.length, 8);
assert.equal(tourney.getState().matches.length, 7);

console.log('[Tourney Test 3] Quarterfinals Progression...');
// Match 1: Player 1 (50x) vs Player 8 (12x) -> Winner is Player 1
tourney.setMatchResult('m1', 50, 12);
assert.equal(tourney.getState().matches[0].status, 'FINISHED');
assert.equal(tourney.getState().matches[4].player1?.kickId, tourney.getState().matches[0].winner?.kickId);

// Match 2: Player 4 (5x) vs Player 5 (30x) -> Winner is Player 5
tourney.setMatchResult('m2', 5, 30);
assert.equal(tourney.getState().matches[4].player2?.kickId, tourney.getState().matches[1].winner?.kickId);

// Match 3
tourney.setMatchResult('m3', 100, 15);
// Match 4
tourney.setMatchResult('m4', 20, 80);

console.log('[Tourney Test 4] Semifinals Progression...');
// Semifinal 1 (m5)
tourney.setMatchResult('m5', 45, 10);
// Semifinal 2 (m6)
tourney.setMatchResult('m6', 5, 75);

// Grand Final should have both winners ready!
assert.equal(tourney.getState().matches[6].player1 !== null, true);
assert.equal(tourney.getState().matches[6].player2 !== null, true);

console.log('[Tourney Test 5] Grand Final & Champion Reveal...');
tourney.setMatchResult('m7', 150, 20); // Player 1 wins the Cup!

assert.equal(tourney.getState().status, 'FINISHED');
assert.equal(tourney.getState().champion?.kickId, tourney.getState().matches[6].winner?.kickId);

console.log('[Tourney Test 6] Brackets-Viewer Export Schema Validation...');
const viewerData = tourney.toBracketsViewerData();
assert.equal((viewerData.stage as any[]).length, 1);
assert.equal((viewerData.participant as any[]).length, 8);
assert.equal((viewerData.match as any[]).length, 7);

console.log('✅ All Stage 2 Battle & Tournament Engine Tests Passed Successfully!');
