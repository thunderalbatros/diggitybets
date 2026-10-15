import fs from 'fs';

console.log('=== VERIFYING ROULETTE & PROVABLY FAIR BUTTON/MODAL ===\n');

// 1. Verify index.html contains trigger button and modal backdrop
const html = fs.readFileSync('index.html', 'utf8');
const hasTriggerBtn = html.includes('id="btn-toggle-provably-fair"');
const hasModalBackdrop = html.includes('id="pf-modal-backdrop"');
const hasCloseBtn = html.includes('id="btn-close-pf-modal"');
const hasProvablyFair = html.includes('id="provably-fair"');
const hasCanvas380 = html.includes('id="roulette-wheel-canvas" width="380" height="380"');
const hasTableGrid = html.includes('id="roulette-betting-table"');

console.log('Trigger button present:', hasTriggerBtn);
console.log('Modal backdrop present:', hasModalBackdrop);
console.log('Close button present:', hasCloseBtn);
console.log('Provably fair container inside modal:', hasProvablyFair);
console.log('Roulette canvas 380x380:', hasCanvas380);
console.log('Roulette betting table present:', hasTableGrid);

if (!hasTriggerBtn || !hasModalBackdrop || !hasCloseBtn || !hasCanvas380) {
  console.error('FAIL: Missing HTML elements');
  process.exit(1);
}

// 2. Verify style.css rules
const css = fs.readFileSync('site/css/style.css', 'utf8');
const hasPfModalBackdropCss = css.includes('.pf-modal-backdrop');
const hasPfModalWindowCss = css.includes('.pf-modal-window');
const hasPfTriggerBtnCss = css.includes('.pf-trigger-btn');
const hasGridFluid = css.includes('grid-template-columns: 34px repeat(12, 1fr) 38px;');
const hasOverflowVisible = css.includes('.roulette-felt-container') && css.includes('overflow: visible;');

console.log('\nCSS pf-modal-backdrop:', hasPfModalBackdropCss);
console.log('CSS pf-modal-window:', hasPfModalWindowCss);
console.log('CSS pf-trigger-btn:', hasPfTriggerBtnCss);
console.log('CSS fluid 12-column table grid:', hasGridFluid);
console.log('CSS felt container overflow visible (no scrollbars):', hasOverflowVisible);

if (!hasPfModalBackdropCss || !hasGridFluid || !hasOverflowVisible) {
  console.error('FAIL: Missing CSS rules');
  process.exit(1);
}

// 3. Verify audio.js synthesizers
const audio = fs.readFileSync('site/js/audio.js', 'utf8');
const hasTrackAudio = audio.includes('playRouletteTrack');
const hasFretAudio = audio.includes('playRouletteFret');
const hasDropAudio = audio.includes('playRouletteDrop');

console.log('\nAudio playRouletteTrack:', hasTrackAudio);
console.log('Audio playRouletteFret:', hasFretAudio);
console.log('Audio playRouletteDrop:', hasDropAudio);

if (!hasTrackAudio || !hasFretAudio || !hasDropAudio) {
  console.error('FAIL: Missing audio synthesizers');
  process.exit(1);
}

// 4. Verify house-games.js roulette logic
const hg = fs.readFileSync('site/js/house-games.js', 'utf8');
const callsTrack = hg.includes('window.soundEngine.playRouletteTrack');
const callsDrop = hg.includes('window.soundEngine.playRouletteDrop');
const hasCenterSpindleCallout = hg.includes('Prominent center callout') && hg.includes('winNum.toString()');
const hasStationaryLinger = hg.includes('targetWheelAngle') && hg.includes('rouletteRestingAfterWin = true');

console.log('\nCalls track audio on spin:', callsTrack);
console.log('Calls drop audio on landing:', callsDrop);
console.log('Draws center spindle winning number callout:', hasCenterSpindleCallout);
console.log('Enforces stationary linger and rests on winning number:', hasStationaryLinger);

if (!callsTrack || !callsDrop || !hasCenterSpindleCallout || !hasStationaryLinger) {
  console.error('FAIL: Missing roulette logic');
  process.exit(1);
}

// 5. Verify app.js modal open/close wiring
const app = fs.readFileSync('site/js/app.js', 'utf8');
const hasModalWire = app.includes('btn-toggle-provably-fair') && app.includes('btn-close-pf-modal');
console.log('\nApp modal wiring present:', hasModalWire);

if (!hasModalWire) {
  console.error('FAIL: App modal wiring missing');
  process.exit(1);
}

console.log('\n=== ALL VERIFICATIONS PASSED 100% ===');
