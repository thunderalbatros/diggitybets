# Tratado Canónico: Diseño Gráfico Avanzado, Composición, Ciencia del Color OKLCH, Shaders y Animación Web (SOTA 2026)

**Alcance:** Este documento establece la doctrina técnica y estética actualizada (2025–2026) de nuestra Web Software Factory para **Diseño Gráfico, Percepción Visual Gestalt, Ciencia del Color `OKLCH` + `APCA`, Tokens `W3C DTCG`, Micro-Interacciones (*Devouring Details*), Animaciones Nativas CSS (`@starting-style`, `interpolate-size`, `linear()`, `View Transitions`, `Scroll-Driven Animations`), `GSAP` (Licencia 100% Gratuita) y Shaders `SDF` / `TSL`**. NO es fuente de contratos de API de streaming (ver `KICK_API_REFERENCE.md`), NI de esquemas de bases de datos Edge, NI de psicometría de apuestas.

---

## 1. Fundamentos de Composición Visual, Percepción Gestalt y Tipografía de Precisión

`[VERIFICADO: Rudolf Arnheim "Art and Visual Perception", Josef Albers "Interaction of Color", Matthew Butterick "Practical Typography", Rauno Freiberg "Devouring Details" 2025–2026]`

### 1.1 Equilibrio Óptico y Leyes de la Gestalt (Rudolf Arnheim)
- **Centro Óptico vs. Centro Matemático**: El ojo humano percibe el centro óptico ligeramente por encima del centro geométrico ($\approx 3\%–5\%$). Además, las formas con bordes brillantes o íconos asimétricos (como un triángulo de "Play") desplazan su centro de masa visual; deben compensarse ópticamente (`padding-left` diferencial de `1px–2px`).
- **Separación Figura-Fondo sin Cajas (*De-Boxing*)**: Siguiendo las leyes de **Proximidad** y **Región Común**, la jerarquía debe construirse primero con **espacio negativo (*Ma* 間, $\ge 35\%$ del área visible)** y **saltos sutiles de luminancia superficial**, reservando los bordes de `1px` (`rgba(255, 255, 255, 0.07)`) únicamente para contenedores interactivos primarios.

### 1.2 Ciencia del Color Perceptual: `OKLCH` y Contraste `APCA` (Josef Albers + W3C CSS Color 4/5)
- **Por qué `HSL` y `sRGB` fallan en Interfaces Oscuras**: En `HSL`, un amarillo y un azul con `50%` de luminosidad (`L`) tienen luminancias percibidas radicalmente distintas, provocando textos ilegibles o botones desbalanceados.
- **Espacio Uniforme `OKLCH` (`oklch(L C H)`)**:
  - `L` (*Perceptual Lightness* `0` a `1`): Garantiza que dos colores con el mismo valor `L` tengan idéntico peso luminoso ante el ojo humano.
  - **Escalera de Superficies Oscuras en `OKLCH`**:
    - Lienzo Base (*Canvas*): `oklch(0.13 0.015 260)` (`#06080d`)
    - Superficie Elevada 1: `oklch(0.17 0.018 260)` (`#0b0f19`)
    - Superficie Elevada 2: `oklch(0.21 0.022 260)` (`#111624`)
    - Borde Especular Superior: `color-mix(in oklch, white 10%, transparent)`
- **Contraste Perceptual `APCA` (*Advanced Perceptual Contrast Algorithm*)**:
  - Evalúa el contraste real considerando polaridad (texto claro sobre fondo oscuro), grosor del trazo (`font-weight`) y tamaño espacial:
    - Texto de lectura continua: **$L_c \ge 75$** (mínimo absoluto $L_c \ge 60$).
    - Subtítulos y etiquetas de interfaz: **$L_c \ge 60$**.
    - Titulares grandes (`>= 24px bold`): **$L_c \ge 45$**.

### 1.3 Tipografía Digital de Alta Ingeniería (*Butterick's Practical Typography* & CSS Text Level 4)
1. **Alineación Numérica Inmutable**: Todo contador en vivo, saldo, multiplicador, temporizador o tabla financiera DEBE declarar `font-variant-numeric: tabular-nums;`, evitando temblores horizontales (*jitter*) durante actualizaciones a 60 FPS.
2. **Equilibrio de Líneas Nativo**:
   - Titulares (`h1–h3`): `text-wrap: balance;` (evita palabras huérfanas en la última línea).
   - Párrafos de lectura (`p`, `.description`): `text-wrap: pretty;`.
3. **Medida Óptima (*Measure*)**: Ancho de línea estricto entre **45 y 75 caracteres** (`max-width: 65ch`).

---

## 2. Ecosistema de Referencias Vivas y Tokens Estándar (`W3C DTCG 2025.10`)

Para que los agentes nunca diseñen "a ciegas" ni caigan en plantillas genéricas de IA:

