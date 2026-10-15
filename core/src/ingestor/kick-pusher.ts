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
  private pingInterval: NodeJS.Timeout | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private isConnected = false;
  private shouldReconnect = true;
  private messageHandlers: MessageHandler[] = [];
  private commandHandlers: CommandHandler[] = [];

  constructor(chatroomId: number) {
    this.chatroomId = chatroomId;
  }

  public onMessage(handler: MessageHandler): void {
    this.messageHandlers.push(handler);
  }

  public onCommand(handler: CommandHandler): void {
    this.commandHandlers.push(handler);
  }

  public connect(): void {
    this.shouldReconnect = true;
    const watchdog = KickWatchdog.getInstance();
    const activeKey = watchdog.getActivePusherKey();
    const activeCluster = watchdog.getActivePusherCluster();
    const url = `wss://ws-${activeCluster}.pusher.com/app/${activeKey}?protocol=7&client=js&version=8.4.0&flash=false`;

    try {
      this.ws = new WebSocket(url);
    } catch (err) {
      console.error('[Pusher] WebSocket constructor error:', err);
      watchdog.recordFailure();
      this.scheduleReconnect();
      return;
    }

    this.ws.onopen = () => {
      this.isConnected = true;
      watchdog.recordSuccess();
      console.log(`[Pusher] WebSocket connected to Kick cluster (${activeCluster})`);
      this.startKeepalive();
    };

    this.ws.onmessage = (event) => {
      try {
        const raw = typeof event.data === 'string' ? event.data : event.data.toString();
        const payload = JSON.parse(raw);
        if (payload.event === 'pusher:error') {
          const code = payload.data?.code;
          if (code === 4001 || code === 4004) {
            console.warn(`[Pusher] App key rejected by Kick (${code}). Triggering dynamic rediscovery...`);
            watchdog.discoverActivePusherKey().then((newKey) => {
              if (newKey) this.connect();
            });
          }
        }
        this.handlePusherEvent(payload);
      } catch (err) {
        console.error('[Pusher] Error parsing message:', err);
      }
    };

    this.ws.onerror = (err) => {
      watchdog.recordFailure();
      console.warn('[Pusher] Socket error:', err);
    };

    this.ws.onclose = (event) => {
      this.isConnected = false;
      this.stopKeepalive();
      console.log(`[Pusher] Disconnected (code: ${event.code}, reason: ${event.reason || 'none'})`);
      if (this.shouldReconnect) {
        this.scheduleReconnect();
      }
    };
  }

  public disconnect(): void {
    this.shouldReconnect = false;
    this.stopKeepalive();
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    if (this.ws) {
      try { this.ws.close(); } catch {}
      this.ws = null;
    }
  }

  private startKeepalive(): void {
    this.stopKeepalive();
    this.pingInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ event: 'pusher:ping', data: {} }));
      }
    }, 25000);
  }

  private stopKeepalive(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      console.log('[Pusher] Reconnecting to Kick chat...');
      this.connect();
    }, 4000);
  }

  private handlePusherEvent(payload: { event: string; channel?: string; data?: any }): void {
    const { event, data } = payload;

    if (event === 'pusher:connection_established') {
      const channel = `chatrooms.${this.chatroomId}.v2`;
      this.ws?.send(JSON.stringify({
        event: 'pusher:subscribe',
        data: { auth: '', channel }
      }));
      return;
    }

    if (event === 'pusher_internal:subscription_succeeded') {
      console.log(`[Pusher] Subscribed to Kick chatroom ${this.chatroomId} (Realtime Chat Active)`);
      return;
    }

    if (event === 'App\\Events\\ChatMessageEvent') {
      let parsed = data;
      if (typeof data === 'string') {
        try { parsed = JSON.parse(data); } catch { return; }
      }
      if (!parsed) return;

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
