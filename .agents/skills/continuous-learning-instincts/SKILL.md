---
name: continuous-learning-instincts
description: "Sistema de memoria continua e instintos operacionales inspirado en affaan-m/ECC (Continuous Learning v2)."
---

# 🧬 SKILL: Aprendizaje Continuo e Instintos Operacionales (ECC Pattern)

> **Inspirado en:** `affaan-m/ECC` (Continuous Learning v2)  
> **Propósito:** Dotar al equipo de agentes de reflejos de ingeniería automáticos y persistentes, evitando que cometan los mismos errores o redescubran soluciones ya resueltas.

---

## 1. ¿Qué es un Instinto Operacional?

Un **Instinto** es una regla de ingeniería comprobada empíricamente, estructurada con:
- `id`: Identificador único (ej: `INS-001`).
- `domain`: Área técnica (`concurrency`, `networking`, `auth`, `anti-ban`, `runtime-memory`, etc.).
- `trigger`: El error, síntoma o contexto que dispara la regla.
- `action`: La solución precisa y patrón de código a aplicar.
- `confidence`: Puntuación de certeza matemática (de 0.0 a 1.0).
- `evidence`: El incidente o prueba de concepto que demostró su efectividad.

Todos los instintos residen de forma compacta en `memory/instincts.json` y son gestionados mediante `tools/lib/instincts-engine.mjs`.

---

## 2. Flujo Operativo para Agentes

### Paso 1: Búsqueda de Instintos (Al comenzar cualquier tarea o error)
Antes de proponer hipótesis o modificar código ante un síntoma:
```javascript
import { queryInstincts, formatInstinctsForPrompt } from './tools/lib/instincts-engine.mjs';

// Buscar instintos relevantes
const matches = queryInstincts('userDataDir lock chromium', { minConfidence: 0.8 });
console.log(formatInstinctsForPrompt(matches));
```

Si existe un instinto con `confidence >= 0.90`, **aplícalo de inmediato** sin reinventar la rueda.

### Paso 2: Refuerzo de Instinto (Tras validar una solución exitosa)
Si aplicaste un instinto existente y resolviste el problema exitosamente:
```javascript
import { reinforceInstinct } from './tools/lib/instincts-engine.mjs';

reinforceInstinct('INS-001', 'Confirmado: eliminó error de lock en VM durante onboarding de 9 canales.');
```
Esto incrementa la confianza en `+0.02` (hasta el máximo de 1.0) y actualiza la fecha de último refuerzo.

### Paso 3: Registro de Nuevo Instinto (Descubrimiento no trivial)
Si descubriste un patrón o solución a un problema nuevo no documentado:
```javascript
import { registerInstinct } from './tools/lib/instincts-engine.mjs';

registerInstinct({
  domain: 'networking',
  trigger: 'Falta de broadcaster_user_id en chatrooms dinámicos de Kick',
  action: 'Resolver vía activeSubscriptions.meta o endpoint público /api/v2/channels/{slug}',
  confidence: 0.95,
  evidence: 'Eliminó errores HTTP 403 y 400 en canales dinámicos'
});
```

---

## 3. Criterios de Calidad para Instintos
- **Accionable:** Debe describir exactamente qué hacer en código (no conceptos vagos).
- **Verificable:** Debe haber sido probado con un test unitario o en la VM real.
- **Conciso:** Menos de 20 palabras por acción para no sobrecargar el contexto.
