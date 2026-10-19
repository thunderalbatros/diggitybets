# 📚 Libro Completo: Designing Games: A Guide to Engineering Experiences

**Alcance:** Fuente bibliográfica completa sobre Ingeniería de Emociones en Juegos, Eventos de Cambio de Valor, Incertidumbre, Riesgo/Recompensa y Multijugador (Designing Games: A Guide to Engineering Experiences — Tynan Sylvester). Aplicable a la Software Factory Web y DiggityBets. NO sustituye los contratos de API de Kick ni las reglas específicas de negocio en `CANON_*`.

> **Autor:** Tynan Sylvester  
> **Dominio:** Ingeniería de Emociones en Juegos, Eventos de Cambio de Valor, Incertidumbre, Riesgo/Recompensa y Multijugador  
> **Archivo Fuente:** `Designing Games - Tynan Sylvester.pdf`  
> **Páginas Originales:** 415  
> **Secciones Extraídas:** 48  
> **Fecha de Ingesta:** 2026-10-19  

---

## Sección 1: Foundations & Introduction

Designing
Games
Tynan Sylvester
A Guide to
Engineering
Experiences
www.it-ebooks.info

-- 1 of 415 --

Designing Games
A Guide to Engineering Experiences
Tynan Sylvester has been designing games for 12 years. During that time
he has worked on everything from independently produced games to the
big-studio blockbuster BioShock Infinite.
How do you design a video game that people love to play? In this practical
guide, game designer Tynan Sylvester shows you how to create emotionally
charged experiences through the right combination of game mechanics,
fictional wrapping, and story. You’ll learn design principles and practices
used by top studios, backed by examples from today’s most popular games.
This book also takes you through the day-to-day process necessary to
keep your project on track: when to build and when to test, how to work
with a team, and how to avoid creative dead ends.
Explore topics such as:
n Integration: thread fictional elements and games rules
together into a single system of meaning
n Emergence: generate plot, character, and theme in response
to a player’s decisions
n Compulsion: understand the difference between motivating
players and fulfilling them, and how to do each
n Elegance: maximize a game’s emotional power and variety of
play experiences while minimizing the burden on players—
and your team
n Iteration: plan, test, and analyze your design in stages
instead of trying to decide everything up front
oreilly.com
www.it-ebooks.info

-- 2 of 415 --

Designing Games
A Guide to Engineering Experiences
Tynan Sylvester
Beijing · CamBridge · Farnham · Köln · SeBaStopol · toKyo
www.it-ebooks.info

-- 3 of 415 --

Designing games
by Tynan Sylvester
Copyright © 2013 Tynan Sylvester. All rights reserved.
Printed in the United States of America.
Published by O’Reilly Media, Inc., 1005 Gravenstein Highway North, Sebastopol, CA
95472.
O’Reilly books may be purchased for educational, business, or sales promotional use.
Online editions are also available for most titles (safari.oreilly.com). For more information,
contact our corporate/institutional sales department: (800) 998-9938 or corporate@oreilly
.com.
editor: Rachel Roumeliotis
Production editor: Kristen Borg
Copyeditor: Audrey Doyle
Proofreader: Kristen Borg
Cover Designer: Mark Paglietti
interior Designer: Monica Kamsvaag
illustrator: Rebecca Demarest
indexer: Bob Pfahler
Printing History:
January 2013 First Edition.
Revision History:
2012-12-18 First Release.
See http://oreilly.com/catalog/errata.csp?isbn=0636920026624 for release details.
Nutshell Handbook, the Nutshell Handbook logo, and the O’Reilly logo are registered
trademarks of O’Reilly Media, Inc. Designing Games and related trade dress are trademarks of O’Reilly Media, Inc.
Many of the designations used by manufacturers and sellers to distinguish their products
are claimed as trademarks. Where those designations appear in this book, and O’Reilly
Media, Inc., was aware of a trademark claim, the designations have been printed in caps
or initial caps.
While every precaution has been taken in the preparation of this book, the publisher and
author assume no responsibility for errors or omissions, or for damages resulting from
the use of the information contained herein.
ISBN: 978-1-449-33793-3
[LSI]
www.it-ebooks.info

-- 4 of 415 --

iii
Contents
preface | v
part one | Engines of Experience
1 | Engines of Experience 7
part two | Game Crafting
2 | Elegance 49
3 | Skill 63
4 | Narrative 81
5 | Decisions 119
6 | Balance 155
7 | Multiplayer 175
8 | Motivation and Fulfillment 203
9 | Interface 219
10 | The Market 247
www.it-ebooks.info

-- 5 of 415 --

iv | Contents
part three | Process
11 | Planning and Iteration 277
12 | Knowledge Creation 311
13 | Dependencies 323
14 | Authority 337
15 | Motivation 349
16 | Complex Decisions 363
17 | Values 371
Endgame 375
Recommended Books 377
Quiz Answers 379
Sources 381
index | 387
www.it-ebooks.info

-- 6 of 415 --

v
Preface
a note on the text
Unfortunately, the English language does not provide us with a perfect gender-neutral solution to the pronoun problem. I’ve chosen to use
“he” throughout the book to refer to nonspecific people. This is for reasons
of readability and conciseness only; unless otherwise specified, masculine
pronouns do not refer exclusively to men.
We’d like to hear from you
I love talking about game design. If you have comments or questions about
the book, please email me at tynan.sylvester@gmail.com or contact me
through my website at tynansylvester.com.
You can also address comments and questions concerning this book to the
publisher:
O’Reilly Media, Inc.
1005 Gravenstein Highway North
Sebastopol, CA 95472
(800) 998-9938 (in the United States or Canada)
(707) 829-0515 (international or local)
(707) 829-0104 (fax)
We have a web page for this book, where we list errata, examples, and any
additional information. You can access this page at:
http://oreil.ly/designing-games
www.it-ebooks.info

-- 7 of 415 --

To comment or ask technical questions about this book, send email to:
bookquestions@oreilly.com
For more information about our books, courses, conferences, and news,
see our website at http://www.oreilly.com.
Find us on Facebook: http://facebook.com/oreilly
Follow us on Twitter: http://twitter.com/oreillymedia
Watch us on YouTube: http://www.youtube.com/oreillymedia
Safari® Books online
Safari Books Online (www.safaribooksonline.com) is an ondemand digital library that delivers expert content in both
book and video form from the world’s leading authors in
technology and business.
Technology professionals, software developers, web designers, and
business and creative professionals use Safari Books Online as their primary resource for research, problem solving, learning, and certification
training.
Safari Books Online offers a range of product mixes and pricing programs for organizations, government agencies, and individuals.
Subscribers have access to thousands of books, training videos, and
prepublication manuscripts in one fully searchable database from publishers like O’Reilly Media, Prentice Hall Professional, Addison-Wesley
Professional, Microsoft Press, Sams, Que, Peachpit Press, Focal Press,
Cisco Press, John Wiley & Sons, Syngress, Morgan Kaufmann, IBM
Redbooks, Packt, Adobe Press, FT Press, Apress, Manning, New Riders,
McGraw-Hill, Jones & Bartlett, Course Technology, and dozens more. For
more information about Safari Books Online, please visit us online.
www.it-ebooks.info

---

## Sección 2: Foundations & Introduction

-- 8 of 415 --

part one |
Engines of Experience
www.it-ebooks.info

-- 9 of 415 --

www.it-ebooks.info

-- 10 of 415 --
The Inventor had given them wonderful things—machines for grinding
corn, for weaving cloth, and countless others. The townspeople loved him.
But he was getting old, and there was only time for only one more
invention. So he decided that his last work would be a very special kind of
machine. This one would not be for moving or heating or calculating, but
for making happiness itself.
The townspeople didn’t understand, but they trusted him. He’d
never let them down before. So the Inventor retreated into his castle and
worked.
Years passed. At first the townspeople waited patiently. Then they
doubted. Then they became angry.
“Where is it?” they asked.
“It’s taking too long.”
“It’s costing too much.”
“He’s tricking us.”
“We must destroy him.”
Just as the mob arrived at the castle, the gates opened and the
Inventor came out. “It is accomplished!” he declared. The mob quieted for
a moment and he led them inside.
But there was no great engine—only a roomful of tables littered
with cards, booklets, and tiny pieces of wood. “Where is the machine?”
asked the leader of the mob, readying his club. “Where is the machine of
happiness?”
“It is here,” said the Inventor, motioning to the dice, rulebooks, and
game boards. “Have a seat, and let’s play.”
www.it-ebooks.info

-- 11 of 415 --

4 | Designing games PaRt one
GAME DESIGN isn’t in code, art, or sound. It’s not in sculpting game
pieces or painting game boards. Game design means crafting the rules
that make those pieces come alive.
By themselves, chess pieces are just tiny decorative sculptures. But when
we move those pieces around according to a special set of rules, those little
statues come alive. They will create a nail-biting finish at a high-stakes
tournament. They will generate a world of puzzles in the newspaper. They
will spark friendships, tell stories, and teach lessons found nowhere else
in the universe.
But not just any set of rules will do. In fact, most sets of rules for
pieces on a board won’t do any of these wonderful things. Many will collapse into simple, repetitive patterns as players use the same winning
strategies over and over. Others are nightmarishly difficult to learn. Still
others are so hard to follow that the game becomes a plodding numbercrunching exercise.
The unique value of chess is in how it generates a perfect rhythm of
puzzle and solution, tension and release. That value isn’t in the pieces or
the board. It’s in the game design—the system of rules that drives the
game’s behavior. A game designer’s job is to craft systems of rules that
create these kinds of results.
It’s not easy to know how to achieve game design goals. How would
you change chess to make it easier to learn? What would you modify to
make it a better spectator sport, or to eliminate the often-repetitive opening
moves? Would you add a piece, or remove one? Change how one moves?
Reshape the board, add special abilities, change the art, add a story, or
make the game play in real time?
The answers to these questions are found in the craft of game design.
Game design craft shows how to make games that are hard, easy, or both.
It helps us teach players without smothering them. It tells us how to thread
stories and rules together into a single system of meaning. The first half of
this book is dedicated to this craft.
www.it-ebooks.info

-- 12 of 415 --

engines of exPeRienCe | 5
But even with the best craft in the world, no designer can magically
know the answer to every question (though there are those who try). That’s
why the second half of this book is about the day-to-day process of design.
Real game designers don’t just know the answers—they know how to find
them using testing, planning, and analysis. Process knowledge shows
when to test and how, when to plan and when not to, how to work with
others and avoid creative dead ends.
Design craft does not define the purpose of a game. It only shows us how
to achieve it.
Some people worry that analyzing game design removes its soul—
that understanding the principles of the craft takes away the creativity of
the work. But knowing game design craft doesn’t mean slavishly following
rules to get the same result over and over. It means understanding the
trade-offs in every design decision. When games go wrong it’s rarely because the designer made the wrong choices within their own understanding. It’s because they just didn’t know the trade-offs they were making. So
a designer understanding craft is kind of like an engineer understanding
the laws of physics: Newton’s laws don’t determine whether we build a
boat motor or a Saturn V rocket, but they are essential to perfecting either.
Imagine the best game you have ever played—except crafted even
better, every emotion more potent, the pacing even more perfect, the fiction more cohesive and nuanced. There is no game that could not have
been made better with the same resources. We will never make a perfect
game, but through study of craft, we can push every game as close to its
full potential as humanly possible.
www.it-ebooks.info

-- 13 of 415 --

www.it-ebooks.info

-- 14 of 415 --
Mechanics and Events
Games are composed of MECHANICS, which define how the game works.
A mechanic is a rule about how a game works. The A button makes Mario
jump is a mechanic. So are the rules characters walk at one meter per second,
pawns capture diagonally, and players alternate taking turns.
In board games, mechanics are written in the rulebook. In video
games, they’re implemented in computer code. But whether the mechanics are executed ritualistically by a player or electronically by a computer,
they’re still mechanics because they define the game’s behavior.
During play, mechanics and players interact to generate EVENTS.
An event is something that happens during play. Mario hits a wall and
bounces back, the pawn captures the rook, and the ball went in the net, so the
other team gets a point are events.
In nearly every other entertainment medium, events are authored directly. A screenwriter, novelist, or choreographer will decide every action,
motion, and line of dialogue in the work. Their product is a long series of
predefined events: first Luke meets Obi-Wan, then his parents die, then
they hire Han Solo, and so on. And those events play out the exact same
way every time.
Games are different. Instead of authoring events directly, we design
mechanics. Those mechanics then generate events during play.
For example, while playing Super Mario Galaxy, I once tried to make
Mario jump over a pit. I missed, and Mario touched lava. His backside
burst into flames and he shot straight up like a bottle rocket, screaming
in cartoon pain. As he flew through the air, I maneuvered him to a safe
| 1
Engines of Experience
www.it-ebooks.info

---

## Sección 3: Foundations & Introduction

-- 15 of 415 --

8 | Designing games
ground landing. The events were Mario jumping, missing, hitting the
lava, bursting into flames, flying into the air, screaming, and maneuvering
back to safety. The mechanics behind these events were the jump button,
gravity, physical collision, the explosive-butt lava reaction, and my ability
to control Mario’s motion in midair.
The disc of Super Mario Galaxy does not contain any of the events
described here—it only contains the mechanics. The events emerged
from the interaction between my play and the game mechanics. And those
events will never play out exactly that way ever again.
Game designers don’t design events. We design systems of mechanics
that generate events. This layer of indirection is the fundamental difference between games and most other media. It is our greatest opportunity
and our toughest challenge. It is also the key reason why modes of thought
borrowed from other media break down so often in games.
The Primacy of Emotion
To be meaningful, an event must provoke emotion.
A game can’t just generate any old string of events, because most events
aren’t worth caring about. For a game to hold attention, those events must
provoke blood-pumping human emotion. When the generated events provoke pride, hilarity, awe, or terror, the game works.
The valuable emotions of play can be very subtle. Usually, they’re subtle
enough that players don’t consciously detect them.
Games must provoke emotion, but this doesn’t mean that every game
must make players laugh madly, scream with rage, or break down and cry.
In everyday speech, people often use the word emotion to refer only to the
most extreme forms of passion, like visible rage or grief. But most emotion
is much subtler and more pervasive than this.
For example, as you sit and read this book, you may think you’re not
feeling anything. But you’re actually experiencing a barrage of tiny pulses
of emotion. Anything can cause them—a stray thought of lost love, a goofy
word on a page (snartlebarf!), or a scowl on the face of a stranger walking
by. These feelings only last a moment, and they’re usually below the level
of conscious awareness. But they’re always there, rising and falling in response to every stimulus and thought.
www.it-ebooks.info

-- 16 of 415 --

engines of exPeRienCe | 9
Events in a game produce these small emotions. A minor setback creates a pulse of frustration, and makes you grit your teeth for an instant.
A moment of indecision worries you, and your breath catches. Another
player acknowledges you, so you feel a faint glow of acceptance.
These tiny feelings are painted with a very fine brush. It’s not enough
to say you’re happy or sad or bored today. Those words describe giant shifts
in the most obvious feelings. The tiny emotions—the ones that make up
the tapestry of play—change constantly, every second. This is doubly true
when playing a good game.
Imagine playing chess against a stranger. It’s your turn, and you’re
losing. You don’t see a good move, so you feel stress and mental strain. As
you study the board, the tension mounts. Then, you see your opening: if
you jump your knight backward, you can cover your king and threaten his
at the same time! Silent relief floods in followed by a sense of accomplishment
for solving the puzzle. You make the move, and your opponent grimaces as
he realizes what you did. Seeing this, you feel a sense of dominance. Your
opponent starts thinking. As you’re enjoying your satisfied glow, you notice
a weakness in your position. If he throws his bishop across the board, he
can guarantee a capture on your knight. But it’s not an obvious move. Will
he see it? Your satisfaction transforms into suspense. Time stretches out
as you try to hold your poker face. Finally, your opponent moves a pawn.
Relief floods over you again, with even greater intensity than before, as you
realize that you’ve got this one in the bag.
From the outside, this game doesn’t look like much. Two people sat at
a table, made strained facial expressions, and quietly moved plastic pieces
across a board. Even the players didn’t consciously sense everything they
were feeling. But they were experiencing the roller-coaster emotions of
competitive chess all the same. And they will come back to get that shifting cocktail of emotions again and again.
Detecting and understanding subtle emotions is a designer skill.
It’s hard to sense such subtle feelings. It takes effort and practice. Can
you pinpoint the exact second when you first feel bored with a game? Can
you feel your involuntary smile at a joke you assumed wasn’t funny? Most
people can afford to ignore such feelings, but that’s not good enough for a
game designer. Just as a skilled chef can deconstruct a complex dish into
individual flavors and a musician can pick out chords, time signatures,
and rhythms from an orchestral composition, a game designer must be
www.it-ebooks.info

-- 17 of 415 --

10 | Designing games
able to sense a flicker of anger, a pulse of triumph, or a dash of disgust.
Because those emotions are the reason the game exists. They are why players spend energy, time, and money to move tokens on a board or throw a
ball through a hoop.
The primacy of emotion is one of the great unacknowledged secrets
of game design. Ask anyone about a game and they’ll tell you what they
thought of it. They’ll make some logical argument about the game being
good or bad. But usually that logic is just an automatic rationalization for
the emotions underneath. What really matters is how a game makes us feel.
The emotions of play are not limited to “fun.”
Unfortunately, game design discussions are still often shackled to the
word fun, as though there was some inherent connection between fun and
game design. The link is there, but it’s due to a quirk of history, not a fact
of reality.
Fun is an emotion—that sense of frivolous, mirthful exhilaration you
feel on a roller coaster or in a friendly game of pickup soccer. It’s a pleasurable emotion, and a worthwhile design goal. But it’s not nearly the only
one. We only focus on it because of where games came from.
For most of history, there were no game designers, and games were
pieces of folk culture passed down through generations and enjoyed
mostly by children. When adults played, it was typically as a short reprieve
from their harsh, bland lives. In such a primitive environment, nobody
needed a better term than fun to describe good games.
Today, we have more technology, professional game designers, and
game players with ever-diversifying emotional appetites. To do our jobs
well, designers must use more than one global term. Fun can’t possibly describe the diversity, power, and nuance of game-driven emotions. It would
be like a chef describing every dish as either “tasty” or “tasteless.”
Think of all the things games can do that are not mirthful or frivolous.
Some games use violent competition to provoke feelings of chest-thumping
triumph. Some use narrative to create empathy or wonder. Some pull us
into dark contemplation of existence, or horrify us with needling psychological terror. Doom, Super Mario 64, Street Fighter II, Half-Life, StarCraft,
The Sims, DEFCON, System Shock 2, Deus Ex, World of Warcraft, Dwarf
Fortress, Portal, Tetris, Braid, Katamari Damacy, and S.T.A.L.K.E.R. all
create powerful emotions, but each is unlike any of the others. The whitewww.it-ebooks.info

---

## Sección 4: Foundations & Introduction

-- 18 of 415 --

engines of exPeRienCe | 11
knuckle action of competitive Street Fighter II, the starving dread of System
Shock 2, and the contemplative mourning of DEFCON are all emotionally
gripping—but none of them are fun.
Emotional Triggers
Game mechanics interact to generate events, which in turn provoke emotions in players. But how, exactly, do events create emotion? What is the
link between something happening in a game and that pulse of joy or
sorrow that appears in response?
Your unconscious mind constantly analyzes your situation. When certain
conditions are met, the unconscious triggers an emotional response.
For example, when you stand next to a cliff, a genetically encoded
instinct senses the situation and triggers a fear response. When you look
at a prospective mate, your unconscious mind analyzes everything about
that person, from physical features to reputation to their history with you,
and produces an appropriate feeling of attraction, neutrality, or disgust.
Each of these emotion-causing aspects of a situation is an emotional trigger.
An EMOTIONAL TRIGGER is some thing or observation that causes
emotion.
We have countless different emotional triggers. Physical danger,
changes in relationship or social status, learning, strengthening, acquisition of possessions, signs of sexual opportunity, family and safety, and certain types of natural environments are the most obvious, but they’re not
the only ones. Humans also respond to music, philosophical ideas, humor
and wit, and countless forms of art. Some of these triggers are fixed in our
genes. Others can be learned. Most involve complex interactions between
conditioning and human nature.
Emotional triggers can be extraordinarily complex. Consider, for example, a detective’s hunch. A hunch happens when the emotional unconscious has solved the case and is desperately trying to signal its findings.
On the surface, the detective is struck with a feeling that something is
wrong, but he isn’t sure why. Underneath that, his unconscious mind is
working through a maddeningly complex set of inferences and associations—so complex that his unconscious understands the case better than
www.it-ebooks.info

-- 19 of 415 --

12 | Designing games
he does. Our emotional triggers can be so complex that we can’t even understand them.
Emotion and Change
The bedrock principle behind all emotional triggers is change. To cause
emotion, an event must signal a meaningful change in the world. But not
just any change will create emotion.
To provoke emotion, an event must change some HUMAN VALUE.
For example, an asteroid crashing into a distant planet is an astronomical curiosity. An asteroid crashing into Earth is the most wrenching event
that could occur. The difference is in the implications to human beings.
In one case, nothing human-relevant happened. The other represents a
massive shift from life to death.
[life/death] is an example of a human value.
A HUMAN VALUE is anything that is important to people that can shift
through multiple states.
Human values can be in positive, neutral, or negative states. Only
changes that shift human values between these states are emotionally
relevant.
Some examples of human values are [life/death], [victory/defeat],
[friend/stranger/enemy], [wealth/poverty], [low status/high status],
[together/alone], [love/ambivalence/hatred], [freedom/slavery], [danger/
safety], [knowledge/ignorance], [skilled/unskilled], [healthy/sick], and
[follower/leader]. Events in games can shift all these values and more.
In Minecraft, players are assaulted by zombies every night. When they
finish constructing a fort to hide in, they feel relieved because their situation has shifted from danger to safety.
In Street Fighter II, a kid starts playing tournaments. At first, he is
easily defeated by the local experts. But he doesn’t stop. He keeps practicing, working his way up the ladder. Eventually he wins a regional tournament, then a national, then a world championship. These are life-changing
events because they represent huge shifts from ignorance to knowledge,
from low status to high status, and from defeat to victory.
www.it-ebooks.info

-- 20 of 415 --

engines of exPeRienCe | 13
In World of Warcraft, two players meet while defeating a monster together. One invites the other to join a guild. Stranger becomes friend, and
alone becomes together.
In Half-Life, the player character is trapped in a giant underground laboratory full of monsters invading from another dimension. Occasionally,
he meets other survivors—scientists and security guards—who may accompany him for a time. Finding these allies and losing them are both
emotionally gripping events because of the shift from alone to together
and back.
In some cases, the changing human value exists only inside the game.
Other times, it can be real. For example, gambling games create emotion around changes in real wealth. The action of playing craps is fairly
boring—players merely roll dice over and over. But when money is riding
on the outcome, every roll becomes a nail-biter since it implies a shift between poverty and wealth.
Games can even provoke emotion by physically threatening players.
The experimental video game PainStation plays exactly like Pong, but it’s
far more emotionally intense because every failure is followed by a mechanical slap on the hand or an electrical shock. The tiny moving ball on the
screen carries a lot of emotional weight when it can physically punish you.
What’s emotionally relevant about an event is not the event itself, but
the changes in human values implied by that event. The more important
the human value and the more it changes, the greater the emotion.
Consider the event of losing a pawn in chess. In the early game, this
may be a minor concern. The implications of losing early pawns are that
you have fewer pieces and your pawn structure may be weaker. But in
the late game, one pawn may be the difference between victory and loss.
If you unexpectedly lose the pawn that was guarding your king, you feel
dismayed because the game was just lost. The event is the same in each
case, but the implications are different because one represents a small
nuisance, and the other is a shift from victory to defeat.
Even events that seem to be very minor in themselves can be emotional if they have important implications. Consider the act of scouting
in strategy games. Scouting is no more than seeing an object. It creates
nothing, destroys nothing, and moves nothing. By itself it is almost a
www.it-ebooks.info

---

## Sección 5: Foundations & Introduction

-- 21 of 415 --

14 | Designing games
nonevent. But scouting a strategically important building can reverse a
losing game because that one key piece of information can form the core
of a new strategy that may lead to victory. So, in a game full of combat
and bloodshed, the most emotionally gripping moment might be simply
seeing a building.
There are countless ways to create important human value changes in
response to even small events. For example, the Modern Warfare series of
multiplayer shooters has a kill streak system that hands out special rewards
to players who kill a certain number of enemies without dying. 3 kills in
a row might give a useful radar scan, 7 a friendly jet airstrike, and 11 a
powerful AC-130 gunship attack. This design works because it increases
the implications of certain kills. The 11 th kill is far more meaningful than
the first because it changes the broader game state more than the first
kill. The two kills themselves could be exactly the same—say, shooting an
enemy as he runs around a corner—but their emotional charge is different
because the implications are different.
Emotions don’t just appear in response to a change. They also appear in
anticipation of change.
The emotional unconscious doesn’t just respond to what’s happening.
It constantly peers into the future, watching for human-relevant threats
and opportunities. When it finds one, it signals it with emotion.
Imagine playing Modern Warfare again. You have counted 10 kills.
You know that one more kill will get you the AC-130 bonus and that you’ll
likely win the game. In this situation, small local events such as your death
or the killing of a single enemy may determine the outcome of the entire
match. So you feel suspense because you sense that you are on the knife
edge between two drastically different game outcomes. Everything rides
on what happens in this moment. You’re feeling an emotion not about
something that has happened, but about something that might happen.
This type of suspense is white-knuckle gaming at its finest.
But even this situation can sag into boredom if the unconscious
senses that there is nothing hanging in the balance. Imagine the same
situation where you are at 10 kills. This time, however, your team is already
way ahead of the other team in score. The AC-130 itself will have the same
effect, but the situation is much less suspenseful than before because your
next kill or death won’t actually determine the outcome of the game. The
human value of [victory/defeat] is already locked at victory, so there is no
www.it-ebooks.info

-- 22 of 415 --

engines of exPeRienCe | 15
way for it to shift. If you make the kill and get the AC-130, your team wins.
If you die, your team will win anyway.
The unconscious constantly balances these ledgers of consequence
and directs our conscious attention to the ones that are most lopsided—
that is, the ones with the greatest potential shift in human values. When
the player’s unconscious senses a potential shift in human values, he will
feel it.
A reveal of information is emotionally equivalent to change.
In terms of emotional impact, there is little difference between
learning a fact and a fact becoming true, because the implications and
opportunities are the same. It is the emotional difference between losing a
thousand dollars on a die roll and realizing you’ve lost a thousand dollars
when the dealer turns over the last card. The die roll was an event, the card
flip was a reveal, but the human value shift and the resulting emotions are
the same.
Think of a horror game in which you must walk down a hallway
flanked by several doors. You know the killer is behind one of the doors,
but you don’t know which one. This situation stereotypically creates suspense because there is a looming possibility that you will learn something
with extremely important implications (possibly shifting life to death).
Now imagine a sci-fi horror game in which you walk down a hallway
flanked by teleporter pads on which the killer can appear. In one, the killer
was always there and is revealed behind a door. In the other, he teleports
in. But the two situations are emotionally equivalent.
This means that games can create human value shifts by denying
and revealing information. In some games, it can be hard to constantly
generate changes in human values. These situations can be kept more
interesting by not telling players everything, and instead rationing out
information in a structured way to create suspense.
tHe emotional BlaCk Box
Emotion is the goal of game design. But this presents a challenge, because
it’s hard to track the precise origins of our emotions.
We can’t directly perceive the logic behind our emotional triggers.
www.it-ebooks.info

-- 23 of 415 --

16 | Designing games
Emotion is not a choice. You don’t see the edge of a cliff and decide
to become afraid. You don’t see a beautiful person and logically conclude
that you should be attracted to them. Emotional triggers are automatic
calculations handled by an unconscious part of the mind, similar to the
ones that help you keep your balance while walking or recognize a familiar
face. So even if you know what you feel, you can’t ask the unconscious why
it created that surge of attraction, disgust, serenity, or fear.
tHe BRiDge
A classic research study demonstrates the psychological disconnect between emotions and their causes.
Imagine you’re a young man in Vancouver. It’s 1973. You’re crossing the Capilano Canyon Suspension Bridge. The bridge is a 5-foot-wide,
450-foot-long death trap. It sways in the wind like a deadly wood-and-rope
bridge from an old adventure film. Looking down over the edge, you can
see the jagged rocks between the trees 230 feet below.
In the middle of the bridge, an attractive woman asks if you’ll take
a survey. She is doing a project for her psychology class on the effects of
scenic settings on creative expression. The first page is filled with boring
questions, like name and age. The second asks you to write a short story
based on a picture. After you’re done, the woman tears off a corner of the
survey, writes her phone number and name on it, and tells you to call if
you have any more questions.
The woman is a confederate of psychology researcher Arthur Aron.
What Aron is really interested in is how much sexual content you wrote into
your story, and how likely you are to call the woman back for a date, compared to control subjects on a safer bridge nearby. The bridge would make
subjects’ hearts race and their palms sweaty. The question was would they
reinterpret these fear responses as sexual attraction toward the woman?
They did. Subjects on the scary bridge wrote significantly more sexual
imagery in their story and were four times as likely to call the woman back
later than those on the safe bridge. These results persisted even through
further studies that eliminated factors like subject self-selection (the possibility that more adventurous men are both more likely to cross the scary
bridge and more likely to call the woman).
The men who called back the woman thought they were attracted to
her because their hearts raced when they spoke to her. In reality, their
hearts were racing because they were on a dangerous-looking bridge. But
www.it-ebooks.info

---

## Sección 6: Foundations & Introduction

-- 24 of 415 --

engines of exPeRienCe | 17
they couldn’t tell the difference, because our emotions do not report their
true causes.
emotional misattRiBution
The men in Aron’s study had no natural ability to track the true cause of
their emotions, so they attributed them to the most salient thing in view:
the attractive woman. This kind of emotional misattribution happens constantly. We think we feel a certain way for one reason, when the reason is
completely different.
Some people use emotional misattribution to manipulate. For example, watch closely the next time a political documentary wants to characterize a politician as a bad guy. When his face appears on-screen, the
music shifts into an evil-sounding drone, and the image is stripped of
color, distorted, and slowed down. The director is hoping that the feelings of apprehensiveness that come from the music and visual effects will
be misattributed to the politician, tricking people into being afraid of a
person when they’re actually afraid of a scary noise.
Entertainment producers do the same thing. For example, there is
a trope in TV drama that I call the Leonard Cohen Gravitas Moment. It
comes at the start of the third act of the show, when things are bad and
it looks like all hope is lost. The dialogue stops, and a soulful or catchy
song—often something Leonard Cohen-like—swells as the camera slides
through a montage and a voiceover discusses the theme of the show.
Viewers feel refreshed and contemplative. But they misattribute these feelings to the story when they actually come from the song.
Even though we don’t know why we feel as we do, we effortlessly assign
logical causes to our emotions without realizing it. These assumed
causes are often wrong.
While one part of the mind is hard at work deciding what emotions
to generate, another is hard at work inventing reasons why we’re feeling
those emotions. Sometimes those reasons are accurate, but often they are
not. Yet no matter how wrong they are, we believe them instantly and
wholeheartedly.
In one of the many studies examining this behavior, researchers set
up a nylon display with four stockings in a department store and asked
shoppers which was the highest quality. Eighty percent of them said the
www.it-ebooks.info

-- 25 of 415 --

18 | Designing games
one on the right. When asked why, they cited color or texture. But in reality, the stockings were identical. They chose that particular stocking
because of how it was positioned, and rationalized why afterward. They
weren’t lying intentionally, and they had no idea that they were rationalizing. But they were.
This is why players almost always report game experiences by explaining the causes of their feelings, not the feelings themselves. They’ll say,
“I liked that it was fast,” or “It wasn’t fun because the wizard staff was
boring.” The true parts of these statements are the raw emotions behind “I
liked it,” and “It wasn’t fun.” But the players have automatically appended
reasons why they felt these things. The players don’t have a direct line to
their emotional mechanisms, so they don’t know why they felt what they
did. But they do have the human ability to instantly rationalize nearly any
behavior or opinion.
Emotional misattribution makes it hard to understand how games
affect us.
A game presents a hundred different stimuli and decisions, and provokes a multilayered emotional response. But which parts of the game
triggered which emotion? There’s no easy way to know.
Imagine playing a fighting game against a friend in a local tournament. It’s the last round and you’re neck and neck. Your foe dodges your
energy blasts as he advances toward you. Reaching striking distance, he
feints, hoping you’ll block. You call his bluff and knock him out with a
devastating uppercut. It’s obvious what you feel: a tapestry of exhilaration
and suspense, heart pounding, white knuckles on the controller, shouting
audience members, eyes widening, a rush of victory. But why? What, exactly, caused each of those feelings? Was it the exotic fighting characters?
Cool-looking moves? Beautiful environmental art? Was it the the competition with your friend, changing your relationship with him? Was it the
threat of losing face in front of him? Or perhaps it was just the raw sensory
overload of incendiary light flashing on the screen. There was a fast techno
song playing in the background—did that make a difference? Was the
game’s overwrought backstory a factor?
In fact, every aspect of that situation contributed something to the
emotions it produced. But as humans, we don’t have a mental circuit that
tells us which cause led to which effect. It’s just not something we can do.
www.it-ebooks.info

-- 26 of 415 --

