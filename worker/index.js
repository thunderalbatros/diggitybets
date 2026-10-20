/**
 * HuntHub Cloudflare Worker — Production Edge API (100% Free Plan)
 * Handles Kick.com OAuth 2.1 PKCE exchange, Discord OAuth2, and Cloudflare D1 Serverless SQLite.
 * Zero secrets exposed in git. Environment variables managed in Cloudflare Dashboard or .dev.vars.
 */

let d1Initialized = false;
let lastRetentionPruneAt = 0;
let cachedDuoQueues = {
  battleQueue: [],
  tourneyQueue: [],
  mode: 'battle',
  counts: { battle: 0, tourney: 0 }
};

async function initD1(db) {
  if (!db) return;
  try {
    if (!d1Initialized) {
      await db.exec(`
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
      `);
      d1Initialized = true;
    }

    // Automatic 90-day data retention pruning (runs at most once every 6 hours per isolate)
    const nowMs = Date.now();
    if (nowMs - lastRetentionPruneAt > 6 * 3600 * 1000) {
      lastRetentionPruneAt = nowMs;
      const ninetyDaysAgoSec = Math.floor(nowMs / 1000) - (90 * 86400);
      const ninetyDaysAgoMs = nowMs - (90 * 86400 * 1000);
      await db.prepare('DELETE FROM user_devices WHERE last_seen_at < ?1').bind(ninetyDaysAgoSec).run();
      await db.prepare('DELETE FROM point_transactions WHERE created_at < ?1').bind(ninetyDaysAgoMs).run();
    }
  } catch (e) {
    console.warn('[D1] Schema initialization note:', e.message);
  }
}

function constantTimeEqual(a, b) {
  const strA = String(a || '');
  const strB = String(b || '');
  if (!strA || strA.length !== strB.length) return false;
  let diff = 0;
  for (let i = 0; i < strA.length; i++) {
    diff |= strA.charCodeAt(i) ^ strB.charCodeAt(i);
  }
  return diff === 0;
}

function isStakeCompanionHost(host) {
  return (
    host === 'stake.com' || host.endsWith('.stake.com') ||
    host === 'stake.krd' || host.endsWith('.stake.krd') ||
    host === 'stake.us' || host.endsWith('.stake.us') ||
    host === 'stake.bet' || host.endsWith('.stake.bet') ||
    host === 'stake.bz' || host.endsWith('.stake.bz') ||
    host === 'stake.ac' || host.endsWith('.stake.ac') ||
    host === 'stake.games' || host.endsWith('.stake.games') ||
    host === 'stake.pet' || host.endsWith('.stake.pet') ||
    /^stake\d*\.[a-z]+$/i.test(host)
  );
}

function resolveTrustedOrigin(request) {
  const origin = request.headers.get('origin') || '';
  if (!origin) return 'https://diggitybets.vip';
  try {
    const u = new URL(origin);
    const host = u.hostname.toLowerCase();
    if (
      host === 'diggitybets.vip' ||
      host === 'www.diggitybets.vip' ||
      host.endsWith('.diggitybets.pages.dev') ||
      host === 'diggitybets.pages.dev' ||
      host === 'diggitybets.positive-handspring.workers.dev' ||
      host === 'localhost' ||
      host === '127.0.0.1' ||
      isStakeCompanionHost(host)
    ) {
      return origin;
    }
  } catch (_) {}
  return 'https://diggitybets.vip';
}

