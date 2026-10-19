# Síntesis Canónica Maestra: Los 65 Libros Clave de EbookFoundation (`free-programming-books-en.md`) para la Web Software Factory (2026)

**Alcance:** Aplicable a toda la Web Software Factory (arquitectura frontend/backend en `site/` y `worker/index.js`, overlays OBS a 60 FPS en `overlay-*` y `wheel-*`, motor `Supercharged Omni-RAG v5` en `tools/intelligence/` y auditoría de seguridad/calidad del `Squad 6`). Consolida los principios técnicos, matemáticos y algorítmicos de las obras más valiosas de `EbookFoundation/free-programming-books`.

---

## 1. Motores de Navegador, Rendimiento Web y Optimización (*Web Browser Engineering*, *Book of Speed*, *Mature Optimization*)

### 1.1 *Web Browser Engineering* — Pavel Panchekha & Chris Harrelson (Arquitecto Principal de Google Chromium)
- **Separación Estricta entre *Layout Tree* y *Compositor Threads***:
  1. Cualquier lectura de geometría (`offsetWidth`, `getBoundingClientRect()`, `scrollTop`) inmediatamente después de una mutación de estilo fuerza un **Synchronous Layout Flush** en el hilo principal, bloqueando el procesamiento de eventos de entrada (`INP`).
  2. El hilo compositor (*Compositor Thread*) divide la página en **teselas (*GPU Tiles*) de `256x256` o `512x512` píxeles**. Si un elemento animado excede innecesariamente su área de dibujo (por ejemplo, un `filter: blur(80px)` gigante), explota la memoria de texturas VRAM (*Tile Memory Explosion*).
  3. **Regla de Oro para Overlays OBS (`<= 5% CPU`)**: Aislar cada componente animado con `contain: layout paint style;` y animar únicamente matrices de transformación afín (`transform: translate3d / scale`) y `opacity` para que el hilo principal permanezca en `0 ms` de recálculo de layout.

### 1.2 *Book of Speed* (Stoyan Stefanov) & *Mature Optimization* (Carlos Bueno)
- **Umbrales Psicofísicos de Percepción de Velocidad**:
  - **`0–100 ms`**: El cerebro humano percibe causalidad directa (el botón o juego reaccionó instantáneamente al clic del usuario).
  - **`100–300 ms`**: Se percibe un ligero retraso; requiere micro-interacción visual inmediata (*Optimistic UI* o *Ripple/Spring press*).
  - **`> 1000 ms`**: Pérdida del estado de flujo (*Flow*) y abandono de tarea.
- **Metodología de *Mature Optimization***:
  - *"No optimices a ciegas: mide primero la distribución completa (`p50`, `p95`, `p99`), identifica el recurso limitante (CPU, red, bloqueo de DOM o E/S de SQLite) y verifica la mejora con telemetría antes y después"*.

---

## 2. Índices SQL y Rendimiento de Bases de Datos (*Use The Index, Luke! / SQL Performance Explained* — Markus Winand)

### 2.1 Anatomía del Índice *B-Tree* y el Peligro de `OFFSET`
- Un índice `B-Tree` en SQLite consta de nodos rama logarítmicos ($\mathcal{O}(\log N)$) y una **lista doblemente enlazada de nodos hoja** ordenados físicamente.
- **Prohibición de `LIMIT K OFFSET M` en Tablas Grandes**:
  - `OFFSET 5000` obliga a SQLite a recorrer y descartar 5.000 filas una por una ($\mathcal{O}(M + K)$).
  - **Patrón Canónico *Keyset / Seek Pagination* ($\mathcal{O}(1)$ constante)**:
    ```sql
    SELECT id, username, points, updated_at
    FROM users
    WHERE (points, id) < (?last_points, ?last_id)
    ORDER BY points DESC, id DESC
    LIMIT 25;
    ```
    Con un índice compuesto `CREATE INDEX idx_users_leaderboard ON users(points DESC, id DESC);`, SQLite salta directamente a la coordenada exacta del árbol en `< 0.2 ms` sin importar si es la página 1 o la página 10.000.

