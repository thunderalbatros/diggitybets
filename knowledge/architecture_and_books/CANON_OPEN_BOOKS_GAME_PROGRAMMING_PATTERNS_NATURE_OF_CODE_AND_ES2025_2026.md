# Tratado Canónico de Libros Abiertos: Game Programming Patterns (Nystrom), The Nature of Code (Shiffman), Exploring JS ES2025 (Rauschmayer), Crafting Interpreters & WebGL2 Fundamentals (2026)

**Alcance:** Aplicable a la arquitectura de juegos interactivos y overlays (`overlay-*`, `wheel-*`, `site/js/house-games.js`, `site/js/motion-fx.js`), optimización del motor V8 de JavaScript (`site/js/`, `worker/index.js`), parsers léxicos/AST de comandos de Kick (`tools/intelligence/ast_guard.mjs`) y físicas procedimentales 2D/3D. Prohibido crear objetos efímeros dentro de bucles `requestAnimationFrame` a 60 FPS; usar siempre el patrón `Object Pool` y `Dirty Flag`.

---

## 1. *Game Programming Patterns* — Robert Nystrom (Ingeniería de Motores Interactivos y Overlays a 60 FPS)

### 1.1 Patrón *Object Pool* (Cero Pausas de *Garbage Collector* en OBS)
- **Problema**: Cuando un espectador gana un sorteo o cae un multiplicador alto en una slot, instanciar `new Particle()` o `new Coin()` 300 veces por segundo fragmenta la memoria del motor V8 y dispara pausas de *Major GC (Mark-Sweep-Compact)* de `18ms–45ms`, causando tirones visibles (*stutter*) en OBS Studio.
- **Solución Matemática y Arquitectónica**:
  1. Pre-asignar al inicio un arreglo fijo de tamaño $N$ (`const pool = new Float32Array(MAX_PARTICLES * 8)` o un arreglo de objetos reutilizables con flag `active = false`).
  2. Mantener un puntero `firstAvailable` (*Free List* intrusiva en $O(1)$) para activar y reciclar partículas sin invocar jamás al recolector de basura.

### 1.2 Patrón *Dirty Flag* (Eliminación de Recálculos Redundantes en el DOM y Canvas)
- **Mecánica**:
  - Un componente o escena compleja (como las líneas conectoras SVG del *Bracket de Torneo* o el buffer estático de una ruleta) mantiene un booleano `isDirty = true`.
  - Las mutaciones de estado solo marcan `this.isDirty = true`.
  - El bucle de renderizado (`requestAnimationFrame`) consulta `if (!this.isDirty) return;` antes de tocar el DOM o redibujar el `<canvas>` oculto (*Offscreen Buffer*), reduciendo el uso de CPU en reposo a **`0.0%`**.

### 1.3 Patrón *Game Loop* con Paso de Tiempo Fijo y Renderizado Interpolado ($\Delta t$ Clamping)
- **Invariante de Independencia de Hercios (`60 Hz` vs `144 Hz` vs `240 Hz`)**:
  - Nunca actualizar posiciones con `x += vx` por fotograma crudo.
  - Acumular el tiempo real transcurrido $\Delta t = \min(\text{now} - \text{lastTime}, 0.1\text{ s})$ (el tope de `100ms` evita la *"espiral de la muerte"* cuando la pestaña vuelve de estar oculta en segundo plano) e interpolar el estado visual con $\alpha = \text{accumulator} / \text{FIXED\_STEP}$.

### 1.4 Patrón *Command* y *Event Queue* (Determinismo en Juegos *Crowd-Play*)
- Cada acción de un espectador en el chat de Kick (`!bet`, `!mine`, `!cashout`, `!sr`) se encapsula como un objeto comando inmutable `{ id, userId, command, payload, timestamp }` encolado en un *Ring Buffer* desacoplado de la vista, permitiendo validación por lotes, auditoría *Provably Fair* y reproducción determinista.

---

## 2. *The Nature of Code (2024 JavaScript Remix)* — Daniel Shiffman (Físicas Naturales y Sistemas Generativos)

### 2.1 Ley de Hooke y Resortes Físicos Amortiguados ($\vec{F}_{\text{spring}} = -k \cdot \vec{x} - c \cdot \vec{v}$)
- La fuerza restauradora de cualquier elemento elástico en la interfaz (cartas, ruletas, indicadores de impacto) obedece la ecuación diferencial de segundo orden:
  $$\vec{a}(t) = \frac{-k \cdot (\vec{x}(t) - \vec{x}_{\text{target}}) - c \cdot \vec{v}(t)}{m}$$
