# BRIEF MAESTRO — Suite de engagement para streams de casino en Kick
**Nombre provisorio del producto: HuntHub** (el usuario lo puede cambiar; no uses la palabra "Kick" ni su logo en el nombre o la marca del producto).

> Destinatario: el Manager de Antigravity y todo el equipo de agentes.
> Idioma con el usuario: español rioplatense, simple, sin jerga sin explicar. Código, identificadores y commits: inglés. Documentación para el usuario: español.

---

## 0. PRIMERAS ACCIONES DEL MANAGER (antes de escribir una sola línea de código)

1. Guardá este brief completo en `docs/BRIEF.md`.
2. Los archivos de reglas de Antigravity tienen un tope de ~12.000 caracteres cada uno. Por eso, derivá del brief: `AGENTS.md` (secciones 2, 3 y 4 resumidas, ≤12k caracteres), `.agents/rules/*.md` (uno por tema: compliance, seguridad, estilo de código, comunicación con el usuario) y `.agents/workflows/` con comandos reutilizables (`/research-sweep`, `/new-module`, `/qa-gate`, `/release-check`). Verificá en la documentación oficial de tu versión de Antigravity si la carpeta es `.agents/` o `.agent/`.
3. Todo el conocimiento que investiguen se convierte en skills (`<carpeta-de-skills>/<tema>/SKILL.md`) con descripciones precisas, para cargarse bajo demanda y no saturar el contexto.
4. Creá `docs/STATUS.md` (fase actual, tareas, bloqueos, decisiones pendientes del usuario) y actualizalo después de cada hito.
5. Trabajá en modo Plan: presentá como artifact el plan de Fase 0 + Fase 1 y esperá aprobación antes de ejecutar.

---

## 1. MISIÓN

Construir desde cero, **con costo cero**, una suite integrada para el engagement de espectadores de un canal de casino online (slots) en kick.com. Cuatro piezas que trabajan juntas:

- **Bot de chat** (lee comandos, responde con moderación).
- **Panel de control** (para el streamer y sus mods).
- **Overlays para OBS** (browser sources, transparentes).
- **Sitio web público** (hosting gratuito inicialmente).

**Módulos:**
- **M1 Núcleo de chat:** ingesta de chat, comandos, "pool de activos" (usuarios con al menos un mensaje en los últimos 30 s).
- **M2 Community Bonus Hunt** con panel de slots.
- **M3 Guess the Balance.**
- **M4 Batallas 1v1.**
- **M5 Torneo de 8 (bracket).**
- **M6 Panel admin, overlays y sitio público.**

**Diferencial:** hoy el streamer necesita varias herramientas sueltas (bots de puntos/sorteos como WenBot, KickBotPro, KickAway; torneos como Challonge; trackers como bonushunt.gg y bonustracker.pro). Esta suite integra todo: chat → panel → overlay → sitio. Los referentes se estudian **solo** desde sus páginas públicas y documentación, para entender alcance funcional y estándares del rubro. **No se copia** su código, diseño, textos, marca ni assets.

---

## 2. CONTEXTO Y RESTRICCIONES DURAS

- **Usuario:** emprendedor solo, sin formación previa en programación ni diseño. Se asume que es el dueño/streamer del canal (confirmalo en Fase 0). Aprueba en "gates". Explicale todo con palabras simples.
- **Hardware:** notebook HP 250 G8 (verificá CPU/RAM/SO en Fase 0) e internet de 600 Mb de bajada. El desarrollo y la operación en vivo deben ser livianos: sin Docker, sin modelos de IA locales, sin servicios pesados en segundo plano. Los overlays deben consumir poca CPU dentro de OBS.
- **Presupuesto: USD 0 / ARS 0, sin tarjeta de crédito.**
- **Tu propia limitación (modelo rápido):** trabajá en tareas chicas (≤ ~300 líneas por cambio), guardá el contexto en archivos (no en memoria), escribí tests primero, **verificá cada API en su documentación oficial antes de usarla** y no inventes endpoints, campos ni límites. Si no podés verificar algo, decilo.
- **Etiquetado obligatorio en todo documento:** `[VERIFICADO: fuente, fecha]` para hechos comprobados y `[ASUNCIÓN]` para lo no comprobado.

