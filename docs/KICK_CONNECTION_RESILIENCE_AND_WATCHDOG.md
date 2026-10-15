# HuntHub — Resiliencia de Conexión con Kick.com & Watchdog Autónomo

> **Documento:** `docs/KICK_CONNECTION_RESILIENCE_AND_WATCHDOG.md`  
> **Fecha:** 2026-10-13  
> **Autores:** Squad 1 (Research) & Squad 2 (Architecture & Backend)  
> **Objetivo:** Explicación forense de las fallas en ReachAces / BlakJac21 y arquitectura del escudo auto-sanador de HuntHub.

---

## 1. Diagnóstico Forense: ¿Por qué se caen ReachAces y BlakJac21?

Al desarmar y analizar el código fuente de `reachaces.com` y `blakjac21.com` descubrimos las **3 causas raíz** exactas por las cuales ambos sitios sufren desconexiones constantes con Kick.com:

### Causa 1: Arquitectura "Serverless" Estática (Vercel) sin Persistencia
* **El problema:** ReachAces y BlakJac21 corren sobre funciones serverless de Vercel. Las funciones serverless se ejecutan durante 5 a 15 segundos y mueren. No tienen un proceso continuo en segundo plano.
* **El síntoma en su código:** En `auth.js` de ReachAces encontramos literalmente este mensaje de error:
  ```javascript
  // auth.js línea 20 (Código original de ReachAces)
  if (message === "Client authentication failed") {
    return "Kick rejected the client secret. Regenerate it in Kick Developer Portal, paste it into .env, run npm run verify:kick until it says SUCCESS, then update Vercel and redeploy.";
  }
  ```
  **Conclusión:** ReachAces **obliga a un humano** a entrar al portal de Kick, regenerar claves manualmente, pegarlas en el `.env`, probar en su computadora y volver a desplegar la web. Si el token expira mientras el streamer está en vivo, la web queda rota hasta que alguien lo arregla a mano.

### Causa 2: Claves de Pusher WebSocket "Hardcodeadas"
* Kick utiliza Pusher para transmitir el chat y los eventos en tiempo real.
* A lo largo del último año, Kick actualizó su infraestructura y rotó su `app_key` de Pusher (por ejemplo, de `eb1d5f283081a78b932c` a `34bf7a0ff419a2a775b9`).
* Los sitios que tenían la clave fija en su código dejaron de recibir mensajes de chat, canjes de puntos y seguidores en el acto.

### Causa 3: Falta de "Circuit Breaker" (Agotamiento por Rate-Limit)
* Cuando Kick tiene micro-cortes o mantenimiento (errores HTTP 502/503), los servidores de ReachAces bombardean la API de Kick con peticiones desesperadas.
* Cloudflare detecta este spam y **bloquea la dirección IP del servidor** (HTTP 429 Too Many Requests), dejando el sitio bloqueado por horas.

---

## 2. El Escudo de 4 Capas de HuntHub: ¿Cómo Evitamos Estos Problemas?

En **HuntHub** diseñamos una arquitectura resiliente y autónoma inspirada en las herramientas de `centinela-studio` (`kick-auth-watchdog.mjs` y `resilience-guard.mjs`).

```
┌────────────────────────────────────────────────────────────────────────┐
│                   HUNTHUB CONNECTION SHIELD                            │
└────────────────────────────────────────────────────────────────────────┘
        │
        ├─► [1] PROACTIVE TOKEN WATCHDOG (Renovación silenciosa preventiva)
        │       Monitorea el TTL del token cada 10 min.
        │       Si restan < 30 min, lo renueva ANTES de que expire.
        │
        ├─► [2] DYNAMIC PUSHER DISCOVERY (Cero claves fijas)
        │       Si Kick rota su Pusher Key, el bot detecta el error 4001,
        │       inspecciona el bundle de Kick, extrae la nueva clave y reconecta en < 3s.
        │
        ├─► [3] CIRCUIT BREAKER & BACKOFF EXPONENCIAL
        │       Si Kick responde 502/503/429, no satura su API.
        │       Pausa con backoff (5s, 10s, 20s), sirve datos desde SQLite local.
        │
        └─► [4] MONITOR CONTINUO (/api/health/kick) & 1-CLICK HEAL
                Health-check en vivo en el Admin Dashboard.
                Botón de reautorización en 1 clic sin tocar código ni consolas.
```

---

