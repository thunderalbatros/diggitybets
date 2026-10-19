# Tratado Canónico Clean-Room: Desarrollo Frontend Sin Frameworks (Strazzullo, Farrell, Resig, Frisbie), Diseño de Sistemas en Tiempo Real (Alex Xu Vol. 1 & 2), Rayos-X de Diseño (Adam Tornhill), Arquitecturas Evolutivas (Neal Ford) e Inmutabilidad (Perry) (2026)

**Alcance:** Aplicable a la arquitectura Vanilla JS de `site/js/` y `overlay-*`, componentes encapsulados, diseño de sistemas en tiempo real en `worker/index.js` (Leaderboards, WebSockets, Rate Limiters y Billetera `$DIG`), detección forense de deuda técnica (`tools/intelligence/ast_guard.mjs`) y funciones de aptitud evolutiva (`Squad 0`, `Squad 2`, `Squad 4`, `Squad 6` y `Squad 9`).

---

## 1. Arquitectura Frontend sin Frameworks (*Frameworkless Front-End Development* — Francesco Strazzullo, *Web Components in Action* — Ben Farrell & *Secrets of the JS Ninja* — John Resig)

### 1.1 El Patrón de RenderizadoPuro y Conciliación Ligera en Vanilla JS
- Nuestra plataforma (`site/` y los 8 overlays de OBS) prescinde deliberadamente de frameworks pesados (React/Angular) para garantizar carga instantánea y **`<= 5% CPU` en OBS Studio**.
- **Las 3 Reglas de Oro del Frontend *Frameworkless* (Strazzullo)**:
  1. **Funciones de Vista Puras**: Toda función de renderizado debe ser una proyección determinista del estado: $V = f(S)$.
  2. **Actualización Quirúrgica por Atributos `data-key` (*Keyed DOM Patching*)**:
     - En tablas que se actualizan cada segundo (como la lista de bonos en `bonushunt.js` o la cola de `!sr`), nunca destruir y recrear todo el `<tbody>` si solo cambió el multiplicador de una fila.
     - Buscar el nodo existente mediante `tbody.querySelector(\`[data-bonus-id="\${CSS.escape(id)}"]\`)` y mutar únicamente las celdas modificadas con `.textContent`.
  3. **Registro de Eventos Delegado (*Event Delegation* en la Raíz)**:
     - En lugar de adjuntar 200 listeners individuales `row.addEventListener('click', ...)` que retienen cierres léxicos en memoria, adjuntar **un único listener** en el contenedor padre y despachar con `const btn = e.target.closest('[data-action]');`.

### 1.2 *Timers*, Microtareas y Dosificación del DOM (*Secrets of the JavaScript Ninja 2nd Ed.* — John Resig & *Professional JS 4th Ed.* — Matt Frisbie)
- **División de Tareas Largas (*Time-Slicing* con `requestAnimationFrame` / `MessageChannel`)**:
  - Ningún bucle sincrónico en el cliente debe superar **`8 ms`**. Si hay que procesar o filtrar cientos de elementos del catálogo de slots, dividir el trabajo en trozos o usar índices precalculados en memoria para mantener `INP < 50 ms`.

---

## 2. Diseño de Sistemas Interactivos de Gran Escala (*System Design Interview Vol. 1 & Vol. 2* — Alex Xu & Sahn Lam)

### 2.1 Diseño de *Real-Time Gaming Leaderboards* (Tablas de Clasificación en Vivo)
- **Requisitos**: Actualizar puntajes de espectadores en milisegundos tras cada ronda de predicción o juego de la comunidad y consultar tanto el **Top 10** como el **rango relativo del usuario actual** ($\pm 2$ posiciones arriba y abajo).
- **Arquitectura en Cloudflare Edge + SQLite**:
  - Para comunidades de hasta `50.000` usuarios activos, mantener en el *Durable Object* un índice ordenado en memoria respaldado por una tabla SQLite con índice cubriente `CREATE INDEX idx_leaderboard_score ON users(points DESC, updated_at ASC, username);`.
  - Calcular el rango exacto en una sola pasada con `RANK() OVER (ORDER BY points DESC)` cacheado en memoria e invalidado únicamente cuando cambia un puntaje.

