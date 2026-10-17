---
name: finops-context-budget
description: Disciplina de presupuesto de contexto y coste para el equipo de desarrollo web de HuntHub. Úsalo antes de leer archivos, lanzar agentes o llamar a un LLM. Aplica cuando la tarea requiera explorar el repositorio, inyectar documentación o elegir modelo.
---

# FinOps — Presupuesto de Contexto y Coste

**Restricción dura:** $170 USD de créditos GCP. Objetivo $4.65/mes → ~36 meses de runway.
Cada token y cada MB de RAM cuentan.

## Las 5 reglas

1. **Search First.** `grep`/búsqueda ANTES de leer. Nunca leer a ciegas.
2. **Window Budget.** Máx 3 archivos completos por turno. Archivos > 500 líneas → por rangos.
3. **Just-in-time context.** RAG (Qdrant) inyecta SOLO el fragmento relevante, no el corpus.
4. **Compact Errors.** Compacta la salida de errores antes de inyectarla al contexto.
5. **Medir, no estimar.** Todo número de coste/recursos se mide con datos reales.

## Enrutamiento de modelos (más barato que funcione primero)

**Modelo primario gratuito:** Groq `gpt-oss-20b` (free tier, 250K TPM, 1000 t/s).
Si falla por rate-limit o calidad insuficiente → fallback automático a Gemini 2.5 flash-lite.

| Tarea | Modelo primario (gratuito) | Fallback (pago) | Coste |
|-------|---------------------------|-----------------|-------|
| Sintaxis/typos/refactor | **Groq `gpt-oss-20b`** (primario, $0) | Gemini 2.5 flash-lite | $0 (free tier) |
| Razonamiento / copy | **Groq `gpt-oss-20b`** (primario, $0) | Gemini 2.5 flash-lite (Vertex) | ~$0.00007 |
| Arquitectura crítica | OpenRouter (Claude/DeepSeek) | — | ~$0.01 |
| OCR | Tesseract.js local | Gemini Vision si confianza < 60% | $0 primario |
| Embeddings | `@huggingface/transformers` local | — | $0 |
| Audio→texto | faster-whisper tiny local + Silero VAD | — | $0 |

## Prohibiciones

- ❌ Enviar **audio crudo** a Gemini ($14–65/mes vs $2.60/mes con texto).
- ❌ Cargar el knowledge base completo en el prompt → usar Qdrant.
- ❌ Regenerar embeddings si no cambió el documento (upsert idempotente).
- ❌ Dependencias de pago (Pinecone $70/mes, OpenAI API).

## Regla anti-overfitting

Si un agente falla **2 veces consecutivas** en la misma tarea → sube al siguiente tier de
modelo. No rigidizar: si una tarea "simple" necesita 5 archivos, permíteselo.
