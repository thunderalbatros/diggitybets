# CANON SOTA 2026: Modelado 2D/3D, Shaders WebGPU/WebGL, Animaciones y Estética Web de Vanguardia

> **Área de Conocimiento:** Creative Front-End Engineering, WebGL/WebGPU 3D, Motion Craft & Modern Visual Aesthetics  
> **Horizonte Temporal:** Lanzamientos y tendencias clave de los últimos 6 meses (SOTA 2025/2026)  
> **Objetivo:** Sitios web inmersivos, fluidos a 60/120 FPS, visualmente deslumbrantes con impacto de CPU ≤5%.  
> **Presupuesto:** **$0 USD / $0 ARS**, 100% Open-Source y Licencias Permisivas (MIT, Apache-2.0, BSD).

---

## 1. Motores y Modelado 2D / 3D para la Web

### 1.1 Three.js r170+ con WebGPURenderer y TSL (Three.js Shading Language)
- **Repositorio:** `https://github.com/mrdoob/three.js`
- **Revolución 2025/2026:**
  - **`WebGPURenderer` unificado:** Three.js ahora inicializa por defecto WebGPU con fallback automático y transparente a WebGL 2 si el navegador o hardware no lo soportan.
  - **TSL (Three.js Shading Language):** Se acabó escribir shaders en cadenas de texto de GLSL aisladas. TSL permite componer shaders como nodos de JavaScript/TypeScript (`positionLocal`, `uv()`, `mix()`, `sin()`).
  - **Transpilación bidireccional:** El mismo código TSL se compila a **WGSL** para WebGPU y a **GLSL** para WebGL.
  - **Compute Shaders:** Ejecución de lógica de partículas y física de simulación directamente en los núcleos de cómputo de la GPU sin transferencias lentas CPU-RAM-VRAM.
  - **`RenderPipeline` Node-Based:** Reemplazo moderno de `EffectComposer` para post-processing de bloom, aberración cromática, grain y depth-of-field.

### 1.2 OGL: Minimalist WebGL Library (~10 KB)
- **Repositorio:** `https://github.com/oframe/ogl`
- **Por qué es clave:** Pesa una fracción minúscula de Three.js (<10 KB gzip vs >150-600 KB).
- **Caso de uso:** Perfecto para fondos interactivos de landing pages, distorsión de imágenes con shaders de agua/onda de choque al pasar el cursor, y efectos de micro-3D donde no se justifica el peso de un motor pesado.

### 1.3 COBE: Globo Terráqueo 3D Interactivo en WebGL (~5 KB)
- **Repositorio:** `https://github.com/shuding/cobe`
- **Por qué es clave:** Renders de esferas y globos terráqueos con miles de puntos de luz en GLSL puro retina-ready. Pesa 5 KB y no consume batería ni recalienta notebooks ligeras.

### 1.4 Rive Runtime: Vectores 2D/3D Interactivos a 120 FPS (<30 KB)
- **Ecosistema:** `@rive-app/canvas-lite` y `@rive-app/webgl-advanced`
- **Por qué supera a Lottie/GIFs:**
  - Los archivos `.riv` son binarios ultracompactos (típicamente 10 KB a 50 KB).
  - Incluyen **State Machines** reales: la animación reacciona directamente al mouse, clics, inputs numéricos y booleanos.
  - Se dibuja en un canvas por WebGL con anti-aliasing vectorial perfecto y renderizado a 120 FPS sin depender del DOM.

### 1.5 Pipeline de Optimización de Modelos 3D Web
Para mantener páginas ultrarrápidas y sin pausas de carga:
1. **Meshopt & Draco Compression:** Reducción de hasta un 85% en mallas poligonales `.glb` / `.gltf`.
2. **KTX2 / Basis Universal:** Texturas GPU nativas (BC7 / ASTC) que van directo a la memoria VRAM sin descompresión previa en CPU ni inflación de memoria RAM.
3. **Procedural Geometry & Shaders:** Creación de gemas, monedas, ruletas o dados mediante funciones matemáticas y shaders de raymarching en lugar de descargar mallas estáticas de varios megabytes.

---

## 2. Animaciones, Micro-Interacciones y Tipografía Cinética

### 2.1 Anime.js v4 (Reescritura Total 2025/2026)
- **Repositorio:** `https://github.com/juliangarnier/anime`
- **Grandes Novedades:**
  - **Modularidad Total & Tree-Shaking:** Importación atómica de utilidades (`animate`, `stagger`, `splitText`).
  - **Soporte Dual (JS + WAAPI):** Puede usar el hilo de cálculo de JS o delegar directamente al **Web Animations API (WAAPI)** del navegador para rendimiento a 120 FPS en el hilo del compositor.
  - **Tipografía Cinética Integrada:**
    - `splitText`: Divide títulos en caracteres, palabras o líneas automáticamente.
    - `scrambleText()`: Efecto de desencriptación hacker/cyberpunk carácter a carácter.
  - **Grid Auto-Stagger (`grid: true`):** Calcula automáticamente las distancias espaciales en 2D desde el centro, las esquinas o puntos específicos de una cuadrícula sin cálculos manuales de matrices.

### 2.2 Motion (ex-Framer Motion) en Vanilla JS / TypeScript
- **Repositorio:** `https://github.com/motiondivision/motion`
- **Por qué es clave:** Ya no está atado exclusivamente a React. Ahora es una librería universal para Vanilla JS, Vue, Svelte y Astro.
- **Física de Resortes (Spring Physics):** Animaciones basadas en masa (`mass`), rigidez (`stiffness`) y amortiguación (`damping`), creando una sensación táctil y orgánica al interactuar con cartas, modales y botones.

