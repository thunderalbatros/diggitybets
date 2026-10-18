# CANON: Stake Challenges Bounty System Architecture, Fast Image Decoding & 60-FPS FLIP Choreography (2026)

> **Alcance:** Este documento establece la arquitectura canónica del sistema de **Bountys de Multiplicador (`#bounties`)** inspirado en *Stake Casino Challenges* (`stake.com/casino/challenges`) para referidos verificados (`código: diggity`), la matriz escalonada de premios en efectivo (`$3, $5, $7, $10, $15 y $20 USD`), la verificación antifraude de `Bet ID`, el pipeline ultrarrápido de imágenes (`ThumbHash`, `decoding="async"`, `fetchpriority`, `Speculation Rules API`, `Quicklink`, `content-visibility: auto`) y la coreografía FLIP/partículas fuera del hilo principal (`AutoAnimate`, `canvas-confetti` `OffscreenCanvas`, `Lenis`). **NO** es fuente de contratos de la API de Kick (ver `KICK_API_REFERENCE.md`), **NI** de reglas de sorteos criptográficos (ver `GIVEAWAY_STRATEGIES.md`), **NI** de reglas del torneo de 8 llaves (ver `BRACKET_8_TOURNAMENT.md`).

---

## 1. Investigación Canónica: Cómo Funcionan los Challenges de Stake (`stake.com/casino/challenges`)

`[VERIFICADO: stake.com/casino/challenges & stakecommunity.com, 2026-10-18]`

En el ecosistema de **Stake Casino Challenges** y programas de **Creator / Affiliate Bounties**, un desafío (*Challenge / Bounty*) es un contrato público sobre un juego específico donde el primer jugador (o cualquier referido elegible, según la modalidad) que alcance o supere un **Multiplicador Objetivo (`Target X`)** cumpliendo una **Apuesta Base Mínima (`Min Bet USD`)** gana instantáneamente una recompensa fija en efectivo (`USD`).

### 1.1 Reglas Matemáticas e Invariantes de Verificación
1. **Fórmula del Multiplicador Efectivo (`Achieved X`)**:
   $$\text{Multiplier } (X) = \frac{\text{Total Payout (USD)}}{\text{Total Bet / Base Bet Placed (USD)}}$$
   - Se calcula sobre una única ronda/giro liquidado en el servidor de Stake (`iid` / `casino:...` Bet ID).
   - **Nota sobre Bonus Buys vs. Base Spins**: El creador del Bounty define explícitamente por tarjeta si permite **Solo Giros Base (`BASE SPINS ONLY` / `Feature Spins`)** o si acepta **Compra de Bono (`BONUS BUY ALLOWED`)** calculado sobre el costo total o apuesta base. Por defecto en desafíos de multiplicador alto (`150x` a `2,500x`), se especifica claramente en un badge en la tarjeta (`BASE SPIN` o `ANY SPIN`).
2. **Umbral de Apuesta Mínima (`Min Bet USD`)**:
   - Exigido en equivalente `USD` al momento exacto de la apuesta (ej. `$0.10 USD`, `$0.20 USD`, `$0.40 USD`, `$1.00 USD`) para evitar abusos con centavos de monedas devaluadas (`ARS`, `IDR`, `JPY`) que distorsionen la probabilidad o el volumen de wager del código de referido.
   - **Exclusión Estricta de Demo / Fun Play**: Apuestas con monto `$0.00` o saldo ficticio son rechazadas automáticamente.
3. **Elegibilidad de Referido (`Código: diggity`)**:
   - Exclusivo para espectadores cuya cuenta de Stake esté vinculada y verificada bajo el código de afiliado **`diggity`** (`stakeVerified === true` en `userStore` / registro de referidos del Admin Hub).
   - Si un espectador aún no vinculó su cuenta, la tarjeta del Bounty muestra un CTA directo de onboarding (`"Link Code: DIGGITY to Unlock Bounties"`).
4. **Prueba Criptográfica / Auditoría por `Bet ID`**:
   - Toda apuesta en Stake genera un identificador único inmutable (formato `casino:123456789012` o enlace `https://stake.com/casino/home?iid=house%3A...&modal=bet`).
   - El espectador reclama el Bounty pegando su **Stake Bet ID / URL de la apuesta** + el **Multiplicador obtenido** (o capturándolo automáticamente desde la extensión **DiggityBets Stake Companion** con un clic).
   - **Anti-Replay Ledger**: Cada `Bet ID` normalizado se almacena en un índice único (`claimedBetIds`). Un mismo `Bet ID` jamás puede usarse dos veces ni reclamarse para dos Bountys distintos (`1 Bet ID = 1 Claim`).

---

## 2. Matriz Escalonada de Premios y Rareza Visual (`$3` a `$20 USD`)

Para que la sección **`Bountys` (`#bounties`)** en `PORTAL` combine claridad competitiva inmediata con la estética de coleccionables holográficos de `diggitybets`, se estructura en **6 Niveles de Recompensa (`Tiers`)** donde el color del shader holográfico (`pokemon-cards-css`), la apuesta mínima y el multiplicador escalan en armonía:

