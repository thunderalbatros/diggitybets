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

  // Mock API endpoints for local testing & visual audit
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
    res.end(JSON.stringify({ success: true }));
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
