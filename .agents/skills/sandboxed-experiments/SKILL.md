---
name: sandboxed-experiments
description: "Protocolo de experimentos y pruebas en sandboxes aislados basado en Matt Pocock Sandcastle (@ai-hero/sandcastle)."
---

# 🏰 SKILL: Experimentos y Pruebas en Sandboxes Aislados (Patrón Matt Pocock Sandcastle)

> **Inspirado en:** `mattpocock/sandcastle` (`@ai-hero/sandcastle`) & `mattpocock/skills`  
> **Mandato:** Todo experimento técnico, prueba de concepto (spike), benchmark intensivo o refactorización estructural que pueda comprometer la estabilidad del sistema 24/7 debe ejecutarse **exclusivamente dentro de un sandbox aislado**.

---

## 1. ⚠️ El Riesgo de Modificar el Espacio Principal Directamente

Cuando un agente de IA prueba una nueva librería, modifica expresiones regulares en caliente o compila modelos locales en el árbol de trabajo principal (`workspace`):
1. **Contaminación del Working Tree:** Deja archivos residuales, logs de crash o configuraciones rotas.
2. **Peligro en Procesos 24/7:** Si el bot está en ejecución (`pm2` o listener de Pusher), un cambio de archivo puede disparar reinicios involuntarios.
3. **Pérdida de Tiempo en Rollbacks:** Revertir cambios fallidos en git ensucia el historial de commits.

---

## 2. 🛡️ La Solución: Sandcastle Worktree-per-Experiment

Mediante `tools/sandbox.mjs` y `tools/lib/sandcastle-runner.mjs`, creamos un entorno efímero basado en `git worktree`:

```
┌────────────────────────────────────────────────────────┐
│                   TAREA / EXPERIMENTO                  │
│       (Probar nuevo ASR, benchmark, spike de VLM)      │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│               CREACIÓN DEL SANDBOX AISLADO             │
│        node tools/sandbox.mjs create spike-asr         │
│          Ruta: .sandboxes/spike-asr (rama propia)      │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│                 EJECUCIÓN DE PRUEBAS                   │
│      node tools/sandbox.mjs run spike-asr <cmd>        │
│          (Cero riesgo para src/ y producción)          │
└───────────────────────────┬────────────────────────────┘
               ┌────────────┴────────────┐
             ÉXITO                     FALLO
               ▼                         ▼
┌────────────────────────────┐ ┌───────────────────────────┐
│ node tools/sandbox.mjs     │ │ node tools/sandbox.mjs    │
│ merge spike-asr            │ │ destroy spike-asr         │
│ (Verifica y fusiona a HEAD)│ │ (Limpia sin dejar huella) │
└────────────────────────────┘ └───────────────────────────┘
```

---

## 3. 📋 Ciclo Operativo del Agente

### Paso 1: Crear Sandbox
```bash
node tools/sandbox.mjs create <nombre-del-experimento>
```
*Crea la carpeta en `.sandboxes/<nombre>` ligada a la rama temporal `sandbox/<nombre>`.*

### Paso 2: Ejecutar Códigos o Pruebas en el Sandbox
```bash
node tools/sandbox.mjs run <nombre> node tools/bench.mjs
node tools/sandbox.mjs run <nombre> vitest run
```

### Paso 3: Verificar Integridad
```bash
node tools/sandbox.mjs verify <nombre>
```
*Ejecuta `node tools/verify.mjs` dentro del sandbox, asegurando 0 errores de TypeScript y parsers.*

### Paso 4: Fusión o Destrucción
- **Si el experimento es exitoso y probado:**
  ```bash
  node tools/sandbox.mjs merge <nombre>
  ```
  *Fusiona los commits a la rama actual y destruye automáticamente el worktree.*
- **Si el experimento falló o fue solo una prueba de rendimiento:**
  ```bash
  node tools/sandbox.mjs destroy <nombre>
  ```
  *Destruye el worktree y borra la rama temporal sin dejar rastro.*

---

## 4. 🛑 Reglas Inviolables para Agentes

1. **PROHIBIDO** experimentar con nuevas dependencias pesadas en el root antes de probar su viabilidad en sandbox.
2. **PROHIBIDO** hacer `git commit` de carpetas dentro de `.sandboxes/` (están explícitamente ignoradas en `.gitignore`).
3. **SIEMPRE** verificar (`node tools/sandbox.mjs verify <nombre>`) antes de invocar `merge`.
4. Si un agente detecta sandboxes huérfanos al inicio de su sesión, debe ejecutar `node tools/sandbox.mjs clean-all`.
