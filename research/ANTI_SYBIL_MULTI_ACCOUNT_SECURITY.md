# Anti-Sybil, Multi-Accounting & Alt Prevention Architecture for Casino Stream Platforms

> **Documento:** `research/ANTI_SYBIL_MULTI_ACCOUNT_SECURITY.md`  
> **Fecha:** Octubre 2026  
> **Autor:** Squad 6 (QA & Security) & Squad 2 (Architecture & Backend)  
> **Estado:** [VERIFICADO: ThumbmarkJS v0.14 MIT, Cloudflare Turnstile Docs 2026, Arcjet Next.js, Arbitrum Sybil Heuristics]

---

## 1. El Problema: El "Bono / Giveaway Farming" en Canales de Casino

En streams de casino con recompensas, sorteos de saldo y mini-juegos de puntos, el incentivo económico para los atacantes es asimétrico:
* **Costo del atacante:** Crear una cuenta en Kick y una cuenta en Stake es gratis y toma 2 minutos.
* **Beneficio potencial:** Con 20 cuentas ("alts"), un atacante multiplica x20 sus chances en sorteos de chat, vacía el faucet diario de puntos o realiza apuestas contrarias en batallas 1v1 para transferirse premios.
* **Tácticas habituales de los atacantes:**
  1. Uso de perfiles múltiples en navegadores anti-detect (multilogin, perfiles aislados de Chrome).
  2. Rotación de IPs mediante VPNs comerciales (NordVPN, Surfshark, Mullvad) o proxies residenciales.
  3. Cuentas de Kick descartables recién creadas sin actividad previa.
  4. Múltiples cuentas de Kick intentando asociarse a un mismo usuario de Stake o viceversa.

---

## 2. Los 6 Pilares de Seguridad Anti-Alt para HuntHub

Para proteger la plataforma sin frustrar a los espectadores legítimos y manteniendo un presupuesto estricto de **$0 / sin tarjeta**, implementamos una defensa en profundidad de 6 capas:

```
                                  USUARIO ENTRA AL SITIO
                                            │
                                            ▼
   [CAPA 1: Bot & Automation Check] ──────► Cloudflare Turnstile (Bloquea scripts/headless)
                                            │
                                            ▼
   [CAPA 2: Telemetría de Dispositivo] ───► ThumbmarkJS (Canvas + WebGL + Audio + Concurrency)
                                            │ Genera `device_hash` único por hardware
                                            ▼
   [CAPA 3: Anclaje de Identidad 1:1] ───► Kick ID (inmutable) ◄──► Stake Username (UNIQUE)
                                            Restricción estricta en SQLite + Antigüedad de cuenta
                                            ▼
   [CAPA 4: Barrera de Puntos / Faucet] ──► Cooldowns por Dispositivo + IP (no sólo por usuario)
                                            El faucet diario solo paga 1 vez por hardware cada 24h
                                            ▼
   [CAPA 5: Grafo de Detección de Alts] ──► Si 2 Kick IDs comparten `device_hash` o `/24` subnet
                                            en ventana crítica ──► Marcado como ALT_CLUSTER
                                            ▼
   [CAPA 6: Mitigación Silenciosa] ───────► SHADOWBAN: El usuario cree que participa, pero el motor
                                            de sorteos lo excluye silenciosamente del pool ganador.
```

---

## 3. Especificación Técnica de Herramientas Open Source Seleccionadas

### 3.1 Capa de Telemetría: ThumbmarkJS (`thumbmarkjs/thumbmarkjs`)
* **Licencia:** MIT (100% permisiva, código abierto).
* **Peso:** <12 KB, sin dependencias externas, ejecuta 100% en el cliente.
* **Atributos capturados para el `device_hash`:**
  * **Canvas Fingerprint:** Renderizado oculto de texto y formas complejas en un canvas HTML5; las variaciones en GPUs, drivers y antialiasing generan un hash único.
  * **WebGL Renderer & Vendor:** Identificador directo del hardware gráfico de la máquina.
  * **AudioContext Oscillator:** Análisis de frecuencia y muestreo de la tarjeta de sonido.
  * **Hardware Concurrency:** Cantidad de núcleos lógicos de la CPU.
  * **System Fonts:** Detección de fuentes locales instaladas en el sistema operativo.
  * **Pantalla y Zona Horaria:** Resolución, profundidad de color, ratio de píxeles y offset UTC.
* **Ventaja clave:** Si un usuario abre una ventana de incógnito o un perfil secundario en Chrome/Edge, el `device_hash` se mantiene **idéntico**, porque el hardware de la máquina no cambia.

### 3.2 Capa Anti-Bot: Cloudflare Turnstile (Modo Gestionado o Invisible)
* **Costo:** $0 permanente con peticiones ilimitadas.
* **Funcionamiento:** Analiza el entorno del navegador sin mostrarle desafíos molestos de semáforos o letras deformadas al espectador.
* **Defensa:** Detecta instantáneamente navegadores controlados por automatización (`navigator.webdriver == true`, Playwright, Puppeteer, Selenium).
* **Verificación Backend:** La Server Action de Next.js verifica el token en `https://challenges.cloudflare.com/turnstile/v0/siteverify` antes de procesar cualquier login o reclamo de puntos.

