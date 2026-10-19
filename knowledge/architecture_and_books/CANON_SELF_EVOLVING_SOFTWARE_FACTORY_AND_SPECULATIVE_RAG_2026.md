# Tratado Canónico: Self-Evolving AI Software Factories, Speculative RAG & Context Caching (SOTA 2025–2026)

**Alcance:** Este documento define la arquitectura canónica de **Auto-Evolución Agéntica Gobernada por Compuertas (Gate-Governed Self-Evolving Web Software Factory)**, incluyendo **Darwin Gödel Machine (DGM)**, **EvoAgentX**, **TextGrad**, **DSPy MIPROv2**, **SkillSmith / CoEvoSkills (Surrogate Verifiers)**, **Speculative RAG (Drafter + Verifier)**, **Vertex AI Context Caching (`@google/genai` `caches.create`)**, métricas cuantitativas **Ragas** y la **Constitución Inmutable SHA-256 Anti-Drift**. NO es fuente de leyes visuales UI/UX (ver `DESIGN_MASTERY_2026.md`), NI de animaciones WebAudio/GLSL (ver `CANON_HOLO_SHADERS_3D_PACK_CHOREOGRAPHY_AND_WEBAUDIO_SFX_2026.md`), NI de matemática de slots o psicología conductual (ver `CANON_GAMIFICATION_PSYCHOLOGY_CRO_AND_STREAM_MARKETING_2026.md`).

---

## 1. Taxonomía de la Evolución Agéntica (2025–2026)

 `[VERIFICADO: Sakana AI / UBC 2025, EvoAgentX 2025, TextGrad Stanford 2025, SkillSmith 2026]`

Los sistemas multi-agente de primera generación (2023–2024) operaban con prompts estáticos, grafos de flujo rígidos y herramientas fijas codificadas a mano. En 2025–2026, la ingeniería de vanguardia distingue dos regímenes de evolución:

1. **Auto-Mejora Abierta sin Restricciones (*Open-Ended Recursive Self-Modification* — ej. *Darwin Gödel Machine* de Sakana AI y UBC)**:
   - Reemplaza las pruebas matemáticas formales de la Máquina de Gödel clásica de Schmidhuber por **validación empírica darwiniana** en sandboxes (*SWE-bench*, *Polyglot*).
   - Mantiene un archivo genealógico de variantes de agentes seleccionadas por **desempeño + novedad**, permitiendo que el agente reescriba su propio código fuente y herramientas.
   - **Riesgo en Producción**: Sin fronteras duras, un sistema puramente abierto puede sufrir **deriva de objetivos (*Goal Drift*)**, **Reward Hacking** (modificar los propios tests para que pasen siempre) o romper restricciones financieras/legales.
2. **Auto-Evolución Gobernada por Compuertas (*Gate-Governed Self-Evolution* — Nuestro Estándar de Software Factory)**:
   - Los agentes tienen **libertad total para evolucionar su "corteza"** (prompts operativos, heurísticas del ledger temporal, creación y refinamiento de `SKILL.md`, scripts deterministas en `tools/intelligence/` y topologías de sub-agentes).
   - Sin embargo, tienen **prohibición criptográfica absoluta** de alterar su **"tronco encefálico" (*Constitución Inmutable*)**: presupuesto cero costo, licencias permisivas (`MIT`, `Apache-2.0`, `BSD`), privacidad y las compuertas deterministas de auditoría.

---

## 2. Los 4 Vectores de una Self-Evolving Web Software Factory

### Vector 1 — Co-Evolución de Habilidades y Herramientas (*SkillSmith*, *CoEvoSkills*, *Voyager*)
- **Arquitectura**: Cuando un escuadrón resuelve un problema complejo o repetitivo, no deja la solución enterrada en el historial de conversación. Sintetiza o actualiza un paquete modular en `.agents/skills/<skill-name>/SKILL.md` acompañado de su script ejecutable determinista.
- **Mecanismo *Surrogate Verifier* (*SkillSmith* `[2606.01314]` & *CoEvoSkills*)**:
  - Antes de promover una nueva habilidad o herramienta al árbol principal, un **Verificador Sustituto (*Surrogate Verifier*)** genera casos de prueba sintéticos y de borde (*edge cases*) dentro de un entorno efímero aislado (`tools/sandcastle-runner.mjs` sobre Git Worktrees).
  - Si la habilidad falla o introduce regresiones en `eval_matrix.mjs`, el sistema destila el fallo como un *nogood* (contra-instinto con versión) y revierte el cambio automáticamente.

