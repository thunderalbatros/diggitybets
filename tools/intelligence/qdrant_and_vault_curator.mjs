#!/usr/bin/env node
/**
 * HuntHub / DiggityBets — Qdrant Cloud & Obsidian Vault Curated Knowledge Migrator
 * --------------------------------------------------------------------------------
 * Audits both Qdrant Cloud collections (`yendo_obsidian_vault` & `centinela_knowledge`)
 * and the primary local Obsidian vault (`C:\Users\tomas\yendo_mobile\.knowledge`),
 * applies a strict Software Factory Web Relevance & Quality Filter, organizes the
 * approved books, video courses, official docs, and treatises into 5 clean domains,
 * injects LEC-015 Scope Anchors (`**Alcance:**`), and writes them into `knowledge/`.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');
const KNOWLEDGE_DIR = path.join(ROOT_DIR, 'knowledge');
const YENDO_VAULT_DIR = 'C:/Users/tomas/yendo_mobile/.knowledge';

function loadEnv() {
  const envPath = path.join(ROOT_DIR, '.env');
  const out = {};
  if (!fs.existsSync(envPath)) return out;
  const raw = fs.readFileSync(envPath, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx > 0) {
      const k = trimmed.slice(0, idx).trim();
      const v = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      out[k] = v;
    }
  }
  return out;
}

const SCOPE_HEADERS = {
  ui_ux_design:
    '> **Alcance:** Literatura canónica de diseño UI/UX, sistemas de diseño, psicología cognitiva, economía conductual, gamificación y conversión (CRO) para la Software Factory Web y DiggityBets.\n\n',
  motion_and_animation:
    '> **Alcance:** Literatura canónica y tratados técnicos de animación a 60 FPS, shaders GPU, física de resortes (spring physics), arte técnico 3D y micro-interacciones fluidas para sitios web modernos y overlays OBS.\n\n',
  architecture_and_books:
    '> **Alcance:** Literatura canónica de arquitectura de software, código limpio, TypeScript, validación en el Edge, sistemas distribuidos, videocursos técnicos e ingeniería de agentes IA para la Software Factory Web.\n\n',
  cybersecurity:
    '> **Alcance:** Literatura canónica de ciberseguridad web, criptografía aplicada, protección de identidad OAuth 2.1, defensa XSS/CSP/CSRF y blindaje de aplicaciones en tiempo real.\n\n',
  streaming_and_overlays:
    '> **Alcance:** Documentación técnica y contratos de Kick.com API v2, dinámicas matemáticas de RTP/volatilidad de slots, sistemas de lealtad y arquitectura de overlays de baja latencia.\n\n',
};

function injectScopeHeader(content, category) {
  const header = SCOPE_HEADERS[category] || SCOPE_HEADERS.architecture_and_books;
  if (content.includes('**Alcance:**')) return content;
  if (content.startsWith('#')) {
    const firstNewline = content.indexOf('\n');
    if (firstNewline !== -1) {
      return (
        content.slice(0, firstNewline + 1) +
        '\n' +
        header +
        content.slice(firstNewline + 1).replace(/^\n+/, '')
      );
    }
  }
  return header + content;
}

/**
 * Curated whitelist from `C:\Users\tomas\yendo_mobile\.knowledge` (which backs `yendo_obsidian_vault` in Qdrant)
 */
