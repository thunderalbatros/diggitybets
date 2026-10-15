---
name: kb-writing
description: Higiene de escritura e ingesta en la base de conocimiento (Qdrant). Úsalo SIEMPRE antes de crear o editar cualquier documento de knowledge/, memory/ o docs/ que vaya a ser ingerido al RAG, y cuando la puerta kb:eval caiga tras una ingesta. Institucionaliza la lección LEC-015 (anclas de alcance + eval obligatoria).
---

# ✍️ KB Writing — Higiene de Ingesta al RAG

**Objetivo:** que cada documento nuevo ELEVE la puerta de calidad (Hit@5 ≥ 90 %, MRR ≥ 0,70)
en lugar de degradarla. Esta skill nace de 5 disparos reales de LEC-015 (oct-2026).

## Protocolo obligatorio antes de ingestar

1. **Ancla de alcance** en el header del doc nuevo: declara qué ES y qué NO es, con punteros
   a las fuentes canónicas de los temas que toca de refilón.
   > Ejemplo: `**Alcance:** este doc cubre X. NO es fuente de precios (ver GCP_PRICING_REFERENCE),
   > NI de cifrado de tokens (ver secops-secrets).`
   Los docs que mezclan temas (VM+precio, VM+tokens, skills+cursos) ROBAN ranking a los
   canónicos y tiran la puerta.
2. **Términos ajenos fuera**: no incluir literales de dominios ajenos (p. ej. "e2-medium"
   en un doc de hardening, "modelo primario" en un doc de arquitectura sin resolverlo).
3. **Ingesta**: `npm run kb:ingest` → confirmar la línea `LISTO` (ha crasheado en silencio).
4. **Verificación**: `npm run kb:eval` — si cae de la puerta → `kb:eval --verbose` para ver
   qué consultas fallaron y `mejor obtenido`.

## Cura de caídas (probada 5/5)

- **Doc nuevo roba ranking** → quitar del doc nuevo los términos del dominio ajeno.
- **Doc canónico desplazado u obsoleto** → ENRIQUECER el canónico con los términos exactos de
  su consulta dorada (remedio 5/5: GCP_PRICING, GIVEAWAY_STRATEGIES, lessons, secops-secrets).
- **JAMÁS** ampliar el conjunto dorado con un doc que no responda de verdad la consulta.

## Reglas de contenido

1. Si una DEC nueva contradice un doc viejo, el doc viejo se actualiza en el MISMO commit.
2. `knowledge/INDEX.md` se actualiza con cada doc nuevo (clasificación Diátaxis:
   tutorial / how-to / referencia / explicación).
3. Cero frases sintéticas conocidas en docs ("vouching for RTP") — contaminan el estilo.
