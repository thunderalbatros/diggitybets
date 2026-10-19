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

# Manifiesto Maestro UX/UI — Operaciones Senior de Producto

#nng #material3 #hig #oled #yendo

> [!warning] Gate visual
> Todo nuevo componente UI o flujo de pantallas DEBE cumplir con las heurísticas y normativas de este manifiesto. El [[VISUAL_EXPERIENCE_SQUAD]] y el [[CREATIVE_STUDIO]] no aprueban UI que viole un pilar.

Canon local ([[YENDO_DNA]], [[YENDO_LIBRARY]], [[VISUAL_GUIDELINES]]) pisa a internet. Literatura Tier 1 asimilada por [[RESEARCH_AGENT]] (Vertex, 2026-08-29):

* [[resumen_20260829T233839Z]] — 10 heurísticas NN/g
* [[resumen_20260829T234203Z]] — Material 3 Content Design (style guide)
* [[resumen_20260829T234247Z]] — Material 3 Notifications
* [[resumen_20260829T234440Z]] — Apple HIG Color
* [[resumen_20260829T234535Z]] — Apple HIG Typography
* [[resumen_20260829T234617Z]] — Apple HIG Dark Mode

El hub `m3.material.io/.../content-design/overview` es un landing de video (Vertex lo descartó). El hub HIG `/foundations` es un índice. Se ingirieron los capítulos oficiales con cuerpo.

---

## 1. Investigación y Estrategia

### UX Researcher

**Mandato:** validar necesidades, comportamientos y dolores en CABA *antes* de inventar pantallas. Las heurísticas NN/g se auditan sobre evidencia, no sobre gusto.

**Reglas**

* Toda feature nueva nace de un dolor observable (entrevista, prueba de prototipo, o ticket QA con audio/foto). Prohibido diseñar "porque Instagram lo tiene".
* Pruebas de usabilidad sobre prototipo o build `preview`: 5–8 personas del segmento (noche CABA, thumb zone, una mano). Tarea única: *descubrir un Venue → leer Experiencia → Sumarme a un Grupo*.
* Medir: tiempo a primer tap útil, errores de nomenclatura (dijo "mesa" / "bar"), abandono en empty/error, comprensión del cupo `n/6`.
* El modelo mental del usuario pisa la jerga interna. Si dicen "juntada", el copy dice juntada; la entidad en código sigue siendo [[Grupo]].
* Grabar hallazgos en `.knowledge/` con YAML Guardián. No en chats sueltos.

**Checklist**

- [ ] Hipótesis y métrica de éxito escritas antes del test.
- [ ] Guion de 5 tareas; cero leading questions.
- [ ] Al menos un unhappy path (red caída, grupo lleno, search vacío).
- [ ] Hallazgos mapeados a una heurística NN/g (visibilidad, error, reconocimiento, etc.).
- [ ] El ADN local no se "valida" al revés: Dunbar 4–6, Tercer Lugar y cero swipe 1-a-1 no se negocian con un focus group.

### UX Strategist

**Mandato:** alinear negocio (liquidez presencial, RevPASH B2B) con la visión de largo plazo: tecnología invisible, actividad como puente.

**Reglas**

* Objetivo de producto = gente en un [[Venue]] real, no minutos de pantalla. Prohibido optimizar engagement adictivo.
* Roadmap: Cold Start barrial primero; features comunitarias masivas al icebox hasta densidad crítica.
* Cada apuesta estratégica declara: usuario, métrica IRL, costo cognitivo, veto de ADN.
* Companion Pass (+1) es palanca de reducción de fobia social, no vanity.
* Dual-sided: lo que ve el user en Radar debe ser defendible ante el partner (cupo, horario, ruido).

**Checklist**

- [ ] La feature mueve liquidez de Grupo (4–6) o se descarta / icebox.
- [ ] No fragmenta por demografía restrictiva.
- [ ] Hay empty state y recovery; no "pueblo fantasma".
- [ ] Se contrastó contra [[YENDO_DNA]] (fricción cero, safety, terminología).

---

## 2. Estructura y Contenido

### Diseñador UX (Interaction Designer)

**Mandato:** flujos, IA y wireframes con mínima carga cognitiva y prevención de errores. Ley de Jakob: el usuario ya aprendió Maps + sheet (Airbnb/Uber). No reinventar.

**Reglas**

