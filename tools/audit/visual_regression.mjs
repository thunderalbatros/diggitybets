#!/usr/bin/env node
/**
 * tools/audit/visual_regression.mjs — PQC Deterministic Component Testbench & Pixelmatch Regression Harness
 * ==========================================================================================================
 * Implements Phase 6.1 of the Self-Evolving Web Software Factory (Design2Code / SWE-bench Multimodal / PQC):
 *   1. Renders isolated UI components (.game-card, .raffle-modal, .hud-bar, .site-topbar) in a deterministic
 *      Component Testbench Sandbox linked to real production CSS (site/css/style.css).
 *   2. Freezes CSS animations/transitions (animations: 'disabled'), waits for document.fonts.ready, and
 *      applies deterministic solid masks over dynamic clocks/counters ([data-dynamic-mask="true"]).
 *   3. Sweeps 3 canonical viewports (Desktop 1440x900, Tablet 768x1024, Mobile 390x844).
 *   4. Compares current PNG buffers against golden baselines via Pixelmatch + PNGJS, enforcing
 *      CONSTRAINTS.md floor: VISUAL_MAX_DIFF_PIXEL_RATIO <= 0.01 (1.0%).
 * ==========================================================================================================
 */

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

const SNAPSHOT_ROOT = path.join(ROOT, 'docs', 'audit_snapshots');
const BASELINE_DIR = path.join(SNAPSHOT_ROOT, 'baseline');
const CURRENT_DIR = path.join(SNAPSHOT_ROOT, 'current');
const DIFF_DIR = path.join(SNAPSHOT_ROOT, 'diff');
const REPORT_PATH = path.join(SNAPSHOT_ROOT, 'visual_regression_report.json');

const MAX_DIFF_PIXEL_RATIO = 0.01; // Hard floor from CONSTRAINTS.md

const VIEWPORTS = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'mobile-390x844', width: 390, height: 844 }
];

const COMPONENTS = [
  'game-card',
  'raffle-modal',
  'hud-bar',
  'site-topbar'
];

const CHROME_PATHS = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
];

