# CANON HARNESS ENGINEERING INTEGRAL 2026

> **Alcance:** Literatura canónica de arquitectura de software, código limpio, TypeScript, validación en el Edge, sistemas distribuidos, videocursos técnicos e ingeniería de agentes IA para la Software Factory Web.

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md]
<!-- CANON_FOUNDATION_FROM_YENDO: CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md -->
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

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › CANON INTEGRAL: HARNESS ENGINEERING PARA EL EQUIPO DE AGENTES YENDO (SOTA 2026)]
> **Fuentes primarias sintetizadas:**
> - Anthropic Engineering: "Effective Harnesses for Long-Running Agents" (Nov 2025) + "Harness Design for Long-Running Application Development"
> - OpenAI: "Harness Engineering: Leveraging Codex in an Agent-First World"
> - Martin Fowler (Birgitta Bockeler, Thoughtworks): "Harness Engineering for Coding Agent Users" (Abril 2026)
> - WalkingLabs: "Learn Harness Engineering" — Curso Open Source (14 lecciones)
> - GitHub: "awesome-harness-engineering" (ai-boost)
> - arXiv:2605.23950: "Stop Comparing LLM Agents Without Disclosing the Harness"

---

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › CANON INTEGRAL: HARNESS ENGINEERING PARA EL EQUIPO DE AGENTES YENDO (SOTA 2026) › 1. DEFINICION CANONICA: QUE ES UN HARNESS DE AGENTE]
El **Agent Harness** (arnes de agente) es el conjunto de software, protocolos, restricciones e infraestructura que rodea a un modelo LLM para convertirlo en un agente autonomo confiable y observable.

**Metafora maestra:** Si el LLM es el cerebro (inteligencia pura), el Harness es el cuerpo completo — el esqueleto que le da estructura, el sistema nervioso que conecta sensores, los musculos que ejecutan acciones, el sistema inmunologico que rechaza acciones peligrosas, y el sistema circulatorio que mantiene el contexto vivo entre sesiones.

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › CANON INTEGRAL: HARNESS ENGINEERING PARA EL EQUIPO DE AGENTES YENDO (SOTA 2026) › 1. DEFINICION CANONICA: QUE ES UN HARNESS DE AGENTE › 1.1 La Distincion Epistemologica Fundamental]
| Dimension | Prompt Engineering | Context Engineering | Harness Engineering |
|---|---|---|---|
| **Alcance** | El texto de la instruccion | El paquete de informacion inyectada | Todo el entorno de ejecucion |
| **Objetivo** | Mejor respuesta en un turno | Mejor comprension del contexto | Comportamiento confiable a lo largo del tiempo |
| **Control** | Frases, tokens | Documentos, RAG, memoria | Tools, sandboxes, loops, evaluadores |
| **Analogia** | Dar instrucciones a un empleado | Darle el manual de la empresa | Disenar el ambiente de trabajo completo |

> **Regla de Oro (arXiv:2605.23950):** "Nunca se evalua un modelo aislado; siempre se evalua la combinacion indisoluble de [Modelo + Harness]. Un modelo inferior en un Harness superior supera holgadamente a un modelo de frontera en un Harness deficiente."

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › CANON INTEGRAL: HARNESS ENGINEERING PARA EL EQUIPO DE AGENTES YENDO (SOTA 2026) › 1. DEFINICION CANONICA: QUE ES UN HARNESS DE AGENTE › 1.2 Formalismo H = {E, T, C, S, L, V}]
De la literatura academica sobre agentes LLM, el harness se formaliza como una tupla de 6 componentes:

```
H = {E, T, C, S, L, V}
```

