# Tratado Canónico: Compendio de Videocursos Universitarios e Industriales Gratuitos y Papers Seminales (SOTA 2026)

**Alcance:** Síntesis estructurada de los **Videocursos Gratuitos Más Completos y Actualizados (CMU, MIT, Stanford, Harvard, Google Chrome DevRel, Webflow GSAP University, Creative Shader Coding y Game Maker's Toolkit)** junto con los **Papers Seminales 2024–2026** aplicables a nuestra Web Software Factory. NO es fuente de precios de nube ni de reglas legales de sorteos.

---

## 1. Cátedras Universitarias Abiertas de Ingeniería de Sistemas, Bases de Datos y Seguridad

`[VERIFICADO: CMU 15-445/721 Andy Pavlo, MIT 6.858 Nickolai Zeldovich, Stanford CS25/CS324, Harvard CS50G]`

### 1.1 *CMU 15-445 & 15-721: Database Systems* (Prof. Andy Pavlo — Carnegie Mellon University)
- **Lecciones Clave para nuestra Software Factory (`Squad 2 & Squad 9`)**:
  1. **Buffer Pool & Localidad de Caché**: Mantener los índices calientes en memoria (`SQLite mmap / cache_size`) y evitar escaneos secuenciales completos (`SCAN TABLE`) mediante índices compuestos alineados con las cláusulas `WHERE` y `ORDER BY`.
  2. **Control de Concurrencia Optimista vs. Pesimista**: En cargas de trabajo de lectura intensiva y escritura corta (como marcadores en vivo y RAG), `WAL` con un escritor serializado y múltiples lectores sin bloqueo maximiza el rendimiento.
  3. **Compresión de Esquemas y Payloads**: Almacenar identificadores compactos y podar registros históricos caducados (retención de 90 días) mantiene los árboles B+ poco profundos ($O(\log N)$ con altura $\le 3$).

### 1.2 *MIT 6.858: Computer Systems Security* (Prof. Nickolai Zeldovich — MIT OpenCourseWare)
- **Lecciones Clave para nuestra Software Factory (`Squad 6`)**:
  1. **Principio de Mínimo Privilegio y Separación de Orígenes**: Cada componente externo (reproductor embebido, extensión de navegador, webhook, sub-agente) debe operar en un dominio de confianza mínimo y verificable.
  2. **Defensa Basada en Invariantes Verificables**: Las vulnerabilidades ocurren cuando el desarrollador asume que el cliente respetará las reglas de la UI. Toda invariante de seguridad (permisos de administrador, saldos, límites de tasa, firmas criptográficas) debe validarse en el borde del servidor (*Cloudflare Worker / Durable Object*).

### 1.3 *Stanford CS25 (Transformers & Agents) & CS324 (Compound AI Systems)*
- **Lecciones Clave para nuestra Software Factory (`Squad 9`)**:
  1. **Sistemas Compuestos de IA > Modelos Monolíticos**: Un modelo rápido (`Gemini 2.5 Flash`) acoplado a un recuperador léxico-semántico en C (`SQLite FTS5` + `ONNX Q8`), un verificador de código AST (`ast_guard.mjs`) y un crítico visual supera sistemáticamente a un modelo gigante sin herramientas.
  2. **Escalado en Tiempo de Inferencia (*Test-Time Compute / Speculative Verification*)**: Generar múltiples candidatos acotados y filtrarlos con un verificador determinista reduce las alucinaciones a casi cero.

---

## 2. Videocursos Industriales Oficiales de Desarrollo Web, Animaciones y Shaders (2025–2026)

### 2.1 *Google Chrome Developers Masterclass Series* (Una Kravets, Bramus Van Damme, Adam Argyle, Jake Archibald)
- **Módulo 1 — CSS Moderno sin JavaScript (*Una Kravets & Adam Argyle*)**:
  - Uso combinado de `@starting-style`, `transition-behavior: allow-discrete`, `interpolate-size: allow-keywords`, `anchor-name` / `position-anchor` y `color-mix(in oklch, ...)` para eliminar miles de líneas de código JS de posicionamiento y animación.
- **Módulo 2 — View Transitions & Scroll-Driven Animations (*Bramus Van Damme & Jake Archibald*)**:
  - Uso de `document.startViewTransition()` con `view-transition-name` dinámicos para interpolar estados entre pestañas o tarjetas a 60 FPS en el hilo compositor.
- **Módulo 3 — Optimización Profunda de `INP` y `LoAF` (*Chrome Speed Team*)**:
  - Identificación de *Long Animation Frames (`>50ms`)* con `PerformanceObserver`, delegación de trabajo no visual tras el pintado (`requestAnimationFrame(() => setTimeout(work, 0))`) y contención CSS (`contain: content`).

### 2.2 *Webflow University: Official Free GSAP 3.12+ Masterclass* (Cassie Evans & GreenSock Team)
- **Dominio del Patrón `GSAP Flip` (`First, Last, Invert, Play`)**:
  1. `const state = Flip.getState(targets)` captura las coordenadas actuales antes del cambio en el DOM.
  2. Se aplica el cambio de estructura DOM (ej. filtrar tarjetas de slots, mover un participante al cuadro de honor).
  3. `Flip.from(state, { duration: 0.35, ease: "power3.out", stagger: 0.03, absolute: true })` calcula e interpola las matrices `transform` en GPU sin reflujos intermedios.

### 2.3 *Creative Coding, WebGL & Shaders Masterclasses* (Kishimisu, SimonDev, Yuri Artiukh & Daniel Shiffman *The Nature of Code*)
- **Kishimisu (*An Introduction to Shader Art Coding*)**:
  - Construcción de paletas cosenoidales de Inigo Quilez (`palette(t) = a + b * cos(6.28318 * (c * t + d))`) con solo 4 vectores `vec3`, repetición espacial modular (`fract(uv * N) - 0.5`) y resplandor energético neon (`0.01 / abs(d)`).
- **Daniel Shiffman (*The Nature of Code* — Edición Abierta Web)**:
  - Vectores de velocidad y aceleración, fuerzas de atracción/fricción, osciladores armónicos y sistemas de partículas con reciclaje de objetos (*Object Pooling*) para lograr cero pausas del recolector de basura (*Zero GC Pauses*).

### 2.4 *Harvard CS50G & Game Maker's Toolkit (Mark Brown — "Secrets of Game Feel & UI Juice")*
- **La Anatomía del *UI Juice* Controlado**:
  - Todo evento significativo (ganar un duelo, abrir un cofre, subir en el ranking) debe activar una **tríada sincronizada en `<100ms`**:
    1. **Impulso Cinético**: Compresión elástica rápida y rebote amortiguado.
    2. **Respuesta Lumínica**: Destello especular perimetral de corta duración (`250ms`).
    3. **Firma Acústica Armónica**: Acorde ascendente o percusión cristalina con paneo estéreo según la posición horizontal del elemento en la pantalla.
    
---

## 3. Síntesis de Papers Seminales de Vanguardia (2024–2026)

| Paper / Publicación | Autores / Institución | Aporte Técnico Implementado en nuestra Software Factory |
| :--- | :--- | :--- |
| ***Design2Code: Benchmarking Multimodal Code Generation*** | Stanford / ACL (2024–2025) | Evaluación semántica de interfaces generadas comparando estructura visual, fidelidad de color, posición de bloques y legibilidad mediante VLMs. |
| ***UI2Code-N: Test-Time Scaling for Interactive UI Polish*** | 2025 | Bucle iterativo donde el agente renderiza su código en navegador real, captura la imagen, recibe crítica estructurada del VLM y pule el CSS antes de entregar. |
| ***Speculative RAG: Enhancing Retrieval Augmented Generation through Drafting*** | Google Research (Wang et al., 2024–2025) | División del trabajo entre múltiples *Drafters* paralelos sobre subconjuntos de documentos y un *Verifier* único que maximiza la fidelidad y corta la latencia un 50%. |
| ***LightRAG & HippoRAG (Personalized PageRank)*** | HKU / OSU (2024–2025) | Recuperación de doble nivel (entidades específicas + temas globales) combinada con difusión de relevancia por grafos de enlaces (`PageRank`). |
| ***TextGrad: Automatic "Differentiation" via Text*** | Stanford (Yuksekgonul et al., 2024–2025) | Retropropagación de críticas en lenguaje natural a través de grafos de agentes para optimizar automáticamente instrucciones y `SKILL.md`. |
| ***Darwin Gödel Machine: Open-Ended Evolution of Self-Improving Agents*** | Sakana AI & UBC (2025) | Evolución empírica de herramientas y código de agentes validada contra suites de evaluación deterministas en sandboxes aislados. |
| ***SkillSmith: Automated Skill Synthesis & Surrogate Verification*** | 2026 | Co-evolución de habilidades modulares validadas por un verificador sustituto que registra *nogoods* (contra-instintos) ante cualquier regresión. |

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #architecture_and_books