function buildTestbenchHtml() {
  return `<!DOCTYPE html>
<html lang="es" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HuntHub — Deterministic Component Testbench Sandbox</title>
  <link rel="stylesheet" href="/site/css/style.css" />
  <style>
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
      caret-color: transparent !important;
    }
    body {
      margin: 0;
      padding: 24px;
      background: #0b0c12;
      color: #f3f5f9;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    }
    .testbench-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      max-width: 1360px;
      margin: 0 auto;
    }
    .tb-stage {
      padding: 20px;
      border-radius: 14px;
      background: #11131d;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .tb-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 16px;
      background: #141724;
      border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 12px;
    }
    .tb-brand {
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #53fc18;
      font-size: 15px;
    }
    .tb-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border-radius: 999px;
      background: rgba(83, 252, 24, 0.12);
      color: #53fc18;
      font-size: 12px;
      font-weight: 700;
    }
    .tb-card {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 16px;
      border-radius: 12px;
      background: #161927;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .tb-card-title {
      font-size: 16px;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
    }
    .tb-card-meta {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #9ba3b8;
    }
    .tb-btn {
      padding: 10px 14px;
      border-radius: 8px;
      border: none;
      background: #53fc18;
      color: #080a0f;
      font-weight: 800;
      font-size: 13px;
      text-align: center;
    }
    .tb-hud {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      padding: 14px;
      border-radius: 12px;
      background: #131622;
      border: 1px solid rgba(83, 252, 24, 0.25);
    }
    .tb-stat-label {
      font-size: 11px;
      text-transform: uppercase;
      color: #8c95aa;
    }
    .tb-stat-val {
      font-size: 16px;
      font-weight: 800;
      color: #f3f5f9;
      font-variant-numeric: tabular-nums;
    }
    [data-dynamic-mask="true"] {
      background: #232738 !important;
      color: transparent !important;
      border-radius: 4px;
      user-select: none;
    }
  </style>
</head>
<body>
  <main class="testbench-grid" aria-label="Component Testbench Sandbox">
    <!-- 1. Site Topbar Component -->
    <section class="tb-stage" data-testbench="site-topbar" aria-label="Topbar Sandbox">
      <header class="tb-topbar site-topbar">
        <span class="tb-brand">DIGGITYBETS // HUNTHUB</span>
        <div style="display:flex;gap:8px;align-items:center;">
          <span class="tb-pill" data-dynamic-mask="true">12,450 $DIG</span>
          <span class="tb-pill" style="background:rgba(255,184,0,0.15);color:#ffb800;">+18 FREE PLAY</span>
        </div>
      </header>
    </section>

    <!-- 2. Game Card Component -->
    <section class="tb-stage" data-testbench="game-card" aria-label="Game Card Sandbox">
      <article class="tb-card game-card">
        <div class="tb-card-meta">
          <span>PRAGMATIC PLAY</span>
          <span style="color:#53fc18;font-weight:700;">RTP 96.50%</span>
        </div>
        <h2 class="tb-card-title">Gates of Olympus 1000</h2>
        <div class="tb-card-meta">
          <span>Max Win: 15,000x</span>
          <span>Tier S Bounty</span>
        </div>
        <div class="tb-btn">PREDICT MULTIPLIER (FREE)</div>
      </article>
    </section>

    <!-- 3. Raffle Modal Component -->
    <section class="tb-stage" data-testbench="raffle-modal" aria-label="Raffle Modal Sandbox">
      <div class="tb-card raffle-modal" role="dialog" aria-label="Provably Fair Raffle">
        <div class="tb-card-meta">
          <span>COMMIT-REVEAL HMAC-SHA256</span>
          <span style="color:#ffb800;">ZERO CUSTODY</span>
        </div>
        <h2 class="tb-card-title">Sunday Streamer Giveaway</h2>
        <p style="margin:0;font-size:12px;color:#9ba3b8;">100% Free entry via Kick chat command. Prizes delivered out-of-band by streamer.</p>
        <div class="tb-btn">VERIFY FAIRNESS SEED</div>
      </div>
    </section>

    <!-- 4. HUD Bar Component -->
    <section class="tb-stage" data-testbench="hud-bar" aria-label="Bonus Hunt HUD Sandbox">
      <div class="tb-hud hud-bar">
        <div>
          <div class="tb-stat-label">BONUSES</div>
          <div class="tb-stat-val">24 / 24</div>
        </div>
        <div>
          <div class="tb-stat-label">BREAK-EVEN</div>
          <div class="tb-stat-val">84.50x</div>
        </div>
        <div>
          <div class="tb-stat-label">LIVE CLOCK</div>
          <div class="tb-stat-val" data-dynamic-mask="true">00:42:19</div>
        </div>
      </div>
    </section>
  </main>
</body>
</html>`;
}

function startTestbenchServer(htmlContent) {
  const server = http.createServer((req, res) => {
    const cleanUrl = decodeURIComponent((req.url || '/').split('?')[0]);
    if (cleanUrl === '/__testbench') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(htmlContent);
      return;
    }
    const filePath = path.join(ROOT, cleanUrl.replace(/^\/+/, ''));
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const mime = ext === '.css' ? 'text/css; charset=utf-8' : 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
      res.end(fs.readFileSync(filePath));
      return;
    }
    res.writeHead(404);
    res.end('Not found');
  });

  return new Promise(resolve => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, url: `http://127.0.0.1:${port}/__testbench` });
    });
  });
}

