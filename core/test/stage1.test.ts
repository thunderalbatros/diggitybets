import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { HuntHubDatabase } from '../src/db/database.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const testDbPath = path.resolve(__dirname, 'test_hunthub.db');

// Clean previous test db if present
if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);

console.log('--- Running HuntHub Core Stage 1 Tests ---');

const db = new HuntHubDatabase(testDbPath);

// Test 1: User Upsert
console.log('[Test 1] Upsert User...');
const user1 = db.upsertUser(12345, 'LuckyGambler', 'Lucky Gambler');
assert.equal(user1.username, 'luckygambler');
assert.equal(user1.kick_id, 12345);
assert.equal(user1.points_balance, 0);

// Test 2: Atomic Point Credit
console.log('[Test 2] Credit Points...');
const creditRes = db.creditPoints(user1.id, 500, 'FAUCET');
assert.equal(creditRes.success, true);
assert.equal(creditRes.newBalance, 500);

const user1Updated = db.getUserById(user1.id)!;
assert.equal(user1Updated.points_balance, 500);

// Test 3: Atomic Point Debit
console.log('[Test 3] Debit Points...');
const debitRes = db.debitPoints(user1.id, 200, 'HOUSE_GAME_BET');
assert.equal(debitRes.success, true);
assert.equal(debitRes.newBalance, 300);

// Test 4: Insufficient Balance Debit
console.log('[Test 4] Insufficient Balance Debit...');
const failDebit = db.debitPoints(user1.id, 1000, 'HOUSE_GAME_BET');
assert.equal(failDebit.success, false);
assert.equal(failDebit.newBalance, 300);

// Test 5: Channel Points Bridge & Idempotency
console.log('[Test 5] Channel Points Bridge & Idempotency...');
const rdmRes1 = db.processChannelPointRedemption(
  'rdm_001',
  'rew_credits_5k',
  12345,
  'LuckyGambler',
  5000
);
assert.equal(rdmRes1.alreadyProcessed, false);
assert.equal(rdmRes1.newBalance, 5300);

// Re-processing the exact same redemption must be idempotent!
const rdmRes2 = db.processChannelPointRedemption(
  'rdm_001',
  'rew_credits_5k',
  12345,
  'LuckyGambler',
  5000
);
assert.equal(rdmRes2.alreadyProcessed, true);
assert.equal(rdmRes2.newBalance, 5300); // Balance unchanged!

// Test 6: Anti-Sybil Multi-Account Device Detection
console.log('[Test 6] Anti-Sybil Device Detection...');
const user2 = db.upsertUser(67890, 'SneakyAlt', 'Sneaky Alt');
const deviceHash = 'hash_macbook_pro_m2_canvas_0123456789';

// User 1 uses device
const dev1 = db.recordDevice(user1.id, deviceHash, '190.220.14.5');
assert.equal(dev1.isAltCluster, false);

// User 2 logs in from the EXACT same device
const dev2 = db.recordDevice(user2.id, deviceHash, '190.220.14.8');
assert.equal(dev2.isAltCluster, true);
assert.equal(dev2.clusterCount, 1);

const user1Risk = db.getUserById(user1.id)!;
const user2Risk = db.getUserById(user2.id)!;
assert(user1Risk.risk_score >= 40, 'User 1 risk score should increase');
assert(user2Risk.risk_score >= 40, 'User 2 risk score should increase');

// Test 7: Stake Username 1:1 Uniqueness
console.log('[Test 7] Stake Username 1:1 Uniqueness...');
const stakeLink1 = db.linkStakeUsername(user1.id, 'StakeVipPro');
assert.equal(stakeLink1.success, true);

// User 2 tries to link the same Stake username
const stakeLink2 = db.linkStakeUsername(user2.id, 'StakeVipPro');
assert.equal(stakeLink2.success, false);
assert(stakeLink2.error?.includes('ya está vinculado'));

// Test 8: Shadowban & Draw Pool Exclusion
console.log('[Test 8] Shadowban & Draw Exclusion...');
db.db.prepare('UPDATE users SET is_shadowbanned = 1 WHERE id = ?').run(user2.id);

const eligible = db.getEligibleUsers([user1.id, user2.id], 0);
assert.equal(eligible.length, 1);
assert.equal(eligible[0].id, user1.id); // user2 is silently excluded!

db.close();

// Cleanup test db
try { if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath); } catch {}
try { const wal = testDbPath + '-wal'; if (fs.existsSync(wal)) fs.unlinkSync(wal); } catch {}
try { const shm = testDbPath + '-shm'; if (fs.existsSync(shm)) fs.unlinkSync(shm); } catch {}

console.log('✅ All Stage 1 Core Database & Security Tests Passed Successfully!');