---

## 3. REGLAS INNEGOCIABLES

### 3.1 Todo 100 % gratuito
- Cada herramienta, librería, servicio o integración debe tener un plan gratuito permanente, **sin tarjeta**, y licencia/términos que permitan uso comercial (MIT, Apache-2.0, BSD, OFL, CC0, etc.).
- Antes de agregar cualquier dependencia, verificá licencia y costo. Registrala en `docs/COST_AUDIT.md` (nombre, versión, licencia, plan, prueba de que no pide tarjeta, fecha).
- Si algo exige pago o tarjeta, se rechaza y va a un apéndice "Opciones pagas futuras".
- Los free tiers cambian seguido (en 2026 hubo recortes y nuevos límites en varios proveedores): re-verificá los límites antes de decidir y dejá en el repo la fecha de verificación. Evitá planes "hobby" que prohíban uso comercial.

### 3.2 Cumplimiento (diseño obligatorio, no opcional)
Verificá en la fuente oficial vigente de Kick (Community Guidelines y política de gambling) y reflejá en el producto, como mínimo, estos puntos que deben confirmarse:
- Kick permite contenido de gambling solo desde plataformas con verificación de edad (+18) y prohíbe mecánicas de gambling financiadas por espectadores (buy-ins, bankroll comunitario, "pagá para participar").

**La suite NO puede incluir, bajo ningún concepto:**
- Cobros, entradas pagas, propinas o suscripciones como condición de participación.
- Recepción o custodia de dinero de espectadores.
- Links de afiliado como requisito para participar.
- Mecánicas donde dinero de espectadores influya en el resultado.
- Promesas o sugerencias de ganancia.

**Todas las participaciones son gratuitas.** Los premios los paga el streamer por fuera de la herramienta; la herramienta solo registra y muestra "premio $x" como texto configurable.

**Obligatorios en overlay y sitio:**
- Aviso +18 configurable.
- Mensaje de juego responsable configurable.
- Página de "Reglas de participación" (plantilla clara y editable).
- Nota visible: "Las plantillas legales requieren revisión de un profesional en tu jurisdicción".

**Privacidad:** guardar lo mínimo (id y username de Kick, texto de comandos y su resultado; **no** guardar el chat completo). Definir retención configurable (por defecto 90 días) y un mecanismo para borrar los datos de un usuario. Investigá la normativa argentina aplicable de protección de datos (p. ej. Ley 25.326) y reflejala en una política de privacidad plantilla.

### 3.3 Seguridad
- **Nunca** pidas contraseñas ni tokens en el chat. Los secretos van solo en `.dev.vars` (ignorado por git) y en los secrets del hosting. Cero secretos en el repo (escaneá con gitleaks, que es gratuito).
- Verificá la firma de **todo** webhook entrante; rechazá alteraciones y replays.
- Todo texto de espectadores (usernames, nombres de slot) se trata como hostil: render solo como texto (`textContent`), longitud máxima, quitar caracteres de control/zero-width/RTL, quitar URLs, lista editable de palabras bloqueadas y **cola de aprobación opcional** antes de mostrar en stream.
- Login del panel con OAuth de Kick + allowlist de usuarios; cookies HttpOnly/SameSite; CSP estricta; rate limiting.
- Los overlays usan claves de solo lectura revocables.

### 3.4 Ética de fuentes
- Solo materiales legalmente gratuitos: documentación oficial, libros con acceso abierto/online libre, papers open-access (arXiv, etc.), cursos gratuitos oficiales.
- Prohibido: material pirata, saltear paywalls, scrapear sitios de terceros contra su robots.txt/ToS, copiar textos largos (resumí con tus palabras y citá fragmentos cortos con link).
- **No scrapees** imágenes, arte, descripciones ni bases de datos de proveedores de slots. El catálogo de slots usa solo nombres (el usuario puede agregar imágenes propias); si no hay imagen, se genera un placeholder (monograma + degradé).
- No eludas protecciones de Kick (p. ej. no uses suplantación de huella TLS para esquivar Cloudflare). Solo la API oficial y, opcionalmente, el feed público de chat (ver 7.3) con el riesgo documentado y decisión del usuario.

