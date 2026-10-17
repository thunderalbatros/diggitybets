# Hoja de Ruta Maestra — Fases 6 y 7 (Cierre de Proyecto)

> **Proyecto:** DiggityBets / HuntHub (`https://kick.com/diggitybets` | `https://diggitybets.vip`)  
> **Estado Actual:** Fases 1 a 7 Completadas y Verificadas al 100% (12/12 Suites en `core/` + 71 IDs en `test_site.mjs` + 0 Bloqueadores en `visual_audit.mjs` + `dist/` compilado)  
> **Última Actualización:** 2026-10-17  
> **Responsable:** Argon (Tech Lead & Squads 0 a 7)

---

## 💰 FASE 6: Economía Blindada `$DIG`, Precios/Stock Semanal en `#store`, Límites en `#house-games` y Logo SVG de Stake (✅ COMPLETADA)

1. **Emisión Controlada con "Live-Stream Gate" (`100 $DIG / hora` máx cuando el stream está en vivo):**
   - **Chat-to-Earn (`recordChatEarn` / `recordChatter`):** `+5 $DIG` cada 5 minutos (`cooldown = 300_000 ms`) con mensaje orgánico (filtrando emotes `:emote:`) = máx `60 $DIG/h`.
   - **Watch-to-Earn (`POST /api/watch/heartbeat` / `recordWatchHeartbeat`):** `+10 $DIG` cada 15 minutos (`cooldown = 900_000 ms`) en `#watch` para usuarios logueados = máx `40 $DIG/h`.
   - **Channel Points Bridge (`processChannelPointRedemption` / `handleChannelPointRedemption`):** `100 $DIG` (máximo 1 canje por sesión de stream por usuario).
2. **Precios, Stock Semanal y Descuento VIP de Stake en `#store`:**
   - `Weekly Raffle ($100 Bonus Buy Split)`: **`50 $DIG` / ticket** (Stock ilimitado; sorteo cada domingo).
   - `VIP Streamer Discord Role`: **`400 $DIG`** (1 vez por cuenta).
   - `Guaranteed 1v1 Battle Entry`: **`700 $DIG`** Regular / **`500 $DIG`** Stake VIP (`weekly_stock_limit = 6` por semana, cooldown 14 días por usuario).
   - `Guaranteed 8-Bracket Tourney Entry`: **`1,000 $DIG`** Regular / **`800 $DIG`** Stake VIP (`weekly_stock_limit = 6` por torneo/semana; los otros 2 cupos salen del chat).
   - `$20 Bonus Buy Split Profit (50/50)`: **`1,500 $DIG`** regular, o **`1,200 $DIG`** automático si `stake_verified === 1` bajo código `diggitybets` (`weekly_stock_limit = 3` por semana, Max Split Cap `$100 USD`).
   - Reinicio semanal automático cada lunes (`00:00 UTC`), píldora `.store-stock-pill` (`WEEKLY STOCK: X / Y AVAILABLE` / `SOLD OUT THIS WEEK`) y bloqueo automático de `Redeem`.
3. **Blindaje Anti-Exploit en `#house-games`:**
   - 9 juegos conectados al saldo real `$DIG` con **RTP `95.00%` (`5% House Edge`)**, **`MAX BET = 50 $DIG`** y **`MAX WIN CAP = 500 $DIG`** neto por tirada.
4. **Logo Vectorial `<svg>` de Stake:**
   - Reemplazado el PNG rasterizado con recuadro `#1a2c38` por `<svg class="social-logo-img social-logo-stake">` 100% transparente (`fill="#ffffff"`).
5. **Suite 11 (`core/test/phase6-economy-store.test.ts`):** 100% en verde.

---

## 🎨 FASE 7: Evolución Visual y de Animaciones de las 4 Overlays de OBS (`references/`) + Conexión URL para OBS Browser Source + Auditoría Final (✅ COMPLETADA)

