# Slots online: estructura, matemática, RTP y regulación — Reporte de investigación

> **Fecha:** 2026-10-21 · **Squad:** 1 (Deep Research) · **Método:** solo internet (web search, Firecrawl, lectura de PDFs/páginas primarias).
> **Alcance:** cómo funciona una slot (RNG → reels → paytable → features), su matemática (RTP, hit frequency, volatilidad), estándares de certificación, evidencia académica y material de estudio gratuito.
> **NO es:** fuente de reglas de Kick ni de política de producto de HuntHub (ver `AGENTS.md` y `docs/STATUS.md`).
> **Etiquetas:** `[VERIFICADO: fuente, fecha]` = leído en la fuente primaria. `[ASUNCIÓN]` = no confirmado. `[DESCARTADO]` = dato que apareció pero resultó falso/erróneo.

---

## 0. Resumen ejecutivo (para el dueño del canal)

1. **Una slot es una calculadora de probabilidades con un disfraz visual.** El resultado se decide por números aleatorios *antes* de que giren los rodillos; la animación solo lo muestra.
2. **RTP = lo que el juego devuelve en promedio a muy largo plazo.** Una slot al 96% pierde 4 centavos por dólar *en promedio*, pero la sesión real puede estar muy lejos de ese promedio (eso es la volatilidad).
3. **El mismo juego puede tener varios RTP.** El estudio elige la versión; el casino elige cuál instala. Ejemplo verificado: Hacksaw publica 96.22 / 94.27 / 92.32 / 88.02 % para *Rip City*.
4. **Las reglas más serias de diseño responsable vienen del Reino Unido**: prohíben autoplay, giros < 2,5 s y celebrar "victorias" que en realidad son pérdidas.
5. **Los libros más específicos de slots NO son públicos.** Lista completa en la sección 7. Lo público alcanza para entender el 90% de la matemática.
6. **Corrección importante:** varios datos de las búsquedas automáticas eran incorrectos. Están en la sección 8.

---

## 1. Estructura de una slot (arquitectura)

```
Botón SPIN
  → RNG (certificado)                       genera un número por rodillo
  → Mapeo a "virtual reel" (strip)          N posiciones virtuales por rodillo
  → Posición → símbolo visible              varias posiciones pueden dar el mismo símbolo
  → Evaluación (líneas / ways / clusters)   según el motor del juego
  → Paytable                                símbolo/combinación → premio
  → Features (free spins, hold&win, etc.)   con su propio modelo de probabilidad
  → Animación + sonido                      puramente presentación
```

### 1.1 Virtual reels (verificado con ejemplo numérico)

`[VERIFICADO: Wizard of Odds, "How to Calculate the Return for a Slot Machine", wizardofodds.com/games/slots/appendix/2, 2026-10-21]`

Ejemplo del autor (juego inventado de 3 rodillos, 64 posiciones virtuales por rodillo):

| Símbolo | R1 | R2 | R3 |
|---|---|---|---|
| Bar | 4 | 3 | 1 |
| Cherry | 5 | 4 | 2 |
| Blank | 28 | 37 | 42 |
| (Total) | 64 | 64 | 64 |

- Combinaciones totales: `64³ = 262,144`.
- P(3 Bars) = `4×3×1 / 262,144 = 0.000046`.
- RTP = Σ (probabilidad × premio) = **0.94545 → 94.545 %**.
- El autor señala que el primer rodillo está pesado "generosamente" y el tercero "tacaño", y que hay muchos blancos alrededor del Bar → **efecto near-miss** (casi-premio) por diseño.

`[VERIFICADO: Harrigan & Dixon, J. Gambling Issues 23, 2009]` En PAR sheets reales de Ontario: *Lucky Larry's Lobstermania* tiene rodillos de 47, 46, 48, 50 y 50 símbolos → **259,440,000 combinaciones**.

### 1.2 Scatters, líneas e independencia (hallazgo no intuitivo)

`[VERIFICADO: Harrigan & Dixon 2009]` En juegos multilínea, la "hit frequency" del PAR sheet es **por línea**, no por giro:
- Lobstermania 92.5 %: 5.25 % con 1 línea → **33.52 %** de giros con algún pago a 15 líneas.
- Si las 15 líneas fueran independientes sería 55.5 %. No lo son (comparten rodillos) y los scatters cuentan una sola vez.

