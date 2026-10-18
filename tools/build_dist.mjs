import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

console.log('=== BUILDING CLOUDFLARE PRODUCTION PAYLOAD (dist/) ===\n');

// 1. Clean and recreate dist
if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}
fs.mkdirSync(dist, { recursive: true });

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

// 2. Copy core web assets & public Agentic SEO manifests (exclude internal agent rules from public dist/)
console.log('• Copying index.html, Agentic SEO manifests (llms.txt, robots.txt) and site assets...');
fs.copyFileSync(path.join(root, 'index.html'), path.join(dist, 'index.html'));
for (const rootDoc of ['favicon.ico', 'llms.txt', 'robots.txt']) {
  if (fs.existsSync(path.join(root, rootDoc))) {
    fs.copyFileSync(path.join(root, rootDoc), path.join(dist, rootDoc));
  }
}
copyRecursive(path.join(root, 'site'), path.join(dist, 'site'));

// 3. Copy slot catalog and tiers
console.log('• Copying curated slot database & tiers...');
fs.mkdirSync(path.join(dist, 'data'), { recursive: true });
if (fs.existsSync(path.join(root, 'data', 'curated_slots.js'))) {
  fs.copyFileSync(path.join(root, 'data', 'curated_slots.js'), path.join(dist, 'data', 'curated_slots.js'));
}
if (fs.existsSync(path.join(root, 'data', 'curated_slots.json'))) {
  fs.copyFileSync(path.join(root, 'data', 'curated_slots.json'), path.join(dist, 'data', 'curated_slots.json'));
}
if (fs.existsSync(path.join(root, 'data', 'slot_tiers.js'))) {
  fs.copyFileSync(path.join(root, 'data', 'slot_tiers.js'), path.join(dist, 'data', 'slot_tiers.js'));
}

// 3.5 Copy overlays and casino suite for OBS Browser Sources
console.log('• Copying overlays & casino suite...');
const overlayDirs = ['casino-suite', 'overlay-battle', 'overlay-tourney', 'overlay-bonushunt', 'overlay-celebration', 'overlay-slotrequests', 'wheel-duo', 'wheel-slots', 'wheel-csgo'];
for (const d of overlayDirs) {
  if (fs.existsSync(path.join(root, d))) {
    copyRecursive(path.join(root, d), path.join(dist, d));
  }
}

// 4. Map Stake Originals direct assets (/assets/, /dino-assets/)
console.log('• Mapping Stake Originals assets...');
const stakeAssets = path.join(root, 'site', 'stake-games', 'assets');
const stakeDino = path.join(root, 'site', 'stake-games', 'dino-assets');
if (fs.existsSync(stakeAssets)) copyRecursive(stakeAssets, path.join(dist, 'assets'));
if (fs.existsSync(stakeDino)) copyRecursive(stakeDino, path.join(dist, 'dino-assets'));

// 5. Generate Cloudflare _headers (Security, CSP, HSTS, COOP, Brotli, Caching)
console.log('• Generating Cloudflare _headers...');
const headersContent = `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Cross-Origin-Opener-Policy: same-origin-allow-popups
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Content-Security-Policy: object-src 'none'; base-uri 'self'; frame-ancestors 'self';

/site/css/*
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400

/site/js/*
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400

/site/images/*
  Cache-Control: public, max-age=2592000, immutable

/assets/*
  Cache-Control: public, max-age=2592000, immutable
`;
fs.writeFileSync(path.join(dist, '_headers'), headersContent.trim() + '\n', 'utf8');

// 6. Cloudflare SPA routing is handled natively via wrangler.toml:
// not_found_handling = "single-page-application" (avoids infinite loops with .html stripping)


// 7. Calculate bundle metrics
function dirMetrics(dirPath) {
  let count = 0;
  let totalBytes = 0;
  function walk(p) {
    for (const item of fs.readdirSync(p)) {
      const full = path.join(p, item);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) walk(full);
      else { count++; totalBytes += stat.size; }
    }
  }
  walk(dirPath);
  return { count, totalBytes };
}

const { count, totalBytes } = dirMetrics(dist);
console.log(`\n[SUCCESS] dist/ built cleanly: ${count} files, ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);
console.log('Ready for instant zero-card deployment via Cloudflare Pages or Cloudflare Workers Static Assets!\n');
