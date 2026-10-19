> **Alcance:** Literatura canónica de diseño UI/UX, sistemas de diseño, psicología cognitiva, economía conductual, gamificación y conversión (CRO) para la Software Factory Web y DiggityBets.

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

# 🌐 Investigación Global SOTA: Salto Cualitativo en Comprensión y Calidad de UX/UI para el Enjambre de Agentes de Yendo

> **Destinatario:** CTO & QA Principal de Yendo  
> **Ámbito de Investigación:** Vanguardia Open-Source Global (China, Corea del Sur, Estados Unidos, Europa, Japón e India)  
> **Objetivo:** Determinar las tecnologías, marcos teóricos y herramientas faltantes en el arsenal de agentes para superar la barrera de la "percepción visual superficial" y alcanzar el "razonamiento cognitivo y ergonómico profundo" de UX/UI en aplicaciones móviles.

---

## 🧭 1. Veredicto del MANAGER_AGENT: ¿Faltan Herramientas en el Arsenal?

**Respuesta Categórica: SÍ.**

Aunque el arsenal actual de Yendo (TypeScript estricto, AST guardrails, Florence-2 para bounding boxes elementales y Maestro E2E) garantiza estabilidad sintáctica y estructural, el equipo de agentes sufre de una limitación de la industria actual: **la brecha entre la "Percepción Visual de Superficie" (Surface UI Perception) y el "Razonamiento Cognitivo de Experiencia de Usuario" (Deep UX Reasoning & Visual Saliency).**

Actualmente, las herramientas de QA visual de los agentes verifican aspectos binarios:
- ¿El fondo es `#121212` (Dark OLED)?
- ¿Los botones miden $\ge 48\text{dp}$?
- ¿El OCR contiene palabras vetadas ("Mesa", "Bar")?
- ¿Compila sin errores `npx tsc --noEmit`?

Sin embargo, **los agentes siguen siendo ciegos a la experiencia humana real**:
1. **Incapacidad de Razonamiento Causal de UX:** No detectan si un modal emergente bloquea un botón de acción primaria (*BubbleOcclBtn*), si un flujo carece de salida evidente (*Modal Trap*), o si una pantalla genera fatiga por sobrecarga de opciones (violación de la Ley de Hick-Hyman).
2. **Ausencia de Modelado de Atención Visual Humana (Saliency Heatmaps):** Los agentes diseñan y modifican pantallas sin saber dónde fijará la mirada el usuario en los primeros 500ms al abrir la app.
3. **Dependencia de `testID`s Frágiles vs. Parsing Visual Puro:** Si un componente nativo de React Native no expone un selector accesible en el árbol de vistas, los agentes pierden la capacidad de interacción.
4. **Falta de Detección de Patrones Engañosos (Dark Patterns):** No auditan la honestidad de los flujos sociales ni la coherencia ética entre el copy y la acción.

---

## 🌍 2. Mapeo Geográfico Global de Tecnologías Open-Source de Vanguardia

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   MAPA GLOBAL DE INNOVACIÓN ABIERTA EN GUI AGENTS Y UX/UI                        │
└───────────────────────────────────┬──────────────────────────────────────────────────────────────┘
                                    │
    ┌───────────────────────┬───────┴───────────────┬────────────────────────┬─────────────────────┐
    ▼                       ▼                       ▼                        ▼                     ▼
