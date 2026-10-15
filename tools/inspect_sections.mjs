import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');

const matches = [...html.matchAll(/<section[\s\S]*?>/g)];
console.log('--- ALL SECTIONS FOUND IN index.html ---');
matches.forEach(m => {
  const tag = m[0];
  const idMatch = tag.match(/id=["']([^"']+)["']/);
  const classMatch = tag.match(/class=["']([^"']+)["']/);
  console.log({
    id: idMatch ? idMatch[1] : null,
    class: classMatch ? classMatch[1] : null,
    tag: tag.substring(0, 100)
  });
});

console.log('\n--- NAV BUTTONS ---');
const navMatches = [...html.matchAll(/<a[^>]*class=["'][^"']*nav-link-btn[^"']*["'][^>]*>([\s\S]*?)<\/a>/g)];
navMatches.forEach(m => {
  const full = m[0];
  const text = m[1].trim();
  const hrefMatch = full.match(/href=["']([^"']+)["']/);
  const dataMatch = full.match(/data-target=["']([^"']+)["']/);
  console.log({
    text,
    href: hrefMatch ? hrefMatch[1] : null,
    dataTarget: dataMatch ? dataMatch[1] : null
  });
});
