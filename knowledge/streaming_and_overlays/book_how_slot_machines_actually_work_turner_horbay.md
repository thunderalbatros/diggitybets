# 📚 Libro Completo: How Do Slot Machines Actually Work?

**Alcance:** Fuente bibliográfica completa sobre Funcionamiento Real de Generadores de Números Aleatorios (RNG), Paradas Virtuales, Frecuencia de Aciertos y Transparencia (How Do Slot Machines Actually Work? — Nigel E. Turner & Roger Horbay). Aplicable a la Software Factory Web y DiggityBets. NO sustituye los contratos de API de Kick ni las reglas específicas de negocio en `CANON_*`.

> **Autor:** Nigel E. Turner & Roger Horbay  
> **Dominio:** Funcionamiento Real de Generadores de Números Aleatorios (RNG), Paradas Virtuales, Frecuencia de Aciertos y Transparencia  
> **Archivo Fuente:** `Nigel-Turner-Roger-Horbay-.pdf`  
> **Páginas Originales:** 36  
> **Secciones Extraídas:** 15  
> **Fecha de Ingesta:** 2026-10-19  

---

## Sección 1: Foundations & Introduction

Journal Information
Journal ID (publisher-id): jgi
ISSN: 1910-7595
Publisher: Centre for Addiction and Mental Health
Article Information
© 1999-2004 The Centre for Addiction and Mental
Health
Received Day: 28 Month: 04 Year: 2003
Accepted Day: 17 Month: 05 Year: 2004
Publication date: July 2004
Publisher Id: jgi.2004.11.21
DOI: 10.4309/jgi.2004.11.21
How do slot machines and other electronic
gambling machines actually work?
Nigel Turner Affiliation: Centre for Addiction and Mental Health Toronto, Ontario, Canada
E-mail: Nigel_Turner@camh.net
Roger Horbay Affiliation: Game Planit Interactive Corp. Elora, Ontario, Canada
[This article prints out to about 42 pages.]
This article was peer-reviewed. Submitted: April 28, 2003. All URLs cited
were available at the time of submission. Accepted: May 17, 2004.
For correspondence: Nigel Turner, PhD, Scientist, Centre for Addiction and
Mental Health, 33 Russell Street, Toronto, Canada M5S 2S1. Phone (416)
535-8501 Ext. 6063, fax (416) 595-6899, e-mail: Nigel_Turner@camh.net.
Contributors: NT and RH jointly conceived of the idea for the paper. RH
provided specific information on current industry practices and
developments, NT provided mathematical expertise. NT wrote the first and
last drafts, both authors collaborated on revisions.
Competing interests: NT declares no competing interests. RT is president of
Game Planit Interactive Corp.
Ethical approval: None required. No people of animals were involved in this
study, only machines - which were tormented mercilessly until they revealed
their inner secrets.
Funding: NT and RH state that no external funding sources supported their
work on the project.
Nigel Turner, PhD, is a research scientist at the Centre for Addiction and
Mental Health in Toronto. He received his doctorate in cognitive psychology
at the University of Western Ontario (1995) and has worked for the Centre
for Addiction and Mental Health (CAMH) for the past nine years. He has
extensive experience in quantitative research methods including
psychometrics, surveys, experimental studies, and computer simulations.
Nigel has received grants from National Center for Responsible Gaming, the
Ontario Problem Gambling Research Centre and funding from the Ontario
Ministry of Health. He has published in peer-reviewed journals and has
given a large number of conference presentations. He is particularly
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
1 of 36 5/3/22, 3:45 PM

-- 1 of 36 --

interested in cognitive models of problem gambling and has authored three
papers on gambling systems. Outside of CAMH, Nigel has a keen interest in
history and takes part in re-enactments of historically important 19th century
battles.
Roger Horbay is president of Game Planit Interactive Corp. He is a problem
gambling consultant for treatment agencies and the gaming industry. He
develops innovative treatment, prevention and player protection strategies,
policies, and programs. He is also a recognized expert in the field of
electronic gaming and electronic gaming machines and understanding how
gambling technology contributes to the development and maintenance of
pathological gambling. He is also a founder, past president, and vice
president of the Canadian Problem Gambling Certification Board. He was an
addiction therapist and trainer with the Problem Gambling Service, Centre
for Addiction and Mental Health (1995 to 1999). Roger was on the faculty of
George Brown College in Toronto (1991 to 1995). He is an honours
graduate of the George Brown College human services counsellor program
in Toronto, majoring in addiction and mental health.
Abstract
Slot machines and other electronic gambling machines (EGMs) are gambling
devices that offer a variety of games. They are inexpensive to run, which makes it
possible for casinos to offer low-stakes betting to a large number of customers. As
a result, they have become the most profitable form of gambling. EGMs are found
at casinos, on cruise boats, at racetracks, at local bars, and even at corner stores.
Slot machines and other EGMs seem to attract a lot of myths. This is partly
because of a lack of accurate information on how the machines work and partly
due to the design of the machines. In this paper, we will discuss how slot machines
really work. Our goal is to demystify the machines in order to demystify the games.
We will also discuss some of the myths about slot machines. This paper is
intended to serve as a resource for counsellors and prevention workers in the field
of problem gambling. It is also intended for people in the general public who wish
to understand slot machines.
Introduction
Slot machines and other electronic gambling machines (EGMs) are gambling
devices that offer a variety of games. EGMs are found at casinos, on cruise boats,
at racetracks, and, in some provinces and states, in local bars and corner stores.
There are three main varieties of EGMs: slot machines, video slots, and video
poker. These machines are inexpensive to run compared to roulette or blackjack
games, which makes it possible for casinos to offer low-stakes betting to a large
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
2 of 36 5/3/22, 3:45 PM

-- 2 of 36 --

number of customers. As a result, they have become the most profitable form of
gambling. A recent report from Statistics Canada (2003) indicates that EGMs
outside of casinos (e.g., video lottery terminals (VLTs) in bars and slot machines at
racetracks) took in a total of $4.5 billion in 2002, or 40% of the total revenue from
noncharity gambling in Canada. In addition, slots accounted for 80% (KPMG,
2003) of the revenue from casinos in 2002, or an additional $3 billion in casino slot
revenue, bringing the total revenue from EGMs in Canada to over $7.5 billion. The
purpose of this paper is to examine how EGMs work and to address some of the
most common misunderstandings about these machines.
For the most part, very little accurate information is available from the gambling
industry on how EGMs work. AGMMA's (2000) recent booklet on EGMs is an
exception to this comment. However, even it falls well short of full disclosure about
the machines. Information is available from numerous “how-to-gamble” books,
videos, and Web sites. While some of these are remarkably accurate, others are
filled with misinformation about gambling (see Turner, Fritz, & Mackenzie, 2003, for
some examples).
It is difficult for the consumer to distinguish between accurate and inaccurate
information (see Turner et al., 2003). In the absence of easily accessible and
accurate information, people tend to create their own beliefs about how things
work. When these ideas are shared, they take on a life of their own as myths.
Eventually, these myths are written down in “how-to” books or Web sites. Once
written, the myths seem to become fact. EGMs seem to attract a lot of these
myths. The mythification of slots may be due to the way the machines are
designed. Mythification may be the basis of many of the great works of literature,
but, in the case of gambling, it is the source of much misery. In this paper, we will
explain how slot machines really work, and we will discuss and debunk some of
the related myths.
The paper is divided into five parts. First, we briefly describe the types of electronic
games available. Second, we show that problems with human reasoning are a
source of myths about electronic gambling. Third, we present a technical
description of how the machines work. The fourth part contains a series of
questions and answers about slot machines. Finally, in the fifth part, we list and
debunk common myths about the machines. The focus of the paper is EGMs, but,
from time to time, we will draw analogies from other forms of gambling to highlight
the fact that many of the issues that arise with EGMs are also true with other forms
of gambling.
EGMs
Slot Machines
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
3 of 36 5/3/22, 3:45 PM

---

## Sección 2: Foundations & Introduction

-- 3 of 36 --

The basic game of a slot machine involves setting three or more reels into motion.
In many modern slot machines, the reels are simply computer-generated pictures
of simulated reels, but the essential game is the same. Typically, if all three reels
match when they stop moving, the player wins, but other combinations can also
lead to a prize (e.g., one cherry). Common symbols include lemons, cherries, lucky
sevens, and diamonds. The amount of the win is inversely related to the probability
of a symbol coming up on the payline. However, there is very little relationship
between the number of pictures on the reel and the probability of a particular
symbol landing on the payline. The wins and the player's remaining credits are
displayed using a small LED screen (a matrix of little red dots). If the player has
won more than the machine can pay out, a light on top of the machine usually
flashes, notifying the casino of a big win. The remainder of the win is paid by
cheque.
The payout of the slot is determined by the mathematical structure of the game,
not by how recently the machine has paid out. Game structures are very complex
and, as a result, the odds against winning on most EGMs are hidden from the
player. In Ontario, most slot machines have actual reels. However, some casinos
have video slots (also called VLTs) with simulated reels that appear on a video
screen. The introduction of video slots allows the game manufacturer a much
greater degree of freedom in the structure of the game. Many video slots have
bonus features that come up if certain combinations occur. Bonus features are not
new. Reel slots have always had bonus features run either by a separate wheel or
oversized dice located at the top of the machine or through a separate display
screen that is activated when a bonus feature occurs. The advantage of video
slots, however, is that upgrading the program or replacing it with a new game is
easier. In our view, slot lineup games presented on a video screen and slots with
reels are essentially the same, except that video slots offer a greater variety of
wagers (nickel machines range from 1 to 45 coins) and bonus features.
Video poker
Video poker is a completely different game than slots. It is based on five-card-draw
poker played against the machine. Players win if they get certain combinations of
cards, such as three of a kind (e.g., 4-4-K-4-7) or a flush (e.g., five hearts). Players
press a deal button, select the cards they want to keep by pressing a hold button,
and then press deal to replace the rest of the cards. Typically, players only get one
draw per hand. Some versions include wildcards (e.g., the joker or deuce), which
are worth any value needed to complete a hand. The computer calculates the
highest hand present and pays credits that are inversely related to the odds of a
particular hand coming up. A flush might pay five credits for every credit bet while a
full house might pay eight.
Video poker is different from slots in two main respects. First, the probabilities of
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
4 of 36 5/3/22, 3:45 PM