const LOCAL_VAULT_CURATED_MAP = [
  // Category 1: UI/UX Design, Behavioral Psychology, Gamification & Product Strategy
  { src: 'ui/CANON_REFACTORING_UI_WATHAN_SCHOGER.md', destDir: 'ui_ux_design' },
  { src: 'ui/CANON_PRACTICAL_UI_ADHAM_DANNAWAY.md', destDir: 'ui_ux_design' },
  { src: 'ui/CANON_DESIGN_SYSTEMS_ALLA_KHOLMATOVA.md', destDir: 'ui_ux_design' },
  { src: 'ui/CANON_DESIGNING_FOR_TOUCH_JOSH_CLARK.md', destDir: 'ui_ux_design' },
  { src: 'ui/CANON_USER_STORY_MAPPING_JEFF_PATTON.md', destDir: 'ui_ux_design' },
  { src: 'ui/CANON_CONTINUOUS_DISCOVERY_HABITS_TERESA_TORRES.md', destDir: 'ui_ux_design' },
  { src: '🧠_psicologia_ux/CANON_100_THINGS_DESIGNER_PEOPLE_WEINSCHENK.md', destDir: 'ui_ux_design' },
  { src: '🧠_psicologia_ux/CANON_DESIGNING_FOR_EMOTION_WALTER.md', destDir: 'ui_ux_design' },
  { src: '🧠_psicologia_ux/CANON_THINKING_FAST_AND_SLOW_KAHNEMAN.md', destDir: 'ui_ux_design' },
  { src: '🧠_psicologia_ux/CANON_THE_PARADOX_OF_CHOICE_BARRY_SCHWARTZ.md', destDir: 'ui_ux_design' },
  { src: '🧠_psicologia_ux/CANON_PREDICTABLY_IRRATIONAL_ARIELY_TRAMPAS_DESEO.md', destDir: 'ui_ux_design' },
  { src: '🧠_psicologia_ux/CANON_ATTENTION_MERCHANTS_TIM_WU.md', destDir: 'ui_ux_design' },
  { src: '🧠_psicologia_ux/CANON_SCARCITY_ESCASEZ_BANDWIDTH_TAX.md', destDir: 'ui_ux_design' },
  { src: '📈_economia_mkt/CANON_EXPERIENCE_ECONOMY_PINE_GILMORE.md', destDir: 'ui_ux_design' },
  { src: '📈_economia_mkt/CANON_MONETIZING_INNOVATION_SIMON_KUCHER.md', destDir: 'ui_ux_design' },
  { src: '📈_economia_mkt/CANON_PLATFORM_REVOLUTION_SCALE_NETWORK_EFFECTS.md', destDir: 'ui_ux_design' },
  { src: '📈_economia_mkt/GAME_THEORY_GROWTH_LOOPS_Y_DUNBAR_QUORUM.md', destDir: 'ui_ux_design' },
  { src: 'canon_estudio/CANON_ALGORITHMIC_GAME_THEORY.md', destDir: 'ui_ux_design' },
  { src: 'research/Global_SOTA_UX_UI_Agent_Arsenal_Investigation.md', destDir: 'ui_ux_design', destName: 'SOTA_UX_UI_AGENT_ARSENAL_INVESTIGATION_2026.md' },
  { src: '🧠_research/tech_stack/Herramientas_OpenSource_UX_UI_Squad_SOTA.md', destDir: 'ui_ux_design', destName: 'FOSS_UX_UI_SQUAD_TOOLS_SOTA_2026.md' },
  { src: 'golden_ratio_design_sources.md', destDir: 'ui_ux_design', destName: 'CANON_GOLDEN_RATIO_DESIGN_SOURCES_AND_PROPORTIONS.md' },
  { src: 'golden_ratio_ui_synthesis.md', destDir: 'ui_ux_design', destName: 'CANON_GOLDEN_RATIO_UI_MATHEMATICAL_SYNTHESIS.md' },
  { src: 'dossiers/UX_UI_MASTER_MANIFESTO.md', destDir: 'ui_ux_design', destName: 'CANON_UX_UI_MASTER_MANIFESTO_2026.md' },

  // Category 2: 60-FPS Animations, Shaders, Physics & Technical Art
  { src: 'ui/CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY.md', destDir: 'motion_and_animation' },
  { src: 'ui/CANON_LOW_LEVEL_GRAPHICS_METAL_GPU_SHADERS.md', destDir: 'motion_and_animation' },
  { src: 'creative_studio/3D_TECHNICAL_ART_GUIDE.md', destDir: 'motion_and_animation', destName: 'CANON_3D_TECHNICAL_ART_AND_SHADERS_GUIDE.md' },
  { src: 'creative_studio/MOTION_GRAPHICS_CODING.md', destDir: 'motion_and_animation', destName: 'CANON_PROCEDURAL_MOTION_GRAPHICS_CODING.md' },
  { src: '🧠_research/tech_stack/3D_PBR_And_Cinematography_Guide.md', destDir: 'motion_and_animation', destName: 'CANON_3D_PBR_LIGHTING_AND_CINEMATOGRAPHY.md' },
  { src: '🧠_research/tech_stack/Motion_And_Animation_Bibles.md', destDir: 'motion_and_animation', destName: 'CANON_MOTION_AND_ANIMATION_BIBLES_COMPENDIUM.md' },
  { src: '🧠_research/tech_stack/Pipeline_Optimizacion_Render_3D_Motion.md', destDir: 'motion_and_animation', destName: 'CANON_60FPS_RENDER_AND_MOTION_OPTIMIZATION_PIPELINE.md' },
  { src: '🧠_research/tech_stack/Efecto_WOW_Software_Architecture.md', destDir: 'motion_and_animation', destName: 'CANON_WOW_EFFECT_SOFTWARE_ARCHITECTURE.md' },
  { src: '🧠_research/tech_stack/Graphic_Agents_Anabolic_Framework.md', destDir: 'motion_and_animation', destName: 'CANON_GRAPHIC_DESIGN_AGENTS_FRAMEWORK.md' },
  { src: '🧠_research/tech_stack/Skia_WebGPU_R3F_3D_Ecosystem.md', destDir: 'motion_and_animation', destName: 'CANON_WEBGPU_THREEJS_SHADER_ECOSYSTEM.md' },
  { src: '🧠_research/design/Motion_3D_Tier1_Benchmarks.md', destDir: 'motion_and_animation', destName: 'BENCHMARK_TIER1_MOTION_AND_3D_LIBRARIES.md' },
  { src: '🧠_research/design/Scoring_Benchmark_OpenSource_Motion_3D_Haptics.md', destDir: 'motion_and_animation', destName: 'SCORING_FOSS_MOTION_3D_AND_INTERACTION_LIBRARIES.md' },

  // Category 3: Software Engineering, Clean Code, Validation & Agentic Systems
  { src: 'architecture/CANON_SOFTWARE_ENGINEERING_AT_GOOGLE.md', destDir: 'architecture_and_books' },
  { src: 'architecture/CANON_TIDY_FIRST_KENT_BECK.md', destDir: 'architecture_and_books' },
  { src: 'architecture/CANON_THE_TWELVE_FACTOR_APP.md', destDir: 'architecture_and_books' },
  { src: 'architecture/CANON_ALGORITHM_DESIGN_MANUAL_SKIENA.md', destDir: 'architecture_and_books' },
  { src: 'architecture/CANON_BUILDING_MICROSERVICES_SAM_NEWMAN.md', destDir: 'architecture_and_books' },
  { src: 'architecture/CANON_DISTRIBUTED_SYSTEMS_TANENBAUM.md', destDir: 'architecture_and_books' },
  { src: 'architecture/CANON_MYTHICAL_MAN_MONTH_BROOKS.md', destDir: 'architecture_and_books' },
  { src: 'architecture/CANON_JAVASCRIPT_GOOD_PARTS_CROCKFORD.md', destDir: 'architecture_and_books' },
  { src: 'architecture/Valibot_SOTA_Validation.md', destDir: 'architecture_and_books', destName: 'CANON_VALIBOT_EDGE_SCHEMA_VALIDATION.md' },
  { src: 'canon_estudio/CANON_AGENTIC_01_FOUNDATIONAL_PAPERS.md', destDir: 'architecture_and_books' },
  { src: 'canon_estudio/CANON_AGENTIC_02_FRAMEWORKS_ORCHESTRATION.md', destDir: 'architecture_and_books' },
  { src: 'canon_estudio/CANON_AGENTIC_03_SOTA_OPEN_SOURCE_AND_TOOLING.md', destDir: 'architecture_and_books' },
  { src: 'canon_estudio/CANON_60_FUENTES_CANONICAS_INDEX.md', destDir: 'architecture_and_books' },
  { src: 'canon_estudio/CANON_60_INGESTA_MASIVA_MASTER_DOSSIER.md', destDir: 'architecture_and_books' },
  { src: 'research/Master_Anti_Hallucination_Overfitting_Agent_Optimization_Dossier.md', destDir: 'architecture_and_books', destName: 'CANON_ANTI_HALLUCINATION_AND_AGENT_PRECISION_DOSSIER.md' },
  { src: 'dossiers/TECNOLOGIAS_SOTA_STACK_CANON_2026.md', destDir: 'architecture_and_books' },
  { src: '🧠_research/tech_stack/Reporte_Librerias_Herramientas_Optimizacion_Workflow_2026.md', destDir: 'architecture_and_books', destName: 'CANON_WORKFLOW_OPTIMIZATION_LIBRARIES_AND_TOOLS_2026.md' },
  { src: '🧠_research/Tratado_30_Libros_30_Charlas_Auditoria_Ingest_2026.md', destDir: 'architecture_and_books', destName: 'TRATADO_30_LIBROS_Y_30_CHARLAS_INGENIERIA_2026.md' },
  { src: 'learning/Masterclass_04_Harness_Y_Evals_Agenticos_SOTA.md', destDir: 'architecture_and_books', destName: 'MASTERCLASS_HARNESS_ENGINEERING_AND_AGENT_EVALS_2026.md' },

  // Category 4: Cybersecurity & Cryptography
  { src: '🔒_cyber_crypto/01_CANON_PAPERS_SEMINALES_CRIPTOGRAFIA_PROTOCOLOS.md', destDir: 'cybersecurity', destName: 'CANON_SEMINAL_CRYPTOGRAPHY_PAPERS_AND_PROTOCOLS.md' },
  { src: '🔒_cyber_crypto/02_ARSENAL_EDUCATIVO_CURSOS_AUDITORIAS_YOUTUBE.md', destDir: 'cybersecurity', destName: 'CANON_CYBERSECURITY_COURSES_AND_AUDIT_ARSENAL.md' },
  { src: '🔒_cyber_crypto/CANON_SECURITY_BOOKS_AND_DOCS_2026.md', destDir: 'cybersecurity' },
  { src: '🔒_cyber_crypto/CANON_SOCIAL_ENGINEERING_HUMAN_HACKING.md', destDir: 'cybersecurity' },
  { src: 'dossiers/AUDITORIA_CIBERSEGURIDAD_IDENTIDAD_2026.md', destDir: 'cybersecurity', destName: 'CANON_IDENTITY_AND_OAUTH_CYBERSECURITY_AUDIT_2026.md' },
];

