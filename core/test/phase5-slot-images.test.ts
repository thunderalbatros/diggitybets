import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import { WebSocket } from 'ws';
import { slotResolver, resolveSlotImageUrl } from '../src/catalog/slot-resolver.ts';
import { BattleManager } from '../src/battles/battle-manager.ts';
import { TournamentManager } from '../src/tournament/tournament-manager.ts';
import { BonusHuntManager } from '../src/bonushunt/bonushunt-manager.ts';
import { OverlayServer } from '../src/hub/overlay-server.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');

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

async function runPhase5Tests() {
  console.log('\n--- Running Phase 5: Unified Slot Catalog & 100% Accurate Images Tests ---');

  // 1. Catalog Integrity & Zero-Relative / Zero-Broken Path Checks
  console.log('• Testing Catalog Integrity & Image URLs in data/ and casino-suite/ ...');

  const curatedPath = path.join(repoRoot, 'data', 'curated_slots.json');
  assert.ok(fs.existsSync(curatedPath), 'data/curated_slots.json must exist');
  const curatedSlots = JSON.parse(fs.readFileSync(curatedPath, 'utf8'));
  assert.ok(Array.isArray(curatedSlots), 'curated_slots must be an array');
  assert.ok(curatedSlots.length >= 140, `curated_slots should have >= 140 entries, found ${curatedSlots.length}`);

  let invalidImagesCount = 0;
  for (const s of curatedSlots) {
    assert.ok((s.id || s.name) && typeof (s.id || s.name) === 'string', `Slot must have an id or name: ${JSON.stringify(s)}`);
    assert.ok(s.name && typeof s.name === 'string', `Slot must have a name: ${s.id || s.name}`);
    assert.ok(s.provider && typeof s.provider === 'string', `Slot must have a provider: ${s.id || s.name}`);
    assert.ok(s.image && typeof s.image === 'string', `Slot must have an image URL: ${s.id || s.name}`);
    assert.ok(!s.image.includes('page_02_slot_'), `Slot image must not be a placeholder page_02_slot: ${s.id || s.name}`);
    assert.ok(!s.image.includes('page_03_slot_'), `Slot image must not be a placeholder page_03_slot: ${s.id || s.name}`);
    if (!s.image.startsWith('http://') && !s.image.startsWith('https://')) {
      invalidImagesCount++;
    }
  }
  assert.strictEqual(invalidImagesCount, 0, 'All curated slots must have valid HTTP/HTTPS CDN image URLs');
  console.log(`  ✓ 100% of ${curatedSlots.length} curated slots have valid names, providers, and CDN covers`);

  const casinoSuitePath = path.join(repoRoot, 'casino-suite', 'shared', 'slots-catalog.json');
  assert.ok(fs.existsSync(casinoSuitePath), 'casino-suite/shared/slots-catalog.json must exist');
  const casinoSuiteSlots = JSON.parse(fs.readFileSync(casinoSuitePath, 'utf8'));
  assert.ok(Array.isArray(casinoSuiteSlots), 'casino-suite slots must be an array');
  assert.strictEqual(casinoSuiteSlots.length, 60, 'casino-suite slots-catalog must contain 60 curated slots');

  for (const cs of casinoSuiteSlots) {
    assert.ok((cs.slug || cs.id || cs.name) && cs.name && cs.provider && cs.image, `Casino-suite slot must have slug/id, name, provider, image: ${cs.slug || cs.name}`);
    assert.ok(!cs.image.includes('../public/slots/page_'), `Casino suite image must NOT use page_ relative path: ${cs.slug || cs.name} -> ${cs.image}`);
    assert.ok(cs.image.startsWith('http://') || cs.image.startsWith('https://'), `Casino suite image must be direct CDN URL: ${cs.slug || cs.name} -> ${cs.image}`);
  }
  console.log('  ✓ 100% of 60 casino-suite slots have verified CDN images without relative page_ paths');

  // 2. SlotResolver Engine: Exact Matches, Aliases & Fuzzy Fallbacks
  console.log('• Testing SlotResolver Engine (Fuzzy Matching & Alias Dictionary) ...');

  // Exact lookups
  const wanted = slotResolver.resolve('Wanted Dead or a Wild');
  assert.strictEqual(wanted.id, 'wanted-dead-or-a-wild');
  assert.strictEqual(wanted.name, 'Wanted Dead or a Wild');
  assert.strictEqual(wanted.provider, 'Hacksaw Gaming');
  assert.ok(wanted.image.includes('imgix.net'), 'Wanted must have imgix CDN cover');

  const gates1k = slotResolver.resolve('Gates of Olympus 1000');
  assert.strictEqual(gates1k.id, 'gates-of-olympus-1000');
  assert.strictEqual(gates1k.name, 'Gates of Olympus 1000');
  assert.strictEqual(gates1k.provider, 'Pragmatic Play');

  // Fuzzy & Alias resolution
  const testAliases = [
    { query: 'gates', expectedName: 'Gates of Olympus 1000' },
    { query: 'olympus 1000', expectedName: 'Gates of Olympus 1000' },
    { query: 'wanted', expectedName: 'Wanted Dead or a Wild' },
    { query: 'dead or a wild', expectedName: 'Wanted Dead or a Wild' },
    { query: 'rip city', expectedName: 'RIP City' },
    { query: 'sweet bonanza', expectedName: 'Sweet Bonanza 1000' },
    { query: 'chaos crew', expectedName: 'Chaos Crew 2' },
    { query: 'sugar 1000', expectedName: 'Sugar Rush 1000' },
    { query: 'san quentin', expectedName: 'San Quentin xWays' },
    { query: 'mental', expectedName: 'Mental' },
    { query: 'zeus', expectedName: 'Gates of Olympus 1000' },
    { query: 'tombstone', expectedName: 'Tombstone R.I.P.' },
  ];

  for (const { query, expectedName } of testAliases) {
    const resolved = slotResolver.resolve(query);
    assert.strictEqual(resolved.name, expectedName, `Query "${query}" should resolve to "${expectedName}", got "${resolved.name}"`);
    assert.ok(resolved.image && (resolved.image.startsWith('http://') || resolved.image.startsWith('https://')), `Resolved "${query}" must have a valid cover URL`);
  }
  console.log('  ✓ All 12 key aliases and colloquial chat names resolved to canonical slots with verified covers');

  // Custom uncataloged slot graceful fallback
  const customSlot = slotResolver.resolve('Super Exotic Dragon Quest 9999');
  assert.strictEqual(customSlot.name, 'Super Exotic Dragon Quest 9999');
  assert.strictEqual(customSlot.provider, 'Casino Slot');
  assert.ok(customSlot.image.startsWith('http'), 'Custom slot must have a valid fallback image');
  console.log('  ✓ Custom uncataloged slot gracefully generates valid canonical object with default cover');

  // Image URL normalizer
  const normalizedRelative = resolveSlotImageUrl('../public/slots/wanted.jpg', '../');
  assert.strictEqual(normalizedRelative, '../site/images/slots/wanted.jpg');
  const normalizedAbsolute = resolveSlotImageUrl('https://mediumrare.imgix.net/sample.jpg', '../');
  assert.strictEqual(normalizedAbsolute, 'https://mediumrare.imgix.net/sample.jpg');
  console.log('  ✓ resolveSlotImageUrl correctly strips ../public/ and handles absolute CDN URLs');

  // 3. Backend Managers Integration Tests
  console.log('• Testing Backend Managers Preservation of Canonical Slot Details ...');

  // BattleManager
  const battleManager = new BattleManager();
  battleManager.openLobby(10, '$50 Pool');
  battleManager.joinLobby(
    { id: 'u_101', kickId: 101, username: 'LuckyStriker', displayName: 'LuckyStriker' },
    {
      name: 'Wanted Dead or a Wild',
      provider: 'Hacksaw Gaming',
      image: 'https://mediumrare.imgix.net/8ce2d9f493cb2fc54425260193237a726715ffea2bfb19b8849b38466e3fa299?w=180&h=236&fit=min&auto=format',
    }
  );
  battleManager.joinLobby(
    { id: 'u_102', kickId: 102, username: 'VegasKing', displayName: 'VegasKing' },
    {
      name: 'Gates of Olympus 1000',
      provider: 'Pragmatic Play',
      image: 'https://mediumrare.imgix.net/1ea93a0279a9ebc0e3a6288899532b27dbfc60a0f4a8e2cb924c5539ebf85eb3?w=180&h=236&fit=min&auto=format',
    }
  );
  const bState = battleManager.getState();
  assert.strictEqual(bState.playerA?.slotName, 'Wanted Dead or a Wild');
  assert.strictEqual(bState.playerA?.slotProvider, 'Hacksaw Gaming');
  assert.ok(bState.playerA?.slotImage?.includes('mediumrare.imgix.net'));
  assert.strictEqual(bState.playerB?.slotName, 'Gates of Olympus 1000');
  assert.strictEqual(bState.playerB?.slotProvider, 'Pragmatic Play');
  console.log('  ✓ BattleManager preserves canonical slotName, slotProvider, and slotImage in state');

  // TournamentManager
  const tourneyManager = new TournamentManager();
  tourneyManager.joinLobby(
    { id: 'p_1', kickId: 201, username: 'SlotMaster', displayName: 'SlotMaster' },
    { name: 'San Quentin xWays', provider: 'Nolimit City', image: 'https://fan-cdn.nolimitcity.com/trans_eba4744bd0.png' }
  );
  const tState = tourneyManager.getState();
  assert.strictEqual(tState.participants.length, 1);
  assert.strictEqual(tState.participants[0].slotName, 'San Quentin xWays');
  assert.strictEqual(tState.participants[0].slotProvider, 'Nolimit City');
  assert.strictEqual(tState.participants[0].slotImage, 'https://fan-cdn.nolimitcity.com/trans_eba4744bd0.png');
  console.log('  ✓ TournamentManager correctly stores canonical slotName, slotProvider, and slotImage');

  // BonusHuntManager
  const huntManager = new BonusHuntManager();
  const addedBonus = huntManager.addBonus(
    {
      name: 'Sugar Rush 1000',
      provider: 'Pragmatic Play',
      image: 'https://mediumrare.imgix.net/5d6f6e8e0d6b0b5711c2adad4f3914a38f714eb6c0c55f84eb430e3bb4a3ba45?w=180&h=236&fit=min&auto=format',
    },
    { username: 'AgusKick', kickId: 301 },
    2.0
  );
  assert.strictEqual(addedBonus.slotName, 'Sugar Rush 1000');
  assert.strictEqual(addedBonus.slotProvider, 'Pragmatic Play');
  assert.ok(addedBonus.slotImage?.includes('mediumrare.imgix.net'));
  console.log('  ✓ BonusHuntManager stores canonical slot details on bonus addition');

  // 4. OverlayServer HTTP API & Queues Auto-Resolution Tests
  console.log('• Testing OverlayServer HTTP APIs & Queue Ingestion with Canonical Engine ...');
  const port = 3458;
  const server = new OverlayServer({
    port,
    battleManager,
    tournamentManager: tourneyManager,
    bonusHuntManager: huntManager,
  });
  await new Promise((r) => setTimeout(r, 200));

  try {
    // 4.1 Battle Queue entry with colloquial chat alias "wanted"
    const bEntryRes = server.addBattleQueueEntry('WildWestFan', 'wanted');
    assert.strictEqual(bEntryRes.success, true);
    assert.strictEqual(bEntryRes.entry.slotName, 'Wanted Dead or a Wild');
    assert.strictEqual(bEntryRes.entry.slotProvider, 'Hacksaw Gaming');
    assert.ok(bEntryRes.entry.slotImage.includes('imgix.net'));
    console.log('  ✓ addBattleQueueEntry automatically resolves "wanted" to canonical "Wanted Dead or a Wild"');

    // 4.2 Tourney Queue entry with colloquial chat alias "olympus 1000"
    const tEntryRes = server.addTourneyQueueEntry('ZeusLover', 'olympus 1000');
    assert.strictEqual(tEntryRes.success, true);
    assert.strictEqual(tEntryRes.entry.slotName, 'Gates of Olympus 1000');
    assert.strictEqual(tEntryRes.entry.slotProvider, 'Pragmatic Play');
    assert.ok(tEntryRes.entry.slotImage.includes('imgix.net'));
    console.log('  ✓ addTourneyQueueEntry automatically resolves "olympus 1000" to canonical "Gates of Olympus 1000"');

    // 4.3 HTTP GET /api/wheel/duo/queues returns canonical slot data
    const queuesRes: any = await new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${port}/api/wheel/duo/queues`, (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => resolve(JSON.parse(body)));
      }).on('error', reject);
    });
    assert.ok(Array.isArray(queuesRes.battleQueue));
    assert.ok(Array.isArray(queuesRes.tourneyQueue));
    assert.strictEqual(queuesRes.battleQueue[0].slotName, 'Wanted Dead or a Wild');
    assert.strictEqual(queuesRes.tourneyQueue[0].slotName, 'Gates of Olympus 1000');
    console.log('  ✓ /api/wheel/duo/queues serves unified canonical slot names and images');

    // 4.4 Bonus hunt addition via HTTP POST
    const huntBonusRes = await postJson(`http://127.0.0.1:${port}/api/hunt/bonus`, {
      slot: { name: 'RIP City', provider: 'Hacksaw Gaming' },
      caller: { username: 'CatFan', kickId: 403 },
      betSize: 1.5,
    });
    assert.strictEqual(huntBonusRes.status, 'ok');
    assert.ok(huntBonusRes.state.bonuses.length >= 1);
    console.log('  ✓ /api/hunt/bonus accepts canonical slot details');
  } finally {
    server.close();
  }

  console.log('\n[PASS] All Phase 5 Tests Completed Successfully with 100% assertions!\n');
}

runPhase5Tests().catch((err) => {
  console.error('\n[FAIL] Phase 5 Test Failed:', err);
  process.exit(1);
});
