# Canon: Fundamental Books on Software Factories & AI Engineering (2026)

## 1. Software Factories: Assembling Applications with Patterns, Models, Frameworks, and Tools
- **Autores:** Jack Greenfield, Keith Short, Steve Cook, John Crupi (John Wiley & Sons, 2004).
- **Enfoque Principal:** Fundamento teórico de la industrialización del desarrollo de software mediante software product lines (SPL), model-driven development y economías de alcance.

### Principios Fundamentales para la Era Agéntica
1. **La Falsa Economía de Escala vs. La Verdadera Economía de Alcance:**
   - La industria clásica asumió erróneamente que la productividad crecía estandarizando procesos humanos burocráticos genéricos (CMMI, RUP) aplicables a cualquier software. Greenfield y Short demostraron que la verdadera eficiencia proviene de las **economías de alcance (*economies of scope*)**: especializar la línea de ensamblado para producir rápidamente variantes de una familia de productos estrechamente relacionados (como nuestra suite de casino, widgets y overlays para streamers).
2. **La Tríada de la Fábrica de Software:**
   - **Schema (El Plano):** El modelo arquitectónico que define qué componentes existen, cómo interactúan y qué contratos de interfaz son obligatorios.
   - **Template (Los Ingredientes):** La colección reutilizable de patrones arquitectónicos probados, snippets de código, linters, scripts de inicialización y directrices de diseño.
   - **Extensible Environment (El Taller):** El entorno integrado que automatiza la línea de ensamblado y verifica el cumplimiento de las restricciones.
3. **DSLs Ejecutables vs. Documentación Pasiva:**
   - Critica los diagramas de arquitectura pasivos que envejecen y divergen del código real. En su lugar, aboga por **Lenguajes Específicos de Dominio (DSLs)** y modelos que sean directamente ejecutables por la maquinaria de la fábrica. En la era agéntica, estos DSLs corresponden a especificaciones en Markdown estructurado, esquemas JSON y tipos TypeScript estrictos.

---

## 2. Software Engineering at Google: Lessons Learned from Programming Over Time
- **Autores:** Titus Winters, Tom Manshreck, Hyrum Wright (O'Reilly Media, 2020).
- **Enfoque Principal:** La ingeniería de software como disciplina diferenciada de la programación pura por tres dimensiones críticas: **Tiempo, Escala y Trade-offs**.

### Lecciones Vitales Aplicadas a Equipos Agénticos
1. **Diferencia entre Programar y Hacer Ingeniería de Software:**
   - *Programar* es escribir código que funciona hoy para resolver un problema inmediato.
   - *Ingeniería de Software* es escribir código que puede mantenerse, evolucionar y ser reparado a lo largo de meses y años por diferentes entidades o agentes sin degradarse ni acumular deuda técnica insostenible.
2. **La Ley de Hyrum (Hyrum's Law):**
   > *"Con un número suficiente de usuarios de una API, no importa lo que prometas en el contrato: todos los comportamientos observables de tu sistema serán dependidos por alguien."*
   - En una fábrica agéntica, los agentes deben asumir la Ley de Hyrum: cualquier cambio interno en funciones o eventos (por ejemplo, WebSockets o broadcasts) debe preservar los invariantes de interfaz para no quebrar overlays o módulos satélite.
3. **Disciplina Inviolable de Pruebas Automatizadas:**
   - La regla interna de Google: *"If you liked it, you should have put a test on it."*
   - En una fábrica agéntica, **ninguna afirmación de completitud es válida sin una prueba automatizada ejecutada en terminal**. La suite de pruebas es la única garantía contra la degradación del sistema.
4. **Transformaciones a Gran Escala (LSC - Large-Scale Changes):**
   - Cómo refactorizar miles de archivos automáticamente usando herramientas de análisis sintáctico abstracto (AST) en lugar de búsquedas manuales con expresiones regulares propensas a errores.

---

## 3. AI Engineering: Building Applications with Foundation Models
- **Autor:** Chip Huyen (O'Reilly Media, 2024/2025).
- **Enfoque Principal:** La transición de la investigación de modelos de lenguaje (LLMs) a la ingeniería de sistemas de producción robustos, predecibles y de alta disponibilidad.

### Conceptos Clave para la Arquitectura de Fábrica
1. **Compound AI Systems (Sistemas de IA Compuestos):**
   - El estado del arte no depende de crear un "modelo gigante perfecto", sino de construir **sistemas compuestos** que integran múltiples llamadas a modelos más pequeños y rápidos, herramientas de ejecución deterministas (Node.js, SQLite, linters), recuperadores de información (RAG) y validadores sintácticos.
2. **RAG Híbrido Multimodal (Dense + Sparse Retrieval):**
   - La combinación óptima entre búsqueda léxica (BM25 / MiniSearch para coincidencias exactas de identificadores y nombres de funciones) y búsqueda semántica densa (vectores en Qdrant para sinónimos y conceptos abstractos), unificados mediante **Reciprocal Rank Fusion (RRF)**.
3. **Sistemas de Evaluación Continua (Evals):**
   - Desacoplar la evaluación en dos niveles:
     - *Evals a Nivel de Tarea:* Pruebas unitarias deterministas, tiempo de respuesta y consumo de recursos.
     - *Evals a Nivel de Calidad Semántica:* Jueces LLM ciegos (FairEval) evaluando la coherencia, el tono y la completitud mediante rúbricas objetivas.
4. **Mitigación de Latencia y Presupuesto de Contexto (FinOps Agéntico):**
   - Minimizar la ventana de contexto mediante resumen progresivo, chunking semántico jerárquico y llamadas directas por API en lugar de saturar el contexto con volcados masivos de datos.

---

## 4. Building Evolutionary Architectures: Automated Software Governance (2nd Edition)
- **Autores:** Neal Ford, Rebecca Parsons, Patrick Kua (O'Reilly Media, 2023).
- **Enfoque Principal:** El diseño de arquitecturas de software capaces de adaptarse a cambios tecnológicos constantes sin perder sus características estructurales críticas.

### Las Funciones de Aptitud Arquitectónicas (Architectural Fitness Functions)
1. **Definición de Fitness Function:**
   - Cualquier mecanismo automatizado que proporciona una evaluación objetiva de la integridad de una característica arquitectónica (modularidad, rendimiento, seguridad, consumo de CPU).
2. **Aplicación en Fábricas Agénticas:**
   - En lugar de confiar en que un agente recordará todas las reglas de diseño (por ejemplo, *"los overlays deben consumir ≤5% de CPU"* o *"las llamadas de audio no deben usar MP3s pesados"*), se escriben **Fitness Functions automatizadas**:
     - Tests que auditan que no existan llamadas a `fetch()` de archivos `.mp3` en los scripts de overlays.
     - Tests que verifiquen que ninguna vista del frontend rompa la jerarquía semántica o cause desbordamiento horizontal.
     - Pruebas que midan el tiempo de ejecución de las consultas a SQLite para garantizar que se mantengan por debajo de 5 milisegundos.
   - Las Fitness Functions actúan como el sistema inmunológico permanente de la fábrica agéntica.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #architecture_and_books
