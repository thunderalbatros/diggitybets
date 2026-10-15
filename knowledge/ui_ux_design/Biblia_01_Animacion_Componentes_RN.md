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

# 📚 Biblia 01: Animación de Componentes y Navegación (Reanimated & Gestures)

Esta es la **norma técnica canónica e innegociable** para la construcción de animaciones de componentes, transiciones de pantalla e interacciones táctiles en [[Yendo Buenos Aires]].

---

## 🏛️ 1. Arquitectura de Worklets y el Hilo de UI (UI Thread)

El cuello de botella histórico de React Native fue el puente asíncrono (*Bridge / BatchedBridge*). En el ecosistema moderno con New Architecture (Fabric + Bridgeless), **Reanimated 3/4** ejecuta animaciones directamente en el motor JavaScript nativo secundario del hilo de UI mediante **Worklets**.

```
[ Gesto del Usuario (Touch Event) ]
                 │
                 ▼
     [ UI Thread / C++ Worklet ] ──(0ms Latency)──► [ Render GPU en Pantalla ]
                 │
           (runOnJS solo al finalizar)
                 ▼
       [ JS Thread / React ]
```

### Reglas Innegociables de Worklets:
1. **La Directiva `'worklet';`:** Toda función que calcule posiciones, opacidades o transformaciones debe declararse explícitamente como un worklet.
2. **Cero Re-renders:** Los valores animados deben persistir exclusivamente en `useSharedValue`. Jamás se debe utilizar `useState` o `useReducer` para actualizar coordenadas en tiempo real durante una interacción continua.
3. **Paso de Mensajes al JS Thread:** Usar `runOnJS(callback)()` **únicamente** para eventos discretos finales (ej. disparar `navigation.replace()`, reproducir un sonido o despachar una acción de Zustand).

---

## ⚡ 2. Dominio de Gestos con RNGH2 (`react-native-gesture-handler`)

La API moderna de `GestureDetector` reemplaza los antiguos componentes envolventes por composiciones fluidas y fuertemente tipadas:

```typescript
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { theme } from '../../constants/theme';
import { triggerTactileTap } from '../../lib/haptics';

export function InteractiveSwipeCard() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      'worklet';
      isDragging.value = true;
    })
    .onUpdate((event) => {
      'worklet';
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      'worklet';
      isDragging.value = false;
      // Transferencia inercial obligatoria de velocidad
      translateX.value = withSpring(0, {
        ...theme.physics.cardSwipe,
        velocity: event.velocityX,
      });
      translateY.value = withSpring(0, {
        ...theme.physics.cardSwipe,
        velocity: event.velocityY,
      });
    });

  const tapGesture = Gesture.Tap()
    .onStart(() => {
      'worklet';
      triggerTactileTap();
    });

  // Composición Gestual Simultánea
  const composedGesture = Gesture.Simultaneous(panGesture, tapGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: withSpring(isDragging.value ? 1.04 : 1.0, theme.physics.tactilePress) },
    ],
  }));

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={animatedStyle} />
    </GestureDetector>
  );
}
```

### Composición de Gestos:
*   `Gesture.Simultaneous(g1, g2)`: Permite arrastre y tap concurrentes sin bloqueo mutuo.
*   `Gesture.Race(g1, g2)`: El primer gesto en superar su umbral de activación cancela al competidor.
*   `Gesture.Exclusive(g1, g2)`: Prioridad estricta en cascada.

---

## 🏎️ 3. Ecuaciones de Resorte y Conservación de Momentum

Toda animación de retorno o descarte debe emular las leyes físicas de Newton:

$$F = -k \cdot x - c \cdot v$$

*   **Inyección Obligatoria de Velocidad:** Nunca descartar `event.velocityX` ni `event.velocityY`. Inyectar la velocidad en el resorte garantiza que la tarjeta conserve la energía cinética del dedo al despegarse de la pantalla.
*   **Tokens Físicos Centralizados:** Utilizar exclusivamente `theme.physics.*` (`tactilePress`, `cardSwipe`, `sheetTransition`, `bouncyCelebration`).

---

## 🪟 4. Shared Element Transitions (Hero Transitions)

Para transicionar tarjetas de eventos hacia sus pantallas de detalle (`EventDetailScreen`) sin cortes abruptos:

1. **Requisito de Navegación:** El stack raíz debe implementarse con `@react-navigation/native-stack` (`react-native-screens`).
2. **`sharedTransitionTag` Único:** Ambos extremos del enlace deben compartir el mismo tag alfanumérico inmutable:
   ```tsx
   // Origen: EventItemCard.tsx
   <Animated.Image
     sharedTransitionTag={`event-hero-image-${event.id}`}
     source={{ uri: event.coverUrl }}
     style={styles.thumbnail}
   />

   // Destino: EventDetailScreen.tsx
   <Animated.Image
     sharedTransitionTag={`event-hero-image-${event.id}`}
     source={{ uri: event.coverUrl }}
     style={styles.fullHero}
   />
   ```
3. **Cero Salto de Dimensiones:** No alterar el `aspectRatio` entre pantallas para prevenir artefactos visuales de interpolación de matriz en Android.

---

## 📜 5. Animaciones Interpoladas por Scroll (`useAnimatedScrollHandler`)

Para encabezados colapsables, badges flotantes o la rotación del brújula Yendo según el scroll del Feed:

```typescript
const scrollY = useSharedValue(0);

const scrollHandler = useAnimatedScrollHandler({
  onScroll: (event) => {
    'worklet';
    scrollY.value = event.contentOffset.y;
  },
});

const headerStyle = useAnimatedStyle(() => {
  const opacity = interpolate(
    scrollY.value,
    [0, 80],
    [1, 0.4],
    Extrapolate.CLAMP
  );
  return { opacity };
});
```

*   **Regla:** Solo montar el handler sobre componentes animados (`Animated.ScrollView`, `AnimatedFlashList`).

---

## 🧩 6. Layout Animations en New Architecture (Fabric & Bridgeless)

Reanimated 4 optimiza las animaciones de layout directamente en el motor Fabric de C++, permitiendo reordenamiento de listas y transiciones de entrada/salida elásticas con cero esfuerzo:

```tsx
import Animated, {
  Layout,
  FadeInDown,
  FadeOutUp,
} from 'react-native-reanimated';

export function AnimatedListCard({ item, index }: { item: any; index: number }) {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 45).springify().damping(14).stiffness(150)}
      exiting={FadeOutUp.duration(200)}
      layout={Layout.springify().damping(14).stiffness(140)}
    >
      {/* Contenido de la Tarjeta */}
    </Animated.View>
  );
}
```

### Reglas de Rendimiento para Layout Animations:
1. **Evitar en Listas Extensas No Virtualizadas:** En colecciones de más de 20 elementos, delegar en `@shopify/flash-list` con `recyclingKey` para no saturar los árboles de vistas de Fabric.
2. **Definir Builders Fuera de Render o con useMemo:** No re-crear cadenas de `.springify()` dentro del JSX en cada ciclo para evitar alocación continua de objetos en V8/Hermes.

---

#reanimated #gestures #rngh2 #physics #springs #layout-animations #tier1

---

## Relaciones de Contexto
- [[Biblia_Maestra_Visual_3D_Motion_Yendo]]
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[Zustand]]
- [[Reanimated]]
