# 🎓 Master Course: End-to-End LLM Post-Training — From BigQuery to Autonomous 24/7 Production

**Alcance:** Videocurso técnico sobre pipelines de post-entrenamiento y mejora continua de agentes en producción. (Fuente migrada y curada desde Centinela Studio Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

## Video Course Transcript & Practical Implementation Manual (2026 Edition)

**Instructor:** Dr. Aris Thorne (Principal AI Systems Architect, ex-DeepMind / GCP Advanced Programs)  
**Total Duration:** 6 Hours 45 Minutes (Full 8 Modules with Code Labs)  
**Target Architecture:** Multi-Agent Livestream Apprenticeship Systems (Centinela Studio)  

---

### MODULE 1: THE FOUNDATIONS OF BEHAVIORAL CLONING FOR CONVERSATIONAL AGENTS (45 Min)
- **1.1 The Pitfalls of Zero-Shot LLM Personas:** Why system prompts like "You are a friendly casino streamer viewer" fail instantly. Over-politeness, full punctuation, and excessive sentence length.
- **1.2 Apprenticeship Learning vs. Reinforcement Learning:** Why online RL with reward models is too dangerous for production accounts (risk of account bans). Why offline behavioral cloning from an expert human operator is the safest, most effective bootstrap strategy.
- **1.3 Capturing Multimodal State-Action Pairs:** The mathematical formulation of demonstration logging: visual screen state, acoustic stream transcription, chat history, human output, and downstream community reactions.

---

### MODULE 2: DATA INGESTION AND ARCHITECTURE IN GOOGLE BIGQUERY (55 Min)
- **2.1 Setting Up the BigQuery Analytics Warehouse:** Creating datasets, partition strategies by day, and clustered columns by channel slug.
- **2.2 Schema Design for Multimodal Chat Contexts:** Handling nested arrays of messages (`ARRAY<STRUCT>`) without table denormalization or costly joins.
- **2.3 CLI Automation with `bq load`:** Writing automated scripts that ingest NDJSON logs directly from local harvesting nodes or cloud buckets in seconds.
- **2.4 Cost Optimization & Free Tier Limits:** Leveraging Google Cloud credits and BigQuery's 10 GB storage / 1 TB query monthly free allocation for zero operational expenses.

---

### MODULE 3: SQL DATA MINING — EXTRACTING THE OPERATOR'S CONVERSATIONAL DNA (50 Min)
- **3.1 Distributional Profiling:** Measuring word counts, character lengths, and typing latencies across channels.
- **3.2 Slang and Emote Frequency Analysis:** Using `UNNEST(SPLIT(humanMessage, ' '))` to build channel-specific lexicons and identify community-exclusive emotes.
- **3.3 Correlating Visual Triggers with User Actions:** SQL queries that map slot calls and giveaway entries to specific visual interface states (e.g., Pragmatic Play lobbies or wheel overlays).

---

### MODULE 4: DATASET CURATION & QUALITY GATING (40 Min)
- **4.1 The Garbage-In, Garbage-Out Principle:** Filtering noisy demonstrations, network timeouts, and single-character accidental keystrokes.
- **4.2 The 80/20 Train-Test Quarantine:** Splitting harvested demonstrations into training pools and strictly isolated holdout test sets to guarantee honest evaluation.
- **4.3 Exporting Formats:** Generating clean JSONL files ready for in-context few-shot retrieval and PEFT/LoRA fine-tuning.

---

### MODULE 5: IN-CONTEXT LEARNING OPTIMIZATION WITH DSPy & MIPROv2 (50 Min)
- **5.1 Beyond Manual Prompt Engineering:** Treating instructions and few-shot examples as optimizable hyperparameters.
- **5.2 Maximal Marginal Relevance (MMR) Retrieval:** Balancing semantic similarity to the current conversation context with diversity among retrieved examples.
- **5.3 Running the DSPy Compiler:** Automated prompt tuning that maximizes brevity and casino-slang authenticity while suppressing robotic filler words.

---

### MODULE 6: THE BLIND HUMANITY JUDGE (FAIREVAL PROTOCOL) (45 Min)
- **6.1 Principles of Fair Pairwise Evaluation:** Why single-turn LLM scoring is biased and unreliable.
- **6.2 Neutralizing Position Bias:** Presenting candidates in both $(A, B)$ and $(B, A)$ permutations; enforcing strict tie/abstention rules for inconsistent verdicts.
- **6.3 Calibrating the Judge's Rubric:** Explicitly rewarding lowercase simplicity and punishing grammatical perfection and multi-sentence paragraphs.
- **6.4 Meeting the 70% Indistinguishability Standard:** Analyzing benchmark scorecards before certifying an agent for live testing.

---

### MODULE 7: LATENCY BENCHMARKING & REAL-TIME CIRCUIT BREAKING (35 Min)
- **7.1 The Human Reaction Time Curve:** Why instantaneous (<100 ms) responses scream "bot" and delayed (>4,000 ms) responses miss giveaways.
- **7.2 Implementing Log-Normal Human Delays:** Injecting realistic jitter (800 ms to 2,500 ms) based on message length and perceptual complexity.
- **7.3 Zero Regression Quality Gates:** Measuring sensory processing pipelines with `npm run bench` under DEC-024 (rejecting optimizations with >20% latency regression).

---

### MODULE 8: GRADUATED DEPLOYMENT & 24/7 AUTONOMOUS OPERATIONS (45 Min)
- **8.1 Human-in-the-Loop Review Phase:** Routing candidate responses to Telegram with inline approval/rejection buttons.
- **8.2 Unary KTO Feedback Loops:** Converting human approvals and rejections into preference signals that dynamically tune operational instincts.
- **8.3 Transitioning to Autonomous Production:** Unlocking 24/7 execution with Healthchecks.io dead man's switch monitoring, automatic quota guards, and graceful failover.