### Capa 1: Watchdog Proactivo de Tokens (`KickWatchdog`)
* **Ubicación:** [core/src/ingestor/kick-watchdog.ts](file:///c:/Users/tomas/Desktop/streamerbot/core/src/ingestor/kick-watchdog.ts).
* **Cómo funciona:**
  1. Un proceso silencioso en segundo plano revisa el tiempo de vida (`expires_in`) del `access_token` de Kick.
  2. Si al token le quedan **menos de 30 minutos de vida**, no espera a que falle una petición: llama inmediatamente a `https://id.kick.com/oauth/token` con el `refresh_token`.
  3. Recibe la nueva dupla de tokens y los guarda atómicamente en la base de datos (SQLite / Cloudflare KV).
  4. **Resultado:** El token nunca expira en producción y el streamer jamás tiene que regenerar secretos a mano.

### Capa 2: Redescubrimiento Dinámico de Credenciales de Pusher
* **Cómo funciona:**
  1. Si Kick vuelve a rotar su Pusher Key, la conexión WebSocket recibe un evento `pusher:error` con código `4001` (App key not found).
  2. En lugar de quedarse colgado en bucle infinito, `KickWatchdog.discoverActivePusherKey()` se activa automáticamente.
  3. Hace una consulta ultraligera a `https://kick.com/kick-token-provider` o a los metadatos públicos del canal.
  4. Extrae la nueva clave activa (`pusher.key` y `cluster`), actualiza la configuración en memoria y reconecta el chat en **menos de 3 segundos**.

### Capa 3: Circuit Breaker con Backoff Exponencial y Jitter
* **Cómo funciona:**
  1. Si Kick sufre una caída temporal o responde con error `502 Bad Gateway` o `429 Too Many Requests`, el circuito pasa a estado **`OPEN` (Abierto)**.
  2. El sistema se protege: suspende los llamados externos por 5 segundos, luego 10s, 20s, hasta 60s como máximo, agregando milisegundos aleatorios (*jitter*) para evitar coincidir con otros bots.
  3. Mientras tanto, la web **no se congela ni muestra pantalla en blanco**: sigue funcionando fluidamente sirviendo los datos guardados en SQLite (saldo de puntos, torneos, última ruleta).
  4. Cuando Kick responde normalmente, el circuito pasa a `HALF_OPEN` para una prueba y luego se restablece en `CLOSED` (Saludable).

### Capa 4: Health Monitor en Tiempo Real (`/api/health/kick`)
Creamos un endpoint público y administrativo que monitorea constantemente el enlace con Kick:
```json
{
  "status": "HEALTHY",
  "wsConnected": true,
  "pusherKey": "34bf7a0ff419a2a775b9",
  "pusherCluster": "us2",
  "tokenStatus": {
    "hasToken": true,
    "isExpired": false,
    "remainingSeconds": 82400,
    "expiresAt": 1791960000000
  },
  "circuitBreakerState": "CLOSED",
  "consecutiveFailures": 0,
  "latencyMs": 28,
  "lastSuccessfulPing": "2026-10-13T08:52:00.000Z"
}
```
Si algo se degrada, una luz de estado en el [Master Admin Dashboard](file:///c:/Users/tomas/Desktop/streamerbot/admin.html) cambia a amarillo o rojo con un botón para **Reconectar en 1 Clic**, sin requerir abrir consolas ni modificar variables de entorno.

---

## 3. ¿Qué pasa si Kick actualiza su Base de Datos o API?

Nuestra arquitectura utiliza el **Patrón Adaptador (Decoupled Adapter)**:
1. **Independencia de Datos:** HuntHub **NO depende de la estructura interna de la base de datos de Kick**. Toda la información de HuntHub (puntos virtuales, torneos 1v1, predicciones de bonus hunt, historial de sorteos) vive en **nuestra propia base de datos SQLite / Cloudflare D1**.
2. **Eventos Normalizados:** Kick solo nos envía eventos (ej: mensaje en chat, canje de puntos). Si Kick renombra un campo (ej: `chatroom_id` por `channel_id`), el cambio se absorbe en una única línea de nuestro adaptador de entrada ([kick-pusher.ts](file:///c:/Users/tomas/Desktop/streamerbot/core/src/ingestor/kick-pusher.ts)), sin romper ninguna de las ruletas ni la web.
3. **Cero Dependencia de Terceros:** A diferencia de Botrix o ReachAces, que dependen de servidores de terceros propensos a caídas masivas en horarios pico de stream, HuntHub corre de forma autónoma y controlada por vos.