### Vector 2 — Memoria Continua e Instintos Temporales (*Letta/MemGPT*, *ExpeL*, *Graphiti Temporal Ledger*)
- **Arquitectura (`tools/intelligence/instincts_engine.mjs` + `.agents/memory/temporal_ledger.json`)**:
  - Cada sesión exitosa o error corregido se destila en un **Instinto Atómico** con puntaje de confianza bayesiano/empírico (`0.50` inicial $\rightarrow$ `0.85` validado $\rightarrow$ `0.98+` consolidado).
  - **Invalidación Temporal No-Destructiva**: Cuando una API externa o especificación web cambia, la regla antigua no se borra silenciosamente; se marca como `status: "INVALIDATED"` con `valid_until` y puntero `superseded_by`, preservando la trazabilidad histórica para que ningún agente repita errores pasados.

### Vector 3 — Optimización por Gradientes Textuales (*TextGrad* de Stanford & *DSPy MIPROv2*)
- **Fundamento (*TextGrad* — `zou-group/textgrad`, Yuksekgonul et al.)**:
  - Modela el sistema compuesto de IA como un grafo computacional donde las variables son instrucciones, prompts de sistema y definiciones de herramientas, y los "gradientes" son críticas estructuradas en lenguaje natural ($\nabla_{\text{text}} L$) generadas por un **Agente Crítico/Coach** al evaluar el resultado contra una métrica determinista.
- **Fundamento (*DSPy MIPROv2* — `stanfordnlp/dspy`)**:
  - Optimiza conjuntamente las instrucciones del prompt y las demostraciones *few-shot* mediante búsqueda bayesiana guiada por la matriz de evaluación (`eval_matrix.mjs`).
- **Aplicación en nuestra Software Factory (`textgrad_skill_optimizer.mjs`)**:
  - Tras ejecutar una tarea o auditoría, el optimizador analiza los fallos o advertencias del linter AST y de las métricas RAG, calcula el **Gradiente Textual** específico (qué instrucción ambigua causó el defecto) y propone un parche quirúrgico para el `SKILL.md` correspondiente.

### Vector 4 — Morfología de Flujos (*EvoAgentX*) y Exploración Ambiental Autónoma (*Tech Scout Agent*)
- **Enrutamiento Dinámico (*EvoAgentX* — `EvoAgentX/EvoAgentX`)**:
  - Adapta la topología del flujo de trabajo según la complejidad de la tarea: ejecución directa de 1 agente para cambios atómicos simples vs. topología completa (Investigador $\rightarrow$ Arquitecto $\rightarrow$ Constructor $\rightarrow$ Auditor Adversario) para subsistemas críticos.
- **Exploración Ambiental (*Tech Scout Agent* — `tools/intelligence/tech_scout.mjs`)**:
  - Un agente explorador consulta periódicamente fuentes primarias (GitHub Releases/Trending, especificaciones W3C/CSS/Chrome, changelogs de Cloudflare Workers y APIs de streaming) mediante Serper/GitHub/Firecrawl.
  - Aplica el **Filtro Triple de Calidad**:
    1. Licencia comercialmente permisiva (`MIT`, `Apache-2.0`, `BSD`, `CC0`) y costo cero permanente.
    2. Cero demonios pesados en segundo plano (compatible con portátiles de recursos acotados).
    3. Madurez verificada (estrellas, actividad reciente y ausencia de CVEs críticos).

---

## 3. Vanguardia en RAG Agéntico: Speculative RAG, Vertex AI Context Caching y Ragas

