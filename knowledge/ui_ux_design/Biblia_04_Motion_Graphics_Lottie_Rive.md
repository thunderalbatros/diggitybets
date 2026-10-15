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

# 🎭 Biblia 04: Motion Graphics (Lottie, dotLottie & Rive)

Esta es la **norma técnica canónica** para la producción, compresión e integración de animaciones vectoriales e interactivas en [[Yendo Buenos Aires]].

---

## ⚖️ 1. Matriz de Decisión Tecnológica: Lottie vs dotLottie vs Rive

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ MATRIZ COMPARATIVA DE FORMATOS VECTORIALES ANIMADOS                         │
├─────────────────┬───────────────────┬───────────────────┬───────────────────┤
│ Criterio        │ Lottie (.json)    │ dotLottie (.lottie│ Rive (.riv)       │
├─────────────────┼───────────────────┼───────────────────┼───────────────────┤
│ 1. Formato      │ JSON (Texto plano)│ ZIP Comprimido    │ Binario Compilado │
│    Binario      │ (Propenso a bloat)│ (-70% a -80% peso)│ (Extremadamente   │
│                 │                   │                   │  ligero, < 100 KB)│
├─────────────────┼───────────────────┼───────────────────┼───────────────────┤
│ 2. Motor de     │ CPU / Renderizado │ CPU / Parser      │ GPU Nativa        │
│    Render       │ en Canvas/Layers  │ optimizado        │ (C++ Render Engine│
│                 │                   │                   │  a 120 FPS)       │
├─────────────────┼───────────────────┼───────────────────┼───────────────────┤
│ 3. Interactividad│ Lineal (Play,     │ Lineal + Lógica   │ Máquinas de Estado│
│    y Control    │ Pause, Seek)      │ básica en v2      │ Nativas (Inputs,  │
│                 │                   │                   │ Triggers, Blends) │
├─────────────────┼───────────────────┼───────────────────┼───────────────────┤
│ 4. Caso de Uso  │ Íconos estáticos  │ Ilustraciones     │ Mascotas ("El     │
│    Recomendado  │ decorativos       │ ricas de Onboar-  │ Carpincho"),      │
│                 │ secundarios       │ ding no reactivas │ Botones y Avatares│
└─────────────────┴───────────────────┴───────────────────┴───────────────────┘
```

---

## 🦫 2. Gobernanza de Máquinas de Estado en Rive (State Machines)

Para componentes vivos como el avatar del Carpincho, la animación no es una línea de tiempo fija; es un **grafo de estados dirigido por datos**:

```
                  ┌──────────────────────┐
                  │      State_Idle      │ ◄────┐
                  └──────────┬───────────┘      │
                             │                  │
                [onQuorumFull == true]          │ [after 2.5s]
                             │                  │
                             ▼                  │
                  ┌──────────────────────┐      │
                  │   State_Celebrate    │ ─────┘
                  └──────────────────────┘
```

### Integración en React Native con Nitro / JSI:
*   **Sin Pegamento en JS:** Las transiciones de estado ocurren directamente en el runtime de C++ de Rive sin despachar eventos continuos al hilo de React.
*   **Binding Reactivo:** Enlazar booleanos y triggers desde el store de Zustand (`isQuorumFull`, `currentStep`) directamente a los inputs de la máquina de estados.

---

## 🧹 3. Optimización Extrema de Lottie para Producción

Si se utiliza Lottie o dotLottie para secuencias ilustradas de onboarding:

1. **Purga de Curvas Bézier en After Effects:**
   * Reducir keyframes redundantes (máximo 1 keyframe cada 3-5 frames en transiciones suaves).
   * Eliminar capas ocultas (*hidden layers*), máscaras invertidas innecesarias y efectos no soportados (como desenfoques gaussianos nativos de AE que fuerzan software-rendering).
2. **Migración a `.lottie`:**
   * Utilizar la herramienta CLI de LottieFiles para comprimir el archivo JSON original a binario empaquetado `.lottie`, reduciendo la carga de red en un **80%**.

---

## 🛡️ 4. Patrón de Degradación Progresiva en Tres Niveles

Para blindar la app contra fallos en dispositivos Android de gama baja:

```
Nivel 1: Rive (.riv) ──► Nivel 2: Lottie (.lottie) ──► Nivel 3: SVG Estático Vectorial
(GPU State Machine)       (Animación Lineal Ligera)        (Cero Riesgo de Crash en 0ms)
```

Si el runtime de Rive o Lottie reporta un error de decodificación, el componente debe conmutar en 0ms al SVG estático sin alertar al usuario ni interrumpir la navegación.

---

## 🧩 5. Rive Avanzado: Componentes, Text Runs Dinámicos y Data Binding

### 1. Inyección de Texto Dinámico (`Text Runs`):
Para que el Carpincho muestre diálogos personalizados (ej. nombre del Tercer Lugar o rompehielos) directamente dentro de la animación vectorial sin superponer texto JSX desincronizado:
```typescript
// Actualización atómica en el motor de C++ de Rive
riveRef.current?.setTextRunValue('dialogueText', '¡Che, nos vemos en Café San Bernardo!');
```

### 2. Componentes (Anteriormente Nested Artboards):
En el Rive Editor moderno, las artboards anidadas se configuran explícitamente como **Componentes**. Para interactuar con máquinas de estado secundarias (ej. la bombilla del mate humeando dentro del avatar principal):
*   Usar `fireStateAtPath('triggerSip', 'MateComponent/MateStateMachine')`.
*   Usar **Triggers** en lugar de eventos con burbujeo (*bubbling*) para garantizar fiabilidad en Android.

### 3. Listeners y Objetivos de Interacción:
*   En la máquina de estados, vincular los *Listeners* táctiles a las geometrías exactas del botón o avatar, dejando la raíz del Componente como objetivo para variables del View Model.

---

#lottie #dotlottie #rive #statemachines #textruns #components #motion #vectors #tier1

---

## Relaciones de Contexto
- [[Biblia_Maestra_Visual_3D_Motion_Yendo]]
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[Zustand]]
- [[Terceros Lugares]]
- [[Rive]]
- [[Lottie]]
- [[Capybara Mascot]]