export async function runVisualRegression(options = {}) {
  const updateBaseline = Boolean(options.updateBaseline || process.argv.includes('--update'));
  console.log(`\n================================================================`);
  console.log(`👁️  PQC COMPONENT VISUAL REGRESSION HARNESS (PIXELMATCH + PNGJS)`);
  console.log(`================================================================`);

  for (const dir of [SNAPSHOT_ROOT, BASELINE_DIR, CURRENT_DIR, DIFF_DIR]) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const testbenchHtml = buildTestbenchHtml();
  fs.writeFileSync(path.join(SNAPSHOT_ROOT, 'component_testbench.html'), testbenchHtml, 'utf8');

  const chromeExecutable = CHROME_PATHS.find(p => fs.existsSync(p));
  if (!chromeExecutable) {
    console.error(`  ❌ System Chrome/Edge not found for headless visual regression.`);
    return { passed: false, error: 'NO_BROWSER_FOUND' };
  }

  const { server, url } = await startTestbenchServer(testbenchHtml);
  let browser = null;
  const comparisons = [];
  let maxObservedDiffRatio = 0;
  let passed = true;

  try {
    browser = await chromium.launch({
      executablePath: chromeExecutable,
      headless: true,
      args: ['--disable-gpu', '--font-render-hinting=none', '--disable-lcd-text']
    });

    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
        timezoneId: 'UTC',
        locale: 'es-AR'
      });
      const page = await context.newPage();
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);

      for (const comp of COMPONENTS) {
        const locator = page.locator(`[data-testbench="${comp}"]`);
        const snapName = `${comp}__${vp.name}.png`;
        const baselinePath = path.join(BASELINE_DIR, snapName);
        const currentPath = path.join(CURRENT_DIR, snapName);
        const diffPath = path.join(DIFF_DIR, snapName);

        const pngBuffer = await locator.screenshot({ animations: 'disabled' });
        fs.writeFileSync(currentPath, pngBuffer);

        if (updateBaseline || !fs.existsSync(baselinePath)) {
          fs.writeFileSync(baselinePath, pngBuffer);
        }

        const imgBaseline = PNG.sync.read(fs.readFileSync(baselinePath));
        const imgCurrent = PNG.sync.read(pngBuffer);

        const width = Math.min(imgBaseline.width, imgCurrent.width);
        const height = Math.min(imgBaseline.height, imgCurrent.height);
        const diffPng = new PNG({ width, height });

        let diffPixels = 0;
        if (imgBaseline.width !== imgCurrent.width || imgBaseline.height !== imgCurrent.height) {
          diffPixels = width * height;
        } else {
          diffPixels = pixelmatch(
            imgBaseline.data,
            imgCurrent.data,
            diffPng.data,
            width,
            height,
            { threshold: 0.1 }
          );
          fs.writeFileSync(diffPath, PNG.sync.write(diffPng));
        }

        const totalPixels = Math.max(1, width * height);
        const diffRatio = Number((diffPixels / totalPixels).toFixed(6));
        if (diffRatio > maxObservedDiffRatio) maxObservedDiffRatio = diffRatio;

        const compPassed = diffRatio <= MAX_DIFF_PIXEL_RATIO;
        if (!compPassed) passed = false;

        comparisons.push({
          component: comp,
          viewport: vp.name,
          width,
          height,
          diffPixels,
          totalPixels,
          diffRatio,
          maxAllowedRatio: MAX_DIFF_PIXEL_RATIO,
          passed: compPassed
        });
      }

      await context.close();
    }
  } finally {
    if (browser) await browser.close();
    server.close();
  }

  const report = {
    timestamp: new Date().toISOString(),
    passed,
    totalSnapshots: comparisons.length,
    maxObservedDiffRatio,
    maxAllowedDiffRatio: MAX_DIFF_PIXEL_RATIO,
    comparisons
  };

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');

  console.log(`  ✓ Audited ${comparisons.length} isolated component snapshots across 3 viewports (1440p, 768p, 390p).`);
  console.log(`  ✓ Max Observed Pixel Diff Ratio: ${(maxObservedDiffRatio * 100).toFixed(3)}% (Max Allowed: ${(MAX_DIFF_PIXEL_RATIO * 100).toFixed(2)}%)`);
  console.log(`  ✓ Verdict: ${passed ? 'PASS (Zero Visual Regression)' : 'FAIL (Visual Drift Detected)'}`);

  return report;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runVisualRegression().then(res => {
    process.exit(res.passed ? 0 : 1);
  });
}
