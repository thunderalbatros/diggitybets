# Kick Events, Store & House Games — Master Plan V2.0

> **Proyecto:** HuntHub (Casino Stream Engagement Suite)  
> **Fecha:** 13 de Octubre de 2026  
> **Presupuesto:** **USD 0 / ARS 0 permanente (Sin tarjeta de crédito requerida)**  
> **Hardware de Operación:** Notebook HP 250 G8 (Windows, CPU liviana, 600 Mbps)  
> **Canal Principal:** `diggitybets` en Kick.com  

---

## 1. Organización del Equipo de Agentes (Squads Especializados)

Siguiendo el protocolo estricto de `AGENTS.md`, cada squad asume un dominio claro y delimitado para garantizar avances atómicos, testeados y sin conflictos:

| Squad | Rol | Responsabilidades Específicas en HuntHub V2 |
|---|---|---|
| **Squad 0** | **Manager / Tech Lead** | Orquestación general, Gates de aprobación, control de presupuestos ($0), actualización de `STATUS.md`, `AGENTS.md` y punto de contacto único con el usuario. |
| **Squad 1** | **Research & Knowledge** | Documentación de la API de Kick (Channel Points 2026), repositorios modelo (`TheAtlas-Queue`, `senchabot`, `pogly`), métricas de casino y estándares matemáticos en `research/` y `.agents/skills/`. |
| **Squad 2** | **Architecture & Backend** | Motor central Node.js / TypeScript, base de datos SQLite con Drizzle ORM, WebSocket hub local (puerto 8080), colas de estados y transacciones atómicas de puntos. |
| **Squad 3** | **Kick Integration** | Ingestor híbrido (Pusher chat reader sin tokens + Webhooks oficiales RSA con `@nekiro/kick-api`), puente de canjes de Channel Points, despacho de comandos y `ChatSim`. |
| **Squad 4** | **Frontend & Web Platform** | Sitio web Next.js 16.4, login con Kick vía Better-Auth 1.7.7+, tienda de canjes, perfil de usuario y módulo de verificación de referidos de Stake. |
| **Squad 5** | **Visual & Motion (OBS Overlays)** | Overlays transparentes livianos (≤3% CPU en OBS), diseño oscuro con bordes dorados (*Chakra Petch*), animaciones procedimentales y Web Audio para ruletas, brackets y VS screens. |
| **Squad 6** | **QA, Fairness & House Games** | Motor Provably Fair (HMAC-SHA256) para Blackjack, Roulette, Plinko y Hi-Lo; tests de uniformidad chi-cuadrado; validación de reglas de juego responsable (+18). |
| **Squad 7** | **DevOps & Documentation** | Túnel seguro Cloudflare (`cloudflared` $0), empaquetado de ejecutables y guías en español rioplatense para el streamer y sus moderadores (`GUIA_STREAMER.md`). |

---

## 2. Ingesta de Herramientas y Novedades Técnicas (Octubre 2026)

### 2.1 El Puente de Puntos de Kick (Channel Points Bridge)
* **Descubrimiento:** Kick incorporó los scopes `channel:rewards:read` y `channel:rewards:write` con webhooks para el evento `channel.reward.redemption.updated`.
* **Mecanismo:** El streamer crea una recompensa en Kick (ej: *"5.000 Kick Pts → 5.000 Créditos Web"*). Cuando el espectador la canjea, el webhook firmado por RSA llega a HuntHub, se valida la firma, se acredita el saldo en SQLite y se marca el canje como `FULFILLED` por API.
* **Resultado:** Saldo 100% oficial de Kick transformado en créditos virtuales para la Store, Torneos y House Games.

### 2.2 Herramientas de Referencia Open Source
* **`TheAtlas-Queue`:** Modelo de cola de espera en tiempo real para Batallas 1v1 y Torneos de 8, permitiendo que los usuarios se anoten por chat (`!battle <slot>` o `!tourney <slot>`) con confirmación automática.
* **`brackets-manager.js` & `brackets-viewer.js`:** Motor matemático de torneos de eliminación simple para 8 jugadores con renderizado visual ultra ligero en SVG.
* **`bonus-hunt-tracker` (`calc.js`):** Fórmulas exactas para el cálculo de `Req Avg X`, `Avg X` y estado de `Break-Even` en vivo.
* **`better-auth` v1.7.7+:** Proveedor nativo de Kick con OAuth 2.1 PKCE y parche de seguridad contra toma de cuentas.

