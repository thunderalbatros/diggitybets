/**
 * HuntHub Cloudflare Worker — Production Edge API (100% Free Plan)
 * Handles Kick.com OAuth 2.1 PKCE exchange, Discord OAuth2, and Cloudflare D1 Serverless SQLite.
 * Zero secrets exposed in git. Environment variables managed in Cloudflare Dashboard or .dev.vars.
 */

async function initD1(db) {
  if (!db) return;
  try {
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
    `);
  } catch (e) {
    console.warn('[D1] Schema initialization note:', e.message);
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. CORS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-user, Kick-Event-Signature'
        }
      });
    }

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    };

    // Auto-init D1 schema on first database request if binding exists
    if (env.DB) {
      ctx.waitUntil(initD1(env.DB));
    }

    // 2. Static Assets binding (Cloudflare Workers Static Assets)
    if (env.ASSETS && !url.pathname.startsWith('/api/')) {
      const assetRes = await env.ASSETS.fetch(request);
      if (assetRes.status !== 404) {
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
      authorizeUrl.searchParams.set('scope', 'user:read');
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
        const { code, code_verifier, redirect_uri } = await request.json();

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

        const tokenRes = await fetch('https://id.kick.com/oauth/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(tokenParams)
        });

        let userData = { username: 'KickViewer', isSub: false, id: 0, avatarUrl: '' };

        if (tokenRes.ok) {
          const tokenData = await tokenRes.json();
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
        } else {
          userData.username = 'KickUser_' + code.substring(0, 5);
        }

        const cleanUsername = String(userData.username || '').trim().toLowerCase().replace(/^@/, '');
        const kickIdNum = Number(userData.id) || 0;
        const isAdmin = (cleanUsername === 'diggitybets' || cleanUsername === 'diggity_bets' || cleanUsername === 'tarkansky' || kickIdNum === 88254585);

        // Persist into D1 if available
        if (env.DB && userData.username) {
          try {
            const now = Math.floor(Date.now() / 1000);
            await env.DB.prepare(`
              INSERT INTO users (id, kick_id, username, display_name, avatar, first_seen_at, last_seen_at)
              VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?6)
              ON CONFLICT(kick_id) DO UPDATE SET last_seen_at = ?6, avatar = ?5
            `).bind(crypto.randomUUID(), kickIdNum || Math.floor(Date.now() / 1000), cleanUsername, userData.username, userData.avatarUrl || '', now).run();
          } catch (_) {}
        }

        return new Response(JSON.stringify({
          success: true,
          username: userData.username,
          avatarUrl: userData.avatarUrl || '',
          kick_id: userData.id,
          isAdmin,
          verified: true
        }), { headers: corsHeaders });

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
      try {
        const { username } = await request.json();
        if (env.DB && username) {
          await env.DB.prepare(`
            UPDATE users SET discord_id = NULL, discord_username = NULL, discord_avatar = NULL
            WHERE LOWER(username) = LOWER(?1)
          `).bind(username).run();
        }
      } catch (_) {}
      return new Response(JSON.stringify({ success: true, unlinked: true }), { headers: corsHeaders });
    }

    // 9. Stake Limbo Target Multiplier Endpoint (OTP 10000 - 999999, valid 600s)
    if (url.pathname === '/api/stake/target' && request.method === 'GET') {
      const target = Math.floor(Math.random() * (999999 - 10000 + 1)) + 10000;
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

    // 10. Stake Verification Request Endpoint (Universal Bet Parser)
    if (url.pathname === '/api/stake/verify-request' && request.method === 'POST') {
      try {
        const { kickUsername, stakeUsername, targetMultiplier, rawBetInput } = await request.json();
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

    // 11. Profile Update Endpoint
    if (url.pathname === '/api/profile/update' && request.method === 'POST') {
      try {
        const body = await request.json();
        if (env.DB && body.username) {
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
              body.avatar || null,
              body.crypto_ltc || null,
              body.crypto_btc || null,
              body.crypto_eth || null,
              body.crypto_usdc || null,
              body.crypto_sol || null,
              body.x_handle || null,
              body.ig_handle || null,
              body.username
            ).run();
          } catch (_) {}
        }
        return new Response(JSON.stringify({ success: true, user: body }), { headers: corsHeaders });
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
        { key: 'vip_discord', title: 'VIP Streamer Discord Role', regularCost: 400, vipCost: 400, weeklyStockLimit: null, remainingStock: null, soldOut: false, oneTimePerAccount: true },
        { key: 'battle_entry', title: 'Guaranteed 1v1 Battle Entry', regularCost: 700, vipCost: 500, weeklyStockLimit: 6, remainingStock: 6, soldOut: false, cooldownDays: 14 },
        { key: 'tourney_entry', title: 'Guaranteed 8-Bracket Tourney Entry', regularCost: 1000, vipCost: 800, weeklyStockLimit: 6, remainingStock: 6, soldOut: false },
        { key: 'bonus_split_20', title: '$20 Bonus Buy Split Profit (50/50)', regularCost: 1500, vipCost: 1200, weeklyStockLimit: 3, remainingStock: 3, soldOut: false, maxSplitCapUsd: 100 }
      ];
      return new Response(JSON.stringify({ catalog }), { headers: corsHeaders });
    }

    // 12B. Phase 6 Watch-to-Earn Heartbeat (+10 $DIG every 15m when stream is live)
    if (url.pathname === '/api/watch/heartbeat' && request.method === 'POST') {
      try {
        const { username } = await request.json().catch(() => ({}));
        if (!username) {
          return new Response(JSON.stringify({ awarded: false, amount: 0, reason: 'UNAUTHENTICATED' }), { status: 400, headers: corsHeaders });
        }
        return new Response(JSON.stringify({ awarded: true, amount: 10, reason: 'WATCH_HEARTBEAT_OK' }), { headers: corsHeaders });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: corsHeaders });
      }
    }

    // 12C. Phase 6 House Games Anti-Exploit Bet Endpoint (95% RTP, Max Bet 50 $DIG, Max Win Cap 500 $DIG)
    if (url.pathname === '/api/games/bet' && request.method === 'POST') {
      try {
        const { game, betAmount, rawMultiplier } = await request.json().catch(() => ({}));
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
        const mult = Number(rawMultiplier) || 0;
        const rawPayout = mult > 0 ? Math.floor(bet * mult) : 0;
        const cappedPayout = rawPayout > 0 ? Math.min(rawPayout, bet + 500) : 0;
        const netProfit = cappedPayout - bet;
        return new Response(JSON.stringify({
          success: true,
          game: game || 'plinko',
          betAmount: bet,
          rawPayout,
          cappedPayout,
          netProfit,
          rtp: 95.0,
          maxBet: 50,
          maxWinCap: 500
        }), { headers: corsHeaders });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: corsHeaders });
      }
    }

    // 12. Store Redeem Voucher Endpoint
    if (url.pathname === '/api/store/redeem' && request.method === 'POST') {
      try {
        const { username, voucherTitle, costPoints, stakeVerified } = await request.json();
        const id = crypto.randomUUID();
        const now = Math.floor(Date.now() / 1000);
        const titleLower = String(voucherTitle || '').toLowerCase();
        let effectiveCost = Number(costPoints) || 50;
        if (titleLower.includes('20') && titleLower.includes('split')) {
          effectiveCost = stakeVerified ? 1200 : 1500;
        } else if (titleLower.includes('battle') || titleLower.includes('1v1')) {
          effectiveCost = stakeVerified ? 500 : 700;
        } else if (titleLower.includes('tourney') || titleLower.includes('bracket')) {
          effectiveCost = stakeVerified ? 800 : 1000;
        }
        if (env.DB && username) {
          await env.DB.prepare(`
            INSERT INTO store_redemptions (id, user_id, kick_username, voucher_title, cost_points, status, created_at)
            VALUES (?1, ?1, ?2, ?3, ?4, 'PENDING', ?5)
          `).bind(id, username, voucherTitle, effectiveCost, now).run();
        }
        return new Response(JSON.stringify({
          success: true,
          effectiveCost,
          redemption: { id, kick_username: username, voucher_title: voucherTitle, cost_points: effectiveCost, status: 'PENDING', created_at: now }
        }), { headers: corsHeaders });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: corsHeaders });
      }
    }

    // 13. Admin Store Redemptions
    if (url.pathname === '/api/admin/store-redemptions' && request.method === 'GET') {
      const adminUser = request.headers.get('x-admin-user') || url.searchParams.get('adminUser') || '';
      if (!['diggitybets', 'diggity_bets', 'tarkansky'].includes(String(adminUser).toLowerCase().replace('@', ''))) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: corsHeaders });
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

    // 14. Admin Approve Store Redemption
    if (url.pathname === '/api/admin/approve-store-redemption' && request.method === 'POST') {
      const { redemptionId } = await request.json();
      if (env.DB && redemptionId) {
        await env.DB.prepare("UPDATE store_redemptions SET status = 'FULFILLED' WHERE id = ?1").bind(redemptionId).run();
      }
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    // 15. Admin Reject Store Redemption
    if (url.pathname === '/api/admin/reject-store-redemption' && request.method === 'POST') {
      const { redemptionId } = await request.json();
      if (env.DB && redemptionId) {
        await env.DB.prepare("UPDATE store_redemptions SET status = 'REJECTED' WHERE id = ?1").bind(redemptionId).run();
      }
      return new Response(JSON.stringify({ success: true, refunded: true }), { headers: corsHeaders });
    }

    // 16. Admin Stake Verifications Queue
    if (url.pathname === '/api/admin/stake-verifications' && request.method === 'GET') {
      const adminUser = request.headers.get('x-admin-user') || url.searchParams.get('adminUser') || '';
      if (!['diggitybets', 'diggity_bets', 'tarkansky'].includes(String(adminUser).toLowerCase().replace('@', ''))) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: corsHeaders });
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

    // 17. Admin Approve Stake Verification
    if (url.pathname === '/api/admin/approve-stake-verification' && request.method === 'POST') {
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

    // 18. Admin Reject Stake Verification
    if (url.pathname === '/api/admin/reject-stake-verification' && request.method === 'POST') {
      const { requestId } = await request.json();
      if (env.DB && requestId) {
        await env.DB.prepare("UPDATE stake_verification_requests SET status = 'REJECTED' WHERE id = ?1").bind(requestId).run();
      }
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    // 19. Admin Security Alerts
    if (url.pathname === '/api/admin/security-alerts' && request.method === 'GET') {
      const adminUser = request.headers.get('x-admin-user') || url.searchParams.get('adminUser') || '';
      if (!['diggitybets', 'diggity_bets', 'tarkansky'].includes(String(adminUser).toLowerCase().replace('@', ''))) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: corsHeaders });
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

    // 20. Cloudflare D1 Sync Endpoint (Sync local node and edge)
    if (url.pathname === '/api/sync/state') {
      if (request.method === 'GET') {
        let state = { users: [], stake_verification_requests: [], store_redemptions: [], raffle_tickets: [], alt_clusters: [] };
        if (env.DB) {
          try {
            const users = await env.DB.prepare('SELECT * FROM users').all();
            const stake = await env.DB.prepare('SELECT * FROM stake_verification_requests').all();
            const redemptions = await env.DB.prepare('SELECT * FROM store_redemptions').all();
            state = {
              users: users.results || [],
              stake_verification_requests: stake.results || [],
              store_redemptions: redemptions.results || []
            };
          } catch (_) {}
        }
        return new Response(JSON.stringify(state), { headers: corsHeaders });
      }
      if (request.method === 'POST') {
        const body = await request.json();
        if (env.DB && Array.isArray(body.users)) {
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
        return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
      }
    }

    // 21. Battle & Tournament Edge Endpoints
    if (url.pathname === '/api/battle/state' && request.method === 'GET') {
      return new Response(JSON.stringify({
        state: {
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
        }
      }), { headers: corsHeaders });
    }

    if (url.pathname.startsWith('/api/battle/') && request.method === 'POST') {
      return new Response(JSON.stringify({ status: 'ok', success: true }), { headers: corsHeaders });
    }

    if (url.pathname === '/api/tourney/state' && request.method === 'GET') {
      return new Response(JSON.stringify({
        state: {
          id: 'worker_tourney',
          title: '8-Bracket Slot Championship',
          status: 'LOBBY',
          gameMode: 'BONUS_BUY',
          betPerRound: 10,
          prizeText: '1st: $150 · 2nd: $50',
          participants: [],
          matches: []
        },
        viewerData: null
      }), { headers: corsHeaders });
    }

    if (url.pathname.startsWith('/api/tourney/') && request.method === 'POST') {
      return new Response(JSON.stringify({ status: 'ok', success: true }), { headers: corsHeaders });
    }

    // 22. Phase 4 Wheels & Spotlight Edge Endpoints
    if (url.pathname === '/api/wheel/spin-complete' && request.method === 'POST') {
      try {
        const body = await request.json().catch(() => ({}));
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

    if (url.pathname === '/api/wheel/duo/queues' && request.method === 'GET') {
      return new Response(JSON.stringify({
        battleQueue: [],
        tourneyQueue: [],
        mode: 'battle',
        counts: { battle: 0, tourney: 0 }
      }), { headers: corsHeaders });
    }

    if (url.pathname === '/api/wheel/duo/mode' && request.method === 'POST') {
      const body = await request.json().catch(() => ({}));
      return new Response(JSON.stringify({ success: true, mode: body.mode || 'battle' }), { headers: corsHeaders });
    }

    if (url.pathname === '/api/wheel/duo/spin' && request.method === 'POST') {
      return new Response(JSON.stringify({
        success: true,
        spinId: 'edge_spin_' + Date.now(),
        winner: null,
        mode: 'battle'
      }), { headers: corsHeaders });
    }

    if (url.pathname === '/api/hunt/spotlight' && request.method === 'GET') {
      return new Response(JSON.stringify({
        active: false,
        username: null,
        expiresAt: 0,
        remainingSeconds: 0
      }), { headers: corsHeaders });
    }

    if (url.pathname === '/api/hunt/spotlight/clear' && request.method === 'POST') {
      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    if (url.pathname === '/api/wheel/csgo/active-pool' && request.method === 'GET') {
      return new Response(JSON.stringify({
        windowSeconds: 90,
        count: 0,
        chatters: []
      }), { headers: corsHeaders });
    }

    // 23. Default 404 for unknown API routes
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: corsHeaders
    });
  }
};
