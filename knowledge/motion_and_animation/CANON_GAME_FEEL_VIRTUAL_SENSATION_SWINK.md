---
version: 1.1.0
tipo: research
tags:
  - web-application
  - game-feel
  - motion
  - animation
  - web-audio
autores: [RESEARCHER_AGENT, MANAGER_AGENT]
ultima_revision: 2026-10-17
---

# 🕹️ Tratado Canónico: Game Feel en la Web (Steve Swink)
### Basado en: *Game Feel: A Game Designer's Guide to Virtual Sensation*
**Autor:** Steve Swink

---

## 1. La Anatomía de la Sensación Virtual (Game Feel)

Steve Swink define el **Game Feel** como la experiencia táctil, kinestésica e intangible que experimenta un usuario al interactuar con un sistema digital en tiempo real:

> **"El Game Feel es la combinación invisible entre control en tiempo real, simulación espacial con física tangible y pulido sensorial (visual, auditivo y háptico) que hace que interactuar con una interfaz digital se sienta como manipular un objeto físico real con peso, inercia y elasticidad."**
> — Steve Swink

---

## 2. Los 3 Pilares del Game Feel en Aplicaciones Web y Overlays de Streaming

1. **Control en Tiempo Real (Real-Time Control):**
   - Latencia de respuesta síncrona: Todo clic, tap o comando de chat debe reflejarse en pantalla en **menos de 16 milisegundos (un solo frame a 60 FPS o 8.3ms a 120 FPS)**.
   - En la web, esto se logra ejecutando animaciones críticas mediante **Web Animations API (WAAPI)** o CSS Transforms directos sin bloquear el event loop de JavaScript.
2. **Simulación Espacial y Cinemática (Spatial Simulation):**
   - Los elementos de la interfaz (tarjetas de competidores, ruleta de premios, multiplicadores) no se mueven con velocidad lineal rígida.
   - Poseen inercia, aceleración gradual y desaceleración orgánica mediante curvas `cubic-bezier(0.22, 1, 0.36, 1)`.
3. **Pulido y Jugosidad (Polish & Juiciness):**
   - "Juice" es dar una respuesta sensorial desproporcionadamente gratificante a una acción simple del usuario: micro-compresión de la tarjeta al hacer clic (`scale(0.97)`), resplandor sutil de borde dorado, lluvia de confeti en victorias y ticks mecánicos sintetizados con la Web Audio API.

---

## 3. Calibración Canónica de Animaciones Web en HuntHub

```javascript
// Configuración Canónica de Transiciones y Curvas de Easing en HuntHub Web
export const WEB_EASINGS = {
  // Para giros de ruleta de alta tensión (anticipación y frenado suave)
  rouletteSpin: 'cubic-bezier(0.22, 1, 0.36, 1)',
  // Para micro-interacciones rápidas (hover y click en botones)
  snappy: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  // Para modales y paneles laterales
  slideOver: 'cubic-bezier(0.16, 1, 0.3, 1)',
  // Para rebotes elásticos de victoria y anuncios
  elasticOut: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
};
```

---

## Relaciones de Contexto
- [[CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY]]
- [[SOTA_UI_GAMIFICATION_3D_MOTION_TOOLKIT]]
- [[CANON_DESIGN_SYSTEMS_ALLA_KHOLMATOVA]]
- [[fair-draws]]
