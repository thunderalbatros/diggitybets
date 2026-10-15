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

# 🕹️ Tratado Canónico: Game Feel (Steve Swink)
### Basado en: *Game Feel: A Game Designer's Guide to Virtual Sensation*
**Autor:** Steve Swink
**Archivo Fuente:** `unsorted/2-game-feel.pdf` (378 páginas)

---

## 1. La Anatomía de la Sensación Virtual (Game Feel)

Steve Swink define el **Game Feel** como la experiencia táctil, kinestésica e intangible que experimenta un usuario al interactuar con un sistema digital en tiempo real:

> **"El Game Feel es la combinación invisible entre control en tiempo real, simulación espacial con física tangible y pulido sensorial (visual, auditivo y háptico) que hace que tocar un cristal plano se sienta como manipular un objeto físico real con peso, inercia y elasticidad."**
> — Steve Swink

---

## 2. Los 3 Pilares del Game Feel en Aplicaciones Móviles

1. **Control en Tiempo Real (Real-Time Control):**
   - Latencia de entrada imperceptible: La respuesta al toque del usuario debe procesarse en **menos de 16 milisegundos (un solo frame a 60 FPS o 8.3ms a 120 FPS ProMotion)**.
   - En React Native, esto exige **Reanimated Worklets corriendo directamente en el hilo de UI**, sin cruzar el puente asíncrono de JavaScript.
2. **Simulación Espacial y Física de Masas (Spatial Simulation):**
   - Los objetos digitales no se mueven con velocidad lineal ni se frenan en seco como robots.
   - Poseen masa virtual, fricción, aceleración y resortes armónicos (Spring Physics con damping y stiffness calibrados).
3. **Pulido y Jugosidad (Polish & Juiciness):**
   - "Juice" es dar una respuesta sensorial desproporcionadamente gratificante a una acción simple del usuario (aplastamiento sutil del botón, rebote elástico, estela luminosa Skia, retroalimentación háptica escalonada).

---

## 3. Calibración Canónica de Resortes en Yendo (`src/constants/springs.ts`)

Para evitar animaciones chiclosas o lentas que impacienten al usuario porteño en la noche:

```typescript
// Configuración Canónica de Resortes Yendo (Estándar iOS Spring Physics)
export const YENDO_SPRINGS = {
  // Para micro-interacciones rápidas (taps en botones, iconos hápticos)
  snappy: {
    damping: 20,
    stiffness: 300,
    mass: 0.8,
  },
  // Para transiciones de pantalla y Bottom Sheets arrastrables
  modal: {
    damping: 28,
    stiffness: 220,
    mass: 1.0,
  },
  // Para la celebración lúdica del Carpincho (efecto elástico expresivo)
  bouncy: {
    damping: 14,
    stiffness: 180,
    mass: 1.2,
  },
};
```

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[Biblia_Maestra_Visual_3D_Motion_Yendo]]
- [[Reanimated]]
- [[React Native Skia]]
- [[CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY]]
- [[CANON_DESIGNING_FOR_TOUCH_JOSH_CLARK]]
- [[Capybara Mascot]]