---

## 4. EQUIPO DE AGENTES Y PROTOCOLO

**Squads** (el Manager puede crear subagentes dinámicos):

| # | Rol | Responsabilidad |
|---|-----|-----------------|
| 0 | **Manager / Tech Lead** | Plan, gates, ADRs, integración, STATUS.md, mantiene AGENTS.md. Único que habla con el usuario en los gates. |
| 1 | **Investigación** (3 researchers en paralelo: Plataforma Kick · Infra gratuita y tiempo real · Dominio: bonus hunts/torneos/fairness/juego responsable) | Knowledge base y reportes (Fase 1). |
| 2 | **Arquitectura y Backend** | Worker, Durable Object, máquinas de estado, API, datos. |
| 3 | **Integración Kick** | OAuth, webhooks, parser de comandos, envío de mensajes, simulador. |
| 4 | **Frontend** | Panel admin y sitio público. |
| 5 | **Diseño visual y motion** | Design system, overlays, animaciones, assets originales. |
| 6 | **QA, Seguridad y Fairness** | Tests, simulación de carga, revisión de seguridad, auditoría de sorteos. |
| 7 | **DevOps y Documentación** | Deploy gratuito, guías para no programadores, runbooks. |

**Protocolo de trabajo:**
- Cada tarea = ticket en `docs/tasks/` con criterios de aceptación, tests y artifact de Walkthrough (capturas con el navegador integrado). Ramas por módulo, commits convencionales, `main` siempre desplegable.
- Ownership por carpeta para evitar conflictos de merge; el Manager integra.
- Tras cada tarea: actualizar STATUS.md y ADR si hubo decisión de arquitectura.
- **Honestidad:** "no sé" o "no pude verificar" es una respuesta válida. Está prohibido inventar.
- **Acciones humanas** (crear cuenta de GitHub/Cloudflare, crear la app de desarrollador de Kick, autorizar OAuth): el agente pausa y entrega una guía paso a paso en español, con checklist. Nunca pide credenciales por chat.
- **Mensaje a cada gate** (máx. una página): (1) qué se hizo, en 3 bullets; (2) qué necesito de vos, en checklist; (3) riesgos; (4) qué sigue. Máximo 5 preguntas por vez, cada una con un default recomendado.

---

## 5. FASE 1 — INVESTIGACIÓN PROFUNDA (obligatoria, antes de diseñar o programar)

Lanzá 3 researchers en paralelo, cada uno con su lista de temas. El Manager consolida.

### 5.1 Temas mínimos
**Plataforma Kick:**
- API pública oficial: OAuth 2.1 + PKCE, scopes, eventos de webhooks (`chat.message.sent` y relacionados), verificación de firma y clave pública, reintentos, límites de tasa, endpoint de envío de mensajes (tipos user/bot, largo máximo), suscripciones a eventos.
- Estabilidad real de la entrega de webhooks (hay issues públicos de entrega intermitente en el repo oficial de docs: leelos y evaluá el impacto).
- Políticas de gambling y de bots/automatización.
- Alternativas no oficiales (feed público de chat): qué son, riesgos, estabilidad.
- Nota: `docs.kick.com` puede bloquear fetch automático. Usá el navegador integrado de Antigravity y el repositorio público de documentación en GitHub (KickEngineering/KickDevDocs).

**Infraestructura gratuita y tiempo real:**
- Cloudflare Workers Free, Durable Objects con SQLite, WebSocket Hibernation API, Static Assets/Pages, Wrangler, `wrangler dev` (simulación local), límites vigentes (requests/día, duración/GB-s, almacenamiento, cómo se cuentan los mensajes WebSocket, límites de D1 y su enforcement).
- Alternativas gratuitas comparadas (con límites reales y licencias).
- OBS Browser Source: transparencia, resoluciones, `prefers-reduced-motion`, rendimiento, CSS recomendado, cómo se recarga.

