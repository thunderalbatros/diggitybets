# Canon & Architecture: Autonomous AI Software Factory (2026)

## 1. Fundamentos y Origen: Del Paradigma Industrial a los Agentes LLM
El concepto de **Software Factory** surge formalmente en 2004 con la obra de Jack Greenfield, Keith Short, Steve Cook y John Crupi (*Software Factories: Assembling Applications with Patterns, Models, Frameworks, and Tools*, Wiley). El objetivo central fue desmantelar la "artesanía manual" del software en favor de una verdadera **industrialización basada en economías de alcance (*economies of scope*)**: líneas de producción estandarizadas que generan familias completas de software.

En la era moderna de LLMs y sistemas multi-agente, la fábrica de software se compone de:
1. **Schema:** Especificaciones técnicas, contratos de tipos (TypeScript, JSON Schema) y registros de decisiones arquitectónicas (ADRs).
2. **Template:** Procedimientos operativos estandarizados (SOPs), reglas de diseño (`AGENTS.md`, `DESIGN.md`), tablas de anti-atajos y catálogos de componentes.
3. **Línea de Ensamblado Agéntica:** División estricta del trabajo entre subagentes especializados gobernados por máquinas de estado y Quality Gates.

---

## 2. Los Cinco Pilares de la Fábrica de Software Agéntica

### Pilar 1: Percepción Estructural del Repositorio (RepoMap & AST Parsing)
- **RepoMap (Aider / Paul Gauthier):** Uso de **Tree-sitter** para extraer el Concrete Syntax Tree (CST/AST) de clases, métodos, imports y dependencias, complementado con el algoritmo **PageRank** sobre el grafo de llamadas. Permite mapear repositorios completos en menos de 1,024 tokens.
- **AutoCodeRover (ISSTA 2024):** Navegación semántica guiada por AST para localizar de forma quirúrgica dónde se debe intervenir en el código sin relying en búsquedas regex planas.

### Pilar 2: Razonamiento, Planificación y Búsqueda de Decisiones
- **LATS (Language Agent Tree Search - ICML 2024):** Integración de Monte Carlo Tree Search (MCTS) con LLMs, permitiendo evaluar múltiples ramas de implementación, realizar *backtracking* ante fallos en tests y acumular reflexión verbal (Reflexion, NeurIPS 2023).
- **Agentless (Xia et al., 2024):** Demostración de que un pipeline estructurado de dos fases desacopladas (*Localización jerárquica $\to$ Reparación directa*) supera a los agentes basados en loops interactivos complejos y erráticos, a una fracción del costo.

### Pilar 3: Especialización de Roles y División del Trabajo
- **MetaGPT (ICLR 2024 Oral):** *"Code = SOP (Team)"*. Codificación de Standard Operating Procedures para roles de Product Manager, System Architect, Project Manager, Developer y QA Reviewer.
- **AgentCoder (Huang et al., 2024):** Desacoplamiento estricto de TDD:
  1. *Test Designer Agent:* Escribe casos de prueba independientes a partir de la especificación técnica.
  2. *Programmer Agent:* Implementa la lógica de código.
  3. *Test Executor Agent:* Ejecuta las pruebas en un sandbox y reporta trazas objetivas sin sesgo de confirmación.

### Pilar 4: Entornos Aislados y GitOps Continuo
- **Git Worktrees (`agent-worktree`):** Ejecución paralela en ramas efímeras de Git sin bloquear ni contaminar el entorno del desarrollador humano.
- **GitHub Agentic Workflows (`gh-aw` - GitHub Next / Microsoft Research):** Especificación de automatizaciones agénticas en Markdown con frontmatter YAML compiladas a GitHub Actions para triage de issues, remediación automática de fallos de CI ("CI Doctor") y mantenimiento continuo del repositorio.

### Pilar 5: Quality Gates y Evaluación Ciega (Evals & Blind Judges)
- **Regla del Doble Revisor:** Ningún agente programador aprueba su propio código; se requiere validación por análisis estático/seguridad y ejecución de tests.
- **Jueces Ciegos (FairEval / promptfoo):** Evaluación imparcial del comportamiento del sistema y cumplimiento de directivas de estilo sin sesgo del modelo.

---

## 3. Repositorios y Proyectos Esenciales
- **MetaGPT (`geekan/MetaGPT`):** Framework multi-agente basado en SOPs corporativos.
- **OpenHands (`All-Hands-AI/OpenHands`):** Agente generalista autónomo con terminal, navegador y Docker.
- **SWE-agent (`SWE-agent/SWE-agent`):** Interfaz ACI (Agent-Computer Interface) para resolución de issues en SWE-bench.
- **Aider (`paul-gauthier/aider`):** Pair programming agéntico con RepoMap y commits atómicos.
- **Agentless (`OpenAutoCoder/Agentless`):** Pipeline minimalista de alta precisión para SWE-bench.
- **GitHub Agentic Workflows (`github/gh-aw`):** Automatización de repositorios basada en agentes compilados a GitHub Actions.
- **ChatDev (`OpenBMB/ChatDev`):** Simulación de empresa de software con cadenas de chat en cascada.
- **E2B (`e2b-dev/E2B`):** Sandboxes seguros y efímeros de ejecución de código para agentes.

---

## 4. Libros y Cursos Académicos de Alta Confianza
- **Libros Seminales:**
  - *Software Factories* (Jack Greenfield, Keith Short, Steve Cook, John Crupi — Wiley, 2004).
  - *Software Engineering at Google* (Titus Winters, Tom Manshreck, Hyrum Wright — O'Reilly).
  - *AI Engineering* (Chip Huyen — O'Reilly, 2024/2025).
  - *Building Evolutionary Architectures* (Neal Ford, Rebecca Parsons, Patrick Kua — O'Reilly).
- **Cursos Universitarios & Especializados Gratuitos:**
  - *Agentic AI* & *Building Coding Agents with Tool Execution* — DeepLearning.AI.
  - *Stanford CS329A / CS329Z: Engineering AI Agents & Self-Improving Systems* — Stanford Online / YouTube.
  - *UC Berkeley CS294-196: Agentic AI MOOC* — Berkeley RDI / YouTube.
