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

# 3D TECHNICAL ART GUIDE — R3F, VRAM y 60 FPS en móvil

Directrices de producción para `@react-three/fiber` en Expo 57 / RN 0.86. Auditoría de memoria WebGL a cargo del [[CREATIVE_STUDIO]] (Technical Art Director).

> [!warning] Antes de codear
> Consultar: https://r3f.docs.pmnd.rs/getting-started/introduction · https://docs.expo.dev/versions/v57.0.0/sdk/gl/
> Biblia de pipeline: [[Biblia_Maestra_Visual_3D_Motion_Yendo]] (Biblia 03).

---

## 1. Lazy loading (TTI primero)

El contexto WebGL **no** entra en Splash, Login ni Home 2D.

```tsx
const CapybaraScene = React.lazy(() => import('./CapybaraScene'));

InteractionManager.runAfterInteractions(() => {
  setReady(true);
});
```

- Prohibido `useGLTF.preload()` en el grafo de arranque.
- Primer paint: isotype / Reanimated. Objetivo: Cold Start &lt;1200 ms.
- Si `expo-gl` no está o el context se pierde: fallback Rive → Lottie → SVG. Nunca pantalla negra.

---

## 2. Presupuesto de escena (móvil CABA, gama media)

| Recurso | Techo |
| --- | --- |
| Tris por mesh visible | ≤ 5 000 |
| Draw calls en escena hero | ≤ 8 |
| Texturas | **KTX2 / Basis Universal** (no PNG 2k en GPU) |
| Luces dinámicas | 1 hemi o 1 ambient + baked |
| Sombras dinámicas | **0** — `castShadow` / `receiveShadow` / `PCFSoftShadowMap` prohibidos |
| Post-processing | Off en Radar / listados. Solo hero opt-in |

Iluminación: bake en Blender (diffuse). En runtime, materiales `MeshStandardMaterial` con `envMapIntensity` bajo o `MeshBasicMaterial` si el bake alcanza.

Compresión de malla: Draco o Meshopt en el GLB. Docs Three: https://threejs.org/docs/#examples/en/loaders/GLTFLoader

---

## 3. Texturas KTX2

- Export Basis UASTC o ETC1S según presupuesto. Servir `.ktx2`, no JPEG de 4 MB.
- Un atlas por personaje (Carpincho) preferible a 6 mapas 1k.
- `THREE.Texture.dispose()` al cambiar de look o unmount.
- Referencia Khronos: https://www.khronos.org/ktx/

---

## 4. Auditoría de memoria WebGL (obligatoria)

Contrato canónico: `useCanvasLifecycle`.

Al desmontar:

1. `disposeScene(scene)` — geometrías, materiales, texturas.
2. `gl.dispose()`.
3. `gl.forceContextLoss()` si la API lo expone (expo-gl).
4. Anular refs. Cero listeners de `frame` vivos.

Síntomas de fuga: RAM nativa que no baja al salir del Splash 3D, `WebGL context lost` en el segundo mount, thermal throttle a los 30 s.

Docs R3F unmount / dispose: https://r3f.docs.pmnd.rs/api/canvas

---

## 5. Qué NO va en 3D

- El Radar / Explorador es **mapa nativo 2D** (`react-native-maps`). Prohibido un globo Three para CABA en el MVP.
- Pins: avatares / isologotipos en `Marker`, no meshes.
- Sheets y search: [[MOTION_GRAPHICS_CODING]] (Reanimated), no Canvas.

---

### 🔗 Fuentes, APIs y URLs de Referencia

- **R3F intro:** https://r3f.docs.pmnd.rs/getting-started/introduction
- **R3F Canvas API:** https://r3f.docs.pmnd.rs/api/canvas
- **drei:** https://drei.docs.pmnd.rs/getting-started/introduction
- **expo-gl SDK 57:** https://docs.expo.dev/versions/v57.0.0/sdk/gl/
- **Three GLTFLoader:** https://threejs.org/docs/#examples/en/loaders/GLTFLoader
- **KTX:** https://www.khronos.org/ktx/
- **Expo SDK 57:** https://docs.expo.dev/versions/v57.0.0/

---

## Relaciones de Contexto
- [[YENDO_LIBRARY]]
- [[YENDO_DNA]]
- [[VISUAL_GUIDELINES]]
- [[MOTION_GRAPHICS_CODING]]
- [[Biblia_Maestra_Visual_3D_Motion_Yendo]]
- [[Capybara]]
- [[Reanimated]]
- [[PostGIS]]
- [[React Three Fiber]]
- [[Rive]]
- [[Lottie]]
- [[Capybara Mascot]]
