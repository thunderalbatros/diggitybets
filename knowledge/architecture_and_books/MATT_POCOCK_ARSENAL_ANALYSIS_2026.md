# Matt Pocock: Engineering Arsenal, Repositories & Agent Methodologies (2026)

> **Subject:** In-depth architectural analysis of Matt Pocock's open-source repositories, AI engineering tools, and developer philosophies.  
> **Profile Reference:** [https://github.com/mattpocock?tab=repositories](https://github.com/mattpocock?tab=repositories)  
> **Key Projects:** Sandcastle (`@ai-hero/sandcastle`), Skills (`mattpocock/skills`), `ts-reset`, Total TypeScript, and AI Hero.  
> **Date:** October 2026  
> **Status:** Canonical Knowledge Asset for HuntHub / DiggityBets.

---

## 1. Developer Profile & Background

Matt Pocock is an internationally recognized software educator, developer advocate, and systems architect. Formerly a core team member at **Stately** (creators of XState) and **Vercel**, he is best known as the creator of **Total TypeScript** (the leading comprehensive TypeScript training curriculum) and **AI Hero** (specialized education and tooling for autonomous AI software engineering).

His work centers on two complementary domains:
1. **Ultra-Strict, Production-Grade TypeScript:** Eliminating runtime type leaks, perfecting type narrowing, and crafting ergonomic library APIs.
2. **Autonomous AI Coding Agents & Harnesses:** Building reproducible environments, sandboxed execution runtimes, and spec-driven prompts so AI agents behave like disciplined senior engineers rather than erratic code generators.

---

## 2. Deep Dive: Key Repositories & Tooling

```
┌────────────────────────────────────────────────────────────────────────┐
│                        MATT POCOCK OPEN-SOURCE ARSENAL                 │
├────────────────────────┬───────────────────────┬───────────────────────┤
│ 1. SANDCASTLE          │ 2. SKILLS REPO        │ 3. TS-RESET           │
│ (`@ai-hero/sandcastle`)│ (`mattpocock/skills`) │ (`mattpocock/ts-reset`)│
│ • Sandboxed agent runner• Spec-driven workflows │ • Fixes native TS types│
│ • Parallel ticket exec │ • /grill-with-docs    │ • fetch.json() unknown│
│ • Docker/Worktrees/VMs │ • /to-spec, /tdd      │ • Zero runtime cost   │
├────────────────────────┴───────────────────────┴───────────────────────┤
│ 4. TOTAL TYPESCRIPT ECOSYSTEM          5. UTILITY & CI TOOLS           │
│ • total-typescript-monorepo-template   • pkg-size-action               │
│ • advanced-typescript-workshop         • typed-cmd                     │
│ • Zod-to-JSON-Schema / Type Challenges • AI Hero Workshop Repos        │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Sandcastle (`mattpocock/sandcastle` / `@ai-hero/sandcastle`)
- **Core Mission:** Orchestrating autonomous (AFK — *Away From Keyboard*) AI coding agents inside isolated environments without risking production code or dirtying the developer's working directory.
- **Architecture & Workflow:**
  1. **Provider Abstraction:** Supports multiple sandbox backends: Docker containers, Podman, Vercel microVMs, and ephemeral Git worktrees.
  2. **Job Orchestration:** Automatically reads a queue of issues/tickets, initializes a dedicated sandbox environment for each ticket, clones/worktrees the repository, and feeds context to an agent (e.g., Claude Code, Codex).
  3. **Verification Loop:** The agent writes code and runs tests inside the isolated sandbox.
  4. **Merge-Back Strategy:** If tests pass cleanly, Sandcastle generates a clean commit, pushes a branch, and opens or merges a Pull Request. If tests fail, the sandbox is torn down with zero residual side-effects on the host.
- **Key API Primitives:**
  ```typescript
  import { createSandcastle } from '@ai-hero/sandcastle';

  const sandcastle = await createSandcastle({
    provider: 'worktree', // or 'docker'
    repo: '.',
    branch: 'feat/automated-task'
  });

  const result = await sandcastle.run({
    agent: 'claude-code',
    prompt: 'Implement feature X and pass npm test',
    evaluator: 'npm test'
  });

  if (result.success) {
    await sandcastle.mergeBack();
  } else {
    await sandcastle.destroy();
  }
  ```

### 2.2 Skills (`mattpocock/skills`)
- **Core Mission:** A public, portable repository of agent skills and slash commands exported directly from Matt Pocock's daily engineering workflow for tools like Claude Code and Cursor.
- **Key Workflows & Slash Commands:**
  1. `/grill-with-docs`: Forces the agent to act as an exacting interviewer. Before writing a single line of code, the agent quizzes the developer and inspects primary documentation to resolve all architectural ambiguities, edge cases, and constraints.
  2. `/to-spec`: Transforms high-level user ideas into rigorous, unambiguous functional specifications and architecture decision records (ADRs).
  3. `/to-tickets`: Breaks a large specification into atomic, dependency-ordered tickets (each scoped to a single logical change).
  4. `/implement`: Instructs the agent to pick up a ticket, apply Test-Driven Development (TDD), and write minimal implementation code.
  5. `/tdd`: Enforces Red-Green-Refactor discipline: the agent must author a failing test first, verify failure, implement minimal code to turn the test green, and refactor.
  6. `/code-review`: Comprehensive code review persona focusing on correctness, edge cases, type safety, and maintainability.

### 2.3 TS-Reset (`mattpocock/ts-reset`)
- **Core Mission:** A "CSS Reset for TypeScript" that fixes the frustrating default types in native JavaScript and DOM APIs without adding any runtime overhead.
- **Crucial Rule-Breaking Fixes:**
  - `fetch().then(r => r.json())`: Returns `unknown` instead of `any`, forcing developers to parse with Zod or validate types before usage.
  - `JSON.parse()`: Returns `unknown` instead of `any`.
  - `Array.includes()`: Allows checking if a value is present in an array even if the value type is a broader union than the array element type.
  - `Array.filter(Boolean)`: Correctly narrows `(T | undefined | null)[]` to `T[]` automatically.
- **Zero Runtime Overhead:** Implemented 100% via ambient `.d.ts` declaration merging.

### 2.4 Total TypeScript Monorepo & Performance Templates
- Best practices for structuring high-performance TypeScript workspaces:
  - Project references (`tsconfig.json` with `"composite": true`).
  - Strict type checking (`"strict": true`, `"noUncheckedIndexedAccess": true`).
  - Module resolution using modern NodeNext or Bundler semantics.
  - Rapid testing with Vitest and minimal bundling friction.

---

## 3. Matt Pocock's Methodological Pillars for AI Agents

1. **Spec-First Engineering:** Agents should never jump directly from a user prompt to editing production code. They must first generate or verify a specification.
2. **The "Grill Me" Principle:** Ambiguity is the root cause of hallucination. When an agent is unsure about a design decision, it must proactively ask questions or cross-reference primary documentation.
3. **Sandbox Discipline:** Code execution must occur in throwaway environments (containers or worktrees). Production working trees must never be contaminated with failed experimental spikes.
4. **Strong Typing as Agent Guardrails:** When APIs and schemas have exact TypeScript types and Zod schemas, LLM tool-calling errors drop drastically because type checkers catch errors before runtime.

---

## 4. Integration into HuntHub / DiggityBets

- **Skill Deployment:** HuntHub incorporates Matt Pocock's patterns into:
  - [`.agents/skills/sandboxed-experiments/SKILL.md`](file:///c:/Users/tomas/Desktop/streamerbot/.agents/skills/sandboxed-experiments/SKILL.md) (Sandcastle worktree isolation).
  - [`.agents/skills/grill-me/SKILL.md`](file:///c:/Users/tomas/Desktop/streamerbot/.agents/skills/grill-me/SKILL.md) (Interactive alignment interview).
  - [`.agents/skills/test-driven-development/SKILL.md`](file:///c:/Users/tomas/Desktop/streamerbot/.agents/skills/test-driven-development/SKILL.md) (Red-Green-Refactor).
  - [`tools/sandbox.mjs`](file:///c:/Users/tomas/Desktop/streamerbot/tools/sandbox.mjs) (Local CLI for worktree creation and teardown).