### 1.3 Motores modernos (cualitativo)

Megaways, cluster pays, hold & win y bonus buy existen y se usan ampliamente, pero **no pude verificar fuentes primarias** (páginas de patentes/estudios) con números. `[ASUNCIÓN]` sobre sus perfiles de volatilidad. Lo único con evidencia propia: la regulación británica trata "feature buy-in" como riesgo (ver 4.2).

---

## 2. Matemática central (fórmulas)

`[VERIFICADO: R. Muir, "Elements of Slot Design", 3ª ed., slotdesigner.com, PDF 46 pp., extracción 2026-10-21]`

| Concepto | Fórmula |
|---|---|
| RTP | `RTP = (premio promedio / apuesta promedio) × 100 %` |
| Esperanza | `E = Σ pᵢ · premioᵢ` |
| Desvío estándar | `σ = √( Σ pᵢ · (premioᵢ − media)² )` |
| Índice de volatilidad (95 %) | `VI = 1.96 · σ` (90 % → 1.64σ; 99 % → 2.58σ) |
| Rango de RTP tras N juegos | `RTP ± VI / √N` |
| Free spins con retrigger | `F = [B₀ + B₁·n₁·p₁·(1/(1 − n₂·p₂))] / apuesta × 100 %` |
| Progresivo "mystery" | `premio medio = (max + inicio)/2` |

Ejemplo de juego completo en el libro: **RTP = 93.867699 %, σ = 14.18475792**.

### 2.1 Qué significa el RTP "en la vida real"

`[VERIFICADO: Harrigan & Dixon 2009]`
- Mismo Lobstermania: con 1 USD por giro, se pierden en promedio **3.8 ¢** (versión 96.2 %) vs **15 ¢** (versión 85 %).
- Con 100 USD y apuesta máxima, **89 %** de probabilidad de encontrarse con un "hand-pay" (pago grande) antes de quedarse sin saldo, en la versión 92.5 %.
- El **35 %** de las "victorias" señaladas con apuesta máxima a 15 líneas pagan **menos** que lo apostado (ver sección 5).

### 2.2 Volatilidad: ¿qué la define?

Dos juegos con igual RTP pueden tener σ muy distinta. La σ la determina la **distribución de premios**: pocos premios enormes (σ alta) vs muchos premios chicos (σ baja). Para HuntHub: el **Bonus Hunt** acumula resultados de bonus buys, así que el rango `RTP ± VI/√N` se aplica directo a cuántas compras hacen falta para que el promedio sea "creíble" (ver sección 9).

---

## 3. RTP en slots online

### 3.1 Un juego, varias versiones

`[VERIFICADO: hacksawgaming.com/games/rip-city, 2026-10-21]` RTPs publicados: **96.22 %, 94.27 %, 92.32 %, 88.02 %**.
`[VERIFICADO (fuente secundaria): Track360, "Slot RTP Benchmarks by Provider 2026", 2026-10-21]` *Wanted Dead or a Wild* publica 96.38 / 94.55 / 92.33 / 88.42 %; pasar de 96 % a 94 % sube el margen de la casa de 4 % a 6 % (+50 % de ganancia por unidad apostada).

`[VERIFICADO: Harrigan & Dixon 2009]` Ya en slots físicas de Ontario existían versiones 85 % ↔ 96 % del mismo juego, **idénticas a la vista del jugador**.

**Implicancia directa para el catálogo de slots de HuntHub:** el RTP que figura en un catálogo genérico puede no ser el que corre en el casino donde juega el streamer. `[ASUNCIÓN]` Stake corre la banda de RTP que el catálogo indica; **debe verificarse** en la pantalla de información de cada juego antes de mostrar un RTP en el sitio.

### 3.2 RTP de demo = RTP real

`[VERIFICADO: MGA Player Protection, mga.org.mt, 2026-10-21]` Para juegos demo, el operador debe asegurar que el RTP sea **el mismo** que en dinero real.

### 3.3 Compensador (diferencia UK/NA)

`[VERIFICADO: Harrigan & Dixon 2009, citando Parke & Griffiths 2006 y patente británica GB 2 165 386A]` Máquinas británicas históricas usaban un *compensador* que influía en la selección de premios para acercar el pago a un nivel preseleccionado; en Norteamérica cada giro lo decide solo el RNG. Esto **no** describe necesariamente el online actual `[ASUNCIÓN]`.

