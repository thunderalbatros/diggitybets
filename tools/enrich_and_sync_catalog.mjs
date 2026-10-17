import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// Import slot tiers logic
const SlotTiers = (await import('../data/slot_tiers.js')).default || (await import('../data/slot_tiers.js'));
const evaluateSlotTier = SlotTiers.evaluateSlotTier || (function(s) {
  const p = (s.provider || '').toLowerCase();
  const n = (s.name || '').toLowerCase();
  if (/wanted dead or a wild|le bandit|gates of olympus|sweet bonanza|waylanders forge|sharks/i.test(n)) {
    return { tier: '1', weight: 6.25, isRecognized: true };
  }
  if (/pragmatic|hacksaw|valkyrie|paperclip|pocket play|blackout|colorful play|titan|donut|creative city|terminal|black coffee|avatar\s*ux|phantom|uppercut|hyper play|cipher|meta\s*gaming|nolimit/i.test(p)) {
    return { tier: '2', weight: 4.5, isRecognized: true };
  }
  return { tier: '3', weight: 1.0, isRecognized: false };
});

const SLOTS_JSON_PATH = path.join(ROOT, 'wheel-slots', 'catalog', 'slots.json');
const CURATED_JS_PATH = path.join(ROOT, 'data', 'curated_slots.js');
const SLOTS_DATA_JS_PATH = path.join(ROOT, 'wheel-slots', 'overlay', 'slots-data.js');

console.log('Loading slots from:', SLOTS_JSON_PATH);
const rawSlots = JSON.parse(fs.readFileSync(SLOTS_JSON_PATH, 'utf8'));

console.log(`Total input slots: ${rawSlots.length}`);

let tier1Count = 0;
let tier2Count = 0;
let tier3Count = 0;

const enrichedSlots = rawSlots.map((s, index) => {
  const tierInfo = evaluateSlotTier(s);
  if (tierInfo.tier === '1') tier1Count++;
  else if (tierInfo.tier === '2') tier2Count++;
  else tier3Count++;

  return {
    id: s.id || `slot-${index + 1}`,
    name: s.name,
    provider: s.provider,
    category: s.category || 'stake',
    maxWin: s.maxWin || '10,000x',
    image: s.image,
    badge: s.badge || (tierInfo.tier === '1' ? 'FLAGSHIP' : tierInfo.isRecognized ? 'ONLY ON STAKE' : 'CASINO'),
    tier: tierInfo.tier,
    weight: tierInfo.weight,
    color: s.color || (tierInfo.tier === '1' ? '#ffd700' : tierInfo.tier === '2' ? '#00e5ff' : '#888888')
  };
});

console.log(`Tier Breakdown:`);
console.log(`  Tier 1 (Flagships / Ultra): ${tier1Count}`);
console.log(`  Tier 2 (Recognized Stake Providers): ${tier2Count}`);
console.log(`  Tier 3 (Indie / General): ${tier3Count}`);

// Write wheel-slots/catalog/slots.json
fs.writeFileSync(SLOTS_JSON_PATH, JSON.stringify(enrichedSlots, null, 2), 'utf8');
console.log(`Updated ${SLOTS_JSON_PATH}`);

// Write wheel-slots/overlay/slots-data.js
const slotsDataContent = `window.SLOTS_CATALOG = ${JSON.stringify(enrichedSlots)};\n`;
fs.writeFileSync(SLOTS_DATA_JS_PATH, slotsDataContent, 'utf8');
console.log(`Updated ${SLOTS_DATA_JS_PATH}`);

// Write data/curated_slots.js
const curatedContent = `window.HUNTHUB_CURATED_SLOTS = ${JSON.stringify(enrichedSlots)};\n`;
fs.writeFileSync(CURATED_JS_PATH, curatedContent, 'utf8');
console.log(`Updated ${CURATED_JS_PATH} (${enrichedSlots.length} slots)`);

// Also sync verified images into data/curated_slots.json if present
const CURATED_JSON_PATH = path.join(ROOT, 'data', 'curated_slots.json');
if (fs.existsSync(CURATED_JSON_PATH)) {
  const byName = new Map(enrichedSlots.map((s) => [s.name.toLowerCase(), s.image]));
  const curatedJson = JSON.parse(fs.readFileSync(CURATED_JSON_PATH, 'utf8'));
  for (const item of curatedJson) {
    const verifiedImg = byName.get((item.name || '').toLowerCase());
    if (verifiedImg) {
      item.image = verifiedImg;
    }
  }
  fs.writeFileSync(CURATED_JSON_PATH, JSON.stringify(curatedJson, null, 2), 'utf8');
  console.log(`Synced verified images into ${CURATED_JSON_PATH}`);
}

console.log('Catalog sync and enrichment completed successfully!');
