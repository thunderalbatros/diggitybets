# HuntHub — Guía Maestra de Animaciones Web Modernas, Eficientes y Estéticas (2026)

> **Documento:** `research/ADVANCED_WEB_ANIMATIONS_AND_MOTION_GUIDE_2026.md`  
> **Autor:** Antigravity Design Engineering Squad (Inspirado en Emil Kowalski, Apple WWDC, FormKit, Motiondivision & Julian Garnier)  
> **Fecha:** Octubre 2026  
> **Directiva de Hardware:** Notebook HP 250 G8 (Windows, CPU/RAM acotada, OBS Studio $\le 5\%$ CPU) & Dispositivos Móviles (60-120 FPS fluidos).  
> **Costo:** 100% Gratuito y Open-Source ($0 USD / $0 ARS).

---

## 1. Resumen Ejecutivo & Filosofía de "Design Engineering"

La diferencia entre una página web común y una plataforma moderna que genera impacto inmediato no radica en agregar más efectos, sino en la **física y la precisión invisible del movimiento**.

> *"Cuando un detalle funciona exactamente como el usuario espera, ni siquiera lo nota de forma consciente; simplemente siente que la aplicación 'vuela' y tiene una calidad insuperable."* — Emil Kowalski

### Principios Inquebrantables de HuntHub:
1. **La regla de la frecuencia:**
   - Acciones que el usuario ejecuta **más de 100 veces por día** (escribir en chat, presionar teclas de atajo, cambiar pestañas rápidamente): **CERO animación o duración ultracorta ($\le 120\text{ms}$)**. Las animaciones lentas en acciones frecuentes se perciben como lentitud del sistema.
   - Acciones que ocurren de vez en cuando (abrir un modal, desplegar un menú, confirmar una apuesta): **Animación estándar con físicas de resorte ($\sim 200 - 300\text{ms}$)**.
   - Momentos de celebración poco frecuentes (ganar un jackpot, acertar una predicción, clasificar en el torneo): **Animación rica y gratificante (partículas, fanfarria, confeti)**.
2. **Nada aparece de la nada (*"Nothing from nothing"*):**
   - Nunca escalar desde `scale(0)`: en el mundo físico nada nace de un punto microscópico. Los modales y tarjetas deben emerger desde `scale(0.95)` o `scale(0.97)` combinados con `opacity: 0`.
3. **Respuesta en el `pointerdown` (Feedback Instantáneo):**
   - Todo botón interactivo debe reaccionar en el instante del clic/toque: `:active { transform: scale(0.97); }`.

---

## 2. Física y Matemáticas del Movimiento (Springs vs Bézier)

### 2.1 Ecuación del Oscilador Armónico Amortiguado
Las animaciones físicas no tienen una duración fija predeterminada, sino que emergen de la interacción de masa ($m$), rigidez ($k$) y coeficiente de amortiguamiento ($c$):

$$m \frac{d^2x}{dt^2} + c \frac{dx}{dt} + k x = 0$$

El factor de amortiguamiento adimensional ($\zeta$) determina el comportamiento:

$$\zeta = \frac{c}{2 \sqrt{m \cdot k}}$$

| Factor $\zeta$ | Tipo | Comportamiento | Uso en HuntHub |
| :--- | :--- | :--- | :--- |
| $\zeta = 1.0$ | **Amortiguamiento Crítico** | Llega a la meta en el menor tiempo posible **sin rebotar**. | Modales, cambio de pestañas, aperturas de cajón. |
| $\zeta \approx 0.8$ | **Sub-amortiguado Sutil** | Realiza un micro-rebote orgánico casi imperceptible. | Soltar una ficha arrastrada, botón con momentum. |
| $\zeta < 0.6$ | **Muy Elástico** | Rebota múltiples veces. | **Prohibido en UI general** (genera mareo); solo reservado para victoria en slots. |

### 2.2 Curvas Bézier Asimétricas de Alto Rendimiento
En CSS nativo, donde no se utiliza un loop de física por JS, la curva recomendada por Apple y Vercel es la curva quíntica asimétrica:

```css
/* Curva Apple Spring / Quintic Ease-Out */
--ease-out-quint: cubic-bezier(0.16, 1, 0.3, 1);

/* Curva Rápida para Micro-Interacciones (150ms) */
--ease-out-fast: cubic-bezier(0.32, 0.72, 0, 1);
```