-- 4 of 36 --

the game are based on a simulated deck of cards, so that players can actually
compute the probability of winning based on their knowledge of the cards. For
example, if you have four hearts and one spade, you can estimate that the chance
of getting a flush if you replace the spade is 19% (9/47). Second, you have an
option to choose which card to hold, which means that there is an element of skill
in the game. For example, with Jacks or Better video poker, say a player has a pair
of tens, but also has a flush draw (e.g., four hearts). Taking into account the
probability and payout for various hands, the player would be better off throwing
away the ten and drawing for a flush than throwing away the three hearts to draw
for two pairs or three of a kind (see http://www.wizardofodds.com for a discussion).
However, if the player has a pair of jacks, he or she is better off keeping the jacks
and throwing away the flush draw (http://www.gamblecraft.com/review/videopok
/jbstrat.htm). While some of the rules of play seem self-evident, optimal play
actually involves memorizing a fairly large number of conditional rules. Thus,
players who study the game and make probability-based choices can improve their
success. However, skill in video poker does not usually allow players to overcome
the house edge. Skilled players might lose at a rate of 1% per bet, whereas lessskilled players might lose at a rate of perhaps 10% per bet. Exact figures for skilled
and unskilled would depend on a player's level of skill and the particular machine
played. Note that there are apparently video poker games where an optimal
strategy would allow the player to break even or even beat the house. Evaluating
the accuracy of this claim is beyond the scope of this paper (but go to
http://www.gamblecraft.com/review/videopok/index.htm). However, on most video
poker machines, even expert players are playing against a house edge.
Video lottery machines
There is a great deal of confusion about the nature of VLTs. People often use the
term VLT when referring to video poker or video slots located in a casino. There
are four main differences between a VLT and a video slot machine. First, in some
jurisdictions, the outcome of the games on a VLT is determined by a central
determination system rather than the individual machine. This is in fact why they
are called video lottery “terminals.” This distinction might have important legal
implications in terms of whether a VLT is classed as a slot machine or a lottery, but
is irrelevant in terms of the gambler's experience. Second, VLTs in Canada are
often multi-game platforms that offer slot games, video poker, and sometimes a
variety of other games such as video blackjack or keno. The range of games
offered means that VLTs may appeal to a broader range of players than singlegame slot machines. Slot games played on a VLT are largely the same as video
slots on a stand-alone machine. Video poker on a VLT is essentially the same as
video poker on a dedicated video poker machine. As described above, slot lineup
games and video poker are quite different. One is a game of pure chance, the
other a game with some skill elements. When discussing machine gambling with a
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
5 of 36 5/3/22, 3:45 PM

---

## Sección 3: Foundations & Introduction

-- 5 of 36 --

client, it may be important to know the type of game played. Telling a VLT player
who only plays video poker on the VLT that the game involves no skill could
interfere with therapy by undermining the credibility of the counsellor (the focus
with video poker should be on the limits of skill). Third, VLTs are often located in
bars and corner stores - areas that are more easily accessible. Single-game
machines (slots or video poker) make up the majority of machines offered in
casinos in Canada, but multigame platforms can be found in Las Vegas casinos.
The multigame nature of VLTs is likely due to the pragmatic need to offer a variety
of games in a setting with only a small number of machines. Fourth, wins from
VLTs in Canada are usually paid with vouchers, whereas slot wins are paid with
coins. However, both accumulate credits until a “cash-out” button is pressed.
Global variations
Gambling is a multinational industry that is regulated locally. As a result, there are
regional variations in the games that are available and the regulations that control
them. Fruit machines in the United Kingdom, for example, are required by law to
pay out a minimum percentage within a short period of time (Parke & Griffiths,
2001). Apparently this regulation came into effect because the bar owners
responsible for these machines were worried about potential losses due to the
volatility of games (Jonathan Parke, personal communication). According to U.S.
patent #6,666,765 (http://www.uspto.gov/patft/index.html):
[British] fruit machines generally use a form of “adaptive logic” wherein coin-in and
coin-out is monitored over time and wherein odds/payouts of the fruit machine are
proactively adjusted to achieve a target win percentage. Examples of adaptive
logic fruit-machines in Great Britain are GB 2 185 612 A and GB 2 087 618 A. In
the United States, the casino game operated with a random number generator
must, over all play of the casino game, provide a known player expected return (or
house advantage) and the casino game cannot proactively monitor performance
and correspondingly adjust play parameters.
As a result, some of the myths about slot machines in North America may in fact
be true in the United Kingdom (Griffiths & Parke, 2003; Parke & Griffiths, 2001).
Parke (personal communication), however, recently told us that adaptive logic
machines are being phased out as the United Kingdom moves toward adopting
North American standards in order to permit larger prizes.
Slots and the limits of human reasoning
Issues, myths, and questions
We suspect that EGMs are the most frequently misunderstood type of gambling.
People do not really understand random chance and therefore hold a variety of
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
6 of 36 5/3/22, 3:45 PM

-- 6 of 36 --

naive theories and beliefs about random chance and their ability to win in gambling
(Wagenaar, 1988; Turner, Littman-Sharp, Zengeneh, & Spence, 2002). In addition,
most people do not really understand machines. How often have you seen people
swearing at their cars for breaking down or pleading with their computers to give
them back their lost or deleted files? People often project animate qualities onto
machines. In literature, this is called personification, a type of metaphor that helps
us understand and relate to inanimate objects. Slot machines appear to take on
the myths of gambling and the myths of machines. When you combine this with the
absence of accurate information about how they work, the number of myths is not
surprising.
The focus of this paper will be mainly on slot machines, but other forms of EGMs in
general will be considered as well.
Erroneous beliefs and gambling
Problem gamblers may have a wide variety of erroneous beliefs about winning
(Turner, 2000; Wagenaar, 1988). In fact, most people have a very poor
understanding of the nature of random events. However, problem gamblers tend to
have more erroneous beliefs than nonproblem gamblers (Turner et al., 2002). Most
of these errors are based on a fundamental misunderstanding of the independence
of random events. Many problem gamblers, for example, believe that, if a number
has not come up recently, it is due to come up. This sort of reasoning actually
works in the case of card decks. If you draw three aces out of a deck, your
chances of getting a fourth one are pretty small (1/49). Card counting is based on
the shift in the probability of specific cards that occurs as cards are drawn without
being replaced in the deck. This is called random without replacement. But most
random events are very different from a deck of cards. Each spin on a roulette
wheel or roll of the dice is completely independent of the previous spin or roll. This
is called random with replacement. The random numbers drawn on regulated slot
machines and other EGMs in North America are independently random.
Related to this belief is the view that all random events should look “random,” and
therefore people underestimate the chances of repeated numbers, sequences, or
other patterns occurring. Faced with unusual events such as 10 heads in a row,
many people will believe either that the coin has a bias (i.e., bet on heads) or that
the coin will now start to show a string of extra tails to balance itself out (i.e., bet on
tails). Often these errors are due to a misunderstanding of the nature of long-term
outcomes. From interviews with gamblers (Turner et al., 2002), it is clear that many
people conceive of the long term as some definite time in the future (e.g., a million
flips of the coin) by which the number of heads and tails will have balanced itself
out. In reality, the time frame is infinite. In addition, the coin is not balanced out in
the long term, but short-term deviation from the expected average gradually
becomes watered down. Suppose the first 100 flips of the coin were all heads and
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
7 of 36 5/3/22, 3:45 PM

---

## Sección 4: Foundations & Introduction

-- 7 of 36 --

then the next 999,900 were perfectly balanced between heads and tails. The initial
100 heads might still be there, but, by the one millionth flip, the difference of 100
would hardly be noticeable. In fact, 3000 more heads than tails would still round off
to 50% heads and 50% tails. The difference between heads and tails is not
corrected at all, but that difference becomes less noticeable in the long term.
Many of the features of EGMs are poorly understood by problem gamblers, at-risk
players, and treatment providers. Therefore, we believe that it is vitally important to
understand how the machines work in order to set up effective treatment and
prevention programs. However, in considering the nature of slots, we must keep in
mind that misunderstanding of randomness is not unique to slots but is a general
feature of gambling.
Technical details of a slot machine: Can a machine be
random?
Technically, a machine cannot be random. Slot machines in fact are “pseudo”-
random. All physical events are deterministic, or caused by something. Mechanical
randomizers such as bingo balls, roulette wheels, and dice use the laws of physics
to maximize uncertainty. The basis of all random-like events is a combination of
complex or nonlinear relationships and initial uncertainty. A roulette wheel spins in
one direction and the ball is thrown in the opposite, so there are a huge number of
possible paths that the ball could follow around the wheel. The roulette wheel is
complex. Nonetheless, it would still be possible to predict where the ball was going
to land (which path it would take) if you knew exactly how much effort was put into
throwing it and where exactly the ball was relative to the wheel when it was thrown.
The fact that we cannot control or measure exactly how much energy is put into
throwing the ball means that the outcome of the roulette wheel is essentially
random. In fact, we cannot measure anything exactly (see Orkin, 2000, p. 17). The
combination of complexity and uncertainty produces chaos (see Gleick, 1987), and
chaos is the basis for randomness. Scientists used to believe that error in
measurement only had a trivial effect on prediction, but the study of chaos has
shown that a little error when measuring something complex can lead to complete
uncertainty and a fundamental inability to predict.
Slot machines are computers, and computers are inherently complex, but they are
not uncertain. Slot machines use a random number generator (RNG) to create an
erratic sequence of numbers. If the right values are selected for the RNG, the
sequence will be virtually unpredictable.
Technical details of the RNG
It is not essential that you understand how the RNG creates “random” numbers,
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
8 of 36 5/3/22, 3:45 PM

-- 8 of 36 --

but the following information is provided here for those who are interested.
Essentially, our goal is to demystify the nature of slot machines and random
numbers. Readers who are not interested in the details of how slots create random
events should proceed to the next section of this document.
The RNG in slots uses Lehmer's congruential iteration (for more information see
Brysbaert, 1991; Onghena, 1993). In this formula, there are three constant values
that are usually set as very large numbers: a multiplier (a), an added number (b),
and a divider also know as the modulus (m). The RNG works as follows.
1. 1. Start with a seed number, e.g., time of day.
2. 2. Multiply by one number (a) and add another number (b).
3. 3. Divide by the modulus (m).
4. 4. The remainder is the first random number.
5. 5. Translate this into a number in a useful range, e.g., 0 to 1, 1 to 36, 1 to
516, etc.
6. 6. Use the remainder as the seed for the next number.
In Table 1, we illustrate how this algorithm works with a = 3, b = 5, m = 7, and a
starting value (seed) of 12. The values in Table 1 would not produce a very good
series of random numbers, but they do illustrate how the algorithm works.
The size of the random number will depend on the size of the modulus number. As
in the example in Table 1, with a modulus of 7, the possible range of the “random”
values is from 0 to 6. The maximum value of the remainder will always be one less
than the modulus. The remainder is the raw “random” number. The raw “random”
number is translated into a number in a useful range by first dividing it by the
modulus number so that it becomes a proportion between 0 and 1. Given a
modulus of 7, a remainder of 2 becomes an RNG value of 2/7 = 0.286. If the
programmer would like the final range of RNGs to be between 1 and 36, the
proportion is multiplied by 36 and rounded off. The value 0.286 times 36 is 10.296,
which rounds off to 10. This then is the final number, or “stop,” used to determine
which image is displayed on the slot machine reel or video screen. The numbers
produced by this procedure are not random, but, if produced by a very large
modulus (e.g., a number in the billions) and then translated into a reasonably small
range (e.g., 1 to 36 or even 1 to 516), are very erratic and difficult to distinguish
from numbers in a sequence produced by pure chance.
Random versus pseudorandom
As shown above, the numbers produced by the RNG are not truly random.
Mathematicians call them pseudorandom numbers. In fact, it would be a
contradiction in terms to compute a random number, because computing means
that the number is exactly predictable. But numbers produced by the RNG are
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
9 of 36 5/3/22, 3:45 PM

-- 9 of 36 --

difficult to distinguish from truly random numbers (Brysbaert, 1991; Onghena,
1993). Most computerized RNGs are good enough for practical purposes. This
algorithm can run at an incredibly rapid speed, churning through thousands of
pseudorandom numbers per second (slot simulation exercise 1: see note at end of
paper for a slot machine tutorial).
It may be possible in the future that computers will no longer have to rely on
Lehmer's congruential iteration to produce pseudorandom numbers. Instead, chips
may become widely available that rely more directly on chaotic processes such as
turbulence to generate truly random numbers. If this is the case, the technology
would change a little, but the fact is that slots would still be just as unpredictable.
As stated above, the inherent limitation of a machine is that it cannot create true
uncertainty, only complexity. The RNG always follows exactly the same order. The
“random” numbers always go through the same sequence or cycle. If the modulus
is a prime number around four billion, then the sequence will not repeat itself until it
has run through about four billion numbers. At that length, assuming a 90%
payback percentage and a 25-cent bet per spin, one would lose about $33 million
trying to wait for the cycle to repeat itself.
Breaking up the cycle
However, even a cycle that is four billion numbers long would still leave the slot
machine vulnerable to a clever (and very rich) player determined to beat the game.
As stated above, to achieve true randomness, you must have both complexity and
uncertainty. The congruential iteration provides a great deal of complexity, but no
uncertainty. If you know the first number in the sequence, you know exactly what
the next number will be. To add uncertainty, the RNG runs continuously whether or
not anyone is playing (slot simulation exercise 1: see note at end of paper for
details). The RNG in an EGM runs all the time, but most of these numbers are not
used. When the spin button is pressed, the current value of the RNG is “polled.”
What this means is that the value of the RNG at that millisecond when the spin
button is pressed is passed from the RNG to the virtual reel part of the slot
program, where the computer calculates which pictures to display.
For a three-reel slot, three numbers are drawn from the RNG and used to
determine where to spin the reels. As such, the numbers drawn depend on the
exact millisecond when the spin button is pressed. A millisecond later and the
outcome of the slot machine will be different. The player does not know how many
RNGs were skipped between one button press and the next. As a result, the
outcomes of slot machines are in effect random, so waiting for the cycle to repeat
itself is not possible. To reiterate, only a small percentage of the RNG numbers are
actually used by the slot machine: those numbers that it is generating at the
millisecond when the player presses the spin button. Therefore, you never know
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
10 of 36 5/3/22, 3:45 PM

---

## Sección 5: Foundations & Introduction

-- 10 of 36 --

which part of the cycle you are in, so the result is essentially random.
It must be noted that slot machines and other EGMs are designed according to a
number of different specifications. In some cases, several different RNGs may be
used; in other cases two RNGs are used (one to determine if the spin will win or
lose and another to determine how much to pay out). Details on the
implementation of random numbers in slot machine designs can be found by
searching through the U.S. patent office's Web site (http://www.uspto.gov/patft
/index.html). An advanced search using the phrase “slot machine” found 1391
patents since 1976. The design is presented here not to represent all slot
machines, but to help the reader understand how an EGM can create a random
experience from pseudorandom numbers and provide the player with a varied
gambling experience.
Reel weights
The pictures shown on a slot reel do not necessarily correspond directly to the
odds of winning. A symbol might occur twice on the reel, but only land on the
payline once every 50 spins. This is accomplished through a process called
mapping, determined by a computer inside the slot machine. Each stop on the slot
machine's “virtual” reel is equally likely, but more of these virtual reel stops are
mapped onto nonpaying symbols (blanks) or low-paying symbols (bars) than onto
high-paying symbols (sevens and cherries). Thus, through virtual reel mapping, the
outcomes are weighted in favour of low-paying outcomes.
Virtual reel mapping was developed because the number of pictures on the
physical reel was limited by the circumference of a reel. If slot manufacturers did
not use virtual reel mapping to weight the pictures on the actual reels, they would
only be able to offer small prizes. A reel with only 20 symbol stops would have only
8000 possible outcomes. Such reels would be limited to fairly small prizes. Varying
the probability of different pictures on the slot machines means that they can have
virtually any possible prize structure, including many small to medium prizes with
rare huge jackpots. With 516 stops on the virtual reel, the jackpot prize could be as
rare as 1 in 137 million (1/5163), which means that the machine could safely offer
progressive jackpot prizes as high as $20 million or $30 million and still make a
profit in the long term. U.S. Patent #4,448,419 describes the logic of virtual reel
mapping, and can be found at http://www.uspto.gov/patft/index.html.
Because of virtual reel mapping, the odds of any picture coming up on a payline
are independent of the number of pictures on an actual reel. The reels simply
display computer-determined outcomes. The computer tells the reel of pictures
where to stop depending on the random selection from the virtual reel positions.
The pictures do not determine what the slot machine will pay out or not; the
computer determines where the pictures will stop and when to pay out.
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
11 of 36 5/3/22, 3:45 PM

