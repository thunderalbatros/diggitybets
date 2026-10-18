# REPOSITORIOS DE REFERENCIA — Suite de engagement para Kick (HuntHub)

> Para: Manager y squads de Antigravity. Ubicación sugerida en el proyecto: `research/REFERENCE_REPOS.md`.
> Búsqueda realizada el 12–13/10/2026. Estados: **V** = verificado en esa búsqueda · **G** = conocimiento general, el squad de Investigación debe verificar licencia, vigencia y ruta exacta antes de usarlo.

## Reglas de uso (obligatorias)
1. **Fuente de verdad:** documentación oficial de Kick y su Swagger. Si un SDK contradice la documentación, gana la documentación.
2. **Leer y reescribir, no pegar.** Si se copia código MIT/ISC/Apache, conservar el aviso en `THIRD_PARTY_NOTICES.md` y registrar la dependencia en `COST_AUDIT.md`.
3. Antes de adoptar algo: abrir el repo, confirmar licencia (archivo LICENSE), fecha del último commit, issues abiertos y que no esté deprecado.
4. **Modo:** `DEP` = candidato a dependencia · `REF` = solo referencia de diseño/código · `NO` = no adoptar (motivo indicado).
5. Prohibido adoptar cualquier librería que autentique con secretos OTP/cookies del sitio de Kick o que esquive protecciones de Kick (regla 3.4 del brief).
6. Para cualquier alternativa a lo listado: ADR en `docs/adr/`.

---

## 1. Kick: documentación oficial y enlace con kick.com

| Repo / paquete | Para qué sirve | Licencia | Estado | Modo |
|---|---|---|---|---|
| **KickEngineering/KickDevDocs** | Docs oficiales de la API pública; issues de bugs y pedidos; roadmap público (GitHub Projects). Incluye el issue #300 (webhooks de chat intermitentes). | verificar | V | REF (fuente de verdad) |
| **api.kick.com/swagger/doc.yaml** | Especificación OpenAPI de la API pública (según KickMCP; confirmar URL). No es un repo. | n/a | V (indirecto) | REF |
| **phxgg/kick.js** | SDK TypeScript (`@phxgg/kick.js`, en `packages/kick.js`) + app de ejemplo Express con manejo de webhooks. Mejor referencia TS. | verificar | V | REF |
| **@ritamoe/kient** (npm; ruta del repo a confirmar) | Cliente TypeScript para API y webhooks. Poca adopción. | MIT | V | REF |
| **Yargitay/KickForge** (PyPI `kickforge`; ruta GitHub a confirmar) | Python: OAuth 2.1+PKCE, lector de chat por WebSocket (Pusher) **y** webhooks, bus de eventos, bot de comandos, overlays OBS en tiempo real. Modelo del `ChatSource` dual del brief. | MIT | V | REF |
| **Rubarez/KickNetLib** (NuGet) | .NET: API oficial y webhooks, verificación de firma con clave pública PEM, lista de scopes. | verificar | V | REF |
| **DapperMickie/Kick.NET** | .NET: sesiones OAuth, verificación de webhooks, sample `KickNet.BotLoginWebhookSample` (login + webhooks). Advierte que sus endpoints "experimentales" no son oficiales. | verificar | V | REF |
| **mbayou/kick4k** | Kotlin: OAuth con PKCE, receptor de webhooks, guía de OAuth/webhooks. | verificar | V | REF |
| **kick-api (crate Rust, docs.rs)** | Separa API oficial de endpoints internos; reintentos ante 429. Usa curl para esquivar huella TLS de Cloudflare → **no copiar esa parte**. | verificar | V | REF parcial |
| **NosytLabs/KickMCP** (npm `kick-mcp`) | Servidor MCP sobre la API oficial con archivo de skill; útil para que un agente explore la API. Requiere token de usuario. | verificar | V | REF opcional |
| **Maniseniler/Kick_Auth** | Express: OAuth+PKCE contra Kick (demo; necesita endurecimiento). | MIT | V | REF |
| **Riotcoke123/kick-oauth-demo-python** | Flask: login, refresh, revoke. Usa rutas `api.kick.com/v1/...` que pueden estar desactualizadas frente a `public/v1`. | verificar | V | REF (con cuidado) |
| **better-auth/better-auth** | Librería de autenticación TS con proveedor de Kick integrado. Evaluar compatibilidad con Workers. | verificar | V (proveedor) | DEP candidata |
| **pilcrowonpaper/arctic** | Clientes OAuth 2.0 (incluye Kick con PKCE). **Deprecado en julio de 2026**; su repo trae ejemplos de código para reemplazarlo. | verificar | V | **NO** como dependencia; REF de los ejemplos |
| **panva/oauth4webapi** | Cliente OAuth genérico basado en Web APIs; candidato a reemplazar a Arctic en Workers. | MIT (G) | **G** | DEP candidata |
| **retconned/kick-js** (npm `@retconned/kick-js`; ruta a confirmar) | TS: leer/escribir chat. Autentica con secreto OTP o tokens sacados del sitio. | verificar | V | **NO** (solo leer cómo modela el chat) |

