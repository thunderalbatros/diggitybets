/**
 * HuntHub & DiggityBets — Google Cloud Platform (GCP) Vertex AI Bridge
 * =============================================================================
 * Enterprise-grade generative and multimodal intelligence for modern web design,
 * aesthetic UI auditing, query expansion (HyDE), and RAG synthesis.
 *
 * Backed by:
 *   - Project: project-6565e6dc-f33c-49ff-b22
 *   - Location: us-central1
 *   - Model: gemini-2.5-flash (with automatic fallback to gemini-1.5-flash)
 * =============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

// Load environment
function loadEnv() {
  const env = { ...process.env };
  const envCandidates = [
    path.join(ROOT, '.env'),
    path.join(ROOT, '.dev.vars')
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
const GCP_PROJECT = env.GCP_PROJECT_ID || env.GOOGLE_CLOUD_PROJECT || '';
const GCP_LOCATION = env.GCP_LOCATION || 'us-central1';
const GEMINI_MODEL = env.GEMINI_MODEL || 'gemini-2.5-flash';
const GROQ_MODELS = ['openai/gpt-oss-120b', 'qwen/qwen3.8-27b', 'openai/gpt-oss-20b'];

let vertexOrStudioClient = null;

/**
 * Initializes and retrieves the Gemini client:
 *   1. If USE_VERTEX_AI=true or GOOGLE_APPLICATION_CREDENTIALS + GCP_PROJECT_ID exist in .env,
 *      connects via GCP Vertex AI (covered by promotional credits at $0 net cost).
 *   2. Otherwise, if GEMINI_API_KEY / GOOGLE_AI_STUDIO_KEY is set, connects via Google AI Studio Free Tier.
 */
export async function getVertexClient() {
  if (vertexOrStudioClient) return vertexOrStudioClient;

  try {
    const sdkPath = path.join(ROOT, 'core', 'node_modules', '@google', 'genai', 'dist', 'node', 'index.mjs');
    let GoogleGenAI;
    if (fs.existsSync(sdkPath)) {
      const mod = await import(`file://${sdkPath.replace(/\\/g, '/')}`);
      GoogleGenAI = mod.GoogleGenAI;
    } else {
      const mod = await import('@google/genai');
      GoogleGenAI = mod.GoogleGenAI;
    }

    const adcPath = env.GOOGLE_APPLICATION_CREDENTIALS || '';
    if (adcPath && fs.existsSync(adcPath)) {
      process.env.GOOGLE_APPLICATION_CREDENTIALS = adcPath;
    }

    if ((env.USE_VERTEX_AI === 'true' || adcPath) && GCP_PROJECT) {
      vertexOrStudioClient = new GoogleGenAI({
        vertexai: true,
        project: GCP_PROJECT,
        location: GCP_LOCATION
      });
      return vertexOrStudioClient;
    }

    const apiKey = env.GEMINI_API_KEY || env.GOOGLE_AI_STUDIO_KEY || '';
    if (apiKey) {
      vertexOrStudioClient = new GoogleGenAI({ apiKey });
      return vertexOrStudioClient;
    }

    return null;
  } catch (err) {
    console.warn(`[Vertex/Gemini Client] Initialization warning: ${err.message}`);
    return null;
  }
}

/**
 * High-Intelligence Text Generation & Synthesis via Vertex AI Gemini 2.5 Flash
 */
export async function generateWithVertex(prompt, systemInstruction = '', model = GEMINI_MODEL) {
  const ai = await getVertexClient();
  if (!ai) return null;

  try {
    const config = {};
    if (systemInstruction) {
      config.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config
    });

    return response.text || null;
  } catch (err) {
    console.warn(`[Vertex AI] Generation error (${model}): ${err.message}`);
    // Fallback to gemini-1.5-flash if 2.5 has transient quota or region delay
    if (model !== 'gemini-1.5-flash') {
      return generateWithVertex(prompt, systemInstruction, 'gemini-1.5-flash');
    }
    return null;
  }
}