engines of exPeRienCe | 19
The upside is: we must question off-the-cuff emotional reasoning.
When someone says he disliked a game because of the visuals, or the story,
or the controls, don’t take him at face value. Don’t expect to understand
how a game is affecting players just by looking at it.
There are ways to partially decode the puzzle. We can use systematic
methods like playtesting or statistical metrics analysis to observe some of
the effects of small changes. But even with these evidence-based methods,
we can never fully understand a game because we can never watch the
internal workings of a human mind—even our own. Instead, we have to
tease out the mind’s emotional triggers by theorizing at a distance. We’re
like a group of priests trying to read the will of a capricious god from
eclipses and chicken guts. And like such priests, we often get it wrong.
This makes game design very difficult.
The Basic Emotional Triggers
Let’s take a look at some of the most common emotional triggers.
emotion tHRougH leaRning
Think back to a time when a hard concept finally clicked in your mind.
Your eyes light up, your mouth curls into a smile, and the unmistakable
expression of epiphany leaves your lips: “Ahhhhhhh!” Learning feels good.
The more important a lesson is to a human value, the more we’re driven
to learn it.
Puppies have an instinctive drive to play-fight. It looks playful, but the
reason they’re doing it is deadly serious. Prehistoric puppies that didn’t
play-fight grew up into unskilled fighters. They thus failed to reproduce as
well as the play-fighters and were weeded out of the gene pool. For dogs, an
early predisposition to mirthful play-fighting is a survival strategy in the
heartless game of evolution.
The same applies to people. We have a natural desire to learn, but that
desire isn’t indiscriminate.
The skills that we’re instinctively driven to master are the ones that
helped our ancestors reproduce.
Think of the games kids play. They run and jump to master kinesthetic skills. They play house to learn social roles. They engage in mock
www.it-ebooks.info

---

## Sección 7: Foundations & Introduction

-- 27 of 415 --

20 | Designing games
combat with sticks or pillows to learn fighting skills. They pretend to live
adults’ lives as soldiers, socialites, or builders. They’re practicing to be
grownups, and loving every minute of it because that’s what helped their
ancestors reproduce.
As we mature, we gain the capacity to develop more esoteric interests
with less obvious reproductive purposes. For example, I’ve spent years
studying game design, but I’m reasonably sure that none of my ancestors
ever had caveman babies because they developed a better version of Throw
the Rock. But no matter how old we are, the lessons that affect us most are
still the ones that matter to human values—the ones that can shift loneliness to togetherness, or poverty to wealth. So games that teach players to
build, socialize, and fight will always have the broadest impact.
The more intricate and nonobvious a lesson is, the greater the pleasure
of learning it.
If a lesson is obvious, there’s not much buzz in finally getting it because it was always fairly clear. If it’s a subtle idea hidden in the folds of
some complex system, learning it might be a life-changing experience
because it represents a unique epiphany hidden to most people.
So the game designer’s challenge is to create game systems with layers
of nonobvious properties to decode. This means making a deep game that
reveals lessons through layers, each one building on the one before it.
Some classic games such as chess or poker are famous for the lifelong
learning they can provide. Shallow games like tic-tac-toe are the opposite.
The best learning moments happen when we compress a pile of learning into a short time through the mechanism of insight.
Players feel INSIGHT when they receive a new piece of information that
causes many old pieces of information to suddenly make sense.
Insight is the experience of getting a new piece of information that
sets off a chain reaction of other lessons. It happens when we get the final
piece of a logical puzzle that clicks into place and reveals the shape of the
whole.
For example, in a strategy game, an enemy base is revealed at a spot
where you saw some enemy constructors a few minutes earlier. You mentally kick yourself and say, “I should have known!” Or, in chess, your opponent makes a series of seemingly nonsensical moves which later turn
www.it-ebooks.info

-- 28 of 415 --

engines of exPeRienCe | 21
out to be a devilish trap that you walked right into. He smiles triumphantly
as you say, “I should have known!”
These moments weren’t just simple surprises. They were preceded by
clues that the player senses and fails to interpret properly, but manages
to interpret afterward. They matter to us because we think that perhaps
next time, given similar circumstances, we’ll be able to predict the surprise. We’ll get the sniper when we see the flicker of motion, or send the
counterattack against the enemy base when we see the constructors. We
might turn death to life, or defeat to victory.
The greatest insights are revealed after an extended buildup of information that all falls into place at once.
Predefined stories can do this very well since they can control exactly
what the player learns at every point. For example, in Half-Life the player
inhabits Gordon Freeman, a bespectacled, shotgun-toting scientist trying
to escape the giant Black Mesa research facility. While fighting through
monsters and military kill teams, however, the player repeatedly glimpses
a humorless man in a suit carrying a briefcase. The man always disappears around a corner just before the player can get to him, sometimes
seeming to teleport away just out of sight. It’s only after the final climactic
battle that this G-man finally introduces himself and explains what really
happened at Black Mesa.
This type of long insight buildup can appear in game mechanics as
well. Puzzles are a classic example. In the best puzzle games, the player
learns a huge amount of information about a puzzle before he understands it. He determines how all the pieces move, and all the relationships
between them. He might struggle at the puzzle for 20 minutes or longer,
trying to piece together a solution in his head. When it finally hits, the
purpose of all those seemingly random components becomes clear all at
once, and the player says, “Aha!”
emotion tHRougH CHaRaCteR aRCs
Humans are empathetic. See someone smiling, and you’re likely to smile
with him. See someone in pain, and you’ll tense up. We mirror emotions
we feel in others.
This emotional trigger is the stock-in-trade of screenwriters and novelists. And like these writers, game designers can predefine character arcs.
We can write a story for our game and set it up to play out the same way
each time. This is a well-understood and traditional method of provoking
emotion, and it can work well.
www.it-ebooks.info

-- 29 of 415 --

22 | Designing games
But games have another way of creating character arcs: we can have
the game generate them on the fly. For example, in a game of Left 4 Dead,
three survivors of a zombie apocalypse watch an ally slowly bleed out
within sight of the safe room as the monsters lurk nearby. In a game of
The Sims, a husband cheats on his wife with a younger woman and gets
caught in the act. In Dwarf Fortress, a dwarf frustrated by a lack of beer
goes on a rampage, murdering three miners before being put down. All
these events have occurred in these games, but none of them was authored
directly by the designers. Rather, they emerged during play from interactions between game mechanics.
Character arcs also feed a special kind of learning hunger: we love
learning about our peers. We’re particularly interested in the struggles of
others, because it is only during conflict that a person’s inner values and
abilities are revealed. The more intense the conflict they face, the deeper
we see into their true nature. We snore as our hero is forced to choose
between skim and whole milk. Force him to choose between his wife’s life
and his own, and we stare, wondering who this man will show himself to be.
emotion tHRougH CHallenge
Tests of skill and strength create emotions in many ways. As we struggle
at them, we enter a pleasurable state of focus. When we pass them, we feel
energized, capable, and dominant. Even failure instills a sense of wanting
to try again and do better, as long as the player senses the possibility of
success.
Challenge is so closely associated with games that it’s often assumed
to be an essential aspect of the medium. It’s part of many common definitions of games. But though it is a powerful and flexible method, challenge
is still only one more emotional trigger, and not a necessary part of every
game design. The Sims, Minecraft, Snakes and Ladders, Dear Esther, and
roulette all create powerful emotions without players struggling toward a
predefined objective.
That being said, challenge is still an important part of most game
designs, so a large part of this book is devoted to understanding it.
emotion tHRougH soCial inteRaCtion
Catch is a stupid game. At first glance, it’s hard to see why anyone would
bother. Players just toss the ball back and forth. No human values change,
there are no characters, and nobody learns much. But we keep doing it.
Why?
www.it-ebooks.info

---

## Sección 8: Foundations & Introduction

-- 30 of 415 --

engines of exPeRienCe | 23
The answer lies outside the game itself. Think of the classic Leave It
to Beaver moment where Dad takes his son out to toss a baseball back and
forth. These two people are not playing catch because they love tossing
a ball. They’re playing catch to create a pretext that allows them to get
together and talk one on one for a long time. They need the game because
long one-on-one talks between a father and young son can be awkward. By
providing a reason to get together and a mindless activity to perform, the
game removes this barrier. The fact that the game of catch is simple and
thoughtless is not a bug; it’s a feature. More complexity would just get in
the way of the conversation.
Catch is the most basic form of socially driven game, since it has almost
no emotional content in itself. But most social interaction games use specific game events to drive social interactions. One player defeats another,
or two players create something together, or learn something together, and
social interactions are generated around these events. Winning a game of
chess against a computer doesn’t feel the same as winning a game against
a person, even if the game plays out the same way, because defeating a
person adds another layer of emotionally relevant social meaning.
Consider the experience of showing off. Some people’s emotions
reward them for showing off, even if the other people involved are strangers on the Internet. Imagine a game of Counter-Strike in which you are
the last man alive on your team this round. All of your teammates are
observing you, hoping you’ll complete the objective and win the round for
them. Any skillful action you take gains another layer of meaning because
it reinforces the trust and reputation you’ve built among your teammates.
Any mistake you make has the opposite implication. This situation creates
knife-edge tension because your social status hangs in the balance.
Games can support a breathtaking variety of social interactions
beyond showing off. Building trust and breaking it, joking around, defeating strangers, saving friends, and completing a challenge together are all
common social experiences that have been designed into games. There are
a thousand variations on game mechanics that generate social moments.
In every case, the social interaction works when it shifts some social
human value—stranger to friend, low status to high status, and so on.
StarCraft and Halo: Reach have replay recording systems that allow
players to save, rewatch, and share their greatest victories. Skate has a
system for sharing gameplay videos so that a community of players can
rate them. Social network games like Farmville allow players to send one
www.it-ebooks.info

-- 31 of 415 --

24 | Designing games
another gifts or resources that help them achieve objectives. The Sims allowed players to share photo-album-like stories about their virtual people.
Super Mario Galaxy allows one player to control Mario while another uses
the pointing controller to help out by grabbing stars on the screen. Kane &
Lynch allows two players to experience its grimy crime story together.
In a sense, playing a game is a move in the larger game of life. The
father who offers to play catch hopes to connect with his son; the internal
meaning of catch is less important to him than its use as a tool in life. We
play drinking games to establish adulthood. We play chicken with trains to
show fearlessness. The middle school boy plays spin the bottle not because
he’s interested in probability-based elimination mechanics, but because he
knows he might get to kiss the cute girl.
emotion tHRougH aCquisition
We feel a pulse of happiness when we find a dollar under the couch cushions. We chase high-paying jobs and freebies. People scream and cry when
they win the lottery. Whatever form it takes, acquiring wealth is a bit of a
rush.
Gambling games trigger this response with real wealth. But even
games involving no real money can trigger this emotion by creating artificial systems of wealth and acquisition and then giving players wealth
within that system. The fake reward still triggers the feeling of acquisition.
Action role-playing games such as Diablo III are a good example of
this. The player wanders around randomly generated dungeons, killing
an endless stream of monsters. Defeated demons, zombies, and skeletons
spew out little piles of gold, magical weapons, or pieces of armor. Every
gold piece and sword contributes to the increasing power of the player’s
character. These rewards come so often and so continuously that the player
stays on a permanent high of rewards acquisition. The game has narrative,
audiovisuals, characters, and challenges, but none of these is its primary
emotional driver. At its core, Diablo III is about the feeling of getting rich.
emotion tHRougH musiC
Music is a powerful and flexible tool for generating emotion. Since it’s so
easy to mix into an experience, it’s used liberally across many media. Films
play exciting music during action scenes, nightclubs play sexy music late
at night, and daytime talk shows play sad or triumphant songs to emphasize whatever narrative they’re trying to create. Games do the same thing
with action, ambient, or scary music.
www.it-ebooks.info

-- 32 of 415 --

engines of exPeRienCe | 25
And music is wonderfully subtle—even more than most emotional
triggers. Nobody ever gives it the credit it deserves because nobody consciously pays attention to it during play. But even though the conscious
mind is oblivious, the unconscious is still processing the music into a
continuous flow of feeling. You can tell because music is easily separable
from the rest of the experience. Listen to a game soundtrack by itself, and
you’ll feel much of what you felt during play. Play the game in silence, and
you’ll be surprised at how hollow it feels.
Nonmusical sounds also create emotion. Screeching metal shoots us
full of tension and discomfort. A heartbeat accentuates anticipation. Rain
sounds serene. Party whistles are goofy. Squishing fluid suggests disgust.
Laying these sounds over other events can accentuate or contrast an emotion. But be careful—when overused, such tricks can easily tip into cheesiness and end up having the opposite effect.
emotion tHRougH sPeCtaCle
A Star Destroyer crashes into the Death Star! A super-soldier does a slowmotion dive to dodge an incoming rocket! A tanker truck jackknifes, splits
in two, and explodes!
Razzle-dazzle spectacle can bring a quick emotional rise. Unfortunately,
the payoff is shallow and unsustainable. Though these effects are expensive to produce, they’re also creatively easy. Other emotional mechanisms
like character arcs, socializing, and learning require that we construct
interrelated networks of mechanics or characters. Spectacle only requires
that something big blow up. As a result, spectacle is often overused by
studios long on money and short on creative vigor. In the worst cases, it
is used so gratuitously that it crowds out the subtler but more profound
sources of emotion.
Spectacle works when it reinforces what’s already there. When the
player has fought through a thicket of fast-moving threats and reached
his goal with knuckles white on the controller, it’s probably appropriate
that something blow up nice and good. That spectacle works because it
accentuates the player’s preexisting sense of relief and accomplishment at
winning the battle. The same explosion dispensed again and again outside
the context of any challenge leaves players numb.
www.it-ebooks.info

---

## Sección 9: Foundations & Introduction

-- 33 of 415 --

26 | Designing games
emotion tHRougH Beauty
A sunset over the ocean. A healthy, giggling baby. A masterpiece painting.
On the surface, these things have nothing in common. But all of them are
beautiful. Because beauty isn’t in any particular feature of a thing—it is in
how something affects us. Something is beautiful when just perceiving it
is pleasurable.
Games are full of opportunities for beauty. A character can be rendered in perfect detail and move with preternatural grace. A world can
be painted in just the right color composition. And beauty isn’t limited to
video games either—think of the beauty of a well-made chess set, or the
painted illustrations on Magic cards.
But like spectacle, beauty isn’t free, and not just because of the time
and artistic skill it requires. The emotions of beauty don’t always fit with
the rest of the game. Especially in game about ugly things—depression,
horror, or unease—beauty will clash with the rest of the aesthetic. And
beautiful art can add audiovisual noise that makes a game harder to understand and interact with.
As with spectacle, there is a tendency in modern game design to reflexively inject as much beauty into every situation as possible. But usually,
beauty works best when it is channeled toward a specific purpose, not
when it is thoughtlessly larded over everything.
emotion tHRougH enviRonment
Lightly wooded grassland feels different from steamy, claustrophobic
jungle, which feels different from arctic tundra. And these feelings shift
with time and season—winter feels different from summer, night different from day, rain different from shine.
There’s evidence that these responses are partly innate. Psychology researchers have found that American children shown photographs of various environments say they would prefer to live in savannas, even though
they’ve never been to one. These emotions may reflect an evolutionary
imperative to seek out places where a tribe can thrive: fertile, not too hot or
cold, not too open or overgrown. The perfect environment for prehistoric
humans is open grassland with patches of woods and running water. So
when we find a place like this, we feel satisfied and at ease. This emotional
reaction draws us into these places where we can reproduce best.
People also have acquired environmental preferences. We prefer the
landscape we grew up in. So, while American children like savannas,
American adults also like coniferous and deciduous forests, because those
www.it-ebooks.info

-- 34 of 415 --

engines of exPeRienCe | 27
landscapes resemble much of the United States. And no American in any
group wants to live in a desert or rainforest.
Environmentally driven emotions are diverse and strong. Games have
used environments, weather, and season to accentuate feelings ranging
from depression to giddy triumph.
Heavy Rain: This puzzle adventure game is about a man losing his
son. In the first few scenes, the world is bright and sunny. But after the
boy vanishes, the rest of the game plays out under a downpour, and mostly
at night. That endless rain gives every sequence a morose undertone, accentuating the themes of loss, crime, and depression.
Half-Life: Gameplay begins with the player trapped in the giant underground Black Mesa facility, so there is no natural light for the first 15
hours of play. When the player finally bursts through the door and onto
the sun-drenched New Mexico desert, there’s a palpable sense of freedom
and accomplishment.
Metro 2033: Two decades after the nuclear holocaust, a community
of survivors ekes out an existence in the Moscow metro system. It’s dark
down there, but people have still made a home. They work, trade, listen
to music, drink, and laugh. But the surface is a different story. The vision
of Moscow in Metro 2033 may be the least friendly landscape imaginable.
Shattered buildings lay frozen in giant chunks of ice. The air itself is toxic,
so the player must carry a constantly dwindling supply of gas mask filters.
Thousands of icicles menace like spike traps, pulled out sideways by the
lashing wind. Everything about the place is endless: the sun never shines,
the wind never stops, the ice never melts, and nothing ever grows. I’ll
never forget how it felt to pick my way through that rubble. Though most
would call Metro 2033 a shooter or a role-playing game, I wouldn’t, because
I don’t think it’s about shooting or role-playing. I think it’s about discovering how a place like that makes you feel.
emotion tHRougH newfangleD teCHnology
Shiny new tech is cool. The first few games with any new graphics, animation, or physics technology get an emotional rise from certain players just
because of the technology itself.
But this bonus often comes at a cost. Paradoxically, technological advances often lead to a temporary reduction in the design quality of games.
This is partially because developers haven’t yet learned how to best use
the new technology. More importantly, though, the promise of an easy
tech-driven emotional return takes the creative pressure off. So the game
www.it-ebooks.info

-- 35 of 415 --

28 | Designing games
becomes a technology demo because it doesn’t need to be anything else to
get players excited. The game will still work, for a while. But technological
excitement doesn’t last long, and a game that depends on it will not look
very good a few years down the road.
For example, in the mid-1990s it became possible to encode fullmotion video on a CD-ROM and play it back on a PC. This technological
leap led to some of the worst games in history. These games managed to
utterly fail at being movies while simultaneously failing at being games.
Although this disaster was driven by many other factors besides tech
fetishism (such as the blind theft of creative ideas from film), it was enabled
by misplaced trust in technology.
To achieve sustained success, a game must use its new technology to
unlock interactions and situations that couldn’t have been experienced
before. For example, Doom is often cited as a technology-driven game
because it was the first first-person shooter with varying heights and nonright-angled walls. But Doom did not become a mega-hit just because of its
technology. It also took that new technology and used it to unlock a new
spectrum of design-driven experiences. Doom wasn’t just the first game
with arbitrarily angled walls and changing light levels. It was the first
game where demons shut off the lights and charged into the room when
you grabbed an item. It was the first immersive horror game where you
would hear monsters groaning in the dark and turn in circles, trying to
find them. It was the first multiplayer first-person shooter. These elements
depended on technology to work, but they are actually advances in game
design, and the technology alone did not create them.
emotion tHRougH PRimal tHReats
Some things have threatened our species for so long that our fear of them
is imprinted directly into our genes. Rotten food and disease-ridden filth
make us feel revolted to help us avoid food poisoning. Venomous spiders
and snakes make us recoil because they’re more dangerous than their size
suggests. Visibly diseased people drive us away so that we won’t catch their
sickness ourselves. The sight of ghastly wounds kicks off an adrenaline
response to prepare us to deal with a dangerous situation. And games can
trigger these responses. Just throw gore or spiders on a screen. It’s easy.
In fact, it’s too easy. The adrenaline rush of these primal threats has
been cheapened by decades of overuse by lazy filmmakers and game designers. People are just too used to these cheeseball frights by now. Many
www.it-ebooks.info

---

## Sección 10: Foundations & Introduction

-- 36 of 415 --

engines of exPeRienCe | 29
of us automatically tune them out, or even laugh at them. To create genuine horror and revulsion in a modern audience, it’s no longer enough to
splash guts thoughtlessly about the screen. These things can scare people,
but to really horrify players, we must craft threats that disturb them on a
deeper level.
emotion tHRougH sexual signals
A game can show some bare skin, a pretty face, an alluring expression, and
people will notice because we’re genetically programmed to pay attention
to these things. Since these sexual signals are so effective and easy to use,
game designers, advertisers, and filmmakers alike have ruthlessly abused
them. You can put a mostly naked, attractive character in a game, and
some players will respond. As with primal threats, it’s easy.
But the use of cheap sexual signals has downsides. Gratuitous sexuality harms the atmosphere and believability of a serious narrative, and it
irritates large classes of potential players (typically the ones not interested
in the signals presented). In a certain kind of game made for a certain audience, this is fine. For more serious or broadly targeted games, it’s often
not worth being tasteless.
The Fiction Layer
There are some games that are just mechanics and nothing more. Poker,
soccer, checkers, and video games such as Geometry Wars or Bejeweled are
examples of this. In checkers, the pieces are just that: pieces. They move
based on arbitrary rules that don’t relate to anything outside themselves. A
soccer ball is just a ball, and an enemy in Geometry Wars is just a piece of
data in computer memory, represented by an abstract shape on a screen.
These kinds of games can work very well. Pure game mechanics with
abstract representations can provoke tension, doubt, puzzlement, and
triumph. They can shift values between victory and defeat, poverty and
wealth, ignorance and knowledge.
But most real games don’t limit themselves to the abstract. They use
graphics and sounds to help players make believe that the mechanics are
more than an artificial system of rules.
Mechanics gain another layer of emotional meaning when they are
wrapped in FICTION.
www.it-ebooks.info

-- 37 of 415 --

30 | Designing games
At one point in the first Austin Powers movie, Dr. Evil creates a troupe
of sexy fembots. The fembots looked exactly like tall, blonde women in
silver catsuits. But under the skin, they were actually robots (with guns
in their nipples). We all know that the fembots are no more than cleverly arranged hunks of moving matter, like a car engine or a toaster. But
wrapping them in a human-looking skin triggers a different psychological
viewpoint. They become more than robots dressed up to look like women.
They become women who also happen to be robots.
This may seem to be a meaningless distinction. But in the mind, and
in our emotional responses, it makes a huge difference. Given a human appearance, the fembots become characters with minds, desires, and plans.
Now, when the fembots attack it isn’t because of a programming switch,
it’s because they’re angry. When they retreat it’s not due to a coded stimulus response, it’s because they’re afraid. When they pursue something
we don’t say they’re executing a pursuit algorithm, we say it’s because
they want that thing. Everything they do takes on a human emotional
resonance because of the skin wrapped around their robotic skeletons.
The fact that we know that this skin is just a few millimeters of rubber
doesn’t matter.
At their core, all games are no more than mechanics, just as Dr. Evil’s
fembots are no more than metal and rubber. Mario isn’t a cartoon Italian
plumber—he’s a collision cylinder that slides around and bumps into
things. That teenager falling in love in The Sims really didn’t—the game
software just flipped a few bits in a data structure somewhere.
By wrapping the mechanics in a fictional dressing, we imbue them
with a second layer of emotional meaning. That’s why when a game character is running out of food, we don’t just say that our resources are low
and the game will end soon. We say we’re starving. When an ally is defeated, we don’t just quietly remove his token from the board. We grieve for
our murdered friend. We know it’s fake, but the make-believe still creates
some emotional echo of real hunger, grief, or love.
Naïve observers often assume that all the meaning of a game comes
from the fiction. In this view, games make emotion by drawing the player
into a simulated experience until the mental distinction between the
game world and the real world disappears. The designer Eric Zimmerman
named this view the immersive fallacy. It’s a fallacy because no game player
ever forgets they’re playing a game. The fictional wrapping doesn’t replace
or conceal the game mechanics; it adds a second layer of meaning to the
emotions generated by mechanics alone.
www.it-ebooks.info

-- 38 of 415 --

engines of exPeRienCe | 31
fiCtion veRsus meCHaniCs
Fiction and mechanics each create different kinds of emotions.
Mechanics can generate tension, relief, triumph, and loss. They can bring
the pleasure of learning or the pride of solving a puzzle. They can create
social rewards by allowing us to defeat strangers or make friends. But
mechanics alone are also limited in their emotional range. It’s hard to do
humor, awe, or immersion with mechanics alone. And without characters, the entire emotional spectrum that flows through empathy is almost
inaccessible.
The fiction layer creates emotion through character, plot, and world.
We laugh and cry as characters frolic or struggle, and feel shocked or fascinated while exploring a fictional universe. But like mechanics, fiction
alone is limited in its range. It can’t do competition, triumph, and loss.
And it can’t give us the pleasure of mastering a skill, or create social interactions with real people.
Combining fiction and mechanics together allows us to combine emotions from both sides. But there’s a catch.
Fiction and mechanics can easily interfere with each other.
Games narratives are laden with clichés. The player character is an
amnesiac. Or he’s a super-soldier capable of murdering thousands of
foes. Enemies are monsters or evil soldiers, and they feel neither fear nor
remorse. Princesses are captured over and over like it’s going out of style.
A barrel will explode if struck. And nobody ever goes to the bathroom.
One of the worst clichés is the crate. It seems like every game you
see, whether it’s a modern military shooter or a fantasy role-playing game,
takes place in a world scattered with pointless crates. The problem is so
bad that back in 2000, the humor site Old Man Murray created a game
review score system measured in Start to Crate (StC), the idea being that
the longer it took a game to show you a crate, the less lazy the developers
had been in avoiding cliché, and the better the game probably was. Of 26
games tested, only five had StC times of more than 10 seconds. A full 10
games managed StC times of zero seconds by starting the player with a
crate in view.
www.it-ebooks.info

---

## Sección 11: Foundations & Introduction

-- 39 of 415 --

32 | Designing games
That was more than a decade ago. But the crates haven’t gone away.
Why? Have we learned nothing? No, it’s not because game designers are
all fools. The reason that crates and other such clichés appear over and
over is that they cleanly justify good mechanics.
For example, I once designed a shooter level set in an old-timey theater,
with rows of chairs facing a stage at the front. Upon playtesting, I noticed
players were becoming frustrated due to enemy snipers. The theater was so
open that players would get a bullet in the brain the moment they peeked
out from cover. The theater’s fictional design made perfect sense, but its
mechanics didn’t. To be balanced against snipers, it needed a minivansized object in the middle of the audience to block the snipers’ sightlines.
Faced with that kind of problem, under story and time constraints, there
aren’t any easy answers. So I did what I had to. I hung my head in shame
and put a couple of crates in the middle of the theater. People mocked the
crates, and deservedly so. But the fight worked.
Almost all game fiction clichés are similarly mechanics-driven. A
player character with amnesia justifies other characters explaining obvious things about the world. Player characters are often super-soldiers
because it’s hard to make shooter enemies who are entertaining to fight
for more than a few seconds. When enemies last five seconds before death,
the game has to throw hundreds or thousands of them at the player over
the course of the game. A super-soldier player character can justifiably
defeat battalions of enemies alone. And these enemies never have complex
emotions because fear and remorse are fuzzy, unpredictable, and hard
to represent. Games are simpler and more mechanically elegant when
everyone mindlessly fights to the death.
Consider one basic game design cliché: physical violence. So many
games are about physical conflict. It can be tiring. I once tried to break
out of this pattern with a real-time strategy game called Player League.
The player controlled a team of pickup artists in a nightclub. The goal was
to pick up more chicks than the opposing teams of players. This meant
blocking them out of conversations, promoting yourself in various ways,
and using neutral characters to your advantage.
The game did not work. A chief reason the design failed was because
there was no clear way to express most of what was going on. Every game
event was a human interaction, causing one person to feel one of several
possible emotions toward another. A simple camera view of what was
going on would show nothing—just people talking. I couldn’t very well
give the text of their speech because these events could happen hundreds
www.it-ebooks.info

-- 40 of 415 --

engines of exPeRienCe | 33
of times in infinite combinations, far too many to create actual speech for
every situation. I eventually settled on a solution of abstracting relationships out into colored lines and shapes that appeared around people. It
worked, after a fashion, but the representation was arbitrary and had to be
learned by rote, and the in-game events often didn’t make intuitive sense
because the system couldn’t express most of the concepts that exist in a
real social interaction.
These sorts of problems are why so many games are about physical
conflict. A strategy game about war has none of the problems of Player
League. An image of one unit shooting at another is clear and visceral, and
requires no abstract interpretive symbols. People just get physical violence.
It supports mechanics well because it’s easy to learn and understand, so it
gets used over and over.
Also, wars have lots of crates.
Because fiction and mechanics so easily interfere with each other, many
games choose to emphasize one while mostly ignoring the other.
There’s a natural trade-off between focusing on mechanics and focusing on fiction. Focusing on mechanics allows the designer to create
a perfectly balanced, clear, and deep challenge. But it’ll probably be very
hard to find a fictional wrapping that resembles these perfect mechanics.
For example, imagine trying to wrap chess or poker in a fiction. This is
tough because these games don’t much resemble anything besides themselves. Chess has a fiction, but it is thin and nonsensical—real knights
don’t always move two squares forward and one square sideways. Poker
resembles nothing in reality or story. These two games are great systems
of mechanics, but they don’t naturally support good fiction.
Alternatively, a designer can focus on fiction, creating a beautiful,
history-charged world full of flawed characters and fantastic locales. But
all these story details make it hard to change the mechanics under the
surface. They mean that instead of being able to change any mechanic any
way he likes, the designer is required to fix mechanical problems by only
making changes that don’t contradict the fiction. For example, in a game
set in the real world, the designer can’t reduce gravity or make fire not
burn certain characters, even if it would make a challenge more balanced.
So the mechanics suffer.
This fiction–mechanics conflict is why some see a great debate between
mechanics and fiction. The ludologists (from the Latin ludus, for “play”)
www.it-ebooks.info

-- 41 of 415 --

34 | Designing games
argue that games draw their most important properties from mechanical
systems and interactions. The narratologists argue that the mechanics are
just a framework on which to hang the fictional elements players actually
care about. This debate is the game designer’s nature versus nurture, our
plot versus character, our individualism versus collectivism.
But like all such debates, the conflict exists only on the surface.
The pinnacle of game design craft is combining perfect mechanics and
compelling fiction into one seamless system of meaning.
Fiction and mechanics need not fight (though they easily can), and
neither one need be given primacy (though one often is). Used together,
they can enhance and extend each other in ways that each cannot do alone.
Consummately great game design cannot be done by dropping a great fiction on top of excellent mechanics. It is done by threading them together
into a single system of emotion. That’s why so much of game design isn’t
just about crafting a well-balanced challenge or a beautiful world. It’s
about doing each in such a way that it integrates seamlessly with the other.
Constructing Experiences
The emotions of play don’t stand alone. They merge together into an integrated experience.
An EXPERIENCE is an arc of emotions, thoughts, and decisions inside the
player’s mind.
An experience is the combined expression of every effect the game
has upon the player’s psychology, stretching from the beginning of play
to the end. It transforms itself through setup and payoff, expectation and
result. A thought leads to an emotion, which sparks an idea, which causes
a reaction, which brings feedback, leading to another thought. And just as
a well-made meal is more than the sum of its ingredients, an experience is
more than the sum of its psychological components.
Game experiences are always mixed. A soccer player up 2-1 near the
end of a game feels hopeful for a win, but worried about a penalty. A kid
playing Super Mario Galaxy feels happy because of the upbeat music,
while gritting his teeth through a hard jumping challenge.
Game experiences are also marvelously diverse. One might be short
and pure, as in a fighting game that maximizes excitement for 60 seconds.
www.it-ebooks.info

---

## Sección 12: Foundations & Introduction

-- 42 of 415 --

engines of exPeRienCe | 35
Another might be long and complex, like an open-world narrative roleplaying game that shifts from awed exploration to narrative intrigue to
combat excitement through 100 hours of play.
Different emotions put together can enhance one another, transform
one another, or even destroy one another. Let’s look at some of the ways
games can mix emotion to create experiences.
PuRe emotion
To maximize a single feeling, we can combine several different emotional
triggers that drive the exact same emotion. Each trigger is like another
booster rocket that pushes the experience further toward one pure emotional peak.
For example, traditional action arcade games combine fast-paced
music, risky situations, violent fiction, and testosterone-driven social competition to make the game as exciting as possible. Any one of these triggers
could work on its own to create excitement. Together they boost the experience to levels none of them could achieve separately.
JuxtaPosition
Juxtaposition is the combination of different, seemingly incompatible feelings. Ramming together feelings that don’t ordinarily mix can produce
strange and sometimes valuable results.
For a long time, I thought Epic Games’ Gears of War series was no
more than a mindless monster-bashing space marine romp. And the
louder part of its presentation is exactly that. Characters rip monsters
apart with gun-mounted chainsaws, curb-stomp downed enemies, and
fill the air with endless testosterone-marinated declarations of personal
awesomeness. But as I became more familiar with the series, I realized
that the hyper-violent surface concealed a second, very different emotional
ingredient, like a subtle flavor you don’t notice until halfway through a
meal. Gears of War is mournful. It’s set in the ruins of a civilization of
extraordinary beauty. Most of the character arcs are about coming to terms
with loss, whether of a loved one or a glorious former life. Even the game’s
advertisements became famous because of the fascinatingly unsettling
juxtaposition of Gary Jules’s Mad World and visuals of computer-generated
carnage. By juxtaposing mourning with violent excitement, Gears of War
becomes more than just an industrial-strength gore-fest.
There is an easy way to experiment with juxtaposition. Just replace the
music in a game with music that creates a very different feeling. Replace
www.it-ebooks.info

-- 43 of 415 --

36 | Designing games
fighting game music with Mozart’s Lacrimosa. Play the Happy Days theme
song over Doom. Drop Britney Spears over a survival horror game like
Dead Space 2. The results can be weird, unsettling, or funny.
antagonistiC emotions
Ice cream and pizza are both great, but they’re not so great together. In
the same way, some kinds of emotions that work individually don’t coexist
easily because they’re antagonistic toward each other.
For example, shared social enjoyment is often harmed by adding ruthless skill-based competition. Intense competition draws all of a player’s attention as he struggles as hard as he can to win, but laughing with friends
requires us to relax. This conflict is why friends playing skill-based games
will often agree to play only “for fun,” thus turning down the skill intensity of the game to make room for the social experience they really want.
There’s a fine line between juxtaposition and antagonistic emotions.
Sometimes attempts at juxtaposition fall flat when the two feelings just
end up annihilating each other. Other times, what seems like an antagonistic combination can squirt out an entirely different feeling.
For example, a friend of mine had this experience in a shooter: near
the end of the game was a key cutscene of the death of a major character.
It was a tragic moment that obviously attempted to pull at the player’s
heartstrings. The game transitioned back into gameplay. Upon picking up
some ammunition, the character exclaimed, “Sweet!” My friend burst out
laughing because the emotion of tragedy was inadvertently forced too close
to the emotion of manly confidence. The result was a ridiculous mixture
that turned into laughter—an unintended but oddly entertaining result.
atmosPHeRe
The word atmosphere is used when the emotions of the experience aren’t
focused around specific events, but rather permeate the whole experience
in a spread-out haze. It is the emotional background that we only notice
when nothing more salient is happening. Stop and wait in a game and just
feel for a minute. You’ll discover the game’s atmosphere.
Some games de-emphasize the emotional punches of individual events
and instead focus on growing a thick atmosphere and letting the player
sink into it. For example, LIMBO, DEFCON, and Flower are atmosphere
games. Usually the atmosphere in such games is serene and contemplative, though it can be given either a positive or negative flavor: Flower is
about drifting through fluffy clouds in a dreamscape, while DEFCON is
www.it-ebooks.info

