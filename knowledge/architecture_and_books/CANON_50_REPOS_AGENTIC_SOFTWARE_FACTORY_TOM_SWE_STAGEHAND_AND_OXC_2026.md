# CANON: Arquitectura de Software Factory Agéntica (50 Repositorios SOTA, ToM-SWE, Stagehand, Browserbase UI-Test y Oxc Rust Toolchain — 2026)

**Alcance:** Aplicable a toda la arquitectura de la Software Factory Agéntica de HuntHub / DiggityBets (`site/`, `worker/index.js`, `core/`, `overlay-*`, `wheel-*`, `tools/intelligence/`, `tools/audit/`, `.agents/skills/`, `memory/`). Define la topología de 3 estratos, el pipeline autónomo de 5 fases, el modelado mental de 3 niveles (`ToM-SWE`), la verificación adversarial guiada por diffs (`ui-test` + `Stagehand`), el linting en Rust en `<50ms` (`oxlint`) y el catálogo maestro de 50 repositorios open-source organizados en 7 capas operativas bajo restricción estricta de hardware ligero (HP 250 G8, 0 Docker, USD 0).

---

## 1. Fundamentos Científicos y Fuentes Primarias de Alta Confiabilidad (Papers, Libros, Documentación Oficial y Cursos)

1. **Paper Seminal (ICLR 2026 — CMU & All-Hands-AI)**: *TOM-SWE: User Mental Modeling For Software Engineering Agents* (*Xuhui Zhou, Valerie Chen, Zora Zhiruo Wang, Graham Neubig, Maarten Sap, Xingyao Wang*) `[VERIFICADO: references/software-factory-50/ToM-SWE, 2026-10-20]`:
   - Demuestra por qué los agentes que alcanzan **73% en SWE-bench Verified** (entornos cerrados con especificaciones explícitas) caen al **~20% en problemas reales abiertos y ambiguos**: carecen de un modelo explícito del estado mental, intenciones implícitas y restricciones arquitectónicas del usuario/CTO.
   - Introduce una arquitectura dual (`SWE Agent` + `ToM Agent`) respaldada por una **Memoria Jerárquica de 3 Niveles (Three-Tier Memory)**:
     - **Tier 1 (`cleaned_sessions` / `cleaned_signals`)**: Interacciones crudas depuradas con señales de preferencia inyectadas y verificadas (`session_washer`).
     - **Tier 2 (`session_analyses`)**: Análisis estructurado por sesión (`intent`, `emotions`, `user_modeling_summary`, `session_tldr`, `per_message_analysis`).
     - **Tier 3 (`user_profiles` / `overall_user_model.json`)**: Perfil agregado del CTO (`interactional_preferences`, `coding_and_architectural_preferences`, invariantes marcados con `[IMPORTANT]`), consolidado mediante **Sleeptime Compute** (`sleeptime_compute.jinja2`).
2. **Paper Seminal (NeurIPS / Princeton NLP)**: *SWE-agent: Agent-Computer Interfaces (ACI) Enable Automated Software Engineering* (*John Yang, Carlos E. Jimenez, Alexander Wettig, Kilian Lieret, Shunyu Yao, Karthik Narasimhan, Ofir Press*) `[VERIFICADO: references/software-factory/SWE-agent, 2026-10-20]`:
   - Formaliza el diseño de **Interfaces Agente-Computadora (ACI)**: en lugar de exponer shells bash crudos que inundan la ventana de contexto con miles de líneas, el harness provee comandos acotados, guardrails sintácticos inmediatos y mapas de repositorio paginados.
3. **Paper Seminal (ICLR 2025)**: *OpenHands: An Open Platform for AI Software Developers as Generalist Agents* (*Xingyao Wang et al.*) y `OpenHands/software-agent-sdk` `[VERIFICADO: references/software-factory-50/software-agent-sdk, 2026-10-20]`:
   - Separa el runtime agéntico en flujos de eventos deterministas (`Action` $\rightarrow$ `Observation`) desacoplados de interfaces pesadas.
