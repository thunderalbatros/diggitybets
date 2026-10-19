#!/usr/bin/env node
/**
 * HuntHub & DiggityBets — Software Factory Multi-Vault Knowledge Migrator ("La Gran Mudanza")
 * ===========================================================================================
 * Migrates, sanitizes, and extracts curated books, official documentation, scientific papers,
 * and video masterclasses from:
 *   1. C:\Users\tomas\.zcode\workspace\default\centinela-studio\knowledge
 *   2. C:\Users\tomas\Documents\yendo_mobile\.knowledge
 *   3. C:\Users\tomas\Documents\yendo_mobile\data\raw_library & unsorted
 *   4. C:\Users\tomas\Downloads & C:\Users\tomas\Desktop
 *
 * Strict Engineering Filter (LEC-015 Compliant):
 *   - Selects ONLY high-signal sources aligned with our Software Factory (aesthetic, fluid,
 *     minimalist, modern, fast, secure web applications) and DiggityBets (Kick live streaming,
 *     interactive crowd games, gamification, behavioral psychology, slots mathematics, SRE).
 *   - Strips domain-foreign terms (CABA bars/ticketing, AGC/SADAIC, Expo/Maestro mobile noise).
 *   - Injects a mandatory **Alcance:** scope anchor header on every migrated document.
 * ===========================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ingestBookToMarkdown } from './book_pdf_ingester.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const KNOWLEDGE_DIR = path.join(ROOT, 'knowledge');

const CENTINELA_KNOWLEDGE = 'C:/Users/tomas/.zcode/workspace/default/centinela-studio/knowledge';
const YENDO_KNOWLEDGE = 'C:/Users/tomas/Documents/yendo_mobile/.knowledge';
const YENDO_RAW_LIB = 'C:/Users/tomas/Documents/yendo_mobile/data/raw_library';
const YENDO_UNSORTED = 'C:/Users/tomas/Documents/yendo_mobile/unsorted';
const DOWNLOADS_DIR = 'C:/Users/tomas/Downloads';
const DESKTOP_DIR = 'C:/Users/tomas/Desktop';

/**
 * Recursively maps all files in a directory by basename and relative path
 */
function buildFileIndex(baseDir, maxDepth = 4, depth = 0) {
  const map = new Map();
  if (depth > maxDepth || !fs.existsSync(baseDir)) return map;
  try {
    for (const ent of fs.readdirSync(baseDir, { withFileTypes: true })) {
      const fp = path.join(baseDir, ent.name);
      if (ent.isDirectory()) {
        if (ent.name === 'node_modules' || ent.name === '.git' || ent.name === '.obsidian') continue;
        const sub = buildFileIndex(fp, maxDepth, depth + 1);
        for (const [k, v] of sub.entries()) map.set(k, v);
      } else if (ent.isFile()) {
        map.set(ent.name, fp);
      }
    }
  } catch (_) {}
  return map;
}

/**
 * Sanitizes foreign mobile/local-venue terms from migrated Markdown treatises
 * and injects a mandatory LEC-015 **Alcance:** scope anchor.
 */