> **Regla de Oro:** **`ease-in` está totalmente prohibido** para entradas de elementos porque arranca lento y se siente pesado. `linear` está prohibido excepto para giros continuos de ruedas o ambientación.

---

## 3. Presupuesto de Rendimiento (Zero-Jank en HP 250 G8 y OBS)

### 3.1 El Pipeline del Navegador (Layout $\rightarrow$ Paint $\rightarrow$ Composite)
Para mantener 60 FPS fijos, el navegador tiene exactamente **16.6 ms** por cuadro. En monitores de 120 Hz, el presupuesto baja a **8.3 ms**.

```
[ Modificación de Estilos ]
          │
          ▼
   1. LAYOUT (Reflow)        ──> Mide geometrías (width, height, top, left, margin, padding) ❌ ¡CARO!
          │
          ▼
   2. PAINT (Rasterizado)    ──> Pinta píxeles (background-color, box-shadow, border-radius) ⚠️ MEDIO
          │
          ▼
   3. COMPOSITE (GPU)        ──> Mueve capas ya pintadas (transform, opacity) ✅ ¡ULTRALIVIANO!
```

### 3.2 Tabla de Sustituciones de Propiedades (GPU-Only)
Para garantizar menos del 5% de CPU en OBS Studio y fluidez total en notebooks:

| En lugar de animar (Costoso) | Animar en su lugar (GPU Compositor) | Razón Técnica |
| :--- | :--- | :--- |
| `width`, `height`, `padding` | `transform: scale()` | Evita recalcular el layout de toda la página. |
| `top`, `left`, `margin-top` | `transform: translate3d(x, y, 0)` | Promueve la animación a la GPU sin repintar. |
| `box-shadow` | `filter: drop-shadow(...)` | `box-shadow` fuerza repintado completo en cada cuadro. |
| `transition: all` | `transition: transform 200ms var(--ease-out-quint), opacity 150ms ease-out` | `all` dispara verificaciones de layout en propiedades imprevistas. |
| `filter: blur(40px)` | `filter: blur(8px)` | Los desenfoques gaussianos $>20\text{px}$ saturan los shaders de la GPU integrada Intel. |

### 3.3 Estabilidad Tipográfica con Números Tabulares
En marcadores de multiplicadores (Limbo, Crash, Dados) y saldos ($DIG):
```css
/* Evita que los números tiemblen horizontalmente mientras se actualizan */
.tabular-numbers, .metric-value, .balance-display {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
}
```

---

## 4. Repositorios de Referencia Clonados e Ingeridos (23 Repositorios)

