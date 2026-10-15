# HuntHub — Guía de Despliegue en Cloudflare (Fase 3: Online & Operativo $0)

> **Destinatario:** Tomás (Streamer & Operador de `diggitybets`)  
> **Costo:** **$0 USD / $0 ARS Permanente (Sin requerir tarjeta de crédito)**  
> **Plataformas:** Cloudflare Pages (Frontend estático) + Cloudflare Workers (Edge API para Kick & Discord OAuth)

---

## 1. Resumen de Arquitectura de la Fase 3

Para que tu sitio web esté 100% online, rápido en todo el mundo y con conexión oficial a Kick y Discord, implementamos una arquitectura moderna y gratuita:

1. **Frontend en Cloudflare Pages ($0):**
   - Aloja el sitio web completo (`index.html`, estilos, sonidos, tableros y juegos de Stake).
   - Incluye certificado SSL automático (`https://`), compresión Brotli y CDN global con tiempo de respuesta < 20ms.
2. **Edge API en Cloudflare Workers ($0):**
   - Script serverless ultraliviano (`worker/index.js`).
   - El plan gratuito de Cloudflare otorga **100.000 peticiones diarias gratis**.
   - Resuelve el intercambio seguro de tokens OAuth 2.1 PKCE de Kick y Discord sin exponer claves ni contraseñas.
3. **Modo Híbrido Automático (Localhost vs Producción):**
   - Mientras estés probando en tu notebook (`http://127.0.0.1:3000`), el sitio funciona con simulación instantánea sin trabas.
   - Cuando se activa el dominio online en Cloudflare, se conecta directamente a los servidores de autorización de Kick.com y Discord.

---

## 2. Paso a Paso para Publicar el Sitio en Cloudflare Pages ($0)

### Paso 1: Crear cuenta gratuita en Cloudflare
1. Ingresá a [cloudflare.com](https://cloudflare.com) y registrate con tu email (100% gratuito, **no pide tarjeta de crédito**).

### Paso 2: Publicar el sitio (Elegí tu opción favorita)

#### Método 1 (El más fácil y rápido — 1 Clic):
1. Hacé doble clic en el archivo **`PUBLICAR_EN_CLOUDFLARE.bat`** en la carpeta principal del proyecto.
2. El script compilará automáticamente el sitio limpio en la carpeta `dist/` (8.1 MB), ejecutará las pruebas visuales y lo subirá a Cloudflare.
3. Si es tu primera vez, se abrirá tu navegador para autorizar gratis tu cuenta de Cloudflare.
4. ¡Listo! Te devolverá la URL online (ej: `https://hunthub.tu-cuenta.workers.dev`).

#### Método 2 (Cloudflare Pages con GitHub o Drag & Drop):
1. En el panel de Cloudflare, hacé clic en **Workers & Pages** $\rightarrow$ **Create Application** $\rightarrow$ pestaña **Pages**.
2. **Con GitHub (Recomendado para CI/CD):** Conectás el repo.
   - Build command: `node tools/build_dist.mjs`
   - Build output directory: `dist`
   Cada vez que hagas un commit, Cloudflare actualiza el sitio en 30 segundos de forma automática.
3. **Subida Directa (Sin Git):** Arrastrás y soltás la carpeta `dist` directamente en la web de Cloudflare Pages.
4. Tu sitio queda online en `https://hunthub-diggitybets.pages.dev`.

---

## 3. Configuración de Kick Developer (OAuth 2.1 PKCE)

Para que el botón **"Link Kick Account"** redirija a la pantalla oficial de Kick:

1. Entrá a [kick.com/settings/developer](https://kick.com/settings/developer) con la cuenta de `diggitybets`.
2. Hacé clic en **"Create App"**:
   - **Name:** HuntHub DiggityBets
   - **Redirect URI:** `https://tu-sitio.pages.dev/` (o tu dominio personalizado).
   - **Scopes:** `user:read`, `channel:read`, `channel:rewards:read`.
3. Guardá el **Client ID** generado.
4. En Cloudflare Dashboard $\rightarrow$ Workers $\rightarrow$ Settings $\rightarrow$ Variables, agregás:
   - `KICK_CLIENT_ID` = Tu Client ID de Kick.

---

## 4. Configuración de Discord Developer (OAuth2)

Para que los espectadores vinculen su cuenta de Discord y obtengan su rol VIP:

1. Entrá al [Discord Developer Portal](https://discord.com/developers/applications).
2. Creá una aplicación llamada **HuntHub Bot**.
3. En la pestaña **OAuth2** $\rightarrow$ **Redirects**, agregá:
   - `https://tu-sitio.pages.dev/`
4. Copiá el **Client ID** y **Client Secret**.
5. En Cloudflare Workers agregás:
   - `DISCORD_CLIENT_ID`
   - `DISCORD_CLIENT_SECRET`

---

## 5. Modelo Económico de Puntos por Watchtime y Store

Los precios de los vouchers fueron calibrados considerando la tasa de farmeo real de un espectador:

| Tipo de Espectador | Puntos por Hora ($DIG/h) | En un Stream de 3 Horas | En una Semana (10-12h de Stream) |
| :--- | :--- | :--- | :--- |
| **Espectador Normal** | **~60 $DIG / hora** (10-15 pts c/10-15 min) | ~180 $DIG | ~600 - 720 $DIG |
| **Suscriptor (2x Boost)** | **~120 $DIG / hora** (20-30 pts c/10-15 min) | ~360 $DIG | ~1.200 - 1.440 $DIG |

### Tabla de Canjes Calibrada en la Store:

| Recompensa / Voucher | Costo en $DIG | Horas de Visualización Requeridas | Objetivo de Engagement y Protección |
| :--- | :--- | :--- | :--- |
| 🎟️ **Weekly raffle $100 bonus buy split profit (rolled every Sunday)** | **50 $DIG** | ~50 min (Normal) / ~25 min (Sub) | **Sorteo semanal:** Muy accesible para que cualquiera que entre al stream compre boletos y espere ansioso el domingo. |
| ⚔️ **Guaranteed 1v1 battle entry** | **100 $DIG** | ~1.5 h (Normal) / ~50 min (Sub) | **Duelos en vivo:** Permite anotarse en el overlay de batalla durante el stream sin saturar la cola. |
| 🏆 **Guaranteed tourney entry** | **180 $DIG** | ~3.0 h (Normal) / ~1.5 h (Sub) | **Torneo de 8:** Requiere la fidelidad de una sesión de stream completa, asegurando que el espectador esté presente para jugar. |
| 👑 **VIP Streamer Discord Role** | **250 $DIG** | ~4.0 h (Normal) / ~2.0 h (Sub) | **Perk de Discord:** Desbloqueo único permanente en la comunidad. |
| 💎 **$20 bonus buy split profit** | **600 $DIG** | ~10 h (Normal) / ~5 h (Sub) | **Protección de Bankroll:** Requiere fidelidad de varias transmisiones. Evita drenar el dinero real del streamer que recién empieza. |