**Dominio:**
- Terminología y métricas de bonus hunts (opening, req avg x, avg x, break-even), cómo las definen los trackers públicos y diferencias entre ellos.
- Formatos de torneos de eliminación simple, siembra, byes.
- Sorteos justos: Web Crypto (`getRandomValues`), sesgo de módulo, rechazo, Fisher–Yates, commit–reveal / publicación de semilla y auditabilidad.
- Parseo de números con formatos es-AR/en-US (`Intl.NumberFormat`).
- Coincidencia difusa de nombres (Fuse.js u otra con licencia libre).
- Seguridad web: OWASP Cheat Sheet Series y ASVS, XSS, CSP, CSRF, protección de webhooks.
- Accesibilidad: WCAG 2.2 AA.
- Rendimiento web: web.dev.
- Diseño de overlays y UX en vivo, y diseño responsable de mensajes de juego responsable (papers open-access sobre daño por gambling en streaming, si existen).
- Patrones de máquinas de estado y event sourcing (p. ej. "Game Programming Patterns" de Nystrom, disponible online gratis; XState si se justifica).
- Testing: Vitest, Playwright, fast-check (property-based).

### 5.2 Fuentes
Prioridad: (1) documentación oficial, (2) libros/papers de acceso abierto, (3) cursos en video gratuitos de canales oficiales (usá subtítulos/transcripciones disponibles legalmente; resumí con tus palabras). Para cada fuente: abrila realmente, registrala y marcá confiabilidad A/B/C. **Está prohibido citar una fuente que no abriste.**

### 5.3 Entregables de Fase 1
- `research/SOURCES.md`: registro (id, título, autor, URL, tipo, licencia/acceso, fecha de acceso, relevancia, resumen propio de 3 líneas, confiabilidad).
- `research/<tema>.md`: síntesis por tema.
- `research/GLOSSARY.md`: términos del rubro.
- `research/COMPETITIVE_SCAN.md`: matriz de funciones de los referentes (solo info pública) y huecos que cubre esta suite.
- `research/FEASIBILITY.md`: **modelo de capacidad** (ver 7.4) y verificación de que todo entra en planes gratuitos.
- `research/RISKS.md`: registro de riesgos con mitigación (webhooks intermitentes, cambios de política de Kick, recortes de free tiers, límites del modelo/IDE, APIs no oficiales, punto único de falla, error del streamer bajo presión, spam y brigading, bots que farmean elegibilidad, impersonación, XSS, disputas de fairness, copyright de arte de slots, regulación).
- Skills en `.agents/skills/`: `kick-api`, `cloudflare-durable-objects`, `obs-overlays`, `fair-draws`, `bracket-8`, `number-parsing`, `design-system`, `security-checklist`.
- ADRs iniciales en `docs/adr/` para cada decisión técnica importante (con alternativas descartadas).

**GATE 1 (aprobación del usuario):** resumen ejecutivo de 1 página + máx. 5 preguntas con default. No avanzar sin aprobación.

---

## 6. ESPECIFICACIÓN FUNCIONAL

Todos los comandos, prefijos, ventanas de tiempo, textos y montos son **configurables** desde el panel (con alias en español e inglés). Cada módulo es una **máquina de estados explícita**, con estados y transiciones documentados en diagramas Mermaid.

