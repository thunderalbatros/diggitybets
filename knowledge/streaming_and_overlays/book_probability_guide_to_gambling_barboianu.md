# 📚 Libro Completo: Probability Guide to Gambling: The Mathematics of Dice, Slots, Roulette

**Alcance:** Fuente bibliográfica completa sobre Matemática de Probabilidades en Juegos de Azar, RTP, Volatilidad, Combinatoria de Carretes (Reels), Ruleta y Dados (Probability Guide to Gambling: The Mathematics of Dice, Slots, Roulette — Catalin Barboianu). Aplicable a la Software Factory Web y DiggityBets. NO sustituye los contratos de API de Kick ni las reglas específicas de negocio en `CANON_*`.

> **Autor:** Catalin Barboianu  
> **Dominio:** Matemática de Probabilidades en Juegos de Azar, RTP, Volatilidad, Combinatoria de Carretes (Reels), Ruleta y Dados  
> **Archivo Fuente:** `Catalin Barboianu Probability Guide to Gambling The Mathematics of Dice, Slots, Roulette.pdf`  
> **Páginas Originales:** 54  
> **Secciones Extraídas:** 14  
> **Fecha de Ingesta:** 2026-10-19  

---

## Sección 1: Foundations & Introduction

PROBABILITY GUIDE
TO
GAMBLING
The Mathematics of Dice, Slots, Roulette, Baccarat,
Blackjack, Poker, Lottery and Sport Bets
Cătălin Bărboianu
∏


-- 1 of 54 --

INFAROM Publishing
Applied Mathematics
office@infarom.com
http://www.infarom.com
http://probability.infarom.ro
ISBN-10 9738752027
ISBN-13 9789738752023
Publisher: INFAROM
Author and translator: Cătălin Bărboianu
Correction Editor: Sara M. Stohl
Copyright © INFAROM 2009
This work is subject to copyright. All rights are reserved, whether the whole or
part of the material is concerned, specifically the rights of translation, reprinting,
reuse of tables, recitation, broadcasting, reproduction on microfilm or in any other
way, and storage in data banks.
Duplication of this publication or parts thereof is permitted only under the
provisions of Copyright Laws and permission for use must always be obtained
from INFAROM.

-- 2 of 54 --

CONTENTS (of the complete edition)
Introduction ………………………………………………………. 5
Probability Theory Basics ………………………………………... 15
Fundamental notions ……………………………………………... 16
Sets ……………………………………………………………... 16
Functions ……………………………………………………….. 18
Boole algebras ………………………………………………….. 20
Sequences of real numbers. Limit ……………………………… 22
Series of real numbers ………………………………………….. 28
Measure theory basics ……………………………………………. 29
Sequences of sets ……………………………………………….. 30
Tribes. Borel sets. Measurable space …………………………... 31
Measure ………………………………………………………… 34
Field of events. Probability ………………………………………. 37
Field of events ………………………………………………….. 39
Probability on a finite field of events …………………………... 45
Properties of probability ………………………………………... 48
Probability σ-field ……………………………………………… 54
Independent events. Conditional probability …………………... 56
Total probability formula. Bayes’s theorem …………………. 58
Law of large numbers …………………………………………... 59
Discrete random variables ……………………………………… 61
Distribution function …………………………………………. 64
Classical discrete probability distributions …………………... 65
Bernoulli scheme …………………………………………… 65
Poisson scheme …………………………………………….. 67
Polynomial scheme ………………………………………… 69
Scheme of nonreturned ball ………………………………... 70
Convergence of sequences of random variables ……………... 71
Law of large numbers ………………………………………. 72
Combinatorics …………………………………………………….. 75
Permutations ……………………………………………………. 75
Arrangements …………………………………………………... 76
Combinations …………………………………………………... 77
The Mathematics of Games of Chance …………………………... 79
Experiments, events, probability fields ………………………… 80
Probability calculus ………………………………………….…. 88
Properties of probability ……………………………………… 88
Odds and probability …………………………………………. 91
Combinations ………………………………………………… 92
Expectation …………………………………………………….. 93
Relative frequency. Law of Large Numbers …………………… 96

-- 3 of 54 --

Relativity of probability results ………………………………… 100
The Guide of Numerical Results …………………………………. 105
Dice ………………………………………………………………. 106
Two dice ………………………………………………………... 106
Three dice ………………………………………………………. 109
Slots ………………………………………………………………. 111
Three reels ……………………………………………………… 111
Four reels ……………………………………………………….. 112
Roulette ………………………………………………………….. 118
Simple bets ……………………………………………………... 121
Complex bets …………………………………………………… 124
Equivalent bets …………………………………………………. 127
Betting on a colour and on numbers of the opposite colour …… 129
The martingale …………………………………………………. 147
Baccarat …………………………………………………………. 151
Blackjack ………………………………………………………… 181
Classical Poker ………………………………………………….. 201
Initial probabilities on the first card distribution for your own
hand ………………………………………………………………… 205
Prediction probabilities after the first card distribution and
before the second for your own hand ………………………………. 214
Prediction probabilities for opponents’ hands ………………….. 239
Odds of holding three of a kind or better …………………….. 241
Texas Hold’em Poker …………………………………………… 248
Immediate odds ………………………………………………… 252
Preflop odds ………………………………………………….. 252
Flop odds ……………………………………………………... 262
Turn odds …………………………………………………….. 274
Other odds ……………………………………………………. 275
Opponents’ hands probabilities ………………………………… 279
Lottery …………………………………………………………… 280
General formula of the winning probability ……………………. 283
Cumulated winning probabilities ………………………………. 297
Enhancing the winning probability …………………………….. 299
Sport Bets ………………………………………………………... 304
The Probability-based Strategy ………………………………….. 311
References ……………………………………………………….. 329

-- 4 of 54 --

Introduction
Probability theory is a formal theory of mathematics like many
others, but none of them raised so many questions about its
interpretations and applicability in daily life as this theory does.
Even though many of these questions have found no satisfactory
answer yet, probability still remains the only theory that models
hazards through mathematical methods, even if it operates on a
minute part of what a hazard would mean.
Owing to its psychological impact on human concerns in daily
life, probability theory has gained considerable popularity among
ordinary people, regardless of whether they have a mathematical
background. Moreover, people refer to probability and statistics
anytime they need additional information about the occurrence of an
event.
Laymen and scientists alike are fascinated by probability theory
because it has multiple models in nature, it is a calculus tool for
other sciences and the probability concept has major philosophical
implications as well.
But no matter how paradoxically it may look, the popularity of
probability theory is not that beneficial for average people. The
relativities of the term probability, even if related only to the
mathematical definition, may introduce a lot of errors into the
qualitative and quantitative interpretation of probability, especially
as a degree of belief.
These interpretation errors, as well as that false certainty
psychologically introduced by the numerical result of measuring an
event, turn probability calculus into a somewhat dangerous tool in
the hands of persons having little or no elementary mathematical
background. This affirmation is not at all hazardous, because
probabilities are frequently the basis of decisions in everyday life.
Due to a natural need that is more or less rigorously justified,
humans consistently refer to statistics; therefore, probability has
become a real decision-making tool.
Here is an example—otherwise unwanted—of making a decision
based on probability is the following:

---

## Sección 2: Foundations & Introduction

-- 5 of 54 --

Your doctor communicates the stages of evolution of your
disease: if you won’t have an operation, you have a 70 percent
chance of living, and if you’ll have the operation, you have a 90
percent chance of a cure, but there is a 20 percent chance that you
will die during the operation.
Thus, you are in a moment when you have to make a decision,
based on personal criteria and also on communicated figures (their
estimation was performed by the doctor according to statistics).
In most cases of probability-based decisions, the person involved
performs the estimation or calculus. Here is a simple example:
You are in a phone booth and you must urgently communicate
important information to one of your neighbors (let us say you left
your front door open). You have only one coin, so you can make
only one call. You have two neighboring houses. Two persons live in
one of them and three persons live in the other. Both their
telephones have answering machines. Which one of the two numbers
will you call?
The risk is that nobody will be at the home you call and the coin
will be lost when the answering machine starts. You could make an
aleatory choice, but you could also make the following decision:
“Because the chances for somebody to be home are bigger in the
case of house with three persons, I will call there.”
Thus, you have made a decision based on your own comparison
of probabilities. Of course, the only information taken into account
was the number of persons living in each house.
If other additional information—such the daily schedules of your
neighbors—is factored in, the probability result might be different
and, implicitly, you might make a different decision.
In the previous example, the estimation can be made by anyone
because it is a matter of simple counting and comparison. But in
most situations, a minimum knowledge of combinatorics and the
calculus of probabilities are required for a correct estimation or
comparison.
Millions of people take a chance in the lottery, but probably
about 10 percent of them know what the winning probabilities really
are. Let us take, for example, the 6 from 49 system (six numbers are
drawn from 49 and one simple variant to play has six numbers; you
win with a variant having a minimum of four winning numbers).

-- 6 of 54 --

The probability of five numbers from your variant being drawn is
about 1/53992, and the probability of all six numbers being drawn
(the big hit!) is 1/13983816.
For someone having no idea of combinations, these figures are
quite unbelievable because that person initially faces the small
numbers 5, 6 and 49, and does not see how those huge numbers are
obtained. In fact, this is the psychological element that a lottery
company depends on for its system to work.
If a player knew those figures in advance, would he or she still
play? Would he or she play less often or with fewer variants? Or
would he or she play more variants in order to better the chances?
Whatever the answers to these questions may be, those probabilities
will influence the player’s decision.
There are situations where a probability-based decision must be
made—if wanted—in a relatively short time; these situations do not
allow for thorough calculus even for a person with a mathematical
background.
In gambling, such decisional situations are encountered all over:
you ask yourself which combination of cards it is better to keep and
which to replace in a five draw poker, if raise or not after flop in
Hold’em, if ask for an additional card in blackjack when you have
good points, etc.
If probability is used as a criterion in making gaming decisions,
you have to know in advance probabilities of the events related to
your own play, as well as probabilities related to opponents’ play
and compare them.
We estimate, approximate, communicate and compare
probabilities daily, sometimes without realizing it, especially to
make favorable decisions. The methods through which we perform
these operations could not be rigorous or could even be incorrect,
but the need to use probability as criterion in making decisions
generally has a precedence. In addition, establishing a certain
threshold from which the chance of an event occurring attributes to
it the quality of being probable or very probable is a subjective
choice.
Psychologically speaking, the tendency of novices to grant the
word probability a certain importance is generally excessive in two
ways: the word is granted too much importance—the figures come
to represent the subjective absolute degree of trust in an event

-- 7 of 54 --

occurring—or too little importance—so many times, an equal sign is
put between probable and possible and the information provided by
numbers is not taken into account.
This could be explained by the fact that human beings
automatically refer to statistics in any specific situation, and
statistics and probability theory are related. We usually take a
certain action as result of a decision because statistically, that action
led to a favorable result in a number of previous cases. In other
words, the probability of getting a favorable result after that action is
acceptable. This decisional behavior belongs to a certain human
psychology and the human action is generally not conditioned by
additional knowledge.
Although statistics and even probability do not provide any
precise information on the result of a respective action, the decision
is made intuitively, without reliance on scientific proof that the
decision is optimum.
What is, in fact, the motivation behind such general behavior of
appealing to statistics? Is there a rational motivation or it is only a
matter of human biological structures? The answer is somewhere at
the middle and can be explained in large part by psychology.
All along, man felt safe as an individual only when he was
grounded on something sure and perceptible. The human mind also
submits to this principle. Practical statistics is a collection of sure
results; namely, frequencies of events that already happened, and
these happenings are a certainty. Unlike statistics, the prediction, by
estimating a degree of belief, refers to events that have not happened
yet and their occurrence is an uncertainty, so the human mind
classifies them in the category of unsafe and tends to increase
somehow their sureness by transferring sure things (the statistical
results) upon them.
Although humans act in the real word in uncertain conditions, in
an unsure environment, the human mind perceives this thing as an
anomaly and tries to ameliorate it by elaborating degrees of belief
that come from sure environments, such as practical statistics.
This psychic process of unconditioned migration to certainty
environments is a reflex action of possibly ancestral origin and may
be changed only through a profound study of notions of frequency,
probability and degree of belief.

