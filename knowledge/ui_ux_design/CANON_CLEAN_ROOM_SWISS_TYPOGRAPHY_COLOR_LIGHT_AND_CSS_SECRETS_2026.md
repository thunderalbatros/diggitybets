# Tratado Canónico Clean-Room: Color y Luz (Albers, Gurney, Arnheim), Tipografía Suiza (Ruder, Tschichold, Vignelli, Samara), CSS Moderno (Grant, Lea Verou), Micro-Interacciones (Saffer) y Componentes Inclusivos (Pickering) (2026)

**Alcance:** Aplicable al diseño gráfico, sistema cromático `90/8/2` en `OKLCH`, jerarquía tipográfica, grillas suizas, hojas de estilo en `site/css/` y `overlay-*/style.css`, micro-interacciones y accesibilidad `WCAG AA / APCA` (`Squad 4` & `Squad 6`). Sintetiza en sala limpia (*Clean-Room*) los principios científicos, ópticos y matemáticos de Albers, Gurney, Arnheim, Ruder, Tschichold, Vignelli, Samara, Grant, Verou, Saffer y Pickering.

---

## 1. Ciencia del Color, Contraste Simultáneo e Iluminación Realista (*Interaction of Color* — Albers, *Color and Light* — Gurney & *Visual Perception* — Arnheim)

### 1.1 Ley de Contraste Simultáneo e Irradiación de Albers en Superficies Oscuras
- **Efecto de Irradiación (*Halation*)**:
  - Un texto blanco puro (`#FFFFFF`) o verde neón sobre un fondo negro puro (`#000000`) parece expandirse ópticamente ("sangrar" hacia los bordes), engrosando visualmente las letras un **8%–12%** y provocando fatiga ocular.
  - **Solución Matemática para Modo Oscuro de Lujo (`DiggityBets Obsidian`)**:
    1. Usar un fondo base de obsidiana profunda rica en matiz frío (`oklch(0.14 0.015 265)` $\approx$ `#090A0F`) en lugar de `#000000`.
    2. Usar blanco marfil/platino (`oklch(0.95 0.01 265)` $\approx$ `#F0F2F8`) para titulares y ajustar `font-weight` o `-webkit-font-smoothing: antialiased` para preservar la nitidez de las astas tipográficas.

### 1.2 Iluminación Especular de Materiales Metálicos (*Color and Light* — James Gurney)
- **Por qué un degradado amarillo plano nunca parece Oro Real**:
  - Los metales pulidos (oro 24k, cromo, esmeralda facetada) no tienen reflexión difusa mate; tienen **transiciones abruptas de alta frecuencia luminosa** entre zonas de sombra cálida profunda (`oklch(0.38 0.11 65)`), tono medio dorado (`oklch(0.76 0.16 82)`) y un destello especular casi blanco (`oklch(0.97 0.05 90)`).
  - **Borde de Luz Superior (*Top Specular Rim*)**: En toda interfaz física iluminada desde arriba, el borde superior de una tarjeta elevada recibe luz (`border-top: 1px solid rgba(255, 255, 255, 0.14)`), mientras que los bordes laterales e inferior caen en penumbra (`rgba(255, 255, 255, 0.04)`).

---

## 2. Tipografía Suiza, Espacio Negativo y Ruptura Intencional de la Grilla (*Typographie* — Emil Ruder, *The New Typography* — Tschichold, *The Vignelli Canon* & *Making and Breaking the Grid* — Samara)

### 2.1 El Espacio Blanco/Negativo como Elemento Activo (Emil Ruder & Massimo Vignelli)
- Para Emil Ruder, una superficie no impresa (el espacio vacío entre bloques) tiene **el mismo valor estructural que los elementos visibles**.
- **Regla de De-Boxing y Respiración Espacial**:
  - Si dos grupos de datos ya están separados por `24px–32px` de espacio negativo o por un cambio sutil de luminancia superficial (`+3% L` en `OKLCH`), **no agregar un borde adicional alrededor de cada sub-elemento**.
- **Disciplina Semántica de Vignelli (Máximo 3 Tamaños por Tarjeta)**:
  - Dentro de una misma tarjeta o fila de tabla, usar a lo sumo **3 niveles tipográficos**:
    1. **Valor Primario / Nombre** (`1rem–1.15rem`, peso `600–700`, color primario).
    2. **Métrica Numérica Tabular** (`font-variant-numeric: tabular-nums`, monoespaciado o Chakra Petch).
    3. **Metadato Secundario** (`0.75rem–0.82rem`, opacidad `65%`, `letter-spacing: 0.04em`).

