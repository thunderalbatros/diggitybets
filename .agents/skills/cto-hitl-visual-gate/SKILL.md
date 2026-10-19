---
name: cto-hitl-visual-gate
description: Enforces the 5-Stage Automated Pre-HITL Visual Quality Gate (AST + Playwright 4-Viewport Geometry & break-ui + CDP 60-FPS Telemetry + Lighthouse/Pa11y/APCA/UXBench + VLM Vision Critic) and generates the standardized CTO HITL Visual Sign-Off Packet before requesting human visual approval.
---

# 👑 CTO HITL Visual Gate — Protocolo de 5 Compuertas Automatizadas Pre-Aprobación

**Alcance:** Obligatorio antes de pedir el "visto bueno visual" al **CTO Human-In-The-Loop (HITL)** tras cualquier cambio en HTML, CSS, diseño gráfico, layout, shaders, efectos o animaciones.

## Regla de Oro (Cero Interrupciones Prematuras al CTO)
El CTO HITL es el Director de Arte y Producto de última instancia, **NO un tester manual**. Queda terminantemente prohibido presentar una pantalla al CTO HITL sin haber superado antes las **5 Compuertas Automatizadas en Verde (`B:0 M:0 m:0` y `Score >= 95/100`)**:

1. **Compuerta 1 — AST, Tokens & Compositor CSS (`node tools/audit/code_clean_audit.mjs` + `node tools/audit/security_and_motion_audit.mjs`)**:
   - Cero `@keyframes` animando `top`, `left`, `width`, `height` o `margin` (solo `transform` y `opacity` en GPU).
   - Cero deformaciones `matrix3d` en tarjetas informativas (`.bounty-card-3d`, `.kick-podium-card`, `.store-voucher-card`).
   - 100% sanitización XSS (`window.escapeHTML` / `textContent`).
2. **Compuerta 2 — Geometría Matemática Multi-Viewport & Estrés `break-ui` (`node tools/audit/visual_audit.mjs`)**:
   - Verificación en **Desktop (`1440x900`)**, **Laptop (`1366x768`)**, **Tablet (`768x1024`)** y **Mobile (`390x844`)**:
     - `scrollWidth <= clientWidth + 1` (cero scroll horizontal accidental).
     - Cero texto truncado involuntario (`scrollWidth > clientWidth + 2`).
     - Cero colisión de cajas entre hermanos (`ox > 8 && oy > 8`).
     - Simetría axial óptica del logo central (`<= 4px` respecto a `vw / 2`).
     - Ratio de espacio limpio negativo $\ge 35\%$.
     - Resistencia ante datos extremos (`break-ui`: nombres de 32 caracteres, saldos de `$99,999,999.99`, estados vacíos).
3. **Compuerta 3 — Telemetría CDP 60-FPS & Presupuesto OBS (`<= 5% CPU`)**:
   - `CLS === 0.00`, pausa automática cuando `document.hidden === true`, y hibernación `1x1` en lienzos Canvas inactivos.
4. **Compuerta 4 — Accesibilidad Perceptual & UX Cognitivo (`node tools/audit/lighthouse_pa11y_audit.mjs` + `node tools/audit/cognitive_ux_auditor.mjs`)**:
   - Contraste WCAG2AA / `APCA` ($L_c \ge 60$), áreas táctiles $\ge 32\times 32\text{px}$, `PopupNoClose = 0` en modales, y avisos `+18` / `100% Free`.
5. **Compuerta 5 — Crítico Semántico Multimodal (`VLM UI Critic`)**:
   - Evaluación de las capturas PNG sobre 6 ejes (*Jerarquía Focal, Ritmo/Alineación, Pureza Oscura OKLCH, Legibilidad `tabular-nums`, Coherencia de Componentes y Cero Artefactos*).

## Formato del Paquete de Entrega al CTO HITL (*Visual Sign-Off Packet*)
Una vez aprobadas las 5 compuertas, entregá al CTO HITL:
1. **Carrusel Visual Multi-Viewport** (`1440px`, `768px`, `390px`) con capturas reales copiadas al directorio de artefactos.
2. **Tabla de Certificación de las 5 Compuertas** con salidas reales de consola.
3. **Feedback Loop Directo**: Cualquier preferencia estética expresada por el CTO HITL se registra inmediatamente como un **Instinto de Confianza `0.98`** en `.agents/memory/temporal_ledger.json`.
