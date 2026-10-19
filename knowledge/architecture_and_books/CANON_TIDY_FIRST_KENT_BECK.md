> **Alcance:** Literatura canónica de arquitectura de software, código limpio, TypeScript, validación en el Edge, sistemas distribuidos, videocursos técnicos e ingeniería de agentes IA para la Software Factory Web.

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

# 🧹 Tratado Canónico: Tidy First? (Kent Beck)
### Basado en: *Tidy First? A Personal Exercise in Empirical Software Design*
**Autor:** Kent Beck (Firmante del Manifiesto Ágil / Creador de TDD y JUnit)
**Ubicación Fuente:** `C:\Users\Tomi\Desktop\UPDATE_INGEST\Tidy First_ A Personal Exercise in Empirical Software Design by Kent Beck.pdf` (132 páginas)

---

## 1. La Separación Fundamental: Ordenar (Tidying) vs. Modificar Comportamiento

Kent Beck enseña una disciplina quirúrgica para no quebrar sistemas en producción:

> **"Nunca mezcles un cambio estructural (ordenar código, renombrar variables, extraer funciones) con un cambio de comportamiento (agregar una funcionalidad o cambiar la lógica de un cálculo). Haz uno primero, commitea, y luego haz el otro."**
> — Kent Beck

---

## 2. Micro-Refactorizaciones Prácticas en Yendo

1. **Guard Clauses (Cláusulas de Guardia):** Retornar temprano en los hooks y controladores para aplanar la indentación y erradicar los anidamientos de `if-else` profundos.
2. **Explicar Constantes (Explaining Constants):** Reemplazar números mágicos (`48`, `8000`, `150`) por constantes semánticas con propósito documentado (`MIN_TOUCH_TARGET_DP = 48`, `NETWORK_TIMEOUT_MS = 8000`, `GEOFENCE_RADIUS_METERS = 150`).
3. **Extraer Funciones Pequeñas:** Reducir componentes masivos a funciones puras de menos de 20 líneas que sean triviales de testear.

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[SDD_Framework_Master]]
