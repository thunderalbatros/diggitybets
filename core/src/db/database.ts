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

export interface StoreRedemptionRow {
  id: string;
  user_id: string;
  kick_username: string;
  discord_username?: string | null;
  stake_username?: string | null;
  stake_verified?: number;
  crypto_ltc?: string | null;
  crypto_btc?: string | null;
  crypto_eth?: string | null;
  crypto_usdc?: string | null;
  crypto_sol?: string | null;
  voucher_title: string;
  cost_points: number;
  status: string;
  created_at: number;
}

export interface RaffleTicketRow {
  id: string;
  user_id: string;
  kick_username: string;
  ticket_count: number;
  week_number: number;
  created_at: number;
}

export interface SecurityAlertRow {
  cluster_id: string;
  primary_user_id: string;
  primary_username: string;
  alt_user_id: string;
  alt_username: string;
  reason: string;
  device_hash: string;
  ip_subnet: string | null;
  stake_username?: string | null;
  risk_score: number;
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

      CREATE TABLE IF NOT EXISTS store_redemptions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        kick_username TEXT NOT NULL,
        voucher_title TEXT NOT NULL,
        cost_points INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'PENDING',
        created_at INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_store_redemptions_user ON store_redemptions(user_id);
      CREATE INDEX IF NOT EXISTS idx_store_redemptions_status ON store_redemptions(status);

