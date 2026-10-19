#!/usr/bin/env node
/**
 * HuntHub & DiggityBets — Software Factory Video Course & Masterclass Ingester
 * =============================================================================
 * Ported & Upgraded from Centinela Studio (tools/ingest-course.mjs).
 * Extracts full YouTube or SRT transcripts with [MM:SS] / [HH:MM:SS] timestamps,
 * groups speech into thematic 2-minute blocks, injects a mandatory LEC-015
 * Scope Anchor (**Alcance:**), and outputs structured Markdown into knowledge/.
 *
 * Usage:
 *   node tools/intelligence/course_ingester.mjs --url "https://www.youtube.com/watch?v=..." --name "slug" --domain "Web Animations"
 * =============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const DEFAULT_COURSES_DIR = path.join(ROOT, 'knowledge', 'architecture_and_books');

function decodeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
    .replace(/\n+/g, ' ')
    .trim();
}

function formatTimestamp(sec) {
  const s = Math.floor(sec);
  const hrs = Math.floor(s / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  if (hrs > 0) {
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function extractYouTubeVideoId(url) {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : (url.length === 11 ? url : null);
}

async function loadYoutubeTranscript() {
  const candidates = [
    path.join(ROOT, 'node_modules', 'youtube-transcript', 'dist', 'youtube-transcript.esm.js'),
    'C:/Users/tomas/.zcode/workspace/default/centinela-studio/node_modules/youtube-transcript/dist/youtube-transcript.esm.js'
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      return await import(`file://${c.replace(/\\/g, '/')}`);
    }
  }
  return await import('youtube-transcript');
}

export async function fetchYouTubeTranscript(videoId, langPref = 'en') {
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  let title = `YouTube Masterclass ${videoId}`;
  let author = 'Technical Creator';

  try {
    const res = await fetch(watchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept-Language': 'en-US,en;q=0.9,es;q=0.8'
      },
      signal: AbortSignal.timeout(6000)
    });
    if (res.ok) {
      const html = await res.text();
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      if (titleMatch) title = decodeHtmlEntities(titleMatch[1].replace(/ - YouTube$/, '').trim());
      const authorMatch = html.match(/"author":"(.*?)"/) || html.match(/"ownerChannelName":"(.*?)"/);
      if (authorMatch) author = decodeHtmlEntities(authorMatch[1]);
    }
  } catch (_) {}

  const ytMod = await loadYoutubeTranscript();
  const YoutubeTranscript = ytMod.YoutubeTranscript || ytMod.default?.YoutubeTranscript;
  let rawSegments = null;

  for (const conf of [{ lang: langPref }, { lang: 'es' }, { lang: 'en' }, undefined]) {
    try {
      const result = await YoutubeTranscript.fetchTranscript(watchUrl, conf);
      if (result && result.length > 0) {
        rawSegments = result;
        break;
      }
    } catch (_) {}
  }

  if (!rawSegments || rawSegments.length === 0) {
    throw new Error(`No public subtitles found for video ${videoId}`);
  }

  const segments = rawSegments
    .map((s) => ({
      start: (s.offset || 0) / 1000,
      text: decodeHtmlEntities(s.text || '')
    }))
    .filter((s) => s.text.length > 0);

  return { title, author, segments };
}

export function formatTranscriptToMarkdown(title, author, videoUrl, segments, domain = 'Software Factory Web & AI Engineering', groupSeconds = 120) {
  const blocks = [];
  let currentStart = segments[0]?.start || 0;
  let currentTexts = [];

  for (const seg of segments) {
    if (seg.start - currentStart >= groupSeconds && currentTexts.length > 0) {
      blocks.push(`### ⏱️ [${formatTimestamp(currentStart)}]\n\n${currentTexts.join(' ')}\n`);
      currentStart = seg.start;
      currentTexts = [];
    }
    currentTexts.push(seg.text);
  }

  if (currentTexts.length > 0) {
    blocks.push(`### ⏱️ [${formatTimestamp(currentStart)}]\n\n${currentTexts.join(' ')}\n`);
  }

  const header = [
    `# 🎓 Video Curso / Masterclass: ${title}`,
    ``,
    `**Alcance:** Transcripción técnica de clase magistral sobre ${domain} (${title} — ${author}). Aplicable a la Software Factory Web y DiggityBets.`,
    ``,
    `> **Institución / Autor:** ${author}  `,
    `> **Fuente URL:** ${videoUrl}  `,
    `> **Fecha de Ingesta:** ${new Date().toISOString().split('T')[0]}  `,
    ``,
    `---`,
    ``
  ].join('\n');

  return `${header}\n${blocks.join('\n')}\n`;
}

async function main() {
  const args = process.argv.slice(2);
  const getArg = (flag) => {
    const idx = args.indexOf(flag);
    return idx !== -1 && args[idx + 1] ? args[idx + 1] : '';
  };

  const url = getArg('--url');
  const filePath = getArg('--file');
  const name = getArg('--name');
  const domain = getArg('--domain') || 'Software Factory Web & AI Systems';

  if (!url && !filePath) {
    console.log('Usage: node tools/intelligence/course_ingester.mjs --url <youtube-url> [--name <slug>] [--domain <domain>]');
    process.exit(0);
  }

  fs.mkdirSync(DEFAULT_COURSES_DIR, { recursive: true });
  let markdownContent = '';
  let finalSlug = name;

  if (url) {
    const videoId = extractYouTubeVideoId(url);
    const { title, author, segments } = await fetchYouTubeTranscript(videoId);
    finalSlug = finalSlug || `course_${title.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 45)}`;
    markdownContent = formatTranscriptToMarkdown(title, author, url, segments, domain);
  } else {
    const rawText = fs.readFileSync(filePath, 'utf8');
    finalSlug = finalSlug || 'course_custom';
    markdownContent = `# 🎓 Video Curso: ${finalSlug}\n\n**Alcance:** Curso técnico sobre ${domain}.\n\n${rawText}`;
  }

  const outPath = path.join(DEFAULT_COURSES_DIR, `${finalSlug}.md`);
  fs.writeFileSync(outPath, markdownContent, 'utf8');
  console.log(`✅ [COURSE INGESTED] ${outPath}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  main().catch((err) => {
    console.error(`❌ [COURSE INGEST ERROR]: ${err.message}`);
    process.exit(1);
  });
}