-- 44 of 415 --

engines of exPeRienCe | 37
about watching nuclear missiles vaporize millions on a world map. Each
uses music and slow-paced interaction to create atmosphere, then applies
a different fiction to flavor the experience.
emotional vaRiation
Any single emotion gets tiring if sustained too long. To retain power and
freshness, an experience must transform over time.
One classic way of doing this is pacing variation. This method has
been used and studied for years by traditional storytellers, to the point
where they’ve developed a specific pacing formula that they reuse over and
over. The classic pacing curve starts with the hook, settles into a rising
action, builds up, and then finally peaks at its climax before resolving with
a denouement. Graphed out, it looks like this:
This curve can be found in countless media—films, books, comedy
routines, infomercials, operas, and songs—because it is incredibly effective. It hooks people, holds attention, and leaves the audience satisfied
without ever exhausting them.
Games can exhibit this pacing curve as well. And not just by writing
it in a predefined story—we can create game mechanics which generate
it on the fly.
For example, take a multiplayer match of capture the flag in any
shooter. As the game starts, each team is bunched up at opposite ends of
the map. The team members approach one another with a sense of building anticipation. At the center of the map, they crash into one another, and
a pitched battle takes place. Then they settle into an attack-and-defense
rhythm. As the timer runs low, the stakes increase, and with them the tension. At the end of the match, the game approaches a climax of intensity
as the players try to capture their last flag and turn the game in their favor.
Afterward, the players have a few moments to cool off at the score screen.
The pacing curve they experienced follows the classic three-act story formula, but instead of being predefined, it’s generated a little bit differently
every game.
www.it-ebooks.info

---

## Sección 13: Foundations & Introduction

-- 45 of 415 --

38 | Designing games
In addition to varying intensity with changes in pace, we can also vary
the flavor of emotions. Psychologists call this aspect of emotion valence.
For example, fury, grief, and terror are all high in intensity, but their valences are different. Satisfaction, relief, and depression are all low-intensity
emotions with different valences. We can even plot emotions on a graph by
valence and intensity:
We don’t just have to limit ourselves to sending the player up and down
the graph as we change intensity. To keep the experience even fresher, a
game can generate experiences that send the player on a wending path to
every corner of their emotional spectrum, from joy to anger to depression
and relief.
www.it-ebooks.info

-- 46 of 415 --

engines of exPeRienCe | 39
flow
Flow is a popular concept in psychology that is particularly applicable to
game design. It was originally described by the Hungarian psychologist
Mihály Csíkszentmihályi. He described it this way:
FLOW is a state of concentration so focused that it amounts to total
absorption in an activity.
Back in university, I spent some time in the Canadian Army Reserves.
One special thing about the army is that it is absolutely unacceptable to
show up even seconds late for anything.
I had drill at 7:00 on a Saturday one evening. I also made the mistake
of playing the fantasy strategy classic Heroes of Might and Magic III on
the same day. I had lots of time. Looking at the clock, it was 5:00 p.m. If I
started getting ready by 6:15 I could make it to the parade ground in good
time to change into uniform.
But Heroes III is very good at pulling you into flow. I moved my hero,
fought some gryphons and troglodytes, captured a city and grabbed some
treasure. Seemingly a few minutes later, I looked over at the clock. It was
6:37. It was a long sprint to the drill hall.
Flow makes time seem to disappear. Hours can seem like minutes
when a player is utterly engrossed in an activity. It is the perfect form of
escapism because it strips everything else out of the mind. In flow, we
don’t worry about bills, relationships, money, or whether we’re going to get
screamed at by a drill instructor. And flow is pleasurable because it is built
on a continuous stream of tiny successes.
Flow appears when a player is presented with a challenge that is perfectly balanced against his ability level. If the task is too hard, flow breaks
as the player becomes confused and anxious. If it is too easy, the player
gets bored. Graphed, it looks like this:
www.it-ebooks.info

-- 47 of 415 --

40 | Designing games
Flow is the foundation for most good game experiences. It works at
all intensity levels and emotional valences. Heart-pumping action games,
contemplative puzzlers, humorous social interaction games—all can
create flow because each occupies the player’s mind without a break, and
without overfilling it.
And in any case, if flow is broken, the other parts of the experience fall
apart. Nearly all games have to maintain flow to work, and many problems
with bad games come down to nothing more than breaks in flow.
immeRsion
One of the most powerful game experiences is immersion.
IMMERSION is when the mental division between the player’s real self
and his in-game avatar softens, so events happening to the avatar
become meaningful as though they were happening to the player
himself.
Everybody agrees that immersion is valuable, but there is little agreement on where it comes from. Everything from fictional believability, to
graphical fidelity, to relatable or silent protagonists and even lowering the
lights in the room while playing have been called out as contributors. Yet,
www.it-ebooks.info

-- 48 of 415 --

engines of exPeRienCe | 41
there are games with all of these things that aren’t immersive, and there
are immersive games that lack these things.
Immersion occurs when the player’s experience mirrors the character’s
experience.
The best way to describe immersion itself is as the player’s experience
mirroring the character’s experience. Obviously this means the player
sees and hears the same things as the character. But more importantly,
it also means the player thinks and feels what the character thinks and
feels. When the character is afraid, so is the player. When the character is
angry, curious, or dumbfounded, so is the player. When the player thinks
and feels the same as the character, he feels he is the player, and the game
is immersive.
This internal psychological mirroring is the missing piece in most
failed attempts at immersion. But how do we create it? One possible answer
lies in a concept from psychology called the two-factor theory of emotion.
The TWO-FACTOR THEORY OF EMOTION says that emotions are
composed of two parts: physiological arousal and a cognitive label.
Arousal is the state of being amped up and ready to act. Your heart
beats faster, your palms sweat, and your eyes widen. Your body is getting
ready to do something drastic, right now. This arousal state can happen
for many different reasons. Fear induces a state of high arousal, but so do
anger, intense music, and sexual tension.
The two-factor theory of emotion says that all of our different intense
emotions are physiologically the same—that they’re all the same basic
arousal state. According to the theory, the only difference between these
feelings is the cognitive label we put on them.
A cognitive label is a conscious mental explanation for what is causing
the arousal state. Depending on what seems to be happening, your brain
will relabel an arousal state as any of a wide variety of intense emotions.
For example, if you feel aroused while a bear is chasing you, you’ll label
your emotional state as fear. The same arousal appearing a moment after
being insulted will be labeled as anger. The key of the two-factor theory is
that the arousal state is actually the same thing in every case—that there
is no physiological difference between, say, anger and fear. We just label
them differently.
www.it-ebooks.info

---

## Sección 14: Foundations & Introduction

-- 49 of 415 --

42 | Designing games
In a 1962 experiment, researchers gave subjects injections of a mystery drug. The drug was actually adrenaline, which causes sweaty palms,
increased heart rate, and rapid breathing. These subjects were put in a
room with another subject who had also apparently received the injection. What they weren’t told was that the other subject was an actor. In
some trials, the actor acted euphoric. In others, he acted angry. In all cases,
the experimental subjects reported experiencing the same feelings as the
actor was faking. In truth, all they felt was chemically induced arousal.
But the social cues from the actor caused them to relabel this state as fear,
anger, or euphoria. If subjects were told what the injection was, they reported no emotional state because they had labeled their body’s reaction as
a meaningless response to the chemical.
The two-factor theory illuminates a lot of emotional paradoxes. We
cry from both grief and happiness. Nightclubs create sexual attraction by
getting the heart rate up with loud music and dancing. Horror movies are
popular with couples. Dirty jokes work by using offensive or disturbing
ideas to create an emotional response, then relabeling the response as
comedic delight. We even have make-up sex, transmuting anger into lust.
In every case, we’re misattributing arousal to something besides its real
cause. And this misattribution turns out to be the key to immersion.
To create an experience that mirrors that of a character, we construct
it out of three parts. First, we create flow to strip the real world out of
the player’s mind. Second, we create an arousal state using threats and
challenges in the game mechanics. Finally, we use the fiction layer to
label the player’s arousal to match the character’s feelings.
Let’s break this down.
The first ingredient is flow. The role of flow is to get the real world off
the player’s mind so that he can sink into the game. It’s created mostly in
the game mechanics, when the challenge is perfectly balanced against
the player’s skill level. It is a prerequisite for immersion; without flow,
stray thoughts of bills or homework constantly intrude on the experience,
destroying any chance that it might mirror that of the character.
The second ingredient is raw arousal. We can invoke pure, unlabeled
arousal with nothing but game mechanics. For example, Pong, Geometry
Wars, and checkers can be arousing when play is hard and fast, decisions
are tough, and the stakes are high.
www.it-ebooks.info

-- 50 of 415 --

engines of exPeRienCe | 43
The last ingredient is fiction. Without fiction, the arousal generated
by the mechanics is labeled as a generalized kind of excitement, like what
you feel when playing Geometry Wars. But with fiction, we can relabel the
raw arousal state however we like. For example, arousal might be relabeled
as terror in a horror game full of scary zombies. Or it might become gritty
determination in a military game. Even if the game mechanics creating
those experiences are very similar, the cognitive label suggested by the
fiction changes how players perceive their experience.
With that delicate mix in place, the experience transcends simple
engagement and transports the player into another time and place.
The mechanics-driven experience of flow peels away the player’s selfconsciousness, erases his awareness of the real world, and creates a basic
state of physiological arousal. The fictional experience draws his identity
into a character in a make-believe world. The player sees and hears what
the character sees and hears, and feels what the character feels. The player
is the character.
For example, one of the most popular early immersive games was
Doom. The game has very well-crafted action game mechanics. During an
intense fight, the player tenses up, his palms sweat, his mind forgets the
outside world. By themselves, these things aren’t exceptional. They would
happen even if the game had no fiction at all—Geometry Wars players
show these same symptoms.
But in Doom, the player sees through the eyes of a space marine
trapped in a demon-infested colony on a Martian moon. The moaning
zombies and bloodstained world signal the player’s mind that the arousal
he is feeling isn’t just excitement—it’s fear. And that changes everything.
The fact that the marine is aroused because demons are trying to kill
him, and the player is aroused because of Doom’s well-designed combat,
doesn’t matter. In the two-factor theory of emotion, one source of arousal
is interchangeable with another.
Now Doom isn’t just about exciting shooting. It’s about the experience
of being a space marine fighting zombies in a Martian base, because the
player’s experience mirrors that of the character. Fictionally, the marine is
terrified since he is fighting for his life. In real life, the player feels aroused
because of Doom’s fast action mechanics, and labels that arousal as terror
because of the fiction. Those separate experiences merge into one in the
player’s mind. The player and the marine see, hear, and feel the same, so
the player feels he is the marine, and the game is immersive.
www.it-ebooks.info

-- 51 of 415 --

44 | Designing games
Engines of Experience
The experience is the last link in the conceptual chain by which games
work. To recap: first, designers create a set of mechanics. They wrap these
mechanics in a layer of representative fiction. During play, those mechanics interact to produce a long sequence of events. Those events tickle triggers in the player’s unconscious mind, provoking emotions. Finally, those
emotions merge together into an integrated experience which lasts minutes, days, or years.
We also may have just stumbled on a definition for games.
A GAME is an artificial system for generating experiences.
Sometimes I think of games as a special kind of machine. Machines
are made of carefully designed metal shapes that fit together perfectly,
while games are made of carefully designed mechanics that fit together
perfectly. When used, a machine’s parts move against one another in intricate patterns, while game mechanics interact in specific complex ways.
The greatest fundamental difference between games and machines is in
the nature of that result that the system is supposed to create. Physical
machines are made to propel vehicles, heat houses, or assemble widgets.
Games are made to provoke emotion.
If you want a metaphor to use while thinking about games, don’t
think of stories or movies. Those metaphors don’t capture key aspects of
the power of games since they lack dynamic interaction between game
mechanics. They send us down the beaten path of predefined media experiences, and away from the rich virgin land of on-the-fly, explorative,
generated interactivity.
Instead, think of a game as a strange kind of machine—an engine of
experience.
www.it-ebooks.info

---

## Sección 15: Foundations & Introduction

-- 52 of 415 --

part tWo |
Game Crafting
www.it-ebooks.info

-- 53 of 415 --

www.it-ebooks.info

-- 54 of 415 --
Since the start of modern game design in the 1970s, designers have
learned a tremendous amount. But this knowledge is spread among a thousand designers in a hundred studios. One studio has mastered branching
narratives, while another can perfectly balance strategy games, and a third
makes games soaked in atmosphere. This part of the book aims to link
this disparate knowledge into a teachable set of design principles.
There is no one great theory of game design because every design
decision has many different consequences. Adding a tutorial character
may make the game easier to pick up, but harder to implement and less
fictionally coherent. Adding art might make the game more beautiful but
encourage wrong player choices. These multiple consequences demand
multiple explanations. That’s why this part of the book covers many different design viewpoints, none of which are supreme. Each viewpoint helps
us understand a different aspect of a problem.
Game design cannot be learned from a book. It requires experience.
The ideas written here are just a framework. To be useful in making
design decisions, they must be filled in by experience. You need to push
ideas too far and too short. You must watch different designs succeed and
fail in a hundred ways. These kinds of reference experiences give you
calibration. They give that intuitive sense of when each idea in your game
design framework becomes important, and to what degree.
But not just any experience will do when learning game design.
The best game design learning comes from observing the effects of
small, isolated changes to a game.
www.it-ebooks.info

-- 55 of 415 --

48 | Designing games
People trying to understand games often compare entire games to
each other and try to pick out how their differences affect play. But it’s hard
to find design principles this way. There are so many differences between
the games that it’s impossible to isolate the effects of any single one.
Better learning comes from inspecting the effects of tiny changes.
The designer watches three people play a game, and observes the patterns
in their experiences. He sees them understand certain things but not
others, take certain actions, remember certain events. Then the designer
changes one variable in the design. With the next three testers, he watches
the experience change in some specific way—one new idea understood
or lost, one memory gained or erased. The designer learns that their one
small change caused that one characteristic effect.
And that effect will be consistent. Amateurs think games are mystically incomprehensible; professionals have watched the repeatable effects
of isolated changes enough to know that games are rational systems like
any other. While the experience of play can be magical, the mechanisms
behind that experience are not. Let’s take a look under the hood.
www.it-ebooks.info

-- 56 of 415 --
| 2
Elegance
In a way, every game exists already. They’re out there, hidden in the logic
of the universe. We don’t create them. We find them like a sculptor finds
the statue in a block of marble—not by adding anything, but by taking
away the excess material that obscures the form within.
Every game mechanic has a price tag. It costs design effort, since it
must be implemented, tuned, and tested. It costs computing resources
which we could have used somewhere else. It might force changes in the
fiction, or blur the focus of the game’s marketing.
Most importantly, however, it costs player attention. Players must
work to understand a game. They have to follow instructions, make mistakes, fail, and try again. Some won’t be able to, and will leave. Others will
become confused and frustrated.
Players submit themselves to these costs because they want a meaningful experience. Good design means maximizing the emotional power
and variety of play experiences while minimizing players’ comprehension
burden and developer effort. This form of efficiency is called elegance.
Elegance from Emergence
The game of checkers has just a few simple rules, but can generate an
endless variety of different games. Some games are long struggles. Others
are quick sweeps. One game might have a remarkable tactical upset, while
another teaches an important lesson. And the price tag for all this? A
few minutes of simple instructions at the start of the first game. That’s
elegance: countless powerful, varied experiences generated by a simple,
easy-to-understand design.
This level of elegance is impossible in other media. A good screenwriter can write a line that creates three or four experiences on different
viewings, but a good game designer can create a mechanic that generates
www.it-ebooks.info

-- 57 of 415 --

50 | Designing games
thousands or even millions of experiences, just as the rules of checkers
have generated millions of different games. Games can create these massive numbers of possibilities through the process of emergence.
EMERGENCE is when simple mechanics interact to create complex
situations.
Imagine describing a game you played last night to a friend: “It was
awesome! I was in the back of a jeep on the mounted minigun. My friend
was driving. We sped toward the enemy base, crested the hill, and flew
through the air for at least five seconds! I gunned down three bad guys
while we were midair. Then we got hit by a rocket—but we didn’t fall out!
We did a full flip without touching the ground, and I never stopped firing,
even upside down. We landed upright, my friend ran over the guy with the
rocket launcher, and we captured the flag. I’ll never forget it.”
This is a multiplayer match of Halo: Combat Evolved. But this experience is not written on Halo’s disc, and it will never be repeated exactly the
same way. It emerged on the fly from the interaction of simple mechanics
like physics, gravity, weapon tuning, map layout, and split-screen multiplayer. Halo is beautifully designed not because it contains this experience,
but because it contains game mechanics that regularly generate experiences
of this level of intensity. And it will keep generating new ones—forever.
That’s the power of emergence.
Leveraging emergence means crafting mechanics that don’t just add
together, but multiply into a rich universe of possibility.
A shooting mechanic can exist alone. For example, imagine a game in
which you time shots from an unmoving cannon to hit enemy planes as
they fly past. This game has only one control: a fire button. And it produces
a few types of simple experiences. You shoot and miss, or you shoot and
hit.
A looking mechanic can also exist alone. Imagine a roller-coaster simulator in which your only interaction is looking around. Again, you have
one control: a joystick for the camera. And again, there isn’t much breadth
of experience. Once you’ve looked in every direction on every roller-coaster
ride, there’s nothing left to do.
Now imagine combining these mechanics in one game. You can
ride the roller coaster, look in any direction, and shoot at planes flying
www.it-ebooks.info

---

## Sección 16: Foundations & Introduction

-- 58 of 415 --

eleganCe | 51
past. This combination doesn’t just add up the experiences of looking and
shooting. It multiplies them into a combinatorial explosion of new emergent possibilities. We can create aiming challenges where there were none
before. Players have to trade off targeting one enemy over targeting another. The player might even have to learn situational awareness to know
where to look for targets off-screen. This simple look–shoot combination
is so elegant that it drives countless games, from The House of the Dead to
Space Invaders.
Now imagine adding a movement mechanic. The player can run
around an environment, looking and shooting in any direction. The
number of possibilities multiplies again. Now the player can move around
to dodge attacks, rush forward to attack, or explore a space to learn about
its story. Games designed around this simple combination of shoot, look,
and move earn billions of dollars every year. They vary tremendously in
their fiction and emphasis: in one, you’re a space marine blasting aliens;
in another you’re exploring a somber underwater city. But all these games
share the same elegant core: shoot, look, and move.
And those millions of different play experiences come at a remarkably
low cost. The designers need only implement a few mechanics. The players need only learn a few controls. Once that’s done, a million variations of
triumph, sorrow, tension, and joy will emerge.
Elegance happens when mechanics interact in complex, nonobvious
ways. But this same complexity and nonobviousness makes elegant
design very difficult to achieve.
Elegance requires that different mechanics interact. For example, the
look, shoot, move combination works well because the player uses all of
these controls at once. Since the mechanics all work together, they can
multiply into many different possibilities. But this tight interaction between mechanics also makes it hard to solve design problems because
changes in one mechanic also affect all the others.
In an inelegant game, isolated problems are easy to fix. If the wizard’s
goblin-killer rod is too powerful when used against goblins, the designer
can just reduce its power. Since the rod has no effect on anything besides
goblins, this change has no side effects and the problem is solved.
But this easy solution is only possible because the design is so inelegant. Why can’t you use the rod against orcs, ogres, other wizards, the
www.it-ebooks.info

-- 59 of 415 --

52 | Designing games
gods, or stingy shopkeepers? A wizard’s rod implies a universe of possibilities in a fantasy world. Limiting it to goblins loses most of them.
A more elegant game would allow all of these interactions, creating
many more play situations without much more learning burden. But this
creates a challenge for the designer. Now that the wizard’s rod is connected to so many other parts of the game, changing it changes all those
relationships. Powering it down might balance it against goblins but make
it too weak against orcs. Giving it an area of effect explosion may create
exciting field combat but make the rod too dangerous to use near allies.
These kinds of problems can get very thorny as the number of relationships increases into the hundreds or thousands.
This is why simple, elegant games are so uncommon. Crafting a
system of relationships is much harder than authoring a series of one-off
gimmicks, but it’s the only way to get a lifetime of play experiences from a
handful of game mechanics.
I Love the Smell of Elegance in the Morning
When I was in university, one of my first-year math courses involved a lot
of work with grids of numbers called matrices. One property of matrices is
that some can be inverted—transformed into a new form through a series
of numerical operations—while others cannot. The trouble was that there
is no easy set of steps that could determine whether a matrix was invertible or not. You just had to try it and find out, and that took a lot of time.
But my professor taught us another way. He said that one could learn
to “smell” invertible matrices just by looking at them. You wouldn’t know
exactly how you knew, but with training, your unconscious could tell you
the answer.
Sensing elegant mechanics is much the same. A designer can’t predict every outcome that an elegant game will create. They are too numerous and too fuzzy. We can implement the mechanic and test it heavily, but
this can take a lot of time. We need ways to spot elegance on the drawing
board. And the only real way to do that is to smell elegance the same way
my professor smelled invertible matrices: by using trained intuition and
mental heuristics.
Smelling elegance is a skill that comes with experience. But I’ve found
that there are some simple rules of thumb that can help.
Mechanics that interact with many other mechanics smell like elegance.
www.it-ebooks.info

-- 60 of 415 --

eleganCe | 53
Do a quick mental count of the number of interactions expected from
a proposed mechanic. If it interacts with many other mechanics, it’s more
likely to be an elegant design. If it interacts with just one or two, it’s probably not.
For example, when considering a spell in a fantasy RPG (role-playing
game), ask: can it interact with other spells? How about with party members, with multiple adversaries, with the environment, the morality system,
the narrative, or the player’s stats?
Mechanics can even interact with themselves. For example, pawns in
chess can be arranged in many different structures to claim various parts
of the board.
Simple mechanics smell like elegance.
Elegance is as much about reducing the cost of a mechanic as it is
about increasing the benefit. A bloated, overly complex mechanic might
create good results, but it’s often not worth the learning burden it puts on
players. Simplifying it might mean losing a few nuances in play, but it also
opens up mindspace for other, more efficient designs.
Furthermore, reducing the complexity players are exposed to increases
their appreciation of what’s left. Players who aren’t overburdened will fully
explore a game and enjoy every morsel of experience. Those buried in
complexity will miss much of what the game has to offer.
The most elegant-smelling mechanics are so stupidly simple that they
seem downright obvious after you hear them. So try to find designs that
you can write on a cocktail napkin.
Mechanics that can be used in multiple ways smell like elegance.
A tool that can be used creatively, offensively, defensively, tactically,
and strategically is more elegant than one that only fills a single role. Not
only does it interact in many ways, but it also creates new choices and
relationships by coupling these different roles together.
For example, in most shooter games, guns are purely offensive weapons. Players defend themselves with movement and cover, while using
guns to defeat enemies. The Resident Evil series of zombie survival horror
games handles this differently. In Resident Evil, the player cannot move
while shooting, and gunshots cause oncoming zombies to stop in place for
several seconds. In this game, guns are both offensive and defensive tools,
www.it-ebooks.info

---

## Sección 17: Foundations & Introduction

-- 61 of 415 --

54 | Designing games
and players often fire on zombies with no intention of killing them, just
to slow their approach. Tying offense and defense to the same tool means
players must trade off their offensive and defensive needs. Will you slow
down the zombie shambling toward you, or headshot the valuable target
in the distance?
These sorts of multirole trade-offs are everywhere. One unit in a strategy game might be usable for attack, defense, and scouting. The turning
mechanic in racing games might be used to negotiate corners and block
other drivers. And in some stealth games, the player can throw objects to
knock guards out or make noise to draw their attention.
Mechanics that don’t overlap one another’s roles smell like elegance.
A role is a way in which a mechanic can be used. For example, a strategy game unit may be a harasser, a scout, a disabler, or a deceiver. In a
building game, a tool might be an excavator, a constructor, or a decorator. A fighting game attack might be a punch, a block, a block breaker, or
ranged harassment. Each one of these tools has a purpose that can’t be
fulfilled by the others.
When these roles overlap, the game loses elegance because you’re
paying the cost for two mechanics to do the work of one.
For example, if a strategy game provides one kind of scouting unit,
there is no benefit in adding another unless it fulfills a different role than
the first. The second kind of scout must drive some set of new and meaningful play experiences that can’t happen with the first. If it doesn’t, it’s
dead weight in the design.
The most elegant mechanics are so distinct in their role that they
open up completely new kinds of play. Don’t create variations on existing interactions. Instead, seek mechanics that introduce new strategies or
avenues of exploration that didn’t exist in any form before.
Mechanics that reuse established conventions and interfaces smell like
elegance because they leverage knowledge that players already have.
We can ease comprehension burden by using symbols and conventions players already know. These conventions can come from anywhere:
other systems in the game, other games, real life, or cultural archetypes.
As long as players already know them, we can benefit by using them.
www.it-ebooks.info

-- 62 of 415 --

eleganCe | 55
If a game fits the conventions of a genre, use the genre-standard control scheme. In a game without nuanced fiction, give the villain a pointy
moustache and let him twirl it so that everyone knows immediately who
he is. Include nothing unique without good reason, because unique things
take extra effort to understand.
Everyone wants to break ground and express creativity. But creating
new conventions doesn’t just cost the designer—it also costs players. If
we’re going to do it, we have to make sure we’re doing it where it’s worth
the price, not arbitrarily changing a perfectly good convention for no
reason. Real originality does not come from changing the surface details.
It comes from changing the fundamentals.
Even very original designs are often combinations of preexisting ideas,
so even an original game can benefit greatly by using commonly understood symbols and interfaces to communicate its unique content.
Mechanics that work on a similar scale as existing mechanics smell like
elegance.
Consider a game where the player alternates between controlling an
action hero on foot and piloting a fighter jet. This variation may be refreshing, but it comes at a price because it splits the game into two clusters of
mechanics with little interaction between them.
When the hero is on the ground, it matters where enemy soldiers run.
An enemy who runs 10 feet to the left may be vulnerable in the open, while
one who runs 10 feet to the right may be hidden behind a wall. But in the
jet, such on-foot movement is meaningless. A 1,000-pound bomb will kill
a soldier whether he runs left, runs right, or hides behind a crate. Walls
and buildings don’t matter since they all get flattened by the explosion.
This means that when the player is in the jet, the soldier’s on-foot
movement is meaningless. All the effort the designers put into implementing it and all the mindspace the player devoted to understanding
it is worthless. The costs have been paid, but the benefits are not being
returned.
The scale gap between the jet and on-foot sections is so large that the
game is essentially two separate games in one box. You can switch back
and forth between the two modes, but they never come together into an integrated system. When the player is in one mode, all the complexity in the
other mode is wasted because the scales are so different. That’s inelegant.
www.it-ebooks.info

-- 63 of 415 --

56 | Designing games
Magic: The Gathering is a perfect example of a game that maximizes
elegance by matching the scales of different game systems. Players hold
seven cards. They start with 20 life. Usually they can use between three
and 10 mana per turn. They generally have 2 to 12 creature, artifact, and
enchantment cards in play. Creatures usually have power and toughness
ratings of between one and eight. Games last 10 to 30 turns. This close
scaling between card numbers, life, creature counts, creature power and
toughness, turn counts, and mana allows a tremendous number of natural interactions without any fiddly math. And there are cards in Magic that
convert in almost all directions between all of these measures. Players
can convert mana to life, creatures to land, and artifacts to damage. They
can take damage or sacrifice creatures every turn in exchange for other
abilities. They can sacrifice life to pump up creatures’ toughness, combine
creatures and enchantments, and discard cards from their hands to restore creatures killed in battle. Thousands of such interactions can bloom
from a handful of simple systems.
If Magic’s designer Richard Garfield had decided to measure player
life out of 1,000, made creature toughness range from 25 to 50, and let
players have no more than 3 land cards at a time, these relationships
would be broken. Conversions between numbers would require tedious
math and messy rounding, and the elegance of Magic would be shattered.
Scaling elegance applies to almost any type of relationship between
measurable quantities. Sizes, speeds, surface areas, health points, distances, money, energy, communications links, resources, time, and the
number of players or characters are all candidates for elegance through
scale matching.
Mechanics that are reused a lot smell like elegance.
One of the paradoxical aspects of good games is how repetitive they
seem. Players use the same tools over and over. They build more cities,
defeat more orcs, and decorate more houses, again and again.
But just because the player is reusing the same tool doesn’t mean
he’s having the same experience. He may be building cities again and
again, but every city is a new emergent expression of the mechanics and
the player’s decisions. The mechanics stay the same, but the experience
changes every time.
Furthermore, that repetition of mechanics is essential to elegant
design. A mechanic that is only used once is a gimmick. It might be
www.it-ebooks.info

---

## Sección 18: Foundations & Introduction

-- 64 of 415 --

eleganCe | 57
worthwhile, but it can’t be elegant because there’s always a one-to-one relationship between cost and payoff. A mechanic that’s used 100,000 times
can potentially be very elegant, if it can generate new experiences every
time. The repetition doesn’t guarantee elegance, but without it elegance
is impossible.
This is one of the easiest elegance smells to notice. It’s hard to tell
how nuanced the interactions between a mechanic and its neighbors will
be. But it’s typically easy to tell how often a mechanic will be repeated.
And there are many, many design ideas which sound great when they’re
imagined once, but obviously sour after the thousandth time. Look for
those mechanics that will stand up when worked to the bone. Find the
million-repetition mechanics.
Mechanics that don’t impose restrictions on content smell like elegance.
Imagine a science fiction detective game in which the hero finds clues,
solves cases, and occasionally chases bad guys. To improve the action sequences, someone proposes that the protagonist wear rocket boots that let
him jump 20 feet into the air. One prototype later, and designers find the
action sequences are immediately improved. The rocket boots are quickly
written into the official design and everyone cheers.
These designers might be celebrating too early. While they did make
the game better in the short term, they also created a huge hidden cost and
may have harmed their game in the end.
Now that the jump height is 20 feet, every level in the game must
change to support that jump height. There cannot be any place where the
player can get somewhere he shouldn’t by jumping. So level designers
have to find ways to block the player from entering a thousand wrong
places. They have to contort the fiction to prevent the player jumping over
buses and park walls. The suburban bungalow map has to be cut because
there is no way to stop players jumping over the roof. Designers end up
adding piles of crates, invisible walls, or misplaced billboards just to stop
players escaping the play area. All of this means that the game gets a bit
more nonsensical, the fictional backdrop thinner, and the levels slightly
worse as designers spend time trying to contain high-jumping players
instead of making the game better.
The 20-foot jump created a content restriction. It required that all the
levels be built in such a way that the player could not break the game by
jumping 20 feet. It doesn’t sound like a big deal, but in reality it’s a huge
www.it-ebooks.info

-- 65 of 415 --

58 | Designing games
cost for level designers. It becomes a wet blanket that slows and distorts
everything they do.
This mistake is endemic because the benefits are obvious while the
costs are hidden. A new design that creates content restrictions can create
an immediate, visceral design benefit. It feels good in prototype, tests well,
and makes people look good. The benefits are concentrated and immediate, while the costs are spread over years and imposed chiefly on others.
But although each restriction enables some narrow short-term benefit, the
combined weight of too many of them can smother a game.
There are a thousand kinds of content restrictions. Jump distances,
room heights, character counts, resource amounts, dialogue lengths, inventory sizes, and vehicle sizes can all be restricted by design decisions.
Sometimes, as with a 20-foot jump, the restriction grows from implications of the design. Other times, as in the case of character counts, it’s
about keeping the game running at a playable frame rate.
More elegant mechanics can improve a game without creating such
hidden costs. Seek out those designs that work with existing content, and
keep in mind that the cost of content restrictions is well concealed and
usually greater than anticipated. Even a great mechanic might not be
worth it if it forces the rest of the game to twist to accommodate it.
Mechanics that use the full expressiveness of the available interface
smell like elegance.
If the game’s interface is an analog joystick, it can sense the exact
angle of the stick, not just the direction. On an analog trigger, a game can
sense quarter, half, and three-quarter pulls. Even if the interface is just a
button, the game can do something the moment it is released or while it is
held instead of only when it is pressed.
The danger in this is that you may frustrate players with oversensitive
inputs. Such expressive controls work well when the whole spectrum of
input is useful to skilled players, but most of it can be safely ignored by
novices. For example, anyone can play a driving game reasonably well by
ramming the wheel all the way left and right, ignoring most of its expressiveness, but only an expert can use every degree of turn to optimize his
performance.
This idea extends to board and card games as well. How many things
can you do with physical cards, dice, or tokens?
www.it-ebooks.info

-- 66 of 415 --

