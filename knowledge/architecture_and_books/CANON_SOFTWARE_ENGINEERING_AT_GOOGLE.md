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

# 🏢 Tratado Canónico: Software Engineering at Google
### Basado en: *Software Engineering at Google: Lessons Learned from Programming Over Time*
**Autores:** Titus Winters, Tom Manshreck & Hyrum Wright (O'Reilly Media)
**Ubicación Fuente:** `C:\Users\Tomi\Desktop\UPDATE_INGEST\Software Engineering at Google - Lessons Learned from Programming Over Time.epub` (600 páginas)

---

## 1. La Diferencia Fundamental: Programación vs. Ingeniería de Software

Titus Winters formula la distinción seminal:
> **"La programación es el acto de escribir código que funciona hoy. La ingeniería de software es la programación integrada con el paso del tiempo, la escala humana del equipo y la sostenibilidad de los cambios futuros."**

### Las Tres Dimensiones Fundamentales:
1. **Tiempo:** ¿Cómo se comportará este código dentro de 3 años cuando las dependencias cambien?
2. **Escala:** ¿Cómo escala la organización cuando 5 o 10 ingenieros toquen el mismo repositorio?
3. **Decisiones de Trade-off:** Saber cuándo pagar deuda técnica y cuándo rechazar complejidad accidental.

---

## 2. La Ley de Hyrum (Hyrum's Law)
> **"Con un número suficiente de usuarios de una API, no importa lo que declares en el contrato formal: todos los comportamientos observables de tu sistema serán dependidos por alguien."**

**Aplicación Yendo:** No confiar en supuestos implícitos en las respuestas JSON de Supabase. Todo contrato debe ser validado con **Valibot** para impedir que cambios silenciosos en la base de datos rompan la interfaz del usuario.

---

## 3. Pruebas Automatizadas y Modificaciones sin Miedo (The Test Diamond)
En Google, las pruebas unitarias rápidas y herméticas superan a las pruebas lentas de integración. En Yendo:
- Unit tests con Jest para los stores de Zustand y algoritmos de quórum.
- Flujos de humo E2E con **Maestro** para los 3 flujos críticos de usuario (Login biométrico, Unirse a Squad, Check-in en Venue).

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[SDD_Framework_Master]]
- [[QA_DEVOPS_PIPELINE]]
- [[Zustand]]
- [[Supabase]]
