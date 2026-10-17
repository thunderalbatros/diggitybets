# Canon: Seminal Academic Papers on Agentic Software Engineering (2026)

## 1. MetaGPT: Meta Programming for a Multi-Agent Collaborative Framework
- **Autores:** Sirui Hong, Mingchen Zhuge, Jonathan Chen, Xiawu Zheng, Cheng Cheng, Ceyao Zhang, Jinlin Wang, Zili Wang, Steven Hoi, Chenglin Wu (ICLR 2024 Oral).
- **Referencia:** [arXiv:2308.00352](https://arxiv.org/abs/2308.00352).
- **Tesis Central:** *"Code = SOP (Team)"*. Los sistemas multi-agente basados en diálogo libre no estructurado degeneran rápidamente debido a la acumulación de ruido conversacional ("hallucination cascade"). La solución es codificar **Procedimientos Operativos Estandarizados (SOPs)** que estructuran el intercambio de información entre roles a través de diagramas y documentos formales.

### Arquitectura de Roles y Flujo de Trabajo
1. **Product Manager (PM):** Recibe la idea inicial y genera el **PRD (Product Requirement Document)** estructurado: historias de usuario, requisitos funcionales/no-funcionales y criterios de aceptación.
2. **Architect:** Toma el PRD y genera la **Especificación de Arquitectura**: diseño de interfaces, diagramas de clases UML, diagramas de secuencia e identificación de dependencias externas.
3. **Project Manager:** Divide la arquitectura en tareas de implementación atómicas (WBS - Work Breakdown Structure) asignando prioridades y dependencias entre archivos.
4. **Engineer:** Implementa el código fuente archivo por archivo, respetando los contratos de tipos y las firmas de funciones dictadas por el Arquitecto.
5. **QA / Tester:** Genera suites de pruebas unitarias basadas en los criterios de aceptación del PRD y reporta trazas de error al Ingeniero para remediación.

### Mecanismos de Reducción de Ruido
- **Publicación/Suscripción con Memoria Estructurada:** Los agentes no se pasan todo el historial de chat; en su lugar, publican artefactos formalizados en un entorno de memoria compartida (*Environment*). Los agentes observadores se suscriben únicamente a los tipos de artefactos relevantes para su rol.
- **Contratos de Datos Inmutables:** Los diagramas de secuencia y esquemas JSON actúan como límites duros que el código generado debe respetar, eliminando la deriva sintáctica.

---

## 2. SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering
- **Autores:** John Yang, Carlos E. Jimenez, Alexander Wettig, Kilian Lieret, Shunyu Yao, Karthik Narasimhan, Ofir Press (Princeton University / NeurIPS 2024).
- **Referencia:** [arXiv:2405.15793](https://arxiv.org/abs/2405.15793).
- **Tesis Central:** Los entornos de terminal estándar diseñados para humanos (como `bash` interactivo no acotado) provocan desbordamiento de contexto y errores operativos en LLMs. Para resolver issues de ingeniería de software en repositorios masivos, se requiere una **Agent-Computer Interface (ACI)** diseñada específicamente para modelos de lenguaje.

### Principios de Diseño de la ACI
1. **Navegación y Visualización Acotada (Windowing):**
   - El comando `open_file` o `view` nunca devuelve miles de líneas de golpe; utiliza una ventana deslizante de 100 líneas con números de línea relativos y marcadores claros.
2. **Edición Quirúrgica de Archivos:**
   - En lugar de reescribir archivos completos (lo que induce alucinaciones y consume tokens excesivos), SWE-agent proporciona comandos de reemplazo por bloque con verificación estricta de cadenas de coincidencia única (`edit <start> <end> <replacement>`).
3. **Búsqueda Estructurada en Repositorio:**
   - Proporciona comandos dedicados `find_file` y `search_dir` (basados en ripgrep) con límites de salida y paginación para evitar la saturación de tokens de atención.
4. **Historial de Comandos Condensado:**
   - Las salidas excesivamente largas de compiladores o linters se truncan automáticamente reteniendo los primeros y últimos mensajes de error clave.

---

## 3. SWE-bench: Can Language Models Resolve Real-World GitHub Issues?
- **Autores:** Carlos E. Jimenez, John Yang, Alexander Wettig, Shunyu Yao, Kexin Pei, Ofir Press, Karthik Narasimhan (Princeton University / ICLR 2024).
- **Referencia:** [arXiv:2310.06770](https://arxiv.org/abs/2310.06770).
- **Tesis Central:** Los benchmarks sintéticos tradicionales (HumanEval, MBPP) evalúan funciones aisladas de 10 líneas que no reflejan la complejidad de la ingeniería de software real. **SWE-bench** introduce una suite de evaluación rigurosa basada en **2,294 issues reales de GitHub** extraídos de 12 proyectos populares de código abierto (Django, SymPy, scikit-learn, etc.).

### Metodología de Evaluación
1. **Entrada al Agente:** La descripción exacta de un issue de GitHub (reporte de bug o solicitud de feature) y el árbol del repositorio clonado en el commit previo a la solución.
2. **Tarea del Agente:** Localizar el problema a través de múltiples archivos, entender dependencias cruzadas, escribir un parche `git diff` y validar que solucione el issue sin romper funcionalidad previa.
3. **Validación Inviolable:**
   - Se aplican las pruebas que existían antes del parche (**PASS_TO_PASS**). Todas deben seguir pasando (cero regresiones).
   - Se aplican las pruebas unitarias que los mantenedores humanos escribieron para validar el bugfix (**FAIL_TO_PASS**). Deben pasar todas en verde.
4. **Variantes Oficiales:**
   - *SWE-bench Lite (300 instancias):* Subconjunto balanceado para evaluación rápida y reproducible.
   - *SWE-bench Verified (500 instancias):* Instancias auditadas por ingenieros humanos para eliminar ambigüedades en las descripciones de issues.

---

## 4. LATS: Language Agent Tree Search Unifies Reasoning, Acting, and Planning
- **Autores:** Andy Zhou, Kai Yan, Michal Shlapentokh-Rothman, Haohan Wang, Yu-Xiong Wang (UIUC / ICML 2024).
- **Referencia:** [arXiv:2310.04406](https://arxiv.org/abs/2310.04406).
- **Tesis Central:** Los agentes basados en patrones lineales como ReAct toman decisiones irreversibles; si una acción inicial falla o se desvía, el agente queda atrapado en un bucle destructivo. **LATS** unifica el razonamiento (CoT), la acción (tool-use) y la planificación sistemática adaptando **Monte Carlo Tree Search (MCTS)** a los modelos de lenguaje.

### Ciclo de 4 Etapas de LATS
1. **Selección (Selection):**
   - Navega por el árbol de decisiones desde la raíz usando el criterio **UCT (Upper Confidence bounds applied to Trees)**:
     $$UCT(s, a) = Q(s, a) + c \cdot \sqrt{\frac{\ln N(s)}{N(s, a)}}$$
     Balancea la explotación de caminos de alta recompensa con la exploración de ramas prometedoras.
2. **Expansión (Expansion):**
   - El LLM genera $k$ posibles acciones o hipótesis de código alternativas para el nodo seleccionado.
3. **Evaluación y Simulación (Evaluation):**
   - Ejecuta las acciones en el entorno externo (por ejemplo, compilador o ejecutor de pruebas unitarias).
   - El agente genera una **reflexión verbal** sobre el resultado: si los tests fallaron, describe el motivo exacto del fallo y calcula una puntuación heurística de valor $V(s)$.
4. **Retropropagación (Backpropagation):**
   - La recompensa numérica y el feedback reflexivo se propagan hacia atrás a través de todos los nodos ancestros del árbol, actualizando las visitas $N(s)$ y los valores medios $Q(s)$.
   - Si una rama conduce a un callejón sin salida (error irrecuperable), LATS retrocede (*backtracking*) y explora la siguiente mejor alternativa.

---

## 5. AgentCoder: Multi-Agent Code Generation with Iterative Testing and Optimization
- **Autores:** Dong Huang, Qingwen Bu, Jie M. Zhang, Michael Luck, Heming Cui (2024).
- **Referencia:** [arXiv:2312.13010](https://arxiv.org/abs/2312.13010).
- **Tesis Central:** Cuando un único agente genera código y diseña sus propias pruebas, incurre en un severo **sesgo de confirmación** (escribe tests diseñados para pasar su propia lógica sesgada en lugar de verificar la especificación original). AgentCoder desacopla radicalmente el proceso en un equipo multi-agente colaborativo de 3 roles.

### Tríada Operativa de AgentCoder
1. **Programmer Agent:**
   - Genera el código fuente inicial guiado estrictamente por los requerimientos funcionales. No tiene permitido diseñar ni modificar las pruebas unitarias.
2. **Test Designer Agent:**
   - Opera de forma totalmente independiente del programador. Lee únicamente los requerimientos y genera casos de prueba exhaustivos con valores límite, entradas atípicas y condiciones de fallo.
3. **Test Executor Agent:**
   - Ejecuta el código del Programador contra las pruebas del Diseñador de Pruebas dentro de un sandbox aislado. Si ocurre un fallo, recopila la salida estándar, el stderr y el stack trace exacto, y lo envía al Programador para que este reescriba su código en la siguiente iteración.
- **Resultado Demostrado:** Aumenta la precisión de generación de código funcional entre un 25% y un 38% sobre agentes monolíticos, eliminando los tests triviales o auto-complacientes.

---

## 6. Agentless: Demystifying LLM-based Software Engineering Agents
- **Autores:** Chunqiu Steven Xia, Yinlin Deng, Soren Dunn, Lingming Zhang (UIUC, 2024).
- **Referencia:** [arXiv:2407.01489](https://arxiv.org/abs/2407.01489).
- **Tesis Central:** Demuestra una crítica demoledora a la tendencia de diseñar agentes con herramientas infinitas y loops de razonamiento descontrolados. Un pipeline determinista, interpretable y estructurado de dos fases puede superar a agentes autónomos complejos en SWE-bench con una fracción de costo y tiempo.

### Pipeline de 2 Fases de Agentless
1. **Fase 1: Localización Jerárquica:**
   - *Nivel Archivo:* Filtra los archivos del repositorio potencialmente relacionados con el issue utilizando el esqueleto del proyecto.
   - *Nivel Símbolo/Función:* Analiza clases y funciones dentro de los archivos candidatos para identificar el contexto culpable.
   - *Nivel Línea:* Determina el bloque específico de líneas de código que debe ser modificado.
2. **Fase 2: Reparación Directa y Filtrado:**
   - El modelo recibe el contexto localizado y genera múltiples candidatos de parche (*git diff*).
   - Los parches se compilan y se ejecutan contra la suite de pruebas existente del repositorio.
   - Se descartan parches que introduzcan errores de sintaxis o regresiones, seleccionando el parche más limpio mediante votación o juez sintáctico.

---

## 7. Reflexion: Language Agents with Verbal Reinforcement Learning
- **Autores:** Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik Narasimhan, Shunyu Yao (Northeastern University / Princeton / NeurIPS 2023).
- **Referencia:** [arXiv:2303.11366](https://arxiv.org/abs/2303.11366).
- **Tesis Central:** El aprendizaje por refuerzo tradicional requiere costosos ajustes de pesos de gradiente. **Reflexion** introduce el **Refuerzo Verbal**, donde los agentes de lenguaje aprenden mediante retroalimentación introspectiva almacenada como memoria episódica en lenguaje natural.

### Componentes de la Arquitectura Reflexion
1. **Actor:** El agente que genera acciones y herramientas en el entorno (ejecuta código o comandos).
2. **Evaluator:** Asigna una recompensa escalar o un veredicto binario (éxito/fracaso de las pruebas unitarias o del linter).
3. **Self-Reflection Model:** Si la tarea falla, un subagente evalúa la discrepancia entre el objetivo y el resultado obtenido, redactando una lección introspectiva:
   > *"Planifiqué modificar la variable X directamente, pero el linter falló porque X es inmutable. En el próximo intento debo instanciar un nuevo objeto con el valor actualizado."*
4. **Memory Buffer:** La lección aprendida se inyecta en el prompt del siguiente intento como contexto operativo. Esto permite al agente autocorregirse en 2 o 3 intentos sin necesidad de reentrenamiento.
