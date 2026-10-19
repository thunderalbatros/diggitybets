**Alcance:** Patrones de diseño de enjambres de agentes, enrutamiento semántico y memoria episódica. (Fuente migrada y curada desde Centinela Studio Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

---
version: 1.0.0
tipo: research
tags:
  - yendo-mobile
  - architecture
  - en-progreso
autores: [RESEARCHER_AGENT, MANAGER_AGENT]
ultima_revision: 2026-08-27
---

# IA Agéntica y Orquestación de Equipos de Agentes (2026)

Canon operativo para el flujo de desarrollo de Yendo en Antigravity / Cursor. No sustituye [[YENDO_DNA]] ni [[YENDO_LIBRARY]]; traduce evidencia externa a contratos que ya gobernamos (SPOC, squads, `tools/`, bóveda RAG).

> [!info] Insight crítico
> Un LLM suelto es «un cerebro en un frasco». El valor aparece cuando hay **herramientas**, **memoria selectiva**, **orquestador** y **barreras fuera del prompt** (IAM, RLS, HITL). Fuente: Software Mansion (sep. 2025) y Computerworld / Bill Doerrfeld (abr. 2026).

---

## 1. Qué es un agente (definición operativa)

Un agente planifica, llama herramientas, mantiene memoria de corrida y (opcional) memoria de largo plazo. Las herramientas son funciones con contrato claro; el modelo decide cuándo invocarlas. El RAG inyecta contexto documental, no sustituye el razonamiento.

Cita (Software Mansion): *«LLMs are an amazing technology, but a plain model is just like a brain in a jar, unable to interact with the environment around it.»* — https://swmansion.com/blog/the-best-ai-agent-frameworks-5aea3d8c5d93/

Cita (Shopify / Computerworld): *«El término “agente” se refiere a sistemas de IA que pueden realizar acciones en nombre de los usuarios, no solo generar texto.»* — Andrew McNamara, https://www.computerworld.es/article/4164939/buenas-practicas-para-crear-sistemas-de-agentes-de-ia.html

En Yendo eso ya existe: `tools/scrapers/*`, `tools/multimedia/*`, `tools/bots/telegram_bot.js` son el cuerpo; `.knowledge/` es la memoria larga; `.agents/MANAGER.md` es el cerebro orquestador.

---

## 2. Arquitectura de un sistema agentivo (bloques)

Computerworld (Doerrfeld, 2026) descompone el sistema en: modelo de razonamiento, contexto/datos, herramientas (MCP), flujos documentados, orquestación multiagente, seguridad/autorización, puntos de control humanos, evaluación y observabilidad.

Cita (AIrrived / Computerworld): *«Crear sistemas de agentes requiere una arquitectura fundamentalmente nueva, diseñada para la autonomía, no solo para la automatización. Los agentes necesitan un entorno de ejecución, un cerebro, manos, memoria y barreras de seguridad.»*

Cita (Akamai / Computerworld): *«Crear un agente de IA es como construir un sistema nervioso.»*

Mapeo a Yendo:

| Bloque corporativo | Equivalente Yendo |
| --- | --- |
| Cerebro / runtime | [[MANAGER]] + [[Vertex AI]] Gemini 2.5 (`tools/lib/agentRuntime.js`, SA `yendo-worker`) |
| Manos / tools | `tools/` (Serper, Places, Vertex embeddings, Cheerio, YouTube, Groq STT, Telegraf) |
| Memoria corta | Contexto de turno + archivos abiertos |
| Memoria larga | Bóveda Obsidian `.knowledge/` + [[YENDO_LIBRARY]] |
| Orquestación | 6 squads + CREATIVE_STUDIO on-demand |
| Guardrails | RLS `(select auth.uid())`, Dunbar 4–6 en SQL, Filtro Guardián YAML |
| HITL | CTO humano + Telegram + prohibición de push/commit no pedido |
| Observabilidad | `.knowledge/agent_outbox/` y `historial_enviado/` |

EffectiveSoft (2026) lista los mismos bloques a nivel de framework: runtime, memoria, planning, tool interface, LLM layer, task orchestration, multi-agent comms, event system, monitoring. https://www.effectivesoft.com/blog/top-frameworks-for-building-ai-agents.html

---

## 3. Orquestador vs enjambre

Video IBM *Orchestrator Agents & MCP* (https://www.youtube.com/watch?v=Ons1Fv3IE4U), transcripción absorbida por `investigar_video.js`:

1. Selección de agentes
2. Coordinación de flujo
3. Intercambio de datos / contexto en tiempo real
4. Aprendizaje continuo (el agente «mira atrás» y refleja)

Citas del video (síntesis histórica de subtítulos; motor actual: Vertex Gemini 2.5):

- *«Orchestrator agents are basically like a nervous system for AI tools.»*
- *«MCP has been described by some as kind of like a USB-C port for AI applications.»*
- *«The orchestrator keeps the agents in the multi-agent system updated in real time.»*
- *«Instead of supervising them yourself, bring in that supervisor agent so you can take a break.»*

> [!warning] Fricción detectada
> Shopify recomienda **evitar multiagente en fases tempranas** y preferir un agente con herramientas de bajo nivel; entre 20 y 50 tools el modelo pierde el límite. CrewAI (roles/crews) escala mal sin control de flujo. LangGraph (grafos con estado, HITL, aristas condicionales) es el patrón de producción. Fuentes: Computerworld + Software Mansion + EffectiveSoft.

Implicación Antigravity: **no aplanar** los 6 squads en un swarm autónomo. Mantener [[MANAGER]] como SPOC. Activar un squad solo con divulgación progresiva (el invariante ya está en `.agents/MANAGER.md`). Codificar lo determinista (SQL `join_group_atomic`, clamp Dunbar) y reservar el LLM para lo adaptativo (investigación, copy, diagnóstico).

---

## 4. Mejores prácticas corporativas 2026 (trianguladas)

### Jitterbit — 5 prácticas para operacionalizar

Fuente: https://www.jitterbit.com/es/blog/5-best-practices-to-operationalize-agentic-ai/

1. Empezar por un caso **pequeño, de alto impacto** (no «agentificar» todo).
2. Distinguir **agentes** (autonomía de workflow) vs **asistentes** (guiar al humano).
3. Diseñar **colaboración humano-IA**, no autonomía total.
4. Infraestructura **segura, gobernada y escalable** (RBAC, auditoría, MCP, anti vendor-lock).
5. Tratar a cada agente como **nuevo miembro del equipo**: rol, entrenamiento con datos propios, KPIs, feedback.

### Computerworld — manual de arquitectura

- No todo debe ser agentificado. MCP + LLM para lo novedoso; código para lo repetible y de seguridad estricta.
- Guardrails en **IAM/políticas**, no solo en el system prompt. *«Las barreras de seguridad deben estar en las políticas y la configuración de gestión de identidades y accesos, no solo en las instrucciones de la línea de comandos.»* — Anusha Kovi (Amazon).
- *«Ya no se protege software que sugiere, se protege software que actúa.»* — Anurag Gurtu.
- Shopify y Block: puertas humanas antes de tocar producción o dinero.
- Contexto justo a tiempo: *«Los sistemas de agentes no necesitan más datos, necesitan los datos correctos en el momento adecuado.»* — Edgar Kussberg (Sonar).
- Observabilidad desde el día 1: prompts, tool calls, decisiones intermedias, artefactos.
- Evaluar agentes como sistemas regulados (sandbox + simulaciones). Menos de la mitad de las orgs reportan impacto medible (Alteryx vía Computerworld).

### Software Mansion — cómo elegir framework

Criterios: ease of use, complejidad de tarea, comunidad, latencia, tokens, escala, integración, privacidad.

Escala de control (simple → estricto): RelevanceAI → smolagents → PhiData → LangChain → LlamaIndex (RAG) → CrewAI (roles) → **LangGraph** (grafos + LangSmith).

Regla de oro de SM: *si una tarea se repite, hardcodearla en el grafo; no dejar que el agente la redescubra cada vez.* Encaja con `INV_WAR_ON_MONOLITHS` y con SQL SECURITY DEFINER.

Stack mobile adyacente (mismo vendor, core RN): Web UI / Vanilla & Modern Frontend ExecuTorch, Web UI / Vanilla & Modern Frontend RAG on-device, Private Mind. Icebox para Yendo: el RAG canónico hoy es archivo + Obsidian, no on-device LLM.

---

## 5. Frameworks y Web UI / Vanilla & Modern Frontend (lo que sí / no adoptar)

| Framework | Uso corporativo 2026 | Veredicto Yendo |
| --- | --- | --- |
| LangGraph | Multiagente con estado, HITL, retries | Patrón conceptual del MANAGER (grafo de squads). No instalar Python en el app. |
| CrewAI | Crews por rol; 40% Fortune 500 (claim EffectiveSoft) | Analogía de squads; no runtime en el teléfono. |
| AutoGen | Enterprise event-driven | Fuera de alcance móvil. |
| LlamaIndex | RAG documental | Equivalente: bóveda `.knowledge/` + Filtro Guardián. |
| OpenAI Swarm | Educativo, sin memoria larga | No producción. |
| Web UI / Vanilla & Modern Frontend RAG / ExecuTorch (Software Mansion) | LLM on-device | Icebox post-MVP; no sustituye PostGIS ni GoTrue. |

La segunda búsqueda Serper («Frameworks multi-agente desarrollo mobile Web UI / Vanilla & Modern Frontend») contaminó resultados con *multiplataforma* (Kotlin, Flutter, Uno). La señal útil fue Software Mansion: agentes y RAG **junto a** Web UI / Vanilla & Modern Frontend, no un framework de agentes *dentro* de Web Platform.

---

## 6. Aplicación directa al flujo Antigravity de Yendo

### 6.1 Mantener el orquestador único

[[MANAGER]] = agente supervisor IBM. Los squads son subagentes con mandato y veto (LEAD_ARCHITECT en CORE). CREATIVE_STUDIO solo on-demand. Esto reduce tokens y latencia (SM: más control → menos pasos redundantes).

### 6.2 Catálogo MCP-like de `tools/`

Tratar cada script como tool con schema:

- `buscar_web.js` — descubrimiento (Serper)
- `leer_url.js` — lectura profunda
- `investigar_video.js` — subtítulos YouTube + síntesis Vertex Gemini 2.5 (`callVertexAI`)
- `telegram_bot.js` — HITL y despacho de artefactos
- `escuchar_audio.js` — voz del CTO (Groq Whisper; no Cloud Speech)
- `lib/agentRuntime.js` — razonamiento de squads via Vertex Gemini 2.5
- `lib/vertexEmbeddings.js` — memoria semántica 384d → [[pgvector]]
- `pipelines/ingesta_venues_caba.js` — Places New + auditor Vertex

Prohibido que un agente «invente» una tool que no esté en `tools/`. Eso es el USB-C del video IBM.

### 6.3 Contexto justo a tiempo (Shopify)

No cargar las 6 biblias de squad + Library + DNA en cada turno. Protocolo ya declarado: leer MANAGER, luego el squad pertinente, luego DNA/Library. El Filtro Guardián evita notas huérfanas; no es un dump de 50k tokens.

### 6.4 Determinista vs adaptativo

- **Determinista (código/SQL):** `join_group_atomic`, RLS, `createMMKV()`, un solo `createClient`, tabs `lazy` + unmount de mapa/3D.
- **Adaptativo (agentes):** investigación, síntesis RAG, copy rioplatense, diagnóstico de UX.

Kilcommins (Jentic / Computerworld): documentar capacidades legibles por máquina; no improvisar workflows de seguridad.

### 6.5 HITL y Zero Trust

Toda acción que mute producción (migración SQL remota, push, OAuth dashboard) requiere al CTO. Los agentes escriben migraciones y outbox; no aplican secretos. Alineado con Block/Shopify y con `INV_ZERO_TRUST_SECURITY`.

### 6.6 Observabilidad

Cada corrida de investigación debe dejar: Search_*.md, Lectura_*.md, Video_Analysis_*.md, canon, Update_* outbox. Eso es LangSmith artesanal. El bot de Telegram es el canal de artefactos, no un segundo orquestador.

### 6.7 Primer caso de alto impacto (Jitterbit #1)

Validado en esta sesión: el pipeline web → URL → video → bóveda → Telegram **funciona**. Próximo caso pequeño: no un swarm LangGraph en producción; sí un índice MCP interno de tools + métrica de «qué squad se activó» en cada outbox.

### 6.8 Lenguaje ubicuo y ética

Los agentes de producto no optimizan dwell time. [[YENDO_DNA]] (`ETHICAL_ALGORITHMS`) y Library (philia, Terceros Lugares, Dunbar) mandan sobre cualquier framework externo. Un crew de marketing que maximice retención en pantalla queda vetado.

---

## 7. Consenso RESEARCHER_AGENT (3 niveles)

1. 🔴 **Fricción:** Equipos corporativos compran «multiagente» y obtienen chatbots sin estado, saturación de contexto y cero ROI (Alteryx vía Computerworld).
2. 🧠 **Diagnóstico:** Paradoja de la elección + generalista sin orquestador. El cerebro social (Lieberman / Library) y el Liking Gap no se resuelven con más tools; se resuelven con un supervisor, especialistas y HITL.
3. 💡 **Oportunidad Yendo:** Doble capa — (A) **fábrica de desarrollo** = MANAGER + squads + `tools/` como ya está; endurecer JIT context, catálogo de tools y outbox. (B) **producto** = Carpincho como catalizador social, no como LLM generalista en el teléfono.

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[MANAGER]]
- [[Número de Dunbar]]
- [[Supabase]]
- [[Zustand]]
- [[Capybara]]
- [[Terceros Lugares]]
- [[PostGIS]]
- [[Capybara Mascot]]
- [[Vertex AI]]
- [[GCP_ServiceAccount_Worker_Integracion]]
