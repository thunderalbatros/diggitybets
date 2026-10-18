#!/usr/bin/env node
/**
 * DiggityBets × Paperclip AI Local Bridge (tools/paperclip_diggity_bridge.mjs)
 * ============================================================================
 * Connects to your local Paperclip server (http://localhost:3100/api) to:
 *   1. Inspect active companies, agents, and live issue queues (`--status`)
 *   2. Enable "Stream Mode" on all agents (`--stream-mode`): disables background
 *      polling (`intervalSec: 0`, `wakeOnDemand: true`) so your HP 250 G8 uses
 *      0% idle CPU while OBS & Kick are streaming.
 *   3. Dispatch high-value engineering/QA missions directly to your Paperclip
 *      squad (`--dispatch <mission>`).
 *
 * Usage:
 *   node tools/paperclip_diggity_bridge.mjs --status
 *   node tools/paperclip_diggity_bridge.mjs --stream-mode
 *   node tools/paperclip_diggity_bridge.mjs --seed-missions
 */

const PAPERCLIP_BASE = process.env.PAPERCLIP_API_URL || 'http://127.0.0.1:3100/api';

async function apiRequest(path, options = {}) {
  const url = `${PAPERCLIP_BASE}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} on ${path}: ${txt.slice(0, 200)}`);
  }
  return res.json();
}

async function getPrimaryCompany() {
  const companies = await apiRequest('/companies');
  if (!Array.isArray(companies) || companies.length === 0) {
    throw new Error('No companies found in local Paperclip instance.');
  }
  return companies[0];
}

async function showStatus() {
  const health = await apiRequest('/health');
  const company = await getPrimaryCompany();
  const agents = await apiRequest(`/companies/${company.id}/agents`);
  const issues = await apiRequest(`/companies/${company.id}/issues`).catch(() => []);

  console.log('==============================================================');
  console.log(` 📎 PAPERCLIP LOCAL CONTROL PLANE — ${company.name}`);
  console.log('==============================================================');
  console.log(` • Server Status : ${health.status || 'ok'} (Mode: ${health.deploymentMode || 'local_trusted'})`);
  console.log(` • Company ID    : ${company.id}`);
  console.log(` • Active Squad  : ${agents.length} specialized agents`);
  console.log(` • Issue Backlog : ${Array.isArray(issues) ? issues.length : 0} tasks`);
  console.log('--------------------------------------------------------------');
  for (const a of agents) {
    const hb = a.runtimeConfig?.heartbeat || {};
    const mode = Number(hb.intervalSec || 0) === 0 ? '⚡ On-Demand (0% Idle CPU)' : `⏱️ Timer (${hb.intervalSec}s)`;
    console.log(` [${String(a.status || 'idle').padEnd(7)}] ${a.name.padEnd(28)} | ${a.AdapterType || a.adapterType || 'local'} | ${mode}`);
  }
  console.log('==============================================================');
}

async function enableStreamMode() {
  const company = await getPrimaryCompany();
  const agents = await apiRequest(`/companies/${company.id}/agents`);
  console.log(`[Paperclip Bridge] Optimizing ${agents.length} agents for HP 250 G8 Stream Mode (0% idle CPU)...`);

  let updated = 0;
  for (const agent of agents) {
    const currentRc = agent.runtimeConfig || {};
    const currentHb = currentRc.heartbeat || {};
    if (Number(currentHb.intervalSec || 0) !== 0 || currentHb.wakeOnDemand !== true) {
      await apiRequest(`/agents/${agent.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          runtimeConfig: {
            ...currentRc,
            heartbeat: {
              ...currentHb,
              enabled: true,
              intervalSec: 0,
              wakeOnDemand: true,
              cooldownSec: 60,
              maxConcurrentRuns: 1
            }
          }
        })
      });
      updated++;
      console.log(`  ✔ ${agent.name}: switched to wakeOnDemand (intervalSec: 0)`);
    } else {
      console.log(`  • ${agent.name}: already in wakeOnDemand mode`);
    }
  }
  console.log(`[Paperclip Bridge] Done! ${updated} agents updated. Paperclip will consume 0% CPU until you assign an issue.`);
}

async function seedHighValueMissions() {
  const company = await getPrimaryCompany();
  const agents = await apiRequest(`/companies/${company.id}/agents`);
  const findAgent = (keyword) => agents.find((a) => (a.name || '').toLowerCase().includes(keyword.toLowerCase()));

  const missions = [
    {
      title: '[Audit] Pre-Stream Security, CSP & Floor Guard Verification',
      description: 'Run `node tools/audit/floor_and_aeo_guard.mjs` and verify 100% PASS across all 8 OBS overlays, CSP headers, and schema endpoints before going live on Kick.',
      priority: 'high',
      assigneeAgentId: (findAgent('QA') || findAgent('Security') || agents[0])?.id
    },
    {
      title: '[Catalog] Weekly Fresh Slots & Mathematical Twin Audit',
      description: 'Inspect `data/curated_slots.js` and verify RTP, volatility, and Max Win metadata for the latest Hacksaw Gaming, Pragmatic Play, and Nolimit City releases.',
      priority: 'medium',
      assigneeAgentId: (findAgent('Research') || findAgent('Catalog') || agents[0])?.id
    },
    {
      title: '[Overlays] OBS Browser Source Frame-Budget Check (<= 5% CPU)',
      description: 'Verify that `overlay-celebration`, `overlay-slotrequests`, `overlay-bonushunt`, and `overlay-battle` maintain zero idle rAF loops when hidden or inactive.',
      priority: 'high',
      assigneeAgentId: (findAgent('Visual') || findAgent('Frontend') || agents[0])?.id
    }
  ];

  console.log(`[Paperclip Bridge] Seeding ${missions.length} operational missions into ${company.name}...`);
  for (const m of missions) {
    const created = await apiRequest(`/companies/${company.id}/issues`, {
      method: 'POST',
      body: JSON.stringify({
        title: m.title,
        description: m.description,
        priority: m.priority,
        status: 'todo',
        assigneeAgentId: m.assigneeAgentId || null
      })
    });
    console.log(`  ✔ Created Issue #${created.identifier || created.id}: ${m.title}`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  try {
    if (args.includes('--stream-mode')) {
      await enableStreamMode();
    } else if (args.includes('--seed-missions')) {
      await seedHighValueMissions();
    } else {
      await showStatus();
    }
  } catch (err) {
    console.error(`[Paperclip Bridge] Notice: ${err.message}`);
    console.error('Make sure Paperclip is running locally via INICIAR_PAPERCLIP.bat (http://localhost:3100).');
    process.exitCode = 1;
  }
}

main();