Todos los repositorios han sido clonados con `--depth 1` dentro de [`references/clones/`](file:///c:/Users/tomas/Desktop/streamerbot/references/clones/) para consulta técnica inmediata:

```
references/clones/
├── animejs/                    Julian Garnier — Anime.js v4 (Motor modular de timelines, resortes y morphing)
├── auto-animate/               FormKit — Zero-config FLIP transitions para inserciones y ordenamientos de listas
├── canvas-confetti/            Kiril Matev — Partículas de confeti/monedas en HTML5 Canvas (0 impacto en el DOM)
├── countup-js/                 Inorganik — Interpolación numérica continua con ease-out a 60 FPS
├── sonner/                     Emil Kowalski — Sistema de notificaciones toast con físicas de resorte y gestos
├── vaul/                       Emil Kowalski — Cajón móvil táctil swipeable con resistencia elástica (rubber-banding)
├── motion/                     Motiondivision (Framer Motion) — Animaciones aceleradas por hardware vía WAAPI
├── emil-skills/                Emil Kowalski — RAG con heurísticas de diseño, auditoría de motion y performance
├── react-bits/                 DavidHDev — Componentes de UI interactivos animados (text reveal, spotlights)
├── magicui/                    MagicUI — Efectos dark luxury (shimmer buttons, grid patterns, neon borders)
├── motion-primitives/          Ibelick — Micro-interacciones minimalistas para interfaces modernas
├── lenis/                      Darkroom Engineering — Smooth scrolling cinematográfico sin jank
├── vfair-games/                Vfair — Algoritmos Provably Fair HMAC-SHA256 y arquitectura de apuestas
├── stake-originals-clone-react Tanh1c — Réplica visual y de tableros de Stake (Crash, Plinko, Mines, Dino)
├── plinko-game-matter/         Matter.js Plinko — Colisiones deterministas y deflexión física en clavijas
├── plinko-game-svelte/         AnsonH — Implementación liviana de tablero Galton
├── nours-casino/               Nou4r — 11 juegos en Canvas nativo puro a 120 FPS
├── casino-case-opening/        ISoft-op — Animación horizontal de ruleta desacelerada con interpolación
├── grow-game/                  BrightKingsley — Fullstack de juegos de casino provably fair con WebSockets
├── kick-api/                   Nekiro — SDK oficial TypeScript para Kick API v1
├── kick-auth/                  BOT-K4CP3R — Flujo OAuth 2.1 PKCE para Kick
├── kick-js/                    Retconned — Conexión WebSocket ligera a Pusher Kick sin credenciales
└── vercel-commerce/            Vercel — Arquitectura moderna de ecommerce, store y gestión de estados
```

---

## 5. Casos de Uso Específicos para Casino Streamers (HuntHub)

### 5.1 Ruleta Continua y Desaceleración Fiel de Casino
- **Giro Ambiental:** Rotación continua a $0.18^\circ$ por cuadro mediante `requestAnimationFrame`. No se interrumpe abruptamente al iniciar un sorteo.
- **Lanzamiento de Bola:** La bola de marfil es disparada en sentido contrario a la rueda en el borde exterior ($r = 152\text{px}$) y desacelera con una curva quíntica mientras espirala hacia el centro ($r = 135\text{px}$).
- **Bloqueo Solidario:** Al entrar en la casilla ganadora, la bolita queda anclada rígidamente a la casilla rotante por al menos $1.5$ segundos con un destello dorado antes de proclamar al ganador.

### 5.2 Limbo Instant Punch Slam
- **Cero Latencia Artificial:** En Limbo, el multiplicador no debe tardar 1 segundo en contar si el usuario juega muchas rondas. El impacto es instantáneo ($\le 10\text{ms}$) con una escala elástica de golpe:
```css
@keyframes limbo-slam {
  0% { transform: scale(0.85); opacity: 0.8; }
  50% { transform: scale(1.12); }
  100% { transform: scale(1); opacity: 1; }
}
```

### 5.3 Lluvia de Monedas y Confeti sin Fuga de Memoria
- Utilizando `canvas-confetti`, se dispara una ráfaga con origen dual (esquinas inferiores o centro de pantalla) disparando monedas doradas y fichas rojas con vectores de gravedad reales.
- El canvas se destruye y libera de la memoria de la GPU automáticamente tan pronto la última partícula sale de la pantalla.

---

## 6. Plan de Implementación para el Sitio Real Online (Producción)

### Fase 1: Integración de Micro-Interacciones en Componentes Core
1. **Adopción de AutoAnimate en el Portal:**
   - Incorporar `auto-animate` en la tabla de la **Bonus Hunt**, en el cuadro del **Torneo 8-Bracket** y en la lista de **predicciones recientes**. Las inserciones y eliminaciones se ordenarán automáticamente sin saltos secos de pantalla.
2. **Reemplazo de Tickers por `CountUp.js`:**
   - Vincular `CountUp.js` al saldo de `$DIG` y a las métricas de la Bonus Hunt (*Req Avg X*, *Winnings*, *Current Avg*). Al actualizarse un valor, la cifra sube con una interpolación suave en 60 FPS en lugar de cambiar bruscamente.
3. **Puntos de Contacto y Botones (Apple Press Feedback):**
   - Aplicar `:active { transform: scale(0.97); }` y `transition: transform 120ms var(--ease-out-quint)` a todas las opciones de fichas de ruleta, botones de doblar en Blackjack y selectores de riesgo en Plinko.

### Fase 2: Notificaciones y Toasts con Físicas de Resorte (`Sonner`)
1. Reemplazar el contenedor `#hg-toast` clásico por el motor de apilamiento dinámico de `sonner`, permitiendo múltiples alertas (ganancias, mensajes de chat, pings de torneo) que se apilan con profundidad 3D y se pueden descartar deslizando con el dedo (*swipe to dismiss*).

### Fase 3: Despliegue en Cloudflare Pages & Web Worker
1. Empaquetar el frontend optimizado con minificación de assets estáticos y fuentes cacheadas localmente.
2. Servir a través de la red perimetral de Cloudflare con compresión Brotli y cabeceras de caché inmutables para 0ms de tiempo de carga en todo el mundo.
