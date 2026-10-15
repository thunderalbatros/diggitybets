/**
 * HuntHub — Firecrawl Fast Dynamic Scraping Engine
 * =============================================================================
 * Connects to Firecrawl API to scrape dynamic JavaScript casino websites,
 * extract game releases, terms, and metadata with clean markdown formatting.
 * =============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

function loadEnv() {
  const env = { ...process.env };
  for (const f of ['.env', '.env.txt']) {
    const p = path.join(ROOT, f);
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8');
      content.split(/\r?\n/).forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match && !env[match[1]]) {
          env[match[1]] = (match[2] || '').trim();
        }
      });
    }
  }
  return env;
}

const env = loadEnv();
const FIRECRAWL_API_KEY = env.FIRECRAWL_API_KEY || '';

export async function scrapeUrl(url, options = {}) {
  if (!FIRECRAWL_API_KEY) {
    throw new Error('FIRECRAWL_API_KEY is not defined in .env');
  }

  const payload = {
    url,
    formats: options.formats || ['markdown', 'links'],
    onlyMainContent: options.onlyMainContent !== undefined ? options.onlyMainContent : true,
    waitFor: options.waitFor || 1500
  };

  const res = await fetch('https://api.firecrawl.dev/v1/scrape', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Firecrawl error (${res.status}): ${errText}`);
  }

  return await res.json();
}

// CLI runner
if (process.argv.includes('--test')) {
  const target = process.argv[3] || 'https://stake.krd/es/casino/group/only-on-stake?sort=newest';
  console.log(`🕷️ Testing Firecrawl on ${target}...`);
  scrapeUrl(target)
    .then(data => {
      console.log('✅ Firecrawl Success!');
      console.log(`Markdown Length: ${(data.data?.markdown || '').length} chars`);
      console.log(`Discovered Links: ${(data.data?.links || []).length}`);
    })
    .catch(err => console.error('❌ Firecrawl Error:', err.message));
}