-- 11 of 36 --

Inside a slot machine is a computer chip with tables of weights called virtual reels.
The values generated by the RNG are used to select numbers on the virtual reels,
which connect to specific pictures on the actual reels or video-displayed reels.
Each virtual reel has a specific number of stops: it could be 32, 64, or as many as
516. Some symbols are linked to a large number of stops; some are linked to very
few. Some pictures might not be mapped to any number, meaning that the reel will
never stop on that particular spot. The Safe@play slot machine tutorial gives an
example of how the virtual reel is “mapped” to the actual reel on a mechanical slot
machine (Figure 1). Note that there are only 9 virtual reel positions mapped to
“winning” symbols on the actual reel and 20 virtual reel positions mapped to
blanks. Also notice how virtual reel positions 24 to 30 map onto stop #12 on the
actual reel. Stop #12 is a blank placed between two sevens. This particular figure
might be a bit of an exaggeration. However, it clearly illustrates the manner in
which virtual reel symbols are mapped onto the physical reel that is then seen by
the player. On an actual slot machine, the bias toward nonwinning stops might be
more subtle.
A real-life example of differential slot weighting can be found at
http://wizardofodds.com/games/slots/slotapx1.html. At that site, Michael
Shackleford, “The Wizard of Odds,” reports how he spent several hours (4000
spins) recording every symbol from a slot machine and then presents his results in
a table. His table illustrates how blanks in particular are more common on the third
reel. Also note that the blanks around some symbols (double red seven) came up
more often than around other symbols (single bar).
Virtual reel mapping applies specifically to three-reel slot machines. Five-reel video
slots are so incredibly complex, with so many paylines (up to nine crisscrossing),
that it is difficult to see what advantage the casino would gain by using virtual reel
weights. The five reels by themselves would give the game long enough odds to
permit large jackpots. An anonymous reviewer, from the gaming industry, of an
earlier draft of this paper told us that, with video slots, the player sees the virtual
reel. That is, with video slots, the pictures are not weighted. This is because the
game's designer is not limited by the circumference of a reel but can set the reel
length at any arbitrary number of symbols. Virtual reels are simply not needed on
video slots. However, as with mechanical slots, trying to determine the size and
symbol distribution on the video slots is quite difficult.
Frequently asked questions
In our efforts to treat or prevent problem gambling, a number of questions or beliefs
about slot machines come up over and over again. The following is not a literal list
of the questions people ask, but a list of the sorts of questions people ask:
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
12 of 36 5/3/22, 3:45 PM

---

## Sección 6: Foundations & Introduction

-- 12 of 36 --

