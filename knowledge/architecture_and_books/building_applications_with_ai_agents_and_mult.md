# 📚 Libro Completo: Building Applications with AI Agents and Multiagent Systems


**Alcance:** Libro completo Building Applications with AI Agents & Multi-Agent Systems: diseño de orquestadores, memoria, herramientas y evaluación multi-agente. (Fuente migrada y curada desde Centinela Studio Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

> **Autor:** Packt Publishing  
> **Archivo Fuente:** `Building-Applications-with-AI-Agents-Multiagent-Systems.pdf`  
> **Páginas Originales:** 559  
> **Secciones Extraídas:** 158  
> **Fecha de Ingesta:** 2026-10-06  
> **Tipo:** Texto Completo Estructurado para RAG Jerárquico  

---

## Sección 1: Introducción y Fundamentos

-- 1 of 559 --

Praise for
Building Applications with AI Agents
Finally, a book about really scaling AI into the human workforce.
Michael does a great job leveraging his expertise at scalable
organizations like Uber and Microsoft to teach any technical leader
in a small and medium business how to really create scalable
agentic solutions for their transformation.
—Birju Shah, professor of product management and
AI at Kellogg School of Management, Northwestern
University, former head of Uber AI product team
A sharp, practical guide, Building Applications with AI Agents
equips leaders to move from generative AI hype to real-world
systems. It distills complex concepts into actionable strategies,
bridging vision and execution for organizations seeking
measurable efficiency and competitive edge.
—Amanda Cheng, partner of Founders Bay
As a clinician working at the intersection of medicine and
technology, I found this to be an essential read for anyone
building AI agents—clear, practical, and rich with insight into tools,
orchestration, and design patterns relevant to healthcare use
cases like intake, triage, and workflow integration.
—Carrie Ho, MD, assistant professor,
hematologist/oncologist, UCSF
This is the book I wish every team had before deploying agents, a
clear, rigorous approach to architecture, safety, and measurement
that accelerates delivery and reduces risk.
—Brad Sarsfield, senior director, Microsoft Security AI
Research & Development
The best single-volume introduction to building AI agent systems
—you can read hundreds of papers or this one book.
—Arun Rao, ex-Meta GenAI group, adjunct professor
at UCLA

-- 2 of 559 --

Building Applications with AI
Agents
Designing and Implementing Multiagent Systems
Michael Albada

-- 3 of 559 --

Building Applications with AI Agents
by Michael Albada
Copyright © 2025 Advance AI LLC. All rights reserved.
Published by O’Reilly Media, Inc., 141 Stony Circle, Suite 195, Santa
Rosa, CA 95401.
O’Reilly books may be purchased for educational, business, or sales
promotional use. Online editions are also available for most titles
(https://oreilly.com). For more information, contact our
corporate/institutional sales department: 800-998-9938 or
corporate@oreilly.com.
Acquisitions Editor: Nicole Butterfield
Development Editor: Shira Evans
Production Editor: Ashley Stussy
Copyeditor: nSight, Inc.
Proofreader: Piper Content Partners
Indexer: nSight, Inc.
Cover Designer: Karen Montgomery
Cover Illustrator: José Marzan Jr.
Interior Designer: David Futato
Interior Illustrator: Kate Dullea
September 2025: First Edition

-- 4 of 559 --

Revision History for the First Edition
2025-09-16: First Release
See
https://oreilly.com/catalog/errata.csp?isbn=9781098176501 for
release details.
The O’Reilly logo is a registered trademark of O’Reilly Media, Inc.
Building Applications with AI Agents, the cover image, and related
trade dress are trademarks of O’Reilly Media, Inc.
The views expressed in this work are those of the author and do not
represent the publisher’s views. While the publisher and the author
have used good faith efforts to ensure that the information and
instructions contained in this work are accurate, the publisher and
the author disclaim all responsibility for errors or omissions,
including without limitation responsibility for damages resulting from
the use of or reliance on this work. Use of the information and
instructions contained in this work is at your own risk. If any code
samples or other technology this work contains or describes is
subject to open source licenses or the intellectual property rights of
others, it is your responsibility to ensure that your use thereof
complies with such licenses and/or rights.
978-1-098-17650-1
[LSI]

-- 5 of 559 --

Preface
When I first started connecting language models, tools,
orchestration, and memory together into what we now call an agent,
I was surprised by how capable this design pattern was, and just
how much confusion there was about this topic. During my time
building agents and sharing my findings on incident investigation,
threat hunting, vulnerability detection, and more, I found that this
latest design pattern enabled us to solve whole new classes of
problems, but also came with many practical hurdles to making them
reliable for real-world applications. Engineers, scientists, product
managers, and leadership all wanted to know more. “How do I get
my agent to work?” “I can get my agent to work some of the time,
but how do I get it to work most or all of the time?” “How do I
choose a model for my use case?” “How do I design good tools for
my agent?” “What kind of memory do I need?” “Should I use RAG?”
“Should I build a single-agent or multiagent system?” “What
architecture should I use?” “Do I need to fine-tune?” “How do I
enable agents to learn from experience and improve over time?”
While there are many blog posts and research papers that focus on
specific aspects of the topic of designing agent systems, I realized
there were a lack of accessible, holistic, trustworthy guides for this. I
couldn’t find the book that I wanted to share with my colleagues, so
I set out to write it.
Through in-depth discussions, I’ve helped teams navigate the
complexities of AI agents, considering their unique goals,
constraints, and environments. AI agent systems are intricate,
blending autonomy, decision making, and interaction in ways that
traditional software doesn’t. They’re data-driven, adaptive, and
involve multiple components like perception, reasoning, action, and
learning, all while interfacing with users, tools, and other agents.

---

## Sección 2: Introducción y Fundamentos

-- 6 of 559 --

Complicating matters, the foundation models that power these
agents are probabilistic and stochastic by nature, making evaluation
and testing more challenging.
This book takes a comprehensive approach to building applications
with AI agents. It covers the entire lifecycle, from conceptualization
to deployment and maintenance, illustrated with real-world case
studies, supported by references, and reviewed by practitioners in
the field. Sections on advanced topics—like agent architectures, tool
integration, memory systems, orchestration, multiagent coordination,
measurement, monitoring, security, and ethical considerations—are
further refined by expert input.
Writing this book has been a journey of discovery for me as well.
The initial drafts sparked conversations that challenged my views
and introduced new ideas. I hope this process continues as you read
it, bringing your own insights. Feel free to share any feedback you
might have for this book via Twitter (X), LinkedIn, my personal
website, or any other channels that you can find.

-- 7 of 559 --

What This Book Is About
This book provides a practical framework for building robust
applications using AI agents. It addresses key challenges and offers
solutions to questions such as:
What defines an AI agent, and when should I use one? How
do agents differ from traditional machine learning (ML)
systems?
How do I design agent architectures for specific use cases,
including scenario selection, and core components like tools,
memory, planning, and orchestration?
What are effective strategies for agent planning, reasoning,
execution, tool selection, and topologies like chains, trees,
and graphs?
How can I enable agents to learn from experience through
nonparametric methods, fine-tuning, and transfer learning?
How do I scale from single-agent to multiagent systems,
including coordination patterns like democratic, hierarchical,
or actor-critic approaches?
How do I evaluate and improve agent performance with
metrics, testing, and production monitoring?
What tools and frameworks are best for development,
deployment, and securing agents against risks?
How do I ensure agents are safe, ethical, and scalable, with
considerations for user experience (UX), trust, bias, fairness,
and regulatory compliance?
The content draws from established engineering principles and
emerging practices in AI agents, with case studies (such as customer

-- 8 of 559 --

support, personal assistants, legal, advertising, and code review
agents) and discussions on trade-offs to help you tailor solutions to
your needs.

-- 9 of 559 --

What This Book Is Not
This book isn’t an introduction to AI or ML basics. It assumes
familiarity with concepts like neural networks, natural language
processing, and basic programming in languages like Python. If
you’re new to these, pointers to resources are provided, but the
focus is on applied agent building.
It’s also not a step-by-step tutorial for specific tools, as technologies
evolve rapidly. Instead, it offers guidance on evaluating and selecting
tools, with pseudocode and examples to illustrate concepts. For
hands-on implementation, online tutorials and documentation are
recommended, including frameworks like LangChain and AutoGen.

-- 10 of 559 --

Who This Book Is For
This book is for engineers, developers, and technical leaders aiming
to build AI agent-based applications. It’s geared toward roles like AI
engineers, software developers, ML engineers, data scientists, and
product managers with a technical bent. You might relate to
scenarios like the following:
You’re tasked with building an autonomous system for
decision support, or interactive services.
You have a working agent prototype and you want to harden
it and get it ready for production.
Your team struggles with agent reliability—handling failures,
adapting to dynamic environments, or orchestrating complex
tasks—and you want systematic approaches including
orchestration, memory, and learning from experience.
You’re integrating agents into existing workflows and seek
best practices for scalability, multiagent coordination, UX
design, measurement, validation, monitoring, and security.
You can also benefit if you’re a tool builder identifying gaps in the
agent ecosystem, a researcher exploring applications, or a job
seeker preparing for AI agent roles.
Navigating This Book
The chapters follow the lifecycle of building an AI agent application,
organized into three main sections.
The first three chapters cover core concepts, design principles, and
essential components:

-- 11 of 559 --

---

## Sección 3: Chapter 1 introduces agents, their promise, use cases, how

they compare to traditional ML, and recent advancements.

---

## Sección 4: Chapter 2 provides an overview of designing agent systems,

including scenario selection, core components (model
selection, tools, memory, planning), design trade-offs,
architecture patterns (single-agent, multiagent, modular),
and best practices.

---

## Sección 5: Chapter 3 focuses on UX design, covering interaction

modalities (text, graphical, speech, video), synchronous
versus asynchronous experiences, context retention,
communicating capabilities, trust, and key UX principles.
The next five chapters focus on creating, orchestrating, and scaling
agents:

---

## Sección 6: Chapter 4 dives into tools, including design (local, APIbased, plug-in, hierarchies) and automated tool development

(code generation, imitation learning, tool learning from
rewards).

---

## Sección 7: Chapter 5 covers orchestration, with fundamentals

(parameterization, tool selection, execution), tool selection
methods (generative, semantic, hierarchical, machinelearned), tool topologies (decomposition,
single/parallel/sequential execution, chains, trees, graphs),
and planning strategies (incremental execution, zero-shot,
few-shot, ReAct).

---

## Sección 8: Chapter 6 explores memory, including foundational

approaches (context windows, keyword-based), semantic
memory and vector stores (semantic search, RAG,
experience memory), GraphRAG (knowledge graphs), and
working memory (whiteboards, note-taking).

-- 12 of 559 --

---

## Sección 9: Chapter 7 addresses learning from experience, with

nonparametric learning (experiences as examples,
exploration/exploitation, reflection), parametric learning
(fine-tuning large/small models), and transfer learning.

---

## Sección 10: Chapter 8 discusses scaling from one agent to many,

including when to use multiagents, coordination (democratic,
manager, hierarchical, actor-critic, automated design), and
frameworks such as LangChain.
The final five chapters address validation, monitoring, security,
improvement, and human-agent integration:

---

## Sección 11: Chapter 9 covers measurement and validation, with key

objectives (accuracy, robustness, efficiency, etc.), evaluation
sets, unit tests (tools, planning, memory, learning),
integration tests (end-to-end, consistency, hallucinations),
limitations, and deployment preparation.

---

## Sección 12: Chapter 10 focuses on production monitoring, including

causes of failures, agent metrics (system health,
automated/human evaluation, feedback), distribution shifts,
and monitoring at scale (analytics, alerting, logging).

---

## Sección 13: Chapter 11 explores improvement loops, with feedback

pipelines (issue detection, human review, refinement,
prioritization), experimentation (shadow deployments, A/B
testing, adaptive, gating), and continuous learning (incontext, offline retraining, online reinforcement).

---

## Sección 14: Chapter 12 addresses protecting agent systems, covering

unique risks, securing LLMs (model selection, defenses, red
teaming, fine-tuning), data protection (privacy, provenance),
securing agents (safeguards, external/internal protections),
and governance/compliance.

-- 13 of 559 --

---

## Sección 15: Chapter 13 discusses humans and agents, with ethical

principles (oversight, transparency, fairness, explainability,
privacy), building trust/oversight, addressing bias, and
accountability/regulatory considerations.
Feel free to skip sections you’re familiar with—the book is modular
by design.
Note: I often use “we” to refer to you (the reader) and me, fostering
a collaborative learning vibe.
Conventions Used in This Book
The following typographical conventions are used in this book:
Italic
Indicates new terms, URLs, email addresses, filenames, and file
extensions.
Constant width
Used for program listings, as well as within paragraphs to refer to
program elements such as variable or function names, databases,
data types, environment variables, statements, and keywords.
Constant width bold
Shows commands or other text that should be typed literally by
the user.
Constant width italic
Shows text that should be replaced with user-supplied values or
by values determined by context.

-- 14 of 559 --

Using Code Examples
Supplemental material (code examples, exercises, etc.) is available
for download at
https://oreil.ly/building-applications-with-ai-agentssupp.
If you have a technical question or a problem using the code
examples, please email
support@oreilly.com.
This book is here to help you get your job done. In general, if
example code is offered with this book, you may use it in your
programs and documentation. You do not need to contact us for
permission unless you’re reproducing a significant portion of the
code. For example, writing a program that uses several chunks of
code from this book does not require permission. Selling or
distributing examples from O’Reilly books does require permission.
Answering a question by citing this book and quoting example code
does not require permission. Incorporating a significant amount of
example code from this book into your product’s documentation
does require permission.
We appreciate, but generally do not require, attribution. An
attribution usually includes the title, author, publisher, and ISBN. For
example: “
Building Applications with AI Agents by Michael Albada
(O’Reilly). Copyright 2025 Advance AI LLC, 978-1-098-17650-1.”
If you feel your use of code examples falls outside fair use or the
permission given above, feel free to contact us at
permissions@oreilly.com.

-- 15 of 559 --

O’Reilly Online Learning
NOTE
For more than 40 years,
O’Reilly Media has provided technology and
business training, knowledge, and insight to help companies succeed.
Our unique network of experts and innovators share their knowledge
and expertise through books, articles, and our online learning
platform. O’Reilly’s online learning platform gives you on-demand
access to live training courses, in-depth learning paths, interactive
coding environments, and a vast collection of text and video from
O’Reilly and 200+ other publishers. For more information, visit
https://oreilly.com.
How to Contact Us
Please address comments and questions concerning this book to the
publisher:
O’Reilly Media, Inc.
141 Stony Circle, Suite 195
Santa Rosa, CA 95401
800-889-8969 (in the United States or Canada)
707-827-7019 (international or local)
707-829-0104 (fax)
support@oreilly.com

-- 16 of 559 --

https://oreilly.com/about/contact.html
We have a web page for this book, where we list errata and any
additional information. You can access this page at
https://oreil.ly/building-applications-with-ai-agents-1e.
For news and information about our books and courses, visit
https://oreilly.com.
Find us on LinkedIn:
https://linkedin.com/company/oreilly-media
Watch us on YouTube:
https://youtube.com/oreillymedia
Acknowledgments
As a first-time author, it’s humbling to discover just how many
people it takes to write a book, and it’s thanks to the contributions of
many wonderful people that this book has come to fruition.
This book took over a year to write, and I’m especially grateful to
the technical reviewers who carved out their valuable time to share
their detailed feedback, perspective, and insight. Nuno Campos has
brought invaluable expertise on all things agents and LangChain and
pointed me to concepts I had missed. Prashanth Josyula held the
writing and the code examples to a high bar of technical rigor and
brought deep technical expertise. Megan MacLennan has been my
technical writing expert, helping ensure accessibility and relevance to
a wide audience. Early drafts are always imperfect, and I’m deeply
grateful to my technical reviewers for tolerating my blunders and
oversights with grace. Thank you for all of your patience and your
invaluable suggestions.
I also want to offer a special thanks to Anthony Wainman, who has
been a thought partner from the earliest stages of this book, and
offered invaluable guidance on the structure, content, examples, and
so much more.

-- 17 of 559 --

This book wouldn’t have been possible without the fantastic team at
O’Reilly, especially my development editor, Shira Evans, who helped
shepherd the project. Many thanks to Melissa Potter for providing
early feedback and reviews, and my production editors Ashley Stussy
and Gregory Hyman. Nicole Butterfield has been invaluable in
turning concepts into reality.
I also want to thank everyone who read the early release version of
the book and offered suggestions and encouragement, including
Tiago Dufau de Vargas, Jenny Song, Leonidas Askianakis, Karthik
Rao, and Drew Hoskins.
I owe so much to my brilliant current and former colleagues at
Microsoft, ServiceNow, and Uber, especially Olcay Cirit, Dawn
Woodard, Sameera Poduri, Zoubin Ghahramani, Piero Molino, Pablo
Bellver, Jaikumar Ganesh, Jay Stokes, Marc-Alexandre Cote, Chi
Wang, Anush Sankaran, Amir Abdi, Tong Wang, Antonios Matakos,
Max Golovanov, Abe Starosta, Francis Beckert, Malachi Jones, Taylor
Black, Ryan Sweet, Lital Badash, Amir Pirogovsky, Alexander
Stojanovic, Brad Sarsfield, Chang Kawaguchi, Jure Leskovic, Chiyu
Zhang, Andrew Zhao, Matthieu Lin, and many, many more. Thank
you for your wisdom, your insight, your patience, your mentorship,
and your many suggestions.
I would like to thank Luke Miratrix, who introduced me to statistics
and taught me how to code. I would also like to thank my core
academic mentors Lisa Schmitt, Lise Shelton, James Sheehan,
Finbarr Livesey, Matthew Sommer, James Ward, Charles Isbell,
Michael Littman, Zsolt Kira, and Constantine Dovrolis for shaping my
thinking in ways big and small.
This book is, in many ways, a distillation of lessons I’ve learned
throughout my life and career, and I am grateful to many more
people than I can name here. I am deeply grateful to have the
opportunity to release this book out into the world, and I truly hope
it serves you well.

---

## Sección 16: Chapter 13 discusses humans and agents, with ethical

-- 18 of 559 --

---

## Sección 17: Chapter 1. Introduction to Agents

We are witnessing a profound technological transformation driven by autonomous agents—intelligent
software systems capable of independent reasoning, decision making, and interacting effectively within
dynamic environments. Unlike traditional software, autonomous agents interpret contexts, adapt to
changing scenarios, and perform sophisticated actions with minimal human oversight.
Defining AI Agents
Autonomous agents are intelligent systems designed to independently analyze data, interpret their
environment, and make context-driven decisions. As the popularity of the term “agent” grows, its
meaning has become diluted, often applied to systems lacking genuine autonomy. In practice, agency
exists on a spectrum. True autonomous agents demonstrate meaningful decision making, context-driven
reasoning, and adaptive behaviors. Conversely, many systems labeled as “agents” may simply execute
deterministic scripts or tightly controlled workflows. Designing genuinely autonomous, adaptive agents
is challenging, prompting many teams to adopt simpler approaches to achieve quicker outcomes.
Therefore, the key test of a true agent is whether it demonstrates real decision making rather than
following static scripts.
The rapid evolution of autonomous agents is primarily driven by breakthroughs in foundation models
and reinforcement learning. While traditional use cases with foundation models have focused on
generating human-readable outputs, the latest advances enable these models to generate structured
function signatures and parameter selections. Orchestration frameworks can then execute these
functions—enabling agents to look up data, manipulate external systems, and perform concrete actions.
Throughout this book, we will use the term “agentic system” to describe the full supporting functionality
that enables an agent to run effectively, including the tools, memory, foundation model, orchestration,
and supporting infrastructure.
With a growing range of protocols such as Model Context Protocol (discussed in Chapter 4) and Agentto-Agent Protocol (discussed in Chapter 8), these agents will be able to use remote tools and
collaborate with other agents to solve problems. This unlocks enormous opportunities for sophisticated
automation—but it also brings a profound responsibility to design, measure, and manage these systems
thoughtfully, ensuring their actions align with human values and operate safely in complex, dynamic
environments.
The Pretraining Revolution
While traditional ML is an incredibly powerful technique, it is usually limited by the quantity and quality
of the dataset. ML practitioners will typically tell you that they spend the majority of their time not
training models, but on collecting and cleaning datasets that they can use for training. The incredible
success of generative models that have been trained on large volumes of data have shown that single
models can now adapt to a wide range of tasks without any additional training. This upends years of
practice. To build an application that used ML previously required hiring an ML engineer or data
scientist, having them collect data, and then deploying that model. With the latest developments in
large, pretrained generative models, high-quality models that will work reasonably well for many use
cases are now available through a single call to a hosted model without any training or hosting required.
This dramatically lowers the cost and complexity of building applications enabled with ML and AI.
Recent advancements in large language models (LLMs) such as GPT-5, Anthropic’s Claude, Meta’s
Llama, Google’s Gemini Ultra, and DeepSeek’s V3 have increased the performance on a range of difficult

-- 19 of 559 --

tasks even further, widening the scope of problems solvable with pretrained models. These foundation
models offer robust natural language understanding and content generation capabilities, enhancing
agent functionality through:
Natural language understanding
Interpreting and responding intuitively to user inputs
Context-aware interaction
Maintaining context for relevant and accurate responses over extended interactions
Structured content generation
Producing text, code, and structured outputs essential for analytical and creative tasks
While these models are very capable on their own, they can also be used to make decisions within wellscoped areas, adapt to new information, and invoke tools to accomplish real work. Integration with
sophisticated orchestration frameworks enables these models to interact directly with external systems
and execute practical tasks. These models are capable of:
Contextual interpretation and decision making
Navigating ambiguous situations without exhaustive preprogramming
Tool use
Calling other software to retrieve information or take actions
Adaptive planning
Planning and executing complex, multistep actions autonomously
Information summarization
Rapidly processing extensive documents, extracting key insights, thereby aiding legal analysis,
research synthesis, and content curation
Management of unstructured data
Interpreting and responding intelligently to unstructured texts such as emails, documents, logs, and
reports
Code generation
Writing and executing code and writing unit tests
Routine task automation
Efficiently handling repetitive activities in customer service and administrative workflows, freeing
human workers to focus on more nuanced tasks
Multimodal information synthesis
Performing intricate analyses of image, audio, or video data at scale
This enhanced flexibility enables autonomous agents to effectively handle complex and dynamic
scenarios that static ML models typically cannot address.

---

## Sección 18: Chapter 1. Introduction to Agents

-- 20 of 559 --

Types of Agents
As the term “agent” has gained popularity, its meaning has broadened to encompass a wide range of
AI-enabled systems, often creating confusion about what truly constitutes an AI agent.
The Information
categorizes agents into seven practical types, reflecting how these technologies are being applied today:
Business-task agents
These agents automate predefined business workflows, such as UiPath’s robotic process automation,
Microsoft Power Automate’s low-code flows, or Zapier’s app integrations. They execute sequences of
deterministic actions, typically triggered by events, with minimal contextual reasoning.
Conversational agents
This category includes chatbots and customer service agents that engage users through natural
language interfaces. They are optimized for dialogue management, intent recognition, and
conversational turn-taking, such as virtual assistants embedded in customer support platforms.
Research agents
Research agents conduct information gathering, synthesis, and summarization tasks. They scan
documents, knowledge bases, or the web to provide structured outputs that assist human analysts.
Examples include Perplexity AI and Elicit.
Analytics agents
Analytics agents, such as Power BI Copilot or Glean, focus on interpreting structured datasets and
generating insights, dashboards, and reports. They often integrate tightly with enterprise data
warehouses, enabling users to query complex data in natural language.
Developer agents
Tools like Cursor, Windsurf, and GitHub Copilot represent coding agents, which assist developers by
generating, refactoring, and explaining code. They integrate deeply into IDE workflows to augment
software development productivity.
Domain-specific agents
These agents are tuned for specialized professional domains, such as legal (Harvey), medical
(Hippocratic AI), or finance agents. They combine domain-specific knowledge with structured
workflows to deliver targeted, expert-level assistance.
Browser-using agents
These agents navigate, interact with, extract information from, and take actions on websites without
human interaction. As opposed to traditional robotic process automation, which follows prescripted
steps, modern browser-using agents combine language understanding, visual perception, and
dynamic planning to adapt on the fly.
In addition to these seven types of agents, voice and video agents are important and also expected to
increase in adoption in the coming years:
Voice agents
Powered by end-to-end speech understanding and generation, these agents are enabling
conversational automation in areas like customer service, appointment scheduling, and even realtime order processing.
Video agents

-- 21 of 559 --

These agents present users with avatar-based video responses, combining lip-synced speech, facial
expression, and gesture. They’re emerging rapidly in sales, training, customer onboarding,
marketing, and virtual presence tools—enabling scalable, personalized video interactions without
manual production.
Importantly, the number and variety of agent types is growing rapidly, and we will likely see new kinds
of agents emerge across many domains as the field and its underlying technologies evolve. In this book,
our emphasis is on the core category of agents built around language models, particularly those using
text and code. While we touch on business‑task automation, voice, and video, we’ll primarily explore
agents built around language models—their architectures, reasoning, and UX—in subsequent chapters.
Now that we’ve discussed the evolving types of agents, the next critical question becomes: which model
should you choose to power your agent? Model selection is a complex and rapidly changing domain. As
discussed in the next section, you’ll need to balance factors like task complexity, modality support,
latency and cost constraints, and integration requirements to make the right choice for your agent.
Model Selection
Today, we are fortunate to have a proliferation of powerful models available from both commercial
providers and the open source community. OpenAI, Anthropic, Google, Meta, and DeepSeek each offer
state-of-the-art foundation models with impressive general-purpose capabilities. At the same time,
open-weight models like Llama, Mistral, and Gemma are pushing the boundaries of what can be
achieved with local or fine-tuned deployments. Even more striking is the rapid advancement of smalland medium-sized models. New techniques for distillation, quantization, and synthetic data generation
are enabling compact models to inherit surprising levels of capability from their larger counterparts.
This explosion of choice is good news: competition is driving faster innovation, better performance, and
lower costs. But it also creates a dilemma—how do you choose the right model for your agentic system?
The truth is, there isn’t a one-size-fits-all answer. In fact, one of the most reasonable starting points is
simply to use the latest general-purpose model from a leading provider like OpenAI or Anthropic. As you
can see in Table 1-1, these models offer strong performance out of the box, require little customization,
and will take you surprisingly far for many applications. GPT-5 mini (Aug 2025) leads overall with the
highest mean score (0.819), closely followed by o4-mini (0.812) and o3 (0.811). Proprietary and openaccess models like Qwen3, Grok 4, Claude 4, and Kimi K2 also show competitive results.

---

## Sección 19: Chapter 1. Introduction to Agents

-- 22 of 559 --

-- 23 of 559 --

T
a
bl
e
-
1.
H
E
L
M
C
o
re
S
c
e
n
ar
io
le
a
d
er
b
o
ar
d
(
A
u
g
u
st
0
5
).
C
o
m
p
ar
at
iv
e
b
e
n
c
h
m

-- 24 of 559 --

ar
k
p
er
fo
r
m
a
n
c
e
of
th
e
to
p
0
m
o
d
el
s
a
cr
o
ss
re
a
s
o
ni
n
g
a
n
d
e
v
al
u
at
io
n
ta
s
k
s:
M
M
L
U
-

-- 25 of 559 --

P
ro
,
G
P
Q
A,
IF
E
v
al
,
W
il
d
B
e
n
c
h,
a
n
d
O
m
ni
-
M
A
T
H
.
Model Mean score
MMLU-Pro
—COT
correct
GPQA—COT
correct
IFEval—
IFEval
Strict Acc
WildBench
—WB Score
OmniMATH—A
GPT-5 mini
(2025-08-07)
0.819 0.835 0.756 0.927 0.855 0.722
o4-mini
(2025-04-16)
0.812 0.82 0.735 0.929 0.854 0.72
o3 (2025-0416)
0.811 0.859 0.753 0.869 0.861 0.714
GPT-5 (202508-07)
0.807 0.863 0.791 0.875 0.857 0.647

-- 26 of 559 --

Qwen3 235B
A22B
Instruct 2507
FP8
0.798 0.844 0.726 0.835 0.866 0.718
Grok 4
(0709)
0.785 0.851 0.726 0.949 0.797 0.603
Claude 4
Opus
(20250514,
extended
thinking)
0.78 0.875 0.709 0.849 0.852 0.616
gpt-oss-120b 0.77 0.795 0.684 0.836 0.845 0.688
Kimi K2
Instruct
0.768 0.819 0.652 0.85 0.862 0.654
Claude 4
Sonnet
(20250514,
extended
thinking)
0.766 0.843 0.706 0.84 0.838 0.602
That said, they aren’t always the most efficient choice. For many tasks—especially those that are welldefined, low-latency, or cost-sensitive—much smaller models can provide near-equivalent performance
at a fraction of the cost. This has led to a growing trend: automated model selection. Some platforms
now route simpler queries to fast, inexpensive small models, reserving the large, expensive models for
more complex reasoning. This dynamic test-time optimization is proving effective, and it hints at a
future where multimodel systems become the norm.
The key takeaway is that you can spend enormous effort optimizing model selection for marginal gains
—but unless your scale or constraints demand it, starting simple is fine. Over time, it’s often worth
experimenting with smaller models, fine-tuning, or adding retrieval to improve performance and reduce
costs. Just remember: the future is almost certainly multimodel, and designing for flexibility now will
pay off later.
From Synchronous to Asynchronous Operations
Traditional software systems typically execute tasks synchronously, moving step-by-step and waiting for
each action to finish before starting the next. While this approach is straightforward, it can lead to
significant inefficiencies—especially when waiting on external inputs or processing large volumes of
data.
In contrast, autonomous agents are designed for asynchronous operation. They can manage multiple
tasks in parallel, swiftly adapt to new information, and prioritize actions dynamically based on changing
conditions. This asynchronous processing dramatically enhances efficiency, reducing idle time and
optimizing the use of computational resources.
The practical implications of this shift are substantial. For example:
Emails can arrive with reply drafts already prepared.

-- 27 of 559 --

Invoices can come with pre-populated payment details.
Software engineers might receive tickets accompanied by code to solve them and unit tests to
assess them.
Customer support agents can be provided with suggested responses and recommended actions.
Security analysts can receive alerts that have already been automatically investigated and
enriched with relevant threat intelligence.
In each case, agents are not just speeding up routine workflows—they are changing the nature of work
itself. This evolution transforms human roles from task executors to task managers. Rather than
spending time on repetitive or mechanical steps, individuals can focus on strategic oversight, review,
and high-value decision making—amplifying human creativity and judgment while letting agents handle
the operational details. These agents make it much easier for human roles to be proactive rather than
reactive.
Practical Applications and Use Cases
The versatility of autonomous agents opens up a myriad of applications across different industries. To
keep this book grounded in clear, specific use cases, I have seven real-world example agents with
evaluation systems available in the public GitHub repo supporting this book. We will frequently turn
back to these examples as we explore the key aspects of agent systems:
Customer support agent
Customer support is one of the most prevalent applications for autonomous agents. These agents
handle common inquiries, process refunds, update orders, and escalate complex issues to human
representatives, providing 24/7 support while enhancing customer satisfaction and reducing
operational costs.
Financial services agent
In banking and financial services, agents assist with account management, loan processing, fraud
investigation, and investment portfolio rebalancing. They streamline customer service, accelerate
transaction processing, and improve security by detecting suspicious activities in real time.
Healthcare patient intake and triage agent
These agents support frontline healthcare operations by registering new patients, verifying
insurance, assessing symptoms to prioritize care, scheduling appointments, managing medical
histories, and coordinating referrals, thereby improving workflow efficiency and patient outcomes.
IT help desk agent
IT help desk agents manage user access, troubleshoot network and system issues, deploy software
updates, respond to security incidents, and escalate unresolved issues to specialists. They enhance
productivity by resolving common technical problems swiftly.
Legal document review agent
Legal agents assist attorneys and paralegals by reviewing contracts, conducting legal research,
performing client intake and conflict checks, managing discovery, assessing compliance, calculating
damages, and tracking deadlines. This helps to streamline workflows and improve accuracy in legal
operations.
Security Operations Center (SOC) analyst agent

---

## Sección 20: Chapter 1. Introduction to Agents

-- 28 of 559 --

SOC analyst agents investigate security alerts, gather threat intelligence, query logs, triage incidents,
isolate compromised hosts, and provide updates to security teams. They accelerate incident
response and strengthen organizational security posture.
Supply chain and logistics agent
In supply chain management, agents optimize inventory, track shipments, evaluate suppliers,
coordinate warehouse operations, forecast demand, manage disruptions, and handle compliance
requirements. These capabilities help maintain resilience and efficiency across global networks.
Autonomous agents offer significant potential across various use cases, from customer support and
personal assistance to legal services and advertising. By integrating these agents into their operations,
organizations can achieve greater efficiency, improve service quality, and unlock new opportunities for
innovation and growth. As we continue to explore the capabilities and applications of autonomous
agents in this book, it becomes evident that their impact will be profound and far-reaching across
multiple industries.
Now that we’ve looked at some example agents, in the next section, we’ll discuss some of the key
considerations when designing our agentic systems.
Workflows and Agents
In many real‐world projects, choosing between a simple script, a deterministic workflow, a traditional
chatbot, a retrieval‐augmented generation (RAG) system, or a full‐blown autonomous agent can be the
difference between an elegant solution and an overengineered, hard‐to‐maintain mess. To make this
choice clearer, consider four key factors: the variability of your inputs, the complexity of the reasoning
required, any performance or compliance constraints, and the ongoing maintenance burden.
First, when might you choose not to use a foundation model—or any ML component at all? If your
inputs are fully predictable and every possible output can be described in advance, a handful of lines of
procedural code are often faster, cheaper, and far easier to test than an ML–based pipeline. For
example, parsing a log file that always follows the format “YYYY‐MM‐DD HH:MM:SS—message” can be
handled reliably with a small regular‐expression‐based parser in Python or Go. Likewise, if your
application demands millisecond‐level latency—such as an embedded system that must react to sensor
data in real time—there simply isn’t time for a language model API call. In such cases, traditional code
is the right choice. Finally, regulated domains (medical devices, aeronautics, certain financial systems)
often require fully deterministic, auditable decision logic—black‐box neural models won’t satisfy
certification requirements. If any of these conditions hold—deterministic inputs, strict performance or
explainability needs, or a static problem domain—plain code is almost always preferable to a foundation
model.
Next, consider deterministic or semiautomated workflows. Here, the logic can be expressed as a finite
set of steps or branches, and you know ahead of time where you might need human intervention or
extra error handling. Suppose you ingest invoices from a small set of vendors and each invoice arrives
in one of three known formats: CSV, JSON, or PDF. You can build a workflow that routes each format to
its corresponding parser, checks for mismatches, and halts for a human review if any fields fail a simple
reconciliation—no deep semantic understanding is required. Likewise, if your system must retry failed
steps with exponential backoff or pause for a manager’s approval, a workflow engine (such as Airflow,
AWS Step Functions, or a well‐structured set of scripts) offers clearer control over error paths than an
LLM could. Deterministic workflows make sense whenever you can enumerate all decision branches in
advance and you need tight, auditable control over each branch. In such scenarios, workflows scale
more naturally than large, ad hoc scripts but still avoid the complexity and cost of running an agentic
pipeline.

-- 29 of 559 --

Traditional chatbots or RAG systems occupy the next tier of complexity: they add natural language
understanding and document retrieval but stop short of autonomous, multistep planning. If your
primary need is to let users ask questions about a knowledge base—say, searching a product manual, a
legal archive, or corporate wikis—a RAG system can embed documents into a vector store, retrieve
relevant passages in response to a query, and generate coherent, context‐aware answers. For instance,
an internal IT help desk might use RAG to answer “How do I reset my VPN credentials?” by fetching the
latest troubleshooting guide and summarizing the relevant steps. Unlike autonomous agents, RAG
systems do not independently decide on follow‐up actions (like filing a ticket or scheduling a callback);
they simply surface information. A traditional chatbot or RAG approach makes sense when the task is
primarily question‐answering over structured or unstructured content, with limited need for external API
calls or decision orchestration. Maintenance costs are lower than for agents—your main overhead lies in
keeping document embeddings up to date and refining prompts—but you sacrifice the agent’s ability to
plan multistep workflows or learn from feedback loops.
Finally, we reach autonomous agents—situations where neither simple code, nor rigid workflows, nor
RAG suffice because inputs are unstructured, novel, or highly variable, and because you require
dynamic, multistep planning or continuous learning from feedback. Consider a customer support center
that receives free‐form emails with issues ranging from “my laptop battery is swelling and might erupt”
to “I keep getting billed for services I didn’t order.” A rule‐based workflow or a RAG‐powered FAQ
lookup would shatter under such open‐ended variety, but an agent powered by a foundation model can
parse intent, extract relevant entities, consult a knowledge base, draft an appropriate response, and
even escalate to a human if necessary—all without being told every possible branch in advance.
Similarly, in supply chain management, an agent that ingests real‐time inventory data, supplier lead
times, and sales forecasts can replan shipment schedules dynamically; a deterministic workflow would
require constant manual updates to handle new exceptions.
Agents also excel when many subtasks must run in parallel—such as a security operations agent that
simultaneously queries threat intelligence APIs, scans network telemetry, and performs sandbox analysis
on suspicious binaries. Because agents operate asynchronously and reprioritize based on real‐time data,
they avoid the brittle “one‐step‐at‐a‐time” nature of workflows or RAG systems. To justify the higher
compute and maintenance costs of running a foundation model, you need this level of contextual
reasoning, parallel task orchestration, or ongoing self‐improvement—scenarios where rigid code,
workflows, or chatbots would be too brittle or expensive to maintain.

---

## Sección 21: Chapter 1. Introduction to Agents

-- 30 of 559 --

T
a
bl
e
-
.
D
is
ti
n
g
ui
s
hi
n
g
w
o
r
kf
lo
w
s
a
n
d
a
g
e
n
ts
fr
o
m
tr
a
di
ti
o
n
al
c
o
d
e
Characteristic Traditional code Workflow Autonomous agent

-- 31 of 559 --

Input structure Fully predictable
schemas
Mostly predictable with
finite branches
Highly unstructured or novel
inputs
Explainability Full transparency;
easily auditable
Explicit branch-bybranch audit trail
Black-box components
requiring additional tooling
Latency Ultra-low latency Moderate latency Higher latency
Adaptability and
learning
None Limited High (learning from
feedback)
Every path carries trade‐offs. Pure code is cheap and fast but inflexible; workflows offer control but
break down when inputs grow wildly variable; traditional chatbots or RAG are great for question‐
answering over documents but cannot orchestrate multistep actions; and agents are powerful but
demanding—both in terms of cloud compute and engineering effort to monitor, tune, and govern.
Before choosing, ask: are my inputs unstructured or unpredictable? Do I need multistep planning that
adapts to intermediate results? Can a document retrieval system suffice for my users’ information
needs, or must the system decide and act autonomously? Will I want this system to improve itself over
time with minimal human intervention? And can I tolerate the latency and maintenance burden of a
foundation model?
In short, if your task is a fixed, deterministic transformation, write some simple code. If there are a
handful of known branches and you require explicit error‐handling checkpoints, use a deterministic
workflow. If you primarily need natural language question‐answering over a corpus, choose a traditional
chatbot or RAG architecture. But if you face high variability, open‐ended reasoning, dynamic planning
needs, or continual learning requirements, invest in an autonomous agent. Making this choice
thoughtfully ensures that you get the right balance of simplicity, performance, and adaptability—so your
solution remains both effective and maintainable as requirements evolve.

-- 32 of 559 --

Principles for Building Effective Agentic Systems
Creating successful autonomous agents requires an approach that prioritizes scalability, modularity,
continuous learning, resilience, and future-proofing:
Scalability
Ensure that agents can handle growing workloads and diverse tasks by utilizing distributed
architectures, cloud-based infrastructure, and efficient algorithms that support parallel processing
and resource optimization. Example: a customer support agent that processes 10 tickets per minute
may crash or hang when traffic spikes to 1,000 if not backed by autoscaling infrastructure.
Modularity
Design agents with independent, interchangeable components connected through clear interfaces.
This modular approach simplifies maintenance, promotes flexibility, and facilitates rapid adaptation
to new requirements or technologies. Example: a poorly modular agent that hardcodes all its tools in
its agent service would require a full redeployment anytime a small addition or modification is
needed to a tool.
Continuous learning
Equip agents with mechanisms to learn from experience, such as in-context learning. Integrate user
feedback to refine agent behaviors and maintain performance relevance as tasks evolve. Example:
agents that ignore feedback loops may keep making the same mistakes—like misclassifying contract
clauses or failing to escalate critical support issues.
Resilience
Develop robust resilience architectures capable of gracefully handling errors, security threats,
timeouts, and unexpected conditions. Incorporate comprehensive error handling, stringent security
measures, and redundancy to ensure reliable and continuous agent operations. Example: agents
without retry or fallback logic may crash entirely when a single API call fails, leaving the user waiting
and confused.
Future-proofing
Build agent systems around open standards and scalable infrastructure, fostering a culture of
innovation to adapt quickly to emerging technologies and evolving user expectations. Example:
tightly coupling your agent to one proprietary vendor’s prompt format can make switching models
painful and limit experimentation.
Adhering to these principles enables organizations to develop autonomous agents that remain effective
and relevant, adapting seamlessly to technological advancements and changing operational
environments.
Organizing for Success in Building Agentic Systems
The widespread availability of foundation models via simple API calls has spurred extensive
experimentation with agent systems across many organizations. Teams frequently embark on
independent proofs of concept, leading to valuable discoveries and innovative ideas. However, this ease
of experimentation often results in fragmentation—overlapping projects, duplicated efforts, and
unfinished experiments become scattered throughout the organization. Conversely, premature
standardization could stifle creativity and trap organizations into rigid frameworks or vendor-specific
solutions. Achieving success requires balancing flexibility for experimentation with sufficient alignment
for scalability and coherence.

---

## Sección 22: Chapter 1. Introduction to Agents

-- 33 of 559 --

In the early phases of agent development, organizations should actively encourage exploratory efforts,
permitting teams to test various architectures, workflows, and models freely. Over time, as successful
patterns and best practices become apparent, strategic alignment becomes critical. Implementing a
“one standard per large group” strategy can effectively balance this need. Within specific departments
or functional areas, teams can standardize around common tools and methodologies, streamlining
collaboration without restricting broader organizational innovation.
Another essential aspect of success is avoiding vendor lock-in by adopting open standards, such as
OpenAPI, and embracing modular system designs. These practices help ensure flexibility and reduce
dependency on any single technology or provider, facilitating future adaptability.
Effective knowledge sharing is also crucial. Lessons learned from both successful and unsuccessful
experiments should be communicated widely via internal forums, shared repositories, and
comprehensive documentation. This collaborative approach accelerates organizational learning,
minimizes redundant efforts, and promotes collective improvement.
Lastly, governance frameworks should remain lightweight and flexible, emphasizing guiding principles
over rigid mandates. A streamlined governance structure enables teams to innovate confidently while
remaining aligned with overarching organizational objectives.
Organizing successfully around agentic systems is fundamentally iterative. Organizations must
continually reassess their strategies to maintain a dynamic balance between exploration and
standardization. By cultivating an environment that values experimentation, collaborative learning, and
open standards, organizations can effectively transition agentic systems from isolated experiments into
scalable, transformative solutions that are deeply integrated into their operational processes.
Agentic Frameworks
Numerous frameworks currently exist for developing autonomous agents, each addressing critical
functionalities such as skills integration, memory management, planning, orchestration, experiential
learning, and multiagent coordination. This list is certainly not exhaustive, but leading frameworks
include the following.
LangGraph
Strengths
Modular orchestration framework based on directed graphs whose nodes contain discrete units of
logic (often foundation model calls) and whose edges manage the flow of data through complex,
potentially cyclic workflows; strong developer ergonomics; native support for asynchronous
workflows and retries
Trade-offs
Requires custom logic for advanced planning and memory; less built-in support for multiagent
collaboration
Best for
Teams building robust, single-agent or light multiagent systems with explicit, inspectable flow control
AutoGen
Strengths

-- 34 of 559 --

Powerful multiagent orchestration; dynamic role assignment; flexible messaging-based interaction
between agents
Trade-offs
Can be heavyweight or complex for simple use cases; more opinionated around agent interaction
patterns
Best for
Research and production systems involving dialogue between multiple agents (e.g., manager-worker,
self-reflection loops)
CrewAI
Strengths
Easy to learn and use; quick setup for prototyping; useful abstractions like “crew” and “tasks”
Trade-offs
Limited customization and control over orchestration internals; less mature than LangGraph or
AutoGen for complex workflows
Best for
Developers who want to get started quickly on practical, human-centric agents like assistants or
support agents
OpenAI Agents Software Development Kit (SDK)
Strengths
Deep integration with OpenAI’s tool ecosystem; secure and easy-to-use function calling, memory
primitives, and tool routing
Trade-offs
Tightly coupled to OpenAI’s infrastructure; may be less flexible or portable for custom agent stacks
or open source toolchains
Best for
Teams already using the OpenAI API and looking for a fast way to build secure, tool-using agents
with minimal scaffolding
While each framework offers unique advantages and limitations, continuous innovation and competition
in this space are expected to drive further evolution. For early prototypes, CrewAI or OpenAI Agents
SDK can get you running quickly. For scalable, production-grade systems, LangGraph and AutoGen
provide more control and sophistication. These frameworks are also not necessary, and many teams
choose to build directly against the model provider APIs. This book primarily focuses on LangGraph,
chosen for its straightforward yet powerful approach to agent system development. Through detailed
explanations, practical examples, and real-world scenarios, we demonstrate how LangGraph effectively
addresses the complexity and dynamics required by modern intelligent agents.

-- 35 of 559 --

Conclusion
Autonomous agents represent a transformative development in AI, capable of performing complex,
dynamic tasks with a high degree of autonomy. This chapter has outlined the foundational concepts of
agents, highlighted their advancements over traditional ML systems, and discussed their practical
applications and limitations. As we delve deeper into the design and implementation of these systems, it
becomes clear that the thoughtful integration of agents into various domains holds the potential to drive
significant innovation and efficiency.
While the various approaches to designing autonomous agents discussed in this chapter have
demonstrated significant capabilities and potential, they also highlight the complexity and challenges
involved in creating effective and adaptable systems. Each method, from rule-based systems to
advanced cognitive architectures, offers unique strengths but also comes with inherent limitations. In
this book, I aim to bridge these gaps.

---

## Sección 23: Chapter 1. Introduction to Agents

-- 36 of 559 --

---

## Sección 24: Chapter 2. Designing Agent Systems

Most practitioners don’t begin with a grand design document when building agent systems.
They start with a messy problem, a foundation model API key, and a rough idea of what
might help. This chapter is your quick start to get you up and running. We’ll cover each of the
following topics in more depth through the rest of the book, and many will get their own
chapter, but this chapter will give you an overview of how to design an agentic system, all
grounded in a specific example of managing customer support for an ecommerce platform.
Our First Agent System
Let’s start with the problem we’re solving. Every day, your customer-support team fields
dozens or hundreds of emails asking to refund a broken mug, cancel an unshipped order, or
change a delivery address. For each message, a human agent has to read free-form text, look
up the order in your backend, call the appropriate API, and then type a confirmation email.
This repetitive two-minute process is ripe for automation—but only if we carve off the right
slice. When we realize that humans type keys and click buttons, often following rules and
guidelines, we see that many of these same patterns can be performed by well-designed
systems that rely on foundation models. We want our agent to take a raw customer message
plus the order record, decide which tool to call (issue_refund, cancel_order, or
update_address_for_order), invoke that tool with the correct parameters, and then
send a brief confirmation message. That two-step workflow is narrow enough to build quickly,
valuable enough to free up human time, and rich enough to showcase intelligent behavior. We
can build a working agent for this use case in just a few lines of code:
from langchain.tools import tool
from langchain_openai.chat_models import ChatOpenAI
from langchain.schema import SystemMessage, HumanMessage, AIMessage
from langchain_core.messages.tool import ToolMessage
from langgraph.graph import StateGraph
# -- 1) Define our single business tool
@tool
def cancel_order(order_id: str) -> str:
"""Cancel an order that hasn't shipped."""
# (Here you'd call your real backend API)
return f"Order {order_id} has been cancelled."
# -- 2) The agent "brain": invoke LLM, run tool, then invoke LLM again
def call_model(state):
msgs = state["messages"]
order = state.get("order", {"order_id": "UNKNOWN"})
# System prompt tells the model exactly what to do
prompt = (
f'''You are an ecommerce support agent.
ORDER ID: {order['order_id']}
If the customer asks to cancel, call cancel_order(order_id)

-- 37 of 559 --

and then send a simple confirmation.
Otherwise, just respond normally.'''
)
full = [SystemMessage(prompt)] + msgs
# 1st LLM pass: decides whether to call our tool
AIMessage = ChatOpenAI(model="gpt-5", temperature=0)(full)
out = [first]
if getattr(first, "tool_calls", None):
# run the cancel_order tool
tc = first.tool_calls[0]
result = cancel_order(**tc["args"])
out.append(ToolMessage(content=result, tool_call_id=tc["id"]))
# 2nd LLM pass: generate the final confirmation text
AIMessage = ChatOpenAI(model="gpt-5", temperature=0)(full + out)
out.append(second)
return {"messages": out}
# -- 3) Wire it all up in a StateGraph
def construct_graph():
g = StateGraph({"order": None, "messages": []})
g.add_node("assistant", call_model)
g.set_entry_point("assistant")
return g.compile()
graph = construct_graph()
if __name__ == "__main__":
example_order = {"order_id": "A12345"}
convo = [HumanMessage(content="Please cancel my order A12345.")]
result = graph.invoke({"order": example_order, "messages": convo})
for msg in result["messages"]:
print(f"{msg.type}: {msg.content}")
Great—you now have a working “cancel order” agent. Before we expand our agent, let’s
reflect on
why we started with such a simple slice. Scoping is always a balancing act. If you
narrow your task too much—say, only cancellations—you miss out on other high-volume
requests like refunds or address changes, limiting real-world impact. But if you broaden it too
far—“automate every support inquiry”—you’ll drown in edge cases like billing disputes,
product recommendations, and technical troubleshooting. And if you keep it vague—“improve
customer satisfaction”—you’ll never know when you’ve succeeded.
Instead, by focusing on a clear, bounded workflow—canceling orders—we ensure concrete
inputs (customer message + order record), structured outputs (tool calls + confirmations),
and a tight feedback loop. For example, imagine an email that says, “Please cancel my order
#B73973 because I found a cheaper option elsewhere.” A human agent would look up the
order, verify it hasn’t shipped, click “Cancel,” and reply with a confirmation. Translating this
into code means invoking cancel_order(order_id="B73973") and sending a simple
confirmation message back to the customer.
Now that we have a working “cancel order” agent, the next question is: does it actually work?
In production, we don’t just want our agent to run—we want to know how well it performs,

-- 38 of 559 --

what it gets right, and where it fails. For our cancel order agent, we care about questions like:
Did it call the correct tool (cancel_order)?
Did it pass the right parameters (the correct order ID)?
Did it send a clear, correct confirmation message to the customer?
In our open source repository, you’ll find a full evaluation script to automate this process:
Evaluation dataset
Batch evaluation script
Here’s a minimal, simplified version of this logic for how you might test your agent directly:
# Minimal evaluation check
example_order = {"order_id": "B73973"}
convo = [HumanMessage(content='''Please cancel order #B73973.
I found a cheaper option elsewhere.''')]
result = graph.invoke({"order": example_order, "messages": convo})
assert any("cancel_order" in str(m.content) for m in result["messages"],
"Cancel order tool not called")
assert any("cancelled" in m.content.lower() for m in result["messages"],
"Confirmation message missing")
print("✅ Agent passed minimal evaluation.")
This snippet ensures that the tool was called and the confirmation was sent. Of course, real
evaluation goes deeper: you can measure tool precision, parameter accuracy, and overall task
success rates across hundreds of examples to catch edge cases before deploying. We’ll dive
into evaluation strategies and frameworks in depth in Chapter 9, but for now, remember: an
untested agent is an untrusted agent.
Because both steps are automated using @tool decorators, writing tests against real tickets
becomes trivial—and you instantly gain measurable metrics like tool recall, parameter
accuracy, and confirmation quality. Now that we’ve built and evaluated a minimal agent, let’s
explore the core design decisions that will shape its capabilities and impact.
Core Components of Agent Systems
Designing an effective agent-based system requires a deep understanding of the core
components that enable agents to perform their tasks successfully. Each component plays a
critical role in shaping the agent’s capabilities, efficiency, and adaptability. From selecting the
right models to equipping the agent with tools, memory, and planning capabilities, these
elements must work together to ensure that the agent can operate in dynamic and complex
environments. This section delves into the key components—the foundation model, tools, and
memory—and explores how they interact to form a cohesive agent system. Figure 2-1 shows
the core components of an agent system.

---

## Sección 25: Chapter 2. Designing Agent Systems

-- 39 of 559 --

Figure 2-1. Core components of an agent system.
Model Selection
At the heart of every agent-based system lies the model that drives the agent’s decisionmaking, interaction, and learning capabilities. Selecting the right model is foundational: it
determines how the agent interprets inputs, generates outputs, and adapts to its
environment. This decision influences the system’s performance, scalability, latency, and cost.
Choosing an appropriate model depends on the complexity of the agent’s tasks, the nature of
the input data, infrastructure constraints, and the trade-offs between generality, speed, and
precision.
Broadly speaking, model selection starts with assessing task complexity. Large foundation
models—such as GPT-5 or Claude Opus 4.1—are well suited for agents operating in openended environments, where nuanced understanding, flexible reasoning, and creative
generation are essential. These models offer impressive generalization and excel at tasks
involving ambiguity, contextual nuance, or multiple steps. However, their strengths come at a
cost: they require significant computational resources, often demand cloud infrastructure, and
introduce higher latency. They are best reserved for applications like personal assistants,
research agents, or enterprise systems that must handle a wide range of unpredictable
queries.
In contrast, smaller models—such as distilled ModernBERT variants or Phi-4—are often more
appropriate for agents performing well-defined, repetitive tasks. These models run efficiently
on local hardware, respond quickly, and are less expensive to deploy and maintain. They work
well in structured settings like customer support, information retrieval, or data labeling, where
precision is needed but creativity and flexibility are less important. When real-time
responsiveness or resource constraints are critical, smaller models may outperform their
larger counterparts simply by being more practical.
An increasingly important dimension in model selection is modality. Agents today often need
to process not just text, but also images, audio, or structured data. Multimodal models, such
as GPT-5 and Claude 4.1, enable agents to interpret and combine diverse data types—text,
visuals, speech, and more. This expands the agent’s utility in domains like healthcare,
robotics, and customer support, where decisions rely on integrating multiple forms of input. In
contrast, text-only models remain ideal for purely language-driven use cases, offering lower

-- 40 of 559 --

complexity and faster inference in scenarios where additional modalities provide little added
value.
Another key consideration is openness and customizability. Open source models, such as
Llama and DeepSeek, provide developers with full transparency and the ability to fine-tune or
modify the model as needed. This flexibility is particularly important for privacy-sensitive,
regulated, or domain-specific applications. Open source models can be hosted on private
infrastructure, tailored to unique use cases, and deployed without licensing costs—though
they do require more engineering overhead. By contrast, proprietary models like GPT-5,
Claude, and Cohere offer powerful capabilities via API and come with managed infrastructure,
monitoring, and performance optimizations. These models are ideal for teams seeking rapid
development and deployment, though customization is often limited and costs can scale
quickly with usage.
The choice between using a pretrained general-purpose model or a custom-trained model
depends on the specificity and stakes of the agent’s domain. Pretrained models—trained on
broad internet-scale corpora—work well for general language tasks, rapid prototyping, and
scenarios where domain precision is not critical. These models can often be lightly fine-tuned
or adapted through prompting techniques to achieve strong performance with minimal effort.
However, in specialized domains—such as medicine, law, or technical support—custom-trained
models can provide significant advantages. By training on curated, domain-specific datasets,
developers can endow agents with deeper expertise and contextual understanding, leading to
more accurate and trustworthy outputs.
Cost and latency considerations often tip the scales in real-world deployments. Large models
deliver high performance but are expensive to run and may introduce response delays. In
cases where that is untenable, smaller models or compressed versions of larger models
provide a better balance. Many developers adopt hybrid strategies, where a powerful model
handles the most complex queries and a lightweight model handles routine tasks. In some
systems, dynamic model routing ensures that each request is evaluated and routed to the
most appropriate model based on complexity or urgency—enabling systems to optimize both
cost and quality.
The Center for Research on Foundation Models at Stanford University has released the Holistic
Evaluation of Language Models, providing rigorous third-party performance measurement
across a wide range of models. In Table 2-1, a small selection of language models are shown
along with their performance on the Massive Multitask Language Understanding (MMLU)
benchmark, a commonly used general assessment of these models’ abilities. These
measurements are not perfect, but they provide us with a common ruler with which to
compare performance. In general, we see that larger models perform better, but
inconsistently (some models perform better than their size would suggest). Significantly more
computation resources are required to obtain high performance.

---

## Sección 26: Chapter 2. Designing Agent Systems

-- 41 of 559 --

T
a
bl
e
-
.
S
el
e
ct
e
d
o
p
e
n
w
ei
g
h
t
m
o
d
el
s
b
y
p
e
rf
o
r
m
a
n
c
e
a
n
d
si
z
e

-- 42 of 559 --

Model Maintainer MMLU
Parameters
(billion)
VRAM (full
precision
model in
GB)
Sample
hardware
required
Llama 3.1
Instruct
Turbo
Meta 56.1 8 20 RTX 3090
Gemma 2 Google 72.1 9 22.5 RTX 3090
NeMo Mistral 65.3 12 24 RTX 3090
Phi-3 Microsoft 77.5 14.7 29.4 A100
Qwen1.5 Alibaba 74.4 32 60.11 A100
Llama 3 Meta 79.3 70 160 4xA100
Conversely, this means moderate performance can be obtained at a small fraction of the cost.
As you’ll see in Table 2-1, models up to roughly 14 billion parameters can be run on a single
consumer-grade graphics processing unit (GPU), such as NVIDIA’s RTX 3090 with 24 GB of
video RAM. Above this threshold, though, you will probably want a server-grade GPU such as
NVIDIA’s A100, which comes in 40 GB and 80 GB varieties. Models are called “open weight”
when the architecture and weights (or parameters) of the model have been released freely to
the public, so anyone with the necessary hardware can load and use the model for inference
without paying for access. We will not get into the details of hardware selection, but these
select open weight models show a range of performance levels at different sizes. These small,
open weight models continue to improve at a rapid pace, bringing increasing amounts of
intelligence into smaller form factors. While they might not work well for your hardest
problems, they can handle easier, more routine tasks at a fraction of the price. For our

-- 43 of 559 --

example ecommerce support agent, a small fast model suffices—but if we expanded into
product recommendations or sentiment-based escalation, a larger model could unlock new
capabilities.
Now let’s take a look at several of the large flagship models. Note that two of these models,
DeepSeek-v3 and Llama 3.1 Instruct Turbo 405B, have been released as open weight models
but the others have not. That said, these large models typically require at least 12 GPUs for
reasonable performance, but they can require many more. These large models are almost
always used on servers in large data centers. Typically, the model trainers charge for access
to these models based on the number of input and output tokens. The advantage of this is
that the developer does not need to worry about servers and GPU utilization but can begin
building right away. Table 2-2 shows the model costs and performance on the same MMLU
benchmark.

-- 44 of 559 --

T
a
bl
e
-
.
S
el
e
ct
e
d
la
r
g
e
m
o
d
el
s
b
y
p
e
rf
o
r
m
a
n
c
e
a
n
d
c
o
st
Model Maintainer MMLU
Relative price per
million input
tokens
Relative price per
million output
tokens

-- 45 of 559 --

DeepSeekv3 DeepSeek 87.2 2.75 3.65
Claude 4
Opus Extended
Thinking
Anthropic 86.5
125
Gemini 2.5
Pro Google 86.2 12.5
Llama 3.1
Instruct Turbo 405B Meta 84.5
1 1
o4-mini
OpenAI 83.2 5.5 7.33
Grok 3 xAI
79.9
15 25
Nova Pro
Amazon 82.0
5.33
Mistral
Large 2 Mistral 80.0
10 10
In Table 2-2, prices are shown as a multiple of the price per million tokens on Llama 3.1,
which was the least expensive at the time of publishing. At the time of publishing, Meta is
charging $0.20 per million input tokens and $0.60 per million output tokens. You might also
notice that performance does not directly correlate to price. Also know that performance on
benchmarks offers useful guidance, but your mileage may vary in how these benchmarks

-- 46 of 559 --

align with your particular task. When possible, compare the model for your task and find the
model that provides you with the best price per performance.
Ultimately, model selection is not a onetime decision but a strategic design choice that must
be revisited as agent capabilities, user needs, and infrastructure evolve. Developers must
weigh trade-offs between generality and specialization, performance and cost, simplicity and
extensibility. By carefully considering the task complexity, input modalities, operational
constraints, and customization needs, teams can choose models that enable their agents to
act efficiently, scale reliably, and perform with precision in the real world.
Tools
In agent-based systems,
tools are the fundamental capabilities that enable agents to perform
specific actions or solve problems. Tools represent the functional building blocks of an agent,
providing the ability to execute tasks and interact with both users and other systems. An
agent’s effectiveness depends on the range and sophistication of its tools.
Designing Capabilities for Specific Tasks
Tools are typically tailored to the tasks that the agent is designed to solve. When designing
tools, developers must consider how the agent will perform under different conditions and
contexts. A well-designed toolset ensures that the agent can handle a variety of tasks with
precision and efficiency. Tools can be divided into three main categories:
Local tools
These are actions that the agent performs based on internal logic and computations
without external dependencies. Local tools are often rule-based or involve executing
predefined functions. Examples include mathematical calculations, data retrieval from local
databases, or simple decision making based on predefined rules (e.g., deciding whether to
approve or deny a request based on set criteria).
API-based tools
API-based tools enable agents to interact with external services or data sources. These
tools enable agents to extend their capabilities beyond the local environment by fetching
real-time data or leveraging third-party systems. For instance, a virtual assistant might use
an API to pull weather data, stock prices, or social media updates, enabling it to provide
more contextual and relevant responses to user queries.
Model Context Protocol (MCP)
MCP-based tools enable agents to provide structured, real-time context to language
models using the Model Context Protocol, a standardized schema for passing external
knowledge, memory, and state into the model’s prompt. Unlike traditional API calls that
require full round-trip execution, MCP enables agents to inject rich, dynamic context—such
as user profiles, conversation history, world state, or task-specific metadata—directly into
the model’s reasoning process without invoking separate tools. They are particularly
effective in reducing redundant tool use, preserving conversational state, and injecting
real-time situational awareness into model behavior.

---

## Sección 27: Chapter 2. Designing Agent Systems

-- 47 of 559 --

While local tools enable agents to perform tasks independently using internal logic and rulebased functions, such as calculations or data retrieval from local databases, API-based tools
enable agents to connect with external services. This allows for the access of real-time data
or third-party systems to provide contextually relevant responses and extended functionality.
Tool Integration and Modularity
Modular design is critical for tool development. Each tool should be designed as a selfcontained module that can be easily integrated or replaced as needed. This approach enables
developers to update or extend the agent’s functionality without overhauling the entire
system. A customer service chatbot might start with a basic set of tools for handling simple
queries and later have more complex tools (e.g., dispute resolution or advanced
troubleshooting) added without disrupting the agent’s core operations.
Memory
Memory is an essential component that enables agents to store and retrieve information,
enabling them to maintain context, learn from past interactions, and improve decision making
over time. Effective memory management ensures that agents can operate efficiently in
dynamic environments and adapt to new situations based on historical data. We’ll discuss
memory in much more detail in Chapter 6.
Short-Term Memory
Short-term memory refers to an agent’s ability to store and manage information relevant to
the current task or conversation. This type of memory is typically used to maintain context
during an interaction, enabling the agent to make coherent decisions in real time. A customer
service agent that remembers a user’s previous queries within a session can provide more
accurate and context-aware responses, enhancing user experience.
Short-term memory is often implemented using
rolling context windows, which enable the
agent to maintain a sliding window of recent information while discarding outdated data. This
is particularly useful in applications like chatbots or virtual assistants, where the agent must
remember recent interactions but can forget older, irrelevant details.
Long-Term Memory
Long-term memory, on the other hand, enables agents to store knowledge and experiences
over extended periods, enabling them to draw on past information to inform future actions.
This is particularly important for agents that need to improve over time or provide
personalized experiences based on user preferences.
Long-term memory is often implemented using databases, knowledge graphs, or fine-tuned
models. These structures enable agents to store structured data (e.g., user preferences,
historical performance metrics) and retrieve it when needed. A healthcare monitoring agent
might retain long-term data on a patient’s vital signs, enabling it to detect trends or provide
historical insights to healthcare providers.

-- 48 of 559 --

Memory Management and Retrieval
Effective memory management involves organizing and indexing stored data so that it can be
easily retrieved when needed. Agents that rely on memory must be able to differentiate
between relevant and irrelevant data and retrieve information quickly to ensure seamless
performance. In some cases, agents may also need to forget certain information to avoid
cluttering their memory with outdated or unnecessary details.
An ecommerce recommendation agent must store user preferences and past purchase history
to provide personalized recommendations. However, it must also prioritize recent data to
ensure that recommendations remain relevant and accurate as user preferences change over
time.
Orchestration
Orchestration is what turns isolated capabilities into end-to-end solutions: it’s the logic that
composes, schedules, and supervises a series of skills so that each action flows into the next
and works toward a clear objective. At its core, orchestration evaluates possible sequences of
tool or skill invocations, forecasts their likely outcomes, and picks the path most likely to
succeed in multistep tasks—whether that’s plotting an optimal delivery route that balances
traffic, time windows, and vehicle availability, or assembling a complex data-processing
pipeline.
Because real-world conditions can change in an instant—new information arrives, priorities
shift, or resources become unavailable—an orchestrator must continuously monitor both
progress and environment, pausing or rerouting workflows as needed to stay on course. In
many scenarios, agents build plans incrementally: they execute a handful of steps, then
reassess and update the remaining workflow based on fresh results. A conversational
assistant, for example, might confirm each subtask’s outcome before planning the next,
dynamically adapting its sequence to ensure responsiveness and robustness.
Without a solid orchestration layer, even the most powerful skills risk running at crosspurposes or stalling entirely. We’ll dig into the patterns, architectures, and best practices for
building resilient, flexible orchestration engines in Chapter 5.
Design Trade-Offs
Designing agent-based systems involves balancing multiple trade-offs to optimize
performance, scalability, reliability, and cost. These trade-offs require developers to make
strategic decisions that can significantly impact how the agent performs in real-world
environments. This section explores the critical trade-offs involved in creating effective agent
systems and provides guidance on how to approach these challenges.
Performance: Speed/Accuracy Trade-Offs
A key trade-off in agent design is balancing speed and accuracy. High performance often
enables an agent to quickly process information, make decisions, and execute tasks, but this
can come at the expense of precision. Conversely, focusing on accuracy can slow the agent

---

## Sección 28: Chapter 2. Designing Agent Systems

-- 49 of 559 --

down, particularly when complex models or computationally intensive techniques are
required.
In real-time environments, such as autonomous vehicles or trading systems, rapid decision
making is essential, with milliseconds sometimes making a critical difference; here, prioritizing
speed over accuracy may be necessary to ensure timely responses. However, tasks like legal
analysis or medical diagnostics require high precision, making it acceptable to sacrifice some
speed to ensure reliable results.
A hybrid approach can also be effective, where an agent initially provides a fast, approximate
response and then refines it with a more accurate follow-up. This approach is common in
recommendation systems or diagnostics, where a quick initial suggestion is validated and
improved with additional time and data.
Scalability: Engineering Scalability for Agent Systems
Scalability is a critical challenge for modern agent-based systems, especially those that rely
heavily on deep learning models and real-time processing. As agent systems grow in
complexity, data volume, and task concurrency, it becomes critical to manage computational
resources, particularly GPUs. GPUs are the backbone for accelerating the training and
inference of large AI models, but efficient scaling requires careful engineering to avoid
bottlenecks, underutilization, and rising operational costs. This section outlines strategies for
effectively scaling agent systems by optimizing GPU resources and architecture.
GPU resources are often the most expensive and limiting factor in scaling agent systems,
making their efficient use a top priority. Proper resource management enables agents to
handle increasing workloads while minimizing the latency and cost associated with highperformance computing. A critical strategy for scalability is dynamic GPU allocation, which
involves assigning GPU resources based on real-time demand. Instead of statically allocating
GPUs to agents or tasks, dynamic allocation ensures that GPUs are only used when necessary,
reducing idle time and optimizing utilization.
Elastic GPU provisioning further enhances efficiency, using cloud services or on-premises GPU
clusters that automatically scale resources based on current workloads.
Priority queuing and intelligent task scheduling add another layer of efficiency, giving highpriority tasks immediate GPU access while queuing less critical ones during peak times.
In large-scale agent systems, latency can become a significant issue, particularly when agents
need to interact in real-time or near-real-time environments. Optimizing for minimal latency is
essential for ensuring that agents remain responsive and capable of meeting performance
requirements. Scheduling GPU tasks efficiently across distributed systems can reduce latency
and ensure that agents operate smoothly under heavy loads.
One effective strategy is asynchronous task execution, which enables GPU tasks to be
processed in parallel without waiting for previous tasks to be completed, maximizing GPU
resource utilization and reducing idle time between tasks.
Another strategy is dynamic load balancing across GPUs, which prevents any single GPU from
becoming a bottleneck by distributing tasks to underutilized resources. For agent systems
reliant on GPU-intensive tasks, such as running complex inference algorithms, scaling

-- 50 of 559 --

effectively requires more than simply adding GPUs; it demands careful optimization to ensure
that resources are fully utilized, enabling the system to meet growing demands efficiently.
To scale GPU-intensive systems effectively, it requires more than just adding GPUs—it involves
ensuring that GPU resources are fully utilized and that the system can scale efficiently as
demands grow.
Horizontal scaling involves expanding the system by adding more GPU nodes to handle
increasing workloads. In a cluster setup, GPUs can work together to manage high-volume
tasks such as real-time inference or model training.
For agent systems with varying workloads, using a hybrid cloud approach can improve
scalability by combining on-premises GPU resources with cloud-based GPUs. During peak
demand, the system can use burst scaling, in which tasks are offloaded to temporary cloud
GPUs, scaling up computational capacity without requiring a permanent investment in physical
infrastructure. Once demand decreases, these resources can be released, ensuring costefficiency.
Using cloud-based GPU instances during off-peak hours, when demand is lower and pricing is
more favorable, can significantly reduce operating costs while maintaining the flexibility to
scale up when needed.
Scaling agent systems effectively—particularly those reliant on GPU resources—requires a
careful balance between maximizing GPU efficiency, minimizing latency, and ensuring that the
system can handle dynamic workloads. By adopting strategies such as dynamic GPU
allocation, multi-GPU parallelism, distributed inference, and hybrid cloud infrastructures, agent
systems can scale to meet growing demands while maintaining high performance and cost
efficiency. GPU resource management tools play a critical role in this process, providing the
oversight necessary to ensure seamless scalability as agent systems grow in complexity and
scope.
Reliability: Ensuring Robust and Consistent Agent Behavior
Reliability refers to the agent’s ability to perform its tasks consistently and accurately over
time. A reliable agent must handle expected and unexpected conditions without failure,
ensuring a high level of trust from users and stakeholders. However, improving reliability often
involves trade-offs in system complexity, cost, and development time.
Fault tolerance
One key aspect of reliability is ensuring that agents can handle errors or unexpected events
without crashing or behaving unpredictably. This may involve building in
fault tolerance,
where the agent can detect failures (e.g., network interruptions, hardware failures) and
recover gracefully. Fault-tolerant systems often employ
redundancy—duplicating critical
components or processes to ensure that failures in one part of the system do not affect
overall performance.
Consistency and robustness
For agents to be reliable, they must perform consistently across different scenarios, inputs,
and environments. This is particularly important in safety-critical systems, such as

---

## Sección 29: Chapter 2. Designing Agent Systems

-- 51 of 559 --

autonomous vehicles or healthcare agents, where a mistake could have serious
consequences. Developers must ensure that the agent performs well not only in ideal
conditions but also under edge cases, stress tests, and real-world constraints. Achieving
reliability requires:
Extensive testing
Agents should undergo rigorous testing, including unit tests, integration tests, and
simulations of real-world scenarios. Tests should cover edge cases, unexpected inputs, and
adversarial conditions to ensure that the agent can handle diverse environments.
Monitoring and feedback loops
Reliable agents require continuous monitoring in production to detect anomalies and
adjust their behavior in response to changing conditions. Feedback loops enable agents to
learn from their environment and improve performance over time, increasing their
robustness.
Costs: Balancing Performance and Expense
Cost is an often-overlooked but critical trade-off in the design of agent-based systems. The
costs associated with developing, deploying, and maintaining an agent must be weighed
against the expected benefits and return on investment (ROI). Cost considerations affect
decisions related to model complexity, infrastructure, and scalability.
Development costs
Developing sophisticated agents can be expensive, especially when using advanced machine
learning (ML) models that require large datasets, specialized expertise, and significant
computational resources for training. Additionally, the need for iterative design, testing, and
optimization increases development costs.
Complex agents frequently necessitate a team with specialized talent, including data
scientists, ML engineers, and domain experts, to create high-performing systems. Additionally,
building a reliable and scalable agent system requires extensive testing infrastructure, often
involving simulation environments and investments in testing tools and frameworks to ensure
robust functionality.
Operational costs
After deployment, the operational costs of running agents can become substantial, particularly
for systems requiring high computational power, such as those involving real-time decision
making or continuous data processing. Key contributors to these expenses include the need
for significant compute power, as agents running deep learning models or complex algorithms
often rely on costly hardware like GPUs or cloud services.
Additionally, agents that process vast amounts of data or maintain extensive memory incur
higher costs for data storage and bandwidth. Regular maintenance and updates, including
bug fixes and system improvements, further add to operational expenses as resources are
needed to ensure the system’s reliability and performance over time.

-- 52 of 559 --

Cost versus value
Ultimately, the cost of an agent-based system must be justified by the value it delivers. In
some cases, it may make sense to prioritize cheaper, simpler agents for less critical tasks,
while investing heavily in more sophisticated agents for mission-critical applications. Decisions
around cost must be made in the context of the system’s overall goals and expected lifespan.
Some optimization strategies include:
Lean models
Using simpler, more efficient models where appropriate can help reduce both development
and operational costs. For example, if a rule-based system can achieve similar results to a
deep learning model for a given task, the simpler approach will often be more costeffective.
Cloud-based resources
Leveraging cloud computing resources can reduce up-front infrastructure costs,
establishing a more scalable, pay-as-you-go model.
Open source models and tools
Utilizing open source ML libraries and frameworks can help minimize software
development costs while still delivering high-quality agents.
Designing agent systems involves balancing several critical trade-offs. Prioritizing performance
may require sacrificing some accuracy, while scaling to a multiagent architecture introduces
challenges in coordination and consistency. Ensuring reliability demands rigorous testing and
monitoring but can increase development time and complexity. Finally, cost considerations
must be factored in from both a development and operational perspective, ensuring that the
system delivers value within budget constraints. In the next section, we’ll review some of the
most common design patterns used when building effective agentic systems.
Architecture Design Patterns
The architectural design of agent-based systems determines how agents are structured, how
they interact with their environment, and how they perform tasks. The choice of architecture
influences the system’s scalability, maintainability, and flexibility. This section explores three
common design patterns for agent-based systems—single-agent and multiagent architectures
—and discusses their advantages, challenges, and appropriate use cases. We’ll discuss this in
far more detail in Chapter 8.
Single-Agent Architectures
A single-agent architecture is among the simplest and most straightforward designs, where a
single agent is responsible for managing and executing all tasks within a system. This agent
interacts directly with its environment and independently handles decision making, planning,
and execution without relying on other agents.

---

## Sección 30: Chapter 2. Designing Agent Systems

-- 53 of 559 --

Ideal for well-defined and narrow tasks, this architecture is best suited for workloads that are
manageable by a single entity. The simplicity of single-agent systems makes them easy to
design, develop, and deploy, as they avoid complexities related to coordination,
communication, and synchronization across multiple components. With clear use cases,
single-agent architectures excel in narrow-scope tasks that do not require collaboration or
distributed efforts, such as simple chatbots handling basic customer queries (like FAQs and
order tracking) and task-specific automation for data entry or file management.
Single-agent setups work well in environments where the problem domain is well-defined,
tasks are straightforward, and there is no significant need for scaling. This makes them a fit
for customer service chatbots, general-purpose assistants, and code generation agents. We’ll
discuss single-agent and multiagent architectures much more in Chapter 8.
Multiagent Architectures: Collaboration, Parallelism, and
Coordination
In multiagent architectures, multiple agents work together to achieve a common goal. These
agents may operate independently, in parallel, or through coordinated efforts, depending on
the nature of the tasks. Multiagent systems are often used in complex environments where
different aspects of a task need to be managed by specialized agents or where parallel
processing can improve efficiency and scalability, and they bring many advantages:
Collaboration and specialization
Each agent in a multiagent system can be designed to specialize in specific tasks or areas.
For example, one agent may focus on data collection while another processes the data,
and a third agent manages user interactions. This division of labor enables the system to
handle complex tasks more efficiently than a single agent would.
Parallelism
Multiagent architectures can leverage parallelism to perform multiple tasks simultaneously.
For instance, agents in a logistics system can simultaneously plan different delivery routes,
reducing overall processing time and improving efficiency.
Improved scalability
As the system grows, additional agents can be introduced to handle more tasks or to
distribute the workload. This makes multiagent systems highly scalable and capable of
managing larger and more complex environments.
Redundancy and resilience
Because multiple agents operate independently, failure in one agent does not necessarily
compromise the entire system. Other agents can continue to function or even take over
the failed agent’s responsibilities, improving overall system reliability.
Despite these advantages, multiagent systems also come with significant challenges, which
include:
Coordination and communication

-- 54 of 559 --

Managing communication between agents can be complex. Agents must exchange
information efficiently and coordinate their actions to avoid duplication of efforts,
conflicting actions, or resource contention. Without proper orchestration, multiagent
systems can become disorganized and inefficient.
Increased complexity
While multiagent systems are powerful, they are also more challenging to design, develop,
and maintain. The need for communication protocols, coordination strategies, and
synchronization mechanisms adds layers of complexity to the system architecture.
Lower efficiency
While not always the case, multiagent systems often encounter reduced efficiency due to
higher token consumption when completing tasks. Because agents must frequently
communicate, share context, and coordinate actions, they consume more processing
power and resources compared with single-agent systems. This increased token usage not
only leads to higher computational costs but can also slow task completion if
communication and coordination are not optimized. Consequently, while multiagent
systems offer robust solutions for complex tasks, their efficiency challenges mean that
careful resource management is crucial.
Multiagent architectures are well suited for environments where tasks are complex,
distributed, or require specialization across different components. In these systems, multiple
agents contribute to solving complex, distributed problems, such as in financial trading
systems, cybersecurity investigations, or collaborative AI research platforms.
Single-agent systems offer simplicity and are ideal for well-defined tasks. Multiagent systems
provide collaboration, parallelism, and scalability, making them suitable for complex
environments. Choosing the right architecture depends on the complexity of the task, the
need for scalability, and the expected lifespan of the system. In the next section, we’ll discuss
some principles we can follow to get the best results from the agentic systems we build.
Best Practices
Designing agent-based systems requires more than just building agents with the right models,
skills, and architecture. To ensure that these systems perform optimally in real-world
conditions and continue to evolve as the environment changes, it’s essential to follow best
practices throughout the development lifecycle. This section highlights three critical best
practices—
iterative design,
evaluation strategy, and
real-world testing—that contribute to
creating adaptable, efficient, and reliable agent systems.
Iterative Design
Iterative design is a fundamental approach in agent development, emphasizing the
importance of building systems incrementally while continually incorporating feedback.
Instead of aiming for a perfect solution in the initial build, iterative design focuses on creating
small, functional prototypes that you can evaluate, improve, and refine over multiple cycles.

---

## Sección 31: Chapter 2. Designing Agent Systems

-- 55 of 559 --

This process allows for quick identification of flaws, rapid course correction, and continuous
system improvement, and it has multiple benefits:
Early detection of issues
By releasing early prototypes, developers can identify design flaws or performance
bottlenecks before they become deeply embedded in the system. This enables swift
remediation of issues, reducing long-term development costs and avoiding major refactors.
User-centric design
Iterative design encourages frequent feedback from stakeholders, end users, and other
developers. This feedback ensures that the agent system remains aligned with the users’
needs and expectations. As agents are tested in real-world scenarios, iterative
improvements can fine-tune their behaviors and responses to better suit the users they
serve.
Scalability
Starting with a minimal viable product (MVP) or basic agent enables the system to grow
and evolve in manageable increments. As the system matures, new features and
capabilities can be introduced gradually, ensuring that each addition is thoroughly tested
before full deployment.
To adopt iterative design effectively, development teams should:
Develop prototypes quickly
Focus on building core functionality first. Don’t aim for perfection at this stage—build
something that works and delivers value, even if it’s basic.
Test and gather feedback
After each iteration, collect feedback from users, developers, and other stakeholders. Use
this feedback to guide improvements and decide on the next iteration’s priorities.
Refine and repeat
Based on feedback and performance data, make necessary changes and refine the system
in the next iteration. Continue this cycle until the agent system meets its performance,
usability, and scalability goals.
Effective iterative design involves quickly developing functional prototypes, gathering feedback
after each iteration, and continuously refining the system based on insights to meet
performance and usability goals.
Evaluation Strategy
Evaluating the performance and reliability of agent-based systems is a critical part of the
development process. A robust evaluation ensures that agents are capable of handling realworld scenarios, performing under varying conditions, and meeting performance expectations.
It involves a systematic approach to testing and validating agents across different dimensions,

-- 56 of 559 --

including accuracy, efficiency, robustness, and scalability. This section explores key strategies
for creating a comprehensive evaluation framework for agent systems. We’ll cover
measurement and validation in far more depth in Chapter 9.
A robust evaluation process involves developing a comprehensive testing framework that
covers all aspects of the agent’s functionality. This framework ensures that the agent is
thoroughly tested under a variety of scenarios, both expected and unexpected.
Functional testing focuses on verifying that the agent performs its core tasks correctly. Each
skill or module of the agent should be individually tested to ensure that it behaves as
expected across different inputs and scenarios. Key areas of focus include:
Correctness
Ensuring that the agent consistently delivers accurate and expected outputs based on its
design
Boundary testing
Evaluating how the agent handles edge cases and extreme inputs, such as very large
datasets, unusual queries, or ambiguous instructions
Task-specific metrics
For agents handling domain-specific tasks (e.g., legal analysis, medical diagnostics),
ensuring the system meets the domain’s accuracy and compliance requirements
For agent systems, particularly those powered by ML models, it is essential to evaluate the
agent’s ability to generalize beyond the specific scenarios it was trained on. This ensures the
agent can handle new, unseen situations while maintaining accuracy and reliability.
Agents often encounter tasks outside of their original training domain. A robust evaluation
should test the agent’s ability to adapt to these new tasks without requiring extensive
retraining. This is particularly important for general-purpose agents or those designed to
operate in dynamic environments.
User experience is a key factor in determining the success of agent systems. It’s important to
evaluate not only the technical performance of the agent but also how well it meets user
expectations in real-world applications.
Collecting feedback from actual users provides critical insights into how well the agent
performs in practice. This feedback helps refine the agent’s behaviors, improving its
effectiveness and user satisfaction, and can consist of the following:
User satisfaction scores
Use metrics like net promoter score (NPS) or customer satisfaction (CSAT) to gauge how
users feel about their interactions with the agent.
Task completion rates
Measure how often users successfully complete tasks with the agent’s help. Low
completion rates may indicate confusion or inefficiencies in the agent’s design.

-- 57 of 559 --

Explicit signals
Create opportunities for users to provide their feedback, in such forms as thumbs-up and
thumbs-down, star ratings, and the ability to accept, reject, or modify the generated
results, depending on the context. These signals can provide a wealth of insight.
Implicit signals
Analyze user-agent interactions to identify common points of failure, such as
misinterpretations, delays, sentiment, or inappropriate responses. Interaction logs can be
mined for insights into areas where the agent needs improvement.
In some cases, it’s necessary to involve human experts in the evaluation process to assess the
agent’s decision-making accuracy. Human-in-the-loop validation combines automated
evaluation with human judgment, ensuring that the agent’s performance aligns with realworld standards. When feasible, human experts should review a sample of the agent’s
outputs to verify correctness, ethical compliance, and alignment with best practices, and
these reviews can then be used to calibrate and improve automated evaluations.
We should evaluate agents in environments that closely simulate their real-world applications.
This helps ensure that the system can perform reliably outside of controlled development
conditions. Evaluate the agent across the full spectrum of its operational environment, from
data ingestion and processing to task execution and output generation. End-to-end testing
ensures that the agent functions as expected across multiple systems, data sources, and
platforms.
Real-World Testing
While building agents in a controlled development environment is crucial for initial testing, it’s
equally important to validate agents in real-world settings to ensure they perform as expected
when interacting with live users or environments. Real-world testing involves deploying agents
in actual production environments and observing their behavior under real-life conditions. This
stage of testing enables developers to uncover issues that may not have surfaced during
earlier development stages and to evaluate the agent’s robustness, reliability, and user
impact.
Real-world testing is essential for ensuring agents can manage the unpredictability and
complexity of live environments. Unlike controlled testing, this approach reveals edge cases,
unexpected user inputs, and performance under high demand, helping developers refine the
agent for robust, reliable operation:
Exposure to real-world complexity
In controlled environments, agents operate with predictable inputs and responses.
However, real-world environments are dynamic and unpredictable, with diverse users,
edge cases, and unforeseen challenges. Testing in these environments ensures that the
agent can handle the complexity and variability of real-world scenarios.
Uncovering edge cases

---

## Sección 32: Chapter 2. Designing Agent Systems

-- 58 of 559 --

Real-world interactions often expose edge cases that may not have been accounted for in
the design or testing phases. For example, a chatbot tested with scripted queries might
perform well in development, but when exposed to real users, it may struggle with
unexpected inputs, ambiguous questions, or natural language variations.
Evaluating performance under load
Real-world testing also enables developers to observe how the agent performs under high
workloads or increased user demand. This is particularly important for agents that operate
in environments with fluctuating traffic, such as customer service bots or ecommerce
recommendation engines.
Real-world testing ensures an agent’s readiness for deployment by validating its performance
under real-life conditions. This process involves a phased rollout, continuous monitoring of
key metrics, collecting user feedback, and iteratively refining the agent to optimize its
capabilities and usability:
Deploy in phases
Roll out the agent in stages, starting with small-scale testing in a limited environment
before scaling up to full deployment. This phased approach helps identify and address
issues incrementally, without overwhelming the system or users.
Monitor agent behavior
Use monitoring tools to track the agent’s behavior, responses, and performance metrics
during real-world testing. Monitoring should focus on key performance indicators (KPIs)
such as response time, accuracy, user satisfaction, and system stability.
Collect user feedback
Engage users during real-world testing to gather feedback on their experiences when
interacting with the agent. User feedback is invaluable in identifying gaps, improving
usability, and ensuring that the agent meets real-world needs.
Iterate based on insights
Real-world testing provides valuable insights that should be fed back into the development
cycle. Use these insights to refine the agent, improve its capabilities, and optimize its
performance for future iterations.
Following best practices such as iterative design, agile development, and real-world testing is
critical for building agent-based systems that are adaptable, scalable, and resilient. These
practices ensure that agents are designed with flexibility, thoroughly tested in real-world
conditions, and continuously improved to meet evolving user needs and environmental
challenges. By incorporating these approaches into the development lifecycle, developers can
create more reliable, efficient, and effective agent systems capable of thriving in dynamic
environments.

-- 59 of 559 --

Conclusion
You don’t need a 30-page plan to start building a good agent system—but a little foresight
goes a long way. As we saw with our ecommerce support agent, picking a tractable slice—like
canceling orders—lets you build something small, testable, and immediately useful. Define
what success looks like, avoid vague or over-scoped ambitions, and focus on delivering clear
value quickly.
Effective agent systems are more than a sum of their parts. They depend on strong
architecture, disciplined engineering, and tight feedback loops. Choosing the right structural
pattern sets the stage for scalability and resilience, while iterative development and robust
evaluation ensure your agents improve over time. Best practices like phased rollouts and realworld testing turn promising prototypes—like our simple cancel order agent—into reliable
systems that can be trusted in production.
In Chapter 3, we shift focus to the human side of the equation—how to design agent
experiences that are clear, responsive, and intuitive for the people who rely on them.
Ultimately, no matter how powerful your system architecture, its success depends on how it
lands in human hands.

-- 60 of 559 --

---

## Sección 33: Chapter 3. User Experience

Design for Agentic Systems
As agent systems become an integral part of our digital
environments—whether through chatbots, virtual assistants, or fully
autonomous workflows—the user experience (UX) they deliver plays
a pivotal role in their success. While foundation models and agent
architectures enable remarkable technical capabilities, how users
interact with these agents ultimately determines their effectiveness,
trustworthiness, and adoption. A well-designed agent experience not
only empowers users but also builds confidence, minimizes
frustration, and ensures clarity in agent capabilities and limitations.
The field of agent UX is evolving at an unprecedented pace. New
interface paradigms, modality combinations, and user interaction
models are emerging almost monthly. This chapter provides
foundational design principles that remain relevant even as the
specific technologies and capabilities continue to advance rapidly.
Designing UX for agent systems introduces unique challenges and
opportunities. Agents can interact through a variety of modalities,
including text, graphical interfaces, speech, and even video.

-- 61 of 559 --

T
a
b
l
e
-
.
P
l
a
c
e
h
o
l
d
e
r
Modality Prevalence
Example use
cases
Ideal
situations
Text Very
common
Customer
service
chatbots,
productivity
assistants
When clear,
asynchronous,
or searchable
communication
is needed

-- 62 of 559 --

Graphical user
interfaces
(GUI)
Common Workflow
orchestration
dashboards, AI
coding
assistants like
Cursor
When visual
structure,
context
management,
or multistep
workflows are
important
Speech/voice Less
common
Siri, smart
home
assistants
(Alexa, Google
Home), call
center
automation
When handsfree interaction
or natural
conversation is
required
Video Rare Virtual tutors,
therapy
avatars,
interactive
learning agents
When visual
demonstration,
rich expression,
or immersive
learning is
needed
Another key UX consideration is how the context is managed over
time. Some generative AI applications have no memory or learning,

-- 63 of 559 --

so have precisely the information you present them with in exactly
that session. This requires users to copy and paste information into
the prompt. More modern applications automatically manage this
context for you. For example, Cursor uses the integrated
development environment to intelligently identify code to include in
each model inference. Some applications retain memory over time,
enabling agents to remember past interactions, maintain
conversation flow, and adapt to user preferences over time. Without
these capabilities, even technically advanced agents risk feeling
disjointed or unresponsive. Similarly, communicating agent
capabilities, limitations, and uncertainty is essential for setting
realistic user expectations and preventing misunderstandings. Users
must know what an agent can and cannot do, and when they might
need to intervene or provide guidance.
Finally, trust and transparency remain foundational to positive user
experiences with agent systems. Predictable agent behavior and
clear explanations of actions contribute to building relationships
where users feel confident relying on agents in high-stakes
scenarios.
This chapter explores these core aspects of UX design for agentic
systems, offering principles, best practices, and actionable insights
to help you design interactions that are intuitive, reliable, and
aligned with user needs. Whether you’re building a chatbot, an AIpowered personal assistant, or a fully autonomous workflow agent,
the principles in this chapter will help you create meaningful and
effective experiences that users can trust.
Interaction Modalities
Agent systems interact with users through a variety of modalities,
each offering unique strengths, limitations, and design
considerations. Whether through text, graphical interfaces, speech,
or video, the choice of modality shapes how users perceive and

-- 64 of 559 --

interact with agents. Text-based interfaces excel in clarity and
traceability; graphical interfaces offer visual richness and intuitive
controls; voice interactions provide hands-free convenience; and
video interfaces enable dynamic, real-time communication.
In the next section, we’ll explore these interaction modalities,
examining their key strengths, challenges, and best practices for
delivering exceptional UX in agent systems.
Text-Based
Text-based interfaces are one of the most common and versatile
ways users interact with agent systems—found in everything from
customer service chatbots and command-line tools to productivity
assistants integrated into messaging platforms. Their widespread
adoption can be attributed to their simplicity, familiarity, and ease of
integration into existing workflows. Text interfaces offer a unique
advantage: they can support both synchronous conversations (in
real time) and asynchronous interactions (where users can return to
the conversation at their convenience without losing context).
Additionally, text interactions create a clear and traceable record of
exchanges, enabling transparency, accountability, and easier
troubleshooting when something goes wrong.
In recent years, the text-based modality has undergone a
renaissance driven by the integration of advanced AI capabilities
within terminal environments. Tools like Warp, Claude Code, and
Gemini CLI illustrate this shift vividly. Warp reimagines the traditional
developer terminal by integrating natural language command
translation, intelligent autocompletion, and context-aware
explanations, turning the command line into a collaborative, AIaugmented workspace. To illustrate this trend, Figure 3-1 shows an
example of an AI-enabled terminal interface inspired by modern
tools like Claude Code and Gemini CLI. This demonstration captures
how developers can interact with the terminal using natural

---

## Sección 34: Chapter 3. User Experience

-- 65 of 559 --

language prompts to generate, run, and debug commands
seamlessly, without memorizing complex syntax or flags.
Similarly, Claude Code and Gemini CLI extend natural language
interactions to code generation, execution, and file manipulation
directly within terminal workflows, enabling developers to perform
complex tasks by simply describing their goals in plain English. This
figure highlights how AI is revitalizing the humble terminal,
transforming it from a tool accessible only to those with deep
command-line expertise into an approachable, powerful gateway for
both novice and expert users to interact with systems through
natural language.
This trend reflects a broader rethinking of what text-based interfaces
can achieve. The incredible natural language understanding
capabilities of modern foundation models are making ordinary textbased interactions more powerful than ever before. Where
traditional terminals required precise syntax knowledge and
memorization of command flags, AI terminals now act as
conversational partners, interpreting user intent, suggesting best
practices, and even debugging errors in real time. This shift is
democratizing access to powerful systems operations, scripting, and
data workflows, making the terminal “new again” as an accessible,
intelligent gateway for both novice and expert users.

-- 66 of 559 --

Figure 3-1. AI-enabled terminal interface. A demonstration of an AI-augmented
terminal, where natural language inputs are interpreted into executable
commands. Such interfaces transform the traditional command line into an
intelligent conversational partner for system operations and development
workflows.
However, a key limitation of text-based interfaces is discoverability.
Users often do not know what capabilities the agent supports or how
to phrase commands effectively. Unlike graphical interfaces—where
options, buttons, and menus visually indicate what actions are
possible—text-based interfaces require users to guess or recall
available functionalities. This lack of affordances can lead to
confusion, underutilization of agent capabilities, and user frustration
when their requests fall outside the agent’s supported scope. For

-- 67 of 559 --

example, a user might ask a support chatbot to modify an order
detail that the system does not support, receiving an opaque
rejection rather than guidance toward what is possible.
Designing effective text-based agents therefore requires strategies to
enhance discoverability. Agents should proactively communicate their
supported functions, either through onboarding messages, periodic
capability reminders, or dynamic suggestions during conversation.
For instance, an agent can respond to a greeting not only with “How
can I help you today?” but also with “I can help you cancel orders,
check delivery status, or update your account details.” This approach
ensures users understand the agent’s operational boundaries,
reducing trial-and-error interactions.
Beyond discoverability, text-based design requires careful attention
to clarity, context retention, and error management. Agents should
communicate with concise and unambiguous responses, avoiding
overly technical jargon or long-winded explanations that may
overwhelm the user. Maintaining context across multiturn
conversations is equally important; users should not need to repeat
themselves or clarify past instructions. Effective agents are also
graceful in failure, providing clear error messages and fallback
mechanisms, such as escalating to a human operator or offering
alternative suggestions when they cannot fulfill a request. Turntaking management is another subtle but crucial element—agents
must guide conversations naturally, balancing when to ask follow-up
questions and when to pause for user input.
Ambiguity in natural language remains a significant hurdle, as users
may phrase requests in unexpected ways, requiring robust intent
recognition to avoid misunderstandings. Additionally, text-based
agents are often constrained by response length limits—too short,
and they risk being cryptic; too long, and they risk overwhelming or
frustrating the user. Emotional nuance is another limitation. Without
vocal tone, facial expressions, or visual cues, text-based agents must

-- 68 of 559 --

rely on carefully crafted language to ensure they convey empathy,
friendliness, or urgency where appropriate.
Despite these challenges, text-based agents shine in scenarios
where precision, traceability, and asynchronous communication are
valuable. They excel in customer support, where chatbots provide
quick answers to frequently asked questions, or in productivity tools,
where command-line interfaces help users execute tasks efficiently.
They are equally effective in knowledge retrieval systems, answering
specific questions or pulling data from structured databases.
When designed thoughtfully, text-based agents are reliable,
adaptable, and deeply useful across a wide range of contexts. For
example, text-based agents might be ideal for chat interfaces over
messaging apps—like Slack, Teams, and WhatsApp for scalable
communications with customers or employees—or text-heavy
workloads like customer service, claims processing, or textual
research tasks. Their accessibility and ease of deployment make
them a cornerstone of agentic UX design—provided their limitations
(particularly around discoverability) are mitigated through clear
communication of capabilities, robust error handling, and a focus on
seamless conversational flow.
Graphical Interfaces
Graphical interfaces offer users a visual and interactive way to
engage with agent systems, combining text, buttons, icons, and
other graphical elements to facilitate communication. These
interfaces are particularly effective for tasks requiring visual clarity,
structured workflows, or multistep processes, where pure text or
voice interactions may fall short. Common examples include
dashboard-based AI tools, graphical chat interfaces, and agentpowered productivity platforms with clickable elements.
The key strength of graphical interfaces lies in their ability to present
information visually and reduce cognitive load. Humans primarily rely

---

## Sección 35: Chapter 3. User Experience

-- 69 of 559 --

on visual input and can process visual information more quickly and
easily than text-based information. Well-designed interfaces can
display complex data, status updates, or task progress in an intuitive
and digestible format. Visual cues, such as progress bars, color
coding, and alert icons, guide users effectively without requiring
lengthy explanations.
For example, an agent managing a workflow might use a dashboard
to show pending tasks, completed steps, and error notifications,
enabling users to quickly understand the system’s state at a glance.
Tools like LangSmith, n8n, Arize, and AutoGen are beginning to
illustrate agent workflows visually, making them easier to
understand, debug, and reason about; we are likely to see much
more of this visual orchestration in the future. To see how these
graphical orchestration interfaces are emerging in practice, Figure 32 shows an example of a modern agent workflow builder. Tools like
this illustrate agent actions, tool calls, conditionals, and outputs as
connected visual nodes, enabling developers and operators to easily
understand, debug, and optimize complex agentic flows without
stepping through raw code alone.

-- 70 of 559 --

Figure 3-2. Visual orchestration of an agent workflow in n8n.io. This interface
displays an AI agent integrated with multiple tools, models, and structured parsing
components arranged in a node-based workflow. Such visual designs make it
easier to build, manage, and iterate on multistep agent pipelines at scale.
Similarly, Figure 3-3 shows a modern AI-enabled IDE interface,
similar to tools like Cursor, Windsurf, Cline, and many more. These
environments integrate natural language understanding directly into
the coding workflow, enabling developers to ask questions, generate
code, refactor functions, and receive explanations or performance
optimizations—all within a single, streamlined graphical interface.

-- 71 of 559 --

Figure 3-3. AI-enabled IDE interface. An integrated development environment
(IDE) enhanced with AI capabilities, combining traditional file explorers and code
editors with natural language assistant panels that provide explanations,
debugging suggestions, and autogenerated code improvements.
Together, these examples illustrate the rapid evolution of graphical
agentic UX. As these interfaces mature, they will redefine what
productive, AI-enabled tools look like—not just for developers, but
for every knowledge-intensive profession.
A growing frontier in graphical agent interfaces is the emergence of
generative UIs. Instead of relying solely on static dashboards or
predesigned layouts, generative UIs dynamically create interface
elements, data visualizations, or structured outputs based on user
queries. For example, Perplexity AI not only provides textual answers
but also generates structured knowledge cards, reference lists, and
data tables tailored to the question asked. Similarly, AI coding
copilots generate entire forms, config files, or UI components based
on user intent.

-- 72 of 559 --

Generative UIs combine the flexibility of natural language with the
clarity and discoverability of graphical layouts, enabling agents to
create rich, context-specific interfaces on demand. This expands the
usefulness of graphical agents from predefined workflows to openended tasks where visual structuring enhances understanding.
However, designing generative UIs introduces new challenges:
ensuring the generated elements are usable and aesthetically
coherent, and that they do not overwhelm users with poorly
organized or excessive information. Careful design patterns, layout
constraints, and prioritization logic are critical to keep generative UIs
effective and user-friendly.
Designing effective graphical agent interfaces also comes with
traditional challenges. Screen real estate is limited, requiring
prioritization of displayed information to ensure critical details are
not buried in clutter. Agents must manage interface responsiveness
—users expect real-time updates and smooth transitions between
states, especially when agents operate asynchronously. Additionally,
graphical elements must adapt gracefully across devices and screen
sizes, ensuring consistency whether viewed on a desktop, tablet, or
mobile phone.
Another critical consideration is the balance between automation and
user control. Graphical interfaces often blend agent autonomy with
user-driven actions, such as approving agent-suggested decisions or
manually overriding recommendations. For example, an agent
suggesting a calendar change might display multiple options through
buttons, giving users a clear and efficient way to make a final
decision.
Graphical interfaces excel in use cases where data visualization,
structured interactions, and clear status updates are essential.
Examples include task management dashboards, data analytics tools
powered by AI agents, ecommerce product recommendation
systems with filters and visual previews, and generative UI systems
that dynamically produce structured outputs tailored to user

---

## Sección 36: Chapter 3. User Experience

-- 73 of 559 --

questions. They are particularly effective in hybrid workflows where
agents operate in the background but present updates or options
visually for user confirmation.
When implemented thoughtfully, graphical and generative interfaces
enable clear, efficient, and satisfying interactions with agents. They
reduce ambiguity, improve task clarity, and offer users a tangible
sense of control. By focusing on clarity, responsiveness, intuitive
design patterns, and the emerging potential of generative UI
capabilities, graphical interfaces ensure that agent interactions feel
smooth, transparent, and aligned with user expectations.
Graphical interfaces excel in use cases where data visualization,
structured interactions, and clear status updates are essential.
Recent years have seen enormous growth in tools like Lovable,
Cursor, Windsurf, and GitHub Copilot, which offer high-quality GUIs
that manage context and complex multistep operations with
remarkable fluidity. These tools are redefining what productive,
agent-enabled interfaces look like for developers. It is time to think
just as hard about what the next generation of AI-enabled, agentic
UX will be for other professions—lawyers, accountants, insurance
professionals, product managers, and knowledge workers. The
future of work may not revolve around documents, spreadsheets,
and slide decks, but around interactive, agent-driven interfaces
purpose-built for decision making, analysis, and creation.
Speech and Voice Interfaces
Speech and voice interfaces offer users a natural and hands-free
way to interact with agent systems, leveraging spoken language as
the primary mode of communication. From virtual assistants like
Amazon’s Alexa and Apple’s Siri to customer service voice bots,
these interfaces excel in scenarios where manual input is impractical
or impossible—such as while driving, cooking, or operating
machinery. They also provide an accessible option for users with

-- 74 of 559 --

visual impairments or limited mobility, making agent systems more
inclusive.
Historically, latency has been a major barrier for speech and voice
interfaces. Processing spoken language in real time—including
transcribing speech, interpreting intent, and generating appropriate
responses—often led to delays that disrupted conversational flow
and made voice interfaces feel clunky or robotic. However, the past
two years have seen astonishing advances in this space. New lowlatency speech recognition models, combined with more efficient
language processing architectures, have dramatically reduced
delays. Equally important, the
fluidity and
capability of voice AI
systems have improved, enabling more natural-sounding interactions
that can handle interruptions, mid-sentence corrections, and shifts in
conversation topic.
Graceful handling of interruptions is a particularly important aspect
of voice interface design. Human conversations are rarely linear
monologues; people interrupt themselves to clarify, change direction,
or refine a request mid-sentence. Effective voice agents must mirror
this conversational flexibility, allowing users to interrupt commands
without confusion, revise their inputs seamlessly, and resume where
they left off without forcing a complete restart. For example, a user
might say, “Book me a table for—oh wait, make that tomorrow
instead,” and a well-designed agent will adapt fluidly to incorporate
the correction without requiring the user to start the command
again. This capability not only makes interactions feel more natural
but also builds trust and reduces frustration, as users feel the agent
is responsive to their real communication patterns rather than
demanding rigid, computer-like inputs.
Another major leap has been the integration of tool use into voice
agent workflows. Modern voice agents are no longer limited to
parsing commands and returning static answers. Instead, they can
now pull in external context, update records, and take real-time
actions—such as scheduling appointments, changing system

-- 75 of 559 --

configurations, or placing orders—based on dynamic conversational
inputs. This ability to combine natural voice interaction with
structured backend operations is transforming what voice agents can
achieve.
Despite these impressive technological advances, it is important to
note that voice interfaces remain a frontier technology. It is true that
they have entered mainstream use in smart speakers and simple
assistants. However, fully conversational, multiturn, context-aware
voice agents with action-taking capabilities are not yet widely
deployed across industries. Many enterprises are only beginning to
explore voice interfaces for customer service, healthcare, logistics,
and field operations.
A key consideration in deploying voice interfaces is understanding
the speed at which humans process spoken versus written
information. Humans typically speak at 150–180 words per minute,
whereas reading speeds average 250–300 words per minute, with
skimming speeds exceeding 500 words per minute. This means
spoken interfaces are inherently slower for dense or complex
information, where text-based interfaces enable faster
comprehension and easier reference. However, voice excels in
scenarios where hands-free convenience, natural interaction, and
immediate contextual responsiveness outweigh these speed
constraints.
The following example demonstrates a minimal FastAPI server using
the OpenAI Realtime Voice API. It streams microphone audio from a
browser to the agent and plays back the assistant’s audio responses
in real time. Notably, it handles interruptions gracefully: if the user
starts speaking mid-response, it immediately truncates the
assistant’s output to keep the conversation natural. This compact
implementation shows the core architecture for building low-latency,
interruption-aware voice interfaces with agents:

---

## Sección 37: Chapter 3. User Experience

-- 76 of 559 --

import os, json, base64, asyncio, websockets
from fastapi import FastAPI, WebSocket
from dotenv import load_dotenv
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
VOICE = "alloy" # GPT-4o voice
PCM_SR = 16000 # sample-rate
we'll use client-side
PORT = 5050
app = FastAPI()
@app.websocket("/voice")
async def voice_bridge(ws: WebSocket) -> None:
"""
1. Browser opens ws://host:5050/voice
2. Browser streams base64-encoded 16-bit mono PCM
chunks: {"audio": "<b64>"}
3. We forward chunks to OpenAI Realtime
(`input_audio_buffer.append`)
4. We relay assistant audio deltas back to the browser
the same way
5. We listen for 'speech_started' events and send a
truncate if
user interrupts
"""
await ws.accept()
openai_ws = await websockets.connect(
"wss://api.openai.com/v1/realtime?" +
"model=gpt-4o-realtime-preview-2024-10-01"
(split across two lines)
extra_headers={
"Authorization": f"Bearer {OPENAI_API_KEY}",
"OpenAI-Beta" : "realtime=v1"
},
max_size=None, max_queue=None # unbounded for demo
simplicity
)
# initialize the realtime session
await openai_ws.send(json.dumps({

-- 77 of 559 --

"type": "session.update",
"session": {
"turn_detection": {"type": "server_vad"},
"input_audio_format": f"pcm_{PCM_SR}",
"output_audio_format": f"pcm_{PCM_SR}",
"voice": VOICE,
"modalities": ["audio"],
"instructions": "You are a concise AI
assistant."
}
}))
last_assistant_item = None # track current
assistant response
latest_pcm_ts = 0 # ms timestamp from
client
pending_marks = []
async def from_client() -> None:
"""Relay microphone PCM chunks from browser →
OpenAI."""
nonlocal latest_pcm_ts
async for msg in ws.iter_text():
data = json.loads(msg)
pcm = base64.b64decode(data["audio"])
latest_pcm_ts += int(len(pcm) / (PCM_SR * 2) *
1000)
await openai_ws.send(json.dumps({
"type": "input_audio_buffer.append",
"audio":
base64.b64encode(pcm).decode("ascii")
}))
async def to_client() -> None:
"""Relay assistant audio + handle interruptions."""
nonlocal last_assistant_item, pending_marks
async for raw in openai_ws:
msg = json.loads(raw)
# assistant speaks
if msg["type"] == "response.audio.delta":
pcm = base64.b64decode(msg["delta"])
await ws.send_json({"audio":

-- 78 of 559 --

base64.b64encode(pcm).decode("ascii")})
last_assistant_item = msg.get("item_id")
# user started talking → cancel assistant
speech
started = "input_audio_buffer.speech_started"
if msg["type"] == started and
last_assistant_item:
await openai_ws.send(json.dumps({
"type": "conversation.item.truncate",
"item_id": last_assistant_item,
"content_index": 0,
"audio_end_ms": 0 # stop immediately
}))
last_assistant_item = None
pending_marks.clear()
try:
await asyncio.gather(from_client(), to_client())
finally:
await openai_ws.close()
await ws.close()
if __name__ == "__main__":
import uvicorn
uvicorn.run("realtime_voice_minimal:app",
host="0.0.0.0", port=PORT)
Looking ahead, we are likely to see significant adoption of advanced
voice interfaces in the coming years, driven by falling costs, reduced
latency, improved speech recognition, and better orchestration with
backend tools. In healthcare, voice agents can assist doctors with
hands-free note-taking during patient consultations. In customer
service, they are replacing rigid interactive voice response (IVR)
systems with fluid, humanlike conversations that resolve issues end
to end. In industrial applications, workers can control machinery, log
observations, or access manuals without stopping their tasks.
Ultimately, voice interfaces are most effective for short, hands-free
tasks, quick queries, and action-oriented workflows, rather than for

-- 79 of 559 --

dense information consumption or complex decision making that
requires rapid skimming or side-by-side comparison.
When thoughtfully designed, speech and voice interfaces offer
unparalleled convenience, accessibility, and flexibility in agent
interactions. As these technologies continue to mature and integrate
deeply with backend tools and knowledge systems, they are poised
to become indispensable in daily workflows, personal assistants, and
enterprise solutions—fundamentally transforming how users interact
with AI-powered agents.
Video-Based Interfaces
Video-based interfaces are an emerging modality for agent
interactions, blending visual, auditory, and sometimes textual
elements into a single cohesive experience. These interfaces can
range from video avatars that simulate face-to-face conversations to
agents embedded in real-time video collaboration tools. As video
becomes more pervasive in our digital lives—through platforms like
Zoom, Microsoft Teams, and virtual event spaces—agents are finding
new ways to integrate into these environments. While many of these
experiences are still in the uncanny valley, the rapid pace of
improvement suggests that this technology is getting closer to prime
time, and more teams will begin building experiences around it.
One of the core strengths of video interfaces is their ability to
combine multiple sensory channels—visual cues, speech, text
overlays, and animations—into a richer, more expressive interaction.
Video agents can mimic humanlike expressions and gestures, adding
emotional nuance to their communication. For example, an AIpowered customer service avatar might use facial expressions and
hand gestures to reassure a frustrated customer, complementing its
spoken responses with visual empathy.
However, video interfaces come with technical and design
challenges. High-quality video interactions require significant

---

## Sección 38: Chapter 3. User Experience

-- 80 of 559 --

processing power and bandwidth, which can introduce lag or
pixelation, undermining the user experience. The uncanny valley
remains a risk—if an agent’s facial expressions, gestures, or lipsyncing feel slightly off, it can create discomfort rather than
engagement. Additionally, privacy concerns are amplified with video
agents, as users may feel uneasy about sharing visual data with AI
systems.
Looking ahead, video interfaces are poised for significant growth,
especially as improvements in rendering, real-time animation, and
bandwidth optimization address current limitations. In the near
future, expect to see agents embedded seamlessly into virtual
meetings, augmented reality (AR) overlays, and digital customer
service avatars.
When thoughtfully executed, video interfaces offer an engaging,
humanlike dimension to agent interactions, enhancing clarity,
emotional connection, and overall effectiveness. As technology
advances, video-based agents are set to play a larger role in
industries such as telehealth, education, remote collaboration, and
interactive entertainment, reshaping how humans and agents
communicate in immersive digital spaces.
Combining Modalities for Seamless
Experiences
While each interaction modality—text, graphical interfaces, voice,
and video—has its own strengths and limitations, the most
compelling agentic experiences often combine multiple modalities
into a single, cohesive user journey. Users don’t think in terms of
modality boundaries; they simply want to achieve their goals as
effortlessly and naturally as possible. The ability to move seamlessly
across modalities—maintaining state and context throughout—is a
hallmark of great agent system design.

-- 81 of 559 --

For example, a user might begin interacting with an agent via voice
while driving, continue the conversation on their phone through text
while walking into a meeting, and later review a graphical dashboard
summarizing results on their laptop. In another scenario, a voice
assistant might read out a summary of an analytics report before
emailing a detailed, text-based version with accompanying charts for
later reference. This fluid transition between modalities preserves
user context, respects situational constraints, and delivers the right
interaction style at each moment.
Designing for modality fluidity requires careful state management
and context persistence so that information, task progress, and user
preferences are never lost in transition. Agents must also adapt their
communication style to suit each modality—for example, delivering
concise spoken summaries while providing more detailed textual
outputs for review.
This is an exciting time for the field of human-computer interaction.
Recent advances in foundation models, multimodal architectures,
and agent orchestration are unlocking entirely new ways of
interacting with intelligent systems. For the first time, it is technically
feasible to build agents that engage users across text, voice, images,
and video in a single, unified workflow.
However, while the technology frontier is expanding rapidly, it is
critical to remember that core UX and product principles remain
unchanged. Building successful agent experiences isn’t about
showcasing the latest modality integrations or generative UI
capabilities for their own sake. It is about understanding users
deeply, meeting them where they are, and creating intuitive,
trustworthy, and delightful experiences that solve real problems in
their lives.
The best products are not those that merely demonstrate
technological sophistication, but those that use technology to amplify
human capability in elegant and unobtrusive ways. As we continue

-- 82 of 559 --

to push the boundaries of modality design, let us stay grounded in
the timeless goal of great product design: creating tools that people
love to use, that make their lives easier, and that empower them to
achieve what matters most.
The Autonomy Slider
A critical yet often overlooked dimension in UX design is the level of
autonomy granted to agents. As Andrej Karpathy described, effective
agentic systems should allow users to smoothly adjust an agent’s
autonomy—from fully manual control to partial automation to fully
autonomous operation. This concept, often called an autonomy
slider, empowers users to choose how much control they wish to
retain versus delegate at any given time. Figure 3-4 illustrates a
simple example of an autonomy slider interface, enabling users to
set the agent to “Manual,” “Ask,” or “Agent” mode depending on
their task, trust, and context.
Figure 3-4. The autonomy slider enables users to adjust an agent’s level of
independence, ranging from fully manual control, to assisted “Ask” mode, to fully
autonomous agent execution. This flexibility builds user trust by aligning system
behavior with user preferences, task complexity, and context.
Different users, tasks, and contexts demand different degrees of
agent autonomy. In some situations, users prefer full manual control
to ensure precision, while in others, they may want to offload

---

## Sección 39: Chapter 3. User Experience

-- 83 of 559 --

routine or complex tasks entirely to the agent. Critically, these
preferences are not static; they evolve with user trust, task
familiarity, stakes, and workload. For example:
Manual
The developer writes all code themselves without agent
assistance. The IDE acts purely as an editor with syntax
highlighting and linting but no AI-driven suggestions.
Ask (assisted)
The agent proactively suggests code completions, refactors, or
documentation snippets, but the developer reviews and accepts
each suggestion before it is applied. This mode speeds up
development while keeping the human fully in control.
Agent
The agent autonomously performs certain tasks, such as applying
standard refactors, fixing linter errors, or generating boilerplate
code files based on project conventions without requiring
individual approvals. The developer is notified of changes but
does not need to approve each action.
These three modes demonstrate how an autonomy slider empowers
developers to balance control and efficiency within a single interface.
The same principle applies beyond software development. For
example, in a customer support platform:
Manual
Human agents handle all incoming customer queries themselves.
The AI is inactive or used only for backend analytics, not frontline
interactions.
Ask (assisted)

-- 84 of 559 --

The agent drafts suggested replies to customer messages,
surfacing recommended responses, policy references, or
troubleshooting steps. The human agent reviews, edits if
necessary, and approves the reply before sending. This
accelerates response time while maintaining human judgment.
Agent
The agent autonomously handles routine queries—such as
password resets, order tracking, or FAQs—without human
intervention, escalating only complex or sensitive issues to
human agents. Users are notified of agent actions but do not
need to approve each message for standard interactions.
These three modes coexist within the same customer support
system, empowering teams to adjust autonomy based on query
complexity, customer profile, and organizational trust in AI. This
same autonomy slider pattern can extend to any field where
workflows benefit from fluidly shifting between manual execution, AI
assistance, and full agentic automation. This spectrum of autonomy
must be consciously designed into agent experiences. Without it,
agents risk feeling either underpowered (if they require too much
manual input) or overbearing (if they act without user consent in
sensitive contexts). To integrate an autonomy slider effectively,
consider the following design principles:
Expose degrees of autonomy clearly
Users should understand the available levels of agent
independence, from manual to assisted to autonomous. Label
these modes in intuitive language, such as “Manual,” “Assist,” and
“Auto,” and explain their implications.
Enable seamless transitions
Users must be able to shift between autonomy levels effortlessly
as their confidence, context, or workload changes. For instance,

-- 85 of 559 --

a toggle or slider in the interface should offer a quick transition
from review mode to auto-approve mode.
Provide predictable and transparent behavior at each level
Each autonomy level should have well-defined behaviors. In
partial automation, for example, the agent may draft an output
but require explicit user approval before execution. In full
autonomy, it should still provide status updates and options to
intervene.
Communicate the risks and benefits of each level
Users should be aware of what they gain or risk by increasing
agent autonomy. For critical tasks, it may be advisable to require
an explicit user confirmation before enabling full autonomy.
Adapt autonomy based on user trust and competence
Intelligent systems can gradually suggest higher autonomy levels
as users gain trust and as the agent demonstrates reliability. For
example, after 10 successful uses in manual mode, the system
might suggest trying assist mode to save time.
Importantly, the autonomy slider is not merely a feature—it is a
trust-building mechanism. By giving users control over how much
autonomy an agent exercises, systems communicate respect for user
expertise and agency. It avoids the common pitfall of “one-size-fitsall” autonomy that either overwhelms or underutilizes user potential.
Always ask: how easily can my users move between manual,
assisted, and fully autonomous modes? The answer to this question
will shape whether your agent is adopted as a reliable partner or
sidelined as an untrusted tool.

-- 86 of 559 --

Synchronous Versus Asynchronous Agent
Experiences
Agent systems can operate in synchronous or asynchronous modes,
each offering distinct advantages and challenges. In synchronous
experiences, interactions occur in real time, with immediate backand-forth exchanges between the user and the agent. These
experiences are common in chat interfaces, voice conversations, and
real-time collaboration tools, where quick responses are essential for
maintaining flow and engagement. In contrast, asynchronous
experiences enable agents and users to operate independently, with
communication occurring intermittently over time. Examples include
email-like interactions, task notifications, or agent-generated reports
delivered after a process has completed.
The choice between synchronous and asynchronous designs
depends heavily on the nature of the task, user expectations, and
operational context. While synchronous agents excel in tasks
requiring instant feedback or live decision making, asynchronous
agents are better suited for workflows where tasks may take longer,
require background processing, or don’t demand the user’s constant
attention. Striking the right balance between these modes—and
managing when agents proactively engage users—can greatly
influence user satisfaction and the overall effectiveness of the
system. Both are useful and valid patterns, but it is highly
recommended to choose which experiences fall into which category,
so that users do not end up waiting for a pinwheel to spin.
Design Principles for Synchronous Experiences
Synchronous agent experiences thrive on immediacy, clarity, and
responsiveness. Users expect agents in these settings to respond
quickly and maintain conversation flow and context without
noticeable delays. Whether in a live chat, voice call, or real-time data
dashboard, synchronous interactions demand low latency and

---

## Sección 40: Chapter 3. User Experience

-- 87 of 559 --

context awareness to avoid frustrating pauses or repetitive
questions.
Agents in synchronous environments should prioritize clarity and
brevity in their responses. Long-winded explanations or overly
complex outputs can break the rhythm of real-time interactions.
Additionally, turn-taking mechanics—knowing when to respond,
when to wait, and when to escalate—are critical for maintaining a
natural and productive conversation flow. Visual cues, like typing
indicators or progress spinners, can reassure users that the agent is
actively processing their input.
Error handling is equally important in synchronous designs. Agents
must gracefully recover from misunderstandings or failures without
derailing the interaction. When uncertainty arises, synchronous
agents should ask clarifying questions or gently redirect users rather
than making risky assumptions. These principles create a smooth,
intuitive experience that keeps users engaged and maintains context
without unnecessary friction.
Design Principles for Asynchronous
Experiences
Asynchronous agent experiences prioritize flexibility, persistence, and
clarity over time. These interactions often occur in contexts where
immediate responses aren’t necessary, such as when agents are
processing long-running tasks, preparing detailed reports, or
monitoring background events.
Effective asynchronous agents must excel at clear communication of
task status and outcomes. Users should always understand what the
agent is doing, what stage a task is in, and when they can expect an
update. Notifications, summaries, and well-structured reports
become key tools for maintaining transparency. For example, an
agent generating an analytical report might notify the user when

-- 88 of 559 --

processing begins, provide an estimated completion time, and
deliver a concise, actionable summary when finished.
Context management is another critical design principle for both
asynchronous and synchronous agents. Because there may be long
delays between user-agent interactions, agents must retain and
reference historical context seamlessly. Users shouldn’t need to
repeat information or retrace previous steps when returning to an
ongoing task. We’ll cover this in more detail in Chapter 6 on
memory.
Lastly, asynchronous agents must manage user expectations
effectively. Clear timelines, progress indicators, and follow-up
notifications prevent frustration caused by uncertainty or lack of
visibility into an agent’s work.
Finding the Balance Between Proactive and
Intrusive Agent Behavior
One of the most delicate aspects of agent design—whether
synchronous or asynchronous—is determining when and how agents
should proactively engage users. Proactivity can be immensely
helpful, such as when an agent alerts a user to an urgent issue,
suggests an optimization, or provides a timely reminder. However,
poorly timed notifications or intrusive behaviors can frustrate users,
disrupt their workflow, or even cause them to disengage entirely.
The key to balancing proactivity lies in context awareness and user
control. Agents should understand the user’s current focus, level of
urgency, and communication preferences. For instance, a proactive
alert during a high-stakes video meeting might be more disruptive
than helpful, while a notification about a completed task delivered
via email might be perfectly appropriate.
Agents should also prioritize relevance when proactively reaching
out. Notifications and suggestions must add genuine value—solving

-- 89 of 559 --

problems or providing insights rather than adding noise. Additionally,
users should have control over notification frequency, channels, and
escalation thresholds, enabling them to customize agent behavior to
suit their needs.
Striking this balance isn’t just about technical capability—it’s about
empathy for the user’s workflow and mental state. Well-designed
agents seamlessly weave proactive engagement into their
interactions, enhancing productivity and reducing friction without
becoming overbearing.
Context Retention and Continuity
Ensuring context retention and continuity across user interactions is
an important aspect of designing effective agent systems. Whether
an agent is guiding a user through a multistep workflow, continuing
a paused conversation, or adjusting its behavior based on past
interactions, its ability to maintain context directly impacts usability,
efficiency, and user trust.
While context retention is a technical capability, it is fundamentally a
UX consideration because it determines whether users experience
the agent as a cohesive, attentive collaborator or as a disconnected
tool that forces them to repeat themselves. From the user’s
perspective, memory creates a sense of continuity, personalization,
and intelligence. If an agent remembers previous interactions, user
preferences, or in-progress tasks, it can seamlessly continue
conversations and workflows, reducing cognitive load and
frustration.
Implementation approaches directly shape UX. A purely client-side
context (e.g., stored in browser memory) may feel fast within a
session but loses continuity across devices or logins, undermining
seamless UX. A purely server-side context (e.g., stored in a database
tied to user ID) enables long-term memory and cross-device
experiences but can introduce latency or privacy considerations. A

---

## Sección 41: Chapter 3. User Experience

-- 90 of 559 --

hybrid approach—maintaining short-term context on the client side
for responsiveness and persisting long-term context on the server
side for continuity—often achieves the best UX balance. Choosing
the right strategy depends on the user journey, privacy
requirements, and level of personalization intended. Ultimately,
context is UX: it is how an agent remembers, adapts, and responds
in ways that make it feel human-centered and supportive rather than
stateless or mechanical.
Effective context retention requires agents to manage both shortterm and long-term memory effectively. Short-term memory enables
an agent to hold details within an ongoing session, such as
remembering the specifics of a question or instructions given
moments earlier. Long-term memory, on the other hand, enables
agents to retain preferences, past interactions, and broader user
patterns across multiple sessions, enabling them to adapt over time.
However, context management introduces challenges. Data
persistence, privacy concerns, and memory limitations must all be
carefully addressed. If an agent loses track of context mid-task, the
user experience can feel disjointed, repetitive, and frustrating.
Conversely, if an agent retains too much context or stores
unnecessary details, it risks becoming unwieldy or even breaching
user privacy.
In the next section, we’ll explore two key facets of context retention
and continuity: maintaining state across interactions, and
personalization and adaptability—both essential for delivering fluid,
intuitive, and user-centric agent experiences.
Maintaining State Across Interactions
State management is the foundation of context continuity in agent
systems. For an interaction to feel seamless, an agent must
accurately track what has happened so far, what the user intends to
achieve, and what the next logical step is. This is particularly

-- 91 of 559 --

important in multiturn conversations, task handoffs, and workflows
with intermediate states, where losing context can result in
frustration, inefficiency, and abandonment of tasks.
Effective state management depends on how the system identifies
and tracks users or sessions. For logged-in users, state can be tied
directly to their user accounts, enabling memory persistence across
devices and sessions. For anonymous interactions, maintaining
context typically requires a session identifier—such as a cookie or
token—to track the conversation between the client and server.
As agent systems scale to thousands or millions of users, session
state should not reside only in memory. Persisting state in a
database or distributed cache ensures continuity across server
restarts, enables load balancing, and supports multidevice
experiences. The choice between user-based memory (persistent,
personalized) and session-based memory (ephemeral, sessionscoped) depends on your application’s privacy requirements, user
expectations, and operational architecture. Regardless of
implementation, robust identification and storage strategies are
fundamental to delivering seamless, context-aware agent
experiences at scale.
Agents can maintain state through short-term session memory,
where details of the ongoing interaction—such as a user’s recent
commands or incomplete tasks—are temporarily stored until the
session ends. In more advanced systems, persistent state
management enables agents to resume tasks across multiple
sessions so that users can pick up where they left off, even after
hours or days have passed.
Effective state retention requires clear session boundaries, data
validation, and fallback mechanisms. If an agent forgets context, it
should gracefully recover by asking clarifying questions rather than
making incorrect assumptions. Additionally, state data must be

-- 92 of 559 --

managed securely and responsibly, especially when it involves
sensitive or personally identifiable information.
When done well, maintaining state enables agents to guide users
through complex tasks without unnecessary repetition, reduce
cognitive load, and create a sense of ongoing collaboration. Whether
an agent is helping a user book travel accommodations, troubleshoot
a technical issue, or manage a multistep approval process, effective
state management ensures interactions remain smooth, logical, and
productive.
Personalization and Adaptability
Personalization goes beyond merely remembering context—it
involves using past interactions and preferences to tailor the agent’s
behavior, responses, and recommendations to individual users. An
adaptable agent doesn’t just maintain state; it learns from previous
exchanges to deliver increasingly refined and relevant outcomes.
Personalization can take multiple forms:
Preference retention
Remembering user settings, such as notification preferences or
commonly chosen options
Behavioral adaptation
Adjusting response style or interaction flow based on observed
user patterns
Proactive assistance
Anticipating user needs and offering suggestions based on past
behavior
For example, an agent assisting with project management might
recognize a user’s preferred task-tracking style and adapt its

---

## Sección 42: Chapter 3. User Experience

-- 93 of 559 --

notifications or summaries accordingly. Similarly, a customer service
agent might adjust its tone and verbosity based on whether the user
prefers concise answers or detailed explanations.
However, personalization comes with challenges. Privacy concerns
must be carefully managed, with transparent communication about
what data is being stored and how it is being used. Additionally,
agents must strike a balance between being helpfully adaptive and
overly persistent—users should always have the option to reset or
override personalized settings.
The best personalization feels invisible yet impactful, where the
agent subtly improves the user experience without drawing attention
to its adjustments. At its peak, personalization creates an experience
where users feel understood and supported, as if the agent is a
thoughtful collaborator rather than a mechanical tool.
Communicating Agent Capabilities
One of the most critical aspects of designing effective agent
experiences is ensuring users understand what the agent can do and
how to interact with it effectively. While backend agent design
determines what functions an agent supports, the user experience
determines whether those capabilities are discoverable, intuitive, and
usable in practice. In traditional applications, discoverability is
straightforward: menus, buttons, and interface elements visually
communicate available actions. In agentic systems, especially those
using text or voice interfaces, the absence of visible affordances
often leaves users guessing what the agent can and cannot do.
Effective agent UX addresses this challenge by proactively
communicating capabilities through the interface itself. For example,
many chat-based agents include suggested action buttons below the
input field, highlighting common or contextually relevant actions
such as “Track order,” “Generate summary,” or “Create meeting
note.” These buttons serve as visual affordances, guiding users

-- 94 of 559 --

toward supported workflows without requiring them to remember
specific commands or guess what is possible. Similarly, onboarding
tutorials or first-use walkthroughs can introduce users to an agent’s
core functions, helping them build confidence early on.
Another useful pattern is the inclusion of expandable menus or
capability cards that list available functions in a structured way. In a
graphical agent interface, for instance, a sidebar might contain
sections for data retrieval, analysis, summarization, and workflow
automation. This mirrors the menu structures that users expect in
traditional apps while communicating the breadth of agent
capabilities upfront. Dynamic suggestions, where the system
recommends actions based on user input, also help bridge the gap
between open-ended natural language and structured tool
invocation. If a user begins typing “book…,” the agent might suggest
“Book meeting with [name],” “Book conference room,” or “Book
travel,” anticipating intent and making actions easier to execute.
In systems relying primarily on open-ended text input, agents
themselves must communicate their capabilities clearly in
conversation. This can include proactive introductions when a
session begins, such as: “Hi, I can help you generate content,
analyze data, or summarize documents. What would you like to do
today?” When users request actions beyond current capabilities, the
agent should not simply reject the request but provide alternatives:
“I can’t process payments directly, but I can update your billing
preferences or connect you with an agent who can assist.” Such
responses reduce user frustration while reinforcing the agent’s utility.
While it is important to surface capabilities, it is equally critical not to
overwhelm users with too many options at once. Effective designs
prioritize progressive disclosure, showing core capabilities initially
and revealing advanced features as users become more comfortable.
Contextual relevance also plays a key role. Displaying the most likely
actions based on current user inputs, historical behavior, or workflow
stage ensures the agent feels supportive rather than cluttered. Visual

-- 95 of 559 --

grouping and clear hierarchy within menus or suggested actions help
users navigate available options efficiently.
These principles apply across modalities. In text-based chat
interfaces, quick-reply buttons and example prompts improve clarity.
In graphical dashboards, capability menus and tooltips communicate
functions without crowding the interface. Voice agents must balance
brevity with clarity, listing only a few high-priority options at a time
to avoid cognitive overload. Generative UI systems can combine
natural language and dynamically generated visual outputs to make
available capabilities immediately visible and actionable.
Ultimately, communicating agent capabilities is not merely about
stating what the agent can do; it is about designing an experience
that empowers users to harness those capabilities confidently and
efficiently. When users understand an agent’s scope and limitations,
they are far more likely to engage productively, trust its outputs, and
integrate it into their workflows. Thoughtful UX design turns invisible
functions into visible affordances, transforming agents from opaque
black boxes into transparent, collaborative digital partners.
Communicating Confidence and Uncertainty
Agents often operate in probabilistic environments, generating
outputs based on statistical models rather than deterministic rules.
As a result, not every response or action carries the same degree of
confidence. Communicating uncertainty effectively is essential for
building user trust and helping users make informed decisions.
Confidence levels can be expressed in several ways:
Explicit statements
“I’m 90% certain this is the correct answer.”
Visual cues

---

## Sección 43: Chapter 3. User Experience

-- 96 of 559 --

Icons, color-coded alerts, or confidence meters in graphical
interfaces.
Behavioral adjustments
Offering suggestions rather than firm recommendations when
confidence is low.
Agents must avoid appearing overly confident when uncertainty is
high—users are quick to lose trust if an agent confidently delivers an
incorrect or misleading response. Similarly, excessive hedging in lowstakes interactions can make an agent appear hesitant or unreliable.
Communicating confidence and uncertainty isn’t just about sharing
probabilities; it’s about framing responses in a way that aligns with
user expectations and the stakes of the interaction. In critical
contexts, transparency is nonnegotiable, while in low-stakes settings,
confidence can be presented more casually.
Asking for Guidance and Input from Users
No agent, no matter how advanced, can perfectly interpret
ambiguous, vague, or conflicting user inputs. Instead of making risky
assumptions, agents must know when to ask clarifying questions or
seek user guidance. This ability transforms potential errors into
opportunities for collaboration.
Effective agents are designed to ask focused, helpful questions when
they encounter ambiguity. For example, if a user says “Book me a
ticket to Chicago,” the agent might respond with “Would you like a
one-way or round-trip ticket, and do you have preferred travel
dates?” Instead of defaulting to a generic response or making
incorrect assumptions, the agent uses the opportunity to refine its
understanding.
The way agents ask for guidance also matters. Questions should be
clear, polite, and context-aware, avoiding robotic or repetitive

-- 97 of 559 --

phrasing. If the user has already answered part of the question
earlier in the conversation, the agent should reference that context
rather than starting from scratch.
Additionally, agents should be transparent about why they’re asking
for clarification. A simple explanation, like “I need a bit more
information to proceed accurately,” helps users understand the
rationale behind the question.
Finally, agents should avoid asking too many questions at once—this
can overwhelm users and make the interaction feel like an
interrogation. Instead, they should sequence questions logically,
addressing the most critical ambiguities first.
When agents confidently ask for guidance and input, they transform
uncertainty into productive collaboration, empowering users to guide
the agent toward successful outcomes while maintaining a sense of
partnership and shared control.
Failing Gracefully
Failure is inevitable in agentic systems. Whether due to incomplete
data, ambiguous user input, technical limitations, or unexpected
edge cases, agents will encounter scenarios where they cannot fulfill
a request or complete a task. However, how an agent handles failure
is just as important as how it handles success. A well-designed agent
doesn’t just fail—it fails gracefully, minimizing user frustration,
preserving trust, and providing a clear path forward.
At its core, graceful failure involves acknowledging the issue
transparently, offering a helpful explanation, and suggesting
actionable next steps. For instance, if an agent cannot find an
answer to a query, it might respond with “I couldn’t find the
information you’re looking for; would you like me to escalate this to
a human representative?” instead of producing an incorrect or
nonsensical response.

-- 98 of 559 --

Agents should also be designed to anticipate common points of
failure and have predefined fallback mechanisms in place. For
example, if a voice-based agent struggles to understand repeated
user inputs, it might switch to a text-based option or provide a clear
explanation, such as: “I’m having trouble understanding your
request. Could you please try rephrasing it or typing your question
instead?”
In multistep tasks, state preservation is equally important when an
agent encounters failure. Instead of requiring the user to restart
from scratch, the agent should retain progress and allow the user to
pick up where they left off once the issue is resolved. This prevents
unnecessary repetition and frustration.
Another critical aspect of graceful failure is apologetic and
empathetic language. When something goes wrong, the agent
should acknowledge the failure in a way that feels human and
considerate, avoiding cold or overly technical error messages. For
example: “I’m sorry; something went wrong while processing your
request. Let me try again or connect you with someone who can
help.”
Additionally, agents should provide clear paths to resolution.
Whether it’s offering troubleshooting steps, escalating to a human
operator, or directing the user to an alternative resource, users
should always know what options are available to them when the
agent encounters a roadblock.
Lastly, agents must learn from their failures whenever possible.
Logging failure points, analyzing recurring issues, and feeding these
insights back into the development process can help reduce the
frequency of similar failures in the future. Agents that improve
iteratively based on their failure patterns will become increasingly
resilient and reliable over time.
In summary, failing gracefully is about maintaining user trust and
minimizing frustration even when things don’t go as planned. By

---

## Sección 44: Chapter 3. User Experience

-- 99 of 559 --

being transparent, empathetic, and action-oriented, agents can turn
failures into opportunities to strengthen their relationship with users,
demonstrating reliability even in moments of imperfection.
Trust in Interaction Design
Trust is gained in drops and lost in buckets. This certainly applies to
agentic systems as well. Without it, even the most advanced agent
systems will struggle to gain user acceptance, regardless of their
capabilities. Transparency and predictability are two of the most
powerful tools for building and maintaining trust between agents
and users. Users need to understand what an agent can do, why it
made a particular decision, and what its limitations are. This clarity
fosters confidence, reduces anxiety, and encourages productive
collaboration.
Transparency begins with clear communication of agent capabilities
and constraints. Users should never have to guess whether an agent
can handle a task or if it is operating within its intended scope.
When agents provide explanations for their actions—whether it’s
how they arrived at a recommendation, why they declined a request,
or how they interpreted an ambiguous instruction—they give users
visibility into their reasoning. This isn’t just about building trust; it
also helps users refine their instructions, improving the quality of
future interactions.
Predictability complements transparency by ensuring that agents
behave consistently across different scenarios. Users should be able
to anticipate how an agent will respond based on prior interactions.
Erratic or inconsistent behavior, even if technically correct, can
quickly erode trust. For example, if an agent suggests a cautious
approach in one context but appears overly confident in a nearly
identical scenario, users may start to question the agent’s reliability.
However, transparency does not mean overwhelming the user with
unnecessary details. Users don’t need to see every step of the

-- 100 of 559 --

agent’s reasoning process—they just need enough insight to feel
confident in its actions. Striking this balance requires thoughtful
interface design, using visual cues, status messages, and brief
explanations to communicate what’s happening without causing
cognitive overload.
When trust and transparency are prioritized, agent systems become
more than just tools—they become reliable collaborators. Users feel
confident delegating tasks, following agent recommendations, and
relying on their outputs in both casual and high-stakes scenarios. In
the remainder of this section, we’ll explore two key components of
trust-building: ensuring predictability and reliability in agent
behavior.
Predictability and reliability are foundational to trust. Users must be
able to count on agents to behave consistently, respond
appropriately, and handle errors gracefully. Agents that act
erratically, give conflicting outputs, or produce unexpected behavior
—even if occasionally correct—can quickly undermine user
confidence.
Reliability begins with consistency in agent outputs. If a user asks an
agent the same question under the same conditions, they should
receive the same response. In cases where variability is unavoidable
(e.g., probabilistic outputs from language models), agents should
clearly signal when an answer is uncertain or context-dependent.
Agents must also handle edge cases thoughtfully. For example, when
they encounter incomplete data, conflicting instructions, or
ambiguous user input, they should respond predictably—either by
asking clarifying questions, providing a neutral fallback response, or
escalating the issue appropriately.
Another critical aspect of reliability is system resilience. Agents
should be designed to recover from errors, maintain state across
interruptions, and prevent cascading failures. For example, if an
agent loses connection to an external API, it should notify the user,

-- 101 of 559 --

explain the issue, and offer a sensible next step rather than silently
failing or producing misleading outputs.
Lastly, reliability is about setting and meeting expectations
consistently. If an agent claims it can handle a specific task, it must
deliver on that promise every time. Misaligned expectations—where
agents overpromise and underdeliver—can cause more damage to
user trust than simply admitting limitations up front.
When agents behave predictably and reliably, they become
dependable digital partners, empowering users to trust their outputs,
delegate tasks confidently, and rely on them for critical decisions.
Conclusion
Designing exceptional user experiences for agent systems goes far
beyond technical functionality—it requires an understanding of how
humans interact with technology across different modalities,
contexts, and workflows. Whether through text, graphical interfaces,
voice, or video, each interaction modality carries its own strengths,
trade-offs, and unique design considerations. Successful agent
experiences are those where the modality aligns seamlessly with the
user’s task, environment, and expectations.
Synchronous and asynchronous agent experiences present distinct
design challenges, requiring thoughtful approaches to timing,
responsiveness, and clarity. Synchronous interactions demand
immediacy and conversational flow, while asynchronous interactions
excel in persistence, transparency, and thoughtful notifications.
Striking the right balance between proactive assistance and intrusive
interruptions remains one of the most delicate aspects of agent
design.
Exceptional agents seamlessly retain context and adapt to users,
remembering critical details across interactions and adapting
intelligently to user preferences. This ability not only reduces

---

## Sección 45: Chapter 3. User Experience

-- 102 of 559 --

cognitive load but also fosters a sense of continuity and
collaboration, transforming agents from isolated tools into reliable
digital partners. Some common patterns to keep in mind:
Communicate capabilities clearly
Show users what the agent can do through onboarding,
suggestions, or buttons.
Combine modalities thoughtfully
Align text, GUI, voice, or video with the task and user context.
Retain context thoughtfully
Maintain relevant conversation state without overwhelming
memory or violating privacy.
Handle errors gracefully
Provide clear, polite fallbacks when the agent can’t fulfill a
request.
Build trust
Be transparent about limitations, confidence, and reasoning.
Equally important is how agents communicate their capabilities,
limitations, and uncertainties. Clear expectations, honest confidence
signals, and thoughtful clarification questions create trust, reduce
frustration, and prevent misunderstandings. Agents must also know
how to fail gracefully, guiding users toward alternative solutions
without leaving them stranded or confused.
Finally, building trust through predictability, transparency, and
responsible design choices ensures that users can rely on agents.
Trust is earned not just through success but also through how
agents handle ambiguity, failure, and recovery.

-- 103 of 559 --

As the agent landscape continues to shift and expand, designers and
developers must remain agile—continually reevaluating interaction
paradigms, adapting to new multimodal capabilities, and
experimenting with novel UX patterns. The design patterns described
here provide a robust starting point, but the future of agentic UX will
be shaped by rapid innovation in modalities, context management,
and human-agent collaboration. In the years ahead, agent systems
will continue to evolve, becoming more deeply embedded in our
personal and professional lives. The principles outlined in this
chapter—focused on clarity, adaptability, transparency, and trust—
provide a blueprint for creating agent experiences that are not just
functional, but intuitive, engaging, and deeply aligned with human
needs.
By prioritizing UX at every stage of development, we can ensure that
agents become not just tools, but indispensable partners in our
increasingly intelligent digital ecosystems. In Chapter 4, we’ll cover
tool use, which is how we move from ordinary chatbots to systems
that can do real work for users.

-- 104 of 559 --

---

## Sección 46: Chapter 4. Tool Use

While foundation models are great at chatting for hours, tools are
the building blocks that empower AI agents to retrieve additional
information and context, perform tasks, and interact with the
environment in meaningful ways. In the context of AI, a tool can be
defined as a specific capability or a set of actions that an agent can
perform to achieve a desired outcome. These tools range from
simple, single-step tasks to complex, multistep operations that
require advanced reasoning and problem-solving abilities. Especially
if you want your agent to make actual changes, instead of just
searching for and providing information, tools will be how those
changes are executed.
The significance of tools in AI agents parallels the importance of
competencies in human professionals. Just as a doctor needs a
diverse set of tools to diagnose and treat patients, an AI agent
requires a repertoire of tools to handle various tasks effectively. This
chapter aims to provide a comprehensive understanding of tools in
AI agents, exploring their design, development, and deployment.
AI agents, at their core, are sophisticated systems designed to
interact with their environment, process information, and execute
tasks autonomously. To do this efficiently, they rely on a structured
set of tools. These tools are modular components that can be
developed, tested, and optimized independently, then integrated to
form a cohesive system capable of complex behavior.
In practical terms, a tool could be as simple as recognizing an object
in an image or as complex as managing a customer support ticket
from initial contact to resolution. The design and implementation of
these tools are critical to the overall functionality and effectiveness
of the AI agent. We’ll start with some fundamentals of LangChain,
and then cover the different types of tools that can be provided to

-- 105 of 559 --

an autonomous agent, which we will cover in sequence: local tools,
API-based tools, and MCP tools.
LangChain Fundamentals
Before diving deeper into tool selection and orchestration, it is
helpful to understand some core LangChain concepts. At the heart of
LangChain are foundation models and chat models, which process
prompts and generate responses. For example, ChatOpenAI is a
wrapper class that provides a simple interface to interact with
OpenAI’s chat-based models like GPT-5. You initialize it with
parameters such as the model name to specify which model to use:
from langchain_openai import ChatOpenAI
llm = ChatOpenAI(model_name="gpt-4o")
LangChain structures interactions as messages to maintain
conversational context. The two main message types are
HumanMessage, which represents user inputs, and AIMessage,
which represents the model’s responses:
from langchain_core.messages import
HumanMessage messages = [HumanMessage("What is the weather
today?")]
Tools, meanwhile, are external functions that your model can call to
extend its capabilities beyond text generation—for instance, calling
APIs, retrieving database entries, or performing calculations. You
define a tool in LangChain using the @tool decorator, which
registers the function and automatically generates the schema
describing its inputs and outputs:
from langchain_core.tools import tool
@tool

-- 106 of 559 --

def add_numbers(x: int, y: int) -> int:
"""Adds two numbers and returns the sum."""
return x + y
Once you have defined your tools, you bind them to the model using
.bind_tools(), which enables the model to select and invoke
these tools in response to user inputs. To interact with the model,
you use the .invoke() method, providing it with a list of messages
representing the current conversation. If the model decides to call a
tool, it will output a tool call, which you then execute by invoking the
corresponding function and appending its result back into the
conversation before generating the final response:
llm_with_tools = llm.bind_tools([add_numbers])
ai_msg = llm_with_tools.invoke(messages)
for tool_call in ai_msg.tool_calls:
tool_response = add_numbers.invoke(tool_call)
These building blocks—chat models, messages, tools, and tool
invocation—form the foundation of LangChain-based systems.
Understanding how they fit together will help you follow the
examples in this chapter and build your own agents that can
seamlessly integrate language understanding with real-world actions.
Local Tools
These tools are designed to run locally. They are often based on
predefined rules and logic, tailored to specific tasks. These local
tools can be easily built and modified, and are co-deployed with the
agent. They can especially augment weaknesses in language models
that traditional programming techniques perform better at, such as
arithmetic, time-zone conversions, calendar operations, or
interactions with maps. These local tools offer precision,
predictability, and simplicity. As the logic is explicitly defined, local
tools tend to be predictable and reliable.

-- 107 of 559 --

The metadata—the tool’s name, description, and schema—is just as
critical as its logic. The model uses that metadata to decide which
tool to invoke. Therefore, the following is important:
Choose precise, narrowly scoped names. If your name is too
general, the LLM may call it when it’s not needed.
Write clear, distinctive descriptions. Overly broad or
overlapping descriptions across multiple tools guarantee
confusion and poor performance.
Define strict input/output schemas. Explicit schemas help the
foundation model understand exactly when and how to use
the tool, reducing misfires.
Despite these benefits, local tools have some important drawbacks:
Scalability
Designing, building, and deploying local tools can be
cumbersome, time-consuming, and challenging, and local tools
are harder to share across use cases. While tools can be exposed
as libraries and shared across multiple agent use cases, this can
be challenging in practice and at scale.
Duplication
Every team or agent deployment that wants to use local tools will
need to deploy the same library along with their agent service,
and pushing changes to these tools will require coordinating
deployments to each agent service that uses these tools. In
practice, many teams simply reimplement the same tools
independently to avoid the coordination overhead.
Maintenance
As the environment or requirements change, handcrafted tools
may need frequent updates and adjustments. This ongoing

---

## Sección 47: Chapter 4. Tool Use

-- 108 of 559 --

maintenance can be resource-intensive and typically requires a
redeployment of your agent service.
Despite these drawbacks, manually crafted tools are especially useful
in addressing areas of traditional weakness for foundation models.
Simple mathematical operations are a great example of this. Unit
conversions, calculator operations, calendar changes, operations on
dates and times, and operations over maps and graphs, for example,
are all areas where handcrafted tools can substantially improve the
efficacy of agentic systems.
Let’s look at an example of registering a calculator tool. First, we
define our simple calculator function:
from langchain_core.runnables import ConfigurableField
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
# Define tools using concise function definitions
@tool
def multiply(x: float, y: float) -> float:
"""Multiply 'x' times 'y'."""
return x * y
`
@tool
def exponentiate(x: float, y: float) -> float:
"""Raise 'x' to the 'y'."""
return x**y
@tool
def add(x: float, y: float) -> float:
"""Add 'x' and 'y'."""
return x + y
Then, we bind the tool with the foundation model in LangChain:

-- 109 of 559 --

tools = [multiply, exponentiate, add]
# Initialize the LLM with GPT-4o and bind the tools
llm = ChatOpenAI(model_name="gpt-4o", temperature=0)
llm_with_tools = llm.bind_tools(tools)
This “binding” operation registers the tool. Under the hood,
LangChain will now check if the foundation model response includes
any requests to call a tool. Now that we’ve bound the tool, we can
ask the foundation model questions, and if the tool is helpful for
answering the question, the foundation model will choose the tools,
select the parameters for those tools, and invoke those functions:
query = "What is 393 * 12.25? Also, what is 11 + 49?"
messages = [HumanMessage(query)]
ai_msg = llm_with_tools.invoke(messages)
messages.append(ai_msg)
for tool_call in ai_msg.tool_calls:
selected_tool = {"add": add, "multiply": multiply,
"exponentiate": exponentiate}
[tool_call["name"].lower()]
tool_msg = selected_tool.invoke(tool_call)
print(f’{tool_msg.name} {tool_call['args']}
{tool_msg.content}’)
messages.append(tool_msg)
final_response = llm_with_tools.invoke(messages)
print(final_response.content)
With those added print statements for visibility, we can see that the
foundation model invokes two function calls—one each for
multiply and add:

-- 110 of 559 --

multiply {'x': 393, 'y': 12.25} Result: 4814.25
add {'x': 11, 'y': 49} 60.0
The model will then include this result from the tool call in the
generated final response, producing a result such as:
393 times 12.25 is 4814.25, and 11 + 49 is 60.
While the effect of this is simple, the implications are profound. The
foundation model is now able to execute the computer programs
that we bind with it. This is a simple example, but we can bind
arbitrarily useful and consequential programs to the foundation
model, and we now rely on the foundation model to choose which
programs to execute with which parameters. Doing so responsibly,
and only binding tools that the foundation model will execute in
ways that produce more good than harm, is among the paramount
responsibilities of developers building agents and agentic systems.
API-Based Tools
API-based tools enable autonomous agents to interact with external
services, enhancing their capabilities by accessing additional
information, processing data, and executing actions that are not
feasible to perform locally. These tools leverage application
programming interfaces (APIs) to communicate with public or private
services, providing a dynamic and scalable way to extend the
functionality of an agent.
API-based tools are particularly valuable in scenarios where the
agent needs to integrate with various external systems, retrieve realtime data, or perform complex computations that would be too
resource-intensive to handle internally. By connecting to APIs,
agents can access a vast array of services, such as weather
information, stock market data, translation services, and more,

-- 111 of 559 --

enabling them to provide richer and more accurate responses to
user queries. These API-based tools have multiple benefits.
By leveraging external services, these tools can dramatically expand
the range of tasks an agent can perform. For instance, an agent can
use a weather API to provide current weather conditions and
forecasts, a financial API to fetch stock prices, or a translation API to
offer multilingual support. This ability to integrate diverse external
services greatly broadens the agent’s functionality, all without having
to retrain a model.
Real-time data access is another major benefit of API-based tools.
APIs enable agents to access the most current information from
external sources, ensuring that their responses and actions are
based on up-to-date data. This is particularly crucial for applications
that depend on timely and accurate information, such as financial
trading or emergency response systems, where decisions must be
made quickly based on the latest available data.
To illustrate the implementation of API-based tools, let’s begin with
enabling your agent to browse the open web for additional
information. In this code snippet, we register a tool to retrieve
information from Wikipedia, a step toward a full web browsing
agent:
from langchain_openai import ChatOpenAI
from langchain_community.tools import WikipediaQueryRun
from langchain_community.utilities import
WikipediaAPIWrapper
from langchain_core.messages import HumanMessage
api_wrapper = WikipediaAPIWrapper(top_k_results=1,
doc_content_chars_max=300)
tool = WikipediaQueryRun(api_wrapper=api_wrapper)
# Initialize the LLM with GPT-4o and bind the tools
llm = ChatOpenAI(model_name="gpt-4o", temperature=0)
llm_with_tools = llm.bind_tools([tool])

---

## Sección 48: Chapter 4. Tool Use

-- 112 of 559 --

messages = [HumanMessage("What was the most impressive
thing" +
"about Buzz Aldrin?")]
ai_msg = llm_with_tools.invoke(messages)
messages.append(ai_msg)
for tool_call in ai_msg.tool_calls:
tool_msg = tool.invoke(tool_call)
print(tool_msg.name)
print(tool_call['args'])
print(tool_msg.content)
messages.append(tool_msg)
print()
final_response = llm_with_tools.invoke(messages)
print(final_response.content)
The foundation model identifies the object of interest in the query
and searches Wikipedia for the term. It then uses this additional
information to generate its final answer when addressing the
question:
{'query': 'Buzz Aldrin'}
Page: Buzz Aldrin
Summary: Buzz Aldrin (born Edwin Eugene Aldrin Jr. January
20, 1930) is an
American former astronaut, engineer and fighter pilot. He
made three spacewalks
as pilot of the 1966 Gemini 12 mission, and was the Lunar
Module Eagle pilot on
the 1969 Apollo 11 mission.
One of the most impressive things about Buzz Aldrin is that
he was the Lunar
Module Eagle pilot on the 1969 Apollo 11 mission, making
him one of the first
two humans to land on the Moon. This historic event marked
a significant
achievement in space exploration and human history.

-- 113 of 559 --

Additionally, Aldrin made
three spacewalks as pilot of the 1966 Gemini 12 mission,
showcasing his tools
and contributions to advancing space travel.
Let’s now look at a second example, for an agent that is designed to
fetch and display stock market data. This process involves defining
the API interaction, handling the response, and integrating the tool
into the agent’s workflow. By following this approach, agents can
integrate external data sources seamlessly, enhancing their overall
functionality and effectiveness.
First, we define the function that interacts with the stock market
API. Then, we register this function as a tool for our agent, and we
can then invoke it just like the previous tools:
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langchain_community.tools import WikipediaQueryRun
from langchain_community.utilities import
WikipediaAPIWrapper
from langchain_core.messages import HumanMessage
import requests
@tool
def get_stock_price(ticker: str) -> float:
"""Get the stock price for the stock exchange ticker for
the company."""
api_url = f"https://api.example.com/stocks/{ticker}"
response = requests.get(api_url)
if response.status_code == 200:
data = response.json()
return data["price"]
else:
raise ValueError(f"Failed to fetch stock price for
{ticker}")
# Initialize the LLM with GPT-4o and bind the tools
llm = ChatOpenAI(model_name="gpt-4o", temperature=0)

-- 114 of 559 --

llm_with_tools = llm.bind_tools([get_stock_price])
messages = [HumanMessage("What is the stock price of
Apple?")]
ai_msg = llm_with_tools.invoke(messages)
messages.append(ai_msg)
for tool_call in ai_msg.tool_calls:
tool_msg = get_stock_price.invoke(tool_call)
print(tool_msg.name)
print(tool_call['args'])
print(tool_msg.content)
messages.append(tool_msg)
print()
final_response = llm_with_tools.invoke(messages)
print(final_response.content)
Similar tools can be created to search across team- or companyspecific information. By providing your agent with the tools
necessary to access the information it needs to handle a task, and
the specific tools to operate over that information, you can
significantly expand the scope and complexity of tasks that can be
automated.
When designing API tools for agents, focus on reliability, security,
and graceful failure. External services can go down, so agents need
fallbacks or clear error messages. Secure all communications with
HTTPS and strong authentication, especially for sensitive data.
Watch out for API rate limits to avoid disruptions, and ensure
compliance with data privacy laws—anonymize or obfuscate user
data when needed. Handle errors robustly so the agent can recover
from network issues or invalid responses without breaking the user
experience. When possible, consider alternatives and multiple
providers for greater reliability if any given provider is degraded.

-- 115 of 559 --

APIs empower agents with real-time data, heavy computation, and
external actions they couldn’t perform alone, making them far more
capable and effective.
Plug-In Tools
These tools are modular and can be integrated into the AI agent’s
framework with minimal customization. They leverage existing
libraries, APIs, and third-party services to extend the agent’s
capabilities without extensive development effort. Plug-in tools
enable rapid deployment and scaling of the agent’s functionalities.
These tools are predesigned modules that can be integrated into an
AI system with minimal effort, leveraging existing libraries, APIs, and
third-party services. The integration of plug-in tools has become a
standard offering from leading platforms such as OpenAI, Anthropic’s
Claude, Google’s Gemini, and Microsoft’s Phi as well as a growing
open source community. Plug-in tools provide powerful tools to
expand the capabilities of AI agents without extensive custom
development.
OpenAI’s plug-ins ecosystem offers powerful extensions—everything
from real-time web search to specialized code generators—but
they’re only available inside the ChatGPT product, not the public API.
You cannot invoke Expedia, Zapier, or any first-party ChatGPT plug-in
through the standard OpenAI Completions or Chat endpoints. To
replicate similar behavior in your own applications, you must build
custom function-calling layers (for example, via LangChain) that
approximate plug-in functionality.
Anthropic’s Claude, by contrast, exposes its full “tool use” capability
directly through the Anthropic Messages API (and on platforms like
Amazon Bedrock or Google Cloud’s Vertex AI). You simply register
your custom tools (or use Anthropic-provided ones), and Claude can
call them at inference time—no separate UI required. This API-first
approach makes it straightforward to integrate content moderation,

---

## Sección 49: Chapter 4. Tool Use

-- 116 of 559 --

bias detection, or domain-specific services into any Claude-powered
workflow.
Google’s Gemini models support function calling via the Vertex AI
API, letting you declare tools in a FunctionCallingConfig and
have Gemini invoke them as structured calls. Whether you need
natural language understanding, image recognition, or database
lookups, you define the functions up front and process the returned
arguments in your code—no proprietary UI layer stands between
your app and the model.
Microsoft’s Phi models are offered through Azure AI Foundry, where
they integrate seamlessly with other Azure services—such as
cognitive search, document processing, and data visualization APIs—
via the same public endpoints you use for other Azure AI models.
Though not branded as “plug-ins,” Phi’s tight coupling with Azure’s
productivity and analytics tools delivers a similarly smooth
experience: you call the model, receive structured outputs, and feed
them directly into your existing Azure workflows without switching
contexts.
One of the significant advantages of plug-in tools is their integration
at the model execution layer. This means these tools can be added
to AI models with minimal disruption to existing workflows.
Developers can simply plug these modules into their AI systems,
instantly enhancing their capabilities without extensive customization
or development effort. This ease of integration makes plug-in tools
an attractive option for rapidly deploying new functionalities in AI
applications. However, this ease of use comes with certain
limitations. Plug-in tools, while powerful, do not offer the same level
of customizability and adaptability as custom-developed tools that
can be served either locally or remotely. They are designed to be
general-purpose tools that can address a broad range of tasks, but
they may not be tailored to the specific needs and nuances of every
application. This trade-off between ease of integration and

-- 117 of 559 --

customizability is an important consideration for developers when
choosing between plug-in tools and bespoke development.
Despite the current limitations, the catalogs of plug-in tools offered
by leading platforms are rapidly growing. As these catalogs expand,
the breadth of capabilities available through plug-in tools will
increase, providing developers with even more tools to enhance their
AI agents. This growth is driven by continuous advancements in AI
research and the development of new techniques and technologies.
In the near future, we can expect these plug-in tool catalogs to
include more specialized and advanced functionalities, catering to a
wider range of applications and industries. This expansion will
facilitate agent development by providing developers with readily
available tools to address complex and diverse tasks. The growing
ecosystem of plug-in tools will enable AI agents to perform
increasingly sophisticated functions, making them more versatile and
effective in various domains.
In addition to the offerings from major platforms, there is a rapidly
growing ecosystem of tools that can be incorporated into open
source foundation models. This ecosystem provides a wealth of
resources for developers looking to enhance their AI agents with
advanced capabilities. Open source communities are actively
contributing to the development of plug-in tools, creating a
collaborative environment that fosters innovation and knowledge
sharing. One notable example is the Hugging Face Transformers
library, which offers a wide range of pretrained models and plug-in
tools for natural language processing tasks. These tools can be
easily integrated into open source foundation models, enabling
functionalities such as text generation, sentiment analysis, and
language translation. The open source nature of this library enables
developers to customize and extend these tools to suit their specific
needs. The flexibility of these frameworks means that developers
can combine plug-in tools with custom development, creating
powerful and adaptable AI systems. The open source AI community

-- 118 of 559 --

is continuously contributing new plug-in tools and enhancements,
driven by the collective efforts of researchers, developers, and
enthusiasts. Platforms like Glama.ai, and mcp.so aggregate large
numbers of MCP servers, making them searchable and discoverable,
ranging from simple utilities to complex, stateful services. These
contributions enrich the ecosystem and provide valuable resources
for developers looking to leverage the latest advancements in AI.
The practical applications of plug-in tools are vast and varied,
spanning multiple industries and use cases. By integrating plug-in
tools, developers can create AI agents that perform a wide range of
tasks efficiently and effectively. In customer support, plug-in tools
can enable AI agents to handle queries, provide solutions, and
manage support tickets. Tools like natural language understanding
and sentiment analysis can help AI agents understand customer
issues and respond appropriately, improving customer satisfaction
and reducing response times. In healthcare, plug-in tools can assist
AI agents in tasks such as medical image analysis, patient triage,
and data management. Tools that leverage computer vision can help
identify abnormalities in medical images, while natural language
processing tools can assist in managing patient records and
extracting relevant information from medical literature, and vector
search tools can offer grounding in relevant documents to address
the current query. In the finance industry, plug-in tools can enhance
AI agents’ abilities to analyze market trends, detect fraudulent
activities, and manage financial portfolios. Tools like anomaly
detection and predictive analytics can provide valuable insights and
improve decision-making processes. In education, plug-in tools can
support AI agents in personalized learning, automated grading, and
content recommendation.
The future of plug-in tools in AI development looks promising, with
continuous advancements and growing adoption across various
industries. As the capabilities of plug-in tools expand, we can expect
AI agents to become even more capable and versatile. The ongoing

---

## Sección 50: Chapter 4. Tool Use

-- 119 of 559 --

research and development efforts by leading platforms and the open
source community will drive innovation, resulting in more powerful
and sophisticated tools for AI development. One important area of
focus for the future is the interoperability and standardization of
plug-in tools. Establishing common standards and protocols for plugin tools will facilitate seamless integration and interoperability across
different AI platforms and systems. This will enable developers to
leverage plug-in tools from various sources, creating more flexible
and adaptable AI solutions. Efforts are also being made to enhance
the customization and adaptability of plug-in tools. Future plug-in
tools may offer more configurable options, enabling developers to
tailor them to specific use cases and requirements. This will bridge
the gap between the ease of integration and the need for
customized solutions, providing the best of both worlds.
Model Context Protocol
As the AI ecosystem matures, agents no longer live in isolated silos.
They need to read documents from cloud storage, push data to
business applications, call internal APIs, and coordinate with other
agents. Custom integrations—where you write bespoke adapters for
each data source or service—are brittle and scale poorly. Enter the
Model Context Protocol (MCP): an open standard introduced by
Anthropic (and since adopted by major players like OpenAI, Google
DeepMind, and Microsoft) that provides a uniform, model-agnostic
way to connect LLMs to external systems. Think of MCP as a “USB-C
port for AI”—a single, well-defined interface that any data source or
tool can expose, and any agent can consume, without specialized
glue code. At its core, MCP defines two roles:
MCP server
This is a web server that exposes data or services via a
standardized JSON-RPC 2.0 interface. A server can wrap anything
—cloud object storage, SQL databases, enterprise customer

-- 120 of 559 --

relationship management, proprietary business logic—so long as
it implements the MCP specification.
MCP client
This is any agent or LLM application that “speaks” MCP. The
client sends JSON-RPC requests (e.g., “List all files in this
Salesforce folder,” or “Execute function ‘getCustomerBalance’ with
customerId=1234”) and receives structured JSON responses.
Because the protocol is uniform, an agent developer doesn’t
need to know the internals of the server—only its exposed
methods.
Under the hood, MCP uses JSON-RPC 2.0 over HTTPS or WebSocket.
Servers advertise their available methods (e.g., listFiles,
getRecord, runAnalysis) and their input/output schemas.
Clients fetch the server’s “method catalog,” allowing an LLM to
reason about which method to call and with what parameters. Once
the tool call is chosen, the MCP client wraps that call into a JSONRPC payload, sends it over to the appropriate server, and awaits a
response. Because both ends speak the same language, building
cross-platform interoperability becomes straightforward.
Before MCP, developers wrote custom adapters for each target
system—hard-coding REST calls or SDK usage directly inside their
agent code. As the number of data sources grew, these bespoke
integrations multiplied, resulting in brittle, error-prone code that was
difficult to maintain or extend.
Despite these advantages, several security issues have been raised
and are not yet fully addressed—particularly around authentication,
access controls, and potential attack vectors when multiple agents
share MCP endpoints. Ensuring that only authorized agents invoke
specific methods, maintaining role-based access control to sensitive
data, preventing malicious payload injection, and maintaining audit
logs remain active areas of research and engineering. Some

-- 121 of 559 --

organizations still rely on additional network policies or proxy layers
to mitigate these risks, but the core MCP specification does not yet
mandate a single, standardized security solution. Nevertheless, MCP
solves a critical challenge of tool reuse across multiple agents: once
a service is exposed via MCP, any number of agents can discover and
invoke its methods without rewriting custom adapters for each
agent. This dramatically reduces development effort and encourages
modular, reusable architectures.
To see MCP in action, we’ll walk through a self-contained Python
example that does the following:
1. Launches a local “math” MCP server (via a subprocess)
2. Connects to a remote “weather” MCP server running on
localhost:8000/mcp
3. Implements an asynchronous agent loop that inspects the
user’s last message and decides whether to call the “math”
tool (for arithmetic expressions) or the “weather” tool (for
weather queries)
4. Demonstrates how the agent parses the tool’s output and
returns a final assistant response
Here’s the complete Python implementation demonstrating these
steps:
class AgentState(TypedDict):
messages: Sequence[Any] # A list of
BaseMessage/HumanMessage/...
mcp_client = MultiServerMCPClient(
{
"math": {
"command": "python3",
"args":
["src/common/mcp/MCP_weather_server.py"],
"transport": "stdio", # Subprocess → STDIO

---

## Sección 51: Chapter 4. Tool Use

-- 122 of 559 --

JSON-RPC
},
"weather": {
# Assumes a separate MCP server is already
running on port 8000
"url": "http://localhost:8000/mcp",
"transport": "streamable_http",
# HTTP→JSON-RPC over WebSocket/stream
},
}
)
async def get_mcp_tools() -> list[Tool]:
return await mcp_client.get_tools()
async def call_mcp_tools(state: AgentState) -> dict[str,
Any]:
messages = state["messages"]
last_msg = messages[-1].content.lower()
# Fetch and cache MCP tools on the first call
global MCP_TOOLS
if "MCP_TOOLS" not in globals():
MCP_TOOLS = await mcp_client.get_tools()
# Simple heuristic: if any digit-operator token
appears, choose "math"
if any(token in last_msg for token in ["+", "-", "*",
"/", "(", ")"]):
tool_name = "math"
elif "weather" in last_msg:
tool_name = "weather"
else:
# No match → respond directly
return {
"messages": [
{
"role": "assistant",
"Sorry, I can only answer math" +
" or weather queries."
}
]
}

-- 123 of 559 --

tool_obj = next(t for t in MCP_TOOLS if t.name ==
tool_name)
user_input = messages[-1].content
mcp_result: str = await tool_obj.arun(user_input)
return {
"messages": [
{"role": "assistant", "content": mcp_result}
]
}
The "math" entry uses command + args to spawn a subprocess
that runs
MCP_weather_server.py. Under the hood, this script must
conform to MCP (i.e., serve JSON-RPC over STDIO).
The "weather" entry points to an already running HTTP MCP
server at
http://localhost:8000/mcp. The streamable_http
transport allows duplex JSON-RPC communication over
HTTP/WebSocket.
MCP represents a significant step forward in how we design, deploy,
and maintain AI agents at scale. By defining a single, standardized
JSON-RPC interface for exposing and consuming methods, MCP
decouples service implementation from agent logic, enabling any
number of agents to reuse the same tools without bespoke
integrations. In practice, this means that as new data sources,
microservices, or legacy systems emerge, developers need only
implement an MCP-compliant server once—and any MCP-capable
agent can discover and invoke its methods immediately.
Although security concerns like robust authentication, fine-grained
access control, and payload validation remain active areas of
development, the core promise of MCP—seamless interoperability
and modular tool reuse—has already been realized in production
systems across leading organizations. Looking ahead, we expect
continued refinement of MCP’s security best practices, broader

-- 124 of 559 --

adoption of standardized method catalogs, and the growth of an
ecosystem of public and private MCP endpoints. In sum, MCP solves
one of the most persistent challenges in agentic system design—how
to integrate diverse services quickly and reliably—while laying a
foundation for ever more flexible, maintainable, and distributed AI
architectures.
Stateful Tools
Stateful tools span local scripts, external APIs, and MCP‐deployed
services, yet they all share a common risk: when you hand a
foundation model direct power over persistent state, you also
empower it to make destructive mistakes or to be exploited by bad
actors. In one real-world case, an AI agent “optimized” database
performance by dropping half the rows from a production table,
erasing critical records in the process. Even without malice,
foundation models can misinterpret a user’s intent, turning what
should be a harmless query into a destructive command. This risk is
especially acute for stateful tools because they interact with live data
stores whose contents change over time.
To mitigate these dangers, register only narrowly scoped operations
as tools instead of exposing an “execute arbitrary SQL” endpoint. For
example, define a get_user_profile(user_id) tool or an
add_new_customer(record) tool, each encapsulating a single,
well-tested query or procedure. Agents needing only read access
should never receive rights to delete or modify data. By constraining
tool capabilities at the registration layer, you sharply reduce the
attack surface and limit the scope of potential errors.
If your use case absolutely demands free-form queries, you must
implement rigorous sanitization and access controls. OWASP’s GenAI
Security Project warns that prompt injections can slip dangerous
clauses like DROP or ALTER into otherwise benign requests, so input
validation must reject any statement containing these patterns.

-- 125 of 559 --

Always bind parameters or use prepared statements to prevent SQL
injection, and ensure the database account used by the agent holds
only the minimum privileges needed to execute the allowed queries.
Beyond sanitization, logging every tool invocation to detect
anomalous behavior and support forensic analysis is highly
recommended. Coupled with real-time alerts for suspicious patterns
—such as unusually large deletions or schema-altering commands—
you can intervene quickly before small errors cascade into major
incidents.
Ultimately, the principle of least power should guide your design:
give the model only the tools it strictly requires, and guard every
operation with precise boundaries and oversight. Whether your tool
runs locally, calls an external API, or executes on an MCP server, the
same safeguards apply—restrict capabilities, sanitize inputs, enforce
least privilege, and maintain full observability. By treating stateful
tools with this level of discipline, you ensure that your AI agents
remain powerful collaborators rather than uncontrolled database
administrators.
Automated Tool Development
Code generation is a technique where AI agents write code
autonomously, significantly reducing the time and effort required to
create and maintain software applications. This process involves
training models on vast amounts of code data, enabling them to
understand programming languages, coding patterns, and best
practices.
Code generation represents a transformative leap in AI capabilities,
particularly when an agent writes its own tools in real time to solve
tasks or interact with new APIs. This dynamic approach enables AI
agents to adapt and expand their functionality, significantly
enhancing their versatility and problem-solving capacity.

---

## Sección 52: Chapter 4. Tool Use

-- 126 of 559 --

Foundation Models as Tool Makers
Foundation models no longer just consume tools—they build them.
By feeding an LLM your API specifications or sample inputs, you can
have it generate initial wrappers, helper functions, or higher-level
“atomic” operations. Let the model draft code stubs, execute them in
a safe sandbox, and then critique its own output: “That endpoint
returned a 400—adjust the query parameters.” Over a few rapid
iterations, you end up with a suite of well-tested, narrowly scoped
tools that agents can call directly, without crafting every wrapper by
hand.
This approach shines when you’re wrestling with a sprawling API
landscape. Instead of manually writing dozens of microservice
clients, you point the model at your OpenAPI spec (or code samples)
and let it spin up a first draft of each function. Human reviewers
then validate and tighten the generated code before it enters your
continuous integration/continuous deployment (CI/CD) pipeline,
ensuring security and correctness. As your APIs evolve, you simply
rerun the same generate-and-refine loop to keep your tools in sync—
saving weeks of boilerplate work and avoiding brittle, handwritten
glue code.
While foundation-driven tool creation slashes development time and
scales effortlessly, it still demands clear validation criteria (tests,
response checks, schema enforcement) and developer oversight.
The model’s natural language critiques make it easy to understand
any recommended fixes, but you’re ultimately responsible for
catching edge cases, guarding against security gaps, and confirming
business logic alignment. When done right, this hybrid of AI
creativity and human review transforms a tangled API ecosystem
into a lean, agent-ready toolkit—unlocking rapid, reliable automation
across your organization.

-- 127 of 559 --

Real-Time Code Generation
Real-time code generation involves an AI agent writing and
executing code as needed during its operation. This capability
enables the agent to create new tools or modify existing ones to
address specific tasks, making it highly adaptable. For instance, if an
AI agent encounters a novel API or an unfamiliar problem, it can
generate code to interface with the API or develop a solution to the
problem in real time.
The process begins with the agent analyzing the task at hand and
determining the necessary steps to accomplish it. Based on its
understanding, the agent writes code snippets, which it then
attempts to execute. If the code does not perform as expected, the
agent iteratively revises it, learning from each attempt until it
achieves the desired outcome. This iterative process of trial and
error enables the agent to refine its tools continuously, improving its
performance and expanding its capabilities autonomously.
Real-time code generation offers several compelling advantages,
particularly in terms of adaptability and efficiency. The ability to
generate code on-the-fly enables AI agents to quickly adapt to new
tasks and environments. This adaptability is crucial for applications
requiring dynamic problem-solving and flexibility, such as real-time
data analysis and complex software integration tasks. By generating
code in real time, AI agents can address immediate needs without
waiting for human intervention, significantly speeding up processes,
reducing downtime, and enhancing overall efficiency.
However, real-time code generation also presents several challenges
and risks. Quality control is a major concern, as ensuring the quality
and security of autonomously generated code is critical. Poor-quality
code can lead to system failures, security breaches, and other
significant issues. Security risks are another major challenge, as
allowing AI agents to execute self-generated code introduces the
potential for malicious actors to exploit this capability to inject

-- 128 of 559 --

harmful code, leading to data breaches, unauthorized access, or
system damage. Implementing robust security measures and
oversight is essential to mitigate these risks.
A less obvious but critical drawback is repeatability. When your agent
recreates tools from scratch each time, you lose predictability—
success for one invocation doesn’t guarantee success for the next.
Performance can fluctuate wildly, and subtle changes in prompts or
model updates can lead to entirely different code paths. This
instability complicates debugging, testing, and compliance, making it
hard to certify that your agent will always behave as expected.
Resource consumption is also a critical consideration, as real-time
code generation and execution can be resource-intensive, requiring
substantial computational power and memory, especially when naive
or inefficient solutions are drafted and executed. Placing guardrails
on multiple aspects of system performance can help to mitigate
these risks.
Tool Use Configuration
Foundation model APIs from OpenAI, Anthropic, Gemini, and more
let you explicitly control the model’s use of tools via a tool-choice
parameter—shifting from flexible foundation model–driven invocation
to deterministic behavior. In “auto” mode, the model decides
whether to call tools based on context; this is good for general use.
In contrast, “any”/“required” forces the model to invoke at least one
tool, ideal when tool output is essential. Setting these parameters to
“none” blocks all tool calls—useful for controlled outputs or testing
environments. Some interfaces even let you pin a specific tool,
ensuring predictable, repeatable flows. By choosing the appropriate
mode, you decide whether to let the foundation model manage tasks
flexibly or impose structure—balancing flexibility, reliability, and
predictability.

---

## Sección 53: Chapter 4. Tool Use

-- 129 of 559 --

Even the best agents can misstep—skipping necessary tool calls,
outputting invalid JSON, or running tools that error out—so you need
reliable fallback and postprocessing mechanisms in place. After every
model response, inspect whether it invoked the right tools, produced
valid JSON, and succeeded without runtime errors. If anything
breaks, respond with a corrective flow:
Validate first using your schema (e.g., via jsonschema or
Pydantic). This catches missing fields or malformed
structures. If a tool was skipped, trigger it automatically; if
the JSON is invalid, prompt the model to correct it.
Retry intelligently, using structured logic such as exponential
backoff for transient failures, or regenerate only the
problematic portion instead of restarting the whole
exchange.
Fall back gracefully when retries fail. Options include
switching to a backup model or service, asking the user for
clarification, using cached data, or returning a safe default.
Log everything—prompts, tool calls, validation errors, retries,
fallbacks—for observability, debugging, and continuous
improvement.
By validating outputs, retrying strategically, and falling back
gracefully—all while logging every step—you transform random
failures into manageable, predictable behavior. This shift is essential
for delivering robust, production-grade agents.
Conclusion
Tools enable AI agents to perform tasks, make decisions, and
interact with their environment effectively. These range from simple
to complex tasks requiring advanced reasoning. Handcrafted tools,
manually designed by developers, offer precision but can be time-

-- 130 of 559 --

consuming to maintain. Plug-in tools, provided by platforms like
OpenAI and Google’s Gemini, enable rapid integration and scalability
but lack customizability.
Automated tool development, including real-time code generation,
imitation learning, and reinforcement learning, allows AI agents to
dynamically adapt and refine their abilities. This enhances their
versatility and problem-solving capabilities, enabling continuous
improvement and autonomous expansion of tools. Building and
maintaining the toolkit for your agent is one of the most critical ways
to give your agent the capabilities to succeed in the task at hand.
Now that we know how to build and curate a set of tools that we
provide to our agent, we’ll move on to consider how we’ll enable the
agent to make plans, select and parameterize tools, and put these
pieces together to perform useful work. In the next chapter, we’ll
discuss how we can organize a sequence of tools to perform
complex tasks in a process we call orchestration.

-- 131 of 559 --

---

## Sección 54: Chapter 5. Orchestration

Now that your agent has a set of tools that can be used, it’s time to
orchestrate them to solve real tasks. Orchestration involves more
than just deciding which tools to call and when—it also requires
constructing the right context for each model invocation to ensure
effective, grounded actions. While simple tasks may only need a
single tool and minimal context, more complex workflows demand
careful planning, memory retrieval, and dynamic context assembly to
perform each step accurately. In this chapter, we’ll cover
orchestration strategies, context engineering, tool selection,
execution, and planning topologies to build agents capable of
handling realistic, multistep tasks efficiently and reliably. As we can
see in Figure 5-1, orchestration is how the system utilizes the
resources at its disposal to address the user query effectively.

-- 132 of 559 --

Figure 5-1. Orchestration as the core logic that handles user queries and
coordinates calls to the foundation models, external and local tools, and to various
databases to retrieve additional information.
Agent Types
Before diving into specific orchestration strategies, it’s important to
understand the different types of agents you can build. Each agent
type embodies a distinct approach to reasoning, planning, and
action, shaping how tasks are decomposed and executed. Some
agents respond instantly with preprogrammed mappings, while
others iteratively reason and reflect to handle complex, open-ended
goals. The choice of agent type directly influences your system’s
performance, cost, and capabilities. In this section, we will explore
the spectrum: from reflex agents that provide lightning-fast
responses, to deep research agents that tackle multistage
investigations with adaptive plans and synthesis. Understanding
these archetypes will help design agents aligned with your

-- 133 of 559 --

application needs and constraints and will illuminate how
orchestration patterns, tool selection, and context construction come
together within each type to achieve effective, reliable outcomes.
Reflex Agents
Reflex agents implement a direct mapping from input to action
without any internal reasoning trace. Simple reflex agents follow “ifcondition, then-action” rules, calling the appropriate tool
immediately upon detecting predefined triggers. Because they
bypass intermediate thought steps, reflex agents deliver responses
with minimal latency and predictable performance, making them well
suited for use cases like keyword-based routing, single-step data
lookups, or basic automations (e.g., “If X, call tool Y”). However,
their limited expressiveness means they cannot handle tasks
requiring multistep reasoning or context beyond the immediate
input.
ReAct Agents
ReAct agents interleave Reasoning and Action in an iterative loop:
the model generates a
thought, selects and invokes a tool, observes
the result, and repeats as needed. This pattern enables the agent to
break complex tasks into manageable steps, updating its plan based
on intermediate observations:
ZERO_SHOT_REACT_DESCRIPTION (LangChain) presents
tools and instructions in a single prompt, relying on the
LLM’s innate reasoning to select and call tools without
example traces.
CHAT_ZERO_SHOT_REACT_DESCRIPTION extends this by
incorporating conversational history, enabling the agent to
use past exchanges when deciding on its next action.

-- 134 of 559 --

ReAct agents excel in exploratory scenarios—dynamic data analysis,
multisource aggregation, or troubleshooting—where the ability to
adapt midstream outweighs the additional latency and computational
overhead. Their looped structure also provides transparency (“chain
of thought”) that aids debugging and auditability, though it can
increase API costs and response times.
Planner-Executor Agents
Planner-executor agents split a task into two distinct phases:
planning, where the model generates a multistep plan; and
execution, where each planned step is carried out via tool calls. This
clear separation lets the planner focus on long-horizon reasoning
while executors invoke only the necessary tools, reducing redundant
LLM calls. Because the plan is explicit, debugging and monitoring
become straightforward—you can inspect the generated plan, track
which step failed, and replan if needed. This approach has multiple
advantages:
Clear decomposition
Complex tasks break down into manageable subtasks.
Debuggability
Explicit plans reveal where and why errors occur.
Cost efficiency
Smaller models or fewer LLM calls handle execution, reserving
large models for planning.
Query-Decomposition Agents
Query-decomposition agents tackle a complex question by iteratively
breaking it into subquestions, invoking search or other tools for
each, and then synthesizing a final answer. This pattern—often

-- 135 of 559 --

called “self-ask with search”—prompts the model: “What follow-up
question do I need?” → call search → “What’s the next question?”
→ … → “What’s the final answer?”
Example: SELF_ASK_WITH_SEARCH
Ask: “Who lived longer, X or Y?”
Self-ask: “What’s X’s lifespan?” → search tool
Self-ask: “What’s Y’s lifespan?” → search tool
Synthesize: “X lived 85 years, Y lived 90 years, so Y lived
longer”
This approach excels when external knowledge retrieval is needed,
ensuring each fact is grounded in tool output before composing the
final response.
Reflection Agents
Reflection and metareasoning agents extend the ReAct paradigm by
not only interleaving thought and action but also reviewing past
steps to identify and correct mistakes before proceeding. In this
approach—exemplified by the recently proposed ReflAct framework—
the agent continuously grounds its reasoning in goal-state
reflections, measuring its current state against the intended outcome
and adjusting its plan when misalignments arise. Reflection prompts
encourage the model to critique its own chain of thought, correct
logical errors, and reinforce successful strategies, effectively
simulating human-style self-assessment during complex problemsolving.

---

## Sección 55: Chapter 5. Orchestration

-- 136 of 559 --

This pattern shines in high-stakes workflows where early errors can
cascade into costly failures—such as financial transaction
orchestration, medical diagnosis support, or critical incident
response. By pairing each action with a reflection step, agents detect
when tool outputs deviate from expectations and can replan or roll
back before committing to irreversible operations. The added
metareasoning overhead does incur extra latency and compute, but
for tasks where correctness and reliability outweigh speed, reflection
agents offer a powerful guardrail against error propagation and help
maintain alignment with overarching goals.
Deep Research Agents
Deep research agents specialize in tackling open-ended, highly
complex investigations that require extensive external knowledge
gathering, hypothesis testing, and synthesis—think literature
reviews, scientific discovery, or strategic market analysis. They
combine multiple patterns: a planner-executor phase to chart
research workflows; query-decomposition to break down big
questions into targeted searches; and ReAct loops to iteratively
refine hypotheses based on new findings. In a typical cycle, a deep
research agent will:
1. Plan the overall research agenda (e.g., identify key subtopics
or data sources).
2. Decompose each subtopic into concrete queries (via
SELF_ASK or similar).
3. Invoke tools—from academic search APIs to domain-specific
databases—and reflect on the relevance and reliability of
each result.
4. Synthesize the insights into an evolving report or set of
recommendations, using LLM-driven summarization and
critique at each step.

-- 137 of 559 --

Strengths
Capability
It can handle high-complexity, multistage investigations that lean
on specialized databases and cross-disciplinary sources.
Adaptive
Research direction is adjusted as new evidence emerges.
Transparent
Explicit plans and decomposition steps make it easier to audit
methodology.
Weaknesses
High cost
Extensive foundation model use and multiple API calls inflate
compute and token expenses.
Latency
Each layer of planning, decomposition, and reflection adds delay.
Fragility
It is reliant on quality and availability of external data sources
and needs careful error handling and fallback strategies.
The best use cases are long-form, expert-level tasks—academic
literature surveys, technical due diligence, competitive intelligence—
where depth and rigor trump speed.
Table 5-1 offers a snapshot of today’s most common agent
archetypes—each with its own trade-offs in speed, flexibility, and
complexity. However, this landscape is evolving at breakneck speed.

-- 138 of 559 --

New hybrid patterns, metareasoning frameworks, and planning
strategies are emerging all the time, and the classification of agent
types will only grow more nuanced. Consider this list a starting point
rather than a definitive taxonomy: as the field advances, you’ll see
fresh approaches built on these foundations, so stay curious,
experiment often, and be ready to adapt your orchestration
strategies as the research and tooling continue to mature.

-- 139 of 559 --

T
a
bl
e
-
.
C
o
m
m
o
n
a
g
e
n
t
a
rc
h
e
ty
p
e
s
Agent type Strength Weakness Best use case
Reflex

-- 140 of 559 --

Millisecond
responses
No multistep
reasoning
Keyword
routing, simple
lookups
ReAct Flexible, onthe-fly
adaptation
Higher latency
and cost
Exploratory
workflows,
troubleshootin
g
Plan-execute Clear task
breakdown
Planning
overhead
Complex,
multistep
processes
Querydecompositio
n
Grounded
retrieval
accuracy
Multiple tool
calls
Research, factbased Q&A
Reflection Early error
detection
Added
compute and
latency
High-stakes,
safety-critical
tasks
Deep
research
Management of
multistage,
High compute
costs and very
high latency
Long-form
literature
reviews

-- 141 of 559 --

adaptive
investigations
Tool Selection
Before we get to orchestration, we will start with tool selection,
because it is the foundation for more advanced planning. Different
approaches to tool selection offer unique advantages and
considerations, meeting different requirements and environments.
We assume a set of tools have already been developed, so if you
need a refresher, go back to Chapter 4.

-- 142 of 559 --

T
a
b
l
e
-
.
T
o
o
l
s
e
l
e
c
t
i
o
n
s
t
r
a
t
e
g
i
e
s

-- 143 of 559 --

Technique Pros Cons
Standard tool
selection
Simple to implement Scales poorly to high
numbers of tools
Semantic tool
selection Very
scalable to
large
numbers of
tools
Typically
low latency
to
implement
Often worse selection
accuracy due to semantic
collisions
Hierarchical tool
selection
Very scalable to
large numbers of
tools
Slower because it
requires multiple
sequential foundation
model calls

-- 144 of 559 --

Standard Tool Selection
The simplest approach is standard tool selection. In this case, the
tool, its definition, and its description are provided to a foundation
model, and the model is asked to select the most appropriate tool
for the given context. The output from the foundation model is then
compared with the toolset, and the closest one is chosen. This
approach is easy to implement, and requires no additional training,
embedding, or a toolset hierarchy to use. The main drawback is
latency, as it requires another foundation model call, which can add
seconds to the overall response time. It can also benefit from incontext learning, where few-shot examples can be provided to boost
predictive accuracy for your problem without the challenge of
training or fine-tuning a model.
Effective tool selection often comes down to how you describe each
capability. Start by giving every tool a concise, descriptive name
(e.g., calculate_sum instead of process_numbers) and follow it
with a one-sentence summary that highlights its unique purpose
(e.g., “Returns the sum of two numbers”). Include an example
invocation in the description—showing typical inputs and outputs—to
ground the model’s understanding in concrete terms rather than
abstract language. Finally, enforce input constraints by specifying
types and ranges (e.g., “x and y must be integers between 0 and
1,000”), which reduces ambiguous matches and helps the
foundation model rule out irrelevant tools. By iteratively testing with
representative prompts and refining each description for clarity and
specificity, you’ll see significant gains in selection accuracy without
any extra training or infrastructure. This sounds simple enough, but
as the number of tools you register with your agent grows, overlap
in the tool descriptions frequently becomes a problem and a source
of mistakes in tool selection. Here we define another tool that is
capable of computing mathematical expressions and evaluating
formulas, something foundation models tend to not be good at:

---

## Sección 56: Chapter 5. Orchestration

-- 145 of 559 --

from langchain_core.tools import tool
import requests
@tool
def query_wolfram_alpha(expression: str) -> str:
"""
Query Wolfram Alpha to compute expressions or retrieve
information.
Args: expression (str): The mathematical expression or
query to evaluate.
Returns: str: The result of the computation or the
retrieved information.
"""
api_url = f'''https://api.wolframalpha.com/v1/result?
i={requests.utils.quote(expression)}&
appid=YOUR_WOLFRAM_ALPHA_APP_ID'''
try:
response = requests.get(api_url)
if response.status_code == 200:
return response.text
else: raise ValueError(f"Wolfram Alpha API Error:
{response.status_code} - {response.text}")
except requests.exceptions.RequestException as e:
raise ValueError(f"Failed to query Wolfram Alpha:
{e}")
@tool
def trigger_zapier_webhook(zap_id: str, payload: dict) ->
str:
""" Trigger a Zapier webhook to execute a predefined
Zap.
Args:
zap_id (str): The unique identifier for the Zap to be
triggered.
payload (dict): The data to send to the Zapier webhook.
Returns:
str: Confirmation message upon successful triggering of
the Zap.
Raises: ValueError: If the API request fails or returns
an error.

-- 146 of 559 --

"""
zapier_webhook_url =
f"https://hooks.zapier.com/hooks/catch/{zap_id}/"
try:
response = requests.post(zapier_webhook_url,
json=payload)
if response.status_code == 200:
return f"Zapier webhook '{zap_id}' successfully
triggered."
else:
raise ValueError(f'''Zapier API Error:
{response.status_code} -
{response.text}''')
except requests.exceptions.RequestException as e:
raise ValueError(f"Failed to trigger Zapier webhook
'{zap_id}': {e}")
Here’s another example of a tool you might want to register with
your agent to notify a particular channel when your task is
completed or needs attention for a human-in-the-loop pattern:
@tool
def send_slack_message(channel: str, message: str) -> str:
""" Send a message to a specified Slack channel.
Args:
channel (str): The Slack channel ID or name where the
message will be sent.
message (str): The content of the message to send.
Returns:
str: Confirmation message upon successful sending of
the Slack message.
Raises: ValueError: If the API request fails or returns
an error.
"""
api_url = "https://slack.com/api/chat.postMessage"
headers = { "Authorization": "Bearer
YOUR_SLACK_BOT_TOKEN",

-- 147 of 559 --

"Content-Type": "application/json" }
payload = { "channel": channel, "text": message }
try:
response = requests.post(api_url, headers=headers,
json=payload)
response_data = response.json()
if response.status_code == 200 and
response_data.get("ok"):
return f"Message successfully sent to Slack
channel '{channel}'."
else:
error_msg = response_data.get("error", "Unknown
error")
raise ValueError(f"Slack API Error:
{error_msg}")
except requests.exceptions.RequestException as e:
raise ValueError(f'''Failed to send message to
Slack channel
"{channel}": {e}''')
Now that we’ve defined our tools, we bind them to the model client
and allow the model to pick which tools to invoke to best address
the input:
# Initialize the LLM with GPT-4o and bind the tools
llm = ChatOpenAI(model_name="gpt-4o")
llm_with_tools = llm.bind_tools([get_stock_price,
send_slack_message, query_wolfram_alpha])
messages = [HumanMessage("What is the stock price of
Apple?")]
ai_msg = llm_with_tools.invoke(messages)
messages.append(ai_msg)
for tool_call in ai_msg.tool_calls:
tool_msg = get_stock_price.invoke(tool_call)
final_response = llm_with_tools.invoke(messages)

-- 148 of 559 --

print(final_response.content)
In summary, standard tool selection offers a fast, intuitive way to
integrate tools into your agent system without additional
infrastructure or training overhead. While it scales well for small
toolsets, careful description engineering becomes essential as your
tool library grows to maintain accuracy and avoid misselection. By
combining thoughtful descriptions with iterative prompt testing, you
can achieve robust performance using this simple yet powerful
approach.
Semantic Tool Selection
Another approach, semantic tool selection, uses semantic
representations to index all of the available tools and semantic
search to retrieve the most relevant tools. This reduces the number
of tools to choose from and then relies on the foundation model to
choose the correct tool and parameters from this much smaller set.
Ahead of time, each tool definition and description is embedded
using an encoder-only model—such as OpenAI’s Ada model,
Amazon’s Titan model, Cohere’s Embed model, ModernBERT, or
others—which represents the tool name and description as a vector
of numbers. This process is illustrated in Figure 5-2, which shows
how each tool is embedded into a vector representation for efficient
retrieval based on semantic similarity to the task query.

-- 149 of 559 --

Figure 5-2. Semantic tool embedding for retrieval-based selection. Each tool or
skill is encoded into a dense vector representation using an embedding model.
These vectors are then stored for efficient semantic search, enabling the system to
retrieve the most relevant tools based on the task query.
These tools are then indexed in a lightweight vector database. At
runtime, the current context is embedded using the same
embedding model, a search is performed on the database, and the
top tools are selected and retrieved. These tools are then passed to
the foundation model, which can then choose to invoke a tool and
choose the parameters. The tool is then invoked, and the response
is used to compose the response for the user. This process is
illustrated in Figure 5-3, which shows how the system retrieves
relevant tools and uses the foundation model to select and invoke
the appropriate tool with its parameters to generate the final
response.

---

## Sección 57: Chapter 5. Orchestration

-- 150 of 559 --

Figure 5-3. Semantic tool retrieval and invocation workflow. At runtime, the user
query is embedded and used to retrieve the top relevant tools from the vector

-- 151 of 559 --

database. The foundation model then selects the appropriate tool and determines
its parameters, invokes the tool, and integrates the tool’s output to generate the
final user response.
This is the most common pattern and is recommended for most use
cases. It’s typically faster than standard tool selection, performant,
and reasonably scalable. First, the tool database is set up by
embedding the tool descriptions:
import os
import requests
import logging
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.messages import HumanMessage,
AIMessage, ToolMessage
from langchain.vectorstores import FAISS
import faiss
import numpy as np
# Initialize OpenAI embeddings
embeddings =
OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
# Tool descriptions
tool_descriptions = {
"query_wolfram_alpha": '''Use Wolfram Alpha to
compute mathematical
expressions or retrieve
information.''',
"trigger_zapier_webhook": '''Trigger a Zapier
webhook to execute
predefined automated
workflows.''',
"send_slack_message": '''Send messages to specific
Slack channels to
communicate with team
members.'''
}
# Create embeddings for each tool description

-- 152 of 559 --

tool_embeddings = []
tool_names = []
for tool_name, description in tool_descriptions.items():
embedding = embeddings.embed_text(description)
tool_embeddings.append(embedding)
tool_names.append(tool_name)
# Initialize FAISS vector store
dimension = len(tool_embeddings[0])
index = faiss.IndexFlatL2(dimension)
# Normalize embeddings for cosine similarity
faiss.normalize_L2(np.array(tool_embeddings).astype('float3
2'))
# Convert list to FAISS-compatible format
tool_embeddings_np =
np.array(tool_embeddings).astype('float32')
index.add(tool_embeddings_np)
# Map index to tool functions
index_to_tool = {
0: query_wolfram_alpha,
1: trigger_zapier_webhook,
2: send_slack_message
}
Those embeddings for your tool catalog only need to be computed
once, and now they’re ready to be quickly retrieved. To choose your
tool, you embed your query using the same embedding model,
perform a quick database lookup, choose the parameters, and
invoke our tool:
def select_tool(query: str, top_k: int = 1) -> list:
"""
Select the most relevant tool(s) based on the user's
query using
vector-based retrieval.

-- 153 of 559 --

Args:
query (str): The user's input query.
top_k (int): Number of top tools to retrieve.
Returns:
list: List of selected tool functions.
"""
query_embedding =
embeddings.embed_text(query).astype('float32')
faiss.normalize_L2(query_embedding.reshape(1, -1))
D, I = index.search(query_embedding.reshape(1, -1),
top_k)
selected_tools = [index_to_tool[idx] for idx in I[0] if
idx in index_to_tool]
return selected_tools
def determine_parameters(query: str, tool_name: str) ->
dict:
"""
Use the LLM to analyze the query and determine the
parameters for the tool
to be invoked.
Args:
query (str): The user's input query.
tool_name (str): The selected tool name.
Returns:
dict: Parameters for the tool.
"""
messages = [
HumanMessage(content=f'''Based on the user's query:
'{query}', what
parameters should be used for the tool
'{tool_name}'?''')
]
# Call the LLM to extract parameters
response = llm(messages)
# Example logic to parse response from LLM
parameters = {}

-- 154 of 559 --

if tool_name == "query_wolfram_alpha":
parameters["expression"] = response['expression']
# Extract mathematical expression
elif tool_name == "trigger_zapier_webhook":
parameters["zap_id"] = response.get('zap_id',
"123456")
parameters["payload"] = response.get('payload',
{"data": query})
elif tool_name == "send_slack_message":
parameters["channel"] = response.get('channel',
"#general")
parameters["message"] = response.get('message',
query)
return parameters
# Example user query
user_query = "Solve this equation: 2x + 3 = 7"
# Select the top tool
selected_tools = select_tool(user_query, top_k=1)
tool_name = selected_tools[0] if selected_tools else None
if tool_name:
# Use LLM to determine the parameters based on the query
and the selected tool
args = determine_parameters(user_query, tool_name)
# Invoke the selected tool
try:
# Assuming each tool has an `invoke` method to
execute it
tool_result = globals()[tool_name].invoke(args)
print(f"Tool '{tool_name}' Result: {tool_result}")
except ValueError as e:
print(f"Error invoking tool '{tool_name}': {e}")
else:
print("No tool was selected.")

-- 155 of 559 --

Hierarchical Tool Selection
If your scenario involves a large number of tools, however, you
might need to consider hierarchical tool selection. This is especially
true if many of those tools are semantically similar and you are
looking to improve tool selection accuracy at the price of higher
latency and complexity. In this pattern, you organize your tools into
groups and provide a description for each group. Your tool selection
(either generative or semantic) first selects a group and then
performs a secondary search only among the tools in that group.
Figure 5-4 visualizes this two-stage process, showing how a query is
first routed to the appropriate tool group and then refined to a single
tool within that group.

---

## Sección 58: Chapter 5. Orchestration

-- 156 of 559 --

Figure 5-4. Hierarchical tool-selection workflow. The agent first chooses the most
relevant tool group for the query, and then narrows the search to select a single
tool within that group—in this example, routing a math question through the tool
group and ultimately invoking query_wolfram_alpha
.

-- 157 of 559 --

While this is slower and would be expensive to parallelize, it reduces
the complexity of the tool selection task into two smaller chunks,
and frequently results in higher overall tool selection accuracy.
Crafting and maintaining these tool groups takes time and effort, so
this is not recommended unless you have a large number of tools:
import os
import requests
import logging
import numpy as np
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage,
AIMessage, ToolMessage
# Initialize the LLM
llm = ChatOpenAI(model_name="gpt-4", temperature=0)
# Define tool groups with descriptions
tool_groups = {
"Computation": {
"description": '''Tools related to mathematical
computations and
data analysis.''',
"tools": []
},
"Automation": {
"description": '''Tools that automate workflows and
integrate
different services.''',
"tools": []
},
"Communication": {
"description": "Tools that facilitate communication
and messaging.",
"tools": []
}
}
# Define Tools

-- 158 of 559 --

@tool
def query_wolfram_alpha(expression: str) -> str:
api_url = f'''https://api.wolframalpha.com/v1/result?i=
{requests.utils.quote(expression)}&appid=
{WOLFRAM_ALPHA_APP_ID}'''
try:
response = requests.get(api_url)
if response.status_code == 200:
return response.text
else:
raise ValueError(f'''Wolfram Alpha API Error:
{response.status_code}
- {response.text}''')
except requests.exceptions.RequestException as e:
raise ValueError(f"Failed to query Wolfram Alpha:
{e}")
@tool
def trigger_zapier_webhook(zap_id: str, payload: dict) ->
str:
zapier_webhook_url =
f"https://hooks.zapier.com/hooks/catch/{zap_id}/"
try:
response = requests.post(zapier_webhook_url,
json=payload)
if response.status_code == 200:
return f"Zapier webhook '{zap_id}' successfully
triggered."
else:
raise ValueError(f'''Zapier API Error:
{response.status_code} -
{response.text}''')
except requests.exceptions.RequestException as e:
raise ValueError(f"Failed to trigger Zapier webhook
'{zap_id}': {e}")
@tool
def send_slack_message(channel: str, message: str) -> str:
api_url = "https://slack.com/api/chat.postMessage"
headers = {
"Authorization": f"Bearer {SLACK_BOT_TOKEN}",
"Content-Type": "application/json"
}

-- 159 of 559 --

payload = {
"channel": channel,
"text": message
}
try:
response = requests.post(api_url, headers=headers,
json=payload)
response_data = response.json()
if response.status_code == 200 and
response_data.get("ok"):
return f"Message successfully sent to Slack
channel '{channel}'."
else:
error_msg = response_data.get("error", "Unknown
error")
raise ValueError(f"Slack API Error:
{error_msg}")
except requests.exceptions.RequestException as e:
raise ValueError(f'''Failed to send message to
Slack channel
'{channel}': {e}''')
# Assign tools to their respective groups
tool_groups["Computation"]
["tools"].append(query_wolfram_alpha)
tool_groups["Automation"]
["tools"].append(trigger_zapier_webhook)
tool_groups["Communication"]
["tools"].append(send_slack_message)
# -------------------------------
# LLM-Based Hierarchical Tool Selection
# -------------------------------
def select_group_llm(query: str) -> str:
"""
Use the LLM to determine the most appropriate tool
group based on the
user's query.
Args:
query (str): The user's input query.
Returns:

-- 160 of 559 --

str: The name of the selected group.
"""
prompt = f'''Select the most appropriate tool group for
the following query:
'{query}'.\nOptions are: Computation, Automation,
Communication.'''
response = llm([HumanMessage(content=prompt)])
return response.content.strip()
def select_tool_llm(query: str, group_name: str) -> str:
"""
Use the LLM to determine the most appropriate tool
within a group based
on the user's query.
Args:
query (str): The user's input query.
group_name (str): The name of the selected tool
group.
Returns:
str: The name of the selected tool function.
"""
prompt = f'''Based on the query: '{query}', select the
most appropriate
tool from the group '{group_name}'.'''
response = llm([HumanMessage(content=prompt)])
return response.content.strip()
# Example user query
user_query = "Solve this equation: 2x + 3 = 7"
# Step 1: Select the most relevant tool group using LLM
selected_group_name = select_group_llm(user_query)
if not selected_group_name:
print("No relevant tool group found for your query.")
else:
logging.info(f"Selected Group: {selected_group_name}")
print(f"Selected Tool Group: {selected_group_name}")
# Step 2: Select the most relevant tool within the
group using LLM
selected_tool_name = select_tool_llm(user_query,

-- 161 of 559 --

selected_group_name)
selected_tool = globals().get(selected_tool_name, None)
if not selected_tool:
print("No relevant tool found within the selected
group.")
else:
logging.info(f"Selected Tool:
{selected_tool.__name__}")
print(f"Selected Tool: {selected_tool.__name__}")
# Prepare arguments based on the tool
args = {}
if selected_tool == query_wolfram_alpha:
# Assume the entire query is the expression
args["expression"] = user_query
elif selected_tool == trigger_zapier_webhook:
# Use placeholders for demo
args["zap_id"] = "123456"
args["payload"] = {"message": user_query}
elif selected_tool == send_slack_message:
# Use placeholders for demo
args["channel"] = "#general"
args["message"] = user_query
else:
print("Selected tool is not recognized.")
# Invoke the selected tool
try:
tool_result = selected_tool.invoke(args)
print(f"Tool '{selected_tool.__name__}' Result:
{tool_result}")
except ValueError as e:
print(f"Error: {e}")
Tool Execution
Parametrization is the process of defining and setting the parameters
that will guide the execution of a tool in a language model. This
process is crucial, as it determines how the model interprets the task

---

## Sección 59: Chapter 5. Orchestration

-- 162 of 559 --

and tailors its response to meet the specific requirements.
Parameters are defined by the tool definition, as discussed in more
detail in Chapter 4. The current state of the agent, including
progress so far, is included as additional context in the prompt
window, and the foundation model is instructed to fill the parameters
with appropriate data types to match the expected inputs for the
function call. Additional context, such as the current time or the
user’s location, can be injected into the context window to provide
additional guidance for functions that require this type of
information. It is recommended to use a basic parser to validate that
the inputs meet the basic criteria for the data types, and to instruct
the foundation model to correct the pattern if it does not pass this
check.
Once the parameters are set, the tool execution phase begins. Some
of these tools can easily be executed locally, while others will be
executed remotely by API. During execution, the model might
interact with various APIs, databases, or other tools to gather
information, perform calculations, or execute actions that are
necessary to complete the task. The integration of external data
sources and tools can significantly enhance the utility and accuracy
of the agent’s outputs. Timeout and retry logic will need to be
adjusted to the latency and performance requirements for the use
case.
Tool Topologies
Today, the majority of chatbot systems rely on single tool execution
without planning. This makes sense: it is easier to implement, and
has lower latency. If your team is developing its first agent-based
system, or if that is sufficient to meet the needs for your scenario,
then you can stop there after the following section, “Single Tool
Execution.” For many cases, however, we want our agents to be able
to perform complex tasks that require multiple tools. By providing an

-- 163 of 559 --

agent with a sufficient range of tools, you can then enable your
agent to flexibly arrange those tools and apply them in correct order
to solve a wider variety of problems. In traditional software
engineering, the designers had to implement the exact control flow
and order in which steps should be taken. Now, we can implement
the tools and define the tools topology in which the agent can
operate, and then allow the exact composition to be designed
dynamically in response to the context and task at hand. This
section considers this range of tool topologies and discusses their
trade-offs.
Single Tool Execution
We’ll begin with tasks that require precisely one tool. In this case,
planning consists of choosing the one tool most appropriate to
address the task. Once the tool is selected, it must be correctly
parameterized based on the tool definition. The tool is then
executed, and its output is used as an input when composing the
final response for the user, which can be seen in Figure 5-5. While
this is a minimal definition of a plan, it is the foundation from which
we will build more complex patterns.
Figure 5-5. Single tool execution workflow. The user query is passed to the model
(step 1), which selects the appropriate tool from the toolset (step 2), receives the
tool output (step 3), and composes the final response for the user (step 4).
To make this example more concrete, Figure 5-6 shows this same
single tool execution workflow where the agent retrieves and returns
the current weather for New York City.

-- 164 of 559 --

Figure 5-6. Example of single tool execution for weather retrieval. The user asks
for the weather in New York City, the model selects and parameterizes the weather
tool, retrieves the temperature and conditions as a JSON payload, and composes a
natural language response using this information for the user.
While this single tool execution pattern is simple, it forms the
foundation upon which more complex multistep planning and tool
orchestration strategies are built in advanced agent systems. In the
next section, we’ll look at how we can execute more tools without
sacrificing latency.
Parallel Tool Execution
The first increase in complexity comes with tool parallelism. In some
cases, it might be worth taking multiple actions on the input. For
example, imagine that you need to look up a record for a patient. If
your toolset includes multiple tools that access multiple sources of
data, then it will be necessary to execute multiple actions to retrieve
data from each of the sources. This increases the complexity of the
problem because it is unclear how many tools need to be executed.
A common approach is to retrieve a maximum number of tools that
might be executed—say, five—using semantic tool selection. Next,
make a second call to a foundation model with each of these five
tools, and ask it to select the five or fewer tools that are necessary
to the problem, filtering down to the tools necessary for the task.
Similarly, the foundation model can be called repeatedly with the
additional context of which tools have already been selected until it
chooses to add no more tools. Once selected, these tools are
independently parameterized and executed. After all tools have been

---

## Sección 60: Chapter 5. Orchestration

-- 165 of 559 --

completed, their results are passed to the foundation model to draft
a final response for the user. Figure 5-7 illustrates this pattern.
Figure 5-7. Parallel tool execution pattern. In this example, the user asks how to
handle a customer ticket. The orchestration process selects multiple tools to run in
parallel—such as retrieving customer details, order history, service logs, similar
tickets, and relevant support policies—before integrating their outputs to generate
the final response.
This pattern of parallel tool execution enables agents to efficiently
gather comprehensive information from multiple sources in a single
step. By integrating these results before composing a response, the
agent can provide richer, more informed outputs while minimizing
overall latency.
Chains
The next increase in complexity brings us to chains. Chains refer to
sequences of actions that are executed one after another, with each
action depending on the successful completion of the previous one.
Planning chains involves determining the order in which actions
should be performed to achieve a specific goal while ensuring that
each action leads to the next without interruption. Chains are
common in tasks that involve step-by-step processes or linear
workflows.
Fortunately, LangChain offers a declarative syntax, the LangChain
Expression Language (LCEL), to build chains by composing existing

-- 166 of 559 --

Runnables rather than manually wiring up Chain objects. Under the
hood, LCEL treats every chain as a Runnable implementing the same
interface, so you can invoke(), batch(), or stream() any LCEL
chain just like any other Runnable:
from langchain_core.runnables import RunnableLambda
from langchain.chat_models import ChatOpenAI
from langchain_core.prompts import PromptTemplate
# Wrap a function or model call as a Runnable
llm =
RunnableLambda.from_callable(ChatOpenAI(model_name="gpt-4",
temperature=0).generate)
prompt = RunnableLambda.from_callable(lambda text:
PromptTemplate.from_template(text).format_prompt({"input":
text}
).to_messages())
# Traditional chain equivalent:
# chain = LLMChain(prompt=prompt, llm=llm)
# LCEL chain using pipes:
chain = prompt | llm
# Invoke the chain
result = chain.invoke("What is the capital of France?")
By switching to LCEL, you reduce boilerplate, gain advanced
execution features, and keep your chains concise and maintainable.
Figure 5-8 illustrates the general agentic chain pattern that underlies
many LCEL workflows.
Figure 5-8. Agentic chain execution pattern. The user prompt is passed to the
model, which performs reasoning and invokes tools to interact with the
environment. The resulting observations are looped back into the model for further
reasoning until the task is complete.

-- 167 of 559 --

The planning of chains requires careful consideration of the
dependencies between actions, aiming to orchestrate a coherent
flow of activity toward the desired outcome. It is highly
recommended that a maximum length be set to the tool chains, as
errors can compound down the length of the chain. As long as the
task is not expected to fan out to multiple branching subtasks,
chains provide an excellent trade-off between adding planning for
multiple tools with dependencies and keeping the complexity
relatively low.
Graphs
For support scenarios with multiple decision points, a graph topology
models complex, nonhierarchical flows far more expressively than
chains or trees. Unlike linear chains or strictly branching trees, graph
structures let you define both conditional edges
and consolidation
edges, so that parallel paths can merge back into shared nodes.
Each node in a graph represents a discrete tool invocation (or logical
step), while edges—including add_conditional_edges—declare
the exact conditions under which the agent may transition between
steps. By consolidating outputs from multiple branches into a single
downstream node (e.g., summarize_response), you can stitch
together findings from separate handlers into a unified customer
reply.
However, full graph execution typically incurs significantly more
foundation model calls than chains—adding latency and cost—so it’s
crucial to cap depth and branching factor. In addition, cycles,
unreachable nodes, or conflicting state merges introduce new
classes of errors that must be managed through rigorous validation
and testing. The following is an example for how to implement a
graph in LangGraph:
from langgraph.graph import StateGraph, START, END

-- 168 of 559 --

from langchain.chat_models import ChatOpenAI
# Initialize LLM
llm = ChatOpenAI(model_name="gpt-4", temperature=0)
# 1. Node definitions
def categorize_issue(state: dict) -> dict:
prompt = (
f"Classify this support request as 'billing' or
'technical'.\n\n"
f"Message: {state['user_message']}"
)
generations =
llm.generate([{"role":"user","content":prompt}]).generation
s
kind = generations[0][0].text.strip().lower()
return {**state, "issue_type": kind}
def handle_invoice(state: dict) -> dict:
# Fetch invoice details...
return {**state, "step_result": f"Invoice details for
{state['user_id']}"}
def handle_refund(state: dict) -> dict:
# Initiate refund workflow...
return {**state, "step_result": "Refund process
initiated"}
def handle_login(state: dict) -> dict:
# Troubleshoot login...
return {**state, "step_result": "Password reset link
sent"}
def handle_performance(state: dict) -> dict:
# Check performance metrics...
return {**state, "step_result": "Performance metrics
analyzed"}
def summarize_response(state: dict) -> dict:
# Consolidate previous step_result into a user-facing
message
details = state.get("step_result", "")
summary = llm.generate([{"role":"user","content":
f"Write a concise customer reply based on:
{details}"
}]).generations[0][0].text.strip()
return {**state, "response": summary}

---

## Sección 61: Chapter 5. Orchestration

-- 169 of 559 --

This next section wires up the logical flow in each node into an
actual execution graph. By creating a new StateGraph, we
establish the starting point with START → categorize_issue,
which ensures every request first passes through the classification
step. Then, using add_conditional_edges, you encode the core
business rules: after categorization, only billing issues route into the
invoice/refund handlers, and only technical issues route into the
login/performance handlers. Each router function inspects the
evolving state and returns the name of the next node, and the
mapping ensures that only valid successors are enabled at runtime.
This approach keeps the decision logic explicit, enforces the correct
sequence of tool invocations, and prevents invalid transitions—all
before we ever execute a single tool call:
# 2. Build the graph
graph = StateGraph()
# Start → categorize_issue
graph.add_edge(START, categorize_issue)
# categorize_issue → billing or technical
def top_router(state):
return "billing" if state["issue_type"] == "billing"
else "technical"
graph.add_conditional_edges(
categorize_issue,
top_router,
mapping={"billing": handle_invoice, "technical":
handle_login}
)
# Billing sub-branches: invoice vs. refund
def billing_router(state):
msg = state["user_message"].lower()
return "invoice" if "invoice" in msg else "refund"
graph.add_conditional_edges(
handle_invoice,
billing_router,
mapping={"invoice": handle_invoice, "refund":
handle_refund}
)

-- 170 of 559 --

# Technical sub-branches: login vs. performance
def tech_router(state):
msg = state["user_message"].lower()
return "login" if "login" in msg else "performance"
graph.add_conditional_edges(
handle_login,
tech_router,
mapping={"login": handle_login, "performance":
handle_performance}
)
This final wiring adds consolidation edges so that, no matter which
subpath was taken—whether the user needed an invoice lookup, a
refund, login troubleshooting, or performance checks—their result
feeds into the single summarize_response node. By connecting
each of the handler nodes (handle_refund,
handle_performance, handle_invoice, and handle_login)
into summarize_response, you ensure all divergent outcomes are
unified into one coherent customer reply. Finally, linking
summarize_response to END cleanly terminates the workflow,
guaranteeing every execution path converges on a polished
response before the graph finishes:
# Consolidation: both refund and performance (and
invoice/login) lead here
graph.add_edge(handle_refund, summarize_response)
graph.add_edge(handle_performance, summarize_response)
# Also cover paths where invoice or login directly go to
summary
graph.add_edge(handle_invoice, summarize_response)
graph.add_edge(handle_login, summarize_response)
# Final: summary → END
graph.add_edge(summarize_response, END)
# 3. Execute the graph
initial_state = {
"user_message": "Hi, I need help with my invoice and
possibly a refund.",

-- 171 of 559 --

"user_id": "U1234"
}
result = graph.run(initial_state, max_depth=5)
print(result["response"])
Graphs offer the ultimate flexibility for modeling complex, nonlinear
workflows—enabling you to branch, merge, and consolidate multiple
tool executions into a unified process. However, this expressiveness
comes with added overhead: more LLM calls, deeper routing logic,
and the potential for cycles or unreachable paths. To harness graphs
effectively, always anchor your design in your specific use case’s
requirements, and resist the temptation to overcomplicate.
Start with a chain if your task is strictly linear (e.g., prompt → model
→ parser). Chains are easy to reason about and debug. Adopt a
graph only when you must both branch and later consolidate
multiple streams of information (e.g., parallel analysis steps that
feed a single summary).
In practice, sketch your topology on paper first: label each node with
the tool or logical step, draw arrows for the allowed transitions, and
highlight where branches reunite. Then implement incrementally—
cap your depth and branching factor, write unit tests for each router,
and leverage LangGraph’s built-in tracing to validate that every path
leads to a terminal node.
Above all, keep it as simple as possible. Every additional node or
edge multiplies the potential execution paths and error modes. If a
simpler chain or tree meets your needs, save the graph patterns for
genuinely complex scenarios. By starting simple and iterating only as
your requirements demand, you’ll build robust, maintainable
orchestration that scales with confidence.

-- 172 of 559 --

Context Engineering
Context engineering is a core component of orchestration. It ensures
that each step in an agent’s plan has the right information and
instructions to perform effectively. While prompt engineering focuses
on writing effective instructions, context engineering involves
dynamically assembling all inputs—user messages, retrieved
knowledge, workflow state, and system prompts—into a structured,
token-efficient context window that maximizes task performance. For
example, planner-executor agents depend on clean plan outputs
being passed as context to executor steps, while ReAct agents
require relevant tool results embedded clearly in the prompt to
inform their next reasoning cycle. Context engineering thus bridges
planning and execution, enabling agent workflows to remain
coherent, grounded, and aligned with user goals.
At its core, context engineering involves deciding what information
to include, how to structure it for maximum clarity and relevance,
and how to fit it efficiently within token limits. This includes the
current user input, relevant snippets retrieved from memory or
external knowledge bases, summaries of prior conversations, system
instructions defining the agent’s role, and any workflow state
necessary for the task at hand. In simple systems, context may
consist only of a system prompt and the latest user query. But as
agents tackle more complex tasks—like orchestrating multistep
workflows or personalizing recommendations based on past
interactions—dynamic context construction becomes critical for
maintaining coherence, accuracy, and utility.
For example, an agent handling ecommerce support might construct
its context by combining the system prompt defining its allowed
actions, the user’s current message, a retrieved summary of the
order record, and any applicable policy excerpts. In more advanced
systems, the context might also include summaries of prior related
conversations or the results of tool invocations from earlier in the
workflow. Each additional element can improve task performance,

---

## Sección 62: Chapter 5. Orchestration

-- 173 of 559 --

but only if included thoughtfully; irrelevant or poorly structured
context risks distracting the model or exceeding token budgets
without benefit.
Effective context engineering requires several core practices. First,
prioritize relevance by retrieving only the most useful information
from memory or knowledge bases, rather than indiscriminately
appending large blocks of text. Second, maintain clarity through
structured formatting or schemas such as Model Context Protocol
(MCP), which pass state and retrieved knowledge to the model in a
predictable, interpretable way. Third, use summarization techniques
to compress longer histories into concise representations, preserving
critical details without wasting tokens. Finally, ensure that context is
dynamically assembled at each inference step to reflect the agent’s
current objectives, workflow stage, and user input.
Context engineering sits at the intersection of memory, knowledge,
and orchestration. While orchestration decides what steps to take in
a workflow, context engineering ensures that each step has the right
information to execute effectively. As foundation models continue to
improve, the frontier of agentic system design is shifting from model
architecture to the quality of context we provide. In essence, a wellengineered context unlocks the full potential of even modest models,
while poor context can undermine the performance of the most
advanced systems.
By mastering context engineering, developers can create agents that
are not only technically powerful but also reliable, grounded, and
responsive to the needs of their users and environments. In the
coming years, as memory systems, retrieval architectures, and
orchestration frameworks evolve, context engineering will remain the
glue that binds these components into seamless, effective
experiences.

-- 174 of 559 --

Conclusion
The success of agents relies heavily on the approach to
orchestration, making it important for organizations interested in
building agentic systems to invest time and energy into designing
the appropriate planning strategy for the use case. Here are some
best practices for designing a planning system:
Carefully consider the requirements for latency and accuracy
for your system, as there is a clear trade-off between these
two factors.
Determine the typical number of actions required for your
scenario’s use case. The greater this number, the more
complex an approach to planning you are likely to need.
Assess how much the plan needs to change based on the
results from prior actions. If significant adaptation is
necessary, consider a technique that allows for incremental
plan adjustments.
Design a representative set of test cases to evaluate
different planning approaches and identify the best fit for
your use case.
Choose the simplest planning approach that will meet your
use case requirements.
With an orchestration approach that will work well for your scenario,
we’ll now move on to the next part of the workflow: memory. It is
worth starting small with well-designed scenarios and simpler
approaches to orchestration, and to then gradually move up the
scale of complexity as necessary based on the use case. In the next
chapter, we will explore how memory can further enhance your
agents’ capabilities—enabling them to recall knowledge, maintain
context across interactions, and perform tasks with greater
intelligence and personalization.

-- 175 of 559 --

---

## Sección 63: Chapter 6. Knowledge and

Memory
Now that your agent has tools and orchestration, it is more than
capable of taking actions to do real work. In most cases, though,
you will want your agents to both remember what’s happened and
know additional information beyond what lives in the model’s
weights. In this chapter, we’ll focus on knowledge and memory—two
complementary but distinct ways to enrich your agent’s context.
Knowledge (often implemented via retrieval-augmented generation)
pulls in factual or domain-specific content—technical specs, policy
documents, product catalogs, customer or system logs—at
generation time so the agent “knows” verifiable information beyond
the immediate conversation to complement the information stored in
the model itself, specifically in its weights and biases. Memory, on
the other hand, captures the agent’s own history: prior user
exchanges, tool outputs, and state updates. It lets your agent
maintain continuity across turns and sessions so that it “remembers”
past interactions and uses that history to inform future decisions.
In Chapter 5, we introduced context engineering as the discipline of
dynamically selecting, structuring, and assembling all inputs into the
model’s context window to produce the best outcomes. Memory is a
foundational enabler of context engineering: it provides the
knowledge, history, and facts that can be selected and assembled
into effective prompts. In other words, memory is where knowledge
is stored, while context engineering is how that knowledge is
leveraged to produce intelligent behavior.
This chapter will offer examples in LangGraph, a low-level
orchestration framework for building stateful agentic workflows that
was introduced in Chapter 1. LangGraph defines your application as

-- 176 of 559 --

a directed graph of nodes (pure functions such as foundation model
calls, memory updates, or tool invocations) and edges (control-flow
transitions), enabling developers to model complex, multistep
processes declaratively. LangGraph treats your entire application
state as a single, strongly typed Python object (often a TypedDict)
that flows through the graph at runtime, keeping data management
both explicit and type-safe. Unlike DAG-only (directed acyclic graph)
orchestration tools, it natively supports cycles and conditional
branches, making it straightforward to implement loops, retries, and
dynamic decision paths without bespoke code. It also provides builtin streaming—emitting partial outcomes as they are generated—and
checkpointing, so long-running agents can persist and resume
exactly where they left off.
By treating memory mechanisms (rolling context windows, keyword
extraction, semantic retrieval, etc.) as first-class graph nodes,
LangGraph keeps memory logic modular and testable. Edges ensure
memory updates occur in the correct sequence relative to LLM calls,
so your agent always has the right context injected at the right time.
And because state—including memory contents—can be
checkpointed and resumed, your agents maintain continuity across
sessions and withstand failures, all within the same unified graph
framework.
In this chapter, we will first cover the fundamentals of memory for
agentic systems, from simple rolling context windows to semantic
memory, retrieval-augmented generation, and advanced knowledge
graph approaches. Throughout, we will emphasize how these
memory systems integrate into context engineering pipelines to build
agents that are grounded, capable, and aligned with your specific
goals and environment.

-- 177 of 559 --

Foundational Approaches to Memory
We begin by discussing the simplest approaches to memory: relying
on a rolling context window for the foundation model, and keywordbased memory. Despite their simplicity, they are more than sufficient
for a wide range of use cases.
Managing Context Windows
We start with the simplest approach to memory: relying on the
context window. The “context window” refers to the information that
is passed to the foundation model as an input in a single call. The
maximum number of tokens a foundational model can ingest and
attend to in a single call is called the “context length.” This context is
effectively the working memory for that request. One token averages
about ¾ of a word or roughly four characters; for example, 1,000
tokens correspond to about 750 English words. Many popular models
today have stepped through roughly 4,000-token (≈3,000 words,
~12 pages) and 8,000-token (≈6,000 words, ~24 pages) limits.
GPT-5 and Claude 3.7 Sonnet now offer a maximum number of
272,000 tokens in their input, while Gemini 2.5 accepts up to a
million tokens in the input.
The context window is a critical resource for developers to use
effectively. We want to provide the foundation model with all the
information it needs to complete the task, but no more. The context
window is all of the information that is provided to the foundation
model when the model is called. In the simplest approach, the
context window contains the current question and all previous
interactions in the current session. When that window fills up, only
the most recent interactions are included. In some circumstances,
we will have more information to provide than we can fit into the
context window. When this happens, we need to be careful with how
we allocate our limited budget of tokens.

---

## Sección 64: Chapter 6. Knowledge and

-- 178 of 559 --

For simple use cases, you can use a rolling context window. In this
case, as the interaction with the foundation model progresses, the
full interaction is passed into the context window. At a certain point,
the context window fills up, and the oldest parts of the context are
ejected and replaced with the most recent context, in a first-in, firstout fashion. This is easy to implement, low in complexity, and will
work for many use cases. The primary drawback to this approach is
information will be lost, regardless of how relevant or important it is,
as soon as enough interaction has occurred to eject it from the
current context. With large prompts or verbose foundation model
responses, this can happen quickly. Foundation models can also miss
important information in large prompts, so highlighting the most
relevant context and placing it close to the end of the prompt can
increase the likelihood that it will be used. This standard approach to
memory can be incorporated into our LangGraph agent as follows:
from typing import Annotated
from typing_extensions import TypedDict
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, MessagesState,
START
llm = ChatOpenAI(model="gpt-5")
def call_model(state: MessagesState):
response = llm.invoke(state["messages"])
return {"messages": response}
# Fails to maintain state across the conversation
input_message = {"type": "user", "content": "hi! I'm bob"}
for chunk in graph.stream({"messages": [input_message]},
stream_mode="values"):
chunk["messages"][-1].pretty_print()
input_message = {"type": "user", "content": "what's my
name?"}
for chunk in graph.stream({"messages": [input_message]},

-- 179 of 559 --

stream_mode="values"):
chunk["messages"][-1].pretty_print()
Traditional Full-Text Search
Traditional full-text search forms the backbone of many large-scale
retrieval systems and offers a robust, mature approach to injecting
precise historical context into agents enabled with foundation
models. At its heart lies an inverted index, which preprocesses all
text via tokenization, normalization (lowercasing, stemming), and
stop-word removal, then maps each term to the list of message
chunks or documents in which it appears. This structure enables
lightning-fast lookups—rather than scanning every stored message,
the agent simply follows the term’s postings list to retrieve exactly
those passages containing the query keywords.
To rank these results by relevance, most systems employ the BM25
scoring function. BM25 weights each passage by its term frequency
(how often the query term appears), inverse document frequency
(how rare the term is across the corpus), and document length
normalization (penalizing overly long or overly short chunks). When
a user query arrives, it is analyzed with the same text pipeline used
for indexing, and BM25 produces a sorted list of the top
K candidate
passages. These top hits—often truncated or summarized—are then
injected directly into the foundation model prompt, ensuring the
model sees the most pertinent historical context without exhausting
its context length. Fortunately, implementing this is very easy to do
in Python, though typically one would store these in a database:
# pip install rank_bm25
from rank_bm25 import BM25Okapi
from typing import List
corpus: List[List[str]] = [
"Agent J is the fresh recruit with attitude".split(),

-- 180 of 559 --

"Agent K has years of MIB experience and a cool
neuralyzer".split(),
"The galaxy is saved by two Agents in black
suits".split(),
]
# 2. Build the BM25 index
bm25 = BM25Okapi(corpus)
# 3. Perform retrieval for a fun query
query = "Who is a recruit?".split()
top_n = bm25.get_top_n(query, corpus, n=2)
print("Query:", " ".join(query))
print("Top matching lines:")
for line in top_n:
print(" •", " ".join(line))
In this example, we built a simple BM25-powered full-text index over
our agent quips and fetched the most relevant lines for a given user
query. By injecting those top-ranked passages directly into the
prompt, we ensure the model has the key historical context—without
passing every past message—and stays within its context limits.
While this keyword-driven approach excels at pinpointing exact or
highly specific terms, it can miss broader themes, paraphrases, or
conceptual links that weren’t expressed in the original text. To
capture that deeper, “meaning-based” memory—so your agent can
recall related ideas even when the exact words differ—we turn next
to semantic memory and vector stores.
Semantic Memory and Vector Stores
Semantic memory, a type of long-term memory that involves the
storage and retrieval of general knowledge, concepts, and past
experiences, plays a critical role in enhancing the cognitive
capabilities of these systems. This allows for information and past
experiences to be stored and then efficiently retrieved when they are

-- 181 of 559 --

needed to improve performance later on. The leading way to do this
is by using vector databases, which enable rapid indexing and
retrieval at large scale, enabling agentic systems to understand and
respond to queries with greater depth and relevance.
Introduction to Semantic Search
Unlike traditional keyword-based search, semantic search aims to
understand the context and intent behind a query, leading to more
accurate and meaningful retrieval results. At its core, semantic
search focuses on the meaning of words and phrases rather than
their exact match. It leverages ML techniques to interpret the
context, synonyms, and relationships between words. This enables
the retrieval system to comprehend the intention and deliver results
that are contextually relevant, even if they don’t contain the exact
search terms.
The foundation for these approaches is embeddings, which are
vector representations of words that capture the words’ meanings
based on their usage in large text corpora. By projecting large
bodies of text into a dense numeric representation, we can create
rich representations that have proven to be very useful for storage
and retrieval. Popular models like Word2Vec, GloVe, and BERT have
revolutionized how machines understand language by placing
semantically similar words closer together in a high-dimensional
space. Large language models (LLMs) have further improved the
performance of these embedding models across a wide range of
types of text by increasing the size of the embedding model and the
quantity and variety of data on which they are trained. Semantic
search has proven to be an invaluable technique to improve the
performance of memory within agentic systems, particularly in
retrieving semantically relevant information across documents that
do not share exact keywords.

---

## Sección 65: Chapter 6. Knowledge and

-- 182 of 559 --

Implementing Semantic Memory with Vector
Stores
We begin by generating semantic embeddings for the concepts and
knowledge to be stored. These embeddings are typically produced
by foundation models or other natural language processing (NLP)
techniques that encode textual information into dense vector
representations. These vector representations, or embeddings,
capture the semantic properties and relationships of data points in a
continuous vector space. For example, a sentence describing a
historical event can be converted into a vector that captures its
semantic meaning. Once we have this vector representation, we
need a place to efficiently store it. That place is a vector database,
which is designed specifically to efficiently handle high-dimensional
vector representations of data.
Vector stores—such as VectorDB, FAISS (Facebook AI Similarity
Search), or Annoy (Approximate Nearest Neighbors Oh Yeah)—are
optimized for storing and searching high-dimensional vectors. These
stores are set up for fast similarity searches, enabling the retrieval of
embeddings that are semantically similar to a given query.
When an agent receives a query or needs to retrieve information, it
can use the vector store to perform similarity searches based on the
query’s embedding. By finding and retrieving the most relevant
embeddings from the vector store, the agent can access the stored
semantic memory and provide informed, contextually appropriate
responses. These lookups can be performed quickly, providing an
efficient way to rapidly search over large volumes of information to
improve the quality of actions and responses. This can be
implemented as follows:
from typing import Annotated
from typing_extensions import TypedDict
from langchain_openai import ChatOpenAI

-- 183 of 559 --

from langgraph.graph import StateGraph, MessagesState,
START
llm = ChatOpenAI(model="gpt-5")
def call_model(state: MessagesState):
response = llm.invoke(state["messages"])
return {"messages": response}
from vectordb import Memory
memory = Memory(chunking_strategy={'mode':'sliding_window',
'window_size': 128,
'overlap': 16})
text = """
Machine learning is a method of data analysis that
automates analytical
model building. It is a branch of artificial intelligence
based on the
idea that systems can learn from data, identify patterns
and make
decisions with minimal human intervention. Machine learning
algorithms
are trained on datasets that contain examples of the
desired output.
For example, a machine learning algorithm that is used to
classify
images might be trained on a dataset that contains images
of cats
and dogs. Once an algorithm is trained, it can be used to
make
predictions on new data. For example, the machine learning
algorithm
that is used to classify images could be used to predict
whether a new
image contains a cat or a dog.
"""
metadata = {"title": "Introduction to Machine Learning",
"url":
"https://learn.microsoft.com/en-us/training/modules/" +
"introduction-to-machine-learning"}
memory.save(text, metadata)
text2 = """
Artificial intelligence (AI) is the simulation of human
intelligence in machines
that are programmed to think like humans and mimic their
actions.

-- 184 of 559 --

The term may also be applied to any machine that exhibits
traits associated with
a human mind such as learning and problem-solving.
AI research has been highly successful in developing
effective techniques for
solving a wide range of problems, from game playing to
medical diagnosis.
"""
metadata2 = {"title": "Artificial Intelligence for
Beginners", "url":
"https://microsoft.github.io/AI-for-Beginners"}
memory.save(text2, metadata2)
query = "What is the relationship between AI and machine
learning?"
results = memory.search(query, top_n=3)
builder = StateGraph(MessagesState)
builder.add_node("call_model", call_model)
builder.add_edge(START, "call_model")
graph = builder.compile()
input_message = {"type": "user", "content": "hi! I'm bob"}
for chunk in graph.stream({"messages": [input_message]},
{},
stream_mode="values"):
chunk["messages"][-1].pretty_print()
print(results)
Retrieval-Augmented Generation
Incorporating memory into agentic systems not only involves storing
and managing knowledge but also enhancing the system’s ability to
generate contextually relevant and accurate responses. Retrievalaugmented generation (RAG) is a powerful technique that combines
the strengths of retrieval-based methods and generative models to
achieve this goal. By integrating retrieval mechanisms with
foundation models, RAG enables agentic systems to generate more
informed and contextually enriched responses, improving their
performance in a wide range of applications.
First, we begin with a set of documents that might be useful to help
the system answer questions. We then break these documents into

-- 185 of 559 --

smaller chunks. The idea is that the model, like a person, doesn’t
need to refer to an entire long resource—it only needs the small,
relevant part. We then take these chunks, embed them with an
encoder model, and index them in a vector database, as illustrated
in Figure 6-1.
Figure 6-1. Indexing pipeline for RAG. Source documents are first split into smaller
chunks. Each chunk is converted into a dense embedding by an encoder model,
and the resulting vectors are stored in a vector database—enabling fast semantic
lookup at query time.
During retrieval, the system searches a large corpus of documents or
a vector store of embeddings to find pieces of information that are
relevant to the given query or context. This phase relies on efficient
retrieval mechanisms to quickly identify and extract pertinent
information.
During generation, the retrieved information is then fed into a
generative foundation model, which uses this context to produce a
coherent and contextually appropriate response. The generative
model synthesizes the retrieved data with its own learned
knowledge, enhancing the relevance and accuracy of the generated
text, as is illustrated in Figure 6-2.

---

## Sección 66: Chapter 6. Knowledge and

-- 186 of 559 --

Figure 6-2. RAG runtime workflow. The user submits a question to the controller,
which queries the vector knowledge store to retrieve the most relevant
information. This retrieved context is then combined with the original user
question and passed to the generative model, which produces a final, contextually
informed response.
RAG represents a powerful approach for enhancing the capabilities
of agentic systems by combining retrieval-based methods with
generative models. By leveraging external knowledge and integrating
it into the generation process, RAG enables the creation of more
informed, accurate, and contextually relevant responses. As
technology continues to evolve, RAG will play a crucial role in
advancing the performance and versatility of LLM-powered
applications across various domains. This is especially valuable for

-- 187 of 559 --

incorporating domain- or company-specific information or policies to
influence the output.
Semantic Experience Memory
While incorporating an external knowledge base with a semantic
store is an effective way to incorporate external knowledge into our
agent, our agent will start every session from a blank slate, and the
context of long-running or complex tasks will gradually drop out of
the context window. Both of these issues can be addressed by
semantic experience memory.
With each user input, the text is turned into a vector representation
using an embedding model. The embedding is then used as the
query in a vector search across all of the previous interactions in the
memory store. Part of the context window is reserved for the best
matches from the semantic experience memory, then the rest of the
space is allocated to the system message, latest user input, and
most recent interactions. Semantic experience memory allows
agentic systems to not only draw upon a broad base of knowledge
but also tailor their responses and actions based on accumulated
experience, leading to more adaptive and personalized behavior.
GraphRAG
We now turn to an advanced version of RAG that is more complex to
incorporate into your solution but that is capable of correctly
handling a wider variety of questions. Graph retrieval-augmented
generation (GraphRAG) is an advanced extension of the RAG model,
incorporating graph-based data structures to enhance the retrieval
process. By utilizing graphs, GraphRAG can manage and utilize
complex interrelationships and dependencies between pieces of
information, significantly enhancing the richness and accuracy of the
generated content.

-- 188 of 559 --

Baseline RAG systems operate by chunking documents, embedding
those chunks into vector space, and retrieving semantically similar
chunks at query time to augment prompts for the LLM. While
effective for simple fact lookup or direct question-answering, this
approach struggles when:
Answers require connecting information scattered across
multiple documents (“connecting the dots”).
Queries involve summarizing higher-level semantic themes
across a dataset.
The dataset is large, messy, or organized narratively rather
than as discrete facts.
For example, baseline RAG might fail to answer “What has Geoffrey
Hinton done?” if no single retrieved chunk covers his actions
comprehensively. GraphRAG addresses this by constructing a
knowledge graph of entities and relationships from the dataset,
enabling multihop reasoning, relationship chaining, and structured
summarization.
Using Knowledge Graphs
Within a few minutes, the GraphRAG CLI can deliver global insights
and local context over your texts—no Python required. But if you
want more control and flexibility, production-level pipelines are just a
few lines away using the neo4j‑graphrag‑python package. With the
official neo4j-graphrag library, setup involves only configuring a
Neo4j connection, defining an embedder, and creating a retriever—
yet you immediately gain full GraphRAG capabilities. For educational
or local experimentation, lightweight tools like nano‑graphrag or
community repos (e.g., example-graphrag) unpack the same
end‑to‑end pipeline in just a few hundred lines of Python. This
system leverages the power of graph databases or knowledge
graphs to store and query interconnected data. In GraphRAG, the

-- 189 of 559 --

retrieval phase doesn’t just pull relevant documents or snippets; it
analyzes and retrieves nodes and edges from a graph that
represents complex relationships and contexts within the data.
GraphRAG consists of the following three components:
Knowledge graph
This component stores data in a graph format, where entities
(nodes) and their relationships (edges) are explicitly defined.
Graph databases are highly efficient at managing connected data
and supporting complex queries that involve multiple hops or
relationships.
Retrieval system
The retrieval system in GraphRAG is designed to query the graph
database efficiently, extracting subgraphs or clusters of nodes
that are most relevant to the input query or context.
Generative model
Once relevant data is retrieved in the form of a graph, the
generative model synthesizes this information to create coherent
and contextually rich responses.
GraphRAG represents a significant leap forward in the capabilities of
agentic systems, offering sophisticated tools to handle and generate
responses based on complex interconnected data. As this technology
evolves, it promises to open new frontiers in AI applications, making
systems smarter, more context-aware, and capable of handling
increasingly complex tasks. Using knowledge graphs in GraphRAG
systems transforms the way information is retrieved and utilized for
generation, enabling more intelligent, contextual, and accurate
responses across various applications. We will not cover the details
of the algorithm here, but multiple open source implementations of
GraphRAG are now available, and setting them up on your dataset is
easier to do. If you have a large set of data you need to reason over,

---

## Sección 67: Chapter 6. Knowledge and

-- 190 of 559 --

and standard chunking with a vector retrieval is running into
limitations, GraphRAG is a more expensive and complex approach
that frequently produces better results in practice.
Building Knowledge Graphs
Knowledge graphs are fundamental in providing structured and
semantically rich information that enhances the capabilities of
intelligent systems, including GraphRAG systems. Building an
effective knowledge graph involves a series of steps, from data
collection and processing to integration and maintenance. This
section will cover the methodology for constructing knowledge
graphs that can significantly impact the performance of GraphRAG
systems. This process consists of several steps:
1. Data collection
The first step in building a knowledge graph is gathering the
necessary data. This data can come from various sources,
including databases, text documents, websites, and even usergenerated content. It’s crucial to ensure the diversity and quality
of sources to cover a broad spectrum of knowledge. For an
organization, this may consist of a set of core policies or
documents that contain core information to influence the agent.
2. Data preprocessing
Once data is collected, it needs to be cleaned and preprocessed.
This step involves removing irrelevant or redundant information,
correcting errors, and standardizing data formats. Preprocessing
is vital for reducing noise in the data and improving the accuracy
of the subsequent entity extraction process.
3. Entity recognition and extraction
This process involves identifying key elements (entities) from the
data that will serve as nodes in the knowledge graph. Common

-- 191 of 559 --

entities include people, places, organizations, and concepts.
Techniques such as named entity recognition (NER) are typically
used, which may involve ML models trained on large datasets to
recognize and categorize entities accurately.
4. Relationship extraction
After identifying entities, the next step is to determine the
relationships between them. This involves parsing data to extract
predicates that connect entities, forming the edges of the graph.
Relationship extraction can be challenging, especially in
unstructured data, though foundation models have shown
improving efficacy over time.
5. Ontology design
An ontology defines the categories and relationships within the
knowledge graph, serving as its backbone. Designing an ontology
involves defining a schema that encapsulates the types of entities
and the possible types of relationships between them. This
schema helps in organizing the knowledge graph systematically
and supports more effective querying and data retrieval.
6. Graph population
With the ontology in place, the next step is to populate the graph
with the extracted entities and their relationships. This involves
creating nodes and edges in the graph database according to the
ontology’s structure. Databases like Neo4j, OrientDB, or Amazon
Neptune can be used to manage these data structures efficiently.
7. Integration and validation
Once the graph is populated, it must be integrated with existing
systems and validated to ensure accuracy and utility. This can
involve linking data from other databases, resolving entity
duplication (entity resolution), and verifying that the graph

-- 192 of 559 --

accurately represents the knowledge domain. Validation might
involve user testing or automated checks to ensure the integrity
and usability of the graph.
8. Maintenance and updates
A knowledge graph is not a static entity; it needs regular updates
and maintenance to stay relevant. This involves adding new data,
updating existing information, and refining the ontology as new
types of entities or relationships are identified. Automation and
ML models can be instrumental in maintaining and updating the
knowledge graph efficiently.
Building a knowledge graph can significantly improve complex and
multihop retrieval. Typically, this is conducted by extracting semantic
triples based on the Resource Description Framework data model.
This consists of subject-predicate-object expressions. Foundation
models are quite good at extracting these triples, so these types of
knowledge graphs can now be constructed at scale. You can see this
process visualized in Figure 6-3.
Figure 6-3. Knowledge graph construction workflow. Documents are processed by
a model to extract semantic triples in the form of subject-relation-object
statements (e.g., “Jay-Z, spouse of, Beyoncé”), which are then structured into a
knowledge graph to enable efficient semantic querying and reasoning.
To make it even more approachable, building a basic GraphRAG
pipeline today is surprisingly straightforward thanks to open source
tooling. Microsoft’s own GraphRAG library, available via pip
install graphrag, offers a command‑line workflow for indexing

-- 193 of 559 --

and querying document collections—no extensive setup required. For
instance, after initializing your project and indexing using their CLI,
you can run:
pip install graphrag
mkdir -p ./ragtest/input
curl https://www.gutenberg.org/ebooks/103.txt.utf-8 -o
./ragtest/input/book.txt
./ragtest/input/book.txt
graphrag init --root ./ragtest
graphrag index --root ./ragtest
graphrag query \
--root ./ragtest \
--method global \
--query "What are the key themes in this novel?"
graphrag query \
--root ./ragtest \
--method local \
--query "Who is Phileas Fogg and what motivates his
journey?"
This instantly gives you global insights and local context over your
texts—without writing a single line of Python. If you prefer more
control, the Neo4j GraphRAG Python package lets you set up a full
GraphRAG pipeline in code. With a few lines (connecting to Neo4j,
defining an embedder and retriever, then querying), you get
powerful graph‑enhanced RAG capabilities. For developers interested
in lightweight or educational implementations, there are smaller
community projects like nano‑graphrag and example repos (e.g.,
example‑graphrag) that unpack the core pipeline in a few hundred
lines of Python.
While this is great for experimentation, many teams want to move
from a prototype to a hardened, scalable system. That’s where
Neo4j shines: it’s the most trusted, enterprise-grade graph database

---

## Sección 68: Chapter 6. Knowledge and

-- 194 of 559 --

available. Its native graph storage and index‑free adjacency
architecture ensures near-constant traversal performance—even as
the graph scales to billions of nodes and relationships. Production
deployments often use Neo4j Enterprise or AuraDB, offering
clustering, fault-tolerance, ACID (atomicity, consistency, isolation,
and durability) compliance, and multiregion support. Once you’ve
used the Neo4j GraphRAG Python tooling or Cypher-based setup to
extract entities and define relationships, there’s a smooth path to a
scalable deployment:
Populate at scale via Cypher: use CREATE and MERGE
statements to build clean, deduplicated graphs.
Incremental loading logic ensures you can update with new
data without duplication.
Scale performance through Neo4j’s read/write clustering,
cache sharding, and optimized query planner.
In short, Neo4j makes transitioning from notebook prototypes to
production-grade graph-backed RAG pipelines straightforward—
without sacrificing performance, reliability, or maintainability.
Once you’ve defined your ontology and extracted entities and
relationships, it’s time to populate your knowledge graph. In Neo4j,
this is done using the Cypher CREATE clause, which lets you specify
nodes with labels and properties and then link them via directed
relationships. Best practice is to first load or match existing nodes—
ensuring you don’t duplicate entities—and then issue separate
CREATE statements for each relationship, as shown in the following
example. By organizing your script into discrete steps (create nodes
→ match nodes → create relationships), you maintain clarity and
can more easily debug or extend your graph as it grows:
// Create nodes for concepts and entities
CREATE (:Concept {name: 'Artificial Intelligence'});

-- 195 of 559 --

CREATE (:Concept {name: 'Machine Learning'});
CREATE (:Concept {name: 'Deep Learning'});
CREATE (:Concept {name: 'Neural Networks'});
CREATE (:Concept {name: 'Computer Vision'});
CREATE (:Concept {name: 'Natural Language Processing'});
CREATE (:Tool {name: 'TensorFlow', creator: 'Google'});
CREATE (:Tool {name: 'PyTorch', creator: 'Facebook'});
CREATE (:Model {name: 'BERT', year: 2018});
CREATE (:Model {name: 'ResNet', year: 2015});
// Create relationships between concepts
MATCH
(ai:Concept {name:'Artificial Intelligence'}),
(ml:Concept {name:'Machine Learning'})
CREATE (ml)-[:SUBSET_OF]->(ai);
MATCH
(ml:Concept {name:'Machine Learning'}),
(dl:Concept {name:'Deep Learning'})
CREATE (dl)-[:SUBSET_OF]->(ml);
MATCH
(dl:Concept {name:'Deep Learning'}),
(nn:Concept {name:'Neural Networks'})
CREATE (nn)-[:USED_IN]->(dl);
MATCH
(ai:Concept {name:'Artificial Intelligence'}),
(cv:Concept {name:'Computer Vision'})
CREATE (cv)-[:APPLICATION_OF]->(ai);
MATCH
(ai:Concept {name:'Artificial Intelligence'}),
(nlp:Concept {name:'Natural Language Processing'})
CREATE (nlp)-[:APPLICATION_OF]->(ai);
// Create relationships to tools and models
MATCH
(tensorflow:Tool {name:'TensorFlow'}),
(nn:Concept {name:'Neural Networks'})
CREATE (tensorflow)-[:IMPLEMENTS]->(nn);

-- 196 of 559 --

MATCH
(pytorch:Tool {name:'PyTorch'}),
(nn:Concept {name:'Neural Networks'})
CREATE (pytorch)-[:IMPLEMENTS]->(nn);
MATCH
(nlp:Concept {name:'Natural Language Processing'}),
(bert:Model {name:'BERT'})
CREATE (bert)-[:BELONGS_TO]->(nlp);
MATCH
(cv:Concept {name:'Computer Vision'}),
(resnet:Model {name:'ResNet'})
CREATE (resnet)-[:BELONGS_TO]->(cv);
MATCH
(tensorflow:Tool {name:'TensorFlow'}),
(bert:Model {name:'BERT'})
CREATE (bert)-[:BUILT_WITH]->(tensorflow);
MATCH
(pytorch:Tool {name:'PyTorch'}),
(resnet:Model {name:'ResNet'})
CREATE (resnet)-[:BUILT_WITH]->(pytorch);
// Query for finding relationships between concepts
MATCH path = shortestPath(
(concept1:Concept {name: 'Natural Language Processing'})-
[*]-(concept2:Concept
{name: 'Deep Learning'})
)
RETURN path;
// Query for finding all models that use TensorFlow
MATCH (model:Model)-[:BUILT_WITH]->(tool:Tool {name:
'TensorFlow'})
RETURN model.name AS model, model.year AS year;
Once loaded, your knowledge graph supports multihop traversals
(e.g., shortestPath queries) and rich relationship patterns that far
exceed what a flat table or vector store can express. This foundation

-- 197 of 559 --

enables advanced GraphRAG workflows—where an agent can
traverse the graph at runtime to gather context spanning several
degrees of separation—unlocking truly powerful reasoning over
structured knowledge. These structures make it easy to discover
underlying relationships in the data. For instance, it is now possible
to search for elements on the graph, then retrieve all the elements
that are one or more links away from that node. As you can see in
Figure 6-4, when answering complex queries, the controller can
traverse the graph and perform multihop reasoning over structured
data, expanding the range and complexity of questions these types
of systems can answer.
Figure 6-4. Answering questions with knowledge graphs. The user’s question is
routed through a controller that queries the knowledge graph for relevant
structured information, combines it with the language model’s reasoning
capabilities, and returns a contextually rich, multihop informed answer.
This provides an efficient way to retrieve relevant context for
addressing a task. As AI technology progresses, the methodologies
for building, integrating, and maintaining knowledge graphs will
continue to evolve, further enhancing their utility in various domains.

---

## Sección 69: Chapter 6. Knowledge and

-- 198 of 559 --

Promise and Peril of Dynamic Knowledge
Graphs
Dynamic knowledge graphs are a significant step forward in
managing and utilizing knowledge in real-time applications. These
graphs are continuously updated with new information, adapting to
changes in knowledge and context, which can significantly enhance
GraphRAG systems. However, the dynamic nature of these graphs
also introduces specific challenges that need careful consideration.
This section explores the potential benefits and risks associated with
dynamic knowledge graphs.
As the developer, it is important to apply careful consideration to
choose the most appropriate design to retrieve the appropriate
context for handling incoming tasks efficiently. A knowledge graph is
reasonably easy to prototype, but getting one ready for production is
a significant undertaking.
Recent advances in model architectures are pushing context
windows to unprecedented lengths, allowing LLMs to “remember”
and process entire documents in a single pass. For example,
Google’s Gemini 2.5 and OpenAI’s GPT-4.1 now support up to
one
million tokens—roughly 750,000 words or over 2,500 pages—
enabling retrieval-free generation of very large contexts. Similarly,
index-free RAG systems embed their own retrieval logic into longcontext models such as GPT-4.1, effectively performing chunking
and relevance scoring internally without external vector stores or
inverted indices. Embedding knowledge directly into these extended
contexts can simplify pipelines: rather than orchestrating separate
retrieval and ranking nodes, an agent can load entire knowledge
bases (e.g., policy manuals or technical specs) directly into the
prompt and rely on the model’s attention mechanisms to surface
relevant passages.
However, these retrieval-free approaches come with trade-offs.
Processing millions of tokens in one shot demands substantial

-- 199 of 559 --

compute and can introduce latency and cost challenges—sometimes
negating the simplicity gains of removing external retrieval. In
addition, there is no guarantee that a given model will correctly
identify the one piece of relevant information from such a large
context window. Do not be surprised if larger models, larger context
windows, and more compute make elaborate text search and
semantic search over vector databases obsolete, but in the
meantime, the community consensus remains that hybrid
architectures retain value: even with multipage context windows,
RAG can outperform pure long-context models on fact-seeking
queries and enterprise use cases, especially when memory freshness
or precision ranking is critical. In practice, many production systems
combine extended context windows with selective retrieval nodes—
leveraging the best of both worlds to balance performance, cost, and
factual accuracy.
Dynamic real-time information processing is greatly enhanced by
dynamic knowledge graphs, which can integrate real-time data. This
capability is particularly useful in environments where information is
constantly changing, such as news, social media, and live monitoring
systems. By ensuring that the system’s responses are always based
on the most current and relevant information, dynamic knowledge
graphs provide a significant advantage.
Adaptive learning is another key feature of dynamic knowledge
graphs. They continuously update themselves, learning from new
data without the need for periodic retraining or manual updates.
This adaptability is crucial for applications in fast-evolving fields like
medicine, technology, and finance, where staying updated with the
latest knowledge is critical. This helps organizations make informed
decisions quickly, which is invaluable in scenarios where decisions
have significant implications and depend heavily on the latest
information. Knowledge graphs also provide critical information in a
structured format that can be operated effectively and reasoned
over, can provide far greater flexibility than vector stores, and are

-- 200 of 559 --

especially valuable for understanding the rich context of an entity.
Unfortunately, these benefits come with some important drawbacks:
Complexity in maintenance
Maintaining the accuracy and reliability of a dynamic knowledge
graph is significantly more challenging than managing a static
one. The continuous influx of new data can introduce errors and
inconsistencies, which may propagate through the graph if not
identified and corrected promptly.
Resource intensity
The processes of updating, validating, and maintaining dynamic
knowledge graphs require substantial computational resources.
These processes can become resource-intensive, especially as
the size and complexity of the graph grow, potentially limiting
scalability.
Security and privacy concerns
Dynamic knowledge graphs that incorporate user data or
sensitive information must be managed with strict adherence to
security and privacy standards. The real-time aspect of these
graphs can complicate compliance with data protection
regulations, as any oversight might lead to significant breaches.
Dependency and overreliance
There is a risk of overreliance on dynamic knowledge graphs for
decision making, potentially leading to a lack of critical oversight.
Decisions driven solely by automated insights from a graph might
overlook external factors that the graph does not capture.
To harness the benefits of dynamic knowledge graphs while
mitigating their risks, several strategies can be employed.
Implementing robust validation mechanisms with automated tools

---

## Sección 70: Chapter 6. Knowledge and

-- 201 of 559 --

and processes is essential for continuously ensuring the accuracy
and reliability of data within the graph. Designing a scalable
architecture using technologies such as distributed databases and
cloud computing helps manage the computational demands of
dynamic graphs. Strong security measures, including encryption,
access controls, and anonymization techniques, are crucial to ensure
that all data inputs and integrations comply with current security and
privacy regulations. Additionally, maintaining human oversight in
critical decision-making processes mitigates the risks of errors and
overreliance on automated systems.
Dynamic knowledge graphs offer substantial promise for enhancing
the intelligence and responsiveness of GraphRAG systems, providing
significant benefits across various applications. However, the
complexities and risks associated with their dynamic nature
necessitate careful management and oversight. By addressing these
challenges proactively, the potential of dynamic knowledge graphs
can be fully realized, driving forward the capabilities of intelligent
systems in an ever-evolving digital landscape.
Note-Taking
With this technique, the foundation model is prompted to specifically
inject notes on the input context without trying to answer the
question.1 This mimics the way that we might fill in the margins or
summarize a paragraph or section. This note-taking is performed
before the question is presented, and then interleaves these notes
with the original context when attempting to address the current
task. Experiments show good results on multiple reasoning and
evaluation tasks, with potential for adaptation to a wider range of
scenarios. As we can see in Figure 6-5, in a traditional, “vanilla”
approach, the model is provided with the context and a question,
and it produces an answer. With chain of thought, it has time to
reason about the problem, and only subsequently generate its
answer to the question. With the self-note approach, the model

-- 202 of 559 --

generates notes on multiple parts of the context, and then generates
a note on the question, before finally moving to generate the final
answer. Figure 6-5 illustrates how note-taking enhances standard
inference workflows by interleaving model-generated notes
alongside the context before producing a final answer.
Figure 6-5. Note-taking workflows. In the standard approach, the model processes
context and question together to produce an answer directly. In the note-taking
approach, the model first generates notes summarizing or elaborating on parts of
the context and the question, and then produces the final answer—enabling
deeper reasoning and improved task performance.
Conclusion
Memory is critical to the successful operation of agentic systems,
and while the standard approach of relying on the context window of
recent interactions is sufficient for many use cases, more challenging
scenarios can benefit substantially from the investment into a more
robust approach. We have explored several approaches here,
including semantic memory, GraphRAG, and working memory.
This chapter has delved into various aspects of how memory can be
structured and utilized to enhance the capabilities of intelligent
agents. From the basic concepts of managing context windows,
through the advanced applications of semantic memory and vector
stores, to the innovative practices of dynamic knowledge graphs and
working memory, we have explored a comprehensive range of
techniques and technologies that play crucial roles in the
development of agentic systems.
Memory systems in agentic applications are not just about storing
data but about transforming how agents interact with their

-- 203 of 559 --

environment and end users. By continually improving these systems,
we can create more intelligent, responsive, and capable agents that
can perform a wide range of tasks more effectively. In the next
chapter, we will explore how agents can learn from experience to
improve automatically over time.
1 Jack Lanchantin et al., “Learning to Reason and Memorize with Self-Notes”,
arXiv, May 1, 2023.

-- 204 of 559 --

---

## Sección 71: Chapter 7. Learning in Agentic

Systems
This chapter covers different techniques for approaching and
integrating learning into agentic systems. Adding the capability for
agents to learn and improve over time is an incredibly useful
addition, but is not necessary when designing agents. Implementing
learning capabilities takes additional design, evaluation, and
monitoring, which may or may not be worth the investment
depending on the application. By learning, we mean improving the
performance of the agentic system through interaction with the
environment. This process enables agents to adapt to changing
conditions, refine their strategies, and enhance their overall
effectiveness.
Nonparametric learning refers to techniques to change and improve
performance automatically without changing the parameters of the
models involved. In contrast, parametric learning refers to
techniques in which we specifically train or fine-tune the parameters
of the foundation model. We will start by exploring nonparametric
learning techniques, then cover parametric fine-tuning approaches,
including supervised fine-tuning and direct preference optimization,
that adapt model weights for targeted improvements.
Nonparametric Learning
Multiple techniques exist to do this, and we will explore several of
the most common and useful approaches.

-- 205 of 559 --

Nonparametric Exemplar Learning
The simplest of these techniques is exemplar learning. In this
approach, as the agent performs its task, it is provided with a
measure of quality, and those examples are used to improve future
performance. These examples are used as few-shot examples for incontext learning. In the simplest version, fixed few-shot examples,
they are hardcoded into the prompt and do not change (the left side
of Figure 7-1).
Figure 7-1. Fixed versus dynamic few-shot example selection. On the left, the
model prompt uses a static set of few-shot examples embedded in the system
prompt. On the right, dynamic few-shot selection retrieves the most relevant
examples from a vector database at runtime, enabling more adaptive and
contextually appropriate task prompting.
If we have more examples, we can continue adding them into the
prompt, but that eventually comes with increases in cost and
latency. In addition, not all examples might be useful for all inputs. A
common way to address this is to dynamically select the most
relevant examples to include in the prompt (see on the right side of
Figure 7-1). These experiences, as examples, are then stored in a
way that makes them accessible for future reference. This typically
involves building a memory bank where details of each interaction—
such as the context, actions taken, outcomes, and any feedback
received—are stored. This database acts much like human memory,
where past experiences shape understanding and guide future

-- 206 of 559 --

actions. Each experience provides a data point that the agent can
reference to make better decisions when encountering similar
situations. This method enables agents to build a repository of
knowledge that can be drawn upon to improve performance.
The agent retrieves information from its database of past cases to
solve new problems. Each stored case consists of a problem
description, a solution that was applied, and the outcome of that
solution. When faced with a new situation, the agent searches its
memory to find similar past cases, analyzes the solutions that were
applied, and adapts them if necessary to fit the new circumstances.
This method allows for high flexibility, as the agent can modify its
approach based on what has or has not worked in the past, thus
continually refining its problem-solving strategies.
When successful examples are saved in persistent storage, then
retrieved and provided as examples in the prompt, performance
increases significantly on a range of tasks. This is a well-established
finding and has been confirmed across a variety of domains. In
practice, this provides us with a simple, transparent, and lightweight
way to rapidly improve the agent performance on given tasks. As the
number of successful examples increases, it then becomes wise to
retrieve the most relevant successful examples by type, text
retrieval, or semantic retrieval. Note that this technique can be
applied to the agentic task execution as a whole, or it can be
performed independently on subsets of the task.
Reflexion
Reflexion equips an agent with a simple, language-based habit of
self-critique: after each unsuccessful attempt, the agent writes a
brief reflection on what went wrong and how to improve its next try.
Over time, these reflections live in a “memory buffer” alongside the
agent’s prior actions and observations. Before each new attempt, the

-- 207 of 559 --

agent rereads its most recent reflections, allowing it to adjust its
strategy without ever retraining the model.
At a high level, the Reflexion loop works like this:
1.
Perform an action sequence. The agent interacts with the
environment using its usual prompt-driven planning.
2.
Log the trial. Every step—actions taken, observations
received, success or failure—is appended to a log in
persistent storage (for example, a JSON file or database
table).
3.
Generate a reflection. If the trial fails, the agent constructs a
short “reflection prompt” that includes the recent interaction
history plus a template asking: “What strategy did I miss?
What should I do differently next time?” The LLM produces a
concise plan.
4.
Update memory. A helper function (update_memory) reads
the trial logs, invokes the LLM on the reflection prompt, and
then saves the new reflection back into the agent’s memory
structure.
5.
Inject reflections on the next run. When the agent attempts
the same (or a similar) task again, it prepends its most
recent reflections into the prompt, guiding the model toward
the improved strategy.
Reflexion is very lightweight. You don’t touch model weights; you
simply use the foundation model as its own coach. Reflexion
accommodates both numerical feedback (e.g., a success flag) and
free-form comments, and it has been shown to boost performance
on tasks ranging from code debugging to multistep reasoning. You
can see how this works in Figure 7-2.

---

## Sección 72: Chapter 7. Learning in Agentic

-- 208 of 559 --

Figure 7-2. Reflexion agent.
Despite the significant improvement that Reflexion can add to
agents, this approach can be implemented with just a few lines of
code:
from typing import Annotated, List, Dict
from typing_extensions import TypedDict
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, MessagesState,
START
from langchain_core.messages import HumanMessage
llm = ChatOpenAI(model="gpt-5")
reflections = []
def call_model(state: MessagesState):
response = llm.invoke(state["messages"])
return {"messages": response}
reflexion_prompt = f"""You will be given the history of a
past experience in
which you were placed in an environment and given a task to
complete. You

-- 209 of 559 --

were unsuccessful in completing the task. Do not summarize
your environment,
but rather think about the strategy and path you took to
attempt to complete
the task. Devise a concise, new plan of action that
accounts for your mistake
with reference to specific actions that you should have
taken. For example,
if you tried A and B but forgot C, then devise a plan to
achieve C with
environment-specific actions. You will need this later when
you are solving
the same task. Give your plan after "Plan".
Instruction:
I am looking for dairy-free and apple variety packs of
chips, with a price
lower than 30.00 dollars
[Search]
Action: search[dairy free and apple variety pack of chips]
Observation:
[Back to Search]
Page 1 (Total results: 50)
[Next >]
[B07HRFJWP8]
Enjoy Life Foods Soft Baked Ovals, Breakfast Bars, Nut Free
Bars, Soy Free,
Dairy Free, Non GMO, Gluten Free, Vegan, Variety Pack, 4
Boxes (20 Bars Total)
$100.0
[B01KMHY5PG]
Enjoy Life Soft Baked Chewy Bars, Variety Pack, Nut Free
Bars, Soy Free, Dairy
Free, Gluten Free, 6 Boxes (30 Total Bars)
$21.49
[B008D2X8C4]
Enjoy Life Lentil Chips Variety Pack, Dairy Free Chips, Soy
Free, Nut Free,
Non GMO, Vegan, Gluten Free, 24 Bags (0.8 oz)
$100.0
Action: think[The first two items are not what I want. The

-- 210 of 559 --

third item is
the dairy free and apple variety pack of chips I want.]
Observation: OK.
Action: click[B008D2X8C4]
Observation:
[Back to Search]
[< Prev]
flavor name [dill and sour cream][garlic & parmesan]
[light sea salt][margherita pizza][thai chili lime][variety
pack]
size [0.8 ounce (pack of 24)][4 ounce (pack of 12)]
Price: $100.0
Rating: N.A.
[Description]
[Features]
[Reviews]
[Buy Now]
Action: think[The item has options 'variety pack' and '0.8
ounce (pack of 24)'
and seems good to buy.]
Observation: OK.
Action: click[variety pack]
Observation: You have clicked variety pack.
Action: click[0.8 ounce (pack of 24)]
Observation: You have clicked 0.8 ounce (pack of 24).
Action: click[Buy Now]
STATUS: FAIL
Plan:
"""
The prompt is built in three sections to turn the model into its own
coach: first, a brief framing instruction tells the model “you failed
your task—focus on strategic missteps rather than summarizing the
environment and output your corrective plan after the word ‘Plan,’”

-- 211 of 559 --

which ensures a concise, parseable response. Next, under
“Instruction:” we restate the original goal (“find a dairy-free, apple
variety pack of chips under $30”), anchoring the reflection in the
true objective. Finally, we include the complete Action/Observation
transcript of the failed run—every search, click, and internal thought
ending with STATUS: FAIL—so the model has concrete evidence
of what went wrong. By ending with the cue “Plan:” we signal the
model to shift from diagnosis to prescription, yielding a focused set
of next-step recommendations. Here’s the Python implementation
that sets up our three-part coaching prompt—framing instruction,
restated goal under “Instruction:” and the full Action/Observation
transcript—ending with the cue “Plan:”:
def get_completion(prompt: str) -> str:
# Wraps our `call_model` helper for one
‐off text
completions
result = llm.invoke([{"role":"user","content":prompt}])
return result[0].content
def _generate_reflection_query(trial_log: str,
recent_reflections: List[str]):
history = "\n\n".join(recent_reflections)
return f'''{history}
{trial_log}
Based on the above, what plan would you follow
next? Plan:'''
def update_memory(trial_log_path: str, env_configs:
List[Dict[str, Any]]):
"""Updates the given env_config with the appropriate
reflections."""
with open(trial_log_path, 'r') as f:
full_log: str = f.read()
env_logs: List[str] = full_log.split('#####\n\n#####')
assert len(env_logs) == len(env_configs), print(f'bad:
{env_logs}')
for i, env in enumerate(env_configs):
# if unsolved, get reflection and update env config

-- 212 of 559 --

if not env['is_success'] and not env['skip']:
if len(env['memory']) > 3:
memory: List[str] = env['memory'][-3:]
else:
memory: List[str] = env['memory']
reflection_query =
_generate_reflection_query(env_logs[i], memory)
reflection = get_completion(reflection_query)
env_configs[i]['memory'] += [reflection]
builder = StateGraph(MessagesState)
builder.add_node("reflexion", call_model)
builder.add_edge(START, "reflexion")
graph = builder.compile()
result = graph.invoke(
{
"messages": [
HumanMessage(
reflexion_prompt
)
]
}
)
reflections.append(result)
print(result)
update_memory(trial_log_path, env_configs)
The preceding example is built around a handful of core ideas woven
together in under 20 lines of code. First, we isolate every call to the
LLM behind a simple wrapper—call_model(state)—so that our
graph nodes remain focused and reusable. Next, we craft one
multiline “reflection prompt” that tells the model: “You attempted
this task and failed. Don’t rehash the environment; focus on what
strategic step you missed, and output a concise plan after the word
‘Plan’.” We then log each trial’s full transcript to disk, and after a
failure we invoke update_memory(...) to read those logs, pull in
the last few stored reflections to bound context, and ask the LLM to
generate a new self-critique, which we append back into our in-

---

## Sección 73: Chapter 7. Learning in Agentic

-- 213 of 559 --

memory list. Finally, by adding a single “reflexion” node to our
StateGraph (wired from START), every run of the agent
automatically invokes this prompt and enriches its state with the
latest “Plan: …” output. Over repeated runs, the model effectively
becomes its own coach—continually refining its strategy without
touching a single parameter.
Experiential Learning
Experiential learning takes nonparametric learning a step further. In
this approach, the agent still gathers its experiences into a database,
but now it applies a new step of aggregating insights across those
experiences to improve its future policy. This is especially valuable
for reflecting on past failures and attempting to develop new
techniques to improve performance in similar situations in the future.
As the agent extracts insights from its experience bank, it maintains
this list of insights over time, and it dynamically modifies these
insights, promoting the most valuable insights, downvoting the least
useful ones, and revising insights based on new experiences.
This work builds on Reflexion by adding a process for cross-task
learning. This allows the agent to improve its performance when it
moves across different tasks and helps identify good practices that
can transfer. In this approach, ExpeL maintains a list of insights that
are extracted from past experiences. Over time, new insights can be
added, and existing insights can be edited, upvoted, downvoted, or
removed, as can be seen in Figure 7-3.

-- 214 of 559 --

Figure 7-3. Experiential learning agents.

-- 215 of 559 --

This process begins with a simple effort of asking the foundation
model to reflect on the observation returned from the environment,
with the goal of identifying insights that can lead to better
performance on the task in the future:
from typing import Annotated
from typing_extensions import TypedDict
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, MessagesState,
START
from langchain_core.messages import HumanMessage
# Initialize the LLM
llm = ChatOpenAI(model="gpt-5")
# Function to call the LLM
def call_model(state: MessagesState):
response = llm.invoke(state["messages"])
return {"messages": response}
class InsightAgent:
def __init__(self):
self.insights = []
self.promoted_insights = []
self.demoted_insights = []
self.reflections = []
def generate_insight(self, observation):
# Use the LLM to generate an insight based on the
observation
messages = [HumanMessage(content=f'''Generate an
insightful analysis based
on the following observation:
'{observation}'''')]
# Build the state graph
builder = StateGraph(MessagesState)
builder.add_node("generate_insight", call_model)
builder.add_edge(START, "generate_insight")
graph = builder.compile()
# Invoke the graph with the messages

-- 216 of 559 --

result = graph.invoke({"messages": messages})
# Extract the generated insight
generated_insight = result["messages"][-1].content
self.insights.append(generated_insight)
print(f"Generated: {generated_insight}")
return generated_insight
This may work well when we have a small number of examples to
learn from, but what if we have many? This technique offers a
simple but effective way to manage this: the insights generated are
regularly reevaluated and adjusted in relative importance to the
other rules. For example, a sample prompt to reflect on previous
actions to generate new rules that improve performance on future
trials could be:
By examining and contrasting to the successful trial, and the list of
existing rules, you can perform the following operations: add, edit,
remove, or agree so that the new list of rules is GENERAL and
HIGH LEVEL critiques of the failed trial or proposed way of
Thought so they can be used to avoid similar failures when
encountered with different questions in the future. Have an
emphasis on critiquing how to perform better Thought and Action.
(ExpeL)
These learned rules are then regularly reevaluated and adjusted in
importance relative to the other rules derived from experience. The
methodology for evaluating and improving the existing rules is as
follows:
The available operations are: AGREE
(if the existing rule is
strongly relevant for the task), REMOVE
(if one existing rule is
contradictory or similar/duplicated to other existing rules), EDIT
(if any existing rule is not general enough or can be enhanced),
ADD
(introduce new rules that are distinct from existing rules and
relevant for other tasks). Each needs to closely follow their
corresponding formatting as follows (any existing rule not edited,
not agreed upon, or not removed is considered copied):

-- 217 of 559 --

AGREE <EXISTING RULE NUMBER>: <EXISTING RULE>
REMOVE <EXISTING RULE NUMBER>: <EXISTING RULE>
EDIT <EXISTING RULE NUMBER>: <NEW MODIFIED RULE>
ADD <NEW RULE NUMBER>: <NEW RULE>
This process is a bit more involved, but it still relies on manageable
logic. Specifically, this process enables helpful insights to be
dynamically improved upon in subsequent experiences. This process
is illustrated in Figure 7-4, in which the model is used to extract
insights from pairs of successful and unsuccessful examples, and in
which insights are promoted and demoted over time, distilling out a
small list of insights that are used to guide and improve the
performance of the agent.
Figure 7-4. Experiential learning with insight extraction and distillation. The agent
begins by gathering experiences into an experience pool. Multiple model
evaluations are then used to extract insights from these experiences, aggregating
and distilling them into a concise set of general, high-level critiques and rules.
These distilled insights guide future decisions, enabling the agent to improve its
performance across tasks over time.
In this next section, we see how these rules are actually created,
promoted, modified, and removed to enable the agent to improve its
performance on the task over time:
def promote_insight(self, insight):
if insight in self.insights:
self.insights.remove(insight)

---

## Sección 74: Chapter 7. Learning in Agentic

-- 218 of 559 --

self.promoted_insights.append(insight)
print(f"Promoted: {insight}")
else:
print(f"Insight '{insight}' not found in
insights.")
def demote_insight(self, insight):
if insight in self.promoted_insights:
self.promoted_insights.remove(insight)
self.demoted_insights.append(insight)
print(f"Demoted: {insight}")
else:
print(f"Insight '{insight}' not found in
promoted insights.")
def edit_insight(self, old_insight, new_insight):
# Check in all lists
if old_insight in self.insights:
index = self.insights.index(old_insight)
self.insights[index] = new_insight
elif old_insight in self.promoted_insights:
index =
self.promoted_insights.index(old_insight)
self.promoted_insights[index] = new_insight
elif old_insight in self.demoted_insights:
index = self.demoted_insights.index(old_insight)
self.demoted_insights[index] = new_insight
else:
print(f"Insight '{old_insight}' not found.")
return
print(f"Edited: '{old_insight}' to '{new_insight}'")
def show_insights(self):
print("\nCurrent Insights:")
print(f"Insights: {self.insights}")
print(f"Promoted Insights:
{self.promoted_insights}")
print(f"Demoted Insights: {self.demoted_insights}")
def reflect(self, reflexion_prompt):
# Build the state graph for reflection
builder = StateGraph(MessagesState)
builder.add_node("reflection", call_model)
builder.add_edge(START, "reflection")

-- 219 of 559 --

graph = builder.compile()
# Invoke the graph with the reflection prompt
result = graph.invoke(
{
"messages": [
HumanMessage(
content=reflexion_prompt
)
]
}
)
reflection = result["messages"][-1].content
self.reflections.append(reflection)
print(f"Reflection: {reflection}")
With sufficient feedback, this process provides an efficient way to
learn from interactions with the environment and improve
performance over time. An added advantage of this approach is its
capability to facilitate the agent’s gradual adaptation to
nonstationary environments. Thus, if your agent needs to adjust its
policy to a changing environment, this approach enables it to do so
effectively. Let’s now take a look at some example usage:
agent = InsightAgent()
# Simulated sequence of observations and whether the KPI
target was met
reports = [
("Website traffic rose by 15%, but bounce rate jumped
from 40% to 55%.",
False),
("Email open rates improved to 25%, exceeding our 20%
goal.", True),
("Cart abandonment increased from 60% to 68%, missing
the 50% target.",
False),
("Average order value climbed 8%, surpassing our 5%
uplift target.", True),
("New subscription sign-ups dipped by 5%, just below
our 10% growth goal.",

-- 220 of 559 --

False),
]
# 1) Generate and prioritize insights over the reporting
periods
for text, hit_target in reports:
insight = agent.generate_insight(text)
if hit_target:
agent.promote_insight(insight)
else:
agent.demote_insight(insight)
# 2) Refine one of the promoted insights with human-in-theloop editing
if agent.promoted_insights:
original = agent.promoted_insights[0]
agent.edit_insight(original, f'''Refined:
{original} Investigate
landing-page UX changes to reduce bounce.''')
# 3) Display the agent's final insights state
agent.show_insights()
# 4) Reflect on the top insights to plan improvements
reflection_prompt = (
"Based on our promoted insights, suggest one highimpact experiment we can
run next quarter:"
f"\n{agent.promoted_insights}"
)
agent.reflect(reflection_prompt)
As you can see, even a small number of lines of code can enable an
agent to continually learn from experience to improve performance
on a specific task. These approaches are very practical, affordable,
easy to implement, and enable continual adaptation from
experience. In some cases, though, and especially when we have a
large number of samples to learn from, it can make sense to
consider fine-tuning.

-- 221 of 559 --

Parametric Learning: Fine-Tuning
Parametric learning involves adjusting the parameters of a
predefined model to improve its performance on specific tasks.
When we have evaluation data, we can use it to improve the
performance of our system. It often makes sense to start with
nonparametric approaches, because they are simpler and faster to
implement. Adding examples and insights into the prompt takes time
and computational resources, though. When we have a sufficient
number of examples, it might be worth considering fine-tuning your
models as well to improve your agentic performance on your tasks.
Fine-tuning is a common approach where a pretrained model is
adapted to new tasks or datasets by making small adjustments to its
parameters.
Fine-Tuning Large Foundation Models
Most developers begin building agentic systems with generic large
foundation models such as GPT-5, Claude Opus, Gemini, and other
similar classes of models because these offer an exceptional level of
performance across a variety of tasks. These models are pretrained
on extensive, general-purpose datasets, which equip them with a
vast amount of linguistic and conceptual knowledge. These
companies invest a great deal of effort in their own post-training
processes. Fine-tuning these models involves making targeted
adjustments to their parameters, tailoring them to specific tasks or
domains. This process allows developers to adapt the model’s
extensive knowledge to specialized applications, boosting its
relevance and effectiveness on specific tasks while retaining its
general capabilities. Figure 7-5 illustrates the generic fine-tuning
process, showing how a large pretrained model is further adapted to
specific tasks using curated domain datasets.

---

## Sección 75: Chapter 7. Learning in Agentic

-- 222 of 559 --

Figure 7-5. Fine-tuning workflow. A language model is first pretrained on a broad
corpus to build general capabilities, then fine-tuned on a smaller, task-specific
dataset to produce a specialized model aligned with domain needs.
Deciding whether to invest in fine-tuning hinges on your specific
needs, resources, and longer-term maintenance plans. Consider finetuning in the following scenarios:
Domain specialization is critical
You need the model to speak your organization’s jargon, follow a
strict style guide, or handle highly sensitive content with minimal
errors. Off-the-shelf models often struggle with narrow domains,
and supervised fine-tuning (SFT) or direct preference
optimization (DPO) can lock in that expertise.
Consistent tone and format matter
If every response must adhere to a precise template—say,
financial disclosures or legal disclaimers—fine-tuning ensures the
model reliably produces the correct structure without elaborate
prompt engineering.
Tool and API calls must be precise
When your agent regularly invokes external functions or services
(e.g., medical dosages, trading APIs), function-calling fine-tuning

-- 223 of 559 --

can drastically reduce miscalls and handle edge-case errors more
gracefully than in-context prompts alone.
You have sufficient high-quality data and budget
Fine-tuning large models demands hundreds to thousands of
curated examples, expert graders (for reinforcement fine-tuning
[RFT]), and GPU hours. If you lack data or compute,
nonparametric methods like Reflexion or exemplar retrieval may
offer better ROI.
Retraining frequency is manageable
Fine-tuned models require version management, retraining
schedules, and compatibility checks. If your domain changes
frequently, the upkeep cost can outweigh the performance gains.
When to hold off:
You’re in rapid prototyping or low-volume use
Early in development, nonparametric learning or prompt
engineering lets you iterate at zero retraining cost. Only commit
to fine-tuning once your use case and data pipelines are stable.
Model evolution could invalidate your effort
Proprietary LLM providers regularly release improved base
models. A new GPT-5 update may outperform your fine-tuned
GPT-4, wiping out months of retraining work. Always weigh your
fine-tuning investment against the pace of upstream model
advances.
You’re experiencing resource constraints
If GPU availability is limited, annotation is expensive, or inference
speed is a priority, consider nonparametric strategies like
retrieval-augmented generation. They can deliver many of the

-- 224 of 559 --

same benefits at a fraction of the cost and with far lower initial
investment and ongoing maintenance.
In short, fine-tune a model only when your performance
requirements, data availability, and operational capacity align—and
always maintain a clear plan for retraining or migrating when the
next generation of base models arrives. It’s important to note that
pretraining—training a model from scratch on trillions of tokens—is
an undertaking reserved for major AI labs with vast compute
resources and proprietary data. For nearly all teams, the best
approach is to start with high-quality open source models that have
appropriate licenses for your use case. Often, these models already
include post-training or instruction tuning that aligns closely with
your task needs. In many cases, this eliminates the need for
additional fine-tuning altogether, or at least reduces it to minimal
targeted updates. Before investing in fine-tuning, always explore
whether an existing pretrained or instruction-tuned model can meet
your requirements with prompt engineering, nonparametric learning,
or lightweight adaptation techniques. When in doubt, don’t fine-tune
your model. There are often lower-cost, higher-leverage activities
you can take to improve your product. Table 7-1 shows the primary
methods for fine-tuning language models.

-- 225 of 559 --

-- 226 of 559 --

T
a
bl
e
-
.
P
ri
m
a
r
y
m
e
t
h
o
d
s
f
o
r
fi
n
e
-
t
u
ni
n
g
la
n

-- 227 of 559 --

g
u
a
g
e
m
o
d
el
s
Method How it works Best for
Supervised
fine-tuning
(SFT)
Provide (prompt, idealresponse) pairs as “ground
truth” examples. Call the
OpenAI fine-tuning API to
adjust model weights.
Classification,
structured output,
correcting
instruction failures
Vision finetuning
Supply image-label pairs for
supervised training on
visual inputs. This improves
image understanding and
multimodal instruction
following.
Image
classification,
multimodal
instruction
robustness

-- 228 of 559 --

Direct
preference
optimization
Give both a “good” and a
“bad” response per prompt
and indicate the preferred
one. The model learns to
rank and prefer higherquality outputs.
Summarization
focus, tone/style
control
Reinforcement
fine-tuning
(RFT)
Generate candidate outputs
and have expert graders
score them. Then use a
policy gradient-style update
to reinforce high-scoring
chains of thought.
Complex
reasoning,
domain-specific
tasks (legal,
medical)
Fine-tuning offers four distinct levers for adapting pretrained models
to your needs:
Supervised fine-tuning (SFT)
SFT uses curated (prompt, response) pairs to teach the model
exactly how it should behave, making it ideal for classification
tasks, structured outputs, or correcting instruction-following
errors.
Vision fine-tuning
Vision fine-tuning injects labeled image-label pairs to sharpen a
model’s multimodal understanding—perfect when you need
robust image classification or more reliable handling of visual
inputs.
Direct preference optimization (DPO)

---

## Sección 76: Chapter 7. Learning in Agentic

-- 229 of 559 --

DPO trains the model on paired “good versus bad” responses,
helping it learn to favor higher-quality outputs, which is especially
useful for tuning tone, style, or summarization priorities.
Reinforcement fine-tuning (RFT)
RFT leverages expert-graded outputs and policy-gradient updates
to reinforce complex reasoning chains, making it the go-to for
high-stakes domains like legal analysis or medical decision
support.
Large foundation models excel at absorbing vast amounts of general
knowledge, but their true power emerges when you fine-tune them
on domain-specific data. A GPT-5 model customized for financial
documents, for example, will not only parse jargon correctly but also
adhere to your organization’s precise reporting conventions.
Similarly, a legal-tuned model can surface case law insights with the
right tone of voice, while a customer-support tune can ensure every
reply follows your corporate guidelines. This tight alignment between
the model’s internal representations and your real-world context is
why fine-tuning remains indispensable for mission-critical
applications.
That said, fine-tuning large models demands serious resources.
Billions of parameters translate into heavy GPU requirements,
lengthy training runs, and nontrivial cloud costs. Retraining to keep
up with evolving data or to correct drift can multiply these expenses,
and real-time deployments may suffer from higher inference latency
as a result. For organizations without dedicated ML infrastructure,
these barriers can make large-model fine-tuning impractical.
Equally important is the need for high-quality, task-specific training
data. Large models only become “better” in your domain when they
see enough representative examples—often in the thousands—to
internalize subtle patterns. Curating, labeling, and validating these
datasets is time-consuming and can introduce bias if not handled

-- 230 of 559 --

carefully. Without rigorous data governance and robust hold-out
testing, you risk overfitting your model to stale or unrepresentative
examples, limiting its ability to generalize and retain fairness.
Despite these challenges, fine-tuning large models remains a
powerful approach, especially in cases where high performance is
critical and the resources to support such models are available. The
unparalleled capacity of large models enables them to perform at
exceptional levels when fine-tuned for specific tasks, often
surpassing the performance of smaller, task-specific models. This
makes them ideal for applications where accuracy, depth of
understanding, and nuanced language handling are necessary, such
as healthcare diagnostics, legal analysis, or complex technical
support.
Fine-tuning language models is a large and complex domain,
encompassing a wide range of techniques, architectures, and tradeoffs. In this section, we are not attempting to cover every nuance or
training approach in depth. Instead, the examples provided here are
intended as an introduction to the topic—offering practical
illustrations to help you assess whether fine-tuning might be worth
deeper investment for your own projects. If you find that these
methods align with your goals, there are many excellent resources,
papers, and open source toolkits available to continue your learning
journey into fine-tuning strategies, scalable optimization, and
production deployment.
Large foundation models offer a powerful solution for applications
requiring high accuracy, adaptability, and nuanced understanding.
Fine-tuning these models enables developers to harness their
extensive pretrained knowledge while optimizing performance for
specialized tasks or domains. While the computational and data
requirements are significant, the benefits of fine-tuning large models
can justify the investment for applications demanding peak
performance and robust language comprehension, but it is only
recommended for a small number of use cases.

-- 231 of 559 --

The Promise of Small Models
In contrast to large foundation models, small models offer a more
resource-efficient alternative, making them suitable for many
applications where computational resources are limited or response
time is critical. While small models inherently have fewer parameters
and simpler architectures, they can still be surprisingly effective
when finely tuned to a specific task. This adaptability stems from
their simplicity, which not only allows for faster adaptation but also
enables rapid experimentation with different training configurations.
Small models are particularly advantageous in environments where
deploying larger, more complex models would be costly, impractical,
or excessive given the task requirements.
The lean architecture of small models offers unique advantages in
transparency and interpretability. Because they have fewer layers
and parameters, it is easier to analyze their decision-making
processes and to understand the factors influencing their outputs.
This interpretability is invaluable in applications where explainability
is essential—such as finance, healthcare, and regulatory domains—
as stakeholders need clear insights into how and why decisions are
made. For instance, a small model fine-tuned for medical image
classification can be more straightforward to debug and validate,
providing assurance to medical practitioners who rely on its
predictions. In these contexts, smaller models contribute to
increased accountability and trust, particularly in high-stakes
applications where the reasoning behind decisions must be
understandable and accessible.
Small models also enable Agile development workflows. Their
lightweight structure allows for faster iterations during fine-tuning,
which can lead to quicker insights and adjustments. For developers
working in Agile environments or with limited access to highperformance computing, small models provide a flexible, responsive
solution. They are ideal for tasks requiring continuous or incremental
learning, where models must be frequently updated with new data

---

## Sección 77: Chapter 7. Learning in Agentic

-- 232 of 559 --

to maintain relevance. Moreover, small models can be deployed
effectively in real-time systems, such as embedded devices, mobile
applications, or Internet of Things networks, where low latency is
essential. In these applications, the reduced computational footprint
of small models enables efficient processing without compromising
the overall system’s responsiveness.
Another key advantage of small models is their accessibility, both in
terms of cost and availability. Many high-performing small models
are open source and freely available, including models like Llama
and Phi, which can be modified to suit various use cases. This
accessibility lowers barriers for organizations and developers who
may not have the budget or infrastructure to support large-scale
models. Small models allow these teams to experiment, innovate,
and deploy ML solutions without incurring significant operational
costs. This democratization of ML technology enables more
organizations to harness the benefits of AI, contributing to a more
inclusive development ecosystem.
In terms of performance, fine-tuned small models can achieve
results comparable to those of larger models on specific, narrowly
defined tasks. For example, a small model fine-tuned for sentiment
analysis within a particular domain, such as financial reports, can
achieve high accuracy because it specializes in recognizing patterns
specific to that context. When applied to well-defined tasks with
clear data boundaries, small models can match, or even surpass, the
performance of larger models by focusing all of their capacity on the
relevant aspects of the task. This efficiency is particularly valuable in
applications with high accuracy demands but limited data, where
small models can be customized to perform effectively without
overfitting.
In addition to their efficiency, small models support a sustainable
approach to AI development. Training and deploying large models
consume significant energy and computational resources, which
contribute to environmental impacts. Small models, however, require

-- 233 of 559 --

substantially less energy for training and inference, making them a
more sustainable choice for applications where resource
consumption is a concern. Organizations prioritizing environmental
sustainability can integrate small models as part of their green AI
strategies, contributing to reduced carbon footprints without
compromising on innovation.
The promise of small models extends to settings where frequent
updates or retraining are needed. In scenarios where the data
landscape changes rapidly—such as social media sentiment analysis,
real-time fraud detection, or personalized recommendations—small
models can be quickly retrained or fine-tuned with new data,
adapting rapidly to changing patterns. This ability to frequently
update without high retraining costs makes small models ideal for
applications where adaptability is crucial. Additionally, small models
can be deployed in federated learning environments, where data
privacy concerns require models to be trained across decentralized
data sources. In these settings, small models can be efficiently finetuned on edge devices, enabling privacy-preserving AI solutions.
Fine-tuning smaller models represents a rapidly evolving landscape—
a kaleidoscope of architectures, sizes, and capabilities that can
deliver near-state-of-the-art performance at a fraction of the
compute and cost. In early 2025, benchmarks like Stanford’s HELM
(Holistic Evaluation of Language Models) showcased open weight
models such as DeepSeek-v3 and Llama 3.1 Instruct Turbo (70B)
achieving mean scores above 66% on MMLU, and even 8Bparameter variants like Gemini 2.0 Flash-Lite began to crack the
64% threshold. In addition, Baytech Consulting reported that Phi-3mini (3.8B) matched 540B-parameter PaLM’s 60% MMLU score, a
142× size reduction in two years. Mobile-MMLU further highlighted
that models under 9B can excel on edge-focused tasks, although
variance grows as parameter counts fall.
This pace means that the “best” small model family today—be it
Llama 3 (8B–70B), Qwen2.5 Turbo (72B), or the emerging Palmyra

-- 234 of 559 --

and DeepSeek lines—may be eclipsed within months. To stay
current, practitioners should rely on trusted third-party leaderboards:
Stanford HELM publishes live MMLU, GPQA, and IFEval
scores across dozens of models.
Papers With Code aggregates benchmarks and provides
downloadable artifacts for comparative analysis.
Hugging Face’s Evaluation on the Hub offers an API to fetch
up-to-date results on common tasks like GSM8K and
HumanEval.
BigBench Leaderboard tracks performance on the BBH suite,
complementing HELM’s broader scope.
When choosing a small model, consider your deployment constraints
—latency, hardware, budget—and task demands. Models with fewer
than eight billion parameters are unbeatable for on-device or lowcost inference; 8B–70B families strike a sweet spot for general
reasoning; above that, proprietary giants like GPT-5 still lead in highstakes accuracy. By combining these resources with periodic
leaderboard checks, you can navigate this shifting terrain and select
the optimal small-model family for your agentic application—while
acknowledging that the field’s rapid churn will likely deposit a new
champion by the time you finish reading this chapter.
Supervised Fine-Tuning
Among parametric approaches, supervised fine-tuning remains the
foundational technique, enabling precise behavioral shaping through
curated input/output examples. SFT is the foundational approach for
precisely steering an agent’s behavior by showing it explicit
examples of how to respond. One powerful use case is teaching an
agent exactly when and how to invoke external APIs—fine-tuning
function calling so the agent not only formats tool calls correctly but

---

## Sección 78: Chapter 7. Learning in Agentic

-- 235 of 559 --

also reasons whether a call should happen at all. This extends what
standard hosted function calling offers, providing more control and
consistency when prompt engineering alone falls short. While offthe-shelf foundation models continue to improve at generating
function calls, you may encounter stubborn cases where your
prompts grow unwieldy, parameters are repeatedly mis-parsed, or
accuracy lags behind your domain’s strict requirements. In those
scenarios—especially if you’re driving high-volume traffic and every
percentage point of reliability matters—fine-tuning on curated
examples can both boost performance and, over time, reduce your
per call costs compared with token-expensive proprietary endpoints.
In essence, SFT uses carefully curated (prompt, response) pairs to
help the model learn the desired output style, structure, or behavior.
The same technique can adapt an agent for consistent tone,
structured output, or—in this example—precise tool use. You can see
this process illustrated in Figure 7-6.
Figure 7-6. SFT workflow. A foundation model is first pretrained on a broad corpus
to build general capabilities, then further fine-tuned using a task-specific
supervised dataset to adapt it for specialized applications.
To make function calls robust, you’ll typically define an explicit
schema for each API you expose—specifying function names, valid
arguments, types, and return formats. This ensures your examples
teach the agent the
contract it must follow. To do this, you assemble
a fine-tuning dataset of structured examples that mirror your exact

-- 236 of 559 --

API schema—function names, argument types, and return formats—
so the model internalizes your toolset’s contract. The result is a
model that not only formats calls correctly on the first try, but also
makes contextual judgments about whether a function should be
invoked at all. Because this approach demands extra data curation,
compute resources, and maintenance, we recommend starting with
the pretrained models’ built-in function-calling and runtime schema
validation. Only once you’ve confirmed that prompt engineering and
standard APIs fall short, should you consider this more heavyweight
investment—ideally when your scale and precision requirements
justify the up-front effort.
This involves presenting the model with structured examples where
the agent must choose whether to make a function call, populate
arguments accurately, and wrap the result appropriately. For
example, if a user asks, “What’s the weather in Boston?”, a welltuned agent should call a get_weather(location="Boston")
function, and then incorporate the result into its reply. But if the user
says, “Imagine it’s snowing in Boston—what should I wear?”, the
agent should reason hypothetically without triggering a real call. This
type of contextual judgment is learned through targeted examples.
To ensure your fine-tuned agent generates only well-formed, safe
function invocations, it’s critical to define and enforce a clear schema
for every API or tool you expose. By codifying each function’s name,
argument types, and return structure in a machine-readable format
—such as JSON Schema or a TypeScript/Zod schema—you give the
model a precise contract to follow. During fine-tuning, include these
schemas alongside your examples so the model learns not just what
to call but exactly how to structure its JSON payload. At runtime,
validate every proposed call against the same schema (using
libraries like Zod, Ajv, or Pydantic) before executing it; any mismatch
can be caught early and either corrected or rejected, preventing
malformed or malicious requests. This end-to-end schema discipline

-- 237 of 559 --

drastically reduces errors, simplifies debugging, and hardens your
system against unexpected inputs.
Fine-tuning also helps the model learn how to parse user inputs into
valid arguments, recover from errors (like missing parameters), and
gracefully fall back if the function call fails. Special tokens and
formatting—such as wrapping the agent’s internal reasoning in
<think>…</think> or enclosing a call in <tool_call>…
</tool_call>—can help the model distinguish between dialogue,
thought, and action.
The following is a minimal working pattern for the supervised finetuning of a language model with LoRA (Low-Rank Adaptation)
adapters for function calling. This includes preprocessing
conversations into a consistent
chat template:
1. Attaching special tokens for <think> or <tool_call>
segments
2. Using LoRA to adapt only targeted layers efficiently
3. Training with SFTTrainer to update the model on your
dataset of correct (prompt, response) pairs
We start with the preprocess function, which structures the data
appropriately for training:
def build_preprocess_fn(tokenizer):
"""Returns a function that maps raw samples to
tokenized prompts."""
def _preprocess(sample):
messages = sample["messages"].copy()
_merge_system_into_first_user(messages)
prompt = tokenizer.apply_chat_template(messages,
tokenize=False)
return {"text": prompt}

---

## Sección 79: Chapter 7. Learning in Agentic

-- 238 of 559 --

return _preprocess
Here, we wrap the model’s internal reasoning and external tool calls
in special tokens, like <think>…</think> and <tool_call>…
</tool_call>. This makes it easy for the model to separate its
“thoughts” from its API actions:
def build_tokenizer(model_name: str):
tokenizer = AutoTokenizer.from_pretrained(
model_name,
pad_token=ChatmlSpecialTokens.pad_token.value,
additional_special_tokens=ChatmlSpecialTokens.list(),
)
tokenizer.chat_template = CHAT_TEMPLATE
return tokenizer
def build_model(model_name: str, tokenizer, load_4bit: bool
= False):
kwargs = {
"attn_implementation": "eager",
"device_map": "auto",
}
kwargs["quantization_config"] = BitsAndBytesConfig(
load_in_4bit=True,
bnb_4bit_compute_dtype=torch.bfloat16,
bnb_4bit_quant_type="nf4",
bnb_4bit_use_double_quant=True,
)
model =
AutoModelForCausalLM.from_pretrained(model_name, **kwargs)
model.resize_token_embeddings(len(tokenizer))
return model
Each example is tokenized and added to a training dataset, and then
fine-tuned using standard supervised learning techniques with LoRA

-- 239 of 559 --

for efficiency. The training loop uses SFTTrainer from Hugging
Face’s TRL library, which supports features like sequence packing
and gradient checkpointing:
def load_and_prepare_dataset(ds_name: str, tokenizer,
max_train:
int, max_eval: int) -> DatasetDict:
"""Loads the dataset and applies preprocessing &
train/test split."""
raw =
load_dataset(ds_name).rename_column("conversations",
"messages")
processed = raw.map(build_preprocess_fn(tokenizer),
remove_columns="messages")
split =
processed["train"].train_test_split(test_size=0.1, seed=42)
split["train"] =
split["train"].select(range(max_train))
split["test"] = split["test"].select(range(max_eval))
return split
def train(
model,
tokenizer,
dataset: DatasetDict,
peft_cfg: LoraConfig,
output_dir: str,
epochs: int = 1,
lr: float = 1e-4,
batch_size: int = 1,
grad_accum: int = 4,
max_seq_len: int = 1500,
):
train_args = SFTConfig(
output_dir=output_dir,
per_device_train_batch_size=batch_size,
per_device_eval_batch_size=batch_size,
gradient_accumulation_steps=grad_accum,
save_strategy="no",
eval_strategy="epoch",

-- 240 of 559 --

logging_steps=5,
learning_rate=lr,
num_train_epochs=epochs,
max_grad_norm=1.0,
warmup_ratio=0.1,
lr_scheduler_type="cosine",
report_to=None,
bf16=True,
gradient_checkpointing=True,
gradient_checkpointing_kwargs={"use_reentrant":
False},
packing=True,
max_seq_length=max_seq_len,
)
trainer = SFTTrainer(
model=model,
args=train_args,
train_dataset=dataset["train"],
eval_dataset=dataset["test"],
processing_class=tokenizer,
peft_config=peft_cfg,
)
trainer.train()
trainer.save_model()
return trainer
When agents depend on reliable tool use—retrieving calendar
entries, executing commands, or querying databases—SFT makes
these calls dramatically more robust than prompt engineering alone.
It lowers error rates, teaches contextual judgment (when
not to
call), and reduces your token cost by cutting retries and malformed
calls.
It also introduces a layer of reasoning: the model can choose when
not to call a tool. For example, if the user says “If it rains tomorrow,
I’ll stay in,” the agent can reason that no API call is needed and
simply reply.

-- 241 of 559 --

Finally, this method improves user experience by enabling agents to
handle complex tasks with reliability. As agents take on more
responsibility—especially in automation and decision-making roles—
structured function calling becomes a foundational skill worth finetuning.
Direct Preference Optimization
Building on SFT, direct preference optimization introduces preference
learning, aligning outputs more closely with human-ranked quality
judgments. DPO is a fine-tuning technique that trains a model to
prefer better outputs over worse ones by learning from ranked pairs.
Unlike standard SFT, which simply teaches the model to replicate a
“gold” output, DPO helps the model internalize preference
judgments—improving its ability to rank and select high-quality
completions at inference time. Figure 7-7 illustrates the DPO
workflow, showing how models are trained on human preference
data to learn to produce outputs that align with ranked quality
judgments.

-- 242 of 559 --

Figure 7-7. DPO workflow. Prompts are fed to the model to generate multiple
completions, which are then evaluated by humans to produce preference data
indicating the better response. These preferences are indicated as y_win
and
y_lose
under “preference data.” This data is used in DPO training to directly
optimize the model toward preferred outputs, resulting in an aligned model that
better reflects human preferences.
The following is a minimal working example using a small Phi-3
model to fine-tune help desk response quality:
import torch, os
from datasets import load_dataset
from transformers import AutoTokenizer,
AutoModelForCausalLM, TrainingArguments,
BitsAndBytesConfig
from peft import LoraConfig, get_peft_model
from trl import DPOConfig, DPOTrainer
import logging
BASE_SFT_CKPT = "microsoft/Phi-3-mini-4k-instruct"
DPO_DATA =
"training_data/dpo_it_help_desk_training_data.jsonl"
OUTPUT_DIR = "phi3-mini-helpdesk-dpo"

---

## Sección 80: Chapter 7. Learning in Agentic

-- 243 of 559 --

# 
1⃣ Model + tokenizer
tok = AutoTokenizer.from_pretrained(BASE_SFT_CKPT,
padding_side="right",
trust_remote_code=True)
logger = logging.getLogger(__name__)
if not os.path.exists(BASE_SFT_CKPT):
logger.warning(f'''Local path not found; will
attempt to download {BASE_SFT_CKPT} from the
Hub.''')
bnb_config = BitsAndBytesConfig(
load_in_4bit=True,
bnb_4bit_use_double_quant=True,
bnb_4bit_compute_dtype=torch.bfloat16
)
base = AutoModelForCausalLM.from_pretrained(
BASE_SFT_CKPT,
device_map="auto",
torch_dtype=torch.bfloat16,
quantization_config=bnb_config
)
lora_cfg = LoraConfig(
r=8,
lora_alpha=16,
lora_dropout=0.05,
target_modules=["q_proj", "k_proj", "v_proj", "o_proj",
"gate_proj",
"up_proj", "down_proj"],
bias="none",
task_type="CAUSAL_LM",
)
model = get_peft_model(base, lora_cfg)
print("✅ Phi-3 loaded:", model.config.hidden_size,
"hidden dim")
Next, we load our dataset containing ranked pairs. Each example
includes a prompt, a preferred (“chosen”) response, and a less

-- 244 of 559 --

preferred (“rejected”) response. This structure enables the model to
learn which outputs to favor during training:
# Load DPO dataset with ranked pairs
# Each row should include: {"prompt": ..., "chosen":
..., "rejected": ...}
dataset = load_dataset("json",
data_files="training_data/dpo_it_help_desk_training_data.js
onl",
split="train")
With our data prepared, we define training hyperparameters and
configure DPO. The beta parameter adjusts how strongly the model
prioritizes the preferred response during optimization:
# 
4⃣ Trainer
train_args = TrainingArguments(
output_dir = OUTPUT_DIR,
per_device_train_batch_size = 4,
gradient_accumulation_steps = 4,
learning_rate = 5e-6,
num_train_epochs= 3,
logging_steps = 10,
save_strategy = "epoch",
bf16 = True,
report_to = None,
)
dpo_args = DPOConfig(
output_dir = "phi3-mini-helpdesk-dpo",
per_device_train_batch_size = 4,
gradient_accumulation_steps = 4,
learning_rate = 5e-6,
num_train_epochs = 3.0,
bf16 = True,
logging_steps = 10,
save_strategy = "epoch",
report_to = None,

-- 245 of 559 --

beta = 0.1,
loss_type = "sigmoid",
label_smoothing = 0.0,
max_prompt_length = 4096,
max_completion_length = 4096,
max_length = 8192,
padding_value = tok.pad_token_id,
label_pad_token_id = tok.pad_token_id,
truncation_mode = "keep_end",
generate_during_eval = False,
disable_dropout = False,
reference_free = True,
model_init_kwargs = None,
ref_model_init_kwargs = None,
)
trainer = DPOTrainer(
model,
ref_model=None,
args=dpo_args,
train_dataset=ds,
)
trainer.train()
trainer.save_model()
tok.save_pretrained(OUTPUT_DIR)
In summary, this script loads a base Phi-3 model with LoRA
adapters, prepares a dataset of preference-ranked examples, and
fine-tunes the model using DPOTrainer. After training, the model
can produce higher-quality outputs that reflect your defined
preferences more reliably than standard SFT alone.
DPO is especially useful when your primary goal is to shape output
quality rather than simply replicate examples. It complements SFT
by adding a preference-learning dimension, helping your agents
produce outputs that are not only correct but also aligned with
nuanced human expectations.

-- 246 of 559 --

Reinforcement Learning with Verifiable
Rewards
Building on preference-based fine-tuning, reinforcement learning
with verifiable rewards (RLVR) introduces policy optimization against
an explicit, measurable reward function.
Unlike preference-based approaches, RLVR enables you to connect
any grader you can build—automated metrics, rule-based validators,
external scoring models, or human evaluators—and directly optimize
your model toward those rewards. This unlocks scalable, targeted
improvement for virtually any task where you can define a verifiable
evaluation signal. Whether optimizing summarization quality,
correctness of tool calls, factuality of knowledge retrieval, or even
adherence to safety constraints, RLVR transforms static preference
learning into a general, extensible reinforcement learning
framework.
Unlike DPO, which directly optimizes for pairwise preferences, RLVR
combines preference learning with reinforcement learning, enabling
the model to generalize beyond observed rankings by predicting
value scores and optimizing its outputs accordingly. Figure 7-8
illustrates the RLVR workflow, showing how models learn from
graded completions to iteratively improve their performance on
target tasks which then guide policy updates to produce outputs that
maximize predicted quality and utility.
In the interest of readability, we will not include the full code for
RLVR here, but it can be found in the accompanying repository for
those who wish to implement it in practice.
Benefits of RLVR include its flexibility to optimize against any
measurable signal, its ability to generalize beyond observed
examples through value prediction, and its suitability for tasks where
automated grading or scalable human evaluation is available. RLVR
is particularly effective when you have ranked preference data or
when you can build a reliable scoring function to evaluate outputs. It

---

## Sección 81: Chapter 7. Learning in Agentic

-- 247 of 559 --

is ideal for scenarios requiring continual quality improvement,
especially when rewards are sparse or evaluation is too costly to
obtain at scale through direct human labeling alone.
Figure 7-8. Reinforcement fine-tuning with verifiable rewards. Prompts are
sampled to generate multiple completions, which are evaluated by a grader (either
automated or human). These rewards are fed into the model trainer to update the
policy, improving future outputs based on observed performance.
In summary, RLVR expands the possibilities of RFT by combining
preference learning with value-based policy optimization. This allows
your models not just to imitate preferred outputs, but to predict and
optimize for what will be most useful, accurate, or aligned—paving
the way for self-improving, task-specialized foundation models.
Conclusion
Learning in agentic systems encompasses a variety of approaches,
each offering distinct advantages for improving performance and
adaptability. Nonparametric learning enables agents to learn
dynamically from experience without modifying underlying model

-- 248 of 559 --

parameters, emphasizing simplicity, speed, and real-world
responsiveness. Parametric learning, by contrast, directly fine-tunes
model weights to achieve deeper specialization—whether through
supervised fine-tuning for structured outputs and function calling, or
through direct preference optimization to shape output quality
according to nuanced human judgments. Together, these learning
methods form a powerful toolkit. By combining nonparametric agility
with targeted parametric adaptation, developers can create
intelligent, robust agents capable of evolving alongside changing
tasks and environments—while ensuring each investment in learning
aligns with operational constraints and performance goals.

-- 249 of 559 --

---

## Sección 82: Chapter 8. From One Agent to

Many
Most use cases start with one agent, but as the number of tools increases,
and the range of problems you want your agent to solve increases,
introducing a multiagent pattern can improve the overall performance and
reliability. Just as we saw that it’s probably not a good idea to put all of your
code in a single file, or bundle all of your backend servers into a single
monolith, many of the lessons we learned about the principles of software
architecture and service design still apply when building systems with AI and
foundation models. As you continue to add functionality and capabilities into
your agentic system, you’ll soon find the need to break up your system into
smaller agents that can be independently validated, tested, integrated, and
reused. In this chapter, we’ll discuss how and when to add an agent to your
system, and how to organize and manage them.
How Many Agents Do I Need?
Begin with a simple approach, and only add complexity as needed to improve
performance. The appropriate number and organization of agents will vary
enormously based on the difficulty of the tasks, the number of tools, and the
complexity of the environment.
Single-Agent Scenarios
We’ll begin with single-agent systems, which are suitable for tasks that are of
modest difficulty, a limited number of tools, and lower-complexity
environments. They are also often better when latency is critical, as
multiagent systems typically require multiple exchanges between agents,
which increases the latency for the user. As a result, it is typically best practice
to begin with a single-agent system, as it is often faster and cheaper than
extending to multiagent systems. In this approach, a single agent is
responsible for invoking tools, if available, up to a limit before responding to
the user. In this, the agent performs tasks and chooses when to invoke tools
or submit the answer. The primary benefits include:

-- 250 of 559 --

Simplicity
Easier implementation and management
Lower resource requirements
Less computational overhead
Latency
Quicker response for users
Single-agent systems offer a strong starting point for building agentic
applications. Their simplicity, lower cost, and reduced latency make them well
suited for many practical scenarios—especially when the task scope is limited
and performance requirements are tight. While they may not scale well to
highly complex or multifaceted tasks, starting with a single-agent architecture
enables teams to validate core functionality quickly and iterate efficiently. Only
when the complexity, toolset, or task coordination needs outgrow the capacity
of a single agent should developers consider transitioning to more
sophisticated multiagent systems.
To illustrate, consider a single-agent system for supply chain logistics
management. This agent handles a broad set of tools for inventory, shipping,
and supplier tasks in one unified prompt and graph. While effective for basic
queries, performance can degrade with too many tools, as the agent must
select from a large set. Here’s how we set up a single agent with 16 tools:
from __future__ import annotations
"""
supply_chain_logistics_agent.py
LangGraph workflow for a Supply Chain & Logistics Management agent,
handling inventory management, shipping operations, supplier
relations,
and warehouse optimization.
"""
import os
import json
import operator
import builtins
from typing import Annotated, Sequence, TypedDict, Optional
from langchain_openai.chat_models import ChatOpenAI

-- 251 of 559 --

from langchain.schema import AIMessage, BaseMessage, HumanMessage,
SystemMessage
from langchain_core.messages.tool import ToolMessage
from langchain.callbacks.streaming_stdout import
StreamingStdOutCallbackHandler
from langchain.tools import tool
from langgraph.graph import StateGraph, END
from traceloop.sdk import Traceloop
from src.common.observability.loki_logger import log_to_loki
os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"] = "http://localhost:4317"
os.environ["OTEL_EXPORTER_OTLP_INSECURE"] = "true"
@tool
def manage_inventory(sku: str = None, **kwargs) -> str:
"""Manage inventory levels, stock replenishment, audits,
and optimization strategies."""
print(f"[TOOL] manage_inventory(sku={sku}, kwargs={kwargs})")
log_to_loki("tool.manage_inventory", f"sku={sku}")
return "inventory_management_initiated"
@tool
def track_shipments(origin: str = None, **kwargs) -> str:
"""Track shipment status, delays, and coordinate delivery
logistics."""
print(f"[TOOL] track_shipments(origin={origin}, kwargs=
{kwargs})")
log_to_loki("tool.track_shipments", f"origin={origin}")
return "shipment_tracking_updated"
@tool
def evaluate_suppliers(supplier_name: str = None, **kwargs) -> str:
"""Evaluate supplier performance, conduct audits,
and manage supplier relationships."""
print(f"[TOOL] evaluate_suppliers(supplier_name={supplier_name},
kwargs={kwargs})")
log_to_loki("tool.evaluate_suppliers", f"supplier_name=
{supplier_name}")
return "supplier_evaluation_complete"
@tool
def optimize_warehouse(operation_type: str = None, **kwargs) ->
str:
"""Optimize warehouse operations, layout, capacity, and storage
efficiency."""
print(f"[TOOL] optimize_warehouse(operation_type=

---

## Sección 83: Chapter 8. From One Agent to

-- 252 of 559 --

{operation_type},
kwargs={kwargs})")
log_to_loki("tool.optimize_warehouse", f"operation_type=
{operation_type}")
return "warehouse_optimization_initiated"
@tool
def forecast_demand(season: str = None, **kwargs) -> str:
"""Analyze demand patterns, seasonal trends, and create
forecasting models."""
print(f"[TOOL] forecast_demand(season={season}, kwargs=
{kwargs})")
log_to_loki("tool.forecast_demand", f"season={season}")
return "demand_forecast_generated"
@tool
def manage_quality(supplier: str = None, **kwargs) -> str:
"""Manage quality control, defect tracking, and supplier quality
standards."""
print(f"[TOOL] manage_quality(supplier={supplier}, kwargs=
{kwargs})")
log_to_loki("tool.manage_quality", f"supplier={supplier}")
return "quality_management_initiated"
@tool
def arrange_shipping(shipping_type: str = None, **kwargs) -> str:
"""Arrange shipping methods, expedited delivery,
and multi-modal transportation."""
print(f"[TOOL] arrange_shipping(shipping_type={shipping_type},
kwargs={kwargs})")
log_to_loki("tool.arrange_shipping", f"shipping_type=
{shipping_type}")
return "shipping_arranged"
@tool
def coordinate_operations(operation_type: str = None, **kwargs) ->
str:
"""Coordinate complex operations like cross-docking,
consolidation,
and transfers."""
print(f"[TOOL] coordinate_operations(operation_type=
{operation_type},
kwargs={kwargs})")
log_to_loki("tool.coordinate_operations", f"operation_type=
{operation_type}")
return "operations_coordinated"
@tool

-- 253 of 559 --

def manage_special_handling(product_type: str = None, **kwargs) ->
str:
"""Handle special requirements for hazmat, cold chain, and
sensitive products."""
print(f"[TOOL] manage_special_handling(product_type=
{product_type},
kwargs={kwargs})")
log_to_loki("tool.manage_special_handling", f"product_type=
{product_type}")
return "special_handling_managed"
@tool
def handle_compliance(compliance_type: str = None, **kwargs) ->
str:
"""Manage regulatory compliance, customs, documentation,
and certifications."""
print(f"[TOOL] handle_compliance(compliance_type=
{compliance_type},
kwargs={kwargs})")
log_to_loki("tool.handle_compliance", f"compliance_type=
{compliance_type}")
return "compliance_handled"
@tool
def process_returns(returned_quantity: str = None, **kwargs) ->
str:
"""Process returns, reverse logistics, and product
disposition."""
print(f"[TOOL] process_returns(returned_quantity=
{returned_quantity},
kwargs={kwargs})")
log_to_loki("tool.process_returns", f"returned_quantity=
{returned_quantity}")
return "returns_processed"
@tool
def scale_operations(scaling_type: str = None, **kwargs) -> str:
"""Scale operations for peak seasons, capacity planning,
and workforce management."""
print(f"[TOOL] scale_operations(scaling_type={scaling_type},
kwargs={kwargs})")
log_to_loki("tool.scale_operations", f"scaling_type=
{scaling_type}")
return "operations_scaled"
@tool
def optimize_costs(cost_type: str = None, **kwargs) -> str:
"""Analyze and optimize transportation, storage, and operational

-- 254 of 559 --

costs."""
print(f"[TOOL] optimize_costs(cost_type={cost_type}, kwargs=
{kwargs})")
log_to_loki("tool.optimize_costs", f"cost_type={cost_type}")
return "cost_optimization_initiated"
@tool
def optimize_delivery(delivery_type: str = None, **kwargs) -> str:
"""Optimize delivery routes, last-mile logistics,
and sustainability initiatives."""
print(f"[TOOL] optimize_delivery(delivery_type={delivery_type},
kwargs={kwargs})")
log_to_loki("tool.optimize_delivery", f"delivery_type=
{delivery_type}")
return "delivery_optimization_complete"
@tool
def manage_disruption(disruption_type: str = None, **kwargs) ->
str:
"""Manage supply chain disruptions, contingency planning,
and risk mitigation."""
print(f"[TOOL] manage_disruption(disruption_type=
{disruption_type},
kwargs={kwargs})")
log_to_loki("tool.manage_disruption", f"disruption_type=
{disruption_type}")
return "disruption_managed"
@tool
def send_logistics_response(operation_id: str = None, message: str
= None):
"""Send logistics updates, recommendations, or status reports
to stakeholders."""
print(f"[TOOL] send_logistics_response → {message}")
log_to_loki("tool.send_logistics_response", f"operation_id=
{operation_id},
message={message}")
return "logistics_response_sent"
TOOLS = [
manage_inventory, track_shipments, evaluate_suppliers,
optimize_warehouse,
forecast_demand, manage_quality, arrange_shipping,
coordinate_operations,
manage_special_handling, handle_compliance, process_returns,
scale_operations,
optimize_costs, optimize_delivery, manage_disruption,

-- 255 of 559 --

send_logistics_response
]
These tools encompass the core functions of a supply chain agent, from
tracking shipments to forecasting demand and managing disruptions. By
defining them with the @tool decorator in LangChain, we enable the agent to
call them dynamically based on the user’s query. This setup is straightforward,
requiring no complex coordination—the agent simply analyzes the prompt and
selects the appropriate tool. For example, a basic agent might handle
inventory shortages by invoking manage_inven tory and
forecast_demand in sequence, as we’ll see in the execution flow.
However, as the toolset expands—here, to 16—the agent’s system prompt
must describe all possibilities, potentially leading to confusion or suboptimal
choices. This is where the single-agent model’s limitations begin to show,
paving the way for multiagent decomposition. Now, let’s complete the agent
setup with the foundation model binding, state definition, and graph
construction:
Traceloop.init(disable_batch=True,
app_name="supply_chain_logistics_agent")
llm = ChatOpenAI(model="gpt-5", temperature=0.0,
callbacks=[StreamingStdOutCallbackHandler()],
verbose=True).bind_tools(TOOLS)
class AgentState(TypedDict):
operation: Optional[dict] # Supply chain operation information
messages: Annotated[Sequence[BaseMessage], operator.add]
def call_model(state: AgentState):
history = state["messages"]
# Handle missing or incomplete operation data gracefully
operation = state.get("operation", {})
if not operation:
operation = {"operation_id": "UNKNOWN", "type": "general",
"priority": "medium", "status": "active"}
operation_json = json.dumps(operation, ensure_ascii=False)
system_prompt = (
"You are an experienced Supply Chain & Logistics
professional.\n"
"Your expertise covers:\n"
"- Inventory management and demand forecasting\n"

---

## Sección 84: Chapter 8. From One Agent to

-- 256 of 559 --

"- Transportation and shipping optimization\n"
"- Supplier relationship management and evaluation\n"
"- Warehouse operations and capacity planning\n"
"- Quality control and compliance management\n"
"- Cost optimization and operational efficiency\n"
"- Risk management and disruption response\n"
"- Sustainability and green logistics initiatives\n"
"\n"
"When managing supply chain operations:\n"
" 1) Analyze the logistics challenge or opportunity\n"
" 2) Call the appropriate supply chain management tool\n"
" 3) Follow up with send_logistics_response to provide
recommendations\n"
" 4) Consider cost, efficiency, quality, and sustainability
impacts\n"
" 5) Prioritize customer satisfaction and business
continuity\n"
"\n"
"Always balance cost with quality and risk mitigation.\n"
f"OPERATION: {operation_json}"
)
full = [SystemMessage(content=system_prompt)] + history
first: ToolMessage | BaseMessage = llm.invoke(full)
messages = [first]
if getattr(first, "tool_calls", None):
for tc in first.tool_calls:
print(first)
print(tc['name'])
fn = next(t for t in TOOLS if t.name == tc['name'])
out = fn.invoke(tc["args"])
messages.append(ToolMessage(content=str(out),
tool_call_id=tc["id"]))
second = llm.invoke(full + messages)
messages.append(second)
return {"messages": messages}
def construct_graph():
g = StateGraph(AgentState)
g.add_node("assistant", call_model)
g.set_entry_point("assistant")
return g.compile()
graph = construct_graph()

-- 257 of 559 --

if __name__ == "__main__":
example = {"operation_id": "OP-12345", "type":
"inventory_management",
"priority": "high", "location": "Warehouse A"}
convo = [HumanMessage(content="We're running critically low on
SKU-12345.
Current stock is 50 units but we have 200 units on backorder.
What's our
reorder strategy?")]
result = graph.invoke({"operation": example, "messages": convo})
for m in result["messages"]:
print(f"{m.type}: {m.content}")
With the agent fully assembled, we see the elegance of a single-node
LangGraph: the state holds operation details and messages, the model call
analyzes queries and invokes tools, and the graph is minimal—just one
“assistant” node. This structure minimizes overhead, ensuring low latency as
there’s no inter-agent communication. In practice, as demonstrated in 2025
LangGraph tutorials for supply chain agents, such setups can process queries
in under a second on standard hardware, making them ideal for operational
dashboards or real-time alerts.
For most use cases, though, the key bottleneck arises when the number of
tools and responsibilities increases. When an agent is expected to choose the
correct tool from a set, performance degrades as the potential number of
tools increases. Before jumping to multiagents, consider scaling within the
single-agent framework: for instance, encapsulate multiple tools into larger
groupings (e.g., via hierarchical tool selection), or use semantic tool selection
using a vector database as described in Chapter 5 on orchestration. If these
approaches still fall short, decomposing tools into distinct agents with
appropriate responsibilities can then improve reliability and performance,
though it introduces coordination overhead.
Multiagent Scenarios
In multiagent systems, multiple agents collaborate to achieve shared goals, an
approach that is especially advantageous when tasks are complex and require
varied toolsets, parallel processing, or adaptability to dynamic environments.
A key benefit of multiagent systems is specialization: each agent can be
assigned specific roles or areas of expertise, allowing the system to leverage
each agent’s strengths effectively. This division of labor enables agents to

-- 258 of 559 --

focus on defined aspects of a task, which improves efficiency and ensures that
specialized tools are applied where they are most needed. By distributing tools
and responsibilities across agents, multiagent systems address the limitations
faced by single-agent systems, especially when tasks require expertise across
different domains or when the number of tools required exceeds what a single
agent can manage reliably.
Building on the single-agent supply chain example from the previous
subsection, let’s evolve it into a multiagent system. Here, we decompose the
16 tools into three specialized agents: one for inventory and warehouse
management, one for transportation and logistics, and one for supplier
relations and compliance. A supervisor agent routes queries to the appropriate
specialist, embodying manager coordination (detailed in “Manager
Coordination”). This setup demonstrates specialization by narrowing each
agent’s toolset and prompt, reducing selection errors and improving reliability.
The code begins with imports and a shared response tool, ensuring all
specialists can communicate outcomes uniformly. This shared tool minimizes
duplication while allowing decentralized execution:
import os
import json
import operator
from typing import Annotated, Sequence, TypedDict, Optional
from langchain_openai.chat_models import ChatOpenAI
from langchain.schema import AIMessage, BaseMessage, HumanMessage,
SystemMessage
from langchain_core.messages.tool import ToolMessage
from langchain.callbacks.streaming_stdout import
StreamingStdOutCallbackHandler
from langchain.tools import tool
from langgraph.graph import StateGraph, END
from traceloop.sdk import Traceloop
from src.common.observability.loki_logger import log_to_loki
os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"] = "http://localhost:4317"
os.environ["OTEL_EXPORTER_OTLP_INSECURE"] = "true"
# Shared tool for all specialists
@tool
def send_logistics_response(operation_id = None, message = None):

---

## Sección 85: Chapter 8. From One Agent to

-- 259 of 559 --

"""Send logistics updates, recommendations, or status reports to
stakeholders."""
print(f"[TOOL] send_logistics_response → {message}")
log_to_loki("tool.send_logistics_response",
f"operation_id={operation_id}, message={message}")
return "logistics_response_sent"
# Inventory & Warehouse Specialist Tools
@tool
def manage_inventory(sku: str = None, **kwargs) -> str:
"""Manage inventory levels, stock replenishment, audits,
and optimization strategies."""
print(f"[TOOL] manage_inventory(sku={sku}, kwargs={kwargs})")
log_to_loki("tool.manage_inventory", f"sku={sku}")
return "inventory_management_initiated"
@tool
def optimize_warehouse(operation_type: str = None, **kwargs) ->
str:
"""Optimize warehouse operations, layout, capacity, and storage
efficiency."""
print(f"[TOOL] optimize_warehouse(operation_type=
{operation_type},
kwargs={kwargs})")
log_to_loki("tool.optimize_warehouse", f"operation_type=
{operation_type}")
return "warehouse_optimization_initiated"
@tool
def forecast_demand(season: str = None, **kwargs) -> str:
"""Analyze demand patterns, seasonal trends, and create
forecasting models."""
print(f"[TOOL] forecast_demand(season={season}, kwargs=
{kwargs})")
log_to_loki("tool.forecast_demand", f"season={season}")
return "demand_forecast_generated"
@tool
def manage_quality(supplier: str = None, **kwargs) -> str:
"""Manage quality control, defect tracking, and supplier quality
standards."""
print(f"[TOOL] manage_quality(supplier={supplier}, kwargs=
{kwargs})")
log_to_loki("tool.manage_quality", f"supplier={supplier}")
return "quality_management_initiated"
@tool
def scale_operations(scaling_type: str = None, **kwargs) -> str:

-- 260 of 559 --

"""Scale operations for peak seasons, capacity planning, and
workforce management."""
print(f"[TOOL] scale_operations(scaling_type={scaling_type},
kwargs={kwargs})")
log_to_loki("tool.scale_operations", f"scaling_type=
{scaling_type}")
return "operations_scaled"
@tool
def optimize_costs(cost_type: str = None, **kwargs) -> str:
"""Analyze and optimize transportation, storage, and operational
costs."""
print(f"[TOOL] optimize_costs(cost_type={cost_type}, kwargs=
{kwargs})")
log_to_loki("tool.optimize_costs", f"cost_type={cost_type}")
return "cost_optimization_initiated"
INVENTORY_TOOLS = [manage_inventory, optimize_warehouse,
forecast_demand,
manage_quality, scale_operations, optimize_costs,
send_logistics_response]
# Transportation & Logistics Specialist Tools
@tool
def track_shipments(origin: str = None, **kwargs) -> str:
"""Track shipment status, delays, and coordinate delivery
logistics."""
print(f"[TOOL] track_shipments(origin={origin}, kwargs=
{kwargs})")
log_to_loki("tool.track_shipments", f"origin={origin}")
return "shipment_tracking_updated"
@tool
def arrange_shipping(shipping_type: str = None, **kwargs) -> str:
"""Arrange shipping methods, expedited delivery,
and multi-modal transportation."""
print(f"[TOOL] arrange_shipping(shipping_type={shipping_type},
kwargs={kwargs})")
log_to_loki("tool.arrange_shipping", f"shipping_type=
{shipping_type}")
return "shipping_arranged"
@tool
def coordinate_operations(operation_type: str = None, **kwargs) ->
str:
"""Coordinate complex operations like cross-docking,
consolidation,
and transfers."""

-- 261 of 559 --

print(f"[TOOL] coordinate_operations(operation_type=
{operation_type},
kwargs={kwargs})")
log_to_loki("tool.coordinate_operations", f"operation_type=
{operation_type}")
return "operations_coordinated"
@tool
def manage_special_handling(product_type: str = None, **kwargs) ->
str:
"""Handle special requirements for hazmat, cold chain,
and sensitive products."""
print(f"[TOOL] manage_special_handling(product_type=
{product_type},
kwargs={kwargs})")
log_to_loki("tool.manage_special_handling", f"product_type=
{product_type}")
return "special_handling_managed"
@tool
def process_returns(returned_quantity: str = None, **kwargs) ->
str:
"""Process returns, reverse logistics, and product
disposition."""
print(f"[TOOL] process_returns(returned_quantity=
{returned_quantity},
kwargs={kwargs})")
log_to_loki("tool.process_returns", f"returned_quantity=
{returned_quantity}")
return "returns_processed"
@tool
def optimize_delivery(delivery_type: str = None, **kwargs) -> str:
"""Optimize delivery routes, last-mile logistics,
and sustainability initiatives."""
print(f"[TOOL] optimize_delivery(delivery_type={delivery_type},
kwargs={kwargs})")
log_to_loki("tool.optimize_delivery", f"delivery_type=
{delivery_type}")
return "delivery_optimization_complete"
@tool
def manage_disruption(disruption_type: str = None, **kwargs) ->
str:
"""Manage supply chain disruptions, contingency planning,
and risk mitigation."""
print(f"[TOOL] manage_disruption(disruption_type=
{disruption_type},

-- 262 of 559 --

kwargs={kwargs})")
log_to_loki("tool.manage_disruption", f"disruption_type=
{disruption_type}")
return "disruption_managed"
TRANSPORTATION_TOOLS = [track_shipments, arrange_shipping,
coordinate_operations,
manage_special_handling, process_returns, optimize_delivery,
manage_disruption, send_logistics_response]
# Supplier & Compliance Specialist Tools
@tool
def evaluate_suppliers(supplier_name: str = None, **kwargs) -> str:
"""Evaluate supplier performance, conduct audits,
and manage supplier relationships."""
print(f"[TOOL] evaluate_suppliers(supplier_name={supplier_name},
kwargs={kwargs})")
log_to_loki("tool.evaluate_suppliers", f"supplier_name=
{supplier_name}")
return "supplier_evaluation_complete"
@tool
def handle_compliance(compliance_type: str = None, **kwargs) ->
str:
"""Manage regulatory compliance, customs, documentation,
and certifications."""
print(f"[TOOL] handle_compliance(compliance_type=
{compliance_type},
kwargs={kwargs})")
log_to_loki("tool.handle_compliance", f"compliance_type=
{compliance_type}")
return "compliance_handled"
SUPPLIER_TOOLS = [evaluate_suppliers, handle_compliance,
send_logistics_response]
Traceloop.init(disable_batch=True,
app_name="supply_chain_logistics_agent")
llm = ChatOpenAI(model="gpt-4o", temperature=0.0,
callbacks=[StreamingStdOutCallbackHandler()], verbose=True)
# Bind tools to specialized LLMs
inventory_llm = llm.bind_tools(INVENTORY_TOOLS)
transportation_llm = llm.bind_tools(TRANSPORTATION_TOOLS)
supplier_llm = llm.bind_tools(SUPPLIER_TOOLS)
With tools grouped, we bind them to separate language model instances for
each specialist. This allows for tailored prompts and reduces context size per

---

## Sección 86: Chapter 8. From One Agent to

-- 263 of 559 --

agent, enhancing focus and efficiency. Multiagent architectures like this enable
parallel processing (e.g., one agent optimizing delivery while another
evaluates suppliers) cutting response times in high-volume logistics. The
shared state ensures seamless handoffs.
The supervisor node acts as a central coordinator, analyzing queries and
routing to specialists—exemplifying streamlined decision making without full
consensus overhead. Specialist nodes then process independently, invoking
tools and responding. This structure mitigates conflicts through clear role
boundaries and enables parallelism if edges are expanded to concurrent calls:
class AgentState(TypedDict):
operation: Optional[dict] # Supply chain operation information
messages: Annotated[Sequence[BaseMessage], operator.add]
# Supervisor (Manager) Node: Routes to the appropriate specialist
def supervisor_node(state: AgentState):
history = state["messages"]
operation = state.get("operation", {})
operation_json = json.dumps(operation, ensure_ascii=False)
supervisor_prompt = (
"You are a supervisor coordinating a team of supply chain
specialists.\n"
"Team members:\n"
"- inventory: Handles inventory levels, forecasting,\n"
"quality, warehouse optimization, scaling, and costs.\n"
"- transportation: Handles shipping tracking,\n"
"arrangements, operations coordination,\n"
specialhandling, returns, delivery optimization, and
disruptions.\n"
"- supplier: Handles supplier evaluation and compliance.\n"
"\n"
"Based on the user query, select ONE team member to handle
it.\n"
"Output ONLY the selected member's name\n"
"(inventory, transportation, or supplier), nothing
else.\n\n"
f"OPERATION: {operation_json}"
)
full = [SystemMessage(content=supervisor_prompt)] + history
response = llm.invoke(full)
return {"messages": [response]}

-- 264 of 559 --

# Specialist Node Template
def specialist_node(state: AgentState, specialist_llm,
system_prompt: str):
history = state["messages"]
operation = state.get("operation", {})
if not operation:
operation = {"operation_id": "UNKNOWN", "type": "general",
"priority": "medium", "status": "active"}
operation_json = json.dumps(operation, ensure_ascii=False)
full_prompt = system_prompt + f"\n\nOPERATION: {operation_json}"
full = [SystemMessage(content=full_prompt)] + history
first: ToolMessage | BaseMessage = specialist_llm.invoke(full)
messages = [first]
if getattr(first, "tool_calls", None):
for tc in first.tool_calls:
print(first)
print(tc['name'])
# Find the tool (assuming tools are unique by name
across all)
all_tools = INVENTORY_TOOLS + TRANSPORTATION_TOOLS +
SUPPLIER_TOOLS
fn = next(t for t in all_tools if t.name == tc['name'])
out = fn.invoke(tc["args"])
messages.append(ToolMessage(content=str(out),
tool_call_id=tc["id"]))
second = specialist_llm.invoke(full + messages)
messages.append(second)
return {"messages": messages}
# Inventory Specialist Node
def inventory_node(state: AgentState):
inventory_prompt = (
"You are an inventory and warehouse management
specialist.\n"
"When managing:\n"
" 1) Analyze the inventory/warehouse challenge\n"
" 2) Call the appropriate tool\n"
" 3) Follow up with send_logistics_response\n"
"Consider cost, efficiency, and scalability."
)
return specialist_node(state, inventory_llm, inventory_prompt)
# Transportation Specialist Node

-- 265 of 559 --

def transportation_node(state: AgentState):
transportation_prompt = (
"You are a transportation and logistics specialist.\n"
"When managing:\n"
" 1) Analyze the shipping/delivery challenge\n"
" 2) Call the appropriate tool\n"
" 3) Follow up with send_logistics_response\n"
"Consider efficiency, sustainability, and risk mitigation."
)
return specialist_node(state, transportation_llm,
transportation_prompt)
# Supplier Specialist Node
def supplier_node(state: AgentState):
supplier_prompt = (
"You are a supplier relations and compliance specialist.\n"
"When managing:\n"
" 1) Analyze the supplier/compliance issue\n"
" 2) Call the appropriate tool\n"
" 3) Follow up with send_logistics_response\n"
"Consider performance, regulations, and relationships."
)
return specialist_node(state, supplier_llm, supplier_prompt)
Finally, the graph assembles the system with conditional edges for routing,
enabling adaptability as the supervisor dynamically selects based on query
content. In execution, this enables efficient handling of diverse tasks without
a single point of overload. While coordination adds some latency, the benefits
in scalability and reliability far outweigh it for complex environments:
# Routing function for conditional edges
def route_to_specialist(state: AgentState):
last_message = state["messages"][-1]
agent_name = last_message.content.strip().lower()
if agent_name == "inventory":
return "inventory"
elif agent_name == "transportation":
return "transportation"
elif agent_name == "supplier":
return "supplier"
else:
# Fallback if no match
return END
def construct_graph():

-- 266 of 559 --

g = StateGraph(AgentState)
g.add_node("supervisor", supervisor_node)
g.add_node("inventory", inventory_node)
g.add_node("transportation", transportation_node)
g.add_node("supplier", supplier_node)
g.set_entry_point("supervisor")
g.add_conditional_edges("supervisor", route_to_specialist,
{"inventory": "inventory", "transportation":
"transportation", "supplier": "supplier"})
g.add_edge("inventory", END)
g.add_edge("transportation", END)
g.add_edge("supplier", END)
return g.compile()
graph = construct_graph()
if __name__ == "__main__":
example = {"operation_id": "OP-12345", "type":
"inventory_management",
"priority": "high", "location": "Warehouse A"}
convo = [HumanMessage(content='''We're running critically
low on SKU-12345. Current stock is 50 units
but we have 200 units on backorder. What's our reorder
strategy?''')]
result = graph.invoke({"operation": example, "messages": convo})
for m in result["messages"]:
print(f"{m.type}: {m.content}")
This multiagent framework exemplifies the power of adaptability in action. For
instance, if a query involves a sudden supply disruption during peak season,
the supervisor could route it to the transportation specialist for immediate
containment, while the inventory specialist concurrently scales warehouse
operations. This type of dynamic rerouting has become commonplace,
enabling systems to pivot in response to real-time data like weather events or
market shifts, thereby minimizing downtime and optimizing resource
allocation. In our code, the conditional edges facilitate this flexibility, as the
supervisor’s output determines the flow, enabling the system to handle
evolving conditions without rigid predefined paths. This not only boosts
throughput through potential parallelism—such as forking to multiple
specialists if extended—but also enhances resilience, as failures in one agent
(e.g., due to API downtime) don’t halt the entire process.

---

## Sección 87: Chapter 8. From One Agent to

-- 267 of 559 --

Adaptability is another core advantage, as multiagent systems can respond
dynamically to changing conditions. By coordinating their actions, agents can
reallocate roles and responsibilities as needed, adapting to new information or
environmental changes in real time. This adaptability enables the system to
remain efficient and effective in complex and unpredictable scenarios, where
static, single-agent approaches may struggle to keep up.
However, multiagent systems are not without challenges. With multiple agents
interacting, the complexity of coordination increases, requiring sophisticated
communication and synchronization mechanisms to ensure agents work
harmoniously. Communication overhead is another challenge, as agents must
frequently exchange information to stay aligned and avoid duplicating efforts.
This need for communication can slow down the system and introduce
additional resource demands, especially in large-scale applications.
Additionally, conflicts between agents may arise if they pursue overlapping
goals or fail to prioritize effectively, necessitating protocols for conflict
resolution and resource allocation.
In sum, while multiagent systems offer powerful advantages in handling
complex, multifaceted tasks, they also require careful planning to manage the
additional complexity and coordination requirements they introduce. By
assigning agents distinct roles, enabling parallel processing, and incorporating
adaptability and redundancy, multiagent systems can achieve high levels of
performance, reliability, and flexibility, particularly in scenarios where a singleagent approach would fall short.
Swarms
Swarms represent a distinctive approach to agentic system design, inspired by
decentralized systems in nature—such as flocks of birds, schools of fish, or
colonies of ants. In swarm-based systems, large numbers of simple agents
operate with minimal individual intelligence but collectively give rise to
intelligent, emergent behavior through local interactions and simple rules.
Unlike traditional multiagent systems, which often rely on explicit role
assignment and centralized coordination, swarm systems emphasize
decentralization and self-organization. Each agent follows its own set of local
policies or behaviors, typically without a global view of the system. Yet,
through repeated, local interactions—such as broadcasting small updates,
reacting to neighbors, or adapting based on shared signals—the swarm can

-- 268 of 559 --

adapt to changing conditions, solve complex problems, and exhibit robust
group-level behavior. Key advantages of swarm-based systems include:
Scalability
Because swarm agents are loosely coupled and locally driven, the system
can scale to hundreds or thousands of agents with minimal coordination
overhead.
Robustness
There is no single point of failure. If individual agents fail, others can
continue operating without significant degradation in performance.
Flexibility
Swarms can adapt in real time to changing goals or environments, making
them well suited to dynamic or unpredictable scenarios.
Distributed problem-solving
Tasks such as exploration, monitoring, consensus formation, or distributed
search can be tackled effectively through swarm dynamics.
Swarms are particularly effective in environments where centralized control is
impractical or undesirable. For example, they are useful in large-scale data
discovery, researching across multiple sources, or distributed decision making.
In these scenarios, agents can operate semi-independently, contribute small
insights or actions, and let global behavior emerge from the accumulation of
local actions.
However, designing swarm systems comes with unique challenges, especially
around predictability, observability, and efficiency. Despite these limitations,
swarm-based systems offer a powerful and elegant solution for problems that
benefit from decentralization, parallelism, and resilience. While not suitable for
every problem domain, swarms shine in distributed environments and are
increasingly relevant in fields like edge computing, sensor networks, and realtime collaborative systems—especially where flexibility and robustness matter
more than precision or central control.

-- 269 of 559 --

Principles for Adding Agents
When expanding a system by adding more agents, a strategic approach is
essential to ensure the system remains efficient, manageable, and effective.
The following principles serve as guidelines for optimizing agent-based design
and functionality:
Task decomposition
Task decomposition is a foundational principle, emphasizing the
importance of breaking down complex tasks into smaller, manageable
subtasks. By decomposing tasks, each agent can focus on a specific aspect
of the workload, simplifying its responsibilities and improving efficiency.
Clear task boundaries reduce overlap and redundancy, ensuring that each
agent’s contribution is valuable and that no effort is wasted. This
decomposition not only enhances individual agent performance but also
makes the system easier to coordinate and scale.
Specialization
Specialization enables agents to be assigned roles that match their
strengths, thereby maximizing the system’s collective capabilities. When
each agent is tasked with activities that align with its specific functions,
the system operates with greater precision and effectiveness. Specialized
agents are more adept at handling particular types of work, which
translates to improved performance and faster task execution overall. By
designing agents with distinct responsibilities, the system can leverage
diverse expertise to address complex or multidisciplinary tasks.
Parsimony
Parsimony is a guiding principle that encourages adding only the minimal
number of agents necessary to achieve the desired functionality and
performance. This principle emphasizes simplicity and efficiency, reminding
developers that each agent added to the system introduces additional
communication overhead, coordination complexity, and resource demands.
By adhering to parsimony, developers avoid unnecessary agent
proliferation, which can lead to increased maintenance burdens and
potential performance bottlenecks. Parsimony requires careful assessment
of each agent’s role and a disciplined approach to agent allocation,
ensuring that each addition provides clear value to the system. Before
adding an agent, developers should consider whether its responsibilities

---

## Sección 88: Chapter 8. From One Agent to

-- 270 of 559 --

could be fulfilled by existing agents or by enhancing current capabilities.
This focus on simplicity results in a streamlined, more manageable system
that performs effectively without excessive redundancy. Ultimately,
parsimony promot

---
> *[Truncated at 420 KB for optimal local RAG indexing speed]*
