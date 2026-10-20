/**
 * HuntHub & DiggityBets — Video Course & Tutorial Ingester
 * =============================================================================
 * Ingests online video courses, masterclasses, and technical talks (e.g. YouTube)
 * into HuntHub's native RAG repository with zero cost and zero credentials.
 *
 * Capabilities:
 *   1. Extracts complete timestamped transcript via YoutubeTranscript (free, sub-second).
 *   2. Formats timestamped text blocks grouped by natural conversational pauses.
 *   3. Synthesizes executive takeaways, mental models, code patterns, and rules
 *      using Groq Llama-3.3-70b (with automatic model fallback).
 *   4. Writes canonical Markdown to `knowledge/courses/` or `knowledge/ui_ux_design/`.
 *   5. Automatically triggers local RAG re-indexing via MiniSearch & BM25.
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
    path.join(ROOT, '.env.txt'),
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
const GROQ_API_KEY = env.GROQ_API_KEY || '';

// Extract video ID from diverse YouTube URL formats
export function extractVideoId(input) {
  if (!input) return null;
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

// Convert seconds or milliseconds to mm:ss format
export function formatTimestamp(msOrSec) {
  const totalSeconds = msOrSec > 5000 ? Math.floor(msOrSec / 1000) : Math.floor(msOrSec);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Fetch YouTube transcript
export async function fetchVideoTranscript(videoId, lang = 'en') {
  const ytModulePath = path.join(ROOT, 'core', 'node_modules', 'youtube-transcript', 'dist', 'esm', 'index.js');
  let YoutubeTranscript;
  if (fs.existsSync(ytModulePath)) {
    const mod = await import(`file://${ytModulePath.replace(/\\/g, '/')}`);
    YoutubeTranscript = mod.YoutubeTranscript || mod.default?.YoutubeTranscript;
  } else {
    const mod = await import('youtube-transcript');
    YoutubeTranscript = mod.YoutubeTranscript;
  }

  try {
    const items = await YoutubeTranscript.fetchTranscript(videoId, { lang });
    return items;
  } catch (err) {
    // Retry without specific lang if language error
    try {
      const items = await YoutubeTranscript.fetchTranscript(videoId);
      return items;
    } catch (e2) {
      throw new Error(`Failed to fetch transcript for ${videoId}: ${e2.message || err.message}`);
    }
  }
}

// Group transcript items into timed segments (e.g. ~60 seconds blocks)
export function groupTranscriptSegments(items, blockDurationSec = 60) {
  if (!items || items.length === 0) return [];
  const segments = [];
  let currentBlock = [];
  let blockStart = items[0].offset;

  for (const item of items) {
    const itemOffsetSec = item.offset > 5000 ? item.offset / 1000 : item.offset;
    const blockStartSec = blockStart > 5000 ? blockStart / 1000 : blockStart;

    if (itemOffsetSec - blockStartSec >= blockDurationSec && currentBlock.length > 0) {
      segments.push({
        startSec: blockStartSec,
        timestamp: formatTimestamp(blockStart),
        text: currentBlock.join(' ').replace(/\s+/g, ' ').trim()
      });
      currentBlock = [item.text];
      blockStart = item.offset;
    } else {
      currentBlock.push(item.text);
    }
  }

  if (currentBlock.length > 0) {
    const blockStartSec = blockStart > 5000 ? blockStart / 1000 : blockStart;
    segments.push({
      startSec: blockStartSec,
      timestamp: formatTimestamp(blockStart),
      text: currentBlock.join(' ').replace(/\s+/g, ' ').trim()
    });
  }

  return segments;
}

// Synthesize transcript into canonical markdown using Groq LLM
export async function synthesizeCourseWithAI({ title, videoId, segments, fullText, category }) {
  if (!GROQ_API_KEY) {
    return null;
  }

  const models = [
    'openai/gpt-oss-120b',
    'qwen/qwen3.8-27b',
    'openai/gpt-oss-20b'
  ];

  const prompt = `You are the Lead Principal Frontend Architect and Technical Ingester for HuntHub / DiggityBets.
Analyze this video course transcript and produce an exhaustive, authoritative, and practical technical canon document.

VIDEO METADATA:
- Title: ${title}
- Video ID: ${videoId}
- Category: ${category}

TRANSCRIPT EXCERPT:
${fullText.slice(0, 18000)}

INSTRUCTIONS:
Generate a structured Markdown document in English (with Argentine Spanish executive summary) containing:
1. # Frontmatter & Executive Summary
   - Core mental model
   - Target outcomes & performance budget
2. ## Core Architecture & Technical Principles
   - Golden rules, dos and don'ts
   - Layout, animation, or system mechanics
3. ## Production Code Patterns & Implementations
   - Concrete, modern CSS/HTML/JS code snippets derived from or inspired by the lesson
   - Anti-patterns to avoid
4. ## Chronological Chapter Synthesis
   - Timed chapter breakdown referencing key sections
5. ## Actionable Impact for HuntHub Streamer Suite
   - How to apply these lessons directly to our casino stream overlays, mobile website, and real-time hubs.

Provide deep, professional, actionable content without fluff.`;

  for (const model of models) {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2,
          max_tokens: 3000
        })
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) return content;
      }
    } catch (_) {}
  }

  return null;
}

// Main ingestion function
export async function ingestVideoCourse({ urlOrId, title, category = 'courses', customFilename = null }) {
  const videoId = extractVideoId(urlOrId);
  if (!videoId) {
    throw new Error(`Invalid YouTube URL or Video ID: ${urlOrId}`);
  }

  console.log(`\n🎬 Ingesting Video Course [${videoId}]...`);
  console.log(`  Fetching timed transcript...`);
  const items = await fetchVideoTranscript(videoId);
  console.log(`  ✓ Retrieved ${items.length} transcript fragments.`);

  const segments = groupTranscriptSegments(items, 60);
  const fullText = items.map(i => i.text).join(' ').replace(/\s+/g, ' ');

  const resolvedTitle = title || `Video Course: ${videoId}`;
  const safeTitle = (customFilename || resolvedTitle)
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '');

  let synthesis = null;
  if (GROQ_API_KEY) {
    console.log(`  🤖 Synthesizing canonical treatise via Groq Llama-3.3-70b...`);
    synthesis = await synthesizeCourseWithAI({
      title: resolvedTitle,
      videoId,
      segments,
      fullText,
      category
    });
  }

  // Construct final document
  let markdown = '';
  if (synthesis) {
    markdown = synthesis + '\n\n---\n\n## 📝 Full Timestamped Transcript\n\n' +
      segments.map(s => `**[${s.timestamp}]** ${s.text}`).join('\n\n');
  } else {
    markdown = `# ${resolvedTitle}

> **Source:** https://www.youtube.com/watch?v=${videoId}  
> **Category:** ${category}  
> **Ingested At:** ${new Date().toISOString()}  
> **Fragments:** ${items.length} lines  

---

## 📌 Timed Transcript & Outline

${segments.map(s => `### [${s.timestamp}]\n${s.text}`).join('\n\n')}
`;
  }

  const targetDir = path.join(ROOT, 'knowledge', category);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetPath = path.join(targetDir, `${safeTitle}.md`);
  fs.writeFileSync(targetPath, markdown, 'utf8');
  const stat = fs.statSync(targetPath);
  console.log(`  ✓ Saved canonical document to: knowledge/${category}/${safeTitle}.md (${(stat.size / 1024).toFixed(1)} KB)`);

  // Trigger RAG index refresh
  try {
    const ragPath = path.join(__dirname, 'rag_pipeline.mjs');
    if (fs.existsSync(ragPath)) {
      console.log(`  🔄 Rebuilding local RAG index with new knowledge...`);
      const { invalidateIndexCache, getOrBuildMiniSearchIndex } = await import(`file://${ragPath.replace(/\\/g, '/')}`);
      if (invalidateIndexCache) invalidateIndexCache();
      if (getOrBuildMiniSearchIndex) getOrBuildMiniSearchIndex(true);
      console.log(`  ✓ Local RAG index refreshed!`);
    }
  } catch (err) {
    console.warn(`  ⚠️ Could not auto-refresh RAG index: ${err.message}`);
  }

  return {
    videoId,
    title: resolvedTitle,
    filePath: targetPath,
    sizeKb: (stat.size / 1024).toFixed(1)
  };
}

// CLI Execution
if (process.argv[1]?.endsWith('video_course_ingester.mjs')) {
  const args = process.argv.slice(2);
  let url = null;
  let title = null;
  let category = 'courses';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) url = args[++i];
    if (args[i] === '--title' && args[i + 1]) title = args[++i];
    if (args[i] === '--category' && args[i + 1]) category = args[++i];
  }

  if (!url) {
    console.log(`Usage: node tools/intelligence/video_course_ingester.mjs --url <youtube_url> [--title <title>] [--category <category>]`);
    process.exit(0);
  }

  ingestVideoCourse({ urlOrId: url, title, category })
    .then(res => console.log(`\n🎉 Ingestion Complete:`, res))
    .catch(err => {
      console.error(`\n❌ Ingestion Error:`, err.message);
      process.exit(1);
    });
}
