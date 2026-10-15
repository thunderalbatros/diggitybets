# Kick Chat API — Reference Card

## Endpoint
```
POST https://api.kick.com/public/v1/chat
Authorization: Bearer {access_token}
```

## Request Body (application/json)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `content` | string (max 500 grapheme clusters, 2048 UTF-8 bytes) | ✅ | Mensaje a enviar |
| `type` | `"user"` or `"bot"` | ✅ | Tipo de cuenta que envía |
| `broadcaster_user_id` | integer | Solo si `type: "user"` | ID del broadcaster al que se envía |
| `reply_to_message_id` | UUID | No | Para responder a un mensaje específico |

## Response 200
```json
{ "data": { "is_sent": true, "message_id": "uuid" }, "message": "string" }
```

## Scopes requeridos
- `chat:write` — Enviar mensajes como user o bot

## Errores
- 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests, 500 Internal Server Error

## OAuth 2.1 PKCE Flow
1. Crear app en kick.com/settings/developer → Client ID + Client Secret
2. Authorization URL: `https://id.kick.com/oauth/authorize`
3. Token URL: `https://id.kick.com/oauth/token`
4. Redirect URI: `http://localhost:8765/callback`
5. PKCE: code_challenge (S256) + code_verifier (43-128 chars)
6. Refresh token: ROTA con cada uso (nuevo refresh_token en cada respuesta)
7. Scopes disponibles: chat:write, channel:read, user:read, events:subscribe, etc.

## Rate Limits
- 429 Too Many Requests → implementar retry con backoff exponencial
- Límites específicos NO documentados → medir en Fase 0

## Delete Chat Message
```
DELETE https://api.kick.com/public/v1/chat/{message_id}
Scope: moderation:chat_message:manage
```

## Notas críticas
- `broadcaster_user_id` es OBLIGATORIO para type "user"
- Content: 500 chars grapheme clusters (emoji = 1 cluster). Max 2048 bytes UTF-8.
- message_id es UUID v4
- Para type "bot", el mensaje va al canal asociado al token (broadcaster_user_id ignorado)
- SOLO se debe usar API oficial. Bypass Cloudflare PROHIBIDO.