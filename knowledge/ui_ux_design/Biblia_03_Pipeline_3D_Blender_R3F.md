---
version: 1.0.0
tipo: guia
tags:
  - yendo-mobile
  - ui-design
  - canonico
autores: [RESEARCHER_AGENT, MANAGER_AGENT]
ultima_revision: 2026-08-27
---

# 🗿 Biblia 03: Modelado 3D Móvil (Pipeline Blender, Draco & R3F)

Esta es la **norma de ingeniería tridimensional canónica** para la producción, compresión y renderizado de mallas 3D en tiempo real para [[Yendo Buenos Aires]].

---

## 📦 1. El Formato Binario GLB y Compresión Extrema (Draco & Meshopt)

Está terminantemente prohibido importar modelos en formato `.obj`, `.fbx` o `.gltf` sin comprimir en el cliente móvil. Todo activo debe distribuirse como un binario único `.glb` post-procesado.

```
[ Malla Orgánica en Blender ] ──► [ glTF 2.0 ] ──► [ gltfpack / Draco ] ──► [ Supabase CDN ] ──► [ useGLTF.preload() ]
```

### Directrices de Compresión Móvil:
*   **Draco Compression (`-d`):** Reduce la geometría estática entre un **70% y un 85%**, recortando archivos de 5MB a menos de **800 KB**.
*   **Meshopt Optimization:** Ideal para animaciones esqueléticas complejas, pues acelera la descompresión en CPUs móviles de gama media sin bloquear el arranque.
*   **Pipeline Automatizado:** Ejecutar siempre el script de auditoría de Yendo antes del despliegue:
    ```bash
    node tools/pipelines/optimizar_asset_3d.js "modelo.glb" --draco --gltfpack
    ```

---

## 💡 2. Horneado de Luces y Sombras (Baking vs Real-Time)

Las luces puntuales con sombras dinámicas en tiempo real (*PointLight shadow maps*) requieren 6 pasadas de renderizado por frame (cubemap), lo que aniquila la batería móvil y reduce los FPS a menos de 30.

### Reglas de Iluminación para Móvil:
1. **Horneado Obligatorio en Blender:** Pre-calcular la oclusión ambiental (*Ambient Occlusion*), sombras suaves y rebotes de luz difusa en el canal de textura PBR (*Bake Diffuse / Lighting*).
2. **Setup de Luces en R3F:**
   * 1x `ambientLight` cálida (intensidad 0.7 - 0.8).
   * 1x `directionalLight` frontal sin sombras activas para destellos especulares en materiales metálicos.
   * Prohibido el uso de mapas HDRI pesados en runtime; utilizar gradientes ligeros o colores sólidos en el fondo OLED `#000000`.

---

## 📱 3. Arquitectura y Gobernanza de VRAM en React Three Fiber

```tsx
import React, { memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useCanvasLifecycle } from '../../hooks/useCanvasLifecycle';

export const SafeCanvasContainer = memo(function SafeCanvasContainer({ children }) {
  const { frameloop } = useCanvasLifecycle();

  return (
    <Canvas
      frameloop={frameloop} // 'always' enfocado, 'never' en background
      dpr={[1, 2]}          // Tope de 2.0 para evitar sobrecalentamiento en pantallas 3x
      gl={{
        antialias: false,   // Acelera GPU en Android un 40%
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 0, 3], fov: 45 }}
    >
      {children}
    </Canvas>
  );
});
```

### Mandatos de Rendimiento:
1. **Limitación de DPR:** `dpr={[1, 2]}`. En pantallas Retina triples (DPR 3.0), renderizar a resolución nativa satura el rasterizador de la GPU sin mejora visual perceptible.
2. **Mutación Directa en `useFrame`:** Jamás invocar `setState` dentro de `useFrame`. Modificar directamente los objetos de Three.js:
   ```typescript
   useFrame(({ clock }) => {
     if (meshRef.current) {
       meshRef.current.rotation.y = clock.getElapsedTime() * 0.5; // Correcto
     }
   });
   ```
3. **Limpieza Determinista de Memoria:** Al desmontar una pantalla con 3D, invocar `disposeScene(scene)` para liberar texturas, buffers y geometrías de la VRAM.

---

## 🛡️ 4. Arquitectura Dual-Mode de Resiliencia

Ninguna pantalla debe mostrarse en blanco ante fallos de conexión o CDN:
*   **Motor A:** Descarga y precarga de `.glb` remoto vía `useGLTF.preload(CDN_URL)`.
*   **Motor B:** Malla procedural local en Three.js puro con materiales básicos instanciada en 0ms por `SceneErrorBoundary`.

---

## 🧬 5. Compresión KTX2/Basis Universal y Mitigación de Context Lost

### 1. Compresión de Texturas en GPU (KTX2 / Basis):
Los archivos PNG o JPG, al descomprimirse en la GPU móvil, ocupan su resolución completa en memoria sin comprimir ($4\text{ bytes}$ por píxel). Para modelos con texturas detalladas:
*   **KTX2 / Basis Universal:** Mantiene la textura comprimida directamente en la VRAM de la GPU, reduciendo el consumo de memoria en un **75% a 80%**.
*   **Integración con R3F:** Utilizar `useKTX2` de `@react-three/drei` o configurar `KTX2Loader` en el callback de `useGLTF`.

### 2. Mitigación de "WebGL Context Lost":
En iOS y Android, el sistema operativo puede revocar el contexto WebGL si la app pasa a segundo plano o si se crean múltiples `<Canvas />` sucesivos:
*   **Principio de Canvas Único Persistente:** En lugar de destruir y recrear el `<Canvas />` al navegar, mantener una superficie persistente y conmutar sus hijos (`children`).
*   **Manejo de Eventos Nativos:**
    ```typescript
    gl.domElement.addEventListener('webglcontextlost', (event) => {
      event.preventDefault(); // Permite que Three.js intente restaurar el contexto
    }, false);
    gl.domElement.addEventListener('webglcontextrestored', () => {
      // Re-inicializar materiales y render loop
    }, false);
    ```
*   **Presupuesto de Draw Calls:** Mantener siempre **menos de 100 llamadas de dibujado (Draw Calls)** por escena mediante geometrías fusionadas (`BufferGeometryUtils.mergeGeometries`) e instancias (`<instancedMesh>`).

---

#r3f #blender #gltf #draco #ktx2 #vram #context-loss #tier1

---

## Relaciones de Contexto
- [[Biblia_Maestra_Visual_3D_Motion_Yendo]]
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[Supabase]]
- [[React Three Fiber]]
