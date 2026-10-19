**Alcance:** Síntesis de Accessibility for Everyone (Laura Kalbag): accesibilidad web WCAG, semántica HTML, navegación por teclado y contraste. (Fuente migrada y curada desde Yendo Mobile Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

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

# ♿ Tratado Canónico: Accesibilidad Universal en Aplicaciones Móviles
### Basado en: *Accessibility for Everyone* (A Book Apart Series)
**Autora:** Laura Kalbag
**Archivo Fuente:** `unsorted/pdfcoffee.com_accessibility-for-everyone-pdf-free.pdf` (166 páginas)

---

## 1. La Accesibilidad como Derecho Fundamental y Calidad de Ingeniería

Laura Kalbag desmitifica la idea de que la accesibilidad es un "parche caritativo de último momento" para una minoría:

> **"La discapacidad no es una característica médica aislada de una persona; la discapacidad es el desajuste entre las capacidades de un ser humano y el diseño del entorno o la interfaz construida."**
> — Laura Kalbag

En el contexto de una aplicación de vida nocturna y eventos como Yendo, **todos los usuarios experimentan discapacidades situacionales o temporales en algún momento de la noche**:
- Iluminación nula o estroboscópica en plataforma (discapacidad visual situacional).
- Ruido ensordecedor de parlantes a 105 dB (discapacidad auditiva situacional).
- Sostener un vaso o campera con una mano mientras camina (discapacidad motriz situacional).
- Fatiga extrema o embriaguez leve (discapacidad cognitiva situacional).

---

## 2. Los 4 Pilares del Estándar WCAG 2.1 AA/AAA Aplicados a Web UI / Vanilla & Modern Frontend

### 1. Perceptible (Perceptibility)
- **Contraste Mínimo de Color:**
  - Texto estándar: Relación de contraste mínima de **4.5:1** contra el fondo.
  - Texto grande ($\ge 18\text{pt}$ o bold $\ge 14\text{pt}$) y controles UI: Mínimo **3.0:1**.
  - En el modo oscuro de Yendo, el texto `#FFFFFF` o `#E0E0E0` sobre fondo `#0A0A0A` supera un contraste de **16:1**, garantizando legibilidad en la oscuridad de la calle.
- **Soporte de Dynamic Type:** La interfaz no puede truncar o desbordar texto cuando el usuario activa fuentes grandes en iOS o Android.

### 2. Operable (Operability)
- **Blancos Táctiles Generosos (Fitts Tap Targets):** Todo botón o enlace táctil debe medir al menos **$48 \times 48\text{dp}$**.
- **Independencia de Gestos Complejos:** Nunca exigir gestos multitáctiles complejos o pellizcos (pinch-to-zoom) para una acción crítica de compra o check-in; ofrecer siempre una alternativa de tap simple.

### 3. Comprensible (Understandability)
- **Semántica de Lectores de Pantalla (VoiceOver en iOS / TalkBack en Android):**
  Todo componente personalizado en Web UI / Vanilla & Modern Frontend debe declarar sus roles y etiquetas accesibles:
  ```tsx
  <Pressable
    accessible={true}
    accessibilityRole="button"
    accessibilityLabel="Confirmar reserva en Niceto Club"
    accessibilityHint="Doble toque para completar el check-in con tu huella digital"
    onPress={handleConfirm}
  >
    {/* Contenido visual */}
  </Pressable>
  ```

### 4. Robusto (Robustness)
- Las alertas y cambios de estado (ej: *"Quórum completado"*, *"Error de conexión"*) deben anunciarse a través de `AccessibilityInfo.announceForAccessibility()`.

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[CANON_DESIGNING_FOR_TOUCH_JOSH_CLARK]]
- [[CANON_LAWS_OF_UX_PSYCHOLOGY_FRAMEWORKS]]
- [[DESIGN_SYSTEM_MAP]]
