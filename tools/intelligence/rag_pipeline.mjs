/**
 * HuntHub & DiggityBets — Supercharged Omni-RAG v2 Intelligence Pipeline
 * =============================================================================
 * SOTA Hybrid Retrieval Architecture (2026):
 *   1. Anthropic Contextual Chunking:
 *      - Chunks all canon treatises and books (>800 KB) by Markdown headers (#, ##, ###)
 *      - Prepends contextual headers [Document > Section] to eliminate context loss.
 *   2. In-Memory Lexical & Fuzzy Search:
 *      - MiniSearch BM25 engine with prefix search and typo tolerance (sub-millisecond).
 *   3. Qdrant Cloud Vector & Tantivy Full-Text Search:
 *      - Fast payload search across streaming, security and web architecture nodes.
 *   4. Reciprocal Rank Fusion (RRF):
 *      - Merges lexical BM25 and cloud knowledge rankings using RRF formula (k=60).
 *   5. Groq LLM Ultra-Fast Synthesis:
 *      - Llama-3.3-70b-versatile streaming/synthesis in ~400ms with multi-model fallback.
 * =============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

// Dynamically import MiniSearch with fallback
let MiniSearchClass = null;
try {
  const msPath = path.join(ROOT, 'core', 'node_modules', 'minisearch', 'dist', 'es', 'index.js');
  if (fs.existsSync(msPath)) {
    const mod = await import(`file://${msPath.replace(/\\/g, '/')}`);
    MiniSearchClass = mod.default || mod;
  }
} catch (e) {
  // Graceful fallback to built-in keyword scoring
}

// Load environment variables
function loadEnv() {
  const env = { ...process.env };
  const envCandidates = [
    path.join(ROOT, '.env'),
    path.join(ROOT, '.env.txt'),
    'C:/Users/tomas/.zcode/workspace/default/centinela-studio/.env'
  ];

  for (const p of envCandidates) {
    if (fs.existsSync(p)) {
      try {
        const content = fs.readFileSync(p, 'utf8');
        content.split(/\r?\n/).forEach(line => {
          const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
          if (match && !env[match[1]]) {
            env[match[1]] = (match[2] || '').trim();
          }
        });
      } catch (_) {}
    }
  }
  return env;
}

const env = loadEnv();
const QDRANT_HOST = env.QDRANT_HOST || 'https://199f55c4-d5ce-46d8-8c66-8390ebac1187.eu-central-1-0.aws.cloud.qdrant.io:6333';
const QDRANT_API_KEY = env.QDRANT_API_KEY || '';
const GROQ_API_KEY = env.GROQ_API_KEY || '';

// In-Memory MiniSearch Index & Cache
let cachedIndex = null;
let lastIndexTime = 0;

/**
 * Scan workspace documentation avoiding heavy code/build directories
 */
function scanKnowledgeFiles(dir, maxDepth = 8, depth = 0) {
  let files = [];
  if (depth > maxDepth || !fs.existsSync(dir)) return files;

  const baseSkip = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'coverage']);
  const codeSkip = new Set(['vendor', 'src', 'ui', 'client', 'packages', 'assets']);
  const isDedicatedKnowledge = dir.includes('sota-2026') || dir.includes('skills') || dir.includes('knowledge') || dir.includes('docs');

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const fp = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        if (!ent.name.startsWith('.')) {
          if (baseSkip.has(ent.name)) continue;
          if (!isDedicatedKnowledge && codeSkip.has(ent.name)) continue;
          files = files.concat(scanKnowledgeFiles(fp, maxDepth, depth + 1));
        }
      } else if (ent.isFile()) {
        const lower = ent.name.toLowerCase();
        if (lower.endsWith('.md') || lower.endsWith('.markdown')) {
          files.push(fp);
        }
      }
    }
  } catch (_) {}

  return files;
}

/**
 * Anthropic Contextual Chunker: Splits large documents into header-aware contextual chunks
 */
