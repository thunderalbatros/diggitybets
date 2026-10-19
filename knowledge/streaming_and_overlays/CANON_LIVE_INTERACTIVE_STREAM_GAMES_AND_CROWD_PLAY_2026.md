# CANON: Diseño e Ingeniería de Juegos Interactivos en Vivo para Espectadores de Kick.com (Crowd Play & Premios en Vivo 2026)

**Alcance:** Aplicable a HuntHub / DiggityBets (Web App en `site/`, Overlays OBS en `overlay-*` y `wheel-*`, Backend Edge en `worker/index.js` y `core/src/index.ts`). Prohibido usar mecánicas de pago por entrada (buy-ins) o custodia de dinero de espectadores (`AGENTS.md §2.2`).

> **[VERIFICADO: Kick Dev Docs + Cloudflare Durable Objects Docs + Provably Fair HMAC-SHA256 Standard, 2026-10-19]**

---

## 1. Arquitectura de Juegos Interactivos en Vivo ("Crowd Play" Chat + Web Portal)

Para que cientos o miles de espectadores de **Kick.com** jueguen en vivo por premios (`$DIG` o premios en USD entregados fuera de banda por el streamer) sin superar el presupuesto de **≤ 5% CPU en OBS Browser Source** en una notebook HP 250 G8, todo juego interactivo en vivo debe seguir el patrón **Dual-Channel Deterministic State Machine (DC-DSM)**:

1. **Canal de Entrada Dual (Chat de Kick + Portal Web)**:
   - **Vía Chat de Kick (Zero-Friction)**: El espectador participa escribiendo un comando corto en el chat en vivo (ej. `!bet 2450`, `!tile C3`, `!rocket 2.5x`, `!vote 1`, `!join`). Ingerido por Pusher WebSocket / Webhook RSA de Kick con latencia `<150ms`.
   - **Vía Portal Web (`site/index.html`)**: El espectador autenticado con Kick OAuth 2.1 PKCE interactúa con controles táctiles a 60 FPS (grillas interactivas, sliders de multiplicador, reclamo de Bounties con `Bet ID`).
2. **Motor de Estado Único en el Borde (Cloudflare Durable Objects + D1)**:
   - Cada ronda de juego es una máquina de estados finita (`IDLE` → `LOBBY_OPEN` → `LOCKED` → `REVEALING` → `SETTLED`).
   - Durante `LOBBY_OPEN`, las jugadas se validan con **Valibot** y se deduplican por `kick_user_id` + huella `ThumbmarkJS` (prevención anti-multicuenta / Sybil).
   - Al pasar a `LOCKED`, se cierra la ventana de apuestas antes de revelar el resultado criptográfico.
3. **Renderizado Desacoplado a 60 FPS en OBS (`overlay-*`)**:
   - El overlay de OBS recibe únicamente el **resumen agregado** del lote (`batch_summary` cada `250ms`–`500ms`) y el evento final `REVEALING`, evitando crear nodos DOM por cada mensaje de chat individual.

---

## 2. Los 6 Arquetipos de Juegos en Vivo de Mayor Retención para Streams de Casino

### 2.1 Crowd Mines / Cazatesoros Comunitario (Grid 5x5 en Vivo)
- **Mecánica**: Aparece un tablero de `5x5` (coordenadas `A1` a `E5`) con 20 gemas `$DIG` y 5 minas ocultas.
- **Participación**: Los espectadores tienen `15 segundos` para elegir su coordenada desde el Portal o escribiendo `!mine B4` en el chat de Kick.
- **Resolución**: El servidor revela el tablero usando `HMAC-SHA256(serverSeed, clientSeed + ":" + roundNonce)`. Todos los espectadores que eligieron una casilla segura avanzan a la siguiente ola o reparten el pozo de puntos `$DIG` / sorteo instantáneo.
- **Por qué funciona**: Combina **prueba social visual** (mapa de calor en vivo de qué casillas elige la comunidad) con **tensión compartida** (*social synchrony*).

### 2.2 Live Community Crash / Decision Multiplier ("Hold or Cashout")
- **Mecánica**: Antes de que despegue el multiplicador en vivo, los espectadores fijan su objetivo de retiro (`targetMultiplier`, ej. `1.50x`, `3.00x`, `10.00x`).
- **Matemática Provably Fair**:
  $$\text{crashPoint} = \max\left(1.00, \left\lfloor \frac{100 \times (2^{52} - \text{houseEdge})}{2^{52} - h} \right\rfloor / 100\right)$$
  donde $h$ son los primeros 52 bits del `HMAC-SHA256(serverSeed, clientSeed:nonce)`.
- **UX y Audio**: Curva en `<canvas>` 2D acelerada por GPU con conteo ascendente de tono WebAudio (`Frequency = 180Hz + log(multiplier) * 140Hz`) pasando por un `DynamicsCompressorNode` a `-4 dBFS` para nunca saturar OBS.

