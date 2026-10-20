import fs from 'node:fs';

const targetFiles = [
  'getdgn.com.html',
  'jamierewards.gg.html',
  'zengambling.com.html',
  'fortunesrewards.com.html',
  'aitchrewards.com.html',
  'vikingrewards.gg.html',
  'tyceno.gg.html',
  'lukerewards.vip.html'
];

console.log('--- Checking for Whitelabel / Common Vendors ---');
for (const f of targetFiles) {
  const p = 'C:/Users/tomas/.gemini/antigravity-ide/brain/968869e9-c4a9-4cfa-923c-56d651f05958/scratch/sites/' + f;
  if (!fs.existsSync(p)) continue;
  const html = fs.readFileSync(p, 'utf8');
  console.log(`\n=== ${f} ===`);
  
  // Look for common vendors
  const vendors = [];
  if (html.includes('kickrewards') || html.includes('kick-rewards')) vendors.push('KickRewards');
  if (html.includes('affiliate') || html.includes('influencer')) vendors.push('Affiliate/Influencer mention');
  if (html.includes('socket.io') || html.includes('pusher')) vendors.push('WebSockets');
  if (html.includes('vercel')) vendors.push('Vercel');
  if (html.includes('turbopack')) vendors.push('Next.js Turbopack');
  
  // Look for meta tags
  const metas = html.match(/<meta[^>]+>/gi) || [];
  const metaDescriptions = metas.filter(m => m.includes('description') || m.includes('og:site_name') || m.includes('theme-color'));
  console.log('Key Metas:', metaDescriptions.map(m => m.trim()).slice(0, 3));
  
  // Look for Discord servers or contact emails
  const discords = html.match(/discord\.(?:gg|com\/invite)\/[a-zA-Z0-9_\-]+/gi) || [];
  console.log('Discord:', Array.from(new Set(discords)));
  
  // Look for footer text or copyright
  const copyright = html.match(/(?:©|copyright|all rights reserved)[^<]{5,60}/gi) || [];
  console.log('Copyright / Legal:', copyright.slice(0, 2));
}
