**Alcance:** Libro completo Human Compatible (Stuart Russell): alineación de sistemas autónomos, seguridad de IA y preferencias humanas. (Fuente migrada y curada desde Centinela Studio Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

---
titulo: "Human Compatible: Artificial Intelligence and the Problem of Control"
autor: "Stuart Russell"
dominio: "Alineación de IA, HITL y Seguridad de Agentes"
tipo: "libro_tecnico_completo"
paginas_originales: 352
secciones_totales: 173
fecha_ingesta: "2026-10-06T02:44:18.879Z"
---

# 📖 Human Compatible: Artificial Intelligence and the Problem of Control
**Autor:** Stuart Russell | **Dominio:** Alineación de IA, HITL y Seguridad de Agentes | **Páginas originales:** 352

> **Nota de Arquitectura Centinela:** Este documento contiene el texto íntegro estructurado por secciones y capítulos para consulta profunda del equipo de agentes y búsqueda híbrida (BM25 + semántica).

---

## [Sección 1] Introducción y Fundamentos

9780525558613_Human_TX.indd i 8/7/19 11:21 PM
Not
 
for Distribution
tio

-- 1 of 352 --

9780525558613_Human_TX.indd ii 8/7/19 11:21 PM
Not
 
for Distribution

-- 2 of 352 --

A LSO BY ST UA RT RUSSELL
The Use of Knowledge in Analogy and Induction (1989)
Do the Right Thing: Studies in Limited Rationality
(with Eric Wefald, 1991)
Artificial Intelligence: A Modern Approach
(with Peter Norvig, 1995, 2003, 2010, 2019)
9780525558613_Human_TX.indd iii 8/7/19 11:21 PM M 
Not
 
for Distribution
on (1989 (1989
Rationality Rationality
1)
Modern Appr Modern Appr
5, 2003, 2010 2003, 201

-- 3 of 352 --

9780525558613_Human_TX.indd iv 8/7/19 11:21 PM
Not
 
for Distribution

-- 4 of 352 --

ARTIFICIAL INTELLIGENCE AND THE
PROBLEM OF CONTROL
Stuar t Russell
V IK I NG
9780525558613_Human_TX.indd v 8/7/19 11:21 PM M 
Not
 
for
S S
Distribution
IGENCE GENCE
OF CO OF CO
bution

-- 5 of 352 --

VIKING
An imprint of Penguin Random House LLC
penguinrandomhouse.com
Copyright © 2019 by Stuart Russell
Penguin supports copyright. Copyright fuels creativity, encourages
diverse voices, promotes free speech, and creates a vibrant culture. Thank
you for buying an authorized edition of this book and for complying with
copyright laws by not reproducing, scanning, or distributing any part of it
in any form without permission. You are supporting writers and allowing
Penguin to continue to publish books for every reader.
ISBN 9780525558613 (hardcover)
ISBN 9780525558620 (ebook)
Printed in the United States of America
1 3 5 7 9 10 8 6 4 2
Designed by Amanda Dewey
9780525558613_Human_TX.indd vi 8/7/19 11:21 PM
Not
 
for
BN 9780 978
ISBN 9780 SBN 97
Printed in th rinted in t
1 33
Distribution
use LLC LLC
m
uart Russell art Russell
ht fuels creati fuels creat
and creates a v d creates a
n of this book of this boo
g, scanning, o g, scanning, o
on. You are su on. You are su
e to publish e to publish
2555 2555

-- 6 of 352 --

For Loy, Gordon, Lucy, George, and Isaac
M 9780525558613_Human_TX.indd vii 8/7/19 11:21 PM
for Distribution
aacc

-- 7 of 352 --

9780525558613_Human_TX.indd viii 8/7/19 11:21 PM
Not
 
for Distribution

-- 8 of 352 --

CONTENTS
PREFACE xi

---

## [Sección 2] Chapter 10. PROBLEM SOLVED? 246

Appendix A. SEARCHING FOR SOLUTIONS 257
Appendix B. KNOWLEDGE AND LOGIC 267
Appendix C. UNCERTAINT Y AND PROBABILIT Y 273
Appendix D. LEARNING FROM EXPERIENCE 285
Acknowledgments 297
Notes 299
Image Credits 324
Index 325
9780525558613_Human_TX.indd ix 8/7/19 11:21 PM M 
NootOVAB VA
COMPLIC COMPLIC
PRO PRO
for
OFFERENT A FFERENT
LY BE Y B
Distribution
ND MACH D MACH
S IN THE F S IN THE
GENT AI GENT AI
REAT A REAT

-- 9 of 352 --

9780525558613_Human_TX.indd x 8/7/19 11:21 PM
Not
 
for Distribution

-- 10 of 352 --

PREFACE
Why This Book? Why Now?
This book is about the past, present, and future of our attempt to
understand and create intelligence. This matters, not because AI is
rapidly becoming a pervasive aspect of the present but because it is
the dominant technology of the future. The world’s great powers are
waking up to this fact, and the world’s largest corporations have known
it for some time. We cannot predict exactly how the technology will
develop or on what timeline. Nevertheless, we must plan for the
possibility that machines will far exceed the human capacity for
decision making in the real world. What then?
Everything civilization has to offer is the product of our intelligence; gaining access to considerably greater intelligence would be the
biggest event in human history. The purpose of the book is to explain
why it might be the last event in human history and how to make sure
that it is not.
9780525558613_Human_TX.indd xi 8/7/19 11:21 PM M 
Not
e. W .
on what what
ty that ma y that m
making making
for
ogy of y o
act, and the ct, and th
We canno We cann
Distribution
w? w?
esent, and ent, and
igence. Thi gence. Th
ve aspect ve aspect
he f he f

-- 11 of 352 --

xii P R E FA C E
Overview of the Book
The book has three parts. The first part (Chapters 1 to 3) explores the
idea of intelligence in humans and in machines. The material requires
no technical background, but for those who are interested, it is supplemented by four appendices that explain some of the core concepts
underlying present-day AI systems. The second part (Chapters 4 to 6)
discusses some problems arising from imbuing machines with intelligence. I focus in particular on the problem of control: retaining
absolute power over machines that are more powerful than us. The
third part (Chapters 7 to 10) suggests a new way to think about AI
and to ensure that machines remain beneficial to humans, forever.
The book is intended for a general audience but will, I hope, be of
value in convincing specialists in artificial intelligence to rethink their
fundamental assumptions.
9780525558613_Human_TX.indd xii 8/7/19 11:21 PM
Not
 
for Distribution
ntrol
erful than ful than
way to think ay to thin
ficial to hu l to hu
ience but w ence but w
icial intellig al intelli

-- 12 of 352 --

M 9780525558613_Human_TX.indd xiii 8/7/19 11:21 PM
for Distribution
tio

-- 13 of 352 --

9780525558613_Human_TX.indd xiv 8/7/19 11:21 PM
Not
 
for Distribution

-- 14 of 352 --
IF WE SUCCEED
Along time ago, my parents lived in Birmingham, England, in a
house near the university. They decided to move out of the
city and sold the house to David Lodge, a professor of English
literature. Lodge was by that time already a well-known novelist. I
never met him, but I decided to read some of his books: Changing
Places and Small World. Among the principal characters were fictional
academics moving from a fictional version of Birmingham to a fictional version of Berkeley, California. As I was an actual academic
from the actual Birmingham who had just moved to the actual Berkeley, it seemed that someone in the Department of Coincidences was
telling me to pay attention.
One particular scene from Small World struck me: The protagonist, an aspiring literary theorist, attends a major international conference and asks a panel of leading figures, “What follows if everyone
agrees with you?” The question causes consternation, because the
panelists had been more concerned with intellectual combat than ascertaining truth or attaining understanding. It occurred to me then
that an analogous question could be asked of the leading figures in AI:
“What if you succeed?” The field’s goal had always been to create
9780525558613_Human_TX.indd 1 8/7/19 11:21 PM M 
Not
of B f
ual Birmi al Birmi
emed that s emed that
e to pay e to pay
for
. Amo Am
from a fic from a fi
erkeley, erkeley,
Distribution
in Birming n Birming
They decide ey decid
o David Lod David Lod
t time alre t time alr
ded to rea ded to re
ng th ng th

---

## [Sección 3] Chapter 10. PROBLEM SOLVED? 246

-- 15 of 352 --

2 H U M A N C O M PAT I B L E
human-level or superhuman AI, but there was little or no consideration of what would happen if we did.
A few years later, Peter Norvig and I began work on a new AI textbook, whose first edition appeared in 1995.1 The book’s final section
is titled “What If We Do Succeed?” The section points to the possibility of good and bad outcomes but reaches no firm conclusions. By the
time of the third edition in 2010, many people had finally begun to
consider the possibility that superhuman AI might not be a good
thing—but these people were mostly outsiders rather than mainstream AI researchers. By 2013, I became convinced that the issue not
only belonged in the mainstream but was possibly the most important
question facing humanity.
In November 2013, I gave a talk at the Dulwich Picture Gallery, a
venerable art museum in south London. The audience consisted
mostly of retired people—nonscientists with a general interest in intellectual matters—so I had to give a completely nontechnical talk. It
seemed an appropriate venue to try out my ideas in public for the first
time. After explaining what AI was about, I nominated five candidates for “biggest event in the future of humanity”:
1. We all die (asteroid impact, climate catastrophe, pandemic, etc.).
2. We all live forever (medical solution to aging).
3. We invent faster-than-light travel and conquer the universe.
4. We are visited by a superior alien civilization.
5. We invent superintelligent AI.
I suggested that the fifth candidate, superintelligent AI, would be
the winner, because it would help us avoid physical catastrophes and
achieve eternal life and faster-than-light travel, if those were indeed
possible. It would represent a huge leap—a discontinuity—in our civilization. The arrival of superintelligent AI is in many ways analogous
to the arrival of a superior alien civilization but much more likely to
9780525558613_Human_TX.indd 2 8/7/19 11:21 PM
Not
aste st
ive foreve e foreve
nvent ent ffaste aste fff
are visite are visit
for
in the th
roid imp oid imp
Distribution
at th
he most im most im
ulwich Pict wich Pic
on. The au n. The au
sts with a g with a
ve a comple a comple
o try out m o try out m
t AI was t AI was
futu futu

-- 16 of 352 --

I F W E S U C C E E D 3
occur. Perhaps most important, AI, unlike aliens, is something over
which we have some say.
Then I asked the audience to imagine what would happen if we
received notice from a superior alien civilization that they would arrive on Earth in thirty to fifty years. The word pandemonium doesn’t
begin to describe it. Yet our response to the anticipated arrival of superintelligent AI has been . . . well, underwhelming begins to describe
it. (In a later talk, I illustrated this in the form of the email exchange
shown in figure 1.) Finally, I explained the significance of superintelligent AI as follows: “Success would be the biggest event in human
history . . . and perhaps the last event in human history.”
From: Superior Alien Civilization <sac12@sirius.canismajor.u>
To: humanity@UN.org
Subject: Contact
Be warned: we shall arrive in 30–50 years
From: humanity@UN.org
To: Superior Alien Civilization <sac12@sirius.canismajor.u>
Subject:2XWRIRIÀFH5H&RQWDFW
+XPDQLW\LVFXUUHQWO\RXWRIWKHRIÀFH:HZLOOUHVSRQGWR\RXU
message when we return.
FIGURE 3UREDEO\QRWWKHHPDLOH[FKDQJHWKDWZRXOGIROORZWKHILUVWFRQWDFW
by a superior alien civilization.
A few months later, in April 2014, I was at a conference in Iceland
and got a call from National Public Radio asking if they could interview me about the movie Transcendence, which had just been released
in the United States. Although I had read the plot summaries and reviews, I hadn’t seen it because I was living in Paris at the time, and it
would not be released there until June. It so happened, however, that
M 9780525558613_Human_TX.indd 3 8/7/19 11:21 PM
Not No
LVFXUUHQ FXUUH
ge when we e when we
3URE 3URE
forCivilizatio viliza
IRIÀFH5H RIÀFH5H
WO\
Distribution
even
istory.” ory.”
sirius.canism ius.canism
30– 30–50 year 50 year

---

## [Sección 4] Chapter 10. PROBLEM SOLVED? 246

-- 17 of 352 --

4 H U M A N C O M PAT I B L E
I had just added a detour to Boston on the way home from Iceland, so
that I could participate in a Defense Department meeting. So, after
arriving at Boston’s Logan Airport, I took a taxi to the nearest theater
showing the movie. I sat in the second row and watched as a Berkeley
AI professor, played by Johnny Depp, was gunned down by anti-AI
activists worried about, yes, superintelligent AI. Involuntarily, I shrank
down in my seat. (Another call from the Department of Coincidences?) Before Johnny Depp’s character dies, his mind is uploaded to
a quantum supercomputer and quickly outruns human capabilities,
threatening to take over the world.
On April 19, 2014, a review of Transcendence, co-authored with
physicists Max Tegmark, Frank Wilczek, and Stephen Hawking, appeared in the Huffington Post. It included the sentence from my Dulwich talk about the biggest event in human history. From then on, I
would be publicly committed to the view that my own field of research posed a potential risk to my own species.
+RZ'LG:H*HW+HUH"
The roots of AI stretch far back into antiquity, but its “official” beginning was in 1956. Two young mathematicians, John McCarthy and
Marvin Minsky, had persuaded Claude Shannon, already famous as the
inventor of information theory, and Nathaniel Rochester, the designer
of IBM’s first commercial computer, to join them in organizing a summer program at Dartmouth College. The goal was stated as follows:
The study is to proceed on the basis of the conjecture that every
aspect of learning or any other feature of intelligence can in principle be so precisely described that a machine can be made to simulate it. An attempt will be made to find how to make machines
use language, form abstractions and concepts, solve kinds of problems now reserved for humans, and improve themselves. We think
9780525558613_Human_TX.indd 4 8/7/19 11:21 PM
Not
tre tr
1956. Tw 56. Tw
insky, had p insky, had
f inform f inform
for
HW+ +
tch far b ch far b
Distribution
co-aautho utho
Stephen Ha tephen Ha
e sentence entence
man history man history
e view that iew that
y own spec own spec
HUH HUH

-- 18 of 352 --

I F W E S U C C E E D 5
that a significant advance can be made in one or more of these
problems if a carefully selected group of scientists work on it
together for a summer.
Needless to say, it took much longer than a summer: we are still working
on all these problems.
In the first decade or so after the Dartmouth meeting, AI had several major successes, including Alan Robinson’s algorithm for generalpurpose logical reasoning 2 and Arthur Samuel’s checker-playing
program, which taught itself to beat its creator. 3 The first AI bubble
burst in the late 1960s, when early efforts at machine learning and
machine translation failed to live up to expectations. A report commissioned by the UK government in 1973 concluded, “In no part of
the field have the discoveries made so far produced the major impact
that was then promised.” 4 In other words, the machines just weren’t
smart enough.
My eleven-year-old self was, fortunately, unaware of this report.
Two years later, when I was given a Sinclair Cambridge Programmable
calculator, I just wanted to make it intelligent. With a maximum program size of thirty-six keystrokes, however, the Sinclair was not quite
big enough for human-level AI. Undeterred, I gained access to the giant CDC 6600 supercomputer5 at Imperial College London and wrote
a chess program—a stack of punched cards two feet high. It wasn’t
very good, but it didn’t matter. I knew what I wanted to do.
By the mid-1980s, I had become a professor at Berkeley, and AI
was experiencing a huge revival thanks to the commercial potential of
so-called expert systems. The second AI bubble burst when these systems proved to be inadequate for many of the tasks to which they
were applied. Again, the machines just weren’t smart enough. An AI
winter ensued. My own AI course at Berkeley, currently bursting with
over nine hundred students, had just twenty-five students in 1990.
The AI community learned its lesson: smarter, obviously, was better, but we would have to do our homework to make that happen. The
M 9780525558613_Human_TX.indd 5 8/7/19 11:21 PM
Not
hum u
00 superc 0 superc
pr p ogram— gram—
d, but it d, but it
for
ed to m to
ssix keystro ix keystr
an- an-lleve eve
Distribution
firs
achine lea hine lea
tations. A r ations. A
concluded ncluded
ar produced r produce
words, the ords, the
was, fortuna was, fortun
given a Si given a S
ake i ake

---

## [Sección 5] Chapter 10. PROBLEM SOLVED? 246

-- 19 of 352 --

6 H U M A N C O M PAT I B L E
field became far more mathematical. Connections were made to the
long-established disciplines of probability, statistics, and control theory. The seeds of today’s progress were sown during that AI winter,
including early work on large-scale probabilistic reasoning systems
and what later became known as deep learning.
Beginning around 2011, deep learning techniques began to produce dramatic advances in speech recognition, visual object recognition, and machine translation—three of the most important open
problems in the field. By some measures, machines now match or exceed human capabilities in these areas. In 2016 and 2017, DeepMind’s
AlphaGo defeated Lee Sedol, former world Go champion, and Ke Jie,
the current champion—events that some experts predicted wouldn’t
happen until 2097, if ever. 6
Now AI generates front-page media coverage almost every day.
Thousands of start-up companies have been created, fueled by a flood
of venture funding. Millions of students have taken online AI and
machine learning courses, and experts in the area command salaries in
the millions of dollars. Investments flowing from venture funds, national governments, and major corporations are in the tens of billions
of dollars annually—more money in the last five years than in the entire previous history of the field. Advances that are already in the
pipeline, such as self-driving cars and intelligent personal assistants,
are likely to have a substantial impact on the world over the next decade or so. The potential economic and social benefits of AI are vast,
creating enormous momentum in the AI research enterprise.
What Happens Next?
Does this rapid rate of progress mean that we are about to be overtaken by machines? No. There are several breakthroughs that have
to happen before we have anything resembling machines with superhuman intelligence.
9780525558613_Human_TX.indd 6 8/7/19 11:21 PM
Not
tor to
h as as sself- elf-dd
to have a su to have a s
. The p . The p
for
d majo maj
m more mon ore mo
y of the y of the
Distribution
17, D
mpion, an pion, an
rts predicte ts predicte
coverage a coverage
e been crea been crea
students ha udents ha
experts in t experts in
stments fl stments f
corp cor

-- 20 of 352 --

I F W E S U C C E E D 7
Scientific breakthroughs are notoriously hard to predict. To get a
sense of just how hard, we can look back at the history of another field
with civilization-ending potential: nuclear physics.
In the early years of the twentieth century, perhaps no nuclear
physicist was more distinguished than Ernest Rutherford, the discoverer of the proton and the “man who split the atom” (figure 2[a]). Like
his colleagues, Rutherford had long been aware that atomic nuclei
stored immense amounts of energy; yet the prevailing view was that
tapping this source of energy was impossible.
On September 11, 1933, the British Association for the Advancement of Science held its annual meeting in Leicester. Lord Rutherford
addressed the evening session. As he had done several times before, he
poured cold water on the prospects for atomic energy: “Anyone who
looks for a source of power in the transformation of the atoms is
talking moonshine.” Rutherford’s speech was reported in the Times of
London the next morning (figure 2[b]).
Leo Szilard (figure 2[c]), a Hungarian physicist who had recently
fled from Nazi Germany, was staying at the Imperial Hotel on Russell
(a) (b) (c)
FIGURE  D /RUG5XWKHUIRUGQXFOHDUSK\VLFLVW E ([FHUSWVIURPDUHSRUWLQ
the TimesRI6HSWHPEHUFRQFHUQLQJDVSHHFKJLYHQE\5XWKHUIRUGWKH
SUHYLRXVHYHQLQJ F /HR6]LODUGQXFOHDUSK\VLFLVW
M 9780525558613_Human_TX.indd 7 8/7/19 11:21 PM
Not
 
Distribution
or th
er. Lord R Lord R
several time everal time
omic energy c energ
ansformatio nsformatio
eech was re ch was re
e 2[b]). [b]).

-- 21 of 352 --

8 H U M A N C O M PAT I B L E
Square in London. He read the Times’ report at breakfast. Mulling over
what he had read, he went for a walk and invented the neutron-induced
nuclear chain reaction.7 The problem of liberating nuclear energy went
from impossible to essentially solved in less than twenty-four hours.
Szilard filed a secret patent for a nuclear reactor the following year. The
first patent for a nuclear weapon was issued in France in 1939.
The moral of this story is that betting against human ingenuity is
foolhardy, particularly when our future is at stake. Within the AI
community, a kind of denialism is emerging, even going as far as denying the possibility of success in achieving the long-term goals of AI. It’s
as if a bus driver, with all of humanity as passengers, said, “Yes, I am
driving as hard as I can towards a cliff, but trust me, we’ll run out of
gas before we get there!”
I am not saying that success in AI will necessarily happen, and I
think it’s quite unlikely that it will happen in the next few years. It
seems prudent, nonetheless, to prepare for the eventuality. If all goes
well, it would herald a golden age for humanity, but we have to face
the fact that we are planning to make entities that are far more powerful than humans. How do we ensure that they never, ever have
power over us?
To get just an inkling of the fire we’re playing with, consider how
content-selection algorithms function on social media. They aren’t
particularly intelligent, but they are in a position to affect the entire
world because they directly influence billions of people. Typically,
such algorithms are designed to maximize click-through, that is, the
probability that the user clicks on presented items. The solution is
simply to present items that the user likes to click on, right? Wrong.
The solution is to change the user’s preferences so that they become
more predictable. A more predictable user can be fed items that they
are likely to click on, thereby generating more revenue. People with
more extreme political views tend to be more predictable in which
items they will click on. (Possibly there is a category of articles that
9780525558613_Human_TX.indd 8 8/7/19 11:21 PM
Not
n in i
tion algor on algo
ly intelligen ly intellige
ause th ause th
for
ow do d
kling of kling of
Distribution
goal
rs, said, “Y said, “Y
t me, we’ll t me, we’ll
will ill necessar necessar
happen in t ppen in t
epare for th are for th
age for hum age for h
g to make g to make
we we

---

## [Sección 6] Chapter 10. PROBLEM SOLVED? 246

-- 22 of 352 --

I F W E S U C C E E D 9
die-hard centrists are likely to click on, but it’s not easy to imagine
what this category consists of.) Like any rational entity, the algorithm
learns how to modify the state of its environment—in this case, the
user’s mind—in order to maximize its own reward. 8 The consequences
include the resurgence of fascism, the dissolution of the social contract
that underpins democracies around the world, and potentially the end
of the European Union and NATO. Not bad for a few lines of code,
even if it had a helping hand from some humans. Now imagine what a
really intelligent algorithm would be able to do.
What Went Wrong?
The history of AI has been driven by a single mantra: “The more intelligent the better.” I am convinced that this is a mistake—not because
of some vague fear of being superseded but because of the way we
have understood intelligence itself.
The concept of intelligence is central to who we are—that’s why
we call ourselves Homo sapiens, or “wise man.” After more than two
thousand years of self-examination, we have arrived at a characterization of intelligence that can be boiled down to this:
Humans are intelligent to the extent that our actions can be expected
to achieve our objectives.
All those other characteristics of intelligence—perceiving, thinking,
learning, inventing, and so on—can be understood through their contributions to our ability to act successfully. From the very beginnings
of AI, intelligence in machines has been defined in the same way:
Machines are intelligent to the extent that their actions can be expected
to achieve their objectives.
M 9780525558613_Human_TX.indd 9 8/7/19 11:21 PM
Not
nce nc
ans are intell ans are inte
ieve our ieve our
for
o sapi sap
elf- elf eexamin xami
that can that can
Distribution
ingle mantr ngle mantr
at this is a this is a
erseded bu seded bu
itself. itself.
ence is cen ence is ce
ns ns, o , o

-- 23 of 352 --

10 H U M A N C O M PAT I B L E
Because machines, unlike humans, have no objectives of their own,
we give them objectives to achieve. In other words, we build optimizing machines, we feed objectives into them, and off they go.
This general approach is not unique to AI. It recurs throughout the
technological and mathematical underpinnings of our society. In the
field of control theory, which designs control systems for everything
from jumbo jets to insulin pumps, the job of the system is to minimize a cost function that typically measures some deviation from a
desired behavior. In the field of economics, mechanisms and policies
are designed to maximize the utility of individuals, the welfare of
groups, and the profit of corporations. 9 In operations research, which
solves complex logistical and manufacturing problems, a solution
maximizes an expected sum of rewards over time. Finally, in statistics,
learning algorithms are designed to minimize an expected loss function that defines the cost of making prediction errors.
Evidently, this general scheme—which I will call the standard
model—is widespread and extremely powerful. Unfortunately, we
don’t want machines that are intelligent in this sense.
The drawback of the standard model was pointed out in 1960 by
Norbert Wiener, a legendary professor at MIT and one of the leading
mathematicians of the mid-twentieth century. Wiener had just seen
Arthur Samuel’s checker-playing program learn to play checkers far
better than its creator. That experience led him to write a prescient
but little-known paper, “Some Moral and Technical Consequences of
Automation.” 10 Here’s how he states the main point:
If we use, to achieve our purposes, a mechanical agency with
whose operation we cannot interfere effectively . . . we had better
be quite sure that the purpose put into the machine is the purpose
which we really desire.
“The purpose put into the machine” is exactly the objective that machines are optimizing in the standard model. If we put the wrong
9780525558613_Human_TX.indd 10 8/7/19 11:21 PM
Not
of o
el’ss ccheck hec
n its creato n its creat
kknown p nown
for
e stand tan
egendary pr egendary p
he he m mid- id
Distribution
the
ns research research
problems, problems,
time. Finall e. Final
imize an e mize an e
rediction er diction e
e—w which hich
xtremely po xtremely
intelligent intelligent
ard ard

---

## [Sección 7] Chapter 10. PROBLEM SOLVED? 246

-- 24 of 352 --

I F W E S U C C E E D 11
objective into a machine that is more intelligent than us, it will achieve
the objective, and we lose. The social-media meltdown I described
earlier is just a foretaste of this, resulting from optimizing the wrong
objective on a global scale with fairly unintelligent algorithms. In

---

## [Sección 8] Chapter 5, I spell out some far worse outcomes.

All this should come as no great surprise. For thousands of years,
we have known the perils of getting exactly what you wish for. In
every story where someone is granted three wishes, the third wish is
always to undo the first two wishes.
In summary, it seems that the march towards superhuman intelligence is unstoppable, but success might be the undoing of the human
race. Not all is lost, however. We have to understand where we went
wrong and then fix it.
Can We Fix It?
The problem is right there in the basic definition of AI. We say that
machines are intelligent to the extent that their actions can be expected to achieve their objectives, but we have no reliable way to make
sure that their objectives are the same as our objectives.
What if, instead of allowing machines to pursue their objectives,
we insist that they pursue our objectives? Such a machine, if it could
be designed, would be not just intelligent but also beneficial to humans.
So let’s try this:
Machines are beneficial to the extent that their actions can be expected to achieve our objectives.
This is probably what we should have done all along.
The difficult part, of course, is that our objectives are in us (all
eight billion of us, in all our glorious variety) and not in the machines.
It is, nonetheless, possible to build machines that are beneficial in
M 9780525558613_Human_TX.indd 11 8/7/19 11:21 PM
Not
bje bj
instead o nstead o
that they p that they
ed, wou ed, wou
hh
for
nt to to
heir ei objectiv object r
ctives ar tives ar
f
Distribution
erhu
doing of th ing of th
erstand whe rstand wh
in the ba in the ba
he e he e

-- 25 of 352 --

12 H U M A N C O M PAT I B L E
exactly this sense. Inevitably, these machines will be uncertain about
our objectives—after all, we are uncertain about them ourselves—but
it turns out that this is a feature, not a bug (that is, a good thing and
not a bad thing). Uncertainty about objectives implies that machines
will necessarily defer to humans: they will ask permission, they will
accept correction, and they will allow themselves to be switched off.
Removing the assumption that machines should have a definite
objective means that we will need to tear out and replace part of
the foundations of artificial intelligence—the basic definitions of what
we are trying to do. That also means rebuilding a great deal of the
superstructure—the accumulation of ideas and methods for actually
doing AI. The result will be a new relationship between humans and
machines, one that I hope will enable us to navigate the next few decades successfully.
9780525558613_Human_TX.indd 12 8/7/19 11:21 PM
Not
 
for Distribution
eat d
ethods for hods for
between h between h
navigate th igate th

-- 26 of 352 --
INTELLIGENCE IN HUMANS
AND MACHINES
When you arrive at a dead end, it’s a good idea to retrace
your steps and work out where you took a wrong turn. I
have argued that the standard model of AI, wherein machines optimize a fixed objective supplied by humans, is a dead end.
The problem is not that we might fail to do a good job of building AI
systems; it’s that we might succeed too well. The very definition of
success in AI is wrong.
So let’s retrace our steps, all the way to the beginning. Let’s try to
understand how our concept of intelligence came about and how it
came to be applied to machines. Then we have a chance of coming up
with a better definition of what counts as a good AI system.
Intelligence
How does the universe work? How did life begin? Where are my keys?
These are fundamental questions worthy of thought. But who is asking these questions? How am I answering them? How can a handful
M 9780525558613_Human_TX.indd 13 8/7/19 11:21 PM
Not
at w t
I is wrong s wrong
t’s retrace o t’s retrace
nd how nd how
for
d obje obj
t that we m that we m
we migh e migh
Distribution
S
dead end, i ad end, i
ork out wh ork out w
at the stan at the sta
tive tive

-- 27 of 352 --

14 H U M A N C O M PAT I B L E
of matter—the few pounds of pinkish-gray blancmange we call a
brain—perceive, understand, predict, and manipulate a world of unimaginable vastness? Before long, the mind turns to examine itself.
We have been trying for thousands of years to understand how our
minds work. Initially, the purposes included curiosity, self-management,
persuasion, and the rather pragmatic goal of analyzing mathematical
arguments. Yet every step towards an explanation of how the mind
works is also a step towards the creation of the mind’s capabilities in an
artifact—that is, a step towards artificial intelligence.
Before we can understand how to create intelligence, it helps to
understand what it is. The answer is not to be found in IQ tests, or
even in Turing tests, but in a simple relationship between what we
perceive, what we want, and what we do. Roughly speaking, an entity
is intelligent to the extent that what it does is likely to achieve what it
wants, given what it has perceived.
Evolutionary origins
Consider a lowly bacterium, such as E. coli. It is equipped with
about half a dozen flagella—long, hairlike tentacles that rotate at the
base either clockwise or counterclockwise. (The rotary motor itself is
an amazing thing, but that’s another story.) As E. coli floats about in its
liquid home—your lower intestine—it alternates between rotating its
flagella clockwise, causing it to “tumble” in place, and counterclockwise, causing the flagella to twine together into a kind of propeller so
the bacterium swims in a straight line. Thus, E. coli does a sort of random walk—swim, tumble, swim, tumble—that allows it to find and
consume glucose rather than staying put and dying of starvation.
If this were the whole story, we wouldn’t say that E. coli is particularly intelligent, because its actions would not depend in any way on
its environment. It wouldn’t be making any decisions, just executing a
fixed behavior that evolution has built into its genes. But this isn’t
the whole story. When E. coli senses an increasing concentration of
9780525558613_Human_TX.indd 14 8/7/19 11:21 PM
Not
wis wi
hing, but t ng, but t
me— —yyour lo our l
ockwise ockwise
for
acteriu eri
lagella— lagella—llo
e or cou e or cou
h
Distribution
nce,,
und in IQ d in IQ
hip betwee ip betwee
ughly spea hly spea
oes is likely es is likely
m, s m, s

---

## [Sección 9] Chapter 5, I spell out some far worse outcomes.

-- 28 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 15
glucose, it swims longer and tumbles less, and it does the opposite
when it senses a decreasing concentration of glucose. So, what it does
(swim towards glucose) is likely to achieve what it wants (more glucose, let’s assume), given what it has perceived (an increasing glucose
concentration).
Perhaps you are thinking, “But evolution built this into its genes
too! How does that make it intelligent?” This is a dangerous line of
reasoning, because evolution built the basic design of your brain into
your genes too, and presumably you wouldn’t wish to deny your own
intelligence on that basis. The point is that what evolution has built
into E. coli’s genes, as it has into yours, is a mechanism whereby the
bacterium’s behavior varies according to what it perceives in its environment. Evolution doesn’t know, in advance, where the glucose is
going to be or where your keys are, so putting the capability to find
them into the organism is the next best thing.
Now, E. coli is no intellectual giant. As far as we know, it doesn’t
remember where it has been, so if it goes from A to B and finds no
glucose, it’s just as likely to go back to A. If we construct an environment where every attractive glucose gradient leads only to a spot of
phenol (which is a poison for E. coli), the bacterium will keep following those gradients. It never learns. It has no brain, just a few simple
chemical reactions to do the job.
A big step forward occurred with action potentials, which are a form
of electrical signaling that first evolved in single-celled organisms
around a billion years ago. Later multicellular organisms evolved specialized cells called neurons that use electrical action potentials to carry
signals rapidly—up to 120 meters per second, or 270 miles per hour—
within the organism. The connections between neurons are called synapses. The strength of the synaptic connection dictates how much
electrical excitation passes from one neuron to another. By changing
the strength of synaptic connections, animals learn.1 Learning confers a
huge evolutionary advantage, because the animal can adapt to a range
of circumstances. Learning also speeds up the rate of evolution itself.
M 9780525558613_Human_TX.indd 15 8/7/19 11:21 PM
Not
ents n
actions to ions to
step forwar step forwa
ical sign ical sig
ll
for
ractive tiv
poison for poison for
. It neve It neve
d
Distribution
olutio
hanism wh nism wh
it perceives t perceive
nce, where , wher
putting the putting the
best thing. t thing.
giant. As f iant. As
, so if it go , so if it g
go back t go back t
gluc gluc

-- 29 of 352 --

16 H U M A N C O M PAT I B L E
Initially, neurons were organized into nerve nets, which are distributed throughout the organism and serve to coordinate activities such
as eating and digestion or the timed contraction of muscle cells across
a wide area. The graceful propulsion of jellyfish is the result of a nerve
net. Jellyfish have no brains at all.
Brains came later, along with complex sense organs such as eyes
and ears. Several hundred million years after jellyfish emerged with
their nerve nets, we humans arrived with our big brains—a hundred
billion (1011
) neurons and a quadrillion (1015 ) synapses. While slow
compared to electronic circuits, the “cycle time” of a few milliseconds
per state change is fast compared to most biological processes. The
human brain is often described by its owners as “the most complex
object in the universe,” which probably isn’t true but is a good excuse
for the fact that we still understand little about how it really works.
While we know a great deal about the biochemistry of neurons and
synapses and the anatomical structures of the brain, the neural implementation of the cognitive level—learning, knowing, remembering,
reasoning, planning, deciding, and so on—is still mostly anyone’s
guess. 2 (Perhaps that will change as we understand more about AI, or
as we develop ever more precise tools for measuring brain activity.)
So, when one reads in the media that such-and-such AI technique
“works just like the human brain,” one may suspect it’s either just
someone’s guess or plain fiction.
In the area of consciousness, we really do know nothing, so I’m going to say nothing. No one in AI is working on making machines conscious, nor would anyone know where to start, and no behavior has
consciousness as a prerequisite. Suppose I give you a program and ask,
“Does this present a threat to humanity?” You analyze the code and
indeed, when run, the code will form and carry out a plan whose result will be the destruction of the human race, just as a chess program
will form and carry out a plan whose result will be the defeat of any
human who faces it. Now suppose I tell you that the code, when run,
also creates a form of machine consciousness. Will that change your
9780525558613_Human_TX.indd 16 8/7/19 11:21 PM
Not
ad ad
ike the h e the h
guess or pl guess or p
area of area of
hh
for
ill chan ch
more preci more prec
in the in the
Distribution
w m
cal proces l proces
as “the mo s “the mo
true but is e but is
le about ho e about ho
he biochem biochem
tures of the res of the
el— —learnin learn
ng, and s ng, and s
ge a ge a

---

## [Sección 10] Chapter 5, I spell out some far worse outcomes.

-- 30 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 17
prediction? Not at all. It makes absolutely no difference. 3 Your prediction about its behavior is exactly the same, because the prediction is
based on the code. All those Hollywood plots about machines mysteriously becoming conscious and hating humans are really missing the
point: it’s competence, not consciousness, that matters.
There is one important cognitive aspect of the brain that we are
beginning to understand—namely, the reward system. This is an internal signaling system, mediated by dopamine, that connects positive
and negative stimuli to behavior. Its workings were discovered by
the Swedish neuroscientist Nils-Åke Hillarp and his collaborators in
the late 1950s. It causes us to seek out positive stimuli, such as sweettasting foods, that increase dopamine levels; it makes us avoid negative
stimuli, such as hunger and pain, that decrease dopamine levels. In a
sense it’s quite similar to E. coli’s glucose-seeking mechanism, but
much more complex. It comes with built-in methods for learning, so
that our behavior becomes more effective at obtaining reward over
time. It also allows for delayed gratification, so that we learn to desire
things such as money that provide eventual reward rather than immediate reward. One reason we understand the brain’s reward system is
that it resembles the method of reinforcement learning developed in AI,
for which we have a very solid theory.4
From an evolutionary point of view, we can think of the brain’s
reward system, just like E. coli’s glucose-seeking mechanism, as a way
of improving evolutionary fitness. Organisms that are more effective
in seeking reward—that is, finding delicious food, avoiding pain, engaging in sexual activity, and so on—are more likely to propagate their
genes. It is extraordinarily difficult for an organism to decide what
actions are most likely, in the long run, to result in successful propagation of its genes, so evolution has made it easier for us by providing
built-in signposts.
These signposts are not perfect, however. There are ways to obtain
reward that probably reduce the likelihood that one’s genes will propagate. For example, taking drugs, drinking vast quantities of sugary
M 9780525558613_Human_TX.indd 17 8/7/19 11:21 PM
Not
ave v
evolution volution
ystem, just ystem, just
ving evo ving ev
for
son we n w
e method o e method
a very so very s
Distribution
coll
muli, such uli, such
makes us av makes us av
ease dopam e dopam
cose- ose-seekin seekin
built uilt--iin me n m
e effective effective
d gratificati d gratifica
provide eve provide ev
und und

-- 31 of 352 --

18 H U M A N C O M PAT I B L E
carbonated beverages, and playing video games for eighteen hours a
day all seem counterproductive in the reproduction stakes. Moreover,
if you were given direct electrical access to your reward system, you
would probably self-stimulate without stopping until you died. 5
The misalignment of reward signals and evolutionary fitness
doesn’t affect only isolated individuals. On a small island off the coast
of Panama lives the pygmy three-toed sloth, which appears to be addicted to a Valium-like substance in its diet of red mangrove leaves
and may be going extinct. 6 Thus, it seems that an entire species can
disappear if it finds an ecological niche where it can satisfy its reward
system in a maladaptive way.
Barring these kinds of accidental failures, however, learning to
maximize reward in natural environments will usually improve one’s
chances for propagating one’s genes and for surviving environmental
changes.
Evolutionary accelerator
Learning is good for more than surviving and prospering. It also
speeds up evolution. How could this be? After all, learning doesn’t
change one’s DNA, and evolution is all about changing DNA over
generations. The connection between learning and evolution was proposed in 1896 by the American psychologist James Baldwin7 and independently by the British ethologist Conwy Lloyd Morgan8 but not
generally accepted at the time.
The Baldwin effect, as it is now known, can be understood by
imagining that evolution has a choice between creating an instinctive
organism whose every response is fixed in advance and creating an
adaptive organism that learns what actions to take. Now suppose, for
the purposes of illustration, that the optimal instinctive organism can
be coded as a six-digit number, say, 472116, while in the case of the
adaptive organism, evolution specifies only 472*** and the organism
itself has to fill in the last three digits by learning during its lifetime.
9780525558613_Human_TX.indd 18 8/7/19 11:21 PM
Not
NA NA
The conne e conne
1896 by the 1896 by th
tly by th tly by t
for
r more mo
How coul How cou
and ev and ev
Distribution
tisfyy
however, l however, l
will usually usually
for survivi for survivi
ator ator
than tha

---

## [Sección 11] Chapter 5, I spell out some far worse outcomes.

-- 32 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 19
Clearly, if evolution has to worry about choosing only the first three
digits, its job is much easier; the adaptive organism, in learning the last
three digits, is doing in one lifetime what evolution would have taken
many generations to do. So, provided the adaptive organisms can survive while learning, it seems that the capability for learning constitutes an evolutionary shortcut. Computational simulations suggest
that the Baldwin effect is real. 9 The effects of culture only accelerate
the process, because an organized civilization protects the individual
organism while it is learning and passes on information that the individual would otherwise need to learn for itself.
The story of the Baldwin effect is fascinating but incomplete: it
assumes that learning and evolution necessarily point in the same direction. That is, it assumes that whatever internal feedback signal defines the direction of learning within the organism is perfectly aligned
with evolutionary fitness. As we have seen in the case of the pygmy
three-toed sloth, this does not seem to be true. At best, built-in mechanisms for learning provide only a crude hint of the long-term consequences of any given action for evolutionary fitness. Moreover, one has
to ask, “How did the reward system get there in the first place?” The
answer, of course, is by an evolutionary process, one that internalized
a feedback mechanism that is at least somewhat aligned with evolutionary fitness.10 Clearly, a learning mechanism that caused organisms
to run away from potential mates and towards predators would not
last long.
Thus, we have the Baldwin effect to thank for the fact that neurons, with their capabilities for learning and problem solving, are so
widespread in the animal kingdom. At the same time, it is important
to understand that evolution doesn’t really care whether you have a
brain or think interesting thoughts. Evolution considers you only as an
agent, that is, something that acts. Such worthy intellectual characteristics as logical reasoning, purposeful planning, wisdom, wit, imagination, and creativity may be essential for making an agent intelligent, or
they may not. One reason artificial intelligence is so fascinating is that
M 9780525558613_Human_TX.indd 19 8/7/19 11:21 PM
Not
han h
ss.10 Clea Clea
way from p way from
for
eward war
s by an evo s by an ev
ism tha ism tha
l
Distribution
g but incom but inco
y point in t y point in t
nternal feed nal fee
e organism organism
ve seen in t seen in
em to be tru m to be tru
nly a crude nly a crud
for evolut for evolut
syste syste

-- 33 of 352 --

20 H U M A N C O M PAT I B L E
it offers a potential route to understanding these issues: we may come
to understand both how these intellectual characteristics make intelligent behavior possible and why it’s impossible to produce truly intelligent behavior without them.
Rationality for one
From the earliest beginnings of ancient Greek philosophy, the concept of intelligence has been tied to the ability to perceive, to reason,
and to act successfully.11 Over the centuries, the concept has become
both broader in its applicability and more precise in its definition.
Aristotle, among others, studied the notion of successful reasoning—
methods of logical deduction that would lead to true conclusions given
true premises. He also studied the process of deciding how to act—
sometimes called practical reasoning—and proposed that it involved
deducing that a certain course of action would achieve a desired goal:
We deliberate not about ends, but about means. For a doctor does
not deliberate whether he shall heal, nor an orator whether he
shall persuade. . . . They assume the end and consider how and by
what means it is attained, and if it seems easily and best produced
thereby; while if it is achieved by one means only they consider
how it will be achieved by this and by what means this will be
achieved, till they come to the first cause . . . and what is last in the
order of analysis seems to be first in the order of becoming. And if
we come on an impossibility, we give up the search, e.g., if we
need money and this cannot be got; but if a thing appears possible
we try to do it.12
This passage, one might argue, set the tone for the next two-thousandodd years of Western thought about rationality. It says that the “end”—
what the person wants—is fixed and given; and it says that the rational
9780525558613_Human_TX.indd 20 8/7/19 11:21 PM
Not
isis
while if it le if it
will be ach will be ac
ed, till th ed, till th
for
her he he
. They assu . They ass
ttained, ttained,
Distribution
ept h
n its defin ts defin
successful uccessful
d to true con true co
ess of decid ss of decid
—and prop nd prop
ction would ion would
nds, but ab nds, but a
hall hall

---

## [Sección 12] Chapter 5, I spell out some far worse outcomes.

-- 34 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 21
action is one that, according to logical deduction across a sequence of
actions, “easily and best” produces the end.
Aristotle’s proposal seems reasonable, but it isn’t a complete guide
to rational behavior. In particular, it omits the issue of uncertainty. In
the real world, reality has a tendency to intervene, and few actions or
sequences of actions are truly guaranteed to achieve the intended end.
For example, it is a rainy Sunday in Paris as I write this sentence, and
on Tuesday at 2:15 p.m. my flight to Rome leaves from Charles de
Gaulle Airport, about forty-five minutes from my house. I plan to
leave for the airport around 11:30 a.m., which should give me plenty
of time, but it probably means at least an hour sitting in the departure
area. Am I certain to catch the flight? Not at all. There could be huge
traffic jams, the taxi drivers may be on strike, the taxi I’m in may
break down or the driver may be arrested after a high-speed chase,
and so on. Instead, I could leave for the airport on Monday, a whole
day in advance. This would greatly reduce the chance of missing the
flight, but the prospect of a night in the departure lounge is not an
appealing one. In other words, my plan involves a trade-off between
the certainty of success and the cost of ensuring that degree of certainty. The following plan for buying a house involves a similar tradeoff: buy a lottery ticket, win a million dollars, then buy the house.
This plan “easily and best” produces the end, but it’s not very likely to
succeed. The difference between this harebrained house-buying plan
and my sober and sensible airport plan is, however, just a matter of
degree. Both are gambles, but one seems more rational than the other.
It turns out that gambling played a central role in generalizing Aristotle’s proposal to account for uncertainty. In the 1560s, the Italian
mathematician Gerolamo Cardano developed the first mathematically precise theory of probability—using dice games as his main example. (Unfortunately, his work was not published until 1663.13
) In
the seventeenth century, French thinkers including Antoine Arnauld
and Blaise Pascal began—for assuredly mathematical reasons—to
M 9780525558613_Human_TX.indd 21 8/7/19 11:21 PM
Not
ryy
asily and b ly and b
The differe he differ
ober an ober an
for
ss and an
ng plan for ng plan fo
ticket, w icket, w
Distribution
d giv g
ing in the d g in the
ll. There co l. There co
trike, the t e, the
ted after a ted after a
the airpor he airpor
tly reduce t y reduce t
night in th night in t
ords, my p ords, my p
the the

-- 35 of 352 --

22 H U M A N C O M PAT I B L E
study the question of rational decisions in gambling.14 Consider the
following two bets:
A: 20 percent chance of winning $10
B: 5 percent chance of winning $100
The proposal the mathematicians came up with is probably the same
one you would come up with: compare the expected values of the bets,
which means the average amount you would expect to get from each
bet. For bet A, the expected value is 20 percent of $10, or $2. For bet
B, the expected value is 5 percent of $100, or $5. So bet B is better,
according to this theory. The theory makes sense, because if the same
bets are offered over and over again, a bettor who follows the rule ends
up with more money than one who doesn’t.
In the eighteenth century, the Swiss mathematician Daniel Bernoulli noticed that this rule didn’t seem to work well for larger amounts
of money.15 For example, consider the following two bets:
A: 100 percent chance of getting $10,000,000
(expected value $10,000,000)
B: 1 percent chance of getting $1,000,000,100
(expected value $10,000,001)
Most readers of this book, as well as its author, would prefer bet A to
bet B, even though the expected-value rule says the opposite! Bernoulli posited that bets are evaluated not according to expected monetary value but according to expected utility. Utility—the property of
being useful or beneficial to a person—was, he suggested, an internal,
subjective quantity related to, but distinct from, monetary value. In
particular, utility exhibits diminishing returns with respect to money.
This means that the utility of a given amount of money is not strictly
proportional to the amount but grows more slowly. For example, the
utility of having $1,000,000,100 is much less than a hundred times
9780525558613_Human_TX.indd 22 8/7/19 11:21 PM
Not
per p
(ex (ex
ers of th ers of t
hh
for
cent ch t c
(expected v (expected
cent cha ent cha
Distribution
, or
So bet B i o bet B i
e, because e, because
who follow o follow
n’t. n t.
wiss mathem ss mathe
seem to wor em to wor
der the foll der the fo
nce nce

---

## [Sección 13] Chapter 5, I spell out some far worse outcomes.

-- 36 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 23
the utility of having $10,000,000. How much less? You can ask yourself! What would the odds of winning a billion dollars have to be for
you to give up a guaranteed ten million? I asked this question of the
graduate students in my class and their answer was around 50 percent,
meaning that bet B would have an expected value of $500 million to
match the desirability of bet A. Let me say that again: bet B would
have an expected dollar value fifty times greater than bet A, but the
two bets would have equal utility.
Bernoulli’s introduction of utility—an invisible property—to explain human behavior via a mathematical theory was an utterly remarkable proposal for its time. It was all the more remarkable for the
fact that, unlike monetary amounts, the utility values of various bets
and prizes are not directly observable; instead, utilities are to be inferred from the preferences exhibited by an individual. It would be two
centuries before the implications of the idea were fully worked out
and it became broadly accepted by statisticians and economists.
In the middle of the twentieth century, John von Neumann (a
great mathematician after whom the standard “von Neumann architecture” for computers was named16 ) and Oskar Morgenstern published an axiomatic basis for utility theory.17 What this means is the
following: as long as the preferences exhibited by an individual satisfy
certain basic axioms that any rational agent should satisfy, then necessarily the choices made by that individual can be described as maximizing the expected value of a utility function. In short, a rational
agent acts so as to maximize expected utility.
It’s hard to overstate the importance of this conclusion. In many
ways, artificial intelligence has been mainly about working out the
details of how to build rational machines.
Let’s look in a bit more detail at the axioms that rational entities
are expected to satisfy. Here’s one, called transitivity: if you prefer A
to B and you prefer B to C, then you prefer A to C. This seems pretty
reasonable! (If you prefer sausage pizza to plain pizza, and you prefer
plain pizza to pineapple pizza, then it seems reasonable to predict that
M 9780525558613_Human_TX.indd 23 8/7/19 11:21 PM
Not
ng a g
c axioms t xioms t
e choices m e choices m
he expe he expe
for
s was wa
basis for u basis for
s the pr the pr
h
Distribution
as an
e remarkab emarkab
y values of values of
tead, utiliti d, utilit
an individu n individu
f the idea w he idea
by statistici statistici
entieth cen entieth ce
whom the whom th
nam nam

-- 37 of 352 --

24 H U M A N C O M PAT I B L E
you will choose sausage pizza over pineapple pizza.) Here’s another,
called monotonicity: if you prefer prize A to prize B, and you have a
choice of lotteries where A and B are the only two possible outcomes,
you prefer the lottery with the highest probability of getting A rather
than B. Again, pretty reasonable.
Preferences are not just about pizza and lotteries with monetary
prizes. They can be about anything at all; in particular, they can be
about entire future lives and the lives of others. When dealing with
preferences involving sequences of events over time, there is an additional assumption that is often made, called stationarity: if two different futures A and B begin with the same event, and you prefer A to
B, you still prefer A to B after the event has occurred. This sounds
reasonable, but it has a surprisingly strong consequence: the utility of
any sequence of events is the sum of rewards associated with each
event (possibly discounted over time, by a sort of mental interest
rate).18 Although this “utility as a sum of rewards” assumption is
widespread—going back at least to the eighteenth-century “hedonic
calculus” of Jeremy Bentham, the founder of utilitarianism—the stationarity assumption on which it is based is not a necessary property
of rational agents. Stationarity also rules out the possibility that one’s
preferences might change over time, whereas our experience indicates
otherwise.
Despite the reasonableness of the axioms and the importance of
the conclusions that follow from them, utility theory has been subjected to a continual barrage of objections since it first became widely
known. Some despise it for supposedly reducing everything to money
and selfishness. (The theory was derided as “American” by some French
authors,19 even though it has its roots in France.) In fact, it is perfectly
rational to want to live a life of self-denial, wishing only to reduce the
suffering of others. Altruism simply means placing substantial weight
on the well-being of others in evaluating any given future.
Another set of objections has to do with the difficulty of obtaining
the necessary probabilities and utility values and multiplying them
9780525558613_Human_TX.indd 24 8/7/19 11:21 PM
Not
ht c t
e the reaso e the reas
usions th usions t
for
n whic whi
tationarity ationarity
hange ov ange ov
Distribution
y: if
nd you pre you pre
occurred. T ccurred. T
onsequence equenc
ewards asso wards asso
e, by a sor by a so
a sum of sum of
ast to the ast to the
m, the fou m, the fou
it i it i

---

## [Sección 14] Chapter 5, I spell out some far worse outcomes.

-- 38 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 25
together to calculate expected utilities. These objections are simply
confusing two different things: choosing the rational action and choosing it by calculating expected utilities. For example, if you try to poke
your eyeball with your finger, your eyelid closes to protect your eye;
this is rational, but no expected-utility calculations are involved. Or
suppose you are riding a bicycle downhill with no brakes and have a
choice between crashing into one concrete wall at ten miles per hour
or another, farther down the hill, at twenty miles per hour; which
would you prefer? If you chose ten miles per hour, congratulations!
Did you calculate expected utilities? Probably not. But the choice of
ten miles per hour is still rational. This follows from two basic assumptions: first, you prefer less severe injuries to more severe injuries,
and second, for any given level of injuries, increasing the speed of
collision increases the probability of exceeding that level. From these
two assumptions it follows mathematically—without considering any
numbers at all—that crashing at ten miles per hour has higher expected utility than crashing at twenty. 20 In summary, maximizing
expected utility may not require calculating any expectations or any
utilities. It’s a purely external description of a rational entity.
Another critique of the theory of rationality lies in the identification of the locus of decision making. That is, what things count as
agents? It might seem obvious that humans are agents, but what about
families, tribes, corporations, cultures, and nation-states? If we examine social insects such as ants, does it make sense to consider a single
ant as an intelligent agent, or does the intelligence really lie in the
colony as a whole, with a kind of composite brain made up of multiple
ant brains and bodies that are interconnected by pheromone signaling
instead of electrical signaling? From an evolutionary point of view, this
may be a more productive way of thinking about ants, since the ants
in a given colony are typically closely related. As individuals, ants and
other social insects seem to lack an instinct for self-preservation as
distinct from colony preservation: they will always throw themselves
into battle against invaders, even at suicidal odds. Yet sometimes
M 9780525558613_Human_TX.indd 25 8/7/19 11:21 PM
Not
us o s
ight seem ht seem
tribes, corp tribes, cor
l insects l insect
for
xterna rn
ue of the th e of the t
f decisi f decisi
Distribution
ut th
from two om two
to more sev o more sev
s, increasin ncreasin
ceeding tha eeding tha
atically— cally—w w
t ten miles ten miles
at twenty. at twent
equire calc equire cal
desc desc

-- 39 of 352 --

26 H U M A N C O M PAT I B L E
humans will do the same even to defend unrelated humans; it is as if
the species benefits from the presence of some fraction of individuals
who are willing to sacrifice themselves in battle, or to go off on wild,
speculative voyages of exploration, or to nurture the offspring of others. In such cases, an analysis of rationality that focuses entirely on the
individual is clearly missing something essential.
The other principal objections to utility theory are empirical—
that is, they are based on experimental evidence suggesting that humans are irrational. We fail to conform to the axioms in systematic
ways. 21 It is not my purpose here to defend utility theory as a formal
model of human behavior. Indeed, humans cannot possibly behave
rationally. Our preferences extend over the whole of our own future
lives, the lives of our children and grandchildren, and the lives of others, living now or in the future. Yet we cannot even play the right
moves on the chessboard, a tiny, simple place with well-defined rules
and a very short horizon. This is not because our preferences are irrational but because of the complexity of the decision problem. A great
deal of our cognitive structure is there to compensate for the mismatch between our small, slow brains and the incomprehensibly huge
complexity of the decision problem that we face all the time.
So, while it would be quite unreasonable to base a theory of beneficial AI on an assumption that humans are rational, it’s quite reasonable to suppose that an adult human has roughly consistent preferences
over future lives. That is, if you were somehow able to watch two movies,
each describing in sufficient detail and breadth a future life you might
lead, such that each constitutes a virtual experience, you could say which
you prefer, or express indifference. 22
This claim is perhaps stronger than necessary, if our only goal is to
make sure that sufficiently intelligent machines are not catastrophic
for the human race. The very notion of catastrophe entails a definitelynot-preferred life. For catastrophe avoidance, then, we need claim
only that adult humans can recognize a catastrophic future when it is
spelled out in great detail. Of course, human preferences have a much
9780525558613_Human_TX.indd 26 8/7/19 11:21 PM
Not
wou o
n assump assump
ppose that a ppose that
e lives. T e lives.
for
all, slow slo
ecision prob ecision pro
d be qu d be qu
Distribution
oryy
ot possibly possibly
ole of our o ole of our o
dren, and th n, and t
e cannot ev cannot ev
ple place wi place w
not because t because
plexity lexity of th of t
ure is the ure is th
bra bra

---

## [Sección 15] Chapter 5, I spell out some far worse outcomes.

-- 40 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 27
more fine-grained and, presumably, ascertainable structure than just
“non-catastrophes are better than catastrophes.”
A theory of beneficial AI can, in fact, accommodate inconsistency
in human preferences, but the inconsistent part of your preferences
can never be satisfied and there’s nothing AI can do to help. Suppose,
for example, that your preferences for pizza violate the axiom of
transitivity:
ROBOT : Welcome home! Want some pineapple pizza?
YOU : No, you should know I prefer plain pizza to pineapple.
ROBOT : OK, one plain pizza coming up!
YOU : No thanks, I like sausage pizza better.
ROBOT : So sorry, one sausage pizza!
YOU : Actually, I prefer pineapple to sausage.
ROBOT : My mistake, pineapple it is!
YOU : I already said I like plain better than pineapple.
There is no pizza the robot can serve that will make you happy
because there’s always another pizza you would prefer to have. A robot can satisfy only the consistent part of your preferences—for example, let’s say you prefer all three kinds of pizza to no pizza at all. In
that case, a helpful robot could give you any one of the three pizzas,
thereby satisfying your preference to avoid “no pizza” while leaving
you to contemplate your annoyingly inconsistent pizza topping preferences at leisure.
Rationality for two
The basic idea that a rational agent acts so as to maximize expected utility is simple enough, even if actually doing it is impossibly
complex. The theory applies, however, only in the case of a single
agent acting alone. With more than one agent, the notion that it’s
possible—at least in principle—to assign probabilities to the different
M 9780525558613_Human_TX.indd 27 8/7/19 11:21 PM
Not
u p u
helpful ro lpful ro
satisfying y satisfying
ntempla ntempl
for
anoth not
the consist the consis
refer all efer all
b
Distribution
ineapp
ausage. ausage.
is!
better than etter than
obot can obot can
r pi r pi

-- 41 of 352 --

28 H U M A N C O M PAT I B L E
outcomes of one’s actions becomes problematic. The reason is that
now there’s a part of the world—the other agent—that is trying to
second-guess what action you’re going to do, and vice versa, so it’s not
obvious how to assign probabilities to how that part of the world is
going to behave. And without probabilities, the definition of rational
action as maximizing expected utility isn’t applicable.
As soon as someone else comes along, then, an agent will need
some other way to make rational decisions. This is where game theory
comes in. Despite its name, game theory isn’t necessarily about games
in the usual sense; it’s a general attempt to extend the notion of rationality to situations with multiple agents. This is obviously important
for our purposes, because we aren’t planning (yet) to build robots that
live on uninhabited planets in other star systems; we’re going to put
the robots in our world, which is inhabited by us.
To make it clear why we need game theory, let’s look at a simple example: Alice and Bob playing soccer in the back garden (figure 3). Alice
is about to take a penalty kick and Bob is in goal. Alice is going to shoot
v
B
A
FIGURE $OLFHDERXWWRWDNHDSHQDOW\NLFNDJDLQVW%RE
9780525558613_Human_TX.indd 28 8/7/19 11:21 PM
NototN N for for Distribution
notio
bviously im iously im
et) to build t) to build
stems; we’r ms; we’
ed by us. d by us.
e theory, let heory, le
er in the bac n the bac
and Bob is in nd Bob is

-- 42 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 29
to Bob’s left or to his right. Because she is right-footed, it’s a little bit
easier and more accurate for Alice to shoot to Bob’s right. Because Alice
has a ferocious shot, Bob knows he has to dive one way or the other right
away—he won’t have time to wait and see which way the ball is going.
Bob could reason like this: “Alice has a better chance of scoring if she
shoots to my right, because she’s right-footed, so she’ll choose that, so
I’ll dive right.” But Alice is no fool and can imagine Bob thinking this
way, in which case she will shoot to Bob’s left. But Bob is no fool and can
imagine Alice thinking this way, in which case he will dive to his left.
But Alice is no fool and can imagine Bob thinking this way. . . . OK, you
get the idea. Put another way: if there is a rational choice for Alice, Bob
can figure it out too, anticipate it, and stop Alice from scoring, so the
choice couldn’t have been rational in the first place.
As early as 1713—once again, in the analysis of gambling games—a
solution was found to this conundrum. 23 The trick is not to choose any
one action but to choose a randomized strategy. For example, Alice can
choose the strategy “shoot to Bob’s right with probability 55 percent
and shoot to his left with probability 45 percent.” Bob could choose
“dive right with probability 60 percent and left with probability 40
percent.” Each mentally tosses a suitably biased coin just before acting, so they don’t give away their intentions. By acting unpredictably,
Alice and Bob avoid the contradictions of the preceding paragraph.
Even if Bob works out what Alice’s randomized strategy is, there’s not
much he can do about it without a crystal ball.
The next question is, What should the probabilities be? Is Alice’s
choice of 55 percent–45 percent rational? The specific values depend
on how much more accurate Alice is when shooting to Bob’s right,
how good Bob is at saving the shot when he dives the right way, and so
on. (See the notes for the complete analysis. 24 ) The general criterion is
very simple, however:
1. Alice’s strategy is the best she can devise, assuming that Bob’s
is fixed.
M 9780525558613_Human_TX.indd 29 8/7/19 11:21 PM
Not
n tt
ob avoid avoid
ob works o ob works o
can do can do
for
ability lity
ntally tosse ntally toss
give awa ive awa
h
Distribution
way. y
hoice for A oice for A
ice from sco ce from sco
t place. ace.
analysis of g nalysis of g
m.23 The tri The tr
mized strateg zed strateg
Bob’s right Bob’s rig
probability probabilit
60 p 60 p

---

## [Sección 16] Chapter 5, I spell out some far worse outcomes.

-- 43 of 352 --

30 H U M A N C O M PAT I B L E
2. Bob’s strategy is the best he can devise, assuming that Alice’s
is fixed.
If both conditions are satisfied, we say that the strategies are in
equilibrium. This kind of equilibrium is called a Nash equilibrium in
honor of John Nash, who, in 1950 at the age of twenty-two, proved
that such an equilibrium exists for any number of agents with any rational preferences and no matter what the rules of the game might be.
After several decades’ struggle with schizophrenia, Nash eventually
recovered and was awarded the Nobel Memorial Prize in Economics
for this work in 1994.
For Alice and Bob’s soccer game, there is only one equilibrium. In
other cases, there may be several, so the concept of Nash equilibria,
unlike that of expected-utility decisions, does not always lead to a
unique recommendation for how to behave.
Worse still, there are situations in which the Nash equilibrium seems
to lead to highly undesirable outcomes. One such case is the famous
prisoner’s dilemma, so named by Nash’s PhD adviser, Albert Tucker, in
1950. 25 The game is an abstract model of those all-too-common realworld situations where mutual cooperation would be better for all
concerned but people nonetheless choose mutual destruction.
The prisoner’s dilemma works as follows: Alice and Bob are suspects in a crime and are being interrogated separately. Each has a
choice: to confess to the police and rat on his or her accomplice, or
to refuse to talk. 26 If both refuse, they are convicted on a lesser
charge and serve two years; if both confess, they are convicted on a
more serious charge and serve ten years; if one confesses and the other
refuses, the one who confesses goes free and the accomplice serves
twenty years.
Now, Alice reasons as follows: “If Bob is going to confess, then I
should confess too (ten years is better than twenty); if he is going to
refuse, then I should confess (going free is better than spending two
years in prison); so either way, I should confess.” Bob reasons the same
9780525558613_Human_TX.indd 30 8/7/19 11:21 PM
Not
eop o
ner’s dile r’s dile
a crime and a crime an
confess confes
for
abstra bstr
here mutua ere mutu
e nonet e nonet
Distribution
e in
ly one equi y one equi
ncept of N pt of N
s, does not , does not
ehave. have.
in which the which th
outcomes. O utcomes.
d by Nash’ d by Nash
t m t m

-- 44 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 31
way. Thus, they both end up confessing to their crimes and serving ten
years, even though by jointly refusing they could have served only two
years. The problem is that joint refusal isn’t a Nash equilibrium, because
each has an incentive to defect and go free by confessing.
Note that Alice could have reasoned as follows: “Whatever reasoning I do, Bob will also do. So we’ll end up choosing the same thing.
Since joint refusal is better than joint confession, we should refuse.”
This form of reasoning acknowledges that, as rational agents, Alice
and Bob will make choices that are correlated rather than independent. It’s just one of many approaches that game theorists have tried
in their efforts to obtain less depressing solutions to the prisoner’s
dilemma. 27
Another famous example of an undesirable equilibrium is the tragedy of the commons, first analyzed in 1833 by the English economist
William Lloyd 28 but named, and brought to global attention, by the
ecologist Garrett Hardin in 1968. 29 The tragedy arises when several
people can consume a shared resource—such as common grazing land
or fish stocks—that replenishes itself slowly. Absent any social or legal
constraints, the only Nash equilibrium among selfish (non-altruistic)
agents is for each to consume as much as possible, leading to rapid
collapse of the resource. The ideal solution, where everyone shares the
resource such that the total consumption is sustainable, is not an equilibrium because each individual has an incentive to cheat and take
more than their fair share—imposing the costs on others. In practice,
of course, humans do sometimes avoid this tragedy by setting up
mechanisms such as quotas and punishments or pricing schemes.
They can do this because they are not limited to deciding how much
to consume; they can also decide to communicate. By enlarging the
decision problem in this way, we find solutions that are better for
everyone.
These examples, and many others, illustrate the fact that extending the theory of rational decisions to multiple agents produces many
interesting and complex behaviors. It’s also extremely important
M 9780525558613_Human_TX.indd 31 8/7/19 11:21 PM
Not
eso es
h that the that the
because eac cause ea
n their n their
for
Nash e sh
to consume to consum
urce. Th urce. Th
Distribution
orist
ns to the to the
ble equilibr equilib
833 by the 33 by the
ought to gl ght to g
8.29 The tra The tr
resource— source—
shes itself shes itself
uilib uilib

---

## [Sección 17] Chapter 5, I spell out some far worse outcomes.

-- 45 of 352 --

32 H U M A N C O M PAT I B L E
because, as should be obvious, there is more than one human being.
And soon there will be intelligent machines too. Needless to say, we
have to achieve mutual cooperation, resulting in benefit to humans,
rather than mutual destruction.
Computers
Having a reasonable definition of intelligence is the first ingredient in
creating intelligent machines. The second ingredient is a machine in
which that definition can be realized. For reasons that will soon become obvious, that machine is a computer. It could have been something different—for example, we might have tried to make intelligent
machines out of complex chemical reactions or by hijacking biological
cells 30 —but devices built for computation, from the very earliest mechanical calculators onwards, have always seemed to their inventors to
be the natural home for intelligence.
We are so used to computers now that we barely notice their utterly incredible powers. If you have a laptop or a desktop or a smart
phone, look at it: a small box, with a way to type characters. Just by
typing, you can create programs that turn the box into something
new, perhaps something that magically synthesizes moving images of
oceangoing ships hitting icebergs or alien planets with tall blue people;
type some more, and it translates English into Chinese; type some
more, and it listens and speaks; type some more, and it defeats the
world chess champion.
This ability of a single box to carry out any process that you
can imagine is called universality, a concept first introduced by Alan
Turing in 1936. 31 Universality means that we do not need separate
machines for arithmetic, machine translation, chess, speech understanding, or animation: one machine does it all. Your laptop is essentially identical to the vast server farms run by the world’s largest IT
companies—even those equipped with fancy, special-purpose tensor
9780525558613_Human_TX.indd 32 8/7/19 11:21 PM
Not
cre c
somethin omethin
g ships hitt g ships hit
e more, e more,
ll
for
If you f yo
small box, mall box,
ate pro ate pro
Distribution
s a m
that will at will
ould uld have b have b dd
e tried to m ed to m
ons or by h ons or by h
ation, from on, from
always see lways see
gence. gence.
uters now uters now
hav hav

-- 46 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 33
processing units for machine learning. It’s also essentially identical to
all future computing devices yet to be invented. The laptop can do
exactly the same tasks, provided it has enough memory; it just takes a
lot longer.
Turing’s paper introducing universality was one of the most important ever written. In it, he described a simple computing device
that could accept as input the description of any other computing device, together with that second device’s input, and, by simulating the
operation of the second device on its input, produce the same output
that the second device would have produced. We now call this first
device a universal Turing machine. To prove its universality, Turing introduced precise definitions for two new kinds of mathematical objects: machines and programs. Together, the machine and program
define a sequence of events—specifically, a sequence of state changes
in the machine and its memory.
In the history of mathematics, new kinds of objects occur quite
rarely. Mathematics began with numbers at the dawn of recorded history. Then, around 2000 BCE, ancient Egyptians and Babylonians
worked with geometric objects (points, lines, angles, areas, and so on).
Chinese mathematicians introduced matrices during the first millennium BCE, while sets as mathematical objects arrived only in the
nineteenth century. Turing’s new objects—machines and programs—
are perhaps the most powerful mathematical objects ever invented. It
is ironic that the field of mathematics largely failed to recognize this,
and from the 1940s onwards, computers and computation have been
the province of engineering departments in most major universities.
The field that emerged—computer science—exploded over the
next seventy years, producing a vast array of new concepts, designs,
methods, and applications, as well as seven of the eight most valuable
companies in the world.
The central concept in computer science is that of an algorithm,
which is a precisely specified method for computing something. Algorithms are, by now, familiar parts of everyday life: a square-root
M 9780525558613_Human_TX.indd 33 8/7/19 11:21 PM
Not
ile l
century. T ntury. T
aps the mos aps the mo
that the that the
for
c objec bje
icians intro icians intr
sets as sets as
Distribution
ow c
versality, T rsality, T
ds of mathe s of mathe
the machin machin
y, a sequen y, a sequen
cs, new kin new kin
th numbers th numbe
BCE, anc BCE, anc
s (p s (p

---

## [Sección 18] Chapter 5, I spell out some far worse outcomes.

-- 47 of 352 --

34 H U M A N C O M PAT I B L E
algorithm in a pocket calculator receives a number as input and returns the square root of that number as output; a chess-playing algorithm takes a chess position and returns a move; a route-finding
algorithm takes a start location, a goal location, and a street map and
returns the fastest route from start to goal. Algorithms can be described in English or in mathematical notation, but to be implemented
they must be coded as programs in a programming language. More
complex algorithms can be built by using simpler ones as building
blocks called subroutines—for example, a self-driving car might use a
route-finding algorithm as a subroutine so that it knows where to go.
In this way, software systems of immense complexity are built up,
layer by layer.
Computer hardware matters because faster computers with more
memory allow algorithms to run more quickly and to handle more
information. Progress in this area is well known but still mindboggling. The first commercial electronic programmable computer,
the Ferranti Mark I, could execute about a thousand (10 3
) instructions
per second and had about a thousand bytes of main memory. The fastest computer as of early 2019, the Summit machine at the Oak Ridge
National Laboratory in Tennessee, executes about 1018 instructions
per second (a thousand trillion times faster) and has 2.5 × 1017 bytes of
memory (250 trillion times more). This progress has resulted from
advances in electronic devices and even in the underlying physics, allowing an incredible degree of miniaturization.
Although comparisons between computers and brains are not especially meaningful, the numbers for Summit slightly exceed the raw
capacity of the human brain, which, as noted previously, has about
1015 synapses and a “cycle time” of about one hundredth of a second,
for a theoretical maximum of about 1017 “operations” per second. The
biggest difference is power consumption: Summit uses about a million
times more power.
Moore’s law, an empirical observation that the number of electronic
components on a chip doubles every two years, is expected to continue
9780525558613_Human_TX.indd 34 8/7/19 11:21 PM
Not
usa usa
0 trillion trillion
n electroni n electron
incredib incredi
for
y 2019, 019
y in Tenne in Tenn
nd trilli nd trilli
Distribution
ws w
exity are b ity are b
ter comput compu
quickly and quickly an
is well kno well kn
lectronic p ctronic p
ute about a ute about
housand b housand b
the the

-- 48 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 35
until 2025 or so, although at a slightly slower rate. For some years,
speeds have been limited by the large amount of heat generated by the
fast switching of silicon transistors; moreover, circuit sizes cannot get
much smaller because the wires and connectors are (as of 2019) no
more than twenty-five atoms wide and five to ten atoms thick. Beyond
2025, we will need to use more exotic physical phenomena—including
negative capacitance devices, 32 single-atom transistors, graphene nanotubes, and photonics—to keep Moore’s law (or its successor) going.
Instead of just speeding up general-purpose computers, another
possibility is to build special-purpose devices that are customized to
perform just one class of computations. For example, Google’s tensor
processing units (TPUs) are designed to perform the calculations required for certain machine learning algorithms. One TPU pod (2018
version) performs roughly 1017 calculations per second—nearly as much
as the Summit machine—but uses about one hundred times less
power and is one hundred times smaller. Even if the underlying chip
technology remains roughly constant, these kinds of machines can
simply be made larger and larger to provide vast quantities of raw
computational power for AI systems.
Quantum computation is a different kettle of fish. It uses the
strange properties of quantum-mechanical wave functions to achieve
something remarkable: with twice the amount of quantum hardware,
you can do more than twice the amount of computation! Very roughly,
it works like this:33 Suppose you have a tiny physical device that stores
a quantum bit, or qubit. A qubit has two possible states, 0 and 1.
Whereas in classical physics the qubit device has to be in one of the
two states, in quantum physics the wave function that carries information about the qubit says that it is in both states simultaneously. If you
have two qubits, there are four possible joint states: 00, 01, 10, and 11.
If the wave function is coherently entangled across the two qubits,
meaning that no other physical processes are there to mess it up, then
the two qubits are in all four states simultaneously. Moreover, if the
two qubits are connected into a quantum circuit that performs some
M 9780525558613_Human_TX.indd 35 8/7/19 11:21 PM
Not
ies e
emarkable markabl
do more tha more tha
ike this ike this
bb
for
for AI A
putation is putation i
off qquan uan
Distribution
e cu
ple, Googl e, Goog
rm the calc m the calc
hms. One T s. One
ns per ns per ssecon econ
about on bout on
smaller. Ev maller. Ev
constant, t constant,
d larger to d larger t
yste yste

---

## [Sección 19] Chapter 5, I spell out some far worse outcomes.

-- 49 of 352 --

36 H U M A N C O M PAT I B L E
calculation, then the calculation proceeds with all four states simultaneously. With three qubits, you get eight states processed simultaneously, and so on. Now, there are some physical limitations so that the
amount of work that gets done is less than exponential in the number
of qubits, 34 but we know that there are important problems for which
quantum computation is provably more efficient than any classical
computer.
As of 2019, there are experimental prototypes of small quantum
processors in operation with a few tens of qubits, but there are no interesting computing tasks for which a quantum processor is faster
than a classical computer. The main difficulty is decoherence—
processes such as thermal noise that mess up the coherence of the
multi-qubit wave function. Quantum scientists hope to solve the
decoherence problem by introducing error correction circuitry, so that
any error that occurs in the computation is quickly detected and corrected by a kind of voting process. Unfortunately, error-correcting
systems require far more qubits to do the same work: while a quantum
machine with a few hundred perfect qubits would be very powerful
compared to existing classical computers, we will probably need a few
million error-correcting qubits to actually realize those computations.
Going from a few tens to a few million qubits will take quite a few
years. If, eventually, we get there, that would completely change the
picture of what we can do by sheer brute-force computation. 35 Rather
than waiting for real conceptual advances in AI, we might be able to
use the raw power of quantum computation to bypass some of the
barriers faced by current “unintelligent” algorithms.
The limits of computation
Even in the 1950s, computers were described in the popular press
as “super-brains” that were “faster than Einstein.” So can we say now,
finally, that computers are as powerful as the human brain? No. Focusing on raw computing power misses the point entirely. Speed alone
9780525558613_Human_TX.indd 36 8/7/19 11:21 PM
Not
w t w
ntually, w ually, w
what we ca what we c
ng for r ng for r
for
assical ica
ting qubits ting qubit
ens to a ns to a
Distribution
cesso
is decohe decohe
the cohere the cohere
ntists hope ts hop
or correction r correctio
tion is quic n is quic
ess. Unfortu . Unfortu
s to do the s s to do the
d perfect d perfect
comp com

-- 50 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 37
won’t give us AI. Running a poorly designed algorithm on a faster
computer doesn’t make the algorithm better; it just means you get the
wrong answer more quickly. (And with more data there are more opportunities for wrong answers!) The principal effect of faster machines has been to make the time for experimentation shorter, so that
research can progress more quickly. It’s not hardware that is holding
AI back; it’s software. We don’t yet know how to make a machine really intelligent—even if it were the size of the universe.
Suppose, however, that we do manage to develop the right kind of
AI software. Are there any limits placed by physics on how powerful
a computer can be? Will those limits prevent us from having enough
computing power to create real AI? The answers seem to be yes, there
are limits, and no, there isn’t a ghost of a chance that the limits will
prevent us from creating real AI. MIT physicist Seth Lloyd has estimated the limits for a laptop-sized computer, based on considerations
from quantum theory and entropy. 36 The numbers would raise even
Carl Sagan’s eyebrows: 10 51 operations per second and 10 30 bytes of
memory, or approximately a billion trillion trillion times faster and
four trillion times more memory than Summit—which, as noted previously, has more raw power than the human brain. Thus, when one
hears suggestions that the human mind represents an upper limit on
what is physically achievable in our universe, 37 one should at least ask
for further clarification.
Besides limits imposed by physics, there are other limits on the
abilities of computers that originate in the work of computer scientists. Turing himself proved that some problems are undecidable by
any computer: the problem is well defined, there is an answer, but
there cannot exist an algorithm that always finds that answer. He gave
the example of what became known as the halting problem: Can an
algorithm decide if a given program has an “infinite loop” that prevents it from ever finishing? 38
Turing’s proof that no algorithm can solve the halting problem 39 is
incredibly important for the foundations of mathematics, but it seems
M 9780525558613_Human_TX.indd 37 8/7/19 11:21 PM
Not
ns t s
ically ach ally ach
er clarificat clarifica
es limit es limit
for
e mem me
aw power t aw power
hat the hat the
Distribution
n ho
from havin m havin
rs seem to b s seem to b
chance that nce tha
physicist S physicist S
omputer, b mputer, b
py. y 366 The n The n
operations p operations
a billion a billion
ory t ory

---

## [Sección 20] Chapter 5, I spell out some far worse outcomes.

-- 51 of 352 --

38 H U M A N C O M PAT I B L E
to have no bearing on the issue of whether computers can be intelligent. One reason for this claim is that the same basic limitation seems
to apply to the human brain. Once you start asking a human brain to
perform an exact simulation of itself simulating itself simulating itself,
and so on, you’re bound to run into difficulties. I, for one, have never
worried about my inability to do this.
Focusing on decidable problems, then, seems not to place any real
restrictions on AI. It turns out, however, that decidable doesn’t mean
easy. Computer scientists spend a lot of time thinking about the complexity of problems, that is, the question of how much computation is
needed to solve a problem by the most efficient method. Here’s an
easy problem: given a list of a thousand numbers, find the biggest
number. If it takes one second to check each number, then it takes a
thousand seconds to solve this problem by the obvious method of
checking each in turn and keeping track of the biggest. Is there a faster
method? No, because if a method didn’t check some number in the
list, that number might be the biggest, and the method would fail. So,
the time to find the largest element is proportional to the size of the
list. A computer scientist would say the problem has linear complexity, meaning that it’s very easy; then she would look for something
more interesting to work on.
What gets theoretical computer scientists excited is the fact that
many problems appear 40 to have exponential complexity in the worst
case. This means two things: first, all the algorithms we know about
require exponential time—that is, an amount of time exponential in
the size of the input—to solve at least some problem instances; second, theoretical computer scientists are pretty sure that more efficient
algorithms do not exist.
Exponential growth in difficulty means that problems may be
solvable in theory (that is, they are certainly decidable) but sometimes
unsolvable in practice; we call such problems intractable. An example
is the problem of deciding whether a given map can be colored with
just three colors, so that no two adjacent regions have the same color.
9780525558613_Human_TX.indd 38 8/7/19 11:21 PM
Not
to to
s theoreti heoreti
blems appe blems app
means means
for
st wou wo
’s very easy s very ea
work on work on
Distribution
com
method. H ethod. H
bers, find t bers, find t
h number, umber,
m by the ob by the ob
ck of the bi of the bi
d didn’t idn’t che che tt
biggest, and biggest, a
element is element i
ld sa ld sa

-- 52 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 39
(It is well known that coloring with four different colors is always
possible.) With a million regions, it may be that there are some cases
(not all, but some) that require something like 21000 computational
steps to find the answer, which means about 10 275 years on the Summit supercomputer or a mere 10 242 years on Seth Lloyd’s ultimatephysics laptop. The age of the universe, about 1010 years, is a tiny blip
compared to this.
Does the existence of intractable problems give us any reason to
think that computers cannot be as intelligent as humans? No. There is
no reason to suppose that humans can solve intractable problems
either. Quantum computation helps a bit (whether in machines or
brains), but not enough to change the basic conclusion.
Complexity means that the real-world decision problem—the
problem of deciding what to do right now, at every instant in one’s
life—is so difficult that neither humans nor computers will ever come
close to finding perfect solutions.
This has two consequences: first, we expect that, most of the time,
real-world decisions will be at best halfway decent and certainly far
from optimal; second, we expect that a great deal of the mental architecture of humans and computers—the way their decision processes
actually operate—will be designed to overcome complexity to the extent possible—that is, to make it possible to find even halfway decent
answers despite the overwhelming complexity of the world. Finally,
we expect that the first two consequences will remain true no matter
how intelligent and powerful some future machine may be. The machine may be far more capable than us, but it will still be far from
perfectly rational.
Intelligent Computers
The development of logic by Aristotle and others made available precise rules for rational thought, but we do not know whether Aristotle
M 9780525558613_Human_TX.indd 39 8/7/19 11:21 PM
Not
e—
—that is, —that is
despite the despite th
ct that t ct that t
for
we ex e e
and and ccompu omp
w will be d ill be d
Distribution
ctabl
her in ma r in ma
nclusion. clusion.
d decision decision
now, at eve ow, at eve
ans nor com s nor com
s: first, we e s: first, we
e at best h e at best
ect ect

---

## [Sección 21] Chapter 5, I spell out some far worse outcomes.

-- 53 of 352 --

40 H U M A N C O M PAT I B L E
ever contemplated the possibility of machines that implemented these
rules. In the thirteenth century, the influential Catalan philosopher,
seducer, and mystic Ramon Llull came much closer: he actually made
paper wheels inscribed with symbols, by means of which he could
generate logical combinations of assertions. The great seventeenthcentury French mathematician Blaise Pascal was the first to develop a
real and practical mechanical calculator. Although it could only add
and subtract and was used mainly in his father’s tax-collecting office,
it led Pascal to write, “The arithmetical machine produces effects
which appear nearer to thought than all the actions of animals.”
Technology took a dramatic leap forward in the nineteenth century when the British mathematician and inventor Charles Babbage
designed the Analytical Engine, a programmable universal machine in
the sense defined later by Turing. He was helped in his work by Ada,
Countess of Lovelace, daughter of the romantic poet and adventurer
Lord Byron. Whereas Babbage hoped to use the Analytical Engine
to compute accurate mathematical and astronomical tables, Lovelace
understood its true potential,41 describing it in 1842 as “a thinking
or . . . a reasoning machine” that could reason about “all subjects in the
universe.” So, the basic conceptual elements for creating AI were in
place! From that point, surely, AI would be just a matter of time. . . .
A long time, unfortunately—the Analytical Engine was never
built, and Lovelace’s ideas were largely forgotten. With Turing’s theoretical work in 1936 and the subsequent impetus of World War II,
universal computing machines were finally realized in the 1940s.
Thoughts about creating intelligence followed immediately. Turing’s
1950 paper, “Computing Machinery and Intelligence,” 42 is the best
known of many early works on the possibility of intelligent machines.
Skeptics were already asserting that machines would never be able to
do X, for almost any X you could think of, and Turing refuted those
assertions. He also proposed an operational test for intelligence, called
the imitation game, which subsequently (in simplified form) became
known as the Turing test. The test measures the behavior of the
9780525558613_Human_TX.indd 40 8/7/19 11:21 PM
Not
po p
me, e, uunfo nfo
Lovelace’s Lovelace’s
rk in 19 rk in 1
for
ine” th e t
asic concep asic conce
nt, sure nt, sure
Distribution
anim
he ninetee ninetee
ntor Charl ntor Charl
able univer e unive
s helped in helped in
e romantic romantic
oped to us ed to us
atical and as tical and
al, al,414 descr descr
t co t co

-- 54 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 41
machine—specifically, its ability to fool a human interrogator into
thinking that it is human.
The imitation game serves a specific role in Turing’s paper—namely
as a thought experiment to deflect skeptics who supposed that machines could not think in the right way, for the right reasons, with the
right kind of awareness. Turing hoped to redirect the argument towards the issue of whether a machine could behave in a certain way;
and if it did—if it was able, say, to discourse sensibly on Shakespeare’s
sonnets and their meanings—then skepticism about AI could not
really be sustained. Contrary to common interpretations, I doubt that
the test was intended as a true definition of intelligence, in the sense
that a machine is intelligent if and only if it passes the Turing test.
Indeed, Turing wrote, “May not machines carry out something which
ought to be described as thinking but which is very different from
what a man does?” Another reason not to view the test as a definition
for AI is that it’s a terrible definition to work with. And for that reason, mainstream AI researchers have expended almost no effort to
pass the Turing test.
The Turing test is not useful for AI because it’s an informal and
highly contingent definition: it depends on the enormously complicated and largely unknown characteristics of the human mind,
which derive from both biology and culture. There is no way to “unpack” the definition and work back from it to create machines that
will provably pass the test. Instead, AI has focused on rational behavior, just as described previously: a machine is intelligent to the extent
that what it does is likely to achieve what it wants, given what it has
perceived.
Initially, like Aristotle, AI researchers identified “what it wants”
with a goal that is either satisfied or not. These goals could be in toy
worlds like the 15-puzzle, where the goal is to get all the numbered
tiles lined up in order from 1 to 15 in a little (simulated) square tray;
or they might be in real, physical environments: in the early 1970s, the
Shakey robot at SRI in California was pushing large blocks into
M 9780525558613_Human_TX.indd 41 8/7/19 11:21 PM
Not
rge g
e from bo rom bo
e definition e definitio
ably pas ably pa
for
not us t u
definition: definition
y unkn y unkn
h
Distribution
ons,,
igence, in ence, in
passes the passes the
carry out so y out so
which is v which is v
ot to view to view
tion to wor n to wo
hers have ex ers have
eful eful

---

## [Sección 22] Chapter 5, I spell out some far worse outcomes.

-- 55 of 352 --

42 H U M A N C O M PAT I B L E
desired configurations, and Freddy at the University of Edinburgh was
assembling a wooden boat from its component pieces. All this work
was done using logical problem-solvers and planning systems to construct and execute guaranteed plans to achieve goals.43
By the 1980s, it was clear that logical reasoning alone could not
suffice, because, as noted previously, there is no plan that is guaranteed
to get you to the airport. Logic requires certainty, and the real world
simply doesn’t provide it. Meanwhile, the Israeli-American computer
scientist Judea Pearl, who went on to win the 2011 Turing Award, had
been working on methods for uncertain reasoning based in probability
theory.44 AI researchers gradually accepted Pearl’s ideas; they adopted
the tools of probability theory and utility theory and thereby connected AI to other fields such as statistics, control theory, economics,
and operations research. This change marked the beginning of what
some observers call modern AI.
Agents and environments
The central concept of modern AI is the intelligent agent—
something that perceives and acts. The agent is a process occurring
over time, in the sense that a stream of perceptual inputs is converted
into a stream of actions. For example, suppose the agent in question is
a self-driving taxi taking me to the airport. Its inputs might include
eight RGB cameras operating at thirty frames per second; each frame
consists of perhaps 7.5 million pixels, each with an image intensity
value in each of three color channels, for a total of more than five gigabytes per second. (The flow of data from the two hundred million
photoreceptors in the retina is even larger, which partially explains
why vision occupies such a large fraction of the human brain.) The
taxi also gets data from an accelerometer one hundred times per second, as well as GPS data. This incredible flood of raw data is transformed by the simply gargantuan computing power of billions of
transistors (or neurons) into smooth, competent driving behavior. The
9780525558613_Human_TX.indd 42 8/7/19 11:21 PM
Not
sen se
of actions action
ing taxi tak ing taxi ta
camera camer
for
pt of of
ceives and eives and
se that se that
Distribution
d in pp
deas; they as; they
ory and th ory and th
ontrol theo rol theo
arked the b rked the b
ments ments
mod mod

-- 56 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 43
taxi’s actions include the electronic signals sent to the steering wheel,
brakes, and accelerator, twenty times per second. (For an experienced
human driver, most of this maelstrom of activity is unconscious: you
may be aware only of making decisions such as “overtake this slow
truck” or “stop for gas,” but your eyes, brain, nerves, and muscles are
still doing all the other stuff.) For a chess program, the inputs are
mostly just the clock ticks, with the occasional notification of the opponent’s move and the new board state, while the actions are mostly
doing nothing while the program is thinking, and occasionally choosing a move and notifying the opponent. For a personal digital assistant, or PDA, such as Siri or Cortana, the inputs include not just the
acoustic signal from the microphone (sampled forty-eight thousand
times per second) and input from the touch screen but also the content of each Web page that it accesses, while the actions include both
speaking and displaying material on the screen.
The way we build intelligent agents depends on the nature of the
problem we face. This, in turn, depends on three things: first, the
nature of the environment the agent will operate in—a chessboard is
a very different place from a crowded freeway or a mobile phone; second, the observations and actions that connect the agent to the
environment—for example, Siri might or might not have access to the
phone’s camera so that it can see; and third, the agent’s objective—
teaching the opponent to play better chess is a very different task from
winning the game.
To give just one example of how the design of the agent depends
on these things: If the objective is to win the game, a chess program
need consider only the current board state and does not need any
memory of past events.45 The chess tutor, on the other hand, should
continually update its model of which aspects of chess the pupil does
or does not understand so that it can provide useful advice. In other
words, for the chess tutor, the pupil’s mind is a relevant part of the
environment. Moreover, unlike the board, it is a part of the environment that is not directly observable.
M 9780525558613_Human_TX.indd 43 8/7/19 11:21 PM
Not
or o
era so th a so th
the oppone the oppon
the gam the gam
for
rom a m
ions and a ons and
example xample
Distribution
nal d
include no clude no
dd fforty- orty- ff eeigh ig
h screen bu creen b
while the ac while the ac
the screen. e screen
agents dep gents dep
urn, depend urn, depen
the agent the agent
row row

---

## [Sección 23] Chapter 5, I spell out some far worse outcomes.

-- 57 of 352 --

44 H U M A N C O M PAT I B L E
The characteristics of problems that influence the design of agents
include at least the following:46
• whether the environment is fully observable (as in chess, where
the inputs provide direct access to all the relevant aspects of
the current state of the environment) or partially observable
(as in driving, where one’s field of view is limited, vehicles are
opaque, and other drivers’ intentions are mysterious);
• whether the environment and actions are discrete (as in chess)
or effectively continuous (as in driving);
• whether the environment contains other agents (as in chess
and driving) or not (as in finding the shortest routes on a map);
• whether the outcomes of actions, as specified by the “rules” or
“physics” of the environment, are predictable (as in chess) or
unpredictable (as in traffic and weather), and whether those
rules are known or unknown;
• whether the environment is dynamically changing, so that the
time to make decisions is tightly constrained (as in driving) or
not (as in tax strategy optimization);
• the length of the horizon over which decision quality is measured according to the objective—this may be very short (as in
emergency braking), of intermediate duration (as in chess,
where a game lasts up to about one hundred moves), or very
long (as in driving me to the airport, which might take hundreds of thousands of decision cycles if the taxi is deciding one
hundred times per second).
As one can imagine, these characteristics give rise to a bewildering
variety of problem types. Just multiplying the choices listed above gives
192 types. One can find real-world problem instances for all the types.
Some types are typically studied in areas outside AI—for example,
designing an autopilot that maintains level flight is a short-horizon,
9780525558613_Human_TX.indd 44 8/7/19 11:21 PM
Not
rdi rd
ency brak cy brak
ere a game ere a game
g (as in g (as in
f
for
tegy op gy
the horizon the horizo
ng to the g to the
Distribution
nts (as in s (as in
st routes on t routes o
ecified by th ed by t
predictable redictable
weather), a eather),
n;
t is dynamic t is dynam
s is tightly s is tightly
timi timi

-- 58 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 45
continuous, dynamic problem that is usually studied in the field of control theory.
Obviously some problem types are easier than others. AI has made
a lot of progress on problems such as board games and puzzles that are
observable, discrete, deterministic, and have known rules. For the easier problem types, AI researchers have developed fairly general and
effective algorithms and a solid theoretical understanding; often, machines exceed human performance on these kinds of problems. We
can tell that an algorithm is general because we have mathematical
proofs that it gives optimal or near-optimal results with reasonable
computational complexity across an entire class of problems, and because it works well in practice on those kinds of problems without
needing any problem-specific modifications.
Video games such as StarCraft are quite a bit harder than board
games: they involve hundreds of moving parts and time horizons of
thousands of steps, and the board is only partially visible at any given
time. At each point, a player might have a choice of at least 10 50 moves,
compared to about 10 2 in Go.47 On the other hand, the rules are
known and the world is discrete with only a few types of objects. As
of early 2019, machines are as good as some professional StarCraft
players but not yet ready to challenge the very best humans.48 More
important, it took a fair amount of problem-specific effort to reach
that point; general-purpose methods are not quite ready for StarCraft.
Problems such as running a government or teaching molecular biology are much harder. They have complex, mostly unobservable environments (the state of a whole country, or the state of a student’s
mind), far more objects and types of objects, no clear definition of
what the actions are, mostly unknown rules, a great deal of uncertainty, and very long time scales. We have ideas and off-the-shelf tools
that address each of these characteristics separately but, as yet, no
general methods that cope with all the characteristics simultaneously.
When we build AI systems for these kinds of tasks, they tend to
M 9780525558613_Human_TX.indd 45 8/7/19 11:21 PM
Not
yet y
t took a f took a
t; ggeneral- eneralems suc ems suc
for
is disc dis
hines are a hines are
ready t ready t
Distribution
with
f problem problem
s of proble s of proble
s.
quite a bit quite a bit
oving parts ing parts
d is only pa s only pa
might have a might have
Go. G 4747 On O
ete w ete w

---

## [Sección 24] Chapter 5, I spell out some far worse outcomes.

-- 59 of 352 --

46 H U M A N C O M PAT I B L E
require a great deal of problem-specific engineering and are often very
brittle.
Progress towards generality occurs when we devise methods that
are effective for harder problems within a given type or methods that
require fewer and weaker assumptions so they are applicable to more
problems. General-purpose AI would be a method that is applicable
across all problem types and works effectively for large and difficult
instances while making very few assumptions. That’s the ultimate
goal of AI research: a system that needs no problem-specific engineering and can simply be asked to teach a molecular biology class or run
a government. It would learn what it needs to learn from all the available resources, ask questions when necessary, and begin formulating
and executing plans that work.
Such a general-purpose method does not yet exist, but we are
moving closer. Perhaps surprisingly, a lot of this progress towards general AI results from research that isn’t about building scary, generalpurpose AI systems. It comes from research on tool AI or narrow AI,
meaning nice, safe, boring AI systems designed for particular problems such as playing Go or recognizing handwritten digits. Research
on this kind of AI is often thought to present no risk because it’s
problem-specific and nothing to do with general-purpose AI.
This belief results from a misunderstanding of what kind of work
goes into these systems. In fact, research on tool AI can and often does
produce progress towards general-purpose AI, particularly when it is
done by researchers with good taste attacking problems that are beyond the capabilities of current general methods. Here, good taste
means that the solution approach is not merely an ad hoc encoding of
what an intelligent person would do in such-and-such situation but an
attempt to provide the machine with the ability to figure out the solution for itself.
For example, when the AlphaGo team at Google DeepMind succeeded in creating their world-beating Go program, they did this without really working on Go. What I mean by this is that they didn’t write
9780525558613_Human_TX.indd 46 8/7/19 11:21 PM
Not
an a
f results f results f
these system these syste
rogress rogress
for
o or re or
is often th is often t
d nothin d nothin
Distribution
ogy c y
from all t om all t
and begin f nd begin f
es not yet s not yet
lot of this p t of this
isn’t about n’t about
from resear from rese
AI system AI system
cogn cogn

-- 60 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 47
a whole lot of Go-specific code saying what to do in different kinds
of Go situations. They didn’t design decision procedures that work
only for Go. Instead, they made improvements to two fairly generalpurpose techniques—lookahead search to make decisions and reinforcement learning to learn how to evaluate positions—so that they
were sufficiently effective to play Go at a superhuman level. Those
improvements are applicable to many other problems, including problems as far afield as robotics. Just to rub it in, a version of AlphaGo
called AlphaZero recently learned to trounce AlphaGo at Go, and
also to trounce Stockfish (the world’s best chess program, far better
than any human) and Elmo (the world’s best shogi program, also better than any human). AlphaZero did all this in one day.49
There was also substantial progress towards general-purpose AI in
research on recognizing handwritten digits in the 1990s. Yann LeCun’s team at AT&T Labs didn’t write special algorithms to recognize
“8” by searching for curvy lines and loops; instead, they improved on
existing neural network learning algorithms to produce convolutional
neural networks. Those networks, in turn, exhibited effective character recognition after suitable training on labeled examples. The same
algorithms can learn to recognize letters, shapes, stop signs, dogs, cats,
and police cars. Under the headline of “deep learning,” they have revolutionized speech recognition and visual object recognition. They are
also one of the key components in AlphaZero as well as in most of the
current self-driving car projects.
If you think about it, it’s hardly surprising that progress towards
general AI is going to occur in narrow-AI projects that address specific
tasks; those tasks give AI researchers something to get their teeth into.
(There’s a reason people don’t say, “Staring out the window is the
mother of invention.”) At the same time, it’s important to understand
how much progress has occurred and where the boundaries are. When
AlphaGo defeated Lee Sedol and later all the other top Go players,
many people assumed that because a machine had learned from
scratch to beat the human race at a task known to be very difficult
M 9780525558613_Human_TX.indd 47 8/7/19 11:21 PM
Not
Un U
speech rec eech re
of the key c of the key
elf- elf-driv driv
for
uitable abl
n to recogn n to recog
der the der the
Distribution
gram
i program program
one day. one day.49 4
ardss ggenera enera
digits in the igits in the
te special a special a
and loops; i d loops; i
ning algorith ning algori
works, in t works, in
train train

---

## [Sección 25] Chapter 5, I spell out some far worse outcomes.

-- 61 of 352 --

48 H U M A N C O M PAT I B L E
even for highly intelligent humans, it was the beginning of the end—
just a matter of time before AI took over. Even some skeptics may have
been convinced when AlphaZero won at chess and shogi as well as Go.
But AlphaZero has hard limitations: it works only in the class of discrete, observable, two-player games with known rules. The approach
simply won’t work at all for driving, teaching, running a government,
or taking over the world.
These sharp boundaries on machine competence mean that when
people talk about “machine IQ” increasing rapidly and threatening to
exceed human IQ, they are talking nonsense. To the extent that the
concept of IQ makes sense when applied to humans, it’s because human abilities tend to be correlated across a wide range of cognitive
activities. Trying to assign an IQ to machines is like trying to get fourlegged animals to compete in a human decathlon. True, horses can run
fast and jump high, but they have a lot of trouble with pole-vaulting
and throwing the discus.
Objectives and the standard model
Looking at an intelligent agent from the outside, what matters is
the stream of actions it generates from the stream of inputs it receives.
From the inside, the actions have to be chosen by an agent program.
Humans are born with one agent program, so to speak, and that program learns over time to act reasonably successfully across a huge
range of tasks. So far, that is not the case for AI: we don’t know how
to build one general-purpose AI program that does everything, so instead we build different types of agent programs for different types of
problems. I will need to explain at least a tiny bit about how these
different agent programs work; more detailed explanations are given
in the appendices at the end of the book for those who are interested.
(Pointers to particular appendices are given as superscripts like this A
and this. D
) The primary focus here is on how the standard model is
9780525558613_Human_TX.indd 48 8/7/19 11:21 PM
Not
ion o
ide, the a e, the a
are born wit are born w
ns over ns over
for
e s
ntelligent ag telligent a
s it gene it gene
Distribution
exte
ns, it’s bec it’s bec
ide range o de range o
s is like tryi like try
cathlon. Tr cathlon. Tr
ot of troub of troub
tandar tanda

-- 62 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 49
instantiated in these various kinds of agents—in other words, how the
objective is specified and communicated to the agent.
The simplest way to communicate an objective is in the form of a
goal. When you get into your self-driving car and touch the “home”
icon on the screen, the car takes this as its objective and proceeds to
plan and execute a route. A state of the world either satisfies the goal
(yes, I’m at home) or it doesn’t (no, I don’t live at the San Francisco
Airport). In the classical period of AI research, before uncertainty
became a primary issue in the 1980s, most AI research assumed a
world that was fully observable and deterministic, and goals made
sense as a way to specify objectives. Sometimes there is also a cost
function to evaluate solutions, so an optimal solution is one that minimizes total cost while reaching the goal. For the car, this might be
built in— perhaps the cost of a route is some fixed combination of the
time and fuel consumption—or the human might have the option of
specifying the trade-off between the two.
The key to achieving such objectives is the ability to “mentally
simulate” the effects of possible actions, sometimes called lookahead
search. Your self-driving car has an internal map, so it knows that driving east from San Francisco on the Bay Bridge gets you to Oakland.
Algorithms originating in the 1960s 50 find optimal routes by looking
ahead and searching through many possible action sequences. A These
algorithms form a ubiquitous part of modern infrastructure: they provide not just driving directions but also airline travel solutions, robotic
assembly, construction planning, and delivery logistics. With some
modifications to handle the impertinent behavior of opponents, the
same idea of lookahead applies to games such as tic-tac-toe, chess, and
Go, where the goal is to win according to the game’s particular definition of winning.
Lookahead algorithms are incredibly effective for their specific
tasks, but they are not very flexible. For example, AlphaGo “knows”
the rules of Go, but only in the sense that it has two subroutines,
M 9780525558613_Human_TX.indd 49 8/7/19 11:21 PM
Not
gina in
earching t rching t
ms form a ub ms form a u
ust driv ust driv
for
ng car h car
Francisco o Francisco
ting in t ing in t
h
Distribution
and
there is a here is a
lution is on ution is on
For the car the ca
ome fixed ome fixed
human mi uman mi
the two. e two.
h objective h objectiv
ssible actio ssible acti
as an as an

---

## [Sección 26] Chapter 5, I spell out some far worse outcomes.

-- 63 of 352 --

50 H U M A N C O M PAT I B L E
written in a traditional programming language such as C++: one subroutine generates all the possible legal moves and the other encodes
the goal, determining whether a given state is won or lost. For AlphaGo
to play a different game, someone has to rewrite all this C++ code.
Moreover, if you give it a new goal—say, visiting the exoplanet that
orbits Proxima Centauri—it will explore billions of sequences of Go
moves in a vain attempt to find a sequence that achieves the goal. It
cannot look inside the C++ code and determine the obvious: no
sequence of Go moves gets you to Proxima Centauri. AlphaGo’s
knowledge is essentially locked inside a black box.
In 1958, two years after his Dartmouth summer meeting had initiated the field of artificial intelligence, John McCarthy proposed a
much more general approach that opens up the black box: writing
general-purpose reasoning programs that can absorb knowledge on
any topic and reason with it to answer any answerable question. 51 One
particular kind of reasoning would be practical reasoning of the kind
suggested by Aristotle: “Doing actions A, B, C, . . . will achieve goal
G.” The goal could be anything at all: make sure the house is tidy before I get home, win a game of chess without losing either of your
knights, reduce my taxes by 50 percent, visit Proxima Centauri, and
so on. McCarthy’s new class of programs soon became known as
knowledge-based systems. 52
To make knowledge-based systems possible requires answering
two questions. First, how can knowledge be stored in a computer?
Second, how can a computer reason correctly with that knowledge to
draw new conclusions? Fortunately, ancient Greek philosophers—
particularly Aristotle—provided basic answers to these questions long
before the advent of computers. In fact, it seems quite likely that, had
Aristotle been given access to a computer (and some electricity, I suppose), he would have been an AI researcher. Aristotle’s answer, reiterated by McCarthy, was to use formal logic B as the basis for knowledge
and reasoning.
9780525558613_Human_TX.indd 50 8/7/19 11:21 PM
Not
y s y
sed system d system
ke kknowle nowl
ions. Fi ions. F
for
game am
taxes by 50 taxes by 5
new cla new cla
Distribution
er meeting meeting
McCarthy p McCarthy p
p the black he blac
at can abso t can abso
r any answe ny answe
d be practic be practi
g actions A, g actions A
ing at all: ing at all:
of c of c

-- 64 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 51
There are two kinds of logic that really matter in computer science. The first, called propositional or Boolean logic, was known to
the Greeks as well as to ancient Chinese and Indian philosophers. It
is the same language of AND gates, NOT gates, and so on that makes
up the circuitry of computer chips. In a very literal sense, a modern
CPU is just a very large mathematical expression—hundreds of millions of pages—written in the language of propositional logic. The
second kind of logic, and the one that McCarthy proposed to use for
AI, is called first-order logic. B The language of first-order logic is far
more expressive than propositional logic, which means that there are
things that can be expressed very easily in first-order logic that are
painful or impossible to write in propositional logic. For example, the
rules of Go take about a page in first-order logic but millions of pages
in propositional logic. Similarly, we can easily express knowledge
about chess, British citizenship, tax law, buying and selling, moving,
painting, cooking, and many other aspects of our commonsense world.
In principle, then, the ability to reason with first-order logic gets
us a long way towards general-purpose intelligence. In 1930, the brilliant Austrian logician Kurt Gödel had published his famous completeness theorem, 53 proving that there is an algorithm with the following
property:54
For any collection of knowledge and any question expressible in firstorder logic, the algorithm will tell us the answer to the question if
there is one.
This is a pretty incredible guarantee. It means, for example, that
we can tell the system the rules of Go and it will tell us (if we wait
long enough) whether there is an opening move that wins the game.
We can tell it facts about local geography, and it will tell us the way to
the airport. We can tell it facts about geometry and motion and utensils, and it will tell the robot how to lay the table for dinner. More
M 9780525558613_Human_TX.indd 51 8/7/19 11:21 PM
Notny collection ny collection
logic, th logic, th
for
Kurt G urt
ving that th ving that t
Distribution
ns th
order logic der logi
logic. For e ogic. For e
logic but m ic but m
an easily e an easily e
law, buyin w, buyin
r aspects of aspects of
lity to reas lity to rea
ral- ral purpo urpo
öde öde

---

## [Sección 27] Chapter 5, I spell out some far worse outcomes.

-- 65 of 352 --

52 H U M A N C O M PAT I B L E
generally, given any achievable goal and sufficient knowledge of the
effects of its actions, an agent can use the algorithm to construct a
plan that it can execute to achieve the goal.
It must be said that Gödel did not actually provide an algorithm;
he merely proved that one existed. In the early 1960s, real algorithms
for logical reasoning began to appear, 55 and McCarthy’s dream of generally intelligent systems based on logic seemed within reach. The
first major mobile robot project in the world, SRI’s Shakey project,
was based on logical reasoning (see figure 4). Shakey received a goal
from its human designers, used vision algorithms to create logical assertions describing the current situation, performed logical inference
to derive a guaranteed plan to achieve the goal, and then executed the
plan. Shakey was “living” proof that Aristotle’s analysis of human cognition and action was at least partially correct.
Unfortunately, Aristotle’s (and McCarthy’s) analysis was far from
being completely correct. The main problem is ignorance—not, I
FIGURE  6KDNH\ WKH URERW
FLUFD  ,Q WKH EDFNJURXQG
are some of the objects that
6KDNH\ SXVKHG DURXQG LQ LWV
suite of rooms.
9780525558613_Human_TX.indd 52 8/7/19 11:21 PM
Not
id t d
oved that ed that
reasoning b reasoning
lligent lligent
for
n agen age
ute to achi ute to ach
hat Göd hat Göd
Distribution
ble goal a ble goal a
can can

-- 66 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 53
hasten to add, on the part of Aristotle or McCarthy, but on the part of
all humans and machines, present and future. Very little of our knowledge is absolutely certain. In particular, we don’t know very much
about the future. Ignorance is just an insuperable problem for a purely
logical system. If I ask, “Will I get to the airport on time, if I leave
three hours before my flight?” or “Can I obtain a house by buying a
winning lottery ticket and then buying the house with the proceeds?”
the correct answer will be, in each case, “I don’t know.” The reason is
that, for each question, both yes and no are logically possible. As a
practical matter, one can never be absolutely certain of any empirical
question unless the answer is already known. 56 Fortunately, certainty
is completely unnecessary for action: we just need to know which action is best, not which action is certain to succeed.
Uncertainty means that the “purpose put into the machine” cannot, in general, be a precisely delineated goal, to be achieved at all
costs. There is no longer such a thing as a “sequence of actions that
achieves the goal,” because any sequence of actions will have multiple
possible outcomes, some of which won’t achieve the goal. The likelihood of success really matters: leaving for the airport three hours in
advance of your flight may mean that you won’t miss the flight and
buying a lottery ticket may mean that you’ll win enough to buy a new
house, but these are very different mays. Goals cannot be rescued by
looking for plans that maximize the probability of achieving the goal.
A plan that maximizes the probability of getting to the airport in time
to catch a flight might involve leaving home days in advance, organizing an armed escort, lining up many alternative means of transport in
case the others break down, and so on. Inevitably, one must take into
account the relative desirabilities of different outcomes as well as their
likelihoods.
Instead of a goal, then, we could use a utility function to describe
the desirability of different outcomes or sequences of states. Often,
the utility of a sequence of states is expressed as a sum of rewards for
each of the states in the sequence. Given a purpose defined by a utility
M 9780525558613_Human_TX.indd 53 8/7/19 11:21 PM
Not
tic t
hese are v se are v
or plans tha or plans th
at maxi at max
for
matte att
ght ght may may m m yy
ket ket may may
Distribution
of an
rtunately, unately,
eed to know eed to kno
ucceed. eed.
se put into e put into
neated goal, ted goal
thing as a hing as a
ny sequence ny sequenc
f which w f which w
s: le s: le

---

## [Sección 28] Chapter 5, I spell out some far worse outcomes.

-- 67 of 352 --

54 H U M A N C O M PAT I B L E
or reward function, the machine aims to produce behavior that maximizes its expected utility or expected sum of rewards, averaged over
the possible outcomes weighted by their probabilities. Modern AI is
partly a rebooting of McCarthy’s dream, except with utilities and
probabilities instead of goals and logic.
Pierre-Simon Laplace, the great French mathematician, wrote in
1814, “The theory of probabilities is just common sense reduced to
calculus.” 57 It was not until the 1980s, however, that a practical formal
language and reasoning algorithms were developed for probabilistic
knowledge. This was the language of Bayesian networks,C introduced
by Judea Pearl. Roughly speaking, Bayesian networks are the probabilistic cousins of propositional logic. There are also probabilistic cousins of first-order logic, including Bayesian logic 58 and a wide variety of
probabilistic programming languages.
Bayesian networks and Bayesian logic are named after the Reverend Thomas Bayes, a British clergyman whose lasting contribution to
modern thought—now known as Bayes’ theorem—was published in
1763, shortly after his death, by his friend Richard Price. 59 In its modern form, as suggested by Laplace, the theorem describes in a very
simple way how a prior probability—the initial degree of belief one
has in a set of possible hypotheses—becomes a posterior probability as
a result of observing some evidence. As more new evidence arrives,
the posterior becomes the new prior and the process of Bayesian updating repeats ad infinitum. This process is so fundamental that the
modern idea of rationality as maximization of expected utility is
sometimes called Bayesian rationality. It assumes that a rational agent
has access to a posterior probability distribution over possible current
states of the world, as well as over hypotheses about the future, based
on all its past experience.
Researchers in operations research, control theory, and AI have
also developed a variety of algorithms for decision making under uncertainty, some dating back to the 1950s. These so-called “dynamic
programming” algorithms are the probabilistic cousins of lookahead
9780525558613_Human_TX.indd 54 8/7/19 11:21 PM
Not
ssib s
bserving s rving s
rior become rior becom
eats ad eats ad
for
by La y L
prior rior pr probab oba
lee hhypot ypo
Distribution
ks,C
ks are the are the
lso probabi so probabi
gic588 and a w and a
ogic are na ic are na
yman whos man whos
as as Bayes’ Bayes
by his fri by his fr
place place

-- 68 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 55
search and planning and can generate optimal or near-optimal behavior for all sorts of practical problems in finance, logistics, transportation, and so on, where uncertainty plays a significant role.C The
purpose is put into these machines in the form of a reward function,
and the output is a policy that specifies an action for every possible
state the agent could get itself into.
For complex problems such as backgammon and Go, where the
number of states is enormous and the reward comes only at the end of
the game, lookahead search won’t work. Instead, AI researchers have
developed a method called reinforcement learning, or RL for short. RL
algorithms learn from direct experience of reward signals in the environment, much as a baby learns to stand up from the positive reward
of being upright and the negative reward of falling over. As with dynamic programming algorithms, the purpose put into an RL algorithm
is the reward function, and the algorithm learns an estimator for the
value of states (or sometimes the value of actions). This estimator can
be combined with relatively myopic lookahead search to generate
highly competent behavior.
The first successful reinforcement learning system was Arthur
Samuel’s checkers program, which created a sensation when it was
demonstrated on television in 1956. The program learned essentially
from scratch, by playing against itself and observing the rewards of
winning and losing. 60 In 1992, Gerry Tesauro applied the same idea to
the game of backgammon, achieving world-champion-level play after
1,500,000 games. 61 Beginning in 2016, DeepMind’s AlphaGo and its
descendants used reinforcement learning and self-play to defeat the
best human players at Go, chess, and shogi.
Reinforcement learning algorithms can also learn how to select
actions based on raw perceptual input. For example, DeepMind’s
DQN system learned to play forty-nine different Atari video games
entirely from scratch—including Pong, Freeway, and Space Invaders. 62
It used only the screen pixels as input and the game score as a reward
signal. In most of the games, DQN learned to play better than a
M 9780525558613_Human_TX.indd 55 8/7/19 11:21 PM
Not
n t n
h, by play by play
and losing. and losing 6
of back of bac
for
ul rein rei
program, w program,
elevision levision
Distribution
RL fo
d signals in ignals in
om the pos m the pos
of falling ov lling ov
pose put in pose put in
rithm learn hm learn
value of ac alue of ac
myopic lo myopic
orce orce

---

## [Sección 29] Chapter 5, I spell out some far worse outcomes.

-- 69 of 352 --

56 H U M A N C O M PAT I B L E
professional human player—despite the fact that DQN has no a priori
notion of time, space, objects, motion, velocity, or shooting. It is quite
hard to work out what DQN is actually doing, besides winning.
If a newborn baby learned to play dozens of video games at superhuman levels on its first day of life, or became world champion at Go,
chess, and shogi, we might suspect demonic possession or alien intervention. Remember, however, that all these tasks are much simpler
than the real world: they are fully observable, they involve short time
horizons, and they have relatively small state spaces and simple, predictable rules. Relaxing any of these conditions means that the standard methods will fail.
Current research, on the other hand, is aimed precisely at going
beyond standard methods so that AI systems can operate in larger
classes of environments. On the day I wrote the preceding paragraph,
for example, OpenAI announced that its team of five AI programs
had learned to beat experienced human teams at the game Dota 2.
(For the uninitiated, who include me: Dota 2 is an updated version of
Defense of the Ancients, a real-time strategy game in the Warcraft family; it is currently the most lucrative and competitive e-sport, with
prizes in the millions of dollars.) Dota 2 involves communication,
teamwork, and quasi-continuous time and space. Games last for tens
of thousands of time steps, and some degree of hierarchical organization of behavior seems to be essential. Bill Gates described the announcement as “a huge milestone in advancing artificial intelligence.” 63
A few months later, an updated version of the program defeated the
world’s top professional Dota 2 team. 64
Games such as Go and Dota 2 are a good testing ground for reinforcement learning methods because the reward function comes with
the rules of the game. The real world is less convenient, however, and
there have been dozens of cases in which faulty definitions of rewards
led to weird and unanticipated behaviors. 65 Some are innocuous, like
the simulated evolution system that was supposed to evolve fastmoving creatures but in fact produced creatures that were enormously
9780525558613_Human_TX.indd 56 8/7/19 11:21 PM
Not
ua u
of time st time st
havior seem avior see
nt as “a nt as “a
for
most l ost
ons of dolla ns of dol
i-ccontin ontin
Distribution
s tha
med precise ed precise
ms can op can op
ote the pre ote the pre
at its team its team
human tea uman tea
ude me: Do ude me: D
--ttime stra ime stra
crat crat

-- 70 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 57
tall and moved fast by falling over. 66 Others are less innocuous, like
the social-media click-through optimizers that seem to be making a
fine mess of our world.
The final category of agent program I will consider is the simplest:
programs that connect perception directly to action, without any
intermediate deliberation or reasoning. In AI, we call this kind of program a reflex agent—a reference to the low-level neural reflexes exhibited by humans and animals, which are not mediated by thought. 67
For example, the human blinking reflex connects the outputs of lowlevel processing circuits in the visual system directly to the motor area
that controls the eyelids, so that any rapidly looming region in the visual field causes a hard blink. You can test it now by trying (not too
hard) to poke yourself in the eye with your finger. We can think of
this reflex system as a simple “rule” of the following form:
if <rapidly looming region in visual field> then <blink>.
The blinking reflex does not “know what it’s doing”: the objective
(of shielding the eyeball from foreign objects) is nowhere represented;
the knowledge (that a rapidly looming region corresponds to an object
approaching the eye, and that an object approaching the eye might
damage it) is nowhere represented. Thus, when the non-reflex part of
you wants to put in eye drops, the reflex part still blinks.
Another familiar reflex is emergency braking—when the car in
front stops unexpectedly or a pedestrian steps into the road. Quickly
deciding whether braking is required is not easy: when a test vehicle in
autonomous mode killed a pedestrian in 2018, Uber explained that
“emergency braking maneuvers are not enabled while the vehicle is
under computer control, to reduce the potential for erratic vehicle behavior.” 68 Here, the human designer’s objective is clear—don’t kill
pedestrians—but the agent’s policy (had it been activated) implements
it incorrectly. Again, the objective is not represented in the agent: no
autonomous vehicle today knows that people don’t like to be killed.
M 9780525558613_Human_TX.indd 57 8/7/19 11:21 PM
Not
e e
s nowhere owhere
ts to put in ts to put in
her fam her fam
for
ll from fro
t a rapidly l t a rapidly
ye, and e, and
Distribution
o the
ing region g region
now by try now by try
ur finger. W inger. W
he followin he followin
in visual field visual fie
s not “kno s not “kn
fore fore

---

## [Sección 30] Chapter 5, I spell out some far worse outcomes.

-- 71 of 352 --

58 H U M A N C O M PAT I B L E
Reflex actions also play a role in more routine tasks such as staying
in lane: as the car drifts ever so slightly out of the ideal lane position,
a simple feedback control system can nudge the steering wheel in the
opposite direction to correct the drift. The size of the nudge would
depend on how far the car drifted. These kinds of control systems are
usually designed to minimize the square of the tracking error added
up over time. The designer derives a feedback control law that, under
certain assumptions about speed and road curvature, approximately
implements this minimization. 69 A similar system is operating all the
time while you are standing up; if it were to stop working, you’d fall
over within a few seconds. As with the blinking reflex, it’s quite hard
to turn this mechanism off and allow yourself to fall over.
Reflex agents, then, implement a designer’s objective, but do not
know what the objective is or why they are acting in a certain way.
This means they cannot really make decisions for themselves; someone else, typically the human designer or perhaps the process of biological evolution, has to decide everything in advance. It is very hard
to create a good reflex agent by manual programming except for very
simple tasks such as tic-tac-toe or emergency braking. Even in those
cases, the reflex agent is extremely inflexible and cannot change its
behavior when circumstances indicate that the implemented policy is
no longer appropriate.
One possible way to create more powerful reflex agents is through
a process of learning from examples. D Rather than specifying a rule
for how to behave, or supplying a reward function or a goal, a human
can supply examples of decision problems along with the correct decision to make in each case. For example, we can create a French-toEnglish translation agent by supplying examples of French sentences
along with the correct English translations. (Fortunately, the Canadian and EU parliaments generate millions of such examples every
year.) Then a supervised learning algorithm processes the examples
to produce a complex rule that takes any French sentence as input
9780525558613_Human_TX.indd 58 8/7/19 11:21 PM
Not
ircu rc
ropriate. priate.
ossible way ossible way
of learn of learn
hh
for
tac- c-t
ent is extre nt is extr
mstanc mstanc
Distribution
kingg
flex, it’s qu x, it’s qu
o fall over. o fall over
er’s objecti object
are acting are acting
decisions f ecisions f
igner or per ner or pe
e everythin e everythi
by manua by manu
e or e or

-- 72 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 59
and produces an English translation. The current champion learning
algorithm for machine translation is a form of so-called deep learning,
and it produces a rule in the form of an artificial neural network with
hundreds of layers and millions of parameters. D Other deep learning
algorithms have turned out to be very good at classifying the objects
in images and recognizing the words in a speech signal. Machine translation, speech recognition, and visual object recognition are three of
the most important subfields in AI, which is why there has been so
much excitement about the prospects for deep learning.
One can argue almost endlessly about whether deep learning will
lead directly to human-level AI. My own view, which I will explain
later, is that it falls far short of what is needed, D but for now let’s focus
on how such methods fit into the standard model of AI, where an algorithm optimizes a fixed objective. For deep learning, or indeed for
any supervised learning algorithm, the “purpose put into the machine”
is usually to maximize predictive accuracy—or, equivalently, to minimize error. That much seems obvious, but there are actually two
ways to understand it, depending on the role that the learned rule is
going to play in the overall system. The first role is a purely perceptual
role: the network processes the sensory input and provides information to the rest of the system in the form of probability estimates for
what it’s perceiving. If it’s an object recognition algorithm, maybe it
says “70 percent probability it’s a Norfolk terrier, 30 percent it’s a Norwich terrier.” 70 The rest of the system decides on an external action to
take based on this information. This purely perceptual objective is
unproblematic in the following sense: even a “safe” superintelligent AI
system, as opposed to an “unsafe” one based on the standard model,
needs to have its perception system as accurate and well calibrated as
possible.
The problem comes when we move from a purely perceptual role
to a decision-making role. For example, a trained network for recognizing objects might automatically generate labels for images on a
M 9780525558613_Human_TX.indd 59 8/7/19 11:21 PM
Not
of of
rceiving. I eiving.
percent pro percent pro
ier.” ier.”7070 T T
for
erall sy ll s
processes th rocesses t
he syste he syste
f
Distribution
eep l p
which I wi ich I wi
but for now but for no
model of A del of A
r deep lear r deep lear
he “purpose “purpose
e accuracy— ccuracy
ms obvious ms obviou
ending on ending on
tem tem

---

## [Sección 31] Chapter 5, I spell out some far worse outcomes.

-- 73 of 352 --

60 H U M A N C O M PAT I B L E
Web site or social-media account. Posting those labels is an action
with consequences. Each labeling action requires an actual classification decision, and unless every decision is guaranteed to be perfect,
the human designer must supply a loss function that spells out the cost
of misclassifying an object of type A as an object of type B. And that’s
how Google had an unfortunate problem with gorillas. In 2015, a software engineer named Jacky Alciné complained on Twitter that the
Google Photos image-labeling service had labeled him and his friend
as gorillas.71 While it is unclear how exactly this error occurred, it is
almost certain that Google’s machine learning algorithm was designed
to minimize a fixed, definite loss function—moreover, one that assigned equal cost to any error. In other words, it assumed that the cost
of misclassifying a person as a gorilla was the same as the cost of misclassifying a Norfolk terrier as a Norwich terrier. Clearly, this is not
Google’s (or their users’) true loss function, as was illustrated by the
public relations disaster that ensued.
Since there are thousands of possible image labels, there are millions of potentially distinct costs associated with misclassifying one
category as another. Even if it had tried, Google would have found it
very difficult to specify all these numbers up front. Instead, the right
thing to do would be to acknowledge the uncertainty about the true
misclassification costs and to design a learning and classification algorithm that was suitably sensitive to costs and uncertainty about costs.
Such an algorithm might occasionally ask the Google designer questions such as “Which is worse, misclassifying a dog as a cat or misclassifying a person as an animal?” In addition, if there is significant
uncertainty about misclassification costs, the algorithm might well
refuse to label some images.
By early 2018, it was reported that Google Photos does refuse to
classify a photo of a gorilla. Given a very clear image of a gorilla with
two babies, it says, “Hmm . . . not seeing this clearly yet.” 72
I don’t wish to suggest that AI’s adoption of the standard model
was a poor choice at the time. A great deal of brilliant work has gone
9780525558613_Human_TX.indd 60 8/7/19 11:21 PM
Not
ld b d
ion costs n costs
t was suitab t was suita
lgorithm lgorithm
for
en if it if
cify all thes cify all the
e to ack e to ack
Distribution
m wa
eover, one ver, one
assumed th assumed th
e same as th me as t
ch terrier. C h terrier. C
nction, as w tion, as
ed.
of possible of possibl
costs asso costs ass
had had

-- 74 of 352 --

I N T E L L I G E N C E I N H U M A N S A N D M A C H I N E S 61
into developing the various instantiations of the model in logical,
probabilistic, and learning systems. Many of the resulting systems are
very useful; as we will see in the next chapter, there is much more to
come. On the other hand, we cannot continue to rely on our usual
practice of ironing out the major errors in an objective function by
trial and error: machines of increasing intelligence and increasingly
global impact will not allow us that luxury.
M 9780525558613_Human_TX.indd 61 8/7/19 11:21 PM
Not
 
for Distribution

-- 75 of 352 --
HOW MIGHT AI PROGRESS
IN THE FUTURE?
The Near Future
On May 3, 1997, a chess match began between Deep Blue, a chess
computer built by IBM, and Garry Kasparov, the world chess champion and possibly the best human player in history. Newsweek billed
the match as “The Brain’s Last Stand.” On May 11, with the match
tied at 2½–2½, Deep Blue defeated Kasparov in the final game. The
media went berserk. The market capitalization of IBM increased by
$18 billion overnight. AI had, by all accounts, achieved a massive
breakthrough.
From the point of view of AI research, the match represented no
breakthrough at all. Deep Blue’s victory, impressive as it was, merely
continued a trend that had been visible for decades. The basic design
for chess-playing algorithms was laid out in 1950 by Claude Shannon,1
with major improvements in the early 1960s. After that, the chess
ratings of the best programs improved steadily, mainly as a result of
faster computers that allowed programs to look further ahead. In
1994, 2 Peter Norvig and I charted the numerical ratings of the best
9780525558613_Human_TX.indd 62 8/7/19 11:21 PM
Not
he he
½, Deep B Deep
nt berserk. nt berserk
n overn n overn
for
, and nd
he best hum e best hu
Brain’s L Brain’s L
l
Distribution
?
atch bega atch bega
Garry Garry

---

## [Sección 32] Chapter 5, I spell out some far worse outcomes.

-- 76 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 63
chess programs from 1965 onwards, on a scale where Kasparov’s rating was 2805. The ratings started at 1400 in 1965 and improved in an
almost perfect straight line for thirty years. Extrapolating the line forward from 1994 predicts that computers would be able to defeat
Kasparov in 1997—exactly when it happened.
For AI researchers, then, the real breakthroughs happened thirty
or forty years before Deep Blue burst into the public’s consciousness.
Similarly, deep convolutional networks existed, with all the mathematics fully worked out, more than twenty years before they began to
create headlines.
The view of AI breakthroughs that the public gets from the
media—stunning victories over humans, robots becoming citizens of
Saudi Arabia, and so on—bears very little relation to what really happens in the world’s research labs. Inside the lab, research involves a lot
of thinking and talking and writing mathematical formulas on whiteboards. Ideas are constantly being generated, abandoned, and rediscovered. A good idea—a real breakthrough—will often go unnoticed
at the time and may only later be understood as having provided the
basis for a substantial advance in AI, perhaps when someone reinvents
it at a more convenient time. Ideas are tried out, initially on simple
problems to show that the basic intuitions are correct and then on
harder problems to see how well they scale up. Often, an idea will fail
by itself to provide a substantial improvement in capabilities, and it
has to wait for another idea to come along so that the combination of
the two can demonstrate value.
All this activity is completely invisible from the outside. In the
world beyond the lab, AI becomes visible only when the gradual accumulation of ideas and the evidence for their validity crosses a threshold: the point where it becomes worthwhile to invest money and
engineering effort to create a new commercial product or an impressive demonstration. Then the media announce that a breakthrough
has occurred.
One can expect, then, that many other ideas that have been
M 9780525558613_Human_TX.indd 63 8/7/19 11:21 PM
Not
ow ow
ems to se ms to se
to provide to provide
ait for an ait for a
dd
for
advanc van
nient time. nient time
that the that the
Distribution
blic gets ic gets
ts becomin s becomin
elation to w tion to
the lab, res the lab, res
mathematic athemati
ng generate generate
breakthrou reakthro
ater be un ater be un
in A in A

-- 77 of 352 --

64 H U M A N C O M PAT I B L E
gestating in the world’s research labs will cross the threshold of commercial applicability over the next few years. This will happen more
and more frequently as the rate of commercial investment increases
and as the world becomes more and more receptive to applications of
AI. This chapter provides a sampling of what we can see coming down
the pipe.
Along the way, I’ll mention some of the drawbacks of these technological advances. You will probably be able to think of many more,
but don’t worry. I’ll get to those in the next chapter.
The AI ecosystem
In the beginning, the environment in which most computers operated was essentially formless and void: their only input came from
punched cards and their only method of output was to print characters on a line printer. Perhaps for this reason, most researchers viewed
intelligent machines as question-answerers; the view of machines as
agents perceiving and acting in an environment did not become widespread until the 1980s.
The advent of the World Wide Web in the 1990s opened up a
whole new universe for intelligent machines to play in. A new word,
softbot, was coined to describe software “robots” that operate entirely
in a software environment such as the Web. Softbots, or bots as they
later became known, perceive Web pages and act by emitting sequences of characters, URLs, and so on.
AI companies mushroomed during the dot-com boom (1997–
2000), providing core capabilities for search and e-commerce, including
link analysis, recommendation systems, reputation systems, comparison shopping, and product categorization.
In the early 2000s, the widespread adoption of mobile phones
with microphones, cameras, accelerometers, and GPS provided new
access for AI systems to people’s daily lives; “smart speakers” such as
9780525558613_Human_TX.indd 64 8/7/19 11:21 PM
Not
erse rs
oined to d ned to d
are environ are enviro
me kno me kno
forhe World W he World
for inte for inte
Distribution
ich most co most co
their only their only
d of output of outpu
his reason, s reason,
on-aanswere nswer
in an envi in an env

---

## [Sección 33] Chapter 5, I spell out some far worse outcomes.

-- 78 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 65
the Amazon Echo, Google Home, and Apple HomePod have completed this process.
By around 2008, the number of objects connected to the Internet
exceeded the number of people connected to the Internet—a transition that some point to as the beginning of the Internet of Things
(IoT). Those things include cars, home appliances, traffic lights, vending machines, thermostats, quadcopters, cameras, environmental sensors, robots, and all kinds of material goods both in the manufacturing
process and in the distribution and retail system. This provides AI
systems with far greater sensory and control access to the real world.
Finally, improvements in perception have allowed AI-powered
robots to move out of the factory, where they relied on rigidly constrained arrangements of objects, and into the real, unstructured,
messy world, where their cameras have something interesting to
look at.
Self-driving cars
In the late 1950s, John McCarthy imagined that an automated
vehicle might one day take him to the airport. In 1987, Ernst Dickmanns demonstrated a self-driving Mercedes van on the autobahn in
Germany; it was capable of staying in lane, following another car,
changing lanes, and overtaking. 3 More than thirty years later, we
still don’t have a fully autonomous car, but it’s getting much closer.
The focus of development has long since moved from academic research labs to large corporations. As of 2019, the best-performing test
vehicles have logged millions of miles of driving on public roads (and
billions of miles in driving simulators) without serious incident. 4 Unfortunately, other autonomous and semi-autonomous vehicles have
killed several people. 5
Why has it taken so long to achieve safe autonomous driving? The
first reason is that the performance requirements are exacting.
M 9780525558613_Human_TX.indd 65 8/7/19 11:21 PM
Not
rat r
t was cap was cap
lanes, and lanes, an
t have a t have
ff
for
John ohn
day take hi day take h
ed a d a sself elf
b
Distribution
the
lowed AI wed AI
y relied on relied on
to the real, he real
ave someth ve someth
McC McC

-- 79 of 352 --

66 H U M A N C O M PAT I B L E
Human drivers in the United States suffer roughly one fatal accident
per one hundred million miles traveled, which sets a high bar. Autonomous vehicles, to be accepted, will need to be much better than that:
perhaps one fatal accident per billion miles, or twenty-five thousand
years of driving forty hours per week. The second reason is that one
anticipated workaround—handing control to the human when the vehicle is confused or out of its safe operating conditions—simply doesn’t
work. When the car is driving itself, humans quickly become disengaged from the immediate driving circumstances and cannot regain
context quickly enough to take over safely. Moreover, nondrivers and
taxi passengers who are in the back seat are in no position to drive the
car if something goes wrong.
Current projects are aiming at SAE Level 4 autonomy, 6 which
means that the vehicle must at all times be capable of driving autonomously or stopping safely, subject to geographical limits and weather
conditions. Because weather and traffic conditions can change, and
because unusual circumstances can arise that a Level 4 vehicle cannot
handle, a human has to be in the vehicle and ready to take over if
needed. (Level 5—unrestricted autonomy—does not require a human
driver but is even more difficult to achieve.) Level 4 autonomy goes far
beyond the simple, reflex tasks of following white lines and avoiding
obstacles. The vehicle has to assess the intent and probable future
trajectories of all relevant objects, including objects that may not be
visible, based on both current and past observations. Then, using lookahead search, the vehicle has to find a trajectory that optimizes some
combination of safety and progress. Some projects are trying more
direct approaches based on reinforcement learning (mainly in simulation, of course) and supervised learning from recordings of hundreds
of human drivers, but these approaches seem unlikely to reach the
required level of safety.
The potential benefits of fully autonomous vehicles are immense.
Every year, 1.2 million people die in car accidents worldwide and tens
of millions suffer serious injuries. A reasonable target for autonomous
9780525558613_Human_TX.indd 66 8/7/19 11:21 PM
Not
le, e
e vehicle vehicle
es of all rele es of all re
sed on b sed on b
for
strict ict
ore difficult re difficu
reflex ta eflex ta
h
Distribution
nond
osition to d ition to d
evel 4 auto 4 aut
be capable o e capable
geographic ographic
traffic con affic con
can arise t can arise
in the ve in the ve
dd aauu

---

## [Sección 34] Chapter 5, I spell out some far worse outcomes.

-- 80 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 67
vehicles would be to reduce these numbers by a factor of ten. Some
analyses also predict a vast reduction in transportation costs, parking
structures, congestion, and pollution. Cities will shift from personal
cars and large buses to ubiquitous shared-ride, autonomous electric
vehicles, providing door-to-door service and feeding high-speed masstransit connections between hubs.7 With costs as low as three cents
per passenger mile, most cities would probably opt to provide the service for free—while subjecting riders to interminable barrages of
advertising.
Of course, to reap all these benefits, the industry has to pay attention to the risks. If there are too many deaths attributed to poorly
designed experimental vehicles, regulators may halt planned deployments or impose extremely stringent standards that might be unreachable for decades. 8 And people might, of course, decide not to buy
or ride in autonomous vehicles unless they are demonstrably safe. A
2018 poll revealed a significant decline in consumers’ level of trust in
autonomous vehicle technology compared to 2016. 9 Even if the technology is successful, the transition to widespread autonomy will be
an awkward one: human driving skills may atrophy or disappear, and
the reckless and antisocial act of driving a car oneself may be banned
altogether.
Intelligent personal assistants
Most readers will by now have experienced the unintelligent personal assistant: the smart speaker that obeys purchase commands
overheard on the television, or the cell phone chatbot that responds to
“Call me an ambulance!” with “OK, from now on I’ll call you ‘Ann Ambulance.’ ” Such systems are essentially voice-mediated interfaces to
applications and search engines; they are based largely on canned
stimulus–response templates, an approach that dates back to the Eliza
system in the mid-1960s.10
These early systems have shortcomings of three kinds: access,
M 9780525558613_Human_TX.indd 67 8/7/19 11:21 PM
Not
lligent p lligent p
dd
for
an driv dr
tisocial act tisocial ac
Distribution
has t
ttributed ributed
ay halt plan y halt plan
ndards that rds tha
ht, of course t, of course
ess they are they are
decline in co line in co
gy compare gy compa
ansition t ansition
ing s ing

-- 81 of 352 --

68 H U M A N C O M PAT I B L E
content, and context. Access shortcomings mean that they lack sensory
awareness of what’s going on—for example, they might be able to hear
what the user is saying but they can’t see who the user is talking to.
Content shortcomings mean that they simply fail to understand the
meaning of what the user is saying or texting, even if they have access
to it. Context shortcomings mean that they lack the ability to keep track
of and reason about the goals, activities, and relationships that constitute daily life.
Despite these shortcomings, smart speakers and cell phone assistants offer just enough value to the user to have entered the homes
and pockets of hundreds of millions of people. They are, in a sense,
Trojan horses for AI. Because they are there, embedded in so many
lives, every tiny improvement in their capabilities is worth billions of
dollars.
And so, improvements are coming thick and fast. Probably the
most important is the elementary capacity to understand content—to
know that “John’s in the hospital” is not just a prompt to say “I hope it’s
nothing serious” but contains actual information that the user’s eightyear-old son is in a nearby hospital and may have a serious injury or
illness. The ability to access email and text communications as well
as phone calls and domestic conversations (through the smart speaker
in the house) would give AI systems enough information to build a
reasonably complete picture of the user’s life—perhaps even more
information than might have been available to the butler working
for a nineteenth-century aristocratic family or the executive assistant
working for a modern-day CEO.
Raw information, of course, is not enough. To be really useful, an
assistant also needs commonsense knowledge of how the world works:
that a child in the hospital is not simultaneously at home; that hospital
care for a broken arm seldom lasts for more than a day or two; that the
child’s school will need to know of the expected absence; and so on.
Such knowledge allows the assistant to keep track of things it does not
observe directly—an essential skill for intelligent systems.
9780525558613_Human_TX.indd 68 8/7/19 11:21 PM
d d d d
would g would g
y complete y complete
on than on than
for
rby ho y h
to access em o access e
omestic omestic
Distribution
ered
hey are, in y are, in
embedded i mbedded i
ilities is wo es is w
ng thick an thick a
capacity to pacity to
al” is not ju al” is not j
actual in actual in
pita pita

---

## [Sección 35] Chapter 5, I spell out some far worse outcomes.

-- 82 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 69
The capabilities described in the preceding paragraph are, I believe, feasible with existing technology for probabilistic reasoning,C
but this would require a very substantial effort to construct models of
all the kinds of events and transactions that make up our daily lives.
Up to now, these kinds of commonsense modeling projects have generally not been undertaken (except possibly in classified systems for
intelligence analysis and military planning) because of the costs involved and the uncertain payoff. Now, however, projects like this
could easily reach hundreds of millions of users, so the investment
risks are lower and the potential rewards are much higher. Furthermore, access to large numbers of users allows the intelligent assistant
to learn very quickly and fill in all the gaps in its knowledge.
Thus, one can expect to see intelligent assistants that will, for pennies a month, help users with managing an increasingly large range of
daily activities: calendars, travel, household purchases, bill payment,
children’s homework, email and call screening, reminders, meal planning, and—one can but dream—finding my keys. These skills will not
be scattered across multiple apps. Instead, they will be facets of a
single, integrated agent that can take advantage of the synergies available in what military people call the common operational picture.
The general design template for an intelligent assistant involves
background knowledge about human activities, the ability to extract
information from streams of perceptual and textual data, and a learning process to adapt the assistant to the user’s particular circumstances. The same general template can be applied to at least three
other major areas: health, education, and finances. For these applications, the system needs to keep track of the state of the user’s body,
mind, and bank account (broadly construed). As with assistants for
daily life, the up-front cost of creating the necessary general knowledge in each of these three areas amortizes across billions of users.
In the case of health, for example, we all have roughly the same
physiology, and detailed knowledge of how it works has already been
encoded in machine-readable form.11 Systems will adapt to your
M 9780525558613_Human_TX.indd 69 8/7/19 11:21 PM
Not
de d
knowledg nowledg
ion from st ion from s
ess to a ess to a
for
t that hat
ry people c ry people
sign tem ign tem
Distribution
high g
intelligent telligent
its knowled ts knowled
ssistants th tants th
g an increas an increas
usehold pu ehold pu
call screeni ll screeni
m—ffinding indin fff
le apps. I le apps. I
an ta an t

-- 83 of 352 --

70 H U M A N C O M PAT I B L E
individual characteristics and lifestyle, providing preventive suggestions and early warning of problems.
In the area of education, the promise of intelligent tutoring systems was recognized even in the 1960s,12 but real progress has been a
long time coming. The primary reasons are shortcomings of content
and access: most tutoring systems don’t understand the content of
what they purport to teach, nor can they engage in two-way communication with their pupils through speech or text. (I imagine myself
teaching string theory, which I don’t understand, in Laotian, which I
don’t speak.) Recent progress in speech recognition means that automated tutors can, at last, communicate with pupils who are not yet
fully literate. Moreover, probabilistic reasoning technology can now
keep track of what students know and don’t know13 and can optimize
the delivery of instruction to maximize learning. The Global Learning
XPRIZE competition, which started in 2014, offered $15 million for
“open-source, scalable software that will enable children in developing countries to teach themselves basic reading, writing and arithmetic within 15 months.” Results from the winners, Kitkit School and
onebillion, suggest that the goal has largely been achieved.
In the area of personal finance, systems will keep track of investments, income streams, obligatory and discretionary expenditures,
debt, interest payments, emergency reserves, and so on, in much the
same way that financial analysts keep track of the finances and prospects of corporations. Integration with the agent that handles daily life
will provide an even finer-grained understanding, perhaps even ensuring that the children get their pocket money minus any mischiefrelated deductions. One can expect to receive the quality of day-to-day
financial advice previously reserved for the ultra-rich.
If your privacy alarm bells weren’t ringing as you read the preceding paragraphs, you haven’t been keeping up with the news. There are,
however, multiple layers to the privacy story. First, can a personal
assistant really be useful if it knows nothing about you? Probably not.
9780525558613_Human_TX.indd 70 8/7/19 11:21 PM
Not
tre tr
payment ayment
that financ that finan
orporati orporati
for
the go e g
rsonal fina rsonal fin
ams, ob ms, ob
Distribution
eans
ls who are who are
g technolog technolog
know ow1313 and an
earning. Th arning. Th
in 2014, of 2014, o
hat will ena t will ena
ves basic re ves basic r
ults from t ults from
l ha l ha

---

## [Sección 36] Chapter 5, I spell out some far worse outcomes.

-- 84 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 71
Second, can personal assistants be really useful if they cannot pool
information from multiple users to learn more about people in general
and people who are similar to you? Probably not. So, don’t those two
things imply that we have to give up our privacy to benefit from AI in
our daily lives? No. The reason is that learning algorithms can operate
on encrypted data using the techniques of secure multiparty computation, so that users can benefit from pooling without compromising
privacy in any way.14 Will software providers adopt privacy-preserving
technology voluntarily, without legislative encouragement? That remains to be seen. What seems inevitable, however, is that users will
trust a personal assistant only if its primary obligation is to the user
rather than to the corporation that produced it.
Smart homes and domestic robots
The smart home concept has been investigated for several decades.
In 1966, James Sutherland, an engineer at Westinghouse, started collecting surplus computer parts to build ECHO, the first smart-home
controller.15 Unfortunately, ECHO weighed eight hundred pounds, consumed 3.5 kilowatts, and managed just three digital clocks and the TV
antenna. Subsequent systems required users to master control interfaces
of mind-boggling complexity. Unsurprisingly, they never caught on.
Beginning in the 1990s, several ambitious projects attempted to
design houses that managed themselves with minimal human intervention, using machine learning to adapt to the lifestyles of the occupants.
To make these experiments meaningful, real people had to live in the
houses. Unfortunately, the frequency of erroneous decisions made the
systems worse than useless—the occupants’ quality of life decreased
rather than increased. For example, inhabitants of the 2003 MavHome
project16 at Washington State University often had to sit in the dark if
their visitors stayed later than the usual bedtime.17 As with the unintelligent personal assistant, such failings result from inadequate sensory
M 9780525558613_Human_TX.indd 71 8/7/19 11:21 PM
Not
uen u
gling com ng com
ning in the ning in th
uses tha uses th
for
tely, EC y, E
s, and mana s, and man
nt system t system
l
Distribution
s tha
gation is to ion is to
t.
robots obots
been invest en invest
n engineer n enginee
arts to bu arts to bu
HO HO

-- 85 of 352 --

72 H U M A N C O M PAT I B L E
access to the activities of the occupants and the inability to understand
and keep track of what’s happening in the house.
A truly smart home equipped with cameras and microphones—
and the requisite perceptual and reasoning abilities—can understand
what the occupants are doing: visiting, eating, sleeping, watching TV,
reading, exercising, getting ready for a long trip, or lying helpless on
the floor after a fall. By coordinating with the intelligent personal assistant, the home can have a pretty good idea of who will be in or out
of the house at what time, who’s eating where, and so on. This understanding allows it to manage heating, lighting, window blinds, and
security systems, to send timely reminders, and to alert users or emergency services when a problem arises. Some newly built apartment
complexes in the United States and Japan are already incorporating
technology of this kind.18
The value of the smart home is limited because of its actuators:
much simpler systems (timed thermostats and motion-sensitive lights
and burglar alarms) can deliver a lot of the same functionality in ways
that are perhaps more predictable, if less context sensitive. The smart
home cannot fold the laundry, clear the dishes, or pick up the newspaper. It really wants a physical robot to do its bidding.
FIGURE  OHIW %5(77IROGLQJWRZHOV ULJKW WKH%RVWRQ'\QDPLFV6SRW0LQL
URERWRSHQLQJDGRRU
9780525558613_Human_TX.indd 72 8/7/19 11:21 PM
t for
aundry ndr
s a physical s a physica
Distribution
ow b
alert users rt users
newly built ewly built
are already already
imited bec ited bec
rmostats an mostats an
r a lot of the r a lot of t
ctable, if le ctable, if l
clea clea

---

## [Sección 37] Chapter 5, I spell out some far worse outcomes.

-- 86 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 73
It may not have too long to wait. Already, robots have demonstrated many of the required skills. In the Berkeley lab of my colleague
Pieter Abbeel, BRETT (the Berkeley Robot for the Elimination of
Tedious Tasks) has been folding piles of towels since 2011, while the
SpotMini robot from Boston Dynamics can climb stairs and open
doors (figure 5). Several companies are already building cooking robots,
although they require special, enclosed setups and pre-cut ingredients
and won’t work in an ordinary kitchen.19
Of the three basic physical capabilities required for a useful domestic robot—perception, mobility, and dexterity—the latter is most
problematic. As Stefanie Tellex, a robotics professor at Brown University, puts it, “Most robots can’t pick up most objects most of the time.”
This is partly a problem of tactile sensing, partly a manufacturing
problem (dexterous hands are currently very expensive to build), and
partly an algorithmic problem: we don’t yet have a good understanding of how to combine sensing and control to grasp and manipulate
the huge variety of objects in a typical household. There are dozens of
grasp types just for rigid objects and there are thousands of distinct
manipulation skills, such as shaking exactly two pills out of a bottle,
peeling the label off a jam jar, spreading hard butter on soft bread,
or lifting one strand of spaghetti from the pot with a fork to see if
it’s ready.
It seems likely that the tactile sensing and hand construction problems will be solved by 3D printing, which is already being used by
Boston Dynamics for some of the more complex parts of their Atlas
humanoid robot. Robot manipulation skills are advancing rapidly,
thanks in part to deep reinforcement learning. 20 The final push—
putting all this together into something that begins to approximate the
awesome physical skills of movie robots—is likely to come from the
rather unromantic warehouse industry. Just one company, Amazon,
employs several hundred thousand people who pick products out
of bins in giant warehouses and dispatch them to customers. From
2015 through 2017 Amazon ran an annual “Picking Challenge” to
M 9780525558613_Human_TX.indd 73 8/7/19 11:21 PM
Not
tran r
ms likely th ms likely t
l be solv l be sol
for
uch as as
ff a jam ja ff a jam j
nd of sp d of sp
Distribution
he l
or at Brow at Brow
jects most o ects most
g, partly a partly a
very expen very expen
don’t yet ha n’t yet ha
and control d control
a typical ho a typical h
bjects and bjects and
haki haki

-- 87 of 352 --

74 H U M A N C O M PAT I B L E
accelerate the development of robots capable of doing this task. 21 There
is still some distance to go, but when the core research problems are
solved—probably within a decade—one can expect a very rapid rollout
of highly capable robots. Initially they will work in warehouses, then in
other commercial applications such as agriculture and construction,
where the range of tasks and objects is fairly predictable. We might also
see them quite soon in the retail sector doing tasks such as stocking
supermarket shelves and refolding clothes.
The first to really benefit from robots in the home will be the elderly and infirm, for whom a helpful robot can provide a degree of
independence that would otherwise be impossible. Even if the robot
has a limited repertoire of tasks and only rudimentary comprehension
of what’s going on, it can still be very useful. On the other hand, the
robot butler, managing the household with aplomb and anticipating its
master’s every wish, is still some way off—it requires something approaching the generality of human-level AI.
Intelligence on a global scale
The development of basic capabilities for understanding speech
and text will allow intelligent personal assistants to do things that
human assistants can already do (but they will be doing it for pennies
per month instead of thousands of dollars per month). Basic speech
and text understanding also enable machines to do things that no human can do—not because of the depth of understanding but because
of its scale. For example, a machine with basic reading capabilities will
be able to read everything the human race has ever written by lunchtime, and then it will be looking around for something else to do. 22
With speech recognition capabilities, it could listen to every radio
and television broadcast before teatime. For comparison, it would take
two hundred thousand full-time humans just to keep up with the
world’s current level of print publication (let alone all the written
9780525558613_Human_TX.indd 74 8/7/19 11:21 PM
ow ow
ants can a ts can a
h instead o h instead o
ndersta ndersta
for
glo
nt of basic t of basic
intellig intellig
Distribution
ide a
. Even if t Even if t
entary com ntary com
l. On the o n the o
h aplomb a h aplomb a
y off— ff—iit re t re
n-level AI. vel AI
bal sca bal sc

---

## [Sección 38] Chapter 5, I spell out some far worse outcomes.

-- 88 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 75
material from the past) and another sixty thousand to listen to current
broadcasts. 23
Such a system, if it could extract even simple factual assertions
and integrate all this information across all languages, would represent
an incredible resource for answering questions and revealing patterns—
probably far more powerful than search engines, which are currently
valued at around $1 trillion. Its research value for fields such as history
and sociology would be inestimable.
Of course, it would also be possible to listen to all the world’s
phone calls (a job that would require about twenty million people).
There are certain clandestine agencies that would find this valuable.
Some of them have been doing simple kinds of large-scale machine
listening, such as spotting key words in conversations, for many years,
and have now made the transition to transcribing entire conversations
into searchable text. 24 Transcriptions are certainly useful, but not
nearly as useful as simultaneous understanding and content integration of all conversations.
Another “superpower” that is available to machines is to see the entire world at once. Roughly speaking, satellites image the entire world
every day at an average resolution of around fifty centimeters per pixel.
At this resolution, every house, ship, car, cow, and tree on Earth is
visible. Well over thirty million full-time employees would be needed
to examine all these images;25 so, at present, no human ever sees the
vast majority of satellite data. Computer vision algorithms could process all this data to produce a searchable database of the whole world,
updated daily, as well as visualizations and predictive models of economic activities, changes in vegetation, migrations of animals and people, the effects of climate change, and so on. Satellite companies such
as Planet and DigitalGlobe are busy making this idea a reality.
With the possibility of sensing on a global scale comes the possibility of decision making on a global scale. For example, from global
satellite data feeds, it should be possible to create detailed models
M 9780525558613_Human_TX.indd 75 8/7/19 11:21 PM
Not
on, on
over thir ver thir
ne all these ne all thes
ority of ority of
dd
for
ghly sp ly
age resoluti age resolu
every h every h
Distribution
mill
d find this find this
of of la large- rge-ssca
versations, sations,
nscribing e nscribing e
ns are cert are cer
understan nderstan
hat is avai hat is ava
eaki eaki

-- 89 of 352 --

76 H U M A N C O M PAT I B L E
for managing the global environment, predicting the effects of environmental and economic interventions, and providing the necessary analytical inputs to the UN’s sustainable development goals. 26 We are
already seeing “smart city” control systems that aim to optimize traffic
management, transit, trash collection, road repairs, environmental
maintenance, and other functions for the benefit of citizens, and these
may be extended to the country level. Until recently, this degree of
coordination could be achieved only by huge, inefficient, bureaucratic
hierarchies of humans; inevitably, these will be replaced by megaagents that take care of more and more aspects of our collective lives.
Along with this, of course, comes the possibility of privacy invasion and
social control on a global scale, to which I return in the next chapter.
When Will Superintelligent AI Arrive?
I am often asked to predict when superintelligent AI will arrive, and I
usually refuse to answer. There are three reasons for this. First, there
is a long history of such predictions going wrong. 27 For example, in
1960, the AI pioneer and Nobel Prize–winning economist Herbert
Simon wrote, “ Technologically . . . machines will be capable, within
twenty years, of doing any work a man can do.” 28 In 1967, Marvin Minsky, a co-organizer of the 1956 Dartmouth workshop that started the
field of AI, wrote, “Within a generation, I am convinced, few compartments of intellect will remain outside the machine’s realm—the problem of creating ‘artificial intelligence’ will be substantially solved.” 29
A second reason for declining to provide a date for superintelligent
AI is that there is no clear threshold that will be crossed. Machines
already exceed human capabilities in some areas. Those areas will
broaden and deepen, and it is likely that there will be superhuman
general knowledge systems, superhuman biomedical research systems,
superhuman dexterous and agile robots, superhuman corporate planning systems, and so on well before we have a completely general
9780525558613_Human_TX.indd 76 8/7/19 11:21 PM
Not
ech ec
of doing a f doing
rganizer of rganizer o
, wrote, , wrote
ll
for
h pred pre
er and Nob er and No
nologica nologica
Distribution
colle
rivacy inva vacy inva
n in the nex in the nex
ent AI Ar nt AI A
en superint en superi
ere are th ere are th
ctio ctio

---

## [Sección 39] Chapter 5, I spell out some far worse outcomes.

-- 90 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 77
superintelligent AI system. These “partially superintelligent” systems
will, individually and collectively, begin to pose many of the same issues that a generally intelligent system would.
A third reason for not predicting the arrival of superintelligent AI
is that it is inherently unpredictable. It requires “conceptual breakthroughs,” as noted by John McCarthy in a 1977 interview. 30 McCarthy went on to say, “What you want is 1.7 Einsteins and 0.3 of the
Manhattan Project, and you want the Einsteins first. I believe it’ll
take five to 500 years.” In the next section I’ll explain what some of
the conceptual breakthroughs are likely to be. Just how unpredictable
are they? Probably as unpredictable as Szilard’s invention of the nuclear chain reaction a few hours after Rutherford’s declaration that it
was completely impossible.
Once, at a meeting of the World Economic Forum in 2015, I
answered the question of when we might see superintelligent AI. The
meeting was under Chatham House rules, which means that no remarks may be attributed to anyone present at the meeting. Even so,
out of an excess of caution, I prefaced my answer with “Strictly off the
record. . . .” I suggested that, barring intervening catastrophes, it would
probably happen in the lifetime of my children—who were still quite
young and would probably have much longer lives, thanks to advances
in medical science, than many of those at the meeting. Less than two
hours later, an article appeared in the Daily Telegraph citing Professor
Russell’s remarks, complete with images of rampaging Terminator
robots. The headline was ‘SOCIOPATHIC ’ ROBOTS COULD OVERRUN THE
HUMAN RACE WITHIN A GENERATION.
My timeline of, say, eighty years is considerably more conservative than that of the typical AI researcher. Recent surveys 31 suggest
that most active researchers expect human-level AI to arrive around the
middle of this century. Our experience with nuclear physics suggests
that it would be prudent to assume that progress could occur quite
quickly and to prepare accordingly. If just one conceptual breakthrough were needed, analogous to Szilard’s idea for a neutron-induced
M 9780525558613_Human_TX.indd 77 8/7/19 11:21 PM
Not
d p d
cience, th ence, th
er, an articl er, an artic
remark remark
for
that, b hat
n the lifetim the lifeti
robably obably
Distribution
w un
nvention o ention o
ord’s declar rd’s declar
Economic Economic
might see su ght see su
ouse rules, se rules,
anyone pres anyone pr
I prefaced I prefaced
arrin arrin

-- 91 of 352 --

78 H U M A N C O M PAT I B L E
nuclear chain reaction, superintelligent AI in some form could arrive
quite suddenly. The chances are that we would be unprepared: if we
built superintelligent machines with any degree of autonomy, we
would soon find ourselves unable to control them. I am, however,
fairly confident that we have some breathing space because there are
several major breakthroughs needed between here and superintelligence, not just one.
Conceptual Breakthroughs to Come
The problem of creating general-purpose, human-level AI is far from
solved. Solving it is not a matter of spending money on more engineers, more data, and bigger computers. Some futurists produce
charts that extrapolate the exponential growth of computing power
into the future based on Moore’s law, showing the dates when machines will become more powerful than insect brains, mouse brains,
human brains, all human brains put together, and so on. 32 These charts
are meaningless because, as I have already said, faster machines just
give you the wrong answer more quickly. If one were to collect AI’s
leading experts into a single team with unlimited resources, with the
goal of creating an integrated, human-level intelligent system by combining all our best ideas, the result would be failure. The system would
break in the real world. It wouldn’t understand what was going on; it
wouldn’t be able to predict the consequences of its actions; it wouldn’t
understand what people want in any given situation; and so it would
do ridiculously stupid things.
By understanding how the system would break, AI researchers are
able to identify the problems that have to be solved—the conceptual
breakthroughs that are needed—in order to reach human-level AI. I
will now describe some of these remaining problems. Once they are
solved, there may be more, but not very many more.
9780525558613_Human_TX.indd 78 8/7/19 11:21 PM
Not
nto nt
ng an inte an inte
our best ide our best id
he real w he real
bb
for
e, as I as
answer mo answer m
a single a single
Distribution
an- n-llevel AI evel AI
ng money money
rs. Some f rs. Some
ial growth l growth
s law, show aw, show
erful than erful than
ins put tog ins put to
have have

---

## [Sección 40] Chapter 5, I spell out some far worse outcomes.

-- 92 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 79
Language and common sense
Intelligence without knowledge is like an engine without fuel. Humans acquire a vast amount of knowledge from other humans: it is
passed down through generations in the form of language. Some of it
is factual: Obama became president in 2009, the density of copper is
8.92 grams per cubic centimeter, the code of Ur-Nammu set out punishments for various crimes, and so on. A great deal of knowledge resides in the language itself—in the concepts that it makes available.
President, 2009, density, copper, gram, centimeter, crime, and the rest all
carry with them a vast amount of information, which represents the
extracted essence of the processes of discovery and organization that
led them to be in the language in the first place.
Take, for example, copper, which refers to some collection of atoms
in the universe, and compare it to arglebarglium, which is my name for
an equally large collection of entirely randomly selected atoms in the
universe. There are many general, useful, and predictive laws one can
discover about copper—about its density, conductivity, malleability,
melting point, stellar origin, chemical compounds, practical uses, and
so on; in comparison, there is essentially nothing that can be said
about arglebarglium. An organism equipped with a language composed of words like arglebarglium would be unable to function, because it would never discover the regularities that would allow it to
model and predict its universe.
A machine that really understands human language would be in a
position to quickly acquire vast quantities of human knowledge, allowing it to bypass tens of thousands of years of learning by the more
than one hundred billion people who have lived on Earth. It seems
simply impractical to expect a machine to rediscover all this from
scratch, starting from raw sensory data.
At present, however, natural language technology is not up to
the task of reading and understanding millions of books—many of
M 9780525558613_Human_TX.indd 79 8/7/19 11:21 PM
Not
liu li
rds like a s like a
would neve would nev
d predi d predi
for
origin, gin
son, there on, there
m. An o m. An o
Distribution
, and
hich repre ch repre
y and organ and organ
place. e.
ers to some rs to some
glebarglium barglium
irely rando ely rando
eral, useful eral, usefu
out its de out its de
hem hem

-- 93 of 352 --

80 H U M A N C O M PAT I B L E
which would stump even a well-educated human. Systems such as
IBM’s Watson, which famously defeated two human champions of the
Jeopardy! quiz game in 2011, can extract simple information from
clearly stated facts but cannot build complex knowledge structures
from text; nor can they answer questions that require extensive chains
of reasoning with information from multiple sources. For example,
the task of reading all available documents up to the end of 1973 and
assessing (with explanations) the probable outcome of the Watergate
impeachment process against then president Nixon would be well beyond the current state of the art.
There are serious efforts underway to deepen the level of language
analysis and information extraction. For example, Project Aristo at
the Allen Institute for AI aims to build systems that can pass school
science exams after reading textbooks and study guides. 33 Here’s a
question from a fourth-grade test:34
Fourth graders are planning a roller-skate race. Which surface
would be the best for this race?
(A) gravel (B) sand (C) blacktop (D) grass
A machine faces at least two sources of difficulty in answering this
question. The first is the classical language-understanding problem of
working out what the sentences say: analyzing the syntactic structure,
identifying the meanings of words, and so on. (Try this for yourself:
use an online translation service to translate the sentences into an
unfamiliar language, then use a dictionary for that language to try
translating them back to English.) The second is the need for commonsense knowledge: to work out that a “roller-skate race” is probably a
race between people wearing roller skates (on their feet) rather than
a race between roller skates, to understand that the “surface” is what
the skaters will skate on rather than what the spectators will sit on, to
know what “best” means in the context of a surface for a race, and
9780525558613_Human_TX.indd 80 8/7/19 11:21 PM
Not
ces ce
e first is th irst is t
ut what the ut what th
g the m g the m
forsand nd
at least at least
Distribution
he level of level of
ple, Projec ple, Projec
tems that c s that c
and study g nd study
g a g a rroller- oller-sk
race? race?

---

## [Sección 41] Chapter 5, I spell out some far worse outcomes.

-- 94 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 81
so on. Think how the answer might change if we replaced “fourth graders” with “sadistic army boot-camp trainers.”
One way to summarize the difficulty is to say that reading requires
knowledge and knowledge (largely) comes from reading. In other
words, we face a classic chicken-and-egg situation. We might hope for
a bootstrapping process, whereby the system reads some easy text,
acquires some knowledge, uses that to read more difficult text, acquires still more knowledge, and so on. Unfortunately, what tends to
happen is the opposite: the knowledge acquired is mostly erroneous,
which causes errors in reading, which results in more erroneous knowledge, and so on.
For example, the NELL ( Never-Ending Language Learning) project at Carnegie Mellon University is probably the most ambitious
language-bootstrapping project currently underway. From 2010 to
2018, NELL acquired over 120 million beliefs by reading English text
on the Web. 35 Some of these beliefs are accurate, such as the beliefs
that the Maple Leafs play hockey and won the Stanley Cup. In addition to facts, NELL acquires new vocabulary, categories, and semantic
relationships all the time. Unfortunately, NELL has confidence in only
3 percent of its beliefs and relies on human experts to clean out false
or meaningless beliefs on a regular basis—such as its beliefs that “Nepal
is a country also known as United States” and “value is an agricultural
product that is usually cut into basis.”
I suspect that there may be no single breakthrough that turns the
downward spiral into an upward spiral. The basic bootstrapping process seems right: a program that knows enough facts can figure out
which fact a novel sentence is referring to, and thereby learns a new
textual form for expressing facts—which then lets it discover more
facts, and so the process continues. (Sergey Brin, the co-founder of
Google, published an important paper on the bootstrapping idea in
1998. 36 ) Priming the pump by supplying a good deal of manually encoded knowledge and linguistic information would certainly help.
M 9780525558613_Human_TX.indd 81 8/7/19 11:21 PM
beli e
also know o know
hat is usual hat is usua
ect that ect tha
for
me. Un U
iefs and rel efs and re
efs on a r fs on a
Distribution
rron
nguage Lea nguage Lea
bably the m ly the
tly underw ly underw
on beliefs b n beliefs b
liefs are acc fs are acc
ckey and w ckey and w
s new voc s new voc
ortu ortu

-- 95 of 352 --

82 H U M A N C O M PAT I B L E
Increasing the sophistication of the representation of facts—allowing
for complex events, causal relationships, beliefs and attitudes of others, and so on—and improving the handling of uncertainty about word
meanings and sentence meanings may eventually result in a selfreinforcing rather than self-extinguishing process of learning.
Cumulative learning of concepts and theories
Approximately 1.4 billion years ago and 8.2 sextillion miles away,
two black holes, one twelve million times the mass of the Earth and
the other ten million, came close enough to begin orbiting each other.
Gradually losing energy, they spiraled closer and closer to each other
and faster and faster, reaching an orbital frequency of 250 times per
second at a distance of 350 kilometers before finally colliding and
merging. 37 In the last few milliseconds, the rate of energy emission in
the form of gravitational waves was fifty times larger than the total
energy output of all the stars in the universe. On September 14, 2015,
those gravitational waves arrived at the Earth. They alternately expanded and compressed space itself by a factor of about one in 2.5
sextillion, equivalent to changing the distance to Proxima Centauri
(4.4 light years) by the width of a human hair.
Fortunately, two days earlier, the Advanced LIGO (Laser Interferometer Gravitational-Wave Observatory) detectors in Washington
and Louisiana had been switched on. Using laser interferometry, they
were able to measure the minuscule distortion of space; using calculations based on Einstein’s theory of general relativity, the LIGO researchers had predicted—and were therefore looking for—the exact
shape of the gravitational waveform expected from such an event. 38
This was possible because of the accumulation and communication of knowledge and concepts by thousands of people across centuries of observation and research. From Thales of Miletus rubbing
amber with wool and observing the static charge buildup, through
9780525558613_Human_TX.indd 82 8/7/19 11:21 PM
by t y t
ly, two da two da
ravitationa vitation
iana had iana had
for
d spac pa
nt to chang t to chan
he widt he widt
Distribution
f the
rbiting eac iting ea
d closer to d closer to
equency of ency of
before fin before fin
ds, the rate the rate
was fifty tim s fifty tim
n the univer n the univ
rived at t rived at t
itse itse

---

## [Sección 42] Chapter 5, I spell out some far worse outcomes.

-- 96 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 83
Galileo dropping rocks from the Leaning Tower of Pisa, to Newton
seeing an apple fall from a tree, and on through thousands more observations, humanity has gradually accumulated layer upon layer of
concepts, theories, and devices: mass, velocity, acceleration, force,
Newton’s laws of motion and gravitation, orbital equations, electrical
phenomena, atoms, electrons, electric fields, magnetic fields, electromagnetic waves, special relativity, general relativity, quantum mechanics, semiconductors, lasers, computers, and so on.
Now, in principle we can understand this process of discovery as a
mapping from all the sensory data ever experienced by all humans to
a very complex hypothesis about the sensory data experienced by the
LIGO scientists on September 14, 2015, as they watched their computer screens. This is the purely data-driven view of learning: data in,
hypothesis out, black box in between. If it could be done, it would be
the apotheosis of the “big data, big network” deep learning approach,
but it cannot be done. The only plausible idea we have for how intelligent entities could achieve such a stupendous feat as detecting the
merger of two black holes is that prior knowledge of physics, combined
with the observational data from their instruments, allowed the LIGO
scientists to infer the occurrence of the merger event. Moreover, this
prior knowledge was itself the result of learning with prior knowledge—
and so on, all the way back through history. Thus, we have a roughly
cumulative picture of how intelligent entities can build predictive capabilities, with knowledge as the building material.
I say roughly because, of course, science has taken a few wrong
turns over the centuries, temporarily pursuing illusory notions such as
phlogiston and the luminiferous aether. But we know for a fact that
the cumulative picture is what actually happened, in the sense that
scientists all along the way wrote down their findings and theories in
books and papers. Later scientists had access only to these forms of
explicit knowledge, and not to the original sensory experiences of earlier, long-dead generations. Because they are scientists, the members
M 9780525558613_Human_TX.indd 83 8/7/19 11:21 PM
Not
wa w
ll the way the way
ve picture o picture
, with k , with k
for
data fr ta
he occurren he occurr
s itself t itself t
b
Distribution
by al
experienc xperienc
ey watched ey watched
n view of le ew of l
f it could be it could b
network” de work” d
plausible ide usible ide
uch a stup uch a stu
s that s that prio pri
om t om t

-- 97 of 352 --

84 H U M A N C O M PAT I B L E
of the LIGO team understood that all the pieces of knowledge they
used, including Einstein’s theory of general relativity, are (and always
will be) in their probationary period and could be falsified by experiment. As it turned out, the LIGO data provided strong confirmation
for general relativity as well as further evidence that the graviton—a
hypothesized particle that mediates the force of gravity—is massless.
We are a very long way from being able to create machine learning systems that are capable of matching or exceeding the capacity
for cumulative learning and discovery exhibited by the scientific
community—or by ordinary human beings in their own lifetimes. 39
Deep learning systems D are mostly data driven: at best, we can “wire
in” some very weak forms of prior knowledge in the structure of the
network. Probabilistic programming systems C do allow for prior
knowledge in the learning process, as expressed in the structure and
vocabulary of the probabilistic knowledge base, but we do not yet have
effective methods for generating new concepts and relationships and
using them to expand such a knowledge base.
The difficulty is not one of finding hypotheses that provide a good
fit to data; deep learning systems can find hypotheses that are a good fit
to image data, and AI researchers have built symbolic learning programs able to recapitulate many historical discoveries of quantitative
scientific laws.40 Learning in an autonomous intelligent agent requires
much more than this.
First, what should be included in the “data” from which predictions are made? For example, in the LIGO experiment, the model for
predicting the amount that space stretches and shrinks when a gravitational wave arrives takes into account the masses of the colliding
black holes, the frequency of their orbits, and so on, but it doesn’t take
into account the day of the week or the occurrence of Major League
baseball games. On the other hand, a model for predicting traffic on
the San Francisco Bay Bridge takes into account the day of the week
and the occurrence of Major League baseball games but ignores the
masses and orbital frequencies of colliding black holes. Similarly,
9780525558613_Human_TX.indd 84 8/7/19 11:21 PM
Not
cap a
.40 Learn Learn
e than this than thi
what sh what sh
for
g system yste
AI research AI researc
tulate m tulate m
Distribution
wn
best, we c st, we c
n the struc n the struc
msCC do al do a
pressed in pressed in
edge base, b ge base, b
new concep w concep
nowledge b nowledge
of finding of finding
ms ca ms ca

---

## [Sección 43] Chapter 5, I spell out some far worse outcomes.

-- 98 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 85
programs that learn to recognize the types of objects in images use the
pixels as input, whereas a program that learns to estimate the value of
an antique object would also want to know what it was made of, who
made it and when, its history of usage and ownership, and so on. Why
is this? Obviously, it’s because we humans already know something
about gravitational waves, traffic, visual images, and antiques. We use
this knowledge to decide which inputs are needed for predicting a
specific output. This is called feature engineering, and doing it well requires a good understanding of the specific prediction problem.
Of course, a real intelligent machine cannot rely on human feature
engineers showing up every time there is something new to learn. It
will have to work out for itself what constitutes a reasonable hypothesis space for a learning problem. Presumably, it will do this by bringing
to bear a wide range of relevant knowledge in various forms, but at
present we have only rudimentary ideas about how to do this.41 Nelson Goodman’s Fact, Fiction, and Forecast42 —written in 1954 and perhaps one of the most important and underappreciated books on
machine learning—suggests a kind of knowledge called an overhypothesis, because it helps to define what the space of reasonable hypotheses
might be. In the case of traffic prediction, for example, the relevant
overhypothesis would be that the day of the week, time of day, local
events, recent accidents, holidays, transit delays, weather, and sunrise
and sunset times can influence traffic conditions. (Notice that you can
figure out this overhypothesis from your own background knowledge
of the world, without being a traffic expert.) An intelligent learning
system can accumulate and use knowledge of this kind to help formulate and solve new learning problems.
Second, and perhaps more important, is the cumulative generation
of new concepts such as mass, acceleration, charge, electron, and gravitational force. Without these concepts, scientists (and ordinary people) would have to interpret their universe and make predictions on
the basis of raw perceptual inputs. Instead, Newton was able to work
with concepts of mass and acceleration developed by Galileo and
M 9780525558613_Human_TX.indd 85 8/7/19 11:21 PM
Not
wo w
nt acciden acciden
et times can et times ca
t this ov t this o
for
define efin
ase of traffi se of traf
uld be t ld be t
Distribution
n hu
ing new to g new to
s a reasonab a reasonab
y, it will do will do
edge in var edge in va
deas about as about
Forecast ecast F 424
ortant and ortant and
s a kind of s a kind o
wha wha

-- 99 of 352 --

86 H U M A N C O M PAT I B L E
others; Rutherford could determine that the atom was composed of a
dense, positively charged nucleus surrounded by electrons because the
concept of an electron had already been developed (by numerous researchers in small steps) in the late nineteenth century; indeed, all
scientific discoveries rely on layer upon layer of concepts that stretch
back through time and human experience.
In the philosophy of science, particularly in the early twentieth
century, it was not uncommon to see the discovery of new concepts
attributed to the three ineffable I’s: intuition, insight, and inspiration.
All these were considered resistant to any rational or algorithmic explanation. AI researchers, including Herbert Simon,43 have objected
strongly to this view. Put simply, if a machine learning algorithm can
search in a space of hypotheses that includes the possibility of adding
definitions for new terms not present in the input, then the algorithm
can discover new concepts.
For example, suppose that a robot is trying to learn the rules of
backgammon by watching people playing the game. It observes how
they roll the dice and notices that sometimes players move three or
four pieces rather than one or two and that this happens after a roll of
1-1, 2-2, 3-3, 4- 4, 5-5, or 6- 6. If the program can add a new concept
of doubles, defined by equality between the two dice, it can express
the same predictive theory much more concisely. It is a straightforward process, using methods such as inductive logic programming,44
to create programs that propose new concepts and definitions in order
to identify theories that are both accurate and concise.
At present, we know how to do this for relatively simple cases, but
for more complex theories the number of possible new concepts that
could be introduced becomes simply enormous. This makes the recent
success of deep learning methods in computer vision all the more intriguing. The deep networks usually succeed in finding useful intermediate features such as eyes, legs, stripes, and corners, even though
they are using very simple learning algorithms. If we can understand
better how this happens, we can apply the same approach to learning
9780525558613_Human_TX.indd 86 8/7/19 11:21 PM
Not
edd
edictive t ictive t
rocess, usin rocess, usin
program program
for
one or e o
55, or 6 or 6-66
by equa y equa
h
Distribution
algor g
n,43 have have
earning algo arning alg
s the possib e possib
the input, th he input, t
robot is try bot is try
ople playing ople playin
es that som es that so
wo wo

---

## [Sección 44] Chapter 5, I spell out some far worse outcomes.

-- 100 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 87
new concepts in the more expressive languages needed for science.
This by itself would be a huge boon to humanity as well as a significant step towards general-purpose AI.
Discovering actions
Intelligent behavior over long time scales requires the ability
to plan and manage activity hierarchically, at multiple levels of
abstraction—all the way from doing a PhD (one trillion actions) to a
single motor control command sent to one finger as part of typing a
single character in the application cover letter.
Our activities are organized into complex hierarchies with dozens
of levels of abstraction. These levels and the actions they contain are a
key part of our civilization and are handed down through generations
via our language and practices. For example, actions such as catching a
wild boar and applying for a visa and buying a plane ticket may involve
millions of primitive actions, but we can think about them as single
units because they are already in the “library” of actions that our language and culture provides and because we know (roughly) how to
do them.
Once they are in the library, we can string these high-level actions
together into still higher-level actions, such as having a tribal feast
for the summer solstice or doing archaeological research for a summer
in a remote part of Nepal. Trying to plan such activities from scratch,
starting with the lowest-level motor control steps, would be completely hopeless because such activities involve millions or billions of
steps, many of which are very unpredictable. (Where will the wild
boar be found, and which way will he run?) With suitable high-level
actions in the library, on the other hand, one need plan only a dozen
or so steps, because each such step is a large piece of the overall activity. This is something that even our feeble human brains can manage—
but it gives us the “superpower” of planning over long time scales.
There was a time when these actions didn’t exist as such—for
M 9780525558613_Human_TX.indd 87 8/7/19 11:21 PM
Not
re i e
o still still hhig ig
ummer solst ummer sol
ote part ote part
hh
for
ovides des
n the lib n the lib
h
Distribution
part
hierarchies ierarchies
e actions th tions th
ded down th ed down t
xample, act mple, ac
and buying buying
but we can but we c
ady in the ady in the
nd b nd b

-- 101 of 352 --

88 H U M A N C O M PAT I B L E
example, to obtain the right to a plane journey in 1910 would have
required a long, involved, and unpredictable process of research,
letter writing, and negotiation with various aeronautical pioneers.
Other actions recently added to the library include emailing, googling,
and ubering. As Alfred North Whitehead wrote in 1911, “Civilization
advances by extending the number of important operations which we
can perform without thinking about them.” 45
Saul Steinberg’s famous cover for The New Yorker (figure 6) brilliantly shows, in spatial form, how an intelligent agent manages its
own future. The very immediate future is extraordinarily detailed—
in fact, my brain has already loaded up the specific motor control
FIGURE 6: Saul Steinberg’s View of the World from 9th AvenueILUVWSXEOLVKHGDVDFRYHURIThe New Yorker magazine.
9780525558613_Human_TX.indd 88 8/7/19 11:21 PM
Notto obtain t to obtain
a long, a long,
for
g s View View
e New Yorker ew York
Dis D f the f the

-- 102 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 89
sequences for typing the next few words. Looking a bit further ahead,
there is less detail—my plan is to finish this section, have lunch, write
some more, and watch France play Croatia in the final of the World
Cup. Still further ahead, my plans are larger but vaguer: move back
from Paris to Berkeley in early August, teach a graduate course, and
finish this book. As one moves through time, the future moves closer
to the present and the plans for it become more detailed, while new,
vague plans may be added to the distant future. Plans for the immediate future become so detailed that they are executable directly by the
motor control system.
At present we have only some pieces of this overall picture in place
for AI systems. If the hierarchy of abstract actions is provided—
including knowledge of how each abstract action can be refined into a
subplan composed of more concrete actions—then we have algorithms
that can construct complex plans to achieve specific goals. There are
algorithms that can execute abstract, hierarchical plans in such a way
that the agent always has a primitive, physical action “ready to go,”
even if actions in the future are still at an abstract level and not yet
executable.
The main missing piece of the puzzle is a method for constructing
the hierarchy of abstract actions in the first place. For example, is it
possible to start from scratch with a robot that knows only that it can
send various electric currents to various motors and have it discover
for itself the action of standing up? It’s important to understand that
I’m not asking whether we can train a robot to stand up, which can be
done simply by applying reinforcement learning with a reward for the
robot’s head being farther away from the ground.46 Training a robot to
stand up requires that the human trainer already knows what standing
up means, so that the right reward signal can be defined. What we
want is for the robot to discover for itself that standing up is a thing—a
useful abstract action, one that achieves the precondition (being upright) for walking or running or shaking hands or seeing over a wall
and so forms part of many abstract plans for all kinds of goals.
M 9780525558613_Human_TX.indd 89 8/7/19 11:21 PM
Not
f ab
tart from rt from
ous electri us electr
the acti the act
forng piece of ng piece o
stract a stract a
Distribution
erall pictur ll pictur
actions is actions i
action can b on can b
ons— ons—tthen w hen
achieve sp chieve sp
ract, hierar ct, hierar
primitive, p primitive,
re are still re are stil

---

## [Sección 45] Chapter 5, I spell out some far worse outcomes.

-- 103 of 352 --

90 H U M A N C O M PAT I B L E
Similarly, we want the robot to discover actions such as moving from
place to place, picking up objects, opening doors, tying knots, cooking
dinner, finding my keys, building houses, and many other actions that
have no names in any human language because we humans have not
discovered them yet.
I believe this capability is the most important step needed to reach
human-level AI. It would, to borrow Whitehead’s phrase again, extend the number of important operations that AI systems can perform
without thinking about them. Numerous research groups around the
world are hard at work on solving the problem. For example, DeepMind’s 2018 paper showing human-level performance on Quake III
Arena Capture the Flag claims that their learning system “constructs
a temporally hierarchical representation space in a novel way to
promote . . . temporally coherent action sequences.” 47 (I’m not completely sure what this means, but it certainly sounds like progress towards the goal of inventing new high-level actions.) I suspect that we
do not yet have the complete answer, but this is an advance that could
occur any moment, just by putting some existing ideas together in the
right way.
Intelligent machines with this capability would be able to look further into the future than humans can. They would also be able to take
into account far more information. These two capabilities combined
lead inevitably to better real-world decisions. In any kind of conflict
situation between humans and machines, we would quickly find, like
Garry Kasparov and Lee Sedol, that our every move has been anticipated and blocked. We would lose the game before it even started.
Managing mental activity
If managing activity in the real world seems complex, spare a
thought for your poor brain, managing the activity of the “most complex object in the known universe”—itself. We don’t start out knowing how to think, any more than we start out knowing how to walk or
9780525558613_Human_TX.indd 90 8/7/19 11:21 PM
Not
ure r
far more r more
tably to bet tably to be
between between
forines with th nes with t
than hu han hu
Distribution
xam
ance on Q ce on Q
ng system “ ng system
pace in a e in a
sequences sequences
ertainly sou tainly so
igh- h-llevel ac evel ac
nswer, but nswer, bu
utting som utting som

-- 104 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 91
play the piano. We learn how to do it. We can, to some extent, choose
what thoughts to have. (Go on, think about a juicy hamburger or Bulgarian customs regulations—your choice!) In some ways, our mental
activity is more complex than our activity in the real world, because
our brains have far more moving parts than our bodies and those parts
move much faster. The same is true for computers: for every move
that AlphaGo makes on the Go board, it performs millions or billions
of units of computation, each of which involves adding a branch to the
lookahead search tree and evaluating the board position at the end of
that branch. And each of those units of computation happens because
the program makes a choice about which part of the tree to explore
next. Very approximately, AlphaGo chooses computations that it expects will improve its eventual decision on the board.
It has been possible to work out a reasonable scheme for managing
AlphaGo’s computational activity because that activity is simple and
homogeneous: every unit of computation is of the same kind. Compared to other programs that use that same basic unit of computation,
AlphaGo is probably quite efficient, but it’s probably extremely inefficient compared to other kinds of programs. For example, Lee Sedol,
AlphaGo’s human opponent in the epochal match of 2016, probably
does no more than a few thousand units of computation per move, but
he has a much more flexible computational architecture with many
more kinds of units of computation: these include dividing the board
into subgames and trying to resolve their interactions; recognizing
possible goals to attain and making high-level plans with actions like
“keep this group alive” or “prevent my opponent from connecting
these two groups”; thinking about how to achieve a specific goal, such
as keeping a group alive; and ruling out whole classes of moves because they fail to address a significant threat.
We simply don’t know how to organize such complex and varied
computational activity—how to integrate and build on the results
from each and how to allocate computational resources to the various
kinds of deliberation so that good decisions are found as quickly as
M 9780525558613_Human_TX.indd 91 8/7/19 11:21 PM
Not
an an
ch more h more
ds of units ds of unit
games a games a
for
er kind kin
opponent i opponent
a few th few th
l
Distribution
happ pp
the tree t he tree t
omputation omputation
the board. board.
asonable sch sonable sc
ecause that ause tha
mputation is utation is
use that sam use that sa
efficient, b efficient,
s of s of

---

## [Sección 46] Chapter 5, I spell out some far worse outcomes.

-- 105 of 352 --

92 H U M A N C O M PAT I B L E
possible. It is clear, however, that a simple computational architecture
like AlphaGo’s cannot possibly work in the real world, where we routinely need to deal with decision horizons of not tens but billions of
primitive steps and where the number of possible actions at any point
is almost infinite. It’s important to remember that an intelligent agent
in the real world is not restricted to playing Go or even finding Stuart’s
keys—it’s just being. It can do anything next, but it cannot possibly
afford to think about all the things it might do.
A system that can both discover new high-level actions—as described earlier—and manage its computational activity to focus on
units of computation that quickly deliver significant improvements in
decision quality would be a formidable decision maker in the real
world. Like those of humans, its deliberations would be “cognitively
efficient,” but it would not suffer from the tiny short-term memory
and slow hardware that severely limit our ability to look far into the
future, handle a large number of contingencies, and consider a large
number of alternative plans.
More things missing?
If we put together everything we know how to do with all the potential new developments listed in this chapter, would it work? How
would the resulting system behave? It would plow through time, absorbing vast quantities of information and keeping track of the state of
the world on a massive scale by observation and inference. It would
gradually improve its models of the world (which include models of
humans, of course). It would use those models to solve complex problems and it would encapsulate and reuse its solution processes to make
its deliberations more efficient and to enable the solution of still more
complex problems. It would discover new concepts and actions, and
these would allow it to improve its rate of discovery. It would make
effective plans over increasingly long time scales.
In summary, it’s not obvious that anything else of great signifi9780525558613_Human_TX.indd 92 8/7/19 11:21 PM
Not
eth t
evelopme elopme
e resulting s e resulting
st quant st quan
forissing? sing?
er everyt r every
Distribution
ty to
t improve mprove
on maker on maker
ons would b would
the tiny he tiny sshh
t our abilit our abilit
contingenc ontingenc

-- 106 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 93
cance is missing, from the point of view of systems that are effective
in achieving their objectives. Of course, the only way to be sure is to
build it (once the breakthroughs have been achieved) and see what
happens.
Imagining a Superintelligent Machine
The technical community has suffered from a failure of imagination
when discussing the nature and impact of superintelligent AI. Often,
we see discussions of reduced medical errors,48 safer cars,49 or other
advances of an incremental nature. Robots are imagined as individual
entities carrying their brains with them, whereas in fact they are likely
to be wirelessly connected into a single, global entity that draws on
vast stationary computing resources. It’s as if researchers are afraid of
examining the real consequences of success in AI.
A general-purpose intelligent system can, by assumption, do what
any human can do. For example, some humans did a lot of mathematics, algorithm design, coding, and empirical research to come up with
the modern search engine. The results of all this work are very useful
and of course very valuable. How valuable? A recent study showed
that the median American adult surveyed would need to be paid at
least $17,500 to give up using search engines for a year, 50 which translates to a global value in the tens of trillions of dollars.
Now imagine that search engines don’t exist yet because the necessary decades of work have not been done, but you have access instead to a superintelligent AI system. Simply by asking the question,
you now have access to search engine technology, courtesy of the AI
system. Done! Trillions of dollars in value, just for the asking, and not
a single line of additional code written by you. The same goes for any
other missing invention or series of inventions: if humans could do it,
so can the machine.
This last point provides a useful lower bound—a pessimistic
M 9780525558613_Human_TX.indd 93 8/7/19 11:21 PM
Not
very e
dian Ame an Ame
500 to give 500 to giv
global v global
for
coding din
engine. Th engine. T
valuab valuab
Distribution
igent
afer cars, er cars,44
imagined a imagined a
ereas in fac as in fac
e, global en , global en
It’s as if re t’s as if re
of success f success
gent system ent system
mple, som mple, som
and and

---

## [Sección 47] Chapter 5, I spell out some far worse outcomes.

-- 107 of 352 --

94 H U M A N C O M PAT I B L E
estimate—on what a superintelligent machine can do. By assumption,
the machine is more capable than an individual human. There are
many things an individual human cannot do, but a collection of n
humans can do: put an astronaut on the Moon, create a gravitationalwave detector, sequence the human genome, run a country with hundreds of millions of people. So, roughly speaking, we create n software
copies of the machine and connect them in the same way—with the
same information and control flows—as the n humans. Now we have
a machine that can do whatever n humans can do, except better, because each of its n components is superhuman.
This multi-agent cooperation design for an intelligent system is just
a lower bound on the possible capabilities of machines because there
are other designs that work better. In a collection of n humans, the
total available information is kept separately in n brains and communicated very slowly and imperfectly between them. That’s why the n
humans spend most of their time in meetings. In the machine, there
is no need for this separation, which often prevents connecting the
dots. For an example of disconnected dots in scientific discovery, a
brief perusal of the long history of penicillin is quite eye-opening. 51
Another useful method of stretching your imagination is to think
about some particular form of sensory input—say, reading—and scale
it up. Whereas a human can read and understand one book in a week,
a machine could read and understand every book ever written—all 150
million of them—in a few hours. This requires a decent amount of
processing power, but the books can be read largely in parallel, meaning that simply adding more chips allows the machine to scale up its
reading process. By the same token, the machine can see everything at
once through satellites, robots, and hundreds of millions of surveillance cameras; watch all the world’s TV broadcasts; and listen to all
the world’s radio stations and phone conversations. Very quickly it
would gain a far more detailed and accurate understanding of the world
and its inhabitants than any human could possibly hope to acquire.
One can also imagine scaling the machine’s capacity for action. A
9780525558613_Human_TX.indd 94 8/7/19 11:21 PM
Not
cul cu
as a huma a huma
could read could read
tthem— hem—
for
g histo ist
method of s method of
ar form r form
Distribution
gent syste nt syste
achines bec achines bec
lection of tion of
tely in tely in nn br br
between the tween th
in meeting n meeting
which oft which o
connected connecte
y of y of

-- 108 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 95
human has direct control over only one body, while a machine can
control thousands or millions. Some automated factories already exhibit this characteristic. Outside the factory, a machine that controls
thousands of dexterous robots can, for example, produce vast numbers
of houses, each one tailored to its future occupants’ needs and desires.
In the lab, existing robotic systems for scientific research could be
scaled up to perform millions of experiments simultaneously—perhaps
to create complete predictive models of human biology down to the
molecular level. Note that the machine’s reasoning capabilities will
give it a far greater capacity to detect inconsistencies between scientific theories and between theories and observations. Indeed, it may
already be the case that we have enough experimental evidence about
biology to devise a cure for cancer: we just haven’t put it together.
In the cyber realm, machines already have access to billions of effectors—namely, the displays on all the phones and computers in the
world. This partly explains the ability of IT companies to generate
enormous wealth with very few employees; it also points to the severe
vulnerability of the human race to manipulation via screens.
Scale of a different kind comes from the machine’s ability to look
further into the future, with greater accuracy, than is possible for humans. We have seen this for chess and Go already; with the capacity
for generating and analyzing hierarchical plans over long time scales
and the ability to identify new abstract actions and high-level descriptive models, machines will transfer this advantage to domains such as
mathematics (proving novel, useful theorems) and decision making in
the real world. Tasks such as evacuating a large city in the event of an
environmental disaster will be relatively straightforward, with the
machine able to generate individual guidance for every person and
vehicle to minimize the number of casualties.
The machine might work up a slight sweat when devising policy recommendations to prevent global warming. Earth systems modeling requires knowledge of physics (atmosphere, oceans), chemistry
(carbon cycle, soils), biology (decomposition, migration), engineering
M 9780525558613_Human_TX.indd 95 8/7/19 11:21 PM
Not
see se
ng and an and an
ability to ide ability to id
els, mac els, mac
for
kind ind
ture, with g ure, with
n this fo n this fo
l
Distribution
s bet
ons. Indee ns. Indee
imental evi mental evi
haven’t put en’t pu
y have acce y have acce
the phones e phone
ability of I bility of I
ew employe w employ
race to m race to m
ome ome

---

## [Sección 48] Chapter 5, I spell out some far worse outcomes.

-- 109 of 352 --

96 H U M A N C O M PAT I B L E
(renewable energy, carbon capture), economics (industry, energy use),
human nature (stupidity, greed), and politics (even more stupidity,
even more greed). As noted, the machine will have access to vast
quantities of evidence to feed all these models. It will be able to suggest or carry out new experiments and expeditions to narrow down
the inevitable uncertainties—for example, to discover the true extent
of gas hydrates in shallow ocean reservoirs. It will be able to consider
a vast range of possible policy recommendations—laws, nudges, markets, inventions, and geoengineering interventions—but of course it
will also need to find ways to persuade us to go along with them.
The Limits of Superintelligence
While stretching your imagination, don’t stretch it too far. A common
mistake is to attribute godlike powers of omniscience to superintelligent AI systems—complete and perfect knowledge not just of the
present but also of the future. 52 This is quite implausible because it
requires an unphysical ability to determine the exact current state of
the world as well as an unrealizable ability to simulate, much faster
than real time, the operation of a world that includes the machine itself (not to mention billions of brains, which would still be the secondmost-complex objects in the universe).
This is not to say that it is impossible to predict some aspects of the
future with a reasonable degree of certainty—for example, I know
what class I’ll be teaching in what room at Berkeley almost a year from
now, despite the protestations of chaos theorists about butterfly wings
and all that. (Nor do I think that humans are anywhere close to predicting the future as well as the laws of physics allow!) Prediction
depends on having the right abstractions—for example, I can predict
that “I” will be “on stage in Wheeler Auditorium” on the Berkeley
campus on the last Tuesday in April, but I cannot predict my exact
9780525558613_Human_TX.indd 96 8/7/19 11:21 PM
Not
he he
ention bil tion bil
plex object plex objec
not to s not to
for
ability lit
s an unreal an unrea
operatio peratio
Distribution
with
ce
on’t stretch t stretch
wers of om ers of om
nd perfect nd perfec
re. re.52 This This
to de to de

-- 110 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 97
location down to the millimeter or which atoms of carbon will have
been incorporated into my body by then.
Machines are also subject to certain speed limits imposed by the
real world on the rate at which new knowledge of the world can
be acquired—one of the valid points made by Kevin Kelly in his article on oversimplified predictions about superhuman AI. 53 For example, to determine whether a specific drug cures a certain kind of
cancer in an experimental animal, a scientist—human or machine—
has two choices: inject the animal with the drug and wait several
weeks or run a sufficiently accurate simulation. To run a simulation,
however, requires a great deal of empirical knowledge of biology, some
of which is currently unavailable; so, more model-building experiments would have to be done first. Undoubtedly, these would take
time and must be done in the real world.
On the other hand, a machine scientist could run vast numbers of
model-building experiments in parallel, could integrate their outcomes into an internally consistent (albeit very complex) model, and
could compare the model’s predictions with the entirety of experimental evidence known to biology. Moreover, simulating the model
does not necessarily require a quantum-mechanical simulation of the
entire organism down to the level of individual molecular reactions—
which, as Kelly points out, would take more time than simply doing
the experiment in the real world. Just as I can predict my future location on Tuesdays in April with some certainty, properties of biological
systems can be predicted accurately with abstract models. (Among
other reasons, this is because biology operates with robust control systems based on aggregate feedback loops, so that small variations in
initial conditions usually don’t lead to large variations in outcomes.)
Thus, while instantaneous machine discoveries in the empirical sciences are unlikely, we can expect that science will proceed much
faster with the help of machines. Indeed, it already is.
A final limitation of machines is that they are not human. This puts
M 9780525558613_Human_TX.indd 97 8/7/19 11:21 PM
Not
do d
elly point y point
riment in th riment in t
uesdays uesdays
for
wn to b to
y require a y require
wn to th wn to th
Distribution
un a
dge of biol e of biol
m model- odel-bbuild uild
ubtedly, th edly, th
..
ientist coul ntist cou
parallel, c arallel, c
sistent (albe istent (alb
s predictio s predicti
olog olog

---

## [Sección 49] Chapter 5, I spell out some far worse outcomes.

-- 111 of 352 --

98 H U M A N C O M PAT I B L E
them at an intrinsic disadvantage when trying to model and predict
one particular class of objects: humans. Our brains are all quite similar, so we can use them to simulate—to experience, if you will—the
mental and emotional lives of others. This, for us, comes for free. (If
you think about it, machines have an even greater advantage with each
other: they can actually run each other’s code!) For example, I don’t
need to be an expert on neural sensory systems to know what it feels
like when you hit your thumb with a hammer. I can just hit my thumb
with a hammer. Machines, on the other hand, have to start almost 54
from scratch in their understanding of humans: they have access only
to our external behavior, plus all the neuroscience and psychology literature, and have to develop an understanding of how we work on that
basis. In principle, they will be able to do this, but it’s reasonable to
suppose that acquiring a human-level or superhuman understanding of
humans will take them longer than most other capabilities.
How Will AI Benefit Humans?
Our intelligence is responsible for our civilization. With access to
greater intelligence we could have a greater—and perhaps far better—
civilization. One can speculate about solving major open problems
such as extending human life indefinitely or developing faster-thanlight travel, but these staples of science fiction are not yet the driving
force for progress in AI. (With superintelligent AI, we’ll probably be
able to invent all sorts of quasi-magical technologies, but it’s hard to
say now what those might be.) Consider, instead, a far more prosaic
goal: raising the living standard of everyone on Earth, in a sustainable
way, to a level that would be viewed as quite respectable in a developed country. Choosing (somewhat arbitrarily) respectable to mean
the eighty-eighth percentile in the United States, the stated goal represents almost a tenfold increase in global gross domestic product
(GDP), from $76 trillion to $750 trillion per year. 55
9780525558613_Human_TX.indd 98 8/7/19 11:21 PM
Not
ce ce
One can ne can
xtending hu xtending h
l, but th l, but t
forresponsible responsib
we could we could
Distribution
ave
and psycho d psycho
f how we w how we w
his, but it’s but it’
uperhuman uperhuman
ost other ca t other c
it Hum it Hum

-- 112 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 99
To calculate the cash value of such a prize, economists use the net
present value of the income stream, which takes into account the discounting of future income relative to the present. The extra income of
$674 trillion per year has a net present value of roughly $13,500 trillion, 56 assuming a discount factor of 5 percent. So, in very crude terms,
this is a ballpark figure for what human-level AI might be worth if it
can deliver a respectable living standard for everyone. With numbers
like this, it’s not surprising that companies and countries are investing
tens of billions of dollars annually in AI research and development. 57
Even so, the sums invested are minuscule compared to the size of
the prize.
Of course, these are all made-up numbers unless one has some
idea of how human-level AI could achieve the feat of raising living
standards. It can do this only by increasing the per-capita production
of goods and services. Put another way: the average human can never
expect to consume more than the average human produces. The example of self-driving taxis discussed earlier in the chapter illustrates
the multiplier effect of AI: with an automated service, it should be
possible for (say) ten people to manage a fleet of one thousand vehicles, so each person is producing one hundred times as much transportation as before. The same goes for manufacturing the cars and for
extracting the raw materials from which the cars are made. Indeed,
some iron-ore mining operations in northern Australia, where temperatures regularly exceed 45 degrees Celsius (113 degrees Fahrenheit), are almost completely automated already. 58
These present-day applications of AI are special-purpose systems:
self-driving cars and self-operating mines have required huge investments in research, mechanical design, software engineering, and testing to develop the necessary algorithms and to make sure that they
work as intended. That’s just how things are done in all spheres of
engineering. That’s how things used to be done in personal travel too:
if you wanted to travel from Europe to Australia and back in the seventeenth century, it would have involved a huge project costing vast
M 9780525558613_Human_TX.indd 99 8/7/19 11:21 PM
Not
e. T
he raw m raw m
n-ore mini n-ore min
s regula s regula
for
people opl
is producin is produc
he same he sam
Distribution
d to
s unless on unless on
e the feat o e feat
ing the ng the ppee
way: the ave y: the ave
he average h average h
scussed ear scussed ea
: with an : with an
o m o m

---

## [Sección 50] Chapter 5, I spell out some far worse outcomes.

-- 113 of 352 --

100 H U M A N C O M PAT I B L E
sums of money, requiring years of planning, and carrying a high risk of
death. Now we are used to the idea of transportation as a service
(TaaS): if you need to be in Melbourne early next week, it just requires
a few taps on your phone and a relatively minuscule amount of money.
General-purpose AI would be everything as a service (EaaS). There
would be no need to employ armies of specialists in different disciplines, organized into hierarchies of contractors and subcontractors,
in order to carry out a project. All embodiments of general-purpose
AI would have access to all the knowledge and skills of the human
race, and more besides. The only differentiation would be in the
physical capabilities: dexterous legged robots for construction or surgery, wheeled robots for large-scale goods transportation, quadcopter
robots for aerial inspections, and so on. In principle—politics and economics aside—everyone could have at their disposal an entire organization composed of software agents and physical robots, capable of
designing and building bridges, improving crop yields, cooking dinner
for a hundred guests, running elections, or doing whatever else needs
doing. It’s the generality of general-purpose intelligence that makes
this possible.
History has shown, of course, that a tenfold increase in global GDP
per capita is possible without AI—it’s just that it took 190 years (from
1820 to 2010) to achieve that increase. 59 It required the development
of factories, machine tools, automation, railways, steel, cars, airplanes,
electricity, oil and gas production, telephones, radio, television, computers, the Internet, satellites, and many other revolutionary inventions. The tenfold increase in GDP posited in the preceding paragraphs
is predicated not on further revolutionary technologies but on the
ability of AI systems to employ what we already have more effectively
and at greater scale.
Of course, there will be effects besides the purely material benefit
of raising living standards. For example, personal tutoring is known to
be far more effective than classroom teaching, but when done by humans it is simply unaffordable—and always will be—for the vast
9780525558613_Human_TX.indd 100 8/7/19 11:21 PM
Not
ible b
) to achie o achie
s, machine s, machine
, oil and , oil and
forwn, of cours n, of cour
withou withou
Distribution
ould
onstructio structio
portation, q portation, q
inciple— ple—pp
eir disposa eir disposa
and physic nd physic
mproving cro roving cro
elections, o elections,
ggeneral- eneral-pp

-- 114 of 352 --

H O W M I G H T A I P R O G R E S S I N T H E F U T U R E ? 101
majority of people. With AI tutors, the potential of each child, no
matter how poor, can be realized. The cost per child would be negligible, and that child would live a far richer and more productive life.
The pursuit of artistic and intellectual endeavors, whether individually or collectively, would be a normal part of life rather than a rarefied luxury.
In the area of health, AI systems should enable researchers to unravel and master the vast complexities of human biology and thereby
gradually banish disease. Greater insights into human psychology and
neurochemistry should lead to broad improvements in mental health.
Perhaps more unconventionally, AI could enable far more effective
authoring tools for virtual reality (VR) and could populate VR environments with far more interesting entities. This might turn VR into
the medium of choice for literary and artistic expression, creating experiences of a richness and depth that is currently unimaginable.
And in the mundane world of daily life, an intelligent assistant and
guide would—if well designed and not co-opted by economic and political interests—empower every individual to act effectively on their
own behalf in an increasingly complex and sometimes hostile economic and political system. You would, in effect, have a high-powered
lawyer, accountant, and political adviser on call at any time. Just as
traffic jams are expected to be smoothed out by intermixing even a
small percentage of autonomous vehicles, one can only hope that wiser
policies and fewer conflicts will emerge from a better-informed and
better-advised global citizenry.
These developments taken together could change the dynamic of
history—at least that part of history that has been driven by conflicts
within and between societies for access to the wherewithal of life. If
the pie is essentially infinite, then fighting others for a larger share
makes little sense. It would be like fighting over who gets the most
digital copies of the newspaper—completely pointless when anyone
can make as many digital copies as they want for free.
There are some limits to what AI can provide. The pies of land and
M 9780525558613_Human_TX.indd 101 8/7/19 11:21 PM
Not
ant an
are expec e expec
rcentage of a rcentage of
and few and few
for
reasing sin
system. Yo system. Y
, and po and po
Distribution
n me
le far more far more
ould popula uld popula
. This migh his mig
rtistic expr tistic expr
at is curren is curren
f daily life, a aily life, a
d and not co d and not
every indi every ind
y co y co

---

## [Sección 51] Chapter 5, I spell out some far worse outcomes.

-- 115 of 352 --

102 H U M A N C O M PAT I B L E
raw materials are not infinite, so there cannot be unlimited population growth and not everyone will have a mansion in a private park.
(This will eventually necessitate mining elsewhere in the solar system
and constructing artificial habitats in space; but I promised not to talk
about science fiction.) The pie of pride is also finite: only 1 percent of
people can be in the top 1 percent on any given metric. If human happiness requires being in the top 1 percent, then 99 percent of humans
are going to be unhappy, even when the bottom 1 percent has an objectively splendid lifestyle. 60 It will be important, then, for our cultures to gradually down-weight pride and envy as central elements of
perceived self-worth.
As Nick Bostrom puts it at the end of his book Superintelligence,
success in AI will yield “a civilizational trajectory that leads to a compassionate and jubilant use of humanity’s cosmic endowment.” If we
fail to take advantage of what AI has to offer, we will have only ourselves to blame.
9780525558613_Human_TX.indd 102 8/7/19 11:21 PM
Not
 
for Distribution
ral e
book ook Super Super
ctory that l y that
s cosmic en s cosmic e
to offer, w o offer, w

-- 116 of 352 --
MISUSES OF AI
Acompassionate and jubilant use of humanity’s cosmic endowment sounds wonderful, but we also have to reckon with
the rapid rate of innovation in the malfeasance sector. Illintentioned people are thinking up new ways to misuse AI so quickly
that this chapter is likely to be outdated even before it attains printed
form. Think of it not as depressing reading, however, but as a call to
act before it is too late.
6XUYHLOODQFH3HUVXDVLRQDQG&RQWURO
The automated Stasi
The Ministerium für Staatsicherheit of East Germany, more commonly known as the Stasi, is widely regarded as “one of the most effective and repressive intelligence and secret police agencies to have ever
existed.” 1 It maintained files on the great majority of East German
households. It monitored phone calls, read letters, and planted hidden
cameras in apartments and hotels. It was ruthlessly effective at identifying and eliminating dissident activity. Its preferred modus operandi
M 9780525558613_Human_TX.indd 103 8/7/19 11:21 PM
NotLOODQFH LOODQFH
for
as dep de
ate. ate.
Distribution
of humanit of humanit
ut we also we also
tion in the on in the
ng up new ng up new
be outdat be outda
essin essin

-- 117 of 352 --

104 H U M A N C O M PAT I B L E
was psychological destruction rather than imprisonment or execution.
This level of control came at great cost, however: by some estimates,
more than a quarter of working-age adults were Stasi informants. Stasi
paper records have been estimated at twenty billion pages 2 and the
task of processing and acting on the huge incoming flows of information began to exceed the capacity of any human organization.
It should come as no surprise, then, that intelligence agencies have
spotted the potential for using AI in their work. For many years, they
have been applying simple forms of AI technology, including voice
recognition and identification of key words and phrases in both speech
and text. Increasingly, AI systems are able to understand the content of
what people are saying and doing, whether in speech, text, or video
surveillance. In regimes where this technology is adopted for the purposes of control, it will be as if every citizen had their own personal
Stasi operative watching over them twenty-four hours a day. 3
Even in the civilian sphere, in relatively free countries, we are subject to increasingly effective surveillance. Corporations collect and
sell information about our purchases, Internet and social network usage, electrical appliance usage, calling and texting records, employment, and health. Our locations can be tracked through our cell
phones and our Internet-connected cars. Cameras recognize our faces
on the street. All this data, and much more, can be pieced together by
intelligent information integration systems to produce a fairly complete picture of what each of us is doing, how we live our lives, who
we like and dislike, and how we will vote.4 The Stasi will look like
amateurs by comparison.
Controlling your behavior
Once surveillance capabilities are in place, the next step is to modify your behavior to suit those who are deploying this technology. One
rather crude method is automated, personalized blackmail: a system
that understands what you are doing—whether by listening, reading,
9780525558613_Human_TX.indd 104 8/7/19 11:21 PM
Not
nte n
All this d ll this d
informatio informat
ure of w ure of w
dd
for
e usag usa
Our locati Our locat
net- net-ccon on
Distribution
in b
tand the c nd the c
speech, tex peech, tex
gy is adopte s adopt
tizen had th zen had th
wenty- nty-ffour our fff
relatively fr atively fr
surveillance surveillan
urchases, urchases,
, ca , ca

---

## [Sección 52] Chapter 5, I spell out some far worse outcomes.

-- 118 of 352 --

M I S U S E S O F A I 105
or watching you—can easily spot things you should not be doing.
Once it finds something, it will enter into correspondence with you to
extract the largest possible amount of money (or to coerce behavior, if
the goal is political control or espionage). The extraction of money
works as the perfect reward signal for a reinforcement learning algorithm, so we can expect AI systems to improve rapidly in their ability
to identify and profit from misbehavior. Early in 2015, I suggested to
a computer security expert that automated blackmail systems, driven
by reinforcement learning, might soon become feasible; he laughed
and said it was already happening. The first blackmail bot to be widely
publicized was Delilah, identified in July 2016. 5
A more subtle way to change people’s behavior is to modify their
information environment so that they believe different things and
make different decisions. Of course, advertisers have been doing this
for centuries as a way of modifying the purchasing behavior of individuals. Propaganda as a tool of war and political domination has an even
longer history.
So what’s different now? First, because AI systems can track an
individual’s online reading habits, preferences, and likely state of
knowledge, they can tailor specific messages to maximize impact on
that individual while minimizing the risk that the information will be
disbelieved. Second, the AI system knows whether the individual
reads the message, how long they spend reading it, and whether they
follow additional links within the message. It then uses these signals as
immediate feedback on the success or failure of its attempt to influence each individual; in this way, it quickly learns to become more
effective in its work. This is how content selection algorithms on social media have had their insidious effect on political opinions.
Another recent change is that the combination of AI, computer
graphics, and speech synthesis is making it possible to generate
deepfakes—realistic video and audio content of just about anyone saying or doing just about anything. The technology will require little
more than a verbal description of the desired event, making it usable
M 9780525558613_Human_TX.indd 105 8/7/19 11:21 PM
Not
wh wh
Second, econd,
e message, h e message,
ditional ditiona
for
ading ing
an tailor sp n tailor sp
le minim e minim
h
Distribution
bot t
avior is to m vior is to m
lieve differ e diffe
vertisers ha vertisers ha
he purchasi purchas
and politic nd politic
w? First, b w? First, b
habit habit

-- 119 of 352 --

106 H U M A N C O M PAT I B L E
by more or less anyone in the world. Cell phone video of Senator X
accepting a bribe from cocaine dealer Y at shady establishment Z? No
problem! This kind of content can induce unshakeable beliefs in things
that never happened. 6 In addition, AI systems can generate millions of
false identities—the so-called bot armies—that can pump out billions
of comments, tweets, and recommendations daily, swamping the efforts of mere humans to exchange truthful information. Online marketplaces such as eBay, Taobao, and Amazon that rely on reputation
systems7 to build trust between buyers and sellers are constantly at
war with bot armies designed to corrupt the markets.
Finally, methods of control can be direct if a government is able to
implement rewards and punishments based on behavior. Such a system treats people as reinforcement learning algorithms, training them
to optimize the objective set by the state. The temptation for a government, particularly one with a top-down, engineering mind-set, is to
reason as follows: it would be better if everyone behaved well, had a
patriotic attitude, and contributed to the progress of the country;
technology enables measurement of individual behavior, attitudes,
and contributions; therefore, everyone will be better off if we set up a
technology-based system of monitoring and control based on rewards
and punishments.
There are several problems with this line of thinking. First, it ignores the psychic cost of living under a system of intrusive monitoring
and coercion; outward harmony masking inner misery is hardly an
ideal state. Every act of kindness ceases to be an act of kindness and
becomes instead an act of personal score maximization and is perceived as such by the recipient. Or worse, the very concept of a voluntary act of kindness gradually becomes just a fading memory of
something people used to do. Visiting an ailing friend in hospital will,
under such a system, have no more moral significance and emotional
value than stopping at a red light. Second, the scheme falls victim to
the same failure mode as the standard model of AI, in that it assumes
that the stated objective is in fact the true, underlying objective.
9780525558613_Human_TX.indd 106 8/7/19 11:21 PM
Not
s..
several p everal p
psychic cos psychic co
ion; out ion; ou
for
efore, e re,
stem of mo stem of m
Distribution
vernment i rnment
behavior. S behavior. S
algorithms, rithms
e. The tem e. The tem
own, engin wn, engin
ter if every r if every
buted to th buted to
ement of ement of
very very

---

## [Sección 53] Chapter 5, I spell out some far worse outcomes.

-- 120 of 352 --

M I S U S E S O F A I 107
Inevitably, Goodhart’s law will take over, whereby individuals optimize the official measure of outward behavior, just as universities
have learned to optimize the “objective” measures of “quality” used by
university ranking systems instead of improving their real (but unmeasured) quality. 8 Finally, the imposition of a uniform measure of
behavioral virtue misses the point that a successful society may comprise a wide variety of individuals, each contributing in their own way.
A right to mental security
One of the great achievements of civilization has been the gradual
improvement in physical security for humans. Most of us can expect
to conduct our daily lives without constant fear of injury and death.
Article 3 of the 1948 Universal Declaration of Human Rights states,
“Everyone has the right to life, liberty and security of person.”
I would like to suggest that everyone should also have the right to
mental security—the right to live in a largely true information environment. Humans tend to believe the evidence of our eyes and ears.
We trust our family, friends, teachers, and (some) media sources to
tell us what they believe to be the truth. Even though we do not expect used-car salespersons and politicians to tell us the truth, we have
trouble believing that they are lying as brazenly as they sometimes do.
We are, therefore, extremely vulnerable to the technology of misinformation.
The right to mental security does not appear to be enshrined in the
Universal Declaration. Articles 18 and 19 establish the rights of “freedom of thought” and “freedom of opinion and expression.” One’s
thoughts and opinions are, of course, partly formed by one’s information environment, which, in turn, is subject to Article 19’s “right to . . .
impart information and ideas through any media and regardless of
frontiers.” That is, anyone, anywhere in the world, has the right to
impart false information to you. And therein lies the difficulty: democratic nations, particularly the United States, have for the most part
M 9780525558613_Human_TX.indd 107 8/7/19 11:21 PM
Not
ales le
eving that ng that
therefore, e therefore,
nn
for
friends end
elieve to be elieve to b
persons ersons
h
Distribution
has been th been th
Most of us Most of us
t fear of inj ar of in
ation of Hu tion of Hu
ty and secu and secu
veryone sho ryone sho
o live in a la live in a
believe th believe th
tea tea

-- 121 of 352 --

108 H U M A N C O M PAT I B L E
been reluctant—or constitutionally unable—to prevent the imparting
of false information on matters of public concern because of justifiable
fears regarding government control of speech. Rather than pursuing
the idea that there is no freedom of thought without access to true
information, democracies seem to have placed a naïve trust in the idea
that the truth will win out in the end, and this trust has left us unprotected. Germany is an exception; it recently passed the Network Enforcement Act, which requires content platforms to remove proscribed
hate speech and fake news, but this has come under considerable criticism as being unworkable and undemocratic. 9
For the time being, then, we can expect our mental security to
remain under attack, protected mainly by commercial and volunteer
efforts. These efforts include fact-checking sites such as factcheck.org
and snopes.com—but of course other “ fact-checking” sites are springing up to declare truth as lies and lies as truth.
The major information utilities such as Google and Facebook have
come under extreme pressure in Europe and the United States to “do
something about it.” They are experimenting with ways to flag or relegate false content—using both AI and human screeners—and to
direct users to verified sources that counteract the effects of misinformation. Ultimately, all such efforts rely on circular reputation systems, in the sense that sources are trusted because trusted sources
report them to be trustworthy. If enough false information is propagated, these reputation systems can fail: sources that are actually
trustworthy can become untrusted and vice versa, as appears to be
occurring today with major media sources such as CNN and Fox News
in the United States. Aviv Ovadya, a technologist working against misinformation, has called this the “ infopocalypse—a catastrophic failure
of the marketplace of ideas.” 10
One way to protect the functioning of reputation systems is to
inject sources that are as close as possible to ground truth. A single
fact that is certainly true can invalidate any number of sources that are
9780525558613_Human_TX.indd 108 8/7/19 11:21 PM
Not
ely, el
sense tha nse tha
em to be tru em to be t
se repu se repu
for
sing b g
ed sources ed sources
all such all suc
Distribution
mental sec ental sec
mercial and mercial and
ites such as such a
ct- ct-cchecking hecking
as truth. s truth.
s such as G uch as G
in Europe a in Europe
e experim e experim
th A th A

---

## [Sección 54] Chapter 5, I spell out some far worse outcomes.

-- 122 of 352 --

M I S U S E S O F A I 109
only somewhat trustworthy, if those sources disseminate information
contrary to the known fact. In many countries, notaries function as
sources of ground truth to maintain the integrity of legal and realestate information; they are usually disinterested third parties in any
transaction and are licensed by governments or professional societies.
(In the City of London, the Worshipful Company of Scriveners has
been doing this since 1373, suggesting that a certain stability inheres
in the role of truth telling.) If formal standards, professional qualifications, and licensing procedures emerge for fact-checkers, that would
tend to preserve the validity of the information flows on which we
depend. Organizations such as the W3C Credible Web group and the
Credibility Coalition aim to develop technological and crowdsourcing
methods for evaluating information providers, which would then allow users to filter out unreliable sources.
A second way to protect reputation systems is to impose a cost for
purveying false information. Thus, some hotel rating sites accept reviews concerning a particular hotel only from those who have booked
and paid for a room at that hotel through the site, while other rating
sites accept reviews from anyone. It will come as no surprise that ratings at the former sites are far less biased, because they impose a cost
(paying for an unnecessary hotel room) for fraudulent reviews.11 Regulatory penalties are more controversial: no one wants a Ministry of
Truth, and Germany’s Network Enforcement Act penalizes only the
content platform, not the person posting the fake news. On the other
hand, just as many nations and many US states make it illegal to record
telephone calls without permission, it ought, at least, to be possible to
impose penalties for creating fictitious audio and video recordings of
real people.
Finally, there are two other facts that work in our favor. First, almost no one actively wants, knowingly, to be lied to. (This is not to say
that parents always inquire vigorously into the truthfulness of those
who praise their children’s intelligence and charm; it’s just that they
M 9780525558613_Human_TX.indd 109 8/7/19 11:21 PM
Not
nn nn
ties are m s are m
nd German nd Germa
platform platform
for
om any an
sites are far ites are fa
ecessary cessary
Distribution
ws o
Web grou Web grou
ical and cro cal and cro
ers, which which
..
on systems n systems
us, some ho some ho
hotel only hotel onl
hotel thr hotel thr
one. one.

-- 123 of 352 --

110 H U M A N C O M PAT I B L E
are less likely to seek such approval from someone who is known to
lie at every opportunity.) This means that people of all political persuasions have an incentive to adopt tools that help them distinguish
truth from lies. Second, no one wants to be known as a liar, least of all
news outlets. This means that information providers—at least those
for who reputation matters—have an incentive to join industry associations and subscribe to codes of conduct that favor truth telling. In
turn, social media platforms can offer users the option of seeing content from only reputable sources that subscribe to these codes and
subject themselves to third-party fact-checking.
Lethal Autonomous Weapons
The United Nations defines lethal autonomous weapons systems
(AWS for short, because LAWS is quite confusing) as weapons systems that “locate, select, and eliminate human targets without human
intervention.” AWS have been described, with good reason, as the
“third revolution in warfare,” after gunpowder and nuclear weapons.
You may have read articles in the media about AWS; usually the
article will call them killer robots and will be festooned with images
from the Terminator movies. This is misleading in at least two ways:
first, it suggests that autonomous weapons are a threat because they
might take over the world and destroy the human race; second, it suggests that autonomous weapons will be humanoid, conscious, and evil.
The net effect of the media’s portrayal of the issue has been to make
it seem like science fiction. Even the German government has been
taken in: it recently issued a statement12 asserting that “having the ability to learn and develop self-awareness constitutes an indispensable attribute to be used to define individual functions or weapon systems as
autonomous.” (This makes as much sense as asserting that a missile isn’t
a missile unless it goes faster than the speed of light.) In fact, autonomous weapons will have the same degree of autonomy as a chess
9780525558613_Human_TX.indd 110 8/7/19 11:21 PM
Not
he h
minator m nator m
ggests that ggests tha
e over th e over t
for
fare,” re,
ead articles ad article
m m killer killer
Distribution
autonomo utonomo
is quite con quite con
liminate hu liminate h
een descri een descr
fter fter

---

## [Sección 55] Chapter 5, I spell out some far worse outcomes.

-- 124 of 352 --

M I S U S E S O F A I 111
program, which is given the mission of winning the game but decides by
itself where to move its pieces and which enemy pieces to eliminate.
AWS are not science fiction. They already exist. Probably the clearest example is Israel’s Harop (figure 7, left), a loitering munition with a
ten-foot wingspan and a fifty-pound warhead. It searches for up to six
hours in a given geographical region for any target that meets a given
criterion and then destroys it. The criterion could be “emits a radar
signal resembling antiaircraft radar” or “looks like a tank.”
By combining recent advances in miniature quadrotor design, miniature cameras, computer vision chips, navigation and mapping algorithms, and methods for detecting and tracking humans, it would be
possible in fairly short order to field an antipersonnel weapon like the
Slaughterbot13 shown in figure 7 (right). Such a weapon could be
tasked with attacking anyone meeting certain visual criteria (age, gender, uniform, skin color, and so on) or even specific individuals based
on face recognition. I’m told that the Swiss Defense Department has
already built and tested a real Slaughterbot and found that, as expected, the technology is both feasible and lethal.
Since 2014, diplomatic discussions have been underway in Geneva
that may lead to a treaty banning AWS. At the same time, some of the
major participants in these discussions (the United States, China,
FIGURE  OHIW +DURSORLWHULQJZHDSRQSURGXFHGE\,VUDHO$HURVSDFH,QGXVWULHV ULJKW VWLOOLPDJHIURPWKHSlaughterbotsYLGHRVKRZLQJDSRVVLEOHGHVLJQ
IRUDQDXWRQRPRXVZHDSRQFRQWDLQLQJDVPDOOH[SORVLYHGULYHQSURMHFWLOH
M 9780525558613_Human_TX.indd 111 8/7/19 11:21 PM
Not
ng r g
ras, comp , comp
nd method nd metho
n fairly n fairly
for
troys oys
ntiaircraft r ntiaircraft
ecent ad cent ad
Distribution
ing the gam the gam
h enemy pie enemy pie
y already ex lready ex
ure 7, left), e 7, left),
ppound war ound wa
al region al region
. Th . Th
nSRVVL
YHQSURMHFW SURMHFW

-- 125 of 352 --

112 H U M A N C O M PAT I B L E
Russia, and to some extent Israel and the UK) are engaged in a dangerous competition to develop autonomous weapons. In the United States,
for example, the CODE (Collaborative Operations in Denied Environments) program aims to move towards autonomy by enabling drones to
function with at best intermittent radio contact. The drones will “hunt
in packs, like wolves” according to the program manager.14 In 2016, the
US Air Force demonstrated the in-flight deployment of 103 Perdix
micro-drones from three F/A-18 fighters. According to the announcement, “Perdix are not pre-programmed synchronized individuals, they
are a collective organism, sharing one distributed brain for decisionmaking and adapting to each other like swarms in nature.” 15
You may think it’s pretty obvious that building machines that can
decide to kill humans is a bad idea. But “pretty obvious” is not always
persuasive to governments—including some of those listed in the preceding paragraph—who are bent on achieving what they think of as
strategic superiority. A more convincing reason to reject autonomous
weapons is that they are scalable weapons of mass destruction.
Scalable is a term from computer science; a process is scalable if
you can do a million times more of it essentially by buying a million
times more hardware. Thus, Google handles roughly five billion
search requests per day by having not millions of employees but millions of computers. With autonomous weapons, you can do a million
times more killing by buying a million times more weapons, precisely because the weapons are autonomous. Unlike remotely piloted
drones or AK- 47s, they don’t need individual human supervision to do
their work.
As weapons of mass destruction, scalable autonomous weapons
have advantages for the attacker compared to nuclear weapons and
carpet bombing: they leave property intact and can be applied selectively to eliminate only those who might threaten an occupying force.
They could certainly be used to wipe out an entire ethnic group or all
the adherents of a particular religion (if adherents have visible indicia).
Moreover, whereas the use of nuclear weapons represents a cataclys9780525558613_Human_TX.indd 112 8/7/19 11:21 PM
Not
per e
uters. Wi ters. W
re killing b re killing
use the use the
for
mes m es m
are. Thus, re. Thus
day by h day by h
h
Distribution
in fo
nature.” ure.”155
ing machin ng machin
tty obvious obviou
me of those me of those
achieving w hieving w
vincing reas cing reas
ble weapons ble weapon
computer computer
re o re o

---

## [Sección 56] Chapter 5, I spell out some far worse outcomes.

-- 126 of 352 --

M I S U S E S O F A I 113
mic threshold that we have (often by sheer luck) avoided crossing since
1945, there is no such threshold with scalable autonomous weapons.
Attacks could escalate smoothly from one hundred casualties to one
thousand to ten thousand to one hundred thousand. In addition to
actual attacks, the mere threat of attacks by such weapons makes them
an effective tool for terror and oppression. Autonomous weapons will
greatly reduce human security at all levels: personal, local, national,
and international.
This is not to say that autonomous weapons will be the end of the
world in the way envisaged in the Terminator movies. They need not
be especially intelligent—a self-driving car probably needs to be
smarter—and their missions will not be of the “take over the world”
variety. The existential risk from AI does not come primarily from
simple-minded killer robots. On the other hand, superintelligent machines in conflict with humanity could certainly arm themselves this
way, by turning relatively stupid killer robots into physical extensions
of a global control system.
Eliminating Work as We Know It
Thousands of media articles and opinion pieces and several books
have been written on the topic of robots taking jobs from humans.
Research centers are springing up all over the world to understand
what is likely to happen.16 The titles of Martin Ford’s Rise of the Robots:
Technology and the Threat of a Jobless Future17 and Calum Chace’s The
Economic Singularity: Artificial Intelligence and the Death of Capitalism18 do a pretty good job of summarizing the concern. Although, as
will soon become evident, I am by no means qualified to opine on
what is essentially a matter for economists,19 I suspect that the issue is
too important to leave entirely to them.
The issue of technological unemployment was brought to the fore
in a famous article, “Economic Possibilities for Our Grandchildren,” by
M 9780525558613_Human_TX.indd 113 8/7/19 11:21 PM
Not
of media media
n written o n written
centers center
forWork as Work a
Distribution
. Th
bably nee ably nee
“take over “take over
not come t come
her hand, su er hand, su
uld certainl d certain
killer robot ller robot

-- 127 of 352 --

114 H U M A N C O M PAT I B L E
John Maynard Keynes. He wrote the article in 1930, when the Great
Depression had created mass unemployment in Britain, but the topic
has a much longer history. Aristotle, in Book I of his Politics, presents
the main point quite clearly:
For if every instrument could accomplish its own work, obeying
or anticipating the will of others . . . if, in like manner, the shuttle would weave and the plectrum touch the lyre without a hand
to guide them, chief workmen would not want servants, nor masters slaves.
Everyone agrees with Aristotle’s observation that there is an immediate reduction in employment when an employer finds a mechanical method to perform work previously done by a person. The issue is
whether the so-called compensation effects that ensue—and that tend
to increase employment—will eventually make up for this reduction.
The optimists say yes—and in the current debate, they point to all the
new jobs that emerged after previous industrial revolutions. The pessimists say no—and in the current debate, they argue that machines
will do all the “new jobs” too. When a machine replaces one’s physical
labor, one can sell mental labor. When a machine replaces one’s mental labor, what does one have left to sell?
In Life 3.0, Max Tegmark depicts the debate as a conversation
between two horses discussing the rise of the internal combustion
engine in 1900. One predicts “new jobs for horses. . . . That’s what’s
always happened before, like with the invention of the wheel and the
plow.” For most horses, alas, the “new job” was to be pet food.
The debate has persisted for millennia because there are effects in
both directions. The actual outcome depends on which effects matter
more. Consider, for example, what happens to housepainters as technology improves. For the sake of simplicity, I’ll let the width of the
paintbrush stand for the degree of automation:
9780525558613_Human_TX.indd 114 8/7/19 11:21 PM
Not
ll m l
t does on does on
3.0 3.0, Max , Max
two hor two hor
for
the cu e c
jobs” too. W obs” too.
mental la ental la
Distribution
n that ther n that ther
employer fi ployer f
done by a pe one by a p
ffects that ects that
entually ma tually ma
the current the curren
previous previous
rent rent

---

## [Sección 57] Chapter 5, I spell out some far worse outcomes.

-- 128 of 352 --

M I S U S E S O F A I 115
• If the brush is one hair (a tenth of a millimeter) wide, it takes
thousands of person-years to paint a house and essentially no
housepainters are employed.
• With brushes a millimeter wide, perhaps a few delicate murals
are painted in the royal palace by a handful of painters. At one
centimeter, the nobility begin to follow suit.
• At ten centimeters (four inches), we reach the realm of practicality: most homeowners have their houses painted inside and
out, although perhaps not all that frequently, and thousands of
housepainters find jobs.
• Once we get to wide rollers and spray guns—the equivalent of
a paintbrush about a meter wide—the price goes down considerably, but demand may begin to saturate so the number of
housepainters drops somewhat.
• When one person manages a team of one hundred housepainting robots—the productivity equivalent of a paintbrush one
hundred meters wide—then whole houses can be painted in an
hour and very few housepainters will be working.
Thus, the direct effects of technology work both ways: at first, by
increasing productivity, technology can increase employment by reducing the price of an activity and thereby increasing demand; subsequently, further increases in technology mean that fewer and fewer
humans are required. Figure 8 illustrates these developments. 20
Many technologies exhibit similar curves. If, in some given sector
of the economy, we are to the left of the peak, then improving technology increases employment in that sector; present-day examples
might include tasks such as graffiti removal, environmental cleanup,
inspection of shipping containers, and housing construction in less developed countries, all of which might become more economically feasible if we have robots to help us. If we are already to the right of the
peak, then further automation decreases employment. For example,
M 9780525558613_Human_TX.indd 115 8/7/19 11:21 PM
Not
uct uc
rice of an ce of an
further inc further in
are requ are requ
foreffects of effects of
ivity, te vity, te
Distribution
the equiva e equiva
ce goes dow e goes dow
urate so th te so th
am of one h m of one h
ty equivale equivale
then whole hen whol
usepainter usepainte

-- 129 of 352 --

116 H U M A N C O M PAT I B L E
it’s not hard to predict that elevator operators will continue to be
squeezed out. In the long run, we have to expect that most industries
are going to be pushed to the far right on the curve. One recent article,
based on a careful econometric study by economists David Autor and
Anna Salomons, states that “over the last 40 years, jobs have fallen in
every single industry that introduced technologies to enhance
productivity.” 21
What about the compensation effects described by the economic
optimists?
• Some people have to make the painting robots. How many?
Far fewer than the number of housepainters the robots
replace—otherwise, it would cost more to paint houses with
robots, not less, and no one would buy the robots.
number of
housepainters employed
effective
brush width
0.1mm 1mm 1cm 10cm 1m 10m 100m
FIGURE 8: A notional graph of housepainting employment as painting technology improves.
9780525558613_Human_TX.indd 116 8/7/19 11:21 PM
Not
ush s
reful econ ful econ
omons, state omons, sta
gle ind gle ind
for
t that ha
e long run, w long run,
ed to the d to the
Distri 
eleva eleva
ibutionbutm 100
tio tio tioion
ibng employme employme

-- 130 of 352 --

M I S U S E S O F A I 117
• Housepainting becomes somewhat cheaper, so people call in
the housepainters a bit more often.
• Finally, because we pay less for housepainting, we have more
money to spend on other things, thereby increasing employment in other sectors.
Economists have tried to measure the size of these effects in various industries experiencing increased automation, but the results are
generally inconclusive.
Historically, most mainstream economists have argued from the
“big picture” view: automation increases productivity, so, as a whole,
humans are better off, in the sense that we enjoy more goods and services for the same amount of work.
Economic theory does not, unfortunately, predict that each human will be better off as a result of automation. Generally, automation increases the share of income going to capital (the owners of
the housepainting robots) and decreases the share going to labor (the
ex-housepainters). The economists Erik Brynjolfsson and Andrew
McAfee, in The Second Machine Age, argue that this has already been
happening for several decades. Data for the United States are shown
in figure 9. They indicate that between 1947 and 1973, wages and
productivity increased together, but after 1973, wages stagnated even
while productivity roughly doubled. Brynjolfsson and McAfee call
this the Great Decoupling. Other leading economists have also sounded
the alarm, including Nobel laureates Robert Shiller, Mike Spence, and
Paul Krugman; Klaus Schwab, head of the World Economic Forum;
and Larry Summers, former chief economist of the World Bank and
Treasury secretary under President Bill Clinton.
Those arguing against the notion of technological unemployment
often point to bank tellers, whose work can be done in part by ATMs,
and retail cashiers, whose work is sped up by barcodes and RFID tags
on merchandise. It is often claimed that these occupations are growing
M 9780525558613_Human_TX.indd 117 8/7/19 11:21 PM
Not
ey ey
increased ncrease
oductivity oductivity
Great De Great D
for
d Mach Ma
ral decades ral decade
ndicate ndicate
Distribution
argue g
vity, so, ty, so, aa
oy more go oy more go
unately, pre nately, pre
f automatio utomatio
me going t e going t
d decreases d decrease
onomists onomists
ne A ne A

---

## [Sección 58] Chapter 5, I spell out some far worse outcomes.

-- 131 of 352 --

118 H U M A N C O M PAT I B L E
because of technology. Indeed, the number of tellers in the United
States roughly doubled from 1970 to 2010, although it should be noted
that the US population grew by 50 percent and the financial sector by
over 400 percent in the same period, 22 so it is difficult to attribute all,
or perhaps any, of the employment growth to ATMs. Unfortunately,
between 2010 and 2016 about one hundred thousand tellers lost their
jobs, and the US Bureau of Labor Statistics (BLS) predicts another
forty thousand job losses by 2026: “Online banking and automation
technology are expected to continue replacing more job duties that
tellers traditionally performed.” 23 The data on retail cashiers are no
more encouraging: the number per capita dropped by 5 percent from
1997 to 2015, and the BLS says, “Advances in technology, such as selfservice checkout stands in retail stores and increasing online sales, will
continue to limit the need for cashiers.” Both sectors appear to be on
the downslope. The same is true of almost all low-skilled occupations
that involve working with machines.
Which occupations are about to decline as new, AI-based technolFIGURE (FRQRPLFSURGXFWLRQDQGUHDOPHGLDQZDJHVLQWKH8QLWHG6WDWHV
VLQFH 'DWDIURPWKH%XUHDXRI/DERU6WDWLVWLFV
45 55 65 75
Year
Productivity and
average real earnings
Index relative to 1970
50
150
250
Real wages of
goods-producing workers
Major sector
productivity
9780525558613_Human_TX.indd 118 8/7/19 11:21 PM
of t f
and 201 nd 201
the US Bu the US Bu
usand jo usand jo
for
grew b ew
the same p the same p
he empl e empl
Distributio
, the numb , the num
1970 to 20 1970 to 2
y 50 y 50
utDQZDJHVLQW DQZDJHVLQ
6WDWLVWLFV DWLVWLFV
tionon95
g wo

-- 132 of 352 --

M I S U S E S O F A I 119
ogy arrives? The prime example cited in the media is that of driving.
In the United States there are about 3.5 million truck drivers; many of
these jobs would be vulnerable to automation. Amazon, among other
companies, is already using self-driving trucks for freight haulage on
interstate freeways, albeit currently with human backup drivers. 24 It
seems very likely that the long-haul part of each truck journey will soon
be autonomous, while humans, for the time being, will handle city
traffic, pickup, and delivery. As a consequence of these expected developments, very few young people are interested in trucking as a career;
ironically, there is currently a significant shortage of truck drivers in the
Unites States, which is only hastening the onset of automation.
White-collar jobs are also at risk. For example, the BLS projects a
13 percent decline in per-capita employment of insurance underwriters from 2016 to 2026: “Automated underwriting software allows
workers to process applications more quickly than before, reducing
the need for as many underwriters.” If language technology develops
as expected, many sales and customer service jobs will also be vulnerable, as well as jobs in the legal profession. (In a 2018 competition, AI
software outscored experienced law professors in analyzing standard
nondisclosure agreements and completed the task two hundred times
faster. 25 ) Routine forms of computer programming—the kind that is
often outsourced today—are also likely to be automated. Indeed, almost anything that can be outsourced is a good candidate for automation, because outsourcing involves decomposing jobs into tasks that
can be parceled up and distributed in a decontextualized form. The
robot process automation industry produces software tools that achieve
exactly this effect for clerical tasks performed online.
As AI progresses, it is certainly possible—perhaps even likely—
that within the next few decades essentially all routine physical and
mental labor will be done more cheaply by machines. Since we ceased
to be hunter-gatherers thousands of years ago, our societies have used
most people as robots, performing repetitive manual and mental tasks,
so it is perhaps not surprising that robots will soon take on these roles.
M 9780525558613_Human_TX.indd 119 8/7/19 11:21 PM
Not
ne f e f
rced ed ttod od
thing that c thing that
ause ou ause ou
for
perien rie
ements and ements an
orms of orms of
Distribution
uck d
automatio utomatio
mple, the BL ple, the BL
nt of insura of insur
underwritin nderwritin
re quickly quickly
ers.” If lang .” If lang
ustomer se ustomer s
egal profes egal profe
ed l ed l

---

## [Sección 59] Chapter 5, I spell out some far worse outcomes.

-- 133 of 352 --

120 H U M A N C O M PAT I B L E
When this happens, it will push wages below the poverty line for
those people who are unable to compete for the highly skilled jobs
that remain. Larry Summers put it this way: “It may well be that,
given the possibilities for substitution [of capital for labor], some categories of labor will not be able to earn a subsistence income.” 26 This
is precisely what happened to the horses: mechanical transportation
became cheaper than the upkeep cost of a horse, so horses became pet
food. Faced with the socioeconomic equivalent of becoming pet food,
humans will be rather unhappy with their governments.
Faced with potentially unhappy humans, governments around the
world are beginning to devote some attention to the issue. Most have
already discovered that the idea of retraining everyone as a data scientist or robot engineer is a nonstarter—the world might need five or ten
million of these, but nowhere close to the billion or so jobs that are at
risk. Data science is a very tiny lifeboat for a giant cruise ship. 27
Some are working on “transition plans”—but transition to what?
We need a plausible destination in order to plan a transition—that is,
we need a plausible picture of a desirable future economy where most
of what we currently call work is done by machines.
One rapidly emerging picture is that of an economy where far
fewer people work because work is unnecessary. Keynes envisaged just
such a future in his essay “Economic Possibilities for Our Grandchildren.” He described the high unemployment afflicting Great Britain
in 1930 as a “temporary phase of maladjustment” caused by an “increase of technical efficiency” that took place “faster than we can deal
with the problem of labour absorption.” He did not, however, imagine
that in the long run—after a century of further technological
advances—there would be a return to full employment:
Thus for the first time since his creation man will be faced with
his real, his permanent problem—how to use his freedom from
pressing economic cares, how to occupy the leisure, which science
9780525558613_Human_TX.indd 120 8/7/19 11:21 PM
Not
rk b k
in his es n his es
described described
s a “tem s a “tem
for
ll wor wo
erging pict erging pic
ecause w ecause w
Distribution
ents
he issue. M issue. M
eryone as a ryone as a
orld might n might n
e billion or billion or
at for a gian for a gia
ion plans”— n plans”—
n in order t n in order
of a desirab of a desira
is d is d

-- 134 of 352 --

M I S U S E S O F A I 121
and compound interest will have won for him, to live wisely and
agreeably and well.
Such a future requires a radical change in our economic system,
because, in many countries, those who do not work face poverty or
destitution. Thus, modern proponents of Keynes’s vision usually support some form of universal basic income, or UBI. Funded by valueadded taxes or by taxes on income from capital, UBI would provide a
reasonable income to every adult, regardless of circumstance. Those
who aspire to a higher standard of living can still work without losing
the UBI, while those who do not can spend their time as they see fit.
Perhaps surprisingly, UBI has support across the political spectrum,
ranging from the Adam Smith Institute 28 to the Green Party. 29
For some, UBI represents a version of paradise. 30 For others, it represents an admission of failure—an assertion that most people will
have nothing of economic value to contribute to society. They can be
fed and housed—mostly by machines—but otherwise left to their
own devices. The truth, as always, lies somewhere in between, and it
depends largely on how one views human psychology. Keynes, in his
essay, made a clear distinction between those who strive and those
who enjoy—those “purposive” people for whom “jam is not jam unless
it is a case of jam to-morrow and never jam to-day” and those “delightful” people who are “capable of taking direct enjoyment in things.”
The UBI proposal assumes that the great majority of people are of the
delightful variety.
Keynes suggests that striving is one of the “habits and instincts of
the ordinary man, bred into him for countless generations” rather than
one of the “real values of life.” He predicts that this instinct will gradually disappear. Against this view, one may suggest that striving is intrinsic to what it means to be truly human. Rather than striving and
enjoying being mutually exclusive, they are often inseparable: true
enjoyment and lasting fulfillment come from having a purpose and
M 9780525558613_Human_TX.indd 121 8/7/19 11:21 PM
Not
se se
jam to m to--m m
ple who are ple who ar
proposa propos
for
w one on
r distinctio distincti
purposi purposi
Distribution
k wi
time as th me as th
the politica he politica
o the Green e Gree
f paradise. paradise.33
assertion ssertion
to contribut contribu
machines— achines
always, lie always, li
view view

---

## [Sección 60] Chapter 5, I spell out some far worse outcomes.

-- 135 of 352 --

122 H U M A N C O M PAT I B L E
achieving it (or at least trying), usually in the face of obstacles, rather
than from passive consumption of immediate pleasure. There is a difference between climbing Everest and being deposited on top by
helicopter.
The connection between striving and enjoying is a central theme
for our understanding of how to fashion a desirable future. Perhaps
future generations will wonder why we ever worried about such a futile thing as “work.” Just in case that change in attitudes is slow in
coming, let’s consider the economic implications of the view that most
people will be better off with something useful to do, even though the
great majority of goods and services will be produced by machines
with very little human supervision. Inevitably, most people will be
engaged in supplying interpersonal services that can be provided—or
which we prefer to be provided—only by humans. That is, if we can no
longer supply routine physical labor and routine mental labor, we can
still supply our humanity. We will need to become good at being
human. 31
Current professions of this kind include psychotherapists, executive coaches, tutors, counselors, companions, and those who care for
children and the elderly. The phrase caring professions is often used in
this context, but that is misleading: it has a positive connotation for
those providing care, to be sure, but a negative connotation of dependency and helplessness for the recipients of care. But consider this
observation, again from Keynes:
It will be those peoples, who can keep alive, and cultivate into
a fuller perfection, the art of life itself and do not sell themselves
for the means of life, who will be able to enjoy the abundance
when it comes.
All of us need help in learning “the art of life itself.” This is not a matter of dependency but of growth. The capacity to inspire others and
to confer the ability to appreciate and to create—be it in art, music,
9780525558613_Human_TX.indd 122 8/7/19 11:21 PM
Not
t th t
ng care, t care, t
d helplessne d helplessn
n, again n, again
for
unselo sel
erly. The p erly. The
at is mi at is mi
Distribution
ven
uced by m ced by m
most peop most peo
that can be t can b
humans. Th humans. Th
nd routine d routine
will need to l need to
his kind in his kind i
s, co s, co

-- 136 of 352 --

M I S U S E S O F A I 123
literature, conversation, gardening, architecture, food, wine, or video
games—is likely to be more needed than ever.
The next question is income distribution. In most countries, this
has been moving in the wrong direction for several decades. It’s a
complex issue, but one thing is clear: high incomes and high social
standing usually follow from providing high added value. The profession of childcare, to pick one example, is associated with low incomes
and low social standing. This is, in part, a consequence of the fact that
we don’t really know how to do it. Some practitioners are naturally
good at it, but many are not. Contrast this with, say, orthopedic surgery. We wouldn’t just hire bored teenagers who need a bit of spare
cash and put them to work as orthopedic surgeons at five dollars an
hour plus all they can eat from the fridge. We have put centuries of
research into understanding the human body and how to fix it when
it’s broken, and practitioners must undergo years of training to learn
all this knowledge and the skills necessary to apply it. As a result, orthopedic surgeons are highly paid and highly respected. They are
highly paid not just because they know a lot and have a lot of training
but also because all that knowledge and training actually works. It enables them to add a great deal of value to other people’s lives—especially
people with broken bits.
Unfortunately, our scientific understanding of the mind is shockingly weak and our scientific understanding of happiness and fulfillment is even weaker. We simply don’t know how to add value to each
other’s lives in consistent, predictable ways. We have had moderate
success with certain psychiatric disorders, but we are still fighting a
Hundred Years’ Literacy War over something as basic as teaching children to read. 32 We need a radical rethinking of our educational system
and our scientific enterprise to focus more attention on the human
rather than the physical world. (Joseph Aoun, president of Northeastern University, argues that universities should be teaching and studying “humanics.” 33
) It sounds odd to say that happiness should be an
engineering discipline, but that seems to be the inevitable conclusion.
M 9780525558613_Human_TX.indd 123 8/7/19 11:21 PM
Not
ken ke
nately, ou tely, ou
ak and our ak and our
ven wea ven we
for
at know kn
great deal o great deal
bits. bits.
Distribution
orth
need a bi eed a bi
geons at fiv eons at fiv
We have p e have
body and body and
undergo yea dergo ye
necessary t cessary t
y paid and y paid an
e they kno e they kno
wledg wledg

---

## [Sección 61] Chapter 5, I spell out some far worse outcomes.

-- 137 of 352 --

124 H U M A N C O M PAT I B L E
Such a discipline would build on basic science—a better understanding of how human minds work at the cognitive and emotional levels—
and would train a wide variety of practitioners, ranging from life
architects, who help individuals plan the overall shape of their life
trajectories, to professional experts in topics such as curiosity enhancement and personal resilience. If based on real science, these
professions need be no more woo-woo than bridge designers and orthopedic surgeons are today.
Reworking our education and research institutions to create this
basic science and to convert it into training programs and credentialed
professions will take decades, so it’s a good idea to start now and a pity
we didn’t start long ago. The final result—if it works—would be a
world well worth living in. Without such a rethinking, we risk an unsustainable level of socioeconomic dislocation.
Usurping Other Human Roles
We should think twice before allowing machines to take over roles
involving interpersonal services. If being human is our main selling
point to other humans, so to speak, then making imitation humans
seems like a bad idea. Fortunately for us, we have a distinct advantage
over machines when it comes to knowing how other humans feel and
how they will react. Nearly every human knows what it’s like to hit
one’s thumb with a hammer or to feel unrequited love.
Counteracting this natural human advantage is a natural human
disadvantage: the tendency to be fooled by appearances—especially
human appearances. Alan Turing warned against making robots resemble humans:34
I certainly hope and believe that no great efforts will be put into
making machines with the most distinctively human, but nonintellectual, characteristics such as the shape of the human body;
9780525558613_Human_TX.indd 124 8/7/19 11:21 PM
Not
um um
bad idea. F d idea. F
hines when hines when
will rea will rea
for
befor efo
nal service nal servic
ans, so t ns, so
Distribution
nd cr
tart now a rt now a
t w works— orks—
ethinking, inking,
ation. tion.
man Rol man Rol
allo allo

-- 138 of 352 --

M I S U S E S O F A I 125
it appears to me quite futile to make such attempts and their results would have something like the unpleasant quality of artificial
flowers.
Unfortunately, Turing’s warning has gone unheeded. Several research
groups have produced eerily lifelike robots, as shown in figure 10.
As research tools, the robots may provide insights into how humans interpret robot behavior and communication. As prototypes for
future commercial products, they represent a form of dishonesty.
They bypass our conscious awareness and appeal directly to our emotional selves, perhaps convincing us that they are endowed with real
intelligence. Imagine, for example, how much easier it would be to
switch off and recycle a squat, gray box that was malfunctioning—
even if it was squawking about not wanting to be switched off—than
it would be to do the same for JiaJia or Geminoid DK. Imagine also
how confusing and perhaps psychologically disturbing it would be for
babies and small children to be cared for by entities that appear to be
human, like their parents, but are somehow not; that appear to care
about them, like their parents, but in fact do not.
FIGURE  OHIW -LD-LDDURERWEXLOWDWWKH8QLYHUVLW\RI6FLHQFHDQG7HFKQRORJ\ RI &KLQD ULJKW  *HPLQRLG '. D URERW GHVLJQHG E\ +LURVKL ,VKLJXUR DW
2VDND8QLYHUVLW\LQ-DSDQDQGPRGHOHGRQ+HQULN6FKlUIHRI$DOERUJ8QLYHUsity in Denmark.
M 9780525558613_Human_TX.indd 125 8/7/19 11:21 PM
for
parent ren 
Distribution
ctlyy
endowed ndowed
h easier it w easier it w
hat was was m m
ting to be s ing to be s
a or Gemin or Gemi
hologically logically
be cared for be cared fo
but are so but are so
, bu , bu

-- 139 of 352 --

126 H U M A N C O M PAT I B L E
Beyond a basic capability to convey nonverbal information via facial expression and movement—which even Bugs Bunny manages to do
with ease—there is no good reason for robots to have humanoid form.
There are also good, practical reasons not to have humanoid form— for
example, our bipedal stance is relatively unstable compared to quadrupedal locomotion. Dogs, cats, and horses fit into our lives well, and
their physical form is a very good clue as to how they are likely to
behave. (Imagine if a horse suddenly started behaving like a dog!)
The same should be true of robots. Perhaps a four-legged, two-armed,
centaur-like morphology would be a good standard. An accurately humanoid robot makes as much sense as a Ferrari with a top speed of five
miles per hour or a “raspberry” ice-cream cone made from beetroottinted cream of chopped liver.
The humanoid aspect of some robots has already contributed to
political as well as emotional confusion. On October 25, 2017, Saudi
Arabia granted citizenship to Sophia, a humanoid robot that has been
described as little more than “a chatbot with a face” 35 and worse. 36
Perhaps this was a public relations stunt, but a proposal emanating
from the European Parliament’s Committee on Legal Affairs is entirely serious. 37 It recommends
creating a specific legal status for robots in the long run, so that at
least the most sophisticated autonomous robots could be established as having the status of electronic persons responsible for
making good any damage they may cause.
In other words, the robot itself would be legally responsible for damage,
rather than the owner or manufacturer. This implies that robots will
own financial assets and be subject to sanctions if they do not comply.
Taken literally, this does not make sense. For example, if we were to
imprison the robot for nonpayment, why would it care?
In addition to the needless and even absurd elevation of the status
of robots, there is a danger that the increased use of machines in
9780525558613_Human_TX.indd 126 8/7/19 11:21 PM
Not
specific le ecific le
he most sop he most so
as havin as havin
for
rliamen m
commends commend
Distribution
n acc
a top spee top spee
made from made from
s has alrea has alrea
on. On Oct . On Oc
hia, a huma a, a huma
“a chatbot chatbo
elations st elations s
t’s C t’s C

---

## [Sección 62] Chapter 5, I spell out some far worse outcomes.

-- 140 of 352 --

M I S U S E S O F A I 127
decisions affecting people will degrade the status and dignity of humans. This possibility is illustrated perfectly in a scene from the
science-fiction movie Elysium, when Max (Matt Damon) pleads his
case before his “parole officer” (figure 11) to explain why the extension of his sentence is unjustified. Needless to say, Max is unsuccessful. The parole officer even chides him for failing to display a suitably
deferential attitude.
One can think of such an assault on human dignity in two ways.
The first is obvious: by giving machines authority over humans, we
relegate ourselves to a second-class status and lose the right to participate in decisions that affect us. (A more extreme form of this is giving
machines the authority to kill humans, as discussed earlier in the
chapter.) The second is indirect: even if you believe it is not the machines making the decision but those humans who designed and commissioned the machines, the fact that those human designers and
commissioners do not consider it worthwhile to weigh the individual
circumstances of each human subject in such cases suggests that they
attach little value to the lives of others. This is perhaps a symptom of
the beginning of a great separation between an elite served by humans
and a vast underclass served, and controlled, by machines.
In the EU, Article 22 of the 2018 General Data Protection Regulation, or GDPR, explicitly forbids the granting of authority to machines in such cases:
FIGURE 11: Max (Matt Damon) meets his parole officer in Elysium.
M 9780525558613_Human_TX.indd 127 8/7/19 11:21 PM
ns th s t
he author author
The secon The secon
aking th aking th
for
by givi giv
o a o ssecond- econd
hat affec at affec
Distribution
and dign nd dign
y in a scen in a scen
(Matt Dam att Da
11) to expla 1) to expla
Needless to edless to
es him for f him for f
an assault an assault
g m g m

-- 141 of 352 --

128 H U M A N C O M PAT I B L E
The data subject shall have the right not to be subject to a decision
based solely on automated processing, including profiling, which
produces legal effects concerning him or her or similarly significantly affects him or her.
Although this sounds admirable in principle, it remains to be seen—at
least at the time of writing—how much impact this will have in practice. It is often so much easier, faster, and cheaper to leave the decisions to the machine.
One reason for all the concern about automated decisions is the potential for algorithmic bias—the tendency of machine learning algorithms to produce inappropriately biased decisions about loans, housing,
jobs, insurance, parole, sentencing, college admission, and so on. The
explicit use of criteria such as race in these decisions has been illegal for
decades in many countries and is prohibited by Article 9 of the GDPR
for a very wide range of applications. That does not mean, of course,
that by excluding race from the data we necessarily get racially unbiased decisions. For example, beginning in the 1930s, the governmentsanctioned practice of redlining caused certain zip codes in the United
States to be off-limits for mortgage lending and other forms of investment, leading to declining real-estate values. It just so happened that
those zip codes were largely populated by African Americans.
To prevent redlining, now only the first three digits of the five-digit
zip code can be used in making credit decisions. In addition, the decision process must be amenable to inspection, to ensure no other “accidental” biases are creeping in. The EU’s GDPR is often said to provide
a general “right to an explanation” for any automated decision, 38 but
the actual language of Article 14 merely requires
meaningful information about the logic involved, as well as the
significance and the envisaged consequences of such processing for
the data subject.
9780525558613_Human_TX.indd 128 8/7/19 11:21 PM
de d
es were la were la
vent redlini vent redlin
an be u an be u
for
edlinin ini
ts for mortg ts for mor
clining lining
Distribution
ision
hine learni ne learni
ns about loan s about loan
dmission, a ission,
e decisions h decisions
hibited by A ited by A
ons. That d s. That d
he data we n e data we
beginning beginning
cau cau

---

## [Sección 63] Chapter 5, I spell out some far worse outcomes.

-- 142 of 352 --

M I S U S E S O F A I 129
At present, it is unknown how courts will enforce this clause. It’s possible that the hapless consumer will just be handed a description of the
particular deep learning algorithm used to train the classifier that
made the decision.
Nowadays, the likely causes of algorithmic bias lie in the data
rather than in the deliberate malfeasance of corporations. In 2015,
Glamour magazine reported a disappointing finding: “The first female
Google image search result for ‘CEO’ appears TWELVE rows down—
and it’s Barbie.” (There were some actual women in the 2018 results,
but most of them were models portraying CEOs in generic stock photos, rather than actual female CEOs; the 2019 results are somewhat
better.) This is a consequence not of deliberate gender bias in Google’s
image search ranking but of preexisting bias in the culture that produces the data: there are far more male than female CEOs, and when
people want to depict an “archetypal” CEO in a captioned image, they
almost always pick a male figure. The fact that the bias lies primarily
in the data does not, of course, mean that there is no obligation to take
steps to counteract the problem.
There are other, more technical reasons why the naïve application of machine learning methods can produce biased outcomes.
For example, minorities are, by definition, less well represented in
population-wide data samples; hence, predictions for individual members of minorities may be less accurate if such predictions are made
largely on the basis of data from other members of the same group.
Fortunately, a good deal of attention has been paid to the problem of
removing inadvertent bias from machine learning algorithms, and
there are now methods that produce unbiased results according to
several plausible and desirable definitions of fairness. 39 The mathematical analysis of these definitions of fairness shows that they cannot
be achieved simultaneously and that, when enforced, they result in
lower prediction accuracy and, in the case of lending decisions, lower
profit for the lender. This is perhaps disappointing, but at least it
M 9780525558613_Human_TX.indd 129 8/7/19 11:21 PM
Not
min i
wide data de data
minorities m minorities
n the ba n the b
for
more t re
earning me earning m
orities a rities a
Distribution
neric
sults are s ults are s
gender bias gender bias
as in the cu n the c
than femal than femal
” CEO in a CEO in a
. The fact t The fact t
, mean that , mean th
blem. blem.
chni chni

-- 143 of 352 --

130 H U M A N C O M PAT I B L E
makes clear the trade-offs involved in avoiding algorithmic bias. One
hopes that awareness of these methods and of the issue itself will
spread quickly among policy makers, practitioners, and users.
If handing authority over individual humans to machines is sometimes problematic, what about authority over lots of humans? That is,
should we put machines in political and management roles? At present
this may seem far-fetched. Machines cannot sustain an extended conversation and lack the basic understanding of the factors that are relevant to making decisions with broad scope, such as whether to raise
the minimum wage or to reject a merger proposal from another corporation. The trend, however, is clear: machines are making decisions
at higher and higher levels of authority in many areas. Take airlines,
for example. First, computers helped in the construction of flight
schedules. Soon, they took over allocation of flight crews, the booking
of seats, and the management of routine maintenance. Next, they
were connected to global information networks to provide real-time
status reports to airline managers, so that managers could cope with
disruption effectively. Now they are taking over the job of managing
disruption: rerouting planes, rescheduling staff, rebooking passengers,
and revising maintenance schedules.
This is all to the good from the point of view of airline economics
and passenger experience. The question is whether the computer system remains a tool of humans, or humans become tools of the computer system—supplying information and fixing bugs when necessary,
but no longer understanding in any depth how the whole thing is
working. The answer becomes clear when the system goes down and
global chaos ensues until it can be brought back online. For example,
a single “computer glitch” on April 3, 2018, caused fifteen thousand
flights in Europe to be significantly delayed or canceled.40 When trading algorithms caused the 2010 “flash crash” on the New York Stock
Exchange, wiping out $1 trillion in a few minutes, the only solution
was to shut down the exchange. What happened is still not well
understood.
9780525558613_Human_TX.indd 130 8/7/19 11:21 PM
Not
the h
r experien xperien
ins a tool o ins a tool
m— m—suu
for
anes, r es,
nance sched nance sche
good fr good fr
Distribution
m an
e making d making d
y areas. Ta y areas. Ta
he construc constru
n of flight c of flight c
utine main ine main
ation netwo on netwo
gers, so tha gers, so th
they are t they are t
sche sche

---

## [Sección 64] Chapter 5, I spell out some far worse outcomes.

-- 144 of 352 --

M I S U S E S O F A I 131
Before there was any technology, human beings lived, like most
animals, hand to mouth. We stood directly on the ground, so to speak.
Technology gradually raised us up on a pyramid of machinery, increasing our footprint as individuals and as a species. There are different
ways we can design the relationship between humans and machines.
If we design it so that humans retain sufficient understanding, authority, and autonomy, the technological parts of the system can greatly
magnify human capabilities, allowing each of us to stand on a vast
pyramid of capabilities—a demigod, if you like. But consider the
worker in an online-shopping fulfillment warehouse. She is more productive than her predecessors because she has a small army of robots
bringing her storage bins to pick items from; but she is a part of a
larger system controlled by intelligent algorithms that decide where
she should stand and which items she should pick and dispatch. She is
already partly buried in the pyramid, not standing on top of it. It’s
only a matter of time before the sand fills the spaces in the pyramid
and her role is eliminated.
M 9780525558613_Human_TX.indd 131 8/7/19 11:21 PM
Not
 
for Distribution
She i
mall army all army
but she is but she is
orithms tha hms th
hould pick a ould pick a
id, not stan not stan
sand fills t and fills t

-- 145 of 352 --
OVERLY INTELLIGENT AI
The Gorilla Problem
It doesn’t require much imagination to see that making something
smarter than yourself could be a bad idea. We understand that our
control over our environment and over other species is a result of our
intelligence, so the thought of something else being more intelligent
than us—whether it’s a robot or an alien—immediately induces a
queasy feeling.
Around ten million years ago, the ancestors of the modern gorilla
created (accidentally, to be sure) the genetic lineage leading to modern
humans. How do the gorillas feel about this? Clearly, if they were able
to tell us about their species’ current situation vis-à-vis humans, the
consensus opinion would be very negative indeed. Their species has
essentially no future beyond that which we deign to allow. We do not
want to be in a similar situation vis-à-vis superintelligent machines.
I’ll call this the gorilla problem—specifically, the problem of whether
humans can maintain their supremacy and autonomy in a world that
includes machines with substantially greater intelligence.
Charles Babbage and Ada Lovelace, who designed and wrote pro9780525558613_Human_TX.indd 132 8/7/19 11:21 PM
Not
er
g.
d ten millio d ten mill
ccidenta ccidenta
for
nment men
thought of thought o
t’s a ro t’s a ro
Distribution
ination to ination to
be a bad be a bad
and and

-- 146 of 352 --

O V E R LY I N T E L L I G E N T A I 133
grams for the Analytical Engine in 1842, were aware of its potential
but seemed to have no qualms about it.1 In 1847, however, Richard
Thornton, editor of the Primitive Expounder, a religious journal, railed
against mechanical calculators:2
Mind . . . outruns itself and does away with the necessity of its
own existence by inventing machines to do its own thinking. . . .
But who knows that such machines when brought to greater perfection, may not think of a plan to remedy all their own defects
and then grind out ideas beyond the ken of mortal mind!
This is perhaps the first speculation concerning existential risk from
computing devices, but it remained in obscurity.
In contrast, Samuel Butler’s novel Erewhon, published in 1872, developed the theme in far greater depth and achieved immediate success. Erewhon is a country in which all mechanical devices have been
banned after a terrible civil war between the machinists and antimachinists. One part of the book, called “The Book of the Machines,”
explains the origins of this war and presents the arguments of both
sides. 3 It is eerily prescient of the debate that has re-emerged in the
early years of the twenty-first century.
The anti-machinists’ main argument is that machines will advance
to the point where humanity loses control:
Are we not ourselves creating our successors in the supremacy of
the earth? Daily adding to the beauty and delicacy of their organization, daily giving them greater skill and supplying more and
more of that self-regulating self-acting power which will be better
than any intellect? . . . In the course of ages we shall find ourselves
the inferior race. . . .
We must choose between the alternative of undergoing much
present suffering, or seeing ourselves gradually superseded by our
own creatures, till we rank no higher in comparison with them,
M 9780525558613_Human_TX.indd 133 8/7/19 11:21 PM
Not
ee t
machinis achinis
int where h int where
for
f this w his
prescient of rescient o
wenty- wenty-ff
Distribution
mind!
ng existenti g existenti
urity. ty.
ewhon ewhon, pub , pub
pth and ach h and ac
ich all mec h all mec
war betwe ar betw
e book, cal book, ca
war a war a

---

## [Sección 65] Chapter 5, I spell out some far worse outcomes.

-- 147 of 352 --

134 H U M A N C O M PAT I B L E
than the beasts of the field with ourselves. . . . Our bondage will
steal upon us noiselessly and by imperceptible approaches.
The narrator also relates the pro-machinists’ principal counterargument, which anticipates the man–machine symbiosis argument
that we will explore in the next chapter:
There was only one serious attempt to answer it. Its author said
that machines were to be regarded as a part of man’s own physical
nature, being really nothing but extra-corporeal limbs.
Although the anti-machinists in Erewhon win the argument, Butler
himself appears to be of two minds. On the one hand, he complains
that “Erewhonians are . . . quick to offer up common sense at the
shrine of logic, when a philosopher arises among them, who carries
them away through his reputation for especial learning” and says,
“They cut their throats in the matter of machinery.” On the other
hand, the Erewhonian society he describes is remarkably harmonious,
productive, and even idyllic. The Erewhonians fully accept the folly
of re-embarking on the course of mechanical invention, and regard
those remnants of machinery kept in museums “with the feelings of
an English antiquarian concerning Druidical monuments or flint arrow heads.”
Butler’s story was evidently known to Alan Turing, who considered the long-term future of AI in a lecture given in Manchester
in 1951:4
It seems probable that once the machine thinking method had
started, it would not take long to outstrip our feeble powers. There
would be no question of the machines dying, and they would
be able to converse with each other to sharpen their wits. At some
stage therefore we should have to expect the machines to take
control, in the way that is mentioned in Samuel Butler’s Erewhon.
9780525558613_Human_TX.indd 134 8/7/19 11:21 PM
Not
of m
ntiquarian quarian
s story s story
for
dyllic. lic
the course the cours
machiner machine
Distribution
s.
the argum the argum
e one hand, ne hand
fer up com er up com
arises amon ses amo
on for espe for espe
e matter of e matter
y he descr y he desc
The E The

-- 148 of 352 --

O V E R LY I N T E L L I G E N T A I 135
In the same year, Turing repeated these concerns in a radio lecture
broadcast throughout the UK on the BBC Third Programme:
If a machine can think, it might think more intelligently than we
do, and then where should we be? Even if we could keep the machines in a subservient position, for instance by turning off the
power at strategic moments, we should, as a species, feel greatly
humbled. . . . This new danger . . . is certainly something which
can give us anxiety.
When the Erewhonian anti-machinists “feel seriously uneasy about
the future,” they see it as their “duty to check the evil while we can
still do so,” and they destroy all the machines. Turing’s response to the
“new danger” and “anxiety” is to consider “turning off the power” (although it will be clear shortly that this is not really an option). In
Frank Herbert’s classic science-fiction novel Dune, set in the far future, humanity has barely survived the Butlerian Jihad, a cataclysmic
war with the “thinking machines.” A new commandment has emerged:
“Thou shalt not make a machine in the likeness of a human mind.” This
commandment precludes computing devices of any kind.
All these drastic responses reflect the inchoate fears that machine
intelligence evokes. Yes, the prospect of superintelligent machines does
make one uneasy. Yes, it is logically possible that such machines could
take over the world and subjugate or eliminate the human race. If that
is all one has to go on, then indeed the only plausible response available
to us, at the present time, is to attempt to curtail artificial intelligence
research—specifically, to ban the development and deployment of
general-purpose, human-level AI systems.
Like most other AI researchers, I recoil at this prospect. How dare
anyone tell me what I can and cannot think about? Anyone proposing
an end to AI research is going to have to do a lot of convincing. Ending
AI research would mean forgoing not just one of the principal avenues
for understanding how human intelligence works but also a golden
M 9780525558613_Human_TX.indd 135 8/7/19 11:21 PM
Not
asti s
evokes. Ye okes. Ye
e uneasy. Ye e uneasy. Y
the wo the wo
for
a mach mac
cludes com cludes com
c respon respon
Distribution
riously une usly une
k the evil w the evil w
es. Turing’s Turing’s
er “turning r “turning
this is not his is no
ction nove on nove
rvived the B rvived the
hines.” A n hines.” A
ne in ne in

---

## [Sección 66] Chapter 5, I spell out some far worse outcomes.

-- 149 of 352 --

136 H U M A N C O M PAT I B L E
opportunity to improve the human condition—to make a far better
civilization. The economic value of human-level AI is measurable in
the thousands of trillions of dollars, so the momentum behind AI research from corporations and governments is likely to be enormous. It
will overwhelm the vague objections of a philosopher, no matter how
great his or her “reputation for especial learning,” as Butler puts it.
A second drawback to the idea of banning general-purpose AI is that
it’s a difficult thing to ban. Progress on general-purpose AI occurs primarily on the whiteboards of research labs around the world, as mathematical problems are posed and solved. We don’t know in advance
which ideas and equations to ban, and, even if we did, it doesn’t seem
reasonable to expect that such a ban could be enforceable or effective.
To compound the difficulty still further, researchers making progress on general-purpose AI are often working on something else. As
I have already argued, research on tool AI—those specific, innocuous applications such as game playing, medical diagnosis, and travel
planning—often leads to progress on general-purpose techniques that
are applicable to a wide range of other problems and move us closer to
human-level AI.
For these reasons, it’s very unlikely that the AI community—or
the governments and corporations that control the laws and research
budgets—will respond to the gorilla problem by ending progress in
AI. If the gorilla problem can be solved only in this way, it isn’t going
to be solved.
The only approach that seems likely to work is to understand why
it is that making better AI might be a bad thing. It turns out that we
have known the answer for thousands of years.
7KH.LQJ0LGDV3UREOHP
Norbert Wiener, whom we met in Chapter 1, had a profound impact
on many fields, including artificial intelligence, cognitive science, and
9780525558613_Human_TX.indd 136 8/7/19 11:21 PM
Not
an a
l respond espond
gorilla prob gorilla pro
ed. ed.
fors, it’s very s, it’s very
d corpo d corpo
Distribution
now
did, it does d, it does
forceable or orceable or
researchers earcher
orking on so rking on so
ool A AI— I—tthh
aying, medi ng, medi
ess on ess on ggene en
e of other e of other

-- 150 of 352 --

O V E R LY I N T E L L I G E N T A I 137
control theory. Unlike most of his contemporaries, he was particularly
concerned with the unpredictability of complex systems operating in
the real world. (He wrote his first paper on this topic at the age of
ten.) He became convinced that the overconfidence of scientists and
engineers in their ability to control their creations, whether military
or civilian, could have disastrous consequences.
In 1950, Wiener published The Human Use of Human Beings, 5
whose front-cover blurb reads, “The ‘mechanical brain’ and similar
machines can destroy human values or enable us to realize them as
never before.” 6 He gradually refined his ideas over time and by 1960
had identified one core issue: the impossibility of defining true human
purposes correctly and completely. This, in turn, means that what I
have called the standard model—whereby humans attempt to imbue
machines with their own purposes—is destined to fail.
We might call this the King Midas problem: Midas, a legendary
king in ancient Greek mythology, got exactly what he asked for—
namely, that everything he touched should turn to gold. Too late, he
discovered that this included his food, his drink, and his family members, and he died in misery and starvation. The same theme is ubiquitous in human mythology. Wiener cites Goethe’s tale of the sorcerer’s
apprentice, who instructs the broom to fetch water—but doesn’t say
how much water and doesn’t know how to make the broom stop.
A technical way of saying this is that we may suffer from a failure
of value alignment—we may, perhaps inadvertently, imbue machines
with objectives that are imperfectly aligned with our own. Until recently, we were shielded from the potentially catastrophic consequences by the limited capabilities of intelligent machines and the
limited scope that they have to affect the world. (Indeed, most AI
work was done with toy problems in research labs.) As Norbert Wiener put it in his 1964 book God and Golem,7
In the past, a partial and inadequate view of human purpose has
been relatively innocuous only because it has been accompanied by
M 9780525558613_Human_TX.indd 137 8/7/19 11:21 PM
Not
o in i
water and ter and
hnical way hnical way
alignmen alignme
for
isery a ry
hology. Wi hology. W
structs t tructs t
d
Distribution
me a
defining tru fining tru
urn, means rn, means
humans att mans at
destined to destined to
das problem as proble
gy, got exa got exa
ouched shou ouched sh
d his food d his food
d st d st

---

## [Sección 67] Chapter 5, I spell out some far worse outcomes.

-- 151 of 352 --

138 H U M A N C O M PAT I B L E
technical limitations. . . . This is only one of the many places where
human impotence has shielded us from the full destructive impact
of human folly.
Unfortunately, this period of shielding is rapidly coming to an end.
We have already seen how content-selection algorithms on social
media wrought havoc on society in the name of maximizing ad revenues. In case you are thinking to yourself that ad revenue maximization was already an ignoble goal that should never have been pursued,
let’s suppose instead that we ask some future superintelligent system
to pursue the noble goal of finding a cure for cancer—ideally as quickly
as possible, because someone dies from cancer every 3.5 seconds.
Within hours, the AI system has read the entire biomedical literature
and hypothesized millions of potentially effective but previously untested chemical compounds. Within weeks, it has induced multiple
tumors of different kinds in every living human being so as to carry
out medical trials of these compounds, this being the fastest way to
find a cure. Oops.
If you prefer solving environmental problems, you might ask the
machine to counter the rapid acidification of the oceans that results
from higher carbon dioxide levels. The machine develops a new catalyst that facilitates an incredibly rapid chemical reaction between
ocean and atmosphere and restores the oceans’ pH levels. Unfortunately, a quarter of the oxygen in the atmosphere is used up in the
process, leaving us to asphyxiate slowly and painfully. Oops.
These kinds of world-ending scenarios are unsubtle—as one might
expect, perhaps, for world-ending scenarios. But there are many scenarios in which a kind of mental asphyxiation “steals upon us noiselessly
and by imperceptible approaches.” The prologue to Max Tegmark’s
Life 3.0 describes in some detail a scenario in which a superintelligent
machine gradually assumes economic and political control over the
entire world while remaining essentially undetected. The Internet and
the global-scale machines that it supports—the ones that already
9780525558613_Human_TX.indd 138 8/7/19 11:21 PM
on on
litates an ates an
d atmosphe d atmosph
quarter quarter
for
g envir nv
the rapid a the rapid
dioxide dioxide
Distribution
elligg
—ideally a deally a
er every 3. r every 3.
ntire biomed biome
effective b effective b
weeks, it h weeks, it
y living hum iving hum
mpounds, t mpounds,
onm onm

-- 152 of 352 --

O V E R LY I N T E L L I G E N T A I 139
interact with billions of “users” on a daily basis—provide the perfect
medium for the growth of machine control over humans.
I don’t expect that the purpose put into such machines will be of
the “take over the world” variety. It is more likely to be profit maximization or engagement maximization or, perhaps, even an apparently
benign goal such as achieving higher scores on regular user happiness
surveys or reducing our energy usage. Now, if we think of ourselves as
entities whose actions are expected to achieve our objectives, there
are two ways to change our behavior. The first is the old-fashioned
way: leave our expectations and objectives unchanged, but change our
circumstances—for example, by offering money, pointing a gun at us,
or starving us into submission. That tends to be expensive and difficult for a computer to do. The second way is to change our expectations and objectives. This is much easier for a machine. It is in contact
with you for hours every day, controls your access to information, and
provides much of your entertainment through games, TV, movies, and
social interaction.
The reinforcement learning algorithms that optimize social-media
click-through have no capacity to reason about human behavior—in
fact, they do not even know in any meaningful sense that humans
exist. For machines with much greater understanding of human psychology, beliefs, and motivations, it should be relatively easy to gradually guide us in directions that increase the degree of satisfaction of
the machine’s objectives. For example, it might reduce our energy
consumption by persuading us to have fewer children, eventually—
and inadvertently—achieving the dreams of anti-natalist philosophers
who wish to eliminate the noxious impact of humanity on the natural world.
With a bit of practice, you can learn to identify ways in which the
achievement of more or less any fixed objective can result in arbitrarily bad outcomes. One of the most common patterns involves
omitting something from the objective that you do actually care
about. In such cases—as in the examples given above—the AI system
M 9780525558613_Human_TX.indd 139 8/7/19 11:21 PM
Not
ine n
iefs, and m s, and m
e us in dire e us in dir
hine’s o hine’s o
for
capac apa
even know ven know
s with m with m
Distribution
, but
pointing a inting a
be expensiv e expensiv
is to chang to chan
r for a mach for a mach
ls your acce your acc
ment throug nt throug
ning algori ning algor
ty to ty to

---

## [Sección 68] Chapter 5, I spell out some far worse outcomes.

-- 153 of 352 --

140 H U M A N C O M PAT I B L E
will often find an optimal solution that sets the thing you do care
about, but forgot to mention, to an extreme value. So, if you say to
your self-driving car, “Take me to the airport as fast as possible!” and
it interprets this literally, it will reach speeds of 180 miles per hour
and you’ll go to prison. (Fortunately, the self-driving cars currently
contemplated won’t accept such a request.) If you say, “Take me to the
airport as fast as possible while not exceeding the speed limit,” it will
accelerate and brake as hard as possible, swerving in and out of traffic
to maintain the maximum speed in between. It may even push other
cars out of the way to gain a few seconds in the scrum at the airport
terminal. And so on—eventually, you will add enough considerations
so that the car’s driving roughly approximates that of a skilled human
driver taking someone to the airport in a bit of a hurry.
Driving is a simple task with only local impacts, and the AI systems currently being built for driving are not very intelligent. For
these reasons, many of the potential failure modes can be anticipated;
others will reveal themselves in driving simulators or in millions of
miles of testing with professional drivers ready to take over if something goes wrong; still others will appear only later, when the cars are
already on the road and something weird happens.
Unfortunately, with superintelligent systems that can have a global
impact, there are no simulators and no do-overs. It’s certainly very
hard, and perhaps impossible, for mere humans to anticipate and rule
out in advance all the disastrous ways the machine could choose to
achieve a specified objective. Generally speaking, if you have one goal
and a superintelligent machine has a different, conflicting goal, the
machine gets what it wants and you don’t.
)HDUDQG*UHHG,QVWUXPHQWDO*RDOV
If a machine pursuing an incorrect objective sounds bad enough,
there’s worse. The solution suggested by Alan Turing—turning off the
9780525558613_Human_TX.indd 140 8/7/19 11:21 PM
Not
y, w y,
e are no s re no s
perhaps im perhaps im
vance al vance al
for
others er
and someth and somet
with supe ith supe
Distribution
m at t
ugh consid h consid
hat of a skil at of a skil
of a hurry. a hurry
cal impacts cal impact
ng are not are not
ial failure m failure m
in driving in driving
sional driv sional dri
will a will a

-- 154 of 352 --

O V E R LY I N T E L L I G E N T A I 141
power at strategic moments—may not be available, for a very simple
reason: you can’t fetch the coffee if you’re dead.
Let me explain. Suppose a machine has the objective of fetching
the coffee. If it is sufficiently intelligent, it will certainly understand
that it will fail in its objective if it is switched off before completing its
mission. Thus, the objective of fetching coffee creates, as a necessary
subgoal, the objective of disabling the off-switch. The same is true for
curing cancer or calculating the digits of pi. There’s really not a lot you
can do once you’re dead, so we can expect AI systems to act preemptively to preserve their own existence, given more or less any definite
objective.
If that objective is in conflict with human preferences, then we
have exactly the plot of 2001: A Space Odyssey, in which the HAL
9000 computer kills four of the five astronauts on board the ship to
prevent interference with its mission. Dave, the last remaining astronaut, manages to switch HAL off after an epic battle of wits—
presumably to keep the plot interesting. But if HAL had been truly
superintelligent, Dave would have been switched off.
It is important to understand that self-preservation doesn’t have to
be any sort of built-in instinct or prime directive in machines. (So
Isaac Asimov’s Third Law of Robotics, 8 which begins “A robot must
protect its own existence,” is completely unnecessary.) There is no
need to build self-preservation in because it is an instrumental goal—a
goal that is a useful subgoal of almost any original objective. 9 Any
entity that has a definite objective will automatically act as if it also
has instrumental goals.
In addition to being alive, having access to money is an instrumental goal within our current system. Thus, an intelligent machine might
want money, not because it’s greedy but because money is useful for
achieving all sorts of goals. In the movie Transcendence, when Johnny
Depp’s brain is uploaded into the quantum supercomputer, the first
thing the machine does is copy itself onto millions of other computers
on the Internet so that it cannot be switched off. The second thing it
M 9780525558613_Human_TX.indd 141 8/7/19 11:21 PM
Not
Th T
own exist n exist
uild ld sself- elf-pp
is a us is a u
hh
for
nderst ers
ltt--in instinc n instin
rd Law rd Law
Distribution
less
n preferenc preferenc
dyssey ey, in w , in w yyy
tronauts on ronauts on
n. Dave, the Dave, th
off after ff after
interesting interestin
ld have be ld have be
nd t nd t

---

## [Sección 69] Chapter 5, I spell out some far worse outcomes.

-- 155 of 352 --

142 H U M A N C O M PAT I B L E
does is make a quick killing on the stock market to fund its expansion plans.
And what, exactly, are those expansion plans? They include designing and building a much larger quantum supercomputer; doing AI
research; and discovering new knowledge of physics, neuroscience, and
biology. These resource objectives—computing power, algorithms, and
knowledge—are also instrumental goals, useful for achieving any overarching objective.10 They seem harmless enough until one realizes
that the acquisition process will continue without limit. This seems to
create inevitable conflict with humans. And of course, the machine,
equipped with ever-better models of human decision making, will
anticipate and defeat our every move in this conflict.
Intelligence Explosions
I. J. Good was a brilliant mathematician who worked with Alan Turing
at Bletchley Park, breaking German codes during World War II. He
shared Turing’s interests in machine intelligence and statistical inference. In 1965, he wrote what is now his best-known paper, “Speculations Concerning the First Ultraintelligent Machine.” 11 The first sentence
suggests that Good, alarmed by the nuclear brinkmanship of the Cold
War, regarded AI as a possible savior for humanity: “The survival of man
depends on the early construction of an ultraintelligent machine.” As
the paper proceeds, however, he becomes more circumspect. He introduces the notion of an intelligence explosion, but, like Butler, Turing, and
Wiener before him, he worries about losing control:
Let an ultraintelligent machine be defined as a machine that can
far surpass all the intellectual activities of any man however clever.
Since the design of machines is one of these intellectual activities,
an ultraintelligent machine could design even better machines;
there would then unquestionably be an “intelligence explosion,”
9780525558613_Human_TX.indd 142 8/7/19 11:21 PM
Not
the th
Good, ala ood, ala
ded AI as a ded AI as a
n the e n the e
for
s in m n m
rote what i rote what
First Ul First Ul
Distribution
e, th
ision mak on mak
nflict. flict.
ematician w matician
German c German
chin chin

-- 156 of 352 --

O V E R LY I N T E L L I G E N T A I 143
and the intelligence of man would be left far behind. Thus the first
ultraintelligent machine is the last invention that man need ever
make, provided that the machine is docile enough to tell us how to
keep it under control. It is curious that this point is made so seldom outside science fiction.
This paragraph is a staple of any discussion of superintelligent AI,
although the caveats at the end are usually left out. Good’s point can
be strengthened by noting that not only could the ultraintelligent machine improve its own design; it’s likely that it would do so because, as
we have seen, an intelligent machine expects to benefit from improving its hardware and software. The possibility of an intelligence explosion is often cited as the main source of risk to humanity from AI
because it would give us so little time to solve the control problem.12
Good’s argument certainly has plausibility via the natural analogy
to a chemical explosion in which each molecular reaction releases
enough energy to initiate more than one additional reaction. On the
other hand, it is logically possible that there are diminishing returns to
intelligence improvements, so that the process peters out rather than
exploding.13 There’s no obvious way to prove that an explosion will
necessarily occur.
The diminishing-returns scenario is interesting in its own right. It
could arise if it turns out that achieving a given percentage improvement becomes much harder as the machine becomes more intelligent.
(I’m assuming for the sake of argument that general-purpose machine
intelligence is measurable on some kind of linear scale, which I doubt
will ever be strictly true.) In that case, humans won’t be able to create superintelligence either. If a machine that is already superhuman
runs out of steam when trying to improve its own intelligence, then
humans will run out of steam even sooner.
Now, I’ve never heard a serious argument to the effect that creating any given level of machine intelligence is simply beyond the capacity of human ingenuity, but I suppose one must concede it’s logically
M 9780525558613_Human_TX.indd 143 8/7/19 11:21 PM
Not
r..
inishing- ishing-rr
se if it turn se if it tur
omes m omes m
for
ents, s ts,
’s no obvio s no obvi
Distribution
do so
enefit from efit from
of an intellig f an intellig
risk to hum to hum
o solve the c solve the
lausibility v usibility
ch each m each m
re than one re than o
ssible that ssible tha
tha tha

---

## [Sección 70] Chapter 5, I spell out some far worse outcomes.

-- 157 of 352 --

144 H U M A N C O M PAT I B L E
possible. “Logically possible” and “I’m willing to bet the future of the
human race on it” are, of course, two completely different things. Betting against human ingenuity seems like a losing strategy.
If an intelligence explosion does occur, and if we have not already
solved the problem of controlling machines with only slightly superhuman intelligence—for example, if we cannot prevent them from
making these recursive self-improvements—then we would have no
time left to solve the control problem and the game would be over.
This is Bostrom’s hard takeoff scenario, in which the machine’s intelligence increases astronomically in just days or weeks. In Turing’s words,
it is “certainly something which can give us anxiety.”
The possible responses to this anxiety seem to be to retreat from
AI research, to deny that there are risks inherent in developing advanced AI, to understand and mitigate the risks through the design of
AI systems that necessarily remain under human control, and to
resign—simply to cede the future to intelligent machines.
Denial and mitigation are the subjects of the remainder of the book.
As I have already argued, retreat from AI research is both unlikely to
happen (because the benefits forgone are too great) and very difficult
to bring about. Resignation seems to be the worst possible response. It
is often accompanied by the idea that AI systems that are more intelligent than us somehow deserve to inherit the planet, leaving humans to
go gentle into that good night, comforted by the thought that our brilliant electronic progeny are busy pursuing their objectives. This view
was promulgated by the roboticist and futurist Hans Moravec,14 who
writes, “The immensities of cyberspace will be teeming with unhuman
superminds, engaged in affairs that are to human concerns as ours are
to those of bacteria.” This seems to be a mistake. Value, for humans, is
defined primarily by conscious human experience. If there are no humans and no other conscious entities whose subjective experience matters to us, there is nothing of value occurring.
9780525558613_Human_TX.indd 144 8/7/19 11:21 PM
Not
nie ni
omehow mehow
nto that go nto that go
ronic pr ronic p
for
enefits fit
gnation seem nation see
d by the by the
d
Distribution
Turi
y.
to be to re to be to re
herent in d ent in
he risks thro e risks thro
under hum nder hu
to intellige o intellige
he subjects o he subjects
treat from treat from
orgo orgo

-- 158 of 352 --
THE NOT- SO - GREAT
AI DEBATE
The implications of introducing a second intelligent species onto
Earth are far-reaching enough to deserve hard thinking.” 1 So
ended The Economist magazine’s review of Nick Bostrom’s Superintelligence. Most would interpret this as a classic example of British
understatement. Surely, you might think, the great minds of today are
already doing this hard thinking—engaging in serious debate, weighing up the risks and benefits, seeking solutions, ferreting out loopholes
in solutions, and so on. Not yet, as far as I am aware.
When one first introduces these ideas to a technical audience, one
can see the thought bubbles popping out of their heads, beginning
with the words “But, but, but . . .” and ending with exclamation marks.
The first kind of but takes the form of denial. The deniers say,
“But this can’t be a real problem, because XYZ.” Some of the XYZs
reflect a reasoning process that might charitably be described as wishful thinking, while others are more substantial. The second kind of
but takes the form of deflection: accepting that the problems are
real but arguing that we shouldn’t try to solve them, either because
M 9780525558613_Human_TX.indd 145 8/7/19 11:21 PM
Not
his i
sks and be s and be
ons, and so ons, and so
n one fir n one fi
for
ld inte int
urely, you m rely, you
hard hard tthi hi
Distribution
ucing a seco ng a seco
g enough to g enough
magazine magazine
pret pret

-- 159 of 352 --

146 H U M A N C O M PAT I B L E
they’re unsolvable or because there are more important things to focus on than the end of civilization or because it’s best not to mention
them at all. The third kind of but takes the form of an oversimplified, instant solution: “But can’t we just do ABC?” As with denial,
some of the ABCs are instantly regrettable. Others, perhaps by accident, come closer to identifying the true nature of the problem.
I don’t mean to suggest that there cannot be any reasonable objections to the view that poorly designed superintelligent machines would
present a serious risk to humanity. It’s just that I have yet to see such
an objection. Since the issue seems to be so important, it deserves a
public debate of the highest quality. So, in the interests of having that
debate, and in the hope that the reader will contribute to it, let me
provide a quick tour of the highlights so far, such as they are.
Denial
Denying that the problem exists at all is the easiest way out. Scott
Alexander, author of the Slate Star Codex blog, began a well-known
article on AI risk as follows:2 “I first became interested in AI risk back
around 2007. At the time, most people’s response to the topic was
‘Haha, come back when anyone believes this besides random Internet
crackpots.’ ”
Instantly regrettable remarks
A perceived threat to one’s lifelong vocation can lead a perfectly
intelligent and usually thoughtful person to say things they might
wish to retract on further analysis. That being the case, I will not
name the authors of the following arguments, all of whom are wellknown AI researchers. I’ve included refutations of the arguments, even
though they are quite unnecessary.
9780525558613_Human_TX.indd 146 8/7/19 11:21 PM
Not
t th t
back whe ck whe
”
for
he Sla Sla
follows: follows:22 “I “
e time, e time,
Distribution
nt, it
rests of hav ts of hav
ontribute to ntribute to
such as the h as th
exists at a exists at a
Sta Sta

---

## [Sección 71] Chapter 5, I spell out some far worse outcomes.

-- 160 of 352 --

T H E N O T- S O - G R E AT A I D E B AT E 147
• Electronic calculators are superhuman at arithmetic. Calculators didn’t take over the world; therefore, there is no reason to
worry about superhuman AI.
• Refutation: intelligence is not the same as arithmetic, and the
arithmetic ability of calculators does not equip them to take
over the world.
• Horses have superhuman strength, and we don’t worry about
proving that horses are safe; so we needn’t worry about proving
that AI systems are safe.
• Refutation: intelligence is not the same as physical strength, and
the strength of horses does not equip them to take over the world.
• Historically, there are zero examples of machines killing millions of humans, so, by induction, it cannot happen in the
future.
• Refutation: there’s a first time for everything, before which there
were zero examples of it happening.
• No physical quantity in the universe can be infinite, and that
includes intelligence, so concerns about superintelligence are
overblown.
• Refutation: superintelligence doesn’t need to be infinite to be
problematic; and physics allows computing devices billions of
times more powerful than the human brain.
• We don’t worry about species-ending but highly unlikely possibilities such as black holes materializing in near-Earth orbit,
so why worry about superintelligent AI?
• Refutation: if most physicists on Earth were working to make
such black holes, wouldn’t we ask them if it was safe?
It’s complicated
It is a staple of modern psychology that a single IQ number cannot
characterize the full richness of human intelligence. 3 There are, the
M 9780525558613_Human_TX.indd 147 8/7/19 11:21 PM
Not
mat ma
es more po more po
We don’t wor We don’t wo
bilities s bilities s
for: superintell superinte
c; and p c; and p
Distribution
l stre
ake over the e over the
machines kil achines k
t cannot ha nnot h
for everythin r everythi
appening. pening.
the univer the unive
so concer so concer

-- 161 of 352 --

148 H U M A N C O M PAT I B L E
theory says, different dimensions of intelligence: spatial, logical, linguistic, social, and so on. Alice, our soccer player from Chapter 2,
might have more spatial intelligence than her friend Bob, but less social intelligence. Thus, we cannot line up all humans in strict order of
intelligence.
This is even more true of machines, because their abilities are
much narrower. The Google search engine and AlphaGo have almost
nothing in common, besides being products of two subsidiaries of the
same parent corporation, and so it makes no sense to say that one is
more intelligent than the other. This makes notions of “machine IQ”
problematic and suggests that it’s misleading to describe the future as
a one-dimensional IQ race between humans and machines.
Kevin Kelly, founding editor of Wired magazine and a remarkably
perceptive technology commentator, takes this argument one step
further. In “The Myth of a Superhuman AI,” 4 he writes, “Intelligence
is not a single dimension, so ‘smarter than humans’ is a meaningless
concept.” In a single stroke, all concerns about superintelligence are
wiped away.
Now, one obvious response is that a machine could exceed human
capabilities in all relevant dimensions of intelligence. In that case,
even by Kelly’s strict standards, the machine would be smarter than a
human. But this rather strong assumption is not necessary to refute
Kelly’s argument. Consider the chimpanzee. Chimpanzees probably
have better short-term memory than humans, even on humanoriented tasks such as recalling sequences of digits. 5 Short-term memory is an important dimension of intelligence. By Kelly’s argument,
then, humans are not smarter than chimpanzees; indeed, he would
claim that “smarter than a chimpanzee” is a meaningless concept. This
is cold comfort to the chimpanzees (and bonobos, gorillas, orangutans,
whales, dolphins, and so on) whose species survive only because we
deign to allow it. It is colder comfort still to all those species that we
have already wiped out. It’s also cold comfort to humans who might
be worried about being wiped out by machines.
9780525558613_Human_TX.indd 148 8/7/19 11:21 PM
Not
tric ri
this rathe s rathe
gument. Co gument. C
er er shor hor
for
espons on
elevant dim elevant di
t standa standa
Distribution
f “m
cribe the f ibe the f
d machines machines
agazine and zine an
kes this ar kes this ar
man AI,” n AI,”44 he h
rter than h er than h
ll concerns ll concern
is th is th

---

## [Sección 72] Chapter 5, I spell out some far worse outcomes.

-- 162 of 352 --

T H E N O T- S O - G R E AT A I D E B AT E 149
It’s impossible
Even before the birth of AI in 1956, august intellectuals were harrumphing and saying that intelligent machines were impossible. Alan
Turing devoted much of his seminal 1950 paper, “Computing Machinery and Intelligence,” to refuting these arguments. Ever since, the AI
community has been fending off similar claims of impossibility from
philosophers, 6 mathematicians,7 and others. In the current debate over
superintelligence, several philosophers have exhumed these impossibility claims to prove that humanity has nothing to fear. 8,9 This comes
as no surprise.
The One Hundred Year Study on Artificial Intelligence, or AI100,
is an ambitious, long-term project housed at Stanford University. Its
goal is to keep track of AI, or, more precisely, to “study and anticipate
how the effects of artificial intelligence will ripple through every aspect of how people work, live and play.” Its first major report, “Artificial Intelligence and Life in 2030,” does come as a surprise.10 As might
be expected, it emphasizes the benefits of AI in areas such as medical
diagnosis and automotive safety. What’s unexpected is the claim that
“unlike in the movies, there is no race of superhuman robots on the
horizon or probably even possible.”
To my knowledge, this is the first time that serious AI researchers
have publicly espoused the view that human-level or superhuman AI
is impossible—and this in the middle of a period of extremely rapid
progress in AI research, when barrier after barrier is being breached.
It’s as if a group of leading cancer biologists announced that they had
been fooling us all along: they’ve always known that there will never
be a cure for cancer.
What could have motivated such a volte-face? The report provides
no arguments or evidence whatever. (Indeed, what evidence could
there be that no physically possible arrangement of atoms outperforms
the human brain?) I suspect there are two reasons. The first is the
natural desire to disprove the existence of the gorilla problem, which
M 9780525558613_Human_TX.indd 149 8/7/19 11:21 PM
Not
abl ab
nowledge, wledge,
licly espou licly espou
ible— ible—a
for
ive saf e sa
ies, there i ies, there
y even p even p
Distribution
ar.8
Intelligenc Intelligenc
at Stanford Stanfor
cisely, to “st isely, to “st
nce will rip e will ri
d play.” Its f play.” Its
030,” 030,” does does c s
the benef the benef
ty. W ty. W

-- 163 of 352 --

150 H U M A N C O M PAT I B L E
presents a very uncomfortable prospect for the AI researcher; certainly, if human-level AI is impossible, the gorilla problem is neatly
dispatched. The second reason is tribalism—the instinct to circle the
wagons against what are perceived to be “attacks” on AI.
It seems odd to perceive the claim that superintelligent AI is possible as an attack on AI, and even odder to defend AI by saying that AI
will never succeed in its goals. We cannot insure against future catastrophe simply by betting against human ingenuity.
We have made such bets before and lost. As we saw earlier, the
physics establishment of the early 1930s, personified by Lord Rutherford, confidently believed that extracting atomic energy was impossible; yet Leo Szilard’s invention of the neutron-induced nuclear chain
reaction in 1933 proved that confidence to be misplaced.
Szilard’s breakthrough came at an unfortunate time: the beginning of an arms race with Nazi Germany. There was no possibility of
developing nuclear technology for the greater good. A few years later,
having demonstrated a nuclear chain reaction in his laboratory, Szilard
wrote, “We switched everything off and went home. That night, there
was very little doubt in my mind that the world was headed for grief.”
It’s too soon to worry about it
It’s common to see sober-minded people seeking to assuage public
concerns by pointing out that because human-level AI is not likely to
arrive for several decades, there is nothing to worry about. For example, the AI100 report says there is “no cause for concern that AI is an
imminent threat to humankind.”
This argument fails on two counts. The first is that it attacks a
straw man. The reasons for concern are not predicated on imminence.
For example, Nick Bostrom writes in Superintelligence, “It is no part of
the argument in this book that we are on the threshold of a big breakthrough in artificial intelligence, or that we can predict with any precision when such a development might occur.” The second is that a
9780525558613_Human_TX.indd 150 8/7/19 11:21 PM
Not
oon to n t
mmon to se mon to s
by point by point
for
my m y m
wo wo
Distribution
y Lo
nergy was rgy was
nduced nu nduced nu
be misplace misplace
unfortunate nfortunate
many. There ny. There
the greater he greater
chain react chain rea
hing off an hing off an
nd th nd th

---

## [Sección 73] Chapter 5, I spell out some far worse outcomes.

-- 164 of 352 --

T H E N O T- S O - G R E AT A I D E B AT E 151
long-term risk can still be cause for immediate concern. The right
time to worry about a potentially serious problem for humanity depends not just on when the problem will occur but also on how long
it will take to prepare and implement a solution.
For example, if we were to detect a large asteroid on course to
collide with Earth in 2069, would we say it’s too soon to worry? Quite
the opposite! There would be a worldwide emergency project to develop the means to counter the threat. We wouldn’t wait until 2068
to start working on a solution, because we can’t say in advance how
much time is needed. Indeed, NASA’s Planetary Defense project is
already working on possible solutions, even though “no known asteroid poses a significant risk of impact with Earth over the next 100
years.” In case that makes you feel complacent, they also say, “About
74 percent of near-Earth objects larger than 460 feet still remain to be
discovered.”
And if we consider the global catastrophic risks from climate
change, which are predicted to occur later in this century, is it too
soon to take action to prevent them? On the contrary, it may be too
late. The relevant time scale for superhuman AI is less predictable, but
of course that means it, like nuclear fission, might arrive considerably
sooner than expected.
One formulation of the “it’s too soon to worry” argument that has
gained currency is Andrew Ng’s assertion that “it’s like worrying about
overpopulation on Mars.” 11 (He later upgraded this from Mars to Alpha Centauri.) Ng, a former Stanford professor, is a leading expert on
machine learning, and his views carry some weight. The assertion appeals to a convenient analogy: not only is the risk easily managed and
far in the future but also it’s extremely unlikely we’d even try to
move billions of humans to Mars in the first place. The analogy is a
false one, however. We are already devoting huge scientific and technical resources to creating ever-more-capable AI systems, with very
little thought devoted to what happens if we succeed. A more apt
analogy, then, would be working on a plan to move the human race to
M 9780525558613_Human_TX.indd 151 8/7/19 11:21 PM
pect e
mulation o lation o
urrency is A urrency is A
ulation o ulation
for
scale f ale
ns it, like n ns it, like n
ed. ed.
f
Distribution
efens
gh “no kno “no kno
arth over th rth over th
cent, they a t, they
han 460 fee han 460 fee
bal catastro l catastr
to occur la to occur
ent them? ent them
or su or su

-- 165 of 352 --

152 H U M A N C O M PAT I B L E
Mars with no consideration for what we might breathe, drink, or eat
once we arrive. Some might call this plan unwise. Alternatively, one
could take Ng’s point literally, and respond that landing even a single
person on Mars would constitute overpopulation, because Mars has a
carrying capacity of zero. Thus, groups that are currently planning to
send a handful of humans to Mars are worrying about overpopulation
on Mars, which is why they are developing life-support systems.
We’re the experts
In every discussion of technological risk, the pro-technology camp
wheels out the claim that all concerns about risk arise from ignorance.
For example, here’s Oren Etzioni, CEO of the Allen Institute for AI
and a noted researcher in machine learning and natural language
understanding:12
At the rise of every technology innovation, people have been scared.
From the weavers throwing their shoes in the mechanical looms at
the beginning of the industrial era to today’s fear of killer robots,
our response has been driven by not knowing what impact the new
technology will have on our sense of self and our livelihoods. And
when we don’t know, our fearful minds fill in the details.
Popular Science published an article titled “Bill Gates Fears AI, but AI
Researchers Know Better”:13
When you talk to A.I. researchers—again, genuine A.I. researchers, people who grapple with making systems that work at all,
much less work too well—they are not worried about superintelligence sneaking up on them, now or in the future. Contrary to the
spooky stories that Musk seems intent on telling, A.I. researchers
aren’t frantically installing firewalled summoning chambers and
self-destruct countdowns.
9780525558613_Human_TX.indd 152 8/7/19 11:21 PM
Not
ll h l
don’t know n’t know
ience ience pu pu
for
indust dus
been driven been driven
ave on o ve on o
Distribution
-technolo echnolo
k arise from arise from
the Allen In Allen I
arning and rning and
y innovation y innovatio
g their sho g their sho
al e al e

---

## [Sección 74] Chapter 5, I spell out some far worse outcomes.

-- 166 of 352 --

T H E N O T- S O - G R E AT A I D E B AT E 153
This analysis was based on a sample of four, all of whom in fact said in
their interviews that the long-term safety of AI was an important issue.
Using very similar language to the Popular Science article, David
Kenny, at that time a vice president at IBM, wrote a letter to the US
Congress that included the following reassuring words:14
When you actually do the science of machine intelligence, and when
you actually apply it in the real world of business and society—as
we have done at IBM to create our pioneering cognitive computing
system, Watson—you understand that this technology does not
support the fear-mongering commonly associated with the AI debate today.
The message is the same in all three cases: “Don’t listen to them; we’re
the experts.” Now, one can point out that this is really an ad hominem
argument that attempts to refute the message by delegitimizing the
messengers, but even if one takes it at face value, the argument doesn’t
hold water. Elon Musk, Stephen Hawking, and Bill Gates are certainly
very familiar with scientific and technological reasoning, and Musk
and Gates in particular have supervised and invested in many AI research projects. And it would be even less plausible to argue that Alan
Turing, I. J. Good, Norbert Wiener, and Marvin Minsky are unqualified to discuss AI. Finally, Scott Alexander’s blog piece mentioned
earlier, which is titled “AI Researchers on AI Risk,” notes that “AI researchers, including some of the leaders in the field, have been instrumental in raising issues about AI risk and superintelligence from the
very beginning.” He lists several such researchers, and the list is now
much longer.
Another standard rhetorical move for the “defenders of AI” is to
describe their opponents as Luddites. Oren Etzioni’s reference to
“weavers throwing their shoes in the mechanical looms” is just this: the
Luddites were artisan weavers in the early nineteenth century protesting the introduction of machinery to replace their skilled labor. In 2015,
M 9780525558613_Human_TX.indd 153 8/7/19 11:21 PM
Not
An A
Good, N ood, N
discuss AI. discuss AI
which is which is
for
entific tifi
cular have s ular have
d it wou d it wou
Distribution
ogyy
d with the with the
es: “Don’t li s: “Don’t li
t that this is hat this i
e the mess the mess
kes it at fac kes it at fa
phen Haw phen Haw
and and

-- 167 of 352 --

154 H U M A N C O M PAT I B L E
the Information Technology and Innovation Foundation gave its annual
Luddite Award to “alarmists touting an artificial intelligence apocalypse.” It’s an odd definition of “Luddite” that includes Turing, Wiener,
Minsky, Musk, and Gates, who rank among the most prominent contributors to technological progress in the twentieth and twenty-first
centuries.
The accusation of Luddism represents a misunderstanding of the
nature of the concerns raised and the purpose for raising them. It is as
if one were to accuse nuclear engineers of Luddism if they point out
the need for control of the fission reaction. As with the strange phenomenon of AI researchers suddenly claiming that AI is impossible, I
think we can attribute this puzzling episode to tribalism in defense of
technological progress.
Deflection
Some commentators are willing to accept that the risks are real, but
still present arguments for doing nothing. These arguments include
the impossibility of doing anything, the importance of doing something else entirely, and the need to keep quiet about the risks.
You can’t control research
A common answer to suggestions that advanced AI might present
risks to humanity is to claim that banning AI research is impossible.
Note the mental leap here: “Hmm, someone is discussing risks! They
must be proposing a ban on my research!!” This mental leap might be
appropriate in a discussion of risks based only on the gorilla problem,
and I would tend to agree that solving the gorilla problem by preventing the creation of superintelligent AI would require some kind of
constraints on AI research.
Recent discussions of risks have, however, focused not on the gen9780525558613_Human_TX.indd 154 8/7/19 11:21 PM
Not
y, a y,
can’t con can’t con
for
for d or
doing anyt doing any
nd the n nd the n
Distribution
he st
AI is imp I is imp
tribalism in ribalism in
ling to ac ling to ac
ing ing

---

## [Sección 75] Chapter 5, I spell out some far worse outcomes.

-- 168 of 352 --

T H E N O T- S O - G R E AT A I D E B AT E 155
eral gorilla problem (journalistically speaking, the humans vs. superintelligence smackdown) but on the King Midas problem and variants
thereof. Solving the King Midas problem also solves the gorilla
problem—not by preventing superintelligent AI or finding a way to
defeat it but by ensuring that it is never in conflict with humans in
the first place. Discussions of the King Midas problem generally avoid
proposing that AI research be curtailed; they merely suggest that attention be paid to the issue of preventing negative consequences of
poorly designed systems. In the same vein, a discussion of the risks of
containment failure in nuclear plants should be interpreted not as an
attempt to ban nuclear physics research but as a suggestion to focus
more effort on solving the containment problem.
There is, as it happens, a very interesting historical precedent for
cutting off research. In the early 1970s, biologists began to be concerned that novel recombinant DNA methods—splicing genes from
one organism into another—might create substantial risks for human
health and the global ecosystem. Two meetings at Asilomar in California in 1973 and 1975 led first to a moratorium on such experiments
and then to detailed biosafety guidelines consonant with the risks
posed by any proposed experiment.15 Some classes of experiments,
such as those involving toxin genes, were deemed too hazardous to be
allowed.
Immediately after the 1975 meeting, the National Institutes of
Health (NIH), which funds virtually all basic medical research in the
United States, began the process of setting up the Recombinant DNA
Advisory Committee. The RAC, as it is known, was instrumental in
developing the NIH guidelines that essentially implemented the Asilomar recommendations. Since 2000, those guidelines have included
a ban on funding approval for any protocol involving human germline
alteration— the modification of the human genome in ways that can be
inherited by subsequent generations. This ban was followed by legal
prohibitions in over fifty countries.
The goal of “improving the human stock” had been one of the
M 9780525558613_Human_TX.indd 155 8/7/19 11:21 PM
Not
vol vo
ediately aft ediately af
NIH), w NIH), w
for
biosaf osa
posed exper osed exp
ving tox ing tox
Distribution
prete
suggestion uggestion
m. m.
ng historica historic
s, biologists , biologist
A m methods ethods
ht create su create su
m. Two me m. Two m
rst to a m rst to a m
ty g ty g

-- 169 of 352 --

156 H U M A N C O M PAT I B L E
dreams of the eugenics movement in the late nineteenth and early
twentieth centuries. The development of CRISPR-Cas9, a very precise method for genome editing, has reignited this dream. An international summit held in 2015 left the door open for future applications,
calling for restraint until “there is broad societal consensus about the
appropriateness of the proposed application.” 16 In November 2018,
the Chinese scientist He Jiankui announced that he had edited the
genomes of three human embryos, at least two of which had led to
live births. An international outcry followed, and at the time of
writing, Jiankui appears to be under house arrest. In March 2019, an
international panel of leading scientists called explicitly for a formal
moratorium.17
The lesson of this debate for AI is mixed. On the one hand, it
shows that we can refrain from proceeding with an area of research
that has huge potential. The international consensus against germline
alteration has been almost completely successful up to now. The fear
that a ban would simply drive the research underground, or into countries with no regulation, has not materialized. On the other hand,
germline alteration is an easily identifiable process, a specific use case
of more general knowledge about genetics that requires specialized
equipment and real humans to experiment on. Moreover, it falls within
an area—reproductive medicine—that is already subject to close oversight and regulation. These characteristics do not apply to generalpurpose AI, and, as yet, no one has come up with any plausible form
that a regulation to curtail AI research might take.
Whataboutery
I was introduced to the term whataboutery by an adviser to a British politician who had to deal with it on a regular basis at public meetings. No matter the topic of the speech he was giving, someone would
invariably ask, “What about the plight of the Palestinians?”
9780525558613_Human_TX.indd 156 8/7/19 11:21 PM
Not
eal a
roductive ductive
regulation. regulation
AI, and, AI, and,
for
n easily asi
owledge ab owledge a
humans umans
Distribution
Marc
licitly for itly for
xed. On the On th
ing with an ng with an
onal consen nal conse
etely succes ely succes
he research he researc
s not mat s not ma
iden iden

---

## [Sección 76] Chapter 5, I spell out some far worse outcomes.

-- 170 of 352 --

T H E N O T- S O - G R E AT A I D E B AT E 157
In response to any mention of risks from advanced AI, one is likely
to hear, “What about the benefits of AI?” For example, here is Oren
Etzioni:18
Doom-and-gloom predictions often fail to consider the potential
benefits of AI in preventing medical errors, reducing car accidents,
and more.
And here is Mark Zuckerberg, CEO of Facebook, in a recent mediafueled exchange with Elon Musk:19
If you’re arguing against AI, then you’re arguing against safer cars
that aren’t going to have accidents and you’re arguing against being
able to better diagnose people when they’re sick.
Leaving aside the tribal notion that anyone mentioning risks is “against
AI,” both Zuckerberg and Etzioni are arguing that to talk about risks
is to ignore the potential benefits of AI or even to negate them.
This is precisely backwards, for two reasons. First, if there were no
potential benefits of AI, there would be no economic or social impetus for AI research and hence no danger of ever achieving humanlevel AI. We simply wouldn’t be having this discussion at all. Second,
if the risks are not successfully mitigated, there will be no benefits. The
potential benefits of nuclear power have been greatly reduced because
of the partial core meltdown at Three Mile Island in 1979, the uncontrolled reaction and catastrophic releases at Chernobyl in 1986, and
the multiple meltdowns at Fukushima in 2011. Those disasters severely curtailed the growth of the nuclear industry. Italy abandoned
nuclear power in 1990 and Belgium, Germany, Spain, and Switzerland have announced plans to do so. Since 1990, the worldwide rate of
commissioning of nuclear plants has been about a tenth of what it was
before Chernobyl.
M 9780525558613_Human_TX.indd 157 8/7/19 11:21 PM
Not
arc r
simply w mply w
ks are not su ks are not
benefit benefit
ll
for
ckwar wa
of AI, there f AI, ther
h and h and h
Distribution
ing against s ng against
’re arguing a arguing
hey’re sick. ey’re sick.
at anyone m anyone m
zioni are ar zioni are a
nefits of A nefits of
s, fo s, fo

-- 171 of 352 --

158 H U M A N C O M PAT I B L E
Silence
The most extreme form of deflection is simply to suggest that we
should keep silent about the risks. For example, the aforementioned
AI100 report includes the following admonition:
If society approaches these technologies primarily with fear and
suspicion, missteps that slow AI’s development or drive it underground will result, impeding important work on ensuring the
safety and reliability of AI technologies.
Robert Atkinson, director of the Information Technology and Innovation Foundation (the very same foundation that gives out the
Luddite Award), made a similar argument in a 2015 debate. 20 While
there are valid questions about precisely how risks should be described
when talking to the media, the overall message is clear: “Don’t mention the risks; it would be bad for funding.” Of course, if no one were
aware of the risks, there would be no funding for research on risk
mitigation and no reason for anyone to work on it.
The renowned cognitive scientist Steven Pinker gives a more optimistic version of Atkinson’s argument. In his view, the “culture of
safety in advanced societies” will ensure that all serious risks from AI
will be eliminated; therefore, it is inappropriate and counterproductive to call attention to those risks. 21 Even if we disregard the fact that
our advanced culture of safety has led to Chernobyl, Fukushima, and
runaway global warming, Pinker’s argument entirely misses the point.
The culture of safety consists precisely of people pointing to possible
failure modes and finding ways to ensure they don’t happen. (And
with AI, the standard model is the failure mode.) Saying that it’s ridiculous to point to a failure mode because the culture of safety will fix
it anyway is like saying no one should call an ambulance when they see
a hit-and-run accident because someone will call an ambulance.
In attempting to portray the risks to the public and to policy mak9780525558613_Human_TX.indd 158 8/7/19 11:21 PM
Not
f A
anced soci ced soci
iminated; t iminated;
l attenti l attenti
for
n for a for
ognitive sci ognitive sc
tkinson’ kinson’
Distribution
on Technolo n Technolo
dation that on that
nt in a 201 nt in a 201
ely how risk how risk
verall messa rall messa
for funding for fundin
ould be n ould be n
nyon nyon

---

## [Sección 77] Chapter 5, I spell out some far worse outcomes.

-- 172 of 352 --

T H E N O T- S O - G R E AT A I D E B AT E 159
ers, AI researchers are at a disadvantage compared to nuclear physicists. The physicists did not need to write books explaining to the
public that assembling a critical mass of highly enriched uranium
might present a risk, because the consequences had already been
demonstrated at Hiroshima and Nagasaki. It did not require a great
deal of further persuasion to convince governments and funding agencies that safety was important in developing nuclear energy.
Tribalism
In Butler’s Erewhon, focusing on the gorilla problem leads to a premature and false dichotomy between pro-machinists and anti-machinists.
The pro-machinists believe the risk of machine domination to be minimal or nonexistent; the anti-machinists believe it to be insuperable
unless all machines are destroyed. The debate becomes tribal, and no
one tries to solve the underlying problem of retaining human control
over the machines.
To varying degrees, all the major technological issues of the
twentieth century—nuclear power, genetically modified organisms
(GMOs), and fossil fuels—succumbed to tribalism. On each issue,
there are two sides, pro and anti. The dynamics and outcomes of
each have been different, but the symptoms of tribalism are similar:
mutual distrust and denigration, irrational arguments, and a refusal to
concede any (reasonable) point that might favor the other tribe. On
the pro-technology side, one sees denial and concealment of risks
combined with accusations of Luddism; on the anti side, one sees a
conviction that the risks are insuperable and the problems unsolvable.
A member of the pro-technology tribe who is too honest about a problem is viewed as a traitor, which is particularly unfortunate as the
pro-technology tribe usually includes most of the people qualified to
solve the problem. A member of the anti-technology tribe who discusses possible mitigations is also a traitor, because it is the technology
M 9780525558613_Human_TX.indd 159 8/7/19 11:21 PM
Not
oss oss
wo sides, sides,
e been diff e been dif
istrust a istrust
for
es, all al
— —nuclear p uclear
l ffuels— uels— fff
Distribution
oblem leads blem leads
inists and sts and
achine dom achine dom
nists believ sts belie
d. The deba The deba
ing problem ing proble
the the

-- 173 of 352 --

160 H U M A N C O M PAT I B L E
itself that has come to be viewed as evil, rather than its possible effects. In this way, only the most extreme voices—those least likely to
be listened to by the other side—can speak for each tribe.
In 2016, I was invited to No. 10 Downing Street to meet with
some of then prime minister David Cameron’s advisers. They were
worried that the AI debate was starting to resemble the GMO
debate—which, in Europe, had led to what the advisers considered to
be premature and overly restrictive regulations on GMO production
and labeling. They wanted to avoid the same thing happening to AI.
Their concerns had some validity: the AI debate is in danger of becoming tribal, of creating pro-AI and anti-AI camps. This would be
damaging to the field because it’s simply not true that being concerned
about the risks inherent in advanced AI is an anti-AI stance. A physicist who is concerned about the risks of nuclear war or the risk of a
poorly designed nuclear reactor exploding is not “anti-physics.” To say
that AI will be powerful enough to have a global impact is a compliment to the field rather than an insult.
It is essential that the AI community own the risks and work to
mitigate them. The risks, to the extent that we understand them, are
neither minimal nor insuperable. We need to do a substantial amount
of work to avoid them, including reshaping and rebuilding the foundations of AI.
&DQ·W:H-XVW
. . . switch it off?
Once they understand the basic idea of existential risk, whether in
the form of the gorilla problem or the King Midas problem, many
people—myself included—immediately begin casting around for an
easy solution. Often, the first thing that comes to mind is switching
off the machine. For example, Alan Turing himself, as quoted earlier,
9780525558613_Human_TX.indd 160 8/7/19 11:21 PM
Not
the h
for
ks, to t to
insuperabl insuperab
m, inclu m, inclu
Distribution
n dan
ps. This w . This w
e that being that being
n anti nti-A AI st I s
nuclear wa nuclear w
ding is not ng is not
to have a gl have a gl
n insult. insult.
I commun I commu
e ex e ex

---

## [Sección 78] Chapter 5, I spell out some far worse outcomes.

-- 174 of 352 --

T H E N O T- S O - G R E AT A I D E B AT E 161
speculates that we might “keep the machines in a subservient position, for instance by turning off the power at strategic moments.”
This won’t work, for the simple reason that a superintelligent
entity will already have thought of that possibility and taken steps to
prevent it. And it will do that not because it wants to stay alive but
because it is pursuing whatever objective we gave it and knows that it
will fail if it is switched off.
There are some systems being contemplated that really cannot
be switched off without ripping out a lot of the plumbing of our
civilization. These are systems implemented as so-called smart contracts
in the blockchain. The blockchain is a highly distributed form of computing and record keeping based on encryption; it is specifically designed so that no datum can be deleted and no smart contract can be
interrupted without essentially taking control of a very large number of
machines and undoing the chain, which might in turn destroy a large
part of the Internet and/or the financial system. It is debatable whether
this incredible robustness is a feature or a bug. It’s certainly a tool that a
superintelligent AI system could use to protect itself.
. . . put it in a box?
If you can’t switch AI systems off, can you seal the machines inside
a kind of firewall, extracting useful question-answering work from
them but never allowing them to affect the real world directly? This is
the idea behind Oracle AI, which has been discussed at length in the
AI safety community. 22 An Oracle AI system can be arbitrarily intelligent, but can answer only yes or no (or give corresponding probabilities) to each question. It can access all the information the human
race possesses through a read-only connection—that is, it has no direct access to the Internet. Of course, this means giving up on superintelligent robots, assistants, and many other kinds of AI systems, but
a trustworthy Oracle AI would still have enormous economic value
because we could ask it questions whose answers are important to
M 9780525558613_Human_TX.indd 161 8/7/19 11:21 PM
Not
n’t switch switch
f firewall, f firewall,
never a never a
forn a box? a box?
A
Distribution
d sm
buted form uted form
on; it is spe n; it is spe
d no smart o smart
ntrol of a ve ntrol of a v
hich might h might
ancial syste ncial syste
feature or a feature or
ould use t ould use t

-- 175 of 352 --

162 H U M A N C O M PAT I B L E
us, such as whether Alzheimer’s disease is caused by an infectious
organism or whether it’s a good idea to ban autonomous weapons.
Thus, the Oracle AI is certainly an interesting possibility.
Unfortunately, there are some serious difficulties. First, the Oracle
AI system will be at least as assiduous in understanding the physics
and origins of its world—the computing resources, their mode of operation, and the mysterious entities that produced its information
store and are now asking questions—as we are in understanding ours.
Second, if the objective of the Oracle AI system is to provide accurate
answers to questions in a reasonable amount of time, it will have an
incentive to break out of its cage to acquire more computational resources and to control the questioners so that they ask only simple
questions. And, finally, we have yet to invent a firewall that is secure
against ordinary humans, let alone superintelligent machines.
I think there might be solutions to some of these problems, particularly if we limit Oracle AI systems to be provably sound logical or
Bayesian calculators. That is, we could insist that the algorithm can
output only a conclusion that is warranted by the information provided, and we could check mathematically that the algorithm satisfies
this condition. This still leaves the problem of controlling the process
that decides which logical or Bayesian computations to do, in order to
reach the strongest possible conclusion as quickly as possible. Because
this process has an incentive to reason quickly, it has an incentive to
acquire computational resources and of course to preserve its own
existence.
In 2018, the Center for Human-Compatible AI at Berkeley ran a
workshop at which we asked the question, “What would you do if you
knew for certain that superintelligent AI would be achieved within a
decade?” My answer was as follows: persuade the developers to hold
off on building a general-purpose intelligent agent—one that can
choose its own actions in the real world—and build an Oracle AI instead. Meanwhile, we would work on solving the problem of making
Oracle AI systems provably safe to the extent possible. The reason
9780525558613_Human_TX.indd 162 8/7/19 11:21 PM
Not
hh l
ongest pos gest pos
ss has an in ss has an
omputat omputa
for
eck ma k m
still leaves still leave
ogical or gical or
Distribution
it w
computat omputat
they ask o they ask o
nt a firewall firewal
intelligent m ntelligent m
some of th ome of th
ms to be p s to be p
we could in we could
at is warr at is war
hem hem

---

## [Sección 79] Chapter 5, I spell out some far worse outcomes.

-- 176 of 352 --

T H E N O T- S O - G R E AT A I D E B AT E 163
this strategy might work is twofold: first, a superintelligent Oracle AI
system would still be worth trillions of dollars, so the developers
might be willing to accept this restriction; and second, controlling
Oracle AI systems is almost certainly easier than controlling a generalpurpose intelligent agent, so we’d have a better chance of solving the
problem within the decade.
. . . work in human–machine teams?
A common refrain in the corporate world is that AI is no threat to
employment or to humanity because we’ll just have collaborative
human–AI teams. For example, David Kenny’s letter to Congress,
quoted earlier in this chapter, stated that “ high-value artificial intelligence systems are specifically designed to augment human intelligence, not replace workers.” 23
While a cynic might suggest that this is merely a public relations
ploy to sugarcoat the process of eliminating human employees from
the corporations’ clients, I think it does move the ball forward a few
inches. Collaborative human–AI teams are indeed a desirable goal.
Clearly, a team will be unsuccessful if the objectives of the team members are not aligned, so the emphasis on human–AI teams highlights
the need to solve the core problem of value alignment. Of course,
highlighting the problem is not the same as solving it.
. . . merge with the machines?
Human–machine teaming, taken to its extreme, becomes a human–
machine merger in which electronic hardware is attached directly to
the brain and forms part of a single, extended, conscious entity. The
futurist Ray Kurzweil describes the possibility as follows:24
We are going to directly merge with it, we are going to become
the AIs. . . . As you get to the late 2030s or 2040s, our thinking
M 9780525558613_Human_TX.indd 163 8/7/19 11:21 PM
Not
gne n
solve the olve the
ing the pro ing the pr
for
huma m
be unsucce be unsucc
d, so the , so the
Distribution
AI is
have col have col
y’s letter t y’s letter t
high- h-vvalue a alue
d to augme d to augm
that this is at this is
of elimina of elimin
think it d think it d
A AII

-- 177 of 352 --

164 H U M A N C O M PAT I B L E
will be predominately non-biological and the non-biological part
will ultimately be so intelligent and have such vast capacity it’ll
be able to model, simulate and understand fully the biological
part.
Kurzweil views these developments in a positive light. Elon Musk, on
the other hand, views the human–machine merger primarily as a defensive strategy:25
If we achieve tight symbiosis, the AI wouldn’t be “other”—it would
be you and [it would have] a relationship to your cortex analogous
to the relationship your cortex has with your limbic system. . . .
We’re going to have the choice of either being left behind and being effectively useless or like a pet—you know, like a house cat or
something—or eventually figuring out some way to be symbiotic
and merge with AI.
Musk’s Neuralink Corporation is working on a device dubbed
“neural lace” after a technology described in Iain Banks’s Culture novels. The aim is to create a robust, permanent connection between the
human cortex and external computing systems and networks. There
are two main technical obstacles: first, the difficulties of connecting
an electronic device to brain tissue, supplying it with power, and connecting it to the outside world; and second, the fact that we understand almost nothing about the neural implementation of higher levels
of cognition in the brain, so we don’t know where to connect the device and what processing it should do.
I am not completely convinced that the obstacles in the preceding
paragraph are insuperable. First, technologies such as neural dust are
rapidly reducing the size and power requirements of electronic devices that can be attached to neurons and provide sensing, stimulation, and transcranial communication. 26 (The technology as of 2018
had reached a size of about one cubic millimeter, so neural grit might
9780525558613_Human_TX.indd 164 8/7/19 11:21 PM
Not
nd e d
technica echnica
nic device t nic device
to the to the
for
hnolog olo
eate a robu eate a robu
xternal xternal
Distribution
r”—
ortex analo tex analo
limbic limbic syst ys
ing left beh left beh
u know, like u know, like
out some w t some w
oration is oration i
des des

---

## [Sección 80] Chapter 5, I spell out some far worse outcomes.

-- 178 of 352 --

T H E N O T- S O - G R E AT A I D E B AT E 165
be a more accurate term.) Second, the brain itself has remarkable
powers of adaptation. It used to be thought, for example, that we
would have to understand the code that the brain uses to control the
arm muscles before we could connect a brain to a robot arm successfully, and that we would have to understand the way the cochlea analyzes sound before we could build a replacement for it. It turns out,
instead, that the brain does most of the work for us. It quickly learns
how to make the robot arm do what its owner wants, and how to map
the output of a cochlear implant to intelligible sounds. It’s entirely
possible that we may hit upon ways to provide the brain with additional memory, with communication channels to computers, and perhaps even with communication channels to other brains—all without
ever really understanding how any of it works. 27
Regardless of the technological feasibility of these ideas, one has to
ask whether this direction represents the best possible future for humanity. If humans need brain surgery merely to survive the threat
posed by their own technology, perhaps we’ve made a mistake somewhere along the line.
. . . avoid putting in human goals?
A common line of reasoning has it that problematic AI behaviors
arise from putting in specific kinds of objectives; if these are left out,
everything will be fine. Thus, for example, Yann LeCun, a pioneer of
deep learning and director of AI research at Facebook, often cites this
idea when downplaying the risk from AI:28
There is no reason for AIs to have self-preservation instincts, jealousy, etc. . . . AIs will not have these destructive “emotions” unless
we build these emotions into them. I don’t see why we would want
to do that.
In a similar vein, Steven Pinker provides a gender-based analysis:29
M 9780525558613_Human_TX.indd 165 8/7/19 11:21 PM
Not
on line of n line o
m putting i m putting
ng will b ng will b
forutting in tting in
Distribution
brain
computers mputers
her er bbrains— rains
rks.2727
bility of the ility of the
ts the best p the best
urgery mer gery mer
gy, perhaps gy, perhap

-- 179 of 352 --

166 H U M A N C O M PAT I B L E
AI dystopias project a parochial alpha-male psychology onto the
concept of intelligence. They assume that superhumanly intelligent robots would develop goals like deposing their masters or
taking over the world. . . . It’s telling that many of our technoprophets don’t entertain the possibility that artificial intelligence
will naturally develop along female lines: fully capable of solving
problems, but with no desire to annihilate innocents or dominate
the civilization.
As we have already seen in the discussion of instrumental goals, it
doesn’t matter whether we build in “emotions” or “desires” such as selfpreservation, resource acquisition, knowledge discovery, or, in the extreme case, taking over the world. The machine is going to have those
emotions anyway, as subgoals of any objective we do build in—and
regardless of its gender. For a machine, death isn’t bad per se. Death
is to be avoided, nonetheless, because it’s hard to fetch the coffee if
you’re dead.
An even more extreme solution is to avoid putting objectives into
the machine altogether. Voilà, problem solved. Alas, it’s not as simple
as that. Without objectives, there is no intelligence: any action is as
good as any other, and the machine may as well be a random number
generator. Without objectives, there is also no reason for the machine
to prefer a human paradise to a planet turned into a sea of paperclips
(a scenario described at length by Nick Bostrom). Indeed, the latter
outcome may be utopian for the iron-eating bacterium Thiobacillus
ferrooxidans. Absent some notion that human preferences matter, who
is to say the bacterium is wrong?
A common variant on the “avoid putting in objectives” idea is the
notion that a sufficiently intelligent system will necessarily, as a consequence of its intelligence, develop the “right” goals on its own. Often, proponents of this notion appeal to the theory that people of
greater intelligence tend to have more altruistic and lofty objectives—
a view that may be related to the self-conception of the proponents.
9780525558613_Human_TX.indd 166 8/7/19 11:21 PM
Not
r, a r,
thout obj out obj
a human pa a human p
o descri o descri
for
Voilà oil
jectives, th ectives, t
nd the m nd the m
Distribution
ment
esires” suc res” suc
iscovery, or scovery, or
hine is going is goin
jective we ective we
ne, death isn death is
ause it’s ha use it’s ha
olution is olution is
prob prob

---

## [Sección 81] Chapter 5, I spell out some far worse outcomes.

-- 180 of 352 --

T H E N O T- S O - G R E AT A I D E B AT E 167
The idea that it is possible to perceive objectives in the world was
discussed at length by the famous eighteenth-century philosopher
David Hume in A Treatise of Human Nature. 30 He called it the is- ought
problem and concluded that it was simply a mistake to think that moral
imperatives could be deduced from natural facts. To see why, consider,
for example, the design of a chessboard and chess pieces. One cannot
perceive in these the goal of checkmate, for the same chessboard and
pieces can be used for suicide chess or indeed many other games still
to be invented.
Nick Bostrom, in Superintelligence, presents the same underlying
idea in a different form, which he calls the orthogonality thesis:
Intelligence and final goals are orthogonal: more or less any level of
intelligence could in principle be combined with more or less any
final goal.
Here, orthogonal means “at right angles” in the sense that the degree of intelligence is one axis defining an intelligent system and its
goals are another axis, and we can vary these independently. For example, a self-driving car can be given any particular address as its
destination; making the car a better driver doesn’t mean that it will
start refusing to go to addresses that are divisible by seventeen. By the
same token, it is easy to imagine that a general-purpose intelligent
system could be given more or less any objective to pursue—including
maximizing the number of paperclips or the number of known digits of pi. This is just how reinforcement learning systems and other
kinds of reward optimizers work: the algorithms are completely general and accept any reward signal. For engineers and computer scientists operating within the standard model, the orthogonality thesis is
just a given.
The idea that intelligent systems could simply observe the world to
acquire the goals that should be pursued suggests that a sufficiently
intelligent system will naturally abandon its initial objective in favor
M 9780525558613_Human_TX.indd 167 8/7/19 11:21 PM
Not
kin ki
g to go to o go to
ken, it is ea ken, it is e
ould be ould be
for
and w nd
ng car can ng car can
g the ca g the ca
d
Distribution
same
onality thes ality thes
more or les re or le
bined with bined with
at right ang t right an
axis defin axis defin
e ca e ca

-- 181 of 352 --

168 H U M A N C O M PAT I B L E
of the “right” objective. It’s hard to see why a rational agent would do
this. Furthermore, it presupposes that there is a “right” objective out
there in the world; it would have to be an objective on which ironeating bacteria and humans and all other species agree, which is hard
to imagine.
The most explicit critique of Bostrom’s orthogonality thesis comes
from the noted roboticist Rodney Brooks, who asserts that it’s impossible for a program to be “smart enough that it would be able to invent
ways to subvert human society to achieve goals set for it by humans,
without understanding the ways in which it was causing problems for
those same humans.” 31 Unfortunately, it’s not only possible for a program to behave like this; it is, in fact, inevitable, given the way Brooks
defines the issue. Brooks posits that the optimal plan to “achieve goals
set for it by humans” is causing problems for humans. It follows that
those problems reflect things of value to humans that were omitted
from the goals set for it by humans. The optimal plan being carried out
by the machine may well cause problems for humans, and the machine
may well be aware of this. But, by definition, the machine will not recognize those problems as problematic. They are none of its concern.
Steven Pinker seems to agree with Bostrom’s orthogonality thesis,
writing that “intelligence is the ability to deploy novel means to attain
a goal; the goals are extraneous to the intelligence itself.” 32 On the
other hand, he finds it inconceivable that “the AI would be so brilliant
that it could figure out how to transmute elements and rewire brains,
yet so imbecilic that it would wreak havoc based on elementary blunders of misunderstanding.” 33 He continues, “The ability to choose an
action that best satisfies conflicting goals is not an add-on that engineers might forget to install and test; it is intelligence. So is the ability
to interpret the intentions of a language user in context.” Of course,
“satisf[ying] conflicting goals” is not the problem—that’s something
that’s been built into the standard model from the early days of decision theory. The problem is that the conflicting goals of which the
machine is aware do not constitute the entirety of human concerns;
9780525558613_Human_TX.indd 168 8/7/19 11:21 PM
ellig ll
oals are e ls are e
d, he finds i d, he finds
ld figur ld figur
ll
for
as prob pro
ems to agre ems to agr
ence is t ence is t
Distribution
ng pr p
possible fo ossible fo
given the w given the w
mal plan to plan to
s for huma for huma
e to human to huma
. The optim The optim
problems f problems
ut, by defin ut, by defi
ema ema

---

## [Sección 82] Chapter 5, I spell out some far worse outcomes.

-- 182 of 352 --

T H E N O T- S O - G R E AT A I D E B AT E 169
moreover, within the standard model, there’s nothing to say that the
machine has to care about goals it’s not told to care about.
There are, however, some useful clues in what Brooks and Pinker
say. It does seem stupid to us for the machine to, say, change the color
of the sky as a side effect of pursuing some other goal, while ignoring
the obvious signs of human displeasure that result. It seems stupid to
us because we are attuned to noticing human displeasure and (usually) we are motivated to avoid causing it—even if we were previously
unaware that the humans in question cared about the color of the sky.
That is, we humans (1) care about the preferences of other humans
and (2) know that we don’t know what all those preferences are. In the
next chapter, I argue that these characteristics, when built into a machine, may provide the beginnings of a solution to the King Midas
problem.
7KH'HEDWH5HVWDUWHG
This chapter has provided a glimpse into an ongoing debate in the
broad intellectual community, a debate between those pointing to the
risks of AI and those who are skeptical about the risks. It has been
conducted in books, blogs, academic papers, panel discussions, interviews, tweets, and newspaper articles. Despite their valiant efforts,
the “skeptics”—those who argue that the risk from AI is negligible—
have failed to explain why superintelligent AI systems will necessarily
remain under human control; and they have not even tried to explain
why superintelligent AI systems will never be developed.
Many skeptics will admit, if pressed, that there is a real problem,
even if it’s not imminent. Scott Alexander, in his Slate Star Codex
blog, summed it up brilliantly:34
The “skeptic” position seems to be that, although we should probably get a couple of bright people to start working on preliminary
M 9780525558613_Human_TX.indd 169 8/7/19 11:21 PM
Not
th t
n books, b books, b
weets, and weets, and
tics”— tics”—
for
vided a ed
ommunity, ommunit
ose who se who
l
Distribution
of ot
eferences a erences a
, when buil when buil
olution to t ion to
UWHG UWHG
glim glim

-- 183 of 352 --

170 H U M A N C O M PAT I B L E
aspects of the problem, we shouldn’t panic or start trying to ban
AI research.
The “believers,” meanwhile, insist that although we shouldn’t
panic or start trying to ban AI research, we should probably get a
couple of bright people to start working on preliminary aspects of
the problem.
Although I would be happy if the skeptics came up with an irrefutable objection, perhaps in the form of a simple and foolproof (and
evil-proof) solution to the control problem for AI, I think it’s quite
likely that this isn’t going to happen, any more than we’re going to find
a simple and foolproof solution for cybersecurity or a simple and foolproof way to generate nuclear energy with zero risk. Rather than continue the descent into tribal name-calling and repeated exhumation of
discredited arguments, it seems better, as Alexander puts it, to start
working on some preliminary aspects of the problem.
The debate has highlighted the conundrum we face: if we build
machines to optimize objectives, the objectives we put into the machines have to match what we want, but we don’t know how to define
human objectives completely and correctly. Fortunately, there is a
middle way.
9780525558613_Human_TX.indd 170 8/7/19 11:21 PM
Not
 
for
hat we t w
ompletely ompletely
Distribution
thin
we’re goin e’re goin
y or a simpl or a simpl
ero risk. Ra risk. Ra
and repeat and repeat
er, as Alexa as Alex
ects of the p ts of the p
d the conun d the con
tives, the tives, the
want wan

-- 184 of 352 --
AI: A DIFFERENT APPROACH
Once the skeptic’s arguments have been refuted and all the
but but buts have been answered, the next question is usually, “OK, I admit there’s a problem, but there’s no solution,
is there?” Yes, there is a solution.
Let’s remind ourselves of the task at hand: to design machines with
a high degree of intelligence—so that they can help us with difficult
problems—while ensuring that those machines never behave in ways
that make us seriously unhappy.
The task is, fortunately, not the following: given a machine that
possesses a high degree of intelligence, work out how to control it. If
that were the task, we would be toast. A machine viewed as a black
box, a fait accompli, might as well have arrived from outer space. And
our chances of controlling a superintelligent entity from outer space
are roughly zero. Similar arguments apply to methods of creating AI
systems that guarantee we won’t understand how they work; these
methods include whole-brain emulation1 —creating souped-up electronic copies of human brains—as well as methods based on simulated
evolution of programs. 2 I won’t say more about these proposals because they are so obviously a bad idea.
So, how has the field of AI approached the “design machines with
M 9780525558613_Human_TX.indd 171 8/7/19 11:21 PM
Not
riou io
is, fortu s, fortu
s a high deg s a high de
e the ta e the ta
for
igence nc
nsuring tha nsuring th
usly unh sly unh
Distribution
have been r ave been r
wered, the ered, the
e’s a problem a problem
ion. on.
f the task f the task
ssoo

---

## [Sección 83] Chapter 5, I spell out some far worse outcomes.

-- 185 of 352 --

172 H U M A N C O M PAT I B L E
a high degree of intelligence” part of the task in the past? Like many
other fields, AI has adopted the standard model: we build optimizing
machines, we feed objectives into them, and off they go. That worked
well when the machines were stupid and had a limited scope of action;
if you put in the wrong objective, you had a good chance of being
able to switch off the machine, fix the problem, and try again.
As machines designed according to the standard model become
more intelligent, however, and as their scope of action becomes more
global, the approach becomes untenable. Such machines will pursue their objective, no matter how wrong it is; they will resist attempts
to switch them off; and they will acquire any and all resources that
contribute to achieving the objective. Indeed, the optimal behavior for
the machine might include deceiving the humans into thinking they
gave the machine a reasonable objective, in order to gain enough time
to achieve the actual objective given to it. This wouldn’t be “deviant”
or “malicious” behavior requiring consciousness and free will; it would
just be part of an optimal plan to achieve the objective.
In Chapter 1, I introduced the idea of beneficial machines—that is,
machines whose actions can be expected to achieve our objectives
rather than their objectives. My goal in this chapter is to explain in
simple terms how this can be done, despite the apparent drawback
that the machines don’t know what our objectives are. The resulting
approach should lead eventually to machines that present no threat to
us, no matter how intelligent they are.
Principles for Beneficial Machines
I find it helpful to summarize the approach in the form of three 3 principles. When reading these principles, keep in mind that they are intended primarily as a guide to AI researchers and developers in
thinking about how to create beneficial AI systems; they are not
intended as explicit laws for AI systems to follow:4
9780525558613_Human_TX.indd 172 8/7/19 11:21 PM
Not
w t w
hines don nes don
should lead should lea
tter how tter how
for
ns can can
jectives. M ectives. M
his can his can
Distribution
resis
d all resou ll resou
e optimal b e optimal b
umans into ans into
in order to n order to
to it. This w it. This
consciousne nsciousne
to achieve to achiev
d the idea d the idea
be e be e

-- 186 of 352 --

A I : A D I F F E R E N T A P P R O A C H 173
1. The machine’s only objective is to maximize the realization of
human preferences.
2. The machine is initially uncertain about what those preferences are.
3. The ultimate source of information about human preferences is
human behavior.
Before delving into more detailed explanations, it’s important to
remember the broad scope of what I mean by preferences in these principles. Here’s a reminder of what I wrote in Chapter 2: if you were
somehow able to watch two movies, each describing in sufficient detail
and breadth a future life you might lead, such that each constitutes a virtual experience, you could say which you prefer, or express indifference.
Thus, preferences here are all-encompassing; they cover everything
you might care about, arbitrarily far into the future. 5 And they are
yours: the machine is not looking to identify or adopt one ideal set of
preferences but to understand and satisfy (to the extent possible) the
preferences of each person.
The first principle: Purely altruistic machines
The first principle, that the machine’s only objective is to maximize the realization of human preferences, is central to the notion of
a beneficial machine. In particular, it will be beneficial to humans,
rather than to, say, cockroaches. There’s no getting around this recipientspecific notion of benefit.
The principle means that the machine is purely altruistic—that is,
it attaches absolutely no intrinsic value to its own well-being or even
its own existence. It might protect itself in order to continue doing
useful things for humans, or because its owner would be unhappy
about having to pay for repairs, or because the sight of a dirty or damaged robot might be mildly distressing to passersby, but not because it
wants to be alive. Putting in any preference for self-preservation sets
M 9780525558613_Human_TX.indd 173 8/7/19 11:21 PM
Not
principle rinciple
realization realizatio
ial mac ial mac
fornciple: P ciple: P
Distribution
er 2:
g in suffic in suffic
at each cons t each cons
efer, or expr or exp
assing; they assing; the
r into the into the
g to identify o identify
d and satisf d and satis

---

## [Sección 84] Chapter 5, I spell out some far worse outcomes.

-- 187 of 352 --

174 H U M A N C O M PAT I B L E
up an additional incentive within the robot that is not strictly aligned
with human well-being.
The wording of the first principle brings up two questions of fundamental importance. Each merits an entire bookshelf to itself, and in
fact many books have already been written on these questions.
The first question is whether humans really have preferences in a
meaningful or stable sense. In truth, the notion of a “preference” is an
idealization that fails to match reality in several ways. For example,
we aren’t born with the preferences we have as adults, so they must
change over time. For now, I will assume that the idealization is reasonable. Later, I will examine what happens when we give up the
idealization.
The second question is a staple of the social sciences: given that it is
usually impossible to ensure that everyone gets their most preferred
outcome—we can’t all be Emperor of the Universe—how should the
machine trade off the preferences of multiple humans? Again, for the
time being—and I promise to return to this question in the next
chapter—it seems reasonable to adopt the simple approach of treating
everyone equally. This is reminiscent of the roots of eighteenth-century
utilitarianism in the phrase “the greatest happiness for the greatest
numbers,” 6 and there are many caveats and elaborations required to
make this work in practice. Perhaps the most important of these is the
matter of the possibly vast number of people not yet born, and how
their preferences are to be taken into account.
The issue of future humans brings up another, related question:
How do we take into account the preferences of nonhuman entities?
That is, should the first principle include the preferences of animals?
(And possibly plants too?) This is a question worthy of debate, but the
outcome seems unlikely to have a strong impact on the path forward
for AI. For what it’s worth, human preferences can and do include
terms for the well-being of animals, as well as for the aspects of human well-being that benefit directly from animals’ existence.7 To say
that the machine should pay attention to the preferences of animals in
9780525558613_Human_TX.indd 174 8/7/19 11:21 PM
Not
the h
rk in prac in prac
the possibl the possib
rences a rences
for
s remin em
e phrase “t phrase “
e are m e are m
Distribution
aliza
en we give we give
al sciences: ciences
ne gets the ne gets the
f the he U Unive niv
of multiple f multiple
o return to o return
e to adopt e to adopt
scen scen

-- 188 of 352 --

A I : A D I F F E R E N T A P P R O A C H 175
addition to this is to say that humans should build machines that care
more about animals than humans do, which is a difficult position to
sustain. A more tenable position is that our tendency to engage in
myopic decision making—which works against our own interests—
often leads to negative consequences for the environment and its
animal inhabitants. A machine that makes less myopic decisions
would help humans adopt more environmentally sound policies. And
if, in the future, we give substantially greater weight to the well-being
of animals than we currently do—which probably means sacrificing
some of our own intrinsic well-being—then machines will adapt
accordingly.
The second principle: Humble machines
The second principle, that the machine is initially uncertain
about what human preferences are, is the key to creating beneficial
machines.
A machine that assumes it knows the true objective perfectly will
pursue it single-mindedly. It will never ask whether some course of
action is OK, because it already knows it’s an optimal solution for the
objective. It will ignore humans jumping up and down screaming,
“Stop, you’re going to destroy the world!” because those are just words.
Assuming perfect knowledge of the objective decouples the machine
from the human: what the human does no longer matters, because the
machine knows the goal and pursues it.
On the other hand, a machine that is uncertain about the true
objective will exhibit a kind of humility: it will, for example, defer to
humans and allow itself to be switched off. It reasons that the human
will switch it off only if it’s doing something wrong—that is, doing
something contrary to human preferences. By the first principle, it
wants to avoid doing that, but, by the second principle, it knows that’s
possible because it doesn’t know exactly what “wrong” is. So, if the
human does switch the machine off, then the machine avoids doing
M 9780525558613_Human_TX.indd 175 8/7/19 11:21 PM
Not
ll i l
e going to oing to
g perfect k g perfect k
human human
for
edly. It y.
use it alread use it alrea
gnore h nore h
Distribution
hines
machines achines
e machine machine
are, is the e, is the
s it knows s it knows
will will

---

## [Sección 85] Chapter 5, I spell out some far worse outcomes.

-- 189 of 352 --

176 H U M A N C O M PAT I B L E
the wrong thing, and that’s what it wants. In other words, the machine
has a positive incentive to allow itself to be switched off. It remains
coupled to the human, who is a potential source of information that
will allow it to avoid mistakes and do a better job.
Uncertainty has been a central concern in AI since the 1980s; indeed the phrase “modern AI” often refers to the revolution that took
place when uncertainty was finally recognized as a ubiquitous issue in
real-world decision making. Yet uncertainty in the objective of the AI
system was simply ignored. In all the work on utility maximization,
goal achievement, cost minimization, reward maximization, and loss
minimization, it is assumed that the utility function, the goal, the cost
function, the reward function, and the loss function are known perfectly. How could this be? How could the AI community (and the
control theory, operations research, and statistics communities) have
such a huge blind spot for so long, even while embracing uncertainty
in all other aspects of decision making? 8
One could make some rather complicated technical excuses, 9 but
I suspect the truth is that, with some honorable exceptions,10 AI researchers simply bought into the standard model that maps our notion
of human intelligence onto machine intelligence: humans have objectives and pursue them, so machines should have objectives and pursue
them. They, or should I say we, never really examined this fundamental assumption. It is built into all existing approaches for constructing
intelligent systems.
The third principle: Learning to predict human
preferences
The third principle, that the ultimate source of information about
human preferences is human behavior, serves two purposes.
The first purpose is to provide a definite grounding for the term
human preferences. By assumption, human preferences aren’t in the
machine and it cannot observe them directly, but there must still be
9780525558613_Human_TX.indd 176 8/7/19 11:21 PM
Not
the h
or should should
ption. It is b ption. It is
system system
for
t into t nto
ce onto mac e onto m
m, so m m, so m
Distribution
zatio
n, the goal, the goal,
nction are k ction are k
AI commu comm
statistics co statistics c
en while em while e
king? ng?88
her complic her compli
with some with some
e st e st

-- 190 of 352 --

A I : A D I F F E R E N T A P P R O A C H 177
some definite connection between the machine and human preferences. The principle says that the connection is through the observation of human choices: we assume that choices are related in some
(possibly very complicated) way to underlying preferences. To see why
this connection is essential, consider the converse: if some human
preference had no effect whatsoever on any actual or hypothetical choice
the human might make, then it would probably be meaningless to say
that the preference exists.
The second purpose is to enable the machine to become more useful as it learns more about what we want. (After all, if it knew nothing
about human preferences, it would be of no use to us.) The idea is
simple enough: human choices reveal information about human preferences. Applied to the choice between pineapple pizza and sausage
pizza, this is straightforward. Applied to choices between future lives
and choices made with the goal of influencing the robot’s behavior,
things get more interesting. In the next chapter I explain how to formulate and solve such problems. The real complications arise, however, because humans are not perfectly rational: imperfection comes
between human preferences and human choices, and the machine
must take into account those imperfections if it is to interpret human
choices as evidence of human preferences.
Not what I mean
Before going into more detail, I want to head off some potential
misunderstandings.
The first and most common misunderstanding is that I am proposing to install in machines a single, idealized value system of my own
design that guides the machine’s behavior. “Whose values are you going to put in?” “Who gets to decide what the values are?” Or even,
“What gives Western, well-off, white male cisgender scientists such as
Russell the right to determine how the machine encodes and develops
human values?” 11
M 9780525558613_Human_TX.indd 177 8/7/19 11:21 PM
Not
nce nc
what I m what I m
for
erences nc
ount those i unt those
of hum of hum
Distribution
f it k
to us.) T o us.) T
tion about h on about h
neapple piz pple pi
o choices be choices b
influencing fluencin
he next cha next cha
ems. The re ems. The
not perfec not perfec
and and

---

## [Sección 86] Chapter 5, I spell out some far worse outcomes.

-- 191 of 352 --

178 H U M A N C O M PAT I B L E
I think this confusion comes partly from an unfortunate conflict
between the commonsense meaning of value and the more technical
sense in which it is used in economics, AI, and operations research. In
ordinary usage, values are what one uses to help resolve moral dilemmas; as a technical term, on the other hand, value is roughly synonymous with utility, which measures the degree of desirability of anything
from pizza to paradise. The meaning I want is the technical one: I just
want to make sure the machines give me the right pizza and don’t accidentally destroy the human race. (Finding my keys would be an unexpected bonus.) To avoid this confusion, the principles talk about
human preferences rather than human values, since the former term
seems to steer clear of judgmental preconceptions about morality.
“Putting in values” is, of course, exactly the mistake I am saying we
should avoid, because getting the values (or preferences) exactly right
is so difficult and getting them wrong is potentially catastrophic. I am
proposing instead that machines learn to predict better, for each person, which life that person would prefer, all the while being aware that
the predictions are highly uncertain and incomplete. In principle, the
machine can learn billions of different predictive preference models,
one for each of the billions of people on Earth. This is really not too
much to ask for the AI systems of the future, given that present-day
Facebook systems are already maintaining more than two billion individual profiles.
A related misunderstanding

---
> *[Truncated at 420 KB for optimal local RAG indexing speed]*
