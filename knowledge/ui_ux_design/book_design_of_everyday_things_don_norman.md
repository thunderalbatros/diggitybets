# 📚 Libro Completo (Síntesis Maestra): The Design of Everyday Things & Inspired Product Discovery

**Alcance:** Tratado técnico integral sobre psicología de la interacción (*The Design of Everyday Things* — Don Norman) y descubrimiento de productos tecnológicos (*Inspired* — Marty Cagan). Aplicable a la Software Factory Web y DiggityBets.

> **Autores:** Don Norman & Marty Cagan  
> **Dominio:** Affordances, Signifiers, Modelos Mentales, Prevención de Errores y Descubrimiento de Productos Web  

---

## Sección 1: Psicología de los Objetos e Interfaces Digitales (*The Design of Everyday Things* — Don Norman)

### 1.1 Los 6 Principios Fundamentales de la Interacción
1. **Affordances (Prestaciones)**: La relación entre las propiedades de un componente UI y la capacidad del usuario para determinar cómo podría usarse (ej. una tarjeta de Bounty que levita `translateY(-6px)` al pasar el cursor comunica que es interactiva).
2. **Signifiers (Significantes)**: Las señales perceptibles que comunican dónde y cómo debe ocurrir la acción (ej. un borde láser verde esmeralda `#00e701`, un ícono de copiar junto al `Bet ID`, o un cursor `pointer`).
3. **Mappings (Mapeo Espacial Natural)**: La relación geométrica entre los controles y sus efectos en pantalla. Los filtros de Tier (`TIER 1` a `TIER 6`) deben ordenarse de izquierda a derecha en orden creciente de dificultad y premio (`$3` → `$20`).
4. **Feedback (Retroalimentación Inmediata `< 100ms`)**: Cada clic o comando en el chat debe producir una respuesta visual y auditiva instantánea:
   - `< 100ms`: Se percibe como causalidad física directa (cambio de estado en botón, micro-tick sonoro ZzFX).
   - `100ms – 300ms`: Requiere transición suave (spinner ligero o skeleton).
   - `> 1000ms`: Riesgo de abandono de flujo si no hay barra de progreso determinista.
5. **Conceptual Models (Modelos Mentales)**: El usuario debe comprender en 3 segundos cómo funciona el sistema (ej. en Bountys: *1. Jugar con código DIGGITY → 2. Sacar el multiplicador exigido → 3. Pegar el Bet ID para cobrar*).
6. **Constraints (Restricciones Preventivas)**: Impedir errores antes de que ocurran (deshabilitar el envío de un reclamo si el `Bet ID` no cumple el formato válido o si el Bounty ya fue cazado).

### 1.2 El Golfo de la Ejecución y el Golfo de la Evaluación
- **Golfo de la Ejecución**: ¿Qué tan difícil es para el espectador descubrir qué hacer para participar en un sorteo o reclamar un Bounty? Se puentea con **Signifiers claros, formularios de 1 paso y comandos de chat de una sola palabra (`!join`, `!bounty`)**.
- **Golfo de la Evaluación**: ¿Qué tan fácil es para el espectador saber si su acción tuvo éxito? Se puentea con **confirmaciones visuales claras (Toast verde + insignia "Verificando / Cazado")**.

### 1.3 Clasificación de Errores Humanos: Slips vs. Mistakes
- **Slips (Deslices de Acción Automática)**: El usuario tiene la intención correcta pero presiona el botón equivocado por cercanía física. Solución: **Ley de Fitts**, separación mínima de `8px–12px` entre botones destructivos y primarios, y confirmación en acciones irreversibles.
- **Mistakes (Errores de Modelo Mental)**: El usuario malinterpreta las reglas (ej. reclama un Bounty con una apuesta base menor a la mínima requerida). Solución: Mostrar la **Apuesta Mínima** y el **Multiplicador Exigido** en píldoras de alto contraste dentro de la propia tarjeta antes de abrir el modal.

---

## Sección 2: Construcción de Productos que los Usuarios Aman (*Inspired* — Marty Cagan)

### 2.1 Los 4 Riesgos Críticos de Todo Producto Digital
1. **Riesgo de Valor (Value Risk)**: ¿Los espectadores y streamers realmente quieren usar esta función?
2. **Riesgo de Usabilidad (Usability Risk)**: ¿Pueden los espectadores en móvil o escritorio entender y completar el flujo en menos de 10 segundos mientras miran el stream en vivo?
3. **Riesgo de Factibilidad (Feasibility Risk)**: ¿Puede ejecutarse con `$0` de costo de infraestructura y `<= 5%` de CPU en OBS Studio?
4. **Riesgo de Viabilidad de Negocio (Business Viability Risk)**: ¿Cumple al 100% con los Términos de Servicio de Kick.com, las leyes de juego responsable (+18, cero cobro de entrada) y genera patrocinios B2B para el canal?

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[DESIGN_MASTERY_2026]] · [[AGENT_CREATIVE_AND_VISUAL_AWARENESS_2026]] · [[CANON_REFACTORING_UI_WATHAN_SCHOGER]] · [[CANON_PRACTICAL_UI_ADHAM_DANNAWAY]] · #ui_ux_design
