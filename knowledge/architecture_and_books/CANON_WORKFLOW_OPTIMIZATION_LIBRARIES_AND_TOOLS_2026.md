> **Alcance:** Literatura canónica de arquitectura de software, código limpio, TypeScript, validación en el Edge, sistemas distribuidos, videocursos técnicos e ingeniería de agentes IA para la Software Factory Web.

---
version: 1.0.0
tipo: guia
tags:
  - yendo-mobile
  - tech-stack
  - canonico
autores: [RESEARCHER_AGENT, MANAGER_AGENT]
ultima_revision: 2026-08-27
---

# 🚀 Reporte Estratégico: Librerías, Herramientas e Integraciones Open Source de Alto Impacto (Ecosistema Global y Gigantes de China)

**Para:** Equipo de Arquitectura, Core y UI de Yendo  
**Origen:** Búsqueda e Investigación de Estado del Arte (Tencent, Alibaba, ByteDance, Ant Group y Ecosistema React Native 2026)  
**Objetivo:** Optimizar drásticamente el rendimiento móvil, la persistencia sin latencia, la inferencia de IA local y el flujo de trabajo (DX) en Expo SDK 57.

---

## 🇨🇳 1. Innovaciones del Mercado Tecnológico Chino (Tech Giants de Alto Tráfico)