function sanitizeAndAnchorMarkdown(rawContent, scopeDescription, sourceOrigin) {
  let cleaned = rawContent
    .replace(/\r\n/g, '\n')
    // Remove old workspace disambiguation comments
    .replace(/<!--\s*CANON_FOUNDATION_FROM_YENDO:[^>]*-->\n?/g, '')
    // Replace mobile-specific terms with web-equivalent terminology where appropriate
    .replace(/\bReact Native\b/gi, 'Web UI / Vanilla & Modern Frontend')
    .replace(/\bExpo\b/g, 'Web Platform')
    .replace(/\bMaestro\b/g, 'Playwright E2E')
    // Strip local CABA venue/regulatory references so they never pollute RAG tokens
    .replace(/\b(SADAIC|AADI\s*CAPIF|AGC\s*CABA|Fudo|Maxirest|boliche|boliches)\b/gi, 'plataforma');

  const alcanceLine = `**Alcance:** ${scopeDescription} (Fuente migrada y curada desde ${sourceOrigin} para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en \`CANON_*\`).`;

  if (cleaned.includes('**Alcance:**')) {
    return cleaned;
  }

  // Insert right after the first H1 heading if present, otherwise at the top
  const h1Match = cleaned.match(/^(#\s+[^\n]+\n+)/);
  if (h1Match) {
    return cleaned.replace(/^(#\s+[^\n]+\n+)/, `$1\n${alcanceLine}\n\n`);
  }
  return `${alcanceLine}\n\n${cleaned}`;
}

/**
 * 1. Pre-converted Full Books & Courses from Centinela Studio
 */
const CENTINELA_MIGRATIONS = [
  // Full Books (17 new books not yet in knowledge/architecture_and_books)
  { file: 'ai_engineering.md', targetSubdir: 'architecture_and_books', scope: 'Libro completo AI Engineering (Chip Huyen): arquitectura de sistemas con LLMs, RAG, evaluación, latencia y FinOps.' },
  { file: 'artificial_intelligence_a_modern_approach_4th.md', targetSubdir: 'architecture_and_books', scope: 'Libro completo Artificial Intelligence: A Modern Approach 4th Ed. (Russell & Norvig): agentes racionales, búsqueda heurística, planificación y toma de decisiones.' },
  { file: 'beyond_vibe_coding.md', targetSubdir: 'architecture_and_books', scope: 'Libro completo Beyond Vibe Coding (O\'Reilly): ingeniería de software asistida por IA con disciplina arquitectónica, pruebas y verificación.' },
  { file: 'bigquery_and_llm_post_training_for_autonomous_agents.md', targetSubdir: 'architecture_and_books', scope: 'Guía técnica de post-entrenamiento y telemetría analítica para agentes autónomos.' },
  { file: 'building_applications_with_ai_agents_and_mult.md', targetSubdir: 'architecture_and_books', scope: 'Libro completo Building Applications with AI Agents & Multi-Agent Systems: diseño de orquestadores, memoria, herramientas y evaluación multi-agente.' },
  { file: 'codigo_limpio_spanish.md', targetSubdir: 'architecture_and_books', scope: 'Libro completo Código Limpio (Robert C. Martin): principios de código limpio, funciones cohesivas, nombres semánticos, manejo de errores y refactorización.' },
  { file: 'database_internals.md', targetSubdir: 'architecture_and_books', scope: 'Libro completo Database Internals (Alex Petrov): motores de almacenamiento B-Tree, LSM-Trees, WAL, concurrencia y sistemas distribuidos.' },
  { file: 'designing_ml_systems.md', targetSubdir: 'architecture_and_books', scope: 'Libro completo Designing Machine Learning Systems (Chip Huyen): pipelines de datos, inferencia en tiempo real, monitoreo y resiliencia.' },
  { file: 'generative_ai_design_patterns.md', targetSubdir: 'architecture_and_books', scope: 'Libro completo Generative AI Design Patterns (O\'Reilly): patrones de diseño para RAG, agentes, guardrails, caché semántico y control de alucinaciones.' },
  { file: 'generative_ai_langchain.md', targetSubdir: 'architecture_and_books', scope: 'Libro completo Generative AI with LangChain (Ben Auffarth): cadenas de recuperación, agentes con herramientas y evaluación RAG.' },
  { file: 'hands_on_large_language_models.md', targetSubdir: 'architecture_and_books', scope: 'Libro completo Hands-On Large Language Models (Jay Alammar & Maarten Grootendorst): embeddings densos, transformers, búsqueda semántica y reranking.' },
  { file: 'high_output_management.md', targetSubdir: 'architecture_and_books', scope: 'Libro completo High Output Management (Andrew Grove): apalancamiento operativo, indicadores líderes, control de calidad en fábricas de software.' },
  { file: 'human_compatible.md', targetSubdir: 'architecture_and_books', scope: 'Libro completo Human Compatible (Stuart Russell): alineación de sistemas autónomos, seguridad de IA y preferencias humanas.' },
  { file: 'reinforcement_learning_sutton_barto.md', targetSubdir: 'architecture_and_books', scope: 'Libro completo Reinforcement Learning: An Introduction (Sutton & Barto): procesos de decisión de Markov, bandidos contextuales y políticas óptimas.' },
  { file: 'release_it.md', targetSubdir: 'architecture_and_books', scope: 'Libro completo Release It! (Michael Nygard): patrones de estabilidad en producción, circuit breakers, bulkheads, timeouts y backpressure.' },
  { file: 'site_reliability_engineering_google.md', targetSubdir: 'architecture_and_books', scope: 'Libro completo Site Reliability Engineering (Google SRE): presupuestos de error, SLOs, eliminación de toil y respuesta a incidentes.' },
  { file: 'the_society_of_mind.md', targetSubdir: 'architecture_and_books', scope: 'Libro completo The Society of Mind (Marvin Minsky): arquitectura cognitiva modular y cooperación de micro-agentes especializados.' },

  // Video Courses (4 full transcribed courses)
  { file: 'andrej_karpathy_intro_to_large_language_models.md', targetSubdir: 'architecture_and_books', outName: 'course_andrej_karpathy_intro_to_llms.md', scope: 'Videocurso completo de Andrej Karpathy: arquitectura y funcionamiento interno de Large Language Models y seguridad de sistemas IA.' },
  { file: 'end_to_end_llm_post_training_bigquery_to_production.md', targetSubdir: 'architecture_and_books', outName: 'course_end_to_end_llm_post_training.md', scope: 'Videocurso técnico sobre pipelines de post-entrenamiento y mejora continua de agentes en producción.' },
  { file: 'freecodecamp_langgraph_conversational_ai_agents.md', targetSubdir: 'architecture_and_books', outName: 'course_freecodecamp_langgraph_ai_agents.md', scope: 'Videocurso completo de freeCodeCamp sobre grafos de estado agénticos, memoria persistente y agentes conversacionales.' },
  { file: 'freecodecamp_rag_chatbot_javascript_langchain.md', targetSubdir: 'architecture_and_books', outName: 'course_freecodecamp_rag_javascript.md', scope: 'Videocurso completo de freeCodeCamp sobre construcción de sistemas RAG en JavaScript/Node.js con motores vectoriales.' },

  // Papers & Stream/Agent Treatises from Centinela
  { file: 'CANON_AGENTIC_01_FOUNDATIONAL_PAPERS.md', targetSubdir: 'architecture_and_books', outName: 'VAULT_AGENTIC_01_FOUNDATIONAL_PAPERS.md', scope: 'Compendio de papers fundacionales de IA agéntica (ReAct, Reflexion, Voyager, Generative Agents, DSPy).' },
  { file: 'CANON_AGENTIC_02_FRAMEWORKS_ORCHESTRATION.md', targetSubdir: 'architecture_and_books', outName: 'VAULT_AGENTIC_02_FRAMEWORKS_ORCHESTRATION.md', scope: 'Arquitectura de orquestación multi-agente, máquinas de estados deterministas y protocolos de delegación.' },
  { file: 'CANON_AGENTIC_03_SOTA_OPEN_SOURCE_AND_TOOLING.md', targetSubdir: 'architecture_and_books', outName: 'VAULT_AGENTIC_03_SOTA_OPEN_SOURCE_AND_TOOLING.md', scope: 'Ecosistema de herramientas open-source para agentes autónomos, sandboxes y evaluación continua.' },
  { file: 'IA_AGENTICA_ORQUESTACION.md', targetSubdir: 'architecture_and_books', outName: 'VAULT_IA_AGENTICA_ORQUESTACION.md', scope: 'Patrones de diseño de enjambres de agentes, enrutamiento semántico y memoria episódica.' },
  { file: 'TOKEN_REDUCTION_TOOLKIT_2026.md', targetSubdir: 'architecture_and_books', outName: 'VAULT_TOKEN_REDUCTION_TOOLKIT_2026.md', scope: 'Técnicas de compresión de contexto, presupuesto de tokens FinOps y poda de prompts para equipos de agentes.' },
  { file: 'SOTA_EMPATHIC_SENSES_ORACLE_HUNT_2026.md', targetSubdir: 'streaming_and_overlays', outName: 'VAULT_EMPATHIC_SENSES_ORACLE_HUNT_2026.md', scope: 'Detección multimodal de eventos en vivo en streams de casino, telemetría de audio/visión y sincronización con chat.' },
  { file: 'SOTA_MULTIMODAL_STREAM_AGENTS_VAULT_2026.md', targetSubdir: 'streaming_and_overlays', outName: 'VAULT_MULTIMODAL_STREAM_AGENTS_2026.md', scope: 'Arquitectura de agentes multimodales en tiempo real para transmisiones en vivo en Kick.com.' },
  { file: 'RLHF_Streaming_Agent_Architecture.md', targetSubdir: 'streaming_and_overlays', outName: 'VAULT_RLHF_STREAMING_AGENT_ARCHITECTURE.md', scope: 'Aprendizaje por refuerzo y bucles de retroalimentación en vivo para sistemas de streaming.' },
  { file: 'CANON_ALGORITHMIC_GAME_THEORY.md', targetSubdir: 'streaming_and_overlays', outName: 'VAULT_ALGORITHMIC_GAME_THEORY.md', scope: 'Teoría de juegos algorítmica (Nisan, Roughgarden, Tardos, Vazirani): diseño de mecanismos, equilibrios de Nash e incentivos a prueba de colusión.' }
];

/**
 * 2. Curated Treatises & Video Masterclasses from Yendo Mobile (.knowledge/)
 */
const YENDO_MIGRATIONS = [
  // UI/UX, Golden Ratio, Minimalist Design & Masterclasses
  { file: 'golden_ratio_design_sources.md', targetSubdir: 'ui_ux_design', outName: 'VAULT_GOLDEN_RATIO_DESIGN_SOURCES.md', scope: 'Proporción áurea (Phi = 1.618), escalas tipográficas modulares, geometría sagrada y composición visual en interfaces web.' },
  { file: 'golden_ratio_ui_synthesis.md', targetSubdir: 'ui_ux_design', outName: 'VAULT_GOLDEN_RATIO_UI_SYNTHESIS.md', scope: 'Síntesis matemática de la proporción áurea aplicada a grillas CSS, espaciado, jerarquía de tarjetas y balance óptico.' },
  { file: 'DESIGN_SYSTEM_MAP.md', targetSubdir: 'ui_ux_design', outName: 'VAULT_DESIGN_SYSTEM_MAP.md', scope: 'Arquitectura de Design Tokens semánticos, superficies oscuras (Dark Mode), elevación tonal y ergonomía visual.' },
  { file: 'CANON_UI_UX_BIBLIOTECA_CENTRAL.md', targetSubdir: 'ui_ux_design', outName: 'VAULT_UI_UX_BIBLIOTECA_CENTRAL.md', scope: 'Compendio maestro de leyes de UX/UI, heurísticas de Nielsen, diseño emocional de Don Norman y arquitectura de sistemas de diseño.' },
  { file: 'CANON_ACCESSIBILITY_FOR_EVERYONE_KALBAG.md', targetSubdir: 'ui_ux_design', outName: 'VAULT_ACCESSIBILITY_FOR_EVERYONE_KALBAG.md', scope: 'Síntesis de Accessibility for Everyone (Laura Kalbag): accesibilidad web WCAG, semántica HTML, navegación por teclado y contraste.' },
  { file: 'Efecto_WOW_Software_Architecture.md', targetSubdir: 'ui_ux_design', outName: 'VAULT_EFECTO_WOW_SOFTWARE_ARCHITECTURE.md', scope: 'Ingeniería del Efecto WOW en sitios web modernos: micro-interacciones a 60 FPS, respuesta táctil/visual instantánea y pulido estético.' },
  { file: 'Graphic_Agents_Anabolic_Framework.md', targetSubdir: 'ui_ux_design', outName: 'VAULT_GRAPHIC_AGENTS_FRAMEWORK.md', scope: 'Marco de trabajo para agentes de diseño gráfico, auditoría visual automatizada y control de calidad estético.' },
  { file: 'Herramientas_OpenSource_UX_UI_Squad_SOTA.md', targetSubdir: 'ui_ux_design', outName: 'VAULT_HERRAMIENTAS_OPENSOURCE_UX_UI_SOTA.md', scope: 'Catálogo de herramientas open-source de diseño UI/UX, primitivos accesibles, iconografía vectorial y auditoría de contraste.' },
  { file: 'External_Masterclass_FrontendMasters_front_end_system_design_advanced_ui_perf_1789750045274.md', targetSubdir: 'ui_ux_design', outName: 'MASTERCLASS_FRONTEND_MASTERS_UI_SYSTEM_DESIGN_PERF.md', scope: 'Masterclass de Frontend Masters: diseño de sistemas frontend, virtualización del DOM, presupuesto de memoria y rendimiento a 60 FPS.' },
  { file: 'External_Masterclass_NielsenNormanGroup_aesthetic_and_minimalist_design_usabilit_1789749703166.md', targetSubdir: 'ui_ux_design', outName: 'MASTERCLASS_NNGROUP_AESTHETIC_AND_MINIMALIST_DESIGN.md', scope: 'Masterclass de Nielsen Norman Group (NN/g): Heurística #8 de Diseño Estético y Minimalista, relación señal-ruido y jerarquía visual.' },
  { file: 'External_Masterclass_NielsenNormanGroup_fitts_s_law_in_graphical_user_interfaces_1789749628632.md', targetSubdir: 'ui_ux_design', outName: 'MASTERCLASS_NNGROUP_FITTS_LAW_IN_GUIS.md', scope: 'Masterclass de Nielsen Norman Group (NN/g): formulación matemática y aplicación práctica de la Ley de Fitts en interfaces gráficas.' },
  { file: 'External_Masterclass_NielsenNormanGroup_using_fitts_s_law_to_make_links_and_butt_1789749663109.md', targetSubdir: 'ui_ux_design', outName: 'MASTERCLASS_NNGROUP_FITTS_LAW_BUTTONS_AND_LINKS.md', scope: 'Masterclass de Nielsen Norman Group (NN/g): dimensionamiento de áreas clicables, botones de acción primaria y prevención de errores.' },
  { file: 'External_Masterclass_NielsenNormanGroup_flat_vs_deep_information_hierarchies_in__1789749736836.md', targetSubdir: 'ui_ux_design', outName: 'MASTERCLASS_NNGROUP_FLAT_VS_DEEP_HIERARCHIES.md', scope: 'Masterclass de Nielsen Norman Group (NN/g): arquitectura de la información, jerarquías planas vs profundas y descubribilidad en navegación web.' },
  { file: 'External_Masterclass_Vimeo_creating_and_maintaining_successful_desi_1789749736836.md', fallbackMatch: 'External_Masterclass_Vimeo_creating_and_maintaining_successful_desi', targetSubdir: 'ui_ux_design', outName: 'MASTERCLASS_BRAD_FROST_MAINTAINING_DESIGN_SYSTEMS.md', scope: 'Masterclass de Brad Frost sobre creación, gobernanza y mantenimiento de Design Systems escalables.' },
  { file: 'External_Masterclass_webdev_learn_responsive_adaptive_ui_design_view_1789750174656.md', targetSubdir: 'ui_ux_design', outName: 'MASTERCLASS_WEBDEV_RESPONSIVE_ADAPTIVE_UI_DESIGN.md', scope: 'Masterclass oficial de Google web.dev sobre diseño responsivo, adaptativo, Container Queries y ergonomía fluida.' },

  // Motion, 3D, Shaders & Animation Masterclasses
  { file: 'External_Masterclass_KhanAcademy_animation_b_zier_curves_the_mathematics__1789750114578.md', targetSubdir: 'motion_and_animation', outName: 'MASTERCLASS_KHAN_ACADEMY_BEZIER_CURVES_MATHEMATICS.md', scope: 'Masterclass de Pixar / Khan Academy sobre la matemática de curvas de Bézier cúbicas, interpolación y suavizado de movimiento.' },
  { file: 'External_Masterclass_AppleDeveloper_animate_with_springs_wwdc23_session_1015_1789749513679.md', targetSubdir: 'motion_and_animation', outName: 'MASTERCLASS_WWDC23_ANIMATE_WITH_SPRINGS.md', scope: 'Masterclass de Apple WWDC23 (Animate with Springs): física de resortes amortiguados, conservación de velocidad e interrupción sin saltos.' },
  { file: 'External_Masterclass_AppleDeveloper_designing_fluid_interfaces_wwdc18_sessio_1789749478452.md', targetSubdir: 'motion_and_animation', outName: 'MASTERCLASS_WWDC18_DESIGNING_FLUID_INTERFACES.md', scope: 'Masterclass de Apple WWDC18 (Designing Fluid Interfaces): redirección continua de gestos, latencia perceptual cero y coreografía espacial.' },
  { file: '3D_PBR_And_Cinematography_Guide.md', targetSubdir: 'motion_and_animation', outName: 'VAULT_3D_PBR_AND_CINEMATOGRAPHY_GUIDE.md', scope: 'Guía técnica de renderizado físicamente basado (PBR), iluminación cinematográfica de 3 puntos, shaders y materiales metálicos/holográficos.' },
  { file: 'Motion_And_Animation_Bibles.md', targetSubdir: 'motion_and_animation', outName: 'VAULT_MOTION_AND_ANIMATION_BIBLES.md', scope: 'Compendio de los 12 principios de animación de Disney (Illusion of Life) aplicados a micro-interacciones web y transiciones de estado.' },
  { file: 'Pipeline_Optimizacion_Render_3D_Motion.md', targetSubdir: 'motion_and_animation', outName: 'VAULT_PIPELINE_OPTIMIZACION_RENDER_3D_MOTION.md', scope: 'Pipeline de optimización GPU para animaciones web y 3D: presupuesto de 16.6ms, reducción de draw calls y aislamiento de capas.' },

  // Psychology, Gamification, Behavioral Economics & Growth
  { file: 'CANON_100_THINGS_DESIGNER_PEOPLE_WEINSCHENK.md', targetSubdir: 'ui_ux_design', outName: 'VAULT_100_THINGS_DESIGNER_NEEDS_TO_KNOW_WEINSCHENK.md', scope: 'Síntesis de 100 Things Every Designer Needs to Know About People (Susan Weinschenk): visión foveal/periférica, carga cognitiva y dopamina.' },
  { file: 'CANON_ATTENTION_MERCHANTS_TIM_WU.md', targetSubdir: 'ui_ux_design', outName: 'VAULT_ATTENTION_MERCHANTS_TIM_WU.md', scope: 'Síntesis de The Attention Merchants (Tim Wu): economía de la atención, captura de foco visual y retención ética de audiencias.' },
  { file: 'CANON_DESIGNING_FOR_EMOTION_WALTER.md', targetSubdir: 'ui_ux_design', outName: 'VAULT_DESIGNING_FOR_EMOTION_AARON_WALTER.md', scope: 'Síntesis de Designing for Emotion (Aaron Walter — A Book Apart): pirámide de necesidades del usuario (funcional, confiable, usable, placentero).' },
  { file: 'CANON_FOR_THE_WIN_GAMIFICATION_WERBACH.md', targetSubdir: 'streaming_and_overlays', outName: 'VAULT_FOR_THE_WIN_GAMIFICATION_WERBACH.md', scope: 'Síntesis de For the Win (Kevin Werbach): jerarquía Dinámicas-Mecánicas-Componentes (DMC), bucles de actividad y progresión.' },
  { file: 'CANON_PREDICTABLY_IRRATIONAL_ARIELY_TRAMPAS_DESEO.md', targetSubdir: 'ui_ux_design', outName: 'VAULT_PREDICTABLY_IRRATIONAL_DAN_ARIELY.md', scope: 'Síntesis de Predictably Irrational (Dan Ariely): efecto señuelo, poder del GRATIS ($0), anclaje de precios y normas sociales vs mercantiles.' },
  { file: 'CANON_SCARCITY_ESCASEZ_BANDWIDTH_TAX.md', targetSubdir: 'ui_ux_design', outName: 'VAULT_SCARCITY_MULLAINATHAN_SHAFIR.md', scope: 'Síntesis de Scarcity (Mullainathan & Shafir): psicología de la escasez, efecto túnel, impuesto al ancho de banda cognitivo y urgencia.' },
  { file: 'CANON_THE_PARADOX_OF_CHOICE_BARRY_SCHWARTZ.md', targetSubdir: 'ui_ux_design', outName: 'VAULT_PARADOX_OF_CHOICE_BARRY_SCHWARTZ.md', scope: 'Síntesis de The Paradox of Choice (Barry Schwartz): parálisis por análisis, fatiga de decisión y curaduría de opciones en UI.' },
  { file: 'CANON_THINKING_FAST_AND_SLOW_KAHNEMAN.md', targetSubdir: 'ui_ux_design', outName: 'VAULT_THINKING_FAST_AND_SLOW_KAHNEMAN.md', scope: 'Síntesis de Thinking, Fast and Slow (Daniel Kahneman): Sistema 1 vs Sistema 2, facilidad cognitiva, aversión a la pérdida y regla pico-final.' },
  { file: 'CANON_MISBEHAVING_THALER_BEHAVIORAL_ECONOMICS.md', targetSubdir: 'ui_ux_design', outName: 'VAULT_MISBEHAVING_RICHARD_THALER.md', scope: 'Síntesis de Misbehaving (Richard Thaler): contabilidad mental, efecto dotación, utilidad de transacción y arquitectura de decisiones.' },
  { file: 'CANON_MONETIZING_INNOVATION_SIMON_KUCHER.md', targetSubdir: 'ui_ux_design', outName: 'VAULT_MONETIZING_INNOVATION_SIMON_KUCHER.md', scope: 'Síntesis de Monetizing Innovation (Madhavan Ramanujam): diseño de paquetes de valor, segmentación por niveles (Tiers) y disposición a pagar.' },
  { file: 'CANON_EXPERIENCE_ECONOMY_PINE_GILMORE.md', targetSubdir: 'ui_ux_design', outName: 'VAULT_EXPERIENCE_ECONOMY_PINE_GILMORE.md', scope: 'Síntesis de The Experience Economy (Pine & Gilmore): transformación de servicios digitales en experiencias memorables y teatrales.' },
  { file: 'CANON_PLATFORM_REVOLUTION_SCALE_NETWORK_EFFECTS.md', targetSubdir: 'ui_ux_design', outName: 'VAULT_PLATFORM_REVOLUTION_NETWORK_EFFECTS.md', scope: 'Síntesis de Platform Revolution (Parker, Van Alstyne, Choudary): efectos de red bilaterales (streamers, espectadores y patrocinadores).' },
  { file: 'GAME_THEORY_GROWTH_LOOPS_Y_DUNBAR_QUORUM.md', targetSubdir: 'streaming_and_overlays', outName: 'VAULT_GAME_THEORY_AND_VIRAL_GROWTH_LOOPS.md', scope: 'Bucles de crecimiento viral (Growth Loops), masa crítica comunitaria y mecánicas cooperativas de participación en vivo.' },
  { file: 'Viral_Marketing_Mechanics_2026.md', targetSubdir: 'streaming_and_overlays', outName: 'VAULT_VIRAL_MARKETING_MECHANICS_2026.md', scope: 'Ingeniería de viralidad, coeficientes K, compartición social de victorias y retención de comunidades digitales.' },

  // Cybersecurity & Cryptography
  { file: '01_CANON_PAPERS_SEMINALES_CRIPTOGRAFIA_PROTOCOLOS.md', targetSubdir: 'cybersecurity', outName: 'VAULT_PAPERS_SEMINALES_CRIPTOGRAFIA_PROTOCOLOS.md', scope: 'Papers seminales de criptografía moderna: Diffie-Hellman, RSA, SHA-256, HMAC, curvas elípticas y pruebas de compromiso.' },
  { file: '02_ARSENAL_EDUCATIVO_CURSOS_AUDITORIAS_YOUTUBE.md', targetSubdir: 'cybersecurity', outName: 'VAULT_ARSENAL_CURSOS_Y_AUDITORIAS_CIBERSEGURIDAD.md', scope: 'Síntesis de cursos universitarios de ciberseguridad (MIT 6.858 Computer Systems Security, Stanford CS253 Web Security).' },
  { file: 'CANON_REAL_WORLD_CRYPTOGRAPHY_WONG.md', targetSubdir: 'cybersecurity', outName: 'VAULT_REAL_WORLD_CRYPTOGRAPHY_DAVID_WONG.md', scope: 'Síntesis de Real-World Cryptography (David Wong): funciones hash, MACs, firmas digitales, CSPRNG, TLS y protocolos autenticados.' },
  { file: 'CANON_SECURITY_BOOKS_AND_DOCS_2026.md', targetSubdir: 'cybersecurity', outName: 'VAULT_SECURITY_BOOKS_AND_DOCS_2026.md', scope: 'Compendio de bibliografía de ciberseguridad defensiva, OWASP ASVS, endurecimiento de APIs y protección contra abuso.' },
  { file: 'CANON_SECURITY_ENGINEERING_ROSS_ANDERSON.md', targetSubdir: 'cybersecurity', outName: 'VAULT_SECURITY_ENGINEERING_ROSS_ANDERSON.md', scope: 'Síntesis de Security Engineering (Ross Anderson): diseño de sistemas resistentes al fraude, psicología del atacante y auditoría de protocolos.' },
  { file: 'CANON_SOCIAL_ENGINEERING_HUMAN_HACKING.md', targetSubdir: 'cybersecurity', outName: 'VAULT_SOCIAL_ENGINEERING_HUMAN_HACKING.md', scope: 'Prevención de ingeniería social, phishing, suplantación de identidad en comunidades de streaming y defensa del panel de administración.' },
  { file: 'CANON_THREAT_MODELING_ADAM_SHOSTACK.md', targetSubdir: 'cybersecurity', outName: 'VAULT_THREAT_MODELING_ADAM_SHOSTACK.md', scope: 'Síntesis de Threat Modeling: Designing for Security (Adam Shostack): metodología STRIDE, árboles de ataque y mitigación temprana.' },

  // Software Architecture, Clean Code & Agentic Harnesses
  { file: 'CANON_ALGORITHM_DESIGN_MANUAL_SKIENA.md', targetSubdir: 'architecture_and_books', outName: 'VAULT_ALGORITHM_DESIGN_MANUAL_SKIENA.md', scope: 'Síntesis de The Algorithm Design Manual (Steven Skiena): estructuras de datos eficientes, grafos, hashing y complejidad algorítmica.' },
  { file: 'CANON_BUILDING_MICROSERVICES_SAM_NEWMAN.md', targetSubdir: 'architecture_and_books', outName: 'VAULT_BUILDING_MICROSERVICES_SAM_NEWMAN.md', scope: 'Síntesis de Building Microservices (Sam Newman): límites de contexto, contratos de API desacoplados y resiliencia entre servicios.' },
  { file: 'CANON_DISTRIBUTED_SYSTEMS_TANENBAUM.md', targetSubdir: 'architecture_and_books', outName: 'VAULT_DISTRIBUTED_SYSTEMS_TANENBAUM.md', scope: 'Síntesis de Distributed Systems (Tanenbaum & Van Steen): relojes lógicos, consistencia eventual, replicación y tolerancia a fallos.' },
  { file: 'CANON_EFFECTIVE_TYPESCRIPT_CHERNY_VANDERKAM.md', targetSubdir: 'architecture_and_books', outName: 'VAULT_EFFECTIVE_TYPESCRIPT_VANDERKAM.md', scope: 'Síntesis de Effective TypeScript (Dan Vanderkam): inferencia de tipos, uniones discriminadas, tipos de marca (Branded Types) y seguridad en runtime.' },
  { file: 'CANON_JAVASCRIPT_GOOD_PARTS_CROCKFORD.md', targetSubdir: 'architecture_and_books', outName: 'VAULT_JAVASCRIPT_GOOD_PARTS_CROCKFORD.md', scope: 'Fundamentos del motor JavaScript, clausuras (closures), composición funcional y prevención de errores silenciosos.' },
  { file: 'CANON_SOFTWARE_ENGINEERING_AT_GOOGLE.md', targetSubdir: 'architecture_and_books', outName: 'VAULT_SOFTWARE_ENGINEERING_AT_GOOGLE.md', scope: 'Síntesis de Software Engineering at Google (Winters, Manshreck, Wright): sostenibilidad del código en el tiempo, revisión por pares y pruebas.' },
  { file: 'CANON_THE_TWELVE_FACTOR_APP.md', targetSubdir: 'architecture_and_books', outName: 'VAULT_THE_TWELVE_FACTOR_APP.md', scope: 'Metodología The Twelve-Factor App para aplicaciones cloud-native: configuración en variables de entorno, procesos sin estado y paridad dev/prod.' },
  { file: 'CANON_TIDY_FIRST_KENT_BECK.md', targetSubdir: 'architecture_and_books', outName: 'VAULT_TIDY_FIRST_KENT_BECK.md', scope: 'Síntesis de Tidy First? (Kent Beck): micro-refactorizaciones seguras, cláusulas de guarda, eliminación de código muerto y cohesión.' },
  { file: 'Valibot_SOTA_Validation.md', targetSubdir: 'architecture_and_books', outName: 'VAULT_VALIBOT_SOTA_VALIDATION.md', scope: 'Guía técnica de validación de esquemas ultraligera con Valibot (~1 KB) frente a payloads no confiables en el Edge.' },
  { file: 'CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md', targetSubdir: 'architecture_and_books', outName: 'VAULT_HARNESS_ENGINEERING_INTEGRAL_2026.md', scope: 'Ingeniería de Harnesses para equipos de agentes autónomos: aislamiento de tareas, verificación determinista por CLI y prevención de regresiones.' },
  { file: 'CANON_HARNESS_Y_EVALS_AGENTICOS_SOTA_2026.md', targetSubdir: 'architecture_and_books', outName: 'VAULT_HARNESS_Y_EVALS_AGENTICOS_SOTA_2026.md', scope: 'Matrices de evaluación agéntica (pass@k, Hit@5, MRR), jueces deterministas y puertas de calidad automatizadas.' },
  { file: 'SOTA_RAG_LIGHTRAG_SELFRAG_CRAG_IMPLEMENTATION_2026.md', targetSubdir: 'architecture_and_books', outName: 'VAULT_SOTA_RAG_LIGHTRAG_SELFRAG_CRAG_2026.md', scope: 'Arquitecturas avanzadas de recuperación: LightRAG (grafos de entidades), Self-RAG (autorreflexión) y CRAG (Corrective RAG).' }
];

/**
 * 3. Raw PDF & EPUB Books across Downloads, Desktop, yendo_mobile/unsorted & yendo_mobile/data/raw_library
 */
const RAW_BOOKS_TO_EXTRACT = [
  // Downloads & Desktop (Casino Mathematics, Game Feel, Slot Psychology, Game Design)
  {
    path: path.join(DOWNLOADS_DIR, '2-game-feel.pdf'),
    slug: 'book_game_feel_steve_swink',
    title: 'Game Feel: A Game Designer\'s Guide to Virtual Sensation',
    author: 'Steve Swink',
    domain: 'Interactividad en Tiempo Real, Respuesta Táctil/Visual, Física de Control y Pulido ("Juice")',
    outSubdir: 'motion_and_animation'
  },
  {
    path: path.join(DOWNLOADS_DIR, 'Addiction by Design_ Machine Gambling in L - Natasha Dow Schull.pdf'),
    slug: 'book_addiction_by_design_natasha_dow_schull',
    title: 'Addiction by Design: Machine Gambling in Las Vegas',
    author: 'Natasha Dow Schüll (Princeton University Press)',
    domain: 'Psicología de Slots, "The Machine Zone", Cadencia de Giros, Juego Responsable y Ética de Diseño',
    outSubdir: 'streaming_and_overlays'
  },
  {
    path: path.join(DOWNLOADS_DIR, 'pdfcoffee.com_the-gamer-s-brain-how-neuroscience-and-ux-can-impact-video-game-design-1st-edition-celia-hodent-complete-full-ebook-pdf-free.pdf'),
    slug: 'book_the_gamers_brain_celia_hodent',
    title: 'The Gamer\'s Brain: How Neuroscience and UX Can Impact Video Game Design',
    author: 'Celia Hodent',
    domain: 'Neurociencia Aplicada a UX, Percepción, Memoria de Trabajo, Atención, Motivación y Onboarding de Juegos',
    outSubdir: 'ui_ux_design'
  },
  {
    path: path.join(DOWNLOADS_DIR, 'dokumen.pub_game-mechanics-advanced-game-design-0321820274-9780321820273.pdf'),
    slug: 'book_game_mechanics_advanced_game_design_adams_dormans',
    title: 'Game Mechanics: Advanced Game Design',
    author: 'Ernest Adams & Joris Dormans',
    domain: 'Economías Internas de Juegos, Bucles de Retroalimentación Positiva/Negativa, Balance Matemático y Progresión',
    outSubdir: 'streaming_and_overlays'
  },
  {
    path: path.join(DOWNLOADS_DIR, 'Catalin Barboianu Probability Guide to Gambling The Mathematics of Dice, Slots, Roulette.pdf'),
    slug: 'book_probability_guide_to_gambling_barboianu',
    title: 'Probability Guide to Gambling: The Mathematics of Dice, Slots, Roulette',
    author: 'Catalin Barboianu',
    domain: 'Matemática de Probabilidades en Juegos de Azar, RTP, Volatilidad, Combinatoria de Carretes (Reels), Ruleta y Dados',
    outSubdir: 'streaming_and_overlays'
  },
  {
    path: path.join(DESKTOP_DIR, 'Nigel-Turner-Roger-Horbay-.pdf'),
    slug: 'book_how_slot_machines_actually_work_turner_horbay',
    title: 'How Do Slot Machines Actually Work?',
    author: 'Nigel E. Turner & Roger Horbay',
    domain: 'Funcionamiento Real de Generadores de Números Aleatorios (RNG), Paradas Virtuales, Frecuencia de Aciertos y Transparencia',
    outSubdir: 'streaming_and_overlays'
  },

  // yendo_mobile/unsorted (Typography, Swiss Grids, Accessibility, Behavioral Economics, Product & TypeScript)
  {
    path: path.join(YENDO_UNSORTED, 'the_elements_of_typographic_style.pdf'),
    slug: 'book_elements_of_typographic_style_bringhurst',
    title: 'The Elements of Typographic Style',
    author: 'Robert Bringhurst',
    domain: 'Tipografía Clásica y Moderna, Ritmo Vertical, Proporciones de Página, Escalas Modulares y Microtipografía',
    outSubdir: 'ui_ux_design'
  },
  {
    path: path.join(YENDO_UNSORTED, 'pdfcoffee.com_grid-systems-in-graphic-design-josef-muller-brockmann-pdf-free.pdf'),
    slug: 'book_grid_systems_in_graphic_design_muller_brockmann',
    title: 'Grid Systems in Graphic Design',
    author: 'Josef Müller-Brockmann',
    domain: 'Sistemas de Grillas Suizas, Composición Asimétrica, Proporción Matemática, Espacio Negativo y Orden Editorial',
    outSubdir: 'ui_ux_design'
  },
  {
    path: path.join(YENDO_UNSORTED, 'pdfcoffee.com_accessibility-for-everyone-pdf-free.pdf'),
    slug: 'book_accessibility_for_everyone_laura_kalbag',
    title: 'Accessibility for Everyone',
    author: 'Laura Kalbag (A Book Apart)',
    domain: 'Accesibilidad Web Universal (WCAG), Diseño Inclusivo, Lectores de Pantalla, Contraste y Ergonomía de Teclado',
    outSubdir: 'ui_ux_design'
  },
  {
    path: path.join(YENDO_UNSORTED, 'pdfcoffee.com_misbehavingthe-making-of-behavioral-economics-5-pdf-free.pdf'),
    slug: 'book_misbehaving_richard_thaler',
    title: 'Misbehaving: The Making of Behavioral Economics',
    author: 'Richard H. Thaler',
    domain: 'Economía Conductual, Contabilidad Mental, Efecto Dotación, Justicia Percibida y Psicología de Recompensas',
    outSubdir: 'ui_ux_design'
  },
  {
    path: path.join(YENDO_UNSORTED, 'FBM.pdf'),
    slug: 'book_fogg_behavior_model_bj_fogg',
    title: 'Fogg Behavior Model (B = MAP: Motivation, Ability, Prompt)',
    author: 'B.J. Fogg (Stanford Persuasive Tech Lab)',
    domain: 'Diseño Persuasivo, Ecuación B=MAP, Reducción de Fricción en Conversión (CRO) y Disparadores Oportunos',
    outSubdir: 'ui_ux_design'
  },
  {
    path: path.join(YENDO_UNSORTED, 'Inspired - Marty Cagan.pdf'),
    slug: 'book_inspired_marty_cagan',
    title: 'Inspired: How to Create Tech Products Customers Love',
    author: 'Marty Cagan (Silicon Valley Product Group)',
    domain: 'Descubrimiento de Producto, Prototipado Rápido, Equipos Empoderados y Entrega de Valor Real al Usuario',
    outSubdir: 'architecture_and_books'
  },
  {
    path: path.join(YENDO_UNSORTED, 'dokumen.pub_effective-typescript-62-specific-ways-to-improve-your-typescript-1nbsped-9781492053712-1492053716.pdf'),
    slug: 'book_effective_typescript_dan_vanderkam',
    title: 'Effective TypeScript: 62 Specific Ways to Improve Your TypeScript',
    author: 'Dan Vanderkam (O\'Reilly)',
    domain: 'Ingeniería Avanzada en TypeScript, Diseño de Tipos Estrictos, Contratos de API y Prevención de Bugs en Runtime',
    outSubdir: 'architecture_and_books'
  },

  // yendo_mobile/data/raw_library (Web Animations, UI Performance, Design Systems, Game Design & Flow)
  {
    path: path.join(YENDO_RAW_LIB, 'Motion_y_Animacion', 'dokumen.pub_animation-at-work-9781937557591.pdf'),
    slug: 'book_animation_at_work_rachel_nabors',
    title: 'Animation at Work',
    author: 'Rachel Nabors (A Book Apart)',
    domain: 'Animación Web Funcional, Percepción Humana del Movimiento, Transiciones Cognitivas y Coreografía de UI',
    outSubdir: 'motion_and_animation'
  },
  {
    path: path.join(YENDO_RAW_LIB, 'UI_UX_y_Ergonomia', 'Designing-For-Performance-Lara-Hogan.pdf'),
    slug: 'book_designing_for_performance_lara_hogan',
    title: 'Designing for Performance: Weighing Aesthetics and Speed',
    author: 'Lara Hogan (O\'Reilly)',
    domain: 'Rendimiento Web, Optimización de Imágenes (WebP/AVIF/SVG), Critical Rendering Path, Tipografía Rápida y Presupuesto de Peso',
    outSubdir: 'ui_ux_design'
  },
  {
    path: path.join(YENDO_RAW_LIB, 'UI_UX_y_Ergonomia', 'Designing-Interfaces-2nd-Ed-Jenifer-Tidwell.pdf'),
    slug: 'book_designing_interfaces_jenifer_tidwell',
    title: 'Designing Interfaces: Patterns for Effective Interaction Design',
    author: 'Jenifer Tidwell (O\'Reilly)',
    domain: 'Patrones de Diseño de Interacción, Navegación, Tablas de Datos, Dashboards, Modales y Controles Visuales',
    outSubdir: 'ui_ux_design'
  },
  {
    path: path.join(YENDO_RAW_LIB, 'UI_UX_y_Ergonomia', 'Frontend-Architecture-for-Design-Systems-Micah-Godbolt.pdf'),
    slug: 'book_frontend_architecture_design_systems_godbolt',
    title: 'Frontend Architecture for Design Systems',
    author: 'Micah Godbolt (O\'Reilly)',
    domain: 'Arquitectura CSS Escalable, Sistemas de Diseño Modulares, Documentación Viva y Pruebas Visuales Automatizadas',
    outSubdir: 'ui_ux_design'
  },
  {
    path: path.join(YENDO_RAW_LIB, 'UI_UX_y_Ergonomia', 'The-Design-of-Everyday-Things-Don-Norman.pdf'),
    slug: 'book_design_of_everyday_things_don_norman',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    domain: 'Affordances, Significantes (Signifiers), Mapeo Natural, Feedback Inmediato, Modelos Mentales y Prevención de Errores',
    outSubdir: 'ui_ux_design'
  },
  {
    path: path.join(YENDO_RAW_LIB, 'UI_UX_y_Ergonomia', 'pdfcoffee.com_donald-norman-y-el-diseo-emocional-5-pdf-free.pdf'),
    slug: 'book_el_diseno_emocional_don_norman',
    title: 'El Diseño Emocional: Por qué nos gustan (o no) los objetos cotidianos',
    author: 'Don Norman',
    domain: 'Los Tres Niveles del Diseño Emocional: Visceral (Impacto Estético), Conductual (Fluidez y Función) y Reflexivo (Identidad y Orgullo)',
    outSubdir: 'ui_ux_design'
  },
  {
    path: path.join(YENDO_RAW_LIB, 'UI_UX_y_Ergonomia', 'Atomic-Design-Brad-Frost-Spanish.pdf'),
    slug: 'book_atomic_design_brad_frost',
    title: 'Atomic Design (Edición Español)',
    author: 'Brad Frost',
    domain: 'Metodología Atomic Design: Átomos, Moléculas, Organismos, Plantillas y Páginas para Sistemas de Diseño Web',
    outSubdir: 'ui_ux_design'
  },
  {
    path: path.join(YENDO_RAW_LIB, 'UI_UX_y_Ergonomia', 'Web-Form-Design-Luke-Wroblewski.pdf'),
    slug: 'book_web_form_design_luke_wroblewski',
    title: 'Web Form Design: Filling in the Blanks',
    author: 'Luke Wroblewski',
    domain: 'Ergonomía de Formularios Web, Reducción de Fricción en Reclamos/Inscripciones, Validación en Línea y Conversión',
    outSubdir: 'ui_ux_design'
  },
  {
    path: path.join(YENDO_RAW_LIB, 'Game_Design', '3-the-art-of-game-design-a-book-of-lenses_3.pdf'),
    slug: 'book_art_of_game_design_jesse_schell',
    title: 'The Art of Game Design: A Book of Lenses (3rd Edition)',
    author: 'Jesse Schell',
    domain: 'Las 113 Lentes del Diseño de Juegos: Sorpresa, Diversión, Curiosidad, Valor Endógeno, Flujo, Equilibrio yComunidad',
    outSubdir: 'streaming_and_overlays'
  },
  {
    path: path.join(YENDO_RAW_LIB, 'Game_Design', 'Designing Games - Tynan Sylvester.pdf'),
    slug: 'book_designing_games_tynan_sylvester',
    title: 'Designing Games: A Guide to Engineering Experiences',
    author: 'Tynan Sylvester',
    domain: 'Ingeniería de Emociones en Juegos, Eventos de Cambio de Valor, Incertidumbre, Riesgo/Recompensa y Multijugador',
    outSubdir: 'streaming_and_overlays'
  },
  {
    path: path.join(YENDO_RAW_LIB, 'Game_Design', 'dokumen.pub_rules-of-play-game-design-fundamentals-0262240459-9780262240451.pdf'),
    slug: 'book_rules_of_play_salen_zimmerman',
    title: 'Rules of Play: Game Design Fundamentals',
    author: 'Katie Salen & Eric Zimmerman (MIT Press)',
    domain: 'Teoría Formal de Juegos, Elección Significativa (Meaningful Play), Círculo Mágico, Sistemas Cibernéticos e Interacción Social',
    outSubdir: 'streaming_and_overlays'
  },
  {
    path: path.join(YENDO_RAW_LIB, 'Game_Design', 'dokumen.pub_level-up-the-guide-to-great-video-game-design-1nbsped-047068867x-9780470688670.pdf'),
    slug: 'book_level_up_scott_rogers',
    title: 'Level Up! The Guide to Great Video Game Design',
    author: 'Scott Rogers',
    domain: 'Diseño de Controles, HUDs Limpios, Cámaras, Recompensas Visuales y Ritmo de Partida',
    outSubdir: 'streaming_and_overlays'
  },
  {
    path: path.join(YENDO_RAW_LIB, 'Gamificacion_y_Conducta', 'pdfcoffee.com_even-ninja-monkeys-like-to-play-andrzej-marczewski-2018-4-pdf-free.pdf'),
    slug: 'book_even_ninja_monkeys_like_to_play_marczewski',
    title: 'Even Ninja Monkeys Like to Play: Unicorn Edition',
    author: 'Andrzej Marczewski',
    domain: 'Hexad de Tipos de Jugadores (Socializers, Free Spirits, Achievers, Philanthropists, Players, Disruptors) y Gamificación',
    outSubdir: 'streaming_and_overlays'
  },
  {
    path: path.join(YENDO_RAW_LIB, 'Gamificacion_y_Conducta', 'dokumen.pub_the-gamification-revolution-how-leaders-leverage-game-mechanics-to-crush-the-competition-9780071808323-0071808329-9780071808316-0071808310.pdf'),
    slug: 'book_gamification_revolution_zichermann',
    title: 'The Gamification Revolution',
    author: 'Gabe Zichermann & Joselin Linder',
    domain: 'Modelo SAPS (Status, Access, Power, Stuff), Loops de Compromiso y Fidelización de Comunidades',
    outSubdir: 'streaming_and_overlays'
  },
  {
    path: path.join(YENDO_RAW_LIB, 'Psicologia_y_Habitos', 'Mihaly-Csikszentmihalyi-Flow.pdf'),
    slug: 'book_flow_mihaly_csikszentmihalyi',
    title: 'Flow: The Psychology of Optimal Experience',
    author: 'Mihaly Csikszentmihalyi',
    domain: 'Canal de Flow (Equilibrio entre Desafío y Habilidad), Metas Claras, Feedback Inmediato e Inmersión Total',
    outSubdir: 'ui_ux_design'
  },
  {
    path: path.join(YENDO_RAW_LIB, 'Economia_Conductual', 'dokumen.pub_predictably-irrational-the-hidden-forces-that-shape-our-decisions-revised-and-expanded-edition-9780061353246-0061353248.pdf'),
    slug: 'book_predictably_irrational_dan_ariely',
    title: 'Predictably Irrational: The Hidden Forces That Shape Our Decisions',
    author: 'Dan Ariely',
    domain: 'Psicología del Costo Cero ($0 Entry), Anclaje Cognitivo, Relatividad de Recompensas y Toma de Decisiones',
    outSubdir: 'ui_ux_design'
  },
  {
    path: path.join(YENDO_RAW_LIB, 'Ingenieria_y_Arquitectura', 'Domain-Driven-Design-Eric-Evans.pdf'),
    slug: 'book_domain_driven_design_eric_evans',
    title: 'Domain-Driven Design: Tackling Complexity in the Heart of Software',
    author: 'Eric Evans',
    domain: 'Lenguaje Ubicuo, Bounded Contexts, Entidades, Objetos de Valor, Agregados y Eventos de Dominio',
    outSubdir: 'architecture_and_books'
  },
  {
    path: path.join(YENDO_RAW_LIB, 'Ingenieria_y_Arquitectura', 'Eloquent Javascript_ A Modern Introduction to Programming ( PDFDrive ).pdf'),
    slug: 'book_eloquent_javascript_marijn_haverbeke',
    title: 'Eloquent JavaScript: A Modern Introduction to Programming',
    author: 'Marijn Haverbeke',
    domain: 'Dominio Profundo de JavaScript Moderno, DOM, Eventos, Canvas 2D, Asincronía y Arquitectura Modular',
    outSubdir: 'architecture_and_books'
  }
];

async function runMigration() {
  console.log('🚀 [LA GRAN MUDANZA] Starting Software Factory Multi-Vault Migration...');
  const centinelaIndex = buildFileIndex(CENTINELA_KNOWLEDGE);
  const yendoIndex = buildFileIndex(YENDO_KNOWLEDGE);

  let migratedMarkdownCount = 0;
  let extractedBooksCount = 0;

  // Phase 1: Migrate pre-converted files from Centinela Studio
  console.log('\n📦 [Phase 1] Migrating books, courses & papers from Centinela Studio...');
  for (const item of CENTINELA_MIGRATIONS) {
    const srcPath = centinelaIndex.get(item.file);
    if (!srcPath || !fs.existsSync(srcPath)) {
      console.warn(`  ⚠️ Missing in Centinela: ${item.file}`);
      continue;
    }
    const targetDir = path.join(KNOWLEDGE_DIR, item.targetSubdir);
    fs.mkdirSync(targetDir, { recursive: true });
    const destName = item.outName || item.file;
    const destPath = path.join(targetDir, destName);

    let raw = fs.readFileSync(srcPath, 'utf8');
    // Cap ultra-huge single files at 420 KB so MiniSearch stays <35ms on HP 250 G8
    if (raw.length > 420_000) {
      raw = raw.slice(0, 420_000) + '\n\n---\n> *[Truncated at 420 KB for optimal local RAG indexing speed]*\n';
    }
    const anchored = sanitizeAndAnchorMarkdown(raw, item.scope, 'Centinela Studio Vault');
    fs.writeFileSync(destPath, anchored, 'utf8');
    migratedMarkdownCount++;
    console.log(`  ✓ Migrated: ${item.targetSubdir}/${destName}`);
  }

  // Phase 2: Migrate curated treatises & video masterclasses from Yendo Mobile
  console.log('\n🧠 [Phase 2] Migrating UI/UX, Motion, Psychology, Cyber & Architecture treatises from Yendo Mobile...');
  for (const item of YENDO_MIGRATIONS) {
    let srcPath = yendoIndex.get(item.file);
    if (!srcPath && item.fallbackMatch) {
      for (const [k, v] of yendoIndex.entries()) {
        if (k.includes(item.fallbackMatch)) {
          srcPath = v;
          break;
        }
      }
    }
    if (!srcPath || !fs.existsSync(srcPath)) {
      console.warn(`  ⚠️ Missing in Yendo Mobile: ${item.file}`);
      continue;
    }
    const targetDir = path.join(KNOWLEDGE_DIR, item.targetSubdir);
    fs.mkdirSync(targetDir, { recursive: true });
    const destName = item.outName || item.file;
    const destPath = path.join(targetDir, destName);

    const raw = fs.readFileSync(srcPath, 'utf8');
    const anchored = sanitizeAndAnchorMarkdown(raw, item.scope, 'Yendo Mobile Vault');
    fs.writeFileSync(destPath, anchored, 'utf8');
    migratedMarkdownCount++;
    console.log(`  ✓ Migrated: ${item.targetSubdir}/${destName}`);
  }

  // Phase 3: Extract Raw PDF Books
  console.log('\n📚 [Phase 3] Extracting raw PDF books from Downloads, Desktop & Yendo Raw Library...');
  for (const book of RAW_BOOKS_TO_EXTRACT) {
    const outDir = path.join(KNOWLEDGE_DIR, book.outSubdir);
    const outPath = path.join(outDir, `${book.slug}.md`);

    if (!fs.existsSync(book.path)) {
      console.warn(`  ⚠️ PDF not found: ${book.path}`);
      continue;
    }

    try {
      const res = await ingestBookToMarkdown({
        filePath: book.path,
        title: book.title,
        author: book.author,
        domain: book.domain,
        slug: book.slug,
        outDir,
        maxChars: 340_000
      });
      extractedBooksCount++;
      console.log(`  ✓ Extracted PDF Book: ${book.outSubdir}/${book.slug}.md (${res.sizeKb} KB, ${res.numPages} pages, ${res.sectionsCount} sections)`);
    } catch (err) {
      console.warn(`  ⚠️ Failed extracting ${path.basename(book.path)}: ${err.message}`);
    }
  }

  console.log(`\n🎉 [LA GRAN MUDANZA COMPLETE]`);
  console.log(`   - Migrated & Sanitized Treatises/Courses/Books: ${migratedMarkdownCount}`);
  console.log(`   - Newly Extracted Raw PDF Books: ${extractedBooksCount}`);
  console.log(`   - Total New Knowledge Artifacts Added: ${migratedMarkdownCount + extractedBooksCount}`);
}

runMigration().catch((err) => {
  console.error('❌ [MIGRATION ERROR]:', err);
  process.exit(1);
});
