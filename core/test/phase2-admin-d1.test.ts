import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { HuntHubDatabase } from '../src/db/database.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const testDbPath = path.resolve(__dirname, 'test_phase2.db');

try { if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath); } catch {}

console.log('--- Running Phase 2 Admin Control Deck & D1 Sync Tests ---');

const db = new HuntHubDatabase(testDbPath);

// 1. Setup test user with profile & crypto wallets
console.log('[Test 1] User setup with crypto payout addresses...');
const user = db.upsertUser(2001, 'lucky_viewer');
db.creditPoints(user.id, 1000, 'TEST_CREDIT');

const prof = db.updateUserProfile(user.id, {
  stake_username: 'LuckyStakePlayer',
  crypto_ltc: 'LTC9q3F8aDk3JzX5t4...',
  crypto_btc: 'bc1q98f4jd82kjs...',
  crypto_eth: '0x71C...4982',
  crypto_usdc: 'USDCsolanaAddress123',
  crypto_sol: 'SoL111111111111111...'
});
assert.equal(prof.stake_username, 'LuckyStakePlayer');
assert.equal(prof.crypto_ltc, 'LTC9q3F8aDk3JzX5t4...');

// 2. Store Redemptions Queue & Crypto Join
console.log('[Test 2] Store Redemptions Queue & Crypto Address Retrieval...');
const redeemRes = db.createStoreRedemption(user.id, user.username, '$20 bonus buy split profit', 600);
assert.equal(redeemRes.success, true);
assert.equal(redeemRes.redemption?.voucher_title, '$20 bonus buy split profit');

// Check user points were deducted atomically
const userAfterRedeem = db.getUserById(user.id);
assert.equal(userAfterRedeem?.points_balance, 400);

// Get redemptions list (joins users table to fetch crypto addresses in real-time)
const claims = db.getStoreRedemptions('PENDING');
assert.equal(claims.length, 1);
assert.equal(claims[0].kick_username, 'lucky_viewer');
assert.equal(claims[0].crypto_ltc, 'LTC9q3F8aDk3JzX5t4...');
assert.equal(claims[0].crypto_sol, 'SoL111111111111111...');
assert.equal(claims[0].stake_username, 'LuckyStakePlayer');

// Approve claim
const appRes = db.approveStoreRedemption(claims[0].id);
assert.equal(appRes.success, true);
assert.equal(db.getStoreRedemptions('PENDING').length, 0);
assert.equal(db.getStoreRedemptions('FULFILLED').length, 1);

// Test Refund flow
const redeem2 = db.createStoreRedemption(user.id, user.username, 'Guaranteed 1v1 battle entry', 100);
assert.equal(redeem2.success, true);
assert.equal(db.getUserById(user.id)?.points_balance, 300);

const rejRes = db.rejectStoreRedemption(redeem2.redemption!.id, true);
assert.equal(rejRes.success, true);
assert.equal(rejRes.refunded, true);
// Balance refunded
assert.equal(db.getUserById(user.id)?.points_balance, 400);

// 3. Weekly Sunday Raffle & Provably Fair Roll
console.log('[Test 3] Weekly Sunday Raffle Ledger & HMAC-SHA256 Roll...');
const weekNum = db.getWeekNumber();
const buy1 = db.buyRaffleTickets(user.id, user.username, 5, 50, weekNum);
assert.equal(buy1.success, true);
assert.equal(buy1.totalTickets, 5);

const user2 = db.upsertUser(2002, 'charly_stream');
db.creditPoints(user2.id, 1000, 'TEST_CREDIT');
const buy2 = db.buyRaffleTickets(user2.id, user2.username, 10, 50, weekNum);
assert.equal(buy2.success, true);
assert.equal(buy2.totalTickets, 10);

const ledger = db.getRaffleLedger(weekNum);
assert.equal(ledger.totalTickets, 15);
assert.equal(ledger.participants.length, 2);

const roll = db.rollProvablyFairRaffle(weekNum, 'server_secret_seed', 'kick_sunday_stream');
assert.ok(roll.winner);
assert.ok(roll.winner === '@lucky_viewer' || roll.winner === '@charly_stream');
assert.equal(roll.totalTickets, 15);
assert.ok(roll.ticketNumber >= 1 && roll.ticketNumber <= 15);
assert.equal(roll.serverSeedHash.length, 64); // SHA-256 hex digest

// 4. Stake Limbo Verification Rejection
console.log('[Test 4] Stake Limbo Request Rejection...');
const stakeReq = db.createStakeVerificationRequest(
  user.id,
  user.username,
  'LuckyStakePlayer',
  847291,
  'house:12345678',
  'https://stake.com/?iid=house:12345678'
);
assert.equal(stakeReq.success, true);
assert.equal(db.getStakeVerificationRequests('PENDING').length, 1);

const rejStake = db.rejectStakeVerification(stakeReq.request!.id);
assert.equal(rejStake.success, true);
assert.equal(db.getStakeVerificationRequests('PENDING').length, 0);

// 5. Anti-Sybil Security Alerts & Actions
console.log('[Test 5] Anti-Sybil Security Alerts, Shadowban, Freeze & Whitelist...');
// Add devices sharing hash
db.recordDevice(user.id, 'hash_shared_pc', '190.19.45.10', 'Mozilla');
db.recordDevice(user2.id, 'hash_shared_pc', '190.19.45.12', 'Mozilla');

const alerts = db.getSecurityAlerts();
assert.ok(alerts.length >= 1);
const sharedAlert = alerts.find(a => a.device_hash === 'hash_shared_pc');
assert.ok(sharedAlert);
assert.equal(sharedAlert.reason, 'SHARED_DEVICE_HASH');

// Shadowban
const sbRes = db.shadowbanUser('charly_stream');
assert.equal(sbRes.success, true);

// Freeze balance
const frzRes = db.freezeUserBalance('charly_stream');
assert.equal(frzRes.success, true);

// 6. D1 State Synchronization (Export / Import)
console.log('[Test 6] Cloudflare D1 State Synchronization Export / Import...');
const exported = db.exportStateJson();
assert.ok(exported.users.length >= 2);
assert.ok(exported.store_redemptions.length >= 2);
assert.ok(exported.raffle_tickets.length >= 2);

// Re-import into fresh database
const db2Path = path.resolve(__dirname, 'test_phase2_sync.db');
try { if (fs.existsSync(db2Path)) fs.unlinkSync(db2Path); } catch {}
const db2 = new HuntHubDatabase(db2Path);
const importRes = db2.importStateJson(exported);
assert.equal(importRes.success, true);
assert.equal(db2.getStoreRedemptions().length, exported.store_redemptions.length);
assert.equal(db2.getRaffleLedger(weekNum).totalTickets, 15);

// Cleanup
db.close();
db2.close();
try { fs.unlinkSync(testDbPath); fs.unlinkSync(db2Path); } catch {}

console.log('✅ ALL PHASE 2 ADMIN & D1 TESTS PASSED PERFECTLY!');
