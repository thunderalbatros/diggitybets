/**
 * HuntHub / DiggityBets — Canon Knowledge Importer & Ingester
 * =============================================================================
 * Imports the canonical treatises, full books, video courses, and design/secops
 * manuals from Centinela and Yendo into HuntHub's native RAG repository.
 *
 * Categories:
 *   1. ui_ux_design (Refactoring UI, Practical UI, Laws of UX, Designing with the Mind)
 *   2. motion_and_animation (Disney Illusion of Life, Game Feel Swink, 60 FPS GPU Shaders)
 *   3. cybersecurity (Master Protocol, DevSecOps, Anti-Bot Stealth, Vulnerability Defense)
 *   4. streaming_and_overlays (WebSockets Hussein Nasser, OBS Low-CPU composition, Edge Audio)
 *   5. architecture_and_books (Clean Architecture, Data Intensive Apps, 12-Factor Agents, Octalysis)
 * =============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

const SOURCES = [
  // 1. Motion and Animation
  {
    destDir: 'knowledge/motion_and_animation',
    name: 'CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY.md',
    src: 'C:/Users/tomas/yendo_mobile/.knowledge/ui/CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY.md'
  },
  {
    destDir: 'knowledge/motion_and_animation',
    name: 'CANON_GAME_FEEL_VIRTUAL_SENSATION_SWINK.md',
    src: 'C:/Users/tomas/yendo_mobile/.knowledge/ui/CANON_GAME_FEEL_VIRTUAL_SENSATION_SWINK.md'
  },
  {
    destDir: 'knowledge/motion_and_animation',
    name: 'CANON_LOW_LEVEL_GRAPHICS_METAL_GPU_SHADERS.md',
    src: 'C:/Users/tomas/yendo_mobile/.knowledge/ui/CANON_LOW_LEVEL_GRAPHICS_METAL_GPU_SHADERS.md'
  },
  {
    destDir: 'knowledge/motion_and_animation',
    name: 'SOTA_UI_GAMIFICATION_3D_MOTION_TOOLKIT.md',
    src: 'C:/Users/tomas/yendo_mobile/.knowledge/ui/SOTA_UI_GAMIFICATION_3D_MOTION_TOOLKIT.md'
  },

  // 2. UI / UX & Graphic Design
  {
    destDir: 'knowledge/ui_ux_design',
    name: 'CANON_REFACTORING_UI_WATHAN_SCHOGER.md',
    src: 'C:/Users/tomas/yendo_mobile/.knowledge/ui/CANON_REFACTORING_UI_WATHAN_SCHOGER.md'
  },
  {
    destDir: 'knowledge/ui_ux_design',
    name: 'CANON_PRACTICAL_UI_ADHAM_DANNAWAY.md',
    src: 'C:/Users/tomas/yendo_mobile/.knowledge/ui/CANON_PRACTICAL_UI_ADHAM_DANNAWAY.md'
  },
  {
    destDir: 'knowledge/ui_ux_design',
    name: 'CANON_ELEMENTS_OF_TYPOGRAPHIC_STYLE_AND_GRIDS.md',
    src: 'C:/Users/tomas/yendo_mobile/.knowledge/ui/CANON_ELEMENTS_OF_TYPOGRAPHIC_STYLE_AND_GRIDS.md'
  },
  {
    destDir: 'knowledge/ui_ux_design',
    name: 'CANON_DESIGN_SYSTEMS_ALLA_KHOLMATOVA.md',
    src: 'C:/Users/tomas/yendo_mobile/.knowledge/ui/CANON_DESIGN_SYSTEMS_ALLA_KHOLMATOVA.md'
  },
  {
    destDir: 'knowledge/ui_ux_design',
    name: 'designing_with_the_mind_in_mind.md',
    src: 'C:/Users/tomas/.zcode/workspace/default/centinela-studio/knowledge/books_full/designing_with_the_mind_in_mind.md'
  },
  {
    destDir: 'knowledge/ui_ux_design',
    name: 'laws_of_ux_using_psychology_to_design_better_.md',
    src: 'C:/Users/tomas/.zcode/workspace/default/centinela-studio/knowledge/books_full/laws_of_ux_using_psychology_to_design_better_.md'
  },

  // 3. Cybersecurity & SecOps
  {
    destDir: 'knowledge/cybersecurity',
    name: 'CYBERSECURITY_MASTER_PROTOCOL.md',
    src: 'C:/Users/tomas/yendo_mobile/.knowledge/CYBERSECURITY_MASTER_PROTOCOL.md'
  },
  {
    destDir: 'knowledge/cybersecurity',
    name: 'CANON_CYBERSECURITY_DEVSECOPS_2026.md',
    src: 'C:/Users/tomas/.zcode/workspace/default/centinela-studio/knowledge/canon_foundation/CANON_CYBERSECURITY_DEVSECOPS_2026.md'
  },
  {
    destDir: 'knowledge/cybersecurity',
    name: 'ANTI_BOT_STEALTH_GUIDE.md',
    src: 'C:/Users/tomas/.zcode/workspace/default/centinela-studio/knowledge/docs/ANTI_BOT_STEALTH_GUIDE.md'
  },
  {
    destDir: 'knowledge/cybersecurity',
    name: 'HFT_V22_STREAM_ARCHITECTURE_AND_VULNERABILITY_DEFENSE.md',
    src: 'C:/Users/tomas/.zcode/workspace/default/centinela-studio/knowledge/docs/HFT_V22_STREAM_ARCHITECTURE_AND_VULNERABILITY_DEFENSE.md'
  },

  // 4. Streaming, WebSockets & Overlays
  {
    destDir: 'knowledge/streaming_and_overlays',
    name: 'websockets_masterclass_hussein_nasser.md',
    src: 'C:/Users/tomas/.zcode/workspace/default/centinela-studio/knowledge/courses/websockets_masterclass_hussein_nasser.md'
  },
  {
    destDir: 'knowledge/streaming_and_overlays',
    name: 'KWS_EDGE_AUDIO_STREAMING_SOTA.md',
    src: 'C:/Users/tomas/.zcode/workspace/default/centinela-studio/knowledge/docs/KWS_EDGE_AUDIO_STREAMING_SOTA.md'
  },

  // 5. Architecture, Clean Code & Gamification
  {
    destDir: 'knowledge/architecture_and_books',
    name: '12_factor_agents_production.md',
    src: 'C:/Users/tomas/.zcode/workspace/default/centinela-studio/knowledge/courses/12_factor_agents_production.md'
  },
  {
    destDir: 'knowledge/architecture_and_books',
    name: 'clean_architecture.md',
    src: 'C:/Users/tomas/.zcode/workspace/default/centinela-studio/knowledge/books_full/clean_architecture.md'
  },
  {
    destDir: 'knowledge/architecture_and_books',
    name: 'the_pragmatic_programmer.md',
    src: 'C:/Users/tomas/.zcode/workspace/default/centinela-studio/knowledge/books_full/the_pragmatic_programmer.md'
  },
  {
    destDir: 'knowledge/architecture_and_books',
    name: 'hooked_habit_forming.md',
    src: 'C:/Users/tomas/.zcode/workspace/default/centinela-studio/knowledge/books_full/hooked_habit_forming.md'
  },
  {
    destDir: 'knowledge/architecture_and_books',
    name: 'system_design_interview_vol_2.md',
    src: 'C:/Users/tomas/.zcode/workspace/default/centinela-studio/knowledge/books_full/system_design_interview_vol_2.md'
  }
];

export function importCanonKnowledge() {
  console.log('📚 Importing SOTA Books, Canons & Video Courses into HuntHub RAG...');
  let importedCount = 0;
  let totalBytes = 0;

  for (const item of SOURCES) {
    const targetDir = path.join(ROOT, item.destDir);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    if (fs.existsSync(item.src)) {
      const targetFile = path.join(targetDir, item.name);
      fs.copyFileSync(item.src, targetFile);
      const stat = fs.statSync(targetFile);
      totalBytes += stat.size;
      importedCount++;
      console.log(`  ✓ [${item.destDir}] ${item.name} (${(stat.size / 1024).toFixed(1)} KB)`);
    } else {
      console.warn(`  ✗ [NOT FOUND] ${item.src}`);
    }
  }

  console.log(`\n🎉 Completed! Imported ${importedCount} files (${(totalBytes / 1024 / 1024).toFixed(2)} MB).`);
}

if (process.argv[1]?.endsWith('import_canon_knowledge.mjs')) {
  importCanonKnowledge();
}