| Componente | Nombre | Descripcion |
|---|---|---|
| **E** | Execution Loop | Bucle observe-think-act (ReAct, Reflexion, Plan-and-Solve) |
| **T** | Tool Registry | Registro tipado de herramientas disponibles (via MCP u otro contrato) |
| **C** | Context Manager | Gestion de contexto: compresion, retrieval JIT, ventana deslizante |
| **S** | State Store | Persistencia de estado entre sesiones (progress files, git, DB) |
| **L** | Lifecycle Hooks | Init, session-start, clean-state-check, session-end, teardown |
| **V** | Evaluation Interface | Sensores de feedback: tests, linters, graders, LLM-as-a-judge |

---

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › CANON INTEGRAL: HARNESS ENGINEERING PARA EL EQUIPO DE AGENTES YENDO (SOTA 2026) › 2. EL PROBLEMA CENTRAL: AGENTES DE LARGA DURACION › 2.1 Por que fallan los agentes sin harness (Anthropic, Nov 2025)]
Anthropic identifico dos patrones de falla criticos al ejecutar Claude Opus 4.5 sin un harness disenado:

**Falla Tipo A — "One-Shot Overreach":**
- El agente intenta completar TODO el proyecto en una sola sesion
- Al agotar el contexto en mitad de la implementacion, deja features a medio implementar
- La siguiente sesion gasta tiempo adivinando el estado del proyecto

**Falla Tipo B — "Premature Victory Declaration":**
- Agentes posteriores ven progreso realizado y declaran el trabajo terminado
- Marcan features como completas sin verificacion end-to-end real
- Acumulan deuda tecnica silenciosa

**Solucion documentada por Anthropic:** Sistema de dos agentes especializados:
1. **Initializer Agent** — Configura el entorno en la primera sesion
2. **Coding Agent** — Hace progreso incremental en sesiones subsecuentes

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › CANON INTEGRAL: HARNESS ENGINEERING PARA EL EQUIPO DE AGENTES YENDO (SOTA 2026) › 2. EL PROBLEMA CENTRAL: AGENTES DE LARGA DURACION › 2.2 Los 4 Artefactos del Harness de Larga Duracion (Anthropic)]
```
Sesion 1 (Initializer):
- init.sh          -> Script para arrancar el servidor de desarrollo
- features.json    -> Lista completa de features con estado {passes: false}
- PROGRESS.md      -> Notas de progreso legibles para el agente
- git commit       -> Estado inicial del repositorio

Sesiones N+1 (Coding Agent):
1. Lee git log para entender que se hizo
2. Lee PROGRESS.md para contexto narrativo
3. Lee features.json para elegir que feature implementar
4. Corre init.sh para verificar que el ambiente funciona
5. Implementa UNA sola feature
6. Verifica end-to-end (browser automation, Maestro, etc.)
7. Actualiza features.json -> {passes: true}
8. Git commit descriptivo
9. Actualiza PROGRESS.md
```

---

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › CANON INTEGRAL: HARNESS ENGINEERING PARA EL EQUIPO DE AGENTES YENDO (SOTA 2026) › 3. ANATOMIA DE UN HARNESS MODERNO (Martin Fowler / Birgitta Bockeler) › 3.1 El Marco Feedforward + Feedback]
El articulo de Martinfowler.com (Abril 2026) introduce el modelo Feedforward + Feedback:

```
THE STEERING LOOP

FEEDFORWARD GUIDES (Anticipatory Context):
- LSP hints
- API specs
- Type defs
- Arch rules
- AGENTS.md

LLM genera codigo

FEEDBACK SENSORS (Computational Signals):
- Linters (ESLint)
- TypeScript tsc
- Unit tests
- Mutation tests
- Structural tests

Si FAIL: Auto-fix o HITL
Si PASS: Continua
```

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › CANON INTEGRAL: HARNESS ENGINEERING PARA EL EQUIPO DE AGENTES YENDO (SOTA 2026) › 3. ANATOMIA DE UN HARNESS MODERNO (Martin Fowler / Birgitta Bockeler) › 3.2 Las Tres Categorias de Harness (Fowler)]
**1. Maintainability Harness**
- Verifica calidad del codigo: formato, naming conventions, complejidad
- Tools: ESLint, Prettier, complexity analyzers, AST parsers
- Sensor tipo: Determinista / Computacional (Capa 1)