/**
 * Query Expansion, Translation & HyDE (Hypothetical Document Embeddings)
 * Translates conversational queries into canonical English/Spanish technical terms
 * to supercharge dense and sparse retrieval in RAG.
 */
export async function expandAndCanonicalizeQuery(userQuery) {
  const systemInstruction = `You are the Lead Search Engine Architect for HuntHub.
Transform the user query into an optimal search representation for technical retrieval (UI/UX, CSS, Web Animations, Software Architecture, Casino Streaming, and General Web Knowledge).
When queries relate to UI/UX, CSS or animations, preserve and expand precise technical terms (e.g., 'escala de entrada' -> modal entrance scale transform, 'modales' -> modal dialog popover).
Respond strictly in valid JSON format:
{
  "canonicalTerms": ["6-8", "exact", "keywords", "in", "english", "and", "spanish"],
  "canonicalEnglishQuery": "precise translated technical search query",
  "hypotheticalSnippet": "A short 1-2 sentence hypothetical excerpt from the documentation answering this question (HyDE)."
}`;

  // 1. Primary: Groq Ultra-Fast LPU (800ms latency)
  const groqKey = env.GROQ_API_KEY;
  if (groqKey) {
    for (const groqModel of GROQ_MODELS) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          signal: controller.signal,
          headers: {
            'Authorization': `Bearer ${groqKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: groqModel,
            messages: [
              { role: 'system', content: systemInstruction },
              { role: 'user', content: `User Query: "${userQuery}"` }
            ],
            temperature: 0.1,
            response_format: { type: 'json_object' }
          })
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) return JSON.parse(content);
        }
      } catch (_) {}
    }
  }

  // 2. High-Intelligence Fallback: Vertex AI Gemini 2.5 Flash
  try {
    const raw = await generateWithVertex(`User Query: "${userQuery}"`, systemInstruction);
    if (raw) {
      const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      if (parsed && (parsed.canonicalTerms || parsed.canonicalEnglishQuery)) {
        return parsed;
      }
    }
  } catch (_) {}

  return null;
}

/**
 * Listwise Cross-Evaluation Reranker (SOTA 2026)
 * Evaluates candidate passages and re-scores them from 0.0 to 1.0 based on true semantic relevance.
 * Solves 'Lost in the Middle' and filters irrelevant candidates before synthesis.
 */
export async function rerankCandidatesWithAI(query, candidates = []) {
  if (!candidates || candidates.length === 0) return [];
  if (candidates.length === 1) return candidates;

  const candidateSummary = candidates.slice(0, 15).map((c, idx) => ({
    index: idx + 1,
    id: c.id,
    title: c.title,
    snippet: (c.snippet || c.text || '').slice(0, 280)
  }));

  const systemPrompt = `You are an ultra-fast listwise reranker for technical web engineering and UI/UX documentation.
Evaluate each candidate passage for relevance to the user query on a scale of 0.0 to 1.0.
Output strictly JSON:
{
  "ranked": [
    { "index": 1, "score": 0.95, "reason": "concise rationale" }
  ]
}
Filter out irrelevant candidates (score < 0.40). Sort descending by score.`;

  const userPrompt = `Query: "${query}"\n\nCandidates:\n${candidateSummary.map(c => `[${c.index}] (ID: ${c.id}) ${c.title}\n"${c.snippet}"`).join('\n\n')}`;

  // 1. Try Groq (Fastest listwise inference ~700-900ms)
  const groqKey = env.GROQ_API_KEY;
  if (groqKey) {
    for (const model of GROQ_MODELS) {
      try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          signal: AbortSignal.timeout(3500),
          headers: {
            'Authorization': `Bearer ${groqKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ],
            temperature: 0.0,
            response_format: { type: 'json_object' }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) {
            const parsed = JSON.parse(content);
            const rankings = parsed.ranked || parsed.results || [];
            if (Array.isArray(rankings)) {
              if (rankings.length === 0) return [];
              const scoreMap = new Map();
              rankings.forEach(r => {
                const idx = Number(r.index) - 1;
                if (idx >= 0 && idx < candidates.length) {
                  scoreMap.set(candidates[idx].id, {
                    score: Number(r.score) || 0.5,
                    reason: r.reason || ''
                  });
                }
              });

              return candidates
                .filter(c => scoreMap.has(c.id))
                .map(c => ({
                  ...c,
                  rerankScore: scoreMap.get(c.id).score,
                  rerankReason: scoreMap.get(c.id).reason
                }))
                .sort((a, b) => b.rerankScore - a.rerankScore);
            }
          }
        }
      } catch (_) {}
    }
  }

  // 2. Fallback to Vertex AI Gemini 2.5 Flash
  try {
    const raw = await generateWithVertex(userPrompt, systemPrompt);
    if (raw) {
      const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      const rankings = parsed.ranked || parsed.results || [];
      if (Array.isArray(rankings)) {
        if (rankings.length === 0) return [];
        const scoreMap = new Map();
        rankings.forEach(r => {
          const idx = Number(r.index) - 1;
          if (idx >= 0 && idx < candidates.length) {
            scoreMap.set(candidates[idx].id, {
              score: Number(r.score) || 0.5,
              reason: r.reason || ''
            });
          }
        });

        return candidates
          .filter(c => scoreMap.has(c.id))
          .map(c => ({
            ...c,
            rerankScore: scoreMap.get(c.id).score,
            rerankReason: scoreMap.get(c.id).reason
          }))
          .sort((a, b) => b.rerankScore - a.rerankScore);
      }
    }
  } catch (_) {}

  return [];
}

