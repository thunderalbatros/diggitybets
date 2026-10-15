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

# 🎨 Tratado Canónico: Refactoring UI (Adam Wathan & Steve Schoger)
### Basado en: *Refactoring UI*
**Autores:** Adam Wathan & Steve Schoger
**Ubicación Fuente:** `C:\Users\Tomi\Desktop\UPDATE_INGEST\Refactoring UI - Adam Wathan and Steve Schoger.pdf` (250 páginas)

---

## 1. Diseñar con Jerarquía Visual, no con Decoración Arbitraria

Adam Wathan y Steve Schoger postulan que los mejores diseños no provienen de "talento artístico innato", sino de un conjunto riguroso de reglas tácticas:

1. **Jerarquía por Peso y Color antes que por Tamaño:**
   - Para indicar que un texto es secundario, no reduzcas la fuente a un tamaño ilegible (ej: 10pt); manténla en 14pt pero reduce el contraste a un gris suave (`rgba(255,255,255,0.6)`).
2. **Diseñar en Escala de Grises Primero:**
   - La estructura, el espaciado y la jerarquía de una pantalla deben funcionar perfectamente antes de aplicar color. Si una pantalla depende del color para ser comprensible, la jerarquía es deficiente.
3. **Acentuar con Moderación (The Primary Accent):**
   - El color primario de Yendo (Naranja `#FF5500`) solo debe usarse para el elemento interactivo más importante de la pantalla. Si todo está pintado de naranja, nada se destaca.
4. **Espaciado Intencional con Escalas Fijas:**
   - Nunca elijas márgenes libres (13px, 17px, 22px). Utiliza siempre múltiplos estrictos: `4, 8, 12, 16, 24, 32, 48, 64dp`.

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[Biblia_Maestra_Visual_3D_Motion_Yendo]]
- [[DESIGN_SYSTEM_MAP]]
- [[VISUAL_GUIDELINES]]
