import assert from 'node:assert';
import http from 'node:http';
import { WebSocket } from 'ws';
import { OverlayServer } from '../src/hub/overlay-server.ts';
import { BattleManager } from '../src/battles/battle-manager.ts';
import { TournamentManager } from '../src/tournament/tournament-manager.ts';

async function postJson(url: string, body: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
        },
      },
      (res) => {
        let respBody = '';
        res.on('data', (c) => (respBody += c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(respBody));
          } catch {
            resolve(respBody);
          }
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function getJson(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let respBody = '';
      res.on('data', (c) => (respBody += c));
      res.on('end', () => {
        try {
          resolve(JSON.parse(respBody));
        } catch {
          resolve(respBody);
        }
      });
    }).on('error', reject);
  });
}

async function runPhase4Tests() {
  console.log('\n--- Running Phase 4: Wheel-Chat Sync & Queues Tests ---');
  const port = 3457;

  const battleManager = new BattleManager();
  const tournamentManager = new TournamentManager();

  const server = new OverlayServer({
    port,
    battleManager,
    tournamentManager,
  });

  await new Promise((r) => setTimeout(r, 200));

  try {
    // =========================================================================
    // 1. DUO-WHEEL SEPARATE QUEUES (!battle & !tourney) & AUTO-ASSIGNMENT
    // =========================================================================
    console.log('\n[Phase 4 Test 1] Duo-Wheel: Ingestion, Canonical Slots, Deduplication...');
    
    // Add battle entries
    server.addBattleQueueEntry('viewer_alpha', 'wanted');
    server.addBattleQueueEntry('viewer_beta', 'gates 1000');
    
    // Deduplication check: viewer_alpha changes their slot choice
    server.addBattleQueueEntry('viewer_alpha', 'sugar rush 1000');

    const battleQueue = server.getBattleQueue();
    assert.strictEqual(battleQueue.length, 2, 'Battle queue should contain exactly 2 unique users');
    const alphaEntry = battleQueue.find(e => e.username === 'viewer_alpha');
    assert.ok(alphaEntry);
    assert.strictEqual(alphaEntry.slotName, 'Sugar Rush 1000', 'Slot choice should update cleanly');
    assert.strictEqual(alphaEntry.slotProvider, 'Pragmatic Play', 'Provider must be resolved canonically');

    // Add tourney entries
    server.addTourneyQueueEntry('tourney_user_1', 'le bandit');
    server.addTourneyQueueEntry('tourney_user_2', 'rip city');
    server.addTourneyQueueEntry('tourney_user_3', 'chaos crew 2');
    
    const tourneyQueue = server.getTourneyQueue();
    assert.strictEqual(tourneyQueue.length, 3, 'Tourney queue should contain exactly 3 users');
    assert.strictEqual(tourneyQueue[0].slotName, 'Le Bandit');
    assert.strictEqual(tourneyQueue[0].slotProvider, 'Hacksaw Gaming');
    console.log('  ✓ Ingestion, canonical resolution & deduplication verified.');

    // Mode Switch & KotH Assignment
    console.log('\n[Phase 4 Test 2] Duo-Wheel: Spin Auto-Assignment in King of the Hill & Tourney...');
    
    // Setup Battle with an existing Reigning King
    battleManager.openLobby(20, '$50 Pool');
    battleManager.joinLobby(
      { id: 'king_1', kickId: 101, username: 'SupremeKing', displayName: 'SupremeKing' },
      { name: 'Wanted Dead or a Wild', provider: 'Hacksaw' }
    );
    battleManager.joinLobby(
      { id: 'dummy_b', kickId: 102, username: 'OldChallenger', displayName: 'OldChallenger' },
      { name: 'Chaos Crew', provider: 'Hacksaw' }
    );
    battleManager.resolveWinnerDirectly('A'); // SupremeKing wins duel, becomes reigning king
    battleManager.kingDecideContinue(); // King defends throne, seat B becomes available

    assert.strictEqual(battleManager.getState().reigningKing?.username, 'SupremeKing');
    assert.strictEqual(battleManager.getState().playerB, null, 'Challenger seat must be vacant for new challenger');

    // Spin Duo-Wheel in battle mode
    server.setDuoWheelMode('battle');
    const spinBattleResult = server.spinDuoWheel('battle');
    assert.strictEqual(spinBattleResult.success, true);
    assert.strictEqual(spinBattleResult.mode, 'battle');
    assert.strictEqual(spinBattleResult.assignedTo, 'playerB', 'Winner must be assigned to Player B (Challenger)');
    assert.strictEqual(battleManager.getState().playerB?.username, spinBattleResult.winner?.username);
    assert.strictEqual(battleManager.getState().playerA?.username, 'SupremeKing', 'Reigning King must remain at Seat A');
    console.log('  ✓ King of the Hill: Challenger seat correctly populated by Duo-Wheel winner without displacing King.');

    // Tournament Lobby Assignment
    tournamentManager.openLobby('Phase 4 Cup', 10, '$100 Pool');
    server.setDuoWheelMode('tourney');
    const spinTourneyResult = server.spinDuoWheel('tourney');
    assert.strictEqual(spinTourneyResult.success, true);
    assert.strictEqual(spinTourneyResult.mode, 'tourney');
    assert.strictEqual(spinTourneyResult.assignedTo, 'tourney_lobby');
    const tourneyParticipants = tournamentManager.getState().participants;
    assert.strictEqual(tourneyParticipants.length, 1);
    assert.strictEqual(tourneyParticipants[0].username, spinTourneyResult.winner?.username);
    console.log('  ✓ 8-Bracket Tournament: Duo-Wheel winner enrolled directly into tournament lobby.');

    // =========================================================================
    // 2. 90-SECOND ACTIVE CHATTER POOL, EMOTE FILTERING & SPOTLIGHT RECOMMENDER
    // =========================================================================
    console.log('\n[Phase 4 Test 3] 90s Chatter Pool & Emote Filter...');
    
    // Emote-only spam message
    server.recordChatterActivity('emote_spammer_99', ':pepe: :kekw: :stake:');
    let pool = server.getActiveChatters(90000);
    assert.ok(!pool.includes('emote_spammer_99'), 'Emote spammers must be filtered out of active chatter pool');

    // Organic chat messages
    server.recordChatterActivity('organic_viewer_1', 'vamos diggity hoy sale max win en wanted!!');
    server.recordChatterActivity('organic_viewer_2', 'hola gente como andan, que linda sesion');
    pool = server.getActiveChatters(90000);
    assert.ok(pool.includes('organic_viewer_1'), 'Organic chatter 1 must be present in pool');
    assert.ok(pool.includes('organic_viewer_2'), 'Organic chatter 2 must be present in pool');

    // Spotlight Recommender lifecycle (60s)
    console.log('\n[Phase 4 Test 4] Spotlight Recommender 60s Lifecycle...');
    server.setSpotlightRecommender('organic_viewer_1', 60);
    let spotlight = server.getSpotlightRecommender();
    assert.ok(spotlight !== null, 'Spotlight recommender should not be null');
    assert.strictEqual(spotlight?.username, 'organic_viewer_1');
    const remainingSeconds = Math.max(0, Math.ceil((spotlight!.expiresAt - Date.now()) / 1000));
    assert.ok(remainingSeconds > 0 && remainingSeconds <= 60);

    // Clear spotlight
    server.clearSpotlightRecommender();
    spotlight = server.getSpotlightRecommender();
    assert.strictEqual(spotlight, null, 'Spotlight recommender should be null after clearing');
    console.log('  ✓ 90s pool anti-spam & Spotlight Recommender lifecycle verified.');

    // =========================================================================
    // 3. EXACT WHEEL-CHAT HANDSHAKE SYNCHRONIZATION (spin_animation_complete)
    // =========================================================================
    console.log('\n[Phase 4 Test 5] Handshake: pendingChatAnnouncements & Immediate Dispatch...');
    
    const spinId = 'spin_test_' + Date.now();
    let chatDelivered = false;
    let deliveredMessage = '';

    // Register pending announcement at T=0
    server.registerPendingAnnouncement(
      spinId,
      '🎉 @organic_viewer_1 WON THE DRAW ON OBS WHEEL!',
      (msg) => {
        chatDelivered = true;
        deliveredMessage = msg;
      },
      7200
    );

    // At T=0, message MUST NOT have been delivered
    assert.strictEqual(chatDelivered, false, 'Message must NOT be dispatched immediately at T=0');
    assert.ok(server.getPendingAnnouncement(spinId) !== undefined, 'Map must hold the pending announcement');
    assert.strictEqual(server.getPendingAnnouncement(spinId)?.dispatched, false);

    // Dispatch via HTTP POST /api/wheel/spin-complete (Exact deceleration complete)
    const spinCompleteRes = await postJson(`http://127.0.0.1:${port}/api/wheel/spin-complete`, { spinId });
    assert.strictEqual(spinCompleteRes.success, true);
    assert.strictEqual(spinCompleteRes.dispatched, true);
    assert.strictEqual(chatDelivered, true, 'Message MUST be dispatched immediately when spin_animation_complete arrives');
    assert.ok(deliveredMessage.includes('@organic_viewer_1'));

    // Idempotency: Second call for the same spinId must NOT re-dispatch
    chatDelivered = false;
    const secondCall = server.dispatchPendingAnnouncement(spinId);
    assert.strictEqual(secondCall, false, 'Subsequent dispatch calls for same spinId must return false');
    assert.strictEqual(chatDelivered, false, 'Message must NOT be dispatched twice (idempotency)');
    console.log('  ✓ Handshake immediate dispatch and strict idempotency verified.');

    // Fallback Timeout Test
    console.log('\n[Phase 4 Test 6] Handshake Fallback Timer (Safe auto-dispatch if OBS is off)...');
    const fallbackSpinId = 'spin_fallback_' + Date.now();
    let fallbackDelivered = false;

    // Use a small 150ms timeout for test
    server.registerPendingAnnouncement(
      fallbackSpinId,
      'Fallback message',
      () => {
        fallbackDelivered = true;
      },
      150
    );

    assert.strictEqual(fallbackDelivered, false);
    await new Promise((r) => setTimeout(r, 220));
    assert.strictEqual(fallbackDelivered, true, 'Fallback timer must auto-dispatch announcement if no handshake arrived');
    console.log('  ✓ 7200ms Fallback safety net correctly auto-dispatches once.');

    // =========================================================================
    // 4. HTTP API & WEBSOCKET PROTOCOL CHECKS
    // =========================================================================
    console.log('\n[Phase 4 Test 7] HTTP Endpoints & WebSocket Action Protocol...');

    // GET queues
    const queuesRes = await getJson(`http://127.0.0.1:${port}/api/wheel/duo/queues`);
    assert.ok(Array.isArray(queuesRes.battleQueue));
    assert.ok(Array.isArray(queuesRes.tourneyQueue));

    // POST mode
    const modeRes = await postJson(`http://127.0.0.1:${port}/api/wheel/duo/mode`, { mode: 'tourney' });
    assert.strictEqual(modeRes.success, true);
    assert.strictEqual(modeRes.mode, 'tourney');

    // GET active pool
    const activePoolRes = await getJson(`http://127.0.0.1:${port}/api/wheel/csgo/active-pool`);
    assert.strictEqual(activePoolRes.windowSeconds, 90);
    assert.ok(activePoolRes.count >= 2);

    // WebSocket test for spin_animation_complete
    const ws = new WebSocket(`ws://127.0.0.1:${port}/`);
    await new Promise<void>((resolve, reject) => {
      ws.on('open', () => {
        const wsSpinId = 'spin_ws_' + Date.now();
        let wsDelivered = false;

        server.registerPendingAnnouncement(wsSpinId, 'WS Test Message', () => {
          wsDelivered = true;
        }, 7200);

        ws.send(JSON.stringify({ action: 'spin_animation_complete', spinId: wsSpinId }));

        setTimeout(() => {
          assert.strictEqual(wsDelivered, true, 'WebSocket spin_animation_complete must trigger pending announcement');
          ws.close();
          resolve();
        }, 50);
      });
      ws.on('error', reject);
    });
    console.log('  ✓ WebSocket spin_animation_complete handshake confirmed.');

    console.log('\n======================================================');
    console.log('🎉 ALL PHASE 4 TESTS PASSED (100% SUCCESS)');
    console.log('======================================================\n');
  } finally {
    server.close();
  }
}

runPhase4Tests().catch((err) => {
  console.error('❌ Phase 4 Test Failed:', err);
  process.exit(1);
});
