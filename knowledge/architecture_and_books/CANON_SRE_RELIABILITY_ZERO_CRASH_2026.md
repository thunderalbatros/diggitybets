# CANON SRE RELIABILITY ZERO CRASH 2026

> **Alcance:** Literatura canónica de arquitectura de software, código limpio, TypeScript, validación en el Edge, sistemas distribuidos, videocursos técnicos e ingeniería de agentes IA para la Software Factory Web.

[knowledge/canon_foundation/CANON_SRE_RELIABILITY_ZERO_CRASH_2026.md]
<!-- CANON_FOUNDATION_FROM_YENDO: CANON_SRE_RELIABILITY_ZERO_CRASH_2026.md -->
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

[knowledge/canon_foundation/CANON_SRE_RELIABILITY_ZERO_CRASH_2026.md › 🛡️ Tratado Canónico: Prevención de Errores, Confiabilidad SRE y Rendimiento Nativo (2026) › 1. Visión y Objetivos Fundacionales]
El estándar de confiabilidad de Yendo impone una experiencia de usuario fluida a **60–120 FPS**, un **Cold Start inferior a 1200 ms** (Time-To-Interactive TTI), tasa de crashes nula (**Zero Crash Policy**) y sincronización offline-first resiliente. Este tratado formaliza la arquitectura sobre **Expo SDK 57**, **React Native 0.86 (Fabric & Bridgeless)**, **TanStack Query v5**, **Zustand 5**, **Tencent MMKV JSI** y pruebas automatizadas con **Maestro E2E** y **Firebase Test Lab**.

---

[knowledge/canon_foundation/CANON_SRE_RELIABILITY_ZERO_CRASH_2026.md › 🛡️ Tratado Canónico: Prevención de Errores, Confiabilidad SRE y Rendimiento Nativo (2026) › 2. Pilares de Arquitectura y Confiabilidad › 2.1 Nueva Arquitectura de React Native (Fabric & Bridgeless)]
- **Cero Puente Asíncrono (Bridgeless Mode):** Toda comunicación JS-Nativo se ejecuta vía interfaces C++ JSI directas, eliminando la serialización JSON que causaba caídas de frames en el renderizado y scroll.
- **Fabric Renderer:** Renderizado concurrente de React 19 integrado nativamente en el árbol de vistas de iOS (UIKit) y Android (View hierarchy), asegurando layout síncrono para teclado, animaciones y transiciones de pantalla.
- **TurboModules:** Inicialización bajo demanda de módulos nativos, reduciendo el consumo de memoria basal al arranque de la app.

[knowledge/canon_foundation/CANON_SRE_RELIABILITY_ZERO_CRASH_2026.md › 🛡️ Tratado Canónico: Prevención de Errores, Confiabilidad SRE y Rendimiento Nativo (2026) › 2. Pilares de Arquitectura y Confiabilidad › 2.2 Gestión de Estado y Caché: Zustand 5 + TanStack Query v5]
- **Separación de Responsabilidades:**
  - **Server State (TanStack Query v5):** Toda información proveniente de Supabase (eventos, locales, perfiles, grupos) es gestionada por QueryClient con políticas de *Stale-While-Revalidate*, reintentos exponenciales y persistencia en MMKV.
  - **Client State (Zustand 5):** Estado efímero de UI, filtros activos de búsqueda, sesión de usuario y modo de interacción de la mascota Carpincho.
- **Patrones Canónicos de TanStack Query (TkDodo Guidelines):**
  - Selectores estables en hooks para evitar re-renders innecesarios:
    ```typescript
    export function useEventDetail(experienceId: string) {
      return useQuery({
        queryKey: ['experience', experienceId],
        queryFn: () => fetchExperienceById(experienceId),
        staleTime: 1000 * 60 * 5, // 5 minutos de frescura
        select: (data) => transformExperienceForUI(data),
      });
    }
    ```
  - Mutaciones optimistas con rollback automático en caso de falla de red (`onMutate`, `onError`, `onSettled`).

[knowledge/canon_foundation/CANON_SRE_RELIABILITY_ZERO_CRASH_2026.md › 🛡️ Tratado Canónico: Prevención de Errores, Confiabilidad SRE y Rendimiento Nativo (2026) › 2. Pilares de Arquitectura y Confiabilidad › 2.3 Almacenamiento C++ de Ultra Alta Velocidad: Tencent MMKV JSI]
- **Reemplazo de AsyncStorage:** Lectura y escritura síncrona en memoria mapeada a disco (mmap) que reduce el tiempo de acceso de ~30ms a **< 0.1ms**.
- **Persistencia de Sesión y Queries:** Integración directa con `@tanstack/react-query-persist-client` y persistencia de stores de Zustand con middleware `persist` acelerado por MMKV.

[knowledge/canon_foundation/CANON_SRE_RELIABILITY_ZERO_CRASH_2026.md › 🛡️ Tratado Canónico: Prevención de Errores, Confiabilidad SRE y Rendimiento Nativo (2026) › 2. Pilares de Arquitectura y Confiabilidad › 2.4 Seguridad Criptográfica con `expo-secure-store`]
- Almacenamiento de tokens JWT de refresco y credenciales sensibles en el **iOS Keychain** y **Android Keystore con cifrado AES-256 GCM**.

