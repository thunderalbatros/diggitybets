/**
 * tools/intelligence/spec_generator.mjs — Spec-Driven Development (SDD) Engine
 * =============================================================================
 * Inspired by Zach Lloyd (Warp) and Dru Knox (Tessl).
 * Decomposes user briefs and feature requests into two rigorous specifications
 * BEFORE any code is written:
 *   1. Product Spec: Problem definition, user personas, UX states, acceptance criteria.
 *   2. Tech Spec: Data structures, API contracts, state transitions, test vectors.
 * =============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const SPECS_DIR = path.join(ROOT, 'docs', 'specs');

if (!fs.existsSync(SPECS_DIR)) {
  fs.mkdirSync(SPECS_DIR, { recursive: true });
}

export function generateSoftwareSpec(featureTitle, description, options = {}) {
  const slug = featureTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const timestamp = new Date().toISOString();

  const productSpec = {
    spec_version: "2026.1",
    type: "product_spec",
    slug,
    title: featureTitle,
    created_at: timestamp,
    author_role: "Squad 0 — Product Spec Agent",
    problem_statement: description,
    target_users: options.target_users || ["Streamer (@diggitybets)", "Kick Viewers (+18)", "Moderators"],
    user_experience: {
      primary_flow: options.flow || "User triggers action from UI -> System responds with tactile feedback and state updates.",
      error_states: ["Network offline", "Invalid user input", "Rate limit exceeded"],
      visual_theme: "Dark luxury glassmorphism (#07090e base, #ffd700 gold, #53fc18 neon green)"
    },
    acceptance_criteria: options.criteria || [
      "Zero UI layout thrashing or horizontal overflow across 1440px, 768px, and 390px viewports.",
      "100% compliant with Kick gambling guidelines (+18 disclaimer, zero spectator money custody).",
      "OBS Browser Source CPU consumption remains <= 5%."
    ]
  };

  const techSpec = {
    spec_version: "2026.1",
    type: "tech_spec",
    slug,
    title: `${featureTitle} — Architecture & Technical Spec`,
    created_at: timestamp,
    author_role: "Squad 2 — Technical Architecture Droid",
    architecture_tier: options.tier || "Web Platform + Cloudflare Durable Objects / D1",
    data_contracts: {
      storage_keys: options.storage_keys || [`hunthub_${slug}_state`],
      event_bus: options.event_bus || `hunthub:${slug}-event`,
      api_endpoints: options.endpoints || [`/api/${slug}/state`, `/api/${slug}/action`]
    },
    security_invariants: [
      "Spectator input rendered strictly via textContent or escaped template literals.",
      "Zero eval() or new Function() calls.",
      "All remote network calls protected by AbortSignal.timeout(2500-3500ms)."
    ],
    verification_harness: {
      required_test_suite: `core/test/${slug}.test.ts`,
      ast_symbols_check: true,
      playwright_viewports: [1440, 768, 390]
    }
  };

  const specFilePath = path.join(SPECS_DIR, `${slug}.spec.json`);
  const combinedSpec = { productSpec, techSpec };
  fs.writeFileSync(specFilePath, JSON.stringify(combinedSpec, null, 2), 'utf8');

  console.log(`\n======================================================`);
  console.log(`📐 SPEC-DRIVEN DEVELOPMENT (SDD) GENERATED`);
  console.log(`Feature: ${featureTitle}`);
  console.log(`Artifact: docs/specs/${slug}.spec.json`);
  console.log(`======================================================\n`);

  return combinedSpec;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const title = process.argv[2] || "Interactive High-Roller Plinko Multiplier";
  const desc = process.argv[3] || "Physics-based Plinko peg drop with Provably Fair HMAC-SHA256 calculations and luxury coin sound effects.";
  generateSoftwareSpec(title, desc);
}
