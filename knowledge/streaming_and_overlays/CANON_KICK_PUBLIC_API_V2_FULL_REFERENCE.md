# CANON KICK PUBLIC API V2 FULL REFERENCE

> **Alcance:** Documentación técnica y contratos de Kick.com API v2, dinámicas matemáticas de RTP/volatilidad de slots, sistemas de lealtad y arquitectura de overlays de baja latencia.

[knowledge/docs/KICK_PUBLIC_API_V2_FULL.md › Kick Public API v2 — Referencia Completa (verificada Sep 2026)]
> **Fuente:** `docs.kick.com/llms.txt` + páginas `.md` oficiales (fetch real)
> **Base URL:** `https://api.kick.com` · **Auth:** OAuth 2.1 PKCE (`id.kick.com`)

[knowledge/docs/KICK_PUBLIC_API_V2_FULL.md › Kick Public API v2 — Referencia Completa (verificada Sep 2026) › Tipos de token]
| Token | Flow | Uso |
|-------|------|-----|
| **User Access Token** | Authorization Code + PKCE | Actuar como el usuario (`chat:write`, `events:subscribe`) |
| **App Access Token** | Client Credentials | Datos públicos sin login de usuario |

[knowledge/docs/KICK_PUBLIC_API_V2_FULL.md › Kick Public API v2 — Referencia Completa (verificada Sep 2026) › Scopes completos (oficiales)]
`ads:read` · `ads:write` · `channel:read` · `channel:rewards:read` · `channel:rewards:write` ·
`channel:write` · `chat:write` · `events:subscribe` · `kicks:read` · `moderation:ban` ·
`moderation:chat_message:manage` · `streamkey:read` · `user:read`

[knowledge/docs/KICK_PUBLIC_API_V2_FULL.md › Kick Public API v2 — Referencia Completa (verificada Sep 2026) › Endpoints › Channels]
```
GET   /public/v1/channels?slug={slug}                 (máx 50 slugs, o broadcaster_user_id, o nada)
PATCH /public/v1/channels                             (channel:write — edita metadata)
```
**Respuesta `GetChannel`:** `broadcaster_user_id`, `slug`, `stream_title`, `category`,
`stream{is_live, viewer_count, start_time, thumbnail, language, custom_tags, is_mature}`,
`channel_description`, `banner_picture`, `active_subscribers_count`,
`active_gifted_subscribers_count`, `canceled_subscribers_count`.

> ⚠️ **NO incluye `chatroom_id`.** Verificado. El chatroom_id NO es accesible por la API oficial.

[knowledge/docs/KICK_PUBLIC_API_V2_FULL.md › Kick Public API v2 — Referencia Completa (verificada Sep 2026) › Endpoints › Livestreams]
```
GET /public/v1/livestreams                  (paginado por cursor, orden oldest→newest)
GET /public/v1/users/livestreams?user_id=   (máx 100 IDs — ideal para nuestros 8 canales)
GET /public/v1/livestreams/stats            (total_count)
```
**Respuesta `LivestreamV2`:** `id` (uuid), `title`, `viewer_count`, `language_code`,
`started_at`, `tags[]`, `thumbnail`, `has_mature_content`, `category{id,name,thumbnail}`,
`broadcaster_user{id,username,profile_picture}`, `channel{slug}`.
**Paginación:** `{data[], message, pagination{next_cursor}}`.

> 💡 **Radar:** la paginación por cursor permite recorrer TODOS los streams en vivo
> (no solo los top). Ahí sí aparecen los canales pequeños (<300 viewers).

[knowledge/docs/KICK_PUBLIC_API_V2_FULL.md › Kick Public API v2 — Referencia Completa (verificada Sep 2026) › Endpoints › Categories]
```
GET /public/v2/categories?cursor=&limit=&name=&tag=&id=   (limit 1-1000, cursor)
GET /public/v1/categories/{id}                            (DEPRECATED)
```
**`CategoryWithTags`:** `id`, `name`, `tags[]`, `thumbnail`.

[knowledge/docs/KICK_PUBLIC_API_V2_FULL.md › Kick Public API v2 — Referencia Completa (verificada Sep 2026) › Endpoints › Chat]
```
POST   /public/v1/chat                    (chat:write)
DELETE /public/v1/chat/{message_id}       (moderation:chat_message:manage)
```
**Body POST:** `{ broadcaster_user_id (req. si type=user), content (máx 500 grafemas / 2048 bytes UTF-8), type: "user"|"bot", reply_to_message_id? }`
**Respuesta:** `{data:{is_sent, message_id}}`

