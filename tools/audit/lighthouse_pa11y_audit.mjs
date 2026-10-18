#!/usr/bin/env node
/**
 * DiggityBets / HuntHub — Google Lighthouse (0-100) & Pa11y (WCAG2AA) Automated Super-Auditor
 * Integrates:
 *   1. Google Lighthouse (Apache-2.0): Performance, Accessibility, Best Practices, SEO (0-100 scores + actionable diagnostics)
 *   2. Pa11y (WCAG2AA via HTML_CodeSniffer + axe-core): Multi-view accessibility & UI ergonomics sweep
 * Usage: node tools/audit/lighthouse_pa11y_audit.mjs
 * Outputs:
 *   - tools/audit/out/lighthouse-pa11y-report.json
 *   - tools/audit/out/AUDIT_SUMMARY.md
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import lighthouse from 'lighthouse';
import pa11y from 'pa11y';

const here = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(here, '..', '..');
const outDir = path.join(here, 'out');
fs.mkdirSync(outDir, { recursive: true });

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
].find(p => fs.existsSync(p));

if (!CHROME) {
  console.error('❌ System Chrome/Edge not found.');
  process.exit(1);
}

// 1. Start lightweight local HTTP server with proper MIME types and mock /api/* endpoints
function startLocalServer() {
  const mimeMap = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain; charset=utf-8'
  };

  const server = http.createServer((req, res) => {
    const cleanUrl = decodeURIComponent((req.url || '/').split('?')[0]);
    if (cleanUrl.startsWith('/api/')) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: true, bounties: [], claims: [] }));
      return;
    }
    const relPath = cleanUrl === '/' ? '/index.html' : cleanUrl;
    const filePath = path.join(rootDir, relPath);
    if (!filePath.startsWith(rootDir) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': mimeMap[ext] || 'application/octet-stream',
      'Cache-Control': 'public, max-age=3600'
    });
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise(resolve => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${port}` });
    });
  });
}

// 2. Launch headless Chrome on a dedicated remote debugging port for Google Lighthouse
function launchHeadlessChrome(debugPort) {
  const userDataDir = path.join(outDir, `.lh-chrome-profile-${debugPort}`);
  fs.mkdirSync(userDataDir, { recursive: true });
  const args = [
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${userDataDir}`,
    '--headless=new',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu-sandbox',
    '--disable-extensions',
    '--disable-background-networking',
    '--window-size=1440,900',
    'about:blank'
  ];
  const proc = spawn(CHROME, args, { stdio: 'ignore' });
  return { proc, userDataDir };
}

async function waitForDebuggerReady(debugPort, timeoutMs = 10000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`http://127.0.0.1:${debugPort}/json/version`);
      if (res.ok) return true;
    } catch (_) {}
    await new Promise(r => setTimeout(r, 150));
  }
  throw new Error('Timed out waiting for Chrome DevTools port ' + debugPort);
}

console.log('==================================================================');
console.log('🚀 GOOGLE LIGHTHOUSE (0-100) + PA11Y (WCAG2AA) AUTOMATED AUDITOR');
console.log('==================================================================\n');

const { server, baseUrl } = await startLocalServer();
const debugPort = 9344;
const { proc: chromeProc, userDataDir } = launchHeadlessChrome(debugPort);

let lighthouseSummary = null;
const pa11yViews = ['#watch', '#bounties', '#stake-leaderboard', '#leaderboard', '#bonushunt', '#tournament', '#house-games', '#store'];
const pa11yResults = [];

try {
  await waitForDebuggerReady(debugPort);
  console.log(`• Running Google Lighthouse (Desktop 1440x900) on ${baseUrl}/#bounties ...`);

  const lhRunnerResult = await lighthouse(`${baseUrl}/#bounties`, {
    port: debugPort,
    logLevel: 'error',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      disabled: false
    },
    throttlingMethod: 'provided'
  });

  const lhr = lhRunnerResult.lhr;
  const scores = {
    performance: Math.round((lhr.categories.performance?.score || 0) * 100),
    accessibility: Math.round((lhr.categories.accessibility?.score || 0) * 100),
    bestPractices: Math.round((lhr.categories['best-practices']?.score || 0) * 100),
    seo: Math.round((lhr.categories.seo?.score || 0) * 100)
  };

  const keyMetrics = {
    firstContentfulPaint: lhr.audits['first-contentful-paint']?.displayValue || 'N/A',
    largestContentfulPaint: lhr.audits['largest-contentful-paint']?.displayValue || 'N/A',
    totalBlockingTime: lhr.audits['total-blocking-time']?.displayValue || '0 ms',
    cumulativeLayoutShift: lhr.audits['cumulative-layout-shift']?.displayValue || '0',
    speedIndex: lhr.audits['speed-index']?.displayValue || 'N/A'
  };

  // Extract actionable Lighthouse improvement opportunities (score < 0.9)
  const actionableAudits = [];
  for (const [id, audit] of Object.entries(lhr.audits)) {
    if (audit.score !== null && audit.score < 0.9 && audit.scoreDisplayMode !== 'notApplicable' && audit.scoreDisplayMode !== 'informative' && audit.scoreDisplayMode !== 'manual') {
      actionableAudits.push({
        id,
        title: audit.title,
        score: Math.round(audit.score * 100),
        displayValue: audit.displayValue || ''
      });
    }
  }

  lighthouseSummary = { scores, keyMetrics, actionableAudits };

  console.log(`  ✅ Lighthouse Performance:    ${scores.performance}/100 (FCP: ${keyMetrics.firstContentfulPaint}, LCP: ${keyMetrics.largestContentfulPaint}, TBT: ${keyMetrics.totalBlockingTime}, CLS: ${keyMetrics.cumulativeLayoutShift})`);
  console.log(`  ✅ Lighthouse Accessibility:  ${scores.accessibility}/100`);
  console.log(`  ✅ Lighthouse Best Practices: ${scores.bestPractices}/100`);
  console.log(`  ✅ Lighthouse SEO:            ${scores.seo}/100\n`);

  // 3. Run Pa11y WCAG2AA Accessibility Sweep across views
  console.log('• Running Pa11y (WCAG2AA — HTML_CodeSniffer + axe-core) across views...');
  for (const hash of pa11yViews) {
    const targetUrl = `${baseUrl}/${hash}`;
    const res = await pa11y(targetUrl, {
      standard: 'WCAG2AA',
      runners: ['axe'],
      timeout: 25000,
      wait: 250,
      chromeLaunchConfig: {
        executablePath: CHROME,
        args: ['--headless=new', '--no-sandbox', '--disable-gpu']
      }
    });
    const errors = (res.issues || []).filter(i => i.type === 'error');
    pa11yResults.push({
      view: hash,
      errorCount: errors.length,
      issues: errors.slice(0, 10).map(i => ({
        code: i.code,
        message: i.message,
        selector: i.selector
      }))
    });
    console.log(`  ✅ Pa11y [${hash.padEnd(18)}] -> Errors: ${errors.length}`);
  }
} finally {
  try { chromeProc.kill(); } catch (_) {}
  try { server.close(); } catch (_) {}
  setTimeout(() => {
    try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (_) {}
  }, 500);
}

const fullReport = {
  generatedAt: new Date().toISOString(),
  lighthouse: lighthouseSummary,
  pa11y: pa11yResults
};

fs.writeFileSync(path.join(outDir, 'lighthouse-pa11y-report.json'), JSON.stringify(fullReport, null, 2));

// Also generate human-readable Markdown summary
const mdLines = [
  '# DiggityBets — Google Lighthouse & Pa11y Automated Audit Report',
  '',
  `Generated: \`${fullReport.generatedAt}\``,
  '',
  '## 1. Google Lighthouse Scores (Desktop 1440x900)',
  '',
  `| Category | Score (0–100) |`,
  `| :--- | :---: |`,
  `| **Performance** | **${lighthouseSummary.scores.performance} / 100** |`,
  `| **Accessibility (WCAG)** | **${lighthouseSummary.scores.accessibility} / 100** |`,
  `| **Best Practices** | **${lighthouseSummary.scores.bestPractices} / 100** |`,
  `| **SEO** | **${lighthouseSummary.scores.seo} / 100** |`,
  '',
  '### Core Web Vitals & Rendering Telemetry',
  `- **First Contentful Paint (FCP)**: \`${lighthouseSummary.keyMetrics.firstContentfulPaint}\``,
  `- **Largest Contentful Paint (LCP)**: \`${lighthouseSummary.keyMetrics.largestContentfulPaint}\``,
  `- **Total Blocking Time (TBT)**: \`${lighthouseSummary.keyMetrics.totalBlockingTime}\``,
  `- **Cumulative Layout Shift (CLS)**: \`${lighthouseSummary.keyMetrics.cumulativeLayoutShift}\``,
  '',
  '## 2. Pa11y Multi-View Accessibility Sweep (`WCAG2AA`)',
  '',
  '| View | WCAG2AA Errors |',
  '| :--- | :---: |',
  ...pa11yResults.map(r => `| \`${r.view}\` | **${r.errorCount}** |`)
];

fs.writeFileSync(path.join(outDir, 'AUDIT_SUMMARY.md'), mdLines.join('\n') + '\n');
console.log('\n📄 Saved full JSON & Markdown reports to tools/audit/out/lighthouse-pa11y-report.json and tools/audit/out/AUDIT_SUMMARY.md');