---

## 4. Estándares, certificación y regulación

### 4.1 GLI-19 v3.0 (sistemas interactivos)

`[VERIFICADO: gaminglabs.com/wp-content/uploads/2024/06/GLI-19-Interactive-Gaming-Systems-v3.0.pdf, 115 pp., 2026-10-21]`

Cláusulas relevantes (solo títulos confirmados por extracción):
- **3.2.1–3.2.5** Revisión de código fuente, análisis estadístico, distribución, independencia, resultados disponibles (RNG).
- **3.3.1–3.3.3** Fuerza del RNG, ataques criptográficos, monitoreo dinámico de salida para RNG de hardware.
- **4.6.1–4.6.5** Equidad del juego; simulación de objetos físicos; eventos de probabilidad aleatoria.
- **4.7.1–4.7.2** Porcentaje de pago por software y **visualización del RTP**.
- **4.3.3** Requisitos del ciclo de juego. **4.4.1** Información y reglas.

`[ASUNCIÓN]` El texto exacto de cada cláusula no fue extraído; leer el PDF antes de citar redacción literal.

### 4.2 Reino Unido (UKGC): diseño responsable

`[VERIFICADO: gamblingcommission.gov.uk, RTS 7, RTS 14, comunicado 2021-02-02, 2026-10-21]`
- **RTS 7C:** prohibido diseñar juegos "que puedan engañar al cliente sobre la probabilidad de resultados", incluso **sustituir pérdidas por near-miss**.
- **RTS 14D:** **mínimo 2,5 s** entre inicios de ciclo; hay que soltar y volver a pulsar el botón.
- **RTS 14E:** prohibido turbo, quick spin y slam stop.
- **Comunicado 2021:** prohíbe autoplay y *"sonidos o imágenes que den la ilusión de ganar cuando el retorno es igual o menor a la apuesta"*; vigente desde **31/10/2021**.
- **Bonus buy:** `[VERIFICADO]` en mayo 2021 la UKGC emitió una **advertencia** (RTS 14A) tras hallar 6 operadores con "feature buy-in" (uno cobraba > £3.000). `[NO VERIFICADO]` una prohibición explícita nombrada "bonus buy" en las RTS.

### 4.3 Pruebas de RNG

`[VERIFICADO: NIST SP 800-22 Rev.1a, csrc.nist.gov, 2026-10-21]` Es la suite estadística clásica (15 tests). **NIST decidió revisarla (2022-04-19)** y aclarar que *no* debe usarse para evaluar RNG criptográficos; el propio documento dice que pasar los tests "no puede certificar" un generador. `[VERIFICADO: eprint.iacr.org/2022/169]` crítica académica "obsolete, possibly harmful". Para HuntHub (que usa CSPRNG + commit-reveal) esto confirma el camino actual: **no inventar RNG propio**, usar primitivas del sistema.

### 4.4 Laboratorios

GLI, eCOGRA, iTech Labs, BMM, Quinel certifican juegos. `[ASUNCIÓN]` según resúmenes de búsqueda; no se leyeron los estándares individuales de iTech/eCOGRA.

---

## 5. Evidencia académica (psicología del diseño)

| Hallazgo | Fuente | Estado |
|---|---|---|
| **LDW** (Losses Disguised as Wins): pagar menos que la apuesta con luces/sonido de victoria. En 40 novatos, la respuesta de conductancia de piel fue **igual** que en una victoria real y mayor que en pérdida normal. | Dixon, Harrigan, Sandhu, Collins, Fugelsang. *Addiction* 2010;105(10):1819-24. PMID 20712818 | `[VERIFICADO: PubMed, 2026-10-21]` |
| Con **940** participantes online, quien vio LDW **sobreestimó** victorias reales: **3.02** vs **2.14** (d = 0.44, p < .001), incluso en jugadores de bajo riesgo. | *J. Behavioral Addictions?* — sciencedirect S2352853223000226 (2023) | `[VERIFICADO: abstract]`; revista exacta `[NO CONFIRMADA]` |
| PAR sheets reales (FOI Ontario): bonus modes, hand-pays, nudges, near-miss, 35 % de "wins" < apuesta, versiones con distinto payback. | Harrigan & Dixon, *J. Gambling Issues* 23:81-110 (2009), DOI 10.4309/jgi.2009.23.5 | `[VERIFICADO: texto]` |
| Cursos universitarios y libros de matemática del juego (comparación de 7 libros). | Ethier & Hoppe, "Teaching a University Course on the Mathematics of Gambling" | `[VERIFICADO: texto, 12/42 pp.]` |
| Curso de desarrollo de slots (labs: payback, hit freq, volatilidad, reels, pick-em, progresivos). | T. Morelli, FDG 2014, paper 20 | `[VERIFICADO: extracción]` |
| Optimización de RTP por búsqueda de vecindad variable (VNS) en el juego base. | Tesis maestría, ResearchGate 349883169 | `[VERIFICADO: título/abstract solamente]` |
| Construcción de reels con simulaciones Monte Carlo. | ResearchGate 329880573 | `[VERIFICADO: título solamente]` |