**Notas de integración:** crear la app en `kick.com/settings/developer`; scopes mínimos (`user:read`, `channel:read`, `chat:write`, `events:subscribe`); webhook URL configurada en el panel de la app de Kick; verificar firma con la clave pública de Kick; embed del player vía `player.kick.com/<canal>` (documentado por un blog de terceros, verificar).

---

## 2. Backend y tiempo real (Cloudflare, gratis)

| Repo | Para qué sirve | Licencia | Estado | Modo |
|---|---|---|---|---|
| **cloudflare/workers-sdk** | Wrangler, Miniflare, `@cloudflare/vitest-pool-workers` y `fixtures/vitest-pool-workers-examples/durable-objects`. Limitación: WebSockets con DO no se soportan con aislamiento de storage por archivo → tests de WS con `wrangler dev` + Playwright. | verificar | V | DEP (herramientas) |
| **cloudflare/workers-chat-demo** | Un Durable Object por sala + WebSocket Hibernation API, en pocas centenas de líneas. | verificar | V | REF principal |
| **cloudflare/templates** | `durable-chat-template` y `multiplayer-globe-template`. | verificar | V | REF |
| **cloudflare/partykit** (PartyServer) | Framework de salas en tiempo real sobre Durable Objects (hooks de ciclo de vida, broadcast). Se declara "work in progress". | verificar | V | REF; DEP solo si un ADR lo justifica |
| **partysocket** (dentro de cloudflare/partykit) | Cliente WebSocket con reconexión automática y buffer de mensajes. Ideal para overlays de OBS. | MIT | V | **DEP candidata** |
| **honojs/hono** | Framework web para Workers, sin dependencias, con adaptador de WebSocket (`hono/cloudflare-workers`). | MIT | V | DEP candidata |
| **sveltejs/kit** → `@sveltejs/adapter-cloudflare` | Construye SvelteKit para Workers Static Assets y Pages (`adapter-cloudflare-workers` está deprecado). Ojo: exportar la clase del Durable Object desde el Worker generado por SvelteKit requiere un parche post-build (hay un ejemplo de cookbook con ese script). Decidir por ADR: SvelteKit vs. Vite+Svelte (SPA) + Worker Hono separado. | MIT (G) | V | DEP candidata |
| **Cloudflare docs MCP server** (`cloudflare-docs`) | Servidor MCP para que los agentes consulten docs de Workers. No es un repo. | n/a | V | Herramienta |

---

## 3. UI, componentes y tokens (minimalista y moderno)