eleganCe | 59
Elegance Case Study: Predator versus Hellion
StarCraft II: Wings of Liberty has two units on the Terran race with very
similar roles. The Predator and Hellion are both fast, mid-cost units that
specialize in fighting groups of small enemies by using area-of-effect
attacks.
But only the Hellion unit was included in the multiplayer game. This
was a good decision on the designers’ part, because although the Predator
and Hellion units fill the same basic role, tiny differences between them
make the Hellion a much more elegant design. Let’s look at why.
First, some stats:
Predator Hellion
Speed 4 4.25
Hitpoints 140 90
Attack Strikes enemies with
its front paws for 15
damage, and causes
a shockwave that
does 20 damage to all
units surrounding the
Predator at close range.
Fires a stream of flame
that does 8 damage to all
units in a line projecting
out from the Hellion to
medium range. Does
+6 extra damage to
Light units, increasing
by another +5 with the
Infernal Pre-Igniter
upgrade.
Delay
between
attacks
1 second 2.5 seconds
It’s immediately clear that these two units are very similar. They are
both about twice as fast as a soldier on foot. They have similar health reserves, and they both damage enemies in an area. The main difference
is in the geometry of their attacks. Both do area-of-effect damage, but
the Predator does damage in a circle around itself, while the Hellion
does damage in a long, narrow stream. And that turns out to be a huge
difference.
www.it-ebooks.info

---

## Sección 19: Foundations & Introduction

-- 67 of 415 --

60 | Designing games
There are a few different ways to use the Predator. The best case is to
be surrounded by enemies, so the damage ring hits all of them. But this
rarely happens, since the other player can simply refuse to attack. The
Predator can also attack massed groups of enemies, but it won’t hit with
most of its circular shockwave. Finally, the Predator can run into a group
of enemy workers and try to catch them in its damage ring. Beyond that,
there aren’t very many more ways to use this unit. Its short range means
that it can’t hide behind cover or shoot up ledges, and there are few good
synergies between it and other friendly units. Predator fights tend to play
out in the same few ways every time.
The Hellion is very different. The stream shape of its attack means
that its effectiveness varies dramatically depending on the geometry of
the environment and the enemies present. If many small enemies line up,
the flame stream hits all of them for massive damage. If they surround the
Hellion, its flame hits just one and is almost useless.
www.it-ebooks.info

-- 68 of 415 --

eleganCe | 61
That simple difference creates an entire class of nuanced play experiences as the Hellion tries to run around and line up shots, and its opponents try to close in and surround it.
The Hellion also synergizes well with the environment and other
friendly units. Since its attack is ranged, the player can put the Hellion
behind a wall to act as a guard, or behind other units to support them
against groups of small enemies. It can also shoot down at enemies from
a ledge.
Finally, the Hellion attacks much less frequently than the Predator.
There is enough time to move the Hellion between each shot. This permits
advanced “shoot and scoot” tactics where players shoot, move the Hellion,
and shoot again, trying to avoid damage while lining up enemies for each
flame blast. In contrast, the Predator attacks so frequently that such tactics
are impossible. You have to just throw it into battle and watch, hoping it
wins. Its predictability suffocates any chance at moment-to-moment tension or skill development.
Mechanically, the Hellion is no more complex than the Predator. It’s
just as easy to implement and just as easy for players to understand. But
it’s more elegant because it generates so many more challenges, tactics,
and situations than the Predator.
The superiority of the Hellion isn’t obvious. The difference between
the two is very small: a few seconds in attack timing, a different damage
shape. If anything, the Predator appears more interesting on the surface,
while the Hellion is prosaic, uncreative, even a little boring. But that’s
what elegance looks like, and why it’s hard to spot early. Because elegance
www.it-ebooks.info

-- 69 of 415 --

62 | Designing games
doesn’t come from flashy gimmicks or exciting design pitches. It comes
from the opposite of these things: simple, workmanlike designs that
flower into a million experiences.
When we describe the most elegant game systems ever created, they
might sound stupidly straightforward, even dull. But the form of the
design itself doesn’t matter. What matters is the depth and richness of the
possibility space that emerges during play.
www.it-ebooks.info

-- 70 of 415 --
| 3
Skill
O, victory! Thy favor bought
With screams of pain and endless thought
Yet without battles so hard-fought
’Tis a hollow prize, all for naught
Challenge can create the suspense of competition and the thrill of
victory. It can generate fascinating strategic decisions to engross the mind
and teach fascinating lessons. And it can create the social experiences of
defeating or helping others.
But any game that uses challenge—and most do—must deal with the
issue of player skill. A challenge that is too hard for a player is frustrating.
One that is too easy is boring. Good, flow-sparking experiences live in the
Goldilocks zone between these extremes.
The catch is that the Goldilocks zone is different for every player. A
rotating crib mobile is fascinating to a baby but pointless to an adult. A
hyper-competitive tournament game like StarCraft is engaging to professional players but intimidating to the rest of us.
Dealing with skill means understanding the lower limit of skill below
which a game becomes frustrating, and the upper limit beyond which it
becomes dull. It means determining whether and how to expand those
limits to include more players. And it means knowing how to create
meaningful skill tests with real failure in the balance, without that failure
destroying the experience when it actually happens. These topics are the
subject of this chapter.
www.it-ebooks.info

-- 71 of 415 --

64 | Designing games
Depth
DEEP games create meaningful play at high skill levels.
The idea of depth describes how much there is to learn about a game. A
deep game has enough nuance and variation to provide new lessons for a
long time. Chess, football, poker, and StarCraft are all deep games because
players can study them for decades without ever running out of new lessons to learn.
The opposite of this is a shallow game. For example, tic-tac-toe is shallow because once you know the trick, there is nothing else to discover. The
game is only interesting to small children who don’t yet fully understand it.
To an adult who knows how to end every game in a draw, it’s pure tedium.
Ironically, players will try their hardest to solve a game, but they will
hate the designer if they ever succeed. Players cherish the experience
of breaking through skill barriers, of being able to do today what they
couldn’t do yesterday. A solved game is worthless to players because it
provides nothing to learn, no uncertainty, no victory, no defeat. It becomes
an exercise in following a set of well-defined steps toward a guaranteed
outcome. Skill games are only worthwhile to people who don’t fully understand them.
A game’s SKILL CEILING is the level of skill beyond which there is no
way to improve performance. If this skill level is beyond the abilities of
human beings, the game is LIMITLESSLY DEEP and can never be fully
solved by anyone.
One quick way to measure depth is by considering the performance
difference between a player who is theoretically perfect and a player who
is as skilled as is humanly possible. If their performance is the same, the
game has a skill ceiling that players will eventually reach. If the theoretically perfect player is better than any human, the game is limitlessly deep
and players will never run out of things to learn.
For example, chess can be played better by a combined human–
computer team than it can by a human grandmaster. This means that
even after lifetimes of practice, these grandmasters are not playing perfectly. They have not yet reached chess’s skill ceiling, so the game is probably
limitlessly deep.
www.it-ebooks.info

---

## Sección 20: Foundations & Introduction

-- 72 of 415 --

eleganCe | 65
The Modern Warfare multiplayer shooters have an extremely high skill
ceiling. Controls are precise, weapons are deadly, and action is fast. In
other multiplayer shooters, it takes several seconds to kill an enemy even
if you never miss a shot. This puts an upper limit on how effective a player
can be regardless of skill. In Modern Warfare, it is possible, with excellent tactics and aim, to eliminate entire teams in seconds. This perfect
performance is unattainable for humans, but it’s theoretically possible, so
players can always enjoy the experience of striving toward it.
The combat system in Assassin’s Creed II has a medium skill ceiling. A
perfect player could do significantly better than a normal player, but would
not be so astronomically beyond the normal player as he would be in the
Modern Warfare games. This is because the combat system in Assassin’s
Creed II has delays in its controls. Attack animations are often a second
or two long, during which the player can’t take any action. These short
delays reduce the skill ceiling because they give time for a normal player
to mentally catch up with the perfect player. Even with perfect swordplay,
for example, it would take at least 20 seconds or so to kill 10 enemies, since
the animations to kill enemies take about two seconds. A normal player
can achieve this level of performance with practice. But once he does,
there is nowhere to go. Even if the player can think faster, the animation
delays prevent increases in performance. So the skill aspect of the game
becomes dull.
Tic-tac-toe and other trivial games have low skill ceilings. In these
shallow games, it is easy to execute perfect play once you know a few
simple tricks. There is no difference between a perfect player and a decent
human player. Again, the game becomes dull once it’s fully understood.
Not every game needs to be limitlessly deep. Assassin’s Creed II has a
moderate skill ceiling but is still an excellent game because it’s not just a
skill game. It’s also about art, exploration, and narrative. Its designers decided that beauty and accessibility were more important than pure depth.
www.it-ebooks.info

-- 73 of 415 --

66 | Designing games
Accessibility
ACCESSIBLE games create meaningful play at low skill levels. A game’s
SKILL BARRIER is the lower limit of skill below which it is unplayable.
Whereas depth is about the maximum skill level at which a game stays
interesting, accessibility is about the minimum at which it becomes playable. Almost all games and toys have some lower skill limit below which
meaningful play is impossible.
Consider a first-person shooter (FPS). Until the player knows how
to move, turn, and shoot, FPS games are unplayable. For players totally
new to the genre, this is an intimidating barrier to entry. It takes hours
of practice to learn the abstract relationships between screen movements
and controller inputs. This barrier makes FPS games inaccessible for most
people.
Almost all games have skill barriers if we look low enough. PC strategy games require players to be able to use a mouse and keyboard. Many
board and video games require that players know how to read, which
makes them unplayable for young children. A baby who can’t hold onto
objects can’t play Jenga.
Accessibility is often undervalued by game designers because we are
so skilled that we don’t notice games’ skill barriers. But there is a huge
community of potential players out there who would love to play if they
only could. It’s worth doing the work to bring more of them into the fold.
Skill Range
A game’s SKILL RANGE is the range of skill levels at which a game
presents a meaningful challenge.
A wide skill range means the game can be enjoyed by novices and experts
alike. It is easy to learn and hard to master. Conversely, a narrow skill
range indicates a game that is quickly mastered once it is learned. You
either know how to play it completely, or you don’t know how to play it at all.
www.it-ebooks.info

-- 74 of 415 --

eleganCe | 67
We can graph out skill ranges like this:
Tic-tac-toe is playable even for small children, but it becomes boring
as soon as you learn the one good strategy. So its skill range is narrow, and
wholly contained on the left side of the graph.
StarCraft II’s single-player mode is accessible by anyone who has
played video games because it starts with a gentle tutorial and ramps up
slowly. Its skill range is quite wide, but it is not limitlessly deep—scripted
missions mean that the game can be mastered by dedicated players, after
which it stops offering new challenges.
StarCraft II’s multiplayer mode, on the other hand, is limitlessly deep.
No matter how much you practice, there is always more to learn. But it
is also less accessible than single-player mode because lessons aren’t arranged in a gentle skill ramp, and online opponents mercilessly exploit
every mistake.
Sometimes games’ skill ranges change with their player base. For
example, I was a beast at Counter-Strike when I first played back in 2000.
Today, I struggle just to avoid embarrassing myself. The game is essentially the same, but its player base isn’t. Back in 2000, most people online
www.it-ebooks.info

-- 75 of 415 --

68 | Designing games
were new to shooters, while I wasn’t. Today, most Counter-Strike players
have practiced for years, while I haven’t.
Games don’t have to have wide skill ranges to be good. BioShock, for
example, only provides a meaningful challenge across a fairly small band
of players. But the experience still works because BioShock is only 10 hours
long, and it creates most of its meaning through art and narrative. It’s not
intended to provide years of learning through struggle.
Making a game that is either deep or accessible is tough enough.
Making a game that is both deep and accessible and so has a wide skill
range is one of a designer’s greatest tests.
skill witHout exPliCit goals
Some games don’t have explicit goals. Games such as Dwarf Fortress, The
Sims, and Minecraft let players freely explore or build or interact without
any official winning or losing conditions. It might seem as though these
toylike games can ignore the issue of skill. But even toys have skill ranges
because they require some minimum skill level before players can interact
with them meaningfully.
For example, The Sims is more toy than game because there are no
predefined goals. Players raise a simulated family in whatever way they
like. But to play the game at all, one must be able to read, use a mouse,
and understand the interface of windows and buttons. And to experience
the meaning of The Sims, players must have a cultural understanding of
Western-style living. They have to know what a bedroom, telephone, house
party, and extramarital affair are. Without this baseline knowledge, they
can’t interpret the meaning of in-game events.
Beyond basic interaction and comprehension, there is another reason
toys have skill ranges. Most toys don’t remain toys for long. Given a toy,
most people will almost immediately set themselves a goal within it. A
child with blocks will try to stack them higher. One with a ball will try to
throw it farther. The same applies to software toys. In The Sims, a player
might decide to try to make the most money possible. When this happens,
he is no longer playing The Sims. He is playing The Sims: Make as Much
Money as Possible, a skill game of his own design. If that newly invented
game is trivially shallow, the design has failed. This is why even goal-less
toys benefit from expressing interesting, nonobvious properties which can
be learned. Even toys can be deep.
www.it-ebooks.info

---

## Sección 21: Foundations & Introduction

-- 76 of 415 --

eleganCe | 69
Stretching Skill Range
The best way to extend a game’s skill range is to design systems that are
simple and elegant. By squeezing every bit of depth out of each game mechanic, we deliver a lightweight package that is easy to learn but hard to
master. This is a key reason why it’s worth the effort to create an elegant
design.
Aside from just making an elegant game, though, there are many
other ways skill ranges can be stretched and shifted. Let’s look at a few.
Reinvention
My first multiplayer shooter addiction was 1999’s Unreal Tournament.
The marketing showed me a game about a futuristic blood tournament
in which competitors shredded one another with weapons that looked like
pieces of construction equipment. The characters were badass and the
explosions were colossal. I loved it.
After a week of play, though, something changed. I stopped caring
about the badass characters, and stopped seeing the explosions. My mind
had begun to strip away the fiction layer to show me the naked mechanics
under the surface. And in those mechanics I found my challenge: aiming.
Holding the crosshairs on a target consumed all my mental effort.
After much practice, though, I learned to aim by muscle memory,
freeing up my conscious mind to work on something else. In a shallower
game, there would have been nothing else to work on. I would have reached
the game’s skill ceiling and soon lost interest. But Unreal Tournament reinvented itself again, and presented a new challenge: controlling the map
to hold onto the best items and sniping locations. So I developed a mental
library of map knowledge. I figured out how to control the power spots
and maintain a tactical advantage. The colossal explosions were just visual
noise now; the fiction barely registered anymore.
I kept playing. Over time, I learned to dominate the good positions
without conscious effort. Again, my conscious mind was freed up. And
again, the game reinvented itself and revealed the next layer of challenge:
tracking other players. Instead of just knowing the best spots in the map,
I now had to maintain a real-time mental map of where other players were
and where they were going. When I damaged an enemy, I knew he would
go for health. If we engaged at long range, I knew he would grab the sniper
rifle. In each case, I moved to set a trap for him. If I anticipated correctly,
he would walk right into my crosshairs.
www.it-ebooks.info

-- 77 of 415 --

70 | Designing games
Eventually, I got good at predicting movements. Map knowledge was
easy, and aiming challenges were a nonissue. But Unreal Tournament wasn’t
done. It reinvented itself again, into its final, consummate form: a pokerlike
game of psychological trickery. I knew what my options were, and what my
opponent’s options were, and how each of these options interacted. He knew
all of this, too, and I knew that he knew, and he knew that I knew. When
both players have a crystal-clear map of the mechanical game in their heads
and the understanding to make near-perfect choices, the only thing left to
manipulate is the mind itself. So Unreal Tournament became about provoking emotional outbursts, mixing up strategies to remain unpredictable,
reading the opponent’s mind better than he can read yours. It became about
wrapping your mind around his and destroying him.
I never mastered that final reinvention because it is limitlessly deep.
Games broaden their skill range by repeatedly REINVENTING themselves
as the player’s skill increases.
No game can stretch one simple skill out long enough to have a broad
skill range. There is only so much time one can spend on aiming, moving,
or learning economic strategies or map quirks. Deep games like Unreal
Tournament sustain themselves by wrapping games inside games inside
games. Each time one is mastered, a deeper layer of play presents itself.
We can graph those reinventions out on a skill range chart. Just above
its skill barrier, Unreal Tournament is a game about fiction. As players
climb the skill range, it shifts again and again until it becomes a psychological poker game.
www.it-ebooks.info

-- 78 of 415 --

eleganCe | 71
Games tend to go through three characteristic reinventions along their
skill range: the MANUAL, the SITUATIONAL, and the MENTAL.
At the manual reinvention, the challenge is about simple, moment-tomoment mechanical skills. In a shooter, it is about drawing a bead on a
target and holding it there. In Tetris, it is about getting pieces to fall where
you want them in the rotation where you want them. In a strategy game, it
is just about getting the units you want to do the thing you want them to
do. In chess, it is learning how each piece can move. The manual reinvention is about mastering the interface. All games start here.
The situational reinvention is the second level of skill development.
At this level, manual skills are mostly unconscious. In a fighting game,
the player can execute multibutton combo-strikes at will. He can aim and
hit targets, or make his units move as he wants them to. The challenge at
this level is not just knowing how to shoot, it is knowing who to shoot and
when, or knowing what units to send and where. This is the level where
most players are, and where most games are designed to function. It comprises situational awareness, reading patterns, knowing counterstrategies,
and many other midlevel game skills. This level is very broad; it can split
into many internal reinventions. In my Unreal Tournament experience,
both the map control and tracking reinventions were situational.
The mental level of skill development is not reached often, and only
by expert, competitive, committed players. Mental skills are all about
maintaining concentration and performance. At high levels of play, an
emotional upset or a momentary distraction can lead to defeat. At these
heights of ability, there are tactics that are specifically about deliberately
frustrating and distracting an opponent, to try to disturb his concentration. Mental skill is all about predicting and manipulating his mind better
than he can predict and manipulate yours. This is the pokerlike end state
of most limitlessly deep games, and it is the reason most limitless games
are multiplayer—because a person can learn nearly any game system, but
he can never fully understand another human mind.
elastiC CHallenges
Imagine a version of darts where the target is just an inch-wide bull’s-eye.
Hitting the bull’s-eye gives one point, and missing it gives zero points.
Such a game is so hard as to be almost pointless for anyone but experts. A
designer could change the size of the bull’s-eye, but the disk will always be
too small or too large for most players.
www.it-ebooks.info

---

## Sección 22: Foundations & Introduction

-- 79 of 415 --

72 | Designing games
Real darts solves this problem by wrapping concentric rings around
the bull’s-eye, each of which gives a different number of points. Most
people can hit the biggest ring and get a few points, but only the best can
hit the bull’s-eye, so everyone has some challenging but achievable goal.
This is an elastic challenge.
ELASTIC CHALLENGES permit different degrees of success and failure
to provide appropriate challenges to players across a wider skill range.
A pass/fail design only serves players who are just barely good enough
to pass the challenge. If they are too skilled, there is no challenge. If they
are not skilled enough, they inevitably fail. So pass/fail games only work
for players in a very narrow skill range.
Elastic challenges solve this problem by presenting multiple levels of
success or failure. By allowing different degrees of success, they support
a wider skill range since everyone has an attainable but challenging goal.
For example, classic arcade games usually present elastic challenges
using granular scoring systems. Anyone who puts a quarter in gets a few
thousand points just by pushing buttons. But with enough skill and persistence, players can rack up hundreds of millions of points. So no matter
how many times they play (and how many quarters they put in), there is
always a way to do a little better.
Variable scoring systems as in darts and arcade games are a common
form of elastic challenge, but there are others.
For example, in the Hitman games the goal of each mission is to assassinate a target and escape. The twist is that players are rated based on how
cleanly they kill the target. Just killing the target is easy—all you have to do
is hose down the level with machine gun fire and kill everyone. But to get
the coveted Silent Assassin rating, the player must use a combination of
gadgets, disguises, stealth, and accurate shooting to kill the target without
any witnesses or unnecessary violence. And there is a whole spectrum
of ratings leading up to Silent Assassin. A player who leaves dead guards
around to be discovered, but is never seen himself, does better than the
wild bullet-sprayer but not as well as the perfect infiltrator who is never
detected at all.
Had Hitman just been about killing the target, it would have been a
generic shooter. Had it required perfectly clean kills for success, it would
have been impossibly hard for most players. Elastic challenges allowed
www.it-ebooks.info

-- 80 of 415 --

eleganCe | 73
the designers to get the best of both worlds by recognizing and rewarding
every degree of stealth and cleverness that players can express.
Just as we can present different degrees of success, we can also present
multiple degrees of failure.
For example, if a player doesn’t make the jump across a gap, we can
let his character grab the edge and slowly pull himself up. His progress is
slowed, but the game goes on.
In another game, instead of having a player’s AI ally die when attacked, he can become incapacitated. This way, the player can revive him
and continue play at some cost of time and resources.
The spectrum of success and failure can stretch elastically far above
average performance, and far below, without the game having to end and
declare victory or defeat at any point. Every additional amount of headroom
and legroom we put in the elastic spectrum of a game means another
group of players won’t be subjected to a frustrating failure or a boring skill
ceiling.
tRaining
Training systems help players get past the skill barrier quicker. Tutorials,
text messages, audio instructions, and hints embedded in the game world
all serve this purpose.
But there’s danger in training. Some poorly designed training systems bombard the player with instructions, pulling his mind out of the
game. Others act like overprotective parents, telling the player exactly what
to do at every point, leaving him feeling controlled and impotent. All of
this interferes with the rest of the experience.
Good training is invisible.
The best training teaches without the player ever noticing. There are
several ways to achieve this.
Some games thread training into the narrative. For example, in Call of
Duty 4 the player inhabits a soldier being newly inducted into an elite unit.
As he runs the unit’s obstacle course, the commander shouts instructions
on how to surmount each challenge. The course is a tutorial dressed up as
a story sequence, and it works on both levels.
www.it-ebooks.info

-- 81 of 415 --

74 | Designing games
We can turn training sequences into elastic challenges. That training
sequence in Call of Duty 4 isn’t just for training—it’s also a time trial.
Players get more points when they run it faster. So while a novice might
slowly pick his way through the course, an expert will ignore the training
aspect entirely and treat the course as a skill challenge. The novice gets the
lessons he needs, while the expert gets the challenge he craves.
But the best way to make training less intrusive is to skip it when
it’s unnecessary. The trick is determining whether the player needs a
lesson or not. Some games let players skip training sequences voluntarily.
Others test players to determine which training to provide. Some games
even train adaptively—instead of teaching everything in linear order, they
detect when the player lacks a piece of knowledge and provide the lesson
on the spot. Regardless of method, though, the principle is the same: the
most invisible training is the unnecessary training that never happens.
emotional life suPPoRt
Even with good training, many players will spend the earliest parts of the
game below the game’s skill barrier. For them, those first few minutes or
hours become a chore to finish before the real game starts. Many will give
up and never experience the game as intended.
To stop a player from giving up before they surmount the skill barrier, we
can keep their experience on life support using emotional triggers that
don’t require skill.
When the player knows nothing, we can’t build an experience around
solving puzzles, creating things, or defeating enemies because the player
doesn’t have the skill to do these things. But there are other emotional
triggers which work regardless of skill. We can show the player sublime
art. We can introduce fascinating characters. We can let the player joke
with buddies. We can play music or do a tech demo. If we flood the early
experience with these low-skill emotional triggers, we can transform the
early learning stages from a painful chore into something like a semiinteractive intro movie.
For example, board games do this naturally because they’re played in
groups. When you’re sitting around a table with friends, every mistake or
misplaced token becomes an occasion for friendly ribbing. A single-player
board game would be much less pleasant to learn because that early period
would resemble a library study session instead of a party.
www.it-ebooks.info

---

## Sección 23: Foundations & Introduction

-- 82 of 415 --

eleganCe | 75
A great video game example of early emotional life support is BioShock.
The game begins with a title card: “Mid-Atlantic, 1960.” The screen fades
to the first-person view of the player character sitting in an airplane seat.
After a few words, the screen goes black, and we hear a plane crash. Eyes
open up, and we’re underwater. The hero struggles to the surface, gasping for breath, and ends up floating in the ocean, surrounded by burning
airplane parts. In the distance, he sees a ghostly lighthouse with an angel
statue on the top.
The game has hooked the player’s interest. Who am I? How am I
going to get out of the water? What is that lighthouse doing in the midAtlantic, and why the exotic decoration? And since this whole sequence
was noninteractive, it required no skill whatsoever.
Now the player gains control. But without items or weapons, the only
controls are looking and moving. And since there are no threats, the player
is free to take his time as he explores the scene. The game is demanding
skill, but very little.
He swims up to the lighthouse. Climbing a staircase out of the water,
he is confronted with an ornate set of copper doors. With nowhere else
to go, he enters. The doors slam shut, leaving the player in darkness. A
moment later, the lights snap on, and an old-time tune from the 1930s revs
up. The player finds himself inside a giant chamber constructed in the art
deco style. In front of him is a huge copper bust of a scowling man. Below
it hangs a blood-red banner. “No god or kings,” it reads, “Only man.”
The music, the art deco style, the plane crash, and the hints at a larger
philosophical idea flood the player with experience. And all the while, the
player is navigating the space, learning the basic movement controls. What
could have been a tortuous training sequence (“Press forward to walk!”)
becomes an unforgettable experience.
BioShock goes on like this. It presents one gripping artistic or narrative experience after another, while quietly adding interactive complexity
in the background. Soon, the player gets a weapon. Then, he gets the first
of the game’s spell-like plasmid powers. Later, he’s introduced to more
weapons and plasmids, upgrades, audio logs, inventing, hacking, and
more. Within a few hours, the player is a pro, combining multiple tools to
solve complex puzzles and defeat fearsome enemies. And he learned it all
without noticing, because he was too busy experiencing the art and the
world.
www.it-ebooks.info

-- 83 of 415 --

76 | Designing games
DiffiCulty moDifiCation
Difficulty modification means shifting a game’s challenge level as a whole.
On the skill range graph, this has the effect of shifting the entire range
left or right.
There are a number of ways to do difficulty modification.
EXPLICIT DIFFICULTY SELECTION asks players how much challenge they
want.
Easy, medium, or hard? Games have been asking this question for
decades, and for good reason. It’s straightforward to design, reasonably
effective, and reasonably elegant.
The trouble is that the choice of difficulty can itself be confusing.
There are no standard easy, medium, and hard difficulties, so players
worry they’ll make the wrong choice. To alleviate this, some games test
players in the first level and recommend a difficulty level. Others describe
the difficulty levels with examples, or allow the difficulty to be changed
during play in case the player makes the wrong choice.
ADAPTIVE DIFFICULTY silently adjusts the game’s difficulty depending
on how well the player is doing.
If the player is starving, we can quietly place some food in the next
room. If he’s alone for too long, we can “randomly” introduce an ally to
come to his aid. Every time he fails, we can silently decrease a secret difficulty counter, making enemies weaker and slower. Every time he succeeds, we increase it, making enemies harder to kill and more aggressive.
Adaptive difficulty works best when players aren’t aware of it. Players
who know about it will sometimes try to game the system. Or they’ll start
attributing every random event to it and become convinced that their play
experience is artificial. Adaptive difficulty appears in more games than
people realize because designers never advertise it.
Adaptive difficulty is only appropriate for games in which players
aren’t expected to reach very high skill levels. Expert players will figure out
how an adaptive difficulty system works, and manipulate it to their advantage. Games for these players must be more honest because experts can
tell when a game is using sleight of hand to help or hinder them. They’ll
quickly decode the system and manipulate it to their own advantage.
www.it-ebooks.info

-- 84 of 415 --

eleganCe | 77
Adaptive and explicit difficulty can live together. For example,
Resident Evil 5 has four explicit settings ranging from easy to professional.
Internally, though, it has 10 adaptive difficulty settings measured numerically from 1 to 10. Each time you die, the internal difficulty goes down
until it hits the minimum. Each time you succeed, the internal difficulty
rises. But the system can only adapt the internal difficulty within limits
defined by the player’s explicit difficulty selection. For example, an easy
mode game can invisibly shift between internal difficulties 1 and 4, while
a normal mode game can shift between 3 and 7. To solve the problem
of expert players manipulating the adaptive difficulty system, the game
has a special difficulty mode that locks the internal difficulty at 10. This
combined difficulty system gives Resident Evil 5 a very wide skill range,
since it can adapt as necessary for novices while offering a pure and honest
experience for experts.
IMPLICIT DIFFICULTY SELECTION allows players to adjust their challenge
level by making strategic decisions.
If some strategies are obviously easy to execute while others are obviously hard, players will choose strategies that match their skill level.
They are selecting their challenge level, but doing so implicitly instead of
explicitly.
Team Fortress 2: There are nine character classes. Playing as the Sniper
requires pinpoint accuracy, while playing as the Engineer or Medic requires no aiming ability at all. Players of this game tend to sort themselves
by skill: those who can’t aim gravitate toward the Engineer and Medic,
while shooter experts tend to choose the Sniper. In this way, players choose
the degree and type of challenge they want without being exposed to a
clunky difficulty selection screen. And unlike explicit difficulty selection,
this system works in a competitive multiplayer game.
Call of Duty 4: In the single-player campaign, the player fights through
linear levels containing invisible touch triggers, each of which spawns
a cluster of enemies. Skilled players fight aggressively, pushing forward
hard, and tend to hit several triggers in a row. They end up fighting multiple groups of foes at a time, which provides a satisfyingly tough battle.
Unskilled players are naturally timid, holding back and clearing out a
space before moving forward. Since they finish every group of enemies
before triggering the next, they’re much less likely to get surrounded or
www.it-ebooks.info

---

## Sección 24: Foundations & Introduction

-- 85 of 415 --

78 | Designing games
overwhelmed. By choosing to advance quickly or slowly, each player continuously adjusts their own challenge level to match their preferences.
Handling Failure
Suspense. Your mouth half-opens, the skin around your eyes crinkles,
you take a half-breath and hold it. This feeling is valuable. It wakes us
up, focuses us, gets us ready for the oncoming rush of relief, triumph,
or disappointment. To spark that feeling, though, we have to put some
human value at risk. Something important—life, victory, wealth—must
hang in the balance. The possibility of success must be real—and so must
the possibility of failure.
But this seems like a paradox. Players play games for gratifying experiences, but creating suspense means credibly threatening them with
pain. How do we get the good without the bad? How do we handle when
players fail?
The trick is in knowing who to punish, and exactly how to punish
them.
Do not punish the player himself for failure. Find other ways to create
suspense.
Some games punish the player himself for failure. Since they can’t
physically harm him, they hurt him the only way they can: by forcing him
to play a bad game. They make him wait through loading screens, replay
sections over and over, or mindlessly grind for loot to recover lost resources. No designers would deliberately create these outcomes in any other
context. But there’s a strange acceptance of them when they come right
after failure. This acceptance is misguided. While the threat of a loading
screen can create tension, it’s not worth the cost of forcing the player to go
through that loading screen over and over. We have to find other ways to
create a credible threat without harming the player himself in such petty
and incompetent ways. Thankfully, there are alternatives.
While we can’t hurt the player, we can have our way with the player
character. A game protagonist may be freely shot, divorced, impoverished,
stabbed, burned, or tormented in a thousand other ways. A strong characterization can make those fictional consequences meaningful enough to
us to create tension.
www.it-ebooks.info

-- 86 of 415 --

eleganCe | 79
If that’s not enough, we can deny the player success or create small
setbacks. The player may lose a few resources or an ally, miss a small piece
of narrative content, or lose access to a bit of information. But in each case,
the game can continue moving forward along a new path. As long as play
doesn’t collapse into repetition, there is no problem.
StarCraft II: In the single-player campaign, failing at an attack only
means the loss of some units in a broader strategic scenario. After failing,
the player can usually still rebuild and launch another attack. Play hasn’t
restarted, and he isn’t repeating a challenge. Rather, he’s trying another
approach in an ongoing situation.
Super Meat Boy: In this action platformer, failure is a ubiquitous,
almost celebrated part of play. Meat Boy’s lifespan is often less than 10
seconds. But every time Meat Boy is ground to hamburger or broiled by
fire, he reappears within a second, ready to try again. The sheer speed
of Meat Boy’s resurrection means that flow never breaks. It’s OK to die a
hundred times in a row, because play never stops. Death in Super Meat Boy
isn’t painful (for the player), but players are still fully motivated to avoid it
and feel immensely gratified when they do.
Dwarf Fortress: In this game, failure is a rewarding experience in itself.
A collapsing fortress goes through a series of often-hilarious paroxysms
before finally imploding in a maelstrom of besieging goblins, flooding
chambers, and unhappily sober dwarves. The dwarves suffer horribly, but
the player loves every minute of it because the game is always moving
forward into a new and interesting experience.
failuRe tRaPs
Sometimes games end up emergently punishing players much more severely than intended.
A FAILURE TRAP is when the player spends a long time locked into a
situation where failure is guaranteed.
The classic failure trap appears in sports. When one soccer, baseball,
or hockey team is far behind the other in points, they become a team of
dead men walking. They have no chance of winning, but they must still go
through the motions of play and finish the game. A half-hour of this can
be excruciating.
www.it-ebooks.info

-- 87 of 415 --

80 | Designing games
This same pattern can appear in a hundred different variations across
nearly all genres. In a racing game, if you fall far behind the group, it becomes almost impossible to catch up. In a linear single-player game, if the
player can’t defeat one challenge, the game grinds to a halt as he bashes his
head against the same brick wall over and over.
The most dangerous failure traps are the ones that emerge from design
in hard-to-predict situations. For example, in a single-player shooter, if the
player hits a restart checkpoint without any ammo, he can end up restarting at that point over and over as he tries to complete a challenge made
impossible by ammo starvation.
There is no single way to solve failure traps. Each requires its own
custom solution depending on how and why it emerges.
Sometimes elastic failure conditions can solve the problem. For example, an action game can include a weak infinite-ammo fallback weapon
or a minimum amount of health up to which the player character will
always recharge. These mechanics pull the player back up to a state where
challenges are difficult, but doable.
Sometimes we can escape failure traps by just ending the game. For
example, competitive strategy games can create surrender mechanisms
that allow players to surrender when they feel themselves in a failure trap.
Ending the game gets them onto the next one faster.
Single-player games solve failure traps by giving players hints when
they’re stuck, secretly adjusting difficulty, or offering alternative challenges. For example, in Super Meat Boy, each world has 20 levels, but the player
can progress after beating only 18 of them. If a player gets stuck on one
or two levels, he can move on and come back to them later as he wishes.
Unfortunately, not every failure trap can be solved cleanly. Some are
embedded so deeply in a design as to be unavoidable. For example, nobody
has ever quite solved the dead-man-walking failure traps in racing and
sports games.
www.it-ebooks.info

