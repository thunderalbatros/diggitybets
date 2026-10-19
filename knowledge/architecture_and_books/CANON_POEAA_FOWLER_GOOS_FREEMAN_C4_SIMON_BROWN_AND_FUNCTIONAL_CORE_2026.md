# Tratado Canónico Clean-Room: Patrones de Arquitectura Empresarial (Fowler PoEAA), TDD Guiado por Pruebas (Freeman & Pryce GOOS), Modelo C4 (Simon Brown), Inyección de Dependencias (Seemann), Functional Core / Imperative Shell (Granin) y Flujo Unidireccional Redux (2026)

**Alcance:** Aplicable a la arquitectura de dominio de `worker/index.js`, `site/js/*.js`, diseño de pruebas de extremo a extremo (`Squad 6`), documentación visual de arquitectura (`Squad 0` & `Squad 7`) y gestión de estado predecible en el cliente (`Squad 4`). Sintetiza en sala limpia (*Clean-Room*) los modelos de *Patterns of Enterprise Application Architecture* (*Martin Fowler*), *Growing Object-Oriented Software, Guided by Tests* (*Freeman & Pryce*), *Software Architecture for Developers Vol. 1 & 2 / C4 Model* (*Simon Brown*), *Dependency Injection Principles, Practices, and Patterns* (*Mark Seemann*), *Functional Design and Architecture* (*Alexander Granin*) y *Redux in Action* (*Garreau & Faurot*).

---

## 1. Patrones de Arquitectura de Aplicaciones Empresariales (*Patterns of Enterprise Application Architecture — PoEAA* — Martin Fowler)

### 1.1 El Patrón `Money` y Asignación Sin Pérdida de Centavos (Fowler's Allocation Algorithm)
- **Problema**: Cuando se divide un pozo de premios o un bono entre $N$ ganadores (ej. dividir `100 $DIG` entre `3` ganadores), `100 / 3 = 33.333...` pierde `1` unidad por truncamiento o crea `1` unidad fantasma por redondeo.
- **Algoritmo Canónico `allocate(totalUnits, ratios)` de Fowler**:
  1. Operar siempre en unidades enteras mínimas (`BigInt` o `Number.isSafeInteger`).
  2. Calcular la parte entera de cada participante: $share_i = \lfloor \frac{total \times ratio_i}{\sum ratio} \rfloor$.
  3. Calcular el remanente exacto: $remainder = total - \sum share_i$.
  4. Distribuir `1` unidad adicional a los primeros $remainder$ participantes para garantizar la invariante contable:
     $$\sum_{i=1}^{N} share_i \equiv total$$

### 1.2 *Unit of Work*, *Identity Map* y *Optimistic Offline Lock* en SQLite / D1
- **Unit of Work (Unidad de Trabajo)**:
  - En lugar de disparar múltiples `await env.DB.prepare(...).run()` sueltos durante una petición HTTP, acumular todas las mutaciones (`insert`, `update`, `delete`) en un arreglo de sentencias preparadas y ejecutarlas atómicamente al final del caso de uso mediante `await env.DB.batch(statements)`.
- **Optimistic Offline Lock (Bloqueo Optimista con Columna `version`)**:
  - Para evitar el problema de *Lost Update* cuando el streamer y un moderador editan simultáneamente una cacería de bonos (`bonushunt`):
  ```sql
  UPDATE bonus_hunt_state
  SET payload_json = ?1, version = version + 1, updated_at = ?2
  WHERE hunt_id = ?3 AND version = ?4;
  ```
  - Si `meta.changes === 0`, otro operador modificó el estado primero; devolver `HTTP 409 Conflict` con el estado más reciente para reconciliación.

---

## 2. Desarrollo Guiado por Pruebas de Afuera Hacia Adentro (*Growing Object-Oriented Software, Guided by Tests — GOOS* — Steve Freeman & Nat Pryce)

### 2.1 El *Walking Skeleton* (Esqueleto Caminante)
- **Principio**: Antes de diseñar decenas de funciones internas, construir y desplegar primero un **hilo vertical mínimo de extremo a extremo** (*Walking Skeleton*) que atraviese todas las fronteras reales:
  $$\text{UI Click / Chat Command} \longrightarrow \text{Worker API} \longrightarrow \text{SQLite D1} \longrightarrow \text{WebSocket Broadcast} \longrightarrow \text{OBS Overlay Render}$$
- Una vez que el esqueleto caminante pasa la prueba automatizada en Playwright, cada funcionalidad nueva se agrega con el doble bucle de GOOS:
  1. **Bucle Externo (Prueba de Aceptación E2E)**: Verifica qué hace el sistema desde los ojos del usuario/streamer.
  2. **Bucle Interno (Pruebas Unitarias Rápidas)**: Verifica cómo colaboran los objetos y funciones puras.