### 1. Indexación de `references/` en el Omni-RAG (`tools/intelligence/rag_pipeline.mjs`)
- Añadir la carpeta `references/` al escaneo local de `tools/intelligence/rag_pipeline.mjs` (indexando `.md`, `.tsx`, `.ts`, `.jsx`, `.js`, `.css` de los repositorios de referencia y conservando intactos **Qdrant Cloud** y **Groq**) para consultar directamente los componentes, shaders, físicas y curvas WAAPI de `references/`.

### 2. Evolución de `wheel-csgo/` (CS:GO Active Chatter Wheel)
- **Fuentes de Referencia:** `references/CS2_Case_Overlay/`, `references/clones/casino-case-opening/src/pages/SpinCase/` (`ItemCard`, `CaseCard`) y `references/clones/react-bits/src/ts-default/TextAnimations/DecryptedText`.
- **Especificación Técnica (`<= 3% CPU` en OBS):**
  - Carrusel con estética CS2/Stake de lujo: tarjetas `.csgo-item-card` con rareza cromática en la base (`--rarity-color`: Mil-Spec `#4b69ff`, Restricted `#8847ff`, Classified `#d32ce6`, Covert `#eb4b4b`, Gold Special `#ffd700`) y gradiente radial inferior.
  - Física de desaceleración con suspenso (*near-miss* quintic/cubic-bezier `cubic-bezier(0.08, 0.82, 0.17, 1)`) deteniéndose a milímetros del borde de cambio de tarjeta antes de fijar al ganador.
  - Deflexión elástica de la púa central (`#centerNeedle` / `.needle-peg-deflect`) en cada cruce de borde de tarjeta sincronizada con el tick acústico.
  - Revelación del `@username` ganador en `#resultModal` y banner usando el algoritmo `DecryptedText` (scramble criptográfico secuencial de caracteres `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*` hasta revelar el nombre real).

### 3. Evolución de `wheel-duo/` (Dual Wheel: Chatter + Slot para Battle y Tourney)
- **Fuentes de Referencia:** `references/clones/grow-game/src/pages/games/Unboxing`, `references/clones/react-bits/src/ts-default/Components/OptionWheel`, `BorderGlow` y `references/TheAtlas-Queue`.
- **Especificación Técnica (`<= 3% CPU` en OBS):**
  - Rediseño de cada tarjeta dual (`.duo-card`): mitad izquierda con el avatar determinista/Kick del usuario + `@username`, y mitad derecha con la portada `3:4` real de la slot elegida (`!battle <slot>` o `!tourney <slot>`) resuelta vía `SlotResolver`.
  - Transición animada suave (`transform` + `opacity` con curva quíntica) al conmutar el switch entre `⚔️ 1v1 BATTLE` y `🏆 8-BRACKET TOURNEY`.
  - Contador en vivo de la cola de espera (`#queueLiveCounter` / `.atlas-queue-badge`: `QUEUE: N READY`) inspirado en `references/TheAtlas-Queue`.
  - Destello dorado perimetral (`BorderGlow` / `.winner-border-glow`) al seleccionar la dupla ganadora.

### 4. Evolución de `overlay-battle/` (Tarjetas Grandes de 1v1 Battle + King of the Hill)
- **Fuentes de Referencia:** `references/clones/react-bits/src/ts-default/Components/HoloCard`, `ReflectiveCard`, `SpotlightCard`, `Animations/ElectricBorder` y `references/clones/animejs/dist/modules/waapi`.
- **Especificación Técnica (`<= 3% CPU` en OBS):**
  - Tarjetas grandes de enfrentamiento (Player A vs Player B) con brillo holográfico especular (`HoloCard` / `ReflectiveCard` mediante gradiente cónico/lineal acelerado por GPU `transform: translate3d`) sobre la carátula de alta resolución de cada slot.
  - Badge superior de modo en vivo (`BONUS BUY` vs `SPINS`) sincronizado con `BattleManager`.
  - Barra de impacto comparativa con rastro secundario (*ghost damage bar* `.ghost-impact-bar`) animada con WAAPI (`element.animate()`) al actualizarse los multiplicadores o declararse ganador.
  - Medidor visual de racha **King of the Hill (`STREAK 1/4` a `4/4 — $20 PRIZE`)** con 4 segmentos luminosos y borde de energía eléctrica (`ElectricBorder` `.koth-electric-border`) envolviendo la tarjeta del Rey actual (`reigningKing`).

