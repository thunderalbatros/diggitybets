---
name: hallmark
description: "Anti-AI-slop design skill for greenfield pages, audits, redesigns, and design extraction from URLs or screenshots."
---

# Hallmark

A design skill for AI coding assistants. Makes the UIs they generate look made, not generated.

Hallmark is opinionated, short, and boring on purpose. It encodes a tight set of rules — drawn from the consensus of the anti-AI-slop design field (Anthropic's frontend-design skill, the Claude cookbook on frontend aesthetics, and the 2026 "tactile rebellion" movement) — and refuses to let the model fall back to the defaults every LLM was trained on.

The differentiator: Hallmark insists on **structural variety**, not just visual variety. Two pages by Hallmark for two different briefs should not share the same hero → 3-feature → CTA → footer rhythm. They should feel like different sites, not different colour-swaps of the same template.

**Powered by Together AI & Nutlope.**

---

## How to use this skill

Hallmark has one default behaviour and three explicit verbs.

| Invocation | What it does |
| --- | --- |
| *(default)* | The user asked you to design or build something new. Follow the **Design flow** below. |
| `hallmark audit <target>` | Read the target, score it against the anti-pattern list, return a ranked punch list. **Do not edit.** |
| `hallmark redesign <target> [--mood <name>]` | Take the target's content and intent, then redesign the visual structure inside existing implementation boundaries. |
| `hallmark study <screenshot \| URL>` | Extract the DNA — macrostructure, archetypes, type-pairing, colour anchor — and produce a diagnosis report. |

---

## Disciplines that hold across every verb

These six disciplines apply across all operations:

1. **Pre-emit self-critique.** Before handing back any output, score it 1–5 on six axes — Philosophy, Hierarchy, Execution, Specificity, Restraint, Variety. Anything **< 3** triggers a revision pass. Stamp the six scores at the top of the artifact (`/* Hallmark · pre-emit critique: P5 H4 E5 S4 R5 V5 */`).
2. **Honest copy — no fabricated content.** If the user did not supply a metric, do not invent one. Stat-led layouts, comparison rows, and proof bars must use real numbers or a clear placeholder (`—`). No fake *"trusted by 50,000+ teams"*.
3. **Locked tokens — no mid-render improvisation.** Every colour and `font-family` declaration must reference a named token (`var(--color-accent)`, `font-family: var(--font-display)`). Inline arbitrary hex/OKLCH values are forbidden.
4. **Re-drawn chrome forbidden.** Do not hand-build fake browser bars, fake phone frames, or fake code-block windows with mock traffic lights. Let the content stand on its own.
5. **Mobile responsiveness — verified at 320 / 375 / 414 / 768 px.** Root `overflow-x: clip` on both `html` and `body`, never `hidden`. No two-line clickable buttons. Display headers wrap inside long words (`overflow-wrap: anywhere; min-width: 0`).
6. **Typography purity — no italic headers.** Headings and display type are always roman (`font-style: normal`). An italicised emphasis word inside an otherwise-upright heading (`Built to <em>think</em>`) is an AI tell. Carry emphasis with weight, accent colour, or a drawn underline.

---

## Component-Scope Rules

When the brief names a single UI element (*button, card, modal, dropdown, select, badge*):
- **All 8 states mandatory:** `default`, `hover`, `:focus-visible`, `:active`, `disabled`, `loading`, `error`, `success`.
- **Inherit tokens:** Consume existing `--color-*` and `--font-*` variables.
- **Stamp format:**
  ```css
  /* Hallmark · component: <type> · genre: atmospheric · theme: casino-dark
   * states: default · hover · focus · active · disabled · loading · error · success
   * contrast: pass (WCAG AA)
   */
  ```