### 2.2 Regla de Oro de GOOS: *"Only Mock Types That You Own"* (Solo Simula Tipos que Te Pertenecen)
- **Peligro de simular APIs de terceros**: Si un test simula directamente `fetch('https://api.kick.com/public/v1/...')`, el test se acopla a detalles HTTP externos y puede pasar aunque nuestro código use mal la respuesta real.
- **Solución Hexagonal (Puertos y Adaptadores)**:
  1. Definir una interfaz propia del dominio (`KickGatewayPort` con métodos como `verifyWebhookSignature()`, `sendChatMessage()`, `fetchChannelInfo()`).
  2. En pruebas unitarias de dominio, usar un `FakeKickGateway` en memoria.
  3. Probar el `HttpKickGatewayAdapter` real por separado con *Contract Tests* contra payloads capturados de la documentación oficial de Kick (`kick-api-contracts`).

### 2.3 Patrón *Test Data Builder* para Pruebas Legibles
- En lugar de instanciar objetos gigantes con 20 campos irrelevantes en cada test, usar constructores fluidos con valores por defecto sensatos:
  ```javascript
  const slot = aBonusSlot()
    .withName('Gates of Olympus 1000')
    .withBet(2.00)
    .withPayout(1000.00) // 500x
    .build();
  ```

---

## 3. El Modelo C4 y Liderazgo Técnico Ágil (*Software Architecture for Developers Vol. 1 & 2* — Simon Brown)

### 3.1 Los 4 Niveles de Abstracción del Modelo C4 (Zoom tipo Google Maps)
Todo documento de arquitectura en `docs/` o artefacto de la fábrica debe usar la jerarquía **C4** en diagramas Mermaid:
1. **Nivel 1 — *System Context* (Contexto del Sistema)**: Muestra a `HuntHub / DiggityBets` como una caja central rodeada por sus actores (Streamer, Moderadores, Espectadores de Kick, OBS Studio) y sistemas externos (Kick API / Pusher, Cloudflare Edge).
2. **Nivel 2 — *Containers* (Contenedores Ejecutables / Almacenes)**: Muestra las unidades de despliegue reales:
   - `SPA Web Portal & Admin Hub` (`site/`),
   - `8 OBS Browser Source Overlays` (`overlay-*/`),
   - `Cloudflare Worker API & WebSocket Hub` (`worker/index.js`),
   - `Cloudflare D1 SQLite Database` (`hunthub_production`).
3. **Nivel 3 — *Components* (Componentes Internos de un Contenedor)**: Qué módulos existen dentro del Worker (`WebhookVerifier`, `BonusHuntEngine`, `CrowdGameArbitrator`, `RateLimiter`) o dentro del Frontend (`UserStore`, `AdminHub`, `MotionFX`, `AudioLimiter`).
4. **Nivel 4 — *Code* (Código)**: Solo para algoritmos críticos (ej. máquina de estados de un juego o grafo AST generado automáticamente por `CodeGraph`).

### 3.2 *Risk-Storming* Colaborativo entre Agentes (`Squad 0` + `Squad 6`)
- Antes de ejecutar un refactor mayor, superponer sobre el diagrama C4 de Nivel 2/3 las **etiquetas de riesgo** identificadas por `Squad 6` (riesgo de latencia $>16.6\text{ ms}$, riesgo de condición de carrera `TOCTOU`, riesgo de caída de API externa) y verificar que cada riesgo tenga un control técnico asignado.

---

## 4. *Functional Core, Imperative Shell*, Inyección de Dependencias y Flujo Unidireccional (*Seemann*, *Granin* & *Redux in Action*)

### 4.1 *Functional Core, Imperative Shell* (Núcleo Funcional Puro, Cáscara Imperativa)
- **Núcleo Funcional Puro (80% de la lógica — Cero I/O)**:
  - Todas las reglas de negocio (cálculo de multiplicadores, break-even de Bonus Hunt, llaves de torneo 8-Bracket, pagos de Blackjack/Ruleta, validación de esquemas y sorteos `HMAC-SHA256`) deben ser **funciones puras deterministas**:
    $$\text{ nuevoEstado, efectos } = f(\text{estadoActual}, \text{comando})$$
  - No leen `localStorage`, no llaman a `fetch`, no tocan el DOM ni `Date.now()` (reciben `nowMs` como argumento). Esto permite probarlas al 100% en $<5\text{ ms}$ sin mocks.
- **Cáscara Imperativa (20% en el borde — I/O)**:
  - Lee datos de `D1` o `localStorage`, invoca al Núcleo Funcional Puro, persiste el `nuevoEstado` y despacha los `efectos` (WebSocket broadcast, renderizado DOM o audio `ZzFX`).

### 4.2 *Composition Root* (Raíz de Composición — Mark Seemann)
- Evitar el anti-patrón *Service Locator* o el acoplamiento implícito a variables globales `window.*` dispersas en decenas de archivos.
- Centralizar el ensamblaje de módulos en un único punto de arranque (*Composition Root*: `site/js/app.js` en el cliente y `fetch(request, env, ctx)` en `worker/index.js`), pasando las dependencias explícitamente.

### 4.3 Flujo Unidireccional y Selectores Memoizados (*Redux in Action* — Garreau & Faurot)
- En paneles complejos como el `Bonus Hunt Tracker`, derivar las métricas agregadas (total invertido, total cobrado, promedio $X$, multiplicador necesario para empatar *Break-Even X*) mediante **Selectores Puros** sobre el árbol de estado en lugar de leer y sumar celdas del DOM.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #architecture_and_books
