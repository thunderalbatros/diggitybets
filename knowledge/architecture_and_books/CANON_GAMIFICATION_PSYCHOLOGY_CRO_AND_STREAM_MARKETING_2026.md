# CANON: Gamificación, Psicología del Juego, Marketing de Streams y Optimización de Conversión (CRO) 2026

**Alcance:** Aplicable a HuntHub / DiggityBets (Portal Web `site/`, Sistema de Lealtad `$DIG`, Bounties *Only on Stake*, Tienda de Recompensas, Sorteos y Embudos de Afiliados VIP). Sujeto a las reglas éticas de Juego Responsable `+18` (`AGENTS.md §2.2`).

> **[VERIFICADO: Yu-kai Chou Octalysis + Nir Eyal Hooked + Kahneman/Tversky Prospect Theory + Cialdini Persuasion + Responsible Gambling Standards, 2026-10-19]**

---

## 1. Marco Octalysis de Yu-kai Chou Aplicado a Streams en Vivo (Kick.com)

Para transformar espectadores pasivos en una comunidad activa y leal sin recurrir a patrones oscuros (*dark patterns*), diseñamos cada módulo de **DiggityBets** activando los **8 Impulsos Centrales (Core Drives)** del marco Octalysis:

| Core Drive (Impulso) | Implementación Concreta en DiggityBets | Métrica Objetivo |
|---|---|---|
| **1. Significado Épico (Epic Meaning)** | Misiones cooperativas de la comunidad (*Community Boss / Crowd Bonus Hunt*): si el stream supera el Break-Even general, se desbloquea lluvia masiva de `$DIG` para todos los presentes. | Participación en chat `> 35%` de espectadores activos |
| **2. Desarrollo y Logro (Accomplishment)** | Sistema de **6 Tiers de Bounties** (`$3` a `$20` USD) + progresión de rango VIP en el perfil del espectador con insignias verificadas. | Tasa de finalización de desafíos Tier 1–3 |
| **3. Empoderamiento y Creatividad (Empowerment)** | Solicitudes de slots en vivo (`!sr`), votación en tiempo real de llaves 8-Bracket y elección táctica de volatilidad en juegos de la casa gratuitos. | Comandos por espectador por hora |
| **4. Propiedad y Posesión (Ownership)** | Billetera virtual de puntos `$DIG`, historial auditable de jugadas Provably Fair y colección de insignias de Bounties cazados. | Retención D7 / D30 de usuarios autenticados |
| **5. Influencia Social (Social Influence)** | Ticker en vivo de últimos ganadores, tabla de líderes (*Leaderboard*) semanal y aparición con nombre + avatar en el **Celebration Billboard Overlay** de OBS cuando se aprueba un Bounty. | Efecto contagio en reclamos y predicciones |
| **6. Escasez e Impaciencia (Scarcity)** | Ventanas cronometradas de predicción (`LOBBY_OPEN` de 60s), cupos limitados por sorteo dominical y Bounties relámpago (*Flash Bounties*) durante el stream. | Velocidad de respuesta al llamado a la acción (CTA) |
| **7. Imprevisibilidad y Curiosidad (Unpredictability)** | Programas de refuerzo de razón variable (*Variable Ratio Schedules*) en lluvias de `$DIG`, cajas misteriosas gratuitas y giros de ruleta en vivo. | Tiempo medio de visualización (*Watch Time*) |
| **8. Evitación de Pérdida (Loss Avoidance)** | Racha diaria de asistencia al stream (*Daily Check-in Streak*) con escudo protector de racha (*Streak Freeze*) canjeable con `$DIG`. | Retorno diario al stream en vivo |

---

## 2. Psicología Conductual del Juego y Economía del Comportamiento

### 2.1 El Ciclo "Hooked" (Nir Eyal) en 4 Fases para Espectadores
1. **Disparador (Trigger)**: Alerta visual y sonora en OBS (fanfarria de trompetas limitada a `-4 dBFS` + banner animado en el stream) anunciando que se abrió una predicción de Bonus Hunt o un nuevo Bounty.
2. **Acción (Action)**: Acción de mínima fricción (Ley de Fitts y Ley de Hick): un solo comando en el chat (`!guess 3500`) o un clic en el botón **"Reclamar Bounty"** del Portal con autocompletado de usuario.
3. **Recompensa Variable (Variable Reward)**:
   - *Recompensa de la Tribu*: Reconocimiento público en el overlay de OBS y en el ticker social.
   - *Recompensa de la Caza*: Puntos `$DIG`, tickets para el sorteo dominical o premios de Bounty (`$3`–`$20` USD).
   - *Recompensa del Yo*: Subida de nivel, desbloqueo de logros y precisión estadística en predicciones.
4. **Inversión (Investment)**: El espectador vincula su cuenta de Kick, guarda su ID de Stake verificado y acumula saldo `$DIG` para la tienda, aumentando el costo psicológico de abandonar la comunidad.

