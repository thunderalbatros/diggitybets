# CANON TOKEN REDUCTION AND CONTEXT BUDGET TOOLKIT 2026

> **Alcance:** Literatura canónica de arquitectura de software, código limpio, TypeScript, validación en el Edge, sistemas distribuidos, videocursos técnicos e ingeniería de agentes IA para la Software Factory Web.

[knowledge/tools/TOKEN_REDUCTION_TOOLKIT_2026.md › TOKEN REDUCTION TOOLKIT 2026 — rtk · graphify · caveman · ponytail + prompt caching]
> **ANCLA DE ALCANCE (LEC-015):** este documento es la fuente canónica de las herramientas de
> reducción de tokens del equipo de DESARROLLO (rtk, Graphify, Caveman, Ponytail) y del prompt
> caching de Anthropic en Cline. NO es fuente de precios de VM GCP (ver `knowledge/GCP_PRICING_REFERENCE.md`),
> NO describe el runtime de Centinela (que sigue Vertex AI/Groq por DEC-005/011/018), NO trata de
> Kick API (ver skill `kick-api-contracts`) y NO sustituye al RAG Qdrant para documentación
> (`centinela_knowledge`, ver skill `kb-retrieval`). Instalado y verificado el 2026-10-08.

[knowledge/tools/TOKEN_REDUCTION_TOOLKIT_2026.md › TOKEN REDUCTION TOOLKIT 2026 — rtk · graphify · caveman · ponytail + prompt caching › Contexto: dos capas de ahorro que NO compiten]
1. **Prompt caching (Anthropic API)** — reduce el coste de los tokens de ENTRADA repetidos
   (prefijo de sistema estable). Lectura cacheada = 0.1× del precio base (−90 %); escritura
   1.25× (TTL 5 min, refrescado en cada uso). NO se activa en la consola de Anthropic: es una
   propiedad de la petición (`cache_control`), y **Cline lo envía automáticamente** cuando el
   proveedor es "Anthropic" nativo. PROHIBIDO cambiar Cline a proveedores
   OpenAI-Compatible/litellm/OpenRouter para llegar a Claude: pierden `cache_control` y el
   caching muere en silencio (verificado: GitHub cline#13667). Verificación activa:
   `npm run finops:cache-test` (requiere `ANTHROPIC_API_KEY` solo en el entorno; 2 llamadas
   idénticas a `claude-haiku-5-5` con system estático; < $0.01). Evidencia pasiva: dashboard
   de la consola (columnas "cache write 5m/1h" y "cache read").
   Regla de higiene: no editar `.clinerules/` ni `AGENTS.md` a mitad de tarea (invalida la
   caché de todo el prefijo).

2. **Reducción de tokens de TRABAJO (herramientas locales, $0)** — menos tokens que ENTRAN y
   SALEN en cada turno:

[knowledge/tools/TOKEN_REDUCTION_TOOLKIT_2026.md › TOKEN REDUCTION TOOLKIT 2026 — rtk · graphify · caveman · ponytail + prompt caching › Contexto: dos capas de ahorro que NO compiten › RTK (rtk-ai/rtk, Apache-2.0, Rust, v0.50.0 via winget `rtk-ai.rtk`)]
Proxy CLI que comprime la salida de comandos de shell (100+ filtros: git, npm, tests, ls)
antes de que entre al contexto; sobrecoste <10 ms; los comandos sin filtro pasan intactos.
Binario: `%LOCALAPPDATA%\Microsoft\WinGet\Packages\rtk-ai.rtk_...\rtk.exe` (reabrir terminal
para el alias). Uso: **prefijar todo comando con `rtk`** (`rtk git status`, `rtk npm test`);
`rtk proxy <cmd>` = sin filtrar; `RTK_DISABLED=1 <cmd>` = saltarlo una vez; `rtk gain` =
ahorro acumulado. Regla del agente en `.clinerules/04-rtk.md` (generada por `rtk init --agent
cline`, fusionada a mano porque `.clinerules` es carpeta). Nota honesta del proyecto: los
"-60-90 %" son sobre la SALIDA de los comandos, no sobre la factura total (los propios
autores lo aclaran; cuentan tokens como bytes/4).

[knowledge/tools/TOKEN_REDUCTION_TOOLKIT_2026.md › TOKEN REDUCTION TOOLKIT 2026 — rtk · graphify · caveman · ponytail + prompt caching › Contexto: dos capas de ahorro que NO compiten › Graphify (Graphify-Labs/graphify, Apache-2.0/MIT, Python via uv, v2026-10)]
Convierte el codebase en un GRAFO DE CONOCIMIENTO consultable (AST tree-sitter, 100 %
determinístico y offline para código; $0). Grafo construido: `graphify-out/` con 10.590
nodos, 12.754 aristas, 527 comunidades. **Regla para el agente: consultar el grafo ANTES de
grep o de "explorar el repo"** — sustituye lecturas masivas por consultas con presupuesto de
tokens (default 2000). Comandos: `graphify query "<pregunta>"`, `graphify explain "X"`,
`graphify path "A" "B"`, `graphify affected "X"` (impacto inverso), `graphify god-nodes`
(hubs arquitectónicos). MCP registrado en Cline como server `graphify`
(`graphify-mcp.exe <ruta absoluta a graph.json>`). Regenerar tras refactors grandes:
`graphify update .` (code-only, sin LLM). `graphify-out/` está en `.clineignore`: el grafo
se CONSULTA, jamás se lee entero (y así no invalida el prompt caching). NO usar
`graphify install` sin revisión HITL: escribe en AGENTS.md/configs de plataformas.

[knowledge/tools/TOKEN_REDUCTION_TOOLKIT_2026.md › TOKEN REDUCTION TOOLKIT 2026 — rtk · graphify · caveman · ponytail + prompt caching › Contexto: dos capas de ahorro que NO compiten › Caveman (JuliusBrussee/caveman, Apache-2.0, npm `@caveman-ai/cli` v2.1.0)]
Dos piezas: (a) **skill** de estilo terso ON-DEMAND (instalada en
`.clinerules/skills/caveman/SKILL.md`): activar con `/caveman` o "modo breve" SOLO para
resumir logs/artefactos internos (−35 % tokens de salida en ese modo); **NUNCA para
reportes a Tomás**, que exigen el formato pedagógico de 5 bloques (constitución §6).
(b) CLI local (`caveman run -- <cmd>`, `caveman status`); el proxy de tráfico
(`caveman setup --install`) NO está instalado: es para agentes CLI (claude/codex) y queda
como decisión HITL opcional. **Telemetría DESACTIVADA** (`caveman telemetry off`,
verificado; opt-out registrado). Requiere Node 22.13+ (tenemos 24.21).

[knowledge/tools/TOKEN_REDUCTION_TOOLKIT_2026.md › TOKEN REDUCTION TOOLKIT 2026 — rtk · graphify · caveman · ponytail + prompt caching › Contexto: dos capas de ahorro que NO compiten › Ponytail (DietrichGebert/ponytail, MIT)]
Ruleset SIEMPRE ACTIVO (instalado como `.clinerules/05-ponytail.md`, 32 líneas, copia
exacta de su AGENTS.md): modo "senior dev perezoso" — el mínimo código completo, reusar
helpers existentes, no añadir dependencias por 3 líneas, borrar > añadir, sin abstracciones
anticipadas. Automática una unidad de trabajo menor por tarea (menos tokens de salida y de
revisión). **Sus límites duros conviven con los nuestros:** jamás recorta validación,
manejo de errores, seguridad ni tests de lógica con ramas/dinero/seguridad — y las puertas
locales (`verify` 9/9, suite vitest, `bench` ≤20 %) prevalecen sobre cualquier optimización.
Claims propios del repo (45 % menos tokens, 26 % menos coste en 39 tareas con Opus) son
auto-reportados: tratarlos como orientativos, medir con `rtk gain` + consola Anthropic.

[knowledge/tools/TOKEN_REDUCTION_TOOLKIT_2026.md › TOKEN REDUCTION TOOLKIT 2026 — rtk · graphify · caveman · ponytail + prompt caching › Interacción con el prompt caching]
Las 4 herramientas REDUCEN tokens (salen menos cosas al contexto); el caching abarata los
que se repiten. Ninguna toca `cache_control`. Único cuidado: no leer archivos generados
grandes (`graphify-out/graph.html`, JSONL) — ya cubierto por `.clineignore`.

[knowledge/tools/TOKEN_REDUCTION_TOOLKIT_2026.md › TOKEN REDUCTION TOOLKIT 2026 — rtk · graphify · caveman · ponytail + prompt caching › Pendientes HITL registrados]
- `ANTHROPIC_API_KEY` en el entorno → correr `npm run finops:cache-test` (evidencia activa).
- Key de Anthropic dedicada (`cline-centinela`) + límite mensual + alertas 50/80 % en consola.
- Opcional: proxy de Caveman (`caveman setup --install`) y `graphify install` — solo con revisión.