---

## Sección 3: Foundations & Introduction

-- 8 of 54 --

Beyond the psychological aspect, there is also a minimal rational
theoretical motivation behind this process of appealing to statistics,
which results from its connection to probability and is analogue to
the motivation for probability-based decisions in games. We talk
about this more in the chapter titled The Probability–based Strategy.
Appealing to practical statistics is not only an individual option,
but it is also currently practiced in industry and even in scientific
communities. Economic fields such as insurance, marketing,
industrial testing of materials; research domains such as
pharmacology and medicine; and disciplines such as psychology and
sociology all use statistics as the main tool in making decisions
related to their activities by transforming statistical results into
degrees of belief and decisional criteria.
The psychological factor manifests not only in the interpretation
and application processes of probability, but also in the estimation of
numerical results. The calculation of mathematical probability itself
in practical situations is the subject of subjective and even erroneous
judgments in turn, especially if applied without minimal conceptual
knowledge of probability theory.
Many times probabilities are intuited, even when a rigorous
calculus is possible. In such situations, the respective person
estimates or compares two probabilities without executing the entire
process, which consists of framing the problem, studying it and
applying a rigorous calculus, but bases the decision only on his or
her own feeling.
Many times, sufficiently good approximations are obtained
through intuition, but most of time the result does not conform to
reality and may lead to wrong decisions.
The estimation of probabilities may be incorrect at the
intuitive level because such an intuition is not in fact a quick rational
process that skips some steps and reaches a correct final result, but is
a group of reflex actions that combine known trivial results with a
human’s own subjective expectations.
The estimation errors can come from an unsubstantial
observation, an inadequate or inexistent framing of the problem or
they may be just technical errors in calculus.
Here is a simple example of false intuition, in which the error
comes from an incorrect framing of the problem:

-- 9 of 54 --

You have the following information: A person has two children,
at least one a boy. What is the probability of the other child being a
boy, too? You are tempted to answer 1/2, by thinking there are only
two choices: boy and girl. In fact, the probability is 1/3, because the
possible situations are three:
boy–girl (BG)
girl–boy (GB)
boy–boy (BB)
and one of them is favorable, namely (BB).
The initial information refers to both children as a group and not
to a particular child from the group. In the case of estimation of 1/2 ,
the error comes from establishing the sample space (and, implicitly
the field of events) as being {B, G}, when in, fact it, is a set of
ordered pairs: {BG, GB, BB}.
The probability would be 1/2 if one of the two children had been
fixed by hypothesis (as example: the oldest is a boy or the tallest is a
boy).
For many people, the famous birthday problem is another
example of contradiction with their own intuitions:
If you randomly choose twenty-four persons, what do you think
of the probability of two or more of them having the same birthday
(this means the same month and the same day of the year)?
Even if you cannot mentally estimate a figure, intuitively you feel
that it is very low (if you do not know the real figure in advance).
Still, the probability is 27/50, which is a little bit higher than 50
percent!
A simple method of calculus to use here is the step by step one:
The probability for the birthday of two arbitrary persons not to be
the same is 364/365 (because we have one single chance from 365
for the birthday of the first person to match the birthday of the
second). The probability for the birthday of a third person to be
different from those of the other two is 363/365; for the birthday of a
fourth person is 362/365, and so on, until we get to the last person,
the 24th, with a 342/365 probability.
We have obtained twenty-three fractions, which all must be
multiplied to get the probability of all twenty-four birthdays to be
different. The product is a fraction that remains as 23/50 after
reduction. The probability we are looking for is the probability of
the contrary event, and this is 1 – 23/50 = 27/50.

-- 10 of 54 --

This calculus does not take February 29 into account, or that
birthdays have a tendency to concentrate higher in certain months
rather than in others. The first circumstance diminishes the
probability, while the second increases it.
If you bet on the coincidence of birthdays of twenty-four persons,
on average you would loose twenty-three and win twenty-seven of
each fifty bets over time. Of course, the more persons considered,
the higher the probability. With over sixty persons, probability gets
very close to certitude. For 100 persons, the chance of a bet on a
coincidence is about 3000000 : 1. Obviously, absolute certitude can
be achieved only with 366 persons or more.
One of the most curious behaviors based on false intuition is
that of lottery players, where the winning probabilities are extremely
low.
As a game of chance that offers the lowest winning odds, it is not
predisposed to strategies. The player (regular or not) purely and
simply tries his or her fortune, whether he or she knows the involved
mathematical probabilities beforehand.
Still, too few players stop contributing to the lottery, even when
they hear or find what the real probability figures are.
In a 6 from 49 lottery system, the probability of winning the 1st
category with a single played variant (six numbers) is 1/13983816.
If playing weekly during a lifetime (let us assume eighty years of
playing, respectively, 4320 draws), the probability for that player to
finally win improves to 1/3236. Still assuming that the person plays
ten or even 100 variants once, he or she has a probability of 1/323 or
1/32, which is still low for a lifetime. And we did not even take into
account the amount invested. What exactly makes lottery players
persevere in playing by ignoring these figures?
Beyond the addiction problems, there is also a psychological
motivation of reference to community, having observation as a
unique criterion.
A regular player may ask himself or herself the question: “If
people all around me win the lottery, why can’t I have my day once,
too?” Probability theory cannot completely answer to that question,
but in exchange it can answer the question why that player has not
won until the present moment: because the probability of winning is
very close to zero.
Another example of false intuition is still related to the lottery.

---

## Sección 4: Foundations & Introduction

-- 11 of 54 --

Most players avoid playing the variant 1, 2, 3, 4, 5, 6. Their
argument is intuitive: It is impossible for the first six numbers to be
drawn. Indeed, it is almost impossible, in the sense that the
probability of drawing that variant is 1/13983816. Still, this
probability remains the same for any played variant (assuming the
technical procedure of drawing is absolutely random). There are no
preferential combinations, so that particular variant has not at all an
inferior status from point of view of possibility of occurrence.
Moreover, if someone won by playing that variant, the amount
won would be much higher than in the case of other played variant,
because the winning fund will be divided (eventually) among fewer
players. Thus, the optimal decision would be to play that particular
variant instead of others. Of course, this decision remains optimal as
long as most players are not acquainted with this information.
False intuition successfully manifests in several gaming situations
in gambling. The so-called feeling of the player, which at a certain
moments will influence a gaming decision, is very often a simple
illusory psychical reaction that is not analytically grounded.
Probability represents one of the domains in which intuition may
play bad tricks, even for persons with some mathematical education.
Therefore, intuition must not be used as a calculus tool or for
probability estimation.
A correct probability calculus must be based on minimal, but
clear, mathematical knowledge and must follow the basic logical
algorithm of the application process, starting with framing the
problem, then establishing the probability field and the calculus
itself.
This book is not a teaching material on probability theory basics
and calculus, even it holds a mathematical chapter with the
fundamental probability notions and results. For the readers
interested in a course for beginners, we recommend the book
Understanding and Calculating the Odds: Probability Theory
Basics and Calculus for Beginners, with Applications in Games of
Chance and Everyday Life, where they can find detailed
explanations of the probability concept and all the supporting math
explained at undergraduate level, along with all interpretations of
probability.

-- 12 of 54 --

This book is addressed primarily to gamblers, and therefore
contains a large collection of precalculated probability results (both
formulas and numerical values) for the major games of chance.
It aims to present all the real numerical probabilities attached to
most gaming situations, especially those requiring decisions, to help
gamblers in avoiding calculus errors, false intuitions and the wrong
probability-based decisions.
It is not a gambling strategy book, even though some of the
sections dealing with games contain recommendations, but these are
only mathematical expectations based on probability figures.
Even though it helps gamblers, this book is not intended to
encourage them to persevere in the games they practice. It just
presents the mathematical facts, namely the probabilities attached to
the gaming events they encounter. They will find that most of these
probabilities are very low in comparison with their own previous
convictions, which could make them quit some games, rather than
encouraging them to continue gambling.
The structure and content of the major chapters follows:
Probability Theory Basics
This is the strictly mathematical chapter that contains all the
rigorous definitions that establish the basis for the probability
concept, starting from set operations, sequences of real numbers,
convergence, Boole algebras, and measures, to field of events,
probability, conditional probability and random variables.
We only insisted on the finite cases, because all probability
applications in games of chance are running on finite fields of events
and finite sample spaces.
The chapter contains only the main theoretical results, which are
presented as enunciations without demonstrations, but also contains
many examples.
You will find here all the math needed in performing probability
calculus for finite applications.
The players only interested in the numerical results or the persons
having no mathematical background may choose to skip the
mathematical chapters, with no repercussions on the practical goal
of using this guide, namely to pick the numerical probabilities for
the desired gaming situations.

-- 13 of 54 --

Combinatorics
Combinatorial analysis is an important calculus tool in
probability applications and this is the reason why it has a dedicated
chapter.
This chapter contains the definitions of permutations,
combinations and arrangements, along with their calculus formulas
and main properties.
The Mathematics of Games of Chance
Here we present these games not only as a good application field
for probability theory, but also in terms of human actions where
probability-based strategies can be tried to achieve favorable results.
Through suggestive examples, the reader can see what
experiments, events and probability fields mean in games of chance
and why and how probability formulas can be applied there.
The Guide of Numerical Results (for Dice, Slots, Roulette,
Baccarat, Blackjack, Classical Poker, Texas Hold’em Poker,
Lottery and Sport Bets)
This is the collection of numerical results that players can use in
frequent gaming stages and situations.
Each section corresponds to a game of chance and starts with a
description of the respective game and its rules, and then goes on
with the general framing of probability problems within the
respective game.
Next you will find some partially or completely solved
applications and a collection of precalculated results that are
structured on categories of gaming situations specific to respective
game.
All numerical results are illustrated in tables and listings at the
end of each section, from where they can be extracted and directly
used by interested players.
The Probability-based Strategy
The preponderant usage of probability as a decision-making
criterion naturally generates the need for theoretical motivation.
This chapter is an essay containing the definition of probabilitybased strategy and mathematical demonstrations showing that such
strategy is theoretically optimal.

---

## Sección 5: Foundations & Introduction

-- 14 of 54 --

PROBABILITY THEORY BASICS
In this chapter we present the main set of notions and foundation
results for the mathematical concept of probability and probability
theory.
Because this guide is addressed principally to beginners, we have
limited it to the notions leading to the rigorous definition of
probability and the properties generating the formulas that are
necessary to practical calculus as well, especially for discrete and
finite cases.
..………………. Missing part ……………………
COMBINATORICS
Combinatorial analysis plays a major role in probability
applications, from a calculus perspective, because many situations
deal with permutations, combinations or arrangements.
The correct approach to combinatorial problems and the ease of
handling combinatorial calculus are 50 percent of the probability
calculus abilities for games of chance.
As in the previous chapter on mathematics, the theoretical
discussions present only definitions and important results, without
demonstrations.
..………………. Missing part ……………………

-- 15 of 54 --