🇨🇳 CHINA & ASIA       🇰🇷 COREA DEL SUR        🇺🇸 ESTADOS UNIDOS        🇪🇺 EUROPA             🇯🇵 JAPÓN & 🇮🇳 INDIA
• UXBench & UI-UX 4B    • CANVAS (KAIST)        • OmniParser v2 (MSFT)   • Pixtral 12B         • CyberAgent AI Lab:
  (Ant Group/CVPR'26)     (AAAI 2026): Tool-      (Pure-Vision Parsing)    (Mistral AI): VLM     Aesthetic Balance &
• UI-TARS 1.5             based UI Design &     • AndroidWorld (Google)    con OCR nativo.       Ma (間) Spatial Ratio.
  (ByteDance, 39k★):      Human Saliency Maps.  • SeeClick (Tsinghua/    • SmolVLM (HF):       • Sarvam AI / IIT HCI:
  End-to-end GUI Agent. • KIXLab: Component       CMU): Universal GUI      Sub-100ms on-device   Zero-Friction Touch
• Mobile-Agent-v3         Tree SSIM Alignment.    Grounding.               vision reasoning.     Affordance ("NBU").
  (Alibaba/GUI-Owl).
• UIGuard (Tsinghua/
  CMU): Dark Patterns.
```

---

### 🇨🇳 2.1 CHINA & ASIA ORIENTAL: La Vanguardia en GUI Agents y Razonamiento UX

#### A. UXBench & Modelo UI-UX (Ant Group & Tsinghua University — CVPR 2026 / arXiv:2606.13192)
- **Descubrimiento:** Es el primer benchmark y modelo multimodal del mundo (4B parámetros, basado en Qwen-VL optimizado con GRPO - Group Relative Policy Optimization) diseñado específicamente para el **diagnóstico fino de defectos de experiencia de usuario**.
- **La Innovación:** Demuestra que modelos líderes como GPT-4o y Claude 3.5 Sonnet fallan estrepitosamente en UX porque operan en el nivel de *percepción* (describir qué hay en la pantalla) y no en el nivel de *inferencia de experiencia* (cómo impacta al modelo mental del usuario).
- **Taxonomía Operativa de 3 Dimensiones HCI:**
  1. *Usabilidad (Operabilidad):*
     - `BubbleOcclT`: Textos flotantes o toasts que tapan texto crítico de la pantalla.
     - `BubbleOcclBtn`: Elementos flotantes que bloquean botones o controles interactivos.
  2. *Eficiencia (Carga Cognitiva y Operativa):*
     - `PopupNoClose`: Modales sin mecanismo visible o accesible de cierre.
     - `PopupBlockClose`: Diálogos superpuestos que impiden pulsar el botón "Atrás" nativo.
     - `PopupStack`: Múltiples modales apilados simultáneamente (causante de abandono).
  3. *Confiabilidad (Trustworthiness & Persuasiveness):*
     - `MismatchBadge`: Badges o tags de estado cuyo contenido contradice la información real.
     - Promesas falsas o llamadas a la acción que conducen a flujos no relacionados.
- **Rendimiento:** UI-UX alcanza un **79.6% de precisión diagnóstica en UX**, superando a Claude-4.5-Sonnet (65.5%) con una latencia significativamente menor.

#### B. UI-TARS 1.5 & UI-TARS Desktop (ByteDance — Repositorio Open Source, 39k★)
- **Descubrimiento:** Pila completa de agentes multimodales entrenada específicamente en la interacción visual con sistemas operativos móviles y de escritorio.
- **Ventaja Clave:** Opera a nivel de píxel puro mediante *Visual Grounding*. No requiere árboles de accesibilidad ni hooks de testing en la aplicación. Si un botón es visible para un humano, UI-TARS puede identificarlo, razonar su función y accionarlo.

#### C. Mobile-Agent-v3 & GUI-Owl (Alibaba Group — arXiv:2508.15144)
- **Descubrimiento:** Arquitectura multi-agente especializada en smartphones, compuesta por tres agentes en ciclo cerrado:
  - *Planning Agent:* Descompone intenciones complejas en pasos de navegación.
  - *Decision Agent:* Evalúa el estado visual de la pantalla y decide el siguiente tap/scroll.
  - *Reflection Agent:* Monitorea si la acción tuvo el efecto esperado o si la app quedó en un estado erróneo.

#### D. UIGuard (Tsinghua University & Carnegie Mellon University — ACM UIST / arXiv:2308.05898)
- **Descubrimiento:** Framework de detección automatizada de **Patrones Oscuros (Dark Patterns)** en interfaces móviles con un 93% de precisión.
- **Categorías Auditadas:** Falsa urgencia ("¡Solo quedan 2 cupos!"), obstaculización deliberada de cancelación, confirm-shaming, y botones trampa de doble negativo.

---

### 🇰🇷 2.2 COREA DEL SUR: Diseño Iterativo y Modelado de Atención Visual

#### A. CANVAS Benchmark (KIXLab, KAIST / Korea University / Yonsei — AAAI 2026)
- **Descubrimiento:** Primer benchmark riguroso para evaluar modelos Vision-Language en **diseño de interfaces basado en herramientas (Tool-Based UI Design)** sobre más de 3.300 diseños móviles reales.
- **La Métrica Jerárquica Humana (75% de correlación con diseñadores senior):**
  1. *Nivel de Rasgo (Feature-Level):* SSIM (Structural Similarity Index Measure) para evaluar fidelidad geométrica y proporciones.
  2. *Nivel de Patrón (Pattern-Level — Saliency Similarity):* **Mapas de Saliencia Visual.** Compara las áreas donde el ojo humano naturalmente fija su atención visual contra el foco previsto por el diseño.
  3. *Nivel de Objeto (Object-Level — BLIP Caption):* Similitud semántica entre el propósito declarado del componente y su representación gráfica.
  4. *Component-Wise Matching:* Evaluación granular de correspondencia en el árbol de componentes (posición, tipografía, paleta cromática y jerarquía de anidamiento).
- **Lección Crucial para Yendo:** Los agentes que obtienen mejores resultados en UI no rediseñan pantallas completas en un solo paso ("all-at-once"), sino que ejecutan **invocaciones estratégicas de herramientas componente por componente** (*copy, align, propagate*).

---

### 🇺🇸 2.3 ESTADOS UNIDOS: Screen Parsing y Entornos de Ejecución Reales

#### A. OmniParser v2 (Microsoft Research — GitHub / Azure AI)
- **Descubrimiento:** Herramienta de parsing visual que convierte capturas de pantalla de interfaces en una tabla estructurada de cajas delimitadoras, reconociendo:
  - Íconos interactuables (mediante YOLO fine-tuneado en 67k capturas de UI).
  - Texto mediante OCR de alta resolución.
  - Generación de identificadores numéricos visuales superpuestos (Set-of-Mark prompting).
- **Impacto:** Permite que cualquier LLM/VLM razone sobre una pantalla de React Native sin tener que inyectar bibliotecas de inspección en el código de producción.

#### B. AndroidWorld (Google Research — GitHub)
- **Descubrimiento:** Entorno de benchmark ejecutable y reproducible en emuladores reales de Android con 116 tareas programáticas y recompensas cuantificables. Proporciona el estándar para contrastar el comportamiento de agentes autónomos en aplicaciones nativas.

#### C. SeeClick (Universal Visual Grounding for GUI Agents — OpenReview)
- **Descubrimiento:** Modelo que traduce comandos en lenguaje natural ("Tocar el botón de unirme a la mesa de café") directamente a coordenadas $(x, y)$ absolutas y normalizadas, resolviendo ambigüedades espaciales en pantallas densas.

---

### 🇪🇺 2.4 EUROPA: Multimodalidad Abierta y Modelos Ultralivianos en el Edge

#### A. Pixtral 12B (Mistral AI, Francia)
- **Descubrimiento:** Modelo multimodal de peso abierto con arquitectura de codificador visual nativo para imágenes a resolución variable sin recortes forzados.
- **Aplicación:** Excelente para la lectura de documentos técnicos de diseño, diagramas de flujo de usuario y pantallas de alta densidad tipográfica.

#### B. SmolVLM-2B / 500M (Hugging Face, Francia/EE.UU.)
- **Descubrimiento:** Modelos compactos capaces de correr en CPU local o integrarse on-device para pre-filtrar anomalías visuales en menos de 100ms con menos de 1GB de RAM.

---

### 🇯🇵 2.5 JAPÓN: Estética Espacial, Balance Visual y Minimización de Entropía

#### CyberAgent AI Lab & Sakana AI (Tokio, Japón)
- **Descubrimiento:** Algoritmos de balance visual basados en el concepto estético japonés de **Ma (間 - Espacio Negativo Significativo)** y minimización de entropía visual.
- **Principio:** Una pantalla de alta calidad no es la que contiene más elementos, sino la que maximiza el ratio de espacio respirable manteniendo una clara tensión compositiva. En apps de interacción social presencial como Yendo, el exceso de estímulos visuales incrementa la ansiedad del usuario; el diseño debe inducir calma y confianza inmediata.

---

### 🇮🇳 2.6 INDIA: Ergonomía de Cero Fricción ("Next Billion Users" Touch Affordance)

#### Sarvam AI & IIT Madras HCI Lab
- **Descubrimiento:** Principios de diseño para audiencias dinámicas donde la claridad táctil (*affordance*) debe ser auto-evidente en menos de 200 milisegundos sin necesidad de explicaciones verbales.
- **Principio:**
  - Áreas de toque con contraste de elevación y retroalimentación háptica inmediata.
  - Cero ambigüedad en estados activos vs. deshabilitados.
  - Diseños hiper-resilientes a conexiones intermitentes (optimistic UI con confirmación visual inequívoca).

---

## 🧩 3. Los 4 Motores Faltantes en el Arsenal de Yendo

Para convertir estos descubrimientos globales en una ventaja competitiva absoluta para el equipo de agentes de Yendo, se identifican **4 motores arquitectónicos faltantes**:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                           LOS 4 MOTORES FALTANTES EN EL ARSENAL DE YENDO                         │
└───────────────────────────────────┬──────────────────────────────────────────────────────────────┘
                                    │
    ┌───────────────────────┬───────┴───────────────┬────────────────────────┐
    ▼                       ▼                       ▼                        ▼
┌───────────────────────┐ ┌───────────────────────┐ ┌───────────────────────┐ ┌───────────────────────┐
│       MOTOR 1         │ │       MOTOR 2         │ │       MOTOR 3         │ │       MOTOR 4         │
│  CognitiveUXAuditor   │ │ VisualSaliencyHeatmap │ │  OmniScreenParser     │ │  CANVAS Hierarchical  │
│  (UXBench + UIGuard)  │ │   (KAIST + CyberAgent)│ │ (Microsoft + ByteDance│ │  Component Alignment │
├───────────────────────┤ ├───────────────────────┤ ├───────────────────────┤ ├───────────────────────┤
│• BubbleOcclBtn / T    │ │• Mapas de atención    │ │• Extracción de cajas  │ │• SSIM geométrico      │
│• Modal Traps / Stacks │ │  humana (primeros     │ │  táctiles sin testID  │ │• Matching de árbol de │
│• Dark Patterns (93%)  │ │  500ms de apertura)   │ │• Grounding táctil     │ │  componentes React N. │
│• Ley de Hick-Hyman    │ │• Ratio de espacio "Ma"│ │  puro a nivel píxel   │ │• Saliency Similarity  │
└───────────────────────┘ └───────────────────────┘ └───────────────────────┘ └───────────────────────┘
```

### Motor 1: `CognitiveUXAuditor` (Diagnóstico Causal de UX y Patrones Oscuros)
- **Base Teórica:** Ant Group *UXBench* (CVPR 2026) + Tsinghua/CMU *UIGuard* (ACM UIST).
- **Función:** Analiza el flujo y las capturas de pantalla de la app buscando:
  1. *Oclusiones destructivas:* Banners o toasts que tapen botones de navegación o textos informativos.
  2. *Trampas de salida:* Modales que no se puedan cerrar tocando el fondo o sin botón "X" explícito.
  3. *Inconsistencias cognitivas:* Botones con texto ambiguo ("Aceptar" en lugar de "Confirmar Reserva").
  4. *Patrones Oscuros:* Textos que manipulan emocionalmente para forzar la asistencia o suscripción.

### Motor 2: `VisualSaliencyHeatmap` (Simulación de Fijación Ocular Humana)
- **Base Teórica:** KAIST *CANVAS* (AAAI 2026) + CyberAgent AI Lab (Tokio).
- **Función:**
  - Genera una matriz de saliencia visual computacional que predice dónde mirará el ojo del usuario al entrar a la pantalla de exploración de experiencias.
  - Verifica que el botón primario de reserva / unión al grupo Dunbar concentre al menos el **40% de la densidad de atención visual**, y que los elementos secundarios no compitan agresivamente con el objetivo del usuario.

### Motor 3: `OmniScreenParser` (Parsing Visual Libre de Coordenadas y Selectores)
- **Base Teórica:** Microsoft *OmniParser v2* + ByteDance *UI-TARS*.
- **Función:**
  - Inspecciona las capturas tomadas por Maestro en el emulador de Android o Firebase Test Lab.
  - Extrae todos los elementos táctiles visibles, sus dimensiones en píxeles y dp reales, su icono o texto, y produce un mapa JSON de interactables.
  - Elimina los fallos de tests causados por selectores desincronizados en React Native.

### Motor 4: `CANVAS Component-Tree Alignment Engine` (Auditoría Jerárquica de UI)
- **Base Teórica:** KAIST KIXLab *CANVAS* Framework.
- **Función:**
  - Evalúa las modificaciones de código en `src/components/` contra 3 capas:
    - *Fidelidad Geométrica:* SSIM sobre el render final.
    - *Jerarquía de Nodos:* Árbol de componentes limpio, modular y con props estrictas.
    - *Alineación Semántica:* Validación de que cada componente cumple su propósito canónico según el Manifiesto de Yendo.

---

## 🗺️ 4. Plan de Adopción Estratégica en los 3 Horizontes de Yendo

### 🎯 HORIZONTE 1: Desafíos Actuales (Sprint 2/3 - Desarrollo Activo y Estabilidad)
1. **Integración del `CognitiveUXAuditor` Local:**
   - Crear el script `tools/vision/cognitive_ux_auditor.js` que ejecuta de forma offline y determinística las reglas de *UXBench* (detección de oclusiones, trampas de modales y evaluación de jerarquía táctil).
   - Añadir el comando `npm run audit:ux` al pipeline de pre-vuelo (`preflight:agents`).
2. **Auditoría de Patrones Oscuros en Textos y Copys:**
   - Incorporar las heurísticas de *UIGuard* en `tools/ai/hf_guardrail_validator.js` para certificar que el microcopy rioplatense nunca utilice coerción, urgencia fabricada o manipulación.

### 🚀 HORIZONTE 2: Camino Hacia el MVP (Concurrencia, Pagos y Test Lab)
1. **Integración de Saliencia Visual en CI/CD con Florence-2 + Saliency Heuristics:**
   - Ampliar `tools/vision/hf_florence_auditor.js` para calcular mapas de calor de atención visual y validar que el botón de reserva/unión al grupo capture el foco visual principal.
2. **Screen Parsing Asistido con OmniParser en Maestro E2E:**
   - Utilizar el esquema estructurado de OmniParser para permitir que el agente de QA reproduzca flujos complejos en Android sin depender de `testIDs` estáticos.

### 🌐 HORIZONTE 3: Operaciones Post-Despliegue en Producción (Escala y Resiliencia)
1. **Auto-Sanación Asistida por UXBench:**
   - Cuando un usuario abandone una pantalla en menos de 3 segundos o registre un evento de fricción en PostHog/Firebase, el pipeline de auto-sanación captura la pantalla y la somete al diagnóstico de `UI-UX` para identificar si hubo una oclusión visual o ambigüedad en el botón.
2. **Optimización DPO de Layouts con Datos de Show-Up Rate:**
   - Correlacionar el ratio de asistencia física en venues reales con los mapas de saliencia visual, refinando dinámicamente las pantallas para maximizar la conversión social y el confort comunitario.

---

## 🛠️ 5. Matriz del Arsenal Actual vs. Arsenal Potenciado con SOTA Global

| Dominio | Arsenal Actual de Yendo | Tecnología Global Identificada | Beneficio del Salto Cualitativo |
| :--- | :--- | :--- | :--- |
| **Diagnóstico de UX** | Reglas sintácticas en `MANAGER.mdc` y revisión manual. | **UXBench & UI-UX 4B** (Ant Group / CVPR 2026) | Diagnóstico automático de oclusiones visuales, trampas modales e inconsistencias cognitivas con 79.6% de precisión. |
| **Detección de Dark Patterns** | Revisión de copy manual por el CSO. | **UIGuard** (Tsinghua / CMU — ACM UIST) | Auditoría algorítmica de honestidad y ética en flujos sociales con 93% de exactitud. |
| **Jerarquía y Atención Visual** | Verificación de contraste OLED `#121212` con Florence-2. | **CANVAS Saliency & CyberAgent Ma Ratio** (KAIST / Tokio) | Predicción de mapas de calor oculares humanos; garantiza que el botón Dunbar sea el foco visual primario. |
| **Inspección de Pantalla E2E** | Selectores de Maestro y accessibilityLabels en React Native. | **OmniParser v2 & UI-TARS** (Microsoft & ByteDance) | Parsing de pantalla visual puro; elimina la fragilidad de `testID`s en componentes anidados. |
| **Navegación Autónoma en Android** | Scripts de test declarativos fijos (`.maestro/`). | **Mobile-Agent-v3 & AndroidWorld** (Alibaba & Google) | Exploración autónoma con ciclo de Planificación, Decisión y Reflexión para reproducir bugs desconocidos. |
| **Ergonomía Táctil** | Ley de Fitts básica ($\ge 48\text{dp}$). | **Sarvam HCI & High-Affordance Touch** (India) | Cero ambigüedad táctil, feedback en <16ms y resistencia cognitiva para entornos de alta vibración/ruido social. |

---

## 📋 6. Conclusión y Recomendación del MANAGER_AGENT

El arsenal de Yendo ha alcanzado la madurez de **Capa Base e Infraestructura de Código**. Sin embargo, para que el enjambre de agentes produzca interfaces con la sensibilidad, empatía y elegancia de un Director de Diseño de clase mundial, es imperativo incorporar la **Capa Cognitiva de UX**.

La adopción de los principios de **UXBench**, **CANVAS** y **OmniParser** dotará a los agentes de:
1. **Ojos humanos reales:** Entenderán no solo qué elementos existen, sino cómo los percibe la mente del usuario (saliencia, orden de lectura y fatiga).
2. **Criterio ético y de producto:** Bloquearán de forma autónoma cualquier patrón engañoso o bloqueo de navegación.
3. **Independencia técnica:** Podrán inspeccionar y testear pantallas directamente a nivel de píxeles, logrando una velocidad y robustez sin precedentes.

---

## Relaciones de Contexto
- [[.knowledge/YENDO_DNA.md]]
- [[.knowledge/YENDO_LIBRARY.md]]
- [[.knowledge/research/Master_Anti_Hallucination_Overfitting_Agent_Optimization_Dossier.md]]
- [[.knowledge/research/Hugging_Face_Advanced_Agent_Architecture_Evaluation.md]]
- [[.knowledge/research/Guia_Maestra_Herramientas_Hugging_Face_Yendo.md]]
- [[Biblia_Maestra_Visual_3D_Motion_Yendo]]
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[Número de Dunbar]]
