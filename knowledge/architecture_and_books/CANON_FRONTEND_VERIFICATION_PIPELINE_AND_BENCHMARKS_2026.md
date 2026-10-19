# Tratado Canónico: Frontend Verification Pipeline, Visual Snapshot Regression & SOTA Benchmarks (2025–2026)

**Alcance:** Este documento establece la arquitectura canónica del **Pipeline de Verificación Frontend Automatizado**, **Regresión Visual de Píxeles (Playwright + Pixelmatch)**, **Compuertas de Fusión Calificadas para Producción (PQC — Production-Qualified Change Merge Gates)** y el estado del arte de los **Benchmarks Agénticos Frontend (Design2Code, Design Arena, SWE-bench Multimodal, WebArena)** para la Software Factory de HuntHub / DiggityBets. NO es fuente de tokens de diseño CSS (ver `site/css/design-tokens.css` y `DESIGN_MASTERY_2026.md`), NI de orquestación RAG (ver `CANON_SELF_EVOLVING_SOFTWARE_FACTORY_AND_SPECULATIVE_RAG_2026.md`), NI de matemáticas de azar (ver `CANON_PROVABLY_FAIR_GAMES_2026.md`).

---

## 1. La Brecha de Verificación en las Software Factories Agénticas

`[VERIFICADO: Factory AI 2025, Augment Code 2025, Stanford SALT Lab 2024–2025, Mergify 2026]`

En las fábricas de software impulsadas por agentes de IA, el cuello de botella del desarrollo de software se ha desplazado de la **escritura de código** a la **verificación y fusión segura**.

### 1.1 La Trampa del "Clean Diff" (*The Clean Diff Trap*)
Los modelos de razonamiento modernos (Claude 3.7/Sonnet, GPT-4o/o1, Gemini 2.5 Flash/Pro) generan cambios sintácticamente impecables, idiomáticos y con nombres de variables prolijos. Sin embargo:
- Pasan los linters y pruebas unitarias de JavaScript mientras introducen **desplazamientos de diseño de 2 píxeles**, superposición de botones de acción flotantes en pantallas móviles de 390px, o ruptura de la jerarquía visual de luminancia.
- Dan por confirmada la persistencia en memoria local (`Map` volátil) sin verificar si la base de datos de producción (Cloudflare D1) está enlazada o si los encabezados de caché de borde (`_headers`) invalidan la entrega en CDN.

### 1.2 El Error Correlacionado de Modelos (*Correlated Model Errors*)
Hacer que un segundo agente de IA revise el código del primer agente pasándole el historial de la conversación suele fracasar. Los LLMs comparten puntos ciegos estadísticos e interpretaciones del contexto conversacional previo. La solución SOTA exige:
1. **Señales Deterministas Inviolables**: Linters AST simbólicos, pruebas de regresión visual de píxeles (`toHaveScreenshot()`), auditorías de accesibilidad con motor Axe-core y telemetría CDP.
2. **Revisor de Sala Limpia (*Clean-Room Reviewer*)**: Un agente auditor que evalúa únicamente el `git diff` contra la especificación formal viva, **sin acceso** a la cadena de pensamiento o charla del agente constructor.

---

## 2. Arquitectura de Regresión Visual de Píxeles (Playwright + Pixelmatch)

`[VERIFICADO: Playwright Test Docs 2025, Factory Engineering 2025, Chromium CDP Specs 2026]`

Las aserciones DOM funcionales tradicionales (`toBeVisible()`, `toHaveText()`) son ciegas ante regresiones gráficas. Un elemento puede ser técnicamente "visible" en el árbol DOM mientras se renderiza con opacidad cero, oculto bajo una capa `z-index` rota o desplazado fuera del viewport.

