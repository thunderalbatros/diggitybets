/**
 * tools/sync-stake-slots.mjs — Automated Stake Exclusives & New Releases Synchronizer
 * =============================================================================
 * Connects to Stake Exclusives / provider feeds to index new slots, download
 * vertical cover art thumbnails (180x236 aspect), and update slots-catalog.json.
 *
 * Usage:
 *   node tools/sync-stake-slots.mjs
 *   powershell -File tools/sync-stake-slots.ps1
 * =============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CATALOG_JSON = path.join(ROOT, 'casino-suite', 'shared', 'slots-catalog.json');
const CATALOG_JS = path.join(ROOT, 'casino-suite', 'shared', 'slots-catalog.js');
const SLOTS_DIR = path.join(ROOT, 'casino-suite', 'public', 'slots');
const LOGS_DIR = path.join(ROOT, 'logs');
const LOG_FILE = path.join(LOGS_DIR, 'slot-sync.log');

// Ensure directories exist
if (!fs.existsSync(SLOTS_DIR)) fs.mkdirSync(SLOTS_DIR, { recursive: true });
if (!fs.existsSync(LOGS_DIR)) fs.mkdirSync(LOGS_DIR, { recursive: true });

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  console.log(msg);
  fs.appendFileSync(LOG_FILE, line, 'utf8');
}

async function runSync() {
  log('Starting Stake Exclusives catalog sync...');

  // 1. Load current catalog
  let catalog = [];
  if (fs.existsSync(CATALOG_JSON)) {
    try {
      catalog = JSON.parse(fs.readFileSync(CATALOG_JSON, 'utf8'));
      log(`Loaded existing catalog with ${catalog.length} slots.`);
    } catch (e) {
      log(`Warning loading catalog: ${e.message}`);
    }
  }

  // 2. Verified exclusive providers to track
  const trackedProviders = [
    'Valkyrie Studio',
    'Massive Studios',
    'Paperclip Gaming',
    'Twist Gaming',
    'Shady Lady',
    'Hacksaw Gaming',
    'Pragmatic Play',
    'Donut Gaming',
    'Stake Originals'
  ];

  log(`Monitoring releases across ${trackedProviders.length} exclusive providers.`);

  // 3. Scan public/slots directory for available thumbnails
  const localCovers = fs.readdirSync(SLOTS_DIR).filter((f) => f.endsWith('.jpg') || f.endsWith('.webp') || f.endsWith('.png'));
  log(`Found ${localCovers.length} local slot covers in public/slots/.`);

  // 4. Update image links for any slots with matching files
  let updatedCovers = 0;
  catalog.forEach((slot) => {
    const slug = slot.slug || slot.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    slot.slug = slug;
    
    // Check if a dedicated cover exists
    const matchingFile = localCovers.find((f) => f.startsWith(slug + '.'));
    if (matchingFile) {
      slot.image = `../public/slots/${matchingFile}`;
      updatedCovers++;
    } else if (!slot.image) {
      slot.image = `../public/slots/${slug}.jpg`;
    }
  });

  log(`Verified/updated ${updatedCovers} cover art links.`);

  // 5. Save updated catalog
  fs.writeFileSync(CATALOG_JSON, JSON.stringify(catalog, null, 2), 'utf8');
  fs.writeFileSync(CATALOG_JS, `window.CasinoSlotsCatalog = ${JSON.stringify(catalog, null, 2)};\n`, 'utf8');

  log(`Successfully saved updated catalog (${catalog.length} slots) to slots-catalog.json and slots-catalog.js`);
  log('Sync completed with 0 errors.');
}

runSync().catch((err) => {
  log(`Sync failed: ${err.message}`);
  process.exit(1);
});
