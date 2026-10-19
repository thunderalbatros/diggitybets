**Alcance:** Síntesis de Misbehaving (Richard Thaler): contabilidad mental, efecto dotación, utilidad de transacción y arquitectura de decisiones. (Fuente migrada y curada desde Yendo Mobile Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

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

# 🧠 Misbehaving: The Making of Behavioral Economics (Richard H. Thaler — Premio Nobel)

Este tratado formaliza la asimilación profunda de la obra cumbre de Richard Thaler (*Misbehaving: The Making of Behavioral Economics*, W. W. Norton) y su transferencia directa al diseño de producto, incentivos y pricing de **Yendo Mobile**.

---

## 🏛️ 1. Tesis Fundamental: La Ruptura con el "Homo Economicus"

La microeconomía tradicional asume que los seres humanos son *Econs*: agentes ultra-racionales que optimizan funciones de utilidad complejas sin sesgos emocionales, con fuerza de voluntad infinita y perfecta información.
En el mundo real —y especialmente en la noche porteña—, los usuarios son *Humans*: impredecibles, sesgados por el presente, influenciados por el contexto social y guiados por heurísticas de Sistema 1.

---

## 💡 2. Los 5 Modelos Conductuales Clave de Thaler en Yendo

### 2.1. Utilidad de Adquisición vs Utilidad de Transacción
Thaler divide el valor de cualquier compra en dos componentes:
1. **Utilidad de Adquisición ($U_A$):** El valor intrínseco del bien recibido comparado con su precio monetario ($U_A = V - P$).
2. **Utilidad de Transacción ($U_T$):** El placer o dolor psicológico derivado de percibir que se obtuvo un *"buen trato"* ($U_T = P_{\text{referencia}} - P$).

> **Aplicación en Yendo:** El usuario no solo valora la cerveza o la mesa en Palermo ($U_A$). Lo que detona la satisfacción viral es la **Utilidad de Transacción ($U_T$)**: sentir que, gracias al Quórum de Yendo, el bar le liberó una mesa preferencial con 20% off que cualquier cliente de la calle pagaría más cara.

### 2.2. Contabilidad Mental y Presupuesto Hedonista (Mental Accounting)
- Los individuos clasifican el dinero en cuentas mentales no fungibles. El gasto en ocio de fin de semana pertenece a una cuenta de "fondo perdido para disfrute".
- **El Dolor de Pagar (Pain of Paying):** Pagar cada trago individualmente con tarjeta genera fricción y activa la ínsula cerebral (dolor físico).
- **En Yendo:** El protocolo **Split the Bill** en 1 tap y la billetera de tokens **Y$** desacoplan el momento del consumo del momento del desembolso, reduciendo drásticamente el dolor de pagar y aumentando el ticket promedio en el comercio aliado.

### 2.3. El Efecto Dotación (The Endowment Effect)
- Las personas valoran un objeto o privilegio sustancialmente más cuando sienten que **ya les pertenece**, que cuando aún no lo poseen.
- **En Yendo:** La mecánica del **Companion Pass** y los spots de quórum pre-asignados le dicen al usuario: *"Ya tienes 1 lugar guardado en la mesa de Niceto Club"*. Perderlo por inacción duele 2.5x más que no haberlo tenido nunca, impulsando la confirmación activa.

### 2.4. El Modelo "Planificador vs Ejecutor" (Planner-Doer Model)
- Los humanos sufren de **Inconsistencia Intertemporal** (*Present Bias*): el "Planificador" el miércoles decide que el viernes va a salir a cenar temprano, pero el viernes a las 20:00 el "Ejecutor" siente pereza de cambiarse y salir (*Decision Fatigue*).
- **Mecanismo Nudge en Yendo:** Notificaciones contextuales proactivas con geofencing que reducen la fricción cognitiva y activan al Ejecutor mediante validación social de sus amigos ya en camino.

### 2.5. Justicia Percibida y la Trampa del Surge Pricing (Fairness & Price Gouging)
- Los experimentos de Kahneman, Knetsch y Thaler (1986) demostraron que los consumidores consideran **injusto e inaceptable** que un comercio aumente sus precios repentinamente solo porque la demanda se disparó (ej. Uber multiplicando x4 la tarifa bajo una tormenta).
- **Directiva Innegociable para Yendo:** Prohibido el dynamic pricing abusivo hacia el consumidor final. Yendo no encarece la noche cuando hay sobredemanda; al contrario, **recompensa al usuario que llena los horarios valle (RevPASH)**, alineando los incentivos de justicia social con el beneficio del comercio.

---

## Relaciones de Contexto
- [[YENDO_BUSINESS_DNA]]
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[RevPASH]]
- [[Número de Dunbar]]
- [[CANON_ECONOMIA_MATEMATICA_PRICING_SOTA_2026]]
- [[CABA_GROUND_TRUTH_ECONOMIA_Y_BOLSILLO_PORTENO_2026]]
- [[GAME_THEORY_GROWTH_LOOPS_Y_DUNBAR_QUORUM]]