### 2.3 King of the Hill (KOTH) & Torneos 8-Bracket de Slots en Vivo
- **Mecánica**: 8 slots compiten en llaves de eliminación directa (`brackets-manager.js`). En cada match 1v1, cada slot compra un bono (o hace 50 giros) y gana el mayor multiplicador $X = \text{Win} / \text{Bet}$.
- **Juego para Espectadores**:
  - **Predicción de Llave (Bracket Predictor)**: Antes de iniciar el cuarto de final, los espectadores votan quién ganará la llave y predicen el multiplicador de desempate.
  - **Modo KOTH ("Rey de la Colina")**: Un espectador dueño del "trono" defiende su slot actual contra el retador elegido por la ruleta de solicitudes (`!sr`). Si defiende 3 rondas seguidas, gana un premio especial fuera de banda.

### 2.4 Bonus Hunt Predictor & Break-Even Challenge
- **Mecánica**: Mientras el streamer colecciona bonos (fase `COLLECTING`), los espectadores predicen el balance final de apertura (`!guess 4250.50`) y la slot de mejor pago (`MVP Slot`).
- **Tolerancia Multi-Locale**: El parser (`core/src/number-parser.ts`) normaliza formatos europeos (`4.250,50`), estadounidenses (`4,250.50`) y sufijos (`4.25k`).
- **Feedback en Tiempo Real**: Durante la fase `OPENING`, el dashboard recalcula el **Break-Even Multiplier (BEM)** requerido en las cajas restantes:
  $$\text{BEM}_{\text{restante}} = \frac{\max(0, \text{Costo Inicial} - \text{Retorno Acumulado})}{\sum_{i \in \text{pendientes}} \text{Apuesta}_i}$$

### 2.5 Sistema de Bounties "Only on Stake" (Caza de Multiplicadores por Tiers)
- **Mecánica**: Espectadores que usan el código de referido oficial (`DIGGITYBETS`) cazan multiplicadores específicos en slots exclusivas *Only on Stake* organizadas en **6 Tiers de Volatilidad** (Premios de `$3`, `$5`, `$7`, `$10`, `$15` y `$20` USD).
- **Flujo de Verificación Automatizado + Aprobación Humana (HITL)**:
  1. El espectador ingresa su `Bet ID` de Stake (ej. `house:1234567890`) y enlace de repetición en el modal de reclamo.
  2. La extensión `diggity-stake-companion` / validador pre-verifica formato de `Bet ID`, slot objetivo, apuesta mínima y multiplicador alcanzado ($\text{Multi} = \text{Payout} / \text{Amount}$).
  3. El reclamo entra a la cola de administración con insignia de riesgo anti-fraude (`ThumbmarkJS` + `Turnstile`), donde el streamer aprueba con 1 clic y dispara el **Celebration Billboard Overlay** en OBS.

### 2.6 Ruletas de Recompensa y Apertura de Cajas Estilo CS2 (`wheel-csgo`, `wheel-slots`, `wheel-duo`)
- **Mecánica**: Cintas horizontales y ruedas con física de desaceleración (`cubic-bezier(0.12, 0.8, 0.18, 1)`).
- **Optimización Crítica para OBS (`<= 5% CPU`)**:
  - Pre-renderizar las tajadas estáticas de la rueda o las monedas vectoriales `$DIG` en un `<canvas>` offscreen (`wheelBufferCanvas` / `_digCoinSprite`) una sola vez.
  - En el bucle `requestAnimationFrame`, usar únicamente `ctx.rotate(angle)` + `ctx.drawImage(bufferCanvas, ...)`, eliminando miles de llamadas a `fillText` y `createRadialGradient` por segundo.

---

## 3. Reglas Innegociables de Equidad, Seguridad y Cumplimiento (Kick ToS)

1. **Participación 100% Gratuita (`AGENTS.md §2.2`)**:
   - Jamás cobrar dinero real, criptomonedas ni suscripciones pagas como requisito para participar en sorteos o juegos del chat.
   - Los puntos `$DIG` son estrictamente una moneda de lealtad virtual sin valor monetario ni posibilidad de compra.
2. **Compromiso Criptográfico Auditable (Commit-Reveal)**:
   - Antes de iniciar cada ronda o sorteo (`fair-draws`), el sistema publica en pantalla y en el chat el hash `SHA-256(serverSeed)`.
   - Al finalizar la ronda, revela el `serverSeed` en texto plano para que cualquier espectador pueda verificar que el resultado no fue manipulado.
3. **Defensa Anti-Bot y Anti-Multicuenta (`anti-fraud-fingerprinting`)**:
   - Todo reclamo de premio o participación web combina: sesión OAuth 2.1 de Kick verificada + token Cloudflare Turnstile + hash de dispositivo `ThumbmarkJS` + límite de tasa por IP/Usuario en Cloudflare Worker (`checkRateLimit`).
4. **Higiene DOM Anti-XSS**:
   - Los nombres de usuario del chat de Kick y los argumentos de comandos (`!sr`, `!guess`) son entrada no confiable: siempre se renderizan mediante `.textContent` o pasan por `escapeHtml()` / `DOMPurify` + `TrustedTypes`.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[KICK_API_REFERENCE]] · [[CANON_KICK_PUBLIC_API_V2_FULL_REFERENCE]] · [[POPULAR_SLOTS_ONLY_ON_STAKE_TIERS]] · [[CANON_SLOTS_STAKE_RTP_VOLATILITY_DYNAMICS]] · #streaming_and_overlays
