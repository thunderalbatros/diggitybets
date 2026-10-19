---
name: interactive-crowd-games
description: Designs and implements Zero-Custody Live Interactive Spectator & Crowd-Play Games (Crash, Mines, Penalty Shootout, Trivia, Slot Tournaments, Crowd Boss Battles) combining Provably Fair HMAC-SHA256, <150ms Optimistic Game Feel, WebAudio ZzFX foley, and Octalysis gamification.
---

# 🎮 Interactive Crowd-Play & Live Spectator Games Architect

**Alcance:** Úsalo al diseñar, programar o auditar juegos interactivos en vivo para espectadores del stream y del sitio web (`site/js/house-games.js`, `site/js/tournament-prediction.js`, minijuegos *Crowd-Play* y desafíos en vivo).

## 1. Los 5 Invariantes de los Juegos Interactivos en Vivo

1. **Cumplimiento Legal Estricto (`AGENTS.md §2.2` — Cero Custodia)**:
   - Participación **100% gratuita** utilizando exclusivamente créditos virtuales de lealtad (`$DIG`).
   - Prohibido exigir pagos, depósitos, propinas o compras para participar.
2. **Equidad Criptográfica Demostrable (*Provably Fair Commit-Reveal*)**:
   - Todo resultado aleatorio (multiplicador de *Crash*, posición de *Mines*, dirección en *Penalty Shootout*, cartas de *Blackjack/Hi-Lo*) debe derivarse de `HMAC-SHA256(serverSeed, clientSeed + ":" + nonce)` con muestreo por rechazo sin sesgo de módulo (*Zero Modulo Bias*).
   - Mostrar siempre el `serverSeedHash` antes de la jugada y permitir verificar la semilla revelada.
3. ***Game Feel* Táctil a 60 FPS (*Steve Swink* + *Emil Kowalski*)**:
   - **Respuesta Instantánea (`< 50ms`)**: Al presionar un botón o casilla (`pointerdown`), aplicar compresión elástica `scale(0.965)` y disparar un sonido foley sintetizado en WebAudio (`ZzFX`) filtrado por el `DynamicsCompressorNode` maestro (`-4 dBFS`).
   - **Alineación Numérica**: Todos los multiplicadores (`1.00x -> 100.00x`) y contadores usan `font-variant-numeric: tabular-nums;` para evitar temblores horizontales.
4. **Arquitectura *Crowd-Play* para Miles de Espectadores Simultáneos**:
   - En modos masivos (chat de Kick + web), agregar los votos o jugadas en ventanas de `250ms–500ms` dentro del Cloudflare Durable Object (`WebSocket Hibernation API`) y emitir un único *delta broadcast* compacto a los clientes y al overlay de OBS (`<= 5% CPU`).
5. **Psicología Octalysis y Retención Ética (*Yu-kai Chou* + *Nir Eyal*)**:
   - Combinar **Core Drive 2 (Desarrollo y Logro)**, **Core Drive 5 (Influencia Social — feed en vivo de ganadores)** y **Core Drive 7 (Imprevisibilidad Curiosa)** con protección de aversión a la pérdida ética (recompensas de consolación por racha de participación).
