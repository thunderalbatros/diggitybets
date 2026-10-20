// tools/audit/deep_streamer_site_inspector.mjs
// Deep Inspector for Streamer Community & Reward Websites
// Uses REA reverse-engineering principles, AST inspection, and Design DNA extraction.

import fs from 'node:fs';
import path from 'node:path';

const SITES_DIR = 'C:/Users/tomas/.gemini/antigravity-ide/brain/968869e9-c4a9-4cfa-923c-56d651f05958/scratch/sites';
const OUT_REPORT = 'C:/Users/tomas/.gemini/antigravity-ide/brain/968869e9-c4a9-4cfa-923c-56d651f05958/scratch/deep_inspection_report.json';

const files = fs.readdirSync(SITES_DIR).filter(f => f.endsWith('.html'));

console.log(`Starting deep inspection of ${files.length} streamer sites...`);

const results = [];

for (const file of files) {
  const filePath = path.join(SITES_DIR, file);
  const html = fs.readFileSync(filePath, 'utf8');
  const siteDomain = file.replace('.html', '');

  // Skip tiny error files
  if (html.length < 500) {
    results.push({
      domain: siteDomain,
      status: 'error_or_empty',
      sizeBytes: html.length,
    });
    continue;
  }

  // 1. Framework & Stack Detection
  const tech = [];
  if (html.includes('__NEXT_DATA__') || html.includes('_next/static')) tech.push('Next.js (React)');
  if (html.includes('__NUXT__') || html.includes('/_nuxt/')) tech.push('Nuxt (Vue.js)');
  if (html.includes('__sveltekit')) tech.push('SvelteKit');
  if (html.includes('wp-content') || html.includes('wp-includes')) tech.push('WordPress');
  if (html.includes('vite/client') || html.includes('assets/index-')) tech.push('Vite SPA');
  if (html.includes('gatsby')) tech.push('Gatsby');
  if (tech.length === 0) {
    if (html.includes('react')) tech.push('React');
    else if (html.includes('vue')) tech.push('Vue');
    else tech.push('Vanilla / Custom SSR');
  }

  // CDN & Hosting
  const cdn = [];
  if (html.includes('cdn-cgi') || html.includes('cloudflare')) cdn.push('Cloudflare');
  if (html.includes('vercel')) cdn.push('Vercel');
  if (html.includes('netlify')) cdn.push('Netlify');
  if (html.includes('firebaseapp.com') || html.includes('googleapis.com')) cdn.push('Google Cloud / Firebase');
  if (html.includes('supabase.co')) cdn.push('Supabase');

  // 2. Authentication & Kick Integration
  const authPatterns = [];
  if (/kick\.com\/oauth|oauth\/kick|api\/auth\/kick|provider=kick/i.test(html)) authPatterns.push('Kick OAuth 2.1');
  if (/discord\.com\/oauth2|discordapp\.com\/api\/oauth2|provider=discord/i.test(html)) authPatterns.push('Discord OAuth 2');
  if (/google\.com\/o\/oauth2/i.test(html)) authPatterns.push('Google OAuth');
  if (/twitch\.tv\/login/i.test(html)) authPatterns.push('Twitch OAuth');
  if (/\"auth\"|\"login\"|\"session\"/i.test(html)) authPatterns.push('Custom Auth / Token');
  if (/turnstile/i.test(html)) authPatterns.push('Cloudflare Turnstile (Anti-bot)');
  if (/recaptcha/i.test(html)) authPatterns.push('Google reCAPTCHA');
  if (/hcaptcha/i.test(html)) authPatterns.push('hCaptcha');

  // 3. API Endpoints & Routes Discovered
  const apiMatches = new Set();
  const apiRegex = /["'](\/(?:api|_next\/data|v1|v2|trpc)\/[a-zA-Z0-9_\-\/]+)["']/g;
  let m;
  while ((m = apiRegex.exec(html)) !== null) {
    if (!m[1].includes('.js') && !m[1].includes('.css') && !m[1].includes('.png')) {
      apiMatches.add(m[1]);
    }
  }

  // 4. External Services & Backend Clues
  const services = [];
  if (/supabase\.co/i.test(html)) services.push('Supabase (PostgreSQL Edge)');
  if (/firebaseio\.com|firestore\.googleapis/i.test(html)) services.push('Firebase / Firestore');
  if (/pusher\.com|socket\.io/i.test(html)) services.push('WebSocket (Pusher / Socket.io)');
  if (/posthog/i.test(html)) services.push('PostHog Analytics');
  if (/googletagmanager|google-analytics/i.test(html)) services.push('Google Analytics');
  if (/sentry\.io/i.test(html)) services.push('Sentry Error Tracking');
  if (/crisp\.chat|intercom/i.test(html)) services.push('Customer Support Chat');

  // 5. Casino / Affiliate Integrations
  const casinoLinks = [];
  const casMatch = html.match(/(?:stake|roobet|rainbet|gamdom|shuffle|thrill|duelbits|bcgame|metaspins)\.(?:com|us|games|bet|io|st)/gi);
  if (casMatch) {
    casinoLinks.push(...new Set(casMatch.map(c => c.toLowerCase())));
  }

  // 6. Design & Aesthetic Analysis
  // Fonts
  const fonts = [];
  const fontMatches = html.match(/(?:font-family:[^;}]+|family=([A-Za-z\+\s]+)(?:[:&]|%3A))/gi) || [];
  fontMatches.forEach(f => {
    const clean = f.replace(/family=/i, '').replace(/font-family:/i, '').replace(/['"]/g, '').split(';')[0].trim();
    if (clean && clean.length > 2 && !fonts.includes(clean)) fonts.push(clean);
  });

  // Colors
  const hexColors = html.match(/#[0-9a-fA-F]{6}\b/g) || [];
  const colorCounts = {};
  for (const c of hexColors) {
    const lc = c.toLowerCase();
    colorCounts[lc] = (colorCounts[lc] || 0) + 1;
  }
  const topColors = Object.entries(colorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([c, count]) => ({ color: c, count }));

  // Animation indicators
  const animations = [];
  if (html.includes('framer-motion') || html.includes('motion.')) animations.push('Framer Motion');
  if (html.includes('gsap') || html.includes('TweenMax') || html.includes('ScrollTrigger')) animations.push('GSAP');
  if (html.includes('canvas-confetti')) animations.push('Canvas Confetti');
  if (html.includes('lottie')) animations.push('Lottie / Bodymovin');
  if (html.includes('three.js') || html.includes('three.min.js')) animations.push('Three.js (3D WebGL)');
  if (html.includes('@keyframes') || /keyframes\s+[a-zA-Z0-9_\-]+/i.test(html)) animations.push('Native CSS Keyframes');
  if (html.includes('animate-') || html.includes('transition-all')) animations.push('Tailwind Transitions');

  // Features & Offerings
  const features = [];
  if (/leaderboard|race|top wager/i.test(html)) features.push('Leaderboards / Wager Race');
  if (/raffle|giveaway|sorteo/i.test(html)) features.push('Raffles & Giveaways');
  if (/store|shop|redeem|tienda|puntos/i.test(html)) features.push('Points Store / Rewards');
  if (/bonus hunt|hunt tracker/i.test(html)) features.push('Bonus Hunt Tracker');
  if (/mines|dice|plinko|crash|wheel|hilo|blackjack|roulette/i.test(html)) features.push('House Games / Minigames');
  if (/tournament|battle|bracket/i.test(html)) features.push('Tournaments / Battles');
  if (/daily chest|daily bonus|case opening|box/i.test(html)) features.push('Daily Cases / Chests');
  if (/guess the balance|gtb|guess/i.test(html)) features.push('Guess the Balance');

  // 7. Security & Risk Flags
  const securityFlags = [];
  if (html.includes('unsafe-inline') || html.includes('unsafe-eval')) securityFlags.push('Weak CSP (unsafe-inline/eval)');
  if (/NEXT_PUBLIC_[A-Z0-9_]*KEY|supabase.*anon/i.test(html)) securityFlags.push('Exposed Public Client Keys');
  if (!html.includes('turnstile') && !html.includes('recaptcha') && !html.includes('hcaptcha') && features.includes('Raffles & Giveaways')) {
    securityFlags.push('No Bot Verification on Raffles/Forms');
  }
  if (!html.includes('kick.com/oauth') && features.includes('Leaderboards / Wager Race')) {
    securityFlags.push('Unverified Kick Identity (Manual Username Binding Risk)');
  }

  // Title & Meta
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : siteDomain;

  results.push({
    domain: siteDomain,
    title,
    sizeBytes: html.length,
    tech,
    cdn,
    authPatterns,
    features,
    casinoLinks,
    fonts: fonts.slice(0, 5),
    topColors,
    animations,
    apiEndpoints: Array.from(apiMatches).slice(0, 15),
    services,
    securityFlags
  });
}

fs.writeFileSync(OUT_REPORT, JSON.stringify(results, null, 2), 'utf8');
console.log(`Saved report to ${OUT_REPORT}. Analyzed ${results.length} sites.`);
