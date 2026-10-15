# HuntHub — Guía Rápida para OBS Studio (Etapa 2)

¡Buenas! Acá tenés la guía paso a paso para agregar los nuevos Overlays y Paneles de Control de **Duelos 1v1** y **Torneos 8-Bracket** a tu OBS Studio.

---

## 1. Duelos 1v1 (Battle VS Screen)

### En OBS Studio:
1. **Crear la Fuente de Navegador (Overlay en pantalla):**
   - En tu escena de transmisión, dale a **+ (Agregar fuente)** $\rightarrow$ **Navegador (Browser Source)**.
   - Nombre: `HuntHub - Duelo 1v1`.
   - **URL Local o Archivo local:** Podés marcar *"Archivo local"* y buscar `overlay-battle/index.html` o poner `http://127.0.0.1:3001/` (si el core está corriendo) o la ruta del archivo.
   - **Ancho:** `1920`
   - **Alto:** `1080`
   - Marcá *"Controlar audio vía OBS"* (opcional) y asegurate de tildar *"Actualizar el navegador cuando la escena se active"*.
2. **Crear el Panel de Control del Streamer (Dock personalizado):**
   - En el menú superior de OBS: **Paneles (Docks)** $\rightarrow$ **Paneles de navegador personalizados (Custom Browser Docks)**.
   - Nombre del panel: `Control Batallas 1v1`.
   - URL: Buscá la ruta local de tu archivo `overlay-battle/control.html` (o `file:///C:/Users/.../overlay-battle/control.html`).
   - Hacé clic en **Aplicar**. ¡Listo! Se te abre una ventanita que podés acoplar a la derecha o abajo de tu OBS para manejar la pelea con 1 clic.

### Comandos de Chat para los Espectadores:
- `!battle <nombre de la slot>`: El espectador se anota en el duelo con su slot favorita (ej: `!battle Wanted`).
- `!battle open`: (Solo streamer/mods) Abre el lobby para aceptar retadores.
- `!battle reset`: (Solo streamer/mods) Resetea la batalla.

---

## 2. Torneos de Eliminación (8-Bracket Championship)

### En OBS Studio:
1. **Crear la Fuente de Navegador (Árbol de Torneo):**
   - En OBS: **+** $\rightarrow$ **Navegador (Browser Source)**.
   - Nombre: `HuntHub - Torneo 8-Bracket`.
   - Archivo local: `overlay-tourney/index.html` (o URL `file:///.../overlay-tourney/index.html`).
   - **Ancho:** `1920`
   - **Alto:** `1080`
2. **Crear el Panel de Control del Torneo (Dock):**
   - Menú: **Paneles (Docks)** $\rightarrow$ **Paneles de navegador personalizados**.
   - Nombre: `Control Torneo 8-Bracket`.
   - URL: Ruta de `overlay-tourney/control.html`.
   - Hacé clic en **Aplicar**.

### Comandos de Chat para los Espectadores:
- `!tourney <nombre de la slot>`: El espectador se inscribe en el torneo (hay 8 cupos).
- Al llenarse los 8 cupos, el sistema **sortea los cruces criptográficamente** y arranca los Cuartos de Final automáticamente.
- El streamer va cargando los multiplicadores de cada ronda en su dock y con el botón **Avanzar** o **Coronar** se actualiza en vivo la pantalla con lluvia de confeti y fanfarria.

---

## 3. Modo Demo / Test Offline (Sin Servidor)
Si querés ver cómo se ven las animaciones y el diseño gráfico sin necesidad de abrir nada más:
- Abrí `overlay-battle/index.html?demo=1` directamente en tu navegador (Chrome, Edge u OBS).
- Abrí `overlay-tourney/index.html?demo=1` en tu navegador para ver el cuadro completo simulado.
