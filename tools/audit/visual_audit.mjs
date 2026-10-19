// Visual Auditor (Playwright + system Chrome). Zero download, zero cost.
// Usage:  node tools/audit/visual_audit.mjs [baseUrl]    (default http://127.0.0.1:3000, auto-starts local server if needed)
// Output: tools/audit/out/<view>-<width>.png  +  tools/audit/out/report.json  (exit 1 if any BLOCKER)
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(here, '..', '..');
const out = path.join(here, 'out');
fs.mkdirSync(out, { recursive: true });

let BASE = process.argv[2] || 'http://127.0.0.1:3000';
let embeddedServer = null;

async function ensureServer() {
  if (process.argv[2]) return;
  try {
    const res = await fetch(BASE + '/index.html', { method: 'HEAD' });
    if (res.ok) return;
  } catch (_) {}

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

  embeddedServer = http.createServer((req, res) => {
    const cleanUrl = decodeURIComponent((req.url || '/').split('?')[0]);
    if (cleanUrl.startsWith('/api/')) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: true }));
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
    res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });

  await new Promise((resolve) => {
    embeddedServer.listen(0, '127.0.0.1', () => {
      const addr = embeddedServer.address();
      BASE = `http://127.0.0.1:${addr.port}`;
      resolve();
    });
  });
}

const VIEWPORTS = [{ w: 1440, h: 900 }, { w: 768, h: 1024 }, { w: 390, h: 844 }];
const VIEWS = ['watch', 'bonushunt', 'tournament', 'house-games', 'store', 'stake-leaderboard', 'bounties', 'leaderboard', 'profile', 'admin'];
const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(p => fs.existsSync(p));

