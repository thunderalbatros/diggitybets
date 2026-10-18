/**
 * HuntHub Web Studio — Paperclip AI Lightweight Local Launcher
 * Mode: On-Demand Zero-Overhead Runner
 * 
 * Features:
 * - Checks Node.js >= 24
 * - Verifies port 3100 availability
 * - Starts Paperclip local server with Embedded Postgres
 * - Auto-opens http://localhost:3100 in browser
 * - Guarantees clean exit (kills child processes on close, zero zombie daemons for OBS)
 */

import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

const PORT = 3100;
const HOST = '127.0.0.1';

console.log('========================================================');
console.log('   HuntHub Web Studio — Paperclip AI Agency Launcher');
console.log('   Modo: Local Ligero (Embedded Postgres / Cero Docker)');
console.log('========================================================\n');

// 1. Check Node.js version
const majorVersion = parseInt(process.versions.node.split('.')[0], 10);
if (majorVersion < 24) {
  console.error(`[ERROR] Paperclip requiere Node.js 24 o superior. Version actual: ${process.version}`);
  process.exit(1);
}
console.log(`[OK] Node.js detectado: ${process.version}`);

// 2. Check Port 3100 availability
function checkPort(port) {
  return new Promise((resolve) => {
    const server = createServer();
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false);
      } else {
        resolve(true);
      }
    });
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, HOST);
  });
}

async function start() {
  const isPortAvailable = await checkPort(PORT);
  if (!isPortAvailable) {
    console.log(`[AVISO] El puerto ${PORT} ya esta en uso. Puede que Paperclip ya este corriendo.`);
    console.log(`Abriendo http://localhost:${PORT} en tu navegador...`);
    openBrowser(`http://localhost:${PORT}`);
    return;
  }

  console.log('[INFO] Iniciando Paperclip AI en modo local ligero...');
  console.log('[INFO] Base de datos: Embedded Postgres (local en disco)');
  console.log('[INFO] Presiona Ctrl+C en esta terminal para detener el servicio.\n');

  // Spawn npx paperclipai run or onboard
  const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const child = spawn(npxCmd, ['--yes', '--registry', 'https://registry.npmjs.org', 'paperclipai', 'run'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: String(PORT),
    }
  });

  child.on('error', (err) => {
    console.error('[ERROR al ejecutar Paperclip]:', err.message);
  });

  // Open browser after small delay
  setTimeout(() => {
    openBrowser(`http://localhost:${PORT}`);
  }, 4000);

  // Clean shutdown handlers
  const cleanup = () => {
    console.log('\n[INFO] Deteniendo Paperclip AI y liberando memoria...');
    if (child && !child.killed) {
      child.kill('SIGINT');
    }
    process.exit(0);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('exit', () => {
    if (child && !child.killed) {
      child.kill('SIGKILL');
    }
  });
}

function openBrowser(url) {
  const startCmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  spawn(startCmd, [url], { shell: true, detached: true, stdio: 'ignore' }).unref();
}

start();
