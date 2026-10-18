#!/usr/bin/env node
/**
 * tools/agent_factory.mjs — Autonomous Agent Factory Command Center
 * =============================================================================
 * Unified CLI interface for the HuntHub Autonomous Agent Team.
 * 
 * Commands:
 *   node tools/agent_factory.mjs status        # View squads, rules, and memory
 *   node tools/agent_factory.mjs ast           # Run AST Symbolic Guard
 *   node tools/agent_factory.mjs eval          # Run Multi-Dimensional Eval Matrix
 *   node tools/agent_factory.mjs reflect       # Extract & consolidate instincts
 *   node tools/agent_factory.mjs mission <txt> # Run autonomous squad pipeline
 * =============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SQUADS, runSquadMission } from './intelligence/agent_squad.mjs';
import { runAstAudit } from './intelligence/ast_guard.mjs';
import { runEvalMatrix } from './intelligence/eval_matrix.mjs';
import { reflectAndConsolidate } from './intelligence/memory_reflector.mjs';
import { getTemporalLedger } from './intelligence/instincts_engine.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const [cmd, ...args] = process.argv.slice(2);

const B = "\x1b[36m";
const G = "\x1b[32m";
const Y = "\x1b[33m";
const R = "\x1b[31m";
const X = "\x1b[0m";

switch (cmd) {
  case "status": {
    console.log(`\n${B}======================================================${X}`);
    console.log(`🤖 HUNTHUB AUTONOMOUS AGENT FACTORY — STATUS (2026)`);
    console.log(`${B}======================================================${X}\n`);

    console.log(`${G}ACTIVE AGENT SQUADS:${X}`);
    for (const [key, squad] of Object.entries(SQUADS)) {
      console.log(`  • ${B}${squad.name}${X}`);
      console.log(`    Mission: ${squad.mission}`);
      console.log(`    Skills:  ${squad.skills.join(', ')}`);
    }

    const ledger = getTemporalLedger();
    const activeRules = ledger.rules.filter(r => r.status === 'ACTIVE');
    const invalidated = ledger.rules.filter(r => r.status === 'INVALIDATED');

    console.log(`\n${G}GRAPHITI TEMPORAL LEDGER:${X}`);
    console.log(`  Active Architectural Invariants: ${B}${activeRules.length}${X}`);
    console.log(`  Invalidated / Deprecated Rules:   ${Y}${invalidated.length}${X}`);

    const instinctsDir = path.join(ROOT, '.agents', 'memory', 'instincts');
    let instinctCards = [];
    if (fs.existsSync(instinctsDir)) {
      instinctCards = fs.readdirSync(instinctsDir).filter(f => f.endsWith('.md'));
    }
    console.log(`  Procedural Instinct Cards:       ${B}${instinctCards.length}${X}`);

    console.log(`\n${G}AVAILABLE CLI COMMANDS:${X}`);
    console.log(`  node tools/agent_factory.mjs ast           # Run AST Symbolic Guard`);
    console.log(`  node tools/agent_factory.mjs eval          # Run Multi-Dimensional Eval Matrix`);
    console.log(`  node tools/agent_factory.mjs reflect       # Consolidate session instincts`);
    console.log(`  node tools/agent_factory.mjs mission <msg> # Run autonomous squad pipeline\n`);
    break;
  }

  case "ast": {
    const res = runAstAudit();
    process.exit(res.passed ? 0 : 1);
    break;
  }

  case "eval": {
    const res = await runEvalMatrix();
    process.exit(res.passed ? 0 : 1);
    break;
  }

  case "reflect": {
    reflectAndConsolidate();
    break;
  }

  case "mission": {
    const missionName = args.join(' ') || 'Standard Verification Pipeline';
    const res = await runSquadMission(missionName);
    process.exit(res.passed ? 0 : 1);
    break;
  }

  default: {
    console.log(`
Uso de Agent Factory CLI:
  node tools/agent_factory.mjs status        # Ver estado general del equipo y memoria
  node tools/agent_factory.mjs ast           # Auditoría AST y símbolos de código
  node tools/agent_factory.mjs eval          # Matriz de evaluación multidimensional
  node tools/agent_factory.mjs reflect       # Reflexión y consolidación de instintos
  node tools/agent_factory.mjs mission <txt> # Ejecutar misión a través de squads
`);
    break;
  }
}
