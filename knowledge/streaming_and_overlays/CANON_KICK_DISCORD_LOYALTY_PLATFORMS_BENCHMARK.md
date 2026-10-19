# CANON KICK DISCORD LOYALTY PLATFORMS BENCHMARK

> **Alcance:** Documentación técnica y contratos de Kick.com API v2, dinámicas matemáticas de RTP/volatilidad de slots, sistemas de lealtad y arquitectura de overlays de baja latencia.

[knowledge/docs/KICK_DISCORD_LOYALTY_PLATFORMS_INVESTIGATION.md › 🔍 Investigación Técnica: Integración de APIs (Kick & Discord) y Sistemas de Puntos en Plataformas de Streamers]
> **Documento:** `knowledge/docs/KICK_DISCORD_LOYALTY_PLATFORMS_INVESTIGATION.md`  
> **Área:** Análisis de Plataformas, Integraciones Externas, Loyalty Engine  
> **Sitios analizados:** `demizeonkick.com`, `filthyrewards.com`, `schneckyirl.com`, `funnyhoodvidz.com`, `lawrewards.co`

---

[knowledge/docs/KICK_DISCORD_LOYALTY_PLATFORMS_INVESTIGATION.md › 🔍 Investigación Técnica: Integración de APIs (Kick & Discord) y Sistemas de Puntos en Plataformas de Streamers › 1. Resumen Ejecutivo y Patrón de Arquitectura Común]
Todos los sitios analizados son portales comunitarios de recompensas (Loyalty & Rewards Hubs) creados para streamers de Kick patrocinados principalmente por Stake (y plataformas afines como Rainbet o Hypedrop). 

Operan con un **modelo de identidad dual (Discord + Kick)**:
1. **Discord como Proveedor de Identidad Principal (SSO / IAM):** Autenticación mediante OAuth2 (`identify`, `email`, `guilds.members.read`). Proporciona avatar, User ID unívoco, gestión de roles en el servidor de Discord y canal de soporte/pago de premios.
2. **Kick como Canal de Presencia y Eventos en Vivo:** Vinculación de cuenta de Kick mediante OAuth 2.1 PKCE o validación por comando en el chat (`!verify <code>`). Detección de presencia, watch-time y participación activa a través del WebSocket de Pusher (`chatrooms.{id}.v2`).
3. **Plataformas de Juego (Stake/Rainbet/Hypedrop) como Fuente de Fondos y Wager:** Seguimiento de volumen apostado mediante código de afiliado y webhooks de casino (BetSync / Affiliate API).

---

[knowledge/docs/KICK_DISCORD_LOYALTY_PLATFORMS_INVESTIGATION.md › 🔍 Investigación Técnica: Integración de APIs (Kick & Discord) y Sistemas de Puntos en Plataformas de Streamers › 2. Análisis Detallado Sitio por Sitio › A. `demizeonkick.com` (DXR — demizexrosspicks)]
- **Stack Técnico:** TanStack Router + Vite + TailwindCSS + Radix UI + Cloudflare.
- **Identificadores Kick:**
  - Canal: `demizexrosspicks` | Broadcaster ID: `9798` | Chatroom ID: `9707`.
- **Integración Discord:**
  - Servidor oficial para reclamo de premios y soporte. Validación de miembros verificados.
- **Funcionamiento del Sistema de Puntos:**
  - **Generación de Puntos:** Se otorgan automáticamente mientras el stream está online. Computa tanto el tiempo de visualización (watch-time) como el envío de mensajes en el chat.
  - **Condición de Elegibilidad:** Solo aparecen en la tabla de clasificación las cuentas de Kick verificadas y vinculadas con saldo positivo.
  - **Uso de Puntos:** Tienda de recompensas (Spend Points), rifas en vivo, mini-juegos comunitarios en la web (modo sólo puntos) y eventos de predicción interactivos ("Bonus Guess" en slots como Wanted Dead or a Wild con premios en $).
  - **Carrera Mensual (RPICKS Race):** Leaderboard de volumen apostado en Stake con código `RPICKS`.

[knowledge/docs/KICK_DISCORD_LOYALTY_PLATFORMS_INVESTIGATION.md › 🔍 Investigación Técnica: Integración de APIs (Kick & Discord) y Sistemas de Puntos en Plataformas de Streamers › 2. Análisis Detallado Sitio por Sitio › B. `filthyrewards.com` (Filthy Rewards)]
- **Stack Técnico:** React SPA desarrollado sobre Lovable.dev + Vite + Backend en **Supabase** (`pgemafoxfeirqdxpxfcb.supabase.co`).
- **Identificadores Kick:**
  - Canal: `filthy` | Broadcaster ID: `588` | Chatroom ID: `580`.
- **Integración Discord:**
  - Autenticación OAuth2 delegada a Supabase Auth (`/auth/v1/authorize?provider=discord`). Permite identificar unívocamente al usuario y sincronizar roles en su servidor de Discord.
- **Funcionamiento del Sistema de Puntos:**
  - **Puntos de Fidelidad:** Se acumulan por presencia en el stream de Kick y actividad en el chat.
  - **Promociones:** Sistema de "Lossback" (devolución de porcentaje de pérdidas a usuarios registrados bajo su código), carreras semanales y mensuales de wager, sorteos exclusivos y tienda de premios.