```
                      +------------------------------------+
                      |     Agente Constructor / PR       |
                      +-----------------+------------------+
                                        | (Genera parche UI)
                                        v
                      +------------------------------------+
                      |   Harness Determinista Playwright  |
                      | - animations: 'disabled'           |
                      | - fonts: document.fonts.ready      |
                      | - timezone: 'UTC'                  |
                      | - viewport: 1440px / 768px / 390px |
                      +-----------------+------------------+
                                        |
                 +----------------------+----------------------+
                 |                                             |
                 v                                             v
      +---------------------+                       +---------------------+
      | Component Snapshots |                       | Dynamic Masking     |
      | (.game-card, .hud)  |                       | (.live-clock, .id)  |
      +----------+----------+                       +----------+----------+
                 |                                             |
                 +----------------------+----------------------+
                                        |
                                        v
                      +------------------------------------+
                      |   Motor Pixelmatch (Diff Engine)   |
                      |     maxDiffPixelRatio <= 0.01      |
                      +-----------------+------------------+
                                        |
                     [¿Supera umbral de discrepancia?]
                                   /         \
                              SÍ  /           \  NO
                                 v             v
            +-------------------------+   +-------------------------+
            |  AI Triage Agent        |   | APROBADO: Zero Visual   |
            |  (Clasifica: ruido de   |   | Regression Guarantee    |
            |  subpíxel vs ruptura)   |   +-------------------------+
            +-------------------------+
```

### 2.1 Los 4 Mandamientos del Harness Determinista
Para evitar falsos positivos provocados por anti-aliasing o renderizado de fuentes:
1. **Desactivación de Animaciones (`animations: 'disabled'`)**: Congelar transiciones CSS y keyframes para que la captura se realice en estado de reposo absoluto.
2. **Sincronización de Fuentes Tipográficas (`await page.evaluate(() => document.fonts.ready)`)**: Esperar a que la fuente personalizada (Chakra Petch / Inter) termine de descargarse e incrustarse en el motor de texto antes del disparo.
3. **Enmascaramiento Estratégico (*Dynamic Masking*)**: Enmascarar elementos inherentemente dinámicos (relojes en vivo, hashes de sorteo, avatares variables) mediante `mask: [page.locator('.dynamic-element')]`. **Jamás** inflar el umbral `threshold` de Pixelmatch por encima de `0.02` para tapar dinamismo.
4. **Instantáneas por Componente Aislado (*Component-Level Snapshots*)**: Capturar componentes acotados (`.game-card`, `.raffle-modal`, `.hud-bar`) en lugar de pantallas completas de 5000px de altura, aislando los fallos con precisión milimétrica.

### 2.2 Agente de Triaje de Regresión Visual (*Visual Diff Triage Agent*)
Cuando Pixelmatch detecta una discrepancia superior al umbral (`maxDiffPixelRatio > 0.01`):
- El agente de triaje recibe la imagen base (*golden*), la imagen actual, el mapa diferencial de calor (*heat diff*) y el `git diff` de CSS/HTML.
- **Clasificación**:
  - *Ruido Técnico*: Variación de subpíxel por actualización de Chromium $\rightarrow$ Notifica ajuste de baseline.
  - *Regresión Crítica*: Texto truncado, colapso de grid responsive, botón de llamada a la acción superpuesto o margen negativo espurio $\rightarrow$ **Bloqueo inmediato de la compuerta** con reporte de coordenadas `(x, y)` y regla CSS causante.

---

## 3. Estado del Arte de Benchmarks Frontend (2024–2026)

`[VERIFICADO: Stanford SALT Lab Design2Code 2024, Design Arena 2025, SWE-bench Multimodal 2025]`

| Benchmark / Entorno | Creador / Año | Enfoque Evaluado | Métrica Principal | Aplicabilidad en HuntHub |
| :--- | :--- | :--- | :--- | :--- |
| **Design2Code** | Stanford University (SALT Lab), 2024 | Conversión directa de capturas de diseño (screenshots) a código HTML/CSS ejecutable. | Block-Match Rate, Visual CLIP Score, CW-SSIM, TreeBLEU. | Evaluación del agente diseñador visual y consistencia de maquetado. |
| **Design Arena** | DesignArena.ai, 2025 | Competencia ciega y crowdsourced de agentes en generación de UIs interactivas, componentes y aplicaciones web completas. | Elo Rating en Frontend, Websites y UI Components. | Referencia de patrones de micro-interacción y modernidad de componentes. |
| **SWE-bench Verified** | Princeton / OpenAI / Anthropic, 2024–2025 | Resolución de incidencias reales de GitHub en repositorios complejos de software. | % de Pull Requests que compilan y pasan tests de regresión unitarios sin intervención humana. | Filosofía de compuertas deterministas basadas en tests de repositorio. |
| **SWE-bench Multimodal** | SWE-bench Team, 2025 | Resolución de issues de software donde el bug se describe mediante capturas de pantalla de la UI rota. | Tasa de resolución de bugs visuales multi-archivo en código frontend. | Validación del ciclo de auditoría visual automática (captura $\rightarrow$ detección $\rightarrow$ parche). |
| **WebArena** | CMU / Apple, 2024–2025 | Navegación autónoma y manipulación de entornos web vivos (e-commerce, foros, CMS). | Tasa de éxito en tareas de usuario final de múltiples pasos. | Pruebas de integración E2E sobre el frontend público y panel de administración. |

