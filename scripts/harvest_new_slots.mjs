/**
 * HuntHub — Automated Periodic Slot Harvester (Every 72 Hours)
 * =============================================================================
 * Connects to Firecrawl API and official provider feeds to discover new slot releases.
 * Automatically diffs with references/slots_db.json and updates all suite catalogs.
 *
 * Usage:
 *   node scripts/harvest_new_slots.mjs            (run once on-demand)
 *   node scripts/harvest_new_slots.mjs --daemon   (runs every 72h continuously)
 * =============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// Load environment variables from .env or .env.txt
let firecrawlKey = process.env.FIRECRAWL_API_KEY || '';
let serperKey = process.env.SERPER_API_KEY || '';

for (const envFile of ['.env', '.env.txt', '.dev.vars']) {
  const p = path.join(ROOT, envFile);
  if (fs.existsSync(p)) {
    const envContent = fs.readFileSync(p, 'utf8');
    const fireMatch = envContent.match(/FIRECRAWL_API_KEY\s*=\s*([^\r\n]+)/);
    if (fireMatch && !firecrawlKey) firecrawlKey = fireMatch[1].trim();
    const serperMatch = envContent.match(/SERPER_API_KEY\s*=\s*([^\r\n]+)/);
    if (serperMatch && !serperKey) serperKey = serperMatch[1].trim();
  }
}

const SLOTS_DB_PATH = path.join(ROOT, 'references', 'slots_db.json');

console.log('🎰 [HuntHub Harvester] Checking for New Slot Releases...');
console.log(`📁 Target DB: ${SLOTS_DB_PATH}`);
console.log(`🔑 Firecrawl API Key present: ${Boolean(firecrawlKey)}`);

async function harvest() {
  const existingDb = JSON.parse(fs.readFileSync(SLOTS_DB_PATH, 'utf8'));
  const existingNames = new Set(existingDb.map(s => (s.name || '').toLowerCase().trim()));
  console.log(`📊 Current catalog size: ${existingDb.length} slots`);

  const newlyDiscovered = [];

  // 1. Check if user dropped a recent harvest file in references/
  const refFiles = fs.readdirSync(path.join(ROOT, 'references'));
  for (const f of refFiles) {
    if (f.startsWith('stake_slots_harvest_') && f.endsWith('.json')) {
      console.log(`🔍 Processing manual dump file: references/${f}`);
      try {
        const dump = JSON.parse(fs.readFileSync(path.join(ROOT, 'references', f), 'utf8'));
        for (const item of dump) {
          const norm = (item.name || '').toLowerCase().trim();
          if (norm && !existingNames.has(norm)) {
            existingNames.add(norm);
            newlyDiscovered.push(item);
          }
        }
      } catch (err) {
        console.warn(`Could not parse ${f}:`, err.message);
      }
    }
  }

  // Helper to detect real studio provider from slug and title (Only on Stake is the section, not the studio!)
  function detectProvider(slug, name, defaultProv) {
    const combined = (slug + ' ' + name).toLowerCase();
    if (/cipher/i.test(combined)) return 'Cipher Games';
    if (/meta\s*gaming/i.test(combined)) return 'Meta Gaming';
    if (/pragmatic|gates|sweet bonanza|sugar rush|dog house|starlight/i.test(combined)) return 'Pragmatic Play';
    if (/hacksaw|wanted dead|le bandit|rip city|dork unit|chaos crew|fist of/i.test(combined)) return 'Hacksaw Gaming';
    if (/valkyrie|odin|vault|waylander/i.test(combined)) return 'Valkyrie';
    if (/paperclip/i.test(combined)) return 'Paperclip Gaming';
    if (/pocket\s*play/i.test(combined)) return 'Pocket Play';
    if (/blackout/i.test(combined)) return 'Blackout Studios';
    if (/colorful\s*play/i.test(combined)) return 'Colorful Play';
    if (/titan/i.test(combined)) return 'Titan Gaming';
    if (/donut/i.test(combined)) return 'Donut Gaming';
    if (/creative\s*city/i.test(combined)) return 'Creative City';
    if (/terminal/i.test(combined)) return 'Terminal Games';
    if (/black\s*coffee/i.test(combined)) return 'Black Coffee Studios';
    if (/avatar\s*ux/i.test(combined)) return 'AvatarUX';
    if (/phantom/i.test(combined)) return 'Phantom Interactive';
    if (/uppercut/i.test(combined)) return 'Uppercut Gaming';
    if (/hyper\s*play/i.test(combined)) return 'Hyper Play';
    if (/nolimit|san quentin|mental|tombstone/i.test(combined)) return 'Nolimit City';
    return defaultProv || 'Stake Studio Exclusives';
  }

  // 2. Automated web scraping targeting Stake mirror section (https://stake.krd/es/casino/group/only-on-stake?sort=newest)
  const targetUrls = [
    { url: 'https://stake.krd/es/casino/group/only-on-stake?sort=newest', section: 'only-on-stake', defaultProvider: 'Stake Studio Exclusives' },
    { url: 'https://stake.krd/es/casino/group/cipher-games', section: 'only-on-stake', defaultProvider: 'Cipher Games' },
    { url: 'https://stake.krd/es/casino/group/meta-gaming', section: 'only-on-stake', defaultProvider: 'Meta Gaming' }
  ];

  if (firecrawlKey) {
    console.log('🔥 Scraping target pages via Firecrawl API...');
    for (const target of targetUrls) {
      try {
        console.log(`📡 Scraping: ${target.url}`);
        const res = await fetch('https://api.firecrawl.dev/v1/scrape', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${firecrawlKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: target.url,
            formats: ['markdown', 'links']
          })
        });
        const data = await res.json();
        if (data.success && data.data) {
          console.log(`✅ Firecrawl response received for ${target.section} (${target.defaultProvider})`);
          const links = data.data.links || [];
          for (const link of links) {
            // Find game links matching /casino/games/
            const gameMatch = link.match(/\/casino\/games\/([a-z0-9-]+)/i);
            if (gameMatch) {
              const slug = gameMatch[1];
              const cleanName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
              const norm = cleanName.toLowerCase().trim();
              if (norm && !existingNames.has(norm)) {
                existingNames.add(norm);
                const resolvedProvider = detectProvider(slug, cleanName, target.defaultProvider);
                newlyDiscovered.push({
                  name: cleanName,
                  provider: resolvedProvider,
                  section: 'only-on-stake',
                  category: 'stake',
                  image: `https://mediumrare.imgix.net/games/${slug}.png?w=180&h=236&fit=min&auto=format`
                });
              }
            }
          }
        }
      } catch (err) {
        console.warn(`Firecrawl scrape error on ${target.url}:`, err.message);
      }
    }
  }

  // Fallback to Serper Google Search if Firecrawl didn't discover slots
  if (newlyDiscovered.length === 0 && serperKey) {
    console.log('🌐 Querying recent slot releases via Serper Google Search API...');
    try {
      const res = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'X-API-KEY': serperKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: 'site:stake.krd "Only on Stake" new release slot 2026',
          num: 10
        })
      });
      const data = await res.json();
      if (data.organic) {
        console.log(`Found ${data.organic.length} search results on stake.krd`);
      }
    } catch (e) {
      console.warn('Serper search fallback error:', e.message);
    }
  }

  if (newlyDiscovered.length > 0) {
    console.log(`🎉 Found ${newlyDiscovered.length} brand new slots! Adding to database...`);
    const updatedDb = [...newlyDiscovered, ...existingDb];
    fs.writeFileSync(SLOTS_DB_PATH, JSON.stringify(updatedDb, null, 2), 'utf8');

    // Run catalog sync to update wheels and overlays
    console.log('🔄 Re-syncing global catalog across all wheels and overlays...');
    execSync('node tools/enrich_and_sync_catalog.mjs', { cwd: ROOT, stdio: 'inherit' });
    console.log('✅ Global catalog updated successfully!');
  } else {
    console.log('✨ All slots in database are currently up to date. No new releases found today.');
  }
}

// Execute harvest
harvest().catch(err => {
  console.error('Harvester error:', err);
});

// Daemon mode for recurring execution every 72 hours
if (process.argv.includes('--daemon')) {
  const SEVENTY_TWO_HOURS = 72 * 60 * 60 * 1000;
  console.log(`⏳ Daemon running: will check for new releases every 72 hours (3 days)...`);
  setInterval(() => {
    harvest().catch(console.error);
  }, SEVENTY_TWO_HOURS);
}
