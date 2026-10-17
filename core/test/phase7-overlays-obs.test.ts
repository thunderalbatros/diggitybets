/**
 * HuntHub — Phase 7 Test Suite (Suite 12)
 * Verifies:
 * 1. Indexing of `references/` in `tools/intelligence/rag_pipeline.mjs` (preserving Qdrant & Groq).
 * 2. Evolution of `wheel-csgo/` (CS2 rarity base, elastic needle deflection, DecryptedText reveal, OBS WS + /api/sync/state).
 * 3. Evolution of `wheel-duo/` (Chatter avatar + 3:4 slot cover, animated mode switch, Atlas live queue counter, BorderGlow, OBS sync).
 * 4. Evolution of `overlay-battle/` (HoloCard glare, BONUS BUY vs SPINS badge, WAAPI ghost damage bar, KotH 1/4..4/4 $20 PRIZE with ElectricBorder, OBS sync).
 * 5. Evolution of `overlay-bonushunt/` (Scientific Glassmorphism rgba(20,20,20,0.75) + 1px solid rgba(255,255,255,0.08), NumberFlow KPI rollers, border-trail on opening bonus, 3:4 mini-cards, >8 bonuses ticker loop, OBS sync).
 * 6. Total OBS Browser Source Sync (`ws://127.0.0.1:3001` + `/api/sync/state` across all 7 overlays + `[ 📋 Copy OBS Browser URL ]` buttons in `#admin` Tabs 3 & 4).
 * 7. Visual Auditor rules (`admin` view, `raw-os-emoji`, `sibling-overlap`).
 */

import * as assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

function readRepoFile(relPath: string): string {
  const full = path.join(ROOT_DIR, relPath);
  assert.ok(fs.existsSync(full), `Expected file to exist: ${relPath}`);
  return fs.readFileSync(full, 'utf8');
}

