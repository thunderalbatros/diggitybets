---
name: kb-retrieval
description: "Cómo consultar y mantener el cerebro híbrido Supercharged Omni-RAG v5 (SQLite FTS5 en C + MiniSearch + IDF/LightRAG Dual-Level +."
---

# Knowledge Base — Supercharged Omni-RAG v5 (Software Factory Brain)

**Objetivo:** el agente no adivina, **recupera**. Contexto justo a tiempo (Factor 3).

## Arquitectura Híbrida de 6 Motores (`tools/intelligence/rag_pipeline.mjs`)

| Componente | Tecnología | Cobertura y Latencia |
|------------|------------|----------------------|
| **Engine A1 (C-Compiled BM25)** | `node:sqlite` (`DatabaseSync` `FTS5` con `porter unicode61 remove_diacritics 2`) | **100% de los ~21.580 fragmentos** (52 libros completos, 128 cursos, +150 tratados) en `.cache/omni_rag_fts5.sqlite` (`< 3 ms`) |
| **Engine A2 (Fuzzy Lexical)** | `MiniSearch` (Levenshtein `fuzzy: 0.15` + prefijos) | Tolerancia a errores tipográficos en tratados, vaults y skills (`< 8 ms`) |
| **Engine B (Exact IDF + LightRAG)** | Single-Pass Bitmask Robertson-Sparck Jones $\text{IDF}(t)$ + LightRAG Dual-Level (Entidades + Temas Bilingües ES/EN) | Ponderación matemática de términos técnicos raros + expansión bilingüe instantánea (`< 12 ms`) |
| **Engine C (Squad Router + WikiGraph CRAG)** | `squad_semantic_router.mjs` + `code_and_wiki_graph.mjs` (PageRank $d=0.85$ sobre `455` notas y `972` `[[wikilinks]]`) | Enrutamiento automático a los 5 Squads Web + expansión de 1 salto en el grafo de Obsidian (`< 2 ms`) |
| **Engine D (AST CodeGraph PageRank)** | `code_and_wiki_graph.mjs` (`107` archivos JS/TS/MJS y `135` aristas de llamadas/endpoints `/api/*`) | Mapa estructural instantáneo de clases, métodos, singletons `window.*` y rutas backend (`< 2 ms`) |
| **Engine E (Neural Reranker & Cloud MCP)** | `@huggingface/transformers` (`Xenova/ms-marco-MiniLM-L-6-v2` Q8 en CPU) + `Qdrant Cloud` + `Context7 MCP` | Reordenamiento neuronal (`--rerank`, **$0**) + documentación viva por versión (`context7`) |

## Uso por CLI y MCP (`hunthub-omni-rag` & `context7`)

```bash
# Reconstruir índice completo (JSON + SQLite FTS5 + AST CodeGraph + Obsidian WikiGraph PageRank)
node tools/intelligence/rag_pipeline.mjs --rebuild

# Consultar fragmentos relevantes con enrutamiento automático por Squad (<25ms)
node tools/intelligence/rag_pipeline.mjs --query "arquitectura rag lightrag sqlite fts5" 5

# Consultar con Reranking Neural Cross-Encoder ONNX Q8 en CPU ($0)
node tools/intelligence/rag_pipeline.mjs --query "emil kowalski modal entrance scale" 5 --rerank

# Consultar el Grafo AST de Código + PageRank (clases, métodos, endpoints /api/* y dependientes)
node tools/intelligence/rag_pipeline.mjs --code-graph "overlay-server"

# Consultar y sintetizar respuesta experta (Vertex AI Gemini 2.5 Flash / Groq LPU)
node tools/intelligence/rag_pipeline.mjs --ask "¿Cómo funciona el sistema de Bountys Only on Stake y cómo se verifica el bet_id?"

# Ejecutar Matriz de Evaluación Multi-Dimensional (18 Consultas Doradas + AST + Budgets + Compliance)
node tools/intelligence/eval_matrix.mjs
```

### Puerta de Calidad No Negociable (`tools/intelligence/eval_matrix.mjs`)

| Métrica | Umbral Mínimo | Actual (Omni-RAG v5) |
|---------|---------------|----------------------|
| **Hit@5** | $\ge 90\%$ | **100.0 %** (18/18 consultas doradas bilingües) |
| **MRR** | $\ge 0.75$ | **$\ge 0.88$** |
| **Latencia por consulta** | $< 350\text{ ms}$ | **$\sim 18\text{ ms}$** |
| **Coste** | **$0.00** | **$0.00** |

Si un cambio baja el `Hit@5` por debajo de $90\%$, **se revierte**.

### Protocolo de Ingesta (LEC-015)

1. Todo documento nuevo en `knowledge/` debe incluir el encabezado explícito `**Alcance:** ...` en las primeras líneas y registrarse en `knowledge/INDEX.md`.
2. Para ingerir libros PDF o EPUB nuevos sin truncamiento:
   ```bash
   node tools/intelligence/book_pdf_ingester.mjs "<ruta-pdf-o-epub>" "<slug_destino>" "<subcarpeta>"
   ```
3. Tras cada ingesta, ejecutar `node tools/intelligence/rag_pipeline.mjs --rebuild` (que también actualiza automáticamente los `[[wikilinks]]` de Obsidian y el grafo PageRank) y verificar `node tools/intelligence/eval_matrix.mjs`.
