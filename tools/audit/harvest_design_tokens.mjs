/**
 * HuntHub & DiggityBets — Automated Playwright Design Harvester
 * =============================================================================
 * Connects references/DEVTOOLS_HARVESTER_SNIPPET.js to Playwright-core.
 * Extracts real computed styles (typography, padding, box-shadows, borders,
 * transitions, backdrop-filters) and slot card catalogs from any target URL.
 * =============================================================================
 */

import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const OUT_DIR = path.join(__dirname, 'out');
fs.mkdirSync(OUT_DIR, { recursive: true });

const TARGET_URL = process.argv[2] || 'http://127.0.0.1:3000';
const OUTPUT_FILE = process.argv[3] || path.join(OUT_DIR, 'harvested_design_dna.json');

const CHROME_PATH = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(p => fs.existsSync(p));

if (!CHROME_PATH) {
  console.error('❌ [Harvester] Chrome/Edge executable not found.');
  process.exit(1);
}

console.log(`🔍 [Harvester] Launching Chrome on target: ${TARGET_URL}...`);

async function harvest() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(2000);

    // Harvest DNA & Token Metrics
    const designDNA = await page.evaluate(() => {
      const getStyles = (el) => {
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        return {
          fontFamily: cs.fontFamily,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          lineHeight: cs.lineHeight,
          color: cs.color,
          background: cs.background,
          backgroundColor: cs.backgroundColor,
          border: cs.border,
          borderRadius: cs.borderRadius,
          boxShadow: cs.boxShadow,
          backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter,
          transition: cs.transition,
          gap: cs.gap,
          padding: cs.padding
        };
      };

      const topbar = document.querySelector('.site-topbar');
      const balancePill = document.querySelector('#topbar-dig-balance-pill');
      const navButtons = Array.from(document.querySelectorAll('.sidebar-nav a, .nav-link-btn'));
      const cards = Array.from(document.querySelectorAll('.module-card, .game-card, .reward-card, .voucher-card'));

      // Check slot cards if Stake or HuntHub
      const slotCards = [];
      const gameCards = document.querySelectorAll('button[data-testid*="game-card"], a[href*="/casino/games/"], [class*="game-card"]');
      gameCards.forEach(c => {
        const img = c.querySelector('img');
        const title = c.getAttribute('aria-label') || (img ? img.getAttribute('alt') : null) || c.textContent.trim();
        if (title && img) {
          slotCards.push({ title: title.slice(0, 40), src: img.src });
        }
      });

      return {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        topbarStyle: getStyles(topbar),
        balancePillStyle: getStyles(balancePill),
        activeNavStyle: getStyles(navButtons.find(b => b.classList.contains('active'))),
        inactiveNavStyle: getStyles(navButtons.find(b => !b.classList.contains('active'))),
        cardStyle: getStyles(cards[0]),
        slotsDetected: slotCards.slice(0, 20),
        totalCards: cards.length
      };
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(designDNA, null, 2), 'utf8');
    console.log(`✅ [Harvester] Design tokens & DNA saved to: ${OUTPUT_FILE}`);
  } catch (err) {
    console.error('⚠️ [Harvester] Error harvesting design DNA:', err.message);
  } finally {
    await browser.close();
  }
}

harvest();
