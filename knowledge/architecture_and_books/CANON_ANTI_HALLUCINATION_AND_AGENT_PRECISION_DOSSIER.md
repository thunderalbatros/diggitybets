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

# 🛡️ Dossier Maestro: Erradicación de Alucinaciones, Prevención de Overfitting y Máxima Eficiencia en el Enjambre de Agentes de Yendo

> **Propósito:** Marco arquitectónico de ingeniería para blindar al enjambre de agentes (MANAGER_AGENT + 6 Squads Especializados) contra alucinaciones y sobreajuste (*overfitting*), maximizando el rendimiento y la precisión en tres horizontes: **Desafíos Actuales de Sprint**, **Camino al MVP** y **Operaciones Post-Lanzamiento en Producción**.

---

## 🧭 1. Diagnóstico Científico del Problema

Investigaciones académicas de vanguardia (*arXiv:2509.18970 - Survey on LLM-based Agent Hallucinations*, ACM FSE 2025 y literatura de sistemas multi-agente) demuestran que los fallos de los agentes no son "errores aleatorios de lenguaje", sino defectos estructurales en el ciclo **POMDP (Partially Observable Markov Decision Process)**:

```
                  ┌─────────────────────────────────────────────────────────┐
                  │             CICLO DE FALLA EN AGENTES (POMDP)           │
                  └────────────────────────────┬────────────────────────────┘
                                               │
         ┌─────────────────────────────────────┴─────────────────────────────────────┐
         │                                                                           │
         ▼                                                                           ▼
┌─────────────────────────────────┐                         ┌─────────────────────────────────┐
│     OVERFITTING DE PROMPT       │                         │     HALLUCINATION CASCADE       │
│      (Attention Dilution)       │                         │    (Falla en Multi-Agentes)     │
├─────────────────────────────────┤                         ├─────────────────────────────────┤
│• Prompt Bloat (>4.000 tokens)   │                         │• Agente A alucina una entidad   │
│• "Lost in the Middle" en LLMs   │                         │• Agente B la toma como verdad   │
│• Instrucciones en conflicto     │                         │• Propagación exponencial de     │
│• "Re-Explanation Tax" masivo    │                         │  errores sin validar el entorno │
└─────────────────────────────────┘                         └─────────────────────────────────┘
```

1. **Overfitting de Prompt y "Re-Explanation Tax":** Llenar el system prompt de cientos de reglas y casos de esquina diluye la atención del modelo (*Attention Dilution*). En un flujo multi-paso de 10 llamadas a herramientas, reenviar 4.000 tokens de reglas quema 40.000 tokens innecesarios, ralentiza la inferencia y hace que el modelo ignore reglas críticas sepultadas en el medio.
2. **La Cascada de Alucinaciones (*Hallucination Cascade*):** En un sistema de varios agentes, si el Agente A alucina un contrato TypeScript o un endpoint de Supabase y se lo comunica al Agente B, el Agente B lo acepta como premisa fáctica, acumulando errores en cadena sin contrastar con el disco o la base de datos real.
3. **Alucinación Semántica vs. Determinismo Simbólico:** Los sistemas RAG tradicionales basados únicamente en embeddings vectoriales recuperan por "similitud difusa", no por sintaxis exacta. Esto causa que los agentes alucinen nombres de métodos o tipos que "suenan parecidos" pero no existen en el código fuente.

---

## 🧬 2. Los 4 Pilares Anti-Alucinación y Anti-Overfitting

### Pilar I: Anclaje Simbólico Determinista (LSP / AST sobre Vectores Difusos)
* **La Regla de Oro:** *Prohibido que un agente adivine o busque vectorialmente una interfaz de código.*
* **Solución:** Utilizar el **Language Server Protocol (LSP)** y el compilador de TypeScript (`npx tsc --noEmit` / AST Graph).
* Cuando un agente necesita usar una función en `src/services/`, consulta el árbol de símbolos determinista del compilador. Si un import no resuelve en el disco, el agente es bloqueado antes de proponer código al usuario.

### Pilar II: Descompresión de Contexto y "Skill Systems" (Just-In-Time Rules)
* **Eliminación del Prompt Bloat:**
  - El prompt base del agente debe ser ultra-compacto (<400 tokens): rol, invariantes fundacionales y directiva de verificación estricta.
  - **Inyección Just-In-Time (JIT):** Las reglas especializadas se cargan modularmente según el dominio del archivo editado:
    - Editando `*.worklet.ts` o animación $\rightarrow$ Se inyecta la regla de **120 FPS UI Thread**.
    - Editando SQL o migración $\rightarrow$ Se inyecta la regla de **PostGIS / GIST y RLS Zero Trust**.
    - Editando pantalla o componente $\rightarrow$ Se inyecta la regla de **Ley de Fitts ($\ge 48\text{dp}$) y Dark OLED**.

### Pilar III: Recibos Deterministas en Handoff Packets (Anti-Cascade Protocol)
* Para neutralizar la cascada de alucinaciones entre Squads:
  - Todo traspaso de tareas (*Handoff Packet*) entre el `MANAGER_AGENT` y los Squads debe incluir **recibos del entorno (Environment Receipts)**:
    - Salida literal de la terminal (`exit code 0`).
    - Rutas absolutas a archivos verificados con `view_file`.
    - Aserciones matemáticas de tests.
  - Ningún agente puede aceptar como "hecho" una afirmación en prosa de otro agente si no viene acompañada de su prueba determinista.