---

## 6. Cursos y videos gratuitos

| Recurso | Tema | Estado |
|---|---|---|
| **Harvard Stat 110** (J. Blitzstein) — playlist YouTube | Probabilidad desde cero; base para RTP/varianza | `[VERIFICADO: página + descripción]` |
| **MIT 6.041SC** — 76 videos (25 clases + 51 recitaciones), CC BY-NC-SA | Probabilidad aplicada, esperanza, Bayes | `[VERIFICADO: OCW + YouTube]` |
| **"The Basic Mathematics of Slot Machines"** (docente con 5 años en videoslots) | Matemática básica de slots | `[VERIFICADO: título/descr.]`; contenido `[ASUNCIÓN]` hasta ver transcript |
| "Introduction to slot machine analysis" (serie en Excel) | Analizar slots con Excel | `[VERIFICADO: título/descr.]` |
| "Hidden Code: How Slot Machines Actually Work" (Dave's Garage) — capítulos "The math behind the spin" (3:27) y "Virtual reels explained" (5:20) | Divulgación técnica | `[VERIFICADO: capítulos]`; rigor `[ASUNCIÓN]` |
| "Mathematics & Gambling Ep. 2" (podcast *Carry the Two*) | Divulgación | `[VERIFICADO: título]` |

**Ingesta realizada:** transcript de "The Basic Mathematics of Slot Machines" mediante `tools/intelligence/video_course_ingester.mjs` (ver estado en sección 10).

---

## 7. Libros: públicos vs. no públicos

### 7.1 Públicos/gratuitos (legales, usados)

| Obra | Dónde | Licencia / nota |
|---|---|---|
| *Introduction to Probability* — Grinstead & Snell | math.dartmouth.edu/~prob/prob/prob.pdf | `[VERIFICADO]` "open source… freely distributed and printed" (AIM Open Textbook Initiative). |
| *Wizard of Odds — Slot Machines* (apéndices 1-6 y "Deconstructing…") | wizardofodds.com/games/slots/ | Gratis para leer. **Copyright del autor:** se ingestan notas propias, no el texto. |
| *Elements of Slot Design*, 3ª ed. — R. Muir | slotdesigner.com (PDF) | Gratis para descargar, **"all rights reserved"**: solo notas con cita, **no** se copia el libro. |
| Harrigan & Dixon 2009 (PAR sheets) | jgi.camh.net / cdspress.ca | Acceso abierto (*J. Gambling Issues*). |
| Ethier & Hoppe (curso de matemática del juego) | stat.berkeley.edu/~aldous/157/Papers/ | Público. |
| GLI-19 v3.0 | gaminglabs.com | Público (descarga oficial). |
| UKGC RTS | gamblingcommission.gov.uk | Público. |
| NIST SP 800-22 r1a | csrc.nist.gov | Público. |
| *Gaming Regulation and Mathematics: A Marriage of Necessity* | repository.law.uic.edu | Acceso abierto (UIC Law Review). `[NO LEÍDO]` |

### 7.2 NO públicos — necesitan compra, biblioteca o permiso (informados al dueño)

| Obra | Por qué importa | Estado |
|---|---|---|
| **Hannum & Cabot — *Practical Casino Math*, 2ª ed. (2005)** | Estándar de matemática de casino | Agotado (salvo edición china). `[VERIFICADO: Ethier & Hoppe]` Prioridad alta si se consigue por biblioteca/segunda mano. |
| **Packel — *The Mathematics of Games and Gambling*, 2ª ed. (MAA, 2006)** | Introducción corta y clara | Comercial. Hay copia en archive.org: **no usar**, legalidad `[NO CONFIRMADA]`. |
| **Ethier — *The Doctrine of Chances* (Springer, 2010)** | Referencia más completa (744 pp.) | Comercial. |
| **Epstein — *The Theory of Gambling and Statistical Logic*, 2ª ed. (Elsevier, 2013)** | Teoría general | Comercial; solo ebook. |
| **Bollman — *Basic Gambling Mathematics* (CRC, 2014)** | Nivel introductorio | Comercial. |
| **Taylor — *The Mathematics of Games* (CRC, 2015)** | Probabilidad con juegos | Comercial. |
| **Rodríguez & Mendes — *Probability, Decisions and Games* (Wiley, 2018)** | Con R y simulación | Comercial. |
| **Schüll — *Addiction by Design* (Princeton UP, 2012)** | Diseño de máquinas y conducta | Comercial. **Ya está en el KB** (ver 7.3); su origen es tu carpeta `librosparaingestar`. No busqué ni usé copias de terceros. |
| **Wilson, J. — artículos *Slot Tech Magazine* (2003-2004)**: "Slot machine volatility index", "Virtual reels? Physical reels?", serie "PAR excellence" | Matemática de PAR sheets desde la industria | Archivo online `[NO VERIFICADO]`; probablemente solo hemeroteca/suscripción. |
| **PAR sheets comerciales reales** | La "fuente" de cada juego | Confidenciales; Harrigan & Dixon las obtuvieron por **Ley de Acceso a la Información de Ontario (FIPPA)**. |
| **Estándares GLI-11 / GLI-13, iTech Labs, eCOGRA GAP** | Certificación de dispositivos | No se localizó versión pública verificada. |
| **Documentos de matemática por estudio (Pragmatic, Hacksaw, etc.)** | Modelos reales | Propietarios; solo se publican RTP y max win. |

### 7.3 Ya presentes en el KB (no hace falta volver a ingestar)

`[VERIFICADO: knowledge/INDEX.md §1.1, 2026-10-21]`

| Archivo | Obra | Nota de calidad |
|---|---|---|
| `streaming_and_overlays/book_how_slot_machines_actually_work_turner_horbay.md` | *How Do Slot Machines Actually Work?* (Turner & Horbay) | Específico de slots; es el más útil de los tres. |
| `streaming_and_overlays/book_addiction_by_design_natasha_dow_schull.md` | *Addiction by Design* (Schüll) | Etnografía/conducta, no matemática. |
| `streaming_and_overlays/book_probability_guide_to_gambling_barboianu.md` | *Probability Guide to Gambling* (Barboianu) | **Cuidado:** Ethier & Hoppe la excluyen de su lista de textos porque *"its treatment of probability is reliable, [but] its treatment of gambling is not"* `[VERIFICADO: Ethier & Hoppe]`. Usar solo para probabilidad básica, no para afirmaciones sobre casinos. |

---

## 8. Correcciones: datos de búsquedas automáticas que NO se verificaron

| Afirmación recibida | Resultado |
|---|---|
| "Bonus buy está prohibido en UK y Países Bajos." | `[DESCARTADO como hecho]`: solo se verificó una **advertencia** de la UKGC (mayo 2021). Sin fuente para Países Bajos. |
| "Virtual reels de 256, 512 o miles de posiciones." | Genérico. Ejemplos **verificados**: 64 (ejemplo didáctico), 47–50 (Lobstermania), 72 (otro juego de Ontario). |
| Una URL PMC me llevó a un paper de **telomerasa** | `[DESCARTADO]`: fue un error de ID de mi parte; no se usó. |
| Un ID PMC de "irreproducibilidad experimental" | `[DESCARTADO]`: no era el paper de LDW. |
| Página Wikipedia "Megaways" | `[DESCARTADO]`: no existe. |
| Gambling Commission `/rts` (404) | URL correcta documentada arriba. |
| Reglas de "RTP mínimo 85–92 %" por jurisdicción | `[NO VERIFICADO]`: no se hallaron cláusulas concretas. No usarlo. |

---

## 9. Implicancias para HuntHub (propuestas, requieren aprobación del CTO)

1. **Catálogo de slots:** agregar campo `rtp_bands` por juego y mostrar "RTP verificable en el casino" en lugar de un valor único. Pendiente de aprobación.
2. **Bonus Hunt:** calcular y mostrar el rango de confianza `RTP_bonus ± 1.96σ/√N` con N = compras hechas; dato educativo, sin promesas de ganancia.
3. **House Games (95 % RTP, max bet 50 $DIG):** auditar que ningún pago `≤ apuesta` dispare sonido/animación de victoria (alineado con UKGC 2021 y con nuestra regla de juego responsable).
4. **Ritmo de giro:** evaluar un piso de ~2,5 s en house-games (RTS 14D como referencia; no es obligatorio en Argentina `[ASUNCIÓN]`).
5. **RNG:** mantener CSPRNG + commit-reveal; no usar suites tipo NIST 800-22 como "certificado" (NIST lo desaconseja).

---

## 10. Estado de ingesta

| Elemento | Estado |
|---|---|
| Resumen canónico para el RAG | `knowledge/SLOTS_MATH_RTP_AND_REGULATION.md` (creado, con ancla de alcance) |
| Transcript "Basic Mathematics of Slot Machines" | Ingestado en `knowledge/slot-math/the_basic_mathematics_of_slot_machines_bradley.md` (233 líneas). **Cuarentena:** el ingestor lo sintetizó con Groq y el resultado es un "canon de arquitectura front-end" con afirmaciones no presentes en las fuentes. Marcado `[ASUNCIÓN]` con banner; la fuente fiable es el doc canónico. |
| Libros con "all rights reserved" (Muir, Wizard of Odds) | **No** copiados; solo notas propias con cita |
| Libros pagos | No ingestados (sección 7.2) |

---

## 11. Fuentes primarias consultadas

1. Wizard of Odds — https://wizardofodds.com/games/slots/appendix/2/
2. Harrigan & Dixon 2009 — https://cdspress.ca/wp-content/uploads/2022/08/Kevin-A.-Harrigan-Mike-Dixon-.pdf (DOI 10.4309/jgi.2009.23.5)
3. Dixon et al. 2010 — https://pubmed.ncbi.nlm.nih.gov/20712818/
4. LDW 2023 (940 participantes) — https://www.sciencedirect.com/science/article/pii/S2352853223000226
5. R. Muir, *Elements of Slot Design* — https://slotdesigner.com/wp/wp-content/uploads/Elements-of-Slot-Design-3rd-Edition.pdf
6. Morelli, FDG 2014 — http://www.fdg2014.org/papers/fdg2014_paper_20.pdf
7. Ethier & Hoppe — https://www.stat.berkeley.edu/~aldous/157/Papers/Ethier_gambling-course.pdf
8. GLI-19 v3.0 — https://gaminglabs.com/wp-content/uploads/2024/06/GLI-19-Interactive-Gaming-Systems-v3.0.pdf
9. UKGC RTS 7 — https://www.gamblingcommission.gov.uk/standards/remote-gambling-and-software-technical-standards/rts-7-generation-of-random-outcomes
10. UKGC RTS 14 — https://www.gamblingcommission.gov.uk/standards/remote-gambling-and-software-technical-standards/rts-14-responsible-product-design
11. UKGC comunicado 2021-02-02 — https://www.gamblingcommission.gov.uk/news/article/gambling-commission-announces-package-of-changes-which-make-online-games
12. UKGC advertencia feature buy-in — https://www.gamblingcommission.gov.uk/news/article/games-warning-for-online-operators
13. NIST SP 800-22 r1a — https://csrc.nist.gov/pubs/sp/800/22/r1/upd1/final · https://csrc.nist.gov/news/2022/decision-to-revise-nist-sp-800-22-rev-1a · https://eprint.iacr.org/2022/169
14. MGA Player Protection — https://www.mga.org.mt/licensee-hub/compliance/player-protection/
15. Hacksaw — https://www.hacksawgaming.com/games/rip-city · Track360 — https://track360.io/blog/slot-rtp-benchmarks-by-provider-reference-2026
16. Grinstead & Snell — https://math.dartmouth.edu/~prob/prob/prob.pdf
17. Harvard Stat 110 — https://www.youtube.com/playlist?list=PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo · MIT 6.041SC — https://ocw.mit.edu/courses/6-041sc-probabilistic-systems-analysis-and-applied-probability-fall-2013/
