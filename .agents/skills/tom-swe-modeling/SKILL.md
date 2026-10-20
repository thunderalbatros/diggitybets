---
name: tom-swe-modeling
description: "Theory of Mind (ToM-SWE, ICLR 2026) 3-Tier User & Architectural Mental Modeling and Sleeptime Compute consultation. Use before starting ambiguous or multi-file tasks to align with the CTO's explicit and implicit preferences, hardware constraints, and stream invariants."
license: MIT
---

# ToM-SWE — 3-Tier User & Architectural Mental Modeling Skill

Based on *TOM-SWE: User Mental Modeling For Software Engineering Agents* (Zhou et al., CMU & All-Hands-AI, ICLR 2026 — `references/software-factory-50/ToM-SWE`).

Bridges the gap between closed benchmarks (`73%` SWE-bench Verified) and open-ended real-world engineering by maintaining a persistent **3-Tier Hierarchical Memory** in `memory/tom_swe_model.json`:

1. **Tier 1 (`tier1_cleaned_signals`)**: Atomic, high-confidence (`0.95–1.0`) technical and product invariants verified in production (e.g., zero demo users in live queues, synchronized 1920x1080 overlay + Kick Chat Bot winner announcements).
2. **Tier 2 (`tier2_session_analyses`)**: Structured per-session analyses tracking intent (`debugging`, `code_generation`, `optimization`, `learning`), emotional/urgency cues, and newly extracted preferences.
3. **Tier 3 (`tier3_overall_user_model`)**: Aggregated CTO profile (`interactional_preferences` and `coding_and_architectural_preferences` tagged with `[IMPORTANT]`).

## How to Use

### 1. Pre-Task Consultation (`consultTomSwe`)
Run the ToM-SWE engine to verify instruction clarity (`ClarityAssessment`) and retrieve matching Tier 1–3 signals via BM25 memory ranking:

```bash
node tools/intelligence/tom_swe_engine.mjs
```

Or import programmatically in any intelligence script:
```javascript
import { consultTomSwe, runSleeptimeCompute } from '../../tools/intelligence/tom_swe_engine.mjs';
const guidance = consultTomSwe(userPrompt);
```

### 2. Sleeptime Compute Consolidation (`runSleeptimeCompute`)
After completing a milestone or discovering a new architectural preference from the CTO, consolidate it into `memory/tom_swe_model.json` via `runSleeptimeCompute({ rule, confidence, enforced_by })` so all 10 Squads inherit the updated mental model automatically.
