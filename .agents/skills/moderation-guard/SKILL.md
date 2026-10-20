---
name: moderation-guard
description: "Protocolo de protección y cumplimiento de cuenta en Kick."
---

# 🛡️ Moderation Guard (Protección de Cuenta y Anti-Ban)

> **Directiva Constitucional:** La seguridad de la cuenta de Kick (@tarkansky) prevalece sobre cualquier intento de interacción o saludo.  
> **Regla Cero:** Ningún mensaje de chat debe despacharse sin haber confirmado previamente que la cuenta no está baneada y que sigue al canal si está en modo *Followers-Only*.

---

## 🔒 Detección y Flujo de Modo "Solo Seguidores"

1. **La Trampa de los Endpoints Internos:**
   - La API oficial de Kick (OAuth 2.1) **no tiene scope para seguir canales**.
   - Hacer un `POST` directo a `/api/v2/channels/{slug}/follow` vía Node.js es bloqueado por Cloudflare (HTTP 403).
   - Por ende, **el follow real debe realizarse a través del navegador Chromium/Edge con perfil persistente** (`tools/lib/browser-follow.mjs`).

2. **Verificación Previa Obligatoria:**
   - Antes de despachar cualquier mensaje en un canal no explorado:
     * El navegador inspecciona el DOM de la página del streamer.
     * Si el botón muestra `"Follow"` o `"Seguir"`, se ejecuta el click real en el DOM y se espera a que conmute a `"Following"` o `"Siguiendo"`.
     * Si no se puede verificar el follow en red, **SE ABORTA EL ENVÍO DE CHAT**. Jamás forzar el envío a ciegas.

3. **Protocolo ante HTTP 403 (Forbidden):**
   - Causas de un 403 en Kick:
     * El canal está en modo seguidores y la cuenta no lo sigue.
     * La cuenta fue baneada o silenciada del chat por un moderador (`Estás baneado del chat`).
     * Cloudflare o el WAF de Kick bloquearon la solicitud.
   - **Acción Inmediata:**
     * Marcar el canal en `interactionHistory.markBanned(slug)`.
     * Poner el canal en **cuarentena permanente en disco**.
     * Abortar todos los reintentos automáticos para no quemar tokens de la API.