THE MATHEMATICS OF
GAMES OF CHANCE
For a math person or the reader who skims the math chapter, the
games of chance appear to be pure applications of probability
calculus. And this is exactly what they are: experiments generating
various types of aleatory events, the probability of which can be
calculated by using the properties of probability on a finite field of
events.
For a gambler interested in the mathematics of games of chance,
these games are more than pure probability applications. They are a
way of life, a kind of living companion a gambler interacts with in
order to squeeze profit from them by using strategies that may or
may not include mathematics.
Even though the randomness inherent in games of chance is
would seem to ensure their fairness (at least with respect to the
players around a table—shuffling a deck or spinning a wheel do not
favor any player except if they are fraudulent), gamblers always
search and wait for irregularities in this randomness that will allow
them to win.
It has been mathematically proved that, in ideal conditions of
randomness, no long-run regular winning is possible for players of
games of chance; therefore, gambling is not a good option as a way
of making a living. Most gamblers accept this premise, but still work
on strategies to make them win over the long run. And this approach
may not be quite as absurd as it appears, even if mathematics is
taken into account—probability theory is built under idealized
conditions and the law of large numbers theoretically works at
infinity.
Play using a long-run strategy to achieve a cumulated positive
result means ignoring the randomness and skipping the experiments
giving negative results. This strategy is possible only if a player has
access to some paranormal information—someone has to have prior
knowledge and be able to tell the player when to play and when not
to! Until this magic help becomes possible, probability theory

-- 16 of 54 --

remains the only tool that provides some information about gaming
events, even as an idealized relative frequency.
Gamblers also may be interested in isolated winnings, running
the risk in a single game or in short-run play, with or without a
gaming strategy. No matter the chosen options and strategies, they
will be interested in the amount of that risk and this means
probability. Knowing the probabilities attached to gaming events is
extra information all players need, even if they do not use it.
In the beginning, probability theory was inspired by games of
chance. The observations on the occurrences of the various gaming
events and on their frequencies led to the probability models that
were built later.
And as probability theory developed, all works and presentations
became packed with examples from games of chance. This
happened because, as discussed earlier, these games offer, through
their technical processes of working, a randomness that is hardly
questionable. The famous unbiased die or dice have always been
included in scholarly examples as random generators of measurable
events. The term lottery was adopted in the common speech as an
attribute of something very unpredictable.
Owing to this unquestionable randomness, any application of
probability calculus in gambling has sufficient accuracy to lead to a
numerical result that can stand for the measure of the physical
possibility of a gaming event occurring.
Experiments, events, probability fields
The technical processes of a game stand for experiments that
generate aleatory events.
Throwing the dice in craps is an experiment that generates events
such as occurrences of certain numbers on the dice, obtaining a
certain sum of the shown numbers, obtaining numbers with certain
properties (less than a specific number, higher that a specific
number, even, uneven, and so on).
The sample space of such an experiment is {1, 2, 3, 4, 5, 6} for
rolling one die or {(1, 1), (1, 2), ..., (1, 6), (2, 1), (2, 2), ..., (2, 6), ...,
(6, 1), (6, 2), ..., (6, 6)} for rolling two dice. The latter is a set of
ordered pairs and counts 6 x 6 = 36 elements.

-- 17 of 54 --

The events can be identified with sets, namely parts of the sample
space. For example, the event occurrence of an even number is
represented by the following set in the experiment of rolling one die:
{2, 4, 6}.
Spinning the roulette wheel is an experiment whose generated
events could be the occurrence of a certain number, of a certain
color or a certain property of the numbers (low, high, even, uneven,
from a certain row or column, and so on).
The sample space of the experiment involving spinning the
roulette wheel is the set of numbers the roulette holds: {1, 2, 3, ...,
36, 0, 00} for the American roulette, or {1, 2, 3, ..., 36, 0} for the
European.
The event occurrence of a red number is represented by the set
{1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36}.
These are the numbers inscribed in red on the roulette wheel and
table.
Dealing cards in blackjack is an experiment that generates events
such as the occurrence of a certain card or value as the first card
dealt, obtaining a certain total of points from the first two cards
dealt, exceeding 21 points from the first three cards dealt, and so on.
In card games we encounter many types of experiments and
categories of events. Each type of experiment has its own sample
space.
For example, the experiment of dealing the first card to the first
player has as its sample space the set of all 52 cards (or 104, if
played with two decks).
The experiment of dealing the second card to the first player has
as its sample space the set of all 52 cards (or 104), less the first card
dealt.
The experiment of dealing the first two cards to the first player
has as its sample space a set of ordered pairs, namely all the 2-size
arrangements of cards from the 52 (or 104).
In a game with one player, the event the player is dealt a card of
10 points as the first dealt card is represented by the set of cards
{10♠, 10♣, 10♥, 10♦, J♠, J♣, J♥, J♦, Q♠, Q♣, Q♥, Q♦, K♠, K♣, K♥,
K♦}.

---

## Sección 6: Foundations & Introduction

-- 18 of 54 --

The event the player is dealt a total of five points from the first
two dealt cards is represented by the set of 2-size combinations of
card values {(A, 4), (2, 3)}, which in fact counts 4 x 4 + 4 x 4 = 32
combinations of cards (as value and symbol).
In 6/49 lottery, the experiment of drawing six numbers from the
49 generate events such as drawing six specific numbers, drawing
five numbers from six specific numbers, drawing four numbers from
six specific numbers, drawing at least one number from a certain
group of numbers, etc.
The sample space here is the set of all 6-size combinations of
numbers from the 49.
..………………. Missing part ……………………
In the experiment of dealing the pocket cards in Texas Hold’em
Poker:
– The event of dealing (3♣, 3♦) to a player is an elementary
event;
– The event of dealing two 3’s to a player is compound because is
the union of events (3♣, 3♠), (3♣, 3♥), (3♣, 3♦), (3♠, 3♥), (3♠, 3♦)
and (3♥, 3♦);
– The events player 1 is dealt a pair of kings and player 2 is dealt
a pair of kings are nonexclusive (they can both occur);
– The events player 1 is dealt two connectors of hearts higher
than J and player 2 is dealt two connectors of hearts higher than J
are exclusive (only one can occur);
– The events player 1 is dealt (7, K) and player 2 is dealt (4, Q)
are non-independent (the occurrence of the second depends on the
occurrence of the first, while the same deck is in use).
These are a few examples of gambling events, whose properties
of compoundness, exclusiveness and independency are easily
observable. These properties are very important in practical
probability calculus.
The complete mathematical model is given by the probability
field attached to the experiment, which is the triple sample space—
field of events—probability function.

-- 19 of 54 --

For any game of chance, the probability model is of the simplest
type—the sample space is finite, the field of events is the set of parts
of the sample space, implicitly finite, too, and the probability
function is given by the definition of probability on a finite field of
events:
If { } , Ω Σ is a finite field of events, we call probability on Σ , a
function : P R Σ → meeting the following conditions:
(1) P(A) ≥ 0, for any A∈ Σ ;
(2) P( Ω ) = 1;
(3) P(A1 ∪ A 2 ) = P(A1 ) + P(A 2 ), for any A1 , A 2 ∈ Σ with
A1 ∩ A 2 = φ .
From this definition and the axioms of a Boole algebra flow all
the properties of probability that can be applied in the practical
calculus in gambling.
In the assumption that elementary events are equally possible,
this definition reverts to the classical definition of probability: Call
probability of event A the ratio between the number of situations
favorable for A to occur and the number of equally possible
situations.
The equally possible idealization is the only approximation we
have to make to apply probability theory in gambling experiments in
order to have aleatory events attached to them.
But this idealization is much more accurate here than in any other
field where probability theory is applied, owing to the technical
construction of the gambling machines, the physical supplies used
and the gaming processes. No one can question that, in
nonfraudulent conditions, no certain numbers are favored during the
spin of a roulette wheel, certain faces of a die at a roll or certain
symbols on a slot machine spinning.
This idealization comes into question only in some interpretations
of probability at the theoretical level, but the mathematical theory of
probability remains rigorous even if based on this hypothesis.
Otherwise, it would not exist and the probability concept would
make no sense.
Returning to the classical definition of probability, it is used
on a large scale in probability calculus applied to gambling because

-- 20 of 54 --

for any game of chance and for any experiment related to that game,
we can find a field of events with equally possible elementary
events.
This phenomenon is possible for the reasons explained before
when we talked about the equally possible idealization in gambling.
For example:
– In the experiment of rolling three dice, the elementary events
could be the occurrence of 3-size combinations of numbers from 1
to 6; these can be denoted by (xyz), with { } , , 1, ..., 6 x y z ∈ ;
..………………. Missing part ……………………
We then have different sample spaces, different fields of events
and, implicitly, different probability fields.
This is why the same event (literally defined) can have two
different probabilities, one in each probability field.
For example, the event the flop cards are suited, which has the
probability 3 3
13 52 4 / C C for a neutral observer, has a different
probability for a player inside the game, depending on his or her
own pocket cards.
Of course, we must always choose the probability field offering
the maximal amount of information for the probability to be the
most accurate as a measure of possibility.
In our example, if you are a player, you must take into account all
the seen cards. This is true for any card game.
After framing the problem by establishing the probability field
and the elementary events, the probability calculus follows.
Probability calculus
Probability calculus actually means to apply selected formulas
and obtain a final result by replacing the numerical values within the
formulas and working the numerical calculations.
These formulas are the properties of the probability function and
the Boolean properties of the field of events.

-- 21 of 54 --

As mentioned earlier, the probability fields attached to games of
chance allow decomposing any event to be measured into equally
possible elementary events.
That is why the classical definition of probability is the main
formula for use in gambling probability applications.
Theoretically, any probability gambling problem, no matter how
difficult, can be solved by using this basic formula several
successive times. Occasionally, this approach can be very laborious
and impractical in a reasonable time period.
Depending on the complexity of the event to be measured, other
formulas can be used, and the most important of them are discussed
in the following paragraphs.
Properties of probability
( ) ( ) ( ) P A B P A P B ∪ = + , for any , A B ∈ Σ with A B ∩ = φ .
1 1
( )
n n
i i
i i
P A P A
= =
  =  
    , for any finite family of mutually exclusive