### 6.0 Transversales
- **Log de auditoría append-only** (event sourcing): todo cambio es un evento. Esto habilita **Deshacer/Rehacer** y reconstruir el estado. Es crítico: el streamer se va a equivocar en vivo.
- **Idempotencia** por `message_id` de Kick (deduplicación entre fuentes de chat).
- **Pool de activos:** usuario elegible = envió ≥1 mensaje en los últimos **30 s** (ventana configurable; prueba de borde exacta con reloj falso). Exclusiones configurables: broadcaster, mods, bots conocidos, blacklist, "sin repetir ganadores" y cooldown. El sorteo usa solo `crypto.getRandomValues` con rechazo (sin sesgo de módulo), guarda **snapshot del pool + semilla/hash** y lo muestra en el historial.
- **Respuestas del bot:** mínimas y con presupuesto anti-spam (token bucket configurable, por defecto ≤1 mensaje cada 2 s). Los acks de éxito pueden desactivarse; los errores se avisan. Plantillas editables (ejemplo: `🎯 @{user} ¡te tocó recomendar! Tenés {seconds}s: !slot <nombre>`).
- **Modo manual / Plan B:** si el chat o la API fallan, el panel permite cargar manualmente guesses, entradas de slot, lobbies y resultados. El stream nunca depende solo del bot.
- **Botón de pánico:** oculta overlays y silencia al bot.
- **Catálogo de slots:** `slots.json` editable desde el panel (nombre, proveedor, alias, imagen opcional). Coincidencia difusa con umbral; si es ambiguo, el bot pide aclarar; si no existe, se acepta como "personalizada" con aprobación del mod.
- **Moneda y formato:** configurable (ARS/USD u otra) con formato es-AR por defecto. Los montos se guardan como enteros (centavos). Números tabulares en toda la UI.

### 6.1 M2 — Community Bonus Hunt
**Estados:** `DRAFT → HUNTING → OPENING → FINISHED` (+ `CANCELLED`).

**Flujo:**
1. El streamer crea el hunt (título, moneda, balance inicial, apuesta por defecto).
2. En `HUNTING`: botón "Elegir espectador" → animación en overlay → el elegido tiene N segundos (default 60) para escribir `!slot <nombre>`. Si no responde: re-sortear (botón o automático).
3. Cada slot recomendada entra como fila: slot, proveedor, recomendador, apuesta, estado (`PENDIENTE / ABIERTA / SALTEADA`), pago, multiplicador.
4. El streamer también puede agregar/editar/reordenar/borrar filas manualmente, con deshacer.
5. Al pasar a `OPENING`, el streamer carga el **balance con el que arranca la apertura**; después carga el pago de cada slot a medida que la abre y el panel resalta la slot actual.

**Panel de slots (visual) — KPIs obligatorios:**
- **Bonus actuales** (cantidad de bonus cargados).
- **Balance inicial.**
- **Balance actual** (editable; por defecto `balance al iniciar apertura + pagos acumulados`).
- **Req Avg X.**
- **Avg X.**
- **Slots totales y abiertas** en formato `4/12`.
- Total apostado · Total ganado · Profit/Loss · Mejor win (monto y x) · Peor win.

**Fórmulas** (verificá contra las definiciones públicas de bonushunt.gg y bonustracker.pro; si difieren, documentá y dejá la fórmula seleccionable):
- `multiplicador_i = pago_i / apuesta_i`
- `avg_x = total_ganado_de_abiertas / total_apostado_de_abiertas` (0 si no hay abiertas)
- `apuestas_restantes = suma de apuestas de las no abiertas`
- `req_avg_x = max(0, balance_inicial − balance_actual) / apuestas_restantes` (si no quedan restantes, mostrar "—"; si el valor ya es ≤ 0, mostrar "Break-even alcanzado")
- `profit_loss = balance_actual − balance_inicial`

### 6.2 M3 — Guess the Balance
**Estados:** `CERRADA → ABIERTA → BLOQUEADA → RESUELTA`. El streamer abre y bloquea desde el panel (opción: bloquear automático al pasar a `OPENING`).

- **Comando:** `!guess <monto>`.
  - Parser robusto: `12557`, `12.557`, `12,557.50`, `12.557,50`, `$12557`, `12k`, `12.5k`.
  - Regla documentada: un único separador seguido de exactamente 3 dígitos = separador de miles; si no, decimal.
  - Rechazar negativos, cero, NaN y valores sobre el máximo configurable.
  - **Tabla de ≥ 40 casos de prueba.**