**2. Architecture Fitness Harness**
- Verifica que el codigo cumple con decisiones arquitectonicas (ADRs)
- Tools: Dependency-cruiser, ArchUnit, modulos prohibidos, circular imports
- Sensor tipo: Determinista / Computacional (Capa 1)

**3. Behaviour Harness**
- Verifica que el comportamiento funcional es correcto
- Tools: Jest, Maestro, Detox, contract tests, snapshot tests
- Sensor tipo: Determinista -> State-based -> LLM-as-a-Judge (Capas 1-4)

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › CANON INTEGRAL: HARNESS ENGINEERING PARA EL EQUIPO DE AGENTES YENDO (SOTA 2026) › 3. ANATOMIA DE UN HARNESS MODERNO (Martin Fowler / Birgitta Bockeler) › 3.3 Computational vs. Inferential Sensors]
| Tipo | Definicion | Cuando usar | Costo |
|---|---|---|---|
| **Computacional** | Determinista: compilador, linter, test runner | Siempre primero | $0 |
| **Inferencial** | No-determinista: LLM como juez | Solo cuando el computacional no alcanza | $$$ |

> **Regla de Yendo:** Los sensores computacionales siempre antes que los inferenciales. tsc --noEmit y Maestro son GRATUITOS. LLM-as-a-judge solo para matices subjetivos.

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › CANON INTEGRAL: HARNESS ENGINEERING PARA EL EQUIPO DE AGENTES YENDO (SOTA 2026) › 3. ANATOMIA DE UN HARNESS MODERNO (Martin Fowler / Birgitta Bockeler) › 3.4 Harnessability: Codigo Disenado para ser Inspeccionado]
**Alta harnessability (Yendo lo cumple):**
- Modulos < 150 lineas (invariante INV_MODULARITY_150)
- Tipos TypeScript estrictos (contratos verificables)
- RLS en base de datos (estado verificable externamente)
- Git como sistema de registro (trazabilidad completa)

**Baja harnessability (A evitar):**
- Funciones con efectos secundarios no testeables
- Estado global sin forma de inspeccion
- Logica acoplada en componentes de 600+ lineas
- Configuracion hardcodeada sin env vars

---

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › CANON INTEGRAL: HARNESS ENGINEERING PARA EL EQUIPO DE AGENTES YENDO (SOTA 2026) › 4. LAS 14 LECCIONES DEL CURSO WALKINGLABS]
*(Sintetizado de walkinglabs.github.io/learn-harness-engineering)*

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › CANON INTEGRAL: HARNESS ENGINEERING PARA EL EQUIPO DE AGENTES YENDO (SOTA 2026) › 4. LAS 14 LECCIONES DEL CURSO WALKINGLABS]
*(Sintetizado de walkinglabs.github.io/learn-harness-engineering)*

| Num | Leccion | Insight Clave |
|---|---|---|
| 01 | Por que agentes capaces aun fallan | No es el modelo, es el ambiente. Failure signals checklist. |
| 02 | Que es realmente un harness | H = {E,T,C,S,L,V}. Anatomia completa. |
| 03 | El repositorio como sistema de registro | Git es la unica fuente de verdad. features.json no se sobreescribe. |
| 04 | Por que un archivo de instrucciones gigante falla | Context window budget. Estrategia de instrucciones modulares y JIT. |
| 05 | Por que las tareas largas pierden continuidad | Sesiones sin handoff = amnesia. Session handoff protocol. |
| 06 | Por que la inicializacion necesita su propia fase | Initializer agent = fundaciones solidas. Checklist de output. |
| 07 | Por que los agentes exageran y no terminan | Scope creep + under-finish. Siguiente tarea template. |
| 08 | Por que las feature lists son primitivas del harness | JSON de features con passes: false/true. No se edita, solo se actualiza. |
| 09 | Por que los agentes declaran victoria prematuramente | Self-verify antes de marcar como done. Clean state checklist. |
| 10 | Por que el testing E2E cambia los resultados | Maestro/Puppeteer como sensores obligatorios antes del done. |
| 11 | Por que la observabilidad pertenece dentro del harness | Sprint contracts, evaluator rubrics, token tracking. |
| 12 | Por que cada sesion debe dejar estado limpio | Cleanup loop: git commit + progress update + test pass. |

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › CANON INTEGRAL: HARNESS ENGINEERING PARA EL EQUIPO DE AGENTES YENDO (SOTA 2026) › 4. LAS 14 LECCIONES DEL CURSO WALKINGLABS]
| 13 | Loop Engineering | Maker + Checker dual-agent. Goal template, loop state template. |
| 14 | Graph Engineering | Grafos de decision (LangGraph/XState). Nodos de estado, transiciones. |