4. **Especificación Oficial**: *Model Context Protocol (MCP) v2 Spec & TypeScript SDK* (*Anthropic / Model Context Protocol Organization*) `[VERIFICADO: references/software-factory-50/mcp-typescript-sdk, 2026-10-20]`:
   - Estandariza transporte bidireccional por streaming, *controlled sampling* (permitiendo a un servidor MCP solicitar inferencia acotada con presupuesto de tokens) y suscripciones en vivo a cambios de archivos/recursos.
5. **Documentación Oficial & Repositorios de Verificación Visual**: *Stagehand v1.5 (`browserbase/stagehand`)* y *Browserbase Agentic Skills (`browserbase/skills`: `ui-test`, `webmcp-gen`, `optimize-agent-prompt`)* `[VERIFICADO: references/software-factory-50/stagehand & browserbase-skills, 2026-10-20]`:
   - Combina Playwright determinista con primitivas semánticas (`act()`, `extract()`, `observe()`), **caché de selectores con auto-curación (Self-Healing DOM Cache)** y el protocolo de **Testing Adversarial Guiado por Diff (`ui-test`)** basado en 3 rondas de planificación (*Round 1: Functional*, *Round 2: Adversarial*, *Round 3: Coverage Gaps*) y marcadores deterministas `STEP_PASS|<id>|<evidence>` y `STEP_FAIL|<id>|<expected> -> <actual>|<screenshot>`.
6. **Documentación Oficial de Toolchains en Rust**: *Oxc (`oxc-project/oxc`, `oxlint v1.89.0`, `oxc-resolver`)* y *Biome (`biomejs/biome`)* `[VERIFICADO: tools/audit/node_modules/.bin/oxlint, 2026-10-20]`:
   - Analizadores AST escritos en Rust con asignación en arena (*Arena Allocation*) que ejecutan análisis estático y validación de imports en **`<50ms` a `120ms`** sin demonios residentes en memoria, protegiendo la RAM de la notebook HP 250 G8.
7. **Libros Canónicos Enlazados en Omni-RAG v5**:
   - *Software Engineering at Google* (*Titus Winters*), *Team Topologies* (*Skelton & Pais*), *A Philosophy of Software Design* (*John Ousterhout*), *Patterns of Enterprise Application Architecture* (*Martin Fowler*), *Growing Object-Oriented Software, Guided by Tests* (*Freeman & Pryce*), *Designing Data-Intensive Applications* (*Martin Kleppmann*) y *AI Engineering* (*Chip Huyen*).

---

## 2. Topología Industrial de 3 Estratos (Harness $\rightarrow$ Framework $\rightarrow$ Platform)

Para evitar el caos de scripts sueltos, nuestra Software Factory organiza sus capacidades en tres estratos ortogonales:

| Estrato | Nombre Arquitectónico | Función Principal | Implementación en HuntHub (`streamerbot`) |
| :--- | :--- | :--- | :--- |
| **Estrato 1** | **Agent Harnesses & ACI** | Interfaz Agente-Computadora, mapas de repositorio AST, edición quirúrgica de diffs y modos por rol (*Architect / Code / Test*). | `Aider` repo-map patterns, `SWE-agent` ACI, `Roo-Code` role modes, `tools/intelligence/code_and_wiki_graph.mjs`. |
| **Estrato 2** | **Workflows, Memory & Theory of Mind** | Orquestación por grafos deterministas, modelado mental del CTO en 3 niveles (`ToM-SWE`), instintos temporales y *Speculative RAG*. | `tools/intelligence/tom_swe_engine.mjs`, `memory/tom_swe_model.json`, `tools/intelligence/instincts_engine.mjs`, `tools/intelligence/factory_sweep.mjs`. |
| **Estrato 3** | **Sandboxes, MCP, Rust Toolchains & Adversarial QA** | Aislamiento en Git Worktrees, inyección de docs vía MCP (`Context7` / `Omni-RAG v5`), linting en Rust (`oxlint`) y caza adversarial de bugs UI (`ui-test` + `Stagehand`). | `tools/audit/diff_ui_adversarial.mjs`, `memory/selector_cache.json`, `tools/audit/visual_regression.mjs`, `tools/intelligence/mcp_omni_rag_server.mjs`. |