// Runs inside the page: returns a list of findings for the currently visible view.
function pageChecks() {
  const findings = [];
  const vw = document.documentElement.clientWidth;
  const sel = el => {
    const id = el.id ? '#' + el.id : '';
    const cls = (el.className && typeof el.className === 'string') ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
    return el.tagName.toLowerCase() + id + cls;
  };
  const visible = el => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && s.opacity !== '0';
  };
  // 1. Accidental page-level horizontal scroll
  if (document.documentElement.scrollWidth > vw + 1)
    findings.push({ sev: 'BLOCKER', rule: 'h-scroll', msg: `page scrollWidth ${document.documentElement.scrollWidth} > viewport ${vw}` });

  // contrast helpers
  const parse = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(',').map(parseFloat); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const lum = ({ r, g, b }) => { const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
  const bgOf = el => { let n = el; while (n) { const c = parse(getComputedStyle(n).backgroundColor); if (c && c.a > .85) return c; n = n.parentElement; } return { r: 5, g: 8, b: 14, a: 1 }; };

  const seen = new Set();
  for (const el of document.body.querySelectorAll('*')) {
    if (!visible(el)) continue;
    if (el.closest('[style*="display: none"], [hidden], .oculto')) continue;
    // On mobile/tablet (< 1080px), .site-sidebar is an intentional off-canvas drawer; on desktop (>= 1080px), audit it!
    if (vw <= 1080 && el.closest('.site-sidebar')) continue;
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const key = sel(el);
    // 2. Element sticks out of the viewport horizontally (skip scroll containers)
    let scrollParent = false;
    for (let p = el.parentElement; p && p !== document.body && p !== document.documentElement; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if (o === 'auto' || o === 'scroll' || o === 'hidden') { scrollParent = true; break; } }
    if (!scrollParent && (r.right > vw + 2 || r.left < -2) && r.width < vw * 3 && !seen.has('o' + key)) {
      seen.add('o' + key);
      findings.push({ sev: 'MAJOR', rule: 'overflow-x', msg: `${key} spans ${Math.round(r.left)}..${Math.round(r.right)} (vw ${vw})` });
    }
    // 3. Truncated text (skip intentionally clipped screen-reader elements)
    const ownText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1);
    if (ownText && !el.closest('.sr-only') && !el.classList.contains('sr-only')) {
      if ((s.overflow === 'hidden' || s.textOverflow === 'ellipsis') && el.scrollWidth > el.clientWidth + 2 && !seen.has('t' + key)) {
        seen.add('t' + key);
        findings.push({ sev: 'MAJOR', rule: 'truncated-text', msg: `${key} "${el.textContent.trim().slice(0, 40)}" clipped (${el.scrollWidth}>${el.clientWidth})` });
      }
      // 4. Contrast (WCAG AA 4.5 normal / 3 large)
      const fg = parse(s.color); const bg = bgOf(el);
      let gradient = false; for (let n = el; n; n = n.parentElement) { if (getComputedStyle(n).backgroundImage.includes('gradient')) { gradient = true; break; } }
      if (fg && fg.a > .5 && !gradient && !el.closest('button:disabled') && !seen.has('c' + key)) {
        const L1 = lum(fg), L2 = lum(bg); const ratio = (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05);
        const size = parseFloat(s.fontSize); const large = size >= 24 || (size >= 18.66 && parseInt(s.fontWeight) >= 700);
        if (ratio < (large ? 3 : 4.5)) { seen.add('c' + key); findings.push({ sev: 'MINOR', rule: 'contrast', msg: `${key} ratio ${ratio.toFixed(2)} (${s.color} on ${s.backgroundColor === 'rgba(0, 0, 0, 0)' ? 'inherited' : s.backgroundColor})` }); }
      }
    }
    // 5. Tap targets on touch widths (standalone buttons/links; inline prose links are exempt per WCAG 2.5.5/2.5.8)
    if (vw <= 480 && (el.tagName === 'BUTTON' || el.tagName === 'A' || el.tagName === 'INPUT') && (r.height < 32 || r.width < 32) && !seen.has('a' + key)) {
      if (el.closest('.footer-compliance-box, p') || s.display === 'inline') continue;
      seen.add('a' + key);
      findings.push({ sev: 'MINOR', rule: 'tap-target', msg: `${key} is ${Math.round(r.width)}x${Math.round(r.height)}px` });
    }
  }
  // 6. Images without alt / broken
  for (const img of document.images) { if (!visible(img)) continue; if (!img.hasAttribute('alt')) findings.push({ sev: 'MINOR', rule: 'img-alt', msg: img.src.split('/').pop() }); if (img.complete && img.naturalWidth === 0) findings.push({ sev: 'MAJOR', rule: 'broken-img', msg: img.src }); }
  // 7. Heading structure
  const h1 = [...document.querySelectorAll('h1')].filter(visible).length;
  if (h1 !== 1) findings.push({ sev: 'MINOR', rule: 'h1-count', msg: `${h1} visible <h1>` });
  // 8. Raw OS Emoji Check in key icon containers (must be SVG or clean text)
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  for (const el of document.querySelectorAll('.nav-icon, .hg-tab-icon, .store-badge-icon')) {
    if (visible(el) && emojiRegex.test(el.textContent) && !el.querySelector('svg')) {
      findings.push({ sev: 'MINOR', rule: 'raw-os-emoji', msg: `${sel(el)} uses raw OS emoji instead of vector SVG` });
    }
  }
  // 9. Sibling Bounding-Box Collision Check (detect unintentional overlap)
  for (const parent of document.querySelectorAll('.section-header-row, .topbar-right, .store-card-footer, .hg-controls-col')) {
    if (!visible(parent)) continue;
    const kids = [...parent.children].filter(visible);
    for (let i = 0; i < kids.length; i++) {
      for (let j = i + 1; j < kids.length; j++) {
        const a = kids[i].getBoundingClientRect();
        const b = kids[j].getBoundingClientRect();
        const ox = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
        const oy = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
        if (ox > 8 && oy > 8 && getComputedStyle(kids[i]).position !== 'absolute' && getComputedStyle(kids[j]).position !== 'absolute') {
          findings.push({ sev: 'MAJOR', rule: 'sibling-overlap', msg: `${sel(kids[i])} overlaps ${sel(kids[j])} by ${Math.round(ox)}x${Math.round(oy)}px` });
        }
      }
    }
  }

  // 10. Symmetrical Topbar Logo & Fixed $DIG Balance Pill
  const topbarCenter = document.querySelector('.topbar-center');
  const logoImg = document.querySelector('.site-header-logo');
  if (topbarCenter && visible(topbarCenter) && logoImg && visible(logoImg)) {
    const lr = topbarCenter.getBoundingClientRect();
    const logoCenter = lr.left + lr.width / 2;
    const vpCenter = vw / 2;
    const centerDiff = Math.abs(logoCenter - vpCenter);
    if (centerDiff > 4) {
      findings.push({
        sev: 'MAJOR',
        rule: 'topbar-logo-center',
        msg: `.topbar-center (${logoCenter.toFixed(1)}px) is off from viewport center (${vpCenter.toFixed(1)}px) by ${centerDiff.toFixed(1)}px (> 4px)`
      });
    }
  }
  const digPill = document.querySelector('#topbar-dig-balance-pill');
  if (digPill && visible(digPill)) {
    const ps = getComputedStyle(digPill);
    const pr = digPill.getBoundingClientRect();
    const pillHeight = parseFloat(ps.height) || pr.height;
    const valEl = digPill.querySelector('.user-balance-val');
    const valFontSize = valEl ? parseFloat(getComputedStyle(valEl).fontSize) : 0;
    // Scale check: height >= 24px and value font >= 11px on all viewports
    if (pillHeight < 24 || valFontSize < 11) {
      findings.push({
        sev: 'MAJOR',
        rule: 'dig-balance-scale',
        msg: `#topbar-dig-balance-pill scale check: height=${pillHeight.toFixed(1)}px (expected >= 24px), fontSize=${valFontSize.toFixed(1)}px (expected >= 11px)`
      });
    }
  }

  // 11. De-boxing del Sidebar PORTAL (Inactive buttons must not have visible box/border)
  if (vw >= 1080) {
    const inactiveNavBtns = document.querySelectorAll('.sidebar-nav-menu .nav-link-btn:not(.active)');
    for (const btn of inactiveNavBtns) {
      if (!visible(btn)) continue;
      const bs = getComputedStyle(btn);
      const bWidth = parseFloat(bs.borderWidth) || 0;
      const bColor = bs.borderColor;
      const isTransparentBorder = bWidth === 0 || bColor === 'transparent' || bColor === 'rgba(0, 0, 0, 0)' || bs.borderStyle === 'none';
      if (!isTransparentBorder) {
        findings.push({
          sev: 'MAJOR',
          rule: 'sidebar-deboxing',
          msg: `${sel(btn)} inactive item has visible box border (${bs.borderWidth} ${bs.borderColor})`
        });
      }
    }
  }

  // 12. Watch Section Purity (Kick live player + original Socials/Stake only, no duplicate command sidebars)
  const watchSec = document.querySelector('#watch');
  if (watchSec && visible(watchSec)) {
    const forbiddenPanels = watchSec.querySelectorAll('.stream-chat-commands, .chat-commands-panel, .command-side-panel, .extra-commands');
    if (forbiddenPanels.length > 0) {
      findings.push({
        sev: 'MAJOR',
        rule: 'watch-section-purity',
        msg: `#watch contains ${forbiddenPanels.length} duplicate/extra command side panels`
      });
    }
    const playerCard = watchSec.querySelector('.stream-player-card');
    const socialsGrid = watchSec.querySelector('.socials-horizontal-grid');
    if (!playerCard) {
      findings.push({ sev: 'MAJOR', rule: 'watch-player-missing', msg: '#watch missing .stream-player-card' });
    }
    if (!socialsGrid) {
      findings.push({ sev: 'MAJOR', rule: 'watch-socials-missing', msg: '#watch missing .socials-horizontal-grid' });
    }
  }

  // 13. Clean Space Ratio Gate (At least 35% of the screen must be free of heavy nested bordered boxes)
  const allBoxes = document.querySelectorAll('.module-card, .game-card, .reward-card, .control-box, .stat-card');
  let totalBoxArea = 0;
  for (const box of allBoxes) {
    if (!visible(box)) continue;
    const br = box.getBoundingClientRect();
    totalBoxArea += br.width * br.height;
  }
  const screenArea = vw * (window.innerHeight || 900);
  const cleanSpaceRatio = Math.max(0, 1 - (totalBoxArea / (screenArea * 1.8)));
  if (cleanSpaceRatio < 0.35) {
    findings.push({
      sev: 'MAJOR',
      rule: 'clean-space-ratio',
      msg: `Clean space ratio ${(cleanSpaceRatio * 100).toFixed(1)}% is below 35% aesthetic bar`
    });
  }

  // 14. 100% Zoom Native Fit Check (1440x900 viewport fits stream player within ergonomic bounds)
  const currentView = document.querySelector('.view-section.active-view');
  if (vw >= 1080 && currentView && currentView.id === 'watch') {
    const player = currentView.querySelector('.stream-player-card');
    if (player && visible(player)) {
      const pr = player.getBoundingClientRect();
      if (pr.height > 660) {
        findings.push({
          sev: 'MAJOR',
          rule: '100pct-zoom-fit',
          msg: `Stream player height ${pr.height.toFixed(0)}px exceeds 660px for 100% zoom fit`
        });
      }
    }
  }

  // 15. Anti-3D Deformation Guard (Interactive cards must use pure vertical levitation, never 3D tilt/skew matrix3d)
  for (const card of document.querySelectorAll('.bounty-card-3d, .kick-podium-card, .store-voucher-card')) {
    if (!visible(card)) continue;
    const tf = getComputedStyle(card).transform;
    if (tf && tf.startsWith('matrix3d(')) {
      findings.push({
        sev: 'MAJOR',
        rule: 'no-card-3d-skew',
        msg: `${sel(card)} applies 3D matrix3d deformation (${tf.slice(0, 36)}...); must use pure vertical levitation`
      });
    }
  }

  // 16. Grid Row Card Alignment & Height Symmetry (Cards in the same row of #bounties-cards-grid must match height within <= 3px)
  const bountyCards = [...document.querySelectorAll('#bounties-cards-grid .bounty-card-3d')].filter(visible);
  for (let i = 0; i < bountyCards.length; i++) {
    for (let j = i + 1; j < bountyCards.length; j++) {
      const ra = bountyCards[i].getBoundingClientRect();
      const rb = bountyCards[j].getBoundingClientRect();
      if (Math.abs(ra.top - rb.top) < 18 && Math.abs(ra.height - rb.height) > 3) {
        findings.push({
          sev: 'MINOR',
          rule: 'grid-row-symmetry',
          msg: `Bounty cards in same row have unequal heights (${Math.round(ra.height)}px vs ${Math.round(rb.height)}px)`
        });
        break;
      }
    }
  }

  // 17. Runtime Web Animations API (document.getAnimations) 60-FPS GPU Compositor Check
  if (typeof document.getAnimations === 'function') {
    for (const anim of document.getAnimations()) {
      try {
        if (anim.effect && typeof anim.effect.getKeyframes === 'function') {
          const targetEl = anim.effect.target;
          if (!targetEl || !visible(targetEl)) continue;
          const kfs = anim.effect.getKeyframes();
          for (const kf of kfs) {
            if ('top' in kf || 'left' in kf || 'marginTop' in kf || 'marginLeft' in kf) {
              findings.push({
                sev: 'MINOR',
                rule: 'non-composited-animation',
                msg: `${sel(targetEl)} animates layout property via WAAPI/CSS instead of GPU transform`
              });
              break;
            }
          }
        }
      } catch (_) {}
    }
  }

  return findings;
}

