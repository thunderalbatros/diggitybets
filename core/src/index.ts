import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { config } from './config.ts';
import { KickPusherClient, type KickChatMessage } from './ingestor/kick-pusher.ts';
import { KickChatClient } from './outbound/kick-chat.ts';
import { OverlayServer } from './hub/overlay-server.ts';
import { HuntHubDatabase, type UserRow } from './db/database.ts';
import { BattleManager } from './battles/battle-manager.ts';
import { TournamentManager } from './tournament/tournament-manager.ts';
import { BonusHuntManager } from './bonushunt/bonushunt-manager.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');

console.log('================================================================');
console.log('       HUNTHUB CORE SERVICE — STAGE 1, 2 & 3 ENGINE ONLINE     ');
console.log(`   Target Channel:  ${config.channelSlug} (Chatroom ID: ${config.chatroomId})`);
console.log(`   Overlay Hub:     http://127.0.0.1:${config.serverPort}`);
console.log(`   Kick Outbound:   Official API v1 (@${config.broadcasterUserId})`);
console.log('================================================================');

// 1. Initialize Database
const dbPath = path.join(rootDir, 'core', 'hunthub.db');
const db = new HuntHubDatabase(dbPath);

// 2. Initialize Clients
const chatClient = new KickChatClient(config.broadcasterUserId);
const pusherClient = new KickPusherClient(config.chatroomId);

// 3. Initialize Battle, Tournament & Bonus Hunt Managers
let overlayServer: OverlayServer;

const battleManager = new BattleManager((state) => {
  if (overlayServer) {
    overlayServer.broadcast({ type: 'battle_update', state });
  }
});

const tournamentManager = new TournamentManager((state) => {
  if (overlayServer) {
    overlayServer.broadcast({
      type: 'tournament_update',
      state,
      viewerData: tournamentManager.toBracketsViewerData(),
    });
  }
});

const bonusHuntManager = new BonusHuntManager((state) => {
  if (overlayServer) {
    overlayServer.broadcast({ type: 'hunt_update', state });
  }
});

// 4. Load Slots Catalog for Random Wheel
interface SlotItem {
  id: string;
  name: string;
  provider: string;
  category: string;
  maxWin: string;
  image: string;
  badge: string;
  color: string;
}

let slotsCatalog: SlotItem[] = [];
try {
  const catalogPath = path.join(rootDir, 'wheel-slots', 'catalog', 'slots.json');
  if (fs.existsSync(catalogPath)) {
    slotsCatalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));
    console.log(`[Catalog] Loaded ${slotsCatalog.length.toLocaleString()} slots for the Random Wheel.`);
  }
} catch (e: any) {
  console.warn('[Catalog] Failed to load catalog from file, fallback pool will be used:', e.message);
}

// 5. Initialize Overlay Server
let isChatterDrawBusy = false;
let isSlotDrawBusy = false;

overlayServer = new OverlayServer({
  port: config.serverPort,
  db,
  chatClient,
  battleManager,
  tournamentManager,
  bonusHuntManager,
  onSpinTrigger: (demo: boolean) => {
    executeChatterDraw(demo);
  },
  onSlotSpinTrigger: (category: string, demo: boolean) => {
    executeSlotDraw(category, demo);
  },
});

// 5. CS:GO Active Chatter Draw Executor (Anti-Sybil & Provably Fair Protected)
const recentWinners = new Map<string, number>();
const WINNER_COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes cooldown