function isSameOrTrustedOrigin(request) {
  const origin = request.headers.get('origin') || '';
  const referer = request.headers.get('referer') || '';
  const checkUrl = origin || referer;
  if (!checkUrl) return true; // Same-origin or direct server/OBS request without cross-site Origin
  try {
    const u = new URL(checkUrl);
    const host = u.hostname.toLowerCase();
    return (
      host === 'diggitybets.vip' ||
      host === 'www.diggitybets.vip' ||
      host.endsWith('.diggitybets.pages.dev') ||
      host === 'diggitybets.pages.dev' ||
      host === 'diggitybets.positive-handspring.workers.dev' ||
      host === 'localhost' ||
      host === '127.0.0.1' ||
      isStakeCompanionHost(host)
    );
  } catch (_) {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Admin & User authentication (Gate A1 + Gate A5 — HMAC-SHA256 signed tokens)
// Admin tokens are short-lived, HMAC-SHA256 signed with env.ADMIN_API_SECRET and are
// only issued after a verified Kick OAuth login of an allow-listed streamer account.
// User tokens are issued after a verified Kick OAuth login for any spectator account
// and prevent IDOR / crypto wallet hijacking / unauthorized redemptions.
// Without ADMIN_API_SECRET every protected request is denied (fail closed).
// ---------------------------------------------------------------------------
const ADMIN_USERNAMES = ['diggitybets', 'diggity_bets', 'tarkansky'];
const ADMIN_KICK_IDS = [88254585];
const ADMIN_TOKEN_TTL_MS = 12 * 60 * 60 * 1000;
const USER_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function b64urlEncodeBytes(bytes) {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlEncodeText(text) {
  return b64urlEncodeBytes(new TextEncoder().encode(text));
}

function b64urlDecodeText(b64url) {
  const b64 = String(b64url).replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}

async function hmacSha256B64Url(secret, message) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return b64urlEncodeBytes(new Uint8Array(sig));
}

function isAdminIdentity(username, kickId) {
  const name = String(username || '').trim().toLowerCase().replace(/^@/, '');
  return ADMIN_USERNAMES.includes(name) || ADMIN_KICK_IDS.includes(Number(kickId));
}

export async function issueAdminToken({ username, kickId }, secret, ttlMs = ADMIN_TOKEN_TTL_MS) {
  if (!secret) return '';
  const payload = b64urlEncodeText(JSON.stringify({
    role: 'admin',
    u: String(username || '').trim().toLowerCase().replace(/^@/, ''),
    k: Number(kickId) || 0,
    exp: Date.now() + ttlMs
  }));
  return `${payload}.${await hmacSha256B64Url(secret, payload)}`;
}

export async function issueUserToken({ username, kickId }, secret, ttlMs = USER_TOKEN_TTL_MS) {
  if (!secret) return '';
  const cleanUser = String(username || '').trim().toLowerCase().replace(/^@/, '');
  if (!cleanUser) return '';
  const payload = b64urlEncodeText(JSON.stringify({
    role: 'user',
    u: cleanUser,
    k: Number(kickId) || 0,
    exp: Date.now() + ttlMs
  }));
  return `${payload}.${await hmacSha256B64Url(secret, payload)}`;
}

function parseCookieHeader(cookieHeader, keyName) {
  if (!cookieHeader) return '';
  const parts = String(cookieHeader).split(';');
  for (const part of parts) {
    const [k, ...rest] = part.trim().split('=');
    if (k === keyName) return decodeURIComponent(rest.join('='));
  }
  return '';
}

async function isAuthorizedAdmin(request, env, explicitToken = '') {
  if (!isSameOrTrustedOrigin(request)) return false;

  const configuredSecret = env?.ADMIN_API_SECRET || '';
  if (!configuredSecret) return false; // fail closed: no secret, no admin API

  const authHeader = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim();
  const token = (
    explicitToken ||
    request.headers.get('x-admin-token') ||
    request.headers.get('x-admin-secret') ||
    authHeader ||
    ''
  ).trim();
  if (!token) return false;

  // Break-glass: the raw secret itself (kept private by the streamer, never shipped to the browser).
  if (constantTimeEqual(token, configuredSecret)) return true;

  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payloadB64, sig] = parts;
  try {
    const expectedSig = await hmacSha256B64Url(configuredSecret, payloadB64);
    if (!constantTimeEqual(sig, expectedSig)) return false;
    const payload = JSON.parse(b64urlDecodeText(payloadB64));
    if (!payload || typeof payload.exp !== 'number' || payload.exp < Date.now()) return false;
    return isAdminIdentity(payload.u, payload.k);
  } catch (_) {
    return false;
  }
}

export async function verifyUserSession(request, env, expectedUsername = '') {
  if (!isSameOrTrustedOrigin(request)) return { ok: false, reason: 'FORBIDDEN_ORIGIN' };

  const cleanExpected = String(expectedUsername || '').trim().toLowerCase().replace(/^@+/, '');
  if (await isAuthorizedAdmin(request, env)) {
    return { ok: true, isAdmin: true, username: cleanExpected || 'diggitybets' };
  }

  const secret = env?.USER_SESSION_SECRET || env?.ADMIN_API_SECRET || '';
  if (!secret) return { ok: false, reason: 'NO_SECRET_CONFIGURED' };

  const authHeader = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim();
  const cookieToken = parseCookieHeader(request.headers.get('cookie'), 'hh_session');
  const token = (request.headers.get('x-user-token') || cookieToken || authHeader || '').trim();
  if (!token) return { ok: false, reason: 'MISSING_USER_TOKEN' };

  const parts = token.split('.');
  if (parts.length !== 2) return { ok: false, reason: 'MALFORMED_TOKEN' };
  const [payloadB64, sig] = parts;
  try {
    const expectedSig = await hmacSha256B64Url(secret, payloadB64);
    if (!constantTimeEqual(sig, expectedSig)) return { ok: false, reason: 'INVALID_SIGNATURE' };
    const payload = JSON.parse(b64urlDecodeText(payloadB64));
    if (!payload || typeof payload.exp !== 'number' || payload.exp < Date.now()) {
      return { ok: false, reason: 'TOKEN_EXPIRED' };
    }
    const tokenUser = String(payload.u || '').trim().toLowerCase().replace(/^@+/, '');
    if (!tokenUser) return { ok: false, reason: 'EMPTY_USER' };
    if (cleanExpected && tokenUser !== cleanExpected) {
      return { ok: false, reason: 'USER_MISMATCH' };
    }
    return { ok: true, isAdmin: false, username: tokenUser, kickId: Number(payload.k) || 0 };
  } catch (_) {
    return { ok: false, reason: 'INVALID_PAYLOAD' };
  }
}


// In-Memory L1 Sliding Window Rate Limiter
const ipRateLimits = new Map();

function checkEdgeRateLimit(ip, endpointKey, maxRequests, windowMs) {
  const now = Date.now();
  const key = `${ip || 'unknown'}:${endpointKey}`;
  const record = ipRateLimits.get(key) || { count: 0, resetAt: now + windowMs };

  if (now > record.resetAt) {
    record.count = 1;
    record.resetAt = now + windowMs;
  } else {
    record.count += 1;
  }
  ipRateLimits.set(key, record);

  // Periodically clean up expired keys (keep memory bounded under 2000 entries)
  if (ipRateLimits.size > 2000) {
    for (const [k, v] of ipRateLimits.entries()) {
      if (now > v.resetAt) ipRateLimits.delete(k);
    }
  }

  return {
    allowed: record.count <= maxRequests,
    current: record.count,
    resetInSec: Math.max(1, Math.ceil((record.resetAt - now) / 1000))
  };
}

// Server-Side Device Fingerprint & Multi-Account Correlation
async function recordServerUserDevice(db, userId, deviceHash, clientIp) {
  if (!db || !userId || !deviceHash) return;
  try {
    const subnet = (clientIp || '').split('.').slice(0, 3).join('.') + '.0/24';
    const now = Math.floor(Date.now() / 1000);
    const cleanUser = String(userId).trim().toLowerCase().replace(/^@/, '');

    // 1. Check if another account used this device in the last 30 days
    const existing = await db.prepare(`
      SELECT DISTINCT user_id FROM user_devices 
      WHERE device_hash = ?1 AND LOWER(user_id) != ?2
    `).bind(deviceHash, cleanUser).all();

    if (existing && Array.isArray(existing.results) && existing.results.length > 0) {
      for (const alt of existing.results) {
        const altId = String(alt.user_id).trim().toLowerCase();
        await db.prepare(`
          INSERT OR IGNORE INTO alt_clusters (cluster_id, primary_user_id, associated_user_id, reason, detected_at)
          VALUES (?1, ?2, ?3, 'SHARED_DEVICE_FINGERPRINT', ?4)
        `).bind(crypto.randomUUID(), cleanUser, altId, now).run();

        // Increment risk score for both associated accounts
        await db.prepare(`
          UPDATE users SET risk_score = MIN(100, risk_score + 40)
          WHERE LOWER(username) IN (?1, ?2)
        `).bind(cleanUser, altId).run();
      }
    }

    // 2. Upsert user device mapping
    await db.prepare(`
      INSERT INTO user_devices (id, user_id, device_hash, ip_subnet, first_seen_at, last_seen_at)
      VALUES (?1, ?2, ?3, ?4, ?5, ?5)
      ON CONFLICT(user_id, device_hash) DO UPDATE SET last_seen_at = ?5
    `).bind(crypto.randomUUID(), cleanUser, deviceHash, subnet, now).run();
  } catch (err) {
    console.warn('[AntiSybil] Error recording device:', err.message);
  }
}

// Cloudflare Turnstile Verification Helper
async function verifyTurnstileToken(token, secretKey, remoteIp) {
  if (!token) return false;
  try {
    const formData = new FormData();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (remoteIp) formData.append('remoteip', remoteIp);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    return Boolean(data.success);
  } catch (_) {
    return false;
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const allowedOrigin = resolveTrustedOrigin(request);

    // 1. CORS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': allowedOrigin,
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-user, x-admin-token, x-admin-secret, x-user-token, x-device-fingerprint, Kick-Event-Signature',
          'Vary': 'Origin'
        }
      });
    }

    const corsHeaders = {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Vary': 'Origin',
      'Content-Type': 'application/json'
    };

    // Auto-init D1 schema and 90-day retention pruning on API requests
    if (env.DB && url.pathname.startsWith('/api/')) {
      ctx.waitUntil(initD1(env.DB));
    }

    // 2. Static Assets binding (Cloudflare Workers Static Assets)
    if (env.ASSETS && !url.pathname.startsWith('/api/')) {
      const assetRes = await env.ASSETS.fetch(request);
      if (assetRes.status !== 404) {
        return assetRes;
      }
      const isOverlayOrWheelPath = /^\/(overlay-[a-z0-9-]+|wheel-[a-z0-9-]+|casino-suite)(\/.*)?$/i.test(url.pathname);
      if (isOverlayOrWheelPath) {
        const cleanPath = url.pathname.replace(/\/+$/, '');
        if (!cleanPath.endsWith('.html') && !cleanPath.includes('.')) {
          const indexUrl = new URL(`${cleanPath}/index.html${url.search}`, url.origin);
          const subIndexRes = await env.ASSETS.fetch(new Request(indexUrl.toString(), request));
          if (subIndexRes.status !== 404) {
            return subIndexRes;
          }
        }
        return assetRes;
      }
      return env.ASSETS.fetch(new Request(`${url.origin}/index.html`, request));
    }

    // 3. Healthcheck
    if (url.pathname === '/api/health') {
      return new Response(JSON.stringify({
        status: 'ok',
        edgeRegion: request.cf?.colo || 'LOCAL',
        d1Active: !!env.DB,
        timestamp: Date.now()
      }), { headers: corsHeaders });
    }

    // 3.05 Live Casino RTP & New Slots Edge Proxy (Cached 300s at Cloudflare Edge)
    if (url.pathname === '/api/intel/live-rtp' && request.method === 'GET') {
      const casino = (url.searchParams.get('casino') || 'stake').toLowerCase().replace(/[^a-z0-9]/g, '');
      const validCasinos = ['stake', '500', 'roobet', 'razed', 'duelbits', 'all'];
      const targetCasino = validCasinos.includes(casino) ? casino : 'stake';
      const win = (url.searchParams.get('window') || 'day').toLowerCase();
      const cacheKey = new Request(`https://edge-cache.diggitybets.internal/intel/rtp/${targetCasino}/${win}`, { method: 'GET' });
      const cache = typeof caches !== 'undefined' && caches.default ? caches.default : null;

      if (cache) {
        const cached = await cache.match(cacheKey);
        if (cached) {
          const resp = new Response(cached.body, cached);
          resp.headers.set('Access-Control-Allow-Origin', allowedOrigin);
          return resp;
        }
      }

      try {
        const upstreamUrl = `https://bonushunt.gg/api/slots/rtp?casino=${encodeURIComponent(targetCasino)}&window=${encodeURIComponent(win)}`;
        const upRes = await fetch(upstreamUrl, {
          headers: { 'Accept': 'application/json', 'User-Agent': 'DiggityBets-Edge/2.1' }
        });
        if (upRes.ok) {
          const data = await upRes.json();
          const rows = Array.isArray(data.rows) ? data.rows : [];
          // Trim to top 160 most relevant rows (highest volume + hottest + coldest) to keep payload < 45 KB
          const activeWin = data.window || win || 'day';
          const scored = rows.map(r => {
            const st = r.stats?.[activeWin] || r.stats?.day || r.stats?.week || r.stats?.month || r.stats?.all || {};
            const rtpPct = typeof st.rtp === 'number' ? Number((st.rtp * 100).toFixed(2)) : null;
            return {
              name: r.name,
              provider: r.provider,
              image: r.image,
              url: r.url,
              bonusBuy: Boolean(r.bonusBuy),
              onlyOnStake: Boolean(r.onlyOnStake),
              casinos: r.casinos || [targetCasino],
              observedRtp: rtpPct,
              betCount: st.betCount ?? null,
              wageredValue: st.wageredValue ? Math.round(st.wageredValue) : null,
              hasVolume: Boolean(st.hasVolume),
              stats: r.stats
            };
          }).filter(r => r.observedRtp != null && r.observedRtp > 5 && r.observedRtp < 450);

          const highVol = scored.filter(r => (r.betCount == null || r.betCount >= 5000));
          const pool = highVol.length >= 60 ? highVol : scored;
          const hot = [...pool].sort((a, b) => b.observedRtp - a.observedRtp).slice(0, 55);
          const cold = [...pool].sort((a, b) => a.observedRtp - b.observedRtp).slice(0, 45);
          const byBets = [...scored].sort((a, b) => (b.betCount || 0) - (a.betCount || 0)).slice(0, 60);

          const dedup = new Map();
          for (const item of [...byBets, ...hot, ...cold]) {
            if (!dedup.has(item.name.toLowerCase())) dedup.set(item.name.toLowerCase(), item);
          }

          const payload = JSON.stringify({
            ok: true,
            source: 'cloudflare-edge-live',
            casino: targetCasino,
            window: activeWin,
            windows: data.windows || ['day', 'week', 'month', 'all'],
            casinos: data.casinos || [],
            fetchedAt: data.fetchedAt || new Date().toISOString(),
            totalTracked: rows.length,
            items: [...dedup.values()]
          });

          const edgeResp = new Response(payload, {
            headers: {
              ...corsHeaders,
              'Cache-Control': 'public, max-age=300, s-maxage=300'
            }
          });
          if (cache) ctx.waitUntil(cache.put(cacheKey, edgeResp.clone()));
          return edgeResp;
        }
      } catch (e) {}
      return new Response(JSON.stringify({ ok: false, fallback: true }), { status: 200, headers: corsHeaders });
    }

    if (url.pathname === '/api/intel/new-slots' && request.method === 'GET') {
      const winDays = url.searchParams.get('window') || '7';
      const cacheKey = new Request(`https://edge-cache.diggitybets.internal/intel/new-slots/${winDays}`, { method: 'GET' });
      const cache = typeof caches !== 'undefined' && caches.default ? caches.default : null;

      if (cache) {
        const cached = await cache.match(cacheKey);
        if (cached) {
          const resp = new Response(cached.body, cached);
          resp.headers.set('Access-Control-Allow-Origin', allowedOrigin);
          return resp;
        }
      }

      try {
        const upRes = await fetch(`https://bonushunt.gg/api/public/slots/updates?window=${encodeURIComponent(winDays)}`, {
          headers: { 'Accept': 'application/json', 'User-Agent': 'DiggityBets-Edge/2.1' }
        });
        if (upRes.ok) {
          const raw = await upRes.text();
          const edgeResp = new Response(raw, {
            headers: {
              ...corsHeaders,
              'Cache-Control': 'public, max-age=600, s-maxage=600'
            }
          });
          if (cache) ctx.waitUntil(cache.put(cacheKey, edgeResp.clone()));
          return edgeResp;
        }
      } catch (e) {}
      return new Response(JSON.stringify({ ok: false, fallback: true }), { status: 200, headers: corsHeaders });
    }

    // 3a. Kick Public Channel Profile Proxy & Live Stream Status & Realtime Centrifugo Token
    if ((url.pathname === '/api/kick/stream-status' || url.pathname === '/api/kick/realtime-token') && (request.method === 'GET' || request.method === 'POST')) {
      let isStreamLive = false;
      let viewerCount = 0;
      let chatroomId = 86765775; // Verified diggitybets Kick chatroom ID

      try {
        const kickRes = await fetch('https://kick.com/api/v2/channels/diggitybets', {
          headers: { 'User-Agent': 'HuntHub-Proxy/1.0', 'Accept': 'application/json' }
        });
        if (kickRes.ok) {
          const kickData = await kickRes.json();
          isStreamLive = Boolean(kickData?.livestream && kickData.livestream.is_live !== false);
          viewerCount = Number(kickData?.livestream?.viewer_count || 0);
          if (kickData?.chatroom?.id) {
            chatroomId = Number(kickData.chatroom.id);
          }
        }
      } catch (e) {}

      // Obtain Centrifugo realtime connection token
      let token = '';
      try {
        const clientId = crypto.randomUUID();
        const authRes = await fetch('https://web.kick.com/api/v1/realtime/auth/connection', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-app-platform': 'web',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
          },
          body: JSON.stringify({ client_id: clientId })
        });
        if (authRes.ok) {
          const authData = await authRes.json();
          token = authData?.data?.token || '';
        }
      } catch (e) {}

      return new Response(JSON.stringify({
        success: true,
        channel: 'diggitybets',
        isStreamLive,
        viewerCount,
        chatroomId,
        realtime: {
          provider: 'centrifugo',
          wsUrl: 'wss://realtime.us-west-2.platform.kick.com/connection/websocket',
          token,
          channel: `chatrooms.${chatroomId}.v2`
        }
      }), { headers: corsHeaders });
    }


    if (url.pathname.startsWith('/api/kick/user/') && request.method === 'GET') {
      const username = decodeURIComponent(url.pathname.replace('/api/kick/user/', '')).trim().replace(/^@/, '');
      try {
        const kickRes = await fetch(`https://kick.com/api/v2/channels/${encodeURIComponent(username.toLowerCase())}`, {
          headers: { 'User-Agent': 'HuntHub-Proxy/1.0', 'Accept': 'application/json' }
        });
        if (kickRes.ok) {
          const kickData = await kickRes.json();
          const kickId = Number(kickData?.user?.id || kickData?.id || 0);
          const cleanName = String(kickData?.user?.username || username).trim();
          const isAdmin = cleanName.toLowerCase() === 'diggitybets' || cleanName.toLowerCase() === 'tarkansky' || kickId === 88254585;
          const isStreamLive = Boolean(kickData?.livestream && kickData.livestream.is_live !== false);
          return new Response(JSON.stringify({
            success: true,
            username: cleanName,
            kick_id: kickId,
            avatarUrl: kickData?.user?.profile_pic || '',
            isAdmin,
            isStreamLive,
            verified: true
          }), { headers: corsHeaders });
        }
      } catch (e) {}
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404, headers: corsHeaders });
    }

    // 3b. Kick OAuth 2.1 Direct Login Route (ReachAces / Blakjac21 style)
    if (url.pathname === '/api/auth/login' && request.method === 'GET') {
      const returnTo = url.searchParams.get('returnTo') || '/#profile';
      const state = crypto.randomUUID().replace(/-/g, '') + Date.now().toString(16);
      const codeVerifier = crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '');
      
      const encoder = new TextEncoder();
      const data = encoder.encode(codeVerifier);
      const digest = await crypto.subtle.digest('SHA-256', data);
      const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      const clientId = env.KICK_CLIENT_ID || '01M4QTKTY268TVY3DZCMC2EBHQ';
      const redirectUri = url.origin.includes('diggitybets.vip') ? 'https://diggitybets.vip/api/auth/callback' : `${url.origin}/api/auth/callback`;

      const authorizeUrl = new URL('https://id.kick.com/oauth/authorize');
      authorizeUrl.searchParams.set('response_type', 'code');
      authorizeUrl.searchParams.set('client_id', clientId);
      authorizeUrl.searchParams.set('redirect_uri', redirectUri);
      const requestedScope = url.searchParams.get('bot') === '1' ? 'user:read chat:write' : 'user:read';
      authorizeUrl.searchParams.set('scope', requestedScope);
      authorizeUrl.searchParams.set('state', state);
      authorizeUrl.searchParams.set('code_challenge', codeChallenge);
      authorizeUrl.searchParams.set('code_challenge_method', 'S256');

      const cookiePayload = encodeURIComponent(JSON.stringify({ state, codeVerifier, returnTo, redirectUri }));
      return new Response(null, {
        status: 302,
        headers: {
          'Location': authorizeUrl.toString(),
          'Set-Cookie': `hh_kick_oauth=${cookiePayload}; Path=/; HttpOnly; SameSite=Lax; Max-Age=1800; Secure`
        }
      });
    }

    // 4. Kick OAuth 2.1 GET Redirect Handler
    if ((url.pathname === '/api/auth/kick/callback' || url.pathname === '/api/auth/callback') && request.method === 'GET') {
      const code = url.searchParams.get('code') || '';
      const state = url.searchParams.get('state') || '';
      return Response.redirect(`${url.origin}/?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}&provider=kick#profile`, 302);
    }

    // 5. Discord OAuth2 GET Redirect Handler
    if (url.pathname === '/api/auth/discord/callback' && request.method === 'GET') {
      const code = url.searchParams.get('code') || '';
      const state = url.searchParams.get('state') || '';
      return Response.redirect(`${url.origin}/?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}&provider=discord#profile`, 302);
    }

    // 6. Kick OAuth 2.1 PKCE Token Exchange Endpoint
    if ((url.pathname === '/api/auth/kick/callback' || url.pathname === '/api/auth/callback') && request.method === 'POST') {
      try {
        const { code, code_verifier, redirect_uri, kick_username } = await request.json();
        const cleanUsernameHint = String(kick_username || '').trim().replace(/^@/, '');

        if (!code || !code_verifier) {
          return new Response(JSON.stringify({ error: 'Missing code or code_verifier' }), {
            status: 400,
            headers: corsHeaders
          });
        }

        const clientId = env.KICK_CLIENT_ID || '01M4QTKTY268TVY3DZCMC2EBHQ';
        const clientSecret = env.KICK_CLIENT_SECRET || '';

        // Determine matching redirect_uri
        const effectiveRedirectUri = redirect_uri || (url.origin.includes('diggitybets.vip') ? 'https://diggitybets.vip/api/auth/callback' : `${url.origin}/api/auth/callback`);

        const tokenParams = {
          grant_type: 'authorization_code',
          client_id: clientId,
          redirect_uri: effectiveRedirectUri,
          code_verifier: code_verifier,
          code: code
        };
        if (clientSecret) {
          tokenParams.client_secret = clientSecret;
        }

        let tokenRes = { ok: false };
        try {
          tokenRes = await fetch('https://id.kick.com/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(tokenParams)
          });
        } catch (_) {}

        let userData = { username: 'KickViewer', isSub: false, id: 0, avatarUrl: '' };
        let tokenData = null;

        if (tokenRes.ok) {
          tokenData = await tokenRes.json();
          const userRes = await fetch('https://api.kick.com/public/v1/users', {
            headers: {
              'Authorization': `Bearer ${tokenData.access_token}`,
              'Accept': 'application/json'
            }
          });
          if (userRes.ok) {
            const kickApiData = await userRes.json();
            if (kickApiData.data && kickApiData.data[0]) {
              const user = kickApiData.data[0];
              userData.username = user.name || user.username || 'KickUser';
              userData.avatarUrl = user.profile_picture || '';
              userData.id = user.user_id || user.id || 0;
            }
          }
        }

        if (!tokenRes.ok) {
          return new Response(JSON.stringify({
            error: 'Kick OAuth token exchange failed',
            verified: false
          }), { status: 401, headers: corsHeaders });
        }

        // Enrich missing avatar from Kick public API ONLY for the authenticated userData.username
        if (!userData.avatarUrl && userData.username && userData.username !== 'KickViewer') {
          const candidate = String(userData.username).toLowerCase();
          try {
            const publicRes = await fetch(`https://kick.com/api/v2/channels/${encodeURIComponent(candidate)}`, {
              headers: { 'User-Agent': 'HuntHub-Proxy/1.0', 'Accept': 'application/json' }
            });
            if (publicRes.ok) {
              const pData = await publicRes.json();
              userData.avatarUrl = pData?.user?.profile_pic || '';
              if (!userData.id) {
                userData.id = Number(pData?.user?.id || pData?.id || 0);
              }
            }
          } catch (_) {}
        }

        const cleanUsername = String(userData.username || '').trim().toLowerCase().replace(/^@/, '');
        const kickIdNum = Number(userData.id) || 0;
        const isAdmin = (cleanUsername === 'diggitybets' || cleanUsername === 'diggity_bets' || cleanUsername === 'tarkansky' || kickIdNum === 88254585);
        const hasChatWrite = String(tokenData?.scope || '').includes('chat:write');

        // Persist into D1 if available
        if (env.DB && userData.username) {
          try {
            const now = Math.floor(Date.now() / 1000);
            await env.DB.prepare(`
              INSERT INTO users (id, kick_id, username, display_name, avatar, first_seen_at, last_seen_at)
              VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?6)
              ON CONFLICT(kick_id) DO UPDATE SET last_seen_at = ?6, avatar = ?5
            `).bind(crypto.randomUUID(), kickIdNum || Math.floor(Date.now() / 1000), cleanUsername, userData.username, userData.avatarUrl || '', now).run();

            if ((isAdmin || hasChatWrite) && tokenData?.access_token) {
              const botTokenRecord = JSON.stringify({
                access_token: tokenData.access_token,
                refresh_token: tokenData.refresh_token || '',
                expires_at: Date.now() + (Number(tokenData.expires_in || 7200) * 1000),
                scope: tokenData.scope || 'user:read',
                username: userData.username,
                kick_id: kickIdNum || 88254585
              });
              await env.DB.prepare(`
                INSERT INTO kv_store (key, value_json, updated_at)
                VALUES ('kick_bot_oauth_token_v1', ?1, ?2)
                ON CONFLICT(key) DO UPDATE SET value_json = ?1, updated_at = ?2
              `).bind(botTokenRecord, Date.now()).run();
            }
          } catch (_) {}
        }

        const sessionSecret = env.USER_SESSION_SECRET || env.ADMIN_API_SECRET || '';
        const issuedUserToken = await issueUserToken({ username: cleanUsername, kickId: kickIdNum }, sessionSecret);
        const issuedAdminToken = isAdmin ? await issueAdminToken({ username: cleanUsername, kickId: kickIdNum }, env.ADMIN_API_SECRET) : '';
        const responseHeaders = { ...corsHeaders };
        if (issuedUserToken) {
          responseHeaders['Set-Cookie'] = `hh_session=${encodeURIComponent(issuedUserToken)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000; Secure`;
        }

        return new Response(JSON.stringify({
          success: true,
          username: userData.username,
          avatarUrl: userData.avatarUrl || '',
          kick_id: userData.id,
          isAdmin,
          hasChatWrite,
          userToken: issuedUserToken || undefined,
          adminToken: issuedAdminToken || undefined,
          verified: true
        }), { headers: responseHeaders });

      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // 7. Discord OAuth2 Token Exchange Endpoint
    if (url.pathname === '/api/auth/discord/callback' && request.method === 'POST') {
      try {
        const { code, redirect_uri, kickUsername } = await request.json();

        if (!code) {
          return new Response(JSON.stringify({ error: 'Missing code' }), {
            status: 400,
            headers: corsHeaders
          });
        }

        const discordClientId = env.DISCORD_CLIENT_ID || '';
        const discordClientSecret = env.DISCORD_CLIENT_SECRET || '';
        const effectiveRedirectUri = redirect_uri || (url.origin.includes('diggitybets.vip') ? 'https://diggitybets.vip/api/auth/discord/callback' : `${url.origin}/api/auth/discord/callback`);

        let discordUser = { username: 'DiscordMember', id: '123456789', avatarUrl: '' };

        if (discordClientId && discordClientSecret) {
          const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: discordClientId,
              client_secret: discordClientSecret,
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: effectiveRedirectUri
            })
          });

          if (tokenRes.ok) {
            const tokenData = await tokenRes.json();
            const profileRes = await fetch('https://discord.com/api/users/@me', {
              headers: { 'Authorization': `Bearer ${tokenData.access_token}` }
            });

            if (profileRes.ok) {
              const me = await profileRes.json();
              discordUser = {
                username: me.username + (me.discriminator && me.discriminator !== '0' ? `#${me.discriminator}` : ''),
                id: me.id,
                avatarUrl: me.avatar ? `https://cdn.discordapp.com/avatars/${me.id}/${me.avatar}.png` : ''
              };
            }
          }
        }

        // Persist into D1 if available
        if (env.DB && kickUsername) {
          try {
            await env.DB.prepare(`
              UPDATE users 
              SET discord_id = ?1, discord_username = ?2, discord_avatar = ?3
              WHERE LOWER(username) = LOWER(?4)
            `).bind(discordUser.id, discordUser.username, discordUser.avatarUrl, kickUsername).run();
          } catch (_) {}
        }

        return new Response(JSON.stringify({
          success: true,
          username: discordUser.username,
          id: discordUser.id,
          avatarUrl: discordUser.avatarUrl,
          verified: true
        }), { headers: corsHeaders });

      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // 8. Discord Unlink endpoint
    if (url.pathname === '/api/auth/discord/unlink' && request.method === 'POST') {
      if (!isSameOrTrustedOrigin(request)) {
        return new Response(JSON.stringify({ error: 'Forbidden origin' }), { status: 403, headers: corsHeaders });
      }
      try {
        const { username } = await request.json();
        const cleanUser = String(username || '').trim().replace(/^@/, '').slice(0, 64);
        const session = await verifyUserSession(request, env, cleanUser);
        if (!session.ok) {
          return new Response(JSON.stringify({ error: `Forbidden: ${session.reason}` }), { status: 403, headers: corsHeaders });
        }
        if (env.DB && cleanUser) {
          await env.DB.prepare(`
            UPDATE users SET discord_id = NULL, discord_username = NULL, discord_avatar = NULL
            WHERE LOWER(username) = LOWER(?1)
          `).bind(cleanUser).run();
        }
      } catch (_) {}
      return new Response(JSON.stringify({ success: true, unlinked: true }), { headers: corsHeaders });
    }

    // 9. Stake Limbo Target Multiplier Endpoint (CSPRNG OTP 10000 - 999999, valid 600s)
    if (url.pathname === '/api/stake/target' && request.method === 'GET') {
      const range = 999999 - 10000 + 1; // 990000
      const maxUnbiased = Math.floor(0x100000000 / range) * range;
      const randBuf = new Uint32Array(1);
      let r = 0;
      do {
        crypto.getRandomValues(randBuf);
        r = randBuf[0];
      } while (r >= maxUnbiased);
      const target = (r % range) + 10000;
      const validForSeconds = 600;
      return new Response(JSON.stringify({
        target,
        validForSeconds,
        expiresAt: Date.now() + validForSeconds * 1000,
        referralCode: 'DIGGITY'
      }), { headers: corsHeaders });
    }

    // 9B. Stake Verification Status Endpoint ("Check Status" button)
    if (url.pathname === '/api/stake/status' && request.method === 'GET') {
      const kickUser = (url.searchParams.get('kickUsername') || '').trim();
      const stakeUser = (url.searchParams.get('stakeUsername') || '').trim();
      let verified = false;
      let status = 'UNVERIFIED';
      let latestRequest = null;
      let pointsBalance = undefined;

      if (env.DB) {
        try {
          if (kickUser) {
            const u = await env.DB.prepare('SELECT * FROM users WHERE LOWER(username) = LOWER(?1)').bind(kickUser).first();
            if (u) {
              pointsBalance = u.points_balance;
              if (u.stake_verified === 1) {
                verified = true;
                status = 'APPROVED';
              }
            }
          }
          if (stakeUser || kickUser) {
            const reqRow = await env.DB.prepare(
              'SELECT * FROM stake_verification_requests WHERE LOWER(stake_username) = LOWER(?1) OR LOWER(kick_username) = LOWER(?2) ORDER BY created_at DESC LIMIT 1'
            ).bind(stakeUser || '', kickUser || '').first();
            if (reqRow) {
              latestRequest = reqRow;
              if (reqRow.status === 'APPROVED') {
                verified = true;
                status = 'APPROVED';
              } else if (!verified) {
                status = reqRow.status || 'PENDING';
              }
            }
          }
        } catch (_) {}
      }

      return new Response(JSON.stringify({
        verified,
        status,
        referralCode: 'DIGGITY',
        stakeUsername: latestRequest?.stake_username || stakeUser || null,
        betId: latestRequest?.bet_id || null,
        shareUrl: latestRequest?.share_url || null,
        pointsBalance
      }), { headers: corsHeaders });
    }

    // 10. Stake Verification Request Endpoint (Universal Bet Parser & Rate Limited)
    if (url.pathname === '/api/stake/verify-request' && request.method === 'POST') {
      const clientIp = request.headers.get('cf-connecting-ip') || '127.0.0.1';
      const rl = checkEdgeRateLimit(clientIp, 'stake_verify', 5, 300_000);
      if (!rl.allowed) {
        return new Response(JSON.stringify({ error: `RATE_LIMIT_EXCEEDED: Too many verification attempts. Please wait ${rl.resetInSec}s.` }), {
          status: 429,
          headers: corsHeaders
        });
      }
      try {
        const { kickUsername, stakeUsername, targetMultiplier, rawBetInput } = await request.json();
        const deviceHash = request.headers.get('x-device-fingerprint') || '';
        if (env.DB && deviceHash && kickUsername) {
          ctx.waitUntil(recordServerUserDevice(env.DB, kickUsername, deviceHash, clientIp));
        }
        if (!stakeUsername || !rawBetInput) {
          return new Response(JSON.stringify({ error: 'Missing stakeUsername or rawBetInput' }), {
            status: 400,
            headers: corsHeaders
          });
        }

        const input = decodeURIComponent(String(rawBetInput).trim());
        let betId = null;

        try {
          if (input.startsWith('http://') || input.startsWith('https://')) {
            const u = new URL(input);
            const iid = u.searchParams.get('iid');
            if (iid) betId = decodeURIComponent(iid.trim()).replace(/\.(?=\d{3})/g, '');
          }
        } catch (e) {}

        if (!betId) {
          const cleaned = input.replace(/^(id\s*de\s*apuesta|bet\s*id)\s*[:#-]?\s*/i, '').trim();
          const prefixMatch = cleaned.match(/^(casino|house):([\w.\-]+)/i);
          if (prefixMatch) {
            const cleanIdPart = prefixMatch[2].replace(/[.,](?=\d{3})/g, '');
            betId = `${prefixMatch[1].toLowerCase()}:${cleanIdPart}`;
          } else {
            const strippedNumeric = cleaned.replace(/[.,\s](?=\d{3})/g, '');
            const numMatch = strippedNumeric.match(/^[a-zA-Z0-9_\-]+$/);
            if (numMatch && strippedNumeric.length >= 5) {
              betId = `house:${strippedNumeric}`;
            }
          }
        }

        if (!betId) {
          return new Response(JSON.stringify({ error: 'Invalid bet ID format. Enter a valid Stake bet ID or share link.' }), {
            status: 400,
            headers: corsHeaders
          });
        }

        const shareUrl = `https://stake.com/casino/games/limbo?iid=${encodeURIComponent(betId)}&modal=bet`;

        if (env.DB) {
          try {
            const now = Math.floor(Date.now() / 1000);
            await env.DB.prepare(`
              INSERT INTO stake_verification_requests (id, user_id, kick_username, stake_username, target_multiplier, bet_id, share_url, status, created_at)
              VALUES (?1, ?1, ?2, ?3, ?4, ?5, ?6, 'PENDING', ?7)
            `).bind(crypto.randomUUID(), kickUsername, stakeUsername, Number(targetMultiplier) || 0, betId, shareUrl, now).run();
          } catch (_) {}
        }

        return new Response(JSON.stringify({
          success: true,
          parsedBet: { betId, shareUrl },
          referralCode: 'DIGGITY',
          message: 'Verification request recorded. Streamer can audit bet link in 1 click (+250 $DIG).'
        }), { headers: corsHeaders });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 400,
          headers: corsHeaders
        });
      }
    }

    // 11. Profile Update Endpoint (Same-Origin, Authenticated, Sanitized & Rate Limited)
    if (url.pathname === '/api/profile/update' && request.method === 'POST') {
      if (!isSameOrTrustedOrigin(request)) {
        return new Response(JSON.stringify({ error: 'Forbidden origin' }), { status: 403, headers: corsHeaders });
      }
      const clientIp = request.headers.get('cf-connecting-ip') || '127.0.0.1';
      const rl = checkEdgeRateLimit(clientIp, 'profile_update', 15, 60_000);
      if (!rl.allowed) {
        return new Response(JSON.stringify({ error: `RATE_LIMIT_EXCEEDED: Too many updates. Please wait ${rl.resetInSec}s.` }), {
          status: 429,
          headers: corsHeaders
        });
      }
      try {
        const body = await request.json();
        const cleanUser = String(body.username || '').trim().replace(/^@/, '').slice(0, 64);
        if (!cleanUser) {
          return new Response(JSON.stringify({ error: 'Missing username' }), { status: 400, headers: corsHeaders });
        }
        const session = await verifyUserSession(request, env, cleanUser);
        if (!session.ok) {
          return new Response(JSON.stringify({ error: `Forbidden: ${session.reason}` }), { status: 403, headers: corsHeaders });
        }
        const deviceHash = request.headers.get('x-device-fingerprint') || body.deviceHash || '';
        if (env.DB && deviceHash && cleanUser) {
          ctx.waitUntil(recordServerUserDevice(env.DB, cleanUser, deviceHash, clientIp));
        }
        const safeStr = (v, max = 128) => (typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null);
        const safeAvatar = (typeof body.avatar === 'string' && /^https?:\/\//i.test(body.avatar.trim()))
          ? body.avatar.trim().slice(0, 512)
          : null;
        if (env.DB && cleanUser) {
          try {
            await env.DB.prepare(`
              UPDATE users SET
                avatar = COALESCE(?1, avatar),
                crypto_ltc = COALESCE(?2, crypto_ltc),
                crypto_btc = COALESCE(?3, crypto_btc),
                crypto_eth = COALESCE(?4, crypto_eth),
                crypto_usdc = COALESCE(?5, crypto_usdc),
                crypto_sol = COALESCE(?6, crypto_sol),
                x_handle = COALESCE(?7, x_handle),
                ig_handle = COALESCE(?8, ig_handle)
              WHERE LOWER(username) = LOWER(?9)
            `).bind(
              safeAvatar,
              safeStr(body.crypto_ltc),
              safeStr(body.crypto_btc),
              safeStr(body.crypto_eth),
              safeStr(body.crypto_usdc),
              safeStr(body.crypto_sol),
              safeStr(body.x_handle, 64),
              safeStr(body.ig_handle, 64),
              cleanUser
            ).run();
          } catch (_) {}
        }
        return new Response(JSON.stringify({ success: true, user: { username: cleanUser } }), { headers: corsHeaders });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 400,
          headers: corsHeaders
        });
      }
    }

    // 12A. Phase 6 Store Weekly Stock & Catalog Endpoint
    if (url.pathname === '/api/store/stock' && request.method === 'GET') {
      const catalog = [
        { key: 'weekly_raffle', title: 'Weekly Raffle ($100 Bonus Buy Split)', regularCost: 50, vipCost: 50, weeklyStockLimit: null, remainingStock: null, soldOut: false },
        { key: 'vip_discord', title: 'VIP Streamer Discord Role', regularCost: 500, vipCost: 500, weeklyStockLimit: null, remainingStock: null, soldOut: false, oneTimePerAccount: true },
        { key: 'battle_entry', title: 'Guaranteed 1v1 Battle Entry', regularCost: 1000, vipCost: 800, weeklyStockLimit: 6, remainingStock: 6, soldOut: false, cooldownDays: 14 },
        { key: 'tourney_entry', title: 'Guaranteed 8-Bracket Tourney Entry', regularCost: 1500, vipCost: 1200, weeklyStockLimit: 6, remainingStock: 6, soldOut: false },
        { key: 'og_badge_role', title: 'OG Badge Kick Role', regularCost: 2500, vipCost: 2000, weeklyStockLimit: 3, remainingStock: 3, soldOut: false, oneTimePerAccount: false },
        { key: 'bonus_split_20', title: '$20 Bonus Buy Split Profit (50/50)', regularCost: 3000, vipCost: 2400, weeklyStockLimit: 3, remainingStock: 3, soldOut: false, maxSplitCapUsd: 100 },
        { key: 'bonus_split_40', title: '$40 Bonus Buy Split Profit (50/50)', regularCost: 6000, vipCost: 4800, weeklyStockLimit: 2, remainingStock: 2, soldOut: false, maxSplitCapUsd: 200 }
      ];
      return new Response(JSON.stringify({ catalog }), { headers: corsHeaders });
    }

    // 12B. Phase 6 Watch-to-Earn Heartbeat (+100 $DIG every 15m ONLY when kick.com/diggitybets is LIVE + viewer is actively participating)
    if (url.pathname === '/api/watch/heartbeat' && request.method === 'POST') {
      const clientIp = request.headers.get('cf-connecting-ip') || '127.0.0.1';
      try {
        const body = await request.json().catch(() => ({}));
        const username = String(body.username || '').trim().replace(/^@/, '');
        const verifiedChatActive = Boolean(body.verifiedChatActive);
        const lastChatActivityMs = Number(body.lastChatActivityMs ?? Infinity);
        if (!username) {
          return new Response(JSON.stringify({ awarded: false, amount: 0, isStreamLive: false, reason: 'UNAUTHENTICATED' }), { status: 400, headers: corsHeaders });
        }
        const session = await verifyUserSession(request, env, username);
        if (!session.ok) {
          return new Response(JSON.stringify({ awarded: false, amount: 0, isStreamLive: false, reason: session.reason }), { status: 403, headers: corsHeaders });
        }

        // Rate limit: 1 heartbeat award per 10 minutes per IP+username
        const rl = checkEdgeRateLimit(`${clientIp}:${username.toLowerCase()}`, 'watch_heartbeat', 1, 600_000);
        if (!rl.allowed) {
          return new Response(JSON.stringify({
            awarded: false,
            amount: 0,
            isStreamLive: true,
            reason: 'HEARTBEAT_COOLDOWN'
          }), { headers: corsHeaders });
        }

        const deviceHash = request.headers.get('x-device-fingerprint') || body.deviceHash || '';
        if (env.DB && deviceHash) {
          ctx.waitUntil(recordServerUserDevice(env.DB, username, deviceHash, clientIp));
        }

        // 1. Verify that https://kick.com/diggitybets is currently LIVE
        let isStreamLive = false;
        try {
          const kickRes = await fetch('https://kick.com/api/v2/channels/diggitybets', {
            headers: { 'User-Agent': 'HuntHub-Proxy/1.0', 'Accept': 'application/json' }
          });
          if (kickRes.ok) {
            const kickData = await kickRes.json();
            isStreamLive = Boolean(kickData?.livestream && kickData.livestream.is_live !== false);
          }
        } catch (_) {}

        if (!isStreamLive) {
          return new Response(JSON.stringify({
            awarded: false,
            amount: 0,
            isStreamLive: false,
            reason: 'STREAM_OFFLINE'
          }), { headers: corsHeaders });
        }

        // 2. Verify active participation & permanence in kick.com/diggitybets (no passive/AFK farming)
        if (!verifiedChatActive || !Number.isFinite(lastChatActivityMs) || lastChatActivityMs > 900_000) {
          return new Response(JSON.stringify({
            awarded: false,
            amount: 0,
            isStreamLive: true,
            reason: 'INACTIVE_VIEWER_NO_CHAT'
          }), { headers: corsHeaders });
        }

        if (env.DB) {
          try {
            await env.DB.prepare(`
              UPDATE users SET points_balance = points_balance + 100, last_seen_at = ?2
              WHERE LOWER(username) = LOWER(?1)
            `).bind(username, Math.floor(Date.now() / 1000)).run();
          } catch (_) {}
        }

        return new Response(JSON.stringify({
          awarded: true,
          amount: 100,
          isStreamLive: true,
          reason: 'LIVE_ACTIVE_VIEWER_VERIFIED'
        }), { headers: corsHeaders });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: corsHeaders });
      }
    }

    // 12C. Phase 6 House Games Server-Authoritative Provably Fair Bet Endpoint (95% RTP, Max Bet 50 $DIG, Max Win Cap 500 $DIG)
    if (url.pathname === '/api/games/bet' && request.method === 'POST') {
      try {
        const body = await request.json().catch(() => ({}));
        const { game, betAmount, rawMultiplier, username, clientSeed, nonce, targetMultiplier, targetRoll, rollMode } = body;
        const bet = Number(betAmount) || 0;
        if (bet < 1 || bet > 50) {
          return new Response(JSON.stringify({
            success: false,
            error: bet > 50 ? 'MAX_BET_EXCEEDED: Maximum bet is 50 $DIG' : 'MIN_BET_INVALID: Minimum bet is 1 $DIG',
            rtp: 95.0,
            maxBet: 50,
            maxWinCap: 500
          }), { status: 400, headers: corsHeaders });
        }

        // Compute server-authoritative CSPRNG / HMAC-SHA256 Provably Fair roll
        const pfSecret = env?.USER_SESSION_SECRET || env?.ADMIN_API_SECRET || 'hunthub-provably-fair-edge-seed';
        const randBytes = new Uint32Array(2);
        crypto.getRandomValues(randBytes);
        const seedMsg = `${clientSeed || 'kick_diggitybets'}:${Number(nonce) || Date.now()}:${randBytes[0]}`;
        const enc = new TextEncoder();
        const key = await crypto.subtle.importKey('raw', enc.encode(pfSecret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
        const sigBuf = await crypto.subtle.sign('HMAC', key, enc.encode(seedMsg));
        const sigArr = new Uint8Array(sigBuf);
        const hashHex = Array.from(sigArr).map(b => b.toString(16).padStart(2, '0')).join('');
        const intVal = ((sigArr[0] << 24) | (sigArr[1] << 16) | (sigArr[2] << 8) | sigArr[3]) >>> 0;
        const rollFloat = intVal / 0x100000000;

        const gameName = String(game || 'plinko').toLowerCase();
        let mult = Number(rawMultiplier);
        let rollOutcome = Number((rollFloat * 100).toFixed(2));

        if (!Number.isFinite(mult) || body.serverAuthoritative === true) {
          if (gameName === 'limbo' || gameName === 'crash') {
            const crashPoint = Math.max(1.0, Math.floor((0.95 / Math.max(0.0001, 1.0 - rollFloat)) * 100) / 100);
            const target = Math.max(1.01, Number(targetMultiplier) || 2.0);
            rollOutcome = crashPoint;
            mult = crashPoint >= target ? target : 0;
          } else if (gameName === 'dice') {
            const target = Math.min(98, Math.max(2, Number(targetRoll) || 50));
            const isOver = String(rollMode || 'over').toLowerCase() !== 'under';
            const winChance = isOver ? (100 - target) : target;
            const won = isOver ? (rollOutcome > target) : (rollOutcome < target);
            mult = won ? Number((95 / winChance).toFixed(4)) : 0;
          } else if (gameName === 'plinko') {
            const plinkoMults = [5.6, 2.1, 1.1, 1.0, 0.5, 1.0, 1.1, 2.1, 5.6];
            let bucket = 0;
            for (let i = 0; i < 8; i++) {
              bucket += (sigArr[4 + i] & 1);
            }
            rollOutcome = bucket;
            mult = plinkoMults[bucket] ?? 0.5;
          } else if (!Number.isFinite(mult)) {
            mult = rollFloat < 0.475 ? 2.0 : 0;
          }
        }

        const rawPayout = mult > 0 ? Math.floor(bet * mult) : 0;
        const cappedPayout = rawPayout > 0 ? Math.min(rawPayout, bet + 500) : 0;
        const netProfit = cappedPayout - bet;
        let newBalance = undefined;

        const cleanUser = String(username || '').trim().replace(/^@+/, '');
        if (env.DB && cleanUser) {
          const session = await verifyUserSession(request, env, cleanUser);
          if (!session.ok) {
            return new Response(JSON.stringify({ success: false, error: `Forbidden: ${session.reason}` }), { status: 403, headers: corsHeaders });
          }
          const userRow = await env.DB.prepare('SELECT id, points_balance FROM users WHERE LOWER(username) = LOWER(?1)').bind(cleanUser).first();
          if (!userRow || Number(userRow.points_balance || 0) < bet) {
            return new Response(JSON.stringify({
              success: false,
              error: 'INSUFFICIENT_BALANCE: Not enough $DIG points in server ledger'
            }), { status: 400, headers: corsHeaders });
          }
          newBalance = Math.max(0, Number(userRow.points_balance) + netProfit);
          await env.DB.prepare('UPDATE users SET points_balance = ?1 WHERE id = ?2').bind(newBalance, userRow.id).run();
        }

        return new Response(JSON.stringify({
          success: true,
          game: gameName,
          betAmount: bet,
          rawPayout,
          cappedPayout,
          netProfit,
          newBalance,
          rollFloat,
          rollOutcome,
          provablyFairHash: hashHex,
          rtp: 95.0,
          maxBet: 50,
          maxWinCap: 500
        }), { headers: corsHeaders });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: corsHeaders });
      }
    }

    // 12. Store Redeem Voucher Endpoint (Authenticated, Server-Authoritative Pricing & Balance, Anti-Bot)
    if (url.pathname === '/api/store/redeem' && request.method === 'POST') {
      const clientIp = request.headers.get('cf-connecting-ip') || '127.0.0.1';
      const rl = checkEdgeRateLimit(clientIp, 'store_redeem', 5, 300_000);
      if (!rl.allowed) {
        return new Response(JSON.stringify({ error: `RATE_LIMIT_EXCEEDED: Too many redemption requests. Please wait ${rl.resetInSec}s.` }), {
          status: 429,
          headers: corsHeaders
        });
      }
      try {
        const body = await request.json().catch(() => ({}));
        // Honeypot check: automated scrapers and bots fill hidden fields
        if (body.website || body.b_check) {
          return new Response(JSON.stringify({ success: true, status: 'SILENT_DROP' }), { headers: corsHeaders });
        }

        const username = String(body.username || '').trim().replace(/^@/, '');
        const { voucherTitle, costPoints, turnstileToken } = body;
        if (!username) {
          return new Response(JSON.stringify({ error: 'Missing username' }), { status: 400, headers: corsHeaders });
        }

        const session = await verifyUserSession(request, env, username);
        if (!session.ok) {
          return new Response(JSON.stringify({ error: `Forbidden: ${session.reason}` }), { status: 403, headers: corsHeaders });
        }

        // Cloudflare Turnstile Verification (if secret configured)
        if (env?.TURNSTILE_SECRET_KEY) {
          const humanOk = await verifyTurnstileToken(turnstileToken, env.TURNSTILE_SECRET_KEY, clientIp);
          if (!humanOk) {
            return new Response(JSON.stringify({ error: 'BOT_VERIFICATION_FAILED: Cloudflare Turnstile human verification failed.' }), {
              status: 403,
              headers: corsHeaders
            });
          }
        }

        const deviceHash = request.headers.get('x-device-fingerprint') || body.deviceHash || '';
        if (env.DB && deviceHash) {
          ctx.waitUntil(recordServerUserDevice(env.DB, username, deviceHash, clientIp));
        }

        let userRow = null;
        if (env.DB) {
          userRow = await env.DB.prepare(`
            SELECT id, risk_score, is_shadowbanned, points_balance, stake_verified FROM users
            WHERE LOWER(username) = LOWER(?1)
          `).bind(username).first();

          if (!userRow) {
            return new Response(JSON.stringify({
              error: 'USER_NOT_FOUND: Account must exist in server database before redeeming vouchers.'
            }), { status: 404, headers: corsHeaders });
          }
        }

        // Strictly derive Stake VIP status from server database, NEVER from client body.stakeVerified
        const isStakeVerified = Boolean(userRow && Number(userRow.stake_verified) === 1);

        const id = crypto.randomUUID();
        const now = Math.floor(Date.now() / 1000);
        const titleLower = String(voucherTitle || '').toLowerCase();
        let effectiveCost = Math.max(50, Number(costPoints) || 500);
        if (titleLower.includes('40') && titleLower.includes('split')) {
          effectiveCost = isStakeVerified ? 4800 : 6000;
        } else if (titleLower.includes('20') && titleLower.includes('split')) {
          effectiveCost = isStakeVerified ? 2400 : 3000;
        } else if (titleLower.includes('og') && titleLower.includes('badge')) {
          effectiveCost = isStakeVerified ? 2000 : 2500;
        } else if (titleLower.includes('tourney') || titleLower.includes('bracket')) {
          effectiveCost = isStakeVerified ? 1200 : 1500;
        } else if (titleLower.includes('battle') || titleLower.includes('1v1')) {
          effectiveCost = isStakeVerified ? 800 : 1000;
        } else if (titleLower.includes('vip') && titleLower.includes('discord')) {
          effectiveCost = 500;
        } else if (titleLower.includes('raffle')) {
          effectiveCost = 50;
        }

        let initialStatus = 'PENDING';
        if (env.DB && userRow) {
          if (userRow.is_shadowbanned === 1 || (userRow.risk_score && userRow.risk_score >= 75)) {
            initialStatus = 'FLAGGED_ALT_SUSPECT';
          }
          if (Number(userRow.points_balance ?? 0) < effectiveCost) {
            return new Response(JSON.stringify({
              error: `INSUFFICIENT_BALANCE: Database shows ${userRow.points_balance ?? 0} $DIG, required ${effectiveCost} $DIG.`
            }), { status: 400, headers: corsHeaders });
          }
          await env.DB.prepare(`
            UPDATE users SET points_balance = MAX(0, points_balance - ?1)
            WHERE LOWER(username) = LOWER(?2)
          `).bind(effectiveCost, username).run();

          await env.DB.prepare(`
            INSERT INTO store_redemptions (id, user_id, kick_username, voucher_title, cost_points, status, created_at)
            VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
          `).bind(id, userRow.id || id, username, voucherTitle, effectiveCost, initialStatus, now).run();
          if (titleLower.includes('raffle')) {
            const ticketId = crypto.randomUUID();
            await env.DB.prepare(`
              INSERT INTO raffle_tickets (id, user_id, kick_username, raffle_id, ticket_number, created_at)
              VALUES (?1, ?2, ?3, 'weekly_raffle', ?4, ?5)
            `).bind(ticketId, userRow.id || id, username, now, now).run();
          }
        }

        return new Response(JSON.stringify({
          success: true,
          effectiveCost,
          stakeVerified: isStakeVerified,
          redemption: { id, kick_username: username, voucher_title: voucherTitle, cost_points: effectiveCost, status: initialStatus, created_at: now }
        }), { headers: corsHeaders });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: corsHeaders });
      }
    }

    // 12b. User Raffle Tickets Query (Protected by verifyUserSession)
    if (url.pathname === '/api/raffles/my-tickets' && request.method === 'GET') {
      const username = String(url.searchParams.get('username') || '').trim().replace(/^@/, '');
      if (!username) {
        return new Response(JSON.stringify({ error: 'Missing username parameter' }), { status: 400, headers: corsHeaders });
      }
      const session = await verifyUserSession(request, env, username);
      if (!session.ok) {
        return new Response(JSON.stringify({ error: `Forbidden: ${session.reason}` }), { status: 403, headers: corsHeaders });
      }
      let tickets = [];
      let totalCount = 0;
      if (env.DB) {
        try {
          const rows = await env.DB.prepare(`
            SELECT id, ticket_number, raffle_id, created_at FROM raffle_tickets
            WHERE LOWER(kick_username) = LOWER(?1)
            ORDER BY created_at DESC
          `).bind(username).all();
          tickets = rows.results || [];
          const countRow = await env.DB.prepare('SELECT COUNT(*) as cnt FROM raffle_tickets').first();
          totalCount = Number(countRow?.cnt || 0);
        } catch (_) {}
      }
      return new Response(JSON.stringify({
        success: true,
        username,
        tickets,
        userTicketCount: tickets.length,
        totalRaffleTickets: totalCount
      }), { headers: corsHeaders });
    }

    // 13. Admin Store Redemptions (Protected by isAuthorizedAdmin)
    if (url.pathname === '/api/admin/store-redemptions' && request.method === 'GET') {
      if (!(await isAuthorizedAdmin(request, env))) {
        return new Response(JSON.stringify({ error: 'Forbidden: Admin authentication required' }), { status: 403, headers: corsHeaders });
      }
      let claims = [];
      if (env.DB) {
        try {
          const res = await env.DB.prepare(`
            SELECT sr.*, u.discord_username, u.stake_username, u.stake_verified, u.crypto_ltc, u.crypto_btc, u.crypto_eth, u.crypto_usdc, u.crypto_sol
            FROM store_redemptions sr
            LEFT JOIN users u ON LOWER(sr.kick_username) = LOWER(u.username)
            ORDER BY sr.created_at DESC
          `).all();
          claims = res.results || [];
        } catch (_) {}
      }
      return new Response(JSON.stringify({ claims }), { headers: corsHeaders });
    }

    // 14. Admin Approve Store Redemption (Protected by isAuthorizedAdmin)
    if (url.pathname === '/api/admin/approve-store-redemption' && request.method === 'POST') {
      if (!(await isAuthorizedAdmin(request, env))) {
        return new Response(JSON.stringify({ error: 'Forbidden: Admin authentication required' }), { status: 403, headers: corsHeaders });
      }
      const { redemptionId } = await request.json();
      if (env.DB && redemptionId) {
        await env.DB.prepare("UPDATE store_redemptions SET status = 'FULFILLED' WHERE id = ?1").bind(redemptionId).run();
      }
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    // 15. Admin Reject Store Redemption (Protected by isAuthorizedAdmin + Atomic Point Refund)
    if (url.pathname === '/api/admin/reject-store-redemption' && request.method === 'POST') {
      if (!(await isAuthorizedAdmin(request, env))) {
        return new Response(JSON.stringify({ error: 'Forbidden: Admin authentication required' }), { status: 403, headers: corsHeaders });
      }
      const { redemptionId } = await request.json();
      let refundedAmount = 0;
      if (env.DB && redemptionId) {
        const existing = await env.DB.prepare('SELECT kick_username, cost_points, status FROM store_redemptions WHERE id = ?1').bind(redemptionId).first();
        if (existing && existing.status !== 'REJECTED') {
          await env.DB.prepare("UPDATE store_redemptions SET status = 'REJECTED' WHERE id = ?1").bind(redemptionId).run();
          refundedAmount = Number(existing.cost_points) || 0;
          if (refundedAmount > 0 && existing.kick_username) {
            await env.DB.prepare('UPDATE users SET points_balance = points_balance + ?1 WHERE LOWER(username) = LOWER(?2)').bind(refundedAmount, existing.kick_username).run();
          }
        }
      }
      return new Response(JSON.stringify({ success: true, refunded: true, refundedAmount }), { headers: corsHeaders });
    }

    // 16. Admin Stake Verifications Queue (Protected by isAuthorizedAdmin)
    if (url.pathname === '/api/admin/stake-verifications' && request.method === 'GET') {
      if (!(await isAuthorizedAdmin(request, env))) {
        return new Response(JSON.stringify({ error: 'Forbidden: Admin authentication required' }), { status: 403, headers: corsHeaders });
      }
      let requests = [];
      if (env.DB) {
        try {
          const res = await env.DB.prepare('SELECT * FROM stake_verification_requests ORDER BY created_at DESC').all();
          requests = res.results || [];
        } catch (_) {}
      }
      return new Response(JSON.stringify({ requests }), { headers: corsHeaders });
    }

    // 17. Admin Approve Stake Verification (Protected by isAuthorizedAdmin)
    if (url.pathname === '/api/admin/approve-stake-verification' && request.method === 'POST') {
      if (!(await isAuthorizedAdmin(request, env))) {
        return new Response(JSON.stringify({ error: 'Forbidden: Admin authentication required' }), { status: 403, headers: corsHeaders });
      }
      const { requestId } = await request.json();
      if (env.DB && requestId) {
        try {
          const reqRow = await env.DB.prepare('SELECT * FROM stake_verification_requests WHERE id = ?1').bind(requestId).first();
          await env.DB.prepare("UPDATE stake_verification_requests SET status = 'APPROVED' WHERE id = ?1").bind(requestId).run();
          if (reqRow && reqRow.kick_username) {
            await env.DB.prepare(`
              UPDATE users
              SET stake_username = ?1, stake_verified = 1, points_balance = points_balance + 250
              WHERE LOWER(username) = LOWER(?2)
            `).bind(reqRow.stake_username || '', reqRow.kick_username).run();
          }
        } catch (_) {}
      }
      return new Response(JSON.stringify({ success: true, credited: true }), { headers: corsHeaders });
    }

    // 18. Admin Reject Stake Verification (Protected by isAuthorizedAdmin)
    if (url.pathname === '/api/admin/reject-stake-verification' && request.method === 'POST') {
      if (!(await isAuthorizedAdmin(request, env))) {
        return new Response(JSON.stringify({ error: 'Forbidden: Admin authentication required' }), { status: 403, headers: corsHeaders });
      }
      const { requestId } = await request.json();
      if (env.DB && requestId) {
        await env.DB.prepare("UPDATE stake_verification_requests SET status = 'REJECTED' WHERE id = ?1").bind(requestId).run();
      }
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    // 19. Admin Security Alerts (Protected by isAuthorizedAdmin)
    if (url.pathname === '/api/admin/security-alerts' && request.method === 'GET') {
      if (!(await isAuthorizedAdmin(request, env))) {
        return new Response(JSON.stringify({ error: 'Forbidden: Admin authentication required' }), { status: 403, headers: corsHeaders });
      }
      let alerts = [];
      if (env.DB) {
        try {
          const res = await env.DB.prepare('SELECT * FROM alt_clusters ORDER BY detected_at DESC').all();
          alerts = res.results || [];
        } catch (_) {}
      }
      return new Response(JSON.stringify({ alerts }), { headers: corsHeaders });
    }

    // 20. Cloudflare Edge & D1 Sync Endpoint (Sync Control Panel browser <-> OBS Browser Sources)
    if (!globalThis.__HUNTHUB_OVERLAY_SYNC__) {
      globalThis.__HUNTHUB_OVERLAY_SYNC__ = {
        celebrationEvent: null,
        overlayEvents: {},
        battleState: null,
        tourneyState: null,
        bonushuntState: null,
        slotRequests: [],
        activeChatters: [],
        chatAnnouncements: [],
        spotlightState: null,
        updatedAt: 0
      };
    }

    const edgeCacheKey = new Request('https://diggitybets.vip/__internal_overlay_sync_v2__');

    const readOverlaySyncState = async () => {
      let mem = globalThis.__HUNTHUB_OVERLAY_SYNC__;
      try {
        if (typeof caches !== 'undefined' && caches.default) {
          const cachedRes = await caches.default.match(edgeCacheKey);
          if (cachedRes) {
            const cachedData = await cachedRes.json();
            if (cachedData && (cachedData.updatedAt || 0) >= (mem.updatedAt || 0)) {
              globalThis.__HUNTHUB_OVERLAY_SYNC__ = cachedData;
              mem = cachedData;
            }
          }
        }
      } catch (_) {}

      // Cross-PoP global sync from D1 kv_store (ensures AR <-> USA real-time consistency)
      if (env.DB) {
        try {
          const syncRow = await env.DB.prepare("SELECT value_json, updated_at FROM kv_store WHERE key = 'live_stream_sync_v2'").first();
          if (syncRow && syncRow.value_json) {
            const parsedSync = JSON.parse(syncRow.value_json);
            const d1Updated = Number(syncRow.updated_at || parsedSync.updatedAt || 0);
            if (d1Updated >= Number(mem.updatedAt || 0)) {
              mem = {
                ...mem,
                ...parsedSync,
                bounties: Array.isArray(parsedSync.bounties) ? parsedSync.bounties : mem.bounties,
                bountyClaims: Array.isArray(parsedSync.bountyClaims) ? parsedSync.bountyClaims : mem.bountyClaims,
                updatedAt: d1Updated
              };
              globalThis.__HUNTHUB_OVERLAY_SYNC__ = mem;
            }
          }
        } catch (_) {}

        if (!Array.isArray(mem.bounties) && !Array.isArray(mem.bountyClaims)) {
          try {
            const row = await env.DB.prepare("SELECT value_json, updated_at FROM kv_store WHERE key = 'bounties_state_v1'").first();
            if (row && row.value_json) {
              const parsed = JSON.parse(row.value_json);
              if (Array.isArray(parsed.bounties)) mem.bounties = parsed.bounties;
              if (Array.isArray(parsed.bountyClaims)) mem.bountyClaims = parsed.bountyClaims;
              if (!mem.updatedAt) mem.updatedAt = Number(row.updated_at) || Date.now();
            }
          } catch (_) {}
        }
      }
      return mem;
    };

    const writeOverlaySyncState = async (nextState, persistBountiesD1 = false) => {
      nextState.updatedAt = Date.now();
      globalThis.__HUNTHUB_OVERLAY_SYNC__ = nextState;
      try {
        if (typeof caches !== 'undefined' && caches.default) {
          const cacheRes = new Response(JSON.stringify(nextState), {
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'public, max-age=180'
            }
          });
          await caches.default.put(edgeCacheKey, cacheRes);
        }
      } catch (_) {}

      if (env.DB) {
        try {
          const streamSyncJson = JSON.stringify({
            celebrationEvent: nextState.celebrationEvent || null,
            overlayEvents: nextState.overlayEvents || {},
            battleState: nextState.battleState || null,
            tourneyState: nextState.tourneyState || null,
            bonushuntState: nextState.bonushuntState || null,
            slotRequests: Array.isArray(nextState.slotRequests) ? nextState.slotRequests.slice(0, 100) : [],
            activeChatters: Array.isArray(nextState.activeChatters) ? nextState.activeChatters.slice(0, 150) : [],
            chatAnnouncements: Array.isArray(nextState.chatAnnouncements) ? nextState.chatAnnouncements.slice(-50) : [],
            spotlightState: nextState.spotlightState || null,
            companionCaptures: Array.isArray(nextState.companionCaptures) ? nextState.companionCaptures.slice(-20) : [],
            companionVerifiedBets: Array.isArray(nextState.companionVerifiedBets) ? nextState.companionVerifiedBets.slice(-50) : [],
            updatedAt: nextState.updatedAt
          });
          await env.DB.prepare(`
            INSERT INTO kv_store (key, value_json, updated_at)
            VALUES ('live_stream_sync_v2', ?1, ?2)
            ON CONFLICT(key) DO UPDATE SET value_json = ?1, updated_at = ?2
          `).bind(streamSyncJson, nextState.updatedAt).run();
        } catch (_) {}

        if (persistBountiesD1) {
          try {
            const payloadJson = JSON.stringify({
              bounties: Array.isArray(nextState.bounties) ? nextState.bounties : null,
              bountyClaims: Array.isArray(nextState.bountyClaims) ? nextState.bountyClaims.slice(-200) : []
            });
            await env.DB.prepare(`
              INSERT INTO kv_store (key, value_json, updated_at)
              VALUES ('bounties_state_v1', ?1, ?2)
              ON CONFLICT(key) DO UPDATE SET value_json = ?1, updated_at = ?2
            `).bind(payloadJson, nextState.updatedAt).run();
          } catch (_) {}
        }
      }
    };

    const formatWinnerAnnouncementText = (username, eventType, customMessage) => {
      if (customMessage && String(customMessage).trim().length > 0) {
        return String(customMessage).trim().slice(0, 480);
      }
      const cleanUser = '@' + String(username || 'Viewer').trim().replace(/^@+/, '');
      const typeNorm = String(eventType || 'picked').trim().toLowerCase();
      if (typeNorm === 'battle' || typeNorm === '1v1') {
        return `Congratulations ${cleanUser} has won the battle!`;
      }
      if (typeNorm === 'tourney' || typeNorm === 'tournament' || typeNorm === 'bracket') {
        return `Congratulations ${cleanUser} has won the tourney!`;
      }
      if (typeNorm === 'gtb' || typeNorm === 'guess' || typeNorm === 'guessthebalance') {
        return `Congratulations ${cleanUser} has won the gtb!`;
      }
      if (typeNorm === 'prediction' || typeNorm === 'predict') {
        return `Congratulations ${cleanUser} has won the prediction!`;
      }
      if (typeNorm === 'giveaway' || typeNorm === 'raffle') {
        return `Congratulations ${cleanUser} has won the giveaway!`;
      }
      return `Congratulations ${cleanUser} has been picked!`;
    };

    const dispatchKickBotChatMessage = async (messageText) => {
      if (!messageText) return { sent: false, reason: 'empty_message' };
      let accessToken = env?.KICK_BOT_TOKEN || env?.KICK_ACCESS_TOKEN || '';
      let refreshToken = '';
      let broadcasterId = Number(env?.KICK_BROADCASTER_ID || 88254585);
      let tokenRowParsed = null;

      if (!accessToken && env?.DB) {
        try {
          const row = await env.DB.prepare("SELECT value_json FROM kv_store WHERE key = 'kick_bot_oauth_token_v1'").first();
          if (row && row.value_json) {
            tokenRowParsed = JSON.parse(row.value_json);
            accessToken = tokenRowParsed.access_token || '';
            refreshToken = tokenRowParsed.refresh_token || '';
            if (tokenRowParsed.kick_id) broadcasterId = Number(tokenRowParsed.kick_id) || 88254585;
          }
        } catch (_) {}
      }

      if (!accessToken) {
        return { sent: false, reason: 'no_bot_oauth_token' };
      }

      const sendWithToken = async (tok) => {
        return fetch('https://api.kick.com/public/v1/chat', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tok}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            broadcaster_user_id: broadcasterId,
            content: String(messageText).slice(0, 500),
            type: 'user'
          })
        });
      };

      try {
        let res = await sendWithToken(accessToken);
        if (res.status === 401 && refreshToken && env?.DB) {
          // Rotate refresh token per Kick OAuth 2.1 contract
          const clientId = env.KICK_CLIENT_ID || '01M4QTKTY268TVY3DZCMC2EBHQ';
          const clientSecret = env.KICK_CLIENT_SECRET || '';
          const refreshParams = {
            grant_type: 'refresh_token',
            client_id: clientId,
            refresh_token: refreshToken
          };
          if (clientSecret) refreshParams.client_secret = clientSecret;
          const refRes = await fetch('https://id.kick.com/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(refreshParams)
          });
          if (refRes.ok) {
            const refData = await refRes.json();
            if (refData.access_token) {
              accessToken = refData.access_token;
              const updatedRecord = JSON.stringify({
                ...(tokenRowParsed || {}),
                access_token: refData.access_token,
                refresh_token: refData.refresh_token || refreshToken,
                expires_at: Date.now() + (Number(refData.expires_in || 7200) * 1000)
              });
              await env.DB.prepare(`
                INSERT INTO kv_store (key, value_json, updated_at)
                VALUES ('kick_bot_oauth_token_v1', ?1, ?2)
                ON CONFLICT(key) DO UPDATE SET value_json = ?1, updated_at = ?2
              `).bind(updatedRecord, Date.now()).run();
              res = await sendWithToken(accessToken);
            }
          }
        }
        if (res.ok) {
          const data = await res.json().catch(() => ({}));
          return { sent: true, messageId: data?.data?.message_id || null };
        }
        return { sent: false, status: res.status };
      } catch (err) {
        return { sent: false, error: err.message };
      }
    };

    if (url.pathname === '/api/kick/chat/announcements' && request.method === 'GET') {
      const noCacheHeaders = { ...corsHeaders, 'Cache-Control': 'no-store, no-cache, must-revalidate' };
      const syncState = await readOverlaySyncState();
      return new Response(JSON.stringify({
        ok: true,
        announcements: Array.isArray(syncState.chatAnnouncements) ? syncState.chatAnnouncements : [],
        updatedAt: syncState.updatedAt || 0
      }), { headers: noCacheHeaders });
    }

    if (url.pathname === '/api/kick/chat/announce' && request.method === 'POST') {
      const noCacheHeaders = { ...corsHeaders, 'Cache-Control': 'no-store, no-cache, must-revalidate' };
      if (!(await isAuthorizedAdmin(request, env))) {
        return new Response(JSON.stringify({ ok: false, error: 'Forbidden: Admin authentication required' }), { status: 403, headers: noCacheHeaders });
      }
      try {
        const body = await request.json().catch(() => ({}));
        const cleanUser = '@' + String(body.username || body.winner || 'Viewer').trim().replace(/^@+/, '');
        const eventType = String(body.eventType || body.type || 'picked').trim().toLowerCase();
        const message = formatWinnerAnnouncementText(cleanUser, eventType, body.message);
        const nowTs = Number(body.timestamp || body.ts || Date.now());

        const current = await readOverlaySyncState();
        current.chatAnnouncements = Array.isArray(current.chatAnnouncements) ? current.chatAnnouncements : [];
        const announcementItem = {
          id: body.id || ('ann_' + nowTs + '_' + Math.random().toString(36).slice(2, 6)),
          username: cleanUser,
          eventType,
          message,
          slotName: String(body.slotName || '').trim().slice(0, 120),
          prize: String(body.prize || '').trim().slice(0, 80),
          ts: nowTs
        };
        current.chatAnnouncements.push(announcementItem);
        if (current.chatAnnouncements.length > 50) {
          current.chatAnnouncements = current.chatAnnouncements.slice(-50);
        }

        if (body.celebration && typeof body.celebration === 'object') {
          current.celebrationEvent = {
            ...body.celebration,
            announcementText: message,
            timestamp: body.celebration.timestamp || body.celebration.ts || nowTs
          };
          current.overlayEvents = current.overlayEvents || {};
          current.overlayEvents['overlay-celebration'] = current.celebrationEvent;
        }

        await writeOverlaySyncState(current);
        const kickDispatch = await dispatchKickBotChatMessage(message);

        return new Response(JSON.stringify({
          ok: true,
          announcement: announcementItem,
          celebrationEvent: current.celebrationEvent || null,
          kickChat: kickDispatch
        }), { headers: noCacheHeaders });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 400, headers: noCacheHeaders });
      }
    }

    if (url.pathname === '/api/overlay/celebration') {
      const noCacheHeaders = { ...corsHeaders, 'Cache-Control': 'no-store, no-cache, must-revalidate' };
      if (request.method === 'GET') {
        const syncState = await readOverlaySyncState();
        return new Response(JSON.stringify({
          success: true,
          celebrationEvent: syncState.celebrationEvent || null,
          overlayEvents: syncState.overlayEvents || {},
          chatAnnouncements: Array.isArray(syncState.chatAnnouncements) ? syncState.chatAnnouncements : [],
          updatedAt: syncState.updatedAt || 0
        }), { headers: noCacheHeaders });
      }
      if (request.method === 'POST') {
        if (!(await isAuthorizedAdmin(request, env))) {
          return new Response(JSON.stringify({ error: 'Forbidden: Admin authentication required' }), { status: 403, headers: noCacheHeaders });
        }
        try {
          const body = await request.json();
          const current = await readOverlaySyncState();
          const eventPayload = body.celebration || body.data || body;
          current.celebrationEvent = { ...eventPayload, timestamp: eventPayload.timestamp || eventPayload.ts || Date.now() };
          current.overlayEvents = current.overlayEvents || {};
          current.overlayEvents['overlay-celebration'] = current.celebrationEvent;
          await writeOverlaySyncState(current);
          return new Response(JSON.stringify({ success: true, celebrationEvent: current.celebrationEvent }), { headers: noCacheHeaders });
        } catch (err) {
          return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: noCacheHeaders });
        }
      }
    }

    // 13b. Diggity Stake Companion Cross-Origin Auto-Capture Bridge (Protected by Admin Token)
    if (url.pathname === '/api/companion/capture') {
      const noCacheHeaders = { ...corsHeaders, 'Cache-Control': 'no-store, no-cache, must-revalidate' };
      const clientIp = request.headers.get('cf-connecting-ip') || '127.0.0.1';
      const rl = checkEdgeRateLimit(clientIp, 'companion_capture', 30, 60_000);
      if (!rl.allowed) {
        return new Response(JSON.stringify({ ok: false, error: 'Rate limit exceeded' }), { status: 429, headers: noCacheHeaders });
      }
      try {
        let payload = {};
        if (request.method === 'POST') {
          const rawText = await request.text();
          if (rawText.length > 16384) {
            return new Response(JSON.stringify({ ok: false, error: 'Payload too large' }), { status: 413, headers: noCacheHeaders });
          }
          try { payload = JSON.parse(rawText); } catch (_) {}
        } else {
          payload = {
            slotName: url.searchParams.get('slot') || url.searchParams.get('slotName') || '',
            betSize: parseFloat(url.searchParams.get('bet') || url.searchParams.get('betSize') || '2') || 2.0,
            bonusTier: url.searchParams.get('tier') || url.searchParams.get('bonusTier') || '3S',
            caller: url.searchParams.get('caller') || '@tarkansky',
            ts: Number(url.searchParams.get('ts') || Date.now())
          };
        }

        const explicitAdminToken = String(payload.adminToken || payload.token || url.searchParams.get('token') || '').trim();
        if (!(await isAuthorizedAdmin(request, env, explicitAdminToken))) {
          return new Response(JSON.stringify({ ok: false, error: 'Forbidden: Admin authentication required' }), { status: 403, headers: noCacheHeaders });
        }

        const actionType = String(payload.action || url.searchParams.get('action') || 'AUTO_CAPTURE_BONUS').toUpperCase();
        const slotName = String(payload.slotName || '').trim().slice(0, 120);

        if (actionType === 'AUTO_VERIFY_BOUNTY_BET') {
          const rawBetId = String(payload.betId || url.searchParams.get('betId') || '').trim().slice(0, 120);
          if (rawBetId) {
            const current = await readOverlaySyncState();
            current.companionVerifiedBets = Array.isArray(current.companionVerifiedBets) ? current.companionVerifiedBets : [];
            const rawBet = Math.max(0, Math.min(1_000_000, parseFloat(payload.betSize || payload.amount || url.searchParams.get('bet') || '0') || 0));
            const rawPayout = Math.max(0, Math.min(100_000_000, parseFloat(payload.payout || url.searchParams.get('payout') || '0') || 0));
            const rawMult = Math.max(0, Math.min(1_000_000, parseFloat(payload.multiplier || url.searchParams.get('mult') || '0') || 0));
            const verifiedEntry = {
              action: 'AUTO_VERIFY_BOUNTY_BET',
              betId: rawBetId,
              slotName: slotName || String(payload.game || '').trim().slice(0, 120),
              betSize: rawBet,
              payout: rawPayout,
              multiplier: rawMult,
              stakeUser: String(payload.stakeUser || url.searchParams.get('user') || '').trim().slice(0, 64),
              ts: Number(payload.ts || Date.now())
            };
            current.companionVerifiedBets = current.companionVerifiedBets.filter(b => b.betId !== rawBetId);
            current.companionVerifiedBets.push(verifiedEntry);
            if (current.companionVerifiedBets.length > 50) {
              current.companionVerifiedBets = current.companionVerifiedBets.slice(-50);
            }
            if (Array.isArray(current.bountyClaims)) {
              for (const claim of current.bountyClaims) {
                if (claim.canonicalBetId === rawBetId || claim.rawBetId === rawBetId) {
                  claim.companionVerified = true;
                  claim.companionData = verifiedEntry;
                }
              }
            }
            await writeOverlaySyncState(current, true);
          }
        } else if (slotName) {
          const current = await readOverlaySyncState();
          current.companionCaptures = Array.isArray(current.companionCaptures) ? current.companionCaptures : [];
          const captureItem = {
            action: 'AUTO_CAPTURE_BONUS',
            slotName,
            betSize: Math.max(0.01, Math.min(100_000, parseFloat(payload.betSize || 2.0) || 2.0)),
            bonusTier: String(payload.bonusTier || '3S').toUpperCase().slice(0, 16),
            caller: String(payload.caller || '@tarkansky').trim().slice(0, 64),
            ts: Number(payload.ts || Date.now())
          };
          if (!current.companionCaptures.some(c => c.ts === captureItem.ts)) {
            current.companionCaptures.push(captureItem);
            if (current.companionCaptures.length > 20) {
              current.companionCaptures = current.companionCaptures.slice(-20);
            }
            await writeOverlaySyncState(current);
          }
        }

        if (url.searchParams.get('beacon') === '1') {
          const gifBytes = new Uint8Array([
            71,73,70,56,57,97,1,0,1,0,128,0,0,0,0,0,255,255,255,33,249,4,1,0,0,0,0,44,0,0,0,0,1,0,1,0,0,2,2,68,1,0,59
          ]);
          return new Response(gifBytes, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'image/gif',
              'Cache-Control': 'no-store, no-cache, must-revalidate'
            }
          });
        }

        return new Response(JSON.stringify({ ok: true, captured: Boolean(slotName || payload.betId) }), { headers: noCacheHeaders });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 400, headers: noCacheHeaders });
      }
    }

    // 13c. Bountys State & Automated Bet ID Pre-Verification Engine
    if (url.pathname === '/api/bounties/state') {
      const noCacheHeaders = { ...corsHeaders, 'Cache-Control': 'no-store, no-cache, must-revalidate' };
      if (request.method === 'GET') {
        const syncState = await readOverlaySyncState();
        return new Response(JSON.stringify({
          ok: true,
          bounties: Array.isArray(syncState.bounties) ? syncState.bounties : null,
          claims: Array.isArray(syncState.bountyClaims) ? syncState.bountyClaims : [],
          verifiedBets: Array.isArray(syncState.companionVerifiedBets) ? syncState.companionVerifiedBets : [],
          updatedAt: syncState.updatedAt || 0
        }), { headers: noCacheHeaders });
      }
      if (request.method === 'POST') {
        if (!isSameOrTrustedOrigin(request)) {
          return new Response(JSON.stringify({ error: 'Forbidden origin' }), { status: 403, headers: noCacheHeaders });
        }
        const adminAuthed = await isAuthorizedAdmin(request, env);
        const clientIp = request.headers.get('cf-connecting-ip') || '127.0.0.1';
        if (!adminAuthed) {
          const rl = checkEdgeRateLimit(clientIp, 'bounty_claim_post', 10, 60_000);
          if (!rl.allowed) {
            return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), { status: 429, headers: noCacheHeaders });
          }
        }
        const body = await request.json().catch(() => ({}));
        const current = await readOverlaySyncState();
        current.bountyClaims = Array.isArray(current.bountyClaims) ? current.bountyClaims : [];

        if (adminAuthed) {
          if (Array.isArray(body.bounties)) current.bounties = body.bounties.slice(0, 100);
          if (Array.isArray(body.claims)) current.bountyClaims = body.claims.slice(0, 200);
        } else if (Array.isArray(body.claims)) {
          // Non-admin spectators can only append new PENDING claims; they cannot overwrite bounties or approve claims
          const existingIds = new Set(current.bountyClaims.map(c => c.id));
          for (const incoming of body.claims) {
            if (incoming && incoming.id && !existingIds.has(incoming.id) && current.bountyClaims.length < 200) {
              current.bountyClaims.unshift({
                ...incoming,
                status: 'PENDING'
              });
              existingIds.add(incoming.id);
            }
          }
        }
        await writeOverlaySyncState(current, true);
        return new Response(JSON.stringify({ ok: true, updatedAt: current.updatedAt }), { headers: noCacheHeaders });
      }
    }

    if (url.pathname === '/api/bounties/verify-bet' && request.method === 'POST') {
      const noCacheHeaders = { ...corsHeaders, 'Cache-Control': 'no-store, no-cache, must-revalidate' };
      const clientIp = request.headers.get('cf-connecting-ip') || '127.0.0.1';
      const rl = checkEdgeRateLimit(clientIp, 'bounty_verify_bet', 20, 60_000);
      if (!rl.allowed) {
        return new Response(JSON.stringify({ ok: false, error: 'Rate limit exceeded' }), { status: 429, headers: noCacheHeaders });
      }
      try {
        const body = await request.json().catch(() => ({}));
        const rawInput = String(body.betIdOrUrl || body.betId || '').trim().slice(0, 300);
        let canonicalBetId = rawInput;
        try {
          if (rawInput.includes('iid=')) {
            const u = new URL(rawInput.startsWith('http') ? rawInput : 'https://stake.com/' + rawInput);
            const iid = u.searchParams.get('iid');
            if (iid) canonicalBetId = decodeURIComponent(iid).trim();
          }
        } catch (_) {}
        const idMatch = canonicalBetId.match(/((?:house|casino|sport)[_:]\d{5,22}|\b\d{8,22}\b)/i);
        if (idMatch) {
          canonicalBetId = idMatch[1].includes(':') ? idMatch[1].toLowerCase() : ('house:' + idMatch[1].replace(/^house[_:]?/i, ''));
        }

        const current = await readOverlaySyncState();
        current.bountyClaims = Array.isArray(current.bountyClaims) ? current.bountyClaims : [];
        current.companionVerifiedBets = Array.isArray(current.companionVerifiedBets) ? current.companionVerifiedBets : [];

        const isDuplicate = current.bountyClaims.some(
          c => c.status !== 'REJECTED' && (c.canonicalBetId === canonicalBetId || c.rawBetId === rawInput)
        );
        const companionMatch = current.companionVerifiedBets.find(
          b => b.betId === canonicalBetId || b.betId === rawInput
        ) || null;

        const minBetUsd = Math.max(0.01, Math.min(100_000, parseFloat(body.minBetUsd || 0.10) || 0.10));
        const targetMultiplier = Math.max(1, Math.min(1_000_000, parseFloat(body.targetMultiplier || 100) || 100));
        const claimedBetUsd = companionMatch && companionMatch.betSize > 0
          ? companionMatch.betSize
          : Math.max(0, Math.min(1_000_000, parseFloat(body.claimedBetUsd || 0) || 0));
        const claimedPayoutUsd = companionMatch && companionMatch.payout > 0
          ? companionMatch.payout
          : Math.max(0, Math.min(100_000_000, parseFloat(body.claimedPayoutUsd || 0) || 0));
        const rawClaimedMulti = companionMatch && companionMatch.multiplier > 0
          ? companionMatch.multiplier
          : Math.max(0, Math.min(1_000_000, parseFloat(body.claimedMultiplier || 0) || 0));
        const effectiveMultiplier = (claimedBetUsd > 0 && claimedPayoutUsd > 0)
          ? Number((claimedPayoutUsd / claimedBetUsd).toFixed(2))
          : Number(rawClaimedMulti.toFixed(2));

        const betIdValid = Boolean(canonicalBetId && canonicalBetId.length >= 6 && !isDuplicate);
        const minBetMet = claimedBetUsd >= (minBetUsd - 0.0001) && claimedBetUsd > 0;
        const multiplierMet = effectiveMultiplier >= (targetMultiplier - 0.01);
        const targetSlotNorm = String(body.slotName || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const verifiedSlotNorm = companionMatch && companionMatch.slotName
          ? companionMatch.slotName.toLowerCase().replace(/[^a-z0-9]/g, '')
          : targetSlotNorm;
        const slotMatch = !targetSlotNorm || !verifiedSlotNorm || verifiedSlotNorm.includes(targetSlotNorm) || targetSlotNorm.includes(verifiedSlotNorm);

        const passedCount = [betIdValid, slotMatch, minBetMet, multiplierMet].filter(Boolean).length;
        const preCheckPassed = passedCount === 4;
        const stakeInspectUrl = `https://stake.com/casino/home?iid=${encodeURIComponent(canonicalBetId)}&modal=bet`;
        const stakeMirrorInspectUrl = `https://stake.krd/casino/home?iid=${encodeURIComponent(canonicalBetId)}&modal=bet`;

        return new Response(JSON.stringify({
          ok: true,
          preCheckPassed,
          autoScore: `${passedCount}/4`,
          isDuplicate,
          canonicalBetId,
          stakeInspectUrl,
          stakeMirrorInspectUrl,
          effectiveMultiplier,
          claimedBetUsd,
          claimedPayoutUsd,
          companionVerified: Boolean(companionMatch),
          companionData: companionMatch,
          checks: {
            betIdValid,
            slotMatch,
            minBetMet,
            multiplierMet,
            referralVerified: Boolean(body.referralVerified)
          }
        }), { headers: noCacheHeaders });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 400, headers: noCacheHeaders });
      }
    }

    // 13d. User Data Purge Endpoint (AGENTS.md §2.2 GDPR/CCPA Privacy Compliance)
    if (url.pathname === '/api/privacy/purge' && request.method === 'POST') {
      const noCacheHeaders = { ...corsHeaders, 'Cache-Control': 'no-store, no-cache, must-revalidate' };
      if (!isSameOrTrustedOrigin(request)) {
        return new Response(JSON.stringify({ error: 'Forbidden origin' }), { status: 403, headers: noCacheHeaders });
      }
      const clientIp = request.headers.get('cf-connecting-ip') || '127.0.0.1';
      const rl = checkEdgeRateLimit(clientIp, 'privacy_purge', 3, 300_000);
      if (!rl.allowed) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), { status: 429, headers: noCacheHeaders });
      }
      try {
        const body = await request.json().catch(() => ({}));
        const targetUsername = String(body.username || '').trim().toLowerCase().replace(/^@+/, '');
        if (!targetUsername || targetUsername.length > 64) {
          return new Response(JSON.stringify({ error: 'Valid username required' }), { status: 400, headers: noCacheHeaders });
        }
        const session = await verifyUserSession(request, env, targetUsername);
        if (!session.ok) {
          return new Response(JSON.stringify({ error: 'Forbidden: Valid user session or admin token required to purge account data' }), { status: 403, headers: noCacheHeaders });
        }
        if (env.DB) {
          const u = await env.DB.prepare('SELECT id FROM users WHERE LOWER(username) = LOWER(?1)').bind(targetUsername).first();
          const userId = u?.id || targetUsername;
          await env.DB.prepare('DELETE FROM user_devices WHERE LOWER(user_id) = LOWER(?1) OR LOWER(user_id) = LOWER(?2)').bind(userId, targetUsername).run();
          await env.DB.prepare('DELETE FROM point_transactions WHERE LOWER(user_id) = LOWER(?1) OR LOWER(user_id) = LOWER(?2)').bind(userId, targetUsername).run();
          await env.DB.prepare('DELETE FROM stake_verification_requests WHERE LOWER(kick_username) = LOWER(?1)').bind(targetUsername).run();
          await env.DB.prepare('DELETE FROM store_redemptions WHERE LOWER(kick_username) = LOWER(?1)').bind(targetUsername).run();
          await env.DB.prepare('DELETE FROM raffle_tickets WHERE LOWER(kick_username) = LOWER(?1)').bind(targetUsername).run();
          await env.DB.prepare('DELETE FROM users WHERE LOWER(username) = LOWER(?1)').bind(targetUsername).run();
        }
        return new Response(JSON.stringify({ ok: true, purgedUser: targetUsername }), { headers: noCacheHeaders });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 400, headers: noCacheHeaders });
      }
    }

    const duoCacheKey = new Request('https://diggitybets.vip/__edge_cache__/duo_queues_v2');

    const readDuoQueues = async () => {
      let state = cachedDuoQueues;
      try {
        if (typeof caches !== 'undefined' && caches.default) {
          const match = await caches.default.match(duoCacheKey);
          if (match) {
            const data = await match.json();
            if (data && (data.updatedAt || 0) >= (state.updatedAt || 0)) {
              state = data;
              cachedDuoQueues = data;
            }
          }
        }
      } catch (_) {}

      if (env.DB) {
        try {
          const row = await env.DB.prepare("SELECT value_json, updated_at FROM kv_store WHERE key = 'duo_queues_v1'").first();
          if (row && row.value_json) {
            const parsed = JSON.parse(row.value_json);
            const d1Ts = Number(row.updated_at || parsed.updatedAt || 0);
            if (parsed && d1Ts >= Number(state.updatedAt || 0)) {
              state = { ...cachedDuoQueues, ...parsed, updatedAt: d1Ts };
              cachedDuoQueues = state;
            }
          }
        } catch (_) {}
      }
      return state;
    };

    const writeDuoQueues = async (next) => {
      next.updatedAt = Date.now();
      cachedDuoQueues = next;
      try {
        if (typeof caches !== 'undefined' && caches.default) {
          await caches.default.put(duoCacheKey, new Response(JSON.stringify(next), {
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' }
          }));
        }
      } catch (_) {}

      if (env.DB) {
        try {
          await env.DB.prepare(`
            INSERT INTO kv_store (key, value_json, updated_at)
            VALUES ('duo_queues_v1', ?1, ?2)
            ON CONFLICT(key) DO UPDATE SET value_json = ?1, updated_at = ?2
          `).bind(JSON.stringify(next), next.updatedAt).run();
        } catch (_) {}
      }
    };

    if (url.pathname === '/api/sync/state') {
      const noCacheHeaders = { ...corsHeaders, 'Cache-Control': 'no-store, no-cache, must-revalidate' };
      if (request.method === 'GET') {
        const syncState = await readOverlaySyncState();
        const duoState = await readDuoQueues();
        const adminAuthed = await isAuthorizedAdmin(request, env);
        let state = {
          users: [],
          stake_verification_requests: [],
          store_redemptions: [],
          raffle_tickets: [],
          alt_clusters: [],
          celebrationEvent: syncState.celebrationEvent || null,
          overlayEvents: syncState.overlayEvents || {},
          battle: syncState.battleState || null,
          battleState: syncState.battleState || null,
          tourney: syncState.tourneyState || null,
          tourneyState: syncState.tourneyState || null,
          bonushunt: syncState.bonushuntState || null,
          bonushuntState: syncState.bonushuntState || null,
          slotRequests: Array.isArray(syncState.slotRequests) ? syncState.slotRequests : [],
          activeChatters: Array.isArray(syncState.activeChatters) ? syncState.activeChatters : [],
          chatAnnouncements: Array.isArray(syncState.chatAnnouncements) ? syncState.chatAnnouncements : [],
          duoQueues: duoState,
          companionCaptures: Array.isArray(syncState.companionCaptures) ? syncState.companionCaptures : [],
          companionVerifiedBets: Array.isArray(syncState.companionVerifiedBets) ? syncState.companionVerifiedBets : [],
          bounties: Array.isArray(syncState.bounties) ? syncState.bounties : null,
          bountyClaims: Array.isArray(syncState.bountyClaims) ? syncState.bountyClaims : [],
          updatedAt: Math.max(Number(syncState.updatedAt || 0), Number(duoState.updatedAt || 0))
        };
        if (env.DB) {
          try {
            const userQuery = adminAuthed
              ? 'SELECT * FROM users ORDER BY points_balance DESC LIMIT 250'
              : 'SELECT id, kick_id, username, display_name, avatar, stake_username, stake_verified, points_balance, first_seen_at, last_seen_at FROM users ORDER BY points_balance DESC LIMIT 250';
            const users = await env.DB.prepare(userQuery).all();
            state.users = users.results || [];
            if (adminAuthed) {
              const stake = await env.DB.prepare('SELECT * FROM stake_verification_requests').all();
              const redemptions = await env.DB.prepare('SELECT * FROM store_redemptions').all();
              state.stake_verification_requests = stake.results || [];
              state.store_redemptions = redemptions.results || [];
            }
          } catch (_) {}
        }
        return new Response(JSON.stringify(state), { headers: noCacheHeaders });
      }
      if (request.method === 'POST') {
        if (!isSameOrTrustedOrigin(request)) {
          return new Response(JSON.stringify({ error: 'Forbidden origin' }), { status: 403, headers: noCacheHeaders });
        }
        const adminAuthed = await isAuthorizedAdmin(request, env);
        if (!adminAuthed) {
          return new Response(JSON.stringify({ error: 'Forbidden: Admin authentication required' }), { status: 403, headers: noCacheHeaders });
        }
        const body = await request.json().catch(() => ({}));
        const current = await readOverlaySyncState();
        let mutated = false;

        if (body.overlayEvent || body.celebrationEvent) {
          current.overlayEvents = current.overlayEvents || {};
          if (body.overlayEvent) {
            const targetKey = body.overlayEvent.target || body.overlayEvent.type || 'default';
            current.overlayEvents[targetKey] = body.overlayEvent;
            if (body.overlayEvent.target === 'overlay-celebration' || body.overlayEvent.type === 'CELEBRATION') {
              const evData = body.overlayEvent.data || body.overlayEvent;
              current.celebrationEvent = { ...evData, timestamp: evData.timestamp || evData.ts || Date.now() };
            }
            if (body.overlayEvent.target === 'overlay-battle' && body.overlayEvent.data?.state) {
              current.battleState = body.overlayEvent.data.state;
            }
            if (body.overlayEvent.target === 'overlay-tourney' && body.overlayEvent.data?.state) {
              current.tourneyState = body.overlayEvent.data.state;
            }
            if (body.overlayEvent.target === 'overlay-bonushunt' && body.overlayEvent.data?.state) {
              current.bonushuntState = body.overlayEvent.data.state;
            }
            if (body.overlayEvent.target === 'overlay-slotrequests' && Array.isArray(body.overlayEvent.data?.requests)) {
              current.slotRequests = body.overlayEvent.data.requests;
            }
          }
          if (body.celebrationEvent) {
            current.celebrationEvent = { ...body.celebrationEvent, timestamp: body.celebrationEvent.timestamp || body.celebrationEvent.ts || Date.now() };
          }
          mutated = true;
        }

        if (body.battleState || body.battle) {
          current.battleState = body.battleState || body.battle;
          mutated = true;
        }
        if (body.tourneyState || body.tourney) {
          current.tourneyState = body.tourneyState || body.tourney;
          mutated = true;
        }
        if (body.bonushuntState || body.bonushunt) {
          current.bonushuntState = body.bonushuntState || body.bonushunt;
          mutated = true;
        }
        if (Array.isArray(body.slotRequests)) {
          current.slotRequests = body.slotRequests.slice(0, 100);
          mutated = true;
        }
        if (Array.isArray(body.activeChatters)) {
          current.activeChatters = body.activeChatters.slice(0, 150);
          mutated = true;
        }
        if (body.chatAnnouncement && typeof body.chatAnnouncement === 'object') {
          current.chatAnnouncements = Array.isArray(current.chatAnnouncements) ? current.chatAnnouncements : [];
          current.chatAnnouncements.push(body.chatAnnouncement);
          if (current.chatAnnouncements.length > 50) current.chatAnnouncements = current.chatAnnouncements.slice(-50);
          mutated = true;
        }

        if (mutated) {
          await writeOverlaySyncState(current);
        }

        if (env.DB && Array.isArray(body.users) && adminAuthed) {
          for (const u of body.users) {
            try {
              await env.DB.prepare(`
                INSERT INTO users (id, kick_id, username, display_name, avatar, stake_username, stake_verified, points_balance, first_seen_at, last_seen_at)
                VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)
                ON CONFLICT(kick_id) DO UPDATE SET points_balance = ?8, stake_verified = ?7
              `).bind(u.id, u.kick_id, u.username, u.display_name, u.avatar, u.stake_username, u.stake_verified, u.points_balance, u.first_seen_at, u.last_seen_at).run();
            } catch (_) {}
          }
        }
        return new Response(JSON.stringify({ success: true, updatedAt: current.updatedAt }), { headers: noCacheHeaders });
      }
    }

    // 21. Battle & Tournament Edge Endpoints (Backed by Global D1 Sync)
    if (url.pathname === '/api/battle/state' && request.method === 'GET') {
      const noCacheHeaders = { ...corsHeaders, 'Cache-Control': 'no-store, no-cache, must-revalidate' };
      const syncState = await readOverlaySyncState();
      const defaultBattle = {
        id: 'worker_battle',
        status: 'LOBBY',
        gameMode: 'BONUS_BUY',
        betAmount: 10,
        prizeText: '$50 Prize Pool',
        playerA: null,
        playerB: null,
        winner: null,
        kothActive: true,
        reigningKing: null,
        currentStreak: 0,
        maxStreak: 4,
        kothPrizeAmount: 20,
        awaitingKingDecision: false
      };
      return new Response(JSON.stringify({
        state: syncState.battleState || defaultBattle
      }), { headers: noCacheHeaders });
    }

    if (url.pathname.startsWith('/api/battle/') && request.method === 'POST') {
      const noCacheHeaders = { ...corsHeaders, 'Cache-Control': 'no-store, no-cache, must-revalidate' };
      if (!(await isAuthorizedAdmin(request, env))) {
        return new Response(JSON.stringify({ error: 'Forbidden: Admin authentication required' }), { status: 403, headers: noCacheHeaders });
      }
      try {
        const body = await request.json().catch(() => ({}));
        const current = await readOverlaySyncState();
        if (body.state) {
          current.battleState = body.state;
        } else if (body.playerA !== undefined || body.playerB !== undefined || body.status !== undefined) {
          current.battleState = { ...(current.battleState || {}), ...body };
        }
        await writeOverlaySyncState(current);
        return new Response(JSON.stringify({ status: 'ok', success: true, state: current.battleState }), { headers: noCacheHeaders });
      } catch (_) {
        return new Response(JSON.stringify({ status: 'ok', success: true }), { headers: noCacheHeaders });
      }
    }

    if (url.pathname === '/api/tourney/state' && request.method === 'GET') {
      const noCacheHeaders = { ...corsHeaders, 'Cache-Control': 'no-store, no-cache, must-revalidate' };
      const syncState = await readOverlaySyncState();
      const defaultTourney = {
        id: 'worker_tourney',
        title: '8-Bracket Slot Championship',
        status: 'LOBBY',
        gameMode: 'BONUS_BUY',
        betPerRound: 10,
        prizeText: '1st: $150 · 2nd: $50',
        participants: [],
        matches: []
      };
      return new Response(JSON.stringify({
        state: syncState.tourneyState || defaultTourney,
        viewerData: null
      }), { headers: noCacheHeaders });
    }

    if (url.pathname.startsWith('/api/tourney/') && request.method === 'POST') {
      const noCacheHeaders = { ...corsHeaders, 'Cache-Control': 'no-store, no-cache, must-revalidate' };
      if (!(await isAuthorizedAdmin(request, env))) {
        return new Response(JSON.stringify({ error: 'Forbidden: Admin authentication required' }), { status: 403, headers: noCacheHeaders });
      }
      try {
        const body = await request.json().catch(() => ({}));
        const current = await readOverlaySyncState();
        if (body.state) {
          current.tourneyState = body.state;
        } else if (Array.isArray(body.participants) || Array.isArray(body.matches)) {
          current.tourneyState = { ...(current.tourneyState || {}), ...body };
        }
        await writeOverlaySyncState(current);
        return new Response(JSON.stringify({ status: 'ok', success: true, state: current.tourneyState }), { headers: noCacheHeaders });
      } catch (_) {
        return new Response(JSON.stringify({ status: 'ok', success: true }), { headers: noCacheHeaders });
      }
    }

    // 22. Phase 4 Wheels & Spotlight Edge Endpoints
    if (url.pathname === '/api/wheel/spin-complete' && request.method === 'POST') {
      if (!(await isAuthorizedAdmin(request, env))) {
        return new Response(JSON.stringify({ error: 'Forbidden: Admin authentication required' }), { status: 403, headers: corsHeaders });
      }
      try {
        const body = await request.json().catch(() => ({}));
        const current = await readOverlaySyncState();
        if (body.winner && body.announce) {
          const cleanUser = '@' + String(body.winner).trim().replace(/^@+/, '');
          const message = formatWinnerAnnouncementText(cleanUser, body.eventType || 'picked', body.message);
          current.chatAnnouncements = Array.isArray(current.chatAnnouncements) ? current.chatAnnouncements : [];
          current.chatAnnouncements.push({
            id: 'ann_' + Date.now(),
            username: cleanUser,
            eventType: body.eventType || 'picked',
            message,
            slotName: body.slotName || '',
            ts: Date.now()
          });
          await writeOverlaySyncState(current);
          ctx.waitUntil(dispatchKickBotChatMessage(message));
        }
        return new Response(JSON.stringify({
          success: true,
          spinId: body.spinId || null,
          dispatched: true,
          timestamp: Date.now()
        }), { headers: corsHeaders });
      } catch (_) {
        return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
      }
    }

    if (url.pathname === '/api/wheel/duo/queues') {
      const noCacheHeaders = { ...corsHeaders, 'Cache-Control': 'no-store, no-cache, must-revalidate' };
      if (request.method === 'POST') {
        if (!(await isAuthorizedAdmin(request, env))) {
          return new Response(JSON.stringify({ error: 'Forbidden: Admin authentication required' }), { status: 403, headers: noCacheHeaders });
        }
        try {
          const body = await request.json();
          const current = await readDuoQueues();
          const next = { ...current };
          if (Array.isArray(body.battleQueue)) next.battleQueue = body.battleQueue;
          if (Array.isArray(body.tourneyQueue)) next.tourneyQueue = body.tourneyQueue;
          if (body.mode) next.mode = body.mode;
          next.counts = {
            battle: next.battleQueue.length,
            tourney: next.tourneyQueue.length
          };
          await writeDuoQueues(next);
          return new Response(JSON.stringify({ success: true, ...next }), { headers: noCacheHeaders });
        } catch (_) {
          return new Response(JSON.stringify({ success: false }), { headers: noCacheHeaders });
        }
      }
      const data = await readDuoQueues();
      return new Response(JSON.stringify(data), { headers: noCacheHeaders });
    }

    if (url.pathname === '/api/wheel/duo/mode' && request.method === 'POST') {
      const noCacheHeaders = { ...corsHeaders, 'Cache-Control': 'no-store, no-cache, must-revalidate' };
      if (!(await isAuthorizedAdmin(request, env))) {
        return new Response(JSON.stringify({ error: 'Forbidden: Admin authentication required' }), { status: 403, headers: noCacheHeaders });
      }
      const body = await request.json().catch(() => ({}));
      const current = await readDuoQueues();
      if (body.mode) {
        current.mode = body.mode;
        await writeDuoQueues(current);
      }
      return new Response(JSON.stringify({ success: true, mode: current.mode || 'battle' }), { headers: noCacheHeaders });
    }

    if (url.pathname === '/api/wheel/duo/spin' && request.method === 'POST') {
      const noCacheHeaders = { ...corsHeaders, 'Cache-Control': 'no-store, no-cache, must-revalidate' };
      if (!(await isAuthorizedAdmin(request, env))) {
        return new Response(JSON.stringify({ error: 'Forbidden: Admin authentication required' }), { status: 403, headers: noCacheHeaders });
      }
      const body = await request.json().catch(() => ({}));
      const current = await readDuoQueues();
      current.lastSpin = {
        action: 'spin',
        targetOverlay: 'wheel-duo',
        mode: body.mode || current.mode || 'battle',
        spinId: body.spinId || ('edge_spin_' + Date.now()),
        winner: body.winner || null,
        targetCorner: body.targetCorner || 'A',
        targetSeed: body.targetSeed || null,
        ts: Date.now()
      };
      await writeDuoQueues(current);
      return new Response(JSON.stringify({
        success: true,
        ...current.lastSpin
      }), { headers: noCacheHeaders });
    }

    if (url.pathname === '/api/hunt/spotlight' && request.method === 'GET') {
      const noCacheHeaders = { ...corsHeaders, 'Cache-Control': 'no-store, no-cache, must-revalidate' };
      const syncState = await readOverlaySyncState();
      const spot = syncState.spotlightState || { active: false, username: null, expiresAt: 0 };
      const now = Date.now();
      const isActive = Boolean(spot.active && spot.expiresAt > now);
      return new Response(JSON.stringify({
        active: isActive,
        username: isActive ? spot.username : null,
        expiresAt: isActive ? spot.expiresAt : 0,
        remainingSeconds: isActive ? Math.max(0, Math.ceil((spot.expiresAt - now) / 1000)) : 0
      }), { headers: noCacheHeaders });
    }

    if (url.pathname === '/api/hunt/spotlight/clear' && request.method === 'POST') {
      if (!(await isAuthorizedAdmin(request, env))) {
        return new Response(JSON.stringify({ error: 'Forbidden: Admin authentication required' }), { status: 403, headers: corsHeaders });
      }
      const current = await readOverlaySyncState();
      current.spotlightState = { active: false, username: null, expiresAt: 0 };
      await writeOverlaySyncState(current);
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    if (url.pathname === '/api/wheel/csgo/active-pool') {
      const noCacheHeaders = { ...corsHeaders, 'Cache-Control': 'no-store, no-cache, must-revalidate' };
      if (request.method === 'POST') {
        if (!(await isAuthorizedAdmin(request, env))) {
          return new Response(JSON.stringify({ error: 'Forbidden: Admin authentication required' }), { status: 403, headers: noCacheHeaders });
        }
        try {
          const body = await request.json().catch(() => ({}));
          const current = await readOverlaySyncState();
          const incoming = Array.isArray(body.chatters) ? body.chatters : [];
          const mergedMap = new Map();
          const now = Date.now();
          for (const c of (current.activeChatters || [])) {
            const name = String(c.username || c.user || '').trim().replace(/^@+/, '');
            if (name) mergedMap.set(name.toLowerCase(), { username: name, avatar: c.avatar || '', lastSeenAt: Number(c.lastSeenAt || now) });
          }
          for (const c of incoming) {
            const name = String(c.username || c.user || c || '').trim().replace(/^@+/, '');
            if (name) mergedMap.set(name.toLowerCase(), { username: name, avatar: c.avatar || '', lastSeenAt: Number(c.lastSeenAt || now) });
          }
          current.activeChatters = Array.from(mergedMap.values()).sort((a, b) => b.lastSeenAt - a.lastSeenAt).slice(0, 150);
          await writeOverlaySyncState(current);
          return new Response(JSON.stringify({
            windowSeconds: 900,
            count: current.activeChatters.length,
            chatters: current.activeChatters
          }), { headers: noCacheHeaders });
        } catch (_) {}
      }
      const syncState = await readOverlaySyncState();
      const chatters = Array.isArray(syncState.activeChatters) ? syncState.activeChatters : [];
      return new Response(JSON.stringify({
        windowSeconds: 900,
        count: chatters.length,
        chatters
      }), { headers: noCacheHeaders });
    }

    // 23. Default 404 for unknown API routes
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: corsHeaders
    });
  }
};
