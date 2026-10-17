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
