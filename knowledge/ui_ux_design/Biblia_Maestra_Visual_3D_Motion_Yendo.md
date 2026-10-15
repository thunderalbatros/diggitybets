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

# 🔱 Biblia Maestra: Arquitectura Visual, 3D, Video y Motion Graphics

Este documento constituye la **Catedral Canónica y Suprema** que rige el diseño, desarrollo, animación y optimización de todas las interfaces en [[Yendo Buenos Aires]]. Sintetiza los principios empíricos y matemáticos de las 5 Biblias de especialidad técnica.

---

## 📑 Índice Canónico de las 5 Biblias de Especialidad

1. [📖 Biblia 01: Animación de Componentes y Navegación React Native](file:///c:/Users/Tomi/yendo_mobile/.knowledge/🧠_research/design/biblias_ui/Biblia_01_Animacion_Componentes_RN.md)  
   *Worklets C++, RNGH2 GestureDetector, físicas de resortes con inyección de velocidad inercial, Shared Element Transitions y Layout Animations con springify.*
2. [📖 Biblia 02: Efectos Visuales, Shaders y Glassmorphism](file:///c:/Users/Tomi/yendo_mobile/.knowledge/🧠_research/design/biblias_ui/Biblia_02_Efectos_Visuales_Skia.md)  
   *Glassmorphism científico Nielsen Norman Group (contraste >= 7:1 sobre OLED), Shaders SkSL en GPU y Skeleton Screens de barrido continuo (Zero Layout Shift).*
3. [📖 Biblia 03: Modelado 3D Móvil (Pipeline Blender, Draco & R3F)](file:///c:/Users/Tomi/yendo_mobile/.knowledge/🧠_research/design/biblias_ui/Biblia_03_Pipeline_3D_Blender_R3F.md)  
   *Activos GLB con compresión Draco/Meshopt, texturas GPU KTX2/Basis Universal, baking de iluminación difusa en Blender, gestión de VRAM y mitigación de WebGL Context Lost.*
4. [📖 Biblia 04: Motion Graphics de Alto Impacto (Lottie, dotLottie & Rive)](file:///c:/Users/Tomi/yendo_mobile/.knowledge/🧠_research/design/biblias_ui/Biblia_04_Motion_Graphics_Lottie_Rive.md)  
   *Rive State Machines, inyección de Text Runs en runtime, optimización de vectores dotLottie (-80% peso) y blindaje con degradación progresiva en 3 niveles.*
5. [📖 Biblia 05: Video, Multimedia y Streaming en Alta Definición](file:///c:/Users/Tomi/yendo_mobile/.knowledge/🧠_research/design/biblias_ui/Biblia_05_Video_Multimedia_Streaming_Expo.md)  
   *Arquitectura desacoplada `VideoPlayer` / `VideoView` de Expo SDK 57, bucles de video hero sin fugas de memoria, streaming HLS y confort acústico (<72 dB).*

---

## 🛠️ Tabla de Arquitectura Integral: ¿Dónde vive cada cosa en Yendo?

```
┌────────────────────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┐
│ Pilar Tecnológico      │ Librería Clave en Expo   │ Rol de Zustand (Store)   │ Rol de Supabase Backend  │
├────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ 1. Microinteracciones  │ `react-native-reanimated`│ Banderas de estado       │ N/A                      │
│    y Gestos Táctiles   │ `react-native-gesture-   │ (`isOpen`, `isDragging`) │                          │
│                        │  handler` (RNGH2)        │ que disparan worklets    │                          │
├────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ 2. Carga Perceptual    │ `expo-linear-gradient`   │ Indica si la query está  │ Fuente PostGIS que       │
│    y Skeletons         │ `moti`                   │ en curso (`isLoading`)   │ apaga el skeleton al     │
│                        │                          │                          │ resolver datos           │
├────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ 3. Modelos 3D          │ `@react-three/fiber`     │ Almacena el `mood` de    │ Almacena y distribuye    │
│    Espaciales          │ `expo-gl`                │ la mascota o el rumbo    │ los binarios `.glb`      │
│                        │ `@react-three/drei`      │ del compás espacial      │ en Supabase Storage CDN  │
├────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ 4. Efectos Visuales    │ `@shopify/react-native-  │ Parámetros de resplandor │ N/A                      │
│    y Glassmorphism     │  skia`, `expo-blur`      │ o filtros de accesibilidad│                         │
├────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ 5. Motion Graphics     │ `rive-react-native`      │ `useMascotStore` enlaza  │ Almacena activos `.riv`  │
│    Interactivo         │ `lottie-react-native`    │ inputs de State Machine  │ y `.lottie` dinámicos    │
│                        │                          │ (`isChill`, `celebrate`) │ en Storage público       │
├────────────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ 6. Video & Streaming   │ `expo-video`             │ Gestiona reproducción    │ Sirve video en streaming │
│    en Alta Definición  │                          │ activa y muteo silencioso│ HLS o MP4 con Byte-Range │
└────────────────────────┴──────────────────────────┴──────────────────────────┴──────────────────────────┘
```

---

## ⚖️ Las 10 Leyes Inviolables de Ingeniería de Interfaz en Yendo

1. **La Ley del Hilo de UI (Zero-Jank 120 FPS):** Queda terminantemente prohibido ejecutar cálculos de animación continua en el hilo de JavaScript. Todo cálculo debe resolverse en Worklets C++ nativos o Fragment Shaders en GPU.
2. **La Ley de Conservación de Momentum:** Al soltar cualquier elemento interactivo en arrastre (`PanGesture`), es obligatorio inyectar `event.velocityX` y `event.velocityY` en la ecuación de resorte `withSpring` con tokens de `theme.physics`.
3. **La Ley del Shimmer Continuo (NN/g):** Las pantallas de carga deben usar barridos continuos de izquierda a derecha con `Skeleton.tsx`. Quedan prohibidos los spinners de carga centrados y los parpadeos lentos de opacidad.
4. **La Ley del Contraste Glassmorphic:** Toda tarjeta o modal translúcido sobre fondo OLED `#000000` debe tener una opacidad $\ge 75\%$ (`rgba(20,20,20,0.75)`), radio de desenfoque de 20px y micro-borde especular de 1px (`rgba(255,255,255,0.08)`) para sostener un ratio de contraste mínimo de 7:1 (WCAG AAA).
5. **La Ley de Topología y Compresión 3D:** Ningún modelo 3D puede superar los $5,000$ triángulos en móvil. Todo archivo debe comprimirse con Draco o Meshopt a menos de $800\text{ KB}$ y distribuirse en formato binario `.glb`.
6. **La Ley de Iluminación Horneada:** Prohibido el uso de luces puntuales con mapas de sombras dinámicas en runtime. Las sombras y oclusiones ambientales deben hornearse (*baked*) en Blender dentro del canal difuso.
7. **La Ley del Canvas Único y Límite DPR:** Las vistas 3D deben limitar el ratio de píxeles a $2.0$ (`dpr={[1, 2]}`) y mantener una superficie persistente de Canvas con apagado automático en reposo (`useCanvasLifecycle`).
8. **La Ley de Degradación Progresiva en 3 Niveles:** Todo elemento interactivo de motion graphics debe implementar la cascada: `Rive (.riv)` ➔ `Lottie (.lottie)` ➔ `SVG Estático`, garantizando cero caídas en dispositivos antiguos.
9. **La Ley del Confort Acústico Urbano (<72 dB):** Todo video que arranque en segundo plano debe reproducirse en silencio (`muted = true`) con subtítulos o textos de apoyo.
10. **La Ley de Modularidad Atómica:** Ningún componente JSX puede superar las 150 líneas de código. Las vistas complejas deben descomponerse en átomos, moléculas y organismos estrictos.

---

#master-bible #canon #yendo-dna #tier1 #reanimated #skia #r3f #rive #lottie #expo-video

---

## Relaciones de Contexto
- [[Biblia_Maestra_Visual_3D_Motion_Yendo]]
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[Zustand]]
- [[PostGIS]]
- [[Supabase]]
- [[Reanimated]]
- [[React Native Skia]]
- [[React Three Fiber]]
- [[Rive]]
- [[Lottie]]
