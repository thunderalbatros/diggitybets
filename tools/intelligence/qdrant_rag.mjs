/**
 * HuntHub — Qdrant Cloud Vector Search & RAG Module
 * =============================================================================
 * Connects directly to Qdrant Vector Cloud cluster with zero bloat.
 * =============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

// Load environment variables
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
const DEFAULT_COLLECTION = env.QDRANT_COLLECTION_OBSIDIAN || 'centinela_knowledge';

export async function listCollections() {
  const res = await fetch(`${QDRANT_HOST}/collections`, {
    headers: { 'api-key': QDRANT_API_KEY }
  });
  if (!res.ok) throw new Error(`Qdrant error: ${res.statusText}`);
  return await res.json();
}

export async function getCollectionInfo(collectionName = DEFAULT_COLLECTION) {
  const res = await fetch(`${QDRANT_HOST}/collections/${collectionName}`, {
    headers: { 'api-key': QDRANT_API_KEY }
  });
  if (!res.ok) throw new Error(`Qdrant error: ${res.statusText}`);
  return await res.json();
}

export async function searchPoints(vector, collectionName = DEFAULT_COLLECTION, limit = 5) {
  const res = await fetch(`${QDRANT_HOST}/collections/${collectionName}/points/search`, {
    method: 'POST',
    headers: {
      'api-key': QDRANT_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      vector,
      limit,
      with_payload: true
    })
  });
  if (!res.ok) throw new Error(`Qdrant search error: ${res.statusText}`);
  return await res.json();
}

export async function upsertPoints(points, collectionName = DEFAULT_COLLECTION) {
  const res = await fetch(`${QDRANT_HOST}/collections/${collectionName}/points`, {
    method: 'PUT',
    headers: {
      'api-key': QDRANT_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ points })
  });
  if (!res.ok) throw new Error(`Qdrant upsert error: ${res.statusText}`);
  return await res.json();
}

// CLI inspection mode
if (process.argv.includes('--test')) {
  listCollections()
    .then(c => console.log('✅ Qdrant Connected! Collections:', JSON.stringify(c.result)))
    .catch(err => console.error('❌ Qdrant Test Error:', err.message));
}
