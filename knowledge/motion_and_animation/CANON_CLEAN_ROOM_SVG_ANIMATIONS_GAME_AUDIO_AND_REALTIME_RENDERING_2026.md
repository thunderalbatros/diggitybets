# Tratado Canónico Clean-Room: Espaciado de Animación (Richard Williams, Val Head), Animaciones SVG (Sarah Drasner), Renderizado en Tiempo Real (Akenine-Möller, Lengyel) e Implementación de Audio de Juegos (Stevens & Raybould) (2026)

**Alcance:** Aplicable a todas las animaciones de interfaz, líneas conectoras SVG (`overlay-tourney`), efectos de celebración (`overlay-celebration`), ruletas (`overlay-slotrequests`, `wheel-*`), shaders GPU y síntesis de audio procedural (`site/js/audio.js`, `site/js/pro-fx-audio.js`) del `Squad 5`. Sintetiza en sala limpia (*Clean-Room*) los principios matemáticos y técnicos de Williams, Head, Drasner, Akenine-Möller, Lengyel y Stevens/Raybould.

---

## 1. Espaciado de Fotogramas, Anticipación y Peso Físico (*The Animator's Survival Kit* — Richard Williams & *Designing Interface Animation* — Val Head)

### 1.1 *Timing* vs. *Spacing* a 60 FPS
- **Timing (Duración)**: En interfaces web productivas (Val Head), ninguna transición de navegación o apertura de panel debe superar **`150ms–280ms`**. Solo las secuencias de espectáculo en vivo (giro de ruleta de slots o revelación de carta épica en OBS) usan curvas dramáticas de **`2.5s–4.5s`**.
- **Spacing (Concentración de Fotogramas — Richard Williams)**:
  - La sensación de peso y energía no depende de cuántos milisegundos dura la animación, sino de **qué tan juntos o separados están los cambios de posición entre fotogramas consecutivos**:
    1. **Entrada Explosiva (*Snap Out*)**: El objeto recorre el **70% de la distancia en los primeros 3 fotogramas (`50ms`)** y usa los `200ms` restantes para asentarse milimétricamente (`cubic-bezier(0.16, 1, 0.3, 1)`).
    2. **Anticipación Micro-Elástica**: Antes de lanzar una carta ganadora o disparar un giro de ruleta, retroceder un **3%–5% en dirección opuesta durante `60ms–90ms`** prepara el ojo del espectador y multiplica el impacto percibido.

---

## 2. Coreografía Vectorial de Alta Precisión (*SVG Animations* — Sarah Drasner)

### 2.1 Trazado Dinámico de Líneas Conectoras (`stroke-dasharray` & `stroke-dashoffset`)
- Para animar el avance de un competidor por las llaves del *Bracket de Torneo* (`overlay-tourney`) sin deformar la línea:
  1. Obtener la longitud exacta del camino una sola vez al montar: `const len = pathEl.getTotalLength();`.
  2. Asignar `pathEl.style.strokeDasharray = `${len}`;` y animar `strokeDashoffset` desde `len` hasta `0` cuando un jugador avanza de ronda.
- **Preservación de Grosor Uniforme (`vector-effect="non-scaling-stroke"`)**:
  - Todo `<path>`, `<line>` o `<rect>` dentro de un `<svg viewBox="...">` fluido debe incluir `vector-effect="non-scaling-stroke"` para que el borde de `1.5px` o `2px` jamás se vea aplastado o distorsionado al cambiar el tamaño de la ventana.

---

## 3. Pipelines de GPU, *Tone Mapping* y Shaders sin Divergencia (*Real-Time Rendering 4th Ed.* — Akenine-Möller et al. & *Foundations of Game Engine Development* — Eric Lengyel)