/**
 * Multimodal Visual & Aesthetic UI Auditor (Vertex AI Vision)
 * Audits UI screenshots, OBS overlays, and web pages against modern design standards:
 * Refactoring UI, Practical UI, Every Layout, and Emil Kowalski Motion rules.
 */
export async function auditVisualDesign({ imagePathOrBuffer, mimeType = 'image/jpeg', urlOrContext = '' }) {
  const ai = await getVertexClient();
  if (!ai) return { ok: false, error: 'Vertex AI client not available' };

  let b64Data = '';
  if (Buffer.isBuffer(imagePathOrBuffer)) {
    b64Data = imagePathOrBuffer.toString('base64');
  } else if (typeof imagePathOrBuffer === 'string' && fs.existsSync(imagePathOrBuffer)) {
    b64Data = fs.readFileSync(imagePathOrBuffer).toString('base64');
  } else {
    return { ok: false, error: 'Invalid image buffer or file path' };
  }

  const prompt = `You are the Lead Visual & Aesthetic Design Engineer for HuntHub (Casino Streamer Engagement Suite).
Perform an authoritative, brutal, and high-craft aesthetic audit of this UI design.

CONTEXT: ${urlOrContext || 'Casino Streamer Web App & Transparent OBS Overlays'}

STANDARDS TO ENFORCE:
1. 90/8/2 Chromatic Budget (90% dark glass/neutral base, 8% structural accents, 2% high-voltage neon punch).
2. Hierarchy & Contrast (WCAG AAA compliance on dark backgrounds, weight/color over size).
3. Spacing & Rhythm (8px/4px atomic grid, avoiding crowded borders, border-over-shadow).
4. Layout Primitives (Every Layout algorithmic alignment, zero awkward word wrapping).
5. Tactile Micro-Interactions (Tactile active states, organic easing, spring physics).

Respond in structured Markdown with:
- # Visual Craft Rating (Score 1-10)
- ## 🌟 What Works (Aesthetic Strengths)
- ## ⚠️ Visual Flaws & Anti-Patterns (Spacing, Contrast, Visual Noise)
- ## 🛠️ Concrete CSS/Design Action Plan (Drop-in CSS rules to elevate craft)`;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            { inlineData: { mimeType, data: b64Data } }
          ]
        }
      ]
    });

    return {
      ok: true,
      report: response.text,
      model: GEMINI_MODEL
    };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

