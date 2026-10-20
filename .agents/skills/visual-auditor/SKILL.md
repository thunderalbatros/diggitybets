---
name: visual-auditor
description: "Automated 3-Stage Super-Auditor (Clean Code AST + Playwright 3-Viewport Graphic Design & CDP 60-FPS Telemetry + Google Lighthouse."
---

# Rol: Super-Auditor de Código Limpio, Diseño Gráfico, Composición, Fluidez 60-FPS y Accesibilidad (Playwright CDP + Google Lighthouse + Pa11y)

## Responsabilidad Principal
Ejecutar la suite de auditoría en 3 etapas en `tools/audit/`:
1. **Auditor de Código Limpio, AST y Arquitectura de Animaciones 60-FPS**:
   - Comando: `node tools/audit/code_clean_audit.mjs`
   - Salida: `tools/audit/out/clean-code-report.json` (`100/100` requerido).
   - Verifica sintaxis JS en 100% de controladores/overlays, ausencia de métodos duplicados, ausencia de supresiones (`@ts-ignore` / `eslint-disable`), protección `rel="noopener noreferrer"`, compatibilidad de glifos/emojis en Windows 10, ausencia de deformación 3D (`rotateX`/`rotateY`) en tarjetas interactivas, y que ningún `@keyframes` anime propiedades de layout (`top`/`left`/`margin`).
2. **Auditor Visual, de Composición, Simetría y Telemetría CDP 60-FPS (Playwright)**:
   - Comando: `node tools/audit/visual_audit.mjs [baseUrl]`
   - Salida: `tools/audit/out/report.json` + 30 capturas PNG en `tools/audit/out/<view>-<width>.png`.
   - Audita las **10 vistas** (`watch`, `bonushunt`, `tournament`, `house-games`, `store`, `stake-leaderboard`, `bounties`, `leaderboard`, `profile`, `admin`) en **3 resoluciones** (`1440px`, `768px`, `390px`), más telemetría en vivo del **Chrome DevTools Protocol (`Performance.getMetrics`)** y **Web Animations API (`document.getAnimations()`)**.
3. **Auditor Oficial Google Lighthouse (0–100) + Pa11y (`WCAG2AA`)**:
   - Comando: `node tools/audit/lighthouse_pa11y_audit.mjs`
   - Salida: `tools/audit/out/lighthouse-pa11y-report.json` y `tools/audit/out/AUDIT_SUMMARY.md`.
   - Ejecuta **Google Lighthouse** (`Performance`, `Accessibility`, `Best Practices`, `SEO` + `FCP`, `LCP`, `TBT`, `CLS`) y **Pa11y** (`WCAG2AA` con `axe-core` / `HTML_CodeSniffer`) usando el binario local de Chrome sin descargas redundantes.

## Restricciones Operativas ("Reglas Anti-Slop")
1. **Rechazo Inmediato ante Bloqueadores (`B:0 M:0 m:0`):** Se prohíbe dar por completada cualquier tarea si el reporte arroja:
   - Barras de scroll horizontal accidentales (`scrollWidth > clientWidth`).
   - Texto truncado por desbordamiento (`scrollWidth > clientWidth`).
   - Deformación 3D (`matrix3d`) sobre tarjetas interactivas (`.bounty-card-3d`, `.kick-podium-card`, `.store-voucher-card`) — solo se permite levitación vertical limpia (`translateY`) y borde láser perimetral.
   - Errores de consola (`console.error` / `pageerror`) o recursos 404.
2. **Auditoría de Contraste y Accesibilidad (WCAG2AA + Pa11y + Lighthouse):** Todo texto normal debe tener ratio $\ge 4.5:1$ y pasar el barrido `WCAG2AA` de Pa11y.
3. **Área Táctil (Mobile Tap Targets):** Todo botón o link interactivo en anchos $\le 480\text{px}$ debe tener al menos $32\times 32\text{px}$ ($\ge 34\text{px}$ recomendado).
