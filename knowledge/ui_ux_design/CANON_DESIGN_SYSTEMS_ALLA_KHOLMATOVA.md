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

# 🧩 Tratado Canónico: Design Systems (Alla Kholmatova)
### Basado en: *Design Systems: A Practical Guide to Creating Design Languages*
**Autora:** Alla Kholmatova (Smashing Magazine)
**Ubicación Fuente:** `C:\Users\Tomi\Desktop\UPDATE_INGEST\Design Systems - Alla Kholmatova.pdf` (288 páginas)

---

## 1. Patrones Fundacionales y Lenguajes de Diseño

Un Design System no es solo una biblioteca de componentes Figma o código React; es un **lenguaje compartido** entre diseño, producto e ingeniería.

1. **Patrones Perceptuales (Estilo):** Colores, tipografía, iconografía, sonido, movimiento, tono de voz.
2. **Patrones Funcionales (Módulos):** Botones, cards, encabezados, selectores de fecha, componentes modales.
3. **Reglas de Evolución y Gobernanza:**
   - Todo componente nuevo debe ser aprobado por el Design System Squad antes de integrarse al catálogo.
   - Prohibidos los estilos ad-hoc inline (`style={{ margin: 17 }}`) en las pantallas finales; uso estricto de los tokens definidos en `src/constants/theme.ts`.

---

## Relaciones de Contexto
- [[DESIGN_SYSTEM_MAP]]
- [[YDS_Catalog]]