---

## 3. Pipeline E2E Autónomo de 5 Fases (Adaptado a HP 250 G8 Zero-Docker)

```
[Fase 1: Ingesta, Diseño & ToM-SWE]
   │  ToM-SWE 3-Tier Consultation + W3C DTCG Tokens + MarkItDown
   ▼
[Fase 2: Sandbox Worktree & Contexto Estructural]
   │  Git Worktree + CodeGraphContext AST + Context7 / Omni-RAG v5 SQLite FTS5
   ▼
[Fase 3: Generación Full-Stack & Rust AST Gate (<50ms)]
   │  Surgical Diffs + Cloudflare Workers/D1 + Oxc (oxlint v1.89.0) + Valibot
   ▼
[Fase 4: QA Visual, Stagehand Self-Healing & UI-Test Adversarial]
   │  Playwright + Pixelmatch + Stagehand Selector Cache + Diff-UI Adversarial
   ▼
[Fase 5: Gobernanza Quirúrgica de Rutas & Despliegue Edge]
      Surgical Path Gate (worker/, auth-oauth.js) + CDN _headers + D1 Sync
```

### Detalle de las 5 Fases Operativas
1. **Fase 1 — Ingesta, Diseño y Consulta `ToM-SWE`**:
   - Antes de escribir código, el agente consulta `consultTomSwe(query)` (`tools/intelligence/tom_swe_engine.mjs`), verificando claridad (`ClarityAssessment`) e inyectando las preferencias `[IMPORTANT]` del Nivel 3 (`memory/tom_swe_model.json`).
   - Documentos externos o PDFs se convierten a Markdown estructurado (`markitdown` / `book_pdf_ingester.mjs`) y los tokens visuales respetan el estándar `W3C DTCG` (`OKLCH` + `APCA` + presupuesto cromático `90/8/2`).
2. **Fase 2 — Sandbox Ligero y Contexto Estructural**:
   - En lugar de contenedores Docker pesados, usamos **Git Worktrees efímeros** (`agent-worktree` / `sandboxed-experiments`).
   - El contexto se ensambla combinando el grafo AST de llamadas (`CodeGraphContext` / `code_and_wiki_graph.mjs`), documentación actualizada (`upstash/context7` / `idosal/git-mcp`) y nuestro motor local **Omni-RAG v5 (`SQLite FTS5` en C + `MiniSearch` + `Ragas P@3`)**.
3. **Fase 3 — Generación Full-Stack y Linting en Rust (`Oxc` / `oxlint`)**:
   - Los cambios se aplican mediante diffs quirúrgicos atómicos (`<=300` líneas).
   - El backend en el borde (`worker/index.js`) utiliza patrones de `Hono` + `hono/middleware` + validación de esquemas `Valibot` y sincronización transaccional con **Cloudflare D1 (`kv_store`)**.
   - Cada modificación pasa por **`oxlint v1.89.0`** (`oxc-project/oxc`) en ~110ms con cero demonios en segundo plano.
4. **Fase 4 — QA Visual Determinista, Auto-Curación `Stagehand` y Caza Adversarial `ui-test`**:
   - `tools/audit/diff_ui_adversarial.mjs` inspecciona el `git diff`, valida la salud de los selectores DOM primarios y de respaldo (*Self-Healing Selector Cache* en `memory/selector_cache.json` inspirado en `browserbase/stagehand`), verifica la ausencia total de usuarios de prueba (`hunthub_demo_users_purged_live_v4`) y audita el circuito de celebración sincronizada (`announceStreamWinner` + `overlay-celebration` 1920x1080 + `/api/kick/chat/announce`).
   - `tools/audit/visual_regression.mjs` ejecuta comparación pixel-a-píxel con `Playwright` + `Pixelmatch` en el *Component Testbench Sandbox* (`site/testbench.html`).
