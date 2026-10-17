# Streamers de Casino en Kick.com (Angloparlantes) con Sitios Web, Puntos, Store, Raffles y House Games

> **Proyecto:** HuntHub (`diggitybets`)  
> **Fuente Ampliada:** Investigación de Ingeniería Inversa de **Centinela Studio** (`research/STREAMER_SITES_REVERSE_ENGINEERING_REPORT.md` & `research/KICK_CHANNEL_POINTS_AND_HOUSE_GAMES_RESEARCH.md`) + Relevamiento de Mercado 2026.  
> **Filtro Específico:** Creadores angloparlantes de **Kick.com** con plataformas web oficiales donde los espectadores linkean sus cuentas (Kick OAuth 2.1), aprovechan puntos de canal, participan en rifas, juegan mini-juegos (House Games) o compiten en eventos en directo.

---

## 1. Los 4 Casos Insignia Analizados en Centinela Studio

### 🃏 1. BlakJac21 (`blakjac21.com`) — El Pionero de House Games con Moneda Virtual
* **Canal Kick:** `kick.com/blakjac21`
* **URL:** [blakjac21.com](https://blakjac21.com)
* **Arquitectura:** Node.js / Vercel Serverless Functions + Vanilla ES6 Modules.
* **Autenticación:** Kick OAuth 2.1 PKCE (`/api/auth/login`) con sesión HTTP-Only y modal de vinculación de Stake (`/api/users/link-stake`).
* **Economía de Puntos ("UncCoins"):**
  * Moneda virtual del stream otorgada a los espectadores activos de Kick.
  * Muestra de balance en vivo en el header (`#hg-balance`) y sistema de auto-recarga (`#hg-self-credit`).
* **Suite Completa de House Games Jugables en la Web:**
  * **Blackjack:** Reglas oficiales (paga 3:2, dealer se planta en 17, seguro 2:1), soporte multi-mano (`data-hand-index`) y gráfica de zapato de cartas (`.hg-bj-shoe-deck`).
  * **Ruleta Europea:** Rueda de un solo cero con tapete interactivo de apuestas internas y externas.
  * **Keno:** Selector de números con tablas de multiplicadores dinámicos.
  * **Top Dollar:** Simulación de tragamonedas clásica de 3 rodillos.

---

### 🎟️ 2. ReachAces (`reachaces.com`) — El Rey de las Rifas y Wager Tiers
* **Canal Kick:** `kick.com/reachaces`
* **URL:** [reachaces.com/rewards](https://www.reachaces.com/rewards) & [reachaces.com/weekly-raffles](https://www.reachaces.com/weekly-raffles/)
* **Arquitectura:** Comparte el mismo núcleo de código que BlakJac21.
* **Kick OAuth & Stake Link Obligatorio:**
  * Al ingresar mediante Kick, despliega un modal obligatorio (`showStakeLinkModal`) que consulta la API de Afiliados de Stake.
  * Si el usuario apostó bajo el código `ReachAces`, activa el estado `affGranted: true`.
* **Motor de Rifas Semanales (`/weekly-raffles/`):**
  * **Algoritmo:** 1 ticket por cada $100 apostados en volumen ponderado (`total_weighted_amount`).
  * Asigna rangos de tickets enteros discretos $[T_{\text{start}}, T_{\text{end}}]$ y sortea con CSPRNG.
* **Sistema de Recompensas por Rango ($150.000+ USD en Premios):**
  * Niveles VIP: Bronze, Silver, Gold, Platinum 1–6, Diamond 1–5 y Obsidian.
  * Verificación integrada con tickets automáticos de Discord.

---

### 🛡️ 3. KeithLocks (`keithlocks.com`) — Plinko Web y Blindaje Anti-Fraude
* **Canal Kick:** `kick.com/keithlocks`
* **URL:** [keithlocks.com](https://keithlocks.com)
* **Arquitectura:** Laravel + Vite SPA (`index-DX3SdXuv.js`) montado sobre Cloudflare Edge.
* **House Games:**
  * **Plinko Board (`PlinkoBoard-D_be4bAh.js`):** Tablero interactivo de Plinko basado en Canvas jugable directamente en la web para los miembros del canal.
* **Anti-Fraud Fingerprinting (`FingerprintProvider`):**
  * Ejecuta un fingerprinting silencioso en el navegador del usuario al cargar la página: calcula el hash de renderizado Canvas 2D, renderer WebGL, latencia de Web Audio y métricas de pantalla.
  * **Propósito:** Bloquear cuentas múltiples y granjas de bots que intentan farmear puntos de canal o tickets de sorteos.
* **Live Leaderboard:** Conexión WebSocket en tiempo real (`realtime-DcTAPmkv.js`) para una carrera de apuestas de $70.000 USD.

---

### 💬 4. SchneckyIRL (`schneckyirl.com`) — Chat en Vivo y Monogramas de Slots
* **Canal Kick:** `kick.com/schneckyirl`
* **URL:** [schneckyirl.com](https://schneckyirl.com)
* **Arquitectura:** Laravel 11 + Inertia.js + Ziggy Router + Laravel Cloud.
* **Integración del Stream:**
  * Chat en vivo embebido en el sitio con pipeline de avatares en formato WebP liviano.
  * **Monogramas Procedurales de Slots:** Evita problemas de copyright utilizando íconos estilizados de slots populares (`ironbank.png`, `dawnofkings.png`, `ripcity.png`, `doghouse.png`, `lebandit.png`).
  * Tablas de clasificación en vivo ($45.000 USD activos) y sorteos de "Rain Raffle" sincronizados.

---

## 2. Los Grandes Portales de Ecosistema Completo (SOTA 2026)

| Streamer / Portal | Canal Kick | Moneda / Puntos | Store & Raffles | House Games / Minijuegos | Eventos en Stream |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GETDGN** (`getdgn.com`) | `highstakeshugs` | Puntos por visualización en Kick | Points Shop: Vouchers de casino, roles VIP Discord, tickets de rifa | Mini-juegos de casino en la web | Daily Raffles, torneos de slots con ranking |
| **OEG.GG** (`oeg.gg`) | `oneeyedgregg` | Site Points + Faucet diario | Points Shop: Gift cards, cupones y entradas a sorteos | **Mini-juegos jugables en la web con puntos del stream** | Wager races mensuales (Roobet/PackDraw) |
| **CamNeverWins** (`camneverwins.com`) | `camneverwins` | Puntos por chat y horas vistas | Points Shop con códigos y premios digitales | Predicciones de espectadores | **Noches de Bingo comunitario** y slot battles |
| **Roshtein** (`roshtein.com`) | `roshtein` | Multi-moneda (Kick Points, Roshies, etc.) | The Roshtein Store: Ropa, hardware gamer, crypto | Predicciones deportivas y de slots | Torneos en directo, Rosh Exchange |
| **ClassyBeef** (`classybeef.com`) | `classybeef` | BeefPoints (StreamElements) | Tienda con tickets de rifas de lujo (Rolex) | ❌ No en web | **BFC (Beef Fighting Championship)** 1v1 |
| **AyeZee** (`ayezee.tv`) | `ayezee` | AyeZee Coins | Coin Store VIP para crypto y premios | ❌ No en web | Leaderboards de $1M con random drops |

---

## 3. La Arquitectura Clave: El "Channel Points Bridge" de Kick

En la investigación de Centinela Studio se identificó el mecanismo exacto para vincular los **Puntos de Canal de Kick** con los créditos de la web:

```
Espectador en Kick.com (Chat / Player)
   │
   ▼
Canjea recompensa: "5.000 Channel Points ➔ 5.000 Créditos Web"
   │
   ▼
Kick genera evento y dispara Webhook oficial:
`channel.reward.redemption.updated` (Status: UNFULFILLED)
   │
   ▼
Backend (Cloudflare Worker):
   1. Valida la firma criptográfica RSA del Webhook.
   2. Asigna atómicamente los créditos en la base de datos (SQLite / Durable Object).
   3. Envía PATCH a Kick API marcando la recompensa como FULFILLED.
   │
   ▼
El espectador ve sus créditos en tiempo real en la web
(Listos para jugar al Plinko, Crash, Ruleta, Dados o canjear en la Store).
```

---

## 4. Matriz Comparativa Definitiva: HuntHub frente a los Sitios Analizados

| Funcionalidad | BlakJac21 | ReachAces | KeithLocks | OEG.GG | **HuntHub (`diggitybets`)** |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Kick OAuth 2.1 PKCE** | ✅ Sí | ✅ Sí | ✅ Sí | ✅ Sí | ✅ **Implementado en `worker/`** |
| **Moneda Virtual / Channel Points** | ✅ UncCoins | ❌ Solo wager | ⚠️ Puntos | ✅ Site Points | ✅ **$DIG Faucet + Kick Webhook Bridge** |
| **House Games Jugables en la Web** | ✅ BJ, Ruleta, Keno | ❌ No | ✅ Plinko | ✅ Básicos | ✅ **Plinko 60FPS (física real), Crash, Dados (99% RTP), Ruleta, BJ, Minas** |
| **Anti-Fraud Fingerprinting** | ❌ No | ❌ No | ✅ `FingerprintProvider` | ❌ No | ✅ **ThumbmarkJS + Turnstile + Clustering** |
| **Overlays para OBS en Vivo** | ❌ Externos | ❌ Externos | ❌ Externos | ❌ Externos | ✅ **Ruleta CS:GO + Duo-Wheel + Torneo 8-Bracket** |
| **Sorteo Provably Fair (CSPRNG)** | ❌ Pseudo-random | ❌ Pseudo-random | ❌ Pseudo-random | ❌ No | ✅ **HMAC-SHA256 Commit-Reveal + Zero Modulo Bias** |
| **Costo Mensual de Hosting** | 💵 Vercel Pro | 💵 Vercel Pro | 💵 Laravel Cloud | 💵 Pago | 🆓 **$0 Permanente (Cloudflare Pages + Workers)** |