### 3.3 Capa de Rate-Limiting & Shield: Arcjet (`@arcjet/next`)
* **Plan:** Free tier para proyectos independientes.
* **Uso en Next.js App Router:**
  * Algoritmo Token Bucket o Sliding Window por IP y por Kick User ID.
  * Bloqueo automático de categorías de scrapers, herramientas de pentesting automáticas y agentes de IA no autorizados.

---

## 4. Esquema de Base de Datos Anti-Sybil (SQLite con Drizzle ORM)

```sql
-- Registro de dispositivos por hardware
CREATE TABLE user_devices (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id),
    device_hash TEXT NOT NULL,         -- Hash generado por ThumbmarkJS
    ip_subnet TEXT NOT NULL,            -- Prefijo /24 para agrupar redes compartidas (ej: 190.220.14.0/24)
    user_agent TEXT NOT NULL,
    first_seen_at INTEGER NOT NULL,
    last_seen_at INTEGER NOT NULL
);
CREATE INDEX idx_user_devices_hash ON user_devices(device_hash);
CREATE INDEX idx_user_devices_user ON user_devices(user_id);

-- Tabla de Clusters de Cuentas Múltiples (Alts)
CREATE TABLE alt_clusters (
    cluster_id TEXT PRIMARY KEY,
    primary_user_id TEXT NOT NULL,
    associated_user_id TEXT NOT NULL,
    reason TEXT NOT NULL,               -- 'SHARED_DEVICE', 'SHARED_STAKE_ATTEMPT', 'VELOCITY_SPAM'
    detected_at INTEGER NOT NULL
);

-- Estado de Usuario enriquecido con Flags de Riesgo
-- users.stake_username UNIQUE NOT NULL
-- users.risk_score INTEGER DEFAULT 0 (0: limpio, 100: alt confirmado)
-- users.is_shadowbanned BOOLEAN DEFAULT 0
```

---

## 5. Reglas de Negocio & Algoritmos de Detección

### Regla 1: Unicidad Estricta de Cuenta de Stake (1 Kick ◄► 1 Stake)
* En la tabla `users`, el campo `stake_username` posee una restricción `UNIQUE` y se almacena normalizado en minúsculas: `LOWER(TRIM(input))`.
* Si la Cuenta Kick B intenta registrar el mismo nombre de Stake que ya asoció la Cuenta Kick A:
  1. Se bloquea la vinculación con el mensaje: *"Este usuario de Stake ya está registrado en la comunidad."*
  2. Ambas cuentas quedan automáticamente enlazadas en `alt_clusters` bajo la razón `'SHARED_STAKE_ATTEMPT'`.
  3. El `risk_score` de ambas cuentas aumenta en +50 puntos.

### Regla 2: Cooldown de Faucet y Recompensas por Dispositivo
* Cuando un usuario solicita el bono diario de puntos o gira una ruleta gratuita:
  * El sistema consulta:
    ```sql
    SELECT COUNT(*) FROM reward_claims 
    WHERE (user_id = :userId OR device_hash = :deviceHash) 
      AND created_at > (strftime('%s','now') - 86400);
    ```
  * Si el `device_hash` ya reclamó el bono en las últimas 24 horas (incluso desde otra cuenta de Kick diferente), la petición se rechaza:
    *"Ya se ha reclamado la recompensa diaria desde este dispositivo hoy."*

### Regla 3: Filtro de Elegibilidad por Antigüedad en Kick
* Para participar en eventos con premios (Batallas 1v1, Torneo de 8 o Guess the Balance):
  * La cuenta de Kick debe tener al menos **7 días de creada** (obtenido vía OAuth en el perfil del usuario: `user.created_at`).
  * Cuentas recién creadas en los últimos minutos son catalogadas automáticamente como `[PROBABLE_BOT/ALT]` y deben esperar para unirse a eventos con premios.

### Regla 4: La Mitigación Silenciosa (Shadowban)
* Los streamers de primer nivel (Trainwreck, Roshtein, Ayezee) nunca alertan a los multicuentas con errores técnicos explícitos, porque los atacantes usan ese feedback para ajustar sus proxies o navegadores.
* **Mecanismo:** Si `user.is_shadowbanned == true` o `user.risk_score >= 80`:
  1. En la pantalla del usuario todo parece normal (su guess se guarda, su botón responde con éxito).
  2. En la lógica de selección de ganadores (`PickWinner`, `Guess Resolver` o `Tournament Seeding`):
     ```sql
     SELECT * FROM eligible_participants 
     WHERE is_shadowbanned = 0 AND risk_score < 80;
     ```
  3. El usuario jamás saldrá ganador, neutralizando el valor de su granja de cuentas sin que el atacante sepa qué parámetro lo delató.
