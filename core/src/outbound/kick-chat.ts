import { config } from '../config.ts';

export interface ChatMessageOptions {
  broadcasterUserId?: number;
  content: string;
  type?: 'bot' | 'user';
}

export class KickChatClient {
  private queue: string[] = [];
  private isProcessing = false;
  private accessToken: string | null = null;
  private broadcasterUserId: number;

  constructor(broadcasterUserId: number = config.broadcasterUserId) {
    this.broadcasterUserId = broadcasterUserId;
  }

  public setAccessToken(token: string): void {
    this.accessToken = token;
  }

  public async sendMessage(content: string): Promise<boolean> {
    const trimmed = content.trim();
    if (!trimmed) return false;

    // Enqueue message to maintain token-bucket rate limits (1 msg per 1.5s)
    this.queue.push(trimmed);
    this.processQueue();
    return true;
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const msg = this.queue.shift()!;
      await this.dispatch(msg);
      // Rate-limit pause (1500ms between outbound messages)
      await new Promise((r) => setTimeout(r, 1500));
    }

    this.isProcessing = false;
  }

  private async dispatch(content: string): Promise<void> {
    // 1. If we have a Kick OAuth Access Token, call Kick Public API
    if (this.accessToken) {
      try {
        const res = await fetch('https://api.kick.com/public/v1/chat', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            broadcaster_user_id: this.broadcasterUserId,
            content,
            type: 'bot',
          }),
        });

        if (res.ok) {
          console.log(`[Kick Outbound] Sent: "${content}"`);
          return;
        } else {
          const errText = await res.text();
          console.warn(`[Kick Outbound] API error HTTP ${res.status}:`, errText);
        }
      } catch (err) {
        console.error('[Kick Outbound] Fetch error:', err);
      }
    }

    // 2. Fallback: Log for Streamer.bot bridge or console
    console.log(`[Kick Outbound (Queue)] "${content}" (Awaiting active token or Streamer.bot dispatch)`);
  }
}
