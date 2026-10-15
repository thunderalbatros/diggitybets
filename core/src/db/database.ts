import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultDbPath = path.resolve(__dirname, '..', '..', 'hunthub.db');

export interface UserRow {
  id: string;
  kick_id: number;
  username: string;
  display_name: string;
  avatar: string;
  stake_username: string | null;
  stake_verified: number;
  points_balance: number;
  risk_score: number;
  is_shadowbanned: number;
  kick_created_at: number | null;
  first_seen_at: number;
  last_seen_at: number;
  discord_id?: string | null;
  discord_username?: string | null;
  discord_avatar?: string | null;
  crypto_ltc?: string | null;
  crypto_btc?: string | null;
  crypto_eth?: string | null;
  crypto_usdc?: string | null;
  crypto_sol?: string | null;
  x_handle?: string | null;
  ig_handle?: string | null;
}

export interface StakeVerificationRequestRow {
  id: string;
  user_id: string;
  kick_username: string;
  stake_username: string;
  target_multiplier: number;
  bet_id: string;
  share_url: string;
  status: string;
  created_at: number;
}

export interface PointTransactionRow {
  id: string;
  user_id: string;
  amount: number;
  balance_after: number;
  type: string;
  reference_id: string | null;
  metadata_json: string | null;
  created_at: number;
}

export interface AltClusterRow {
  cluster_id: string;
  primary_user_id: string;
  associated_user_id: string;
  reason: string;
  detected_at: number;
}

export class HuntHubDatabase {
  public db: DatabaseSync;

  constructor(dbPath: string = defaultDbPath) {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    this.db = new DatabaseSync(dbPath);
    this.initSchema();
  }

