# Tratado Canónico Clean-Room: Filosofía de Diseño de Software (Ousterhout), Refactorización Avanzada (Fowler, Feathers, Kerievsky), Unit Testing (Khorikov), Observabilidad y Chaos Engineering (2026)

**Alcance:** Aplicable a la arquitectura modular, refactorización de archivos grandes (`site/js/`, `worker/index.js`), diseño de pruebas automatizadas y resiliencia operativa de la Web Software Factory (`Squad 0`, `Squad 2`, `Squad 4`, `Squad 6`, `Squad 7` y `Squad 9`). Sintetiza en sala limpia (*Clean-Room*) los principios de ingeniería públicos de Ousterhout, Fowler, Feathers, Kerievsky, Khorikov, Majors y Rosenthal.

---

## 1. *A Philosophy of Software Design* — Prof. John Ousterhout (Stanford CS190)

### 1.1 Ecuación de Complejidad del Sistema y Módulos Profundos (*Deep Modules*)
- La complejidad total $C$ de un sistema es la suma de la complejidad de cada parte $c_p$ ponderada por la fracción de tiempo $t_p$ que los desarrolladores/agentes pasan trabajando en esa parte:
  $$C = \sum_{p} c_p \cdot t_p$$
- **Módulos Profundos vs. Módulos Superficiales**:
  - Un **Módulo Profundo (*Deep Module*)** expone una interfaz pequeña, declarativa y simple en la superficie mientras oculta una gran cantidad de lógica compleja en su interior (ejemplo: el motor `queryKnowledge(query, limit, options)` de nuestro RAG o el almacenamiento transaccional SQLite).
  - Un **Módulo Superficial (*Shallow Module*)** tiene una interfaz casi tan compleja como su implementación (funciones *pass-through* que solo reenvían parámetros a otra capa), aumentando la carga cognitiva sin ocultar complejidad.

### 1.2 *Define Errors Out of Existence* & *Pull Complexity Downwards*
1. **Definir los Errores Fuera de la Existencia**:
   - En lugar de lanzar excepciones por condiciones recuperables que obligan a cada llamador a escribir `try/catch` defensivos, diseñar la semántica de la operación para que maneje el caso borde de forma natural e idempotente (por ejemplo, eliminar una clave inexistente o cerrar un modal que ya está cerrado debe ser un `no-op` silencioso y seguro).
2. **Tirar de la Complejidad Hacia Abajo (*Pull Complexity Downwards*)**:
   - Es preferible que un módulo de infraestructura (`Squad 2` / `Squad 4`) resuelva internamente reintentos con *exponential backoff*, reconexiones WebSocket y serialización segura antes que exportar parámetros de configuración complejos a las vistas UI.

---

## 2. Refactorización Segura de Monolitos (*Refactoring 2nd Ed.* — Fowler, *Working Effectively with Legacy Code* — Feathers & *Refactoring to Patterns* — Kerievsky)

### 2.1 El Modelo de Costuras (*Seams*) y Pruebas de Caracterización (Michael Feathers)
- **Algoritmo de Modularización con Cero Regresiones** (para dividir archivos grandes como `admin-hub.js` o `worker/index.js`):
  1. **Identificar el Punto de Costura (*Seam*)**: Un lugar donde se puede alterar o interceptar el comportamiento sin editar el código circundante (por ejemplo, inyectando `fetchFn = globalThis.fetch` o extrayendo un submódulo puro).
  2. **Escribir una Prueba de Caracterización (*Characterization Test / Golden Master*)**: Capturar la entrada y salida exacta del comportamiento actual antes de mover una sola línea.
  3. **Aplicar *Sprout Module* o *Wrap Method***: Todo código nuevo nace en un módulo independiente, limpio y tipado, invocado desde el archivo existente a través de una fachada de 1 línea.

### 2.2 Patrones de Refactorización de Alto Impacto en JavaScript/TypeScript (Fowler & Kerievsky)
- ***Split Phase* (Dividir en Fases)**: Separar siempre cualquier función que mezcle **parseo/validación de datos**, **cálculo de dominio** y **renderizado DOM** en tres funciones secuenciales puras: `parseInput(raw) -> computeState(model) -> renderView(state)`.
- ***Replace Conditional with Lookup Table / Strategy***: Reemplazar cadenas de `if / else if / switch` de más de 4 ramas por un diccionario inmutable `Object.freeze({ [command]: handlerFn })`.
- ***Optimistic Offline Lock* (*Patterns of Enterprise Application Architecture* — Fowler)**:
  - Al sincronizar el estado del *Bonus Hunt* o *Torneo* (`POST /api/sync/state`), incluir un número de versión monótono `version` o `updatedAt` para detectar escrituras concurrentes obsoletas (*Lost Update Prevention*).

---

## 3. Pruebas de Alto Valor (*Unit Testing: Principles, Practices, and Patterns* — Vladimir Khorikov)

### 3.1 Los 4 Pilares de una Prueba Automatizada de Élite
Una prueba solo merece existir en nuestra fábrica si maximiza el producto de:
1. **Protección contra regresiones reales** (evalúa lógica crítica de negocio: cálculo de *break-even*, distribución de premios `$DIG`, verificación criptográfica `HMAC-SHA256`, sanitización XSS).
2. **Resistencia a la refactorización** (verifica el **resultado observable** final y nunca los nombres de variables privadas o llamadas internas).
3. **Retroalimentación rápida** (`< 50 ms` por suite unitaria).
4. **Mantenibilidad** (código de prueba claro bajo el patrón *Arrange – Act – Assert*).

---

## 4. Observabilidad e Ingeniería del Caos (*Observability Engineering* — Charity Majors & *Chaos Engineering* — Rosenthal & Jones)

### 4.1 Eventos Estructurados de Alta Cardinalidad (*Wide Events*)
- En lugar de `console.log("Error")` sin contexto, cada operación crítica en el Cloudflare Worker o en el cliente emite un objeto estructurado con contexto completo (`{ event, requestId, route, userId, latencyMs, status, cragConfidence }`).

### 4.2 Inyección Controlada de Fallos (*Chaos & Resilience Gate*)
- Todo overlay de OBS (`overlay-*`) y componente en vivo (`site/js/`) debe superar 4 escenarios de caos sin congelarse ni mostrar `undefined` o `NaN` en pantalla:
  1. **Desconexión abrupta del WebSocket** $\rightarrow$ Reconexión automática con *exponential backoff* + *jitter* (`1s, 2s, 4s, 8s... max 30s`).
  2. **Respuesta HTTP `500 / 429 / Timeout` del Worker** $\rightarrow$ Mantener el último estado válido renderizado (*Stale-If-Error*).
  3. **JSON corrupto o campos faltantes (`null / undefined`)** $\rightarrow$ Esquema `Valibot` con valores por defecto seguros (`v.fallback(...)`).
  4. **Sobrecarga de mensajes del chat de Kick (`50 msgs/seg`)** $\rightarrow$ *Ring Buffer* acotado y *batching* por `requestAnimationFrame`.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_ELITE_MULTI_AGENT_WEB_SOFTWARE_FACTORY_TOPOLOGY_2026]] · [[CANON_QASIMHBTI_BOOKS_SQLITE_SCALABILITY_EDGE_CACHE_AND_ALGORITHMS_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_TIDY_FIRST_KENT_BECK]] · [[clean_architecture]] · #architecture #testing #sre