5. **Fase 5 — Gobernanza Quirúrgica Basada en Rutas y Despliegue Edge**:
   - **Política de Revisión Quirúrgica Basada en Rutas (Surgical Path-Based Review Gate)**: Cualquier cambio en rutas sensibles (`worker/index.js`, `site/js/auth-oauth.js`, `wrangler.toml`, `.mcp.json`, `constitution_guard.mjs`) exige validación explícita de invariantes de seguridad (`isAuthorizedAdmin`, firma RSA de webhooks, CSP/HSTS en `dist/_headers`).

---

## 4. Catálogo Maestro de los 50 Repositorios SOTA en 7 Capas Operativas

### Capa 1: Harnesses de Agentes y Orquestación (Repos #1–#10)
1. **`OpenHands/OpenHands`**: Plataforma estándar para agentes de desarrollo de software basados en flujos de eventos (`references/software-factory/OpenHands`).
2. **`OpenHands/software-agent-sdk`**: SDK modular desacoplado de la interfaz web y de Docker para ejecutar agentes headless (`references/software-factory-50/software-agent-sdk`).
3. **`OpenHands/ToM-SWE`**: Modelado de Teoría de la Mente con memoria jerárquica de 3 niveles (`Tier 1: cleaned_signals`, `Tier 2: session_analyses`, `Tier 3: overall_user_model`) y *Sleeptime Compute* (`references/software-factory-50/ToM-SWE` + `tools/intelligence/tom_swe_engine.mjs`).
4. **`Aider-AI/aider`**: Edición quirúrgica en Git con mapa estructural del repositorio (*Repo Map*) para minimizar el consumo de tokens (`references/software-factory/aider`).
5. **`SWE-agent/SWE-agent`**: Creador del paradigma *Agent-Computer Interface (ACI)* de la Universidad de Princeton (`references/software-factory/SWE-agent`).
6. **`RooVetGit/Roo-Code`**: Harness autónomo multimodal con modos especializados (*Architect*, *Code*, *Test*, *Debug*) y soporte MCP nativo.
7. **`block/goose`**: Agente local extensible mediante servidores MCP para automatización de builds y diagnósticos (`references/bleeding-edge/agents-mcp/goose`).
8. **`mastra-ai/mastra`**: Framework TypeScript para grafos de flujo de trabajo deterministas, handoffs entre agentes y trazas OpenTelemetry.
9. **`langgenius/dify`**: Orquestación visual LLMOps y pipelines RAG empresariales (referencia arquitectónica).
10. **`n8n-io/n8n`**: Automatización de flujos híbridos y webhooks externos (integrado vía MCP `yendo-rag`).

### Capa 2: Protocolo MCP e Inteligencia de Contexto Estructural (Repos #11–#19)
11. **`modelcontextprotocol/servers`**: Servidores MCP oficiales de referencia (`filesystem`, `git`, `fetch`, `memory`) (`references/factory-expansion/agents/mcp-official-servers`).
12. **`modelcontextprotocol/typescript-sdk`**: SDK oficial TypeScript para MCP v2 con soporte de streaming bidireccional y *sampling* (`references/software-factory-50/mcp-typescript-sdk`).
13. **`modelcontextprotocol/rust-sdk`**: SDK de ultra-baja latencia en Rust para servidores MCP críticos.
14. **`github/github-mcp-server`**: Servidor MCP oficial de GitHub para gestión de ramas, commits, issues y PRs (activo en Antigravity).
15. **`upstash/context7`**: Servidor MCP que inyecta documentación oficial actualizada en tiempo real, erradicando alucinaciones de APIs deprecadas (`references/software-factory-50/context7`).
16. **`idosal/git-mcp`**: Servidor MCP para lectura estructurada de documentación y código de cualquier repositorio Git remoto (`references/software-factory-50/git-mcp`).
17. **`microsoft/markitdown`**: Conversor universal de PDFs, Office e imágenes a Markdown limpio para ingesta en RAG (`references/software-factory-50/markitdown`).
18. **`Shashankss1205/CodeGraphContext`**: Indexador AST Tree-sitter que construye el grafo de símbolos, llamadas y dependencias (`references/software-factory-50/CodeGraphContext`).
19. **`sooperset/mcp-atlassian`**: Conector MCP para lectura/escritura de tickets Jira y páginas Confluence.

