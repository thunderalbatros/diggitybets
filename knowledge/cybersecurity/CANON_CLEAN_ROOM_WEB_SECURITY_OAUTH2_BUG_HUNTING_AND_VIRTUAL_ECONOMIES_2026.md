# Tratado Canónico Clean-Room: Seguridad de Navegadores (Zalewski), Bug Hunting & APIs (Stuttard, Yaworski, Madden, Richer), Secure by Design (Johnsson, Liran Tal), Transacciones ACID (Jim Gray, Karwin), Economía Virtual ($DIG) y Modelo CRO LIFT (2026)

**Alcance:** Aplicable al blindaje criptográfico y de endpoints en `worker/index.js`, flujos OAuth 2.1 PKCE con Kick (`site/js/auth-oauth.js`), contabilidad transaccional de puntos virtuales `$DIG`, prevención de condiciones de carrera (`TOCTOU`), diseño de dominio seguro y optimización de conversión ética (`Squad 2`, `Squad 3`, `Squad 6` y `Squad 8`). Sintetiza en sala limpia (*Clean-Room*) los principios de Zalewski, Stuttard/Pinto, Yaworski, Madden, Richer, Johnsson, Liran Tal, Gray/Reuter, Karwin, Lehdonvirta/Castronova y Blanks/Goward.

---

## 1. Modelo de Seguridad del Navegador y Prevención de Fallos de Lógica (*The Tangled Web* — Zalewski, *Web Application Hacker's Handbook* — Stuttard & *Real-World Bug Hunting* — Yaworski)

### 1.1 Prevención de Condiciones de Carrera `TOCTOU` (*Time-of-Check to Time-of-Use*) en Canjes de Premios
- **El Ataque Clásico de *Double-Spend* en Plataformas de Lealtad**:
  - Si el servidor ejecuta primero `SELECT points FROM users WHERE id = ?` (verifica que `points >= 1000`) y milisegundos después ejecuta `UPDATE users SET points = points - 1000`, un atacante que dispare 10 peticiones HTTP en paralelo desde `fetch()` pasará las 10 verificaciones antes de que se descuente el primer saldo.
- **Solución Canónica Atómica (*Compare-And-Swap SQL en 1 Sola Sentencia*)**:
  ```sql
  UPDATE users
  SET points = points - :cost,
      updated_at = CURRENT_TIMESTAMP
  WHERE id = :userId
    AND points >= :cost;
  ```
  - Verificar inmediatamente `result.changes === 1` (o `rowsAffected === 1`). Si es `0`, rechazar la transacción con `HTTP 409 Conflict / Insufficient Balance`. En SQLite/D1, una única sentencia `UPDATE ... WHERE points >= :cost` es atómica e inmune a condiciones de carrera.

### 1.2 Aislamiento de Orígenes en `window.postMessage` y `BroadcastChannel` (Michal Zalewski)
- Nunca usar `targetWindow.postMessage(payload, "*")` con datos sensibles ni procesar `window.addEventListener("message", fn)` sin verificar primero `ALLOWED_ORIGINS.has(event.origin)` y validar la forma exacta de `event.data` con `Valibot`.

---

## 2. Seguridad de APIs, OAuth 2.1 PKCE y *Secure by Design* (*API Security in Action* — Madden, *OAuth 2 in Action* — Richer & *Node.js Secure Coding* — Liran Tal)

### 2.1 Vinculación Criptográfica de Estado en OAuth 2.1 con PKCE (`S256`)
1. El cliente genera un `code_verifier` aleatorio de alta entropía (`32 bytes` CSPRNG codificados en `base64url`) y su resumen `code_challenge = BASE64URL(SHA256(code_verifier))`.
2. El parámetro `state` debe ser un token aleatorio independiente vinculado a la sesión actual del navegador para impedir ataques de **CSRF de inicio de sesión (*Login CSRF / Account Swapping*)**.
3. En el servidor (`worker/index.js`), el `code` de autorización de Kick se canjea una sola vez y nunca se registra en logs.

### 2.2 *Domain Primitives* y Prevención de *Prototype Pollution* (Dan Bergh Johnsson & Liran Tal)
- **Primitivas de Dominio Inmutables**:
  - En lugar de pasar `amount: number` o `username: string` crudos por el sistema, validarlos en la frontera con un constructor/esquema que garantice invariantes estrictas (` Entero positivo <= 1_000_000 `, ` /^[a-zA-Z0-9_]{3,25}$/ `).