| Repo | Para qué sirve | Licencia | Estado | Modo |
|---|---|---|---|---|
| **huntabyte/shadcn-svelte** | Port comunitario no oficial de shadcn/ui: componentes que se copian con CLI (no es dependencia npm). Sobre Bits UI + Tailwind. Incluye charts sobre LayerChart. | verificar | V | **DEP (CLI)** |
| **huntabyte/bits-ui** | Primitivos accesibles sin estilos para Svelte 5. | verificar | G | DEP (vía shadcn-svelte) |
| **tailwindlabs/tailwindcss** | Tailwind v4: configuración en CSS, colores OKLCH. | MIT (G) | V (uso) | DEP |
| **techniq/layerchart** | Gráficos Svelte 5 sobre D3 (SVG/Canvas/HTML). Sparklines y curva de P/L. | verificar | V | DEP candidata |
| **lucide-icons/lucide** → `@lucide/svelte` | Íconos para Svelte 5. Conservar aviso ISC si se redistribuyen fuentes. | ISC | V | DEP |
| **fontsource/fontsource** + **vercel/geist-font** | Geist y Geist Mono self-host (paquetes `@fontsource-variable/geist*`). | OFL-1.1 | V | DEP |
| **radix-ui/colors** | Escalas de color accesibles (grises + acentos) como base de tokens. | MIT | V | REF / DEP |
| **argyleink/open-props** | Escalas y tokens CSS (OKLCH). | verificar | G | REF |
| **code-gio/svelte-supabase** | Starter SvelteKit 5 + Tailwind v4 + shadcn con dashboard de ejemplo (trae Supabase, que no usamos). | MIT | V | REF de layout |
| **penpot/penpot** | Herramienta de diseño open source (tokens nativos, modo desarrollador gratis, plan gratis). | verificar | V | Herramienta |
| **dicebear/dicebear** + **dicebear/styles** | Placeholders de avatar/miniatura. Código MIT; cada estilo tiene su propia licencia (Initials = CC0). Usar solo estilos CC0 o degradé propio. | MIT (código) | V | DEP condicionada |
| **krisk/Fuse** | Coincidencia difusa de nombres de slots (`!slot`, `!battle`, `!tourney`). | Apache-2.0 | V (versiones previas; confirmar actual) | DEP |

---

## 4. Animación y efectos (livianos para OBS)

| Repo | Para qué sirve | Licencia | Estado | Modo |
|---|---|---|---|---|
| **sveltejs/svelte** (nativo) | `transition:`, `animate:flip`, clases `Tween` y `Spring` (CSS, no bloquean el hilo principal). | MIT (G) | V | DEP |
| **motiondivision/motion** | `animate` mini (2,3 kb, sobre Web Animations API). Funciona en Svelte 5 vía `@attach`. | MIT | V | DEP candidata |
| **barvian/number-flow** | Números animados (`@number-flow/svelte`) con `Intl.NumberFormat`. Ideal para Avg X, Req Avg, balance. | verificar | V | DEP candidata |
| **CrazyTim/spin-wheel** | Ruleta para el sorteo de espectadores. **Solo cosmética:** el ganador sale del RNG criptográfico; verificar que permita fijar el resultado de antemano. | MIT | V | DEP candidata |
| **catdad/canvas-confetti** | Cañón de partículas y confeti con soporte `OffscreenCanvas` en Web Worker (`useWorker: true`) y `disableForReducedMotion`. Clonado en `references/fx-audio-sota/canvas-confetti`. | ISC | V | **REF / DEP canónica (0% Main-Thread CPU)** |
| **simeydotme/pokemon-cards-css** | Sombreadores holográficos CSS multi-capa (`color-dodge`, `sunpillar`, `radiant-holo`, `secret-rare`, `cosmos-holo`) + física de resortes 3D sin WebGL pesado. Clonado en `references/fx-audio-sota/pokemon-cards-css`. | MIT | V | **REF canónico (Holo-Vault & Bounty Cards)** |
| **nolimits4web/atropos** | Paralaje 3D táctil multi-plano (`translate3d` por capas Z con `data-atropos-offset`, highlight especular y sombra proyectada). Clonado en `references/fx-audio-sota/atropos`. | MIT | V | **REF canónico (3D Depth Layers)** |
| **micku7zu/vanilla-tilt.js** | Motor ligero sin dependencias para inclinación 3D y cálculo de reflejo radial (`glare`). Clonado en `references/fx-audio-sota/vanilla-tilt`. | MIT | V | **REF (3D Tilt Math)** |
| **KilledByAPixel/ZzFX** + **chr15m/jsfxr** + **Tonejs/Tone.js** | Síntesis procedural WebAudio de efectos de sonido, foley metálico, rasgado de sobres, monedas FM y fanfarrias sin archivos MP3 pesados. Clonados en `references/fx-audio-sota/{zzfx,jsfxr,tonejs}`. | MIT | V | **REF canónico (`pro-fx-audio.js`)** |
| **evanw/thumbhash** | Representación ultra-compacta (`~28 bytes`) de placeholders de imágenes con relación de aspecto y canal alfa, decodificable en `<0.2ms` para cero parpadeo en portadas de slots y Bountys. Clonado en `references/fx-audio-sota/thumbhash`. | MIT | V | **REF canónico (Fast Image Pipeline)** |
| **GoogleChromeLabs/quicklink** | Prefetch inteligente de enlaces e imágenes en `requestIdleCallback` respetando `Save-Data` y tipo de conexión, complementado con Speculation Rules API. Clonado en `references/fx-audio-sota/quicklink`. | Apache-2.0 | V | **REF canónico (Instant Asset Prefetch)** |
| **formkit/auto-animate** | Transiciones FLIP automáticas a 60 FPS sobre Web Animations API (`WAAPI`) al filtrar, ordenar o insertar tarjetas en grillas como `#bounties`. Clonado en `references/fx-audio-sota/auto-animate`. | MIT | V | **REF canónico (60 FPS Grid FLIP)** |
| **darkroomengineering/lenis** | Inercia suave y sincronización de scroll con `requestAnimationFrame` y `IntersectionObserver` sin secuestrar el scroll nativo. Clonado en `references/fx-audio-sota/lenis`. | MIT | V | **REF (Smooth Scroll & Viewport Sync)** |
| **GSAP** | Gratis incluso con plugins, pero con licencia propia (no OSS; restringe uso en herramientas que compitan con Webflow y puede darse de baja). | propietaria | V | **NO** (regla 3.1) |

