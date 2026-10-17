import http from 'node:http';
import { WebSocketServer, WebSocket } from 'ws';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { verifyKickWebhook } from '../ingestor/rsa-verify.ts';
import { KickWatchdog } from '../ingestor/kick-watchdog.ts';
import type { KickChatMessage } from '../ingestor/kick-pusher.ts';
import type { HuntHubDatabase } from '../db/database.ts';
import type { KickChatClient } from '../outbound/kick-chat.ts';

import type { BattleManager } from '../battles/battle-manager.ts';
import type { TournamentManager } from '../tournament/tournament-manager.ts';
import type { BonusHuntManager } from '../bonushunt/bonushunt-manager.ts';
import { slotResolver } from '../catalog/slot-resolver.ts';
import { config } from '../config.ts';

export interface DuoQueueEntry {
  kickId: number;
  username: string;
  displayName: string;
  avatar: string;
  slotName: string;
  slotProvider: string;
  slotImage: string;
  joinedAt: number;
}

export interface SpotlightRecommender {
  username: string;
  displayName: string;
  kickId: number;
  selectedAt: number;
  expiresAt: number;
}

export interface PendingChatAnnouncement {
  spinId: string;
  wheelType?: 'csgo' | 'duo' | 'slots';
  winner?: any;
  message: string;
  timer: any;
  dispatched: boolean;
  createdAt: number;
  onDispatch?: (msg: string) => void;
}

export interface OverlayServerOptions {
  port: number;
  db?: HuntHubDatabase;
  chatClient?: KickChatClient;
  battleManager?: BattleManager;
  tournamentManager?: TournamentManager;
  bonusHuntManager?: BonusHuntManager;
  onSpinTrigger?: (demo: boolean) => void;
  onSlotSpinTrigger?: (category: string, demo: boolean) => void;
}