events ( ) 1
n
i i
A = (finite additivity in condition of incompatibility)
) ( 1 ) ( A P A P C − = (probability of contrary event)
( ) ( ) ( ) ( ) P A B P A P B P A B ∪ = + − ∩ (general formula of
probability of union of two events)
( ) 1 2
( ) ( )
n
n i i j
i j i
P A A A P A P A A
= <
∪ ∪ = − ∩    +
( ) i j k
i j k
P A A A
< <
∩ ∩  + … + 1
( 1)n−
− P(A1 ∩ A 2 ∩ … ∩ A n )
(inclusion-exclusion principle or the general formula of probability
of finite union of events)
This formula is applied as follows:
We have n events and want to calculate the probability of their
union.
We consider successively all 1-size combinations, 2-size
combinations and so on until n-size combinations of the n events
(we have a single 1-size combination and a single n-size
combination).

---

## Sección 7: Foundations & Introduction

-- 22 of 54 --

We add the probabilities of unions of each group of same-size
combinations.
For the groups of combinations having an even number as a
dimension, the total result is add then with minus (subtracted) and
for those with an uneven number as a dimension the total result is
add with plus (addition).
( ) ( ) ( ) P A B P A P B ∩ = ⋅ , if events A and B are independent (the
definition of independent events).
( ) ( )
( )
P A B
P A B P B
∩
= (the definition of conditional probability)
( ) ( ) ( ) i i
i I
P A P A P A A
∈
=  , if ( ) i i I
A ∈ ⊂ Σ is a complete system of
events with ( ) 0, i P A i I ≠ ∀ ∈ (the formula of total probability)
( ) ( ) ( )
( ) ( )
i i
i
i i
i I
P A P A A
P A A P A P A A
∈
⋅
= ⋅  , if ( ) i i I
A ∈ ⊂ Σ is a complete
system of events with ( ) 0, i P A i I ≠ ∀ ∈ (Bayes’s theorem).
Formulas of the classical probability repartitions:
Bernoulli scheme
n independent experiments are performed. In each an event A
occurs with probability p and does not occur with probability
q = 1 – p.
The probability for event A to occur exactly m times in the n
experiments is ,
m m n m
m n n P C p q −
=
Poisson scheme
n independent experiments are performed. In each an event A
occurs with probability , ( 1, 2, ..., ) i p i n = and does not occur with
probability 1 i i q p = − .
The probability for event A to occur exactly m times in the n
experiments ( , m n P ) is the coefficient of m
z from the product

-- 23 of 54 --

( ) ( )
n
n i i
i
z p z q
=
φ = + ∏ (the generating function of probabilities , m n P )
The probability for A to occur at least m times in the n
experiments is ( ) ,
n
m k n
k m
P C P
=
=  .
..………………. Missing part ……………………
Combinations
Games of chance are also good examples of combinations,
permutations and arrangements, which are met at every step:
combinations of cards in a player’s hand, on the table or expected in
any card game; combinations of numbers when rolling several dice
once; combinations of numbers in lottery and bingo; combinations
of symbols in slots; permutations and arrangements in a race to be
bet on, and the like.
Combinatorial calculus is an important part of gambling
probability applications.
In games of chance, most of the gambling probability calculus in
which we use the classical definition of probability reverts to
counting combinations. The gaming events can be identified with
sets, which often are sets of combinations. Thus, we can identify an
event with a combination.
For example, in a five draw poker game, the event at least one
player holds a four of a kind formation can be identified with the set
of all combinations of (xxxxy) type, where x and y are distinct values
of cards.
This set has 4
4 13 (52 4) 624 C − = combinations, so it is too big to
be unfolded here.
Possible combinations are (3♠ 3♣ 3♥ 3♦ J♣) or (7♠ 7♣ 7♥ 7♦ 2♣).
These can be identified with elementary events that the event to
be measured consists of.
The combinations must be counted very carefully to avoid double
counting or missing one or more combinations. A proper count may
use the combinatorial formulas and properties directly or may use
additional procedures such as partitioning.

-- 24 of 54 --

Expectation
Games of chance are not merely pure applications of probability
calculus and gaming situations are not just isolated events whose
numerical probability is well established through mathematical
methods; they are also games whose progress is influenced by
human action.
In gambling, the human element has a striking character. The
player is not only interested in the mathematical probability of the
various gaming events, but he or she has expectations from the
games while a major interaction exists. To obtain favorable results
from this interaction, gamblers take into account all possible
information, including statistics, to build gaming strategies.
While humans appeal to past statistical results to get a subjective
probability as a degree of belief, there is also a reverse
psychological process: the prediction of future statistical results
based on a given probability. Such prediction behavior manifests
preponderantly in gambling, where probabilities are associated with
stakes in order to predict an average future gain or loss.
This predicted future gain or loss is called expectation or
expected value and is the sum of the probability of each possible
outcome of the experiment multiplied by its payoff (value). Thus, it
represents the average amount one expects to win per bet if bets
with identical odds are repeated many times.
A game or situation in which the expected value for the player is
zero (no net gain nor loss) is called a fair game. The attribute fair
refers not to the technical process of the game, but to the chance
balance house (bank)–player.
For example, an American roulette wheel has 38 equally possible
outcomes. Assume a bet placed on a single number pays 35–to–1
(this means that you are paid 35 times your bet and your bet is
returned, so you get back 36 times your bet). So, the expected value
of the profit resulting from a one dollar repeated bet on a single
number is:
37 1
$1 $35
38 38
   
− × + ×    
    , which is about –$0.05.
Therefore one expects, on average, to lose over five cents for
every dollar bet.

-- 25 of 54 --

For a one dollar bet on heads at a coin flip (win $1 and your bet is
returned if heads comes up, and loose the bet if not), the expected
value is: 0
1
1 $
1
1 $ = 




 × + 




 × − , so this is a fair game.
This prediction also has a rigorous model in probability theory,
namely, the mathematical expectation:
If X is a discrete random variable with values ix and
corresponding probabilities i p , i I ∈ , the sum or sum of series (if
convergent) ( ) i i
i I
M X x p
∈
= ⋅  is called mathematical expectation,
expected value or mean of variable X.
So, the mathematical expectation is a weighted mean, in the sense
of the definition given above. It terms of gambling, this value means
the amount (positive or negative) a player should expect, if
performing same type of experiment (game or gaming situation) in
identical conditions and by making the same bet, via mathematical
probability. In fact, it is information about the fairness of that game.
..………………. Missing part ……………………
Relative frequency. Law of Large Numbers
Let us see what relative frequency means.
Staying with the example experiment of rolling the die and taking
the same event A (occurrence of number 5), let us assume we have a
sequence of independent experiments (tests) 1 2 3 , , , ..., , ... n E E E E ,
each generating a certain outcome.
We can choose this sequence as being the chronological sequence
of tests of rolling the die, performed by same person over time, or
the chronological sequence of such tests performed by whatever
number of established persons.
We can also choose the sequence as being the chronological
sequence of such tests performed by all the people on Earth who
make up this experiment.
No matter the set of chosen tests, as long as they are well defined
and form a sequence (an infinite enumeration can be attached to
them). Obviously, any of these choices is hypothetical.

---

## Sección 8: Foundations & Introduction

-- 26 of 54 --

Within this sequence of independent tests ( ) 1 n n
E ≥ , we define the
relative frequency of occurrence (producing) of event A.
Let us assume the die rolls a 2 on the first test ( 1 E ). At this
moment (after one test), the number of occurrences of 5 is 0.
..………………. Missing part ……………………
Relativity of probability results
The Law of Large Numbers is the only qualitative result
probability theory provides us about the occurrence of an event,
either in gambling or daily life. This is the only practical prediction
of an event, even if it only works at infinity.
Still, it must be applied with prudence because the mathematical
model that it comes from does not entirely reproduce the real
phenomenon, and this is due to infinity.
In fact, infinity grounds the concept of probability, which makes
no sense in the absence of an infinite collective. And this becomes a
major relativity of probability when talking about its applications in
daily life, where all real experiments have a finite nature.
The mathematical fact stated by the Law of Large Numbers,
namely, that the sequence of relative frequencies converges toward
probability (which stand for the definition of probability as a limit),
is many times transposed into practice without analyzing in detail if
the theorem’s conditions about the infinite collective (the sequence
of independent experiments is infinite) are met.
Knowing the Law of Large Numbers and the probability of
rolling a certain number on a die (let us say, number 3) is 1/6, a
gambler expects the die to show the number 3 once in six rolls, at
least cumulatively, in a large number of rolls.
But the sequence of experiments of rolling a die in which the
gambler participates is not infinite, for the hypothesis of the Law of
Large Numbers to be met and its conclusion to be applied.
Even if the gambler accumulates all the experiments of this type
in which he participated until that moment, he still gets a finite
number of these.

-- 27 of 54 --

Nevertheless, experience has proved statistically that the relative
frequency of occurrence of number 3 on a die oscillates around 1/6
for very long successions of experiments.
If the gambler bets 5 to 1 on the number 3 (that is, he will lose the
stake if he does not roll a 3 and will win five times the stake if he
does), he does so because he is 1/6 convinced of the occurrence of
the number 3 and is 5/6 convinced of the contrary.
These degrees of belief are, in fact, the expression of the relative
frequency: in a long succession of rolls, the number 3 will occur
one-sixth of the time.
..………………. Missing part ……………………
THE GUIDE OF NUMERICAL
RESULTS
This chapter contains a large collection of numerical probability
results covering a very large part of the gaming events and situations
encountered in games of chance.
The results are grouped into sections along with a description of
each game and solutions to a few of the probability applications
involved in each game.
The solved applications can be skipped by gamblers interested
only in numerical results because the partial results are used again at
the end of each subsection and listed, mostly in tables, from where
they can be easily selected to match the desired situation.
The numerical probability results are shown in a double format:
fraction and decimal numbers as percentages; the second format
always includes five or three decimal places for each irrational
number.
The games of chance covered by this chapter are: Dice, Slots,
Roulette, Baccarat, Blackjack, Classical Poker, Texas Hold’em
Poker, Lottery and Sport Bets.
Gamblers using this collection of results must bear in mind that
knowing the odds only results in additional information and not in
immediate or even short-term winnings.

-- 28 of 54 --

These results are just the numerical applications of mathematical
probability in gambling.
Using them in a properly built strategy is not only a matter of
mathematics but also of unavoidable subjective choice.
We recommend that all readers with some mathematical
background read the last chapter titled The Probability-based
Strategy, to see how to incorporate the role of probability theory in
making decisions.
Dice
A die is a cube with faces numbered from 1 to 6 and is used as
random generator of values in some casino, society or strategic
games.
Games may use one or more dice.
For any game using dice, the probabilities of obtaining certain
combinations of numbers on the dice are the same.
Obtaining a certain number (from 1 to 6) in one roll of a die has
the same probability for every number, that is 1/6.
The probability of rolling a certain number is
P = 1/6 = 16.66666%.
Two dice
The occurrence of a certain two numbers on two dice represents
two independent events, so the probability of obtaining any ordered
2–size combination of numbers is 1/6 x 1/6 = 1/36.
For example, the event 2 on the first die and 5 on the second die
has a 1/36 probability.
However, in games the order of numbers in the combination

-- 29 of 54 --

(5, 2) does not count (no matter which die shows 5 and which shows
2).
Therefore, the probability of obtaining (5, 2) (unordered) is
1/36 + 1/36 = 1/18.
The same probability holds for any other combination of two
different numbers, except in doubles, which have a 1/36 probability
each.
The probability of obtaining a double is 6 x 1/36 = 1/6.
Let us calculate the probability of obtaining a certain number on
at least one die.
Let us take number 1 (for any other number the probability will
be the same) and let A – the first die shows number 1 and B – the
second die shows number 1 be the events involved.
The intersection A ∩ B has a single element, namely the variant
(1, 1), which has a 1/36 probability of occurrence.
Hence, we have P(A ∪ B) = 1/6 + 1/6 – 1/36 = 11/36.
Probability of obtaining a certain combination of two
different numbers is P = 1/18 = 5.55555%.
Probability of obtaining a certain double is
P = 1/36 = 2.77777%.
Probability of obtaining a double is P = 1/6 = 16.66666%.
Probability of obtaining a certain number on at least one die
is P = 11/36 = 30.55555%.
In some games, the sum of the two numbers shown also counts.
Let us calculate the probability of obtaining the sum S = 2.
This happens only in the case of the occurrence of a variant
(1, 1), so we have a 1/36 probability.
For S = 3, the favorable variants are (1, 2) and (2, 1), so
P = 2/36 = 1/18.
For S = 4, the favorable variants are (1, 3), (2, 2) and (3, 1), so
P = 3/36 = 1/12.
Probability of obtaining sum 2 is P = 1/36 = 2.77777%.
Probability of obtaining sum 3 is P = 1/18 = 5.55555%.
Probability of obtaining sum 4 is P = 1/12 = 8.33333%.

---

## Sección 9: Foundations & Introduction

-- 30 of 54 --

If we want to calculate the probability of obtaining the number 4
on at least one die or obtaining the sum 4, we observe that the events
obtaining 4 on at least one die and obtaining the sum 4 are
incompatible (at a variant with a (4, x) form, we have 4 4 x + ≠ ), so
P = 11/36 + 1/12 = 7/18.
Probability of obtaining number 4 on at least one die or
obtaining sum 4 is P = 7/18 = 38.88888%.
The probabilities of all events specific to games that use two dice
are shown in the table below.
..………………. Missing part ……………………
Slots
A slot machine is a device with three, four or five reels that is
actuated mechanically or electrically after one or more coins or paid
chips are inserted. The reels have on their external side several
graphical symbols, with the same symbols on each reel, and they
spin independently at the same time, after the player activates the
handle or the button. After the reels stop spinning, a certain
combination of collinear symbols occurs by the side of a central
mark (the winning line).
Any winnings are differentiated by the combinations of symbols
achieved. Generally, a player wins when three or four identical
symbols line up, or with other combinations that hold two identical
symbols.
The slot machine is also called a flipper, fruit machine or onearmed bandit. There are also electronic variants of this system that
randomly generate symbols on a display.
We now present the probabilities of obtaining winning
combinations for slot machines having three and four reels and one
winning line, which are the most common.

-- 31 of 54 --

Three reels
At a three-reel slot machine, the winning combinations are three
identical symbols (triple), combinations with a certain symbol and
two certain identical symbols and two identical symbols (double).
The problem of calculating the probabilities of occurrence of the
various combinations is most similar to the one from the dice case.
Let n be the number of symbols on each reel. The total number of
possible combinations that can occur after the machine is actuated is
n . The probability of obtaining a certain triple is
(1/n)(1/n)(1/n) = 1/ 3
n , and the probability of obtaining a triple is
3 2
(1/ ) 1/ n n n ⋅ = because the events a triple of symbol is occurs,
i = 1, …, n, are mutually exclusive.
Probability of obtaining a certain triple is 3
1/ P n = .
Probability of obtaining a triple is 2
1/ P n = .
Let us calculate the probability of obtaining a certain double. Let
s be a symbol and let:
1 A – s only appears on reels 1 and 2 – variants (ssx), x s ≠
2 A – s only appears on reels 1 and 3 – variants (sxs), x s ≠
3 A – s only appears on reels 2 and 3 – variants (xss), x s ≠
be the events involved. 3
1 2 3 ( ) ( ) ( ) 3( 1) / P A P A P A n n = = = −
The intersections of events i A are empty; therefore,
1 2 3 ( ) 3( 1) / P A A A n n ∪ ∪ = − . The probability of obtaining a double
is 3 2
3( 1) / 3( 1) / n n n n n ⋅ − = − because the events a double of symbol
is occurs, i = 1, …, n, are mutually exclusive (a variant containing
two symbols is cannot contain other two symbols j s , if i j ≠ ).
Probability of obtaining a certain double is 3
3( 1) / P n n = − .
Probability of obtaining a double is 2
3( 1) / P n n = − .
Let us calculate the probability of obtaining a certain double (of
symbol s) and a certain symbol (v).
..………………. Missing part ……………………

-- 32 of 54 --

The following tables list the probabilities of occurrence of the
various winning combinations for slot machines having three and
four reels, which have 5, 6, 7, 8, 9 or 10 symbols.
3 reels, n = 5
Event P ( / ) P ( % )
certain triple 1/125 0.8
triple 1/25 4
certain double 12/125 9.6
double 12/25 48
certain double and certain symbol 3/125 2.4
3 reels, n = 6
Event P ( / ) P ( % )
certain triple 1/216 0.46296
triple 1/36 2.77777
certain double 5/72 6.94444
double 5/12 41.66666
certain double and certain symbol 1/72 1.38888
3 reels, n = 7
Event P ( / ) P ( % )
certain triple 1/343 0.29154
triple 1/49 2.04081
certain double 18/147 12.24489
double 18/49 36.73469
certain double and certain symbol 3/343 0.87463
..………………. Missing part ……………………

-- 33 of 54 --

Roulette
Roulette is a simple, easy to learn game. It offers a wide variety
of bets and combinations of bets.
The Roulette wheel has 36 numbers from 1 to 36, a “0”, and
usually a “00”. Most U.S. casinos have a “00” as well as the “0”, so
they have 38 numbers. This is called American roulette.
Most European casinos have only “0”, without “00”, so they have
37 numbers. This is called European roulette.
The players place bets on numbers or groups of numbers; a
player’s goal is to predict the winning number or other of properties
of that number (colour, evenness, size, or place on the roulette
table).
Each game consists of placing bets and waiting for a number,
which is randomly generated by a spinning ball coming to rest inside
a disk on which numbers are inscribed (the roulette wheel) that is
also spinning, but in the opposite direction.
..………………. Missing part ……………………
Depending on how the chips should be placed on roulette table,
these bets are of two categories: inside and outside bets.
The next two tables note all possible bets, along with their brief
description and corresponding payouts.
Inside bet Description Payout
Straight Up A bet directly on any single number 35 to 1
Split Bet A bet split between any two numbers 17 to 1
Street Bet A bet on a row of 3 numbers 11 to 1
Corner Bet A bet on 4 numbers 8 to 1
Line Bet A bet on 6 numbers over 2 rows 5 to 1

-- 34 of 54 --

Outside bet Description Payout
Column Bet A bet covering 12 numbers from a column 2 to 1
Dozen Bet A bet covering a set of 12 numbers
low (1-12) mid (13-24) and high (25-36) 2 to 1
Colour Bet A bet on either red or black 1 to 1
Even/Odd Bet A bet on either even or odd 1 to 1
Low/High Bet A bet on either 1-18 or 19-36 1 to 1
The payout is written in odds format and represents the
coefficient to multiply the stake of a won bet.
For example, if you bet $3 on a column (payout 2 to 1) and a
number from that column wins, you will receive $3 x 2 = $6,
together with your initial $3 stake.
..………………. Missing part ……………………
Simple bets
When betting in roulette, we are interested in the winning or
losing probability, and in the amount of profit we can gain or lose.
These depend, of course, on the stake we put in. In fact, they depend
on the basic stake we put on each placement.
The winning probability, losing probability, and possible profit
and loss are objective criteria for a player when deciding the type of
bet to make at a certain moment or what betting system to run.
Beside these objective criteria, there are also subjective criteria
related to a player’s personal gambling behavior. However, in this
book we deal only with objective criteria, which are strictly related
to mathematics.
We call a simple bet a bet that is made through a unique
placement of chips on the roulette table. So, if we place chips in any
number or amount in a single place on the table, we have made a
simple bet.
If the outcome after the spin is a number we have bet on, we win
the bet and the profit on that bet, which is the stake multiplied by the

---

## Sección 10: Foundations & Introduction

-- 35 of 54 --

payout. If the outcome is not favorable, we lose the stake. This
applies to any simple bet made.
The table below notes the winning probabilities for each category
of simple bet, for both European and American roulette:
Simple bet Probability (odds)
European roulette
Probability (odds)
American roulette Payout
Straight Up 1/37 = 2.70% (36 : 1) 1/38 = 2.63% (37 : 1) 35 to 1
Split Bet 2/37 = 5.40% (17.5 : 1) 2/38 = 5.26% (18 : 1) 17 to 1
Street Bet 3/37 = 8.10% (11.3 : 1) 3/38 = 7.89% (11.6 : 1) 11 to 1
Corner Bet 4/37 = 10.81% (8.2 : 1) 4/38 = 10.52% (8.5 : 1) 8 to 1
Line Bet 6/37 = 16.21% (5.1 : 1) 6/38 = 15.78% (5.3 : 1) 5 to 1
Column Bet 12/37 = 32.43% (2 : 1) 12/38 = 31.57% (2.1 : 1) 2 to 1
Dozen Bet 12/37 = 32.43% (2 : 1) 12/38 = 31.57% (2.1 : 1) 2 to 1
Colour Bet 18/37 = 48.64% (1.0 : 1) 18/38 = 47.36% (1.1 : 1) 1 to 1
Even/Odd Bet 18/37 = 48.64% (1.0 : 1) 18/38 = 47.36% (1.1 : 1) 1 to 1
Low/High Bet 18/37 = 48.64% (1.0 : 1) 18/38 = 47.36% (1.1 : 1) 1 to 1
The probabilities of winning the simple bets are approximately
equal in both American and European roulette (the difference varies
from 1/1406 in the case of one number bet to about 1/78 in the case
of a colour bet).
The probabilities of specific events attached to the experiment of
spinning the roulette wheel are easily calculable—each probability
is given by the ratio between the number of favorable numbers and
37 or 38.
The table shows 10 categories of simple bets, each containing
several specific placements.
We can state that we have 154 possible simple bets. This
statement is rigorous if we identify a bet with its placement, but a
bet is determined not only by the placement of the chips, but also on
the amount of the bet. In fact, the number of all possible simple bets
is infinite (under the idealization that any chip division in smaller
amounts is possible, even when only limited stakes are allowed).
Let us denote by R the set of all roulette numbers. Any placement
for a bet is then a subset of R, or an element of P (R).

-- 36 of 54 --

Denote by A the set of the groups of numbers from R allowed for
a bet made through a unique placement.
For example, { } ∈ 2 A (straight-up bet), { } ∈ 17 16, A (split bet),
{ } ∈ 15 14 12 11 , , , A (corner bet),
{ } ∈ 35 33 31 29 27 25 23 21 19 17 15 13 11 9 7 5 3 1 , , , , , , , , , , , , , , , , , A (odd
bet), { } ∉ 19 , 0 A (the numbers 0 and 19 cannot be covered by an
allowed unique placement).
A has 154 elements; the number of unique placements allowed.
As mentioned earlier, a simple bet is determined solely by the
placement and the stake.
We can define a simple bet as being a pair (A, S), where ∈ A A
and 0 > S is a real number.
A is the placement (the set of numbers covered by the bet) and S
is the basic stake (the money amount in chips).
Because each simple bet has a payout defined by the rules of
roulette, we can also look at a simple bet as at a triple ( ) S , p , A A ,
where A p is a natural number (the coefficient of multiplication of
the stake in case of winning), which is determined solely by A.
We have that { } 35 17 11 8 5 2 1 , , , , , , p A ∈ , according to the rules of
roulette.
The probability of winning a simple bet becomes ( ) R
A
A P = ,
where A means the cardinality of the set A. Of course, R could be
38 or 37, depending on the roulette type (American or European,
respectively).
..………………. Missing part ……………………
( ) e W B can be also written as:
( ) ( ) ( ) [ ] ( )( ) [ ]S p e S e S p e e W A A A A A B 1 1 1 1 1 1 − + = − − =
Function B W is called the profit of bet B, applying the convention
that profit can also be negative (a loss).
The variable e is the outcome of the spin. If A e ∈ (the player
wins bet B), then the player makes the positive profit S p A , and if

-- 37 of 54 --

A e ∉ (the player loses the bet B), then the player makes a negative
profit of – S (losing an amount equal to S as result of that bet).
..………………. Missing part ……………………
Complex bets
Roulette allows players to spread their chips anywhere on the
table by following the rules of placement. In other words, a player
can make simultaneously multiple placements of various stakes.
We can call complex bets these simultaneous placements. A
complex bet consists of several placements of various stakes, so a
complex bet is a family of simple bets.
The number of possible multiple placements is huge. If we
identify a placement with the set of numbers it covers, this number
is in fact the number of all subsets of the set A.
While A has 154 elements, the number of its subsets is 154
2 ,
which is a 47-digit number.
Mathematically, a complex bet can be described by the
following:
Definition:
We call a complex bet any finite family of pairs ( ) I i i i s , A B ∈
 =
with ∈ i A A and 0 > is real numbers, for every I i ∈ (I is a finite set
of consecutive indexes starting from 1).
Each pair ( ) i i s , A is a simple bet, whose placement covers the set
of numbers i A and whose basic stake is is .
Thus, we define a complex bet as a family of simple bets.
Of course, if 1 = I , then B becomes a simple bet.
We can also denote bet B by the triple ( ) i i i s , p , A , where i p is
the payout of each simple bet i A .
Denote by B the set of all possible bets (simple or complex).

-- 38 of 54 --

..………………. Missing part ……………………
Betting on a colour and on numbers
of the opposite colour
This complex bet consists of a colour bet (payout 1 to 1) and
several straight-up bets (payout 35 to 1) on numbers of the opposite
colour.
To generalize the example from the previous section, let us
denote by S the amount bet on each number, by cS the amount bet
on the colour and by n the number of bets placed on single numbers
(the number of straight-up bets).
S is a positive real number (measurable in any currency), the
coefficient c is also a positive real number and n is a non-negative
natural number (between 1 and 18 because there are 18 numbers of
one colour).
The possible events after the spin are:
A – winning the bet on colour
B – winning a bet on a number
C – not winning any bet.
These events are mutually exclusive and exhaustive, so:
1 ) ( ) ( ) ( ) ( = + + = ∪ ∪ C P B P A P C B A P
Now let us find the probability of each event and the profit or loss
in each case:
A. The probability of a number of a certain colour winning is
P(A) = 18/38 = 9/19 = 47.368%.
In the case of winning the colour bet, the player wins
cS – nS = (c – n)S, using the convention that if this amount is
negative, that will be called a loss.
B. The probability of one of n specific numbers winning is
P(B) = n/38.
In the case of winning a straight-up bet, the player wins
35S – (n – 1)S – cS = (36 – n – c)S, using the same convention from
event A.

---

## Sección 11: Foundations & Introduction

-- 39 of 54 --

C. The probability of not winning any bet is
20
38 19
1 ) ( ) ( 1 ) ( n n
B P A P C P −
= − − = − − = .
In the case of not winning any bet, the player loses
cS + nS = (c + n)S.
As we can see, the overall winning probability is
18
) ( ) ( n
B P A P +
= + .
With this formula, increasing the probability of winning would be
done by increasing n.
But this increase should be done under the constraint of the bet
being non-contradictory. Of course, this reverts to a constraint on
the coefficients c.
It is natural to put the condition of a positive profit in both cases
A and B, which results in: n < c < 36 – n.
This condition gives a relation between parameters n and c and
restrains the number of subcases to be studied.
These formulas return the next tables of values, in which n
increases from 1 to 17 and c increases by increments of 0.5.
S is left as a variable for players to replace with any basic stake
according to their own betting behaviors and strategies.
Observation:
The same formulas and tables also hold true for the following
complex bets: Even/Odd bet and straight-up bets on odd/even
numbers; High/Low bet and straight-up bets on low/high numbers.
This happens because the bets are equivalent, respectively, if they
have the same stakes.

-- 40 of 54 --

Winning the bet
on colour
Winning a bet
on a number
Not winning
any bet
n c Odds Profit Odds Profit Odds Loss
1 1.5 47.36% 0.5 S 2.63% 33.5 S 50% 2.5 S
1 2 47.36% S 2.63% 33 S 50% 3 S
1 2.5 47.36% 1.5 S 2.63% 32.5 S 50% 3.5 S
1 3 47.36% 2 S 2.63% 32 S 50% 4 S
1 3.5 47.36% 2.5 S 2.63% 31.5 S 50% 4.5 S
1 4 47.36% 3 S 2.63% 31 S 50% 5 S
1 4.5 47.36% 3.5 S 2.63% 30.5 S 50% 5.5 S
1 5 47.36% 4 S 2.63% 30 S 50% 6 S
1 5.5 47.36% 4.5 S 2.63% 29.5 S 50% 6.5 S
1 6 47.36% 5 S 2.63% 29 S 50% 7 S
1 6.5 47.36% 5.5 S 2.63% 28.5 S 50% 7.5 S
1 7 47.36% 6 S 2.63% 28 S 50% 8 S
1 7.5 47.36% 6.5 S 2.63% 27.5 S 50% 8.5 S
1 8 47.36% 7 S 2.63% 27 S 50% 9 S
1 8.5 47.36% 7.5 S 2.63% 26.5 S 50% 9.5 S
1 9 47.36% 8 S 2.63% 26 S 50% 10 S
1 9.5 47.36% 8.5 S 2.63% 25.5 S 50% 10.5 S
1 10 47.36% 9 S 2.63% 25 S 50% 11 S
1 10.5 47.36% 9.5 S 2.63% 24.5 S 50% 11.5 S
1 11 47.36% 10 S 2.63% 24 S 50% 12 S
1 11.5 47.36% 10.5 S 2.63% 23.5 S 50% 12.5 S
1 12 47.36% 11 S 2.63% 23 S 50% 13 S
1 12.5 47.36% 11.5 S 2.63% 22.5 S 50% 13.5 S
1 13 47.36% 12 S 2.63% 22 S 50% 14 S
1 13.5 47.36% 12.5 S 2.63% 21.5 S 50% 14.5 S
1 14 47.36% 13 S 2.63% 21 S 50% 15 S
1 14.5 47.36% 13.5 S 2.63% 20.5 S 50% 15.5 S
1 15 47.36% 14 S 2.63% 20 S 50% 16 S
1 15.5 47.36% 14.5 S 2.63% 19.5 S 50% 16.5 S
1 16 47.36% 15 S 2.63% 19 S 50% 17 S
1 16.5 47.36% 15.5 S 2.63% 18.5 S 50% 17.5 S
1 17 47.36% 16 S 2.63% 18 S 50% 18 S
1 17.5 47.36% 16.5 S 2.63% 17.5 S 50% 18.5 S
1 18 47.36% 17 S 2.63% 17 S 50% 19 S
1 18.5 47.36% 17.5 S 2.63% 16.5 S 50% 19.5 S
1 19 47.36% 18 S 2.63% 16 S 50% 20 S
1 19.5 47.36% 18.5 S 2.63% 15.5 S 50% 20.5 S
1 20 47.36% 19 S 2.63% 15 S 50% 21 S
1 20.5 47.36% 19.5 S 2.63% 14.5 S 50% 21.5 S
1 21 47.36% 20 S 2.63% 14 S 50% 22 S

-- 41 of 54 --

Winning the bet
on colour
Winning a bet
on a number
Not winning
any bet
n c Odds Profit Odds Profit Odds Loss
1 21.5 47.36% 20.5 S 2.63% 13.5 S 50% 22.5 S
1 22 47.36% 21 S 2.63% 13 S 50% 23 S
1 22.5 47.36% 21.5 S 2.63% 12.5 S 50% 23.5 S
1 23 47.36% 22 S 2.63% 12 S 50% 24 S
1 23.5 47.36% 22.5 S 2.63% 11.5 S 50% 24.5 S
1 24 47.36% 23 S 2.63% 11 S 50% 25 S
1 24.5 47.36% 23.5 S 2.63% 10.5 S 50% 25.5 S
1 25 47.36% 24 S 2.63% 10 S 50% 26 S
1 25.5 47.36% 24.5 S 2.63% 9.5 S 50% 26.5 S
1 26 47.36% 25 S 2.63% 9 S 50% 27 S
1 26.5 47.36% 25.5 S 2.63% 8.5 S 50% 27.5 S
1 27 47.36% 26 S 2.63% 8 S 50% 28 S
1 27.5 47.36% 26.5 S 2.63% 7.5 S 50% 28.5 S
1 28 47.36% 27 S 2.63% 7 S 50% 29 S
1 28.5 47.36% 27.5 S 2.63% 6.5 S 50% 29.5 S
1 29 47.36% 28 S 2.63% 6 S 50% 30 S
1 29.5 47.36% 28.5 S 2.63% 5.5 S 50% 30.5 S
1 30 47.36% 29 S 2.63% 5 S 50% 31 S
1 30.5 47.36% 29.5 S 2.63% 4.5 S 50% 31.5 S
1 31 47.36% 30 S 2.63% 4 S 50% 32 S
1 31.5 47.36% 30.5 S 2.63% 3.5 S 50% 32.5 S
1 32 47.36% 31 S 2.63% 3 S 50% 33 S
1 32.5 47.36% 31.5 S 2.63% 2.5 S 50% 33.5 S
1 33 47.36% 32 S 2.63% 2 S 50% 34 S
1 33.5 47.36% 32.5 S 2.63% 1.5 S 50% 34.5 S
1 34 47.36% 33 S 2.63% 1 S 50% 35 S
1 34.5 47.36% 33.5 S 2.63% 0.5 S 50% 35.5 S
2 2.5 47.36% 0.5 S 5.26% 31.5 S 47.36% 4.5 S
2 3 47.36% 1 S 5.26% 31 S 47.36% 5 S
2 3.5 47.36% 1.5 S 5.26% 30.5 S 47.36% 5.5 S
2 4 47.36% 2 S 5.26% 30 S 47.36% 6 S
2 4.5 47.36% 2.5 S 5.26% 29.5 S 47.36% 6.5 S
2 5 47.36% 3 S 5.26% 29 S 47.36% 7 S
2 5.5 47.36% 3.5 S 5.26% 28.5 S 47.36% 7.5 S
2 6 47.36% 4 S 5.26% 28 S 47.36% 8 S
2 6.5 47.36% 4.5 S 5.26% 27.5 S 47.36% 8.5 S
2 7 47.36% 5 S 5.26% 27 S 47.36% 9 S
2 7.5 47.36% 5.5 S 5.26% 26.5 S 47.36% 9.5 S
2 8 47.36% 6 S 5.26% 26 S 47.36% 10 S
2 8.5 47.36% 6.5 S 5.26% 25.5 S 47.36% 10.5 S
2 9 47.36% 7 S 5.26% 25 S 47.36% 11 S

-- 42 of 54 --

Winning the bet
on colour
Winning a bet
on a number
Not winning
any bet
n c Odds Profit Odds Profit Odds Loss
2 9.5 47.36% 7.5 S 5.26% 24.5 S 47.36% 11.5 S
2 10 47.36% 8 S 5.26% 24 S 47.36% 12 S
2 10.5 47.36% 8.5 S 5.26% 23.5 S 47.36% 12.5 S
2 11 47.36% 9 S 5.26% 23 S 47.36% 13 S
2 11.5 47.36% 9.5 S 5.26% 22.5 S 47.36% 13.5 S
2 12 47.36% 10 S 5.26% 22 S 47.36% 14 S
2 12.5 47.36% 10.5 S 5.26% 21.5 S 47.36% 14.5 S
2 13 47.36% 11 S 5.26% 21 S 47.36% 15 S
2 13.5 47.36% 11.5 S 5.26% 20.5 S 47.36% 15.5 S
2 14 47.36% 12 S 5.26% 20 S 47.36% 16 S
2 14.5 47.36% 12.5 S 5.26% 19.5 S 47.36% 16.5 S
2 15 47.36% 13 S 5.26% 19 S 47.36% 17 S
2 15.5 47.36% 13.5 S 5.26% 18.5 S 47.36% 17.5 S
2 16 47.36% 14 S 5.26% 18 S 47.36% 18 S
2 16.5 47.36% 14.5 S 5.26% 17.5 S 47.36% 18.5 S
2 17 47.36% 15 S 5.26% 17 S 47.36% 19 S
2 17.5 47.36% 15.5 S 5.26% 16.5 S 47.36% 19.5 S
2 18 47.36% 16 S 5.26% 16 S 47.36% 20 S
2 18.5 47.36% 16.5 S 5.26% 15.5 S 47.36% 20.5 S
2 19 47.36% 17 S 5.26% 15 S 47.36% 21 S
2 19.5 47.36% 17.5 S 5.26% 14.5 S 47.36% 21.5 S
2 20 47.36% 18 S 5.26% 14 S 47.36% 22 S
2 20.5 47.36% 18.5 S 5.26% 13.5 S 47.36% 22.5 S
2 21 47.36% 19 S 5.26% 13 S 47.36% 23 S
2 21.5 47.36% 19.5 S 5.26% 12.5 S 47.36% 23.5 S
2 22 47.36% 20 S 5.26% 12 S 47.36% 24 S
2 22.5 47.36% 20.5 S 5.26% 11.5 S 47.36% 24.5 S
2 23 47.36% 21 S 5.26% 11 S 47.36% 25 S
2 23.5 47.36% 21.5 S 5.26% 10.5 S 47.36% 25.5 S
2 24 47.36% 22 S 5.26% 10 S 47.36% 26 S
2 24.5 47.36% 22.5 S 5.26% 9.5 S 47.36% 26.5 S
2 25 47.36% 23 S 5.26% 9 S 47.36% 27 S
2 25.5 47.36% 23.5 S 5.26% 8.5 S 47.36% 27.5 S
2 26 47.36% 24 S 5.26% 8 S 47.36% 28 S
2 26.5 47.36% 24.5 S 5.26% 7.5 S 47.36% 28.5 S
2 27 47.36% 25 S 5.26% 7 S 47.36% 29 S
2 27.5 47.36% 25.5 S 5.26% 6.5 S 47.36% 29.5 S
2 28 47.36% 26 S 5.26% 6 S 47.36% 30 S
2 28.5 47.36% 26.5 S 5.26% 5.5 S 47.36% 30.5 S
2 29 47.36% 27 S 5.26% 5 S 47.36% 31 S

---

## Sección 12: Foundations & Introduction

-- 43 of 54 --

Winning the bet
on colour
Winning a bet
on a number
Not winning
any bet
n c Odds Profit Odds Profit Odds Loss
2 29.5 47.36% 27.5 S 5.26% 4.5 S 47.36% 31.5 S
2 30 47.36% 28 S 5.26% 4 S 47.36% 32 S
2 30.5 47.36% 28.5 S 5.26% 3.5 S 47.36% 32.5 S
2 31 47.36% 29 S 5.26% 3 S 47.36% 33 S
2 31.5 47.36% 29.5 S 5.26% 2.5 S 47.36% 33.5 S
2 32 47.36% 30 S 5.26% 2 S 47.36% 34 S
2 32.5 47.36% 30.5 S 5.26% 1.5 S 47.36% 34.5 S
2 33 47.36% 31 S 5.26% 1 S 47.36% 35 S
2 33.5 47.36% 31.5 S 5.26% 0.5 S 47.36% 35.5 S
3 3.5 47.36% 0.5 S 7.89% 29.5 S 44.73% 6.5 S
3 4 47.36% 1 S 7.89% 29 S 44.73% 7 S
3 4.5 47.36% 1.5 S 7.89% 28.5 S 44.73% 7.5 S
3 5 47.36% 2 S 7.89% 28 S 44.73% 8 S
3 5.5 47.36% 2.5 S 7.89% 27.5 S 44.73% 8.5 S
3 6 47.36% 3 S 7.89% 27 S 44.73% 9 S
3 6.5 47.36% 3.5 S 7.89% 26.5 S 44.73% 9.5 S
3 7 47.36% 4 S 7.89% 26 S 44.73% 10 S
3 7.5 47.36% 4.5 S 7.89% 25.5 S 44.73% 10.5 S
3 8 47.36% 5 S 7.89% 25 S 44.73% 11 S
3 8.5 47.36% 5.5 S 7.89% 24.5 S 44.73% 11.5 S
3 9 47.36% 6 S 7.89% 24 S 44.73% 12 S
3 9.5 47.36% 6.5 S 7.89% 23.5 S 44.73% 12.5 S
3 10 47.36% 7 S 7.89% 23 S 44.73% 13 S
3 10.5 47.36% 7.5 S 7.89% 22.5 S 44.73% 13.5 S
3 11 47.36% 8 S 7.89% 22 S 44.73% 14 S
3 11.5 47.36% 8.5 S 7.89% 21.5 S 44.73% 14.5 S
3 12 47.36% 9 S 7.89% 21 S 44.73% 15 S
3 12.5 47.36% 9.5 S 7.89% 20.5 S 44.73% 15.5 S
3 13 47.36% 10 S 7.89% 20 S 44.73% 16 S
3 13.5 47.36% 10.5 S 7.89% 19.5 S 44.73% 16.5 S
3 14 47.36% 11 S 7.89% 19 S 44.73% 17 S
3 14.5 47.36% 11.5 S 7.89% 18.5 S 44.73% 17.5 S
3 15 47.36% 12 S 7.89% 18 S 44.73% 18 S
3 15.5 47.36% 12.5 S 7.89% 17.5 S 44.73% 18.5 S
3 16 47.36% 13 S 7.89% 17 S 44.73% 19 S
3 16.5 47.36% 13.5 S 7.89% 16.5 S 44.73% 19.5 S
3 17 47.36% 14 S 7.89% 16 S 44.73% 20 S
3 17.5 47.36% 14.5 S 7.89% 15.5 S 44.73% 20.5 S
3 18 47.36% 15 S 7.89% 15 S 44.73% 21 S
3 18.5 47.36% 15.5 S 7.89% 14.5 S 44.73% 21.5 S

-- 44 of 54 --

Winning the bet
on colour
Winning a bet
on a number
Not winning
any bet
n c Odds Profit Odds Profit Odds Loss
3 19 47.36% 16 S 7.89% 14 S 44.73% 22 S
3 19.5 47.36% 16.5 S 7.89% 13.5 S 44.73% 22.5 S
3 20 47.36% 17 S 7.89% 13 S 44.73% 23 S
3 20.5 47.36% 17.5 S 7.89% 12.5 S 44.73% 23.5 S
3 21 47.36% 18 S 7.89% 12 S 44.73% 24 S
3 21.5 47.36% 18.5 S 7.89% 11.5 S 44.73% 24.5 S
3 22 47.36% 19 S 7.89% 11 S 44.73% 25 S
3 22.5 47.36% 19.5 S 7.89% 10.5 S 44.73% 25.5 S
3 23 47.36% 20 S 7.89% 10 S 44.73% 26 S
3 23.5 47.36% 20.5 S 7.89% 9.5 S 44.73% 26.5 S
3 24 47.36% 21 S 7.89% 9 S 44.73% 27 S
3 24.5 47.36% 21.5 S 7.89% 8.5 S 44.73% 27.5 S
3 25 47.36% 22 S 7.89% 8 S 44.73% 28 S
3 25.5 47.36% 22.5 S 7.89% 7.5 S 44.73% 28.5 S
3 26 47.36% 23 S 7.89% 7 S 44.73% 29 S
3 26.5 47.36% 23.5 S 7.89% 6.5 S 44.73% 29.5 S
3 27 47.36% 24 S 7.89% 6 S 44.73% 30 S
3 27.5 47.36% 24.5 S 7.89% 5.5 S 44.73% 30.5 S
3 28 47.36% 25 S 7.89% 5 S 44.73% 31 S
3 28.5 47.36% 25.5 S 7.89% 4.5 S 44.73% 31.5 S
3 29 47.36% 26 S 7.89% 4 S 44.73% 32 S
3 29.5 47.36% 26.5 S 7.89% 3.5 S 44.73% 32.5 S
3 30 47.36% 27 S 7.89% 3 S 44.73% 33 S
3 30.5 47.36% 27.5 S 7.89% 2.5 S 44.73% 33.5 S
3 31 47.36% 28 S 7.89% 2 S 44.73% 34 S
3 31.5 47.36% 28.5 S 7.89% 1.5 S 44.73% 34.5 S
3 32 47.36% 29 S 7.89% 1 S 44.73% 35 S
3 32.5 47.36% 29.5 S 7.89% 0.5 S 44.73% 35.5 S
4 4.5 47.36% 0.5 S 10.52% 27.5 S 42.10% 8.5 S
4 5 47.36% 1 S 10.52% 27 S 42.10% 9 S
4 5.5 47.36% 1.5 S 10.52% 26.5 S 42.10% 9.5 S
4 6 47.36% 2 S 10.52% 26 S 42.10% 10 S
4 6.5 47.36% 2.5 S 10.52% 25.5 S 42.10% 10.5 S
4 7 47.36% 3 S 10.52% 25 S 42.10% 11 S
4 7.5 47.36% 3.5 S 10.52% 24.5 S 42.10% 11.5 S
4 8 47.36% 4 S 10.52% 24 S 42.10% 12 S
4 8.5 47.36% 4.5 S 10.52% 23.5 S 42.10% 12.5 S
4 9 47.36% 5 S 10.52% 23 S 42.10% 13 S
4 9.5 47.36% 5.5 S 10.52% 22.5 S 42.10% 13.5 S
4 10 47.36% 6 S 10.52% 22 S 42.10% 14 S

-- 45 of 54 --

Winning the bet
on colour
Winning a bet
on a number
Not winning
any bet
n c Odds Profit Odds Profit Odds Loss
4 10.5 47.36% 6.5 S 10.52% 21.5 S 42.10% 14.5 S
4 11 47.36% 7 S 10.52% 21 S 42.10% 15 S
4 11.5 47.36% 7.5 S 10.52% 20.5 S 42.10% 15.5 S
4 12 47.36% 8 S 10.52% 20 S 42.10% 16 S
4 12.5 47.36% 8.5 S 10.52% 19.5 S 42.10% 16.5 S
4 13 47.36% 9 S 10.52% 19 S 42.10% 17 S
4 13.5 47.36% 9.5 S 10.52% 18.5 S 42.10% 17.5 S
4 14 47.36% 10 S 10.52% 18 S 42.10% 18 S
4 14.5 47.36% 10.5 S 10.52% 17.5 S 42.10% 18.5 S
4 15 47.36% 11 S 10.52% 17 S 42.10% 19 S
4 15.5 47.36% 11.5 S 10.52% 16.5 S 42.10% 19.5 S
4 16 47.36% 12 S 10.52% 16 S 42.10% 20 S
4 16.5 47.36% 12.5 10.52% 15.5 S 42.10% 20.5 S
4 17 47.36% 13 S 10.52% 15 S 42.10% 21 S
4 17.5 47.36% 13.5 S 10.52% 14.5 S 42.10% 21.5 S
4 18 47.36% 14 S 10.52% 14 S 42.10% 22 S
4 18.5 47.36% 14.5 S 10.52% 13.5 S 42.10% 22.5 S
4 19 47.36% 15 S 10.52% 13 S 42.10% 23 S
4 19.5 47.36% 15.5 S 10.52% 12.5 S 42.10% 23.5 S
4 20 47.36% 16 S 10.52% 12 S 42.10% 24 S
4 20.5 47.36% 16.5 S 10.52% 11.5 S 42.10% 24.5 S
4 21 47.36% 17 S 10.52% 11 S 42.10% 25 S
4 21.5 47.36% 17.5 S 10.52% 10.5 S 42.10% 25.5 S
4 22 47.36% 18 S 10.52% 10 S 42.10% 26 S
4 22.5 47.36% 18.5 S 10.52% 9.5 S 42.10% 26.5 S
4 23 47.36% 19 S 10.52% 9 S 42.10% 27 S
4 23.5 47.36% 19.5 S 10.52% 8.5 S 42.10% 27.5 S
4 24 47.36% 20 S 10.52% 8 S 42.10% 28 S
4 24.5 47.36% 20.5 S 10.52% 7.5 S 42.10% 28.5 S
4 25 47.36% 21 S 10.52% 7 S 42.10% 29 S
4 25.5 47.36% 21.5 S 10.52% 6.5 S 42.10% 29.5 S
4 26 47.36% 22 S 10.52% 6 S 42.10% 30 S
4 26.5 47.36% 22.5 S 10.52% 5.5 S 42.10% 30.5 S
4 27 47.36% 23 S 10.52% 5 S 42.10% 31 S
4 27.5 47.36% 23.5 S 10.52% 4.5 S 42.10% 31.5 S
4 28 47.36% 24 S 10.52% 4 S 42.10% 32 S
4 28.5 47.36% 24.5 S 10.52% 3.5 S 42.10% 32.5 S
4 29 47.36% 25 S 10.52% 3 S 42.10% 33 S
4 29.5 47.36% 25.5 S 10.52% 2.5 S 42.10% 33.5 S
4 30 47.36% 26 S 10.52% 2 S 42.10% 34 S

-- 46 of 54 --

Winning the bet
on colour
Winning a bet
on a number
Not winning
any bet
n c Odds Profit Odds Profit Odds Loss
4 30.5 47.36% 26.5 S 10.52% 1.5 S 42.10% 34.5 S
4 31 47.36% 27 S 10.52% 1 S 42.10% 35 S
4 31.5 47.36% 27.5 S 10.52% 0.5 S 42.10% 35.5 S
5 5.5 47.36% 0.5 S 13.15% 25.5 S 39.47% 10.5 S
5 6 47.36% 1 S 13.15% 25 S 39.47% 11 S
5 6.5 47.36% 1.5 S 13.15% 24.5 S 39.47% 11.5 S
5 7 47.36% 2 S 13.15% 24 S 39.47% 12 S
5 7.5 47.36% 2.5 S 13.15% 23.5 S 39.47% 12.5 S
5 8 47.36% 3 S 13.15% 23 S 39.47% 13 S
5 8.5 47.36% 3.5 S 13.15% 22.5 S 39.47% 13.5 S
5 9 47.36% 4 S 13.15% 22 S 39.47% 14 S
5 9.5 47.36% 4.5 S 13.15% 21.5 S 39.47% 14.5 S
5 10 47.36% 5 S 13.15% 21 S 39.47% 15 S
5 10.5 47.36% 5.5 S 13.15% 20.5 S 39.47% 15.5 S
5 11 47.36% 6 S 13.15% 20 S 39.47% 16 S
5 11.5 47.36% 6.5 S 13.15% 19.5 S 39.47% 16.5 S
5 12 47.36% 7 S 13.15% 19 S 39.47% 17 S
5 12.5 47.36% 7.5 S 13.15% 18.5 S 39.47% 17.5 S
5 13 47.36% 8 S 13.15% 18 S 39.47% 18 S
5 13.5 47.36% 8.5 S 13.15% 17.5 S 39.47% 18.5 S
5 14 47.36% 9 S 13.15% 17 S 39.47% 19 S
5 14.5 47.36% 9.5 S 13.15% 16.5 S 39.47% 19.5 S
5 15 47.36% 10 S 13.15% 16 S 39.47% 20 S
5 15.5 47.36% 10.5 S 13.15% 15.5 S 39.47% 20.5 S
5 16 47.36% 11 S 13.15% 15 S 39.47% 21 S
5 16.5 47.36% 11.5 S 13.15% 14.5 S 39.47% 21.5 S
5 17 47.36% 12 S 13.15% 14 S 39.47% 22 S
5 17.5 47.36% 12.5 S 13.15% 13.5 S 39.47% 22.5 S
5 18 47.36% 13 S 13.15% 13 S 39.47% 23 S
5 18.5 47.36% 13.5 S 13.15% 12.5 S 39.47% 23.5 S
..………………. Missing part ……………………

---

## Sección 13: Foundations & Introduction

-- 47 of 54 --

Initial value 5
2 + 3 1 + 4
Total
 3
Favorable
values
Total
 3
Favorable
values
2/25
 8 %
 2/25
 8 %
 –
 –
n(x) = 0
v = 2 
4/25
 16 %
–
 2/25
 8 %
 2/25
 8 %
n(x) = 0
v = 2
4/49
8.16326 %
4/49
8.16326 %
–
 –
n(x) = o
v = 3 
8/49
16.32653 %
–
 4/49
8.16326 %
4/49
8.16326 %
n(x) = o
v = 3
3/25
 12 %
–
 3/50
 6 %
 3/50
 6 %
n(x) = 1
v = 2 
–
 –
 –
 –
n(x) = 1
v = 2
9/49
18.36734 %
3/49
6.12244 %
3/49
6.12244 %
3/49
6.12244 %
n(x) = 1
v = 3 
9/49
18.36734 %
3/49
6.12244 %
3/49
6.12244 %
3/49
6.12244 %
n(x) = 1
v = 3
–
 –
 –
 –
n(x) = 2
v = 2 
–
 –
 –
 –
n(x) = 2
v = 2
4/49
8.16326 %
–
 2/49
4.08163 %
2/49
4.08163 %
n(x) = 2
v = 3 
2/49
4.08163 %
2/49
4.08163 %
–
 –
n(x) = 2
v = 3
Simple arithmetic mean :
 
10.93877 %
–
 –
 –
 –
n(x) = 3
v = 3
Probabilities
Simple arithmetic mean :
 
13.69387 %
–
 –
 –
 –
n(x) = 3
v = 3
Probabilities

-- 48 of 54 --

Initial value 6
2 + 4 1 + 5
Total
 2
Favorable
values
Total
 2
Favorable
values
4/25
 16 %
 2/25
 8 %
 –
 2/25
 8 %
n(x) = 0
v = 2 
4/25
 16 %
 2/25
 8 %
 2/25
 8 %
 –
n(x) = 0
v = 2
8/49
16,32653 %
4/49
8,16326 %
–
 4/49
8,16326 %
n(x) = o
v = 3 
8/49
16.32653 %
4/49
8.16326 %
4/49
8.16326 %
–
n(x) = o
v = 3
3/50
 6 %
 –
 3/50
 6 %
 –
n(x) = 1
v = 2 
3/50
 6 %
 –
 –
 3/50
 6 %
n(x) = 1
v = 2
9/49
18.36734 %
3/49
6.12244 %
3/49
6.12244 %
3/49
6.12244 %
n(x) = 1
v = 3 
9/49
18.36734 %
3/49
6.12244 %
3/49
6.12244 %
3/49
6.12244 %
n(x) = 1
v = 3
–
 –
 –
 –
n(x) = 2
v = 2 
–
 –
 –
 –
n(x) = 2
v = 2
2/49
4.08163 %
–
 2/49
4.08163 %
–
n(x) = 2
v = 3 
2/49
4.08163 %
–
 –
 2/49
4.08163 %
n(x) = 2
v = 3
Simple arithmetic mean :
 12.1531 %
–
 –
 –
 –
n(x) = 3
v = 3
Probabilities
Simple arithmetic mean
 : 12.1531 %
–
 –
 –
 –
n(x) = 3
v = 3
Probabilities
..………………. Missing part ……………………

-- 49 of 54 --

THE PROBABILITY-BASED
STRATEGY
As we said several times at the beginning of this book, the
mathematical probability is frequently chosen as a decision criterion
in daily life.
The motivation for such a choice generally has a psychological,
therefore, subjective nature, and any denying of it may find solid
arguments among the relativities of probability.
But there is a particular type of decisional behavior in which
choosing probability as unique criterion of decision can be
mathematically justified. It is about using the probability-based
strategy.
This kind of strategy is generally suitable for games, but it can be
extended by analogy to certain situations in daily life as well.
The term strategy assumes, directly or indirectly, a certain
repetitive action, even though that strategy is applied in a singular
context.
When a player acts in a certain way in a gaming situation as a
result of a previously adopted strategy, this action is repeated the
next time a similar situation is encountered (because that strategy is
considered good or optimum with respect to some player’s objective
or subjective criteria).
Thus, the strategy I act in way x in situation y, even if applied in
an isolated situation, assumes intrinsically a collective, even infinite
context: I will act in way x in any hypothetical situation of type y
from now on.
If we refer to the probability-based strategy, the infinite collective
is still much more present in this concept, because the mathematical
definition of probability uses such a collective.
What does a probability-based strategy actually mean?
..………………. Missing part ……………………

-- 50 of 54 --

Let us assume that in a certain game, the player reaches a
situation requiring a decision. He or she expects the occurrence of a
certain event E, which gives the player the advantage.
The player must choose between a finite number of playing
variants 1 2 , , ..., m A A A , as result of which event E may occur with
probabilities 1 2 , , ..., m p p p respectively.
Assume that 1 2 ... m p p p < < < .
Denote ( )i i A p P E = , i = 1, ..., m (the probability of the occurrence
of expected event E , on condition that the playing variant i A is
chosen, is i p ).
Applying a probability-based strategy means choosing the
playing variant m A , the one offering the player the highest
probability of the occurrence of event E.
Why must a player always choose this particular playing variant?
If we answer this question, the choice of the probability-based
strategy as optimum is theoretically justified.
Probability theory does not provide any information about the
occurrence or nonoccurrence of event E in an isolated gaming
situation in which a certain playing variant is chosen, or in a
succession of situations in which the playing variants i A are chosen
arbitrarily.
In addition, the law of large numbers cannot be applied in this
last case, because we do not deal with experiments performed in
identical conditions.
Still, as the only result hinting of the practical aspect of a
sequence of experiments, even if the information is one of limit, we
must continue to rely on the law of large numbers in the proofs that
look for the answer to the optimality problem.
To simplify, we consider the case in which there are only two
playing variants A and B (m = 2; the proof can easily be extended to
a finite number m of playing variants).
The main condition of the hypothesis is ( ) ( ) A B P E P E > .
We will prove that playing variant A is the optimum choice, in
the sense of a definition to be stated later.

-- 51 of 54 --

The proof uses only the notions of elementary mathematical
analysis on R and the law of large numbers.
..………………. Missing part ……………………
A sequence V = ( , , , , , , , , , ...) A B A A B A B A A means the choice
of an order and a number of experiments of type A and B and
represents the player’s particular strategy chosen for the succession
of games (more exactly, for the succession of occurrences of the
given gaming situation).
Such a sequence is called a sequence of (A, B) experiments and
the whole set of these sequences is denoted by S.
For an arbitrary sequence V of (A, B) type, we make the
following denotations:
v(n) = the number of occurrences of expected event E after the
first n experiments (the first n terms of the sequence);
A n = the number of experiments of type A from the first n
experiments (the number of terms A from the first n terms of the
sequence);
B n = the number of experiments of type B from the first n
experiments (the number of terms B from the first n terms of the
sequence);
Obviously, A B n n n = + .
The ratio ( ) v n
n represents the relative frequency of occurrence of
event E within the sequence of experiments V.
Note that this relative frequency cannot be the subject of the law
of large numbers because although the sequence consists of
independent experiments, they are not of same type.
We are allowed to apply this theorem only in the particular cases
in which the sequence contains only experiments of A type or of B
type.
We introduce the relations ≥ , respectively >, on the set S, as
follows:
..………………. Missing part ……………………

---

## Sección 14: Foundations & Introduction

-- 52 of 54 --

The model created and the proof presented give us theoretical
motivation for choosing the probability-based strategy as the
optimum strategy in the countable case.
How do we transfer these results to the finite or even isolated
case (of a single experiment)?
How do we motivate the choice of experiment of type A or of a
finite group of type A in the case—obviously, practical—in which a
player participates in only a limited number of experiments?
Returning to a suggestive example of a decisional situation from
the introductory chapter, how do we theoretically motivate the
person in the phone booth to consider calling the house with more
people living in it the optimum choice?
..………………. Missing part ……………………

-- 53 of 54 --

References
Bărboianu, C., Draw Poker Odds: The Mathematics of Classical Poker. Infarom,
Craiova, 2007.
Bărboianu, C., Roulette Odds and Profits: The Mathematics of Complex Bets.
Infarom, Craiova, 2004.
Bărboianu, C., Texas Hold’em Odds. Infarom, Craiova, 2004.
Bărboianu, C., The Mathematics of Lottery: Odds, Combinations, Systems.
Infarom, Craiova, 2009.
Bărboianu, C., Understanding and Calculating the Odds: Probability Theory
Basics and Calculus Guide for Beginners, with Applications in Games of Chance
and Everyday Life. Infarom, Craiova, 2006.
Crăciun, C.V., Analiză reală (Real Analysis), course of Measure Theory at
University of Bucharest, 1988.
Cuculescu, I., Teoria probabilităţilor (Probability Theory). Bic All, Bucharest,
1998.
Trandafir, R., Introducere în teoria probabilităţilor (Introduction to Probability
Theory). Albatros, Bucharest, 1979.

-- 54 of 54 --