---

## 5. Torneos y bracket

| Repo | Para qué sirve | Licencia | Estado | Modo |
|---|---|---|---|---|
| **Drarig29/brackets-model**, **brackets-manager.js**, **brackets-viewer.js** | Modelo de datos, gestión (incluye eliminación simple) y visor de brackets en JS vanilla, con temas por variables CSS, i18n y nombres de ronda personalizables ("Cuartos", "Semis", "Final"). | ISC | V | REF del modelo de datos y del visual. Para 8 jugadores (7 llaves) la lógica es trivial: preferir implementación propia y probada; usar el visor solo si entra en el presupuesto de 150 KB. |

---

## 6. Overlays de OBS y panel de control

| Repo | Aporte | Licencia | Estado | Modo |
|---|---|---|---|---|
| **CodingWithPak/obs-newsdesk** | Un solo HTML como browser source; animaciones como función del tiempo (robustas ante recargas de OBS). | MIT | V | REF |
| **zebadrabbit/Anomalist** | Panel con roles y presets de escena; usa Docker → solo ideas de UX. | MIT | V | REF |
| **aoe4world/overlay** | Overlays por URL personalizada con parámetro de tema; consejos de configuración en OBS. | verificar | V | REF |
| **FourthwallHQ/fourthwall-examples** (`examples/streaming-alerts`) | Transporte SSE hacia un browser source; OBS concede audio automáticamente. | verificar | V | REF |
| **luckofthelefty/LuckyBotReleases** | Documenta una CSP contra ataques por mensajes de chat en browser sources (confirmar si el código es público). | verificar | V (wiki) | REF de seguridad |
| **JCode-gh/stream-countdown-timer** | Overlay Vue 3 con parámetros por URL (fondo transparente, tema) y consejos de rendimiento. | verificar | V | REF menor |

---

## 7. Calidad: pruebas, accesibilidad, seguridad

| Repo | Para qué sirve | Licencia | Estado | Modo |
|---|---|---|---|---|
| **microsoft/playwright** | E2E, `toHaveScreenshot()` (regresión visual), capturas 1920×1080 / 1280×720 / 390×844. | Apache-2.0 (G) | V (uso) | DEP dev |
| **dequelabs/axe-core** + `@axe-core/playwright` | Auditoría WCAG automática. | MPL-2.0 (G) | V (uso) | DEP dev |
| **vitest-dev/vitest** | Tests unitarios y de dominio. | MIT (G) | G | DEP dev |
| **dubzzz/fast-check** | Pruebas por propiedades (parser de guess, sorteos, bracket). | MIT (G) | G | DEP dev |
| **gitleaks/gitleaks** | Escaneo de secretos antes de cada commit. | MIT (G) | G | Herramienta |
| **statelyai/xstate** | Máquinas de estado (opcional; se pueden escribir a mano). | MIT (G) | G | DEP opcional |

---

## 8. Skills y herramientas de diseño para los agentes (formato SKILL.md abierto)

