import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');

export interface AppConfig {
  channelSlug: string;
  broadcasterUserId: number;
  chatroomId: number;
  kickClientId: string;
  kickClientSecret: string;
  serverPort: number;
  pusherKey: string;
  pusherCluster: string;
  kickRedirectUri: string;
  discordRedirectUri: string;
}

function loadDevVars(): Record<string, string> {
  const varsPath = path.join(rootDir, '.dev.vars');
  const vars: Record<string, string> = {};
  if (fs.existsSync(varsPath)) {
    const lines = fs.readFileSync(varsPath, 'utf-8').split('\n');
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const idx = line.indexOf('=');
      if (idx > 0) {
        const key = line.slice(0, idx).trim();
        const val = line.slice(idx + 1).trim();
        vars[key] = val;
      }
    }
  }
  return vars;
}

const devVars = loadDevVars();
const isProd = process.env.NODE_ENV === 'production';

export const config: AppConfig = {
  channelSlug: process.env.KICK_CHANNEL_SLUG || 'diggitybets',
  broadcasterUserId: Number(process.env.KICK_BROADCASTER_ID) || 88254585,
  chatroomId: Number(process.env.KICK_CHATROOM_ID) || 86765775,
  kickClientId: process.env.KICK_CLIENT_ID || devVars['KICK_CLIENT_ID'] || '',
  kickClientSecret: process.env.KICK_CLIENT_SECRET || devVars['KICK_CLIENT_SECRET'] || '',
  serverPort: Number(process.env.PORT) || 3001,
  pusherKey: '34bf7a0ff419a2a775b9',
  pusherCluster: 'us2',
  kickRedirectUri: process.env.KICK_REDIRECT_URI || (isProd ? 'https://diggitybets.vip/api/auth/kick/callback' : 'http://127.0.0.1:3000/api/auth/kick/callback'),
  discordRedirectUri: process.env.DISCORD_REDIRECT_URI || (isProd ? 'https://diggitybets.vip/api/auth/discord/callback' : 'http://127.0.0.1:3000/api/auth/discord/callback'),
};

