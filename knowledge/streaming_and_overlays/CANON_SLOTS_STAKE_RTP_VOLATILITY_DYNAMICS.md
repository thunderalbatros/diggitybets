# CANON SLOTS STAKE RTP VOLATILITY DYNAMICS

> **Alcance:** Documentación técnica y contratos de Kick.com API v2, dinámicas matemáticas de RTP/volatilidad de slots, sistemas de lealtad y arquitectura de overlays de baja latencia.

[knowledge/docs/SLOTS_STAKE_RTP_DYNAMICS.md › Dinámica de Casino Online y Slots (Stake & Kick) › 1. Conceptos Clave de Casino (RTP y Volatilidad)]
- **RTP (Return to Player):** Porcentaje teórico de pago de una slot a largo plazo. Las slots exclusivas de Stake suelen tener un RTP alto (96.5% - 98%) porque no pagan licencias a terceros.
- **Volatilidad / Varianza:** 
  - *Alta:* Muchos tiros muertos, pero potencial de ganancias masivas (ej. max wins de 10,000x o más).
  - *Baja:* Pagos pequeños frecuentes, ideal para mantener balance (ej. apuestas seguras para subir de nivel VIP).

[knowledge/docs/SLOTS_STAKE_RTP_DYNAMICS.md › Dinámica de Casino Online y Slots (Stake & Kick) › 2. Slots Recomendadas (Stake Exclusives & Top Providers)]
Cuando el streamer pregunte o acepte *calls* (sugerencias), utiliza estas opciones dependiendo del contexto. **Nunca ofrezcas pragmatics estándar si solo hacen exclusivas de Stake.**

[knowledge/docs/SLOTS_STAKE_RTP_DYNAMICS.md › Dinámica de Casino Online y Slots (Stake & Kick) › 2. Slots Recomendadas (Stake Exclusives & Top Providers) › Top Stake Originals / Stake Exclusives]
1. Tome of Life (Stake Originals)
2. Blue Samurai (Stake Originals)
3. Scarab Spin (Stake Originals)
4. Battle of Gods (Titan Gaming)
5. Million X (Titan Gaming)
6. Ninja Rabbit (Titan Gaming)
7. Puffer Stacks 2 (Titan Gaming)
8. Dragon Fiesta (Titan Gaming)
9. Switchcraft (Titan Gaming)
10. Sweet Boom (Titan Gaming)
11. Skyship Raiders (Twist Gaming)
12. Lab of Lunacy (Twist Gaming)
13. Golden Boy (Twist Gaming)
14. Clash of Fangs (Twist Gaming)
15. Tongue (Twist Gaming)
16. POP Royale (Avatar UX)
17. Drack's Stacks (Massive Studios)
18. Snack Attack Megaways (OneTouch)
19. Ganja Snail (Donut Gaming)
20. Angry Balls (Coreffect)

[knowledge/docs/SLOTS_STAKE_RTP_DYNAMICS.md › Dinámica de Casino Online y Slots (Stake & Kick) › 2. Slots Recomendadas (Stake Exclusives & Top Providers) › Top Pragmatic Play / BGaming (Si permiten proveedores externos)]
- Sugar Twist 1000 (Pragmatic Play)
- Sweet Fiesta 1000 (Pragmatic Play)
- Gates of Heaven (Pragmatic Play)
- Wild West Bonanza (BGaming)
- Bonanza Billion (BGaming)

[knowledge/docs/SLOTS_STAKE_RTP_DYNAMICS.md › Dinámica de Casino Online y Slots (Stake & Kick) › 2. Slots Recomendadas (Stake Exclusives & Top Providers) › Top Valkyrie Slots]
- Odin's Vault
- Waylanders Forge
- Hel's Domain
- Tome of Hercules
- Red Strike
- Captain Death
- Journeys End TitanWays
- Retro Gangster
- Angel of Asgard
- Home of Hades

[knowledge/docs/SLOTS_STAKE_RTP_DYNAMICS.md › Dinámica de Casino Online y Slots (Stake & Kick) › 2. Slots Recomendadas (Stake Exclusives & Top Providers) › Top Paperclip Gaming]
- Dragonspire
- Cybersaurus
- Toon Sailor
- Cyber Blade
- Sky Drop
- Manor Gray
- MineDrop
- Candy Rush
- Solar Eclipse
- Xmas Link

[knowledge/docs/SLOTS_STAKE_RTP_DYNAMICS.md › Dinámica de Casino Online y Slots (Stake & Kick) › 3. Dinámica del Streamer (Inteligencia Contextual y Empatía)]
Para humanizar al bot, es crítico **leer la sala**:

1. **Racha Ganadora (Hype):** El streamer está ganando, el balance está arriba. 
   - *Comportamiento del bot:* Hypear, pedir max wins, tirar slang del canal ("LFG", "banger"). Si piden calls, tirar las de alta volatilidad (ej. Sugar Twist 1000, Retro Gangster).
2. **Racha Perdedora / Balance Bajo (Tilt):** El streamer está perdiendo mucho dinero, está enojado o deprimido ("ripped", "scammed").
   - *Comportamiento del bot:* **PROHIBIDO pedir calls o sugerir slots.** Se debe mostrar empatía y condescendencia. "pain", "so close", "unlucky man", "we go again", "take a break". 
3. **Preguntando por Calls (Interactivo):** El streamer dice "What should we play?" o pone en el título "!calls".
   - *Comportamiento del bot:* Responder rápido pero orgánico: "can i call something?" o "im feeling [Nombre de la Slot] real hard rn".
4. **Modo Sorteo / Tickets:** Canales como Classybeef usan comandos como `!tickets` o `!w`. El bot debe integrarse usando estos comandos cuando el chat empiece a spamearlos (seguimiento de masas).