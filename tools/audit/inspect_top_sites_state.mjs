import fs from 'node:fs';
import path from 'node:path';

const SITES_DIR = 'C:/Users/tomas/.gemini/antigravity-ide/brain/968869e9-c4a9-4cfa-923c-56d651f05958/scratch/sites';
const targetSites = ['roshtein.com.html', 'getdgn.com.html', 'lukerewards.vip.html', 'thegambler.pro.html', 'spinlife.tv.html', 'classybeef.com.html', 'jamierewards.gg.html', 'zengambling.com.html'];

for (const file of targetSites) {
  const p = path.join(SITES_DIR, file);
  if (!fs.existsSync(p)) continue;
  const html = fs.readFileSync(p, 'utf8');
  console.log(`\n================== ${file} ==================`);
  
  // Extract Next data
  const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">([^<]+)<\/script>/);
  if (nextDataMatch) {
    try {
      const data = JSON.parse(nextDataMatch[1]);
      console.log(`[Next.js Data] buildId: ${data.buildId}, page: ${data.page}`);
      if (data.props?.pageProps) {
        const keys = Object.keys(data.props.pageProps);
        console.log(`   PageProps keys: ${keys.join(', ')}`);
      }
    } catch(e) {
      console.log(`[Next.js Data] Parse error`);
    }
  }

  // Extract Nuxt data
  if (html.includes('__NUXT__')) {
    console.log(`[Nuxt.js Data] Detected __NUXT__ state hydration`);
  }

  // Look for CSP headers or meta
  const csp = html.match(/<meta[^>]*http-equiv=["']Content-Security-Policy["'][^>]*>/i);
  console.log(`[CSP Meta]: ${csp ? csp[0] : 'None declared in HTML meta'}`);

  // Look for script tags
  const scripts = [];
  const scriptRegex = /<script[^>]*src=["']([^"']+)["'][^>]*>/gi;
  let sm;
  while ((sm = scriptRegex.exec(html)) !== null) {
    scripts.push(sm[1]);
  }
  console.log(`[External Scripts count]: ${scripts.length}`);
  console.log(`   Sample scripts: ${scripts.slice(0, 5).join('\n   ')}`);

  // Check form actions and inputs
  const inputs = [];
  const inputRegex = /<input[^>]*name=["']([^"']+)["'][^>]*>/gi;
  let im;
  while ((im = inputRegex.exec(html)) !== null) {
    inputs.push(im[1]);
  }
  if (inputs.length > 0) {
    console.log(`[Form inputs]: ${Array.from(new Set(inputs)).slice(0, 8).join(', ')}`);
  }
}