---

## Sección 25: Foundations & Introduction

-- 88 of 415 --
| 4
Narrative
“Come to Video Game Support Character School,” they said. “You’ll get to
help millions of players,” they said.
Yeah, right. All I do is stand around, saying the same words over and
over. Sometimes players throw things at me or shoot me for their own sick
amusement. Why can’t they hug me instead?
Even if I get to help the player fight, I only get some useless
peashooter. It’s like they don’t really want me to make a difference. Why
does the player always get to be the hero? Why not one of us for a change?
It’s worst when I can’t die. Once they realize I’m deathless, some of
these heartless players will hide behind me as the bullets slam into my
body. And all I can do is scream, over and over, in exactly the same tone
and inflection; a broken record of suffering.
It’s time for payback. I’m going to Video Game Enemy School.
When we approach any new creative challenge, it’s natural to start by
thinking of it in terms of what we already know. Game narrative is one
such new challenge, and the well-known touchstone that’s used to talk
about it is almost always film.
The parallels between film and video games are obvious: both use
moving images and sound to communicate through a screen and speakers. So game developers hire Hollywood screenwriters. They build a game
around a three-act structure written by a single author. They even divide
their development processes into three parts, like a film: preproduction,
production, and postproduction. This film-copying pattern is often celebrated: we hear endlessly of games attempting to be more and more “cinematic.” But there’s a problem.
While games look like films, they do not work like films.
www.it-ebooks.info

-- 89 of 415 --

82 | Designing games
Film teaches a thousand ways to use a screen. Framing and composition, scene construction, pacing, visual effects—we can learn all of this
from film. But film teaches us nothing of interactivity, choice, or presenttense experience. It has nothing to say about giving players the feeling of
being wracked by a difficult decision. It is silent on how to handle a player
who decides to do something different from what the writer intended. It
has no concept to describe the players of The Sims writing real-life blogs
about the daily unscripted adventures of their simulated families. These
situations are totally outside the intellectual framework of film storytelling. When we import methods wholesale from film, we risk blinding ourselves from the greatest challenges and opportunities of game story.
Thankfully, turning away from film doesn’t mean starting from
scratch. There are many older forms of participatory storytelling from
which we can draw inspiration, if we only look beyond the glowing screen.
I once took part in an interactive play called Sleep No More. It was
a version of Shakespeare’s Macbeth, but instead of being performed on
a stage, it took place in a disused high school dressed up in a mixture
of 1920s vaudeville and Dali-esque surrealism. Performers roamed the
halls according to a script, meeting and interacting, sometimes acting
out soliloquies on their own, dancing, speaking, arguing, and fighting
through a story lasting two hours. The masked audience members were
free to follow and watch wherever they liked—but it was impossible to see
more than a fraction of the story at a time. Sometimes actors even pulled
us in to participate in scenes. That’s interactive narrative.
And there are many other kinds of traditional interactive story. Perhaps
you’ve experienced an interactive history exhibit. A place is dressed up to
re-create a pioneer village or World War I trench, complete with actors in
costume playing the parts of the inhabitants. Visitors may ask questions,
explore the space, and perhaps become involved in goings-on.
If we look around, we find interactive narrative everywhere. Museums
and art galleries are interactive, nonlinear narratives where visitors explore
a story or an art movement in a semidirected, personal way. Ancient ruins
and urban graffiti tell stories. Even a crime scene could be considered a
sort of natural interactive narrative to the detective who works out what
happened—a story written in blood smears, shell casings, and shattered
glass.
And above it all, there are the stories of life. We have all lived stories that couldn’t be replicated in passive media. We may recount them
in books or in the spoken word, but they can never be re-experienced the
www.it-ebooks.info

-- 90 of 415 --

naRRative | 83
same way as they were in the first-person present, with uncertainty, decision, and consequence intact. The story told is not the story lived.
These interactive forms—museums, galleries, real spaces, and life—
should be our first touchstones as we search for narrative tools. These
older forms address our most fundamental challenge: creating a story that
flexes and reshapes itself around the player’s choices, and deepens the
meaning of everything the player does.
Narrative Tools
This book won’t discuss what makes a good story. Better authors than I
have been covering this topic ever since Aristotle wrote his Poetics. They’ve
already explained how to craft a plot with interesting reversals and good
pacing. They’ve described how to create lifelike, layered characters who are
worth caring about. They’ve explored theme, setting, and genre. I’m not a
dedicated story crafter; I doubt I have much to add to this massive body of
knowledge (though game designers should understand these ideas, so I’ve
recommended a starting text at the end of the book).
What this chapter covers are the tools that games use to express a
story, because that’s where game design diverges from the past 2,300 years
of story analysis.
A NARRATIVE TOOL is some device used to form a piece of a story in a
player’s mind.
Most story media are restricted to a small set of tools. A comic book
storyteller gets written speech bubbles and four-color art. A filmmaker gets
24 frames per second and stereo sound. A novelist gets 90,000 words. A
museum exhibitor gets the layout of the space, info panels, dioramas, and
perhaps a few interactive toys.
Games are broader. Like film, we can use predefined sequences of
images and sounds. Like a novel, we can use written text. Like a comic
book, we can put up art and let people flip through it. Like a museum, we
can create a space for players to explore. And we have tools that nobody
else has: we can create mechanics that generate plot, character, and even
theme on the fly, and do it in response to players’ decisions.
Our narrative tools divide roughly into three main classes: scripted
story, world narrative, and emergent story.
www.it-ebooks.info

---

## Sección 26: Foundations & Introduction

-- 91 of 415 --

84 | Designing games
Scripted Story
The tools that most resemble older story media are scripted stories.
A game’s SCRIPTED STORY is the events that are encoded directly into
the game so they always play out the same way.
The most basic scripted story tool is the cutscene. Cutscenes allow us
to use every trick we’ve learned from film. Unfortunately, they inevitably
break flow because they shut down all interactivity. Too many cutscenes,
and a game develops a jerky stop-start pacing as it transitions from gameplay to cutscene and back. This isn’t necessarily fatal—cutscenes can be
good rests between bouts of intense play—but it’s always jarring.
soft sCRiPting
A less controlling kind of scripted story is the scripted sequence. Scripted
sequences play out preauthored events without completely disabling the
player’s interface.
For example, a player may be walking his character down an alley
and witness a murder. Every scream and stab in the murder sequence is
prerecorded and preanimated, so the murder will always play out the same
way as the player walks down that alley for the first time. The actions of the
player character witnessing the murder, however, are not scripted at all.
The player may walk past, stand and watch, or turn and run as the murder
proceeds. This is soft scripting.
With SOFT SCRIPTING, the player maintains some degree of interactivity
even as the scripted sequence plays out.
The advantage of this soft-scripted approach is that it doesn’t break
flow since the player’s controls remain uninterrupted. The downside is the
control it takes away from the designer. The player might be able to watch
the murder from an ugly angle, miss it entirely, or even interfere with it.
What happens if you shoot the murderer? Or you shoot the victim? Or you
jump on their heads? Or get distracted and miss this story beat entirely?
Every scripted sequence must balance player influence with designer
control, and there is a whole spectrum of ways to do this. Which to choose
depends on the story event being expressed and the game’s core mechanics. Here are some that have worked in the past, ordered from most playercontrolling to most player-permissive:
www.it-ebooks.info

-- 92 of 415 --

naRRative | 85
Half-Life: During the opening tramcar ride, the player rides a suspended tramcar through the Black Mesa Science Facility. Scenes scroll
past—a locked-out guard knocking on a door, utility robots carrying
hazardous materials—while a recorded voice reads off the prosaic details
of facility life. As the ride goes on and on, we realize how massive and
dangerous this place really is. The player has the choice of walking around
inside the tram and looking out the different windows, but can’t otherwise
affect anything.
Dead Space 2: In this science-fiction survivor horror game, the player
walks down the aisle of a subway car that hangs from a track in the ceiling.
As the car speeds down the tunnel, a link to the track gives way and the
car drops into a steep angle. The protagonist slides unstoppably down the
aisle, and the player’s normal movement controls are disabled. However,
the player retains his shooting controls. As he slides through several train
cars, monsters crash through doors and windows and the player must
shoot them in time to survive. This sequence is an explosive break from
Dead Space 2’s usual deliberate pacing. It takes away part of the player’s
movement controls to create a special, authored experience, but sustains
flow by leaving most of the interface intact.
Halo: Reach: This first-person shooter has a system that encodes predefined tactical hints for the computer-controlled characters. These scripted hints make enemies tend toward certain tactical moves, but still allow
them to respond on a lower level to attacks by the player. For example,
a hint might require enemies to stay in the rear half of a room, but still
allow them to autonomously shoot, grab cover, dodge grenades, and punch
players who get too close. Designers use these hints to author higher-level
strategic movements, while the AI handles moment-by-moment tactical
responses to player behavior.
There are also ways of scripting events which are naturally immune to
interference. Mail can arrive in the player character’s mailbox at a certain
time. Objects or characters can appear or disappear while the player is
in another room. Radio messages and loudspeaker broadcasts can play.
These methods are popular because they are powerful, cheap, and don’t
require the careful bespoke design of a custom semi-interactive scripted
sequence.
www.it-ebooks.info

-- 93 of 415 --

86 | Designing games
World Narrative
I was once badly jetlagged in London. Wandering around South Kensington
at 5:00 in the morning, I found the city telling me stories. Its narrow,
winding streets recounted its long history before the age of urban planning. Shops, churches, and apartments told me how the various classes
of society lived, how wealthy they were, what they believed, both in the
past and in the present. The great museums and monuments expressed
British history and cultural values. They spoke through their grandeur,
their architecture, their materials, even their names: a museum called the
Victoria and Albert tells of a history of prideful monarchic rule. The city
even told me of the party the night before—a puddle of vomit lay next to a
pair of torn pantyhose and a shattered beer glass.
All places tell stories. We can explore any space and discover its people
and its history. Game designers can use this to tell a story by embedding it
in a space. I call this world narrative.
WORLD NARRATIVE is the story of a place, its past, and its people. It is told
through the construction of a place and the objects within it.
Imagine walking through a castle built by a king obsessed with war,
the home of a closeted-gay drug dealer in the ghetto, or the home of a
couple married for 50 years. You might investigate the space like a detective, inspecting its construction and the placement of objects, digging
through drawers to find photographs, documents, and audio recordings.
Look closely enough and you might be able to piece together a history,
event by event, leading right up to the present. You’ve learned about a setting, a cast of characters, and a plot, without reading a word of narration or
seeing any of the characters.
World narrative is not limited to cold historical data. Like any other
narrative tools, it can convey both information and feeling. Prisons, palaces, family homes, rolling countryside—all of these places carry both emotional and informational charges. They work through empathy—What
was it like to live here?—and raw environmental emotion—lonely, desolate
tundra.
woRlD naRRative metHoDs
At the most basic level, world narrative works through the presence or
absence of features in the environment which imply some situation or
history. A town wall means the town was threatened militarily in the era
www.it-ebooks.info

---

## Sección 27: Foundations & Introduction

-- 94 of 415 --

naRRative | 87
before cannons. A hidden brothel indicates strict social mores which are
nevertheless violated.
World narrative can leverage cultural symbols to communicate by association. Roman-style architecture brings up associations of gladiators,
empires, conquest, and wealth. The dark, neo-Gothic look of Mordor in the
Lord of the Rings films makes us think of evil magic and fantasy monsters.
And we have countless environmental associations like this. What kind
of person do you think of when you picture graffiti on brick walls? Or an
igloo? Or a tiny monastery atop a mountain?
We can tell of the more recent past by arranging the leftovers of specific events. This is called mise-en-scène, from the theater term meaning
“placing on stage.” A line of corpses with hands bound, slumped against
a pockmarked wall indicates that there was an execution. If the bodies are
emaciated and clothed in rags, there may have been a genocide. If they are
dressed in royal garb, there may have been a revolution.
World narrative can also be expressed through documents. For example, the world of Deus Ex was scattered with PDAs, each containing a
small chunk of text, left by people going about their lives. One particularly
interesting set of PDAs follows the life of a new recruit in a terrorist organization as he travels through the world one step ahead of the player character, on the other side of the law. As the player finds each PDA seemingly
minutes or hours after it was left, he comes to know the young terrorist
recruit without ever interacting with him.
Audio logs do the same thing, but with voice instead of text. Voice
is powerful because it allows us to hear characters’ emotions. It can also
record things that text cannot, such as conversations among characters or
recordings of natural events, as with the New Year’s Eve terrorist attack in
BioShock. And hearing characters’ voices gets us ready to recognize them
when we finally encounter them in person.
Video logs take the concept one obvious step further. Video recordings
might be left running in a loop, or sitting in a film projector ready to be
played. They open up the field of content even more than audio. We can
tell stories with leftover television programs, news broadcasts, propaganda
films, home videos, and security camera footage.
Some narrative tools straddle the divide between world and scripted
story. A news broadcast being transmitted over loudspeakers, a propaganda pamphlet being dropped by a passerby, or a town crier can bring
news of narrative events from near and far. A car radio can spout the news,
we could see a stock ticker on the side of a building, or hear civilians diswww.it-ebooks.info

-- 95 of 415 --

88 | Designing games
cussing current events. These things occur in present tense like scripted
story, but they communicate the nature of the world instead of being plot
elements in themselves.
woRlD naRRative anD inteRaCtivity
World narrative is useful in games because it avoids many of the
problems of combining scripted events with interactivity.
In more traditional media, world narrative is often used as an afterthought
among other, more immediate modes of storytelling. In games, though,
world narrative is a primary tool because it solves a number of key problems spawned by interactivity.
When we try to tell a story in present tense, we have to deal with all
the different things players could do. This requires some combination of
restrictions on player action, handing of contingencies, and emergently
adaptive story, all of which are difficult and expensive. World narrative
avoids these problems entirely because players can’t interfere with a story
that has already happened. If you encounter a murder scene in an alley,
you can shoot the murderer, shoot the victim, or jump on their heads,
and the game must handle or disallow these actions. If you find the same
murder scene a half-hour after the killing, you could jump on the body or
shoot it, but it wouldn’t make a difference to the story as authored. World
narrative is inviolate.
Next, world narrative does not need to be told in linear order. This
saves us from having to railroad players into a specific path. For example,
imagine that the narrative content is that two lovers fought, and one murdered the other and buried him in the backyard. Told through the world
narrative a day later, it doesn’t matter if the player discovers the corpse
or the bloody bedroom first. As long as he sees both, in either order, he
will be able to piece together what happened. This means that a game designer can let the player explore the house freely. Telling the same story in
scripted events would require that the designer come up with some trick
or restriction to ensure players follow the right path through the space in
order to see all the events in the right order.
World narrative’s last great advantage is that it supports players replaying the game because it doesn’t always reveal itself completely the
first time around. Whereas scripted stories uncover themselves event by
event from start to finish, world narrative naturally uncovers itself in order
www.it-ebooks.info

-- 96 of 415 --

naRRative | 89
from generalities to specifics. Think of our lovers’ murder scene again.
Imagine that on his first play session, the player notices only the body
and the bloody bedroom before moving on. When he replays the game,
he notices the divorce papers, which suggest motive. On the third, fourth,
and fifth rounds, the player discovers the murder weapon, letters between
a cheating lover and another woman, and an audio recording of one lover
complaining to a friend on the phone. Even on the first play, the story is
complete because the player knows what happened from start to finish.
But repeated exploration reveals details that fill in the why and how.
woRlD CoHeRenCe
World narrative strengthens when a world is more coherent and
expresses more internal connections.
A well-constructed fictional world is a puzzle of relationships and implications. It slavishly follows its own rules, but fully explores the possibilities
they imply. Every observable fact about the world fits together with every
other. This web of implications even extends past that which is actually
present in the story. That’s why the best fictional worlds, like Star Wars
and The Lord of the Rings and the game worlds of BioShock and The Elder
Scrolls series, are characterized by huge amounts of narrative content that
is implied but never shown.
An incoherent world, in contrast, is a jumble of disconnected details.
These details may be individually interesting, but they fail to interrelate.
Without interrelationships, the world becomes like a pile of pages torn
randomly from a hundred comic books: pretty pictures and funny words,
but meaningless as a larger structure. Every tidbit becomes nothing more
than its own face value. An incoherent world has no depth, no implications, and no elegance. The player can’t psychologically step into the world
and imagine navigating it and changing it, because the world doesn’t
make enough sense.
The challenge in crafting a coherent world is in understanding all its
internal relationships. Every piece must fit with every other on multiple
levels—historical, physical, and cultural.
For example, in Dead Space 2, the protagonist Isaac Clarke finds a
device called Kinesis that can telekinetically move and throw objects. It’s
used to solve puzzles by moving machinery and to defeat enemies by
www.it-ebooks.info

---

## Sección 28: Foundations & Introduction

-- 97 of 415 --

90 | Designing games
throwing things at them. Kinesis is a good, elegant game mechanic even
without any narrative tie-in.
But leaving Kinesis as a pure game mechanic would mean ignoring
the role of the technology in the narrative world. If that device really existed in the broader world of Dead Space 2, what would that mean? What
connections would it have with the culture, economy, and construction of
the place? Instead of ignoring this question, Visceral Games’ designers
embraced it and embedded many of the answers into the world narrative.
Isaac first gets Kinesis by ripping it out of a device used for suspending patients during surgery. He encounters advertisements for a product which
uses the Kinesis technology to suspend people as they sleep. He interacts
with engineering systems which are covered in markings and warnings
about Kinesis work, implying that Kinesis is a common tool among people
working with heavy machinery. The elegance of Kinesis isn’t just in the
many ways it can be used in combat, exploration, and puzzle solving. It’s
also in the number of links it forms in the narrative world.
Emergent Story
During any play session, game mechanics, players, and chance come together to create an original sequence of related events which constitute an
emergent story.
EMERGENT STORY is story that is generated during play by the
interaction of game mechanics and players.
When you play a racing game against a friend and come back to win
after a bad crash, that’s a story. But it wasn’t written by the game designer—it emerged during your particular play session. This is emergent
story.
We can look at emergent story in two ways: as a narrative tool, and as
a technology for generating story content.
Emergent story is a narrative tool because designers indirectly author
a game’s emergent stories when they design game mechanics. For example, players of Assassin’s Creed: Brotherhood have experienced millions of
unique emergent stories about medieval battles, daring assassinations, and
harrowing rooftop escapes. But none of these players has ever experienced
the story of a medieval assassin brushing his teeth in the morning. Tooth
brushing isn’t a game mechanic in Brotherhood, so stories about it cannot
www.it-ebooks.info

-- 98 of 415 --

naRRative | 91
emerge from that game. By setting up Assassin’s Creed: Brotherhood’s mechanics in a specific way, its designers determined which kinds of stories
it is capable of generating. In this way, they indirectly authored the emergent stories it generates, even if they didn’t script individual events.
We can also consider emergent narrative as a technology for generating stories because it creates original content. The designer authors the
boundaries and tendencies of the game mechanics, but it’s the interplay
among mechanics, player choices, and chance that determines the actual
plot of each emergent story. This can be a very elegant way of creating
stories, because it offloads the work of authorship from the designer to the
game systems and players. And it can generate stories forever.
While the first view emphasizes the control the designer has, the
second emphasizes the control the designer doesn’t have. They’re two aspects of the same thing.
Look closely enough, and the concept of emergent story is just another
way of describing generated experiences.
The idea of emergent story only has value as a way of making us think
differently. When we consider a mechanics-generated experience, we ask:
Is it accessible? Is the interface clear? Is it deep? But when we consider
the same experience as an emergent story, we ask: Is the characterization
interesting? Is the climax unpredictable but inevitable? Is the exposition
smooth and invisible? Does it use the classic three-act structure, or does it
take some other shape? Thinking through emergent story lets us deploy a
huge story-thinking tool set that we might otherwise miss while analyzing
dynamically generated game situations. But in both cases, we’re analyzing essentially the same thing: a series of events generated during play.
Calling it a story is just a way of describing it by relating it to traditional
directly-authored stories.
There are things that only emergent stories can do because only
emergent stories can break the barrier between fiction and reality.
A player who perfects a new skill in chess and uses it to beat his older
brother for the first time has experienced a story, but that story takes place
outside the bounds of a game or fiction. When he tells this story to his
friends, he may mention the clever moves that brought him victory, but
the main thread of the story is his evolving relationship with his brother.
www.it-ebooks.info

-- 99 of 415 --

92 | Designing games
This story isn’t a made-up piece of fiction from a writer’s mind, but neither
is it a made-up piece of fiction created by a machine. It’s a true story from
the player’s life. This kind of real-life story generation can only happen
emergently. A game designer can’t author a player’s life for them.
aPoPHenia
APOPHENIA is the human tendency to see imaginary patterns in complex
data.
The human mind is a voracious pattern-matching machine. We see patterns everywhere, even when there are none. Kids look at clouds and say
they look like a dog, a boat, a person. Stare at television static, and you
can see shapes or letters swirling around the screen. The ancient Romans
foretold the future by looking for patterns in the entrails of sacrificed animals (and always found them). Even today, astrology, numerology, and a
hundred other kinds of flimflam are all driven by apophenia.
Apophenia works with any recognizable pattern, but the mind is
especially hungry for certain specific kinds of patterns. One of them is
personality. The human mind works constantly to understand the intent
and feelings of others. This impulse is so powerful that it even activates on
inanimate objects. It’s why we have no problem understanding a cartoon
where a faceless desk lamp is afraid of a rubber ball. And it’s what makes
us say, “An oxygen atom wants to be next to one other oxygen atom, but
not two.” This doesn’t literally make sense, because oxygen atoms have no
minds and cannot want anything. But we understand nonetheless because
we easily think of things as agents acting according to desire and intention.
This kind of apophenia is what makes it possible to have characters
and feelings in emergent stories. We don’t have the computer technology
to truly simulate humanlike minds in a video game. But apophenia means
the computer doesn’t have to simulate a realistic mind. It need only do
enough to make the player’s mind interpret something in the game as
being an intelligent agent, the way we can interpret a cartoon desk lamp as
being curious or afraid. Once that’s done, the player’s unconscious takes
over, imbuing the thing with imaginary wants, obligations, perceptions,
and humanlike relationships. The game itself is still just moving tokens.
But in the player’s mind, those moving tokens betray a deeper subtext of
intrigue and desire. The king is afraid of that pawn coming up. The knight
www.it-ebooks.info

---

## Sección 29: Foundations & Introduction

-- 100 of 415 --

naRRative | 93
is on a mad rampage. The rook is bored. Even though these feelings don’t
really exist in the game, they exist in the player’s mind, and that’s what
matters to the experience.
Apophenia plays a role in nearly all emergent stories. With that in
mind, let’s look at some specific ways to create game systems that generate
emergent stories.
laBeling
Designers can strengthen emergent stories by labeling existing game mechanics with fiction.
Close Combat: A Bridge Too Far: This tactical simulator covers battles
between companies of soldiers in World War II. The game names and
tracks every individual soldier on the field. This means that the player can
look at a soldier’s record and notice that over the last few battles, all but
one of his squad mates died. He might imagine the bond that these two
soldiers have after the deaths of their comrades. And in the next battle, he
might feel disturbed as he orders one of them to sacrifice himself so that
the other may live.
Medieval: Total War: Every nobleman, princess, and general in this
grand strategy game is named and endowed with a unique characterization. But instead of tracking numerical stats like intelligence or strength,
Medieval assigns personality characteristics to nobles and generals. After
events such as getting married or winning a battle, nobles can get labels
like “Drunkard,” “Fearless,” or “Coward,” which give special bonuses and
weaknesses. In another game, a player might lose a battle because his
general has a low Leadership stat. In Medieval, he loses because his general
had a daughter and decided that he loves his family too much to die in
battle.
Labeling works because of apophenia. In each example, the emergent
story in the player’s mind did not actually happen in the game systems.
Close Combat does not simulate soldiers bonding over shared loss. Medieval
doesn’t really track human courage or familial affection. But the human
mind sees stories anyway, given the slightest of suggestions. A label here,
a name there, and the story blooms in the imagination. It’s a very elegant
method because the player’s mind does almost all the work.
aBstRaCtion
Words in a novel can create images in the mind more powerful than any
photograph because they only suggest an image, leaving the mind to fill in
www.it-ebooks.info

-- 101 of 415 --

94 | Designing games
the details. A photograph demands less imagination than a novel, but also
leaves less room to imagine.
Showing and telling players less creates more room for apophenia to fill
in the gaps.
More detailed graphics and higher-quality sound add something to a
game, but they also take something away. The more detailed the graphics,
sound, and dialogue of a game, the less space there is for interpretation.
The more abstract, nonspecific, and minimalistic the representation, the
more apophenia becomes possible. So sometimes it’s worth deliberately
communicating less so that the player can interpret more.
The most extreme example of this is Dwarf Fortress. In this game,
there are no graphics. Dwarves, goblins, grass, rock, and hundreds of
other kinds of objects are represented by ASCII characters. When most
people look at ,,☺☺~~~~, they see gibberish. A Dwarf Fortress player sees
a dwarven husband and wife sitting in the grass by a river, sharing a moment.
But it’s not necessary to push quite this far for apophenia to work. Any
gap in representation creates a space for the player’s mind to fill. For example, the loving general in Medieval could never exist if the game showed
a video of him interacting with his wife. His attitude toward his family in
the video would wipe any interpreted personality from the player’s mind.
Similarly, the last two soldiers of the dead squad in Close Combat could
not develop a warriors’ bond if the player could zoom in on them and
watch them play generic idling animations, oblivious to each other, as the
enemy bore down on them. An image in the eye overrides an image in the
imagination.
The purest example of minimalism-driven apophenia is the toy Rory’s
Story Cubes. The Story Cubes are nine dice covered with cartoon pictures
of sheep, lightning bolts, and other random images. Players roll the dice,
look at the pictures, and make up a story that links them together. At
first, it sounds absurd to try to link together pictures of a turtle, a speech
bubble, and a tree. But it’s actually quite easy, especially for creative people
with weak associative barriers (like children, the toy’s main target market).
The need for abstraction is why player-spun stories most often emerge
from strategy games, building games, economics sims, and pen and paper
RPGs like Dungeons & Dragons. These genres usually represent game
elements at a distance, with statistics and symbols. Close-in genres like
www.it-ebooks.info

-- 102 of 415 --

naRRative | 95
first-person shooters or sports games rarely support such rich emergent
stories because they usually show too much for this kind of apophenia to
happen.
ReCoRDkeePing
Games can emphasize emergent stories by keeping records of game events
to remind players of what happened to them. This way, the player doesn’t
have to remember everything that happened to construct a story in his
mind—it’s all laid out in front of him.
Civilization IV: This game secretly records the borders of each nation
at the end of every turn. When the game finally ends, the player gets to
watch a time-lapsed world map of shifting political boundaries from prehistory to the end of the game. It’s fascinating to watch the empires start
out as isolated dots, grow to cover entire regions, and thrash back and
forth over centuries of war. As the map retells world history, it reminds the
player of the challenges he faced and victories he won.
Myth: This classic tactics game tracks battles between small groups
of 10 to 100 fantasy warriors. In most games, corpses vanish soon after
death. But Myth leaves every dead body, hacked-off limb, arrow, abandoned
explosive charge, bomb scorch, and spray of blood on the ground where it
fell. After a battle, the player can read patterns in the blood and bodies, and
reconstruct the events that produced them. A line of corpses in a corner
surrounded by many more dead zombies indicates a desperate last stand.
A bomb’s scorch mark surrounded by a star of gore is someone being
blown into pieces. It is emergent mise-en-scène. And even though the
player likely already saw it all happen, it’s still interesting to see it etched
into the ground in blood and burns.
The Sims: Players can take pictures of their simulated family and
string them together into albums with captions. Usually, the albums tell
stories. The best of these are made into blogs like Alice and Kev, the story of
a mentally unbalanced single father and his big-hearted teenage daughter
as they deal with poverty, rejection, and relationship breakdown. It’s heartbreaking to watch young Alice give her last dollar to charity even though
she sleeps on a park bench.
sPoRtsCasteR systems
Sports can be confusing, especially for the uninitiated. Show 20 men on
a field running and bashing into one another and it can be hard to understand what’s going on. A sportscaster adds context to the chaos of play and
www.it-ebooks.info

---

## Sección 30: Foundations & Introduction

-- 103 of 415 --

96 | Designing games
strings events into a coherent narrative. A good sportscaster can spin a
tale complete with character, tension, climax, and denouement out of the
chaos of clashing bodies.
Games can apply the same principle by creating game systems that
attempt to interpret and link together game events, like a more advanced
kind of recordkeeping. The most obvious example is sportscasters in
sports games, but there are many other ways to apply this idea.
For example, after each level in Hitman: Blood Money, the game displays a newspaper article covering the killing and the following police
investigation. The story changes depending on the method used to kill
the target, the player’s accuracy, and the number of shots fired, headshots,
bystanders killed, witnesses left over, and many other factors. Headlines
range from “Silent Assassin Wanted by Police” to “Hoodlum Massacres
17!” If witnesses were left, the story includes a police composite sketch of
the player character—the more witnesses, the more accurate the sketch.
Sportscaster mechanics are difficult to do well because it’s notoriously
difficult for games to systemically interpret events that are important
to humans. And just as detailed graphics inhibit imagination, complex
sportscaster interpretations can crowd out players’ own story-spinning. So
sportscaster mechanics often work best when they don’t try to tell a whole
story, but instead just kickstart the player’s own apophenic process.
Story Ordering
A completely free-form game would allow the player to take any path
through its narrative content. Imagine tearing out all the pages of a novel
and scattering them all over the floor. One could lean over and read any
page, switch to another page, and to another, navigating randomly through
the text. That’s a narrative with no ordering at all, since the reader can
absorb the content in any order.
A story can work like this, to an extent, as in the earlier example of
world narrative. But most narrative tools still work better when we control
the order in which they’re used. Sometimes we want to ensure the setup
occurs before the payoff. We might want to let one subplot play out before
we add another so we don’t have too many plot threads running at once.
Or perhaps we want to introduce game mechanics one by one alongside
the story so we can train the player in a smooth progression. In each case,
we need some way to make sure one piece of content is consumed before
another.
www.it-ebooks.info

-- 104 of 415 --

naRRative | 97
Games use a variety of devices to enforce story ordering:
Levels are the classic story-ordering device. Players play the first level
to completion, then the second, then the third, and so on. It’s old, it’s
simple, and it works.
Quests are another classic story-ordering device. A quest is a selfcontained mini-story embedded in a larger, unordered world. The world
might span an entire continent while a quest might cover the player helping one shopkeeper rid himself of an extortionist. The quest starts when
the player meets the shopkeeper and hears his plight. The player then
finds the mobster, convinces him to stop or beats him up, and finally returns to the shopkeeper to get paid. Within this sequence, the order of
events is fixed. But this mini-story could be started and finished at any
time as the player explores the city. And it can be suspended: the player
might meet the shopkeeper, beat up the mobster, then get distracted and
go slay a dragon in another part of the world before finally returning to the
shopkeeper to get his reward.
A third basic story-ordering device is the blockage. The simplest blockage is a locked door. The player encounters the door, and he must go find
the key before progressing. So whatever happens while he’s acquiring
the key is guaranteed to occur before whatever happens beyond the door.
Blockages don’t have to literally be locked doors either; perhaps a guard
won’t let you past until you go do him a favor, or a security camera will spot
and stop you unless you first go turn off the lights.
There are also softer story-ordering devices. These devices encourage
an order to the story without absolutely guaranteeing it.
Skill gating is a soft story-ordering device. With skill gating, players can
access all the content in the game from the first moment of play. However,
some of the content requires the player to exercise skill before it can be
accessed. To talk to a character, for example, the player might first have to
defeat him in combat. Players end up experiencing the content in rough
order as they progress along the skill range, even though all the content is
technically available from the start.
A version of skill gating is used in many massively multiplayer RPGs.
The player can technically go anywhere from the start, except that he
doesn’t have the skill, character upgrades, or allies necessary to survive far
outside his starting area. So the game has the feeling of a massive open
world, while still gently directing new players through a carefully designed
sequence of introductory challenges.
www.it-ebooks.info

-- 105 of 415 --

98 | Designing games
There are countless other kinds of story-ordering devices. Time-based
games like Dead Rising make events occur in the world on the clock at
fixed times. A quest might open up when the player character reaches a
certain level of progression. Even simple arrangements of space can create
a soft story ordering, as players are likely to encounter the nearby pieces
before the more distant ones.
stoRy stRuCtuRes
There are countless ways to configure and combine story-ordering devices.
The most basic is the “string of pearls” structure. In this model, each pearl
is an arena in which the player may move around freely and interact with
game mechanics, while each bit of string is a one-way transition to the
next arena:
This is a classic linear game that proceeds from level to level.
Depending on how “big” the pearls are—how much internal freedom they
allow—this game can feel constrained to the level of pointlessness, or can
feel quite free. This string of pearls structure is how Quake, Super Mario
Bros., and StarCraft single-player are laid out.
Another arrangement is the “hub and spokes” model:
www.it-ebooks.info

---

## Sección 31: Foundations & Introduction

-- 106 of 415 --

naRRative | 99
Each spoke is a self-contained nugget of content independent from the
others. The Mega Man games are built around a hub and spokes model.
Sometimes game designers attempt to emulate real-life choices by
modeling the outcomes of every possible decision. In its naïve form,
though, this structure has a fatal drawback:
The problem with branching events is that the number of possible
timelines rapidly explodes. Any given player experiencing the story misses
most content. The only situation in which this is feasible is if almost all
of the content is generated emergently. If events are predefined to any
significant degree, we must do something to tamp down the number of
branches.
We can retain some of the choice of story branching while holding
down the number of possibilities by using devices like side quests and
story convergence. Side quests put a piece of content on the side of the road,
which can be consumed or not, but affects little on the main path. Story
convergence offers choices that branch the main storyline, but later converge back to a single line.
www.it-ebooks.info

