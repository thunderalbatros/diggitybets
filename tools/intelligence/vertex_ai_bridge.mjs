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
    'C:/Users/tomas/.zcode/workspace/default/centinela-studio/.env',
    'C:/Users/tomas/yendo_mobile/.env'
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
const GCP_PROJECT = env.GOOGLE_CLOUD_PROJECT || env.GCP_PROJECT_ID || 'project-6565e6dc-f33c-49ff-b22';
const GCP_LOCATION = env.GCP_LOCATION || 'us-central1';
const GEMINI_MODEL = env.GEMINI_MODEL || 'gemini-2.5-flash';

let vertexClient = null;

/**
 * Initializes and retrieves the Google Gen AI client configured for Vertex AI
 */
export async function getVertexClient() {
  if (vertexClient) return vertexClient;

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

    vertexClient = new GoogleGenAI({
      vertexai: true,
      project: GCP_PROJECT,
      location: GCP_LOCATION
    });

    return vertexClient;
  } catch (err) {
    console.warn(`[Vertex AI] Initialization warning: ${err.message}`);
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
          model: 'qwen/qwen3.8-27b',
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
    for (const model of ['qwen/qwen3.8-27b', 'openai/gpt-oss-20b']) {
      try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
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

// CLI Diagnostics
if (process.argv[1]?.endsWith('vertex_ai_bridge.mjs')) {
  console.log(`\n🔍 Checking GCP Vertex AI Connection...`);
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