| Tier | Premio Cash (`USD`) | Nombre de Rango | Multiplicador Sugerido (`Target X`) | Apuesta Base Mín. (`Min Bet`) | Modalidad Sugerida | Sombreador / Acento Visual (`data-bounty-tier`) |
| :--- | :---: | :--- | :---: | :---: | :--- | :--- |
| **Tier 1** | **`$3 USD`** | **Scout Bounty** | `150x – 250x` | `$0.10 – $0.20` | Multi-Claim (hasta 3/semana) o First-to-Hit | **Emerald Matrix Foil** (`#00e701` / `--accent`) |
| **Tier 2** | **`$5 USD`** | **Hunter Bounty** | `350x – 450x` | `$0.20` | First-to-Hit | **Cyan Laser Prism** (`#00f2fe` / `--cyan`) |
| **Tier 3** | **`$7 USD`** | **Sniper Bounty** | `500x – 650x` | `$0.20` | First-to-Hit | **Cobalt Electric Foil** (`#3b82f6`) |
| **Tier 4** | **`$10 USD`** | **High-Voltage Bounty** | `800x – 1,000x` | `$0.20 – $0.40` | First-to-Hit | **Amethyst Plasma Holo** (`#a855f7`) |
| **Tier 5** | **`$15 USD`** | **Apex Predator Bounty** | `1,500x` | `$0.20 – $0.40` | First-to-Hit | **Crimson Supernova Foil** (`#f43f5e`) |
| **Tier 6** | **`$20 USD`** | **Mythic Grand Bounty** | `2,500x+` | `$0.20 – $0.50` | First-to-Hit (Jackpot Destacado) | **24K Mythic Gold Sunpillar** (`#fbbf24` / `--gold`) |

> **Flexibilidad Total para el Streamer (`Control Panel`):** Aunque estos 6 niveles vienen preconfigurados como plantillas rápidas de 1 clic (`+$3`, `+$5`, `+$7`, `+$10`, `+$15`, `+$20`), desde el **Control Panel** el streamer puede elegir cualquier slot de las **685+ slots del catálogo (`SlotResolver`)**, ajustar libremente el multiplicador exigido, la apuesta mínima en USD, la regla (`SOLO BASE` vs. `BONUS BUY OK`) y la cantidad de cupos (`1 ganador` vs. `N ganadores`).

---

## 3. Anatomía de la Tarjeta de Bounty (`Stake Challenge Card 2.0`)

Siguiendo las leyes de **Desencajonamiento (`minimal-surface-hierarchy`)**, **Simetría Óptica (`optical-symmetry-and-focus`)** y **Paralaje 3D (`Atropos` + `pokemon-cards-css`)**:

1. **Cabecera de Recompensa y Estado (`Z +36px`)**:
   - A la izquierda: Badge de estado con pulso vivo (`● ACTIVE BOUNTY`, `⏳ VERIFYING CLAIM` o `🏆 HUNTED BY @USER`).
   - A la derecha: Píldora luminosa de recompensa en efectivo (`$3 USD`, `$5 USD`, `$7 USD`, `$10 USD`, `$15 USD`, `$20 USD`) en tipografía `Chakra Petch` `800` con destello metálico del Tier correspondiente.
2. **Arte de la Slot con Carga Instantánea (`Z +22px`)**:
   - Portada oficial resuelta automáticamente vía `window.SlotResolver.resolve(slotName)` (con placeholder instantáneo `ThumbHash` / gradiente cromático sin parpadeo en blanco, `decoding="async"` y `loading="lazy"`).
   - Etiqueta flotante del proveedor (`PRAGMATIC PLAY`, `HACKSAW GAMING`, `NOLIMIT CITY`, etc.) y regla de giro (`BASE SPIN ONLY` o `ANY SPIN`).
3. **HUD Central de Condiciones (`Grid Simétrico 2 Columnas`, `Z +30px`)**:
   - **Columna 1 — `TARGET MULTIPLIER`**: Ej. **`500x`** (en `tabular-nums` de alto contraste).
   - **Columna 2 — `MIN BASE BET`**: Ej. **`$0.20 USD`** (con badge `CODE: DIGGITY`).
4. **Barra de Cupos / Ganador (`Progress & Hunter Strip`)**:
   - Muestra cupos disponibles (`1 / 1 CLAIM AVAILABLE`) o, una vez cazado, el sello de victoria con el avatar/nombre del espectador ganador (`HUNTED BY @viewer · 642.5x · Bet #casino:9841...`) y el emote **Pepe Flex EZ** o **Trofeo**.
5. **Pie de Acción Dual (`Z +40px`)**:
   - Botón Primario: **`🎯 Claim Bounty ($XX USD)`** (abre el modal de envío instantáneo con `Stake Bet ID`, multiplicador logrado y validación de código `diggity`).
   - Botón Secundario: **`Play on Stake ↗`** (abre la slot en Stake con código `diggity`).

---

## 4. Nuevos Repositorios y Tecnologías Ingeridas (`references/fx-audio-sota/`)

