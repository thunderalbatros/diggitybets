#!/usr/bin/env node
/**
 * HuntHub & DiggityBets — Software Factory PDF Book Ingester
 * =============================================================================
 * Ported & Upgraded from Centinela Studio (tools/ingest-book.mjs).
 * Extracts full technical books from PDF or text files, cleans layout noise,
 * partitions into semantic chapter/section blocks, injects a mandatory LEC-015
 * Scope Anchor (**Alcance:**), and outputs structured Markdown ready for
 * Supercharged Omni-RAG v3 hybrid indexing.
 *
 * Usage:
 *   node tools/intelligence/book_pdf_ingester.mjs --file "path/to/book.pdf" --title "Title" --author "Author" --domain "UI/UX & Web Design"
 * =============================================================================
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const DEFAULT_OUT_DIR = path.join(ROOT, 'knowledge', 'architecture_and_books');

/**
 * Extracts text from an EPUB archive using built-in OS tar
 * @param {string} filePath
 */
export function parseEpubFile(filePath) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'epub_ingest_'));
  try {
    execFileSync('tar', ['-xf', filePath, '-C', tmpDir], { stdio: 'ignore' });
    const htmlFiles = [];
    const walk = (dir) => {
      for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        const fp = path.join(dir, ent.name);
        if (ent.isDirectory()) walk(fp);
        else if (/\.(xhtml|html|htm)$/i.test(ent.name) && !/^(toc|nav|ix|colophon|cover)/i.test(ent.name)) {
          htmlFiles.push(fp);
        }
      }
    };
    walk(tmpDir);
    htmlFiles.sort();

    const chunks = [];
    for (const hf of htmlFiles) {
      const rawHtml = fs.readFileSync(hf, 'utf8');
      const cleaned = rawHtml
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<\/?(h1|h2|h3|p|div|li|tr|br)[^>]*>/gi, '\n')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      chunks.push(cleaned);
    }
    return {
      text: chunks.join('\n\n'),
      numPages: htmlFiles.length
    };
  } finally {
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch (_) {}
  }
}

/**
 * Cleans raw text extracted from PDF pages
 * @param {string} text
 * @returns {string}
 */
export function cleanRawPdfText(text) {
  if (!text) return '';
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\u0000/g, '')
    .replace(/\n\s*\d+\s*\n/g, '\n')
    .replace(/(\w+)-\n(\w+)/g, '$1$2')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Splits book text into logical chapters or sections
 * @param {string} text
 * @param {number} [maxSectionLength=6000]
 * @returns {Array<{ heading: string, content: string }>}
 */