| Repo / herramienta | Para qué sirve | Estado | Nota |
|---|---|---|---|
| **anthropics/skills** (`frontend-design`, `canvas-design`) | Skills de diseño de interfaces. | V | Verificar licencia de cada skill. |
| **vercel-labs/web-design-guidelines**, **vercel-labs/agent-skills** | Guías de diseño web como skill. | V | Verificar licencia. |
| **openai/frontend-skill** | Skill para landing pages y apps visualmente sólidas. | V | Verificar licencia. |
| **sickn33/antigravity-awesome-skills** | Colección de 1.500+ skills; advierte que activar demasiadas satura el contexto. | V | Instalar solo 2–3 de diseño + 1 de Svelte 5. |
| **CLI `npx skills`** (`vercel-labs/skills`; ruta a confirmar) | Instala skills en la carpeta de skills de Antigravity (`.agent/skills/`). | V | Confirmar carpeta de tu versión (`.agent/` o `.agents/`). |
| **davideast/stitch-mcp** (npm `@_davideast/stitch-mcp`) | Puente MCP entre Google Stitch y Antigravity. Stitch es gratis con límites en Google Labs y puede cambiar o discontinuarse. | V | Acelerador opcional, no dependencia. |

---

## 9. Harnesses de Agentes, Scaffolding, Evals y Seguridad 2026

> Cacería de repositorios de arneses agénticos (18/10/2026). Todos evaluados bajo restricción USD 0, cero Docker local permanente y compatibilidad Windows / Node.js.

| Repo | Para qué sirve | Licencia | Estado | Modo |
|---|---|---|---|---|
| **UKGovernmentBEIS/inspect_ai** | Framework de alta seguridad del UK AISI para evaluación rigurosa de LLMs, ejecución de herramientas y sandboxing. | MIT | V | REF / TOOL |
| **promptfoo/promptfoo** | CLI ligero Node/TS para evaluación determinista de prompts, red-teaming de seguridad y aserciones CI/CD sin servidor. | MIT | V | **DEP dev / TOOL** |
| **princeton-nlp/SWE-bench** | Benchmark de referencia de la industria para resolver issues reales de GitHub con parches evaluados en tests. | MIT | V | REF canónico |
| **princeton-nlp/SWE-agent** | Arquitectura de bucle agéntico (~100 líneas) para navegación de archivos y ejecución de terminal. | MIT | V | REF de diseño |
| **walkinglabs/learn-harness-engineering** | Curriculum canónico de ingeniería de arneses: progressive disclosure, maker-checker y feedback loops. | MIT | V | REF canónico |
| **affaan-m/everything-claude-code** | Harness completo: instincts engine v2, delivery gates, adverse review y disciplina anti-atajos. | MIT | V | **REF / DEP** (en `.agents/`) |
| **addyosmani/agent-house** + **context-buddy** | "Lighthouse for Agents": scoring cuantitativo en Costo, Latencia, Confiabilidad e Higiene de Contexto. | MIT | V | REF (scoring base) |
| **guardrails-ai/guardrails** | Validación estructural y semántica de entradas/salidas de agentes mediante guardas programáticas. | Apache-2.0 | V | REF / TOOL |
| **mattpocock/sandcastle** | Sandboxing efímero con Git Worktrees: 0 MB daemon, 0 Docker, aislamiento perfecto en Windows. | MIT | V | **TOOL** (`sandcastle-runner.mjs`) |
| **confident-ai/deepeval** | Suite de pruebas unitarias para LLMs (G-Eval, Faithfulness, Tool Correctness). | Apache-2.0 | V | REF |
| **explodinggradients/ragas** | Evaluación de RAG Triad (Context Relevance, Faithfulness, Answer Relevancy). | Apache-2.0 | V | REF (para `eval_matrix.mjs`) |
| **langfuse/langfuse** | Trazabilidad y observabilidad agéntica de prompts, latencia y costos. | MIT / Apache-2.0 | V | REF |
| **ast-grep/ast-grep** | Linter estructural AST para auditoría de código determinista sin alucinaciones. | MIT | V | **TOOL** (`ast_guard.mjs`) |

---

## Pendientes de verificación para el squad de Investigación
- Rutas GitHub exactas: KickForge, kient, retconned/kick-js, vercel-labs/skills, davideast/stitch-mcp.
- Licencias marcadas "verificar" y las marcadas G.
- Licencia vigente de canvas-confetti (ISC vs 0BSD).
- Si `better-auth` o `panva/oauth4webapi` resuelven el login con Kick en Workers sin parches.
- Decisión por ADR: SvelteKit vs. Vite+Svelte SPA + Worker Hono para exportar el Durable Object.
- Fecha del último commit y estado de cada repo antes de adoptarlo.

