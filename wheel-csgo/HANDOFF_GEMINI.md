# HANDOFF — Bot de Sorteos Kick (ruleta CS:GO) para terminar con Gemini 3.8 Flash (Antigravity IDE)

**Proyecto:** sorteo en vivo para https://kick.com/diggitybets — la ruleta CS:GO gira cuando el streamer dispara el sorteo, desliza las tarjetas de los participantes (avatar en miniatura + nombre debajo) y se detiene en el ganador; se anuncia en el chat. El bot está activo TODO el stream y **cada giro elige al azar solo entre quienes escribieron en el chat en los últimos 30 segundos** al momento de disparar.

**Documento maestro:** `C:\Users\tomas\Desktop\streamerbot\sorteo-csgo\REPORTE_PLAN_IMPLEMENTACION.md` (léelo primero — contiene investigación completa, fuentes y el código C# de las 3 acciones). Este handoff es la guía operativa para terminar sin contexto previo.

---

## 1. Reglas duras (leer antes de tocar nada)

1. `C:\Users\tomas\Desktop\streamerbot` es una **instalación portable de Streamer.bot v1.0.7 EN USO**. No renombrar/mover/borrar DLLs ni el exe. Solo crear archivos nuevos dentro de `sorteo-csgo\`.
2. **Nunca editar `data\*.json` a mano mientras Streamer.bot esté corriendo**: la app hace AutoSave cada 5 minutos y sobreescribe los cambios (verificado en sus logs). Toda configuración se hace desde la **UI de Streamer.bot**.
3. Antes de cualquier cambio en la configuración: `File > Backup` (ya existe `backup\backup-20261011-...zip` como referencia).
4. Streamer.bot puede estar corriendo (proceso `Streamer.bot.exe`); para cambios en settings, mejor cerrarlo y reabrir.
5. Todo el overlay debe funcionar **offline** (libs vendored, ver `overlay\libs\LEEME.md`); la única dependencia de red aceptable son los avatares de Kick.
6. Verificado en producción: la cuenta Kick **Diggitybets** ya está autenticada como broadcaster y bot (misma cuenta) en esta instalación.

## 2. Estado actual (verificar antes de asumir — marcar al completar)

- [x] Investigación completa y reporte con plan (`REPORTE_PLAN_IMPLEMENTACION.md`)
- [x] Esqueleto funcional del overlay creado: `overlay\index.html`, `overlay\style.css`, `overlay\main.js`, `overlay\libs\LEEME.md`
- [x] Instalación SB v1.0.7 analizada: broadcaster Kick OK, WS server OFF, 0 acciones, 0 comandos, OBS sin conexión
- [ ] **Fase 1:** WebSocket Server ON (Auto Start, password en UI de SB) — sección 5 abajo
- [x] **Fase 2:** Comando `!giveaway` (alias `!sorteo`) + Acciones C# completadas y empaquetadas en archivo de 1 clic: `giveaway-csgo-1.0.7.sb`
- [x] **Fase 3-final:** Libs vendoreadas 100% offline (`streamerbot-client.js`, `confetti.browser.min.js`), fuentes locales (`Chakra Petch` woff2 400/600/700), audio local (`spin-tick.mp3`), regla de idioma inglés aplicada y estética CS:GO terminada
- [ ] **Fase 4:** OBS Browser Source 1920×400 local file + "Shutdown source when not visible" + "Refresh browser when scene becomes active" + hardware accel ON
- [ ] **Fase 5:** Pruebas en vivo en Kick (o en local vía `window.testGiveaway(...)`)

## 3. Arquitectura (resumen de 10 líneas)

Kick (API oficial, webhooks → relay de Streamer.bot Website Integration) → **Streamer.bot v1.0.7** local:
cada mensaje de chat ejecuta la acción `Tracker30s` (C#: diccionario `sorteoActivos` en Global Var NO-persistida con `userName → timestamp`); un Timer cada 5 s ejecuta `Prune30s` (elimina entries >30 s); el comando `!sorteo` (o botón Run/Stream Deck) ejecuta `SorteoCSGO`: C# elige ganador con `RandomNumberGenerator` excluyendo al broadcaster, hace `CPH.SetArgument` + `CPH.TriggerEvent("sorteo", true)` → evento WebSocket `General.Custom` → el **overlay** (`overlay\main.js`) construye la tira de ~56 tarjetas, inyecta al ganador en el índice 51, gira con `transition 6.5s cubic-bezier(0.22,1,0.36,1)` + jitter ±40% de tarjeta, ticks con Web Audio, `transitionend` → highlight + banner + confetti; tras Delay 8 s la acción envía el mensaje al chat de Kick con `Kick > Chat > Send Message to Channel`.

**Por qué NO usar el patrón "Add to group → Delay 30s → Remove"**: race condition documentada (reporte §3) — un usuario que re-escribe es borrado antes de tiempo y cada mensaje cuelga una acción de 30 s.

## 4. UX requerida (lo que el usuario pidió textualmente)

1. La ruleta **empieza a girar cuando el streamer aprieta el trigger** (`!sorteo` en su chat / botón Run en SB / botón Stream Deck — las tres ejecutan la misma acción; broadcaster exento de cooldown).
2. Se **deslizan los nombres de los participantes con avatar en miniatura y su nombre debajo** (así está construida `.tarjeta` en `style.css`: avatar circular 86px + nombre debajo).
3. La tira **se detiene en el ganador** bajo la línea dorada central (marcador), con highlight + banner + confetti.
4. **Bot activo durante todo el stream**: tracker en cada mensaje, Kick Auto Connect + Auto Reconnect ON en `Platforms > Kick`, overlay con `autoReconnect: true, retries: -1`.
5. **Cada giro** sortea solo entre quienes escribieron en los últimos 30 s al momento del disparo (lo garantiza el diccionario + poda).

## 5. Pasos exactos en la UI de Streamer.bot (no automatizables desde consola)

**Fase 1 — WebSocket:** menú `Servers/Clients > WebSocket Server` → `Auto Start` ON, address `127.0.0.1`, port `8080`, `Authentication` ON + definir password (apuntarla; va en `main.js`). `Enforce` OFF. Start → debe decir "Running". Después poner la misma password en `overlay\main.js`.

**Fase 0 restante:** `Platforms > Kick` → activar `Auto Connect` (hoy está en false en `data\settings.json`). Verificar en la web de Streamer.bot (Account Settings → Connections) que figura "Connected as Diggitybets" — la integración Kick exige vinculación app + web (webhooks).

**Fase 2 —** (nombres EXACTOS; el código C# completo está en el reporte §5):
1. Pestaña `Commands` → Add: Name `Sorteo`, Commands `!sorteo`, Source(s) `Kick Message`, Global Cooldown 60, Permissions Everyone.
2. Acción `Tracker30s`: trigger `Kick > Chat > Chat Message`; opción **Exclude from Action Queue Pending/History** ON; Concurrent (CC) OFF; sub-acción `Core > C# > Execute C# Code` (nombre `TrackChatter`) con el código del reporte.
3. Timer: `Services > Timers` → Add: Interval `5`, Repeat ON, Lines 0.
4. Acción `Prune30s`: trigger `Core > Schedule > Timed Actions` (seleccionar el timer); sub-acción C# `PruneChatter` del reporte.
5. Acción `SorteoCSGO`: trigger `Core > Commands > Command Triggered` (comando `!sorteo`); 3 sub-acciones en orden: C# `ElegirGanador` (reporte) → `Core > Timing > Delay` 8000 → `Kick > Chat > Send Message to Channel` con texto `🎉 ¡Felicidades @%ganador%! Ganaste el sorteo de los últimos 30 segundos (%numParticipantes% participantes) 🎰` ("Send using bot account" OFF).

## 6. El overlay (qué está hecho y qué falta)

**Hecho** (`overlay\`): conexión con reconexión infinita, handler `General.Custom` con fallback, cosecha de avatares vía `Kick.ChatMessage`, construcción de la tira (barajado + ganador inyectado en índice 51), giro CSS easeOutQuint exacto + jitter, ticks Web Audio con la inversa analítica de la curva, reveal con highlight/banner/confetti, guard anti-doble-giro, escape de HTML en nombres.

**Falta:**
1. Vendorear libs según `overlay\libs\LEEME.md` y cambiar los `<script src>` de `index.html`.
2. Password real en `main.js` (`CONFIG.password`).
3. Fuente local (Chakra Petch/Rajdhani) — LEEME §3.
4. Pulido estético a gusto (tamaños, colores de rareza en `RAREZAS` de `main.js`, duración en `CONFIG.duracionMs` — mantener sincronizado con el `transition` de `style.css`).
5. (Opcional) sonido de fanfarria final con howler.js; (opcional) pedir lista actual al reconectar vía `client.doAction`.

## 7. OBS (Fase 4)

Fuente Browser → Local file `overlay\index.html` → 1920×400 → custom CSS default (transparencia) → marcar **Shutdown source when not visible** y **Refresh browser when scene becomes active** → Settings > Advanced > Browser hardware acceleration ON. Un solo browser source para todo.

## 8. Puntos a VERIFICAR en primera ejecución (abrir `index.html` en Chrome normal y leer console)

1. `General.Custom` llega y `data.sorteoPayload` es el JSON con `evento/participantes/ganador` (si Streamer.bot envía los args con otra forma, el fallback usa `data.ganador`; ajustar según el log).
2. `Kick.ChatMessage`: confirmar el nombre del evento y el campo `data.user.profilePicture` (fuente: código en producción de ChatRD; NO documentado oficialmente). Si no existe → el overlay ya funciona con iniciales CSS (aceptable).
3. Sin password/auth en el WS server, el cliente conecta igual (auth solo obligatoria para requests privilegiados) — pero la política del proyecto es password ON.
4. Probar el giro disparando la acción `SorteoCSGO` a mano (botón Run) con la global `sorteoActivos` poblada (ejecutar antes `Tracker30s` con test args).

## 9. Problemas conocidos (mitigaciones ya decididas)

| Síntoma | Causa | Mitigación |
|---|---|---|
| No llegan eventos de Kick | Scopes cambiaron en update de SB | Re-login en `Platforms > Kick` (changelogs v1.0.3/v1.0.5 lo exigieron) |
| Eventos con retraso | "Kick API Delay" (webhooks) | Aceptado; ventana de 30 s tolerante |
| Overlay no reconecta tras reinicio de SB | — | Ya cubierto: `autoReconnect, retries:-1` |
| Local file no refresca al editar | Caché CEF de OBS | Botón "Refresh cache of current page" en propiedades de la fuente |
| Anuncios salen como el streamer | bot = broadcaster (misma cuenta) | Aceptado por ahora; opcional: cuenta bot separada + "Send using bot account" + "Fallback to Broadcaster" ON |
| Nombre de usuario con caracteres raros | — | `escapeHtml` + `CSS.escape` ya aplicados en el overlay |

## 10. Definición de terminado (acceptance criteria)

1. El streamer dispara `!sorteo` (o botón) → la ruleta gira 6.5 s mostrando tarjetas avatar+nombre → se detiene con el ganador bajo el marcador → banner + confetti → mensaje en el chat de Kick con el ganador.
2. Solo participan quienes escribieron en los últimos 30 s (verificar con la global `sorteoActivos` en SB justo antes de girar).
3. `!sorteo` con 0 participantes → mensaje "no hay participantes" y SIN giro.
4. El broadcaster (Diggitybets) nunca puede ganar.
5. Tras reiniciar Streamer.bot y OBS, todo reconecta solo (Auto Start WS + Auto Connect Kick + autoReconnect overlay).
6. Dos giros seguidos no se pisan (cooldown 60 s + guard del overlay).

## 11. Referencias rápidas

- Reporte maestro: `..\REPORTE_PLAN_IMPLEMENTACION.md` (código C#, fuentes, riesgos)
- Docs oficiales: docs.streamer.bot · docs.kick.com · obsproject.com/kb/browser-source
- Cliente JS: github.com/Streamerbot/client · Extensión base: extensions.streamer.bot/t/spinning-prize-wheel-update/1957
- Discord oficial (soporte): discord.com/invite/streamerbot