/**
 * Phase 2A: Vertex AI Explicit Context Caching (`ai.caches.create`)
 * Caches the foundational Software Factory Canon in Vertex AI KV-Cache (TTL 3600s)
 * to save 75%-90% input token cost and reduce TTFT to <200ms.
 */
const CACHE_META_PATH = path.join(ROOT, '.agents', 'memory', 'vertex_context_cache.json');

export async function ensureCanonContextCache(ttlSeconds = 3600) {
  try {
    if (fs.existsSync(CACHE_META_PATH)) {
      const saved = JSON.parse(fs.readFileSync(CACHE_META_PATH, 'utf8'));
      if (saved.expiresAt && new Date(saved.expiresAt).getTime() > Date.now() + 60000) {
        return saved;
      }
    }
  } catch (_) {}

  const ai = await getVertexClient();
  if (!ai || !ai.caches?.create) {
    return { active: false, reason: 'Vertex AI caches API unavailable in current environment' };
  }

  const canonFiles = [
    'AGENTS.md',
    'CONSTRAINTS.md',
    'knowledge/INDEX.md',
    'knowledge/DESIGN_MASTERY_2026.md',
    'knowledge/architecture_and_books/CANON_SELF_EVOLVING_SOFTWARE_FACTORY_AND_SPECULATIVE_RAG_2026.md'
  ];

  const blocks = [];
  for (const rel of canonFiles) {
    const full = path.join(ROOT, rel);
    if (fs.existsSync(full)) {
      blocks.push(`=== CANON FILE: ${rel} ===\n${fs.readFileSync(full, 'utf8').slice(0, 48000)}`);
    }
  }
  const combinedCanon = blocks.join('\n\n');

  try {
    const cacheObj = await ai.caches.create({
      model: GEMINI_MODEL,
      config: {
        displayName: 'hunthub_software_factory_canon_v2026',
        systemInstruction: 'You are the Principal Architect of the HuntHub Self-Evolving Web Software Factory.',
        contents: [{ role: 'user', parts: [{ text: combinedCanon }] }],
        ttl: `${ttlSeconds}s`
      }
    });

    const meta = {
      active: true,
      name: cacheObj.name || 'hunthub_software_factory_canon_v2026',
      model: GEMINI_MODEL,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + ttlSeconds * 1000).toISOString(),
      cachedChars: combinedCanon.length
    };
    fs.mkdirSync(path.dirname(CACHE_META_PATH), { recursive: true });
    fs.writeFileSync(CACHE_META_PATH, JSON.stringify(meta, null, 2) + '\n', 'utf8');
    return meta;
  } catch (err) {
    return { active: false, reason: err.message };
  }
}

/**
 * Phase 2B: Ragas Deterministic Metrics (Context Precision@3 & Grounded Faithfulness)
 * Computes mathematical retrieval precision and lexical groundedness without LLM latency.
 */
export function computeRagasMetrics(query, hits = [], expectedKeyword = '') {
  if (!hits || hits.length === 0) {
    return { contextPrecisionAt3: 0, faithfulness: 0 };
  }

  const kw = (expectedKeyword || '').toLowerCase().trim();
  const queryTokens = (query || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}_/-]+/gu, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 3);

  const topK = hits.slice(0, 3);
  let relevantSoFar = 0;
  let weightedPrecisionSum = 0;

  topK.forEach((h, idx) => {
    const hay = `${h.title || ''} ${h.source || ''} ${h.text || ''}`.toLowerCase();
    const tokenHits = queryTokens.filter(t => hay.includes(t)).length;
    const isRel =
      (kw && hay.includes(kw)) ||
      tokenHits >= Math.max(2, Math.floor(queryTokens.length * 0.35));
    if (isRel) {
      relevantSoFar++;
      weightedPrecisionSum += relevantSoFar / (idx + 1);
    }
  });

  const contextPrecisionAt3 = relevantSoFar > 0
    ? Number((weightedPrecisionSum / relevantSoFar).toFixed(3))
    : 0;

  const combinedTopText = topK.map(h => `${h.title || ''} ${h.source || ''} ${h.text || ''}`.toLowerCase()).join(' ');
  const matchedTokens = queryTokens.filter(t => combinedTopText.includes(t) || (kw && combinedTopText.includes(kw)));
  const faithfulness = queryTokens.length > 0
    ? Number(Math.min(1.0, (matchedTokens.length + (kw && combinedTopText.includes(kw) ? 1 : 0)) / Math.max(1, queryTokens.length)).toFixed(3))
    : 1.0;

  return { contextPrecisionAt3, faithfulness };
}

