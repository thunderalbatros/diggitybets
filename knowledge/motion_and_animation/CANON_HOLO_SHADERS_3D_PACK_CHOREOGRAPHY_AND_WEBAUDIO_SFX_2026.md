# CANON: 3D Holographic Foil Shaders, Booster Pack Rip Choreography & Procedural WebAudio Foley (2026)

> **Alcance:** Este documento establece la arquitectura canónica de sombreadores CSS holográficos multi-capa (`pokemon-cards-css`), paralaje 3D multi-plano (`Atropos`), física de resortes amortiguados a 60 FPS y síntesis acústica procedural WebAudio (`ZzFX` + `Tone.js` + `jsfxr`) para la apertura de sobres 3D (`Holo-Vault Pack`), tarjetas coleccionables y efectos visuales de HuntHub / DiggityBets. **NO** es fuente de contratos de la API de Kick (ver `KICK_API_REFERENCE.md`) **NI** de reglas de sorteos criptográficos (ver `GIVEAWAY_STRATEGIES.md`).

---

## 1. Repositorios de Referencia Clonados (`references/fx-audio-sota/`)

1. **`simeydotme/pokemon-cards-css` (MIT)** — Ubicación local: `references/fx-audio-sota/pokemon-cards-css/`
   - Estándar de oro en sombreadores holográficos CSS sin costo de WebGL pesado.
   - Utiliza variables CSS reactivas (`--pointer-x`, `--pointer-y`, `--pointer-from-center`, `--pointer-from-top`, `--pointer-from-left`, `--background-x`, `--background-y`, `--card-opacity`, `--rotate-x`, `--rotate-y`) acopladas a un motor de resortes (`stiffness: 0.066, damping: 0.25`).
   - Implementa refracción espectral mediante 6 pilares solares (`--sunpillar-1` a `--sunpillar-6`) y modos de fusión compuestos por GPU (`mix-blend-mode: color-dodge`, `overlay`, `hard-light`, `plus-lighter`, `background-blend-mode: exclusion, darken, color-dodge`).
2. **`nolimits4web/atropos` (MIT)** — Ubicación local: `references/fx-audio-sota/atropos/`
   - Motor de paralaje 3D táctil con separación real de planos Z (`translate3d(x, y, z)`) para capas internas (`data-atropos-offset`).
   - Provee desplazamiento opuesto entre fondo (`-3%`), arte principal (`+4%`), marco metálico (`+6%`) y badges/tipografía (`+9%`), generando volumen físico genuino al inclinar la tarjeta.
3. **`micku7zu/vanilla-tilt.js` (MIT)** — Ubicación local: `references/fx-audio-sota/vanilla-tilt/`
   - Cálculo trigonométrico de ángulo especular y brillo radial (`glare`) sin reflujo de DOM (`getBoundingClientRect` cacheado en `pointerenter`).
4. **`KilledByAPixel/ZzFX` + `chr15m/jsfxr` + `Tonejs/Tone.js` (MIT)** — Ubicación local: `references/fx-audio-sota/{zzfx,jsfxr,tonejs}/`
   - Síntesis procedural de foley mecánico (crujido de aluminio Mylar, corte dentado con paneo estéreo, pop de vacío sub-grave, barrido aerodinámico de giro 3D y fanfarrias armónicas FM por rareza) con 0 KB de archivos MP3 externos.

---

## 2. Arquitectura Matemática del Sombreador Holográfico Multi-Capa

Para que una tarjeta 3D (como el `Holo-Vault Booster Pack`) se vea como un coleccionable físico AAA a 60 FPS en cualquier navegador y OBS Browser Source (`<= 5% CPU`), debe componerse de **6 capas apiladas en `preserve-3d`**:

### 2.1 Variables Reactivas Impulsadas por Resorte (Spring Physics)
En lugar de aplicar `transform` rígido directo en `mousemove`, un integrador de resorte amortiguado de Hooke (`stiffness = 0.085`, `damping = 0.26`) interpola en `requestAnimationFrame` (y se detiene automáticamente cuando la velocidad `< 0.005` para consumir `0% CPU` en reposo):

```css
--pointer-x: 50%;
--pointer-y: 50%;
--pointer-from-center: 0; /* clamp(hypot(px - 50, py - 50) / 50, 0, 1) */
--pointer-from-top: 0.5;
--pointer-from-left: 0.5;
--background-x: 50%;
--background-y: 50%;
--rotate-x: 0deg;
--rotate-y: 0deg;
--card-opacity: 0;
```

### 2.2 Las 3 Rarezas Visuales del Holo-Vault (`data-holo-rarity`)
1. **`mythic-gold` (Secret Rare 24K Gold — RTP >= 96.8% o Max Win >= 25,000x)**:
   - Marco y destello de oro líquido (`hsl(46, 95%, 55%)` + `conic-gradient` de pilares solares).
   - `mix-blend-mode: color-dodge` con matriz de destellos estelares (`glitter`) y `brightness(calc(0.55 + var(--pointer-from-center) * 0.35)) contrast(1.85) saturate(2.4)`.
2. **`radiant-prism` (Radiant Crosshatch Holo — Max Win >= 10,000x o RTP >= 96.2%)**:
   - Patrón de interferencia cruzada a `45deg` y `-45deg` (`repeating-linear-gradient`) combinado con espectro arcoíris a `55deg`.
   - `background-blend-mode: exclusion, darken, color-dodge` + `mix-blend-mode: color-dodge`.
