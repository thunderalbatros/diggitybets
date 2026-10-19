# CANON ECC HARNESS AND AGENT OPTIMIZATION PLAYBOOK 2026

> **Alcance:** Literatura canónica de arquitectura de software, código limpio, TypeScript, validación en el Edge, sistemas distribuidos, videocursos técnicos e ingeniería de agentes IA para la Software Factory Web.

[knowledge/docs/ECC_HARNESS_AND_AGENT_OPTIMIZATION_PLAYBOOK_2026.md › 📘 Playbook de Optimización del Equipo de Agentes y Arquitectura Harness (Inspirado en affaan-m/ECC 2026)]
> **Origen Canónico:** Investigación y extracción del repositorio `affaan-m/everything-claude-code` (ECC)  
> **Adaptación:** Ecosistema Centinela Studio (Antigravity IDE + Gemini 3.8 Flash + Node.js/TypeScript + GCP FinOps)  
> **Fecha:** Octubre 2026 | **Ámbito:** `knowledge/docs/` (Ingesta RAG en Qdrant)

---

[knowledge/docs/ECC_HARNESS_AND_AGENT_OPTIMIZATION_PLAYBOOK_2026.md › 📘 Playbook de Optimización del Equipo de Agentes y Arquitectura Harness (Inspirado en affaan-m/ECC 2026) › 1. ¿Qué es el Agent Harness de ECC y por qué importa?]
En la evolución de la ingeniería agentica (2025–2026), el mayor riesgo para la rentabilidad y la precisión no es el tamaño del modelo fundacional, sino el **descontrol del contexto y la falta de arneses deterministas** (Agent Harness).

Un agente sin arnés:
1. Relee archivos completos en bucles infinitos, disparando la factura de tokens (la experiencia amarga de quemar $20 USD en Cline con Claude Sonnet en pocos minutos).
2. Asume que una tarea terminó sin ejecutar validaciones en terminal (`hallucinated completion`).
3. Pierde la memoria de patrones que ya aprendió en sesiones anteriores.

El proyecto **`affaan-m/ECC`** introduce la arquitectura de **Harness Modular**:
- **Continuous Learning v2:** Los agentes extraen y persisten *instintos operacionales* con puntajes de confianza (`confidence score 0.0 – 1.0`).
- **Deterministic Gates:** Se sustituye la "intención del modelo" por validaciones reales en CLI (`tsc`, `node --check`, linters, tests).
- **Prompt Caching & Context Budgeting:** El contexto se mantiene estructurado para que el 90%+ de los tokens repetidos se sirvan desde caché a costo $0.

---

[knowledge/docs/ECC_HARNESS_AND_AGENT_OPTIMIZATION_PLAYBOOK_2026.md › 📘 Playbook de Optimización del Equipo de Agentes y Arquitectura Harness (Inspirado en affaan-m/ECC 2026) › 2. Los 4 Pilares de ECC Adaptados a Centinela]
```
┌─────────────────────────────────────────────────────────────┐
│                 CENTINELA AGENT HARNESS                     │
├───────────────────────────────┬─────────────────────────────┤
│ 1. Continuous Learning v2     │ 2. Multi-Phase Gate         │
│   • Motor de Instintos ($0)   │   • verify-before-claim     │
│   • Refuerzo de heurísticas   │   • ts-parse-check          │
│   • Memoria modular Qdrant    │   • 0 errores en rojo       │
├───────────────────────────────┼─────────────────────────────┤
│ 3. FinOps Context Budget      │ 4. Autonomous Life-Cycle    │
│   • Prompt caching en Gemini  │   • DEC-035: Preflight auto │
│   • Groq LPU para ASR         │   • Cosecha shadow silenciosa│
│   • Vertex Flash para Visión  │   • HITL: Tomás opera bot   │
└───────────────────────────────┴─────────────────────────────┘
```

