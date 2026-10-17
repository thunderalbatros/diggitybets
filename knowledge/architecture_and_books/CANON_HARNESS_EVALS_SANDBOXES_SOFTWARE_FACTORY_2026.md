# Canon 2026: Harness Engineering, Evals, Sandboxes & Autonomous Software Factories

> **Scope:** Canonical engineering specification synthesizing Harness Engineering, AI Evaluation Frameworks, Sandboxing Runtimes, and Open-Source Software Factory Architecture.  
> **Primary Sources:** WalkingLabs (*Learn Harness Engineering*), DeepLearning.AI (*Building Agentic Workflows with LangGraph*, *Automated Testing for LLMs*), Supabase (*Local Docker & Deterministic Migrations*), E2B (*Building Coding Agents with Tool Execution*), Anthropic (*Model Context Protocol*), Confident AI (*DeepEval*), Exploding Gradients (*Ragas*), and Langfuse.  
> **Date:** October 2026  
> **Status:** Canonical — Ground Truth for all HuntHub / DiggityBets Agents.

---

## 1. Harness Engineering: The Core Discipline

### 1.1 The Fundamental Axiom
> *"The model is smart. The harness makes it reliable."* — WalkingLabs (2026)

Unharnessed LLM agents suffer from systematic operational failure modes when executing real-world software engineering tasks:
1. **Derailment & Scope Creep:** Modifying files outside the task scope, introducing gratuitous refactors, or deleting working logic.
2. **False Completion Rationalization:** Declaring a task "Done" based on superficial visual code inspection without executing tests or verifying build outputs.
3. **Context Collapse:** Losing operational discipline when conversations grow large and context window compaction occurs.
4. **Silent Error Swallowing:** Catching exceptions and suppressing errors without propagating failure modes.

A **Harness** is the surrounding software infrastructure, constraints, state tracking, and feedback loops that govern agent execution. It constrains the model's action space, verifies every step against deterministic gates, and provides continuous ground truth.

### 1.2 The Five Subsystems of a Production Harness
According to the WalkingLabs curriculum, every production-grade agent harness consists of five distinct subsystems:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        AGENT HARNESS ARCHITECTURE                      │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ 1. INSTRUCTIONS   │ 2. STATE ENGINE   │ 3. VERIFICATION GATES          │
│ • Progressive     │ • Disk-persisted  │ • Pre-flight checks            │
│   disclosure      │   ledger          │ • Automated test suites        │
│ • Task-scoped     │ • Session recovery│ • Jueces ciegos (Blind judges) │
│   skills          │ • Audit history   │ • Zero-assertion claims        │
├───────────────────┴───────────────────┴────────────────────────────────┤
│ 4. SCOPE CONTROLLER                    5. LIFECYCLE & REASONING LOOPS  │
│ • Atomic diffs (<= 300 lines)          • Goal loops & liveness timers  │
│ • Worktree isolation                   • Maker-Checker dual agent pairs│
│ • Read-only protected files            • Human-in-the-loop gates       │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Instructions (Progressive Disclosure):** Instead of dumping megabytes of documentation into the agent's context window, instructions are split into global invariants (`AGENTS.md`), project status (`STATUS.md`), and modular skills (`SKILL.md`) loaded strictly on-demand.
2. **State Engine (Disk-Persisted Memory):** Memory must survive session termination and context compaction. Stored in structured files (`temporal_ledger.json`, `progress.md`), recording past bug fixes, architectural rules, and temporal validity graphs.
3. **Verification Gates (Deterministic Evidence):** A task is never complete until the harness executes CLI tests and captures raw terminal output (`verify-before-claim`). Assertions must precede claims.
4. **Scope Controller (Diff Discipline):** Restricts changes to atomic chunks (≤ 300 lines per step). Enforces immutable core configuration via file-protection hooks.
5. **Lifecycle Loops (Closed-Loop Execution):** Integrates automated control systems: Maker-Checker pairs (one agent writes, another audits), retry backoff strategies, and timeout fallbacks.

---

## 2. Evals: Testing Probabilistic & Agentic Systems

### 2.1 The Paradigm Shift: Deterministic vs. Probabilistic Testing
Traditional unit tests rely on exact equality assertions (`assert result === expected`). Because LLMs produce semantic distributions with non-zero temperature, evaluation requires a dual-tier approach:

| Tier | Evaluation Type | Tools / Methods | Target Metric |
| :--- | :--- | :--- | :--- |
| **Tier 1** | **Deterministic / Rules-Based** | AST matching (`ast-grep`), TypeScript compiler (`tsc`), regex bounds, schema validation (Zod), exit codes (`0`). | Binary pass/fail, zero syntax regressions, type safety. |
| **Tier 2** | **Semantic / Model-Graded** | LLM-as-a-Judge (G-Eval), DeepEval, Ragas, Promptfoo. | Faithfulness, context precision, hallucination index, tone adherence. |

