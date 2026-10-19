# Tratado Canónico: Libros Abiertos y Documentación Oficial de Shaders, Matemática SDF, Audio Procedural y Animación Web (2026)

**Alcance:** Síntesis técnica exhaustiva de libros de acceso abierto y especificaciones oficiales de **Fragment Shaders (`The Book of Shaders`), Campos de Distancia Firmados 2D/3D (`Inigo Quilez SDFs`), `Three.js TSL / WebGPU`, Síntesis Acústica Procedural (`W3C Web Audio API` + principios de *Designing Sound* de Andy Farnell) y Especificaciones Oficiales W3C/MDN de Animación Web (`WAAPI`, `@starting-style`, `interpolate-size`, `linear()`, `Scroll-Driven Animations`, `View Transitions Level 2`)**. NO es fuente de contratos de OAuth ni de esquemas relacionales.

---

## 1. *The Book of Shaders* (Patricio Gonzalez Vivo & Jen Lowe — Edición Abierta Completa)

`[VERIFICADO: thebookofshaders.com, Patricio Gonzalez Vivo & Jen Lowe]`

### 1.1 El Paradigma Paralelo Ciego del GPU Fragment Shader
Un *fragment shader* se ejecuta simultáneamente para cada píxel en cientos de núcleos de la GPU sin memoria compartida entre hilos ("hilos ciegos"). Toda la geometría, textura e iluminación debe calcularse como una función matemática pura de las coordenadas normalizadas `vec2 st = gl_FragCoord.xy / u_resolution.xy;` y el tiempo `u_time`.

### 1.2 Funciones de Modelado Algorítmico (*Shaping Functions* de Golan Levin e Inigo Quilez)
- **Interpolación Suave (`smoothstep(edge0, edge1, x)`)**: Polinomio cúbico de Hermite $3t^2 - 2t^3$ que elimina bordes dentados (*aliasing*) sin costo de texturas.
- **Impulso Polinómico (*Polynomial Impulse*)**: Ideal para destellos de luz o pulsos de energía que suben rápido y decaen suavemente:
  $$\text{impulse}(k, x) = \frac{h}{1} \cdot k \cdot x \cdot \exp(1.0 - k \cdot x)$$
- **Curva Parabólica de Ganancia**:
  $$y = (4.0 \cdot x \cdot (1.0 - x))^k$$

### 1.3 Ruido Procedural, Ruido Celular (*Voronoi*) y Movimiento Browniano Fraccional (*fBm*)
- **Ruido de Valor y Gradiente (*Perlin / Simplex Noise*)**: Interpola valores pseudoaleatorios deterministas (`fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123)`) en una retícula 2D para crear superficies orgánicas de humo, plasma o metal cepillado.
- **Movimiento Browniano Fraccional (*fBm*)**: Superpone múltiples octavas de ruido con frecuencia creciente (*lacunarity* $\approx 2.0$) y amplitud decreciente (*gain* $\approx 0.5$):
  ```glsl
  float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 4; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
      }
      return value;
  }
  ```
  - **Regla de Presupuesto GPU (`<= 5% OBS CPU`)**: Limitar los bucles `fbm` a máximo `2–3` octavas en tiempo real o pre-hornear el ruido en un mosaico SVG/Canvas estático de `160x160px`.

---

## 2. Matemática de Campos de Distancia Firmados (*Signed Distance Fields — SDFs* de Inigo Quilez)

`[VERIFICADO: iquilezles.org/articles/distfunctions2d/, Inigo Quilez]`

### 2.1 Primitivas SDF 2D Exactas para UI de Alta Precisión
Un SDF devuelve la distancia ortogonal desde cualquier punto `p` hasta el borde de una figura (negativa dentro, cero en el borde, positiva fuera):
1. **Caja con Esquinas Redondeadas (`sdRoundedBox`)**:
   ```glsl
   float sdRoundedBox(in vec2 p, in vec2 b, in vec4 r) {
       r.xy = (p.x > 0.0) ? r.xy : r.zw;
       r.x  = (p.y > 0.0) ? r.x  : r.y;
       vec2 q = abs(p) - b + r.x;
       return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r.x;
   }
   ```