### 2.2 Diseño de *Sliding Window Counter Rate Limiter* (Protección de Endpoints `/api/*`)
- Combina el bajo costo de memoria de las ventanas fijas con la precisión de la ventana deslizante:
  $$\text{PesoEfectivo} = \text{Contador}_{\text{ventanaActual}} + \text{Contador}_{\text{ventanaAnterior}} \times \left(1 - \frac{t_{\text{actual}} - t_{\text{inicioVentana}}}{T_{\text{ventana}}}\right)$$
  - Requiere almacenar únicamente **2 enteros por IP/usuario** y previene ráfagas del doble del límite en la frontera entre dos minutos consecutivos.

### 2.3 Diseño de Webhooks Resilientes (*Designing Web APIs* — Brenda Jin, Saurabh Sahni & Amir Shevat)
- Todo receptor de webhooks de Kick (`/api/webhooks/kick`) debe:
  1. Verificar primero la firma criptográfica RSA-SHA256 y la marca de tiempo (`|now - timestamp| <= 300s`).
  2. Verificar idempotencia contra `svix-id` / `Kick-Event-Message-Id`.
  3. Responder `200 OK` en `< 50 ms` delegando cualquier difusión pesada a `ctx.waitUntil(...)`.

---

## 3. Análisis Forense de Código y Arquitecturas Evolutivas (*Software Design X-Rays* — Adam Tornhill & *Building Evolutionary Architectures* — Neal Ford)

### 3.1 Detección Matemática de *Hotspots* de Deuda Técnica (Adam Tornhill)
- La complejidad estática de un archivo no es un problema si ese archivo rara vez se toca. El peligro real está en la intersección entre **Frecuencia de Cambio en Git ($F_{\text{commits}}$)** y **Complejidad / Tamaño ($C_{\text{LOC}}$)**:
  $$\text{HotspotScore}(f) = \log_2(1 + F_{\text{commits}}(f)) \times C_{\text{ciclomática}}(f)$$
- **Acoplamiento Temporal (*Temporal Coupling*)**:
  - Si dos archivos (por ejemplo, `site/js/admin-hub.js` y `worker/index.js`) cambian juntos en más del 70% de los commits, existe un contrato implícito que debe extraerse a un esquema compartido (`Valibot` / contrato de API documentado).

### 3.2 Funciones de Aptitud Arquitectónica (*Architectural Fitness Functions* — Neal Ford)
- Una *Fitness Function* es una prueba automatizada objetiva que protege una propiedad no funcional de la arquitectura (rendimiento, seguridad, modularidad o diseño visual) en cada cambio:
  - En nuestra fábrica, las **5 Compuertas Pre-HITL (`cto-hitl-visual-gate`)** y la **Matriz de Evaluación (`eval_matrix.mjs`)** actúan como una *Holistic Continuous Fitness Function* que impide cualquier degradación evolutiva.

---

## 4. Prevención de Errores Sutiles y Arquitectura Inmutable (*Software Mistakes and Tradeoffs* — Jon Skeet & Tomasz Lelek & *The Art of Immutable Architecture* — Michael L. Perry)

### 4.1 Reglas de Precisión Numérica y Temporal (Jon Skeet & Tomasz Lelek)
1. **Prohibido usar punto flotante IEEE-754 crudo para saldos o monedas**:
   - En JavaScript, `0.1 + 0.2 === 0.30000000000000004`. Almacenar siempre puntos `$DIG` como **enteros exactos** (`Math.round(amount)`) y montos monetarios en centavos enteros (`cents = Math.round(usd * 100)`).
2. **Marcas de Tiempo Monótonas vs. Reloj de Pared**:
   - Usar `Date.now()` / ISO-8601 UTC únicamente para persistencia histórica, y `performance.now()` (reloj monótono de alta resolución inmune a ajustes NTP) para medir FPS, duraciones de animación y latencias de red.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_CLEAN_ROOM_SOFTWARE_DESIGN_REFACTORING_AND_LEGACY_CODE_2026]] · [[CANON_CLEAN_ROOM_WEB_SECURITY_OAUTH2_BUG_HUNTING_AND_VIRTUAL_ECONOMIES_2026]] · [[CANON_SELF_EVOLVING_SOFTWARE_FACTORY_AND_SPECULATIVE_RAG_2026]] · [[CANON_QASIMHBTI_BOOKS_SQLITE_SCALABILITY_EDGE_CACHE_AND_ALGORITHMS_2026]] · #architecture #frontend #system-design #performance