function executeChatterDraw(demo: boolean) {
  if (isChatterDrawBusy) {
    console.log('[Draw] Sorteo is already in progress, ignoring duplicate call');
    return;
  }

  const rawActive = overlayServer.getActiveChatters(90000);
  let pool = demo ? getDemoPool() : rawActive;

  // Filter through Anti-Sybil database checks (exclude shadowbanned & alt clusters)
  if (!demo && pool.length > 0) {
    const userIds = pool.map((p) => {
      const u = db.getUserByKickId(p.kickId);
      return u ? u.id : '';
    }).filter(Boolean);

    const eligible = db.getEligibleUsers(userIds, 0);
    const eligibleIds = new Set(eligible.map((e) => e.kick_id));
    pool = pool.filter((p) => eligibleIds.has(p.kickId));
  }

  if (pool.length === 0) {
    console.log('[Draw] No eligible active chatters found in the last 90s');
    chatClient.sendMessage('No active chatters in the last 90 seconds. Type in chat to join the giveaway!');
    return;
  }

  // Anti-Repeat / Winner Cooldown: exclude users who won in the last 10 minutes
  const now = Date.now();
  for (const [login, ts] of recentWinners.entries()) {
    if (now - ts > WINNER_COOLDOWN_MS) recentWinners.delete(login);
  }

  const nonRepeatPool = pool.filter((p) => !recentWinners.has(p.login));
  const selectionPool = nonRepeatPool.length > 0 ? nonRepeatPool : pool;

  isChatterDrawBusy = true;

  // Provably Fair Commit-Reveal (Stake & Botrix standard)
  const serverSeed = crypto.randomBytes(32).toString('hex');
  const serverSeedHash = crypto.createHash('sha256').update(serverSeed).digest('hex');
  const clientSeed = `hunthub_node_${pool.length}_${selectionPool.length}_${now}`;

  // HMAC-SHA256 deterministic index derivation with rejection sampling
  const hmac = crypto.createHmac('sha256', serverSeed).update(clientSeed).digest();
  let winnerIdx = 0;
  const maxValid = 0xFFFFFFFF - (0xFFFFFFFF % selectionPool.length);
  for (let offset = 0; offset <= hmac.length - 4; offset += 4) {
    const val = hmac.readUInt32BE(offset);
    if (val < maxValid) {
      winnerIdx = val % selectionPool.length;
      break;
    }
  }

  const winner = selectionPool[winnerIdx];
  recentWinners.set(winner.login, now);

  const payload = {
    evento: 'sorteo',
    id: now,
    demo,
    ganador: winner.login,
    participantes: pool.map((p) => p.login),
    nombres: Object.fromEntries(pool.map((p) => [p.login, p.display])),
    avatares: Object.fromEntries(pool.filter((p) => p.avatar).map((p) => [p.login, p.avatar])),
    provably_fair: {
      server_seed_hash: serverSeedHash,
      server_seed: serverSeed,
      client_seed: clientSeed,
      algorithm: 'HMAC-SHA256-REJECTION',
    },
  };

  console.log(`[Draw] Winner selected: @${winner.display} (${demo ? 'DEMO' : 'LIVE'} - Pool: ${pool.length}, Eligible: ${selectionPool.length})`);
  console.log(`[Draw] Provably Fair Hash: ${serverSeedHash}`);

  // Broadcast to OBS overlay
  overlayServer.broadcast(payload);

  // Announce in Kick chat after reel spin finishes (8.5s)
  setTimeout(() => {
    const announceMsg = `@${winner.display} has won, have 20 seconds to claim, type something in chat !`;
    chatClient.sendMessage(announceMsg);
    isChatterDrawBusy = false;
  }, 8500);
}

function getDemoPool() {
  const names = [
    'LuckyChatter', 'VegasPro', 'SpinKing', 'JackpotAce', 'Strike777',
    'SlotMaster', 'DiamondKing', 'NeonWolf', 'RoyalFlush', 'BigBassBob'
  ];
  return names.map((n, i) => ({ login: n.toLowerCase(), display: n, avatar: '', kickId: 1000 + i }));
}

// 6. Random Slot Wheel Executor
function executeSlotDraw(rawCat: string = 'all', demo: boolean = false) {
  if (isSlotDrawBusy) {
    console.log('[SlotWheel] Spin already running, ignoring duplicate request');
    return;
  }

  const category = parseCategory(rawCat);
  let pool = slotsCatalog;

  if (category !== 'all') {
    pool = slotsCatalog.filter((s) => s.category.toLowerCase() === category);
  }

  if (!pool || pool.length === 0) {
    pool = [
      { id: 'wanted', name: 'Wanted Dead or a Wild', provider: 'Hacksaw Gaming', category: 'hacksaw', maxWin: '12,500x', badge: 'HACKSAW', color: '#ff5722', image: '' },
      { id: 'gates1000', name: 'Gates of Olympus 1000', provider: 'Pragmatic Play', category: 'pragmatic', maxWin: '15,000x', badge: 'PRAGMATIC', color: '#00e5ff', image: '' },
      { id: 'sanquentin', name: 'San Quentin xWays', provider: 'Nolimit City', category: 'nolimit', maxWin: '150,000x', badge: 'NOLIMIT', color: '#e65100', image: '' },
      { id: 'sharks', name: 'Sharks!', provider: 'Pragmatic Play', category: 'stake', maxWin: '10,000x', badge: 'ONLY ON STAKE', color: '#ffd700', image: '' },
    ];
  }

  isSlotDrawBusy = true;
  const idx = crypto.randomInt(0, pool.length);
  const winner = pool[idx];

  const payload = {
    evento: 'sorteo_slot',
    id: Date.now(),
    categoria: category,
    ganador: winner,
  };

  console.log(`[SlotWheel] Spun (${category}): ${winner.name} (${winner.provider})`);

  // Broadcast to OBS Slot Wheel overlay
  overlayServer.broadcast(payload);

  if (demo) {
    setTimeout(() => { isSlotDrawBusy = false; }, 7500);
    return;
  }

  // Announce in chat after 7.5s animation
  setTimeout(() => {
    const msg = `🎰 [Slot Wheel] The wheel landed on: ${winner.name} (${winner.provider}) — Max Win: ${winner.maxWin}! Good luck on the hunt! 🍀`;
    chatClient.sendMessage(msg);
    isSlotDrawBusy = false;
  }, 7500);
}

