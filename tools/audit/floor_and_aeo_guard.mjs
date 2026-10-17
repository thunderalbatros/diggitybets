#!/usr/bin/env node
/**
 * HuntHub & DiggityBets — Addy Osmani Unified Quality Gate
 * Combines:
 *   1. Floor Guard (addyosmani/agent-skills -> constraint-driven-development)
 *   2. Agentic SEO Checker (addyosmani/agentic-seo -> 100-point AEO score)
 *   3. Asset & Overlay Integrity Extractor (addyosmani/oust + web-quality-skills)
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
let failures = 0;

function pass(label) {
  console.log(`✅ ${label}`);
}

function fail(label) {
  console.error(`❌ ${label}`);
  failures++;
}

console.log('====================================================');
console.log('🏛️  ADDY OSMANI FLOOR GUARD, CWV & AGENTIC SEO AUDIT');
console.log('====================================================\n');

// 1. Check CONSTRAINTS.md & AGENTS.md exist and are non-empty
const constraintsPath = path.join(root, 'CONSTRAINTS.md');
const agentsPath = path.join(root, 'AGENTS.md');
if (fs.existsSync(constraintsPath) && fs.statSync(constraintsPath).size > 200) {
  pass('[Floor Guard] CONSTRAINTS.md quality contract is present and enforced.');
} else {
  fail('[Floor Guard] Missing or empty CONSTRAINTS.md.');
}

// 2. Check all 8 OBS Overlays exist in root and are registered in tools/build_dist.mjs
const requiredOverlays = [
  'overlay-battle',
  'overlay-tourney',
  'overlay-bonushunt',
  'overlay-celebration',
  'overlay-slotrequests',
  'wheel-duo',
  'wheel-slots',
  'wheel-csgo'
];
const buildScript = fs.readFileSync(path.join(root, 'tools', 'build_dist.mjs'), 'utf8');
const missingOverlays = requiredOverlays.filter(
  (dir) => !fs.existsSync(path.join(root, dir)) || !buildScript.includes(`'${dir}'`)
);
if (missingOverlays.length === 0) {
  pass(`[Floor Guard] All ${requiredOverlays.length}/8 OBS Browser Source overlays exist and are registered in build_dist.mjs.`);
} else {
  fail(`[Floor Guard] Missing or unregistered overlays: ${missingOverlays.join(', ')}`);
}

// 3. Check for forbidden checker suppressions (@ts-ignore / eslint-disable) in core JS
const coreJsFiles = [
  'site/js/admin-hub.js',
  'site/js/bonushunt.js',
  'overlay-slotrequests/main.js',
  'overlay-celebration/main.js',
  'overlay-battle/main.js',
  'overlay-tourney/main.js'
];
let suppressionCount = 0;
for (const rel of coreJsFiles) {
  const full = path.join(root, rel);
  if (fs.existsSync(full)) {
    const content = fs.readFileSync(full, 'utf8');
    if (/@ts-ignore|@ts-expect-error|eslint-disable/.test(content)) {
      suppressionCount++;
      fail(`[Floor Guard] Checker suppression found in ${rel}`);
    }
  }
}
if (suppressionCount === 0) {
  pass('[Floor Guard] Zero @ts-ignore / eslint-disable suppressions across core controllers & overlays.');
}

// 4. Agentic SEO (addyosmani/agentic-seo) 100-Point Check
let aeoScore = 0;
const robotsTxt = fs.existsSync(path.join(root, 'robots.txt'))
  ? fs.readFileSync(path.join(root, 'robots.txt'), 'utf8')
  : '';
const llmsTxt = fs.existsSync(path.join(root, 'llms.txt'))
  ? fs.readFileSync(path.join(root, 'llms.txt'), 'utf8')
  : '';
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

if (robotsTxt.includes('User-agent: *') && robotsTxt.includes('Allow: /')) aeoScore += 25;
if (llmsTxt.includes('# DiggityBets') && llmsTxt.includes('!sr <slot>')) aeoScore += 25;
if (fs.existsSync(agentsPath)) aeoScore += 25;
if (indexHtml.includes('<meta name="description"') && indexHtml.includes('application/ld+json')) aeoScore += 25;

if (aeoScore === 100) {
  pass(`[Agentic SEO] AEO Score: ${aeoScore}/100 (robots.txt + llms.txt + AGENTS.md + JSON-LD + semantic meta).`);
} else {
  fail(`[Agentic SEO] AEO Score below 100: ${aeoScore}/100.`);
}

// 5. Core Web Vitals & Asset Integrity (addyosmani/web-quality-skills & addyosmani/oust)
const hasSwitches = indexHtml.includes('data-cp-module-toggle="slotrequests"') && indexHtml.includes('cp-webvitals-pill');
if (hasSwitches) {
  pass('[Core Web Vitals] Control Panel ON/OFF Module Switches & Live FPS/INP Telemetry Pill verified.');
} else {
  fail('[Core Web Vitals] Missing ON/OFF Module Switches or #cp-webvitals-pill in index.html.');
}

// Extract local <script src="..."> references (addyosmani/oust pattern) and verify files exist
const scriptMatches = [...indexHtml.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)];
let missingScripts = 0;
for (const m of scriptMatches) {
  const src = m[1];
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) continue;
  const cleanRel = src.split('?')[0].replace(/^\.\//, '').replace(/^\//, '');
  if (!fs.existsSync(path.join(root, cleanRel))) {
    missingScripts++;
    fail(`[Oust Asset Check] Missing local script referenced in index.html: ${src}`);
  }
}
if (missingScripts === 0) {
  pass(`[Oust Asset Check] All ${scriptMatches.length} <script> references in index.html resolve cleanly.`);
}

console.log('----------------------------------------------------');
if (failures > 0) {
  console.error(`🚨 FLOOR / AEO AUDIT FAILED WITH ${failures} ISSUE(S).`);
  process.exit(1);
} else {
  console.log('🎉 FLOOR GUARD, CWV & AGENTIC SEO RESULT: 100% PASS!');
}