### 2.2 The RAG Triad & Evaluation Metrics (DeepEval & Ragas)
When agents query internal documentation, vector databases (Qdrant), or codebase knowledge bases, three foundational metrics must be verified:

1. **Context Relevance:** Evaluates whether retrieved chunks are relevant to the query without injecting irrelevant noise.
   $$\text{Context Relevance} = \frac{|\text{Relevant Chunks Retrieved}|}{|\text{Total Chunks Retrieved}|}$$
2. **Faithfulness (Groundedness):** Measures whether the agent's output is strictly substantiated by the retrieved context, penalizing hallucinations.
   $$\text{Faithfulness} = \frac{|\text{Verifiable Claims in Response}|}{|\text{Total Claims in Response}|}$$
3. **Answer Relevancy:** Measures whether the response directly addresses the user's intent without rambling or omitting key requirements.

### 2.3 Evaluation Gates in Continuous Integration (CI/CD)
Inspired by the DeepLearning.AI *Automated Testing for LLMOps* course (CircleCI / Rob Zuber):
- **Pre-Merge Evaluation Suites:** Every prompt change, skill update, or agent logic modification must pass automated evaluation gates in CI.
- **Test-Driven Prompt Engineering (TDPE):** Write evaluation test cases (evals) *before* drafting or modifying prompts or skills.
- **Pass@k and Pass^k Reliability Tracking:** Measuring the probability that an agent generates at least one correct solution in $k$ attempts ($\text{Pass@}k$) vs. producing correct solutions consistently across $k$ consecutive runs ($\text{Pass}^k$).

---

## 3. Sandboxing & Safe Execution Environments