### 2.3 Auto-Animate (FormKit)
- **Repositorio:** `https://github.com/formkit/auto-animate`
- **Por qué es clave:** 1 línea de código (`autoAnimate(parentElement)`) calcula transiciones FLIP instantáneas cuando se agregan, eliminan o reordenan elementos en tablas, leaderboards o listas de apuestas.

### 2.4 CSS View Transitions API & Native Scroll-Driven Animations
- **Estándares Web Nativos (Sin JS):**
  - **Scroll-Driven Animations:** `@keyframes` impulsadas por `animation-timeline: scroll()` y `view()`. La animación avanza con el scroll del usuario sin añadir listeners de scroll en JavaScript ni recalcular estilos en cada frame.
  - **View Transitions API:** Morphing nativo de elementos entre diferentes vistas o rutas de la aplicación con pseudo-elementos `::view-transition-group()`.

---

## 3. Efectos Visuales, Shaders de Fondo y Componentes Creativos

### 3.1 React Bits / Magic UI / Aceternity UI: La Era del "Copy-Paste Registry"
En 2025/2026 se abandonó el empaquetado monolítico de npm para componentes UI. Los mejores sitios web utilizan registros CLI de componentes limpios:
- **React Bits (`DavidHDev/react-bits`):** Enfoque CSS-first con WebGL/OGL selectivo. Destaca por efectos de texto (`BlurText`, `DecryptedText`, `SplitText`), y fondos generativos interactivos (`Aurora`, `Hyperspeed`, `Squares`, `Ballpit`).
- **Magic UI (`magicuidesign/magicui`):** Componentes con estética premium: `RetroGrid`, `ShimmerButton`, `BorderBeam`, `Meteors` y `BentoGrids`.
- **Aceternity UI:** Enfoque cinematográfico dark-mode: tarjetas con tilt 3D, haces de luz reactivos y mallas holográficas.

### 3.2 ShaderGradient: Fluidos 3D Dinámicos
- **Repositorio:** `https://github.com/ruucm/shadergradient`
- **Utilidad:** Genera gradientes fluidos tridimensionales con ruido Simplex/Perlin interactivo, movimiento de onda orgánica y control de iluminación en WebGL.

### 3.3 Lenis Smooth Scroll
- **Repositorio:** `https://github.com/darkroomengineering/lenis`
- **Utilidad:** Inercia de scroll suave como la seda que sincroniza perfectamente los lienzos WebGL y los elementos DOM sin romper la accesibilidad ni las anclas del navegador.

---

## 4. Estética Visual de Vanguardia: Principios de Diseño 2026

### 4.1 Glassmorphism Científico de Alta Fidelidad
El glassmorphism moderno ya no es un fondo blanco semitransparente tosco:
```css
/* Glassmorphism Científico SOTA 2026 */
.glass-surface {
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 4px 24px -1px rgba(0, 0, 0, 0.35),
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.12);
}
```

### 4.2 Eliminación de Color Banding con Ruido Procedural SVG
Los gradientes en fondos oscuros sufren de "banding" (escalones de color visibles) en pantallas estándar. Para solucionarlo de forma elegante sin imágenes pesadas:
```html
<svg style="display:none">
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
    <feColorMatrix type="saturate" values="0" />
  </filter>
</svg>
```
Se aplica como una capa con `opacity: 0.035` y `mix-blend-mode: overlay`, logrando un acabado de material físico similar al papel esmerilado o cristal de zafiro.

### 4.3 El Espacio de Color `oklch()`
En lugar de `rgb()` o `hsl()`, el estándar 2026 utiliza `oklch(L C H)`:
- **L (Lightness):** Brillo perceptualmente uniforme para el ojo humano.
- **C (Chroma):** Saturación que no altera el tono percibido.
- **H (Hue):** Tono cromático.
- **Beneficio:** Gradientes perfectamente suaves que no pasan por zonas grises o descoloridas intermedias y aprovechan pantallas con perfil de color P3 Wide Gamut.

### 4.4 El Presupuesto Cromático 90/8/2
- **90% Tonos de Base:** Negros abisales y carbones profundos (`#070B13`, `#0A0F1D`).
- **8% Superficies y Bordes:** Cristales ahumados y delimitadores sutiles (`rgba(255,255,255,0.06)`).
- **2% Acentos de Alta Energía:** Colores radiantes reservados exclusivamente para llamadas a la acción, premios, victorias y estados críticos (Dorado `#F59E0B`, Esmeralda `#10B981`, Cyber Blue `#3B82F6`).

### 4.5 Borders Over Shadows
En interfaces oscuras modernas, las sombras proyectadas negras son casi invisibles y solo oscurecen el contraste. La jerarquía se construye con:
1. Bordes luminosos superiores (`border-top: 1px solid rgba(255,255,255,0.15)`).
2. Gradientes de brillo interno (`inset 0 1px 0 rgba(255,255,255,0.1)`).
3. Luces de borde reactivas al cursor (Border Beam / Glow Trails).

---

## 5. Reglas de Oro de Rendimiento & Accesibilidad

1. **Animar Exclusivamente Propiedades Compuestas:**
   - Solo animar `transform` (translate, scale, rotate) y `opacity`.
   - Evitar animar `width`, `height`, `top`, `margin`, `padding` o `filter` en loops continuos (provocan recalculación de layout y repintado en CPU).
2. **Uso Estratégico de `will-change`:**
   - Aplicar `will-change: transform` únicamente durante la interacción o animación activa, y removerlo al finalizar para no saturar la memoria VRAM de la GPU.
3. **Respeto a `prefers-reduced-motion`:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```
4. **Impacto en OBS Browser Sources:**
   - La resolución de renderizado debe coincidir exactamente con el canvas (evitar downsampling en tiempo real).
   - Pausar animaciones y loops de canvas (`requestAnimationFrame`) cuando el overlay no esté activo o visible.