[knowledge/docs/KICK_DISCORD_LOYALTY_PLATFORMS_INVESTIGATION.md › 🔍 Investigación Técnica: Integración de APIs (Kick & Discord) y Sistemas de Puntos en Plataformas de Streamers › 2. Análisis Detallado Sitio por Sitio › C. `schneckyirl.com` (SchneckyIRL Hub)]
- **Stack Técnico:** Laravel Cloud (`fls-*.laravel.cloud`) + Inertia.js + TailwindCSS + Ziggy routing.
- **Identificadores Kick:**
  - Canal: `schneckyirl` | Broadcaster ID: `44234` | Chatroom ID: `43874`.
- **Integración Discord:**
  - Flujo OAuth2 propio con Laravel Socialite: ruta `/discord/redirect` redirige a `discord.com/oauth2/authorize`. Sincroniza estado de usuario y notificaciones en Discord.
- **Funcionamiento del Sistema de Puntos:**
  - **Points Store:** Catálogo donde los espectadores canjean puntos ganados en el stream por criptomonedas, skins o recargas.
  - **Mini-Juegos Web:** Ruleta, Coinflip y Mines dentro del sitio web usando los puntos acumulados.
  - **Competiciones de Wager:** Leaderboards en vivo con premios acumulados (ej. Stake $45,000 leaderboard, Rainbet $25,000, Stake Exclusives $10,000).
  - **Hunt Tracker:** Registro en vivo de bonus hunts realizados en el stream con Guess The Balance (GTB).

[knowledge/docs/KICK_DISCORD_LOYALTY_PLATFORMS_INVESTIGATION.md › 🔍 Investigación Técnica: Integración de APIs (Kick & Discord) y Sistemas de Puntos en Plataformas de Streamers › 2. Análisis Detallado Sitio por Sitio › D. `funnyhoodvidz.com` (FHV Rewards)]
- **Stack Técnico:** Misma plataforma SaaS multi-inquilino de Laravel / Inertia.js que SchneckyIRL.
- **Identificadores Kick:**
  - Canal: `funnyhoodvidz` | Broadcaster ID: `3554` | Chatroom ID: `3532`.
- **Integración Discord:**
  - Puerta de entrada estricta: ruta `/store` y `/login` exigen inicio de sesión con Discord OAuth2 (`client_id=1503757099883298946&scope=identify%20email`).
- **Funcionamiento del Sistema de Puntos:**
  - Tienda de puntos (`/store`), rifas automáticas, retos de la comunidad y carreras de apuestas afiliadas.

[knowledge/docs/KICK_DISCORD_LOYALTY_PLATFORMS_INVESTIGATION.md › 🔍 Investigación Técnica: Integración de APIs (Kick & Discord) y Sistemas de Puntos en Plataformas de Streamers › 2. Análisis Detallado Sitio por Sitio › E. `lawrewards.co` (Outlaw Rewards)]
- **Stack Técnico:** Next.js (App Router con Turbopack y React Server Components) + TailwindCSS.
- **Identificadores Kick:**
  - Canal: `outlaw` | Broadcaster ID: `708` | Chatroom ID: `700`.
- **Integración Discord:**
  - Servidor `discord.gg/SUAMdCArNH`. Alertas de sorteos, confirmación de ganadores y soporte.
- **Funcionamiento del Sistema de Puntos:**
  - **Milestone Rewards:** Recompensas escalonadas basadas en nivel de lealtad y volumen apostado.
  - **Bonus Hunts Tracker:** Sistema interactivo que lista cada bonus comprado durante el stream, su costo y su multiplicador en tiempo real.
  - **Raffles & Challenges:** Sorteos verificables (`/verify`) con semilla criptográfica demostrable.
  - **Store:** Canje de puntos por saldo en Stake o tarjetas de regalo.

---

[knowledge/docs/KICK_DISCORD_LOYALTY_PLATFORMS_INVESTIGATION.md › 🔍 Investigación Técnica: Integración de APIs (Kick & Discord) y Sistemas de Puntos en Plataformas de Streamers › 3. Implicaciones Críticas para Centinela]
1. **Watch-Time Efectivo (DEC-022):** Los puntos pasivos de Kick en estas plataformas **requieren que la sesión del usuario esté autenticada en el navegador real** (Puppeteer con perfil Edge persistente). Estar solo conectado al WebSocket de Pusher suma eventos de chat, pero NO contabiliza tiempo de reproducción de video en los contadores del streamer.
2. **Sincronización de Identidad:** La vinculación de Discord + Kick es el estándar. Centinela debe mantener configurado `KICK_USERNAME` y asociarlo en las alertas HITL de Telegram para permitir reclamos instantáneos cuando un bot mencione `@<username>`.
3. **Detección de Acciones de Puntos:** Los eventos clave detectables en el chat de Kick son:
   - `!join` / `!raffle` / `!sorteo` → Participación en sorteos de puntos y efectivo.
   - `!guess <valor>` → Entrada en Guess The Balance / Bonus Guess.
   - `!claim` / `!reload` → Reclamo de balance recargable.
   - Menciones de bot del canal (`Botrix`, `KickBot`, `AlphaBot`) anunciando el ganador.