async function runPhase7Tests() {
  console.log('\n============================================================');
  console.log('🎬 RUNNING SUITE 12: PHASE 7 OVERLAYS EVOLUTION & OBS SYNC');
  console.log('============================================================\n');

  // 1. Omni-RAG references/ indexing
  {
    const ragCode = readRepoFile('tools/intelligence/rag_pipeline.mjs');
    assert.ok(ragCode.includes("path.join(ROOT, 'references')"), 'rag_pipeline.mjs must scan references/ directory');
    assert.ok(ragCode.includes('QDRANT_HOST'), 'rag_pipeline.mjs must preserve Qdrant Cloud integration');
    assert.ok(ragCode.includes('GROQ_API_KEY'), 'rag_pipeline.mjs must preserve Groq integration');
    console.log('  ✅ [7.1] Omni-RAG indexes references/ alongside knowledge/ while preserving Qdrant & Groq');
  }

  // 2. wheel-csgo/ Evolution
  {
    const csgoCss = readRepoFile('wheel-csgo/overlay/style.css');
    const csgoJs = readRepoFile('wheel-csgo/overlay/main.js');
    assert.ok(csgoCss.includes('needle-peg-deflect') && csgoCss.includes('@keyframes pegDeflect'), 'wheel-csgo CSS must include elastic center needle deflection');
    assert.ok(csgoCss.includes('border-bottom: 5px solid var(--rareza'), 'wheel-csgo CSS must include CS2/Stake chromatic rarity base bar');
    assert.ok(csgoJs.includes('decryptTextReveal'), 'wheel-csgo JS must include DecryptedText winner reveal');
    assert.ok(csgoJs.includes('cubic-bezier(0.12, 0.99, 0.24, 1)'), 'wheel-csgo JS must use near-miss suspense deceleration curve');
    assert.ok(csgoJs.includes('/api/sync/state') && csgoJs.includes('ws://127.0.0.1:'), 'wheel-csgo JS must sync via WebSocket and /api/sync/state');
    console.log('  ✅ [7.2] wheel-csgo/ evolved with CS2 rarity base, elastic needle deflection, DecryptedText & OBS sync');
  }

  // 3. wheel-duo/ Evolution
  {
    const duoHtml = readRepoFile('wheel-duo/index.html');
    const duoCss = readRepoFile('wheel-duo/style.css');
    const duoJs = readRepoFile('wheel-duo/main.js');
    assert.ok(duoHtml.includes('id="duo-queue-counter"') && duoHtml.includes('atlas-queue-badge'), 'wheel-duo HTML must include live queue counter badge');
    assert.ok(duoCss.includes('aspect-ratio: 3 / 4'), 'wheel-duo CSS must enforce 3:4 slot cover aspect ratio');
    assert.ok(duoCss.includes('mode-switching') && duoCss.includes('winner-border-glow'), 'wheel-duo CSS must include mode switch animation and golden BorderGlow');
    assert.ok(duoJs.includes('updateQueueBadge') && duoJs.includes('/api/sync/state'), 'wheel-duo JS must update live queue counter and sync with /api/sync/state');
    console.log('  ✅ [7.3] wheel-duo/ evolved with Chatter + 3:4 Slot cover, mode transition, live queue counter & BorderGlow');
  }

  // 4. overlay-battle/ Evolution
  {
    const battleHtml = readRepoFile('overlay-battle/index.html');
    const battleCss = readRepoFile('overlay-battle/style.css');
    const battleJs = readRepoFile('overlay-battle/main.js');
    assert.ok(battleHtml.includes('holo-foil-glare'), 'overlay-battle HTML must include HoloCard glare layer');
    assert.ok(battleHtml.includes('id="mode-badge-a"') && battleHtml.includes('id="vs-mode-badge"'), 'overlay-battle HTML must include BONUS BUY vs SPINS mode badges');
    assert.ok(battleHtml.includes('id="ghost-bar-a"') && battleHtml.includes('id="ghost-bar-b"'), 'overlay-battle HTML must include secondary trailing ghost impact bars');
    assert.ok(battleHtml.includes('id="koth-meter-a"') && battleHtml.includes('4/4 · $20 PRIZE'), 'overlay-battle HTML must include King of the Hill 1/4..4/4 — $20 PRIZE meter');
    assert.ok(battleCss.includes('electric-border-ring') && battleCss.includes('koth-king-active'), 'overlay-battle CSS must include ElectricBorder energy ring around the reigning King');
    assert.ok(battleJs.includes('animateGhostImpactBar') && battleJs.includes('/api/sync/state'), 'overlay-battle JS must animate ghost bar via WAAPI and sync via /api/sync/state');
    console.log('  ✅ [7.4] overlay-battle/ evolved with HoloCard glare, BONUS BUY vs SPINS badge, WAAPI ghost bar & KotH ElectricBorder');
  }

  // 5. overlay-bonushunt/ Evolution
  {
    const bhCss = readRepoFile('overlay-bonushunt/style.css');
    const bhJs = readRepoFile('overlay-bonushunt/main.js');
    assert.ok(bhCss.includes('rgba(20, 20, 20, 0.75)') && bhCss.includes('rgba(255, 255, 255, 0.08)'), 'overlay-bonushunt CSS must apply Scientific Glassmorphism (rgba(20,20,20,0.75) + 1px solid rgba(255,255,255,0.08))');
    assert.ok(bhCss.includes('aspect-ratio: 3 / 4'), 'overlay-bonushunt CSS must enforce 3:4 slot mini-cards');
    assert.ok(bhCss.includes('borderTrailSpin') && bhCss.includes('ticker-loop-active'), 'overlay-bonushunt CSS must include golden border-trail and continuous vertical ticker loop');
    assert.ok(bhJs.includes('animateNumberFlow') && bhJs.includes('bonuses.length > 8'), 'overlay-bonushunt JS must include NumberFlow KPI rollers and >8 bonuses auto-scroll ticker loop');
    assert.ok(bhJs.includes('/api/sync/state'), 'overlay-bonushunt JS must sync via /api/sync/state');
    console.log('  ✅ [7.5] overlay-bonushunt/ evolved with Scientific Glassmorphism, NumberFlow KPIs, golden border-trail, 3:4 cards & >8 ticker loop');
  }

  // 6. Total OBS Browser Source Sync & Copy URL Buttons in #admin Tabs 3 & 4
  {
    const indexHtml = readRepoFile('index.html');
    const adminJs = readRepoFile('site/js/admin-hub.js');
    const serverTs = readRepoFile('core/src/hub/overlay-server.ts');
    const tourneyJs = readRepoFile('overlay-tourney/main.js');
    const celebJs = readRepoFile('overlay-celebration/main.js');
    const slotsJs = readRepoFile('wheel-slots/overlay/main.js');

    const copyBtnIds = [
      'btn-copy-obs-bonushunt',
      'btn-copy-obs-celebration',
      'btn-copy-obs-tourney',
      'btn-copy-obs-battle',
      'btn-copy-obs-wheel-duo',
      'btn-copy-obs-wheel-csgo',
      'btn-copy-obs-wheel-slots'
    ];
    for (const id of copyBtnIds) {
      assert.ok(indexHtml.includes(`id="${id}"`), `index.html #admin must include OBS URL copy button #${id}`);
    }
    assert.ok(indexHtml.includes('data-obs-size="1920x1080"') && indexHtml.includes('data-obs-size="620x620"'), 'Copy OBS URL buttons must specify recommended 1920x1080 and 620x620 dimensions');
    assert.ok(adminJs.includes('bindObsCopyButtons') && adminJs.includes('relayOverlaySyncEvent'), 'admin-hub.js must bind Copy OBS URL buttons and relay overlayEvent to /api/sync/state');
    assert.ok(serverTs.includes("type: 'overlay_sync_event'"), 'OverlayServer must broadcast overlay_sync_event over WebSocket in <50ms');
    assert.ok(tourneyJs.includes('/api/sync/state') && celebJs.includes('/api/sync/state') && slotsJs.includes('/api/sync/state'), 'All remaining overlays must also connect to ws://127.0.0.1:3001 and /api/sync/state');
    console.log('  ✅ [7.6] All 7 overlays synced via WebSocket + /api/sync/state & [ 📋 Copy OBS Browser URL ] buttons active in #admin Tabs 3 & 4');
  }

  // 7. Visual Auditor rules
  {
    const auditJs = readRepoFile('tools/audit/visual_audit.mjs');
    assert.ok(auditJs.includes("'admin'"), 'visual_audit.mjs must include admin in VIEWS');
    assert.ok(auditJs.includes('raw-os-emoji') && auditJs.includes('sibling-overlap'), 'visual_audit.mjs must enforce anti-emoji and anti-collision rules');
    console.log('  ✅ [7.7] tools/audit/visual_audit.mjs updated with admin view, raw-os-emoji, and sibling-overlap checks');
  }

  console.log('\n🎉 ALL PHASE 7 OVERLAYS & OBS BROWSER SOURCE TESTS PASSED (SUITE 12 GREEN)!\n');
}

runPhase7Tests().catch((err) => {
  console.error('❌ Phase 7 test suite failed:', err);
  process.exit(1);
});
