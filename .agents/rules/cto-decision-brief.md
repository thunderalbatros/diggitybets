# Protocolo CTO HITL (Human-in-the-Loop) — CTO Decision Brief

> **Origen:** `aihero.dev/skills-grill-me` + Metodología de Validación Temprana  
> **Objetivo:** Eliminar la ambigüedad y evitar refactorizaciones innecesarias antes de tocar código de misión crítica.

---

## 1. Cuándo Activar el CTO Decision Brief
El agente (o equipo de agentes) DEBE detenerse y presentar un **CTO Decision Brief** antes de:
1. Crear una nueva base de datos, tabla o migración de esquema.
2. Modificar el protocolo de autenticación o tokens de OAuth 2.1 PKCE.
3. Cambiar el balance o economía de puntos ($DIG, recompensas de watchtime o stock del store).
4. Introducir nuevas dependencias o librerías externas.
5. Diseñar o rediseñar una nueva escena de overlay para OBS Studio.

---

## 2. Formato del CTO Decision Brief (Máximo 3 a 5 preguntas)
Cada pregunta debe redactarse en **Español rioplatense claro**, dirigida a un fundador de producto no programador, estructurada como:

```markdown
### 📋 CTO Decision Brief: [Nombre del Hito]

1. **[Tema / Decisión Clave]**
   - **Opción A (Recomendada):** [Descripción breve + Pro principal].
   - **Opción B (Alternativa):** [Descripción breve + Contra o trade-off].
   - *Por qué recomendamos A:* [Explicación en 1 o 2 oraciones].

2. **[Siguiente Decisión Clave]**
   ...
```

---

## 3. Regla de Oro
- **Nunca hacer más de 5 preguntas por Gate.**
- **Siempre indicar la opción recomendada por defecto.**
- Si el usuario simplemente responde "dale", "avanzá" o "luz verde", el agente adopta automáticamente todas las opciones recomendadas (A).
