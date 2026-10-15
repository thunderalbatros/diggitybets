# 🤖 Ecosistema de Bots de Chat y Giveaways en Kick.com — Mapa para Streamers de Casino (2026)

> **Documento:** `knowledge/docs/SOTA_KICK_CASINO_BOT_ECOSYSTEM_2026.md`
> **Fecha:** 2026-10-07 | **Origen:** orden del CTO HITL (Tomás) — investigación de los bots usados por streamers de casino en Kick
> **Alcance:** catálogo de bots y herramientas de giveaway con soporte Kick (nativos y multi-plataforma), sus sistemas de comandos/puntos/sorteos, implicaciones para el detector de ganadores de Centinela y la estrategia de observación.

> ⚠️ **ANCLA DE ALCANCE (LEC-015):** Este documento es la fuente canónica del ecosistema de bots de Kick (BotRix, Kicklet, Fossabot, Cloudbot, KickBotPro, etc.) y de qué patrones debe cubrir el detector de ganadores. **NO es la fuente de:** comandos activos de un canal específico (eso solo se sabe por observación o sondeo — ver `SOTA_KICK_POINTS_COMMANDS_2026` y `STREAM_COMMAND_SYNTACTIC_INFERENCE_SOTA`), precios GCP (ver `GCP_PRICING_REFERENCE`), ni estrategias de participación en sorteos (ver `GIVEAWAY_STRATEGIES`).

---

## 1. MAPA DEL ECOSISTEMA (verificado por web research 2026-10-07)

### 1.1 Bots nativos de Kick

| Bot | Sitio | Qué ofrece | Relevancia casino |
|---|---|---|---|
| **BotRix** | botrix.live | El más completo y dominante en Kick: comandos built-in/mod/custom, variables, puntos, niveles, watchtime, polls, queue, song request (!sr), giveaways, alerts, widgets, Discord | **ALTA** — el estándar de facto en streams de slots; !points/!sr dependen de módulos habilitados por canal |
| **Kicklet** | kicklet.app | Chatbot + toolkit Kick: widgets overlay, alerts, comandos, giveaways, song requests, puntos, stats, paneles | ALTA — alternativa directa a BotRix, muy usada en casino |
| **KickBotPro** | kickbot.pro | Especializado EN giveaways: rifas en vivo con **!join**, ruleta OBS animada, filtros anti-bot, ganadores verificables | ALTA — su fase de entrada (!join) es una señal temprana de sorteo para el Oráculo |
| **KickTools (Lotto Bot)** | kicktools.app | Suite de herramientas Kick con Lotto Bot para sorteos | MEDIA |
| **ai_licia** | getailicia.com | Chatbot IA "co-host" conversacional | BAJA para giveaways, relevante como competencia/comparables |

### 1.2 Multi-plataforma CON soporte oficial de Kick

| Bot | Sitio | Qué ofrece | Relevancia |
|---|---|---|---|
| **StreamElements** | streamelements.com | 29+ comandos documentados, timers, giveaways; guía oficial de integración con Kick | ALTA — ya cubierto por nuestro detector |
| **Fossabot** | fossabot.com (docs.fossabot.com) | Comandos personalizados, timers, giveaways, variables — Twitch/YouTube/**Kick** | ALTA — popular en gaming/casino, NO cubierto por nuestro detector |
| **Streamlabs Cloudbot** | streamlabs.com | Soporte Kick OFICIAL (login con credenciales Kick): comandos, timers, quotes, queues | MEDIA-ALTA |

### 1.3 Multi-plataforma SIN soporte Kick

- **Nightbot: NO soporta Kick** (staff de NightDev en foro: no lo añadirán sin API pública de terceros — posición desactualizada, pero sin integración a 2026). **Implicación crítica:** nuestro `winner-detector.mjs` tiene un patrón `Nightbot` que es INÚTIL en Kick; ningún streamer de Kick usa Nightbot.
- **Moobot:** solo Twitch.

### 1.4 Herramientas de giveaway SIN bot de chat (overlay/externo)

| Herramienta | Modelo | Señal en chat |
|---|---|---|
| **StreamerGiveaway.org** | Entradas desde chat/subs/rewards, ganador en overlay OBS, sin bot | Ráfagas de entrada + reacción al ganador |
| **Wheel of Names / ruletas overlay** (p. ej. CommunityGiveaways) | El streamer gira una ruleta en pantalla; el ganador sale en overlay | **Sin anuncio de bot** — reacción de chat + OCR de pantalla |
| **SweepWidget / Gleam** | Entradas 24/7 externas (formularios) | Menciones/links; DEC-039 (bBoN) para formularios |
| **Sistemas propios de Stake** (integración Kick: códigos promo, deposit boosts) | El casino, no el streamer, gestiona parte de las promos | Anuncios del streamer |

---

## 2. IMPLICACIONES DIRECTAS PARA CENTINELA

### 2.1 Cobertura del detector de ganadores (`tools/winner-detector.mjs`)
- **Cubierto hoy (4 patrones):** BotRix, StreamElements, Nightbot (inútil en Kick), Kicklet.
- **Brecha (reporte, no ejecutado):** Fossabot, Streamlabs Cloudbot, Lotto Bot/KickTools, KickBotPro, ai_licia, StreamerGiveaway. Prioridad: **Fossabot y Cloudbot** (adopción real en casino), luego **KickBotPro** (rifas !join en casino).
- **Corrección del reporte anterior:** el detector tiene 4 patrones hardcodeados, no 2 (verificado `winner-detector.mjs:31-36`).

### 2.2 Estrategia de detección por tipo de sorteo (resumen)
1. **Sorteo por bot de chat** (BotRix/Kicklet/Fossabot/Cloudbot): anuncio del ganador como mensaje del bot → expandir `botAnnouncements` con patrones por bot ("just won", "is the winner of", "has won the giveaway").
2. **Sorteo por ruleta overlay** (Wheel of Names, Lotto Bot visual): el ganador NO lo anuncia un bot — lo muestra el overlay y lo celebra el chat → los patrones `chatBursts` y `streamerAnnounce` son LA vía (más OCR de pantalla del overlay).
3. **Fase de ENTRADA** (pre-sorteo): ráfagas de `!join`/`!enter`/`!points` = señal temprana GOLD para el Oráculo (el `stream-command-observer` ya clasifica GIVEAWAY_ENTRY; falta cosechar).

### 2.3 Cadena de conocimiento de comandos (fusión de 3 fuentes)
- **Global (qué existe y para qué):** docs públicas — botrix.live, docs.fossabot.com, docs.streamelements.com, help.kick.com (nativos de moderación).
- **Por canal (qué está activo):** observación pasiva (stream-command-observer → data/channel_commands.json).
- **Confirmación puntual:** sondeo `!commands` 1×/canal (HITL, moderation-guard).

---

## 3. VÍA DE INGESTA Y MANTENIMIENTO
- Los 4 sitios de documentación (botrix.live, docs.fossabot.com, docs.streamelements.com, help.kick.com) son la próxima ingesta recomendada para resolver "cómo se usan y para qué sirven" los comandos (reporte — no ejecutado).
- El ecosistema cambia rápido: re-verificar cada 2-3 meses (nuevos bots Kick-nativos aparecen con frecuencia).

*Fuentes: botrix.live, kicklet.app, kickbot.pro, fossabot.com + docs, streamelements.com + docs, streamlabs.com (Cloudbot Kick), foro NightDev (Nightbot sin Kick), streamergiveaway.org, sweepwidget.com, getailicia.com, kicktools.app, webopedia.com (top streamers slots 2026).*
