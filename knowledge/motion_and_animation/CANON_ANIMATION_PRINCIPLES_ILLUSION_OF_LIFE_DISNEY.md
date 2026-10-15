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

# 🎬 Tratado Canónico: Los 12 Principios de Animación Aplicados a UI
### Basado en: *The Illusion of Life: Disney Animation* (Thomas & Johnston) & *The Animator's Survival Kit* (Richard Williams)
**Autores:** Frank Thomas & Ollie Johnston / Richard Williams
**Archivos Fuente:** `unsorted/The illusion of life_ Disney animation.pdf` (577 páginas) y `unsorted/the-animators-survival-kit-richard-williams.pdf` (392 páginas)

---

## 1. De los Estudios Disney a las Interfaces React Native Modernas

En 1981, los legendarios animadores de Disney Frank Thomas y Ollie Johnston publicaron *The Illusion of Life*, codificando los **12 Principios Básicos de Animación** desarrollados para dar vida, credibilidad física y empatía emocional a dibujos inanimados.

En la ingeniería de interfaces táctiles móviles modernas, estos 12 principios son la diferencia entre una aplicación estática y muerta, y una experiencia digital viva, orgánica y fluida.

---

## 2. Los 12 Principios Traducidos a React Native Reanimated

| Principio Tradicional | Definición Clásica | Traducción Técnica a Código Reanimated en Yendo |
| :--- | :--- | :--- |
| **1. Squash and Stretch (Aplastamiento y Estiramiento)** | Da la ilusión de peso y flexibilidad física a un objeto al moverse o colisionar. | **Micro-tap en Cards:** Al tocar un evento, la tarjeta se comprime ligeramente (`scale: 0.96`) y al soltar rebota a `scale: 1.0` con volumen constante. |
| **2. Anticipation (Anticipación)** | Prepara al ojo del espectador para una acción inminente. | **Pull-to-refresh:** Antes de que la lista salte con nuevos eventos, el indicador del Carpincho se agacha anticipando el salto. |
| **3. Staging (Puesta en Escena)** | Presenta una idea de forma que sea inequívocamente clara para la vista. | **Modal de Check-in:** Oscurecimiento del fondo con desenfoque Skia (`BlurMask`) para concentrar el 100% de la atención en el pase biométrico. |
| **4. Straight Ahead vs. Pose to Pose** | Técnicas de dibujo secuencial. | **Keyframes Interpolados:** Definir estados clave (reposo, activo, presionado) y dejar que los resortes físicos calculen los frames intermedios en tiempo real. |
| **5. Follow Through & Overlapping Action** | Las partes secundarias del cuerpo continúan moviéndose tras frenar el cuerpo principal. | **Cascada de Tarjetas (Stagger Effect):** Al cargar el feed, cada tarjeta entra con un retraso escalonado de 40ms respecto a la anterior, creando una ola orgánica. |
| **6. Slow In and Slow Out (Frenado y Aceleración)** | Movimiento orgánico con aceleración suave, nunca lineal. | **Curvas Bézier Cúbicas y Resortes:** Prohibido usar `Easing.linear`. Usar `Easing.bezier(0.25, 0.1, 0.25, 1)` o resortes amortiguados. |
| **7. Arcs (Arcos)** | La mayoría de las acciones humanas siguen trayectorias parabólicas o curvas. | **Navegación de Pantalla:** La transición de una miniatura a pantalla completa se despliega siguiendo una curva espacial suave, no una línea recta rígida. |
| **8. Secondary Action (Acción Secundaria)** | Añade más dimensión y complementa la acción principal. | **Partículas en Check-in Exitoso:** Mientras la tarjeta se confirma, un resplandor luminoso secundario pulsa suavemente en los bordes. |
| **9. Timing (Sincronización)** | El número de fotogramas dedicados a una acción define su velocidad y peso. | **Ventana Áurea Móvil (200-350ms):** Cualquier animación menor a 150ms es imperceptible; mayor a 400ms se siente lenta y fastidia al usuario. |
| **10. Exaggeration (Exageración)** | Acentuar una acción para hacerla más expresiva y divertida. | **Reacciones del Carpincho:** Al desbloquear un beneficio de squad, la mascota festeja con un salto caricaturesco que desborda optimismo. |
| **11. Solid Drawing (Dibujo Sólido)** | Crear sensación de volumen, peso y espacio tridimensional. | **Capas de Profundidad (Z-Index + Elevation):** Uso de sombras naturales en dark mode con tinte ambiental del fondo en lugar de negros opacos planos. |
| **12. Appeal (Carisma / Atractivo)** | La cualidad que hace que el usuario simpatice y quiera volver a interactuar. | **Personalidad General:** La sincronía entre el Carpincho, la música del venue y la interfaz crea una estética premium canchera única en Buenos Aires. |

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[Biblia_Maestra_Visual_3D_Motion_Yendo]]
- [[Reanimated]]
- [[React Native Skia]]
- [[CANON_GAME_FEEL_VIRTUAL_SENSATION_SWINK]]
- [[Capybara Mascot]]
