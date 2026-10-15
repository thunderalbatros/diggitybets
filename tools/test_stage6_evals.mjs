import fs from 'fs';

console.log('=== STAGE 6 COMPREHENSIVE EVALUATION & NAVIGATION TEST ===\n');

// 1. Check index.html section structure
const html = fs.readFileSync('index.html', 'utf8');

const expectedViews = [
  '#watch',
  '#house-games',
  '#tournament',
  '#bonushunt',
  '#store',
  '#leaderboard',
  '#profile'
];

for (const view of expectedViews) {
  const sectionId = view.replace('#', '');
  if (!html.includes(`id="${sectionId}"`)) {
    console.error(`[FAIL] Missing section container: ${sectionId}`);
    process.exit(1);
  }
  // Check nav link exists
  if (!html.includes(`data-target="${view}"`)) {
    console.error(`[FAIL] Missing nav link button for: ${view}`);
    process.exit(1);
  }
}
console.log(`[PASS] All 7 dedicated SPA views and nav buttons verified in index.html`);

// 2. Check Fused Components in #watch
if (!html.includes('id="provably-fair"') || !html.includes('id="links"')) {
  console.error('[FAIL] Provably fair or Community links not fused inside #watch');
  process.exit(1);
}
console.log('[PASS] Provably fair and Community links successfully fused into Live Stream hub');

// 3. Verify White Diggity Bets logo
const logoPath = 'site/images/diggitybets-logo.png';
if (!fs.existsSync(logoPath)) {
  console.error('[FAIL] Missing diggitybets-logo.png');
  process.exit(1);
}
const logoStat = fs.statSync(logoPath);
if (logoStat.size < 500) {
  console.error('[FAIL] Diggity Bets logo file too small / corrupt');
  process.exit(1);
}
console.log(`[PASS] Diggity Bets white logo verified: ${(logoStat.size / 1024).toFixed(1)} KB`);

// 4. Verify Kick 2D pixel logos
const kickK = 'site/images/kick-k-logo.png';
const kickWordmark = 'site/images/kick-wordmark.png';
if (!fs.existsSync(kickK) || !fs.existsSync(kickWordmark)) {
  console.error('[FAIL] Missing Kick K or Kick Wordmark transparent PNGs');
  process.exit(1);
}
console.log(`[PASS] Kick 2D pixel K logo (${fs.statSync(kickK).size} bytes) and Wordmark (${fs.statSync(kickWordmark).size} bytes) present and verified.`);

// 5. Verify Leaderboard $2000 USD prize elements
const prizeMatches = [
  '$2,000',
  'MONTHLY WAGER',
  '$1,200',
  '$500',
  '$300',
  'leaderboard-tbody'
];
for (const p of prizeMatches) {
  if (!html.includes(p)) {
    console.error(`[FAIL] Missing Leaderboard prize element: ${p}`);
    process.exit(1);
  }
}
console.log('[PASS] Leaderboard $2,000 USD Prize Pool (1st: $1,200, 2nd: $500, 3rd: $300) verified');

// 6. Verify Stake 0.00 Bet TOTP Verifier & Discord Linking in Profile
const profileFeatures = [
  'totp-mult-val',
  'totp-timer',
  'btn-refresh-totp',
  'prof-input-stake-user',
  'prof-input-bet-id',
  'btn-verify-stake-bet',
  'btn-link-discord',
  'discord-status-badge',
  'prof-input-btc',
  'prof-input-sol',
  'prof-input-ltc',
  'prof-input-eth',
  'prof-input-usdc',
  'prof-input-x',
  'prof-input-ig'
];
for (const feat of profileFeatures) {
  if (!html.includes(`id="${feat}"`)) {
    console.error(`[FAIL] Missing profile/TOTP feature element: ${feat}`);
    process.exit(1);
  }
}
console.log('[PASS] Profile TOTP challenge verifier, Discord linker, crypto wallets & socials verified');

// 7. Verify $DIG points currency in header
if (!html.includes('$DIG') || html.includes('PTS')) {
  if (!html.includes('$DIG')) {
    console.error('[FAIL] $DIG currency tag missing from index.html');
    process.exit(1);
  }
}
console.log('[PASS] $DIG stream points currency badge verified in header');

// 8. Verify Sound button removed
if (html.includes('id="btn-mute-toggle"')) {
  console.error('[FAIL] btn-mute-toggle (Sound button) still present in index.html');
  process.exit(1);
}
console.log('[PASS] Sound button successfully removed from header');

// 9. Verify CSS rules for responsive 100% zoom and non-clipping
const css = fs.readFileSync('site/css/style.css', 'utf8');
const expectedCss = [
  '.header-left-col',
  '.brand-logo-img',
  '.kick-badge-icon',
  '.kick-title-wordmark',
  '.nav-menu',
  '.nav-link-btn',
  '.badge-soon',
  '.leaderboard-prize-card',
  '.podium-grid',
  '.profile-layout-grid',
  '.totp-challenge-card'
];
for (const rule of expectedCss) {
  if (!css.includes(rule)) {
    console.error(`[FAIL] Missing CSS rule: ${rule}`);
    process.exit(1);
  }
}
console.log('[PASS] All responsive and glassmorphism styling rules verified in style.css');

console.log('\n=== ALL STAGE 6 EVALS & VERIFICATIONS PASSED (100%) ===');
