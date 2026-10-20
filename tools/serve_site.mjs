import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const PORT = 3000;
const MIME = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
  let cleanUrl = req.url.split('?')[0];
  try {
    cleanUrl = decodeURIComponent(cleanUrl);
  } catch (e) {
    // Keep raw cleanUrl if malformed URI
  }
  if (cleanUrl === '/' || cleanUrl === '') cleanUrl = '/index.html';

  // API Endpoints for Local OAuth Simulation
  if (cleanUrl === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ status: 'ok', service: 'hunthub-edge-api', uptime: process.uptime() }));
    return;
  }

  if (cleanUrl === '/api/kick/stream-status' || cleanUrl === '/api/kick/realtime-token') {
    (async () => {
      let isStreamLive = false;
      let viewerCount = 0;
      let chatroomId = 86765775;
      try {
        const kickRes = await fetch('https://kick.com/api/v2/channels/diggitybets');
        if (kickRes.ok) {
          const kickData = await kickRes.json();
          isStreamLive = Boolean(kickData?.livestream && kickData.livestream.is_live !== false);
          viewerCount = Number(kickData?.livestream?.viewer_count || 0);
          if (kickData?.chatroom?.id) chatroomId = Number(kickData.chatroom.id);
        }
      } catch (e) {}

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

      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({
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
      }));
    })();
    return;
  }


  if (cleanUrl === '/api/auth/kick/callback' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      let parsed = {};
      try { parsed = JSON.parse(body); } catch(e) {}
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({
        success: true,
        username: parsed.code ? 'KickFan_' + parsed.code.slice(0, 6) : 'DiggityFan_99',
        isSub: true,
        verified: true,
        avatarUrl: ''
      }));
    });
    return;
  }

  if (cleanUrl === '/api/auth/discord/callback' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      let parsed = {};
      try { parsed = JSON.parse(body); } catch(e) {}
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({
        success: true,
        username: 'DiscordMember#' + (parsed.code ? parsed.code.slice(0, 4) : '2026'),
        verified: true
      }));
    });
    return;
  }

  // Local in-memory sync state for local testing & visual audit
  if (!globalThis.__LOCAL_SYNC__) {
    globalThis.__LOCAL_SYNC__ = {
      celebrationEvent: null,
      overlayEvents: {},
      battleState: null,
      tourneyState: null,
      bonushuntState: null,
      slotRequests: [],
      activeChatters: [],
      chatAnnouncements: [],
      duoQueues: { battleQueue: [], tourneyQueue: [], mode: 'battle', counts: { battle: 0, tourney: 0 }, updatedAt: 0 },
      updatedAt: 0
    };
  }
  const syncMem = globalThis.__LOCAL_SYNC__;

  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-user, x-admin-token, x-admin-secret, x-device-fingerprint'
    });
    res.end();
    return;
  }

  if (cleanUrl === '/api/wheel/duo/queues') {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body || '{}');
          if (Array.isArray(parsed.battleQueue)) syncMem.duoQueues.battleQueue = parsed.battleQueue;
          if (Array.isArray(parsed.tourneyQueue)) syncMem.duoQueues.tourneyQueue = parsed.tourneyQueue;
          if (parsed.mode) syncMem.duoQueues.mode = parsed.mode;
          syncMem.duoQueues.counts = {
            battle: syncMem.duoQueues.battleQueue.length,
            tourney: syncMem.duoQueues.tourneyQueue.length
          };
          syncMem.duoQueues.updatedAt = Date.now();
        } catch (_) {}
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: true, ...syncMem.duoQueues }));
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify(syncMem.duoQueues));
    return;
  }

  if (cleanUrl === '/api/wheel/duo/spin' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      let parsed = {};
      try { parsed = JSON.parse(body || '{}'); } catch (_) {}
      syncMem.duoQueues.lastSpin = {
        action: 'spin',
        targetOverlay: 'wheel-duo',
        mode: parsed.mode || syncMem.duoQueues.mode || 'battle',
        spinId: parsed.spinId || ('local_spin_' + Date.now()),
        winner: parsed.winner || null,
        targetCorner: parsed.targetCorner || 'A',
        targetSeed: parsed.targetSeed || null,
        ts: Date.now()
      };
      syncMem.duoQueues.updatedAt = Date.now();
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ success: true, ...syncMem.duoQueues.lastSpin }));
    });
    return;
  }

  if (cleanUrl === '/api/kick/chat/announce' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      let parsed = {};
      try { parsed = JSON.parse(body || '{}'); } catch (_) {}
      const cleanUser = '@' + String(parsed.username || parsed.winner || 'Viewer').trim().replace(/^@+/, '');
      const eventType = String(parsed.eventType || parsed.type || 'picked').trim().toLowerCase();
      const message = parsed.message || `Congratulations ${cleanUser} has ${eventType === 'picked' ? 'been picked' : 'won the ' + eventType}!`;
      const ann = {
        id: 'ann_' + Date.now(),
        username: cleanUser,
        eventType,
        message,
        slotName: parsed.slotName || '',
        prize: parsed.prize || '',
        ts: Date.now()
      };
      syncMem.chatAnnouncements.push(ann);
      if (parsed.celebration) {
        syncMem.celebrationEvent = { ...parsed.celebration, announcementText: message, timestamp: Date.now() };
        syncMem.overlayEvents['overlay-celebration'] = syncMem.celebrationEvent;
      }
      syncMem.updatedAt = Date.now();
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ ok: true, announcement: ann, celebrationEvent: syncMem.celebrationEvent }));
    });
    return;
  }

  if (cleanUrl === '/api/kick/chat/announcements') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ ok: true, announcements: syncMem.chatAnnouncements, updatedAt: syncMem.updatedAt }));
    return;
  }

  if (cleanUrl === '/api/overlay/celebration') {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body || '{}');
          const ev = parsed.celebration || parsed.data || parsed;
          syncMem.celebrationEvent = { ...ev, timestamp: ev.timestamp || ev.ts || Date.now() };
          syncMem.overlayEvents['overlay-celebration'] = syncMem.celebrationEvent;
          syncMem.updatedAt = Date.now();
        } catch (_) {}
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: true, celebrationEvent: syncMem.celebrationEvent }));
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({
      success: true,
      celebrationEvent: syncMem.celebrationEvent,
      overlayEvents: syncMem.overlayEvents,
      chatAnnouncements: syncMem.chatAnnouncements,
      updatedAt: syncMem.updatedAt
    }));
    return;
  }

  if (cleanUrl === '/api/sync/state') {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body || '{}');
          if (parsed.overlayEvent) {
            const key = parsed.overlayEvent.target || parsed.overlayEvent.type || 'default';
            syncMem.overlayEvents[key] = parsed.overlayEvent;
          }
          if (parsed.celebrationEvent) syncMem.celebrationEvent = parsed.celebrationEvent;
          if (parsed.battleState || parsed.battle) syncMem.battleState = parsed.battleState || parsed.battle;
          if (parsed.tourneyState || parsed.tourney) syncMem.tourneyState = parsed.tourneyState || parsed.tourney;
          if (parsed.bonushuntState || parsed.bonushunt) syncMem.bonushuntState = parsed.bonushuntState || parsed.bonushunt;
          if (Array.isArray(parsed.slotRequests)) syncMem.slotRequests = parsed.slotRequests;
          if (Array.isArray(parsed.activeChatters)) syncMem.activeChatters = parsed.activeChatters;
          syncMem.updatedAt = Date.now();
        } catch (_) {}
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success: true, updatedAt: syncMem.updatedAt }));
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({
      users: [],
      stake_verification_requests: [],
      store_redemptions: [],
      raffle_tickets: [],
      alt_clusters: [],
      celebrationEvent: syncMem.celebrationEvent,
      overlayEvents: syncMem.overlayEvents,
      battle: syncMem.battleState,
      battleState: syncMem.battleState,
      tourney: syncMem.tourneyState,
      tourneyState: syncMem.tourneyState,
      bonushunt: syncMem.bonushuntState,
      bonushuntState: syncMem.bonushuntState,
      slotRequests: syncMem.slotRequests,
      activeChatters: syncMem.activeChatters,
      chatAnnouncements: syncMem.chatAnnouncements,
      duoQueues: syncMem.duoQueues,
      updatedAt: syncMem.updatedAt
    }));
    return;
  }

  if (cleanUrl === '/api/wheel/csgo/active-pool') {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body || '{}');
          if (Array.isArray(parsed.chatters)) syncMem.activeChatters = parsed.chatters;
          syncMem.updatedAt = Date.now();
        } catch (_) {}
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ windowSeconds: 900, count: syncMem.activeChatters.length, chatters: syncMem.activeChatters }));
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ windowSeconds: 900, count: syncMem.activeChatters.length, chatters: syncMem.activeChatters }));
    return;
  }

  if (cleanUrl === '/api/hunt/spotlight') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ active: false, username: null }));
    return;
  }

  if (cleanUrl === '/api/stake/target') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ target: 77777, validForSeconds: 600, expiresAt: Date.now() + 600000 }));
    return;
  }

  if (cleanUrl === '/api/store/stock') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ catalog: [] }));
    return;
  }

  if (cleanUrl.startsWith('/api/battle/')) {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ success: true, state: syncMem.battleState }));
    return;
  }

  // Generic API fallback for simulation / visual audit
  if (cleanUrl.startsWith('/api/')) {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({
      status: 'ok',
      success: true,
      queues: { p1: [], p2: [] },
      mode: 'BONUS_BUY',
      isLive: false,
      catalog: [],
      redemptions: [],
      alerts: [],
      ledger: []
    }));
    return;
  }

  let resolvedPath = path.join(rootDir, cleanUrl);

  // Check special mappings for Stake clone
  if (cleanUrl === '/stake-games' || cleanUrl === '/stake-games/' || cleanUrl === '/site/stake-games' || cleanUrl === '/site/stake-games/') {
    resolvedPath = path.join(rootDir, 'site', 'stake-games', 'index.html');
  } else if (cleanUrl.startsWith('/assets/')) {
    resolvedPath = path.join(rootDir, 'site', 'stake-games', cleanUrl);
  } else if (cleanUrl.startsWith('/dino-assets/')) {
    resolvedPath = path.join(rootDir, 'site', 'stake-games', cleanUrl);
  } else if (['/crash', '/plinko', '/dino', '/mines', '/favourites', '/recent', '/challenges', '/my-bets'].includes(cleanUrl)) {
    resolvedPath = path.join(rootDir, 'site', 'stake-games', 'index.html');
  } else if (cleanUrl.startsWith('/images/')) {
    // Check if in stake-games/images first
    const stakeImg = path.join(rootDir, 'site', 'stake-games', cleanUrl);
    if (fs.existsSync(stakeImg)) {
      resolvedPath = stakeImg;
    } else {
      resolvedPath = path.join(rootDir, 'site', cleanUrl);
    }
  }

  // If path doesn't exist, try site/ prefix if not already present
  if (!fs.existsSync(resolvedPath)) {
    const fallbackPath = path.join(rootDir, 'site', cleanUrl);
    if (fs.existsSync(fallbackPath)) {
      resolvedPath = fallbackPath;
    }
  }

  fs.readFile(resolvedPath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('Not found: ' + cleanUrl);
      return;
    }
    const ext = path.extname(resolvedPath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    res.end(data);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`HuntHub Web Server running at http://127.0.0.1:${PORT}`);
});
