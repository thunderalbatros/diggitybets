---
name: agent-worktree
description: "Gestiona el aislamiento de entornos de trabajo Git (Worktrees) para agentes, permitiendo refactorizaciones pesadas, suites de."
---

# Agent Worktree Isolation Skill

Inspirado en la arquitectura de HumanLayer (*No Vibes Allowed*), este mecanismo permite que agentes autónomos operen en entornos Git aislados dentro de `.worktrees/<task_name>`, evitando conflictos de merge y desorden en la rama de trabajo activa.

## Comandos Operativos

### 1. Aprovisionar un Worktree para una Tarea
```bash
node tools/system/agent_worktree.js create <nombre_de_tarea> [rama_base]
```
Ejemplo:
```bash
node tools/system/agent_worktree.js create auth-refactor main
```
*Crea la rama `agent/auth-refactor` y monta el working directory en `.worktrees/auth-refactor/`.*

### 2. Listar Worktrees Activos
```bash
node tools/system/agent_worktree.js list
```

### 3. Desmantelar y Podar Referencias al Terminar
```bash
node tools/system/agent_worktree.js remove <nombre_de_tarea>
```

### 4. Limpieza General de Árboles Huérfanos
```bash
node tools/system/agent_worktree.js cleanup
```