* Navegación: mapa + [[YendoBottomSheet]] (peek / half / expanded). Prohibido navegar a una pantalla nueva para ver un Venue. Prohibido `@gorhom/bottom-sheet`.
* Información visible en contexto: cupo `n/6`, distancia, CTA. Reconocimiento > recuerdo. No pedir que recuerden un ID de otra pantalla.
* Prevención > diálogo. Deshabilitar "Sumarme" si no hay cupo; confirmar solo acciones irreversibles, y en ese caso decir la consecuencia (MD3), no "¿Estás seguro?".
* Salidas de emergencia en todo flujo de 2+ pasos (Cancelar / atrás / swipe-down del sheet). Optimistic UI: el tap pinta en 0 ms; el error se revierte con copy claro.
* Deep links y OAuth: solo hidratan sesión (`auth/callback`); no cargan tokens en el radar. Ver [[CYBERSECURITY_MASTER_PROTOCOL]].
* Thumb zone: hits ≥ 48 dp; CTA primario 56 dp. Search debounce 300 ms; nunca `onChangeText` → red.
* Unhappy paths orquestados (Carpincho + un CTA). Cero pantallas en blanco.

**Checklist**

- [ ] Wire o flujo cabe en 3 toques hasta "Sumarme" / "Armar plan".
- [ ] Empty, loading, error y éxito definidos.
- [ ] Estado del sistema visible (spinner Query, cupo, red).
- [ ] No hay callejón sin salida.
- [ ] Entidades: Venue / Experiencia / Grupo. Nunca "mesa" o "bar" genéricos.

### UX Writer

**Mandato:** voz rioplatense, sentence case, cero jerga. El texto guía; no adorna ni alarma.

**Reglas**

* Voz: cercana, concreta, de a pie. "Armar plan" / "Ponele un nombre a la juntada" / "Sumarme". Prohibido "Submit", "Proceed", "Error 500", "RPC failed".
* Sentence case en UI (MD3). Title Case solo para marca "Yendo". Palabras completas; sin "e.g.", "etc.", "FTS".
* Errores: qué pasó + qué hacer. "No hay venues con ese nombre cerca." + CTA limpiar búsqueda. Nunca culpar al user.
* Consecuencias, no miedo: "El grupo se llena en 6. Si te bajás, el cupo se libera."
* Notificaciones (si existen): sobre el user, no la marca. Título < 29 chars, cuerpo colapsado < 40. Sin nombre de app en el título. Sin "hoy/mañana". Sin ads. Opt-out visible. Cero humor forzado; el Carpincho deleita en UI, no en el push.
* No persistir copy que filtre PII. No tokens en deep links.

**Checklist**

- [ ] Un humano de CABA entiende el CTA sin contexto de ingeniería.
- [ ] Error ofrece salida.
- [ ] No hay Title Case ni anglicismos de dashboard.
- [ ] Push (si hay) pasa límites MD3 y no interrumpe onboarding.

---

## 3. Aspecto Visual y Sistemas

### Diseñador UI (Visual Designer)

**Mandato:** estética Dark-First, contraste OLED, tipografía y jerarquía. Clarity / Deference / Depth (HIG) sobre moda.

**Reglas**

* Tokens únicos: `src/constants/theme.ts`. Cero hex sueltos. Mapa: `customMapStyle` es la excepción (Google exige literales) y se alinean a `theme.colors`.
* Lienzo: `surfaceSolid` `#121212` / superficies elevadas más claras. Evitar blanco puro que "brilla" en dark (HIG). Contraste texto ≥ 4.5:1; body chico aspirar 7:1 (AAA). Color nunca es el único semáforo: cupo lleva número + color.
* Tipografía: Inter para lectura; Plus Jakarta Sans solo brand y joya `4/6`. Roles `typography.*` (display → footnote). Prohibido Ultralight/Thin. No mezclar una tercera familia. Tracking según `theme.ts`.
* Dynamic Type: layouts no se rompen; no truncar copy crítico con `...`. Iconos semánticos escalan con el texto.
* Touch 48 dp. Un acento `#FF5500` = CTA / escasez / pin activo. No pintar de naranja texto no accionable.
* Motion: UI thread, `withSpring(theme.physics.*)`, 60 FPS. 3D/WebGL lazy post-TTI. Ver [[MOTION_GRAPHICS_CODING]] y [[3D_TECHNICAL_ART_GUIDE]].
* Háptico de selection en pin; no heavy.

**Checklist**

- [ ] Contraste verificado sobre OLED (no solo en Figma light).
- [ ] Jerarquía: 1 acción primaria por snap de lámina.
- [ ] Cero ruido: cada elemento tiene propósito (heurística 8).
- [ ] Frame de Expo Web auditado con `npm run audit:ui` vs estas reglas.

### Design System Specialist

