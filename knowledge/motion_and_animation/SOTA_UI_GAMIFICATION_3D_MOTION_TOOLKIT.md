---
version: 1.0.0
tipo: research
tags:
  - yendo-mobile
  - architecture
  - en-progreso
autores: [RESEARCHER_AGENT, MANAGER_AGENT]
ultima_revision: 2026-08-27
---

# 🎮 SOTA UI Toolkit: Gamificación, Motion 3D, Mapa OLED y Diseño Háptico

Este documento consolida la arquitectura y los patrones de implementación canónicos para interfaces móviles de alta fidelidad (120 FPS) en **Yendo Mobile**, optimizado para React Native 0.86, Expo 57 Fabric Bridgeless y arquitectura de hilos de trabajo (Reanimated 4 Worklets).

---

## 1. Gamificación y Sistema de Puntos (Tokens & Streaks)

### Principio Psicológico y Neurobiológico
Inspirado en los principios de condicionamiento operante y recompensa variable de [[YENDO_LIBRARY.md]], cada interacción social o confirmación de quórum Dunbar (4-6 personas) debe proporcionar una confirmación multisensorial:
1. **Feedback Visual:** Contador numérico rodante (`PointsCounter`) con física de resorte áureo (`mass: 1`, `stiffness: 100`, `damping: 10`).
2. **Feedback Táctil:** Secuencia de micro-impactos hápticos (`HapticsManager.triggerRewardSuccess()`).
3. **Celebración:** Lluvia de partículas vectoriales (`ConfettiReward`) en paleta de oro `#FFD700` y acento Yendo `#FF5500`.

---

## 2. Animaciones 3D y Mascotas Interactivas (Estilo Duolingo)

### El Motor de State Machines: Rive
A diferencia de escenas 3D pesadas en Three.js que saturan la GPU del dispositivo móvil y consumen batería, la arquitectura Yendo adopta el estándar de **Rive React Native** (`@rive-app/rive-react-native` con Nitro Modules):
* **Peso de Assets:** Archivos `.riv` de menos de 40 KB.
* **Tasa de Refresco:** 120 FPS sostenidos en C++ nativo sin tocar el hilo de JavaScript.
* **Control por State Machine:**
  * `State: Idle` -> La mascota Capibara respira suavemente en la pantalla principal.
  * `Trigger: OnReward` -> La mascota celebra y salta al completar el quórum.
  * `State: Sleep` -> Modo reposo en horarios nocturnos sin actividad social.

---

## 3. Mapa Interactivo Dark OLED (Minimalismo Cyberpunk CABA)

### Estilo Visual Canónico
Para eliminar la contaminación lumínica en horarios nocturnos y respetar el estándar OLED Dark (`#121212`), se aplica el descriptor `DARK_OLED_MAP_STYLE`:
* Suprime puntos de interés irrelevantes de Google Maps.
* Calles secundarias en gris profundo (`#1E1E1E`), avenidas en grafito (`#2A2A2E`) y cursos de agua en azul abisal (`#090C10`).
* **Radar Pulse Markers:** Pines animados que emiten ondas concéntricas de pulso (`PulseMarker`), indicando en tiempo real la "temperatura" de un venue o el acercamiento de quórum.

---

## 4. Cuándo y Cómo Usar Cada Componente

| Componente | Caso de Uso Canónico | Squad Responsable |
| :--- | :--- | :--- |
| `PointsCounter` | Bóveda de tokens, acumulación de puntos Dunbar, badges. | `CORE_ENGINEERING_SQUAD` |
| `ConfettiReward` | Desbloqueo de pases VIP, check-in validado, canje de vouchers. | `VISUAL_EXPERIENCE_SQUAD` |
| `PulseMarker` | Marcadores en el mapa interactivo de CABA con quórum approaching. | `VISUAL_EXPERIENCE_SQUAD` |
| `HapticsManager` | Toda interacción con botones primarios, swipers y modals. | `HUMAN_EXPERIENCE_SQUAD` |
| `DARK_OLED_MAP_STYLE` | Prop `customMapStyle` de `MapView` en la pantalla del mapa. | `VISUAL_EXPERIENCE_SQUAD` |

---

## Relaciones de Contexto
- [[.knowledge/YENDO_DNA.md]]
- [[.knowledge/YENDO_LIBRARY.md]]
- [[.knowledge/Biblia_Maestra_Visual_3D_Motion_Yendo.md]]
- [[.knowledge/OSS_WHITELIST_REGISTRY.md]]
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[Número de Dunbar]]
- [[Reanimated]]
- [[Rive]]
