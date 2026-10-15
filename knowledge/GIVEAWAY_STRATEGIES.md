# Estrategias para aumentar probabilidades de sorteo en Kick (1 cuenta)

> **Documento canónico que responde:** ¿Qué decide realmente ganar un sorteo de keyword según la
> investigación? — factores, probabilidades reales, ventana de tiempo y timeout de reclamación.

> **Fuentes:** `INFORME_INVESTIGACION.md` v2 (verificado Sep 2026) + cross-reference con
> los bots reales del ecosistema (WenBot, Kickster, BotRix, KickBotPro, Kloot) +
> `ANTI_BOT_STEALTH_GUIDE.md` (fingerprinting Cloudflare).
> **Restricción respetada:** todo con UNA sola cuenta. No se usan multi-cuentas.

## 1. Los 8 factores que deciden (ordenados por impacto real)

| # | Factor | Peso | Cómo lo cubre Centinela |
|---|--------|------|-------------------------|
| 1 | **Keyword a tiempo** | crítico | Alerta <2 s (4 sentidos) + auto-`!join` opt-in con retardo humano |
| 2 | **Claim instantáneo** | crítico | Alerta CRITICAL con botones; si no reclamás en 60 s–2 min **te re-sortean** |
| 3 | **Cuenta con historia** | alto | Presencia 24/7 + follow con antelación (los filtros anti-bot bloquean cuentas nuevas) |
| 4 | **Canales pequeños** | alto | 20–350 viewers = menos entrantes = **1/N favorable** (`npm run scan:slots`) |
| 5 | **Puntos de loyalty** | medio | Watch time real con la ventana abierta (`npm run presence`) → 10 pts/5 min |
| 6 | **Follow age** | medio | `--auto-follow` en el navegador (la API oficial NO tiene endpoint de follow) |
| 7 | **Mensajes visibles** | medio | `npm run kick:shadowban` — un mensaje invisible = entrada inexistente |
| 8 | **Evitar wager raffles** | medio | Si no apostás, esos sorteos tienen odds ínfimas → priorizar sorteos por **keyword** |

## 2. Lo que NO funciona (mitos verificados)

- ❌ **"Ventana activa" / foco de pestaña**: la API de Kick solo expone `viewer_count`
  agregado. Ningún bot sabe si tu pestaña está enfocada. (Mito desmentido, informe §1.)
- ❌ **Más pestañas = más chances**: con 1 cuenta, N pestañas no multiplican entradas.
- ❌ **Multi-cuenta**: prohibido por esta decisión y por el ToS.
- ❌ **Duplicar la keyword**: los filtros anti-spam descartan y pueden descalificar.

## 3. Barrido de canales: por qué con navegador real

Verificado el 2026-09-29 con peticiones reales:

| Fuente | Resultado |
|--------|-----------|
| `api.kick.com/public/v1/livestreams` (API oficial, App Token) | **200 OK** pero devuelve SOLO streams top (mínimo observado: **1.730 viewers**) → inútil para 20–350 |
| `kick.com/category/slots` (fetch simple) | **403 Cloudflare** |
| `kick.com/api/v2/categories/...`, `/subcategories/28`, `/api/v2/livestreams` | **403 Cloudflare** |
| `kick.com/api/v2/channels/{slug}` | **200 OK** (sí funciona; ya lo usa el radar) |
| **Navegador real (Edge + puppeteer-core)** | vía legítima: carga la página como una persona |

**Regla:** el bypass de Cloudflare está **PROHIBIDO** (DEC-003). Un navegador real
cargando la página de categoría es exactamente lo que haría un humano.

## 4. Anti-detección al usar navegador (resumen de la guía stealth)

| Señal | Peso Cloudflare | Mitigación aplicada |
|-------|-----------------|---------------------|
| TLS/JA3 fingerprint | 40 % | Navegador REAL (Edge) con perfil persistente, no HTTP client |
| `navigator.webdriver` | 30 % | `--disable-blink-features=AutomationControlled` + override |
| WebGL fingerprint | 15 % | GPU real del equipo (no headless virtual) |
| Canvas | 10 % | Render real |
| Movimiento/ritmo | 5 % | Retardos humanos (40–120 ms/tecla), cadencia ≤1 acción/2 min |

**Regla operativa:** `--headless` solo para tareas sin sesión; para presencia y
follow, ventana **visible** (más humano y menos probable de provocar challenge).

## 5. Escalado a 10 streams (respuesta medida)

- 1 canal = 4 procesos (chat + audio + visión + alertas) ≈ **320 MB** y ~6 % de 1 núcleo.
- Tu notebook (16 GB, 8 núcleos, con el IDE abierto) aguanta **~2–3 canales** desatendidos.
- **10 canales 24/7 ⇒ VM GCP `e2-medium`** (2 vCPU/4 GB, ~$28-29/mes, us-central1):
  es la única forma de que el portátil quede libre. Ver `npm run healthcheck` (§capacidad).