3. **`cosmos-holo` (Cosmos Nebula Foil — Slots Verificadas Estándar)**:
   - Nebulosa prismática cian/esmeralda/magenta con destellos radiales y paralaje inverso (`calc(50% - (var(--background-x) - 50%) * 1.8)`).

---

## 3. Coreografía Interactiva en 5 Etapas para Apertura de Sobres (`Booster Pack Rip`)

1. **Etapa 0 — Interacción Táctil & Drag-to-Tear (Pre-Apertura)**:
   - El usuario puede **arrastrar el cursor/dedo horizontalmente sobre el sello metálico superior** (`pointerdown` + `pointermove`) viendo cómo el haz láser corta los dientes del aluminio en tiempo real y emite chispas, **o hacer un clic directo** en el sobre o en el botón `⚡ RIP HOLO-VAULT PACK`.
   - Al inclinar el sobre cerrado, se reproduce un sutil foley de aluminio (`playFoilCrinkle`) y el laminado exterior refracta la luz.
2. **Etapa 1 (`0ms – 360ms`) — Corte Láser & Vibración de Tensión**:
   - El haz de plasma corta de izquierda a derecha el sello dentado superior (`scaleX(0 -> 1)`).
   - El lienzo de partículas (`#vault-fx-canvas`) dispara chispas incandescentes doradas y cian a lo largo de la línea de corte mientras suena `playBoosterLaserTear()` paneado de izquierda (`-0.75`) a derecha (`+0.75`).
3. **Etapa 2 (`360ms – 720ms`) — Desprendimiento Físico del Sello & Ignición del Núcleo**:
   - La tira metálica superior sale despedida con torque 3D (`translate3d(150px, -95px, 120px) rotateZ(34deg) rotateX(55deg)`).
   - El núcleo interior detona un destello (`booster-core-flash`) acompañado por una onda expansiva de plasma y el sonido `playBoosterCoreRiser()` (pop sub-grave de vacío + riser armónico ascendente).
4. **Etapa 3 (`720ms – 1100ms`) — Apertura del Envoltorio & Giro Aéreo 3D de la Carta**:
   - El envoltorio frontal se abre hacia abajo mientras la carta interior emerge en el eje Z y ejecuta una pirueta 3D completa (`rotateY(540deg -> 0deg)` con sobre-impulso elástico `scale(0.72 -> 1.08 -> 1)`), sincronizada con `playBoosterCardWhooshFlip()`.
5. **Etapa 4 (`1100ms+`) — Revelación Coleccionable Multi-Plano & Fanfarria por Rareza**:
   - La carta queda suspendida en 3D con paralaje multicapa (`Atropos` offsets: fondo `2px`, brillo holo `6px`, marco de arte `28px`, badges superiores `42px`, placa inferior de telemetría `46px`), destello de partículas flotantes y el acorde musical `playBoosterRarityReveal(rarityTier)`.

---

## 4. Síntesis Acústica Procedural WebAudio (`site/js/pro-fx-audio.js`)

Todo efecto sonoro debe pasar por el `DynamicsCompressorNode` maestro (`threshold: -14dB, ratio: 8:1`) para garantizar `0 clipping` en OBS:

- **`playFoilCrinkle(intensity)`**: Ráfaga micro-filtrada (`bandpass 3800Hz–7200Hz`, `Q = 4.5`, duración `28ms`) que simula la flexión física del envoltorio metalizado Mylar.
- **`playBoosterLaserTear()`**: Ruido blanco modulado en amplitud a `32Hz` (simulando los dientes del precinto metálico) a través de un filtro `bandpass` que barre exponencialmente de `1100Hz` a `6800Hz` en `340ms`, con `StereoPannerNode` moviéndose de `-0.75` a `+0.75` + ráfaga chispeante ZzFX.
- **`playBoosterCoreRiser()`**: Golpe neumático sub-grave (`145Hz -> 34Hz` en `140ms`) + dos osciladores `sawtooth`/`triangle` desafinados ascendiendo una octava (`220Hz -> 880Hz`) con filtro resonante abriéndose hacia el clímax.
- **`playBoosterCardWhooshFlip()`**: Barrido aerodinámico (`bandpass 320Hz -> 1950Hz -> 280Hz` en `260ms`) + chasquido cristalino de bloqueo 3D.
- **`playBoosterRarityReveal(rarity)`**:
  - `mythic-gold`: Acorde triunfal de metales reales + campanas FM cristalinas (`D4, F#4, A4, C#5, D5, F#5, A5`) + cascada de monedas de oro (`playSkyCoinShower`) + impacto sub-grave.
  - `radiant-prism` / `cosmos-holo`: Arpegio pentatónico cristalino ascendente con cola de reverberación espacial y destello metálico agudo.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_EMIL_KOWALSKI_ANIMATIONS_ON_THE_WEB]] · [[CANON_2D_3D_GRAPHICS_SHADERS_AND_AESTHETICS_2026]] · [[CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY]] · [[CANON_60FPS_RENDER_AND_MOTION_OPTIMIZATION_PIPELINE]] · #motion_and_animation
