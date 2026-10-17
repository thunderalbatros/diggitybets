/**
 * HuntHub / DiggityBets — Web Design & Architecture Canon Importer
 * =============================================================================
 * Imports foundational UI/UX, Design Systems, Usability, Performance, and 
 * Architecture books into HuntHub's native RAG repository.
 * =============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

const BOOKS_TO_IMPORT = [
  // Usability & Product Design
  {
    src: 'C:/Users/tomas/.zcode/workspace/default/centinela-studio/knowledge/books_full/the_design_of_everyday_things.md',
    dest: 'knowledge/ui_ux_design/the_design_of_everyday_things_don_norman.md'
  },
  {
    src: 'C:/Users/tomas/yendo_mobile/.knowledge/ui/CANON_DESIGNING_FOR_TOUCH_JOSH_CLARK.md',
    dest: 'knowledge/ui_ux_design/CANON_DESIGNING_FOR_TOUCH_JOSH_CLARK.md'
  },
  {
    src: 'C:/Users/tomas/yendo_mobile/.knowledge/ui/SOTA_UI_MASTER_UPGRADE_2026.md',
    dest: 'knowledge/ui_ux_design/SOTA_UI_MASTER_UPGRADE_2026.md'
  },
  {
    src: 'C:/Users/tomas/yendo_mobile/.knowledge/canon_estudio/CANON_BOOK_ATOMIC_DESIGN_BRAD_FROST_SPANISH_PDF.md',
    dest: 'knowledge/ui_ux_design/CANON_BOOK_ATOMIC_DESIGN_BRAD_FROST.md'
  },
  {
    src: 'C:/Users/tomas/yendo_mobile/.knowledge/canon_estudio/CANON_BOOK_DESIGNING_INTERFACES_2ND_ED_JENIFER_TIDWELL_P.md',
    dest: 'knowledge/ui_ux_design/CANON_BOOK_DESIGNING_INTERFACES_JENIFER_TIDWELL.md'
  },
  {
    src: 'C:/Users/tomas/yendo_mobile/.knowledge/canon_estudio/CANON_BOOK_DESIGNING_FOR_PERFORMANCE_LARA_HOGAN_PDF.md',
    dest: 'knowledge/ui_ux_design/CANON_BOOK_DESIGNING_FOR_PERFORMANCE_LARA_HOGAN.md'
  },
  {
    src: 'C:/Users/tomas/yendo_mobile/.knowledge/canon_estudio/CANON_BOOK_WEB_FORM_DESIGN_LUKE_WROBLEWSKI_PDF.md',
    dest: 'knowledge/ui_ux_design/CANON_BOOK_WEB_FORM_DESIGN_LUKE_WROBLEWSKI.md'
  },
  {
    src: 'C:/Users/tomas/yendo_mobile/.knowledge/canon_estudio/CANON_BOOK_MOBILE_USABILITY_PDF_PDF_F.md',
    dest: 'knowledge/ui_ux_design/CANON_BOOK_MOBILE_USABILITY_JAKOB_NIELSEN.md'
  },
  {
    src: 'C:/Users/tomas/yendo_mobile/.knowledge/canon_estudio/CANON_UX_HUMAN_EXPERIENCE_ACCESSIBILITY_2026.md',
    dest: 'knowledge/ui_ux_design/CANON_UX_HUMAN_EXPERIENCE_ACCESSIBILITY_2026.md'
  },
  {
    src: 'C:/Users/tomas/yendo_mobile/.knowledge/canon_estudio/CANON_BOOK_DOKUMEN_PUB_ANIMATION_AT_WORK_9781937557.md',
    dest: 'knowledge/motion_and_animation/CANON_BOOK_ANIMATION_AT_WORK_RACHEL_NABORS.md'
  },
  {
    src: 'C:/Users/tomas/.zcode/workspace/default/centinela-studio/knowledge/books_full/pro_typescript.md',
    dest: 'knowledge/architecture_and_books/pro_typescript.md'
  },
  {
    src: 'C:/Users/tomas/.zcode/workspace/default/centinela-studio/knowledge/books_full/nudge.md',
    dest: 'knowledge/architecture_and_books/nudge_thaler_sunstein.md'
  },
  {
    src: 'C:/Users/tomas/.zcode/workspace/default/centinela-studio/knowledge/books_full/designing_data_intensive_applications.md',
    dest: 'knowledge/architecture_and_books/designing_data_intensive_applications.md'
  }
];

export function importWebDesignCanon() {
  console.log('📚 Importing High-Impact Web Design Books & Canons...');
  let count = 0;
  let totalBytes = 0;

  for (const item of BOOKS_TO_IMPORT) {
    const destPath = path.join(ROOT, item.dest);
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    if (fs.existsSync(item.src)) {
      fs.copyFileSync(item.src, destPath);
      const stat = fs.statSync(destPath);
      count++;
      totalBytes += stat.size;
      console.log(`  ✓ ${item.dest} (${(stat.size / 1024).toFixed(1)} KB)`);
    } else {
      console.warn(`  ✗ Source not found: ${item.src}`);
    }
  }

  console.log(`\n🎉 Imported ${count} foundational web books (${(totalBytes / 1024 / 1024).toFixed(2)} MB).`);
}

if (process.argv[1]?.endsWith('import_web_canon.mjs')) {
  importWebDesignCanon();
}