### 2.2 Cuándo Romper la Grilla Suiza (*Making and Breaking the Grid* — Timothy Samara)
- El **92% de la interfaz** (tablas de Bonus Hunt, listas de participantes, estadísticas, formularios) debe obedecer estrictamente la grilla ortogonal de 12 columnas con alineación milimétrica.
- El **8% de los momentos dramáticos** (la tarjeta central de un duelo 1v1, el anuncio de un *Jackpot / Max Win* o el trofeo del campeón del torneo) puede **desbordar intencionalmente `8px–16px` fuera del contenedor** (*intentional grid breakout*) con una insignia o resplandor controlado para capturar inmediatamente la fóvea del espectador.

---

## 3. Arquitectura CSS Moderna y Secretos Visuales (*CSS in Depth 2nd Ed.* — Keith J. Grant & *CSS Secrets* — Lea Verou)

### 3.1 Capas de Cascada Deterministas (`@layer`) y Container Queries (Keith J. Grant)
- Estructurar las hojas de estilo en orden explícito de prioridad:
  ```css
  @layer reset, tokens, base, layouts, components, overlays, utilities;
  ```
  Esto elimina para siempre la necesidad de usar `!important` para sobreescribir estilos base.
- **Container Queries (`container-type: inline-size`)**: Los widgets del panel y de los overlays deben adaptarse al ancho de su propio contenedor padre (`@container (min-width: 420px)`) y no solo al ancho global de la ventana.

### 3.2 Secretos Geométricos en CSS Puro sin Imágenes (*CSS Secrets* — Lea Verou)
- **Recortes Biselados de Estilo E-Sports / Casino (`clip-path` & Gradientes Biselados)**:
  - Esquinas cortadas a $45^\circ$ con `clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))` que se animan a 60 FPS en el compositor GPU.
- **Sombras de Desplazamiento Automático (*Scroll Shadows* en Tablas Largas)**:
  - Usar dos gradientes con `background-attachment: local, scroll` en el contenedor de tablas desplazables para mostrar sutilmente al usuario que hay más filas hacia abajo sin usar JavaScript.

---

## 4. Anatomía de Micro-Interacciones y Componentes Inclusivos (*Microinteractions* — Dan Saffer & *Inclusive Components* — Heydon Pickering)

### 4.1 El Bucle Cuádruple de Dan Saffer (`Trigger` $\rightarrow$ `Rules` $\rightarrow$ `Feedback` $\rightarrow$ `Loops & Modes`)
- Toda acción del espectador (por ejemplo, hacer clic en **"COPIAR CÓDIGO DIGGITYBETS"** o **"ENVIAR PREDICCIÓN"**) debe cumplir las 4 fases en `< 150 ms`:
  1. **Trigger**: Botón con área táctil mínima de `44x44 px` y cambio de cursor/luminancia en `hover`.
  2. **Rules**: Validación instantánea en cliente sin recargar la página.
  3. **Feedback**: Compresión elástica (`scale(0.97)` por `80ms`), cambio de ícono a tilde verde (`✓ ¡Copiado!`) y micro-sonido `ZzFX` opcional.
  4. **Loop**: Restauración automática suave al estado original tras `2000 ms`.

### 4.2 Patrones de Accesibilidad Semántica (*Inclusive Components* — Heydon Pickering)
- **Notificaciones y Sorteos en Vivo (`aria-live="polite"`)**: Los *toasts* y anuncios de ganadores deben inyectarse en un contenedor con `role="status" aria-live="polite"` para no interrumpir el foco del teclado.
- **Modales Accesibles**: Todo modal debe atrapar el foco (`Focus Trap`), cerrarse al presionar la tecla `Escape` y devolver el foco exactamente al botón que lo abrió.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[DESIGN_MASTERY_2026]] · [[CANON_WEB_DESIGN_COMPOSITION_SHADERS_AND_MOTION_2026]] · [[CANON_OPEN_BOOKS_TYPOGRAPHY_COLOR_GRIDS_AND_WEB_PERF_2026]] · [[CANON_EVERY_LAYOUT_CSS_ALGORITHMS]] · [[CANON_UX_HUMAN_EXPERIENCE_ACCESSIBILITY_2026]] · #design #typography #css #accessibility
