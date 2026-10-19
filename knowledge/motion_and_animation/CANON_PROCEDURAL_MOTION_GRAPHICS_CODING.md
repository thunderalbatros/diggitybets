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

# MOTION GRAPHICS CODING — Academia de Micro-interacciones (UI Thread)

Canon para IA generativa de UI y para el [[CREATIVE_STUDIO]] (Technical Art Director). Toda micro-interacción de Yendo se escribe en **`react-native-reanimated`** sobre el **UI Thread**.

> [!warning] Antes de codear
> Consultar: https://docs.swmansion.com/react-native-reanimated/ y https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started
> El repo corre **Reanimated 4.5.1**. La API que se exige (`useSharedValue`, `withSpring`, `useAnimatedStyle`) es la línea v3+ y sigue vigente.

---

## 1. Contrato de hilo

| Permitido | Prohibido |
| --- | --- |
| `useSharedValue`, `useDerivedValue`, `useAnimatedStyle` | `useState` para interpolar frames |
| `withSpring`, `withTiming`, `withSequence` | `Animated` del core de RN en features nuevas |
| Worklets (`'worklet'`) / `runOnUI` | `setTimeout` + `setState` para animar |
| `useAnimatedKeyboard` (sheets) | `react-native-keyboard-controller` |
| `theme.physics.*` | springs inventados (`damping: 8` "porque se siente lindo") |

**Regla:** si el gesto o la interpolación toca el JS thread, el frame se cae en gama media. Veto del Technical Art Director.

---

## 2. API estricta: `useSharedValue` + `withSpring`

```tsx
const translateY = useSharedValue(hiddenY);

translateY.value = withSpring(0, theme.physics.sheetTransition);
```

`theme.physics.sheetTransition` (láminas, canónico):

```
mass: 0.5 · damping: 20 · stiffness: 300
```

Otras físicas viven en `src/constants/theme.ts` (`physics`). No duplicar literales. Docs Reanimated springs: https://docs.swmansion.com/react-native-reanimated/docs/animations/withSpring

### Hápticos

El spring **no** dispara haptic. El cruce de snap / settle lo hace `expo-haptics` desde un callback JS puntual (`triggerSelectionTick`, `triggerTactileTap`). Prohibido impact heavy en cada frame del drag.

---

## 3. Superficies que DEBEN usar este contrato

1. **`YendoBottomSheet`** — peek / half / expanded. Mapa detrás. Cero `@gorhom/bottom-sheet`.
2. Press de CTA primario (56 dp) — scale spring, no opacity flash.
3. Pins del Radar al seleccionar — el mapa no se remonta (`tracksViewChanges={false}`).
4. Empty states del Carpincho (2D / Rive). El 3D no entra en el critical path.

---

## 4. Checklist de generación (IA)

- [ ] ¿Hay `useSharedValue` para cada valor animado?
- [ ] ¿El destino usa `withSpring` (no `withTiming` lineal) salvo fades de overlay?
- [ ] ¿`useAnimatedStyle` es la única lectura del shared value en render?
- [ ] ¿El componente es &lt;150 líneas y sin fetch?
- [ ] ¿60 FPS en un drag continuo (sheet / mapa)? Si el JS se satura, el motion está mal.

Guía visual de producto: [[VISUAL_GUIDELINES]] · Biblia motion: [[Biblia_Maestra_Visual_3D_Motion_Yendo]] · ADN: [[YENDO_DNA]]

---

### 🔗 Fuentes, APIs y URLs de Referencia

- **Reanimated (home):** https://docs.swmansion.com/react-native-reanimated/
- **Getting started:** https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started
- **withSpring:** https://docs.swmansion.com/react-native-reanimated/docs/animations/withSpring
- **useSharedValue:** https://docs.swmansion.com/react-native-reanimated/docs/core/useSharedValue
- **useAnimatedKeyboard:** https://docs.swmansion.com/react-native-reanimated/docs/device/useAnimatedKeyboard
- **Expo SDK 57:** https://docs.expo.dev/versions/v57.0.0/
- **Apple HIG Motion:** https://developer.apple.com/design/human-interface-guidelines/motion
- **expo-haptics:** https://docs.expo.dev/versions/v57.0.0/sdk/haptics/

---

## Relaciones de Contexto
- [[YENDO_LIBRARY]]
- [[YENDO_DNA]]
- [[VISUAL_GUIDELINES]]
- [[3D_TECHNICAL_ART_GUIDE]]
- [[Biblia_Maestra_Visual_3D_Motion_Yendo]]
- [[Reanimated]]
- [[YendoBottomSheet]]
- [[Número de Dunbar]]
- [[Rive]]
- [[Capybara Mascot]]
