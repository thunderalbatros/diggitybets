# CANON MATT POCOCK TYPESCRIPT AND AGENT SKILLS 2026

[knowledge/docs/SOTA_MATT_POCOCK_TS_RESET_AND_AGENT_SKILLS_2026.md › 🛡️ SOTA: Disciplina de Tipado, Sandboxing de Agentes y Habilidades de Ingeniería (Matt Pocock, 2026)]
> **Documento canónico que responde:** ¿Cómo aplicar las herramientas de Matt Pocock (`ts-reset`, `sandcastle`, `skills` y Statecharts) para blindar el tipado y la ejecución del equipo multiagente y el bot Centinela?
> **Alcance:** este documento cubre el estándar de tipado estricto sin `any`, la arquitectura de aislamiento por worktree para agentes autorreparables (*Self-Tooling Sandboxes*), el catálogo de habilidades de ingeniería de software para LLMs y la formalización de máquinas de estados. **NO es fuente de precios ni sizing cloud** (ver `GCP_PRICING_REFERENCE`), **NI de contratos de red de Kick API** (ver `KICK_API_REFERENCE`), **NI de gestión de credenciales** (ver `secops-secrets`).

---

[knowledge/docs/SOTA_MATT_POCOCK_TS_RESET_AND_AGENT_SKILLS_2026.md › 🛡️ SOTA: Disciplina de Tipado, Sandboxing de Agentes y Habilidades de Ingeniería (Matt Pocock, 2026) › 1. 🔍 Resumen Ejecutivo]
Matt Pocock (fundador de *Total TypeScript* y exintegrante del core team de *XState*) ha liderado la transición de la ingeniería de software moderna hacia dos frentes críticos:
1. **Tipado Predictivo sin Puntos Ciegos:** Neutralización de los tipos `any` que el compilador estándar de TypeScript inyecta por omisión en APIs comunes (`JSON.parse`, `fetch.json()`, `filter(Boolean)`).
2. **Infraestructura de Agentes con Disciplina Táctica:** Creación de librerías de orquestación en entornos aislados (*sandcastle*) y habilidades ejecutivas (*skills*) que fuerzan al agente a comportarse como un ingeniero senior estricto.

---

[knowledge/docs/SOTA_MATT_POCOCK_TS_RESET_AND_AGENT_SKILLS_2026.md › 🛡️ SOTA: Disciplina de Tipado, Sandboxing de Agentes y Habilidades de Ingeniería (Matt Pocock, 2026) › 2. 🛡️ Blindaje de Tipos: `@total-typescript/ts-reset` › El Problema de los Tipos Ocultos en TypeScript]
En proyectos convencionales, llamadas críticas como:
```typescript
const payload = JSON.parse(rawMessage);
```
infieren `payload: any`. Esto permite acceder a propiedades arbitrarias (`payload.user.data.id`) sin validación. Si el formato de la API de Kick o el WebSocket de Pusher cambia, la aplicación colapsa con `TypeError: Cannot read properties of undefined` en plena sesión 24/7.

[knowledge/docs/SOTA_MATT_POCOCK_TS_RESET_AND_AGENT_SKILLS_2026.md › 🛡️ SOTA: Disciplina de Tipado, Sandboxing de Agentes y Habilidades de Ingeniería (Matt Pocock, 2026) › 2. 🛡️ Blindaje de Tipos: `@total-typescript/ts-reset` › La Solución Implementada]
Con `src/reset.d.ts` y `@total-typescript/ts-reset`:
1. **`JSON.parse()` devuelve `unknown`:** Exige que el código realice un casteo explícito con interfaces bien definidas o valide mediante esquemas Zod (`z.parse()` / `z.safeParse()`).
2. **`fetch().json()` devuelve `unknown`:** Impide asumir respuestas sin verificación de contratos.
3. **`.filter(Boolean)` estrecho:** Convierte `(T | null | undefined)[]` en `T[]` de forma determinista sin type-guards manuales.
4. **`Array.includes` idiomático:** Valida literales contra tuplas sin errores falsos de incompatibilidad.

---

[knowledge/docs/SOTA_MATT_POCOCK_TS_RESET_AND_AGENT_SKILLS_2026.md › 🛡️ SOTA: Disciplina de Tipado, Sandboxing de Agentes y Habilidades de Ingeniería (Matt Pocock, 2026) › 3. 🏰 Sandboxing para Self-Tooling: `sandcastle` (`@ai-hero/sandcastle`) › Aislamiento por Worktree (*Worktree-per-run*)]
Cuando el agente necesita sintetizar una herramienta nueva ante un comando de sorteo desconocido o una mutación de la interfaz de casino (paradigma Sandhya Subramani), **no debe escribir directamente en el workspace principal**.

La arquitectura `sandcastle` propone:
1. **Creación Efímera:** Spawnea un `git worktree` en una ruta aislada (`.sandcastle/run-<id>`).
2. **Ejecución y Test:** Corre `node --check`, el linter y pruebas unitarias aisladas (`vitest run`).
3. **Fusión o Descarte:** Si las pruebas pasan al 100%, fusiona el cambio a `master`; si falla o detecta bucles, destruye el worktree sin dejar residuos.

