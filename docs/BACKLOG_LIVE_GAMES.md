# 🎮 BACKLOG: Juegos Interactivos en Vivo para Espectadores de Kick.com (`docs/BACKLOG_LIVE_GAMES.md`)

**Alcance:** Hoja de ruta técnica y de producto para la próxima iteración de juegos interactivos en vivo de **HuntHub / DiggityBets** (participación simultánea desde el chat de Kick.com y el Portal Web).  
**Estado:** `EN BACKLOG — LISTO PARA CONSTRUCCIÓN`  
**Cumplimiento (`AGENTS.md §2.2`):** Entrada `100%` gratuita (`0` custodia de dinero de espectadores), premios en `$DIG` o USD entregados fuera de banda por el streamer, equidad criptográfica auditable (`HMAC-SHA256` Commit-Reveal) y presupuesto `<= 5% CPU` en OBS Browser Source.

---

## 💣 Juego 1: Crowd Mines 5x5 ("Cazatesoros Comunitario en Vivo")

### 1.1 Resumen de Mecánica y Experiencia del Espectador
- **Tablero**: Grilla de `5×5` (`25` casillas: columnas `A–E`, filas `1–5`) que contiene **20 Gemas `$DIG`** y **5 Minas ocultas**.
- **Participación Dual (Zero-Friction)**:
  - **Desde el Chat de Kick**: El espectador escribe `!mine C3` (o `!caza B4`) durante la ventana de `15 segundos` (`LOBBY_OPEN`).
  - **Desde el Portal Web (`site/index.html`)**: El espectador autenticado hace clic directamente sobre la casilla deseada en la grilla interactiva, viendo en vivo el **mapa de calor (*heatmap*)** con el porcentaje de la comunidad en cada coordenada.
- **Resolución Provably Fair (`HMAC-SHA256`)**:
  - Antes de abrir el lobby, se muestra el hash `SHA-256(serverSeed)`.
  - Al cerrar la ventana (`LOCKED`), se barajan las 25 posiciones mediante **Fisher-Yates sin sesgo de módulo** alimentado por `HMAC-SHA256(serverSeed, clientSeed + ":" + roundNonce)`.
  - Quienes eligieron una casilla segura sobreviven a la ola actual y acumulan multiplicador o reparten el pozo de `$DIG` / sorteo en vivo.

### 1.2 Componentes Técnicos a Construir
1. **Backend / Estado (`worker/index.js` & `core/src/index.ts`)**:
   - Máquina de estados `CrowdMinesEngine` (`IDLE` → `LOBBY_OPEN` → `LOCKED` → `REVEALING` → `SETTLED`).
   - Parser del comando `!mine <A1-E5>` con deduplicación por `kick_user_id` + huella `ThumbmarkJS`.
2. **Portal Frontend (`site/js/live-crowd-games.js` + `site/css/style.css`)**:
   - Grilla 5x5 con animación de revelación 3D (`transform: rotateY(180deg)`) acelerada por GPU y badges de votos comunitarios.
3. **OBS Overlay (`overlay-crowd-mines/`)**:
   - Vista transparente a 60 FPS que renderiza únicamente el resumen agregado de votos por casilla cada `300ms` (`<= 2% CPU` en OBS) y dispara audio procedural `ZzFX` / WebAudio limitado a `-4 dBFS`.

---

## 🚀 Juego 2: Live Community Crash ("Multiplicador en Vivo: Hold or Cashout")

### 2.1 Resumen de Mecánica y Experiencia del Espectador
- **Objetivo**: Antes de que despegue la ronda, cada espectador fija su **Multiplicador de Retiro Automático (`targetMultiplier`, ej. `1.50x`, `2.50x`, `10.00x`)**.
- **Participación Dual**:
  - **Desde el Chat de Kick**: Comando `!crash 2.5x` (o `!retiro 3.25`).
  - **Desde el Portal Web**: Selector rápido táctil (`1.5x`, `2x`, `5x`, `10x` o valor personalizado) + botón de retiro en vivo.
- **Matemática Criptográfica Auditable**:
  $$\text{crashPoint} = \max\left(1.00, \left\lfloor \frac{100 \times (2^{52} - \text{houseEdge})}{2^{52} - h} \right\rfloor / 100\right)$$
  donde $h$ son los primeros 52 bits del digest `HMAC-SHA256(serverSeed, clientSeed + ":" + roundNonce)`.
- **Coreografía Visual y Sonora (60 FPS)**:
  - Curva ascendente renderizada en un único `<canvas>` 2D con sprites pre-cacheados para los avatares que van saltando ("paracaídas") al alcanzar su multiplicador objetivo.
  - Síntesis WebAudio de tensión ascendente (`180Hz -> 880Hz`) protegida por el `DynamicsCompressorNode` maestro.

### 2.2 Componentes Técnicos a Construir
1. **Backend / Estado (`worker/index.js` & `core/src/index.ts`)**:
   - Generador de curva y validador `LiveCrashEngine` con ventana de entrada de `20s`, cálculo determinista de ganadores y acreditación en lote (`D1 batch`).
2. **Portal Frontend (`site/js/live-crowd-games.js`)**:
   - Panel de predicción pre-ronda, tabla en vivo de supervivientes vs. estrellados y verificador criptográfico de semilla con 1 clic.
3. **OBS Overlay (`overlay-crowd-crash/`)**:
   - Overlay compacto para esquina de stream con contador tabular (`font-variant-numeric: tabular-nums`) y lista de los 3 mejores multiplicadores cazados en la ronda.
