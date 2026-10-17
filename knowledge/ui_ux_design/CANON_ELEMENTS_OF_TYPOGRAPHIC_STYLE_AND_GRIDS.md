---
version: 1.0.0
tipo: research
tags:
  - web-application
  - ui-ux
  - architecture
  - en-progreso
autores: [RESEARCHER_AGENT, MANAGER_AGENT]
ultima_revision: 2026-08-27
---

# 🖋️ Tratado Canónico: Tipografía Áurea y Sistemas de Grillas
### Basado en: *The Elements of Typographic Style* (Robert Bringhurst) & *Layout Essentials: 100 Design Principles for Using Grids* (Beth Tondreau)
**Autores:** Robert Bringhurst & Beth Tondreau
**Archivos Fuente:** `unsorted/the_elements_of_typographic_style.pdf` (352 páginas) y `unsorted/dokumen.pub_layout-essentials-revised-and-updated-100-design-principles-for-using-grids-1631596314-9781631596315.pdf` (208 páginas)

---

## 1. La Filosofía Tipográfica de Robert Bringhurst

> **"La tipografía existe para honrar al contenido. Como la música interpretada con maestría, el diseño tipográfico debe ser transparente para que el mensaje resuene con claridad, elegancia y proporción matemática."**
> — Robert Bringhurst

Bringhurst establece que el ritmo tipográfico debe gobernarse por principios análogos a la música clásica: **la escala armónica de tamaños, la cadencia vertical de interlineado (leading) y la longitud de línea óptima (measure)**.

---

## 2. La Proporción Áurea ($\phi = 1.618$) en la Jerarquía de Textos de HuntHub Web

En lugar de elegir tamaños de fuente aleatorios (12, 14, 17, 21), HuntHub Web adopta una **escala modular armónica basada en la Proporción Áurea y la escala Mayor Tercera (1.25 / 1.618)**:

| Nivel de Token | Tamaño de Fuente (pt) | Line Height (Interlineado) | Familia Tipográfica | Uso en la plataforma web |
| :--- | :--- | :--- | :--- | :--- |
| `display` | **32pt** | **38pt** | `Plus Jakarta Sans` ExtraBold | Título de impacto en Onboarding y Headliners de Festivales |
| `h1` | **24pt** | **30pt** | `Plus Jakarta Sans` Bold | Nombre del Venue / Título del Evento principal |
| `h2` | **20pt** | **26pt** | `Plus Jakarta Sans` SemiBold | Secciones de Squad, Filtros de Música |
| `h3` | **16pt** | **22pt** | `Inter` SemiBold | Subtítulos de tarjetas, chips de estado |
| `body` | **14pt** | **20pt** | `Inter` Regular | Descripción del evento, detalles de acceso, copy general |
| `caption` | **12pt** | **16pt** | `Inter` Medium | Hora de apertura, geofence status (<150m), metadatos |

---

## 3. El Sistema de Grilla de 8 Puntos (The 8pt Baseline Grid System)

Beth Tondreau detalla cómo las grillas modulares generan cohesión visual subconsciente y eliminan la ambigüedad en el diseño de layouts.

### Reglas de la Grilla HuntHub Web:
1. **Espaciado Múltiplo de 8 (y 4 para micro-alineación):**
   - Márgenes laterales de pantalla: `16dp` o `24dp`.
   - Separación entre tarjetas: `16dp`.
   - Padding interno de tarjetas: `16dp`.
   - Separación entre icono y texto: `8dp`.
2. **Medida Óptima de Línea (Measure):**
   - En pantallas móviles, una línea de texto de descripción debe contener entre **35 y 55 caracteres**. Si la línea es más larga, el ojo del usuario se pierde al saltar al siguiente renglón; si es más corta, rompe el ritmo de lectura.
3. **Ritmo Vertical Estricto:**
   - La altura de cada componente interactivo (botones, inputs, chips) es siempre un múltiplo exacto de 8dp (ej: Botón primario = `56dp`, Chip = `32dp`, Icono táctil = `48dp`).

---

## Relaciones de Contexto
- [[golden_ratio_design_sources]]
- [[golden_ratio_ui_synthesis]]
- [[DESIGN_SYSTEM_MAP]]
