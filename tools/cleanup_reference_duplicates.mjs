/**
 * HuntHub & DiggityBets — References Deduplication & Hygiene Engine
 * =============================================================================
 * Eliminates redundant repository clones across references/ to prevent
 * RAG vector contamination, index bloating, and search confusion.
 * Keeps a single canonical copy for every library.
 * =============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const REFS = path.join(ROOT, 'references');

console.log('🧹 [Cleanup] Starting References Deduplication Sweep...');

// 1. Fix nested references/references/factory-expansion
const nestedRefs = path.join(REFS, 'references');
if (fs.existsSync(nestedRefs)) {
  const factoryExpSource = path.join(nestedRefs, 'factory-expansion');
  const factoryExpDest = path.join(REFS, 'factory-expansion');

  if (fs.existsSync(factoryExpSource)) {
    if (!fs.existsSync(factoryExpDest)) {
      console.log(`📦 [Move] Moving ${factoryExpSource} -> ${factoryExpDest}`);
      fs.renameSync(factoryExpSource, factoryExpDest);
    } else {
      console.log(`🗑️ [Remove] Redundant factory-expansion in nested references/`);
      fs.rmSync(factoryExpSource, { recursive: true, force: true });
    }
  }
  
  // Clean up nested references if empty
  try {
    const remaining = fs.readdirSync(nestedRefs);
    if (remaining.length === 0) {
      fs.rmdirSync(nestedRefs);
      console.log('✅ [Clean] Removed empty nested folder: references/references');
    }
  } catch (e) {
    console.warn('⚠️ Could not remove references/references:', e.message);
  }
}

// 2. Remove duplicate animejs in root references/ (Canonical in references/clones/animejs)
const rootAnime = path.join(REFS, 'animejs');
const cloneAnime = path.join(REFS, 'clones', 'animejs');
if (fs.existsSync(rootAnime) && fs.existsSync(cloneAnime)) {
  console.log('🗑️ [Remove] Redundant root references/animejs (Canonical in references/clones/animejs)');
  fs.rmSync(rootAnime, { recursive: true, force: true });
}

// 3. Remove duplicate stake-originals-clone-main in root references/ (Canonical in references/clones/stake-originals-clone-react)
const rootStake = path.join(REFS, 'stake-originals-clone-main');
const cloneStake = path.join(REFS, 'clones', 'stake-originals-clone-react');
if (fs.existsSync(rootStake) && fs.existsSync(cloneStake)) {
  console.log('🗑️ [Remove] Redundant root references/stake-originals-clone-main');
  fs.rmSync(rootStake, { recursive: true, force: true });
}

// 4. Check references/repos duplicates against references/clones
const reposDir = path.join(REFS, 'repos');
const clonesDir = path.join(REFS, 'clones');
if (fs.existsSync(reposDir) && fs.existsSync(clonesDir)) {
  const clones = new Set(fs.readdirSync(clonesDir));
  const repos = fs.readdirSync(reposDir);

  for (const repo of repos) {
    const repoPath = path.join(reposDir, repo);
    // If it's a directory and exists in clones, remove duplicate from repos/
    if (fs.statSync(repoPath).isDirectory() && clones.has(repo)) {
      console.log(`🗑️ [Remove] Redundant repo copy references/repos/${repo} (Canonical in references/clones/${repo})`);
      fs.rmSync(repoPath, { recursive: true, force: true });
    }
  }
}

console.log('✨ [Cleanup] Deduplication sweep complete! Single canonical copies preserved.');
