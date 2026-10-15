import assert from 'node:assert';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

// Import slot_tiers.js using pathToFileURL on Windows
const tierUrl = pathToFileURL(path.join(ROOT, 'data', 'slot_tiers.js')).href;
const SlotTiers = (await import(tierUrl)).default || (await import(tierUrl));

console.log('--- Running Stage 4 Slot Tiers & Weighted Boost Tests ---');

// Test 1: Flagship evaluation
console.log('[Test 1] Iconic Flagships assigned Tier 1 with high weight...');
const flagship = SlotTiers.evaluateSlotTier({ name: 'Wanted Dead or a Wild', provider: 'Hacksaw Gaming' });
assert.strictEqual(flagship.tier, '1', 'Wanted Dead or a Wild must be Tier 1');
assert(flagship.weight >= 5.0, 'Flagship weight must be >= 5.0');
assert.strictEqual(flagship.isRecognized, true);

// Test 2: Top 16 Stake Recognized Providers evaluation
console.log('[Test 2] Recognized Providers assigned boosted weights...');
const targetProviders = [
  'Pragmatic Play', 'Hacksaw Gaming', 'Paperclip Gaming', 'Pocket Play',
  'Blackout Studios', 'Colorful Play', 'Valkyrie', 'Titan Gaming',
  'Donut Gaming', 'Creative City', 'Terminal Games', 'Black Coffee Studios',
  'AvatarUX', 'Phantom Interactive', 'Uppercut Gaming', 'Hyper Play',
  'Cipher Games', 'Meta Gaming'
];

targetProviders.forEach(prov => {
  const res = SlotTiers.evaluateSlotTier({ name: 'Test Machine', provider: prov });
  assert(res.isRecognized, `Provider "${prov}" must be recognized`);
  assert(res.weight >= 3.0, `Provider "${prov}" weight must be >= 3.0`);
});

// Test 3: Unknown / Indie provider gets baseline 1.0 weight
console.log('[Test 3] Unknown / Indie provider receives baseline 1.0 weight...');
const indie = SlotTiers.evaluateSlotTier({ name: 'Indie Reel', provider: 'Some Obscure Studio 99' });
assert.strictEqual(indie.tier, '3');
assert.strictEqual(indie.weight, 1.0);
assert.strictEqual(indie.isRecognized, false);

// Test 4: Weighted statistical boost simulation
console.log('[Test 4] Simulating 10,000 weighted picks to verify statistical boost...');
const testPool = [
  { name: 'Wanted Dead or a Wild', provider: 'Hacksaw Gaming', tier: '1', weight: 6.25 },
  { name: 'Gates of Olympus', provider: 'Pragmatic Play', tier: '1', weight: 6.25 },
  { name: 'Waylanders Forge', provider: 'Valkyrie', tier: '2', weight: 4.5 },
  { name: 'Ghost Rush', provider: 'Paperclip Gaming', tier: '2', weight: 4.5 },
  { name: 'Indie Machine 1', provider: 'Unknown Lab', tier: '3', weight: 1.0 },
  { name: 'Indie Machine 2', provider: 'Unknown Lab', tier: '3', weight: 1.0 },
  { name: 'Indie Machine 3', provider: 'Unknown Lab', tier: '3', weight: 1.0 },
  { name: 'Indie Machine 4', provider: 'Unknown Lab', tier: '3', weight: 1.0 }
];

const counts: Record<string, number> = {};
const ITERATIONS = 10000;
for (let i = 0; i < ITERATIONS; i++) {
  const picked = SlotTiers.pickWeightedSlot(testPool);
  counts[picked.name] = (counts[picked.name] || 0) + 1;
}

// Total recognized weight = 6.25 + 6.25 + 4.5 + 4.5 = 21.5
// Total indie weight = 1 + 1 + 1 + 1 = 4.0
// Total = 25.5 -> Recognized share expected ~84.3%, Indie share ~15.7%
const recognizedPicks = (counts['Wanted Dead or a Wild'] || 0) +
                       (counts['Gates of Olympus'] || 0) +
                       (counts['Waylanders Forge'] || 0) +
                       (counts['Ghost Rush'] || 0);
const recognizedRatio = recognizedPicks / ITERATIONS;

console.log(`Recognized Slots Selection Rate: ${(recognizedRatio * 100).toFixed(1)}% (Expected ~84%)`);
assert(recognizedRatio > 0.75, 'Recognized slots must appear in >75% of weighted picks');
assert(recognizedRatio < 0.95, 'Indie slots must still have a realistic chance (~5-25%)');

console.log('✅ All Stage 4 Slot Tiers & Weighted Boost Tests Passed Successfully!');
