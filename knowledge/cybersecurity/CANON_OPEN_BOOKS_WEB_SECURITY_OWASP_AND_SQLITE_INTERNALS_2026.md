# Tratado Canónico: Documentación Oficial de Seguridad Web (OWASP ASVS 5.0, PortSwigger Academy) y Motor Interno SQLite/D1 (2026)

**Alcance:** Síntesis de estándares abiertos y documentación oficial de **Seguridad de Aplicaciones Web (*OWASP ASVS 5.0* + *PortSwigger Web Security Academy*), Protección de APIs y Tiempo Real, y Arquitectura Interna de *SQLite 3 / Cloudflare D1 / FTS5* (`sqlite.org`)**. NO es fuente de diseño gráfico, tipografía ni animaciones CSS.

---

## 1. Estándar Oficial *OWASP ASVS 5.0* & *PortSwigger Web Security Academy*

`[VERIFICADO: owasp.org/www-project-application-security-verification-standard/, portswigger.net/web-security]`

### 1.1 Defensa en Profundidad contra DOM-XSS, Prototype Pollution y PostMessage Spoofing
1. **Erradicación de Sumideros DOM-XSS (*DOM-Based Cross-Site Scripting*)**:
   - Toda entrada controlada por terceros (nombres de usuario, mensajes en vivo, parámetros de URL `location.search`, `postMessage`) es **no confiable por definición**.
   - **Regla Inmutable**: Preferir siempre `element.textContent = untrusted` o construcción de nodos con `document.createElement()`. Si se interpola HTML en plantillas, envolver el 100% de las variables dinámicas con `escapeHTML()` y reforzar con **Content Security Policy (`CSP`)** estricta.
2. **Mitigación de *Prototype Pollution* en JavaScript**:
   - Al fusionar objetos JSON recibidos por red o almacenamiento local, bloquear siempre las claves mágicas `__proto__`, `constructor` y `prototype`, o utilizar mapas sin prototipo (`Object.create(null)` / `new Map()`).
3. **Blindaje de `window.postMessage` y Extensiones de Navegador**:
   - Nunca usar `targetOrigin: "*"` al enviar datos sensibles.
   - En cada receptor `window.addEventListener("message", handler)`, verificar estrictamente `event.origin` contra una lista blanca cerrada de orígenes permitidos antes de inspeccionar `event.data`.

### 1.2 Seguridad en APIs, Condiciones de Carrera (*Race Conditions*) y OAuth 2.1 PKCE
1. **Prevención de Condiciones de Carrera (*Single-Packet Attack / TOCTOU*)**:
   - En canjes de premios, reclamos de bonos o votos de torneos, jamás hacer un `SELECT` seguido de un `UPDATE` separado en memoria sin bloqueo. Utilizar la **ejecución atómica secuencial de Cloudflare Durable Objects** o sentencias SQL condicionales atómicas (`UPDATE users SET balance = balance - ? WHERE id = ? AND balance >= ?`).
2. **OAuth 2.1 con `PKCE` (`S256`) y Estado Anti-CSRF**:
   - Generar `code_verifier` de alta entropía con `crypto.getRandomValues()`, derivar `code_challenge = BASE64URL(SHA256(code_verifier))`, y validar el parámetro `state` contra sesión local antes de intercambiar el código de autorización.
3. **Verificación Criptográfica de Webhooks y Tokens de Sesión**:
   - Todo webhook entrante debe verificarse con la clave pública RSA/HMAC oficial y rechazar marcas de tiempo (`timestamp`) con desviación mayor a `5 minutos` para impedir ataques de repetición (*Replay Attacks*).
   - Las comparaciones de secretos o firmas HMAC deben realizarse en **tiempo constante** (`crypto.subtle.timingSafeEqual` o bucle XOR de longitud fija) para neutralizar ataques de temporización (*Timing Attacks*).

---

## 2. Arquitectura Oficial Interna de *SQLite 3*, *WAL*, *Query Planner* y *FTS5* (`sqlite.org`)

`[VERIFICADO: sqlite.org/arch.html, sqlite.org/wal.html, sqlite.org/optoverview.html, sqlite.org/fts5.html]`

### 2.1 Motor de Almacenamiento *B-Tree*, *Write-Ahead Logging (WAL)* y *PRAGMAs* de Alto Rendimiento
- **Estructura de Páginas *B-Tree***:
  - SQLite almacena las tablas en **B+Trees** (*Table B-Trees* indexadas por `rowid` de 64 bits) y los índices secundarios en **B-Trees** (*Index B-Trees* que mapean la clave indexada al `rowid`).
- **Modo `WAL` (*Write-Ahead Logging*)**:
  - A diferencia del *rollback journal* clásico, `PRAGMA journal_mode = WAL;` escribe las transacciones nuevas en un archivo secuencial `-wal`, permitiendo que **múltiples lecturas ocurran en paralelo con una escritura** sin bloquearse mutuamente.
  - Configuración óptima para bases locales de alta velocidad:
    ```sql
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    PRAGMA temp_store = MEMORY;
    PRAGMA cache_size = -64000; -- 64 MB en RAM
    ```

### 2.2 El Optimizador de Consultas (*Next-Generation Query Planner — NGQP*)
1. **Regla del Prefijo Izquierdo en Índices Compuestos**:
   - Un índice `CREATE INDEX idx_claims_user_status ON claims(user_id, status, created_at DESC);` acelera consultas por `(user_id)` y por `(user_id, status)`, pero **no** puede usarse si la cláusula `WHERE` omite `user_id`.
2. **Índices Cubrientes (*Covering Indexes*)**:
   - Si todas las columnas solicitadas en el `SELECT` están incluidas dentro del propio índice, SQLite responde leyendo únicamente el *Index B-Tree* sin tocar jamás la tabla principal (*Zero Table Lookups*).
3. **Transacciones por Lotes (*Batching*)**:
   - En SQLite local y Cloudflare D1, envolver 500 inserciones dentro de una única transacción (`BEGIN IMMEDIATE ... COMMIT` o `db.batch([...])`) es hasta **100 veces más rápido** que ejecutar 500 transacciones individuales, ya que sincroniza el disco una sola vez.

### 2.3 Índices Invertidos de Texto Completo y Tokenización Diacrítica en C
- **Listas de Posteo Comprimidas y Relevancia Probabilística**:
  - Las tablas virtuales de texto completo en C construyen listas de posteo comprimidas que almacenan el `docid`, el número de columna y la posición exacta de cada token.
  - La función nativa de ranking probabilístico pondera cada columna sin sobrecarga en JavaScript:
    $$\text{Score}(D, Q) = \sum_{i=1}^{n} \text{IDF}(q_i) \cdot \frac{f(q_i, D) \cdot (k_1 + 1)}{f(q_i, D) + k_1 \cdot \left(1 - b + b \cdot \frac{|D|}{\text{avgdl}}\right)}$$
  - El tokenizador `unicode61 remove_diacritics 2` normaliza automáticamente acentos (`animación` $\leftrightarrow$ `animacion`), garantizando recuperación bilingüe instantánea en `<10ms`.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_CYBERSECURITY_DEVSECOPS_2026]] · [[CYBERSECURITY_MASTER_PROTOCOL]] · [[ANTI_BOT_STEALTH_GUIDE]] · [[CANON_IDENTITY_AND_OAUTH_CYBERSECURITY_AUDIT_2026]] · #cybersecurity
