**Alcance:** Ingeniería de Harnesses para equipos de agentes autónomos: aislamiento de tareas, verificación determinista por CLI y prevención de regresiones. (Fuente migrada y curada desde Yendo Mobile Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

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

# CANON INTEGRAL: HARNESS ENGINEERING PARA EL EQUIPO DE AGENTES YENDO (SOTA 2026)

> **Fuentes primarias sintetizadas:**
> - Anthropic Engineering: "Effective Harnesses for Long-Running Agents" (Nov 2025) + "Harness Design for Long-Running Application Development"
> - OpenAI: "Harness Engineering: Leveraging Codex in an Agent-First World"
> - Martin Fowler (Birgitta Bockeler, Thoughtworks): "Harness Engineering for Coding Agent Users" (Abril 2026)
> - WalkingLabs: "Learn Harness Engineering" — Curso Open Source (14 lecciones)
> - GitHub: "awesome-harness-engineering" (ai-boost)
> - arXiv:2605.23950: "Stop Comparing LLM Agents Without Disclosing the Harness"

---

## 1. DEFINICION CANONICA: QUE ES UN HARNESS DE AGENTE

El **Agent Harness** (arnes de agente) es el conjunto de software, protocolos, restricciones e infraestructura que rodea a un modelo LLM para convertirlo en un agente autonomo confiable y observable.

**Metafora maestra:** Si el LLM es el cerebro (inteligencia pura), el Harness es el cuerpo completo — el esqueleto que le da estructura, el sistema nervioso que conecta sensores, los musculos que ejecutan acciones, el sistema inmunologico que rechaza acciones peligrosas, y el sistema circulatorio que mantiene el contexto vivo entre sesiones.

### 1.1 La Distincion Epistemologica Fundamental

| Dimension | Prompt Engineering | Context Engineering | Harness Engineering |
|---|---|---|---|
| **Alcance** | El texto de la instruccion | El paquete de informacion inyectada | Todo el entorno de ejecucion |
| **Objetivo** | Mejor respuesta en un turno | Mejor comprension del contexto | Comportamiento confiable a lo largo del tiempo |
| **Control** | Frases, tokens | Documentos, RAG, memoria | Tools, sandboxes, loops, evaluadores |
| **Analogia** | Dar instrucciones a un empleado | Darle el manual de la empresa | Disenar el ambiente de trabajo completo |

> **Regla de Oro (arXiv:2605.23950):** "Nunca se evalua un modelo aislado; siempre se evalua la combinacion indisoluble de [Modelo + Harness]. Un modelo inferior en un Harness superior supera holgadamente a un modelo de frontera en un Harness deficiente."

### 1.2 Formalismo H = {E, T, C, S, L, V}

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

## 2. EL PROBLEMA CENTRAL: AGENTES DE LARGA DURACION

### 2.1 Por que fallan los agentes sin harness (Anthropic, Nov 2025)

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

### 2.2 Los 4 Artefactos del Harness de Larga Duracion (Anthropic)

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
6. Verifica end-to-end (browser automation, Playwright E2E, etc.)
7. Actualiza features.json -> {passes: true}
8. Git commit descriptivo
9. Actualiza PROGRESS.md
```

---

## 3. ANATOMIA DE UN HARNESS MODERNO (Martin Fowler / Birgitta Bockeler)

### 3.1 El Marco Feedforward + Feedback

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

### 3.2 Las Tres Categorias de Harness (Fowler)

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
- Tools: Jest, Playwright E2E, Detox, contract tests, snapshot tests
- Sensor tipo: Determinista -> State-based -> LLM-as-a-Judge (Capas 1-4)

### 3.3 Computational vs. Inferential Sensors

| Tipo | Definicion | Cuando usar | Costo |
|---|---|---|---|
| **Computacional** | Determinista: compilador, linter, test runner | Siempre primero | $0 |
| **Inferencial** | No-determinista: LLM como juez | Solo cuando el computacional no alcanza | $$$ |

> **Regla de Yendo:** Los sensores computacionales siempre antes que los inferenciales. tsc --noEmit y Playwright E2E son GRATUITOS. LLM-as-a-judge solo para matices subjetivos.

### 3.4 Harnessability: Codigo Disenado para ser Inspeccionado

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

## 4. LAS 14 LECCIONES DEL CURSO WALKINGLABS

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
| 10 | Por que el testing E2E cambia los resultados | Playwright E2E/Puppeteer como sensores obligatorios antes del done. |
| 11 | Por que la observabilidad pertenece dentro del harness | Sprint contracts, evaluator rubrics, token tracking. |
| 12 | Por que cada sesion debe dejar estado limpio | Cleanup loop: git commit + progress update + test pass. |
| 13 | Loop Engineering | Maker + Checker dual-agent. Goal template, loop state template. |
| 14 | Graph Engineering | Grafos de decision (LangGraph/XState). Nodos de estado, transiciones. |

---

## 5. EL STACK TECNICO OPEN SOURCE PARA YENDO

### 5.1 Tabla Reconfigurada para Web UI / Vanilla & Modern Frontend + Web Platform + Supabase (Antigravity IDE)

| Capa del Harness | Tecnologia OSS | Funcion en el Stack Yendo | Estado |
|---|---|---|---|
| Sandboxing | Git Worktrees + agent_worktree.js | Aisla refactors pesados sin tocar el working tree del CTO | Activo |
| Protocolo de Herramientas | Model Context Protocol (MCP) | Antigravity IDE expone file system, terminal, browser via MCP tipado | Activo |
| Sensores Computacionales | npx tsc --noEmit + ESLint | Verifica tipos TypeScript y lint antes de cualquier PR | Activo |
| Sensores Computacionales | npx expo-doctor | Verifica configuracion Web Platform/EAS antes de declarar done | Activo |
| Evaluacion Movil E2E | Playwright E2E CLI | Tests E2E en emulador Android/iOS headless con YAML declarativo | Parcial |
| State-Based Grader | Supabase CLI + psql | Verifica esquemas RLS, politicas, idempotencia en migraciones | Parcial |
| Orquestacion Multi-Sesion | Git + features.json + PROGRESS.md | Sistema de registro entre sesiones (patron Anthropic) | A implementar |
| Context JIT | ragHook.js + Qdrant | Inyecta invariantes canonicas al editar archivos criticos | Activo |
| Lifecycle Hooks | 00_KANBAN_AGENTS.md | Checkpoint pre-done obligatorio antes de cerrar tareas | Activo |
| LLM-as-a-Judge | Gemini 2.5 Flash / Groq LPU | Evalua microcopy rioplatense, apego al YDS, calidad PR | Parcial |

### 5.2 Tecnologias Fundacionales

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
- Playwright E2E: E2E testing para Web UI / Vanilla & Modern Frontend (headless, YAML declarativo)
- Detox: Alternativa a Playwright E2E con mayor control

**Observabilidad:**
- Langfuse (OSS): Tracing completo de LLM calls, latencia, tokens, costos
- OpenLLMetry: OpenTelemetry para LLMs
- Phoenix (Arize): MLOps observability especializado en LLMs

---

## 6. PATRONES ESTRATEGICOS DE HARNESS ENGINEERING

### 6.1 Patron Maker-Checker (Generador-Evaluador)

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
- QUALITY_RELIABILITY ejecuta tsc, eslint, Playwright E2E
- Si FAIL: feedback automatico al generador con error raw de terminal
- Si PASS: commit + outbox notification al CTO

### 6.2 Patron Context Budgeting Gradual

Jerarquia de carga (NO inyectar todo de golpe):

```
Nivel 0 (siempre): System prompt base (~2K tokens)
Nivel 1 (por tarea): Spec relevante del spec.md (~3K tokens)
Nivel 2 (JIT): ragHook.js al editar archivo especifico (~200 tokens)
Nivel 3 (bajo demanda): Secciones de YENDO_LIBRARY segun necesidad
```

Anti-patron a evitar: Inyectar YENDO_LIBRARY completa (189KB) en cada prompt.

### 6.3 Patron Sensors-First (Computacional antes de Inferencial)

Secuencia obligatoria de verificacion antes de declarar cualquier tarea done:

```bash
# STEP 1: Sensores Computacionales (GRATIS, DETERMINISTAS)
npx tsc --noEmit
npx eslint src/ --max-warnings 0
npx expo-doctor

# STEP 2: Tests Unitarios
npx jest --coverage

# STEP 3: Tests E2E (SOLO si Pasos 1-2 pasan)
maestro test flows/login.yaml

# STEP 4: LLM-as-a-Judge (SOLO si Steps 1-3 pasan)
# Verificar microcopy, UX, adherencia a YDS
```

### 6.4 Patron Clean State per Session

Checklist de Estado Limpio (INV_CLEAN_STATE):
- [ ] TypeScript compila sin errores: tsc --noEmit
- [ ] ESLint sin warnings: eslint src/ --max-warnings 0
- [ ] Tests unitarios pasan: jest --passWithNoTests
- [ ] Feature implementada tiene test Playwright E2E pasando
- [ ] Git commit con mensaje descriptivo realizado
- [ ] features.json actualizado con la feature como passes: true
- [ ] PROGRESS.md actualizado con resumen de lo hecho
- [ ] Outbox notification generado para el CTO

### 6.5 Patron Incremental Progress (Anti One-Shot)

**Una sesion = Una feature = Una PR candidata**

- El initializer descompone el proyecto en features atomicas
- Cada coding session elige la feature de mayor prioridad no hecha
- La feature se implementa y verifica completamente
- Solo entonces se avanza a la siguiente

---

## 7. INTEGRACION CON EL STACK ANTIGRAVITY IDE + Web UI / Vanilla & Modern Frontend

### 7.1 Sensores Especificos de Web UI / Vanilla & Modern Frontend / Web Platform

| Sensor | Comando | Que Detecta |
|---|---|---|
| TypeScript | npx tsc --noEmit | Tipos incorrectos, imports faltantes |
| Web Platform Doctor | npx expo-doctor | Config plugins rotos, versiones incompatibles |
| Metro Bundler | npx expo export --platform android | Errores de bundling, deps nativas |
| RLS Checker | supabase db diff | Schema drift, migraciones faltantes |
| Playwright E2E E2E | maestro test flows/ | Flujos UI: login, geofencing, check-in |
| ragHook | node tools/lib/ragHook.js <file> | Invariantes canonicas antes de editar |

### 7.2 Los 3 Workloads del Harness en Yendo

**Workload 1: Feature Development (Harness Incremental)**
```
Initializer -> features.json -> Coding Agent Loop -> Playwright E2E Verify -> PR
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

### 7.3 El Harness de Supabase MCP

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

## 8. LIBROS DE REFERENCIA PARA HARNESS ENGINEERING

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

## 9. CURSOS Y RECURSOS GRATUITOS

| Recurso | URL | Que ensena |
|---|---|---|
| Learn Harness Engineering (WalkingLabs) | walkinglabs.github.io/learn-harness-engineering | 14 lecciones + 8 proyectos + templates |
| Building Agentic Workflows (DeepLearning.AI) | deeplearning.ai | LangGraph, multi-agent, evals |
| Automated Testing for LLMOps (DeepLearning.AI) | deeplearning.ai | Evals automaticos, pytest LLM, DeepEval |
| Web UI / Vanilla & Modern Frontend E2E con Playwright E2E (YouTube) | youtube.com | Flujos YAML, emuladores headless |
| How to Run E2E on EAS Build (Web Platform) | YouTube | Prebuilds + test suites en CI |
| From Developer to AI Champion (LIDR) | youtube.com/watch?v=snHmgCVD4k4 | Harness con Claude Code/Cursor |

---

## 10. EL HARNESS DE YENDO: ESTADO ACTUAL VS. ESTADO OBJETIVO

### 10.1 Diagnostico de Brechas

| Componente del Harness | Estado Actual | Gap |
|---|---|---|
| E: Execution Loop | MANAGER.mdc + AGENTS.md (QRSPI) | Falta features.json pattern |
| T: Tool Registry | 15+ tools en tools/ + MCP Antigravity | Supabase MCP pendiente |
| C: Context Manager | ragHook.js + YENDO_LIBRARY | Context budgeting no estructurado |
| S: State Store | KANBAN_AGENTS.md + git | Falta features.json + PROGRESS.md por spec |
| L: Lifecycle Hooks | INV_QA_CHECKPOINT | Clean-state checklist no automatizado |
| V: Evaluation Interface | tsc --noEmit, Playwright E2E parcial | Pipeline unificado faltante |

### 10.2 Las 5 Optimizaciones Criticas Identificadas

**OPT-1 (PRIORIDAD MAXIMA): Implementar el Patron Initializer/Coding Agent**
- Problema: Los agentes no tienen protocolo claro de continuidad entre sesiones
- Solucion: Template de features.json + PROGRESS.md + protocolo de sesion
- Impacto: Elimina "Premature Victory Declaration" y "One-Shot Overreach"

**OPT-2 (PRIORIDAD ALTA): Pipeline de Sensores Computacionales Unificado**
- Problema: Sensores (tsc, eslint, expo-doctor, Playwright E2E) se ejecutan manualmente y dispersos
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

**OPT-5 (PRIORIDAD BAJA): Calibracion del LLM-as-a-Judge**
- Problema: No existe juez LLM calibrado para microcopy rioplatense y YDS
- Solucion: Banco de 25-50 ejemplos CTO-calibrados. Cohen's Kappa mayor o igual a 0.85
- Impacto: Cierra el gap en Capas 3-4 del Grader Stack

---

## 11. COMPARATIVA: HARNESS EN DIFERENTES ENTORNOS

| Aspecto | Web/Backend Generico | Yendo (Mobile + Supabase) |
|---|---|---|
| Sandboxing | Docker + E2B | Git Worktrees + Web Platform Prebuild |
| Protocolo de Tools | MCP generico | MCP + Supabase MCP + expo tools |
| Testing E2E | Playwright/Puppeteer | Playwright E2E (YAML + emuladores) |
| TypeScript Check | tsc --noEmit | tsc --noEmit + Web Platform types |
| State Verification | DB migrations | supabase db diff + RLS audit |
| CI/CD | GitHub Actions generico | EAS Build + Playwright E2E headless |
| Feature List | JSON plano | JSON con steps moviles + RLS checks |
| Initializer | Genera Dockerfile + README | Genera init.sh + Web Platform config + DB seed |

---

## 12. IMPLEMENTACION PRIORITARIA: PLAN DE ACCION

### Sprint 1: Foundations (2 semanas)

**Semana 1 - Sensor Pipeline:**
```bash
# En package.json:
"harness:check": "tsc --noEmit && eslint src/ --max-warnings 0 && npx expo-doctor && echo HARNESS CHECK PASSED"
```

**Semana 2 - Session Protocol:**
```
.knowledge/specs/<feature>.features.json  -> Template features
.knowledge/specs/<feature>.progress.md    -> Progress log entre sesiones
tools/system/harness_session_start.js     -> Lee git, PROGRESS, features
tools/system/harness_session_end.js       -> Git commit + PROGRESS update
```

### Sprint 2: Evaluation (2 semanas)

**Playwright E2E Integration completa:**
```yaml
# flows/health_check.yaml
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

### Sprint 3: Observability (2 semanas)

**Langfuse Integration:**
```typescript
import { Langfuse } from "langfuse";
// Tracing de cada step del harness
// Tokens consumidos por session
// Herramientas invocadas y resultados
```

---

## 13. GLOSARIO DE TERMINOS CANONIZADOS

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

## Relaciones de Contexto
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
- [[Playwright E2E]]
- [[Web Platform]]
