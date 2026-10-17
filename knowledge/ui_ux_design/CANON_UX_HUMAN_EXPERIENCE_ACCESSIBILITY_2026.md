---
version: 1.1.0
tipo: research
tags:
  - web-application
  - ui-ux
  - accessibility
  - human-experience
autores: [RESEARCHER_AGENT, MANAGER_AGENT]
ultima_revision: 2026-10-17
---

# 🧠 Tratado Canónico: Experiencia Humana, Heurística Empírica y Accesibilidad Web Universal (2026)

## 1. Visión y Objetivos Fundacionales
La arquitectura de HuntHub Web prioriza interfaces web inmersivas, claras y de alto rendimiento para transmisiones en vivo y participación de espectadores. Este tratado integra las **10 Heurísticas de Usabilidad de Nielsen Norman Group**, las **Leyes de UX**, la accesibilidad universal **WCAG 2.2 AAA**, el diseño inclusivo moderno, el sistema ergonómico de modo oscuro OLED y la filosofía de claridad instantánea (*"Don't Make Me Think"* de Steve Krug) adaptada a aplicaciones web interactivas y overlays de OBS.

---

## 2. Principios de Interacción y Accesibilidad Web

### 2.1 Las 10 Heurísticas de Usabilidad (Jakob Nielsen) aplicadas a HuntHub Web
1. **Visibilidad del Estado del Sistema:** Feedback síncrono (< 100ms) en cada acción (ruleta girando, votos de chat recibidos, estado de rondas en vivo, micro-animaciones con WAAPI).
2. **Correspondencia entre el Sistema y el Mundo Real:** Lenguaje directo, claro y predecible ("Girar Ruleta", "Verificar Apuesta", "Unirse al Torneo", "Retirar"), evitando ambigüedades técnicas.
3. **Control y Libertad del Usuario:** Posibilidad de cancelar acciones pendientes, alternar modos de vista (Overlays compactos vs Dashboard completo) y cerrar modales con la tecla `Escape` o clic exterior.
4. **Consistencia y Estándares:** Convenciones web universales (links, botones semánticos, navegación accesible, atajos de teclado estandarizados).
5. **Prevención de Errores:** Confirmación explícita antes de reiniciar un torneo o vaciar listas de participantes activos.
6. **Reconocimiento antes que Recuerdo:** Mostrar claramente los multiplicadores, historial reciente de tiradas y balances en pantalla sin exigir navegación profunda.
7. **Flexibilidad y Eficiencia de Uso:** Atajos de teclado para moderadores y streamers (Space para girar, R para reiniciar), soporte touch en dispositivos móviles y layouts optimizados para OBS.
8. **Diseño Estético y Minimalista:** Eliminación de ruido visual, paleta OLED Dark (#0b0e14 / #121620) con acentos estratégicos en verde neón (#53fc18) y dorado (#ffd700), priorizando la legibilidad en streaming.
9. **Ayuda a los Usuarios a Reconocer y Diagnosticar Errores:** Mensajes de error claros ("Entrada inválida", "Conexión reconectando...") con reintentos automáticos no intrusivos.
10. **Ayuda y Documentación:** Reglas de participación y verificación de equidad (Provably Fair) accesibles en 1 clic.

### 2.2 Leyes Psicológicas de UX en la Web
- **Ley de Fitts:** Botones de acción primaria (`#spin-btn`, `#join-btn`) con hitboxes generosas (mínimo 44 × 44 px en desktop y 48 × 48 px en mobile web) con estados de foco visibles.
- **Ley de Hick:** Reducción de opciones de menú y configuración a agrupaciones semánticas claras (Ruleta, Torneo 1v1, Bonushunts, Ajustes).
- **Ley de Miller:** Límites de elementos activos por vista en paneles de control (7 ± 2 elementos por agrupación visual) para evitar fatiga cognitiva del streamer en vivo.
- **Ley de Jakob:** Los usuarios pasan la mayor parte de su tiempo en otros sitios web; los patrones de navegación, inputs numéricos y modales deben comportarse de forma estándar y predecible.

### 2.3 Accesibilidad Universal (WCAG 2.2 Nivel AAA)
- **Contraste Cromático:** Ratio de contraste texto/fondo superior a **7:1** para texto normal y **4.5:1** para texto grande sobre fondos oscuros.
- **Navegación por Teclado y Focus States:** Todos los elementos interactivos cuentan con `focus-visible` distintivo, navegación secuencial mediante `Tab` y roles ARIA semánticos (`role="dialog"`, `role="status"`, `aria-live="polite"` para alertas de ganadores).
- **Reducción de Movimiento (`prefers-reduced-motion`):** Respeto a las preferencias del sistema operativo desactivando animaciones continuas o efectos de partículas intensos para usuarios sensibles.

### 2.4 Ergonomía Visual: Dark Casino Theme
- **Color Base:** #0a0d14 / #10141e (Superficies oscuras con bajo consumo y descanso visual).
- **Acento Primario:** #53fc18 (Verde neón Kick / high-visibility).
- **Acento Secundario:** #ffd700 (Dorado de victoria / torneos).
- **Superficies Elevadas:** Translucidez sutil de cristal (*Glassmorphism* controlado con `backdrop-filter: blur(12px)` y bordes sutiles de 1px) con mínimo impacto en GPU para overlays de OBS.

---

## 3. Matriz de Fuentes Canónicas Indexadas

| # | Título de la Fuente | URL Canónica | Rol en HuntHub Web |
| :-: | :--- | :--- | :--- |
| **31** | NN/g 10 Usability Heuristics | [nngroup.com/.../ten-usability-heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) | Marco de evaluación heurística para flujos y pantallas. |
| **32** | W3C WCAG 2.2 Recommendation | [w3.org/TR/WCAG22](https://www.w3.org/TR/WCAG22/) | Estándar internacional de accesibilidad web Nivel AAA. |
| **33** | Laws of UX Comprehensive Library | [lawsofux.com](https://lawsofux.com/) | Fundamentos de psicología cognitiva aplicados al diseño web. |
| **34** | MDN Web Accessibility Guide | [developer.mozilla.org/.../Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) | Implementación de semántica HTML5, ARIA y contrastes. |
| **35** | Steve Krug "Don't Make Me Think" | [sensible.com/dont-make-me-think](https://sensible.com/dont-make-me-think/) | Claridad instantánea y navegación sin fricción. |

---

## Relaciones de Contexto
- [[CANON_DESIGN_SYSTEMS_ALLA_KHOLMATOVA]]
- [[CANON_REFACTORING_UI_WATHAN_SCHOGER]]
- [[CANON_PRACTICAL_UI_ADHAM_DANNAWAY]]
- [[CANON_ELEMENTS_OF_TYPOGRAPHIC_STYLE_AND_GRIDS]]
