> **Alcance:** Literatura canónica y tratados técnicos de animación a 60 FPS, shaders GPU, física de resortes (spring physics), arte técnico 3D y micro-interacciones fluidas para sitios web modernos y overlays OBS.

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

# ⚡ Tratado Canónico: Gráficos de Bajo Nivel, Metal y Shaders Skia
### Basado en: *Metal by Example* (Warren Moore) & *Metal Programming Guide* (Apple)
**Autores:** Warren Moore / Apple Inc.
**Archivos Fuente:** `unsorted/mbe-1.0.0.pdf` (154 páginas) y `unsorted/preview-9780134668987_A31858261.pdf` (36 páginas)

---

## 1. El Pipeline Gráfico de Bajo Nivel y la Aceleración por GPU

En aplicaciones móviles de alta fidelidad visual (que utilizan desenfoques dinámicos, gradientes complejos, mapas con cientos de marcadores y animaciones de partículas), depender de la CPU para el renderizado produce caídas catastróficas de frames (**Jank / Stutter**) y recalentamiento térmico del dispositivo.

Metal (en iOS) y Vulkan (en Android) proveen acceso directo de baja sobrecarga a los núcleos de la GPU (Unified Memory Architecture - UMA). En React Native, este poder se aprovecha a través del motor **Shopify React Native Skia** y **SkSL (Skia Shading Language)**, que compila directamente a pipelines de Metal/Vulkan.

---

## 2. Principios de Shaders Eficientes en Skia / React Native

1. **Off-Thread Graphics Pipeline:**
   - La GPU procesa millones de píxeles en paralelo. Al dibujar efectos de Glassmorphism o halos luminosos, el cómputo se delega íntegramente al fragment shader en GPU, liberando el hilo de JavaScript y el hilo principal de UI.
2. **Eliminación del Overdraw:**
   - El peor enemigo del rendimiento en pantallas OLED es el "Overdraw": pintar múltiples capas transparentes superpuestas sobre el mismo píxel.
   - En Skia, los filtros de desenfoque deben acotarse estrictamente al bounding box del componente mediante `clipRect`, evitando blurrear zonas invisibles de la pantalla.
3. **Saturación y Mapeo Tonal en Pantallas Modernas:**
   - Aprovechar el espacio de color extendido **Display P3** en iPhones y pantallas AMOLED Samsung de alta gama para los acentos naranja `#FF5500` y púrpuras profundos de Yendo, logrando una luminosidad visual imposible en sRGB estándar.

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[React Native Skia]]
- [[Reanimated]]
- [[Biblia_Maestra_Visual_3D_Motion_Yendo]]
