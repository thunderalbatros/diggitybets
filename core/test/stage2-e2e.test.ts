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

async function runE2ETests() {
  console.log('--- Running Stage 2 E2E & Server Integration Tests ---');
  const port = 3456;

  const battleManager = new BattleManager();
  const tournamentManager = new TournamentManager();

  const server = new OverlayServer({
    port,
    battleManager,
    tournamentManager,
  });

  // Give server time to listen
  await new Promise((r) => setTimeout(r, 200));

  try {
    // 1. Battle Endpoints Test
    console.log('[E2E 1] Test Battle Open Lobby via HTTP...');
    const openRes = await postJson(`http://127.0.0.1:${port}/api/battle/open`, { betAmount: 25, prizeText: '$125 POOL' });
    assert.strictEqual(openRes.status, 'ok');
    assert.strictEqual(openRes.state.status, 'LOBBY');
    assert.strictEqual(openRes.state.betAmount, 25);

    console.log('[E2E 2] Test Battle Join Players...');
    const joinA = await postJson(`http://127.0.0.1:${port}/api/battle/join`, {
      user: { id: 'u1', kickId: 101, username: 'PlayerOne', displayName: 'PlayerOne' },
      slot: { name: 'Wanted Dead or a Wild', provider: 'Hacksaw' },
    });
    assert.strictEqual(joinA.success, true);
    assert.strictEqual(joinA.playerSlot, 'A');

    const joinB = await postJson(`http://127.0.0.1:${port}/api/battle/join`, {
      user: { id: 'u2', kickId: 102, username: 'PlayerTwo', displayName: 'PlayerTwo' },
      slot: { name: 'Gates of Olympus 1000', provider: 'Pragmatic' },
    });
    assert.strictEqual(joinB.success, true);
    assert.strictEqual(joinB.playerSlot, 'B');

    console.log('[E2E 3] Test Battle Payouts & Resolve...');
    await postJson(`http://127.0.0.1:${port}/api/battle/payout`, { playerSlot: 'A', winAmount: 250 });
    await postJson(`http://127.0.0.1:${port}/api/battle/payout`, { playerSlot: 'B', winAmount: 100 });
    const resolveRes = await postJson(`http://127.0.0.1:${port}/api/battle/resolve`, {});
    assert.strictEqual(resolveRes.state.status, 'RESOLVED');
    assert.strictEqual(resolveRes.state.winner, 'A');
    assert.strictEqual(resolveRes.state.playerA.multiplier, 10);

    // 2. Tournament Endpoints Test
    console.log('[E2E 4] Test Tourney Demo Auto-Simulation via HTTP...');
    const tourneyDemoRes = await postJson(`http://127.0.0.1:${port}/api/tourney/demo`, {});
    assert.strictEqual(tourneyDemoRes.status, 'demo_loaded');
    assert.strictEqual(tourneyDemoRes.state.status, 'FINISHED');
    assert.ok(tourneyDemoRes.state.champion);

    const tourneyStateRes = await getJson(`http://127.0.0.1:${port}/api/tourney/state`);
    assert.strictEqual(tourneyStateRes.state.status, 'FINISHED');
    assert.ok(tourneyStateRes.viewerData.matches.length >= 7);

    // 3. WebSocket Real-time Sync Test
    console.log('[E2E 5] Test WebSocket Client Query for Battle and Tourney...');
    const ws = new WebSocket(`ws://127.0.0.1:${port}/`);
    await new Promise<void>((resolve, reject) => {
      ws.on('open', () => {
        ws.send(JSON.stringify({ action: 'get_battle_state' }));
        ws.send(JSON.stringify({ action: 'get_tourney_state' }));
      });

      let receivedCount = 0;
      ws.on('message', (msg) => {
        const payload = JSON.parse(msg.toString());
        if (payload.action === 'battle_state' || payload.action === 'tourney_state') {
          receivedCount++;
          if (receivedCount === 2) {
            ws.close();
            resolve();
          }
        }
      });

      ws.on('error', reject);
    });

    console.log('✅ All Stage 2 E2E & Server Integration Tests Passed Successfully!');
  } finally {
    server.close();
  }
}

runE2ETests().catch((err) => {
  console.error('❌ E2E Test Failed:', err);
  process.exit(1);
});