### Pilar IV: Squads Adversariales (Red Teaming de Calidad)
* El `QUALITY_RELIABILITY_SQUAD` no tiene el rol de "apoyar" al `CORE_ENGINEERING_SQUAD`, sino de actuar como un **adversario implacable (Red Team)**.
* Su mandato explícito es intentar romper el código: buscar desbordes del límite biológico de Dunbar (>6), condiciones de carrera en Supabase Realtime, memory leaks en Reanimated y violaciones de la Ley de Fitts.

---

## 🗺️ 3. Aplicación en los 3 Horizontes Estratégicos de Yendo

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                     ESTRATEGIA DE RENDIMIENTO EN LOS 3 HORIZONTES                        │
├──────────────────────────────────────────┬───────────────────────────────────────────────┤
│ HORIZONTE DE TIEMPO                      │ ESTRATEGIAS Y TECNOLOGÍAS ACTIVADAS           │
├──────────────────────────────────────────┼───────────────────────────────────────────────┤
│ 1. DESAFÍOS ACTUALES                     │ • JIT Context Injection (evitar prompt bloat).│
│    (Sprint Activo / Bugfixes / UI)       │ • Escaneo de guardrails (hf:guardrails).      │
│                                          │ • Grounding estricto en disco con AST/tsc.    │
├──────────────────────────────────────────┼───────────────────────────────────────────────┤
│ 2. CAMINO HACIA EL MVP                   │ • Simulación CodeAgent de Dunbar & RevPASH.   │
│    (EAS Build / Test Lab / PostGIS)      │ • Auditoría visual en CI/CD con Florence-2.   │
│                                          │ • Dual QA Firebase (físico + virtual).        │
├──────────────────────────────────────────┼───────────────────────────────────────────────┤
│ 3. OPERACIONES POST-LANZAMIENTO          │ • Self-Healing Agents vía Crashlytics S2S.    │
│    (Producción / Escala / Resiliencia)   │ • OpenTelemetry para latencia de Edge AI.     │
│                                          │ • DPO continuo con Show-Up Rate real.         │
└──────────────────────────────────────────┴───────────────────────────────────────────────┘
```

### Horizonte 1: Desafíos Actuales (Sprint 2/3 - Desarrollo y Refactor)
1. **Sniper Mode Estricto:** En tareas puntuales de bugfix o refactor, saltar la lectura de biblias de 50.000 palabras; operar con precisión quirúrgica sobre los archivos afectados.
2. **Pre-flight Automatizado:** Ejecutar `npm run hf:guardrails` antes de proponer código para asegurar que no se introduzcan librerías prohibidas o términos vetados ("Mesa", "Bar").

### Horizonte 2: Camino Hacia el MVP (Estabilidad, Concurrencia y Test Lab)
1. **Auditoría Visual en CI con Florence-2 (`npm run hf:visual`):** Bloquear automáticamente cualquier PR que renderice botones menores a 48dp o viole el contraste Dark OLED `#121212`.
2. **Validación Matemática de Invariantes (`npm run hf:invariants`):** Ejecutar 250 simulaciones continuas del llenado de grupos Dunbar para garantizar que ningún grupo supere 6 miembros y se clone en el milisegundo exacto.
3. **Dual QA Firebase:** Despliegue en Firebase Test Lab sobre dispositivos físicos reales (`npm run testlab:auto`), contrastando logs reales de Android/iOS para neutralizar falsos positivos del emulador.

### Horizonte 3: Despliegue en Producción (Observabilidad, Escala y Auto-Sanación)
1. **Pipeline de Auto-Sanación (*Autonomous Self-Healing*):**
   - Cuando un usuario experimente un crash en producción, Firebase Crashlytics enviará el stack trace al webhook del sistema.
   - El sistema generará automáticamente un ticket en `.knowledge/qa_feedbacks/`.
   - Un CodeAgent generará un test de reproducción Maestro, aislará la causa raíz, aplicará el parche en `src/`, verificará `npx tsc --noEmit` y solicitará aprobación HITL antes del despliegue OTA (*Over-The-Air*).
2. **Alineación Continua DPO con Datos del Mundo Real:**
   - Calibrar los modelos de emparejamiento de actividades usando el **Show-Up Rate real** en los Terceros Lugares de CABA, optimizando la liquidez social presencial sin alucinaciones de mercado.

---

## Relaciones de Contexto
- [[YENDO_LIBRARY]]
- [[YENDO_DNA]]
- [[Hugging_Face_AI_Ecosystem_Mobile_Optimization]]
- [[Hugging_Face_Advanced_Agent_Architecture_Evaluation]]
- [[018_on_device_edge_ai_executorch.spec]]
- [[Guia_Maestra_Herramientas_Hugging_Face_Yendo]]
- [[CYBERSECURITY_MASTER_PROTOCOL]]
- [[IA_AGENTICA_ORQUESTACION]]
- [[DESIGN_SYSTEM_MAP]]
- [[Número de Dunbar]]
- [[Terceros Lugares]]
- [[PostGIS]]
- [[Supabase]]
- [[Reanimated]]
