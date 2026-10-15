# libs/ — Dependencias locales (producción offline)

El esqueleto (`index.html`) carga 2 librerías desde CDN. Para producción conviene
servirlas localmente (el overlay no debe depender de internet salvo para avatares):

## 1. Cliente de Streamer.bot
Descargar el bundle browser del paquete npm `@streamerbot/client` v2.0.1:
- https://cdn.jsdelivr.net/npm/@streamerbot/client@2.0.1/dist/streamerbot-client.js
- Guardar como `libs/streamerbot-client.js`
- Expone el global `StreamerbotClient` (mismo uso que en `main.js`).

Alternativa de extracción: descomprimir el zip de la extensión
*Spinning Prize Wheel v2.0.5* (extensions.streamer.bot/t/spinning-prize-wheel-update/1957),
que ya incluye el cliente 2.0.1 compatible con Kick + SB 1.0.7.

## 2. canvas-confetti
- https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js
- Guardar como `libs/confetti.browser.min.js`

## 3. Fuente (opcional pero recomendado)
Chakra Petch o Rajdhani (Google Fonts, licencia abierta) vía Fontsource:
- https://fontsource.org/fonts/chakra-petch → descargar woff2 de los pesos 400/600/700
- Guardar en `libs/fonts/` y añadir en `style.css`:
  ```css
  @font-face {
    font-family: "Chakra Petch";
    src: url("libs/fonts/chakra-petch-latin-600-normal.woff2") format("woff2");
    font-weight: 600;
  }
  ```

## 4. Cambiar los src en index.html
```html
<script src="libs/streamerbot-client.js"></script>
<script src="libs/confetti.browser.min.js"></script>
```

> NOTA: NO usar la fuente Stratum2 (la oficial de CS:GO) — es comercial.
