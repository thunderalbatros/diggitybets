---
name: provider-fallback
description: "Patrón de resiliencia multi-proveedor para IA, OCR y embeddings."
---

# Provider Fallback — Resiliencia por Capas

## Principio

Ningún componente puede depender de un único proveedor. Toda integración externa declara:
**primario ($0) → fallback 1 → fallback 2**.

## Cadenas canónicas

| Capacidad | Primario (gratis) | Fallback 1 | Fallback 2 |
|-----------|-------------------|-----------|-----------|
| Texto / reacciones | Groq `gpt-oss-20b` ($0) | Gemini 2.5 flash-lite | OpenRouter |
| OCR de slot | Tesseract.js (local) | Gemini Vision (si confianza < 60%) | — |
| Embeddings | `@huggingface/transformers` (local) | Vertex `text-embedding-004` | — |
| Audio → texto | faster-whisper tiny + Silero VAD | Muestreo 1 de cada 2 clips | — |

## Implementación

```typescript
async function withFallback<T>(
  primary: () => Promise<T>,
  fallback: () => Promise<T>,
  shouldFallback: (error: unknown) => boolean
): Promise<{ result: T; provider: string; fallbackUsed: boolean }> {
  try {
    return { result: await primary(), provider: "primary", fallbackUsed: false };
  } catch (error) {
    if (!shouldFallback(error)) throw error;
    return { result: await fallback(), provider: "fallback", fallbackUsed: true };
  }
}
```

## Reglas

1. **Valida la salida con Zod** antes de aceptarla, venga de donde venga.
2. Registra SIEMPRE `provider` y `fallbackUsed` → sin métricas no hay diagnóstico.
3. El fallback de OCR sólo se activa con criterio objetivo (confianza < 60%, timeout > 5 s).
4. **Presupuesto Vertex AI:** $10/mes con corte duro al 80%.
5. Nunca un fallback de pago sin alerta de presupuesto asociada.

## Anti-alucinación (audio)

- VAD gating + umbral `no_speech` + filtro de logprobs evita bucles del tipo
  *"thank you for watching"* que Whisper alucina en silencio.
- Solo se transcribe cuando hay habla real (>30 % del clip).
