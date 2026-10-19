---
name: self-evolving-factory
description: Operates the Gate-Governed Self-Evolving Web Software Factory loop, including the SHA-256 Immutable Constitution Guard, Speculative RAG + Vertex AI Context Caching, TextGrad / DSPy Skill Optimizer, SkillSmith Surrogate Verifier in Sandcastle worktrees, and the Autonomous Tech Scout Agent.
---

# 🧬 Self-Evolving Web Software Factory — Protocolo de Auto-Evolución Gobernada

**Alcance:** Gobierna el ciclo de mejora continua autónoma del equipo de agentes (`Squad 9 — Meta-Evolution, Knowledge & FinOps`) en `tools/intelligence/`.

## 1. Separación entre Tronco Encefálico Inmutable y Corteza Evolutiva

1. **Tronco Encefálico Inmutable (*Prohibido Modificar por Agentes*)**:
   - `AGENTS.md`, `CONSTRAINTS.md`, `tools/intelligence/constitution_guard.mjs`, y los pisos numéricos de `tools/intelligence/eval_matrix.mjs` (`RAG Hit@5 >= 95%`, `AST == 100`, `Compliance == 100`, `Dist <= 50 MB`).
   - Protegido mediante firmas criptográficas `SHA-256` verificadas antes y después de cada ciclo evolutivo.
2. **Corteza Auto-Evolutiva (*Mejorada Continuamente por los Agentes*)**:
   - Heurísticas e instintos en `.agents/memory/temporal_ledger.json` (`0.50 -> 0.99`).
   - Paquetes de habilidades en `.agents/skills/<skill-name>/SKILL.md`.
   - Tratados y referencias técnicas en `knowledge/` (siempre bajo protocolo `kb-writing` / `LEC-015`).

## 2. Los 4 Motores del Bucle `factory:evolve`

1. **Speculative RAG + Vertex AI Context Caching (`vertex_ai_bridge.mjs`)**:
   - Fija el Canon Base en la KV-Cache de `gemini-2.5-flash` (`ai.caches.create`, TTL `3600s`) para lograr `<200ms` TTFT y 75–90% de ahorro de tokens.
   - Sintetiza respuestas complejas mediante $M=3$ *Drafters* paralelos y 1 *Verifier* con puntuación de fidelidad (*Faithfulness*).
2. **Gradientes Textuales (`TextGrad` / `DSPy MIPROv2`)**:
   - Cuando una auditoría detecta un defecto o advertencia recurrente, calcula el gradiente textual ($\nabla_{\text{text}} L$): identifica qué ambigüedad en un `SKILL.md` permitió el error y redacta una regla preventiva explícita.
3. **Verificador Sustituto (*SkillSmith Surrogate Verifier*)**:
   - Toda mutación en un `SKILL.md` o nuevo documento en `knowledge/` se valida ejecutando `rag_pipeline.mjs --rebuild` y `eval_matrix.mjs`. Si el puntaje global cae o se rompe alguna Golden Query, el cambio se revierte automáticamente (*Atomic Rollback*).
4. **Explorador Ambiental (*Tech Scout Agent*)**:
   - Vigila nuevas librerías open-source, especificaciones CSS/W3C/WebGPU y actualizaciones de Cloudflare/Kick aplicando el **Filtro Triple** (`USD 0`, licencia `MIT/Apache-2.0/BSD`, `<= 5% OBS CPU`).