function parseCategory(raw: string): string {
  if (!raw) return 'all';
  const l = raw.toLowerCase();
  if (l.includes('stake') || l.includes('only')) return 'stake';
  if (l.includes('pragmatic') || l.includes('pp')) return 'pragmatic';
  if (l.includes('hacksaw') || l.includes('hs')) return 'hacksaw';
  if (l.includes('nolimit') || l.includes('nlc') || l.includes('no limit')) return 'nolimit';
  return 'all';
}

// 7. Setup Realtime Pusher Chat Ingestor
pusherClient.onMessage((msg: KickChatMessage) => {
  // 1. Record chatter in database and active memory pool
  overlayServer.recordChatter(msg);

  // 2. Broadcast raw chat to OBS overlays
  overlayServer.broadcast({
    type: 'chat_message',
    data: msg,
  });
});

// 8. Command Parser & Execution
pusherClient.onCommand(({ command, args, sender, messageId }) => {
  const isMod = sender.identity?.badges?.some((b) => b.type === 'moderator' || b.type === 'broadcaster');
  const isStreamer = sender.username.toLowerCase() === config.channelSlug.toLowerCase();

  // --- Giveaways & Sorteos ---
  if (command === 'pickwinner' || command === 'sorteo') {
    if (isMod || isStreamer) {
      executeChatterDraw(false);
    }
  }

  // --- Random Slot Wheel ---
  if (command === 'random' || command === 'slot' || command === 'randomslot') {
    const cat = args[0] || 'all';
    executeSlotDraw(cat, false);
  }

  // --- Check Points Balance ---
  if (command === 'points' || command === 'creditos' || command === 'saldo' || command === 'puntos') {
    const user = db.getUserByKickId(sender.id);
    if (user && user.points_balance > 0) {
      chatClient.sendMessage(`🪙 @${sender.username} tenés ${user.points_balance.toLocaleString()} créditos HuntHub en tu cuenta!`);
    } else {
      chatClient.sendMessage(`🪙 @${sender.username} tenés 0 créditos. Podés canjear tus Channel Points en Kick para recibir créditos en la web!`);
    }
  }

  // --- Bonus Hunt Prediction (Guess the Balance) ---
  if (command === 'guess' || command === 'prediccion') {
    const rawVal = args.join(' ');
    const num = parseGuessAmount(rawVal);

    if (num !== null && num > 0) {
      console.log(`[Guess] Valid guess from @${sender.username}: $${num.toFixed(2)}`);
      bonusHuntManager.recordGuess(sender.username, num, sender.id);
      overlayServer.broadcast({
        type: 'bonus_hunt_guess',
        user: sender.username,
        guess: num,
        timestamp: Date.now(),
      });
      chatClient.sendMessage(`🎯 @${sender.username} predijo $${num.toFixed(2)} para el saldo final de la Bonus Hunt!`);
    }
  }

  // --- Community Bonus Hunt (Request / Call a Slot) ---
  if (command === 'hunt' || command === 'call' || command === 'bonushunt') {
    if ((isMod || isStreamer) && args[0] === 'open') {
      const cost = Number(args[1]) || 500;
      bonusHuntManager.startNewHunt('Community Bonus Hunt', cost);
      chatClient.sendMessage(`💎 ¡Nueva Community Bonus Hunt ABIERTA! Start Cost: $${cost}. Escribí !hunt <nombre slot> para pedir tu máquina!`);
      return;
    }
    if ((isMod || isStreamer) && args[0] === 'reset') {
      bonusHuntManager.reset();
      chatClient.sendMessage(`💎 Bonus Hunt reseteada.`);
      return;
    }
    if (args[0] === 'stats') {
      const m = bonusHuntManager.getState().metrics;
      chatClient.sendMessage(`💎 Stats: ${m.openedBonuses}/${m.totalBonuses} bonos | Win: $${m.winnings} | Avg X: ${m.runAverageX}x | Req: ${m.reqAverageX}x 🍀`);
      return;
    }

    const slotName = args.join(' ').trim();
    if (slotName) {
      bonusHuntManager.addBonus(
        { name: slotName },
        { username: sender.username, kickId: sender.id },
        1.0
      );
      chatClient.sendMessage(`💎 @${sender.username} agregó "${slotName}" a la Bonus Hunt (Bono #${bonusHuntManager.getState().bonuses.length})!`);
    }
  }

  // --- 1v1 Battles ---
  if (command === 'battle' || command === 'duelo') {
    if ((isMod || isStreamer) && args[0] === 'open') {
      const bet = Number(args[1]) || 10;
      battleManager.openLobby(bet, `$${bet * 5} Prize Pool`);
      chatClient.sendMessage(`⚔️ ¡Lobby de Batalla 1v1 ABIERTO! Buy-in: $${bet}. Escribí !battle <nombre slot> para entrar!`);
      return;
    }
    if ((isMod || isStreamer) && args[0] === 'reset') {
      battleManager.reset();
      chatClient.sendMessage(`⚔️ Batalla 1v1 reseteada por el streamer.`);
      return;
    }
    const slotName = args.join(' ').trim() || 'Wanted Dead or a Wild';
    const joinResult = battleManager.joinLobby(
      { id: `k_${sender.id}`, kickId: sender.id, username: sender.username },
      { name: slotName }
    );
    if (joinResult.success) {
      const corner = joinResult.playerSlot === 'A' ? 'Azul' : 'Roja';
      chatClient.sendMessage(`⚔️ @${sender.username} se unió a la Batalla 1v1 con ${slotName} (Esquina ${corner})!`);
      if (battleManager.getState().status === 'READY') {
        const pA = battleManager.getState().playerA;
        const pB = battleManager.getState().playerB;
        chatClient.sendMessage(
          `🔥 ¡DUELO CONFIRMADO! @${pA?.displayName} (${pA?.slotName}) VS @${pB?.displayName} (${pB?.slotName})! ¡Que gane el mayor multiplicador!`
        );
      }
    }
  }

  // --- 8-Bracket Tournament ---
  if (command === 'tourney' || command === 'torneo') {
    if ((isMod || isStreamer) && args[0] === 'open') {
      const bet = Number(args[1]) || 10;
      tournamentManager.openLobby('8-Bracket Slot Championship', bet, '1º: $150 · 2º: $50');
      chatClient.sendMessage(`🏆 ¡Torneo 8-Bracket ABIERTO! Buy-in: $${bet}. Escribí !tourney <nombre slot> para inscribirte (8 cupos)!`);
      return;
    }
    if ((isMod || isStreamer) && args[0] === 'reset') {
      tournamentManager.reset();
      chatClient.sendMessage(`🏆 Torneo 8-Bracket reseteado por el streamer.`);
      return;
    }
    const slotName = args.join(' ').trim() || 'Random Slot';
    const joinResult = tournamentManager.joinLobby(
      { id: `k_${sender.id}`, kickId: sender.id, username: sender.username },
      slotName
    );
    if (joinResult.success) {
      chatClient.sendMessage(`🏆 @${sender.username} inscripto al Torneo con ${slotName} (${joinResult.joinedCount}/8 cupos)!`);
      if (tournamentManager.getState().status === 'IN_PROGRESS') {
        chatClient.sendMessage(`🔥 ¡TORNEO COMPLETO (8/8)! Cuadro generado criptográficamente. ¡Arrancan los Cuartos de Final! 🍀`);
      }
    }
  }
});

