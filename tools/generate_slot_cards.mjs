import fs from 'fs';
import path from 'path';

const slotsData = [
  {
    id: 'wanted-dead-or-a-wild',
    name: 'Wanted Dead or a Wild',
    provider: 'Hacksaw Gaming',
    themeColor: '#ff5722',
    bgGrad: ['#2b0d04', '#120502'],
    icon: '🌵',
    sub: '12,500x MAX WIN'
  },
  {
    id: 'gates-of-olympus',
    name: 'Gates of Olympus 1000',
    provider: 'Pragmatic Play',
    themeColor: '#00e5ff',
    bgGrad: ['#04202c', '#020b12'],
    icon: '⚡',
    sub: '15,000x MAX WIN'
  },
  {
    id: 'le-bandit',
    name: 'Le Bandit',
    provider: 'Hacksaw Gaming',
    themeColor: '#ffd700',
    bgGrad: ['#2a2305', '#120f02'],
    icon: '🦝',
    sub: '10,000x MAX WIN'
  },
  {
    id: 'san-quentin-xways',
    name: 'San Quentin xWays',
    provider: 'Nolimit City',
    themeColor: '#ff2a5f',
    bgGrad: ['#2c040e', '#120206'],
    icon: '⛓️',
    sub: '150,000x MAX WIN'
  },
  {
    id: 'sweet-bonanza',
    name: 'Sweet Bonanza 1000',
    provider: 'Pragmatic Play',
    themeColor: '#ff4081',
    bgGrad: ['#2c0618', '#12020b'],
    icon: '🍭',
    sub: '25,000x MAX WIN'
  },
  {
    id: 'ghost-rush',
    name: 'Ghost Rush',
    provider: 'Paperclip (Stake)',
    themeColor: '#00e676',
    bgGrad: ['#042813', '#011207'],
    icon: '👻',
    sub: '25,000x MAX WIN'
  },
  {
    id: 'tombstone-rip',
    name: 'Tombstone R.I.P.',
    provider: 'Nolimit City',
    themeColor: '#9e9e9e',
    bgGrad: ['#1c1c1c', '#080808'],
    icon: '⚰️',
    sub: '300,000x MAX WIN'
  },
  {
    id: 'sugar-rush',
    name: 'Sugar Rush 1000',
    provider: 'Pragmatic Play',
    themeColor: '#e040fb',
    bgGrad: ['#28042b', '#100112'],
    icon: '🍬',
    sub: '25,000x MAX WIN'
  },
  {
    id: 'rip-city',
    name: 'RIP City',
    provider: 'Hacksaw Gaming',
    themeColor: '#00e5ff',
    bgGrad: ['#05222b', '#010d12'],
    icon: '🐱',
    sub: '12,500x MAX WIN'
  },
  {
    id: 'chaos-crew-2',
    name: 'Chaos Crew 2',
    provider: 'Hacksaw Gaming',
    themeColor: '#76ff03',
    bgGrad: ['#162a03', '#081201'],
    icon: '💀',
    sub: '20,000x MAX WIN'
  },
  {
    id: 'mental',
    name: 'Mental',
    provider: 'Nolimit City',
    themeColor: '#d50000',
    bgGrad: ['#2b0202', '#120101'],
    icon: '🧠',
    sub: '66,666x MAX WIN'
  },
  {
    id: 'fire-in-the-hole-2',
    name: 'Fire in the Hole 2',
    provider: 'Nolimit City',
    themeColor: '#ff9100',
    bgGrad: ['#2a1602', '#120800'],
    icon: '🧨',
    sub: '65,000x MAX WIN'
  },
  {
    id: 'hand-of-anubis',
    name: 'Hand of Anubis',
    provider: 'Hacksaw Gaming',
    themeColor: '#ffd700',
    bgGrad: ['#261e03', '#0e0b01'],
    icon: '👁️',
    sub: '10,000x MAX WIN'
  },
  {
    id: 'dork-unit',
    name: 'Dork Unit',
    provider: 'Hacksaw Gaming',
    themeColor: '#00b0ff',
    bgGrad: ['#031c28', '#010b10'],
    icon: '🎪',
    sub: '10,000x MAX WIN'
  },
  {
    id: 'big-bass-splash',
    name: 'Big Bass Splash',
    provider: 'Pragmatic Play',
    themeColor: '#00e5ff',
    bgGrad: ['#021e29', '#010c11'],
    icon: '🎣',
    sub: '5,000x MAX WIN'
  },
  {
    id: 'blade-dance',
    name: 'Blade Dance',
    provider: 'Phantom (Stake)',
    themeColor: '#00e5ff',
    bgGrad: ['#04202c', '#020b12'],
    icon: '🗡️',
    sub: '25,000x MAX WIN'
  }
];

function generateSVG(slot) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400">
  <defs>
    <linearGradient id="bg-${slot.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${slot.bgGrad[0]}"/>
      <stop offset="100%" stop-color="${slot.bgGrad[1]}"/>
    </linearGradient>
    <linearGradient id="glow-${slot.id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${slot.themeColor}" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="${slot.themeColor}" stop-opacity="0.2"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- Card Background -->
  <rect width="300" height="400" rx="16" fill="url(#bg-${slot.id})" stroke="${slot.themeColor}" stroke-opacity="0.4" stroke-width="2"/>

  <!-- Top Ambient Glow -->
  <circle cx="150" cy="80" r="120" fill="${slot.themeColor}" opacity="0.15"/>

  <!-- Provider Badge -->
  <rect x="20" y="20" width="130" height="24" rx="6" fill="#000000" fill-opacity="0.7" stroke="rgba(255,255,255,0.15)"/>
  <text x="85" y="36" fill="${slot.themeColor}" font-family="'Chakra Petch', sans-serif" font-size="11" font-weight="bold" text-anchor="middle" letter-spacing="0.5">${slot.provider.toUpperCase()}</text>

  <!-- Max Win Badge -->
  <rect x="160" y="20" width="120" height="24" rx="6" fill="#ffd700" fill-opacity="0.15" stroke="#ffd700" stroke-opacity="0.4"/>
  <text x="220" y="36" fill="#ffd700" font-family="'Chakra Petch', sans-serif" font-size="10" font-weight="bold" text-anchor="middle">${slot.sub}</text>

  <!-- Central Icon & Emblem -->
  <g transform="translate(150, 190)">
    <circle cx="0" cy="0" r="65" fill="#000000" fill-opacity="0.4" stroke="${slot.themeColor}" stroke-width="2" stroke-dasharray="4 2"/>
    <text x="0" y="24" font-size="64" text-anchor="middle">${slot.icon}</text>
  </g>

  <!-- Lower Title Banner -->
  <rect x="15" y="305" width="270" height="75" rx="12" fill="#07090e" fill-opacity="0.85" stroke="rgba(255,255,255,0.08)"/>
  <text x="150" y="338" fill="#ffffff" font-family="'Outfit', sans-serif" font-size="17" font-weight="bold" text-anchor="middle">${slot.name}</text>
  <text x="150" y="362" fill="${slot.themeColor}" font-family="'Chakra Petch', sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="1">OFFICIAL VERIFIED SLOT</text>
</svg>`;
}

const outDir = path.join(process.cwd(), 'site', 'images', 'slots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

slotsData.forEach(slot => {
  const filePath = path.join(outDir, `${slot.id}.svg`);
  fs.writeFileSync(filePath, generateSVG(slot));
  console.log(`Generated: ${slot.id}.svg`);
});

console.log(`Successfully generated ${slotsData.length} slot cards!`);
