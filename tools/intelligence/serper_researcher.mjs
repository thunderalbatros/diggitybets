/**
 * HuntHub — Serper High-Speed Web Intelligence & Search
 * =============================================================================
 * Real-time Google search for latest casino releases, slot mechanics, RTP data,
 * and Kick developer documentation updates.
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
const SERPER_API_KEY = env.SERPER_API_KEY || '';

export async function searchWeb(query, limit = 5) {
  if (!SERPER_API_KEY) {
    throw new Error('SERPER_API_KEY is not defined in .env');
  }

  const res = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: {
      'X-API-KEY': SERPER_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      q: query,
      num: limit
    })
  });

  if (!res.ok) {
    throw new Error(`Serper search error: ${res.statusText}`);
  }

  return await res.json();
}

// CLI runner
if (process.argv.includes('--test')) {
  const q = process.argv[3] || 'site:stake.krd "Only on Stake" 2026';
  console.log(`🔍 Searching via Serper: "${q}"...`);
  searchWeb(q, 3)
    .then(data => {
      console.log(`✅ Results found: ${(data.organic || []).length}`);
      (data.organic || []).forEach((item, idx) => {
        console.log(`  [${idx + 1}] ${item.title} -> ${item.link}`);
      });
    })
    .catch(err => console.error('❌ Serper Error:', err.message));
}