### 2.3 Arquitectura de Seguridad Anti-Sybil & Multi-Cuentas (Alts)
* **`ThumbmarkJS` (<12 KB, MIT):** Telemetría pasiva de hardware en cliente. Genera un `device_hash` determinístico único por equipo (Canvas, WebGL, AudioContext, núcleos CPU, fuentes locales). Detecta cuentas alts incluso en pestañas de incógnito o perfiles separados de Chrome.
* **`Cloudflare Turnstile` (100% Free ilimitado):** Bloquea navegadores headless y scripts automatizados (Playwright, Puppeteer, Selenium) sin molestar a los usuarios con CAPTCHAs.
* **`Arcjet` (`@arcjet/next`):** Rate-limiting avanzado por IP y User ID (Sliding Window & Token Bucket) para evitar farming y ataques de fuerza bruta.
* **Unicidad Estricta Kick ◄► Stake (1:1):** Enlace único en SQLite (`UNIQUE(stake_username)`). Un usuario de Stake jamás puede reclamar premios en más de una cuenta de Kick.
* **Mitigación por Shadowban Silencioso:** Los multicuentas sospechosos (`risk_score >= 80`) son excluidos en segundo plano de la selección de ganadores sin mostrar errores explícitos, agotando los recursos de las granjas de bots.

---

## 3. Plan Maestro de Implementación por Etapas

```
        ETAPA 1: NÚCLEO HÍBRIDO & PUENTE DE PUNTOS
        (Lectura Pusher + Webhooks RSA + Saldo SQLite)
                           │
                           ▼
        ETAPA 2: EVENTOS 1v1 & TORNEO 8-BRACKET
        (Colas de espera + Brackets Manager + Overlays OBS)
                           │
                           ▼
        ETAPA 3: COMMUNITY BONUS HUNT & GUESS BALANCE
        (Tracker de slots + Fórmulas calc.js + Guess balance)
                           │
                           ▼
        ETAPA 4: SITIO WEB, STORE & VERIFICACIÓN STAKE
        (Next.js 16.4 + Better-Auth Kick + Cola de referidos)
                           │
                           ▼
        ETAPA 5: MINI HOUSE GAMES PROVABLY FAIR
        (Blackjack, Roulette, Plinko, Hi-Lo con créditos $0)
                           │
                           ▼
        ETAPA 6: ENSAYO GENERAL, QA & DESPLIEGUE $0
        (Cloudflare Tunnel + Guías Streamer y Moderadores)
```

---

### ETAPA 1 — Núcleo Híbrido de Ingesta & Puente de Puntos Kick
* **Objetivo:** Recibir el 100% del chat en tiempo real sin latencia y capturar canjes de puntos de Kick.
* **Entregables:**
  1. **Lector de Chat Pusher (`retconned-kick-js`):** Ingestor anónimo que lee el chat de `diggitybets` con 0 ms de latencia y 0 tokens requeridos.
  2. **Servicio Webhook RSA (`@nekiro/kick-api`):** Endpoint que valida firmas asimétricas RSA de Kick y timestamps contra ataques de replay.
  3. **Base de Datos SQLite (`hunthub.db` con Drizzle ORM):** Tablas `users`, `point_transactions`, `channel_rewards` y `redemptions`.
  4. **Emisor Outbound de Mensajes:** Respuestas automáticas del bot en chat mediante `POST /public/v1/chat` con límite de tasa (token bucket anti-spam).

---

### ETAPA 2 — Sistema de Batallas 1v1 y Torneo de 8 Jugadores
* **Objetivo:** Competencias en vivo entre espectadores directamente en pantalla.
* **Entregables:**
  1. **Módulo de Batallas 1v1:**
     * Comando: `!battle <slot>` (o selección de 2 espectadores del pool de activos de 30s).
     * Máquina de estados: `LOBBY → SELECCIÓN → EN_JUEGO → RESOLUCIÓN`.
     * Overlay VS en OBS: Tarjetas cara a cara con avatares de Kick, carátulas de las slots y multiplicador en vivo.
  2. **Torneo de 8 Brackets:**
     * Comando: `!tourney <slot>` (los primeros 8 usuarios elegibles o sorteo).
     * Siembra con Fisher-Yates criptográfico (`crypto.getRandomValues`).
     * Llaves eliminatorias: Cuartos de final (4 partidas) → Semifinales (2 partidas) → Gran Final (1 partida).
     * Overlay animado en OBS con avance interactivo de llaves (`brackets-viewer.js`).

---

### ETAPA 3 — Community Bonus Hunt & Guess the Balance
* **Objetivo:** Seguimiento del opening de slots comunitarias y predicción de saldo final.
* **Entregables:**
  1. **Panel de Slots Comunitario:**
     * Integración con la base de datos de slots (`slots.json` con más de 4.800 juegos).
     * El bot sortea un espectador activo que tiene 60s para elegir slot: `!slot <nombre>`.
     * Registro de balance inicial, balance actual, apuestas y pagos.
     * KPIs en vivo en overlay: `Req Avg X`, `Avg X`, `Profit/Loss` y estado de `Break-Even`.
  2. **Juego "Guess the Balance":**
     * Comando: `!guess <monto>` con parser robusto para formatos `12.557`, `12k`, `$12,500.50`.
     * Bloqueo automático de predicciones al iniciar el opening.
     * Al terminar el hunt: resolución automática premiando con créditos a los top 5 más cercanos.

---

