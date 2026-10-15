# Kick Channel Points, House Games & Advanced Engagement Architecture (2026)

> **Documento:** `research/KICK_CHANNEL_POINTS_AND_HOUSE_GAMES_RESEARCH.md`  
> **Fecha:** Octubre 2026  
> **Autor:** Squad 0 (Manager) & Squad 1 (Research)  
> **Estado:** [VERIFICADO: Kick API Docs 2026, crates.io kick-api 0.1.9, Better Auth 1.7.7, Repositorios Open Source]

---

## 1. Kick Channel Points & Redemptions API (Actualización 2026)

### 1.1 Capacidades Oficiales Verificadas
La API oficial de Kick.com incorporó endpoints dedicados para gestionar las recompensas de canal y sus canjes:
* **Scopes OAuth 2.1 Requeridos:**
  * `channel:rewards:read`: Leer las recompensas personalizadas y la lista de canjes pendientes.
  * `channel:rewards:write`: Crear, modificar o eliminar recompensas personalizadas, y actualizar el estado de los canjes (`FULFILLED` o `CANCELLED`).
* **Límites de la Plataforma:**
  * Máximo **15 recompensas personalizadas** por canal simultáneamente.
  * Los puntos de canal ganados por ver una transmisión son específicos del canal (no son transferibles entre streamers).
  * No existe un endpoint directo para consultar el saldo acumulado en vivo de un espectador ni para descontar puntos arbitrariamente por API.

### 1.2 La Arquitectura del Puente de Puntos (The Channel Points Bridge)
Dado que la API no permite restar puntos de forma arbitraria, el mecanismo oficial y seguro para conectar Kick con la Web Store y los House Games es:
```
Espectador en Kick (Chat/Player)
   │
   ▼
Canjea recompensa: "Canjear 5.000 pts → 5.000 créditos HuntHub"
   │
   ▼
Kick genera evento y dispara Webhook oficial:
`channel.reward.redemption.updated` (Status: UNFULFILLED)
   │
   ▼
Backend HuntHub recibe y valida Webhook (Firma RSA asimétrica):
   1. Valida que el `reward_id` corresponde al canje de créditos.
   2. Registra la transacción atómica en SQLite: `UPDATE users SET points_balance = points_balance + 5000`.
   3. Llama a la API de Kick: `PATCH /public/v1/channels/{broadcaster_id}/rewards/{reward_id}/redemptions/{redemption_id}` con status `FULFILLED`.
   │
   ▼
El usuario ve sus créditos reflejados en tiempo real en HuntHub Web
(Listos para usar en la Store, 1v1 Battles, 8-Bracket Tourney o House Games).
```

---

## 2. Ecosistema Open Source & Herramientas Ingeridas (2026)

### 2.1 Conectores y SDKs de Kick
* **`@nekiro/kick-api` v3.0.1 (TypeScript, NPM):**
  * SDK ligero con cero dependencias externas.
  * Maneja automáticamente la renovación de tokens OAuth 2.1 PKCE y la verificación criptográfica de firmas RSA en webhooks con tolerancia temporal (timestamp freshness).
* **`@retconned/kick-js` v0.8.0 / `chrisle/kick-js`:**
  * Cliente WebSocket ligero conectado al clúster Pusher de Kick.
  * **Ventaja:** Modo de sólo lectura anónimo con cero tokens para lectura de chat y comandos en vivo con 0 ms de latencia.
* **`kick-api` (Rust, v0.1.9):**
  * Referencia de implementación de tipos y endpoints para recompensas (`create_reward`, `update_reward`, `get_redemptions`, `fulfill_redemption`).

### 2.2 Modelos de UI, Overlays y Colas de Partidas
* **`TheAtlas-Queue` (Next.js + Realtime):**
  * Arquitectura modelo para la gestión de colas de participantes en vivo desde el chat.
  * Resuelve la deduplicación de jugadores, estados de espera, selección por orden de llegada o por sorteo, y confirmación de presencia antes de iniciar una batalla.
* **`senchabot-opensource/monorepo`:**
  * Monorepo comunitario para overlays y paneles de streaming.
  * Patrón de diseño para widgets de navegador sin autenticación requerida para la visualización en OBS.
* **`brackets-manager.js` & `brackets-viewer.js`:**
  * Motor matemático de eliminación simple para torneos de 8 jugadores.
  * Renderizado ligero en SVG/DOM puro con soporte de variables CSS para el tema oscuro y dorado de casino.
* **`bonus-hunt-tracker` (`calc.js`):**
  * Fórmulas estandarizadas de casino para Bonus Hunts:
    * $\text{Req Avg X} = \frac{\max(0, \text{Balance Inicial} - \text{Balance Actual})}{\sum \text{Apuestas Restantes}}$
    * $\text{Avg X} = \frac{\text{Total Ganado}}{\text{Total Apostado de Abiertas}}$
    * $\text{Break-Even reached}$ cuando el balance actual supera el inicial.