---

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › CANON INTEGRAL: HARNESS ENGINEERING PARA EL EQUIPO DE AGENTES YENDO (SOTA 2026) › 5. EL STACK TECNICO OPEN SOURCE PARA YENDO › 5.1 Tabla Reconfigurada para React Native + Expo + Supabase (Antigravity IDE)]
| Capa del Harness | Tecnologia OSS | Funcion en el Stack Yendo | Estado |
|---|---|---|---|
| Sandboxing | Git Worktrees + agent_worktree.js | Aisla refactors pesados sin tocar el working tree del CTO | Activo |
| Protocolo de Herramientas | Model Context Protocol (MCP) | Antigravity IDE expone file system, terminal, browser via MCP tipado | Activo |
| Sensores Computacionales | npx tsc --noEmit + ESLint | Verifica tipos TypeScript y lint antes de cualquier PR | Activo |
| Sensores Computacionales | npx expo-doctor | Verifica configuracion Expo/EAS antes de declarar done | Activo |
| Evaluacion Movil E2E | Maestro CLI | Tests E2E en emulador Android/iOS headless con YAML declarativo | Parcial |
| State-Based Grader | Supabase CLI + psql | Verifica esquemas RLS, politicas, idempotencia en migraciones | Parcial |
| Orquestacion Multi-Sesion | Git + features.json + PROGRESS.md | Sistema de registro entre sesiones (patron Anthropic) | A implementar |
| Context JIT | ragHook.js + Qdrant | Inyecta invariantes canonicas al editar archivos criticos | Activo |
| Lifecycle Hooks | 00_KANBAN_AGENTS.md | Checkpoint pre-done obligatorio antes de cerrar tareas | Activo |
| LLM-as-a-Judge | Gemini 2.5 Flash / Groq LPU | Evalua microcopy rioplatense, apego al YDS, calidad PR | Parcial |

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › CANON INTEGRAL: HARNESS ENGINEERING PARA EL EQUIPO DE AGENTES YENDO (SOTA 2026) › 5. EL STACK TECNICO OPEN SOURCE PARA YENDO › 5.2 Tecnologias Fundacionales]
**Sandboxing:**
- Docker / E2B SDK: Para sandboxes efimeros en entornos de servidor
- Git Worktrees: Para agentes que trabajan en branches paralelas
- E2B: Microambientes de codigo seguro para ejecutar codigo generado por agentes

**Protocolo de Herramientas:**
- MCP (Model Context Protocol): Estandar Anthropic para exponer recursos y herramientas a cualquier LLM
- Supabase tiene un MCP server oficial: github.com/supabase/mcp-server-supabase

**Orquestacion:**
- LangGraph (Python/JS): Grafos de estados para workflows complejos, condicionales, loops
- XState (TypeScript): State machines para flujos de UI movil + decisiones del agente
- Temporal: Workflows duraderos con reintentos automaticos

**Evaluacion y Gates:**
- DeepEval: Framework de evals para LLMs (faithfulness, relevancy, contextual recall)
- Ragas: Evaluacion de RAG systems
- Maestro: E2E testing para React Native (headless, YAML declarativo)
- Detox: Alternativa a Maestro con mayor control