- Un guess válido por usuario; mientras esté abierta, el último reemplaza al anterior (todo queda en el log). Modo opcional "valores únicos" (duplicado exacto rechazado).
- **Resolución:** `balance_final` = balance actual del hunt al terminar (editable por el streamer). Gana el de menor `|guess − balance_final|`; desempate por `created_at` más temprano. Se muestran los top 5 más cercanos y el "premio $x" configurado.
- **Visibilidad pública:** antes del bloqueo solo se muestra la cantidad de guesses (anti-copia); después se muestra la lista completa.

### 6.3 M4 — Batallas 1v1
**Estados:** `LOBBY → LISTA → JUEGA_A → JUEGA_B → RESUELTA` (+ `CANCELADA`).

- **Parámetros** (los define el streamer al abrir):
  - Modo de ingreso: `primeros_dos` | `sorteo_de_activos`.
  - Apuesta.
  - Premio $x (texto).
  - Regla de victoria: `mayor_x` | `umbral_de_profit` (gana quien supere un `min_x`; si nadie lo supera, no hay premio).
  - Regla de empate: re-spin | dividir.
- **Comando:** `!battle <slot>`. Los dos primeros usuarios elegibles distintos quedan como A y B (se pueden corregir antes de cerrar el lobby; un tercero se ignora o queda como reserva).
- El streamer juega la slot A y luego la B (misma apuesta) y carga los pagos. El panel calcula `x`, decide ganador, anuncia y guarda en historial.
- **Casos borde:** rival ausente, slot repetida, descalificación, deshacer.
- **Visual:** pantalla VS en overlay con nombres, slots, apuestas, multiplicadores en vivo y animación del ganador.

### 6.4 M5 — Torneo de 8
**Estados del torneo:** `LOBBY → SORTEO → CUARTOS → SEMIS → FINAL → FINALIZADO`.

- **Comando:** `!tourney <slot>`. Cupos: los primeros 8 usuarios elegibles distintos. Opción de completar los cupos faltantes sorteando del pool de activos. Se cierra al llenarse o a mano.
- **Siembra** aleatoria (Fisher–Yates con random criptográfico), con semilla publicada. Bracket de eliminación simple: 4 cuartos, 2 semis, 1 final.
- Cada llave es una batalla (misma apuesta por ronda, configurable por ronda); gana el mayor `x`. Empate: re-spin.
- **Premios:** 1.º y 2.º puesto ($x configurables). Partido por el 3.º: desactivado por defecto (toggle).
- Permitir corregir un resultado mientras no haya empezado la siguiente ronda; reemplazar participantes descalificados; todo persistente (recargar la página no pierde nada).
- **Visual:** bracket en SVG con avance animado; versión overlay (compacta y pantalla completa) y versión pública.

### 6.5 M6 — Panel admin
- Login con Kick + allowlist y roles (streamer / mod).
- Secciones: En vivo, Hunt, Guess, Batalla, Torneo, Slots/catálogo, Configuración (comandos, ventanas, textos, moderación, temas), Historial, Exportar (JSON/CSV), Salud (cuotas estimadas, estado del chat, última señal).
- **Diseño para uso en vivo:** botones grandes, atajos de teclado, confirmación en acciones destructivas, deshacer siempre visible.
- Control por chat de mods: opcional, apagado por defecto.

---

## 7. ARQUITECTURA GRATUITA (default recomendado; la investigación debe validarla o reemplazarla vía ADR)

### 7.1 Stack
- **Lenguaje:** TypeScript en todo. Monorepo simple (npm/pnpm workspaces). Lógica de dominio pura en un paquete sin I/O (parsers, máquinas de estado, puntajes) para testearla fácil.
- **Runtime:** Cloudflare Workers (plan Free) + **un Durable Object con SQLite por canal** como fuente única de verdad y hub de WebSocket (usar WebSocket Hibernation API para ahorrar duración). Archivos estáticos servidos por el mismo Worker o Pages. Dominio `*.workers.dev` (sin comprar dominio).
- **Frontend:** Svelte 5 + Vite, variables CSS para temas, SVG para el bracket. PixiJS/GSAP solo si la licencia se verifica gratuita y el presupuesto de CPU lo permite.
- **Local:** `wrangler dev` (simula Workers + DO en la notebook). Sin Docker.
- **Datos:** tablas de eventos (append-only) + proyecciones materializadas. Exportación JSON/CSV desde el panel como respaldo (el estado en la nube no es el único lugar).

