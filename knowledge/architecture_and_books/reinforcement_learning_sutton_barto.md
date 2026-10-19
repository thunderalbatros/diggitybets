**Alcance:** Libro completo Reinforcement Learning: An Introduction (Sutton & Barto): procesos de decisión de Markov, bandidos contextuales y políticas óptimas. (Fuente migrada y curada desde Centinela Studio Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

---
titulo: "Reinforcement Learning: An Introduction (2nd Edition)"
autor: "Richard S. Sutton & Andrew G. Barto"
dominio: "RL, Procesos de Decisión de Markov y Aprendizaje por Recompensa"
tipo: "libro_tecnico_completo"
paginas_originales: 352
secciones_totales: 158
fecha_ingesta: "2026-10-06T02:44:11.673Z"
---

# 📖 Reinforcement Learning: An Introduction (2nd Edition)
**Autor:** Richard S. Sutton & Andrew G. Barto | **Dominio:** RL, Procesos de Decisión de Markov y Aprendizaje por Recompensa | **Páginas originales:** 352

> **Nota de Arquitectura Centinela:** Este documento contiene el texto íntegro estructurado por secciones y capítulos para consulta profunda del equipo de agentes y búsqueda híbrida (BM25 + semántica).

---

## [Sección 1] Introducción y Fundamentos

i
Reinforcement Learning:
An Introduction
Second edition, in progress
Richard S. Sutton and Andrew G. Barto
c © 2014, 2015
A Bradford Book
The MIT Press
Cambridge, Massachusetts
London, England

-- 1 of 352 --

ii
In memory of A. Harry Klopf

-- 2 of 352 --

Contents
Preface . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . viii
Series Forward . . . . . . . . . . . . . . . . . . . . . . . . . . . . . xii
Summary of Notation . . . . . . . . . . . . . . . . . . . . . . . . . . xiii
1 The Reinforcement Learning Problem 1
1.1 Reinforcement Learning . . . . . . . . . . . . . . . . . . . . . 2
1.2 Examples . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 5
1.3 Elements of Reinforcement Learning . . . . . . . . . . . . . . 7
1.4 Limitations and Scope . . . . . . . . . . . . . . . . . . . . . . 9
1.5 An Extended Example: Tic-Tac-Toe . . . . . . . . . . . . . . 10
1.6 Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15
1.7 History of Reinforcement Learning . . . . . . . . . . . . . . . 16
1.8 Bibliographical Remarks . . . . . . . . . . . . . . . . . . . . . 25
I Tabular Solution Methods 27
2 Multi-arm Bandits 31
2.1 An n-Armed Bandit Problem . . . . . . . . . . . . . . . . . . 32
2.2 Action-Value Methods . . . . . . . . . . . . . . . . . . . . . . 33
2.3 Incremental Implementation . . . . . . . . . . . . . . . . . . . 36
2.4 Tracking a Nonstationary Problem . . . . . . . . . . . . . . . 38
2.5 Optimistic Initial Values . . . . . . . . . . . . . . . . . . . . . 39
2.6 Upper-Confidence-Bound Action Selection . . . . . . . . . . . 41
iii

-- 3 of 352 --

iv CONTENTS
2.7 Gradient Bandits . . . . . . . . . . . . . . . . . . . . . . . . . 42
2.8 Associative Search (Contextual Bandits) . . . . . . . . . . . . 46
2.9 Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 47
3 Finite Markov Decision Processes 53
3.1 The Agent–Environment Interface . . . . . . . . . . . . . . . . 53
3.2 Goals and Rewards . . . . . . . . . . . . . . . . . . . . . . . . 57
3.3 Returns . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 59
3.4 Unified Notation for Episodic and Continuing Tasks . . . . . . 61
∗3.5 The Markov Property . . . . . . . . . . . . . . . . . . . . . . . 62
3.6 Markov Decision Processes . . . . . . . . . . . . . . . . . . . . 67
3.7 Value Functions . . . . . . . . . . . . . . . . . . . . . . . . . . 70
3.8 Optimal Value Functions . . . . . . . . . . . . . . . . . . . . . 75
3.9 Optimality and Approximation . . . . . . . . . . . . . . . . . 79
3.10 Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 80
4 Dynamic Programming 89
4.1 Policy Evaluation . . . . . . . . . . . . . . . . . . . . . . . . . 90
4.2 Policy Improvement . . . . . . . . . . . . . . . . . . . . . . . . 94
4.3 Policy Iteration . . . . . . . . . . . . . . . . . . . . . . . . . . 96
4.4 Value Iteration . . . . . . . . . . . . . . . . . . . . . . . . . . 98
4.5 Asynchronous Dynamic Programming . . . . . . . . . . . . . . 101
4.6 Generalized Policy Iteration . . . . . . . . . . . . . . . . . . . 104
4.7 Efficiency of Dynamic Programming . . . . . . . . . . . . . . . 106
4.8 Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 107
5 Monte Carlo Methods 113
5.1 Monte Carlo Prediction . . . . . . . . . . . . . . . . . . . . . . 114
5.2 Monte Carlo Estimation of Action Values . . . . . . . . . . . . 119
5.3 Monte Carlo Control . . . . . . . . . . . . . . . . . . . . . . . 120
5.4 Monte Carlo Control without Exploring Starts . . . . . . . . . 124

-- 4 of 352 --

CONTENTS v
5.5 Off-policy Prediction via Importance Sampling . . . . . . . . . 127
5.6 Incremental Implementation . . . . . . . . . . . . . . . . . . . 133
5.7 Off-Policy Monte Carlo Control . . . . . . . . . . . . . . . . . 135
∗5.8 Importance Sampling on Truncated Returns . . . . . . . . . . 136
5.9 Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 138
6 Temporal-Difference Learning 143
6.1 TD Prediction . . . . . . . . . . . . . . . . . . . . . . . . . . . 143
6.2 Advantages of TD Prediction Methods . . . . . . . . . . . . . 148
6.3 Optimality of TD(0) . . . . . . . . . . . . . . . . . . . . . . . 151
6.4 Sarsa: On-Policy TD Control . . . . . . . . . . . . . . . . . . 154
6.5 Q-Learning: Off-Policy TD Control . . . . . . . . . . . . . . . 157
6.6 Games, Afterstates, and Other Special Cases . . . . . . . . . . 160
6.7 Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 161
7 Eligibility Traces 167
7.1 n-Step TD Prediction . . . . . . . . . . . . . . . . . . . . . . . 168
7.2 The Forward View of TD(λ) . . . . . . . . . . . . . . . . . . . 172
7.3 The Backward View of TD(λ) . . . . . . . . . . . . . . . . . . 177
7.4 Equivalences of Forward and Backward Views . . . . . . . . . 181
7.5 Sarsa(λ) . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 183
7.6 Watkins’s Q(λ) . . . . . . . . . . . . . . . . . . . . . . . . . . 186
7.7 Off-policy Eligibility Traces using Importance Sampling . . . . 188
7.8 Implementation Issues . . . . . . . . . . . . . . . . . . . . . . 189
∗7.9 Variable λ . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 190
7.10 Conclusions . . . . . . . . . . . . . . . . . . . . . . . . . . . . 190
8 Planning and Learning with Tabular Methods 195
8.1 Models and Planning . . . . . . . . . . . . . . . . . . . . . . . 195
8.2 Integrating Planning, Acting, and Learning . . . . . . . . . . . 198
8.3 When the Model Is Wrong . . . . . . . . . . . . . . . . . . . . 203

---

## [Sección 2] Introducción y Fundamentos

-- 5 of 352 --

vi CONTENTS
8.4 Prioritized Sweeping . . . . . . . . . . . . . . . . . . . . . . . 206
8.5 Full vs. Sample Backups . . . . . . . . . . . . . . . . . . . . . 210
8.6 Trajectory Sampling . . . . . . . . . . . . . . . . . . . . . . . 213
8.7 Heuristic Search . . . . . . . . . . . . . . . . . . . . . . . . . . 217
8.8 Monte Carlo Tree Search . . . . . . . . . . . . . . . . . . . . . 220
8.9 Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 220
II Approximate Solution Methods 223
9 On-policy Approximation of Action Values 225
9.1 Value Prediction with Function Approximation . . . . . . . . 226
9.2 Gradient-Descent Methods . . . . . . . . . . . . . . . . . . . . 229
9.3 Linear Methods . . . . . . . . . . . . . . . . . . . . . . . . . . 232
9.4 Control with Function Approximation . . . . . . . . . . . . . . 241
9.5 Should We Bootstrap? . . . . . . . . . . . . . . . . . . . . . . 247
9.6 Summary . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 249
10 Off-policy Approximation of Action Values 255
11 Policy Approximation 257
11.1 Actor–Critic Methods . . . . . . . . . . . . . . . . . . . . . . . 257
11.2 Eligibility Traces for Actor–Critic Methods . . . . . . . . . . . 259
11.3 R-Learning and the Average-Reward Setting . . . . . . . . . . 260
III Frontiers 265
12 Psychology 269
13 Neuroscience 271
14 Applications and Case Studies 273
14.1 TD-Gammon . . . . . . . . . . . . . . . . . . . . . . . . . . . 273

-- 6 of 352 --

CONTENTS vii
14.2 Samuel’s Checkers Player . . . . . . . . . . . . . . . . . . . . . 279
14.3 The Acrobot . . . . . . . . . . . . . . . . . . . . . . . . . . . . 282
14.4 Elevator Dispatching . . . . . . . . . . . . . . . . . . . . . . . 286
14.5 Dynamic Channel Allocation . . . . . . . . . . . . . . . . . . . 291
14.6 Job-Shop Scheduling . . . . . . . . . . . . . . . . . . . . . . . 295
15 Prospects 303
15.1 The Unified View . . . . . . . . . . . . . . . . . . . . . . . . . 303
15.2 State Estimation . . . . . . . . . . . . . . . . . . . . . . . . . 306
15.3 Temporal Abstraction . . . . . . . . . . . . . . . . . . . . . . 306
15.4 Predictive Representations . . . . . . . . . . . . . . . . . . . . 306
15.5 Other Frontier Dimensions . . . . . . . . . . . . . . . . . . . . 306
References 311
Index 338

-- 7 of 352 --

viii PREFACE
Preface
We first came to focus on what is now known as reinforcement learning in late
1979. We were both at the University of Massachusetts, working on one of
the earliest projects to revive the idea that networks of neuronlike adaptive
elements might prove to be a promising approach to artificial adaptive intelligence. The project explored the “heterostatic theory of adaptive systems”
developed by A. Harry Klopf. Harry’s work was a rich source of ideas, and
we were permitted to explore them critically and compare them with the long
history of prior work in adaptive systems. Our task became one of teasing
the ideas apart and understanding their relationships and relative importance.
This continues today, but in 1979 we came to realize that perhaps the simplest
of the ideas, which had long been taken for granted, had received surprisingly
little attention from a computational perspective. This was simply the idea of
a learning system that wants something, that adapts its behavior in order to
maximize a special signal from its environment. This was the idea of a “hedonistic” learning system, or, as we would say now, the idea of reinforcement
learning.
Like others, we had a sense that reinforcement learning had been thoroughly explored in the early days of cybernetics and artificial intelligence. On
closer inspection, though, we found that it had been explored only slightly.
While reinforcement learning had clearly motivated some of the earliest computational studies of learning, most of these researchers had gone on to other
things, such as pattern classification, supervised learning, and adaptive control, or they had abandoned the study of learning altogether. As a result, the
special issues involved in learning how to get something from the environment
received relatively little attention. In retrospect, focusing on this idea was
the critical step that set this branch of research in motion. Little progress
could be made in the computational study of reinforcement learning until it
was recognized that such a fundamental idea had not yet been thoroughly
explored.
The field has come a long way since then, evolving and maturing in several directions. Reinforcement learning has gradually become one of the most
active research areas in machine learning, artificial intelligence, and neural network research. The field has developed strong mathematical foundations and
impressive applications. The computational study of reinforcement learning is
now a large field, with hundreds of active researchers around the world in diverse disciplines such as psychology, control theory, artificial intelligence, and
neuroscience. Particularly important have been the contributions establishing
and developing the relationships to the theory of optimal control and dynamic
programming. The overall problem of learning from interaction to achieve

---

## [Sección 3] Introducción y Fundamentos

-- 8 of 352 --

PREFACE ix
goals is still far from being solved, but our understanding of it has improved
significantly. We can now place component ideas, such as temporal-difference
learning, dynamic programming, and function approximation, within a coherent perspective with respect to the overall problem.
Our goal in writing this book was to provide a clear and simple account of
the key ideas and algorithms of reinforcement learning. We wanted our treatment to be accessible to readers in all of the related disciplines, but we could
not cover all of these perspectives in detail. For the most part, our treatment
takes the point of view of artificial intelligence and engineering. In this second
edition, we plan to have one chapter summarizing the connections to psychology and neuroscience, which are many and rapidly developing. Coverage of
connections to other fields we leave to others or to another time. We also
chose not to produce a rigorous formal treatment of reinforcement learning.
We did not reach for the highest possible level of mathematical abstraction
and did not rely on a theorem–proof format. We tried to choose a level of
mathematical detail that points the mathematically inclined in the right directions without distracting from the simplicity and potential generality of the
underlying ideas.
The book consists of three parts. Part I is introductory and problem oriented. We focus on the simplest aspects of reinforcement learning and on its
main distinguishing features. One full chapter is devoted to introducing the
reinforcement learning problem whose solution we explore in the rest of the
book. Part II presents tabular versions (assuming a small finite state space)
of all the basic solution methods based on estimating action values. We introduce dynamic programming, Monte Carlo methods, and temporal-difference
learning. There is a chapter on eligibility traces which unifies the latter two
methods, and a chapter that unifies planning methods (such as dynamic programming and state-space search) and learning methods (such as Monte Carlo
and temporal-difference learning). Part III is concerned with extending the
tabular methods to include various forms of approximation including function
approximation, policy-gradient methods, and methods designed for solving
off-policy learning problems. Part IV surveys some of the frontiers of reinforcement learning in biology and applications.
This book was designed to be used as a text in a one- or two-semester
course, perhaps supplemented by readings from the literature or by a more
mathematical text such as Bertsekas and Tsitsiklis (1996) or Szepesvari (2010).
This book can also be used as part of a broader course on machine learning,
artificial intelligence, or neural networks. In this case, it may be desirable to
cover only a subset of the material. We recommend covering Chapter 1 for a
brief overview, Chapter 2 through Section 2.2, Chapter 3 except Sections 3.4,
3.5 and 3.9, and then selecting sections from the remaining chapters according

-- 9 of 352 --

x PREFACE
to time and interests. The five chapters of Part II build on each other and are
best covered in sequence; of these, Chapter 6 is the most important for the
subject and for the rest of the book. A course focusing on machine learning
or neural networks should cover Chapter 9, and a course focusing on artificial
intelligence or planning should cover Chapter 8. Throughout the book, sections
that are more difficult and not essential to the rest of the book are marked
with a ∗. These can be omitted on first reading without creating problems
later on. Some exercises are marked with a ∗ to indicate that they are more
advanced and not essential to understanding the basic material of the chapter.
The book is largely self-contained. The only mathematical background
assumed is familiarity with elementary concepts of probability, such as expectations of random variables. Chapter 9 is substantially easier to digest if the
reader has some knowledge of artificial neural networks or some other kind of
supervised learning method, but it can be read without prior background. We
strongly recommend working the exercises provided throughout the book. Solution manuals are available to instructors. This and other related and timely
material is available via the Internet.
At the end of most chapters is a section entitled “Bibliographical and Historical Remarks,” wherein we credit the sources of the ideas presented in that
chapter, provide pointers to further reading and ongoing research, and describe
relevant historical background. Despite our attempts to make these sections
authoritative and complete, we have undoubtedly left out some important
prior work. For that we apologize, and welcome corrections and extensions for
incorporation into a subsequent edition.
In some sense we have been working toward this book for thirty years, and
we have lots of people to thank. First, we thank those who have personally
helped us develop the overall view presented in this book: Harry Klopf, for
helping us recognize that reinforcement learning needed to be revived; Chris
Watkins, Dimitri Bertsekas, John Tsitsiklis, and Paul Werbos, for helping us
see the value of the relationships to dynamic programming; John Moore and
Jim Kehoe, for insights and inspirations from animal learning theory; Oliver
Selfridge, for emphasizing the breadth and importance of adaptation; and,
more generally, our colleagues and students who have contributed in countless
ways: Ron Williams, Charles Anderson, Satinder Singh, Sridhar Mahadevan,
Steve Bradtke, Bob Crites, Peter Dayan, and Leemon Baird. Our view of reinforcement learning has been significantly enriched by discussions with Paul
Cohen, Paul Utgoff, Martha Steenstrup, Gerry Tesauro, Mike Jordan, Leslie
Kaelbling, Andrew Moore, Chris Atkeson, Tom Mitchell, Nils Nilsson, Stuart
Russell, Tom Dietterich, Tom Dean, and Bob Narendra. We thank Michael
Littman, Gerry Tesauro, Bob Crites, Satinder Singh, and Wei Zhang for providing specifics of Sections 4.7, 15.1, 15.4, 15.5, and 15.6 respectively. We

---

## [Sección 4] Introducción y Fundamentos

-- 10 of 352 --

PREFACE xi
thank the the Air Force Office of Scientific Research, the National Science
Foundation, and GTE Laboratories for their long and farsighted support.
We also wish to thank the many people who have read drafts of this book
and provided valuable comments, including Tom Kalt, John Tsitsiklis, Pawel
Cichosz, Olle G¨allmo, Chuck Anderson, Stuart Russell, Ben Van Roy, Paul
Steenstrup, Paul Cohen, Sridhar Mahadevan, Jette Randlov, Brian Sheppard,
Thomas O’Connell, Richard Coggins, Cristina Versino, John H. Hiett, Andreas Badelt, Jay Ponte, Joe Beck, Justus Piater, Martha Steenstrup, Satinder Singh, Tommi Jaakkola, Dimitri Bertsekas, Torbj¨orn Ekman, Christina
Bj¨orkman, Jakob Carlstr¨om, and Olle Palmgren. Finally, we thank Gwyn
Mitchell for helping in many ways, and Harry Stanton and Bob Prior for being our champions at MIT Press.

-- 11 of 352 --

xii
Series Forward

-- 12 of 352 --

SUMMARY OF NOTATION xiii
Summary of Notation
Capital letters are used for random variables and major algorithm variables.
Lower case letters are used for the values of random variables and for scalar
functions. Quantities that are required to be real-valued vectors are written
in bold and in lower case (even if random variables).
s state
a action
S set of all nonterminal states
S+ set of all states, including the terminal state
A(s) set of actions possible in state s
R set of possible rewards
t discrete time step
T final time step of an episode
St state at t
At action at t
Rt reward at t, dependent, like St, on At−1 and St−1
Gt return (cumulative discounted reward) following t
G(n)
t n-step return (Section 7.1)
Gλ
t λ-return (Section 7.2)
π policy, decision-making rule
π(s) action taken in state s under deterministic policy π
π(a|s) probability of taking action a in state s under stochastic policy π
p(s′, r|s, a) probability of transitioning to state s′, with reward r, from s, a
vπ(s) value of state s under policy π (expected return)
v∗(s) value of state s under the optimal policy
qπ(s, a) value of taking action a in state s under policy π
q∗(s, a) value of taking action a in state s under the optimal policy
Vt(s) estimate (a random variable) of vπ(s) or v∗(s)
Qt(s, a) estimate (a random variable) of qπ(s, a) or q∗(s, a)
ˆv(s,w) approximate value of state s given a vector of weights w
ˆq(s, a,w) approximate value of state–action pair s, a given weights w
w, wt vector of (possibly learned) weights underlying an approximate value function
x(s) vector of features visible when in state s
w>x inner product of vectors, w>x = ∑
i wixi; e.g., ˆv(s,w) = w>x(s)

-- 13 of 352 --

xiv SUMMARY OF NOTATION
δt temporal-difference error at t (a random variable, even though not upper case)
Et(s) eligibility trace for state s at t
Et(s, a) eligibility trace for a state–action pair
et eligibility trace vector at t
γ discount-rate parameter
ε probability of random action in ε-greedy policy
α, β step-size parameters
λ decay-rate parameter for eligibility traces

-- 14 of 352 --

---

## [Sección 5] Chapter 1

The Reinforcement Learning
Problem
The idea that we learn by interacting with our environment is probably the
first to occur to us when we think about the nature of learning. When an
infant plays, waves its arms, or looks about, it has no explicit teacher, but it
does have a direct sensorimotor connection to its environment. Exercising this
connection produces a wealth of information about cause and effect, about
the consequences of actions, and about what to do in order to achieve goals.
Throughout our lives, such interactions are undoubtedly a major source of
knowledge about our environment and ourselves. Whether we are learning to
drive a car or to hold a conversation, we are acutely aware of how our environment responds to what we do, and we seek to influence what happens through
our behavior. Learning from interaction is a foundational idea underlying
nearly all theories of learning and intelligence.
In this book we explore a computational approach to learning from interaction. Rather than directly theorizing about how people or animals learn, we
explore idealized learning situations and evaluate the effectiveness of various
learning methods. That is, we adopt the perspective of an artificial intelligence
researcher or engineer. We explore designs for machines that are effective in
solving learning problems of scientific or economic interest, evaluating the
designs through mathematical analysis or computational experiments. The
approach we explore, called reinforcement learning, is much more focused on
goal-directed learning from interaction than are other approaches to machine
learning.
-- 15 of 352 --

2 CHAPTER 1. THE REINFORCEMENT LEARNING PROBLEM
1.1 Reinforcement Learning
Reinforcement learning is like many topics with names ending in -ing, such
as machine learning, planning, and mountaineering, in that it is simultaneously a problem, a class of solution methods that work well on the class of
problems, and the field that studies these problems and their solution methods. Reinforcement learning problems involve learning what to do—how to
map situations to actions—so as to maximize a numerical reward signal. In
an essential way they are closed-loop problems because the learning system’s
actions influence its later inputs. Moreover, the learner is not told which actions to take, as in many forms of machine learning, but instead must discover
which actions yield the most reward by trying them out. In the most interesting and challenging cases, actions may affect not only the immediate reward
but also the next situation and, through that, all subsequent rewards. These
three characteristics—being closed-loop in an essential way, not having direct
instructions as to what actions to take, and where the consequences of actions,
including reward signals, play out over extended time periods—are the three
most important distinguishing features of reinforcement learning problems.
A full specification of reinforcement learning problems in terms of optimal
control of Markov decision processes must wait until Chapter 3, but the basic
idea is simply to capture the most important aspects of the real problem facing
a learning agent interacting with its environment to achieve a goal. Clearly,
such an agent must be able to sense the state of the environment to some extent
and must be able to take actions that affect the state. The agent also must
have a goal or goals relating to the state of the environment. The formulation
is intended to include just these three aspects—sensation, action, and goal—in
their simplest possible forms without trivializing any of them.
Any method that is well suited to solving this kind of problem we consider
to be a reinforcement learning method. Reinforcement learning is different
from supervised learning, the kind of learning studied in most current research
in field of machine learning. Supervised learning is learning from a training set of labeled examples provided by a knowledgable external supervisor.
Each example is a description of a situation together with a specification—the
label—of the correct action the system should take to that situation, which is
often to identify a category to which the situation belongs. The object of this
kind of learning is for the system to extrapolate, or generalize, its responses
so that it acts correctly in situations not present in the training set. This is
an important kind of learning, but alone it is not adequate for learning from
interaction. In interactive problems it is often impractical to obtain examples
of desired behavior that are both correct and representative of all the situations in which the agent has to act. In uncharted territory—where one would

---

## [Sección 6] Chapter 1

-- 16 of 352 --

1.1. REINFORCEMENT LEARNING 3
expect learning to be most beneficial—an agent must be able to learn from its
own experience.
Reinforcement learning is also different from what machine learning researchers call unsupervised learning, which is typically about finding structure hidden in collections of unlabeled data. The terms supervised learning
and unsupervised learning appear to exhaustively classify machine learning
paradigms, but they do not. Although one might be tempted to think of reinforcement learning as a kind of unsupervised learning because it does not rely
on examples of correct behavior, reinforcement learning is trying to maximize
a reward signal instead of trying to find hidden structure. Uncovering structure in an agent’s experience can certainly be useful in reinforcement learning,
but by itself does not address the reinforcement learning agent’s problem of
maximizing a reward signal. We therefore consider reinforcement learning to
be a third machine learning paradigm, alongside of supervised learning, unsupervised learning, and perhaps other paradigms as well.
One of the challenges that arise in reinforcement learning, and not in other
kinds of learning, is the trade-off between exploration and exploitation. To
obtain a lot of reward, a reinforcement learning agent must prefer actions
that it has tried in the past and found to be effective in producing reward.
But to discover such actions, it has to try actions that it has not selected
before. The agent has to exploit what it already knows in order to obtain
reward, but it also has to explore in order to make better action selections in
the future. The dilemma is that neither exploration nor exploitation can be
pursued exclusively without failing at the task. The agent must try a variety of
actions and progressively favor those that appear to be best. On a stochastic
task, each action must be tried many times to gain a reliable estimate its
expected reward. The exploration–exploitation dilemma has been intensively
studied by mathematicians for many decades (see Chapter 2). For now, we
simply note that the entire issue of balancing exploration and exploitation
does not even arise in supervised and unsupervised learning, at least in their
purist forms.
Another key feature of reinforcement learning is that it explicitly considers
the whole problem of a goal-directed agent interacting with an uncertain environment. This is in contrast with many approaches that consider subproblems
without addressing how they might fit into a larger picture. For example,
we have mentioned that much of machine learning research is concerned with
supervised learning without explicitly specifying how such an ability would
finally be useful. Other researchers have developed theories of planning with
general goals, but without considering planning’s role in real-time decisionmaking, or the question of where the predictive models necessary for planning
would come from. Although these approaches have yielded many useful results,

-- 17 of 352 --

4 CHAPTER 1. THE REINFORCEMENT LEARNING PROBLEM
their focus on isolated subproblems is a significant limitation.
Reinforcement learning takes the opposite tack, starting with a complete,
interactive, goal-seeking agent. All reinforcement learning agents have explicit
goals, can sense aspects of their environments, and can choose actions to influence their environments. Moreover, it is usually assumed from the beginning
that the agent has to operate despite significant uncertainty about the environment it faces. When reinforcement learning involves planning, it has to address
the interplay between planning and real-time action selection, as well as the
question of how environment models are acquired and improved. When reinforcement learning involves supervised learning, it does so for specific reasons
that determine which capabilities are critical and which are not. For learning
research to make progress, important subproblems have to be isolated and
studied, but they should be subproblems that play clear roles in complete,
interactive, goal-seeking agents, even if all the details of the complete agent
cannot yet be filled in.
One of the most exciting aspects of modern reinforcement learning is its
substantive and fruitful interactions with other engineering and scientific disciplines. Reinforcement learning is part of a decades-long trend within artificial
intelligence and machine learning toward greater integration with statistics,
optimization, and other mathematical subjects. For example, the ability of
some reinforcement learning methods to learn with parameterized approximators addresses the classical “curse of dimensionality” in operations research
and control theory. More distinctively, reinforcement learning has also interacted strongly with psychology and neuroscience, with substantial benefits
going both ways. Of all the forms of machine learning, reinforcement learning is the closest to the kind of learning that humans and other animals do,
and many of the core algorithms of reinforcement learning were originally inspired by biological learning systems. And reinforcement learning has also
given back, both through a psychological model of animal learning that better
matches some of the empirical data, and through an influential model of parts
of the brain’s reward system. The body of this book develops the ideas of
reinforcement learning that pertain to engineering and artificial intelligence,
with connections to psychology and neuroscience summarized in Chapters ??
and ??.
Finally, reinforcement learning is also part of a larger trend in artificial
intelligence back toward simple general principles. Since the late 1960’s, many
artificial intelligence researchers presumed that there are no general principles
to be discovered, that intelligence is instead due to the possession of vast numbers of special purpose tricks, procedures, and heuristics. It was sometimes
said that if we could just get enough relevant facts into a machine, say one million, or one billion, then it would become intelligent. Methods based on general

---

## [Sección 7] Chapter 1

-- 18 of 352 --

1.2. EXAMPLES 5
principles, such as search or learning, were characterized as “weak methods,”
whereas those based on specific knowledge were called “strong methods.” This
view is still common today, but much less dominant. From our point of view,
it was simply premature: too little effort had been put into the search for
general principles to conclude that there were none. Modern AI now includes
much research looking for general principles of learning, search, and decisionmaking, as well as trying to incorporate vast amounts of domain knowledge. It
is not clear how far back the pendulum will swing, but reinforcement learning
research is certainly part of the swing back toward simpler and fewer general
principles of artificial intelligence.
1.2 Examples
A good way to understand reinforcement learning is to consider some of the
examples and possible applications that have guided its development.
• A master chess player makes a move. The choice is informed both by
planning—anticipating possible replies and counterreplies—and by immediate, intuitive judgments of the desirability of particular positions
and moves.
• An adaptive controller adjusts parameters of a petroleum refinery’s operation in real time. The controller optimizes the yield/cost/quality
trade-off on the basis of specified marginal costs without sticking strictly
to the set points originally suggested by engineers.
• A gazelle calf struggles to its feet minutes after being born. Half an hour
later it is running at 20 miles per hour.
• A mobile robot decides whether it should enter a new room in search of
more trash to collect or start trying to find its way back to its battery
recharging station. It makes its decision based on the current charge
level of its battery and how quickly and easily it has been able to find
the recharger in the past.
• Phil prepares his breakfast. Closely examined, even this apparently mundane activity reveals a complex web of conditional behavior and interlocking goal–subgoal relationships: walking to the cupboard, opening it,
selecting a cereal box, then reaching for, grasping, and retrieving the
box. Other complex, tuned, interactive sequences of behavior are required to obtain a bowl, spoon, and milk jug. Each step involves a series

-- 19 of 352 --

6 CHAPTER 1. THE REINFORCEMENT LEARNING PROBLEM
of eye movements to obtain information and to guide reaching and locomotion. Rapid judgments are continually made about how to carry the
objects or whether it is better to ferry some of them to the dining table
before obtaining others. Each step is guided by goals, such as grasping
a spoon or getting to the refrigerator, and is in service of other goals,
such as having the spoon to eat with once the cereal is prepared and ultimately obtaining nourishment. Whether he is aware of it or not, Phil
is accessing information about the state of his body that determines his
nutritional needs, level of hunger, and food preferences.
These examples share features that are so basic that they are easy to overlook. All involve interaction between an active decision-making agent and
its environment, within which the agent seeks to achieve a goal despite uncertainty about its environment. The agent’s actions are permitted to affect
the future state of the environment (e.g., the next chess position, the level of
reservoirs of the refinery, the robot’s next location and the future charge level
of its battery), thereby affecting the options and opportunities available to
the agent at later times. Correct choice requires taking into account indirect,
delayed consequences of actions, and thus may require foresight or planning.
At the same time, in all these examples the effects of actions cannot be
fully predicted; thus the agent must monitor its environment frequently and
react appropriately. For example, Phil must watch the milk he pours into
his cereal bowl to keep it from overflowing. All these examples involve goals
that are explicit in the sense that the agent can judge progress toward its goal
based on what it can sense directly. The chess player knows whether or not
he wins, the refinery controller knows how much petroleum is being produced,
the mobile robot knows when its batteries run down, and Phil knows whether
or not he is enjoying his breakfast.
Neither the agent nor its environment may coincide with what we normally
think of as an agent and its environment. An agent is not necessarily an entire
robot or organism, and its environment is not necessarily only what is outside
of a robot or organism. The example robot’s battery is part of the environment
of its controlling agent, and Phil’s degree of hunger and food preferences are
features of the environment of his internal decision-making agent. The state
of an agent’s environment often include’s information about the state of the
machine or organism in which the agent resides, and this can include memories
and even aspirations. Throughout this book we are being abstract in this way
when we talk about agents and their environments.
In all of these examples the agent can use its experience to improve its performance over time. The chess player refines the intuition he uses to evaluate
positions, thereby improving his play; the gazelle calf improves the efficiency

---

## [Sección 8] Chapter 1

-- 20 of 352 --

1.3. ELEMENTS OF REINFORCEMENT LEARNING 7
with which it can run; Phil learns to streamline making his breakfast. The
knowledge the agent brings to the task at the start—either from previous experience with related tasks or built into it by design or evolution—influences
what is useful or easy to learn, but interaction with the environment is essential
for adjusting behavior to exploit specific features of the task.
1.3 Elements of Reinforcement Learning
Beyond the agent and the environment, one can identify four main subelements
of a reinforcement learning system: a policy, a reward signal , a value function,
and, optionally, a model of the environment.
A policy defines the learning agent’s way of behaving at a given time.
Roughly speaking, a policy is a mapping from perceived states of the environment to actions to be taken when in those states. It corresponds to what
in psychology would be called a set of stimulus–response rules or associations
(provided that stimuli include those that can come from within the animal).
In some cases the policy may be a simple function or lookup table, whereas
in others it may involve extensive computation such as a search process. The
policy is the core of a reinforcement learning agent in the sense that it alone
is sufficient to determine behavior. In general, policies may be stochastic.
A reward signal defines the goal in a reinforcement learning problem. On
each time step, the environment sends to the reinforcement learning agent a
single number, a reward. The agent’s sole objective is to maximize the total
reward it receives over the long run. The reward signal thus defines what are
the good and bad events for the agent. In a biological system, we might think
of rewards as analogous to the experiences of pleasure or pain. They are the
immediate and defining features of the problem faced by the agent. The
reward sent to the agent at any time depends on the agent’s current action
and the current state of the agent’s environment. The agent cannot alter the
process that does this. The only way the agent can influence the reward signal
is through its actions, which can have a direct effect on reward, or an indirect
effect through changing the environment’s state. In our example above of Phil
eating breakfast, the reinforcement learning agent directing his behavior might
receive different reward signals when he eats his breakfast depending on how
hungry he is, what mood he is in, and other features of his of his body, which
is part of his internal reinforcement learning agent’s environment. The reward
signal is the primary basis for altering the policy. If an action selected by the
policy is followed by low reward, then the policy may be changed to select
some other action in that situation in the future. In general, reward signals
may be stochastic functions of the state of the environment and the actions

-- 21 of 352 --

8 CHAPTER 1. THE REINFORCEMENT LEARNING PROBLEM
taken.
Whereas the reward signal indicates what is good in an immediate sense,
a value function specifies what is good in the long run. Roughly speaking, the
value of a state is the total amount of reward an agent can expect to accumulate
over the future, starting from that state. Whereas rewards determine the
immediate, intrinsic desirability of environmental states, values indicate the
long-term desirability of states after taking into account the states that are
likely to follow, and the rewards available in those states. For example, a state
might always yield a low immediate reward but still have a high value because
it is regularly followed by other states that yield high rewards. Or the reverse
could be true. To make a human analogy, rewards are somewhat like pleasure
(if high) and pain (if low), whereas values correspond to a more refined and
farsighted judgment of how pleased or displeased we are that our environment
is in a particular state. Expressed this way, we hope it is clear that value
functions formalize a basic and familiar idea.
Rewards are in a sense primary, whereas values, as predictions of rewards,
are secondary. Without rewards there could be no values, and the only purpose
of estimating values is to achieve more reward. Nevertheless, it is values with
which we are most concerned when making and evaluating decisions. Action
choices are made based on value judgments. We seek actions that bring about
states of highest value, not highest reward, because these actions obtain the
greatest amount of reward for us over the long run. In decision-making and
planning, the derived quantity called value is the one with which we are most
concerned. Unfortunately, it is much harder to determine values than it is to
determine rewards. Rewards are basically given directly by the environment,
but values must be estimated and re-estimated from the sequences of observations an agent makes over its entire lifetime. In fact, the most important
component of almost all reinforcement learning algorithms we consider is a
method for efficiently estimating values. The central role of value estimation
is arguably the most important thing we have learned about reinforcement
learning over the last few decades.
The fourth and final element of some reinforcement learning systems is
a model of the environment. This is something that mimics the behavior of
the environment, or more generally, that allows inferences to be made about
how the environment will behave. For example, given a state and action,
the model might predict the resultant next state and next reward. Models
are used for planning, by which we mean any way of deciding on a course of
action by considering possible future situations before they are actually experienced. Methods for solving reinforcement learning problems that use models
and planning are called model-based methods, as opposed to simpler modelfree methods that are explicitly trial-and-error learners—viewed as almost the

---

## [Sección 9] Chapter 1

-- 22 of 352 --

1.4. LIMITATIONS AND SCOPE 9
opposite of planning. In Chapter 9 we explore reinforcement learning systems
that simultaneously learn by trial and error, learn a model of the environment, and use the model for planning. Modern reinforcement learning spans
the spectrum from low-level, trial-and-error learning to high-level, deliberative
planning.
1.4 Limitations and Scope
Most of the reinforcement learning methods we consider in this book are structured around estimating value functions, but it is not strictly necessary to do
this to solve reinforcement learning problems. For example, methods such as
genetic algorithms, genetic programming, simulated annealing, and other optimization methods have been used to approach reinforcement learning problems
without ever appealing to value functions. These methods evaluate the “lifetime” behavior of many non-learning agents, each using a different policy for
interacting with its environment, and select those that are able to obtain the
most reward. We call these evolutionary methods because their operation is
analogous to the way biological evolution produces organisms with skilled behavior even when they do not learn during their individual lifetimes. If the
space of policies is sufficiently small, or can be structured so that good policies
are common or easy to find—or if a lot of time is available for the search—then
evolutionary methods can be effective. In addition, evolutionary methods have
advantages on problems in which the learning agent cannot accurately sense
the state of its environment.
Our focus is on reinforcement learning methods that involve learning while
interacting with the environment, which evolutionary methods do not do (unless they evolve learning algorithms, as in some of the approaches that have
been studied). It is our belief that methods able to take advantage of the
details of individual behavioral interactions can be much more efficient than
evolutionary methods in many cases. Evolutionary methods ignore much of
the useful structure of the reinforcement learning problem: they do not use
the fact that the policy they are searching for is a function from states to
actions; they do not notice which states an individual passes through during
its lifetime, or which actions it selects. In some cases this information can
be misleading (e.g., when states are misperceived), but more often it should
enable more efficient search. Although evolution and learning share many features and naturally work together, we do not consider evolutionary methods
by themselves to be especially well suited to reinforcement learning problems.
For simplicity, in this book when we use the term “reinforcement learning
method” we do not include evolutionary methods.

-- 23 of 352 --

10 CHAPTER 1. THE REINFORCEMENT LEARNING PROBLEM
However, we do include some methods that, like evolutionary methods,
do not appeal to value functions. These methods search in spaces of policies
defined by a collection of numerical parameters. They estimate the directions
the parameters should be adjusted in order to most rapidly improve a policy’s
performance. Unlike evolutionary methods, however, they produce these estimates while the agent is interacting with its environment and so can take
advantage of the details of individual behavioral interactions. Methods like
this, called policy gradient methods, have proven useful in many problems, and
some of the simplest reinforcement learning methods fall into this category. In
fact, some of these methods take advantage of value function estimates to improve their gradient estimates. Overall, the distinction between policy gradient
methods and other methods we include as reinforcement learning methods is
not sharply defined.
Reinforcement learning’s connection to optimization methods deserves some
additional comment because it is a source of a common misunderstanding.
When we say that a reinforcement learning agent’s goal is to maximize a numerical reward signal, we of course are not insisting that the agent has to
actually achieve the goal of maximum reward. Trying to maximize a quantity
does not mean that that quantity is ever maximized. The point is that a reinforcement learning agent is always trying to increase the amount of reward
it receives. Many factors can prevent it from achieving the maximum, even if
one exists. In other words, optimization is not the same a optimality.
1.5 An Extended Example: Tic-Tac-Toe
To illustrate the general idea of reinforcement learning and contrast it with
other approaches, we next consider a single example in more detail.
Consider the familiar child’s game of tic-tac-toe. Two players take turns
playing on a three-by-three board. One player plays Xs and the other Os until
one player wins by placing three marks in a row, horizontally, vertically, or
diagonally, as the X player has in this game:
X
X
X
O O
X O
If the board fills up with neither player getting three in a row, the game is
a draw. Because a skilled player can play so as never to lose, let us assume
that we are playing against an imperfect player, one whose play is sometimes

---

## [Sección 10] Chapter 1

-- 24 of 352 --

1.5. AN EXTENDED EXAMPLE: TIC-TAC-TOE 11
incorrect and allows us to win. For the moment, in fact, let us consider draws
and losses to be equally bad for us. How might we construct a player that will
find the imperfections in its opponent’s play and learn to maximize its chances
of winning?
Although this is a simple problem, it cannot readily be solved in a satisfactory way through classical techniques. For example, the classical “minimax”
solution from game theory is not correct here because it assumes a particular
way of playing by the opponent. For example, a minimax player would never
reach a game state from which it could lose, even if in fact it always won from
that state because of incorrect play by the opponent. Classical optimization
methods for sequential decision problems, such as dynamic programming, can
compute an optimal solution for any opponent, but require as input a complete specification of that opponent, including the probabilities with which
the opponent makes each move in each board state. Let us assume that this
information is not available a priori for this problem, as it is not for the vast
majority of problems of practical interest. On the other hand, such information can be estimated from experience, in this case by playing many games
against the opponent. About the best one can do on this problem is first to
learn a model of the opponent’s behavior, up to some level of confidence, and
then apply dynamic programming to compute an optimal solution given the
approximate opponent model. In the end, this is not that different from some
of the reinforcement learning methods we examine later in this book.
An evolutionary method applied to this problem would directly search the
space of possible policies for one with a high probability of winning against
the opponent. Here, a policy is a rule that tells the player what move to make
for every state of the game—every possible configuration of Xs and Os on the
three-by-three board. For each policy considered, an estimate of its winning
probability would be obtained by playing some number of games against the
opponent. This evaluation would then direct which policy or policies were
considered next. A typical evolutionary method would hill-climb in policy
space, successively generating and evaluating policies in an attempt to obtain
incremental improvements. Or, perhaps, a genetic-style algorithm could be
used that would maintain and evaluate a population of policies. Literally
hundreds of different optimization methods could be applied.
Here is how the tic-tac-toe problem would be approached with a method
making use of a value function. First we set up a table of numbers, one for
each possible state of the game. Each number will be the latest estimate of
the probability of our winning from that state. We treat this estimate as the
state’s value, and the whole table is the learned value function. State A has
higher value than state B, or is considered “better” than state B, if the current
estimate of the probability of our winning from A is higher than it is from B.

-- 25 of 352 --

12 CHAPTER 1. THE REINFORCEMENT LEARNING PROBLEM
..
•
our move {
opponent's move {
our move {
starting position
•
•
•
a
b
c*
d
e e*
opponent's move {
c
• f
•g* g
opponent's move {
our move { .
•
Figure 1.1: A sequence of tic-tac-toe moves. The solid lines represent the
moves taken during a game; the dashed lines represent moves that we (our
reinforcement learning player) considered but did not make. Our second move
was an exploratory move, meaning that it was taken even though another
sibling move, the one leading to e∗, was ranked higher. Exploratory moves do
not result in any learning, but each of our other moves does, causing backups
as suggested by the curved arrows and detailed in the text.
Assuming we always play Xs, then for all states with three Xs in a row the
probability of winning is 1, because we have already won. Similarly, for all
states with three Os in a row, or that are “filled up,” the correct probability
is 0, as we cannot win from them. We set the initial values of all the other
states to 0.5, representing a guess that we have a 50% chance of winning.
We play many games against the opponent. To select our moves we examine
the states that would result from each of our possible moves (one for each blank
space on the board) and look up their current values in the table. Most of the
time we move greedily, selecting the move that leads to the state with greatest
value, that is, with the highest estimated probability of winning. Occasionally,
however, we select randomly from among the other moves instead. These are
called exploratory moves because they cause us to experience states that we
might otherwise never see. A sequence of moves made and considered during
a game can be diagrammed as in Figure 1.1.

---

## [Sección 11] Chapter 1

-- 26 of 352 --

1.5. AN EXTENDED EXAMPLE: TIC-TAC-TOE 13
While we are playing, we change the values of the states in which we find
ourselves during the game. We attempt to make them more accurate estimates
of the probabilities of winning. To do this, we “back up” the value of the state
after each greedy move to the state before the move, as suggested by the arrows
in Figure 1.1. More precisely, the current value of the earlier state is adjusted
to be closer to the value of the later state. This can be done by moving the
earlier state’s value a fraction of the way toward the value of the later state.
If we let s denote the state before the greedy move, and s′ the state after
the move, then the update to the estimated value of s, denoted V (s), can be
written as
V (s) ← V (s) + α
[
V (s′) − V (s)
]
,
where α is a small positive fraction called the step-size parameter, which influences the rate of learning. This update rule is an example of a temporaldifference learning method, so called because its changes are based on a difference, V (s′) − V (s), between estimates at two different times.
The method described above performs quite well on this task. For example,
if the step-size parameter is reduced properly over time, this method converges,
for any fixed opponent, to the true probabilities of winning from each state
given optimal play by our player. Furthermore, the moves then taken (except
on exploratory moves) are in fact the optimal moves against the opponent. In
other words, the method converges to an optimal policy for playing the game.
If the step-size parameter is not reduced all the way to zero over time, then
this player also plays well against opponents that slowly change their way of
playing.
This example illustrates the differences between evolutionary methods and
the methods that learn value functions. To evaluate a policy an evolutionary
method holds the policy fixed and plays many games against the opponent, or
simulate many games using a model of the opponent. The frequency of wins
gives an unbiased estimate of the probability of winning with that policy, and
can be used to direct the next policy selection. But each policy change is made
only after many games, and only the final outcome of each game is used: what
happens during the games is ignored. For example, if the player wins, then
all of its behavior in the game is given credit, independently of how specific
moves might have been critical to the win. Credit is even given to moves that
never occurred! Value function methods, in contrast, allow individual states
to be evaluated. In the end, evolutionary and value function methods both
search the space of policies, but learning a value function takes advantage of
information available during the course of play.
This simple example illustrates some of the key features of reinforcement
learning methods. First, there is the emphasis on learning while interacting

-- 27 of 352 --

14 CHAPTER 1. THE REINFORCEMENT LEARNING PROBLEM
with an environment, in this case with an opponent player. Second, there is a
clear goal, and correct behavior requires planning or foresight that takes into
account delayed effects of one’s choices. For example, the simple reinforcement learning player would learn to set up multi-move traps for a shortsighted
opponent. It is a striking feature of the reinforcement learning solution that it
can achieve the effects of planning and lookahead without using a model of the
opponent and without conducting an explicit search over possible sequences
of future states and actions.
While this example illustrates some of the key features of reinforcement
learning, it is so simple that it might give the impression that reinforcement
learning is more limited than it really is. Although tic-tac-toe is a two-person
game, reinforcement learning also applies in the case in which there is no external adversary, that is, in the case of a “game against nature.” Reinforcement
learning also is not restricted to problems in which behavior breaks down into
separate episodes, like the separate games of tic-tac-toe, with reward only at
the end of each episode. It is just as applicable when behavior continues indefinitely and when rewards of various magnitudes can be received at any time.
Reinforcement learning is also applicable to problems that do not even break
down into discrete time steps, like the plays of tic-tac-toe. The general principles apply to continuous-time problems as well, although the theory gets more
complicated and we omit it from this introductory treatment.
Tic-tac-toe has a relatively small, finite state set, whereas reinforcement
learning can be used when the state set is very large, or even infinite. For
example, Gerry Tesauro (1992, 1995) combined the algorithm described above
with an artificial neural network to learn to play backgammon, which has
approximately 1020 states. With this many states it is impossible ever to
experience more than a small fraction of them. Tesauro’s program learned to
play far better than any previous program, and now plays at the level of the
world’s best human players (see Chapter 15). The neural network provides
the program with the ability to generalize from its experience, so that in new
states it selects moves based on information saved from similar states faced
in the past, as determined by its network. How well a reinforcement learning
system can work in problems with such large state sets is intimately tied to
how appropriately it can generalize from past experience. It is in this role that
we have the greatest need for supervised learning methods with reinforcement
learning. Neural networks are not the only, or necessarily the best, way to do
this.
In this tic-tac-toe example, learning started with no prior knowledge beyond the rules of the game, but reinforcement learning by no means entails a
tabula rasa view of learning and intelligence. On the contrary, prior information can be incorporated into reinforcement learning in a variety of ways that

---

## [Sección 12] Chapter 1

-- 28 of 352 --

1.6. SUMMARY 15
can be critical for efficient learning. We also had access to the true state in the
tic-tac-toe example, whereas reinforcement learning can also be applied when
part of the state is hidden, or when different states appear to the learner to be
the same. That case, however, is substantially more difficult, and we do not
cover it significantly in this book.
Finally, the tic-tac-toe player was able to look ahead and know the states
that would result from each of its possible moves. To do this, it had to have
a model of the game that allowed it to “think about” how its environment
would change in response to moves that it might never make. Many problems
are like this, but in others even a short-term model of the effects of actions
is lacking. Reinforcement learning can be applied in either case. No model is
required, but models can easily be used if they are available or can be learned.
On the other hand, there are reinforcement learning methods that do not
need any kind of environment model at all. Model-free systems cannot even
think about how their environments will change in response to a single action.
The tic-tac-toe player is model-free in this sense with respect to its opponent:
it has no model of its opponent of any kind. Because models have to be
reasonably accurate to be useful, model-free methods can have advantages over
more complex methods when the real bottleneck in solving a problem is the
difficulty of constructing a sufficiently accurate environment model. Modelfree methods are also important building blocks for model-based methods. In
this book we devote several chapters to model-free methods before we discuss
how they can be used as components of more complex model-based methods.
But reinforcement learning can be used at both high and low levels in a system. Although the tic-tac-toe player learned only about the basic moves of the
game, nothing prevents reinforcement learning from working at higher levels
where each of the “actions” may itself be the application of a possibly elaborate problem-solving method. In hierarchical learning systems, reinforcement
learning can work simultaneously on several levels.
1.6 Summary
Reinforcement learning is a computational approach to understanding and automating goal-directed learning and decision-making. It is distinguished from
other computational approaches by its emphasis on learning by an agent from
direct interaction with its environment, without relying on exemplary supervision or complete models of the environment. In our opinion, reinforcement
learning is the first field to seriously address the computational issues that
arise when learning from interaction with an environment in order to achieve

-- 29 of 352 --

16 CHAPTER 1. THE REINFORCEMENT LEARNING PROBLEM
long-term goals.
Reinforcement learning uses a formal framework defining the interaction
between a learning agent and its environment in terms of states, actions, and
rewards. This framework is intended to be a simple way of representing essential features of the artificial intelligence problem. These features include a
sense of cause and effect, a sense of uncertainty and nondeterminism, and the
existence of explicit goals.
The concepts of value and value functions are the key features of most of
the reinforcement learning methods that we consider in this book. We take
the position that value functions are important for efficient search in the space
of policies. Their use of value functions distinguishes reinforcement learning
methods from evolutionary methods that search directly in policy space guided
by scalar evaluations of entire policies.
1.7 History of Reinforcement Learning
The history of reinforcement learning has two main threads, both long and rich,
that were pursued independently before intertwining in modern reinforcement
learning. One thread concerns learning by trial and error that started in the
psychology of animal learning. This thread runs through some of the earliest
work in artificial intelligence and led to the revival of reinforcement learning in
the early 1980s. The other thread concerns the problem of optimal control and
its solution using value functions and dynamic programming. For the most
part, this thread did not involve learning. Although the two threads have
been largely independent, the exceptions revolve around a third, less distinct
thread concerning temporal-difference methods such as used in the tic-tac-toe
example in this chapter. All three threads came together in the late 1980s
to produce the modern field of reinforcement learning as we present it in this
book.
The thread focusing on trial-and-error learning is the one with which we
are most familiar and about which we have the most to say in this brief history.
Before doing that, however, we briefly discuss the optimal control thread.
The term “optimal control” came into use in the late 1950s to describe
the problem of designing a controller to minimize a measure of a dynamical
system’s behavior over time. One of the approaches to this problem was developed in the mid-1950s by Richard Bellman and others through extending
a nineteenth century theory of Hamilton and Jacobi. This approach uses the
concepts of a dynamical system’s state and of a value function, or “optimal
return function,” to define a functional equation, now often called the Bell-

---

## [Sección 13] Chapter 1

-- 30 of 352 --

1.7. HISTORY OF REINFORCEMENT LEARNING 17
man equation. The class of methods for solving optimal control problems by
solving this equation came to be known as dynamic programming (Bellman,
1957a). Bellman (1957b) also introduced the discrete stochastic version of the
optimal control problem known as Markovian decision processes (MDPs), and
Ronald Howard (1960) devised the policy iteration method for MDPs. All of
these are essential elements underlying the theory and algorithms of modern
reinforcement learning.
Dynamic programming is widely considered the only feasible way of solving general stochastic optimal control problems. It suffers from what Bellman called “the curse of dimensionality,” meaning that its computational
requirements grow exponentially with the number of state variables, but it
is still far more efficient and more widely applicable than any other general
method. Dynamic programming has been extensively developed since the
late 1950s, including extensions to partially observable MDPs (surveyed by
Lovejoy, 1991), many applications (surveyed by White, 1985, 1988, 1993), approximation methods (surveyed by Rust, 1996), and asynchronous methods
(Bertsekas, 1982, 1983). Many excellent modern treatments of dynamic programming are available (e.g., Bertsekas, 1995; Puterman, 1994; Ross, 1983;
and Whittle, 1982, 1983). Bryson (1996) provides an authoritative history of
optimal control.
Connections between optimal control and dynamic programming, on the
one hand, and learning, on the other, were slow to be recognized. We cannot be sure about what accounted for this separation, but its main cause was
likely the separation between the disciplines involved and their different goals.
Also contributing may have been the prevalent view of dynamic programming
as an off-line computation depending essentially on accurate system models
and analytic solutions to the Bellman equation. Further, the simplest form
of dynamic programming is a computation that proceeds backwards in time,
making it difficult to see how it could be involved in a learning process that
must proceed in a forward direction. Perhaps the first to connect optimal control and dynamic programming with learning was Paul Werbos (1977), who
proposed an approximate approach to dynamic programming that he called
“heuristic dynamic programming.” He later argued for the need for greater
interrelation of dynamic programming and learning methods and its relevance
to understanding neural and cognitive mechanisms (Werbos, 1987). For us
the full integration of dynamic programming methods with on-line learning
did not occur until the work of Chris Watkins in 1989, whose treatment of
reinforcement learning using the MDP formalism has been widely adopted
(Watkins, 1989). Since then these relationships have been extensively developed by many researchers, most particularly by Dimitri Bertsekas and John
Tsitsiklis (1996), who coined the term “neurodynamic programming” to refer

-- 31 of 352 --

18 CHAPTER 1. THE REINFORCEMENT LEARNING PROBLEM
to the combination of dynamic programming and neural networks. Another
term currently in use is “approximate dynamic programming.” These various
approaches emphasize different aspects of the subject, but they all share with
reinforcement learning an interest in circumventing the classical shortcomings
of dynamic programming.
In this book, we consider all of the work in optimal control also to be,
in a sense, work in reinforcement learning. We define a reinforcement learning method as any effective way of solving reinforcement learning problems,
and it is now clear that these problems are closely related to optimal control problems, particularly stochastic optimal control problems such as those
formulated as MDPs. Accordingly, we must consider the solution methods
of optimal control, such as dynamic programming, also to be reinforcement
learning methods. Because almost all of the conventional methods require
complete knowledge of the system to be controlled, it feels a little unnatural
to say that they are part of reinforcement learning. On the other hand, many
dynamic programming algorithms are incremental and iterative. Like learning
methods, they gradually reach the correct answer through successive approximations. As we show in the rest of this book, these similarities are far more
than superficial. The theories and solution methods for the cases of complete
and incomplete knowledge are so closely related that we feel they must be
considered together as part of the same subject matter.
Let us return now to the other major thread leading to the modern field of
reinforcement learning, that centered on the idea of trial-and-error learning.
We only touch on the major points of contact here, taking up this topic in more
detail in Chapter ??. According to American psychologist R. S. Woodworth
the idea of trial-and-error learning goes as far back as the 1850s to Alexander
Bain’s discussion of learning by “groping and experiment” and more explicitly
to the British ethologist and psychologist Conway Lloyd Morgan’s 1894 use of
the term to describe his observations of animal behavior (Woodworth, 1938).
Perhaps the first to succinctly express the essence of trial-and-error learning
as a principle of learning was Edward Thorndike:
Of several responses made to the same situation, those which are
accompanied or closely followed by satisfaction to the animal will,
other things being equal, be more firmly connected with the situation, so that, when it recurs, they will be more likely to recur;
those which are accompanied or closely followed by discomfort to
the animal will, other things being equal, have their connections
with that situation weakened, so that, when it recurs, they will be
less likely to occur. The greater the satisfaction or discomfort, the
greater the strengthening or weakening of the bond. (Thorndike,
1911, p. 244)

---

## [Sección 14] Chapter 1

-- 32 of 352 --

1.7. HISTORY OF REINFORCEMENT LEARNING 19
Thorndike called this the “Law of Effect” because it describes the effect of
reinforcing events on the tendency to select actions. Thorndike later modified
the law to better account for accumulating data on animal learning (such as
differences between the effects of reward and punishment), and the law in its
various forms has generated considerable controversy among learning theorists
(e.g., see Gallistel, 2005; Herrnstein, 1970; Kimble, 1961, 1967; Mazur, 1994).
Despite this, the Law of Effect—in one form or another—is widely regarded
as a basic principle underlying much behavior (e.g., Hilgard and Bower, 1975;
Dennett, 1978; Campbell, 1960; Cziko, 1995). It is the basis of the influential
learning theories of Clark Hull and experimental methods of B. F. Skinner
(e.g., Hull, 1943; Skinner, 1938).
The term “reinforcement” in the context of animal learning came into use
well after Thorndike’s expression of the Law of Effect, to the best of our knowledge first appearing in this context in the 1927 English translation of Pavlov’s
monograph on conditioned reflexes. Reinforcement is the strengthening of a
pattern of behavior as a result of an animal receiving a stimulus—a reinforcer—
in an appropriate temporal relationship with another stimulus or with a response. Some psychologists extended its meaning to include the process of
weakening in addition to strengthening, as well applying when the omission or
termination of an event changes behavior. Reinforcement produces changes in
behavior that persist after the reinforcer is withdrawn, so that a stimulus that
attracts an animal’s attention or that energizes its behavior without producing
lasting changes is not considered to be a reinforcer.
The idea of implementing trial-and-error learning in a computer appeared
among the earliest thoughts about the possibility of artificial intelligence. In a
1948 report, Alan Turing described a design for a “pleasure-pain system” that
worked along the lines of the Law of Effect:
When a configuration is reached for which the action is undetermined, a random choice for the missing data is made and the appropriate entry is made in the description, tentatively, and is applied.
When a pain stimulus occurs all tentative entries are cancelled,
and when a pleasure stimulus occurs they are all made permanent.
(Turing, 1948)
In 1952 Claude Shannon demonstrated a maze-running mouse named Theseus
that used trial and error to find its way to a goal location in a maze, with
the maze itself remembering the successful directions via magnets and relays
under its floor (Shannon, 1952). Other early computational investigations of
trial-and-error learning were those of Minsky and of Farley and Clark, both
in 1954. In his Ph.D. dissertation, Minsky discussed computational models of
reinforcement learning and described his construction of an analog machine

-- 33 of 352 --

20 CHAPTER 1. THE REINFORCEMENT LEARNING PROBLEM
composed of components he called SNARCs (Stochastic Neural-Analog Reinforcement Calculators). Farley and Clark described another neural-network
learning machine designed to learn by trial and error. In the 1960s the terms
“reinforcement” and “reinforcement learning” were used in the engineering literature for the first time (e.g., Waltz and Fu, 1965; Mendel, 1966; Fu, 1970;
Mendel and McClaren, 1970). Particularly influential was Minsky’s paper
“Steps Toward Artificial Intelligence” (Minsky, 1961), which discussed several
issues relevant to reinforcement learning, including what he called the credit
assignment problem: How do you distribute credit for success among the many
decisions that may have been involved in producing it? All of the methods we
discuss in this book are, in a sense, directed toward solving this problem.
The interests of Farley and Clark (1954; Clark and Farley, 1955) shifted
from trial-and-error learning to generalization and pattern recognition, that
is, from reinforcement learning to supervised learning. This began a pattern
of confusion about the relationship between these types of learning. Many
researchers seemed to believe that they were studying reinforcement learning
when they were actually studying supervised learning. For example, neural
network pioneers such as Rosenblatt (1962) and Widrow and Hoff (1960) were
clearly motivated by reinforcement learning—they used the language of rewards and punishments—but the systems they studied were supervised learning systems suitable for pattern recognition and perceptual learning. Even today, some researchers and textbooks minimize or blur the distinction between
these types of learning. For example, some neural-network textbooks have
used the term “trial-and-error” to describe networks that learn from training
examples. This is an understandable confusion because these networks use
error information to update connection weights, but this substantially misses
the essential selectional character of trial-and-error learning.
Partly as a result of these confusions, research into genuine trial-and-error
learning became rare in the the 1960s and 1970s. In the next few paragraphs
we discuss some of the exceptions and partial exceptions to this trend.
One of these was the work by a New Zealand researcher named John Andreae. Andreae (1963) developed a system called STeLLA that learned by trial
and error in interaction with its environment. This system included an internal
model of the world and, later, an “internal monologue” to deal with problems
of hidden state (Andreae, 1969a). Andreae’s later work (1977) placed more
emphasis on learning from a teacher, but still included trial and error. Unfortunately, his pioneering research was not well known, and did not greatly
impact subsequent reinforcement learning research.
More influential was the work of Donald Michie. In 1961 and 1963 he
described a simple trial-and-error learning system for learning how to play

---

## [Sección 15] Chapter 1

-- 34 of 352 --

1.7. HISTORY OF REINFORCEMENT LEARNING 21
tic-tac-toe (or naughts and crosses) called MENACE (for Matchbox Educable
Naughts and Crosses Engine). It consisted of a matchbox for each possible
game position, each matchbox containing a number of colored beads, a different color for each possible move from that position. By drawing a bead at
random from the matchbox corresponding to the current game position, one
could determine MENACE’s move. When a game was over, beads were added
to or removed from the boxes used during play to reinforce or punish MENACE’s decisions. Michie and Chambers (1968) described another tic-tac-toe
reinforcement learner called GLEE (Game Learning Expectimaxing Engine)
and a reinforcement learning controller called BOXES. They applied BOXES
to the task of learning to balance a pole hinged to a movable cart on the basis
of a failure signal occurring only when the pole fell or the cart reached the end
of a track. This task was adapted from the earlier work of Widrow and Smith
(1964), who used supervised learning methods, assuming instruction from a
teacher already able to balance the pole. Michie and Chambers’s version of
pole-balancing is one of the best early examples of a reinforcement learning
task under conditions of incomplete knowledge. It influenced much later work
in reinforcement learning, beginning with some of our own studies (Barto,
Sutton, and Anderson, 1983; Sutton, 1984). Michie has consistently emphasized the role of trial and error and learning as essential aspects of artificial
intelligence (Michie, 1974).
Widrow, Gupta, and Maitra (1973) modified the Least-Mean-Square (LMS)
algorithm of Widrow and Hoff (1960) to produce a reinforcement learning rule
that could learn from success and failure signals instead of from training examples. They called this form of learning “selective bootstrap adaptation” and
described it as “learning with a critic” instead of “learning with a teacher.”
They analyzed this rule and showed how it could learn to play blackjack. This
was an isolated foray into reinforcement learning by Widrow, whose contributions to supervised learning were much more influential. Our use of the term
“critic” is derived from Widrow, Gupta, and Maitra’s paper.
Research on learning automata had a more direct influence on the trialand-error thread leading to modern reinforcement learning research. These
are methods for solving a nonassociative, purely selectional learning problem
known as the n-armed bandit by analogy to a slot machine, or “one-armed
bandit,” except with n levers (see Chapter 2). Learning automata are simple,
low-memory machines for improving the probability of reward in these problems. Learning automata originated with work in the 1960s of the Russian
mathematician and physicist M. L. Tsetlin and colleagues (published posthumously in Tsetlin, 1973) and has been extensively developed since then within
engineering (see Narendra and Thathachar, 1974, 1989). These developments
included the study of stochastic learning automata, which are methods for up-

-- 35 of 352 --

22 CHAPTER 1. THE REINFORCEMENT LEARNING PROBLEM
dating action probabilities on the basis of reward signals. Stochastic learning
automata were foreshadowed by earlier work in psychology, beginning with
William Estes’ 1950 effort toward a statistical theory of learning (Estes, 1950)
and further developed by others, most famously by psychologist Robert Bush
and statistician Frederick Mosteller (Bush and Mosteller, 1955).
The statistical learning theories developed in psychology were adopted by
researchers in economics, leading to a thread of research in that field devoted to
reinforcement learning. This work began in 1973 with the application of Bush
and Mosteller’s learning theory to a collection of classical economic models
(Cross, 1973). One goal of this research was to study artificial agents that act
more like real people than do traditional idealized economic agents (Arthur,
1991). This approach expanded to the study of reinforcement learning in the
context of game theory. Although reinforcement learning in economics developed largely independently of the early work in artificial intelligence, reinforcement learning and game theory is a topic of current interest in both fields,
but one that is beyond the scope of this book. Camerer (2003) discusses the
reinforcement learning tradition in economics, and Now´e et al. (2012) provide
an overview of the subject from the point of view of multi-agent extensions
to the approach that we introduce in this book. Reinforcement learning and
game theory is a much different subject from reinforcement learning used in
programs to play tic-tac-toe, checkers, and other recreational games. See, for
example, Szita (2012) for an overview of this aspect of reinforcement learning
and games.
John Holland (1975) outlined a general theory of adaptive systems based
on selectional principles. His early work concerned trial and error primarily in
its nonassociative form, as in evolutionary methods and the n-armed bandit.
In 1986 he introduced classifier systems, true reinforcement learning systems
including association and value functions. A key component of Holland’s classifier systems was always a genetic algorithm, an evolutionary method whose
role was to evolve useful representations. Classifier systems have been extensively developed by many researchers to form a major branch of reinforcement
learning research (reviewed by Urbanowicz and Moore, 2009), but genetic
algorithms—which we do not consider to be reinforcement learning systems
by themselves—have received much more attention, as have other approaches
to evolutionary computation (e.g., Fogel, Owens and Walsh, 1966, and Koza,
1992).
The individual most responsible for reviving the trial-and-error thread to
reinforcement learning within artificial intelligence was Harry Klopf (1972,
1975, 1982). Klopf recognized that essential aspects of adaptive behavior
were being lost as learning researchers came to focus almost exclusively on
supervised learning. What was missing, according to Klopf, were the hedonic

---

## [Sección 16] Chapter 1

-- 36 of 352 --

1.7. HISTORY OF REINFORCEMENT LEARNING 23
aspects of behavior, the drive to achieve some result from the environment, to
control the environment toward desired ends and away from undesired ends.
This is the essential idea of trial-and-error learning. Klopf’s ideas were especially influential on the authors because our assessment of them (Barto and
Sutton, 1981a) led to our appreciation of the distinction between supervised
and reinforcement learning, and to our eventual focus on reinforcement learning. Much of the early work that we and colleagues accomplished was directed
toward showing that reinforcement learning and supervised learning were indeed different (Barto, Sutton, and Brouwer, 1981; Barto and Sutton, 1981b;
Barto and Anandan, 1985). Other studies showed how reinforcement learning
could address important problems in neural network learning, in particular,
how it could produce learning algorithms for multilayer networks (Barto, Anderson, and Sutton, 1982; Barto and Anderson, 1985; Barto and Anandan,
1985; Barto, 1985, 1986; Barto and Jordan, 1987). We say more about the
reinforcement learning and neural networks in Chapter Y.
We turn now to the third thread to the history of reinforcement learning, that concerning temporal-difference learning. Temporal-difference learning methods are distinctive in being driven by the difference between temporally successive estimates of the same quantity—for example, of the probability
of winning in the tic-tac-toe example. This thread is smaller and less distinct
than the other two, but it has played a particularly important role in the field,
in part because temporal-difference methods seem to be new and unique to
reinforcement learning.
The origins of temporal-difference learning are in part in animal learning
psychology, in particular, in the notion of secondary reinforcers. A secondary
reinforcer is a stimulus that has been paired with a primary reinforcer such as
food or pain and, as a result, has come to take on similar reinforcing properties. Minsky (1954) may have been the first to realize that this psychological
principle could be important for artificial learning systems. Arthur Samuel
(1959) was the first to propose and implement a learning method that included
temporal-difference ideas, as part of his celebrated checkers-playing program.
Samuel made no reference to Minsky’s work or to possible connections
to animal learning. His inspiration apparently came from Claude Shannon’s
(1950) suggestion that a computer could be programmed to use an evaluation function to play chess, and that it might be able to improve its play by
modifying this function on-line. (It is possible that these ideas of Shannon’s
also influenced Bellman, but we know of no evidence for this.) Minsky (1961)
extensively discussed Samuel’s work in his “Steps” paper, suggesting the connection to secondary reinforcement theories, both natural and artificial.
As we have discussed, in the decade following the work of Minsky and

-- 37 of 352 --

24 CHAPTER 1. THE REINFORCEMENT LEARNING PROBLEM
Samuel, little computational work was done on trial-and-error learning, and
apparently no computational work at all was done on temporal-difference
learning. In 1972, Klopf brought trial-and-error learning together with an
important component of temporal-difference learning. Klopf was interested
in principles that would scale to learning in large systems, and thus was intrigued by notions of local reinforcement, whereby subcomponents of an overall
learning system could reinforce one another. He developed the idea of “generalized reinforcement,” whereby every component (nominally, every neuron)
views all of its inputs in reinforcement terms: excitatory inputs as rewards
and inhibitory inputs as punishments. This is not the same idea as what we
now know as temporal-difference learning, and in retrospect it is farther from
it than was Samuel’s work. On the other hand, Klopf linked the idea with
trial-and-error learning and related it to the massive empirical database of
animal learning psychology.
Sutton (1978a, 1978b, 1978c) developed Klopf’s ideas further, particularly the links to animal learning theories, describing learning rules driven
by changes in temporally successive predictions. He and Barto refined these
ideas and developed a psychological model of classical conditioning based on
temporal-difference learning (Sutton and Barto, 1981a; Barto and Sutton,
1982). There followed several other influential psychological models of classical
conditioning based on temporal-difference learning (e.g., Klopf, 1988; Moore
et al., 1986; Sutton and Barto, 1987, 1990). Some neuroscience models developed at this time are well interpreted in terms of temporal-difference learning
(Hawkins and Kandel, 1984; Byrne, Gingrich, and Baxter, 1990; Gelperin,
Hopfield, and Tank, 1985; Tesauro, 1986; Friston et al., 1994), although in
most cases there was no historical connection.
Our early work on temporal-difference learning was strongly influenced
by animal learning theories and by Klopf’s work. Relationships to Minsky’s
“Steps” paper and to Samuel’s checkers players appear to have been recognized
only afterward. By 1981, however, we were fully aware of all the prior work
mentioned above as part of the temporal-difference and trial-and-error threads.
At this time we developed a method for using temporal-difference learning in
trial-and-error learning, known as the actor–critic architecture, and applied
this method to Michie and Chambers’s pole-balancing problem (Barto, Sutton,
and Anderson, 1983). This method was extensively studied in Sutton’s (1984)
Ph.D. dissertation and extended to use backpropagation neural networks in
Anderson’s (1986) Ph.D. dissertation. Around this time, Holland (1986) incorporated temporal-difference ideas explicitly into his classifier systems. A key
step was taken by Sutton in 1988 by separating temporal-difference learning
from control, treating it as a general prediction method. That paper also introduced the TD(λ) algorithm and proved some of its convergence properties.

---

## [Sección 17] Chapter 1

-- 38 of 352 --

1.8. BIBLIOGRAPHICAL REMARKS 25
As we were finalizing our work on the actor–critic architecture in 1981, we
discovered a paper by Ian Witten (1977) that contains the earliest known publication of a temporal-difference learning rule. He proposed the method that
we now call tabular TD(0) for use as part of an adaptive controller for solving
MDPs. Witten’s work was a descendant of Andreae’s early experiments with
STeLLA and other trial-and-error learning systems. Thus, Witten’s 1977 paper spanned both major threads of reinforcement learning research—trial-anderror learning and optimal control—while making a distinct early contribution
to temporal-difference learning.
The temporal-difference and optimal control threads were fully brought
together in 1989 with Chris Watkins’s development of Q-learning. This work
extended and integrated prior work in all three threads of reinforcement learning research. Paul Werbos (1987) contributed to this integration by arguing
for the convergence of trial-and-error learning and dynamic programming since
1977. By the time of Watkins’s work there had been tremendous growth in
reinforcement learning research, primarily in the machine learning subfield
of artificial intelligence, but also in neural networks and artificial intelligence
more broadly. In 1992, the remarkable success of Gerry Tesauro’s backgammon
playing program, TD-Gammon, brought additional attention to the field.
In the time since publication of the first edition of this book, a flourishing
subfield of neuroscience developed that focuses on the relationship between
reinforcement learning algorithms and reinforcement learning in the nervous
system. Most responsible for this is an uncanny similarity between the behavior of temporal-difference algorithms and the activity of dopamine producing
neurons in the brain, as pointed out by a number of researchers (Friston et
al., 1994; Barto, 1995a; Houk, Adams, and Barto, 1995; Montague, Dayan,
and Sejnowski, 1996; and Schultz, Dayan, and Montague,1997). Chapter Y
provides is an introduction to this exciting aspect of reinforcement leaning.
Other important contributions made in the recent history of reinforcement
learning are too numerous to mention in this brief account; we cite many these
at the end of the individual chapters in which they arise.
1.8 Bibliographical Remarks
For additional general coverage of reinforcement learning, we refer the reader to
the books by Szepesv´ari (2010), Bertsekas and Tsitsiklis (1996), and Kaelbling
(1993a). Books that take a control or operation research perspective are those
of Si et al. (2004), Powell (2011), and Lewis and Liu (2012). Two special
issues of the journal Machine Learning focus on reinforcement learning: Sutton

-- 39 of 352 --

26 CHAPTER 1. THE REINFORCEMENT LEARNING PROBLEM
(1992) and Kaelbling (1996). Useful surveys are provided by Barto (1995b);
Kaelbling, Littman, and Moore (1996); and Keerthi and Ravindran (1997).
The volume edited by Weiring and van Otterlo (2012) provides an excellent
overview of recent developments.
The example of Phil’s breakfast in this chapter was inspired by Agre (1988).
We direct the reader to Chapter 6 for references to the kind of temporaldifference method we used in the tic-tac-toe example.
Exercises
Exercise 1.1: Self-Play Suppose, instead of playing against a random
opponent, the reinforcement learning algorithm described above played against
itself. What do you think would happen in this case? Would it learn a different
way of playing?
Exercise 1.2: Symmetries Many tic-tac-toe positions appear different but
are really the same because of symmetries. How might we amend the reinforcement learning algorithm described above to take advantage of this? In what
ways would this improve it? Now think again. Suppose the opponent did not
take advantage of symmetries. In that case, should we? Is it true, then, that
symmetrically equivalent positions should necessarily have the same value?
Exercise 1.3: Greedy Play Suppose the reinforcement learning player was
greedy, that is, it always played the move that brought it to the position that
it rated the best. Would it learn to play better, or worse, than a nongreedy
player? What problems might occur?
Exercise 1.4: Learning from Exploration Suppose learning updates occurred
after all moves, including exploratory moves. If the step-size parameter is
appropriately reduced over time, then the state values would converge to a
set of probabilities. What are the two sets of probabilities computed when we
do, and when we do not, learn from exploratory moves? Assuming that we
do continue to make exploratory moves, which set of probabilities might be
better to learn? Which would result in more wins?
Exercise 1.5: Other Improvements Can you think of other ways to improve
the reinforcement learning player? Can you think of any better way to solve
the tic-tac-toe problem as posed?

---

## [Sección 18] Chapter 1

-- 40 of 352 --

---

## [Sección 19] Part I

Tabular Solution Methods
-- 41 of 352 --

-- 42 of 352 --
In this part of the book we describe almost all the core ideas of reinforcement learning algorithms in their simplest forms, that in which the state and
action spaces are small enough for the approximate action-value function to be
represented as an array, or table. In this case, the methods can often find exact
solutions, that is, they can often find exactly the optimal value function and
the optimal policy. This contrasts with the approximate methods described in
the next part of the book, which only find approximate solutions, but which
in return can be applied effectively to much larger problems.
The first chapter of this part of the book describes solution methods for
the special of the reinforcement learning problem in which there is only a
single state, called bandit problems. The second chapter describes the general
problem formulation that we treat throughout the rest of the book—finite
markov decision processes—and its main ideas including Bellman equations
and value functions.
The next three chapters describe three fundamental classes of methods
for solving finite Markov decision problems: dynamic programming, Monte
Carlo methods, and temporal-difference learning. Each class of methods has
its strengths and weaknesses. Dynamic programming methods are well developed mathematically, but require a complete and accurate model of the
environment. Monte Carlo methods don’t require a model and are conceptually simple, but are not suited for step-by-step incremental computation.
Finally, temporal-difference methods require no model and are fully incremental, but are more complex to analyze. The methods also differ in several ways
with respect to their efficiency and speed of convergence.
The remaining two chapters describe how these three classes of methods
can be combined to obtain the best features of each of them. In one chapter we
describe how the strengths of Monte Carlo methods can be combined with the
strengths of temporal-difference methods via the use of eligibility traces. In
the final chapter of this part of the book we show these two learning methods
can be combined with model learning and planning methods (such as dynamic
programming) for a complete and unified solution to the tabular reinforcement
learning problem.

-- 43 of 352 --
-- 44 of 352 --

---

## [Sección 20] Chapter 2

Multi-arm Bandits
The most important feature distinguishing reinforcement learning from other
types of learning is that it uses training information that evaluates the actions
taken rather than instructs by giving correct actions. This is what creates
the need for active exploration, for an explicit trial-and-error search for good
behavior. Purely evaluative feedback indicates how good the action taken is,
but not whether it is the best or the worst action possible. Evaluative feedback is the basis of methods for function optimization, including evolutionary
methods. Purely instructive feedback, on the other hand, indicates the correct action to take, independently of the action actually taken. This kind
of feedback is the basis of supervised learning, which includes large parts of
pattern classification, artificial neural networks, and system identification. In
their pure forms, these two kinds of feedback are quite distinct: evaluative
feedback depends entirely on the action taken, whereas instructive feedback is
independent of the action taken. There are also interesting intermediate cases
in which evaluation and instruction blend together.
In this chapter we study the evaluative aspect of reinforcement learning in
a simplified setting, one that does not involve learning to act in more than
one situation. This nonassociative setting is the one in which most prior
work involving evaluative feedback has been done, and it avoids much of the
complexity of the full reinforcement learning problem. Studying this case will
enable us to see most clearly how evaluative feedback differs from, and yet can
be combined with, instructive feedback.
The particular nonassociative, evaluative feedback problem that we explore
is a simple version of the n-armed bandit problem. We use this problem to
introduce a number of basic learning methods which we extend in later chapters
to apply to the full reinforcement learning problem. At the end of this chapter,
we take a step closer to the full reinforcement learning problem by discussing
-- 45 of 352 --

32 CHAPTER 2. MULTI-ARM BANDITS
what happens when the bandit problem becomes associative, that is, when
actions are taken in more than one situation.
2.1 An n-Armed Bandit Problem
Consider the following learning problem. You are faced repeatedly with a
choice among n different options, or actions. After each choice you receive a
numerical reward chosen from a stationary probability distribution that depends on the action you selected. Your objective is to maximize the expected
total reward over some time period, for example, over 1000 action selections,
or time steps.
This is the original form of the n-armed bandit problem, so named by analogy to a slot machine, or “one-armed bandit,” except that it has n levers
instead of one. Each action selection is like a play of one of the slot machine’s
levers, and the rewards are the payoffs for hitting the jackpot. Through repeated action selections you are to maximize your winnings by concentrating
your actions on the best levers. Another analogy is that of a doctor choosing
between experimental treatments for a series of seriously ill patients. Each
action selection is a treatment selection, and each reward is the survival or
well-being of the patient. Today the term “n-armed bandit problem” is sometimes used for a generalization of the problem described above, but in this
book we use it to refer just to this simple case.
In our n-armed bandit problem, each action has an expected or mean
reward given that that action is selected; let us call this the value of that
action. If you knew the value of each action, then it would be trivial to solve
the n-armed bandit problem: you would always select the action with highest
value. We assume that you do not know the action values with certainty,
although you may have estimates.
If you maintain estimates of the action values, then at any time step there
is at least one action whose estimated value is greatest. We call this a greedy
action. If you select a greedy action, we say that you are exploiting your
current knowledge of the values of the actions. If instead you select one of
the nongreedy actions, then we say you are exploring, because this enables
you to improve your estimate of the nongreedy action’s value. Exploitation is
the right thing to do to maximize the expected reward on the one step, but
exploration may produce the greater total reward in the long run. For example,
suppose the greedy action’s value is known with certainty, while several other
actions are estimated to be nearly as good but with substantial uncertainty.
The uncertainty is such that at least one of these other actions probably is

---

## [Sección 21] Chapter 2

-- 46 of 352 --

2.2. ACTION-VALUE METHODS 33
actually better than the greedy action, but you don’t know which one. If
you have many time steps ahead on which to make action selections, then it
may be better to explore the nongreedy actions and discover which of them
are better than the greedy action. Reward is lower in the short run, during
exploration, but higher in the long run because after you have discovered the
better actions, you can exploit them many times. Because it is not possible
both to explore and to exploit with any single action selection, one often refers
to the “conflict” between exploration and exploitation.
In any specific case, whether it is better to explore or exploit depends in a
complex way on the precise values of the estimates, uncertainties, and the number of remaining steps. There are many sophisticated methods for balancing
exploration and exploitation for particular mathematical formulations of the
n-armed bandit and related problems. However, most of these methods make
strong assumptions about stationarity and prior knowledge that are either
violated or impossible to verify in applications and in the full reinforcement
learning problem that we consider in subsequent chapters. The guarantees of
optimality or bounded loss for these methods are of little comfort when the
assumptions of their theory do not apply.
In this book we do not worry about balancing exploration and exploitation
in a sophisticated way; we worry only about balancing them at all. In this
chapter we present several simple balancing methods for the n-armed bandit
problem and show that they work much better than methods that always
exploit. The need to balance exploration and exploitation is a distinctive
challenge that arises in reinforcement learning; the simplicity of the n-armed
bandit problem enables us to show this in a particularly clear form.
2.2 Action-Value Methods
We begin by looking more closely at some simple methods for estimating the
values of actions and for using the estimates to make action selection decisions.
In this chapter, we denote the true (actual) value of action a as q(a), and the
estimated value on the tth time step as Qt(a). Recall that the true value of an
action is the mean reward received when that action is selected. One natural
way to estimate this is by averaging the rewards actually received when the
action was selected. In other words, if by the tth time step action a has been
chosen Nt(a) times prior to t, yielding rewards R1, R2, . . . , RNt(a), then its value
is estimated to be
Qt(a) = R1 + R2 + · · · + RNt(a)
Nt(a) . (2.1)

-- 47 of 352 --

34 CHAPTER 2. MULTI-ARM BANDITS
If Nt(a) = 0, then we define Qt(a) instead as some default value, such as
Q1(a) = 0. As Nt(a) → ∞, by the law of large numbers, Qt(a) converges
to q(a). We call this the sample-average method for estimating action values
because each estimate is a simple average of the sample of relevant rewards.
Of course this is just one way to estimate action values, and not necessarily
the best one. Nevertheless, for now let us stay with this simple estimation
method and turn to the question of how the estimates might be used to select
actions.
The simplest action selection rule is to select the action (or one of the
actions) with highest estimated action value, that is, to select at step t one
of the greedy actions, A∗
t , for which Qt(A∗
t ) = maxa Qt(a). This greedy action
selection method can be written as
At = argmax
a
Qt(a), (2.2)
where argmaxa denotes the value of a at which the expression that follows
is maximized (with ties broken arbitrarily). Greedy action selection always
exploits current knowledge to maximize immediate reward; it spends no time
at all sampling apparently inferior actions to see if they might really be better. A simple alternative is to behave greedily most of the time, but every
once in a while, say with small probability ε, instead to select randomly from
amongst all the actions with equal probability independently of the actionvalue estimates. We call methods using this near-greedy action selection rule
ε-greedy methods. An advantage of these methods is that, in the limit as the
number of plays increases, every action will be sampled an infinite number
of times, guaranteeing that Nt(a) → ∞ for all a, and thus ensuring that all
the Qt(a) converge to q(a). This of course implies that the probability of selecting the optimal action converges to greater than 1 − ε, that is, to near
certainty. These are just asymptotic guarantees, however, and say little about
the practical effectiveness of the methods.
To roughly assess the relative effectiveness of the greedy and ε-greedy methods, we compared them numerically on a suite of test problems. This was a
set of 2000 randomly generated n-armed bandit tasks with n = 10. For each
bandit, the action values, q(a), a = 1, . . . , 10, were selected according to a
normal (Gaussian) distribution with mean 0 and variance 1. On tth time step
with a given bandit, the actual reward Rt was the q(At) for the bandit (where
At was the action selected) plus a normally distributed noise term that was
mean 0 and variance 1. Averaging over bandits, we can plot the performance
and behavior of various methods as they improve with experience over 1000
steps, as in Figure 2.1. We call this suite of test tasks the 10-armed testbed.
Figure 2.1 compares a greedy method with two ε-greedy methods (ε = 0.01
and ε = 0.1), as described above, on the 10-armed testbed. Both methods

---

## [Sección 22] Chapter 2

-- 48 of 352 --

2.2. ACTION-VALUE METHODS 35
= 0 (greedy)
𝜀 = 0 (greedy)
0.5
1.5
Average
reward
0 250 500 750 1000
Steps
0%
20%
40%
60%
80%
100%
%
Optimal
action
0 250 500 750 1000
Steps
= 0.01
= 0.1 𝜀
𝜀
𝜀
= 0.1 𝜀
= 0.01 𝜀
Figure 2.1: Average performance of ε-greedy action-value methods on the
10-armed testbed. These data are averages over 2000 tasks. All methods
used sample averages as their action-value estimates. The detailed structure
at the beginning of these curves depends on how actions are selected when
multiple actions have the same maximal action value. Here such ties were
broken randomly. An alternative that has a similar effect is to add a very
small amount of randomness to each of the initial action values, so that ties
effectively never happen.

-- 49 of 352 --

36 CHAPTER 2. MULTI-ARM BANDITS
formed their action-value estimates using the sample-average technique. The
upper graph shows the increase in expected reward with experience. The
greedy method improved slightly faster than the other methods at the very
beginning, but then leveled off at a lower level. It achieved a reward per step of
only about 1, compared with the best possible of about 1.55 on this testbed.
The greedy method performs significantly worse in the long run because it
often gets stuck performing suboptimal actions. The lower graph shows that
the greedy method found the optimal action in only approximately one-third of
the tasks. In the other two-thirds, its initial samples of the optimal action were
disappointing, and it never returned to it. The ε-greedy methods eventually
perform better because they continue to explore, and to improve their chances
of recognizing the optimal action. The ε = 0.1 method explores more, and
usually finds the optimal action earlier, but never selects it more than 91%
of the time. The ε = 0.01 method improves more slowly, but eventually
performs better than the ε = 0.1 method on both performance measures. It
is also possible to reduce ε over time to try to get the best of both high and
low values.
The advantage of ε-greedy over greedy methods depends on the task. For
example, suppose the reward variance had been larger, say 10 instead of 1.
With noisier rewards it takes more exploration to find the optimal action, and
ε-greedy methods should fare even better relative to the greedy method. On
the other hand, if the reward variances were zero, then the greedy method
would know the true value of each action after trying it once. In this case the
greedy method might actually perform best because it would soon find the
optimal action and then never explore. But even in the deterministic case,
there is a large advantage to exploring if we weaken some of the other assumptions. For example, suppose the bandit task were nonstationary, that is,
that the true values of the actions changed over time. In this case exploration
is needed even in the deterministic case to make sure one of the nongreedy
actions has not changed to become better than the greedy one. As we will see
in the next few chapters, effective nonstationarity is the case most commonly
encountered in reinforcement learning. Even if the underlying task is stationary and deterministic, the learner faces a set of banditlike decision tasks each
of which changes over time due to the learning process itself. Reinforcement
learning requires a balance between exploration and exploitation.
2.3 Incremental Implementation
The action-value methods we have discussed so far all estimate action values
as sample averages of observed rewards. The obvious implementation is to

-- 50 of 352 --

2.3. INCREMENTAL IMPLEMENTATION 37
maintain, for each action a, a record of all the rewards that have followed the
selection of that action. Then, when the estimate of the value of action a is
needed at time t, it can be computed according to (2.1), which we repeat here:
Qt(a) = R1 + R2 + · · · + RNt(a)
Nt(a) ,
where here R1, . . . , RNt(a) are all the rewards received following all selections of
action a prior to play t. A problem with this straightforward implementation
is that its memory and computational requirements grow over time without
bound. That is, each additional reward following a selection of action a requires more memory to store it and results in more computation being required
to determine Qt(a).
As you might suspect, this is not really necessary. It is easy to devise incremental update formulas for computing averages with small, constant computation required to process each new reward. For some action, let Qk denote
the estimate for its kth reward, that is, the average of its first k − 1 rewards.
Given this average and a kth reward for the action, Rk, then the average of
all k rewards can be computed by
Qk+1 = 1
k
k ∑
i=1
Ri
= 1
k
(
Rk +
k−1 ∑
i=1
Ri
)
= 1
k
(
Rk + (k − 1)Qk + Qk − Qk
)
= 1
k
(
Rk + kQk − Qk
)
= Qk + 1
k
[
Rk − Qk
]
, (2.3)
which holds even for k = 1, obtaining Q2 = R1 for arbitrary Q1. This implementation requires memory only for Qk and k, and only the small computation
(2.3) for each new reward.
The update rule (2.3) is of a form that occurs frequently throughout this
book. The general form is
NewEstimate ← OldEstimate + StepSize
[
Target − OldEstimate
]
. (2.4)
The expression [Target − OldEstimate] is an error in the estimate. It is
reduced by taking a step toward the “Target.” The target is presumed to

---

## [Sección 23] Chapter 2

-- 51 of 352 --

38 CHAPTER 2. MULTI-ARM BANDITS
indicate a desirable direction in which to move, though it may be noisy. In
the case above, for example, the target is the kth reward.
Note that the step-size parameter (StepSize) used in the incremental
method described above changes from time step to time step. In processing the kth reward for action a, that method uses a step-size parameter of
k . In this book we denote the step-size parameter by the symbol α or, more
generally, by αt(a). We sometimes use the informal shorthand α = 1
k to refer
to this case, leaving the dependence of k on the action implicit.
2.4 Tracking a Nonstationary Problem
The averaging methods discussed so far are appropriate in a stationary environment, but not if the bandit is changing over time. As noted earlier, we
often encounter reinforcement learning problems that are effectively nonstationary. In such cases it makes sense to weight recent rewards more heavily
than long-past ones. One of the most popular ways of doing this is to use a
constant step-size parameter. For example, the incremental update rule (2.3)
for updating an average Qk of the k − 1 past rewards is modified to be
Qk+1 = Qk + α
[
Rk − Qk
]
, (2.5)
where the step-size parameter α ∈ (0, 1]1 is constant. This results in Qk+1
being a weighted average of past rewards and the initial estimate Q1:
Qk+1 = Qk + α
[
Rk − Qk
]
= αRk + (1 − α)Qk
= αRk + (1 − α) [αRk−1 + (1 − α)Qk−1]
= αRk + (1 − α)αRk−1 + (1 − α)2Qk−1
= αRk + (1 − α)αRk−1 + (1 − α)2αRk−2 +
· · · + (1 − α)k−1αR1 + (1 − α)kQ1
= (1 − α)kQ1 +
k ∑
i=1
α(1 − α)k−iRi. (2.6)
We call this a weighted average because the sum of the weights is (1 − α)k +∑k
i=1 α(1 − α)k−i = 1, as you can check yourself. Note that the weight, α(1 −
α)k−i, given to the reward Ri depends on how many rewards ago, k − i, it was
1The notation (a, b] as a set denotes the real interval between a and b including b but
not including a. Thus, here we are saying that 0 < α ≤ 1.

-- 52 of 352 --

2.5. OPTIMISTIC INITIAL VALUES 39
observed. The quantity 1 − α is less than 1, and thus the weight given to Ri
decreases as the number of intervening rewards increases. In fact, the weight
decays exponentially according to the exponent on 1 − α. (If 1 − α = 0, then
all the weight goes on the very last reward, Rk, because of the convention that
00 = 1.) Accordingly, this is sometimes called an exponential, recency-weighted
average.
Sometimes it is convenient to vary the step-size parameter from step to
step. Let αk(a) denote the step-size parameter used to process the reward
received after the kth selection of action a. As we have noted, the choice
αk(a) = 1
k results in the sample-average method, which is guaranteed to converge to the true action values by the law of large numbers. But of course
convergence is not guaranteed for all choices of the sequence {αk(a)}. A wellknown result in stochastic approximation theory gives us the conditions required to assure convergence with probability 1:
∞ ∑
k=1
αk(a) = ∞ and
∞ ∑
k=1
α2
k(a) < ∞. (2.7)
The first condition is required to guarantee that the steps are large enough to
eventually overcome any initial conditions or random fluctuations. The second
condition guarantees that eventually the steps become small enough to assure
convergence.
Note that both convergence conditions are met for the sample-average case,
αk(a) = 1
k , but not for the case of constant step-size parameter, αk(a) = α. In
the latter case, the second condition is not met, indicating that the estimates
never completely converge but continue to vary in response to the most recently received rewards. As we mentioned above, this is actually desirable in
a nonstationary environment, and problems that are effectively nonstationary
are the norm in reinforcement learning. In addition, sequences of step-size
parameters that meet the conditions (2.7) often converge very slowly or need
considerable tuning in order to obtain a satisfactory convergence rate. Although sequences of step-size parameters that meet these convergence conditions are often used in theoretical work, they are seldom used in applications
and empirical research.
2.5 Optimistic Initial Values
All the methods we have discussed so far are dependent to some extent on
the initial action-value estimates, Q1(a). In the language of statistics, these
methods are biased by their initial estimates. For the sample-average methods,

---

## [Sección 24] Chapter 2

-- 53 of 352 --

40 CHAPTER 2. MULTI-ARM BANDITS
0%
20%
40%
60%
80%
100%
%
Optimal
action
0 200 400 600 800 1000
Plays
optimistic, greedy
Q0 = 5, = 0
realistic, !-greedy
Q0 = 0, = 0.1 1
Steps
𝜀
𝜀
Figure 2.2: The effect of optimistic initial action-value estimates on the 10armed testbed. Both methods used a constant step-size parameter, α = 0.1.
the bias disappears once all actions have been selected at least once, but for
methods with constant α, the bias is permanent, though decreasing over time
as given by (2.6). In practice, this kind of bias is usually not a problem, and
can sometimes be very helpful. The downside is that the initial estimates
become, in effect, a set of parameters that must be picked by the user, if only
to set them all to zero. The upside is that they provide an easy way to supply
some prior knowledge about what level of rewards can be expected.
Initial action values can also be used as a simple way of encouraging exploration. Suppose that instead of setting the initial action values to zero, as
we did in the 10-armed testbed, we set them all to +5. Recall that the q(a)
in this problem are selected from a normal distribution with mean 0 and variance 1. An initial estimate of +5 is thus wildly optimistic. But this optimism
encourages action-value methods to explore. Whichever actions are initially
selected, the reward is less than the starting estimates; the learner switches
to other actions, being “disappointed” with the rewards it is receiving. The
result is that all actions are tried several times before the value estimates converge. The system does a fair amount of exploration even if greedy actions are
selected all the time.
Figure 2.2 shows the performance on the 10-armed bandit testbed of a
greedy method using Q1(a) = +5, for all a. For comparison, also shown is an
ε-greedy method with Q1(a) = 0. Initially, the optimistic method performs
worse because it explores more, but eventually it performs better because its
exploration decreases with time. We call this technique for encouraging exploration optimistic initial values. We regard it as a simple trick that can be
quite effective on stationary problems, but it is far from being a generally useful approach to encouraging exploration. For example, it is not well suited to

-- 54 of 352 --

2.6. UPPER-CONFIDENCE-BOUND ACTION SELECTION 41
nonstationary problems because its drive for exploration is inherently temporary. If the task changes, creating a renewed need for exploration, this method
cannot help. Indeed, any method that focuses on the initial state in any special
way is unlikely to help with the general nonstationary case. The beginning
of time occurs only once, and thus we should not focus on it too much. This
criticism applies as well to the sample-average methods, which also treat the
beginning of time as a special event, averaging all subsequent rewards with
equal weights. Nevertheless, all of these methods are very simple, and one of
them or some simple combination of them is often adequate in practice. In the
rest of this book we make frequent use of several of these simple exploration
techniques.
2.6 Upper-Confidence-Bound Action Selection
Exploration is needed because the estimates of the action values are uncertain.
The greedy actions are those that look best at present, but some of the other
actions may actually be better. ε-greedy action selection forces the non-greedy
actions to be tried, but indiscriminately, with no preference for those that are
nearly greedy or particularly uncertain. It would be better to select among
the non-greedy actions according to their potential for actually being optimal,
taking into account both how close their estimates are to being maximal and
the uncertainties in those estimates. One effective way of doing this is to select
actions as
At = argmax
a
[
Qt(a) + c
√
ln t
Nt(a)
]
, (2.8)
where ln t denotes the natural logarithm of t (the number that e ≈ 2.71828
would have to be raised to in order to equal t), and the number c > 0 controls
the degree of exploration. If Nt(a) = 0, then a is considered to be a maximizing
action.
The idea of this upper confidence bound (UCB) action selection is that the
square-root term is a measure of the uncertainty or variance in the estimate
of a’s value. The quantity being max’ed over is thus a sort of upper bound
on the possible true value of action a, with the c parameter determining the
confidence level. Each time a is selected the uncertainty is presumably reduced;
Nt(a) is incremented and, as it appears in the denominator of the uncertainty
term, the term is decreased. On the other hand, each time an action other a is
selected t is increased; as it appears in the numerator the uncertainty estimate
is increased. The use of the natural logarithm means that the increase gets
smaller over time, but is unbounded; all actions will eventually be selected, but

---

## [Sección 25] Chapter 2

-- 55 of 352 --

42 CHAPTER 2. MULTI-ARM BANDITS
𝜀-greedy 𝜀 = 0.1
UCB c = 2
Average
reward
Steps
Figure 2.3: Average performance of UCB action selection on the 10-armed
testbed. As shown, UCB generally performs better that ε-greedy action selection, except in the first n plays, when it selects randomly among the as-yetunplayed actions. UCB with c = 1 would perform even better but would not
show the prominent spike in performance on the 11th play. Can you think of
an explanation of this spike?
as time goes by it will be a longer wait, and thus a lower selection frequency,
for actions with a lower value estimate or that have already been selected more
times.
Results with UCB on the 10-armed testbed are shown in Figure 2.3. UCB
will often perform well, as shown here, but is more difficult than ε-greedy
to extend beyond bandits to the more general reinforcement learning settings
considered in the rest of this book. One difficulty is in dealing with nonstationary problems; something more complex than the methods presented in
Section 2.4 would be needed. Another difficulty is dealing with large state
spaces, particularly function approximation as developed in Part III of this
book. In these more advanced settings there is currently no known practical
way of utilizing the idea of UCB action selection.
2.7 Gradient Bandits
So far in this chapter we have considered methods that estimate action values
and use those estimates to select actions. This is often a good approach,
but it is not the only one possible. In this section we consider learning a
numerical preference Ht(a) for each action a. The larger the preference, the

-- 56 of 352 --

2.7. GRADIENT BANDITS 43
more often that action is taken, but the preference has no interpretation in
terms of reward. Only the relative preference of one action over another is
important; if we add 1000 to all the preferences there is no affect on the action
probabilities, which are determined according to a soft-max distribution (i.e.,
Gibbs or Boltzmann distribution) as follows:
Pr{At = a} = eHt(a))
∑n
b=1 eHt(b) = πt(a), (2.9)
where here we have also introduced a useful new notation πt(a) for the probability of taking action a at time t. Initially all preferences are the same (e.g.,
H1(a) = 0, ∀a) so that all actions have an equal probability of being selected.
There is a natural learning algorithm for this setting based on the idea
of stochastic gradient ascent. On each step, after selecting the action At and
receiving the reward Rt, the preferences are updated by:
Ht+1(At) = Ht(At) + α(Rt − ¯ Rt
)(1 − πt(At)), and
Ht+1(a) = Ht(a) − α(Rt − ¯ Rt
)πt(a), ∀a 6 = At, (2.10)
where α > 0 is a step-size parameter, and ¯ Rt ∈ R is the average of all the
rewards up through and including time t, which can be computed incrementally
as described in Section 2.3 (or Section 2.4 if the problem is nonstationary).
The ¯ Rt term serves as a baseline with which the reward is compared. If the
reward is higher than the baseline, then the probability of taking At in the
future is increased, and if the reward is below baseline, then probability is
decreased. The non-selected actions move in the opposite direction.
Figure 2.4 shows results with the gradient-bandit algorithm on a variant
of the 10-armed testbed in which the true expected rewards were selected
according to a normal distribution with a mean of +4 instead of zero (and with
unit variance as before). This shifting up of all the rewards has absolutely no
affect on the gradient-bandit algorithm because of the reward baseline term,
which instantaneously adapts to the new level. But if the baseline were omitted
(that is, if ¯ Rt was taken to be constant zero in (2.10)), then performance would
be significantly degraded, as shown in the figure.
One can gain a deeper insight into this algorithm by understanding it as
a stochastic approximation to gradient ascent. In exact gradient ascent, each
preference Ht(a) would be incrementing proportional to the increment’s effect
on performance:
Ht+1(a) = Ht(a) + α ∂ E [Rt]
∂Ht(a) , (2.11)
where the measure of performance here is the expected reward:
E[Rt] = ∑
b
πt(b)q(b).

---

## [Sección 26] Chapter 2

-- 57 of 352 --

44 CHAPTER 2. MULTI-ARM BANDITS
%
Optimal
action
Steps
α = 0.1
100%
80%
60%
40%
20%
0%
α = 0.4
α = 0.1
α = 0.4
without baseline
with baseline
0 250 500 750 1000
Figure 2.4: Average performance of the gradient-bandit algorithm with and
without a reward baseline on the 10-armed testbed with E[q(a)] = 4.
Of course, it is not possible to implement gradient ascent exactly in our case
because by assumption we do not know the q(b), but in fact the updates of our
algorithm (2.10) are equal to (2.11) in expected value, making the algorithm
an instance of stochastic gradient ascent.
The calculations showing this require only beginning calculus, but take
several steps. If you are mathematically inclined, then you will enjoy the rest
of this section in which we go through these steps. First we take a closer look
at the exact performance gradient:
∂ E[Rt]
∂Ht(a) = ∂
∂Ht(a)
[∑
b
πt(b)q(b)
]
= ∑
b
q(b) ∂ πt(b)
∂Ht(a)
= ∑
b
(q(b) − Xt
) ∂ πt(b)
∂Ht(a),
where Xt can be any scalar that does not depend on b. We can include it here
because the gradient sums to zero over the all the actions, ∑
b
∂ πt(b)
∂Ht(a) = 0. As
Ht(a) is changed, some actions’ probabilities go up and some down, but the
sum of the changes must be zero because the sum of the probabilities must

-- 58 of 352 --

2.7. GRADIENT BANDITS 45
remain one.
∂ E[Rt]
∂Ht(a) = ∑
b
πt(b)(q(b) − Xt
) ∂ πt(b)
∂Ht(a)/πt(b)
The equation is now in the form of an expectation, summing over all possible
values b of the random variable At, then multiplying by the probability of
taking those values. Thus:
∂ E[Rt]
∂Ht(a) = E
[(q(At) − Xt
)∂ πt(At)
∂Ht(a) /πt(At)
]
= E
[(Rt − ¯ Rt
)∂ πt(At)
∂Ht(a) /πt(At)
]
,
where here we have chosen Xt = ¯ Rt and substituted Rt for q(At), which is
permitted because E[Rt] = q(At) and because all the other factors are nonrandom. Shortly we will establish that ∂ πt(b)
∂Ht(a) = πt(b)(Ia=b − πt(a)), where Ia=b
is defined to be 1 if a = b, else 0. Assuming that for now we have
∂ E[Rt]
∂Ht(a) = E[(Rt − ¯ Rt
)πt(At)(Ia=At − πt(a))/πt(At)]
= E[(Rt − ¯ Rt
)(Ia=At − πt(a))] .
Recall that our plan has been to write the performance gradient as an expectation of something that we can sample on each step, as we have just done, and
then update on each step proportional to the sample. Substituting a sample
of the expectation above for the performance gradient in (2.11) yields:
Ht+1(a) = Ht(a) + α(Rt − ¯ Rt
)(Ia=At − πt(a)), ∀a,
which you will recognize as being equivalent to our original algorithm (2.10).
Thus it remains only to show that ∂ πt(b)
∂Ht(a) = πt(b)(Ia=b − πt(a)), as we
assumed earlier. Recall the standard quotient rule for derivatives:
∂
∂x
[f (x)
g(x)
]
=
∂f (x)
∂x g(x) − f (x)∂g(x)
∂x
g(x)2 .

-- 59 of 352 --

46 CHAPTER 2. MULTI-ARM BANDITS
Using this, we can write
∂ πt(b)
∂Ht(a) = ∂
∂Ht(a) πt(b)
= ∂
∂Ht(a)
[ eHt(b)
∑n
c=1 eHt(c)
]
=
∂eHt(b)
∂Ht(a)
∑n
c=1 eHt(c) − eHt(b) ∂ ∑n
c=1 eHt(c)
∂Ht(a)
(∑n
c=1 eHt(c))2 (by the quotient rule)
= Ia=beHt(a) ∑n
c=1 eHt(c) − eHt(b)eHt(a)
(∑n
c=1 eHt(c))2 (because ∂ex
∂x = ex)
= Ia=beHt(b)
∑n
c=1 eHt(c) − eHt(b)eHt(a)
(∑n
c=1 eHt(c))2
= Ia=bπt(b) − πt(b)πt(a)
= πt(b)(Ia=b − πt(a)). Q.E.D.
We have just shown that the expected update of the gradient-bandit algorithm is equal to the gradient of expected reward, and thus that the algorithm
is an instance of stochastic gradient ascent. This assures us that the algorithm
has robust convergence properties.
Note that we did not require anything of the reward baseline other than
that it not depend on the selected action. For example, we could have set
is to zero, or to 1000, and the algorithm would still have been an instance
of stochastic gradient ascent. The choice of the baseline does not affect the
expected update of the algorithm, but it does affect the variance of the update
and thus the rate of convergence (as shown, e.g., in Figure 2.4). Choosing it
as the average of the rewards may not be the very best, but it is simple and
works well in practice.
2.8 Associative Search (Contextual Bandits)
So far in this chapter we have considered only nonassociative tasks, in which
there is no need to associate different actions with different situations. In
these tasks the learner either tries to find a single best action when the task is
stationary, or tries to track the best action as it changes over time when the
task is nonstationary. However, in a general reinforcement learning task there
is more than one situation, and the goal is to learn a policy: a mapping from
situations to the actions that are best in those situations. To set the stage for

---

## [Sección 27] Chapter 2

-- 60 of 352 --

2.9. SUMMARY 47
the full problem, we briefly discuss the simplest way in which nonassociative
tasks extend to the associative setting.
As an example, suppose there are several different n-armed bandit tasks,
and that on each play you confront one of these chosen at random. Thus, the
bandit task changes randomly from play to play. This would appear to you as
a single, nonstationary n-armed bandit task whose true action values change
randomly from play to play. You could try using one of the methods described
in this chapter that can handle nonstationarity, but unless the true action
values change slowly, these methods will not work very well. Now suppose,
however, that when a bandit task is selected for you, you are given some
distinctive clue about its identity (but not its action values). Maybe you are
facing an actual slot machine that changes the color of its display as it changes
its action values. Now you can learn a policy associating each task, signaled
by the color you see, with the best action to take when facing that task—for
instance, if red, play arm 1; if green, play arm 2. With the right policy you
can usually do much better than you could in the absence of any information
distinguishing one bandit task from another.
This is an example of an associative search task, so called because it involves both trial-and-error learning in the form of search for the best actions
and association of these actions with the situations in which they are best.2
Associative search tasks are intermediate between the n-armed bandit problem
and the full reinforcement learning problem. They are like the full reinforcement learning problem in that they involve learning a policy, but like our
version of the n-armed bandit problem in that each action affects only the
immediate reward. If actions are allowed to affect the next situation as well as
the reward, then we have the full reinforcement learning problem. We present
this problem in the next chapter and consider its ramifications throughout the
rest of the book.
2.9 Summary
We have presented in this chapter several simple ways of balancing exploration
and exploitation. The ε-greedy methods choose randomly a small fraction of
the time, whereas UCB methods choose deterministically but achieve exploration by subtly favoring at each step the actions that have so far received fewer
samples. Gradient-bandit algorithms estimate not action values, but action
preferences, and favor the more preferred actions in a graded, probabalistic
manner using a soft-max distribution. The simple expedient of initializing
2Associative search tasks are often now termed contextual bandits in the literature.

-- 61 of 352 --

48 CHAPTER 2. MULTI-ARM BANDITS
Average
reward
over first
1000 steps
1.5
1.4
1.3
1.2
1.1
𝜀-greedy
UCB
gradient
bandit
greedy with
optimistic
initialization
α = 0.1
↵ / c / Q0
1 2 4 1/2 1/4 1/8 1/16 1/32 1/64 1/128
Figure 2.5: A parameter study of the various bandit algorithms presented in
this chapter. Each point is the average reward obtained over 1000 steps with
a particular algorithm at a particular setting of its parameter.
estimates optimistically causes even greedy methods to explore significantly.
It is natural to ask which of these methods is best. Although this is a
difficult question to answer in general, we can certainly run them all on the
10-armed testbed that we have used throughout this chapter and compare
their performances. A complication is that they all have a parameter; to
get a meaningful comparison we will have to consider their performance as
a function of their parameter. Our graphs so far have shown the course of
learning over time for each algorithm and parameter setting, but it would
be too visually confusing to show such a learning curve for each algorithm
and parameter value. Instead we summarize a complete learning curve by its
average value over the 1000 steps; this value is proportional to the area under
the learning curves we have shown up to now. Figure 2.5 shows this measure
for the various bandit algorithms from this chapter, each as a function of its
own parameter shown on a single scale on the x-axis. Note that the parameter
values are varied by factors of two and presented on a log scale. Note also
the characteristic inverted-U shapes of each algorithm’s performance; all the
algorithms perform best at an intermediate value of their parameter, neither
too large nor too big. In assessing an method, we should attend not just to
how well it does at its best parameter setting, but also to how sensitive it is to
its parameter value. All of these algorithms are fairly insensitive, performing
well over a range of parameter values varying by about an order of magnitude.
Overall, on this problem, UCB seems to perform best.

---

## [Sección 28] Chapter 2

-- 62 of 352 --

2.9. SUMMARY 49
Despite their simplicity, in our opinion the methods presented in this chapter can fairly be considered the state of the art. There are more sophisticated
methods, but their complexity and assumptions make them impractical for the
full reinforcement learning problem that is our real focus. Starting in Chapter 5 we present learning methods for solving the full reinforcement learning
problem that use in part the simple methods explored in this chapter.
Although the simple methods explored in this chapter may be the best we
can do at present, they are far from a fully satisfactory solution to the problem
of balancing exploration and exploitation.
The classical solution to balancing exploration and exploitation in n-armed
bandit problems is to compute special functions called Gittins indices. These
provide an optimal solution to a certain kind of bandit problem more general
than that considered here but that assumes the prior distribution of possible
problems is known. Unfortunately, neither the theory nor the computational
tractability of this method appear to generalize to the full reinforcement learning problem that we consider in the rest of the book.
There is also a well-known algorithm for computing the Bayes optimal way
to balance exploration and exploitation. This method is computationally intractable when done exactly, but there may be efficient ways to approximate it.
In this method we assume that we know the distribution of problem instances,
that is, the probability of each possible set of true action values. Given any
action selection, we can then compute the probability of each possible immediate reward and the resultant posterior probability distribution over action
values. This evolving distribution becomes the information state of the problem. Given a horizon, say 1000 plays, one can consider all possible actions, all
possible resulting rewards, all possible next actions, all next rewards, and so
on for all 1000 plays. Given the assumptions, the rewards and probabilities
of each possible chain of events can be determined, and one need only pick
the best. But the tree of possibilities grows extremely rapidly; even if there
are only two actions and two rewards, the tree will have 22000 leaves. This
approach effectively turns the bandit problem into an instance of the full reinforcement learning problem. In the end, we may be able to use reinforcement
learning methods to approximate this optimal solution. But that is a topic for
current research and beyond the scope of this book.
Bibliographical and Historical Remarks
2.1 Bandit problems have been studied in statistics, engineering, and psychology. In statistics, bandit problems fall under the heading “sequential design of experiments,” introduced by Thompson (1933, 1934) and

-- 63 of 352 --

50 CHAPTER 2. MULTI-ARM BANDITS
Robbins (1952), and studied by Bellman (1956). Berry and Fristedt
(1985) provide an extensive treatment of bandit problems from the
perspective of statistics. Narendra and Thathachar (1989) treat bandit
problems from the engineering perspective, providing a good discussion
of the various theoretical traditions that have focused on them. In psychology, bandit problems have played roles in statistical learning theory
(e.g., Bush and Mosteller, 1955; Estes, 1950).
The term greedy is often used in the heuristic search literature (e.g.,
Pearl, 1984). The conflict between exploration and exploitation is
known in control engineering as the conflict between identification (or
estimation) and control (e.g., Witten, 1976). Feldbaum (1965) called it
the dual control problem, referring to the need to solve the two problems of identification and control simultaneously when trying to control
a system under uncertainty. In discussing aspects of genetic algorithms,
Holland (1975) emphasized the importance of this conflict, referring to
it as the conflict between the need to exploit and the need for new
information.
2.2 Action-value methods for our n-armed bandit problem were first proposed by Thathachar and Sastry (1985). These are often called estimator algorithms in the learning automata literature. The term action
value is due to Watkins (1989). The first to use ε-greedy methods may
also have been Watkins (1989, p. 187), but the idea is so simple that
some earlier use seems likely.
2.3–4 This material falls under the general heading of stochastic iterative
algorithms, which is well covered by Bertsekas and Tsitsiklis (1996).
2.5 Optimistic initialization was used in reinforcement learning by Sutton
(1996).
2.6 Early work on using estimates of the upper confidence bound to select
actions was done by Lai and Robbins (1985), Kaelbling (1993b), and
Agarwal (1995). The UCB algorithm we present here is called UCB1
in the literature and was first developed by Auer, Cesa-Bianchi and
Fischer (2002).
2.7 Gradient-bandit algorithms are a special case of the gradient-based
reinforcement learning algorithms introduced by Williams (1992), and
that later developed into the actor–critic and policy-gradient algorithms
that we treat later in this book. Further discussion of the choice of

---

## [Sección 29] Chapter 2

-- 64 of 352 --

2.9. SUMMARY 51
baseline is provided there and by Greensmith, Bartlett, and Baxter
(2001, 2004) and Dick (2015).
The term softmax for the action selection rule (2.9) is due to Bridle
(1990). This rule appears to have been first proposed by Luce (1959).
2.8 The term associative search and the corresponding problem were introduced by Barto, Sutton, and Brouwer (1981). The term associative
reinforcement learning has also been used for associative search (Barto
and Anandan, 1985), but we prefer to reserve that term as a synonym
for the full reinforcement learning problem (as in Sutton, 1984). (And,
as we noted, the modern literature also uses the term “contextual bandits” for this problem.) We note that Thorndike’s Law of Effect (quoted
in Chapter 1) describes associative search by referring to the formation
of associative links between situations (states) and actions. According to the terminology of operant, or instrumental, conditioning (e.g.,
Skinner, 1938), a discriminative stimulus is a stimulus that signals the
presence of a particular reinforcement contingency. In our terms, different discriminative stimuli correspond to different states.
2.9 The Gittins index approach is due to Gittins and Jones (1974). Duff
(1995) showed how it is possible to learn Gittins indices for bandit
problems through reinforcement learning. Bellman (1956) was the first
to show how dynamic programming could be used to compute the optimal balance between exploration and exploitation within a Bayesian
formulation of the problem. The survey by Kumar (1985) provides
a good discussion of Bayesian and non-Bayesian approaches to these
problems. The term information state comes from the literature on
partially observable MDPs; see, e.g., Lovejoy (1991).
Exercises
Exercise 2.1 In the comparison shown in Figure 2.1, which method will
perform best in the long run in terms of cumulative reward and cumulative
probability of selecting the best action? How much better will it be? Express
your answer quantitatively.
Exercise 2.2 Give pseudocode for a complete algorithm for the n-armed
bandit problem. Use greedy action selection and incremental computation of
action values with α = 1
k step-size parameter. Assume a function bandit(a)
that takes an action and returns a reward. Use arrays and variables; do not

-- 65 of 352 --

52 CHAPTER 2. MULTI-ARM BANDITS
subscript anything by the time index t (for examples of this style of pseudocode, see Figures 4.1 and 4.3). Indicate how the action values are initialized
and updated after each reward. Indicate how the step-size parameters are set
for each action as a function of how many times it has been tried.
Exercise 2.3 If the step-size parameters, αk, are not constant, then the estimate Qk is a weighted average of previously received rewards with a weighting
different from that given by (2.6). What is the weighting on each prior reward
for the general case, analogous to (2.6), in terms of αk?
Exercise 2.4 (programming) Design and conduct an experiment to demonstrate the difficulties that sample-average methods have for nonstationary
problems. Use a modified version of the 10-armed testbed in which all the
q(a) start out equal and then take independent random walks. Prepare plots
like Figure 2.1 for an action-value method using sample averages, incrementally computed by α = 1
k , and another action-value method using a constant
step-size parameter, α = 0.1. Use ε = 0.1 and, if necessary, runs longer than
1000 plays.
Exercise 2.5 The results shown in Figure 2.2 should be quite reliable because they are averages over 2000 individual, randomly chosen 10-armed bandit tasks. Why, then, are there oscillations and spikes in the early part of
the curve for the optimistic method? What might make this method perform
particularly better or worse, on average, on particular early plays?
Exercise 2.6 Suppose you face a binary bandit task whose true action values
change randomly from play to play. Specifically, suppose that for any play the
true values of actions 1 and 2 are respectively 0.1 and 0.2 with probability 0.5
(case A), and 0.9 and 0.8 with probability 0.5 (case B). If you are not able to
tell which case you face at any play, what is the best expectation of success
you can achieve and how should you behave to achieve it? Now suppose that
on each play you are told if you are facing case A or case B (although you still
don’t know the true action values). This is an associative search task. What
is the best expectation of success you can achieve in this task, and how should
you behave to achieve it?

---

## [Sección 30] Chapter 2

-- 66 of 352 --

---

## [Sección 31] Chapter 3

Finite Markov Decision
Processes
In this chapter we introduce the problem that we try to solve in the rest of
the book. For us, this problem defines the field of reinforcement learning: any
method that is suited to solving this problem we consider to be a reinforcement
learning method.
Our objective in this chapter is to describe the reinforcement learning problem in a broad sense. We try to convey the wide range of possible applications
that can be framed as reinforcement learning tasks. We also describe mathematically idealized forms of the reinforcement learning problem for which
precise theoretical statements can be made. We introduce key elements of the
problem’s mathematical structure, such as value functions and Bellman equations. As in all of artificial intelligence, there is a tension between breadth of
applicability and mathematical tractability. In this chapter we introduce this
tension and discuss some of the trade-offs and challenges that it implies.
3.1 The Agent–Environment Interface
The reinforcement learning problem is meant to be a straightforward framing
of the problem of learning from interaction to achieve a goal. The learner and
decision-maker is called the agent. The thing it interacts with, comprising
everything outside the agent, is called the environment. These interact continually, the agent selecting actions and the environment responding to those
actions and presenting new situations to the agent.1 The environment also
1We use the terms agent, environment, and action instead of the engineers’ terms controller, controlled system (or plant), and control signal because they are meaningful to a
-- 67 of 352 --

54 CHAPTER 3. FINITE MARKOV DECISION PROCESSES
Agent
Environment
action
At
reward
Rt
state
St
Rt+1
St+1
Figure 3.1: The agent–environment interaction in reinforcement learning.
gives rise to rewards, special numerical values that the agent tries to maximize
over time. A complete specification of an environment defines a task , one
instance of the reinforcement learning problem.
More specifically, the agent and environment interact at each of a sequence
of discrete time steps, t = 0, 1, 2, 3, . . ..2 At each time step t, the agent receives
some representation of the environment’s state, St ∈ S, where S is the set of
possible states, and on that basis selects an action, At ∈ A(St), where A(St)
is the set of actions available in state St. One time step later, in part as
a consequence of its action, the agent receives a numerical reward , Rt+1 ∈
R ⊂ R, and finds itself in a new state, St+1.3 Figure 3.1 diagrams the agent–
environment interaction.
At each time step, the agent implements a mapping from states to probabilities of selecting each possible action. This mapping is called the agent’s
policy and is denoted πt, where πt(a|s) is the probability that At = a if St = s.
Reinforcement learning methods specify how the agent changes its policy as
a result of its experience. The agent’s goal, roughly speaking, is to maximize
the total amount of reward it receives over the long run.
This framework is abstract and flexible and can be applied to many different
problems in many different ways. For example, the time steps need not refer
to fixed intervals of real time; they can refer to arbitrary successive stages of
decision-making and acting. The actions can be low-level controls, such as the
voltages applied to the motors of a robot arm, or high-level decisions, such
as whether or not to have lunch or to go to graduate school. Similarly, the
states can take a wide variety of forms. They can be completely determined
by low-level sensations, such as direct sensor readings, or they can be more
wider audience.
2We restrict attention to discrete time to keep things as simple as possible, even though
many of the ideas can be extended to the continuous-time case (e.g., see Bertsekas and
Tsitsiklis, 1996; Werbos, 1992; Doya, 1996).
3We use Rt+1 instead of Rt to denote the reward due to At because it emphasizes that
the next reward and next state, Rt+1 and St+1, are jointly determined.

---

## [Sección 32] Chapter 3

-- 68 of 352 --

3.1. THE AGENT–ENVIRONMENT INTERFACE 55
high-level and abstract, such as symbolic descriptions of objects in a room.
Some of what makes up a state could be based on memory of past sensations
or even be entirely mental or subjective. For example, an agent could be in
the state of not being sure where an object is, or of having just been surprised
in some clearly defined sense. Similarly, some actions might be totally mental
or computational. For example, some actions might control what an agent
chooses to think about, or where it focuses its attention. In general, actions
can be any decisions we want to learn how to make, and the states can be
anything we can know that might be useful in making them.
In particular, the boundary between agent and environment is not often
the same as the physical boundary of a robot’s or animal’s body. Usually, the
boundary is drawn closer to the agent than that. For example, the motors
and mechanical linkages of a robot and its sensing hardware should usually be
considered parts of the environment rather than parts of the agent. Similarly,
if we apply the framework to a person or animal, the muscles, skeleton, and
sensory organs should be considered part of the environment. Rewards, too,
presumably are computed inside the physical bodies of natural and artificial
learning systems, but are considered external to the agent.
The general rule we follow is that anything that cannot be changed arbitrarily by the agent is considered to be outside of it and thus part of its
environment. We do not assume that everything in the environment is unknown to the agent. For example, the agent often knows quite a bit about
how its rewards are computed as a function of its actions and the states in
which they are taken. But we always consider the reward computation to be
external to the agent because it defines the task facing the agent and thus
must be beyond its ability to change arbitrarily. In fact, in some cases the
agent may know everything about how its environment works and still face
a difficult reinforcement learning task, just as we may know exactly how a
puzzle like Rubik’s cube works, but still be unable to solve it. The agent–
environment boundary represents the limit of the agent’s absolute control, not
of its knowledge.
The agent–environment boundary can be located at different places for
different purposes. In a complicated robot, many different agents may be operating at once, each with its own boundary. For example, one agent may make
high-level decisions which form part of the states faced by a lower-level agent
that implements the high-level decisions. In practice, the agent–environment
boundary is determined once one has selected particular states, actions, and
rewards, and thus has identified a specific decision-making task of interest.
The reinforcement learning framework is a considerable abstraction of the
problem of goal-directed learning from interaction. It proposes that whatever

-- 69 of 352 --

56 CHAPTER 3. FINITE MARKOV DECISION PROCESSES
the details of the sensory, memory, and control apparatus, and whatever objective one is trying to achieve, any problem of learning goal-directed behavior
can be reduced to three signals passing back and forth between an agent and
its environment: one signal to represent the choices made by the agent (the
actions), one signal to represent the basis on which the choices are made (the
states), and one signal to define the agent’s goal (the rewards). This framework may not be sufficient to represent all decision-learning problems usefully,
but it has proved to be widely useful and applicable.
Of course, the particular states and actions vary greatly from task to task,
and how they are represented can strongly affect performance. In reinforcement learning, as in other kinds of learning, such representational choices are at
present more art than science. In this book we offer some advice and examples
regarding good ways of representing states and actions, but our primary focus
is on general principles for learning how to behave once the representations
have been selected.
Example 3.1: Bioreactor Suppose reinforcement learning is being applied
to determine moment-by-moment temperatures and stirring rates for a bioreactor (a large vat of nutrients and bacteria used to produce useful chemicals).
The actions in such an application might be target temperatures and target
stirring rates that are passed to lower-level control systems that, in turn, directly activate heating elements and motors to attain the targets. The states
are likely to be thermocouple and other sensory readings, perhaps filtered and
delayed, plus symbolic inputs representing the ingredients in the vat and the
target chemical. The rewards might be moment-by-moment measures of the
rate at which the useful chemical is produced by the bioreactor. Notice that
here each state is a list, or vector, of sensor readings and symbolic inputs,
and each action is a vector consisting of a target temperature and a stirring
rate. It is typical of reinforcement learning tasks to have states and actions
with such structured representations. Rewards, on the other hand, are always
single numbers.
Example 3.2: Pick-and-Place Robot Consider using reinforcement learning to control the motion of a robot arm in a repetitive pick-and-place task. If
we want to learn movements that are fast and smooth, the learning agent will
have to control the motors directly and have low-latency information about
the current positions and velocities of the mechanical linkages. The actions
in this case might be the voltages applied to each motor at each joint, and
the states might be the latest readings of joint angles and velocities. The
reward might be +1 for each object successfully picked up and placed. To
encourage smooth movements, on each time step a small, negative reward can
be given as a function of the moment-to-moment “jerkiness” of the motion.

---

## [Sección 33] Chapter 3

-- 70 of 352 --

3.2. GOALS AND REWARDS 57
Example 3.3: Recycling Robot A mobile robot has the job of collecting
empty soda cans in an office environment. It has sensors for detecting cans, and
an arm and gripper that can pick them up and place them in an onboard bin; it
runs on a rechargeable battery. The robot’s control system has components for
interpreting sensory information, for navigating, and for controlling the arm
and gripper. High-level decisions about how to search for cans are made by a
reinforcement learning agent based on the current charge level of the battery.
This agent has to decide whether the robot should (1) actively search for a
can for a certain period of time, (2) remain stationary and wait for someone
to bring it a can, or (3) head back to its home base to recharge its battery.
This decision has to be made either periodically or whenever certain events
occur, such as finding an empty can. The agent therefore has three actions,
and its state is determined by the state of the battery. The rewards might be
zero most of the time, but then become positive when the robot secures an
empty can, or large and negative if the battery runs all the way down. In this
example, the reinforcement learning agent is not the entire robot. The states
it monitors describe conditions within the robot itself, not conditions of the
robot’s external environment. The agent’s environment therefore includes the
rest of the robot, which might contain other complex decision-making systems,
as well as the robot’s external environment.
3.2 Goals and Rewards
In reinforcement learning, the purpose or goal of the agent is formalized in
terms of a special reward signal passing from the environment to the agent.
At each time step, the reward is a simple number, Rt ∈ R. Informally, the
agent’s goal is to maximize the total amount of reward it receives. This means
maximizing not immediate reward, but cumulative reward in the long run. We
can clearly state this informal idea as the reward hypothesis:
That all of what we mean by goals and purposes can be well
thought of as the maximization of the expected value of the cumulative sum of a received scalar signal (called reward).
The use of a reward signal to formalize the idea of a goal is one of the most
distinctive features of reinforcement learning.
Although formulating goals in terms of reward signals might at first appear
limiting, in practice it has proved to be flexible and widely applicable. The best
way to see this is to consider examples of how it has been, or could be, used.
For example, to make a robot learn to walk, researchers have provided reward

-- 71 of 352 --

58 CHAPTER 3. FINITE MARKOV DECISION PROCESSES
on each time step proportional to the robot’s forward motion. In making a
robot learn how to escape from a maze, the reward is often −1 for every time
step that passes prior to escape; this encourages the agent to escape as quickly
as possible. To make a robot learn to find and collect empty soda cans for
recycling, one might give it a reward of zero most of the time, and then a
reward of +1 for each can collected. One might also want to give the robot
negative rewards when it bumps into things or when somebody yells at it. For
an agent to learn to play checkers or chess, the natural rewards are +1 for
winning, −1 for losing, and 0 for drawing and for all nonterminal positions.
You can see what is happening in all of these examples. The agent always
learns to maximize its reward. If we want it to do something for us, we must
provide rewards to it in such a way that in maximizing them the agent will
also achieve our goals. It is thus critical that the rewards we set up truly
indicate what we want accomplished. In particular, the reward signal is not
the place to impart to the agent prior knowledge about how to achieve what we
want it to do.4 For example, a chess-playing agent should be rewarded only
for actually winning, not for achieving subgoals such taking its opponent’s
pieces or gaining control of the center of the board. If achieving these sorts
of subgoals were rewarded, then the agent might find a way to achieve them
without achieving the real goal. For example, it might find a way to take the
opponent’s pieces even at the cost of losing the game. The reward signal is
your way of communicating to the robot what you want it to achieve, not how
you want it achieved.
Newcomers to reinforcement learning are sometimes surprised that the
rewards—which define of the goal of learning—are computed in the environment rather than in the agent. Certainly most ultimate goals for animals
are recognized by computations occurring inside their bodies, for example, by
sensors for recognizing food, hunger, pain, and pleasure. Nevertheless, as we
discussed in the previous section, one can redraw the agent–environment interface in such a way that these parts of the body are considered to be outside
of the agent (and thus part of the agent’s environment). For example, if the
goal concerns a robot’s internal energy reservoirs, then these are considered to
be part of the environment; if the goal concerns the positions of the robot’s
limbs, then these too are considered to be part of the environment—that is,
the agent’s boundary is drawn at the interface between the limbs and their
control systems. These things are considered internal to the robot but external
to the learning agent. For our purposes, it is convenient to place the boundary
of the learning agent not at the limit of its physical body, but at the limit of
4Better places for imparting this kind of prior knowledge are the initial policy or value
function, or in influences on these. See Lin (1992), Maclin and Shavlik (1994), and Clouse
(1996).

---

## [Sección 34] Chapter 3

-- 72 of 352 --

3.3. RETURNS 59
its control.
The reason we do this is that the agent’s ultimate goal should be something
over which it has imperfect control: it should not be able, for example, to
simply decree that the reward has been received in the same way that it might
arbitrarily change its actions. Therefore, we place the reward source outside
of the agent. This does not preclude the agent from defining for itself a kind
of internal reward, or a sequence of internal rewards. Indeed, this is exactly
what many reinforcement learning methods do.
3.3 Returns
So far we have discussed the objective of learning informally. We have said that
the agent’s goal is to maximize the cumulative reward it receives in the long
run. How might this be defined formally? If the sequence of rewards received
after time step t is denoted Rt+1, Rt+2, Rt+3, . . ., then what precise aspect of
this sequence do we wish to maximize? In general, we seek to maximize the
expected return, where the return Gt is defined as some specific function of the
reward sequence. In the simplest case the return is the sum of the rewards:
Gt = Rt+1 + Rt+2 + Rt+3 + · · · + RT , (3.1)
where T is a final time step. This approach makes sense in applications in
which there is a natural notion of final time step, that is, when the agent–
environment interaction breaks naturally into subsequences, which we call
episodes,5 such as plays of a game, trips through a maze, or any sort of repeated interactions. Each episode ends in a special state called the terminal
state, followed by a reset to a standard starting state or to a sample from a
standard distribution of starting states. Tasks with episodes of this kind are
called episodic tasks. In episodic tasks we sometimes need to distinguish the
set of all nonterminal states, denoted S, from the set of all states plus the
terminal state, denoted S+.
On the other hand, in many cases the agent–environment interaction does
not break naturally into identifiable episodes, but goes on continually without
limit. For example, this would be the natural way to formulate a continual
process-control task, or an application to a robot with a long life span. We
call these continuing tasks. The return formulation (3.1) is problematic for
continuing tasks because the final time step would be T = ∞, and the return,
which is what we are trying to maximize, could itself easily be infinite. (For
example, suppose the agent receives a reward of +1 at each time step.) Thus,
5Episodes are sometimes called “trials” in the literature.

-- 73 of 352 --

60 CHAPTER 3. FINITE MARKOV DECISION PROCESSES
Figure 3.2: The pole-balancing task.
in this book we usually use a definition of return that is slightly more complex
conceptually but much simpler mathematically.
The additional concept that we need is that of discounting. According to
this approach, the agent tries to select actions so that the sum of the discounted
rewards it receives over the future is maximized. In particular, it chooses At
to maximize the expected discounted return:
Gt = Rt+1 + γRt+2 + γ2Rt+3 + · · · =
∞ ∑
k=0
γkRt+k+1, (3.2)
where γ is a parameter, 0 ≤ γ ≤ 1, called the discount rate.
The discount rate determines the present value of future rewards: a reward
received k time steps in the future is worth only γk−1 times what it would be
worth if it were received immediately. If γ < 1, the infinite sum has a finite
value as long as the reward sequence {Rk} is bounded. If γ = 0, the agent
is “myopic” in being concerned only with maximizing immediate rewards: its
objective in this case is to learn how to choose At so as to maximize only
Rt+1. If each of the agent’s actions happened to influence only the immediate
reward, not future rewards as well, then a myopic agent could maximize (3.2)
by separately maximizing each immediate reward. But in general, acting to
maximize immediate reward can reduce access to future rewards so that the
return may actually be reduced. As γ approaches 1, the objective takes future
rewards into account more strongly: the agent becomes more farsighted.
Example 3.4: Pole-Balancing Figure 3.2 shows a task that served as an
early illustration of reinforcement learning. The objective here is to apply
forces to a cart moving along a track so as to keep a pole hinged to the cart
from falling over. A failure is said to occur if the pole falls past a given angle
from vertical or if the cart runs off the track. The pole is reset to vertical
after each failure. This task could be treated as episodic, where the natural
episodes are the repeated attempts to balance the pole. The reward in this

---

## [Sección 35] Chapter 3

-- 74 of 352 --

3.4. UNIFIED NOTATION FOR EPISODIC AND CONTINUING TASKS61
case could be +1 for every time step on which failure did not occur, so that the
return at each time would be the number of steps until failure. Alternatively,
we could treat pole-balancing as a continuing task, using discounting. In this
case the reward would be −1 on each failure and zero at all other times. The
return at each time would then be related to −γK , where K is the number of
time steps before failure. In either case, the return is maximized by keeping
the pole balanced for as long as possible.
3.4 Unified Notation for Episodic and Continuing Tasks
In the preceding section we described two kinds of reinforcement learning tasks,
one in which the agent–environment interaction naturally breaks down into a
sequence of separate episodes (episodic tasks), and one in which it does not
(continuing tasks). The former case is mathematically easier because each
action affects only the finite number of rewards subsequently received during
the episode. In this book we consider sometimes one kind of problem and
sometimes the other, but often both. It is therefore useful to establish one
notation that enables us to talk precisely about both cases simultaneously.
To be precise about episodic tasks requires some additional notation. Rather
than one long sequence of time steps, we need to consider a series of episodes,
each of which consists of a finite sequence of time steps. We number the time
steps of each episode starting anew from zero. Therefore, we have to refer not
just to St, the state representation at time t, but to St,i, the state representation at time t of episode i (and similarly for At,i, Rt,i, πt,i, Ti, etc.). However,
it turns out that, when we discuss episodic tasks we will almost never have to
distinguish between different episodes. We will almost always be considering
a particular single episode, or stating something that is true for all episodes.
Accordingly, in practice we will almost always abuse notation slightly by dropping the explicit reference to episode number. That is, we will write St to refer
to St,i, and so on.
We need one other convention to obtain a single notation that covers both
episodic and continuing tasks. We have defined the return as a sum over a finite
number of terms in one case (3.1) and as a sum over an infinite number of terms
in the other (3.2). These can be unified by considering episode termination to
be the entering of a special absorbing state that transitions only to itself and
that generates only rewards of zero. For example, consider the state transition

-- 75 of 352 --

62 CHAPTER 3. FINITE MARKOV DECISION PROCESSES
diagram
R1 = +1
S0 S1
R2 = +1 S2
R3 = +1 R4 = 0
R5 = 0
. . .
Here the solid square represents the special absorbing state corresponding
to the end of an episode. Starting from S0, we get the reward sequence
+1, +1, +1, 0, 0, 0, . . .. Summing these, we get the same return whether we
sum over the first T rewards (here T = 3) or over the full infinite sequence.
This remains true even if we introduce discounting. Thus, we can define the
return, in general, according to (3.2), using the convention of omitting episode
numbers when they are not needed, and including the possibility that γ = 1 if
the sum remains defined (e.g., because all episodes terminate). Alternatively,
we can also write the return as
Gt =
T −t−1 ∑
k=0
γkRt+k+1, (3.3)
including the possibility that T = ∞ or γ = 1 (but not both6). We use these
conventions throughout the rest of the book to simplify notation and to express
the close parallels between episodic and continuing tasks.
∗3.5 The Markov Property
In the reinforcement learning framework, the agent makes its decisions as a
function of a signal from the environment called the environment’s state. In
this section we discuss what is required of the state signal, and what kind of
information we should and should not expect it to provide. In particular, we
formally define a property of environments and their state signals that is of
particular interest, called the Markov property.
In this book, by “the state” we mean whatever information is available to
the agent. We assume that the state is given by some preprocessing system
that is nominally part of the environment. We do not address the issues of
constructing, changing, or learning the state signal in this book. We take this
approach not because we consider state representation to be unimportant, but
6Ways to formulate tasks that are both continuing and undiscounted are the subject of
current research (e.g., Mahadevan, 1996; Schwartz, 1993; Tadepalli and Ok, 1994). Some of
the ideas are discussed in Section 11.2.

---

## [Sección 36] Chapter 3

-- 76 of 352 --

∗3.5. THE MARKOV PROPERTY 63
in order to focus fully on the decision-making issues. In other words, our main
concern is not with designing the state signal, but with deciding what action
to take as a function of whatever state signal is available.
Certainly the state signal should include immediate sensations such as sensory measurements, but it can contain much more than that. State representations can be highly processed versions of original sensations, or they can be
complex structures built up over time from the sequence of sensations. For example, we can move our eyes over a scene, with only a tiny spot corresponding
to the fovea visible in detail at any one time, yet build up a rich and detailed
representation of a scene. Or, more obviously, we can look at an object, then
look away, and know that it is still there. We can hear the word “yes” and
consider ourselves to be in totally different states depending on the question
that came before and which is no longer audible. At a more mundane level, a
control system can measure position at two different times to produce a state
representation including information about velocity. In all of these cases the
state is constructed and maintained on the basis of immediate sensations together with the previous state or some other memory of past sensations. In
this book, we do not explore how that is done, but certainly it can be and has
been done. There is no reason to restrict the state representation to immediate
sensations; in typical applications we should expect the state representation
to be able to inform the agent of more than that.
On the other hand, the state signal should not be expected to inform the
agent of everything about the environment, or even everything that would be
useful to it in making decisions. If the agent is playing blackjack, we should not
expect it to know what the next card in the deck is. If the agent is answering
the phone, we should not expect it to know in advance who the caller is. If
the agent is a paramedic called to a road accident, we should not expect it
to know immediately the internal injuries of an unconscious victim. In all
of these cases there is hidden state information in the environment, and that
information would be useful if the agent knew it, but the agent cannot know it
because it has never received any relevant sensations. In short, we don’t fault
an agent for not knowing something that matters, but only for having known
something and then forgotten it!
What we would like, ideally, is a state signal that summarizes past sensations compactly, yet in such a way that all relevant information is retained.
This normally requires more than the immediate sensations, but never more
than the complete history of all past sensations. A state signal that succeeds in retaining all relevant information is said to be Markov, or to have
the Markov property (we define this formally below). For example, a checkers position—the current configuration of all the pieces on the board—would
serve as a Markov state because it summarizes everything important about the

-- 77 of 352 --

64 CHAPTER 3. FINITE MARKOV DECISION PROCESSES
complete sequence of positions that led to it. Much of the information about
the sequence is lost, but all that really matters for the future of the game is
retained. Similarly, the current position and velocity of a cannonball is all that
matters for its future flight. It doesn’t matter how that position and velocity
came about. This is sometimes also referred to as an “independence of path”
property because all that matters is in the current state signal; its meaning is
independent of the “path,” or history, of signals that have led up to it.
We now formally define the Markov property for the reinforcement learning
problem. To keep the mathematics simple, we assume here that there are a
finite number of states and reward values. This enables us to work in terms
of sums and probabilities rather than integrals and probability densities, but
the argument can easily be extended to include continuous states and rewards.
Consider how a general environment might respond at time t + 1 to the action
taken at time t. In the most general, causal case this response may depend
on everything that has happened earlier. In this case the dynamics can be
defined only by specifying the complete probability distribution:
Pr{Rt+1 = r, St+1 = s′ | S0, A0, R1, . . . , St−1, At−1, Rt, St, At}, (3.4)
for all r, s′, and all possible values of the past events: S0, A0, R1, ..., St−1,
At−1, Rt, St, At. If the state signal has the Markov property, on the other
hand, then the environment’s response at t + 1 depends only on the state and
action representations at t, in which case the environment’s dynamics can be
defined by specifying only
p(s′, r|s, a) = Pr{Rt+1 = r, St+1 = s′ | St, At}, (3.5)
for all r, s′, St, and At. In other words, a state signal has the Markov property,
and is a Markov state, if and only if (3.5) is equal to (3.4) for all s′, r, and
histories, S0, A0, R1, ..., St−1, At−1, Rt, St, At. In this case, the environment
and task as a whole are also said to have the Markov property.
If an environment has the Markov property, then its one-step dynamics
(3.5) enable us to predict the next state and expected next reward given the
current state and action. One can show that, by iterating this equation, one
can predict all future states and expected rewards from knowledge only of the
current state as well as would be possible given the complete history up to the
current time. It also follows that Markov states provide the best possible basis
for choosing actions. That is, the best policy for choosing actions as a function
of a Markov state is just as good as the best policy for choosing actions as a
function of complete histories.
Even when the state signal is non-Markov, it is still appropriate to think
of the state in reinforcement learning as an approximation to a Markov state.

---

## [Sección 37] Chapter 3

-- 78 of 352 --

∗3.5. THE MARKOV PROPERTY 65
In particular, we always want the state to be a good basis for predicting
future rewards and for selecting actions. In cases in which a model of the
environment is learned (see Chapter 8), we also want the state to be a good
basis for predicting subsequent states. Markov states provide an unsurpassed
basis for doing all of these things. To the extent that the state approaches the
ability of Markov states in these ways, one will obtain better performance from
reinforcement learning systems. For all of these reasons, it is useful to think of
the state at each time step as an approximation to a Markov state, although
one should remember that it may not fully satisfy the Markov property.
The Markov property is important in reinforcement learning because decisions and values are assumed to be a function only of the current state. In
order for these to be effective and informative, the state representation must
be informative. All of the theory presented in this book assumes Markov state
signals. This means that not all the theory strictly applies to cases in which
the Markov property does not strictly apply. However, the theory developed
for the Markov case still helps us to understand the behavior of the algorithms,
and the algorithms can be successfully applied to many tasks with states that
are not strictly Markov. A full understanding of the theory of the Markov
case is an essential foundation for extending it to the more complex and realistic non-Markov case. Finally, we note that the assumption of Markov state
representations is not unique to reinforcement learning but is also present in
most if not all other approaches to artificial intelligence.
Example 3.5: Pole-Balancing State In the pole-balancing task introduced earlier, a state signal would be Markov if it specified exactly, or made
it possible to reconstruct exactly, the position and velocity of the cart along
the track, the angle between the cart and the pole, and the rate at which this
angle is changing (the angular velocity). In an idealized cart–pole system, this
information would be sufficient to exactly predict the future behavior of the
cart and pole, given the actions taken by the controller. In practice, however,
it is never possible to know this information exactly because any real sensor
would introduce some distortion and delay in its measurements. Furthermore,
in any real cart–pole system there are always other effects, such as the bending of the pole, the temperatures of the wheel and pole bearings, and various
forms of backlash, that slightly affect the behavior of the system. These factors
would cause violations of the Markov property if the state signal were only the
positions and velocities of the cart and the pole.
However, often the positions and velocities serve quite well as states. Some
early studies of learning to solve the pole-balancing task used a coarse state
signal that divided cart positions into three regions: right, left, and middle
(and similar rough quantizations of the other three intrinsic state variables).
This distinctly non-Markov state was sufficient to allow the task to be solved

-- 79 of 352 --

66 CHAPTER 3. FINITE MARKOV DECISION PROCESSES
easily by reinforcement learning methods. In fact, this coarse representation
may have facilitated rapid learning by forcing the learning agent to ignore fine
distinctions that would not have been useful in solving the task.
Example 3.6: Draw Poker In draw poker, each player is dealt a hand of
five cards. There is a round of betting, in which each player exchanges some
of his cards for new ones, and then there is a final round of betting. At each
round, each player must match or exceed the highest bets of the other players,
or else drop out (fold). After the second round of betting, the player with the
best hand who has not folded is the winner and collects all the bets.
The state signal in draw poker is different for each player. Each player
knows the cards in his own hand, but can only guess at those in the other
players’ hands. A common mistake is to think that a Markov state signal
should include the contents of all the players’ hands and the cards remaining
in the deck. In a fair game, however, we assume that the players are in principle
unable to determine these things from their past observations. If a player did
know them, then she could predict some future events (such as the cards one
could exchange for) better than by remembering all past observations.
In addition to knowledge of one’s own cards, the state in draw poker should
include the bets and the numbers of cards drawn by the other players. For
example, if one of the other players drew three new cards, you may suspect he
retained a pair and adjust your guess of the strength of his hand accordingly.
The players’ bets also influence your assessment of their hands. In fact, much
of your past history with these particular players is part of the Markov state.
Does Ellen like to bluff, or does she play conservatively? Does her face or
demeanor provide clues to the strength of her hand? How does Joe’s play
change when it is late at night, or when he has already won a lot of money?
Although everything ever observed about the other players may have an
effect on the probabilities that they are holding various kinds of hands, in
practice this is far too much to remember and analyze, and most of it will have
no clear effect on one’s predictions and decisions. Very good poker players are
adept at remembering just the key clues, and at sizing up new players quickly,
but no one remembers everything that is relevant. As a result, the state
representations people use to make their poker decisions are undoubtedly nonMarkov, and the decisions themselves are presumably imperfect. Nevertheless,
people still make very good decisions in such tasks. We conclude that the
inability to have access to a perfect Markov state representation is probably
not a severe problem for a reinforcement learning agent.

---

## [Sección 38] Chapter 3

-- 80 of 352 --

3.6. MARKOV DECISION PROCESSES 67
3.6 Markov Decision Processes
A reinforcement learning task that satisfies the Markov property is called a
Markov decision process, or MDP. If the state and action spaces are finite,
then it is called a finite Markov decision process (finite MDP). Finite MDPs
are particularly important to the theory of reinforcement learning. We treat
them extensively throughout this book; they are all you need to understand
90% of modern reinforcement learning.
A particular finite MDP is defined by its state and action sets and by the
one-step dynamics of the environment. Given any state and action s and a,
the probability of each possible pair of next state and reward, s′, r, is denoted
p(s′, r|s, a) = Pr{St+1 = s′, Rt+1 = r | St = s, At = a}. (3.6)
These quantities completely specify the dynamics of a finite MDP. Most of the
theory we present in the rest of this book implicitly assumes the environment
is a finite MDP.
Given the dynamics as specified by (3.6), one can compute anything else
one might want to know about the environment, such as the expected rewards
for state–action pairs,
r(s, a) = E[Rt+1 | St = s, At = a] = ∑
r∈R
r ∑
s′∈S
p(s′, r|s, a), (3.7)
the state-transition probabilities,
p(s′|s, a) = Pr{St+1 = s′ | St = s, At = a} = ∑
r∈R
p(s′, r|s, a), (3.8)
and the expected rewards for state–action–next-state triples,
r(s, a, s′) = E[Rt+1 | St = s, At = a, St+1 = s′] =
∑
r∈R r p(s′, r|s, a)
p(s′|s, a) . (3.9)
In the first edition of this book, the dynamics were expressed exclusively in
terms of the latter two quantities, which were denote Pa
ss′ and Ra
ss′ respectively.
One weakness of that notation is that it still did not fully characterize the
dynamics of the rewards, giving only their expectations. Another weakness is
the excess of subscripts and superscripts. In this edition we will predominantly
use the explicit notation of (3.6), while sometimes referring directly to the
transition probabilities (3.8).
Example 3.7: Recycling Robot MDP The recycling robot (Example
3.3) can be turned into a simple example of an MDP by simplifying it and

-- 81 of 352 --

68 CHAPTER 3. FINITE MARKOV DECISION PROCESSES
providing some more details. (Our aim is to produce a simple example, not
a particularly realistic one.) Recall that the agent makes a decision at times
determined by external events (or by other parts of the robot’s control system).
At each such time the robot decides whether it should (1) actively search for
a can, (2) remain stationary and wait for someone to bring it a can, or (3) go
back to home base to recharge its battery. Suppose the environment works
as follows. The best way to find cans is to actively search for them, but this
runs down the robot’s battery, whereas waiting does not. Whenever the robot
is searching, the possibility exists that its battery will become depleted. In
this case the robot must shut down and wait to be rescued (producing a low
reward).
The agent makes its decisions solely as a function of the energy level of
the battery. It can distinguish two levels, high and low, so that the state set
is S = {high, low}. Let us call the possible decisions—the agent’s actions—
wait, search, and recharge. When the energy level is high, recharging would
always be foolish, so we do not include it in the action set for this state. The
agent’s action sets are
A(high) = {search, wait}
A(low) = {search, wait, recharge}.
If the energy level is high, then a period of active search can always be
completed without risk of depleting the battery. A period of searching that
begins with a high energy level leaves the energy level high with probability
α and reduces it to low with probability 1 − α. On the other hand, a period of
searching undertaken when the energy level is low leaves it low with probability
β and depletes the battery with probability 1 − β. In the latter case, the robot
must be rescued, and the battery is then recharged back to high. Each can
collected by the robot counts as a unit reward, whereas a reward of −3 results
whenever the robot has to be rescued. Let rsearch and rwait, with rsearch > rwait,
respectively denote the expected number of cans the robot will collect (and
hence the expected reward) while searching and while waiting. Finally, to keep
things simple, suppose that no cans can be collected during a run home for
recharging, and that no cans can be collected on a step in which the battery
is depleted. This system is then a finite MDP, and we can write down the
transition probabilities and the expected rewards, as in Table 3.1.
A transition graph is a useful way to summarize the dynamics of a finite
MDP. Figure 3.3 shows the transition graph for the recycling robot example.
There are two kinds of nodes: state nodes and action nodes. There is a state
node for each possible state (a large open circle labeled by the name of the
state), and an action node for each state–action pair (a small solid circle labeled

---

## [Sección 39] Chapter 3

-- 82 of 352 --

3.6. MARKOV DECISION PROCESSES 69
s s′ a p(s′|s, a) r(s, a, s′)
high high search α rsearch
high low search 1 − α rsearch
low high search 1 − β −3
low low search β rsearch
high high wait 1 rwait
high low wait 0 rwait
low high wait 0 rwait
low low wait 1 rwait
low high recharge 1 0
low low recharge 0 0.
Table 3.1: Transition probabilities and expected rewards for the finite MDP
of the recycling robot example. There is a row for each possible combination
of current state, s, next state, s′, and action possible in the current state,
a ∈ A(s).
by the name of the action and connected by a line to the state node). Starting
in state s and taking action a moves you along the line from state node s to
action node (s, a). Then the environment responds with a transition to the
next state’s node via one of the arrows leaving action node (s, a). Each arrow
corresponds to a triple (s, s′, a), where s′ is the next state, and we label the
arrow with the transition probability, p(s′|s, a), and the expected reward for
that transition, r(s, a, s′). Note that the transition probabilities labeling the
arrows leaving an action node always sum to 1.
search
high low
1, 0
1–! , –3
search
recharge
wait
wait
search 1–" , R
! , R search
", R search
1, R wait
1, R wait
3.6. MARKOV DECISION PROCESSES 59
s s0 a p(s0|s, a) r(s, a, s0)
high high search ↵ rsearch
high low search 1   ↵ rsearch
low high search 1      3
low low search   rsearch
high high wait 1 rwait
high low wait 0 rwait
low high wait 0 rwait
low low wait 1 rwait
low high recharge 1 0
low low recharge 0 0.
Table 3.1: Transition probabilities and expected rewards for the finite MDP
of the recycling robot example. There is a row for each possible combination
of current state, s, next state, s0, and action possible in the current state,
a 2 A(s).
is S = {high, low}. Let us call the possible decisions—the agent’s actions—
wait, search, and recharge. When the energy level is high, recharging would
3.6. MARKOV DECISION PROCESSES 59
s s0 a p(s0|s, a) r(s, a, s0)
high high search ↵ rsearch
high low search 1   ↵ rsearch
low high search 1      3
low low search   rsearch
high high wait 1 rwait
high low wait 0 rwait
low high wait 0 rwait
low low wait 1 rwait
low high recharge 1 0
ISION PROCESSES 59
0 a p(s0|s, a) r(s, a, s0)
gh high search ↵ rsearch
gh low search 1   ↵ rsearch
w high search 1      3
w low search   rsearch
gh high wait 1 rwait
gh low wait 0 rwait
w high wait 0 rwait
w low wait 1 rwait
w high recharge 1 0
3.6. MARKOV DECISION PROCESSES 59
s s0 a p(s0|s, a) r(s, a, s0)
high high search ↵ rsearch
high low search 1   ↵ rsearch
low high search 1      3
low low search   rsearch
high high wait 1 rwait
high low wait 0 rwait
low high wait 0 rwait
low low wait 1 rwait
low high recharge 1 0
low low recharge 0 0.
Table 3.1: Transition probabilities and expected rewards for the finite MDP
of the recycling robot example. There is a row for each possible combination
ECISION PROCESSES 59
s 0 a p(s0|s, a) r(s, a, s0)
igh high search ↵ rsearch
igh low search 1   ↵ rsearch
ow high search 1      3
ow low search   rsearch
igh high wait 1 rwait
igh low wait 0 rwait
ow high wait 0 rwait
ow low wait 1 rwait
ow high recharge 1 0
ow low recharge 0 0.
ion probabilities and expected rewards for the finite MDP
ot example. There is a row for each possible combination
s, next state, s0, and action possible in the current state,
w}. Let us call the possible decisions—the agent’s actions—
d recharge. When the energy level is high, recharging would
o we do not include it in the action set for this state. The
are
{search, wait}
{search, wait, recharge}.
Figure 3.3: Transition graph for the recycling robot example.

-- 83 of 352 --

70 CHAPTER 3. FINITE MARKOV DECISION PROCESSES
3.7 Value Functions
Almost all reinforcement learning algorithms involve estimating value functions—functions of states (or of state–action pairs) that estimate how good it
is for the agent to be in a given state (or how good it is to perform a given
action in a given state). The notion of “how good” here is defined in terms of
future rewards that can be expected, or, to be precise, in terms of expected
return. Of course the rewards the agent can expect to receive in the future
depend on what actions it will take. Accordingly, value functions are defined
with respect to particular policies.
Recall that a policy, π, is a mapping from each state, s ∈ S, and action, a ∈
A(s), to the probability π(a|s) of taking action a when in state s. Informally,
the value of a state s under a policy π, denoted vπ(s), is the expected return
when starting in s and following π thereafter. For MDPs, we can define vπ(s)
formally as
vπ(s) = Eπ[Gt | St = s] = Eπ
[ ∞ ∑
k=0
γkRt+k+1
∣
∣
∣
∣
∣ St = s
]
, (3.10)
where Eπ[·] denotes the expected value of a random variable given that the
agent follows policy π, and t is any time step. Note that the value of the
terminal state, if any, is always zero. We call the function vπ the state-value
function for policy π.
Similarly, we define the value of taking action a in state s under a policy
π, denoted qπ(s, a), as the expected return starting from s, taking the action
a, and thereafter following policy π:
qπ(s, a) = Eπ[Gt | St = s, At = a] = Eπ
[ ∞ ∑
k=0
γkRt+k+1
∣
∣
∣
∣
∣ St = s, At = a
]
. (3.11)
We call qπ the action-value function for policy π.
The value functions vπ and qπ can be estimated from experience. For example, if an agent follows policy π and maintains an average, for each state
encountered, of the actual returns that have followed that state, then the average will converge to the state’s value, vπ(s), as the number of times that state
is encountered approaches infinity. If separate averages are kept for each action taken in a state, then these averages will similarly converge to the action
values, qπ(s, a). We call estimation methods of this kind Monte Carlo methods
because they involve averaging over many random samples of actual returns.
These kinds of methods are presented in Chapter 5. Of course, if there are very
many states, then it may not be practical to keep separate averages for each

---

## [Sección 40] Chapter 3

-- 84 of 352 --

3.7. VALUE FUNCTIONS 71
state individually. Instead, the agent would have to maintain vπ and qπ as parameterized functions and adjust the parameters to better match the observed
returns. This can also produce accurate estimates, although much depends on
the nature of the parameterized function approximator (Chapter 9).
A fundamental property of value functions used throughout reinforcement
learning and dynamic programming is that they satisfy particular recursive
relationships. For any policy π and any state s, the following consistency
condition holds between the value of s and the value of its possible successor
states:
vπ(s) = Eπ[Gt | St = s]
= Eπ
[ ∞ ∑
k=0
γkRt+k+1
∣
∣
∣
∣
∣ St = s
]
= Eπ
[
Rt+1 + γ
∞ ∑
k=0
γkRt+k+2
∣
∣
∣
∣
∣ St = s
]
= ∑
a
π(a|s) ∑
s′
∑
r
p(s′, r|s, a)
[
r + γEπ
[ ∞ ∑
k=0
γkRt+k+2
∣
∣
∣
∣
∣ St+1 = s′
]]
= ∑
a
π(a|s) ∑
s′,r
p(s′, r|s, a)
[
r + γvπ(s′)
]
, (3.12)
where it is implicit that the actions, a, are taken from the set A(s), the next
states, s′, are taken from the set S (or from S+ in the case of an episodic
problem), and the rewards, r, are taken from the set R. Note also how in the
last equation we have merged the two sums, one over all the values of s′ and
the other over all values of r, into one sum over all possible values of both.
We will use this kind of merged sum often to simplify formulas. Note how
the final expression can be read very easily as an expected value. It is really
a sum over all values of the three variables, a, s′, and r. For each triple, we
compute its probability, π(a|s)p(s′, r|s, a), weight the quantity in brackets by
that probability, then sum over all possibilities to get an expected value.
Equation (3.12) is the Bellman equation for vπ. It expresses a relationship
between the value of a state and the values of its successor states. Think of
looking ahead from one state to its possible successor states, as suggested by
Figure 3.4a. Each open circle represents a state and each solid circle represents
a state–action pair. Starting from state s, the root node at the top, the agent
could take any of some set of actions—three are shown in Figure 3.4a. From
each of these, the environment could respond with one of several next states,
s′, along with a reward, r. The Bellman equation (3.12) averages over all the
possibilities, weighting each by its probability of occurring. It states that the

-- 85 of 352 --

72 CHAPTER 3. FINITE MARKOV DECISION PROCESSES
s,a s
a
s'
r
a'
s'
r
(b) (a)
Figure 3.4: Backup diagrams for (a) vπ and (b) qπ.
value of the start state must equal the (discounted) value of the expected next
state, plus the reward expected along the way.
The value function vπ is the unique solution to its Bellman equation. We
show in subsequent chapters how this Bellman equation forms the basis of a
number of ways to compute, approximate, and learn vπ. We call diagrams
like those shown in Figure 3.4 backup diagrams because they diagram relationships that form the basis of the update or backup operations that are at
the heart of reinforcement learning methods. These operations transfer value
information back to a state (or a state–action pair) from its successor states (or
state–action pairs). We use backup diagrams throughout the book to provide
graphical summaries of the algorithms we discuss. (Note that unlike transition graphs, the state nodes of backup diagrams do not necessarily represent
distinct states; for example, a state might be its own successor. We also omit
explicit arrowheads because time always flows downward in a backup diagram.)
Example 3.8: Gridworld Figure 3.5a uses a rectangular grid to illustrate
value functions for a simple finite MDP. The cells of the grid correspond to
the states of the environment. At each cell, four actions are possible: north,
south, east, and west, which deterministically cause the agent to move one
cell in the respective direction on the grid. Actions that would take the agent
off the grid leave its location unchanged, but also result in a reward of −1.
Other actions result in a reward of 0, except those that move the agent out
of the special states A and B. From state A, all four actions yield a reward of
+10 and take the agent to A′. From state B, all actions yield a reward of +5
and take the agent to B′.
Suppose the agent selects all four actions with equal probability in all
states. Figure 3.5b shows the value function, vπ, for this policy, for the discounted reward case with γ = 0.9. This value function was computed by solving the system of equations (3.12). Notice the negative values near the lower
edge; these are the result of the high probability of hitting the edge of the grid
there under the random policy. State A is the best state to be in under this pol-

---

## [Sección 41] Chapter 3

-- 86 of 352 --

3.7. VALUE FUNCTIONS 73
3.3 8.8 4.4 5.3 1.5
1.5 3.0 2.3 1.9 0.5
0.1 0.7 0.7 0.4 -0.4
-1.0 -0.4 -0.4 -0.6 -1.2
-1.9 -1.3 -1.2 -1.4 -2.0
A B
A'
B' +10
+5
Actions
(a) (b)
Figure 3.5: Grid example: (a) exceptional reward dynamics; (b) state-value
function for the equiprobable random policy.
icy, but its expected return is less than 10, its immediate reward, because from
A the agent is taken to A′, from which it is likely to run into the edge of the
grid. State B, on the other hand, is valued more than 5, its immediate reward,
because from B the agent is taken to B′, which has a positive value. From B′ the
expected penalty (negative reward) for possibly running into an edge is more
than compensated for by the expected gain for possibly stumbling onto A or B.
Example 3.9: Golf To formulate playing a hole of golf as a reinforcement
learning task, we count a penalty (negative reward) of −1 for each stroke until
we hit the ball into the hole. The state is the location of the ball. The value of
a state is the negative of the number of strokes to the hole from that location.
Our actions are how we aim and swing at the ball, of course, and which club
we select. Let us take the former as given and consider just the choice of club,
which we assume is either a putter or a driver. The upper part of Figure 3.6
shows a possible state-value function, vputt(s), for the policy that always uses
the putter. The terminal state in-the-hole has a value of 0. From anywhere
on the green we assume we can make a putt; these states have value −1. Off
the green we cannot reach the hole by putting, and the value is greater. If
we can reach the green from a state by putting, then that state must have
value one less than the green’s value, that is, −2. For simplicity, let us assume
we can putt very precisely and deterministically, but with a limited range.
This gives us the sharp contour line labeled −2 in the figure; all locations
between that line and the green require exactly two strokes to complete the
hole. Similarly, any location within putting range of the −2 contour line
must have a value of −3, and so on to get all the contour lines shown in the
figure. Putting doesn’t get us out of sand traps, so they have a value of −∞.
Overall, it takes us six strokes to get from the tee to the hole by putting.

-- 87 of 352 --

74 CHAPTER 3. FINITE MARKOV DECISION PROCESSES
Q*(s,driver)
V putt
s a n d
green
!1
s and
!2!2
!3
!4
!1
!5
!6
!4
!3
!3 !2
!4
s a n d
green
!1
s and
!2
!3
!2
0
!"
!"
vputt
q*(s,driver)
Figure 3.6: A golf example: the state-value function for putting (above) and
the optimal action-value function for using the driver (below).

-- 88 of 352 --

3.8. OPTIMAL VALUE FUNCTIONS 75
3.8 Optimal Value Functions
Solving a reinforcement learning task means, roughly, finding a policy that
achieves a lot of reward over the long run. For finite MDPs, we can precisely
define an optimal policy in the following way. Value functions define a partial
ordering over policies. A policy π is defined to be better than or equal to a
policy π′ if its expected return is greater than or equal to that of π′ for all
states. In other words, π ≥ π′ if and only if vπ(s) ≥ vπ′ (s) for all s ∈ S. There
is always at least one policy that is better than or equal to all other policies.
This is an optimal policy. Although there may be more than one, we denote
all the optimal policies by π∗. They share the same state-value function, called
the optimal state-value function, denoted v∗, and defined as
v∗(s) = max
π vπ(s), (3.13)
for all s ∈ S.
Optimal policies also share the same optimal action-value function, denoted
q∗, and defined as
q∗(s, a) = max
π qπ(s, a), (3.14)
for all s ∈ S and a ∈ A(s). For the state–action pair (s, a), this function gives
the expected return for taking action a in state s and thereafter following an
optimal policy. Thus, we can write q∗ in terms of v∗ as follows:
q∗(s, a) = E[Rt+1 + γv∗(St+1) | St = s, At = a] . (3.15)
Example 3.10: Optimal Value Functions for Golf The lower part
of Figure 3.6 shows the contours of a possible optimal action-value function
q∗(s, driver). These are the values of each state if we first play a stroke with
the driver and afterward select either the driver or the putter, whichever is
better. The driver enables us to hit the ball farther, but with less accuracy.
We can reach the hole in one shot using the driver only if we are already very
close; thus the −1 contour for q∗(s, driver) covers only a small portion of
the green. If we have two strokes, however, then we can reach the hole from
much farther away, as shown by the −2 contour. In this case we don’t have
to drive all the way to within the small −1 contour, but only to anywhere
on the green; from there we can use the putter. The optimal action-value
function gives the values after committing to a particular first action, in this
case, to the driver, but afterward using whichever actions are best. The −3
contour is still farther out and includes the starting tee. From the tee, the best
sequence of actions is two drives and one putt, sinking the ball in three strokes.

---

## [Sección 42] Chapter 3

-- 89 of 352 --

76 CHAPTER 3. FINITE MARKOV DECISION PROCESSES
Because v∗ is the value function for a policy, it must satisfy the selfconsistency condition given by the Bellman equation for state values (3.12).
Because it is the optimal value function, however, v∗’s consistency condition
can be written in a special form without reference to any specific policy. This
is the Bellman equation for v∗, or the Bellman optimality equation. Intuitively,
the Bellman optimality equation expresses the fact that the value of a state
under an optimal policy must equal the expected return for the best action
from that state:
v∗(s) = max
a∈A(s)
qπ∗ (s, a)
= max
a Eπ∗[Gt | St = s, At = a]
= max
a Eπ∗
[ ∞ ∑
k=0
γkRt+k+1
∣
∣
∣
∣
∣ St = s, At = a
]
= max
a Eπ∗
[
Rt+1 + γ
∞ ∑
k=0
γkRt+k+2
∣
∣
∣
∣
∣ St = s, At = a
]
= max
a E[Rt+1 + γv∗(St+1) | St = s, At = a] (3.16)
= max
a∈A(s)
∑
s′,r
p(s′, r|s, a)[r + γv∗(s′)]. (3.17)
The last two equations are two forms of the Bellman optimality equation for
v∗. The Bellman optimality equation for q∗ is
q∗(s, a) = E
[
Rt+1 + γ max
a′ q∗(St+1, a′)
∣
∣
∣ St = s, At = a
]
= ∑
s′,r
p(s′, r|s, a)
[
r + γ max
a′ q∗(s′, a′)
]
.
The backup diagrams in Figure 3.7 show graphically the spans of future
states and actions considered in the Bellman optimality equations for v∗ and
q∗. These are the same as the backup diagrams for vπ and qπ except that arcs
have been added at the agent’s choice points to represent that the maximum
over that choice is taken rather than the expected value given some policy.
Figure 3.7a graphically represents the Bellman optimality equation (3.17).
For finite MDPs, the Bellman optimality equation (3.17) has a unique solution independent of the policy. The Bellman optimality equation is actually
a system of equations, one for each state, so if there are N states, then there
are N equations in N unknowns. If the dynamics of the environment are
known (p(s′, r|s, a)), then in principle one can solve this system of equations

-- 90 of 352 --

3.8. OPTIMAL VALUE FUNCTIONS 77
s,a s
a
s'
r
a'
s'
r
(b) (a)
max
max
Figure 3.7: Backup diagrams for (a) v∗ and (b) q∗
for v∗ using any one of a variety of methods for solving systems of nonlinear
equations. One can solve a related set of equations for q∗.
Once one has v∗, it is relatively easy to determine an optimal policy. For
each state s, there will be one or more actions at which the maximum is obtained in the Bellman optimality equation. Any policy that assigns nonzero
probability only to these actions is an optimal policy. You can think of this
as a one-step search. If you have the optimal value function, v∗, then the
actions that appear best after a one-step search will be optimal actions. Another way of saying this is that any policy that is greedy with respect to
the optimal evaluation function v∗ is an optimal policy. The term greedy is
used in computer science to describe any search or decision procedure that
selects alternatives based only on local or immediate considerations, without
considering the possibility that such a selection may prevent future access to
even better alternatives. Consequently, it describes policies that select actions
based only on their short-term consequences. The beauty of v∗ is that if one
uses it to evaluate the short-term consequences of actions—specifically, the
one-step consequences—then a greedy policy is actually optimal in the longterm sense in which we are interested because v∗ already takes into account
the reward consequences of all possible future behavior. By means of v∗, the
optimal expected long-term return is turned into a quantity that is locally and
immediately available for each state. Hence, a one-step-ahead search yields
the long-term optimal actions.
Having q∗ makes choosing optimal actions still easier. With q∗, the agent
does not even have to do a one-step-ahead search: for any state s, it can simply
find any action that maximizes q∗(s, a). The action-value function effectively
caches the results of all one-step-ahead searches. It provides the optimal expected long-term return as a value that is locally and immediately available
for each state–action pair. Hence, at the cost of representing a function of
state–action pairs, instead of just of states, the optimal action-value function
allows optimal actions to be selected without having to know anything about
possible successor states and their values, that is, without having to know

---

## [Sección 43] Chapter 3

-- 91 of 352 --

78 CHAPTER 3. FINITE MARKOV DECISION PROCESSES
anything about the environment’s dynamics.
Example 3.11: Bellman Optimality Equations for the Recycling
Robot Using (3.17), we can explicitly give the Bellman optimality equation
for the recycling robot example. To make things more compact, we abbreviate the states high and low, and the actions search, wait, and recharge
respectively by h, l, s, w, and re. Since there are only two states, the Bellman
optimality equation consists of two equations. The equation for v∗(h) can be
written as follows:
v∗(h) = max
{ p(h|h, s)[r(h, s, h) + γv∗(h)] + p(l|h, s)[r(h, s, l) + γv∗(l)],
p(h|h, w)[r(h, w, h) + γv∗(h)] + p(l|h, w)[r(h, w, l) + γv∗(l)]
}
= max
{ α[rs + γv∗(h)] + (1 − α)[rs + γv∗(l)],
1[rw + γv∗(h)] + 0[rw + γv∗(l)]
}
= max
{ rs + γ[αv∗(h) + (1 − α)v∗(l)],
rw + γv∗(h)
}
.
Following the same procedure for v∗(l) yields the equation
v∗(l) = max



βrs − 3(1 − β) + γ[(1 − β)v∗(h) + βv∗(l)]
rw + γv∗(l),
γv∗(h)


 .
For any choice of rs, rw, α, β, and γ, with 0 ≤ γ < 1, 0 ≤ α, β ≤ 1, there is
exactly one pair of numbers, v∗(h) and v∗(l), that simultaneously satisfy these
two nonlinear equations.
Example 3.12: Solving the Gridworld Suppose we solve the Bellman
equation for v∗ for the simple grid task introduced in Example 3.8 and shown
again in Figure 3.8a. Recall that state A is followed by a reward of +10 and
transition to state A′, while state B is followed by a reward of +5 and transition
to state B′. Figure 3.8b shows the optimal value function, and Figure 3.8c
shows the corresponding optimal policies. Where there are multiple arrows in
a cell, any of the corresponding actions is optimal.
Explicitly solving the Bellman optimality equation provides one route to
finding an optimal policy, and thus to solving the reinforcement learning problem. However, this solution is rarely directly useful. It is akin to an exhaustive
search, looking ahead at all possibilities, computing their probabilities of occurrence and their desirabilities in terms of expected rewards. This solution
relies on at least three assumptions that are rarely true in practice: (1) we
accurately know the dynamics of the environment; (2) we have enough computational resources to complete the computation of the solution; and (3) the
Markov property. For the kinds of tasks in which we are interested, one is

-- 92 of 352 --

3.9. OPTIMALITY AND APPROXIMATION 79
a) gridworld b) V* c) !*
22.0 24.4 22.0 19.4 17.5
19.8 22.0 19.8 17.8 16.0
17.8 19.8 17.8 16.0 14.4
16.0 17.8 16.0 14.4 13.0
14.4 16.0 14.4 13.0 11.7
A B
A'
B' +10
+5
v* π*
Figure 3.8: Optimal solutions to the gridworld example.
generally not able to implement this solution exactly because various combinations of these assumptions are violated. For example, although the first
and third assumptions present no problems for the game of backgammon, the
second is a major impediment. Since the game has about 1020 states, it would
take thousands of years on today’s fastest computers to solve the Bellman
equation for v∗, and the same is true for finding q∗. In reinforcement learning
one typically has to settle for approximate solutions.
Many different decision-making methods can be viewed as ways of approximately solving the Bellman optimality equation. For example, heuristic
search methods can be viewed as expanding the right-hand side of (3.17) several times, up to some depth, forming a “tree” of possibilities, and then using
a heuristic evaluation function to approximate v∗ at the “leaf” nodes. (Heuristic search methods such as A∗ are almost always based on the episodic case.)
The methods of dynamic programming can be related even more closely to
the Bellman optimality equation. Many reinforcement learning methods can
be clearly understood as approximately solving the Bellman optimality equation, using actual experienced transitions in place of knowledge of the expected
transitions. We consider a variety of such methods in the following chapters.
3.9 Optimality and Approximation
We have defined optimal value functions and optimal policies. Clearly, an
agent that learns an optimal policy has done very well, but in practice this
rarely happens. For the kinds of tasks in which we are interested, optimal
policies can be generated only with extreme computational cost. A well-defined
notion of optimality organizes the approach to learning we describe in this book
and provides a way to understand the theoretical properties of various learning
algorithms, but it is an ideal that agents can only approximate to varying
degrees. As we discussed above, even if we have a complete and accurate
model of the environment’s dynamics, it is usually not possible to simply

---

## [Sección 44] Chapter 3

-- 93 of 352 --

80 CHAPTER 3. FINITE MARKOV DECISION PROCESSES
compute an optimal policy by solving the Bellman optimality equation. For
example, board games such as chess are a tiny fraction of human experience,
yet large, custom-designed computers still cannot compute the optimal moves.
A critical aspect of the problem facing the agent is always the computational
power available to it, in particular, the amount of computation it can perform
in a single time step.
The memory available is also an important constraint. A large amount
of memory is often required to build up approximations of value functions,
policies, and models. In tasks with small, finite state sets, it is possible to
form these approximations using arrays or tables with one entry for each state
(or state–action pair). This we call the tabular case, and the corresponding
methods we call tabular methods. In many cases of practical interest, however,
there are far more states than could possibly be entries in a table. In these
cases the functions must be approximated, using some sort of more compact
parameterized function representation.
Our framing of the reinforcement learning problem forces us to settle for
approximations. However, it also presents us with some unique opportunities
for achieving useful approximations. For example, in approximating optimal behavior, there may be many states that the agent faces with such a low
probability that selecting suboptimal actions for them has little impact on the
amount of reward the agent receives. Tesauro’s backgammon player, for example, plays with exceptional skill even though it might make very bad decisions
on board configurations that never occur in games against experts. In fact, it
is possible that TD-Gammon makes bad decisions for a large fraction of the
game’s state set. The on-line nature of reinforcement learning makes it possible to approximate optimal policies in ways that put more effort into learning
to make good decisions for frequently encountered states, at the expense of
less effort for infrequently encountered states. This is one key property that
distinguishes reinforcement learning from other approaches to approximately
solving MDPs.
3.10 Summary
Let us summarize the elements of the reinforcement learning problem that
we have presented in this chapter. Reinforcement learning is about learning
from interaction how to behave in order to achieve a goal. The reinforcement
learning agent and its environment interact over a sequence of discrete time
steps. The specification of their interface defines a particular task: the actions
are the choices made by the agent; the states are the basis for making the
choices; and the rewards are the basis for evaluating the choices. Everything

-- 94 of 352 --

3.10. SUMMARY 81
inside the agent is completely known and controllable by the agent; everything
outside is incompletely controllable but may or may not be completely known.
A policy is a stochastic rule by which the agent selects actions as a function of
states. The agent’s objective is to maximize the amount of reward it receives
over time.
The return is the function of future rewards that the agent seeks to maximize. It has several different definitions depending upon the nature of the
task and whether one wishes to discount delayed reward. The undiscounted
formulation is appropriate for episodic tasks, in which the agent–environment
interaction breaks naturally into episodes; the discounted formulation is appropriate for continuing tasks, in which the interaction does not naturally break
into episodes but continues without limit.
An environment satisfies the Markov property if its state signal compactly
summarizes the past without degrading the ability to predict the future. This
is rarely exactly true, but often nearly so; the state signal should be chosen or
constructed so that the Markov property holds as nearly as possible. In this
book we assume that this has already been done and focus on the decisionmaking problem: how to decide what to do as a function of whatever state
signal is available. If the Markov property does hold, then the environment is
called a Markov decision process (MDP). A finite MDP is an MDP with finite
state and action sets. Most of the current theory of reinforcement learning is
restricted to finite MDPs, but the methods and ideas apply more generally.
A policy’s value functions assign to each state, or state–action pair, the
expected return from that state, or state–action pair, given that the agent uses
the policy. The optimal value functions assign to each state, or state–action
pair, the largest expected return achievable by any policy. A policy whose value
functions are optimal is an optimal policy. Whereas the optimal value functions
for states and state–action pairs are unique for a given MDP, there can be many
optimal policies. Any policy that is greedy with respect to the optimal value
functions must be an optimal policy. The Bellman optimality equations are
special consistency condition that the optimal value functions must satisfy and
that can, in principle, be solved for the optimal value functions, from which
an optimal policy can be determined with relative ease.
A reinforcement learning problem can be posed in a variety of different ways
depending on assumptions about the level of knowledge initially available to
the agent. In problems of complete knowledge, the agent has a complete and
accurate model of the environment’s dynamics. If the environment is an MDP,
then such a model consists of the one-step transition probabilities and expected
rewards for all states and their allowable actions. In problems of incomplete
knowledge, a complete and perfect model of the environment is not available.

---

## [Sección 45] Chapter 3

-- 95 of 352 --

82 CHAPTER 3. FINITE MARKOV DECISION PROCESSES
Even if the agent has a complete and accurate environment model, the
agent is typically unable to perform enough computation per time step to fully
use it. The memory available is also an important constraint. Memory may
be required to build up accurate approximations of value functions, policies,
and models. In most cases of practical interest there are far more states than
could possibly be entries in a table, and approximations must be made.
A well-defined notion of optimality organizes the approach to learning we
describe in this book and provides a way to understand the theoretical properties of various learning algorithms, but it is an ideal that reinforcement
learning agents can only approximate to varying degrees. In reinforcement
learning we are very much concerned with cases in which optimal solutions
cannot be found but must be approximated in some way.
Bibliographical and Historical Remarks
The reinforcement learning problem is deeply indebted to the idea of Markov
decision processes (MDPs) from the field of optimal control. These historical influences and other major influences from psychology are described in
the brief history given in Chapter 1. Reinforcement learning adds to MDPs a
focus on approximation and incomplete information for realistically large problems. MDPs and the reinforcement learning problem are only weakly linked
to traditional learning and decision-making problems in artificial intelligence.
However, artificial intelligence is now vigorously exploring MDP formulations
for planning and decision-making from a variety of perspectives. MDPs are
more general than previous formulations used in artificial intelligence in that
they permit more general kinds of goals and uncertainty.
Our presentation of the reinforcement learning problem was influenced by
Watkins (1989).
3.1 The bioreactor example is based on the work of Ungar (1990) and Miller
and Williams (1992). The recycling robot example was inspired by the
can-collecting robot built by Jonathan Connell (1989).
3.3–4 The terminology of episodic and continuing tasks is different from that
usually used in the MDP literature. In that literature it is common
to distinguish three types of tasks: (1) finite-horizon tasks, in which
interaction terminates after a particular fixed number of time steps; (2)
indefinite-horizon tasks, in which interaction can last arbitrarily long
but must eventually terminate; and (3) infinite-horizon tasks, in which
interaction does not terminate. Our episodic and continuing tasks are

-- 96 of 352 --

3.10. SUMMARY 83
similar to indefinite-horizon and infinite-horizon tasks, respectively, but
we prefer to emphasize the difference in the nature of the interaction.
This difference seems more fundamental than the difference in the objective functions emphasized by the usual terms. Often episodic tasks
use an indefinite-horizon objective function and continuing tasks an
infinite-horizon objective function, but we see this as a common coincidence rather than a fundamental difference.
The pole-balancing example is from Michie and Chambers (1968) and
Barto, Sutton, and Anderson (1983).
3.5 For further discussion of the concept of state, see Minsky (1967).
3.6 The theory of MDPs is treated by, e.g., Bertsekas (1995), Ross (1983),
White (1969), and Whittle (1982, 1983). This theory is also studied
under the heading of stochastic optimal control, where adaptive optimal
control methods are most closely related to reinforcement learning (e.g.,
Kumar, 1985; Kumar and Varaiya, 1986).
The theory of MDPs evolved from efforts to understand the problem
of making sequences of decisions under uncertainty, where each decision can depend on the previous decisions and their outcomes. It is
sometimes called the theory of multistage decision processes, or sequential decision processes, and has roots in the statistical literature
on sequential sampling beginning with the papers by Thompson (1933,
1934) and Robbins (1952) that we cited in Chapter 2 in connection
with bandit problems (which are prototypical MDPs if formulated as
multiple-situation problems).
The earliest instance of which we are aware in which reinforcement
learning was discussed using the MDP formalism is Andreae’s (1969b)
description of a unified view of learning machines. Witten and Corbin
(1973) experimented with a reinforcement learning system later analyzed by Witten (1977) using the MDP formalism. Although he did not
explicitly mention MDPs, Werbos (1977) suggested approximate solution methods for stochastic optimal control problems that are related to
modern reinforcement learning methods (see also Werbos, 1982, 1987,
1988, 1989, 1992). Although Werbos’s ideas were not widely recognized
at the time, they were prescient in emphasizing the importance of approximately solving optimal control problems in a variety of domains,
including artificial intelligence. The most influential integration of reinforcement learning and MDPs is due to Watkins (1989). His treatment
of reinforcement learning using the MDP formalism has been widely
adopted.

---

## [Sección 46] Chapter 3

-- 97 of 352 --

84 CHAPTER 3. FINITE MARKOV DECISION PROCESSES
Our characterization of the dynamics of an MDP in terms of p(s′, r|s, a)
is slightly unusual. It is more common in the MDP literature to describe
the dynamics in terms of the state transition probabilities p(s′|s, a) and
expected next rewards r(s, a). In reinforcement learning, however, we
more often have to refer to individual actual or sample rewards (rather
than just their expected values). Our notation also makes it plainer that
St and Rt are in general jointly determined, and thus must have the
same time index. In teaching reinforcement learning, we have found
our notation to be more straightforward conceptually and easier to
understand.
3.7–8 Assigning value on the basis of what is good or bad in the long run has
ancient roots. In control theory, mapping states to numerical values
representing the long-term consequences of control decisions is a key
part of optimal control theory, which was developed in the 1950s by extending nineteenth century state-function theories of classical mechanics (see, e.g., Schultz and Melsa, 1967). In describing how a computer
could be programmed to play chess, Shannon (1950) suggested using
an evaluation function that took into account the long-term advantages
and disadvantages of chess positions.
Watkins’s (1989) Q-learning algorithm for estimating q∗ (Chapter 6)
made action-value functions an important part of reinforcement learning, and consequently these functions are often called Q-functions. But
the idea of an action-value function is much older than this. Shannon
(1950) suggested that a function h(P, M ) could be used by a chessplaying program to decide whether a move M in position P is worth
exploring. Michie’s (1961, 1963) MENACE system and Michie and
Chambers’s (1968) BOXES system can be understood as estimating
action-value functions. In classical physics, Hamilton’s principal function is an action-value function; Newtonian dynamics are greedy with
respect to this function (e.g., Goldstein, 1957). Action-value functions
also played a central role in Denardo’s (1967) theoretical treatment of
DP in terms of contraction mappings.
What we call the Bellman equation for v∗ was first introduced by
Richard Bellman (1957a), who called it the “basic functional equation.” The counterpart of the Bellman optimality equation for continuous time and state problems is known as the Hamilton–Jacobi–Bellman
equation (or often just the Hamilton–Jacobi equation), indicating its
roots in classical physics (e.g., Schultz and Melsa, 1967).
The golf example was suggested by Chris Watkins.

-- 98 of 352 --

3.10. SUMMARY 85
Exercises
Exercise 3.1 Devise three example tasks of your own that fit into the reinforcement learning framework, identifying for each its states, actions, and
rewards. Make the three examples as different from each other as possible.
The framework is abstract and flexible and can be applied in many different
ways. Stretch its limits in some way in at least one of your examples.
Exercise 3.2 Is the reinforcement learning framework adequate to usefully
represent all goal-directed learning tasks? Can you think of any clear exceptions?
Exercise 3.3 Consider the problem of driving. You could define the actions
in terms of the accelerator, steering wheel, and brake, that is, where your
body meets the machine. Or you could define them farther out—say, where
the rubber meets the road, considering your actions to be tire torques. Or
you could define them farther in—say, where your brain meets your body, the
actions being muscle twitches to control your limbs. Or you could go to a
really high level and say that your actions are your choices of where to drive.
What is the right level, the right place to draw the line between agent and
environment? On what basis is one location of the line to be preferred over
another? Is there any fundamental reason for preferring one location over
another, or is it a free choice?
Exercise 3.4 Suppose you treated pole-balancing as an episodic task but
also used discounting, with all rewards zero except for −1 upon failure. What
then would the return be at each time? How does this return differ from that
in the discounted, continuing formulation of this task?
Exercise 3.5 Imagine that you are designing a robot to run a maze. You decide to give it a reward of +1 for escaping from the maze and a reward of zero
at all other times. The task seems to break down naturally into episodes—the
successive runs through the maze—so you decide to treat it as an episodic task,
where the goal is to maximize expected total reward (3.1). After running the
learning agent for a while, you find that it is showing no improvement in escaping from the maze. What is going wrong? Have you effectively communicated
to the agent what you want it to achieve?
Exercise 3.6: Broken Vision System Imagine that you are a vision
system. When you are first turned on for the day, an image floods into your
camera. You can see lots of things, but not all things. You can’t see objects
that are occluded, and of course you can’t see objects that are behind you.
After seeing that first scene, do you have access to the Markov state of the
environment? Suppose your camera was broken that day and you received no

---

## [Sección 47] Chapter 3

-- 99 of 352 --

86 CHAPTER 3. FINITE MARKOV DECISION PROCESSES
images at all, all day. Would you have access to the Markov state then?
Exercise 3.7 There is no exercise 3.7.
Exercise 3.8 What is the Bellman equation for action values, that is, for qπ?
It must give the action value qπ(s, a) in terms of the action values, qπ(s′, a′),
of possible successors to the state–action pair (s, a). As a hint, the backup
diagram corresponding to this equation is given in Figure 3.4b. Show the
sequence of equations analogous to (3.12), but for action values.
Exercise 3.9 The Bellman equation (3.12) must hold for each state for the
value function vπ shown in Figure 3.5b. As an example, show numerically that
this equation holds for the center state, valued at +0.7, with respect to its four
neighboring states, valued at +2.3, +0.4, −0.4, and +0.7. (These numbers are
accurate only to one decimal place.)
Exercise 3.10 In the gridworld example, rewards are positive for goals,
negative for running into the edge of the world, and zero the rest of the time.
Are the signs of these rewards important, or only the intervals between them?
Prove, using (3.2), that adding a constant c to all the rewards adds a constant,
vc, to the values of all states, and thus does not affect the relative values of
any states under any policies. What is vc in terms of c and γ?
Exercise 3.11 Now consider adding a constant c to all the rewards in an
episodic task, such as maze running. Would this have any effect, or would it
leave the task unchanged as in the continuing task above? Why or why not?
Give an example.
Exercise 3.12 The value of a state depends on the the values of the actions
possible in that state and on how likely each action is to be taken under the
current policy. We can think of this in terms of a small backup diagram rooted
at the state and considering each possible action:
s
a1 a2 a3
V !(s)
Q!(s,a)
taken with
probability !(s,a)
vπ(s)
qπ(s,a)
π(a|s)
Give the equation corresponding to this intuition and diagram for the value at
the root node, vπ(s), in terms of the value at the expected leaf node, qπ(s, a),
given St = s. This expectation depends on the policy, π. Then give a second
equation in which the expected value is written out explicitly in terms of π(a|s)
such that no expected value notation appears in the equation.
Exercise 3.13 The value of an action, qπ(s, a), depends on the expected
next reward and the expected sum of the remaining rewards. Again we can

-- 100 of 352 --

3.10. SUMMARY 87
think of this in terms of a small backup diagram, this one rooted at an action
(state–action pair) and branching to the possible next states:
s,a
V !(s)
Q!(s,a)
s1' s2 s3
r1 r2 r3
' '
vπ(s)
qπ(s,a) expected
rewards
Give the equation corresponding to this intuition and diagram for the action
value, qπ(s, a), in terms of the expected next reward, Rt+1, and the expected
next state value, vπ(St+1), given that St = s and At = a. Then give a second
equation, writing out the expected value explicitly in terms of p(s′, r|s, a)
defined by (3.6), such that no expected value notation appears in the equation.
Exercise 3.14 Draw or describe the optimal state-value function for the golf
example.
Exercise 3.15 Draw or describe the contours of the optimal action-value
function for putting, q∗(s, putter), for the golf example.
Exercise 3.16 Give the Bellman equation for q∗ for the recycling robot.
Exercise 3.17 Figure 3.8 gives the optimal value of the best state of the
gridworld as 24.4, to one decimal place. Use your knowledge of the optimal
policy and (3.2) to express this value symbolically, and then to compute it to
three decimal places.
Exercise 3.18 Give a definition of v∗ in terms of q∗.
Exercise 3.19 Give a definition of q∗ in terms of v∗.
Exercise 3.20 Give a definition of π∗ in terms of q∗.
Exercise 3.21 Give a definition of π∗ in terms of v∗.

-- 101 of 352 --

88 CHAPTER 3. FINITE MARKOV DECISION PROCESSES

-- 102 of 352 --

---

## [Sección 48] Chapter 4

Dynamic Programming
The term dynamic programming (DP) refers to a collection of algorithms that
can be used to compute optimal policies given a perfect model of the environment as a Markov decision process (MDP). Classical DP algorithms are of
limited utility in reinforcement learning both because of their assumption of
a perfect model and because of their great computational expense, but they
are still important theoretically. DP provides an essential foundation for the
understanding of the methods presented in the rest of this book. In fact, all
of these methods can be viewed as attempts to achieve much the same effect
as DP, only with less computation and without assuming a perfect model of
the environment.
Starting with this chapter, we usually assume that the environment is a
finite MDP. That is, we assume that its state, action, and reward sets, S,
A(s), and R, for s ∈ S, are finite, and that its dynamics are given by a set of
probabilities p(s′, r|s, a), for all s ∈ S, a ∈ A(s), r ∈ R, and s′ ∈ S+ (S+ is S
plus a terminal state if the problem is episodic). Although DP ideas can be
applied to problems with continuous state and action spaces, exact solutions
are possible only in special cases. A common way of obtaining approximate
solutions for tasks with continuous states and actions is to quantize the state
and action spaces and then apply finite-state DP methods. The methods we
explore in Chapter 9 are applicable to continuous problems and are a significant
extension of that approach.
The key idea of DP, and of reinforcement learning generally, is the use of
value functions to organize and structure the search for good policies. In this
chapter we show how DP can be used to compute the value functions defined
in Chapter 3. As discussed there, we can easily obtain optimal policies once
we have found the optimal value functions, v∗ or q∗, which satisfy the Bellman
-- 103 of 352 --

90 CHAPTER 4. DYNAMIC PROGRAMMING
optimality equations:
v∗(s) = max
a E[Rt+1 + γv∗(St+1) | St = s, At = a]
= max
a
∑
s′,r
p(s′, r|s, a)
[
r + γv∗(s′)
]
(4.1)
or
q∗(s, a) = E
[
Rt+1 + γ max
a′ q∗(St+1, a′)
∣
∣
∣ St = s, At = a
]
= ∑
s′,r
p(s′, r|s, a)
[
r + γ max
a′ q∗(s′, a′)
]
, (4.2)
for all s ∈ S, a ∈ A(s), and s′ ∈ S+. As we shall see, DP algorithms are
obtained by turning Bellman equations such as these into assignments, that is,
into update rules for improving approximations of the desired value functions.
4.1 Policy Evaluation
First we consider how to compute the state-value function vπ for an arbitrary
policy π. This is called policy evaluation in the DP literature. We also refer
to it as the prediction problem. Recall from Chapter 3 that, for all s ∈ S,
vπ(s) = Eπ
[Rt+1 + γRt+2 + γ2Rt+3 + · · · ∣
∣ St = s]
= Eπ[Rt+1 + γvπ(St+1) | St = s] (4.3)
= ∑
a
π(a|s) ∑
s′,r
p(s′, r|s, a)
[
r + γvπ(s′)
]
, (4.4)
where π(a|s) is the probability of taking action a in state s under policy π, and
the expectations are subscripted by π to indicate that they are conditional on
π being followed. The existence and uniqueness of vπ are guaranteed as long
as either γ < 1 or eventual termination is guaranteed from all states under the
policy π.
If the environment’s dynamics are completely known, then (4.4) is a system
of |S| simultaneous linear equations in |S| unknowns (the vπ(s), s ∈ S). In
principle, its solution is a straightforward, if tedious, computation. For our
purposes, iterative solution methods are most suitable. Consider a sequence of
approximate value functions v0, v1, v2, . . ., each mapping S+ to R. The initial
approximation, v0, is chosen arbitrarily (except that the terminal state, if any,

-- 104 of 352 --

4.1. POLICY EVALUATION 91
must be given value 0), and each successive approximation is obtained by using
the Bellman equation for vπ (3.12) as an update rule:
vk+1(s) = Eπ[Rt+1 + γvk(St+1) | St = s]
= ∑
a
π(a|s) ∑
s′,r
p(s′, r|s, a)
[
r + γvk(s′)
]
, (4.5)
for all s ∈ S. Clearly, vk = vπ is a fixed point for this update rule because
the Bellman equation for vπ assures us of equality in this case. Indeed, the
sequence {vk} can be shown in general to converge to vπ as k → ∞ under the
same conditions that guarantee the existence of vπ. This algorithm is called
iterative policy evaluation.
To produce each successive approximation, vk+1 from vk, iterative policy
evaluation applies the same operation to each state s: it replaces the old value
of s with a new value obtained from the old values of the successor states
of s, and the expected immediate rewards, along all the one-step transitions
possible under the policy being evaluated. We call this kind of operation a
full backup. Each iteration of iterative policy evaluation backs up the value of
every state once to produce the new approximate value function vk+1. There
are several different kinds of full backups, depending on whether a state (as
here) or a state–action pair is being backed up, and depending on the precise
way the estimated values of the successor states are combined. All the backups
done in DP algorithms are called full backups because they are based on all
possible next states rather than on a sample next state. The nature of a
backup can be expressed in an equation, as above, or in a backup diagram
like those introduced in Chapter 3. For example, Figure 3.4a is the backup
diagram corresponding to the full backup used in iterative policy evaluation.
To write a sequential computer program to implement iterative policy evaluation, as given by (4.5), you would have to use two arrays, one for the old
values, vk(s), and one for the new values, vk+1(s). This way, the new values
can be computed one by one from the old values without the old values being
changed. Of course it is easier to use one array and update the values “in
place,” that is, with each new backed-up value immediately overwriting the
old one. Then, depending on the order in which the states are backed up,
sometimes new values are used instead of old ones on the right-hand side of
(4.5). This slightly different algorithm also converges to vπ; in fact, it usually
converges faster than the two-array version, as you might expect, since it uses
new data as soon as they are available. We think of the backups as being done
in a sweep through the state space. For the in-place algorithm, the order in
which states are backed up during the sweep has a significant influence on the
rate of convergence. We usually have the in-place version in mind when we
think of DP algorithms.

---

## [Sección 49] Chapter 4

-- 105 of 352 --

92 CHAPTER 4. DYNAMIC PROGRAMMING
Input π, the policy to be evaluated
Initialize an array V (s) = 0, for all s ∈ S+
Repeat
∆ ← 0
For each s ∈ S:
v ← V (s)
V (s) ← ∑
a π(a|s) ∑
s′,r p(s′, r|s, a)[r + γV (s′)]
∆ ← max(∆, |v − V (s)|)
until ∆ < θ (a small positive number)
Output V ≈ vπ
Figure 4.1: Iterative policy evaluation.
Another implementation point concerns the termination of the algorithm.
Formally, iterative policy evaluation converges only in the limit, but in practice
it must be halted short of this. A typical stopping condition for iterative policy
evaluation is to test the quantity maxs∈S |vk+1(s) − vk(s)| after each sweep and
stop when it is sufficiently small. Figure 4.1 gives a complete algorithm for
iterative policy evaluation with this stopping criterion.
Example 4.1 Consider the 4×4 gridworld shown below.
actions
r = !1
on all transitions
1 2 3
4 5 6 7
8 9 10 11
12 13 14
R
The nonterminal states are S = {1, 2, . . . , 14}. There are four actions possible in each state, A = {up, down, right, left}, which deterministically
cause the corresponding state transitions, except that actions that would take
the agent off the grid in fact leave the state unchanged. Thus, for instance,
p(6|5, right) = 1, p(10|5, right) = 0, and p(7|7, right) = 1. This is an undiscounted, episodic task. The reward is −1 on all transitions until the terminal
state is reached. The terminal state is shaded in the figure (although it is
shown in two places, it is formally one state). The expected reward function is
thus r(s, a, s′) = −1 for all states s, s′ and actions a. Suppose the agent follows
the equiprobable random policy (all actions equally likely). The left side of
Figure 4.2 shows the sequence of value functions {vk} computed by iterative
policy evaluation. The final estimate is in fact vπ, which in this case gives for
each state the negation of the expected number of steps from that state until

-- 106 of 352 --

4.1. POLICY EVALUATION 93
0.0 0.0 0.0
0.0 0.0 0.0 0.0
0.0 0.0 0.0 0.0
0.0 0.0 0.0
-1.0 -1.0 -1.0
-1.0 -1.0 -1.0 -1.0
-1.0 -1.0 -1.0 -1.0
-1.0 -1.0 -1.0
-1.7 -2.0 -2.0
-1.7 -2.0 -2.0 -2.0
-2.0 -2.0 -2.0 -1.7
-2.0 -2.0 -1.7
-2.4 -2.9 -3.0
-2.4 -2.9 -3.0 -2.9
-2.9 -3.0 -2.9 -2.4
-3.0 -2.9 -2.4
-6.1 -8.4 -9.0
-6.1 -7.7 -8.4 -8.4
-8.4 -8.4 -7.7 -6.1
-9.0 -8.4 -6.1
-14. -20. -22.
-14. -18. -20. -20.
-20. -20. -18. -14.
-22. -20. -14.
Vk for the
Random Policy
Greedy Policy
w.r.t. V k
k = 0
k = 1
k = 2
k = 10
k = !
k = 3
optimal
policy
random
policy
0.0
0.0
0.0
0.0
0.0
0.0
0.0
0.0
0.0
0.0
0.0
0.0
vk
vk
Figure 4.2: Convergence of iterative policy evaluation on a small gridworld.
The left column is the sequence of approximations of the state-value function
for the random policy (all actions equal). The right column is the sequence
of greedy policies corresponding to the value function estimates (arrows are
shown for all actions achieving the maximum). The last policy is guaranteed
only to be an improvement over the random policy, but in this case it, and all
policies after the third iteration, are optimal.

-- 107 of 352 --

94 CHAPTER 4. DYNAMIC PROGRAMMING
termination.
4.2 Policy Improvement
Our reason for computing the value function for a policy is to help find better
policies. Suppose we have determined the value function vπ for an arbitrary
deterministic policy π. For some state s we would like to know whether or not
we should change the policy to deterministically choose an action a 6 = π(s).
We know how good it is to follow the current policy from s—that is vπ(s)—but
would it be better or worse to change to the new policy? One way to answer
this question is to consider selecting a in s and thereafter following the existing
policy, π. The value of this way of behaving is
qπ(s, a) = Eπ[Rt+1 + γvπ(St+1) | St = s, At = a] (4.6)
= ∑
s′,r
p(s′, r|s, a)
[
r + γvπ(s′)
]
.
The key criterion is whether this is greater than or less than vπ(s). If it is
greater—that is, if it is better to select a once in s and thereafter follow π
than it would be to follow π all the time—then one would expect it to be
better still to select a every time s is encountered, and that the new policy
would in fact be a better one overall.
That this is true is a special case of a general result called the policy
improvement theorem. Let π and π′ be any pair of deterministic policies such
that, for all s ∈ S,
qπ(s, π′(s)) ≥ vπ(s). (4.7)
Then the policy π′ must be as good as, or better than, π. That is, it must
obtain greater or equal expected return from all states s ∈ S:
vπ′ (s) ≥ vπ(s). (4.8)
Moreover, if there is strict inequality of (4.7) at any state, then there must be
strict inequality of (4.8) at at least one state. This result applies in particular
to the two policies that we considered in the previous paragraph, an original
deterministic policy, π, and a changed policy, π′, that is identical to π except
that π′(s) = a 6 = π(s). Obviously, (4.7) holds at all states other than s. Thus,
if qπ(s, a) > vπ(s), then the changed policy is indeed better than π.
The idea behind the proof of the policy improvement theorem is easy to
understand. Starting from (4.7), we keep expanding the qπ side and reapplying

---

## [Sección 50] Chapter 4

-- 108 of 352 --

4.2. POLICY IMPROVEMENT 95
(4.7) until we get vπ′ (s):
vπ(s) ≤ qπ(s, π′(s))
= Eπ′[Rt+1 + γvπ(St+1) | St = s]
≤ Eπ′[Rt+1 + γqπ(St+1, π′(St+1)) | St = s]
= Eπ′[Rt+1 + γEπ′[Rt+2 + γvπ(St+2)] | St = s]
= Eπ′
[Rt+1 + γRt+2 + γ2vπ(St+2) ∣
∣ St = s]
≤ Eπ′
[Rt+1 + γRt+2 + γ2Rt+3 + γ3vπ(St+3) ∣
∣ St = s]
...
≤ Eπ′
[Rt+1 + γRt+2 + γ2Rt+3 + γ3Rt+4 + · · · ∣
∣ St = s]
= vπ′ (s).
So far we have seen how, given a policy and its value function, we can easily
evaluate a change in the policy at a single state to a particular action. It is a
natural extension to consider changes at all states and to all possible actions,
selecting at each state the action that appears best according to qπ(s, a). In
other words, to consider the new greedy policy, π′, given by
π′(s) = argmax
a
qπ(s, a)
= argmax
a
E[Rt+1 + γvπ(St+1) | St = s, At = a] (4.9)
= argmax
a
∑
s′,r
p(s′, r|s, a)
[
r + γvπ(s′)
]
,
where argmaxa denotes the value of a at which the expression that follows is
maximized (with ties broken arbitrarily). The greedy policy takes the action
that looks best in the short term—after one step of lookahead—according to
vπ. By construction, the greedy policy meets the conditions of the policy
improvement theorem (4.7), so we know that it is as good as, or better than,
the original policy. The process of making a new policy that improves on an
original policy, by making it greedy with respect to the value function of the
original policy, is called policy improvement.
Suppose the new greedy policy, π′, is as good as, but not better than, the
old policy π. Then vπ = vπ′ , and from (4.9) it follows that for all s ∈ S:
vπ′ (s) = max
a E[Rt+1 + γvπ′ (St+1) | St = s, At = a]
= max
a
∑
s′,r
p(s′, r|s, a)
[
r + γvπ′ (s′)
]
.

-- 109 of 352 --

96 CHAPTER 4. DYNAMIC PROGRAMMING
But this is the same as the Bellman optimality equation (4.1), and therefore,
vπ′ must be v∗, and both π and π′ must be optimal policies. Policy improvement thus must give us a strictly better policy except when the original policy
is already optimal.
So far in this section we have considered the special case of deterministic
policies. In the general case, a stochastic policy π specifies probabilities, π(a|s),
for taking each action, a, in each state, s. We will not go through the details,
but in fact all the ideas of this section extend easily to stochastic policies. In
particular, the policy improvement theorem carries through as stated for the
stochastic case, under the natural definition:
qπ(s, π′(s)) = ∑
a
π′(a|s)qπ(s, a).
In addition, if there are ties in policy improvement steps such as (4.9)—that
is, if there are several actions at which the maximum is achieved—then in the
stochastic case we need not select a single action from among them. Instead,
each maximizing action can be given a portion of the probability of being
selected in the new greedy policy. Any apportioning scheme is allowed as long
as all submaximal actions are given zero probability.
The last row of Figure 4.2 shows an example of policy improvement for
stochastic policies. Here the original policy, π, is the equiprobable random
policy, and the new policy, π′, is greedy with respect to vπ. The value function
vπ is shown in the bottom-left diagram and the set of possible π′ is shown in
the bottom-right diagram. The states with multiple arrows in the π′ diagram
are those in which several actions achieve the maximum in (4.9); any apportionment of probability among these actions is permitted. The value function
of any such policy, vπ′ (s), can be seen by inspection to be either −1, −2, or −3
at all states, s ∈ S, whereas vπ(s) is at most −14. Thus, vπ′ (s) ≥ vπ(s), for all
s ∈ S, illustrating policy improvement. Although in this case the new policy
π′ happens to be optimal, in general only an improvement is guaranteed.
4.3 Policy Iteration
Once a policy, π, has been improved using vπ to yield a better policy, π′, we can
then compute vπ′ and improve it again to yield an even better π′′. We can thus
obtain a sequence of monotonically improving policies and value functions:
π0
E
−→ vπ0
I
−→ π1
E
−→ vπ1
I
−→ π2
E
−→ · · · I
−→ π∗
E
−→ v∗,
where E
−→ denotes a policy evaluation and I
−→ denotes a policy improvement.
Each policy is guaranteed to be a strict improvement over the previous one

---

## [Sección 51] Chapter 4

-- 110 of 352 --

4.3. POLICY ITERATION 97
1. Initialization
V (s) ∈ R and π(s) ∈ A(s) arbitrarily for all s ∈ S
2. Policy Evaluation
Repeat
∆ ← 0
For each s ∈ S:
v ← V (s)
V (s) ← ∑
s′,r p(s′, r|s, π(s))[r + γV (s′)]
∆ ← max(∆, |v − V (s)|)
until ∆ < θ (a small positive number)
3. Policy Improvement
policy-stable ← true
For each s ∈ S:
a ← π(s)
π(s) ← argmaxa
∑
s′,r p(s′, r|s, a)[r + γV (s′)]
If a 6 = π(s), then policy-stable ← f alse
If policy-stable, then stop and return V and π; else go to 2
Figure 4.3: Policy iteration (using iterative policy evaluation) for v∗. This
algorithm has a subtle bug, in that it may never terminate if the policy continually switches between two or more policies that are equally good. The bug
can be fixed by adding additional flags, but it makes the pseudocode so ugly
that it is not worth it. :-)
(unless it is already optimal). Because a finite MDP has only a finite number
of policies, this process must converge to an optimal policy and optimal value
function in a finite number of iterations.
This way of finding an optimal policy is called policy iteration. A complete
algorithm is given in Figure 4.3. Note that each policy evaluation, itself an
iterative computation, is started with the value function for the previous policy.
This typically results in a great increase in the speed of convergence of policy
evaluation (presumably because the value function changes little from one
policy to the next).
Policy iteration often converges in surprisingly few iterations. This is illustrated by the example in Figure 4.2. The bottom-left diagram shows the value
function for the equiprobable random policy, and the bottom-right diagram
shows a greedy policy for this value function. The policy improvement theorem assures us that these policies are better than the original random policy.
In this case, however, these policies are not just better, but optimal, proceed-

-- 111 of 352 --

98 CHAPTER 4. DYNAMIC PROGRAMMING
ing to the terminal states in the minimum number of steps. In this example,
policy iteration would find the optimal policy after just one iteration.
Example 4.2: Jack’s Car Rental Jack manages two locations for a nationwide car rental company. Each day, some number of customers arrive at
each location to rent cars. If Jack has a car available, he rents it out and is
credited $10 by the national company. If he is out of cars at that location,
then the business is lost. Cars become available for renting the day after they
are returned. To help ensure that cars are available where they are needed,
Jack can move them between the two locations overnight, at a cost of $2 per
car moved. We assume that the number of cars requested and returned at
each location are Poisson random variables, meaning that the probability that
the number is n is λn
n! e−λ, where λ is the expected number. Suppose λ is 3
and 4 for rental requests at the first and second locations and 3 and 2 for
returns. To simplify the problem slightly, we assume that there can be no
more than 20 cars at each location (any additional cars are returned to the
nationwide company, and thus disappear from the problem) and a maximum
of five cars can be moved from one location to the other in one night. We take
the discount rate to be γ = 0.9 and formulate this as a continuing finite MDP,
where the time steps are days, the state is the number of cars at each location
at the end of the day, and the actions are the net numbers of cars moved
between the two locations overnight. Figure 4.4 shows the sequence of policies
found by policy iteration starting from the policy that never moves any cars.
4.4 Value Iteration
One drawback to policy iteration is that each of its iterations involves policy
evaluation, which may itself be a protracted iterative computation requiring
multiple sweeps through the state set. If policy evaluation is done iteratively,
then convergence exactly to vπ occurs only in the limit. Must we wait for
exact convergence, or can we stop short of that? The example in Figure 4.2
certainly suggests that it may be possible to truncate policy evaluation. In
that example, policy evaluation iterations beyond the first three have no effect
on the corresponding greedy policy.
In fact, the policy evaluation step of policy iteration can be truncated in
several ways without losing the convergence guarantees of policy iteration.
One important special case is when policy evaluation is stopped after just one
sweep (one backup of each state). This algorithm is called value iteration. It
can be written as a particularly simple backup operation that combines the

---

## [Sección 52] Chapter 4

-- 112 of 352 --

4.4. VALUE ITERATION 99
4 V
#Cars at second location
420
0 
#Cars at first location
1
!1!2
-4
4 3 2
4 3 2
!3
0
!1!2!3 !4
1 2 
3 4
"1 "0 "2
!3 !4
!2
1 
3 
!1
"3
!4 !3 
!2
1
4
!1
"4
#Cars at second location
#Cars at first location 5
20 0 0 
20 v4
Figure 4.4: The sequence of policies found by policy iteration on Jack’s car
rental problem, and the final state-value function. The first five diagrams show,
for each number of cars at each location at the end of the day, the number
of cars to be moved from the first location to the second (negative numbers
indicate transfers from the second location to the first). Each successive policy
is a strict improvement over the previous policy, and the last policy is optimal.

-- 113 of 352 --

100 CHAPTER 4. DYNAMIC PROGRAMMING
policy improvement and truncated policy evaluation steps:
vk+1(s) = max
a E[Rt+1 + γvk(St+1) | St = s, At = a] (4.10)
= max
a
∑
s′,r
p(s′, r|s, a)
[
r + γvk(s′)
]
,
for all s ∈ S. For arbitrary v0, the sequence {vk} can be shown to converge to
v∗ under the same conditions that guarantee the existence of v∗.
Another way of understanding value iteration is by reference to the Bellman
optimality equation (4.1). Note that value iteration is obtained simply by
turning the Bellman optimality equation into an update rule. Also note how
the value iteration backup is identical to the policy evaluation backup (4.5)
except that it requires the maximum to be taken over all actions. Another
way of seeing this close relationship is to compare the backup diagrams for
these algorithms: Figure 3.4a shows the backup diagram for policy evaluation
and Figure 3.7a shows the backup diagram for value iteration. These two are
the natural backup operations for computing vπ and v∗.
Finally, let us consider how value iteration terminates. Like policy evaluation, value iteration formally requires an infinite number of iterations to
converge exactly to v∗. In practice, we stop once the value function changes
by only a small amount in a sweep. Figure 4.5 gives a complete value iteration
algorithm with this kind of termination condition.
Value iteration effectively combines, in each of its sweeps, one sweep of
policy evaluation and one sweep of policy improvement. Faster convergence is
often achieved by interposing multiple policy evaluation sweeps between each
policy improvement sweep. In general, the entire class of truncated policy
iteration algorithms can be thought of as sequences of sweeps, some of which
use policy evaluation backups and some of which use value iteration backups.
Since the max operation in (4.10) is the only difference between these backups,
this just means that the max operation is added to some sweeps of policy
evaluation. All of these algorithms converge to an optimal policy for discounted
finite MDPs.
Example 4.3: Gambler’s Problem A gambler has the opportunity to
make bets on the outcomes of a sequence of coin flips. If the coin comes up
heads, he wins as many dollars as he has staked on that flip; if it is tails, he
loses his stake. The game ends when the gambler wins by reaching his goal
of $100, or loses by running out of money. On each flip, the gambler must
decide what portion of his capital to stake, in integer numbers of dollars. This
problem can be formulated as an undiscounted, episodic, finite MDP. The
state is the gambler’s capital, s ∈ {1, 2, . . . , 99} and the actions are stakes,

-- 114 of 352 --

4.5. ASYNCHRONOUS DYNAMIC PROGRAMMING 101
Initialize array V arbitrarily (e.g., V (s) = 0 for all s ∈ S+)
Repeat
∆ ← 0
For each s ∈ S:
v ← V (s)
V (s) ← maxa
∑
s′,r p(s′, r|s, a)[r + γV (s′)]
∆ ← max(∆, |v − V (s)|)
until ∆ < θ (a small positive number)
Output a deterministic policy, π, such that
π(s) = argmaxa
∑
s′,r p(s′, r|s, a)[r + γV (s′)]
Figure 4.5: Value iteration.
a ∈ {0, 1, . . . , min(s, 100 − s)}. The reward is zero on all transitions except
those on which the gambler reaches his goal, when it is +1. The state-value
function then gives the probability of winning from each state. A policy is a
mapping from levels of capital to stakes. The optimal policy maximizes the
probability of reaching the goal. Let ph denote the probability of the coin
coming up heads. If ph is known, then the entire problem is known and it can
be solved, for instance, by value iteration. Figure 4.6 shows the change in the
value function over successive sweeps of value iteration, and the final policy
found, for the case of ph = 0.4. This policy is optimal, but not unique. In
fact, there is a whole family of optimal policies, all corresponding to ties for
the argmax action selection with respect to the optimal value function. Can
you guess what the entire family looks like?
4.5 Asynchronous Dynamic Programming
A major drawback to the DP methods that we have discussed so far is that
they involve operations over the entire state set of the MDP, that is, they
require sweeps of the state set. If the state set is very large, then even a single
sweep can be prohibitively expensive. For example, the game of backgammon
has over 1020 states. Even if we could perform the value iteration backup on
a million states per second, it would take over a thousand years to complete a
single sweep.
Asynchronous DP algorithms are in-place iterative DP algorithms that are
not organized in terms of systematic sweeps of the state set. These algorithms
back up the values of states in any order whatsoever, using whatever values of

---

## [Sección 53] Chapter 4

-- 115 of 352 --

102 CHAPTER 4. DYNAMIC PROGRAMMING
99 75 50 25 1
10
30
50
0
0.2
0.4
0.6
0.8
25 50 75 99
Capital
Capital
Value
estimates
Final
policy
(stake)
sweep 1
sweep 2
sweep 3
sweep 32
Figure 4.6: The solution to the gambler’s problem for ph = 0.4. The upper
graph shows the value function found by successive sweeps of value iteration.
The lower graph shows the final policy.

-- 116 of 352 --

4.5. ASYNCHRONOUS DYNAMIC PROGRAMMING 103
other states happen to be available. The values of some states may be backed
up several times before the values of others are backed up once. To converge
correctly, however, an asynchronous algorithm must continue to backup the
values of all the states: it can’t ignore any state after some point in the
computation. Asynchronous DP algorithms allow great flexibility in selecting
states to which backup operations are applied.
For example, one version of asynchronous value iteration backs up the
value, in place, of only one state, sk, on each step, k, using the value iteration
backup (4.10). If 0 ≤ γ < 1, asymptotic convergence to v∗ is guaranteed given
only that all states occur in the sequence {sk} an infinite number of times
(the sequence could even be stochastic). (In the undiscounted episodic case,
it is possible that there are some orderings of backups that do not result in
convergence, but it is relatively easy to avoid these.) Similarly, it is possible
to intermix policy evaluation and value iteration backups to produce a kind
of asynchronous truncated policy iteration. Although the details of this and
other more unusual DP algorithms are beyond the scope of this book, it is clear
that a few different backups form building blocks that can be used flexibly in
a wide variety of sweepless DP algorithms.
Of course, avoiding sweeps does not necessarily mean that we can get away
with less computation. It just means that an algorithm does not need to get
locked into any hopelessly long sweep before it can make progress improving a
policy. We can try to take advantage of this flexibility by selecting the states
to which we apply backups so as to improve the algorithm’s rate of progress.
We can try to order the backups to let value information propagate from state
to state in an efficient way. Some states may not need their values backed up
as often as others. We might even try to skip backing up some states entirely
if they are not relevant to optimal behavior. Some ideas for doing this are
discussed in Chapter 8.
Asynchronous algorithms also make it easier to intermix computation with
real-time interaction. To solve a given MDP, we can run an iterative DP
algorithm at the same time that an agent is actually experiencing the MDP.
The agent’s experience can be used to determine the states to which the DP
algorithm applies its backups. At the same time, the latest value and policy
information from the DP algorithm can guide the agent’s decision-making. For
example, we can apply backups to states as the agent visits them. This makes
it possible to focus the DP algorithm’s backups onto parts of the state set that
are most relevant to the agent. This kind of focusing is a repeated theme in
reinforcement learning.

-- 117 of 352 --

104 CHAPTER 4. DYNAMIC PROGRAMMING
4.6 Generalized Policy Iteration
Policy iteration consists of two simultaneous, interacting processes, one making
the value function consistent with the current policy (policy evaluation), and
the other making the policy greedy with respect to the current value function
(policy improvement). In policy iteration, these two processes alternate, each
completing before the other begins, but this is not really necessary. In value
iteration, for example, only a single iteration of policy evaluation is performed
in between each policy improvement. In asynchronous DP methods, the evaluation and improvement processes are interleaved at an even finer grain. In
some cases a single state is updated in one process before returning to the
other. As long as both processes continue to update all states, the ultimate
result is typically the same—convergence to the optimal value function and an
optimal policy.
We use the term generalized policy iteration (GPI) to refer to the general
idea of letting policy evaluation and policy improvement processes interact,
independent of the granularity and other details of the two processes. Almost
all reinforcement learning methods are well described as GPI. That is, all
have identifiable policies and value functions, with the policy always being
improved with respect to the value function and the value function always
being driven toward the value function for the policy. This overall schema for
GPI is illustrated in Figure 4.7.
It is easy to see that if both the evaluation process and the improvement
process stabilize, that is, no longer produce changes, then the value function
and policy must be optimal. The value function stabilizes only when it is consistent with the current policy, and the policy stabilizes only when it is greedy
with respect to the current value function. Thus, both processes stabilize only
when a policy has been found that is greedy with respect to its own evaluation
function. This implies that the Bellman optimality equation (4.1) holds, and
thus that the policy and the value function are optimal.
The evaluation and improvement processes in GPI can be viewed as both
competing and cooperating. They compete in the sense that they pull in opposing directions. Making the policy greedy with respect to the value function
typically makes the value function incorrect for the changed policy, and making the value function consistent with the policy typically causes that policy no
longer to be greedy. In the long run, however, these two processes interact to
find a single joint solution: the optimal value function and an optimal policy.
One might also think of the interaction between the evaluation and improvement processes in GPI in terms of two constraints or goals—for example,
as two lines in two-dimensional space:

---

## [Sección 54] Chapter 4

-- 118 of 352 --

4.6. GENERALIZED POLICY ITERATION 105
π v
evaluation
v → vπ
improvement
π→greedy(v)
v*
π*
Figure 4.7: Generalized policy iteration: Value and policy functions interact
until they are optimal and thus consistent with each other.
v0 π0
v = vπ
π = greedy(v)
v* π*
Although the real geometry is much more complicated than this, the diagram
suggests what happens in the real case. Each process drives the value function
or policy toward one of the lines representing a solution to one of the two
goals. The goals interact because the two lines are not orthogonal. Driving
directly toward one goal causes some movement away from the other goal.
Inevitably, however, the joint process is brought closer to the overall goal of
optimality. The arrows in this diagram correspond to the behavior of policy
iteration in that each takes the system all the way to achieving one of the two
goals completely. In GPI one could also take smaller, incomplete steps toward
each goal. In either case, the two processes together achieve the overall goal

-- 119 of 352 --

106 CHAPTER 4. DYNAMIC PROGRAMMING
of optimality even though neither is attempting to achieve it directly.
4.7 Efficiency of Dynamic Programming
DP may not be practical for very large problems, but compared with other
methods for solving MDPs, DP methods are actually quite efficient. If we
ignore a few technical details, then the (worst case) time DP methods take to
find an optimal policy is polynomial in the number of states and actions. If n
and m denote the number of states and actions, this means that a DP method
takes a number of computational operations that is less than some polynomial
function of n and m. A DP method is guaranteed to find an optimal policy in
polynomial time even though the total number of (deterministic) policies is mn.
In this sense, DP is exponentially faster than any direct search in policy space
could be, because direct search would have to exhaustively examine each policy
to provide the same guarantee. Linear programming methods can also be used
to solve MDPs, and in some cases their worst-case convergence guarantees are
better than those of DP methods. But linear programming methods become
impractical at a much smaller number of states than do DP methods (by a
factor of about 100). For the largest problems, only DP methods are feasible.
DP is sometimes thought to be of limited applicability because of the curse
of dimensionality (Bellman, 1957a), the fact that the number of states often
grows exponentially with the number of state variables. Large state sets do
create difficulties, but these are inherent difficulties of the problem, not of DP
as a solution method. In fact, DP is comparatively better suited to handling
large state spaces than competing methods such as direct search and linear
programming.
In practice, DP methods can be used with today’s computers to solve
MDPs with millions of states. Both policy iteration and value iteration are
widely used, and it is not clear which, if either, is better in general. In practice,
these methods usually converge much faster than their theoretical worst-case
run times, particularly if they are started with good initial value functions or
policies.
On problems with large state spaces, asynchronous DP methods are often preferred. To complete even one sweep of a synchronous method requires
computation and memory for every state. For some problems, even this much
memory and computation is impractical, yet the problem is still potentially
solvable because only a relatively few states occur along optimal solution trajectories. Asynchronous methods and other variations of GPI can be applied in
such cases and may find good or optimal policies much faster than synchronous

-- 120 of 352 --

4.8. SUMMARY 107
methods can.
4.8 Summary
In this chapter we have become familiar with the basic ideas and algorithms of
dynamic programming as they relate to solving finite MDPs. Policy evaluation
refers to the (typically) iterative computation of the value functions for a
given policy. Policy improvement refers to the computation of an improved
policy given the value function for that policy. Putting these two computations
together, we obtain policy iteration and value iteration, the two most popular
DP methods. Either of these can be used to reliably compute optimal policies
and value functions for finite MDPs given complete knowledge of the MDP.
Classical DP methods operate in sweeps through the state set, performing
a full backup operation on each state. Each backup updates the value of one
state based on the values of all possible successor states and their probabilities
of occurring. Full backups are closely related to Bellman equations: they are
little more than these equations turned into assignment statements. When the
backups no longer result in any changes in value, convergence has occurred to
values that satisfy the corresponding Bellman equation. Just as there are
four primary value functions (vπ, v∗, qπ, and q∗), there are four corresponding
Bellman equations and four corresponding full backups. An intuitive view of
the operation of backups is given by backup diagrams.
Insight into DP methods and, in fact, into almost all reinforcement learning methods, can be gained by viewing them as generalized policy iteration
(GPI). GPI is the general idea of two interacting processes revolving around
an approximate policy and an approximate value function. One process takes
the policy as given and performs some form of policy evaluation, changing the
value function to be more like the true value function for the policy. The other
process takes the value function as given and performs some form of policy
improvement, changing the policy to make it better, assuming that the value
function is its value function. Although each process changes the basis for the
other, overall they work together to find a joint solution: a policy and value
function that are unchanged by either process and, consequently, are optimal.
In some cases, GPI can be proved to converge, most notably for the classical
DP methods that we have presented in this chapter. In other cases convergence
has not been proved, but still the idea of GPI improves our understanding of
the methods.
It is not necessary to perform DP methods in complete sweeps through the
state set. Asynchronous DP methods are in-place iterative methods that back

---

## [Sección 55] Chapter 4

-- 121 of 352 --

108 CHAPTER 4. DYNAMIC PROGRAMMING
up states in an arbitrary order, perhaps stochastically determined and using
out-of-date information. Many of these methods can be viewed as fine-grained
forms of GPI.
Finally, we note one last special property of DP methods. All of them
update estimates of the values of states based on estimates of the values of
successor states. That is, they update estimates on the basis of other estimates.
We call this general idea bootstrapping. Many reinforcement learning methods
perform bootstrapping, even those that do not require, as DP requires, a
complete and accurate model of the environment. In the next chapter we
explore reinforcement learning methods that do not require a model and do
not bootstrap. In the chapter after that we explore methods that do not require
a model but do bootstrap. These key features and properties are separable,
yet can be mixed in interesting combinations.
Bibliographical and Historical Remarks
The term “dynamic programming” is due to Bellman (1957a), who showed
how these methods could be applied to a wide range of problems. Extensive
treatments of DP can be found in many texts, including Bertsekas (1995),
Bertsekas and Tsitsiklis (1996), Dreyfus and Law (1977), Ross (1983), White
(1969), and Whittle (1982, 1983). Our interest in DP is restricted to its use
in solving MDPs, but DP also applies to other types of problems. Kumar and
Kanal (1988) provide a more general look at DP.
To the best of our knowledge, the first connection between DP and reinforcement learning was made by Minsky (1961) in commenting on Samuel’s
checkers player. In a footnote, Minsky mentioned that it is possible to apply DP to problems in which Samuel’s backing-up process can be handled in
closed analytic form. This remark may have misled artificial intelligence researchers into believing that DP was restricted to analytically tractable problems and therefore largely irrelevant to artificial intelligence. Andreae (1969b)
mentioned DP in the context of reinforcement learning, specifically policy iteration, although he did not make specific connections between DP and learning
algorithms. Werbos (1977) suggested an approach to approximating DP called
“heuristic dynamic programming” that emphasizes gradient-descent methods
for continuous-state problems (Werbos, 1982, 1987, 1988, 1989, 1992). These
methods are closely related to the reinforcement learning algorithms that we
discuss in this book. Watkins (1989) was explicit in connecting reinforcement
learning to DP, characterizing a class of reinforcement learning methods as
“incremental dynamic programming.”

-- 122 of 352 --

4.8. SUMMARY 109
4.1–4 These sections describe well-established DP algorithms that are covered
in any of the general DP references cited above. The policy improvement theorem and the policy iteration algorithm are due to Bellman
(1957a) and Howard (1960). Our presentation was influenced by the
local view of policy improvement taken by Watkins (1989). Our discussion of value iteration as a form of truncated policy iteration is based
on the approach of Puterman and Shin (1978), who presented a class
of algorithms called modified policy iteration, which includes policy iteration and value iteration as special cases. An analysis showing how
value iteration can be made to find an optimal policy in finite time is
given by Bertsekas (1987).
Iterative policy evaluation is an example of a classical successive approximation algorithm for solving a system of linear equations. The
version of the algorithm that uses two arrays, one holding the old values while the other is updated, is often called a Jacobi-style algorithm,
after Jacobi’s classical use of this method. It is also sometimes called
a synchronous algorithm because it can be performed in parallel, with
separate processors simultaneously updating the values of individual
states using input from other processors. The second array is needed
to simulate this parallel computation sequentially. The in-place version
of the algorithm is often called a Gauss–Seidel-style algorithm after
the classical Gauss–Seidel algorithm for solving systems of linear equations. In addition to iterative policy evaluation, other DP algorithms
can be implemented in these different versions. Bertsekas and Tsitsiklis (1989) provide excellent coverage of these variations and their
performance differences.
4.5 Asynchronous DP algorithms are due to Bertsekas (1982, 1983), who
also called them distributed DP algorithms. The original motivation for
asynchronous DP was its implementation on a multiprocessor system
with communication delays between processors and no global synchronizing clock. These algorithms are extensively discussed by Bertsekas
and Tsitsiklis (1989). Jacobi-style and Gauss–Seidel-style DP algorithms are special cases of the asynchronous version. Williams and
Baird (1990) presented DP algorithms that are asynchronous at a finer
grain than the ones we have discussed: the backup operations themselves are broken into steps that can be performed asynchronously.
4.7 This section, written with the help of Michael Littman, is based on
Littman, Dean, and Kaelbling (1995).

---

## [Sección 56] Chapter 4

-- 123 of 352 --

110 CHAPTER 4. DYNAMIC PROGRAMMING
Exercises
Exercise 4.1 If π is the equiprobable random policy, what is qπ(11, down)?
What is qπ(7, down)?
Exercise 4.2 Suppose a new state 15 is added to the gridworld just below
state 13, and its actions, left, up, right, and down, take the agent to states
12, 13, 14, and 15, respectively. Assume that the transitions from the original
states are unchanged. What, then, is vπ(15) for the equiprobable random
policy? Now suppose the dynamics of state 13 are also changed, such that
action down from state 13 takes the agent to the new state 15. What is vπ(15)
for the equiprobable random policy in this case?
Exercise 4.3 What are the equations analogous to (4.3), (4.4), and (4.5) for
the action-value function qπ and its successive approximation by a sequence of
functions q0, q1, q2, . . . ?
Exercise 4.4 In some undiscounted episodic tasks there may be policies
for which eventual termination is not guaranteed. For example, in the grid
problem above it is possible to go back and forth between two states forever.
In a task that is otherwise perfectly sensible, vπ(s) may be negative infinity
for some policies and states, in which case the algorithm for iterative policy
evaluation given in Figure 4.1 will not terminate. As a purely practical matter,
how might we amend this algorithm to assure termination even in this case?
Assume that eventual termination is guaranteed under the optimal policy.
Exercise 4.5 (programming) Write a program for policy iteration and
re-solve Jack’s car rental problem with the following changes. One of Jack’s
employees at the first location rides a bus home each night and lives near
the second location. She is happy to shuttle one car to the second location
for free. Each additional car still costs $2, as do all cars moved in the other
direction. In addition, Jack has limited parking space at each location. If
more than 10 cars are kept overnight at a location (after any moving of cars),
then an additional cost of $4 must be incurred to use a second parking lot
(independent of how many cars are kept there). These sorts of nonlinearities
and arbitrary dynamics often occur in real problems and cannot easily be
handled by optimization methods other than dynamic programming. To check
your program, first replicate the results given for the original problem. If your
computer is too slow for the full problem, cut all the numbers of cars in half.
Exercise 4.6 How would policy iteration be defined for action values? Give
a complete algorithm for computing q∗, analogous to Figure 4.3 for computing
v∗. Please pay special attention to this exercise, because the ideas involved
will be used throughout the rest of the book.

-- 124 of 352 --

4.8. SUMMARY 111
Exercise 4.7 Suppose you are restricted to considering only policies that are
-soft, meaning that the probability of selecting each action in each state, s,
is at least /|A(s)|. Describe qualitatively the changes that would be required
in each of the steps 3, 2, and 1, in that order, of the policy iteration algorithm
for v∗ (Figure 4.3).
Exercise 4.8 Why does the optimal policy for the gambler’s problem have
such a curious form? In particular, for capital of 50 it bets it all on one flip,
but for capital of 51 it does not. Why is this a good policy?
Exercise 4.9 (programming) Implement value iteration for the gambler’s
problem and solve it for ph = 0.25 and ph = 0.55. In programming, you may
find it convenient to introduce two dummy states corresponding to termination
with capital of 0 and 100, giving them values of 0 and 1 respectively. Show
your results graphically, as in Figure 4.6. Are your results stable as θ → 0?
Exercise 4.10 What is the analog of the value iteration backup (4.10) for
action values, qk+1(s, a)?

-- 125 of 352 --

112 CHAPTER 4. DYNAMIC PROGRAMMING

-- 126 of 352 --

---

## [Sección 57] Chapter 5

Monte Carlo Methods
In this chapter we consider our first learning methods for estimating value functions and discovering optimal policies. Unlike the previous chapter, here we
do not assume complete knowledge of the environment. Monte Carlo methods
require only experience—sample sequences of states, actions, and rewards from
actual or simulated interaction with an environment. Learning from actual experience is striking because it requires no prior knowledge of the environment’s
dynamics, yet can still attain optimal behavior. Learning from simulated experience is also powerful. Although a model is required, the model need only
generate sample transitions, not the complete probability distributions of all
possible transitions that is required for dynamic programming (DP). In surprisingly many cases it is easy to generate experience sampled according to
the desired probability distributions, but infeasible to obtain the distributions
in explicit form.
Monte Carlo methods are ways of solving the reinforcement learning problem based on averaging sample returns. To ensure that well-defined returns are
available, here we define Monte Carlo methods only for episodic tasks. That is,
we assume experience is divided into episodes, and that all episodes eventually
terminate no matter what actions are selected. Only on the completion of an
episode are value estimates and policies changed. Monte Carlo methods can
thus be incremental in an episode-by-episode sense, but not in a step-by-step
(online) sense. The term “Monte Carlo” is often used more broadly for any
estimation method whose operation involves a significant random component.
Here we use it specifically for methods based on averaging complete returns
(as opposed to methods that learn from partial returns, considered in the next
chapter).
Monte Carlo methods sample and average returns for each state–action pair
much like the bandit methods we explored in Chapter 2 sample and average
-- 127 of 352 --

114 CHAPTER 5. MONTE CARLO METHODS
rewards for each action. The main difference is that now there are multiple
states, each acting like a different bandit problem (like an associative-search
or contextual bandit) and that the different bandit problems are interrelated.
That is, the return after taking an action in one state depends on the actions
taken in later states in the same episode. Because all the action selections
are undergoing learning, the problem becomes nonstationary from the point
of view of the earlier state.
To handle the nonstationarity, we adapt the idea of general policy iteration
(GPI) developed in Chapter 4 for DP. Whereas there we computed value functions from knowledge of the MDP, here we learn value functions from sample
returns with the MDP. The value functions and corresponding policies still
interact to attain optimality in essentially the same way (GPI). As in the DP
chapter, first we consider the prediction problem (the computation of vπ and
qπ for a fixed arbitrary policy π) then policy improvement, and, finally, the
control problem and its solution by GPI. Each of these ideas taken from DP is
extended to the Monte Carlo case in which only sample experience is available.
5.1 Monte Carlo Prediction
We begin by considering Monte Carlo methods for learning the state-value
function for a given policy. Recall that the value of a state is the expected
return—expected cumulative future discounted reward—starting from that
state. An obvious way to estimate it from experience, then, is simply to
average the returns observed after visits to that state. As more returns are
observed, the average should converge to the expected value. This idea underlies all Monte Carlo methods.
In particular, suppose we wish to estimate vπ(s), the value of a state s
under policy π, given a set of episodes obtained by following π and passing
through s. Each occurrence of state s in an episode is called a visit to s. Of
course, s may be visited multiple times in the same episode; let us call the first
time it is visited in an episode the first visit to s. The first-visit MC method
estimates vπ(s) as the average of the returns following first visits to s, whereas
the every-visit MC method averages the returns following all visits to s. These
two Monte Carlo (MC) methods are very similar but have slightly different
theoretical properties. First-visit MC has been most widely studied, dating
back to the 1940s, and is the one we focus on in this chapter. Every-visit
MC extends more naturally to function approximation and eligibility traces,
as discussed in Chapters 9 and 7. First-visit MC is shown in procedural form
in Figure 5.1.

---

## [Sección 58] Chapter 5

-- 128 of 352 --

5.1. MONTE CARLO PREDICTION 115
Initialize:
π ← policy to be evaluated
V ← an arbitrary state-value function
Returns(s) ← an empty list, for all s ∈ S
Repeat forever:
Generate an episode using π
For each state s appearing in the episode:
G ← return following the first occurrence of s
Append G to Returns(s)
V (s) ← average(Returns(s))
Figure 5.1: The first-visit MC method for estimating vπ. Note that we use a
capital letter V for the approximate value function because, after initialization,
it soon becomes a random variable.
Both first-visit MC and every-visit MC converge to vπ(s) as the number
of visits (or first visits) to s goes to infinity. This is easy to see for the
case of first-visit MC. In this case each return is an independent, identically
distributed estimate of vπ(s) with finite variance. By the law of large numbers
the sequence of averages of these estimates converges to their expected value.
Each average is itself an unbiased estimate, and the standard deviation of its
error falls as 1/√n, where n is the number of returns averaged. Every-visit
MC is less straightforward, but its estimates also converge asymptotically to
vπ(s) (Singh and Sutton, 1996).
The use of Monte Carlo methods is best illustrated through an example.
Example 5.1: Blackjack The object of the popular casino card game of
blackjack is to obtain cards the sum of whose numerical values is as great as
possible without exceeding 21. All face cards count as 10, and an ace can count
either as 1 or as 11. We consider the version in which each player competes
independently against the dealer. The game begins with two cards dealt to
both dealer and player. One of the dealer’s cards is face up and the other is
face down. If the player has 21 immediately (an ace and a 10-card), it is called
a natural. He then wins unless the dealer also has a natural, in which case the
game is a draw. If the player does not have a natural, then he can request
additional cards, one by one (hits), until he either stops (sticks) or exceeds 21
(goes bust). If he goes bust, he loses; if he sticks, then it becomes the dealer’s
turn. The dealer hits or sticks according to a fixed strategy without choice:
he sticks on any sum of 17 or greater, and hits otherwise. If the dealer goes
bust, then the player wins; otherwise, the outcome—win, lose, or draw—is
determined by whose final sum is closer to 21.

-- 129 of 352 --

116 CHAPTER 5. MONTE CARLO METHODS
+1
!1
A Dealer showing
12
Player sum
After 500,000 episodes After 10,000 episodes
Usable
ace
No
usable
ace
Figure 5.2: Approximate state-value functions for the blackjack policy that
sticks only on 20 or 21, computed by Monte Carlo policy evaluation.
Playing blackjack is naturally formulated as an episodic finite MDP. Each
game of blackjack is an episode. Rewards of +1, −1, and 0 are given for
winning, losing, and drawing, respectively. All rewards within a game are
zero, and we do not discount (γ = 1); therefore these terminal rewards are
also the returns. The player’s actions are to hit or to stick. The states depend
on the player’s cards and the dealer’s showing card. We assume that cards
are dealt from an infinite deck (i.e., with replacement) so that there is no
advantage to keeping track of the cards already dealt. If the player holds an
ace that he could count as 11 without going bust, then the ace is said to be
usable. In this case it is always counted as 11 because counting it as 1 would
make the sum 11 or less, in which case there is no decision to be made because,
obviously, the player should always hit. Thus, the player makes decisions on
the basis of three variables: his current sum (12–21), the dealer’s one showing
card (ace–10), and whether or not he holds a usable ace. This makes for a
total of 200 states.
Consider the policy that sticks if the player’s sum is 20 or 21, and otherwise hits. To find the state-value function for this policy by a Monte Carlo
approach, one simulates many blackjack games using the policy and averages
the returns following each state. Note that in this task the same state never
recurs within one episode, so there is no difference between first-visit and
every-visit MC methods. In this way, we obtained the estimates of the statevalue function shown in Figure 5.2. The estimates for states with a usable ace
are less certain and less regular because these states are less common. In any
event, after 500,000 games the value function is very well approximated.

---

## [Sección 59] Chapter 5

-- 130 of 352 --

5.1. MONTE CARLO PREDICTION 117
Although we have complete knowledge of the environment in this task, it
would not be easy to apply DP methods to compute the value function. DP
methods require the distribution of next events—in particular, they require
the quantities p(s′, r|s, a)—and it is not easy to determine these for blackjack.
For example, suppose the player’s sum is 14 and he chooses to stick. What is
his expected reward as a function of the dealer’s showing card? All of these
expected rewards and transition probabilities must be computed before DP
can be applied, and such computations are often complex and error-prone. In
contrast, generating the sample games required by Monte Carlo methods is
easy. This is the case surprisingly often; the ability of Monte Carlo methods
to work with sample episodes alone can be a significant advantage even when
one has complete knowledge of the environment’s dynamics.
Can we generalize the idea of backup diagrams to Monte Carlo algorithms?
The general idea of a backup diagram is to show at the top the root node to be
updated and to show below all the transitions and leaf nodes whose rewards
and estimated values contribute to the update. For Monte Carlo estimation of
vπ, the root is a state node, and below it is the entire trajectory of transitions
along a particular single episode, ending at the terminal state, as in Figure 5.3.
Whereas the DP diagram (Figure 3.4a) shows all possible transitions, the
Monte Carlo diagram shows only those sampled on the one episode. Whereas
the DP diagram includes only one-step transitions, the Monte Carlo diagram
goes all the way to the end of the episode. These differences in the diagrams
accurately reflect the fundamental differences between the algorithms.
An important fact about Monte Carlo methods is that the estimates for
each state are independent. The estimate for one state does not build upon
the estimate of any other state, as is the case in DP. In other words, Monte
Carlo methods do not bootstrap as we defined it in the previous chapter.
In particular, note that the computational expense of estimating the value
of a single state is independent of the number of states. This can make Monte
Carlo methods particularly attractive when one requires the value of only one
or a subset of states. One can generate many sample episodes starting from
the states of interest, averaging returns from only these states ignoring all
others. This is a third advantage Monte Carlo methods can have over DP
methods (after the ability to learn from actual experience and from simulated
experience).

-- 131 of 352 --

118 CHAPTER 5. MONTE CARLO METHODS
terminal state
Figure 5.3: The backup diagram for Monte Carlo estimation of vπ.
A bubble on a wire loop
Example 5.2: Soap Bubble
Suppose a wire frame forming a closed
loop is dunked in soapy water to form a
soap surface or bubble conforming at its
edges to the wire frame. If the geometry of
the wire frame is irregular but known, how
can you compute the shape of the surface?
The shape has the property that the total
force on each point exerted by neighboring points is zero (or else the shape would
change). This means that the surface’s
height at any point is the average of its heights at points in a small circle
around that point. In addition, the surface must meet at its boundaries with
the wire frame. The usual approach to problems of this kind is to put a grid
over the area covered by the surface and solve for its height at the grid points
by an iterative computation. Grid points at the boundary are forced to the
wire frame, and all others are adjusted toward the average of the heights of
their four nearest neighbors. This process then iterates, much like DP’s iterative policy evaluation, and ultimately converges to a close approximation to
the desired surface.
This is similar to the kind of problem for which Monte Carlo methods
were originally designed. Instead of the iterative computation described above,
imagine standing on the surface and taking a random walk, stepping randomly
from grid point to neighboring grid point, with equal probability, until you

---

## [Sección 60] Chapter 5

-- 132 of 352 --

5.2. MONTE CARLO ESTIMATION OF ACTION VALUES 119
reach the boundary. It turns out that the expected value of the height at the
boundary is a close approximation to the height of the desired surface at the
starting point (in fact, it is exactly the value computed by the iterative method
described above). Thus, one can closely approximate the height of the surface
at a point by simply averaging the boundary heights of many walks started at
the point. If one is interested in only the value at one point, or any fixed small
set of points, then this Monte Carlo method can be far more efficient than the
iterative method based on local consistency.
5.2 Monte Carlo Estimation of Action Values
If a model is not available, then it is particularly useful to estimate action
values (the values of state–action pairs) rather than state values. With a
model, state values alone are sufficient to determine a policy; one simply looks
ahead one step and chooses whichever action leads to the best combination
of reward and next state, as we did in the chapter on DP. Without a model,
however, state values alone are not sufficient. One must explicitly estimate the
value of each action in order for the values to be useful in suggesting a policy.
Thus, one of our primary goals for Monte Carlo methods is to estimate q∗. To
achieve this, we first consider the policy evaluation problem for action values.
The policy evaluation problem for action values is to estimate qπ(s, a),
the expected return when starting in state s, taking action a, and thereafter
following policy π. The Monte Carlo methods for this are essentially the same
as just presented for state values, except now we talk about visits to a state–
action pair rather than to a state. A state–action pair s, a is said to be visited
in an episode if ever the state s is visited and action a is taken in it. The everyvisit MC method estimates the value of a state–action pair as the average of the
returns that have followed visits all the visits to it. The first-visit MC method
averages the returns following the first time in each episode that the state was
visited and the action was selected. These methods converge quadratically, as
before, to the true expected values as the number of visits to each state–action
pair approaches infinity.
The only complication is that many state–action pairs may never be visited.
If π is a deterministic policy, then in following π one will observe returns only
for one of the actions from each state. With no returns to average, the Monte
Carlo estimates of the other actions will not improve with experience. This is
a serious problem because the purpose of learning action values is to help in
choosing among the actions available in each state. To compare alternatives
we need to estimate the value of all the actions from each state, not just the
one we currently favor.

-- 133 of 352 --

120 CHAPTER 5. MONTE CARLO METHODS
This is the general problem of maintaining exploration, as discussed in the
context of the n-armed bandit problem in Chapter 2. For policy evaluation
to work for action values, we must assure continual exploration. One way
to do this is by specifying that the episodes start in a state–action pair, and
that every pair has a nonzero probability of being selected as the start. This
guarantees that all state–action pairs will be visited an infinite number of times
in the limit of an infinite number of episodes. We call this the assumption of
exploring starts.
The assumption of exploring starts is sometimes useful, but of course it
cannot be relied upon in general, particularly when learning directly from
actual interaction with an environment. In that case the starting conditions are
unlikely to be so helpful. The most common alternative approach to assuring
that all state–action pairs are encountered is to consider only policies that are
stochastic with a nonzero probability of selecting all actions in each state. We
discuss two important variants of this approach in later sections. For now, we
retain the assumption of exploring starts and complete the presentation of a
full Monte Carlo control method.
5.3 Monte Carlo Control
We are now ready to consider how Monte Carlo estimation can be used in
control, that is, to approximate optimal policies. The overall idea is to proceed according to the same pattern as in the DP chapter, that is, according to
the idea of generalized policy iteration (GPI). In GPI one maintains both an
approximate policy and an approximate value function. The value function is
repeatedly altered to more closely approximate the value function for the current policy, and the policy is repeatedly improved with respect to the current
value function:
π q
evaluation
q → qπ
improvement
π→greedy(q)
These two kinds of changes work against each other to some extent, as each
creates a moving target for the other, but together they cause both policy and

---

## [Sección 61] Chapter 5

-- 134 of 352 --

5.3. MONTE CARLO CONTROL 121
value function to approach optimality.
To begin, let us consider a Monte Carlo version of classical policy iteration.
In this method, we perform alternating complete steps of policy evaluation and
policy improvement, beginning with an arbitrary policy π0 and ending with
the optimal policy and optimal action-value function:
π0
E
−→ qπ0
I
−→ π1
E
−→ qπ1
I
−→ π2
E
−→ · · · I
−→ π∗
E
−→ q∗,
where E
−→ denotes a complete policy evaluation and I
−→ denotes a complete
policy improvement. Policy evaluation is done exactly as described in the preceding section. Many episodes are experienced, with the approximate actionvalue function approaching the true function asymptotically. For the moment,
let us assume that we do indeed observe an infinite number of episodes and
that, in addition, the episodes are generated with exploring starts. Under
these assumptions, the Monte Carlo methods will compute each qπk exactly,
for arbitrary πk.
Policy improvement is done by making the policy greedy with respect to
the current value function. In this case we have an action-value function, and
therefore no model is needed to construct the greedy policy. For any actionvalue function q, the corresponding greedy policy is the one that, for each
s ∈ S, deterministically chooses an action with maximal action-value:
π(s) = arg max
a q(s, a). (5.1)
Policy improvement then can be done by constructing each πk+1 as the greedy
policy with respect to qπk . The policy improvement theorem (Section 4.2) then
applies to πk and πk+1 because, for all s ∈ S,
qπk (s, πk+1(s)) = qπk (s, argmax
a
qπk (s, a))
= max
a qπk (s, a)
≥ qπk (s, πk(s))
= vπk (s).
As we discussed in the previous chapter, the theorem assures us that each πk+1
is uniformly better than πk, or just as good as πk, in which case they are both
optimal policies. This in turn assures us that the overall process converges
to the optimal policy and optimal value function. In this way Monte Carlo
methods can be used to find optimal policies given only sample episodes and
no other knowledge of the environment’s dynamics.
We made two unlikely assumptions above in order to easily obtain this
guarantee of convergence for the Monte Carlo method. One was that the

-- 135 of 352 --

122 CHAPTER 5. MONTE CARLO METHODS
episodes have exploring starts, and the other was that policy evaluation could
be done with an infinite number of episodes. To obtain a practical algorithm
we will have to remove both assumptions. We postpone consideration of the
first assumption until later in this chapter.
For now we focus on the assumption that policy evaluation operates on an
infinite number of episodes. This assumption is relatively easy to remove. In
fact, the same issue arises even in classical DP methods such as iterative policy
evaluation, which also converge only asymptotically to the true value function.
In both DP and Monte Carlo cases there are two ways to solve the problem.
One is to hold firm to the idea of approximating qπk in each policy evaluation.
Measurements and assumptions are made to obtain bounds on the magnitude
and probability of error in the estimates, and then sufficient steps are taken
during each policy evaluation to assure that these bounds are sufficiently small.
This approach can probably be made completely satisfactory in the sense of
guaranteeing correct convergence up to some level of approximation. However,
it is also likely to require far too many episodes to be useful in practice on any
but the smallest problems.
The second approach to avoiding the infinite number of episodes nominally
required for policy evaluation is to forgo trying to complete policy evaluation
before returning to policy improvement. On each evaluation step we move the
value function toward qπk , but we do not expect to actually get close except
over many steps. We used this idea when we first introduced the idea of GPI in
Section 4.6. One extreme form of the idea is value iteration, in which only one
iteration of iterative policy evaluation is performed between each step of policy
improvement. The in-place version of value iteration is even more extreme;
there we alternate between improvement and evaluation steps for single states.
For Monte Carlo policy evaluation it is natural to alternate between evaluation and improvement on an episode-by-episode basis. After each episode,
the observed returns are used for policy evaluation, and then the policy is
improved at all the states visited in the episode. A complete simple algorithm
along these lines is given in Figure 5.4. We call this algorithm Monte Carlo
ES, for Monte Carlo with Exploring Starts.
In Monte Carlo ES, all the returns for each state–action pair are accumulated and averaged, irrespective of what policy was in force when they were
observed. It is easy to see that Monte Carlo ES cannot converge to any suboptimal policy. If it did, then the value function would eventually converge to
the value function for that policy, and that in turn would cause the policy to
change. Stability is achieved only when both the policy and the value function are optimal. Convergence to this optimal fixed point seems inevitable as
the changes to the action-value function decrease over time, but has not yet

---

## [Sección 62] Chapter 5

-- 136 of 352 --

5.3. MONTE CARLO CONTROL 123
Initialize, for all s ∈ S, a ∈ A(s):
Q(s, a) ← arbitrary
π(s) ← arbitrary
Returns(s, a) ← empty list
Repeat forever:
Choose S0 ∈ S and A0 ∈ A(S0) s.t. all pairs have probability > 0
Generate an episode starting from S0, A0, following π
For each pair s, a appearing in the episode:
G ← return following the first occurrence of s, a
Append G to Returns(s, a)
Q(s, a) ← average(Returns(s, a))
For each s in the episode:
π(s) ← argmaxa Q(s, a)
Figure 5.4: Monte Carlo ES: A Monte Carlo control algorithm assuming exploring starts and that episodes always terminate for all policies.
been formally proved. In our opinion, this is one of the most fundamental
open theoretical questions in reinforcement learning (for a partial solution, see
Tsitsiklis, 2002).
Example 5.3: Solving Blackjack It is straightforward to apply Monte
Carlo ES to blackjack. Since the episodes are all simulated games, it is easy
to arrange for exploring starts that include all possibilities. In this case one
simply picks the dealer’s cards, the player’s sum, and whether or not the
player has a usable ace, all at random with equal probability. As the initial
policy we use the policy evaluated in the previous blackjack example, that
which sticks only on 20 or 21. The initial action-value function can be zero
for all state–action pairs. Figure 5.5 shows the optimal policy for blackjack
found by Monte Carlo ES. This policy is the same as the “basic” strategy
of Thorp (1966) with the sole exception of the leftmost notch in the policy
for a usable ace, which is not present in Thorp’s strategy. We are uncertain
of the reason for this discrepancy, but confident that what is shown here is
indeed the optimal policy for the version of blackjack we have described.

-- 137 of 352 --

124 CHAPTER 5. MONTE CARLO METHODS
Usable
ace
No
usable
ace
10 A 2 3 4 5 6 7 8 9
Dealer showing
Player sum
HIT
STICK 19
11
13
15
17
!*
10 A 2 3 4 5 6 7 8 9
HIT
STICK 20
21
12
14
16
18
V*
10 
A
Dealer showing
Player sum
A
21
+1
"1
v*
Usable
ace
No
usable
ace
10 A 2 3 4 5 6 7 8 9
Dealer showing
Player sum
HIT
STICK 19
11
13
15
17
!*
10 A 2 3 4 5 6 7 8 9
HIT
STICK 20
21
12
14
16
18
V*
10 
A
Dealer showing
Player sum
A
21
+1
"1
v*
Usable
ace
No
usable
ace
10 A 2 3 4 5 6 7 8 9
Dealer showing
Player sum
HIT
STICK 19
11
13
15
17
!*
10 A 2 3 4 5 6 7 8 9
HIT
STICK 20
21
12
14
16
18
V*
10 
A
Dealer showing
Player sum
A
21
+1
"1
v*
Dealer showing
Player sum
* *
Figure 5.5: The optimal policy and state-value function for blackjack, found by
Monte Carlo ES (Figure 5.4). The state-value function shown was computed
from the action-value function found by Monte Carlo ES.
5.4 Monte Carlo Control without Exploring
Starts
How can we avoid the unlikely assumption of exploring starts? The only
general way to ensure that all actions are selected infinitely often is for the
agent to continue to select them. There are two approaches to ensuring this,
resulting in what we call on-policy methods and off-policy methods. Onpolicy methods attempt to evaluate or improve the policy that is used to make
decisions, whereas off-policy methods evaluate or improve a policy different
from that used to generate the data. The Monte Carlo ES method developed
above is an example of an on-policy method. In this section we show how an
on-policy Monte Carlo control method can be designed that does not use the
unrealistic assumption of exploring starts. Off-policy methods are considered
in the next section.
In on-policy control methods the policy is generally soft, meaning that
π(a|s) > 0 for all s ∈ S and all a ∈ A(s), but gradually shifted closer and
closer to a deterministic optimal policy. Many of the methods discussed in

---

## [Sección 63] Chapter 2 provide mechanisms for this. The on-policy method we present in

this section uses ε-greedy policies, meaning that most of the time they choose
an action that has maximal estimated action value, but with probability ε

-- 138 of 352 --

5.4. MONTE CARLO CONTROL WITHOUT EXPLORING STARTS 125
they instead select an action at random. That is, all nongreedy actions are
given the minimal probability of selection, 
|A(s)| , and the remaining bulk of the
probability, 1 − ε + 
|A(s)| , is given to the greedy action. The ε-greedy policies
are examples of ε-soft policies, defined as policies for which π(a|s) ≥ 
|A(s)| for
all states and actions, for some ε > 0. Among ε-soft policies, ε-greedy policies
are in some sense those that are closest to greedy.
The overall idea of on-policy Monte Carlo control is still that of GPI. As in
Monte Carlo ES, we use first-visit MC methods to estimate the action-value
function for the current policy. Without the assumption of exploring starts,
however, we cannot simply improve the policy by making it greedy with respect
to the current value function, because that would prevent further exploration
of nongreedy actions. Fortunately, GPI does not require that the policy be
taken all the way to a greedy policy, only that it be moved toward a greedy
policy. In our on-policy method we will move it only to an ε-greedy policy.
For any ε-soft policy, π, any ε-greedy policy with respect to qπ is guaranteed
to be better than or equal to π.
That any ε-greedy policy with respect to qπ is an improvement over any
ε-soft policy π is assured by the policy improvement theorem. Let π′ be the
ε-greedy policy. The conditions of the policy improvement theorem apply
because for any s ∈ S:
qπ(s, π′(s)) = ∑
a
π′(a|s)qπ(s, a)
= 
|A(s)|
∑
a
qπ(s, a) + (1 − ε) max
a qπ(s, a) (5.2)
≥ 
|A(s)|
∑
a
qπ(s, a) + (1 − ε) ∑
a
π(a|s) − 
|A(s)|
1 − ε qπ(s, a)
(the sum is a weighted average with nonnegative weights summing to 1, and
as such it must be less than or equal to the largest number averaged)
= 
|A(s)|
∑
a
qπ(s, a) − 
|A(s)|
∑
a
qπ(s, a) + ∑
a
π(a|s)qπ(s, a)
= vπ(s).
Thus, by the policy improvement theorem, π′ ≥ π (i.e., vπ′ (s) ≥ vπ(s), for all
s ∈ S). We now prove that equality can hold only when both π′ and π are
optimal among the ε-soft policies, that is, when they are better than or equal
to all other ε-soft policies.
Consider a new environment that is just like the original environment, except with the requirement that policies be ε-soft “moved inside” the environment. The new environment has the same action and state set as the original

-- 139 of 352 --

126 CHAPTER 5. MONTE CARLO METHODS
and behaves as follows. If in state s and taking action a, then with probability
1 − ε the new environment behaves exactly like the old environment. With
probability ε it repicks the action at random, with equal probabilities, and
then behaves like the old environment with the new, random action. The best
one can do in this new environment with general policies is the same as the
best one could do in the original environment with ε-soft policies. Let ˜v∗ and
˜ q∗ denote the optimal value functions for the new environment. Then a policy
π is optimal among ε-soft policies if and only if vπ = ˜v∗. From the definition
of ˜v∗ we know that it is the unique solution to
˜v∗(s) = (1 − ε) max
a ˜ q∗(s, a) + 
|A(s)|
∑
a
˜ q∗(s, a)
= (1 − ε) max
a
∑
s′,r
p(s′, r|s, a)
[
r + γ˜v∗(s′)
]
+ 
|A(s)|
∑
a
∑
s′,r
p(s′, r|s, a)
[
r + γ˜v∗(s′)
]
.
When equality holds and the ε-soft policy π is no longer improved, then we
also know, from (5.2), that
vπ(s) = (1 − ε) max
a qπ(s, a) + 
|A(s)|
∑
a
qπ(s, a)
= (1 − ε) max
a
∑
s′,r
p(s′, r|s, a)
[
r + γvπ(s′)
]
+ 
|A(s)|
∑
a
∑
s′,r
p(s′, r|s, a)
[
r + γvπ(s′)
]
.
However, this equation is the same as the previous one, except for the substitution of vπ for ˜v∗. Since ˜v∗ is the unique solution, it must be that vπ = ˜v∗.
In essence, we have shown in the last few pages that policy iteration works
for ε-soft policies. Using the natural notion of greedy policy for ε-soft policies,
one is assured of improvement on every step, except when the best policy has
been found among the ε-soft policies. This analysis is independent of how
the action-value functions are determined at each stage, but it does assume
that they are computed exactly. This brings us to roughly the same point
as in the previous section. Now we only achieve the best policy among the
ε-soft policies, but on the other hand, we have eliminated the assumption of
exploring starts. The complete algorithm is given in Figure 5.6.

---

## [Sección 64] Chapter 2 provide mechanisms for this. The on-policy method we present in

-- 140 of 352 --

5.5. OFF-POLICY PREDICTION VIA IMPORTANCE SAMPLING 127
Initialize, for all s ∈ S, a ∈ A(s):
Q(s, a) ← arbitrary
Returns(s, a) ← empty list
π(a|s) ← an arbitrary ε-soft policy
Repeat forever:
(a) Generate an episode using π
(b) For each pair s, a appearing in the episode:
G ← return following the first occurrence of s, a
Append G to Returns(s, a)
Q(s, a) ← average(Returns(s, a))
(c) For each s in the episode:
a∗ ← arg maxa Q(s, a)
For all a ∈ A(s):
π(a|s) ←
{ 1 − ε + ε/|A(s)| if a = a∗
ε/|A(s)| if a 6 = a∗
Figure 5.6: An on-policy first-visit MC control algorithm for ε-soft policies.
5.5 Off-policy Prediction via Importance Sampling
So far we have considered methods for estimating the value functions for a
policy given an infinite supply of episodes generated using that policy. Suppose
now that all we have are episodes generated from a different policy. That is,
suppose we wish to estimate vπ or qπ, but all we have are episodes following
another policy μ, where μ 6 = π. We call π the target policy because learning its
value function is the target of the learning process, and we call μ the behavior
policy because it is the policy controlling the agent and generating behavior.
The overall problem is called off-policy learning because it is learning about a
policy given only experience “off” (not following) that policy.
In order to use episodes from μ to estimate values for π, we must require
that every action taken under π is also taken, at least occasionally, under μ.
That is, we require that π(a|s) > 0 implies μ(a|s) > 0. This is called the
assumption of coverage. It follows from coverage that μ must be stochastic
in states where it is not identical to π. The target policy π, on the other
hand, may be deterministic, and, in fact, this is a case of particular interest.
Typically the target policy is the deterministic greedy policy with respect to
the current action-value function estimate. This policy we hope becomes a
deterministic optimal policy while the behavior policy remains stochastic and
more exploratory, for example, an ε-greedy policy.

-- 141 of 352 --

128 CHAPTER 5. MONTE CARLO METHODS
Importance sampling is a general technique for estimating expected values
under one distribution given samples from another. We apply this technique
to off-policy learning by weighting returns according to the relative probability
of their trajectories occurring under the target and behavior policies, called
the importance-sampling ratio. Given a starting state St, the probability of
the subsequent state–action trajectory, At, St+1, At+1, . . . , ST , occurring under
any policy π is
T −1 ∏
k=t
π(Ak|Sk)p(Sk+1|Sk, Ak),
where p is the state-transition probability function defined by (3.8). Thus, the
relative probability of the trajectory under the target and behavior policies
(the importance-sampling ratio) is
ρT
t =
∏T −1
k=t π(Ak|Sk)p(Sk+1|Sk, Ak)
∏T −1
k=t μ(Ak|Sk)p(Sk+1|Sk, Ak) =
T −1 ∏
k=t
π(Ak|Sk)
μ(Ak|Sk). (5.3)
Note that although the trajectory probabilities depend on the MDP’s transition probabilities, which are generally unknown, all the transition probabilities
cancel and drop out. The importance sampling ratio ends up depending only
on the two policies and not at all on the MDP.
Now we are ready to give a Monte Carto algorithm that uses a batch of
observed episodes following policy μ to estimate vπ(s). It is convenient here to
number time steps in a way that increases across episode boundaries. That is,
if the first episode of the batch ends in a terminal state at time 100, then the
next episode begins at time t = 101. This enables us to use time-step numbers
to refer to particular steps in particular episodes. In particular, we can define
the set of all time steps in which state s is visited, denoted T(s). This is for
an every-visit method; for a first-visit method, T(s) would only include time
steps that were first visits to s within their episode. Also, let T (t) denote the
first time of termination following time t, and Gt denote the return after t
up through T (t). Then {Gt}t∈T(s) are the returns that pertain to state s, and
{ρT (t)
t }t∈T(s) are the corresponding importance-sampling ratios. To estimate
vπ(s), we simply scale the returns by the ratios and average the results:
V (s) =
∑
t∈T(s) ρT (t)
t Gt
|T(s)| . (5.4)
When importance sampling is done as a simple average in this way it is called
ordinary importance sampling.

---

## [Sección 65] Chapter 2 provide mechanisms for this. The on-policy method we present in

-- 142 of 352 --

5.5. OFF-POLICY PREDICTION VIA IMPORTANCE SAMPLING 129
An important alternative is weighted importance sampling, which uses a
weighted average, defined as
V (s) =
∑
t∈T(s) ρT (t)
t Gt
∑
t∈T(s) ρT (t)
t
, (5.5)
or zero if the denominator is zero. To understand these two varieties of importance sampling, consider their estimates after observing a single return. In
the weighted-average estimate, the ratio ρT (t)
t for the single return cancels in
the numerator and denominator, so that the estimate is equal to the observed
return independent of the ratio (assuming the ratio is nonzero). Given that
this return was the only one observed, this is a reasonable estimate, but of
course its expectation is vμ(s) rather than vπ(s), and in this statistical sense it
is biased. In contrast, the simple average (5.4) is always vπ(s) in expectation
(it is unbiased), but it can be extreme. Suppose the ratio were ten, indicating
that the trajectory observed is ten times as likely under the target policy as
under the behavior policy. In this case the ordinary importance-sampling estimate would be ten times the observed return. That is, it would be quite far
from the observed return even though the episode’s trajectory is considered
very representative of the target policy.
Formally, the difference between the two kinds of importance sampling
is expressed in their variances. The variance of the ordinary importancesampling estimator is in general unbounded because the variance of the ratios
is unbounded, whereas in the weighted estimator the largest weight on any
single return is one. In fact, assuming bounded returns, the variance of the
weighted importance-sampling estimator converges to zero even if the variance
of the ratios themselves is infinite (Precup, Sutton, and Dasgupta 2001). In
practice, the weighted estimator usually has dramatically lower variance and is
strongly preferred. A complete every-visit MC algorithm for off-policy policy
evaluation using weighted importance sampling is given at the end of the next
section in Figure 5.9.

-- 143 of 352 --

130 CHAPTER 5. MONTE CARLO METHODS
Example 5.4: Off-policy Estimation of a Blackjack State Value
We applied both ordinary and weighted importance-sampling methods to estimate the value of a single blackjack state from off-policy data. Recall that
one of the advantages of Monte Carlo methods is that they can be used to
evaluate a single state without forming estimates for any other states. In this
example, we evaluated the state in which the dealer is showing a deuce, the
sum of the player’s cards is 13, and the player has a usable ace (that is, the
player holds an ace and a deuce, or equivalently three aces). The data was
generated by starting in this state then choosing to hit or stick at random with
equal probability (the behavior policy). The target policy was to stick only
on a sum of 20 or 21, as in Example 5.1. The value of this state under the
target policy is approximately −0.27726 (this was determined by separately
generating one-hundred million episodes using the target policy and averaging
their returns). Both off-policy methods closely approximated this value after
1000 off-policy episodes using the random policy. Figure 5.7 shows the mean
squared error (estimated from 100 independent runs) for each method as a
function of number of episodes. The weighted importance-sampling method
has much lower overall error in this example, as is typical in practice.
Ordinary
importance
sampling
Weighted importance sampling
Episodes (log scale)
0 10 100 1000 10,000
Mean
square
error
(average over
100 runs)
2
Figure 5.7: Weighted importance sampling produces lower error estimates of
the value of a single blackjack state from off-policy episodes (see Example 5.4).

-- 144 of 352 --

5.5. OFF-POLICY PREDICTION VIA IMPORTANCE SAMPLING 131
100,000 1,000,000 10,000,000 100,000,000
0.1
0.9
R = +1
s
⇡(back|s) = 1
μ(back|s) = 1
back end
v⇡ (s)
Monte-Carlo
estimate of
with
ordinary
importance
sampling
(ten runs)
Episodes (log scale)
1 10 100 1000 10,000
Figure 5.8: Ordinary importance sampling produces surprisingly unstable estimates on the one-state MDP shown inset (Example 5.5). The correct estimate
here is 1, and, even though this is the expected value of a sample return (after
importance sampling), the variance of the samples is infinite, and the estimates
do not convergence to this value. These results are for off-policy first-visit MC.
Example 5.5: Infinite Variance
The estimates of ordinary importance sampling will typically have infinite
variance, and thus unsatisfactory convergence properties, whenever the scaled
returns have infinite variance—and this can easily happen in off-policy learning
when trajectories contain loops. A simple example is shown inset in Figure 5.8.
There is only one nonterminal state s and two actions, end and back. The
end action causes a deterministic transition to termination, whereas the back
action transitions, with probability 0.9, back to s or, with probability 0.1, on
to termination. The rewards are +1 on the latter transition and otherwise
zero. Consider the target policy that always selects back. All episodes under
this policy consist of some number (possibly zero) of transitions back to s
followed by termination with a reward and return of +1. Thus the value of
s under the target policy is thus 1. Suppose we are estimating this value
from off-policy data using the behavior policy that selects end and back with
equal probability. The lower part of Figure 5.8 shows ten independent runs
of the first-visit MC algorithm using ordinary importance sampling. Even
after millions of episodes, the estimates fail to converge to the correct value
of 1. In contrast, the weighted importance-sampling algorithm would give an
estimate of exactly 1 everafter the first episode that was consistent with the
target policy (i.e., that ended with the back action). This is clear because

---

## [Sección 66] Chapter 2 provide mechanisms for this. The on-policy method we present in

-- 145 of 352 --

132 CHAPTER 5. MONTE CARLO METHODS
that algorithm produces a weighted average of the returns consistent with the
target policy, all of which would be exactly 1.
We can verify that the variance of the importance-sampling-scaled returns
is infinite in this example by a simple calculation. The variance of any random
variable X is the expected value of the deviation from its mean ¯ X, which can
be written
Var[X] = E
[(X − ¯ X)2]
= E[X2 − 2X ¯ X + ¯ X2] = E[X2] − ¯ X2.
Thus, if the mean is finite, as it is in our case, the variance is infinite if and
only if the expectation of the square of the random variable is infinite. Thus,
we need only show that the expected square of the importance-sampling-scaled
return is infinite:
E


(T −1 ∏
t=0
π(At|St)
μ(At|St)G0
)2
 .
To compute this expectation, we break it down into cases based on episode
length and termination. First note that, for any episode ending with the
end action, the importance sampling ratio is zero, because the target policy
would never take this action; these episodes thus contribute nothing to the
expectation (the quantity in parenthesis will be zero) and can be ignored. We
need only consider episodes that involve some number (possibly zero) of back
actions that transition back to the nonterminal state, followed by a back action
transitioning to termination. All of these episodes have a return of 1, so the
G0 factor can be ignored. To get the expected square we need only consider
each length of episode, multiplying the probability of the episode’s occurrence
by the square of its importance-sampling ratio, and add these up:
= 1
2 · 0.1
( 1
0.5
)2
(the length 1 episode)
+ 1
2 · 0.9 · 1
2 · 0.1
( 1
0.5
0.5
)2
(the length 2 episode)
+ 1
2 · 0.9 · 1
2 · 0.9 · 1
2 · 0.1
( 1
0.5
0.5
0.5
)2
(the length 3 episode)
+ · · ·
= 0.1
∞ ∑
k=0
0.9k · 2k · 2
= 0.2
∞ ∑
k=0
1.8k
= ∞.

-- 146 of 352 --

5.6. INCREMENTAL IMPLEMENTATION 133
5.6 Incremental Implementation
Monte Carlo prediction methods can be implemented incrementally, on an
episode-by-episode basis, using extensions of the techniques described in Chapter 2. Whereas in Chapter 2 we averaged rewards, in Monte Carlo methods
we average returns. In all other respects exactly the same methods as used
in Chapter 2 can be used for on-policy Monte Carlo methods. For off-policy
Monte Carlo methods, we need to separately consider those that use ordinary
importance sampling and those that use weighted importance sampling.
In ordinary importance sampling, the returns are scaled by the importance
sampling ratio ρT (t)
t (5.3), then simply averaged. For these methods we can
again use the incremental methods of Chapter 2, but using the scaled returns in
place of the rewards of that chapter. This leaves the case of off-policy methods
using weighted importance sampling. Here we have to form a weighted average
of the returns, and a slightly different incremental algorithm is required.
Suppose we have a sequence of returns G1, G2, . . . , Gn−1, all starting in the
same state and each with a corresponding random weight Wi (e.g., Wi = ρT (t)
t ).
We wish to form the estimate
Vn =
∑n−1
k=1 WkGk
∑n−1
k=1 Wk
, n ≥ 2, (5.6)
and keep it up-to-date as we obtain a single additional return Gn. In addition
to keeping track of Vn, we must maintain for each state the cumulative sum
Cn of the weights given to the first n returns. The update rule for Vn is
Vn+1 = Vn + Wn
Cn
[
Gn − Vn
]
, n ≥ 1, (5.7)
and
Cn+1 = Cn + Wn+1,
where C0 = 0 (and V1 is arbitrary and thus need not be specified). Figure 5.9
gives a complete episode-by-episode incremental algorithm for Monte Carlo
policy evaluation. The algorithm is nominally for the off-policy case, using
weighted importance sampling, but applies as well to the on-policy case just
by choosing the target and behavior policies as the same.

-- 147 of 352 --

134 CHAPTER 5. MONTE CARLO METHODS
Initialize, for all s ∈ S, a ∈ A(s):
Q(s, a) ← arbitrary
C(s, a) ← 0
μ(a|s) ← an arbitrary soft behavior policy
π(a|s) ← an arbitrary target policy
Repeat forever:
Generate an episode using μ:
S0, A0, R1, . . . , ST −1, AT −1, RT , ST
G ← 0
W ← 1
For t = T − 1, T − 2, . . . downto 0:
G ← γG + Rt+1
C(St, At) ← C(St, At) + W
Q(St, At) ← Q(St, At) + W
C(St,At) [G − Q(St, At)]
W ← W π(At|St)
μ(At|St)
If W = 0 then ExitForLoop
Figure 5.9: An incremental every-visit MC policy-evaluation algorithm, using
weighted importance sampling. The approximation Q converges to qπ (for all
encountered state–action pairs) even though all actions are selected according
to a potentially different policy, μ. In the on-policy case (π = μ), W is always
1.

---

## [Sección 67] Chapter 2 provide mechanisms for this. The on-policy method we present in

-- 148 of 352 --

5.7. OFF-POLICY MONTE CARLO CONTROL 135
5.7 Off-Policy Monte Carlo Control
We are now ready to present an example of the second class of learning control
methods we consider in this book: off-policy methods. Recall that the distinguishing feature of on-policy methods is that they estimate the value of a
policy while using it for control. In off-policy methods these two functions are
separated. The policy used to generate behavior, called the behavior policy,
may in fact be unrelated to the policy that is evaluated and improved, called
the target policy. An advantage of this separation is that the target policy
may be deterministic (e.g., greedy), while the behavior policy can continue to
sample all possible actions.
Off-policy Monte Carlo control methods use one of the techniques presented
in the preceding two sections. They follow the behavior policy while learning
about and improving the target policy. These techniques requires that the
behavior policy has a nonzero probability of selecting all actions that might
be selected by the target policy (coverage). To explore all possibilities, we
require that the behavior policy be soft (i.e., that it select all actions in all
states with nonzero probability).
Figure 5.10 shows an off-policy Monte Carlo method, based on GPI and
weighted importance sampling, for estimating q∗. The target policy π is the
greedy policy with respect to Q, which is an estimate of qπ. The behavior
policy μ can be anything, but in order to assure convergence of π to the
optimal policy, an infinite number of returns must be obtained for each pair
of state and action. This can be assured by choosing μ to be ε-soft.
A potential problem is that this method learns only from the tails of
episodes, after the last nongreedy action. If nongreedy actions are frequent,
then learning will be slow, particularly for states appearing in the early portions of long episodes. Potentially, this could greatly slow learning. There
has been insufficient experience with off-policy Monte Carlo methods to assess
how serious this problem is. If it is serious, the most important way to address
it is probably by incorporating temporal-difference learning, the algorithmic
idea developed in the next chapter. Alternatively, if γ is less than 1, then the
idea developed in the next section may also help significantly.

-- 149 of 352 --

136 CHAPTER 5. MONTE CARLO METHODS
Initialize, for all s ∈ S, a ∈ A(s):
Q(s, a) ← arbitrary
C(s, a) ← 0
π(s) ← a deterministic policy that is greedy with respect to Q
Repeat forever:
Generate an episode using any soft policy μ:
S0, A0, R1, . . . , ST −1, AT −1, RT , ST
G ← 0
W ← 1
For t = T − 1, T − 2, . . . downto 0:
G ← γG + Rt+1
C(St, At) ← C(St, At) + W
Q(St, At) ← Q(St, At) + W
C(St,At) [G − Q(St, At)]
π(St) ← argmaxa Q(St, a) (with ties broken arbitrarily)
W ← W 1
μ(At|St)
If W = 0 then ExitForLoop
Figure 5.10: An off-policy every-visit MC control algorithm, using weighted
importance sampling. The policy π converges to optimal at all encountered
states even though actions are selected according to a different soft policy μ,
which may change between or even within episodes.
∗5.8 Importance Sampling on Truncated Returns
So far our off-policy methods have formed importance-sampling ratios for
returns considered as unitary wholes. This is clearly the right thing for a
Monte Carlo method to do in the absence of discounting (i.e., if γ = 1),
but if γ < 1 then there may be something better. Consider the case where
episodes are long and γ is significantly less than 1. For concreteness, say that
episodes last 100 steps and that γ = 0. The return from time 0 will then be
G0 = R1, and its importance sampling ratio will be a product of 100 factors,
π(A0|S0)
μ(A0|S0)
π(A1|S1)
μ(A1|S1) · · · π(A99|S99)
μ(A99|S99) . In ordinary importance sampling, the return will
be scaled by the entire product, but it is really only necessary to scale by the
first factor, by π(A0|S0)
μ(A0|S0) . The other 99 factors π(A1|S1)
μ(A1|S1) · · · π(A99|S99)
μ(A99|S99) are irrelevant
because after the first reward the return has already been determined. These
later factors are all independent of the return and of expected value 1; they
do not change the expected update, but they add enormously to its variance.
In some cases they could even make the variance infinite. Let us now consider
an idea for avoiding this large extraneous variance.

---

## [Sección 68] Chapter 2 provide mechanisms for this. The on-policy method we present in

-- 150 of 352 --

∗5.8. IMPORTANCE SAMPLING ON TRUNCATED RETURNS 137
The essence of the idea is to think of discounting as determining a probability of termination or, equivalently, a degree of partial termination. For any
γ ∈ [0, 1), we can think of the return G0 as partly terminating in one step,
to the degree 1 − γ, producing a return of just the first reward, R1, and as
partly terminating after two steps, to the degree (1 − γ)γ, producing a return
of R1 + R2, and so on. The latter degree corresponds to terminating on the
second step, 1 − γ, and not having already terminated on the first step, γ. The
degree of termination on the third step is thus (1 − γ)γ2, with the γ2 reflecting
that termination did not occur on either of the first two steps. The partial
returns here are called flat partial returns:
¯ Gh
t = Rt+1 + Rt+2 + · · · + Rh, 0 ≤ t < h ≤ T,
where “flat” denotes the absence of discounting, and “partial” denotes that
these returns do not extend all the way to termination but instead stop at
h, called the horizon (and T is the time of termination of the episode). The
conventional full return Gt can be viewed as a sum of flat partial returns as
suggested above as follows:
Gt = Rt+1 + γRt+2 + γ2Rt+3 + · · · + γT −t−1RT
= (1 − γ)Rt+1
+ (1 − γ)γ (Rt+1 + Rt+2)
+ (1 − γ)γ2 (Rt+1 + Rt+2 + Rt+3)
...
+ (1 − γ)γT −t−2 (Rt+1 + Rt+2 + · · · + RT −1)
+ γT −t−1 (Rt+1 + Rt+2 + · · · + RT )
= γT −t−1 ¯ GT
t + (1 − γ)
T −1 ∑
h=t+1
γh−t−1 ¯ Gh
t
Now we need to scale the flat partial returns by an importance sampling
ratio that is similarly truncated. As Gh
t only involves rewards up to a horizon
h, we only need the ratio of the probabilities up to h. We define an ordinary
importance-sampling estimator, analogous to (5.4), as
V (s) =
∑
t∈T(s)
(
γT (t)−t−1ρT (t)
t ¯ GT (t)
t + (1 − γ) ∑T (t)−1
h=t+1 γh−t−1ρh
t ¯ Gh
t
)
|T(s)| , (5.8)
and a weighted importance-sampling estimator, analogous to (5.5), as
V (s) =
∑
t∈T(s)
(
γT (t)−t−1ρT (t)
t ¯ GT (t)
t + (1 − γ) ∑T (t)−1
h=t+1 γh−t−1ρh
t ¯ Gh
t
)
∑
t∈T(s)
(
γT (t)−t−1ρT (t)
t + (1 − γ) ∑T (t)−1
h=t+1 γh−t−1ρh
t
) . (5.9)

-- 151 of 352 --

138 CHAPTER 5. MONTE CARLO METHODS
5.9 Summary
The Monte Carlo methods presented in this chapter learn value functions and
optimal policies from experience in the form of sample episodes. This gives
them at least three kinds of advantages over DP methods. First, they can be
used to learn optimal behavior directly from interaction with the environment,
with no model of the environment’s dynamics. Second, they can be used with
simulation or sample models. For surprisingly many applications it is easy to
simulate sample episodes even though it is difficult to construct the kind of
explicit model of transition probabilities required by DP methods. Third, it
is easy and efficient to focus Monte Carlo methods on a small subset of the
states. A region of special interest can be accurately evaluated without going
to the expense of accurately evaluating the rest of the state set (we explore
this further in Chapter 8).
A fourth advantage of Monte Carlo methods, which we discuss later in the
book, is that they may be less harmed by violations of the Markov property.
This is because they do not update their value estimates on the basis of the
value estimates of successor states. In other words, it is because they do not
bootstrap.
In designing Monte Carlo control methods we have followed the overall
schema of generalized policy iteration (GPI) introduced in Chapter 4. GPI
involves interacting processes of policy evaluation and policy improvement.
Monte Carlo methods provide an alternative policy evaluation process. Rather
than use a model to compute the value of each state, they simply average many
returns that start in the state. Because a state’s value is the expected return,
this average can become a good approximation to the value. In control methods we are particularly interested in approximating action-value functions,
because these can be used to improve the policy without requiring a model of
the environment’s transition dynamics. Monte Carlo methods intermix policy
evaluation and policy improvement steps on an episode-by-episode basis, and
can be incrementally implemented on an episode-by-episode basis.
Maintaining sufficient exploration is an issue in Monte Carlo control methods. It is not enough just to select the actions currently estimated to be best,
because then no returns will be obtained for alternative actions, and it may
never be learned that they are actually better. One approach is to ignore this
problem by assuming that episodes begin with state–action pairs randomly
selected to cover all possibilities. Such exploring starts can sometimes be arranged in applications with simulated episodes, but are unlikely in learning
from real experience. In on-policy methods, the agent commits to always
exploring and tries to find the best policy that still explores. In off-policy
methods, the agent also explores, but learns a deterministic optimal policy

---

## [Sección 69] Chapter 2 provide mechanisms for this. The on-policy method we present in

-- 152 of 352 --

5.9. SUMMARY 139
that may be unrelated to the policy followed.
Off-policy Monte Carlo prediction refers to learning the value function of
a target policy from data generated by a different behavior policy. Such learning methods are all based on some form of importance sampling, that is, on
weighting returns by the ratio of the probabilities of taking the observed actions under the two policies. Ordinary importance sampling uses a simple
average of the weighted returns, whereas weighted importance sampling uses
a weighted average. Ordinary importance sampling produces unbiased estimates, but has larger, possibly infinite, variance, whereas weighted importance
sampling always has finite variance and are preferred in practice. Despite their
conceptual simplicity, off-policy Monte Carlo methods for both prediction and
control remain unsettled and a subject of ongoing research.
The Monte Carlo methods treated in this chapter differ from the DP methods treated in the previous chapter in two major ways. First, they operate on
sample experience, and thus can be used for direct learning without a model.
Second, they do not bootstrap. That is, they do not update their value estimates on the basis of other value estimates. These two differences are not
tightly linked, and can be separated. In the next chapter we consider methods
that learn from experience, like Monte Carlo methods, but also bootstrap, like
DP methods.
Bibliographical and Historical Remarks
The term “Monte Carlo” dates from the 1940s, when physicists at Los Alamos
devised games of chance that they could study to help understand complex
physical phenomena relating to the atom bomb. Coverage of Monte Carlo
methods in this sense can be found in several textbooks (e.g., Kalos and Whitlock, 1986; Rubinstein, 1981).
An early use of Monte Carlo methods to estimate action values in a reinforcement learning context was by Michie and Chambers (1968). In pole
balancing (Example 3.4), they used averages of episode durations to assess
the worth (expected balancing “life”) of each possible action in each state,
and then used these assessments to control action selections. Their method is
similar in spirit to Monte Carlo ES with every-visit MC estimates. Narendra
and Wheeler (1986) studied a Monte Carlo method for ergodic finite Markov
chains that used the return accumulated from one visit to a state to the next
as a reward for adjusting a learning automaton’s action probabilities.
Barto and Duff (1994) discussed policy evaluation in the context of classical Monte Carlo algorithms for solving systems of linear equations. They used

-- 153 of 352 --

140 CHAPTER 5. MONTE CARLO METHODS
the analysis of Curtiss (1954) to point out the computational advantages of
Monte Carlo policy evaluation for large problems. Singh and Sutton (1996)
distinguished between every-visit and first-visit MC methods and proved results relating these methods to reinforcement learning algorithms.
The blackjack example is based on an example used by Widrow, Gupta,
and Maitra (1973). The soap bubble example is a classical Dirichlet problem
whose Monte Carlo solution was first proposed by Kakutani (1945; see Hersh
and Griego, 1969; Doyle and Snell, 1984). The racetrack exercise is adapted
from Barto, Bradtke, and Singh (1995), and from Gardner (1973).
Monte Carlo ES was introduced in the 1998 edition of this book. That
may have been the first explicit connection between Monte Carlo estimation
and control methods based on policy iteration.
Efficient off-policy learning has become recognized as an important challenge that arises in several fields. For example, it is closely related to the idea
of “interventions” and “counterfactuals” in probabalistic graphical (Bayesian)
models (e.g., Pearl, 1995; Balke and Pearl, 1994). Off-policy methods using
importance sampling have a long history and yet still are not well understood.
Weighted importance sampling, which is also sometimes called normalized importance sampling (e.g., Koller and Friedman, 2009), is discussed by, for example, Rubinstein (1981), Hesterberg (1988), Shelton (2001), and Liu (2001).
Combining off-policy learning with temporal-difference learning and approximation methods introduces subtle issues that we consider in later chapters.
The target policy in off-policy learning is sometimes referred to in the
literature as the “estimation” policy, as it was in the first edition of this book.
Our treatment of the idea of importance sampling based on truncated returns is based on the analysis and “forward view” of Sutton, Mahmood, Precup, and van Hasselt (2014). A related idea is that of per-decision importance
sampling (Precup, Sutton and Singh, 2000).
Exercises
Exercise 5.1 Consider the diagrams on the right in Figure 5.2. Why does
the estimated value function jump up for the last two rows in the rear? Why
does it drop off for the whole last row on the left? Why are the frontmost
values higher in the upper diagrams than in the lower?
Exercise 5.2 What is the backup diagram for Monte Carlo estimation of qπ?
Exercise 5.3 What is the Monte Carlo estimate analogous to (5.5) for action

---

## [Sección 70] Chapter 2 provide mechanisms for this. The on-policy method we present in

-- 154 of 352 --

5.9. SUMMARY 141
Starting line
Finish
line
Starting line
Finish
line
Figure 5.11: A couple of right turns for the racetrack task.
values, given returns generated using μ?
Exercise 5.4 What is the equation analogous to (5.5) for action values Q(s, a)
instead of state values V (s)?
Exercise 5.5 In learning curves such as those shown in Figure 5.7 error generally decreases with training, as indeed happened for the ordinary importancesampling method. But for the weighted importance-sampling method error
first increased and then decreased. Why do you think this happened?
Exercise 5.6 The results with Example 5.5 and shown in Figure 5.8 used
a first-visit MC method. Suppose that instead an every-visit MC method
was used on the same problem. Would the variance of the estimator still be
infinite? Why or why not?
Exercise 5.7 Modify the algorithm for first-visit MC policy evaluation (Figure 5.1) to use the incremental implementation for sample averages described
in Section 2.4.
Exercise 5.8 Derive the weighted-average update rule (5.7) from (5.6). Follow the pattern of the derivation of the unweighted rule (2.3).
Exercise 5.9: Racetrack (programming) Consider driving a race car
around a turn like those shown in Figure 5.11. You want to go as fast as
possible, but not so fast as to run off the track. In our simplified racetrack,
the car is at one of a discrete set of grid positions, the cells in the diagram. The
velocity is also discrete, a number of grid cells moved horizontally and vertically
per time step. The actions are increments to the velocity components. Each
may be changed by +1, −1, or 0 in one step, for a total of nine actions.

-- 155 of 352 --

142 CHAPTER 5. MONTE CARLO METHODS
Both velocity components are restricted to be nonnegative and less than 5,
and they cannot both be zero. Each episode begins in one of the randomly
selected start states and ends when the car crosses the finish line. The rewards
are −1 for each step that stays on the track, and −5 if the agent tries to drive
off the track. Actually leaving the track is not allowed, but the position is
always advanced by at least one cell along either the horizontal or vertical
axes. With these restrictions and considering only right turns, such as shown
in the figure, all episodes are guaranteed to terminate, yet the optimal policy
is unlikely to be excluded. To make the task more challenging, we assume that
on half of the time steps the position is displaced forward or to the right by
one additional cell beyond that specified by the velocity. Apply a Monte Carlo
control method to this task to compute the optimal policy from each starting
state. Exhibit several trajectories following the optimal policy.
∗Exercise 5.10 Modify the algorithm for off-policy Monte Carlo control (Figure 5.10) to use the idea of the truncated weighted-average estimator (5.9).
Note that you will first need to convert this equation to action values.

-- 156 of 352 --

---

## [Sección 71] Chapter 6

Temporal-Difference Learning
If one had to identify one idea as central and novel to reinforcement learning,
it would undoubtedly be temporal-difference (TD) learning. TD learning is
a combination of Monte Carlo ideas and dynamic programming (DP) ideas.
Like Monte Carlo methods, TD methods can learn directly from raw experience
without a model of the environment’s dynamics. Like DP, TD methods update
estimates based in part on other learned estimates, without waiting for a final
outcome (they bootstrap). The relationship between TD, DP, and Monte
Carlo methods is a recurring theme in the theory of reinforcement learning.
This chapter is the beginning of our exploration of it. Before we are done,
we will see that these ideas and methods blend into each other and can be
combined in many ways. In particular, in Chapter 7 we introduce the TD(λ)
algorithm, which seamlessly integrates TD and Monte Carlo methods.
As usual, we start by focusing on the policy evaluation or prediction problem, that of estimating the value function vπ for a given policy π. For the
control problem (finding an optimal policy), DP, TD, and Monte Carlo methods all use some variation of generalized policy iteration (GPI). The differences
in the methods are primarily differences in their approaches to the prediction
problem.
6.1 TD Prediction
Both TD and Monte Carlo methods use experience to solve the prediction
problem. Given some experience following a policy π, both methods update
their estimate v of vπ for the nonterminal states St occurring in that experience.
Roughly speaking, Monte Carlo methods wait until the return following the
visit is known, then use that return as a target for V (St). A simple every-visit
-- 157 of 352 --

144 CHAPTER 6. TEMPORAL-DIFFERENCE LEARNING
Monte Carlo method suitable for nonstationary environments is
V (St) ← V (St) + α
[
Gt − V (St)
]
, (6.1)
where Gt is the actual return following time t, and α is a constant stepsize parameter (c.f., Equation 2.4). Let us call this method constant-α MC.
Whereas Monte Carlo methods must wait until the end of the episode to
determine the increment to V (St) (only then is Gt known), TD methods need
wait only until the next time step. At time t+1 they immediately form a target
and make a useful update using the observed reward Rt+1 and the estimate
V (St+1). The simplest TD method, known as TD(0), is
V (St) ← V (St) + α
[
Rt+1 + γV (St+1) − V (St)
]
. (6.2)
In effect, the target for the Monte Carlo update is Gt, whereas the target for
the TD update is Rt+1 + γV (St+1).
Because the TD method bases its update in part on an existing estimate,
we say that it is a bootstrapping method, like DP. We know from Chapter 3
that
vπ(s) = Eπ[Gt | St = s] (6.3)
= Eπ
[ ∞ ∑
k=0
γkRt+k+1
∣
∣
∣
∣
∣ St = s
]
= Eπ
[
Rt+1 + γ
∞ ∑
k=0
γkRt+k+2
∣
∣
∣
∣
∣ St = s
]
= Eπ[Rt+1 + γvπ(St+1) | St = s] . (6.4)
Roughly speaking, Monte Carlo methods use an estimate of (6.3) as a target,
whereas DP methods use an estimate of (6.4) as a target. The Monte Carlo
target is an estimate because the expected value in (6.3) is not known; a
sample return is used in place of the real expected return. The DP target
is an estimate not because of the expected values, which are assumed to be
completely provided by a model of the environment, but because vπ(St+1) is
not known and the current estimate, V (St+1), is used instead. The TD target
is an estimate for both reasons: it samples the expected values in (6.4) and it
uses the current estimate V instead of the true vπ. Thus, TD methods combine
the sampling of Monte Carlo with the bootstrapping of DP. As we shall see,
with care and imagination this can take us a long way toward obtaining the
advantages of both Monte Carlo and DP methods.
Figure 6.1 specifies TD(0) completely in procedural form, and Figure 6.2
shows its backup diagram. The value estimate for the state node at the top of

-- 158 of 352 --

6.1. TD PREDICTION 145
Input: the policy π to be evaluated
Initialize V (s) arbitrarily (e.g., V (s) = 0, ∀s ∈ S+)
Repeat (for each episode):
Initialize S
Repeat (for each step of episode):
A ← action given by π for S
Take action A; observe reward, R, and next state, S′
V (S) ← V (S) + α[R + γV (S′) − V (S)]
S ← S′
until S is terminal
Figure 6.1: Tabular TD(0) for estimating vπ.
Figure 6.2: The backup diagram for TD(0).
the backup diagram is updated on the basis of the one sample transition from
it to the immediately following state. We refer to TD and Monte Carlo updates
as sample backups because they involve looking ahead to a sample successor
state (or state–action pair), using the value of the successor and the reward
along the way to compute a backed-up value, and then changing the value
of the original state (or state–action pair) accordingly. Sample backups differ
from the full backups of DP methods in that they are based on a single sample
successor rather than on a complete distribution of all possible successors.
Example 6.1: Driving Home Each day as you drive home from work, you
try to predict how long it will take to get home. When you leave your office,
you note the time, the day of week, and anything else that might be relevant.
Say on this Friday you are leaving at exactly 6 o’clock, and you estimate that
it will take 30 minutes to get home. As you reach your car it is 6:05, and
you notice it is starting to rain. Traffic is often slower in the rain, so you
reestimate that it will take 35 minutes from then, or a total of 40 minutes.
Fifteen minutes later you have completed the highway portion of your journey
in good time. As you exit onto a secondary road you cut your estimate of total
travel time to 35 minutes. Unfortunately, at this point you get stuck behind
a slow truck, and the road is too narrow to pass. You end up having to follow
the truck until you turn onto the side street where you live at 6:40. Three
minutes later you are home. The sequence of states, times, and predictions is

---

## [Sección 72] Chapter 6

-- 159 of 352 --

146 CHAPTER 6. TEMPORAL-DIFFERENCE LEARNING
road
35
45
Predicted
total
travel
time
leaving
office
exiting
highway
2ndary home arrive
Situation
actual outcome
reach
car street home
Figure 6.3: Changes recommended by Monte Carlo methods in the driving
home example.
thus as follows:
Elapsed Time Predicted Predicted
State (minutes) Time to Go Total Time
leaving office, friday at 6 0 30 30
reach car, raining 5 35 40
exiting highway 20 15 35
2ndary road, behind truck 30 10 40
entering home street 40 3 43
arrive home 43 0 43
The rewards in this example are the elapsed times on each leg of the journey.1
We are not discounting (γ = 1), and thus the return for each state is the actual
time to go from that state. The value of each state is the expected time to go.
The second column of numbers gives the current estimated value for each state
encountered.
A simple way to view the operation of Monte Carlo methods is to plot the
predicted total time (the last column) over the sequence, as in Figure 6.3. The
arrows show the changes in predictions recommended by the constant-α MC
method (6.1), for α = 1. These are exactly the errors between the estimated
value (predicted time to go) in each state and the actual return (actual time
to go). For example, when you exited the highway you thought it would take
only 15 minutes more to get home, but in fact it took 23 minutes. Equation
6.1 applies at this point and determines an increment in the estimate of time
to go after exiting the highway. The error, Gt − V (St), at this time is eight
1If this were a control problem with the objective of minimizing travel time, then we
would of course make the rewards the negative of the elapsed time. But since we are
concerned here only with prediction (policy evaluation), we can keep things simple by using
positive numbers.

-- 160 of 352 --

6.1. TD PREDICTION 147
actual
outcome
Situation
35
45
Predicted
total
travel
time
road
leaving
office
exiting
highway
2ndary home arrive reach
car street home
Figure 6.4: Changes recommended by TD methods in the driving home example.
minutes. Suppose the step-size parameter, α, is 1/2. Then the predicted time
to go after exiting the highway would be revised upward by four minutes as a
result of this experience. This is probably too large a change in this case; the
truck was probably just an unlucky break. In any event, the change can only
be made off-line, that is, after you have reached home. Only at this point do
you know any of the actual returns.
Is it necessary to wait until the final outcome is known before learning can
begin? Suppose on another day you again estimate when leaving your office
that it will take 30 minutes to drive home, but then you become stuck in a
massive traffic jam. Twenty-five minutes after leaving the office you are still
bumper-to-bumper on the highway. You now estimate that it will take another
25 minutes to get home, for a total of 50 minutes. As you wait in traffic, you
already know that your initial estimate of 30 minutes was too optimistic. Must
you wait until you get home before increasing your estimate for the initial
state? According to the Monte Carlo approach you must, because you don’t
yet know the true return.
According to a TD approach, on the other hand, you would learn immediately, shifting your initial estimate from 30 minutes toward 50. In fact, each
estimate would be shifted toward the estimate that immediately follows it.
Returning to our first day of driving, Figure 6.4 shows the same predictions as
Figure 6.3, except with the changes recommended by the TD rule (6.2) (these
are the changes made by the rule if α = 1). Each error is proportional to
the change over time of the prediction, that is, to the temporal differences in
predictions.
Besides giving you something to do while waiting in traffic, there are several
computational reasons why it is advantageous to learn based on your current
predictions rather than waiting until termination when you know the actual

---

## [Sección 73] Chapter 6

-- 161 of 352 --

148 CHAPTER 6. TEMPORAL-DIFFERENCE LEARNING
return. We briefly discuss some of these next.
6.2 Advantages of TD Prediction Methods
TD methods learn their estimates in part on the basis of other estimates.
They learn a guess from a guess—they bootstrap. Is this a good thing to do?
What advantages do TD methods have over Monte Carlo and DP methods?
Developing and answering such questions will take the rest of this book and
more. In this section we briefly anticipate some of the answers.
Obviously, TD methods have an advantage over DP methods in that they
do not require a model of the environment, of its reward and next-state probability distributions.
The next most obvious advantage of TD methods over Monte Carlo methods is that they are naturally implemented in an on-line, fully incremental
fashion. With Monte Carlo methods one must wait until the end of an episode,
because only then is the return known, whereas with TD methods one need
wait only one time step. Surprisingly often this turns out to be a critical
consideration. Some applications have very long episodes, so that delaying all
learning until an episode’s end is too slow. Other applications are continuing
tasks and have no episodes at all. Finally, as we noted in the previous chapter, some Monte Carlo methods must ignore or discount episodes on which
experimental actions are taken, which can greatly slow learning. TD methods are much less susceptible to these problems because they learn from each
transition regardless of what subsequent actions are taken.
But are TD methods sound? Certainly it is convenient to learn one guess
from the next, without waiting for an actual outcome, but can we still guarantee convergence to the correct answer? Happily, the answer is yes. For any
fixed policy π, the TD algorithm described above has been proved to converge
to vπ, in the mean for a constant step-size parameter if it is sufficiently small,
and with probability 1 if the step-size parameter decreases according to the
usual stochastic approximation conditions (2.7). Most convergence proofs apply only to the table-based case of the algorithm presented above (6.2), but
some also apply to the case of general linear function approximation. These
results are discussed in a more general setting in the next two chapters.
If both TD and Monte Carlo methods converge asymptotically to the correct predictions, then a natural next question is “Which gets there first?” In
other words, which method learns faster? Which makes the more efficient use
of limited data? At the current time this is an open question in the sense
that no one has been able to prove mathematically that one method converges

-- 162 of 352 --

6.2. ADVANTAGES OF TD PREDICTION METHODS 149
A B C D E 1 0 0 0 0 0
start
Figure 6.5: A small Markov process for generating random walks.
faster than the other. In fact, it is not even clear what is the most appropriate formal way to phrase this question! In practice, however, TD methods
have usually been found to converge faster than constant-α MC methods on
stochastic tasks, as illustrated in the following example.
Example 6.2: Random Walk In this example we empirically compare the
prediction abilities of TD(0) and constant-α MC applied to the small Markov
process shown in Figure 6.5. All episodes start in the center state, C, and
proceed either left or right by one state on each step, with equal probability. This behavior is presumably due to the combined effect of a fixed policy
and an environment’s state-transition probabilities, but we do not care which;
we are concerned only with predicting returns however they are generated.
Episodes terminate either on the extreme left or the extreme right. When an
episode terminates on the right a reward of +1 occurs; all other rewards are
zero. For example, a typical walk might consist of the following state-andreward sequence: C, 0, B, 0, C, 0, D, 0, E, 1. Because this task is undiscounted
and episodic, the true value of each state is the probability of terminating
on the right if starting from that state. Thus, the true value of the center state is vπ(C) = 0.5. The true values of all the states, A through E, are
6 , 2
6 , 3
6 , 4
6 , and 5
6 . Figure 6.6 shows the values learned by TD(0) approaching the
true values as more episodes are experienced. Averaging over many episode
sequences, Figure 6.7 shows the average error in the predictions found by
TD(0) and constant-α MC, for a variety of values of α, as a function of number of episodes. In all cases the approximate value function was initialized
to the intermediate value V (s) = 0.5, for all s. The TD method is consistently better than the MC method on this task over this number of episodes.

---

## [Sección 74] Chapter 6

-- 163 of 352 --

150 CHAPTER 6. TEMPORAL-DIFFERENCE LEARNING
0.8
0.2
0.4
0.6
A B C D E
10
100
State
Estimated
value
true
values
Figure 6.6: Values learned by TD(0) after various numbers of episodes. The
final estimate is about as close as the estimates ever get to the true values.
With a constant step-size parameter (α = 0.1 in this example), the values
fluctuate indefinitely in response to the outcomes of the most recent episodes.
0.05
0.1
0.15
0.2
0.25
0 25 50 75 100
Walks / Episodes
TD
MC
!=.05
!=.01
!=.1
!=.15
!=.02
!=.04
!=.03
RMS error,
averaged
over states
Figure 6.7: Learning curves for TD(0) and constant-α MC methods, for various
values of α, on the prediction problem for the random walk. The performance
measure shown is the root mean-squared (RMS) error between the value function learned and the true value function, averaged over the five states. These
data are averages over 100 different sequences of episodes.

-- 164 of 352 --

6.3. OPTIMALITY OF TD(0) 151
6.3 Optimality of TD(0)
Suppose there is available only a finite amount of experience, say 10 episodes
or 100 time steps. In this case, a common approach with incremental learning
methods is to present the experience repeatedly until the method converges
upon an answer. Given an approximate value function, V , the increments
specified by (6.1) or (6.2) are computed for every time step t at which a
nonterminal state is visited, but the value function is changed only once, by
the sum of all the increments. Then all the available experience is processed
again with the new value function to produce a new overall increment, and
so on, until the value function converges. We call this batch updating because
updates are made only after processing each complete batch of training data.
Under batch updating, TD(0) converges deterministically to a single answer independent of the step-size parameter, α, as long as α is chosen to be
sufficiently small. The constant-α MC method also converges deterministically
under the same conditions, but to a different answer. Understanding these two
answers will help us understand the difference between the two methods. Under normal updating the methods do not move all the way to their respective
batch answers, but in some sense they take steps in these directions. Before
trying to understand the two answers in general, for all possible tasks, we first
look at a few examples.
Example 6.3 Random walk under batch updating. Batch-updating versions
of TD(0) and constant-α MC were applied as follows to the random walk prediction example (Example 6.2). After each new episode, all episodes seen so
far were treated as a batch. They were repeatedly presented to the algorithm,
either TD(0) or constant-α MC, with α sufficiently small that the value function converged. The resulting value function was then compared with vπ, and
the average root mean-squared error across the five states (and across 100
independent repetitions of the whole experiment) was plotted to obtain the
learning curves shown in Figure 6.8. Note that the batch TD method was
consistently better than the batch Monte Carlo method.
Under batch training, constant-α MC converges to values, V (s), that are
sample averages of the actual returns experienced after visiting each state s.
These are optimal estimates in the sense that they minimize the mean-squared
error from the actual returns in the training set. In this sense it is surprising
that the batch TD method was able to perform better according to the root
mean-squared error measure shown in Figure 6.8. How is it that batch TD
was able to perform better than this optimal method? The answer is that the
Monte Carlo method is optimal only in a limited way, and that TD is optimal
in a way that is more relevant to predicting returns. But first let’s develop our

-- 165 of 352 --

152 CHAPTER 6. TEMPORAL-DIFFERENCE LEARNING
. 0
.05
. 1
.15
. 2
.25
0 25 50 75 100
TD
MC
BATCH TRAINING
Walks / Episodes
RMS error,
averaged
over states
Figure 6.8: Performance of TD(0) and constant-α MC under batch training
on the random walk task.
intuitions about different kinds of optimality through another example.
Example 6.4: You are the Predictor Place yourself now in the role of
the predictor of returns for an unknown Markov reward process. Suppose you
observe the following eight episodes:
A, 0, B, 0 B, 1
B, 1 B, 1
B, 1 B, 1
B, 1 B, 0
This means that the first episode started in state A, transitioned to B with
a reward of 0, and then terminated from B with a reward of 0. The other
seven episodes were even shorter, starting from B and terminating immediately.
Given this batch of data, what would you say are the optimal predictions, the
best values for the estimates V (A) and V (B)? Everyone would probably agree
that the optimal value for V (B) is 3
4 , because six out of the eight times in state
B the process terminated immediately with a return of 1, and the other two
times in B the process terminated immediately with a return of 0.
But what is the optimal value for the estimate V (A) given this data? Here
there are two reasonable answers. One is to observe that 100% of the times
the process was in state A it traversed immediately to B (with a reward of 0);
and since we have already decided that B has value 3
4 , therefore A must have
value 3
4 as well. One way of viewing this answer is that it is based on first
modeling the Markov process, in this case as

---

## [Sección 75] Chapter 6

-- 166 of 352 --

6.3. OPTIMALITY OF TD(0) 153
A B
r = 1
100%
75%
25%
r = 0
r = 0
and then computing the correct estimates given the model, which indeed in
this case gives V (A) = 3
4 . This is also the answer that batch TD(0) gives.
The other reasonable answer is simply to observe that we have seen A once
and the return that followed it was 0; we therefore estimate V (A) as 0. This
is the answer that batch Monte Carlo methods give. Notice that it is also the
answer that gives minimum squared error on the training data. In fact, it gives
zero error on the data. But still we expect the first answer to be better. If
the process is Markov, we expect that the first answer will produce lower error
on future data, even though the Monte Carlo answer is better on the existing
data.
The above example illustrates a general difference between the estimates
found by batch TD(0) and batch Monte Carlo methods. Batch Monte Carlo
methods always find the estimates that minimize mean-squared error on the
training set, whereas batch TD(0) always finds the estimates that would be
exactly correct for the maximum-likelihood model of the Markov process. In
general, the maximum-likelihood estimate of a parameter is the parameter
value whose probability of generating the data is greatest. In this case, the
maximum-likelihood estimate is the model of the Markov process formed in the
obvious way from the observed episodes: the estimated transition probability
from i to j is the fraction of observed transitions from i that went to j, and
the associated expected reward is the average of the rewards observed on
those transitions. Given this model, we can compute the estimate of the value
function that would be exactly correct if the model were exactly correct. This
is called the certainty-equivalence estimate because it is equivalent to assuming
that the estimate of the underlying process was known with certainty rather
than being approximated. In general, batch TD(0) converges to the certaintyequivalence estimate.
This helps explain why TD methods converge more quickly than Monte
Carlo methods. In batch form, TD(0) is faster than Monte Carlo methods
because it computes the true certainty-equivalence estimate. This explains
the advantage of TD(0) shown in the batch results on the random walk task
(Figure 6.8). The relationship to the certainty-equivalence estimate may also
explain in part the speed advantage of nonbatch TD(0) (e.g., Figure 6.7). Although the nonbatch methods do not achieve either the certainty-equivalence

-- 167 of 352 --

154 CHAPTER 6. TEMPORAL-DIFFERENCE LEARNING
or the minimum squared-error estimates, they can be understood as moving
roughly in these directions. Nonbatch TD(0) may be faster than constant-α
MC because it is moving toward a better estimate, even though it is not getting all the way there. At the current time nothing more definite can be said
about the relative efficiency of on-line TD and Monte Carlo methods.
Finally, it is worth noting that although the certainty-equivalence estimate
is in some sense an optimal solution, it is almost never feasible to compute
it directly. If N is the number of states, then just forming the maximumlikelihood estimate of the process may require N 2 memory, and computing the
corresponding value function requires on the order of N 3 computational steps
if done conventionally. In these terms it is indeed striking that TD methods
can approximate the same solution using memory no more than N and repeated computations over the training set. On tasks with large state spaces,
TD methods may be the only feasible way of approximating the certaintyequivalence solution.
6.4 Sarsa: On-Policy TD Control
We turn now to the use of TD prediction methods for the control problem.
As usual, we follow the pattern of generalized policy iteration (GPI), only this
time using TD methods for the evaluation or prediction part. As with Monte
Carlo methods, we face the need to trade off exploration and exploitation, and
again approaches fall into two main classes: on-policy and off-policy. In this
section we present an on-policy TD control method.
The first step is to learn an action-value function rather than a state-value
function. In particular, for an on-policy method we must estimate qπ(s, a) for
the current behavior policy π and for all states s and actions a. This can
be done using essentially the same TD method described above for learning
vπ. Recall that an episode consists of an alternating sequence of states and
state–action pairs:
At
Rt+1
St At+1
Rt+2
St+1 At+2
Rt+3
St+2 At+3
St+3
. . . . . .
In the previous section we considered transitions from state to state and
learned the values of states. Now we consider transitions from state–action
pair to state–action pair, and learn the value of state–action pairs. Formally
these cases are identical: they are both Markov chains with a reward process.
The theorems assuring the convergence of state values under TD(0) also apply

---

## [Sección 76] Chapter 6

-- 168 of 352 --

6.4. SARSA: ON-POLICY TD CONTROL 155
Initialize Q(s, a), ∀s ∈ S, a ∈ A(s), arbitrarily, and Q(terminal-state, ·) = 0
Repeat (for each episode):
Initialize S
Choose A from S using policy derived from Q (e.g., -greedy)
Repeat (for each step of episode):
Take action A, observe R, S′
Choose A′ from S′ using policy derived from Q (e.g., -greedy)
Q(S, A) ← Q(S, A) + α[R + γQ(S′, A′) − Q(S, A)]
S ← S′; A ← A′;
until S is terminal
Figure 6.9: Sarsa: An on-policy TD control algorithm.
to the corresponding algorithm for action values:
Q(St, At) ← Q(St, At) + α
[
Rt+1 + γQ(St+1, At+1) − Q(St, At)
]
. (6.5)
This update is done after every transition from a nonterminal state St. If St+1
is terminal, then Q(St+1, At+1) is defined as zero. This rule uses every element
of the quintuple of events, (St, At, Rt+1, St+1, At+1), that make up a transition
from one state–action pair to the next. This quintuple gives rise to the name
Sarsa for the algorithm.
It is straightforward to design an on-policy control algorithm based on the
Sarsa prediction method. As in all on-policy methods, we continually estimate
qπ for the behavior policy π, and at the same time change π toward greediness
with respect to qπ. The general form of the Sarsa control algorithm is given
in Figure 6.9.
The convergence properties of the Sarsa algorithm depend on the nature
of the policy’s dependence on q. For example, one could use ε-greedy or ε-
soft policies. According to Satinder Singh (personal communication), Sarsa
converges with probability 1 to an optimal policy and action-value function as
long as all state–action pairs are visited an infinite number of times and the
policy converges in the limit to the greedy policy (which can be arranged, for
example, with ε-greedy policies by setting ε = 1/t), but this result has not yet
been published in the literature.
Example 6.5: Windy Gridworld Figure 6.10 shows a standard gridworld,
with start and goal states, but with one difference: there is a crosswind upward
through the middle of the grid. The actions are the standard four—up, down,
right, and left—but in the middle region the resultant next states are shifted
upward by a “wind,” the strength of which varies from column to column. The
strength of the wind is given below each column, in number of cells shifted

-- 169 of 352 --

156 CHAPTER 6. TEMPORAL-DIFFERENCE LEARNING
S G
0 0 0 0 1 1 1 1 2 2
standard
moves
king's
moves
Figure 6.10: Gridworld in which movement is altered by a location-dependent,
upward “wind.”
0 1000 2000 3000 4000 5000 6000 7000 8000
50
150
Episodes
Time steps
S G
0 0 0 0 1 1 1 1 2 2
Figure 6.11: Results of Sarsa applied to the windy gridworld.

-- 170 of 352 --

6.5. Q-LEARNING: OFF-POLICY TD CONTROL 157
upward. For example, if you are one cell to the right of the goal, then the
action left takes you to the cell just above the goal. Let us treat this as an
undiscounted episodic task, with constant rewards of −1 until the goal state
is reached. Figure 6.11 shows the result of applying ε-greedy Sarsa to this
task, with ε = 0.1, α = 0.5, and the initial values Q(s, a) = 0 for all s, a. The
increasing slope of the graph shows that the goal is reached more and more
quickly over time. By 8000 time steps, the greedy policy (shown inset) was
long since optimal; continued ε-greedy exploration kept the average episode
length at about 17 steps, two more than the minimum of 15. Note that Monte
Carlo methods cannot easily be used on this task because termination is not
guaranteed for all policies. If a policy was ever found that caused the agent to
stay in the same state, then the next episode would never end. Step-by-step
learning methods such as Sarsa do not have this problem because they quickly
learn during the episode that such policies are poor, and switch to something
else.
6.5 Q-Learning: Off-Policy TD Control
One of the most important breakthroughs in reinforcement learning was the development of an off-policy TD control algorithm known as Q-learning (Watkins,
1989). Its simplest form, one-step Q-learning, is defined by
Q(St, At) ← Q(St, At) + α
[
Rt+1 + γ max
a Q(St+1, a) − Q(St, At)
]
. (6.6)
In this case, the learned action-value function, Q, directly approximates q∗,
the optimal action-value function, independent of the policy being followed.
This dramatically simplifies the analysis of the algorithm and enabled early
convergence proofs. The policy still has an effect in that it determines which
state–action pairs are visited and updated. However, all that is required for
correct convergence is that all pairs continue to be updated. As we observed
in Chapter 5, this is a minimal requirement in the sense that any method
guaranteed to find optimal behavior in the general case must require it. Under
this assumption and a variant of the usual stochastic approximation conditions
on the sequence of step-size parameters, Q has been shown to converge with
probability 1 to q∗. The Q-learning algorithm is shown in procedural form in
Figure 6.12.
What is the backup diagram for Q-learning? The rule (6.6) updates a
state–action pair, so the top node, the root of the backup, must be a small,
filled action node. The backup is also from action nodes, maximizing over all
those actions possible in the next state. Thus the bottom nodes of the backup
diagram should be all these action nodes. Finally, remember that we indicate

---

## [Sección 77] Chapter 6

-- 171 of 352 --

158 CHAPTER 6. TEMPORAL-DIFFERENCE LEARNING
Initialize Q(s, a), ∀s ∈ S, a ∈ A(s), arbitrarily, and Q(terminal-state, ·) = 0
Repeat (for each episode):
Initialize S
Repeat (for each step of episode):
Choose A from S using policy derived from Q (e.g., -greedy)
Take action A, observe R, S′
Q(S, A) ← Q(S, A) + α[R + γ maxa Q(S′, a) − Q(S, A)]
S ← S′;
until S is terminal
Figure 6.12: Q-learning: An off-policy TD control algorithm.
taking the maximum of these “next action” nodes with an arc across them
(Figure 3.7). Can you guess now what the diagram is? If so, please do make
a guess before turning to the answer in Figure 6.14.
Example 6.6: Cliff Walking This gridworld example compares Sarsa
and Q-learning, highlighting the difference between on-policy (Sarsa) and offpolicy (Q-learning) methods. Consider the gridworld shown in the upper part
of Figure 6.13. This is a standard undiscounted, episodic task, with start and
goal states, and the usual actions causing movement up, down, right, and left.
Reward is −1 on all transitions except those into the the region marked “The
Cliff.” Stepping into this region incurs a reward of −100 and sends the agent
instantly back to the start. The lower part of the figure shows the performance
of the Sarsa and Q-learning methods with ε-greedy action selection, ε = 0.1.
After an initial transient, Q-learning learns values for the optimal policy, that
which travels right along the edge of the cliff. Unfortunately, this results in
its occasionally falling off the cliff because of the ε-greedy action selection.
Sarsa, on the other hand, takes the action selection into account and learns
the longer but safer path through the upper part of the grid. Although Qlearning actually learns the values of the optimal policy, its on-line performance
is worse than that of Sarsa, which learns the roundabout policy. Of course, if
ε were gradually reduced, then both methods would asymptotically converge
to the optimal policy.

-- 172 of 352 --

6.5. Q-LEARNING: OFF-POLICY TD CONTROL 159
Reward
per
epsiode
!100
!75
!50
!25
0 100 200 300 400 500
Episodes
Sarsa
Q-learning
S G
r = !100
T h e C l i f f
r = !1 safe path
optimal path
R
R
Figure 6.13: The cliff-walking task. The results are from a single run, but
smoothed.
Figure 6.14: The backup diagram for Q-learning.

-- 173 of 352 --

160 CHAPTER 6. TEMPORAL-DIFFERENCE LEARNING
6.6 Games, Afterstates, and Other Special Cases
In this book we try to present a uniform approach to a wide class of tasks,
but of course there are always exceptional tasks that are better treated in a
specialized way. For example, our general approach involves learning an action-value function, but in Chapter 1 we presented a TD method for learning
to play tic-tac-toe that learned something much more like a state-value function. If we look closely at that example, it becomes apparent that the function
learned there is neither an action-value function nor a state-value function in
the usual sense. A conventional state-value function evaluates states in which
the agent has the option of selecting an action, but the state-value function
used in tic-tac-toe evaluates board positions after the agent has made its move.
Let us call these afterstates, and value functions over these, afterstate value
functions. Afterstates are useful when we have knowledge of an initial part
of the environment’s dynamics but not necessarily of the full dynamics. For
example, in games we typically know the immediate effects of our moves. We
know for each possible chess move what the resulting position will be, but not
how our opponent will reply. Afterstate value functions are a natural way to
take advantage of this kind of knowledge and thereby produce a more efficient
learning method.
The reason it is more efficient to design algorithms in terms of afterstates is
apparent from the tic-tac-toe example. A conventional action-value function
would map from positions and moves to an estimate of the value. But many
position–move pairs produce the same resulting position, as in this example:
X
O X
X
O + X O + X
X
In such cases the position–move pairs are different but produce the same “afterposition,” and thus must have the same value. A conventional action-value
function would have to separately assess both pairs, whereas an afterstate
value function would immediately assess both equally. Any learning about the
position–move pair on the left would immediately transfer to the pair on the
right.
Afterstates arise in many tasks, not just games. For example, in queuing

---

## [Sección 78] Chapter 6

-- 174 of 352 --

6.7. SUMMARY 161
tasks there are actions such as assigning customers to servers, rejecting customers, or discarding information. In such cases the actions are in fact defined
in terms of their immediate effects, which are completely known. For example, in the access-control queuing example described in the previous section,
a more efficient learning method could be obtained by breaking the environment’s dynamics into the immediate effect of the action, which is deterministic
and completely known, and the unknown random processes having to do with
the arrival and departure of customers. The afterstates would be the number
of free servers after the action but before the random processes had produced
the next conventional state. Learning an afterstate value function over the
afterstates would enable all actions that produced the same number of free
servers to share experience. This should result in a significant reduction in
learning time.
It is impossible to describe all the possible kinds of specialized problems
and corresponding specialized learning algorithms. However, the principles
developed in this book should apply widely. For example, afterstate methods
are still aptly described in terms of generalized policy iteration, with a policy
and (afterstate) value function interacting in essentially the same way. In many
cases one will still face the choice between on-policy and off-policy methods
for managing the need for persistent exploration.
6.7 Summary
In this chapter we introduced a new kind of learning method, temporaldifference (TD) learning, and showed how it can be applied to the reinforcement learning problem. As usual, we divided the overall problem into a prediction problem and a control problem. TD methods are alternatives to Monte
Carlo methods for solving the prediction problem. In both cases, the extension
to the control problem is via the idea of generalized policy iteration (GPI) that
we abstracted from dynamic programming. This is the idea that approximate
policy and value functions should interact in such a way that they both move
toward their optimal values.
One of the two processes making up GPI drives the value function to accurately predict returns for the current policy; this is the prediction problem. The
other process drives the policy to improve locally (e.g., to be ε-greedy) with
respect to the current value function. When the first process is based on experience, a complication arises concerning maintaining sufficient exploration. We
have grouped the TD control methods according to whether they deal with
this complication by using an on-policy or off-policy approach. Sarsa and
actor–critic methods are on-policy methods, and Q-learning and R-learning

-- 175 of 352 --

162 CHAPTER 6. TEMPORAL-DIFFERENCE LEARNING
are off-policy methods.
The methods presented in this chapter are today the most widely used reinforcement learning methods. This is probably due to their great simplicity:
they can be applied on-line, with a minimal amount of computation, to experience generated from interaction with an environment; they can be expressed
nearly completely by single equations that can be implemented with small
computer programs. In the next few chapters we extend these algorithms,
making them slightly more complicated and significantly more powerful. All
the new algorithms will retain the essence of those introduced here: they will
be able to process experience on-line, with relatively little computation, and
they will be driven by TD errors. The special cases of TD methods introduced
in the present chapter should rightly be called one-step, tabular, modelfree TD
methods. In the next three chapters we extend them to multistep forms (a
link to Monte Carlo methods), forms using function approximation rather than
tables (a link to artificial neural networks), and forms that include a model of
the environment (a link to planning and dynamic programming).
Finally, in this chapter we have discussed TD methods entirely within
the context of reinforcement learning problems, but TD methods are actually
more general than this. They are general methods for learning to make longterm predictions about dynamical systems. For example, TD methods may
be relevant to predicting financial data, life spans, election outcomes, weather
patterns, animal behavior, demands on power stations, or customer purchases.
It was only when TD methods were analyzed as pure prediction methods, independent of their use in reinforcement learning, that their theoretical properties
first came to be well understood. Even so, these other potential applications
of TD learning methods have not yet been extensively explored.
Bibliographical and Historical Remarks
As we outlined in Chapter 1, the idea of TD learning has its early roots in
animal learning psychology and artificial intelligence, most notably the work
of Samuel (1959) and Klopf (1972). Samuel’s work is described as a case
study in Section 15.2. Also related to TD learning are Holland’s (1975, 1976)
early ideas about consistency among value predictions. These influenced one
of the authors (Barto), who was a graduate student from 1970 to 1975 at the
University of Michigan, where Holland was teaching. Holland’s ideas led to a
number of TD-related systems, including the work of Booker (1982) and the
bucket brigade of Holland (1986), which is related to Sarsa as discussed below.
6.1–2 Most of the specific material from these sections is from Sutton (1988),

---

## [Sección 79] Chapter 6

-- 176 of 352 --

6.7. SUMMARY 163
including the TD(0) algorithm, the random walk example, and the term
“temporal-difference learning.” The characterization of the relationship
to dynamic programming and Monte Carlo methods was influenced
by Watkins (1989), Werbos (1987), and others. The use of backup
diagrams here and in other chapters is new to this book. Example 6.4
is due to Sutton, but has not been published before.
Tabular TD(0) was proved to converge in the mean by Sutton (1988)
and with probability 1 by Dayan (1992), based on the work of Watkins
and Dayan (1992). These results were extended and strengthened by
Jaakkola, Jordan, and Singh (1994) and Tsitsiklis (1994) by using extensions of the powerful existing theory of stochastic approximation.
Other extensions and generalizations are covered in the next two chapters.
6.3 The optimality of the TD algorithm under batch training was established by Sutton (1988). The term certainty equivalence is from the
adaptive control literature (e.g., Goodwin and Sin, 1984). Illuminating
this result is Barnard’s (1993) derivation of the TD algorithm as a combination of one step of an incremental method for learning a model of
the Markov chain and one step of a method for computing predictions
from the model.
6.4 The Sarsa algorithm was first explored by Rummery and Niranjan
(1994), who called it modified Q-learning. The name “Sarsa” was introduced by Sutton (1996). The convergence of one-step tabular Sarsa
(the form treated in this chapter) has been proved by Satinder Singh
(personal communication). The “windy gridworld” example was suggested by Tom Kalt.
Holland’s (1986) bucket brigade idea evolved into an algorithm closely
related to Sarsa. The original idea of the bucket brigade involved chains
of rules triggering each other; it focused on passing credit back from
the current rule to the rules that triggered it. Over time, the bucket
brigade came to be more like TD learning in passing credit back to
any temporally preceding rule, not just to the ones that triggered the
current rule. The modern form of the bucket brigade, when simplified
in various natural ways, is nearly identical to one-step Sarsa, as detailed
by Wilson (1994).
6.5 Q-learning was introduced by Watkins (1989), whose outline of a convergence proof was later made rigorous by Watkins and Dayan (1992).
More general convergence results were proved by Jaakkola, Jordan, and
Singh (1994) and Tsitsiklis (1994).

-- 177 of 352 --

164 CHAPTER 6. TEMPORAL-DIFFERENCE LEARNING
6.6 R-learning is due to Schwartz (1993). Mahadevan (1996), Tadepalli
and Ok (1994), and Bertsekas and Tsitsiklis (1996) have studied reinforcement learning for undiscounted continuing tasks. In the literature,
the undiscounted continuing case is often called the case of maximizing “average reward per time step” or the “average-reward case.” The
name R-learning was probably meant to be the alphabetic successor to
Q-learning, but we prefer to think of it as a reference to the learning of
relative values. The access-control queuing example was suggested by
the work of Carlstr¨om and Nordstr¨om (1997).
Exercises
Exercise 6.1 This is an exercise to help develop your intuition about why
TD methods are often more efficient than Monte Carlo methods. Consider
the driving home example and how it is addressed by TD and Monte Carlo
methods. Can you imagine a scenario in which a TD update would be better on
average than an Monte Carlo update? Give an example scenario—a description
of past experience and a current state—in which you would expect the TD
update to be better. Here’s a hint: Suppose you have lots of experience
driving home from work. Then you move to a new building and a new parking
lot (but you still enter the highway at the same place). Now you are starting
to learn predictions for the new building. Can you see why TD updates are
likely to be much better, at least initially, in this case? Might the same sort
of thing happen in the original task?
Exercise 6.2 From Figure 6.6, it appears that the first episode results in a
change in only V (A). What does this tell you about what happened on the
first episode? Why was only the estimate for this one state changed? By
exactly how much was it changed?
Exercise 6.3 The specific results shown in Figure 6.7 are dependent on the
value of the step-size parameter, α. Do you think the conclusions about which
algorithm is better would be affected if a wider range of α values were used?
Is there a different, fixed value of α at which either algorithm would have
performed significantly better than shown? Why or why not?
Exercise 6.4 In Figure 6.7, the RMS error of the TD method seems to go
down and then up again, particularly at high α’s. What could have caused
this? Do you think this always occurs, or might it be a function of how the
approximate value function was initialized?
Exercise 6.5 Above we stated that the true values for the random walk task

---

## [Sección 80] Chapter 6

-- 178 of 352 --

6.7. SUMMARY 165
are 1
6 , 2
6 , 3
6 , 4
6 , and 5
6 , for states A through E. Describe at least two different
ways that these could have been computed. Which would you guess we actually
used? Why?
Exercise 6.6: Windy Gridworld with King’s Moves Re-solve the
windy gridworld task assuming eight possible actions, including the diagonal
moves, rather than the usual four. How much better can you do with the extra
actions? Can you do even better by including a ninth action that causes no
movement at all other than that caused by the wind?
Exercise 6.7: Stochastic Wind Resolve the windy gridworld task with
King’s moves, assuming that the effect of the wind, if there is any, is stochastic,
sometimes varying by 1 from the mean values given for each column. That
is, a third of the time you move exactly according to these values, as in the
previous exercise, but also a third of the time you move one cell above that,
and another third of the time you move one cell below that. For example, if
you are one cell to the right of the goal and you move left, then one-third
of the time you move one cell above the goal, one-third of the time you move
two cells above the goal, and one-third of the time you move to the goal.
Exercise 6.8 What is the backup diagram for Sarsa?
Exercise 6.9 Why is Q-learning considered an off-policy control method?
Exercise 6.10 Consider the learning algorithm that is just like Q-learning
except that instead of the maximum over next state–action pairs it uses the
expected value, taking into account how likely each action is under the current
policy. That is, consider the algorithm otherwise like Q-learning except with
the update rule
Q(St, At) ← Q(St, At) + α
[
Rt+1 + γ E[Q(St+1, At+1) | St+1] − Q(St, At)
]
← Q(St, At) + α
[
Rt+1 + γ ∑
a
π(a|St+1)Q(St+1, a) − Q(St, At)
]
.
Is this new method an on-policy or off-policy method? What is the backup
diagram for this algorithm? Given the same amount of experience, would
you expect this method to work better or worse than Sarsa? What other
considerations might impact the comparison of this method with Sarsa?
Exercise 6.11 Describe how the task of Jack’s Car Rental (Example 4.2)
could be reformulated in terms of afterstates. Why, in terms of this specific
task, would such a reformulation be likely to speed convergence?

-- 179 of 352 --

166 CHAPTER 6. TEMPORAL-DIFFERENCE LEARNING

-- 180 of 352 --

---

## [Sección 81] Chapter 7

Eligibility Traces
Eligibility traces are one of the basic mechanisms of reinforcement learning.
For example, in the popular TD(λ) algorithm, the λ refers to the use of an
eligibility trace. Almost any temporal-difference (TD) method, such as Qlearning or Sarsa, can be combined with eligibility traces to obtain a more
general method that may learn more efficiently.
There are two ways to view eligibility traces. The more theoretical view,
which we emphasize here, is that they are a bridge from TD to Monte Carlo
methods. When TD methods are augmented with eligibility traces, they produce a family of methods spanning a spectrum that has Monte Carlo methods
at one end and one-step TD methods at the other. In between are intermediate
methods that are often better than either extreme method. In this sense eligibility traces unify TD and Monte Carlo methods in a valuable and revealing
way.
The other way to view eligibility traces is more mechanistic. From this
perspective, an eligibility trace is a temporary record of the occurrence of an
event, such as the visiting of a state or the taking of an action. The trace
marks the memory parameters associated with the event as eligible for undergoing learning changes. When a TD error occurs, only the eligible states
or actions are assigned credit or blame for the error. Thus, eligibility traces
help bridge the gap between events and training information. Like TD methods themselves, eligibility traces are a basic mechanism for temporal credit
assignment.
For reasons that will become apparent shortly, the more theoretical view of
eligibility traces is called the forward view, and the more mechanistic view is
called the backward view. The forward view is most useful for understanding
what is computed by methods using eligibility traces, whereas the backward
view is more appropriate for developing intuition about the algorithms them-
-- 181 of 352 --

168 CHAPTER 7. ELIGIBILITY TRACES
selves. In this chapter we present both views and then establish senses in
which they are equivalent, that is, in which they describe the same algorithms
from two points of view. As usual, we first consider the prediction problem
and then the control problem. That is, we first consider how eligibility traces
are used to help in predicting returns as a function of state for a fixed policy (i.e., in estimating vπ). Only after exploring the two views of eligibility
traces within this prediction setting do we extend the ideas to action values
and control methods.
7.1 n-Step TD Prediction
What is the space of methods lying between Monte Carlo and TD methods?
Consider estimating vπ from sample episodes generated using π. Monte Carlo
methods perform a backup for each state based on the entire sequence of
observed rewards from that state until the end of the episode. The backup of
simple TD methods, on the other hand, is based on just the one next reward,
using the value of the state one step later as a proxy for the remaining rewards.
One kind of intermediate method, then, would perform a backup based on an
intermediate number of rewards: more than one, but less than all of them
until termination. For example, a two-step backup would be based on the first
two rewards and the estimated value of the state two steps later. Similarly,
we could have three-step backups, four-step backups, and so on. Figure 7.1
diagrams the spectrum of n-step backups for vπ, with the one-step, simple TD
backup on the left and the up-until-termination Monte Carlo backup on the
right.
The methods that use n-step backups are still TD methods because they
still change an earlier estimate based on how it differs from a later estimate.
Now the later estimate is not one step later, but n steps later. Methods
in which the temporal difference extends over n steps are called n-step TD
methods. The TD methods introduced in the previous chapter all use one-step
backups, and henceforth we call them one-step TD methods.
More formally, consider the backup applied to state St as a result of the
state–reward sequence, St, Rt+1, St+1, Rt+2, . . . , RT , ST (omitting the actions
for simplicity). We know that in Monte Carlo backups the estimate of vπ(St)
is updated in the direction of the complete return:
Gt = Rt+1 + γRt+2 + γ2Rt+3 + · · · + γT −t−1RT ,
where T is the last time step of the episode. Let us call this quantity the target
of the backup. Whereas in Monte Carlo backups the target is the return, in

---

## [Sección 82] Chapter 7

-- 182 of 352 --

7.1. N -STEP TD PREDICTION 169
TD (1-step) 2-step 3-step n-step Monte Carlo
Figure 7.1: The spectrum ranging from the one-step backups of simple TD
methods to the up-until-termination backups of Monte Carlo methods. In
between are the n-step backups, based on n steps of real rewards and the
estimated value of the nth next state, all appropriately discounted.
one-step backups the target is the first reward plus the discounted estimated
value of the next state:
Rt+1 + γVt(St+1),
where Vt : S → R here is the estimate at time t of vπ, in which case it makes
sense that γVt(St+1) should take the place of the remaining terms γRt+2 +
γ2Rt+3 + · · · + γT −t−1RT , as we discussed in the previous chapter. Our point
now is that this idea makes just as much sense after two steps as it does after
one. The target for a two-step backup might be
Rt+1 + γRt+2 + γ2Vt(St+2),
where now γ2Vt(St+2) corrects for the absence of the terms γ2Rt+3 + γ3Rt+4 +
· · · + γT −t−1RT . Similarly, the target for an arbitrary n-step backup might be
Rt+1 + γRt+2 + γ2 + · · · + γn−1Rt+n + γnVt(St+n), ∀n ≥ 1. (7.1)
All of these can be considered approximate returns, truncated after n steps and
then corrected for the remaining missing terms, in the above case by Vt(St+n).
Notationally, it is useful to retain full generality for the correction term. We
define the general n-step return as
Gt+n
t (c) = Rt+1 + γRt+2 + · · · + γn−1Rh + γnc,

-- 183 of 352 --

170 CHAPTER 7. ELIGIBILITY TRACES
for any n ≥ 1 and any scalar correction c ∈ R. The time h = t + n is called
the horizon of the n-step return.
If the episode ends before the horizon is reached, then the truncation in
an n-step return effectively occurs at the episode’s end, resulting in the conventional complete return. In other words, if h ≥ T , then Gh
t (c) = Gt. Thus,
the last n n-step returns of an episode are always complete returns, and an
infinite-step return is always a complete return. This definition enables us
to treat Monte Carlo methods as the special case of infinite-step targets. All
of this is consistent with the tricks for treating episodic and continuing tasks
equivalently that we introduced in Section 3.4. There we chose to treat the
terminal state as a state that always transitions to itself with zero reward.
Under this trick, all n-step returns that last up to or past termination have
the same value as the complete return.
An n-step backup is defined to be a backup toward the n-step return. In the
tabular, state-value case, the n-step backup at time t produces the following
increment ∆t(St) in the estimated value V (St):
∆t(St) = α
[
Gt+n
t (Vt(St+n)) − Vt(St)
]
, (7.2)
where α is a positive step-size parameter, as usual. The increments to the
estimated values of the other states are defined to be zero (∆t(s) = 0, ∀s 6 = St).
We define the n-step backup in terms of an increment, rather than as a
direct update rule as we did in the previous chapter, in order to allow different
ways of making the updates. In on-line updating, the updates are made during
the episode, as soon as the increment is computed. In this case we write
Vt+1(s) = Vt(s) + ∆t(s), ∀s ∈ S. (7.3)
On-line updating is what we have implicitly assumed in most of the previous
two chapters. In off-line updating, on the other hand, the increments are
accumulated “on the side” and are not used to change value estimates until
the end of the episode. In this case, the approximate values Vt(s), ∀s ∈ S, do
not change during an episode and can be denoted simpty V (s). At the end
of the episode, the new value (for the next episode) is obtained by summing
all the increments during the episode. That is, for an episode starting at time
step 0 and terminating at step T , for all s ∈ S:
Vt+1(s) = Vt(s), ∀t < T,
VT (s) = VT −1(s) +
T −1 ∑
t=0
∆t(s), (7.4)
with of course V0 of the next episode being the VT of this one. You may
recall how in Section 6.3 we carried this idea one step further, deferring the

-- 184 of 352 --

7.1. N -STEP TD PREDICTION 171
increments until they could be summed over a whole set of episodes, in batch
updating.
For any value function v : S → R, the expected value of the n-step return
using v is guaranteed to be a better estimate of vπ than v is, in a worst-state
sense. That is, the worst error under the new estimate is guaranteed to be less
than or equal to γn times the worst error under v:
max
s
∣
∣Eπ
[Gt+n
t (v(St+n)) ∣
∣ St = s] − vπ(s)∣
∣ ≤ γn max
s |v(s) − vπ(s)| , (7.5)
for all n ≥ 1. This is called the error reduction property of n-step returns.
Because of the error reduction property, one can show formally that on-line and
off-line TD prediction methods using n-step backups converge to the correct
predictions under appropriate technical conditions. The n-step TD methods
thus form a family of valid methods, with one-step TD methods and Monte
Carlo methods as extreme members.
Nevertheless, n-step TD methods are rarely used because they are inconvenient to implement. Computing n-step returns requires waiting n steps to
observe the resultant rewards and states. For large n, this can become problematic, particularly in control applications. The significance of n-step TD
methods is primarily for theory and for understanding related methods that
are more conveniently implemented. In the next few sections we use the idea
of n-step TD methods to explain and justify eligibility trace methods.
Example 7.1: n-step TD Methods on the Random Walk Consider
using n-step TD methods on the random walk task described in Example 6.2
and shown in Figure 6.5. Suppose the first episode progressed directly from the
center state, C, to the right, through D and E, and then terminated on the right
with a return of 1. Recall that the estimated values of all the states started
at an intermediate value, V0(s) = 0.5. As a result of this experience, a onestep method would change only the estimate for the last state, V (E), which
would be incremented toward 1, the observed return. A two-step method,
on the other hand, would increment the values of the two states preceding
termination: V (D) and V (E) both would be incremented toward 1. A threestep method, or any n-step method for n > 2, would increment the values
of all three of the visited states toward 1, all by the same amount. Which
n is better? Figure 7.2 shows the results of a simple empirical assessment
for a larger random walk process, with 19 states (and with a −1 outcome on
the left, all values initialized to 0). Results are shown for on-line and off-line
n-step TD methods with a range of values for n and α. The performance
measure for each algorithm and parameter setting, shown on the vertical axis,
is the square-root of the average squared error between its predictions at the
end of the episodenfor the 19 states and their true values, then averaged over

---

## [Sección 83] Chapter 7

-- 185 of 352 --

172 CHAPTER 7. ELIGIBILITY TRACES
On-line n-step TD methods Off-line n-step TD methods
↵ ↵
RMS error
over first
10 episodes
n=1
n=2
n=4
n=8 
n=16
n=32
n=64
128
n=3
n=64
n=1
n=2
n=4
n=8
n=16
n=32
n=32 
n=64 128 
Figure 7.2: Performance of n-step TD methods as a function of α, for various
values of n, on a 19-state random walk task (Example 7.1).
the first 10 episodes and 100 repetitions of the whole experiment (the same
sets of walks were used for all methods). First note that the on-line methods
generally worked best on this task, both reaching lower levels of absolute error
and doing so over a larger range of the step-size parameter α (in fact, all
the off-line methods were unstable for α much above 0.3). Second, note that
methods with an intermediate value of n worked best. This illustrates how
the generalization of TD and Monte Carlo methods to n-step methods can
potentially perform better than either of the two extreme methods.
7.2 The Forward View of TD(λ)
Backups can be done not just toward any n-step return, but toward any average of n-step returns. For example, a backup can be done toward a target that
is half of a two-step return and half of a four-step return: 1
2 Gt+2
t (Vt(St+2)) +
2 Gt+4
t (Vt(St+4)). Any set of returns can be averaged in this way, even an infinite set, as long as the weights on the component returns are positive and
sum to 1. The composite return possesses an error reduction property similar
to that of individual n-step returns (7.5) and thus can be used to construct
backups with guaranteed convergence properties. Averaging produces a substantial new range of algorithms. For example, one could average one-step
and infinite-step returns to obtain another way of interrelating TD and Monte
Carlo methods. In principle, one could even average experience-based backups with DP backups to get a simple combination of experience-based and
model-based methods (see Chapter 8).

-- 186 of 352 --

7.2. THE FORWARD VIEW OF TD(λ) 173
A backup that averages simpler component backups is called a complex
backup. The backup diagram for a complex backup consists of the backup
diagrams for each of the component backups with a horizontal line above
them and the weighting fractions below. For example, the complex backup
for the case mentioned at the start of this section, mixing half of a two-step
backup and half of a four-step backup, has the diagram:
2
2
The TD(λ) algorithm can be understood as one particular way of averaging
n-step backups. This average contains all the n-step backups, each weighted
proportional to λn−1, where λ ∈ [0, 1], and normalized by a factor of 1 − λ
to ensure that the weights sum to 1 (see Figure 7.3). The resulting backup is
toward a return, called the λ-return, defined by
Lt = (1 − λ)
∞ ∑
n=1
λn−1Gt+n
t (Vt(St+n)).
Figure 7.4 further illustrates the weighting on the sequence of n-step returns
in the λ-return. The one-step return is given the largest weight, 1 − λ; the
two-step return is given the next largest weight, (1−λ)λ; the three-step return
is given the weight (1 − λ)λ2; and so on. The weight fades by λ with each
additional step. After a terminal state has been reached, all subsequent n-step
returns are equal to Gt. If we want, we can separate these post-termination
terms from the main sum, yielding
Lt = (1 − λ)
T −t−1 ∑
n=1
λn−1Gt+n
t (Vt(St+n)) + λT −t−1Gt, (7.6)
as indicated in the figures. This equation makes it clearer what happens when
λ = 1. In this case the main sum goes to zero, and the remaining term reduces
to the conventional return, Gt. Thus, for λ = 1, backing up according to the

-- 187 of 352 --

174 CHAPTER 7. ELIGIBILITY TRACES
1!"
(1!") "
(1!") "
# = 1
TD("), "-return
"
T-t-1
Figure 7.3: The backup digram for TD(λ). If λ = 0, then the overall backup
reduces to its first component, the one-step TD backup, whereas if λ = 1, then
the overall backup reduces to its last component, the Monte Carlo backup.
λ-return is the same as the Monte Carlo algorithm that we called constant-α
MC (6.1) in the previous chapter. On the other hand, if λ = 0, then the
λ-return reduces to Gt+1
t (Vt(St+1)), the one-step return. Thus, for λ = 0,
backing up according to the λ-return is the same as the one-step TD method,
TD(0) from the previous chapter (6.2).
We define the λ-return algorithm as the method that performs backups
towards the λ-return as target. On each step, t, it computes an increment,
1!"
weight given to
the 3-step return
decay by "
weight given to
actual, final return
t T
Time
Weight
total area = 1
is (1    ) 2
is  T  t 1
Figure 7.4: Weighting given in the λ-return to each of the n-step returns.

---

## [Sección 84] Chapter 7

-- 188 of 352 --

7.2. THE FORWARD VIEW OF TD(λ) 175
Time
rt+3
rt+2
rt+1
rT
st+1
st+2
st+3
st St
St+1
St+2
St+3
R R R
R
Figure 7.5: The forward or theoretical view. We decide how to update each
state by looking forward to future rewards and states.
∆t(St), to the value of the state occurring on that step:
∆t(St) = α
[
Lt − Vt(St)
]
. (7.7)
(The increments for other states are of course ∆t(s) = 0, for all s 6 = St.)
As with n-step TD methods, the updating can be either on-line or off-line.
The upper row of Figure 7.6 shows the performance of the on-line and offline λ-return algorithms on the 19-state random walk task (Example 7.1).
The experiment was just as in the n-step case (Figure 7.2) except that here we
varied λ instead of n. Note that overall performance of the λ-return algorithms
is comparable to that of the n-step algorithms. In both cases we get best
performance with an intermediate value of the truncation parameter, n or λ.
The approach that we have been taking so far is what we call the theoretical, or forward, view of a learning algorithm. For each state visited, we look
forward in time to all the future rewards and decide how best to combine them.
We might imagine ourselves riding the stream of states, looking forward from
each state to determine its update, as suggested by Figure 7.5. After looking
forward from and updating one state, we move on to the next and never have
to work with the preceding state again. Future states, on the other hand,
are viewed and processed repeatedly, once from each vantage point preceding
them.
The λ-return algorithm is the basis for the forward view of eligibility traces
as used in the TD(λ) method. In fact, we show in a later section that, in the
off-line case, the λ-return algorithm is the TD(λ) algorithm. The λ-return
and TD(λ) methods use the λ parameter to shift from one-step TD methods
to Monte Carlo methods. The specific way this shift is done is interesting,
but not obviously better or worse than the way it is done with simple n-step
methods by varying n. Ultimately, the most compelling motivation for the λ
way of mixing n-step backups is that there in a simple algorithm—TD(λ)—for
achieving it. This is a mechanism issue rather than a theoretical one. In the

-- 189 of 352 --

176 CHAPTER 7. ELIGIBILITY TRACES
On-line TD(λ), accumulating traces On-line TD(λ), dutch traces
On-line λ-return Off-line λ-return
= off-line TD(λ), accumulating traces
RMS error over first 10 episodes on 19-state random walk
λ=0
λ=.4
λ=.8
λ=.9
λ=.95 
.975 .99 
λ=0
λ=.4
λ=.8
λ=.9
λ=.95
λ=.975
λ=.99
λ=1
λ=.95
On-line TD(λ), replacing traces True on-line TD(λ)
= real-time λ-return
↵ ↵
λ=0
λ=.4
λ=.8
λ=.9
λ=.95
λ=0
λ=.4
λ=.8
λ=.9
λ=.95
λ=.975
λ=.99
λ=1
λ=.95
λ=0
λ=.4
λ=.8
λ=.9
λ=.95
λ=.975
λ=.99
λ=1
λ=.95
λ=.975
λ=1 λ=.99
λ=0
λ=.4
λ=.8
λ=.9
λ=.95
λ=.975
λ=.99
λ=1
λ=.99
λ=.975
Figure 7.6: Performance of all λ-based algorithms on the 19-state random walk
(Example 7.1). The λ = 0 line is the same for all five on-line algorithms.

-- 190 of 352 --

7.3. THE BACKWARD VIEW OF TD(λ) 177
next few sections we develop the mechanistic, or backward, view of eligibility
traces as used in TD(λ).
7.3 The Backward View of TD(λ)
In the previous section we presented the forward or theoretical view of the
tabular TD(λ) algorithm as a way of mixing backups that parametrically shifts
from a TD method to a Monte Carlo method. In this section we instead
define TD(λ) mechanistically and show that it can closely approximate the
forward view. The mechanistic, or backward , view of TD(λ) is useful because
it is simple conceptually and computationally. In particular, the forward view
itself is not directly implementable because it is acausal, using at each step
knowledge of what will happen many steps later. The backward view provides
a causal, incremental mechanism for approximating the forward view and, in
the off-line case, for achieving it exactly.
In the backward view of TD(λ), there is an additional memory variable
associated with each state, its eligibility trace. The eligibility trace for state
s at time t is a random variable denoted Et(s) ∈ R+. On each step, the
eligibility traces of all non-visited states decay by γλ:
Et(s) = γλEt−1(s), ∀s ∈ S, s 6 = St, (7.8)
where γ is the discount rate and λ is the parameter introduced in the previous
section. Henceforth we refer to λ as the trace-decay parameter. What about
the trace for St, the one state visited at time t? The classical eligibility trace
for St decays just like for any state, but is then incremented by 1:
Et(St) = γλEt−1(St) + 1. (7.9)
This kind of eligibility trace is called an accumulating trace because it accumulates each time the state is visited, then fades away gradually when the
state is not visited, as illustrated as illustrated below.
accumulating eligibility trace
times of visits to a state
Eligibility traces keep a simple record of which states have recently been
visited, where “recently” is defined in terms of γλ. The traces are said to indicate the degree to which each state is eligible for undergoing learning changes
should a reinforcing event occur. The reinforcing events we are concerned with

---

## [Sección 85] Chapter 7

-- 191 of 352 --

178 CHAPTER 7. ELIGIBILITY TRACES
are the moment-by-moment one-step TD errors. For example, the TD error
for state-value prediction is
δt = Rt+1 + γVt(St+1) − Vt(St). (7.10)
In the backward view of TD(λ), the global TD error signal triggers proportional updates to all recently visited states, as signaled by their nonzero traces:
∆Vt(s) = αδt Et(s), for all s ∈ S. (7.11)
As always, these increments could be done on each step to form an on-line
algorithm, or saved until the end of the episode to produce an off-line algorithm. In either case, equations (7.8–7.11) provide the mechanistic definition
of the TD(λ) algorithm. A complete algorithm for on-line TD(λ) is given in
Figure 7.7.
The backward view of TD(λ) is oriented backward in time. At each moment we look at the current TD error and assign it backward to each prior
state according to the state’s eligibility trace at that time. We might imagine
ourselves riding along the stream of states, computing TD errors, and shouting
them back to the previously visited states, as suggested by Figure 7.8. Where
the TD error and traces come together, we get the update given by (7.11).
To better understand the backward view, consider what happens at various
values of λ. If λ = 0, then by (7.9) all traces are zero at t except for the trace
corresponding to St. Thus the TD(λ) update (7.11) reduces to the simple TD
Initialize V (s) arbitrarily (but set to 0 if s is terminal)
Repeat (for each episode):
Initialize E(s) = 0, for all s ∈ S
Initialize S
Repeat (for each step of episode):
A ← action given by π for S
Take action A, observe reward, R, and next state, S′
δ ← R + γV (S′) − V (S)
E(S) ← E(S) + 1 (accumulating traces)
or E(S) ← (1 − α)E(S) + 1 (dutch traces)
or E(S) ← 1 (replacing traces)
For all s ∈ S:
V (s) ← V (s) + αδ E(s)
E(s) ← γ λE(s)
S ← S′
until S is terminal
Figure 7.7: On-line tabular TD(λ).

-- 192 of 352 --

7.3. THE BACKWARD VIEW OF TD(λ) 179
!t et et et et
Time
st
st+1
st-1
st-2
st-3
𝛿t
St+1
St
St-1
St-2
St-3
xiv
 t temporal-di↵erence error at t (a r
Et(s) eligibility trace for state s at t
Et(s, a) eligibility trace for a state–action
et eligibility trace vector at t
  discount-rate parameter
" probability of random action in "
↵,   step-size parameters
  decay-rate parameter for eligibilit
xiv SUMMARY OF
 t temporal-di↵erence error at t (a random variable, eve
Et(s) eligibility trace for state s at t
Et(s, a) eligibility trace for a state–action pair
et eligibility trace vector at t
  discount-rate parameter
" probability of random action in "-greedy policy
↵,   step-size parameters
  decay-rate parameter for eligibility traces
xiv SUMMARY OF NOTATION
 t temporal-di↵erence error at t (a random variable, even though not upper case
Et(s) eligibility trace for state s at t
Et(s, a) eligibility trace for a state–action pair
et eligibility trace vector at t
  discount-rate parameter
" probability of random action in "-greedy policy
↵,   step-size parameters
  decay-rate parameter for eligibility traces
xiv SUMMARY OF NOTATION
 t temporal-di↵erence error at t (a random variable, even though not upper case)
Et(s) eligibility trace for state s at t
Et(s, a) eligibility trace for a state–action pair
et eligibility trace vector at t
  discount-rate parameter
" probability of random action in "-greedy policy
↵,   step-size parameters
  decay-rate parameter for eligibility traces
Figure 7.8: The backward or mechanistic view. Each update depends on the
current TD error combined with eligibility traces of past events.
rule (6.2), which we henceforth call TD(0). In terms of Figure 7.8, TD(0) is
the case in which only the one state preceding the current one is changed by
the TD error. For larger values of λ, but still λ < 1, more of the preceding
states are changed, but each more temporally distant state is changed less
because its eligibility trace is smaller, as suggested in the figure. We say that
the earlier states are given less credit for the TD error.
If λ = 1, then the credit given to earlier states falls only by γ per step. This
turns out to be just the right thing to do to achieve Monte Carlo behavior.


---
> *[Truncated at 420 KB for optimal local RAG indexing speed]*

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #architecture_and_books