- **Blindaje contra *Prototype Pollution* en JavaScript**:
  - Al fusionar configuraciones o estados JSON provenientes de clientes externos, prohibir explícitamente las claves `__proto__`, `constructor` y `prototype`, o utilizar diccionarios sin prototipo (`Object.create(null)` / `new Map()`).

---

## 3. Contabilidad de Doble Entrada `ACID` y Antipatrones SQL (*Transaction Processing* — Jim Gray & *SQL Antipatterns* — Bill Karwin)

### 3.1 El Patrón *Immutable Append-Only Ledger* (Jim Gray & Andreas Reuter)
- Todo movimiento importante de puntos `$DIG` (recompensa por ver el stream, premio de predicción del Bonus Hunt, canje en la tienda) debe registrarse en una tabla de auditoría inmutable (`ledger_entries`: `id, user_id, delta, reason, ref_id, created_at`) dentro de la misma transacción que actualiza el saldo.
- **Idempotencia por `ref_id` Único**:
  - Incluir un índice `UNIQUE(user_id, reason, ref_id)` en el libro mayor garantiza matemáticamente que un mismo evento de sorteo o bounty jamás pueda acreditarse dos veces.

### 3.2 Erradicación de los Antipatrones SQL más Peligrosos (Bill Karwin)
1. **Prohibido *Jaywalking* (Listas separadas por comas en una columna `TEXT`)**: Usar tablas de unión normalizadas o funciones JSON indexadas en SQLite.
2. **Prohibido *Fear of the Unknown* (`NULL` mal manejado)**: Definir `NOT NULL DEFAULT ...` explícito en todas las columnas numéricas y de estado para evitar que `SUM()` o comparaciones booleanas devuelvan `NULL` inesperado.

---

## 4. Macroeconomía de Monedas Virtuales y Conversión CRO (*Virtual Economies* — Lehdonvirta & Castronova & *Making Websites Win / LIFT Model* — Blanks & Goward)

### 4.1 Equilibrio Macroeconómico *Faucets vs. Sinks* para la Moneda Virtual `$DIG` (MIT Press)
- **El Riesgo de Hiperinflación en Comunidades de Streaming**:
  - Si los espectadores ganan puntos `$DIG` constantemente por mirar el stream y participar en el chat (*Faucets / Grifos*), pero no tienen dónde gastarlos o quemarlos (*Sinks / Sumideros*), el saldo acumulado pierde valor psicológico y los usuarios veteranos dejan de competir.
- **Ecuación de Estabilidad Económica Virtual**:
  $$\sum_{t} \text{Faucets}(t) - \sum_{t} \text{Sinks}(t) = \Delta M(t) \propto \text{Crecimiento de Usuarios Activos}$$
  - **Grifos Controlados (*Faucets*)**: Asistencia en vivo, aciertos de predicción del Bonus Hunt, rachas diarias.
  - **Sumideros Atractivos (*Sinks* 100% gratuitos sin dinero real)**: Entrada a sorteos especiales de tickets dorados, personalización de insignias/títulos VIP en el ranking, potenciadores cosméticos en juegos de la comunidad y subastas de solicitud de slots (*Slot Requests*).

### 4.2 El Modelo Científico de Conversión *LIFT* (Chris Goward & Conversion Rate Experts)
Para maximizar el registro de espectadores y el uso ético de los códigos del canal (`DIGGITYBETS`), toda pantalla principal se evalúa con la ecuación de **6 factores LIFT**:
$$\text{Conversión} = \frac{\text{Propuesta de Valor} \times (\text{Relevancia} + \text{Claridad} + \text{Urgencia})}{\text{Distracción} + \text{Ansiedad}}$$
- **Reducir la Distracción**: Un solo llamado a la acción (*Primary CTA*) dominante por bloque visual.
- **Reducir la Ansiedad**: Mostrar siempre insignias de transparencia (*100% Gratis · Sin Custodia · Sorteos Verificables HMAC-SHA256 · +18*).

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_CYBERSECURITY_DEVSECOPS_2026]] · [[CANON_OPEN_BOOKS_WEB_SECURITY_OWASP_AND_SQLITE_INTERNALS_2026]] · [[CANON_GAMIFICATION_PSYCHOLOGY_CRO_AND_STREAM_MARKETING_2026]] · [[VAULT_REAL_WORLD_CRYPTOGRAPHY_DAVID_WONG]] · [[CYBERSECURITY_MASTER_PROTOCOL]] · #cybersecurity #database #cro #gamification
