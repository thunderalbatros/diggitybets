import { config } from '../config.ts';
import { KickWatchdog } from './kick-watchdog.ts';

export interface KickSender {
  id: number;
  username: string;
  slug: string;
  identity?: {
    color?: string;
    badges?: Array<{ type: string; text?: string; count?: number }>;
  };
}

export interface KickChatMessage {
  id: string;
  chatroomId: number;
  content: string;
  sender: KickSender;
  createdAt: string;
}

export type MessageHandler = (msg: KickChatMessage) => void;
export type CommandHandler = (cmd: {
  command: string;
  args: string[];
  rawText: string;
  sender: KickSender;
  messageId: string;
}) => void;

export class KickPusherClient {
  private chatroomId: number;
  private ws: WebSocket | null = null;
  private pusherWs: WebSocket | null = null;
  private pusherPingInterval: NodeJS.Timeout | null = null;
  private pusherReconnectTimer: NodeJS.Timeout | null = null;
  private pingInterval: NodeJS.Timeout | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private isConnected = false;
  private shouldReconnect = true;
  private messageHandlers: MessageHandler[] = [];
  private commandHandlers: CommandHandler[] = [];
  private seenMsgIds = new Map<string, number>();

  constructor(chatroomId: number) {
    this.chatroomId = chatroomId;
  }

  public onMessage(handler: MessageHandler): void {
    this.messageHandlers.push(handler);
  }

  public onCommand(handler: CommandHandler): void {
    this.commandHandlers.push(handler);
  }

  public async connect(): Promise<void> {
    this.shouldReconnect = true;
    this.connectCentrifugo();
    this.connectPusher();
  }

