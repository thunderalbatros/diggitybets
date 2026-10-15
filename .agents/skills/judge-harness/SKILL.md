---
name: judge-harness
description: Harness del Juez Ciego de Humanidad (FairEval + promptfoo) de Centinela. Úsalo al construir, ejecutar o interpretar el juez que compara mensajes del bot vs de Tomás (¿puede un juez LLM distinguirlos?), al calibrar la rúbrica de estilo, y al leer la métrica de humanidad del benchmark.
---

# ⚖️ Judge Harness — Juez Ciego de Humanidad (FairEval)

**Objetivo:** convertir "el bot suena humano" en un número medible y con puerta de regresión.
Protocolo: Jones & Bergen (arXiv:2503.23674 — persona 73 % vs 36 % sin persona) + FairEval
(Wang 2023, arXiv:2305.17926 — juzgar en AMBOS órdenes + abstención; sin mitigar, solo 72,5 %
de veredictos son consistentes).

## Protocolo de ejecución

1. **Episodios de reserva**: del harvest (`data/training/human_demonstrations.jsonl`) tomar
   episodios que NO se usaron para few-shot (fuga de datos = métrica inflada).
2. **Candidatos**: generar la respuesta del bot con el MISMO contexto t=0 (sin ver la real),
   vía motor few-shot (kNN+MMR) + DNA.
3. **Juicio FairEval**: juez LLM (Groq gpt-oss-120b, distinto del generador) compara A vs B,
   **en ambos órdenes**; veredicto válido solo si es consistente; si no → EMPATE (abstención).
4. **Métrica**: % de episodios donde el juez NO distingue al bot. 50 % = azar (clon perfecto
   al nivel del juez); >70 % de distinción = el bot suena a bot. Récord humano-juzgado: 73 %.
5. **Registrar** en `data/sessions/judge-*.json` y como métrica de `npm run bench`.

## Implementación

- `npm run judge` → `tools/judge-humanity.mjs` (script, sin tocar el runtime del bot).
- Harness declarativo: `tests/prompts/` con promptfoo (`llm-rubric`, `select-best`).
- Sesgos vigilados: posición (mitigado con swap), verbosidad (la rúbrica penaliza párrafos —
  el vicio que el bot debe evitar), auto-preferencia (juez ≠ familia del generador).

## Reglas

1. Nunca optimizar el bot contra el juez en loop cerrado sin episodios nuevos (overfitting al juez).
2. Con <50 demostraciones de reserva, el resultado NO es estadístico: reportarlo como
   `insufficient_data` (el script lo hace solo).
3. Toda mejora de humanidad se mide ANTES/DESPUÉS con este harness (protocolo DEC-024).