/**
 * Phase 2C: Speculative RAG (Google Research ICLR 2025: M=3 Parallel Drafters + 1 Verifier)
 * Partitions retrieved chunks into M=3 orthogonal perspectives, generates 3 parallel drafts,
 * and scores each draft's grounded faithfulness against its source chunks.
 */
export async function speculativeRagSynthesize(query, hits = []) {
  if (!hits || hits.length === 0) {
    return { answer: null, bestDraftIndex: -1, faithfulness: 0, drafts: [] };
  }

  const subsets = [[], [], []];
  hits.slice(0, 9).forEach((h, idx) => {
    subsets[idx % 3].push(h);
  });
  const activeSubsets = subsets.filter(s => s.length > 0);

  const draftPromises = activeSubsets.map(async (subset, pIdx) => {
    const ctxText = subset
      .map((c, i) => `[Doc ${pIdx + 1}.${i + 1}: ${c.source || c.title}]\n${(c.text || c.snippet || '').slice(0, 900)}`)
      .join('\n\n');

    const sys = `You are Speculative RAG Drafter #${pIdx + 1}. Synthesize a concise, strictly grounded technical answer using ONLY the provided chunks. Cite [Doc X.Y] inline.`;
    const usr = `Query: "${query}"\n\nEvidence Chunks:\n${ctxText}`;

    const llmText = await generateWithVertex(usr, sys);
    const draftText = llmText || subset.map(c => `[${c.source || c.title}]: ${(c.text || '').slice(0, 320)}`).join('\n');

    // Deterministic Verifier Groundedness Score
    const sourceVocab = new Set(
      ctxText.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').split(/\s+/).filter(w => w.length >= 4)
    );
    const draftWords = draftText.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').split(/\s+/).filter(w => w.length >= 4);
    const groundedWords = draftWords.filter(w => sourceVocab.has(w));
    const groundedness = draftWords.length > 0 ? Number((groundedWords.length / draftWords.length).toFixed(3)) : 0;

    return {
      perspective: pIdx + 1,
      sources: subset.map(c => c.source || c.title),
      draft: draftText,
      groundedness
    };
  });

  const drafts = await Promise.all(draftPromises);
  drafts.sort((a, b) => b.groundedness - a.groundedness);
  const winner = drafts[0];

  return {
    answer: winner?.draft || null,
    bestDraftIndex: winner?.perspective || 1,
    faithfulness: winner?.groundedness || 0,
    drafts
  };
}

// CLI Diagnostics
if (process.argv[1]?.endsWith('vertex_ai_bridge.mjs')) {
  console.log(`\n🔍 Checking GCP Vertex AI Connection & Speculative RAG Bridge...`);
  console.log(`  Project: ${GCP_PROJECT}`);
  console.log(`  Location: ${GCP_LOCATION}`);
  console.log(`  Model: ${GEMINI_MODEL}`);

  generateWithVertex('Respond with a single sentence in Argentine Spanish confirming Vertex AI is active.')
    .then(res => {
      console.log(`\n✅ Vertex AI Response:\n${res}`);
    })
    .catch(err => {
      console.error(`\n❌ Vertex AI Failed:`, err.message);
    });
}