---

## 3. Mini House Games con Puntos Virtuales (Provably Fair)

### 3.1 Marco Ético y Legal (Compliance Estricto)
* **Regla Inquebrantable:** Los puntos son 100% virtuales y gratuitos. **NO existe dinero real, NO existe cripto, NO existen depósitos ni retiros fiduciarios.**
* **Finalidad:** Gamificación y entretenimiento para la comunidad del stream mientras el streamer está en vivo o entre sesiones.
* Los premios que el streamer otorgue a los líderes del ranking son otorgados fuera de la plataforma (*out-of-band*), sin costo para los espectadores.

### 3.2 Motor Provably Fair (Criptográficamente Auditable)
Para garantizar total transparencia y evitar cualquier sospecha de manipulación:
1. **Server Seed:** Generado en el servidor (`crypto.randomBytes(32).toString('hex')`).
2. **Server Seed Hash:** Se publica el hash `SHA-256(Server Seed)` **antes** de que el usuario juegue.
3. **Client Seed:** Generado por el navegador del usuario o personalizado por él.
4. **Nonce:** Contador incremental de apuestas del usuario.
5. **Cálculo del Resultado:**
   $$\text{HMAC-SHA256}(\text{Server Seed}, \text{Client Seed} + ":" + \text{Nonce})$$
   Los primeros bytes del digest determinan el resultado exacto (cartas en Blackjack, número en Ruleta, clavijas en Plinko, carta en Hi-Lo).
6. Al finalizar la sesión o cambiar la semilla, se revela el Server Seed original para que el usuario pueda verificar la fórmula con cualquier herramienta independiente.

### 3.3 Especificación de los 4 Juegos
1. **Blackjack (21):**
   * Baraja virtual de 52 cartas barajada con Fisher-Yates + Provably Fair.
   * Acciones: Hit, Stand, Double Down, Split.
   * Reglas: Dealer se planta en 17 suave (Soft 17), Blackjack paga 3:2.
2. **Roulette (Ruleta Europea):**
   * Rueda de 37 casillas (0 verde, 1-36 rojo/negro).
   * Apuestas: Pleno (35:1), Color Rojo/Negro (1:1), Par/Impar (1:1), Docenas/Columnas (2:1).
   * Animación en canvas SVG ligero con física de desaceleración.
3. **Plinko:**
   * Pirámide de 8 a 16 filas de clavijas (pegs).
   * Modos de riesgo seleccionables: Bajo, Medio, Alto.
   * La bola cae rebotando según los bits del hash HMAC (0 = rebote izquierda, 1 = rebote derecha).
   * Cajas multiplicadoras en la base: desde 0.2x en el centro hasta 1000x en los extremos.
4. **Hi-Lo:**
   * Se muestra una carta inicial.
   * El usuario predice si la siguiente carta será Mayor o Menor (o Misma Carta).
   * Multiplicador dinámico según la probabilidad de la carta actual.
   * Modo racha (*streak*): el usuario puede acumular multiplicador o hacer *Cash Out* en cualquier momento.

---

## 4. Sistema de Verificación de Códigos de Referido / Afiliados (Stake)

### 4.1 Desafío Técnico
Stake no ofrece una API REST pública para que aplicaciones de terceros consulten si un usuario se registró con determinado código de referido.

### 4.2 Solución en Dos Vías
1. **Vía Automatizada por Importación de CSV (Panel Streamer):**
   * Stake permite a sus streamers/afiliados exportar periódicamente la lista de usuarios referidos en formato CSV (sin datos bancarios, únicamente nicknames y fecha de registro).
   * El panel de administración de HuntHub incluye un cargador: `Subir Reporte de Afiliados (.csv)`.
   * El sistema cruza automáticamente los nombres de usuario cargados en la web con el archivo CSV y les asigna el rol `[STAKE_VERIFIED]`.
2. **Vía Manual con Cola de Moderación (Fast-Track Mods):**
   * El usuario ingresa su Stake Username en su perfil de HuntHub.
   * En el panel de mods aparece la cola de solicitudes pendientes:
     * El mod verifica en la pestaña de Stake del streamer y presiona `✓ Aprobar` o `✗ Rechazar`.
3. **Beneficios para Usuarios Verificados:**
   * Acceso prioritario a torneos de 8 jugadores y batallas 1v1.
   * Multiplicador de puntos de stream (ej: 1.5x en watch-time).
   * Insignia dorada verificada en el overlay del stream cuando participan en eventos.