1. . Are slot machines addictive?
2. . How can a machine be random?
3. . Do slots go through a cycle of numbers?
4. . Does the number of pictures equal the odds?
5. . How can weighted reels be random?
6. . How can you have a payout of only 90% if the machine is random?
7. . I started with $120, but now I only have $20 left. Where's my 90% payback?
8. . Is there any skill involved in slot play?
This is not an exhaustive list of questions, but gives a hint of the issues that need
to be addressed. This section will be framed by these issues.
Are slot machines addictive?
The large number of cases of EGM problem gambling from around the world
suggests that EGMs are among the most addictive forms of gambling. Dorion &
Nicki (2001) have provided evidence that VLTs do indeed account for most problem
gambling in Prince Edward Island. In Ontario, Rush, Moxam Shaw, and Urbanoski
(2002) report that EGMs account for 37.7% of the treatment population, making
slots the number one reason for seeking treatment. Smith and Wynne (2004) also
report an elevated level of problems among VLT players. These numbers suggest
that EGMs are indeed more addictive than other forms of gambling. Some people
have even called EGMs the “crack cocaine of gambling” (but see Mizerski, Jolley,
& Mizerski, 2002, for counterarguments).
Griffiths (1999) has argued that the addictiveness of EGMs is directly related to
their structural characteristics, such as high event frequency (the speed with which
you can play), frequent wins, lights, colour and sounds, game varieties, bonuses,
the use of bill acceptors, and the illusion of skill. Other situational characteristics
that might be important are advertising, availability, low stakes per bet, the
presence of nearby cash machines, the type of establishment (raceway, casino,
bar), and the presence of alcohol at the location. Some research has been
conducted to explore the addictive properties of the machines (e.g., Loba, Stewart,
Klein, & Blackburn, 2002; Tavares et al., 2003; see also Smith & Wynne, 2004), but
there is no clear evidence about any specific property that accounts for the arrival
in treatment centres of so many EGM players.
Mizerski et al. (2002) argue that, taking into account the greater market penetration
of EGMs, there is no evidence that they are any more addictive than other forms of
gambling. According to their assessment, the high prevalence rates of machine
problem gamblers is a simple outgrowth of the fact that EGMs are the mostly
widely available form of high-intensity gambling. According to their data, problem
players make up a smaller portion of EGM players than racetrack bettors. EGMs
are more widely available than table games or racetracks because they are so
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
13 of 36 5/3/22, 3:45 PM

-- 13 of 36 --

much cheaper to run. In addition, the low stakes per bet likely contribute greatly to
their market penetration. Mizerski et al.'s (2002) paper was aimed at taking the
heat off EGMs per se by characterizing EGM play as following the same
distribution as other products. However, unlike with many other products, the most
loyal EGM customers can end up with massive debt. As stated above, EGMs
account for a large proportion of people in treatment for gambling problems (Dorion
& Nicki, 2001; Rush et al., 2002). Mizerski et al.'s (2002) market penetration based
argument inadvertently suggests that, in order to reduce problem gambling, the
widespread availability and marketing of the machines should be curtailed.
However, more research is needed to understand the link between EGMs and
problems.
How can a machine be random?
Technically, a machine cannot be random. Slot machines in fact are
pseudorandom. As stated above, RNGs use a very complex algorithm. The
sequence of numbers an RNG produces is not truly random and is erratic, but
predictable. However, uncertainty is added by the seed value, so that a player can
never know what part of the cycle the computer is at. This is further enhanced by
the continuously running nature of the RNG, which makes the outcome of an EGM
completely unpredictable.
Do slots go through a cycle of numbers?
Many people believe that slot machines run in cycles. The answer is yes and no.
There are four interesting answers to this question. First, one of the curious
aspects of random events is that they often do seem to be evenly spaced. This is
in part due to the very nature of probability. If something has a probability of 5%, it
will on average occur 5% of the time. But this is simply an average. It could occur
on the very next spin of the reels, or not until after 500 spins. You never know
when it will occur. The human ability to see a pattern when none is present is well
known. Consider how easy it is to find faces in clouds. Figure 2 illustrates this
illusionary regularity. It shows the financial outcome of a number of slot bets. The
wins (sudden upward jumps) seem to be evenly spaced across the figure,
including the last rather large jump. The wins are not in fact evenly spaced, but are
randomly spaced. But the mind has a bias for seeing patterns, so it sees more
regularity in the figure than is actually there. The belief in cycles is not unique to
EGMs. Lottery and roulette players often track the numbers, looking for patterns or
cycles (see Turner et al., 2003 for some examples).
Second, this myth might to some extent be derived from actual computer
knowledge. As stated above, the inherent limitation of a machine is that it cannot
create true uncertainty, only complexity. The RNG does run in cycles - very long
cycles. However, as we explained above, the cycle is broken up by the
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
14 of 36 5/3/22, 3:45 PM

-- 14 of 36 --