await ensureServer();
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const report = { base: BASE, generated: new Date().toISOString(), runs: [], cdpTelemetry: {}, console: [], failedRequests: [] };
let blockers = 0;

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  let cdp = null;
  if (vp.w === 1440) {
    try {
      cdp = await ctx.newCDPSession(page);
      await cdp.send('Performance.enable');
    } catch (_) {}
  }
  page.on('console', m => {
    if (m.type() === 'error') {
      const txt = m.text();
      if (/pusher\.app|ERR_NAME_NOT_RESOLVED/i.test(txt)) return;
      report.console.push(`[${vp.w}] ${txt.slice(0, 200)}`);
    }
  });
  page.on('pageerror', e => report.console.push(`[${vp.w}] PAGEERROR ${e.message.slice(0, 200)}`));
  page.on('response', r => { if (r.status() >= 400 && !/kick\.com|fonts\.g|imgix|pusher\.app/.test(r.url())) report.failedRequests.push(`[${vp.w}] ${r.status()} ${r.url().slice(0, 140)}`); });
  page.on('requestfailed', r => { const u = r.url(); if (!/kick\.com|fonts\.g|imgix|pusher\.app/.test(u)) report.failedRequests.push(`[${vp.w}] ${u.slice(0, 140)}`); });
  await page.goto(BASE + '/#watch', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(1200);
  for (const v of VIEWS) {
    await page.evaluate(id => {
      if (id === 'admin') {
        localStorage.setItem('hunthub_is_admin', 'true');
        localStorage.setItem('hunthub_kick_username', 'diggitybets');
        localStorage.setItem('hunthub_kick_logged_in', 'true');
        if (window.userStore) {
          window.userStore.username = 'diggitybets';
          window.userStore.isLoggedIn = true;
          if (typeof window.userStore.syncUI === 'function') window.userStore.syncUI();
        }
        if (window.adminHub && typeof window.adminHub.checkAdminAccess === 'function') {
          window.adminHub.checkAdminAccess();
        }
      }
      if (window.switchView) window.switchView('#' + id);
    }, v);
    await page.waitForTimeout(450);
    const findings = await page.evaluate(pageChecks);
    if (cdp && vp.w === 1440) {
      try {
        const { metrics } = await cdp.send('Performance.getMetrics');
        const map = {};
        for (const m of metrics) map[m.name] = m.value;
        report.cdpTelemetry[v] = {
          layoutCount: map.LayoutCount || 0,
          recalcStyleCount: map.RecalcStyleCount || 0,
          scriptDurationMs: Math.round((map.ScriptDuration || 0) * 1000),
          taskDurationMs: Math.round((map.TaskDuration || 0) * 1000),
          jsHeapUsedMB: Number(((map.JSHeapUsedSize || 0) / (1024 * 1024)).toFixed(2))
        };
      } catch (_) {}
      try {
        await page.screenshot({ path: path.join(out, `${v}-${vp.w}.png`), fullPage: false, timeout: 8000 });
      } catch (err) {
        console.warn(`[VisualAudit] Screenshot warning for ${v}-${vp.w}:`, err.message);
      }
    }
    blockers += findings.filter(f => f.sev === 'BLOCKER').length;
    report.runs.push({ view: v, width: vp.w, findings });
  }
  await ctx.close();
}
await browser.close();
if (embeddedServer) {
  await new Promise(resolve => embeddedServer.close(resolve));
}
fs.writeFileSync(path.join(out, 'report.json'), JSON.stringify(report, null, 2));

// Console summary
for (const r of report.runs) {
  const c = { BLOCKER: 0, MAJOR: 0, MINOR: 0 };
  r.findings.forEach(f => c[f.sev]++);
  console.log(`${String(r.width).padStart(4)}px  ${r.view.padEnd(12)} B:${c.BLOCKER} M:${c.MAJOR} m:${c.MINOR}`);
}
console.log(`console errors: ${report.console.length}, failed requests: ${report.failedRequests.length}`);
process.exit(blockers ? 1 : 0);