**Observabilidad:**
- Langfuse (OSS): Tracing completo de LLM calls, latencia, tokens, costos
- OpenLLMetry: OpenTelemetry para LLMs
- Phoenix (Arize): MLOps observability especializado en LLMs

---

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › CANON INTEGRAL: HARNESS ENGINEERING PARA EL EQUIPO DE AGENTES YENDO (SOTA 2026) › 6. PATRONES ESTRATEGICOS DE HARNESS ENGINEERING › 6.1 Patron Maker-Checker (Generador-Evaluador)]
El patron mas importante: nunca el mismo agente que genera tambien evalua.

```
[MAKER Agent (Generator)] -- artefacto --> [CHECKER Agent (Evaluator)]
                                                    |
                                           Criterios binarios explicitos
                                                    |
                            PASS: continua / FAIL: feedback al generador
```

**Implementacion en Yendo:**
- CORE_ENGINEERING genera el componente TSX
- QUALITY_RELIABILITY ejecuta tsc, eslint, Maestro
- Si FAIL: feedback automatico al generador con error raw de terminal
- Si PASS: commit + outbox notification al CTO

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › CANON INTEGRAL: HARNESS ENGINEERING PARA EL EQUIPO DE AGENTES YENDO (SOTA 2026) › 6. PATRONES ESTRATEGICOS DE HARNESS ENGINEERING › 6.2 Patron Context Budgeting Gradual]
Jerarquia de carga (NO inyectar todo de golpe):

```
Nivel 0 (siempre): System prompt base (~2K tokens)
Nivel 1 (por tarea): Spec relevante del spec.md (~3K tokens)
Nivel 2 (JIT): ragHook.js al editar archivo especifico (~200 tokens)
Nivel 3 (bajo demanda): Secciones de YENDO_LIBRARY segun necesidad
```

Anti-patron a evitar: Inyectar YENDO_LIBRARY completa (189KB) en cada prompt.

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › CANON INTEGRAL: HARNESS ENGINEERING PARA EL EQUIPO DE AGENTES YENDO (SOTA 2026) › 6. PATRONES ESTRATEGICOS DE HARNESS ENGINEERING › 6.3 Patron Sensors-First (Computacional antes de Inferencial)]
Secuencia obligatoria de verificacion antes de declarar cualquier tarea done:

