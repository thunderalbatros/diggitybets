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
        ┌───────────────────┬─────────┴─────────┬───────────────────┐
        ▼                   ▼                   ▼                   ▼
 [ Principal UX ]   [ Senior Frontend ]   [ Security Lead ]   [ QA Auditor ]
        │                                                           ▲
        └───────────────────────────┬───────────────────────────────┘
                                    ▼
                      [ Tech Scout & R&D Lead ]
```

### Roles and Assigned Skills:

| Role | Slug | Mission | Assigned Skills |
| :--- | :--- | :--- | :--- |
| **CEO / Principal** | `tomas` | Define objetivos estratégicos, aprueba entregables en Gates y autoriza despliegues. | N/A (Human in the loop) |
| **Orchestrator** | `orchestrator` | Genera especificaciones formales (`spec_generator.mjs`), descompone tareas atómicas y coordina heartbeats. | `subagent-driven-development`, `paperclip-converting-plans-to-tasks`, `verify-before-claim`, `code-structure` |
| **UX Designer** | `ux-designer` | Diseña wireframes SVG, arquitectura de layouts, tokens de diseño y componentes 21st-UI. | `wireframe`, `theme-factory`, `design-critique`, `layout-primitives-architect`, `design-system`, `21st-ui` |
| **Senior Frontend** | `senior-coder` | Construye componentes reactivos, micro-interacciones táctiles y animaciones fluidas 60 FPS sin layout thrashing. | `frontend-design`, `motion-engineer`, `animation-performance`, `taste-skill`, `emil-design-eng`, `modern-css` |
| **Security Engineer** | `security-engineer` | Conduce auditorías Cloudflare (6 fases), previene XSS en chats, audita Provably Fair HMAC-SHA256 y firmas de Kick. | `security-audit`, `security-checklist`, `provably-fair-games`, `fair-draws`, `moderation-guard`, `anti-fraud-fingerprinting` |
| **QA Auditor** | `qa-auditor` | Aplica tests adversariales (`break-ui`), auditoría visual Playwright y compuertas deterministas (Eval Matrix). | `break-ui`, `visual-auditor`, `evidence-driven-testing`, `verification-before-completion`, `eval-harness` |
| **Tech Scout & R&D Lead** | `tech-scout` | Rastrea tecnologías web SOTA, investiga paquetes, desempata con `arena`, prueba en Sandcastle e ingesta en RAG. | `research-mode`, `find-skills`, `arena`, `sandboxed-experiments`, `firecrawl`, `kb-writing`, `kb-retrieval` |

---

## 3. Standard Production Protocol for Web Projects

Every client website, landing page, or UI module follows this 7-stage lifecycle:

1. **Stage 1 — Intent & Formal Specification:**  
   The Orchestrator generates the formal `ProductSpec` and `TechSpec` (`tools/intelligence/spec_generator.mjs`) applying `paperclip-converting-plans-to-tasks` to lock atomic dependencies.
2. **Stage 2 — Tech Scouting & Prototyping (If Needed):**  
   If new libraries, shaders or APIs are required, `tech-scout` tests them in an isolated Git Worktree (`sandcastle-runner.mjs`), runs benchmarks with `arena`, and verifies suitability.
3. **Stage 3 — Wireframe & Design Tokens:**  
   The UX Designer generates monochrome SVG wireframes (`wireframe`) to lock hierarchy and derives design tokens using `theme-factory` and `21st-ui`.
4. **Stage 4 — Component Engineering:**  
   The Senior Frontend builds responsive, tactile components enforcing `animation-performance` (composite-only properties, zero layout thrashing).
5. **Stage 5 — Security & Compliance Audit:**  
   The Security Engineer audits input sanitization (XSS defense in chat, `textContent` enforcement), HMAC webhooks signatures, and Provably Fair fairness (`security-audit`).
6. **Stage 6 — Adversarial QA & Visual Verification:**  
   The QA Auditor executes `break-ui` (feeding extreme names, long emails, zero states) and Playwright visual auditing across viewports (1440px, 768px, 390px).
7. **Stage 7 — CEO Gate Sign-off:**  
   A clean interactive preview with evidence is presented to Tomás for final authorization and deployment.