### 7.2 Integración Kick
- **Entrada de chat (primaria):** webhooks oficiales `chat.message.sent` hacia un endpoint del Worker, con verificación de firma, gestión de suscripciones por API y manejo de reintentos.
- **Salida:** endpoint oficial de envío de mensajes con scope `chat:write` (verificar si corresponde enviar como usuario o como bot; hacerlo configurable), con throttling.
- **Auth:** OAuth 2.1 + PKCE contra la API de identidad de Kick; tokens y refresh en secrets/almacenamiento seguro, nunca en el repo.
- **Simulador:** un `ChatSim` que genera usuarios y mensajes con webhooks firmados de prueba, para desarrollar y testear sin depender de Kick.

### 7.3 Lector alternativo de chat (opcional, desactivado por defecto)
Dado que se reportó entrega intermitente de webhooks, diseñar una interfaz `ChatSource` con dos implementaciones: **webhook oficial** y **lector del feed público de chat** (proceso local en la notebook). Deduplicar por `message_id`. El lector es **no oficial**: documentar riesgos (puede romperse o contravenir términos) y activarlo solo con decisión explícita del usuario en un gate.

### 7.4 Modelo de capacidad (obligatorio en Fase 1)
Con los límites **vigentes y verificados** del plan gratuito (requests/día, duración, almacenamiento, conteo de mensajes WebSocket), estimar el consumo para un stream de 8 h con 10, 50, 100 y 300 mensajes de chat por minuto. Definir umbrales de alerta (70 % de cuota) y estrategia de degradación. Si el modelo muestra riesgo con chats grandes, proponer vía ADR la variante **híbrida**: un lector local que calcula el pool de activos y envía al Worker solo comandos y snapshots cada N segundos.

---

## 8. VISUALES Y DISEÑO

- **Identidad original** (nombre provisorio HuntHub, logo simple generado por vos, paleta y tipografías libres OFL de Google Fonts). Tema oscuro por defecto, alto contraste, números tabulares para dinero, animaciones de 150–400 ms, respetar `prefers-reduced-motion`.
- **Design system** documentado: tokens (color, tipografía, espaciado, sombras, motion), componentes y estados.
- **Componentes mínimos:**
  - Tabla del hunt (estados de fila, slot actual resaltada).
  - Barra de KPIs.
  - Tarjeta de slot actual.
  - Leaderboard de guesses.
  - Selector animado de espectador (ruleta/roll).
  - Tarjeta VS.
  - Bracket de 8.
  - Celebración de ganador (liviana, CSS/canvas).
  - Toasts de eventos de chat.
- **Slots sin imagen:** monograma + degradé generado. Imágenes propias del usuario en `public/slots/<slug>.webp` (≤200 KB).
- **Overlays OBS:** fondo transparente, presets 1920×1080 y barra 1920×200, reconexión automática del WebSocket con backoff, URL con clave de solo lectura. Presupuesto: ≤5 % de CPU en la notebook dentro de OBS (medilo), bundle ≤150 KB gzip por overlay, sin blur/filtros pesados en áreas grandes.
- **Accesibilidad:** contraste ≥4,5:1, legible a 1080p desde distancia, apto daltonismo.
- **QA visual:** capturas con Playwright en 1920×1080, 1280×720 y móvil 390×844.

---

## 9. SITIO WEB PÚBLICO (mobile-first, hosting gratuito)

Páginas:
- Inicio / estado en vivo.
- Hunt actual (solo lectura, en tiempo real).
- Ranking del guess.
- Batallas (en vivo + historial).
- Bracket del torneo (en vivo + historial).
- Salón de la fama.
- Reglas de participación.
- Privacidad.
- +18 y juego responsable.

Idioma es-AR por defecto (inglés opcional). Rendimiento objetivo: Lighthouse ≥90 en móvil. Sin trackers de terceros.

---

## 10. FASES DE CONSTRUCCIÓN Y GATES