```bash

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › STEP 1: Sensores Computacionales (GRATIS, DETERMINISTAS)]
npx tsc --noEmit
npx eslint src/ --max-warnings 0
npx expo-doctor

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › Verificar microcopy, UX, adherencia a YDS ›  › 6.4 Patron Clean State per Session]
Checklist de Estado Limpio (INV_CLEAN_STATE):
- [ ] TypeScript compila sin errores: tsc --noEmit
- [ ] ESLint sin warnings: eslint src/ --max-warnings 0
- [ ] Tests unitarios pasan: jest --passWithNoTests
- [ ] Feature implementada tiene test Maestro pasando
- [ ] Git commit con mensaje descriptivo realizado
- [ ] features.json actualizado con la feature como passes: true
- [ ] PROGRESS.md actualizado con resumen de lo hecho
- [ ] Outbox notification generado para el CTO

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › Verificar microcopy, UX, adherencia a YDS ›  › 6.5 Patron Incremental Progress (Anti One-Shot)]
**Una sesion = Una feature = Una PR candidata**

- El initializer descompone el proyecto en features atomicas
- Cada coding session elige la feature de mayor prioridad no hecha
- La feature se implementa y verifica completamente
- Solo entonces se avanza a la siguiente

---

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › Verificar microcopy, UX, adherencia a YDS › 7. INTEGRACION CON EL STACK ANTIGRAVITY IDE + REACT NATIVE › 7.1 Sensores Especificos de React Native / Expo]
| Sensor | Comando | Que Detecta |
|---|---|---|
| TypeScript | npx tsc --noEmit | Tipos incorrectos, imports faltantes |
| Expo Doctor | npx expo-doctor | Config plugins rotos, versiones incompatibles |
| Metro Bundler | npx expo export --platform android | Errores de bundling, deps nativas |
| RLS Checker | supabase db diff | Schema drift, migraciones faltantes |
| Maestro E2E | maestro test flows/ | Flujos UI: login, geofencing, check-in |
| ragHook | node tools/lib/ragHook.js <file> | Invariantes canonicas antes de editar |

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › Verificar microcopy, UX, adherencia a YDS › 7. INTEGRACION CON EL STACK ANTIGRAVITY IDE + REACT NATIVE › 7.2 Los 3 Workloads del Harness en Yendo]
**Workload 1: Feature Development (Harness Incremental)**
```
Initializer -> features.json -> Coding Agent Loop -> Maestro Verify -> PR
```

**Workload 2: Database Migration (Harness de Estado)**
```
Spec -> supabase migration new -> RLS policies -> supabase db push -> State verify
```

**Workload 3: Refactoring Pesado (Harness con Worktree)**
```
node tools/system/agent_worktree.js create refactor-X
-> Agente trabaja en branch aislado
-> tsc + eslint + jest pasan
-> node tools/system/agent_worktree.js remove refactor-X
```

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › Verificar microcopy, UX, adherencia a YDS › 7. INTEGRACION CON EL STACK ANTIGRAVITY IDE + REACT NATIVE › 7.3 El Harness de Supabase MCP]
Para que los agentes interactuen con Supabase de forma tipada y segura:

```typescript
// Herramienta tipada via MCP para queries a Supabase
// El agente accede a traves del contrato, nunca con credenciales raw
const supabaseTool = {
  name: "supabase_query",
  description: "Execute a safe read query against the Supabase database",
  parameters: {
    table: { type: "string", description: "Table name" },
    filters: { type: "object", description: "RLS-compliant filters" }
  }
}
```

---

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › Verificar microcopy, UX, adherencia a YDS › 8. LIBROS DE REFERENCIA PARA HARNESS ENGINEERING]
| Libro | Autor | Conexion con Harness |
|---|---|---|
| Building Evolutionary Architectures | Ford, Parsons, Kua | Arquitectural Fitness Functions = Sensores del harness |
| Site Reliability Engineering | Google / O'Reilly | Error budgets, fault limits, autonomous remediation |
| Continuous Delivery | Humble, Farley | Hermetic pipelines, sandbox tests, immediate feedback |
| Designing Data-Intensive Applications | Kleppmann | State persistence, idempotency, context storage |
| AI Engineering | Chip Huyen (O'Reilly 2025) | Evaluacion de sistemas agentivos, guardrails |
| Release It! | Michael Nygard | Circuit breakers, timeouts, bulkheads = invariantes del harness |
| Clean Architecture | Robert C. Martin | Modularidad < 150 lineas = alta harnessability |

---

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › Verificar microcopy, UX, adherencia a YDS › 9. CURSOS Y RECURSOS GRATUITOS]
| Recurso | URL | Que ensena |
|---|---|---|
| Learn Harness Engineering (WalkingLabs) | walkinglabs.github.io/learn-harness-engineering | 14 lecciones + 8 proyectos + templates |
| Building Agentic Workflows (DeepLearning.AI) | deeplearning.ai | LangGraph, multi-agent, evals |
| Automated Testing for LLMOps (DeepLearning.AI) | deeplearning.ai | Evals automaticos, pytest LLM, DeepEval |
| React Native E2E con Maestro (YouTube) | youtube.com | Flujos YAML, emuladores headless |
| How to Run E2E on EAS Build (Expo) | YouTube | Prebuilds + test suites en CI |
| From Developer to AI Champion (LIDR) | youtube.com/watch?v=snHmgCVD4k4 | Harness con Claude Code/Cursor |

---

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › Verificar microcopy, UX, adherencia a YDS › 10. EL HARNESS DE YENDO: ESTADO ACTUAL VS. ESTADO OBJETIVO › 10.1 Diagnostico de Brechas]
| Componente del Harness | Estado Actual | Gap |
|---|---|---|
| E: Execution Loop | MANAGER.mdc + AGENTS.md (QRSPI) | Falta features.json pattern |
| T: Tool Registry | 15+ tools en tools/ + MCP Antigravity | Supabase MCP pendiente |
| C: Context Manager | ragHook.js + YENDO_LIBRARY | Context budgeting no estructurado |
| S: State Store | KANBAN_AGENTS.md + git | Falta features.json + PROGRESS.md por spec |
| L: Lifecycle Hooks | INV_QA_CHECKPOINT | Clean-state checklist no automatizado |
| V: Evaluation Interface | tsc --noEmit, Maestro parcial | Pipeline unificado faltante |

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › Verificar microcopy, UX, adherencia a YDS › 10. EL HARNESS DE YENDO: ESTADO ACTUAL VS. ESTADO OBJETIVO › 10.2 Las 5 Optimizaciones Criticas Identificadas]
**OPT-1 (PRIORIDAD MAXIMA): Implementar el Patron Initializer/Coding Agent**
- Problema: Los agentes no tienen protocolo claro de continuidad entre sesiones
- Solucion: Template de features.json + PROGRESS.md + protocolo de sesion
- Impacto: Elimina "Premature Victory Declaration" y "One-Shot Overreach"

**OPT-2 (PRIORIDAD ALTA): Pipeline de Sensores Computacionales Unificado**
- Problema: Sensores (tsc, eslint, expo-doctor, Maestro) se ejecutan manualmente y dispersos
- Solucion: Script npm run harness:check que los ejecute en secuencia correcta
- Impacto: Reduce false positives de "tarea completada" sin verificacion real

**OPT-3 (PRIORIDAD MEDIA): Context Budgeting Estructurado**
- Problema: El system prompt crece sin control, reduciendo calidad de respuestas
- Solucion: Jerarquizar cargas: base -> spec -> ragHook JIT -> YENDO_LIBRARY on-demand
- Impacto: -40% tokens por sesion, +calidad de respuesta

**OPT-4 (PRIORIDAD MEDIA): Supabase MCP Integration**
- Problema: Los agentes acceden a Supabase via CLI pero sin contrato tipado MCP
- Solucion: Configurar mcp-server-supabase oficial para queries y schema inspection
- Impacto: DATA_PLATFORM puede verificar RLS policies automaticamente

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › Verificar microcopy, UX, adherencia a YDS › 10. EL HARNESS DE YENDO: ESTADO ACTUAL VS. ESTADO OBJETIVO › 10.2 Las 5 Optimizaciones Criticas Identificadas]
Supabase via CLI pero sin contrato tipado MCP
- Solucion: Configurar mcp-server-supabase oficial para queries y schema inspection
- Impacto: DATA_PLATFORM puede verificar RLS policies automaticamente

**OPT-5 (PRIORIDAD BAJA): Calibracion del LLM-as-a-Judge**
- Problema: No existe juez LLM calibrado para microcopy rioplatense y YDS
- Solucion: Banco de 25-50 ejemplos CTO-calibrados. Cohen's Kappa mayor o igual a 0.85

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › Verificar microcopy, UX, adherencia a YDS › 11. COMPARATIVA: HARNESS EN DIFERENTES ENTORNOS]
| Aspecto | Web/Backend Generico | Yendo (Mobile + Supabase) |
|---|---|---|
| Sandboxing | Docker + E2B | Git Worktrees + Expo Prebuild |
| Protocolo de Tools | MCP generico | MCP + Supabase MCP + expo tools |
| Testing E2E | Playwright/Puppeteer | Maestro (YAML + emuladores) |
| TypeScript Check | tsc --noEmit | tsc --noEmit + Expo types |
| State Verification | DB migrations | supabase db diff + RLS audit |
| CI/CD | GitHub Actions generico | EAS Build + Maestro headless |
| Feature List | JSON plano | JSON con steps moviles + RLS checks |
| Initializer | Genera Dockerfile + README | Genera init.sh + Expo config + DB seed |

---

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › En package.json:]
"harness:check": "tsc --noEmit && eslint src/ --max-warnings 0 && npx expo-doctor && echo HARNESS CHECK PASSED"
```

