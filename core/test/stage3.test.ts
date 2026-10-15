import assert from 'node:assert';
import { BonusHuntManager } from '../src/bonushunt/bonushunt-manager.ts';

console.log('--- Running Stage 3 Bonus Hunt Engine Tests ---');

const manager = new BonusHuntManager();

// Test 1: Start New Hunt
console.log('[Hunt Test 1] Start New Hunt & Initial Metrics...');
const s1 = manager.startNewHunt('Test Hunt', 1000);
assert.strictEqual(s1.title, 'Test Hunt');
assert.strictEqual(s1.startCost, 1000);
assert.strictEqual(s1.metrics.totalBonuses, 0);
assert.strictEqual(s1.metrics.winnings, 0);
assert.strictEqual(s1.metrics.profit, -1000);

// Test 2: Add Bonuses (Chat Calls)
console.log('[Hunt Test 2] Add Bonuses from Chat Calls...');
const b1 = manager.addBonus({ name: 'Wanted Dead or a Wild', provider: 'Hacksaw' }, { username: 'LuckyStriker', kickId: 101 }, 2.0);
const b2 = manager.addBonus({ name: 'Gates of Olympus 1000', provider: 'Pragmatic' }, { username: 'VegasKing', kickId: 102 }, 1.0);
const b3 = manager.addBonus({ name: 'San Quentin xWays', provider: 'Nolimit City' }, { username: 'SlotQueen', kickId: 103 }, 0.4);

const s2 = manager.getState();
assert.strictEqual(s2.bonuses.length, 3);
assert.strictEqual(s2.metrics.totalBonuses, 3);
assert.strictEqual(s2.metrics.remainingBonuses, 3);
// Total unopened stake = 2.0 + 1.0 + 0.4 = 3.4. Req Avg X = 1000 / 3.4 = 294.12x
assert.strictEqual(s2.metrics.reqAverageX, 294.12);

// Test 3: Open Bonuses & Check Formula Calculations
console.log('[Hunt Test 3] Open Bonuses & Mathematical Formulas...');
manager.setBonusPayout(b1.id, 240); // 240 / 2 = 120x
const s3 = manager.getState();
assert.strictEqual(s3.metrics.openedBonuses, 1);
assert.strictEqual(s3.metrics.remainingBonuses, 2);
assert.strictEqual(s3.metrics.winnings, 240);
assert.strictEqual(s3.metrics.profit, -760);
assert.strictEqual(s3.metrics.runAverageX, 120); // 240 / 2
// Needed = 1000 - 240 = 760. Remaining stake = 1.0 + 0.4 = 1.4. Req Avg X = 760 / 1.4 = 542.86x
assert.strictEqual(s3.metrics.reqAverageX, 542.86);

// Test 4: Prediction Guesses (Recorded while hunt is in progress)
console.log('[Hunt Test 4] Guess Prediction & Live Tracking...');
manager.recordGuess('PlayerOne', 1000);
manager.recordGuess('PlayerTwo', 1150); // Diff from 1140 will be 10
manager.recordGuess('PlayerThree', 1500);

// Open bonuses
manager.setBonusPayout(b2.id, 500); // 500 / 1 = 500x
manager.setBonusPayout(b3.id, 400); // 400 / 0.4 = 1000x

const s4 = manager.getState();
assert.strictEqual(s4.metrics.openedBonuses, 3);
assert.strictEqual(s4.metrics.remainingBonuses, 0);
assert.strictEqual(s4.metrics.winnings, 1140);
assert.strictEqual(s4.metrics.profit, 140); // In profit!
assert.strictEqual(s4.status, 'FINISHED');

// Test 5: Best Win & Lucky Win
console.log('[Hunt Test 5] Best Win & Lucky Win Resolution...');
// Highest payout is b2 ($500). Highest multiplier is b3 (1000x)
assert.strictEqual(s4.metrics.bestWin?.id, b2.id);
assert.strictEqual(s4.metrics.luckyWin?.id, b3.id);

// Test 6: Verify Winning Prediction
console.log('[Hunt Test 6] Winner Prediction Determination...');
assert.strictEqual(s4.metrics.closestGuess?.username, 'PlayerTwo');
assert.strictEqual(s4.metrics.closestGuess?.diff, 10);

console.log('✅ All Stage 3 Bonus Hunt Engine Tests Passed Successfully!');