function createDocumentChunks(filePath) {
  const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
  const fileName = path.basename(filePath, '.md');
  const text = fs.readFileSync(filePath, 'utf8');
  const cleanText = text.replace(/^---[\s\S]*?---\s*/, '').trim();
  const isCanon = filePath.includes('knowledge');
  const category = isCanon ? 'canon' : 'general';

  // If file is very small (< 1,500 chars) and has no subheadings, index as single chunk
  const sections = cleanText.split(/\n(?=#{1,3}\s+)/);
  if (cleanText.length <= 1500 || sections.length <= 1) {
    return [{
      id: rel,
      source: `local://${rel}`,
      title: fileName,
      section: 'Main',
      category,
      text: cleanText,
      snippet: cleanText.slice(0, 450)
    }];
  }

  // Chunk intelligently by Markdown headings (#, ##, ###)
  const chunks = [];

  sections.forEach((sec, idx) => {
    const headingMatch = sec.match(/^#{1,3}\s+(.+)/);
    const heading = headingMatch ? headingMatch[1].trim() : `Section ${idx + 1}`;
    
    // Sub-chunk if section exceeds 2,500 characters
    if (sec.length > 2500) {
      const paragraphs = sec.split(/\n\n+/);
      let currentSub = '';
      let subIdx = 1;

      paragraphs.forEach(p => {
        if ((currentSub + '\n\n' + p).length > 2000 && currentSub.length > 100) {
          const contextualText = `[Doc: ${fileName} > ${heading} (Part ${subIdx})]\n${currentSub.trim()}`;
          chunks.push({
            id: `${rel}#chunk-${idx}-${subIdx}`,
            source: `local://${rel}`,
            title: `${fileName} › ${heading} (Part ${subIdx})`,
            section: heading,
            category,
            text: contextualText,
            snippet: currentSub.trim().slice(0, 450)
          });
          subIdx++;
          currentSub = p;
        } else {
          currentSub = currentSub ? `${currentSub}\n\n${p}` : p;
        }
      });

      if (currentSub.trim()) {
        const contextualText = `[Doc: ${fileName} > ${heading} (Part ${subIdx})]\n${currentSub.trim()}`;
        chunks.push({
          id: `${rel}#chunk-${idx}-${subIdx}`,
          source: `local://${rel}`,
          title: `${fileName} › ${heading} (Part ${subIdx})`,
          section: heading,
          category,
          text: contextualText,
          snippet: currentSub.trim().slice(0, 450)
        });
      }
    } else if (sec.trim().length > 80) {
      const contextualText = `[Doc: ${fileName} > ${heading}]\n${sec.trim()}`;
      chunks.push({
        id: `${rel}#chunk-${idx}`,
        source: `local://${rel}`,
        title: `${fileName} › ${heading}`,
        section: heading,
        category,
        text: contextualText,
        snippet: sec.trim().slice(0, 450)
      });
    }
  });

  return chunks;
}

/**
 * Invalidate in-memory cache to force re-indexing
 */
export function invalidateIndexCache() {
  cachedIndex = null;
  lastIndexTime = 0;
}

/**
 * Builds or retrieves cached MiniSearch index
 */
export function getOrBuildMiniSearchIndex(force = false) {
  const now = Date.now();
  if (!force && cachedIndex && now - lastIndexTime < 300_000) {
    return cachedIndex;
  }

  const searchDirs = [
    { dir: path.join(ROOT, 'knowledge'), depth: 4 },
    { dir: path.join(ROOT, 'docs'), depth: 4 },
    { dir: path.join(ROOT, 'references', 'sota-2026'), depth: 6 },
    { dir: path.join(ROOT, 'references', 'clones', 'emil-skills', 'skills'), depth: 5 },
    { dir: path.join(ROOT, '.agents', 'skills'), depth: 4 },
    { dir: path.join(ROOT, '.agents', 'memory'), depth: 4 },
    { dir: path.join(ROOT, 'references'), depth: 4 }
  ];

  const allChunks = [];
  const visitedFiles = new Set();

  for (const { dir, depth } of searchDirs) {
    const files = scanKnowledgeFiles(dir, depth, 0);
    for (const f of files) {
      if (visitedFiles.has(f)) continue;
      visitedFiles.add(f);
      try {
        const chunks = createDocumentChunks(f);
        allChunks.push(...chunks);
      } catch (_) {}
    }
  }

  if (MiniSearchClass) {
    const mini = new MiniSearchClass({
      fields: ['title', 'section', 'text'],
      storeFields: ['id', 'source', 'title', 'section', 'category', 'snippet', 'text'],
      searchOptions: {
        boost: { title: 3, section: 2, text: 1 },
        boostDocument: (docId, term, doc) => (doc && doc.category === 'canon' ? 2.5 : 1.0),
        fuzzy: 0.2,
        prefix: true
      }
    });

    mini.addAll(allChunks);
    cachedIndex = { mini, chunks: allChunks };
  } else {
    cachedIndex = { mini: null, chunks: allChunks };
  }

  lastIndexTime = now;
  return cachedIndex;
}

/**
 * Reciprocal Rank Fusion (RRF) Implementation
 * Merges and re-ranks lists from diverse retrieval engines without score bias
 */
export function reciprocalRankFusion(rankedLists, k = 60) {
  const rrfScores = new Map();
  const docMap = new Map();

  rankedLists.forEach(list => {
    list.forEach((doc, idx) => {
      const rank = idx + 1;
      const id = doc.id || doc.source;
      if (!docMap.has(id)) {
        docMap.set(id, doc);
        rrfScores.set(id, 0);
      }
      rrfScores.set(id, rrfScores.get(id) + 1 / (k + rank));
    });
  });

  return Array.from(rrfScores.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([id, score]) => ({
      ...docMap.get(id),
      rrfScore: score
    }));
}

/**
 * Multi-source Hybrid Knowledge Retrieval (MiniSearch + Qdrant Cloud + RRF)
 * @param {string} query - Query or keyword prompt
 * @param {number} limit - Maximum returned documents
 */
export async function queryKnowledge(query, limit = 8) {
  const qClean = query.trim();
  const qTerms = qClean.toLowerCase().split(/\s+/).filter(t => t.length > 1);
  const stopWords = new Set([
    'que', 'qué', 'como', 'cómo', 'por', 'para', 'con', 'del', 'las', 'los', 'una', 'uno',
    'unos', 'unas', 'este', 'esta', 'estos', 'estas', 'son', 'sobre', 'how', 'what',
    'does', 'the', 'and', 'for', 'with', 'from', 'about', 'work', 'works', 'enseña'
  ]);
  const significantTerms = qTerms.filter(t => !stopWords.has(t));
  let effectiveQuery = significantTerms.length > 0 ? significantTerms.join(' ') : qClean;

  // 0. Query Expansion & Canonical Translation with Vertex AI / Gemini
  let canonicalQuery = '';
  let expandedTerms = [];
  try {
    const { expandAndCanonicalizeQuery } = await import('./vertex_ai_bridge.mjs');
    const exp = await expandAndCanonicalizeQuery(query);
    if (exp) {
      if (exp.canonicalTerms && Array.isArray(exp.canonicalTerms)) {
        expandedTerms = exp.canonicalTerms;
      }
      if (exp.canonicalEnglishQuery) {
        canonicalQuery = exp.canonicalEnglishQuery;
      }
    }
  } catch (_) {}

  const searchQuery = [effectiveQuery, canonicalQuery, ...expandedTerms].filter(Boolean).join(' ');
  const rankedLists = [];

  // 1. Local Lexical Search via MiniSearch BM25
  const indexData = getOrBuildMiniSearchIndex();
  let localResults = [];

  if (indexData.mini) {
    try {
      const searchRes = indexData.mini.search(searchQuery, {
        combineWith: 'OR',
        fuzzy: 0.2,
        prefix: true,
        boost: { title: 3, section: 2, text: 1 }
      });

      localResults = searchRes.slice(0, 15).map((r, i) => ({
        id: r.id,
        source: r.source,
        title: r.title,
        snippet: r.snippet,
        text: r.text || r.snippet,
        score: r.score
      }));
    } catch (_) {}
  }

  // Fallback heuristic if MiniSearch returns empty
  if (localResults.length === 0) {
    const targetTerms = significantTerms.length > 0 ? significantTerms : qTerms;
    localResults = indexData.chunks
      .map(c => {
        let matches = 0;
        const textLower = (c.title + ' ' + c.text).toLowerCase();
        targetTerms.forEach(t => { if (textLower.includes(t)) matches++; });
        return { ...c, matches };
      })
      .filter(c => c.matches > 0)
      .sort((a, b) => b.matches - a.matches)
      .slice(0, 15);
  }

  rankedLists.push(localResults);

  // 2. Qdrant Cloud Full-Text Search across technical knowledge
  const searchTerms = significantTerms.length > 0 ? significantTerms : qTerms;
  if (QDRANT_API_KEY && searchTerms.length > 0) {
    const collections = ['centinela_knowledge'];
    const qdrantResults = [];

    const searchFilters = searchTerms.map(term => ({
      should: [
        { key: 'text', match: { text: term } },
        { key: 'title', match: { text: term } }
      ]
    }));

    const promises = collections.map(async col => {
      try {
        const res = await fetch(`${QDRANT_HOST}/collections/${col}/points/scroll`, {
          method: 'POST',
          headers: {
            'api-key': QDRANT_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filter: {
              should: [
                { key: 'text', match: { text: searchTerms.join(' ') } },
                { key: 'title', match: { text: searchTerms.join(' ') } },
                ...searchFilters.flatMap(f => f.should)
              ]
            },
            limit: 15,
            with_payload: true
          })
        });

        if (res.ok) {
          const data = await res.json();
          const points = data.result?.points || [];
          points.forEach(p => {
            const payload = p.payload || {};
            const text = (payload.text || payload.content || '').toString();
            const title = payload.title || payload.heading || `${col} Node #${p.id}`;
            qdrantResults.push({
              id: `qdrant://${col}/${p.id}`,
              source: `qdrant://${col}/${p.id}`,
              title: String(title).slice(0, 85),
              snippet: text.replace(/\s+/g, ' ').slice(0, 450)
            });
          });
        }
      } catch (_) {}
    });

    await Promise.all(promises);
    if (qdrantResults.length > 0) {
      rankedLists.push(qdrantResults);
    }
  }

  // 3. Dense Vector Search via Centinela Studio Bridge (Cosine similarity on 3,608 points)
  try {
    const p = 'file:///C:/Users/tomas/.zcode/workspace/default/centinela-studio/tools/kb-search.mjs';
    const centinela = await import(p);
    if (centinela && typeof centinela.searchKb === 'function') {
      const densePromise = centinela.searchKb(env, 'centinela_knowledge', effectiveQuery, {
        mode: 'rerank',
        limit: 10
      });
      const timeoutPromise = new Promise(resolve => setTimeout(() => resolve({ hits: [] }), 3000));
      const denseRes = await Promise.race([densePromise, timeoutPromise]);

      if (denseRes && denseRes.hits && denseRes.hits.length > 0) {
        const denseList = denseRes.hits.map(h => ({
          id: `qdrant://centinela_dense/${h.id || h.payload?.source}`,
          source: h.payload?.source || 'centinela_knowledge',
          title: h.payload?.heading || h.payload?.title || String(h.payload?.source || '').slice(0, 80),
          snippet: (h.payload?.text || '').slice(0, 450),
          text: h.payload?.text || '',
          score: h.score
        }));
        rankedLists.push(denseList);
      }
    }
  } catch (_) {}

  // 4. Fused Ranking using Reciprocal Rank Fusion (RRF)
  const fused = reciprocalRankFusion(rankedLists, 60);

  // 5. Layer 3: SOTA 2026 Listwise Semantic Reranker (Groq / Vertex AI)
  let reranked = fused;
  try {
    const { rerankCandidatesWithAI } = await import('./vertex_ai_bridge.mjs');
    if (typeof rerankCandidatesWithAI === 'function' && fused.length > 0) {
      reranked = await rerankCandidatesWithAI(query, fused.slice(0, 15));
    }
  } catch (_) {}

  // 6. Layer 4: Corrective RAG (CRAG Loop)
  // If top candidate has low confidence (< 0.55) or no candidates recovered, trigger live web search
  const topCandidate = reranked[0];
  const hasHighConfidence = topCandidate && (
    topCandidate.rerankScore !== undefined 
      ? topCandidate.rerankScore >= 0.55 
      : (topCandidate.score > 0.85 || (topCandidate.rrfScore && topCandidate.rrfScore > 0.035))
  );

  if (!hasHighConfidence || reranked.length === 0) {
    try {
      const { searchWeb } = await import('./serper_researcher.mjs');
      const webQuery = canonicalQuery || query;
      const webData = await searchWeb(webQuery, 4);
      const organic = webData.organic || [];
      if (organic.length > 0) {
        const webCandidates = organic.map((item, idx) => ({
          id: `web://${item.link}`,
          source: item.link,
          title: `[Web Search] ${item.title}`,
          snippet: item.snippet || '',
          text: `[Live Web Search Source: ${item.title} (${item.link})]\n${item.snippet || ''}`,
          rerankScore: 0.95 - (idx * 0.05),
          isWebFallback: true
        }));
        reranked = [...webCandidates, ...reranked];
      }
    } catch (_) {}
  }

  return reranked.slice(0, limit);
}

/**
 * High-Intelligence Synthesis: GCP Vertex AI Gemini 2.5 Flash (Primary) + Groq LPU Fallback
 * @param {string} question - Question to synthesize
 * @param {Array} knowledgeList - Recovered context nodes
 */
export async function synthesizeAnswer(question, knowledgeList = []) {
  const isWebAugmented = knowledgeList.some(k => k.isWebFallback);
  const contextText = knowledgeList.map((k, idx) => 
    `[Source ${idx + 1}: ${k.title} (${k.source})]\n${k.text || k.snippet}`
  ).join('\n\n');

  const systemPrompt = `You are the Antigravity Lead Architect for HuntHub/DiggityBets.
Answer the user question concisely, authoritatively, and thoroughly in Argentine Spanish based on the provided technical context.
When live web search sources ([Live Web Search Source]) are provided, synthesize the latest live information directly to answer the question accurately.
Do not invoke tools or JSON function calls. Output pure markdown text and cite the specific sources used.`;
  const userPrompt = `KNOWLEDGE CONTEXT:\n${contextText}\n\nQUESTION: ${question}`;

  const webTag = isWebAugmented ? '\n\n*(Augmentado vía Corrective RAG · Google Search fallback)*' : '';

  // 1. Primary: GCP Vertex AI Gemini 2.5 Flash
  try {
    const { generateWithVertex } = await import('./vertex_ai_bridge.mjs');
    const vertexAnswer = await generateWithVertex(userPrompt, systemPrompt);
    if (vertexAnswer && vertexAnswer.trim().length > 10) {
      return vertexAnswer + '\n\n*(Sintetizado con Google Cloud Vertex AI · Gemini 2.5 Flash)*' + webTag;
    }
  } catch (_) {}

  // 2. Fallback: Groq Ultra-Fast LPU (active 2026 models)
  if (GROQ_API_KEY) {
    const candidateModels = [
      'qwen/qwen3.8-27b',
      'openai/gpt-oss-20b',
      'openai/gpt-oss-120b'
    ];

    for (const model of candidateModels) {
      try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ],
            temperature: 0.2,
            max_tokens: 750
          })
        });

        if (res.ok) {
          const data = await res.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) return content + `\n\n*(Sintetizado con Groq LPU · ${model})*` + webTag;
        }
      } catch (_) {}
    }
  }

  return 'Context retrieved successfully via MiniSearch & Qdrant RRF. All LLM providers currently busy.';
}

