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

# 🎨 Biblia 02: Efectos Visuales, Shaders y Glassmorphism (Skia & GPU)

Esta es la **guía técnica canónica** para implementar interfaces translúcidas, shaders en GPU y pantallas de carga perceptualmente instantáneas en [[Yendo Buenos Aires]].

---

## 💎 1. Glassmorphism Científico (Estándar Nielsen Norman Group)

El *Glassmorphism* no es un adorno cosmético; es un sistema de elevación espacial en el eje Z. Según los estudios del **Nielsen Norman Group (NN/g)**, la translucidez mal implementada destruye la legibilidad en usuarios con baja agudeza visual.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ PARÁMETROS CANÓNICOS DEL GLASSMORPHISM YENDO                                │
├──────────────────────────┬────────────────────────────┬─────────────────────┤
│ Propiedad Física         │ Valor Exacto               │ Justificación NN/g  │
├──────────────────────────┼────────────────────────────┼─────────────────────┤
│ 1. Opacidad Base         │ `rgba(20, 20, 20, 0.75)`   │ Mantiene contraste  │
│                          │                            │ de texto >= 7:1     │
├──────────────────────────┼────────────────────────────┼─────────────────────┤
│ 2. Radio de Difuminado   │ `20px` (Gaussian Blur)     │ Descompone detalles │
│                          │                            │ del fondo complejo  │
├──────────────────────────┼────────────────────────────┼─────────────────────┤
│ 3. Micro-Borde Especular │ `1px solid rgba(255,255,   │ Evita que la tarjeta│
│    (Specular Hairline)   │ 255, 0.08)`                │ se funda en el negro│
├──────────────────────────┼────────────────────────────┼─────────────────────┤
│ 4. Sombra de Contacto    │ `0 8px 32px rgba(0,0,0,0.6)`│ Comunica elevación  │
└──────────────────────────┴────────────────────────────┴─────────────────────┘
```

### Regla de Oro de Accesibilidad:
Nunca colocar texto con tamaño menor a 14pt o peso menor a 500 directamente sobre vidrio translúcido sin un scrim oscuro subyacente.

---

## ⚡ 2. Shaders en GPU con SkSL (Skia Shading Language)

**React Native Skia** enlaza directamente con el motor gráfico en C++ de Chrome y Android, permitiendo ejecutar fragment shaders en tiempo real sin tocar el hilo de JavaScript:

```tsx
import React from 'react';
import { Canvas, Fill, Shader, Skia } from '@shopify/react-native-skia';
import { useSharedValue } from 'react-native-reanimated';

// Shader SkSL para el Aura del Quórum Dunbar (Pulsación Ámbar Cálida)
const SKSL_DUNBAR_AURA = Skia.RuntimeEffect.Make(`
  uniform float2 iResolution;
  uniform float iTime;
  uniform float3 iColor;

  float4 main(float2 fragCoord) {
    float2 uv = (fragCoord * 2.0 - iResolution) / min(iResolution.x, iResolution.y);
    float d = length(uv);
    float pulse = sin(iTime * 2.5) * 0.15 + 0.85;
    float glow = 0.06 / abs(d - 0.5 * pulse);
    return float4(iColor * glow, glow * 0.8);
  }
`)!;

export function DunbarAuraCanvas({ size = 200 }: { size?: number }) {
  return (
    <Canvas style={{ width: size, height: size }}>
      <Fill>
        <Shader
          source={SKSL_DUNBAR_AURA}
          uniforms={{
            iResolution: [size, size],
            iTime: 0,
            iColor: [1.0, 0.33, 0.0], // Naranja Yendo
          }}
        />
      </Fill>
    </Canvas>
  );
}
```

### Optimización Extrema de Shaders:
1. **Paso de Uniforms vía Worklets:** Actualizar variables dinámicas (tiempo, coordenadas) mediante `useDerivedValue` de Reanimated sin provocar re-renders en React.
2. **Ciclo de Vida:** Pausar la ejecución del canvas cuando el componente pierde visibilidad en el viewport.

---

## 💀 3. Skeleton Screens Dinámicos (Percepción de Velocidad)

Las investigaciones empíricas demuestran que los **Skeleton Screens** reducen el tiempo de carga percibido entre un **9% y un 20%** en comparación con los spinners tradicionales.

### Requisitos Técnicos del Skeleton Screen:
*   **Animación de Onda Unidireccional (Left-to-Right Shimmer):** La traslación de un degradado lineal a velocidad constante (1.2 segundos por ciclo) transmite avance activo de datos, superando al "pulsing" de opacidad que genera incertidumbre.
*   **Cero Desplazamiento de Layout (CLS = 0):** Los bloques grises deben medir exactamente los mismos píxeles que las tarjetas y tipografías reales (`EventItemCard`), eliminando saltos bruscos cuando el feed se puebla.

---

#skia #shaders #sksl #glassmorphism #skeletons #nng #tier1

---

## Relaciones de Contexto
- [[Biblia_Maestra_Visual_3D_Motion_Yendo]]
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[Número de Dunbar]]
- [[Reanimated]]
- [[React Native Skia]]
