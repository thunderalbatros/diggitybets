# Reporte Final — Bot de Sorteos Kick con Ruleta CS:GO
## Canal: [kick.com/diggitybets](https://kick.com/diggitybets) · Streamer.bot v1.0.7 + OBS Studio

**Fecha:** 12 de octubre de 2026
**Estado:** Investigación y análisis completos. Este documento contiene el plan de implementación aprobado para construir el sistema.

---

## 1. Resumen ejecutivo

El sistema sorteá en vivo entre los usuarios que escribieron en el chat de Kick en los **últimos 30 segundos**, con una animación de ruleta horizontal estilo apertura de cajas de CS:GO integrada a OBS, y anuncia al ganador en el chat.

**Veredicto de viabilidad: 100% viable con el software ya instalado.** La instalación local de Streamer.bot v1.0.7 ya tiene conectada la cuenta broadcaster **Diggitybets** a Kick (verificado en logs del 11-oct). Lo que falta: activar el servidor WebSocket, crear 3 acciones + 1 comando, construir el overlay HTML y añadirlo a OBS.

**Advertencia importante:** la investigación previa (Google AI) contiene **errores críticos** — referencia a sub-acciones que no existen en v1.0.x ("Get Random User From Group", "Broadcast Custom Event") y un patrón de tracking con race conditions. Este reporte los corrige con la documentación oficial verificada (sección 3).

**Arquitectura recomendada** (sección 4): tracking en C# con diccionario de timestamps + timer de limpieza, selección de ganador con criptografía aleatoria justa, evento custom WebSocket hacia el overlay, y reel CSS con `cubic-bezier(0.12, 0.8, 0.15, 1)`.

---

## 2. Estado actual del sistema (análisis de la carpeta `streamerbot`)

Análisis completo de la instalación portable en `C:\Users\tomas\Desktop\streamerbot` (475 archivos; el grueso es caché de WebView2, no relevante).

| Componente | Estado | Evidencia |
|---|---|---|
| Streamer.bot v1.0.7 | ✅ Instalado y **corriendo** (PID 15620) | `Streamer.bot.exe`, `tasklist` |
| Cuenta Kick Broadcaster | ✅ **Diggitybets autenticada** (11-oct 23:42) | `logs/log_20261011.log`: "Broadcaster account (Diggitybets) authenticated" |
| Cuenta Kick Bot | ⚠️ Misma cuenta (Diggitybets) — funciona, pero los mensajes del bot salen como si los escribiera el streamer | mismo log: "Bot account (Diggitybets) authenticated" |
| Servidor WebSocket | ❌ **Auto-start desactivado**, sin contraseña | `data/settings.json`: `"websockets":{"autoStart":false,"port":8080,"enableAuth":false}` |
| Acciones | ❌ Ninguna creada | `data/actions.json`: `"actions":[]` |
| Comandos | ❌ Ninguno | `data/commands.json`: `"commands":[]` |
| Conexión OBS | ❌ Sin configurar | `data/obs.json`: `"connections":[]` |
| Kick: presencia | ✅ Funcionando (presencia artificial, umbral 5 min) | logs: "KickService :: Presence Timer" |
| Backup | ✅ Existe uno del 11-oct | `backup/backup-20261011-23402310500-1.0.7.zip` |

**Notas:**
- El mensaje de log "Artificially updated presence with a threshold of 5 minutes" **no es un error**: Kick no expone lista de espectadores, así que Streamer.bot infiere presencia desde la actividad de chat. No afecta el sorteo (que se basa en el trigger de mensajes de chat).
- `kick.autoConnect: false` en settings — tras reiniciar la app hay que reconectar Kick manualmente (o activar auto-connect en `Platforms > Kick`).
- Los ajustes de Kick recomendados ya están: `presentViewersEnabled: true`, `presentViewersInterval: 1`.

---

## 3. Correcciones críticas a la investigación original (Google AI)

La investigación previa sirve como base conceptual, pero **4 puntos son incorrectos** para v1.0.x según la documentación oficial verificada:

| # | Lo que decía la investigación | Realidad verificada (fuente) |
|---|---|---|
| 1 | Sub-acción "Get Random User From Group" | **No existe** en v1.0.x. Alternativas: sub-acción `Kick > User > Add Random Users` (con filtro por grupo y "Present Only") o **C#: `CPH.UsersInGroup(groupName)`** y elegir aleatorio en código ([docs](https://docs.streamer.bot/api/sub-actions/kick/user/add-random-users)) |
| 2 | Sub-acción "WebSocket → Broadcast / Custom Event" | **No existe con ese nombre.** Los mecanismos reales: sub-acción `Core > Triggers > Trigger Custom Event`, o C# **`CPH.TriggerEvent(name, useArgs)`** / **`CPH.WebsocketBroadcastJson(json)`** ([docs](https://docs.streamer.bot/api/csharp/methods/core/websocket/websocket-broadcast-json)) |
| 3 | Patrón tracker: Add to group → Delay 30s → Remove | **Tiene race condition**: si un usuario escribe a t=0 y t=25, la instancia de t=0 lo elimina a t=30 aunque su último mensaje fue hace 5 s. Además genera una instancia de acción concurrente **por cada mensaje**. Solución robusta en sección 5 (C# + timer) |
| 4 | "El overlay recibe el evento vía WebSocket" (implícito: automático) | Los eventos **no llegan sin suscripción explícita**. El overlay debe conectarse con `@streamerbot/client` y escuchar `client.on('General.Custom', ...)` tras suscribirse. Payload real documentado en sección 5.4 |

Además, nombres correctos confirmados que **sí** coinciden: `Add User To Group` y `Remove User From Group` existen bajo **`Kick > User Groups`** (params: `User Login`, `Group Name`; outputs: `addResult`/`removeResult`), y el trigger es **`Kick > Chat > Chat Message`**.

---

## 4. Arquitectura del sistema

```
┌─────────────────────── KICK (API oficial, webhooks) ───────────────────────┐
│  chat.message.sent → webhook → Streamer.bot Website Integration → app local│
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   ▼
┌───────────────────── STREAMER.BOT v1.0.7 (localhost) ──────────────────────┐
│                                                                             │
│  [Trigger: Kick > Chat > Chat Message]                                      │
│        └─> ACCIÓN 1 "Tracker30s" (C#):                                      │
│              activos[userName] = ahora  (dict en Global Var no-persistida)  │
│                                                                             │
│  [Timer cada 5 s: Timed Actions]                                            │
│        └─> ACCIÓN 2 "Prune30s" (C#):                                        │
│              elimina del dict quienes superaron 30 s sin escribir            │
│              (opcional: refleja el dict en el grupo "activos30s" p/ UI)     │
│                                                                             │
│  [Comando !sorteo → Trigger: Command Triggered, source Kick Message]        │
│        └─> ACCIÓN 3 "SorteoCSGO":                                           │
│              1. C#: valida ≥1 participante, excluye al broadcaster,        │
│                 elige ganador con RandomNumberGenerator,                    │
│                 CPH.SetArgument(...) + CPH.TriggerEvent("sorteo", true)     │
│              2. Delay 8 s (duración de la animación)                        │
│              3. Kick > Chat > Send Message to Channel: anuncio del ganador  │
│                                                                             │
│  WEBSOCKET SERVER 127.0.0.1:8080 (auto-start ON, password ON)              │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   ▼ evento {source:"General", type:"Custom"}
┌───────────────────── OVERLAY HTML LOCAL (OBS Browser Source) ──────────────┐
│  @streamerbot/client → client.on('General.Custom', spin)                    │
│  (secundario: client.on('Kick.ChatMessage') solo para cosechar avatares)   │
│  Reel horizontal CS:GO: ~56 tarjetas, ganador en índice ~51,               │
│  CSS transition 6.5 s cubic-bezier(0.12,0.8,0.15,1), offset ±0.4 tarjetas, │
│  ticks Web Audio, confetti + reveal del ganador                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Por qué este diseño:**
- **Una sola fuente de verdad** (el diccionario C#): sin race conditions, ventana de 30 s precisa, y sobrevive limpiamente a reinicios (variable no-persistida: no arrastra estados viejos).
- **Mínimo overhead**: 1 acción ultracorta por mensaje (en vez de Add+Delay+Remove de 30 s por mensaje) + 1 timer cada 5 s.
- **Fairness criptográfica** y exclusión del host, pensado para transparencia ante la audiencia.
- El **grupo "activos30s"** queda como espejo opcional para ver participantes en la UI de Streamer.bot, no como mecanismo.

---

## 5. Plan de implementación por fases

### Fase 0 — Respaldo y verificación (5 min)
1. Streamer.bot → `File > Backup` (o botón backup) para generar un zip fresco en `backup/`.
2. Verificar la conexión web de la integración Kick: la arquitectura de Kick exige **doble vinculación** — la app local (`Platforms > Kick`) y la web de Streamer.bot (`Account Settings → Connections → Connect` con la misma cuenta). El log local ya muestra broadcaster autenticado, pero confirmar que en la web figura "Connected as Diggitybets". Si los eventos no llegaran tras un reinicio, re-login (los cambios de scopes de Kick históricamente exigieron re-login — changelogs v1.0.3/v1.0.5).
3. En `Platforms > Kick`: activar **Auto Connect** (hoy está en false).

### Fase 1 — Servidor WebSocket (5 min)
`Servers/Clients > WebSocket Server`:
- **Auto Start: ON** (hoy está OFF — sin esto el overlay nunca conectará tras reiniciar).
- Address `127.0.0.1` · Port `8080` · Endpoint `/` (defaults).
- **Authentication: ON** + definir **Password** (el cliente JS la pasa como `password` y hace el challenge-response solo). `Enforce` puede quedar OFF.
- Start. Verificar estado "Running".

> Seguridad: mantener el binding en `127.0.0.1` (nunca `0.0.0.0`). Con password, incluso software local malicioso no podría enviar requests privilegiados.

### Fase 2 — Acciones y comando en Streamer.bot (30 min)

**Crear el comando** — pestaña `Commands` → clic derecho → `Add`:
- Name: `Sorteo` · Commands: `!sorteo` · Source(s): `Kick Message` · Global Cooldown: `60` (s) · Permissions: Everyone.
- (El broadcaster siempre está exento de cooldowns — el streamer puede relanzar cuando quiera.)

**Cómo dispara el streamer la ruleta** (las tres opciones ejecutan la misma acción `SorteoCSGO`):
1. **Chat (recomendada)**: el streamer escribe `!sorteo` en su propio chat — al ser broadcaster ignora el cooldown.
2. **UI de Streamer.bot**: botón *Run Action* sobre `SorteoCSGO` en la pestaña Actions.
3. **Botón físico**: integración nativa de Stream Deck (ya presente en settings, puerto 8059) para lanzar la acción desde un botón.

**Operación continua**: el tracker corre en **cada** mensaje de chat durante todo el stream (no se activa/desactiva por sorteo). La ventana de 30 s se evalúa **en el instante de cada giro**: `!sorteo` elige al azar solo entre quienes escribieron en los últimos 30 s hasta ese momento. Con Auto Connect + Auto Reconnect de Kick activados (Fase 0) y `autoReconnect` del cliente del overlay, el sistema queda operativo toda la transmisión sin intervención.

**ACCION 1 — `Tracker30s`** · Trigger: `Kick > Chat > Chat Message` · Cola: Default · Opciones: marcar **Exclude from Action Queue Pending/History** (acción de alta frecuencia) · Concurrent (CC): **OFF**
- Sub-acción única: `Core > C# > Execute C# Code`, nombre `TrackChatter`:

```csharp
using System;
using System.Collections.Generic;

public class CPHInline
{
    public bool Execute()
    {
        // userName = login en minúsculas (evita duplicados por mayúsculas)
        string userName;
        if (!CPH.TryGetArg("userName", out userName) || string.IsNullOrEmpty(userName))
            return false;

        var activos = CPH.GetGlobalVar<Dictionary<string, object>>("sorteoActivos", false)
                    ?? new Dictionary<string, object>();
        activos[userName] = (long)DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        CPH.SetGlobalVar("sorteoActivos", activos, false); // no-persistida
        return true;
    }
}
```

**ACCION 2 — `Prune30s`** · Trigger: `Core > Schedule > Timed Actions` (crear Timer en `Services > Timers`: Interval `5` s, Repeat ON, Lines 0)
- Sub-acción `Execute C# Code`, nombre `PruneChatters`:

```csharp
using System;
using System.Collections.Generic;

public class CPHInline
{
    public bool Execute()
    {
        var activos = CPH.GetGlobalVar<Dictionary<string, object>>("sorteoActivos", false);
        if (activos == null || activos.Count == 0) return true;

        long ahora = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
        var vivos = new Dictionary<string, object>();
        foreach (var kv in activos)
            if (ahora - Convert.ToInt64(kv.Value) <= 30000) vivos[kv.Key] = kv.Value;

        CPH.SetGlobalVar("sorteoActivos", vivos, false);
        return true;
    }
}
```

**ACCION 3 — `SorteoCSGO`** · Trigger: `Core > Commands > Command Triggered` (seleccionar el comando `!sorteo`) · Cola: Default
1. Sub-acción `Execute C# Code`, nombre `ElegirGanador`:

```csharp
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text.Json;

public class CPHInline
{
    public bool Execute()
    {
        var activos = CPH.GetGlobalVar<Dictionary<string, object>>("sorteoActivos", false)
                    ?? new Dictionary<string, object>();

        // Excluir al broadcaster/bot (mismo usuario: Diggitybets)
        string bc = null; CPH.TryGetArg("broadcastUsername", out bc);
        var participantes = new List<string>();
        foreach (var k in activos.Keys)
            if (string.IsNullOrEmpty(bc) || !k.Equals(bc, StringComparison.OrdinalIgnoreCase))
                participantes.Add(k);

        if (participantes.Count == 0)
        {
            CPH.SendKickMessage("🎲 No hay participantes activos en los últimos 30s. ¡Escriban en el chat para entrar!", false, true);
            return false; // detiene la acción (no hay Delay ni anuncio)
        }

        // Aleatoriedad criptográfica (fairness auditable)
        int idx;
        using (var rng = RandomNumberGenerator.Create())
        {
            var bytes = new byte[4];
            rng.GetBytes(bytes);
            idx = (int)(BitConverter.ToUInt32(bytes, 0) % (uint)participantes.Count);
        }
        string ganador = participantes[idx];

        // Payload para el overlay
        var payload = new Dictionary<string, object> {
            ["evento"]      = "sorteo",
            ["participantes"] = participantes,
            ["ganador"]     = ganador,
            ["unixtime"]    = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
        };
        CPH.SetArgument("sorteoPayload", JsonSerializer.Serialize(payload));
        CPH.SetArgument("ganador", ganador);              // para el mensaje final
        CPH.SetArgument("numParticipantes", participantes.Count);

        // Log de auditoría (persistido): transparencia ante la audiencia
        CPH.SetGlobalVar("ultimoSorteo", payload, true);

        // Dispara el Custom Event → overlay (General.Custom)
        CPH.TriggerEvent("sorteo", true);
        // Alternativa documentada: CPH.WebsocketBroadcastJson(json);
        return true;
    }
}
```

2. Sub-acción `Core > Timing > Delay`: **8000** (ms — animación ~6.5 s + reveal).
3. Sub-acción `Kick > Chat > Send Message to Channel` — MessageText:
   ```
   🎉 ¡Felicidades @%ganador%! Ganaste el sorteo de los últimos 30 segundos (%numParticipantes% participantes) 🎰
   ```
   "Send using bot account" OFF (envía como broadcaster — hoy bot y broadcaster son la misma cuenta; ver riesgo R2).

> Nota sobre variables: desde v1.0.5/v1.0.7 los nombres de variables **no admiten espacios**. El mensaje usa `%ganador%` y `%numParticipantes%` definidos vía `CPH.SetArgument` en el paso 1.

### Fase 3 — Overlay HTML/JS (2–3 h)

> **Esqueleto funcional ya creado** en `sorteo-csgo\overlay\` (`index.html`, `style.css`, `main.js`, `libs\LEEME.md`) — conecta al WebSocket, cosecha avatares, construye el reel, gira con easing y jitter, hace ticks con Web Audio y revela al ganador con confetti. Falta: vendorear libs (ver `libs\LEEME.md`), ajustar la estética a gusto y verificar nombres de eventos con `console.log` en primera ejecución.

**Ubicación:** `C:\Users\tomas\Desktop\streamerbot\sorteo-csgo\overlay\` con `index.html`, `style.css`, `main.js`, y `libs/` (todo local/vendored — el browser source no debe depender de CDNs).

**Base de referencia:** desmontar la extensión **Spinning Prize Wheel v2.0.5** de rondhi ([hilo oficial](https://extensions.streamer.bot/t/spinning-prize-wheel-update/1957), zip 85 KB) — ya resuelve el cableado Streamer.bot 1.0.7 + Kick + cliente `@streamerbot/client` 2.0.1 + sonido de tick incluido. Es ruleta circular; **sustituimos su render por el reel horizontal**.

**Conexión (`main.js`):**
```js
const client = new StreamerbotClient({
  host: '127.0.0.1', port: 8080, endpoint: '/',
  password: 'LA_MISMA_DE_FASE_1',
  autoReconnect: true, retries: -1,
});

client.on('General.Custom', ({ event, data }) => {
  // data llega con los args de la acción (sorteoPayload parseable a JSON)
  const p = JSON.parse(data.sorteoPayload);
  if (p.evento === 'sorteo') iniciarGiro(p.participantes, p.ganador);
});

// Secundario: cosechar avatares (producción verificada en ChatRD)
client.on('Kick.ChatMessage', ({ data }) => {
  if (data?.user?.profilePicture) avatares[data.user.userName] = data.user.profilePicture;
});
```
> Verificar en primera ejecución con `console.log(data)`: los nombres de eventos Kick en el cliente (`Kick.ChatMessage`) y el campo `user.profilePicture` provienen del código en producción de [ChatRD](https://github.com/vortisrd/chatrd), no de la docs oficial (sección Kick aún stub). Si no llega, fallback a iniciales CSS (diseñado así).

**Reel CS:GO (la técnica documentada):**
```css
.reel-track {
  display: flex; will-change: transform;
  transition: transform 6.5s cubic-bezier(0.12, 0.8, 0.15, 1); /* arranque fuerte, freno largo */
}
```
```js
const CARD_W = 150, WINNER_INDEX = 51;              // ~56 tarjetas totales
const jitter = (Math.random() * 0.8 - 0.4) * CARD_W; // nunca cae igual
const target = -(WINNER_INDEX * CARD_W - overlayWidth / 2 + CARD_W / 2 + jitter);
track.style.transform = `translateX(${target}px)`;
track.addEventListener('transitionend', revelarGanador, { once: true });
```
- Construir la tira: **barajar** los participantes, repetir cíclicamente hasta llenar ~56 tarjetas, e **inyectar al ganador** en el índice 51. Con pocos participantes se repiten (estándar en el formato).
- **Ticks**: Web Audio API con `OscillatorNode` corto (square 1500–2200 Hz, envelope 15 ms), agendados sobre `ctx.currentTime` siguiendo la inversa de la curva (los ticks se espacian al frenar). Nunca `setTimeout`. Reutilizable el WAV de tick de la extensión v2.0.5.
- **Reveal**: `transitionend` → highlight dorado de la tarjeta central + `canvas-confetti` + banner con el nombre.
- **Estética**: colores de rareza CS:GO (convención pública: mil-spec `#4b69ff`, restricted `#8847ff`, classified `#d32ce6`, covert `#eb4b4b`, oro `#ffd700`), marcos en CSS puro (no extraer assets de Valve — copyright). Fuente: **Chakra Petch** o **Rajdhani** ([Google Fonts](https://fonts.google.com/specimen/Chakra+Petch)) descargada vía [Fontsource](https://fontsource.org/) y servida local.
- **Avatares**: `profilePicture` cosechado → caché; `onerror` del `<img>` → tarjeta con iniciales. Alternativa determinista: [DiceBear](https://www.dicebear.com/) (`bottts` seed=username), cacheable offline.
- **Anti-doble-giro**: si llega un evento `sorteo` mientras gira, ignorar hasta terminar.
- **Estado al reconectar**: al `onConnect`, el overlay puede pedir la lista actual con `client.doAction(idActionLista)` → acción SB que hace `WebsocketBroadcastJson` del dict (opcional, fase 6).

### Fase 4 — OBS Studio (10 min)
Fuente → **Browser**:
- ✅ **Local file** → `sorteo-csgo\overlay\index.html`
- Width **1920** × Height **400**, posicionada bottom-center de la escena
- Custom CSS: dejar el default (`background-color: rgba(0,0,0,0); margin:0 auto; overflow:hidden` → transparencia)
- ✅ **Shutdown source when not visible** · ✅ **Refresh browser when scene becomes active**
- Settings > Advanced > **Browser Source Hardware Acceleration: ON**
- Un **único** browser source para todo el overlay (cada source es un proceso CEF aparte)
- Durante desarrollo: botón **"Refresh cache of current page"** (el local file no se recarga solo al editar)

### Fase 5 — Pruebas (30 min)
1. **Sin chat real**: en Streamer.bot, abrir la acción `Tracker30s` y ejecutarla con el botón *Run/Test* ajustando `%userName%` de prueba (o "Execute C#" directo). Verificar en Settings que la global `sorteoActivos` se llena.
2. **Overlay aislado**: abrir `index.html` en Chrome normal (fuera de OBS) con `console.log` — confirmar conexión WebSocket (`General.Custom` llega, payload correcto, giro fluido).
3. **Integrado**: pedir a un moderador/amigo (o segunda cuenta) que escriba en el chat de kick.com/diggitybets, lanzar `!sorteo` y verificar: reel con ese usuario, ganador correcto, mensaje al chat, sin duplicados.
4. **Caso borde**: lanzar `!sorteo` con 0 participantes → debe salir el mensaje "no hay participantes" y NO girar.
5. Verificar cooldown de 60 s para viewers.

### Fase 6 — Endurecimiento (opcional, post-primer-stream)
- Cuenta bot separada de Kick (ver R2) + "Send using bot account" ON + "Fallback to Broadcast" ON.
- Acción `ListaParticipantes` invocable por el overlay para reconstruir estado al reconectar.
- Contador de ganadores por usuario (`SetUserVar`) para limitar victorias repetidas, si se desea.
- Sonido de fanfarria final ([howler.js](https://howlerjs.com/)) y variantes de duración de giro.

---

## 6. Decisiones técnicas clave

| Decisión | Elección | Justificación (fuente) |
|---|---|---|
| Tracking de 30 s | C# dict de timestamps + timer 5 s | Elimina el race condition del patrón Delay; 1 escritura corta por mensaje en vez de una acción colgante de 30 s por mensaje. Cola Default es non-blocking y Concurrent ignora Delay ([docs colas](https://docs.streamer.bot/guide/core/actions)) |
| Selección del ganador | `RandomNumberGenerator` (cripto) | Fairness auditable ante la audiencia; `System.Random` es predecible con semilla. Log persistido del sorteo (`ultimoSorteo`) |
| Canal de datos al overlay | `CPH.TriggerEvent("sorteo", true)` → `General.Custom` | Evento documentado + suscripción simple en el cliente oficial ([payload](https://docs.streamer.bot/api/websocket/guide/events)) |
| WebSocket | 127.0.0.1:8080 + password, Enforce OFF | Auth solo obligatoria para requests privilegiados; password protege sin romper eventos ([docs auth](https://docs.streamer.bot/api/websocket/guide/authentication)) |
| Animación | CSS transition (no rAF) para el giro | Corre en el compositor GPU del CEF de OBS; resistente a jank del proceso JS. Ticks pre-agendados con Web Audio |
| Avatares | `data.user.profilePicture` + fallback iniciales | Verificado en producción (ChatRD); la API oficial `GET /public/v1/users` solo acepta IDs numéricos; el endpoint no oficial `kick.com/api/v2` está tras Cloudflare y sin CORS — no depender de él |
| ToS de Kick | Sorteo gratuito por chat = permitido | Prohibido: buy-ins y exigir KICKs para entrar ([community guidelines](https://kick.com/community-guidelines), [kicks-usage-policy](https://kick.com/kicks-usage-policy)) |

---

## 7. Riesgos y mitigaciones

| # | Riesgo | Prob. | Impacto | Mitigación |
|---|---|---|---|---|
| R1 | Eventos Kick con delay (webhooks) → participante entra tarde a la ventana | Media | Bajo | Ventana de 30 s ya tolerante; documentado como "Kick API Delay" en troubleshooting oficial |
| R2 | Bot = broadcaster (misma cuenta): anuncios salen como el streamer; sin identidad de bot | Media | Bajo (estético) | Funciona hoy. Fase 6: crear cuenta bot de Kick y activar "Send using bot account" + Fallback |
| R3 | Re-login de Kick tras futuras actualizaciones de scopes | Media | Medio | Tras cada update de Streamer.bot, verificar `Platforms > Kick`; changelogs v1.0.3/v1.0.5 exigieron re-login |
| R4 | Overlay recargado a mitad de giro (cambio de escena) | Baja | Bajo | "Refresh when scene becomes active" da estado limpio por sorteo; guard anti-doble-giro en JS |
| R5 | Chat muy activo (>10 msg/s) sobrecarga acciones | Baja | Bajo | Tracker es O(1) por mensaje; "Exclude from Action Queue Pending/History" activado |
| R6 | Fuente Stratum2 (CS:GO) es comercial | — | — | No usarla; Chakra Petch/Rajdhani locales (licencia abierta) |
| R7 | v1.1.0 alpha disponible | — | — | Quedarse en 1.0.7 stable (alpha tiene fixes pero no es producción) |

---

## 8. Recursos y referencias

### Documentación oficial
- Streamer.bot: [docs.streamer.bot](https://docs.streamer.bot) · [WebSocket config](https://docs.streamer.bot/api/websocket/guide/configuration) · [auth](https://docs.streamer.bot/api/websocket/guide/authentication) · [eventos](https://docs.streamer.bot/api/websocket/guide/events) · [cliente](https://docs.streamer.bot/api/websocket/guide/client) · [C# methods](https://docs.streamer.bot/api/csharp/guide) · [changelogs](https://streamer.bot/changelogs)
- Kick: [docs.kick.com](https://docs.kick.com) · [chat API](https://docs.kick.com/apis/chat.md) · [users API](https://docs.kick.com/apis/users.md) · [community guidelines](https://kick.com/community-guidelines)
- OBS: [Browser Source KB](https://obsproject.com/kb/browser-source) · [obs-browser](https://github.com/obsproject/obs-browser)
- Cliente JS: [github.com/Streamerbot/client](https://github.com/Streamerbot/client) · [docs del cliente](https://streamerbot.github.io/client/)

### Extensiones y repos de referencia
- **[Spinning Prize Wheel v2.0.5 — Kick + SB 1.0.7](https://extensions.streamer.bot/t/spinning-prize-wheel-update/1957)** (rondhi; base recomendada, incluye tick WAV) · [original de Lyfesaver](https://extensions.streamer.bot/t/spinning-prize-wheel/353)
- Reel CS:GO: [charamza/roulette](https://github.com/charamza/roulette) (técnica vanilla) · [monoblocker/roulette](https://github.com/monoblocker/roulette) (React) · [LuciusRVN/CS2_Case_Overlay](https://github.com/LuciusRVN/CS2_Case_Overlay) (overlay OBS activo) · [topic case-opening](https://github.com/topics/case-opening?l=javascript)
- Overlays SB: [vortisrd/chatrd](https://github.com/vortisrd/chatrd) (módulo Kick + `profilePicture`) · [fortuna-wheel](https://github.com/FlashGalatine/fortuna-wheel) · [zipper-ticker](https://github.com/FlashGalatine/zipper-ticker)

### Librerías y assets (todos gratuitos)
- [GSAP](https://gsap.com) (gratis desde 2025) · [canvas-confetti](https://github.com/catdad/canvas-confetti) · [howler.js](https://howlerjs.com) · [DiceBear](https://www.dicebear.com/) · [Chakra Petch](https://fonts.google.com/specimen/Chakra+Petch) / [Rajdhani](https://fonts.google.com/specimen/Rajdhani) vía [Fontsource](https://fontsource.org/) · curvas: [easings.net](https://easings.net/es#easeOutQuint) · [cubic-bezier.com](https://cubic-bezier.com)

### Comunidad y aprendizaje
- **Discord oficial de Streamer.bot**: [discord.com/invite/streamerbot](https://discord.com/invite/streamerbot) (~32k miembros, soporte principal — el foro está caído por DNS)
- YouTube: [Streamer.bot 101 — Beginner's Guide](https://www.youtube.com/watch?v=gfGy1gRH5ik) · [Conectar StreamerBot a Twitch/YouTube/Kick/Trovo](https://www.youtube.com/watch?v=x5tEAKSQtpQ) · [Streamer Bot HUGE Update — Kick Support](https://www.youtube.com/watch?v=IPnwul8U9Lc) · [Fixes Kick+Streamerbot](https://www.youtube.com/watch?v=2ksVSsjzYVE) · [Chatbot en Kick PC 2026](https://www.youtube.com/watch?v=WMIdK3hyvjQ)
- En español: [STREAMERBOT + KICK MASTERCLASS (playlist)](https://www.youtube.com/playlist?list=PLzihWO7qu_cKa99M1CAEjR9pq8qn_bjOU) · [KICK: TODO LO QUE NECESITAS (playlist)](https://www.youtube.com/playlist?list=PLzihWO7qu_cK-XEJk3XYG1en7DqOmB_Gd) · [Guía escrita de Joserra](https://joserragaming.com/guia-para-principiantes-de-streamerbot)
- Reddit: [r/streamerbot](https://www.reddit.com/r/streamerbot/) · [r/KickStreaming](https://www.reddit.com/r/KickStreaming/)

---

## 9. Checklist de puesta en marcha

- [ ] F0: Backup fresco + web de SB muestra "Connected as Diggitybets" + Auto Connect Kick ON
- [ ] F1: WebSocket Server Running, Auto Start ON, password definida
- [ ] F2: Comando `!sorteo` (source Kick Message, cooldown 60 s)
- [ ] F2: Acción `Tracker30s` (C# TrackChatter) + "Exclude from Pending/History"
- [ ] F2: Timer 5 s → Acción `Prune30s` (C# PruneChatters)
- [ ] F2: Acción `SorteoCSGO` (C# ElegirGanador → Delay 8000 → Send Message to Channel)
- [ ] F3: Overlay en `sorteo-csgo/overlay/` con libs vendored; giro + reveal + ticks + confetti
- [ ] F4: OBS Browser Source 1920×400 local file + opciones de refresh marcadas
- [ ] F5: Pruebas (0 participantes, 1-3 participantes reales, cooldown, reconexión WS)
- [ ] F6 (opcional): cuenta bot separada, reconstrucción de estado, límite de victorias

**Tiempo estimado total: 3–4 horas** (F0-F2: 40 min · F3: 2-3 h · F4-F5: 40 min).
