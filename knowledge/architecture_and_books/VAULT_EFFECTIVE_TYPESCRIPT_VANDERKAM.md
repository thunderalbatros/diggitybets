**Alcance:** Síntesis de Effective TypeScript (Dan Vanderkam): inferencia de tipos, uniones discriminadas, tipos de marca (Branded Types) y seguridad en runtime. (Fuente migrada y curada desde Yendo Mobile Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

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

# 🛡️ Tratado Canónico: TypeScript Seguro, Tipado Estructural y Límites de Validación
### Basado en: *Effective TypeScript: 62 Specific Ways to Improve Your TypeScript* (Dan Vanderkam) & *Programming TypeScript* (Boris Cherny)
**Autores:** Dan Vanderkam & Boris Cherny (O'Reilly Media)
**Archivos Fuente:** `unsorted/dokumen.pub_effective-typescript-62-specific-ways-to-improve-your-typescript-1nbsped-9781492053712-1492053716.pdf` (278 páginas) y `unsorted/Programming TypeScript - Boris Cherny - O’Reilly (2019).pdf` (324 páginas)

---

## 1. La Filosofía del Tipado Estructural (Duck Typing Seguro)

A diferencia de lenguajes como Java o C# donde el tipado es nominal, TypeScript opera bajo un sistema de **Tipado Estructural**: un valor es compatible con un tipo si posee al menos todas las propiedades requeridas por dicho tipo, independientemente de su nombre de clase o herencia.

Vanderkam y Cherny advierten sobre las dos caras de esta moneda:
1. **Flexibilidad:** Permite componer objetos y desacoplar módulos fácilmente.
2. **Peligro de Exceso de Propiedades (Excess Property Checks):** En tiempo de ejecución (runtime), los tipos de TypeScript se evaporan por completo. Si una API externa o un payload de Supabase devuelve campos malformados o nulos, TypeScript no protegerá a la aplicación en ejecución a menos que exista un **Guardia de Límite (Boundary Validation)**.

---

## 2. Los Mandamientos Innegociables de TypeScript para Yendo Mobile

### 1. Política Estricta de "Cero `any`" (Zero Any Policy)
- El uso de `any` silencia el compilador y propaga la ignorancia de tipos como un virus por todo el codebase.
- Si un tipo es desconocido (ej: payload entrante de una red externa), debe tiparse como `unknown` y estrecharse (narrowing) con funciones Type Guard (`typeof`, `instanceof` o esquemas Valibot).

### 2. Uniones Discriminadas (Discriminated Unions) para Estados de UI
En Web UI / Vanilla & Modern Frontend, el estado de una petición asíncrona nunca debe modelarse con booleanos independientes (`isLoading: boolean, isError: boolean, data: Venue | null`), ya que permite estados imposibles e incoherentes (`isLoading === true` y `data !== null` a la vez).

**El Patrón Canónico en Yendo:**
```typescript
export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
```

### 3. Exhaustividad en Switches (`assertNever`)
Cuando se manejan enums o tipos discriminados, el compilador debe garantizar en tiempo de compilación que todos los casos fueron cubiertos:
```typescript
export function assertNever(x: never): never {
  throw new Error(`Caso inesperado no contemplado: ${JSON.stringify(x)}`);
}
```

### 4. Validación de Límites en Runtime con Valibot
TypeScript garantiza seguridad de tipos en tiempo de compilación; **Valibot garantiza seguridad en runtime con costo de bundle mínimo (<1KB)**.
Toda respuesta de API, llamada RPC de Supabase o input de usuario debe parsearse con un esquema antes de ingresar a la capa de store (Zustand):
```typescript
import * as v from 'valibot';

export const VenueSchema = v.object({
  id: v.string(),
  name: v.string(),
  latitude: v.pipe(v.number(), v.minValue(-90), v.maxValue(90)),
  longitude: v.pipe(v.number(), v.minValue(-180), v.maxValue(180)),
  capacity: v.pipe(v.number(), v.integer(), v.minValue(1)),
});

export type Venue = v.InferOutput<typeof VenueSchema>;
```

---

## 3. Arquitectura Limpia de 3 Capas en Yendo

1. **Capa de Infraestructura y Servicios (`src/services/`):** Realiza llamadas HTTP / Supabase, maneja timeouts (8000ms) y ejecuta la validación de frontera con Valibot.
2. **Capa de Dominio y Estado (`src/store/` & `src/hooks/`):** Zustand almacena entidades normalizadas e inmutables; los custom hooks exponen contratos limpios.
3. **Capa de Presentación (`src/components/` & `app/`):** Componentes visuales puros (<150 líneas) sin lógica de red mezclada, con props estrictamente tipadas.

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[Zustand]]
- [[Supabase]]
- [[Database_Bootstrap_Dossier]]
- [[OSS_WHITELIST_REGISTRY]]
