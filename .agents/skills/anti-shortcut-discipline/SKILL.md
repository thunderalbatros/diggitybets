---
name: anti-shortcut-discipline
description: Protocolo de disciplina operativa anti-atajos inspirado en addyosmani/agent-skills y affaan-m/ECC. Contiene tablas de racionalización para evitar que los agentes omitan pruebas, validaciones CLI, sanitizaciones o consultas a la base de conocimiento.
---

# 🛑 SKILL: Disciplina Operativa Anti-Atajos (Rationalization Tables)

> **Inspirado en:** `addyosmani/agent-skills` & `affaan-m/ECC` (Agent Harness Performance Optimization)  
> **Mandato:** Los agentes de IA tienen una tendencia intrínseca a tomar atajos (saltarse tests, no verificar el estado de git, asumir que un cambio de una línea no romperá nada). Esta habilidad destruye esas racionalizaciones y exige evidencia empírica.

---

## 1. Tabla de Racionalización Universal (Anti-Excusas)

Cada vez que sientas el impulso de redactar una de estas frases o justificaciones mentales, consulta esta tabla y acata el mandato obligatorio:

| Racionalización / Excusa del Agente | Realidad Técnica y Riesgo | Mandato Inviolable |
|---|---|---|
| *"Es un cambio de 1 línea, seguro que no rompe nada."* | Modificar 1 línea en una regex, timeout o variable compartida suele alterar el comportamiento de todo el pipeline. | **Ejecutar `npm test`** y adjuntar el conteo de tests exitosos. |
| *"El código compila mentalmente, no hace falta correr la verificación completa."* | V8, TypeScript strict, módulos C++ (Sharp, ONNX) o sintaxis ESM (`.mjs`/`.cjs`) fallan silenciosamente en runtime. | **Ejecutar `npm run verify`** y asegurar 0 warnings y 0 errores. |
| *"No necesito consultar la base de conocimiento o las decisiones previas, ya conozco la solución."* | Las decisiones previas (DEC-001 a DEC-023) contienen restricciones legales y arquitectónicas inviolables. | **Buscar primero en `memory/decisions.md` o Qdrant (`kb_search`)**. |
| *"Puedo hacer git commit directamente sin revisar `git status`."* | Se pueden cometer archivos temporales, logs con secretos expuestos o bundles residuales. | **Ejecutar `git status`** y verificar que sólo los archivos intencionados estén staged. |
| *"Voy a responderle al usuario que ya terminé antes de probarlo en la VM."* | La discrepancia entre entorno local y la VM (Linux e2-medium vs Windows) causa caídas en producción. | **Verificar en vivo en la VM (`pm2 status`, logs)** antes de dar por cerrada la tarea. |
| *"Un retry inmediato sin backoff resolverá el error 403 o 429."* | Los reintentos rápidos activan protecciones de rate-limit y WAF de Cloudflare, provocando bloqueos de IP. | **Aplicar retroceso exponencial (`resilientFetch`) y jitter gaussiano**. |

---

## 2. El Ciclo de Desarrollo Determinista (ECC SDLC)

Ningún agente del equipo puede entregar código sin pasar por estas 6 compuertas:

```text
1. AUTO-RESEARCH   ➔ Consultar KB / Instintos / Docs antes de escribir.
2. SPEC / PLAN     ➔ Definir qué se va a cambiar y qué límites no se tocan.
3. TEST FIRST      ➔ Crear o identificar el test que valida el comportamiento.
4. IMPLEMENT       ➔ Escribir el código mínimo necesario y modular.
5. VERIFY BY CLI   ➔ Ejecutar `npm test` y `npm run verify` (DEC-010).
6. REINFORCE       ➔ Si se resolvió un bug no trivial, registrar o reforzar el instinto.
```

---

## 3. Protocolo de Verificación Estricta (Checklist)

Antes de emitir cualquier mensaje de cierre al usuario Tomás:
- [ ] ¿Se ejecutó `npm test` con salida 100% verde (23 suites, >250 tests)?
- [ ] ¿Se ejecutó `npm run verify` confirmando 0 diagnósticos de TypeScript y paridad con el IDE?
- [ ] ¿Se verificó `git status` para certificar que el working tree está limpio?
- [ ] ¿Se preservó la política Zero-Leak (sin tokens en código, logs o commits)?
- [ ] ¿El informe final sigue la estructura pedagógica de 5 bloques de `AGENTS.md`?