---

## 4. Pipeline de Fusión Calificada para Producción (PQC Gate)

`[VERIFICADO: Augmented Engineering Standards 2026, HuntHub Architecture]`

Para que un parche o nueva funcionalidad desarrollada por un agente de la Software Factory sea apta para producción, debe superar secuencialmente 5 compuertas:

```
[Código Modificado]
       |
       v
+-------------------------------------------------------------+
| Nivel 1: Sintaxis & AST Guard (Linear Scanners, <50ms)     |
| - 0 errores sintácticos de JS/CSS                           |
| - 0 expresiones regulares catastróficas (ReDoS)             |
| - Todas las funciones/métodos referenciados existen         |
+------------------------------+------------------------------+
                               | Pasa
                               v
+-------------------------------------------------------------+
| Nivel 2: Invariantes Unitarias & Contratos (<200ms)         |
| - Tipos e interfaces validados                              |
| - Verificación de licencias permisivas (MIT, Apache-2.0)    |
| - 0 referencias a APIs de pago o librerías pesadas          |
+------------------------------+------------------------------+
                               | Pasa
                               v
+-------------------------------------------------------------+
| Nivel 3: Regresión Visual & Accesibilidad (<2s)             |
| - Pixelmatch: maxDiffPixelRatio <= 0.01 en 3 viewports      |
| - Axe-core: 0 violaciones de accesibilidad WCAG 2.1 AA      |
| - Cero desborde horizontal (scrollX == 0)                   |
+------------------------------+------------------------------+
                               | Pasa
                               v
+-------------------------------------------------------------+
| Nivel 4: Telemetría de Rendimiento CDP (<3s)                |
| - Layout Shifts acumulados (CLS) == 0.000                   |
| - Recalculated Styles en navegación <= 15                   |
| - Consumo de CPU OBS Browser Source <= 5%                   |
+------------------------------+------------------------------+
                               | Pasa
                               v
+-------------------------------------------------------------+
| Nivel 5: Revisor de Sala Limpia (Clean-Room Reviewer)       |
| - Revisa git diff contra especificación sin historial       |
| - Verifica persistencia real (D1 bindings, _headers CDN)    |
| - Emite veredicto: MERGE_PERMITTED / REJECT_REGRESSION      |
+-------------------------------------------------------------+
```

---

## 5. Implementación Concreta en el Arsenal de HuntHub ($0 / Host Ligero)

1. **Herramienta de Regresión Visual (`tools/audit/visual_regression.mjs`)**:
   - Corre sobre `Playwright` nativo ya instalado en el workspace.
   - Captura y compara componentes críticos en 3 resoluciones estándar: `1440x900` (Desktop), `768x1024` (Tablet), `390x844` (Mobile).
   - Genera artefactos de imagen diferencial PNG en `docs/audit_snapshots/diff/`.
2. **Motor de Accesibilidad Axe-core Ligero (`tools/audit/axe_runner.mjs`)**:
   - Inyecta `axe.min.js` en headless Chromium mediante CDP.
   - Detecta contrastes de color insuficientes, etiquetas ARIA faltantes e hit-targets móviles menores a 44x44px.
3. **Compuerta Unificada de Evaluación (`tools/intelligence/eval_matrix.mjs`)**:
   - Amalgama AST Guard (`100/100`), Compliance Guard (`100/100`), RAG Hit@5 (`>=95%`) y Visual/A11y Pass (`0 blockers`).

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_AGENTIC_SOFTWARE_FACTORY_WEB_CRAFT_2026]] · [[CANON_SELF_EVOLVING_SOFTWARE_FACTORY_AND_SPECULATIVE_RAG_2026]] · [[TECNOLOGIAS_SOTA_STACK_CANON_2026]] · [[DESIGN_MASTERY_2026]] · #architecture_and_books