[knowledge/docs/SOTA_MATT_POCOCK_TS_RESET_AND_AGENT_SKILLS_2026.md › 🛡️ SOTA: Disciplina de Tipado, Sandboxing de Agentes y Habilidades de Ingeniería (Matt Pocock, 2026) › 3. 🏰 Sandboxing para Self-Tooling: `sandcastle` (`@ai-hero/sandcastle`) › Aislamiento por Worktree (*Worktree-per-run*)]
r y pruebas unitarias aisladas (`vitest run`).
3. **Fusión o Descarte:** Si las pruebas pasan al 100%, fusiona el cambio a `master`; si falla o detecta bucles, destruye el worktree sin dejar residuos.

```
┌────────────────────────────────────────────────────────┐
│                   BLOQUEO OPERATIVO                    │
│           (Nuevo bot de sorteo en el chat)             │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│           SANDCASTLE: GIT WORKTREE TEMPORAL            │
│         Ruta aislada: .sandcastle/worktree-42          │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│              SÍNTESIS + TEST UNITARIO EN AISLAMIENTO    │
│      vitest run test-parser.ts (0 riesgo a prod)       │
└───────────────────────────┬────────────────────────────┘
               ┌────────────┴────────────┐

[knowledge/docs/SOTA_MATT_POCOCK_TS_RESET_AND_AGENT_SKILLS_2026.md › 🛡️ SOTA: Disciplina de Tipado, Sandboxing de Agentes y Habilidades de Ingeniería (Matt Pocock, 2026) › 3. 🏰 Sandboxing para Self-Tooling: `sandcastle` (`@ai-hero/sandcastle`) › Aislamiento por Worktree (*Worktree-per-run*)]
ÉXITO                     FALLO
               ▼                         ▼
┌────────────────────────────┐ ┌───────────────────────────┐
│ MERGE ATÓMICO A MASTER     │ │ DESTRUCCIÓN DE WORKTREE   │
│ Carga dinámica en caliente │ │ Reporte de error al LLM   │
└────────────────────────────┘ └───────────────────────────┘
```

---

[knowledge/docs/SOTA_MATT_POCOCK_TS_RESET_AND_AGENT_SKILLS_2026.md › 🛡️ SOTA: Disciplina de Tipado, Sandboxing de Agentes y Habilidades de Ingeniería (Matt Pocock, 2026) › 4. 🧰 Catálogo de Habilidades de Ingeniería (`mattpocock/skills`)]
Las habilidades de ingeniería de Matt Pocock se integran en la constitución del equipo multiagente de Centinela (`AGENTS.md`):

1. **`grill-me` (Entrevista Previa Obligatoria):**  
   Antes de escribir código o proponer arquitecturas complejas, el agente interroga al usuario sobre trade-offs y requerimientos no especificados. Se prohíbe asumir decisiones críticas de diseño sin confirmación del CTO Humano.
2. **`diagnose` (Depuración Sistemática en 4 Fases):**  
   Prohíbe modificar código al azar. Requiere:
   - *Fase 1: Reproducción* (escribir un test mínimo que falle).
   - *Fase 2: Aislamiento de Causa Raíz* (RCA).
   - *Fase 3: Hipótesis y Parche Quirúrgico*.
   - *Fase 4: Validación* (el test pasa y no hay regresiones).
3. **`caveman` (Economía de Tokens / FinOps):**  
   Respuestas densas en información, directas y sin relleno conversacional innecesario, protegiendo la ventana de contexto.

---

[knowledge/docs/SOTA_MATT_POCOCK_TS_RESET_AND_AGENT_SKILLS_2026.md › 🛡️ SOTA: Disciplina de Tipado, Sandboxing de Agentes y Habilidades de Ingeniería (Matt Pocock, 2026) › 5. 🔄 Modelado Formal de Estados (Statecharts / XState) › Eliminación de Condiciones de Carrera]
En un sistema multimodal con 4 sentidos concurrentes (chat, pantalla, audio, Hawkes), los booleanos sueltos (`isWinning = true`, `isAlerting = false`) provocan condiciones de carrera.

El modelado formal de estados establece transiciones matemáticas mutuamente excluyentes:
- **`IDLE_OBSERVING`:** Escucha pasiva y cálculo de dinámicas.
- **`HAWKES_SURGE`:** Detección de ola colectiva en chat ($\lambda(t) > \text{threshold}$).
- **`CLAIM_PENDING`:** Señal de ganador detectada; el bot suspende Hilo 1 (Social) y adquiere el `RaceMutex`.
- **`HITL_GRACE_WINDOW`:** Temporizador de 15 segundos para intervención manual de Tomás en Telegram.
- **`DISPATCHED`:** Envío de credencial con rate limiting estricto.
- **`COOLDOWN`:** Silencio obligatorio para evitar spam o dobles cobros.

---

[knowledge/docs/SOTA_MATT_POCOCK_TS_RESET_AND_AGENT_SKILLS_2026.md › 🛡️ SOTA: Disciplina de Tipado, Sandboxing de Agentes y Habilidades de Ingeniería (Matt Pocock, 2026) › 6. 🎯 Resumen de Integración en Centinela Studio]
- `@total-typescript/ts-reset` instalado como dependencia de desarrollo e integrado en `src/reset.d.ts`.
- Tipos de `src/centinela.ts` saneados con interfaces explícitas libres de index signatures inseguras.
- Verificación completa superada con `npx tsc --noEmit` limpio (cero errores en rojo).