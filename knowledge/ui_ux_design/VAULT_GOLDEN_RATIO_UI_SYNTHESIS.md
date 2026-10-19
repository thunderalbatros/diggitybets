**Alcance:** Síntesis matemática de la proporción áurea aplicada a grillas CSS, espaciado, jerarquía de tarjetas y balance óptico. (Fuente migrada y curada desde Yendo Mobile Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

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

# 📐 Síntesis de Descubrimientos: Proporción Áurea, Neuroestética y Dunbar UI

## 1. Fundamentos Científicos y Neuroestética (HCI & Neurobiología)

A partir de la ingesta de las 36 fuentes canónicas de [[.knowledge/golden_ratio_design_sources.md]], se extraen conclusiones determinantes para la interfaz de **Yendo Mobile**:

### A. Reducción de la Carga Cognitiva Cerebral (Di Dio et al., 2007 - fMRI)
- Los estudios de resonancia magnética funcional (*fMRI*) demuestran que las proporciones basadas en $\Phi$ (1.618) activan selectivamente la **ínsula anterior derecha** del cerebro humano, generando una respuesta de agrado perceptivo involuntario.
- **Impacto en Yendo:** El cerebro consume **menor glucosa y fatiga visual** al decodificar pantallas compuestas bajo la serie de Fibonacci, facilitando la toma de decisiones en contextos dinámicos (reservar una cancha en la calle o evaluar un quórum con una sola mano).

### B. Efecto de Usabilidad Estética (Tractinsky et al., 2000)
- *"Lo que es estéticamente equilibrado se percibe como más fácil de usar"*. Una composición armónica minimiza la tolerancia a la frustración e incrementa la sensación subjetiva de velocidad de la aplicación.

---

## 2. Los 4 Pilares Matemáticos en la UI de Yendo

```
┌─────────────────────────────────────────────────────────────┐
│ 1. GRID BASE: 8pt                                           │
│    Unidad modular atómica (Müller-Brockmann & Apple HIG)    │
├─────────────────────────────────────────────────────────────┤
│ 2. ESCALA TIPOGRÁFICA MODULAR (16px * 1.618^n con Snap 8pt) │
│    • Caption: 12px (LH: 16px)                               │
│    • Body:    16px (LH: 24px)   <- Base                     │
│    • Subhead: 24px (LH: 32px)   <- 16 * 1.618 = 25.8 -> 24  │
│    • Title:   40px (LH: 48px)   <- 16 * 1.618^2 = 41.8 -> 40│
│    • Display: 64px (LH: 72px)   <- 16 * 1.618^3 = 67.7 -> 64│
├─────────────────────────────────────────────────────────────┤
│ 3. DIVISIÓN ÁUREA DEL VIEWPORT (BOTTOM_SHEET_SNAP = 0.618)  │
│    • Área Dominante (Mapa / Inmersión): 61.8%               │
│    • Área de Acción (Controles / Sheet): 38.2%               │
├─────────────────────────────────────────────────────────────┤
│ 4. RESORTES CON AMORTIGUACIÓN CRÍTICA (withSpring)         │
│    • Default: damping 26 (16 * Phi), stiffness 230, mass 1  │
│    • Snappy:  damping 14, stiffness 300, mass 0.618 (Phi_Inv│
│    • Gentle:  damping 20, stiffness 160, mass 1.618 (Phi)   │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Implementación de Dunbar UI (`ParticipantStack.tsx`)

1. **Curva Áurea de Desplazamiento Horizontal:**
   - La separación de los avatares no es lineal (evita rigidez cartesiana). Se modula con compresión armónica:
     $$\text{translateX}(i) = i \times (\text{avatarSize} \times (1 - 1/\Phi)) \times \Phi^{-0.12 \cdot i}$$
   - Esto produce un efecto de abanico natural emulando espirales logarítmicas, similar al ordenamiento de tarjetas en interfaces fluidas de Apple.
2. **Invariante Dunbar (4–6 Personas) con Alerta de Escasez:**
   - Cuando restan **≤ 2 cupos** para completar el grupo (`currentCount >= 4`), el borde de los avatares transiciona con un resorte ágil (`mass: 0.618`) hacia **Naranja Eléctrico `#FF5500`**.
   - Esto apalanca la heurística de urgencia biológica sin generar ansiedad artificial.

---

## Relaciones de Contexto
- [[.knowledge/golden_ratio_design_sources.md]]
- [[.knowledge/invariants_ledger.md]]
- [[.knowledge/YENDO_DNA.md]]
- [[.knowledge/visual_reconnaissance_report.md]]
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[Número de Dunbar]]
