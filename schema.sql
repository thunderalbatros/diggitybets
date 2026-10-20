-- HuntHub / DiggityBets — Canonical Cloudflare D1 & SQLite Edge Schema (2026)
-- Zero-Cost Free Tier (100% Free-to-Play Virtual Points, Zero Real Custody, 90-Day Privacy Retention)

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
  last_seen_at INTEGER NOT NULL,
  discord_id TEXT,
  discord_username TEXT,
  discord_avatar TEXT,
  crypto_ltc TEXT,
  crypto_btc TEXT,
  crypto_eth TEXT,
  crypto_usdc TEXT,
  crypto_sol TEXT,
  x_handle TEXT,
  ig_handle TEXT
);

CREATE TABLE IF NOT EXISTS user_devices (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  device_hash TEXT NOT NULL,
  ip_subnet TEXT,
  first_seen_at INTEGER NOT NULL,
  last_seen_at INTEGER NOT NULL,
  UNIQUE(user_id, device_hash)
);

CREATE TABLE IF NOT EXISTS alt_clusters (
  cluster_id TEXT PRIMARY KEY,
  primary_user_id TEXT NOT NULL,
  associated_user_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  detected_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS point_transactions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  amount INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  type TEXT NOT NULL,
  reference_id TEXT,
  metadata_json TEXT,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS stake_verification_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  kick_username TEXT NOT NULL,
  stake_username TEXT NOT NULL,
  target_multiplier INTEGER NOT NULL,
  bet_id TEXT UNIQUE NOT NULL,
  share_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS store_redemptions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  kick_username TEXT NOT NULL,
  voucher_title TEXT NOT NULL,
  cost_points INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS raffle_tickets (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  kick_username TEXT NOT NULL,
  ticket_count INTEGER NOT NULL,
  week_number INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS kv_store (
  key TEXT PRIMARY KEY,
  value_json TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_username_lower ON users(LOWER(username));
CREATE INDEX IF NOT EXISTS idx_users_points_desc ON users(points_balance DESC);
CREATE INDEX IF NOT EXISTS idx_user_devices_hash ON user_devices(device_hash, last_seen_at);
CREATE INDEX IF NOT EXISTS idx_point_tx_user_created ON point_transactions(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_stake_req_created ON stake_verification_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_store_redemptions_created ON store_redemptions(created_at DESC);