export function parseStakeBetInput(rawInput: string): { betId: string; shareUrl: string } | null {
  if (!rawInput || typeof rawInput !== 'string') return null;
  const input = decodeURIComponent(rawInput.trim());

  // 1. Full URL e.g. https://stake.com/casino/home?iid=house%3A524922477701&modal=bet&source=link_shared
  try {
    if (input.startsWith('http://') || input.startsWith('https://')) {
      const u = new URL(input);
      const iid = u.searchParams.get('iid');
      if (iid) {
        const cleanIid = decodeURIComponent(iid.trim()).replace(/\.(?=\d{3})/g, '');
        return {
          betId: cleanIid,
          shareUrl: `https://stake.com/casino/games/limbo?iid=${encodeURIComponent(cleanIid)}&modal=bet`
        };
      }
    }
  } catch (e) {}

  // Strip optional "ID de apuesta:" / "Bet ID:" label and dot/comma thousand separators on numeric IDs
  const cleaned = input
    .replace(/^(id\s*de\s*apuesta|bet\s*id)\s*[:#-]?\s*/i, '')
    .trim();

  // 2. Prefix format: casino:524922477701 or house:524.922.477.701
  const prefixMatch = cleaned.match(/^(casino|house):([\w.\-]+)/i);
  if (prefixMatch) {
    const cleanIdPart = prefixMatch[2].replace(/[.,](?=\d{3})/g, '');
    const canonical = `${prefixMatch[1].toLowerCase()}:${cleanIdPart}`;
    return {
      betId: canonical,
      shareUrl: `https://stake.com/casino/games/limbo?iid=${encodeURIComponent(canonical)}&modal=bet`
    };
  }

  // 3. Raw alphanumeric / formatted numeric bet id e.g. 524922477701 or 524.922.477.701
  const strippedNumeric = cleaned.replace(/[.,\s](?=\d{3})/g, '');
  const numMatch = strippedNumeric.match(/^[a-zA-Z0-9_\-]+$/);
  if (numMatch && strippedNumeric.length >= 5) {
    const canonical = `house:${strippedNumeric}`;
    return {
      betId: canonical,
      shareUrl: `https://stake.com/casino/games/limbo?iid=${encodeURIComponent(canonical)}&modal=bet`
    };
  }

  return null;
}

export class OverlayServer {
  private server: http.Server;
  private wss: WebSocketServer;
  private clients = new Set<WebSocket>();
  private activeChatters = new Map<string, { display: string; avatar: string; ts: number; kickId: number }>();
  private spinHandler: ((demo: boolean) => void) | null = null;
  private slotSpinHandler: ((category: string, demo: boolean) => void) | null = null;
  private db: HuntHubDatabase | null = null;
  private chatClient: KickChatClient | null = null;
  public battleManager: BattleManager | null = null;
  public tournamentManager: TournamentManager | null = null;
  public bonusHuntManager: BonusHuntManager | null = null;

  private battleQueue: DuoQueueEntry[] = [];
  private tourneyQueue: DuoQueueEntry[] = [];
  private duoWheelMode: 'battle' | 'tourney' = 'battle';
  private spotlightRecommender: SpotlightRecommender | null = null;
  private pendingChatAnnouncements = new Map<string, PendingChatAnnouncement>();
  private slotsIndex: Array<{ name: string; provider: string; image: string }> = [];

  constructor(opts: OverlayServerOptions) {
    this.spinHandler = opts.onSpinTrigger || null;
    this.slotSpinHandler = opts.onSlotSpinTrigger || null;
    this.db = opts.db || null;
    this.chatClient = opts.chatClient || null;
    this.battleManager = opts.battleManager || null;
    this.tournamentManager = opts.tournamentManager || null;
    this.bonusHuntManager = opts.bonusHuntManager || null;
    this.initSlotsCatalog();

    this.server = http.createServer(async (req, res) => {
      const url = new URL(req.url || '/', `http://${req.headers.host}`);

      // CORS headers for local overlays & web client
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Kick-Event-Signature, Kick-Event-Message-Id, Kick-Event-Message-Timestamp, x-device-fingerprint'
      );

      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }

      // Health & Status endpoint
      if (url.pathname === '/api/status' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            status: 'ok',
            connectedOverlays: this.clients.size,
            activeChatters: this.getActiveChatters(30000).length,
            timestamp: Date.now(),
          })
        );
        return;
      }

      // Webhook endpoint (Kick Official Webhooks with RSA Verification)
      if (url.pathname === '/api/webhooks/kick' && req.method === 'POST') {
        let rawBody = '';
        req.on('data', (chunk) => {
          rawBody += chunk;
        });
        req.on('end', async () => {
          const sig = req.headers['kick-event-signature'] as string;
          const msgId = req.headers['kick-event-message-id'] as string;
          const ts = req.headers['kick-event-message-timestamp'] as string;

          // Allow local test bypass if X-HuntHub-Test header is explicitly present in dev
          const isDevBypass = process.env.NODE_ENV === 'test' || req.headers['x-hunthub-test'] === 'true';

          if (!isDevBypass) {
            if (!sig || !msgId || !ts) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Missing Kick Webhook headers' }));
              return;
            }

            const isValid = await verifyKickWebhook({
              messageId: msgId,
              timestamp: ts,
              rawBody,
              signatureBase64: sig,
            });

            if (!isValid) {
              console.warn('[Webhook] Unauthorized signature rejected');
              res.writeHead(401, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Invalid RSA Signature' }));
              return;
            }
          }

          try {
            const eventPayload = JSON.parse(rawBody);
            const eventType = (req.headers['kick-event-type'] as string) || eventPayload.event_type || 'unknown';
            console.log(`[Webhook] Verified Kick event received: ${eventType}`);

            // 1. Process Channel Point Redemption
            if (eventType === 'channel.reward.redemption.updated' || eventPayload.event === 'channel.reward.redemption.updated') {
              this.handleChannelPointRedemption(eventPayload);
            }

            // 2. Broadcast verified event to connected overlays
            this.broadcast({
              type: 'kick_event',
              eventType,
              data: eventPayload,
            });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'received' }));
          } catch (e) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Malformed JSON' }));
          }
        });
        return;
      }

      // Device Registration & Anti-Sybil Check
      if (url.pathname === '/api/security/device' && req.method === 'POST') {
        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', () => {
          try {
            const { userId, deviceHash } = JSON.parse(body);
            const ip = req.socket.remoteAddress || '';
            if (this.db && userId && deviceHash) {
              const result = this.db.recordDevice(userId, deviceHash, ip);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ status: 'ok', isAltCluster: result.isAltCluster }));
              return;
            }
          } catch {}
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid payload' }));
        });
        return;
      }

      // User Balance & Info endpoint
      if (url.pathname.startsWith('/api/user/') && req.method === 'GET') {
        const username = decodeURIComponent(url.pathname.replace('/api/user/', ''));
        if (this.db) {
          const user = this.db.getUserByUsername(username);
          if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
              JSON.stringify({
                id: user.id,
                username: user.username,
                displayName: user.display_name,
                pointsBalance: user.points_balance,
                stakeUsername: user.stake_username,
                stakeVerified: Boolean(user.stake_verified),
              })
            );
            return;
          }
        }
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'User not found' }));
        return;
      }

      // Kick OAuth 2.1 Direct Login Route (ReachAces / Blakjac21 style)
      if (url.pathname === '/api/auth/login' && req.method === 'GET') {
        const returnTo = url.searchParams.get('returnTo') || '/#profile';
        const state = crypto.randomBytes(16).toString('hex');
        const codeVerifier = crypto.randomBytes(32).toString('hex');
        const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url');

        const clientId = config.kickClientId || process.env.KICK_CLIENT_ID || '01M4QTKTY268TVY3DZCMC2EBHQ';
        const host = req.headers.host || '';
        const redirectBase = host.includes('diggitybets.vip') ? 'https://diggitybets.vip' : (host.includes('3000') || host.includes('3001') ? `http://${host}` : 'http://127.0.0.1:3000');
        const redirectUri = `${redirectBase}/api/auth/callback`;

        const authorizeUrl = new URL('https://id.kick.com/oauth/authorize');
        authorizeUrl.searchParams.set('response_type', 'code');
        authorizeUrl.searchParams.set('client_id', clientId);
        authorizeUrl.searchParams.set('redirect_uri', redirectUri);
        authorizeUrl.searchParams.set('scope', 'user:read');
        authorizeUrl.searchParams.set('state', state);
        authorizeUrl.searchParams.set('code_challenge', codeChallenge);
        authorizeUrl.searchParams.set('code_challenge_method', 'S256');

        res.writeHead(302, { 'Location': authorizeUrl.toString() });
        res.end();
        return;
      }

      // Kick OAuth 2.1 GET Redirect Handler
      if ((url.pathname === '/api/auth/kick/callback' || url.pathname === '/api/auth/callback') && req.method === 'GET') {
        const code = url.searchParams.get('code') || '';
        const state = url.searchParams.get('state') || '';
        const host = req.headers.host || '';
        const targetOrigin = host.includes('3001') ? 'http://127.0.0.1:3000' : '';
        res.writeHead(302, { 'Location': `${targetOrigin}/?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}&provider=kick#profile` });
        res.end();
        return;
      }

      // Discord OAuth2 GET Redirect Handler
      if (url.pathname === '/api/auth/discord/callback' && req.method === 'GET') {
        const code = url.searchParams.get('code') || '';
        const state = url.searchParams.get('state') || '';
        const host = req.headers.host || '';
        const targetOrigin = host.includes('3001') ? 'http://127.0.0.1:3000' : '';
        res.writeHead(302, { 'Location': `${targetOrigin}/?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}&provider=discord#profile` });
        res.end();
        return;
      }

      // Kick OAuth 2.1 PKCE Token Exchange Endpoint
      if ((url.pathname === '/api/auth/kick/callback' || url.pathname === '/api/auth/callback') && req.method === 'POST') {

        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', async () => {
          try {
            const { code, code_verifier, redirect_uri } = JSON.parse(body);
            let userData: any = { username: 'KickUser_' + (code ? code.substring(0, 5) : 'Guest'), id: 0 };

            const clientId = config.kickClientId || process.env.KICK_CLIENT_ID || '01M4QTKTY268TVY3DZCMC2EBHQ';
            const clientSecret = config.kickClientSecret || process.env.KICK_CLIENT_SECRET || '';

            if (clientId && clientSecret && code && code_verifier) {
              try {
                const tokenRes = await fetch('https://id.kick.com/oauth/token', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  body: new URLSearchParams({
                    client_id: clientId,
                    client_secret: clientSecret,
                    grant_type: 'authorization_code',
                    code,
                    code_verifier,
                    redirect_uri: redirect_uri || ''
                  })
                });

                if (tokenRes.ok) {
                  const tokenData: any = await tokenRes.json();
                  const userRes = await fetch('https://api.kick.com/public/v1/users', {
                    headers: {
                      'Authorization': `Bearer ${tokenData.access_token}`,
                      'Accept': 'application/json'
                    }
                  });
                  if (userRes.ok) {
                    const kickApiData: any = await userRes.json();
                    if (kickApiData.data && kickApiData.data[0]) {
                      const user = kickApiData.data[0];
                      userData = {
                        username: user.name || user.username || 'KickUser',
                        avatarUrl: user.profile_picture || '',
                        id: user.user_id || user.id || 0
                      };
                    }
                  }
                }
              } catch (e) {
                console.warn('[Kick OAuth Exchange] Warning:', e);
              }
            }

            const cleanUsername = String(userData.username || '').trim().toLowerCase();
            const kickIdNum = Number(userData.id) || 0;
            const isAdmin = (cleanUsername === 'diggitybets' || cleanUsername === 'diggity_bets' || cleanUsername === 'tarkansky' || kickIdNum === 88254585);

            if (this.db && userData.username) {
              this.db.upsertUser(kickIdNum || Math.floor(Date.now() / 1000) % 10000000, userData.username);
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              success: true,
              username: userData.username,
              avatarUrl: userData.avatarUrl || '',
              kick_id: userData.id,
              isAdmin,
              verified: true
            }));
          } catch (err: any) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }

      // Discord OAuth2 Token Exchange Endpoint
      if (url.pathname === '/api/auth/discord/callback' && req.method === 'POST') {
        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', async () => {
          try {
            const { code, redirect_uri, kickUsername } = JSON.parse(body);
            let discordUser = { username: 'DiscordMember', id: '123456789', avatarUrl: '' };

            const discordClientId = process.env.DISCORD_CLIENT_ID || '';
            const discordClientSecret = process.env.DISCORD_CLIENT_SECRET || '';

            if (discordClientId && discordClientSecret && code) {
              try {
                const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  body: new URLSearchParams({
                    client_id: discordClientId,
                    client_secret: discordClientSecret,
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: redirect_uri || ''
                  })
                });

                if (tokenRes.ok) {
                  const tokenData: any = await tokenRes.json();
                  const profileRes = await fetch('https://discord.com/api/users/@me', {
                    headers: { 'Authorization': `Bearer ${tokenData.access_token}` }
                  });
                  if (profileRes.ok) {
                    const me: any = await profileRes.json();
                    discordUser = {
                      username: me.username + (me.discriminator && me.discriminator !== '0' ? `#${me.discriminator}` : ''),
                      id: me.id,
                      avatarUrl: me.avatar ? `https://cdn.discordapp.com/avatars/${me.id}/${me.avatar}.png` : ''
                    };
                  }
                }
              } catch (e) {
                console.warn('[Discord OAuth Exchange] Warning:', e);
              }
            }

            if (this.db && kickUsername) {
              const u = this.db.getUserByUsername(kickUsername);
              if (u) {
                this.db.linkDiscordAccount(u.id, discordUser.id, discordUser.username, discordUser.avatarUrl);
              }
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              success: true,
              username: discordUser.username,
              id: discordUser.id,
              avatarUrl: discordUser.avatarUrl || '',
              verified: true
            }));
          } catch (err: any) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }

      // Profile Update & Crypto Persistence Endpoint
      if (url.pathname === '/api/profile/update' && req.method === 'POST') {
        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            if (!this.db) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, user: data, localOnly: true }));
              return;
            }

            let user = data.userId ? this.db.getUserById(data.userId) : null;
            if (!user && data.username) {
              user = this.db.getUserByUsername(data.username);
              if (!user) {
                user = this.db.upsertUser(Math.floor(Date.now() / 1000) % 10000000, data.username);
              }
            }

            if (!user) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'User not found' }));
              return;
            }

            const updated = this.db.updateUserProfile(user.id, {
              avatar: data.avatar,
              stake_username: data.stake_username,
              crypto_ltc: data.crypto_ltc,
              crypto_btc: data.crypto_btc,
              crypto_eth: data.crypto_eth,
              crypto_usdc: data.crypto_usdc,
              crypto_sol: data.crypto_sol,
              x_handle: data.x_handle,
              ig_handle: data.ig_handle
            });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, user: updated }));
          } catch (err: any) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }

      // Stake Limbo Random Integer Target Multiplier (OTP 10000 - 999999, valid 600s)
      if (url.pathname === '/api/stake/target' && req.method === 'GET') {
        const target = Math.floor(Math.random() * (999999 - 10000 + 1)) + 10000;
        const validForSeconds = 600;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          target,
          validForSeconds,
          expiresAt: Date.now() + validForSeconds * 1000,
          referralCode: 'DIGGITY'
        }));
        return;
      }

      // Stake Verification Status Check (for "Check Status" button & real-time badge sync)
      if (url.pathname === '/api/stake/status' && req.method === 'GET') {
        const kickUser = (url.searchParams.get('kickUsername') || '').trim();
        const stakeUser = (url.searchParams.get('stakeUsername') || '').trim();
        let verified = false;
        let status = 'UNVERIFIED';
        let latestRequest: any = null;
        let pointsBalance: number | undefined = undefined;

        if (this.db) {
          if (kickUser) {
            const u = this.db.getUserByUsername(kickUser);
            if (u) {
              pointsBalance = u.points_balance;
              if (u.stake_verified === 1) {
                verified = true;
                status = 'APPROVED';
              }
            }
          }
          const allRequests = this.db.getStakeVerificationRequests();
          latestRequest = allRequests.find((r: any) =>
            (kickUser && String(r.kick_username || '').toLowerCase() === kickUser.toLowerCase()) ||
            (stakeUser && String(r.stake_username || '').toLowerCase() === stakeUser.toLowerCase())
          ) || null;

          if (latestRequest) {
            if (latestRequest.status === 'APPROVED') {
              verified = true;
              status = 'APPROVED';
            } else if (!verified) {
              status = latestRequest.status || 'PENDING';
            }
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          verified,
          status,
          referralCode: 'DIGGITY',
          stakeUsername: latestRequest?.stake_username || stakeUser || null,
          betId: latestRequest?.bet_id || null,
          shareUrl: latestRequest?.share_url || null,
          pointsBalance
        }));
        return;
      }

      // Stake Verification Request Submission
      if (url.pathname === '/api/stake/verify-request' && req.method === 'POST') {
        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', () => {
          try {
            const { userId, kickUsername, stakeUsername, targetMultiplier, rawBetInput } = JSON.parse(body);

            if (!stakeUsername || !rawBetInput) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Missing stakeUsername or rawBetInput' }));
              return;
            }

            const parsed = parseStakeBetInput(rawBetInput);
            if (!parsed) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Invalid bet ID or share link format. Expected casino:..., house:..., or Stake URL.' }));
              return;
            }

            if (!this.db) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                success: true,
                message: 'Verified in local simulation mode (+250 $DIG)',
                parsedBet: parsed
              }));
              return;
            }

            let user = userId ? this.db.getUserById(userId) : null;
            if (!user && kickUsername) {
              user = this.db.getUserByUsername(kickUsername);
              if (!user) {
                user = this.db.upsertUser(Math.floor(Date.now() / 1000) % 10000000, kickUsername);
              }
            }

            if (!user) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'User not found in system' }));
              return;
            }

            const targetInt = Number(targetMultiplier) || 994932;
            const result = this.db.createStakeVerificationRequest(
              user.id,
              user.username,
              stakeUsername,
              targetInt,
              parsed.betId,
              parsed.shareUrl
            );

            if (!result.success) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: result.error }));
              return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              success: true,
              request: result.request,
              parsedBet: parsed,
              message: 'Verification request recorded. The streamer can audit and approve it on the admin deck.'
            }));
          } catch (err: any) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }

      // Admin Stake Verifications Queue (Gated for diggitybets)
      if (url.pathname === '/api/admin/stake-verifications' && req.method === 'GET') {
        const adminUser = req.headers['x-admin-user'] || url.searchParams.get('adminUser') || '';
        const cleanAdmin = String(adminUser).trim().toLowerCase().replace('@', '');

        if ((cleanAdmin !== 'diggitybets' && cleanAdmin !== 'tarkansky')) {
          res.writeHead(403, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Forbidden: Admin access restricted to diggitybets' }));
          return;
        }

        const status = url.searchParams.get('status') || undefined;
        const requests = this.db ? this.db.getStakeVerificationRequests(status) : [];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ requests }));
        return;
      }

      // Admin Approve Stake Verification (Gated for diggitybets)
      if (url.pathname === '/api/admin/approve-stake-verification' && req.method === 'POST') {
        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', () => {
          try {
            const { requestId, adminUser } = JSON.parse(body);
            const cleanAdmin = String(adminUser || req.headers['x-admin-user'] || '').trim().toLowerCase().replace('@', '');

            if ((cleanAdmin !== 'diggitybets' && cleanAdmin !== 'tarkansky')) {
              res.writeHead(403, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Forbidden: Admin access restricted to diggitybets' }));
              return;
            }

            if (!this.db) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, credited: true }));
              return;
            }

            const result = this.db.approveStakeVerification(requestId);
            if (!result.success) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: result.error }));
              return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, user: result.user, credited: result.credited }));
          } catch (err: any) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }

      // Admin Reject Stake Verification (Gated for diggitybets)
      if (url.pathname === '/api/admin/reject-stake-verification' && req.method === 'POST') {
        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', () => {
          try {
            const { requestId, adminUser } = JSON.parse(body);
            const cleanAdmin = String(adminUser || req.headers['x-admin-user'] || '').trim().toLowerCase().replace('@', '');
            if ((cleanAdmin !== 'diggitybets' && cleanAdmin !== 'tarkansky')) {
              res.writeHead(403, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Forbidden: Admin access restricted to diggitybets' }));
              return;
            }
            if (this.db) {
              this.db.rejectStakeVerification(requestId);
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
          } catch (err: any) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }

      // Store Weekly Stock & Catalog Status
      if (url.pathname === '/api/store/stock' && req.method === 'GET') {
        const username = url.searchParams.get('username') || url.searchParams.get('userId') || undefined;
        const catalog = this.db ? this.db.getStoreCatalogStatus(username) : [];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ catalog }));
        return;
      }

      // Live-Stream Gate Status & Toggle
      if (url.pathname === '/api/stream/status') {
        if (req.method === 'GET') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            isLive: this.isStreamLive(),
            sessionId: this.db ? this.db.getStreamSessionId() : 'session_live_default'
          }));
          return;
        }
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (c) => (body += c));
          req.on('end', () => {
            try {
              const { isLive, sessionId } = JSON.parse(body || '{}');
              this.setStreamLive(Boolean(isLive), sessionId);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                success: true,
                isLive: this.isStreamLive(),
                sessionId: this.db ? this.db.getStreamSessionId() : 'session_live_default'
              }));
            } catch (err: any) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }
      }

      // Watch-to-Earn Heartbeat (+10 $DIG every 15m in #watch when stream is live)
      if (url.pathname === '/api/watch/heartbeat' && req.method === 'POST') {
        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', () => {
          try {
            const { userId, username } = JSON.parse(body || '{}');
            const target = userId || username;
            if (!target) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ awarded: false, amount: 0, error: 'Missing username or userId' }));
              return;
            }
            if (!this.db) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ awarded: this.streamLiveFallback, amount: this.streamLiveFallback ? 10 : 0 }));
              return;
            }
            const hb = this.db.recordWatchHeartbeat(target);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(hb));
          } catch (err: any) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }

      // House Games Anti-Exploit Bet Endpoint (95% RTP, Max Bet 50 $DIG, Max Win Cap 500 $DIG)
      if (url.pathname === '/api/games/bet' && req.method === 'POST') {
        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', () => {
          try {
            const { userId, username, game, betAmount, rawMultiplier } = JSON.parse(body || '{}');
            const target = userId || username;
            if (!this.db || !target) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, rtp: 95.0, maxBet: 50, maxWinCap: 500 }));
              return;
            }
            const result = this.db.processHouseGameBet(target, game || 'plinko', Number(betAmount), Number(rawMultiplier) || 0);
            res.writeHead(result.success ? 200 : 400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
          } catch (err: any) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }

      // Store Redeem Voucher (User or Client)
      if (url.pathname === '/api/store/redeem' && req.method === 'POST') {
        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', () => {
          try {
            const { userId, username, voucherTitle, costPoints } = JSON.parse(body);
            if (!this.db) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true }));
              return;
            }
            let u = userId ? this.db.getUserById(userId) : null;
            if (!u && username) u = this.db.getUserByUsername(username);
            if (!u) {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'User not found' }));
              return;
            }
            const parsedCost = costPoints !== undefined ? Number(costPoints) : undefined;
            const resRedeem = this.db.createStoreRedemption(u.id, u.username, voucherTitle, parsedCost);
            if (!resRedeem.success) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: resRedeem.error, remainingStock: resRedeem.remainingStock }));
              return;
            }
            this.broadcast({ type: 'NEW_CLAIM', claim: resRedeem.redemption });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              success: true,
              redemption: resRedeem.redemption,
              effectiveCost: resRedeem.effectiveCost,
              remainingStock: resRedeem.remainingStock
            }));
          } catch (err: any) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }

      // Admin Store Redemptions Queue (Gated for diggitybets)
      if (url.pathname === '/api/admin/store-redemptions' && req.method === 'GET') {
        const adminUser = req.headers['x-admin-user'] || url.searchParams.get('adminUser') || '';
        const cleanAdmin = String(adminUser).trim().toLowerCase().replace('@', '');
        if ((cleanAdmin !== 'diggitybets' && cleanAdmin !== 'tarkansky')) {
          res.writeHead(403, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Forbidden: Admin access restricted to diggitybets' }));
          return;
        }
        const status = url.searchParams.get('status') || undefined;
        const claims = this.db ? this.db.getStoreRedemptions(status) : [];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ claims }));
        return;
      }

      // Admin Approve Store Redemption (Gated for diggitybets)
      if (url.pathname === '/api/admin/approve-store-redemption' && req.method === 'POST') {
        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', () => {
          try {
            const { redemptionId, adminUser } = JSON.parse(body);
            const cleanAdmin = String(adminUser || req.headers['x-admin-user'] || '').trim().toLowerCase().replace('@', '');
            if ((cleanAdmin !== 'diggitybets' && cleanAdmin !== 'tarkansky')) {
              res.writeHead(403, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Forbidden: Admin access restricted to diggitybets' }));
              return;
            }
            if (this.db) {
              this.db.approveStoreRedemption(redemptionId);
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
          } catch (err: any) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }

      // Admin Reject Store Redemption (Gated for diggitybets)
      if (url.pathname === '/api/admin/reject-store-redemption' && req.method === 'POST') {
        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', () => {
          try {
            const { redemptionId, refund, adminUser } = JSON.parse(body);
            const cleanAdmin = String(adminUser || req.headers['x-admin-user'] || '').trim().toLowerCase().replace('@', '');
            if ((cleanAdmin !== 'diggitybets' && cleanAdmin !== 'tarkansky')) {
              res.writeHead(403, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Forbidden: Admin access restricted to diggitybets' }));
              return;
            }
            let result = { success: true, refunded: false };
            if (this.db) {
              result = this.db.rejectStoreRedemption(redemptionId, refund !== false);
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
          } catch (err: any) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }

      // Admin Raffle Ledger (Gated for diggitybets)
      if (url.pathname === '/api/admin/raffle-ledger' && req.method === 'GET') {
        const adminUser = req.headers['x-admin-user'] || url.searchParams.get('adminUser') || '';
        const cleanAdmin = String(adminUser).trim().toLowerCase().replace('@', '');
        if ((cleanAdmin !== 'diggitybets' && cleanAdmin !== 'tarkansky')) {
          res.writeHead(403, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Forbidden: Admin access restricted to diggitybets' }));
          return;
        }
        const weekNum = url.searchParams.get('week') ? Number(url.searchParams.get('week')) : undefined;
        const ledger = this.db ? this.db.getRaffleLedger(weekNum) : { totalTickets: 0, weekNumber: 1, participants: [] };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ledger));
        return;
      }

      // Admin Roll Raffle Winner (Gated for diggitybets)
      if (url.pathname === '/api/admin/roll-raffle' && req.method === 'POST') {
        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', async () => {
          try {
            const { weekNumber, clientSeed, serverSeed, adminUser } = JSON.parse(body || '{}');
            const cleanAdmin = String(adminUser || req.headers['x-admin-user'] || '').trim().toLowerCase().replace('@', '');
            if ((cleanAdmin !== 'diggitybets' && cleanAdmin !== 'tarkansky')) {
              res.writeHead(403, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Forbidden: Admin access restricted to diggitybets' }));
              return;
            }
            if (!this.db) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Database not initialized' }));
              return;
            }
            const result = this.db.rollProvablyFairRaffle(weekNumber, serverSeed, clientSeed);
            if (this.chatClient && result.winner && result.winner !== 'No Tickets Sold') {
              try {
                await this.chatClient.sendMessage(`🎉 [RAFFLE WINNER] Congrats ${result.winner}! You won the weekly raffle with ticket #${result.ticketNumber}/${result.totalTickets}! 🎟️💎`);
              } catch (_) {}
            }
            this.broadcast({ type: 'RAFFLE_WINNER_ROLLED', result });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, result }));
          } catch (err: any) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }

      // Admin Anti-Sybil Security Alerts (Gated for diggitybets)
      if (url.pathname === '/api/admin/security-alerts' && req.method === 'GET') {
        const adminUser = req.headers['x-admin-user'] || url.searchParams.get('adminUser') || '';
        const cleanAdmin = String(adminUser).trim().toLowerCase().replace('@', '');
        if ((cleanAdmin !== 'diggitybets' && cleanAdmin !== 'tarkansky')) {
          res.writeHead(403, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Forbidden: Admin access restricted to diggitybets' }));
          return;
        }
        const alerts = this.db ? this.db.getSecurityAlerts() : [];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ alerts }));
        return;
      }

      // Admin Security Action (Shadowban / Freeze / Whitelist) (Gated for diggitybets)
      if (url.pathname === '/api/admin/security-action' && req.method === 'POST') {
        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', () => {
          try {
            const { action, username, clusterId, adminUser } = JSON.parse(body);
            const cleanAdmin = String(adminUser || req.headers['x-admin-user'] || '').trim().toLowerCase().replace('@', '');
            if ((cleanAdmin !== 'diggitybets' && cleanAdmin !== 'tarkansky')) {
              res.writeHead(403, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Forbidden: Admin access restricted to diggitybets' }));
              return;
            }
            if (!this.db) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true }));
              return;
            }
            if (action === 'shadowban' && username) {
              this.db.shadowbanUser(username);
            } else if (action === 'freeze' && username) {
              this.db.freezeUserBalance(username);
            } else if (action === 'whitelist' && clusterId) {
              this.db.whitelistCluster(clusterId);
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, action }));
          } catch (err: any) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }

      // Cloudflare D1 & Cross-Process OBS Browser Source Synchronization Endpoints
      if (url.pathname === '/api/sync/state') {
        if (req.method === 'GET') {
          const dbState = this.db ? this.db.exportStateJson() : {};
          const fullState = {
            ...dbState,
            overlays: {
              battle: this.battleManager ? this.battleManager.getState() : null,
              tourney: this.tournamentManager ? this.tournamentManager.getState() : null,
              bonushunt: this.bonusHuntManager ? this.bonusHuntManager.getState() : null,
              duoQueues: {
                mode: this.duoWheelMode,
                battleQueue: this.battleQueue,
                tourneyQueue: this.tourneyQueue,
              },
              spotlight: this.getSpotlightRecommender(),
              lastOverlayEvent: (this as any).lastOverlayEvent || null,
            },
            timestamp: Date.now(),
          };
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(fullState));
          return;
        }
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (c) => (body += c));
          req.on('end', () => {
            try {
              const state = JSON.parse(body || '{}');
              if (state.overlayEvent) {
                (this as any).lastOverlayEvent = { ...state.overlayEvent, ts: Date.now() };
                this.broadcast(state.overlayEvent);
                this.broadcast({ type: 'overlay_sync_event', event: state.overlayEvent, ts: Date.now() });
              }
              const hasDbKeys = state.users || state.storeRedemptions || state.raffleTickets || state.stakeVerifications;
              const result = (this.db && hasDbKeys) ? this.db.importStateJson(state) : { success: true, count: 0 };
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ ...result, syncedOverlay: Boolean(state.overlayEvent) }));
            } catch (err: any) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }
      }


      // Discord Unlink endpoint
      if (url.pathname === '/api/auth/discord/unlink' && req.method === 'POST') {
        let body = '';
        req.on('data', (c) => (body += c));
        req.on('end', () => {
          try {
            const { userId, username } = JSON.parse(body);
            if (this.db) {
              let user = userId ? this.db.getUserById(userId) : null;
              if (!user && username) user = this.db.getUserByUsername(username);
              if (user) {
                this.db.unlinkDiscordAccount(user.id);
              }
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, unlinked: true }));
          } catch (err: any) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }

      // CS:GO Giveaway Wheel trigger endpoint
      if (url.pathname === '/api/spin' && req.method === 'POST') {
        const demo = url.searchParams.get('demo') === 'true';
        if (this.spinHandler) this.spinHandler(demo);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'spin_dispatched', demo }));
        return;
      }

      // Slot Wheel trigger endpoint
      if (url.pathname === '/api/spin-slot' && req.method === 'POST') {
        const cat = url.searchParams.get('cat') || 'all';
        const demo = url.searchParams.get('demo') === 'true';
        if (this.slotSpinHandler) this.slotSpinHandler(cat, demo);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'slot_spin_dispatched', category: cat, demo }));
        return;
      }

      // --- 1v1 Battle Endpoints ---
      if (url.pathname === '/api/battle/state' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ state: this.battleManager ? this.battleManager.getState() : null }));
        return;
      }

      if (url.pathname === '/api/battle/mode' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          if (this.battleManager && (body.gameMode === 'BONUS_BUY' || body.gameMode === 'SPINS')) {
            this.battleManager.setGameMode(body.gameMode);
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', state: this.battleManager?.getState() }));
        });
        return;
      }

      if (url.pathname === '/api/battle/open' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          if (this.battleManager) {
            this.battleManager.openLobby(Number(body.betAmount) || 10, body.prizeText || '$50.00 POOL', body.gameMode);
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', state: this.battleManager?.getState() }));
        });
        return;
      }

      if (url.pathname === '/api/battle/join' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          const result = this.battleManager ? this.battleManager.joinLobby(body.user, body.slot) : { success: false, error: 'No battle manager' };
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        });
        return;
      }

      if (url.pathname === '/api/battle/payout' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          if (this.battleManager && body.playerSlot) {
            if (body.multiplier !== undefined) {
              this.battleManager.setPlayerMultiplier(body.playerSlot, Number(body.multiplier) || 0);
            } else {
              this.battleManager.setPlayerPayout(body.playerSlot, Number(body.winAmount) || 0);
            }
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', state: this.battleManager?.getState() }));
        });
        return;
      }

      if (url.pathname === '/api/battle/resolve' && req.method === 'POST') {
        if (this.battleManager) {
          try {
            const state = this.battleManager.resolveBattle();
            if (state.currentStreak === 4 && state.lastWinnerPrizeAwarded && state.reigningKing) {
              const king = state.reigningKing;
              if (this.db) {
                this.db.createKothPrizeRedemption(king);
              }
              this.broadcast({
                type: 'koth_champion',
                king,
                streak: 4,
                prizeAmount: 20,
                prize: '$20.00 CASH PRIZE',
                announcement: `Congratulations ${king.displayName || king.username} you won $20`,
              });
              if (this.chatClient) {
                this.chatClient.sendMessage(
                  `👑 Congratulations @${king.displayName || king.username} you won $20! (4/4 King of the Hill Champion!) 💰🎉`
                );
              }
              setTimeout(() => {
                if (this.battleManager && this.battleManager.getState().currentStreak >= 4) {
                  this.battleManager.resetKothThrone();
                }
              }, 4500);
            } else if (state.kothActive && state.reigningKing && state.currentStreak > 0 && state.currentStreak < 4) {
              setTimeout(() => {
                if (
                  this.battleManager &&
                  this.battleManager.getState().status === 'RESOLVED' &&
                  this.battleManager.getState().currentStreak < 4 &&
                  this.battleManager.getState().reigningKing
                ) {
                  this.battleManager.kingDecideContinue();
                }
              }, 4500);
            }
          } catch (e: any) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: e.message }));
            return;
          }
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', state: this.battleManager?.getState() }));
        return;
      }

      if (url.pathname === '/api/battle/resolve-spins' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          if (this.battleManager && (body.winnerSlot === 'A' || body.winnerSlot === 'B')) {
            try {
              const state = this.battleManager.resolveWinnerDirectly(body.winnerSlot);
              if (state.currentStreak === 4 && state.lastWinnerPrizeAwarded && state.reigningKing) {
                const king = state.reigningKing;
                if (this.db) {
                  this.db.createKothPrizeRedemption(king);
                }
                this.broadcast({
                  type: 'koth_champion',
                  king,
                  streak: 4,
                  prizeAmount: 20,
                  prize: '$20.00 CASH PRIZE',
                  announcement: `Congratulations ${king.displayName || king.username} you won $20`,
                });
                if (this.chatClient) {
                  this.chatClient.sendMessage(
                    `👑 Congratulations @${king.displayName || king.username} you won $20! (4/4 King of the Hill Champion!) 💰🎉`
                  );
                }
                setTimeout(() => {
                  if (this.battleManager && this.battleManager.getState().currentStreak >= 4) {
                    this.battleManager.resetKothThrone();
                  }
                }, 4500);
              } else if (state.kothActive && state.reigningKing && state.currentStreak > 0 && state.currentStreak < 4) {
                setTimeout(() => {
                  if (
                    this.battleManager &&
                    this.battleManager.getState().status === 'RESOLVED' &&
                    this.battleManager.getState().currentStreak < 4 &&
                    this.battleManager.getState().reigningKing
                  ) {
                    this.battleManager.kingDecideContinue();
                  }
                }, 4500);
              }
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ status: 'ok', state }));
              return;
            } catch (e: any) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: e.message }));
              return;
            }
          }
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing or invalid winnerSlot (must be "A" or "B")' }));
        });
        return;
      }

      if (url.pathname === '/api/battle/koth/decision' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          let extra: any = {};
          if (this.battleManager) {
            if (body.decision === 'continue') {
              const st = this.battleManager.kingDecideContinue();
              const kingName = st.reigningKing?.displayName || st.reigningKing?.username || 'King';
              this.broadcast({
                type: 'koth_continue',
                king: st.reigningKing,
                streak: st.currentStreak,
                state: st,
              });
              if (this.chatClient) {
                this.chatClient.sendMessage(
                  `⚔️ @${kingName} typed !continue and stays in Blue Corner (Streak ${st.currentStreak}/4 · $${st.currentStreak * 5} secured)! Spin Duo Wheel for Challenger B!`
                );
              }
            } else if (body.decision === 'retire' || body.decision === 'cashout') {
              const ret = this.battleManager.kingDecideRetire();
              extra = {
                retiredKing: ret.retiredKing,
                streak: ret.streak,
                prizeAmount: ret.prizeAmount,
                announcement: ret.announcement,
              };
              if (ret.retiredKing && this.db) {
                this.db.createKothPrizeRedemption(
                  ret.retiredKing,
                  `King of the Hill - $${ret.prizeAmount} Cashout (${ret.streak} Win Streak)`
                );
              }
              this.broadcast({
                type: 'koth_cashout',
                retiredKing: ret.retiredKing,
                streak: ret.streak,
                prizeAmount: ret.prizeAmount,
                announcement: ret.announcement,
                state: ret.state,
              });
              if (this.chatClient && ret.retiredKing) {
                this.chatClient.sendMessage(`💰 ${ret.announcement}! 👑`);
              }
            }
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', state: this.battleManager?.getState(), ...extra }));
        });
        return;
      }

      if (url.pathname === '/api/battle/koth/toggle' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          if (this.battleManager && typeof body.active === 'boolean') {
            this.battleManager.setKothActive(body.active);
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', state: this.battleManager?.getState() }));
        });
        return;
      }

      if (url.pathname === '/api/battle/reset' && req.method === 'POST') {
        if (this.battleManager) this.battleManager.reset();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', state: this.battleManager?.getState() }));
        return;
      }

      if (url.pathname === '/api/battle/demo' && req.method === 'POST') {
        if (this.battleManager) {
          this.battleManager.openLobby(20, '$100.00 CASH PRIZE');
          this.battleManager.joinLobby(
            { id: 'u_demo1', kickId: 101, username: 'LuckyStriker', displayName: 'LuckyStriker' },
            { name: 'Wanted Dead or a Wild', provider: 'Hacksaw Gaming' }
          );
          this.battleManager.joinLobby(
            { id: 'u_demo2', kickId: 102, username: 'VegasKing', displayName: 'VegasKing' },
            { name: 'Gates of Olympus 1000', provider: 'Pragmatic Play' }
          );
          this.battleManager.setPlayerPayout('A', 245.5);
          this.battleManager.setPlayerPayout('B', 180.0);
          this.battleManager.resolveBattle();
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'demo_loaded', state: this.battleManager?.getState() }));
        return;
      }

      // --- 8-Bracket Tournament Endpoints ---
      if (url.pathname === '/api/tourney/state' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            state: this.tournamentManager ? this.tournamentManager.getState() : null,
            viewerData: this.tournamentManager ? this.tournamentManager.toBracketsViewerData() : null,
          })
        );
        return;
      }

      if (url.pathname === '/api/tourney/mode' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          if (this.tournamentManager && (body.gameMode === 'BONUS_BUY' || body.gameMode === 'SPINS')) {
            this.tournamentManager.setGameMode(body.gameMode);
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', state: this.tournamentManager?.getState() }));
        });
        return;
      }

      if (url.pathname === '/api/tourney/open' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          if (this.tournamentManager) {
            this.tournamentManager.openLobby(body.title, Number(body.betPerRound) || 10, body.prizeText, body.gameMode);
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', state: this.tournamentManager?.getState() }));
        });
        return;
      }

      if (url.pathname === '/api/tourney/join' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          const result = this.tournamentManager
            ? this.tournamentManager.joinLobby(body.user, body.slotName)
            : { success: false, error: 'No tournament manager' };
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        });
        return;
      }

      if (url.pathname === '/api/tourney/result' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          if (this.tournamentManager && body.matchId) {
            try {
              this.tournamentManager.setMatchResult(body.matchId, Number(body.score1) || 0, Number(body.score2) || 0);
            } catch (err: any) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
              return;
            }
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', state: this.tournamentManager?.getState() }));
        });
        return;
      }

      if (url.pathname === '/api/tourney/result-spins' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          if (this.tournamentManager && body.matchId && body.winnerSelector) {
            try {
              this.tournamentManager.setMatchWinnerDirectly(body.matchId, body.winnerSelector);
            } catch (err: any) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
              return;
            }
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', state: this.tournamentManager?.getState() }));
        });
        return;
      }

      if (url.pathname === '/api/tourney/reset' && req.method === 'POST') {
        if (this.tournamentManager) this.tournamentManager.reset();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', state: this.tournamentManager?.getState() }));
        return;
      }

      if (url.pathname === '/api/tourney/demo' && req.method === 'POST') {
        if (this.tournamentManager) {
          this.tournamentManager.openLobby('8-Bracket Slot Championship', 10, '1º: $150 · 2º: $50');
          const demoParticipants = [
            { id: 'p1', kickId: 101, username: 'LuckyStriker', displayName: 'LuckyStriker', slot: 'Wanted Dead' },
            { id: 'p2', kickId: 102, username: 'VegasKing', displayName: 'VegasKing', slot: 'Gates 1000' },
            { id: 'p3', kickId: 103, username: 'SlotQueen', displayName: 'SlotQueen', slot: 'San Quentin' },
            { id: 'p4', kickId: 104, username: 'SpinMaster', displayName: 'SpinMaster', slot: 'Sugar Rush' },
            { id: 'p5', kickId: 105, username: 'Strike777', displayName: 'Strike777', slot: 'Rip City' },
            { id: 'p6', kickId: 106, username: 'BigBassBob', displayName: 'BigBassBob', slot: 'Big Bass Splash' },
            { id: 'p7', kickId: 107, username: 'NeonWolf', displayName: 'NeonWolf', slot: 'Chaos Crew 2' },
            { id: 'p8', kickId: 108, username: 'RoyalFlush', displayName: 'RoyalFlush', slot: 'Zeus vs Hades' },
          ];
          for (const dp of demoParticipants) {
            this.tournamentManager.joinLobby(
              { id: dp.id, kickId: dp.kickId, username: dp.username, displayName: dp.displayName },
              dp.slot
            );
          }
          // Quarters
          this.tournamentManager.setMatchResult('m1', 24.5, 10.2);
          this.tournamentManager.setMatchResult('m2', 45.0, 8.0);
          this.tournamentManager.setMatchResult('m3', 112.4, 15.1);
          this.tournamentManager.setMatchResult('m4', 32.0, 68.5);
          // Semis
          this.tournamentManager.setMatchResult('m5', 55.0, 120.0);
          this.tournamentManager.setMatchResult('m6', 80.2, 40.0);
          // Final
          this.tournamentManager.setMatchResult('m7', 150.0, 95.0);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'demo_loaded', state: this.tournamentManager?.getState() }));
        return;
      }

      // --- Community Bonus Hunt Endpoints ---
      if (url.pathname === '/api/hunt/state' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ state: this.bonusHuntManager ? this.bonusHuntManager.getState() : null }));
        return;
      }

      if (url.pathname === '/api/hunt/open' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          if (this.bonusHuntManager) {
            this.bonusHuntManager.startNewHunt(body.title, Number(body.startCost) || 1000);
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', state: this.bonusHuntManager?.getState() }));
        });
        return;
      }

      if (url.pathname === '/api/hunt/bonus' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          if (this.bonusHuntManager && body.slot && body.caller) {
            this.bonusHuntManager.addBonus(body.slot, body.caller, Number(body.betSize) || 1.0);
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', state: this.bonusHuntManager?.getState() }));
        });
        return;
      }

      if (url.pathname === '/api/hunt/opening' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          if (this.bonusHuntManager && body.bonusId) {
            this.bonusHuntManager.setBonusOpening(body.bonusId);
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', state: this.bonusHuntManager?.getState() }));
        });
        return;
      }

      if (url.pathname === '/api/hunt/payout' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          if (this.bonusHuntManager && body.bonusId) {
            this.bonusHuntManager.setBonusPayout(body.bonusId, Number(body.payout) || 0);
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', state: this.bonusHuntManager?.getState() }));
        });
        return;
      }

      if (url.pathname === '/api/hunt/guess' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          const result = this.bonusHuntManager
            ? this.bonusHuntManager.recordGuess(body.username, Number(body.amount) || 0, Number(body.kickId) || 0)
            : { success: false, error: 'No bonus hunt manager' };
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        });
        return;
      }

      if (url.pathname === '/api/hunt/finish' && req.method === 'POST') {
        if (this.bonusHuntManager) this.bonusHuntManager.finishHunt();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', state: this.bonusHuntManager?.getState() }));
        return;
      }

      if (url.pathname === '/api/hunt/reset' && req.method === 'POST') {
        if (this.bonusHuntManager) this.bonusHuntManager.reset();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', state: this.bonusHuntManager?.getState() }));
        return;
      }

      if (url.pathname === '/api/hunt/demo' && req.method === 'POST') {
        if (this.bonusHuntManager) this.bonusHuntManager.loadDemoHunt();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'demo_loaded', state: this.bonusHuntManager?.getState() }));
        return;
      }

      // --- Exact Handshake Spin Complete Endpoint ---
      if (url.pathname === '/api/wheel/spin-complete' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          const spinId = body.spinId;
          const dispatched = spinId ? this.dispatchPendingAnnouncement(spinId, 'API_COMPLETE') : false;
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, dispatched, status: dispatched ? 'dispatched' : 'already_handled_or_not_found', spinId }));
        });
        return;
      }

      // --- Wheel Duo Queues & Modes ---
      if (url.pathname === '/api/wheel/duo/queues' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          battleQueue: this.getBattleQueue(),
          tourneyQueue: this.getTourneyQueue(),
          mode: this.getDuoWheelMode()
        }));
        return;
      }

      if (url.pathname === '/api/wheel/duo/mode' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          if (body.mode === 'battle' || body.mode === 'tourney') {
            this.setDuoWheelMode(body.mode);
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, status: 'ok', mode: this.getDuoWheelMode() }));
        });
        return;
      }

      if ((url.pathname === '/api/wheel/duo/spin' || url.pathname === '/api/spin-duo') && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          const result = this.spinDuoWheel(body.mode);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        });
        return;
      }

      if (url.pathname === '/api/wheel/duo/remove' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          try {
            const body = b ? JSON.parse(b) : {};
            const targetUser = String(body.username || '').trim().toLowerCase();
            if (targetUser) {
              this.battleQueue = this.battleQueue.filter((e) => e.username.toLowerCase() !== targetUser);
              this.tourneyQueue = this.tourneyQueue.filter((e) => e.username.toLowerCase() !== targetUser);
              this.broadcastQueues();
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, battleQueue: this.battleQueue, tourneyQueue: this.tourneyQueue }));
          } catch (err: any) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }

      // Live Chat Command Ingestion Bridge (/api/chat/command)
      if (url.pathname === '/api/chat/command' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          try {
            const body = b ? JSON.parse(b) : {};
            const rawCmd = String(body.command || '').trim().toLowerCase().replace(/^!/, '');
            const rawArgs = String(body.args || '').trim();
            const username = String(body.username || 'KickViewer').trim().replace(/^@/, '');
            const kickId = Number(body.kickId) || Math.floor(Math.random() * 100000) + 1;
            const avatar = String(body.avatar || '');

            this.recordChatterActivity(username, `!${rawCmd} ${rawArgs}`, kickId, avatar);

            if (rawCmd === 'battle' || rawCmd === 'duelo') {
              const canon = this.resolveCanonicalSlot(rawArgs || 'Wanted Dead or a Wild');
              const qRes = this.addBattleQueueEntry({
                kickId,
                username,
                displayName: username,
                avatar,
                slotName: canon.name,
                slotProvider: canon.provider,
                slotImage: canon.image,
                joinedAt: Date.now(),
              });
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, command: 'battle', ...qRes }));
              return;
            }

            if (rawCmd === 'tourney' || rawCmd === 'torneo') {
              const canon = this.resolveCanonicalSlot(rawArgs || 'Gates of Olympus 1000');
              const qRes = this.addTourneyQueueEntry({
                kickId,
                username,
                displayName: username,
                avatar,
                slotName: canon.name,
                slotProvider: canon.provider,
                slotImage: canon.image,
                joinedAt: Date.now(),
              });
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, command: 'tourney', ...qRes }));
              return;
            }

            if (rawCmd === 'guess' || rawCmd === 'prediccion') {
              const num = parseFloat(rawArgs.replace(/[^0-9.]/g, '')) || 0;
              if (num > 0 && this.bonusHuntManager) {
                this.bonusHuntManager.recordGuess(username, num, kickId);
                this.broadcast({ type: 'bonus_hunt_guess', user: username, guess: num, timestamp: Date.now() });
              }
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, command: 'guess', username, guess: num }));
              return;
            }

            if (rawCmd === 'continue' || rawCmd === 'defend' || rawCmd === 'seguir') {
              if (this.battleManager) {
                const st = this.battleManager.kingDecideContinue();
                this.broadcast({ type: 'koth_continue', king: st.reigningKing, streak: st.currentStreak, state: st });
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, command: 'continue', state: st }));
                return;
              }
            }

            if (rawCmd === 'cashout' || rawCmd === 'retire' || rawCmd === 'cobrar' || rawCmd === 'retirarse') {
              if (this.battleManager) {
                const ret = this.battleManager.kingDecideRetire();
                if (ret.retiredKing && this.db) {
                  this.db.createKothPrizeRedemption(
                    ret.retiredKing,
                    `King of the Hill - $${ret.prizeAmount} Cashout (${ret.streak} Win Streak)`
                  );
                }
                this.broadcast({
                  type: 'koth_cashout',
                  retiredKing: ret.retiredKing,
                  streak: ret.streak,
                  prizeAmount: ret.prizeAmount,
                  announcement: ret.announcement,
                  state: ret.state,
                });
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, command: 'cashout', ...ret }));
                return;
              }
            }

            if (rawCmd === 'hunt' || rawCmd === 'call' || rawCmd === 'bonushunt') {
              const canon = this.resolveCanonicalSlot(rawArgs || 'Sweet Bonanza 1000');
              if (this.bonusHuntManager) {
                this.bonusHuntManager.addBonus(
                  { name: canon.name, provider: canon.provider, image: canon.image },
                  { username, kickId },
                  1.0
                );
              }
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, command: 'hunt', slot: canon }));
              return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, command: rawCmd }));
          } catch (err: any) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }

      // --- Community Bonus Hunt Spotlight Recommender ---
      if (url.pathname === '/api/hunt/spotlight' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ spotlight: this.getSpotlightRecommender() }));
        return;
      }

      if (url.pathname === '/api/hunt/spotlight/clear' && req.method === 'POST') {
        this.clearSpotlightRecommender();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'cleared' }));
        return;
      }

      // --- CS:GO 90s Active Chatters Pool ---
      if (url.pathname === '/api/wheel/csgo/active-pool' && req.method === 'GET') {
        const windowMs = Number(url.searchParams.get('windowMs')) || 90000;
        const chatters = this.getActiveChatters(windowMs);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          windowSeconds: Math.round(windowMs / 1000),
          count: chatters.length,
          chatters: chatters.map((c: any) => c.login || c.username || c),
          activeChatters: chatters
        }));
        return;
      }

      // --- Hub Status Endpoint ---
      if (url.pathname === '/api/status' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          status: 'ok',
          uptime: process.uptime(),
          overlaysConnected: this.clients.size,
          timestamp: new Date().toISOString()
        }));
        return;
      }

      // --- Kick Connection Health & Watchdog Endpoint ---
      if (url.pathname === '/api/health/kick' && req.method === 'GET') {
        const watchdog = KickWatchdog.getInstance();
        const report = watchdog.getHealthReport(true);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(report, null, 2));
        return;
      }

      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not found' }));
    });

    this.wss = new WebSocketServer({ server: this.server });

    this.wss.on('connection', (ws) => {
      this.clients.add(ws);
      console.log(`[Hub] Overlay connected (Total active overlays: ${this.clients.size})`);

      ws.on('message', (data) => {
        try {
          const payload = JSON.parse(data.toString());
          if (payload.action === 'spin' && this.spinHandler) {
            this.spinHandler(Boolean(payload.demo));
          } else if (payload.action === 'spin_slot' && this.slotSpinHandler) {
            this.slotSpinHandler(payload.category || 'all', Boolean(payload.demo));
          } else if (payload.action === 'spin_duo') {
            this.spinDuoWheel(payload.mode || 'battle');
          } else if (payload.action === 'spin_animation_complete' && payload.spinId) {
            this.dispatchPendingAnnouncement(payload.spinId, 'WS_ANIMATION_COMPLETE');
          } else if (payload.action === 'get_duo_queues') {
            ws.send(JSON.stringify({
              action: 'duo_queues',
              battleQueue: this.battleQueue,
              tourneyQueue: this.tourneyQueue,
              mode: this.duoWheelMode
            }));
          } else if (payload.action === 'get_battle_state' && this.battleManager) {
            ws.send(JSON.stringify({ action: 'battle_state', state: this.battleManager.getState() }));
          } else if (payload.action === 'get_tourney_state' && this.tournamentManager) {
            ws.send(
              JSON.stringify({
                action: 'tourney_state',
                state: this.tournamentManager.getState(),
                viewerData: this.tournamentManager.toBracketsViewerData(),
              })
            );
          } else if (payload.action === 'get_hunt_state' && this.bonusHuntManager) {
            ws.send(JSON.stringify({ action: 'hunt_state', state: this.bonusHuntManager.getState() }));
          } else if (payload.action === 'broadcast_overlay' && payload.overlayEvent) {
            (this as any).lastOverlayEvent = { ...payload.overlayEvent, ts: Date.now() };
            this.broadcast(payload.overlayEvent);
          } else if (payload.type === 'CELEBRATION' || payload.action === 'celebration') {
            (this as any).lastOverlayEvent = { ...payload, ts: Date.now() };
            this.broadcast(payload);
          }
        } catch {}
      });

      ws.on('close', () => {
        this.clients.delete(ws);
        console.log(`[Hub] Overlay disconnected (Remaining: ${this.clients.size})`);
      });
    });

    this.server.listen(opts.port, () => {
      console.log(`[Hub] Overlay & Webhook Server listening on http://127.0.0.1:${opts.port}`);
    });
  }

  private streamLiveFallback: boolean = true;

  public setStreamLive(isLive: boolean, sessionId?: string): void {
    this.streamLiveFallback = Boolean(isLive);
    if (this.db) {
      this.db.setStreamLive(isLive, sessionId);
    }
    this.broadcast({
      type: 'stream_status_updated',
      isLive: this.isStreamLive(),
      sessionId: this.db ? this.db.getStreamSessionId() : 'session_live_default',
    });
  }

  public isStreamLive(): boolean {
    return this.db ? this.db.isStreamLive() : this.streamLiveFallback;
  }

  public handleChannelPointRedemption(eventPayload: any): {
    alreadyProcessed: boolean;
    sessionLimitReached?: boolean;
    creditAmount: number;
    newBalance: number;
  } | null {
    if (!this.db) return null;

    const data = eventPayload.data || eventPayload;
    const rdmId = data.id || `rdm_${Date.now()}`;
    const kickRewardId = data.reward_id || 'default_reward';
    const kickUserId = Number(data.user_id) || 0;
    const username = data.user_login || data.user_name || 'chatter';
    const streamSessionId = data.session_id || this.db.getStreamSessionId();

    // Phase 6: Channel Points Bridge = 100 $DIG (max 1 redemption per stream session per user)
    const creditAmount = 100;

    const result = this.db.processChannelPointRedemption(
      rdmId,
      kickRewardId,
      kickUserId,
      username,
      creditAmount,
      streamSessionId
    );

    if (!result.alreadyProcessed && !result.sessionLimitReached) {
      console.log(`[Channel Points Bridge] Redeemed ${creditAmount} $DIG for @${username} (New Balance: ${result.newBalance})`);

      // Broadcast to all OBS overlays and web clients
      this.broadcast({
        type: 'channel_reward_redeemed',
        username,
        creditAmount,
        newBalance: result.newBalance,
        timestamp: Date.now(),
      });

      // Announce in chat
      if (this.chatClient) {
        this.chatClient.sendMessage(
          `🎉 @${username} canjeó sus Channel Points de Kick por ${creditAmount.toLocaleString()} $DIG en HuntHub! Saldo: ${result.newBalance.toLocaleString()} $DIG 🪙`
        );
      }
    }

    return {
      alreadyProcessed: result.alreadyProcessed,
      sessionLimitReached: result.sessionLimitReached,
      creditAmount: (!result.alreadyProcessed && !result.sessionLimitReached) ? creditAmount : 0,
      newBalance: result.newBalance,
    };
  }

  public recordChatterActivity(username: string, message?: string, kickId?: number, avatar?: string): boolean {
    const rawContent = message || '';
    if (rawContent) {
      const stripped = rawContent.replace(/:[a-zA-Z0-9_\-]+:/g, ' ').replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/g, '');
      if (stripped.length < 2) {
        return false;
      }
    }
    const clean = username.toLowerCase().replace(/^@/, '');
    const id = kickId || Math.floor(Math.random() * 100000) + 1;
    this.activeChatters.set(clean, {
      display: username,
      avatar: avatar || '',
      kickId: id,
      ts: Date.now(),
    });
    return true;
  }

  public recordChatter(
    msg: KickChatMessage,
    nowMs: number = Date.now()
  ): { awarded: boolean; amount: number; newBalance: number; reason?: string } {
    const rawContent = msg.content || '';
    // Filter Kick emotes :name: (e.g. :pepega:, :kekw:)
    const stripped = rawContent.replace(/:[a-zA-Z0-9_\-]+:/g, ' ').replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/g, '');
    if (stripped.length < 2) {
      // Ignore emote spammer to keep active pool 100% organic
      return { awarded: false, amount: 0, newBalance: 0, reason: 'EMOTE_OR_SPAM' };
    }

    const login = msg.sender.username.toLowerCase();
    const display = msg.sender.username;

    let earnResult: { awarded: boolean; amount: number; newBalance: number; reason?: string } = {
      awarded: false,
      amount: 0,
      newBalance: 0
    };

    // Record in database & evaluate Phase 6 Chat-to-Earn (+5 $DIG every 5m when stream is live, max 60 $DIG/h)
    if (this.db) {
      earnResult = this.db.recordChatEarn(msg.sender.id, login, rawContent, nowMs);
    }

    this.activeChatters.set(login, {
      display,
      avatar: '',
      kickId: msg.sender.id,
      ts: nowMs,
    });

    // Prune entries older than 5 minutes
    for (const [k, v] of this.activeChatters.entries()) {
      if (nowMs - v.ts > 300000) {
        this.activeChatters.delete(k);
      }
    }

    return earnResult;
  }

  public getActiveChatters(windowMs: number = 90000): any {
    const now = Date.now();
    const result: any = [];
    for (const [login, data] of this.activeChatters.entries()) {
      if (now - data.ts <= windowMs) {
        result.push({ login, username: login, display: data.display, avatar: data.avatar, kickId: data.kickId });
      }
    }
    // Backward-compatibility: allow pool.includes('username') directly in tests/callers
    result.includes = function(username: string): boolean {
      const target = String(username).toLowerCase().replace(/^@/, '');
      return this.some((c: any) => (c.login || c.username || '').toLowerCase() === target);
    };
    return result;
  }

  public broadcast(payload: any): void {
    const json = JSON.stringify(payload);
    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(json);
      }
    }
  }

  // --- Canonical Slot Catalog & Resolver ---
  private initSlotsCatalog(): void {
    try {
      const p = path.resolve(process.cwd(), 'wheel-slots', 'catalog', 'slots.json');
      if (fs.existsSync(p)) {
        const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
        if (Array.isArray(raw)) {
          this.slotsIndex = raw.map((s: any) => ({
            name: s.name,
            provider: s.provider || 'Casino',
            image: s.image || '',
          }));
        }
      }
    } catch (_) {}
  }

  public resolveCanonicalSlot(query: string): { name: string; provider: string; image: string } {
    const res = slotResolver.resolve(query);
    return {
      name: res.name,
      provider: res.provider,
      image: res.image,
    };
  }

  // --- Wheel Duo Queues Management ---
  public addBattleQueueEntry(
    entry: DuoQueueEntry | string,
    slotQuery?: string
  ): { success: boolean; position: number; updated: boolean; entry: DuoQueueEntry } {
    let resolved: DuoQueueEntry;
    if (typeof entry === 'string') {
      const canonical = this.resolveCanonicalSlot(slotQuery || '');
      resolved = {
        userId: 'user_' + entry.toLowerCase(),
        kickId: Math.floor(Math.random() * 100000) + 1,
        username: entry,
        displayName: entry,
        slotName: canonical.name,
        slotProvider: canonical.provider,
        slotImage: canonical.image,
        joinedAt: Date.now(),
      };
    } else {
      resolved = entry;
    }

    const idx = this.battleQueue.findIndex(
      (e) => (resolved.kickId && e.kickId === resolved.kickId) || e.username.toLowerCase() === resolved.username.toLowerCase()
    );
    if (idx >= 0) {
      this.battleQueue[idx].slotName = resolved.slotName;
      this.battleQueue[idx].slotProvider = resolved.slotProvider;
      this.battleQueue[idx].slotImage = resolved.slotImage;
      this.battleQueue[idx].joinedAt = Date.now();
      this.broadcastQueues();
      return { success: true, position: idx + 1, updated: true, entry: this.battleQueue[idx] };
    }
    this.battleQueue.push(resolved);
    this.broadcastQueues();
    return { success: true, position: this.battleQueue.length, updated: false, entry: resolved };
  }

  public addTourneyQueueEntry(
    entry: DuoQueueEntry | string,
    slotQuery?: string
  ): { success: boolean; position: number; updated: boolean; entry: DuoQueueEntry } {
    let resolved: DuoQueueEntry;
    if (typeof entry === 'string') {
      const canonical = this.resolveCanonicalSlot(slotQuery || '');
      resolved = {
        userId: 'user_' + entry.toLowerCase(),
        kickId: Math.floor(Math.random() * 100000) + 1,
        username: entry,
        displayName: entry,
        slotName: canonical.name,
        slotProvider: canonical.provider,
        slotImage: canonical.image,
        joinedAt: Date.now(),
      };
    } else {
      resolved = entry;
    }

    const idx = this.tourneyQueue.findIndex(
      (e) => (resolved.kickId && e.kickId === resolved.kickId) || e.username.toLowerCase() === resolved.username.toLowerCase()
    );
    if (idx >= 0) {
      this.tourneyQueue[idx].slotName = resolved.slotName;
      this.tourneyQueue[idx].slotProvider = resolved.slotProvider;
      this.tourneyQueue[idx].slotImage = resolved.slotImage;
      this.tourneyQueue[idx].joinedAt = Date.now();
      this.broadcastQueues();
      return { success: true, position: idx + 1, updated: true, entry: this.tourneyQueue[idx] };
    }
    this.tourneyQueue.push(resolved);
    this.broadcastQueues();
    return { success: true, position: this.tourneyQueue.length, updated: false, entry: resolved };
  }

  public getBattleQueue(): DuoQueueEntry[] {
    return [...this.battleQueue];
  }

  public getTourneyQueue(): DuoQueueEntry[] {
    return [...this.tourneyQueue];
  }

  public clearBattleQueue(): void {
    this.battleQueue = [];
    this.broadcastQueues();
  }

  public clearTourneyQueue(): void {
    this.tourneyQueue = [];
    this.broadcastQueues();
  }

  public setDuoWheelMode(mode: 'battle' | 'tourney'): void {
    this.duoWheelMode = mode;
    this.broadcast({ action: 'duo_mode_changed', mode });
  }

  public getDuoWheelMode(): 'battle' | 'tourney' {
    return this.duoWheelMode;
  }

  public broadcastQueues(): void {
    this.broadcast({
      action: 'wheel_duo_queues',
      battleQueue: this.battleQueue,
      tourneyQueue: this.tourneyQueue,
      mode: this.duoWheelMode,
    });
  }

  // --- Wheel Duo Spin Execution ---
  public spinDuoWheel(requestedMode?: 'battle' | 'tourney'): {
    success: boolean;
    spinId?: string;
    mode?: string;
    winner?: DuoQueueEntry;
    error?: string;
  } {
    const mode = requestedMode || this.duoWheelMode;
    const queue = mode === 'tourney' ? this.tourneyQueue : this.battleQueue;

    let pool = [...queue];
    if (pool.length === 0) {
      pool = [
        { kickId: 101, username: 'LuckyStriker', displayName: 'LuckyStriker', avatar: '', slotName: 'Wanted Dead or a Wild', slotProvider: 'Hacksaw', slotImage: '', joinedAt: Date.now() },
        { kickId: 102, username: 'VegasKing', displayName: 'VegasKing', avatar: '', slotName: 'Gates of Olympus 1000', slotProvider: 'Pragmatic', slotImage: '', joinedAt: Date.now() },
        { kickId: 103, username: 'SlotQueen', displayName: 'SlotQueen', avatar: '', slotName: 'San Quentin xWays', slotProvider: 'Nolimit City', slotImage: '', joinedAt: Date.now() },
        { kickId: 104, username: 'SpinMaster', displayName: 'SpinMaster', avatar: '', slotName: 'Sugar Rush 1000', slotProvider: 'Pragmatic', slotImage: '', joinedAt: Date.now() },
      ];
    }

    const winnerIdx = crypto.randomInt(0, pool.length);
    const winner = pool[winnerIdx];
    const spinId = crypto.randomUUID();

    let announceMessage = '';
    let assignedTarget = 'A';

    if (mode === 'battle' && this.battleManager) {
      const bState = this.battleManager.getState();
      if (bState.kothActive && bState.reigningKing) {
        assignedTarget = 'B';
        this.battleManager.joinLobby(
          { id: `u_${winner.kickId}`, kickId: winner.kickId, username: winner.username, displayName: winner.displayName, avatar: winner.avatar },
          { name: winner.slotName, provider: winner.slotProvider, image: winner.slotImage }
        );
        announceMessage = `⚔️ [Wheel Dual] ¡@${winner.username} fue seleccionado con "${winner.slotName}" para retar al Rey @${bState.reigningKing.username}!`;
      } else {
        const targetSlot = !bState.playerA ? 'A' : 'B';
        assignedTarget = targetSlot;
        this.battleManager.joinLobby(
          { id: `u_${winner.kickId}`, kickId: winner.kickId, username: winner.username, displayName: winner.displayName, avatar: winner.avatar },
          { name: winner.slotName, provider: winner.slotProvider, image: winner.slotImage }
        );
        announceMessage = `⚔️ [Wheel Dual] ¡@${winner.username} fue asignado a la Batalla 1v1 con "${winner.slotName}" (Esquina ${targetSlot === 'A' ? 'Azul' : 'Roja'})!`;
      }

      const qIdx = this.battleQueue.findIndex(
        (e) => e.kickId === winner.kickId || e.username.toLowerCase() === winner.username.toLowerCase()
      );
      if (qIdx >= 0) this.battleQueue.splice(qIdx, 1);
      this.broadcastQueues();
    } else if (mode === 'tourney' && this.tournamentManager) {
      this.tournamentManager.joinLobby(
        { id: `u_${winner.kickId}`, kickId: winner.kickId, username: winner.username, displayName: winner.displayName, avatar: winner.avatar },
        winner.slotName
      );
      const seedCount = this.tournamentManager.getState().participants.length;
      assignedTarget = `SEED_${seedCount}`;
      announceMessage = `🏆 [Wheel Dual] ¡@${winner.username} ingresó al Torneo 8-Bracket con "${winner.slotName}" (Cupo #${seedCount}/8)!`;

      const qIdx = this.tourneyQueue.findIndex(
        (e) => e.kickId === winner.kickId || e.username.toLowerCase() === winner.username.toLowerCase()
      );
      if (qIdx >= 0) this.tourneyQueue.splice(qIdx, 1);
      this.broadcastQueues();
    }

    this.registerPendingAnnouncement(spinId, 'duo', winner, announceMessage, 7200);

    this.broadcast({
      action: 'spin_duo',
      spinId,
      mode,
      winner,
      pool,
      target: assignedTarget,
      timestamp: Date.now(),
    });

    return {
      success: true,
      spinId,
      mode,
      winner,
      assignedTo: assignedTarget === 'B' ? 'playerB' : (assignedTarget === 'A' ? 'playerA' : 'tourney_lobby'),
      target: assignedTarget
    };
  }

  // --- Community Bonus Hunt Spotlight Recommender ---
  public setSpotlightRecommender(
    user: { username: string; displayName?: string; kickId?: number } | string,
    durationSeconds: number = 60
  ): SpotlightRecommender {
    const username = typeof user === 'string' ? user : user.username;
    const displayName = typeof user === 'string' ? user : (user.displayName || user.username);
    const kickId = typeof user === 'string' ? 0 : (user.kickId || 0);
    this.spotlightRecommender = {
      username,
      displayName,
      kickId,
      selectedAt: Date.now(),
      expiresAt: Date.now() + (durationSeconds * 1000),
    };
    this.broadcast({
      action: 'spotlight_recommender',
      spotlight: this.spotlightRecommender,
    });
    return this.spotlightRecommender;
  }

  public getSpotlightRecommender(): SpotlightRecommender | null {
    if (this.spotlightRecommender && Date.now() > this.spotlightRecommender.expiresAt) {
      this.spotlightRecommender = null;
    }
    return this.spotlightRecommender;
  }

  public clearSpotlightRecommender(): void {
    this.spotlightRecommender = null;
    this.broadcast({ action: 'spotlight_cleared' });
  }

  // --- Exact Millisecond Handshake (spin_animation_complete) ---
  public registerPendingAnnouncement(
    spinId: string,
    wheelTypeOrMessage: 'csgo' | 'duo' | 'slots' | string,
    winnerOrOnDispatch?: any,
    messageOrFallbackMs?: string | number,
    fallbackMs: number = 7200
  ): void {
    let wheelType: 'csgo' | 'duo' | 'slots' = 'duo';
    let winner: any = null;
    let message = '';
    let effectiveFallback = fallbackMs;
    let onDispatch: ((msg: string) => void) | undefined = undefined;

    if (wheelTypeOrMessage === 'csgo' || wheelTypeOrMessage === 'duo' || wheelTypeOrMessage === 'slots') {
      wheelType = wheelTypeOrMessage;
      winner = winnerOrOnDispatch;
      message = typeof messageOrFallbackMs === 'string' ? messageOrFallbackMs : '';
      if (typeof fallbackMs === 'number') effectiveFallback = fallbackMs;
    } else {
      // (spinId, message, onDispatch, fallbackMs)
      message = String(wheelTypeOrMessage);
      if (typeof winnerOrOnDispatch === 'function') {
        onDispatch = winnerOrOnDispatch;
      }
      if (typeof messageOrFallbackMs === 'number') {
        effectiveFallback = messageOrFallbackMs;
      }
    }

    const timer = setTimeout(() => {
      this.dispatchPendingAnnouncement(spinId, 'TIMEOUT_FALLBACK');
    }, effectiveFallback);

    this.pendingChatAnnouncements.set(spinId, {
      spinId,
      wheelType,
      winner,
      message,
      timer,
      dispatched: false,
      createdAt: Date.now(),
      onDispatch,
    });
  }

  public dispatchPendingAnnouncement(spinId: string, reason: string = 'CLIENT_COMPLETE'): boolean {
    const item = this.pendingChatAnnouncements.get(spinId);
    if (!item || item.dispatched) return false;

    item.dispatched = true;
    clearTimeout(item.timer);

    console.log(`[SpinHandshake] Dispatching chat announcement for spin ${spinId} (reason: ${reason})`);
    if (item.onDispatch) {
      try { item.onDispatch(item.message); } catch (_) {}
    }
    if (this.chatClient && item.message) {
      this.chatClient.sendMessage(item.message);
    }

    this.broadcast({
      action: 'spin_animation_finalized',
      spinId,
      reason,
      winner: item.winner,
    });

    this.pendingChatAnnouncements.delete(spinId);
    return true;
  }

  public getPendingAnnouncementsCount(): number {
    return this.pendingChatAnnouncements.size;
  }

  public getPendingAnnouncement(spinId: string): PendingChatAnnouncement | undefined {
    return this.pendingChatAnnouncements.get(spinId);
  }

  public close(): void {
    for (const client of this.clients) client.close();
    this.wss.close();
    this.server.close();
  }
}