### 2.2 Teoría de las Perspectivas (Kahneman & Tversky) y Arquitectura de Decisiones (Nudge)
- **Aversión a la Pérdida ($\lambda \approx 2.25$)**: Perder una racha de 7 días duele psicológicamente más del doble que la satisfacción de ganar puntos equivalentes. Por eso ofrecemos recordatorios claros de racha activa y bonificaciones de consolidación.
- **Efecto de Progreso Dotado (*Endowed Progress Effect*)**: Al registrarse por primera vez con Kick OAuth, el usuario recibe un bono inicial de bienvenida en `$DIG` que coloca su barra de progreso hacia su primer canje en el **20% completado** en lugar de `0%`, multiplicando la tasa de activación.
- **Efecto Zeigarnik**: Mostrar las misiones diarias y los Bounties *Only on Stake* como colecciones visuales con progreso parcial (`2/4 slots de Tier 1 completadas`) mantiene activa la memoria de trabajo del usuario.
- **Efecto de Casi-Éxito (*Near-Miss*) Ético**: En juegos gratuitos de la casa (`house-games.js`) y ruletas (`wheel-csgo`), la desaceleración física muestra visualmente los premios adyacentes, pero el resultado se determina **100% antes de la animación** mediante `HMAC-SHA256` auditable (cero manipulación visual engañosa).

---

## 3. Marketing para Streamers, Patrocinio de Proveedoras (B2B) y CRO de Afiliados

### 3.1 Estrategia "Only on Stake" Bounty Showcase como Producto B2B para Proveedoras
La sección **Bounties** está diseñada no solo para los espectadores, sino como un **escaparate patrocinable para estudios de slots** (*Valkyrie, Hacksaw, Pragmatic, Degen Lab, Maverick Studios, Paperclip, Titan, Shady Lady, Twist, etc.*):
- **Visibilidad Garantizada (Impresiones + Gameplay Real)**: Para cazar un Bounty de `$3` a `$20` USD, la comunidad debe jugar específicamente las slots destacadas del estudio patrocinador.
- **Métricas Demostrables para el Estudio**: El panel de administración registra cuántos intentos, reclamos verificados (`Bet ID`) y multiplicadores se lograron en cada slot patrocinada, permitiendo al streamer negociar paquetes de patrocinio mensual con datos reales de conversión.

### 3.2 Optimización de la Tasa de Conversión (CRO) del Embudo VIP (`DIGGITYBETS`)
Aplicando los principios de **Robert Cialdini** y **CRO de baja fricción**:
1. **Reducción de Pasos (Regla de los 3 Clics)**:
   - **Paso 1**: Botón de copiado instantáneo del código `DIGGITYBETS` con feedback háptico/visual (`¡Copiado!`) y apertura directa del enlace oficial.
   - **Paso 2**: Vinculación de usuario de Stake en el Portal con validación instantánea.
   - **Paso 3**: Acceso inmediato a reclamos de Bounties, Rakeback VIP y Sorteos Dominicales.
2. **Prueba Social en Tiempo Real (*Social Proof*)**:
   - Mostrar en la cabecera de Bounties y Tienda cuántos premios ya fueron pagados y quiénes fueron los últimos espectadores verificados en cobrar.
3. **Autoridad y Confianza (*Trust Signals*)**:
   - Insignias visibles de **Provably Fair HMAC-SHA256**, reglas claras de participación sin letra chica y tiempos de aprobación transparentes.
4. **Contraste Perceptual y Jerarquía Visual (90/8/2)**:
   - En la sección de Bounties, los Tiers superiores (`Tier 5: $15 USD`, `Tier 6: $20 USD`) utilizan bordes animados con `@property --border-angle` y acentos dorados/esmeralda (`#53fc18` / `#ffd700`), creando un anclaje de valor que hace que los Tiers 1–3 (`$3`–`$7` USD) se perciban como metas altamente alcanzables.

---

## 4. Límites Éticos y Juego Responsable (`+18` Compliance)

1. **Separación Estricta entre Entretenimiento Gratuito y Apuestas Reales**:
   - Todos los juegos del Portal (`Blackjack`, `Roulette`, `Plinko`, `Hi-Lo`, `Mines`, `Predicciones`, `Sorteos`) operan **exclusivamente con puntos gratuitos `$DIG`**.
2. **Transparencia Matemática Total**:
   - Prohibido alterar probabilidades dinámicamente según el saldo del usuario; cada resultado de juego gratuito puede auditarse con su `serverSeed`, `clientSeed` y `nonce`.
3. **Advertencias Visibles `+18` y Juego Responsable**:
   - El sitio mantiene de forma permanente los avisos de mayoría de edad (`+18`), límites de sesión saludables y prohibición absoluta de compras dentro de la plataforma (`AGENTS.md §2.2`).
