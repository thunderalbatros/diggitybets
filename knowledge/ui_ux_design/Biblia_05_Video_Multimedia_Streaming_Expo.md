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

# 🎬 Biblia 05: Video, Multimedia y Streaming en Alta Definición (Expo Video)

Esta es la **norma de ingeniería audiovisual canónica** para la reproducción, precarga y streaming de videos en alta definición en [[Yendo Buenos Aires]].

---

## 🏛️ 1. Arquitectura Desacoplada: `VideoPlayer` vs `VideoView`

En el ecosistema moderno de Expo (SDK 52/53/54/57+), la librería `expo-video` reemplaza de manera definitiva a la obsoleta `expo-av`. Su innovación clave es el **desacoplamiento estricto** entre el motor de decodificación nativo (`VideoPlayer`) y la superficie de renderizado en pantalla (`VideoView`).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ARQUITECTURA DESACOPLADA DE EXPO VIDEO                                      │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ 1. `VideoPlayer` (Motor Lógico)       │ 2. `VideoView` (Superficie UI)       │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ - Instanciado con `useVideoPlayer()` │ - Componente JSX puro de render      │
│ - Controla: ExoPlayer (Android) /    │ - Se monta y desmonta ágilmente sin  │
│   AVPlayer (iOS)                     │   destruir el búfer de red           │
│ - Mutaciones síncronas en C++:       │ - Soporta `contentFit="cover"`,      │
│   `player.loop = true;`              │   `nativeControls={false}`           │
│   `player.muted = true;`             │ - Picture-in-Picture (PiP) integrado │
│   `player.play();`                   │                                      │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

### Regla de Oro en Listas Infinitas (Feed de Experiencias):
**Nunca instanciar un `VideoPlayer` por cada celda de una `FlashList`.**
Tener más de 3 instancias nativas de ExoPlayer/AVPlayer activas colapsa la memoria RAM y satura los decodificadores de hardware de la GPU móvil.
*   **Patrón de Reproductor Compartido:** Mantener una única instancia activa de `VideoPlayer` gestionada globalmente o por índice enfocado en pantalla (`viewableItemsChanged`). Las celdas fuera del viewport muestran la portada HD estática (`expo-image`).

---

## ⚡ 2. Implementación de Video Hero en Bucles Silenciosos (Background Loops)

Para tarjetas de eventos con vistas previas en movimiento o banners cinematográficos de Terceros Lugares:

```tsx
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

export interface BackgroundVideoCardProps {
  sourceUrl: string;
  aspectRatio?: number;
}

export const BackgroundVideoCard = memo(function BackgroundVideoCard({
  sourceUrl,
  aspectRatio = 16 / 9,
}: BackgroundVideoCardProps) {
  // Inicialización del reproductor con mutación fluida sin re-renders en React
  const player = useVideoPlayer(sourceUrl, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  return (
    <View style={[styles.container, { aspectRatio }]}>
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
        allowsFullscreen={false}
      />
      {/* Scrim protector para legibilidad de textos sobre video (WCAG AAA) */}
      <View style={styles.darkScrim} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  darkScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
  },
});
```

---

## 📡 3. Protocolos de Red, Búfer y Supabase Storage CDN

1. **Formatos de Distribución:**
   * **Clips Cortos ($\le 15\text{ s}$):** Contenedor MP4 codificado en H.264 (perfil High o Main), con compresión constante y tasa de bits adaptada ($\le 2.5\text{ Mbps}$ para 1080p, audio AAC a 128 kbps).
   * **Videos Extensos / Transmisiones:** Streaming HLS (`.m3u8`) para conmutación de bitrate dinámica según la intensidad de la señal 4G/5G del usuario en la calle.
2. **Cabeceras HTTP de Rango (`Byte-Range Requests`):**
   * El bucket de Supabase Storage debe servir archivos con cabeceras `Accept-Ranges: bytes` para permitir que el reproductor comience a emitir fotogramas en menos de **200ms** sin esperar a que el archivo completo se descargue en disco.
3. **Caché Determinista en Almacenamiento Local:**
   * Utilizar `expo-file-system` para almacenar en caché clips repetitivos (ej. intro de la app o celebraciones recurrentes del Carpincho).

---

## 🛡️ 4. Higiene Energética y Accesibilidad Acústica

*   **Pausa Automática en Pérdida de Foco:** Conectar la reproducción al hook `useIsFocused()` y al listener de `AppState`. Si la app pasa a background, invocar `player.pause()` para ahorrar hasta un **40% de consumo de batería**.
*   **Confort Acústico Urbano (<72 dB):** Respetar la ley fundamental de Yendo; todo video que arranque en el Feed debe reproducirse obligatoriamente en modo **mudo (`muted = true`)** para evitar estruendos en bares o espacios públicos. El audio solo se activa ante interacción deliberada del usuario.

---

#video #expo-video #streaming #multimedia #hls #caching #tier1

---

## Relaciones de Contexto
- [[Biblia_Maestra_Visual_3D_Motion_Yendo]]
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[Terceros Lugares]]
- [[Supabase]]
- [[Capybara Mascot]]