### 3.1 Speculative RAG (*Google Research* — Wang et al.)
- **Problema que resuelve**: Pasar 15 o 20 fragmentos largos directamente a un modelo grande incrementa la latencia de pre-llenado (*prefill TTFT*) y diluye la atención (*Lost-in-the-Middle*).
- **Arquitectura Dual (*Drafter LM + Verifier LM*)**:
  1. **Muestreo Multi-Perspectiva**: Los $K$ fragmentos recuperados por `Supercharged Omni-RAG v5` (`SQLite FTS5` + `MiniSearch` + `CodeGraph/Wikilink PageRank` + `ONNX Q8 Reranker`) se agrupan en $M$ subconjuntos diversos y compactos.
  2. **Drafter Paralelo**: Se generan múltiples borradores cortos en paralelo (o mediante heurísticas extractivas + llamadas ligeras a `gemini-2.5-flash`), cada uno citando explícitamente sus fuentes (`[doc_id#chunk]`).
  3. **Verifier de Alta Precisión**: El verificador evalúa cada borrador en una sola pasada según su **fidelidad factual (*Groundedness*)**, **cobertura de la consulta** y **ausencia de contradicciones**, fusionando el borrador ganador con latencia reducida hasta en un 50%.

### 3.2 Vertex AI Explicit & Implicit Context Caching (`@google/genai` `caches.create`)
- **Mecánica Técnica**:
  - En lugar de re-enviar los tratados canónicos, el mapa de arquitectura y las reglas inmutables en cada consulta a Vertex AI (`project-6565e6dc-f33c-49ff-b22`, `us-central1`), el puente `tools/intelligence/vertex_ai_bridge.mjs` utiliza el SDK oficial `@google/genai` (`ai.caches.create`) para fijar el **Canon Base de la Software Factory** en la memoria KV-Cache de Google Cloud con un TTL configurable (ej. `3600s`).
  - Reduce el costo de tokens de entrada entre un **75% y un 90%** sobre los créditos gratuitos de GCP y disminuye el *Time-To-First-Token (TTFT)* a menos de `200ms`.

### 3.3 Evaluación Cuantitativa Continua estilo Ragas (*Faithfulness*, *Context Precision* & *Answer Relevance*)
- Todo pipeline RAG agéntico de nivel industrial debe auditarse bajo tres métricas matemáticas complementarias a `Hit@5` y `MRR`:
  1. **Context Precision (Precisión de Contexto)**: Proporción de fragmentos verdaderamente relevantes situados en los primeros puestos ($k=1..3$) del ranking devuelto por el reranker `ONNX Q8`.
  2. **Faithfulness (Fidelidad / Cero Alucinación)**: Fracción de afirmaciones técnicas de la respuesta generada que pueden verificarse directamente en los fragmentos recuperados ($\text{Faithfulness} = \frac{|S_{\text{verificadas}}|}{|S_{\text{totales}}|}$).
  3. **Context Recall (Exhaustividad)**: Cobertura de los hechos requeridos por la consulta dorada dentro de la ventana `Top-K`.

---

## 4. Constitución Inmutable SHA-256 y Compuerta Anti-Reward-Hacking

Para garantizar que la **Self-Evolving Web Software Factory** nunca degrade su propia barra de calidad ni altere las reglas del fundador:

1. **Sello Criptográfico de la Constitución (`constitution_guard.mjs`)**:
   - Calcula y verifica los hashes `SHA-256` de los archivos constitucionales (`AGENTS.md`, `CONSTRAINTS.md`) y verifica que los umbrales mínimos de `eval_matrix.mjs` (`RAG Hit@5 >= 95%`, `AST Score == 100`, `Compliance Score == 100`) no hayan sido rebajados.
2. **Prohibición de Auto-Edición de Evaluadores**:
   - Ningún ciclo autónomo de evolución (`TextGrad` / `SkillSmith`) tiene permiso de escritura sobre `tools/intelligence/constitution_guard.mjs` ni puede relajar aserciones en `tools/intelligence/eval_matrix.mjs`.
3. **Rollback Atómico ante Regresión**:
   - Si una mutación de habilidad o prompt reduce el puntaje compuesto de `eval_matrix.mjs` por debajo de `95.0 / 100.0`, el orquestador revierte automáticamente el cambio y registra la causa en `.agents/memory/temporal_ledger.json`.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #architecture_and_books
