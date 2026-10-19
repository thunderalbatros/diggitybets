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

# ⚡ Tratado Canónico: JavaScript The Good Parts (Douglas Crockford)
### Basado en: *JavaScript: The Good Parts*
**Autor:** Douglas Crockford (Yahoo! / Arquitecto del formato JSON)
**Archivo Fuente:** `unsorted/OReilly_JavaScript_The_Good_Parts_May_2008.pdf` (172 páginas)

---

## 1. La Esencia: Elegir el Subconjunto Puro y Seguro del Lenguaje

Douglas Crockford demostró que JavaScript contiene tanto ideas brillantes (funciones como objetos de primera clase, clausuras léxicas, objetos dinámicos con prototipos) como pésimas decisiones apresuradas (coerción implícita de tipos con `==`, variables globales implícitas, sentencias `with`).

> **"La mayoría de los lenguajes de programación tienen partes buenas y partes malas. La maestría consiste en restringirse voluntariamente al subconjunto limpio y elegante, ignorando por completo las trampas históricas del lenguaje."**
> — Douglas Crockford

---

## 2. Los Principios Fundamentales Aplicados al Stack React Native / TypeScript de Yendo

1. **Inmutabilidad y Pureza Funcional:**
   - Evitar la mutación directa de objetos y arrays en el store (Zustand). Toda actualización de estado debe producir un nuevo objeto inmutable mediante operadores spread (`...state`) o funciones puras.
2. **Clausuras Léxicas (Closures) y Encapsulamiento:**
   - Aprovechar las clausuras en Custom Hooks (`useVenueFilter`, `useQuorumSocket`) para encapsular estado privado y suscripciones sin necesidad de clases infladas con `this` mutable.
3. **Composición de Objetos sobre Herencia Rígida:**
   - En TypeScript/React Native, preferir la composición de componentes funcionales pequeños (<150 líneas) y utilidades puras en lugar de cadenas de herencia orientadas a objetos.

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[CANON_EFFECTIVE_TYPESCRIPT_CHERNY_VANDERKAM]]
- [[Zustand]]
