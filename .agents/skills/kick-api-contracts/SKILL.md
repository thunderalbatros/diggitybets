---
name: kick-api-contracts
description: "Contratos técnicos inmutables de la API oficial de Kick y OAuth 2.1 PKCE."
---

# Kick API — Contratos Vinculantes

Fuente de verdad: `knowledge/docs/KICK_API_REFERENCE.md` y `KICK_OAUTH_REFERENCE.md`.

## Envío de chat (ÚNICA vía permitida)

```http
POST https://api.kick.com/public/v1/chat
Authorization: Bearer {user_access_token}
Content-Type: application/json

{ "broadcaster_user_id": 123456, "content": "texto", "type": "user" }
```

- Scope obligatorio: **`chat:write`**
- Límite de contenido: **500 caracteres**
- Respuesta útil: `data.message_id`, `data.is_sent`

## OAuth 2.1 + PKCE

- Autorización: `id.kick.com`, `redirect_uri` = `http://localhost:8765/callback`
- El **refresh token rota**: guarda el nuevo en cada refresh o pierdes el acceso.
- Los IDs (`chatroom_id`, `broadcaster_user_id`) se extraen **manualmente 1 vez** vía
  DevTools. Ver `spike/kick-api/extraer-ids.md`.

## Lectura de chat (WebSocket)

- Proveedor: **Pusher** `ws-us2.pusher.com`, key `32cbd69e4b950bf97679`
- Canal: `chatrooms.{chatroom_id}.v2`
- Solo lectura. Es la única pieza no-oficial tolerada.

## Códigos de error y acción

| HTTP | Significado | Acción |
|------|-------------|--------|
| 401 | Token expirado/inválido | Re-ejecutar `oauth-login.ts`; revisar rotación |
| 403 | Scope insuficiente | Verificar `chat:write` en el token |
| 429 | Rate limit | Backoff exponencial; respetar el límite |

## Prohibiciones absolutas

- ❌ Scrapers, bots, o bypass de Cloudflare (viola ToS → baneo).
- ❌ Enviar wallet/dinero automáticamente: SIEMPRE manual con un toque.
- ❌ Ignorar un 429: un shadowban = sorteo perdido.

## Health-check #1 del sistema: mensaje invisible (shadowban)

Un mensaje enviado que **no aparece visible en el chat** es un *shadowban*: la API
responde 200 (`is_sent: true`) pero el chat no lo muestra. Para el sorteo es como si
la entrada no existiera (informe §1, factor "mensajes visibles").

**Procedimiento cuando un mensaje no aparece:**
1. `npm run kick:shadowban` — envía un mensaje de prueba y verifica si es visible.
2. Si está oculto: **pausa toda escritura automática** del canal y revisa tokens
   (¿rotó el refresh? ¿borraron/moderaron mensajes recientes?).
3. Cadencia: **semanal**, y siempre tras renovar token o tras un mensaje borrado.

Es el chequeo de salud más importante del sistema: un mensaje invisible = sorteo perdido.