### Capa 3: Diseño UI/UX y Generación Frontend (Repos #20–#26)
20. **`penpot/penpot`**: Plataforma de diseño open-source basada en estándares web (SVG/CSS Grid) con servidor MCP nativo.
21. **`penpot/penpot-plugin-starter-template`**: Plantilla oficial para sincronizar Design Tokens programáticamente entre diseño y repositorio.
22. **`penpot/penpot-files`**: Bibliotecas de sistemas de diseño y componentes estandarizados.
23. **`shadcn-ui/ui`**: Componentes UI accesibles (Radix + Tailwind) con código fuente directamente en el proyecto (`references/ui-craft/shadcn-ui`).
24. **`tailwindlabs/tailwindcss`**: Motor CSS v4 con configuración `@theme` nativa en CSS y compilación en microsegundos.
25. **`e2b-dev/fragments`**: Plantillas de generación iterativa de interfaces web mediante JSON-streaming estructurado (`references/software-factory-50/e2b-fragments`).
26. **`antvis/mcp-server-chart`**: Servidor MCP generador de más de 25 tipos de diagramas y gráficos de telemetría.

### Capa 4: Frameworks Full-Stack y Toolchains en Rust (Repos #27–#34)
27. **`honojs/hono`**: Framework web ultraligero (`<12KB`) basado en Web Standards para Cloudflare Workers con cliente RPC `@hono/hc` (`references/repos/hono`).
28. **`honojs/middleware`**: Colección oficial de middlewares de seguridad, CORS, rate-limiting y validación con Valibot/Zod (`references/software-factory-50/hono-middleware`).
29. **`trpc/trpc`**: Contratos RPC tipados extremo a extremo sin pasos de generación de código.
30. **`drizzle-team/drizzle-orm`**: ORM TypeScript declarativo y determinista para SQLite/D1 y PostgreSQL (`references/factory-expansion/cloudflare-edge/drizzle-orm`).
31. **`crystaldba/postgres-mcp`**: Servidor MCP de inspección de planes `EXPLAIN`, salud de índices y tuning SQL.
32. **`biomejs/biome`**: Toolchain unificada en Rust para formateo y linting con diagnósticos ricos para agentes.
33. **`oxc-project/oxc` (`oxlint v1.89.0`)**: Parser y linter AST en Rust (`<50ms`–`120ms`) instalado en `tools/audit` y enlazado en nuestra compuerta `diff_ui_adversarial.mjs` (`references/factory-expansion/web-core/oxc`).
34. **`oxc-project/oxc-resolver`**: Resolución ultrarrápida de módulos ES/CommonJS/TS en Rust para prevenir imports rotos (`references/software-factory-50/oxc-resolver`).

### Capa 5: Automatización de Navegador y QA Adversarial (Repos #35–#40)
35. **`microsoft/playwright`**: Motor determinista multi-navegador para pruebas E2E, auditoría CDP 60-FPS y snapshots visuales (`tools/audit`).
36. **`microsoft/playwright-mcp`**: Servidor MCP que expone el árbol de accesibilidad (`aria-snapshot`) del navegador al agente (`references/sota-2026/agent-evolution/playwright-mcp`).
37. **`browserbase/stagehand`**: Framework híbrido Playwright + primitivas agénticas (`act()`, `extract()`, `observe()`) con caché de selectores y auto-curación ante cambios de DOM (`references/software-factory-50/stagehand` + `memory/selector_cache.json`).
38. **`browser-use/browser-use`**: Navegación web agéntica mediante etiquetado visual de elementos interactivos del DOM.
39. **`browserbase/skills` (`ui-test` & `webmcp-gen`)**: Suite de skills agénticas de Browserbase que incluye `ui-test` (revisor adversarial guiado por `git diff` con planificación en 3 rondas y marcadores `STEP_PASS`/`STEP_FAIL`), `webmcp-gen` (compilador de herramientas WebMCP en vivo) y `optimize-agent-prompt` (`references/software-factory-50/browserbase-skills` + `.agents/skills/ui-test`).
40. **`browserless/browserless`**: Gestión de sesiones headless Chromium concurrentes con evasión de bloqueos.