      CREATE TABLE IF NOT EXISTS raffle_tickets (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        kick_username TEXT NOT NULL,
        ticket_count INTEGER NOT NULL,
        week_number INTEGER NOT NULL,
        created_at INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_raffle_week ON raffle_tickets(week_number);
    `);


    // Dynamic schema migrations for existing database instances
    const safeAddColumn = (column: string, typeDef: string, table: string = 'users') => {
      try {
        this.db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${typeDef};`);
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
    safeAddColumn('session_id', 'TEXT', 'redemptions');
    safeAddColumn('item_key', 'TEXT', 'store_redemptions');
    safeAddColumn('week_number', 'INTEGER', 'store_redemptions');
  }

  // --- Phase 6: Live-Stream Gate & Controlled Emission State ---
  private streamLive: boolean = true;
  private streamSessionId: string = 'session_live_default';
  private chatEarnTracker = new Map<string, { lastAwardMs: number; windowStartMs: number; chatEarned: number }>();
  private watchEarnTracker = new Map<string, { lastAwardMs: number; windowStartMs: number; watchEarned: number }>();

  public setStreamLive(isLive: boolean, sessionId?: string): void {
    this.streamLive = Boolean(isLive);
    if (sessionId) {
      this.streamSessionId = sessionId;
    } else if (isLive && !this.streamSessionId) {
      this.streamSessionId = `session_${Date.now()}`;
    }
  }

  public isStreamLive(): boolean {
    return this.streamLive;
  }

  public getStreamSessionId(): string {
    return this.streamSessionId;
  }

  /**
   * Chat-to-Earn: +5 $DIG every 5 minutes (cooldown = 300_000 ms) with organic message (filtering :emote:).
   * Max 60 $DIG / hour from chat, gated by streamLive === true.
   */
  public recordChatEarn(
    kickUserId: number,
    username: string,
    rawContent: string,
    nowMs: number = Date.now()
  ): { awarded: boolean; amount: number; newBalance: number; reason?: string } {
    const user = this.upsertUser(kickUserId, username);
    if (!this.streamLive) {
      return { awarded: false, amount: 0, newBalance: user.points_balance, reason: 'STREAM_OFFLINE' };
    }

    const stripped = (rawContent || '')
      .replace(/:[a-zA-Z0-9_\-]+:/g, ' ')
      .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/g, '');
    if (stripped.length < 2) {
      return { awarded: false, amount: 0, newBalance: user.points_balance, reason: 'EMOTE_OR_SPAM' };
    }

    const key = user.id;
    let chatState = this.chatEarnTracker.get(key);
    if (!chatState || nowMs - chatState.windowStartMs >= 3600_000) {
      chatState = {
        lastAwardMs: chatState ? chatState.lastAwardMs : -Infinity,
        windowStartMs: nowMs,
        chatEarned: 0
      };
    }

    if (nowMs - chatState.lastAwardMs < 300_000) {
      return { awarded: false, amount: 0, newBalance: user.points_balance, reason: 'CHAT_COOLDOWN_5M' };
    }

    if (chatState.chatEarned + 5 > 60) {
      return { awarded: false, amount: 0, newBalance: user.points_balance, reason: 'CHAT_HOURLY_CAP_60' };
    }

    const watchState = this.watchEarnTracker.get(key);
    const activeWatchEarned = (watchState && nowMs - watchState.windowStartMs < 3600_000) ? watchState.watchEarned : 0;
    if (chatState.chatEarned + activeWatchEarned + 5 > 100) {
      return { awarded: false, amount: 0, newBalance: user.points_balance, reason: 'TOTAL_HOURLY_CAP_100' };
    }

    const credit = this.creditPoints(user.id, 5, 'CHAT_TO_EARN', undefined, { streamSessionId: this.streamSessionId });
    chatState.lastAwardMs = nowMs;
    chatState.chatEarned += 5;
    this.chatEarnTracker.set(key, chatState);

    return { awarded: true, amount: 5, newBalance: credit.newBalance };
  }

  /**
   * Watch-to-Earn: +10 $DIG every 15 minutes (cooldown = 900_000 ms) in #watch for logged-in users.
   * Max 40 $DIG / hour from watch, gated by streamLive === true.
   */
  public recordWatchHeartbeat(
    userIdOrUsername: string,
    nowMs: number = Date.now()
  ): { awarded: boolean; amount: number; newBalance: number; reason?: string } {
    if (!userIdOrUsername || !String(userIdOrUsername).trim()) {
      return { awarded: false, amount: 0, newBalance: 0, reason: 'UNAUTHENTICATED' };
    }

    let user = this.getUserById(userIdOrUsername) || this.getUserByUsername(userIdOrUsername);
    if (!user) {
      user = this.upsertUser(Math.floor(nowMs / 1000) % 10000000 + 1000, userIdOrUsername);
    }

    if (!this.streamLive) {
      return { awarded: false, amount: 0, newBalance: user.points_balance, reason: 'STREAM_OFFLINE' };
    }

    const key = user.id;
    let watchState = this.watchEarnTracker.get(key);
    if (!watchState || nowMs - watchState.windowStartMs >= 3600_000) {
      watchState = {
        lastAwardMs: watchState ? watchState.lastAwardMs : -Infinity,
        windowStartMs: nowMs,
        watchEarned: 0
      };
    }

    if (nowMs - watchState.lastAwardMs < 900_000) {
      return { awarded: false, amount: 0, newBalance: user.points_balance, reason: 'WATCH_COOLDOWN_15M' };
    }

    if (watchState.watchEarned + 10 > 40) {
      return { awarded: false, amount: 0, newBalance: user.points_balance, reason: 'WATCH_HOURLY_CAP_40' };
    }

    const chatState = this.chatEarnTracker.get(key);
    const activeChatEarned = (chatState && nowMs - chatState.windowStartMs < 3600_000) ? chatState.chatEarned : 0;
    if (watchState.watchEarned + activeChatEarned + 10 > 100) {
      return { awarded: false, amount: 0, newBalance: user.points_balance, reason: 'TOTAL_HOURLY_CAP_100' };
    }

    const credit = this.creditPoints(user.id, 10, 'WATCH_TO_EARN', undefined, { streamSessionId: this.streamSessionId });
    watchState.lastAwardMs = nowMs;
    watchState.watchEarned += 10;
    this.watchEarnTracker.set(key, watchState);

    return { awarded: true, amount: 10, newBalance: credit.newBalance };
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
    creditAmount: number = 100,
    streamSessionId?: string
  ): { alreadyProcessed: boolean; sessionLimitReached?: boolean; error?: string; user: UserRow; newBalance: number } {
    const existing = this.db.prepare('SELECT * FROM redemptions WHERE id = ?').get(redemptionId);
    if (existing) {
      const user = this.getUserByKickId(kickUserId)!;
      return { alreadyProcessed: true, sessionLimitReached: false, user, newBalance: user.points_balance };
    }

    const user = this.upsertUser(kickUserId, username);
    const effectiveSession = streamSessionId || this.streamSessionId || 'session_live_default';

    // Max 1 channel points redemption per stream session per user
    const existingSessionRedemption = this.db.prepare(
      'SELECT id FROM redemptions WHERE kick_user_id = ? AND session_id = ? AND status = \'FULFILLED\' LIMIT 1'
    ).get(kickUserId, effectiveSession);

    if (existingSessionRedemption) {
      return {
        alreadyProcessed: false,
        sessionLimitReached: true,
        error: 'Max 1 channel points redemption per stream session',
        user,
        newBalance: user.points_balance
      };
    }

    const now = Math.floor(Date.now() / 1000);

    this.db.exec('BEGIN TRANSACTION;');
    try {
      this.db.prepare(`
        INSERT INTO redemptions (id, kick_reward_id, user_id, kick_user_id, status, created_at, session_id)
        VALUES (?, ?, ?, ?, 'FULFILLED', ?, ?)
      `).run(redemptionId, kickRewardId, user.id, kickUserId, now, effectiveSession);

      const newBalance = user.points_balance + creditAmount;
      const txId = crypto.randomUUID();
      this.db.prepare('UPDATE users SET points_balance = ? WHERE id = ?').run(newBalance, user.id);
      this.db.prepare(`
        INSERT INTO point_transactions (id, user_id, amount, balance_after, type, reference_id, metadata_json, created_at)
        VALUES (?, ?, ?, ?, 'CHANNEL_REWARD_REDEMPTION', ?, ?, ?)
      `).run(txId, user.id, creditAmount, newBalance, redemptionId, JSON.stringify({ kickRewardId, sessionId: effectiveSession }), now);

      this.db.exec('COMMIT;');
      return { alreadyProcessed: false, sessionLimitReached: false, user: this.getUserById(user.id)!, newBalance };
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

  public rejectStakeVerification(requestId: string): { success: boolean; error?: string } {
    try {
      this.db.prepare("UPDATE stake_verification_requests SET status = 'REJECTED' WHERE id = ?").run(requestId);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  // --- Store Voucher Redemptions (Live Queue, Weekly Stock, Cooldowns & VIP Discounts) ---

  public resolveStoreCatalogItem(voucherTitleOrKey: string): {
    key: string;
    title: string;
    regularCost: number;
    vipCost: number;
    weeklyStockLimit: number | null;
    oneTimePerAccount: boolean;
    cooldownDays: number;
    maxSplitCapUsd: number | null;
  } | null {
    const raw = (voucherTitleOrKey || '').trim().toLowerCase();
    if (!raw) return null;

    if (raw === 'weekly_raffle' || raw.includes('raffle')) {
      return {
        key: 'weekly_raffle',
        title: 'Weekly Raffle ($100 Bonus Buy Split)',
        regularCost: 50,
        vipCost: 50,
        weeklyStockLimit: null,
        oneTimePerAccount: false,
        cooldownDays: 0,
        maxSplitCapUsd: null
      };
    }
    if (raw === 'vip_discord' || (raw.includes('vip') && raw.includes('discord'))) {
      return {
        key: 'vip_discord',
        title: 'VIP Streamer Discord Role',
        regularCost: 500,
        vipCost: 500,
        weeklyStockLimit: null,
        oneTimePerAccount: true,
        cooldownDays: 0,
        maxSplitCapUsd: null
      };
    }
    if (raw === 'battle_entry' || raw.includes('1v1') || (raw.includes('battle') && raw.includes('entry'))) {
      return {
        key: 'battle_entry',
        title: 'Guaranteed 1v1 Battle Entry',
        regularCost: 1000,
        vipCost: 800,
        weeklyStockLimit: 6,
        oneTimePerAccount: false,
        cooldownDays: 14,
        maxSplitCapUsd: null
      };
    }
    if (raw === 'tourney_entry' || raw.includes('tourney') || raw.includes('8-bracket') || raw.includes('bracket')) {
      return {
        key: 'tourney_entry',
        title: 'Guaranteed 8-Bracket Tourney Entry',
        regularCost: 1500,
        vipCost: 1200,
        weeklyStockLimit: 6,
        oneTimePerAccount: false,
        cooldownDays: 0,
        maxSplitCapUsd: null
      };
    }
    if (raw === 'og_badge_role' || raw.includes('og') || raw.includes('badge')) {
      return {
        key: 'og_badge_role',
        title: 'OG Badge Kick Role',
        regularCost: 1500,
        vipCost: 1200,
        weeklyStockLimit: null,
        oneTimePerAccount: true,
        cooldownDays: 0,
        maxSplitCapUsd: null
      };
    }
    if (raw === 'bonus_split_40' || (raw.includes('40') && raw.includes('split'))) {
      return {
        key: 'bonus_split_40',
        title: '$40 Bonus Buy Split Profit (50/50)',
        regularCost: 6000,
        vipCost: 4800,
        weeklyStockLimit: 2,
        oneTimePerAccount: false,
        cooldownDays: 0,
        maxSplitCapUsd: 200
      };
    }
    if (raw === 'bonus_split_20' || (raw.includes('20') && raw.includes('split')) || raw.includes('bonus buy split')) {
      return {
        key: 'bonus_split_20',
        title: '$20 Bonus Buy Split Profit (50/50)',
        regularCost: 3000,
        vipCost: 2400,
        weeklyStockLimit: 3,
        oneTimePerAccount: false,
        cooldownDays: 0,
        maxSplitCapUsd: 100
      };
    }
    return null;
  }

  public getStoreCatalogStatus(userIdOrUsername?: string, weekNumber?: number, nowSec: number = Math.floor(Date.now() / 1000)): Array<{
    key: string;
    title: string;
    regularCost: number;
    vipCost: number;
    effectiveCost: number;
    weeklyStockLimit: number | null;
    usedThisWeek: number;
    remainingStock: number | null;
    soldOut: boolean;
    oneTimePerAccount: boolean;
    alreadyClaimedOneTime: boolean;
    cooldownDays: number;
    userOnCooldown: boolean;
    maxSplitCapUsd: number | null;
  }> {
    let user: UserRow | null = null;
    if (userIdOrUsername) {
      user = this.getUserById(userIdOrUsername) || this.getUserByUsername(userIdOrUsername);
    }
    const isStakeVip = Boolean(user && user.stake_verified === 1);
    const week = weekNumber || this.getWeekNumber(new Date(nowSec * 1000));

    const keys = ['weekly_raffle', 'vip_discord', 'battle_entry', 'tourney_entry', 'og_badge_role', 'bonus_split_20', 'bonus_split_40'];
    const allRedemptions = this.db.prepare(
      "SELECT * FROM store_redemptions WHERE status != 'REJECTED'"
    ).all() as Array<StoreRedemptionRow & { item_key?: string; week_number?: number }>;

    return keys.map(k => {
      const cat = this.resolveStoreCatalogItem(k)!;
      const effectiveCost = isStakeVip ? cat.vipCost : cat.regularCost;

      const matching = allRedemptions.filter(r => {
        if (r.item_key) return r.item_key === cat.key;
        const resolved = this.resolveStoreCatalogItem(r.voucher_title);
        return resolved?.key === cat.key;
      });

      const usedThisWeek = matching.filter(r => {
        const rWeek = r.week_number || this.getWeekNumber(new Date((r.created_at || nowSec) * 1000));
        return rWeek === week;
      }).length;

      const remainingStock = cat.weeklyStockLimit !== null
        ? Math.max(0, cat.weeklyStockLimit - usedThisWeek)
        : null;
      const soldOut = remainingStock !== null && remainingStock <= 0;

      const userMatches = user ? matching.filter(r => r.user_id === user!.id) : [];
      const alreadyClaimedOneTime = cat.oneTimePerAccount && userMatches.length > 0;

      let userOnCooldown = false;
      if (cat.cooldownDays > 0 && userMatches.length > 0) {
        const latestSec = Math.max(...userMatches.map(r => Number(r.created_at) || 0));
        if (nowSec - latestSec < cat.cooldownDays * 86400) {
          userOnCooldown = true;
        }
      }

      return {
        key: cat.key,
        title: cat.title,
        regularCost: cat.regularCost,
        vipCost: cat.vipCost,
        effectiveCost,
        weeklyStockLimit: cat.weeklyStockLimit,
        usedThisWeek,
        remainingStock,
        soldOut,
        oneTimePerAccount: cat.oneTimePerAccount,
        alreadyClaimedOneTime,
        cooldownDays: cat.cooldownDays,
        userOnCooldown,
        maxSplitCapUsd: cat.maxSplitCapUsd
      };
    });
  }

  public createStoreRedemption(
    userId: string,
    kickUsername: string,
    voucherTitle: string,
    costPoints?: number,
    nowSec: number = Math.floor(Date.now() / 1000),
    weekNumber?: number
  ): { success: boolean; redemption?: StoreRedemptionRow; effectiveCost?: number; remainingStock?: number | null; error?: string } {
    const user = this.getUserById(userId);
    if (!user) return { success: false, error: 'User not found' };

    const catalogItem = this.resolveStoreCatalogItem(voucherTitle);
    const week = weekNumber || this.getWeekNumber(new Date(nowSec * 1000));

    let effectiveCost = typeof costPoints === 'number' && costPoints > 0
      ? costPoints
      : (catalogItem ? catalogItem.regularCost : 100);

    if (catalogItem) {
      // Automatic Stake VIP discount for verified affiliates across catalog items
      if (user.stake_verified === 1 && catalogItem.vipCost < catalogItem.regularCost) {
        if (costPoints === undefined || costPoints >= catalogItem.vipCost) {
          effectiveCost = catalogItem.vipCost;
        }
      } else if (costPoints === undefined) {
        effectiveCost = catalogItem.regularCost;
      }

      const statusList = this.getStoreCatalogStatus(user.id, week, nowSec);
      const itemStatus = statusList.find(s => s.key === catalogItem.key);

      if (itemStatus) {
        if (itemStatus.alreadyClaimedOneTime) {
          return {
            success: false,
            error: 'LIMIT REACHED: VIP Streamer Discord Role can only be redeemed 1 time per account.'
          };
        }
        if (itemStatus.soldOut) {
          return {
            success: false,
            remainingStock: 0,
            error: `SOLD OUT THIS WEEK: Weekly stock limit (${catalogItem.weeklyStockLimit}/${catalogItem.weeklyStockLimit}) reached for ${catalogItem.title}.`
          };
        }
        if (itemStatus.userOnCooldown) {
          return {
            success: false,
            error: `COOLDOWN ACTIVE: ${catalogItem.title} has a ${catalogItem.cooldownDays}-day cooldown per user.`
          };
        }
      }
    }

    if (user.points_balance < effectiveCost) {
      return { success: false, error: `Insufficient balance: need ${effectiveCost} $DIG, have ${user.points_balance} $DIG` };
    }

    const id = crypto.randomUUID();

    this.db.exec('BEGIN TRANSACTION;');
    try {
      const newBalance = user.points_balance - effectiveCost;
      this.db.prepare('UPDATE users SET points_balance = ? WHERE id = ?').run(newBalance, userId);

      const txId = crypto.randomUUID();
      this.db.prepare(`
        INSERT INTO point_transactions (id, user_id, amount, balance_after, type, reference_id, metadata_json, created_at)
        VALUES (?, ?, ?, ?, 'STORE_VOUCHER_REDEMPTION', ?, ?, ?)
      `).run(
        txId,
        userId,
        -effectiveCost,
        newBalance,
        id,
        JSON.stringify({
          voucherTitle,
          itemKey: catalogItem?.key || null,
          stakeVerifiedVipDiscount: Boolean(catalogItem && catalogItem.vipCost < catalogItem.regularCost && user.stake_verified === 1),
          maxSplitCapUsd: catalogItem?.maxSplitCapUsd || null
        }),
        nowSec
      );

      this.db.prepare(`
        INSERT INTO store_redemptions (id, user_id, kick_username, voucher_title, cost_points, status, created_at, item_key, week_number)
        VALUES (?, ?, ?, ?, ?, 'PENDING', ?, ?, ?)
      `).run(id, userId, kickUsername, voucherTitle, effectiveCost, nowSec, catalogItem?.key || null, week);

      this.db.exec('COMMIT;');
      const list = this.getStoreRedemptions();
      const created = list.find(r => r.id === id);
      const updatedCatalog = catalogItem ? this.getStoreCatalogStatus(user.id, week, nowSec).find(s => s.key === catalogItem.key) : undefined;
      return {
        success: true,
        redemption: created,
        effectiveCost,
        remainingStock: updatedCatalog ? updatedCatalog.remainingStock : null
      };
    } catch (err: any) {
      this.db.exec('ROLLBACK;');
      return { success: false, error: err.message };
    }
  }

  /**
   * Phase 6 House Games Anti-Exploit Engine:
   * Connects the 9 House Games to real $DIG balance with:
   * - RTP = 95.00% (5% House Edge)
   * - MAX BET = 50 $DIG
   * - MAX WIN CAP = 500 $DIG net profit per spin/round
   */
  public processHouseGameBet(
    userIdOrUsername: string,
    game: string,
    betAmount: number,
    rawMultiplier: number
  ): {
    success: boolean;
    game: string;
    betAmount: number;
    rawPayout: number;
    cappedPayout: number;
    netProfit: number;
    newBalance: number;
    rtp: number;
    maxBet: number;
    maxWinCap: number;
    error?: string;
  } {
    const RTP = 95.00;
    const MAX_BET = 50;
    const MAX_WIN_CAP = 500;

    let user = this.getUserById(userIdOrUsername) || this.getUserByUsername(userIdOrUsername);
    if (!user) {
      return {
        success: false,
        game,
        betAmount,
        rawPayout: 0,
        cappedPayout: 0,
        netProfit: 0,
        newBalance: 0,
        rtp: RTP,
        maxBet: MAX_BET,
        maxWinCap: MAX_WIN_CAP,
        error: 'User not found'
      };
    }

    if (!Number.isFinite(betAmount) || betAmount < 1) {
      return {
        success: false,
        game,
        betAmount,
        rawPayout: 0,
        cappedPayout: 0,
        netProfit: 0,
        newBalance: user.points_balance,
        rtp: RTP,
        maxBet: MAX_BET,
        maxWinCap: MAX_WIN_CAP,
        error: 'MIN_BET_INVALID: Minimum bet is 1 $DIG'
      };
    }

    if (betAmount > MAX_BET) {
      return {
        success: false,
        game,
        betAmount,
        rawPayout: 0,
        cappedPayout: 0,
        netProfit: 0,
        newBalance: user.points_balance,
        rtp: RTP,
        maxBet: MAX_BET,
        maxWinCap: MAX_WIN_CAP,
        error: `MAX_BET_EXCEEDED: Maximum bet is ${MAX_BET} $DIG`
      };
    }

    const cleanBet = Math.floor(betAmount);
    if (user.points_balance < cleanBet) {
      return {
        success: false,
        game,
        betAmount: cleanBet,
        rawPayout: 0,
        cappedPayout: 0,
        netProfit: 0,
        newBalance: user.points_balance,
        rtp: RTP,
        maxBet: MAX_BET,
        maxWinCap: MAX_WIN_CAP,
        error: `INSUFFICIENT_BALANCE: Need ${cleanBet} $DIG, have ${user.points_balance} $DIG`
      };
    }

    const rawPayout = rawMultiplier > 0 ? Math.floor(cleanBet * rawMultiplier) : 0;
    // Cap net profit at +500 $DIG (so gross payout is at most cleanBet + 500)
    const maxGrossPayout = cleanBet + MAX_WIN_CAP;
    const cappedPayout = rawPayout > 0 ? Math.min(rawPayout, maxGrossPayout) : 0;
    const netProfit = cappedPayout - cleanBet;
    const newBalance = user.points_balance + netProfit;
    const now = Math.floor(Date.now() / 1000);

    this.db.exec('BEGIN TRANSACTION;');
    try {
      this.db.prepare('UPDATE users SET points_balance = ? WHERE id = ?').run(newBalance, user.id);
      const txId = crypto.randomUUID();
      this.db.prepare(`
        INSERT INTO point_transactions (id, user_id, amount, balance_after, type, reference_id, metadata_json, created_at)
        VALUES (?, ?, ?, ?, 'HOUSE_GAME_BET', ?, ?, ?)
      `).run(
        txId,
        user.id,
        netProfit,
        newBalance,
        game,
        JSON.stringify({ game, betAmount: cleanBet, rawMultiplier, rawPayout, cappedPayout, netProfit, rtp: RTP }),
        now
      );
      this.db.exec('COMMIT;');

      return {
        success: true,
        game,
        betAmount: cleanBet,
        rawPayout,
        cappedPayout,
        netProfit,
        newBalance,
        rtp: RTP,
        maxBet: MAX_BET,
        maxWinCap: MAX_WIN_CAP
      };
    } catch (err: any) {
      this.db.exec('ROLLBACK;');
      return {
        success: false,
        game,
        betAmount: cleanBet,
        rawPayout: 0,
        cappedPayout: 0,
        netProfit: 0,
        newBalance: user.points_balance,
        rtp: RTP,
        maxBet: MAX_BET,
        maxWinCap: MAX_WIN_CAP,
        error: err.message
      };
    }
  }

  public createKothPrizeRedemption(
    user: { id?: string; kickId?: number; username: string; displayName?: string },
    prizeTitle: string = 'King of the Hill - $20 Cashout (4 Streak Champion)'
  ): StoreRedemptionRow {
    let dbUser: UserRow | null = null;
    if (user.id) {
      dbUser = this.getUserById(user.id);
    }
    if (!dbUser && user.kickId) {
      dbUser = this.getUserByKickId(user.kickId);
    }
    if (!dbUser) {
      dbUser = this.upsertUser(user.kickId || Math.floor(Math.random() * 900000 + 100000), user.username, user.displayName);
    }

    const id = crypto.randomUUID();
    const now = Math.floor(Date.now() / 1000);

    this.db.prepare(`
      INSERT INTO store_redemptions (id, user_id, kick_username, voucher_title, cost_points, status, created_at)
      VALUES (?, ?, ?, ?, ?, 'PENDING', ?)
    `).run(id, dbUser.id, user.username, prizeTitle, 0, now);

    const list = this.getStoreRedemptions();
    return list.find(r => r.id === id) || {
      id,
      user_id: dbUser.id,
      kick_username: user.username,
      voucher_title: prizeTitle,
      cost_points: 0,
      status: 'PENDING',
      created_at: now
    };
  }

  public getStoreRedemptions(status?: string): StoreRedemptionRow[] {
    let sql = `
      SELECT 
        sr.id,
        sr.user_id,
        sr.kick_username,
        u.discord_username,
        u.stake_username,
        u.stake_verified,
        u.crypto_ltc,
        u.crypto_btc,
        u.crypto_eth,
        u.crypto_usdc,
        u.crypto_sol,
        sr.voucher_title,
        sr.cost_points,
        sr.status,
        sr.created_at
      FROM store_redemptions sr
      LEFT JOIN users u ON sr.user_id = u.id
    `;
    if (status) {
      sql += ' WHERE sr.status = ? ORDER BY sr.created_at DESC';
      return this.db.prepare(sql).all(status) as StoreRedemptionRow[];
    }
    sql += ' ORDER BY sr.created_at DESC';
    return this.db.prepare(sql).all() as StoreRedemptionRow[];
  }

  public approveStoreRedemption(redemptionId: string): { success: boolean; error?: string } {
    try {
      this.db.prepare("UPDATE store_redemptions SET status = 'FULFILLED' WHERE id = ?").run(redemptionId);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  public rejectStoreRedemption(redemptionId: string, refund: boolean = true): { success: boolean; refunded: boolean; error?: string } {
    const row = this.db.prepare('SELECT * FROM store_redemptions WHERE id = ?').get(redemptionId) as StoreRedemptionRow | undefined;
    if (!row) return { success: false, refunded: false, error: 'Redemption not found' };

    this.db.exec('BEGIN TRANSACTION;');
    try {
      this.db.prepare("UPDATE store_redemptions SET status = 'REJECTED' WHERE id = ?").run(redemptionId);
      let refunded = false;

      if (refund && row.cost_points > 0) {
        const user = this.getUserById(row.user_id);
        if (user) {
          const newBalance = user.points_balance + row.cost_points;
          this.db.prepare('UPDATE users SET points_balance = ? WHERE id = ?').run(newBalance, user.id);
          const txId = crypto.randomUUID();
          const now = Math.floor(Date.now() / 1000);
          this.db.prepare(`
            INSERT INTO point_transactions (id, user_id, amount, balance_after, type, reference_id, metadata_json, created_at)
            VALUES (?, ?, ?, ?, 'STORE_REDEMPTION_REFUND', ?, ?, ?)
          `).run(txId, user.id, row.cost_points, newBalance, redemptionId, JSON.stringify({ voucherTitle: row.voucher_title }), now);
          refunded = true;
        }
      }

      this.db.exec('COMMIT;');
      return { success: true, refunded };
    } catch (err: any) {
      this.db.exec('ROLLBACK;');
      return { success: false, refunded: false, error: err.message };
    }
  }

  // --- Weekly Stream Draw & Provably Fair Raffles ---

  public getWeekNumber(date: Date = new Date()): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }

  public buyRaffleTickets(
    userId: string,
    kickUsername: string,
    ticketCount: number,
    costPerTicket: number = 50,
    weekNumber?: number
  ): { success: boolean; totalTickets: number; error?: string } {
    const user = this.getUserById(userId);
    if (!user) return { success: false, totalTickets: 0, error: 'User not found' };
    const cost = ticketCount * costPerTicket;
    if (user.points_balance < cost) {
      return { success: false, totalTickets: 0, error: `Insufficient points. Required: ${cost} $DIG` };
    }

    const week = weekNumber || this.getWeekNumber();
    const now = Math.floor(Date.now() / 1000);

    this.db.exec('BEGIN TRANSACTION;');
    try {
      const newBalance = user.points_balance - cost;
      this.db.prepare('UPDATE users SET points_balance = ? WHERE id = ?').run(newBalance, userId);

      const existing = this.db.prepare('SELECT * FROM raffle_tickets WHERE user_id = ? AND week_number = ?').get(userId, week) as RaffleTicketRow | undefined;
      let totalTickets = ticketCount;

      if (existing) {
        totalTickets = existing.ticket_count + ticketCount;
        this.db.prepare('UPDATE raffle_tickets SET ticket_count = ? WHERE id = ?').run(totalTickets, existing.id);
      } else {
        const id = crypto.randomUUID();
        this.db.prepare(`
          INSERT INTO raffle_tickets (id, user_id, kick_username, ticket_count, week_number, created_at)
          VALUES (?, ?, ?, ?, ?, ?)
        `).run(id, userId, kickUsername, ticketCount, week, now);
      }

      this.db.exec('COMMIT;');
      return { success: true, totalTickets };
    } catch (err: any) {
      this.db.exec('ROLLBACK;');
      return { success: false, totalTickets: 0, error: err.message };
    }
  }

  public getRaffleLedger(weekNumber?: number): {
    totalTickets: number;
    weekNumber: number;
    participants: Array<{ user: string; tickets: number; percentage: number; isSub: boolean }>;
  } {
    const week = weekNumber || this.getWeekNumber();
    const rows = this.db.prepare(`
      SELECT kick_username as user, SUM(ticket_count) as tickets
      FROM raffle_tickets
      WHERE week_number = ?
      GROUP BY kick_username
      ORDER BY tickets DESC
    `).all(week) as Array<{ user: string; tickets: number }>;

    const totalTickets = rows.reduce((sum, r) => sum + Number(r.tickets), 0);

    const participants = rows.map(r => ({
      user: r.user.startsWith('@') ? r.user : '@' + r.user,
      tickets: Number(r.tickets),
      percentage: totalTickets > 0 ? Number(((Number(r.tickets) / totalTickets) * 100).toFixed(1)) : 0,
      isSub: true
    }));

    return { totalTickets, weekNumber: week, participants };
  }

  public rollProvablyFairRaffle(
    weekNumber?: number,
    serverSeed?: string,
    clientSeed?: string
  ): {
    winner: string;
    ticketNumber: number;
    totalTickets: number;
    serverSeed: string;
    serverSeedHash: string;
    clientSeed: string;
  } {
    const ledger = this.getRaffleLedger(weekNumber);
    if (ledger.totalTickets <= 0) {
      return {
        winner: 'No Tickets Sold',
        ticketNumber: 0,
        totalTickets: 0,
        serverSeed: '',
        serverSeedHash: '',
        clientSeed: ''
      };
    }

    const sSeed = serverSeed || crypto.randomBytes(32).toString('hex');
    const cSeed = clientSeed || `stream_week_${ledger.weekNumber}_${Date.now()}`;
    const serverSeedHash = crypto.createHash('sha256').update(sSeed).digest('hex');

    const hmac = crypto.createHmac('sha256', sSeed).update(cSeed).digest('hex');
    const hexSlice = hmac.substring(0, 8);
    const intVal = parseInt(hexSlice, 16);
    const winningTicketIndex = (intVal % ledger.totalTickets) + 1;

    let accumulated = 0;
    let winner = ledger.participants[0].user;
    for (const p of ledger.participants) {
      accumulated += p.tickets;
      if (winningTicketIndex <= accumulated) {
        winner = p.user;
        break;
      }
    }

    return {
      winner,
      ticketNumber: winningTicketIndex,
      totalTickets: ledger.totalTickets,
      serverSeed: sSeed,
      serverSeedHash,
      clientSeed: cSeed
    };
  }

  // --- Anti-Sybil Security Alerts & Enforcement ---

  public getSecurityAlerts(): SecurityAlertRow[] {
    const rows = this.db.prepare(`
      SELECT 
        ac.cluster_id,
        ac.primary_user_id,
        u1.username as primary_username,
        ac.associated_user_id as alt_user_id,
        u2.username as alt_username,
        ac.reason,
        COALESCE(ud.device_hash, 'dev_hw_' || substr(ac.cluster_id, 1, 8)) as device_hash,
        ud.ip_subnet,
        u2.stake_username,
        MAX(u1.risk_score, u2.risk_score) as risk_score,
        ac.detected_at
      FROM alt_clusters ac
      LEFT JOIN users u1 ON ac.primary_user_id = u1.id
      LEFT JOIN users u2 ON ac.associated_user_id = u2.id
      LEFT JOIN user_devices ud ON (ud.user_id = ac.associated_user_id OR ud.user_id = ac.primary_user_id)
      GROUP BY ac.cluster_id
      ORDER BY ac.detected_at DESC
    `).all() as any[];

    return rows.map(r => ({
      cluster_id: r.cluster_id,
      primary_user_id: r.primary_user_id,
      primary_username: r.primary_username || 'unknown',
      alt_user_id: r.alt_user_id,
      alt_username: r.alt_username || 'unknown',
      reason: r.reason,
      device_hash: r.device_hash,
      ip_subnet: r.ip_subnet || '190.19.12.0/24',
      stake_username: r.stake_username,
      risk_score: r.risk_score || 85,
      detected_at: r.detected_at
    }));
  }

  public shadowbanUser(username: string): { success: boolean; error?: string } {
    const clean = username.trim().toLowerCase().replace('@', '');
    try {
      this.db.prepare("UPDATE users SET is_shadowbanned = 1, risk_score = 100 WHERE LOWER(username) = ?").run(clean);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  public freezeUserBalance(username: string): { success: boolean; frozenBalance: number; error?: string } {
    const clean = username.trim().toLowerCase().replace('@', '');
    const user = this.getUserByUsername(clean);
    if (!user) return { success: false, frozenBalance: 0, error: 'User not found' };

    try {
      const oldBal = user.points_balance;
      this.db.prepare("UPDATE users SET points_balance = 0, risk_score = 100 WHERE id = ?").run(user.id);
      return { success: true, frozenBalance: oldBal };
    } catch (err: any) {
      return { success: false, frozenBalance: 0, error: err.message };
    }
  }

  public whitelistCluster(clusterId: string): { success: boolean; error?: string } {
    try {
      this.db.prepare("DELETE FROM alt_clusters WHERE cluster_id = ?").run(clusterId);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  // --- Cloudflare D1 Synchronization ---

  public exportStateJson(): Record<string, any> {
    return {
      users: this.db.prepare('SELECT * FROM users').all(),
      stake_verification_requests: this.db.prepare('SELECT * FROM stake_verification_requests').all(),
      store_redemptions: this.db.prepare('SELECT * FROM store_redemptions').all(),
      raffle_tickets: this.db.prepare('SELECT * FROM raffle_tickets').all(),
      user_devices: this.db.prepare('SELECT * FROM user_devices').all(),
      alt_clusters: this.db.prepare('SELECT * FROM alt_clusters').all(),
      exported_at: Date.now()
    };
  }

  public importStateJson(state: any): { success: boolean; count: number } {
    if (!state || typeof state !== 'object') return { success: false, count: 0 };
    let count = 0;
    this.db.exec('BEGIN TRANSACTION;');
    try {
      if (Array.isArray(state.users)) {
        for (const u of state.users) {
          this.db.prepare(`
            INSERT OR REPLACE INTO users (
              id, kick_id, username, display_name, avatar, stake_username, stake_verified,
              points_balance, risk_score, is_shadowbanned, kick_created_at, first_seen_at, last_seen_at,
              discord_id, discord_username, discord_avatar, crypto_ltc, crypto_btc, crypto_eth,
              crypto_usdc, crypto_sol, x_handle, ig_handle
            ) VALUES (
              ?, ?, ?, ?, ?, ?, ?,
              ?, ?, ?, ?, ?, ?,
              ?, ?, ?, ?, ?, ?,
              ?, ?, ?, ?
            )
          `).run(
            u.id, u.kick_id, u.username, u.display_name || u.username, u.avatar || '', u.stake_username || null, u.stake_verified ? 1 : 0,
            u.points_balance || 0, u.risk_score || 0, u.is_shadowbanned ? 1 : 0, u.kick_created_at || null, u.first_seen_at || Math.floor(Date.now() / 1000), u.last_seen_at || Math.floor(Date.now() / 1000),
            u.discord_id || null, u.discord_username || null, u.discord_avatar || null, u.crypto_ltc || null, u.crypto_btc || null, u.crypto_eth || null,
            u.crypto_usdc || null, u.crypto_sol || null, u.x_handle || null, u.ig_handle || null
          );
          count++;
        }
      }

      if (Array.isArray(state.store_redemptions)) {
        for (const r of state.store_redemptions) {
          this.db.prepare(`
            INSERT OR REPLACE INTO store_redemptions (id, user_id, kick_username, voucher_title, cost_points, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `).run(r.id, r.user_id, r.kick_username, r.voucher_title, r.cost_points, r.status, r.created_at);
          count++;
        }
      }

      if (Array.isArray(state.raffle_tickets)) {
        for (const rt of state.raffle_tickets) {
          this.db.prepare(`
            INSERT OR REPLACE INTO raffle_tickets (id, user_id, kick_username, ticket_count, week_number, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
          `).run(rt.id, rt.user_id, rt.kick_username, rt.ticket_count, rt.week_number, rt.created_at);
          count++;
        }
      }

      this.db.exec('COMMIT;');
      return { success: true, count };
    } catch (err) {
      this.db.exec('ROLLBACK;');
      throw err;
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
