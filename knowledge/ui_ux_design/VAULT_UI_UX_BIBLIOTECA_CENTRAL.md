**Alcance:** Compendio maestro de leyes de UX/UI, heurísticas de Nielsen, diseño emocional de Don Norman y arquitectura de sistemas de diseño. (Fuente migrada y curada desde Yendo Mobile Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

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

# CANON UI/UX — Biblioteca Central (Libros · Docs oficiales · Motion · Design Systems · A11y · QA · Performance · Inspiración · Cursos)

**Catálogo operativo** del "cerebro UI" del equipo de agentes. Registra las **fuentes de alta calidad** de la curación del CTO (85 ítems) y marca **qué ya estaba** en la bóveda y **qué es net-new**. No es corpus: RESEARCH destila **un** ID bajo demanda vía Job GCP. [[YENDO_DNA]] + [[YENDO_LIBRARY]] + [[OSS_WHITELIST_REGISTRY]] pisan cualquier ficha.

> [!warning] Filtro Trust Tier (rule 5 [[RESEARCH_AGENT]])
> Entra: oficial (Apple/Google/Meta/Web Platform/SWM/Figma/W3C), académico, NN/g, ingeniería Tier-2 (Shopify/Callstack/Software Mansion). **Galerías de inspiración** (Dribbble, Awwwards, Mobbin…) entran **solo como catálogo visual de referencia humana**, nunca como corpus a destilar ni como única fuente de UX.

> [!info] Complementariedad (no duplicar)
> Este archivo **no repite** lo ya canonizado. El stack oficial vive en [[Directorio_Maestro_Fuentes_Oficiales]]; Rive/Figma/Reanimated en [[CANON_UI_UX_RIVE_FIGMA]]; SSOT visual del Radar en [[VISUAL_GUIDELINES]]; heurísticas de producto en [[UX_UI_MASTER_MANIFESTO]]; libros de negocio en [[CSO_CANON_COURSES_BOOKS]]. Acá viven las fuentes **de diseño visual/UX** que faltaban.

> [!important] VERTEX OFFLOAD (no quemar tokens de Cursor)
> Libros (PDF/EPUB), cursos y videos se destilan en GCP (`yendo-agent-research`), no pegando corpus en el chat. Cursor consume el destilado de 1 renglón. Comandos al pie.

---

## 0. Cobertura — qué YA estaba en el cerebro (dedupe)

| Fuente del CTO | Estado previo | Dónde |
| --- | --- | --- |
| The Design of Everyday Things (Norman) | ✅ corpus | `main_library/The Design of Everyday Things*.txt` |
| Don't Make Me Think (Krug) | ✅ corpus | `main_library/Don't Make Me Think*.txt` |
| Laws of UX (Yablonski) | ✅ corpus | `main_library/Laws of UX_ Pip Decks*.txt` + [[lawsofux]] |
| Sprint (Knapp) | ✅ corpus | `main_library/Sprint_*.txt` |
| Microinteractions (Saffer) | ✅ catálogo | [[CANON_UI_UX_RIVE_FIGMA]] ILL-01 |
| Atomic Design (Frost) | ✅ catálogo | [[CANON_UI_UX_RIVE_FIGMA]] FIG-03 |
| Designing Interfaces (Tidwell) | ✅ catálogo | [[CANON_UI_UX_RIVE_FIGMA]] ILL-08 |
| Design+Code | ✅ catálogo | [[CANON_UI_UX_RIVE_FIGMA]] ANI-03 / FIG-05 |
| Apple HIG (gestures/color/typo/layout) | ✅ parcial | [[VISUAL_GUIDELINES]] · [[CANON_UI_UX_RIVE_FIGMA]] FIG-09 / MOB-01 |
| Material Design 3 (base + tokens) | ✅ parcial | [[Directorio_Maestro_Fuentes_Oficiales]] · FIG-10 |
| Reanimated / Gesture Handler / FlashList | ✅ | [[Directorio_Maestro_Fuentes_Oficiales]] · DEV-01/08/12 |
| Figma Auto Layout / Variants | ✅ catálogo | [[CANON_UI_UX_RIVE_FIGMA]] FIG-01 / FIG-06 |
| NN/g heurísticas / mobile usability | ✅ parcial | [[VISUAL_GUIDELINES]] · MOB-06 |
| Mobile-first (Wroblewski) | ✅ corpus | `main_library/mobile-first.txt` |

Todo lo de abajo (LIB / DOC / MOT / DS / A11Y / QA / PERF / INSP / EDU) es **net-new** o **profundización** que faltaba en la bóveda.

---

## A. Libros centrales — net-new (LIB)

| ID | Libro | Tier | Aplicación directa a Yendo | Fricción DNA |
| --- | --- | --- | --- | --- |
| LIB-01 🔴 | **Refactoring UI** — Wathan & Schoger | Oficial (autores) | Jerarquía por peso/color no por tamaño; spacing generoso; profundidad con capas y sombras suaves; limitar la paleta; empezar por el contenido. **La fuente #1 para subir el score visual del YDS.** | Ninguna. Refuerza Dark-Vibrancy |
| LIB-02 🔴 | **Practical UI** — Adham Dannaway | Oficial | Reglas accionables de spacing (múltiplos), contraste, tipografía, alineación, estados. Checklist para el UI_AGENT | Ninguna |
| LIB-03 🟠 | **About Face** — Cooper et al. | O'Reilly | Goal-Directed Design, comportamiento, arquitectura de interacción (flujos crear-grupo / join) | Evitar sobre-ingeniería de flujos MVP |
| LIB-04 🟠 | **Designing for Emotion** — Aarron Walter | A Book Apart | Personalidad y "momentos memorables": quórum, join, publicación, error recuperable. Base del [[Capybara]] | No cruzar a dark patterns / dopamina tóxica |
| LIB-05 🔴 | **100 Things Every Designer Needs to Know About People** — Weinschenk | Pearson | Atención, memoria, percepción, carga cognitiva → decisiones de layout y copy | Ninguna |
| LIB-06 🟠 | **Universal Principles of Design** — Lidwell/Holden/Butler | Rockport | Enciclopedia de principios (Ley de Fitts, Hick, Gestalt) para arbitrar discusiones | Ninguna |
| LIB-07 🟠 | **Lean UX** — Gothelf & Seiden | O'Reilly | No separar UX/producto/dev; hipótesis → MVP → aprendizaje | Alinear a Show-Up, no vanity metrics |
| LIB-08 🟠 | **Designing with the Mind in Mind** — Jeff Johnson | O'Reilly | Percepción visual, cognición y atención con base neurocientífica | Ninguna |

---

## B. Documentos oficiales — profundización de subpáginas (DOC)

Apple HIG y MD3 estaban a nivel raíz; el equipo necesita las **subpáginas específicas** como fiches citables.

| ID | Doc | Tier | Uso en Yendo |
| --- | --- | --- | --- |
| DOC-01 | Apple HIG — Feedback | Oficial | Toda acción crítica (join, quórum, pago) comunica qué ocurrió |
| DOC-02 | Apple HIG — Buttons | Oficial | Un solo `InteractiveButton`; evitar que cada agente reinvente botones |
| DOC-03 | Apple HIG — Navigation and Search | Oficial | Explorar, filtros, mapa, Live Search |
| DOC-04 | Apple HIG — Inclusion | Oficial | A11y desde el diseño, no parche posterior |
| DOC-05 | Apple HIG — Feedback/Color reuse | Oficial | No reusar el naranja `#FF5500` para 2 significados distintos |
| DOC-06 | Material 3 — Motion | Oficial | Motion como sistema (duración/easing), no animaciones sueltas |
| DOC-07 | Material 3 — Accessibility | Oficial | Contraste, target size, dynamic type |
| DOC-08 | Web UI / Vanilla & Modern Frontend — Accessibility | Meta oficial | `accessibilityRole/Label/State` para VoiceOver/TalkBack |
| DOC-09 | Web UI / Vanilla & Modern Frontend — Animated (legacy) | Meta oficial | Solo compat; motion nuevo = Reanimated (ley DEV-01) |
| DOC-10 | Web Platform — Fonts | Oficial | Carga OTF/TTF (Inter + Plus Jakarta) — ya cableado en `App.tsx` |
| DOC-11 | Web Platform — Accessibility | Oficial | Guía A11y específica de Web Platform |

> [!note] Web Platform Router (doc #34): permanece **VETO** para navegación (nav = React Navigation v7, [[CANON_UI_UX_RIVE_FIGMA]] DEV-04). Se cataloga como lectura, no como adopción.

---

## C. Motion & Gestures — subpáginas (MOT)

| ID | Fuente | Tier | Uso en Yendo |
| --- | --- | --- | --- |
| MOT-01 | Reanimated — Fundamentals / Your First Animation | SWM oficial | Onboarding del MOTION_ART_DIRECTOR; shared values, timing, spring |
| MOT-02 | Reanimated — Animations | SWM oficial | `withSpring` calibrado (`theme.physics`) |
| MOT-03 | Reanimated — Layout Animations | SWM oficial | Entradas/salidas de cards, láminas, listas |
| MOT-04 | Gesture Handler — Gestures | SWM oficial | Pan/swipe/long-press compuestos en UI thread |
| MOT-05 | Gesture Handler — Touchables | SWM oficial | Migrar de `Touchable*` legacy |
| MOT-06 | Apple HIG — Motion | Oficial | Respetar "Reduce Motion"; movimiento con propósito |
| MOT-07 | Material Motion System | Oficial | Vocabulario de transiciones (shared axis, fade through) |

---

## D. Design Systems — net-new (DS)

| ID | Fuente | Tier | Uso en Yendo |
| --- | --- | --- | --- |
| DS-01 | Design Systems Handbook (DesignBetter) | InVision/oficial | Cómo gobernar el YDS (tokens → componentes → patrones) |
| DS-02 | Shopify Polaris | Oficial | **Estudiar la documentación** de componentes/estados; NO copiar su estética |
| DS-03 | Atlassian Design System | Oficial | Referencia de estados, consistencia empresarial |
| DS-04 | Adobe Spectrum | Oficial | Escalabilidad y arquitectura de componentes/tokens |
| DS-05 | Figma — Components Collection | Oficial | Nested instances, properties, variants, slots → mapear a YDS |

---

## E. Accessibility — net-new / actualización WCAG (A11Y)

| ID | Fuente | Tier | Uso en Yendo |
| --- | --- | --- | --- |
| A11Y-01 🔴 | **WCAG 2.2** (W3C Recommendation, 05-oct-2023) | W3C oficial | Sube el listón sobre WCAG 2.1 (ILL-12). SC 2.5.8 Target Size (Min) = **24×24 px** (AA); SC 2.5.5 (Enhanced) = **44×44** (AAA). Yendo `touch.min` 48 / `cta` 56 → **cumple ambos** |
| A11Y-02 | WCAG 2.2 — Understanding | W3C oficial | Percepción, estructura, input, comprensión, robustez, dragging alternatives |
| A11Y-03 | WAI-ARIA Authoring Practices (APG) | W3C oficial | Roles/estados/patrones (referencia conceptual; RN mapea a `accessibilityRole`) |
| A11Y-04 | Material 3 — Accessibility | Oficial | (= DOC-07) contraste/target/dynamic type |
| A11Y-05 | web.dev — Accessibility | Google oficial | Fundamentos de a11y con ejemplos verificables |
| A11Y-06 | Apple HIG — Inclusion | Oficial | (= DOC-04) |
| A11Y-07 | Web UI / Vanilla & Modern Frontend — Accessibility | Meta oficial | (= DOC-08) implementación real en el bundle |

---

## F. QA visual y arquitectura de componentes (QA) — referencia, NO stack

> [!warning] No son dependencias del proyecto
> Storybook / Chromatic **no están** en `package.json` ni aprobados en [[OSS_WHITELIST_REGISTRY]]. Se catalogan como **lectura de método** (cómo un equipo prueba componentes/visual regression). Instalarlos exige Comité + spec SDD. El gate visual actual de Yendo es la **Vision Loop** (`npm run audit:ui`).

| ID | Fuente | Tier | Nota |
| --- | --- | --- | --- |
| QA-01 | Storybook — Testing / A11y / Visual / Interaction | Oficial | Método de referencia; no adoptar sin Comité |
| QA-02 | Chromatic | Oficial | Regresión visual automatizada (idea para CI futura) |

---

## G. Performance Web UI / Vanilla & Modern Frontend (PERF)

| ID | Fuente | Tier | Uso en Yendo |
| --- | --- | --- | --- |
| PERF-01 | FlashList — Performance | Shopify oficial | Medir en **release**; cuidar costo de hijos, reciclaje, memoización |
| PERF-02 | FlashList — List Profiling | Shopify oficial | Detectar blank cells / jank en feed |
| PERF-03 | Web UI / Vanilla & Modern Frontend — Performance Overview | Meta oficial | UI thread vs JS thread, 60/120 FPS, TTI < 2s |
| PERF-04 | Web Platform — Optimize / Performance | Oficial | Bundle, assets, imágenes; cold start |

---

## H. Biblioteca visual de inspiración (INSP) — catálogo humano, no corpus

> [!warning] Uso con cautela (Trust Tier)
> Estas galerías entrenan el ojo del equipo para **reconocer** buenas soluciones; **no** se destilan a la bóveda ni se citan como evidencia de UX. Dribbble/Awwwards: inspiración visual, pésima única fuente de UX. Toda decisión se ancla a [[YENDO_DNA]] / [[UX_UI_MASTER_MANIFESTO]].

| ID | Fuente | Fuerte para |
| --- | --- | --- |
| INSP-01 | Mobbin | UI móvil real por flujos (fuente #1) |
| INSP-02 | Pttrns | Patrones específicos mobile |
| INSP-03 | UI Sources | Flujos reales, no solo screenshots |
| INSP-04 | Really Good UX | Casos y patrones de UX |
| INSP-05 | Growth.Design | Psicología de producto en casos animados |
| INSP-06 | Dribbble | Inspiración visual (con cautela) |
| INSP-07 | Awwwards | Composición, branding, art direction |
| INSP-08 | UI Design Daily | Práctica de patrones visuales |
| INSP-09 | Page Flows | Journeys completos end-to-end |
| INSP-10 | Design Details | Análisis de decisiones de diseño |

---

## I. Cursos / formación estructurada (EDU)

| ID | Curso | Tier | Uso |
| --- | --- | --- | --- |
| EDU-01 | Google UX Design Professional Certificate | Coursera/Google | Base para UX/Product |
| EDU-02 | Interaction Design Foundation | IxDF | UX, interaction design, usability |
| EDU-03 | NN/g — UX Training | NN/g Tier-1 | Research, usabilidad, heurísticas, journey mapping |
| EDU-04 | Shift Nudge | Curso | UI/Visual Design (para UI_AGENT) |

---

## Destilado accionable inmediato (para el score visual)

> [!info] Top-5 principios ya utilizables (sin esperar la ingesta GCP)
> 1. **Refactoring UI — jerarquía por color/peso, no por tamaño.** Grises semánticos (`textPrimary/Secondary/Tertiary`), no fuentes gigantes. El YDS ya lo hace; el riesgo es `textLegal`.
> 2. **Refactoring UI — spacing generoso y sistemático.** Todo en múltiplos de 8 (`spacing`). Preferir "demasiado" espacio.
> 3. **Practical UI — contraste mínimo real.** Texto pequeño (≤14pt) necesita ≥ 4.5:1 sobre `#121212`. Validar cada gris.
> 4. **WCAG 2.2 SC 2.5.8 — target ≥ 24px (44 AAA).** Yendo cumple con 48/56 dp; mantener en chips/close.
> 5. **HIG Color — un color, un significado.** `#FF5500` = marca/CTA/escasez. No usarlo también como "warning".

---

## Prioridad de destilación (GCP, no Cursor)

Orden para subir el score visual de la app **hoy**:

1. LIB-01 Refactoring UI (jerarquía, spacing, color, profundidad)
2. LIB-02 Practical UI (checklist accionable)
3. A11Y-01 WCAG 2.2 (target size + contraste)
4. DOC-01/DOC-05 Apple HIG Feedback + Color
5. LIB-05 100 Things (carga cognitiva)

Gatillo (una URL o query por Job — patrón de [[CSO_CANON_COURSES_BOOKS]]):

```powershell
gcloud run jobs execute yendo-agent-research --region southamerica-east1 --async --update-env-vars=CLOUD_AGENT_JOB=research-web,CLOUD_AGENT_QUERY=Refactoring UI Wathan Schoger hierarchy spacing color depth summary
```

```powershell
gcloud run jobs execute yendo-agent-research --region southamerica-east1 --async --update-env-vars=CLOUD_AGENT_JOB=research-web,CLOUD_AGENT_URL=https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
```

PDFs/EPUB de LIB-01…LIB-08: subir a `gs://yendo-assets-caba/business-ingest/` + viñeta en [[INGEST_QUEUE]]. No adjuntar al chat.

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[VISUAL_GUIDELINES]]
- [[UX_UI_MASTER_MANIFESTO]]
- [[CANON_UI_UX_RIVE_FIGMA]]
- [[Directorio_Maestro_Fuentes_Oficiales]]
- [[CSO_CANON_COURSES_BOOKS]]
- [[OSS_WHITELIST_REGISTRY]]
- [[YDS_Catalog]]
- [[Número de Dunbar]]
- [[Capybara]]
- [[Reanimated]]
- [[YendoBottomSheet]]
- [[Rive]]
- [[Capybara Mascot]]
- [[Don Norman - Design of Everyday Things]]