continuously running nature of the RNG, which means that a fraction of a second
difference in the timing of the button press will result in a different outcome.
Therefore, the player cannot track the cycle. With a continuously running RNG, a
modulus of only seven numbers, such as shown in Table 1, might be sufficient to
produce a random experience for the player, but, to be on the safe side, slots
manufacturers base their RNGs on huge modulus numbers.
Third, at one time, illegal or grey-market EGMs might have operated on a cycle
basis, which gave rise to this belief, which has since been carried over to modern,
regulated, EGMs that work differently. Unregulated grey-market machines were not
tested to ensure that they met the standards of randomness currently imposed on
legal machines in North America.
Fourth, according to Griffiths and Parke (2003), EGMs in the United Kingdom do
indeed run through a prize sequence over a relatively short time frame (see also
the discussion on adaptive logic fruit machines in U.S. patent #6,666,765,
http://www.uspto.gov/patft/index.html). Perhaps this belief in game cycles in North
America has been imported from the United Kingdom. Given these four possible
sources of bias, the persistence of this belief is not surprising.
Does the number of pictures equal the odds?
On reel slots, in general, the answer is no. Working out the odds from the number
of pictures is difficult for a number of reasons. First, on many reel slots, you also
need to count the number of blanks between the symbols. Second, the number of
winning and nonwinning symbols is not the same on all the reels. There is in fact
no legal or practical reason that the symbols would have to be the same on all the
reels. Third, as stated above on reel slots, the pictures are weighted so that some
come up more often than others. This is accomplished through a process called
mapping determined by a computer inside the slot machine. This weighting may
sound unfair, but currently there is in fact no legal or practical reason that the
pictures need to be equally likely. Note that the legality is being challenged in a
U.S. court right now. The weighting further reduces the player's ability to crack the
code of the RNG. Unequal probabilities do occur in other gambling games (e.g.,
instant lotteries, the Big Wheel, horse race bets, craps, baccarat). In each game,
some events occur more often than other events. However, unlike with table
games, the relative probabilities of different events are completely hidden, and,
unlike with instant lotteries, there are no laws, other than those in Victoria,
Australia, requiring the slot manufacturer to divulge the true probabilities of slot
events (see AGMMA, 2002).
How can weighted reels be random?
With two dice, seven comes up six times out of every 36 rolls, while twelve comes
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
15 of 36 5/3/22, 3:45 PM

---

## Sección 7: Foundations & Introduction

-- 15 of 36 --

up only one time in 36 - this is still random. Each of these 36 chances are equally
likely, but if you bet on “any seven,” you will win more often than if you bet on
twelve. This is essentially the same as having more virtual stops mapped to
pictures of bars than to pictures of sevens on the actual reel. With the game of
craps, the casino does not post the true odds of rolling twelve or seven, but, with a
little knowledge of math, anyone can work out the true odds.
As stated above, each stop on the slot machine's virtual reel is equally likely, but
more of these virtual reel stops are mapped onto nonpaying symbols (e.g., blanks)
or low-paying symbols (e.g., bars) than onto high-paying symbols (e.g., sevens
and cherries). Thus, through virtual reel mapping, the outcomes are weighted in
favour of low-paying outcomes. Virtual reel weights allow the casino to offer larger
prizes to the player. The downside of virtual reels is that it is virtually impossible for
players to figure out their chances of winning one of the larger prizes on one of
these machines. To figure out the odds, they would need to play on a particular
machine for several hours and record the frequency of every symbol on every reel
(see http://www.wizardofodds.com for an example).
Virtual reel weights only apply to three-reel slots, not video slots. Virtual reels are
not needed on video slots because the programmer can obtain the odds needed to
offer large prizes simply by making the strip of pictures longer.
How can you have a payout of only 90% if the machine is random?
Payout and game randomness are two separate issues. Randomness refers to
how the symbols are selected - the stops are selected using the RNG. Payout is
how much you get paid for a randomly displayed combination. Players lose in the
long run because the amount the slot machine pays out for wins is insufficient to
make up for the times players lose. As an illustration, suppose you were running a
dice game in which you asked a player to bet $1 on any specific number (one to
six). The probability of rolling a specific number on a die is one in six (1/6). Thus,
the player wins one out of every six rolls on average (a hit rate of 16.6%), but he or
she might win 8 times in a row or lose 60 times in a row. Suppose you paid the
player $3 for a win. On average, the customer is winning back $3 for every six
rolls, which means losing $6 for every $3 he or she wins. This would be a payback
percentage of 50% of what he or she bet (payback = $3/$6 = 50%). After a few
games, the player realizes that it's a bad deal and is about to walk away, so you
now offer $7 for a win. That would be a payback of $7 for every $6 bet or 116.7%.
You start to go broke, but you think the player will walk away if you cut the
payback. In desperation, you change to an eight-sided die, so now the hit rate is
1/8 or 12.5% and the payback is $7 for every $8 bet (a payback of 87.5%). At this
point the player might no longer notice that he or she is losing money because the
wins most often seem to make up for the losses. The point is that the only
difference between these three games is the amount the player is getting back
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
16 of 36 5/3/22, 3:45 PM

-- 16 of 36 --

relative to the chance of a win. In each case, the game is random. However, with
$3 won for every $6 bet or $7 won for every $8 bet, the house is making money,
but, with $7 won for every $6 bet, the player is making money. Of course no casino
would offer a game with a payback of 116.7%, but this example illustrates how it is
the amount of the win relative to the probability of the win that determines the
payback percentage. Payback has nothing to do with randomness per se.
Slot machines have many different bets and many different ways of winning, so
working out the payback percentage is much more complicated, but the same
basic principle applies. Table 2 illustrates a payout table for a slot machine. This
payout table is not based on any actual slot machine, but is designed to illustrate
the nature of slot payout tables. You multiply the probability of a winning symbol's
combination by the prize for that symbol. You do this for each line and then find the
total. The last column shows the contribution of each winning symbol to the total
prize. Notice that the jackpot prize (three treasure chests) has a payback
percentage of only 2.9% to the payback. If this were the only winning combination,
the slot machines would have a truly awful payback, but the total payback is
computed by adding up each of the prizes, which totals to 88.2%. The third column
indicates the chance of each of these combinations occurring. When these
chances are added up, they equal p =.197 or 19.7%. This is called the hit rate.
Given this set of probabilities, the player will get positive feedback nearly 20% of
the time. This table may not be particularly realistic, but it does illustrate in a
general way how payback works.
I started with $120, but now I only have $20 left. Where is my 90% payback?
Often clients will complain that they have in fact lost a lot more than 90%. They
might start with $100, lose most of it, and never win it back. They may even have
played until it was all gone. To answer this question we first have to consider what
payback does not mean.
1. . A 90% payback does not mean you win 90% of the time.
2. . It does not mean you win back 90% of what you have lost.
3. . It does not mean that you are ever due to win.
4. . It does not mean that you get back 90% of what you started with.
5. . It means that on average you can expect to LOSE 10% of the money you
bet, each time you bet.
The reason people lose all their money on a slot is that they keep playing until it is
gone. The loss is due to the “churn”, or the reinvestment of what they won back
into the game. Thus, they are not losing 10% of what they initially fed into the
machine, they are losing 10%, on average, of each and every bet. In the process
of losing $100 on a 25-cent machine, a player will actually have bet around $1000.
Ten percent of $1000 equals $100, so a loss of $100 is a 90% payback. In short,
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
17 of 36 5/3/22, 3:45 PM

---

## Sección 8: Foundations & Introduction

-- 17 of 36 --

it's 90% of the $1000 bet, not 90% of the $120 started with. You can test this using
a player's card. Since many casinos give you one point per $10 bet, if you play
until you lost $100 on the same slot machine, you will earn 100 points (good for a
rebate of about $5 at some casinos), indicating that you bet $1000. (Results will
vary depending on the casino, the player club conditions, the payback percentage
of the machine, and random chance.)
People often get confused about terms used to describe the house edge. House
edge, payback percentage, and expected return are different ways of expressing
the same concept. House edge is the percentage of money that you expect to lose
on each bet. Expected return is the same as house edge, with a negative sign in
front of it. Payback is the percentage of money you expect to get back from a bet.
The relationship between house edge and payback percentage is pretty simple.
House edge + Payback percentage = 100%
100% − House edge = Payback percentage
100% − Payback percentage = House edge
For a typical slot, the payback percentage might be 90%, and thus the house edge
is 10%. The expected return is −10%.
One of the puzzles about gambling is why people continue to play a game when
they are playing for a payback of less than their bet. Part of the reason is that the
volatility of the game (variation from spin to spin) is very large (Turner & Horbay,
2003), making it very difficult to measure the house edge. With slots, most of the
time you lose, sometimes you win a little, and occasionally you win a lot. Volatility
is a natural result of the variable prize structure, but it makes it hard to determine
one's actual rate of loss. The most volatile and worst payback comes with lotteries
(e.g., 50%). They are also the most successful games in terms of market
penetration (62% of the population in Ontario: Kelly et al., 2002). Volatility and
payback percentages tend to be inversely related - even-money games such as
craps have the lowest volatility (you bet $5; if you win you get back $10) but have
the highest payback percent (98.6% for passline bet in craps - without free odds).
The more volatile the game the harder it is to determine your rate of loss. For slots,
the volatility does a very good job of obscuring the payback percentage. Even with
table games, more volatile games (e.g., hardways in craps, Caribbean stud poker)
have a poorer payback percentage than even-money bets. The casino needs a
higher house edge on volatile games to offset the greater financial risk of offering
large prizes.
Is there any skill involved in slot play?
In general, no skill is possible on slot machines. However, there is some element of
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
18 of 36 5/3/22, 3:45 PM

-- 18 of 36 --

skill involved in video poker play, and it would be a mistake to collapse video poker
and slots into the same category of games. Video poker is a game in which a
careful player can increase the payback percentage, but in most cases even with
optimal play the player is still losing money over the long term. Because surveys
rarely distinguish between different types of electronic games, such as slots and
video poker, it is unknown if the partial skill in video poker makes it more addictive.
It is most likely that the two games appeal to different people and are addictive in
different ways.
There is also an element of skill involved in the search for particularly large
progressives or bonus points. A player could theoretically win in the long term by
looking for machines with large progressive jackpots or lots of bonus points - the
odds are the same but the payoff percentage is better when the prize is large. The
problems that players face in doing this are as follows:
1. . They do not know when the jackpot is large enough to compensate for its
incredibly low probability.
2. . An “overdue” jackpot of $50 thousand might still have a probability of 1 in
200 thousand or even worse.
The odds of the jackpot do not change. For the mathematicians in the audience,
recall that the payback percentage is based on all prizes, not just the grand prize,
so, even though the prize is still less than the odds against winning, the payback
percentage might be in the player's favour. But, to guarantee winning the grand
prize, players will likely have to bet more than they will win. Once the prize gets
large, the payback percentage of the machine might be more than 100%, but
unless they actually win that bonus jackpot before someone else does, they might
lose an incredible amount of money. The fact is that the risk is too great, and, as
such, even hunting for bonuses and progressive jackpots on slots should be
treated as a game of pure chance, not skill.
Some countries and some states in the U.S. have laws encouraging or requiring
skill-like elements in slot games. Some machines have a stop button that
supposedly forces the wheel to stop giving players the illusion that they can alter
the outcome of the spin. Other skill features might include a hold button, a nudge
button, or even a clue button (Griffiths & Parke, 2003). Most of these are
pseudoskills that provide no real opportunity for skilled play or long-term wins
(Griffiths, 1993). Because of bonuses and progressive jackpots, the payback
percentage will vary, but in general there is simply no way to beat a slot machine
except by pure random chance.
Myths
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
19 of 36 5/3/22, 3:45 PM

-- 19 of 36 --

The following is a partial list of myths that people believe about gambling
machines.
• Slot machines pay out when they are hot.
• Things even up in the long term.
• Casinos give better odds than lotteries.
• Playing two or more slots at the same time increases your wins.
• Some machines are set to be loose.
• Hit and run or playing until it pays out is a good strategy.
• Someone can steal your jackpot.
• Manipulating the arm or timing the button press can improve your chances of
winning.
• I almost won or it was a near miss.
• You never win on one of these things.
Slot machines pay out when they are hot
Machines will vary in temperature and from time to time will feel hot. The machines
are designed to operate within a wide temperature range, and, no matter how long
or intensively they are played, that range is generally not exceeded. The machines
are computers, so, theoretically, they could overheat, but the bottom line is that
overheating will not benefit the player. Can you imagine a computer breakdown
that resulted in anything as good as a win? It is very unlikely that an EGM would
overheat, but, if it did, it would most likely cease to function.
The reasons for this myth are rather interesting. First, it is likely that the chance
association of hot with wins forms the basis of the belief. The coins do sometimes
feel quite warm after being in a machine for a long time. Many people believe that
a machine that has not paid out recently is due for a win. This belief is in error, but,
because wins are relatively uncommon, the player is more likely to experience hot
coins when cashing out a big win than at any other time. Wins are very powerful
experiences, and anything that happens at that moment will tend to be stored
clearly in memory as an episode (see Tulving, 1972). So the heat of the coins
becomes part of the memory. This belief also fits in with a cultural metaphor that
associates hot with lucky (see Lakoff, 1987). Episodic experiences derived from
chance events, and positive (win) and negative (escape from pain) reinforcements
of pre-existing cultural beliefs, may explain many of the myths that people believe
regarding gambling.
Things even up in the long term
There is a persistent erroneous belief that things even up in the long term. This
belief comes under various names, including the law of averages. It is a
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
20 of 36 5/3/22, 3:45 PM

---

## Sección 9: Foundations & Introduction

-- 20 of 36 --

widespread belief that is not restricted to EGMs.
Part of the problem indeed derives from the way in which mathematicians talk
about the long term. Essentially, they are not talking about any set time period, but
the situation when the average reaches its true value - and that takes as long as it
takes for the values to asymptotically approach their true values. It is the point at
which an unbiased coin actually rounds off to 50% heads and 50% tails. This is a
hypothetical time period because, in reality, the second you set a time period it can
be violated. It is (and must be) possible that a coin could come up heads 1 million
times in a row (but see Orkin, 2000). This is extremely unlikely, but possible. For
practical purposes, 1 million flips will nearly always be enough to achieve an
average very close to 50% heads, but since it is still possible for 1 million heads to
occur in a row, 1 million flips will not always work as the “long term.”
A study by Turner et al. (2002) found that problem gamblers know the odds of the
games as well, if not better, than nonproblem gamblers. For example, problem
gamblers were significantly more likely to correctly answer questions regarding the
chances of rolling a seven with a pair of dice. However, the error that problem
gamblers make is that they think they can beat the odds. It is likely that this error is
exacerbated by the absence of accurate information on the actual odds of slot
wins.
One of the main errors people make is working backward from the long-term odds
to the short term. For example, in an interview, one gambler reasoned as follows:
• In the long term, heads and tails will come up equally often.
• If you get 100 heads in a row and then keep flipping, the number of heads
and tails will eventually reach 50%.
• If this is true, then surely an extra 100 tails must occur some time between
now and the 1 millionth flip to even it up.
• Therefore, there must be a slight bias in favour of tails to help even it up.
This reasoning is not irrational. In fact, if the long-term outcome were exactly 50%
heads and exactly 50% tails, then the theory would have to be true. The same
reasoning is actually the basis of card counting and it does work in the game of
blackjack (unless the casino is using a shuffling machine to keep the cards shuffled
after every hand). But, with a coin flip or any game where each game is
independent of all others (slots, roulette, lotteries), the gambler needs to keep in
mind that the long term rounds off to 50%. After 1 million flips, 3000 more heads
than tails would still round off to 50% heads.
Despite the above facts, gamblers spend a lot of time looking for short-term
deviations from expected averages. For example, they might look for a machine
that appears due to pay out because it has not paid out recently. If such a machine
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
21 of 36 5/3/22, 3:45 PM

-- 21 of 36 --

is found, this deviation from the expected payouts is then interpreted in one of two
ways. The machine is either due for payment and thus the rational plan is to bet, or
it is unlucky (cold or tight) or has a bias against it. The former would lead the player
to play that machine. The latter would lead the player to look for another machine
with a bias in the player's favour. The interesting thing about these two beliefs is
that they are opposite and contradict each other such that they cannot both be
true. Interestingly, the same person will often hold such opposite beliefs. Turner et
al. (2002), for example, found a high correlation between people who select
numbers that have not come up for a while and those who pick numbers that come
up frequently: r =.59, p <.01. In addition, in nearly all cases, one of these beliefs
will be confirmed by experience. That is, the machine that has not paid out either
will pay out, confirming the “due to pay out” belief, or continue to not pay out,
supporting the bias theory.
Casinos give better odds than lotteries
Some gamblers believe that lotteries are a bad bet because the chance of winning
is very small. The probability of winning the top prize in a lottery may be 1 in 14
million. In reality, the odds of winning a game are irrelevant. If you buy enough
tickets, you can make your chance of winning up to 100%, but you will still lose
money. The payback of slot machines in Ontario varies from 85% to 97%, whereas
lotteries typically pay out only about 50% of ticket purchases back to their
customers in prizes. As such, slot machines indeed seem to be a better buy.
However, slots are far more profitable than lotteries (Statistics Canada, 2003;
KPMG, 2003), but have a lower market penetration (Kelly et al., 2002; Mizerski et
al., 2002). In spite of the lower house edge, people appear to lose more money on
slot machines than on lotteries. This situation is related to the fact that people that
play slots do not just make one or two purchases, but make a long series of bets.
In addition, people churn their wins back into the game and play until a substantial
amount of their money is gone. As described above, the churn is the effect of
reinvesting the winnings (credits) back into the game so that a 90% payback (10%
house edge) bet three times becomes a 72% payback. It is very easy to re-bet
wins on an EGM because there is no distinction between credits initially placed into
the machine and credits that have been won. According to Smith and Wynne
(2004), when averaged across both winning and losing sessions, players lose
between 30% and 40% of what they bring to a casino because of the churn. While
the payback per bet is higher on a slot, the continuous play on the slot means that
people lose more to a slot than to a lottery.
Playing two or more slots at the same time increases your wins
If you play on several machines at the same time, you will win more often than if
you only play on one machine. However, because each machine pays back less
than 100%, you will still lose more money than you would if you were only playing
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
22 of 36 5/3/22, 3:45 PM

---

## Sección 10: Foundations & Introduction

-- 22 of 36 --

on one machine. A good rule of thumb is to remember that the more you bet, the
more you will lose in the long term.
Some machines are set to be loose
This is the belief that some machines are set to pay out more money. One version
of this belief is that machines near the entrance of a casino are set to be loose in
order to entice customers into the casino. There is also a false corollary that it does
not matter which machine you play. Machines do indeed vary in payout percentage
and hit frequency. Players could substantially reduce their losses by playing at
machines with the highest payback. However, since no information is given about
the odds or payout of a particular machine, it would be impossible (except with
video poker) to determine which machines were actually set to pay out more.
However, all of the machines would have a negative expected return, so the best
you could expect in the long term with a loose machine would be to lose a little
less. What people call loose machines are most likely those machines that have
paid out a lot of small prizes recently. The looseness might be merely random
chance fluctuations (volatility), or the machine might be weighted more in favour of
small prizes. Some machines give back more money to their customers than other
machines, but, even if you were lucky enough to find a “loose” machine, it would
still not result in long-term wins (see Bluejay, 2002-04 for related comments).
Hit and run or playing until it pays out is a good strategy
A strategy recommended by A Complete Idiot's Guide to Gambling Like a Pro is to
“hit and run” (Wong & Spector, 1996). That is, try a machine for a few spins and, if
you are not happy, leave and try another machine. This advice is relatively
harmless, but it is significant because it is one of the few inaccurate pieces of
information that we found in Wong & Spector's (1996) book. However, the opposite
strategy, staying at the same machine, hour after hour, in the belief that it will
eventually have to pay off, is a much worse strategy because the more you bet the
more you lose. If a hit-and-run strategy reduces actual play or persistence, then it
is a reasonably good strategy. However, the fact is that neither changing machines
nor staying at the same machine improves your chances of winning. Both hit and
run and sticking to the same machine sometimes seem to work, but neither can
result in long-term wins because the wins and losses are random events and every
spin is independently random.
Someone can steal your jackpot
Yes and no. Yes, if you accidentally walk away from your machine before cashing
out, someone might steal your money. However, another player cannot win a prize
that you might have won. Many players who have spent a lot of time at a particular
machine are reluctant to leave it, even to go to the bathroom, because they believe
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
23 of 36 5/3/22, 3:45 PM

-- 23 of 36 --

that it's due to pay off and they do not want someone else to win their jackpot.
Thus they keep feeding the same machine. Many gamblers have told us stories
about walking away from a machine and later witnessing someone else winning on
that machine. These stories are no doubt true, but represent a memory bias. The
reason people recall these events is that, when this does happen, it becomes a
very strong memory filled with regret and perhaps anger. But when it does not
happen - later players do not win - it is not a very strong memory. In short, we
remember instances when this happens, but take no notice when it does not. As
stated above, the RNG runs continuously and a millisecond difference in the button
press will lead to a different outcome. So, even if a player had stayed at that
particular machine, he or she would most likely not have won that same jackpot.
Manipulating the arm or timing the button press can improve your chances
of winning
When slot machines were first invented over 100 years ago, they consisted of
three fly wheels that were set in motion by the pull of the lever. The force of the pull
of the lever would to some extent determine how far the reels would turn. It might
have been possible to manipulate the outcome to some extent by carefully
controlling the lever. Some players still believe that it is possible to win by
controlling the lever or timing the press of the spin button. Modern slot machines
are computers. The reels themselves are essentially decorative. As stated above,
an RNG determines the wins and losses on a slot. The computer uses numbers
drawn from its RNG to determine where the reel will stop before it is even set in
motion. The computer determines that the reel should land on the symbol for a
cherry, and it spins it to that location.
I almost won or it was a near miss
There is no such thing as a near miss on a slot machine because the symbols that
come up when you do not win are simply displays of losing plays. A near miss is in
fact a total miss - a loss. No game play event ever predicts wins. However, the
concept of a near miss is rather controversial (see Smith & Wynne, 2004, for
comments). Certain types of near misses are illegal (Rose, 1989; Bourie, 1999).
Once upon a time, slot machines were programmed to produce near misses such
as two win symbols on reel 1 and 2 and another winning symbol just above or
below the payline on reel 3 (Bourie, 1999). What made this programming illegal
was that symbols shown on the slot machine did not accurately represent the
outcome of the game. The computer was programmed to first determine that the
spin was a loss and then spin the reels to display what appeared to be a near win.
One of the reviewers of this paper defended the industry's record of following the
law regarding near misses, noting that, in virtually every jurisdiction, programming
near misses is illegal. Near-miss programming violates the independence of the
three reels so that the game outcome cannot be called random. According to the
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
24 of 36 5/3/22, 3:45 PM

---

## Sección 11: Foundations & Introduction

-- 24 of 36 --

gambling industry, slot machines are no longer programmed to create near misses
However, there are several different potential definitions of a near miss. The law
only makes certain types of near misses illegal (Rose, 1989; Bourie, 1999). Any
near miss that occurs by random chance is definitely legal. A near miss of two out
of three winning symbols or a near miss just off the payline is perfectly legal if it
occurs by random chance. Two out of three winning symbols occurs many times
more often than a win. If a jackpot based on three reels had a probability of 1 in
1000 (e.g., 1/(10*10*10),) a two out of three near miss would occur 29 times more
often than a win (e.g., (1/10*1/10)*3). If you add to that all the possible other ways
in which you could define a near miss (e.g., two or three winning symbols just
above or below the payline) or all the possible combinations that could be near
misses (two bars, two diamonds, two treasure chests, two red sevens), near
misses will happen very often purely as a result of unbiased random chance.
But slot outcomes are not unbiased. Above we described how the pictures on slot
machines are not equally probable and that they are weighted in favour of
nonpaying and low-paying pictures. The simple act of shrinking down 32 virtual
reel stops into 22 actual reel symbols is sufficient to enhance near misses off the
payline. This is because the slot is condensing a virtual reel with many low-paying
or nonpaying stops (e.g., blanks) to an actual reel with somewhat fewer low- or
nonpaying stops. However, since the virtual reel is random and the three reels are
independent, virtual reel weights are legal. Virtual reel stops on the payline are
unbiased random events. However, they do affect the probability of the pictures
seen just off the payline. Near misses off the payline such as those that can be
enhanced by virtual reel weights are not illegal (Rose, 1989). The Nevada Gaming
Commission held extensive hearings on this subject and, on September 22, 1988,
it filed a stipulation declaring it legal (Bourie, 1999). Thus it is legal to enhance
near misses using virtual reel weights. The Wizard of Odds Web site reports the
results of an empirical investigation of the weighting of one particular machine
(http://www.wizardofodds.com/game/slotapx1.html).
Virtual reel weights only apply to three-reel slot machines. Five-reel video slots are
so incredibly complex, with so many paylines (up to nine crisscrossing), that the
industry does not need to use virtual mapping to create near misses. The very fact
that there are five reels and multiple crisscrossing paylines greatly enhances the
number of winning symbols and apparent near misses that the player will see on
each spin. Another manner in which near misses are enhanced on five-reel video
slots is that, on some video slot machines, three or four winning symbols lined up
from the left pays a large prize, but three or four winning symbols lined up from the
right does not pay any prize.
In addition, many machines have unequal numbers of winning symbols on their
reels (AGMMA, 2000). This enhances the chances of getting two out of three
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
25 of 36 5/3/22, 3:45 PM

-- 25 of 36 --

winning symbols. Table 3 illustrates how the chances of a near miss are affected
by having different numbers of winning symbols on the three reels. The rate of near
misses is lowest when all three reels have the same probability (middle row of the
table, in bold font). Any deviation from equal probability appears to elevate the
probability of a near miss. For example, if the big win symbol occurs with a
probability of 1 in 10 (p =.10) on each reel, the chance of a jackpot win is 1 in 1000,
but the chance of a near miss is 30 in 1000. If the probability of the win is 1 in 5 on
the first two reels (p =.20) and 1 in 40 (p =.025) on the third reel, the chances of a
win are still 1 in 1000, but the chances of a near miss are now 50 in 1000. The
overall probability of a near miss is only slightly enhanced unless the reels differ by
a large amount. However, placing more winning symbols on the first two reels
concentrates the near-miss action to the first two reels. This is particularly
important because the first two reels stop first, giving the player a period of
anticipation before the third reel comes to a stop. Interestingly, having fewer win
symbols on the first two reels compared to the third also enhances near misses.
This form of near-miss enhancement is perfectly legal because the reels are still
independently random.
In summary, slots are not programmed to produce near misses, but the setup of
the reels enhances the number of apparent near misses that the player will
experience. Weighting of the reels, multiple paylines, and uneven distribution of
symbols across the reels might result in the illusion that the odds are more
favourable than the true odds. According to Rose (1989), the gaming industry
manipulates near misses because they enhance the excitement of play. The same
thing occurs with many instant lotteries, where tickets will usually contain one or
two large prize symbols, but almost never have three large prize symbols. It is
unclear why people find nearly winning exciting. Perhaps people believe that
nearly winning means they will win soon. Perhaps they believe that luck grows
over time and a near miss means that you are nearly lucky enough to win.
Whatever the reason, the fact is that the slot images are randomly selected before
the reels spin. The reel does not almost stop on the winning symbols. The takehome message is you either win or you lose. There is no such a thing as an
“almost win.” A near miss is simply a loss.
You never win on one of these things
This is the first author's favourite myth and is one that he believed until his first
actual casino gambling experience. This is an erroneous belief held mostly by
nongamblers or perhaps by people who have not yet played on one of these
machines. The simple fact is that you can win. Slot variance is much greater than
with other games of chance (e.g., blackjack), so that a player has a more
pronounced roller-coaster experience than with other games (slot simulation
exercise 2: see note at end of paper for details). Typically, a player will lose, for
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
26 of 36 5/3/22, 3:45 PM

---

## Sección 12: Foundations & Introduction

-- 26 of 36 --

example, 82% of the time, but would experience small wins perhaps 15% of the
time. These will occasionally, and dramatically, be punctuated by medium and
large prizes, 2% to 3% of the time. Although the player will most likely lose in the
long run, the chance of long-term wins is never eliminated. In simulations of the
slot machine payout table in Table 2 conducted by the first author, 7.6% of the
players would be winners after 10,000 spins of the reels (see also AGMMA, 2000).
The fact that long-term wins are always possible is perhaps one of the facts that
keeps players at it, clinging to the belief that winning is possible.
Before a machine is licensed, its mathematical properties are tested across
millions of simulated bets in order to prove (within a very small margin of error) to
the casino operators that the machine will make money across players. But the
chance of any specific player winning in the long term never drops to zero. Some
people need to be convinced that they cannot win. For them, perhaps, pointing out
the testing regimen that the machines are put through before being approved is a
good strategy.
However, if naive gamblers hold the belief that they will never win before trying a
slot, the shock of winning might be very powerful. The contrast between
expectation (you never win) and reality (you can win) may lead to the opposite
distortion in their expectations. This leads us to a recommendation regarding the
discussion of wins. Rather than telling people they cannot win, explain to them that
they will win occasionally and that these little wins often keep people playing so
that they eventually lose that money and more.
Discussion
EGMs are computers designed to provide players with an exciting, volatile, and
unpredictable experience. However, the hidden odds of the games mean that
players are left guessing about their chances of winning. This problem is made
worse in the case of reel slots by the mapping or weighting of the virtual reel to the
physical reel so that the visual reel that the player interacts with gives a false
impression about the true odds. On video slots, the pictures are not weighted, but
the complexity of the game makes it very difficult to get an accurate sense of the
odds of winning. With video poker, the probabilities can be determined with
precision, but the mathematical skill required is beyond many gamblers.
The difficulty of figuring out the odds is also augmented by the variable prize
structure itself and the resulting volatility of the game (see Turner & Horbay, 2003,
for further comment). The experience of this volatility makes it very hard for the
player to determine the house edge. Volatility also plays an important role in the
enjoyment of the game. The player never knows what will happen and is therefore
playing on an emotional and financial roller coaster.
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
27 of 36 5/3/22, 3:45 PM

-- 27 of 36 --

Currently across most of North America it is only possible to determine the odds on
a slot machine by playing it and recording the information for several hours (see,
e.g., http://www.wizardofodds.com). But this is difficult and could cost the player
more than the information is worth. Indeed, tracking the reels to obtain the game's
odds is essentially worthless because the game has a negative expected to the
player regardless of recent events. The disclosure regime now in place in Victoria,
Australia, and the AGMMA player information brochure (AGMMA, 2000) are clearly
steps in the right direction toward eliminating hidden odds as a potential source of
problems. British Columbia also now provides information to players on the hit
rates and the odds of winning large prizes for various EGMs.
As we have demonstrated throughout this paper, many people misunderstand how
EGMs work. The lack of accurate information on how the machines work likely
contributes to this misunderstanding. The main conclusion we can draw from this
discussion is “Beware of myths.” However, misunderstanding is not unique to
EGMs. For example, people hold a wide range of erroneous beliefs about roulette
even though nothing is hidden. It is important to understand EGMs in the context of
gambling in order to determine if EGMs are different from other forms of gambling.
We hope we have addressed many of these issues and have advanced our field
toward their greater understanding.
Addiction
Two final questions that we would like to address are why electronic gambling is
addictive and what can be done to curb the addictive potential of the games.
According to cognitive-behaviour theories of addiction (e.g., Marlatt, 1985), all
games of chance, indeed all things that are exciting or pleasant, or provide an
escape, are potentially addictive. According to this view, the heart of the addictive
process is pleasure and escape from pain. Factors such as stress, a mood
disorder, a breakdown in the reward system (e.g., ADHD), gambling venue
availability, social encouragement, and erroneous beliefs enhance this process
(Turner et al., 2002), but there is no reason to believe that anyone is immune from
developing a problem. In addition, consequences of the addiction may be a key
component in turning a hobby into an addiction by setting up a dynamic feedback
loop (gamble for fun - win - happy - lose - depressed - gamble to escape - win -
happy - and so on). It should also be kept in mind, however, that most people who
gamble do not become addicted. Kelly et al. (2002) found that 22% of the
population of Ontario reported playing a slot in the past six months, but prevalence
studies consistently find that 1% to 2% of the population have a severe gambling
problem (Ferris & Wynne, 2001; Shaffer, Hall, & Vander Bilt, 1997). However,
pathological gamblers make up a disproportionately large percentage of regular
gamblers and account for a disproportionately high percentage of gambling
revenue (Focal Research Consultants, 1998; Smith & Wynne, 2004). In addition,
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
28 of 36 5/3/22, 3:45 PM

---

## Sección 13: Foundations & Introduction

-- 28 of 36 --

many people may be at risk, unaware of the risks, or vulnerable due to multiple risk
factors, including game myths or game attributes that are potentially addictive. A
comprehensive theory of gambling problems has to take into account personality,
mood, life history, and possible genetic predispositions, as well as game
characteristics, location, and the experience of the individual player.
There is a strong feeling among clinicians in the problem gambling field that
machine gambling may be more addictive than other forms of gambling. Dorion &
Nicki (2001) have provided evidence that VLTs do indeed account for most problem
gambling in Prince Edward Island. Other studies by Rush et al. (2002) and Smith
and Wynne (2004) also suggest that EGMs account for a large percentage of
problem gambling.
Slots are designed to get people to gamble and keep them gambling. The bottom
line for manufacturers, governments, and operators is money, and these machines
make money. In 2003, EGMs accounted for approximately $7.5 billion in revenue
(KPMG, 2003) in Canada. The very profitability of EGMs may be inherently tied to
the addictive potential of the games. We do not believe that manufacturers design
their games to produce problem gamblers, but their focused attention on the
bottom line has led to the development of a technology that appears to be very
successful at providing intense entertainment to the players, making money, and
creating problems.
Griffiths (1993, 1999) and Loba et al. (2002) have attempted to determine what
characteristics of slot machines may contribute to their addictive potential. The
following is a list of some of the features of EGM design that might be associated
with problem gambling. This list has been derived from work by Griffiths (1993,
1999), Parke and Griffiths (2003), Loba et al. (2002), Focal Research Consultants
(1998), and Smith and Wynne (2004), and from our own examination of the
machines and the games. This list is speculative. We do not know how these
features affect play, but offer them up to encourage their scientific study. The
research that has been conducted so far falls well short of providing evidence for a
causal link with problem gambling because the studies examine changes to shortterm behaviour. Ideally, the gambling industry will join in this study to find features
that could maximize enjoyment and minimize harm (e.g., Blaszczynski & Nower,
2002). Features that could be considered include the following:
• payment: vouchers, cash, tokens
• speed of the machine
• reel slots versus video slots
• payback percentage
• frequency of wins
• lights, colour, and sounds
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
29 of 36 5/3/22, 3:45 PM

-- 29 of 36 --

• game varieties (video poker versus slots lineup games)
• bonus features
• the use of bill acceptors
• the illusion of skill
• advertising
• availability
• the stakes per bet (low versus high)
• the presence of nearby cash machines
• the type of establishment (raceway, casino, bar)
• the presence of alcohol at the location
• hidden odds
• virtual reel mapping
• game volatility (variable prize structure)
• the presence of clocks, windows, and other environmental features, etc.
There is by now enough variation in game design around the world that it should
be possible to research what features of the games (if any) are associated most
strongly with problematic play. This would likely require the cooperation of various
governments in different districts as well as the gambling industry for records on
gambling behaviour on specific machine platforms to determine which sets of
features are associated with problematic play.
If such research is conducted, it might lead to recommendations that could reduce
the potential harm of these games. Mizerski et al. (2002) have argued that the
larger number of EGM players in treatment is a simple consequence of the larger
number of people that play EGMs (market penetration) compared to other forms of
gambling. EGMs are the most widely available, highest intensity form of gambling.
As such the most important feature might be their availability. This too needs
further study.
In researching these features we need to differentiate those that lead to greater
market penetration (more people playing them) from those that lead to more
problems. Theoretically, it might be possible to find features that maximize the
entertainment value of the game and minimize the harm. However, positive
reinforcement is one of the primary driving factors behind all addictions (see
Marlatt, 1985, for a discussion of the cognitive-behaviour model of addiction), so it
is unknown if it is possible to titrate the harmful and pleasurable aspects of the
games.
Summary of key points
Addiction to EGMs likely results from the interaction between the player and the
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
30 of 36 5/3/22, 3:45 PM

-- 30 of 36 --

slot machines. An individual's risk for developing a problem is enhanced by a mix
of cognitive, social, emotional, biological, and genetic predispositions (Turner et al.,
2002). Myths about slot machines likely exacerbate these risk factors. The
following is a summary of the main points raised in this paper.
• The continuously running nature of the RNG ensures that the outcomes of
EGMs are truly random and unpredictable.
• There is no way to beat the machines. Staying at the same machine or
changing machines makes no difference.
• Randomness and payback are separate issues.
• The outcome of each spin is random, but fewer random combinations pay out
than not.
• The machines pay out less to players than they take in. Therefore, over time,
players will most likely lose money.
• The games are so volatile that the moment-to-moment experience can be
very thrilling. As a result of the volatility, it is impossible for players to
determine the payback from any short gambling episode.
• Many people hold erroneous beliefs about slot machines, and these beliefs
are shared among people as myths. Beware of myths.
• The true odds of winning on a slot are not easily derived from playing (hidden
odds). In addition, multiple reels and paylines, unequally distributed symbols,
virtual reels, and a highly volatile game can lead a player to derive a false
impression of the chances of winning. Beware of random chance and hidden
odds.
EGMs are potentially addictive. Like all gambling, they are addictive because of the
nature of winning and losing. This may be enhanced by the myths, illusions, and
structural characteristics that we discussed above. While most people that gamble
do not develop a gambling problem, it is unlikely that anyone is immune. Players
need to be warned about gambling-related risk factors (e.g., stress, erroneous
beliefs, impulsivity) as well as potentially addictive features of the games.
Where to get more information:
. Safe@play Slot Machine tutorial: http://www.gameplanit.com or to download the
slot machine tutorials.
. Frank Scoblette's video, hosted by James Coburn (Scoblete, 1997)
. An Idiot's Guide to Gambling Like a Pro (Wong & Spector, 1996)
. The Wizard of Odds Web site: http://www.wizardofodds.com
. Australasian Gaming Machine Manufacturers Association (AGMMA):
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
31 of 36 5/3/22, 3:45 PM

---

## Sección 14: Foundations & Introduction

-- 31 of 36 --

http://www.agmma.com
References
AGMMA ( 2000). Australian gaming machines player information booklet. Australasian Gaming
Machine Manufacturers Association (AGMMA). Available: http://www.agmma.com
/pdf/playerinfo.pdf
Blaszczynski, A.. Nower, L.. ( 2002). The effectiveness of design changes to electronic gaming
machines as an approach to harm minimisation. Paper presented at the 2002 conference of the
Responsible Gambling Council of Ontario. Available: http://www.rgco.org
/conference_discovery_2002.cfm
Bluejay, M.. ( 2002-04). How do slot machines work? Tips, secrets, myths, and strategies.
Available: http://vegasreference.com/slots.html
Bourie, S.. ( 1999). Are Slot Machines Honest? Available: http://www.americancasinoguide.com
/Tips/Slots-Honest.shtml
Brysbaert, M.. ( 1991). Algorithms for randomness in the behavioral sciences: A tutorial. Behavior
Research Methods, Instruments, & Computers, 22, 45-60.
Dorion, J.P.. Nicki, R.M.. ( 2001). Epidemiology of problem gambling in Prince Edward Island: A
Canadian microcosm. Canadian Journal of Psychiatry, 46, 413-417.
Ferris, J.. Wynne, H.. ( 2001). The Canadian Problem Gambling Index: Final Report. Canadian
Centre on Substance Abuse. Available: http://www.gamblingresearch.org/download.sz
/Canadian%20Probl em%20Gambling%20Index%20final%20report.htm?docid=4441
Focal Research Consultants. ( 1998). Nova Scotia VL player's survey. Report for the Nova Scotia
Department of Health. Halifax, NS: author.
Gleick, J.. ( 1987). Chaos: Making a new science. New York: Viking Penguin Inc.
Griffiths, M.D.. ( 1993). Fruit machines gambling: The importance of structural characteristics.
Journal of Gambling Studies, 9, 101-120.
Griffiths, M.D.. ( 1999). Gambling technologies: Prospects for problem gambling. Journal of
Gambling Studies, 15, 265-283.
Griffiths, M.D.. Parke, J.. ( 2003). The psychology of the fruit machine. Psychology Review, 9 (4),
12-16.
Kahneman, D.. Tversky, A.. ( 1982). Judgement under uncertainty: Heuristics and biases. In
Kahneman, D.. , Slovic, P.. , & Tversky, A.. , (Eds.). Judgement under uncertainty. Cambridge:
Cambridge University Press.
Kelly, J.. Skinner, W.. Turner, N.. Wiebe, J.. Noonan, G.. Falkowski-Ham, A.. ( 2002) Project
weathervane: Measuring gambling behaviours, knowledge and attitudes in Ontario. Available:
http://www.responsiblegambling.org/articles/weathervane_report.pdf%20
KPMG ( 2003) Canadian gaming industry highlights: Gaming practice, page 4.
Lakoff, G.. ( 1987). Women, fire and dangerous things: What categories reveal about the mind.
Chicago: The University of Chicago Press.
Loba, P.. Stewart, S.. Klein, R.M.. Blackburn, J.R.. ( 2002). Manipulations of the features of
standard video lottery terminal (VLT) games: Effects in pathological and non-pathological
gamblers. Journal of Gambling Studies, 17, 297-320.
Marlatt, G.A.. ( 1985). Relapse prevention: Theoretical rationale and overview of the model. In
Marlatt, G.A.. & Gordon, J.R.. (Eds.). Relapse prevention: Maintenance strategies in the treatment
of addictive behaviours (pp. 3–67). New York: Guilford.
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
32 of 36 5/3/22, 3:45 PM

-- 32 of 36 --

Mizerski, D.. Jolley, B.. Mizerski, K.. ( 2002). Disputing the “crack cocaine of gambling” label for
electronic gaming machines. Paper presented at the National Association for Gambling Studies,
Sydney.
Onghena, P.. ( 1993). A theoretical and empirical comparison of mainframe, microcomputer, and
pocket calculator pseudorandom number generators. Behavior Research Methods &
Instrumentation, 25, 384-395.
Orkin, M.. ( 2000). What are the odds? Chance in everyday life. New York: W.H. Freeman and
Company.
Parke, J.. Griffiths, M.. ( 2001). The psychology of the fruit machine: The role of structural
characteristics (revisited). Paper presented at the annual conference of The British Psychological
Society, Surrey, England.
Rose, I.N.. ( 1989). Nevada draws the line at near-miss slots. Gambling and the Law. Mailed June
17, 1989.
Rush, B.. Moxam Shaw, R.. Urbanoski, K.. ( 2002). Characteristics of people seeking help from
specialized programs for the treatment of problem gambling in Ontario. Electronic Journal of
Gambling Issues, 6, 32-54 [Online]. Available: http://www.camh.net/egambling/
Scoblete, F.. ( 1997). Winning strategies: slots with video poker (video cassette). Markham, ON:
Promo Vision Marketing Corporation.
Shaffer, H.J.. Hall, M.N.. Vander Bilt, J.. ( 1997). Estimating the prevalence of disordered gambling
behavior in the United States and Canada: A meta-analysis. Boston: Harvard Medical School
Division on Addictions.
Smith, G.J.. Wynne, H.J.. ( 2004). VLT gambling in Alberta: A preliminary analysis. Alberta
Gambling Research Institute. Available: http://www.abgaminginstitute.ualberta.ca/documents
/research/VLT_Gambling_Alberta.pdf
Statistics Canada. ( 2003). Fact sheet on gambling. Perspectives on labour and income,
Catalogue no. 75-001-XIE. Statistics Canada. Available: http://www.statcan.ca
Tavares, H.. Martins, S.S.. Lobo, D.S.. Silveira, C.M.. Gentil, V.. Hodgins, D.C.. ( 2003). Factors at
play in faster progression for female pathological gamblers: An exploratory analysis. Journal of
Clinical Psychiatry. 64 (4), 433-438.
Tulving, E.. ( 1972). Episodic and semantic memory. In Tulving, E.. & Donaldson, W.. (Eds.).
Organisation and memory. New York: Academic Press.
Turner, N.E.. ( 2000). Randomness, does it matter?Electronic Journal of Gambling Issues, 2
[Online]. Available: http://www.camh.net/egambling/issue2/research/
Turner, N.E.. Fritz, B.. Mackenzie, B.. ( 2003). How to gamble: Information and misinformation in
books and other media on gambling. The Electronic Journal of Gambling Issues, 9 [Online].
Available: http://www.camh.net/egambling/archive/index.html.
Turner, N.E.. Horbay, R.. ( 2003). Doubling revisited: The mathematical and psychological effect of
betting strategy. Gambling Research, 15 (2), 16-34.
Turner, N.E.. Littman-Sharp, N.. Zengeneh, M.. Spence, W.. ( 2002). Winners: Why do some
develop gambling problems while others do not? Available: http://www.gamblingresearch.org
Wong, S.. Spector, S.. ( 1996). A complete idiot's guide to gambling like a pro. New York: Alpha
Books.
Wagenaar, W.A.. ( 1988). Paradoxes of gambling behavior. London: Lawrence Erlbaum
Associates.
Figures
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
33 of 36 5/3/22, 3:45 PM

---

## Sección 15: Foundations & Introduction

-- 33 of 36 --

Figure 1:
Example of the Mapping from Virtual reel
to Actual reel. For an interactive version of
the reel mapping please visit the Game
Planit website. Source: The Safe@play
Slot Machine tutorial CD, Game Planit
Interactive Corp. Box 1245, Elora, Ontario
Canada N0B 1S0. Reproduced here with
the permission of the author.
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
34 of 36 5/3/22, 3:45 PM

-- 34 of 36 --

Figure 2
Outcomes on a slot machine. Notice how
the wins (upward jumps) appear to be
regularly spaced.
Tables
Table 1
Algorithm for generating pseudorandom numbers from 0 to 6
Table 2
Slot payout table
Table 3
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
35 of 36 5/3/22, 3:45 PM

-- 35 of 36 --

The effect of unequal symbol distributions across reels on near-miss probability
Article Categories:
• feature article
Keywords:
slot machines
,
problem gambling
,
random
.
Firefox https://jgi.camh.net/index.php/jgi/article/download/3654/3614?inline=1
36 of 36 5/3/22, 3:45 PM

-- 36 of 36 --
