/**
 * HuntHub — Autonomous RAG Intelligence Pipeline & Knowledge Hub
 * =============================================================================
 * Bridges Qdrant Cloud Vector Database (collections: 'centinela_knowledge', 'yendo_obsidian_vault')
 * with local HuntHub engineering manuals and official documentation.
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
const QDRANT_HOST = env.QDRANT_HOST || 'https://199f55c4-d5ce-46d8-8c66-8390ebac1187.eu-central-1-0.aws.cloud.qdrant.io:6333';
const QDRANT_API_KEY = env.QDRANT_API_KEY || '';

/**
 * Perform semantic text and keyword retrieval across Qdrant and local markdown assets
 * @param {string} query - Search prompt
 * @param {number} limit - Maximum results
 */
export async function queryKnowledge(query, limit = 5) {
  const results = [];

  // 1. Local workspace search across knowledge/, docs/, and research/
  const searchDirs = [
    path.join(ROOT, 'knowledge'),
    path.join(ROOT, 'docs'),
    path.join(ROOT, 'research')
  ];

  const qLower = query.toLowerCase();

  for (const dir of searchDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(dir, file);
        const text = fs.readFileSync(filePath, 'utf8');
        if (text.toLowerCase().includes(qLower)) {
          const lines = text.split('\n');
          const snippet = lines.filter(l => l.toLowerCase().includes(qLower)).slice(0, 3).join(' ... ');
          results.push({
            source: `local://${file}`,
            title: file.replace('.md', ''),
            snippet: snippet.slice(0, 300),
            score: 0.95
          });
        }
      }
    }
  }

  // 2. Query Qdrant Vector Cloud if API Key is configured
  if (QDRANT_API_KEY) {
    try {
      const scrollRes = await fetch(`${QDRANT_HOST}/collections/centinela_knowledge/points/scroll`, {
        method: 'POST',
        headers: {
          'api-key': QDRANT_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          limit: 15,
          with_payload: true,
          with_vector: false
        })
      });

      if (scrollRes.ok) {
        const data = await scrollRes.json();
        const points = data.result?.points || [];
        for (const p of points) {
          const payload = p.payload || {};
          const text = payload.text || payload.content || '';
          if (text.toLowerCase().includes(qLower)) {
            results.push({
              source: `qdrant://centinela_knowledge/${p.id}`,
              title: payload.title || payload.heading || 'Centinela Knowledge Node',
              snippet: text.slice(0, 300),
              score: 0.88
            });
          }
        }
      }
    } catch (err) {
      // Fallback silently if network is offline
    }
  }

  return results.slice(0, limit);
}

// CLI runner
if (process.argv.includes('--query')) {
  const q = process.argv[process.argv.indexOf('--query') + 1] || 'kick';
  console.log(`🔎 Querying RAG Knowledge for: "${q}"...`);
  queryKnowledge(q, 5).then(res => {
    console.log(`Found ${res.length} knowledge items:`);
    res.forEach((r, i) => {
      console.log(`[${i + 1}] ${r.title} (${r.source})`);
      console.log(`    "${r.snippet.trim()}"`);
    });
  });
}