### 3.1 The Sandbox Spectrum: MicroVMs vs. Containers vs. Worktrees
Executing code generated by autonomous agents presents security, resource, and isolation challenges. The modern factory chooses among three isolation tiers based on environment constraints:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SANDBOX ISOLATION TIERS                         │
├──────────────────────┬──────────────────────┬──────────────────────────┤
│ TIER A: MICROVMS     │ TIER B: CONTAINERS   │ TIER C: GIT WORKTREES    │
│ (E2B / Firecracker)  │ (Docker / Supabase)  │ (Sandcastle / Pocock)    │
├──────────────────────┼──────────────────────┼──────────────────────────┤
│ • Hardware virtualization • Full OS filesystem  │ • Zero daemon overhead   │
│ • Sub-100ms spin-up  │ • Native network     │ • 0 MB background RAM    │
│ • Complete kernel    │ • Repeatable resets  │ • Native filesystem speed│
│   isolation          │   (`supabase db`)    │ • Instant git merge/drop │
│ • Cloud-native       │ • Requires local     │ • Perfect for low-spec   │
│                      │   Docker daemon      │   hardware ($0 budget)   │
└──────────────────────┴──────────────────────┴──────────────────────────┘
```

### 3.2 Deterministic Database Sandboxes (Supabase CLI Pattern)
As taught in Supabase's *Local Docker & Deterministic Migrations*:
- **Schema as Code:** Database state must never be modified manually via web consoles. Every schema alteration, table creation, Row-Level Security (RLS) policy, and trigger is versioned as sequential SQL migration scripts (`supabase/migrations/TIMESTAMP_name.sql`).
- **Repeatable Resets:** The `supabase db reset` command drops the local instance and replays migrations from `000000` to `HEAD`, followed by `seed.sql`. This ensures agents test against an identical, pristine state on every run.
- **Deterministic Drift Detection:** Running `supabase db diff` compares the active development database against the migration files to catch undocumented changes before committing.

### 3.3 Zero-Footprint Worktree Sandboxing (Matt Pocock Sandcastle Pattern)
For resource-constrained developer hardware (such as laptops with limited CPU/RAM without heavy Docker daemons):
- **Ephemeral Git Worktrees:** Created in milliseconds via `git worktree add -b sandbox-NAME .sandboxes/NAME`.
- **Zero Daemon Footprint:** Requires 0 background services, 0 RAM overhead, and 0 external virtualization layers.
- **Atomic Merge-Back:** If the agent's changes pass the Judge Harness (`npm test`), the branch is fast-forward merged into `main`. If tests fail or the agent hallucinates, the worktree is destroyed (`git worktree remove --force`) with zero residue in the working tree.

---

## 4. The 2026 Open-Source Software Factory Stack

To build a fully autonomous, production-grade software factory, the following five open-source layers represent the industry standard:

### Layer 1: Orchestration & Graphs — LangGraph / Temporal Core
- **LangGraph (LangChain / Harrison Chase):** State machines modeled as directed cyclical graphs (DAGs with cycles).
  - *State Channels:* Strongly typed state passed between nodes.
  - *Checkpointing & Persistence:* Thread-level persistence enabling "time-travel" (resuming or rewinding agent execution states).
  - *Human-in-the-Loop:* Native `.interrupt()` primitives pausing execution for human approval at sensitive gates.
- **Temporal Core:** Distributed, durable execution engine ensuring workflows run to completion despite process crashes, network partitions, or server restarts.

### Layer 2: Isolation & Sandboxing — Docker / E2B (Open-Source SDK)
- **E2B (e2b-dev/E2B):** Secure cloud sandboxes powered by Firecracker microVMs. Provides an open-source SDK for executing Python, JavaScript, and shell commands in isolated sandboxes with filesystem streaming and port forwarding.
- **Docker Engine / Compose:** Local container orchestration for headless database services and multi-container integration testing.

### Layer 3: Tooling Protocol — Model Context Protocol (MCP)
- **Anthropic Model Context Protocol (MCP):** An open, standardized JSON-RPC 2.0 protocol establishing interoperability between AI models, development tools, and data sources.
  - *Resources:* Read-only data endpoints (files, database schemas, API specs).
  - *Tools:* Executable functions with JSON Schema parameter definitions.
  - *Prompts:* Reusable prompt templates with parameter substitution.
  - Standardizes agent connections across IDEs, CLI tools, and background subagents.

### Layer 4: Code & AI Evaluation — DeepEval / Ragas
- **DeepEval (Confident AI):** Production unit-testing framework for LLMs. Offers 14+ out-of-the-box metrics (G-Eval, Hallucination, Faithfulness, Tool Correctness, Bias, Toxicity) integrated into Pytest and CI/CD pipelines.
- **Ragas (Exploding Gradients):** Specialized evaluation framework for Retrieval Augmented Generation (RAG) pipelines, measuring context precision, recall, answer semantic similarity, and faithfulness without requiring ground-truth human annotations.

### Layer 5: Trace Observability — Langfuse / OpenLLMetry
- **Langfuse:** Open-source LLM observability platform. Captures full execution trees (spans, generations, tool calls), token counts, cost accounting, and latency percentiles. Enables debugging agent trajectories and collecting user feedback.
- **OpenLLMetry (Traceloop):** OpenTelemetry-native instrumentation libraries for LLM applications. Automatically traces calls to OpenAI, Anthropic, Gemini, Vector DBs, and agent frameworks using standard OpenTelemetry spans.

---

## 5. Architectural Implementation in HuntHub / DiggityBets

The HuntHub project integrates these principles under strict hardware and budget constraints (HP 250 G8 notebook, Windows, 0 USD budget, zero credit card requirement):

```
┌────────────────────────────────────────────────────────────────────────┐
│               HUNTHUB AUTONOMOUS FACTORY ARCHITECTURE                  │
├────────────────────────────────────────────────────────────────────────┤
│ 1. REPO-MAP & AST PARSER                                               │
│    • ast-grep + Tree-sitter + MiniSearch in rag_pipeline.mjs           │
│    • Instant retrieval of symbols, classes, and CSS design tokens      │
├────────────────────────────────────────────────────────────────────────┤
│ 2. PROCEDURAL MEMORY & TEMPORAL VALIDITY LEDGER                        │
│    • .agents/memory/temporal_ledger.json (Graphiti / LangMem)          │
│    • Active architectural invariants + explicit invalidation           │
├────────────────────────────────────────────────────────────────────────┤
│ 3. ZERO-FOOTPRINT SANDBOXING (SANDCASTLE PATTERN)                      │
│    • tools/sandbox.mjs + git worktrees for risky spikes & refactors    │
│    • 0 MB background RAM, zero local Docker daemon requirement         │
├────────────────────────────────────────────────────────────────────────┤
│ 4. DETERMINISTIC JUDGE HARNESS                                         │
│    • node tools/intelligence/instincts_engine.mjs --judge              │
│    • 12 test suites, config guardrails, console-leak auditor           │
├────────────────────────────────────────────────────────────────────────┤
│ 5. MODEL CONTEXT PROTOCOL (MCP) INTERFACE                              │
│    • Native IDE MCPs: gemini-api-docs, chrome-devtools                 │
│    • Standardized tool dispatch with typed parameter validation        │
└────────────────────────────────────────────────────────────────────────┘
```