**Semana 2 - Session Protocol:**
```
.knowledge/specs/<feature>.features.json  -> Template features
.knowledge/specs/<feature>.progress.md    -> Progress log entre sesiones
tools/system/harness_session_start.js     -> Lee git, PROGRESS, features
tools/system/harness_session_end.js       -> Git commit + PROGRESS update
```

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › flows/health_check.yaml]
appId: com.yendo.mobile
---
- launchApp
- assertVisible: "Descubri tu proximo lugar"
- tapOn: "Explorar"
- assertVisible: "Mapa"
```

**LLM-as-a-Judge calibration:**
```
1. CTO evalua 25 ejemplos de microcopy
2. Crear prompt de juez con criterios binarios
3. Correr juez en mismos 25 ejemplos
4. Medir Cohen's Kappa
5. Ajustar prompt hasta mayor o igual a 0.85
```

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › flows/health_check.yaml ›  › Sprint 3: Observability (2 semanas)]
**Langfuse Integration:**
```typescript
import { Langfuse } from "langfuse";
// Tracing de cada step del harness
// Tokens consumidos por session
// Herramientas invocadas y resultados
```

---

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › flows/health_check.yaml › 13. GLOSARIO DE TERMINOS CANONIZADOS]
| Termino | Definicion |
|---|---|
| Harness | Infraestructura completa que rodea al LLM: tools, context, loops, evaluadores |
| Harnessability | Grado en que el codigo facilita su verificacion por el harness |
| Feedforward Guide | Contexto anticipatorio: specs, types, AGENTS.md |
| Feedback Sensor | Senal computacional post-generacion: linter, test, compiler |
| pass@k | Probabilidad de acertar al menos 1 vez en k intentos |
| pass^k | Probabilidad de acertar TODAS las k veces (metrica de mision critica) |
| Clean State | Ambiente en estado que puede ser revisado sin deuda oculta |
| Initializer Agent | Agente especializado en configurar el ambiente para la primera sesion |
| Coding Agent | Agente que hace progreso incremental en sesiones subsecuentes |
| Maker-Checker | Patron donde el generador y el evaluador son roles separados |
| Context Budget | Limite intencionado de tokens para mantener calidad de respuesta |
| Feature Gate | Test que debe pasar antes de que una feature se marque como done |
| Premature Victory | Anti-patron: declarar done sin verificacion E2E real |
| One-Shot Overreach | Anti-patron: intentar implementar todo el proyecto de una sola vez |

---

[knowledge/canon_foundation/CANON_HARNESS_ENGINEERING_INTEGRAL_2026.md › flows/health_check.yaml › Relaciones de Contexto]
- [[CANON_HARNESS_Y_EVALS_AGENTICOS_SOTA_2026]]
- [[CANON_SRE_RELIABILITY_ZERO_CRASH_2026]]
- [[CANON_AGENTIC_01_FOUNDATIONAL_PAPERS]]
- [[CANON_AGENTIC_02_FRAMEWORKS_ORCHESTRATION]]
- [[CANON_AGENTIC_03_SOTA_OPEN_SOURCE_AND_TOOLING]]
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[invariants_ledger]]
- [[00_KANBAN_AGENTS]]
- [[CYBERSECURITY_MASTER_PROTOCOL]]
- [[IA_AGENTICA_ORQUESTACION]]
- [[AGENTS]]
- [[Supabase]]
- [[Maestro]]
- [[Expo]]