### 2.2 Predicados *Sargables* (*Search Argument Able*)
- Nunca envolver una columna indexada dentro de una función en la cláusula `WHERE` (ej. `WHERE LOWER(username) = ?` o `WHERE strftime('%Y', created_at) = '2026'`), ya que inutiliza el índice B-Tree y fuerza un *Full Table Scan*.
- Usar colación en el índice (`CREATE INDEX idx_user_nocase ON users(username COLLATE NOCASE);`) o rangos directos (`WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01'`).

---

## 3. Shaders 2D/3D, PBR, Iluminación y SVG (*3D Game Shaders For Beginners*, *PBR Book*, *Ray Tracing Gems*, *WebGL Insights*, *SVG Pocket Guide*)

### 3.1 Ecuaciones de Iluminación Especular Metálica y *Fresnel-Schlick* (*PBR Book* & *3D Game Shaders* — David Lettier)
- Para dar acabado de lujo real (oro 24k, esmeralda, cromo) a las cartas de slots, trofeos de torneos y bordes de ruletas en WebGL/CSS Houdini:
  1. **Aproximación de Fresnel-Schlick (Brillo de Borde / *Rim Lighting*)**:
     $$F(\mathbf{n}, \mathbf{v}) = F_0 + (1 - F_0)\left(1 - \max(\mathbf{n} \cdot \mathbf{v}, 0)\right)^5$$
     Donde $F_0 = (1.00, 0.71, 0.29)$ para el oro puro y $(0.56, 0.57, 0.58)$ para el hierro/cromo.
  2. **Distribución Normal Microfaceta *Trowbridge-Reitz GGX***:
     $$D_{\text{GGX}}(\mathbf{n}, \mathbf{h}, \alpha) = \frac{\alpha^2}{\pi \left((\mathbf{n} \cdot \mathbf{h})^2 (\alpha^2 - 1) + 1\right)^2}$$
     Controla con un único parámetro de rugosidad $\alpha = \text{roughness}^2$ desde un espejo láser ultra-pulido ($\alpha = 0.04$) hasta un metal satinado mate ($\alpha = 0.6$).

### 3.2 Optimización Matemática de Trazados SVG (*Pocket Guide to Writing SVG* — Joni Trythall)
- Reducir la precisión decimal de las coordenadas SVG a 1 o 2 decimales, preferir comandos relativos (`m, l, h, v, c, s, z`), usar `<symbol>` + `<use href="#...">` para íconos repetidos y animar trazos con `stroke-dasharray` / `stroke-dashoffset` acelerados por composición cuando se combinan con `will-change: transform`.

---

## 4. Arquitectura CSS Escalable y JavaScript/TypeScript Robusto (*Enduring CSS*, *TypeScript in 50 Lessons*, *Refactor Like a Superhero*, *Robust Client-Side JS*)

### 4.1 *Enduring CSS (ECSS)* (Ben Frain) & *CSS Optimization Basics* (Jens Oliver Meiert)
- **Aislamiento por Espacio de Nombres y Cero Guerras de Especificidad**:
  - Nombrar selectores con prefijo de módulo (`.bh-Card_Header`, `.tr-Bracket_Node`, `.ov-Wheel_Slice`), mantener especificidad plana (`0,1,0` — una sola clase) y usar variables CSS con ámbito de componente (`--card-accent`).
  - Nunca estilizar etiquetas HTML desnudas (`div`, `span`, `table`) fuera del reset base.

### 4.2 *TypeScript in 50 Lessons* (Stefan Baumgartner) & *The Concise TypeScript Book* (Simone Poggiali)
- **Uniones Discriminadas (*Discriminated Unions*) y *Branded Types***:
  - Modelar todos los estados de red y de juegos con un campo discriminante literal (`status: 'idle' | 'loading' | 'active' | 'settled' | 'error'`) para hacer imposibles los estados inválidos.
  - Usar *Branded Types* (`type KickUserId = string & { readonly __brand: 'KickUserId' }`) para no confundir jamás un `userId` con un `username` o un `betId`.

