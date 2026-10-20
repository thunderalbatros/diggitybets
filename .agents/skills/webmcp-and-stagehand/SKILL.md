---
name: webmcp-and-stagehand
description: "Hybrid deterministic Playwright + Stagehand v1.5 primitives (act, extract, observe), self-healing DOM selector caching."
---

# WebMCP & Stagehand Hybrid Browser Automation Skill

Combines deterministic Playwright scripts with **Stagehand v1.5** (`references/software-factory-50/stagehand`) self-healing selector caches and **WebMCP** (`references/software-factory-50/browserbase-skills/skills/webmcp-gen`) page-resident tool manifests.

## 1. Stagehand v1.5 Self-Healing Primitives (`act`, `extract`, `observe`)

Instead of brittle single CSS selectors that break when a class is renamed, register every critical UI target in `memory/selector_cache.json` with:
- `operation`: `"observe"` | `"extract"` | `"act"`
- `primary_selector`: Primary fast CSS/ID selector (e.g., `#celebration-stage`)
- `fallback_selectors`: Ordered list of semantic/ARIA/structural fallbacks (e.g., `[".billboard-card", "#winner-name"]`)

When `node tools/audit/diff_ui_adversarial.mjs` runs, it verifies all registered targets across `index.html` and the OBS overlays, reporting `[primary]` or `[self-healed via fallback (...)]`.

## 2. WebMCP Tool Manifests (`webmcp-gen`)

When exposing live browser state to an agent (such as inspecting active Bonus Hunt multipliers or overlay queue state inside Chromium):
- Define a declarative `manifest.json` using browser-native APIs (`document`, `location`, same-origin `fetch`).
- Never embed secrets, tokens, or `eval()` inside WebMCP implementations.
- Reference implementation & compiler scripts: `references/software-factory-50/browserbase-skills/skills/webmcp-gen/scripts/`.