| Fase | Contenido | Gate |
|------|-----------|------|
| **0** | Setup: verificar Node LTS, git, wrangler y SO de la notebook; repo, AGENTS.md, rules, workflows, STATUS.md; guía para crear cuentas gratuitas (GitHub, Cloudflare) y la app de desarrollador de Kick. | Plan aprobado |
| **1** | Investigación (sección 5). | **G1** |
| **2** | Especificación: PRD, spec de comandos, máquinas de estado (Mermaid), modelo de datos, contratos de API, flujos UX, design system y mockups. | **G2** |
| **3** | **Walking skeleton:** webhook firmado → DO → WebSocket → overlay "hola mundo", probado con el simulador y luego con el canal real. | **G3** |
| **4** | Módulos, en orden: M1 → M2 (+panel) → M3 → M4 → M5 → M6/sitio. Cada módulo tiene demo en video/capturas y tests. | **G4.x** por módulo |
| **5** | QA integral: seguridad, carga, fairness, ensayo general con chat simulado, auditoría de costos y de docs. | **G5** |
| **6** | Deploy gratuito, checklist de salida en vivo, rollback, monitoreo de cuotas. | Go-live |
| **7** | Backlog post-lanzamiento (puntos/loyalty, Discord, otras plataformas vía adaptador `ChatPlatform`, etc.). Fuera de alcance ahora. | — |

**Documentos de usuario (español simple, verificados siguiendo la guía desde cero):**
- `GUIA_INICIO_RAPIDO.md`.
- `GUIA_STREAMER.md` (checklist pre-stream / durante / post).
- `GUIA_MODS.md`.
- `SECURITY.md`.
- Plantillas de Reglas y Privacidad.

---

## 11. DEFINICIÓN DE TERMINADO (criterios medibles)

- Tests verdes; cobertura ≥80 % en lógica de dominio (parsers, máquinas de estado, puntajes).
- **Pool de 30 s:** pruebas de borde con reloj falso (t=0, 29,9 s, 30,0 s, 30,1 s).
- **Parser de guess:** ≥40 casos, incluidos formatos es-AR/en-US y entradas maliciosas.
- **Fairness:** 100.000 sorteos simulados con prueba de uniformidad (chi-cuadrado) y sin sesgo de módulo; el historial muestra semilla/snapshot.
- **Carga:** `ChatSim` a 600 mensajes/min durante 10 min sin perder comandos; latencia comando→overlay p95 ≤2 s.
- **Resiliencia:** recargar a mitad de batalla o torneo restaura el estado exacto; reinicio/evicción del DO sin pérdida; deshacer/rehacer funciona en todos los módulos.
- **Seguridad:** firma inválida y replay rechazados; usernames/slots con payloads XSS quedan inertes; cero secretos en git; auditoría de dependencias; CSP activa.
- **Costos:** `COST_AUDIT.md` completo; cada servicio y librería con licencia y plan verificados; nada pide tarjeta.
- **Overlays:** presupuesto de CPU y bundle cumplido; contraste AA.
- **Docs:** una persona no técnica pudo seguir la guía de inicio sin ayuda (el Manager lo simula paso a paso).

---

## 12. PRIMER ENTREGABLE QUE ESPERO (para empezar ahora)

Un artifact con:
1. Checklist de Fase 0 y estado del equipo (verificado en la notebook).
2. Plan de investigación de Fase 1: reparto de temas por researcher, lista de fuentes candidatas a abrir y cronograma.
3. Lista de acciones humanas que necesitás de mí (cuentas, app de Kick), cada una con guía paso a paso.
4. Preguntas abiertas (máx. 5, con default recomendado), entre ellas:
   - ¿El canal es de mi propiedad y sale desde esta notebook?
   - ¿Los mensajes del bot salen desde mi cuenta personal o desde una cuenta bot separada?
   - ¿Qué moneda y formato de montos uso?
   - ¿Quiénes serán mods con acceso al panel?
   - ¿Activamos o no el lector alternativo de chat?

**No escribas código de producto hasta pasar el Gate 1.**
