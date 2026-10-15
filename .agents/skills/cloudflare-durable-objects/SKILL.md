---
name: cloudflare-durable-objects
description: Cloudflare Workers, Durable Objects with SQLite and WebSocket Hibernation API cheatsheet.
---

# Cloudflare Durable Objects & WebSockets

## Architecture
- One Durable Object per streamer channel acts as the single source of truth.
- WebSocket Hibernation API: connections stay open without billing CPU while no messages are transmitted.

## Example Hibernation Pattern
```typescript
export class ChannelRoom extends DurableObject {
  async fetch(request: Request): Promise<Response> {
    const webSocketPair = new WebSocketPair();
    const [client, server] = Object.values(webSocketPair);
    this.ctx.acceptWebSocket(server);
    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {
    // Process message and broadcast to peers
  }
}
```

## Free Tier Rules
- Keep worker bundle size small (under 1MB).
- Use local `wrangler dev` simulation during development without cloud deployment costs.
