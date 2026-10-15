import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const toolkitDir = path.join(root, 'diggitybets-rebrand-toolkit');

console.log('=== DIGGITY BETS REBRAND TOOLKIT INITIALIZATION ===\n');

const dirs = [
  '1-numbers-and-fx',
  '2-game-engines-and-audio',
  '3-kick-and-brackets',
  '4-icons-and-avatars'
];

for (const d of dirs) {
  fs.mkdirSync(path.join(toolkitDir, d), { recursive: true });
}

const targets = [
  // Group 1
  {
    category: '1-numbers-and-fx',
    name: 'number-flow',
    url: 'https://github.com/barvian/number-flow.git',
    existing: path.join(root, 'references', 'repos', 'number-flow')
  },
  {
    category: '1-numbers-and-fx',
    name: 'canvas-confetti',
    url: 'https://github.com/catdad/canvas-confetti.git',
    existing: path.join(root, 'references', 'clones', 'canvas-confetti')
  },
  {
    category: '1-numbers-and-fx',
    name: 'atropos',
    url: 'https://github.com/nolimits4web/atropos.git'
  },
  {
    category: '1-numbers-and-fx',
    name: 'paper-shaders',
    url: 'https://github.com/paper-design/shaders.git'
  },

  // Group 2
  {
    category: '2-game-engines-and-audio',
    name: 'matter-js',
    url: 'https://github.com/liabru/matter-js.git',
    existing: path.join(root, 'references', 'repos', 'matter-js')
  },
  {
    category: '2-game-engines-and-audio',
    name: 'pixi-react',
    url: 'https://github.com/pixijs/pixi-react.git'
  },
  {
    category: '2-game-engines-and-audio',
    name: 'howler',
    url: 'https://github.com/goldfire/howler.js.git'
  },

  // Group 3
  {
    category: '3-kick-and-brackets',
    name: 'kick-api',
    url: 'https://github.com/nekiro/kick-api.git',
    existing: path.join(root, 'references', 'nekiro-kick-api')
  },
  {
    category: '3-kick-and-brackets',
    name: 'xyflow',
    url: 'https://github.com/xyflow/xyflow.git'
  },

  // Group 4
  {
    category: '4-icons-and-avatars',
    name: 'phosphor-react',
    url: 'https://github.com/phosphor-icons/react.git'
  },
  {
    category: '4-icons-and-avatars',
    name: 'dicebear',
    url: 'https://github.com/dicebear/dicebear.git'
  }
];

for (const t of targets) {
  const dest = path.join(toolkitDir, t.category, t.name);
  if (fs.existsSync(dest) && fs.readdirSync(dest).length > 0) {
    console.log(`[SKIP] Already present in toolkit: ${t.category}/${t.name}`);
    continue;
  }

  if (t.existing && fs.existsSync(t.existing) && fs.readdirSync(t.existing).length > 0) {
    console.log(`[REUSED] Already cloned in references: ${t.name} (from ${path.relative(root, t.existing)})`);
    // Create reference marker or copy minimal package.json
    fs.mkdirSync(dest, { recursive: true });
    fs.writeFileSync(path.join(dest, 'REUSED_FROM.txt'), `Reused from: ${t.existing}\nOriginal URL: ${t.url}\n`, 'utf8');
    continue;
  }

  console.log(`[CLONING] ${t.category}/${t.name} from ${t.url} (shallow depth 1)...`);
  try {
    execSync(`git clone --depth 1 "${t.url}" "${dest}"`, {
      stdio: 'inherit',
      timeout: 120000
    });
    console.log(`[SUCCESS] Cloned ${t.name}\n`);
  } catch (err) {
    console.error(`[WARN] Could not clone ${t.name}: ${err.message}`);
  }
}

console.log('\n=== REBRAND TOOLKIT READY ===');