### 4.3 *Refactor Like a Superhero* (Alex Bespoyasov) & *Robust Client-Side JavaScript* (Matthias Schäfer)
- **Diseño Defensivo en el Cliente (*Fail-Safe DOM & Network Isolation*)**:
  - Todo módulo UI debe asumir que la red fallará, que `localStorage` puede lanzar `QuotaExceededError` y que un elemento opcional del DOM puede no existir en ciertas vistas (`if (!el) return;`).
  - Reemplazar condicionales anidados profundos por **Cláusulas de Guarda (*Guard Clauses*)** y tablas de despacho (*Lookup Maps*) de complejidad $\mathcal{O}(1)$.

---

## 5. Ciberseguridad, Fuzzing y Criptografía (*Building Secure & Reliable Systems*, *OWASP WSTG v4.2*, *The Fuzzing Book*, *The Joy of Cryptography*)

### 5.1 *Building Secure & Reliable Systems* (Google SRE & Security Team)
- **Defensa en Profundidad y Principio de Mínimo Privilegio**:
  - Ninguna capa confía ciegamente en la anterior: aunque el frontend valide un formulario, el Cloudflare Worker vuelve a validar el esquema con `Valibot`, verifica la firma criptográfica/token de sesión, aplica *Rate Limiting* por IP/usuario y ejecuta consultas parametrizadas.
  - **Recuperación Segura (*Safe Defaults*)**: Si un verificador de permisos o firma webhook falla o recibe un formato inesperado, el sistema **rechaza por defecto (`Deny by Default`)** sin exponer trazas internas (`stack traces`).

### 5.2 *The Fuzzing Book* (Andreas Zeller et al.) Aplicado a `Squad 6` (`break-ui`)
- Generación sistemática de entradas extremas (*Mutation & Grammar-Based Fuzzing*) para romper formularios, comandos de chat y tablas antes de producción: cadenas vacías, `null`, `NaN`, `Infinity`, números negativos (`-999999`), emojis compuestos ZWJ, texto árabe/hebreo RTL (`\u202E`), payloads XSS (`<img src=x onerror=alert(1)>`) y nombres de 500 caracteres sin espacios.

---

## 6. Recuperación de Información y Motores de Búsqueda (*Introduction to Information Retrieval* — Stanford & *Search Engines in Practice* — Croft)

### 6.1 Fundamentos Matemáticos de nuestro `Supercharged Omni-RAG v5`
- **Saturación de Frecuencia de Término en Okapi BM25 ($k_1 \approx 1.2$, $b \approx 0.75$)**:
  - A diferencia de TF-IDF clásico (donde repetir una palabra 50 veces multiplica por 50 el puntaje), BM25 satura asintóticamente en $k_1 + 1$, impidiendo que libros gigantes monopolizen el ranking frente a tratados canónicos concisos.
- **Expansión Pseudo-Relevante de Rocchio y *Reciprocal Rank Fusion (RRF)***:
  - Combinar rankings heterogéneos (`SQLite FTS5` léxico + `MiniSearch` difuso + `Engine B` de proximidad e IDF + `WikiGraph PageRank`) mediante $\text{RRF}(d) = \sum_{r \in R} \frac{1}{60 + \text{rank}_r(d)}$ supera consistentemente a cualquier motor individual.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_OPEN_BOOKS_TYPOGRAPHY_COLOR_GRIDS_AND_WEB_PERF_2026]] · [[CANON_OPEN_BOOKS_WEB_SECURITY_OWASP_AND_SQLITE_INTERNALS_2026]] · [[CANON_OPEN_BOOKS_SHADERS_SDF_AND_WEB_ANIMATION_MASTERY_2026]] · [[CANON_OPEN_BOOKS_GAME_PROGRAMMING_PATTERNS_NATURE_OF_CODE_AND_ES2025_2026]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · #architecture #security #performance #shaders #database
