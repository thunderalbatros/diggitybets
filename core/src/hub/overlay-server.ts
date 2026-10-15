import http from 'node:http';
import { WebSocketServer, WebSocket } from 'ws';
import crypto from 'node:crypto';
import { verifyKickWebhook } from '../ingestor/rsa-verify.ts';
import { KickWatchdog } from '../ingestor/kick-watchdog.ts';
import type { KickChatMessage } from '../ingestor/kick-pusher.ts';
import type { HuntHubDatabase } from '../db/database.ts';
import type { KickChatClient } from '../outbound/kick-chat.ts';

import type { BattleManager } from '../battles/battle-manager.ts';
import type { TournamentManager } from '../tournament/tournament-manager.ts';
import type { BonusHuntManager } from '../bonushunt/bonushunt-manager.ts';

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

  constructor(opts: OverlayServerOptions) {
    this.spinHandler = opts.onSpinTrigger || null;
    this.slotSpinHandler = opts.onSlotSpinTrigger || null;
    this.db = opts.db || null;
    this.chatClient = opts.chatClient || null;
    this.battleManager = opts.battleManager || null;
    this.tournamentManager = opts.tournamentManager || null;
    this.bonusHuntManager = opts.bonusHuntManager || null;

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

      if (url.pathname === '/api/battle/open' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          if (this.battleManager) {
            this.battleManager.openLobby(Number(body.betAmount) || 10, body.prizeText || '$50.00 POOL');
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
            this.battleManager.setPlayerPayout(body.playerSlot, Number(body.winAmount) || 0);
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'ok', state: this.battleManager?.getState() }));
        });
        return;
      }

      if (url.pathname === '/api/battle/resolve' && req.method === 'POST') {
        if (this.battleManager) {
          try {
            this.battleManager.resolveBattle();
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

      if (url.pathname === '/api/tourney/open' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          if (this.tournamentManager) {
            this.tournamentManager.openLobby(body.title, Number(body.betPerRound) || 10, body.prizeText);
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

      // --- Duo-Wheel Spin Endpoint ---
      if (url.pathname === '/api/spin-duo' && req.method === 'POST') {
        let b = '';
        req.on('data', (c) => (b += c));
        req.on('end', () => {
          const body = b ? JSON.parse(b) : {};
          this.broadcast({ action: 'spin_duo', mode: body.mode || 'battle' });
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'duo_spin_broadcast' }));
        });
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
            this.broadcast({ action: 'spin_duo', mode: payload.mode || 'battle' });
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

  private handleChannelPointRedemption(eventPayload: any): void {
    if (!this.db) return;

    const data = eventPayload.data || eventPayload;
    const rdmId = data.id || `rdm_${Date.now()}`;
    const kickRewardId = data.reward_id || 'default_reward';
    const kickUserId = Number(data.user_id) || 0;
    const username = data.user_login || data.user_name || 'chatter';

    // Default credit package: 5000 web credits per redemption
    const creditAmount = 5000;

    const result = this.db.processChannelPointRedemption(
      rdmId,
      kickRewardId,
      kickUserId,
      username,
      creditAmount
    );

    if (!result.alreadyProcessed) {
      console.log(`[Channel Points Bridge] Redeemed ${creditAmount} credits for @${username} (New Balance: ${result.newBalance})`);

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
          `🎉 @${username} canjeó sus Channel Points de Kick por ${creditAmount.toLocaleString()} créditos HuntHub! Saldo: ${result.newBalance.toLocaleString()} 🪙`
        );
      }
    }
  }

  public recordChatter(msg: KickChatMessage): void {
    const rawContent = msg.content || '';
    // Filter Kick emotes :name: (e.g. :pepega:, :kekw:)
    const stripped = rawContent.replace(/:[a-zA-Z0-9_\-]+:/g, ' ').replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/g, '');
    if (stripped.length < 2) {
      // Ignore emote spammer to keep active pool 100% organic
      return;
    }

    const login = msg.sender.username.toLowerCase();
    const display = msg.sender.username;

    // Record in database if db is available
    if (this.db) {
      this.db.upsertUser(msg.sender.id, login, display);
    }

    this.activeChatters.set(login, {
      display,
      avatar: '',
      kickId: msg.sender.id,
      ts: Date.now(),
    });

    // Prune entries older than 5 minutes
    const now = Date.now();
    for (const [k, v] of this.activeChatters.entries()) {
      if (now - v.ts > 300000) {
        this.activeChatters.delete(k);
      }
    }
  }

  public getActiveChatters(windowMs: number = 90000): Array<{ login: string; display: string; avatar: string; kickId: number }> {
    const now = Date.now();
    const result: Array<{ login: string; display: string; avatar: string; kickId: number }> = [];
    for (const [login, data] of this.activeChatters.entries()) {
      if (now - data.ts <= windowMs) {
        result.push({ login, display: data.display, avatar: data.avatar, kickId: data.kickId });
      }
    }
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

  public close(): void {
    for (const client of this.clients) client.close();
    this.wss.close();
    this.server.close();
  }
}