### 3.1 Prohibición de Ramificaciones Dinámicas (`if / else`) en Fragment Shaders (*Warp Divergence*)
- Las GPUs ejecutan los *Fragment Shaders* en grupos de **32 o 64 hilos en paralelo (*Warps / Wavefronts*)** bajo arquitectura `SIMT`.
- Si un shader contiene `if (uv.x > 0.5) { ... } else { ... }`, la GPU se ve obligada a ejecutar **ambas ramas para todos los píxeles del bloque**, desperdiciando el 50% de la potencia de cómputo.
- **Patrón Canónico Branchless en GLSL**:
  - Reemplazar condicionales por funciones intrínsecas de hardware que se ejecutan en **1 ciclo de reloj**:
    ```glsl
    float mask = step(0.5, uv.x); // 0.0 si uv.x < 0.5, 1.0 si uv.x >= 0.5
    vec3 finalColor = mix(colorA, colorB, smoothstep(0.48, 0.52, uv.x));
    ```

### 3.2 Curva Cinematográfica *ACES Filmic Tone Mapping* (Prevención de Colores Quemados)
- Cuando se suman múltiples luces especulares, partículas doradas y brillos de neón en una celebración de *Max Win*, los valores RGB superan `1.0` y se queman a blanco plano sin matiz.
- Aplicar la aproximación rápida de **Narkowicz ACES** antes de mostrar el píxel mantiene la riqueza cromática dorada/esmeralda en las altas luces:
  $$\text{ACES}(x) = \text{clamp}\left(\frac{x(2.51x + 0.03)}{x(2.43x + 0.59) + 0.14}, 0.0, 1.0\right)$$

---

## 4. Diseño de Audio Anti-Fatiga para Streams de Larga Duración (*Game Audio Implementation* — Richard Stevens & Dave Raybould)

### 4.1 Las 4 Leyes de Ingeniería de Sonido para Transmisiones de 6 Horas en OBS
1. **Micro-Variación Aleatoria (*Pitch & Gain Humanization*)**:
   - El cerebro humano detecta y aborrece cuando un sonido repetitivo (como el tic-tac de una ruleta o la caída de monedas `$DIG`) es idéntico dos veces seguidas (*Machine-Gun Effect*).
   - Aplicar en cada disparo una variación aleatoria sutil de frecuencia:
     $$f_{\text{actual}} = f_{\text{base}} \cdot 2^{\text{rand}(-0.05, +0.05)} \quad (\approx \pm 60\text{ cents})$$
     y de ganancia ($\pm 1.2\text{ dB}$).
2. **Escalado Armónico Progresivo (*Combo Pitch Escalation*)**:
   - Cuando se abren bonos consecutivos o sube un multiplicador en vivo, incrementar la nota base siguiendo una escala **Pentatónica Mayor o Lidia** (`[1.0, 1.122, 1.26, 1.498, 1.681, 2.0]`) para generar euforia ascendente natural.
3. **Límite de Polifonía y *Voice Stealing* (`Max 4 Concurrent Coin Voices`)**:
   - Nunca disparar 50 osciladores `WebAudio` en el mismo milisegundo durante una lluvia de monedas; limitar la polifonía activa a `4–6` voces concurrentes con desfase temporal de `25ms–45ms` evita la saturación de fase y mantiene el uso de CPU en `< 0.5%`.
4. **Techo Maestro de Transmisión (`-4 dBFS` Hard Limiter)**:
   - Todo el bus de audio pasa por un `DynamicsCompressorNode` configurado como limitador de pared (`threshold: -4, knee: 0, ratio: 20, attack: 0.001, release: 0.12`) para no tapar jamás la voz del streamer en OBS.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_OPEN_BOOKS_SHADERS_SDF_AND_WEB_ANIMATION_MASTERY_2026]] · [[CANON_EMIL_KOWALSKI_ANIMATIONS_ON_THE_WEB]] · [[CANON_HOLO_SHADERS_3D_PACK_CHOREOGRAPHY_AND_WEBAUDIO_SFX_2026]] · [[CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY]] · [[book_game_feel_steve_swink]] · #motion #shaders #audio #svg