export function partitionBookIntoSections(text, maxSectionLength = 6000) {
  const lines = text.split('\n');
  const sections = [];
  let currentHeading = 'Foundations & Introduction';
  let currentBuffer = [];
  let currentLen = 0;

  const chapterRegex = /^(?:chapter\s+\d+|cap[ií]tulo\s+\d+|part\s+[ivx\d]+|secci[oó]n\s+\d+|lens\s+#?\d+)\b[:.\s-]*(.*)/i;

  for (const line of lines) {
    const trimmed = line.trim();
    const chapterMatch = trimmed.match(chapterRegex);

    if (chapterMatch && trimmed.length < 110) {
      if (currentBuffer.length > 0 && currentLen > 80) {
        sections.push({
          heading: currentHeading,
          content: currentBuffer.join('\n').trim()
        });
        currentBuffer = [];
        currentLen = 0;
      }
      currentHeading = trimmed.replace(/^#+\s*/, '');
      continue;
    }

    currentBuffer.push(line);
    currentLen += line.length + 1;

    if (currentLen >= maxSectionLength && trimmed === '') {
      sections.push({
        heading: currentHeading,
        content: currentBuffer.join('\n').trim()
      });
      currentBuffer = [];
      currentLen = 0;
    }
  }

  if (currentBuffer.length > 0 && currentLen > 40) {
    sections.push({
      heading: currentHeading,
      content: currentBuffer.join('\n').trim()
    });
  }

  return sections;
}

/**
 * Dynamically resolves pdf-parse from local workspace or Centinela Studio
 */
async function loadPdfParse() {
  const candidates = [
    path.join(ROOT, 'node_modules', 'pdf-parse', 'dist', 'pdf-parse', 'esm', 'index.js'),
    path.join(ROOT, 'core', 'node_modules', 'pdf-parse', 'dist', 'pdf-parse', 'esm', 'index.js'),
    'C:/Users/tomas/.zcode/workspace/default/centinela-studio/node_modules/pdf-parse/dist/pdf-parse/esm/index.js',
    'C:/Users/tomas/Documents/yendo_mobile/node_modules/pdf-parse/index.js'
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return await import(`file://${candidate.replace(/\\/g, '/')}`);
    }
  }
  return await import('pdf-parse');
}

/**
 * Parses a PDF file into raw text and page count
 * @param {string} filePath
 */
export async function parsePdfFile(filePath) {
  const pdfParseModule = await loadPdfParse();
  const dataBuffer = fs.readFileSync(filePath);

  if (pdfParseModule.PDFParse) {
    const parser = new pdfParseModule.PDFParse({ data: dataBuffer });
    const textResult = await parser.getText();
    let infoResult = {};
    try {
      infoResult = await parser.getInfo();
    } catch (_) {}
    return {
      text: textResult.text || '',
      numPages: textResult.pages?.length || infoResult.total || 0,
      info: infoResult.info || {}
    };
  }

  const pdfParse = pdfParseModule.default || pdfParseModule;
  const data = await pdfParse(dataBuffer);
  return {
    text: data.text || '',
    numPages: data.numpages || 0,
    info: data.info || {}
  };
}

/**
 * Converts a PDF or text book into a structured Markdown file with LEC-015 Scope Anchor
 */
export async function ingestBookToMarkdown({
  filePath,
  title,
  author = 'Technical Author',
  domain = 'Software Factory Web, UI/UX, Architecture & Interactive Systems',
  slug,
  outDir = DEFAULT_OUT_DIR,
  maxChars = 900_000
}) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  fs.mkdirSync(outDir, { recursive: true });

  const lowerPath = filePath.toLowerCase();
  const isPdf = lowerPath.endsWith('.pdf');
  const isEpub = lowerPath.endsWith('.epub');
  let rawText = '';
  let numPages = 1;

  if (isPdf) {
    const parsed = await parsePdfFile(filePath);
    rawText = parsed.text;
    numPages = parsed.numPages;
  } else if (isEpub) {
    const parsed = parseEpubFile(filePath);
    rawText = parsed.text;
    numPages = parsed.numPages;
  } else {
    rawText = fs.readFileSync(filePath, 'utf8');
  }

  let clean = cleanRawPdfText(rawText);
  if (clean.length < 200) {
    throw new Error(`Insufficient extractable text (${clean.length} chars) in ${path.basename(filePath)}`);
  }

  if (clean.length > maxChars) {
    clean = clean.slice(0, maxChars);
  }

  const bookTitle = title || path.basename(filePath, path.extname(filePath));
  const finalSlug = slug || `book_${bookTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 50)}`;
  const sections = partitionBookIntoSections(clean, 6000);

  const header = [
    `# 📚 Libro Completo: ${bookTitle}`,
    ``,
    `**Alcance:** Fuente bibliográfica completa sobre ${domain} (${bookTitle} — ${author}). Aplicable a la Software Factory Web y DiggityBets. NO sustituye los contratos de API de Kick ni las reglas específicas de negocio en \`CANON_*\`.`,
    ``,
    `> **Autor:** ${author}  `,
    `> **Dominio:** ${domain}  `,
    `> **Archivo Fuente:** \`${path.basename(filePath)}\`  `,
    `> **Páginas Originales:** ${numPages}  `,
    `> **Secciones Extraídas:** ${sections.length}  `,
    `> **Fecha de Ingesta:** ${new Date().toISOString().split('T')[0]}  `,
    ``,
    `---`,
    ``
  ].join('\n');

  const bodyParts = sections.map((sec, idx) => {
    return `## Sección ${idx + 1}: ${sec.heading}\n\n${sec.content}\n`;
  });

  const fullMarkdown = `${header}\n${bodyParts.join('\n---\n\n')}`;
  const outputFile = path.join(outDir, `${finalSlug}.md`);
  fs.writeFileSync(outputFile, fullMarkdown, 'utf8');

  return {
    outputFile,
    slug: finalSlug,
    numPages,
    sectionsCount: sections.length,
    sizeKb: Number((Buffer.byteLength(fullMarkdown) / 1024).toFixed(1))
  };
}

async function main() {
  const args = process.argv.slice(2);
  const getArg = (flag) => {
    const idx = args.indexOf(flag);
    return idx !== -1 && args[idx + 1] ? args[idx + 1] : '';
  };

  const filePath = getArg('--file');
  if (!filePath) {
    console.log('Usage: node tools/intelligence/book_pdf_ingester.mjs --file <path.pdf> [--title <title>] [--author <author>] [--domain <domain>] [--name <slug>] [--out <dir>]');
    process.exit(0);
  }

  const res = await ingestBookToMarkdown({
    filePath,
    title: getArg('--title'),
    author: getArg('--author') || 'Autor Técnico',
    domain: getArg('--domain') || 'Software Factory Web, UI/UX & Interactive Systems',
    slug: getArg('--name'),
    outDir: getArg('--out') ? path.resolve(ROOT, getArg('--out')) : DEFAULT_OUT_DIR
  });

  console.log(`✅ [BOOK INGESTED] ${res.outputFile} (${res.sizeKb} KB, ${res.numPages} pages, ${res.sectionsCount} sections)`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  main().catch((err) => {
    console.error(`❌ [BOOK INGEST ERROR]: ${err.message}`);
    process.exit(1);
  });
}
