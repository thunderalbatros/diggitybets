# HuntHub & DiggityBets — Índice Maestro de Base de Conocimiento (Diátaxis & LEC-015)

**Alcance:** Aplicable a HuntHub / DiggityBets (Web Platform en `site/`, Overlays OBS en `overlay-*` y `wheel-*`, Backend Edge en `worker/index.js` y `core/src/index.ts`, Herramientas de Inteligencia en `tools/intelligence/`). Prohibido aplicar patrones de React Native / Expo (`Yendo Mobile`) o integraciones deprecadas (`Rainbet`).

> **Protocolo LEC-015:** Todo documento en `knowledge/` debe estar registrado en este índice bajo una de las 4 categorías Diátaxis (**Tutoriales**, **Guías Cómo-Hacer**, **Referencia Técnica**, **Explicación / Libros Canónicos**) y poseer ancla de alcance explícita.

---

## 1. Explicación y Tratados Canónicos (Libros Completos & Teoría Fundamental)

### 1.1 Gamificación, Psicología del Juego, CRO y Marketing de Streams
- [CANON_GAMIFICATION_PSYCHOLOGY_CRO_AND_STREAM_MARKETING_2026.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/architecture_and_books/CANON_GAMIFICATION_PSYCHOLOGY_CRO_AND_STREAM_MARKETING_2026.md) — Octalysis (8 Core Drives), Ciclo Hooked, Aversión a la Pérdida, Cialdini, Bounties B2B para proveedoras y CRO del código `DIGGITYBETS`.
- [actionable_gamification.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/actionable_gamification.md) — *Actionable Gamification* (Yu-kai Chou, texto completo 844 KB).
- [hooked_habit_forming.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/architecture_and_books/hooked_habit_forming.md) — *Hooked: How to Build Habit-Forming Products* (Nir Eyal, texto completo 290 KB).
- [nudge_thaler_sunstein.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/architecture_and_books/nudge_thaler_sunstein.md) — *Nudge* (Richard Thaler & Cass Sunstein, texto completo 663 KB).
- [laws_of_ux_using_psychology_to_design_better_.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/ui_ux_design/laws_of_ux_using_psychology_to_design_better_.md) — *Laws of UX* (Jon Yablonski, texto completo 265 KB).
- [designing_with_the_mind_in_mind.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/ui_ux_design/designing_with_the_mind_in_mind.md) — *Designing with the Mind in Mind* (Jeff Johnson, texto completo 361 KB).

### 1.2 Juegos Interactivos en Vivo para Kick.com, Streaming y Overlays OBS
- [CANON_LIVE_INTERACTIVE_STREAM_GAMES_AND_CROWD_PLAY_2026.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/streaming_and_overlays/CANON_LIVE_INTERACTIVE_STREAM_GAMES_AND_CROWD_PLAY_2026.md) — Arquitectura Dual-Channel (Chat Kick + Portal Web), Crowd Mines, Live Crash, KOTH 8-Bracket, Bonus Hunt Predictor, Bounties y cumplimiento Kick ToS.
- [KWS_EDGE_AUDIO_STREAMING_SOTA.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/streaming_and_overlays/KWS_EDGE_AUDIO_STREAMING_SOTA.md) — Sincronización Edge y WebAudio de baja latencia para streams.
- [websockets_masterclass_hussein_nasser.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/streaming_and_overlays/websockets_masterclass_hussein_nasser.md) — Curso completo de WebSockets y arquitecturas bidireccionales en tiempo real.

### 1.3 Diseño UI/UX Minimalista, Tipografía, Layout y Rendimiento Web
- [DESIGN_MASTERY_2026.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/DESIGN_MASTERY_2026.md) — Regla cromática 90/8/2, jerarquía de luminancia y diseño de lujo oscuro.
- [CANON_EVERY_LAYOUT_CSS_ALGORITHMS.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/ui_ux_design/CANON_EVERY_LAYOUT_CSS_ALGORITHMS.md) — Primitivas algorítmicas CSS (`Stack`, `Cluster`, `Sidebar`, `Grid`).
- [CANON_STAKE_CHALLENGES_BOUNTY_SYSTEM_AND_FAST_MEDIA_PIPELINE_2026.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/ui_ux_design/CANON_STAKE_CHALLENGES_BOUNTY_SYSTEM_AND_FAST_MEDIA_PIPELINE_2026.md) — Arquitectura visual y técnica de la sección Bounties *Only on Stake*.
- [CANON_UX_HUMAN_EXPERIENCE_ACCESSIBILITY_2026.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/ui_ux_design/CANON_UX_HUMAN_EXPERIENCE_ACCESSIBILITY_2026.md) — Accesibilidad WCAG 2.1 AA / APCA y ergonomía táctil.
- [CANON_BOOK_DESIGNING_FOR_PERFORMANCE_LARA_HOGAN.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/ui_ux_design/CANON_BOOK_DESIGNING_FOR_PERFORMANCE_LARA_HOGAN.md) — Optimización de imágenes, fuentes y presupuesto de rendimiento.
- [next_gen_css_una_kravets_chrome_devs.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/ui_ux_design/next_gen_css_una_kravets_chrome_devs.md) — Especificaciones CSS modernas (`@property`, `@starting-style`, `content-visibility`, Container Queries).

