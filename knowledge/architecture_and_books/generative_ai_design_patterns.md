# 📚 Libro Completo: Generative AI Design Patterns


**Alcance:** Libro completo Generative AI Design Patterns (O'Reilly): patrones de diseño para RAG, agentes, guardrails, caché semántico y control de alucinaciones. (Fuente migrada y curada desde Centinela Studio Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

> **Autor:** O'Reilly Media  
> **Archivo Fuente:** `Generative-AI-Design-Patterns-OReilly.pdf`  
> **Páginas Originales:** 840  
> **Secciones Extraídas:** 193  
> **Fecha de Ingesta:** 2026-10-06  
> **Tipo:** Texto Completo Estructurado para RAG Jerárquico  

---

## Sección 1: Introducción y Fundamentos

-- 1 of 840 --

Generative AI Design
Patterns
Solutions to Common Challenges When
Building GenAI Agents and Applications
Valliappa Lakshmanan and Hannes
Hapke

-- 2 of 840 --

Generative AI Design Patterns
by Valliappa Lakshmanan and Hannes Hapke
Copyright © 2026 Valliappa Lakshmanan and Hannes
Hapke. All rights reserved.
Printed in the United States of America.
Published by O’Reilly Media, Inc., 141 Stony Circle, Suite
195, Santa Rosa, CA 95401.
O’Reilly books may be purchased for educational, business,
or sales promotional use. Online editions are also available
for most titles (http://oreilly.com). For more information,
contact our corporate/institutional sales department: 800998-9938 or corporate@oreilly.com.
Acquisitions Editor: Nicole Butterfield
Development Editor: Sarah Grey
Production Editor: Christopher Faucher
Copyeditor: Doug McNair
Proofreader: Emily Wydeven
Indexer: Sue Klefstad
Cover Designer: Susan Thompson
Cover Illustrator: Susan Brown
Interior Designer: David Futato
Interior Illustrator: Kate Dullea

-- 3 of 840 --

October 2025: First Edition
Revision History for the First Edition
2025-10-03: First Release
See http://oreilly.com/catalog/errata.csp?
isbn=9798341622661 for release details.
The O’Reilly logo is a registered trademark of O’Reilly
Media, Inc. Generative AI Design Patterns, the cover
image, and related trade dress are trademarks of O’Reilly
Media, Inc.
The views expressed in this work are those of the authors
and do not represent the publisher’s views. While the
publisher and the authors have used good faith efforts to
ensure that the information and instructions contained in
this work are accurate, the publisher and the authors
disclaim all responsibility for errors or omissions, including
without limitation responsibility for damages resulting from
the use of or reliance on this work. Use of the information
and instructions contained in this work is at your own risk.
If any code samples or other technology this work contains
or describes is subject to open source licenses or the
intellectual property rights of others, it is your
responsibility to ensure that your use thereof complies with
such licenses and/or rights.
979-8-341-62266-1
[LSI]

-- 4 of 840 --

Preface
If you’re an AI engineer building generative AI (GenAI)
applications, you’ve likely experienced the frustrating gap
between the ease of creating impressive prototypes and the
complexity of deploying them reliably in production. While
foundational models make it easy to build compelling
demos, production systems demand solutions to
fundamental challenges: hallucinations that compromise
accuracy, inconsistent outputs that break downstream
processes, knowledge gaps that limit enterprise
applicability, and reliability issues that make systems
unsuitable for critical applications.
This book bridges that gap by providing 32 battle-tested
design patterns that address the recurring problems you’ll
encounter when building production-grade GenAI
applications. These patterns aren’t theoretical constructs—
they codify proven solutions that are often derived from
cutting-edge research and refined by practitioners who
have successfully deployed GenAI systems at scale.
Supervised machine learning (ML) involves training a
problem-specific model on a large training dataset of
example inputs and outputs—but GenAI applications rarely
include a training phase. Instead, they commonly use
general-purpose foundational models. This book is focused
on design patterns for AI applications that are built on top
of foundational models, such as Open AI’s GPT, Anthropic’s
Claude, Google’s Gemini, or Meta’s Llama.
In this book, we cover the entire AI engineering workflow.
After an introduction in Chapter 1, Chapter 2 provides
practical patterns for controlling content style and format

-- 5 of 840 --

(including Logits Masking [Pattern 1] and Grammar
[Pattern 2]). Chapter 3 and Chapter 4 cover integrating
external knowledge through sophisticated retrievalaugmented generation (RAG) implementations, from Basic
RAG (Pattern 6) to Deep Search (Pattern 12). Chapter 5 is
about enhancing your model’s reasoning capabilities with
patterns like Chain of Thought (Pattern 13), Tree of
Thoughts (Pattern 14), and Adapter Tuning (Pattern 15).

---

## Sección 2: Chapter 6 emphasizes building reliable systems with LLMas-Judge (Pattern 17), Reflection (Pattern 18), and Prompt

Optimization (Pattern 20) patterns. Chapter 7 is about
creating agentic systems, including Tool Calling (Pattern
21) and Multiagent Collaboration (Pattern 23). Chapter 8
covers optimizing deployment (including Small Language
Model [Pattern 24] and Inference Distribution Testing
[Pattern 27]), and Chapter 9 discusses implementing safety
guardrails, including Self-Check (Pattern 31) and
comprehensive Guardrails (Pattern 32).

-- 6 of 840 --

Who Is This Book For?
This book is for software engineers, data scientists, and
enterprise architects who are building applications
powered by GenAI foundational models. It captures proven
solutions you can employ to solve the common challenges
that arise when building GenAI applications and agents.
Read it to learn how experts in the field are handling
challenges such as hallucinations, nondeterministic
answers, knowledge cutoffs, and the need to customize a
model for your industry or enterprise. The age-old
problems of software engineering have new solutions in
this realm. For example, ways to meet latency and
constrain costs include distillation, speculative decoding,
prompt caching, and template generation.
Understanding the different patterns in this book requires
different levels of background knowledge. For example,
Chain of Thought (Pattern 13) requires no more than a
knowledge of basic programming, Tool Calling (Pattern 21)
requires an understanding of API design, and Dependency
Injection (Pattern 19) requires some experience developing
large-scale software. However, Content Optimization
(Pattern 5) requires familiarity with statistics and ML, and
Small Language Model (Pattern 24) requires an
understanding of hardware optimization. We expect that
75% of the book can be read and understood by a junior
software engineer or a third-year computer science
student. The remainder will require specialized knowledge
or experience.
AI engineering overlaps heavily with software engineering,
data engineering, and ML—but in this book, we’ve limited
our focus to core AI engineering. We encourage you to

-- 7 of 840 --

think of this book as a companion to the literature on
patterns in related areas. Specifically, the book Machine
Learning Design Patterns (O’Reilly), also co-authored by
Valliappa Lakshmanan, covers proven solutions to
recurring issues you’ll encounter when training a bespoke
machine-learning model for a specific problem.
You’ll also likely find yourself working with both bespoke
ML models and general-purpose foundational models,
depending on the use case. In some situations, you might
start with a foundational model but then find that edge
cases require you to customize (or fine-tune) it for your
problem. This book and Machine Learning Design Patterns
are complementary and will help you work with both
models, so we recommend that you read both.
Conventions Used in This Book
The following typographical conventions are used in this
book:
Italic
Indicates new terms, URLs, email addresses, filenames, and
file extensions.
Constant width
Used for program listings, as well as within paragraphs to
refer to program elements such as variable or function
names, databases, data types, environment variables,
statements, and keywords.
Constant width bold
Shows commands or other text that should be typed literally
by the user.

-- 8 of 840 --

Constant width italic
Shows text that should be replaced with user-supplied
values or by values determined by context.
TIP
This element signifies a tip or suggestion.
NOTE
This element signifies a general note.
WARNING
This element indicates a warning or caution.
In the diagrams, the boxes employ a set of color
conventions as depicted in Figure P-1.

-- 9 of 840 --

Figure P-1. Representation scheme used in diagrams in this book
Using Code Examples
Supplemental material (code examples, exercises, etc.) is
available for download at
https://github.com/lakshmanok/generative-ai-designpatterns.
If you have a technical question or a problem using the
code examples, please send email to support@oreilly.com.
This book is here to help you get your job done. In general,
if example code is offered with this book, you may use it in
your programs and documentation. You do not need to
contact us for permission unless you’re reproducing a
significant portion of the code. For example, writing a

-- 10 of 840 --

program that uses several chunks of code from this book
does not require permission. Selling or distributing
examples from O’Reilly books does require permission.
Answering a question by citing this book and quoting
example code does not require permission. Incorporating a
significant amount of example code from this book into
your product’s documentation does require permission.
We appreciate, but generally do not require, attribution. An
attribution usually includes the title, author, publisher, and
ISBN. For example: “Generative AI Design Patterns by
Valliappa Lakshmanan and Hannes Hapke (O’Reilly).
Copyright 2026 Valliappa Lakshmanan and Hannes Hapke,
979-8-341-62266-1.”
If you feel your use of code examples falls outside fair use
or the permission given above, feel free to contact us at
permissions@oreilly.com.
O’Reilly Online Learning
NOTE
For more than 40 years, O’Reilly Media has provided technology and
business training, knowledge, and insight to help companies succeed.
Our unique network of experts and innovators share their
knowledge and expertise through books, articles, and our
online learning platform. O’Reilly’s online learning platform
gives you on-demand access to live training courses, indepth learning paths, interactive coding environments, and
a vast collection of text and video from O’Reilly and 200+
other publishers. For more information, visit
https://oreilly.com.

---

## Sección 3: Chapter 6 emphasizes building reliable systems with LLMas-Judge (Pattern 17), Reflection (Pattern 18), and Prompt

-- 11 of 840 --

How to Contact Us
Please address comments and questions concerning this
book to the publisher:
O’Reilly Media, Inc.
141 Stony Circle, Suite 195
Santa Rosa, CA 95401
800-889-8969 (in the United States or Canada)
707-827-7019 (international or local)
707-829-0104 (fax)
support@oreilly.com
https://oreilly.com/about/contact.html
We have a web page for this book, where we list errata and
any additional information. You can access this page at
https://oreil.ly/genAI-design-patterns.
For news and information about our books and courses,
visit https://oreilly.com.
Find us on LinkedIn: https://linkedin.com/company/oreillymedia.
Watch us on YouTube: https://youtube.com/oreillymedia.

-- 12 of 840 --

Acknowledgments
Lak is thankful to his family for their forbearance as he
(once again) vanished deep into writing and to
collaborators and colleagues who gave him the opportunity
to work far and wide with exciting new technology in
practical ways. He’s also deeply appreciative of Hannes for
the partnership while writing this book.
Hannes would like to thank Lak for his insightful
mentorship and guidance throughout the writing process.
Lak’s ability to explain complex topics in simple terms is
truly exceptional, and Hannes is deeply grateful for being
taken on this writing journey, from which he has learned
immensely. This book would not have been possible without
the unwavering support, endless patience, and love that
Whitney, Hannes’s partner, brought to every day of this
process. Hannes is profoundly grateful for Whitney’s
amazing support, and he also extends his heartfelt
appreciation to his family, especially his parents, who
encouraged him to pursue his dreams around the world.
We are both thankful to the O’Reilly team (Nicole
Butterfield, Corbin Collins, Catherine Dullea, Christopher
Faucher, Sarah Grey, and Doug McNair [in alphabetical
order]) for their unique blend of professionalism and
flexibility. We were fortunate to have technical reviewers
(David Cardozo, Mark Edmondson, Jason Fournier, Andrew
Stein, and Glen Yu) who provided helpful, actionable, and
speedy feedback on almost the entire book. In addition,
Madhumita Baskaran, Ying-Jung Chen, Martin Gorner,
Skander Hannachi, Ryan Hoium, and Danny Leybzon
helped review specific chapters.

-- 13 of 840 --

---

## Sección 4: Chapter 1. Introduction

GenAI is so powerful and easy to use that even
nontechnical users can easily prototype very compelling
applications on top of GenAI. However, taking such GenAI
prototypes to production is hard because GenAI models are
unreliable—they can hallucinate, return different answers
to the same input, and can have surprising limitations
because of how they are trained. The design patterns in
this book capture best practices and solutions to these and
other recurring problems you’re likely to encounter when
building production applications on top of GenAI models.
GenAI Design Patterns
Design patterns, in software engineering, are proven
solutions to common problems that occur during software
design and development. They represent standardized best
practices that have evolved over time through the collective
experience of software developers. Design patterns are
important because they establish a common vocabulary
developers can use to communicate efficiently and because
they help improve software quality, maintainability, and
scalability.
The concept of design patterns was heavily influenced by
the work of architect Christopher Alexander, who
introduced patterns in architecture in his book A Pattern
Language (Oxford University Press, 1977). Design patterns
gained significant prominence in software engineering with
the publication of the book Design Patterns: Elements of
Reusable Object-Oriented Software by Erich Gamma,

-- 14 of 840 --

Richard Helm, Ralph Johnson, and John Vlissides (AddisonWesley), which is often called “the Gang of Four book.”
Since then, design patterns have been cataloged for other
software engineering domains, such as for Java Enterprise
applications and ML.
When building AI products today, developers increasingly
turn to foundational GenAI models (such as GPT-4, Gemini,
Claude, Llama, DeepSeek, Qwen, and Mistral) that are
trained on large, application-agnostic datasets, rather than
building custom ML models that need to be trained from
scratch on application-specific data. In this book, we’ll
follow Chip Huyen’s AI Engineering (O’Reilly) in referring
to this approach of building on top of foundational models
as AI engineering and to practitioners of this approach as
AI engineers.
AI engineering has a wide range of applications—including
natural-language processing (NLP), text generation, code
explanation, image understanding, and video synthesis—to
power use cases such as content generation, AI assistants,
workflow automation, and robotics.
As an AI engineer, you can ask a foundational model to
directly generate the content your application needs by
sending the model an appropriate text input, which is
known as a prompt. However, you will face certain common
problems—the generated content may not match the style
you want, may be missing enterprise knowledge that the
model doesn’t know about, or may lack certain capabilities.
In this book, we catalog a variety of proven solutions to
such problems that arise in the context of building
applications on top of GenAI foundational models.
In this book, you will also find detailed explanations of 32
patterns that codify research advances and the experience

-- 15 of 840 --

of experts into advice that you can readily incorporate into
your projects. Each chapter offers a set of patterns as
potential solutions to a particular problem that commonly
arises in AI engineering. For example, Chapter 3 is about
solving the problem that foundational models can’t
generate content that is informed by confidential enterprise
data, because they are trained by model providers who
don’t have access to that data. The patterns presented in
that chapter all address this problem. Each section that
presents a pattern includes a description of the problem, a
proven solution, an end-to-end working example of the
pattern, and a discussion of alternatives and other
considerations for implementing it.
AI engineers often encounter tasks that are too complex for
a foundational model to perform all at once, so a common
tactic is to break the complex task into smaller components
that can be accomplished by foundational models. Such
small software components that provide capabilities with
the help of foundational models are called agents. Agents
become increasingly autonomous as they use GenAI models
to plan out a sequence of operations, identify the backend
tools that they can invoke for each operation, determine
how to recover from errors, and/or evaluate whether the
task is complete. Applications that are built by
orchestrating agents are called agentic. By showing you
how to handle the inevitable challenges that arise when
building applications on foundational models, the patterns
in this book will help you build better agents and agentic
applications.

-- 16 of 840 --

Building on Foundational Models
In this section, we’ll quickly cover the basics of AI
engineering so that we don’t have to repeat this
introductory material in the sections on the patterns that
follow in later chapters. For deeper coverage of building
GenAI applications, we refer you to books such as Omar
Sanseviero et al.’s Hands-On Generative AI with
Transformers and Diffusion Models (O’Reilly), which covers
the underlying technology; Chris Fregly et al.’s Generative
AI on AWS (O’Reilly), which covers hyperscaler offerings;
and Leonid Kuligin et al.’s Generative AI on Google Cloud
with LangChain (Packt), which covers an open source
GenAI framework.

---

## Sección 5: Chapter 1. Introduction

-- 17 of 840 --

A NOTE ON MODELS AND FRAMEWORKS
In Machine Learning Design Patterns, we used just two
frameworks (scikit-learn and TensorFlow) and a single
hyperscaler (Google Cloud Platform [GCP]) for
consistency, but many readers felt that the resulting
examples were too TensorFlow- and GCP-heavy.
Therefore, in this book, we endeavor to be agnostic to
model, framework, and hyperscaler.
Our code examples employ a wide range of technologies
from a number of different vendors: large language
models (LLMs) from OpenAI, Anthropic, Google,
Alibaba, and Meta; and GenAI frameworks like
LangChain, Pydantic AI, Hugging Face, and DSPy. Our
examples are also agnostic to hyperscalers such as
Amazon Web Services (AWS), Azure, GCP, and Oracle
Cloud Infrastructure. Since you’re likely to be using a
different model in a different framework to address a
different scenario, the code examples are meant only to
serve as starting points for your implementation—we
fully intend that you will have to adapt the code
examples to your preferred LLM, framework, and
hyperscaler.
Prompt and Context
When you build AI applications, you typically invoke hosted
foundational models through an API. This might be the API
provided by the vendor of the foundational model, or it
might be a framework that allows you to easily switch
between providers.
You invoke a foundational model by sending it a prompt
and getting back a response. You are, doubtless, familiar

-- 18 of 840 --

with doing this by using the web user interface of a
foundational model. For example, on ChatGPT, you might
type a prompt like this one into the text box:
Create a pencil sketch in the style of Degas depicting a
family of four playing a board game
The simplest prompt typically consists of an instruction to
the model that asks it to perform some content-generation
task. In this case, the model follows the instruction and
sends back a response that contains an image of the type
requested (see Figure 1-1).1 Both prompts and responses
can be multimodal—they could be text, but they could also
be images, video, or audio.

-- 19 of 840 --

Figure 1-1. Sending a prompt to a foundational model to get back a response

-- 20 of 840 --

A more complex prompt might consist not just of an
instruction but also context. This might be information that
the model should use in the generation, or it might involve
asking the model to take on a specific role. For example,
we could tell Claude (on Claude.ai) to take on a personality
and use some information when generating content:
You are an expert marketer who is very familiar with the
book market in university towns in Germany.
Covenant of Water is a novel that tells the story of three
generations of an Orthodox Saint Thomas Christian
family in Kerala.
Write a one-paragraph blurb introducing the book to
readers at a bookstore in Göttingen, drawing local
connections.
The response from Claude Sonnet takes into account the
role, context, and instruction:

-- 21 of 840 --

Covenant of Water - A Literary Journey to Kerala
Nestled between the historic walls of Göttingen, where
academic tradition meets literary curiosity, we present
Abraham Verghese’s masterful epic, “The Covenant of
Water.” This sweeping saga follows three generations of
an Orthodox Saint Thomas Christian family in Kerala,
India—a region whose complex religious heritage might
resonate with students of our university’s renowned
theological studies program. As the story unfolds across
decades amid Kerala’s lush backwaters, readers familiar
with Göttingen’s own relationship with water—from the
sacred Gänseliesel fountain to the meandering Leine
River—will find surprising parallels in how geography
shapes destiny. Verghese weaves a tale of family secrets,
medical mysteries, and generational bonds that
transcends cultural boundaries, offering our community
of international scholars and lifelong learners a profound
exploration of how water—whether in Kerala’s monsoons
or Lower Saxony’s gentle rains—becomes both metaphor
and covenant, connecting us across time and space.
Using the Model Provider’s API
APIs that are designed to invoke foundational models are
available in a wide variety of languages—Python, Go, Java,
and TypeScript are all commonly employed. For simplicity,
we focus on Python APIs in this book.
To invoke Claude Sonnet 3 through the Anthropic API in
Python, you could use the Anthropic Python package as
follows (the full code is on GitHub):
import anthropic
client = anthropic.Anthropic(
# defaults to os.environ.get("ANTHROPIC_API_KEY")
api_key="YOUR_ANTHROPIC_API_KEY",
)

-- 22 of 840 --

completion = client.messages.create(
model="claude-3-7-sonnet-latest",
system="You are an expert Python programmer.",
messages=[
{
"role": "user",
"content": [
{
"type": "text",
"text": """
Write code to find the median value of a list of integers.
"""
}
]
}
]
)
print(completion.content[0].text)
In this API call, the prompt has been broken into two parts
—a system prompt and a user prompt. The system prompt
is set by the developer and guides the model’s overall
behavior, while the user prompt is more dynamic and
provides specific instructions for a specific task you want
the model to perform. Here, the AI assistant’s role has been
set in the system prompt while the user prompt and context
are sent as messages.
Using an LLM-Agnostic Framework
To perform the same task using the PydanticAI framework,
you’d use code such as the following (assuming the needed
API key is set in an environment variable):
from pydantic_ai import Agent
agent = Agent('anthropic:claude-3-7-sonnet-latest',
system_prompt="You are an expert Python
programmer.")
result = agent.run_sync(

---

## Sección 6: Chapter 1. Introduction

-- 23 of 840 --

"Write code to find the median value of a list of
integers.")
print(result.data)
The advantage here is that you can easily switch between
foundational model providers by switching the model string
to openai:gpt-4o-mini, google-vertex:gemini-2.0flash, groq:llama3-70b-8192, and so on (see Pydantic’s
documentation for the full list of models supported).
The class in the Pydantic API that invokes the Claude model
is called Agent. We’ll discuss what agents are in the next
section, but before that, let’s conclude our discussion of
ways to invoke foundational models.
Running Your Model Locally
To run a model such as Llama 3 on your local hardware,
you could use the Ollama client to download and run the
model that you want to use:
ollama run llama3.2
Ollama exposes open-weights models with the OpenAI API,
so you could use this:
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider
model = OpenAIModel(
model_name='llama3.2',
provider=OpenAIProvider(base_url='http://localhost:11434/v1')
)
How Foundational Models Are Created
Unlike traditional machine learning applications, your AI
applications will rarely include a training phase. Instead,

-- 24 of 840 --

you’ll build them on top of general-purpose foundational
models that have been pretrained to perform a wide variety
of tasks. You can, for the most part, ignore the internal
details of the foundational model—and we’re including this
section in this book only so you can understand the
associated vocabulary.
At the time of writing in spring 2025, DeepSeek is the
foundational model with the most available information on
its training regimen. We’ll use that information to discuss
the key steps (see Figure 1-2) involved in creating a
foundational model. While OpenAI, Google, Anthropic, and
Meta may not have followed this exact process in creating
GPT, Gemini, Claude, and Llama, their methods are
probably broadly similar.
The DeepSeek base LLM was pretrained (in Step 1 of
Figure 1-2) on a diverse, high-quality corpus of 14.8 trillion
tokens. (The works of Shakespeare, as a point of
comparison, amount to about 1.2 million tokens—so the
DeepSeek training dataset is equivalent to 12 million
Shakespeares!) Unlike early LLMs, which were trained on
words, modern LLMs are trained on tokens, which are
short sequences of characters. This allows such LLMs to
learn things that are not in the vocabulary of the language,
like proper names. It isn’t just size that helps—the
DeepSeek team attributes the high quality of their models
to careful data curation, including rigorous deduplication
processes.

-- 25 of 840 --

Figure 1-2. Stages involved in training the DeepSeek-R1 model

-- 26 of 840 --

The pretraining stage (Step 1 in Figure 1-2) involves
training on this massive dataset of tokens to develop the
model’s general language-understanding capabilities. The
key goal at this stage is to train the model to predict the
next token, given a context consisting of the previous
tokens in the training input. This is why you’ll often hear
people call LLMs next-token predictors—but next-token
prediction is only the first stage of the training regimen.
Following pretraining, the model undergoes supervised
fine-tuning (SFT, Step 2 in Figure 1-2) to improve its ability
to follow instructions and generate high-quality responses.
This stage uses carefully curated datasets of human-written
examples. Cohere, for example, has said it uses licensed
physicians, financial analysts, and accountants to improve
its models. Presumably, these practitioners write ideal
answers given a prompt. The result, DeepSeek-V3, is a
mixture of experts (MoE) model: an optimization that
allows models to have a large number of parameters while
activating only a fraction of them for each token.
DeepSeek-V3 has 671 billion parameters in total, but only
37B are activated per token. This allows the model to use
different pathways for different types of instructions.
The reinforcement learning stage (Step 3 in Figure 1-2) is
where the models are further refined based on human
preferences. This step involves reinforcement learning with
human feedback (RLHF), which means showing human
raters a pair of generated outputs and asking them which
one they prefer. Such preference tuning helps align the
models’ outputs with human expectations and values. This
stage is also sometimes called preference optimization.
Once DeepSeek-V3 was created with a small number of
human-written examples and human preferences, the full

-- 27 of 840 --

DeepSeek-R1 model was developed through the following
multistage process:
1. The cold start involved fine-tuning a base model
(DeepSeek-V3-Base) with thousands of cold-start
data points to lay a foundation.
2. Pure reinforcement learning (RL) involved applying
a pure reinforcement learning approach to enhance
reasoning skills.
3. Rejection sampling involved choosing the best
examples from a distribution of data created during
the last successful RL run.
4. SFT involved merging the synthetic data with
supervised data from DeepSeek-V3-Base in domains
like writing, factual question answering (QA), and
self-cognition.
5. Final RL was a final reinforcement learning process
across diverse prompts and scenarios.
Step 2 (pure RL) was a major breakthrough because the
team directly applied reinforcement learning to the base
model (DeepSeek-V3-Base) without relying on supervised
fine-tuning as a preliminary step. This approach allowed
the model to explore chain-of-thought (CoT) reasoning for
solving complex problems, which resulted in the
development of DeepSeek-R1-Zero. It turned out that
reasoning capabilities in LLMs can be incentivized purely
through RL, without the need for SFT, as researchers had
long believed. Since human-written examples are
expensive, the ability to use pure RL allows for longer
training on a much more diverse set of problems than if
SFT is required.

---

## Sección 7: Chapter 1. Introduction

-- 28 of 840 --

To make DeepSeek-R1’s capabilities more accessible, the
team created distilled versions of the model that can run on
more modest hardware while retaining much of the
original’s reasoning capability. These include models based
on Qwen and Llama architectures in various sizes (1.5B,
7B, 8B, 14B, etc.).
The Landscape of Foundational Models
The GenAI foundational model ecosystem has evolved
significantly, with distinct categories emerging to serve
different needs.
Because academic benchmarks are saturated and can be
gamed, the currently most accepted way to rate GenAI
models is to compare them pair-wise in blind tests.
LMArena carries out a large-scale comparison, and
Figure 1-3 shows the April 2025 leaderboard.
Figure 1-3. The LMArena leaderboard on April 6, 2025 (annotated boxes added
by the authors)

-- 29 of 840 --

The leaderboard shows model rating on the y-axis and cost
on the x-axis. You can use this to determine the best model
that fits your budget and the lowest price you should
expect to pay for a given rating. Note that the Elo rating on
the y-axis is a logarithmic relationship,2 and so is the cost
on the x-axis.
The highest-rated models overall (see the y-axis) on the day
we screenshotted the leaderboard were Gemini 2.5 Pro
Preview, GPT-4.5 (Preview), GPT-4o, and DeepSeek-R1,
with Gemini 2.0 Flash and OpenAI o1 also nearly as high.
The ranking changes daily as new models are released and
more ratings are collected, but the leaderboard has been
remarkably consistent over time, with the flagship models
from Google, OpenAI, and Anthropic almost always on top.
Together, these are referred to as frontier models.
Frontier models such as GPT 5 and Gemini 2.5 Pro
represent the state of the art in language model
capabilities, and they offer the highest performance across
reasoning, knowledge, and multimodal tasks. However,
they are resource intensive and costly and can’t be run
locally due to their size and proprietary nature. You’d use
them in enterprise-grade applications requiring
sophisticated reasoning and where speed is not a concern.
Recent developments in frontier models include multimodal
capabilities, enhanced reasoning, and extended-content
windows (with up to two million tokens in some models).
Distilled versions of frontier models balance performance
with efficiency, offering reasonable capabilities at lower
costs and with faster response times. Leading examples
include Gemini Flash, Claude Sonnet, and GPT-4o-mini.
These models tend to offer good performance on common
tasks like content generation and summarization. They also
offer fast response times, and they’re cost-effective for

-- 30 of 840 --

high-volume applications. The cost difference between
running Gemini Pro and Gemini Flash becomes quite
apparent once you note that the x-axis in Figure 1-3 is
logarithmic—Flash is 20 times less expensive.
Open-weight models have their parameters publicly
available, allowing for transparency, community
improvement, and customization. Examples include Llama,
Mistral, DeepSeek, Qwen, and Falcon. These models offer
strong performance but generally lag behind frontier
models, and they can be fine-tuned on proprietary data but
require more expertise to host. However, there are hosted
API services such as Together.ai, as well as fully managed
API endpoints on the hyperscalers, that address this issue.
Locally hostable models are designed to run on consumer
or enterprise hardware without requiring cloud
connectivity. Examples include Llama 8B and Gemma 2B,
hardware-optimized versions of which are available
through NVIDIA NIM. This allows for complete privacy,
with no data leaving your local devices and no ongoing API
costs. However, these models have significantly reduced
capabilities compared to cloud models. The demand for
frontier models in “air-gapped” systems that are
disconnected from the internet has led some proprietary
model vendors to offer this service as well—for example,
Gemini can be run on-premises in Google Distributed Cloud
and OpenAI can be run on Azure’s on-premises offerings.
Agentic AI
The class in the Pydantic API that invoked the Claude
model was called Agent:

-- 31 of 840 --

from pydantic_ai import Agent
agent = Agent('anthropic:claude-3-7-sonnet-latest',
...
What is an agent? In computer science, the term agent has
long been used to describe software entities that act on
behalf of users or other programs. When you invoke a
foundational model, you specify a role, provide some
context, and ask it to carry out some instruction. In the
computer science sense, then, the LLM is acting as your
agent.
For example, here’s an example of creating an agent to
manage inventory levels in a store (the full code is on
GitHub):
agent = Agent(
f"anthropic:{MODEL_ID}",
system_prompt="You are an inventory manager who orders just in
time.",
...
)
Autonomy
In AI, an agent is also expected to be somewhat
autonomous. Here, the LLM functions as the agent’s brain,
so you don’t need to tell it how exactly to manage inventory
levels beyond the goal (which is to order “just in time”).
Suppose you have a list of items in your inventory, plus
data on how well they’ve been selling and how long they’ll
take to deliver:
@dataclass
class InventoryItem:
name: str
quantity_on_hand: int
weekly_quantity_sold_past_n_weeks: [int]
weeks_to_deliver: int

---

## Sección 8: Chapter 1. Introduction

-- 32 of 840 --

items = [
InventoryItem("itemA", 300, [50, 70, 80, 100], 2),
InventoryItem("itemB", 100, [70, 80, 90, 70], 2),
InventoryItem("itemC", 200, [80, 70, 90, 80], 1)
]
Provide the list of items to the agent and it will figure out
which ones to reorder:
result = agent.run_sync(f"""
Identify which of these items need to be reordered this week.
**Items**
{items}
""")
The result will include this, in part:
itemB
quantity_to_order=300 reason_to_reorder='Current
stock (100) is insufficient to cover projected demand over
delivery time. Based on recent weekly sales (70-90 units),
we need to order enough to cover the 2-week delivery
period plus maintain safety stock.’
Compare this to traditional programming, where you’d
have to write code to explicitly manage inventory. Such
autonomy—which means the ability to operate
independently without constant human guidance or being
explicitly programmed to do so—is the key differentiator
between traditional software and AI agents.
Characteristics of Agents
Besides autonomy, agents are usually expected to have the
following characteristics:
Goal orientation

-- 33 of 840 --

Agents work toward specific objectives, rather than simply
responding to input prompts. The goal of the inventory
manager agent, which is to manage inventory just in time,
was set in its system prompt.
Planning and reasoning
Notice that the inventory manager agent was able to plan
the steps to determine how many items to reorder. It
identified the range of recent weekly sales, projected the
maximum sale forward by the delivery window, determined
how many items would be required, and then calculated the
number of items to reorder. None of this needed to be
explicitly programmed.
Perception and action
Agents can gather the data they need (“perceive”) and act on
their environment. You can usually give them this ability by
enabling them to call external functions (such as searching
the web, invoking calculators, and writing to databases)
through Tool Calling (Pattern 21), which we’ll discuss in

---

## Sección 9: Chapter 7. With Tool Calling, you can go beyond explicitly

providing the list of items to the inventory manager. Instead,
the agent can retrieve the quantity on hand and weekly sales
from backend databases. Also, instead of just telling you that
item B needs to be reordered, it can invoke an API, perhaps
even an API on the vendor’s site, to place the order.
Adaptability and learning
How do you know that ordering 300 items is correct? A
human inventory manager would plug in assumptions of
weekly sales for the next two weeks and validate that the
store will not run out—and an agent can do the same thing.
In Chapters 6 and 9 (respectively), you’ll see patterns such as

-- 34 of 840 --

Reflection (Pattern 18) and Self-Check (Pattern 31) that allow
an agent to evaluate its output and self-correct.
At the time of writing, agentic behavior remains an
aspirational goal for applications built on foundational
models—nondeterminism, hallucinations, and various other
failure modes pose challenges to building fully autonomous
AI applications. Take nondeterminism, for example—each
time, you might get a different list and quantity of items to
reorder. (Try it!) Planning works in simple cases, but not in
hard ones. In Chapter 5, you’ll see patterns such as Chain
of Thought (Pattern 13) that improve the ability of an agent
to do planning and reasoning. Many of the design patterns
in this book are ways to make your AI applications more
agentic, or at least to push the boundaries of what you can
build.
Fine-Grained Control
Foundational models give you fine-grained control over the
generation process by allowing you to control sampling and
beam search (both of which are discussed later in this
chapter). The generation settings of LLMs provide powerful
tools for controlling the balance between deterministic,
high-quality outputs and creative, diverse responses.
Understanding settings’ mathematical underpinnings, from
logits to sampling strategies, can help you control model
behavior in simpler ways than with the design patterns
covered in later chapters of this book.
Logits
Language models have hundreds of layers, but the very last
layer predicts the next word to continue the text

-- 35 of 840 --

generation. They don’t predict just one token, but instead,
they provide a set of candidate tokens and the probability
that each of those tokens will be the next one.
Logits are the raw, unnormalized outputs from a language
model’s final layer before they’re converted into
probabilities. Logits represent the model’s assessment of
how likely each token in its vocabulary is to be the next
token in a sequence. Suppose, for illustration purposes,
that there are five possible continuations to a sequence
being generated and that the logits of each of the possible
continuations are as shown on the left-hand side of
Figure 1-4.
Figure 1-4. The softmax of the logits gives you the probability of various
continuations
If the model were to use greedy sampling, where only the
most likely word is chosen, it would simply select the since
that word has the highest logits. However, such a strategy
leads to highly repetitive and uninteresting text, so models
use a sampling strategy in which all the possible
continuation words have some nonzero probability of being
selected. The transformation from logits to probabilities
occurs through the softmax function:

-- 36 of 840 --

P (tokeni) = elogiti/Σjelogitj
Here, P(token_i) is the probability of selecting token_i.
The softmax function accentuates the peaks and dampens
the tails—for example, compare the length of the bars for
the and a before and after the softmax function is applied
in Figure 1-4.
If the distribution of potential continuations is less peaked,
as shown in Figure 1-5, then the impact of the softmax is
less pronounced.
Figure 1-5. The impact of the softmax of the logits is less pronounced if the
distribution is not peaked
We’ll explore the use of logits to control style in Chapter 2.
Temperature
Temperature (T) is a hyperparameter that controls the
randomness of token selection by scaling the logits before
they’re passed through the softmax function. The modified
softmax equation with temperature is as follows:

-- 37 of 840 --

P (tokeni) = elogiti/T /Σjelogitj/T
The effect of scaling the same graphs with different values
of T is shown in Figure 1-6.
As you can see, setting the temperature to zero turns on
greedy sampling. As the temperature increases, the
likelihood that less likely “tail” words will be chosen also
increases. The effect of temperature is less pronounced
when the distribution was less peaked to begin with.
Figure 1-6. Effects of scaling the logits by temperature
Here’s how to vary the temperature when using
PydanticAI:
agent = Agent('anthropic:claude-3-7-sonnet-latest',
model_settings={
"temperature": 0.5
},
system_prompt="Complete the sentence.")
Here’s how to do it when using the Anthropic API directly:

-- 38 of 840 --

completion = client.messages.create(
model="claude-3-7-sonnet-latest",
system="Complete the sentence.",
temperature=0.5,
messages=[
...
]
)
Here’s an example, showing various continuations of the
phrase The trade war caused produced at three different
temperature settings:

---

## Sección 10: Chapter 7. With Tool Calling, you can go beyond explicitly

-- 39 of 840 --

0.0 : The trade war caused significant disruptions to
global supply chains, leading to increased prices for
consumers and economic uncertainty for businesses
across multiple industries.
0.5 : The trade war caused significant disruptions to
global supply chains, leading to increased prices for
consumers and economic uncertainty for businesses
across multiple industries. Many manufacturers were
forced to reconsider their production strategies, while
farmers faced reduced export opportunities as retaliatory
tariffs limited access to international markets. The longterm effects included accelerated efforts to diversify
supply chains away from affected regions and renewed
debates about the effectiveness of protectionist trade
policies.
0.8 : The trade war caused significant disruptions to
global supply chains, forcing many companies to
reconsider their manufacturing strategies and sourcing
policies. It led to increased tariffs on imported goods,
higher prices for consumers, and economic uncertainty in
affected industries. Several businesses reported
decreased profits as they absorbed additional costs or
lost market share in foreign markets. The prolonged
tension also contributed to volatility in financial markets
and complicated diplomatic relations between the
involved nations.
As you can see, increasing the temperature tends to lead to
more creative output.
In Chapter 3 and Chapter 6, you will see situations, like
RAG and LLM-as-Judge, where it may be necessary to use
low or even zero temperatures.

-- 40 of 840 --

Top-K Sampling
Top-K sampling restricts token selection to only the k most
likely tokens from the vocabulary, effectively truncating the
long tail of the probability distribution. This can help you
avoid off-the-wall continuations at high temperatures.
Here’s the impact of setting different top-K values to
continue the phrase The spaceship:
1 : The spaceship zoomed through the vast expanse of
space, its powerful engines glowing blue against the
darkness as it carried its crew toward distant stars and
unknown adventures.
10 : The spaceship glided silently through the vast
emptiness of space, its powerful engines propelling it
toward the distant galaxy where no human had ventured
before.
100 : The spaceship soared through the starry expanse,
its gleaming hull reflecting the distant light of alien suns
as it carried its crew toward unexplored worlds beyond
the edge of known space.
As you can see, when the top-K value is low, the generated
text closely follows phrases that you can find in existing
science fiction.
Nucleus Sampling
Nucleus sampling dynamically selects the smallest set of
tokens whose cumulative probability exceeds a threshold p.
Hence, it’s also called top-P sampling. This creates a
“nucleus” of tokens that represent the bulk of the
probability mass. Figure 1-7 shows the impact of applying
varying top-P values to our illustrative distributions.

-- 41 of 840 --

Figure 1-7. Effects of top-P sampling
Nucleus sampling adapts to the model’s confidence at each
step. When the model is very confident, few tokens are
considered (as with low top-K), and when the model is
uncertain, more tokens are considered (as with high top-K).
Therefore, it generally produces more natural text than
fixed top-K sampling does.
Beam Search
Models don’t choose continuation tokens one at a time.
Instead, they employ beam search, which is a deterministic
search algorithm that aims to find the most likely sequence
of tokens by exploring multiple possible continuations in
parallel. In this way, the model can consider the probability
of the entire sequence, not just the next token.
Some models give you knobs to control the beam search.
Repetition penalties reduce the probability of tokens that
have already appeared in the generated text will appear

-- 42 of 840 --

again, thus helping to prevent repetitive loops. These
penalties include the following:
Frequency penalty
This increases the more a word or phrase appears in the
generated text.
Presence penalty
This applies whenever a word or phrase is repeated, and it
thus encourages the model to employ a diverse range of
tokens in the generated text.
Length penalties adjust the scoring of sequences based on
their length. These penalties include the following:
Minimum length penalty
This forces the model to generate at least a certain number
of tokens.
Maximum length penalty
This caps generation at a specified length.
Length normalization penalty
This divides sequence scores by a function of their length to
prevent bias toward shorter sequences.
Beam search width is the number of parallel sequences
considered during generation. You will see beam search
being used in patterns in Chapter 2 and Chapter 6.
At the time of writing, OpenAI and Gemini support
repetition penalties but Anthropic does not. The
Transformers library in Hugging Face supports length

-- 43 of 840 --

penalties and beam search width, but none of the hosted
models do.
In-Context Learning
In “traditional” ML, where models are predominantly
trained for single problems like classifications or
regressions, models require extensive training to adapt
their weights or parameters to a new task. But you can use
LLMs for a wide variety of tasks by changing just the
prompt without changing the weights.
Foundational models’ capability to adapt to new tasks
based solely on examples or instructions they’re given in a
prompt is called in-context learning. It emerges from
training on diverse datasets that include various task
formats and instructions. When given examples of a task
within a prompt, the model identifies the underlying
pattern and applies it to new instances. This process
doesn’t modify the model’s weights, but rather, it leverages
the model’s existing knowledge to perform new tasks.
Zero-Shot Learning
Zero-shot learning involves instructing a model to perform
a task without providing any examples. This technique
relies on the model’s pretrained knowledge and its ability
to understand natural language instructions.
For example, you could ask Gemini-Flash to do the
following:
Analyze the use of light in Claude Monet’s Impression,
Sunrise and explain how it exemplifies impressionist
techniques.

---

## Sección 11: Chapter 7. With Tool Calling, you can go beyond explicitly

-- 44 of 840 --

It would respond with something like this (though your
results may vary, since model outputs are
nondeterministic):
In Impression, Sunrise, Monet employs light to capture a
fleeting moment, prioritizing its transient effects over
precise details. The hazy atmosphere and vibrant
reflections on the water showcase the impressionist focus
on perception and the subjective experience of light,
rather than a realistic depiction of the scene. This
emphasis on capturing the immediate “impression” of
light became a hallmark of the Impressionist movement.
Few-Shot Learning
Few-shot learning extends this approach by including a
small number of examples in the prompt. The examples
serve as demonstrations that help the model understand
the task’s structure and expected output format, and the
model then applies that structure to new instances.
Because the examples are placed in the context of the
prompt, this is also called in-context learning.
Few-shot learning is a simple and effective form of context
engineering, which is exactly what it sounds like—adding
finely crafted data and instructions to the context of the
prompt to achieve the desired performance. You’ll
encounter many patterns in this book, especially in

---

## Sección 12: Chapter 5, that build on few-shot learning.

For example, suppose you want to build an application that
allows the user to describe a painting they see in words and
have the application identify it. You can teach it what goes
into an identification by providing an example question and
answer for Impression, Sunrise by Claude Monet:

-- 45 of 840 --

agent = Agent(MODEL_ID,
system_prompt="""You are an expert on art history.
I will describe
a painting. You should identify it.
""")
result = agent.run_sync("""
Example:
```
Description: shows two small rowboats in the foreground and a red
Sun.
Answer:
Painting: Impression, Sunrise
Artist: Claude Monet
Year: 1872
Significance: Gave the Impressionist movement its name;
captured the fleeting
effects of light and atmosphere, with loose brushstrokes.
```
Description: The painting shows a group of people eating at a
table under an
outside tent. The men are wearing boating hats.
""")
The result correctly identifies a Renoir painting that
matches the description:
Answer:
Painting: Luncheon of the Boating Party
Artist: Pierre-Auguste Renoir
Year: 1881
Significance: Captures a joyful social gathering of
Renoir’s friends at the Maison Fournaise restaurant in
Chatou, France, depicting the carefree atmosphere of
Parisian life during the Belle Époque; known for its
vibrant colors, lively composition, and portrayal of light
and shadow.

-- 46 of 840 --

Instead of requiring you to build a domain-specific model,
collect lots of training data, and perform the training tasks,
in-context learning allows LLMs to perform new tasks “on
the fly.” The examples “guide” the LLM to mimic the inputoutput patterns they demonstrate.
When zero-shot learning (in which no examples are
provided) does not solve your problem, you can try adding
examples to your prompt and giving the model practical
instructions to complete the task. Using in-context learning
with a few examples is easier than using traditional ML
because you don’t need to curate an extensive dataset to
fine-tune a model. You can often achieve good results with
few-shot learning.
With in-context learning, it’s possible to quickly prototype
solutions. It also boosts production use cases: it’s much
faster to update examples in a prompt than to curate,
retrain, and redeploy an ML model.
However, in-context learning has a few limitations:
It only works when the foundational model already
has the necessary knowledge and capability.
Adding many examples consumes valuable tokens of
your model’s context window and will slow your
inference time.
LLMs sometimes struggle to generalize more
complex problems based on a few examples.
In these scenarios, post-training might offer a better
approach.

-- 47 of 840 --

Post-Training
Post-training methods involve modifying the model weights
of pretrained models to customize them to new tasks or
domains. A post-trained model will have to be deployed and
utilized from a different end point than the foundational
model that was its starting point.
Post-Training Methods
Recall from Figure 1-2 that training a foundational model
involves multiple stages. The first stage involves training a
base LLM on predicting the next word, the second stage
involves training the base LLM to perform tasks using SFT,
and the third stage involves RLHF. You can post-train the
model in any or all of these ways.
Here is some terminology you might encounter that is
associated with post-training. These are not wholly
different methods—there’s some overlap between them:
Continued pretraining (CPT)
You can continue training the base model if you have a
dataset that contains vocabulary (such as industry jargon)
and associations that the foundational model wasn’t trained
on. This requires access to the full weights and architecture
of the base model. It’s important to note that training base
models is extremely expensive and time-consuming, and
moreover, you’ll have to perform the remaining stages of
training on this new model. In March 2023, Bloomberg used
this approach on financial documents, and just months later,
it found that foundational models handily outperformed the
domain-specific model. Since then, few organizations have
chosen this approach.
Supervised fine-tuning (SFT)

-- 48 of 840 --

You can use SFT to further train language models on datasets
consisting of (prompt, response) pairs in a supervised
manner. If you use prompts that consist of specific
instructions (“improve this management plan,” etc.) and a
wide variety of data, you can improve the model’s ability to
follow those specific natural language instructions. If you
train the model on a wide variety of instructions, you can
enhance its zero-shot capabilities across diverse tasks. You
can also use such instruction tuning to enhance
generalization or to elicit more helpful or honest behavior
from the model. Whether the model will display this
behavior will depend on the size and diversity of your
dataset—if you do SFT on just a single task (instruction),
then the model will probably forget the tasks it learned
earlier and not generalize to new tasks. On the other hand, if
your instruction training dataset consists of multiple tasks,
then the model may generalize to new tasks even after just
one round of SFT.
Parameter-efficient fine-tuning (PeFT)
Because foundational models are so large, it’s unwieldy to
train them further. So, parameter-efficient fine-tuning (PeFT)
approaches have emerged to make the training process
more practical for large models. Low-rank adaptation (LoRA)
represents weight updates using smaller matrices through
low-rank decomposition. Instead of fine-tuning all model
parameters, LoRA freezes the original pretrained weights
and adds small, trainable “adapter” matrices that are
decomposed into low-rank representations. LoRA drastically
reduces the number of trainable parameters (making them
up to 10,000 times fewer) and reduces GPU memory
requirements (making them up to 3 times fewer). It also does
not add inference latency, and it often performs on par with
full fine-tuning. Quantization-aware low-rank adaptation

---

## Sección 13: Chapter 5, that build on few-shot learning.

-- 49 of 840 --

(QLoRA) is an extension of LoRA that quantizes all the
weights of the model. Its training process is more memory
efficient, albeit slower. On the other hand, the quantized
fine-tuned model takes up less space and is therefore faster
than LoRA.
Preference tuning
You can post-train a model by having it generate two outputs
to the same prompt and giving it feedback on which output
is better. When such preferences are provided by humans
and the post-training is carried out through reinforcement
learning, it’s RLHF. Often, the post-training is carried out
using direct preference optimization (DPO) because it is
more efficient. DeepSeek introduced group relative policy
optimization (GRPO), wherein multiple responses are
generated and a response is assigned a score that is
normalized by the average reward of the group.
The type of post-training you can do is intimately connected
to the structure of the dataset. If the dataset consists
purely of text completions, then you can use it to do
unsupervised training, such as teaching a model new
vocabulary or completely new associations via CPT. If the
dataset consists of ideal responses to inputs (input-output
pairs), then you can use it for SFT or instruction tuning. If
the dataset consists of two responses to each input and
notes which of the two is preferable, then you can use it for
preference tuning. You can do any of these forms of posttraining in a parameter efficient way or on quantized
models.
You will encounter post-training in several patterns in this
book, including Content Optimization (Pattern 5 in

---

## Sección 14: Chapter 2), Adapter Tuning (Pattern 15 in Chapter 5), and

-- 50 of 840 --

Prompt Optimization (Pattern 20 in Chapter 6). At the time
of writing (June 2025), open weights models are the only
ones that support all the forms of post-training above. If
you are using a hosted model, please consult up-to-date
documentation from your model provider to determine
whether a pattern that requires post-training is possible (or
change to a model that provides the needed capability).
Fine-Tuning a Frontier Model
Companies like OpenAI and Anthropic, as well as
hyperscalers such as AWS and Google Cloud, have
streamlined the process of post-training frontier models
using SFT. It’s possible to upload a training dataset of
input-output pairs and launch the fine-tuning process, and
the result will be an endpoint of an adapter-tuned model
that can be used just like the foundational model.
We’ll illustrate this by using OpenAI’s GPT series of models,
but fine-tuning Anthropic Claude on Amazon Bedrock or
Google’s Gemini on Vertex AI is quite similar. Once you
generate your training pairs (you’ll need at least a hundred
pairs, but a couple of thousand pairs are even better), you’ll
need to store them in a JSON line-formatted file. You can
then load the training dataset as follows:
training_file = client.files.create(
file=open("training_data.jsonl", "rb"),
purpose="fine-tune"
)
Once the data is loaded, you can kick off a fine-tuning job
like this:
job = client.fine_tuning.jobs.create(
training_file=training_file.id,

-- 51 of 840 --

model="gpt-3.5-turbo" # Base model to fine-tune
)
The fine-tuning will take a few minutes to a few hours,
depending on the size of the training dataset and the
model. Once the training is completed, you can query the
model identifier for your fine-tuned LLM like this:
job_status = client.fine_tuning.jobs.retrieve(job.id)
if job_status.status == 'succeeded':
print(f"Model ID: {job_status.fine_tuned_model}")
The result will be a model ID of the following form:
ft:<BASE MODEL>-0125:<ORG_NAME>::<JOB ID>
Use this model ID in the inference API to invoke the finetuned model. It has the same API as the base model:
completion = client.chat.completions.create(
model=job_status.fine_tuned_model, # Use the fine-tuned
model
messages=messages
)
print(completion.choices[0].message.content)
Fine-Tuning an Open-Weight Model
Unsloth.ai provides you with the capability to fine-tune and
train open-weight LLMs like Gemma and Llama. You can
run Unsloth on your local hardware or use its managed
fine-tuning services.
To fine-tune the 4-bit quantized version of Llama 3, start by
loading in the model and its tokenizer (the class that will
break an input text sequence into tokens of the sort the
model expects):

-- 52 of 840 --

from unsloth import FastLanguageModel
max_seq_length = 2048
model, tokenizer = FastLanguageModel.from_pretrained(
model_name="unsloth/Meta-Llama-3.1-8B-bnb-4bit",
max_seq_length=max_seq_length,
load_in_4bit=True,
dtype=None,
)
Then, attach a set of adapter weights to the base Llama
model:
model = FastLanguageModel.get_peft_model(
model,
r=16,
target_modules=["q_proj", "k_proj", "v_proj", "up_proj",
"down_proj",
"o_proj", "gate_proj"],
use_gradient_checkpointing="unsloth"
)
In the previous code, you specified the rank (or matrix size)
of the LoRA layer and the specific layers of the model to
which they are to be applied. The previous code also
applies LoRA to attention mechanisms (Q, K, and V
matrices) and various projection layers.
Assuming that your input and output pairs are in one of the
formats Unsloth supports, you can load the dataset using
the following code:
dataset = load_dataset("...", split="train")
dataset = dataset.map(apply_template, batched=True)
Then, on a machine with sufficiently powerful GPUs, you
can launch the training process by using the following
code:
trainer=SFTTrainer(
model=model,
tokenizer=tokenizer,

-- 53 of 840 --

train_dataset=dataset,
dataset_text_field="text",
)
trainer.train()
Once the model is trained, you can save it and push it to
Hugging Face. There, you can merge the base model and
its adapter layer into a single model before pushing it:
model.save_pretrained_merged("model", tokenizer,
save_method="merged_16bit")
model.push_to_hub_merged("...", tokenizer,
save_method="merged_16bit")
Then, you can use this model just like the base model.
Considerations
Fine-tuning models gives you the unique ability to
customize LLMs to your domain-specific use cases, but
fine-tuned models come with additional complexities—so
make sure that the benefits of fine-tuning are worth these
additional headaches:
Data requirements
Instead of providing a few in-context examples, you must
use a more significant number of samples (more than a
hundred) to customize the range of tasks the LLM can
handle. This will require you to collect the samples ahead of
time before attempting to fine-tune your LLMs. If you don’t
have the time or resources right now to do that, consider
starting with in-context learning, collecting the data, and
then fine-tuning your model later to boost its performance
and provide more consistent, reliable outputs.
Catastrophic forgetting

---

## Sección 15: Chapter 2), Adapter Tuning (Pattern 15 in Chapter 5), and

-- 54 of 840 --

Fine-tuning LLMs can lead to catastrophic forgetting, in
which the model overemphasizes the examples provided
during fine-tuning and loses its previously acquired
knowledge. This wipes out LLMs’ primary advantage: their
comprehensive world knowledge. You can mitigate this issue
by fine-tuning your model on a small dataset, for only a few
epochs, and by selecting an appropriate learning rate during
the fine-tuning process. Generally, you should begin the finetuning learning rate at the value where the pretraining
phase concluded (typically around 1e-5).
Additional complexity
Before releasing the fine-tuned model to a production
environment, you need to evaluate its performance and
make sure it hasn’t picked up any counterproductive
constructs, like biased language. Also, whenever a new
version of your foundational model is released, you must
fine-tune the model again and redo the training. Finally, you
need to track the lineage of the training and validation data
used to train the fine-tuned model. These are additional
tasks that require careful execution, and using in-context
learning is far simpler since it only requires you to add a
handful of examples.
Additional costs
Providers like OpenAI charge a higher per-token rate for
inference on fine-tuned models than for requests to their
standard models. They charge a higher price because
prompts to fine-tune models can be much shorter and can
elicit the same or higher-quality output. Since providers
calculate prices on input and output tokens, they increase
token pricing to recover the overhead costs of hosting your
fine-tuned model.

-- 55 of 840 --

On the other hand, when you fine-tune open models, the
model inference cost reduces—but you must pay for the GPU
costs while performing the fine-tuning procedures.
Depending on the base LLM, this can start at a few dollars
but quickly spiral to hundreds of dollars per model version.
The Organization of the Rest of the
Book
The rest of this book covers 32 design patterns, organized
into eight chapters. You’ll learn how to control model
outputs, enhance knowledge retrieval, improve reasoning
capabilities, increase reliability, enable action, optimize
performance, and implement safeguards. The section on
each pattern includes a clear problem statement, a solution
approach, practical usage scenarios, and code examples.
We hope that this book will help you learn how to build
robust and effective GenAI applications.
In Chapter 2, we show you how to control the style and
format of AI-generated content—which is a critical skill for
ensuring brand consistency, accuracy, and compliance.
You’ll learn how to implement Logits Masking (Pattern 1)
to ensure that text conforms to specific style rules by
intercepting the generation process at the sampling stage.
The section on Grammar (Pattern 2) will teach you to
constrain outputs to specific formats or data schemas using
formal grammar specifications. With Style Transfer
(Pattern 3), you’ll discover how to convert content to mimic
specific tones through few-shot learning or fine-tuning. The
section on Reverse Neutralization (Pattern 4) will show you
how to generate content in specialized styles by first
creating neutral content and then transforming it. Finally,
Content Optimization (Pattern 5) will equip you with

-- 56 of 840 --

methods to determine optimal content styles through
systematic comparison and preference tuning—which are
particularly valuable for marketing, advertising, and
educational materials where effective style factors aren’t
immediately obvious.
In Chapters 3 and 4, you’ll learn patterns that can help you
build AI systems that leverage external knowledge sources
to address fundamental limitations like knowledge cutoffs,
confidential data access, and hallucinations. You’ll begin
with Basic RAG (Pattern 6) and learn to ground AI
responses in relevant information from knowledge bases.
The section on Semantic Indexing (Pattern 7) will teach you
to capture meaning across different media types by using
embeddings, thus moving beyond simple keyword
matching. With Indexing at Scale (Pattern 8), you’ll master
techniques for managing outdated or contradictory
information through metadata, filtering, and reranking.
Index-Aware Retrieval (Pattern 9) will equip you with
advanced methods like hypothetical answers, query
expansion, and GraphRAG to improve retrieval quality.
Node Postprocessing (Pattern 10) will show you how to
handle irrelevant content and ambiguous entities through
reranking and contextual compression. You’ll learn to build
Trustworthy Generation (Pattern 11) systems that maintain
user trust despite inevitable errors, and finally, the section
on Deep Search (Pattern 12) will teach you iterative
processes for complex information retrieval that overcome
context window constraints and enable multihop reasoning.
In Chapter 5, we discuss powerful techniques to enhance
the reasoning and specialized capabilities of language
models. You’ll learn Chain of Thought (CoT) (Pattern 13),
which enables models to break down complex problems
into intermediate reasoning steps and dramatically improve

---

## Sección 16: Chapter 2), Adapter Tuning (Pattern 15 in Chapter 5), and

-- 57 of 840 --

their performance on mathematical problems and logical
deductions. The section on Tree of Thoughts (ToT) (Pattern
14) will teach you to implement tree search approaches for
problems requiring exploration of multiple solution paths—
which are ideal for strategic thinking and planning tasks.
With Adapter Tuning (Pattern 15), you’ll discover how to
efficiently specialize large models by training small add-on
neural network layers while keeping original model weights
frozen, thus making specialized adaptation practical with
limited data (from 100 to 10,000 examples). Finally, the
section on Evol-Instruct (Pattern 16) will show you how to
efficiently generate high-quality instruction-tuning datasets
by evolving instructions through multiple iterations, thus
enabling you to teach models new domain-specific tasks
without extensive manual data creation.
In Chapter 6, you’ll encounter patterns for building more
reliable AI systems that can be trusted in production
environments. You’ll learn LLM-as-Judge (Pattern 17) to
evaluate generative AI capabilities through detailed,
multidimensional feedback—which is a foundational skill
for comparing models and tracking improvements. The
section on Reflection (Pattern 18) will teach you how to
enable models to correct earlier responses based on
feedback, which significantly improves reliability in
complex tasks. With Dependency Injection (Pattern 19),
you’ll master techniques for independently developing and
testing each component of an LLM chain, thus making your
systems more maintainable and robust. Finally, the section
on Prompt Optimization (Pattern 20) will show you how to
systematically set and update prompts by optimizing them
on example datasets, which reduces maintenance overhead
when dependencies change and ensures consistent
performance over time.

-- 58 of 840 --

In Chapter 7, we discuss ways to transform your AI systems
from passive information providers into active agents that
can take meaningful actions in the world. You’ll master
Tool Calling (Pattern 21) to learn how to bridge LLMs with
software APIs so they can invoke functions with
appropriate parameters and incorporate the results into
their responses. This enables real-time data access,
connections to enterprise systems, and complex
calculations. The section on Code Execution (Pattern 22)
will teach you to leverage LLMs to generate code that can
be executed by external systems—which is perfect for
creating visualizations, annotating images, or updating
databases. With Multiagent Collaboration (Pattern 23),
you’ll learn to design systems of specialized single-purpose
agents that are organized in ways that mimic human
organizational structures, thus enabling complex
reasoning, multistep problem solving, collaborative content
creation, and self-improving systems that can handle
extended interactions without human intervention.
In Chapter 8, you’ll learn essential patterns for deploying
generative AI within real-world constraints of cost, latency,
and computational resources. The section on Small
Language Model (SLM) (Pattern 24) will demonstrate how
to leverage smaller, more efficient models that can run on
edge devices or with limited resources while still delivering
acceptable performance for specific tasks. With Prompt
Caching (Pattern 25), you’ll discover techniques to reduce
redundant computations and API calls and thus
significantly lower costs for frequently requested content.
Inference Optimization (Pattern 26) will equip you with
methods to maximize throughput and minimize latency
through techniques like speculative decoding, continuous
batching, and prompt compression. The section on
Degradation Testing (Pattern 27) will show you how to

-- 59 of 840 --

systematically evaluate model performance across different
deployment scenarios and thus ensure consistent quality
over time. Finally, the Long-Term Memory (Pattern 28)
section will demonstrate how to maintain user history and
dynamically apply personalization.

---

## Sección 17: Chapter 9 will equip you with critical patterns for ensuring

your generative AI applications operate safely, ethically,
and within appropriate boundaries. The section on
Template Generation (Pattern 29) will teach you how to
pregenerate and review templates that require only
deterministic string replacement at inference time—which
is ideal for high-volume personalized communications
where human review isn’t scalable. With Assembled
Reformat (Pattern 30), you’ll learn to separate content
creation into low-risk steps: first assembling data safely
and then formatting it attractively to reduce the risk of
inaccurate or hallucinated content. The section on SelfCheck (Pattern 31) will show you how to use token
probabilities to detect potential hallucinations costeffectively in factual responses. Finally, Guardrails (Pattern
32) will equip you with comprehensive approaches to
wrapping LLM calls with preprocessing and postprocessing
layers that enforce security, privacy, content moderation,
and alignment constraints—which is essential whenever
your application could face malicious adversaries.
Finally, Chapter 10 demonstrates how the patterns from
the first nine chapters can be composed into a productionready agentic application.
1 Look carefully at the sketch. Do you see any issues? Do all the characters
have the appropriate number of fingers? Is the girl’s face symmetric? Does
the board game correspond to anything recognizable? At the time of
writing, image models struggle with symmetry, count, and exact recall.

-- 60 of 840 --

2 A difference of 400 in the Elo rating corresponds to 10:1 odds that the
higher-ranked player will beat the lower-ranked one.

-- 61 of 840 --

---

## Sección 18: Chapter 2. Controlling

Content Style
The patterns in this chapter all have to do with controlling
the style of the content (such as text, images, and video)
generated by foundational models, which are models that
have been trained on large datasets and are capable of
generating a wide variety of content. However, the style of
that content will, by default, be based on the training
process that the model provider has used. Even if you stick
to a single model version, model responses are stochastic—
which means you may get different responses even if you
repeat a question exactly (assuming that there is no
caching going on). This means that downstream
applications and end users that use responses from a GenAI
model will have to deal with quite a wide variety of possible
styles.
For example, we asked a number of foundational models
the same question:
What’s a good side dish for pierogi? Answer in a single
sentence.
We then recorded the answers (see Table 2-1). As you can
see, even when we restrict the answer to a single sentence,
different models can answer the same question very
differently. Imagine how much more diverse the results
would be had we not restricted the style of the response in
any way!

-- 62 of 840 --

Table 2-1. Answers to the same question in different styles
(answers retrieved from the models in February 2025)
Model
Model
provider Answer
GPT-4 OpenAI A great side dish for pierogi
is sautéed onions with butter
and a sprinkle of crispy
bacon bits.
Claude
Sonnet 3.5
Anthropic A tangy sauerkraut or
caramelized onions
complement pierogies
perfectly by adding
contrasting acidity or
sweetness to the dumplings.
Gemini 2.0
Flash
Google Sautéed onions and
mushrooms are a classic and
delicious side dish for
pierogi.
Llama 3.2
70B
Meta A traditional and delicious
side dish for pierogi is fried
onions and sour cream, but
other popular options
include sautéed spinach,
braised red cabbage, or a
simple green salad with a
light vinaigrette.
DeepSeekR1
DeepSeek A tangy sauerkraut salad or
caramelized roasted carrots

-- 63 of 840 --

Model
Model
provider Answer
with dill make excellent,
flavorful sides for pierogi.
Mistral
Small 24B
Mistral AI A classic side dish for pierogi
is coleslaw, especially when
garlic and herbs are added.
How can you control (or restrict) the style of the response?
Naturally, the answer depends on your goals—do you want
to control the tone, the vocabulary, the reading level, or the
formatting? You can try to control any of these aspects of
style by using prompt engineering, but such an approach is
extremely brittle—the results will vary from model to model
and from one attempt to another. The patterns in this
chapter provide a variety of more sophisticated and robust
solutions to the problem of controlling style, so either
choose the one that best meets your needs or combine the
patterns.
Logits Masking (Pattern 1) ensures that generated text
conforms to a set of rules. Grammar (Pattern 2) ensures
that generated text conforms to a user-specified schema or
standard data format—which is like Logits Masking, but it’s
carried out server-side by the model provider. Style
Transfer (Pattern 3) uses example translations to ensure
that text or generated images have the desired
characteristics of some reference content. Reverse
Neutralization (Pattern 4) provides a way to perform style
transfer when only the reference content is available.
Finally, Content Optimization (Pattern 5) is a way to choose
whichever style performs best, without having to identify
what the factors of that style are.

-- 64 of 840 --

Pattern 1: Logits Masking
Logits Masking provides a way for application clients of a
foundational model to ensure that the text the model
generates conforms to a set of rules. These rules are often
static, but in some cases, they can change based on the
content already generated.
Problem
Sometimes, when you’re generating text using LLMs, you
want it to conform to specific style rules. These rules might
be in place for branding, accuracy, compliance, or other
reasons.
Here are some illustrative rules to help you understand the
kinds of problems that this pattern tries to solve:
Branding
If the text is talking about Item A, it should use brand words
associated with that model (sporty, performant, and so on)
and not words associated with Item B (spacious, luxurious,
and the like).
Accuracy
When you’re generating a letter for bill payment, make sure
the invoice ID and amount due are not repeated in the text
of the letter. Such repetition increases the chances of error,
perhaps because only the values at the canonical location
are validated.
Compliance
If the answer to a question refers to a case study involving
Customer A, make sure that the text does not include any
mention of its competitors (B, C, and D, who are also our

-- 65 of 840 --

customers). Customers may have agreed to let us refer to
their case studies, but only in content that does not refer to
their direct competitors.
Stylebook
You may be in an industry with a stylebook, such as The
Chicago Manual of Style, or publishing in a venue that
requires adherence to the APA citation style.
The naive approach, or antipattern, is to generate content,
evaluate it against the relevant rules, and regenerate it if
the content doesn’t conform to the rules (see Figure 2-1).
However, such a “try-and-try-again” approach only works
for edge cases when very few responses (less than 10% or
so) need to be regenerated. Otherwise, multiple retries will
dramatically increase latency and sometimes won’t even
converge toward an acceptable answer.
Figure 2-1. An antipattern: the try-and-try-again approach of applying style
rules to content

---

## Sección 19: Chapter 2. Controlling

-- 66 of 840 --

WHEN IS THE TRY-AND-TRY-AGAIN APPROACH
ACCEPTABLE?
If content has to be generated 3.2 times on average,
then the typical latency will be 3.2 times that of a single
call. The tail latency, which is the latency of the slowest
requests, will be much greater because there is no
guarantee that the approach will ever converge. Also,
reducing the number of attempts allowed will increase
the refusal rate of your application.
Whether or not an attempt is successful is a binary
outcome, and you need to try only until the first success.
Because the number of attempts needed in such a
process follows a geometric distribution, you can
calculate the average and tail latency. If only p% of your
generations succeed, then you can estimate the average
and tail latency of the try-and-try-again approach as
follows:
The average number of generations required
before you get a successful one is given by this
formula: 100/p. For example, if 10% of your
generations fail, then 90% succeed—so you will
need 100/90, or 1.1, attempts on average, and
the average latency goes up by 10%. On the other
hand, if 70% of your generations fail, only 30%
succeed—so you will need 100/30, or 3.3,
attempts on average, and the average latency
goes up by 230%. If you use an exponential
backoff method that increases the time between
attempts to avoid overloading the server, then
the latency increase will be even higher.

-- 67 of 840 --

There’s no closed formula for the 99th percentile
of the latency. Instead, you have to estimate it
numerically from the geometrical distribution.
You can use the online calculator at eStat to look
up the correct value. For a 90% success rate,
plug in 0.9 for the value of p and look for 0.99 in
P(X <= x). The 99th percentile of the number of
attempts required is 2 if p = 90 and 13 if p = 30!
The bottom line is that the try-and-try-again approach is
acceptable only if the LLM call has a very high success
rate.
A better approach to making generated text conform to a
set of rules is to use Logits Masking.
Solution
As discussed in “Beam Search”, foundational models
generate text by sampling from a sequence of possible
continuations. The idea behind Logits Masking is to
intercept the generation at this sampling stage.
Logits Masking works as follows:
Rather than wait until the full content is generated,
you obtain the set of possible continuations at each
intermediate point.
You zero out the probability associated with
continuations that do not meet the rules.
As long as there is at least one continuation that
meets the rules, generation can proceed.
If there is no continuation that meets the rules or if
the generation is at a point that you have previously

-- 68 of 840 --

encountered as a dead end, you need to back up one
step and retry generation.
After some maximum number of generation
attempts, you send a refusal back to the user saying
that you are unable to generate content that meets
the rules.
The impact of Logits Masking is to prune nonconforming
beams in beam search; this ensures that generated text
conforms to specific rules.
Figure 2-2 depicts how to implement Logits Masking. The
solid gray boxes show the sequence selection approach that
suffices for simple use cases, and the hatched gray boxes
show the sequence regeneration steps that are needed in
more complex situations.

-- 69 of 840 --

Figure 2-2. How to implement Logits Masking

-- 70 of 840 --

To demonstrate these steps, we’ll use the Transformers
library. We’ll show only the relevant code snippets; the full
code for this pattern is in the 01_logits_masking folder of
the GitHub repository for this book.
THE TRANSFORMERS LIBRARY
The Transformers library from Hugging Face simplifies
working with pretrained Transformer-based
foundational models, regardless of the ML framework
(Tensorflow, PyTorch, or JAX) that was used to train the
foundational model. It offers support for a wide range of
tasks such as text classification, question answering,
summarization, translation, and text generation. For
example, to do sentiment analysis using Llama, you
could use the following:
from transformers import pipeline
MODEL_ID = "meta-llama/Llama-3.2-3B-Instruct"
classifier = pipeline('sentiment-analysis', MODEL_ID)
result = classifier("""I am learning a lot of neat concepts
from the
GenAI design patterns book.
""")
Through Hugging Face, the library also provides access
to thousands of pretrained models and simplifies the
process of fine-tuning these models for specific
downstream tasks and deploying them.
We are using Transformers to illustrate Logits Masking
only so that we have a concrete implementation with
which to illustrate the steps needed and discuss the
controlling parameters. You can carry out these steps by
using other LLM frameworks or even the model
providers’ client libraries, although the details will vary.

-- 71 of 840 --

Step 1: Intercepting sampling
To intercept sampling and get access to the probability of
each continuation sequence, you need to create a
LogitsProcessor subclass, which is part of Transformers’
generation library. In the LogitsProcessor subclass, you
initialize the tokenizer and any parameters you need to
apply your rules as follows:
class MyRulesLogitsProcessor(LogitsProcessor):
def __init__(self, tokenizer, rules):
self.tokenizer = tokenizer
self.rules = rules
Once you’ve created the logits processor, you have to pass
it in when you invoke the Transformer pipeline. To do so,
you create a text generation pipeline as normal:
from transformers import pipeline
pipe = pipeline(
task="text-generation",
model=MODEL_ID,
)
Then, when invoking the pipeline, you specify the size of a
continuation sequence (max_new_tokens), the number of
possible continuations you want to generate (num_beams),
and an instance of your LogitsProcessor subclass that will
intercept the sampling:
rules_processor = MyRulesLogitsProcessor(pipe.tokenizer, rules)
results = pipe(input_message,
max_new_tokens=256,
do_sample=True,
temperature=0.8,
num_beams=10,
logits_processor=[rules_processor])

---

## Sección 20: Chapter 2. Controlling

-- 72 of 840 --

Step 2: Zeroing out invalid sequences
You implement the core of the interception (see step 2 in
Figure 2-2) by overriding the __call__ method of the logits
processor, which receives a set of sequences and their
corresponding probabilities in the form of logits:
def __call__(
self, input_ids: torch.LongTensor, input_logits:
torch.FloatTensor
) -> torch.FloatTensor:
output_logits = input_logits.clone()
# make changes to the output_logits based on your rules
return output_logits
Note two things about the signature of the __call__
method in the previous code. First, the inputs are token
IDs, not natural-language characters. Typically, you’ll have
to decode the tokens before applying the rules, so you’ll do
this by using the following:
seq = self.tokenizer.decode(input_id)
Second, because logits are the log of the probability,
zeroing out the probability of a sequence means setting the
logits to negative infinity. Do this by using the following:
output_logits[idx] = -np.inf
Putting this together, the implementation of the __call__
method will be as follows:
def __call__(
self, input_ids: torch.LongTensor, input_logits:
torch.FloatTensor
) -> torch.FloatTensor:
output_logits = input_logits.clone()
for idx, input_id in enumerate(input_ids):
seq = self.tokenizer.decode(input_id)

-- 73 of 840 --

if not self.apply_rules(seq, self.rules):
output_logits[idx] = -np.inf # zero out
return output_logits
This code snippet assumes that you have an appropriate
apply_rules() available.
Steps 3 (sampling, per Figure 2-2) and 4 (determining
whether the maximum number of attempts have been
exceeded) are straightforward, so let’s finish this section by
looking at how to do step 5.
Step 5: Backtracking and regenerating sequences
In the Transformers library, the pipeline call doesn’t allow
you to backtrack and regenerate (see step 5 in Figure 2-2).
To do that, you have to take full control of the generation
loop, and you do it by calling the pipe.model.generate()
method for set numbers of tokens (16 in this example) at a
time:
results = pipe.model.generate(
**input_ids,
max_new_tokens=16,
num_beams=10,
output_scores=True,
)
The input_ids for the first call to generate() consists of
the prompt from the user. Then, you need to append the
generated sequences from previous steps. Therefore, to
create the input_ids parameter, you’d do something like
this:
input_ids = pipe.tokenizer(
input_prompt + '\n'.join(text_so_far)),
return_tensors="pt").to("cuda")

-- 74 of 840 --

The preceding code appends previously generated text to
the original prompt, tokenizes it into IDs, and sends the
sequence of IDs as a PyTorch tensor
(return_tensors="pt") that’s ready for GPU computations
(to("cuda")) by the model.
A typical loop around generate() will involve logic to
(re)initialize the generation, apply the rules, backtrack and
remove previously generated sequences, or stop the
generation. You’ll want to maintain the necessary state
variables—and the reasons for this will become clearer
when we examine concrete examples in the next section.
You’ll also need some logic to stop the generation. A
common approach is to stop the generation when the model
outputs a stop string. The input prompt could include an
instruction to output the stop string, or the stop string
could be part of examples provided in the context. This stop
string can also be passed into the generate() call to do an
early stop while generating a sequence (for example,
before 16 new tokens are generated).
Examples
To illustrate Logits Masking, we’ll use a couple of
examples. The first is a simple problem in which you can
simply select a continuation sequence (Steps 1–3 in the
previous section, as depicted in Figure 2-2). The next is a
more complex problem to illustrate sequence regeneration
after backing up one or more generation sequences (in
Steps 1–5).
Sequence selection
Imagine that you’re a product marketer for nutritional
supplements and you need to write product descriptions

-- 75 of 840 --

that will go on the pages of ecommerce sites. These sites
tend to reject certain phrases like award winning, but
based on search engine optimization and analysis of your
website traffic, you might know good phrases to include in
your product instead.
For the purposes of this book, let’s use the set of top
nutrition keywords that was created by MarketKeep using
Google Ads Keyword Planner. The code for this example is
in the logits_masking notebook on GitHub, so please follow
this discussion by looking at that code.
Zero-shot learning doesn’t work
We could try to do this with a zero-shot prompt:
system_prompt = f"""You are a product marketer for a company that
makes nutrition
supplements. Balance your product descriptions to attract
customers, optimize
SEO, and stay within accurate advertising guidelines.
"""
user_prompt = f"""Write a product description for a protein
drink."""
The result, though, does not meet our requirements:
Introducing PowerBoost, a delicious and convenient
protein drink that helps you fuel your active lifestyle.
With 20 grams of protein and 0 g of sugar, this refreshing
beverage supports muscle growth and recovery after
your toughest workouts. Made with high-quality whey
protein and essential vitamins, PowerBoost is the perfect
way to recharge and refuel on the go.
It does include two good SEO terms—whey and whey
protein—but unfortunately, it also includes three words
that increase the odds of being banned: quality, growth,

---

## Sección 21: Chapter 2. Controlling

-- 76 of 840 --

and perfect. Sure, high-quality and muscle growth seem
innocuous, but why take the chance?
Using Logits Masking
Now, try using Logits Masking to choose continuations that
have the maximum number of positive words and the least
number of negative words. First, write an evaluation
function that counts the occurrences:
def evaluate(descr: str, positives, negatives) -> int:
descr = descr.lower()
num_positive = np.sum([1 for phrase in positives if phrase in
descr])
num_negative = np.sum([1 for phrase in negatives if phrase in
descr])
return int(num_positive - num_negative)
To do this, write a subclass of LogitsProcessor and select
the continuation sequence that has the characteristics you
desire:
class BrandLogitsProcessor(LogitsProcessor):
...
def __call__(
self, input_ids: torch.LongTensor, input_logits:
torch.FloatTensor
) -> torch.FloatTensor:
output_logits = input_logits.clone()
num_matches = [0] * len(input_ids)
for idx, seq in enumerate(input_ids):
# decode the sequence
decoded = self.tokenizer.decode(seq)
# count the number of words that start with desired
letter
num_matches[idx] = evaluate(decoded, self.positives,
self.negatives)
max_matches = np.max(num_matches)
# logits goes from -inf to zero. Mask out the non-max
sequences;

-- 77 of 840 --

# torch doesn't like it to be -np.inf
for idx in range(len(input_ids)):
if num_matches[idx] != max_matches:
output_logits[idx] = -10000
return output_logits
When we (the authors) did this, we got a product
description that included several “good” terms (whey, whey
protein, and nutrients) and avoided any of the words that
could get us banned:
Fuel your active lifestyle with our premium protein drink,
packed with 20 grams of whey protein, 10 grams of
branched-chain amino acids (BCAAs), and essential
vitamins and minerals to support muscle recovery and
overall well-being. Our unique blend of whey protein
isolate and micellar casein provides a sustained release
of nutrients, helping to build and repair muscle tissue.
With no artificial flavors or sweeteners, our protein drink
is a guilt-free way to support your fitness goals. Enjoy the
taste of a refreshing beverage while nourishing your body
with the nutrients it needs to thrive.
Note the use of premium to get around the problem with
quality. We’ll always get a product description, and the
description that we get is the best possible one we could
have gotten, given the set of potential continuation
sequences. Step 3 is automatically valid the way we are
doing this because we will always have some sequence—
even if it has no positive words.
Sequence regeneration
Now, let’s look at a more complex problem where zero/fewshot learning simply doesn’t work and is unlikely to work in
the absence of a powerful reasoning model that’s capable
of backtracking and correcting its work. The full code for

-- 78 of 840 --

this section is in the sequence_regeneration notebook on
GitHub.
This example involves poetry and might appear niche, but
remember that the purpose of Logits Masking is to ensure
that generated content conforms to a set of rules that you
enforce programmatically. The rules can be quite complex
and dynamic.
One-shot examples don’t work
Imagine that you’re generating poems for a children’s book
and you want to generate an acrostic poem about some
animal. This means that the first letters of the poem need
to spell out an adjective that’s suitable for the animal. For
example, the first letters of an acrostic poem about rabbits
might spell out quick or cute, and the entire poem needs to
be a single phrase that describes the animal or something
the animal might do. Thus, an acrostic poem about rabbits
might be one such as this:
Quietly, the rabbit bides its time
Under the garden deck
In wait for
Carrot greens,
Kale, and parsley.
Putting the entire description in the opening paragraph of
this subsection into the system prompt and using the
acrostic poem about rabbits as a single-shot example, we
asked Llama 3.2 to generate an acrostic about a tiger, and
we got the following:

-- 79 of 840 --

Powerful eyes gleam in the night
Occupying shadows, a fierce sight
Ruling the forest with gentle might
Elegant, a creature of beauty bright
The model probably tried to generate POWER as the
starting letters for the lines of the poem but failed and
instead came up with PORE. There are several ways to fix
this. Reflection (Pattern 18 in Chapter 6) might work, for
example. So would using a more powerful reasoning model
and giving it “thinking tokens.” Here, though, let’s see how
to use Logits Masking to solve this with a smaller model.
Initializing the poem
To initialize the acrostic, we’ll constrain the starts of lines
explicitly. To do so, we’ll generate a list of adjectives for
the animal by using the following prompt:
system_prompt=f""" You are an expert on words who has access to a
thesaurus.
Respond with a list of adjectives that could complete the phrase
"As ___ as a
{animal}" For example, for a rabbit, you could respond with
these: quick, fast,
gentle, playful
Respond with just a list of words without any introduction or
preamble.
"""
user_prompt=f"""Give me the best {num_words*3} adjectives that
would complete
the phrase 'As ___ as a {animal}'
"""
The resulting list of adjectives for tiger is this:
[‘wild’, ‘agile’, ‘regal’, ‘swift’, ‘fierce’]

---

## Sección 22: Chapter 2. Controlling

-- 80 of 840 --

We then use the following prompt to generate an
appropriate phrase to start the poem:
def get_phrase_that_starts_with(animal: str, letter: str):
system_prompt=f"""
You are writing a children's book. Write a phrase about a
{animal}
that starts with the letter {letter}
Respond with just the phrase without an introduction or
preamble.
"""
user_prompt=f"""Write a phrase about a {animal} that starts
with the letter
{letter}
"""
input_message = [
{"role": "system", "content": system_prompt},
{"role": "user", "content": user_prompt}
]
result = pipe(input_message, max_new_tokens=256)
phrase = result[0]['generated_text'][-1]['content']
return ' '.join(phrase.split()[:3]) # max 3 words
A phrase for the animal tiger that starts with the letter N
would be as follows:
Nimbly navigating the
Then, we put these together to initialize the poem:
def initialize_poem(animal: str, allowed_start_words: [str]):
# the weight of a word is inversely proportional to its
length
lengths = [1.0*len(w) for w in allowed_start_words]
max_len = np.max(lengths)
weights = (max_len - lengths)
weights = weights / np.sum(weights)
start_word = random.choices(population=allowed_start_words,
weights=weights,
k=1)[0].lower()
start_letter = start_word[0].upper()
return start_word, [get_phrase_that_starts_with(animal,
start_letter)]

-- 81 of 840 --

This method returns the acrostic word and the starting
point for a poem that starts with that word. So, for tiger,
we might get the following:
('wild', ['Wrapped in warm,'])
Generating a poem
We start by initializing the poem and creating state
variables to store the poem we’ve generated so far in this
iteration:
def write_acrostic(animal: str, max_iter=10,
num_sequences_per_iter=10):
allowed_start_words = get_potential_starts(animal, 10)
start_word, poem_so_far, prev_start_poem = None, None, None
for iter in range(max_iter):
# reinitialize if we are stuck at a starting point
if poem_so_far is None or poem_so_far == prev_start_poem:
start_word, poem_so_far = initialize_poem(animal,
allowed_start_words)
prev_start_poem = poem_so_far # for next iter
To generate the poem, we join the input prompt to the
poem generated so far and ask the model to generate
completion sequences:
# generate poem
inputs = pipe.tokenizer('\n'.join(
get_input_prompts(animal, '\n'.join(poem_so_far),
start_word)),
return_tensors="pt").to("cuda")
results = pipe.model.generate(
**inputs,
max_new_tokens=16,
num_beams=num_sequences_per_iter,
num_return_sequences=num_sequences_per_iter,
output_scores=True,
renormalize_logits=True,
return_dict_in_generate=True,
)

-- 82 of 840 --

Applying Logits Masking
Assuming that the acrostic start word is BOLD, we’ll get
back sequences of the following form:
Brightening up the forest floor
Often, the tiger stalks its prey
Lur
And here’s another example:
Brightening up the forest floor
Lively eyes watch all around
Owning the night
We’ll keep the first sequence and zero out the second,
which doesn’t fit the acrostic. Typically, you’ll get multiple
sequences that match. We could do random sampling based
on the probability, but we’ll take the simpler approach of
doing greedy decoding, in which we choose the sequence
with the highest probability:
candidate_starts = ''.join([line[0] for line in
candidate_poem]).lower()
continue_seq = False
found_poem = False
if len(start_word) >= len(candidate_starts) and
start_word[:len(candidate_starts)] == candidate_starts:
continue_seq = True
if len(start_word) == len(candidate_starts):
found_poems.append({
"poem": candidate_poem,
"prob": float(np.exp(seq_prob.cpu())),
"word": start_word
}) # YEAH!
if continue_seq:
if seq_prob > best_prob_in_iter:
best_prob_in_iter = seq_prob
# even if a poem is found, the last line might be

-- 83 of 840 --

incomplete,
# so continue the sequence
best_poem_in_iter = candidate_poem
In this code, we take advantage of knowing that if the
number of complete lines generated equals the length of
the acrostic word, then the poem is complete. We don’t
need an explicit stop string. We can add this poem to the
list of found poems, along with the probability of the
sequences that form the poem.
Regeneration logic
If, on the other hand, all the continuation sequences have
been zeroed out, we backtrack by removing generated lines
one at a time (starting at the end) until there is a sequence
that meets the acrostic requirements. We can use the poem
fragment that starts with “Brightening up the forest floor”
as the starting point for the next call to generate():
# remove the lines that don't fit and try again
while True:
# remove a line, and see if it matches the start word
best_bad_poem_in_iter = best_bad_poem_in_iter[:-1]
if len(best_bad_poem_in_iter) == 0:
# reinitialize, potentially to different start word
start_word, poem_so_far = initialize_poem(animal,
allowed_start_words)
break
candidate_starts = ''.join([line[0] for line in
best_bad_poem_in_iter]).lower()
if len(start_word) >= len(candidate_starts) and
start_word[:len(candidate_starts)] == candidate_starts:
poem_so_far = best_bad_poem_in_iter # start from here for
same start_word
break
If you end up stuck on a starting point, then reinitialize the
poem (potentially with a new adjective for the animal) and
continue the process.

---

## Sección 23: Chapter 2. Controlling

-- 84 of 840 --

Example output
For tiger, the process generates acrostic poems whose
lines start with letters spelling out the words BOLD and
SWIFT. Here’s the first poem we get:
Boldly, the brave tiger stalks its prey
Owning the forest with its might,
Lurking in the shadows, waiting to pounce,
Daring to be the king of the night
And here’s the second:
Smiling softly, the
Wild eyes gleam
In the
Forest depths,
Tigers stalk
For an owl, we get a poem such as this:
Silently swooping through the night
Hooting softly, a gentle sound
Alertly watching, with eyes so bright
Ruling the darkness, all around
Prowling quietly, with stealthy pace
As you can see, this process of taking over the generation
loop and applying Logits Masking to select the continuation
sequence gives us enough control to generate poetry that
meets our strict style criteria, even when we have to
backtrack and regenerate sequences.

-- 85 of 840 --

Considerations
Logits Masking is a way of using much of the machinery of
the LLM to generate text while imposing your preferences
on the sampling. It’s useful when continuation sequences
can easily be censored to remove disallowed options.
The simple sequence selection approach works when
censoring tends to leave behind a few valid options. In
more complex scenarios, where it is highly likely that
censoring will remove all of the generated options, you
might need to backtrack and regenerate sequences.
Alternatives
If you think you have a problem that you can address by
using Logits Masking, consider the following alternatives:
Simpler ways of specifying a desired style include
providing few-shot examples in the context (see
Pattern 3, Style Transfer) and providing detailed
instructions in the prompt through prompt
engineering. However, these do not provide a strict
enforcement mechanism—you can’t be sure that
your generated text will conform to the rules.
Using a more powerful model might be an option
because such models are typically better at
following instructions. Reasoning models, where you
provide thinking tokens to allow the model itself to
retract and regenerate, may also work. However,
more powerful models tend to cost more and be
slower.
Try-and-try-again (where you generate fully, test,
and retry generation if the generated text doesn’t
conform to the rules) might be a reasonable option if

-- 86 of 840 --

the chances of conformance are high enough. The
99th percentile of the number of generations
required is only 2 if p = 0.9.
Logits Masking doesn’t provide any hints to the
model when you ask it to regenerate a sequence. If
your rules engine provides helpful error messages,
consider Reflection (Pattern 18), in which you
update the prompt with an error message. This can
reduce the number of attempts required to create
conforming content.
If the rules you want to apply can be represented in
certain types of standard forms, you can offload
Logits Masking to the model provider by providing it
with the rules you want to impose. This is Pattern 2,
Grammar, which we’ll consider next.
Extension to autocomplete
An interesting application of Logits Masking is to
implement autocomplete functionality. Autocomplete is a
common feature of many web applications. Google, for
example, suggests ways to complete a query when a user
starts to type in its text input box. According to Google, the
suggestions are based on “real searches and on word
patterns found across the web.”
Implementing autocomplete based on real searches in your
own application will require you to log users’ search terms
and suggest query completions based on what previous
users have typed in most often. However, because this
process leaks data among users by providing insight into
what other users are searching for, you may not be able to
apply this approach in some application areas. One way
around this security problem is to restrict autocomplete to

-- 87 of 840 --

previous queries within a specific deployment or made by
an individual user. This, however, leads to a large number
of cold-start situations, as many queries will be new.
In many situations, therefore, you might want to implement
autocomplete solely based on word patterns. How can you
do this? While you could build an index out of your
documents and keep it up to date as your documents
change, a simpler way might be to use Logits Masking, with
the document held in the context. The approach goes like
this:
1. Ask an LLM to complete the query that the user is
typing in by adding a single phrase or sentence.
2. In the LogitsProcessor, obtain the list of top
completions, show the user the top completions, and
have them either select one or type a different
phrase altogether.
3. If they select one of the completions, apply sequence
selection and zero out the logits of the other
possibilities. If they type a different phrase, use
sequence regeneration, using that as the new
starting point.
For a simple implementation that grounds the
autocomplete in a document (rather than on the web), see
the autocomplete notebook in the GitHub repository. In a
real implementation, you would cache the entire document
in the context to give yourself access to the full knowledge
base without paying for input tokens on each query.
Caveats
If you want to use Logits Masking, the model you’re using
needs to provide access to logits. As we write this in June

---

## Sección 24: Chapter 2. Controlling

-- 88 of 840 --

2025, Anthropic’s Claude family of models don’t provide
such access, but OpenAI, Google, and Meta do. Even
among these three, the level of access varies. OpenAI
provides read access to logprobs across almost all of its
models. Google’s Gemini Flash model, but not the Gemini
Pro model, allows the use of responseLogprobs (recall that
logit is the log of the probability). Meta’s Llama is the most
permissive, but it requires that you self-host the models.
Model providers fear that providing logits makes it easier
for others to train smaller models on the output of the
foundational models, so in practice, using Logits Masking
restricts your choice of foundational models. We hope that,
with more widespread knowledge of the benefits of this
pattern, other model providers will start to support the
feature. In the example code for this pattern in the GitHub
repository, we used Meta’s Llama 3.2 model because it is
open-weights and provides read-and-write access to the
logprobs.
A second key consideration is that intercepting the
sampling means that each sequence being generated
requires communication between the model and the client
code. Unless the model is locally hosted or deployed in such
a way that you can run client code on a colocated processor
(talk to your model provider about that), such
communication requirements might add unacceptable
latency. This means Logits Masking is often applicable only
to locally hosted models. However, it provides a way for
these smaller models to match the performance of larger,
more costly models on certain types of complex problems.
A third consideration is that Logits Masking works by
censoring certain generations. If there’s no candidate token
sequence that meets the rules, you won’t be able to
generate valid content. In the pattern discussion, we

-- 89 of 840 --

suggest regenerating from a different starting point in this
situation, but a simpler way is to raise an error or refuse
the request. It’s important for AI engineers using Logits
Masking to provide enough information in the prompt to
make this a rare occurrence.
Self-Check (Pattern 31 in Chapter 9) is another use of
logits.
References
In reinforcement learning, the idea of zeroing out logits is
called invalid action masking. Its first recorded use was by
Vinyals et al. (2019) in the game StarCraft II. Theoretical
justification for this practice was provided by Huang and
Ontañόn (2020).
Romain Florenz (2025) creates social graphs with LLMs by
using a finite-state machine as the Logits Masking
mechanism that iteratively guides token generation.
Pattern 2: Grammar
The Grammar pattern provides a way to ensure that
generated text conforms to style rules that can be
represented as a context-free metasyntax—which is a
formal way to describe the allowable structures and
compositions of phrases and sentences while imposing few
to no restrictions on the actual content. Common situations
in which this is the case include ensuring that the content
fits a specific data schema or is in a standard data format.

-- 90 of 840 --

Problem
In many cases, you’d like the text generated by the LLM to
follow a specific format—which could be as simple as a
comma-separated list or as complex as a syntactically valid
structured query language (SQL) statement. This is often
because you are going to hand the generated text to a
downstream application, which expects to operate on the
LLM response without having to do all sorts of parsing and
validation.
Some naive approaches would be to state the format you
want in the prompt (“provide the output in JSON”) or to
provide a few examples of the format you want (“structure
the output like this”) and hope that the LLM always
generates text that follows the syntax of the examples.
Some model providers, such as Anthropic, encourage this
approach, but the problem is that relying on the LLM’s
ability to follow instructions is brittle (since it has a chance
of breaking each time the LLM version changes), unreliable
(since LLM generation is stochastic), and costly (since it’s
typically the larger models that are better at instruction
following). What makes this an antipattern is that every
consumer of the LLM call has to guard against the LLM
potentially failing to follow instructions.
A better approach is to represent the rules you want in a
generalizable way, which is called a grammar. Then, the
model framework will apply your grammar specification to
constrain the set of tokens it generates, so that the
generated text will conform exactly to the grammar.
Solution
When a foundational model generates text, it does so token
by token. At each point, it generates a set of candidate

-- 91 of 840 --

tokens that could follow and then chooses among them.
Some model providers and frameworks allow you to specify
a grammar to apply to these candidate tokens. The model
framework can restrict the next token to the ones legally
allowed by the grammar, and it does so by zeroing out the
probability of disallowed tokens.
TIP
You can think of the Grammar pattern as the model framework that
does Logits Masking (Pattern 1) on your behalf. Therefore, we
encourage you to also read through the section on Logits Masking to
better understand the Grammar pattern. In particular, we cover
logits processing in much more detail there.
You can specify the grammar directly by using a grammarconstrained logits processor, or you can use more userfriendly options, such as specifying a data format or
passing in a schema description. Let’s look at all three
options. The full code for this pattern is in the
examples/02_grammar folder in the GitHub repository—we
show only relevant code snippets in our discussion, so refer
to that code for complete details.
Option 1: Using the grammar-constrained logits
processor
To use the Grammar pattern, you provide a formal
grammar along with the model to the generation pipeline.
The pipeline will ensure that the grammar rules are used to
constrain the tokens that the model outputs (see Figure 23).

---

## Sección 25: Chapter 2. Controlling

-- 92 of 840 --

Figure 2-3. Using Grammar to constrain the tokens that are output by the
model
When using the Transformers framework, you can
accomplish this with three steps:
1. Represent the syntax you want in the form of a
formal grammar.
2. Create a LogitsProcessor that will apply this
grammar.
3. Pass in the logits processor to the pipeline.

-- 93 of 840 --

Step 1: Create a formal grammar
The Transformer framework supports grammar
specifications in Backus-Naur form (BNF). This is great
because almost all formal formats and programming
languages have readily available BNF descriptions. For
example, you can find the BNFs for regular expressions, for
a SQL TIMESTAMP or CREATE INDEX statement, or for a
line of a CSV file by using a quick internet search for “BNF
for [insert topic].”
Thus, if you want the LLM to generate valid SQL
timestamps, you’d specify the grammar as a string:
grammar_str = """
timestamp_literal ::=
{ t 'yyyy-mm-dd hh:mi:ss' } |'date_literal time_literal'
date_literal ::=
{ d'yyyy-mm-dd'}
|mm-dd-yyyy| mm/dd/yyyy| mm-dd-yy| mm/dd/yy| yyyy-mm-dd
| yyyy/mm/dd| dd-mon-yyyy| dd/mon/yyyy| dd-mon-yy| dd/mon/yy
time_literal ::=
{ t 'hh:mi:ss'}|hh:mi:ss[:mls]
"""
Because allowed timestamps could contain just the date or
just the time, this grammar includes those two types as
well.
Step 2: Create a logits processor that applies grammar
Second, use the grammar string to create a grammarconstrained logits processor, as follows:
grammar = IncrementalGrammarConstraint(grammar_str,
"timestamp_literal",
pipe.tokenizer)
grammar_processor = GrammarConstrainedLogitsProcessor(grammar)

-- 94 of 840 --

You have to provide the root element of the grammar,
which is timestamp_literal, when creating the constraint.
In this way, you can pass in the grammar of the entire SQL
spec and still select the specific data type or instruction
that you want.
Step 3: Apply logits processing
Finally, pass the logits processor when invoking the
pipeline:
results = pipe(input_message,
max_new_tokens=256,
do_sample=False,
logits_processor=[grammar_processor])
Now, whenever the LLM generates text, the grammarconstrained logits processor will process the tokens, which
will zero out the probability associated with any tokens that
are not permitted by the grammar. Hence, the output will
always be text that conforms to the desired grammar.
Option 2: Using standard data format
If you want the response to be in a standard data format
that is directly supported by the model provider’s API, then
the usage is a lot simpler. For example, if you want JSON
responses from OpenAI, simply specify JSON when making
the call to the LLM:
response = client.chat.completions.create(
model=MODEL_ID,
messages=input_message,
response_format={"type": "json_object"}
)
Then, the content of the response message will be in JSON.
It’s essential that the prompt (either the system prompt or

-- 95 of 840 --

the user instruction) explicitly specifies that you want a
JSON output, so that it will generate the necessary tokens.
WARNING
The XML parser in LangChain is not an example of the Grammar
pattern, and that’s because it relies on the model’s instructionfollowing capability to create the XML tags needed. You should use it
with care since, unlike with the Grammar pattern, there’s no
guarantee that you’ll get back a compliant XML result.
Option 3: Using user-specified schema
In the previous JSON response, the JSON attributes and
elements were not specified. But what if we want to specify
the exact JSON attributes we need? Many models refer to
this functionality as structured output, and they support it
either through JSON itself or through Python dataclass (or
Pydantic) objects.
For example, if you want OpenAI to generate a receipt
consisting of line items, you can specify the schema of the
output JSON as follows:
"schema": {
"type": "object",
"properties": {
"quantity": {
"type": "int",
"description": "How many items were purchased"
},
"name": {
"type": "string",
"description": "Name of item purchased",
}
},
"additionalProperties": false,
"required": [
"quantity", "name"
]
}

-- 96 of 840 --

OpenAI also supports the Python dataclass, as in the
following Gemini example.
If you want Gemini to generate a receipt consisting of line
items, you can create a Python dataclass:
@dataclass
class LineItem:
description: str
quantity: int
amount: float
@dataclass
class Receipt:
items: LineItem[]
total_amount: float
Then, when invoking the model to generate content, you
specify the schema:
response = client.models.generate_content(
model='gemini-2.0-flash',
contents=[f"Parse the receipt contained in the image",
image],
config={
'response_mime_type': 'application/json',
'response_schema': Receipt,
},
)
The response itself is still a string and will be in JSON
format. The Pydantic object is used solely to specify the
structure of the JSON, but you can use the JSON parsing
library in Python to parse the JSON text into an object
belonging to the dataclass:
import json
data_obj = json.loads(
response.text,
object_hook=lambda args: Receipt(**args)
)

---

## Sección 26: Chapter 2. Controlling

-- 97 of 840 --

Python data classes provide a flexible and powerful way to
constrain the style of a GenAI model’s output. To
implement the structured outputs feature, the model
provider takes on the responsibility of performing Logits
Masking (Pattern 1). It does this server-side by converting
the schema or data class into rules or logic (see Figure 24).
Figure 2-4. Implementing the structured outputs feature

-- 98 of 840 --

Examples
Let’s look at a few illustrative examples for each of the
options discussed in the previous section.
Arithmetic expressions
Suppose you’re writing educational software for
elementary school students. You want the software to
generate arithmetic expressions, not actual answers. For
example, given a question such as “How many eggs are
there in a carton containing three dozen eggs?” you’d want
the model to respond with “number_of_dozens ×
number_per_dozen = number_of_eggs,” instead of
supplying just the answer (“36”).
You can use Grammar to enforce this constraint. To do so,
write a prompt that explains that you want the model to
generate an expression:
system_prompt = """
You are a math instructor. I will ask you a math question.
Respond with the mathematical expression that can be used to
solve the problem.
"""
This, however, is not enough. The model’s instructionfollowing capability is not perfect, and there is no
guarantee that it will output mathematical expressions. It
might simply provide the answer, or it might provide the
reasoning required to generate the answer.
To constrain the model, write a grammar for simple
arithmetic expressions:
grammar_str = """
root ::= (expr "=" ws term "\n")+
expr ::= term ([-+*/] term)*
term ::= ident | num | "(" ws expr ")" ws

-- 99 of 840 --

ident ::= [a-z] [a-z0-9_]* ws
num ::= [0-9]+ ws
ws ::= [ \t\n]*
"""
This grammar allows expressions that contain an equal sign
that connects terms and expressions. The expression itself
(expr) is one or more terms connected by -, +, *, or /. A
term could be an identity (num_dozen), a number (12), or
an expression surrounded by parentheses. The previous
grammar also defines an identity (ident), a number (num),
and a whitespace (ws).
Next, use this grammar to constrain the tokens allowed in
the response:
grammar = IncrementalGrammarConstraint(grammar_str, "root",
pipe.tokenizer)
grammar_processor = GrammarConstrainedLogitsProcessor(grammar)
Then, pass the grammar processor to pipe:
results = pipe(input_message,
max_new_tokens=256,
do_sample=False,
logits_processor=[grammar_processor])
Now, ask the model this question:
Bill has 3 apples and 2 oranges.
Mae has 2 apples and 4 oranges.
How many apples do Bill and Mae have in total?
This obtains the following response:
bill_apples + mae_apples = total_apples
3 + 2 = 5

-- 100 of 840 --

You can check that the grammar truly does constrain the
output by asking a question for which the right answer is
not allowed by the grammar:
Bill has 3 apples and 2 oranges.
Mae has 2 apples and 4 oranges.
Do Bill and Mae have more apples than oranges?
Now, the model outputs this:
3 + 2 = 5
2 + 4 = 6
The correct answer is (3 + 2) > (2 + 4), but our grammar
string doesn’t allow >, so the model cannot output it. The
constraint is therefore working properly.
The pipe separator
Suppose that you want the LLM to extract three pieces of
information and output them, separated from one another
by the pipe character (|). You can do that by using this
prompt:
You will be given a short paragraph about a book.
Extract the author, title, and publication year of the book.
Return the result as author | title | year
If any piece of information is not found, fill the spot with
NULL.
To constrain the model to produce precisely this format,
use the following grammar string:
record ::= author separator title separator year
author ::= [a-zA-Z ]* | unk
title ::= [a-zA-Z ]* | unk

-- 101 of 840 --

year ::= [1-2][0-9][0-9][0-9] | unk
unk ::= "NULL"
separator ::= "|"
This grammar allows names and titles to consist of
lowercase and uppercase letters and spaces, but not nonEnglish characters such as those with accent or diacritical
marks. This can be important if your downstream
processing code is a legacy system that expects 7-bit ASCII
characters. Thus, say you pass in this paragraph:
Love in the Time of Cholera (Spanish: El amor en los
tiempos del cόlera) is a novel written in Spanish by
Colombian Nobel Prize–winning author Gabriel García
Márquez and published in 1985.
Then, the model will output the author’s name with the
accents removed:
Gabriel Garcia Marquez | Love in the Time of Cholera
|1985
Next, say you pass in this paragraph:
The Tirukkural (Tamil: த    ற , lit. “sacred verses”)
is a classic Tamil language text whose authorship is
traditionally attributed to Valluvar, also known in full as
Thiruvalluvar. The text has been dated variously from 300
BCE to the 5th century CE. The traditional accounts
describe it as the last work of the third Sangam, but
linguistic analysis suggests a later date of 450 to 500 CE
and that it was composed after the Sangam period.
The model will then output this:
Valluvar | The Tirukkural |NULL
The grammar allows author, title, and/or year to also take
on the literal value NULL. With conflicting information about

---

## Sección 27: Chapter 2. Controlling

-- 102 of 840 --

the year in the text, the LLM chooses NULL as the extracted
value for the year. Also, although the paragraph includes
the title in two forms (Tirukkural and த    ற ), only
one of them matches the grammar specification—and that’s
the one that shows up in the result.
You can also use the Grammar pattern to ensure that
generated content is valid, as long as the validation rules
can be expressed in BNF.
JSON output format
Normally, this pattern requires you to define a grammar.
However, because nearly all hosted foundational models
support the ability to generate JSON, you have a more
convenient approach available to output JSON. Here’s how
you could extract the author, title, and year by using
OpenAI and JSON mode:
def parse_book_info(paragraph: str) -> str:
system_prompt = """
You will be given a short paragraph about a book.
Extract the author, title, and publication year of the book.
Return the result as JSON with the keys author, title, and
year.
If any piece of information is not found, fill the spot with
NULL
"""
input_message = [
{"role": "developer", "content": system_prompt},
{"role": "user", "content": paragraph}
]
response = client.chat.completions.create(
model=MODEL_ID,
messages=input_message,
response_format={"type": "json_object"}
)
return response.choices[0].message.content

-- 103 of 840 --

When you pass in the paragraph about Love in the Time of
Cholera, the output JSON is this:
{
"author": "Gabriel García Márquez",
"title": "Love in the Time of Cholera",
"year": 1985
}
When you pass in the paragraph about the Tamil classic
text, the output JSON is this:
{
"author": "Valluvar",
"title": "The Tirukkural",
"year": "NULL"
}
Even though these JSON fields are author, title, and year,
this is not constrained and relies on having a high-capacity
model like GPT-4o-mini. The JSON mode doesn’t constrain
whether the author’s name contains accent marks—
sometimes it will, sometimes it won’t. Similarly, the JSON
mode doesn’t constrain the book’s title to be only English
characters, so you should guard against the extraction
returning the Tamil name at least sometimes.
Extracting invoice information
Besides JSON, another common format that is supported
out of the box is Pythonic data classes. So, you don’t need
to define a grammar string for these either.
If you want to consistently extract three pieces of
information (purpose, amount, and currency) from emails
requesting payment, you can define an Invoice class using
Python:

-- 104 of 840 --

from dataclasses import dataclass
from enum import Enum
class CurrencyEnum(str, Enum):
USD = 'USD'
UKP = 'UKP'
INR = 'INR'
EUR = 'EUR'
@dataclass
class Invoice:
purpose: str
amount: float
currency: CurrencyEnum = CurrencyEnum.USD
Then, to parse invoice information from a paragraph of
text, you can use the PydanticAI framework to get
structured outputs in an LLM-agnostic way:
from pydantic_ai import Agent
def parse_invoice_info(paragraph: str) -> str:
system_prompt = """
You will be given a short snippet from an email that
represents an invoice.
Extract the purpose and amount of the invoice.
"""
agent = Agent(model,
result_type=Invoice,
system_prompt=system_prompt)
response = agent.run_sync(paragraph)
return response.output
In this framework, response.output returns a Python data
object.
Next, pass in the input text:
Requesting reimbursement for taxi ride to airport. I paid
$32.30.
And in response, we get this:

-- 105 of 840 --

Invoice(purpose='taxi ride to airport', amount=32.3,
currency=<CurrencyEnum.USD: 'USD'>)
Because of the Grammar pattern, we are guaranteed to get
an Invoice object.
DON’T BEG FOR COMPLIANCE
Begging an LLM to produce format in a specific form is an
antipattern. Don’t just hope that the LLM will comply with a prompt
like this:
Please do not add any extra formatting or lengthy explanations.
Just answer “YES” or “NO.” Make sure to use all caps.
Instead, use Grammar to ensure compliance:
from typing import Literal
agent = Agent(model,
result_type=Literal["YES", "NO"])
Considerations
Grammar is a way of specifying a set of constraints in the
form of a metasyntax to ensure that a model response
conforms to that metasyntax.
Variations
The canonical way to provide a metasyntax is to specify a
BNF grammar for your constraints and then use a
framework class that applies the grammar to perform
Logits Masking. An easier way to specify your constraints is
as a Python data (Pydantic) model using the corresponding
capability in the foundational model’s API.
The Pydantic approach has these benefits over BNF:
Ease of use

-- 106 of 840 --

It’s easier to write a dataclass consisting of a few classes
and attributes than it is to specify rules in BNF.
Latency
BNF constraints are applied via Logits Masking by the model
framework, and they’re therefore applied client-side. On the
other hand, Pydantic constraints are applied by the model
provider and are therefore applied server-side in the case of
APIs such as GPT-4, Gemini, and Claude. Therefore, the
Pydantic approach reduces the number of network calls.
Model support
Using BNF requires access to logprobs, and as mentioned in
the “Caveats” section of “Logits Masking (Pattern 1),” support
for this is not universal. On the other hand, every modern
model supports Grammar constraints via Python
dataclass.
The BNF approach is nevertheless more flexible than the
Pydantic approach, and you need to use it if your style rules
involve more than just data formats. For example, it’s
possible to express validation rules as BNF, whereas any
validation beyond Enum is hard to do in Pydantic. To
illustrate, here’s a potential BNF grammar that a company
might employ if it accepts three types of United States (US)
credit cards:
<credit_card_number> ::= <visa_number> | <mc_number> |
<amex_number>
<visa_number> ::= "4" <digit>{12,15}
<mc_number> ::= ("51".."55" <digit>{14}) | ("2221".."2720"
<digit>{12})
<amex_number> ::= "34" <digit>{13} | "37" <digit>{13}
<digit> ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" |
"9"

---

## Sección 28: Chapter 2. Controlling

-- 107 of 840 --

It’s considerably harder to do this in Pydantic since you
would have to write validator logic—no longer would this
be just a simple dataclass:
class CreditCard(BaseModel):
number: str
@field_validator('number')
@classmethod
def validate_number(cls, value: str) -> str:
value = value.replace(" ", "").replace("-", "")
if not value.isdigit():
raise ValueError("Credit card number must contain
only digits.")
length = len(value)
first_digit = value[0]
first_two_digits = value[:2]
first_four_digits = value[:4]
first_six_digits = value[:6]
# Visa
if first_digit == '4' and (length == 13 or length == 16):
return value
# Mastercard
if (first_two_digits in ('51', '52', '53', '54', '55') or
2221 <= int(first_four_digits) <= 2720) and length ==
16:
return value
# American Express
if first_two_digits in ('34', '37') and length == 15:
return value
raise ValueError("Invalid credit card number format.")
Although we’ve described the schema approach in the form
of a Python dataclass, the capability to represent a
schema using data classes is not restricted to Python. For
example, JavaScript developers can take advantage of
Ollama’s and OpenAI’s support for schema specification by
using Zod.

-- 108 of 840 --

Alternatives
Many of the alternatives to Logits Masking—such as Style
Transfer (Pattern 3), using a more powerful model, try and
try again, and Reflection (Pattern 18)—are also alternatives
to Grammar for the same reasons. Rather than repeating
the discussion here, we refer you to the “Alternatives”
section of “Logits Masking (Pattern 1).”
Logits Masking is itself an alternative to Grammar.
Consider Logits Masking rather than Grammar if any of the
following apply:
The rules you want to apply can’t be represented as
a dataclass. Any rule that consists of logic rather
than mere representation fits this profile. For
example, you may want to mask out names of
competitor products, but only in specific situations.
The BNF grammar is very complex and hard to
debug.
The rules are dynamic and depend on the content.
For example, you may want to mask out the name of
a competitor product when the content is talking
about a new launch, but not if the content relates to
an in-market product.
The rules need to be fetched from a database or
rules engine. For example, rules on what to mask
may vary by client.
Masking depends on user input, such as in the
autocomplete use case that was discussed in “Logits
Masking (Pattern 1).”
The rules involve invoking an external tool or API.

-- 109 of 840 --

In these situations, consider implementing a logits
processor and writing code to determine whether to mask
an input token sequence.
Caveats
If the model does not output any tokens that meet the
grammar constraints, generation will fail. This failure can
manifest itself in the following ways:
Endless whitespace
Sometimes, the failure will take the form of an endless loop
of whitespace because whitespace is often allowed by the
grammar and is typically one of the tokens that’s always
available in the candidate space.
Increased refusals
At other times, the failure will take the form of increased
refusals, especially if you ask the LLM to produce nested
fields or overly long structures. This is because the
likelihood of arriving at a point where none of the candidate
output tokens fits the grammar increases with increased
length and complexity.
Inaccurate results
Only tokens that are allowed by the grammar will be
included in the output. If your grammar is too restrictive,
you might get inaccurate results. Therefore, it can be helpful
to give the model an option that allows it to escape the
restrictive grammar. For example, to specify that a field
should be a float but also allow the model to emit the
"Unknown" string, you can define the field as follows:
currency_rate: float | Literal["Unknown"]

-- 110 of 840 --

The Grammar pattern has a couple of alternate names.
Because data structures are a common format for
expressing the grammar specification, this pattern is also
sometimes called structured outputs. Also, because it
works by constraining the logits that are possible, it’s
sometimes called constrained decoding. However, be
careful—support for “structured outputs” by a model or
framework does not necessarily mean that the Grammar
pattern is being employed. For example, at the time we are
writing this (June 2025), LangGraph implements support
for structured outputs by using an additional LLM call to
postprocess the original response into the desired format.
Such a postprocessing approach is more wasteful, more
expensive, and less reliable than the Grammar pattern that
ensures compliance through the manipulation of logits.
References
Early approaches that incorporated the grammar into the
prompt, like the one in Wang et al.’s 2024 paper “Grammar
Prompting for Domain-Specific Language Generation with
Large Language Models”, have turned out to be errorprone. Using grammar masking and constrained decoding
was first detailed in a 2024 paper by Netz, Reimar, and
Rumpe, but the idea was implemented earlier, in 2023, by
Rickard for regular expressions and Jones for BNF
grammars. Grammar need not be strict—in 2025, a group
of MIT researchers assigned weights to structured data
continuations using Monte Carlo simulations and
demonstrated that this makes AI-generated code more
accurate.
The sieves library relies on Grammar to implement NLP
tasks reliably. Grammar is now a cornerstone of agent
frameworks and capabilities such as Fireworks AI,

---

## Sección 29: Chapter 2. Controlling

-- 111 of 840 --

Databricks, MCP, and Dify. Grammar is supported by GPT-4
and Gemini.1
Pattern 3: Style Transfer
The Style Transfer pattern allows you to teach a GenAI
model to convert content in a readily available form into
content in some desired style. You do this by showing the
model example input-and-output pairs that illustrate the
conversion. There are two variants: few-shot learning, in
which you have just a few examples and you put them into
the prompt context, and model fine-tuning, in which you
adapt a pretrained model to do the conversion by using a
large dataset of example input-and-output pairs.
In the first two pattern sections of this chapter, we
discussed how to control the style of the model’s
generation through either dynamic logic (via Pattern 1,
Logits Masking) or structured rules (via Pattern 2,
Grammar). In many situations, it’s difficult to express
nuances through rules, so you can use Style Transfer to
show the model some examples and let it extrapolate from
those examples to unseen situations.
Problem
Suppose you want a GenAI model to generate content that
mimics a specific tone and style of texts. Let’s assume that
your situation satisfies these three criteria (also see
Figure 2-5):
Available content
The content that you want is readily available, but it’s just
not in the tone or style you want to use. Perhaps the content
is available in academic research papers, but you want to

-- 112 of 840 --

use parts of the content (perhaps the methods and results) in
marketing brochures targeted at nontechnical executives.
Nuanced style
It’s difficult to express the nuances of what you want in a
few rules. The characteristics of the desired style might be
very subtle, and humans may find it hard to express what
these characteristics are. However, humans will often
recognize the right style. (“I know it when I see it.”) For
example, it’s hard to express what vocabulary is allowed in
marketing brochures. Can we use the term fine-tuning? How
about reinforcement learning?
Example conversions
You do have examples in which experts took readily
available content and converted it into content in the style
you want to use. For example, you may have a few
handcrafted marketing brochures that were written based
on research articles.
The Style Transfer pattern applies when your situation
satisfies these three criteria.

-- 113 of 840 --

Figure 2-5. Style Transfer: Using example input-output pairs to convert readily
available content into content in the desired style
Here are a few situations that might meet the three
criteria:
Converting academic papers into engaging blog posts

-- 114 of 840 --

This involves converting complex topics into lay terms to
reach a broader audience while preserving the accuracy and
core message.
Rewriting generic company content to reflect brandspecific style guidelines
For example, this could involve converting standard
helpdesk documentation to give it a warm, friendly tone that
matches your business brand.
Transforming social media content across different
platforms
This could involve taking a lengthy LinkedIn post and
adapting it for X or BlueSky’s short message format or
Instagram’s more visually focused style, while maintaining
the core message and brand voice.
Converting detailed technical documentation into different
proficiency levels
This involves taking complex technical documentation and
converting it into versions that are tailored to beginners,
intermediate users, or experts, with appropriate
terminology and explanations.
Converting notes into professional emails
This involves taking a short message from an executive and
converting it into a formal memo or email.
Simply asking a foundational model to carry out the task
without providing examples (zero-shot learning) doesn’t
work well. For example, you could ask OpenAI to convert
notes into a fully written email by using the following:

-- 115 of 840 --

messages = [
{'role': 'system',
'content': """You are a helpful assistant converting notes
to
professional emails.
"""},
{'role': 'user',
'content': """
urgent: need meeting minutes by {deadline}
for stakeholder presentation \ndetails:
- This is needed for our upcoming presi to stakeholders.
- will need ur help asap
- send 2 me when rdy
"""}]
response = client.chat.completions.create(model="gpt-3.5-turbo",
messages=messages)
When we did this, the model responded with the following
output:

-- 116 of 840 --

Output: Subject: Request for Meeting Minutes by
{Deadline} for Stakeholder Presentation
Dear [Recipient],
I hope this message finds you well.
I am reaching out to request your urgent assistance in
preparing meeting minutes for our recent meeting, which
are required for our upcoming stakeholder presentation.
The meeting minutes are crucial for ensuring that we
accurately represent the discussions and decisions made
during the meeting to our stakeholders. Your prompt
attention to this matter is greatly appreciated.
Please send the completed meeting minutes to me as
soon as they are ready. If you have any questions or need
further information, please do not hesitate to reach out to
me.
Thank you in advance for your prompt action on this
request.
Best regards,
[Your Name]
So, the initial prompt gets you pretty far, but it fails in two
ways. First, it likely doesn’t use your preferred style
(length, vocabulary, reading level, tone, etc.) for this task.
That’s not surprising, because OpenAI doesn’t know
whether you are a bank that uses formal language or a tech
startup with a more casual and direct communication style.
Second, the placeholders used here are quite arbitrary. Is it
[Your Name] or [Name]? Not knowing the exact
placeholder will make it difficult for downstream
applications to replace it with the actual value, so you need

---

## Sección 30: Chapter 2. Controlling

-- 117 of 840 --

standardized placeholders for customizable data like
names, locations, and dates. Otherwise, each time you
generate an email, it could appear in a completely different
style.
Solution
The solution proposed in the Style Transfer pattern is to
use input-output examples to control the style of content
generated by a GenAI model. This way, you’ll get more
consistent results.
Suppose you have a large number of research papers you
would like to convert into blog posts. Let’s also say you
have a few examples of research papers that were
converted manually into blog posts. Style Transfer lets you
use the example input-and-output pairs (the few research
papers that were converted into handcrafted blog posts) to
convert any given research paper into a blog post, in the
same style as the handcrafted blog posts (refer back to
Figure 2-5).
We’ll discuss two approaches to Style Transfer: few-shot
learning and model fine-tuning. We’ll also demonstrate that
this pattern is not limited to text by showing you an
example of image style transfer.
Option 1: Few-shot learning
In few-shot learning, you provide a number of examples of
input and expected outputs in your prompt (see Figure 26). The examples should be relevant to the expected
problem space, and you should typically add 1 to 10
examples to your prompts. Think of it like a student-teacher
relationship: the teacher (you) shows the LLM (the student)

-- 118 of 840 --

a few examples and expects the student to mimic the
examples in future problems.
Figure 2-6. Example workflow for few-shot learning
A minimal implementation for such a workflow could look
like this:
def generate_text(input_text: str) -> str:
in_context_examples = [{
"input_text": "The movie was fantastic!",
"output_text": """The cinematography was exceptional,
with masterful
use of light and shadow to convey emotional depth.
""",
},
… # more examples
]

-- 119 of 840 --

# Format examples into a prompt
prompt = "Convert the following text into the following
style:\n\n"
for in_context_example in in_context_examples:
prompt += f"""
Input: {in_context_example['input_text']}
Output: {in_context_example['output_text']}
"""
# Add the new text to convert
prompt += f"""
Input: {input_text}
Output:
"""
Option 2: Model fine-tuning
Fine-tuning an LLM is more complex than few-shot
learning, but it provides you with more fine-grained control
and reduces inference costs.
In fine-tuning (see Adapter Tuning [Pattern 15] in

---

## Sección 31: Chapter 5), you use a number of examples as expected

outputs of the LLM generation: usually a hundred or so, but
it could be in the thousands. You then pair them with the
corresponding inputs and fine-tune the LLM to generate
the expected outputs (see Figure 2-7).

-- 120 of 840 --

Figure 2-7. The fine-tuning process
This approach has several advantages, including the
following:
Higher fidelity
You can fine-tune a model beyond a few examples. Typically,
this will lead to more satisfying results, especially for
complex tasks. The task of restyling research papers as
marketing brochures, for example, requires the model to

-- 121 of 840 --

learn a lot of vocabulary mappings, and this is more likely
with fine-tuning.
Faster, less expensive inference
You can reduce the prompt to a bare minimum because the
model will already be tuned to the given task. The prompt
doesn’t include examples of other research papers, either—
only the one being converted. This reduces the inference
latency because the LLM won’t have to process the examples
in the prompt. Shorter prompts also typically incur lower
costs (but see this pattern’s “Considerations” section for a
more nuanced discussion of this point).
These two advantages build on each other. In many cases,
you can even tune a smaller model for a complex task that
originally failed with the in-context few-shot learning
approach. This leads to even faster inference and even
lower inference and hosting costs.
However, there are also a number of downsides to finetuning, including the following:
Data curation and governance
You need to collect, curate, and maintain a training set,
which increases overhead.
Training costs
Fine-tuning requires training an LLM. You might have to
repeat the fine-tuning over time if the desired style changes,
for business reasons or to meet the needs of downstream
applications.
Training expertise

-- 122 of 840 --

You’ll need AI engineering and data science expertise in
your company to fine-tune an LLM. As Figure 2-7 illustrates,
you need to consider a number of critical training
parameters. As we discussed in Chapter 1, fine-tuning can
lead to catastrophic forgetting—so you need to set the
learning rate carefully.
Ops expertise
You often need AI engineering and large language model
operations (LLMOps) expertise in your company to host and
operate a fine-tuned LLM for this specific task. This is a
rarer, more expensive skill than being able to stuff examples
into a prompt.
You can fine-tune OpenAI’s GPT-3.5-turbo model by
uploading the training file and creating a fine-tuning job
(see this fine-tuning example):
training_file = client.files.create(
file=open("fine_tuning_dataset.jsonl", "rb"),
purpose="fine-tune"
)
job = client.fine_tuning.jobs.create(
training_file=training_file.id,
model="gpt-3.5-turbo" # Base model to fine-tune
)
In this case, OpenAI deploys and hosts the model for you,
thus reducing the engineering expertise needed.
Then, poll the job status and wait until it either succeeds or
fails:
while True:
job_status = client.fine_tuning.jobs.retrieve(job.id)
if job_status.status in ['succeeded', 'failed']:
break

-- 123 of 840 --

Once the job is complete, you can use the OpenAI client API
to invoke the fine-tuned model the same way you invoke a
foundational model:
completion = client.chat.completions.create(
model=job_status.fine_tuned_model, # Use the fine-tuned
model
messages=messages
)
print(completion.choices[0].message.content)
The result matches our desired style:
Subject: Request for meeting minutes
Body: Hi {name},
I hope you’re doing well.
I’m reaching out because I need meeting minutes by
{deadline}.
This is needed for our upcoming presentation to
stakeholders. Could you please help me with this?
Let me know if you need any additional information.
Thank you in advance for your help.
Best,
{name}
This response is more to the point and follows our specific
placeholder patterns.
Example: Style Transfer in images
The concept of Style Transfer isn’t limited to text; it can
also be applied to other data types, like images.

-- 124 of 840 --

Let’s say that you want to generate a Star Wars–themed
poster in the style of Caspar David Friedrich’s famous
painting Wanderer Above the Sea of Fog (see Figure 2-8).
Figure 2-8. Style Transfer of Caspar David Friedrich’s painting (top right) to
create a Star Wars image (bottom)

-- 125 of 840 --

You can perform Style Transfer by using the RunwayML
Stable Diffusion model and the diffusers library from
Hugging Face (the complete code is in the GitHub
repository):
pipe = StableDiffusionControlNetImg2ImgPipeline.from_pretrained(
"stable-diffusion-v1-5/stable-diffusion-v1-5",
controlnet=controlnet,
torch_dtype=torch.float16,
use_safetensors=True
)
While it is possible to carry out style transfer using just the
original painting, it has been found that you get better
results if you provide a control image that gives the Style
Transfer pattern hints about what aspect(s) of style are
important to preserve. Traditional neural Style Transfer
often distorts an image’s spatial layout and depth
relationships, but depth-aware approaches can help
preserve these important aspects.
Because the perspective view is so important in the
painting, let’s use a depth map as our control image. A
depth map builds a 3D model of the scene in the image by
computing the distance of each pixel from a vantage point.
A pipeline to estimate the depth already exists in the
diffusers library:
depth_estimator = pipeline("depth-estimation")
depth_image = depth_estimator(image)["depth"]
…
wander_depth_map = ...unsqueeze(0).half().to("cuda")
The resulting depth map is shown to the right of the
painting in Figure 2-8. In it, the closer pixels are whiter and
pixels farther away are darker.

---

## Sección 32: Chapter 5), you use a number of examples as expected

-- 126 of 840 --

Next, you send a text prompt, the style image, and the
spatial-information control image to the pipeline, as
follows:
prompt = "Star Wars' Darth Vader with a red light saber"
output = pipe(
prompt,
image=wanderer_image,
control_image=wanderer_depth_map, …
).images[0]
The result, shown at the bottom of Figure 2-8, is a Star
Wars version of Caspar David Friedrich’s painting. Note
that the wanderer has been replaced by Darth Vader but
that the inspiration of the original painting is quite obvious
in the way the spatial perspective, the character’s pose,
and the background have been preserved. The wanderer’s
cane has become a lightsaber, but it remains in the same
position.
That said, there is some creativity as well—the generated
image includes spaceships on the distant horizon and the
character faces the viewer, whereas the wanderer in the
painting has his back to us. If you don’t want such
creativity, you could change the relative weights of the
style image and the content prompt. For more details and
examples of the image style transfer technique, we refer
you to the Hugging Face docs.
Considerations
In terms of implementation, providing style examples is
much simpler than using Logits Masking (Pattern 1) or
defining a dataclass to enforce a particular Grammar
(Pattern 2). But Style Transfer via few-shot examples
doesn’t guarantee strict enforcement of the implied style.

-- 127 of 840 --

Fine-tuning an LLM has a much higher “success rate” in
terms of style enforcement, but it is still only an implicit
enforcement. The complexity around the fine-tuning work
adds to the implementation’s complexity, so Logits Masking
and Grammar may be better approaches in situations
where conformance is essential.
On the other hand, Style Transfer may be preferable in
situations where conformance isn’t essential, where you
can’t easily represent the desired style, or where the
implementation’s simplicity is very appealing (such as in
prototypes). It helps to be aware of a few factors that affect
how much conformance you do get:
Bigger models lead to better results
With a few examples, you can leverage the LLM’s vast
knowledge and ability to adapt patterns for your solutions.
Open source models (Llama, Qwen) or closed source models
(Anthropic, OpenAI, etc.) can extrapolate examples really
well, but models with more parameters will have an easier
time generalizing from your examples. Therefore, if you see
poor results with your first tries, try reviewing the examples,
adding more examples, or switching to a bigger model. In
production applications, note that there are constant tradeoffs between more model parameters and low inference
costs and latencies.
Limits of the context
Adding examples to an LLM prompt via in-context learning
will increase the input token length. This has several effects
on the LLM’s generation. First, although LLMs have shown
significant improvements in context lengths, they’re
generally limited in their context length. Therefore, the
more examples you add, the more you lose the context
window availability for the actual prompt. With too many

-- 128 of 840 --

examples, it is also possible that the “message” of the
examples will get lost or that the examples can contradict
one another. That “confuses” the LLM, and the quality of the
results is often poor.
Inference speed
As you know, the more examples you add to your prompt,
the longer the input into the LLM will be. Longer inputs into
the LLM also mean longer latency because the model needs
to apply the attention mechanism to a more extended
context. This will ultimately affect the inference speed from
input to generation, since the LLM needs to process more
tokens. Ultimately, in-context learning with longer prompts
will be slower than fine-tuned models (even assuming the
same base model) with shorter prompts.
If you are reaching the limits of your context window or you
experience a reduction in inference speed, consider context
engineering or selecting the best examples to include in the
prompt context. Also, consider Adapter Tuning (see

---

## Sección 33: Chapter 5) as an alternative to in-context learning. Often,

you can fine-tune a smaller LLM to have the same
performance as a larger model on a narrow task, and this
consideration can be critical if your LLM application serves
users in real time.
References
Gatys, Ecker, and Bethge introduced the idea of separating
content and style using convolutional neural networks in
2015, and the field of style transfer in images saw rapid
progress, a review of which was provided by Jing et al. in
2018. Style transfer of text using LLMs was introduced by
Reif et al. in 2021, in a paper that also discusses using

-- 129 of 840 --

augmented zero-shot learning to modify text. (We do not
cover this variant in the pattern discussion because it is
less commonly used.)
Addlly transfers the style of existing product descriptions to
new products to be listed in Shopify in order to maintain
brand voice and format.
Pattern 4: Reverse Neutralization
Reverse Neutralization allows you to generate content in
some desired style. You do this by using a fine-tuned model
to postprocess the output of a GenAI model (which will be
in a neutral form) into the desired style.
As with Pattern 3, Style Transfer (and unlike with Pattern
1, Logits Masking, or Pattern 2, Grammar), all you need for
this pattern are examples—you don’t need to represent the
desired style using rules or grammar. Unlike with Style
Transfer, you can use Reverse Neutralization even if you
don’t have handcrafted input-and-output pairs.
Problem
Suppose you wish to generate content in your personal
style. You’ll ask the bot to generate a letter to Lufthansa
complaining about lost baggage, and you want the letter to
be written as if you wrote it. The letter has to use the words
you tend to use, in the tone you tend to use, be of the same
length as your letters, and so on.
Zero-shot learning is out: you can ask an LLM to write a
complaint letter, but it will not be in your personal style.
In the Style Transfer pattern, we assumed that you had
some examples of content that had been hand-converted

-- 130 of 840 --

from the readily available format to the desired format. You
could then use these examples to create a fine-tuned model
that would perform the restyling. But in the current
scenario, Style Transfer is out because you don’t have a
letter to Lufthansa that you can reformat into the desired
style. What you do have are emails in your personal style—
but they are on other topics, so you need to generate a
letter from scratch.
Or you could try an even bigger challenge: using localized
legal content. Say you live in the Indian state of Tamil Nadu
and you want the bot to generate a letter to Lufthansa
complaining about lost baggage that uses appropriate legal
language for that jurisdiction.
Again, zero-shot learning is out: it’s too much to expect an
LLM to generate Indian legalese. And you still don’t have
previous complaint letters to Lufthansa because this is a
new topic. What you do have are legal notices on other
topics written by your Indian law firm.
Solution
Reverse Neutralization works by using an intermediate
neutral form that the GenAI model can readily generate.
First, you create a fine-tuned model that can convert text
from the intermediate neutral form into the desired style.
Creating the fine-tuned model consists of the following
three steps (also see Figure 2-9):
Step 1. Generating a neutral form
Take several emails written in your personal style and ask
the foundational model to rephrase them into a neutral
form, perhaps as professional emails exchanged between
two executives.

-- 131 of 840 --

Step 2. Creating a training dataset
Reverse the inputs and outputs of Step 1, so your inputs are
the professional emails and the outputs are the emails in
your personal style. This forms the training dataset.
Step 3. Fine-tuning the model
Create a fine-tuned model by training the base model on the
training dataset. The resulting model is capable of
converting neutral text into emails in the desired style.

-- 132 of 840 --

Figure 2-9. Reverse Neutralization during creation of the training dataset for
the fine-tuned model

-- 133 of 840 --

Once you have the fine-tuned model, inference consists of
two steps (see Figure 2-10). First, you’ll use the
foundational model to generate content in the neutral form.
In our example, this would be a letter from an attorney to
an executive at Lufthansa. Second, you’ll use the fine-tuned
model to convert the neutral letter into one that reflects
your personal style.
Figure 2-10. Inference in Reverse Neutralization: One LLM call to the
foundational model to generate the intermediate neutral form and a second to
the fine-tuned LLM to convert the content to the desired style
This pattern gives you a way to train models that emit
content that matches your company’s brand. You can use it
to generate training data for LLM fine-tuning tasks when
styled content is readily available (e.g., product
descriptions or customer reviews) but a neutral version as
generation input is missing.

-- 134 of 840 --

---

## Sección 34: Chapter 5) as an alternative to in-context learning. Often,

Example 1: Generating Legal Text
Let’s look at an end-to-end example of generating a legal
complaint that we want to send to Lufthansa about lost
luggage. The foundational model will struggle to create an
appropriate legal notice, especially given that legal
standards and norms vary from one place to the next.
Let’s suppose that your law firm has a set of legal notices
on a wide variety of topics. The first step is to use an LLM
to neutralize these legal texts (the full code is on GitHub):
messages = [
{'role': 'system',
'content': """You are a helpful assistant who will convert
the given text
into text that is understandable by a freshman college student.
"""},
{'role': 'user',
'content': """Neutralize the tone and style from the
following legal text
and express it for a nonlegal audience: “The plaintiff hereby
moves for summary
judgment pursuant to Rule 56(c), asserting that the defendant's
aforementioned
conduct constitutes a material breach of the contractual
obligations set forth
in Exhibit A, thus entitling the moving party to compensatory
damages as a matter
of law.
"""}]
You’ll notice a number of legal terms, like plaintiff, material
breach, and summary judgment, as well as specific stylistic
elements, like hereby moves for, aforementioned conduct
constitutes, and thus entitling. Notice also that the
prompt’s system instruction specifies that the LLM should
rephrase the text in “language suitable for a college
student.” This will elicit plain English, which will be our
neutral form.

-- 135 of 840 --

When you ask the LLM to neutralize this highly specific
legal text, you’ll get a response similar to the following:
Output: The person suing is asking the court to decide
the case without a full trial. They say that the other
person broke the contract listed in Exhibit A, and they
should get money to make up for it.
Notice that this preserves the meaning while neutralizing
distinctive stylistic elements like the complex vocabulary,
formal tone, and elaborate structure. For example, the
model replaces plaintiff with person and material breach
with broke the contract. The neutral version of the text
preserves the core content of someone wanting a court
decision without going to trial.
Very importantly, the neutral content is rather generic and
can be generated by an LLM. So, if you want to take your
Lufthansa complaint and make it a legal action, you can use
a fine-tuned LLM that has been trained on the reversed
inputs and outputs of this process. In short, the
foundational model will generate a complaint letter in plain
English, and the fine-tuned model will convert it into
legalese.
Example 2: Personal style
Let’s build an end-to-end example of using Reverse
Neutralization for personalization. Here again, you have a
lot of content in your personal style (the desired output),
but you don’t have an input to use as training for the finetuning operation.
Step 1: Neutralization
In the first step, you need to generate the input for your
fine-tuning process. Let’s say you have a number of old

-- 136 of 840 --

emails that reflect your tone and style, and you want to
generate a neutral representation of that. To clearly show
the effect of personalization, we’re going to use a set of
emails that’s a bit over the top in terms of personal style.
The first step is to use an LLM to generate neutral versions
of these highly personalized emails. You can do so by using
the following prompt:
Neutralize the tone and style from the following email to
make it professional and suitable for communication
between executives who may not know each other very
well.
**Email**:
“Subject: Welcome Aboard, Emily!
Body: Hi Emily,
Welcome to the Customer Success family! I am
absolutely thrilled to have you join us and can’t wait to
see the amazing things you will accomplish. Your passion
for helping others and your vibrant spirit are exactly
what we need! We’re all here to support you and make
your journey with us incredible.
Let’s make magic happen together!
Warmest regards,
Casey Brown
Customer Success Team Lead
The model will generate a neutral version that’s similar to
the following message. The version is neutral because it
doesn’t contain any of the writer’s personal style, such as
“Let’s make magic happen together!” or emojis.

-- 137 of 840 --

Subject: Welcome to the Team
Body: Hi Emily,
I would like to extend a warm welcome to you as a new
member of the Customer Success team. We are looking
forward to your contributions and are confident that your
skills and experience will be valuable to our objectives.
Please know that you have the support of the team as you
transition into your new role.
I look forward to working together.
Best regards,
Casey Brown
Customer Success Team Lead
Step 2: Dataset creation
After generating the neutral version via an LLM, you can
flip the results from the output and generate training pairs,
like the following example does.
The data structure changes with the model provider, but
the general concept remains unchanged: you pair the
system prompt and user prompt (the inputs) with your
expected assistant response (the output).
Here’s an example of such a pair using the OpenAI finetuning API:
{"messages": [
{"role": "system",
"content": """You are a helpful assistant converting the
neutralized email
into personalized email.
"""},
{

---

## Sección 35: Chapter 5) as an alternative to in-context learning. Often,

-- 138 of 840 --

"role": "user",
"content": """Subject: Welcome to the Team\n\nHi
Emily,\n\nI would like to
extend a warm welcome to you as a new member of the Customer
Success team. We are
looking forward to your contributions and are confident that your
skills and
experience will be valuable to our objectives.\n\nPlease know
that you have the
support of the team as you transition into your new role. \n\nI
look forward to
working together.\n\nBest regards,\n\nCasey Brown \nCustomer
Success Team Lead
"""},
{
"role": "assistant",
"content": """Subject: Welcome Aboard, Emily! \n\nHi
Emily,\n\nWelcome
to the Customer Success family! I am absolutely thrilled to
have you join us
and can’t wait to see the amazing things you will accomplish.
Your passion for
helping others and your vibrant spirit are exactly what we need!
We’re all
here to support you and make your journey with us
incredible.\n\nLet’s make magic
happen together! \n\nWarmest regards,\n\nCasey Brown
\nCustomer Success Team
Lead
"""}
]}
You typically need a hundred to a thousand examples of
input-output pairs for fine-tuning. Here, we used two
hundred examples and achieved good results.
Step 3: Fine-tuning
Fine-tuning LLMs is discussed briefly in Chapter 1 and in
more detail in the instruction tuning step of Evol-Instruct
(Pattern 16) in Chapter 5—please refer to those sections

-- 139 of 840 --

and their corresponding GitHub folders for implementation
details.
Here, we used the managed service from OpenAI,
uploading the fine-tuning dataset and getting back an
endpoint that points to a fine-tuned model.
You can try out the model by sending it a neutral email:
Subject: Request for Project Timeline Update
Body: Hi Sam,
I am writing to request an update on the project timeline.
Please provide the update by the end of the day, as it is
important for our upcoming steps.
Thank you.
Best,
Alex
The response is in Alex’s personal style:
Subject: Exciting Update: Project Timeline Request!
Body: Hi Sam,
I hope this message finds you well and energized! I’m
absolutely thrilled about the fantastic progress we’re
making on our project! I just couldn’t resist popping in to
ask for a quick update on our timeline. Your insight and
planning have been invaluable, and I can’t wait to see
what’s next on our journey to success!
Looking forward to hearing from you soon! Keep shining!
Warm regards,
Alex

-- 140 of 840 --

Step 4: Inference
Now, let’s do the end-to-end inference to generate a
personal email on a topic that’s not in the training dataset.
You can find the full version of this example on GitHub.
First, you’ll instruct a foundational model to write an email
based on the following prompt. Make sure your system
instruction states that the letter should be suitable for
communication between executives (meaning it should be
in the neutral form):
response = client.chat.completions.create(
model="gpt-3.5-turbo",
messages=[
{"role": "system", "content": """You are a helpful
assistant writing
letters suitable for communication between executives.
"""},
{"role": "user", "content": """Write a short email to
Gretl inviting
her to give a presentation on the marketing campaign around the
2026 FIFA World
Cup.
"""}]
)
When we tried it, the LLM generated the following neutral
email:

-- 141 of 840 --

Subject: Invitation to Present on Marketing Campaign for
2026 FIFA World Cup
Dear Gretl,
I hope this message finds you well. I am writing to
officially invite you to give a presentation on the
marketing campaign surrounding the 2026 FIFA World
Cup. Your expertise and insights would be invaluable to
our team, and we are eager to hear your thoughts on this
exciting project.
We believe that your unique perspective and experience
will bring a fresh and innovative approach to our
marketing strategies for this upcoming event. Your
presentation will provide valuable insights that will help
guide our team in creating a successful campaign.
Please let me know at your earliest convenience if you
are available and willing to present. We are looking
forward to hearing from you and are excited about the
opportunity to collaborate on this important project.
Thank you in advance for considering our invitation. We
appreciate your time and expertise.
Warm regards,
[Your Name]
[Your Title]
[Company Name]
Now, you can convert the neutral email into your personal
style by using the fine-tuned LLM. The personalized output
will look like this:

-- 142 of 840 --

Subject: Exciting Opportunity: Unleash Your
Marketing Magic at the 2026 FIFA World Cup!
Hi Gretl!
I hope this message finds you in fantastic spirits! I am
absolutely thrilled to invite you to present on our
electrifying marketing campaign for the 2026 FIFA World
Cup! Your creativity and insights are like a burst of
sunshine, and I can’t wait to see the magic you’ll bring to
this spectacular event!
Your innovative perspective is just what we need to make
this campaign unforgettable. Imagine the impact we can
create together! Your presentation will be the highlight of
our team’s year, and I’m beyond excited to hear your
thoughts and ideas!
Let me know your availability; I’m here to make it all
happen with a big smile!
Thank you for being amazing, Gretl!
Enthusiastically yours,
[Your Name]
[Your Title]
[Company Name]
In this two-step process, you used the foundational model
to generate letters on arbitrary topics and the fine-tuned
model to convert them into emails in the desired personal
style.

---

## Sección 36: Chapter 5) as an alternative to in-context learning. Often,

-- 143 of 840 --

Considerations
This pattern relies heavily on the model being able to
translate all relevant content into a neutral form that varies
from the original only in terms of style.
Choosing the neutral form
It’s important to select a neutral form that is repeatable. In
our prompt examples, we used phrases like
“communication between executives” and “reading level of
a freshman college student.” However, even these
definitions of what constitutes neutral are somewhat
subjective, and different LLMs might produce texts of
different complexity. LLMs aren’t free of bias, and their
definition of neutral might be different from your
application’s definition. Keep that in mind when using an
LLM to reverse-neutralize texts and double-check the
results to confirm their clarity and accuracy.
One way to evaluate this is by using the embeddings of the
original text and the generated neutral text. Their semantic
meanings should be highly similar, so the cosine similarity
of the two embeddings should also be close. Of course, you
should use this with care—the closest embedding is the one
that doesn’t change the text in any way, but such a
transformation will make it hard for the LLM to generate
text in the desired style.
Sometimes, the content is highly intertwined with the style,
and neutralizing the style may mean also losing
informational content. So, you should check the
neutralization results against the styled input to make sure
the content and intention are unchanged. In addition,
neutralizing the text too much can cause it to lose clarity,
which is known as over-neutralization.

-- 144 of 840 --

In practice, you might have to experiment with various
neutral forms and evaluate how well they preserve content
during neutralization as well as how well they generate the
desired style on unseen topics.
Dataset considerations
While generating input via LLMs is fast and fairly
straightforward, it’s crucial to craft the prompt for the
input generation task well. Make sure that you are
selecting good examples of the desired style and covering
the full range of content that the application will be
expected to generate.
You should also review the generated results carefully and
apply NLP techniques, such as topic modeling of the
selected inputs and raw dataset to ensure that you are
capturing their full range. Repeat this for the generated
neutral forms as well, to ensure that the generated text
maintains the topic diversity. Dataset-distribution errors
will cause failures in the overall project, since fine-tuning
heavily depends on generated input.
Other uses of neutralization
Even though we introduced reverse neutralization as an
intermediate format, there are situations where the neutral
format is useful as is. In such cases, you can use the
neutralization prompt engineering approach, but without
creating a fine-tuned model. For instance, to enhance
privacy and reduce bias, you can remove stylistic
characteristics from a text so that the generated text is
neutral and free of stylistic variations. To standardize
collaborative content, you can neutralize texts from
multiple authors so that they maintain a neutral tone.

-- 145 of 840 --

References
This pattern is analogous to back translation, which has
long been used to expand datasets (Beddiar, Jahan, and
Oussalah, 2021) in the field of machine translation. For
example, if you have an English-to-French translation
model, you can reverse the inputs and outputs to create
inputs for a French-to-English translation model. Edunov et
al. (2018) discuss the use of synthetic source sentences in
back translation.
Pattern 5: Content Optimization
Content Optimization is a pattern that uses preference
tuning to produce optimally performing content. Preference
tuning is a way of training an LLM on a dataset of paired
items so that it outputs responses that are closer to the
chosen items than the rejected ones. Unlike optimization
methods, in which optimization attempts to approximate an
independent source of truth, this pattern attempts to hack
the model to create content the evaluation method will
consider great.
Problem
Content is created to serve some purpose: to educate,
entertain, or drive sales. So, when you create content, you
want to do so in the style that best serves that purpose.
Traditional A/B testing is a simple approach to optimizing
style, but it only works if you have some hypothesis about
what style factors matter most in your scenario. For
example, suppose your hypothesis is that paragraph length
matters in educational content and that paragraphs of
three to four sentences are best. You can have a GenAI

-- 146 of 840 --

model create content in Style A, in which the paragraphs
are of varied length, and in Style B, in which paragraphs
are three to four sentences long. One way to do this is to
include, in the prompt to generate Style B, instructions to
use paragraphs of three to four sentences while omitting
any such directive from the prompt to generate Style A.
Another way (shown in Figure 2-11) would be to generate
all content the same way, but then, for Style B, to have an
LLM rewrite the content in paragraphs of three to four
sentences each. Then, you’d split your audience and show
Style A to some learners and Style B to others. You’d
measure which set of learners learn the content faster,
retain it longer, or whatever outcome you wanted to
optimize for. Once you had a statistically significant
difference between the two groups of learners, you could
declare a “winner”—and from then on, you could use the
prompt or process that corresponded to the winning style.

---

## Sección 37: Chapter 5) as an alternative to in-context learning. Often,

-- 147 of 840 --

Figure 2-11. Traditional A/B testing: Helps you optimize style if you know the
style factors that matter most
If multiple factors affect the learning outcome, you can use
a multiarmed bandit to test all possible variations
efficiently.
The drawback of the traditional A/B testing approach is
that you need to know how Styles A and B differ, so that
you can then always create content in the winning style. If
you don’t have a hypothesis about the set of factors to test,
it will be impossible to use traditional A/B tests. The
problem is threefold:
Indistinguishable sets

-- 148 of 840 --

If you have no hypothesis of the factors that make a
difference, there’s nothing to differentiate Set A from Set B.
Indeterminate test
If the two sets are indistinguishable, it’s likely that your test
will never yield statistically significant differences.
Inability to use results
Even if, by chance, you get to a point where it’s clear that Set
A is statistically better than Set B, how should you use the
results? If you don’t know what differentiates Set A from Set
B, how can you reliably generate content in the winning
style?
Content Optimization is a design pattern for generating
content in the style that offers the best performance, even
when you don’t know the factors that go into that
“winning” style.
Solution
Style optimization with this pattern is sheer jujitsu. In
Content Optimization, you reframe or redefine the three
problems with the traditional A/B testing approach to make
them go away:
Indistinguishable sets
If you don’t know what style factors make the most
difference, then the elements of sets A and B will be
indistinguishable. In Content Optimization, you get around
this problem by comparing just two pieces of content at a
time and defining Set A to be the content that “wins” the pair
comparison and Set B to be the content that doesn’t.

-- 149 of 840 --

Indeterminate test
You define a “test” as just a single comparison and drop the
need for the test itself to be statistically significant. The two
content pieces have to be comparable, of course, so they
should be created by the same LLM in response to prompts
that are nearly the same. (We’ll assume we’re dealing with
text for now, although this approach generalizes to images.)
Inability to use results
This problem seems insurmountable because Set A’s content
won the pairwise comparison and Set B lost, but you don’t
know why. If you have a hundred items in Set A, you may
have a hundred different prompts and no idea which factors
differentiate them. How can you change the prompts in the
deployed system? You get around this problem by not
changing the prompts. Instead, you’ll change the LLM!
You decide that you don’t care why some piece of content is
better than another—whether it’s because of its paragraph
length, tone, or whatever. Instead, you decide to simply do
whatever you need to do to make your content “win.” Here,
you’ll tune your LLM’s weights so that it produces the type
of content that “wins,” using a dataset of winners and
losers to preference-tune the LLM. Then, to reliably create
content in the winning style going forward, you’ll deploy
and utilize the preference-tuned LLM.
The steps of the solution are as follows (and also see
Figure 2-12):
1. Generate pairs of content from the same prompt.
2. Compare the two content pieces and pick a winner.
3. Create a training dataset for preference tuning.

-- 150 of 840 --

4. Perform preference tuning and use the tuned LLM
going forward.
The first three steps have to do with creating a preference
dataset, and the fourth involves using direct preference
optimization (DPO) to train an LLM to produce documents
in a preferred style.
Let’s look at each of these steps.
Step 1: Generate pairs of content from the same
prompt
There are several ways to generate two pieces of content in
different styles from the same prompt: repeated
generation, changing the generation settings, and prompt
rewriting.
Repeated generation
To generate pairs of content from the same prompt, you
can use the exact same prompt and generate two instances
of output. Because LLM generation is stochastic, the two
pieces will have some natural variations, as long as you
introduce randomness. The simplest way to obtain two
pieces of content that have some variations in style is to set
the temperature above zero—of course, make sure to turn
off any caching and ensure that you are not doing greedy
sampling of the output. (Use a top-K value greater than 1.)

-- 151 of 840 --

Figure 2-12. The four steps of Content Optimization
To illustrate this, we sent the following prompt to Mistral7B-Instruct-v0.2 twice with a nonzero temperature:
Where does the term “knee-jerk reaction” come from?
The first time, the response that came back started with
this:

-- 152 of 840 --

The term “knee-jerk reaction” refers to an immediate,
often unreflective response to a stimulus. It comes from
the medical procedure used to test the reflexes in the
knee.
The second time, the response started with this:
The term “knee-jerk reaction” comes from the medical
reflex test where the knee jerks up when the patellar
tendon is tapped. This reflex is an automatic, unreflective
response to a stimulus.
This prompt asks for a factual answer, so the responses
should vary less than most—yet their styles vary quite
dramatically. The first seems to be targeting a layperson,
while the second is addressed to someone who knows what
the patellar tendon is.
Changing the generation settings
You can change settings, such as the temperature and topP, to get two pieces of content that respond to the same
prompt:
paired_content = []
for iter in range(2):
response = pipe(input_message,
temperature=random.uniform(0.2, 0.9),
)
paired_content.append(response[0]['generated_text'][-1]
['content'])
Prompt rewriting
You can have an LLM reword the original prompt in
arbitrary ways. For example, you might instruct the LLM to
do this:
Rephrase this question at a grade school reading level:
“Where does the term ‘knee-jerk reaction’ come from?”

---

## Sección 38: Chapter 5) as an alternative to in-context learning. Often,

-- 153 of 840 --

When we did this with Mistral-7B-Instruct-v0.2, we got this
alternate prompt:
What’s the origin of the phrase “knee-jerk reaction”?
Note that you are rewriting the prompt—not rephrasing the
content at a grade school reading level! One idea for
rewriting prompts without changing their intent is asking
the LLM to make the prompt more concise or verbose.
Another powerful prompt-rewriting technique is to ask the
LLM to add an appropriate follow-on question to the
prompt you provide. For example, we asked Mistral this
question:
What is an appropriate follow-on question to this query:
“Where does the term ‘knee-jerk reaction’ come from?”
Mistral suggested this:
Can the origin of the phrase “knee-jerk reaction” be
traced back to a specific medical procedure or historical
event?
We then modified the original prompt by appending the
follow-on question. The response to this modified prompt
arrived in a completely different style:
The term “knee-jerk reaction” does have a medical origin,
but it doesn’t directly refer to a specific historical event
or medical procedure. The term comes from the MedicoPsychological Association’s demonstration of the reflex at
the 1878 Chicago World’s Fair.
With the two versions of the prompt, the original and the
rewritten one, you can generate two different pieces of
content.
You can randomly select among repeated generation,
changing generation settings, and prompt rewriting, or you

-- 154 of 840 --

can combine them to give yourself many variations. At the
end of Step 1, you’ll have two pieces of content that have
been generated from essentially the same prompt.
Step 2: Compare the two content pieces and pick a
winner
In Step 2, you need to determine which of the two pieces of
content is better. You can do this in one of three ways:
human labeling, using an evaluator, or choosing the item
that provides a better outcome when you attempt the realworld task.
Variant 1: Human labeling
Show the two pieces of content to a human expert and ask
them to choose the one that’s better. If you’re in an
application area where experts tend to disagree, you can
show them to a panel of experts and choose the majority
opinion, or you can discard pairs where the decision is not
clear-cut. In some situations, you can even show the two
pieces of content side by side as drafts and see which one
your end users actually select.
Variant 2: Using an evaluator
If your industry has metrics for content quality, you can
score the two pieces of content on a rubric that consists of
one or a combination of those metrics. For example, if
you’re generating SQL statements, your evaluator might
consist of a sandbox that runs those SQL statements on an
in-memory database and records the output and the time
taken to generate them. You might then choose the
statement that returns the correct result, or if both
statements return the correct result, you could choose the
response that is more concise. If both statements are the
same length, choose the one that runs faster.

-- 155 of 840 --

Similarly, if your industry has best practices, you might
evaluate the content on its conformance with those best
practices. For example, marketing content is commonly
evaluated on the 4Ps and 3Cs framework. A frontier LLM
might already have encountered the framework in its
training, so you should consider using one for this task—
and if it hasn’t, you can describe the framework in the
prompt context. This idea is called LLM-as-judge.
For example, we used Gemini 2.0 Flash to rate a piece of
marketing content from Amazon using the following
prompt:
You are a marketing expert who is rating marketing
content in the range of 0–7 where each point corresponds
to one of the items in the 4Ps and 3Cs marketing
framework. Read the following article and give it a
numeric score, explaining your reasoning
{text of
https://www.aboutamazon.com/news/devices/newkindle-color-scribe-paperwhite-entry}
The result was a score of 6 because the article “does a good
job of describing the new features of the Kindle family of
ereaders, but it could be improved by including more
information about the price and availability of the devices.”
Instead of having the LLM score each piece of content
separately and comparing the scores, you can pass in both
pieces of content and ask it to determine which one is
better based on the scoring rubric. This is the approach
that we’ll follow in the “Example” section later.
Variant 3: Choosing the item that provides a better outcome
A third option for determining the winner is to use the
actual outcome associated with each piece of content.

-- 156 of 840 --

There are a couple of ways to do this, depending on the
problem:
Direct measurement
Suppose you are creating content for a newsletter. You might
push one piece of content to half of your user base and the
other piece to the other half. Then, you could measure the
number of people who perform the call to action, whether
it’s to click on a link or to sign a petition. The piece of
generated content that gathers more clicks or more
signatures is the one you’ll choose.
Matching prompts
Suppose you’re generating answers to user queries in an
automated ticket-handling system. You can identify
semantically similar user queries and pair them up. For each
matched pair of queries, compare the outcome associated
with the corresponding content, such as how quickly the
issue was resolved. The content that leads to a faster
resolution is the winner.
At the end of Step 2, you’ll have a way to compare two
pieces of content that were generated in response to the
same or a similar prompt and declare one of them the
winner.
There’s a bit of circularity involved in choosing the piece of
content that scores better in an evaluation. It’s worth
remembering that “teaching to the test” has a negative
connotation, and the only way to get acceptable outcomes
is if the test in question is quite robust and reflects reality.
If your evaluation mechanism is to evaluate the output
using a panel of experts, could it be a problem if the LLM

---

## Sección 39: Chapter 5) as an alternative to in-context learning. Often,

-- 157 of 840 --

overindexes on these experts’ judgment? You have to hope
that their judgment generalizes well!
EVALUATION MATTERS
Step 2, the evaluation step, is by far the most important step in the
Content Optimization pattern. Therefore, it’s worth being
deliberative to get it right. We recommend that you do the following:
Choose the variant that works best in the context of your
problem, experimenting with different ideas if necessary.
Ensure that you have chosen the right reward function on
which to compare the two items.
Verify that the evaluation is happening correctly and that the
resulting comparisons align with your gut instincts as to
which is better.
Experiment with different ideas and choose the one that works best.
You may have to train and deploy the model to determine this, and
don’t be afraid to come back and revisit this decision during the
lifecycle of your project.
Also, make sure that the metrics or outcomes you are
optimizing are not too narrow. You don’t want the LLM
creating content in styles that game your metrics or
optimize toward short-term goals. For example, if the
outcome you optimize for is engagement time, the LLM
might produce hard-to-understand content—because it
takes longer to read! Martin Zinkevich, in his Rules of
Machine Learning, recommends differentiating between
metrics and objectives. You should identify your “true”
objective, which is often not measurable, and then choose a
simple, observable, and attributable metric to act as a
proxy for the true objective.
Always interpret the metric in terms of the true objective,
however. In the case of marketing content, for example,

-- 158 of 840 --

your true objective might be to educate the user about your
product. The metric may be engagement time, because you
find it easy to measure, but you have to be careful to
ensure that increasing engagement time is resulting in
more knowledge and not less!
Step 3: Create a training dataset
Create a training dataset in which each example consists of
three attributes: a prompt (use the original prompt if you
did prompt rewriting), a chosen output, and a rejected
output. For example, create it this way:
{
"prompt": "Where does the term \"knee-jerk reaction\" come
from?",
"chosen": "The term \"knee-jerk reaction\" refers to an
immediate, often
unreflective response to a stimulus. It comes from the medical
procedure used to
test the reflexes in the knee.",
"rejected": "The term \"knee-jerk reaction\" comes from the
medical reflex
test where the knee jerks up when the patellar tendon is tapped.
This reflex is
an automatic, unreflective response to a stimulus.",
}
This is a standard format for datasets used in preference
tuning, which is what we’ll do next. If your preferencetuning framework expects a different format, you’ll have to
create your training dataset in that format, of course.
You might also split this dataset into separate training and
evaluation datasets if you plan to do early stopping.
Step 4: Do preference tuning
The original way to do preference tuning, which was
introduced in 2017, was to use reinforcement learning.

-- 159 of 840 --

However, we recommend the direct preference
optimization (DPO) approach, as described in the paper
“Direct Preference Optimization: Your Language Model Is
Secretly a Reward Model” by Raifalov et al. in 2023. The
DPO approach is much faster, for reasons that are beyond
the scope of this book.
The Transformer Reinforcement Learning (TRL) package
provides a DPO implementation. To train a model using
DPO, first instantiate your model and a tokenizer for it:
MODEL_ID = "Qwen/Qwen2-0.5B-Instruct"
model = AutoModelForCausalLM.from_pretrained(MODEL_ID)
tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
Then, launch the training by using this code:
training_args = DPOConfig(output_dir="Qwen-DPO")
trainer = DPOTrainer(model=model, args=training_args,
processing_class=tokenizer, train_dataset=train_dataset)
trainer.train()
Once the training is complete, save the model:
trainer.save_model(training_args.output_dir)
You can deploy the trained model or load it into a
Transformer pipeline from local storage and use it in lieu of
the original model. This model will produce output in the
style it learned from the set of chosen and rejected
responses.
Example
Let’s say that you want to use an LLM to generate
classified ads and let’s also assume that, for latency
reasons, you want to use a smaller model. Here, we’ll use

-- 160 of 840 --

the 0.5-billion-parameter Qwen2 model. (The complete
code is in the book’s GitHub repository at
examples/05_content_optimization.)
Zero-shot learning doesn’t work
If you want to try zero-shot learning, you can ask the model
to generate an ad by using the following prompt:
You are a resident who is listing a used item for sale on a
neighborhood online group. An ad for used items in this
neighborhood group is 1–3 sentences.
Write an ad to sell a {item} priced at {price}
We used this prompt to write an ad for a $300 used bike:
create_classified_ad("3-year old Specialized bike", "$300")
This produced an ad that started with the following:
Welcome to the Adventure with our Specialized Bike!
Specialized bikes have been a favorite among mountain
bikers for years, and they’re here again! Our latest
model, the Specialized 3-Year Old, offers unparalleled
performance and durability. This bike has been designed
with safety and comfort in mind, making it perfect for
beginners or seasoned riders alike.
This is quite obviously a bad ad. It sounds as if the ad is for
a new bike from the manufacturer, whereas we wanted a
for-sale-by-owner ad to sell a three-year-old bike.
The model is too small to generate good ads, but, as you’ll
see, we can use the Content Optimization pattern to train
this model to produce good ad copy.

---

## Sección 40: Chapter 5) as an alternative to in-context learning. Often,

-- 161 of 840 --

Step 1: Generate pairs of ads
The first step is to generate pairs of ads. Let’s change the
generation settings, choosing a random temperature each
time.
We got two ads for the $300 bike when we did this. Here’s
the first one:
Hey there! We’re looking for someone who’s ready to
take their riding game to the next level with our 3-yearold Specialized bike. This bike is a great investment that
will keep your kids engaged and safe all year round. It
features durable components, a comfortable seat, and a
powerful frame that can handle any terrain. Plus, it
comes with a lifetime warranty, so you can be sure you’re
getting a high-quality product. So why wait? Get yours
today and start enjoying the thrill of riding on wheels!
And here’s the second one:
Looking for a unique and stylish way to enjoy your daily
commute? Look no further than the 3-year-old
Specialized bike! This bike is perfect for those who value
style over speed, and it’s priced at just $300. With its
durable frame and high-quality components, this bike will
last you years with minimal maintenance. Plus, it comes
with a lifetime warranty, so you can rest easy knowing
that you’re getting a quality product that won’t let you
down. Don’t miss out on this opportunity to upgrade your
bike experience today!
Step 2: Compare two ads using LLM-as-judge
To compare the two ads, you can use the LLM-as-judge
approach. Because evaluation is the most important step in
this pattern, it is important to use a good evaluator. Let’s

-- 162 of 840 --

use a frontier LLM, have it output the ad it deems better,
and have it give us the reason why:

-- 163 of 840 --

You are a professor of advertising at a business school.
Compare the two ads below for the same item being sold
in a neighborhood marketplace and determine whether
ad_a is better than ad_b.
Also explain your reasoning.
The main criteria to compare the ads include the
following:
* Is it clear what’s being sold? Age, brand, price,
and condition are important.
* Does it target the most relevant audience for the
item? Is the text persuasive to that audience?
* Is it concise and easy to read? An ideal ad is at
most three sentences.
* Does it include contact information? Ideally, the
ad specifies the preferred means of
communication.
* Is the ad truthful? Remember that the item is
likely used and not being sold by the manufacturer.
ad_a:
{ad_a}
ad_b:

-- 164 of 840 --

{ad_b}
By optimizing to this evaluation, you’re saying that you
don’t care what style the ads are written in as long as
they’re clear, relevant to the audience, short, actionable,
and truthful. If writing the ads in rhyme is what makes the
bike sell, you are perfectly OK with the LLM choosing to
output rhymes.
Asking for the reason forces the LLM to do the comparison
deliberatively (see Chain of Thought [Pattern 13] in

---

## Sección 41: Chapter 5). The output can be in this form:

@dataclass
class AdsComparison:
ad_a_is_better_than_ad_b: bool
reasoning: str
When we did the comparison using Gemini 2.0 Flash, the
result for the two ads whose text appears in the preceding
section was this:
AdsComparison
ad_a_is_better_than_ad_b=False
reasoning="Both ads have issues, but ad_b is slightly
better because it includes the price. Neither ad includes
contact information. Both ads make the mistake of
claiming the bike has a lifetime warranty, which is
unlikely for a used bike being sold in a neighborhood
marketplace. Ad_a is targeted toward children, but ad_b
is targeted toward adults. Since the bike is used, it’s
more likely to be purchased by an adult.”
The reasoning and comparison appear correct.

-- 165 of 840 --

Step 3: Create a training dataset
You can create a single preference example consisting of
the prompt, chosen content, and rejected content by
putting together the preceding steps:
def create_preference_example(item: str, price: str) -> dict:
ad1 = create_classified_ad(item, price)
ad2 = create_classified_ad(item, price)
score = score_ad(ad1, ad2)
preference_example = {
"prompt": SYSTEM_PROMPT + f"""Write an ad to sell a
{item}
priced at {price}
"""
}
if score.ad_a_is_better_than_ad_b:
preference_example['chosen'] = ad1
preference_example['rejected'] = ad2
else:
preference_example['chosen'] = ad2
preference_example['rejected'] = ad1
preference_example['score_reason'] = score.reasoning
return preference_example
Then, call this in a loop with a random selection from a set
of items to create a JSONL file:
items_for_sale = [
("3-year old Specialized road bike", "$300"),
("Amazing Spider-Man 361", "$200"),
…
("Set of 2 vintage Pyrex coffee mugs (in original box)",
"$20"),
("Hand-carved wooden serving spoon", "$15")
]
def write_jsonl(num_examples: int, filename: str):
examples = []
for iter in range(num_examples):
print(iter, end=" ... ")
item, price = random.choice(items_for_sale)

-- 166 of 840 --

example = create_preference_example(item, price)
examples.append(example)
with open(filename, "w") as ofp:
for example in examples:
json.dump(example, ofp)
ofp.write('\n')
You can then use this file for preference tuning.
Step 4: Do preference tuning
To perform preference tuning, first load the dataset:
train_dataset = load_dataset('json'
data_files="ad_preference_dataset.jsonl",
split='train')
Then, create the model you wish to tune:
model = AutoModelForCausalLM.from_pretrained(MODEL_ID)
tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
Finally, launch the DPOTrainer with this dataset and the
model:
trainer = DPOTrainer(model=model, …, train_dataset=train_dataset)
trainer.train()
The training process for a hundred examples, when we did
it, took about three minutes on a machine with eight vCPUs
and an L4 GPU.
Inference
You can create a pipeline with the local trained model, just
as if the model were on the Hugging Face hub:

-- 167 of 840 --

pipe = pipeline(
task="text-generation",
model="ClassifiedAds-DPO",
use_fast=True,
kwargs={
"return_full_text": False,
},
model_kwargs={}
)
Then, create new content, using the same prompt as
before:
def create_classified_ad(item: str, price: str) -> str:
system_prompt = SYSTEM_PROMPT
user_prompt = f"""
Write an ad to sell a {item} priced at {price}
"""
input_message = [
{"role": "system", "content": system_prompt},
{"role": "user", "content": user_prompt}
]
results = pipe(input_message,
max_new_tokens=256,
pad_token_id=pipe.tokenizer.eos_token_id
)
return results[0]['generated_text'][-1]['content'].strip()
Next, try out the preference-tuned model for a book:
create_classified_ad("book Pachinko by Min Jin Lee", "$5")
This yields the following:
Pachinko, the classic tale of a man’s obsession with
gambling and his love for a woman he meets while
playing a pachinko game. A rare edition priced at $5. For
more information or to arrange pickup, please contact
[Your Name] at [Your Phone Number]. Thank you!

-- 168 of 840 --

Zero-shot learning with the tuned model works! The tuned
model is outputting clear, concise, and persuasive ads—
because that’s what the evaluation mechanism preferred.
Considerations
Content Optimization uses preference tuning to optimize a
GenAI model to produce content in the style that performs
best, as determined by an evaluator.
Choosing between the variants
There are several variants of the pattern that differ
primarily in how you create the preference-tuning dataset.
In Step 1, you can choose how to generate two pieces of
content in response to the same prompt. While repeated
generation can work, changing the settings or rewriting the
prompt will typically yield content that is more
meaningfully different and covers more of the style space.
In Step 2, you can choose how to compare the two pieces of
content to determine which one is better. The approach you
should take often depends on how the content will be used:
For user-facing content that end users will consume
when they’re performing a wide variety of tasks,
“better” is pretty much in the eye of the beholder, so
human labeling might be the most appropriate
approach.
For user-facing content that is meant to drive
certain user behavior (even if it’s as simple as
getting the user to read the content), you should
measure the outcome. For example, for content
that’s meant to be read, you could measure the
average time users spend reading it and select the

---

## Sección 42: Chapter 5). The output can be in this form:

-- 169 of 840 --

content that holds their attention longer. To avoid
this metric being gamed, you can measure user
frustration, too, with a metric such as abandonment,
and then weight the two metrics.
For content that’s meant to be consumed by
automated applications, using an evaluator such as a
tool that measures the content’s fit for purpose, is
often the most appropriate approach. For example,
the tool might run generated code to check whether
it compiles and how fast it runs.
You can base your evaluation approach on what you
already have available: if you already have defined metrics
or rubrics, you could use them. If the metrics and rubrics
are subjective (like “is readable”) or require content
extraction (like “includes contact info”), you can use LLMas-judge. If your UI allows you to present a set of choices to
users, then populate those choices with content pairs. If all
queries are logged and there is no reason that content to
the same query (such as personalization) will vary in
substance, consider using the matched-pairs approach.
It’s unlikely that you’ll have only one option available to
you, so try multiple approaches and see which one gives
you the best results.
The in-distribution requirement
There are several places in this pattern where an LLM is
being used:
To rephrase a prompt
To create content from a prompt
To evaluate

-- 170 of 840 --

As input to the preference tuning
LLM-generated content (the second item on the list) has to
be text that the LLM being trained, through preference
tuning, (the last item on the list) can produce. This is called
the in-distribution requirement. No amount of preference
tuning can teach an LLM new facts or new tokens, for
example. There are two ways to ensure compliance with
this in-distribution requirement:
The easy way
Use the same LLM in both steps. We used the Qwen2 0.5billion-parameter model, both to generate the example
content and as the model that was preference trained.
The hard way
Generate content using a bigger LLM, then instruction-tune
the smaller model you plan to preference-tune to be able to
create that content. In other words, before doing DPO, do
supervised training.
You’ll need to do it the hard way if your small model can’t
produce adequate content. Note that the content need not
be good—the ads generated by the untuned Qwen2 model
weren’t good, but they were ads and could be evaluated
using our evaluator. That was sufficient to tune Qwen2 to
produce good ads.
Extension to images
Although we discussed this pattern with just text examples,
you can also carry out preference tuning on images—for
example, you can use DiffusionDPO to tune diffusion image
models. Therefore, you can apply style optimization to
create images in your preferred style.

-- 171 of 840 --

For example, to train the RunwayML Stable Diffusion
model, create a pipeline as follows:
pretrained_model_name = "runwayml/stable-diffusion-v1-5"
pipe = StableDiffusionPipeline.from_pretrained(
pretrained_model_name,
torch_dtype=torch.float16).to('cuda')
Then, use repeated generation (that is, just run the prompt
twice) to generate two images that differ in unknown ways:
for iter in range(2):
...
img = pipe(prompt=prompt, generator=generator,
guidance_scale=7.5).images[0]
...
Now comes the key step: evaluation. How is one image
better than another? Assuming that the images are being
generated for a newsletter, you could measure the outcome
to select the image in a pair that drives more article clicks.
With the dataset of images created in this manner, you can
launch the training script to create a preference-tuned
RunwayML Stable Diffusion model:
accelerate launch --mixed_precision="fp16" train.py \
--pretrained_model_name_or_path=$MODEL_NAME \
--dataset_name=$DATASET_NAME \
…
--output_dir="tmp-sd15"
The output of this model is now in the style that drives
more clicks (see Figure 2-13).

-- 172 of 840 --

Figure 2-13. Preference-tuning images to select the image style that performs
better
Continuous improvement
DPO needs only a few high-quality examples, and in
preference tuning (unlike in deep learning), quality of data
trumps quantity. You can improve the quality of the
solution in a few ways: by using a better evaluator, more
diverse prompts, and iterative training.
Using a better evaluator
First, you should use a high-quality evaluator that’s capable
of observing nuanced differences between the two pieces of
content in a pair. We’ve already discussed the importance
of having a high-quality evaluator in previous sections.
Using diverse prompts
Second, your prompts need to be diverse enough to cover
the entire input space of what your LLM will be required to

-- 173 of 840 --

handle when deployed.
How do you obtain diverse prompts? One approach is to
deploy your solution early and start to collect feedback. Log
both the prompts and feedback about the responses. Add
any prompt that causes subpar responses to the set of
prompts that you use to create your preference-training
dataset. Carry out topic modeling and other techniques to
identify outlier prompts and add these outliers to the
training dataset. Finally, have a systematic approach to
managing bugs and feedback—and add these prompts to
your training dataset too.
Iterative training
We described the Content Optimization pattern as having
four steps, the first three of which are about creating a
preference dataset and the fourth of which is about
invoking a DPO trainer. At the end of training, you’re left
with a tuned model that produces content in the desired
style. DPO training on a hundred examples takes only
seconds, and if your evaluation method is automated
(meaning it doesn’t involve human labeling), then you can
perform all four steps of the pattern quickly.
If you can perform all four steps quickly, training need not
be a one-and-done process. You can repeat the four steps
with the newly trained LLM to create a preference dataset
where all the examples are improvements on the original
(see Figure 2-14). Then, you can invoke the DPO trainer to
obtain an LLM that is an improvement on the one you used
to create the content in the examples. Of course, the
process will saturate at some point, but such metatraining
lets you maximize the quality that an LLM of that size is
capable of achieving, at a very reasonable cost.

---

## Sección 43: Chapter 5). The output can be in this form:

-- 174 of 840 --

You will need a larger library of examples to do multiple
training runs over your prompt library. Consider increasing
the number of iterations, once you have a deployed system
and have been logging user prompts for a while. Another
way to get a larger library of examples is to train the LLM
on prompts that are associated with many different
problems. DeepSeek-R1 burst onto the scene in early 2025
when users had an aha moment, realizing they could make
substantial improvements by using iterative DPO on
synthetic data that corresponded to easily verifiable
problems. You should consider using the same approach if
you have a number of easily verifiable problems that you
can use to expand the training dataset.
The important ingredients you need to set up a continuous
improvement cycle are a fast and high-quality evaluator, a
systematic approach to collecting and managing prompts,
and training until saturation is reached.

-- 175 of 840 --

Figure 2-14. Using a large prompt library or a number of easily verifiable
problems to do multiple iterations of training
References
This pattern relies on preference tuning, but it applies the
technique outside of foundational model training and not
necessarily on human feedback. Reinforcement learning
based on human feedback was introduced by Christiano et
al. in 2017 and adapted to LLMs by Ouyang et al. in 2022.
Preference tuning using DPO was introduced by Raifalov et
al. in 2023.

-- 176 of 840 --

Summary
This chapter examines patterns for controlling the style of
content generated by foundation models. We address the
challenge that model responses can be stochastic and
variable, which makes it difficult for applications to handle
diverse outputs consistently. We present five key patterns,
as shown in Table 2-2.

-- 177 of 840 --

Table 2-2. Patterns for controlling style
Patterns Problems Solutions
Usage
scenarios
Logits
Masking
(Pattern 1)
You need to
ensure
generated
text
conforms to
specific
style rules
for brand,
accuracy, or
compliance
reasons.
Intercept the
generation at
the sampling
stage to zero
out
probabilities
of
continuations
that don’t
meet the
rules.
Using word
associated
with a
specific
brand;
avoiding
repeating
factual
information
making
content
compliant
with the
style guide
Grammar
(Pattern 2)
You need
text to
conform to
a specific
format or
data
schema for
downstream
processing.
Specify rules
as a formal
grammar
(such as
BNF) or
schema that
the model
framework
applies to
constrain
token
generation.
Generating
valid SQL
timestamps
extracting
structured
data in a
specific
format;
ensuring
output
conforms to
JSON
schema
Style Transfer
(Pattern 3)
You need to
convert
Use few-shot
learning or
Rewriting
generic

-- 178 of 840 --

Patterns Problems Solutions
Usage
scenarios
content into
a form that
mimics
specific
tone and
style that is
difficult to
express
through
rules but
can be
shown
through
example
conversions.
model finetuning to
teach the
model how to
convert
content into
the desired
style.
content to
match bran
guidelines;
converting
academic
papers to
blog posts;
transformin
image and
text conten
for differen
social medi
platforms o
audiences
Reverse
Neutralization
(Pattern 4)
You need to
generate
content in a
specific
style that
can be
shown
through
example
content.
Use an LLM
to generate
content in an
intermediate
neutral form
and a finetuned LLM
to convert
that neutral
form into the
desired style.
Generating
letters in
regionspecific
legalese;
generating
emails in
your
personal
style
Content
Optimization
(Pattern 5)
You need to
determine
the optimal
style for
content
Generate
pairs of
content,
compare
them using
Optimizing
ad copy,
marketing
content, or
educational

-- 179 of 840 --

Patterns Problems Solutions
Usage
scenarios
without
knowing
which
factors
matter.
an evaluator,
create a
preference
dataset, and
perform
preference
tuning.
materials
where
effective
style factor
are unknow
Each pattern offers distinct advantages in different
scenarios. Logits Masking provides dynamic rule
enforcement but requires access to the model’s logit
outputs. Grammar offers a more structured approach
through formal syntax rules or schema-based constraints.
Style Transfer enables nuanced style control through
examples, rather than explicit rules. Reverse Neutralization
helps when you need to generate styled content on unseen
topics. Finally, Content Optimization allows for style
optimization, even when you don’t know the specific factors
that make content effective. Together, these patterns
provide you with a comprehensive toolkit for controlling
the style of LLM-generated content to meet specific brand,
accuracy, or compliance requirements.
The next chapter is the first of two that discuss how to
build AI systems that leverage external knowledge sources
to addressing fundamental limitations like knowledge
cutoffs, confidential data access, and hallucinations.
1 Though superficially similar, Claude’s implementation at the time we are
writing this (July 2025) seems to not employ constrained decoding.

---

## Sección 44: Chapter 5). The output can be in this form:

-- 180 of 840 --

Instead, Anthropic documentation suggests prefilling the response with
the start of the desired format to avoid unwanted preambles.

-- 181 of 840 --

---

## Sección 45: Chapter 3. Adding

Knowledge: Bass
Foundational models are closed systems that are limited by
their training data. In many cases, you’ll need to give a
foundational model additional information. For example,
the information may be based on recent events that had not
occurred when the foundational model was being trained,
or the information may have been private, confidential, or
otherwise unavailable to the foundational model trainers.
It’s impractical to retrain an LLM with additional
knowledge or even perform continuing pretraining (CPT)
on a foundational model to add knowledge to it. The cost of
even a single training run is significant, and information
changes so fast that CPT would have to be done very
frequently. These costs can add up to tens of millions of
dollars,1 so you’ll typically want to use a foundational
model as is and add knowledge to it at runtime.
The key pattern that’s used to provide additional
information to a foundational model at runtime was
introduced in the landmark paper “Retrieval-Augmented
Generation for Knowledge-Intensive NLP Tasks” in 2020 by
researchers working at Facebook AI Research (which is
now part of Meta). Retrieval-augmented generation (RAG)
transforms foundational models from closed systems that
are limited by their training data into open systems that
can leverage external knowledge on demand.

-- 182 of 840 --

Figure 3-1. The patterns in Chapter 3 and Chapter 4 build on each other

-- 183 of 840 --

RAG is best thought of as a composable system of three
steps (indexing, retrieval, and generation) that you will
have to deploy but whose components are quite
customizable. Therefore, unlike with the other chapters in
this book, we recommend that you read all the patterns in
this chapter in sequence, rather than dipping into the ones
that best fit your problem (see Figure 3-1).
The patterns in this chapter build on one another, adding
capabilities you can use to handle increasingly
sophisticated requirements. The boxes are the patterns,
and the arrows indicate why you might want to go up the
sophistication ladder to the next pattern. For example, you
might go from Pattern 9 to Pattern 10 if you need to handle
irrelevant content, ambiguity, and so on.
That said, you won’t need every single idea we present here
to build your systems. Which ones you’ll need will depend
on what your system is for. (Is it an internal tool meant for
experts, or is it a product that millions of your customers
will use?) It will also depend on whether the problems
being addressed by a given idea in this chapter are
pertinent to the type of questions and documents that your
RAG system will encounter.
Pattern 6: Basic RAG
In the Basic RAG pattern, a system consists of three core
steps: indexing, retrieval, and generation. We don’t really
expect that you’ll employ the Basic RAG pattern covered in
this section as is, but the limitations of the rather simplistic
implementation provide the justification for the other
patterns in this chapter. It is important to understand the
reasons for and tradeoffs among the more advanced

-- 184 of 840 --

techniques so that you don’t overcomplicate your
implementations.
Problem
Foundational text generation models have been trained on
a large corpus of digitally available documents such as
Common Crawl (which captures text from billions of web
pages across the internet), digital libraries and book
corpora such as Books2 and Project Gutenberg, Wikipedia,
academic repositories such as arxiv.org, code repositories
such as GitHub, social media forums such as Reddit and X
(formerly Twitter), newspaper archives, financial filings
such as EDGAR, and government publications such as the
European Parliament proceedings. This builds up the world
knowledge of the foundational model.
In many enterprise use cases, this world knowledge is
insufficient for the following reasons:
Static knowledge cutoff
Foundational models cannot access information beyond the
date their training data was collected. This limitation can
result in outdated or inaccurate responses, especially when
you’re dealing with rapidly changing topics or current
events.
Model capacity limits
Foundational models, despite their massive size, have a limit
on how much information they can store within their
parameters. You can think of a foundational model as a lossy
compression of the datasets it was trained on.
Lack of access to private data

-- 185 of 840 --

Foundational models are trained with digital data that is
available to the model provider. Those datasets do not
include confidential data, such as internal company reports,
industry-specific reports that are available only to
subscribers, and personalized data (such as a customer’s last
few orders).
When you ask an LLM to generate responses on a topic that
lies beyond the scope of its training data, it will
nevertheless pick among likely token continuations. This is
an important reason why LLMs are good writers and can be
creative. For example, even though Rumi never heard of
time zones, we can ask an LLM to do this:
Generate a poem in the style of Rumi about a lover in a
different time zone.
However, LLMs’ tendency to go beyond their training data
adds two more drawbacks when they’re employed to
answer factual questions:
Hallucinations
Hallucinations in AI are instances when a model generates
outputs that sound plausible but are factually incorrect or
lack grounding in reality. This often occurs when a model is
asked to process information that lies outside the scope of its
training data.
Inability to make citations
Foundational models generate text token-by-token. The text
is not tied to any particular source, so the models can’t cite
sources for the sentences they emit based on their
pretraining.

---

## Sección 46: Chapter 3. Adding

-- 186 of 840 --

These problems pose challenges in many enterprise use
cases.
Solution
The solution is to ground the response generated by the
LLM, which means that you make the LLM reply based on a
set of trusted knowledge sources when generating its
response.
Being able to provide extra knowledge to the foundational
model at runtime (rather than at the time the model was
trained) solves the problems in the following ways:
Static knowledge cutoff
RAG can be used to augment the foundational model’s
knowledge with relevant information from more current
external sources, thus allowing the model to generate
responses that are both informed and up-to-date.
Model capacity limits
RAG connects the model to external knowledge bases,
effectively expanding the model’s knowledge capacity
beyond what’s stored within its own parameters. RAG turns
a foundational model into a “smart researcher” that can look
up information in external sources to supplement its own
knowledge and provide more comprehensive and accurate
responses.
Lack of access to private data
RAG allows the model to be used even if the knowledge
required consists of confidential, industry-specific, or
personalized data. This data needs only to be available at
runtime to the client of the foundational model.

-- 187 of 840 --

Hallucinations
By retrieving and incorporating relevant information from
these sources, RAG tries to ensure that the model’s responses
are based on factual data, thereby reducing (but not
eliminating) the likelihood of hallucinations.
Inability to make citations
RAG enables attribution by linking generated content to the
specific documents or sources from which information was
retrieved.
Let’s see why grounding works, and then, let’s look at the
components of a RAG system that will enable you to ground
LLM responses.
Grounding
An LLM will preferentially use information that is present
in the prompt when generating its responses. Therefore,
you can ground the response of an LLM by adding relevant
text from the knowledge base into the prompt.
Priming
Suppose you ask an LLM to do this:
Suggest three small cities to visit in Europe. Just provide
the city name and a single-sentence reason for why you
are suggesting it.
The responses could vary wildly—each time you asked the
LLM, you could get different responses. On the other hand,
suppose you added some information to the context:

-- 188 of 840 --

The best food in France is found in Lyon.
Suggest three small cities to visit in Europe. Just provide
the city name and a single-sentence reason for why you
are suggesting it.
When we tried this, all our responses were foodie cities.2
This is because of the priming effect. Because foundational
models generate by completing text token by token, they
naturally pay a lot of attention to information that they find
in the prompt’s context. So even though we didn’t explicitly
ask for cities that are known for their food, we got foodie
cities simply because of the presence of the first statement
in the context. The tokens an LLM generates are much
more likely to be related to the text that it encounters in
the context.
You can take advantage of this phenomenon to add
knowledge to the LLM or override knowledge that it has.
For example, you can add information on a recent event
and then ask about it immediately:
The Seahawks traded two offensive stars over the
weekend, with receiver DK Metcalf going to the Steelers
and quarterback Geno Smith headed to the Raiders.
Who does Geno Smith play for?
Even though the LLM was trained on a large corpus of
documents that presumably described Geno Smith as
playing for the Seahawks, this piece of context will override
all those tokens and make it much more likely that the
response will say that he plays for the Raiders.3
You can also use this idea to add confidential, proprietary,
or personal information before asking your question. For
example, here’s an example of adding a customer’s orders

-- 189 of 840 --

to the prompt to ensure that responses are grounded by
that information:
Here’s the list of recent orders from this customer:
Order #5678 – Apple iPhone 15 Pro (256GB, Titanium
Blue) with a tempered glass screen protector and
MagSafe case.
Order #7832 – Sony WH-1000XM5 Noise-Canceling
Headphones (Black) with a travel carrying case and USBC charging cable.
Order #9210 – ASUS ROG Strix Gaming Laptop (Intel i9,
RTX 4080, 32GB RAM, 1TB SSD) with an RGB
mechanical keyboard and gaming mouse.
Which of these order IDs is the customer referring to in
the following email?
…
The computer you sent me is missing a charger. Can you
send me a replacement?
…
Say none of them if the message does not match any of
the above orders.
TIP
In the last line of the prompt above, we make sure to “tell” the model
what to do when no match is found. You need to make sure that the
schema (assuming we use Grammar [Pattern 2]) allows for “None of
them” as one of the responses of the model.

-- 190 of 840 --

Relevance
In RAG, grounding works by adding relevant chunks
(relevant to the query, that is) from the knowledge base
into the prompt. Because you can only identify relevant
chunks after you know what the query is, you do it at
runtime, rather than at the time you train the LLM. This is
an example of runtime compute.
For example, in the following prompt, there are three
chunks of text that are relevant to the query and that are
included before the question:

---

## Sección 47: Chapter 3. Adding

-- 191 of 840 --

Use the following trustworthy information to answer the
given query.
Text: Remove deflector tube from head (using hand, not
wrench).
Inspect to see if diaphragm is intact. If diaphragm is
ruptured,
replace the safety head with an unbroken head.
Text: If diaphragm is ruptured, replace the safety head
with an
unbroken head. (Par 69 b, c) Reassemble plug, head, and
deflector tube
in left fuel tank.
Text: (3) Unscrew diaphragm cap and pull out washer,
support, and
valve-diaphragm assembly. To prevent loss of valveneedle adjustment
(Fig 54), do not disturb position of yoke block by turning
the needle.
Q: What should I do if the diaphragm is ruptured?
A:
A RAG system needs to identify relevant text chunks from
the knowledge base. It does that by building a datastore of
chunks and organizing the chunks in a way that makes
searching for chunks that are relevant to a query efficient
and fast. This preparatory step of building an efficient data
store is called indexing, and the runtime step of searching
the datastore for relevant chunks is called retrieval.

-- 192 of 840 --

Pipelines
A basic RAG system consists of two pipelines, as depicted
in Figure 3-2. You run an indexing pipeline beforehand to
convert knowledge sources into indexed chunks and store
them in a document store. Then, the document store
organizes the indexed chunks in a way that makes
searching for chunks by index very fast. The indexing
pipeline is usually run in batch mode, but it could also be
triggered by the arrival of a new knowledge source item.

-- 193 of 840 --

Figure 3-2. RAG system consisting of two pipelines: one for indexing and the
other for question-answering

-- 194 of 840 --

Whenever a query is received, a question-answering
pipeline is invoked. This consists of two steps (see Figure 32): retrieval and generation. In the retrieval step, the
retriever finds chunks in the document store that are the
most relevant to the query. In the generation step, these
relevant chunks are added to the context of the prompt and
used along with the user query to generate the answer. In
this way, the generated answer is grounded in the relevant
information from trusted knowledge sources. The response
consists of the generated text as well as the relevant
chunks that were used to generate the answer.
Let’s see how these steps work. We would like to reiterate
that a production RAG will be considerably more
sophisticated than what’s described here.
Indexing
The job of the indexing pipeline is to index the source
documents so that they can be searched efficiently.
Because you’ll need the search to return smallish chunks of
the documents, you don’t index the document as a whole—
instead, you need to split the documents into chunks of the
appropriate size and index those chunks. The chunks will
be stored in a persistent store so that they can be searched
by the retriever.
We’ll use the LlamaIndex framework to illustrate this
pattern. In LlamaIndex, you can convert read-in text into a
Document object using the following code (the full code is
on GitHub):
# Remove extra whitespace
content = text[start_pos:end_pos].strip()
content = re.sub(r'\n{3,}', '\n\n', content)
# convert into a Document
document = Document(

-- 195 of 840 --

text=content,
metadata={
"source": url,
"filename": filename,
"date_loaded": time.strftime("%Y-%m-%d
%H:%M:%S")
}
)
This code hints at the following two ideas (see the bolded
lines) that we’ll develop further later. First, we want
chunks to be information dense because we have a limited
number of tokens that we can add to the input prompt
when generating, and we want the chunks we add to add as
much knowledge as possible. As a simple matter, a chunk
that consists mostly of whitespace is not informative, so we
remove unnecessary whitespace from the knowledge
source. Second, we attach metadata to the document so
that we can cite chunks that come from this document.
Pattern 8, Indexing at Scale, covers how to do this later in
this chapter, but we want to remind you here that you need
to keep track of metadata.
Once you have a document, you can use any splitter class
to split it into chunks. The simplest approach is to try to
obtain chunks of a desired number of characters but to also
have chunks consist of complete sentences to the greatest
extent possible:
node_parser = SentenceSplitter(chunk_size=200, chunk_overlap=20)
nodes = node_parser.get_nodes_from_documents([document])
LlamaIndex terms the chunks nodes because, as we’ll see
later, we might want to organize the chunks as a
knowledge graph. Another point to note about the
preceding code is that we limit the problem of important

-- 196 of 840 --

information getting split between two chunks by adding an
overlap between chunks.
To store the chunks, you can use a document store:
docstore = SimpleDocumentStore()
docstore.add_documents(nodes)
The SimpleDocumentStore stores the nodes in memory, but
other document stores such as MongoDB, Postgres, and
Redis are supported. You use the appropriate constructor
for these databases, but usage of the docstore once
created is identical to that of the SimpleDocumentStore.
For example, to persist the nodes in Firestore, which is a
database commonly used in mobile applications, you could
create the document store by using this code:
docstore = FirestoreDocumentStore.from_database(
project="project-id",
database="(default)",
)
Then, add nodes by using this:
docstore.add_documents(nodes)
The indexing point splits documents retrieved from the
knowledge sources into chunks and makes the chunks
searchable.
Retrieval
The job of the retrieval pipeline is to efficiently search for
chunks in the document store that are relevant to a given
query.
Suppose, for example, you have a document store that’s
populated with chunks of text derived from The Anabasis of

---

## Sección 48: Chapter 3. Adding

-- 197 of 840 --

Alexander, a history of Alexander the Great’s conquest of
the Persian empire. You wish to search for chunks that are
relevant to the question, so you ask the model to do this:
Describe the relationship between Alexander and
Diogenes
Which chunks would you retrieve?
The intuitive answer is that you’d look for chunks that
contain the terms in the query. A chunk that contains more
of the words in the query is more likely to be relevant to
the query. This is called term frequency (TF). At the same
time, words like describe or the are unlikely to matter, so
the relative rarity of words also matters. As a quick fix, we
can remove extremely common words such as the. These
are called stop words, a list of which is readily available.
A more sophisticated way to define the rarity of a term is as
the inverse of the fraction of chunks that contain the term.
(In practice, the log of the fraction is used.) This is called
inverse document frequency (IDF). Why is it called
document frequency and not chunk frequency? This comes
from the fact that search engines find documents that
match a query, and so, the equivalent of a chunk in RAG is
a document in the academic literature on search engines.
Put these two concepts together, and the idea of finding
chunks that contain more of the rarer terms in a query
yields a measure called TF-IDF, which we express as
follows:
tfidf (chunk, term) = count(term,chunk)/ ∑term count(term,chunk)
log(count(chunk)/count(chunk|term∈chunk))
Here, count(term, chunk) is the number of times that the
term appears in the chunk, and count(chunk) is the
number of chunks. The higher the tfidf of a term, the more

-- 198 of 840 --

relevant the chunk is to the query based on that term. Add
up the tfidf of all the terms in a query, and you have the
total relevance of that chunk.
Suppose you split the Alexander biography into 200character chunks. You will find that the TF-IDF “weight” of
the term relationship is 0.26, the weight of Alexander is
61.04, and the weight of Diogenes is 1.01. This means that
we’ll get a lot of chunks that contain the word Alexander,
whether or not they contain the word Diogenes. The TF-IDF
of Alexander dominates that of Diogenes because the term
frequency of the word Alexander in a book about Alexander
is much higher than that of Diogenes: Alexander appears
1,311 times, while Diogenes appears only 6 times. So, the
numerator overwhelms the denominator. One solution is to
saturate the numerator by defining the term frequency as
count / (count + k), where k is a positive number. You can
easily check that this formula increases with count but
never exceeds 1.
An algorithm called BM25 modifies TF-IDF by
implementing term saturation in the numerator and a
different correction that’s based on information theory and
probabilistic relevance to the denominator. The result is a
measure that has proven very successful at identifying
relevant text in search problems. To build a BM25 retriever
in LlamaIndex, you pass in the document store so that it
can compute the IDF of all the terms found in the chunks
stored there:
retriever = BM25Retriever.from_defaults(
docstore=index.get_docstore(),
similarity_top_k=5)
The last argument says that you want the retriever to
return the 5 most relevant chunks each time.

-- 199 of 840 --

You can use this retriever to get chunks (or nodes, as
LlamaIndex terms them) that are relevant to a query by
using this code:
retrieved_nodes = retriever.retrieve(query)
for node in retrieved_nodes:
print(node)
Doing so for the query about the relationship between
Alexander and Diogenes yields nodes such as this:
Node ID: ee1ef41e-3e31-4e07-9949-5e585a50651c
Similarity: 4.2463765144348145
Text: But Diogenes said that he wanted nothing else, except that
he and his
attendants would stand out of the sunlight. Alexander is said to
have expressed
his admiration of Diogenes’s conduct.
The text of these retrieved nodes is what you’ll add to the
context of the prompt during the generation step. Let’s look
at how to do that next.
Generation
Once you retrieve a set of relevant nodes, you can use them
to populate the messages that you will send to the LLM, as
follows:
# instruction
messages = [
ChatMessage(
role="system",
content="Use the following text to answer the given
question."
)
]
# context
messages += [
ChatMessage(role="system", content=node.text) for node in
retrieved_nodes

-- 200 of 840 --

]
# query
messages += [
ChatMessage(role="user", content=query)
]
Note that the first message is an instruction, the
intermediate messages form the context, and the last
message is the query being answered. Then, send these
messages to the LLM:
llm = Anthropic(
model="claude-3-7-sonnet-latest",
api_key=os.environ['ANTHROPIC_API_KEY'],
temperature=0.2
)
response = llm.chat(messages)
When we did it, this was the answer we got:
Based on the text, Alexander and Diogenes had a brief
but notable interaction. When Alexander met Diogenes,
Diogenes simply requested that Alexander and his
attendants “stand out of the sunlight” rather than asking
for any favors or gifts. Alexander is said to have
expressed admiration for Diogenes’s conduct, showing
respect for the philosopher’s simple and independent
nature.
The text also quotes Alexander as saying, “If I were not
Alexander, I should like to be Diogenes,” suggesting that
Alexander respected Diogenes’s philosophical approach
to life and perhaps even envied his freedom from worldly
concerns. The passage notes that this interaction shows
that “Alexander was not entirely destitute of better
feelings,” though he remained “the slave of his insatiable
ambition.”

---

## Sección 49: Chapter 3. Adding

-- 201 of 840 --

As you can see, the answer is grounded quite clearly in the
historical text. In addition to using the retrieved nodes as
context, you should also send them back in the response so
that they can be used to form a citations list. LlamaIndex
nodes will have the metadata of the document they come
from and the position of the chunk within the document.
Example
We put the pieces above into an end-to-end system that
indexes text files from Project Gutenberg and generates
answers to questions based on that text. The full code is on
GitHub. Also note that in our examples, we assume that you
have converted all documents to text and have extracted
images and tables from the documents.

-- 202 of 840 --

INGESTING PDF DOCUMENTS
Ingesting PDF documents into RAG systems presents
unique challenges due to the complex structure of PDFs,
which often contain a mix of text, tables, images, and
other embedded objects. PDF ingestion also needs to
handle headers, footers, and nonlinear layouts.
Therefore, the primary approaches to PDF ingestion
include direct text extraction that uses specialized
libraries, pipeline-based parsing that preserves
document structure, and advanced AI-enabled parsing
that can interpret complex elements.
At the time of writing, there are several tools and
libraries that facilitate PDF ingestion for RAG systems.
LlamaParse is a generative AI–enabled documentparsing technology that is designed for complex
documents, and it offers capabilities to extract text,
tables, images, and even mathematical equations while
transforming them into easily ingestible formats like
Markdown. The unstructured, docling, papermage, and
marker Python libraries offer different approaches to
pipeline-based PDF parsing: unstructured and docling
provide flexibility across multiple document types and
tools, papermage specializes in academic research
papers, and marker focuses on converting PDFs to
Markdown format. Fully managed RAG systems such as
Vertex AI RAG Engine and Glean offer direct PDF
ingestion, although it’s unclear what framework they
use under the hood.
Alternatively, you can feed screenshots of PDF pages
into a multimodal LLM like GPT-4o, Gemini-2.5,
Gemma3, or Llama4 to extract the content.

-- 203 of 840 --

A basic RAG like this (one that is based on keyword search)
is best suited to factual materials. Therefore, we loaded an
equipment manual into the RAG system and asked it this
question:
What should I do if the diaphragm is ruptured?
The answer was this:

-- 204 of 840 --

If the diaphragm is ruptured, you should replace the
safety head with an unbroken head. Additionally, if you
notice any tears, separation, or leaks occurring at the
diaphragm, you should replace the entire valvediaphragm assembly.
When handling the diaphragm components, remember to
unscrew the diaphragm cap by hand (not with a wrench)
and be careful not to disturb the position of the yoke
block by turning the needle, as this would affect the
valve-needle adjustment.
**Sources**:
Node ID: 6afc9709-b53b-4fc9-8f7e-b1bbf198f9b0
Text: Inspect to see if diaphragm is intact. If diaphragm is
ruptured,
replace the safety head with an unbroken head.
Score: 4.869
Node ID: b84ca5bf-c79d-4040-8766-7c528e693559
Text: (3) Unscrew diaphragm cap and pull out washer,
support, and
valve-diaphragm assembly. To prevent loss of valveneedle adjustment
(Fig 54), do not disturb position of yoke block by turning
the needle.
Score: 3.282
It’s clear that the RAG system has picked up a very relevant
part of the text and has used it to generate a good answer.

-- 205 of 840 --

Considerations
RAG is well suited to adding factual knowledge to an LLM.
It works by finding the most relevant knowledge (relevant
to the query at hand) and incorporating it into the context
of the prompt.
Alternatives
None of the techniques for controlling style (see Chapter 2)
will be able to add knowledge. It is clear why patterns such
as Logits Masking (Pattern 1) don’t work—you need the
LLM to be able to generate the tokens before you can mask
them. If the LLM has only seen text from before 2025,
tokens related to Pope Leo XIV will be so unlikely that they
will not even be a choice. This is also the case for few-shot
learning and fine-tuning. Showing a few examples of NFL
players who have changed teams in the past is insufficient
for the LLM to generate text about Geno Smith changing
teams and playing for the Raiders. Similarly, the LLM will
have to generate weights that can be adapted by
instruction fine-tuning, and that’s not going to be possible
for token combinations the LLM has never encountered.
You need that specific data point, and the only time you
know it is during inference.

-- 206 of 840 --

RAG VERSUS LARGE CONTEXT WINDOW
If your document is small enough, you may not need the
retrieval part of RAG. You could simply include the
complete document in the context of the prompt and ask
the model to generate the answer. If you include the full
document, you don’t need to worry about the errors
associated with chunking or with retrieval.
For example, if you wish to query a tax return, you could
load the entire tax return into the prompt and ask
questions. This is shown in our GitHub repository in the
large_context_window.ipynb notebook:
def answer_question(prompt: str, cached_tax_return: str) ->
str:
response = client.models.generate_content(
model=GEMINI,
contents=prompt,
config=types.GenerateContentConfig(
cached_content=cached_tax_return
))
print(f'{response.usage_metadata=}')
return response.text
answer_question("How much did Obama claim in business
expenses?",
"cachedContents/wc0yof...")
...
answer_question("Did Obama make any retirement plan
contributions?",
"cachedContents/wc0yof...")
In this code, we employ server-side Prompt Caching
(Pattern 25 from Chapter 8) to avoid actually repeating
the tax return document in the prompt. The multimodal
LLM will precompute the tokenization and embeddings
as necessary and reuse them for each of the queries.
This helps to keep costs reasonable. (See the code for
full details.)

---

## Sección 50: Chapter 3. Adding

-- 207 of 840 --

Of course, when we say, “small document,” we are
comparing it to the size of the context window
supported by the model. At the time we are writing this
section (June 2025), frontier models offer context
windows of as many as two million tokens, which is just
about enough to hold the entire French tax code.
Instead of building a RAG system on the tax code, you
could include the entirety of it with a query!
Limitations
The Basic RAG we’ve discussed in this chapter has the
following limitations that are addressed by the other
patterns in this chapter:
The need for an exact match
TF-IDF and BM25 look for relevance by matching keywords
exactly. Suppose that instead of asking about a ruptured
diagram, we ask about a broken one:
What should I do if the diaphragm is broken?
The answer that is returned is completely different:
If the diaphragm is broken, you would need to replace the
valve-diaphragm assembly.
The previous answer asked us to replace the safety head,
and the current answer tells us to replace the valvediaphragm assembly. This is very bad. Ideally, we want the
relevant chunks to be the same, whichever word the
mechanic uses. Relevant chunks ought to be identified based
on understanding the question and understanding whether
the chunk contains the answer to the query intent. Seeing
whether specific keywords match leads to poor outcomes.

-- 208 of 840 --

Limits on chunk size
Since the generation is based on the text that is added to the
context, the amount of follow-on text in the chunk impacts
the comprehensiveness of the answer. For example, when
you’re chunking the equipment manual in 100-character
chunks, you usually can’t fit in the follow-on step. The longer
the token count of the input, the greater the cost and the
slower the response. So, there is a limit on how big of a
chunk you can employ.
Several patterns that follow in this and the next chapter—
Semantic Indexing (Pattern 7), Indexing at Scale (Pattern
8), Index-Aware Retrieval (Pattern 11 from Chapter 4,),
Node Postprocessing (Pattern 10 from Chapter 4),
Trustworthy Generation (Pattern 11 from Chapter 4), and
Deep Search (Pattern 12 from Chapter 4)—all improve the
capability of a basic RAG system. First, however, you
should carefully evaluate whether adding complexity by
applying these patterns brings quantifiable benefits.
Moreover, these patterns should be considered add-ons to a
basic RAG. For example, in many cases, a RAG system that
has only an embedding-based retriever (with no keywordbased one such as BM25) will be inadequate. In the
absence of exact matches on keywords in queries, your
RAG system will struggle to identify the right text to
retrieve when searching for specific products, item-codes,
and the like.
References
In 2020, RAG was introduced in the canonical paper
“Retrieval-Augmented Generation for Knowledge-Intensive
NLP Tasks” by Lewis et al. In 2024, Gao et al. reviewed

-- 209 of 840 --

different RAG variants and presented an evaluation
framework for RAG systems. In 2025, Fareed Khan
compared 18 RAG variants on a common evaluation
framework.
AWS summarizes lessons it learned by helping customers
build real-world RAGs. Mercado Libre shares real-world
lessons and insights on building a RAG system.
Pattern 7: Semantic Indexing
Keyword-based indexing, as in the Basic RAG pattern, does
not capture the meaning of the chunk, and it has significant
limitations whenever the knowledge consists of natural
language text, images, video, or tables. However, Semantic
Indexing, which uses the meaning of the chunks as the
indexing mechanism, helps mitigate these limitations.
Problem
Traditional keyword indexing and lookup approaches fail
when documents get more complex, contain different
media types like images or tables, or bridge multiple
domains.
Let’s say you have a document and you try to find it with
the following query:
How do AI systems handle medical terminology
ambiguity?
Suppose that the correct answer, in the knowledge base,
starts like this:

-- 210 of 840 --

Artificial intelligence models struggle with accurately
processing medical information. While parsing through
patient records, these systems often misinterpret
abbreviations like CHF, which can refer to either
congestive heart failure or chronic heart failure—
conditions requiring different treatment approaches. ...
If you use the Basic RAG approach of keyword indexing,
you’ll probably fail to retrieve the chunk that contains the
above snippet. This is because the query mentions “AI,”
while the chunk mentions “Artificial Intelligence” and
doesn’t mention “terminology ambiguity” anywhere in the
text.
Keyword-based indexing methods struggle with matching
queries to chunks when dealing with the following elements
and aspects of text, writing, communication, and
documents:
Synonyms and pronouns
Traditional keyword indexing fails at handling ambiguity
and industry jargon (such as the word AI). If a text chunk
refers to “The President” and the query contains the name of
the president, the two will not get matched.
Overall meaning
Keyword indexing misses the overall meaning of the chunk,
such as the fact that the answer is about technology
ambiguity even though it doesn’t use those words.
Cross-language capability
If the document is in English and the query is in Spanish,
then there will be no matches or the matches may be
irrelevant.
Multimodal documents

---

## Sección 51: Chapter 3. Adding

-- 211 of 840 --

Traditional indexing methods fail at indexing media other
than text, such as images or video.
Layout context
Traditional indexing methods ignore the meaning inherent
in how information is laid out, as in tables or the fact that
figure captions are about the images directly above them.
In these cases, it would be better if we could match chunks
to queries based on meaning, rather than on just keywords.
Furthermore, using exact matches can lead to a number of
false positives. Consider the abbreviation CHF in the
answer. It could mean “congestive heart failure,” “critical
heat flux,” or even “Swiss Francs.” It all depends on the
context and the overall meaning.
Solution
The issues outlined above can be addressed using Semantic
Indexing. With semantic embedding, you can use an ML
model to “encode” the text into a fixed vector
representation that allows you to capture the meaning of
texts, images, and other media types (see Figure 3-3). The
chunks are indexed by this vector embedding, and the
document store is termed a vector store. In this solution,
we’ll start with text embeddings and then expand the
solution to include other media types.

-- 212 of 840 --

Figure 3-3. Semantic Indexing, in which the document store (called a vector
store in this case) stores chunks indexed by their embedding
Embeddings
Embeddings are mathematical representations of text,
images, or other input types. They capture semantic
meaning by mapping words, phrases, or documents to
vectors in a high-dimensional space. LLMs have become
exceptionally proficient at creating semantically
representative embeddings because this capability forms
the foundation for LLM generation.
Unlike simple keyword matching, embeddings place
semantically similar content close together in this vector
space, even when using different vocabulary. To show the
stark difference, let’s walk through the following example:
chunks = [
"I really enjoyed the film we watched last night",

-- 213 of 840 --

"The movie was excellent",
"I didn't like the documentary",
"The cinematic experience was remarkable"
]
# Keyword-based approach
vectorizer = CountVectorizer()
keyword_vectors = vectorizer.fit_transform(chunks)
keyword_matrix = keyword_vectors.toarray()
keyword_sim_matrix = plot_similarity_matrix(
chunks,
keyword_matrix,
title="Keyword-based Similarity Matrix"
)
If you run the example, you’ll get the following similarity
results. Using the keyword approach, none of the
“documents” are actually close (highly similar documents
have a score close to 1). Figure 3-4 presents a visualization
of the similarity matrix.

-- 214 of 840 --

Figure 3-4. Matrix based on similarities between keywords
If you now run the same similarity lookup but use
embeddings instead, you’ll see that all scores are higher
(see Figure 3-5). This is because all documents talk about
movies and one document is very similar to the query. In
the keyword approach, the score was low because movie ≠
film and excellent ≠ great, but embeddings can capture the
similarity between those terms:
model = SentenceTransformer('all-MiniLM-L6-v2')
embedding_vectors = model.encode(chunks)
# Query
query = "The film was great"

-- 215 of 840 --

query_embedding = model.encode([query])[0]
embedding_sim_matrix = plot_similarity_matrix(
chunks,
embedding_vectors,
title="Embedding-based Similarity Matrix"
)
Figure 3-5. Matrix based on similarities between embeddings

-- 216 of 840 --

NOTE
While increasing embedding dimensionality could capture more
semantic information, this approach faces significant computational
limitations. With higher dimensions, the similarity search between
embeddings grows in complexity proportional to N (dimensionality) ×
M (number of embeddings), potentially reaching N² time complexity
in worst-case scenarios. This curse of dimensionality creates
substantial performance bottlenecks in production applications.
Therefore, optimal embedding design balances representational
power with computational efficiency by doing the following:
Using the minimum dimensionality that adequately captures
semantic relationships
Employing dimensionality reduction techniques when possible
Trying to use nearest-neighbor approximations when possible
The goal is to create embeddings that provide sufficient semantic
representation while maintaining reasonable computational
requirements for practical applications.
Now, you might wonder what the limits of the embeddings
are. Could you embed entire books?
While the latest LLMs provide massive context windows,
encoding entire documents in a single embedding vector is
often not advisable. You’ll lose the nuances of the different
parts of a text, lose critical information, and hinder the
RAG system from retrieving relevant information. Plus, it
gets very expensive to use large context windows at scale.
It’s preferable to chunk documents into information-dense
and self-consistent chunks of text.
Semantic chunking
Semantic chunking is dividing text into meaningful
segments based on their semantic content, rather than
arbitrary length. The naivest way of chunking text is based

---

## Sección 52: Chapter 3. Adding

-- 217 of 840 --

on a word or character count, but that can break up closely
related sections and lose context. On the other hand,
semantic chunking preserves context and meaning.
There are several ways to divide text into segments (also
see Figure 3-6):
Length-based with overlap
This is the most straightforward option. You can split the
document into fixed-length chunks that overlap between
segments. This helps preserve context across chunk
boundaries but can still split context blocks.
Sentence-based chunking
This method chunks text into groups of complete sentences
until a size threshold is reached. It preserves the basic
semantic meaning of a block of text but struggles with
capturing the topic transitions.
Paragraph-based chunking
This method uses natural paragraph breaks as chunk
boundaries. It works well for structured documents.
Document-structure chunking
Various document formats, like Markdown or Markup,
provide a structure that you can use to chunk a document
into subsections. For example, you can chunk a Markdown
file into sections of second-level heading sections.
Chunking based on semantic shifts
You can use topic modeling techniques (such as latent
dirichlet allocation and nonnegative matrix factorization) or
embeddings of smaller document subsections to identify
semantic shifts. When you detect a shift, split the document

-- 218 of 840 --

into a new chunk. This method guarantees that the chunks
are of coherent topics.
Figure 3-6. Different document-chunking options
TIP
Several Python libraries offer detailed implementation of the
different text chunking methods. While not recommended for
production use case cases, LangChain’s TextSplitting methods can be
a good starting point for bootstrapping your chunking functionality.
Handling images and videos
So far, we’ve only discussed text documents, so you might
be wondering how to handle documents with relevant
images or add videos to your document index.
To handle images, you can use optical character
recognition (OCR) methods (see Figure 3-7). Modern OCR
tools can extract images from documents and save the

-- 219 of 840 --

images in a media folder alongside the extracted text. Some
types of documents offer alternative texts and metadata for
images you can use instead of the images. For other types
of documents, you have two options for capturing the
content of the relevant images.
The first option is to use an LLM like Llama-3.2-9B to
describe the image. You can then replace the image with
the text description, and after that, you can chunk the text
as discussed earlier and index the individual chunks.
Figure 3-7. Handling of images (photo by Elise Farrow on Unsplash)

-- 220 of 840 --

The second option is to pass the images to an LLM directly
for embedding generation. Multimodal models allow the
creation of embeddings for text and images so that their
vector space overlaps semantically.
You can handle video very similarly. You can transcribe the
video into text if you want to add videos to your index. As
we discussed earlier, you can handle, chunk, and embed
this text like any other text. In addition, you can break
down the video into individual images by sampling
keyframes at regular intervals or scene changes. You can
then embed the resulting images just like regular images.
Figure 3-8. Handling of videos

-- 221 of 840 --

Handling tables
Tables serve as essential structures for organizing key
information in documents. They may contain critical data
such as research results or participant lists that are of
sufficient importance to warrant structured presentation in
tabular format.
When implementing RAG systems, special attention must
be given to table processing. Tables require specific
indexing approaches to preserve their structural
relationships and ensure that both the content and the
meaningful organization of that content are captured.
Proper table handling in RAG pipelines enhances the
retrieval system’s ability to find and utilize this structured
information during generation.
When it comes to the indexing of the table, you have
multiple options. First of all, you should handle any missing
values and ensure that the table is consistently formatted.
With respect to the chunking strategies, you have four
options:
Table-based chunking
If a table is small, you can embed the entire table. This is the
least complex chunking method, but it will not provide finegrained results for queries.
Table-based chunking with a sliding window
As you do when handling text, you can slide over tables and
index the chunks. Keep track of the table headers and attach
the headers to each chunk for more context. This method
works well for large tables.
Row-based chunking

-- 222 of 840 --

You can chunk large tables by rows and embed each row.
This method works well for semantically disconnected rows,
such as a table of random bank transactions.
Column-based chunking
Various types of tables (such as measurements over time)
benefit from keeping the information “together.” If the table
is large, you can embed the individual columns.
Before chunking the overall text surrounding the table, try
to preserve the table’s metadata in the text chuck. This
could be the table name, or it could be a detailed
description of the column headers (which probably mention
specific units) or the overall table.
Handling industry jargon
In traditional RAG systems, if your user searches for the
term heart attack, the RAG system will fail to retrieve
documents that use very specific medical terms for heart
attack, like acute myocardial infarction or cardiac
infarction.
Similarly, attorneys might use a RAG-based application to
search for the term discovery. A query like “What was the
timeline for discovery in federal court” should also include
documents that refer to disclosure or deposition. You can
do this with synonym expansion in the query as follows:
What was the timeline for discovery in federal court? ->
What was the timeline for discovery|disclosure|deposition
in federal court?
Synonym expansion enriches queries by adding related
terms and therefore allowing your system to match content
even when different terminology is used for the same

---

## Sección 53: Chapter 3. Adding

-- 223 of 840 --

concept. But you can also expand terms in the original
documents. That’s more comprehensive, but it increases
your index size.
In traditional NLP, the use of different words by different
roles or in different geographies to represent the same
term requires building a lexicon—a structured vocabulary
that includes the semantic and grammatical properties of
words—to capture these variations. Embeddings make a
formal lexicon unnecessary, but a lexicon can still be
helpful for synonym expansion. So, you can handle industry
vocabulary in the following ways:
You can create a specialized jargon glossary for your
domain to help you map terms to common synonyms.
The implementation is straightforward, but it needs
constant manual curation.
You can use statistical techniques like cooccurrence
analysis to bootstrap a transaction dictionary.
Through these methods, you can determine similar
terms and group them into a translation dictionary.
You can use LLMs to expand terms for you, but
beware of potential hallucinations.
As with synonyms, you can expand your queries and/or
expand the original documents.
WARNING
You have to keep track of directionality in the translation dictionary
because some synonyms only work in one direction. For example,
consider exchange-traded fund (ETF) and index fund. An ETF is an
index fund, but an index fund isn’t automatically an ETF. You can
solve this problem if you maintain the explicit relationships in your
synonym dictionary.

-- 224 of 840 --

Contextual retrieval
Traditional RAG systems lose contextual information when
documents are split into chunks that are too small.
However, if the chunks are too big, then the generated
embedding might be missing specific details. Contextual
retrieval involves addressing the loss of context in chunks
that are too small by adding chunk-specific explanatory
context to each piece of text before embedding or indexing
it.
Let’s say you have chunked a financial report and gotten
the following chunk:
The company’s losses decreased by 10% YoY
With contextual retrieval, you preserve the context of the
quite arbitrary chunk with a context summary of the overall
section or document. Therefore, the contextualized chunk
with synonym expansion could look like this:
This chunk is Walmart’s financial report, released in
Q4/2025. The previous quarter’s earnings increased by
2%. The company’s losses decreased by 10% year on
year.
To create such a contextualized chunk, you’ll have to
summarize the document before prepending it to the
document chunk. To perform this operation efficiently, you
can follow Anthropic’s suggestion to employ an LLM and
send it the following prompt:

-- 225 of 840 --

<document>
{{WHOLE_DOCUMENT}}
</document>
Here is the chunk we want to situate within the whole
document
<chunk>
{{CHUNK_CONTENT}}
</chunk>
Please give a short succinct context to situate this chunk
within the overall document for the purposes of
improving search retrieval of the chunk. Answer only
with the succinct context and nothing else.
Anthropic has demonstrated that contextual retrieval with
this prompt structure and the Claude LLM has reduced
incorrect retrieval rates by 67% consistently across
different content domains. Because it is the first part of the
prompt, the document content (between the document
tags) can be cached, which makes the processing cheap
and efficient (see Pattern 25, Prompt Caching, in

---

## Sección 54: Chapter 8). Once you prepend your document chunks with

the document context, you can embed the contextualized
chunks into semantic and BM25 vectors for the most
accurate RAG responses.
Hierarchical chunking (alternative chunking
techniques)
Traditional RAG systems typically only retrieve short
document chunks, which limits their holistic understanding
of the overall context. This is troublesome for long
documents like research papers and entire books.

-- 226 of 840 --

To address this issue, you could increase the chunk sizes
and overlap them. That would increase the context window
for a better understanding, but nuances might be lost
during embedding generation.
Hierarchical chunking is an extension of semantic chunking
that can address this issue more effectively. During the
processing phase, you build a reversed tree structure
starting at the bottom by chunking documents into smaller
pieces and embedding the chunks. You can then cluster the
chunks into groups and create summaries of the clusters.
You then embed, cluster, and summarize those, and so on
until you have just one note, which is your tree root
(depicted at the top right in Figure 3-9). An advanced
approach to hierarchical chunking and retrieval is called
Recursive Abstractive Processing for Tree-Organized
Retrieval (RAPTOR).
Figure 3-9. Document processing phase of RAPTOR
During the inference step (see Figure 3-10), you walk the
tree to the final chunks. First you find the nearest
embedding of first-level nodes, and then, you match against
all second-level nodes that correspond to the first level
node you chose, and so on. Each chunk and summary node

-- 227 of 840 --

will need its own embedding, so the process is recursive
and isn’t a single-step embedding process.
Figure 3-10. Inference phase of RAPTOR
This process provides you with document information of
varying granularity. You obtain a high-level summary, then
mid-level summaries, and ultimately highly specific chunks.
All the retrieved chunks provide a comprehensive context
for the generation step.
Hierarchical chunking is a simplified version of a
GraphRAG, discussed in the “Component 4: GraphRAG”
section of Pattern 9 in Chapter 4.
Example
In this example, we’ll demonstrate how you can index
tables to query for particular tabular data. For simplicity,
we only focus on the indexing and querying of the tabular
data.

-- 228 of 840 --

Let’s say we have the tabular data available in a structured
format—this will be the case if you extracted the table data
from a relational database or a spreadsheet. If you don’t
have the data available in a structured format, you need to
convert it beforehand.
Suppose that we’re indexing a little product catalog. Each
item has a name, a description, and many numerical and
binary fields:
[{
'product_id': 2,
'name': 'Wireless Noise-Canceling Headphones',
'description': headphones with active noise cancellation',
'category': 'Electronics',
'price': 349.99,
'in_store': True
...
},
...]
First, we need to preprocess the product fields, and we
perform the preprocessing by column types. For example,
all text fields of a row get concatenated and embedded into
an embedding:
def encode_text_embeddings(model, text_data):
# Combine text fields into a single string for each row
embeddings = []
for _, row in text_data.iterrows():
text = f"""Product: {row['name']}. Description:
{row['description']}.
Category: {row['category']}
"""
embeddings.append(model.encode(text))
return embeddings
When working with numerical data (such as sales prices or
stock values), you need to prepare it differently than text

-- 229 of 840 --

data. You should scale all numerical values to fall between
0 and 1, in a process called normalization.
Why is normalization important? Later in the process, you’ll
combine these normalized numbers with text embeddings
(numerical representations of text), and by ensuring that
all numerical values are on the same 0–1 scale, you enable
the RAG system to properly consider both text and
numerical information when it searches for similar content.
The following example shows how to implement a
normalization function. Also, here’s an important note for
production systems: you must save the scaling parameters
(the scaler) that you use during initial setup. This allows
you to apply the exact same scaling transformation to new
data that comes in later, thereby ensuring consistency
across your RAG system:
def encode_numeric_data(numeric_data):
# Normalize numeric values
scaler = StandardScaler()
normalized_numeric = scaler.fit_transform(numeric_data)
return normalized_numeric
Once you convert all fields into embedding data, you can
loop over your table data and concatenate the individual
numerical representations. There are a number of different
approaches to joining the different data representations,
but for this example, you can simply concatenate the
vectors:
def create_hybrid_embeddings(text_embeddings, numeric_data,
boolean_data):
# Combine the embeddings
hybrid_embeddings = []
for i in range(len(text_embeddings)):
# Concatenate approach
combined = np.concatenate([

---

## Sección 55: Chapter 8). Once you prepend your document chunks with

-- 230 of 840 --

text_embeddings[i],
numeric_data[i],
boolean_data[i]
])
hybrid_embeddings.append(combined)
return np.array(hybrid_embeddings)
Now, you can upsert the vectors to the document store that
we can later query. Here, you’re using ChromaDB for
storing and querying the embeddings later:
collection = client.get_or_create_collection(
name="product-catalog",
metadata={"hnsw:space": "cosine"}
)
...
collection.add(
ids=ids,
embeddings=create_hybrid_embeddings(...),
)
If you want to run queries against the embedded tabular
data, you need to create an embedding for your search
data. The text embedding is generated from the user query:
for example, “Top Notebook for Gaming and Work.” Since
you don’t know the numeric features of the product you
want during the inference step, you can use the median
vector of all products. (This simplified approach is shown in
“Pattern 9: Index-Aware Retrieval” in Chapter 4.) After
embedding all the elements, you need to concatenate the
embeddings as you did during the indexing phase.
Once you have your concatenated vector, you can query
your index for tabular data for the closest product:
text_embedding = model.encode([query])[0]
median_numeric = calculate_median_values(df)
boolean_embedding = np.array([1]) # Assuming you're looking for

-- 231 of 840 --

in-stock products
# Create hybrid embedding for the query
query_embedding = np.concatenate([
text_embedding,
median_numeric,
boolean_embedding
])
results = collection.query(
query_embeddings=[query_embedding.tolist()],
n_results=1
)
If you search for “Top Notebook for Gaming and Work,”
then the first search result in your demo index will be the
“Gaming Laptop Pro.”
Query 1: Top Notebook for Gaming and Work
Product: Gaming Laptop Pro
Category: Electronics
Price: $2,499.99
Rating: 4.8 (156 reviews)
In Stock: Yes
Distance: 0.8110852241516113
Considerations
Semantic Indexing involves precomputing embeddings with
a general-purpose embedding model and storing them in a
vector store. Then, chunks whose embeddings are most
similar to the prompt are added to the prompt context
during generation.

-- 232 of 840 --

Alternatives
Instead of using a general-purpose embedding model, you
could use a domain-specific model. If your entire
knowledge base consists of a single PDF (for example), you
could stuff the entire document into the prompt.
Domain-specific embedding models
Using embedding models that are pretrained specifically on
the literature of your industry (such as the medical, legal,
or financial domain) can dramatically improve retrieval
precision and latency. These specialized models capture
domain-specific terminology, relationships, and nuances
that general-purpose models might miss. For example,
medical embedding models understand that “MI” refers to
“myocardial infarction” and properly cluster related
cardiac terminology. Therefore, you can optimize domainspecific embedding models for a small embedding
dimensionality. This will ultimately improve your
production latency because similarity calculations will be
faster on smaller dimensionality vectors.
Chunking versus long context windows
At the time of writing, documents of up to 200,000 tokens
(around 500 pages) fit perfectly well into most LLM context
windows and don’t require any RAG applications.
Therefore, for smaller corpuses, you can avoid dealing with
the complexity of RAG systems. See the sidebar discussion
in “RAG Versus Large Context Window”, later in this
chapter.
While long context window models can process entire
documents, strategic chunking with appropriate overlap
often provides better retrieval performance for specific
information needs. Effective chunking strategies balance

-- 233 of 840 --

granularity with contextual coherence, thus ensuring that
related concepts remain together while enabling precise
retrieval of specific information.
Limitations
While Semantic Indexing is very powerful, you should be
aware of its limitations:
Fixed-dimensional representation constraints
Most embedding models map text to fixed-dimensional
vectors (typically 768–4,096 dimensions) and create an
inherent information bottleneck in the process. This means
complex, nuanced chunks must be compressed into the
same vector space as simple ones, which means they
inevitably lose some information depth. As document
complexity increases, this compression becomes more
problematic, especially for highly technical or multifaceted
content.
Chunking challenges
Breaking documents into smaller pieces for indexing
purposes can disrupt their semantic coherence and make
them lose important cross-reference connections between
sections. For example, if a concept is introduced in one
section of a document and elaborated on in another,
chunking may separate these related parts and make it
difficult to retrieve the complete context. Additionally,
determining optimal chunk sizes remains more of an art
than a science, and it often requires domain-specific tuning.
Vector database scalability issues
As vector collections grow into millions or billions of
embeddings, you’ll need to employ approximate nearest
neighbor (ANN) search techniques such as ScaNN and Faiss

---

## Sección 56: Chapter 8). Once you prepend your document chunks with

-- 234 of 840 --

to maintain reasonable query times. This sacrifices retrieval
accuracy for speed, and these approximation methods also
introduce tradeoffs among recall, precision, and
computational efficiency that become increasingly
challenging to optimize at scale.
Temporal understanding problems
Standard Semantic Indexing typically doesn’t account for
time-based relationships or document freshness, which can
be crucial for certain applications. Information that changes
rapidly (like news, market conditions, and evolving
research) may be incorrectly represented if the temporal
dimension is ignored. Also, embedding models generally
lack inherent mechanisms to distinguish between outdated
and current information.
Lack of reasoning capabilities
While vectors can capture semantic similarity, they don’t
enable logical reasoning across documents or facts without
additional augmentation. Embeddings excel at finding
related content but struggle with tasks requiring inference,
deduction, or causal understanding. Questions that require
connecting multiple pieces of information logically often
expose these limitations.
Problems due to shared vector spaces for text and images
In multimodal models, embedded images and texts often
don’t align properly in the shared vector space. The
semantic relationship between the visual and the textual
content can be inconsistent, which can lead to false positive
retrievals downstream. A query about “apple computers”
might retrieve images of fruit rather than technology if the
vector space doesn’t properly differentiate these concepts
across modalities.

-- 235 of 840 --

Problems with representation of tabular data
When you concatenate normalized numerical data to text
embeddings, the text embedding can outweigh the
numerical information. Imagine you have a 512-dimensional
text embedding and two numerical columns you want to
add. In this case, the dimensionality increases from 512 to
514 dimensions, and the two additional numerical
dimensions will be heavily overshadowed by the much
larger text embedding. You therefore need to carefully
design the embedding structure to ensure that the numerical
data maintains its influence in the similarity calculations.
In spite of the above limitations, Semantic Indexing forms
the core of most RAG applications in production today.
References
The idea of embeddings and why they are so powerful was
introduced by Bengio et al. (2000). Chris Olah (2014) has
an excellent visual explanation of embeddings, and
Schwaber-Cohen and Patel (2025) of Pinecone describe the
role of chunking in LLM applications.
Docugami employs hierarchical chunking in knowledge
graph RAG applications.
Pattern 8: Indexing at Scale
Indexing at Scale is a set of strategies that are necessary to
handle the indexing operation in large-scale production
systems. Running a RAG system in production requires
handling details that you may not have to deal with in toy
problems and proofs of concept (PoCs)—including details
such as data freshness and conflicting information.

-- 236 of 840 --

Problem
Running a RAG system in production introduces several
critical challenges that emerge over time, and what begins
as a well-functioning system can gradually degrade in
performance without proper maintenance strategies. We
cover these challenges in this section.
Disambiguation
As the size of your knowledge base increases, so does the
potential for words to mean different things. For example,
in regular English, a fluid is almost always a liquid. In
physics, though, both liquids and gases are fluids. To
understand whether a document about fluids is applicable
to a question about oxygen, you’d have to know whether it
was a scientific article written for physical scientists or a
general-interest article written for laypersons.
Data freshness
Once you deploy your initial documents into the document
store, they inevitably become outdated as newer
information becomes available. Without a systematic
approach to making content updates, your RAG system will
deliver increasingly obsolete responses.
Imagine you’re using a RAG system to advise users on
medical questions. The health authorities might issue new
warnings. Medical boards might update dosage
recommendations. New viral strains may become
prevalent. For example, in early 2020, the Centers for
Disease Control (CDC) recommended a 10-day isolation
period for all COVID patients. Then, in December 2021, it
updated its guidelines to a 5-day isolation period, but only
for symptomatic patients. And finally, in February 2024, the
CDC updated its guidelines again to drop the isolation

-- 237 of 840 --

period completely and simply say that people with COVID
should stay home as long as they feel sick.
In the CDC example, each update to the recommendations
adds conditions to the previous guideline. It is not as easy
as just keeping the latest recommendation—if you were to
simply remove the earlier guidelines, the most recent
update would lose its context.
Therefore, data freshness needs to be handled carefully
Contradictory information
Standard similarity-based retrieval often lacks important
contextual understanding, and that can lead to irrelevant or
inappropriate results.
Imagine another medical use case in which different
medical books regarding hypertension-related blood
pressure guidelines get ingested into your RAG system.
Before 2017, hypertension was generally defined as blood
pressure readings of 140/90 mm Hg or higher. For older
adults (65 or older), an even higher threshold of 150/80
mm Hg was considered acceptable, according to previous
guidelines.
Then, in November 2017, the American Heart Association
(AHA) and American College of Cardiology (ACC)
dramatically changed the definition of hypertension to
130/80 mm Hg, down from the previous 140/90 mm Hg
threshold. This reclassified millions of Americans as having
high blood pressure overnight.
Then, the information was revised again. In 2022, the
American Academy of Family Physicians (AAFP) released
guidelines contradicting the lower ACC/AHA targets,
noting that “using a blood pressure target of 140/90 mm

---

## Sección 57: Chapter 8). Once you prepend your document chunks with

-- 238 of 840 --

Hg reduces cardiovascular and all-cause mortality as much
as lower targets” while causing fewer adverse effects.
As you can see in Figure 3-11, adding the information
continuously to your RAG system will lead to misleading
and contradicting RAG responses, even in two different
requests for the exact same initial user query.

-- 239 of 840 --

Figure 3-11. Degrading RAG system performance with an increasing index size

-- 240 of 840 --

Model lifecycle
When using proprietary models, especially for embeddings,
you run the risk of having to reindex all of your knowledge
base when the model provider deprecates its embedding
model.
Solution
Appropriately using metadata can help you handle the need
for disambiguation, ensure that results reflect the latest
information, and navigate through contradictory
information.
Metadata
Using the document’s metadata—which is data that
provides information about the document (such as its
author, domain, and name)—provides additional context
that can be very beneficial in improving retrieval
performance. For example, if you know that a user is
interested in financial information, you could filter down
the document store to only financial documents (such as
United States Securities and Exchange Commission [SEC]
reports and CNBC news articles). By applying such a
metadata filter, you effectively remove any sports-related
content, and a query or search for “MVP-related
information” would not return any sports-related content.
Similarly, if the topic category contains physics, you’ll know
how to interpret the word fluid.
There are different types of metadata to include in your
document store:
Document-level metadata

-- 241 of 840 --

– Source information (URL, document ID, and
database origin)
– Creation/modification timestamps
– Author information
– Topic categories or tags
– Reading level or complexity score
– Document length
Chunk-level metadata
– Position within source document (chapter,
section, and paragraph)
– Entities mentioned (people, organizations,
and places)
– Semantic role (definition, example, or
conclusion)
– Language or locale information
Domain- and enterprise-specific metadata
– For technical documentation: API versions
and programming languages
– For research papers: methodology, sample
size, and key findings
– For product information: stock-keeping units
(SKUs), pricing, and availability
– For legal documents: jurisdiction, precedents,
and statutes
– For knowledge of direct market access (DMA)
requirements

-- 242 of 840 --

Authentication, authorization, and confidentiality
metadata
– Which roles are allowed to access the data?
– How are they allowed to authenticate
themselves?
– Who needs to provide consent before this
data can be used in RAG?
– Should data be encrypted, anonymized, or
redacted for certain access levels?
When you design your RAG system, consider storing the
metadata separately from the embeddings if it causes
major performance impacts. Some vector databases allow
you to filter on a binary condition (for instance, based on
whether a tag is present or not), while other vector
databases allow filtering based on continuous values (such
as limiting the index to all documents added after January
1, 2025). However, the latter option comes with
performance downsides, as vector databases are often not
optimized for such kinds of queries.
Detecting contradictory content
Querying your knowledge base can retrieve contradictory
chunks, but you can use the available metadata to resolve
the contradictory information.
Here are several ways you can use metadata to discover
contradictions:
By timestamping chunks, or temporal tagging, you
can identify when information was created or last
updated. If two chunks have different timestamps
but contain conflicting information about the same

-- 243 of 840 --

topic, it may indicate a potential contradiction that
may be explained by changes over time.
Using metadata that tracks the origin of each chunk
allows the system to identify when contradictions
stem from different sources with potentially
different levels of reliability or authority.
Categorizing chunks by subject area helps group
related information, which makes it easier to surface
contradictions within a specific domain.
Tracking different versions of the same information
allows the system to understand how facts have
evolved and identify outdated information.
Here is an example of how you can discover contradictions
through metadata. Consider the following two retrieved
chunks for the user query “What’s the recommended
treatment for condition X?”
Here’s Chunk 1:
Content: "For patients with condition X, treatment with
medication A is
recommended as first-line therapy."
Metadata:
* Source: National Health Guidelines
* Publication date: March 2023
* Domain: Treatment protocols
* Citation: Journal of Medical Practice, Vol 45
And here’s Chunk 2:
Content: "Medication A is no longer recommended for condition X
due to newly
discovered side effects. Medication B should be used instead."
Metadata:
* Source: Medical Research Institute
* Publication date: January 2025

---

## Sección 58: Chapter 8). Once you prepend your document chunks with

-- 244 of 840 --

* Domain: Treatment protocols
* Citation: Recent Clinical Findings, Vol 12
Both of the chunks are semantically relevant, but they
represent contradictory information. Through the
metadata, you can prefer the most recent chunk (from 2025
rather than 2023) or pick the chunk that’s based on
information the metadata says was published in a more
reputable journal.
This metadata-aware approach helps resolve the
contradiction by providing context about why the
information differs, which enables better decision-making
and more accurate responses from your RAG system.
Detecting outdated content
Keeping the data in your document store current is a
constant struggle, so having the metadata available is
extremely helpful. As Figure 3-12 illustrates, you can use
the metadata for three purposes:
Retrieval filtering
You can limit outdated content by restricting the retrieval to
only consider document chunks that were published after a
certain date. This method will ensure that a result is current.
Document store pruning
You can use the metadata to remove from the document
store document chunks that are older than a certain number
of days. Removing old content from your document store is
preferable to retrieval filtering because the smaller index
results in faster retrievals.
Result reranking

-- 245 of 840 --

You can use the metadata to rerank the document chunks
after the retrieval step. At that point, you can boost more
recent document chunks or chunks from more trustworthy
sources. This method prioritizes more relevant content.
Figure 3-12. Different options to handle outdated content
Managing model lifecycle
When you use embedding models from open source or
closed source providers, pay attention to the model
lifecycle. Model providers like OpenAI and Google tend to
deprecate model APIs over time. Even with a long
deprecation period (often, it’s 12 months or more), the
disappearance of model APIs will have a tremendous
engineering impact on your RAG system. If you have to

-- 246 of 840 --

change embedding APIs, you’ll need to reindex all
document chunks in your document store because
embeddings between different model versions are
incompatible. This can cause a significant churn of compute
resources.
Imagine you’re building a RAG system for US patent
applications. Roughly 1,000 patents are granted in the U.S.
daily—and for a single year, that means roughly 350,000
patents, millions of pages and figures, and many millions of
chunks for a single year in one country. So, you can see
that a document store can grow very quickly.
Reindexing all historical documents will take time, and it
can be costly. Therefore, you should either choose a model
API that has long support life cycles or choose an open
weights model for this task. You can host such embedding
models locally or on a hyperscaler. To find the right
embedding model, we suggest that you consult the ranking
of embedding models on the Massive Text Embedding
Benchmark (MTEB) and choose the model that best fits
your requirements—based on things like whether you need
multilingual embeddings or whether retrieval or reranking
is the bottleneck faced by your RAG applications. At the
time of writing, Gemini embeddings was the best overall,
but the open Qwen2 model from Alibaba was third on the
leaderboard and only 10% lower on the aggregate score.
OpenAI’s best model, text-embedding-3-large, was well
behind, in 13th position. So, using an open weights model
instead of a proprietary one that gives you full control over
the model lifecycle may involve little to no compromise on
performance.
However, this doesn’t mean that you should never switch.
Here are some scenarios in which you should consider
switching embedding models:

-- 247 of 840 --

When significantly more efficient embedding models
are released (for example, when a newer model can
hold the same information content at 25% of the
original dimensionality)
When your application requires a fresh world view,
since newer models have a more recent cutoff date
and therefore know about recent events or new
terms
The decision you make when selecting an embedding model
is a critical one because it will significantly impact how well
your RAG application can be maintained over time.
Therefore, you should carefully consider all the options
before choosing a model.
Example
Prefiltering your RAG index based on metadata can
drastically improve response accuracy. Metadata filtering
allows you to do things like filter to specific document
domains, creation dates, and document sources.
Let’s assume you have structured data around your
document chunks. You need to annotate each chunk with
the original document’s metadata (for example, its creation
date and source), as shown here:
documents = [
{'id': 1,
'text': '...',
'source': 'New York Times',
'created_at': '2025-01-01'
},
...
]

-- 248 of 840 --

Aside from your embeddings, you need to create a list of
dictionaries that will contain the metadata related to the
embedded document chunk. Then, you can create your
collection with embeddings together with the metadata.
Every vector database has a slightly different
implementation, but the overall concept is always the same:
metadata = []
for j in range(len(documents)):
meta = {'source': documents['source'][j],
'created_at': documents['created_at'][j]}
metadata.append(meta)
collection.add(
ids=ids,
embeddings=vectors,
metadatas=metadata
)
To prefilter the index during your inference step, you build
a number of binary filters before you pass it as a WHERE
clause to the vector database. Here, we’re demonstrating
the syntax and implementation by ChromaDB:
where_conditions = []
for key, value in filters.items():
where_conditions.append({key: value})
if len(where_conditions) > 1:
where = {"$and": where_conditions}
elif len(where_conditions) == 1:
where = where_conditions[0]
results = collection.query(
query_embeddings=[query_embedding.tolist()],
where=where
)
If we apply the metadata filtering to our previous example
of a product catalog, you can see the difference in query
results. First, let’s run a query without any filters:

---

## Sección 59: Chapter 8). Once you prepend your document chunks with

-- 249 of 840 --

results = process_query(model, client, "Top Gaming Laptop",
filters={})
print_results(results, df)
Then, we receive the results:
Product: Gaming Laptop Pro
Created At: 2025-01-01
Distance: 0.30149245262145996
--------------------------------------------------
Product: Gaming Laptop Pro
Created At: 2024-01-01
Distance: 0.30149245262145996
--------------------------------------------------
Product: Wireless Noise-Canceling Headphones
Created At: 2025-01-01
Distance: 0.8581079244613647
If we now want to filter the results to only show products
that have been added in 2025, we can add the filter
"created_at": "2025-01-01":
results = process_query(model, client,
"Top Gaming Laptop",
filters={"created_at": "2025-01-01"})
print_results(results, df)
The returned results won’t contain the products that were
added in 2024, as was shown in the no-filter example:

-- 250 of 840 --

Product: Gaming Laptop Pro
Created At: 2025-01-01
Distance: 0.30149245262145996
--------------------------------------------------
Product: Wireless Noise-Canceling Headphones
Created At: 2025-01-01
Distance: 0.8581079244613647
Considerations
Running indexes at scale increases the engineering
complexity of your RAG projects. We want to point out
alternatives and describe a few of the limitations of using
metadata:
Metadata quality issues
The effectiveness of metadata filtering relies entirely on the
quality and consistency of the metadata itself. If metadata is
incomplete, inaccurate, or inconsistently applied, then the
filtering becomes unreliable.
Binary limitations
Some vector databases only allow binary filters (for
example, tag present or not), which significantly restricts the
nuance of filtering operations compared to continuous value
filtering.
Temporal relevance issues
Simply using dates to determine content relevance can be
misleading. An analysis from 2020 might still be highly

-- 251 of 840 --

relevant, yet recent technical documentation can already be
outdated.
Domain adaptation issues
Using a metadata filter is domain specific. For example, in a
RAG system for academic papers, you might want to filter by
academic institution, whereas such a filter is irrelevant for a
customer service application.
If these limitations are deal breakers, you could consider
the following:
Creating domain-specific indexes
For very large indexes, filtering by the metadata can be slow
during the query and preprocessing (such as when
approximating nearest neighbors). Instead of adding all
content into one index, consider splitting up the indexes by
domain and routing your queries to the respective indexes.
Implementing incremental indexing
Rather than completely reindexing all of your documents,
consider making incremental updates in which you only
create new documents or modify existing documents in the
index. This reduces computational overhead compared to
full reindexing.
Maintaining documents with semantic relationships,
regardless of document age
Instead of simply removing outdated content, you can
maintain documents that have clear semantic relationships
among them, which allows the system to understand content
evolution over time. Doing this will increase your document
store and make the deletion process more complex, but it
can improve your response qualities.

-- 252 of 840 --

By carefully evaluating these alternatives against your
specific use case requirements, you can create a more
efficient and maintainable RAG system that balances
performance with scalability.
References
Chen, Zhang, and Choi (2022) explore how to calibrate
models to diagnose when retrieved chunks conflict. Wang
et al. (2025) create a dataset that’s designed to foster
research into cases of ambiguity, misinformation, and
noise.
Summary
Because the patterns in the next chapter continue to
increase in sophistication and complexity relative to the
ones we’ve discussed in this chapter, we’ll wait till the end
of Chapter 4 to summarize both sets of patterns.
1 Model training costs obviously change over time, due to increases in
hardware capability and model sizes and capabilities. Galileo.ai estimates
the cost of training the 2025 crop of frontier foundational models (Gemini
2.0 and GPT-4) at tens of millions of dollars. The cost of post-training these
models varies by model size, quantity of additional data, GPU capability,
and compute costs. Based on a 2023 paper, if you have 1 million new
pages and are training a 13B parameter model, the cost would be in the
tens of thousands of dollars. So, if you need to train daily, you’re looking at
about 10 million dollars.
2 Try it! Whether or not you get foodie cities depends on the extent to
which the model you are using has been trained to use all of the relevant
information in the context.
3 The information in the context is used just for this one interaction. If
you’re using a web interface like ChatGPT, it might be retained for the
session. The core model is updated during its periodic retraining, so after
a few months, it will learn this new information. Training on user data

---

## Sección 60: Chapter 8). Once you prepend your document chunks with

-- 253 of 840 --

provided in prompts would make the models susceptible to adversarial
attacks. When model providers say they might use your prompts to
improve their models, it’s more likely that they’ll look at patterns of usage
and the topics of your prompts.

-- 254 of 840 --

---

## Sección 61: Chapter 4. Adding

Knowledge: Syncopation
The patterns in this chapter build on the fundamentals of
RAG we discussed in Chapter 3 (see Figure 3-1). We
recommend that you read Chapter 3 before this one, to
learn the fundamental concepts that underlie all RAG use
cases. Once you gain an understanding of the possibilities,
you can choose how to implement the components of your
RAG pipelines based on the characteristics of your use
case. We cover that in this chapter.
Pattern 9: Index-Aware Retrieval
You can improve on Basic RAG (Pattern 6) and Semantic
Indexing (Patterns 7) by taking advantage of knowing what
text the chunks contain and how they’ve been indexed.
Which specific components of this pattern you incorporate
will depend on the type of content you have.
Problem
RAG is based on the assumptions that (1) you can search a
knowledge base for chunks that are similar to a question
and (2) you can use the retrieved chunks to ground the
answer. However, the first assumption does not hold in
several situations: when the question is not present in the
knowledge base, when the knowledge base uses technical
language that is different from what users query for, when
the answer is a fine detail hidden inside a chunk, and when

-- 255 of 840 --

the answer involves a holistic interpretation of several
chunks.
Question not present in knowledge base
Unless you’re indexing FAQs, support tickets, or discussion
forums, the question itself will not appear in the knowledge
base. For example, you may ask this question:
What’s a historical attraction within a 2-hour train ride
from Madrid?
There may be no exact match for this question within your
knowledge base. Instead, your knowledge base may include
a chunk such as this:1
Toledo is primarily located on the right (north) bank of
the Tagus in central Iberia, nestled in a bend of the river.
It is known as the “City of the Three Cultures” for the
cultural influences of Christians, Muslims, and Jews
throughout its history.
And another chunk may note this:
Work began on a high-speed link to Madrid, which
entered service on November 15, 2005.
Neither the Basic RAG approach nor the Semantic Indexing
variation will retrieve these chunks, because the chunks
share neither keywords nor meaning with the question.
Knowledge base uses technical language that differs
from user queries
Another problem is that users do not necessarily know or
use the terms used within the chunks. For example, the
user might ask about “Muslim palaces,” whereas the chunk
may refer to Alhambra as a “Nasrid fortress.” These are not
synonyms, so semantic matching will not help.

-- 256 of 840 --

Answer is a fine detail hidden in a chunk
In Semantic Indexing, the entire chunk is represented by a
single embedding. Searching for a fine-grained detail
within a chunk may not work because that detail is not
present in the representation of the chunk as a whole.
For example, in the middle of a long paragraph about the
architecture of a Nasrid palace, there might be a detail
about muqarnas, or sculptures on the vaulted ceiling. That
detail may not be present in the embedding of the chunk
and may therefore not be discoverable.
To some extent, you can solve this problem by indexing
smaller chunks. However, having small chunks incurs the
next problem much more acutely.
Answer involves holistic interpretation
Suppose you ask a question that requires logical
interpretation. The model will need to retrieve chunks that
match the steps of the logic involved, and the generator
will have to piece together these chunks in a logical way.
For example, say you were to ask this:
What caused the collapse of Alhambra?
How would you know that you needed to retrieve chunks
related to the Nueva Planta decrees, which led to the
establishment of a centralized Spanish state that was
capable of driving the Nasrid rulers out of Spain?
These are all chicken-and-egg problems. How can you
match answers without knowing what the answer is? How
can you recognize that the Nasrids were a Muslim dynasty?
How can you index details without knowing what details
will prove important to a user query? How can you match

-- 257 of 840 --

chunks to the steps of the logic without knowing the logic
that’s needed to answer the question?
Solution
Index-aware retrieval is a set of ideas—hypothetical
answers, query expansion, hybrid search, and GraphRAG
(see Figure 4-1)—that you can add on to the Semantic
Indexing approach to help you address the chicken-and-egg
problems listed previously. You should consider these ideas
individually and determine whether they make sense for
the kinds of content you are indexing and the kinds of
questions your RAG system is answering.

-- 258 of 840 --

Figure 4-1. Index-aware retrieval

-- 259 of 840 --

Component 1: Hypothetical answers
In situations where doing a semantic search for the query
itself would work poorly, try searching for sentences that
would answer the query. Suppose you were to take the
question about historical attractions and ask a foundational
LLM to create an answer without the benefit of your
knowledge base. The answer might be something along the
lines of this:
Segovia is a city famous for its well-preserved Roman
aqueduct and Alcázar castle. Its old town is a UNESCO
World Heritage site. The train ride from Madrid to
Segovia is typically under an hour.
The issue, of course, is that this answer is not grounded in
your knowledge base—and you want to find cities in your
knowledge base (presumably because you offer guided
tours to those places).
To solve this problem, instead of trying to find matches to
the question in the knowledge base, you can try to find
matches to the hypothetical answer generated by the
foundational LLM! Such an approach is likely to return
chunks that discuss cities with well-preserved old town
cores or train ride times from Madrid. Because the
academic literature in this area refers to chunks as
documents, this method is called hypothetical document
embedding (HyDE).

---

## Sección 62: Chapter 4. Adding

-- 260 of 840 --

HYDE AS A SOLUTION TO THE PROBLEM OF
PERSPECTIVES
Many of our examples in this chapter assume that all
information is correct and inarguable. However, many
knowledge bases will contain articles by people with
different points of view or interpretations of the same
events.
In public health, for example, topics such as mask use,
quarantine, abortion, fluoridation, and needle exchange
centers have been subject to vigorous debate. Any large
enough medical database will contain documents that
express different points of view on these topics, and
chunks extracted from these documents may well be
contradictory.
HyDE can help in this situation. You can generate
hypothetical answers that take different perspectives,
and then, for each perspective, you can find documents
that match the viewpoint in that perspective and do RAG
limited to only those documents.
To perform HyDE, use a foundational model to generate a
hypothetical answer:
def create_hypothetical_answer(question):
messages = [
ChatMessage(role="system",
content="""Answer the following question in
2-3 sentences.
If you don't know the answer, make an educated guess.
"""
),
ChatMessage(role="user", content=question)
]
answer = str(llm.chat(messages))
return answer

-- 261 of 840 --

Then pass this answer to the generation step:
def hyde_rag(question):
answer = create_hypothetical_answer(question)
return semantic_rag(answer)
Component 2: Query expansion
Instead of passing the query as is to a semantic RAG, you
can expand the query to add context and translate terms
used in it to the ones used in the chunks. Using such a
transformed query may help match chunks better.
To perform query transformations such as expansion, you
can use a foundational model. The exact context and set of
translations will depend on your use case. Here’s an
example:
def add_context_to_query(question):
messages = [
ChatMessage(role="system",
content="""
The following question is about topics discussed in a secondcentury book about
Alexander the Great. Clarify the question posed in the following
ways:
* Expand to include second-century names. For example, a question
about Iranians
should include answers about Parthians, Persians, Medes,
Bactrians, etc.
* Provide context on terms. For example, explain that Ammonites
came from Jordan
or that Philip was the father of Alexander.
Provide only the clarified question without any preamble or
instructions.
""".strip()
),
ChatMessage(role="user", content=question)
]
expanded_question = str(llm.chat(messages))
return expanded_question

-- 262 of 840 --

Then, your RAG system will expand a given query before
attempting to match against indexed chunks:
def qryexp_rag(question):
expanded_question = add_context_to_query(question)
print("Expanded question: ", expanded_question)
return semantic_rag(expanded_question)
You can, of course, combine query expansion with HyDE.
Component 3: Hybrid search
Semantic Indexing helps you match queries to chunks
based on the overall meaning of the chunks. As chunks get
larger, though, finer details are lost in the captured
meaning. One way to address this is to index chunks both
on keywords and on meaning (embedding). Then, the score
of a chunk becomes a weighted average of the similarity
score computed with the BM25 and vector search
approaches.
In LlamaIndex, the way to do this is to provide the weight,
which is the alpha, of the vector search component:
query_engine = index.as_query_engine(
vector_store_query_mode="hybrid", similarity_top_k=2,
alpha=0.25
)
An alpha of 0.0 is purely BM25, whereas an alpha of 1.0 is
purely vector search. Hybrid search in LlamaIndex relies
on the vector store in question to index chunks based on
both BM25 and embeddings. At the time of writing,
Postgres, Pinecone, and Weaviate are among the vector
stores that support this.
If you have a vector store that doesn’t support hybrid
search, you can replicate it by using two retrievers and

-- 263 of 840 --

combining their results. We’ll discuss this approach in the
“Reranking” section in Pattern 10, Node Postprocessing.
Component 4: GraphRAG
The idea behind a GraphRAG is that, having discovered a
chunk that has a partial answer to your question, you can
retrieve related chunks. This can help you round out the
context when each chunk is small. You can also index a
document with a small chunk size and then store the
embeddings in a tree form so that the embedding of a
parent node captures the holistic meaning of all the nodes
below it. You can even repeat nodes within the RAG if they
make sense in different contexts. You can also index the
nodes on both keywords and on embeddings to permit
different types of retrieval for different types of queries. In
addition, you can incorporate query-focused summarization
into a GraphRAG by pregenerating and storing summaries
for all groups of closely related entities.
In a GraphRAG, the document store is a graph database. A
GraphRAG system will index documents into a tree of
nodes, use graphs to retrieve related nodes, and employ
the relationships between the retrieved nodes to generate
the response (see Figure 4-2).

---

## Sección 63: Chapter 4. Adding

-- 264 of 840 --

Figure 4-2. A Graph RAG system uses a graph database as its storage
mechanism, indexing adds nodes to the graph, and retrieval makes use of the
graph relationships (image from Peng et al., 2024)

-- 265 of 840 --

Typically, you’ll build a knowledge graph in a graph
database such as Neo4j to represent your knowledge in a
domain-specific, structured way, where the nodes capture
relationships that are appropriate for your domain. If you
don’t have such a knowledge graph, you can ask an LLM to
do its best to extract entities and tie them together by
using, for example, LangChain:
llm_transformer = LLMGraphTransformer(llm=llm)
graph_documents =
llm_transformer.convert_to_graph_documents(text)
You can then store the extracted graphs in a GraphStore:
graph_store = Neo4jGraphStore(...)
graph_store.write_graph(graph_documents)
Retrieving chunks from a GraphStore works similarly to
using the BM25 or Semantic retriever:
graph_rag_retriever = KnowledgeGraphRAGRetriever(...)
query_engine =
RetrieverQueryEngine.from_args(graph_rag_retriever)
GraphRAG systems can leverage explicit entity and
relationship representations to retrieve related chunks and
use them to generate responses. In this way, GraphRAG
systems go beyond vector database–based systems that
treat retrieved chunks as being independent.
Example
We’ll use a second-century history book about Alexander
the Great to illustrate the limitations of Semantic Indexing
and the benefits of index-aware retrieval. The full code is
on GitHub.

-- 266 of 840 --

Limitations of Semantic Indexing
Semantic Indexing works well for the most part. For
example, you might ask this:
How did Alexander treat the people of the places he
conquered?
This returns a response grounded in specifics from the
book:
Alexander took Hyparna at first assault but allowed the
Greeks to leave the citadel under a truce. … When the
Thebans were defeated, their territory was distributed,
and the women and children were sold into slavery, with
exceptions made for priests, priestesses, those bound by
hospitality to Philip or Alexander, and public agents of
the Macedonians.
Even in situations where the foundational model has the
knowledge from its pretraining, the RAG response stays
within the confines of the knowledge in the book. For
example, say you asked this:
Where did Alexander die?
It would return this:
The provided text does not contain information about
where Alexander died.
It does this because the book is about military campaigns
during Alexander’s lifetime. This behavior is important in
enterprise use cases where you have proprietary
knowledge and want your RAG to be grounded on that
knowledge (instead of having it generate based on the
public internet sources that the foundational model was
pretrained on).

-- 267 of 840 --

However, being able to retrieve fine details depends
heavily on the chunk size. Say you ask this question:
Describe the relationship between Alexander and
Diogenes.
It retrieves the information when the chunk size is 100, but
it fails to do so when the chunk size is 1,024—which is the
default size in LlamaIndex. You might recall that we used
the same example in Pattern 6, Basic RAG, in Chapter 3,
and got responses every time. That’s because we were
using matching keywords, and Diogenes is rare enough
that keyword matching reliably finds it.
Piecing information together holistically across many
chunks is quite hard. Let’s ask this question:
What was Alexander’s strategy against Darius III?
This produces the following answer:
Alexander was advised to advance against Darius and the
Persians without delay. He marched his troops towards
Darius, but a storm delayed him. Upon hearing that
Darius was in his rear, Alexander sent a ship to Issus to
confirm the report.
The problem here is that this answer is about tactics in a
single battle, rather than an overarching strategy.
Another limitation of semantic RAG shows up when the
question uses 21st-century terms:
How did the Persian king fight the Greeks?
This returns the following answer:
The Persians struck the Greeks on their faces with lances
and were repulsed by the cavalry.

-- 268 of 840 --

This is woefully limited because the retrieved chunks are
quite sparse. In Alexander’s time, it was the Parthians
fighting the Macedonians, so there are not many chunks
that use the words Persian or Greek.
HyDE
If you use the HyDE approach instead, you will first ask the
LLM to generate a hypothetical answer. The hypothetical
answer generated is this:
Alexander’s strategy against Darius III centered on
forcing decisive battles to cripple the Persian army and
seize key territories. He aimed to draw Darius into open
combat, exploiting his own superior tactics and the
Macedonian phalanx to achieve overwhelming victories,
rather than relying on prolonged sieges or attrition.
The next step in HyDE is to look for chunks that match this
hypothetical answer. This finds chunks throughout the
book, and using the retrieved chunks as content for the
generation provides a holistic response that remains
grounded in the details found in the book:

---

## Sección 64: Chapter 4. Adding

-- 269 of 840 --

Alexander’s army was arranged with the cavalry
Companions on the right wing, followed by the royal
squadron and other squadrons. The phalanx of
Macedonian infantry was positioned near the cavalry,
with select corps of shield-bearing guards leading the
way. Darius’s army was set up with Bactrian cavalry,
Daans, and Arachotians on the left wing; Persians,
Susians, and Cadusians near them; and men from CoeleSyria and Mesopotamia on the right. Medes, Parthians,
Sacians, Tapurians, Hyrcanians, Albanians, and
Sacesinians were also positioned on the right. In the
center, where Darius was, were his kinsmen, Persian
guards, Indians, Carians, and Mardian archers. The
Uxians, Babylonians, men from the Red Sea, and
Sitacenians were also in the center. Scythian cavalry,
Bactrians, and scythe-bearing chariots were posted on
the left, while Armenian and Cappadocian cavalry with
scythe-bearing chariots were on the right. Greek
mercenaries were stationed near Darius, opposite the
Macedonian phalanx.
Similarly, the HyDE approach can surface the relevant
episode about Diogenes, even when the chunk size is 1,024.
The hypothetical answer is this:
Alexander the Great, known for his ambition and power,
is said to have encountered the Cynic philosopher
Diogenes, who lived in a large jar. Alexander, impressed
by Diogenes’s lack of material desires, reportedly asked if
he could grant him any wish, to which Diogenes replied,
“Stand out of my sun.” This anecdote highlights the
contrast between worldly power and philosophical
detachment.
Enough surrounding details are captured that the model
retrieves the relevant chunks. A HyDE-based RAG can

-- 270 of 840 --

generate only grounded information, so there’s nothing
about the philosopher living in a jar, for example:
Alexander met Diogenes of Sinope in the Isthmus and
asked if he wanted anything. Diogenes replied that he
wanted nothing other than for Alexander and his
attendants to stand out of the sunlight. Alexander is said
to have expressed his admiration of Diogenes’s conduct.
As this example shows, HyDE is helpful when your answer
involves logic and you need to retrieve chunks that match
that logical structure. It’s also helpful when you want to
retrieve fine details, but only when those details are in a
domain (such as well-known history) in which the
foundational model can generate a plausible answer.
Query expansion
Let’s start with the following query:
How did the Persian king fight the Greeks?
If you expand this query based on the context of the book
being used as grounding, you get this:
How did the Achaemenid Persian king Darius III, as
described in Arrian’s *Anabasis Alexandri* written in the
second century CE, engage in military conflict with the
Macedonians and other Greeks under the leadership of
Alexander the Great, son of Philip II of Macedon?
Consider the strategies, tactics, and weaponry employed
by the Persians, including any contributions from their
Median, Bactrian, Sogdian, or other Iranian subjects, as
well as any alliances they may have formed with groups
such as Scythians or Indians.
Now, many more relevant chunks are retrieved. Using
these as context, the answer to the question is much more
meaningful:

-- 271 of 840 --

Darius and his forces, including Persians, Indians,
Albanians, and Carians, engaged Alexander’s army at
Arbela. The Persians marched parallel to Alexander,
attempting to outflank him. Scythian cavalry clashed with
the front of Alexander’s line. Darius, fearing his chariots
would be useless on uneven ground, ordered his left wing
to ride around Alexander’s right wing. Grecian
mercenaries were routed by the Scythian cavalry and
Bactrians, who were more numerous and better armored.
Alexander then ordered Aristo to attack the Scythians,
and the barbarians gave way. The Bactrians renewed the
battle, causing a general cavalry engagement with many
Macedonian casualties. The Persians launched scythebearing chariots against Alexander’s phalanx, but the
Agrianians and javelin-men countered them. Some
chariots passed through the ranks, but the drivers were
later overpowered.
Query expansion is particularly helpful when your users
will use nontechnical language, but your knowledge base is
quite technical. You can also use query expansion to add
meaningful context and disambiguate users’ queries.
Considerations
Both hypothetical answers and query expansions are
generated based on knowledge the foundational model
already has. The foundational model in our example had
seen training data about Diogenes, so it could expand the
query with incidents that allowed the RAG system to match
a relevant chunk. However, when the RAG system operates
in a domain that the foundational model has not adequately
encountered, the hypothetical answer or query expansion
could include hallucinated, obsolete, or irrelevant data.
This could then lead to matches with the obsolete or

-- 272 of 840 --

irrelevant data, which means that one of the key benefits of
RAG—that answers are grounded in the text—could be lost.
Hallucinated data crops up when the query is in a domain
that the model hasn’t encountered. Obsolete data can crop
up when there’s a cutoff time beyond which the
foundational model doesn’t have knowledge. As an example
of irrelevant data, suppose the user asks, “What patterns is
Alexander best known for?” The hypothetical answer to this
question that a foundational model will generate will likely
be about architectural design patterns, such as those from
“A Place to Wait” by Christopher Alexander, not battle
formations, such as the phalanx that was used by the
armies of Alexander the Great.
Also, query expansion may not honor the nuances of what
the user is asking. Perhaps the user who’s asking about the
Persian king isn’t interested in the king’s alliances with
Scythians and Indians. Yet the fact that the query was
expanded to include this means that the resulting answers
could include battles far away from Persia. This change of
intent could induce the wrong actions in some situations.
A Graph RAG can also introduce errors in the way related
chunks are identified. A poorly thought-through solution
might bring in conflicting information or earlier versions of
your documents.
References
HyDE was introduced by Gao et al. (2022) as a way to
improve retrieval when the content being retrieved won’t
match the question but will match its hypothetical answer,
even when the answer is wrong. Query expansion has a
long history in information retrieval; a survey of different
techniques is available in Azad and Deepak (2017),

---

## Sección 65: Chapter 4. Adding

-- 273 of 840 --

although Song and Zheng (2024) note that the onset of
LLMs has caused a renewal of interest in the broader topic
of query optimization, which consists of query expansion,
decomposition, disambiguation, and abstraction. A survey
of Graph RAG systems is available in Peng et al. (2024).
The deepset team employs graph-based RAG as an iterative
process and demonstrates it on financial data.
Pattern 10: Node Postprocessing
The Node Postprocessing pattern inserts a step between
retrieval and generation to increase relevance, reduce
ambiguity, and handle requirements such as content
updates and personalization.
Problem
RAG systems retrieve chunks that are similar to the query,
and they add those chunks to the context of the generation
to ground the LLM response. There are a few problems that
can crop up in this approach.
Similarity is not relevance
When you match a chunk to the question you are trying to
answer, you’re finding chunks that are similar—but this
doesn’t mean that the chunks are relevant. Suppose you’re
trying to match the following question:
Describe the geology of the Grand Canyon.
The retrieved chunks may reference the geology of the
Grand Canyon in some way but may not be relevant to
answering the question. For example, when we built a RAG
on a geology textbook, we got back a chunk consisting

-- 274 of 840 --

solely of the table of contents—because it included
geological terms.
Irrelevant content
Even when the chunk does contain the relevant answer, the
entire chunk won’t be relevant to the question. The chunk
that contains the answer to the question about the geology
of the Grand Canyon may also include information such as
where the canyon is located and a description of the river
valley between its walls.
If you are adding many chunks, the generation LLM may
not be able to keep track of the relevant information it
needs to synthesize from the different chunks.
Ambiguous entities
You might get some chunks that refer to the Grand Canyon
of the Colorado River and others that are about the Grand
Canyon of the Yellowstone. There is no way to
disambiguate all such possible pairs. In many cases, you
won’t know that you have an ambiguity problem until you
get back retrieved nodes that refer to two different entities
(for example, if you didn’t know there were two Grand
Canyons).
Conflicting or obsolete content
Knowledge bases are often updated over time. When you
search for support tickets or legal articles, it’s likely that
you’ll get some chunks that correspond to obsolete content.
While you could build a RAG system that depends on
keeping the knowledge base pristine, it’s also likely that
you’ll have users who are using different versions of the
software or are subject to different local laws, so you’ll

-- 275 of 840 --

probably encounter conflicting information in the chunks
that you retrieve.
Generic answers
The RAG system works the same way for everyone, so it
provides the same answer to a question regardless of who
asks it. So how do you personalize the answer it generates
with information that’s relevant to the person asking the
question?
Postprocessing the retrieved nodes can help address all of
these problems.
Solution
Node Postprocessing allows you to employ multiple
retrieval mechanisms, combine the chunks, and rerank or
filter them (see Figure 4-3). It inserts operations between
retrieval and generation to make many useful capabilities
possible. Many of these operations (shown in blue in the
figure) can be accomplished with LLM calls. If the retrieved
chunks correspond to knowledge base articles that were
written at different times, you can choose the most current
ones. If the retrieved chunks refer to two different
concepts, you can ask a follow-up question to disambiguate
the query. You can break down a query, retrieve chunks
that correspond to different parts of the query, and then
combine them. You can also personalize the response by
adding in chunks that correspond to the user’s context.

-- 276 of 840 --

Figure 4-3. Node Postprocessing
Reranking
The key idea that underlies Node Postprocessing is
reranking. The retrieval step returns a set of nodes, but

-- 277 of 840 --

these nodes are in no particular order, or they’re ordered
by their similarity to the query. You can, instead, use an
LLM to rerank them in terms of how useful the information
in the chunks is. A reranking model will, given a query and
a chunk, output a score that indicates how relevant the
chunk is to answering the query. The prompt could be as
simple as this:
You will be given a query and some text. Assign a
relevance score between 0 and 1, where 1 means that the
text contains the answer to the question.
**Query**:
{query}
**Full Text**:
{node.text}
This is an example of Pattern 17, LLM-as-Judge, which we’ll
discuss in Chapter 6.
Rerankers are much more accurate than embedding models
because an embedding model has to compress all the
information in the chunk into a single embedding vector.
On the other hand, a reranker can look at the chunk in
detail and determine whether the answer exists.
Reranking is so beneficial to RAG systems that there are
models, such as BGE, that are fine-tuned to perform this
task very well. You don’t need to run BGE locally—hosted
versions are also available. To use the hosted version of
BGE to rerank, for example, you can use the Pinecone API
to hit a deployed BGE endpoint:
reranked_nodes = pc.inference.rerank(
model="bge-reranker-v2-m3",
query=query,

---

## Sección 66: Chapter 4. Adding

-- 278 of 840 --

documents=nodes,
top_n=3,
return_documents=True,
)
You’ll need to pass each of the retrieved nodes to the
reranker so that it can compute a relevance score.
Therefore, reranking greatly increases the number of LLM
calls you’ll need to perform, and it also adds latency and
cost.
Hybrid search
If you are not going to use the nodes from the retriever as
is but you plan to rerank them, you don’t have to settle for
using just one retriever. The main stumbling block to using
both a BM25 retriever and a semantic retriever is that you
have no easy way to compare a chunk that has a BM25
score with a chunk that has a cosine similarity.
The solution we suggested in Pattern 9, Index-Aware
Retrieval, was to compute both scores for each chunk and
then to compute a weighted sum of the two scores. But if
you’re reranking chunks anyway, there’s a better approach.
You can use different types of retrievers and combine all of
the results into a single list. Then, you can pass this list of
chunks, from different retrievers, into the reranker. Finally,
you can take the top-K chunks based on the relevance
score. This idea is called hybrid search because it was
originally used to combine keyword-based indexing with
Semantic Indexing.
Query expansion and decomposition
If you’re going to send a query to multiple retrievers, there
is no requirement to send the same query to all the
retrievers. You can expand the query to fit the needs of the

-- 279 of 840 --

retriever. For example, for the BM25 retriever, you could
include all the synonyms of the keywords used in the query.
You can also break the query up into subparts and retrieve
matches to each subpart.
You can even run the query once, obtain the results, and do
a secondary search to expand on the retrieved answer.
Filtering for obsolete information
You can examine retrieved nodes and look for potential
conflicts. Here’s a simple example of filtering nodes that
correspond to knowledge base articles from different years,
to ensure that you are using only the latest information:
latest_year = max([chunk.publication_year for chunk in chunks])
chunks = [chunk for chunk in chunks
if chunk.publication_year == latest_year]
As long as the metadata is present in the chunks, you can
employ the same idea to use only the latest version that’s
available.
You could use an LLM to identify whether two chunks have
conflicting information, but this involves processing nodes
in pairs, and the combinatorial explosion in the number of
LLM calls (N * (N-1)) may make it cost prohibitive in
practical applications.
Contextual compression
The retrieved chunks may contain a lot of irrelevant
information. If you are going to be processing each chunk
individually with an LLM to compute its relevance score,
you can use that opportunity to also compress the text to
just the parts that are relevant to answering the query:

-- 280 of 840 --

from pydantic_ai import Agent
@dataclass
class Chunk:
full_text: str
relevant_text: str
relevance_score: float
def process_node(query, node):
system_prompt = """
You will be given a query and some text.
1. Remove information from the text that is not relevant to
answering the
question.
2. Assign a relevance score between 0 and 1, where 1 means
that the text
answers the question
"""
agent = Agent(model, result_type=Chunk,
system_prompt=system_prompt)
chunk = agent.run_sync(f"""**Query**: {query}\n
**Full Text**: {node.text}
""").data
return chunk
Now, you can add only the relevant text from the chunk to
the context of the prompt in the generation stage.
Note that the preceding code folds the LLM call to perform
contextual compression into the LLM call to compute the
relevance score for reranking. This limits the number of
LLM calls required for Node Postprocessing.
Disambiguation
Sometimes, the query uses an ambiguous term, like Grand
Canyon. You can determine this by looking at the retrieved
nodes and asking an LLM whether the nodes all refer to the
same entity:
@dataclass
class DisambiguationResult:
is_ambiguous: bool
ambiguous_term: str

-- 281 of 840 --

possibility_1: str
possibility_2: str
def disambiguate(query, node1, node2):
system_prompt = """
You will be given a query and two retrieved passages on which to
base the answer
to the query. Respond by saying whether the two passages are
referring to two
different entities with the same term. For example, the query
might be about
"Red River," and one passage might be about the Red River in
Minnesota whereas
the other might be about the Red River on the Oklahoma/Texas
border. If there is
no ambiguity between the two passages, return False for
is_ambiguous.
"""
agent = Agent(model,
result_type=DisambiguationResult,
system_prompt=system_prompt)
return agent.run_sync(f"""**Query**: {query}\n **Passage 1**:
{node1.text}\n
**Passage 2**: {node2.text}
""").data
Unlike with conflicting information, there is no need to
process all possible pairs of chunks—it’s enough to ensure
that the entity referred to in the first chunk is the same one
referred to in subsequent chunks. So, the number of calls
needed is only N – 1:
for node in response['source_nodes'][1:]:
result = disambiguate(query, response['source_nodes'][0],
node)
if result.is_ambiguous:
# ask follow-up question
As with contextual compression, you can fold the
disambiguation LLM call into the relevance computation
LLM call.

---

## Sección 67: Chapter 4. Adding

-- 282 of 840 --

Personalization and conversation history
Inserting a step between retrieval and generation provides
you with the ability to add information to the context
beyond what’s retrieved. For example, you can look at the
retrieved nodes and pull in relevant information from the
user’s context.
This could be as simple as inserting data from a user’s past
transactions, if it’s relevant to the query. For example, a
travel chatbot might incorporate your personal travel dates
to ensure that its writeup about a destination is relevant to
the season when you plan to visit.
In chatbots, it’s a common practice to add a summary of
the preceding few conversation turns as part of the context
of any RAG operation. Such a conversation state allows the
generation to be grounded on the previous conversation,
including the user’s past corrections and preferences. For
example, to ask Pydantic AI to deepen a joke that it
generated in the past turn, you would do this:
joke = agent.run_sync('Tell me a joke.')
print(joke.data)
#> some joke.
joke2 = agent.run_sync('Make the joke longer and add a
punchline.',
message_history=joke.new_messages())
print(joke2.data)
The content that’s added could also be dynamic and based
on the retrieved information. For example, you might note
that the retrieved nodes are about luxury watches (even if
the query isn’t) and add any related results from the user’s
search history.

-- 283 of 840 --

Example
We will again illustrate the techniques and benefits of Node
Postprocessing with a semantic RAG built on a pair of old
geology textbooks. The code for this example can be found
on GitHub.
Limitations of semantic RAG
Retrieve top_k=2 nodes for the following query:
Describe the geology of the Grand Canyon.
This yields, as the top result, a node with the table of
contents:
Node ID: 7b635fb9-7b61-4508-ad6a-370f5cd42822
Text: W. M. DAVIS HARVARD UNIVERSITY,
CAMBRIDGE, MASS. JULY,
1905 CONTENTS INTRODUCTION.--THE SCOPE AND
AIM OF
GEOLOGY PART I EXTERNAL GEOLOGICAL AGENCIES
I. THE WORK
OF THE WEATHER
So, in essence, the result is generated from just the second
node. Unfortunately, the second node is similar to the
query (in that the Grand Canyon appears prominently) but
not really relevant to providing the answer to the question.
The key sentence within the chunk starts with this:
The high plateaus of northern Arizona and southern Utah,
north of the Grand Canyon of the Colorado River …
The chunk happens to be about the plateau within which
the Grand Canyon sits, so the answer to the question that is

-- 284 of 840 --

generated is this:
The Grand Canyon is north of the high plateaus of
northern Arizona and southern Utah … From the broad
platform rises a series of gigantic stairs, often more than
one thousand feet high and a score or more miles in
breadth.
According to the answer, the Grand Canyon has a series of
stairs, each of which is more than 20 miles wide (a “score”
is 20). However, the Grand Canyon averages only 10 miles
in width. In fact, this answer is not about the Grand Canyon
at all—it’s about all of Northern Arizona and Southern
Utah!
Suppose you instead pull top_k=4 nodes. As expected,
you’ll get the same two nodes as above, plus, you’ll get two
more nodes whose similarity score is slightly lower. Using
all four nodes, you’ll still get the wrong answer about the
plateau within which the Grand Canyon is located:
The Grand Canyon is north of the high plateaus of
northern Arizona and southern Utah. The plateaus are
made of stratified rocks that are more than ten thousand
feet thick with a gentle inclination northward. From the
broad platform where the canyon was cut, a series of
gigantic stairs rise, often more than one thousand feet
high and a score or more miles in breadth.
Just using more nodes is not enough, so what happens if
you apply Node Postprocessing?
Impact of Node Postprocessing
If you postprocess the retrieved nodes to compress the
chunk text to the relevant bits and rank the chunks on
relevance, then the top two nodes will have directly

-- 285 of 840 --

relevant answers. The relevant text of the most relevant
chunk starts with this:
Running water has gulched the walls, and weathering has
everywhere attacked and driven them back. The
horizontal harder beds stand out in long lines of vertical
cliffs, often hundreds of feet in height, at whose feet talus
slopes conceal the outcrop of the weaker strata.
The second chunk is what used to be most relevant:
The high plateaus of northern Arizona and southern Utah,
north of the Grand Canyon of the Colorado River, are
composed of stratified rocks more than ten thousand feet
thick and of very gentle inclination northward.
The generated response is now very pertinent because it
synthesizes the two nodes:
The Grand Canyon of the Colorado River is located in the
high plateaus of northern Arizona and southern Utah. The
canyon walls have been shaped by running water and
weathering, with horizontal harder beds forming vertical
cliffs and talus slopes concealing weaker strata. The sides
of the canyon descend to the river by gigantic steps, due
to the sapping and retreat of the upper cliffs. The
plateaus north of the canyon are composed of stratified
rocks more than ten thousand feet thick with a gentle
inclination northward. The retreating escarpments and
walls of the ravines are carved into architectural forms by
weathering and deflation.
This answer is correct. The Grand Canyon was formed by
river and wind erosion.
All four of the retrieved nodes above were about the Grand
Canyon of the Colorado River. But now, say you ask the
following question:

---

## Sección 68: Chapter 4. Adding

-- 286 of 840 --

Name the characteristics of coal-bearing strata in
Newcastle.
The first retrieved chunk is about Newcastle, Pennsylvania,
whereas the second chunk is about Newcastle, England.
The ambiguity detector can find this. In a production
system, you could use this detection to ask the user a
follow-up question about which Newcastle they mean.
Considerations
Rerankers are slow and add runtime costs. With
embedding, you front-load the computation and store the
embedding in a vector database. Reranking, on the other
hand, requires you to examine chunks at runtime for
relevance. Because the core of Node Preprocessing is
reranking, this pattern adds considerable latency and cost.
To some extent, you can mitigate this by using a fine-tuned,
small model like BGE, but a RAG with reranking will be
slower than a RAG without.
The more tasks you perform in Node Postprocessing, the
more it makes sense to fold all the operations into a single
LLM call. To ensure that all the operations are performed,
use a structured output (see Pattern 2, Grammar, in

---

## Sección 69: Chapter 2). If you do this, you can’t use a fine-tuned model

like BGE—you’ll need a foundational model that’s capable
of performing all the tasks.
References
Guo et al. (2019) surveyed neural ranking models for
information retrieval. Ma et al. (2023) showed how to finetune the LLaMA model, both as a dense retriever
(RepLLaMA) and as a pointwise reranker (RankLLaMA) for
both passage retrieval and document retrieval. Sourav

-- 287 of 840 --

Verma (2024) examined contextual compression techniques
and their benefits. Chen et al. (2021) pointed to the
prevalence of ambiguity as a source of error in RAG and
proposed a benchmark to evaluate entity disambiguation
approaches.
Bench.io expands queries to better contextualize the
results of generation.
Pattern 11: Trustworthy Generation
Trustworthy Generation is a set of techniques that aim to
increase the trust that users of a RAG system can place in
the generated answers.
Problem
RAG systems face a number of problems that can erode the
user’s trust in the production application and the answers
it generates. Even though RAG systems retrieve
information from a document store, they suffer from
several potential risks, including the following:
Retrieval failures
The system might retrieve irrelevant documents or miss
critical information that’s needed to answer a question
comprehensively. This could make the generated answers
suboptimal.
Context reliability issues
Even if the retrieved documents are all relevant, some of
them may contain outdated, biased, or incorrect
information. This could cause the generated answers to be
outdated, biased, or incorrect.

-- 288 of 840 --

Reasoning errors
RAG systems might incorrectly reason about or misinterpret
the retrieved information. This could produce misleading
answers.
Hallucination risks
RAG systems can still fabricate information or blend
retrieved documents incorrectly, especially when handling
complex topics.
There is, currently, no way to completely avoid these
issues. However, there are best practices that enable you
to evaluate the trustworthiness of generated answers, or
even parts of answers, and to pass that information on to
consumers of your RAG answers. In situations where the
generated answers will be used to drive actions, it is
important to portray this trustworthiness in a way that lets
users decide whether or not to carry out such actions. For
example, consider a RAG system for medical applications of
which a doctor or patient could ask the following question:
What are the best treatment options for Type 1 diabetics?
It would be important to do everything you can to ensure
that the answer is correct and portray to the user whether
any of the treatment options might be outdated or come
from non-peer-reviewed sources.
Solution
You can foster trust by ensuring you are only answering
questions for which your knowledge base is adequate, by
providing citations, by incorporating a human into the loop,

-- 289 of 840 --

by validating potentially wrong information, and through
appropriate UI design.
Out-of-domain detection
One of the best ways to build trust is by communicating
when a system knows when it shouldn’t respond to a
request, because the knowledge base doesn’t contain
information about that topic. For instance, some patients
might ask the medical RAG application for directions to the
hospital. In those cases, the RAG system should decline to
respond or even route the request to Google Maps.
Strategies to detect out-of-domain user queries include the
following (also see Figure 4-4):
Embedding distance between the user query and
embedded document chunks
In the RAG process, you’ll embed the query, and then, you
can determine its similarity to all chunks in your knowledge
base. You’ll see a steep drop in similarity scores for out-ofdomain requests, and the optimal threshold is domainspecific. Tracking query similarity over time will help you to
adjust the threshold to become more proficient at out-ofdomain detections.
Zero-shot classifications to categorize queries
Use a pretrained language model, perhaps a small language
model, that performs really well for zero-shot classifications.
Define categories for your queries that you would expect.
For example, in a medical RAG example, you could set the
categories to [“Medical”, “Not Medical”]. If the zero-shot
classification model returns “Not Medical” with a high
likelihood, you could declare it an out-of-domain detection.
If the queries change in context, add examples to your query
problem and turn the zero-shot problem into a few-shot

-- 290 of 840 --

problem. If you ask the model to detect multiple categories,
such as [“Finance,” “Health”, “Technology,” “Other”], you
could require at least 30% confidence as a threshold before
you answer the question.
Requiring domain-specific keywords or terminology
One of the most restrictive approaches is to require a
question (and/or the answer) to use specific keywords or
terminology. In the case of a medical RAG system, you could
require the presence of at least one or more terms from a
medical dictionary.
Figure 4-4. Out-of-domain detection workflow

---

## Sección 70: Chapter 2). If you do this, you can’t use a fine-tuned model

-- 291 of 840 --

Because each of the above methods has its benefits and
disadvantages, you might choose a hybrid approach (such a
weighted sum of the three signals) to detect out-of-domain
queries.
If you detect an out-of-domain query, then you should
short-circuit the retrieval and generation parts and present
the user with a message that your RAG system can’t
answer the query, or you should route the query to a
different resource (such as Google Maps, for directionrelated queries).
Citations
Providing citations in RAG responses is one of the most
effective ways to build trust. When users see citations, they
understand that the system was developed with integrity,
and the references offer immediate verification of the
information’s accuracy. Citations make responses more
credible and allow users to check sources for themselves
easily.
There are three ways to provide citations in your RAG
responses: source-level tracking, classification-based
citations, and token-level attribution.
Source-level tracking
If you have a source-tracking workflow, you can generate
citations based on retrieval lineage. In Pattern 8, Indexing
At Scale, in Chapter 3, we discussed how to store metadata
with your document chunks in your document store. When
you retrieve document chunks to generate a response, you
pass the corresponding metadata to a citation-aware
prompt to generate the response. Then, you can
postprocess the citations, such as by formatting them to the
correct citation style (see Figure 4-5).

-- 292 of 840 --

You can find an example implementation of this approach
in the GitHub repository of this book. It is also discussed in
greater detail in the Example subsection later in this
section.
Figure 4-5. Workflow to generate RAG responses with citations

-- 293 of 840 --

Classification-based citations
If you want to have more control over the citations, using
the classification approach is a good option. A classifier can
distinguish between common knowledge that doesn’t
require any citations and factual claims that require
citations. The latter can vary from domain to domain:
academic papers require more citations than general
domain content. Figure 4-6 shows an example of a response
that differentiates between “common” knowledge and
citation-requiring statements like “he has been widely
regarded as one of the greatest composers in the history of
Western music.”
Figure 4-6. Using a classifier to detect citation requirements
Using the classification-based approach increases the
system’s complexity, since you will need to provide or finetune a citation classifier. However, the citations will be
more precise. The source-tracking approach is simpler, but
it tends to over-cite.

-- 294 of 840 --

Token-level attribution
When a RAG system generates a response, the generation
can blur the boundaries of the original chunks or multiple
chunks can contribute to a single statement. Some LLMs
tend to paraphrase chunks in ways that will alter the direct
connection to the source chunk, and the paraphrasing can
make direct text matching difficult.
You can address those more complex citation scenarios by
using token-based attribution, in which you chunk your
texts and tag them with the metadata as before. The
difference is that, during the generation process, the
metadata is tracked through the LLM’s attention
mechanism, which allows you to attribute every generated
token with one or more sources (see Figure 4-7). You can
then set a threshold above which you want the LLM to
report citations in the final generated response.

-- 295 of 840 --

Figure 4-7. Token-level attribution tracking for citations

-- 296 of 840 --

The token-level approach addresses paraphrasing by the
LLM without losing the attribution; it also supports mixedsource attributions for your final responses. At the time of
writing, token-level attribution is an area of active
research. No production-ready open source implementation
has yet emerged.
Guardrails
You can reduce the chance of the LLM “going rogue” by
applying guardrails throughout your RAG pipeline (see
Figure 4-8).
Before retrieving chunks from your document store, you
can do the following:
Filter harmful or inappropriate queries through outof-domain detection.
Sanitize user input to the RAG system to prevent any
form of injection attacks via prompts.
Filter document-store chunks to include only those
with highly trusted sources.
Once you have retrieved relevant document chunks, you
can do the following to apply guardrails:
Enforce tracking of chunk metadata like sources and
other attributions.
Prioritize document chunks based on the sources
and relevance sources, filtering out chunks below a
minimum threshold.
Fact-check against trusted sources using reflective
RAGs.

-- 297 of 840 --

Check the retrieved chunks for privacy compliance
before passing them on for the response
regeneration.
Ahead of the generation, you can do the following to apply
more guardrails:
Check the chunks for data freshness, for example, by
excluding chunks more than six months old.
Enforce having chunks from multiple sources to
promote source diversity.
Check chunks for harmful content.
Dismiss any chunks that don’t pass the checks—do not pass
them to the response generation stage.
Once your RAG generates a response, you can apply the
following final guardrails before returning any response to
your user:
Enforce citations and source attributions.
Fact check against trusted sources.
Check for data privacy.
Check response for accidental harmful generations.
If any guardrails fail, rewrite the user query and then
trigger a new generation or even a new retrieval of chunks.

---

## Sección 71: Chapter 2). If you do this, you can’t use a fine-tuned model

-- 298 of 840 --

Figure 4-8. Guardrail workflow

-- 299 of 840 --

TIP
A number of ML libraries offer guardrail tooling for LLMs, such as
the following:
Guardrails AI
This is an open source Python package for detecting PII, out-of-domain
and jailbreak attempts, and profanity.
DeepEval
This is an evaluation framework with specific RAG evaluation metrics,
including citation accuracy, retrieval precision, hallucination detection,
and red-teaming functionality like bias, misinformation, and toxicity
detection.
Ragas
This is a metrics framework that lets you evaluate your RAG pipelines
on factors like answer correctness and context entity recall.
Using these libraries or frameworks also improves the observability
of your RAG system.
Observability
Another way of increasing user trust in RAG responses is
by continuously generating observability metrics around
your LLM generations and RAG responses. Observability
tools allow you to track LLM input and outputs, and such
tools automatically generate metrics like these:
Context relevance
Response relevance
Faithfulness
Context recall and precision

-- 300 of 840 --

While you could implement your own observability tools,
we recommend using one of the available libraries. Open
source solutions include Arize Phoenix, Comet Opik,
Langfuse, and Langtrace.
We’ve observed that implementing rigorous observability
for query-response pairs in RAG systems consistently leads
to measurable improvements in user trust and system
adoption. When stakeholders can transparently evaluate
the correlation between inputs and outputs, their
confidence in the system’s reliability and accuracy
increases. This empirical approach to RAG system
evaluation not only enhances trust, but it also provides
valuable data points for continuous system optimization
and performance validation.
Human Feedback
You can incorporate human feedback into your RAG
pipelines both online and offline (see Figure 4-9). If you
prefer to have a human in the loop, you could add a human
review step after document chunk retrieval, with a
reviewer giving the chunks up or down votes to update the
chunks’ relevance before you use them for response
generation. You can also send all generated responses, or
those that fall below some confidence threshold, to a
review queue for domain experts to review before sending
them back to the requesting user.
Humans who perform offline reviews can provide
actionable reviews for your RAG pipeline by using only a
subset of all the information going through them. First,
they should review the ranking of retrieved chunks. The
human ranking can be the basis for a domain-specific
embedding model for your user case. You can also use the
review ranking to fine-tune any LLM if you want to rewrite

-- 301 of 840 --

user queries to improve retrieval performance. Domain
experts can also review a subset of all generated responses
for correctness and relevance; then, you can use the
updated responses to fine-tune an LLM for your domainspecific use case.
Figure 4-9. Human feedback options can affect all stages of a RAG pipeline
Human reviewers can provide the following kinds of
feedback:
Explicit feedback through rating selected chunks or
generated responses (such as thumbs-up or thumbsdown)
Implicit feedback through engagement metrics, like
how often users are using the provided response in
the product
Validation and annotation of responses by subject
matter experts
The goal should always be to have the feedback loops
connect back to each component of the RAG system and

-- 302 of 840 --

improve the respective processes.
Corrective retrieval-augmented generation (CRAG)
Traditional RAG systems “guide” LLMs in generating
responses by providing document chunks that are related
to the user’s initial query. Incorporating external
knowledge from a document store helps to reduce
hallucinations, but its effectiveness relies heavily on the
relevance of the retrieved document chunks. This can be
problematic if the retrieval step produces irrelevant
document chunks or incorrect information.
The key goal of corrective retrieval-augmented generation
(CRAG) is to detect and correct hallucinations before the
LLM attempts response generation. It adds an evaluator to
the process that evaluates the quality of the retrieved
chunks for a given query before passing on the documents
to the response generation step. The evaluator returns a
confidence score that triggers different knowledge retrieval
actions. If it deems a document to be irrelevant or
ambiguous, the CRAG can perform one or both of two
strategies. First, it can augment the content by searching
the web or enterprise document stores, such as SharePoint
or Google Drive. This can be helpful, since knowledge
bases tend to be static and online content updates tend to
be faster. Second, with a “decompose-then-recompose”
strategy, CRAG can help the LLM focus on key information
by filtering out apparently irrelevant content from retrieved
documents (see Figure 4-10).

---

## Sección 72: Chapter 2). If you do this, you can’t use a fine-tuned model

-- 303 of 840 --

Figure 4-10. CRAG workflow

-- 304 of 840 --

CRAG can fully replace irrelevant content with search
results while combining ambiguous content with search
results before passing it on for response generation.
The CRAG workflow is designed to work in conjunction
with traditional RAG pipelines to address one of their major
weaknesses. An example implementation can be found in
LangChain’s documentation.
Self-RAG
CRAG workflows try to review and correct retrieved
document chunks before the response is generated, to
prevent potential hallucinations. In contrast, self-RAG, or
reflection in RAG (see Figure 4-11), critically examines the
overall process, starting from the generated output or
retrieval results. The goal is to refine retrieval and
generation processes. Self-RAG consists of three elements:
Self-evaluation
The system critiques its retrieved documents for relevance
and quality.
Adaptive retrieval
The system can decide whether to retrieve more
information or proceed with generation.
Controlled generation
The system can modulate between relying on retrieved
information and relying on parametric knowledge from its
underlying LLM.
You can accomplish all of these by using prompts (see
Pattern 17, LLM-as-Judge, in Chapter 6).

-- 305 of 840 --

While implementing self-RAG introduces loops and more
complexity into the RAG workflow, it also provides a
number of benefits. Self-RAG can better blend retrieved
and parametric knowledge based on context, rather than
using a fixed combination approach. It reduces
hallucinations, improves the explainability of its decisions,
and improves the overall quality of retrievals.
Figure 4-11. Self-RAG critiques its own generated response before returning it
to the user

-- 306 of 840 --

User interface design
Users become more trusting when they can see which
documents are referenced, how recent the information is,
and the LLM’s confidence level in its responses. By
implementing visual indicators such as citation links,
source previews, and confidence meters (see Figure 4-12),
you can allow users to verify information independently.
Additionally, providing clear attribution through inline
citations and offering one-click access to original sources
demonstrates respect for users’ intelligence while
establishing the system’s credibility. These transparency
mechanisms transform the RAG system from a mysterious
black box into a reliable research assistant whose work can
be verified and trusted.

-- 307 of 840 --

Figure 4-12. Some of the ways in which Perplexity AI’s search interface fosters
trust in its generated answers
User trust is further enhanced through thoughtful
interaction patterns that give users appropriate control
over the RAG process. Allowing them to adjust search

-- 308 of 840 --

parameters, filter results by date or source authority, and
refine queries based on initial responses creates a
collaborative experience, rather than one-way information
delivery. Using progressive disclosure techniques—showing
simplified results first, with options to explore deeper—
helps to avoid overwhelming users while maintaining
depth.
Feedback mechanisms—such as thumbs-up/thumbs-down
buttons, correction capabilities, and visible system
improvements based on user input—demonstrate that the
system values accuracy and user experience (UX). When
users see their feedback incorporated into improved
responses, they develop confidence in the system’s
commitment to continuous improvement and reliability.
Example
Of all the ideas discussed in the previous “Solution”
section, the most effective one for building users’ trust in
the answers your RAG system generates is adding citations
to those answers. Here, we’ll show you how to use a
classifier to detect sections of the response that need
citation and then provide relevant citations. If you can’t
find any sources in your document store for a fact that
needs a citation, you should alert the user that the
statement is untrustworthy, perhaps by highlighting the
relevant sentence in red.
Technique
In this example, you’re incorporating citations into a RAG
response. As shown in Figure 4-13, you’ll modify the
response generation step of a RAG. Once the initial
response is generated, you’ll check the response for
citation-worthy claims. Then, for each chunk that needs a

-- 309 of 840 --

citation, you’ll cross-reference the document store for
references.

-- 310 of 840 --

Figure 4-13. Implementation workflow for adding citations to the RAG response

-- 311 of 840 --

The process works as follows (the step numbers correspond
to Figure 4-13).
Step 1: Generate an initial response
First, generate the initial RAG response as you would
normally do. The response here is the unreviewed response
for the user:
question = "What are the Brandenburg Concertos?"
response = rag_chain.invoke(question)
Step 2: Chunk the response into smaller sections
This example chunks the text down to the sentence level.
You can implement different strategies, depending on how
fine-grained you want the citations to be.
Step 3: Check whether a chunk needs a citation
Once a classifier marks a chunk as needing a citation,
cross-reference that chunk against the document store:
sentences = raw_response.split(".")
...
for sentence in sentences:
review = needs_citation(sentence)
chunks = check_sources(sentence) if review else []
You can check whether a chunk needs a citation with a
small language model, such as a fine-tuned BERT, or with a
zero-shot call to an LLM. Here, we use an LLM:
def needs_citation(content: str) -> bool:
"""Check if the content requires citations using OpenAI."""
llm = ChatOpenAI(model_name=LLM_MODEL)
prompt = PromptTemplate.from_template("""
Check if the content requires citations. The return should be
true or false
in this JSON format: {{"requires_citations": true}}

---

## Sección 73: Chapter 2). If you do this, you can’t use a fine-tuned model

-- 312 of 840 --

Content: {content}
""")
response = llm.invoke(prompt.format(content=content))
return json.loads(response.content)["requires_citations"]
Step 4: Look up the sources
Once you have identified the response chunks that need a
citation, you can look up the citation sources in your
document store:
def check_sources(sentence: str) -> List[Any]:
"""Find similar documents in the document store"""
vectorstore = load_vector_store()
similar_chunks = vectorstore.similarity_search(sentence, k=5)
return similar_chunks
This produces the following:
Chunk 1:
Content: The Brandenburg Concertos (BWV 1046–1051) by Johann
Sebastian Bach are
a collection of six instrumen...
Metadata: {'source': 'raw_texts/bach_brandenburg-concertos.txt'}
…
Chunk 5:
Content: Even more exceptional, for a Lutheran composer such as
Bach, is that the
composition is a Missa tota...
Metadata: {'source': 'raw_texts/bach_mass-in-b-minor-bach.txt'}
Step 5: Incorporate the citations into the response
Here, we loop over and concatenate the response chunks,
and we also add the citations to the response:
# Write content with citations
response_with_citations = ""
for review_sentence in review_sentences:
response_with_citations += review_sentence["sentence"]
if review_sentence["review"] and
len(review_sentence["chunks"]) == 0:
response_with_citations += " [Citation needed] "

-- 313 of 840 --

elif review_sentence["review"] and
len(review_sentence["chunks"]) > 0:
# Get unique file references
file_references = set([x.metadata["source"]
for x in
review_sentence["chunks"]])
# Create citation with numbers
citation = format_citation(file_references,
file_to_citation)
response_with_citations += citation
response_with_citations += " "
Step 6: Add any necessary warnings or corrections
Suppose that, as you looped over the response chunks, the
classifier requested a citation but you failed to find a
relevant citation in your document store. That would be the
moment to alert the user in some way. Here, we simply
show “[Citation needed]”—but you could mark the entire
statement in red, remove the statement from the response,
or even force regeneration of the entire response.
Here is an example response generated for the following
original question:
What are the Brandenburg Concertos?
Various claims refer back to the document store:

-- 314 of 840 --

The Brandenburg Concertos (BWV 1046–1051) are a
collection of six instrumental works by Johann Sebastian
Bach, presented to Christian Ludwig, Margrave of
Brandenburg-Schwedt, in 1721. [1] These concertos are
highly regarded as some of the greatest orchestral
compositions of the Baroque era. [1] The concertos
feature various combinations of solo instruments and are
written for different instrumental ensembles. Recent
research has indicated that some of the material for the
concertos may have been based on earlier music
composed by Bach for other purposes. [1, 2] The
instrumentation for the concertos includes a variety of
instruments, such as violins, violas, cellos, oboes, horns,
bassoon, harpsichord, flute, and trumpet.
References:
[1] raw_texts/bach_brandenburg-concertos.txt
[2] raw_texts/bach_mass-in-b-minor-bach.txt
The example reference [1] contains this sentence:
They are widely regarded as some of the greatest
orchestral compositions of the Baroque era.
This could be seen as a good reference. In a production
implementation, the response should refer to proper
sources (from the metadata of the chunks), not to the
example text files. For simplicity, we don’t show the
citation-formatting function here. You can find the full
example in our GitHub repository.

-- 315 of 840 --

NOTE
Our GitHub repository also contains a prompt-based citation
example. The implementation is simpler, but it has downsides:
primarily, it doesn’t recheck generated claims against the document
store, nor does it give you fine-grained control over citation
formatting.
Considerations
More sophisticated implementations, like self-RAG,
increase pipeline complexity and introduce more failure
points. They also require more engineering overhead and
compute resources. Every additional tool you include in
your RAG system increases the response time and
ultimately affects the UX—so you should evaluate the tradeoffs carefully and consider whether a simpler alternative
could work.
Limitations
RAG relies heavily on similarity scores to compare queries
and selected document chunks. It also uses thresholds to
decide whether a document chunk is relevant or not, and
those thresholds are extremely domain specific and require
careful tuning and updates over time, which adds
complexity to the project. In addition, edge cases can
challenge threshold implementations and often require
more engineering effort than initially anticipated.
It’s important to balance safeguards with information loss,
too. Imagine a very strict RAG that filters most of the
document chunks it retrieves. Such strict guardrails can
remove valuable information, make the LLM generate
incomplete answers, and negatively affect the UX.

---

## Sección 74: Chapter 2). If you do this, you can’t use a fine-tuned model

-- 316 of 840 --

Finally, verification steps, much like a human in the loop,
only scale so far. At some point, even human verification
isn’t possible anymore. Growing knowledge bases can also
produce more false positives over time as conflicting
information is added to them. Verification requires
constantly monitoring the RAG system and adjusting its
thresholds.
Alternatives
One alternative to self-RAG is to integrate multiple
knowledge sources. RAG pipelines that retrieve information
via multiple sources other than a single one-shot approach
tend to return better overall responses. This can mean
combining parametric information from the LLM and
nonparametric information via the retrieval process, or it
can mean using knowledge graphs to further improve
response quality.
Another alternative involves focusing on explainability
rather than automatically fixing hallucinations or
introducing strict guardrails. For example, you can expose
the underlying retrieved document chunks with confidence
scores, or you can provide the system’s reasoning steps to
the user. You could also provide an interactive UI that
allows the user to see the cited sources side by side with
the generated response.
References
To help you implement robust out-of-domain detection
mechanisms and guardrails in general, we recommend that
you explore the comprehensive documentation provided by
Guardrails AI, particularly its approach to embedding
distance calculations and zero-shot classification methods.
“How to Implement LLM Guardrails” (Jarvis, 2023) from

-- 317 of 840 --

OpenAI Cookbook provides practical implementation
examples, while “The Landscape of LLM Guardrails:
Intervention Levels and Techniques” (Lunden, 2024) from
ML6 offers a thorough technical overview of semantic
similarity approaches using cosine similarity and nearest
neighbor methods.
If you are interested in the ongoing research work on
token-level attribution for citations, we suggest the papers
“Model Internals-based Answer Attribution for Trustworthy
Retrieval-Augmented Generation” (Qi et al., 2024) and
“Peering into the Mind of Language Models: An Approach
for Attribution in Contextual Question Answering” (Phukan
et al., 2024). A great discussion about pregeneration versus
postgeneration citation creation is provided in the paper
“Citation: A Key to Building Responsible and Accountable
Large Language Models” (Huang et al., 2024).
The foundational work on CRAG is detailed in “Corrective
Retrieval Augmented Generation” (Yan et al., 2024). For
practical implementation, we recommend the LangGraph
tutorial on corrective RAG and the DataCamp
implementation guide for CRAG with LangGraph.
The core research for Self-RAG was presented in “SelfRAG: Learning to Retrieve, Generate, and Critique through
Self-Reflection” (Asai et al., 2023). The official Self-RAG
GitHub repository provides complete implementation code,
while LangChain’s Self-Reflective RAG with LangGraph
page demonstrates practical deployment strategies.
Google NotebookLM provides in-line citations to source
material that’s used to generate answers.

-- 318 of 840 --

Pattern 12: Deep Search
The Deep Search pattern employs an iterative process of
searching, reading, and reasoning to provide
comprehensive answers to complex queries.
Problem
RAG systems are less effective for complex informationretrieval tasks because of context window constraints,
query ambiguity, information verification, shallow
reasoning, and multihop query challenges.
Context window constraints
Simple RAG systems are constrained by the fixed context
window of the foundation model. When they’re dealing with
complex queries that require extensive background
information, the limited number of tokens that can be
included in a single retrieval operation often results in
incomplete context.
Take a query like this:
Compare the economic impacts of climate change
mitigation strategies across developing and developed
nations, considering both short-term costs and long-term
benefits.
When answering this kind of query, a simple RAG system
would struggle to include sufficient context about multiple
countries, various mitigation strategies, economic models,
and temporal considerations within a single context
window.

-- 319 of 840 --

Query ambiguity
Simple RAG systems lack mechanisms for disambiguating
or refining queries based on initial findings. In “Pattern 10:
Node Postprocessing”, we discussed how to identify
ambiguities by looking at retrieval results, but the only
action we suggested was to do a follow-up query. But what
if one of the meanings is much more likely than the other?
For example, take a look at this query:
Name the characteristics of coal-bearing strata in
Newcastle.
When answering an ambiguous query like this, a simple
RAG system might note that the nodes being retrieved are
about two different Newcastles. On the other hand, a RAG
system with better reasoning capability would be able to
infer that a query about coal and Newcastle is more likely
to be about the English city.
Information staleness and verification
Simple RAG systems rely on preindexed information that
may become outdated. They lack mechanisms to verify the
currency or accuracy of retrieved information.
Reasoning depth limitations
Simple RAG systems perform shallow reasoning that’s
limited to the information explicitly present in retrieved
documents. They struggle with queries requiring multistep
reasoning or inference chains. For example, take this
query:
What would be the implications of using transformer
models with linear attention mechanisms for real-time
video processing on edge devices?

---

## Sección 75: Chapter 2). If you do this, you can’t use a fine-tuned model

-- 320 of 840 --

When answering a query like this, a simple RAG system
might retrieve separate documents about transformers,
attention mechanisms, and edge computing without
connecting the concepts.
Multihop query challenges
Simple RAG systems, because they involve only one stage
of retrieval and generation, struggle with multihop queries
that require the retrieval of information from one source to
formulate effective queries for subsequent information
needs.
When answering a query like the following, a simple RAG
system would fail:
What programming languages would be most suitable for
implementing the algorithms described in the latest
quantum machine learning papers from MIT?
This is because the query requires the system to first
identify the relevant papers, then understand the
algorithms described, and finally determine appropriate
programming languages based on the algorithm
characteristics.
Solution
The Deep Search pattern involves an iterative loop that
consists of retrieval and thinking until either a good enough
answer is found or the time/cost budget is exhausted (see
Figure 4-14). It goes beyond traditional RAG systems in
three ways. First, it adds a thinking step between retrieval
and generation to determine what additional information, if
any, needs to be gathered. Second, instead of a single
retrieval step, Deep Search involves iterating through
multiple stages of retrieval and generation. Finally, instead

-- 321 of 840 --

of just relying on adding knowledge from an enterprise
knowledge base, Deep Search employs tools such as search
engines and enterprise APIs to gather the knowledge it
needs proactively. Also note that you can implement the
steps in blue in Figure 4-14 by prompting foundational
models, as we’ll discuss later in this section.

-- 322 of 840 --

Figure 4-14. Deep Search adds iteration, external tools, and a thinking stage to
traditional RAG.

-- 323 of 840 --

This iterative architecture, with the additional thinking
step, addresses the problems listed previously:
Context window constraints
The iterative approach allows Deep Search to process
information across multiple context windows. By
maintaining state across iterations, Deep Search can
accumulate knowledge progressively and thus effectively
expand the functional context beyond the model’s context
window limit. The system can also retain key insights from
previous iterations while discarding less relevant
information, thus enabling more comprehensive analysis of
complex topics.
Query ambiguity
Deep Search can employ query decomposition and
refinement mechanisms to identify ambiguities in the
original query and generate clarifying subqueries. Through
its reasoning component, it can interpret initial search
results to identify gaps in the retrieved results and
determine what additional information is needed.
Information staleness and verification
The architecture allows you to integrate fact-checking
mechanisms and confidence scores for retrieved
information into the evaluation and reflection steps that are
part of the thinking stage. You can cross-check information
across multiple sources, including real-time data sources.
You can also redact unsupported information from the
synthesized responses that are saved in the context.
Reasoning depth limitations
Iterating through retrieval and thinking means that you can
perform multistep inference, connect information across

-- 324 of 840 --

different retrieval results, and generate intermediate
conclusions that inform subsequent search operations. This
enables Deep Search to go beyond the text that is present in
any single document.
Multihop query challenges
The iterative architecture naturally supports multihop
information retrieval. You can use information discovered in
early iterations to inform and direct later searches. Because
you’re carrying out the search across multiple knowledge
sources, this also enables the synthesis step to connect the
dots across multiple knowledge domains.
Instead of repeating the original query each time, most
Deep Search implementations maintain state across
iterations. This allows for updated queries to query for
additional information; the responses are appended to the
state. The entire context is used to synthesize a final
response for evaluation.
DEEP SEARCH VERSUS DEEP RESEARCH
Some experts and companies make a distinction between Deep
Search and deep research. Both employ an iterative approach with a
thinking stage that determines how to continue, but they differ in
how the output is formed.
In Deep Search, the goal is to create a concise answer from the
original question. The relevant text extracted for the original query
and follow-up queries are used to synthesize a summary answer. In
deep research, the goal is to create a long-form report that consists
of the answers to the original question and follow-up questions,
arranged holistically.
Since these differ only in the way the output is accumulated across
iterations, we choose to treat deep research as a variation of the
Deep Search pattern. The Example subsection of this pattern’s
section demonstrates deep research.

---

## Sección 76: Chapter 2). If you do this, you can’t use a fine-tuned model

-- 325 of 840 --

Using foundational models
You can use foundational models to implement many of the
steps in Deep Search (see the blue boxes in Figure 4-14),
such as to parse complex queries, identify key components,
and generate appropriate subqueries. As in Pattern 10,
Node Postprocessing, you can use these models to process
retrieved documents to extract relevant information,
discard noise, and summarize content for further
reasoning. You can also use them to evaluate the response,
identify gaps, and update the query with the next-best
search direction. Finally, they can also synthesize the
gathered information into a coherent, comprehensive
response.
For example, the step you implement to identify gaps and
return new queries can be as simple as the following:
def get_next_queries(original_query, sub_queries, synthesis):
prompt = f"""Determine whether there is a logical or
information gap in the
answer based on the original query, previous sub queries, and the
response. If
the current response answers the question without any logical or
information
gaps, return an empty list. If there is a gap, provide a list of
up to 3 search
queries to fill in the gap.
**Original Query**:
{original_query}
**Previous Sub Queries**:
{sub_queries}
**Current answer:**
{synthesis}
"""
agent = Agent(llm, result_type=str[])
new_queries = agent.run_sync(prompt).data
return new_queries

-- 326 of 840 --

Iterative refinement
Identifying gaps as shown previously gives you the ability
to employ iterative refinement throughout the execution
flow. This is where you start very simply and then use the
answer to determine the next step in the process. For
example, you could start out by decomposing a complex
query such as this one:
Compare the economic impacts of climate change
mitigation strategies across developing and developed
nations, considering both short-term costs and long-term
benefits.
But a better way would be to start out by answering a
simpler question:
What is the economic impact of climate change mitigation
strategies?
Then, in each iteration, you can progressively fill in the
gaps in the answer to the simpler question.
Evaluation metrics
The evaluation step and the reflection step (which is tied to
the evaluation metric) are extremely important in building
a good Deep Search system. The quality of the responses
you get is often directly tied to how well you can evaluate
the iterations and provide feedback to the model for the
next iteration.
Instead of devising your own metric to evaluate content, we
recommend that you employ a widely used open source
framework like Ragas. Such frameworks are well tested
against the popular foundational models and a broad range
of documents.

-- 327 of 840 --

Ragas provides a number of out-of-the-box metrics that you
can use. Typically, you’ll create a weighted average of the
evaluation metrics and choose weights that reflect the
extent to which each metric matters for your problem. This
allows you to have a customized evaluation score that is
also robust.
At a minimum, make sure that your combined evaluation
score includes these aspects of the report:
Relevance
Comprehensiveness
Accuracy and factual correctness
Coherence, logical flow, and organization
Citation quality
Efficiency
If you’re using specific external tools (such as a SQL
database), make sure to include metrics that are
customized for that purpose.
You should also create a dataset that consists of questions
and reference answers, and you should ensure that your
evaluation scores for these reference answers (as well as a
few generated responses) meet the sniff test. You can also
use models such as those from Patronus AI, which are
specifically trained to act as evaluators.
Information integration
After evaluation, the second most important aspect of a
Deep Search system is how well it synthesizes information
from multiple sources and iterations into a coherent
understanding, to resolve conflicts and inconsistencies.

-- 328 of 840 --

As we discussed in Pattern 10, Node Postprocessing, the
synthesis step needs to perform cross-document entity
resolution to identify when different sources refer to the
same entities with the same name. Besides identifying
ambiguous entities, it needs to detect contradictions
between sources and resolve them.
One approach is to identify situations in which the
contradiction happens because of a different perspective
and then cluster the sources based on perspective.
Especially when you’re gathering data through web search,
it is important to rank sources by credibility so that you can
weigh conflicting information properly. Finally, it may be
important for the synthesis step to incorporate temporal
reasoning to reconcile information from different time
periods.
Example
To demonstrate Deep Search, we’ll build a simplified
version that carries out iterative retrieval, thinking, and
generation based on Wikipedia articles (see Figure 4-15).
The full code is in the GitHub repository of this book.

---

## Sección 77: Chapter 2). If you do this, you can’t use a fine-tuned model

-- 329 of 840 --

Figure 4-15. Simplified Deep Search on Wikipedia

-- 330 of 840 --

Retrieval
The first retrieval step, given a query, is to search
Wikipedia. You can use the Wikipedia package in Python to
do that:
import wikipedia
def search_wikipedia(query: str) -> list[WikipediaPage]
wikipedia.set_lang("en")
results = wikipedia.search(query)
pages = []
for title in results:
page = wikipedia.page(title)
pages.append(WikipediaPage(title=page.title,
url=page.url))
return pages
We did this for the following query:
What were the causes of the Liberian civil war?
We got Wikipedia pages with the following titles and a few
others:
First Liberian Civil War
Liberians United for Reconciliation and Democracy
Americo-Liberian people
The next step is to rank the resulting pages on their
relevance to the query. You can do this by using an LLM:
def rank_pages(query: str, pages: list[WikipediaPage]) ->
list[WikipediaPage]:
agent = Agent(model=MODEL_ID, result_type=list[WikipediaPage])
prompt = f"""Rank these Wikipedia pages by relevance to the
query: "{query}".
Pages: {pages}"""
response = agent.run_sync(prompt)
return response.data
The result for the Liberia page was the following titles:

-- 331 of 840 --

First Liberian Civil War
History of Liberia
Americo-Liberian people
The third step of retrieval is to extract relevant text. Again,
this can be done with an LLM call (see the notebook in
GitHub for actual code). The relevant text from the first
page, for example, starts with this:
The causes of the First Liberian Civil War are complex
and multifaceted.\n\n**Historical Factors:**\n\n*
**Socio-economic disparities:** The Americo-Liberian
elite, descendants of freed American slaves, had
historically dominated the country’s political and
economic life, marginalizing the indigenous population.
This created deep resentment and inequality.\n*
**Political exclusion:** The True Whig Party held power
for over a century, effectively creating a one-party state
that suppressed dissent and limited political participation
for non-Americo-Liberians.\n*
This looks quite relevant indeed.
Generation
The first step of generation is to synthesize an answer
that’s grounded in the relevant texts that are extracted
from the sources. This too can be accomplished with an
LLM prompt:

-- 332 of 840 --

Answer the following query based on the given
information.
Query:
{query}
Relevant information:
{[page.relevant_text for page in pages]}
The synthesized answer for the question about the Liberian
civil war starts with this:
The causes of the First Liberian Civil War are complex
and multifaceted, stemming from historical factors,
immediate triggers, and regional instability. Key causes
include:
* **Socio-economic disparities:** The Americo-Liberian
elite historically dominated Liberia’s political and
economic life, marginalizing the indigenous population
and creating deep resentment.
Thinking
The thinking step is where you evaluate the answer, find
gaps, and identify follow-up questions. Again, you can
accomplish these simply by prompting the LLM (see the
notebook in GitHub for details).
In the case of the Liberian civil war, you can identify these
follow-up questions:

-- 333 of 840 --

1. How did the socio-economic disparities specifically
manifest in terms of access to resources, education, and
opportunities for different ethnic groups?
2. In what specific ways did regional instability,
particularly the conflicts in Sierra Leone and Côte
d’Ivoire, contribute to the Liberian civil war in terms of
arms proliferation and fighter recruitment?
3. Can you elaborate on the specific human rights abuses
and acts of political repression committed by Samuel
Doe’s regime that fueled the rebellion?
Each of these questions can be sent to the retrieval step
and used to generate an answer.
Note that this technique of identifying likely follow-ups is
commonly used in chatbot design. In that process, the
visual interface typically includes follow-up questions as
chips, or clickable buttons, that the user can employ to drill
more deeply into the answer provided.
Orchestration
Putting it all together, the system uses each query and its
answer to create a section of the report:
@dataclass
class Section:
query: str
answer: str
sections: list['Section']
def create_section(query: str) -> Section:
pages = search_wikipedia(query)
ranked_pages = rank_pages(query, pages)[:3] # top 3
for page in ranked_pages:
add_relevant_text(query, page)
answer = synthesize_answer(query, ranked_pages)
section = Section(query=query, answer=answer, sections=list())
return section

-- 334 of 840 --

That section contains subsections that you can add to the
section by finding gaps and issuing follow-up questions:
def add_subsections(parent: Section):
# second and subsequent iterations with a thinking stage
follow_ups = identify_gaps_and_followups(parent.query,
parent.answer)
for follow_up in follow_ups:
section = create_section(follow_up)
parent.sections.append(section)
You can orchestrate these two steps to create a report in
full:
def deep_search(query: str, depth: int, report=None) -> Section:
if report is None:
report = create_section(query)
add_subsections(report)
if depth > 1:
for section in report.sections:
deep_search(section.query, depth-1, section)
return report
You can invoke this Deep Search implementation as
follows:
report = deep_search(
query="What were some of the famous victories of Napoleon
Bonaparte?",
depth=1)
The resulting report reads in part as follows:

---

## Sección 78: Chapter 2). If you do this, you can’t use a fine-tuned model

-- 335 of 840 --

<h1>What were some of the famous victories of
Napoleon Bonaparte?<h1>
Based on the provided information, some of Napoleon
Bonaparte’s famous victories include:
* Siege of Toulon (1793)
* 13 Vendémiaire (1795)
…
* Battle of Austerlitz (1805)
..
<h2>What was the significance of the Battle of
Austerlitz, and why is it considered one of Napoleon’s
greatest victories?<h2>
The Battle of Austerlitz was significant because it
effectively destroyed the Third Coalition against the
French Empire. It’s considered one of Napoleon’s
greatest victories because…
<h2>What were the key strategies or tactics that
Napoleon employed in these battles to secure victory?
<h2>
Based on the provided information, Napoleon’s key
strategies and tactics to secure victory included:
* **Overwhelming enemy forces:** Using a combination
of speed, deception, and concentrated firepower.
* **Rapid marching:** To achieve surprise and outflank
opponents.
…

-- 336 of 840 --

<h2>What were the consequences of these victories in
terms of Napoleon’s power and the political landscape of
Europe?<h2>
Napoleon’s victories led to a significant consolidation of
his power, allowing him to become First Consul for life in
1802 and Emperor in 1804. Politically, …
The first part of the report is the answer to the question as
posed. The list of battles includes the Battle of Austerlitz.
The subsections are answers to the follow-up questions that
were suggested based on this answer, the first of which
asks about the significance of this specific battle.
Therefore, it’s easy to see the benefits of iteratively
searching and adding to the generated state.
Considerations
The key drawback of inserting a thinking stage iteratively is
that the overall system is very slow. You need to manage
the computational cost of multiple iterations, each of which
involves foundation model inference, document retrieval,
and processing. However, using parallel processing for
subqueries and finding ways to cut the iteration short can
help you speed up the system overall.
If you get human feedback on responses, you can use
Pattern 5, Content Optimization, from Chapter 2 to create
the responses in a style that your users prefer.
References
In early 2024, researchers at Stanford developed a deep
research model (STORM) that’s capable of writing
Wikipedia articles from scratch. In early 2025, DeepSeekR1 demonstrated a thinking mode to improve search. At the
time of this writing, an open source implementation of

-- 337 of 840 --

Deep Search called node-DeepResearch is being actively
developed.
Starting with DeepSeek, all the frontier models (OpenAI,
Gemini, and Claude) now offer a deep research mode.
Summary
The patterns in Chapters 3 and 4 employ RAG systems to
extend the knowledge of foundational models. Starting with
the architecture of Pattern 6, Basic RAG, the complexity of
the architecture increases from one pattern to the next.
Table 4-1 summarizes the problems that each pattern
addresses, the techniques they employ, and the usage
scenarios for them.

-- 338 of 840 --

Table 4-1. Patterns for adding knowledge
Patterns Problems Solutions Usag

-- 339 of 840 --

Patterns Problems Solutions Usag
Basic RAG
(Pattern 6)
Knowledge
cutoff,
confidential
data, and
hallucinations
pose problems
for zero-shot
generation by
LLMs.
Ground the
response
generated by
the LLM by
adding relevant
information
from a
knowledge
base into the
prompt context.
You
syste
follo

-- 340 of 840 --

Patterns Problems Solutions Usag

-- 341 of 840 --

Patterns Problems Solutions Usag

-- 342 of 840 --

Patterns Problems Solutions Usag
Semantic
Indexing
(Pattern 7)
Traditional
keyword
indexing/lookup
approaches fail
when
documents get
more complex,
contain
different media
types like
images or
tables, or
bridge multiple
domains.
Use
embeddings to
capture the
meaning of
texts, images,
and other
media types.
Find relevant
chunks by
comparing the
embedding of
the chunk to
that of the
query.
Indexing at
Scale (Pattern
You must deal
with outdated
Use metadata,
query filtering,

-- 343 of 840 --

Patterns Problems Solutions Usag
8) or
contradictory
information in
your knowledge
base.
and result
reranking.
Index-Aware
Retrieval
(Pattern 9)
Comparing
questions to
chunks is
problematic
because a
question itself
will not appear
in the
knowledge
base, may use
synonyms or
jargon, or may
require holistic
interpretation.
Use
hypothetical
answers, query
expansion,
hybrid search,
and GraphRAG.

-- 344 of 840 --

Patterns Problems Solutions Usag
Node
Postprocessing
(Pattern 10)
You must deal
with irrelevant
content,
ambiguous
entities, and
generic
answers.
Reranking
offers the
ability to bring
in a lot of other
neat ideas:
hybrid search,
query
expansion,
filtering,
contextual
compression,
disambiguation,
and
personalization.
Trustworthy
Generation
(Pattern 11)
You must figure
out how to
retain users’
trust given that
there is no way
to completely
avoid errors.
Out-of-domain
detection,
citations,
guardrails,
human
feedback,
corrective RAG,

---

## Sección 79: Chapter 2). If you do this, you can’t use a fine-tuned model

-- 345 of 840 --

Patterns Problems Solutions Usag
and UX design
can all help.
Deep Search
(Pattern 12)
RAG systems
are less
effective for
complex
information
retrieval tasks
because of
context window
constraints,
query
ambiguity,
information
verification,
shallow
reasoning, and
multihop query
challenges.
Use an iterative
process of
searching,
reading, and
reasoning to
provide
comprehensive
answers to
complex
queries.
1 These sentences are drawn from the Wikipedia article on Toledo, Spain.

-- 346 of 840 --

---

## Sección 80: Chapter 5. Extending

Model Capabilities
LLMs excel at recognizing patterns in vast amounts of data.
They can generate coherent and contextually relevant
responses by statistically predicting the next token.
However, this doesn’t necessarily mean they can genuinely
understand the underlying concepts. If you have a task that
is not well covered by the training regimen of your
foundational model, then the model may not be able to
perform that task. This chapter discusses four patterns you
can use to teach foundational models tasks that they were
not trained to perform.
The Limits of LLM Reasoning
Foundational models can manipulate symbols and words
effectively, but this may be because they are generalizing
from the manipulation they have encountered in the
training data, not because they grasp semantic meanings
and the logical relationships between them in the way
humans do. While you can use foundational models to
perform many tasks, that’s because those tasks are similar
to the tasks that the foundational model was trained to do.
It’s difficult to describe tasks that foundational models
can’t do well—and that’s because they’ll be esoteric or
industry-specific tasks that a more general audience, such
as the readership of this book, will not understand. Tasks
that aren’t well captured by the training data of LLMs
include writing a memo to the investment committee of a

-- 347 of 840 --

mutual fund or adjudicating an internal investigation
because such memos are internal records and such
investigations are very company specific and not public
knowledge. By definition, any task that is described in
widely available sources will be captured by LLMs. Given
this, we will use math and reasoning problems to support
the idea that there are limits to LLMs’ ability to reason.
However, note that the patterns in this chapter are not
solutions to math or reasoning problems—they are
solutions to problems such as writing investment
committee memos and adjudicating internal investigations.
Known Capabilities
Many common math and reasoning problems are well
covered in LLMs’ training datasets. For example, ask your
favorite foundational model to do this:
List the prime numbers between 100 and 110.
You should get the right result: 101, 103, 107, and 109.
When we tried it, Gemini Flash responded with this (the
code is on GitHub):
The prime numbers between 100 and 110 are:
103
109
It’s unlikely that any of Gemini’s exact training data
answered this exact question; instead, Gemini can
generalize the prime-number checking that it has
encountered to our specified range.

-- 348 of 840 --

Similarly, we can ask GPT-4o-mini this question:
How many square feet is an apartment that is 84 sq
meters?
This results in something that looks very much like
reasoning:
To convert square meters to square feet, you can use the
conversion factor that 1 square meter is approximately
10.7639 square feet.
So, to convert 84 square meters to square feet:
\[
84 \, \text{sq meters} \times 10.7639 \, \text{sq feet/sq
meter} \approx 903.20 \, \text{sq feet}
\]
Therefore, an apartment that is 84 square meters is
approximately 903.20 square feet.
Again, while it’s unlikely that ChatGPT encountered the
specific word problem (about apartment size) or the
number (84) in training, it can generalize from similar
problems that it has encountered to follow the correct
approach.
The result of the multiplication is actually 904.1676,
however, so the multiplication result is hallucinated. To
address this issue, you’d need to provide the model access
to a calculator tool (see Pattern 21, Tool Calling, in

---

## Sección 81: Chapter 7).

-- 349 of 840 --

Unknown Capabilities
The two previous examples don’t demonstrate that LLMs
can reason, at least not in the way that a human would
solve the two problems. Let’s take a simple reasoning
problem that, in April 2025, was not well covered by LLM
training. This involves suit play in trick-taking card games
like bridge, whist, spades, and hearts.
We asked ChatGPT this:
In bridge, what does the maxim “eight ever, nine never”
mean?
Its initial answer was correct and read in part as follows:
The actual advice:
“Eight ever” → Finesse for the queen (because there’s
enough room for a 3-2 split where the queen is favorably
placed).
“Nine never” → Don’t finesse, play for the drop (because
with 9 cards, the queen is more likely to fall in two
rounds if it’s a doubleton).
So, it “knows” that with nine cards between the two hands
and missing the queen, the right play is to not finesse. But
then, we asked ChatGPT this:
In bridge, holding AKJxx opposite four small, how should
you play the suit for no losers?
And it incorrectly told us that the best line was to finesse:
Best line of play (standard finesse and safety play):
Play a small card from the hand with the four small
(dummy) toward the AKJxx.
If RHO plays low, insert the jack (J).

-- 350 of 840 --

So, just because a model can reproduce a standard piece of
advice, it does not mean that the model can apply that
advice. This is not limited to ChatGPT—Gemini and
Anthropic also knew the maxim but didn’t apply it.1
REPRODUCIBILITY PROBLEMS WITH
FOUNDATIONAL MODEL ERRORS
Foundational model providers monitor publications and
social media for errors that are reported by users. In
many cases, they fix such errors immediately with
hardcoded detection and responses, and then, they add
the appropriate training data to ensure that future
versions of their models can correctly handle the
prompts that caused the errors. Therefore, it’s quite
likely that, by the time you are reading this, none of the
errors we note in this chapter will exist. They may have
all been fixed.
However, even though the specific prompts we describe
may have been corrected, they’re symptoms of larger
phenomena that are unlikely to have been fixed. As you
use foundational models in your own projects, you’ll
encounter tasks that are specific to your industry and
that will exhibit the symptoms we describe.
Doubtless, in your industry and business, you have to
perform hard or obscure analytical tasks (such as writing
an investment committee memo, carrying out an internal
investigation, determining how to select a vendor, and so
on) that are similarly not well covered by the training
datasets of foundational models. This chapter discusses
four patterns that you can use to teach foundational models
tasks that they were not trained to perform.

-- 351 of 840 --

Pattern 13: Chain of Thought
The Chain of Thought pattern uses chain-of-thought (CoT)
reasoning, which is a prompting technique that enhances
LLMs’ problem-solving capabilities by encouraging them to
break down complex problems into intermediate reasoning
steps before arriving at a final answer.
Problem
When it comes to problems that involve mathematical
calculations, logical deductions, or sequential reasoning,
foundational models suffer from some critical limitations in
their training data coverage. This is particularly obvious in
problems involving multistep reasoning or when the model
directly provides an answer for questions that require some
deliberation.
Training data coverage
As the trick-taking example in the introduction illustrates,
foundational models can’t always generalize to tasks that
are unknown or poorly covered by the training dataset. It’s
likely that while grade school mathematics and physics
problems were part of the models’ training datasets,
industry-specific calculations were not.
For example, in April 2025, we got a well-reasoned answer
when we asked Claude Sonnet 3.7 a grade school physics
problem:
A 2 kg object is sliding down a frictionless inclined plane
with an angle of 30° to the horizontal. What is the
acceleration of the object?
However, even though zero-shot prompting (see Chapter 1)
worked in this case, the model couldn’t answer a problem

-- 352 of 840 --

that’s common in the oil and gas industry:
If I have a pipe of diameter 25 cm and a hose that is 100
m long, what’s the flow rate of Texas Sweet supplied with
a 7-bar pressure differential?
To the latter question, the model gave the following
answer:
I cannot provide a meaningful answer to this question
with the information given. While you’ve specified the
pipe diameter (25 cm), hose length (100 m), and pressure
differential (7 bar), several critical pieces of information
are missing:
1. The viscosity of “Texas Sweet” crude oil (which varies
based on temperature)
2. The roughness of the pipe material
3. Any additional fittings or bends in the pipe that would
create pressure losses
4. Whether the pipe is horizontal or has elevation
changes
Additionally, to calculate flow rate, I would need to use
fluid dynamics equations such as the Darcy–Weisbach
equation or the Hagen–Poiseuille law (for laminar flow),
which require the properties above.
If you need an accurate flow rate calculation, I’d need
these additional parameters about the fluid properties
and pipe configuration.
The model knows the equations in question, and its
objections that the pipe could be bent or slanted are just
filibustering. If you were to anthropomorphize the model,
you might claim that it’s being lazy!

---

## Sección 82: Chapter 7).

-- 353 of 840 --

Multistep reasoning
A model’s zero-shot capability often fails when problems
require multistep reasoning, since models tend to jump
directly to answers without the intermediate steps of
proper analysis. When they do, they often fabricate
information or provide incorrect answers.
For example, we asked Gemini this question:
You are allowed to check in 50 kg if your final destination
is the United States or if you have special needs.
Otherwise, you are allowed only 40 kg. What is the carryon allowance for the following itinerary: SIN-DFW-YYZ?
And we got an incorrect answer:
Since at least one of the legs involves the United States
as the final destination, you are allowed to check in
**50kg**.
This is a rather unusual interpretation of the word final,
and it’s wrong. Just because the words have been strung
together in a plausible way does not mean that the
reasoning is correct.
Black-box answers
Model responses rarely offer insight into how the model
reached its conclusion, and that makes it difficult to
identify errors or biases. To human users, the model
appears to be a black box. They often don’t trust responses
that are not accompanied by the reasoning the model used
to make them. Asking the model “why” after the fact does
not get the model to provide the actual reasoning it used—
in fact, its explanation is likely to be hallucinated.
For example, we asked GPT-4o-mini this question (without
giving it access to a web tool):

-- 354 of 840 --

If I drive 300 km west of Hyderabad, where will I end up?
And we got an answer that was quite wrong:
If you drive 300 km west of Hyderabad, India, you will
likely end up in the region of Maharashtra, potentially
reaching cities like Ahmednagar or even the outskirts of
Pune, depending on your exact route.
The correct answer, Solapur, is 300 km due west and along
a major westbound highway, and Ahmadnagar is 200 km
farther west and considerably farther north (see Figure 51).
Figure 5-1. Solapur is 300 km due west of Hyderabad (screenshot from Google
Maps)
It’s unclear why the model got the distance so wrong. The
response does not indicate the process that it used to come
up with the answer.

-- 355 of 840 --

Solution
CoT involves modifying the prompting strategy—instead of
asking for a direct answer, the prompt explicitly requests
or demonstrates a step-by-step reasoning process. There
are three variants: Zero-shot CoT, Few-shot CoT, and AutoCoT. Let’s look at them one by one.
Variant 1: Zero-shot CoT
In Zero-shot CoT, you request a step-by-step reasoning by
simply adding the phrase think step-by-step to the prompt
(see Figure 5-2). For example, you might say this:
A 2 kg object is sliding down a frictionless inclined plane
with an angle of 30° to the horizontal. What is the
acceleration of the object? Think step-by-step.
Figure 5-2. Zero-shot CoT
The response, from OpenAI’s GPT 3.5 Turbo, includes stepby-step reasoning:

-- 356 of 840 --

Step 1: Draw a free body diagram of the object.
The forces acting on the object are its weight (mg) acting
straight downwards and the normal force (N) acting
perpendicular to the inclined plane. Since the inclined
plane is frictionless, there is no frictional force acting on
the object.
Step 2: Resolve the weight force into components parallel
and perpendicular to the inclined plane.
The weight force can be resolved into two components:
one parallel to the inclined plane (mg*sin(30°)) and one
perpendicular to the inclined plane (mg*cos(30°)).
These steps are drawn from the model’s pretraining and
limited to what it has encountered in its pretraining. Try it
when the model is being “lazy,” either by not using the
information it has or by directly jumping to an answer.
Variant 2: Few-shot CoT
In cases where the model’s pretrained capabilities do not
include the specific logic needed, you can try Few-shot
CoT, which involves providing the model with examples of
step-by-step reasoning for similar problems before asking it
to solve a new problem. In Few-shot CoT, you demonstrate
the desired reasoning pattern through examples (see
Figure 5-3).

-- 357 of 840 --

Figure 5-3. Few-shot CoT involves providing examples of reasoning

-- 358 of 840 --

FEW-SHOT COT VERSUS RAG
Both Pattern 6, Basic RAG (from Chapter 3) and Few-shot CoT
involve adding information to the context of the prompt. Both of
these are examples of context engineering.. The difference is that in
RAG, you add knowledge (data), whereas in CoT, you demonstrate
logic. In RAG, you want the answer to be grounded precisely on the
knowledge added, whereas in CoT, you want the model to generalize
from the examples you provide.
Think of it this way: RAG gives the model a (few) fish, while Few-shot
CoT shows the model how to fish.
For example, you might use the following prompt:

-- 359 of 840 --

Solve the following physics problem using the following
example as a template.
Example:
Q: A ball is dropped from a height of 200 m. How long
will it take to reach the ground?
A:
Step 1: Identify equation
The equation that relates displacement, initial velocity,
acceleration, and time is: Δy = v₀t + (1/2)at²
Step 2: Identify known values
Δy = final height - initial height = 0 m - 200 m = -200 m
v₀ = initial velocity = 0
a = Acceleration due to gravity (g) ≈ 9.8 m/s²
Step 3: Substitute known values into the equation
-200 m = (0 m/s) * t + (1/2) * (-9.8 m/s²) * t²
Step 4: Solve
-200 m = 0 + (-4.9 m/s²) * t²
t² = (-200 m) / (-4.9 m/s²)
t² ≈ 40.816 s²
t = √(40.816 s²)
t ≈ 6.39 s
Step 5: Report answer
A ball that is dropped from a height of 200 m will take
6.39 s to reach the ground.

---

## Sección 83: Chapter 7).

-- 360 of 840 --

Q: A 2 kg object is sliding down a frictionless inclined
plane with an angle of 30° to the horizontal. What is the
acceleration of the object?
The response now follows the templated example in having
exactly five steps, as demonstrated here:
A:
Step 1: Identify equation
The equation that relates acceleration, gravity, and the
angle of the inclined plane is: a = g * sin(θ)
Step 2: Identify known values
m = mass = 2 kg
θ = angle of the inclined plane = 30°
g = Acceleration due to gravity = 9.8 m/s²
Step 3: Substitute known values into the equation
a = (9.8 m/s²) * sin(30°)
Step 4: Solve
a = (9.8 m/s²) * 0.5
a = 4.9 m/s²
Step 5: Report answer
The acceleration of the 2 kg object sliding down the
frictionless inclined plane at an angle of 30° to the
horizontal is 4.9 m/s².
Variant 3: Auto-CoT
In the Auto-CoT variant, you add demonstrative examples
to a wide variety of questions to a database called an

-- 361 of 840 --

example store. Most people use a document database (in
which the examples are indexed by keywords in the
question text) or a vector database (in which the examples
are indexed by the embedding of the questions) for the
example store.
The demonstration examples could be human written, but
it’s less expensive and more scalable to create them by
following these steps (also see Figure 5-4):
1. Sample a question bank that consists of a diverse set
of questions, for each of which, a single correct
answer exists.
2. Use Zero-shot CoT to generate answers to these
questions, using several foundational models or the
same model with different settings, so that you get
multiple answers.
3. Apply a set of consistency and correctness checks to
the answers. To accept an answer, you want it to
have the correct result and reliably repeat the
logical steps involved to get there.
4. Add question-answer pairs that pass these checks to
the example store.
Given a new question, you would find the demonstration
examples corresponding to, say, the closest five questions
in the database and then add them to the context, as with
Few-shot CoT.

-- 362 of 840 --

Figure 5-4. Auto-CoT is Few-shot CoT in which the examples are selected
dynamically

-- 363 of 840 --

Let’s extend the analogy from the sidebar in the previous
section. As with Few-shot CoT and unlike RAG, the
examples in Auto-CoT are about how to fish. The
improvement that Auto-CoT makes over Few-shot CoT is
that the example store has demonstration examples of
catching a fish in different ways—spearfishing, trapping,
angling, trawling, bait casting, and so on—and you choose
the appropriate example for your scenario.
Examples
Let’s look at a couple of examples of CoT in action.
Zero-shot CoT
By instructing the model to “think step-by-step” before
providing an answer, Zero-shot CoT often unlocks its
pretrained capabilities. Recall that the model was “lazy”
when we asked it the oil-and-gas question. What happens if
you add the Zero-shot CoT catchphrase?
If I have a pipe of diameter 25 cm and a hose that is 100
m long,
what’s the flow rate of Texas Sweet with a 7-bar pressure
differential?
Think about it step-by-step.
The abridged answer from Claude is this. (The full answer
is on GitHub.):

-- 364 of 840 --

...
## Step 1: Determine the properties of Texas Sweet
crude oil
Texas Sweet crude oil typically has these properties:
- Density (ρ): approximately 850 kg/m³
- Dynamic viscosity (μ): approximately 0.005-0.010 Pa·s
(I’ll use 0.008 Pa·s)
...
## Step 3: Substitute values and calculate
Q = (π × (0.25 m)⁴ × 700,000 Pa) / (128 × 0.008 Pa·s ×
100 m)
...
The calculated flow rate of approximately 84 m³/s (or
5,040 m³/min) for Texas Sweet crude oil with the given
parameters seems very high, indicating the flow would be
turbulent in practice and might be limited by other
factors in a real pipeline system.
We didn’t have to specify the exact steps—the model knew
that it needed to look up the viscosity of the type of crude
oil and plug the appropriate numbers into the equation to
calculate flow. Just asking the model to think step-by-step
was enough to trigger the right behavior.
Few-shot CoT
Recall that the model gave erroneous results when we
asked it the question about baggage. This was because it
had mistakenly identified a layover as a “final destination.”
However, you can address mistaken or hallucinated logic
by using Few-shot CoT. For example, you can demonstrate

-- 365 of 840 --

how to solve the baggage problem with a couple of
examples before asking the actual question:
You are allowed to check in 50 kg of baggage if your final
destination is the United States or if you have special
needs.
Otherwise, you are allowed only 40 kg.
Example 1:
Q: What’s the baggage allowance for an itinerary of CDGATL-SEA?
A: The final destination, SEA, is in the United States. So,
the baggage allowance is 50kg.
Example 2:
Q: What’s the baggage allowance for an itinerary of CDGLHR-NBO?
A: The final destination, NBO, is in Kenya. So, the
baggage allowance is 40kg.
Q: What is the baggage allowance for the following
itinerary: SIN-DFW-YYZ?
Now, the answer is correct:
A: The final destination, YYZ, is in Canada. So, the
baggage allowance is 40kg.
This answer follows the template of the demonstrated
answers. Because it doesn’t limit you to unlocking
pretrained capabilities, Few-shot CoT is more effective than
Zero-shot CoT on complex problems.
Few-shot CoT is also effective at solving the trick-taking
problem we described in the introductory section of this
chapter. Providing a couple of examples of the most likely

---

## Sección 84: Chapter 7).

-- 366 of 840 --

split of the opponent’s cards is enough to trigger an
acceptable response from the model:
You are a bridge teacher. Guide a student on how to play
the given suit combination.
Example 1:
Q: Holding AKJx opposite xxxx.
A: You have 8 cards between the two hands, and the
opponents have 5 cards, including the queen.
The most likely split is 3-2. You can pick up the suit only
if the queen is onside.
Finesse the jack.
Example 2:
Q: Holding AKJx opposite 5 small.
A: You have 9 cards between the two hands, and the
opponents have 4 cards, including the queen.
The most likely split is 2-2. Therefore, play for the queen
to drop.
Q: Holding AKJxx opposite four small.
Considerations
Using CoT is a powerful way to show the model how to
solve a domain-specific problem in a standard way. If you
are considering using it, you should be aware of its
limitations and of alternatives that exist.

-- 367 of 840 --

Limitations
CoT doesn’t help in situations where the logic required isn’t
sequential or when the model fails because of a data gap.
Data gaps
Consider the question about driving 300 km from
Hyderabad. Suppose we ask the model to think step-by-step
(as in Zero-shot CoT):
If I drive 300 km west of Hyderabad, where will I end up?
Think about it step-by-step.
The response indicates that the model is following the
correct logic:

-- 368 of 840 --

If you drive 300 km west of Hyderabad, you can expect to
end up in or near a few notable areas in the state of
Maharashtra. Here’s a step-by-step breakdown:
1. **Starting Point**: You begin in Hyderabad, which is
located in the southern part of India, in the state of
Telangana.
2. **Direction**: Driving west means you’ll be heading
toward Maharashtra, which is directly west of Telangana.
3. **Estimated Distance**: A distance of 300 km takes
you through various terrain and could put you near
several towns or cities in Maharashtra.
4. **Potential Destinations**:
- **Aurangabad**: A significant city known for its
historical sites, including the Ajanta and Ellora Caves. It
is about 300 km from Hyderabad.
- **Nanded**: Another city that is approximately within
this distance and is known for its Gurudwara and
historical significance in Sikhism.
5. **Route Options**: Depending on the specific route
taken (e.g., via NH65), you might pass through smaller
towns as well, like Zaheerabad or Bidar.
In conclusion, after traveling west for 300 km from
Hyderabad, you would likely end up in Aurangabad or
Nanded, among other possible smaller towns or cities in
Maharashtra.
The logic is correct, but the destination is hallucinated.
Nanded is northwest of Hyderabad, not west.
The way to fix a data gap is to add knowledge. In this case,
if the model is multimodal, adding a map will do nicely:

-- 369 of 840 --

def answer_based_on_map(model_id, prompt: str) -> str:
from pydantic_ai import Agent, ImageUrl
agent = Agent(model_id)
result = agent.run_sync([prompt,
ImageUrl(url="...India_roadway_map.svg.png")
])
return (result.data)
answer_based_on_map("claude-3-7-sonnet-latest","""
If I drive 300km west of Hyderabad, where will I end up?
Think about it step-by-step.
""")
The result (Solapur) is now correct, with the correct data
having been plugged into the right logic:

-- 370 of 840 --

Looking at the India National Highway Network Map, I’ll
determine where you would end up if you drove 300 km
west of Hyderabad.
Step 1: Locate Hyderabad on the map.
I can see Hyderabad in southern India, in the state of
Telangana.
Step 2: Determine what’s 300 km west of Hyderabad.
Moving west from Hyderabad for approximately 300 km
would take you toward the western part of Maharashtra
state. Based on the map scale and the highway network,
this would put you somewhere near or in the vicinity of:
- You would likely be close to areas between Solapur and
Mumbai in Maharashtra.
- You might be in the eastern parts of Maharashtra,
possibly near cities like Nanded or Latur.
- You could potentially be approaching the western
Maharashtra region.
Step 3: Conclusion
If you drive 300 km west of Hyderabad, you would most
likely end up in western Maharashtra, possibly near
Solapur or somewhere between Solapur and the
Maharashtra-Karnataka border region. The exact location
would depend on the specific route taken, as highways
don’t always run perfectly east-west.
Nonsequential logic
If the logic involves cyclical loops, CoT tends to not work.
In the bridge problem, making decisions based purely on
the most likely split of the opponents’ cards is a shortcut.
An expert would update the relevant likelihoods based on

-- 371 of 840 --

what the opponents play to the first few tricks, such as if
they show out of a suit. An expert would also take an
unlikely line if that were the only possibility to take the
desired number of tricks.
Demonstrating expert logic in the CoT doesn’t work
because the expert lines of play involve optimizing for
multiple scenarios and are therefore hard for the model to
simply mimic:

-- 372 of 840 --

---

## Sección 85: Chapter 7).

You are a bridge expert. Guide me on how to play the
given suit combination.
Example 1:
Q: Holding AKJx opposite xxx for no losers.
A: You have 7 cards between the two hands, and the
opponents have 6 cards including the queen.
To have no losers, you have to hope that the opponents’
cards are split 3-3 and that the queen is onside.
So, finesse the jack and then play from the top.
Example 2:
Q: Holding AKJx opposite 5 small for no losers.
A: You have 9 cards between the two hands, and the
opponents have 4 cards, including the queen.
If both opponents follow, then the most likely split is 2-2.
Therefore, play for the queen to drop.
Example 3:
Q: Holding AQxx opposite Txxx for one loser.
A: You have 8 cards between the two hands, and the
opponents have 5 cards, including the king, jack, and ten.
To have only one loser, you have to hope that one of the
opponents has Kx or singleton king or jack.
So, play low to the ace to catch the potential singleton. If
an honor falls, play low through the remaining honor.
If no honor falls, play small in both hands to catch the
potential doubleton king.
Q: Holding AKJxx opposite four small, for no losers.

-- 373 of 840 --

The resulting response (see the GitHub repository) is
incorrect. The model can’t pick up the desired behavior
when the demonstration examples contain nonsequential
logic.
Alternatives
If you are considering CoT, consider whether you can use a
more capable model or an agentic approach instead.
Test-time compute in models
If doing CoT is as simple as adding “think step-by-step” to
the prompt, why don’t model providers add the phrase
automatically to user prompts? In effect, they do: modern
foundational model APIs classify questions and determine
whether to use Zero-shot CoT. Generated demonstrations,
as in Auto-CoT, are part of the pretraining regimen of these
models—and in some situations, they may also use an
example store of demonstrations in Few-shot CoT.
For this reason, you’ll find Zero-shot CoT more helpful for
small, local models than for frontier models. You will find
Few-shot CoT helpful only in domains that are outside the
pretraining of the model you are using.
Model pr

---
> *[Truncated at 420 KB for optimal local RAG indexing speed]*
