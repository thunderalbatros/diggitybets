# 🛡️ Evasión Anti-Bot & Stealth — Guía Completa para Kick.com

> **Fuentes:** fingerprint.com, puppeteer-extra-stealth, Playwright docs, Cloudflare docs, mitmproxy docs
> **Aplicación:** Login OAuth en Kick.com sin detección

## 1. Browser Fingerprinting — Lo que Kick/Cloudflare Detecta

### 1.1 Técnicas de Fingerprinting (Fingerprint.com, 2026)

| Técnica | API JavaScript | Qué expone |
|---------|---------------|------------|
| **Canvas** | `canvas.toDataURL()` | Renderizado GPU único por dispositivo |
| **WebGL** | `WEBGL_debug_renderer_info` | Modelo exacto de GPU + driver |
| **AudioContext** | `AudioContext.createOscillator()` | Stack de audio del SO |
| **Fonts** | `document.fonts` / Flash fallback | Lista de fuentes instaladas |
| **navigator** | `navigator.userAgent, .platform, .language` | OS, navegador, idioma |
| **Screen** | `screen.width, .height, .colorDepth` | Resolución, profundidad de color |
| **Timezone** | `Intl.DateTimeFormat().resolvedOptions()` | Zona horaria exacta |
| **Plugins** | `navigator.plugins` | Extensiones instaladas |
| **Hardware** | `navigator.hardwareConcurrency` | Núcleos de CPU lógicos |
| **Memory** | `navigator.deviceMemory` | RAM del dispositivo (GB) |
| **Touch** | `navigator.maxTouchPoints` | Soporte táctil |
| **Media Devices** | `navigator.mediaDevices.enumerateDevices()` | Cámaras, micrófonos |

### 1.2 Señal Crítica: `navigator.webdriver`

```javascript
// Headless Chrome default → true (detectable al instante)
navigator.webdriver // true = bot, false/undefined = humano
```

**Solución Playwright Stealth:**
```javascript
await context.addInitScript(() => {
  Object.defineProperty(navigator, 'webdriver', { get: () => false });
});
```

## 2. TLS Fingerprinting (JA3/JA4)

Cloudflare calcula el hash JA3 del handshake TLS inicial:
- Versión TLS + Cipher Suites + Extensiones + Curvas Elípticas
- Headless Chrome tiene un JA3 distinto al Chrome real

**Mitigación:** Usar `--ignore-certificate-errors-spki-list` y forzar cipher suites de Chrome real vía `args` de lanzamiento.

## 3. puppeteer-extra-stealth — Técnicas de Evasión

⚠️ **IMPORTANTE:** puppeteer-extra-stealth (7.4k⭐) funciona con puppeteer, NO con Playwright. Para Playwright usar:

```bash
npm install playwright-extra puppeteer-extra-plugin-stealth
```

**Evasiones activadas por defecto:**
- `navigator.webdriver` → false
- `navigator.plugins` → array realista
- `navigator.languages` → ['en-US', 'en']
- `window.chrome.runtime` → objeto falso pero no undefined
- `permissions.query` → comportamiento realista
- `console.debug` → silenciado (headless no lo tiene)
- `WebGL` → vendor + renderer realistas
- `iframe.contentWindow` → no null
- `media.codecs` → codecs reales

## 4. Cloudflare WAF — Cómo Detecta Bots

### Señales de bloqueo (en orden de peso):

1. **TLS Fingerprint (JA3/JA4)** — peso 40%
2. **`navigator.webdriver`** — peso 30%
3. **WebGL fingerprint** — peso 15%
4. **Canvas fingerprint** — peso 10%
5. **Mouse movements / clicks** — peso 5%

### Cloudflare Bot Score (0-99):
- **Score 1-29:** Definitely automated (bloquea)
- **Score 30-49:** Likely automated (JS challenge)
- **Score 50-99:** Human-like (permite)

**Para Kick.com (Cloudflare):** El objetivo es score > 50.

## 5. Estrategia Centinela para Kick Login

```typescript
// Estrategia: NO headless browser constante
// Solo para login OAuth inicial (1 vez por cuenta)

import { chromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

chromium.use(StealthPlugin());

async function kickOAuthLogin() {
  const context = await chromium.launchPersistentContext('./kick_profile', {
    headless: false, // Primera vez: visible para pasar Cloudflare
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ...',
  });

  // Inyectar stealth scripts antes de navegar
  await context.addInitScript(() => {
    delete (navigator as any).__proto__.webdriver;
    Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
    Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
  });

  const page = await context.newPage();
  await page.goto('https://kick.com/login');

  // ... flujo OAuth manual o semi-automático ...

  // Guardar estado para reutilizar (sin headless)
  await context.storageState({ path: './kick_auth.json' });
}

// Reutilizar sesión guardada
async function restoreSession() {
  const context = await chromium.launchPersistentContext('./kick_profile');
  // Cookies + localStorage + tokens se cargan automáticamente
  const page = await context.newPage();
  await page.goto('https://kick.com/');
  // Ya está autenticado
}
```

## 6. Proxies y Rotación

### SOCKS5 Proxy por Contexto:
```typescript
const context = await browser.newContext({
  proxy: {
    server: 'socks5://proxy-residencial-1:1080',
    username: 'user',
    password: 'pass',
  },
});
```

### Rotación de User-Agent:
```typescript
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_7) AppleWebKit/605.1 Safari/18.1',
];

const context = await browser.newContext({
  userAgent: userAgents[Math.floor(Math.random() * userAgents.length)],
});
```

## 7. Regla de Oro para Kick.com

**NO intentar bypass Cloudflare con HTTP directo.** La API oficial es la ruta correcta:
- **Lectura de chat:** Pusher WebSocket oficial (key: `32cbd69e4b950bf97679`)
- **Escritura de chat:** `POST api.kick.com/public/v1/chat` (OAuth 2.1 PKCE)
- **Login OAuth:** Playwright + stealth 1 sola vez
- **Sesión persistente:** `storageState()` guarda cookies + tokens

El headless browser es SOLO para el login inicial. Todo lo demás usa API oficial.