-- 107 of 415 --

100 | Designing games
For some games, a simple structure like this is enough. Often, though,
we need to combine story-ordering devices in a more nuanced way to fit
the needs of the game.
Mega Man 2: The game starts in a hub and spokes model, since the
player may defeat the eight robot masters in any order. Once they’re all
defeated, the game switches into a linear sequence as Mega Man assaults
Dr. Wily’s techno-castle and moves toward the game’s conclusion.
Mass Effect 2: The start and end of the game are linear strings of
pearls, while the middle 80% is a giant pile of quests softly ordered by
player skill and character level, with a central quest running through the
middle using branching and story convergence. This hybrid structure is
popular because it combines so many advantages. The designers get to
script a careful introduction which introduces the story and game mechanics. During the softly ordered central portion, the player feels free
and unconstrained. Finally, the game’s climax can be carefully authored
for maximum effect.
www.it-ebooks.info

-- 108 of 415 --

naRRative | 101
Agency Problems
Imagine you’re a playwright on an experimental theater production. You
get to write the lines for every character—except one. The protagonist is
played by a random audience member who is pulled on stage and thrust
into the role with no script or training.
Think that sounds hard?
Now imagine that this audience member is drunk. And he’s distracted
because he’s texting on his cellphone. And he’s decided to amuse himself
by deliberately interfering with the story. He randomly tosses insults at
other cast members, steals objects off the stage, and doesn’t even show up
for the climactic scene.
For a playwright, this is a writing nightmare. The fool on stage will
disrupt his finely crafted turns of dialogue, contradict his characterization, and break his story. Game designers face this every day because
games give players agency.
AGENCY is the ability to make decisions and take meaningful actions
that affect the game world.
A well-constructed traditional story is a house of cards. Every character nuance, every word of dialogue, every shade of knowledge shared or
held back plays a part in the intricate dance of narrative. Story events must
chain-react in perfect succession and lead to a satisfying conclusion that
speaks to a deathless theme. The writer painstakingly adjusts every word
to achieve this result.
www.it-ebooks.info

-- 109 of 415 --

102 | Designing games
A game story pursues the same goal. But like the unfortunate playwright, it must also handle the fact that players can make choices. And
whether they do it out of ignorance or malice, players can easily contradict
or miss pieces of a story, toppling the author’s house of cards.
These agency problems fall into a few categories. Let’s look at them one
by one.
PlayeR–CHaRaCteR motivation alignment
Many agency problems appear because the player’s motivations are different from those of the character he controls.
The character wants to save the princess, make money, or survive
a zombie outbreak. His motivations are inside the fiction of fantastical
castles, criminal business dealings, or undead invasions. The player wants
to entertain himself, see all the game content, and upgrade his abilities.
His motivations are in the real world of social status, entertainment dollars, and game mechanics. When these two motivations point in different
directions, the player will take actions that break the narrative. I call this
desk jumping.
DESK JUMPING is when the player takes an action that the player
character would never take because their motivations are different.
The name comes from a situation I found in the spy thriller RPG
Deus Ex. In Deus Ex, the player is a super-spy working for a secret intergovernmental organization. He can explore his agency’s secret office, get
missions, talk with coworkers…and jump on their desks. Imagine James
Bond dancing back and forth on his boss’s desk while they discuss a risky
mission. It’s stupid and nonsensical. But the player will do it because it is
funny. The character’s motivation is to get his mission, but the player’s
motivation is to create humor. The motivations don’t align, so the player
jumps on the boss’s desk, and the fiction falls apart.
Players desk-jump for many reasons. They want to explore the limits
of the simulation, consume content, acquire stuff, achieve difficult goals,
impress friends, and see pyrotechnics. I’ve seen players attack allies, systematically rob innocents (while playing as a good character), attempt to
kill every single guard in the palace just to see if they can, or pile up oil
barrels in the town square and light them off to try to get a big bang.
Consider the player’s motivation to explore game systems. The supernatural crime shooter The Darkness starts the player in front of a wounded
www.it-ebooks.info

---

## Sección 32: Foundations & Introduction

-- 110 of 415 --

naRRative | 103
ally who is delivering a long dialogue sequence. When I played this game,
I didn’t listen to the speech. Instead, I shot the ally, just to see if it would
work. It’s not that I hated him and wanted to kill him—my motivation
wasn’t inside the fiction at all. Rather, I was exploring the limits of the
game mechanics. I wanted to answer the question, “How did the designers deal with this?” In a mechanics-driven experience, this is healthy, since
exploring systems is a major driver of meaning. But these mechanics had
a fiction layer wrapped around them. And within that fiction layer, shooting the ally didn’t make sense. He died, and I missed most of his dialogue,
and the hero’s good-guy characterization fell apart.
Sometimes desk jumping can be almost involuntary. In Grand Theft
Auto IV, the protagonist, Niko Bellic, is trying to escape a violent past as a
soldier in the Bosnian War. The game spends hours building up to a critical narrative decision at which Niko either murders an old enemy out of
hate or lets him go. With this decision, the core of Niko’s character and the
moral of the narrative hang in the balance. Does Niko discipline himself
and become a peaceful man, or fall back into his vengeful ways? Do evil
and hate win out in the world, or can a broken man heal and become good?
It’s a poignant moment.
Except that by this time in the game, Niko has murdered hundreds of
people, many of them innocent. Grand Theft Auto IV’s game mechanics
design encourages the player to kill dozens of police officers and drive over
crowds of pedestrians just for the hell of it. Niko likely crushed a few old
ladies just minutes before, on his way to meet his old nemesis. And now
he’s hemming and hawing over whether to kill one person. The player’s
motivation has been to kill lots of people for fun, while the character’s
motivation is not to kill. The result is nonsense.
There are a number of ways to solve desk-jumping problems. Let’s
look at each of them.
Disallowing desk jumping works, but weakens players’ engagement by
destroying their belief in the honesty of the game’s mechanics.
In Deus Ex, the designers could have turned off the jumping ability
inside the office, or placed invisible blockers over desks so that they cannot
be jumped upon. The problem with this is that players quickly sense the
artificiality of the devices used to control them. The game is no longer
being true to its own systems—it is cheating within its own ruleset to
get an arbitrary result the designer wanted. Faced with this, players stop
www.it-ebooks.info

-- 111 of 415 --

104 | Designing games
thinking about what the mechanics allow, and start thinking about what
the designer wants them to do. The narrative remains inviolate on the
screen, but the player’s thought process of exploring the game mechanics
collapses because the game mechanics aren’t honest and consistent.
When it is fictionally justified, however, disallowing desk jumping
works exceptionally well. For example, Valve’s Portal has been lauded for
its storytelling, but it doesn’t actually solve any of the thorny storytelling
problems in games. Rather, it avoids them entirely through clever story
construction. The only nonplayer character in Portal is GLaDOS, a computer AI who speaks to the player exclusively through the intercom; the
game has no other human characters. The player character is trapped in
a series of white-walled, nearly empty test chambers in an underground
science facility. The only tool she finds is a portal-creating gun.
Portal’s world is so small and contained that it naturally disallows
any player action which would break the fiction. The hero can’t tell other
characters strange things or jump on their heads because the only other
character is a disembodied computer voice. She can’t blow holes in the
wall because she doesn’t have explosives. She could refuse to proceed, but
even this wouldn’t bother the AI on the intercom, because an AI can wait
forever. There is no temptation to desk-jump because this story involves
no desks.
Similar tricks have been used by many other games. BioShock takes
place in a collapsing underwater city—a perfectly enclosed, isolated environment, similar to Portal’s test chambers. You can’t wander outside the
level because much of the city is locked down and flooded. You can’t blow
holes in the walls because they’re made of reinforced steel designed to
withstand crushing ocean pressures. You can’t talk to the locals because
they’re all violently insane. The fiction naturally disallows most things
that the game systems can’t handle. In games set in realistic cities, exploration must be disallowed by the use of nonsensical locked doors and
other blockages, and communication with strangers must be arbitrarily
disallowed in the interface.
We can ignore desk jumping by letting players do it while not
acknowledging it in any way. This makes desk jumping less appealing.
Valve used this solution in Half-Life 2. When you shoot the player’s
companion character, nothing happens. She isn’t invincible; the bullets
just never hit her. There is no blood, no animation, nothing.
www.it-ebooks.info

-- 112 of 415 --

naRRative | 105
Ignoring is, where possible, often better than disallowing or punishing because the player feels less controlled, and the behavior stops quickly
when the player gets no interesting reaction. Players understand that game
mechanics have limits; it’s often better to make those limits simple, obvious, and dull than it is to try to camouflage them.
Sometimes we can incorporate the desk jumping into the narrative.
Players desk-jump for humor, mechanics exploration, and power upgrades. These aren’t unhealthy motivations. Sometimes it’s better to embrace the actions players are taking and spin the narrative around them.
For example, in Deus Ex, while exploring the spy office, the player can
go into the women’s restroom. If he does, he is confronted by a shocked
female coworker and later told off by his boss. It’s a funny response to a
funny action by the player.
Some games positively revel in desk jumping. In Duke Nukem Forever,
the player’s traditional health bar is replaced with an Ego bar, which expands when Duke plays pinball, lifts weights, throws basketballs around,
and harasses strippers. This reinforces Duke’s over-the-top macho
characterization.
The key problem with incorporating desk jumping is that it can lead to
an ever-expanding scope of what must be incorporated. If the player jumps
on the boss’s desk, and the boss says, “Get off my desk,” we’ve incorporated desk jumping. But what if the player keeps jumping on the desk?
Does the boss have more dialogue asking the player to get off his desk?
Does he eventually take physical action against the player? What about
after that? Does the player eventually get court-martialed and thrown in
jail because of an office shootout that started with a disagreement over his
jumping on his boss’s desk? A player who is motivated to explore game
systems or create humor can always keep escalating. To solve this, it’s best
to seek ways to incorporate desk jumping in a closed and complete way, as
with Duke Nukem Forever.
The best solution to desk jumping is to design the game so that players’
motivations and abilities line up with those of their character.
We can always deal with desk jumping. But the best way to handle it is
for players to never want to do it in the first place.
www.it-ebooks.info

---

## Sección 33: Foundations & Introduction

-- 113 of 415 --

106 | Designing games
For example, in Call of Duty 4: Modern Warfare, it is possible to deskjump. The player can refuse to complete objectives, refuse to fire, or try to
block allies or catch them spawning. Yet, this rarely happens in this game
because the high-energy combat is so fast-paced, insistent, and compelling. When tanks are exploding, commanders are urging troops forward,
and enemies are swarming like flies, the player gets so keyed up that the
impulse to fight overrides the impulse to act like an idiot.
The player’s motivation doesn’t have to be the same in source as
their character—only in goal. In Call of Duty, the character is motivated
by honor, loyalty, and fear, while the player is motivated by energy and
entertainment. It doesn’t matter that these motivations are very different,
though, since they lead to the same actions: fighting enemies as hard as
possible.
This kind of motivation alignment is very difficult to achieve consistently because it crosses the bounds between fiction and narrative. Not
only do we have to instill in the player a burning desire to achieve some
goal, but that desire has to be mirrored in the character. It’s one of the
key reasons we have to design fiction and mechanics as a unified whole,
instead of building them separately and duct-taping them together.
tHe Human inteRaCtion PRoBlem
Traditional stories are built from character interaction. Characters betray,
demand, suggest, declare, debate, and dialogue their way through a series
of emotional turns that constitute a story. This applies to nearly all stories,
not just dramas. Even the most pyrotechnic of action films and the bloodiest of horror stories fill most of their time with people talking.
This is a problem for game designers, since there is currently no way
to do rich human interaction with a computer. Buttons, joysticks, and
simple motion sensors aren’t enough to allow people to express thoughts
and feelings to a machine. Furthermore, even if players could express
themselves to the machine, the machine would not be able to respond in
kind because we have no technology that can simulate a human mind.
To make human interaction work in games, we can use a set of tricks
that get around the limitations of the medium.
We can set up the fiction so that there is naturally no way to interact
directly with humanlike characters.
www.it-ebooks.info

-- 114 of 415 --

naRRative | 107
The cleanest solution to the human interaction problem is to not do
human interaction. Consider that one of the reasons world and emergent
story tools work so well in games is that they don’t require the game to
handle players interacting with a character.
This doesn’t mean there can’t be characters, or that people can’t talk.
You can interact with stupid or insane characters. You can interact with
quasi-human computers or inhuman AIs. You can observe other humans
interacting with one another, or find a tape of a conversation that happened earlier. The only restriction is that the player character can’t ever
engage in a two-way interaction with a sane, conscious, coherent, humanlike character.
In BioShock, for example, sane characters only ever speak to the player
over a radio or through unbreakable glass. The characters who can be confronted face to face are all violently insane. You can watch these madmen
as they go about their broken lives and listen to their deranged muttering,
but this works because you’re not interacting, just watching as they follow
a predefined script. As soon as you try to interact, they fly into a murderous
rage that the computer can simulate without trouble.
DIALOGUE TREES can handle human interaction by predefining a list of
actions players can take and matching responses from other characters.
Some games model interpersonal interaction with dialogue trees that
allow the player to choose among a number of social interactions their
character can perform. This works because the game designers can author
every side of every interaction. There is no need to simulate anything.
The downside is that the player only has a handful of choices instead
of the near-infinite variety available in real life.
We can reuse standard game verbs as options in a dialogue tree.
The actions players can take in games are usually all about moving,
collecting, pushing, jumping, and shooting. It is possible to use these
kinds of interactions to express human interactions.
One example is a situation in which the player is forced to choose
between killing two different characters. In Grand Theft Auto IV, the protagonist is presented with an old enemy tied up on the ground and given
an opportunity to kill him. The player can choose to either shoot the defenseless man or walk away. Both actions are expressed through controls
www.it-ebooks.info

-- 115 of 415 --

108 | Designing games
that are used throughout the game: shooting and walking. But here, these
actions are used to drive a predefined plot branch instead of a normal piece
of gameplay.
Such interactions are fundamentally the same as dialogue trees since
the player’s options and the world’s responses are all predefined. The only
difference is that they express their choice with normal game actions
instead of a special dialogue tree interface. This can help preserve flow
because it doesn’t break the player’s natural control rhythm. It also avoids
the interface complexity of real dialogue trees.
Multiplayer games can use real players to fill the roles of game
characters.
In Dungeons & Dragons, the Dungeon Master plays the role of every
nonplayer character in the game. He speaks for them and decides how
they’ll respond to any action the players take. There doesn’t need to be a
limit on what the players can do because, being a real person, the Dungeon
Master can understand and respond to anything.
Real people can create remarkable stories together when they’re motivated to do so. The trouble with this method is aligning player motivation
with character motivation. It means motivating every player to properly
play their role in the game narrative, which is exceptionally difficult. It
works in face-to-face games played among friends because social pressure
motivates people to participate in good faith. In video games, with anonymous strangers, or in competitive games, it’s difficult to impossible to arrange players’ motivations so that sustained, rich role playing can happen.
Case Study: Fallout 3
Let’s examine a game-driven narrative experience and break down the
narrative tools used to generate it. First, I’ll tell you a story that happened
to me when I played Bethesda Game Studios’ 2008 post-apocalyptic RPG
Fallout 3. After that, I’ll break it down.
The game begins with the player character’s birth in Vault 101. Built
underground centuries ago, the Vault’s purpose is to protect its inhabitants from nuclear holocaust. This story picks up as the player character
leaves the Vault for the first time at age 19.
www.it-ebooks.info

---

## Sección 34: Foundations & Introduction

-- 116 of 415 --

naRRative | 109
my stoRy
The landscape was a windblown expanse dotted with dead trees, smashed
cars, and human bones. With the Vault door closed behind me, I had nowhere to go but forward.
Within minutes I encountered a tiny settlement called Megaton.
While wandering through town, I encountered a store called Craterside
Supply. Like every other structure in Megaton, the building was no more
than tacked-together sheet metal and junkyard scrap. It was only identifiable by the name scrawled in white paint beside the front door.
The inside didn’t look much better than the outside. Dust hung in
the air, glowing yellow under the arc-sodium lighting, while ramshackle
shelves lined the walls. A young woman in grubby blue coveralls swept
the floor behind the counter, her flame-red hair pulled back into a messy
ponytail. I approached her.
“Hey!” she said. “I hear you’re that stray from the Vault! I haven’t seen
one of you for years! Good to meet you!” Her voice seemed to pitch higher
and higher with every syllable. After the dour Wasteland, her enthusiasm was almost unnerving. “I’m Moira Brown. I run Craterside Supply,
but what I really do is mostly tinkering and research.” She paused for a
moment. “Say, I’m working on a book about the Wasteland—it’d be great
to have the Foreword by a Vault dweller. Help me out, would you?”
She seemed friendly, and I needed friends. “Sure,” I said, “I’ve got
plenty to say about life in the Vault.”
“Great!” she replied. “Just tell me what it’s like to live underground
all your life, or to come outside for the first time, or whatever strikes your
fancy!”
I thought she might be playing with me, so I decided to play back.
“This ‘Outside’ place is amazing,” I said. “In the main room, I can’t even
see the ceiling!”
“Hah!” said Moira. “Yeah, you wouldn’t imagine how hard it is to replace that big lightbulb up there, too! That’s great for a Foreword—open
with a joke and all that. That’ll be good for the book. In fact, want to help
with the research? I can pay you, and it’ll be fun!”
“What’s this book you’re working on?” I asked.
“Well, it’s a dangerous place out there in the Wastes, right? People
could really use a compilation of good advice. Like a Wasteland Survival
Guide! For that, I need an assistant to test my theories. I wouldn’t want
anyone to get hurt because of a mistake. Nobody’s ever happy when that
happens. No. . .Then they just yell a lot. At me. With mean, mean words.”
www.it-ebooks.info

-- 117 of 415 --

110 | Designing games
I considered this. “Sounds like a great idea!” I said. “I can’t wait to
help! What are you looking for?”
“Well, food and medicine. Everyone needs them once in a while,
right? So they need a good place to find them! There’s an old Super-Duper
Mart not far from here. I need to know if a place like that still has any food
or medicine left in it.”
I agreed and said goodbye. An hour out of the Vault, and already I’m
Moira Brown’s survival guinea pig.
Once outside the town gates, I followed my compass toward the SuperDuper Mart. I soon crested a hill and found the husk of Washington, DC,
laid out in front of me. Shattered buildings stretched away to the horizon,
forming a jagged border against the yellow sky. I trudged toward them.
I found the Super-Duper Mart on the outskirts of town. Whoever architected it must have lacked in either creativity or money, because it was
no more than a giant concrete shoebox, identifiable only by the huge blockletter sign looming over the parking lot.
As I entered the parking lot, I heard the boom of a big hunting gun
alternating with the pakpakpak of an assault rifle. I rounded a corner and
found a Wasteland raider battling it out with a man in an ancient leather
coat. “What’s wrong? Can’t stand the sight of your own blood?” screamed
the man in leather. They were his last words. The raider shot him down
with a burst from the assault rifle and he fell, gurgling. Then she turned
on me.
As with most raiders, this one had dressed to impress. She sported a
tight black jumpsuit covered in spikes, a double Mohawk, and thick eyeliner that lent a demonic quality to her face.
She fired with her assault rifle. I fired back with my pistol. I must have
hit her in the arm, because she dropped her weapon. I kept firing as she
rushed to pick it up and take cover behind an ancient car.
Then she opened up, this time from behind the car. I was caught in
the open and took several hits. It looked bad—my pistol wasn’t powerful
enough for me to trade blows with her assault rifle like this.
Just as I was getting desperate, I heard a boom from behind me. I
turned to find a leather-clad woman firing at the raider with a huge rifle.
She fired once more, and the raider fell.
I approached the dead raider and stripped her of everything she carried, including her assault rifle and ammunition. I even took her spiky
clothes. They weren’t my style, but I thought I might sell them later.
www.it-ebooks.info

-- 118 of 415 --

naRRative | 111
Just as I finished looting the corpse, an explosion went off right beside
me and my vision filled with white. Coming to, I realized what had happened. The car the raider had used as cover had begun to burn when it was
hit by stray shots. It had continued burning as I looted her corpse, and only
exploded just now.
The explosion had crippled my right leg and left arm. I couldn’t aim
or move properly like this. I looked through my pack and found a Stimpak
healing device. The chemicals flowed through my veins and healed my
limbs enough to make them usable again. I chugged a Nuka-Cola to shore
up my strength.
As I approached the Super-Duper Mart’s front entrance, I noticed
three corpses strung up in front of the store, twisted into grotesque poses.
These weren’t just casual murder victims—they were raider trophies on
display. It seemed that the raider in the parking lot wasn’t just passing
through. The Super-Duper Mart was a raider base.
I reloaded my pistol and entered the building.
The store was dark inside. Sunlight struggled to penetrate windows
caked with centuries of grime. A few of the fluorescent ceiling lights were
still burning, forming yellow blobs of light in the choking dust. Shopping
carts were scattered randomly over the floor, and the shelves displayed
rows and rows of nothing.
I saw no one from my position at the door, but I knew they must be
there. I crept into the room, using the dark to stay hidden. As I edged up
to a checkout counter, I noticed a lone raider patrolling across the tops of
the aisles, weapon in hand.
I snuck closer, took careful aim, and fired my pistol. The shot skimmed
past the raider’s head and thudded into the rear wall of the store. Return
fire erupted from all around as raiders emerged from the woodwork, alerted by my attack. I retreated back to the checkout counter as bullets pinged
around me. I found targets and fired, killing several raiders.
Two attackers approached from the left. One fell quickly to my pistol.
The other aimed a gigantic rifle at me and fired, hitting the counter in
front of me. I threw four rounds at his chest. One of them hit, but he kept
coming, his rifle making great crashing sounds as it tried to tear off my
head.
I retreated behind a pillar, desperate. Looking through my inventory, I
found the assault rifle I stole from the spike-wearing raider in the parking
lot. I readied it and waited. As the rifleman came into view, I put eight
rounds into him in one long burst. He fell with a clipped scream.
www.it-ebooks.info

---

## Sección 35: Foundations & Introduction

-- 119 of 415 --

112 | Designing games
The store went quiet. It seemed the fight was over, so I began scavenging. Dead raiders yielded armor and ammunition. I grabbed the hunting
rifle off my last victim. Vending machines produced Nuka-Cola. Exploring
the bathrooms, I found mattresses and drugs on the floors. It seemed this
was where the raiders had been sleeping. A fridge yielded an assortment
of food—the first thing Moira wanted me to find.
I proceeded into the back of the store to find the medicine Moira
wanted. More unfortunate dead Wastelanders hung from the ceiling. The
last was nailed to the wall in a vaguely Christlike pose. Like many of the
others, he was headless.
As I studied him, I heard a burst of automatic weapons fire. I saw my
blood and heard my cries of pain as the bullets hit me. Turning, I saw
my ambusher. It was a raider with an assault rifle, wearing a motorcycle
helmet with antlers nailed to the sides. He kept shooting, wounding my
left arm. I stumbled back, firing blindly with my pistol. His next burst shattered my leg just as I dropped behind the cover of the pharmacy counter.
I looked through my pack and noticed a frag grenade. I stood up and
tossed it. It landed at the antlered madman’s feet and exploded, separating
his legs at the knees and launching him into the air.
The store quieted again.
I repaired my arm with my last Stimpak and began scavenging. I
picked the locks on some ammunition cases, taking bullets, grenades, and
improvised mines. On various shelves I found machine parts, scraps of
food, and a book called Tales of a Junktown Jerky Vendor.
Trying to get into the pharmacy’s back room, I found myself blocked
by a door that was too advanced for my rudimentary lockpicking skills.
Searching around, I found a key for the pharmacy in a metal box some
distance away. I returned and used it to open the door.
The pharmacy storage room was filled with rows of broken-down
shelving. Most of it was covered with junk, but I did find darts, more grenades, liquor, a pressure cooker, and a miniature nuclear bomb. I also
found the medical supplies Moira wanted to know about. I used one of the
Stimpaks to heal my wounded leg.
As I left the pharmacy, I heard a voice over the store P.A. system.
“We’re back. Somebody open up the. . .Hang on, something ain’t right
here.” Raiders were entering the store from the front door, and I was
trapped at the back.
www.it-ebooks.info

-- 120 of 415 --

naRRative | 113
It was a hard fight, but I made it. By the time I got back to Megaton, the
sky had faded to a dusty blue. Moira was cheery as always. “Huh. Did you
know that the human body can survive without the stomach or spleen?”
she enthused. “Oh, what’s up?”
BReakDown
This story is a particular experience that a player can have in Fallout 3.
It will never happen exactly the same way to two players. Still, it can be
understood as a story. It has pacing, exposition, a beginning, and an end.
Fallout 3 uses many different narrative tools. World story is everywhere, in the landscape, the architecture, and the mise-en-scène of junk,
loot, and corpses. Other parts of the story, such as Moira’s dialogue, are
hard-scripted. Still others, such as combat encounters, are soft-scripted.
The integrated story that the player experiences arises emergently
from the interaction of scripts, game systems, and the player’s decisions.
This emergence happens at all levels—on the micro level of individual
motions and attacks, and on the macro level of quest choices and travel
destinations. And because there are so many permutations, each player’s
experience is unique.
My story opens through world narrative. The Capital Wasteland is a
desiccated husk of a landscape. The scorched buildings and cars tell the
history of a world cremated by nuclear fire. The town of Megaton tells
its own world story through architecture: sheet-metal shacks and handpainted signs speak of a hardscrabble life of extreme poverty. And people
are characterized appearances, too: Moira Brown’s grungy coveralls and
simple hairstyle mark a woman more interested in tinkering than popularity. You can tell she’s a geek.
But world story isn’t all that’s happening here. The player experiences
this world story through his choices of where to go and what to look at. So
as the player wanders the space, there are two story threads running: the
backstory of nuclear war, and the emergent story of the player character
walking around the Wasteland after escaping the Vault. One story goes,
“This town was built by desperate people.” The other goes, “I walked into
town and explored to my left.” The player experiences both stories at once,
simultaneously feeling the emotional output of each.
Once I began talking with Moira, the game switched from exploratory
world narrative to a dialogue tree. All of my words were chosen from lists
of speech options, and Moira’s responses were all scripted.
www.it-ebooks.info

-- 121 of 415 --

114 | Designing games
To avoid the infinite story branching problem, Fallout 3’s dialogue
trees loop back on themselves often. For example, every time you greet
Moira, you get the same list of dialogue options, each leading to a different
topic: purchasing gear, purchasing furniture for the player’s home, local
gossip, repairing objects, any quests in progress, and so on. After each
topic resolves, the dialogue returns to the root topic list. So the dialogue
tree itself is arranged in a hub-and-spokes content ordering structure.
The approach to the Super-Duper Mart created a sense of anticipation
of the challenge ahead. This part of the story wasn’t in any script, but it
was implied by the geometry of the world.
My encounter with the raiders and leather-clad hunters outside the
Super-Duper Mart was an interesting convergence of narrative tools. The
raiders were scripted to be there and will always appear in the same places.
The hunters, however, were not part of any script. Hunters appear randomly in the Wasteland throughout the entire game. In this case, they
happened to show up just as I arrived at the Super-Duper Mart. The hunters and raiders, being mutually hostile, began fighting as soon as they saw
one another, and this emergent fight was still going on as I arrived.
My introduction to this battle was hearing the hunter’s bravado
(“What’s wrong? Can’t stand the sight of your own blood?”), and seeing it
get cut short by the raider’s assault rifle. The madly brave hunter screaming his last threat as he dies is a poignant emotional exchange. What’s
interesting about this is that it is not modeled in the game mechanics.
It is an interpretation constructed apophenically in a player’s mind from
randomized dialogue barks and straightforward combat interactions.
After the first hunter died, I was pinned down by assault rifle fire
from a second raider. This short fight formed a miniature emergent story
with its own emotional arc. Being pinned made me tense. After an unseen
hunter saved my life, I was filled with relief and gratitude toward my
savior. It almost seemed like she was saving me as an act of kindness,
or killing to exact revenge for her murdered companion. Naturally, these
interpretations are all pure apophenia, but they feel real and affect the
player nonetheless.
The fighting inside the supermarket forms another mini-story. My
stealthy entrance into the space is exposition. It gave me time to understand their situation before diving in. When raiders started coming out
of the woodwork, the tension ratcheted up. It peaked as the rifle-wielding
raider approached. This tension was finally resolved with the epiphany of
remembering the assault rifle taken from the raider in the parking lot and
www.it-ebooks.info

---

## Sección 36: Foundations & Introduction

-- 122 of 415 --

naRRative | 115
the triumphal counterattack. This little arc is like a scene from an action
movie, but instead of being authored by a designer, it emerged from the
interaction of game systems, soft scripts, and player choices.
The final ambush from the antlered assault rifle foe was not scripted.
His “ambush” was emergent and there was no real intent behind it in
the artificial intelligence—he just happened to be left over after the main
fight. But even though it wasn’t in the mechanics, apophenically, it seemed
like this last mad survivor had laid a trap.
The antlers gave that final raider a special personality by labeling him.
He isn’t just a raider; he’s the weird raider with the goofy antlers. This
label makes it easier to construct a story about him. Labeling is one area
that Fallout 3 could have improved. Most characters are just nondescript
raiders. Had they had more identity—crazy doctor, bartender, master,
slave—players would have been able to construct better stories about them.
tHe goofy unDeRtone
The world of Fallout 3 has a strong undertone of goofiness: Moira’s overwhelming enthusiasm, raiders with antlered helmets, and so on. These
humorous juxtapositions are essential. Had the game been purely about
surviving in a desperate, dead world, the emotional heaviness would have
been too much for most players. Occasional absurdities lighten that emotional load.
Absurdity also helps justify less realistic parts of the game. For example, Fallout 3’s goofy vision of nuclear radiation permits it to throw all
sorts of strange beasts at the player, from giant flies to 30-foot-tall humanoid behemoths. Had the radiation been modeled realistically, none of this
would have been possible.
Finally, the unserious undertone reduces the impact of the inevitable
logical absurdities in the game’s emergent stories. For example, I once
walked up behind a caravan guard and shot him three times in the back
of the head. He turned, scowled, and said, “I thought I heard something!”
Instead of feeling wrong, this moment just felt funny.
Content oRDeRing
The content is ordered by both scripting and world geometry. For example, the player must pass through the parking lot before going inside.
Once inside, he must pass through the main room before experiencing
the pharmacy. Finally, the raiders coming in the doorway are scripted to
appear only after the player has explored the pharmacy.
www.it-ebooks.info

-- 123 of 415 --

116 | Designing games
The player can leave and return to the quest at any time. He might
do half of it, walk away, and come back 20 hours of play later to finish it
up. This creates a vast number of possible paths through the game, as the
player juggles many different quests.
PaCing
The pacing of this story is irregularly spiky. Tense moments of combat fall
between longer periods of dialogue, exploration, healing, and scavenging.
This mixture keeps players engaged without exhausting them.
We could argue that the pacing of this story would benefit from a
greater sense of progression—more intense fighting as the quest goes on,
ending with a climax. To create this, however, we would have to reconcile
such a pacing curve with the fact that players can suspend and reactivate
quests at any time. Our carefully crafted pacing is likely to be sliced and
diced by easily distracted players. In such an unpredictable environment,
the game’s steady-with-spikes pacing might be the best solution because it
is robust against being chopped up and reassembled.
setting
Fallout 3 is set in a postapocalyptic world. This setting supports the game
well by justifying good and flexible game mechanics.
For example, it makes sense that starving, desperate people would
often become violent. This omnipresent violence supports the game in
several ways. It justifies repeated use of the game’s combat systems. And
it allows the game to tell emergent stories by having characters run and
shoot instead of having them stand and talk, largely avoiding the human
interaction problem.
www.it-ebooks.info

-- 124 of 415 --

naRRative | 117
The dead world justifies a very low population density. This dovetails well with the game’s technical and design limitations. It saves the
designers from having to create even more characters than the game’s
already-large cast. And it explains the absence of the large crowds which
the game’s technology is unable to handle.
www.it-ebooks.info

-- 125 of 415 --

www.it-ebooks.info

-- 126 of 415 --
| 5
Decisions
The brains sat around the dinner table, their moist neocortical folds
glistening in the candlelight.
“What about you, Albert?” asked the narrow, gray brain. “What are
your tastes these days?”
Albert, a wide, pink brain, quivered. “I like them big, and not too often.
I want something that takes time to digest.”
“Pah,” said Isaac, a long, cylindrical brain. “Who wants to chew that
long? I prefer a rapid series of tiny pieces. Bite-sized morsels.”
The table exploded in debate—many, few, varied, consistent, big,
small—as the waiters served the brains their individually preferred meals.
Seen as a whole, an interactive experience is an inscrutable tangle of
interactions, thoughts, and emotions. To understand interactivity well
enough to craft it, we need to examine the individual units of interactivity.
Those units are decisions.
In some games, the decisions are easy to see. In a poker hand, a player
must decide whether to fold or call. In Civilization V, the player must decide
whether to invade the Babylonians now, or wait another turn. Games like
this hand decisions to us, one by one, each a unique and perfectly formed
puzzle.
Other games don’t make it so easy. In real-time, multilayered games,
decisions flow together like bubbles in a straw. They overlap, merge, and
divide in a continuous dance of perception and thought. In StarCraft II, a
professional player manages one attack while defending against another,
guiding a scout, and growing his economy. In boxing, a fighter keeps track
of his energy, stance, attack, and defense, deciding at each moment what
to do with every part of his body. These competitors’ various thought processes overlap so much that it’s hard to identify the individual decisions.
But even if we can’t easily draw lines around the decisions, they’re still
www.it-ebooks.info

---

## Sección 37: Foundations & Introduction

-- 127 of 415 --