- **Integración Semi-Implícita de Euler (Estable a 60 FPS)**:
  1. Actualizar primero la velocidad: $\vec{v}_{t+1} = \vec{v}_t + \vec{a}_t \cdot \Delta t$
  2. Actualizar luego la posición usando la nueva velocidad: $\vec{x}_{t+1} = \vec{x}_t + \vec{v}_{t+1} \cdot \Delta t$
  - A diferencia del Euler explícito clásico (que gana energía artificialmente y explota), el **Euler Semi-Implícito** conserva la energía simpléctica y converge suavemente al reposo.

### 2.2 Comportamientos de Dirección Autónoma (*Craig Reynolds Steering Behaviors*)
- **Fórmula de *Arrive* (Llegada Suave de Monedas `$DIG` hacia la Billetera del Usuario)**:
  $$\vec{F}_{\text{steer}} = \vec{v}_{\text{desired}} - \vec{v}_{\text{current}}, \quad \|\vec{v}_{\text{desired}}\| = v_{\max} \cdot \text{clamp}\left(\frac{d}{R_{\text{slowing}}}, 0, 1\right)$$
  - Cuando una lluvia de monedas vuela desde el centro de la pantalla hacia el contador de saldo `$DIG` del espectador, reducir la velocidad deseada proporcionalmente dentro del radio $R_{\text{slowing}}$ produce un aterrizaje orgánico y magnético digno de un juego AAA.

---

## 3. *Exploring JavaScript (ES2025)* & *Deep JS* — Dr. Axel Rauschmayer (Optimización del Motor V8)

### 3.1 Clases Ocultas de V8 (*Shapes / Hidden Classes*) y *Inline Caches (ICs)*
- **Invariante Monomórfico**:
  - Inicializar **siempre todas las propiedades** de un objeto en el mismo orden dentro de su constructor o fábrica literal (`{ id: '', user: '', amount: 0, multiplier: 1 }`), y nunca usar `delete obj.prop` (usar `obj.prop = null`).
  - Esto mantiene una única *Hidden Class (Shape)* en V8, permitiendo que los *Inline Caches* ejecuten accesos a propiedades en **1 instrucción de máquina** en lugar de caer en diccionarios lentos (*Megamorphic IC*).

### 3.2 Nuevas Primitivas Nativas `ES2024 / ES2025` de Alto Rendimiento
- **`Object.groupBy(items, callback)`**: Agrupación nativa en C++ para clasificar bonos por proveedor o solicitudes por estado sin librerías externas.
- **`Set.prototype.intersection()`, `difference()`, `union()`**: Operaciones matemáticas de conjuntos en $O(\min(|A|, |B|))$ para cruzar participantes activos del chat de Kick con usuarios verificados.
- **`Promise.withResolvers()`**: Control limpio de promesas diferidas en colas de animación y reconexiones WebSocket.

---

## 4. *Crafting Interpreters* — Robert Nystrom & *WebGL2 Fundamentals*

### 4.1 Escaneo Léxico en Una Sola Pasada (*Single-Pass Scanner*) para Comandos de Chat
- En lugar de encadenar 25 expresiones regulares complejas sobre cada mensaje del chat de Kick (que arriesgan *Catastrophic Backtracking / ReDoS*), un *Scanner* de puntero único (`start`, `current`, `peek()`) extrae el comando (`!sr`, `!guess`, `!bounty`) y sus argumentos en tiempo estrictamente lineal **$O(n)$** con límite duro de longitud (`<= 300 chars`).

### 4.2 Renderizado Instanciado (*Instanced Drawing*) y *Offscreen Buffers*
- Cuando se dibujan decenas de elementos repetidos en 2D/WebGL (como las divisiones de una ruleta o monedas `$DIG`), pre-renderizar la geometría/textura una sola vez en un `<canvas>` fuera de pantalla de `64x64` píxeles y proyectarla mediante transformaciones matriciales reduce las llamadas de sombreado en un **96%**.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_OPEN_BOOKS_SHADERS_SDF_AND_WEB_ANIMATION_MASTERY_2026]] · [[CANON_60FPS_RENDER_AND_MOTION_OPTIMIZATION_PIPELINE]] · [[CANON_EMIL_KOWALSKI_ANIMATIONS_ON_THE_WEB]] · [[CANON_MATT_POCOCK_TYPESCRIPT_AND_AGENT_SKILLS_2026]] · #architecture #motion #performance
