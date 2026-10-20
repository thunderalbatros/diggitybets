import fs from 'node:fs';

const report = JSON.parse(fs.readFileSync('C:/Users/tomas/.gemini/antigravity-ide/brain/968869e9-c4a9-4cfa-923c-56d651f05958/scratch/deep_inspection_report.json', 'utf8'));

console.log('Total analyzed:', report.length);
const valid = report.filter(r => r.status !== 'error_or_empty');
console.log('Valid sites with content:', valid.length);

valid.sort((a,b) => (b.features.length * 1000000 + b.sizeBytes) - (a.features.length * 1000000 + a.sizeBytes));

console.log('\n=== TOP 25 STREAMER SITES BY COMPLEXITY & FEATURES ===\n');
valid.slice(0, 25).forEach((s, idx) => {
  console.log(`#${idx+1}: ${s.domain} (${Math.round(s.sizeBytes / 1024)} KB)`);
  console.log(`   Title: ${s.title}`);
  console.log(`   Stack: ${s.tech.join(', ')} | Host/CDN: ${s.cdn.join(', ') || 'Direct'}`);
  console.log(`   Features: ${s.features.join(' | ') || 'Simple landing'}`);
  console.log(`   Auth: ${s.authPatterns.join(', ') || 'None explicit'}`);
  console.log(`   Affiliates: ${s.casinoLinks.join(', ') || 'None detected'}`);
  console.log(`   Animations: ${s.animations.join(', ') || 'Native CSS'}`);
  console.log(`   Security Flags: ${s.securityFlags.join('; ') || 'Standard'}`);
  console.log(`   Colors: ${s.topColors.slice(0,5).map(c=>c.color).join(' ')}`);
  console.log(`   APIs: ${s.apiEndpoints.slice(0,6).join(', ') || 'None visible'}`);
  console.log('----------------------------------------------------------------------');
});