[knowledge/docs/ECC_HARNESS_AND_AGENT_OPTIMIZATION_PLAYBOOK_2026.md › 📘 Playbook de Optimización del Equipo de Agentes y Arquitectura Harness (Inspirado en affaan-m/ECC 2026) › 2. Los 4 Pilares de ECC Adaptados a Centinela › Pilar 1: Continuous Learning e Instintos (ECC Pattern)]
- **Concepto:** Cuando un agente resuelve un bug o descubre una regla de canal, no debe inflar el prompt del sistema para siempre. Debe registrar un *instinto* (`confidence: 0.8`) en `data/instincts.json`.
- **Evolución:** Si el instinto se aplica con éxito en sesiones futuras, el puntaje sube a `0.9` o `1.0`. Si falla, baja y se desactiva.
- **En Centinela:** Implementado en `tools/lib/instincts-engine.mjs` y consultable vía `npm run instincts [query]`.

[knowledge/docs/ECC_HARNESS_AND_AGENT_OPTIMIZATION_PLAYBOOK_2026.md › 📘 Playbook de Optimización del Equipo de Agentes y Arquitectura Harness (Inspirado en affaan-m/ECC 2026) › 2. Los 4 Pilares de ECC Adaptados a Centinela › Pilar 2: Verification Loop (6-Phase Verification Gate)]
Inspirado en la skill `verification-loop` de ECC:
1. **Fase 1 - Configuración:** Validación de sintaxis en `.mcp.json` y `.env`.
2. **Fase 2 - Integridad JSON:** Barrido de archivos `.json` (evitar comentarios o trailing commas no soportados).
3. **Fase 3 - TypeScript Strict:** `tsc --noEmit` en raíz y subproyectos.
4. **Fase 4 - Chequeo Sintáctico Node:** `node --check` en todos los archivos `.mjs` y `.cjs`.
5. **Fase 5 - Paridad IDE:** `tools/ts-parse-check.mjs` con el mismo compilador que resalta el panel Problems.
6. **Fase 6 - Token Budget Guard:** Auditoría de tokens de los prompts para no saturar contextos.
- **En Centinela:** Automatizado en `npm run verify` (comando unificado).

[knowledge/docs/ECC_HARNESS_AND_AGENT_OPTIMIZATION_PLAYBOOK_2026.md › 📘 Playbook de Optimización del Equipo de Agentes y Arquitectura Harness (Inspirado en affaan-m/ECC 2026) › 2. Los 4 Pilares de ECC Adaptados a Centinela › Pilar 3: Context Budget & Prompt Caching Strategy]
- **Lección Financiera:** Modelos caros (Claude 3.5 Sonnet) en clientes no optimizados como Cline reenviaron el árbol de archivos completo en cada turno, agotando el saldo en minutos.
- **La Solución Antigravity + Gemini:**
  - Gemini 3.8 Flash ofrece ventana de 1M tokens con costo por token un orden de magnitud inferior y caché contextual activa.
  - Para visión pesada: Google Vertex AI (`gemini-2.5-flash`) bajo los créditos activos de GCP.
  - Para audio: Groq LPU `whisper-large-v3-turbo` a 216× tiempo real ($0.04/hora).
  - Telemetría OTel y rastreo de presupuesto en `tools/lib/agent-tracer.mjs`.

[knowledge/docs/ECC_HARNESS_AND_AGENT_OPTIMIZATION_PLAYBOOK_2026.md › 📘 Playbook de Optimización del Equipo de Agentes y Arquitectura Harness (Inspirado en affaan-m/ECC 2026) › 2. Los 4 Pilares de ECC Adaptados a Centinela › Pilar 4: Control Autónomo del Agente vs Control HITL (DEC-035)]
Inspirado en `autonomous-agent-harness` y `operator-approval-loop` de ECC:
- **Lo que el equipo de agentes ejecuta de forma 100% autónoma:**
  1. Preflight pre-sesión (`autopilot:preflight`): validación de salud cloud, refresh de tokens Kick si expiran, escaneo de radar.
  2. Detección y clasificación de señales sensoriales (audio, OCR, chat).
  3. Formateo y particionado de datos para BigQuery (`shadow:prep`).
  4. Ejecución de benchmarks y tests de regresión (`bench`, `vitest`).
  5. Reparación de scripts y mantenimiento de la base de conocimiento (`kb-ingest`).
