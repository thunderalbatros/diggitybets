# Rule: Security & Input Sanitization

1. Treat all spectator input (chat messages, usernames, slot names, guesses) as hostile:
   - Render exclusively using `textContent` or safe DOM text nodes. Never use raw `innerHTML` with unsanitized user strings.
   - Enforce character length limits, strip control characters, zero-width spaces, and directional override characters.
2. Zero secrets in version control:
   - Tokens, keys, and webhooks live exclusively in `.dev.vars` (git-ignored) or hosting secrets.
3. Webhook signatures must be verified cryptographically on inbound Kick events.
4. Overlays must access the WebSocket hub using read-only, revocable tokens.
