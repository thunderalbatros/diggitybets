# HuntHub Web Studio — Virtual AI Agency Blueprint

> **Model:** Paperclip AI Virtual Organization Architecture  
> **Status:** Active Operational Model  
> **Host Environment:** Windows / Antigravity IDE (Zero Background Server Overhead)

---

## 1. Executive Summary & Philosophy
"HuntHub Web Studio" is a specialized virtual web agency operating inside our workspace. Instead of treating the AI assistant as a single monolithic chat window, work is decomposed and executed through specialized agent roles with isolated scopes, explicit handoffs, and verification gates.

## 2. Org Chart & Responsibilities

```
                      [ Tomás — CEO & Client Principal ]
                                      │
                                      ▼
                      [ Orchestrator / Tech Lead ]
                                      │
            ┌─────────────────────────┼─────────────────────────┐
            ▼                         ▼                         ▼
   [ Principal UX Designer ]  [ Senior Frontend Coder ]  [ QA & Resilience Auditor ]
```

### Roles and Assigned Skills:

| Role | Slug | Mission | Assigned Skills |
| :--- | :--- | :--- | :--- |
| **CEO / Principal** | `tomas` | Defines client goals, evaluates previews, approves production deliveries. | N/A (Human in the loop) |
| **Orchestrator** | `orchestrator` | Decomposes briefs into tasks, handles dependencies, and coordinates agents. | `subagent-driven-development`, `paperclip-converting-plans-to-tasks`, `verify-before-claim`, `arena` |
| **UX Designer** | `ux-designer` | Produces layout wireframes (SVG), semantic tokens, color palettes, and typographic scales. | `wireframe`, `theme-factory`, `design-critique`, `layout-primitives-architect`, `design-system` |
| **Senior Frontend** | `senior-coder` | Implements responsive HTML/CSS/JS/React components, micro-interactions, and 60 FPS motion. | `frontend-design`, `motion-engineer`, `animation-performance`, `taste-skill`, `emil-design-eng` |
| **QA Auditor** | `qa-auditor` | Stresses UI with hostile/extreme data, validates security, XSS defenses, and WCAG AA contrast. | `break-ui`, `security-audit`, `visual-auditor`, `security-checklist` |

---

## 3. Standard Production Protocol for Web Projects

Every client website, landing page, or UI module follows this 5-stage lifecycle:

1. **Stage 1 — Intent & Task Decomposition:**  
   The Orchestrator reads the brief and applies `paperclip-converting-plans-to-tasks` to generate atomic tasks with explicit dependencies.
2. **Stage 2 — Wireframe & Theming:**  
   The UX Designer generates monochrome SVG wireframes (`wireframe`) to lock hierarchy and derives design tokens using `theme-factory`.
3. **Stage 3 — Component Engineering:**  
   The Senior Frontend builds components referencing the 520+ verified templates in `paperclip/ui`, enforcing `animation-performance` (composite-only properties, zero layout thrashing).
4. **Stage 4 — Adversarial Testing:**  
   The QA Auditor executes `break-ui` (feeding extreme names, long emails, zero states) and `security-audit` (XSS sanitization, link rel checks).
5. **Stage 5 — CEO Review & Handover:**  
   A clean interactive preview is presented to Tomás for final sign-off.
