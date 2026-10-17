import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { HuntHubDatabase } from '../src/db/database.ts';
import { parseStakeBetInput } from '../src/hub/overlay-server.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const testDbPath = path.resolve(__dirname, 'test_phase1.db');

try { if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath); } catch {}

console.log('--- Running Phase 1 Stake & Auth Engine Tests ---');

// Test 1: Universal Stake Bet Parser
console.log('[Test 1] Universal Stake Bet Parser...');
const urlBet = parseStakeBetInput('https://stake.com/casino/games/limbo?iid=house%3A524353464254&modal=bet');
assert.ok(urlBet);
assert.equal(urlBet.betId, 'house:524353464254');
assert.equal(urlBet.shareUrl, 'https://stake.com/casino/games/limbo?iid=house%3A524353464254&modal=bet');

const urlBetCasino = parseStakeBetInput('https://stake.com/?iid=casino:987654321&modal=bet');
assert.ok(urlBetCasino);
assert.equal(urlBetCasino.betId, 'casino:987654321');

const prefixBet = parseStakeBetInput('casino:524353464254');
assert.ok(prefixBet);
assert.equal(prefixBet.betId, 'casino:524353464254');
assert.equal(prefixBet.shareUrl, 'https://stake.com/casino/games/limbo?iid=casino%3A524353464254&modal=bet');

const rawNumBet = parseStakeBetInput('524353464254');
assert.ok(rawNumBet);
assert.equal(rawNumBet.betId, 'house:524353464254');

const sharedUrlBet = parseStakeBetInput('https://stake.com/casino/home?iid=house%3A524922477701&modal=bet&source=link_shared');
assert.ok(sharedUrlBet);
assert.equal(sharedUrlBet.betId, 'house:524922477701');
assert.equal(sharedUrlBet.shareUrl, 'https://stake.com/casino/games/limbo?iid=house%3A524922477701&modal=bet');

const casinoIdBet = parseStakeBetInput('casino:524922477701');
assert.ok(casinoIdBet);
assert.equal(casinoIdBet.betId, 'casino:524922477701');

const dottedModalBet = parseStakeBetInput('524.922.477.701');
assert.ok(dottedModalBet);
assert.equal(dottedModalBet.betId, 'house:524922477701');

assert.equal(parseStakeBetInput(''), null);
assert.equal(parseStakeBetInput('abc'), null);

// Test 2: Database Setup & User Profile Persistence
console.log('[Test 2] Database User Profile & Crypto Persistence...');
const db = new HuntHubDatabase(testDbPath);
const user1 = db.upsertUser(1001, 'viewer_one');
assert.equal(user1.username, 'viewer_one');
assert.equal(user1.points_balance, 0);

const updatedProfile = db.updateUserProfile(user1.id, {
  avatar: 'https://example.com/avatar.png',
  crypto_ltc: 'LTC1234567890',
  crypto_btc: 'bc1qtest123',
  crypto_eth: '0x123456789abcdef',
  crypto_usdc: 'USDCsolanaAddress',
  crypto_sol: 'SolanaWalletAddress',
  x_handle: '@viewer_x',
  ig_handle: '@viewer_ig'
});

assert.ok(updatedProfile);
assert.equal(updatedProfile.crypto_ltc, 'LTC1234567890');
assert.equal(updatedProfile.crypto_btc, 'bc1qtest123');
assert.equal(updatedProfile.crypto_eth, '0x123456789abcdef');
assert.equal(updatedProfile.crypto_usdc, 'USDCsolanaAddress');
assert.equal(updatedProfile.crypto_sol, 'SolanaWalletAddress');
assert.equal(updatedProfile.x_handle, '@viewer_x');
assert.equal(updatedProfile.ig_handle, '@viewer_ig');

// Test 3: Discord Linking & Unlinking
console.log('[Test 3] Discord OAuth2 Linking & Unlink...');
const discordLink = db.linkDiscordAccount(user1.id, 'discord_999', 'ViewerOne#1234', 'https://cdn.discordapp.com/avatar.png');
assert.ok(discordLink);
assert.equal(discordLink.discord_id, 'discord_999');
assert.equal(discordLink.discord_username, 'ViewerOne#1234');

const unlinked = db.unlinkDiscordAccount(user1.id);
assert.ok(unlinked);
assert.equal(unlinked.discord_id, null);
assert.equal(unlinked.discord_username, null);

// Test 4: Stake Verification Request, Anti-Sybil & +250 $DIG Credit
console.log('[Test 4] Stake Limbo Request, Anti-Sybil & Approval (+250 $DIG)...');
const reqResult = db.createStakeVerificationRequest(
  user1.id,
  user1.username,
  'StakeWinner_Alpha',
  994932,
  'house:524353464254',
  'https://stake.com/casino/games/limbo?iid=house%3A524353464254&modal=bet'
);

assert.ok(reqResult.success);
assert.equal(reqResult.request?.stake_username, 'StakeWinner_Alpha');
assert.equal(reqResult.request?.target_multiplier, 994932);
assert.equal(reqResult.request?.status, 'PENDING');

// Duplicate Bet ID must be rejected
const dupBet = db.createStakeVerificationRequest(
  user1.id,
  user1.username,
  'StakeWinner_Alpha',
  994932,
  'house:524353464254',
  'https://stake.com/casino/games/limbo?iid=house%3A524353464254&modal=bet'
);
console.log('dupBet result:', dupBet);
assert.equal(dupBet.success, false);
assert.ok(dupBet.error?.includes('already submitted') || dupBet.error?.includes('already been submitted'));

// Approve request -> marks verified & credits +250 $DIG
const approveResult = db.approveStakeVerification(reqResult.request!.id);
console.log('approveResult:', approveResult);
assert.ok(approveResult.success);
assert.equal(approveResult.credited, true);
assert.equal(approveResult.user?.stake_verified, 1);
assert.equal(approveResult.user?.points_balance, 250);

// Verify that user2 cannot link the same Stake username (1:1 Anti-Sybil)
const user2 = db.upsertUser(1002, 'viewer_two');
const sybilLink = db.linkStakeUsername(user2.id, 'StakeWinner_Alpha');
assert.equal(sybilLink.success, false);
assert.ok(sybilLink.error?.includes('ya está vinculado'));

db.close();
try { if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath); } catch {}
try { const wal = testDbPath + '-wal'; if (fs.existsSync(wal)) fs.unlinkSync(wal); } catch {}
try { const shm = testDbPath + '-shm'; if (fs.existsSync(shm)) fs.unlinkSync(shm); } catch {}

console.log('✅ All Phase 1 Stake & Auth Engine Tests Passed Successfully!');
