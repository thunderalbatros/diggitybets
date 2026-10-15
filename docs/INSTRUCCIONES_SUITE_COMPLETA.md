# Guía de Uso — Suite Completa HuntHub (OBS & Streamer)

> **HuntHub v3.0** — Suite integral para streamers de casino en Kick.  
> **100% Gratuito y Liviano:** Cero consumo pesado en la notebook, audio procedural y sincronización en tiempo real.

---

## 1. Novedades de esta Versión

1. **Nueva Ruleta Dual (`wheel-duo`):**
   - Muestra en cada tarjeta de la ruleta al **participante** (avatar + nick a la izquierda) y a la **slot** elegida (tarjeta con nombre y proveedor a la derecha).
   - **Giro infalible en 1 clic:** Podés hacerla girar desde el dock de control, con el botón dorado directo en el overlay, haciendo clic en la ruleta, o presionando la **Barra Espaciadora / Enter**.
   - **Autocompletado automático:** Al salir un ganador, se transfiere automáticamente a la **Batalla 1v1** (Jugador A / Jugador B) o al **Torneo 8-Bracket** (lugares 1 al 8) sin tipear nada.
2. **Community Bonus Hunt con Selector Visual de Tarjetas (`overlay-bonushunt`):**
   - **Buscador interactivo con tarjetas de slots:** Al escribir el nombre de la slot (ej: *"Cook Out"*, *"Wanted"*, *"Gates"*, *"Sweet"*), se despliega un panel flotante con las tarjetas visuales (imagen de la slot, título y proveedor). Al hacer clic en la imagen, queda seleccionada automáticamente.
   - **Mini-tarjetas visibles en ambos paneles:** La imagen de la slot se muestra tanto en el **Dock de control del streamer** como en el **Panel de la transmisión en OBS**.
   - **Panel de KPIs y Predicciones:** Start Balance, Cantidad de Bonos, Req Avg (x y $), Current Avg X, Winnings y Profit/Loss, con tarjetas de *Best Win* y *Lucky Win*, y cálculo del ganador de predicciones `!guess`.
3. **Interfaz Exclusivamente en Inglés & Tipografía Agrandada:**
   - Todos los textos de overlays y docks de control (8-Bracket, 1v1 Battle, Bonus Hunt y Duo Wheel) se encuentran **100% en inglés** para adaptarse al estándar global de casino streaming.
   - Fuentes de texto significativamente más grandes y nítidas (Chakra Petch / Inter con sombra de neón) para que los nombres de los espectadores y de las slots se lean a la perfección en pantalla y celulares.

---

## 2. Configuración en OBS Studio (Fuentes de Navegador y Docks)

### A. Overlays en Pantalla (Fuentes de Navegador en tu Escena)
En OBS, creá una fuente de **Navegador** (Browser Source) para cada overlay que quieras mostrar:

| Overlay | Archivo Local | Resolución Recomendada | Notas |
| :--- | :--- | :--- | :--- |
| **Ruleta Dual (Participante + Slot)** | `wheel-duo/index.html` | 620 x 620 px | Transparente, aguja central dorada y confeti. |
| **Torneo 8-Bracket** | `overlay-tourney/index.html` | 1920 x 1080 px | Bracket SVG completo con cuartos, semis y final. |
| **Batalla 1v1** | `overlay-battle/index.html` | 1920 x 1080 px | Tarjetas enfrentadas Azul vs Rojo. |
| **Community Bonus Hunt** | `overlay-bonushunt/index.html` | 1920 x 1080 px | Tracker estilo bonushunt.gg con tabla y KPIs. |
| **Ruleta CS:GO (Usuarios Chat)** | `wheel-csgo/index.html` | 500 x 500 px | Ruleta clásica de chatters activos. |
| **Ruleta de Slots (Solo Slots)** | `wheel-slots/index.html` | 500 x 500 px | Ruleta vertical con más de 4,800 slots. |

> **Tip para OBS:** En las propiedades de la fuente de navegador en OBS, marcá la casilla *"Controlar audio vía OBS"* si deseás regular el volumen de los efectos de sonido directamente desde el mezclador.

---

### B. Paneles de Control del Streamer (OBS Custom Docks)
Para manejar todo con un solo clic mientras transmitís sin cambiar de pantalla:
1. En OBS Studio andá al menú superior: **Docks** $\rightarrow$ **Docks de navegador personalizados...**
2. Agregá los paneles que necesites:

- **Panel Ruleta Dual:**  
  - Nombre: `HuntHub - Ruleta Dual`  
  - URL: `file:///C:/Users/tomas/Desktop/streamerbot/wheel-duo/control.html`