### ETAPA 4 — Sitio Web de la Comunidad, Store & Verificación Stake
* **Objetivo:** Plataforma web para que los espectadores inicien sesión, vean sus puntos, canjeen premios, jueguen mini-juegos y certifiquen su cuenta de Stake, protegidos contra granjas de multicuentas.
* **Entregables:**
  1. **Web App (Next.js 16.4 + Better Auth 1.7.7+):**
     * Login social con Kick y Discord en 1 solo clic.
     * Modo oscuro de casino con tema responsive mobile-first.
  2. **Escudo Anti-Sybil & Detección de Alts:**
     * Integración de `ThumbmarkJS` para fingerprinting pasivo por hardware.
     * Verificación invisible con `Cloudflare Turnstile` en logins y canjes.
     * Restricción de faucet/bonos diarios por dispositivo (`device_hash`), no solo por cuenta.
     * Tabla de correlación de dispositivos (`alt_clusters`) y motor de Shadowban silencioso.
  3. **Store de la Comunidad:**
     * Catálogo de premios virtuales (roles en Discord, giros extra en ruletas, participaciones prioritarias en torneos o premios físicos/digitales entregados por el streamer).
  4. **Verificación de Códigos de Referido de Stake:**
     * El usuario ingresa su nickname de Stake en su perfil (`UNIQUE` 1:1 en base de datos).
     * El streamer o moderadores pueden verificarlo mediante:
       * Importación del reporte CSV oficial de afiliados de Stake en el panel admin.
       * Aprobación manual rápida con 1 clic en la cola de moderación.
     * Asignación del badge dorado `[STAKE_VERIFIED]` con acceso a eventos exclusivos.

---

### ETAPA 5 — Mini House Games Virtuales (Provably Fair)
* **Objetivo:** Juegos de entretenimiento donde los espectadores utilizan sus créditos de stream bajo un modelo 100% transparente y ético.
* **Juegos Incluidos:**
  1. **Blackjack (21):** Baraja de 52 cartas barajada criptográficamente, dealer se planta en 17, opciones Hit, Stand, Double, Split.
  2. **Roulette (Europea):** Ruleta de 37 casillas (0 a 36) con apuestas a pleno, color (rojo/negro) y par/impar.
  3. **Plinko:** Pirámide configurable de 8 a 16 filas con física binomial de rebotes y multiplicadores extremos en las puntas (hasta 1000x).
  4. **Hi-Lo:** Predicción de carta Mayor o Menor con multiplicadores dinámicos y racha acumulable con botón de Cash Out.
* **Garantía Provably Fair:**
  * Semilla del servidor (`serverSeed`) con hash SHA-256 publicado antes de cada tirada.
  * Semilla del cliente (`clientSeed`) + contador `nonce`.
  * Cálculo: $\text{HMAC-SHA256}(\text{serverSeed}, \text{clientSeed} + ":" + \text{nonce})$.
  * Verificador público integrado para que cualquier usuario pueda auditar sus jugadas.

---

### ETAPA 6 — QA Integral, Seguridad, Fairness y Despliegue $0
* **Objetivo:** Puesta en producción y entrega al streamer.
* **Entregables:**
  1. **Seguridad y Compliance:**
     * Verificación de avisos +18 y mensajes de juego responsable en todas las pantallas.
     * Sanitización estricta de entradas de usuarios (prevención total de XSS en OBS).
  2. **Despliegue $0 Permanente:**
     * Cloudflare Tunnel (`cloudflared`) para exponer el webhook HTTPS sin abrir puertos ni pagar hosting.
     * Proceso local optimizado que consume <50 MB de memoria en la notebook HP 250 G8.
  3. **Documentación para el Usuario:**
     * `GUIA_STREAMER.md` (checklist paso a paso antes y durante el stream).
     * `GUIA_MODS.md` (guía para moderadores sobre cómo controlar colas y aprobar referidos).

---

## 4. Acciones Manuales Requeridas del Usuario / Streamer

Para que el sistema funcione conectado al canal real de Kick, el streamer (o el usuario) solo debe realizar estas acciones simples (proporcionaremos las guías paso a paso cuando entremos a cada etapa):

1. **Crear la App de Desarrollador en Kick (Gate Etapa 1):**
   * Ingresar en [kick.com/settings/developer](https://kick.com/settings/developer).
   * Crear una aplicación ("HuntHub Suite") y obtener el `Client ID` y `Client Secret`.
   * Configurar los scopes: `chat:write`, `channel:rewards:read`, `channel:rewards:write`.
2. **Crear Recompensa de Puntos en Kick (Gate Etapa 1):**
   * En el panel de creador de Kick, crear la recompensa: *"Canjear 5.000 pts por créditos web"*.
3. **Descargar Cloudflare Tunnel (Gate Etapa 1):**
   * Ejecutable gratuito `cloudflared.exe` (sin registro de tarjeta) para vincular los webhooks.
4. **Cargar Reporte de Afiliados de Stake (Opcional, Etapa 4):**
   * Cuando se deseen validar los referidos, descargar el CSV desde el panel de afiliados de Stake y subirlo con 1 clic en HuntHub Admin.
