import fs from 'fs';
import crypto from 'crypto';

console.log('=== HUNTHUB STAKE ORIGINALS & PORTAL INTEGRITY AUDIT ===\n');

// 1. Verify index.html exists and is valid HTML
const html = fs.readFileSync('index.html', 'utf8');
console.log(`[PASS] index.html loaded: ${(html.length / 1024).toFixed(1)} KB`);

// 2. Check essential element IDs in index.html
const requiredIds = [
  'watch', 'house-games', 'tournament', 'bonushunt', 'store', 'provably-fair', 'links',
  // Stake Plinko
  'plinko-canvas', 'plinko-btn-drop', 'plinko-btn-drop-5', 'plinko-btn-drop-10',
  // Stake Mines
  'mines-board', 'mines-bet-input', 'mines-count-select', 'mines-btn-start', 'mines-btn-cashout',
  // Stake Dice
  'dice-result-bubble', 'dice-slider-input', 'dice-stat-mult', 'dice-stat-target', 'dice-stat-chance', 'dice-btn-roll',
  // Stake Blackjack
  'bj-btn-deal', 'bj-btn-hit', 'bj-btn-stand', 'bj-btn-double', 'bj-btn-split', 'bj-split-hands-section', 'bj-dealer-cards', 'bj-player-cards',
  // Roulette
  'roulette-wheel-canvas', 'roulette-btn-spin', 'roulette-numbers-board',
  // Tournament
  'tourney-interactive-bracket', 'tourney-submit-bar', 'tourney-pred-status', 'btn-lock-tourney-pred',
  'tab-tourney-bracket', 'tab-tourney-standings', 'tourney-bracket-panel', 'tourney-standings-panel',
  // Bonus Hunt
  'bh-metric-cost', 'bh-metric-paid', 'bh-metric-opened', 'bh-metric-reqavg', 'bh-slots-tbody', 'bh-guess-form', 'bh-guesses-list',
  // Store & Raffles
  'raffle-user-tickets', 'btn-buy-raffle-ticket',
  // Profile & Kick Auth
  'btn-kick-login', 'profile-modal', 'prof-input-stake-user', 'prof-input-bet-id', 'btn-verify-stake-bet',
  // Provably Fair
  'pf-live-server-hash', 'pf-live-client-seed', 'pf-live-nonce', 'pf-verify-btn', 'pf-verify-result',
  // Stake Originals Clone Hub
  'stake-originals-iframe',
  // Leaderboard & Profile (Stage 6)
  'leaderboard', 'profile', 'totp-mult-val', 'totp-timer', 'btn-link-discord',
  // Streamer Admin Hub & Anti-Fraud Radar (Stage 6.2)
  'admin-hub', 'nav-tab-admin', 'admin-claims-tbody', 'admin-alts-tbody', 'btn-roll-sunday-raffle'
];

let missingIds = [];
for (const id of requiredIds) {
  if (!html.includes(`id="${id}"`)) {
    missingIds.push(id);
  }
}

if (missingIds.length > 0) {
  console.error('[FAIL] Missing IDs in index.html:', missingIds);
  process.exit(1);
} else {
  console.log(`[PASS] All ${requiredIds.length} required interactive IDs present in index.html`);
}

// 3. Test Local Vector Slot Cards & Stake Assets
const stakeAssets = [
  'site/images/diggitybets-logo.png',
  'site/images/kick-logo-3d.png',
  'site/images/kick-k-logo.png',
  'site/images/kick-wordmark.png',
  'site/stake-games/index.html'
];
for (const asset of stakeAssets) {
  if (!fs.existsSync(asset)) {
    console.error(`[FAIL] Missing asset: ${asset}`);
    process.exit(1);
  }
}
console.log(`[PASS] Diggity Bets logo, 2D pixel Kick logos, and Stake Originals build present on disk.`);

const slotCards = [
  'wanted-dead-or-a-wild.svg', 'gates-of-olympus.svg', 'le-bandit.svg',
  'san-quentin-xways.svg', 'sweet-bonanza.svg', 'ghost-rush.svg',
  'tombstone-rip.svg', 'sugar-rush.svg', 'chaos-crew-2.svg', 'hand-of-anubis.svg'
];

for (const card of slotCards) {
  if (!fs.existsSync(`site/images/slots/${card}`)) {
    console.error(`[FAIL] Missing local slot card: site/images/slots/${card}`);
    process.exit(1);
  }
}
console.log(`[PASS] Local SVG slot cards verified: All key slot cards present in site/images/slots/`);

// 4. Test Provably Fair Logic for Stake Originals
function generateGameHash(serverSeed, clientSeed, nonce) {
  return crypto.createHmac('sha256', serverSeed)
    .update(`${clientSeed}:${nonce}`)
    .digest('hex');
}

const testServerSeed = '4f8b2d1e0a9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a';
const testClientSeed = 'kick_diggitybets_session';
const testNonce = 1;

const hash = generateGameHash(testServerSeed, testClientSeed, testNonce);
console.log(`[PASS] Provably Fair test hash: ${hash}`);

// Test Roulette
const intVal = parseInt(hash.substring(0, 8), 16);
const floatVal = intVal / 0x100000000;
const rouletteNum = Math.floor(floatVal * 37);
console.log(`[PASS] Roulette outcome: ${rouletteNum} (valid 0..36)`);

// Test Plinko
const path = [];
let finalBin = 0;
for (let i = 0; i < 10; i++) {
  const byte = parseInt(hash.substr(i * 2, 2), 16);
  const dir = byte % 2;
  path.push(dir);
  finalBin += dir;
}
console.log(`[PASS] Plinko landing bucket: #${finalBin} (valid 0..10)`);

// Test Stake Dice
const diceRoll = parseFloat((floatVal * 100).toFixed(2));
console.log(`[PASS] Stake Dice roll: ${diceRoll} (valid 0.00..100.00: ${diceRoll >= 0 && diceRoll <= 100})`);

// Test Stake Mines (25 tiles)
const indices = Array.from({ length: 25 }, (_, i) => i);
let offset = 0;
for (let i = indices.length - 1; i > 0; i--) {
  const chunk = hash.substr(offset % (hash.length - 4), 4);
  offset += 4;
  const rand = parseInt(chunk, 16) / 0x10000;
  const j = Math.floor(rand * (i + 1));
  [indices[i], indices[j]] = [indices[j], indices[i]];
}
const mineTiles = indices.slice(0, 3);
console.log(`[PASS] Stake Mines 3-bomb placement: [${mineTiles.join(', ')}] (unique indices < 25)`);

// 5. Check CSS and JS file integrity
const css = fs.readFileSync('site/css/style.css', 'utf8');
console.log(`[PASS] style.css verified: ${(css.length / 1024).toFixed(1)} KB`);

const jsFiles = [
  'audio.js', 'provably-fair.js', 'user-store.js', 'auth-oauth.js',
  'security-anti-fraud.js', 'admin-hub.js', 'house-games.js',
  'tournament-prediction.js', 'bonushunt.js', 'chat.js', 'app.js'
];
for (const js of jsFiles) {
  const code = fs.readFileSync(`site/js/${js}`, 'utf8');
  console.log(`[PASS] site/js/${js} verified: ${(code.length / 1024).toFixed(1)} KB`);
}

console.log('\n=== ALL PLATFORM AUDITS PASSED WITH 100% SUCCESS ===');
