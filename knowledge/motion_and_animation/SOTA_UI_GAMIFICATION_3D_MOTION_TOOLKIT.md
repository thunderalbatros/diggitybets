---
version: 1.1.0
tipo: research
tags:
  - web-application
  - gamification
  - motion
  - web-audio
  - obs-overlays
autores: [RESEARCHER_AGENT, MANAGER_AGENT]
ultima_revision: 2026-10-17
---

# 🎮 SOTA UI Toolkit: Gamificación, Motion Web, Partículas y Síntesis de Audio Procedural

Este documento consolida la arquitectura y los patrones de implementación canónicos para interfaces web interactivas y overlays de OBS Studio (60-120 FPS) en **HuntHub Web / DiggityBets**.

---

## 1. Gamificación y Feedback Sensorial en Tiempo Real

### Principio Neurobiológico de Recompensa y Claridad
Cada interacción clave (giro de ruleta, ingreso a un torneo 1v1, victoria en King of the Hill, registro en bonushunts) proporciona feedback multisensorial coordinado:
1. **Feedback Visual:** Contador numérico rodante (`PointsCounter` / multiplicadores) animado mediante `requestAnimationFrame` o WAAPI con interpolación elástica.
2. **Audio Procedural (Web Audio API):** Síntesis instantánea sin latencia de red (`SoundFx.playTick()`, `SoundFx.playWinnerFanfare()`, `SoundFx.playCoin()`).
3. **Micro-Celebración:** Lluvia de partículas en Canvas 2D (`ConfettiReward`) en paleta de oro `#ffd700` y verde neón `#53fc18`.

---

## 2. Animaciones de Ruleta y Torneos con WAAPI

A diferencia de librerías sobredimensionadas, las animaciones críticas de streaming utilizan **Web Animations API (WAAPI)** y CSS Transforms:
- **Curva de Giro de Ruleta:** `cubic-bezier(0.22, 1, 0.36, 1)` con duración de 6.5s y jitter estocástico para anticipación dramática.
- **Transiciones de Bracket y King of the Hill:** Desplazamiento elástico de tarjetas competidoras con estados de victoria y reinicio suave.
- **Cero Impacto en CPU de OBS:** Uso estricto de propiedades compuestas (`transform: translate3d(...)`, `opacity`), manteniendo el uso de CPU $\le 5\%$.

---

## 3. Componentes Visuales Dark Casino OLED

### Estilo Visual Canónico
- **Color de Fondo:** `#0b0e14` / `#121620` (Negro OLED con alto contraste).
- **Acentos:** `#53fc18` (Verde Kick de alta visibilidad) y `#ffd700` (Oro de recompensas).
- **Superficies:** Glassmorphism sutil con bordes de 1px `rgba(255, 255, 255, 0.08)` y sombras perimetrales contenidas.
- **Indicadores de Estado:** Pines y chips con micro-pulsos CSS (`@keyframes pulse-subtle`) para estados en vivo (LIVE, BETS OPEN, IN PROGRESS).

---

## 4. Cuándo y Cómo Usar Cada Componente

| Componente | Caso de Uso Canónico | Tecnología |
| :--- | :--- | :--- |
| `PointsCounter` | Multiplicadores de slots, balances y botes acumulados. | JavaScript + WAAPI |
| `ConfettiReward` | Ganadores de 1v1 KOH, jackpots y cierre de bonushunts. | HTML5 Canvas 2D |
| `CSGOSpinStrip` | Tira de tarjetas horizontales para sorteos de ruleta. | CSS Transitions + Web Audio |
| `SoundFx` | Efectos de sonido táctiles (ticks, campanadas, victorias). | Web Audio API nativa |
| `BracketViewer` | Cuadros de eliminación directa en torneos de 8 jugadores. | CSS Grid / Flexbox |

---

## Relaciones de Contexto
- [[CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY]]
- [[CANON_GAME_FEEL_VIRTUAL_SENSATION_SWINK]]
- [[CANON_DESIGN_SYSTEMS_ALLA_KHOLMATOVA]]
- [[fair-draws]]