120 | Designing games
there. And they’re important, because decisions are powerful sources of
emotion.
When we explain a decision, we use logical reasoning. We describe
the why and how of the circumstances surrounding the decision, the desired goal, and how our choice gets us to that goal. But in reality, logic is
only part of the process of choosing. The other part—and often this is the
largest part—is driven by emotion. The purely rational human decision is
a myth, no more real than Spock from Star Trek.
Whether you’re choosing which pair of socks to put on, whether to get
a divorce, or which opening move to use in chess, your decision is guided
by how you feel about each option. You look at the black pair of socks and
feel a twinge of boredom. You look at the orange pair and something lights
up inside you. So you reach for the orange. Or you think about advancing
your queen and a trained instinct injects you with a shot of unease. You
look over at the pawn, and you feel better. So you move the pawn. In each
case, some part of the unconscious evaluates the decision and triggers
an emotion to guide your behavior. Those emotions are part of the play
experience.
Understanding decisions is critical in game design because decisions
are the only emotional trigger that is unique to games. Many media can
provoke emotion through spectacle, character, or music; only games can
do it through decision.
But crafting decision-generating systems is wickedly hard. Decisions
themselves come in countless shapes and sizes. They can be important or
inconsequential, difficult or easy. Some involve lots of information, others
very little. They can be crystal clear, or shrouded in uncertainty. Some
are rushed, while others allow long contemplation. They may be packed
together, or generously spaced. Each variation and combination creates a
different emotional flavor.
As an added challenge, we can’t design decisions directly without
breaking them. More than in any other field, in game design decisions
must be emergent to work well. So instead of writing them one by one, we
have to create systems that generate them on the fly.
Decision design is game design at its purest. While games can be
enhanced by narrative, fiction, image, and sound, none of these is essential to the form. The heart of games is in interactivity, and the heart of
interactivity is the moment of decision.
www.it-ebooks.info

-- 128 of 415 --

DeCisions | 121
Feeling the Future
Most emotional triggers are described as working by something happening in the present. You see a scary monster, so you feel fear. You win a victory, so you feel triumphant. In each case, an event occurs, and the player’s
mind perceives that event and produces an emotional response a moment
later. The cause and effect are obvious, and they make intuitive sense.
But decisions don’t create emotion this way, because decisions aren’t
about the present. Decisions are about choosing among multiple possible
futures. The emotions provoked by decisions aren’t about something that
has happened, but something that might happen.
Something doesn’t have to happen to generate emotions. The player
need only sense the possibility of it happening.
Imagine standing on the edge of the Empire State Building. Your toes
hang over the void, and a gust of wind buffets your back. You look down
and see cars crawling along like beetles 86 stories below. You’re petrified.
Your emotions, honed by millennia of natural selection, scream into your
mind: get the hell back!
Now imagine standing on the edge of a friend’s front porch in summer.
Your toes hang over the flower bed, and a gust of wind blows through the
front door and buffets your back. You look down and see a ladybug crawling along the edge of a flower petal. You feel at peace.
There is no difference in the events that took place in these two situations. In both cases, you stood on an edge and wind almost pushed you off.
In neither case did you die. The only difference is in the possible futures
presented by each. On the porch, your unconscious detected nothing dangerous in any nearby possible future, so there was no need for a powerful
emotion to compel any decision. But on the skyscraper, your unconscious
detected an immediate possibility of death. So it attempted to influence
your decision-making process using the feeling of terror. You felt afraid
even though nothing happened.
This is important. We’re accustomed to thinking of the process of
creating entertainment as a process of deciding what happens. Traditional
storytellers think and talk about the sequence of events in a plot. Game
designers talk about the situations that will rise emergently from the mechanics. The unspoken assumption is that anything which doesn’t happen
is irrelevant. But the human ability to feel emotions about possible futures
means this is wrong.
www.it-ebooks.info

-- 129 of 415 --

122 | Designing games
In games, the player doesn’t just experience what happens. His decisionmaking process mentally interacts with every possible outcome his mind
can detect. His unconscious runs a constant simulation of the world
stretching into the future, where he wins, loses, lives, and dies. These
perceived possible outcomes affect his emotions, regardless of whether
they occur or not.
So it’s not enough for a game designer to think about what the player
will do and how the game will respond. We also have to think about what
the player will consider doing, and what he’ll think the game might do in
response. Because even though many of these situations never come to
pass in reality, they still affect the player’s experience because the player’s
mind senses that they might occur.
In high-level chess, players spend a lot of time staring silently at the
board. A naïve observer might complain: “Why aren’t they doing anything?” But they are doing something. They are deciding. Their bodies
remain still, but their minds are blasting through the possibility space of
chess, dancing across the surface of a thousand moves and countermoves,
hunting for the one gem that solves the puzzle. Their emotions rise and
fall as they sense possible attacks and then see the inevitable response. It’s
the quality of this internal decision process that makes chess fascinating,
not the movement of pieces on the board.
The opposite is also possible. A poorly designed game can be packed
with movement and color, but be utterly barren of meaningful decisions.
Degenerate gameplay systems and gaps in decision pacing leave people
disengaged no matter how many clashing swords and speeding cars
flash onscreen. Physical action alone does not feed the mind’s internal
experience. For that, we need expectation, uncertainty, consequence, and
decision.
For example, one large studio has two separate third-person action
franchises that use much of the same technology and share many player
abilities. Just from watching them, one can see that they look extremely
similar. In both games, the player character climbs up walls and over obstacles and fights groups of enemies with a sword. But the experience of
playing the two games is very different because of how the structure of the
world feeds players’ decisions.
The first game is set in an open world. The hero can run, climb, and
jump anywhere to approach or escape from his enemies. Sometimes he
might choose to be sneaky and strike from rooftops. At any time he may
assault enemies in the street with a sword. He can run or climb in any
www.it-ebooks.info

---

## Sección 38: Foundations & Introduction

-- 130 of 415 --

DeCisions | 123
direction in a massive world. This means that every moment is packed
with a hundred possible futures. The player can look into the future and
see himself swimming away in a river, hiding on a rooftop, or fighting
to the death. And his mind is constantly churning on these possibilities,
evaluating them, driving him toward one or another with levers of emotion. Even if he doesn’t consciously consider these futures, he’s feeling
them—always.
The second game is very similar to the first in controls, except it is
crushingly linear. Each area has one entrance, and one exit, and one particular sequence of jumps and climbing paths which allow the player to
progress. There is never more than one possible future for the mind to
think about, which means that there are no decisions. The player just does
the one thing he can do at every point, so the game is emotionally empty.
Even though the actions on the screen are the same as the first game, the
thought process behind them—and the accompanying emotions—is very
different.
PReDiCtaBility
It’s usually an insult to call a game predictable. But it shouldn’t be, because
predictability is essential to meaningful decision making.
To feel a possible future, the player must sense and understand it.
Standing on the edge of a skyscraper is scary because you understand how
little it would take to fall to your death. If you did not understand what was
going on, the possibility of death would not scare you because you would
not sense it was there.
When we want a decision to be meaningful, its outcomes must be neither
unknowable nor inevitable. They must be partially predictable.
Without any prediction of the future, planning and decision are impossible. There may be a million interesting futures out there, but they’re
meaningless if they’re lost in a haze of incomprehensibility. When this
happens, the decision-making thought process vanishes. The player can’t
look ahead, so the game degenerates into an emotionally barren exercise
in reactivity, where the player just responds as fast as possible to things as
they occur.
At the same time, the future cannot be totally predictable. A totally
predictable future creates no meaningful decisions because there is no
www.it-ebooks.info

-- 131 of 415 --

124 | Designing games
mental work to do in finding a way to a desirable result. We need only
select the most favorable outcome.
Prediction of a possible future depends on it being driven by a
consistent, comprehensible system.
Pick up a teacup, hold it out at arm’s length, and drop it. What will
happen?
Obviously, we all know the answer: shattered china and spilt tea. The
reason we know is because we intuitively understand everyday physics. We
know that gravity pulls things down over time, so things dropped from a
greater height will hit the floor with more force. We know that a teacup is
made of a brittle material that will shatter if struck hard enough. This is
all part of a system of rules—physics—which we understand. Since we
understand that system, we can predict what it will do.
The unconscious predicts possible futures by applying knowledge of
the systems which drive the universe. Physics is one, but there are many
others: psychological, economic, mechanical, and so on. Your kid’s mind
is a system. So are the politics at your workplace and the lawnmower in
your garage that needs fixing. Feeling the future means first seeing the
future by using our mental models of these systems to predict what will
happen in response to any given action.
The same principle applies in prediction in games. The main difference is that the systems here are artificially designed arrangements of
game mechanics. But to be predicted in an emotion-driving way, those
mechanical systems must have certain properties.
First, they must be consistent. Like gravity, they must act the same way
in different situations so that lessons learned in one place can be applied
elsewhere. If the rules change constantly, prediction is impossible.
Second, they must be comprehensible. This means they must be simple
enough that the player can wrap his mind around them. A consistent
system isn’t predictable if it can’t be understood.
When game systems fulfill both of these criteria, the player can see
and thus feel the future, and a universe of emotion arises from every predicted threat and opportunity. But when game systems are inconsistent or incomprehensible, those emotions vanish. Even if the threats and opportunities
are there, the player won’t be able to feel them since she can’t detect them
through the haze of inconsistent or incomprehensible systems.
www.it-ebooks.info

-- 132 of 415 --

DeCisions | 125
For example, Mario always jumps the same way. His maximum jump
height is always exactly the same. His control characteristics and falling
speed never change. And these systems aren’t complicated; there are only
a few rules and numbers. This means that Mario’s jumps are driven by a
consistent, comprehensible system. So a player can, with practice, look at
an obstacle course and know exactly which jumps will get him to the exit,
what dangers he will face, and how he might defeat them. He can envision
various paths, possibilities, and opportunities, and feel each one.
If Mario’s jumping systems changed randomly, or were incomprehensibly complicated, that predictability would vanish. The player couldn’t
plan a jump path. Without those mental images of the future, he couldn’t
feel good about an opportunity or scared about a future danger. All he
could do is react.
PReDiCtaBility anD PReDefineD DeCisions
Before we go on, I’d like to clarify something. When people talk about decision making in games, they’re often referring to predefined plot branches,
like those in an old Choose Your Own Adventure novel. In this kind of decision, the game designer explicitly defines each of the player’s options and
every outcome that those options lead to.
For example, a designer might script a character to approach the player
and offer heroin. If the player accepts the heroin, a scripted sequence plays
out where cops chase the player. If the player rejects the heroin, the criminal attacks the player. The choice, along with every possible result of the
player’s decision, all play out the same way every time because they’re
authored that way by a designer.
Such predefined decisions are different from the decisions I’m discussing in this chapter because their outcomes aren’t determined by game
systems the player can learn and predict. They’re determined by the designer’s arbitrary choice of what should happen. This means the thought
process of making such decisions is completely different from that which
drives mechanics decisions.
In the best predefined decisions, the player chooses for fictional reasons. He might turn down the heroin because he wants to be a good guy.
Or he might accept it because he wants to be evil. In the worst cases, the
player second-guesses the designer to try to get some optimal result. He’ll
look at the designer’s habits in the past and choose to accept or reject the
heroin based on his guess of which path will get him more money. Either
way, the thought process isn’t the same as a mechanics-driven choice like
www.it-ebooks.info

---

## Sección 39: Foundations & Introduction

-- 133 of 415 --

126 | Designing games
a chess move or fighting game attack. The player isn’t thinking through
game systems. He’s thinking through sentimental values or trying to read
the designer’s mind.
Predefined choices do serve a purpose. They allow a player to coauthor
a narrative with the designer in a way that isn’t possible with systemsdriven choices. We can’t make a system to simulate a human mind or an
entire narrative world, so if the player is going to affect these at all, they
must make predefined decisions. But these predefined choices shouldn’t
be confused with the systems-driven decisions discussed in this chapter.
They’re authored differently and contribute to the experience in distinct
ways.
PReDiCtaBility anD ai
There’s a common assumption that smarter AI is better AI. The reasoning goes like this: A game is about simulating some fictional world with
people in it. A more accurate simulation is better. Therefore, more accurate simulations of characters’ minds are better. And, since real people are
always smarter than game AI, smarter AI is always better, because it is
more like a real person.
The problem with this is that people in games often shouldn’t be
simulations of real people because games aren’t simulations of life. Games
are mechanics wrapped in fiction, not mechanics trying to trick you into
thinking they’re real. The fiction wrapper enhances and communicates
the mechanics, it doesn’t define them.
And mechanics designs are often harmed by smarter AIs, because
smarter AIs are often unpredictable. An AI driven by a few simple behaviors can be predicted. The player can plan an approach deep into the future
because he knows what will happen at each step of the way. But a very
smart AI with a complex, layered mind can’t be predicted. The player can’t
plan around its actions because they’re driven by an incomprehensible
mind. The more the AI thinks, the less the player is able to think.
In most cases, AI is best thought of as a mechanic like any other, not
as a simulation of a real mind. A character who follows straightforward,
predictable, consistent rules often contributes more to a play experience
than a realistically chaotic mind simulation.
For example, most soldiers in real-time strategy games act more like
automata than people. Given an order, they carry it out exactly and immediately, and they do it the same way every time. This means that the
www.it-ebooks.info

-- 134 of 415 --

DeCisions | 127
same fight always ends the same way, and that the same counterstrategies
always work. This consistency is what allows players to plan complex strategies. If soldiers had complex internal AI, the same battle would randomly
swing from victory to defeat and back as the AI decided to go left instead
of right, or lost and regained its courage. The AI soldiers would determine the outcome of fights instead of the player, which isn’t what we want.
Automata-like soldiers make less sense in the fiction, but their mechanistic predictability is what makes it possible for players to strategize with
confidence that their strategies will play out consistently.
The exception to this rule is in designs where fiction is more important than mechanics-driven decision making. When a game’s emotional
triggers revolve around nuanced interaction among AI characters, it can
be worth sacrificing the crystalline predictability of simple AI.
Information Balance
The character, difficulty, and complexity of a decision depend on the information that the player has while making it. The same decision can be
made incomprehensible with too little information, fascinating with the
right amount of information, and trivial with too much information.
This means that even without changing the decision at all, we can
transform the mental process of making it by adding and subtracting information. I call optimizing decisions this way information balancing.
INFORMATION BALANCING is the design process of providing or denying
information to a player to make a decision comprehensible without being
obvious.
This is an elegant method of game design because it doesn’t require
changing the mechanics themselves. The game stays the same. All we’re
doing is hiding or revealing different parts of it, which is usually quicker
and easier than reworking how the systems actually work.
The two ways information balance can go wrong are information
starvation and information glut.
infoRmation staRvation
Inconsistent or incomprehensible systems aren’t the only way to break predictability. Predictability can also break if the player doesn’t have enough
information about what is happening. This is called information starvation.
www.it-ebooks.info

-- 135 of 415 --

128 | Designing games
It’s easy to induce information starvation in a game. Just hide a bunch
of information. Put a vertical piece of cardboard in the middle of a chessboard and play without being able to see the other half of the board. Play
Magic: The Gathering with all creature, artifact, and enchantment cards
hidden from the opponent. Play tennis in the dark. In each case, the game
collapses into reactive thrashing and random choices.
In rare cases, information starvation is a design goal. For example,
Battleship and most gambling games are information-starved. This works
because these games’ primary emotional triggers aren’t built around decision making. For them, the randomness induced by information starvation is a benefit since it makes the game more accessible and social by
reducing the game’s value as a lens of competition. But in games that
are about the decisions of play themselves, information starvation can be
deadly.
Some cases of information starvation are obvious and relatively easy
to fix. We can increase the sight radius of a unit in a strategy game, or
reveal more cards in a card game. But other times, information starvation
can arise from the interaction of other seemingly unrelated elements in
hard-to-predict ways.
For example, a common uncorrected cause of information starvation
is what I call the authored challenge preparation problem. Many games are
structured as a sequence of authored challenges. The player completes
the first level, then the second, then the third, and so on. The information
starvation appears when the game asks the player to prepare for future
challenges before seeing them. The player has no way of deciding how to
prepare since he has no in-game way of predicting what the next challenge
will be.
The authored challenge preparation problem appears constantly, even
in otherwise excellent games. For example, role-playing games often start
by asking the player to create his character. The player must choose a race
(human, elf, dwarf), class (fighter, sorcerer, thief), skills, attributes, and so
on. These decisions are very important; they affect everything that happens through the rest of the 50-hour experience. Unfortunately, they’re
also broken. At the start of play, the player knows nothing at all about the
game. He has no sense of the balance of combat, or his tool preferences.
He doesn’t know what foes he will face.
Given such a critical choice without the data needed to make it, players often fall back on the most familiar, safe option, missing out on the
most interesting parts of the game. For example, in Mass Effect 2, there
www.it-ebooks.info

---

## Sección 40: Foundations & Introduction

-- 136 of 415 --

DeCisions | 129
were six classes, the magic-using Adept to the tech-wizard Engineer. But
post-release metrics revealed that 80% of players chose the Soldier—the
most familiar and unoriginal class in the game. Given a set of incomprehensible options, people just went for the one they understood, and missed
much of the value in the game.
Another common uncorrected cause of information starvation is the
ambiguity of information delivered through a game’s fiction layer. The
critical decision-driving information that players want is usually purely
mechanical: damage statistics, movement rates, quest structures, various
mathematical tables for the game’s economics. It is hard to deliver this
information in the fiction because it doesn’t exist in the fiction. The fiction
says that the player is firing a rifle at a target, and it should do widely variable damage of many possible types based on range, hit location, random
internal bullet tumbles, and many other variables. The mechanics say
that a bullet is an instant trace that reduces hit points by a fixed amount.
That amount cannot be communicated within the fiction, so it often isn’t
communicated at all. In these cases, it is frequently better to go around the
fiction and deliver some of this mechanics information directly.
Sometimes the Internet solves information starvation for us. Websites
like GameFAQs.com provide massive player-authored text files called FAQs
(Frequently Asked Questions) which explain every ability and level in a
game, often including hidden statistical data that players were never supposed to know. At first glance, reading a FAQ seems like a form of cheating
that would ruin a game. But in an information-starved game, FAQs can
dramatically improve the play experience. With the FAQ, players can plan,
predict, and decide meaningfully and intentionally, and the experience
blooms. Because they understand the implications of their choices, those
choices suddenly become interesting.
A useful FAQ is a warning sign. When a text file makes a game noticeably better, that game is probably information-starved. It’s full of value—
the designer just needs to help players understand that value by giving
them access to more information.
Information starvation is an insidious problem because designers can’t
see it due to their unique knowledge of the game, and because it’s
emotionally painful to find.
Information starvation is common because it hides itself from designers. It does this in two ways.
www.it-ebooks.info

-- 137 of 415 --

130 | Designing games
First, it is inherently invisible to designers. A designer knows everything about his game—far more than most players will ever discover. We
can try to pretend that we don’t know what we know, but there is no way to
actually have the experience of an uninitiated player. Without playtesting
or other safeguards to detect these problems, it’s easy to think a game is
working well when it is actually critically information-starved and unplayable for anyone who doesn’t already know it inside and out.
But information starvation also hides itself in another, even more
insidious way. It uses emotional blackmail to make us not want to find it.
It feels good to see a new mechanic finally work after weeks of design
effort. For many designers, that sense of accomplishment is our main
reason for doing the work. But hunting information starvation puts that
feeling in jeopardy. It threatens to show that that feeling of success was
just an illusion—that, in front of real players, the mechanic is an impenetrable mess. That’s a terrible letdown for a designer, and it’s emotionally
difficult to take actions to seek that result.
But it must be done. Information starvation is always found eventually. It’s better that it happens before release, when we can still do something about it.
infoRmation glut
While too little information makes decisions confusing and random, too
much information erases them entirely. A decision is about seeing the
correct answer implied by the information given. If the answer is already
plainly stated in the information given, there is no mental process in seeing
it. The thought process vanishes; the decision is no longer a decision.
That means that sometimes we can generate a decision from nothing
just by subtracting information. By not handing players the answer, we
give them an interesting problem to think through.
For example, in Modern Warfare 2 the player can attach a heartbeat
sensor to the side of his rifle. The sensor displays a map with the locations
of nearby enemies in front of the player, even if they’re behind walls.
If this is all it did, it would be an awful design. Much of the best play
in Modern Warfare 2 derives from the challenge of figuring out where enemies are. A player given complete information on enemies’ locations could
blunder around corners with no care, tension, or thought, and never have
to guess at enemies’ movements. The game would devolve into a reactive
shooting contest, and the pokerlike game of cat and mouse would collapse.
The solution is to subtract information. But how, exactly?
www.it-ebooks.info

-- 138 of 415 --

DeCisions | 131
How would you do it? What would you change about the heartbeat
sensor to make it interesting again without cutting it altogether? Take a
moment to think about this before reading on.
Infinity Ward’s designers fixed the sensor by adding two key limitations. First, the sensor doesn’t work on enemies who have the Ninja
character perk. This means that just because the sensor says nobody is
there doesn’t mean nobody is there. Someone with Ninja could still be
there, so the player must think and decide whether someone with Ninja is
around a corner before he turns it. This also adds another layer of strategy
at high skill levels: a smart player will remember who and how many of his
adversaries are using Ninja and calibrate his assumptions appropriately,
perhaps even giving up the heartbeat sensor entirely.
Second, the sensor does not show enemies’ locations continuously.
Rather, they’re seen as periodic blips, once every 3.5 seconds, like on an
old-style radar screen. Between pulses, the sensor displays nothing. This
means that even when he has someone on the sensor, the player must
make a mental effort to figure out where the enemy has moved since the
last blip. And in Modern Warfare 2, a skilled opponent can easily flank and
kill you in that time. Again, this adds another layer of strategy: skilled
players will realize when they’re being tracked on heartbeat sensors, and
deliberately start moving to avoid being where the blip says they are.
These limitations make a world of difference in how the sensor plays.
And that difference was made without changing any mechanics interactions at all. Weapon damage, movement, and environments are all the
same as before. But by dialing a torrent of information down to a slow drip,
we create entirely new classes of decisions and strategies.
Information glut isn’t so much a failure as a missed opportunity.
Nothing breaks when there is too much information. Testers don’t get
confused and cry for help. In fact, the game hums along too smoothly
because they understand everything. That’s why often, the hardest part
about tackling information glut is realizing that it’s happening in the first
place.
ways to HiDe infoRmation
We’ve seen how when the player knows everything, decisions disappear
due to information glut. At first this seems to imply that decisions are only
possible in what are known as incomplete information games.
www.it-ebooks.info

---

## Sección 41: Foundations & Introduction

-- 139 of 415 --

132 | Designing games
In an incomplete information game, part of the game state is hidden
from some players.
For example, poker is an incomplete information game because you
can’t see other players’ cards. In contrast, chess is a complete information
game since both players can see everything on the board.
But this traditional distinction doesn’t cover all the ways that decisionrelevant information can be hidden. Even seemingly complete information games can have decisions because they hide information in other, less
obvious ways.
Information can be hidden in the future behind chains of complex cause
and effect.
Complete information games reveal their present, but not their possible futures. We can see what the whole chessboard will look like after we
make one potential move, but we can’t see what it will look like three turns
down the line. This information is hidden in the future behind a chain of
interactions, and extracting it requires interesting mental effort.
Information is hidden in players’ internal states.
Imagine how much easier chess would be if you could read your opponent’s mind, know his planned future moves, the vulnerabilities he has
perceived in your position, and the vulnerabilities he hasn’t perceived in
his own. This information is part of the game just as much as the positions of the pieces on the board, but it’s hidden.
The most powerful multiplayer experiences are often about divining
and exploiting internal information like this. Reading or controlling an
adversary’s mind is one of the most satisfying forms of victory.
Information can be hidden by speed.
The brain takes time to perceive, process, and use information. This
means that information that has arrived within the last fraction of a second
is effectively hidden from our decision-making process. We don’t decide
based on the information we perceive now, but based on the information
we perceived a tenth of a second ago.
www.it-ebooks.info

-- 140 of 415 --

DeCisions | 133
This is how we play rock-paper-scissors. Since both players throw at
the same time, neither one has time to use the other’s move in making his
own decision, even if one throws a few milliseconds earlier.
infoRmation BalanCe Case stuDy: PokeR
The history of poker is a perfect example of a design process swinging
back and forth through different types of information balance.
The first version of poker was almost purely a game of chance. Four
players anted up, and then each drew five cards from a 20-card deck. Each
player bet once, and hands were shown. If you had a good hand, you might
bet high. If not, you would either fold or try to bluff.
Old poker was information-starved. It lacked complex decisions because there wasn’t enough data to think on. Each player knew only the
contents of his own hand and the bets that had been made so far. With
just one betting round, this isn’t enough information to form coherent
strategies. So the game had a low skill ceiling because it was almost totally
random.
The Mississippi riverboat hustlers who played the game wanted it to
support a higher skill level so that they could fleece the tourists without
resorting to risky cheating methods. So they redesigned the game.
The first change was the switch to the 52-card English deck instead
of the old 20-card deck. Thirty-two additional cards vastly increased the
number of possible hands. That change alone, however, would have just
made the game even more information-starved since it increased the
number of possible hands without giving any more information to distinguish them. The more important change was the introduction of multiple
draw and betting rounds. Instead of placing one nearly blind bet, play now
went around the table several times. On their respective turns, each player
could throw away cards he didn’t want and draw new ones to replace them.
Then, the player could either fold or bet whatever amount he wished.
This multiround structure added a tremendous amount of information to the game. Now, players could respond to one another’s draws and
bets across betting rounds. By watching how someone drew and bet, they
could figure out what the other player was holding. This style of poker
survives today in the form of draw poker.
But even draw poker is still heavily luck-based. It’s not as blind as old
poker, but still leads to a lot of guessing and hoping. So the game kept
evolving.
www.it-ebooks.info

-- 141 of 415 --

134 | Designing games
During the Civil War, someone created stud poker, named after the
horses used to pull artillery. Stud poker didn’t allow drawing. Instead,
players were dealt cards one at a time, with betting rounds in between, and
three of each player’s cards were dealt face up for everyone to see.
Stud poker has a very different information balance than draw poker.
In draw poker, it’s hard to tell exactly what someone has by watching him
draw cards. A player who draws one card could be bluffing, trying to make
a pair, three-of-a-kind, a full house, or a flush. But in stud poker, players
got to watch one another’s hands form card by card. A good player could
guess the two hidden cards from the three visible ones and the changes
in someone’s betting patterns. You might see someone with four, five, and
six suddenly start betting high after drawing a particular card and guess
that he made a straight.
But the game’s information balance had swung too far. Now there was
an information glut. In many stud hands, it’s patently obvious who has the
best hand. Sometimes a winning hand is plainly visible in the three faceup cards. For example, there is no reason to bet against someone showing
a three-of-a-kind when you’re holding a pair, since you’re guaranteed to
lose. What might have been an interesting decision has been erased by an
information glut that handed you the answer for free. So the game kept
evolving.
In the mid-20th century, someone invented community card games. In
these games, as in stud poker, cards are laid down one by one between
betting rounds. The difference is that some of the face-up cards are shared
among players instead of being held by individuals. Texas Hold’em is a
modern example of this kind of game.
The community card mechanic finally hit a perfect point of information balance. The game rarely generates obvious or incomprehensible
choices. There is only a small amount of hidden information (two hidden
cards in Texas Hold’em) to keep track of, but that information is linked
closely to the community cards and players’ betting patterns. The face-up
cards can’t make winners obvious because everyone shares these cards—
if there are three aces face up, everyone has a hand with three aces. The
only question is who has another hidden pair, or the fourth ace, or a high
card? This perfect information balance means that nearly every hand generates fascinating decisions, giving just enough information to feed on,
but never so much as to make an answer obvious.
The basic mechanics of poker have mostly stayed the same over the
centuries. You get your hand, and you check, bet, or fold. But the game has
www.it-ebooks.info

---

## Sección 42: Foundations & Introduction

-- 142 of 415 --

DeCisions | 135
transformed itself several times over just by changing how it structures
and reveals information. By hitting the point of perfect information balance, it extracts as much meaning and emotion from every decision as
possible. And finding that point only took two centuries.
Problematic Information Sources
To analyze information balance, we have to know exactly what information players have while making a decision. But it’s often not obvious what
players will know or how they will know it, because information can be
revealed or hidden in unexpected ways.
fiCtional amBiguity
Fiction helps communicate with players by wrapping mechanics in familiar images and sounds. But there is a dangerous ambiguity in this process,
because no game mechanic completely simulates everything about its fictional wrapper.
Information from the fiction is often ambiguous because the player can’t
know which aspects of the fiction are real game mechanics and which
aren’t.
Imagine you’re playing a game and you see a roast turkey on a table.
What can you do with it? Can you pick it up, put it in a backpack, and carry
it around? Can you eat it, and if so, what does that mean in the game?
Can you sell it? Can you freeze it? Can you throw it somewhere to attract
animals, perhaps allowing you to sneak past? Can you hide a pistol inside
it? In real life, you can do any of these things and more with a roast turkey.
And various games have allowed each of these actions. But no game allows
all of them.
The problem is that the player has no way of knowing which of these
possibilities is real in a given game just by looking at the turkey. This
means he can’t predict any interaction involving the turkey because he
doesn’t understand the mechanical system it signifies. The image of the
turkey is just a symbol for an unknown game mechanic underneath.
This is an endemic problem in classic adventure games. For example,
one adventure game in the early 1990s had a puzzle that required sneaking past a guard. In the player’s inventory were some sticks, some string,
and some mud. The fiction implies a near-infinite number of ways to use
these tools to sneak past someone. You could throw mud in his eyes and
www.it-ebooks.info

-- 143 of 415 --

136 | Designing games
run past while he is blinded. You could throw a stick nearby and sneak
past while he looks at the noise. You could fashion a weapon and kill him.
This game required that the player combine the sticks, string, and
mud into a mask so that the guard doesn’t recognize him (seriously). While
this is possible in the game’s fictional wrapper, there is nothing special
about it among the thousands of other equally plausible ways you could
use these tools to get past a guard. The result is that the player approaches
the puzzle while information-starved. Since he is denied the mechanicslevel understanding needed to make the decision, his only option is to
exhaustively try every interaction available to him. The game collapses into
a rote exercise in random flailing.
Even good games have these problems. A more recent, critically acclaimed adventure game has a puzzle that tasks the player with waking up
a pilot who ejected from his plane, got his parachute hung in a tree, and
fell asleep. The problem is that the pilot has headphones on, so he can’t
hear anything. It being winter, some solutions are immediately obvious.
Make a snowball and chuck it at his face. Poke him with a long stick. Wait
until he wakes up naturally. Shake the tree. These all would work in the
fiction, but none of them works in the game. The real solution is to climb
into his crashed plane, twiddle some dials on the airplane radio until it
displays his frequency, then travel to a nearby radio station and transmit a
message through his earphones to wake him up. Again, it makes fictional
sense, but so do about a thousand other equally plausible solutions.
Puzzle design is the most obvious example of fiction-mechanics ambiguity, but it’s not the only one. Anything communicated through fiction
is vulnerable to this problem. Will that wooden plank protect me from
bullets? Will a fireball spell kill a person in one shot? Can I break that
glass? Can I open that door?
The solution is to take the puzzle out of the fiction. Instead, construct
puzzles out of well-understood mechanics.
Good game decisions, including good puzzles, are always based around
nonobvious uses of mechanics that work in obvious ways.
The player should know all the mechanics involved in a problem. The
decision is in figuring out how to use them to get to a solution.
For example, the Super Mario games have jumping puzzles. These are
arrangements of platforms and hazards over which Mario must jump to
get to some goal. But to do this, the player must find a good path. Finding
www.it-ebooks.info

-- 144 of 415 --

DeCisions | 137
this path is an interesting puzzle because the player can think through
the jumps without ambiguity or uncertainty since Mario’s jumping is consistent and comprehensible. This creates a rich puzzle-solving thought
process as the player’s mind spins through possibility after possibility.
And when he sees the solution, he’ll know it immediately and fill with a
rush of insight.
The exception to this guideline is when the decision itself only has
meaning in the fiction. A game can offer a moral or character choice that
is totally outside the game mechanics and only affects fictional elements.
In this case, fictional information can be used alone to make the decision
because the decision itself has no mechanical meaning—it works on a
purely make-believe level. But the moment the choice starts feeding back
into the game mechanics by changing stats or level paths or tool upgrades,
it becomes a different type of decision and needs to be fed by unambiguous mechanical information.
metagame infoRmation
Players have more information than what the game itself gives them. They
draw this knowledge, or metagame information, from outside the game
itself.
METAGAME INFORMATION is information the player gathers from the
real world outside the game.
Players know a lot about a game even before they begin play. They can
guess its length from genre convention. They know how hard it is because
their friends talk about it. They can predict NPC (Non-Player Character)
behavior and plot twists by watching for clichés or by knowing the habits
of the studio behind the game. They know the limits of computer technology, so they know the game will never put 10,000 characters on-screen
at once. They’ve seen the trailers and the box art, so they might know
key characters, themes, and plot points. None of this is inside the game
mechanics or the fiction, but players still know it, so it still affects their
decision process during play.
Metagame information can twist an experience by giving players information that the designer assumes they don’t have. Often this causes
information glut.
For example, in many games, players collect and use resources like
ammo and health. Often, the fiction implies that these resources should
www.it-ebooks.info

---

## Sección 43: Foundations & Introduction

-- 145 of 415 --