/**
 * Curated whitelist to reconstruct directly from Qdrant Cloud `centinela_knowledge`
 */
const QDRANT_CENTINELA_CURATED_MAP = [
  { key: 'knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md', destDir: 'architecture_and_books', destName: 'CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md' },
  { key: 'knowledge/canon_foundation/CANON_HARNESS_Y_EVALS_AGENTICOS_SOTA_2026.md', destDir: 'architecture_and_books', destName: 'CANON_HARNESS_Y_EVALS_AGENTICOS_SOTA_2026.md' },
  { key: 'knowledge/canon_foundation/CANON_SRE_RELIABILITY_ZERO_CRASH_2026.md', destDir: 'architecture_and_books', destName: 'CANON_SRE_RELIABILITY_ZERO_CRASH_2026.md' },
  { key: 'knowledge/tools/TOKEN_REDUCTION_TOOLKIT_2026.md', destDir: 'architecture_and_books', destName: 'CANON_TOKEN_REDUCTION_AND_CONTEXT_BUDGET_TOOLKIT_2026.md' },
  { key: 'knowledge/docs/SOTA_MATT_POCOCK_TS_RESET_AND_AGENT_SKILLS_2026.md', destDir: 'architecture_and_books', destName: 'CANON_MATT_POCOCK_TYPESCRIPT_AND_AGENT_SKILLS_2026.md' },
  { key: 'knowledge/docs/SOTA_DEVELOPERS_AND_ENGINEERING_PLAYBOOK_2026.md', destDir: 'architecture_and_books', destName: 'CANON_SOTA_DEVELOPERS_AND_ENGINEERING_PLAYBOOK_2026.md' },
  { key: 'knowledge/docs/SOTA_ANTI_FRAGILITY_RESILIENCE_AND_GUARDRAILS_2026.md', destDir: 'architecture_and_books', destName: 'CANON_ANTI_FRAGILITY_RESILIENCE_AND_GUARDRAILS_2026.md' },
  { key: 'knowledge/docs/ECC_HARNESS_AND_AGENT_OPTIMIZATION_PLAYBOOK_2026.md', destDir: 'architecture_and_books', destName: 'CANON_ECC_HARNESS_AND_AGENT_OPTIMIZATION_PLAYBOOK_2026.md' },
  { key: 'knowledge/courses/12_factor_agents_production.md', destDir: 'architecture_and_books', destName: 'COURSE_12_FACTOR_AGENTS_IN_PRODUCTION_DEX_HORTHY.md' },
  { key: 'knowledge/courses/end_to_end_llm_post_training_bigquery_to_production.md', destDir: 'architecture_and_books', destName: 'COURSE_END_TO_END_LLM_POST_TRAINING_PRODUCTION.md' },
  { key: 'knowledge/docs/HFT_V22_STREAM_ARCHITECTURE_AND_VULNERABILITY_DEFENSE.md', destDir: 'cybersecurity', destName: 'CANON_REALTIME_STREAM_ARCHITECTURE_AND_VULNERABILITY_DEFENSE.md' },
  { key: 'knowledge/docs/KICK_PUBLIC_API_V2_FULL.md', destDir: 'streaming_and_overlays', destName: 'CANON_KICK_PUBLIC_API_V2_FULL_REFERENCE.md' },
  { key: 'knowledge/docs/KICK_DISCORD_LOYALTY_PLATFORMS_INVESTIGATION.md', destDir: 'streaming_and_overlays', destName: 'CANON_KICK_DISCORD_LOYALTY_PLATFORMS_BENCHMARK.md' },
  { key: 'knowledge/docs/SLOTS_STAKE_RTP_DYNAMICS.md', destDir: 'streaming_and_overlays', destName: 'CANON_SLOTS_STAKE_RTP_VOLATILITY_DYNAMICS.md' },
  { key: 'knowledge/docs/POPULAR_SLOTS_ONLY_ON_STAKE_TIERS.md', destDir: 'streaming_and_overlays', destName: 'CANON_STAKE_POPULAR_SLOTS_AND_VOLATILITY_TIERS.md' },
  { key: 'knowledge/docs/SOTA_KICK_POINTS_COMMANDS_2026.md', destDir: 'streaming_and_overlays', destName: 'CANON_KICK_POINTS_AND_CHAT_COMMANDS_ARCHITECTURE_2026.md' },
  { key: 'knowledge/docs/SOTA_KICK_CASINO_BOT_ECOSYSTEM_2026.md', destDir: 'streaming_and_overlays', destName: 'CANON_KICK_CASINO_STREAM_ECOSYSTEM_BENCHMARK_2026.md' },
];

