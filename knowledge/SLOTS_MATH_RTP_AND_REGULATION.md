# Slots: matemática, RTP y regulación (canónico verificado)

**Alcance:** este doc cubre cómo se calcula el RTP, la hit frequency y la volatilidad de una slot, cómo funcionan los virtual reels, y qué exigen GLI-19 y la UKGC. NO es fuente de reglas de Kick (ver `KICK_API_REFERENCE.md`), NI de precios de la tienda $DIG, NI del catálogo de slots de Stake (ver `POPULAR_SLOTS_ONLY_ON_STAKE_TIERS.md`).
**Tipo (Diátaxis):** referencia. **Detalle y fuentes completas:** `docs/research/REPORTE_MATEMATICA_SLOTS_ONLINE_2026-10-21.md`.

## Fórmulas
- RTP = (premio promedio / apuesta promedio) × 100 %; esperanza E = Σ pᵢ·premioᵢ.
- Desvío σ = √(Σ pᵢ·(premioᵢ − media)²). Índice de volatilidad al 95 % = 1.96σ (90 % → 1.64σ; 99 % → 2.58σ).
- Rango de RTP tras N juegos = RTP ± VI/√N. `[VERIFICADO: Muir, Elements of Slot Design 3ª ed., 2026-10-21]`
- Free spins con retrigger: F = [B₀ + B₁·n₁·p₁·(1/(1 − n₂·p₂))] / apuesta × 100 %.

## Virtual reels
- Cada rodillo es una tabla de posiciones virtuales con pesos; varias posiciones pueden mostrar el mismo símbolo.
- Ejemplo: 64 posiciones por rodillo → 64³ = 262,144 combinaciones; RTP del juego didáctico = 94.545 %. `[VERIFICADO: Wizard of Odds, apéndice 2, 2026-10-21]`
- Lucky Larry's Lobstermania: rodillos de 47/46/48/50/50 símbolos = 259,440,000 combinaciones. La hit frequency por línea (5.25 %) no es la del giro (33.52 % a 15 líneas). `[VERIFICADO: Harrigan & Dixon, J. Gambling Issues 23, 2009]`

## RTP online
- Un mismo juego tiene varias versiones de RTP; ejemplo *Rip City* (Hacksaw): 96.22 / 94.27 / 92.32 / 88.02 %. `[VERIFICADO: hacksawgaming.com, 2026-10-21]`
- El RTP demo debe igualar al real. `[VERIFICADO: MGA Player Protection, 2026-10-21]`

## Regulación y diseño responsable
- GLI-19 v3.0: RNG (cl. 3.2.x, 3.3.x), equidad del juego (4.6.x), porcentaje de pago y visualización de RTP (4.7.1, 4.7.2). `[VERIFICADO: títulos de cláusula, 2026-10-21]`
- UKGC RTS 7C (prohíbe engañar sobre probabilidades, incl. near-miss sustituido), RTS 14D (mínimo 2.5 s por ciclo), RTS 14E (sin turbo/slam stop). `[VERIFICADO: gamblingcommission.gov.uk, 2026-10-21]`
- Desde 31/10/2021 en UK: sin autoplay y sin sonidos/imágenes de victoria cuando el retorno ≤ apuesta. `[VERIFICADO: comunicado 2021-02-02]`
- LDW: la respuesta fisiológica a una "pérdida disfrazada de victoria" iguala a la de una victoria real. `[VERIFICADO: Dixon et al., Addiction 2010, PMID 20712818]`
- NIST SP 800-22 no certifica un RNG; NIST decidió revisarlo (2022-04-19). `[VERIFICADO: csrc.nist.gov]`

## Lo que NO está verificado (no afirmar)
- Prohibición explícita de "bonus buy" por la UKGC (solo hay advertencia de mayo 2021).
- Mínimos de RTP por jurisdicción.
- Que Stake corra la banda de RTP de un catálogo genérico: verificar en la pantalla de info del juego.