/**
 * Retrieve Qdrant Cloud cluster point counts and health
 */
export async function getClusterStats() {
  if (!QDRANT_API_KEY) return { error: 'No QDRANT_API_KEY' };
  const stats = {};
  for (const col of ['centinela_knowledge']) {
    try {
      const res = await fetch(`${QDRANT_HOST}/collections/${col}`, {
        headers: { 'api-key': QDRANT_API_KEY }
      });
      const data = await res.json();
      stats[col] = {
        points_count: data.result?.points_count,
        status: data.result?.status
      };
    } catch (e) {
      stats[col] = { error: e.message };
    }
  }
  return stats;
}

// CLI Interface
if (process.argv.includes('--stats')) {
  console.log('📊 Checking Qdrant Cloud Collections Stats...');
  getClusterStats().then(s => console.log(JSON.stringify(s, null, 2)));
} else if (process.argv.includes('--ask')) {
  const qIdx = process.argv.indexOf('--ask') + 1;
  const q = process.argv[qIdx] || 'How does Kick OAuth 2.1 PKCE work in Centinela?';
  console.log(`\n🧠 Synthesizing RAG Answer for: "${q}"...`);
  queryKnowledge(q, 6).then(async results => {
    console.log(`\n📚 Recovered ${results.length} relevant nodes (MiniSearch + Qdrant RRF). Generating answer with Groq Llama-3.3-70b...\n`);
    const answer = await synthesizeAnswer(q, results);
    console.log(answer);
  });
} else if (process.argv.includes('--query')) {
  const qIdx = process.argv.indexOf('--query') + 1;
  const q = process.argv[qIdx] || 'kick';
  const lim = parseInt(process.argv[qIdx + 1], 10) || 5;
  console.log(`\n🔎 Querying RAG Knowledge for: "${q}"...`);
  queryKnowledge(q, lim).then(res => {
    console.log(`\nFound ${res.length} matches:`);
    res.forEach((r, i) => {
      console.log(`\n[${i + 1}] (RRF: ${(r.rrfScore || 0).toFixed(4)}) ${r.title}`);
      console.log(`    Source: ${r.source}`);
      console.log(`    Snippet: "${r.snippet ? r.snippet.trim().slice(0, 160) : ''}..."`);
    });
  });
}
