/**
 * Diggity Bets — Deterministic SVG Avatar Generator
 * Inspired by DiceBear (@dicebear/core) & Phosphor Duotone.
 * Generates unique, vector cyberpunk/casino avatars deterministically from username hashes.
 * Zero external requests, zero dependencies, zero layout shifts, zero Windows emojis.
 */

(function (window) {
  'use strict';

  function fnv1a(str) {
    let h = 2166136261 >>> 0;
    const s = String(str || 'Guest');
    for (let i = 0; i < s.length; i++) {
      h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0;
    }
    return h;
  }

  const PALETTES = [
    { bg1: '#0a1d12', bg2: '#042f1a', stroke: '#53fc18', glow: 'rgba(83,252,24,0.35)', fill: '#53fc18' },
    { bg1: '#261b05', bg2: '#4a3307', stroke: '#ffd700', glow: 'rgba(255,215,0,0.35)', fill: '#ffd700' },
    { bg1: '#061c2b', bg2: '#0b3954', stroke: '#00e5ff', glow: 'rgba(0,229,255,0.35)', fill: '#00e5ff' },
    { bg1: '#210826', bg2: '#41144c', stroke: '#ec4899', glow: 'rgba(236,72,153,0.35)', fill: '#ec4899' },
    { bg1: '#230a10', bg2: '#451320', stroke: '#ff2a5f', glow: 'rgba(255,42,95,0.35)', fill: '#ff2a5f' },
    { bg1: '#09182a', bg2: '#163256', stroke: '#38bdf8', glow: 'rgba(56,189,248,0.35)', fill: '#38bdf8' },
    { bg1: '#1a102f', bg2: '#33205d', stroke: '#a855f7', glow: 'rgba(168,85,247,0.35)', fill: '#a855f7' }
  ];

  // Vector Emblems (SVG Path / Geometry centered in 64x64 viewport)
  const EMBLEMS = [
    // 0: Crown / King
    '<path d="M18 42 L46 42 L48 24 L38 31 L32 20 L26 31 L16 24 Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>',
    // 1: Diamond / Gem
    '<path d="M32 18 L46 32 L32 46 L18 32 Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>',
    // 2: Lightning Bolt
    '<path d="M34 16 L22 34 L31 34 L28 48 L42 28 L33 28 Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>',
    // 3: Cyber Visor / Shield
    '<path d="M20 22 H44 V36 C44 42 38 46 32 48 C26 46 20 42 20 36 Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><line x1="24" y1="30" x2="40" y2="30" stroke="currentColor" stroke-width="2"/>',
    // 4: Hexagon Core
    '<polygon points="32,16 46,24 46,40 32,48 18,40 18,24" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="2.5"/><circle cx="32" cy="32" r="4" fill="currentColor"/>',
    // 5: Star Burst / Spark
    '<path d="M32 16 L35 28 L47 32 L35 36 L32 48 L29 36 L17 32 L29 28 Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>',
    // 6: Casino Dice pip
    '<rect x="20" y="20" width="24" height="24" rx="5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="2.5"/><circle cx="26" cy="26" r="2.5" fill="currentColor"/><circle cx="32" cy="32" r="2.5" fill="currentColor"/><circle cx="38" cy="38" r="2.5" fill="currentColor"/>',
    // 7: Crosshairs / Target
    '<circle cx="32" cy="32" r="13" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="32" cy="32" r="4" fill="currentColor"/><line x1="32" y1="14" x2="32" y2="20" stroke="currentColor" stroke-width="2.5"/><line x1="32" y1="44" x2="32" y2="50" stroke="currentColor" stroke-width="2.5"/><line x1="14" y1="32" x2="20" y2="32" stroke="currentColor" stroke-width="2.5"/><line x1="44" y1="32" x2="50" y2="32" stroke="currentColor" stroke-width="2.5"/>'
  ];

  function generateAvatarSvg(username, size = 48) {
    const raw = String(username || 'guest').trim();
    const hash = fnv1a(raw.toLowerCase());
    
    const paletteIndex = hash % PALETTES.length;
    const palette = PALETTES[paletteIndex];
    
    const emblemIndex = (hash >>> 4) % EMBLEMS.length;
    const emblem = EMBLEMS[emblemIndex];

    const initial = (raw.replace(/^[@$]/, '')[0] || 'D').toUpperCase();
    const gradId = 'd-grad-' + (hash & 0xffff).toString(16);

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}" style="border-radius:50%;display:inline-block;vertical-align:middle;box-shadow:0 0 12px ${palette.glow};flex-shrink:0;">
      <defs>
        <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${palette.bg2}"/>
          <stop offset="100%" stop-color="${palette.bg1}"/>
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#${gradId})" stroke="${palette.stroke}" stroke-width="2"/>
      <g color="${palette.stroke}">
        ${emblem}
      </g>
      <text x="32" y="58" font-family="'Chakra Petch', sans-serif" font-size="9" font-weight="700" fill="${palette.stroke}" text-anchor="middle" letter-spacing="0.5">${initial}</text>
    </svg>`;
  }

  function generateAvatarDataUri(username, size = 48) {
    const svg = generateAvatarSvg(username, size);
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // Export globally
  window.getDeterministicAvatarSvg = generateAvatarSvg;
  window.getDeterministicAvatarDataUri = generateAvatarDataUri;

  // Replace any existing emoji avatars in page on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    // Replace podium avatars if present
    const pSilver = document.querySelector('.podium-card.silver .podium-avatar');
    if (pSilver) pSilver.innerHTML = generateAvatarSvg('NachoSpin', 54);

    const pGold = document.querySelector('.podium-card.gold .podium-avatar');
    if (pGold) pGold.innerHTML = generateAvatarSvg('GS8***', 62);

    const pBronze = document.querySelector('.podium-card.bronze .podium-avatar');
    if (pBronze) pBronze.innerHTML = generateAvatarSvg('ZeusMax', 54);

    console.log('[DiggityBets Avatar Generator] DiceBear-style deterministic vector avatars active (0 emojis).');
  });

})(window);
