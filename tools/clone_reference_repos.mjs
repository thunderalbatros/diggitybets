import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const REPOS = [
  // A. House Games y Motor "Provably Fair"
  { name: 'vfair-games', url: 'https://github.com/vfairgames/vfair-games.git' },
  { name: 'stake-originals-clone-react', url: 'https://github.com/tanh1c/stake-originals-clone.git' },
  { name: 'grow-game', url: 'https://github.com/BrightKingsley/grow-game.git' },
  { name: 'plinko-game-matter', url: 'https://github.com/kayooliveira/plinko-game.git' },
  { name: 'plinko-game-svelte', url: 'https://github.com/AnsonH/plinko-game.git' },
  { name: 'nours-casino', url: 'https://github.com/Nou4r/nours-casino.git' },
  { name: 'casino-case-opening', url: 'https://github.com/ISoft-op/Casino-case-opening.git' },

  // B. Integración con Kick.com (OAuth 2.1, Webhooks y Chat Bot)
  { name: 'kick-api', url: 'https://github.com/nekiro/kick-api.git' },
  { name: 'kick-auth', url: 'https://github.com/BOT-K4CP3R/kick.auth.git' },
  { name: 'kick-js', url: 'https://github.com/retconned/kick-js.git' },

  // C. UI Minimalista, Estética "Dark Luxury" y Animaciones
  { name: 'react-bits', url: 'https://github.com/DavidHDev/react-bits.git' },
  { name: 'magicui', url: 'https://github.com/magicuidesign/magicui.git' },
  { name: 'motion-primitives', url: 'https://github.com/ibelick/motion-primitives.git' },
  { name: 'lenis', url: 'https://github.com/darkroomengineering/lenis.git' },

  // D. Sistema de Puntos (Ledger), Raffles y Store
  { name: 'vercel-commerce', url: 'https://github.com/vercel/commerce.git' },

  // E. Animaciones Fluidas, Físicas de Resortes & Design Engineering (2026)
  { name: 'animejs', url: 'https://github.com/juliangarnier/anime.git' },
  { name: 'auto-animate', url: 'https://github.com/formkit/auto-animate.git' },
  { name: 'canvas-confetti', url: 'https://github.com/catdad/canvas-confetti.git' },
  { name: 'countup-js', url: 'https://github.com/inorganik/countUp.js.git' },
  { name: 'sonner', url: 'https://github.com/emilkowalski/sonner.git' },
  { name: 'vaul', url: 'https://github.com/emilkowalski/vaul.git' },
  { name: 'motion', url: 'https://github.com/motiondivision/motion.git' },
  { name: 'emil-skills', url: 'https://github.com/emilkowalski/skills.git' }
];

const targetDir = path.resolve('references', 'clones');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log(`Cloning reference repositories into: ${targetDir}`);
const results = [];

for (const repo of REPOS) {
  const destPath = path.join(targetDir, repo.name);
  if (fs.existsSync(destPath)) {
    console.log(`[ALREADY EXISTS] ${repo.name}`);
    results.push({ name: repo.name, status: 'exists', path: destPath });
    continue;
  }

  console.log(`[CLONING] ${repo.name} (${repo.url})...`);
  try {
    // Use --depth 1 to minimize bandwidth and storage on limited hardware (HP 250 G8 rule)
    execSync(`git clone --depth 1 --single-branch "${repo.url}" "${destPath}"`, {
      stdio: 'pipe',
      timeout: 45000 // 45s max per repo
    });
    console.log(`[SUCCESS] ${repo.name}`);
    results.push({ name: repo.name, status: 'cloned', path: destPath });
  } catch (err) {
    console.warn(`[FAILED/SKIPPED] ${repo.name}: ${err.message?.split('\n')[0]}`);
    results.push({ name: repo.name, status: 'failed', error: err.message?.split('\n')[0] });
  }
}

fs.writeFileSync(
  path.join(targetDir, 'CLONE_SUMMARY.json'),
  JSON.stringify({ timestamp: new Date().toISOString(), results }, null, 2)
);

console.log('\n--- CLONING PROCESS FINISHED ---');
console.log(`Total: ${REPOS.length} | Cloned/Present: ${results.filter(r => r.status !== 'failed').length}`);