### 1.4 Animaciones a 60 FPS, Shaders 2D/3D y Síntesis WebAudio
- [CANON_EMIL_KOWALSKI_ANIMATIONS_ON_THE_WEB.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/motion_and_animation/CANON_EMIL_KOWALSKI_ANIMATIONS_ON_THE_WEB.md) — Curvas spring/bezier, escala de entrada `0.95 -> 1`, interrupción suave y presupuesto de fotograma (`16.6ms`).
- [CANON_2D_3D_GRAPHICS_SHADERS_AND_AESTHETICS_2026.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/motion_and_animation/CANON_2D_3D_GRAPHICS_SHADERS_AND_AESTHETICS_2026.md) — Shaders GLSL, SDF, iluminación especular y GPU compositing.
- [CANON_HOLO_SHADERS_3D_PACK_CHOREOGRAPHY_AND_WEBAUDIO_SFX_2026.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/motion_and_animation/CANON_HOLO_SHADERS_3D_PACK_CHOREOGRAPHY_AND_WEBAUDIO_SFX_2026.md) — Coreografía de cartas, levitación láser y audio procedural `ZzFX` / WebAudio.
- [CANON_GAME_FEEL_VIRTUAL_SENSATION_SWINK.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/motion_and_animation/CANON_GAME_FEEL_VIRTUAL_SENSATION_SWINK.md) — Respuesta táctil instantánea y pulido de micro-interacciones.

### 1.5 Ciberseguridad, Anti-Fraude y Arquitectura de Sistemas / Agentes
- [CANON_CYBERSECURITY_DEVSECOPS_2026.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/cybersecurity/CANON_CYBERSECURITY_DEVSECOPS_2026.md) — OWASP ASVS, CSP, TrustedTypes, DOMPurify, OAuth 2.1 PKCE y protección de secretos.
- [CYBERSECURITY_MASTER_PROTOCOL.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/cybersecurity/CYBERSECURITY_MASTER_PROTOCOL.md) — Protocolo de blindaje de endpoints, webhooks RSA y límites de tasa.
- [ANTI_BOT_STEALTH_GUIDE.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/cybersecurity/ANTI_BOT_STEALTH_GUIDE.md) — Huella `ThumbmarkJS`, Cloudflare Turnstile y detección de granjas de bots.
- [designing_data_intensive_applications.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/architecture_and_books/designing_data_intensive_applications.md) — *Designing Data-Intensive Applications* (Martin Kleppmann, 1.45 MB).
- [clean_architecture.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/architecture_and_books/clean_architecture.md) — *Clean Architecture* (Robert C. Martin, 543 KB).
- [the_pragmatic_programmer.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/architecture_and_books/the_pragmatic_programmer.md) — *The Pragmatic Programmer* (Hunt & Thomas, 606 KB).
- [pro_typescript.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/architecture_and_books/pro_typescript.md) — *Pro TypeScript* (Steve Fenton, 672 KB).
- [system_design_interview_vol_2.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/architecture_and_books/system_design_interview_vol_2.md) — *System Design Interview Vol 2* (Alex Xu, 295 KB).
- [CURATED_MASTER_BOOKS_COURSES_AND_DOCS_CATALOG_2026.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/architecture_and_books/CURATED_MASTER_BOOKS_COURSES_AND_DOCS_CATALOG_2026.md) — Catálogo maestro de libros ingeridos, videocursos gratuitos y lista priorizada de libros comerciales para adquirir.

---

## 2. Referencia Técnica (Contratos de API, Catálogos de Slots y Repositorios)

- [KICK_API_REFERENCE.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/KICK_API_REFERENCE.md) — Endpoints oficiales de Kick API v1, OAuth 2.1 PKCE y eventos Pusher/Webhook.
- [POPULAR_SLOTS_ONLY_ON_STAKE_TIERS.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/POPULAR_SLOTS_ONLY_ON_STAKE_TIERS.md) — Catálogo de proveedoras y slots exclusivas *Only on Stake* clasificadas en Tiers 1 a 6.
- [REPOSITORIES_INTELLIGENCE_REPORT_2026.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/REPOSITORIES_INTELLIGENCE_REPORT_2026.md) — Mapa de repositorios open-source clonados en `references/`.
- [UI_RECIPES_CATALOG.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/UI_RECIPES_CATALOG.md) — Recetas de componentes UI listos para producción.
- [GIVEAWAY_STRATEGIES.md](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/GIVEAWAY_STRATEGIES.md) — Mecánicas de sorteos transparentes Commit-Reveal.