2. **Fusión Orgánica (*Smooth Minimum — `smin`*)**:
   Permite que dos indicadores, gotas o tarjetas se fusionen como mercurio líquido al acercarse:
   ```glsl
   float smin(float a, float b, float k) {
       k *= 4.0;
       float h = max(k - abs(a - b), 0.0) / k;
       return min(a, b) - h * h * k * 0.25;
   }
   ```
3. **Bordes Láser y Resplandores sin `filter: blur()`**:
   A partir de la distancia `d = sdRoundedBox(p, size, radius)`, un borde nítido con resplandor físico de ley inversa se calcula en una sola línea:
   ```glsl
   float border = smoothstep(0.01, 0.0, abs(d) - thickness);
   float glow   = 0.008 / (abs(d) + 0.008);
   ```

---

## 3. Especificación Oficial W3C Web Audio API & Síntesis Procedural (*Designing Sound*)

`[VERIFICADO: W3C Web Audio API Spec, Andy Farnell "Designing Sound"]`

### 3.1 Grafo de Procesamiento Acústico Libre de Saturaación en Vivo
Toda cadena de síntesis sonora en la web y en overlays de transmisión debe seguir la topología:
$$\text{Oscillator / NoiseBuffer} \longrightarrow \text{BiquadFilterNode} \longrightarrow \text{GainNode (ADSR)} \longrightarrow \text{StereoPannerNode} \longrightarrow \text{DynamicsCompressorNode (-4 dBFS)} \longrightarrow \text{AudioDestinationNode}$$
- **Síntesis Física de Impacto Metálico (Monedas / Fichas)**:
  - Combinar 2 o 3 frecuencias inarmónicas altas (`2400 Hz`, `3850 Hz`, `5120 Hz`) con envolvente exponencial ultracorta (`exponentialRampToValueAtTime(0.001, t + 0.065)`).
- **Higiene de Memoria en `AudioContext`**:
  - Reutilizar siempre un único `AudioBuffer` cacheado para ruido blanco/rosa y desconectar los nodos efímeros en `onended` para evitar fugas de memoria durante sesiones de 8 horas.

---

## 4. Especificaciones Oficiales W3C / MDN de Animación Web (2025–2026)

`[VERIFICADO: W3C CSS Animations Level 2, CSS Transitions Level 2, CSS View Transitions Level 2]`

1. **`transition-behavior: allow-discrete` + `@starting-style`**:
   - Habilita transiciones interpoladas sobre propiedades discretas (`display: none <-> block`, `content-visibility`) definiendo los estilos del primer fotograma de montaje en `@starting-style`.
2. **`interpolate-size: allow-keywords` & `calc-size(auto, size)`**:
   - Permite animar contenedores colapsables hacia `height: auto` sin medir `scrollHeight` en JavaScript.
3. **Scroll-Driven Animations (`animation-timeline: scroll()` & `view()`)**:
   - Ejecuta animaciones vinculadas al progreso de desplazamiento en el hilo compositor sin bloquear el hilo principal.
4. **Web Animations API (`element.animate()` + `commitStyles()`)**:
   - Provee control imperativo en JS (pausa, inversión de velocidad, promesas `animation.finished`) manteniendo la aceleración por hardware del motor CSS.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_EMIL_KOWALSKI_ANIMATIONS_ON_THE_WEB]] · [[CANON_2D_3D_GRAPHICS_SHADERS_AND_AESTHETICS_2026]] · [[CANON_HOLO_SHADERS_3D_PACK_CHOREOGRAPHY_AND_WEBAUDIO_SFX_2026]] · [[CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY]] · #motion_and_animation
