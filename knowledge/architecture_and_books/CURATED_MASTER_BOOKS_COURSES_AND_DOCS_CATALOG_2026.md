# CATÁLOGO MAESTRO CURADO: Libros, Documentación Oficial y Videocursos Gratuitos (Filtro de Calidad 2026)

**Alcance:** Aplicable a todos los Squads de HuntHub / DiggityBets (`Squad 0` a `Squad 7`) como mapa de fuentes primarias verificadas de ingeniería web minimalista, animaciones 60 FPS, shaders, WebAudio, ciberseguridad, juegos interactivos para espectadores de Kick.com, gamificación, psicología del juego y marketing CRO.

> **[VERIFICADO: GitHub Stars + Goodreads/O'Reilly Ratings + W3C/MDN/OWASP Primary Docs, 2026-10-19]**

---

## 1. Filtro de Calidad y Confiabilidad Aplicado

Toda fuente de conocimiento incorporada o recomendada para el cerebro RAG del equipo de agentes pasa por tres criterios obligatorios:
1. **Autoridad y Reputación (Estrellas / Citaciones / Reseñas)**: Repositorios con miles de estrellas en GitHub, estándares oficiales (W3C, WHATWG, OWASP, MDN, web.dev, Cloudflare, Kick Dev Docs) o libros de referencia con calificación `>= 4.4 / 5.0`.
2. **Vigencia Tecnológica (2025–2026)**: Prioridad a APIs nativas modernas (`@starting-style`, `content-visibility`, `View Transitions API`, `WAAPI`, `TrustedTypes`, `Cloudflare Durable Objects SQLite + Hibernation`, `OAuth 2.1 PKCE`).
3. **Alineación con Restricciones Duras (`AGENTS.md`)**: Costo `$0` permanente sin tarjeta, licencias permisivas (`MIT`, `Apache-2.0`, `BSD`, `CC0`) y consumo `<= 5% CPU` en OBS sobre HP 250 G8.

---

## 2. Libros Completos Ya Ingeridos en `knowledge/` (100% Indexados con Ventana Semántica)

Tras la actualización del motor **Supercharged Omni-RAG v3** (eliminando el truncamiento previo de `2,200` caracteres por capítulo mediante *Recursive Semantic Paragraph Windowing*), los siguientes **10 libros completos** residentes en `knowledge/` están indexados al **100% de su contenido**:

| Libro en `knowledge/` | Autor(es) | Dominio Principal | Tamaño |
|---|---|---|---|
| `knowledge/actionable_gamification.md` | Yu-kai Chou | Gamificación, Marco Octalysis (8 Core Drives), Retención | `844 KB` |
| `knowledge/architecture_and_books/designing_data_intensive_applications.md` | Martin Kleppmann | Sistemas Distribuidos, Consistencia, Índices, Event Streams | `1.45 MB` |
| `knowledge/architecture_and_books/nudge_thaler_sunstein.md` | Richard Thaler & Cass Sunstein | Economía Conductual, Arquitectura de Decisiones, Efecto Anclaje | `663 KB` |
| `knowledge/architecture_and_books/pro_typescript.md` | Steve Fenton | Tipado Estricto, Arquitectura TypeScript, Contratos Seguros | `672 KB` |
| `knowledge/architecture_and_books/the_pragmatic_programmer.md` | Andrew Hunt & David Thomas | Ingeniería Pragmática, Ortogonalidad, Automatización, DRY | `606 KB` |
| `knowledge/architecture_and_books/clean_architecture.md` | Robert C. Martin | Arquitectura Limpia, Límites de Dominio, Desacoplamiento | `543 KB` |
| `knowledge/ui_ux_design/designing_with_the_mind_in_mind.md` | Jeff Johnson | Psicología Cognitiva, Percepción Visual, Memoria de Trabajo, UI | `361 KB` |
| `knowledge/architecture_and_books/system_design_interview_vol_2.md` | Alex Xu & Sahn Lam | Diseño de Sistemas en Tiempo Real, WebSockets, Leaderboards | `295 KB` |
| `knowledge/architecture_and_books/hooked_habit_forming.md` | Nir Eyal | Ciclo Hooked (Trigger, Action, Variable Reward, Investment) | `290 KB` |
| `knowledge/ui_ux_design/laws_of_ux_using_psychology_to_design_better_.md` | Jon Yablonski | Leyes de Fitts, Hick, Jakob, Miller, Peak-End, Zeigarnik, Doherty | `265 KB` |

---

## 3. Documentación Oficial y Videocursos Gratuitos Open-Access Ingeridos

### 3.1 Desarrollo Web Moderno, Minimalista y Eficiente (Performance & Core Web Vitals)
- **web.dev — Learn Performance, Core Web Vitals (LCP, INP, CLS) & Learn CSS / HTML** (Google Chrome Developers, CC-BY 4.0):
  - Regla de oro para **INP `< 200ms`**: ceder el hilo principal dividiendo tareas largas, evitar lecturas geométricas (`getBoundingClientRect`) después de mutaciones DOM y usar `content-visibility: auto; contain-intrinsic-size: 0 48px;` en grillas y tablas extensas.
  - Regla de oro para **LCP `< 2.5s`**: precargar fuentes críticas (`Chakra Petch`, `Inter`, `JetBrains Mono`), usar `fetchpriority="high"` en el banner principal y decodificar miniaturas con `loading="lazy" decoding="async"` + placeholders `ThumbHash`.
- **Every Layout (Heydon Pickering & Andy Bell) + Utopia Fluid Responsive Design**:
  - Primitivas composicionales sin media-queries frágiles (`Stack`, `Cluster`, `Sidebar`, `Switcher`, `Grid` con `auto-fill` y `minmax()`) combinadas con escalas tipográficas fluidas `clamp()`.

### 3.2 Animaciones a 60 FPS, Efectos Visuales, Shaders y WebAudio
- **Emil Kowalski — *Animations on the Web* & Principios de Pulido UI**:
  - Animar exclusivamente propiedades compuestas por GPU (`transform`, `opacity`, o variables CSS `@property` para gradientes cónicos).
  - Los modales y popovers nunca escalan desde `0` (usar `scale(0.95) -> scale(1)` con `cubic-bezier(0.16, 1, 0.3, 1)` en `150ms–220ms`).
- **Patricio Gonzalez Vivo & Jen Lowe — *The Book of Shaders* (Open-Access)**:
  - Fundamentos matemáticos de GLSL fragment shaders: funciones de modelado (`smoothstep`, `mix`, `fract`), campos de distancia con signo (SDF 2D para bordes láser y brillos sin texturas pesadas), ruido procedural (Perlin / Simplex / Voronoi) y reflejos holográficos anisotrópicos.
- **MDN Web Audio API & Síntesis Procedural (`ZzFX` / `jsfxr`)**:
  - Síntesis en tiempo real sin archivos `.mp3` pesados: osciladores (`sine`, `triangle`, `sawtooth`), buffers de ruido blanco pre-cacheados para explosiones de confeti, paneo estéreo espacial (`StereoPannerNode`) y bus maestro con limitador de broadcast (`DynamicsCompressorNode` con `threshold: -4dB`, `ratio: 20:1`) para proteger la mezcla de OBS.

### 3.3 Ciberseguridad Web y Seguridad de Sistemas de Agentes / RAG
- **OWASP Top 10 Web & Application Security Verification Standard (ASVS v4.0.3)**:
  - Defensa en profundidad contra **DOM XSS**: `DOMPurify` + política W3C `TrustedTypes` + cabeceras `Content-Security-Policy` estrictas en `_headers`.
  - Autenticación **OAuth 2.1 con PKCE (`S256`)**, verificación de firmas **RSA-SHA256** en webhooks de Kick y validación de esquemas en el borde con **Valibot**.
- **OWASP Top 10 for LLM & Agentic Applications (2025/2026)**:
  - **LLM01 (Indirect Prompt Injection)**: Sanitización obligatoria (`sanitizeRagPayload`) de todo fragmento externo antes de indexarlo en Qdrant o inyectarlo en el prompt de síntesis.
  - **LLM02 / LLM06 (Sensitive Info Disclosure & Excessive Agency)**: Cero secretos en código o git, aislamiento en worktrees efímeros (`Sandcastle`) y presupuestos de ejecución (`AbortSignal.timeout`).

### 3.4 Creación de Juegos Interactivos en Vivo, Gamificación y Marketing CRO
- **Hussein Nasser — *WebSockets & Real-Time Backend Masterclass*** + **Cloudflare Durable Objects Hibernation Docs**:
  - Sincronización determinista de salas de juego en vivo con costo `$0` durante periodos de inactividad gracias a la API de Hibernación de WebSockets.
- **Kick Official Developer Documentation (`KickDevDocs`)**:
  - Contratos oficiales de eventos `chat.message.sent`, `channel.followed`, `channel.subscription.*` y límites de tasa por endpoint.

---

## 4. Lista de Libros Privados / Comerciales Recomendados (Para Adquisición del Usuario)

En estricto cumplimiento de nuestra regla ética (`AGENTS.md §2.4` — cero piratería), los siguientes libros tienen **copyright comercial privado** y aún no se encuentran en la carpeta `knowledge/`. Están seleccionados bajo el filtro de **máxima calificación internacional y relevancia directa para DiggityBets**. Si los conseguís en formato `.md`, `.txt`, `.epub` o `.pdf` y los colocás en `knowledge/`, el motor **Omni-RAG v3** los indexará automáticamente al 100%:

### A. Diseño de Juegos Interactivos, "Game Feel", Creatividad y Psicología del Jugador
1. ***"The Art of Game Design: A Book of Lenses" (3rd / 4th Edition)*** — **Jesse Schell** (`⭐ 4.5/5 Goodreads`)
   - **Por qué es clave**: La biblia mundial del diseño de juegos. Sus "113 Lentes" (Lente del Riesgo, Lente de la Sorpresa, Lente del Espectador, Lente de la Economía) enseñan cómo diseñar juegos en vivo donde tanto quien juega como quien mira en el stream sienten adrenalina constante.
2. ***"Game Feel: A Game Designer's Guide to Virtual Sensation"*** — **Steve Swink** (`⭐ 4.4/5 Goodreads`) *(Actualmente solo tenemos un resumen de 2.8 KB; el libro completo profundiza en pulido físico, "juice", respuesta en `<100ms` y sincronía audio-visual)*.
3. ***"A Theory of Fun for Game Design"*** — **Raph Koster** (`⭐ 4.1/5 Goodreads`)
   - **Por qué es clave**: Explica neurocientíficamente por qué el cerebro humano libera dopamina al reconocer patrones y dominar minijuegos cortos en comunidad.
4. ***"The Gamer's Brain: How Neuroscience and UX Can Impact Video Game Design"*** — **Celia Hodent** (Ex-Directora de UX en Epic Games / Fortnite, `⭐ 4.4/5 Goodreads`)
   - **Por qué es clave**: Conecta percepción, atención, motivación intrínseca/extrínseca y onboarding sin fricción para juegos competitivos y eventos en vivo.
5. ***"Designing Games: A Guide to Engineering Experiences"*** — **Tynan Sylvester** (Creador de RimWorld, `⭐ 4.5/5 Goodreads`)
   - **Por qué es clave**: Cómo diseñar "motores de historias emergentes" en vivo (momentos épicos de remontada o *clutch* en torneos de slots y Bonus Hunts).

### B. Diseño UI/UX Minimalista, Tipografía y Sistemas de Diseño de Lujo
6. ***"Refactoring UI" (Texto Completo)*** — **Adam Wathan & Steve Schoger** (`⭐ 4.7/5 Goodreads`) *(Actualmente tenemos un resumen de 1.6 KB; el libro completo contiene todas las tácticas de jerarquía sin bordes, sombras de elevación y paletas oscuras)*.
7. ***"Practical UI" (Texto Completo)*** — **Adham Dannaway** (`⭐ 4.7/5`) *(Actualmente tenemos un resumen de 1.4 KB; el libro completo detalla reglas exactas de contraste, formularios de alta conversión y botones táctiles)*.
8. ***"Grid Systems in Graphic Design" (Raster Systeme für die visuelle Gestaltung)*** — **Josef Müller-Brockmann** (`⭐ 4.5/5 Goodreads`)
   - **Por qué es clave**: La obra maestra del diseño suizo minimalista para componer grillas matemáticas asimétricas y simétricas con orden visual absoluto.
9. ***"The Elements of Typographic Style"*** — **Robert Bringhurst** (`⭐ 4.4/5 Goodreads`)
   - **Por qué es clave**: Dominio de ritmo vertical, proporciones modulares, números tabulares (`tabular-nums`) para contadores financieros y legibilidad en pantallas oscuras.

### C. Psicología del Juego, Persuasión, Marketing y Optimización de Conversión (CRO)
10. ***"Influence: New and Expanded: The Psychology of Persuasion"*** — **Robert B. Cialdini** (`⭐ 4.4/5 Goodreads`)
    - **Por qué es clave**: Los 7 principios universales de persuasión (Reciprocidad, Compromiso, Prueba Social, Autoridad, Simpatía, Escasez y Unidad/Comunidad) aplicados a la conversión de espectadores en miembros VIP activos.
11. ***"Thinking, Fast and Slow" (Pensar Rápido, Pensar Despacio)*** — **Daniel Kahneman** (Premio Nobel, `⭐ 4.2/5 Goodreads`)
    - **Por qué es clave**: Fundamento de Sistema 1 vs. Sistema 2, heurísticas de disponibilidad, aversión a la pérdida, efecto marco (*framing*) y regla del Pico-Final (*Peak-End Rule*).
12. ***"Addiction by Design: Machine Gambling in Las Vegas"*** — **Natasha Dow Schüll** (MIT Press, `⭐ 4.3/5 Goodreads`)
    - **Por qué es clave**: El estudio antropológico y técnico más profundo sobre cómo funcionan las matemáticas de volatilidad de las slots, el estado de *flow* ("la zona") y cómo diseñar sistemas de entretenimiento que comprendan la psicología del jugador manteniendo barreras éticas de Juego Responsable.
13. ***"Contagious: Why Things Catch On"*** — **Jonah Berger** (`⭐ 4.1/5 Goodreads`)
    - **Por qué es clave**: El modelo **STEPPS** (*Social Currency, Triggers, Emotion, Public, Practical Value, Stories*) para lograr que los clips de Bounties y victorias en el stream de Kick se vuelvan virales orgánicamente.
14. ***"$100M Offers" & "$100M Leads"*** — **Alex Hormozi** (`⭐ 4.7/5 Goodreads`)
    - **Por qué es clave**: Estructuración de ofertas de valor irresistible (*Grand Slam Offers*) tanto para los espectadores que usan el código `DIGGITYBETS` como para presentar propuestas comerciales B2B a las proveedoras de slots (*Only on Stake*).

### D. Ciberseguridad Web Moderna y Arquitectura de Alta Confiabilidad
15. ***"The Web Application Hacker's Handbook" (2nd Edition) / "Real-World Bug Hunting"*** — **Dafydd Stuttard & Marcus Pinto / Peter Yaworski** (`⭐ 4.5/5 Goodreads`)
    - **Por qué es clave**: Casos reales de vulnerabilidades en OAuth, carreras de condición (*race conditions*) en canjes de saldo/puntos, falsificación de solicitudes y blindaje de APIs.
16. ***"Web Security for Developers: Real Threats, Practical Defense"*** — **Malcolm McDonald** (No Starch Press, `⭐ 4.5/5 Goodreads`)
    - **Por qué es clave**: Guía directa y moderna para proteger aplicaciones web JavaScript/Edge contra XSS, CSRF, Clickjacking y ataques de denegación de servicio.