function parseGuessAmount(raw: string): number | null {
  if (!raw) return null;
  let clean = raw.trim().replace(/[$€£\s]/g, '');

  // Handle 'k' multiplier (e.g. 12.5k -> 12500)
  if (clean.toLowerCase().endsWith('k')) {
    const base = parseFloat(clean.slice(0, -1).replace(',', '.'));
    return isNaN(base) ? null : base * 1000;
  }

  // Robust parsing: if only one dot or comma followed by 3 digits, it's thousands (12.500 -> 12500)
  if (/^\d{1,3}[.,]\d{3}$/.test(clean)) {
    clean = clean.replace(/[.,]/g, '');
    return parseFloat(clean);
  }

  // Decimal comma format (12500,50 -> 12500.50)
  if (clean.includes(',') && !clean.includes('.')) {
    clean = clean.replace(',', '.');
  } else if (clean.includes(',') && clean.includes('.')) {
    // Both separators: standard 1,234.56 format
    clean = clean.replace(/,/g, '');
  }

  const val = parseFloat(clean);
  return isNaN(val) ? null : val;
}

// 9. Start Pusher Connection
pusherClient.connect();

// 10. Clean Graceful Shutdown
process.on('SIGINT', () => {
  console.log('\n[Service] Stopping HuntHub Core...');
  pusherClient.disconnect();
  overlayServer.close();
  db.close();
  process.exit(0);
});