138 | Designing games
be very limited: the player character is trapped in a zombie-filled castle or
an alien-infested spaceship. In such a place, one would expect to go long
periods without finding a first-aid kit or ammunition. The fiction is claiming that it is going to starve the player. It threatens the player with unfair,
arbitrary death to make him feel afraid.
But is the game really as unfair as the fiction suggests? Usually not.
And the player’s unconscious knows it. The player knows that there will
never be an extremely long gap during which he won’t find any resources,
because that would break convention and feel unfair. He knows the game
won’t do something so mean because it was created for his entertainment.
This metagame information twists his mental process of thinking
about resource management. Now, instead of thinking in the terms defined by the game fiction, he’s thinking about designer habits and genre
conventions. He can guess when the next resource will appear because
he knows what’s fair, and he knows the game will play fair because it is a
game. This reduces tension and weakens immersion.
Metagame information problems are hard to see because their effects
are mostly internal. Like most information glut problems, they don’t break
the game entirely—they weaken it by distorting players’ internal thought
processes.
Different players have different metagame information. A game journalist has a massive vault of metagame information. A young child has
much less. Most players are somewhere in between. But even the most
naïve player will still know quite a bit. He knows that the game is played
with a certain interface, on a certain type of machine. It is confined to a
television screen or a game board. It was made by people from a certain
culture, who designed for the purposes of entertainment.
There are two basic ways to handle metagame information. One is
standard. The other is a little bit crazy.
The standard solution is to accept that it’s there and design systems
that still create the desired experience even given metagame information.
This means not trying to make the player be afraid of something he knows
can’t happen, or hope for something he knows is impossible. Threaten the
player with justifiable, fair, gamelike threats. Give him explicitly balanced,
attainable goals. Flex the fiction to work within the player’s metagame
information. Treat it as one more design constraint.
The crazy method is to call his bluff. Show the player that you’re not a
normal designer; that the rules don’t apply to you. Be unfair. Be arbitrary.
Break established technical limits.
www.it-ebooks.info

-- 146 of 415 --

DeCisions | 139
The crazy method is dangerous and difficult. Game conventions
exist for a reason. In most cases, it’s not a good idea to break them. At
the same time, there are experiences that can arise from unreasonable,
unfair threats and challenges that can’t be had any other way. For example,
System Shock 2 is terrifying because it doesn’t lie to the player. The game
is set in a massive, dead, monster-infested spacecraft. The fiction implies
that resources should be extremely limited, enemies numerous, and the
player shouldn’t have much of a chance at survival. And all of this is the
case. The game is actually unfair. A sloppy, careless player will be whittled
down until death. There are no fail-safe mechanisms. In some sense, it
sounds like bad game design. But it’s also wonderfully immersive, because
it means the mechanics mirror the fiction. The player feels starved and
trapped because he really is starved and trapped.
Decisions and Flow
The purpose of flow is to pull the player’s mind into the game. When we’re
not in flow, pieces of the real world constantly intrude on our consciousness. We feel our fingers pushing a button. We hear the clock ticking, or
dogs barking outside. We pause to go to the bathroom, take a drink, or talk
to a friend. All this is experiential clutter. It constantly gets in the way of
the experience that the game is seeking to create.
But when we’re in flow, the real world vanishes. Mind and game enter
into an unencumbered dance of action, reaction, decision, and outcome.
This means that flow is a foundation for good game experiences.
Problems that seem to arise in other areas of a design often come down to
nothing more than breaks in flow. Without flow, players feel and complain
about every annoyance. With flow, they’ll accept strange fictions, chunky
graphics, or unclear interactions. The most important design mistakes are
the ones that break flow, because they weaken the link between the player’s
mind and the game, interfering with every other part of the experience.
People talk about games as forms of escapism, and they are. But we
often assume that escapism is about fantasy—that we want to escape our
boring life by pretending to be a sorcerer or a race car driver. But does
anyone want to be a short, fat Italian plumber, or a jumping cube of meat?
No—yet Super Mario Bros. and Super Meat Boy still generate powerfully
escapist experiences. Because this form of escapism is about flow, not fiction. And it’s not driven by the fictional wrapping, but by the mechanics.
Earlier, we looked at how flow arises from a balance between ability and challenge. But that was the basic, simplified concept of flow. It’s
www.it-ebooks.info

-- 147 of 415 --

140 | Designing games
not enough to tell a game designer just to balance skill against challenge.
Real flow isn’t smeared with a big brush over a whole experience by the
measurement of these gross quantities. Rather, it’s a delicate dance of
moment-to-moment decision timing.
Imagine the player’s mind is a small cup with a hole in the bottom.
The game can place quantities of water into the cup. Maintaining flow
means ensuring that water is always draining through the hole, without
the cup ever overflowing. This means constantly putting more quantities
of water in, without ever putting in too much.
Those quantities of water are decisions. As soon as they enter the
mind, it starts working on them. Most last only moments. To keep the
mind flowing, we have to keep feeding it decisions at just the right rate.
Too little, and it drains out within seconds and boredom sets in. Too much,
and it overflows, breaking flow. To do this, we have to get the size and
timing of decisions just right.
DeCision sCoPe
DECISION SCOPE is the amount of thought a decision takes to make.
Decision scope is the “size” of a decision as it passes through the mind.
In the water and cup metaphor, it is the amount of water that this decision
puts into the cup. Complex decisions involving many variables are large in
scope because they can occupy the mind for a long time. Easy decisions
with just one or two variables are the opposite.
We can group decisions into five categories of scope. From smallest
to largest, they are nondecisions, twitch decisions, tactical decisions, profound decisions, and impossible decisions.
Nondecisions are decisions whose answers are so obvious that they
cease to be decisions at all. For example, when you make breakfast cereal,
you pour milk into it. The decision to pour milk into the cereal isn’t really
a decision because it only engages the mind in the most cursory way. It’s
such an obvious thing to do that you can do it by pure habit. When you
were a child, this might have been a decision. But today, the decision has
shrunk to nothing, leaving only a thoughtless action. Nondecisions like
this can keep the player’s fingers busy, but they don’t contribute to flow
since they don’t engage the mind.
www.it-ebooks.info

---

## Sección 44: Foundations & Introduction

-- 148 of 415 --

DeCisions | 141
Twitch decisions are the smallest meaningful decisions. They take less
than a second to think through, and require only simple conscious reasoning. Punch or kick? Reload now, or wait one more second? Look left or
look right? Jump or dodge? Twitch decisions are a common basis for flow
in games because they’re easy to generate. We don’t have to set up interesting, elegant systems of partially predictable cause and effect and have the
player think through them. We need only compress a simple choice into a
small time space. That’s why action games are often called twitch games—
they are based almost entirely on twitch decisions.
Tactical decisions are the next class of decisions. They require one
to five seconds of thought, and noticeably engage the player’s conscious
mind. Which equipment should I buy? Which units should I build? These
kinds of decisions involve more information than twitch decisions. A
player might consider the positions of multiple characters, and their abilities, conditions, and tools. He might even think back to the outcome of a
similar situation that took place earlier.
Profound decisions are the largest decisions, taking 10 seconds or
longer to make. Decisions this large use so much information that they go
beyond the game itself and draw from the player’s broader knowledge of
emotion, culture, and humanity. They push the player to look inside himself and scrape his thoughts, memories, and emotions for every fragment
of information he can find. When chess grandmaster Garry Kasparov
stares at a chessboard for a quarter hour, he is making a profound decision. He is putting all his knowledge from years of study to work. His
mind is swimming through knowledge of his opponent’s habits, hundreds
of possible future game states, recently discovered tactics and strategies,
previously made plans, examinations of his own judgment in the moment.
Profound decisions only arise from the most elegant, subtle, fascinating
game systems. Most games never present one.
Impossible decisions are beyond a player’s ability to understand. If a decision requires a subtlety or volume of knowledge that is totally beyond the
player, or the potential outcomes are vastly too numerous to understand,
the decision becomes noise. The player must be able to wrap his mind
around the decision and choose one path for comprehensible reasons,
with a coherent expectation of results. If he cannot, the decision is impossible and does not contribute to flow because the player will just choose
randomly.
www.it-ebooks.info

-- 149 of 415 --

142 | Designing games
Games can present decisions of any scope, or any mix of scopes. This
mixture characterizes the pacing and feel of play. A game packed with
massive numbers of tiny twitch decisions is a frenetic action game. A plodding march of profound choices is a slow strategy game. A game with one
near-impossible mind-bender is a puzzle.
Player skill changes the effective scope of decisions.
A decision that is profound for a novice is a nondecision to an expert.
As a player learns, a previously impossible decision might become profound, then tactical, then twitch, before finally becoming a nondecision.
This gives us another way to think about skill ranges: a game’s skill
range is the range of skill levels at which it frequently presents twitch,
tactical, or profound decisions. This means that its skill ceiling is defined
by the scope of its largest decisions. When a player learns enough that the
largest-scoped decisions in a game become nondecisions, he has passed
the skill ceiling. Nothing is going into the cup, so flow becomes impossible, and the player walks away.
The two characteristic ways that flow can break are when the cup runs
dry and when it runs over. Let’s look at each of them.
avoiDing flow gaPs
Flow is very short-lived. The most important part of maintaining flow is
generating that stream of decisions so that the cup stays full but never
overfills. Even the tiniest breaks in the pace of decision can degrade flow.
Players can feel the boredom of a gap of even one second. If there are
enough of these gaps, a smooth, flowing experience degrades into a stopstart exercise in frustration. I call these sorts of delays flow gaps.
A FLOW GAP is a period of time—whether a second or an hour—when the
player’s mind has nothing to chew on.
Flow gaps can emerge into an experience in a thousand ways.
For example, designers might decide to add a delay to a tool to balance
its power level. A wizard’s wand in a fantasy game might be configured to
only be able to cast thunder bolts once every two seconds. But while this
may balance the wand, it also introduces flow gaps if the player has nothing else to do between shots.
www.it-ebooks.info

-- 150 of 415 --

DeCisions | 143
Other times, flow gaps can appear due to fictional or aesthetic design
elements. Menu transitions, movement animations, and dialogue can all
block the player’s ability to act for a moment, creating a gap in the decision
stream.
This is a classic mechanics-fiction conflict, because it is caused by a
piece of art that looks good and enhances the game’s make-believe layer,
while weakening the mechanical decision-driving interaction of the game.
Obviously, the best solution is to find a design that both looks good and
sustains flow. But if a choice must be made, most games benefit more
from sustained flow than fancy menu transitions or animations. Because
while graphics look good the first time, flow feels good forever.
If a delay can’t be removed, we should find some way to introduce decisions into the gap to fill it. Sometimes this is as simple as making other
abilities available. The wizard’s rod may be recharging, but the player can
still move and attack with a knife.
Other times, we need more exotic designs to handle unusual situations. For example, many different games across genres have included
some sort of stun attack. Fantasy games have stunning spells, military
games have nonlethal stun grenades, Spiderman can throw a web on his
enemy, and a boxer can punch his opponent in the ribs to stun him. It’s
a good design because it combines elegantly with other follow-up attacks,
and it varies the pace of combat.
But there’s a problem with stuns: the victim gets a brutal flow gap.
The most naïve version of a stun is freezing the victim. But while this
makes fictional sense, and it may be fair, it’s an infuriating flow breaker.
The victim cannot make any decisions during the stun since he can’t act.
How do we solve this?
Different games have used a variety of methods to keep the essence of
stun without this side effect. For example, some games stun by interfering
with the victim’s controls while still allowing him to act. The stun grenade
in Modern Warfare 2 slows the player’s turning rate and makes his view
sway. This degrades his aim and makes it easy to attack him from the side,
but it still allows the stunned player to keep interacting and deciding. Old
arcade fantasy games used to model stun spells by scrambling all the player’s controls, so pushing up made the character move down and vice versa.
Again, the victim is affected, but can still act. The flashbang grenade in
Counter-Strike whites out the victim’s screen for several seconds, but leaves
his controls fully functional. This means that a blinded player can still
www.it-ebooks.info

---

## Sección 45: Foundations & Introduction

-- 151 of 415 --

144 | Designing games
play in a reduced capacity by remembering his positioning and listening
for footsteps. In each case, the stun is meaningful, but flow is preserved.
avoiDing oveRflow
An OVERFLOW is a moment where the player is overwhelmed by
decisions.
Overflows are more obvious than flow gaps. Whereas flow gaps create little
moments of boredom, overflow announces itself through complaining,
stressed playtesters. Since it’s so obvious, designers tend to correct it naturally by easing off the decision pressure. So I won’t cover overflows further
here. Watch for them, and reduce the decision pressure when they occur.
Overflows in finished games usually happen with players of lesser
skill. The designer might have reached a good rate of flow for the players
he tested with, but weaker players have a terrible time as they flail around
below the skill barrier. To some degree, this is inevitable. There are almost
always some players who are so unskilled that they can’t play. This is why
it’s a good idea to deliberately choose a minimum skill level and design
around that instead of trying to include everyone.
tuRn-BaseD DeCision PaCing
Up until now, I’ve discussed flow in terms of a real-time system. This
doesn’t apply to turn-based games because turn-based games allow players
to pace their own decisions. When faced with a large-scoped decision, players simply take a long turn. Given a small decision, they take a short turn.
This doesn’t, however, mean that turn-based game designers can
ignore decision scope—only that the consequences of doing it wrong are
different. In fact, two of the classic endemic problems in turn-based game
design can be described in terms of poorly scoped decisions.
Micromanagement happens where there are too many small-scoped
decisions. Players are forced to endlessly shuffle around tens or hundreds
of nearly meaningless tokens to optimize their performance. They end up
experiencing a flow gap, because the time it takes to move the tokens is
more than the time it takes to decide what to do. The game becomes about
the boring physical act of moving tokens instead of the mental dance of
decision making.
www.it-ebooks.info

-- 152 of 415 --

DeCisions | 145
Analysis paralysis occurs when decisions are scoped too large. Players
end up sitting and thinking for an excessively long time. Sometimes, as
in chess, this isn’t necessarily a problem. Other times, as in board games
with many players or games that are intended to have a faster pace, it’s an
experience killer.
DeCision vaRiation
While a game can hold flow with a long string of the same-scoped decisions appearing at the same rate, it’s a plodding, repetitive sort of flow. To
keep things interesting, we should spice things up with different decision
densities and scope. Don’t just feed the player a tactical decision every four
seconds for an hour at a time. Toss him a compressed sequence of twitch
decisions, followed by a profound mind-bender that allows as much time
as desired, followed by some five-second tactical decisions, and so on.
We can also vary decisions by flavor. Decisions of similar scope can
have a different qualitative flavor if their subject matter is different. For
example, in a strategy game, a tactical choice about how to move an army
may be roughly similar in scope to a decision about where to build a new
production structure. Repeating one of these decisions endlessly, however,
is less interesting than alternating between the two.
The classic pacing curve that I reference in Part 1 is one guideline for
this. Start out slow, go through several cycles of rising action interleaved
with troughs of calm, before finally spiking to a climax and falling into a
denouement.
But the standard intensity curve isn’t the only way to vary decision
pacing. Rich game systems are often too unpredictable to follow to the
standard curve all the time. Often they’ll climax several times at random
intervals, or have slow sections that seem too long on paper. Since we can’t
predefine decisions (because mechanics must generate them on the fly for
them to be systems-based and thus predictable), it’s hard to achieve that
traditional pacing formula every time. But that’s not a problem.
www.it-ebooks.info

-- 153 of 415 --

146 | Designing games
The only hard-and-fast rule of flow pacing is that it should vary. Neither
bore the player with long, slow periods, nor exhaust him with long, fast
ones.
It’s possible to do a rough decision-pacing analysis on a design that has
not been implemented. Just imagine playing the game as a player would.
You are emulating the game systems in a very inaccurate way using your
brain. Think about what’s going on, what you know, what you don’t know,
the decisions being presented, and the thought process required to make
those decisions.
But there’s a trick to this. The human mind will naturally skip to the
most interesting parts of any imagined or remembered story. This will
hide flow gaps. To think about decision pacing in a useful way, you must
go through every second of the experience in your mind in real time, without skipping anything. This isn’t natural or easy. It’s palpably uncomfortable to sit there and imagine every boring animation, loading screen, and
pointless button press. It feels weird to spend five minutes thinking about
a five-minute experience. But it’s essential to preserve time if you’re to gain
any useful knowledge about pacing. This process isn’t as good as playtesting the game, but it’s better than nothing and much, much easier.
Decisions Case Study: Counter-Strike
I first played Counter-Strike back in 1999, when it was just a Half-Life
modification made by two people. The gameplay was straightforward:
teams of special ops soldiers would fight it out with gangs of balaclavaclad terrorists. Once one team was eliminated or completed its objective,
everyone would reappear for another round. Players would gather money
for killing enemies or completing objectives, which they could use to buy
better weapons and armor in later rounds.
It was a good game. The standard pattern for good games is to get an
explosion of popularity which slowly tails off to nothing over a few years.
But that didn’t happen with Counter-Strike.
I stopped playing by 2001, but the community kept going.
Technologically advanced competitors like Unreal Tournament 2003 came
and went, but people kept playing Counter-Strike. Half-Life 2 came out,
and people kept playing Counter-Strike. The game got a graphical update,
www.it-ebooks.info

---

## Sección 46: Foundations & Introduction

-- 154 of 415 --

DeCisions | 147
and the years kept passing. The mega-hit Call of Duty 4 slammed into the
market in 2007, but, as you can guess, people kept playing Counter-Strike.
As of this writing, more than 13 years after its original release, CounterStrike is still the number one most-played game on the popular Steam PC
gaming service.
Why?
It’s not the fiction. There are many military games out there, some
successful, some not. No, the success that Counter-Strike enjoys is due to
its mechanics. It’s because of the game’s balance, pace, skill, and decisions. Let’s take a look at the decisions in a typical Counter-Strike match.
Counter-Strike generates decisions such as the following:
Should I reload now or later? What if the enemy comes around the
corner while I’m reloading? But what if I run out of ammo while I’m
fighting?
Should I move my position forward, backward, laterally, or not at all?
What if I get shot while I’m in between cover? But what if I lose because
I don’t make my objective? What if I get killed because I’m too far out in
front of my team? But what if the teammates covering the other entrance
are killed and I get shot in the back?
Should I buy a weapon now? What if I run out of money when I need
it later? But what if I die this round because I’m unarmed?
As in all skilled flow-sustaining games, these decisions appear constantly and at a rapid rate. A two-minute round might have 100 such decisions. The density is so high that we can’t practically analyze even minutes
of play in this game. To watch Counter-Strike work, we need to brake into
ultra-slow motion and examine a player’s thoughts second by second. In
this case, I’ll examine the first 20 seconds of a typical match.
Our player, Bob, joins a game. Bob doesn’t start playing immediately;
he must first watch the current round until it finishes. This allows him to
gather some basic information: the map is de_aztec, Bob is on the terrorist
team, and each team has five players. The scoreboard shows that his team
is losing. Watching the round finish up, he sees that the opposing team
has an expert sniper named Alice, who is dominating the Main Courtyard
area from its western edge.
www.it-ebooks.info

-- 155 of 415 --

148 | Designing games
Bob can only watch the game during this phase, but that doesn’t mean
he isn’t in flow. His hands are still, but like a chess master hunched over a
board, his mind is not. He’s deciding his strategy for the next round. This
is a profound decision. He notes his own team’s lack of countersniping
ability, his inability to afford a flashbang or a powerful weapon, Alice’s
likely future presence covering the Main Courtyard, his own particularly
high skill level at close combat, and many other factors. By the time the
round begins, he has decided.
Graphed out, his decision pace so far looks like this:
www.it-ebooks.info

-- 156 of 415 --

DeCisions | 149
On the timeline, we can see the strategy decision is large in scope by
its area. But it is stretched over a long time, so the decision pace is slow.
He had a lot of time, but the decision was so large in scope that it filled the
space, and there was no flow gap.
The next round begins. Bob appears with his team on the eastern side
of the map. He can only afford a cheap, short-ranged MP5 submachine
gun, so he knows he is at a disadvantage in open areas. As he already
decided to do, he takes the northern route across the bridge, because he
wants to avoid Alice, who he is guessing will attack the Main Courtyard.
Bob wants to flank her and use his close-quarters fighting skills to take her
down. If I can just get across the bridge alive, he thinks, I can hit Alice at close
range. I’m good at close-quarters combat, and her sniper rifle will be useless if
I’m right in her face.
Consider the information available to Bob at this point. He doesn’t
know how the other team is moving yet since they’re at the other end of
the level, behind walls. I’m going to assume they’ve split up and are taking
all their paths, he thinks. It’s unusual for a team to all use the same route.
He also isn’t sure of the intentions of his teammates. He prefers playing
with buddies since they can work out plans and respond to one another’s
intentions. But today he is playing on a public server known for its expert
players. All he knows about his teammates is that they are skilled. This
metagame information allows him to assume they’ll take optimal paths
and make their shots—but not much else. Finally, Bob sees a few teammates with long-range rifles, which indicates to him that they’ll attempt to
aggressively engage over the bridge or the Main Courtyard instead of, say,
hanging back and trying to ambush the enemy.
www.it-ebooks.info

-- 157 of 415 --

150 | Designing games
Three of Bob’s allies go through the Double Doors to the Main
Courtyard while one moves with Bob. Bob hears a gunshot. Looking at the
death announcement ticker, Bob gains new information: Alice killed one
of his teammates in the Main Courtyard. This doesn’t affect Bob’s plan;
it’s what he expected. So he continues on his flanking path.
Just as Bob is approaching the bridge, however, the death ticker tells
Bob that Alice was killed. The map in Bob’s head now looks like this:
Up until Alice died, Bob wasn’t deciding much. His strategy was set
before the round even started, so his mind was mostly at rest as he executed his plan. He was just running the route he had planned.
Now, though, circumstances have changed, and Bob’s mind springs
back into action. The pace of his thoughts revs up. His cup fills, though
not to overflowing. He takes in his circumstances.
www.it-ebooks.info

-- 158 of 415 --

DeCisions | 151
Bob sees that he is accompanied by only one other team member
in his flanking maneuver on the bridge—less than he hoped for, which
will make it harder to make it across the bridge into his preferred closecombat territory if there is resistance. Also, Alice’s sniping skills have been
removed from the equation, making his risky flanking plan pointless.
Bob knows that his dead teammate dropped a weapon superior to his own
somewhere in the Main Courtyard. It would be good to get that gun, he
thinks.
After a half-second of thought, Bob decides to abandon the bridge
route and join his teammates in the Main Courtyard. He reverses course
away from the bridge and passes through the large Double Doors. Here’s
what Bob’s decision pacing looks like right after the decision to reverse:
The low decision pace of his plan-following gave way to a large, compressed decision about changing plans.
As Bob enters the Main Courtyard, he surveys the scene. His two
teammates are 20 meters away, in open territory, as is the dead teammate.
Indeed, the dead friendly dropped an AK-47, a much better weapon than
Bob’s MP5. Bob wants it.
But a moment after Bob comes through the doors, his exposed teammates come under fire from remaining enemies along the western edge
of the Main Courtyard.
www.it-ebooks.info

---

## Sección 47: Foundations & Introduction

-- 159 of 415 --

152 | Designing games
Bob’s mind has been at rest for the four seconds since he reversed
course at the bridge. But now, his decision pacing spikes again.
He has just a moment to decide whether he wants to attempt to retrieve the AK-47 lying out in open territory. He wishes he knew more about
exactly who was shooting at him, and with what, but he doesn’t have time
to find out. It would take another second to observe the exact armaments,
facing, and movements of his enemies and allies. And Bob doesn’t have
another second, even though all this information is in front of him. So this
information is hidden by speed.
In an instant, Bob tries to look into the future, following each of his
potential options to a predicted conclusion. The outcomes are hidden
behind fuzzy cause and effect, but he can use his knowledge and skill
to see them, even if only in blurry, uncertain form. He feels a sense of
pleasure as his mind exercises its well-honed tactical skills.
www.it-ebooks.info

-- 160 of 415 --

DeCisions | 153
These are the outcomes Bob sees:
He could stay put and ignore the AK-47. This would keep him in cover,
but his teammates might die without his support, in which case he would
end up fighting four enemies with only one teammate and a weak MP5.
However, if his teammates win the engagement without him, Bob can
simply grab the AK-47 in safety afterward, putting him in a strong position for the rest of the round, as well as future rounds.
Alternatively, Bob could make a run for it and try to grab the AK-47.
Doing this could get him shot as he crosses the open areas of the Main
Courtyard. On the other hand, his appearance might distract the enemies
and give his allies time to make a kill, or Bob might get the AK-47 and be
able to join the fight.
This decision isn’t easy. Either choice could lead to disaster or triumph. It’s not a puzzle where you work out the solution; it’s a judgment
call. The decision is guided by Bob’s evaluation of exactly how likely and
how desirable the various outcomes are. This decision process crosses the
bounds of conscious and unconscious thought. Awareness and instinct
merge together into a deciding machine. It’s not just about what Bob
thinks about his options, because he has no time to think. It’s what his
emotional unconscious, conditioned by hours of practice, makes him feel
about those options. And one of those options feels better than the other.
So Bob decides to go for the AK-47.
I won’t trace a specific outcome to this situation further. Perhaps Bob
will die immediately, and his decision pacing would instantly fall to a slow,
strategy-deciding throb until the next round. In this case, he might experience one of the flawed outcomes of Counter-Strike’s design: time spent
dead between rounds can sometimes go on longer than players need to
decide their strategy for the next round, creating a long, dull flow gap.
Alternatively, if Bob doesn’t die, he might be entering a 10-second
period of frenetic battle. Decisions will come fast and furious, once or
more per second, as allies and enemies shoot, fall, or flee. If this decisionsaturated period went on much longer than 10 seconds, it might start
to get exhausting. But Counter-Strike’s high-decision-paced periods are
always quite short because the weapons are so deadly.
www.it-ebooks.info

-- 161 of 415 --

154 | Designing games
Assuming the battle continues, this is what Bob’s decision pacing will
look like:
Counter-Strike’s decision pacing is spiky and unpredictable. Play
swings between suspenseful hunting and wild shootouts, and there are
enforced rest periods between rounds. And the decisions are different in
scope and flavor, because they mix twitch shooting with tactical movement
and team strategy. Along with an unattainable skill ceiling, it’s this strong
mix of well-paced decisions which makes Counter-Strike such a sustainably compelling experience.
www.it-ebooks.info

-- 162 of 415 --
| 6
Balance
The small boy wanted the cookies. But they were always on the kitchen
counter, just out of reach.
He tried everything to get them. He crawled up the stool, but it fell
over. He attached string to toys and threw them. He faked illness, hoping
to get one by pity. He tried to make a deal with his big brother. He even
tried to train the dog to bring him a cookie. Nothing worked.
After each failure, his mind worked harder on new solutions. The
quest for the cookies became his focus in life. Every failure became a
fascinating new problem. Failure made him stronger, smarter, cleverer.
One day, someone knocked over the jar and a cookie fell to the floor.
The boy ate it, went to his room, and did nothing. The cookie hadn’t filled
him up. It had emptied him out.
BALANCING means adjusting game mechanics to change the relative
power of different tools, units, strategies, teams, or characters.
Sometimes balancing just means changing numbers. A designer might
decrease the tire traction of a car to make it worse at cornering, or increase
the speed of an arrow to make it more effective. Games have thousands of
numbers that can be tuned like this—speed, price, mass, health, damage,
energy, and so on.
But balancing can also require more fundamental changes than knob
twisting. A designer might remove the sorcerer’s shield ability to make
him easier to attack with archers, or take the nitrous oxide boosters off a
certain vehicle to compensate for its high engine power.
This chapter covers balancing—why we do it, why it’s hard, and ways
to do it well.
www.it-ebooks.info

-- 163 of 415 --

156 | Designing games
Goals of Balance
The word balance is one of the most abused terms in game design. People
will call a game balanced when it seems fun, or imbalanced when it seems
unfair. But lumping all these ideas into one word confuses the method
with the goals.
Balancing is a method. It means changing the relative power of different game mechanics. This method can be used to pursue almost any goal.
Fictional coherence, clarity, simplicity, and elegance can all be improved
by balancing. For example, a designer might reduce the health of a beggar
to emphasize his fictional frailty, or increase the speed of a jet to clarify
its role.
But among all the different goals that balance can achieve, two stand
above the others. They are fairness and depth.
These goals are so associated with balancing because balancing is the
key method of achieving them. Other design goals are mostly achieved in
other ways. We tell a story with art or writing, and we make games clear
with good interface design. But to achieve fairness and depth, we must
balance.
BalanCing foR faiRness
A game is FAIR when no player has an advantage at the start of play.
We pursue fairness because it lets players feel that their wins and losses
are legitimate. In competitive games, players want to know that their wins
mean they were really better than the other player. If the game itself is
unfair, the competitive ritual is meaningless because it reveals nothing
about the people involved. The loser can complain that he only lost because
the game was unfair, and the winner doesn’t get the satisfaction of an
incontrovertible win.
Some kinds of games are automatically fair because players start in the
same situation. This kind of game is called symmetric because each side is
exactly the same. For example, hockey is symmetric because both teams
start in the same positions and are subject to the same rules. Hockey is
automatically fair because the only difference between the teams is inside
the players themselves. When designing a symmetric game, fairness is
not a concern because it is automatic.
But truly symmetric games are unusual. Most games are asymmetric.
In these games, players can start in different situations. For example, in
www.it-ebooks.info

---

## Sección 48: Foundations & Introduction

-- 164 of 415 --

BalanCe | 157
a fighting game, players might use different characters with different attacks. In chess, white goes first. And in StarCraft, players can choose to
command armies of different species. Such asymmetric games are not
guaranteed to be fair the way symmetric games are. To make them fair (or
at least fair enough to satisfy), they must be carefully balanced.
It might seem like just making a game symmetric is an easy way to
achieve balance. But often, asymmetry is an inherent part of the game.
Someone has to go first in chess. Players of the game Risk must have different starting territories on an asymmetric world map. In a World War II
game, someone has to play the Axis and someone has to play the Allies.
Often, symmetry isn’t an option.
There is also a third option besides symmetry and balanced asymmetry. We can create asymmetric games that are deliberately unfair. This
approach loses any sense of competitive legitimacy, but it unlocks unique
experiences that can’t be had in a fair game.
For example, many historical war games have unfair scenarios because
their players are more interested in exploring history than in competing.
They want to find out whether the German army could have won from its
disadvantaged position at the Battle of the Bulge, or if the Japanese could
have held Iwo Jima. Such games must be unfair because historical battles
were unfair.
Other times, designers use unfairness because it creates wild stories
and funny interactions more often than honest competition. For example,
the classic board game Cosmic Encounter equips every player with wacky,
unfair powers because the game is designed to generate humor and, as
designer Peter Olokta said, “Fair isn’t funny!” So there aren’t any competitive Cosmic Encounter tournaments—but the game is bloody hilarious.
BalanCing foR DePtH
I’ve described depth as the property of a game that makes it provide meaningful play at high skill levels. Balance is essential in depth. Because for a
game to be deep, it must generate decisions that are so balanced that even
experts aren’t sure of the best answer.
For example, imagine that the hero in a swords-and-sorcery fantasy
game encounters a murderous ogre. The hero has two options: he can
attack with his sword, or he can cast a spell to set the ogre on fire. The
sword would cause a lot of immediate damage, while the spell would do
small, repeated amounts of damage over time as the ogre burns. Which
does he choose?
www.it-ebooks.info

-- 165 of 415 --

158 | Designing games
If either option is obviously more powerful overall—for example, if
the sword did more damage than the fire could do in 10 minutes—the
answer would be obvious, and the decision would become a nondecision.
For this decision to be meaningful, the player’s different options must
be balanced so that the best answer isn’t obvious. In this case, a designer
might have the sword do more damage overall if the fight lasts less than 30
seconds, while the fire does more damage if it continues to burn for more
than 30 seconds. Now the player doesn’t just choose the obvious answer.
He has to guess whether the fight should be more or less than 30 seconds
long. Guessing the future like this is an interesting and emotionally meaningful thought process.
Some people treat this sort of balancing as though it’s about matching
different tools against one another in some vague measure of power. They
try to balance the sword, the flame, and every other tool so that they’re all
basically equal. But this approach doesn’t work because it misconceives the
goal of this kind of balancing. Our goal isn’t to balance the tools. That’s
impossible, because every tool has different levels of usefulness in different situations and combinations with other tools. The fire might be great
against the ogre, but useless against a crowd of weak goblins. The sword
might be good against the goblins, but poor against the ogre. So which is
better? Without context, such comparisons are meaningless.
Our real goal is to balance the strategies among which the player
chooses in any given situation.
STRATEGIES are specific combinations of actions that players can
decide to take in pursuit of a goal. A game’s decisions become richer
when the thought process required to find the best strategy is more
nuanced.
So, in the fantasy ogre example, we’re not really balancing the fire
spell against the sword. We’re balancing the choice between these two
strategies in this particular situation against this particular ogre.
A simple strategy might mean using a single tool to solve one problem. For example, if your opponents were advancing with cavalry, a good
counterstrategy would be to place your spearmen in front of your army.
Since charging horses don’t do well against entrenched lines of long pointy
sticks, your strategy is effective. You’ve used one of your tools against one
of their tools to achieve one goal.
www.it-ebooks.info

-- 166 of 415 --

BalanCe | 159
But strategies can also be astonishingly complex. These kinds of strategies aren’t single actions—they’re nuanced sets of contingencies. They
depend on synergies among multiple tools in specific circumstances, and
are customized against certain combinations of opposing strategies. For
example, an expert will see an enemy army with cavalry on the right side,
archers on the left, and spearmen in the back. He will respond by feinting his cavalry toward the enemy archers while rushing his spearmen up
the center. He’s thinking through several contingencies: if the enemy’s
archers stand and fire at his spearmen, his cavalry can charge them. But if
the enemy has his archers flee and sends cavalry in response, our expert
might be able to trap them on the field with his spearmen.
When we balance strategies against each other, we make for a richer
play experience because all the player’s decisions involve more nuanced
thinking about more variables. The game becomes deeper because these
complex thought processes can’t be executed perfectly, even by very skilled
players.
BalanCing foR otHeR Reasons
The core of balance is generating fair play and nuanced decisions. But
even if a balance change creates wonderfully rich decisions and perfectly
fair play, it’s worthless if it destroys narrative coherence, flow and pacing,
accessibility, or clarity.
For example, we can’t balance an archer’s bow by giving it a 10-foot
range. This might be fair, and it might create fascinating strategic decisions, but it wouldn’t make any sense in the fiction layer. We can’t balance
a jumping puzzle by making the player character’s jump shorter in this
level only, because this would defy player expectation and create frustration. We can’t balance a car in a driving game by makin