### 5. Evolución de `overlay-bonushunt/` (Panel de Community Bonus Hunt)
- **Fuentes de Referencia:** `references/Bonus-Hunt-Electron/`, `references/bonus-hunt-tracker/src/components/`, `references/clones/auto-animate/src/`, `references/clones/motion-primitives/app/docs/border-trail`, `references/repos/number-flow` y `knowledge/ui_ux_design/Biblia_02_Efectos_Visuales_Skia.md`.
- **Especificación Técnica (`<= 3% CPU` en OBS):**
  - Parámetros de Glassmorphism Científico (`Biblia_02_Efectos_Visuales_Skia.md`): superficie `rgba(20, 20, 20, 0.75)` con micro-borde especular `1px solid rgba(255, 255, 255, 0.08)` y luminancia controlada sin saturar el codificador NVENC/x264 de OBS.
  - Rodillos numéricos animados (`number-flow` / `countup-js` tabular-nums) en los 4 KPIs superiores (`Start Cost`, `Total Paid Out`, `Req Avg X`, `Run Avg X`).
  - Efecto `border-trail` dorado animado (`.status-opening-trail`) recorriendo el perímetro de la fila del bono que se está abriendo en vivo (`.status-opening`).
  - Mini-tarjetas `3:4` verificadas (`.bh-slot-thumb`) para cada slot vía `SlotResolver` y **auto-scroll vertical continuo suave (*ticker loop*)** cuando haya más de 8 bonos cargados.

### 6. Sincronización Total con OBS Browser Source (Cross-Process) + Botones en `#admin`
- Asegurar que las 7 overlays (`overlay-battle`, `overlay-bonushunt`, `overlay-tourney`, `overlay-celebration`, `wheel-csgo`, `wheel-duo`, `wheel-slots`) se sincronicen tanto por `BroadcastChannel` como por **WebSocket (`ws://127.0.0.1:3001`) y polling ligero a `/api/sync/state`**, garantizando que cuando el streamer controle `#admin` desde Chrome/Edge, la fuente "Browser" aislada dentro de OBS Studio reciba todos los eventos en `<50ms`.
- Agregar en las **Pestañas 3 y 4 de `#admin`** (`index.html` + `site/js/admin-hub.js`) botones `[ 📋 Copy OBS Browser URL ]` con las dimensiones recomendadas (`1920x1080` para Overlays de Escena y `620x620` / `1920x1080` para Wheels) listos para pegar directo en OBS Studio.

### 7. Súper-Auditoría Visual (`tools/audit/visual_audit.mjs`), Suite 12 (`core/test/phase7-overlays-obs.test.ts`) y Build Final
- Actualizar `tools/audit/visual_audit.mjs`:
  - Añadir `'admin'` al arreglo `VIEWS`.
  - Incorporar en `pageChecks()` las reglas `raw-os-emoji` y `sibling-overlap` (`> 8x8px`).
- Crear `core/test/phase7-overlays-obs.test.ts` (**Suite 12**) validando:
  - Indexación de `references/` en `rag_pipeline.mjs`.
  - Nuevas capacidades visuales/JS/CSS en `wheel-csgo/`, `wheel-duo/`, `overlay-battle/`, `overlay-bonushunt/`.
  - Sincronización WebSocket + `/api/sync/state` cross-process en las overlays y botones `[ Copy OBS Browser URL ]` en `#admin`.
- Ejecutar y verificar al 100%:
  1. `npm test` en `core/` (12/12 suites).
  2. `node tools/test_site.mjs` (71/71 IDs).
  3. `node tools/audit/visual_audit.mjs` (0 BLOCKERS).
  4. `node tools/build_dist.mjs` (empaquetado final en `dist/`).