[knowledge/canon_foundation/CANON_SRE_RELIABILITY_ZERO_CRASH_2026.md › 🛡️ Tratado Canónico: Prevención de Errores, Confiabilidad SRE y Rendimiento Nativo (2026) › 2. Pilares de Arquitectura y Confiabilidad › 2.5 Pirámide de Testing y Shift-Left QA]
- **Pruebas Estáticas:** `tsc --noEmit` con tipado estricto (0 errores) y chequeo de invariantes con `npm run preflight`.
- **E2E Automatizado con Maestro:** Flujos de onboarding, creación de grupo, reserva de cupo Dunbar y chat probados sin selectores frágiles (`.maestro/flow_onboarding.yaml`).
- **Firebase Test Lab Matriz Física:** Pruebas automatizadas en dispositivos reales Android y emuladores para certificar compatibilidad de chipsets y pantallas OLED.

---

[knowledge/canon_foundation/CANON_SRE_RELIABILITY_ZERO_CRASH_2026.md › 🛡️ Tratado Canónico: Prevención de Errores, Confiabilidad SRE y Rendimiento Nativo (2026) › 3. Matriz de Fuentes Canónicas Indexadas]
| # | Título de la Fuente | URL Canónica | Rol en Yendo |
| :-: | :--- | :--- | :--- |
| **11** | Expo SecureStore SDK 57 Guide | [docs.expo.dev/.../sdk/securestore/](https://docs.expo.dev/versions/v57.0.0/sdk/securestore/) | Almacenamiento cifrado en Keychain/Keystore para tokens de sesión. |
| **12** | Maestro Mobile E2E Testing Docs | [docs.maestro.dev](https://docs.maestro.dev/) | Automatización de pruebas end-to-end determinísticas de flujos clave. |
| **13** | Firebase Test Lab CLI Reference | [firebase.google.com/.../command-line](https://firebase.google.com/docs/test-lab/android/command-line) | Ejecución de matrices de prueba en dispositivos Android físicos de nube. |
| **14** | Expo EAS Build Introduction | [docs.expo.dev/build/introduction/](https://docs.expo.dev/build/introduction/) | Pipeline de compilación nativa en la nube para iOS y Android. |
| **15** | TanStack Query React Overview | [tanstack.com/query/.../overview](https://tanstack.com/query/latest/docs/framework/react/overview) | Motor de sincronización de estado de servidor, caché y deduplicación. |
| **16** | TkDodo Practical React Query Master | [tkdodo.eu/blog/practical-react-query](https://tkdodo.eu/blog/practical-react-query) | Mejores prácticas de arquitectura, selectores y mutaciones optimistas. |
| **17** | Zustand State Management Guide | [docs.pmnd.rs/zustand/.../introduction](https://docs.pmnd.rs/zustand/getting-started/introduction) | Estado global de UI desacoplado de React, sin Context API bloat. |

[knowledge/canon_foundation/CANON_SRE_RELIABILITY_ZERO_CRASH_2026.md › 🛡️ Tratado Canónico: Prevención de Errores, Confiabilidad SRE y Rendimiento Nativo (2026) › 3. Matriz de Fuentes Canónicas Indexadas]
| **18** | react-native-mmkv (Marc Rousavy) | [github.com/mrousavy/react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) | Storage síncrono C++ JSI para caché y estado con latencia sub-milisegundo. |
| **19** | React Native Architecture Overview | [reactnative.dev/architecture/overview](https://reactnative.dev/architecture/overview) | Especificación de Fabric, TurboModules y Bridgeless Runtime. |
| **20** | Expo Guide to the New Architecture | [docs.expo.dev/guides/new-architecture/](https://docs.expo.dev/guides/new-architecture/) | Configuración de Fabric y compatibilidad nativa en Expo SDK 57. |

---

[knowledge/canon_foundation/CANON_SRE_RELIABILITY_ZERO_CRASH_2026.md › 🛡️ Tratado Canónico: Prevención de Errores, Confiabilidad SRE y Rendimiento Nativo (2026) › 3. Matriz de Fuentes Canónicas Indexadas › 🔗 Fuentes, APIs y URLs de Referencia]
- **Expo SecureStore:** https://docs.expo.dev/versions/v57.0.0/sdk/securestore/
- **Maestro E2E:** https://docs.maestro.dev/
- **Firebase Test Lab:** https://firebase.google.com/docs/test-lab/android/command-line
- **Expo EAS Build:** https://docs.expo.dev/build/introduction/
- **TanStack Query React:** https://tanstack.com/query/latest/docs/framework/react/overview
- **TkDodo Practical React Query:** https://tkdodo.eu/blog/practical-react-query
- **Zustand State:** https://docs.pmnd.rs/zustand/getting-started/introduction
- **react-native-mmkv:** https://github.com/mrousavy/react-native-mmkv
- **React Native New Architecture:** https://reactnative.dev/architecture/overview
- **Expo New Architecture Guide:** https://docs.expo.dev/guides/new-architecture/

---

[knowledge/canon_foundation/CANON_SRE_RELIABILITY_ZERO_CRASH_2026.md › 🛡️ Tratado Canónico: Prevención de Errores, Confiabilidad SRE y Rendimiento Nativo (2026) › Relaciones de Contexto]
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[AGENTIC_WORKFLOW_MASTER_PROTOCOL]]
- [[FIREBASE_AUTO_QA_PROTOCOL]]
- [[Zustand]]
- [[MMKV]]
- [[Número de Dunbar]]
- [[Supabase]]
- [[Capybara Mascot]]