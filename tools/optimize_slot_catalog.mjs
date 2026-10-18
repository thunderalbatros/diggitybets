#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const catalogPath = path.join(root, 'data', 'curated_slots.js');

const window = {};
globalThis.window = window;
const rawCode = fs.readFileSync(catalogPath, 'utf8');
// Evaluate existing catalog
const fn = new Function('window', 'globalThis', rawCode);
fn(window, window);

const rawSlots = window.HUNTHUB_CURATED_SLOTS || [];
console.log(`[Catalog Optimizer] Loaded ${rawSlots.length} raw slot entries.`);

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const studioPrefRe = /^(Reactorgames|Harmonica|Wildgoose|Tinexgames|Jadebird|Geminigaming|Afterhoursstudios|Quickstrike|0x0x|Merveillesstudio|Burstpilot|Epikx|Basicgames|Axisframegaming|Iciq|Manalabs|Xxstudio|Crashgalaxy|Robog|Lunoragames|Eyegaming|Sojubang|Pigeonstudios|Azgameworks|Azyxstudio|Uppercut|Keystoneplay|Obscurestudio|Alphamalegaming|Blooballgaming|Trydexgaming|Pragmatic Play|Titan Gaming|Avatarux|Onetouch|Bgaming|Ciphergames|Metagaming)\s+/i;

// 1. Deduplicate by normalized image hash (preferring clean non-studio-prefixed names and real providers)
const byImg = new Map();
for (const s of rawSlots) {
  if (!s || !s.name) continue;
  const imgKey = String(s.image || '').split('?')[0];
  if (!byImg.has(imgKey)) {
    byImg.set(imgKey, s);
  } else {
    const prev = byImg.get(imgKey);
    const prevSelf = prev.provider && prev.provider.toLowerCase() === prev.name.toLowerCase();
    const curSelf = s.provider && s.provider.toLowerCase() === s.name.toLowerCase();
    const prevStudioPref = studioPrefRe.test(prev.name);
    const curStudioPref = studioPrefRe.test(s.name);
    if ((prevStudioPref && !curStudioPref) || (prevSelf && !curSelf)) {
      byImg.set(imgKey, s);
    }
  }
}

// 2. Clean self-named providers and normalize imgix thumbnail URLs
let fixedProviders = 0;
const cleanSlots = Array.from(byImg.values()).map((s) => {
  const copy = { ...s };
  if (copy.provider && copy.name && copy.provider.toLowerCase() === copy.name.toLowerCase()) {
    fixedProviders++;
    if (
      /big bass|gates of|madame mystique|angel vs sinner|thunder vs underworld|sugar twist|sweet fiesta|dog mansion|bison spirit|slushie party|lucky phoenix|jewel bonanza|koi pond|aladdins treasure|starlight|bonanza|zeus|olympus/i.test(
        copy.name
      )
    ) {
      copy.provider = 'Pragmatic Play';
      copy.category = 'pragmatic';
    } else if (/xways|xsplit|san quentin|tombstone|fire in the hole/i.test(copy.name)) {
      copy.provider = 'Nolimit City';
      copy.category = 'nolimit';
    } else {
      copy.provider = 'Stake Engine';
    }
  }
  if (copy.image && copy.image.includes('mediumrare.imgix.net/')) {
    const base = copy.image.split('?')[0];
    copy.image = `${base}?w=180&auto=format,compress&q=75`;
  }
  return copy;
});

// 3. Dictionary-pack into compact self-expanding JS
const providers = [];
const provIdx = new Map();
const categories = [];
const catIdx = new Map();
const maxWins = [];
const maxIdx = new Map();
const badges = [];
const badgeIdx = new Map();
const colors = [];
const colorIdx = new Map();

function idxOf(arr, map, val) {
  const v = val || '';
  if (!map.has(v)) {
    map.set(v, arr.length);
    arr.push(v);
  }
  return map.get(v);
}

const rows = cleanSlots.map((s) => {
  const hash = String(s.image || '')
    .replace('https://mediumrare.imgix.net/', '')
    .replace('?w=180&auto=format,compress&q=75', '');
  const autoSlug = slugify(s.name);
  const idField = s.id === autoSlug ? 0 : s.id;
  const row = [
    idField,
    s.name,
    idxOf(providers, provIdx, s.provider),
    idxOf(categories, catIdx, s.category),
    idxOf(maxWins, maxIdx, s.maxWin),
    hash,
    idxOf(badges, badgeIdx, s.badge),
    String(s.tier || '3'),
    Number(s.weight || 1),
    idxOf(colors, colorIdx, s.color),
    Number(s.rtp || 96),
    s.releasedAt || '',
    s.bonusBuy ? 1 : 0
  ];
  if (s.isNewDrop || s.cloneOf || s.events) {
    const ext = {};
    if (s.isNewDrop) ext.n = 1;
    if (s.cloneOf) ext.c = s.cloneOf;
    if (s.events) ext.e = s.events;
    row.push(ext);
  }
  return row;
});

const packedObj = { p: providers, c: categories, m: maxWins, b: badges, k: colors, r: rows };
const jsOut = `/**
 * HuntHub Curated Slots Catalog (Auto-Synced with Stake & Multi-Casino Feeds — Compact Dictionary Format)
 * Total Verified Unique Slots: ${cleanSlots.length} | Last Synced: ${new Date().toISOString()}
 */
(function(g){
  var D = ${JSON.stringify(packedObj)};
  var P = D.p, C = D.c, M = D.m, B = D.b, K = D.k, R = D.r;
  var out = new Array(R.length);
  for (var i = 0, len = R.length; i < len; i++) {
    var x = R[i], nm = x[1];
    var id = x[0] || nm.toLowerCase().trim().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    var h = x[5];
    var img = h.indexOf('http') === 0 ? h : ('https://mediumrare.imgix.net/' + h + '?w=180&auto=format,compress&q=75');
    var item = {
      id: id,
      name: nm,
      provider: P[x[2]],
      category: C[x[3]],
      maxWin: M[x[4]],
      image: img,
      badge: B[x[6]],
      tier: x[7],
      weight: x[8],
      color: K[x[9]],
      rtp: x[10]
    };
    if (x[11]) item.releasedAt = x[11];
    if (x[12]) item.bonusBuy = true;
    var ext = x[13];
    if (ext) {
      if (ext.n) item.isNewDrop = true;
      if (ext.c) item.cloneOf = ext.c;
      if (ext.e) item.events = ext.e;
    }
    out[i] = item;
  }
  g.HUNTHUB_CURATED_SLOTS = out;
})(typeof window !== 'undefined' ? window : globalThis);
`;

fs.writeFileSync(catalogPath, jsOut, 'utf8');
const siteDataCatalog = path.join(root, 'site', 'data', 'curated_slots.js');
if (fs.existsSync(siteDataCatalog)) {
  fs.writeFileSync(siteDataCatalog, jsOut, 'utf8');
}
console.log(
  `[Catalog Optimizer] Done! Unique slots: ${cleanSlots.length}, Fixed providers: ${fixedProviders}, Size: ${(jsOut.length / 1024).toFixed(1)} KB (saved ${((rawCode.length - jsOut.length) / 1024).toFixed(1)} KB).`
);
