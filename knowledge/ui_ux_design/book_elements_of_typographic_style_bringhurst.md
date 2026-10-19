# 📚 Libro Completo (Síntesis Maestra): The Elements of Typographic Style & Swiss Grid Systems

**Alcance:** Tratado técnico integral sobre tipografía matemática (*The Elements of Typographic Style* — Robert Bringhurst) y sistemas de grillas suizas (*Grid Systems in Graphic Design* — Josef Müller-Brockmann). Aplicable a la Software Factory Web y DiggityBets. NO sustituye los contratos de API de Kick.

> **Autores:** Robert Bringhurst & Josef Müller-Brockmann  
> **Dominio:** Tipografía Matemática, Ritmo Vertical, Escalas Modulares, Grillas Suizas Asimétricas y Espacio Negativo  
> **Aplicación Directa:** `site/css/style.css`, `site/css/diggity-intel.css`, Design System 90/8/2  

---

## Sección 1: Principios Fundamentales de Robert Bringhurst (*The Elements of Typographic Style*)

### 1.1 La Tipografía como Honor al Contenido
- *"Typography exists to honor content."* En una interfaz web de lujo oscuro (Dark Glassmorphism), la tipografía nunca debe competir con los datos financieros o multiplicadores (`100x`, `$20 USD`), sino revelar su jerarquía en menos de `50ms` de fijación ocular.
- **Medida de Línea Óptima (Measure / Line Length)**:
  - Cualquier columna de texto continuo debe contener entre **45 y 75 caracteres por línea** (siendo **66 caracteres** el ideal matemático de Bringhurst).
  - En CSS moderno: `max-width: 65ch;`.
  - Para tarjetas compactas de Bountys o grillas de múltiples columnas: **35 a 45 caracteres** (`max-width: 42ch`).

### 1.2 Escalas Modulares Musicales y Proporción Áurea ($\varphi = 1.618$)
- Los tamaños tipográficos nunca se eligen arbitrariamente (`13px, 15px, 19px`), sino mediante una **progresión geométrica** (escala diatónica o áurea):
  - **Escala Cuarta Perfecta ($1.333$)**: `0.75rem`, `1rem`, `1.333rem`, `1.777rem`, `2.369rem`, `3.157rem`.
  - **Escala Proporción Áurea ($\varphi = 1.618$)**: `0.618rem`, `1rem`, `1.618rem`, `2.618rem`, `4.236rem`.
  - **Implementación Fluida (Utopia `clamp()`)**:
    ```css
    --step-0: clamp(0.9375rem, 0.89rem + 0.24vw, 1.0625rem);
    --step-1: clamp(1.125rem, 1.04rem + 0.42vw, 1.375rem);
    --step-2: clamp(1.35rem, 1.20rem + 0.75vw, 1.83rem);
    --step-3: clamp(1.62rem, 1.38rem + 1.20vw, 2.44rem);
    ```

### 1.3 Números Tabulares (`tabular-nums`) para Datos en Tiempo Real
- En tablas de Bonus Hunt, contadores de sorteos, multiplicadores (`2,500x`) y relojes regresivos, **es obligatorio usar cifras tabulares de ancho fijo** para evitar jitter horizontal a 60 FPS:
  ```css
  .numeric-telemetry, .bh-table td, .bounty-reward-pill {
    font-variant-numeric: tabular-nums lining-nums;
    font-feature-settings: "tnum" 1, "zero" 1;
  }
  ```

### 1.4 Tracking (Espaciado entre Letras) según el Tamaño y Caja
- **Mayúsculas y Versalitas (`UPPERCASE` Badges / Kicker Labels)**: Requieren siempre abrir el tracking entre `+0.06em` y `+0.14em` (`letter-spacing: 0.08em;`) para que las astas verticales respiren.
- **Titulares Display Grandes (`> 2rem`, Chakra Petch / Space Grotesk)**: Requieren cerrar ligeramente el tracking (`letter-spacing: -0.02em;` a `-0.035em`) para cohesionar la mancha tipográfica.
- **Texto de Cuerpo (`14px–16px`)**: Nunca alterar el tracking natural de la fuente (`letter-spacing: normal;`).

---

## Sección 2: Sistemas de Grillas Suizas de Josef Müller-Brockmann (*Grid Systems in Graphic Design*)

### 2.1 Filosofía Constructivista de la Grilla
- *"The grid system is an aid, not a guarantee. It permits a number of possible uses and each designer can look for a solution appropriate to his personal style. But one must learn how to use the grid; it is an art that requires practice."*
- Una grilla divide una superficie bidimensional en campos o módulos separados por calles (*gutters*) matemáticas constantes (`8px`, `16px`, `24px`), creando:
  1. **Claridad objetiva**: El ojo del usuario anticipa dónde aparecerán el título, el multiplicador y el botón de acción (`!claim`).
  2. **Tensión asimétrica controlada (Bento Grid)**: Combinar módulos de `1x1`, `2x1` y `2x2` sobre una grilla de 12 columnas manteniendo alineación axial estricta en los bordes externos.

### 2.2 Leyes Matemáticas de Composición y Espacio Negativo
1. **Ley de Alineación Axial**: Todo elemento visible en una vista debe compartir al menos un eje vertical y un eje horizontal con otro elemento de la grilla. Cero elementos flotando con márgenes arbitrarios.
2. **Proporción de Calles (Gutters) vs. Padding Interno**:
   - El padding interno de una tarjeta (`--card-pad: 20px`) debe ser siempre **mayor o igual** que el espacio entre tarjetas adyacentes (`--grid-gap: 16px`), pero **menor** que el margen exterior de la sección (`--section-margin: 48px`). Esto garantiza la **Ley de Proximidad de la Gestalt** sin necesidad de bordes gruesos.
3. **Jerarquía de Luminancia Superficial (De-Boxed Swiss Hierarchy)**:
   - En lugar de encerrar cada dato dentro de cajas anidadas con bordes pesados, la escuela suiza separa campos mediante **espacio negativo** y sutiles escalones de luminancia (`#07090e` → `#0d111a` → `#131926`).
