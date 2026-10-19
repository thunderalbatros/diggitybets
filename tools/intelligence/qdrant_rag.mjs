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
const QDRANT_HOST = env.QDRANT_HOST || '';
const QDRANT_API_KEY = env.QDRANT_API_KEY || '';
const DEFAULT_COLLECTION = env.QDRANT_COLLECTION_OBSIDIAN || 'centinela_knowledge';

/**
 * Strips prompt-injection directives, RTL overrides, and control characters
 * from untrusted external text before storing in the Qdrant vector database.
 */
export function sanitizeRagPayload(value) {
  if (typeof value === 'string') {
    return value
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u202A-\u202E\u2066-\u2069]/g, '')
      .replace(/<\s*\/?\s*(system|instruction|prompt|tool_call|function_call)[^>]*>/gi, '[REDACTED_TAG]')
      .replace(/ignore\s+(all\s+)?(previous|prior)\s+instructions/gi, '[REDACTED_INJECTION]')
      .slice(0, 16000);
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeRagPayload);
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = sanitizeRagPayload(v);
    }
    return out;
  }
  return value;
}

export async function listCollections() {
  if (!QDRANT_HOST) throw new Error('QDRANT_HOST is not configured in .env');
  const res = await fetch(`${QDRANT_HOST}/collections`, {
    signal: AbortSignal.timeout(3500),
    headers: { 'api-key': QDRANT_API_KEY }
  });
  if (!res.ok) throw new Error(`Qdrant error: ${res.statusText}`);
  return await res.json();
}

export async function getCollectionInfo(collectionName = DEFAULT_COLLECTION) {
  if (!QDRANT_HOST) throw new Error('QDRANT_HOST is not configured in .env');
  const res = await fetch(`${QDRANT_HOST}/collections/${encodeURIComponent(collectionName)}`, {
    signal: AbortSignal.timeout(3500),
    headers: { 'api-key': QDRANT_API_KEY }
  });
  if (!res.ok) throw new Error(`Qdrant error: ${res.statusText}`);
  return await res.json();
}

export async function searchPoints(vector, collectionName = DEFAULT_COLLECTION, limit = 5) {
  if (!QDRANT_HOST) throw new Error('QDRANT_HOST is not configured in .env');
  const res = await fetch(`${QDRANT_HOST}/collections/${encodeURIComponent(collectionName)}/points/search`, {
    method: 'POST',
    signal: AbortSignal.timeout(3500),
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
  if (!QDRANT_HOST) throw new Error('QDRANT_HOST is not configured in .env');
  const safePoints = Array.isArray(points)
    ? points.map(pt => ({ ...pt, payload: sanitizeRagPayload(pt.payload || {}) }))
    : [];
  const res = await fetch(`${QDRANT_HOST}/collections/${encodeURIComponent(collectionName)}/points`, {
    method: 'PUT',
    signal: AbortSignal.timeout(3500),
    headers: {
      'api-key': QDRANT_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ points: safePoints })
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
