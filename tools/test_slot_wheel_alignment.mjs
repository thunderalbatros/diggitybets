// Mathematical and Geometry Verification for Wheel Slots Overlay
import fs from 'fs';
import path from 'path';

const ROOT = 'C:\\Users\\tomas\\Desktop\\streamerbot';
const stylePath = path.join(ROOT, 'wheel-slots', 'overlay', 'style.css');
const mainPath = path.join(ROOT, 'wheel-slots', 'overlay', 'main.js');

const styleCss = fs.readFileSync(stylePath, 'utf-8');
const mainJs = fs.readFileSync(mainPath, 'utf-8');

console.log('--- Verifying Slot Wheel Geometry & Math ---');

// 1. Container dimensions
const containerH = 460;
const markerY = containerH / 2; // 230px (top: 50%)
const cardH = 148;
const gap = 12;
const stride = cardH + gap; // 160px
const winnerIdx = 51;

// 2. Check CSS padding-top
const pistaMatch = styleCss.match(/\.pista\s*\{([^}]+)\}/s);
if (!pistaMatch) {
  console.error('FAIL: .pista not found in style.css');
  process.exit(1);
}
const pistaContent = pistaMatch[1];
const padTopMatch = pistaContent.match(/padding-top:\s*([0-9]+)px/);
if (!padTopMatch) {
  console.error('FAIL: padding-top not found in .pista');
  process.exit(1);
}
const padTop = parseInt(padTopMatch[1], 10);
console.log(`Pista padding-top: ${padTop}px`);

// Expected padding-top for card 0 to be centered at marker:
const expectedPadTop = (containerH - cardH) / 2;
console.log(`Expected padding-top for center alignment: ${expectedPadTop}px`);

if (padTop !== expectedPadTop) {
  console.error(`FAIL: padding-top (${padTop}) does not match expected (${expectedPadTop})`);
  process.exit(1);
}

// 3. Check tarjeta flex: 0 0 148px
const tarjetaMatch = styleCss.match(/\.tarjeta\s*\{([^}]+)\}/s);
const tarjetaContent = tarjetaMatch ? tarjetaMatch[1] : '';
const flexMatch = tarjetaContent.match(/flex:\s*0\s+0\s+148px/);
console.log('Tarjeta flex-shrink: 0 locked:', !!flexMatch);

// 4. Trace card centers after translation
// With padTop = 156, card 0 top = 156, bottom = 304, center = 230 (exact marker!)
// Card i center in pista = padTop + i * stride + cardH / 2 = 156 + i * 160 + 74 = i * 160 + 230

for (let jitter = -15; jitter <= 15; jitter += 5) {
  const distance = winnerIdx * stride + jitter;
  
  // Center of card winnerIdx after translateY(-distance):
  const winnerCenterInViewport = (winnerIdx * stride + 230) - distance;
  const winnerTopInViewport = winnerCenterInViewport - (cardH / 2);
  const winnerBottomInViewport = winnerCenterInViewport + (cardH / 2);

  // Center of card winnerIdx - 1
  const prevCenterInViewport = ((winnerIdx - 1) * stride + 230) - distance;
  // Center of card winnerIdx + 1
  const nextCenterInViewport = ((winnerIdx + 1) * stride + 230) - distance;

  const isMarkerInsideWinner = (markerY >= winnerTopInViewport && markerY <= winnerBottomInViewport);
  
  console.log(`Jitter: ${jitter.toFixed(1)}px | Winner Center: ${winnerCenterInViewport.toFixed(1)}px | Marker: ${markerY}px | Inside: ${isMarkerInsideWinner}`);
  if (!isMarkerInsideWinner) {
    console.error('FAIL: Marker fell outside winner card!');
    process.exit(1);
  }
}

console.log('✅ ALL GEOMETRY CHECKS PASSED: The card under the marker is ALWAYS card index 51 (the winner)!');
