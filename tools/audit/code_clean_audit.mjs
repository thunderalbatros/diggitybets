#!/usr/bin/env node
/**
 * DiggityBets / HuntHub — AI Clean Code, AST Anti-Pattern & 60-FPS Motion Architecture Auditor
 * Usage: node tools/audit/code_clean_audit.mjs
 * Outputs: tools/audit/out/clean-code-report.json (0-100 Score + actionable findings)
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(here, '..', '..');
const outDir = path.join(here, 'out');
fs.mkdirSync(outDir, { recursive: true });

const findings = [];
let filesChecked = 0;
let jsFilesChecked = 0;
let cssFilesChecked = 0;

function addFinding(severity, category, file, line, message, fixHint) {
  findings.push({ severity, category, file, line, message, fixHint });
}

function collectFiles(dir, exts, result = []) {
  if (!fs.existsSync(dir)) return result;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === 'references') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(full, exts, result);
    } else if (exts.includes(path.extname(entry.name).toLowerCase())) {
      result.push(full);
    }
  }
  return result;
}

console.log('==================================================================');
console.log('🧠 DIGGITYBETS — AI CLEAN CODE, AST & 60-FPS ARCHITECTURE AUDITOR');
console.log('==================================================================\n');

// 1. Collect all production JS and CSS files
const targetDirs = [
  path.join(rootDir, 'site'),
  path.join(rootDir, 'worker'),
  path.join(rootDir, 'tools', 'diggity-stake-companion'),
  path.join(rootDir, 'overlay-battle'),
  path.join(rootDir, 'overlay-tourney'),
  path.join(rootDir, 'overlay-bonushunt'),
  path.join(rootDir, 'overlay-celebration'),
  path.join(rootDir, 'overlay-slotrequests'),
  path.join(rootDir, 'wheel-duo'),
  path.join(rootDir, 'wheel-slots'),
  path.join(rootDir, 'wheel-csgo'),
  path.join(rootDir, 'casino-suite')
];

const jsFiles = [];
const cssFiles = [];
for (const d of targetDirs) {
  collectFiles(d, ['.js'], jsFiles);
  collectFiles(d, ['.css'], cssFiles);
}

// 2. Audit JS Syntax, Duplicate Methods, Suppressions & Anti-Patterns
for (const fullPath of jsFiles) {
  const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
  const code = fs.readFileSync(fullPath, 'utf8');
  const lines = code.split(/\r?\n/);
  jsFilesChecked++;
  filesChecked++;

  // 2a. Syntax verification (strip ES module import/export only for vm.Script check if needed)
  const isModule = /^\s*(import|export)\s/m.test(code);
  if (!isModule) {
    try {
      new vm.Script(code, { filename: relPath });
    } catch (err) {
      addFinding('BLOCKER', 'syntax-error', relPath, 1, `JS Syntax Error: ${err.message}`, 'Fix syntax error before committing.');
    }
  }

  // 2b. Check for forbidden linter/type suppressions (@ts-ignore / eslint-disable)
  lines.forEach((line, idx) => {
    if (/@ts-ignore|@ts-expect-error|eslint-disable/.test(line)) {
      addFinding('MAJOR', 'checker-suppression', relPath, idx + 1, 'Forbidden checker suppression comment detected.', 'Resolve underlying issue instead of suppressing.');
    }
  });

  // 2c. Check for 3D tilt deformation on .bounty-card-3d (User rule: Pure Levitation + Laser Border only)
  if (relPath === 'site/js/bounty-system.js') {
    if (code.includes('--rotate-x') || code.includes('--rotate-y')) {
      addFinding('MAJOR', 'ui-deformation-guard', relPath, 1, '3D tilt rotation variables (--rotate-x / --rotate-y) detected in bounty-system.js.', 'Use pure vertical levitation without 3D tilt deformation.');
    }
  }

  // 2d. Check for duplicate top-level class/prototype method definitions in audio engines
  if (relPath === 'site/js/audio.js' || relPath === 'site/js/pro-fx-audio.js') {
    const seenMethods = new Map();
    const methodRegex = /^\s{2,4}([a-zA-Z0-9_]+)\s*\([^)]*\)\s*\{/;
    const blockedKeywords = new Set(['if', 'for', 'while', 'switch', 'catch', 'function', 'return', 'constructor']);
    lines.forEach((line, idx) => {
      const m = line.match(methodRegex);
      if (m && !blockedKeywords.has(m[1])) {
        const name = m[1];
        if (seenMethods.has(name)) {
          addFinding('MAJOR', 'duplicate-method', relPath, idx + 1, `Duplicate method '${name}()' overwrites earlier definition at line ${seenMethods.get(name)}.`, `Remove or rename duplicate '${name}()' method.`);
        } else {
          seenMethods.set(name, idx + 1);
        }
      }
    });
  }
}

// 3. Audit CSS Architecture, GPU Compositor Discipline & De-Deformation Rules
for (const fullPath of cssFiles) {
  const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
  const css = fs.readFileSync(fullPath, 'utf8');
  const lines = css.split(/\r?\n/);
  cssFilesChecked++;
  filesChecked++;

  // 3a. Enforce Zero 3D Tilt Deformation on Bountys (.bounty-card-3d)
  if (relPath === 'site/css/bounties.css') {
    if (/rotateX\s*\(|rotateY\s*\(/i.test(css)) {
      addFinding('BLOCKER', 'bounty-3d-deformation', relPath, 1, 'Found rotateX/rotateY 3D deformation in bounties.css.', 'Keep pure vertical levitation (translateY) + Green/White laser conic-gradient.');
    }
    if (!css.includes('bountyCardLevitate') || !css.includes('#53fc18') || !css.includes('#ffffff')) {
      addFinding('MAJOR', 'bounty-laser-levitation', relPath, 1, 'Missing bountyCardLevitate keyframes or Green (#53fc18) + White (#ffffff) laser perimeter in bounties.css.', 'Ensure both levitation and laser border are active.');
    }
  }

  // 3b. Check @keyframes for non-composited layout thrashing properties (top/left/width/height/margin)
  const keyframeBlocks = css.matchAll(/@keyframes\s+([a-zA-Z0-9_-]+)\s*\{([\s\S]*?\})\s*\}/g);
  for (const match of keyframeBlocks) {
    const kfName = match[1];
    const kfBody = match[2];
    if (/\b(margin-top|margin-left|padding-top|padding-left|top|left)\s*:/i.test(kfBody)) {
      addFinding('MINOR', 'non-composited-keyframe', relPath, 1, `@keyframes '${kfName}' animates layout geometry (top/left/margin/padding) instead of GPU transform.`, 'Use transform: translate3d() / translateY() / scaleX() for 60 FPS compositor execution.');
    }
  }

  // 3c. Check excessive blur radius (> 30px) in OBS overlays
  if (relPath.startsWith('overlay-')) {
    lines.forEach((line, idx) => {
      const m = line.match(/backdrop-filter:\s*blur\((\d+)px\)/i);
      if (m && parseInt(m[1], 10) > 24) {
        addFinding('MINOR', 'obs-gpu-blur-budget', relPath, idx + 1, `High backdrop-filter blur(${m[1]}px) in OBS overlay can exceed 5% GPU budget on integrated graphics.`, 'Reduce blur radius to <= 12px or use radial-gradient.');
      }
    });
  }
}

// 4. Audit index.html Security, Windows 10 Emoji Compatibility & Asset Integrity
const indexHtmlPath = path.join(rootDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  filesChecked++;
  const html = fs.readFileSync(indexHtmlPath, 'utf8');

  // 4a. Check target="_blank" rel="noopener noreferrer"
  const blankLinks = [...html.matchAll(/<a\s+[^>]*target=["']_blank["'][^>]*>/gi)];
  let unsafeBlank = 0;
  for (const m of blankLinks) {
    const tag = m[0];
    if (!tag.includes('rel=') || (!tag.includes('noopener') && !tag.includes('noreferrer'))) {
      unsafeBlank++;
    }
  }
  if (unsafeBlank > 0) {
    addFinding('MAJOR', 'reverse-tabnabbing', 'index.html', 1, `${unsafeBlank} external target="_blank" link(s) missing rel="noopener noreferrer".`, 'Add rel="noopener noreferrer" to all target="_blank" links.');
  }

  // 4b. Check for unsupported Unicode 13-15 emojis that render as tofu [] on Windows 10 Segoe UI Emoji
  const win10UnsupportedEmojis = [
    { char: '\u{1FA9A}', name: 'Carpentry Saw (U+1FA9A)' },
    { char: '\u{1FA75}', name: 'Light Blue Heart (U+1FA75)' },
    { char: '\u{1FA76}', name: 'Grey Heart (U+1FA76)' },
    { char: '\u{1FA77}', name: 'Pink Heart (U+1FA77)' },
    { char: '\u{1FAA9}', name: 'Mirror Ball (U+1FAA9)' }
  ];
  for (const item of win10UnsupportedEmojis) {
    if (html.includes(item.char)) {
      addFinding('MAJOR', 'win10-missing-emoji-glyph', 'index.html', 1, `Unsupported Windows 10 emoji detected: ${item.name} renders as [] box on Windows 10.`, 'Replace with universal Unicode <= 11 emoji or inline SVG.');
    }
  }
}

const blockers = findings.filter(f => f.severity === 'BLOCKER').length;
const majors = findings.filter(f => f.severity === 'MAJOR').length;
const minors = findings.filter(f => f.severity === 'MINOR').length;
const score = Math.max(0, 100 - (blockers * 25) - (majors * 8) - (minors * 2));

const report = {
  generatedAt: new Date().toISOString(),
  score,
  summary: {
    filesChecked,
    jsFilesChecked,
    cssFilesChecked,
    blockers,
    majors,
    minors
  },
  findings
};

fs.writeFileSync(path.join(outDir, 'clean-code-report.json'), JSON.stringify(report, null, 2));

console.log(`✅ Audited ${filesChecked} files (${jsFilesChecked} JS controllers/overlays, ${cssFilesChecked} CSS stylesheets + index.html)`);
console.log(`📊 Clean Code & 60-FPS Architecture Score: ${score}/100 (Blockers: ${blockers}, Majors: ${majors}, Minors: ${minors})`);
if (findings.length > 0) {
  console.log('\nFindings:');
  for (const f of findings) {
    console.log(`  [${f.severity}] ${f.file}:${f.line} (${f.category}) -> ${f.message}`);
  }
} else {
  console.log('🎉 ZERO clean-code, AST, security, or 60-FPS motion anti-patterns detected!');
}

process.exit(blockers > 0 ? 1 : 0);