  private initSchema(): void {
    // Enable WAL mode and foreign keys for durability and performance
    this.db.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        kick_id INTEGER UNIQUE NOT NULL,
        username TEXT NOT NULL,
        display_name TEXT NOT NULL,
        avatar TEXT DEFAULT '',
        stake_username TEXT UNIQUE,
        stake_verified INTEGER NOT NULL DEFAULT 0,
        points_balance INTEGER NOT NULL DEFAULT 0,
        risk_score INTEGER NOT NULL DEFAULT 0,
        is_shadowbanned INTEGER NOT NULL DEFAULT 0,
        kick_created_at INTEGER,
        first_seen_at INTEGER NOT NULL,
        last_seen_at INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_users_kick_id ON users(kick_id);
      CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

      CREATE TABLE IF NOT EXISTS user_devices (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        device_hash TEXT NOT NULL,
        ip_subnet TEXT,
        first_seen_at INTEGER NOT NULL,
        last_seen_at INTEGER NOT NULL,
        UNIQUE(user_id, device_hash)
      );
      CREATE INDEX IF NOT EXISTS idx_user_devices_hash ON user_devices(device_hash);

      CREATE TABLE IF NOT EXISTS alt_clusters (
        cluster_id TEXT PRIMARY KEY,
        primary_user_id TEXT NOT NULL,
        associated_user_id TEXT NOT NULL,
        reason TEXT NOT NULL,
        detected_at INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_alt_clusters_users ON alt_clusters(primary_user_id, associated_user_id);

      CREATE TABLE IF NOT EXISTS point_transactions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        amount INTEGER NOT NULL,
        balance_after INTEGER NOT NULL,
        type TEXT NOT NULL,
        reference_id TEXT,
        metadata_json TEXT,
        created_at INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_point_tx_user ON point_transactions(user_id);

      CREATE TABLE IF NOT EXISTS channel_rewards (
        id TEXT PRIMARY KEY,
        kick_reward_id TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        cost_kick_points INTEGER NOT NULL,
        credit_amount INTEGER NOT NULL,
        is_active INTEGER NOT NULL DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS redemptions (
        id TEXT PRIMARY KEY,
        kick_reward_id TEXT NOT NULL,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        kick_user_id INTEGER NOT NULL,
        status TEXT NOT NULL,
        created_at INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_redemptions_user ON redemptions(user_id);

      CREATE TABLE IF NOT EXISTS stake_verification_requests (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        kick_username TEXT NOT NULL,
        stake_username TEXT NOT NULL,
        target_multiplier INTEGER NOT NULL,
        bet_id TEXT UNIQUE NOT NULL,
        share_url TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'PENDING',
        created_at INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_stake_req_user ON stake_verification_requests(user_id);
      CREATE INDEX IF NOT EXISTS idx_stake_req_status ON stake_verification_requests(status);
    `);

    // Dynamic schema migrations for existing database instances
    const safeAddColumn = (column: string, typeDef: string) => {
      try {
        this.db.exec(`ALTER TABLE users ADD COLUMN ${column} ${typeDef};`);
      } catch (e) {
        // Column already exists, safe to ignore
      }
    };

    safeAddColumn('discord_id', 'TEXT');
    safeAddColumn('discord_username', 'TEXT');
    safeAddColumn('discord_avatar', 'TEXT');
    safeAddColumn('crypto_ltc', 'TEXT');
    safeAddColumn('crypto_btc', 'TEXT');
    safeAddColumn('crypto_eth', 'TEXT');
    safeAddColumn('crypto_usdc', 'TEXT');
    safeAddColumn('crypto_sol', 'TEXT');
    safeAddColumn('x_handle', 'TEXT');
    safeAddColumn('ig_handle', 'TEXT');
  }

  // --- User Operations ---

  public upsertUser(
    kickId: number,
    username: string,
    displayName?: string,
    avatar?: string,
    kickCreatedAt?: number
  ): UserRow {
    const now = Math.floor(Date.now() / 1000);
    const cleanUser = username.trim().toLowerCase();
    const cleanDisplay = (displayName || username).trim();

    const existing = this.db.prepare('SELECT * FROM users WHERE kick_id = ?').get(kickId) as UserRow | undefined;

    if (existing) {
      this.db.prepare(`
        UPDATE users 
        SET username = ?, display_name = ?, avatar = COALESCE(NULLIF(?, ''), avatar), last_seen_at = ?
        WHERE id = ?
      `).run(cleanUser, cleanDisplay, avatar || '', now, existing.id);
      return this.getUserById(existing.id)!;
    }

    const newId = crypto.randomUUID();
    this.db.prepare(`
      INSERT INTO users (id, kick_id, username, display_name, avatar, kick_created_at, first_seen_at, last_seen_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(newId, kickId, cleanUser, cleanDisplay, avatar || '', kickCreatedAt || null, now, now);

    return this.getUserById(newId)!;
  }

  public getUserById(id: string): UserRow | null {
    const row = this.db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    return (row as UserRow) || null;
  }

  public getUserByKickId(kickId: number): UserRow | null {
    const row = this.db.prepare('SELECT * FROM users WHERE kick_id = ?').get(kickId);
    return (row as UserRow) || null;
  }

  public getUserByUsername(username: string): UserRow | null {
    const row = this.db.prepare('SELECT * FROM users WHERE username = ?').get(username.trim().toLowerCase());
    return (row as UserRow) || null;
  }

  // --- Points & Transactions (Atomic) ---

  public creditPoints(
    userId: string,
    amount: number,
    type: string,
    referenceId?: string,
    meta?: Record<string, unknown>
  ): { success: boolean; newBalance: number; txId: string } {
    if (amount <= 0) throw new Error('Credit amount must be positive');
    const now = Math.floor(Date.now() / 1000);

    const user = this.getUserById(userId);
    if (!user) throw new Error(`User ${userId} not found`);

    const newBalance = user.points_balance + amount;
    const txId = crypto.randomUUID();

    // Atomic update
    this.db.exec('BEGIN TRANSACTION;');
    try {
      this.db.prepare('UPDATE users SET points_balance = ? WHERE id = ?').run(newBalance, userId);
      this.db.prepare(`
        INSERT INTO point_transactions (id, user_id, amount, balance_after, type, reference_id, metadata_json, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(txId, userId, amount, newBalance, type, referenceId || null, meta ? JSON.stringify(meta) : null, now);
      this.db.exec('COMMIT;');
      return { success: true, newBalance, txId };
    } catch (err) {
      this.db.exec('ROLLBACK;');
      throw err;
    }
  }

  public debitPoints(
    userId: string,
    amount: number,
    type: string,
    referenceId?: string,
    meta?: Record<string, unknown>
  ): { success: boolean; newBalance: number; txId: string } {
    if (amount <= 0) throw new Error('Debit amount must be positive');
    const now = Math.floor(Date.now() / 1000);

    const user = this.getUserById(userId);
    if (!user) throw new Error(`User ${userId} not found`);
    if (user.points_balance < amount) {
      return { success: false, newBalance: user.points_balance, txId: '' };
    }

    const newBalance = user.points_balance - amount;
    const txId = crypto.randomUUID();

    this.db.exec('BEGIN TRANSACTION;');
    try {
      this.db.prepare('UPDATE users SET points_balance = ? WHERE id = ?').run(newBalance, userId);
      this.db.prepare(`
        INSERT INTO point_transactions (id, user_id, amount, balance_after, type, reference_id, metadata_json, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(txId, userId, -amount, newBalance, type, referenceId || null, meta ? JSON.stringify(meta) : null, now);
      this.db.exec('COMMIT;');
      return { success: true, newBalance, txId };
    } catch (err) {
      this.db.exec('ROLLBACK;');
      throw err;
    }
  }

  // --- Channel Points Bridge ---

  public processChannelPointRedemption(
    redemptionId: string,
    kickRewardId: string,
    kickUserId: number,
    username: string,
    creditAmount: number
  ): { alreadyProcessed: boolean; user: UserRow; newBalance: number } {
    const existing = this.db.prepare('SELECT * FROM redemptions WHERE id = ?').get(redemptionId);
    if (existing) {
      const user = this.getUserByKickId(kickUserId)!;
      return { alreadyProcessed: true, user, newBalance: user.points_balance };
    }

    const user = this.upsertUser(kickUserId, username);
    const now = Math.floor(Date.now() / 1000);

    this.db.exec('BEGIN TRANSACTION;');
    try {
      this.db.prepare(`
        INSERT INTO redemptions (id, kick_reward_id, user_id, kick_user_id, status, created_at)
        VALUES (?, ?, ?, ?, 'FULFILLED', ?)
      `).run(redemptionId, kickRewardId, user.id, kickUserId, now);

      const newBalance = user.points_balance + creditAmount;
      const txId = crypto.randomUUID();
      this.db.prepare('UPDATE users SET points_balance = ? WHERE id = ?').run(newBalance, user.id);
      this.db.prepare(`
        INSERT INTO point_transactions (id, user_id, amount, balance_after, type, reference_id, metadata_json, created_at)
        VALUES (?, ?, ?, ?, 'CHANNEL_REWARD_REDEMPTION', ?, ?, ?)
      `).run(txId, user.id, creditAmount, newBalance, redemptionId, JSON.stringify({ kickRewardId }), now);

      this.db.exec('COMMIT;');
      return { alreadyProcessed: false, user: this.getUserById(user.id)!, newBalance };
    } catch (err) {
      this.db.exec('ROLLBACK;');
      throw err;
    }
  }

  // --- Anti-Sybil & Device Fingerprinting ---

  public recordDevice(userId: string, deviceHash: string, ip?: string): { isAltCluster: boolean; clusterCount: number } {
    const now = Math.floor(Date.now() / 1000);
    const subnet = ip ? ip.split('.').slice(0, 3).join('.') + '.0/24' : null;

    // Check if other users shared this exact hardware hash
    const sharedUsers = this.db.prepare(`
      SELECT DISTINCT user_id FROM user_devices 
      WHERE device_hash = ? AND user_id != ?
    `).all(deviceHash, userId) as Array<{ user_id: string }>;

    let isAltCluster = false;

    if (sharedUsers.length > 0) {
      isAltCluster = true;
      for (const alt of sharedUsers) {
        const clusterId = crypto.randomUUID();
        this.db.prepare(`
          INSERT INTO alt_clusters (cluster_id, primary_user_id, associated_user_id, reason, detected_at)
          VALUES (?, ?, ?, 'SHARED_DEVICE_HASH', ?)
        `).run(clusterId, userId, alt.user_id, now);

        // Increase risk score on both accounts
        this.db.prepare('UPDATE users SET risk_score = MIN(100, risk_score + 40) WHERE id = ?').run(userId);
        this.db.prepare('UPDATE users SET risk_score = MIN(100, risk_score + 40) WHERE id = ?').run(alt.user_id);
      }
    }

    // Insert or update device mapping
    this.db.prepare(`
      INSERT INTO user_devices (id, user_id, device_hash, ip_subnet, first_seen_at, last_seen_at)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(user_id, device_hash) DO UPDATE SET last_seen_at = excluded.last_seen_at
    `).run(crypto.randomUUID(), userId, deviceHash, subnet, now, now);

    return { isAltCluster, clusterCount: sharedUsers.length };
  }

  public linkStakeUsername(userId: string, stakeUsername: string): { success: boolean; error?: string } {
    const clean = stakeUsername.trim().toLowerCase();
    if (!clean) return { success: false, error: 'Empty Stake username' };

    const existing = this.db.prepare('SELECT id FROM users WHERE LOWER(stake_username) = ? AND id != ?').get(clean, userId);
    if (existing) {
      // Flag alt attempt
      const now = Math.floor(Date.now() / 1000);
      this.db.prepare(`
        INSERT INTO alt_clusters (cluster_id, primary_user_id, associated_user_id, reason, detected_at)
        VALUES (?, ?, ?, 'SHARED_STAKE_ATTEMPT', ?)
      `).run(crypto.randomUUID(), userId, (existing as { id: string }).id, now);
      this.db.prepare('UPDATE users SET risk_score = MIN(100, risk_score + 50) WHERE id = ?').run(userId);

      return { success: false, error: 'Este usuario de Stake ya está vinculado a otra cuenta.' };
    }

    try {
      this.db.prepare('UPDATE users SET stake_username = ? WHERE id = ?').run(clean, userId);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  // --- Profile, Discord & Crypto Persistence ---

  public updateUserProfile(
    userId: string,
    data: {
      avatar?: string;
      stake_username?: string;
      crypto_ltc?: string;
      crypto_btc?: string;
      crypto_eth?: string;
      crypto_usdc?: string;
      crypto_sol?: string;
      x_handle?: string;
      ig_handle?: string;
    }
  ): UserRow {
    const user = this.getUserById(userId);
    if (!user) throw new Error(`User ${userId} not found`);

    const fields: string[] = [];
    const values: any[] = [];

    if (data.avatar !== undefined) { fields.push('avatar = ?'); values.push(data.avatar); }
    if (data.stake_username !== undefined) { fields.push('stake_username = ?'); values.push(data.stake_username); }
    if (data.crypto_ltc !== undefined) { fields.push('crypto_ltc = ?'); values.push(data.crypto_ltc); }
    if (data.crypto_btc !== undefined) { fields.push('crypto_btc = ?'); values.push(data.crypto_btc); }
    if (data.crypto_eth !== undefined) { fields.push('crypto_eth = ?'); values.push(data.crypto_eth); }
    if (data.crypto_usdc !== undefined) { fields.push('crypto_usdc = ?'); values.push(data.crypto_usdc); }
    if (data.crypto_sol !== undefined) { fields.push('crypto_sol = ?'); values.push(data.crypto_sol); }
    if (data.x_handle !== undefined) { fields.push('x_handle = ?'); values.push(data.x_handle); }
    if (data.ig_handle !== undefined) { fields.push('ig_handle = ?'); values.push(data.ig_handle); }

    if (fields.length > 0) {
      values.push(userId);
      this.db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`).run(...values);
    }

    return this.getUserById(userId)!;
  }

  public linkDiscordAccount(
    userId: string,
    discordId: string,
    discordUsername: string,
    discordAvatar?: string
  ): UserRow {
    const user = this.getUserById(userId);
    if (!user) throw new Error(`User ${userId} not found`);

    this.db.prepare(`
      UPDATE users 
      SET discord_id = ?, discord_username = ?, discord_avatar = ?
      WHERE id = ?
    `).run(discordId, discordUsername, discordAvatar || null, userId);

    return this.getUserById(userId)!;
  }

  public unlinkDiscordAccount(userId: string): UserRow {
    const user = this.getUserById(userId);
    if (!user) throw new Error(`User ${userId} not found`);

    this.db.prepare(`
      UPDATE users 
      SET discord_id = NULL, discord_username = NULL, discord_avatar = NULL
      WHERE id = ?
    `).run(userId);

    return this.getUserById(userId)!;
  }

  // --- Stake Verification Requests ---

  public createStakeVerificationRequest(
    userId: string,
    kickUsername: string,
    stakeUsername: string,
    targetMultiplier: number,
    betId: string,
    shareUrl: string
  ): { success: boolean; request?: StakeVerificationRequestRow; error?: string } {
    // 1. Anti-Sybil: verify Stake username is not already linked to another user
    const linkCheck = this.linkStakeUsername(userId, stakeUsername);
    if (!linkCheck.success) {
      return { success: false, error: linkCheck.error };
    }

    // 2. Check if bet_id was already submitted by anyone
    const cleanBetId = betId.trim().toLowerCase();
    const existingBet = this.db.prepare('SELECT id FROM stake_verification_requests WHERE LOWER(bet_id) = ?').get(cleanBetId);
    if (existingBet) {
      return { success: false, error: 'This bet ID has already been submitted for verification.' };
    }

    const id = crypto.randomUUID();
    const now = Math.floor(Date.now() / 1000);

    try {
      this.db.prepare(`
        INSERT INTO stake_verification_requests 
        (id, user_id, kick_username, stake_username, target_multiplier, bet_id, share_url, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDING', ?)
      `).run(id, userId, kickUsername, stakeUsername, targetMultiplier, cleanBetId, shareUrl, now);

      const request = this.db.prepare('SELECT * FROM stake_verification_requests WHERE id = ?').get(id) as StakeVerificationRequestRow;
      return { success: true, request };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  public getStakeVerificationRequests(status?: string): StakeVerificationRequestRow[] {
    if (status) {
      return this.db.prepare('SELECT * FROM stake_verification_requests WHERE status = ? ORDER BY created_at DESC').all(status) as StakeVerificationRequestRow[];
    }
    return this.db.prepare('SELECT * FROM stake_verification_requests ORDER BY created_at DESC').all() as StakeVerificationRequestRow[];
  }

  public approveStakeVerification(requestId: string): { success: boolean; user?: UserRow; credited: boolean; error?: string } {
    const req = this.db.prepare('SELECT * FROM stake_verification_requests WHERE id = ?').get(requestId) as StakeVerificationRequestRow | undefined;
    if (!req) return { success: false, credited: false, error: 'Verification request not found' };

    const user = this.getUserById(req.user_id);
    if (!user) return { success: false, credited: false, error: 'User not found' };

    let credited = false;

    this.db.exec('BEGIN TRANSACTION;');
    try {
      this.db.prepare('UPDATE stake_verification_requests SET status = \'APPROVED\' WHERE id = ?').run(requestId);
      
      // If not previously verified, mark verified and credit +250 $DIG
      if (user.stake_verified === 0) {
        this.db.prepare('UPDATE users SET stake_verified = 1, stake_username = ? WHERE id = ?').run(req.stake_username, req.user_id);
        
        // Credit 250 points
        const newBalance = user.points_balance + 250;
        const txId = crypto.randomUUID();
        const now = Math.floor(Date.now() / 1000);

        this.db.prepare('UPDATE users SET points_balance = ? WHERE id = ?').run(newBalance, user.id);
        this.db.prepare(`
          INSERT INTO point_transactions (id, user_id, amount, balance_after, type, reference_id, metadata_json, created_at)
          VALUES (?, ?, 250, ?, 'STAKE_AFFILIATE_VERIFICATION_BONUS', ?, ?, ?)
        `).run(txId, user.id, newBalance, requestId, JSON.stringify({ stake_username: req.stake_username, bet_id: req.bet_id }), now);
        
        credited = true;
      }

      this.db.exec('COMMIT;');
      return { success: true, user: this.getUserById(user.id)!, credited };
    } catch (err: any) {
      this.db.exec('ROLLBACK;');
      return { success: false, credited: false, error: err.message };
    }
  }

  // --- Eligible Chatters Pool Filter (Excluding Shadowbanned & Alts) ---

  public getEligibleUsers(userIds: string[], minKickAgeDays: number = 7): UserRow[] {
    if (userIds.length === 0) return [];
    const placeholders = userIds.map(() => '?').join(',');
    const cutoffTime = Math.floor(Date.now() / 1000) - minKickAgeDays * 86400;

    return this.db.prepare(`
      SELECT * FROM users
      WHERE id IN (${placeholders})
        AND is_shadowbanned = 0
        AND risk_score < 75
        AND (kick_created_at IS NULL OR kick_created_at <= ${cutoffTime})
    `).all(...userIds) as UserRow[];
  }

  public close(): void {
    this.db.close();
  }
}