- **Panel Torneo 8:**  
  - Nombre: `HuntHub - Control Torneo`  
  - URL: `file:///C:/Users/tomas/Desktop/streamerbot/overlay-tourney/control.html`
- **Panel Batalla 1v1:**  
  - Nombre: `HuntHub - Control Batalla`  
  - URL: `file:///C:/Users/tomas/Desktop/streamerbot/overlay-battle/control.html`
- **Panel Bonus Hunt:**  
  - Nombre: `HuntHub - Control Bonus Hunt`  
  - URL: `file:///C:/Users/tomas/Desktop/streamerbot/overlay-bonushunt/control.html`

Podés acoplar estos paneles a los laterales o en la parte inferior de tu OBS Studio.

---

## 3. Modo de Uso Paso a Paso

### 1. Ruleta Dual y Carga Automática
1. Abrí el panel **HuntHub - Ruleta Dual**.
2. Elegí el **Modo de Destino**:
   - `⚔️ Batalla 1v1`: El primer ganador se asigna a Jugador A; el segundo a Jugador B.
   - `🏆 Torneo 8-Bracket`: Los ganadores se van cargando en orden en los 8 puestos del torneo.
3. Hacé clic en **🎲 Girar Ruleta Dual**.
4. La ruleta girará en el overlay con sonido de reel y confeti al frenar.
5. El participante y su slot seleccionada se transfieren **automáticamente** al panel de batalla o torneo.

---

### 2. Torneo 8-Bracket
1. Abrí el panel **HuntHub - Control Torneo**.
2. Para probarlo al instante con 1 clic, pulsá **⚡ Cargar 8 Jugadores Demo (1-Click)**.
3. Verás cómo el cuadro de 8 jugadores se dibuja inmediatamente en el overlay:
   - Cuartos de Final (Partidas 1, 2, 3 y 4).
   - Semifinales (Partidas 5 y 6).
   - Gran Final (Partida 7).
4. A medida que jugás cada slot en vivo, ponés el multiplicador (Score) de cada jugador en el panel y el sistema avanza automáticamente de ronda al ganador con efectos luminosos.

---

### 3. Community Bonus Hunt (Tracker de Bonuses)
1. Abrí el panel **HuntHub - Control Bonus Hunt**.
2. Colocá el **Costo Inicial / Starting Balance** (ej: `$200` o `$1000`).
3. Para abrir la participación en el chat, pulsá **📢 Abrir Calls del Chat**.
   - Los espectadores pueden escribir en Kick: `!hunt Wanted Dead` o `!call Gates of Olympus`.
   - Para arriesgar el saldo final escriben: `!guess 850.50`.
4. También podés agregar bonuses manualmente con el formulario rápido o pulsar **⚡ Simular Bonus Hunt Demo (10 Slots)** para cargar una demostración completa con un clic.
5. Cuando vas abriendo los bonuses en vivo:
   - En la lista de bonuses, ingresás el **Pago ($)** obtenido en esa slot y hacés clic en **💾 Guardar**.
   - Al instante se actualizan los indicadores superiores:
     - **Req Avg (X y $):** Cuánto multiplicador promedio necesitás en los bonuses restantes para recuperar o salir en ganancia.
     - **Avg X:** El multiplicador promedio real conseguido hasta el momento.
     - **Winnings:** Total ganado acumulado.
     - **Best Win & Lucky Win:** Se destacan automáticamente con coronas doradas y púrpuras.
6. Al terminar el último bonus, hacés clic en **🏆 Finalizar Hunt**.
   - El sistema calcula quién fue el espectador que acertó o estuvo más cerca del saldo final y dispara el festejo de victoria con confeti.

---

## 4. Ejecución del Servidor Local (Opcional para Chat en Vivo)

Si querés conectar la suite directamente al chat de Kick de tu canal (`diggitybets`) en tiempo real:

1. Abrí una terminal de PowerShell en la carpeta del proyecto:
   ```powershell
   cd C:\Users\tomas\Desktop\streamerbot\core
   npm start
   ```
2. El servidor iniciará en `http://127.0.0.1:3001` y se conectará automáticamente al canal mediante Pusher WebSocket con 0ms de latencia.
3. Los comandos de chat quedarán activos inmediatamente:
   - `!hunt <slot>` / `!call <slot>`: Postula una slot a la bonus hunt.
   - `!guess <monto>`: Predice el saldo final de la bonus hunt.
   - `!battle <slot>`: Participa en la batalla 1v1.
   - `!tourney <slot>`: Se inscribe en el torneo 8.
   - `!puntos`: Consulta de saldo de puntos del espectador.