**Mandato:** crear, nombrar y mantener componentes RN reutilizables para que el squad no redibuje.

**Reglas**

* Átomo → molécula → organismo. Archivo < 150 líneas. Presentacional: sin `supabase.from`, sin Query.
* Nombre: `Yendo` + rol (`YendoBottomSheet`, `RadarSearchBar`). Prohibido `CustomButton2`.
* Estilo: `StyleSheet.create` al final. `className` erradicado. Inline solo insets / animated / onLayout.
* Variantes por composición de arrays, no por booleanos explosivos. Constantes `SCREAMING_SNAKE_CASE` para hits (48 / 56).
* Snapshots de contrato en [[VISUAL_GUIDELINES]] cuando el Radar cambia. Export en `src/components/index.ts`.
* Prohibido instalar UI kits (gorhom, NativeWind, paper) para "ir más rápido".
* Accesibilidad: `accessibilityLabel` en CTA e íconos-botón; `testID` para Maestro.

**Checklist**

- [ ] El componente no inventa tokens.
- [ ] Hay empty/disabled/loading si aplica.
- [ ] Cleanup de listeners / canvas en unmount.
- [ ] Documentado dónde se usa (Explore, Auth, sheet).

---

## 4. Liderazgo y Coordinación

### UX Lead / Manager

**Mandato:** defender al usuario en las decisiones de negocio, coherencia de punta a punta, QA visual antes de EAS production.

**Reglas**

* Veto de negocio que viole ADN: swipe 1-a-1, likes públicos, DMs pre-evento, grupos > 6, domicilios privados, métricas de vanidad.
* Coherencia: un flujo no puede decir "Grupo" en Radar y "mesa" en el push. Un sheet no puede tener física distinta a `theme.physics.sheetTransition`.
* QA visual obligatorio: `npx expo start -w` → `.knowledge/frames/latest_ui.png` → `npm run audit:ui`. No sustituye `tsc` ni Maestro. Test Lab Fase A para humo nativo.
* PR de UI: contrastar este manifiesto + [[VISUAL_GUIDELINES]] + [[CYBERSECURITY_MASTER_PROTOCOL]] (deep links, WebView, secretos en UI).
* Deuda visual se registra; no se "mergea y ya vemos". Icebox con condición de thaw, no olvido.
* El Carpincho es companion, no payaso de error. Delight después de claridad.

**Checklist pre-deploy**

- [ ] Heurísticas 1–10 pasadas en el flujo feliz y en un error.
- [ ] Copy rioplatense y terminología ubicua.
- [ ] Tokens + 48/56 dp + 3 snaps del Radar.
- [ ] VLM `audit:ui` sin discrepancias OLED/CTA bloqueantes.
- [ ] `tsc --noEmit` 0. No se pidió librería fuera de sheet.

---

### 🔗 Fuentes, APIs y URLs de Referencia

- **NN/g — 10 usability heuristics:** https://www.nngroup.com/articles/ten-usability-heuristics/
- **Material 3 — Content design overview (hub):** https://m3.material.io/foundations/content-design/overview
- **Material 3 — Style guide:** https://m3.material.io/foundations/content-design/style-guide
- **Material 3 — Notifications:** https://m3.material.io/foundations/content-design/notifications
- **Apple HIG — Foundations (índice):** https://developer.apple.com/design/human-interface-guidelines/foundations
- **Apple HIG — Color:** https://developer.apple.com/design/human-interface-guidelines/color
- **Apple HIG — Typography:** https://developer.apple.com/design/human-interface-guidelines/typography
- **Apple HIG — Dark Mode:** https://developer.apple.com/design/human-interface-guidelines/dark-mode
- **Expo Maps v57:** https://docs.expo.dev/versions/v57.0.0/sdk/maps/
- **Reanimated:** https://docs.swmansion.com/react-native-reanimated/

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[VISUAL_GUIDELINES]]
- [[MOTION_GRAPHICS_CODING]]
- [[3D_TECHNICAL_ART_GUIDE]]
- [[CYBERSECURITY_MASTER_PROTOCOL]]
- [[RESEARCH_AGENT]]
- [[YendoBottomSheet]]
- [[Número de Dunbar]]
- [[Terceros Lugares]]
- [[Capybara]]
- [[Reanimated]]
- [[resumen_20260829T233839Z]]
- [[resumen_20260829T234203Z]]
- [[resumen_20260829T234247Z]]
- [[resumen_20260829T234440Z]]
- [[resumen_20260829T234535Z]]
- [[resumen_20260829T234617Z]]
- [[Supabase]]
- [[Capybara Mascot]]
