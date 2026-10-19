> **Alcance:** Literatura canónica de arquitectura de software, código limpio, TypeScript, validación en el Edge, sistemas distribuidos, videocursos técnicos e ingeniería de agentes IA para la Software Factory Web.

---
version: 1.0.0
tipo: research
tags:
  - yendo-devops
  - architecture
  - en-progreso
autores: [RESEARCHER_AGENT, MANAGER_AGENT]
ultima_revision: 2026-08-27
---

# 🛡️ Validación en Runtime: El Paradigma Valibot (Zero-Bundle-Size)

## El Dilema Zod vs Type Guards Manuales

Históricamente en Yendo Mobile, prohibimos el uso de `zod` dentro de `src/` debido a su naturaleza monolítica orientada a métodos encadenados (`z.object().string()`). El empaquetador Metro no puede hacer *tree-shaking* de clases monolíticas, lo que forzaba la descarga de ~60KB de código en el bundle, penalizando el **Time to Interactive (TTI)** en dispositivos Android de gama baja a través de bloqueos en el motor Hermes.

Como contrapartida, se adoptó la práctica de crear **Type Guards Nativos** (ej. `function isEvent(data: unknown): data is Event`).

### La Falacia del "Cero Bytes" y el AST Bloat

Una auditoría forense arquitectónica (basada en *Effective TypeScript* de Dan Vanderkam y análisis de Matt Pocock) demostró que los Type Guards manuales son una **falsa economía**:
1. **Costo AST (Abstract Syntax Tree):** Escribir comprobaciones manuales (`typeof data.id === 'string' && ...`) a lo largo de 50 modelos de datos complejos genera más *boiler-plate* de JavaScript compilado que una librería optimizada. Hermes debe descargar, parsear y ejecutar miles de condicionales.
2. **Deuda Técnica Silenciosa (Item 51):** Si Supabase muta, un Type Guard manual no falla en compilación; se convierte en una trampa silenciosa en tiempo de ejecución.
3. **Mantenibilidad:** El código imperativo de comprobación es propenso al error humano.

## La Solución SOTA: Valibot

Para resolver la fricción entre la **Seguridad de Tipos** (Item 3 de Effective TS) y el **Rendimiento Móvil**, Yendo adopta oficialmente **Valibot** como el estándar de validación en la frontera de red.

### Arquitectura de Valibot
A diferencia de Zod, Valibot invierte el patrón utilizando **funciones puras independientes** (`object()`, `string()`, `parse()`). Si una pantalla solo valida un string, Metro Bundler empaca exactamente esas dos funciones descartando el resto del código (Tree-Shaking perfecto).
- **Zod:** ~53-60KB (Minified + Gzipped)
- **Valibot:** ~1KB a 3KB (según las importaciones)

### Implementación Canónica

```typescript
// ✅ SOTA Yendo Patern: Valibot para Boundary Validation
import { object, string, number, parse, InferOutput } from 'valibot';

const EventSchema = object({
  id: string(),
  title: string(),
  quorum: number()
});

export type EventWithDetails = InferOutput<typeof EventSchema>;

export async function fetchEvent(id: string): Promise<EventWithDetails> {
  const { data, error } = await supabase.from('eventos').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  
  // Falla ruidosa e inmediata si el contrato de base de datos se rompió
  return parse(EventSchema, data); 
}
```

---

## Relaciones de Contexto
- [[OSS_WHITELIST_REGISTRY]]
- [[YENDO_DNA]]
- [[CORE_ENGINEERING_SQUAD]]
- [[Supabase]]
- [[Hermes]]
- [[YENDO_LIBRARY]]