### Capa 6: Memoria Semántica, Bases Vectoriales e Inferencia (Repos #41–#45)
41. **`pgvector/pgvector`**: Búsqueda vectorial transaccional HNSW y `halfvec` dentro de PostgreSQL.
42. **`qdrant/qdrant`**: Motor vectorial en Rust con cuantización para memoria semántica de código (`references/factory-expansion/agents/mcp-server-qdrant`).
43. **`infiniflow/ragflow`**: Extracción documental profunda con trazabilidad exacta de citas para auditoría de especificaciones.
44. **`ollama/ollama`**: Ejecución local de LLMs (nota: excluido en la notebook HP 250 G8 por regla estricta de cero servidores LLM locales pesados; sustituido por inferencia en la nube gratuita/caché de contexto y motores locales SQLite FTS5 + ONNX Q8).
45. **`deepseek-ai/DeepSeek-V3`**: Modelo de pesos abiertos de frontera para síntesis y razonamiento de código.

### Capa 7: Sandboxing, CI/CD Programable y Despliegue PaaS (Repos #46–#50)
46. **`e2b-dev/E2B`**: Sandboxes en la nube con microVMs Firecracker de arranque en `~150ms` (`references/software-factory/E2B`).
47. **`devcontainers/cli`**: Aprovisionamiento reproducible de entornos de desarrollo mediante `devcontainer.json`.
48. **`dagger/dagger`**: Pipelines CI/CD programables como código tipado con caché por contenido y trazas OpenTelemetry.
49. **`nektos/act`**: Ejecución local de workflows de GitHub Actions antes del `git push`.
50. **`coollabsio/coolify`**: PaaS auto-alojable con preview deployments por Pull Request y servidor MCP oficial (en HuntHub operamos sobre Cloudflare Workers + D1 Edge 100% Free Tier).

---

## 5. Gobernanza y Mitigación de los 3 Riesgos Críticos de una Software Factory

1. **Riesgo 1: Degradación Silenciosa de Arquitectura y Regresiones de UI**
   - *Mitigación Activa*: **Revisión Quirúrgica Basada en Rutas (`surgical-path-worker-security`)** + **Testing Adversarial Guiado por Diff (`tools/audit/diff_ui_adversarial.mjs`)**. Ningún cambio en `worker/index.js`, `site/js/admin-hub.js` o en las 8 overlays de OBS pasa sin verificar `11/11` marcadores `STEP_PASS` (`Stagehand` selector cache + `oxlint` Rust AST + invariantes de stream en vivo).
2. **Riesgo 2: Desalineación con las Intenciones Implícitas del CTO (Brecha SWE-bench 73% vs. 20%)**
   - *Mitigación Activa*: **Motor `ToM-SWE` de 3 Niveles (`tools/intelligence/tom_swe_engine.mjs` + `memory/tom_swe_model.json`)**. Antes de ejecutar tareas complejas o ambiguas, el Escuadrón 0 y el Escuadrón 9 consultan el modelo mental de 3 niveles y ejecutan *Sleeptime Compute* para preservar las preferencias del CTO sin contaminar la ventana de contexto.
3. **Riesgo 3: Saturación de CPU/RAM en Hardware Ligero (HP 250 G8)**
   - *Mitigación Activa*: Sustitución de demonios pesados (Docker, ESLint daemon, Ollama) por binarios nativos en Rust y C de ejecución instantánea (**`oxlint v1.89.0` en `111ms`**, **`SQLite FTS5` en `<5ms`**, **`esbuild` en `<150ms`**) y aislamiento mediante **Git Worktrees**.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #architecture_and_books
