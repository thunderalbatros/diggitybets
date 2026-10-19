---
name: kb-retrieval
description: Cómo consultar y mantener el cerebro híbrido Supercharged Omni-RAG v4 (SQLite FTS5 en C + MiniSearch + IDF/LightRAG Dual-Level + ONNX Q8 Cross-Encoder + Qdrant Cloud). Úsalo cuando necesites documentación técnica oficial, libros completos, masterclasses, decisiones arquitectónicas previas o lecciones aprendidas en lugar de adivinar; y cuando quieras añadir conocimiento nuevo.
---

# Knowledge Base — Supercharged Omni-RAG v4 Retrieval

**Objetivo:** el agente no adivina, **recupera**. Contexto justo a tiempo (Factor 3).

## Arquitectura Híbrida Cuádruple (`tools/intelligence/rag_pipeline.mjs`)

| Componente | Tecnología | Cobertura y Latencia |
|------------|------------|----------------------|
| **Engine A1 (C-Compiled BM25)** | `node:sqlite` (`DatabaseSync` `FTS5` con `porter unicode61 remove_diacritics 2`) | **100% de los ~19.550 fragmentos** (52 libros completos, 16 cursos, +80 tratados) en `.cache/omni_rag_fts5.sqlite` (`< 3 ms`) |
| **Engine A2 (Fuzzy Lexical)** | `MiniSearch` (Levenshtein `fuzzy: 0.15` + prefijos) | Tolerancia a errores tipográficos en tratados, vaults y skills (`< 8 ms`) |
| **Engine B (Exact IDF + LightRAG)** | Single-Pass Bitmask Robertson-Sparck Jones $\text{IDF}(t)$ + LightRAG Dual-Level (Entidades + Temas Bilingües ES/EN) | Ponderación matemática de términos técnicos raros + expansión bilingüe instantánea (`< 12 ms`) |
| **Engine C (Cloud Vector/Hybrid)** | Qdrant Cloud (`centinela_knowledge`) + Corrective RAG (Serper Web Search Fallback) | Timeout estricto `2500 ms` + sanitización anti-Prompt Injection |
| **Engine D (Neural Reranker Opcional)** | `@huggingface/transformers` (`Xenova/ms-marco-MiniLM-L-6-v2` Q8 en CPU) | Reordenamiento de precisión cruzada (`--rerank` / `useOnnxRerank: true`, coste **$0**) |
| **Fusión y Diversidad** | Reciprocal Rank Fusion ($\text{RRF}, k=60$) + `maxPerFile = 2` | Evita que un libro de 600 páginas monopolice el Top-5 |

## Uso por CLI

```bash
# Reconstruir índice completo (JSON + SQLite FTS5 C-Engine)
node tools/intelligence/rag_pipeline.mjs --rebuild

# Consultar fragmentos relevantes (modo ultra-rápido local <25ms)
node tools/intelligence/rag_pipeline.mjs --query "arquitectura rag lightrag sqlite fts5" 5

# Consultar con Reranking Neural Cross-Encoder ONNX Q8 en CPU ($0)
node tools/intelligence/rag_pipeline.mjs --query "emil kowalski modal entrance scale" 5 --rerank

# Consultar y sintetizar respuesta experta (Vertex AI Gemini 2.5 Flash / Groq LPU)
node tools/intelligence/rag_pipeline.mjs --ask "¿Cómo funciona el sistema de Bountys Only on Stake y cómo se verifica el bet_id?"

# Ejecutar Matriz de Evaluación Multi-Dimensional (17 Consultas Doradas + AST + Budgets + Compliance)
node tools/intelligence/eval_matrix.mjs
```

### Puerta de Calidad No Negociable (`tools/intelligence/eval_matrix.mjs`)

| Métrica | Umbral Mínimo | Actual (Omni-RAG v4) |
|---------|---------------|----------------------|
| **Hit@5** | $\ge 90\%$ | **100.0 %** (17/17 consultas doradas bilingües) |
| **MRR** | $\ge 0.75$ | **$\ge 0.90$** |
| **Latencia por consulta** | $< 350\text{ ms}$ | **$\sim 18\text{ ms}$** |
| **Coste** | **$0.00** | **$0.00** |

Si un cambio baja el `Hit@5` por debajo de $90\%$, **se revierte**.

### Protocolo de Ingesta (LEC-015)

1. Todo documento nuevo en `knowledge/` debe incluir el encabezado explícito `**Alcance:** ...` en las primeras líneas y registrarse en `knowledge/INDEX.md`.
2. Para ingerir libros PDF o EPUB nuevos sin truncamiento:
   ```bash
   node tools/intelligence/book_pdf_ingester.mjs "<ruta-pdf-o-epub>" "<slug_destino>" "<subcarpeta>"
   ```
3. Tras cada ingesta, ejecutar `node tools/intelligence/rag_pipeline.mjs --rebuild` y verificar `node tools/intelligence/eval_matrix.mjs`.