async function fetchQdrantCollectionDocs(qUrl, qKey, collection) {
  let offset = null;
  const docs = new Map();
  while (true) {
    const res = await fetch(`${qUrl.replace(/\/$/, '')}/collections/${collection}/points/scroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': qKey },
      body: JSON.stringify({ limit: 250, offset, with_payload: true, with_vector: false }),
    });
    if (!res.ok) break;
    const data = await res.json();
    const pts = data.result?.points || [];
    for (const p of pts) {
      const pay = p.payload || {};
      const key = pay.file_path || pay.source || pay.title || `id_${p.id}`;
      if (!docs.has(key)) docs.set(key, []);
      docs.get(key).push({ id: p.id, ...pay });
    }
    offset = data.result?.next_page_offset;
    if (!offset) break;
  }
  return docs;
}

function buildVideoCoursesCompendium() {
  const videosDir = path.join(YENDO_VAULT_DIR, '🎬_videos_analizados');
  if (!fs.existsSync(videosDir)) return null;
  const files = fs.readdirSync(videosDir).filter((f) => f.endsWith('.md')).sort();
  if (files.length === 0) return null;

  const sections = [
    '# Compendio Maestro de 55 Videocursos Técnicos Analizados (UI/UX, Motion 60-FPS, Shaders, Game Design & Agentes IA)',
    '',
    '> **Alcance:** Literatura canónica de arquitectura de software, código limpio, sistemas de diseño UI/UX, animaciones a 60 FPS, física de resortes, MDA Game Design y orquestación de agentes IA extraída de las 55 video-masterclasses de `yendo_obsidian_vault` para la Software Factory Web y DiggityBets.',
    '',
    'Este documento consolida las lecciones técnicas, fórmulas de animación, principios de diseño gráfico y patrones de ingeniería extraídos de 55 videocursos técnicos y conferencias internacionales.',
    '',
  ];

  let includedCount = 0;
  for (const file of files) {
    const full = path.join(videosDir, file);
    const raw = fs.readFileSync(full, 'utf8').trim();
    if (raw.length < 150) continue;
    includedCount++;
    const cleanBody = raw.replace(/^#\s+/m, '## ');
    sections.push(`---`, ``, `### Masterclass #${includedCount} (${file.replace('.md', '')})`, ``, cleanBody, ``);
  }

  return {
    content: sections.join('\n'),
    count: includedCount,
  };
}

async function main() {
  console.log('================================================================');
  console.log('  QDRANT CLOUD & OBSIDIAN VAULT CURATED MIGRATOR (WEB FACTORY)  ');
  console.log('================================================================');

  let localMigrated = 0;
  let qdrantMigrated = 0;

  // 1. Migrate Curated Local Vault Files (backing yendo_obsidian_vault)
  for (const item of LOCAL_VAULT_CURATED_MAP) {
    const srcPath = path.join(YENDO_VAULT_DIR, item.src);
    if (!fs.existsSync(srcPath)) {
      console.warn(`[WARN] Missing local vault source: ${srcPath}`);
      continue;
    }
    const destFolder = path.join(KNOWLEDGE_DIR, item.destDir);
    fs.mkdirSync(destFolder, { recursive: true });
    const destFile = item.destName || path.basename(item.src);
    const destPath = path.join(destFolder, destFile);

    const raw = fs.readFileSync(srcPath, 'utf8');
    const enriched = injectScopeHeader(raw, item.destDir);
    fs.writeFileSync(destPath, enriched, 'utf8');
    localMigrated++;
    console.log(`[VAULT -> ${item.destDir}] ${destFile} (${(enriched.length / 1024).toFixed(1)} KB)`);
  }

  // 2. Consolidate the 55 Technical Video Courses from `🎬_videos_analizados`
  const videoCompendium = buildVideoCoursesCompendium();
  if (videoCompendium && videoCompendium.count > 0) {
    const destPath = path.join(
      KNOWLEDGE_DIR,
      'architecture_and_books',
      'COMPENDIO_55_VIDEOCURSOS_DISENO_ANIMACION_ARQUITECTURA_2026.md'
    );
    fs.writeFileSync(destPath, videoCompendium.content, 'utf8');
    localMigrated++;
    console.log(
      `[VIDEOS -> architecture_and_books] COMPENDIO_55_VIDEOCURSOS_DISENO_ANIMACION_ARQUITECTURA_2026.md (${videoCompendium.count} cursos, ${(videoCompendium.content.length / 1024).toFixed(1)} KB)`
    );
  }

  // 3. Reconstruct & Migrate Curated Documents directly from Qdrant Cloud (`centinela_knowledge`)
  const env = loadEnv();
  const qUrl = env.QDRANT_HOST || env.QDRANT_URL || env.QDRANT_ENDPOINT;
  const qKey = env.QDRANT_API_KEY;

  if (qUrl && qKey) {
    console.log('\n[QDRANT CLOUD] Connecting to centinela_knowledge collection...');
    const centinelaDocs = await fetchQdrantCollectionDocs(qUrl, qKey, 'centinela_knowledge');
    console.log(`[QDRANT CLOUD] Loaded ${centinelaDocs.size} unique documents from centinela_knowledge.`);

    for (const item of QDRANT_CENTINELA_CURATED_MAP) {
      const chunks = centinelaDocs.get(item.key);
      if (!chunks || chunks.length === 0) {
        console.warn(`[WARN] Key not found in Qdrant centinela_knowledge: ${item.key}`);
        continue;
      }
      // Sort chunks by chunk_index if present
      chunks.sort((a, b) => (a.chunk_index ?? 0) - (b.chunk_index ?? 0));
      const seenTexts = new Set();
      const parts = [];
      for (const c of chunks) {
        const txt = (c.content || c.text || '').trim();
        if (txt && !seenTexts.has(txt)) {
          seenTexts.add(txt);
          parts.push(txt);
        }
      }
      let reconstructed = parts.join('\n\n');
      if (!reconstructed.startsWith('#')) {
        const title = item.destName.replace(/\.md$/, '').replace(/_/g, ' ');
        reconstructed = `# ${title}\n\n${reconstructed}`;
      }
      const enriched = injectScopeHeader(reconstructed, item.destDir);
      const destFolder = path.join(KNOWLEDGE_DIR, item.destDir);
      fs.mkdirSync(destFolder, { recursive: true });
      const destPath = path.join(destFolder, item.destName);
      fs.writeFileSync(destPath, enriched, 'utf8');
      qdrantMigrated++;
      console.log(`[QDRANT -> ${item.destDir}] ${item.destName} (${chunks.length} chunks, ${(enriched.length / 1024).toFixed(1)} KB)`);
    }
  } else {
    console.warn('[WARN] Missing QDRANT_HOST or QDRANT_API_KEY in .env');
  }

  console.log('\n================================================================');
  console.log(`  MIGRATION COMPLETE: ${localMigrated} Vault Docs + ${qdrantMigrated} Qdrant Cloud Docs = ${localMigrated + qdrantMigrated} Total`);
  console.log('================================================================');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