- **Lo que queda exclusivamente en manos de Tomás (CTO Humano HITL):**
  1. **Interruptor Soberano:** Encender o apagar el bot en la nube (`npm run bot:on` / `npm run bot:off`).
  2. **Acciones de Dinero / Wallets:** Cualquier movimiento de fondos o reclamo de premios es SIEMPRE manual.
  3. **Aprobación de Chat:** Botones interactivos en Telegram durante periodos de prueba.

---

[knowledge/docs/ECC_HARNESS_AND_AGENT_OPTIMIZATION_PLAYBOOK_2026.md › 📘 Playbook de Optimización del Equipo de Agentes y Arquitectura Harness (Inspirado en affaan-m/ECC 2026) › 3. Optimización del Oráculo Predictivo (Lecciones de ECC y FOSS) › Problema Identificado en Centinela]
En transmisiones de slots de Kick, expresiones como:
- *"Bonus buy!"*
- *"Nice roll"*
- *"Balance drop"*
provocaban picos en el Proceso de Hawkes y transiciones bayesianas en el HMM de `tools/lib/predictive/stream-oracle.mjs`, haciendo que el Oráculo predijera sorteos inexistentes.

[knowledge/docs/ECC_HARNESS_AND_AGENT_OPTIMIZATION_PLAYBOOK_2026.md › 📘 Playbook de Optimización del Equipo de Agentes y Arquitectura Harness (Inspirado en affaan-m/ECC 2026) › 3. Optimización del Oráculo Predictivo (Lecciones de ECC y FOSS) › Heurísticas de Filtrado ECC]
1. **Diferenciación entre Jerga de Juego y Jerga de Sorteo:**
   - Juego de Slots: `bonus buy`, `hunt`, `rolling`, `drop in balance`.
   - Sorteo Real: `bonus drop (código/premio)`, `giveaway`, `code drop`, `!ticket`, `!join`, `!enter`, `ruleta/wheel`.
2. **Puerta de Probabilidad Elevada:**
   - La emisión de `GIVEAWAY_IMMINENT_30S` requiere una probabilidad bayesiana $\ge 0.75$ (en lugar de $0.60$).
3. **Consignas Exclusivas:**
   - La alerta debe ir acompañada de una consigna/keyword confirmada, detección visual de ruleta o una aceleración extrema de participantes.

---

[knowledge/docs/ECC_HARNESS_AND_AGENT_OPTIMIZATION_PLAYBOOK_2026.md › 📘 Playbook de Optimización del Equipo de Agentes y Arquitectura Harness (Inspirado en affaan-m/ECC 2026) › 4. Guía de Convivencia y Operación en la VM de GCP]
1. **Naturaleza de la VM Spot:**
   - `centinela-prod-vm` está aprovisionada como SPOT/Preemptible (`e2-standard-4`) en `us-central1-a`.
   - Cuando GCP reasigna recursos o se activa el `idle-guard` tras 2 horas sin actividad, la VM se apaga (`TERMINATED`).
   - Esto es una característica de ahorro (consumo $0 en reposo), no un fallo de software.
2. **Restablecimiento del Flujo de Trabajo:**
   - Para reanudar: ejecutar `npm run bot:on` en PowerShell.
   - Enciende la VM, sincroniza el repositorio con Git y levanta PM2.
   - En una ventana separada: ejecutar `npm run bell:listen` para habilitar el receptor de campanitas locales de Windows.
   - Para apagar: `npm run bot:off`.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #architecture_and_books