1. **Cosecha Automatizada de ADN Visual (`harvest_design_tokens.mjs` + `extract_design_dna.mjs`)**:
   - Antes de construir o rediseñar una sección, el agente extrae estilos computados reales (`getComputedStyle` vía Playwright) de referencias líderes (*Linear*, *Raycast*, *Vercel*, *Stripe*, *Stake*, *21st.dev*) y los normaliza al estándar **W3C Design Tokens Community Group (`DTCG 2025.10`)** con sintaxis `$value`, `$type`, `$description`.
2. **Integración Continua con `21st.dev` y `awesome-design-md`**:
   - Los agentes consultan el catálogo local en `references/ui-kb/` y las primitivas de micro-interacción verificadas antes de escribir una sola línea de CSS.

---

## 3. Stack de Animaciones Web y Micro-Interacciones 2025–2026 (60 FPS Garantizados)

### 3.1 Doctrina *Devouring Details* (Rauno Freiberg)
- **Continuidad Espacial**: Ningún elemento debe aparecer o desaparecer abruptamente; debe emerger de su origen lógico con una transición de escala sutil (`0.96 -> 1.0`) y opacidad (`0 -> 1`).
- **Respuesta Frecuencial Multisensorial**: Los componentes interactivos de alta precisión combinan micro-desplazamiento físico (`translateY(-2px)`), iluminación perimetral reactiva al puntero (`radial-gradient` alimentado por variables CSS `--mouse-x`, `--mouse-y` en `requestAnimationFrame`) y clic acústico sutil sintetizado por WebAudio (`< 15ms`).

### 3.2 Las 5 APIs Nativas de CSS Moderno (Cero Peso JS)
1. **`@starting-style` + `transition-behavior: allow-discrete`**:
   - Permite animar la entrada y salida de modales, *popovers* y notificaciones desde `display: none` sin librerías externas.
2. **`interpolate-size: allow-keywords` y `calc-size(auto, size)`**:
   - Resuelve la animación nativa de contenedores desde `height: 0` hasta `height: auto` sin medir el DOM con JavaScript.
3. **Física de Resortes con `linear()`**:
   - Permite codificar curvas elásticas y resortes amortiguados reales directamente en CSS (`transition-timing-function: linear(0, 0.45, 0.88, 1.02, 1.0)`), ejecutándose 100% en el hilo compositor de la GPU.
4. **Scroll-Driven Animations (`animation-timeline: scroll()` / `view()`)**:
   - Vincula barras de progreso, revelaciones de tarjetas y efectos de paralaje directamente al desplazamiento nativo del navegador sin eventos `scroll` en el hilo principal.
5. **View Transitions API (`document.startViewTransition()`)**:
   - Interpola cambios de vista y reordenamiento de grillas con instantáneas aceleradas por GPU.

### 3.3 `GSAP` (100% Gratuito tras Adquisición por Webflow en 2025)
- `[VERIFICADO: Webflow / GreenSock 2025]`: Tanto el núcleo de **GSAP** como todos los plugins anteriormente comerciales (**`Flip`**, **`ScrollTrigger`**, **`SplitText`**, **`MorphSVG`**, **`DrawSVG`**, **`CustomEase`**) son ahora **100% gratuitos incluso para uso comercial (`USD 0`)**.
- **Regla de Uso en nuestra Software Factory**:
  - Para transiciones de UI estándar: usar **CSS Nativo / WAAPI**.
  - Para cambios de layout complejos entre contenedores distintos (ej. mover una carta de un mazo al bracket en vivo): usar el patrón **FLIP** (`First, Last, Invert, Play`).

---

## 4. Shaders, Campos de Distancia Firmados (`SDF`) y Presupuesto de GPU (`<= 5% OBS CPU`)

`[VERIFICADO: Patricio Gonzalez Vivo "The Book of Shaders", Inigo Quilez SDF Articles, Three.js TSL 2025–2026]`

1. **Matemática SDF 2D (*Inigo Quilez*)**:
   - Cuando se requiere un efecto de borde energético, resplandor metálico o máscara compleja, es mucho más barato evaluar una fórmula matemática `sdRoundedBox(p, b, r)` en un único *fragment shader* o gradiente cónico `@property --border-angle` que apilar múltiples nodos DOM con `filter: blur()`.
2. **Higiene Estricta de GPU para Laptops y OBS Studio**:
   - **Pausa Automática de Ciclos**: Todo bucle `requestAnimationFrame` o shader WebGL/Canvas DEBE detenerse inmediatamente cuando `document.hidden === true` o cuando el componente sale del viewport (`IntersectionObserver`).
   - **Hibernación `1x1` de Canvas**: Los lienzos de partículas o monedas que terminan su ráfaga se redimensionan a `1x1` píxeles hasta el próximo evento, liberando ancho de banda de llenado (*fill-rate*) en la GPU integrada.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_EMIL_KOWALSKI_ANIMATIONS_ON_THE_WEB]] · [[CANON_2D_3D_GRAPHICS_SHADERS_AND_AESTHETICS_2026]] · [[CANON_HOLO_SHADERS_3D_PACK_CHOREOGRAPHY_AND_WEBAUDIO_SFX_2026]] · [[CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY]] · #motion_and_animation
