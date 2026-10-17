---
name: kb-retrieval
description: Cómo consultar y mantener la base de conocimiento vectorial de HuntHub en Qdrant. Úsalo cuando necesites documentación técnica oficial, benchmarks, decisiones arquitectónicas previas o lecciones aprendidas en lugar de adivinar; y cuando quieras añadir conocimiento nuevo.
---

# Knowledge Base — Retrieval sobre Qdrant

**Objetivo:** el agente no adivina, **recupera**. Contexto justo a tiempo (Factor 3).

## Arquitectura

| Elemento | Valor |
|----------|-------|
| Vector DB | Qdrant Cloud (free tier) |
| Colección Principal | `hunthub_knowledge` / `centinela_knowledge` |
| Modelo de embeddings | `Xenova/paraphrase-multilingual-MiniLM-L12-v2` |
| Dimensiones | **384**, distancia Cosine |
| Coste | **$0** (modelo local en CPU, sin API) |
| Fuentes ingeridas | `knowledge/`, `memory/`, `agents/`, `docs/` |

## Uso

```bash
npm run kb:probe     # ¿Qdrant responde? ¿embeddings cargan?
npm run kb:ingest    # ingesta incremental (upsert idempotente, sin duplicados)
npm run kb:ingest -- --dry-run   # analiza chunking sin escribir
npm run kb:ingest -- --only knowledge   # solo una fuente
npm run kb:eval      # BENCHMARK: Hit@k + MRR (puerta de calidad)
```

## Pipeline de dos etapas (DEC-011)

```
consulta → [1] densos locales, top-20   →   [2] cross-encoder reranker → top-5
```

| Etapa | Modelo | Latencia medible |
|-------|--------|------------------|
| 1 · Recall | `paraphrase-multilingual-MiniLM-L12-v2` (384-dim) | ~250 ms |
| 2 · Precision | `ms-marco-MiniLM-L-6-v2` (cross-encoder) | ~930 ms |

**Modos disponibles** (`tools/kb-search.mjs`): `dense` (línea base) · `rerank` (por defecto) ·
`hybrid-rerank` (denso + BM25 sparse + fusión RRF — evalúa igual que rerank a 2026-10-04;
la pata sparse de token exacto es la mejora pendiente que mata los fallos léxicos).

### Puerta de calidad (no negociable)

| Métrica | Umbral | Actual (2026-10-04) |
|---------|--------|--------|
| Hit@5 | ≥ 90 % | **100.0 %** (25/25 consultas doradas) |
| MRR | ≥ 0.70 | **0.885** (récord histórico) |
| Coste | $0.00 | $0.00 |

Si un cambio baja el Hit@5 por debajo de 90 %, **se revierte**.

### Protocolo de ingesta (LEC-015, battle-tested ×5)

1. Todo doc nuevo que CRUCE temas lleva un **ancla de alcance** ("NO es fuente de X, ver Y")
   ANTES de ingestar — los docs que mezclan temas roban ranking a los canónicos.
2. Tras CADA `kb:ingest` se corre `kb:eval`; si cae de la puerta → diagnosticar con
   `kb:eval --verbose` y curar.
3. **Cura duradera**: si un doc canónico es viejo, enriquecerlo con los términos exactos de su
   consulta dorada (remedio probado 5/5: GCP_PRICING, GIVEAWAY_STRATEGIES, lessons, secops-secrets).
4. Confirmar siempre la línea `LISTO` del ingest (ha crasheado en silencio una vez).

## Diseño del chunking

- Troceo **consciente de encabezados** (`##`, `###`) → mejor precisión.
- Solape de 200 chars cuando un chunk excede 1400 chars.
- El contexto va **dentro** del texto embebido:
  `[ruta/archivo.md › Encabezado › Subencabezado]` + contenido.
- El frontmatter YAML se descarta (metadatos que ensucian el embedding).
- IDs deterministas (`hash(source::index)`) → reingesta sin duplicar.

## Reglas de uso

1. **Recupera antes de escribir**: si existe una decisión vinculante en `memory/decisions.md`,
   está en la colección. Consúltala antes de contradecirla.
2. **No inyectes el corpus completo** en el prompt: 3–5 fragmentos bastan.
3. Filtra por `source` o `project` en la búsqueda para acotar el dominio.
4. Toda decisión nueva se documenta en `memory/decisions.md` **y se reingesta**.
5. Nunca cambies el modelo de embeddings sin reingestar todo con `--reset`
   (dimensiones incompatibles rompen la colección).