Para cumplir con la directiva de **animaciones más fluidas (60 FPS constantes), carga de imágenes ultrarrápida y cero impacto en OBS (`<= 5% CPU`)**, se clonaron e integraron 5 nuevos repositorios permisivos (sumando **21 repositorios SOTA** en `references/fx-audio-sota/`):

1. **`evanw/thumbhash` (MIT)** — Clonado en `references/fx-audio-sota/thumbhash/`
   - Codifica cualquier portada de slot en un hash binario de `~28 bytes` con soporte de relación de aspecto y canal alfa, decodificable en `< 0.2 ms` a un `data:image/png;base64` suave antes de que la red descargue el WebP/PNG real. Elimina el *Cumulative Layout Shift (CLS)* y los cuadros grises/blancos al abrir `#bounties`.
2. **`GoogleChromeLabs/quicklink` (Apache-2.0)** — Clonado en `references/fx-audio-sota/quicklink/`
   - Prefetch inteligente en tiempo inactivo (`requestIdleCallback`) respetando `navigator.connection.saveData` y `effectiveType`, combinado con la **Chrome Speculation Rules API (`<script type="speculationrules">`)** y `Image.decode()` fuera del hilo principal (`decoding="async"`).
3. **`formkit/auto-animate` (MIT)** — Clonado en `references/fx-audio-sota/auto-animate/`
   - Motor FLIP (*First, Last, Invert, Play*) de `~3 KB` sobre `Web Animations API (WAAPI)`. Cuando el espectador filtra el tablero de Bountys por premio (`ALL`, `$3`, `$5`, `$7`, `$10`, `$15`, `$20`) o por estado (`ACTIVE`, `CLAIMED`), las tarjetas se reordenan en GPU a 60 FPS sin saltos bruscos de layout.
4. **`catdad/canvas-confetti` (ISC)** — Clonado en `references/fx-audio-sota/canvas-confetti/`
   - Cañón de partículas con soporte nativo de **`OffscreenCanvas` en Web Worker (`useWorker: true`)**, garantizando que las explosiones doradas y esmeraldas al reclamar o aprobar un Bounty corran en un hilo separado con **0% de bloqueo en el hilo principal**.
5. **`darkroomengineering/lenis` (MIT)** — Clonado en `references/fx-audio-sota/lenis/`
   - Referencia de interpolación de scroll e inercia sincronizada con `requestAnimationFrame` y `IntersectionObserver` para activar efectos especulares solo en tarjetas visibles dentro del viewport.

---

## 5. Libros, Documentación Oficial y Cursos Gratuitos Ingeridos (Síntesis Aplicada)

1. **_The Book of Shaders_ — Patricio Gonzalez Vivo & Jen Lowe (`thebookofshaders.com`)**:
   - **Conocimiento aplicado**: Funciones de modelado algorítmico (`smoothstep`, ondas senoidales cruzadas, campos de distancia firmados 2D y gradientes espectrales) traducidas a **CSS Houdini `@property --border-angle`** y máscaras `conic-gradient` / `radial-gradient` compuestas en GPU (`mix-blend-mode: color-dodge`), logrando bordes de energía viva en las tarjetas de `$15` y `$20 USD` sin el costo de un contexto WebGL por tarjeta.
2. **_The Nature of Code_ (Edición 2024 JavaScript) — Daniel Shiffman (`natureofcode.com`)**:
   - **Conocimiento aplicado**: Ley de Hooke para resortes amortiguados ($\vec{F}_{\text{spring}} = -k \cdot \vec{x} - c \cdot \vec{v}$) con umbral de reposo (`auto-sleep` cuando $\|\vec{v}\| < 0.005$) para la inclinación 3D de las tarjetas de Bounty, más balística con resistencia del aire para el cañón de monedas y confeti.
3. **_Designing for Performance_ — Lara Hogan (O'Reilly Open Access) + _High Performance Browser Networking_ — Ilya Grigorik (`hpbn.co`)**:
   - **Conocimiento aplicado**: Presupuesto estricto del camino crítico de renderizado:
     - **Above-the-Fold Priority**: `fetchpriority="high"` únicamente en el hero/LCP; `loading="lazy"` + `decoding="async"` en grillas de slots y Bountys.
     - **Pre-decodificación Asíncrona (`img.decode()`)**: Decodificar texturas de slots en un pool asíncrono antes de insertarlas o animarlas para evitar pausas de rasterización de `16ms+`.
     - **Aislamiento de Subárboles (`content-visibility: auto; contain-intrinsic-size: 0 340px`)**: El navegador omite el cálculo de layout y pintura de tarjetas fuera de pantalla.
4. **Documentación Oficial W3C / Chrome For Developers (`web.dev/learn/performance` & `developer.chrome.com/docs/web-platform/view-transitions`)**:
   - Uso de `document.startViewTransition()` al cambiar entre filtros del tablero de Bountys o al pasar una tarjeta de estado `ACTIVE` a `CLAIMED`.
   - Separación estricta **Pass 1 (Read DOM `getBoundingClientRect`) -> Pass 2 (Write WAAPI `element.animate`)** para eliminar el *Layout Thrashing*.
