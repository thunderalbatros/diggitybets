# CANON KICK POINTS AND CHAT COMMANDS ARCHITECTURE 2026

> **Alcance:** Documentación técnica y contratos de Kick.com API v2, dinámicas matemáticas de RTP/volatilidad de slots, sistemas de lealtad y arquitectura de overlays de baja latencia.

[knowledge/docs/SOTA_KICK_POINTS_COMMANDS_2026.md › 🪙 SOTA 2026: Channel Points de Kick y Detección de Comandos Activos por Stream]
> **Documento:** SOTA-2026-POINTS-CMDS-018
> **Fecha:** Octubre 2026
> **Área:** Mecánica oficial de Channel Points, validez como viewer, API de rewards, catálogos de comandos y su detección
> **Destinatario:** Tomás (HITL / CTO) y Equipo Multi-Agente Centinela
> **Estado:** Aprobado para Ingesta en Base de Conocimiento (Qdrant)
> **Fuente:** Help Center oficial de Kick, términos oficiales, investigación web (sesión 2026-10-04)
> **Alcance (desambiguación):** este documento cubre PUNTOS DE CANAL y COMANDOS. NO cubre la estrategia de sorteos (ver GIVEAWAY_STRATEGIES), NI los contratos de API base (ver SOTA_KICK_PLATFORM_CONTRACTS_2026), NI el gating de ventanas (ver DEC-031).

---

[knowledge/docs/SOTA_KICK_POINTS_COMMANDS_2026.md › 🪙 SOTA 2026: Channel Points de Kick y Detección de Comandos Activos por Stream › 1. CHANNEL POINTS — MECÁNICA OFICIAL (help.kick.com, verificado)]
- **Ganancia principal: WATCH-TIME.** Se acumulan puntos automáticamente viendo streams donde el
  streamer haya HABILITADO Channel Points (toggle en su settings). Más tiempo = más puntos.
- **Bonos por acciones**: following, subscribing, gifting subs y enviar KICKs (los KICKs cuestan
  dinero real → NUNCA automatizables, wallet manual por constitución).
- **NO existe un "botón de bonus" reclamable documentado estilo Twitch** — la ganancia es
  automática por ver. Los Términos oficiales (kick.com/channel-points-terms-and-conditions)
  reservan a Kick modificar el sistema a su discreción.
- **Redención**: el streamer puede exigir que el viewer escriba un mensaje al canjear un reward.
- **Fuente canónica:** https://help.kick.com/en/articles/10709188-guide-to-channel-points ·
  para streamers: https://help.kick.com/en/articles/11033027-guide-to-channel-points-for-streamers

[knowledge/docs/SOTA_KICK_POINTS_COMMANDS_2026.md › 🪙 SOTA 2026: Channel Points de Kick y Detección de Comandos Activos por Stream › 1. CHANNEL POINTS — MECÁNICA OFICIAL (help.kick.com, verificado) › 1.1 ¿Nuestro bot es un "viewer válido"? (respuesta a la directiva)]
- La vía que Kick valida es **el reproductor web oficial con sesión iniciada** — exactamente lo
  que hace `presence-keeper.mjs`: navegador real (Edge) con perfil persistente de cookies,
  verificación de login ("Sin login NO hay watch-time ni puntos"), follow real, y watch log en
  `data/sessions/presence-watch.jsonl`. El doc del módulo ya registra la regla:
  "watch time / channel points (10 pts cada 5 min logueado viendo)".
- **Ver pendiente crítico:** verificación EMPÍRICA del delta de puntos (balance antes/después de
  15-30 min de presencia) para confirmar que Kick acredita la sesión automatizada-real — no hay
  heartbeat documentado público; el test empírico es la única prueba definitiva.
- **Condición previa:** el streamer debe tener Channel Points HABILITADO (no todos lo tienen) —
  `channel-requirements.mjs` ya mapea plataformas de rewards por canal (schneckyirl.com,
  filthyrewards, BotRix, etc.); falta el flag "points nativos habilitados" por canal.
- Los puntos de bonus por follow ya los gana el bot con el follow real (DEC-022).

[knowledge/docs/SOTA_KICK_POINTS_COMMANDS_2026.md › 🪙 SOTA 2026: Channel Points de Kick y Detección de Comandos Activos por Stream › 2. COMANDOS — LO NATIVO VS LO DE TERCEROS (verificado)]
- **Kick NO tiene comandos nativos `!points`/`!claim`/`!mods`.** La moderación nativa usa
  slash-commands y UI de mods. Cualquier `!comando` que se ve en un canal es de un **bot de
  terceros específico de ese canal** (BotRix, StreamElements, Nightbot, Moobot, KickBot, scripts).
- **Consecuencia arquitectónica:** "detectar los comandos activos de un stream" =
  INFERIRlos observando el chat de ese canal (anuncios de mods/streamer + patrones multi-usuario)
  y/o paneles del streamer. No existe catálogo global ni endpoint público de comandos por canal.

[knowledge/docs/SOTA_KICK_POINTS_COMMANDS_2026.md › 🪙 SOTA 2026: Channel Points de Kick y Detección de Comandos Activos por Stream › 2. COMANDOS — LO NATIVO VS LO DE TERCEROS (verificado) › 2.1 Capacidad ACTUAL de Centinela (stream-command-observer.mjs)]
El observador ya infiere y clasifica comandos por canal con categorías verificadas:
- `SLOT_REQUEST` — desde anuncios ("use !sr <slot>") y patrones multi-usuario de nombres de slots
- `GIVEAWAY_ENTRY` — desde anuncios de entrada ("type !join")
- `STAKE_CLAIM` — "drop your stake username with !drop <username>"
- `GENERAL` — otros comandos detectados sin categoría específica
- API: `getChannelCommands(channelKey)` devuelve el catálogo inferido por canal; integrado con
  `slot-call-guard` (FSM de permisos) y `formatSmartSlotCall`.

[knowledge/docs/SOTA_KICK_POINTS_COMMANDS_2026.md › 🪙 SOTA 2026: Channel Points de Kick y Detección de Comandos Activos por Stream › 2. COMANDOS — LO NATIVO VS LO DE TERCEROS (verificado) › 2.2 Brechas de la habilidad (para cerrar)]
1. **Catálogo persistente y exportable**: los comandos inferidos viven en memoria — persistirlos
   por canal (JSON) para que sobrevivan reinicios y enriquezcan el RAG.
2. **Cobertura de catálogo**: añadir detección de respuestas de bot ("Unknown command",
   respuestas tipo BotRix/StreamElements) para aprender no solo de anuncios sino de INTERACCIONES.
3. **Comandos nativos slash** (moderación): fuera de alcance — el bot no modera.
4. **Cuándo usarlos**: ya cubierto por slot-call-guard (FSM) + DEC-031 + contextual-chatter;
   ampliar el guard a las nuevas categorías (GIVEAWAY_ENTRY ya existe en claims).

[knowledge/docs/SOTA_KICK_POINTS_COMMANDS_2026.md › 🪙 SOTA 2026: Channel Points de Kick y Detección de Comandos Activos por Stream › 3. FUENTES (verificadas, octubre 2026)]
- Guide to Channel Points (viewers): https://help.kick.com/en/articles/10709188-guide-to-channel-points
- Guide for streamers: https://help.kick.com/en/articles/11033027-guide-to-channel-points-for-streamers
- Términos: https://kick.com/channel-points-terms-and-conditions
- Comandos nativos: inexistencia confirmada por búsqueda (mod tools vía slash/UI; !commands = bots de terceros)

*Fin del documento.*