[knowledge/docs/KICK_PUBLIC_API_V2_FULL.md › Kick Public API v2 — Referencia Completa (verificada Sep 2026) › Endpoints › Events / Webhooks]
```
GET    /public/v1/events/subscriptions?broadcaster_user_id=
POST   /public/v1/events/subscriptions     (events:subscribe)
DELETE /public/v1/events/subscriptions?id=
```
**Límites:** 10.000 suscripciones por tipo de evento por app.
`chat.message.sent`: **1.000 para apps NO verificadas**.

[knowledge/docs/KICK_PUBLIC_API_V2_FULL.md › Kick Public API v2 — Referencia Completa (verificada Sep 2026) › Webhooks — tipos de evento (payloads)]
Headers en cada entrega: `Kick-Event-Type` y `Kick-Event-Version`.

| Evento | Descripción |
|--------|-------------|
| `chat.message.sent` | Mensaje enviado en el chat de un stream |
| `channel.followed` | Un usuario sigue el canal |
| `channel.subscription.new` | Primera suscripción de un usuario |
| `channel.subscription.renewal` | Renovación de suscripción |
| `channel.subscription.gifts` | Regalo de suscripciones |
| `channel.reward.redemption.updated` | Canje de Channel Point reward |
| `livestream.status.updated` | Stream inició/terminó (`is_live`, `started_at`, `ended_at`) |
| `livestream.metadata.updated` | Cambió título/categoría/language |
| `moderation.banned` | Usuario baneado |
| `kicks.gifted` | Regalo de KICKs (`amount`, `name`, `tier`) |

[knowledge/docs/KICK_PUBLIC_API_V2_FULL.md › Kick Public API v2 — Referencia Completa (verificada Sep 2026) › Webhooks — tipos de evento (payloads) › Payload `chat.message.sent`]
```json
{
  "message_id": "...", "replies_to": {},
  "broadcaster": {"user_id":123,"username":"...","channel_slug":"..."},
  "sender": {"user_id":456,"username":"...","channel_slug":"...",
             "identity":{"username_color":"#FF5733","badges":[{"text":"Moderator","type":"moderator"}]}},
  "content": "texto", "created_at": "..."
}
```
> ⚠️ **NO contiene `chatroom_id`.** Es la vía **oficial y sancionada** para leer chat, pero exige
> un **endpoint HTTPS entrante** (contradice la política egress-only + UFW de Centinela). Por eso
> el diseño mantiene **Pusher para lectura** y usa webhooks solo si se despliega endpoint público.

[knowledge/docs/KICK_PUBLIC_API_V2_FULL.md › Kick Public API v2 — Referencia Completa (verificada Sep 2026) › Conclusión arquitectónica (por qué chatroom_id es manual)]
1. La API oficial (`api.kick.com/public/v1`) **no expone `chatroom_id`** en ningún endpoint:
   ni `/channels`, ni `/livestreams`, ni `/events`, ni los payloads de webhook.
2. El `chatroom_id` solo existe en la API **interna** (`kick.com/api/v2/channels/{slug}` → `chatroom.id`),
   protegida por Cloudflare.
3. Bypass de Cloudflare = **PROHIBIDO** (DEC-003) → riesgo de ban de cuenta.
4. **Solución:** extracción manual 1 vez por canal en el navegador logueado (30 s).
   Ver `spike/kick-api/extraer-ids.md`.

[knowledge/docs/KICK_PUBLIC_API_V2_FULL.md › Kick Public API v2 — Referencia Completa (verificada Sep 2026) › Comportamiento observado del radar (medición real)]
- `GET /public/v1/livestreams?limit=100` devuelve **solo streams top** (viewers mín. observado: **581**).
- El orden por defecto es por relevancia/popularidad, **no** por viewers ascendente.
- Los params `sort`/`direction` **no cambian** el resultado (probados: `viewer_count`, `started_at`, `asc`).
- ✅ **Vía correcta para descubrir canales pequeños:** iterar `pagination.next_cursor`
  hasta agotar la lista y filtrar localmente por `viewer_count <= 300`.

[knowledge/docs/KICK_PUBLIC_API_V2_FULL.md › Kick Public API v2 — Referencia Completa (verificada Sep 2026) › Errores HTTP y acción]
| HTTP | Significado | Acción |
|------|-------------|--------|
| 401 | Token expirado/ inválido | Refrescar (`refresh_token` rotativo) o re-login |
| 403 | Scope insuficiente / Cloudflare bloqueó | Verificar scope; en API interna NO insistir |
| 404 | Path incorrecto (ej. `/api/v2` en host oficial) | Corregir host: `kick.com` vs `api.kick.com` |
| 429 | Rate limit | Backoff exponencial; respetar límite |