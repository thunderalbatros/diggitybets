---
name: verify-before-claim
description: Obligatorio antes de declarar cualquier tarea terminada en Centinela. Ejecuta la verificación real por CLI (config + JSON + TypeScript) y adjunta la salida cruda. Úsalo siempre que se modifique .mcp.json, cualquier *.json, *.ts, package.json o tsconfig.json, o cuando el IDE y el disco discrepen.
---

# Verify Before Claim (protocolo DEC-010)

**Regla:** una tarea NO está terminada si no has ejecutado:

```bash
npm run verify            # desde la raíz o desde spike/
```

Sale `PROYECTO LIMPIO — cero errores en rojo` sólo si se cumplen las 3 condiciones:
`.mcp.json` válido · todos los `.json` parsean · `tsc --noEmit` = 0 errores.

## Cuando usar

- Tras CUALQUIER edición de código o configuración.
- Cuando el panel de problemas del IDE muestre algo rojo.
- Antes de pedir aprobación humana de un hito.

## Regla de oro: el IDE NO es la fuente de verdad

Si `tsc --noEmit` da 0 errores y el IDE muestra errores → **el error es del IDE**.

1. Cierra la pestaña **sin guardar** (*"Don't Save"*).
2. Reábrela desde disco.
3. Si persiste: `Developer: Reload Window`.

⚠️ **NUNCA guardes un buffer desincronizado.** Guardarlo convierte un error fantasma en
un error real y destruye el archivo (incidente LEC-005: `chat-send.ts` pasó de
3302→2378 bytes).

## Ejemplo

```
$ npm run verify
[1/3] Configuración .mcp.json  → 3 OK · 0 errores
[2/3] Barrido de archivos JSON → 34 archivos, 0 inválidos
[3/3] tsc --noEmit             → 0 errores
PROYECTO LIMPIO — cero errores en rojo.        # exit 0
```

## Guidelines

- Prohibido dejar fixtures con JSON/TS roto dentro del proyecto → usar `os.tmpdir()`.
- Si `verify` falla, vuelve a implementar. No reportes éxito.
- Adjunta la salida cruda en el reporte, no la resumas.