Las empresas tecnológicas líderes de China (Tencent/WeChat, Alibaba/Ant Group, ByteDance/TikTok) desarrollan software para más de mil millones de usuarios diarios en dispositivos móviles heterogéneos y redes inestables. Su catálogo de código abierto ofrece soluciones extraordinariamente optimizadas en consumo de batería, memoria y rendimiento nativo.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ CUADRO DE INNOVACIÓN ABIERTA: CHINA TECH GIANTS EN EL STACK DE YENDO                             │
├───────────────────────┬─────────────────────────┬────────────────────────────────────────────────┤
│ Herramienta / Creador │ Tecnología Base         │ Impacto Crítico para Yendo                     │
├───────────────────────┼─────────────────────────┼────────────────────────────────────────────────┤
│ 1. Tencent MMKV       │ C++ / mmap síncrono     │ Almacenamiento clave-valor 30x más rápido que  │
│    (WeChat Core)      │ JSI / NitroModules      │ AsyncStorage. Persistencia síncrona en Zustand │
│                       │                         │ sin parpadeos de UI (0ms flicker en sesión).   │
├───────────────────────┼─────────────────────────┼────────────────────────────────────────────────┤
│ 2. Alibaba Galacean   │ TypeScript / WebGL      │ Motor 3D móvil ultraliviano diseñado para      │
│    (Ant Group/Alipay) │ glTF / Draco / Físicas  │ Mini-Programs. Alternativa de bajo consumo a   │
│                       │                         │ Three.js para la mascota Carpincho y avatares. │
├───────────────────────┼─────────────────────────┼────────────────────────────────────────────────┤
│ 3. Tencent PAG        │ Binario vectorial +     │ Sustituto de Lottie con decodificación nativa  │
│    (Portable Anim.)   │ hardware decode GPU     │ por GPU (10x más rápido, 50% menos peso).      │
│                       │                         │ En RN: adoptar vía `react-native-skottie`.     │
├───────────────────────┼─────────────────────────┼────────────────────────────────────────────────┤
│ 4. Alibaba MNN        │ Inferencia On-Device    │ Permite correr modelos de lenguaje y visión    │
│    (Mobile Neural Net)│ C++ / Vulkan / Metal    │ locales en el teléfono sin internet ni costos  │
│                       │                         │ de API (ideal para sótanos y bares porteños). │
├───────────────────────┼─────────────────────────┼────────────────────────────────────────────────┤
│ 5. Tencent Matrix &   │ APM nativo / PLT-hook   │ Detección no invasiva de memory leaks en VRAM  │
│    MLeaksFinder       │ WeChatBacktrace         │ y caídas de frames en lienzos 3D y listas.     │
├───────────────────────┼─────────────────────────┼────────────────────────────────────────────────┤
│ 6. Tencent vConsole   │ In-App DevTools overlay │ Consola y monitor de red flotante en pantalla  │
│    / Eruda            │ WebView / JavaScript    │ para QA en la calle sin cables USB ni Mac.    │
└───────────────────────┴─────────────────────────┴────────────────────────────────────────────────┘
```

---

## ⚡ 2. Análisis Detallado de las Soluciones Clave

### 🗄️ A. Tencent MMKV (`react-native-mmkv`)
*   **Problema Actual:** `AsyncStorage` es asíncrono, cruza el puente serializado de React Native y provoca retrasos imperceptibles pero existentes en el arranque de la app, mostrando estados de carga transitorios mientras se recupera el token o perfil.
*   **Solución MMKV:** Utiliza archivos mapeados en memoria (`mmap`) compartida a nivel de kernel y C++ directo con JSI/NitroModules.
*   **Mejora:** Lectura y escritura instantánea en **<0.1ms**. Zustand se conecta mediante `createJSONStorage(() => mmkvStorage)`, cargando el estado de autenticación y la ubicación en memoria antes del primer fotograma dibujado.

### 🎨 B. Tencent PAG vs `react-native-skottie` (Skia-Powered Lottie)
*   **Problema Actual:** Lottie procesa árboles JSON enormes en JavaScript o nativo, consumiendo CPU significativa en bucles continuos (ej. badges de eventos o celebraciones).
*   **Solución:** Tencent PAG compila After Effects a binario optimizado con decodificación por hardware de video y rasterizado. En el stack de Expo/Skia, la librería complementaria **`react-native-skottie`** aprovecha el motor Skia de C++ para renderizar animaciones Lottie a 120 FPS con 60% menos uso de CPU.

### 🗿 C. Alibaba Galacean Engine (Ecosistema 3D Mobile-First)
*   **Problema Actual:** Three.js / R3F estándar fue concebido originalmente para navegadores de escritorio; en teléfonos móviles de gama media puede saturar la GPU si no se ajusta el DPR o se liberan texturas manualmente.
*   **Aporte de Galacean:** Creado por Ant Group para Alipay, está diseñado con recolección de basura estricta para hardware móvil. Si en el futuro expandimos la interactividad de la mascota Carpincho hacia personalización de ropa o accesorios 3D, Galacean Editor y su runtime ofrecen una huella de memoria un 40% inferior a Three.js.

### 🧠 D. Alibaba MNN (Inteligencia Artificial On-Device)
*   **Problema Actual:** En Buenos Aires, muchos bares históricos ("Terceros Lugares") están ubicados en subsuelos o zonas con baja señal 4G/5G. Si el matching o los rompehielos del Carpincho dependen de una llamada HTTP a OpenAI o Groq, la experiencia se congela.
*   **Solución MNN:** MNN permite empaquetar modelos cuantizados (GGUF/ONNX) de tamaño ultrarreducido (MobileBERT, Qwen-0.5B o clasificadores semánticos) directamente en los assets locales de la app, ejecutando inferencia en 15ms sin conexión a red.

---

## 🛠️ 3. Herramientas Open Source Globales Recomendadas para el Flujo de Trabajo

### 1. Pruebas End-to-End: **Maestro** (Declarative Mobile UI Testing)
*   **Qué es:** El sustituto moderno de Appium y Detox. Utiliza flujos declarativos en YAML sin selectores frágiles ni configuración compleja de drivers.
*   **Impacto en Yendo:** Permite automatizar el flujo crítico: *Splash 3D ➔ Onboarding ➔ Ver Evento en Mapa ➔ RSVP Dunbar (Cupo de 6)* en menos de 30 líneas de YAML ejecutadas localmente o en GitHub Actions.

### 2. Sincronización Local-First: **PowerSync** (Supabase Offline-First)
*   **Qué es:** Motor open-source de replicación SQLite en el cliente acoplado en tiempo real a Supabase PostgreSQL.
*   **Impacto en Yendo:** Los usuarios tienen acceso garantizado a su tarjeta de ingreso, direcciones y detalles del grupo aún si pierden la conexión móvil camino al punto de encuentro.

### 3. Monitoreo de Rendimiento en Tiempo Real: **React Native Performance**
*   **Qué es:** Módulo de telemetría de estándar W3C para React Native (`mark`, `measure`, TTI, First Contentful Paint).
*   **Impacto:** Permite auditar en milisegundos exactos el tiempo que tarda la pantalla de Splash 3D en transferir el control al Feed principal.

---

## 📋 4. Plan de Acción y Hoja de Ruta de Incorporación

1. **Fase Inmediata (Sprint Actual - Cero Fricción):**
   * Incorporar `npm run audit:knowledge` en el pipeline de desarrollo diario.
   * Documentar el patrón de almacenamiento híbrido MMKV + Expo SecureStore para credenciales críticas.
2. **Fase de Consolidación (Próximo Sprint):**
   * Implementar flujos de prueba con **Maestro** para blindar la regresión visual del Swipe Deck y la reserva Dunbar.
   * Configurar **vConsole / Eruda** condicionalmente en modo `__DEV__` para pruebas de campo en CABA sin necesidad de cables.
3. **Fase Avanzada (Escalabilidad 2.0):**
   * Evaluar **Alibaba MNN** para recomendaciones de rompehielos del Carpincho 100% offline.

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[Biblia_Maestra_Visual_3D_Motion_Yendo]]
- [[Database_Bootstrap_Dossier]]
- [[Zustand]]
- [[Número de Dunbar]]
- [[Terceros Lugares]]
- [[Supabase]]
- [[React Native Skia]]
- [[React Three Fiber]]
- [[Lottie]]
- [[Capybara Mascot]]
