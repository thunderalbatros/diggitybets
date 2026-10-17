# Canon: World-Class Free Courses & Curricula on Agentic AI & Systems (2026)

## 1. DeepLearning.AI — Agentic AI (Prof. Andrew Ng)
- **Institución:** DeepLearning.AI en colaboración con líderes de la industria.
- **Acceso:** Gratuito en [deeplearning.ai/short-courses](https://www.deeplearning.ai/short-courses/).
- **Tesis Central:** La transición de la generación pasiva de texto ("zero-shot prompting") al razonamiento iterativo autónomo mediante **patrones de diseño agénticos**.

### Los Cuatro Patrones de Diseño Canónicos
1. **Reflection (Reflexión):**
   - El agente genera una respuesta o código preliminar, luego un subagente crítico evalúa la calidad, identifica fallos o casos límite no cubiertos y sugiere correcciones concretas antes de que el código sea presentado al usuario o al entorno.
2. **Tool Use (Uso de Herramientas):**
   - El modelo es aumentado con capacidades de reconocimiento y llamada a funciones (Function Calling / MCP) para interactuar con el mundo exterior: ejecutar scripts, consultar bases de datos, navegar por la web o inspeccionar el sistema de archivos.
3. **Planning (Planificación):**
   - Descomposición de objetivos de alto nivel en una secuencia ordenada de sub-tareas ejecutables. Incorpora replanificación dinámica cuando una sub-tarea encuentra un bloqueo inesperado en tiempo de ejecución.
4. **Multi-Agent Collaboration (Colaboración Multi-Agente):**
   - División de tareas complejas entre múltiples agentes con roles y personalidades claramente diferenciados (por ejemplo, Red Team vs. Blue Team, o Coder vs. Tester), permitiendo debates dialécticos para refinar soluciones complejas.

---

## 2. DeepLearning.AI & E2B — Building Coding Agents with Tool Execution
- **Institución:** DeepLearning.AI en colaboración con el equipo de E2B.
- **Acceso:** Gratuito en [deeplearning.ai/short-courses/building-coding-agents-with-tool-execution](https://www.deeplearning.ai/short-courses/building-coding-agents-with-tool-execution/).
- **Tesis Central:** Un agente de programación no puede ser evaluado únicamente por la sintaxis de su texto; su código debe ser ejecutado en un entorno seguro y aislado (*sandboxing*) para validar su comportamiento en tiempo real.

### Protocolos Técnicos de Ejecución
1. **Sandboxing Aislado en MicroVMs:**
   - Creación de entornos efímeros basados en contenedores ligeros o microVMs (Firecracker/Docker) que se inicializan en menos de 100 ms.
   - Protección contra bucles infinitos, comandos destructivos (`rm -rf`, caída de procesos de host) y agotamiento de memoria.
2. **Ciclo Interactivo de Ejecución de Código:**
   - El agente escribe código $\to$ se transmite al sandbox $\to$ se capturan `stdout`, `stderr` y códigos de salida $\to$ el agente analiza los logs de error $\to$ se aplican parches iterativos hasta obtener salida limpia.
3. **Manejo Dinámico de Paquetes y Dependencias:**
   - Detección de dependencias faltantes en tiempo de ejecución e instalación controlada en entornos virtuales aislados sin alterar el sistema operativo anfitrión.

---

## 3. Stanford University — CS329A / CS329Z: Engineering AI Agents & Self-Improving Systems
- **Institución:** Stanford AI Lab / Stanford Online.
- **Instructores:** Kian Katanforoosh, Andrew Ng, profesores invitados del ecosistema de Silicon Valley.
- **Acceso:** Transmisiones de conferencias y materiales abiertos en [cs329a.stanford.edu](https://cs329a.stanford.edu/) y canal de YouTube de Stanford Online.
- **Tesis Central:** La formalización de los agentes como **Compound AI Systems (Sistemas de IA Compuestos)** y el desarrollo de arquitecturas de auto-mejora continua (*self-improving loops*).

### Módulos Críticos del Currículum
1. **Compound Systems vs. Monolithic Models:**
   - Demostración matemática y empírica de que un sistema compuesto (orquestación, validación determinista, RAG híbrido y múltiples modelos especializados) supera de manera consistente a modelos monolíticos gigantescos con menor costo computacional.
2. **Reasoning, Planning & Tree Search:**
   - Análisis de arquitecturas de búsqueda en árboles de decisión (MCTS, LATS, ToT - Tree of Thoughts) para problemas de ingeniería donde las soluciones no son lineales.
3. **Harnesses de Evaluación y Benchmarks de Rigor:**
   - Cómo diseñar suites de evaluación automatizadas (evals) que previenen la regresión de comportamiento en sistemas agénticos cuando se actualizan prompts o modelos subyacentes.
4. **Auto-Mejora y Bucles de Retroalimentación:**
   - Protocolos para que un sistema registre heurísticas operativas a partir de ejecuciones previas exitosas o fallidas, retroalimentando la memoria de largo plazo sin reentrenamiento.

---

## 4. UC Berkeley — CS294-196: Agentic AI MOOC (Multi-Agent Systems in the Era of LLMs)
- **Institución:** Berkeley Center for Responsible, Decentralized Intelligence (RDI) & UC Berkeley EECS.
- **Instructores y Ponentes:** Dawn Song (UC Berkeley), Oriol Vinyals (Google DeepMind), Peter Stone (UT Austin / Sony AI), Clay Bavor et al.
- **Acceso:** Conferencias magistrales públicas y material de estudio en YouTube (Canal Berkeley RDI) y [rdi.berkeley.edu](https://rdi.berkeley.edu/).
- **Tesis Central:** Teoría de sistemas distribuidos, teoría de juegos y gobernanza en ecosistemas donde múltiples agentes de IA colaboran y compiten de forma autónoma.

### Pilares Teóricos del Programa de Berkeley
1. **Comportamiento Emergente en Sistemas Multi-Agente:**
   - Cómo evitar equilibrios subóptimos o fallos en cascada cuando agentes autónomos toman decisiones independientes sobre un estado compartido.
2. **Protocolos de Consenso y Verificación Formal:**
   - Técnicas criptográficas y de verificación formal aplicadas a los outputs de agentes: pruebas de validez, firmas digitales de estado y canales de comunicación auditables.
3. **Alineación Operativa y Seguridad Sistémica:**
   - Prevención de inyecciones de instrucciones (*indirect prompt injection*), límites de privilegios mínimos (Least Privilege Access) y cortafuegos de ejecución entre la entrada de usuarios no confiables y los comandos de terminal.
4. **Despliegue Industrial a Gran Escala:**
   - Estudios de caso sobre agentes desplegados en infraestructuras críticas, balanceo de carga entre proveedores de modelos y arquitecturas tolerantes a fallos con *fallback* autónomo.

---

## 5. WalkingLabs — Learn Harness Engineering
- **Institución:** WalkingLabs.
- **Acceso:** Open-source en GitHub ([`walkinglabs/learn-harness-engineering`](https://github.com/walkinglabs/learn-harness-engineering)).
- **Tesis Central:** *"The model is smart. The harness makes it reliable."* Los agentes de IA fracasan no por falta de capacidad de razonamiento del LLM, sino por falta de un arnés que constriña su espacio de búsqueda y verifique su trabajo de forma cerrada y determinista.

### Los Cinco Subsistemas del Arnés
1. **Instructions (Instrucciones con Revelación Progresiva):**
   - Reglas maestras concisas (`AGENTS.md`), habilidades modulares cargadas bajo demanda por YAML frontmatter y prohibición estricta de volcados masivos de contexto.
2. **State (Estado Persistido en Disco):**
   - Libros de registro (`STATUS.md`, `progress.md`, `temporal_ledger.json`) que permiten que el trabajo se reanude de forma continua a través de múltiples sesiones y tras la compactación de contexto.
3. **Verification (Compuertas de Verificación Deterministas):**
   - El código nunca se declara terminado sin evidencia observable de terminal (`verify-before-claim`). Ningún agente puede auto-aprobarse sin correr tests.
4. **Scope Control (Control de Alcance y Cambios Atómicos):**
   - Límite de modificaciones a $\le 300$ líneas por paso, protección de archivos críticos y trabajo en ramas o sandboxes aislados.
5. **Lifecycle & Control Systems (Sistemas de Control de Ciclo de Vida):**
   - Bucles cerrados automatizados: bucles de objetivo (*goal loops*), temporizadores de latencia y parejas *Maker-Checker* (un agente implementa, otro audita).

---

## 6. DeepLearning.AI — Building Agentic Workflows with LangGraph
- **Institución:** DeepLearning.AI en colaboración con LangChain.
- **Instructores:** Harrison Chase (CEO & Co-fundador de LangChain) y Rotem Weiss.
- **Acceso:** Gratuito en [deeplearning.ai/short-courses](https://www.deeplearning.ai/short-courses/).
- **Tesis Central:** Superar las cadenas lineales simples (DAGs) adoptando **grafos cíclicos con estado persistente**, permitiendo agentes con memoria a largo plazo, bucles de corrección y control humano en el bucle (*human-in-the-loop*).

### Módulos Técnicos Fundamentales
1. **Grafos Cíclicos y Máquinas de Estado:**
   - Modelado de nodos (acciones/llamadas a LLM) y aristas condicionales (enrutamiento según el estado devuelto). Capacidad de retroceder o reintentar sin romper el flujo.
2. **Persistencia y Time-Travel:**
   - Checkpointers a nivel de hilo (*threads*) que guardan el estado completo del grafo tras cada paso. Permite inspeccionar el árbol de razonamiento, reanudar tras caídas y "viajar en el tiempo" para bifurcar ejecuciones.
3. **Human-in-the-Loop:**
   - Primitivas `.interrupt()` para pausar la ejecución del agente antes de ejecutar acciones de alto riesgo (escritura en base de datos, compras, despliegues), solicitando validación o edición humana.
4. **Búsqueda Agéntica Estructurada:**
   - Integración con motores de búsqueda que devuelven estructuras de datos optimizadas para razonamiento en lugar de enlaces crudos.

---

## 7. DeepLearning.AI & CircleCI — Automated Testing for LLMs / LLMOps
- **Institución:** DeepLearning.AI en colaboración con CircleCI.
- **Instructor:** Rob Zuber (CTO de CircleCI).
- **Acceso:** Gratuito en [deeplearning.ai/short-courses](https://www.deeplearning.ai/short-courses/).
- **Tesis Central:** El desarrollo con LLMs requiere una transición del testing determinista tradicional a la **evaluación continua probabilística y semántica** integrada en pipelines de CI/CD.

### Conceptos Clave
1. **Testing Basado en Reglas vs. Evaluación Graduada por Modelos:**
   - *Reglas:* Validaciones deterministas de formato (JSON válido, longitud, palabras prohibidas, AST).
   - *Model-Graded Evals:* Uso de un modelo evaluador con rúbricas cuantitativas (G-Eval) para medir alucinaciones, tono, relevancia y fidelidad contextual.
2. **Evaluation Gates en CI/CD:**
   - Configuración de compuertas automatizadas en CircleCI o GitHub Actions que ejecutan suites de pruebas cada vez que se modifican prompts, modelos o datos, bloqueando regresiones antes de producción.
3. **Métricas de Fiabilidad Pass@k:**
   - Medición de la estabilidad de las respuestas del modelo ante variaciones semánticas y temperatura.

---

## 8. Supabase — Local Docker & Deterministic Migrations
- **Institución:** Supabase (Canal Oficial de YouTube & Documentación Técnica).
- **Tesis Central:** La administración de bases de datos para agentes e ingeniería moderna debe ser **Local-First, declarativa y 100% determinista**, eliminando la manipulación manual de consolas en la nube.

### Principios Operativos de la Factoría
1. **Schema as Code:**
   - Cada tabla, columna, política RLS y función se codifica en archivos SQL secuenciales e inmutables dentro del repositorio (`supabase/migrations/`).
2. **Aislamiento en Docker:**
   - Docker levanta una réplica idéntica de la base de datos de producción localmente en segundos, con todas las extensiones (`pgcrypto`, `pg_net`) y servicios de autenticación.
3. **Reseteo Determinista (`supabase db reset`):**
   - Comando que destruye la base de datos local y re-ejecuta todas las migraciones desde cero seguidas de `seed.sql`, garantizando que las pruebas agénticas siempre comiencen desde un estado limpio y predecible.
4. **Detección de Drift de Esquema (`supabase db diff`):**
   - Comparación automática entre el estado en vivo y los archivos de migración para capturar cambios no documentados.