  private async connectCentrifugo(): Promise<void> {
    this.stopKeepalive();

    let token = '';
    try {
      const clientId = crypto.randomUUID();
      const authRes = await fetch('https://web.kick.com/api/v1/realtime/auth/connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-app-platform': 'web',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        },
        body: JSON.stringify({ client_id: clientId })
      });
      if (authRes.ok) {
        const authData: any = await authRes.json();
        token = authData?.data?.token || '';
      }
    } catch (err) {
      console.warn('[KickChat] Failed to obtain Centrifugo token:', err);
    }

    const wsUrl = 'wss://realtime.us-west-2.platform.kick.com/connection/websocket';

    try {
      this.ws = new WebSocket(wsUrl);
    } catch (err) {
      console.error('[KickChat] WebSocket constructor error:', err);
      this.scheduleReconnect();
      return;
    }

    this.ws.onopen = () => {
      this.isConnected = true;
      console.log(`[KickChat] WebSocket connected to Kick Realtime Centrifugo (Room #${this.chatroomId})`);
      if (token && this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({
          id: 1,
          connect: { token }
        }));
      }
      this.startKeepalive();
    };

    this.ws.onmessage = (event) => {
      this.lastActivity = Date.now();
      try {
        const raw = typeof event.data === 'string' ? event.data : event.data.toString();
        const lines = raw.split('\n');
        for (const rawLine of lines) {
          const line = rawLine.trim();
          if (!line) continue;
          if (line === '{}') {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) this.ws.send('{}');
            continue;
          }
          let payload;
          try {
            payload = JSON.parse(line);
          } catch (_) {
            continue;
          }

          // Handshake connect reply -> subscribe to chatroom channel
          if (payload.id === 1 && payload.connect) {
            console.log(`[KickChat] Centrifugo handshake OK. Subscribing to chatrooms.${this.chatroomId}.v2`);
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
              this.ws.send(JSON.stringify({
                id: 2,
                subscribe: { channel: `chatrooms.${this.chatroomId}.v2` }
              }));
            }
            continue;
          }

          let pubData = null;
          if (payload.push && payload.push.pub && payload.push.pub.data) {
            pubData = payload.push.pub.data;
          } else if (payload.pub && payload.pub.data) {
            pubData = payload.pub.data;
          } else if (payload.event) {
            pubData = payload;
          }

          if (pubData) {
            this.handlePusherEvent(pubData);
          }
        }
      } catch (err) {
        console.error('[KickChat] Error parsing Centrifugo message:', err);
      }
    };

    this.ws.onerror = (err) => {
      console.warn('[KickChat] Centrifugo socket error:', err);
    };

    this.ws.onclose = (event) => {
      this.isConnected = false;
      this.stopKeepalive();
      console.log(`[KickChat] Centrifugo disconnected (code: ${event.code}, reason: ${event.reason || 'none'})`);
      if (this.shouldReconnect) {
        this.scheduleReconnect();
      }
    };
  }

  private connectPusher(): void {
    if (!this.shouldReconnect) return;
    try {
      if (this.pusherWs) {
        try { this.pusherWs.close(); } catch {}
      }
      const pusherUrl = 'wss://ws-us2.pusher.com/app/34bf7a0ff419a2a775b9?protocol=7&client=js&version=8.4.0-rc2&flash=false';
      this.pusherWs = new WebSocket(pusherUrl);

      this.pusherWs.onopen = () => {
        console.log(`[KickChat] Pusher connected to Kick (Room #${this.chatroomId})`);
        if (this.pusherWs && this.pusherWs.readyState === WebSocket.OPEN) {
          this.pusherWs.send(JSON.stringify({
            event: 'pusher:subscribe',
            data: { auth: '', channel: `chatrooms.${this.chatroomId}.v2` }
          }));
        }
        if (this.pusherPingInterval) clearInterval(this.pusherPingInterval);
        this.pusherPingInterval = setInterval(() => {
          if (this.pusherWs && this.pusherWs.readyState === WebSocket.OPEN) {
            this.pusherWs.send(JSON.stringify({ event: 'pusher:ping', data: {} }));
          }
        }, 25000);
      };

      this.pusherWs.onmessage = (event) => {
        try {
          const raw = typeof event.data === 'string' ? event.data : event.data.toString();
          if (!raw) return;
          const payload = JSON.parse(raw);
          if (payload.event === 'App\\Events\\ChatMessageEvent') {
            this.handlePusherEvent(payload);
          }
        } catch (_) {}
      };

      this.pusherWs.onclose = () => {
        if (this.pusherPingInterval) {
          clearInterval(this.pusherPingInterval);
          this.pusherPingInterval = null;
        }
        if (this.shouldReconnect && !this.pusherReconnectTimer) {
          this.pusherReconnectTimer = setTimeout(() => {
            this.pusherReconnectTimer = null;
            this.connectPusher();
          }, 4000);
        }
      };

      this.pusherWs.onerror = () => {
        try { if (this.pusherWs) this.pusherWs.close(); } catch {}
      };
    } catch (_) {
      if (this.shouldReconnect && !this.pusherReconnectTimer) {
        this.pusherReconnectTimer = setTimeout(() => {
          this.pusherReconnectTimer = null;
          this.connectPusher();
        }, 5000);
      }
    }
  }

  public disconnect(): void {
    this.shouldReconnect = false;
    this.stopKeepalive();
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    if (this.pusherReconnectTimer) clearTimeout(this.pusherReconnectTimer);
    if (this.pusherPingInterval) clearInterval(this.pusherPingInterval);
    if (this.ws) {
      try { this.ws.close(); } catch {}
      this.ws = null;
    }
    if (this.pusherWs) {
      try { this.pusherWs.close(); } catch {}
      this.pusherWs = null;
    }
  }

  private lastActivity = Date.now();
  private watchdogTimer: NodeJS.Timeout | null = null;

  private startKeepalive(): void {
    this.stopKeepalive();
    this.lastActivity = Date.now();
    this.watchdogTimer = setInterval(() => {
      if (Date.now() - this.lastActivity > 45000) {
        console.warn('[KickChat] Centrifugo watchdog timeout (>45s inactivity). Reconnecting...');
        this.stopKeepalive();
        if (this.ws) {
          try { this.ws.close(); } catch {}
        }
      }
    }, 10000);
  }

  private stopKeepalive(): void {
    if (this.watchdogTimer) {
      clearInterval(this.watchdogTimer);
      this.watchdogTimer = null;
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      console.log('[KickChat] Reconnecting to Kick Centrifugo...');
      this.connectCentrifugo();
    }, 3500);
  }

  private handlePusherEvent(payload: { event: string; channel?: string; data?: any }): void {
    const { event, data } = payload;

    if (event === 'App\\Events\\ChatMessageEvent') {
      let parsed = data;
      if (typeof data === 'string') {
        try { parsed = JSON.parse(data); } catch { return; }
      }
      if (!parsed) return;

      const msgId = String(parsed.id || `${parsed.sender?.username}:${parsed.content}`);
      const now = Date.now();
      if (this.seenMsgIds.has(msgId) && now - (this.seenMsgIds.get(msgId) || 0) < 5000) {
        return;
      }
      this.seenMsgIds.set(msgId, now);
      if (this.seenMsgIds.size > 200) {
        for (const [k, v] of this.seenMsgIds.entries()) {
          if (now - v > 15000) this.seenMsgIds.delete(k);
        }
      }

      const chatMsg: KickChatMessage = {
        id: parsed.id || String(Date.now()),
        chatroomId: parsed.chatroom_id || this.chatroomId,
        content: parsed.content || '',
        sender: {
          id: parsed.sender?.id || 0,
          username: parsed.sender?.username || 'anonymous',
          slug: parsed.sender?.slug || '',
          identity: parsed.sender?.identity,
        },
        createdAt: parsed.created_at || new Date().toISOString(),
      };

      // Notify message handlers
      for (const handler of this.messageHandlers) {
        try { handler(chatMsg); } catch (e) { console.error('[Handler Error]', e); }
      }

      // Check if message is a command (starts with !)
      const trimmed = chatMsg.content.trim();
      if (trimmed.startsWith('!')) {
        const parts = trimmed.slice(1).split(/\s+/);
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        for (const handler of this.commandHandlers) {
          try {
            handler({
              command,
              args,
              rawText: trimmed,
              sender: chatMsg.sender,
              messageId: chatMsg.id,
            });
          } catch (e) { console.error('[Command Handler Error]', e); }
        }
      }
    }
  }
}
