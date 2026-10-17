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

# 🧠 Tratado Canónico: Experiencia Humana, Heurística Empírica y Accesibilidad Universal (2026)

## 1. Visión y Objetivos Fundacionales
El ADN de Yendo rechaza la retención digital tóxica (*doomscrolling*) y prioriza la conexión humana presencial (*Time Well Spent*) en Terceros Lugares de Buenos Aires. Este tratado integra las **10 Heurísticas de Usabilidad de Nielsen Norman Group**, las **Leyes de UX**, la accesibilidad universal **WCAG 2.2 AAA**, el diseño inclusivo de Microsoft, el sistema de color **Material 3 / Apple HIG** y la filosofía de claridad sin fricción cognitiva (*"Don't Make Me Think"* de Steve Krug).

---

## 2. Principios de Interacción y Accesibilidad

### 2.1 Las 10 Heurísticas de Usabilidad (Jakob Nielsen) aplicadas a Yendo
1. **Visibilidad del Estado del Sistema:** Feedback síncrono (< 100ms) en cada acción (chips de filtro activos, pases confirmados con animaciones y hápticos).
2. **Correspondencia entre el Sistema y el Mundo Real:** Lenguaje rioplatense auténtico ("¡Yendo!", "Chequear lugar", "Sumarse al grupo", "Armar plan"), evitando jerga técnica o extranjerismos forzados.
3. **Control y Libertad del Usuario:** Posibilidad de cancelar o retroceder en cualquier paso del wizard de creación de eventos sin pérdida de datos (*drafts en MMKV*).
4. **Consistencia y Estándares:** Respeto estricto a las convenciones de plataforma de iOS y Android (modales, gestos de swipe, safe areas).
5. **Prevención de Errores:** Confirmación explícita antes de abandonar un grupo o descartar un plan en edición.
6. **Reconocimiento antes que Recuerdo:** Mostrar las fotos y nombres de los integrantes de la célula Dunbar directamente en la tarjeta de evento sin exigir navegación profunda.
7. **Flexibilidad y Eficiencia de Uso:** Accesos rápidos desde la *Thumb Zone* inferior y filtros barriales de 1 toque (Palermo, Recoleta, San Telmo, etc.).
8. **Diseño Estético y Minimalista:** Eliminación de ruido visual, paleta OLED Dark (#121212) y foco en el contenido cultural/gastronómico.
9. **Ayuda a los Usuarios a Reconocer, Diagnosticar y Recuperarse de Errores:** Mensajes de error constructivos con opciones de reintento automático o alternativas cercanas.
10. **Ayuda y Documentación:** Mascota "El Carpincho" como anfitrión social contextual y consejos empáticos sin saturar la pantalla.

### 2.2 Leyes Psicológicas de UX
- **Ley de Fitts & Thumb Zone (Steven Hoober):** Todos los botones de acción primaria (`InteractiveButton`, `BottomThumbNav`, `FloatingActionButton`) se ubican en la zona inferior de alcance natural del pulgar con una altura mínima de **48dp** (superando el estándar mínimo de 44dp de Apple).
- **Ley de Hick:** Reducción del número de opciones de entrada en el onboarding y filtros a un máximo de 4 a 5 alternativas para minimizar la carga cognitiva y el tiempo de decisión.
- **Ley de Miller & Número de Dunbar:** La capacidad de grupos sociales se restringe estrictamente a **4–6 personas** para garantizar comodidad psicológica y conversaciones significativas.
- **Efecto Zeigarnik:** Barra de progreso en el wizard de onboarding (5 pasos) para motivar la completitud del perfil.

### 2.3 Accesibilidad Universal (WCAG 2.2 Nivel AAA)
- **Contraste Cromático:** Ratio de contraste texto/fondo superior a **7:1** para texto normal y **4.5:1** para texto grande sobre fondos oscuros (#121212).
- **Touch Target Sizes:** Todo elemento táctil interactivo posee un área mínima de **48 × 48 dp** según directrices de Google M3 y WCAG 2.5.8.
- **Soporte de Dynamic Type & Screen Readers:** Todo componente de texto utiliza tipografías escalables compatibles con VoiceOver (iOS) y TalkBack (Android), integrando propiedades `accessibilityLabel`, `accessibilityHint` y `accessibilityRole`.

### 2.4 Ergonomía Visual: Sistemas de Color Dark-First (M3 & Apple HIG)
- **Color Base:** #121212 (Fondo oscuro OLED para ahorro de batería y menor fatiga visual nocturna).
- **Acento Primario:** #FF5500 (Naranja Yendo de alta energía y calidez social).
- **Superficies Elevadas:** Elevación con gradientes tonales y translucidez de cristal (*Glassmorphism* controlado con `BlurView`) en lugar de sombras pesadas.

---

## 3. Matriz de Fuentes Canónicas Indexadas

| # | Título de la Fuente | URL Canónica | Rol en Yendo |
| :-: | :--- | :--- | :--- |
| **31** | NN/g 10 Usability Heuristics | [nngroup.com/.../ten-usability-heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) | Marco de evaluación heurística para flujos y pantallas. |
| **32** | Material Design 3 Content Design | [m3.material.io/.../content-design](https://m3.material.io/foundations/content-design/overview) | Principios de redacción de contenido, claridad y voz de producto. |
| **33** | Apple HIG Foundations Master | [developer.apple.com/.../foundations](https://developer.apple.com/design/human-interface-guidelines/foundations) | Ergonomía, tipografía, diseño espacial y gestos en iOS. |
| **34** | Laws of UX Comprehensive Library | [lawsofux.com](https://lawsofux.com/) | Fundamentos de psicología cognitiva aplicados al diseño de interfaces. |
| **35** | W3C WCAG 2.2 Recommendation | [w3.org/TR/WCAG22](https://www.w3.org/TR/WCAG22/) | Estándar internacional de accesibilidad digital Nivel AAA. |
| **36** | Microsoft Inclusive Design Manual | [inclusive.microsoft.design](https://inclusive.microsoft.design/) | Metodología de diseño para diversidad funcional y contextos variables. |
| **37** | NN/g Touch Target Size Research | [nngroup.com/.../touch-target-size](https://www.nngroup.com/articles/touch-target-size/) | Evidencia científica para hitboxes >= 48dp en interfaces táctiles. |
| **38** | Material Design 3 Color System | [m3.material.io/.../color/system](https://m3.material.io/styles/color/system/overview) | Paletas dinámicas, contraste de luminancia y tonalidades de superficie. |
| **39** | Apple HIG Color Guidelines | [developer.apple.com/.../color](https://developer.apple.com/design/human-interface-guidelines/color) | Armonía visual, semántica de colores del sistema y modo oscuro. |
| **40** | Steve Krug "Don't Make Me Think" | [sensible.com/dont-make-me-think](https://sensible.com/dont-make-me-think/) | Filosofía de claridad instantánea, cero fricción y navegación obvia. |

---

### 🔗 Fuentes, APIs y URLs de Referencia
- **NN/g Heuristics:** https://www.nngroup.com/articles/ten-usability-heuristics/
- **Material 3 Content Design:** https://m3.material.io/foundations/content-design/overview
- **Apple HIG Foundations:** https://developer.apple.com/design/human-interface-guidelines/foundations
- **Laws of UX:** https://lawsofux.com/
- **W3C WCAG 2.2:** https://www.w3.org/TR/WCAG22/
- **Microsoft Inclusive Design:** https://inclusive.microsoft.design/
- **NN/g Touch Targets:** https://www.nngroup.com/articles/touch-target-size/
- **Material 3 Color System:** https://m3.material.io/styles/color/system/overview
- **Apple HIG Color:** https://developer.apple.com/design/human-interface-guidelines/color
- **Steve Krug Usability:** https://sensible.com/dont-make-me-think/

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[UX_UI_MASTER_MANIFESTO]]
- [[CANON_ESTUDIO_PSICOLOGIA_ETICA]]
- [[DESIGN_SYSTEM_MAP]]
- [[Número de Dunbar]]
- [[Terceros Lugares]]
- [[Capybara Mascot]]
