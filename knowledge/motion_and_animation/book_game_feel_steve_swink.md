# 📚 Libro Completo: Game Feel: A Game Designer's Guide to Virtual Sensation

**Alcance:** Fuente bibliográfica completa sobre Interactividad en Tiempo Real, Respuesta Táctil/Visual, Física de Control y Pulido ("Juice") (Game Feel: A Game Designer's Guide to Virtual Sensation — Steve Swink). Aplicable a la Software Factory Web y DiggityBets. NO sustituye los contratos de API de Kick ni las reglas específicas de negocio en `CANON_*`.

> **Autor:** Steve Swink  
> **Dominio:** Interactividad en Tiempo Real, Respuesta Táctil/Visual, Física de Control y Pulido ("Juice")  
> **Archivo Fuente:** `2-game-feel.pdf`  
> **Páginas Originales:** 377  
> **Secciones Extraídas:** 49  
> **Fecha de Ingesta:** 2026-10-19  

---

## Sección 1: Foundations & Introduction

-- 1 of 377 --

Game Feel

-- 2 of 377 --

Morgan Kaufmann Game Design Books
Better Game Characters by Design (9781558609211)
Katherine Isbister
Game Design Workshop, Second Edition (9780240809748)
Tracy Fullerton
The Art of Game Design (9780123694966)
Jesse Schell
Game Usability (9780123744470)
Katherine Isbister & Noah Schaffer (Eds.)
Game Feel (9780123743282)
Steve Swink

-- 3 of 377 --

Game Feel
A Game Designer’s Guide to
Virtual Sensation
Steve Swink
AMSTERDAM • BOSTON • HEIDELBERG • LONDON
NEW YORK • OXFORD • PARIS • SAN DIEGO
SAN FRANCISCO • SINGAPORE • SYDNEY • TOKYO
Morgan Kaufmann Publishers is an imprint of Elsevier

-- 4 of 377 --

Morgan Kaufmann Publishers is an imprint of Elsevier.
30 Corporate Drive, Suite 400, Burlington, MA 01803, USA
This book is printed on acid-free paper.
© 2009 Elsevier, Inc. All rights reserved.
Designations used by companies to distinguish their products are often claimed as trademarks or
registered trademarks. In all instances in which Morgan Kaufmann Publishers is aware of a claim, the
product names appear in initial capital or all capital letters. Readers, however, should contact the
appropriate companies for more complete information regarding trademarks and registration.
No part of this publication may be reproduced, stored in a retrieval system, or transmitted in any form or
by any means—electronic, mechanical, photocopying, scanning, or otherwise—without prior written
permission of the publisher.
Permissions may be sought directly from Elsevier’s Science & Technology Rights Department in Oxford,
UK: phone: (44) 1865 843830, fax: (44) 1865 853333, E-mail: permissions@elsevier.com.
You may also complete your request online via the Elsevier homepage (http://elsevier.com), by selecting
“Support & Contact” then “Copyright and Permission” and then “Obtaining Permissions.”
Library of Congress Cataloging-in-Publication Data
Swink, Steve.
Game feel: a game designer’s guide to virtual sensation/Steve Swink.
p. cm.
Includes index.
ISBN 978-0-12-374328-2 (pbk. : alk. paper) 1. Computer games—Programming. 2. Computer
games—Design. 3. Human-computer interaction.
I. Title.
QA76.9.H85S935 2009
794.8’1526—dc22 2008035742
ISBN: 978-0-12-374328-2
For information on all Morgan Kaufmann publications,
visit our Web site at www.mkp.com or www.books.elsevier.com
Printed in the United States of America
08 09 10 11 12 13 10 9 8 7 6 5 4 3 2 1

-- 5 of 377 --

Dedication
For people who struggle and make beautiful things

-- 6 of 377 --

This page intentionally left blank

-- 7 of 377 --

vii
TABLE OF CONTENTS
Acknowledgments............................................................................................................................................ix
About the Author ..............................................................................................................................................xi
Introduction.......................................................................................................................................................xiii
1. Defining Game Feel..................................................................................................................................1
2. Game Feel and Human Perception................................................................................................. 35
3. The Game Feel Model of Interactivity............................................................................................ 61
4. Mechanics of Game Feel ..................................................................................................................... 69
5. Beyond Intuition: Metrics for Game Feel....................................................................................... 81
6. Input Metrics..........................................................................................................................................101
7. Response Metrics .................................................................................................................................119
8. Context Metrics.....................................................................................................................................139
9. Polish Metrics.........................................................................................................................................151
10. Metaphor Metrics.................................................................................................................................171
11. Rules Metrics ..........................................................................................................................................179
12. Asteroids..................................................................................................................................................187

-- 8 of 377 --

viii
13. Super Mario Brothers..........................................................................................................................201
14. Bionic Commando...............................................................................................................................229
15. Super Mario 64 ......................................................................................................................................247
16. Raptor Safari...........................................................................................................................................277
17. Principles of Game Feel......................................................................................................................297
18. Games I Want to Make........................................................................................................................311
19. The Future of Game Feel ..................................................................................................................321
Index ............................................................................................................................................................345
TABLE OF CONTENTS

---

## Sección 2: Foundations & Introduction

-- 9 of 377 --

ixix
ACKNOWLEDGMENTS
I would like to thank the following people.
Mom & Dad, for their unwavering support of everything I do, ever. It must be
exhausting. Special thanks to Dad for taking on the role of second editor, donating
hours and hours to proofreading, editing, writing first-pass chapter summaries and
helping me wrangle ideas. I love you guys. Thank you so much for being who you
are. It gives me a standard to aspire to.
Amy Wegner, for unflinching honesty in editing and for putting up with me
throughout the months of craziness. Guess it’s my turn to do the laundry, bake
cookies, do the dishes, take out the dog. Thank you for everything.
Beth Millett, for being a kickass editor and for being the other person who had to
put up with my craziness.
Matthew Wegner, for help with the Raptor Safari, for many inspiring ideas about
game feel, and for being the stable foundation of Flashbang. You make everyone
around you better, smarter, faster and happier. We appreciate it, even if we don’t
tell you so as much as we should.
Mick West, for inspiring me to think about game feel at a deeper level. It was
his article “Pushing Buttons” for Game Developer magazine that convinced me
this would be a subject worth writing an entire book about, and he has graciously
offered me feedback and guidance when I asked for it. He is the true master of
game feel. If you’re looking for someone to make your game feel better than anyone
else can, ask him. I doubt he’ll say yes, but there it is.
Allan Blomquist, for building pixel-perfect clones of old games and helping me
understand how they work. Without Allan, the book would be much shorter.
Derek Daniels, for the brilliant insights about the role of animation in game feel
and the importance of hard metrics for game feel. I hope you write a book someday.
Shawn White, for helping me with technical details about platformer games. You
truly are the Captain of Rats.
Matt Mechtley, for additional help with technical stuff and for the fantastic attitude. I hope you someday meet and woo fast women. It must be plural.
Adam Mechley, for proofreading and helping me to achieve syntactic perfection.
Kyle Gabler, for being brilliant and inspiring, and for helping me understand the
importance of sound and its role in game feel. I hope I can someday be half as good
a game designer as you are.
Ben Ruiz, for making me laugh and smile always. You provide a constant
reminder why we do what we do.

-- 10 of 377 --

ACKNOWLEDGMENTS
x
Jon Blow, for inspiring everyone to make better games and for teaching me about
proxied embodiment.
Kellee Santiago and Jenova Chen, for making beautiful things and for taking the
time to talk to me about how.
Chaim Gingold, for making brilliant things and for taking the time to talk to me
about how.
Katherine Isbister, for the encouragement and opportunity to write a book.

-- 11 of 377 --

xixi
ABOUT THE AUTHOR
Steve Swink is an independent game developer, author and lecturer currently
based in Tempe, Arizona. As a game designer and partner at Flashbang Studios,
he’s contributed to games such as Off-Road Velociraptor Safari, Splume, Jetpack
Brontosaurus, and Minotaur China Shop. Before joining Flashbang, he toiled in the
retail game mines at Neversoft and the now-defunct Tremor Entertainment. He also
co-chairs the Independent Games Festival, is an IGDA Phoenix chapter coordinator, and teaches the game and level design classes at the Art Institute of Phoenix.
He sometimes forgets the importance of sleeping every night, not just some.

-- 12 of 377 --

This page intentionally left blank

-- 13 of 377 --

xiii xiii
William Higinbotham’s Tennis (1958) is also a contender, but Spacewar! was the first to have something approximating modern game structure—rounds, scoring and so on.
INTRODUCTION
Close your eyes for a few seconds and imagine yourself playing Super Mario
Brothers.
What did you imagine? The visuals? The colors? The iconic sounds of coin collecting and the Mario theme music? How about the sensation of moving Mario left and
right, of jumping, colliding with blocks, stomping Goombas? What does it feel like
to control Mario? Go watch someone unfamiliar with games—your mom, perhaps—
try to play a game like Rad Racer. If it’s a game which requires real-time control,
she’ll be leaning left and right in her chair, pulling the controller, trying to get the
car to move just a bit farther, a bit faster. Ever seen someone do this? Done it yourself? This feeling of steering—this tactile, visceral sensation—is game feel.
For the purposes of this book, “feel” is meant in a very specific sense relevant to
the experience of playing video games. Feel is not meant in the thematic sense (a
Western feel, a Baroque feel) or in the expressive, emotional or physical sense (I feel
sad, I feel pain, this place feels creepy). Specifically, game feel is the tactile, kinesthetic sense of manipulating a virtual object. It’s the sensation of control in a game.
In digital game design, feel is the elephant in the room. Players know it. Designers
know of it. Nobody talks about it, and everybody takes it for granted. It’s not hard
to understand why; if a game designer’s done his or her job correctly, the player will
never notice the feel of a game. It will just seem right. In this sense, game feel is an
“invisible art,” like cinematography. Feel is the most overlooked aspect of game
creation; a powerful, gripping, tactile sensation that exists somewhere in the space
between player and game. It is a kind of “virtual sensation,” a blending of the visual, aural and tactile. In short, it is one of the most powerful properties of humancomputer interaction.
Recently, I had the opportunity to play Spacewar!, the world’s first video game1
at the “Game On!” exhibit at the Tech Museum, in San Jose, California. What struck
me is just how compelling the game still is. It’s easy to imagine the breathless
enthusiasm of the young technicians crowding around their PDP-1 supercomputer,
exhausting hours of valuable computing time on endless rounds of Steve Russell’s
creation. Even today, as a product of a video game culture, having played hundreds
of games, it feels great to me to steer the little rockets, fire off missiles and avoid
black holes. Game feel has been with us since the beginning.

---

## Sección 3: Foundations & Introduction

-- 14 of 377 --

INTRODUCTION
xiv
It may be easy to bring to mind, but game feel is difficult to understand. Games
are a nascent and complex medium, one which incorporates many previous forms.
A single game might include painting, music, cinematography, writing and animation.
If that weren’t enough, video games represent an unprecedented collaboration
between creator and consumer. We abdicate authorial control to our players and
get … something. We’re not quite sure what yet, but we know that it has potential.
To many, interactivity seems to be the most important medium of the 21st century.
It’s surprising, then, that the luminaries of digital game design have devoted little ink to the phenomenon of feel. In Rollings and Morris, any mention of feel is
conspicuously absent. Salen and Zimmerman dance tantalizingly close to discussing feel, but take a more holistic approach, focusing on game state at the higher
intervals where scoring and more traditional strategic considerations occur. Chris
Crawford’s revered work, The Art of Computer Game Design, devotes only a sentence to game feel, saying “The input structure is the player’s tactile contact with
the game; people attach deep significance to touch, so touch must be a rewarding
experience for them.”
With due respect to these authors and all the great stuff they have taught us,
what’s missing is an appreciation of just how unique and beautiful an aesthetic
game feel truly is. It exists outside of video games—driving cars, riding bikes and so
on—but nowhere is it so refined, pure and malleable.
In addition, game feel is moment-to-moment interaction. If we examine the
functional underpinnings of most video games, there is usually game feel at the most
basic level. It has greater importance in certain games but it’s always there. As a percentage of activities in the game, it’s what you spend most of your time experiencing. If you break down all the activities of a game, it’s the biggest slice of the pie.
This book is about examining feel in greater detail. Where does it come from?
How is it created? Does it exist in the computer, the player’s mind or somewhere in
between? What are the different kinds of feel and why do they feel the way they do?
In a clear, non-technical style intended to be accessible to professionals, players and
aspiring designers alike, we will investigate feel as experienced by players, created by
designers and measured by psychologists. The goal is to create a comprehensive guide
to game feel: deconstructing it, classifying it, measuring it and creating it. By book’s
end you will have the tools to measure, master and create exemplary game feel.
About This Book
This book is about how to make good-feeling games. In many ways, it’s the book
I wanted when I first started designing games. So many creative ideas rely on a
foundation of good-feeling controls. It should be a given that we can always create
controls that feel good. We shouldn’t have to start from scratch every time.
This book constructs a foundation of understanding and then builds on it,
addressing at each step a particular gap in the knowledge base about game design.
Figure I.1 shows the structure and flow of the book’s topics.

-- 15 of 377 --

xv
www.game-feel.com
To get the most out of reading Game Feel, I recommend going to www.game-feel.com,
the companion website to this book. For many of the chapters, I’ve provided playable examples that will allow you to experience first-hand the ideas being discussed.
In addition, the website contains interviews on the subject of game feel with folks
like Kellee Santiago and Jenova Chen of thatgamecompany, Kyle Gabler of 2dBoy,
and Johnathan Blow and Chaim Gingold of Number-None and Maxis, respectively.
If you’re a student, the definition at the beginning will be interesting and relevant, but the real meat will be the examples. In the examples you can see all the
tiny decisions and particulars of implementation that go into making games feel the
way they do. This is the palette of game feel; if you want to make good-feeling
games, these are the details you need to understand.
If you’re a game designer, the definition stuff will not be news to you. But some of
the theory bits may be useful and applicable, if only to better understand the deeper
physiological phenomena. The examples will be useful because of the legwork I’ve
already done—you can reverse engineer games yourself, probably, but it takes a lot
of time. The principles of game feel may also be a useful way to think about building games. It’s one way, at any rate, to which you can compare your own methods.2
If you’re an educator, the theory and definition pieces form a solid basis for
understanding game feel at a conceptual level. In addition, the examples provide a
great way to illustrate the complexities of making good-feeling games without forcing students to program the games themselves from scratch. The most useful part,
INTRODUCTION
Which, by the way, I’d love to hear about. Email me at sswink@flashbangstudios.com.
F I G U R E I.1 The structure and flow of the book.

-- 16 of 377 --

INTRODUCTION
xvi
however, will probably be the principles of game feel chapter, which lays out some
guidelines for creating good-feeling games.
If you’re someone interested in the medium of games, such as a journalist, the
definition parts may provide a new perspective on genres. In addition, understanding
the physiological thresholds that cause game feel to be sustained or break down
may help explain why frame rate drops and other technical disturbances make
games feel so much worse. But my hope is that in understanding and being able
to measure things like frame rate and response time, you will be able to do a better
job of separating medium from message. Yes, a developer is to blame if a game runs
poorly. But I think this consideration is given too superlative an emphasis when
games are critiqued. The experience of playing a game may still have some things
to offer from a critical standpoint—as Jurassic Park: Trespasser did—even if they are
technically incompetent.
What Is Game Feel?
One obstacle to understanding game feel at a deeper level is definition. This section
offers a simple three-part definition of game feel based on the ways players experience it and game designers design it.
Each of the three parts of the definition is expanded to make it useful for classifying games as well as understanding what game feel is. Expanding the definition
requires an exploration of some of the ways people perceive things, including measures for frame rate, response time and other conditions necessary for game feel to
occur. These physiological thresholds and concepts of perception combine to form
the “game feel model for interactivity”—a complete picture of the ongoing process
of game feel.
The section ends by applying the definition to some games specifically chosen
because they are on the fringes of game feel.
Metrics for Game Feel
Another problem facing game designers is meaningful comparison. How does the
feel of Halo compare to the feel of Ikaruga? From a designer’s perspective, this is
tied to tuning. Why is one game “floaty” while another is “tight and responsive”? If
a player tells me that my game is floaty, what should I do? How should I change the
variables of my complex system? Is floaty bad? Is it good? What does it mean?
This section is about measuring the pieces of the game feel process that a
designer can change. By measuring each piece—input, response, context, polish,
metaphor and rules—we can make generalizations about what terms like floaty,
tight, smooth, responsive and loose mean. Not only in a particular game, but across
different games. Once we can measure game feel, we can master it.

---

## Sección 4: Foundations & Introduction

-- 17 of 377 --

xvii
Practical Examples
The metrics we developed in Section II are applied to specific games, providing
comprehensive analysis of how the feel of these games function and providing
a template for creating games with similar feel. This section will give you clear,
practical steps for creating a game that feels a particular way. In addition, I have
constructed playable and editable examples for each game (find them at www.
game-feel.com) so you can follow along and experience how the feel of each game
changes and grows.
Principles of Game Feel
What principles, if followed, will make all games feel better? This section generalizes the lessons of the good-feeling examples and measurable pieces of game feel
into a set of best practices for game feel.
The Future of Game Feel
This section uses the lessons and definitions of the previous chapters to examine
the input devices, rendering technology and thought problems that will define how
game feel will be used in the future. With deep, expressive interactivity, can we provide experiences which don’t require the backdrop of skill and challenge? Is it possible to express things spatially without competition? Could game feel be a form of
deeply personal expression like dance or martial arts?
INTRODUCTION

-- 18 of 377 --

This page intentionally left blank

-- 19 of 377 --
CHAPTER
Defining Game Feel
There is no standard definition of game feel. As players and game designers, we
have some beginnings of common language, but we have never collectively defined
game feel above what’s necessary for discussing a specific game. We can talk about
the feel of a game as being “floaty” or “responsive” or “loose,” and these descriptions may even have meaning across games, as in “We need to make our game feel
more responsive, like Asteroids.” But if I ask 10 working game designers what game
feel is—as I did in preparation for writing this book—I get 10 different answers. And
here’s the thing: each of these answers is correct. Each answer describes a different
facet, a different area, which is crucial to game feel.
To many designers, game feel is about intuitive controls. A good-feeling game is
one that lets players do what they want when they want, without having to think too
much about it. Good game feel is about making a game easy to learn but difficult to
master. The enjoyment is in the learning, in the perfect balance between player skill
and the challenge presented. Feelings of mastery bring their own intrinsic rewards.
Another camp focuses on physical interactions with virtual objects. It’s all about
timing, about making players really feel the impact, about the number of frames
each move takes, or about how polished the interactions are.
Other designers insist that game feel is all about making the players feel as though
they’re really there, as though they’re in the game. All their efforts go into creating
a feel that seems more “realistic” to players, which somehow increases this sense of
immersion, a term that is also loosely defined.
Finally, to some designers, game feel is all about appeal. It’s all about layering
on effect after careful effect, polishing every interaction—no matter how trivial—
until interacting with the game has a foundation of aesthetic pleasure.
The problem is unity. How do these experiences become a cohesive whole?
They all tell us something about game feel, but they do not help us define it. St.
Augustine’s comment about defining time comes to mind: “What then is time? If
no one asks me, I know what it is. If I wish to explain it to him who asks, I do not
know.”
Game feel is the same way. Without close examination, we know what it is. Try
to define it and the explanation quickly unravels into best practices and personal
experiences.
ONE

-- 20 of 377 --

CHAPTER ONE • DEFINING GAME FEEL
This book is about how to make good-feeling games. But first we need to be
clear about what game feel is. We need to separate medium from content. We need
a definition that enables us to separate the conditions that are necessary for game
feel from the judgments that make a game feel a certain way.
What is the underlying phenomenon, apart from our own experiences and
the craft knowledge of building games? What are the building blocks? Just what is
game feel?
The Three Building Blocks of Game Feel
Game feel, as experienced by players, is built from three parts: real-time control,
simulated space and polish.
Real-Time Control
Real-time control is a specific form of interactivity. Like all interactivity, it includes
at least two participants—in this case the computer and the user—who come
together to form a closed loop, as illustrated in Figure 1.1, the concept couldn’t be
simpler.
The user has some intent, which is expressed to the computer in the form of the
user’s input. The computer reconciles this input with its own internal model and
outputs the results. The user then perceives the changes, thinks about how they
compare to the original intent, and formulates a new action, which is expressed to
the computer through another input.
F I G U R E 1.1 Interactivity involves the exchange of information and action between at least
two participants.

-- 21 of 377 --
In his book, Chris Crawford on Game Design, game designer Chris Crawford
likens this process to a conversation, a “cyclic process in which two active agents
alternately (and metaphorically) listen, think and speak.”
The conversation in Figure 1.2 begins when one participant, Bob, speaks. The
other participant, Bill, listens to what was said, thinks about it, formulates a response
and speaks in return. Now it’s Bob’s turn to listen, think and speak, and so on. In
Crawford’s model, a computer replaces one of the participants, “listening” to the
player’s input via the input device, thinking by processing that input and changing
system state and “speaking” via the screen and speakers (Figure 1.3).
THE THREE BUILDING BLOCKS OF GAME FEEL
F I G U R E 1.2 Interactivity as a conversation.
However, the metaphor of a conversation between human and computer doesn’t
fit all situations. Real-time control is not like a conversation. It’s more like driving a car. If a driver wants to turn left, it’s more action than thought. He turns the
wheel in the corresponding direction, using what he sees, hears and feels to make
small corrections until the turn is complete. The process is nearly instantaneous.
The “conversation” takes place in minute increments, below the level of consciousness, in an uninterrupted flow of command. The result of input feels as though it is

---

## Sección 5: Foundations & Introduction

-- 22 of 377 --

CHAPTER ONE • DEFINING GAME FEEL
perceived in the same moment it’s expressed. This is the basis of game feel: precise,
continuous control over a moving avatar.
This is a starting point for our definition of game feel:
Real-time control of virtual objects.
The problem with this definition is context. Imagine a ball suspended in a field of
blank whiteness. How would you be able to tell if it were moving? Without the
backdrop of space to move through, there can be no motion. More importantly,
there can be no physical interaction between objects. For the sense of interacting
physically with the game world, there needs to be some kind of simulated space.
F I G U R E 1.3 The conversation between human and computer.
Playable Example
If you’re near a computer, open game feel example CH01-1 to experience the
necessity of context. This is a first-person shooter game. Use the WASD keys to
move around and the mouse to aim. Can you feel the motion? No? Now press
the “ 1 ” key. With a simulated space, there is feel.
Simulated Space
Simulated space refers to simulated physical interactions in virtual space, perceived
actively by the player. This means collision detection and response between a realtime controlled avatar and objects in a game world. It also means level design—the
construction and spacing of objects relative to the speed of the avatar’s movements.
These interactions give meaning to the motion of an avatar by providing objects

-- 23 of 377 --

THE THREE BUILDING BLOCKS OF GAME FEEL
to move around and between, to bump into, and to use as a frame of reference for
the impression of speed. This gives us the tactile, physical sense of interacting with
virtual environments the same way we interact with our everyday physical spaces.
Using the avatar as a channel for expression and perception, we experience game
worlds at the tactile, physical level of the world around us.
Playable Example
Open example CH01-2 to experience the difference. Move around and feel the
sensation of control. Now press the “ 1 ” key to enable collisions. Feel how different that is?
The other necessary component for simulated space is that it must be actively
perceived. Perception happens on a scale of passive to active. The interaction of
objects you see on TV and in films is passively perceived. Exploring a simulated
space using real-time control is active perception. Game feel is active perception.
The key question is “How does the player interact with the space?” Some games
have detailed collision/response systems and level design, but the player does not
experience them directly. Starcraft is an example of a game like this, as we’ll see
in a moment. In other games, space is an abstraction. Games with grids, tiles and
hexagonal movement use space abstractly. This is not a simulation of space in the
literal sense, which is the sense we’re after. Game feel as we’re defining it means
active perception of literal space.
If we add the concept of context to our definition, it becomes:
Real-time control of virtual objects in simulated space.
This definition is close, but with it we are ignoring the impact of animations,
sounds, particles and camera shake. Without these “polish” effects, much of the feel
of a game is missing. There are objects interacting with only simulated responses
giving clues about whether they’re heavy, light, soft, sticky, metallic, rubber and so
on. Polish sells interaction by providing these clues.
Polish
Polish refers to any effect that artificially enhances interaction without changing
the underlying simulation. This could mean dust particles at a character’s feet as it
slides, a crashing sound when two cars collide, a “camera shake” to emphasize a
weighty impact, or a keyframed animation that makes a character seem to squash
and stretch as it moves. Polish effects add appeal and emphasize the physical nature
of interactions, helping designers sell those objects to the player as real. This is
separate from interactions such as collisions, which feed back into the underlying

-- 24 of 377 --

CHAPTER ONE • DEFINING GAME FEEL
simulation. For example, if you take away the animations from Street Fighter II, you
end up with something like Figure 1.4.
If all polish were removed, the essential functionality of the game would be unaltered, but the player would find the experience less perceptually convincing and
therefore less appealing. This is because—for players—simulation and polish are
indistinguishable. Feel can be just as strongly influenced by polish effects as by a
collision system. For example, a simple squash and stretch animation layered on top
of a moving avatar can radically change the feel of a game, as the creators of the
popular student game De Blob discovered. A post from Joost Van Dongen reported
that “When the ball bounces or moves very fast, it slightly deforms, and while rolling it slightly sags. On screenshots this is quite a subtle effect, but when seen in
action, it really looks fun. An interesting detail is that it changes the feel of the
gameplay entirely. Without the squash-shader, the game feels like playing with a
ball made of stone. Then with no changes to the physics at all, the squash-shader
makes it feel much more like a ball of paint. Nice to see how the player can be
deceived about gameplay using graphics only”1 (see Figure 1.5).
Assembling these three elements—real-time control, simulated space and
polish—into a single experience, we arrive at a basic, workable definition of
game feel:
Real-time control of virtual objects in a simulated space, with interactions
emphasized by polish.
The player controls the avatar, the avatar interacts with the game environment and
polish effects emphasize those interactions and provide additional appeal.
Examples
The question that naturally follows is “Does game X have game feel?” With our
basic definition, we can classify most games this way. For example, Sonic the
Hedgehog has game feel while Civilization 4 does not. Sonic has real-time control
while Civ 4 is turn based, placing it outside our definition. But to say that Civ 4 has
http://www.gamedev.net/community/forums/topic.asp?topic_id401276
F I G U R E 1.4 Street Fighter II without animation: just weird fighting boxes.

---

## Sección 6: Foundations & Introduction

-- 25 of 377 --

THE THREE BUILDING BLOCKS OF GAME FEEL
no feel whatsoever seems wrong. It has polish effects—animations, sounds and particles—and these alter the feel of interacting with the game, especially when things
are clicked and when armies clash.
What this indicates is that there are different types of game feel (Figure 1.6).
F I G U R E 1.5 Squash and Stretch in De Blob.
1. In the center, where all three intersect, is true game feel. Games like Half-Life,
Sonic the Hedgehog and Super Mario 64 reside here. These games have all the
components of game feel as we’ve defined it. This type of game feel is the topic
of this book.
2. This is raw game feel. Even without polish effects, the simulation of collisions
gives the experience of physical interaction between objects. But much of the
appeal and sense of physical interaction is lost. Games are almost never released
without polish effects, but you can play example CH01-3 to get a sense of what
this feels like (press the “2” key once you’ve opened the game).
3. This is pure aesthetic sensation of control. There is polished real-time control,
but no substance to the interactions. This feels weird. With sounds and particles

-- 26 of 377 --

CHAPTER ONE • DEFINING GAME FEEL
but no simulated interaction, it’s like seeing behind the curtain. There’s a dissonance for the player. The particle effects and sounds convey some impression of
a physical reality, but there’s a mismatch between the motion of the object and
the polish clues. Without simulation, it’s difficult to create a sensation of physical interaction. There are rarely games that have this combination of real-time
control and polish, but which exclude spatial simulation. (To experience this,
press the “3”key in example CH01-3.)
4. This is physical simulation used for vicarious sensation and to drive gameplay.
Games like Peggle, Globulos and Armadillo Run use simulation this way. In
these games, there’s a detailed physical simulation driving interactions between
objects but the resulting sensations are perceived passively because the player
has no real-time control. In the same way, polish effects like sounds and particles may serve to emphasize the interactions between objects or make them
more appealing, but these sensations are perceived passively, as they would be
in a film or cartoon. (Press the “4” key to experience this in example CH01-3.)
5. This is naked real-time control, without polish or simulated space. Again, I can’t
think of an example of a game that uses only real-time control without any kind
of polish or simulation effects. (To experience this you can press the “5” key in
example CH01-3. It’s interesting to noodle around, but the motion doesn’t have
a lot of meaning or appeal without simulation and polish.)
6. This is naked spatial simulation. The best example of this I’m aware of is the
freeware game Bridge Builder. There is a physical simulation driving the motion
of the objects, but is perceived passively.
F I G U R E 1.6 The intersection of the building blocks creates a wide range of levels of game feel.

-- 27 of 377 --

THE THREE BUILDING BLOCKS OF GAME FEEL
7. Finally, there is naked polish. Games like Civilization 4 and Bejeweled use polish
effects this way, without real-time control or spatial simulation.2 In these games,
polish effects sell the nature of the interactions, giving objects a weight, presence, volume and so on, but these perceptions are indirect.
Now let’s apply. Where does, say, Starcraft sit on the diagram?
At first glance, Starcraft appears to have real-time control. You can click at any
time to specify new orders for your units. While moving units, you can update their
destination as quickly as you can spam clicks onto the screen. But control over the
units is not an uninterrupted flow from player to game. Each click is a momentary
impulse of control that ends as quickly as it starts. You set the destination but don’t
guide the journey. This is not quite real-time control in the sense we’re after.
There also appears to be a simulated space Starcraft. Units can run into cliffs,
structures and rocks. But precisely those things that would lend a physical, tactile
sensation—steering around objects, aiming and choosing when to fire—are handled
by the computer. This is a simulated space with collisions and interactions, but perceived indirectly by the player.
The one thing Starcraft has in abundance is polish. The units have detailed animations, sounds and particles that sell their interaction with the game world and
each other. The feel of Starcraft comes from these polish effects, and it is solid.
Zerglings scamper, Marines trudge and everything explodes spectacularly when
destroyed. This puts Starcraft on the Venn diagram in 4, the intersection of spatial
simulation and polish.
This is not true game feel. The control of units is not real time, and the player
cannot interact with the simulated space directly. Because it has only one of the
three criteria, Starcraft falls outside our definition for game feel. Okay, okay. Breathe.
Be calm.
Before you get your Zerglings in a bunch, remember that definition is not value
judgment. We’re defining the medium of game feel, not saying anything about good
or bad game feel or about whether a game is good or bad generally. The animations, sounds and particle effects in Starcraft are excellent, and as a game it’s unrivaled in terms of balance and system design.
For the purposes of this book, “game feel” means true game feel, the point at the
center of our diagram. That is, games that includes real-time control, spatial simulation
and polish. This book is about creating good-feeling games of that particular type.
The other kinds of feel are important, but we have to draw the line somewhere.
But what about a game like Diablo? This is where our definition gets a little
murky. Does Diablo have real-time control or not? It seems real time, but the interface is lots of clicking. What’s the threshold for real-time control? And what about
simulated space? The character in Diablo walks around and bumps into things, but
is this actively perceived by the player? Does it feel like navigating an everyday
Actually, both of these games make use of a mouse cursor, which is a form of real-time control. In
these cases, though, the cursor is intended to be a transparent interface to the interesting choices in the
game. The usage is more like using Web page than playing Cursor Attack.

---

## Sección 7: Foundations & Introduction

-- 28 of 377 --

CHAPTER ONE • DEFINING GAME FEEL
physical space? We’ll delve deeper into real-time control and simulated space in

---

## Sección 8: Chapter 2 to answer these questions.

So what can we do with this definition and the three building blocks of game
feel? To answer that question, let’s now shift focus back to content, to expression
and to the experience of game feel itself. Specifically, let’s go through some of the
different experiences of game feel and examine how game designers can craft them
using real-time control, simulated space and polish.
Experiences of Game Feel
Game feel is comprised of many different experiences. For example, the simple
pleasure of control, feelings of mastery and clumsiness, and the tactile sensation of
interacting with virtual objects might all happen within a few seconds of picking up
the controller. What we call game feel is the sum of all these experiences blended
together, coming to the surface at different times. To understand game feel we need
to understand the different experiences that comprise it; what they are, how they
are crafted and how they interrelate.
The five most common experiences of game feel are:
● The aesthetic sensation of control
● The pleasure of learning, practicing and mastering a skill
● Extension of the senses
● Extension of identity
● Interaction with a unique physical reality within the game
The Aesthetic Sensation of Control
When I was young, playing Frogger and Rastan on my dad’s Commodore 64, game
feel was a toy. It was the delightful sense of puppetry I got when I controlled something in a game. But it felt like the game was controlling me, too. I’d start leaning left and right in my chair, trying to move just a bit faster or more accurately.
I’d pull my head a little to one side to try to see around something on the screen.
Most of all, it just felt great to see something on a screen move and react to my
button presses. I wasn’t coordinated enough to really engage with the challenge of
the game, but there was a pure, aesthetic beauty to control. I loved this sensation
and played with it for hours. This was the experience of game feel as an aesthetic
sensation of control.
The Pleasure of Learning, Practicing and Mastering a Skill
A few years later, when I played Super Mario Brothers for the first time, I was super-inept.
I was playing with friends from down the block who were older and more coordinated
and could afford their own Nintendo. My turn was short, blustering and red-faced.

-- 29 of 377 --
However, before I had to hand off the controller, I had the sense that even the smallest
motion could produce a long chain of interesting events and feel intensely rewarding.
Smash a block with your head and it jiggles and makes a silly little noise. Hit an
attractive, flashing question block in the same way and a coin pops out, accompanied
by a shower of sound and animation. All of this rich, low-level interaction served to
cushion the fact that, at first, the game was very challenging for a nine-year-old. It
was OK to suck because it was fun just to noodle around and bump into things.
There even seemed to be different skills, the same way you practice dribbling,
kicking and heading in soccer. For example, I had to learn to time my jumps, holding down the button for the right amount time, and to feather my presses of the
d-pad to control speed. Combining small, incremental improvements in these areas,
I started to get better and better, reaching higher levels of the game. Three weeks
later, when Bowser tumbled bug-eyed into the lava, I felt a powerful sense of
accomplishment, like scoring the tie-breaking goal. I’d been playing soccer for two
years, but this game gave me the same feeling of pride in just three weeks. In one
neatly wrapped package, there were skills to master, rewards at every level and a
hyper-accelerated ramp of increasing challenges upon which to test those skills.
Even better, I didn’t have to stop practicing because I was tired or because it was
dark outside. This was the experience of game feel as a skill.
Extension of the Senses
I grew up a bit and learned how to drive a car. This learning was very similar to
mastering the controls of a new game, but it seemed to take longer, to be less fun
and to lack built-in milestones against which I could measure my progress. After a
while, I began to develop a sense of how far the car extended around me in each
direction. I could gauge how close I could drive to other cars and whether or not my
car would fit into the parking space in front of Galactican.3 To do this, I relied on a
weird sort of intuition about how far the car extended around me, which made the
car feel like a large, clumsy appendage. This was also like playing a game in a funny
way. When I drove the car, as when I played Bionic Commando, I had a sense that
thing I was controlling was an extension of my body. This was the experience of
game feel as an extension of the senses.
Extension of Identity
After a memorable incident involving my parents’ Volvo I realized that this sensation could flow in both directions. Late for class, I leapt in the car, threw it in
reverse and slammed the gas, turning as I did. Scraaaaaape! I cringed, flinched and
swore viciously. I pulled my hands off the steering wheel as though it were scalding hot. I had just smeared the car’s side against a concrete pole. I still remember
A now defunct but once totally sweet arcade in Cupertino, Calif. You got eight tokens on the dollar, all
the games were two tokens or less to play, and they had four-player air hockey.
EXPERIENCES OF GAME FEEL

-- 30 of 377 --

CHAPTER ONE • DEFINING GAME FEEL
the feeling as the car ground to a halt. It was as though I’d stubbed my toe in a
big, expensive, metal-rending way. Interestingly, I didn’t think “Oh, darn, the car
in which I’m sitting has come into contact with a concrete pole.” I thought “Oh,
crabapple, I hit a pole!” In that moment, when car hit pole, the car was part of my
identity, both physically and conceptually. Then I thought of my parents’ reaction,
and I was quickly snapped back to thinking of car and self as separate. One of us
was in big trouble, and it wasn’t the Volvo.
Around this same time, I was playing Super Mario 64. It occurred to me after
pole-ing the car that a similar process happened as I controlled Mario. My identity
would subsume him when I was in the zone but the moment I hit a Goomba and
was sent flying, I was suddenly pulled out, viewing him once again as a separate
entity. This was the experience of game feel as an extension of identity.
Interaction with a Unique Physical Reality within the Game
This also made me more aware of just how physical it felt to pilot Mario around.
As Mario obligingly collided with things in his world, skidding to a halt with puffs
of particle dust or a spray of yellow stars, it felt tactile and physical. These artifacts
gave me a sense of the weight and mass of the things in Mario’s world, as did his
interactions with them. Some things he could pick up and throw easily, like a small
stone block. Some things, like Bowser,4 required considerably more heft. Sometimes,
things would seem heavier or lighter than I imagined they ought to be. For example,
the eponymous snowman’s head from the Snowman’s Lost His Head goal on Cool,
Cool Mountain. The snowball is small, especially at first, and yet it pummels poor
Mario out of the way every time. This too seemed to have an analogy in the real
world: sometimes I would go to pick something up—a grocery bag, a piece of furniture that was rarely moved—and nearly pull my arm out of socket trying to heft the
thing because it was much heavier than I had expected. This was the experience of
game feel as a unique physical reality.
The Experiences of Game Feel
The aesthetic sensation of control is the starting experience of game feel. It is the
pure, aesthetic pleasure of steering something around and feeling it respond to
input. When players say a game is floaty, smooth or loose, this is the experience
they’re describing. An analogy from everyday life might be the feel of different cars;
a 2009 Porsche feels better to drive than a 1996 Ford Windstar.
Experiencing game feel as skill encompasses the process of learning. This
includes the clumsiness of unfamiliar controls, the triumph of overcoming challenge,
and the joy of mastery. Viewing game feel as a skill explains how and why players
experience the controls of a game differently as their skill level increases, what “intuitive controls” means, and why some control schemes are easier to learn than others.
When temporarily immobilized and grabbed by the tail, of course.

---

## Sección 9: Chapter 2 to answer these questions.

-- 31 of 377 --
The everyday analogy is learning a new skill, whether it’s driving a car, juggling or
slicing carrots.
Skillful control can also lead to the feeling of being in the zone, being one with
the game and the loss of self-consciousness. If you’ve played a video game and lost
track of time, you’ve experienced this sensation. You sit down to play a game for
a few minutes and zone out only to emerge hours later, exhausted, elated and fulfilled. In everyday life, this happens all the time. You can zone out while driving on
the freeway, folding socks or playing basketball.
When players say “It feels like I’m really there,” “It’s like I’m in the game” and
“The world looks and feels realistic,” they’re experiencing game feel as an extension of the senses. The game world becomes real because the senses are directly
overwritten by feedback from the game. Instead of seeing a screen, a room and a
controller in their hands, they see Azeroth, the beach at Normandy or Donut Plains.
This is because an avatar is a tool both for acting on the world and for perceiving it.
There’s no real-life example of this experience because the experience is the senses
extending into the game, into a virtual reality.
One result of this extension of the senses into the game world is the shifting of
identity. Players will say “I am awesome!” during moments of skillful triumph and
“Why did he do that!?” when they fail a moment later. With real-time control over
an object, a player’s identity becomes fluid. It can inhabit the avatar. The real-world
analogy is identity subsuming a car. You don’t say, “His automobile hit my automobile.” You say, “He hit me!”
As the player’s senses are transposed into the game world, they can also perceive
virtual things the way they perceive everyday things: through interaction. In perceiving
things in a game this way, objects seem to take on detailed physical characteristics.
Objects can be heavy, sticky, soft, sharp and so on. When a player observes enough of
these interactions, a cohesive picture of a self-contained, unique physical universe
begins to emerge as the various clues are assembled into a mental model. This is the
experience of game feel as a unique physical reality, as a game world with its own
designer-created laws of physics. Figure 1.7 shows the whole thing put together.
F I G U R E 1.7 How building blocks of game feel translate into experiences.
EXPERIENCES OF GAME FEEL

-- 32 of 377 --

CHAPTER ONE • DEFINING GAME FEEL
Creating Game Feel
For the remainder of the chapter, let’s explore each of these different experiences in
detail, with focus on how the game designer can shape and build them.
Game Feel as the Aesthetic Sensation of Control
There can be a thoughtless joy to controlling something in a game. People experience
this while riding a skateboard, surfing, ice skating or driving a car. It’s the kinetic
pleasure of moving through space, creating flowing arcs of motion and feeling your
body or the thing you’re controlling respond instantly to your impulses. Even without
a specific goal in mind, there is this intrinsic pleasure to control. These sensations of
control have some known aesthetic properties, as in the earlier example of the
Porsche and Ford Windstar. The Porsche is smoother, handles better, has tighter cornering and so on. In a video game, the same aesthetic properties of control are in
play. An avatar in motion can create flowing, organic curves as it moves and enable
a player to feel the aimless joy of control. These sensations are what players mean
when they say a game feels smooth, floaty or stiff. These sensations are a wonderful palette for game designers to draw on and use to engage players (Figure 1.8).
When a game designer sits down to create a game and has an idea for a particular feel in mind, the first task is mapping input signals to motion. The expressive
potential is in the relationships. When a button gets pressed, is the response gradual
or immediate? Does the avatar move forward relative to the screen or relative to
F I G U R E 1.8 The aesthetic sensation of control.

-- 33 of 377 --
itself? Or does it rotate rather than move? How fast does it move forward relative to
its rotation? With the right relationships between input and response, controlling
something in a game can achieve a kind of lyric beauty. The flip side is jarring, nauseating or otherwise aesthetically unappealing motion resulting from player input.
This mapping is a form of aesthetic expression. It defines how it will feel to control the avatar. As with most artistic endeavors, there’s no formula for the “right”
feel. It’s up to the designer to make the hundreds of tiny judgments about the intricate relationships between input and response. We’ll explore this palette of mapping
and how it translates to game feel in greater detail in Chapter 7. For now, note that
these are aesthetic judgments, and the resulting feel is an expression of the designer’s sensibilities.
Now imagine all the motions possible with one mapping. Every turn, twist, jump
and run. The sum total of all motions possible with a mapping defines a possibility
space for the player. This is not defining what a player will do; rather, it is defining
what he or she can do. Every movement a player can ever accomplish with an avatar is defined by the designer’s choices about how to correlate input to response.
Each of the potential motions has an aesthetic character that will be experienced
by the player if he or she steers the avatar through that action. This aesthetic pleasure has its own intrinsic reward and will encourage a player to explore the possibility space by moving around in whatever way seems most aesthetically pleasing to
them. The problem is, without some kind of focus, even great-feeling controls will
quickly wear thin.
For a game designer, the solution to this problem is to add some kind of challenge. With a goal, motions of control take on a new meaning. Now it’s possible to
compare intent to outcome. It’s possible to succeed or fail. The aesthetic pleasure of
control has become a skill.
Game Feel as Skill
As I’m defining it here, a skill is a learned pattern of coordinated muscle movement
intended to achieve a specific result. To measure skill is to measure the efficiency
with which intent can be translated, via action, into results.
If you’re playing soccer, your intent may be to dribble through all the other players on the soccer field and bend the winning goal past a floundering goalkeeper. In
reality, this is one of many possible outcomes. It is much more likely that your skill
will not be up to this level of challenge, and you will be stripped of the ball before
you can get to the center line. But skills can be improved, and increasing levels of
challenge can be mastered. If your goal is to dribble past one defender and make
a deft pass to an open teammate, your odds of achieving that are relatively good.
While this may not be the glowing level of pleasure you’d get from scoring the goal
yourself, there are great feelings to be had from small, incremental victories. Even a
particularly skillful kick or dribble while practicing in the backyard can feel wonderful because you know it can be later applied in the context of a soccer game. Soccer
CREATING GAME FEEL

---

## Sección 10: Chapter 2 to answer these questions.

-- 34 of 377 --

CHAPTER ONE • DEFINING GAME FEEL
is a set of challenges so compelling that isolating and practicing the skills seems
worthwhile even outside the context of the game.
This is similar to the experience of playing Counter-Strike. I was so compelled by
the challenges of the game, I would boot up the level “cs_italy” without other players
and practice three skills: shooting a specific spot on a wall while moving side to side,
quickly moving my aiming cursor from one spot to the next; and keeping the cursor on
a single spot while I moved left, right, forward and back. I would sit in the level, alone,
practicing these three skills for two to three hours before I would ever play the game
online. It seemed worthwhile to push myself into different, higher levels of skill.
What this indicates is that game skills and real-world skills are essentially the same.
They are learned patterns of coordinated muscle movements. The muscle movements
are smaller, the skills are more focused and the motions are not constrained by
physical reality, but the same process of learning and skill-building occurs. The primary difference is that a video game designer has control over both challenge and
physics. In the real world, there are a fixed set of properties—gravity, friction, the
physiology of the human body and so on. The designers of soccer, whoever they
were, had to work around these fixed properties to create interesting, meaningful
challenges. Their palette consisted of lines on the ground, the size of the net, the
physical properties of the soccer ball and rules like “you can’t touch the ball with your
hands.” Minh “Gooseman” Le, the designer of Counter-Strike, was able to craft everything. He not only created the rules and challenges of the game, but also defined
how fast players could move, how high they could jump, how accurate their weapons would be and what the values for gravity and friction would be in the game.
Tweaking how the player moves and the creation of challenges both alter game
feel. Changing the global values for gravity, friction and speed of character movement defined the basic sensation of control. Adding rules and challenges then
changed this sensation by defining a set of skills to be practiced and mastered. The
question is, how? How is skillful control a different experience from just control?
The answer is that game feel and skill are related in three ways:
● Challenge alters the sensation of control by focusing the player on different areas
of the possibility space of motion, rewarding him or her for exploring it.
● The feel of game changes depending on the skill of the player.
● Players find controls to be intuitive when they can translate intent to outcome
without ambiguity.
Challenge Alters the Sensation of Control
From the point of view of a game designer, there is a problem even with the
best sensations of control. Controlled motion is pleasurable, but that pleasure is
fleeting. Even if the game feels great, aimlessly controlling something gets boring
quickly (Figure 1.9).
Part of the problem is that if the aesthetic pleasure of control is the only encouragement, the player will experience just a small subset of the possible motions. If we

-- 35 of 377 --
again imagine every possible motion of a mapping as a possibility space, the area
explored by a player will be limited, as in Figure 1.10.
However, with a specific goal to pursue, control takes on new meaning. Aimless,
pleasurable motion is replaced by focused, purposeful attempts to complete the
challenges presented. This provides an incentive for players to find new areas of the
possibility space, introducing them to sensations of control they would have missed
otherwise. Challenge provides landmarks in the distance, encouraging the player to
explore the aesthetic frontiers of the game.
For example, a first-time player of Super Mario World will not experience all the
sensations of the flying mechanic. It takes a lot of practice to learn the timing of
feathering the button at the right moment, sustaining Mario in his sine wave pattern of flight. And yet this is one of the most pleasurable sensations of control in the
entire game. Having access to this sensation—even just being aware of it—makes
the game more appealing and engaging (Figure 1.11).
F I G U R E 1.9 Without focus, the joy of control can become boring.
F I G U R E 1.10 Players only experience as much of a game’s feel as the area of this space they
feel inclined to explore.
CREATING GAME FEEL

-- 36 of 377 --

CHAPTER ONE • DEFINING GAME FEEL
Challenges not only encourage exploration of all possible motions, but assign
new meaning to them. This changes the feel of control. For example, think of a
mouse cursor. This is a form of real-time control so engrained that we rarely notice
ourselves exercising it. But against the backdrop of a different challenge, mouse control can take on a different feel, as in the Web game Cursor Attack. Cursor Attack
requires the player to move the cursor in a very precise path as quickly as possible
to reach a goal point. Normally, the goal of using a mouse is to navigate a Web
page effectively and buy things like a good consumer, or to click, drag or otherwise
manipulate the programs on your computer. In Cursor Attack there is an explicit
goal (reach the end of the maze by touching the goal point) and an implicit goal
(go as fast as you can.) The constraint is touching the wall of the maze, which
causes an immediate game over. The result is a feeling of complete focus on the
tiniest motions of the mouse. This feels very different from navigating a Web page.
It makes the mouse cursor’s movement feel very twitchy and much less precise.
The cursor’s size and its position in space suddenly become much more important.
The skill requires a great deal of concentration, like threading a needle or trying to draw a perfect circle on a chalkboard. Just by changing two goals and one
constraint, the feel of controlling a mouse cursor is new, fresh and interesting.
Fortunately for game designers, real-time control lends itself to the creation of these
kinds of challenges (Figure 1.12).
Challenges consist of two parts: goals and constraints. Goals affect feel by giving
the player a way to measure his or her performance. With a goal, it’s possible to
fail or succeed. It’s also possible to fail partially, and to do better or worse than the
last attempt. This creates players’ nebulous perception of their own skill, their own
ability to translate intent into reality. Depending on this perception, the feel of the
game will fluctuate between clumsy and intuitive. In addition, the nature of the goal
shapes the players’ focus. As in Cursor Attack, the feel of real-time control changes
depending on how the player is tasked with applying it. Does the goal require the
player to make extremely precise, specific motions like Cursor Attack, or is it more
wide open like Banjo Kazooie? How fast do the characters move, how far apart are
F I G U R E 1.11 With challenges, there is a reason to explore more of the possible sensations
of a particular mapping.

---

## Sección 11: Chapter 2 to answer these questions.

-- 37 of 377 --
the objects they’re being asked to move in reference to, and are they meant to avoid
them, collect them or touch them lightly? This is much of the art of game design as
it pertains to game feel: what the players are supposed to do is as important as the
controls that enable them to do it.
A single goal can create multiple layers of intentions. For example, a high-level
goal like “reach the top of the mountain” may require many steps to execute. But
eventually it all trickles down to the level of real-time control. Reaching the top of the
mountain means swinging to the next pole, and the next and so on (Figure 1.13).
Constraints affect game feel by explicitly limiting motion. Instead of emphasizing
a motion, a constraint selectively removes some motions from the possibility space.
For example, the sidelines on a football field eliminate some possible motions,
rewarding players who can quickly change directions side to side and who are good
at exploiting gaps in the opposing team’s defense. If there were no sidelines in football, a player could run endlessly in a direction to evade defenders and the essential
skills would change. The same is true when we say that hitting an asteroid causes
you to lose a life in Asteroids. By limiting motion, the player is again focused on
particular motions, which changes the feel of control.
F I G U R E 1.12 Challenges give meaning to motion, enabling sensations of control to sustain
engagement across a whole game.
CREATING GAME FEEL

-- 38 of 377 --

CHAPTER ONE • DEFINING GAME FEEL
These two tools, constraints and goals, enable game designers to shape real-time
control into a specific feel. Goals emphasize certain parts of the possible motion
while constraints specifically eliminate others. The result is the feel as the game
designer wanted it to be.
But what should the game designer’s desired feel be? This is up to the designer,
of course, but I find this question often answers itself through experimentation. With
a prototype of real-time control featuring an avatar moving around an exploratory space with lots of different shapes, sizes and types of objects to interact with,
control organically evolves into skills and challenges. Can I get up to the top of
that mountain? Can I fly between these buildings without hitting them? Can I
jump across this gap? What I’m looking for in such a prototype are the best-feeling
motions and interactions. In this way, the job of a game designer in crafting game
feel is to explore the possibility space of a new mapping, emphasizing the good
with goals and pruning the bad with constraints.
Game Feel Changes Depending on the Skill of the Player
When picking up the controls of an unfamiliar game, a player will feel inept, clumsy
and disoriented. To an expert player, the same game will feel smooth, crisp and
responsive. The game’s controls will always be the same from an objective standpoint—the cold precision of programmed bits allows no other reality—but feel will
change for the players depending on how well they can translate their intention
into game reality. Each player will start at a slightly different skill level depending
on past experience and natural aptitude, will learn at a different rate and will attain
different heights of skill depending on how much her or she practices. This means
F I G U R E 1.13 A goal trickles down to become different layers of intent.

-- 39 of 377 --
that even for a single player, the feel of a game will change over time. This variability makes the feel of even a single game controversial. The argument goes like this:
Internet Denizen 1: “Whenever I think of what the perfect ‘feel’ for a game is,
I think of Super Mario 64. Other than the camera, the controls were perfect.”
Internet Denizen 2: “God, I hated Mario 64, the controls were terrible!”
Internet Denizen 1: “You don’t like the controls because you suck at it, n00b!”
Because both parties are correct, this argument will never be resolved. For Denizen
2, who was unable or unwilling to master the controls of the game, the feel was
clumsy and unresponsive. Denizen 1’s point of view is equally valid. For him, controlling Mario felt like extending himself into the game world, every movement
becoming as accurate an expression of his intent as turning a steering wheel or
swinging a baseball bat in real life. The point he’s making—that without reaching
a certain level of skill a player cannot appreciate the feel of a game—is valid. This
is true both for soft, emergent skills like rocket jumping in Quake and for deeply
nested controls such as the blue sparks in Mario Kart DS. When you’re new, you
don’t use all the moves. In this sense, skill is the price of admission for game feel.
But there are also instances when players learn to play a game at a very high
level and will still say it feels bad to control. For me, the arcade classic Pac-Man
embodies this paradox. I enjoy the game, but from an aesthetic point of view, the
feel of moving Pac-Man around the maze is stiff, rigid and unappealing. For the
opposite reason, a friend of mine never enjoyed Asteroids. The looping grace of
the ship is aesthetically pleasing to control, but the skills of avoiding asteroids and
shooting alien spacecraft were too unappealing to be worth learning. This implies
a relationship between these two different experiences of game feel: the base, aesthetic pleasure of control and the sensations of learning, practicing and mastering
a skill. This relationship is cyclical, extends across the entire time a player plays a
game and changes game feel constantly. The cycle looks something like Figure 1.14.
When players first pick up a game, they suck. Players know this and accept
it—skill is the price of admission—and they trust in the game designer. “If I take
the time to learn this and agree to suffer through some frustration,” the player says,
“you agree to give me some great experiences later.” The feel at this point is clumsy,
disorienting and bad. It takes a great deal of conscious effort to perform the most
basic tasks in the game. The pure aesthetic pleasure of control can be used as a
tonic here, soothing frustration until the first success, but every game starts this way
for a new player. Every new player feels clumsy, disoriented and frustrated during
the initial learning phase.
Over time, skills are mastered and get pushed down below the level of conscious
processing. The player gradually improves relative to the challenges presented, and
the feel gets better and better. Eventually, the player learns the skills well enough
and breaks through, completing the current goal. Without the oppressive feeling
of clumsiness, the aesthetic sensations of control come to the forefront, combining
with the satisfaction of a challenge overcome to provide a reward for reaching this
CREATING GAME FEEL

---

## Sección 12: Chapter 2 to answer these questions.

-- 40 of 377 --

CHAPTER ONE • DEFINING GAME FEEL
level of skill. Then the next challenge is introduced and the cycle starts again. The
clumsy feel of being unskilled relative to the challenges provided once again overwhelms the aesthetic pleasure of control.
Objectively, skill always improves over time. Subjectively, players will feel that
the controls are alternately clumsy and intuitive depending on how their skill relates
to the challenges the game is currently throwing at them.
The best game designers create feel at different levels of skill. By knowing the
skill of the player and what he or she is thinking about and focusing on, a clever
designer can tune game feel differently at each level of skill. This insight into a
player’s skill might come from knowing which level the player is currently on, from
which items are currently in the player’s inventory or from extensive play testing in
a multi-player game. For example, if a player is on level 12 and the progression of
levels is linear, you can assume he or she has mastered the skills necessary to complete the first 11 levels. You know the skill that was learned last (what the player
will be focused on), which skills are completely reflexive (those already mastered)
and which skills have not yet been encountered. With this knowledge, it’s possible
to shape the feel of a game across time. Guiding the player this way, a designer can
leave breadcrumbs strewn across the possibility space of motion, emphasizing the
best possible sensations of control while maintaining a balance of skill and challenge. When the player has achieved the highest level of mastery, the game will
have fulfilled the designer’s goal for the best possible game feel.
F I G U R E 1.14 The cycle of skill and game feel. As the player’s perceieved level of skill
changes, so does the feel of control.

-- 41 of 377 --
For this to work, however, players must never get so bored or frustrated that they
stop playing. If this delicate balance between player skill and game challenge is perfectly maintained, players will enter the flow state.
Flow theory says that when a challenge you undertake is very close in difficulty
to your current level of ability, you will enter the flow state, which is characterized by a loss of self-consciousness, a distorted perception of time and a host of
pleasurable sensations. Researcher Mihayli Csikszentmihalyi (pronounced “chickssent-me-high”) correlated these sensations with athletes, dancers and world-class
chess players being “in the zone” and having things “just flow.” The gist is that
when your ability matches really well to a particular challenge you can enter the
flow state. If your skill is much greater than the challenge offered by a given activity, you’ll be bored. If your skill is far below the level of the challenge provided,
you’ll be frustrated. (See Figure 1.15.) Or, as in the case of rock climbing and other
dangerous activities, you’ll be anxious. Csikszentmihalyi says that “Games are the
flow experience par excellence,” and for good reason. Video games especially have
numerous advantages in creating and maintaining flow, such as providing clear
goals; a limited stimulus field; and direct, immediate feedback.5
From the perspective of game feel, flow is one of the ideal experiences. When
players refer to being immersed in the game, part of what they’re experiencing is
flow. As the original researchers of flow discovered, entering the flow state and staying there is one of the most rewarding experiences it is possible for people to have.
From surgeons to painters to rock climbers, everyone who experienced flow regularly was happier, healthier, more relaxed and more energetic. And they knew it,
loved it and sought out flow-producing activities because of it. In a video game or
in real life, fueling this addiction requires taking on ever-greater challenges to match
ever-increasing skills. As these higher levels of skill and challenge are reached, the
For a detailed description of the flow state, how you can tell if someone is entering or exiting it, how it
enriches people’s lives, and the conditions necessary to achieve it, reference Csikszentmihalyi’s original
work on flow, Beyond Boredom and Anxiety.
F I G U R E 1.15 The flow state: when challenge and skill are balanced for maximum player
engagement.
CREATING GAME FEEL

-- 42 of 377 --

CHAPTER ONE • DEFINING GAME FEEL
sensations of control change. A professional Counter-Strike player, like a professional soccer player, feels the game differently.
Intuitive Controls
Unlike real life, players may begin to feel that the controls are not accurately translating their intentions into the game. This is another place where game skills are slightly
different from real-world skills. In real life, if you try to kick a ball and completely
whiff it, you’ve no one to blame but yourself. In a game, the blame can actually lie
with the game designer.
What’s important is the player’s perception: is the inability to translate intent into
desired reality because of his or her lack of skill or some problem with the game?
Players often blame the controls when they don’t get the result they intended and
sometimes this blame is justified. A game designer is unlikely to map an input to a
random result, but there are many instances when unintentional control ambiguities
disrupt the sensation of control by making the player feel as though the game is not
accurately responding to their input.
When this happens, when the player feels the game is not accurately translating
his or her intention into the game world, it’s one of the worst feelings possible. It’s
game feel anathema. This sensation is the opposite of what players mean when they
say “intuitive controls.”
Intuitive controls mean near-perfect translation of intent into game reality.
Players will be able to translate their intent into reality with varied degrees of efficiency, based on their skill. If the thing you’re controlling does what you want and
expect, accurately translating your impulses into the game, the controls are intuitive. Control over the avatar feels like an extension of your own body into the game.
There is a distinction between challenge (which makes the game more difficult
in the dimension of skill) and interference (which obfuscates intent arbitrarily). Put
another way, as long as the result of an action is predictable, the goals clear and the
feedback immediate, it will fall on the scale of challenge. If not, it’s interference,
noise in the channel between the player’s intent and the game’s reality.
When constructing a game mechanic, designers seek the ever-elusive worthwhile
skill. It’s intuitive and easily learned, but deep. It has a lyric, expressive quality, but
you can hang a game’s worth of challenges on it and it never gets stale.
Game Feel as an Extension of the Senses
To play a video game is often to focus intently on a screen, to the exclusion of
all else. While this may cause consternation among parents, educators and careerminded politicians, what’s happening is not a trance, but a transposition of senses.
The screen becomes the player’s surrogate visual sense. Instead of looking around
and seeing a TV, a couch and their hands on a controller, players look through the
screen into the game world. When players sit and stare, they are not catatonic.

---

## Sección 13: Chapter 2 to answer these questions.

-- 43 of 377 --
Rather, they’ve substituted their visual sense for one in the game world, extending it
outward to a new place. They’re looking around, keenly aware of their surroundings
in the game. This is because an avatar in a video game is a kind of tool; it provides
both a potential for action and a channel for perception.
Consider a hammer. When you hit a nail with hammer, you can see the nail
head get lower and you can hear the pitch change with each strike, driving the nail
downward. These are direct perceptions. But you can also feel the nail through the
hammer. With each strike, you can feel the nail driving deeper, whether you’ve hit
it square on, whether the nail is beginning to bend and so on. Tactile feedback is
coming back to you through the hammer. The hammer has become an extension of
the sense of touch.
Now consider the avatar in Katamari Damacy. Controlling the Prince of all
Cosmos is an extension of three senses: sight, hearing and touch. As a player, I have
a goal: to build my Katamari to a certain size. The first step in this goal is to pick up
some thumbtacks I can see off to the left of my current position. Once that intent
is formed, I begin to take action, pressing forward on the thumbsticks to move the
avatar in the direction I want to go. To know whether I’m turning the right amount,
and when to stop turning and straighten out, I’ll use visual feedback from the
screen. I’ll estimate the distance between avatar and thumbtacks. Each moment I’ll
look at how much the Prince is turning relative to the pressure I’m exerting on the
thumbsticks and make constant, tiny adjustments to maintain the proper course.
This happens in a continuous cycle until I see that I’ve turned and hear the satisfying “collect” sound. If I run into something that’s too large for my Katamari, I see
the Katamari stop, see pieces fly off it, hear a crashing sound, see the screen shake
and feel the rumble motors in the controller go off.
In each case, a device overwrites one of my senses. The screen becomes vision,
speakers hearing and rumble motors the sense of touch. The feedback from these
devices enables me to experience things in a game as if they were objects in my
immediate physical reality. I have the sense of moving around a physical space,
touching and interacting with objects. The screen, speakers and controller have
become an extension of my senses into the game world. The game world becomes
real because the senses are directly overwritten by feedback from the game. By
hooking into the various senses, a screen, a speaker or a joystick can make the virtual feel real.
When game designers create camera behavior, implement sound effects or trigger rumble motors, they’re not defining what players see, hear and feel. Rather, they
are defining how players will be able to see, feel and hear in the game. The task is
to overwrite real senses with virtual ones. In defining game feel, we must acknowledge this fact and embrace it. To experience game feel is to see through different
eyes, hear through different ears and touch with a different body.
From the perspective of the game designer, the most important part is defining camera behavior. The camera is the player’s point of view, the point in the game’s world
that represents his or her eyes, determining what view of the game world will be displayed on the screen. If the first task of a game designer creating a particular feel is
CREATING GAME FEEL

-- 44 of 377 --

CHAPTER ONE • DEFINING GAME FEEL
mapping input signals to motion, and the second task is to create a space and
objects to give that motion a frame of reference, the third task is defining the
behavior of the camera. There are no games I’m aware of that use sound or controller rumble as a primary feedback for real-time control. It’s interesting to think about
how real-time control could be achieved using mostly aural or tactile feedback,
but most games are built using visual feedback only, with sounds and controller
rumble added as polish effects. This is why creating the camera and its behavior is
the third necessary component of a game feel prototype. Without any of these three—
mapping, a basic-level layout and camera behavior—the feel of a game is not reliably testable. For a designer, these are the three foundations of game feel.
The two important decisions to make about a camera are where it will be and
how it will move relative to the avatar. The combination of where the camera is and
how it moves defines the player’s impression of speed.
Because the camera is not just an object being controlled but is also an organ of
player perception, its motion requires some special treatment. Usually, these problems handle themselves. If the camera’s movement is too jarring or disorienting,
or if the player can’t see what they need to see to engage with the challenge of the
game, the designer simply iterates until these problems are reduced or mitigated.
The most common choices are: don’t move the camera more than you have to, move
it smoothly when you do and give the player control when you can’t get a good result
from programmed behavior. Otherwise, the camera causes interference between
intent and result, making the controls less intuitive for the player. Worse than that,
the motion of a camera can actually cause physical nausea. This is an interesting
confirmation that feedback from the screen is truly overwriting visual perception.
Motion sickness happens when the signals received by the inner ear don’t agree
with the signals received by the eyes. For a player who’s sitting stationary in a room,
playing a game on an unmoving screen to experience motion, visual perception
must be extended into the game via the screen. It’s no wonder, then, that things like
sudden drops in frame rate are so jarring and feel awful to the player. It’s as if you
were walking to the grocery store and your vision suddenly started to stutter and
break down. This is also how it’s possible for motion sickness to occur when a player
is sitting stationary in a room playing a game on an unmoving screen. If the player’s
eyes in the game are the camera, the flow of feedback from that sense needs to be
smooth and uninterrupted.
Game Feel and Proprioception
One sense that we might not consider part of game feel is kinesthesia. Kinesthesia is
the sense that detects body position; weight; or movement of the muscles, tendons
and joints. To get fancier, we can talk about “proprioception,” which is often used
interchangeably with kinesthesia. Proprioception has the slightly more precise connotation of being a person’s subconscious awareness of the position of his or her
own body in space. To understand what proprioception is, close your eyes, extend

---

## Sección 14: Chapter 2 to answer these questions.

-- 45 of 377 --
your arm directly out in front of you and touch the ring finger of your right hand
with your left hand. The sense that enables you to figure out where your finger is in
space is without using visual or aural feedback is the proprioceptive sense. When a
police officer has you walk a straight line, this is the sense he or she is testing.
So how does game feel relate to proprioception? Proprioception comes from a
complex and not especially well-understood bit of physiology that has to do with
the movement of fluids in veins and the sensation of gravity pulling against tendons and muscles. Somehow this all gets assembled into a sense of the position of
your own body in space. This is why most astronauts experience “space sickness”
their first few days in zero gravity and sporadically thereafter. Even though they are
highly resilient under extreme gravitational forces, as all astronauts must be, the
body becomes disoriented by the lack of proprioceptive feedback. When gravity is
taken away, the body loses its sense of “up” and reacts unpredictably, often in ways
which involve a great deal of vomiting. In space. Gross.
When controlling something in a video game, there is no “real” proprioceptive
sense; there can’t be. As much as you feel your character has become an extension of your body, you will never receive the same kind of proprioceptive, musclestretching feedback from pressing a button as you get from swinging a tennis
racket.
So where does that leave us? It seems like proprioception is an important clue,
because the feeling of controlling a game is clearly something more than visuals
and sound alone would indicate. If we can’t actually experience the G-force of a
hairpin turn when playing a game, how can we explain why it feels so similar?
Why do we lean in our chairs? As an interesting example, consider the case of Ian
Waterman.6 At the age of 19, a viral infection destroyed the nerves in his skin and
muscles. He can still sense temperature, deep pressure and muscle fatigue, but his
proprioceptive sense is entirely gone. He is able to piece together the location of
his body in space only by observing it visually or through other subtle cues. If he’s
standing in his kitchen and the power goes out, he crumples to the floor, helpless
until the lights come back on. What’s fascinating is that, apparently, his movement
now looks mostly normal. With supreme mental effort, he uses whatever clues his
senses will give him (he can also use sound and temperature as feedback about the
position of his body) to gauge the position of his body in space.
On the surface, this seems in many ways to be similar to the experience of steering a virtual object around a virtual space. Based on limited feedback, we experience a kind of proprioception. We get a sense of the position, size and weight of a
virtual object in virtual space. It would be a significant disservice to Mr. Waterman
to end our assessment there, though. Even when manipulating something in purely
invented, digital space, we have a significant advantage: we still use our sense of
the position of our bodies to guide us. What a bunch of cheaters!
For more information, see http://www.apa.org/monitor/jun98/touch.html
CREATING GAME FEEL

-- 46 of 377 --

CHAPTER ONE • DEFINING GAME FEEL
When you move a mouse, thumbstick or Wiimote, your proprioceptive sense
is still active. Your thumbs, though their movements are small, are still giving you
feedback about their position in space and about how much the buttons or thumbstick on the controller is pushing back on them. You have a sense of where your
body is in space, even if your primary feedback is coming from virtual objects in
virtual space. In this way, controlling something in a game is a kind of amplification of your sense of space because you get a huge amount of reactive mileage out
of very little real-world motion. It’s like a megaphone for your thumbs. You’re now
concerned with how your real-world motion affects virtual objects; the process of
motion and feedback is transposed. When we’re controlling something in a game
we’re using not a debilitated proprioceptive sense, but an amplified one.
Part of the experience of game feel, then, is amplified impression of proprioception generated from visual, aural and tactile feedback. It’s an impression
created through illusory means, but is experienced as real by the senses. The sensation of game feel is more than the sum of its parts: visuals, sound, motion and
effects combine to form another sensation altogether, one we might term “virtual
proprioception.”
Game Feel as an Extension of the Player’s Identity
When perception extends into the game world, so does identity. It’s the same thing
that happens when you drive a car. As you drive, you have a sense of the position
of the car in space and how far it extends around you. This enables you to parallel
park, drive in a lane next to other cars and pull into your garage without crashing.
Your senses extend outward, encompassing the car and receiving feedback. As this
happens, the car becomes part of you, an extension of both body and self. This is
why people who’ve crashed say “You hit me!” rather than “His car hit me!” or “His
car hit my car!”
When an avatar in a game feels like an extension of your own body and senses,
identity flows outward to encompass it in the same way. Game designer Jonathan
Blow calls this “proxied embodiment”—identity extends to some kind of proxy,
inhabiting it and making it part of one’s own body. “My guy” becomes “me.”
What’s interesting is just how capricious this transfer of identity can be. It can
flow outward, encompassing something we’re controlling and a moment later be
withdrawn. We can say “Yes, I am amazing!” as we effortlessly wipe out a room
full of Marines in Half-Life and moments later scream “No, Gordon Freeman, you
stupid sumbitch! That’s a bad Gordon Freeman!” as we accidentally fall off a cliff
to grisly virtual death. For game designers, this flow of identity is great. It mitigates the frustration that comes from challenging the player. A little cursing at the
avatar is always preferable to the player becoming bored or frustrated and putting
the game down. It provides a nice release for the player, who avoids blame and
maintains engagement, getting back to the pleasurable sensations of control more
quickly.

---

## Sección 15: Chapter 2 to answer these questions.

-- 47 of 377 --
The extending of identity also gives a player the sensation of direct physical contact. It’s a muted sensation—getting hit with a rocket in Quake is, one assumes, not
the sensation of being hit with one in real life—but intimate nonetheless. When I’m
bumped, jostled, flung or impaled, it feels bad because it’s as though it’s happening
to me physically. It’s the same sensation I had hitting a pole in my parents’ Volvo;
it’s not literally painful, but it feels like a personal injury. Likewise, when I’m grabbing, throwing, slashing or hitting, it feels good because I’m reaching into the game
and affecting things directly with a part of my extended virtual body. This is where
impression of physical interaction becomes really powerful. Through a combination
of polish and simulation, the designer can have players feeling they’ve hit or been
hit, shaping those interactions with great precision.
Extension of identity isn’t something you can design for directly. It grows naturally out of real-time control, and it can be disrupted by too much frustration, boredom or ambiguity between intent and outcome. It can also happen to greater or
lesser degrees depending on the sensitivity of control. For example, I don’t feel particularly attached to each falling piece in Tetris. Our time together is fleeting, and
I have a very low-sensitivity control over the block’s movement. The blocks themselves are not anthropomorphic, but this fact is less important than the expressivity
of the controls. In Asteroids, which also has a very simplistic avatar, the transfer
of identity is much more pronounced because there is more sensitivity inherent in
the controls. It twirls and curves, narrowly missing asteroids. You really feel the
extents of the ship, focusing on its size and position in space as you steer it around.
Even Pong, which itself used only blocks as representation, had a greater potential for identity transfer. The sensitivity of the paddle controller was high enough
to feel like an extension of the senses and the identity. This is taken to an extreme
in a game such as Quake; there’s no barrier between identity and avatar. Tetris
has a very low sensitivity of control, allowing only left-right movement and rotation in a grid. Quake maps a highly sensitive input device, the mouse, directly to
rotation of the avatar. As long as it’s not too frustrating and doesn’t suffer from crippling control ambiguity, more sensitive controls will more readily accept a transfer
of identity.
Game Feel as a Unique Physical Reality
Now I’d like you to help me in a little experiment. First, picture in your mind what
would happen if you were to throw this book across the room and into a wall. Got
it? Now please throw this book across the room and into a wall. Come on, no one’s
watching. Throw it.
I’ll assume you’ve thrown or not thrown according to your personal code of
Book Ethics and have returned to reading. How did your expectations compare to
the actual outcome of the book being thrown? Now noodle the book around in your
hands, feel its weight and heft and thumb quickly through the pages, listening to
the pleasing sound it makes. What do you notice? A paperback book, like this one,
CREATING GAME FEEL

-- 48 of 377 --

CHAPTER ONE • DEFINING GAME FEEL
is heavy, floppy and will generally go where you throw it, landing in a heap as the
pages fan out in the air. Based on your previous experiences with paperback books,
this was probably what you assumed would happen when you threw it. But how
did you know that would happen? If you see a strange book lying on your coffee
table, how can you be sure this object you see and recognize as a book is truly an
object made of sheaves of pulped, pressed wood bound together into a flimsy brick?
The answer is action. You had to throw it to find out.
Based on your previous experiences with paperback books, you could make a
reasonable guess about what would happen, but the only way to truly experience
the physical properties of an object is to observe that object in motion. As an object
interacts with other objects, including your hands, you quickly parse out its physical properties. In a game, this same process of physical perception happens. In this
sense, the experience of game feel is a kind of faked Newtonian physics.
People are good at figuring out the physics of a virtual space because they’re
subconsciously familiar with the way things work in the real world. As soon as
we encounter a virtual space, we piece together whatever clues we have about
the physical laws that govern it into a mental model. We can’t help it. It happens
quickly and effectively and is based on what can be gleaned from the limited stimulus available: visuals, sounds, tactile feedback and motion. When all these harmonize, the fake physics are seamless; every tiny clue serves to support the same
impression of physicality, from the simulated collisions through animations, sounds,
screen shake and particle effects. Sometimes a piece of feedback will contradict the
others, however, and this causes inconsistencies in the player’s mental model of
the virtual space. Even in the games that do a fantastic job of conveying the solid
physics of their world, such as Gears of War, there are usually inconsistencies to be
found (the characters’ feet still clip through stairs, for example).
In a video game, you don’t sit in the thing you’re steering and manipulating.
You can’t—the object you’re controlling has no physical form. Objects in a video
game are a digital construct in virtual space. However successfully they attempt
to mimic the real world, they can only ever convey an impression of physicality.
Creating a good-feeling game is in one sense the process of building this impression.
Using sound and motion, we give players an entire universe worth of physical laws
to reconstruct in their heads, a mental model of the virtual space. This happens
in the same way we map the physical space we experience every day. The thrown
book makes noise, thuds when it hits the ground, flops in the air, takes a certain
trajectory, falls in a certain way, takes a certain amount of heft to launch. But the
impression, the generalization, comes from the combination of sound, touch and
motion.
Consider the two bowling balls in Figure 1.16. You’d expect that if they roll into
one another, they will make a satisfying clacking noise and roll away slowly. If, on
the other hand, one ball deforms, makes a dull thud like a beach ball being kicked,
and is flung violently in the other direction at the moment of impact, what can
you surmise about the ball that was punted? At this point, you must assume that
one ball is a clever visual forgery of a bowling ball, a beach ball in a bowling ball’s

---

## Sección 16: Chapter 2 to answer these questions.

-- 49 of 377 --
clothing. Even though it looks like a bowling ball, the evidence offered by at least
two other types of feedback, aural and motion, indicate overwhelmingly that it is
not a true bowling ball.
Now look at the balls in Figure 1.17. What would you expect if these two balls
rolled into one another at speed? What if the Ping-Pong ball made a low, ominous
humming noise and proceeded to split the bowling ball in half with its crushing
power? What would you assume about its physical properties then? There would be
no real-world analogy for what you’ve just perceived.
Mentally you try to uncover the underlying physical reality. Clearly, even
though it looks like a lightweight Ping-Pong ball, if it can destroy a bowling ball,
F I G U R E 1.16 Bowling balls collide and behave normally.
F I G U R E 1.17 Bowling ball and Ping-Pong ball: who will win?
CREATING GAME FEEL

-- 50 of 377 --

CHAPTER ONE • DEFINING GAME FEEL
it must be made of something solid and heavy. We strive to resolve the dissonance
by abandoning the visual cue because motion and sound outweigh it, evidencewise. Likewise, a bowling ball, even if we can’t hear the sound of it, still conveys
heaviness by the way it moves and interacts with other objects. Even if visuals and
sound are not congruent, motion will always trump them in creating the sense of
impression.
This is why things like interpenetrating objects or bizarre, unpredictable motion
are disturbing to the player. For example, the visuals in id Software’s Doom 3 were
exemplary. Each creature was rendered at a high, normal-mapped level of detail
much greater than the games that preceded it, and it was the first major commercial game to use a true lighting model as part of gameplay. Corners could actually be dark, and the critters lurking there had to be illuminated with a flashlight.
Unfortunately, these impressive visuals were belied by thin, tinny sounds (especially the shotgun and machine gun effects) and the implausible, jerky motion
of the everyday objects scattered throughout the game. Some props would fly and
spin like helicopters, taking on a life of their own, while others would not react or
move at all. There seemed to be no logic to the motion or lack of motion, and it created a powerful dissonance between visuals and motion. The impression of physicality was shattered. As game designer Brian Moriarty puts it, “… One reference
to anything outside the imaginary world you’ve created is enough to destroy that
world.”7
Compare this to the more recent, great-feeling Gears of War. Gears of War had
a great use of particle effects (especially sprays of dust as the characters slammed
against walls), cinematic tricks such as lens distortion and screen shake, and
extremely well-produced sound effects. This gave rise to a powerful and compelling impression of physicality. As independent game designer Derek Yu puts it,
“… In Gears it’s like you’re this giant wrecking ball with a gun attached to it, which
is pretty sweet.”
Summary
To answer the question of what game feel is, we started with a basic definition of
game feel:
Real-time control of virtual objects in a simulated space, with interactions
emphasized by polish.
Using the three building blocks encompassed in this definition—real-time control of
virtual objects, simulated space and polish effects—it’s possible to create great-feeling games.
We further defined great-feeling games as games that convey five different types
of experience to the player:
“Andrew Rollings and Ernest Adams on Game Design” (page 59).

-- 51 of 377 --
● The aesthetic sensation of control
● The pleasure of learning, practicing and mastering a skill
● Extension of the senses
● Extension of identity
● Interaction with a unique physical reality within the game
Of these five experiences, no single experience encompasses game feel. Rather,
game feel is all of these experiences simultaneously. During play, one experience might come to the forefront. The player might feel supremely frustrated, be
enthralled for a few moments by a beautiful sensation of control or feel the gory
satisfaction of gibbing an opponent with a well-timed rocket. These experiences are
not mutually exclusive and, at any time, each is present to some degree.
These five experiences of game feel tell us a lot of interesting things about
the way players experience game feel and the ways game designers utilize
game feel. What they don’t tell us about are the processes—physiological and
psychological—that give rise to these experiences. To understand what game feel
is at these levels, let us now take a slight detour away from human experience and
into human perception.
SUMMARY

-- 52 of 377 --

This page intentionally left blank

-- 53 of 377 --
CHAPTER
Game Feel and
Human Perception
Understanding exactly how humans perceive the video game worlds we create is key
to designing good game feel. We’ll begin by examining our feedback loop model of
interactivity from Chapter 1 in greater detail. By deconstructing each piece of this
system and incorporating the concept of the Model Human Processor, we’ll be able
to define real-time control at the level of specific, measurable properties of human
perception. This will tell us exactly when and how real-time control can exist and
what will cause it to break down. We’ll also look at the computer’s side of things:
what, exactly, are the parameters of machine illusion? Finally, we’ll look at some of
the implications of perception for game feel.
When and How Does Real-Time Control Exist?
In Chapter 1, we defined real-time control as the uninterrupted flow of command
from player to game resulting in precise, continuous control over a moving avatar.
It’s more like driving a car than having a conversation, as we said. The part of the
definition that needs clarifying is “uninterrupted.” What if the player can offer new
input at any time, but the game can only receive it at set intervals? Or what if the
player gets locked out for a certain amount of time, unable to add new input until
an animation has finished playing? In other words, what is real-time control and
how do we know when it’s happening and when it’s not?
Let’s again look at interactivity, this time with more specificity. There are two
halves to this process, the player and the computer (Figure 2.1). On the player’s
side of things, there are unchanging properties of human perception. For example,
there is a minimum amount of time in which a player can perceive the state of the
game, think about how to act and pass that impulse along to his or her muscles.
On the computer’s side, this creates boundaries. To sustain real-time control,
the computer must display images at a rate greater than 10 per second, the lower
boundary for the illusion of motion. The computer must also respond to input
TWO

---

## Sección 17: Chapter 2 to answer these questions.

-- 54 of 377 --

CHAPTER TWO • GAME FEEL AND HUMAN PERCEPTION
within 240 milliseconds (ms), the upper boundary for response time. There’s also
a threshold for continuity; the game must be ready to accept input and provide
response at a consistent, ongoing rate of 100 ms or less. If the game responds to
input sporadically, the flow of control is broken. The onus for maintaining real-time
control, then, is on the computer. The computer’s half of the process is changeable.
The player’s perception is not.
On the player’s side, the minimum amount of time it takes for a person to perceive the state of the world, think about what to do and act on that impulse is
around 240 milliseconds. This is a very short amount of time.
This correction cycle is the increment at which people make the tiny adjustments
necessary to assemble a sandwich, drive a car or exercise real-time control over
objects in video games. The measure comes from Card, Moran and Newell’s “Model
Human Processor,” the collected result of many different studies about human
reaction and response time. The figure of 240 ms is an amalgam of three different
measurements, one for perceiving, one for thinking and one for acting. They break
down as ranges, like so:
● Perceptual Processor: 100 ms [50–200 ms]
● Cognitive Processor: 70 ms [30–100 ms]
● Motor Processor: 70 ms [25–170 ms]
F I G U R E 2.1 Interactivity in detail.

-- 55 of 377 --
What’s being measured here is the cycle time of each processor, the time it takes to
accept one input and produce one output. The variation comes from physiology and
circumstance. Some people have the capacity to process things more quickly than
others and everyone tends to process things more quickly under intense circumstances, displaying a heightened sense of awareness. Likewise, processing speed
goes down under relaxed or sub-optimal circumstances such as reading in the dark.
In the model, each of these steps is defined as its own separate processor and has
its own little cycle time (see Figure 2.2).
WHEN AND HOW DOES REAL-TIME CONTROL EXIST?
F I G U R E 2.2 The three processors: perceptual, cognitive and motor.
Try It Yourself
To appreciate the speed at which your processing functions, I highly recommend checking out humanbenchmark.com’s Reaction Time Test (http://www
.humanbenchmark.com/tests/reactiontime/index.php.) This will give you a
clear sense of just how small the increments of time we’re talking about seem
when you’re able to measure them against the computer. My best reaction time
is around 170 ms. If you’re like me, it will feel a bit weird to actually butt up
against the limits of your own perception. But there it is: you can’t argue with
the precision of the computer measuring your reaction time. It’s neat that we
can measure this!
The idea is that perception, cognition and action are processed separately but
feed into one another, enabling a person to see the state of things, think about how
to change them and then act on that impulse. Note that this is an abstraction of
human cognition—nowhere in the anatomy of the brain is there a structure called
the perceptual processor—but it is a useful one because it lets us put hard numbers
to components of our diagram.
The perceptual processor takes the input from the senses and makes sense of it,
looking for patterns, relationships and generalizations. From all the sensory data, it
creates recognizable state of the world for the cognitive processor.
The cognitive processor does the thinking. It compares intended result to the current state of things and decides what to do next.
The motor processor receives the intended action and instructs the muscles to
execute it. After the impulses leave the body as muscle movements, they’re out into
wild, wooly reality, and the process starts again with sensory perception.

-- 56 of 377 --

CHAPTER TWO • GAME FEEL AND HUMAN PERCEPTION
All of this is happening at step 2 on our chart of interactivity, in the player’s
mind (Figure 2.3).
Correction Cycles and Game Feel
When all three processors (perceptual, cognitive and motor) work together in a
closed feedback loop, the result is an ongoing correction cycle. A correction cycle
happens any time you do something requiring precise coordination of muscles over
time, whether it’s picking up a book, driving a car or controlling something in a
video game. Robert Miller of MIT’s User Interface Design Group describes the process: “There’s an implicit feedback loop here: the effect of the action (either on the
position of your body or on the state of the world) can be observed by your senses
and used to correct the motion in a continuous process.”1
For example, imagine you want to reach out and grab a muffin that’s sitting on
your desk. You formulate intent: to grab the muffin (Figure 2.4). As soon as this
intent is formulated, it is translated into action of your muscles—twist trunk in chair,
activate arm muscles, open hand into “muffin claw” and so on. The moment this
action starts, you perceive the position of your hand in space and see it start to move,
responding to your impulses. The perceptual processor looks at where the hand is in
space, passing that information on to the cognitive processor. The cognitive processor
1 http://ocw.mit.edu/NR/rdonlyres/Electrical-Engineering-and-Computer-Science/6-170Fall
-2005/8B87E671-1B67-4FEF-A655-0ABDF89F4F5A/0/lec16.pdf
F I G U R E 2.3 The three human processors in the interactivity diagram.

-- 57 of 377 --
thinks about where the hand is relative to where it should be and formulates a new
plan to correct that motion. The motor processor then takes the new plan and translates it into action. From the moment movement starts to when you have the muffin
in hand, you run this continuous process of action, perception and thought, increasing precision each time as a factor of distance and size of target (Figure 2.5).
WHEN AND HOW DOES REAL-TIME CONTROL EXIST?
F I G U R E 2.4 Intent: grab the delicious muffin.
F I G U R E 2.5 Grabbing a muffin: an ongoing correction cycle.

---

## Sección 18: Chapter 2 to answer these questions.

-- 58 of 377 --

CHAPTER TWO • GAME FEEL AND HUMAN PERCEPTION
F I G U R E 2.6 Correction cycle time: 240 ms.
Because we know the cycle time of each processor (perceptual  100 ms,
cognitive  70 ms, motor  70 ms) we know the time for each one of these correction cycles, 240 ms (Figure 2.6).
Correction cycles are how people are able to track and hit targets with precision,
steer things, point at things and navigate the physical world successfully. To experience this first hand, check out example CH02-1. Try putting your cursor directly
over the dots as quickly as possible. You can see the correction cycle in action as
you overshoot, undershoot and then hone in, eventually coming to rest on your
target.
Now imagine you’re hungry, and you’re out of muffins. You get in your car and
begin to drive to the muffin store. The overall goal for this trip is to get a sweet, delicious banana muffin. This goal trickles down to different layers of intention, such
as “Turn right on Elk Street.” At the lowest level, it’s about the moment-to-moment
adjustments of the motion of the car to keep it in the lane, stop it at red lights and
so on. As before, you perceive the state of the world, think about what corrections
you need to make to the current motion and make the adjustments happen once
every 240 ms (Figure 2.7).
The process is the same as when you were reaching across the desk except that this
correction cycle goes on longer. The muffin on the desk was static and represented

-- 59 of 377 --
WHEN AND HOW DOES REAL-TIME CONTROL EXIST?
a single target, a single intent. Driving to the store might take 20 minutes, fulfilling
20 different sub-goals.
In a video game, real-time control is an ongoing correction cycle of this type.
As with driving a car, control is an ongoing process where higher-order intentions
trickle down and become individual, moment-to-moment actions. These actions are
a part of an ongoing correction cycle, where the player perceives the state of the
game world, contemplates it in some way, and formulates an action intended to
bring the game state closer to an internalized ideal (Figure 2.8). This happens at the
same cycle time of 240 ms.
The difference is, at the point where action normally goes out to physical reality, a
video game substitutes a game world for the real world. It hooks right in there. The
inputs to the perceptual processor come from the screen, the speakers and the feel
of the controller. The output, instead of acting on objects in the real world directly,
acts on the controller, which translates to movements of objects in the game world.
F I G U R E 2.7 The correction cycle of driving.

-- 60 of 377 --

CHAPTER TWO • GAME FEEL AND HUMAN PERCEPTION
Fitt’s Law
There is a well-known formula, Fitt’s Law, which can accurately predict how
quickly you can move your hand to a target of a particular size at a certain
distance. Fitt’s Law is an unusually successful and well-studied HCI model that
has been reproduced and verified across numerous studies. For reference, the
formula is this:
F I G U R E 2.8 The correction cycle of real-time control in a video game.

-- 61 of 377 --
where:
MT  movement time
a  start/stop time of the device
b  speed of the device
D  distance from starting point to target
W  width of target measured along the axis of motion
The original formula predicted how long it would take to reach out and touch
something of a certain size a certain distance away, as long as it was within
arm’s length. It was later discovered to be equally applicable to the time it
takes to move a mouse cursor to an object of a particular size and shape on a
computer screen, so it is applied and studied by user interface designers. For
example, the menu bar in the Macintosh OS is always present and takes up the
entire top edge of the screen. This means that the “ size ” of the menu bar is
functionally infinite, enabling the user to get the cursor onto it quickly and easily, with very few correction cycles. Compare this to a tiny checkbox button or
a hierarchical submenu.
The Computer Side of Things
Real-time control relies on the computer sustaining three thresholds over time:
1. The impression of motion (display above 10 fps). The frames displayed on the
screen must be above 10 per second to maintain the impression of motion. The
impression will be better and smoother at 20 or 30 frames per second.
2. Instantaneous response (input to display happens in 240 ms or less). The computer’s half of the process must take less than correction cycle for the player.
At 50 ms, response feels instantaneous. Above 100 ms, the lag is noticeable but
ignorable. At 200 ms, the response feels sluggish.
3. Continuity of response (cycle time for the computer’s half of the process stays at
a consistent 100 ms or fewer).
The Impression of Motion
Similar to film and animation, the way that computers create and sustain the
impression of motion is well understood. Think of each cycle of the player’s perceptual processor as a snapshot of reality, incorporating visual, aural, tactile and proprioceptive sensations. Each 100 ms cycle, the perceptual processor grabs a frame of
all these stimuli. If two events happen in the same frame—Mario in one position,
then Mario slightly to the left—they will appear fused, as a single object in motion
rather than a series of static images (Figure 2.9). This is perceptual fusion.
THE COMPUTER SIDE OF THINGS

-- 62 of 377 --

CHAPTER TWO • GAME FEEL AND HUMAN PERCEPTION
From the computer’s side of things, perceptual fusion explains how objects in a
game appear to move. If the display is updated 10 times per second (100 ms cycle
time  10 frames per second) this is sufficient for the illusion of motion. This is
right at the border, though, and won’t feel very good—20 frames per second (fps) is
better, and 30 fps is where motion begins to be pleasingly smooth. Most games run
at 30 fps or higher for this reason. As game developers know, with frame rates that
vary based on processing power used it’s better to be safe than sorry. There’s no
such thing as a frame rate too high.
Instantaneous Response
Perceptual fusion also influences the impression of causality. If I flip a light switch
and the light comes on within the same perceptual cycle, I will register this as a
cause-and-effect relationship. My action caused the light to turn on. The same thing
is true for computer response: if I move a mouse and the cursor seems to react
immediately, I tend to assume that effect was caused by my action. An extension
of this is the impression of responsiveness. Professor Miller describes the process:
“Perceptual fusion also gives an upper bound on good computer response time. If
a computer responds to a user’s action within [100 ms], its response feels instantaneous with the action itself. Systems with that kind of response time tend to feel
like extensions of the user’s body.”
With reality, there’s never a problem of lag. Response will always be instantaneous. In a game, response will never be instantaneous. Even a game running at
60 frames per second, a three-frame delay is all but inevitable. Three frames at 60
frames per second means 50 ms. (You can convert frames per second (fps) to milliseconds if you divide by 60 and multiply by 1000. So 3 frames at 60 fps is 3/6 *
1000  50 ms.)
Mick West, programmer-designer of the original Tony Hawk mechanic, defines
this as response lag. “Response lag is the delay between the player triggering an
event and the player getting feedback (usually visual) that the event has occurred.
If the delay is too long, then the game will feel unresponsive.”2
http://cowboyprogramming.com/2008/05/27/programming-responsiveness/
F I G U R E 2.9 Ten frames per second is the threshold for the illusion of motion.

---

## Sección 19: Chapter 2 to answer these questions.

-- 63 of 377 --
Mick notes that games with a response time of 50 to 100 ms typically feel “tight”
and “responsive” to players. This is because 50 to 100 ms is within one cycle of the
human perceptual processor. Above this level, a game’s controls begin to feel sluggish. The progression, from responsive to unresponsive, is gradual (Figure 2.10).
F I G U R E 2.10 Response time and player perception.
Mick West on Responsiveness
Check out Mick’s articles about programming for responsiveness at www
.cowboyprogramming.com. He offers an awesome technical grounding for
avoiding response lag as well as an engagingly practical way to measure
response time in any game using an inexpensive digital camera (recording both
screen and controller at 60 fps).
There’s no exact point at which a game’s response lag can be said definitively
to have gone from tight to sluggish, because other factors, such as mapping and
polish effects, can shape this impression of responsiveness. But there is a threshold
above which the sensation of real-time control is broken: 240 ms. Past this response
time, the player can perceive, think and act before the computer is ready to accept a
new input.
Continuity
If it takes a player 240 ms to perceive, think and act, how is it that the computer has
to finish its tasks and offer feedback within 100 ms for the response to seem instantaneous? This is because all the human processors run concurrently (Figure 2.11).
The perceptual processor passes information along to the cognitive processor, then starts cycling again. By the time the instructions from that original cycle
have been sent out into the world as movements of the muscles, three perceptual
frames have passed. In real life, this never matters because the response is always
THE COMPUTER SIDE OF THINGS

-- 64 of 377 --

CHAPTER TWO • GAME FEEL AND HUMAN PERCEPTION
instantaneous. When the motor impulse passes to a game, though, there will always
be some lag (Figure 2.12).
What this means is that the game needs to update faster than the player’s perceptual processor is running. If it doesn’t, the feedback from the game will skip perceptual frames, and the player will be aware of the lag. The game has to enable
input at any time even though the player won’t be giving it all the time. This enables
F I G U R E 2.11 The three processors running concurrently, passing into reality and back with
zero lag.
F I G U R E 2.12 The three processors running concurrently, passing into a game and back.
This time, there is some delay.

-- 65 of 377 --
the player to modulate an input over time, adjusting it incrementally. The steering
wheel will remain pulled to the left and the car will continue steering to the left
even though the player adjusts how much it’s turning at 240ms intervals. This is the
threshold of continuity: the computer half of the process must update consistently at
or below 100ms for real-time control to be sustained.
Continuity is tricky to measure. Many games respond to input at some times and
not at others. This can be a frame rate drop, a delay between the computer and the
display or a problem with the processor being overloaded by too much awesomeness in the game (not being able to pass frames along to the display in a timely
manner). Any time the computer’s half of the process takes more than a cycle of the
perceptual processor, the player will notice. If it takes more than a correction cycle,
real-time control is broken.
Other times, however, the delay is part of the game. For example, if I execute a
fierce punch with Zangief in Street Fighter II, I lose control of the character for about
750 ms. This is longer than the threshold needed for an ongoing correction cycle by
510 ms. This temporary loss of control is ignorable, though, because I chose when to
trigger that move. It becomes a risk-reward tradeoff rather than a disruption. It also
makes sense in the context of the game’s unique world. Big dude, heavy punch,
does lots of damage. It should take a long time to execute. I knew what I was getting into. This shows that the continuity of real-time control can be broken without
interrupting the player’s feeling of being in control.
This makes interruption more than simply a response time too long or broken
continuity. It means interruption can be smoothed over by other factors, such as
metaphorical representation. Real-time control, then, is a gestalt. It primarily relies
on the computer sustaining three thresholds over time, the impression of motion,
instantaneous response, and continuity of response.
But the ultimate judge is the player. The designer may have done something
clever with input mappings or animations to mask any interruption to the flow of
control. The end result is an impression in the player’s mind. If it feels like real-time
control, it is.
Now let’s explore perception and game feel implications for game design from a
more general point of view.
Some Implications of Perception for Game Feel
To examine game feel is to see perception in a particular way. First, game feel
includes many senses. Visual, tactile, aural, proprioceptive—experiencing game feel,
these senses combine into one sensation. Second, the notion of proxied embodiment
should be addressed. Game feel enables objects external to the body to be subsumed
into body image and feel like extensions of the body. Third, game feel is an ongoing process of skill building and practice. It is part of the larger realm of human skill
building and relates to skills like driving and playing tennis because it requires the
same kind of repetitive practice to master. From n00b to l33t, as it were. Lastly, a
model for perception for game feel needs to encompass the physical nature of game
SOME IMPLICATIONS OF PERCEPTION FOR GAME FEEL

-- 66 of 377 --

CHAPTER TWO • GAME FEEL AND HUMAN PERCEPTION
feel. Experiencing game feel is like interacting with a surrogate reality which obeys
its own rules and which must be understood through interaction and observation.
Expanding on the experiences in Chapter 1, here are five interesting ideas about
perception that support our definition of game feel:
1. Perception requires action.
2. Perception is skill.
3. Perception includes thoughts, dreams, generalizations and misconceptions.
4. Perception is a whole-body experience.
5. Tools become extensions of our bodies.
Perception Requires Action
In order to perceive something, you have to see it in action. This has been verified
experimentally with kittens and blind people.
The kitten study (Held and Hein, 1963) involved two groups of kittens, each
raised in the dark. The first group was allowed to roam freely, while the second
group was “kept passive” which we can only reasonably assume meant a Clockwork
Orange style tie-down. The experimenters controlled the conditions such that both
groups of kittens were exposed to the same limited stimulus: flickering lights, sounds
and so on. Then, they released the kittens into a normal, lit environment. The ones
who had been allowed to move around in the dark were able to function just fine,
while the ones who were tied down helplessly staggered around as though blind.
What this seems to indicate is that perception is an active rather than passive process. The lights and images used to stimulate the kittens didn’t make much difference; being able to explore their surroundings and perceive things in motion relative
to their own bodies did. To perceive, you need to interact.
Another study (Bach y. Rita, 1972) did something similar with a bunch of blind
folks. The researchers created a special video-camera-driven matrix of stimulation points, shown in Figure 2.13. A TV camera (mounted on spectacle frames)
sends signals through electronic circuitry to an array of small vibrators (left hand)
strapped to the subject’s skin. The pattern of tactile stimulation corresponds roughly
to an enlarged visual image.
Each vibrator was mapped to a particular pixel of the image that the video camera was receiving, giving a sort of tactile image of what the video camera saw. When
the participants were allowed to move the camera themselves, they were able to
learn to “see” in a limited way. If they were not allowed to control what they were
“looking” at, the image stimulus device was just a gentle, if unskilled, masseuse.
The concept that perception requires action has relevance to game feel because it
accurately describes the sensation of exploring and learning your way around an unfamiliar game space. And it correlates physical reality with virtual reality in a meaningful way: the thing you’re controlling in the game becomes your surrogate body, your
hands. Humans are adept at learning the physical properties of a new and unfamiliar

---

## Sección 20: Chapter 2 to answer these questions.

-- 67 of 377 --
object and do it very quickly. Noodle it around in your hands and you soak up a
wealth of detail: weight, density, material, texture, color and so on. This same ability
extends to virtual objects and, interestingly, to virtual worlds governed by different
rules, laws and physics. For some reason, it’s immensely pleasurable to suss out a
new and unfamiliar world by probing around in it using a virtual instrument. The
thing being controlled becomes both expressive and perceptual: as you control it and
move it around, feedback flows back through it to your eyes, ears and fingers.
Perception Is Skill
If perception requires action, that action must be learned. We don’t usually think of
it this way, but perception is in some ways just a set of skills, honed across one’s
lifetime. From the moment we’re born, we learn new distinctions, forge new neural
pathways and generally undertake an ongoing process of becoming better at perceiving. Grab keys. Insert keys in mouth. Rinse, repeat and learn; so it goes until a
fully functional adult emerges. “Perception is to a large extent an acquired bodily
skill that is shaped by all our interactions with the world,” as Dag Svanaes says.
Part of this process is making generalizations and learning abstract concepts like
justice, freedom and cheesecake. Another part is bringing with us all experiences
that came before. There’s a concept from two venerable psychologists, Donald Snygg
and Arthur Combs, that vividly portrays the role past experience, ideas, generalizations and fantasies play in perception: the perceptual field.3 People have a great deal
SOME IMPLICATIONS OF PERCEPTION FOR GAME FEEL
F I G U R E 2.13 A blind subject with a tactile visual substitution system.
Near as I can tell, the idea started with Snygg and Combs in 1951 as the “phenomenal field.” Combs
changed phenomenal field to perceptual field in a later work, so we’ll stick with that. I prefer that anyway, as it’s more descriptive of the concept as it applies to game feel.

-- 68 of 377 --

CHAPTER TWO • GAME FEEL AND HUMAN PERCEPTION
of practice navigating the space around them and developing relationships with the
things in that space. Snygg and Combs capture the phenomenon of memory, perception and skill building with their concept of the perceptual field.
The idea of the perceptual field is that perception is carried out against the backdrop of all previous experience, including our attitudes, thoughts, ideas, fantasies
and even misconceptions. That is, we don’t perceive things separately from what’s
come before. Rather, we experience everything through the filter, against the background, and within the structure of our own personal vision of the world. Another
way to put it is this: “one’s constructed representation of objective reality; the
meaning given to the profusion of stimuli that bombard the brain and are organized
and conceptualized on the basis of individual and personal prior experiences.”4
And still one more way: “The perceptual field is our subjective reality, the world we
are aware of, including physical objects and people, and our behaviors, thoughts,
images, fantasies, feelings, and ideas like justice, freedom, equality, and so on.”5
So your perceptual field is your world; your structural understanding of everything you perceive around you and its meaning.
This is a cool idea because it goes a bit beyond the notion of a simple mental model, which is more about the dry, clinical details of how a person thinks a
thing functions (usually compared to the system image, the way the thing actually
functions).
In the case of a video game, the brain recognizes that the “world” of the game is a
subdomain, a microcosm of the larger perceptual field of reality that it understands.
It’s apportioned, separate and obeys its own rules. At the same time, the mind brings
all its past stored experiences to the table to help it understand this new place.
The difference is that a game world is not necessarily governed by the rules of
physical reality or bound by them. This is a useful way to think about the creation
of game feel—as the creation of a separate but related physical world. Simplified,
but whole, cohesive and self-contained. Many times, creating and tweaking a game
feel system means literally the construction of a set of generalized laws and rules
that govern all action within the system. It’s like writing your own universe from
scratch: you have your own gravity, your own simple momentum and friction, your
own simplified definition for what collision between two objects means and how it
should be resolved.
The world around you is objective and immutable. You’re not going to wake up
one morning and discover that gravity has suddenly stopped working as expected.
I throw a grapefruit at a wall, it’s going to hit the wall with a thud and fall to
the ground. This kind of consistency can be frustratingly difficult to achieve in a
game world.
Because the way we cope with and understand events in a game world is so
similar to the way we interact with the real world, we expect the same consistency.
The tiniest thing can break this perceptual immersion.
http://phenomenalfield.blogspot.com/
Dr. C. George Boeree, http://webspace.ship.edu/cgboer/snygg& combs.html

-- 69 of 377 --
Unlike a film, which presents one framed perspective on a world and has only to
maintain visual and aural consistency within that frame, a game has to stand up to
active perception. The player can freely explore every possible permutation of every
action and response in the entire world. This is the skill of perception, the one every
human being has been constantly honing since birth.
Because people are extremely skillful at perceiving the world around them, any
tiny inconsistency becomes glaring and obvious. A character’s foot clipping through
a stair, an invisible wall—these things never happen in the world around us. So this
process of discovery is much closer to our experience of being in the world than the
experience of passively viewing a film or reading a book.
The same mechanisms we use to cope with the world around us, to understand
it and function within it, come into play when exploring a game world. It is the
same process of expanding the perceptual field into this new world and probing
around to make the generalizations and distinctions needed to interact with and
succeed in the world.
This is why a consistent abstraction is so much more important than a detailed
one. It’s fine to create a simplified version of reality for players to interact with;
they’ll figure out the parameters of the world—its constraints, rules and laws of
physics—within minutes of picking up the controller. Just don’t violate the rules you
yourself have set. If an object is portrayed as being large, heavy and massive, don’t
let it go flying off into space with the slightest touch, or pass through another object
without interaction. Easier said than done, of course, but this is at some level a
designer’s decision. Better to have a simple, tight, cohesive world like Dig Dug than a
weird, inconsistent world like Jurassic Park: Trespasser. People are going to figure out
everything about your world either way—our physical reality is much more complex
and nuanced than any game world, and we’ve got years of experience at perceiving
it—better to make it simple and self-consistent than a broad inchoate mess.
Perception as skill is also correlated to the way people get better at things over
time. You practice something, you get better at it. Your perceptual field includes an
ever-growing body of experience about the task, which makes each new try at the
task easier. It’s not just a bank of information to draw on, but affects what happens
at the moment-to-moment level of perception and action. Chris Crawford would say
that the neural pathways are getting pushed farther and farther down, away from
conscious processing and into subconscious, automatic processing.
Merleau-Ponty defines this distinction as abstract versus concrete movements. If
an action is unpracticed and requires conscious thought and effort, it is an abstract
movement. If it’s so practiced that it happens automatically and without conscious
thought—a pure translation of intent into action—then it’s considered a concrete
movement. By this process, people learn things incrementally over time, turning
what was once difficult and requiring deep, conscious involvement, into an easy
and subconscious action. Clearly, this is what happens with game feel, though the
process is almost always much quicker when learning a game skill.
However we conceptualize it, it is obvious that humans get better at skills they
practice. And if we consider all perception to be a skill, this handily explains why
SOME IMPLICATIONS OF PERCEPTION FOR GAME FEEL

---

## Sección 21: Chapter 2 to answer these questions.

-- 70 of 377 --

CHAPTER TWO • GAME FEEL AND HUMAN PERCEPTION
game feel seems like such a skill-driven activity, why skill learning is the price of
admission to experience it. Perception in a game world is just a simplified, modified
version of perception in the real world. The rules are different, but the process is the
same.
Perception Includes Thoughts, Dreams, Generalizations and
Misconceptions
Another interesting offshoot of the concept of the perceptual field is that it encompasses not only physical reality, but attitudes and ideas. Perception of something
is heavily influenced by biases, ideas, generalizations and worldview, all of which
have become incorporated into the perceptual field through a lifetime of experiences. Of course, generalizations about a particular thing may not accurately reflect
the objective reality of that thing.
For example, I have a central heating and air conditioning system in my apartment. One day I was cold and wanted to adjust the temperature. The wall mounted
control unit displays the current temperature based on a thermometer which is …
somewhere in the apartment. I hope. I think. The current temperature is compared
to a sliding blue control representing the desired temperature. I assume that if
I move the sliding control to a temperature different from the actual temperature,
the air will turn on and will adjust the temperature. The current temperature reads
61°. I move the control from 63 to 75. The cold air turns on briefly and then turns
off. A few minutes later, the air turns on for a longer period, blowing warmer air,
then turns off. Eventually I get fed up and turn the temperature to 90°. Again, the
air turns on for a few minutes, warm, and then turns off. I get a blanket. An hour
and a half later, I walk into my office, the door of which has been closed and I’m
suddenly sweltering hot and realize I’ve left the temperature on at 90°. I toss the
blanket, strip down to a T-shirt, and check the thermostat, which now reads 77°.
I put the thermostat back down to 72. The air turns on for a few minutes, cold, and
turns off. Gah!
What’s going on here? In my conceptual model of the heating system, there is a
certain threshold between the actual and desired temperature. If that threshold is
exceeded—if the desired temperature is 3° above or below the actual, for example,
the system turns on and applies an amount of heat or cold equal to the change in
temperature that’s necessary to bring actual back in line with desired.
The reality of the system is that it turns on and blows air, either hot or cold, for
a certain duration. Five minutes of hot or five minutes of cold, depending which
way the temperature is supposed to go. The hot isn’t particularly hot, and the cold
isn’t particularly cold, but applied across a long enough time scale, they get the job
done. In addition, the timer that governs how long each on state should last functions independent of the controls. That is, it’s always counting down five minutes
at a time. If you switch the heat on with 30 seconds remaining on its five minute
cycle, you get 30 seconds of cold air because it takes a while for the heater to warm

-- 71 of 377 --
up and there are only 30 seconds of “on” remaining before the system goes back to
the off state. (Oh, and the thermostat, evidently, is in the office.)
Donald Norman would say that my mental model is out of sync with the “system
image” of the heating system. I hold in my mind a logical construct, a picture of
how the system works, but that picture is wrong. This construct frames my interactions with the system and dictates my expectations about what the result will be for
a particular input. If my mental model differs from the system image, the way the
system actually functions, errors occur. Norman would say that this is the designer’s fault and go on to point out that the “design model”—the way the designer
imagined the user would interpret the system—is out of sync with the user’s mental model. This is definitely applicable to game feel as it helps greatly in designing
what players refer to as intuitive controls. Norman suggests seeking out and exploiting “natural mapping” between input device and system.
For example, in Figure 2.14, Stove C makes more sense than stoves A and B and
is far easier to operate because there is a clear, spatial correlation between the position of the knobs and the position of the burners they operate. Finding natural mappings in games is a similar process, though not always an obvious one. I like the
SOME IMPLICATIONS OF PERCEPTION FOR GAME FEEL
F I G U R E 2.14 Three configurations offer three different correlations between stove burners
and controls.

-- 72 of 377 --

CHAPTER TWO • GAME FEEL AND HUMAN PERCEPTION
example of the game Geometry Wars, which tends to be easy for people to pick up
and play effectively—the movement of the thumbstick corresponds very obviously
to the motion of the little ship in the game making this something of a natural mapping, albeit one in a virtual space (see Figure 2.15).
The only problem with Norman’s concept of the mental model is its rigidity. To
say I have a mental model of the world of The Legend of Zelda: The Wind Waker
could be useful to isolate and tune certain mechanics, to eliminate ambiguities and
make the controls more intuitive, but it ignores the fact that I have a relationship to
that world. I feel a certain way about it and think a certain way about it, and breaking that down into a dry, clinical, logic diagram seems to ignore some of the most
important parts of that relationship, some of the parts the designers understood and
worked really hard to develop.
For example, it’s extremely important to the success of the game that I feel a
sense of freedom and adventure while sailing the open seas in the game. I could
F I G U R E 2.15 The motion of the thumbstick in Geometry Wars offers a simple and clear
connection to the action taken by the ship.

-- 73 of 377 --
distill that to a system image of my possible actions while sailing, but that would
miss much of the point; it’s not as important to track exactly how far objects are
spaced apart or how far I can sail in one direction before hitting something or how
long it takes to get from object to object as it is to make the space of that world feel
open, free, but full of possibility. I can sail aimlessly in a particular direction and be
certain of two things: 1) I’ll be free to sail as far as I want in that direction and 2)
eventually I’ll find something new and interesting. The system, speed of the ship,
sharpness of turning, distance between islands and so on, would be interesting to
track, as would a player’s mental model of that system. But it definitely misses one
of the essential experiential qualities of the game. A few small changes to the system, making the ship move 20 percent slower for example, could make the oceans
of Wind Waker feel imposingly large, tedious or lonely. The idea of a perceptual
field that incorporates not only the system image, but the thoughts, ideas, feelings
and generalizations about the system that players have brought with them, and
is constantly forming and reforming, is a much more effective for understanding
that experience.
Another important thing that Norman’s mental model concept ignores is paradigm shifts. “Aha!” moments, as master puzzle designer Scott Kim would say. For
example, another Zelda game I’ve been playing recently is The Legend of Zelda:
Phantom Hourglass for the Nintendo DS. In that game, there is a particular puzzle that requires players to expand their perceptual field. In one particular part of
one temple, players are told to step up to an altar and “stamp” their “map” with
the location of a new area to be explored later (see Figure 2.15). At first, this puzzle
threw me for a loop.
To access new areas in The Legend of Zelda: Phantom Hourglass, you first need
a “sea chart” for that area. The new location to be stamped is outside of your current available areas, but clearly corresponds to the map you’ve had access to and
used throughout the game. I systematically exhausted each possible action I had
ever used in the game, and then some I’d only ever used in other games. I pressed
buttons, I scrubbed the stylus back and forth in every conceivable pattern. I drew
X’s and O’s, I traced the pattern of the Triforce over and over again. Nothing in my
perceptual field equipped me to deal with this puzzle. Clearly, my current understanding of this system was inadequate and flawed somehow. I had to take a step
back and reflect on my perceptual field. So I started thinking about other possible
interpretations of stamping, and other possible ways I might stamp this stupid map,
short of putting the DS on the floor and stamping it with my foot. The solution
eventually occurred to me: close and open the DS quickly. It’s sort of a stamping
motion, as you can see in Figure 2.16.
The problem was my perceptual field: in my combined understanding of the DS,
how the DS functioned and the possible actions in the game, there was no reference
point for using the functional opening and closing of the DS as an action in the
game. Across all my experiences with playing DS games—which are numerous—I
had never come across a game that used the functional closing and opening of the
DS’ lid as a button. New Super Mario Brothers says “Goodbye!” in Mario’s voice if
SOME IMPLICATIONS OF PERCEPTION FOR GAME FEEL

---

## Sección 22: Chapter 2 to answer these questions.

-- 74 of 377 --

CHAPTER TWO • GAME FEEL AND HUMAN PERCEPTION
you close the lid of the DS while the game is still on, but that was my only point
of reference, my only hint in the entirety of my perceptual field. I solved the puzzle
through a paradigm shift, by seeing the system in a new and different way. I felt a
rush of pleasure and enjoyment as I incorporated this new information about the
very nature of this game’s universe into my perceptual field. I had amended and
changed my mental model not only of this particular game, but of all games I’ll
ever play on my DS in the future. This was not an error or a breakdown in my ability to interact with this system, but the point of the puzzle and, in some sense, the
whole game.
So what’s going on here? I was rewarded with pleasure by expanding my perceptual field. Norman’s mental model would call this an error, blaming the designer for
misleading the player. Since this is one of the fundamental pleasures of playing this
game, clearly something’s missing. The perceptual field gives us a way to understand that game feel is as much about how players feel about a particular space and
their relationship with it, as it is about the dry clinical details of the mental model of
that space they keep in their minds to help them deal with and understand events in
that game world. The dry details are important—they represent the player’s understanding of the physics and rules of the game world and are a great way to find dissonance that causes player confusion—but they are not everything.
Perception Is a Whole-Body Experience
Eyes, ears, tactile sense, proprioception—there is no separation when a person
perceives something.
F I G U R E 2.16 Closing the DS as an input  unexpected.

-- 75 of 377 --
For example, a fork. It’s shiny and it has a pointy end. It’s cold, hard and solid,
but easy to pick up. I can eat food with it. It sinks in water. My ideas and perceptions about what that object is, how it behaves and what it means, combine into the
concept of “fork.” This is my attitude toward forks and generalizations I can apply
later to other fork-like objects. The subconscious nature of perception masks a complex process, one which involves all the senses and which constantly and rapidly
brings us closer to the world we inhabit.
The takeaway here is not to think of each kind of stimuli as somehow separate, but as an integrated part of perception. This is how a combination of visuals,
sounds, proprioceptive sensations (from the position of the fingers on the controller or whatever) and tactile sensations (from controller rumble or haptic feedback)
become a single experience in a game. A game world substitutes its own stimuli for
those normally created by interacting with the real world, but the experience of perception is much the same. This also indicates why we’re so sensitive to inconsistencies between stimuli. If a large hulking mass of a character steps through a staircase
or has their arm pass through a wall, the brain says, “Hey, that’s not right!”
The experience of perception of real-life phenomenon never has inconsistencies
across stimuli so the brain has a hard time ignoring them when they happen in a
video game.
Tools Become Extensions of Our Bodies
As we said in Chapter 1, a tool, once picked up, is an extension of the senses. It is
used for both action and perception. Intent and action can be expressed through the
tool as though it were a part of the body, and feedback flows back through it.
Another way to visualize this is to think about a blind man’s cane. When the
blind man first starts using a cane, it is unfamiliar and requires a lot of reflection.
The tapping movements are unpracticed, abstract movements to him. As he gradually builds skill at perceiving the world through the cane, he is able to more accurately and effortlessly tap around, getting a clearer read on his surroundings. His
intent begins to flow effortlessly from the cane, any barrier between himself and the
cane is removed, and the cane becomes an integrated part of his perceptual field.
The cane now acts just as his hand would; it probes around, touching things, interacting with the world around him and returning him crucial orienting feedback. This
helps him establish a much larger personal space (also sometimes called the “perceptual self”). Quite literally, his perceptual field has been extended to a much larger
physical area around him. Effectively, he’s made his arm’s reach much greater. We
might say that by integrating the tool of the cane, he’s changed his world.
So what does the blind man and his Cane of Reaching 3 teach us about game
feel? One interesting distinction is between body space and external space. When
we interact with the world, we perceive our bodies in two ways, as part of our
self and as one object among the many objects of the external, objective world. As
Dag Svanaes puts it: “The bodily space is different from the external space in that
SOME IMPLICATIONS OF PERCEPTION FOR GAME FEEL

-- 76 of 377 --

CHAPTER TWO • GAME FEEL AND HUMAN PERCEPTION
it exists only as long as there are degrees of freedom and a skillful use of this freedom. The bodily space is mainly given by the subject’s specific potentials for action.
For a totally paralyzed body with no kinesthetic experiences, there is no bodily
space. Different bodies give rise to different spaces, and so do external factors such
as clothing, tool use and different kinds of prosthesis. It is important to notice that
learning a new skill also changes the body space.”
This idea, that bodily space is defined by the potential actions of one’s body
in the world, correlates very clearly to the way players interact with game worlds.
Players tend to think in terms of abilities and constraints within a game world. It is
possible, and often desirable, to create a game where abilities change across time,
where the avatar itself has different tools that change across time. For example, if
I’m playing as Samus Aran my abilities, my “bodily space” as Samus within the
game world of Metroid, are defined by the abilities currently available to me. I may
or may not have the Morph Ball. If I do, I can transform into a small rolling sphere
and explore tiny corridors. The very nature of the world has changed, as has my
potential to interact with it. The objective world of Metroid is the same as it ever
was—every block is still in the same position it was before. My abilities, my verbs,
my virtual bodily space have changed the world.
The interesting thing about this thinking is that it does not consider Samus
Aran a tool. To say that we can incorporate a tool into our bodies, that the tool can
become an organ of expression and perception, and that our identity and perceptual
field subsume it is useful, doesn’t quite define what happens when a player takes
control of an avatar in a game. I wouldn’t call Samus Aran a tool. Not just because
she has an “identity” as a freestanding character that I’m temporarily inhabiting
and controlling, but also because she has her own bodily space. She has her own
tools which can become a part of her body and extend her own perceptual space.
In this way, a video game world is truly a microworld, and perception within this
microworld is a surrogate for real-world perception. It’s an interesting idea—it
seems to explain why identity in a video game is so very malleable. You can go
from “being” Gordon Freeman one moment to cursing his vile clumsiness the next.
This is because the constructed subdomain of a video game reality provides two
other kinds of spaces: virtual bodily space and virtual external space.
A video game has its own model of reality, internal to itself and separate from
the player’s external reality, the player’s bodily space and the avatar’s bodily space.
The avatar’s bodily space, the potential actions of the avatar in the game world, is
the only way in which the reality of the external reality of the game world can be
perceived. As in the real world, perception requires action. The difference is that
the action in the game world can only be explored through the virtual bodily space
of the avatar. Players extend their perceptual field into the game, encompassing the
available actions of the avatar. The feedback loop of perception and action that enables you to navigate the world around you is now one step removed: instead of
perceiving primarily through interaction of your own body with the external world,
you’re perceiving the game world through interaction of the avatar. The entire
perceptual apparatus has been extended into the game world.

---

## Sección 23: Chapter 2 to answer these questions.

-- 77 of 377 --
To wrap back to our earlier discussions of identity and game feel, how does this
concept of avatar as perceptual substitute, rather than extending tool, relate to proxied embodiment? Because a game world represents its own reality external to its avatar’s bodily space in the same way that the physical world is external to our own
bodily space, it seems much more like a substitution than an extension. The same
might be said for identity. We said that objects outside ourselves—and objects in a
game world—can become extensions of identity. Vessels for identity might be more
accurate. The view of tool as extension of body defines the “self” is in terms of perception. The perceptual self is the immediate surrounding environment and your
ability to interact with it, your potential for action. To say “he hit me!” instead of “he
hit my car” or “his car hit my car” is an artifact of the way we perceive the immediate environment around us and the fact that an inanimate object can become a part
of the perceptual self, part of the perceptual field. You literally perceive the world
through the car as you actively control it. Again, though, the way we perceive game
feel seems to be much more of a substitution than an extension. I perceive the world
of Hyrule as Link, via his virtual body space. My identity intermingles with Link’s as
I take over and make my own his skills and abilities, his bodily space.
Summary
Where and when does real-time control exist? On the human side of the
equation, we categorized three types of processors (perceptual, cognitive and
motor), which work together in a closed feedback loop. This feedback loop results
in an ongoing correction cycle. In a video game, at the point where action normally
goes out to physical reality, the designer substitutes a game world for the real world.
This reinforces the idea from Chapter 1 that game feel is an experience of a unique
physical reality.
On the computer side, real-time control relies on sustaining three time thresholds: the impression of motion, perceived instantaneous response and continuity of
response. Knowing the duration of the human correction cycle and the relationships
between the three human information processors, we can say with certainty that a
particular game has or does not have real-time control. The unknown variable here
is the player’s perception. In the end, game feel is an impression in a player’s mind.
Examining the frame rate, response time and continuity of response in a game and
comparing this to the thresholds of 10 fps for motion, 240 ms for control and 100 ms
for continuity gives us a baseline and is useful for classification. But motion at 10 fps
feels stilted and a 200 ms response time feels sluggish. These impressions can be
smoothed over by the use of gestural input or by playing back animations. In the
end, the player’s perception is what’s important. The ultimate goal for game feel is
to create an impression in the player’s mind.
Finally, we looked at some of the other implications of human perception:
1. Perception requires action.
2. Perception is a whole-body phenomenon.
SUMMARY

-- 78 of 377 --

CHAPTER TWO • GAME FEEL AND HUMAN PERCEPTION
3. Perception is an effortless fusion of visual, aural, tactile and proprioceptive
stimulus.
4. Perception is an ongoing process of skill-building.
5. Perception can be extended to tools.
These explain, in terms of human perception, the experiences outlined in Chapter 1.
Understanding how human perception works offers us insight about the imperfect
apparatus of human perception that we’re designing for. Knowing this will help us
to develop a palette of game feel that’s separate from the emulation of reality and
doesn’t borrow from film or animation except where applicable. If we understand
how perception works, we can build games that feel good instead of trying to build
games that feel like things that feel good.

-- 79 of 377 --
CHAPTER
The Game Feel Model
of Interactivity
Now we are ready to create an overall model of what game feel looks like. If we
take the building blocks of game feel from Chapter 1, plus the five experiences of
game feel we categorized, and add them to the interactivity diagram from Chapter
2, with its three human processors (perceptual, cognitive and motor), we have a
model of game feel that looks like Figure 3.1.
The perceptual field is your constructed model of objective reality, of the “real”
world around you. It provides the background for perception, whether in the game
or in the real world. Shimmers of former experiences, skills learned, ideas, generalizations, thoughts, concepts, fantasies and misconceptions all form the construct
within which perception occurs. Sometimes, when it’s clear your perceptual field
is inadequate to deal with a particular situation, you consciously reflect on your
understanding of the world around you in an effort to expand your perceptual field.
You try to find the holes in your comprehensive model of objective reality. This can
be a pleasurable process, as when you undergo a paradigm shift to solve a puzzle,
or a stressful one, such as when you lose your keys in the sofa.
The game world is a simplified subdomain of the real world. Your brain substitutes the stimuli it’s getting back from the game world for those it normally
gets from the real world. This includes sights, sounds, tactile sensation such as
controller rumble and joystick or button push-back and the proprioceptive feedback it gets from the position of your fingers on the input device. All this feedback is extrapolated to a mental construct of the microworld represented by the
game. This is an abridged, simplified version of the process by which you experience, learn about and cope with the physical world around you. As such, it includes
not only the tactile, visual and aural experience of exploring the game world, but
the higher-level implications of those experiences. For example, if my character always falls back to the ground after jumping, I assume there is some kind of
gravity. If my character runs into things instead of passing through them, I assume
those things are solid. As in the real world, simple interactions yield a wealth of
THREE

---

## Sección 24: Chapter 2 to answer these questions.

-- 80 of 377 --

F I G U R E 3.1 The model of interactivity brings together all the elements of the the gamer, the game and the world around him or her.

-- 81 of 377 --
knowledge: generalizations, ideas, concepts and misconceptions about the nature
of the world. All of these things are integrated into the perceptual field as they are
experienced.
The avatar is the player’s instrument within the game world, both for perception
and for expression. The movement of the avatar provides indirect insight into the
nature of the game world the same way our own hands may touch and probe and
noodle things around in order to experience them while our eyes and ears observe
the results. Perception requires action, as we’ve said, and all perception of a game
world must pass through the avatar.
With those three elements in mind, let’s step through Figure 3.1 and try to “bring
alive” the active process of game feel. Remember, this whole thing is happening at
a cycle time of around 240 ms, four or five times per second. Let’s start with the
human processor—the player.
The Human Processor
The human process is marked at “1” in Figure 3.1. Stimulus comes in through
the eyes, ears, fingers and proprioceptive senses. It is perceived at a cycle time
between 50 and 200 ms, depending on individual and circumstance. If two stimuli
are perceived within the same perceptual cycle, they appear fused, as with multiple
frames of an animation fusing into a single, moving character. If an action passes
out through the motor processor and the response is perceived in the same perceptual frame, there is a strong bias toward experiencing action and response as causal
(“My action caused this result”).
If this is an ongoing process, where perception, action and contemplation of the
same object happen in rapid succession over and over again, the experience is one
of control fusion—through my actions, I feel I am controlling something external to
me. This is what enables us to pick things up and move them, to throw and catch
things, and to generally interact skillfully with our immediate bodily surroundings.
When this process of ongoing control is able to flow uninterrupted and the
intent being served is more complicated than a single, simple action (grabbing
a muffin, for example) then we have a correction cycle, which happens around
240ms and which is, at its core, the experience of game feel. As this process is running, the perceptual field is in the background coloring, ordering and assigning meaning to all new experiences. As soon as the experience happens, it is incorporated into
the perceptual field, expanding it. Skills are built, memories are formed, life is lived.
Muscles
Marked at “2” in Figure 3.1, the impulses from the human processor flow out
into the real world. The muscles of the hand execute the orders handed down by
the motor process, which has in turn been directed by the cognitive process. In
THE HUMAN PROCESSOR

-- 82 of 377 --

CHAPTER THREE • THE GAME FEEL MODEL OF INTERACTIVITY
addition, the hand provides tactile and proprioceptive feedback to the perceptual
processor, the “megaphone for your thumbs” mentioned in the Chapter 1 section on
game feel as proprioception.
Input Device
The input device is marked at “3” in Figure 3.1. The input device is the player’s
organ of expression to the computer. All intent passes through the filter of the input
device before it can be interpreted by the system and used to update the state of the
computer’s model of the game’s reality, which is different from the player’s. The
motivation and experience of the player are more complicated than this in many
ways, but if the goal is to better understand the pieces of game feel that are malleable to the game designer, it’s convenient to think in these simplified terms. The
player has a particular intent at a given moment in time, and he or she expresses
that intent to the system via the input device. Whatever the input device is, it has
affordances and constraints. It will lend itself to controlling certain kinds of motion
more readily than others and has its own physical feel and character which will
ultimately affect the experience of game feel as perceived by the player.
The Computer
The computer is “4” in Figure 3.1. In one sense, the computer does its own perceptual, cognitive and motor processing. It accepts input at a certain rate, thinks
about it for a certain amount of time, and then responds, sending signals to its output devices. As with the human processors, the computer has a cycle time for this
whole endeavor. In the case of the computer, though, the response needs to happen
quickly enough for the player to perceive the response as instantaneous—within
one perceptual cycle (as little as 50 ms) of receiving input from the player.
For game feel to occur uninterrupted, input from the player’s muscles needs to
travel through the controller, be processed and come back as changes in pixels and
sounds before one entire cycle of the player’s perceptual processor has finished. The
computer needs to perform its half of the cycle faster than the player can perceive. If
this occurs, the player will see the series of incrementally changed visual frames as
a single moving object and will feel it reacting immediately to the input. The player
will readily interpret a cause and effect relationship, and the impression of control
is complete.
The Game World
The game world is marked “5” Figure 3.1. For our purposes, the game world exists
primarily in the player’s mind. There is also an internal representation of the game
world that exists in the computer, one which is more precise and mathematical than

-- 83 of 377 --
the rich, expressive world experienced by the player. But a game system is designed
to output to an experience in the mind of the player. For the player, the output
devices are a window into the game world, and the avatar acts as a proxy within
that world. The player perceives the game world actively, through the “body” of
the avatar. Experiencing game feel is feeling out the game world, making additional
distinctions, and learning skills, concepts, and generalizations that make coping
with the unique world easier.
This is essentially the same process we undergo in our everyday lives. A game
world slots itself into the player’s action → perception → cognition cycle, replacing the physical world’s roles of accepting input and returning feedback. A game
world is simpler, easier to understand, and has clear, finite goals. This makes learning game skills faster, easier to measure, and, in many ways, more appealing than
real-world skills.
Output Devices
Marked at “6” in Figure 3.1 is the output device. The output devices, which may
include a monitor, speakers, controller’s rumble motors, haptic feedback device and
so on, are the player’s window into the game world. The monitor and speakers are
where the processing of the computer reaches reality. They are the computer’s organs
of expression to the player. The completed processes have resulted in an updated
system state for the computer, and it sends visual, aural and tactile feedback out
through its various channels into the world and, as we looked at in Chapter 1, the
position of the hands or other body parts on the input device offers the player proprioceptive feedback which can be reconciled with what’s happening on the screen
or coming through the speakers. Moving my thumb this far moves the character too
fast, so I subconsciously ease off the thumbstick by a millimeter or two.
The Senses
The loop is complete at the player’s sense, marked “7” in Figure 3.1. The senses
take in the updated state of the game world. The eyes, ears and hands (both tactile
and proprioceptive senses) perceive the new, changed state of the game’s reality
and pass them along to the perceptual processor. The cycle, having taken less than
half a second, is complete. The motions are amplified into the game world but still
have a real-world position that’s being perceived by the hands via the proprioceptive sense.
I’m keeping the Model Human Processor and meshing it with the perceptual
field. In my model, the perceptual field is fused with the perceptual and cognitive
processors, being at once a filter for new perceptual information, a framework in
which to slot it, and an ever-expanding reference library which contains not only
information about the meaning to assign each new stimulus but your schematic
diagrams of your world and everything in it.
THE SENSES

---

## Sección 25: Chapter 2 to answer these questions.

-- 84 of 377 --

CHAPTER THREE • THE GAME FEEL MODEL OF INTERACTIVITY
The Player’s Intent
To complete our model, we need to account for intent. On one level, it’s an interesting question: where does intent come from? What motivates us to do what we
do? This question is perhaps more satisfying as applied to game worlds because
it can be answered definitively. Intent in a game world is designed by a game’s
creator; we don’t have to wonder at its origins, divine or otherwise. As for real-world
intention, French Philosopher Maurice Merleau-Ponty thinks that people have an
“in-born intentionality towards the world.” To say: “we’re born with it,’” though,
seems like a bit of a cop-out.
Maslow has some more interesting things to say about the nature of human
motivation with his pyramid of wants (see Figure 3.2). At the bottom are things like
satisfying your basic physical needs for food, shelter and warmth. Moving up, you
find security, love, self-esteem and, finally, self-actualization. The idea is that at any
time, if one of the lower rungs is unsatisfied, consciousness dips down to that base
level until that need is sated. People are constantly trying to reach higher and higher
on the pyramid, striving for creative satisfaction and whatnot. Sims, it seems, have
a hard time getting above the toilet level.
The pyramid fits with how Snygg and Combs incorporate intentionality and
motivation into their perceptual field. They envision a “perceptual self”—the vision
of yourself that exists as part of your own perceptual field. This is a cool concept, as
it seems to explain things like those self-immolating Tibetan monks from the Rage
Against the Machine album cover. A person can do things that don’t seem to serve
his or her body very well—lighting oneself on fire being one possible example—
but which enhance the perceptual self. You see yourself as a martyr, dying for a
F I G U R E 3.2 Maslow’s hierarchy of needs starts with the basic physiological needs and
moves upward to self-actualization.

-- 85 of 377 --
cause greater than yourself. Thus your own self-image, the embodied qualities of
yourself as you perceive you, is enhanced. And made more crispy.
Whatever the origin of human motivation is in reality, though, it is true that
part of game design is crafting goals, implicit or explicit, to motivate action in game
worlds. This is one of the dark arts of game design—creating meaningful, compelling intent from a seemingly arbitrary collection of abstracted variables. Think,
for example, of the coins in Super Mario 64. Ask yourself: if you didn’t get a star
for collecting 100 coins or if they did not restore Mario’s health, would you bother
collecting them? No, of course not. These are the arbitrary relationships between
abstract variables that give coins meaning in the game world of Mario 64. The star
itself is given meaning only by being rare and powerful, one of only 120 in the
whole game, each of which is a clear, measurable step toward unlocking the entirety
of the game’s levels, the (explicit) goal of defeating Bowser or the (implicit) goal of
collecting all the stars.
This is one of the most appealing aspects of video games for many players.
A game world’s logic is simple, easy to understand, and provides clear incentives,
rewards and feedback for effort invested. It’s safer than the chaotic and arbitrary
nature of everyday life. It’s comforting. In many cases, it rewards mediocrity or
at least makes it ignorable. Whether this is good or bad is a different question, but
it is worth noting that most game worlds do in fact have in-born intentionality, and
it’s the game designer who creates it.
Summary
The game feel model of interactivity offers a comprehensive picture of how game
feel occurs as a process. Each element involved in the process—the human processor, human muscles, input device, the computer, the game world, output devices,
the senses and the player’s intent—is necessary to keep the cycle running.
1. The human processor—where perception and thinking happen and motor
instructions are created.
2. Muscles—The motor instructions are executed as muscle movements.
3. Input device—The muscle movements are translated into a language the computer understands.
4. The computer—Where all processing happens, including integration of input
with the current state of the game world.
5. The game world—The computer’s internal model of the game’s reality.
6. Output devices—The updated game state is output into a form the player can
understand.
7. Senses—The player perceives the updated state through sights, sounds, touch,
and proprioception.
SUMMARY

-- 86 of 377 --

CHAPTER THREE • THE GAME FEEL MODEL OF INTERACTIVITY
The player’s side of things does not change because of the fixed properties of
human perception, which limits the game designer’s area of influence. On the computer side of things, a designer is unlikely to have a role in creating the input device,
the computer or the output devices. The game designer’s palette, then, is contained
within steps 4 through 6.
Examining all the pieces in a cohesive model, we can finally make a firm delineation between games that have game feel and those that don’t. The model provides
a framework for understanding where things might be improved in a particular
design, and a foundation for creating game feel from scratch.

-- 87 of 377 --
CHAPTER
Mechanics of
Game Feel
To wrap up our section on defining game feel, let’s apply all the ideas from Chapters
1, 2 and 3 to some specific games. To do this, we’ll return to our three-part definition of game feel: real-time control, simulated space and polish. The overall question to be answered is where a game fits on the diagram (Figure 4.1).
This breaks down, once again, into three questions:
1. Does it have real-time control?
2. Does it have simulated space?
3. Does it have polish?
FOUR
F I G U R E 4.1 Types of game feel: we want to put every game somewhere on the diagram.

-- 88 of 377 --

CHAPTER FOUR • MECHANICS OF GAME FEEL
From our model, we have measurable thresholds for real-time control to test
against:
● 10 frames per second. The images are displayed at a rate faster than one cycle of
the human perceptual processor, which will be 50 to 200 ms. Therefore, images
displayed at a rate at or above a rate of 10 frames per second will appear fused
into motion, and 20 frames per second or higher is necessary for a smooth
motion. In the case of a game, this is not a series of linear frames played back in
sequence but a series of states generated in response to input.
● Response time of 100 ms or less. The game’s response to input happens within
one perceptual cycle (50 to 200 ms) of the player’s action, fusing into a sense of
causality and instantaneous response.
● A continuous feedback loop. The game provides a continuous, unbroken flow of
input and instant response, enabling ongoing correction cycles to occur.
But these metrics are difficult to apply to an entire game’s interactivity all at once.
To answer the question of real-time control more easily, it’s useful to break down a
game’s interactions into individual mechanics. Then we can check each mechanic
against the various thresholds from our model.
Mechanics: Game Feel Atoms
For our purposes, a “game mechanic” is one complete loop of interaction, such as
a single mouse twitch, button press or foot stomp that can be traced through the
game’s programmed response and back to the player over and over again. Another
way to think about mechanics is as verbs. What are the player’s abilities in the
game? What can the player do? By this definition, examples of individual mechanics
include:
● Pressing the A-button to jump in Super Mario Brothers
● Steering Mario left and right using the D-Pad in Super Mario Brothers
● Strumming a note in Guitar Hero
● Using the mouse to steer left and right in flow
● Boosting forward by clicking the mouse in flow
● Drag-selecting a group of units in Starcraft
● Clicking to send a group of selected units to a new location
● Pressing a button at the right moment to advance to the next sequence in
Dragon’s Lair
● Clicking on a button to select the next technology to research in Civilization 4
In a typical game, many different mechanics are active at the same time and often
overlap and combine. Running and jumping in Super Mario Brothers are separate

---

## Sección 26: Chapter 2 to answer these questions.

-- 89 of 377 --
mechanics by our definition. But they combine to become a whole greater than the
sum of their parts.
Mechanics can also change over the course of a game. For example, gaining a
skill point in Tony Hawk’s Underground makes your skater move forward faster.
Mechanics can also come and go over the course of a game. In Half-Life, the player
finds new weapons gradually, but then loses them at the halfway point of the game.
Super Metroid gives the player a bunch of mechanics up front, then takes them
away a short time later, forcing the player to start from scratch.
The question is whether or not each individual mechanic meets the criteria of
real-time control and whether the system as a whole sustains real-time control.
Knowing whether a game has real-time control is most of the challenge. From
there, it’s just a matter of asking whether the game has literal simulated space, if
the player perceives that space actively, and if the polish effects are used to emphasize physical interactions in that space.
Applying the Criteria
To put our definition to the final test, we’ll apply it to four games: Street Fighter II,
Prince of Persia, Guitar Hero and Kirby: Canvas Curse. Each game is on the fringes
of our definition in its own way.
Street Fighter II
There are three primary types of mechanics in Street Fighter II: walking, attacking
and jumping. The walking mechanic responds within 100 ms when the joystick is
moved left or right, and it allows a sustained correction cycle. Input is constantly
accepted, the game responds within 100 ms, and there is no lockout period. As soon
as I perceive the result of my last action, I can adjust it with a new input. The
movement mechanic has real-time control.
The “attack” mechanics—when the player presses one of the six attack buttons—
have interrupted continuity. Pressing a button plays back an animation, which
changes the shape of the avatar. The response time when the button is pressed is
instantaneous, but then the player is locked out of further input until the animation
is complete. For the “light” attacks, the duration is very short and will not interrupt
the correction cycle of the walking mechanic. The heavy attacks can take almost
one second to complete, however, disrupting the continuity of control. Either way,
pressing a button to trigger an animation is not a continuous correction cycle. The
attack mechanics do not have real-time control.
The jump mechanic adds upward force to the player when the joystick is pressed
up. Once the jump has started, the player cannot alter the trajectory of the jump.
This temporarily takes control away from the player, breaking the correction cycle of
the movement mechanic. After leaving the ground, however, the player can still trigger attacks. This mitigates the fact that the player’s correction cycle is temporarily
APPLYING THE CRITERIA

-- 90 of 377 --

CHAPTER FOUR • MECHANICS OF GAME FEEL
broken, as does the fact that the player gets to choose when to start the jump. The
player feels they have real-time control over everything. The whole system, combining the movement, jumping and attack mechanics, has real-time control.
Street Fighter II also has simulated space. The characters collide with the ground,
the edge of the screen and with each other. These interactions are perceived actively
by the player, through the correction cycle of the movement mechanic.
Finally, the polish effects in Street Fighter II—the sounds, particle effects and
animations—emphasize the interactions between objects in the game world.
Prince of Persia
The original Prince of Persia (see Figure 4.3) is an interesting edge case because of
the disconnect between animation and control. The character moves fluidly, but the
feel of control is stilted and uneven. A casual observer might assume that because
the movement of the character is smooth and even, that the control must also be.
This is not the case.
The individual mechanics in Prince of Persia are:
● Run
● Jump vertically
● Jump horizontally
F I G U R E 4.2 Street Fighter II has game feel.

-- 91 of 377 --
● Change direction
● Lower (down a ledge)
● Draw sword
● Sheathe sword
● Shuffle
● Parry
● Thrust
● Crouch
● Crouch-hop
● Walk
● Grab ledge
● Crouch-slide
Prince of Persia consists entirely of mechanics like the attack mechanic in Street
Fighter II. The player presses a single button, and a single animation is played
back. The response time is less than 100 ms, but further input is locked out until the
animation is over, which often breaks continuity. Examining individual movement
mechanics by this criteria, we can see which ones have real-time control and which
don’t. For example, going from Stand to Run (Figure 4.4) fails one of our threshold
tests:
It takes almost 900 ms for the prince to go from standing still to a full speed run.
In between, new input from the player is meaningless. There is a branch point of
sorts; having reached the end of the “standing to run” animation, if the directional
F I G U R E 4.3 In Prince of Persia, animation reigns supreme.
APPLYING THE CRITERIA

-- 92 of 377 --

CHAPTER FOUR • MECHANICS OF GAME FEEL
button is still held down, the prince goes into his full speed run cycle. If the button
is not held down, the “run to standing” animation is played back, taking another
few hundred milliseconds. This is not an unbroken correction cycle, so this particular mechanic by itself does not have real-time control.
Only the crouching mechanic, comprised of the fewest number frames, has realtime control. Because the user is locked out for a very short amount of time, the
action not only feels instantaneous in response, but it feels as though it’s ready to
accept new input as soon as the player is ready to offer it. It’s no wonder, then, that
this is the mechanic of choice to use when precision timing is necessary. When
navigating through a room full of gnashing blades, you want to use the crouch-hop
mechanic (Figure 4.5). It feels like the most precise and responsive expression of
your input and enables the smallest increments of movement spatially.
Out of all the mechanics of Prince of Persia, only one passes our threshold tests
for real-time control. But the animation is fluid and appealing and covers up the
lack of control to some degree. The player rarely has a sustained correction cycle
and so rarely experiences true game feel. The fact that there are interactive branch
points in the animations helps to some degree. In this case, unpredictability actually works in the game’s favor. I don’t know exactly when the jump is going to take
place, so I instinctively just hold the up button when I’m close to where I want to
jump. This makes me feel as though the system is listening to my input more often
than it is.
F I G U R E 4.4 Sixteen frames at 30 fps  0.53 seconds to complete the animation.
F I G U R E 4.5 The hopping animation takes only 150ms to complete, so it feels almost real time.

---

## Sección 27: Chapter 2 to answer these questions.

-- 93 of 377 --
There is simulated space in Prince of Persia; animations can be interrupted when
the character walks far enough off a ledge, and he can bump into walls. The player
experiences these directly and actively, by pushing the character into them. The
only polish effects that emphasize these interactions are the animations, which have
a good sense of weight and presence against the floor.
So Prince of Persia has game feel, but just barely. The player is able to cobble
together a correction cycle by imagining control when there is none and by using
the mechanics with the lowest number of frames whenever possible.
Guitar Hero
Ahh, Guitar Hero. What a lovely game. It’s rare to see technology infused with
such a sneer, such sense of unabashed glee. In the Game Developer post mortem of
the game, producers Greg LoPiccolo and Daniel Sussman name the one litmus test
for every feature and piece of content in the game: “Does it rock?” The results of
this simple vision speak for themselves. But does Guitar Hero have game feel as
we’ve defined it? Again, let’s examine the individual mechanics and the system as a
whole.
F I G U R E 4.6 Prince of Persia has game feel, but it’s pretty stilted.
APPLYING THE CRITERIA

-- 94 of 377 --

CHAPTER FOUR • MECHANICS OF GAME FEEL
In Guitar Hero, there are five things you can do (mechanics):
● Strum
● Whammy
● Hammer On
● Hammer Off
● Tilt
The strum is the game’s core mechanic (Figure 4.7). Colored notes scroll down
from the top of the screen. You hold down one or more corresponding buttons on
the neck of the plastic guitar and pull the strum trigger up or down. If you strum
the right combination of notes at the right time (when the note’s position is close
enough to crossing the line) the game records the note as hit. More notes hit means
a better score, and the game tracks streaks of hit notes. Miss too many notes and
you fail the song.
Impression of motion, check. The notes seem to move down the screen, from top
to bottom, and individual frames are fused into an impression of moving objects.
Instantaneous response, check. The response time to input is within one perceptual
processor cycle (less than 100 ms) so the response from the system seems instantaneous with a strum. But there is no continuity. Instead of locking the player out as
in Prince of Persia, it cuts the player off. The whole loop of input and response happens in less than 100 ms, but once it’s done it’s done. There is no continuous flow
of input and response, no correction cycle.
The whammy bar mechanic, however, allows a constant stream of both input
and response. The response feels instantaneous and continuity is maintained. The
whammy mechanic has the potential to be an ongoing correction cycle. But there
F I G U R E 4.7 The “strum” mechanic in Guitar Hero.

-- 95 of 377 --
is no simulated space. The waveform ripples and notes bend as the whammy bar
is manipulated, but the size of the ripples has no meaning. Bending notes with
the whammy mechanic does not enable the player to actively perceive a simulated
space because there is no simulated space around it to interact with (Figure 4.8).
F I G U R E 4.8 Bending the waveforms with the whammy mechanic is real-time control, but it
lacks spatial simulation.
APPLYING THE CRITERIA
F I G U R E 4.9 Guitar Hero has polish and (occasional) real-time control, but no simulated space.

-- 96 of 377 --

CHAPTER FOUR • MECHANICS OF GAME FEEL
Guitar Hero is a relatively simple game. Strumming to hit notes in increasingly difficult patterns that are synched to songs is the vast majority of the game. Even considered as a whole system, however, it does not have the property we’ve defined as
game feel. The notes may fly fast and furious, and you can wail on the whammy
and tilt to use your star power, but there is no unbroken flow of action, perception
and contemplation. There is the impression of motion, instantaneous response, but
there no sustained correction cycle and no spatial simulation (Figure 4.9).
Kirby: Canvas Curse
Kirby: Canvas Curse (Figure 4.10) takes a very simple idea and executes on it brilliantly, enabling the player to indirectly control Kirby’s movement by drawing. In
Canvas Curse, you play as Kirby and as a disembodied paintbrush at the same time.
There are three mechanics:
● Drawing (paintbrush)
● Tapping (on the avatar)
● Holding (enemies)
Using the paintbrush mechanic, you draw lines on the screen, represented by
flowing rainbows. If Kirby comes into contact with these lines he will follow their
path in the direction they were drawn (see Figure 4.11).
From the moment the player starts drawing the line, they’re running a correction
cycle to get the line drawn in the shape and direction they want. The response is
instantaneous, but this is not real-time control per our definition. In this case, the
DS stylus and screen are functioning the same way a piece of paper and pencil do.
F I G U R E 4.10 The layout of Canvas Curse.

-- 97 of 377 --
The player is correcting the movement of his or her own hand in space rather than a
virtual object in virtual space.
The other main mechanic is tapping. The player can tap Kirby directly with
the stylus. This results in a state change and a speed boost. The spinning animation is accompanied by a burst of speed in the direction Kirby is currently facing.
The response is instantaneous, but, as with Guitar Hero, the input is not sustained.
F I G U R E 4.11 As you draw the rainbow trail, Kirby will follow its path if he makes contact
with any part of the trail.
F I G U R E 4.12 Canvas Curse has polish and simulated space, but no sustained real-time control.
APPLYING THE CRITERIA

-- 98 of 377 --

CHAPTER FOUR • MECHANICS OF GAME FEEL
One tap equals one input. To express a new input, the player has to lift the stylus
off the screen and tap again. This is not an ongoing correction cycle.
The ambiguity of Canvas Curse is in its simulation. Kirby moves around a simulated space, colliding with walls, enemies and other objects. Those interactions
are emphasized with polish effects like sounds and particles. This is where things
become fuzzy; Kirby interacts with simulated space in just the way it should to fall
inside our definition of game feel. The world of Canvas is its own unique physical
world. But the player does not experience the simulated space directly, perceiving
it actively via Kirby’s “body” in virtual space. Instead, the player guides Kirby indirectly, observing the results of his interactions and building a model of the game
world from those interactions. Kirby: Canvas Curse falls outside the definition of
game feel (Figure 4.12).
Summary
Breaking down game feel into its component mechanics on a game-by-game basis
enables us to better understand which games have game feel and which don’t, and
why. Our definition is now complete: even games that are on the edge can be classified according to real-time control, simulated space and polish. Games that have
these three properties have game feel. Games that don’t fall outside the scope of
this book.

---

## Sección 28: Chapter 2 to answer these questions.

-- 99 of 377 --
CHAPTER
Beyond Intuition:
Metrics for Game
Feel
In this chapter and the next six, we’ll explore the problem of measuring game feel.
The goal is to compare the feel of one game to another meaningfully. This will give
us a generic, working vocabulary for game feel and will offer insight into why some
games feel good and others do not, even if the games appear similar on the surface.
In Chapter 1, we defined the canvas of game feel and looked at some of the finished
“paintings” of experience possible on that canvas. Now our goal is to identify the
colors of paint.
Why Measure Game Feel?
As with definition, there are no standard measures for game feel. We as players and
designers do not attempt to measure game feel or to compare the feel of one game
to another at a level deeper than is necessary for casual conversation and game
production. From players, we have vague descriptions like floaty, loose, tight and
responsive. Some enlightened game designers measure response lag and move timings, but to most game feel tuning is intuition. When a game designer sits down to
create a mechanic from scratch, this is a problem. As God of War designer Derek
Daniels says, “One of the worst things about making video games is that you have
to re-invent the wheel with almost every new project you work on. So even though
Mario jumps like a champ, when you go to make your game, it’s very hard to
reverse engineer Mario’s jump and port it into your game.”1
This is frustrating because each new game we design feels just as complex as
the last. If we don’t directly copy what we did before, we’re starting from scratch.
FIVE
http://lowfierce.blogspot.com/2006/05/why-some-games-feel-better-than-others.html

-- 100 of 377 --

CHAPTER FIVE • BEYOND INTUITION: METRICS FOR GAME FEEL
This leads to timid, incremental improvements over previous designs in an effort
to keep things safe and comfy. We copy Mario’s mechanics, or Banjo Kazooie’s, or
Grand Theft Auto’s, trying to recreate, in the context of our own systems, what was
good in those. This is the easy way to design.
The more difficult way is to ask the following question: Where did the feel of
Mario come from? Or Spacewar! for that matter? Those designers didn’t have something to clone from, so how did they arrive at good-feeling mechanics? We continue
to use a handful of games as our exemplars of mechanic design and game feel. Yet
we fail to identify what is special about these particular combinations of real-time
control, simulated space and polish. We need to understand the unique relationships between the parts and how these relationships give rise to the experiences we
cherish.
There are common elements in the physical design of a controller, the relationship between physical and virtual movement, and the design of the virtual worlds
we interact with through game feel. If we can identify and measure these pieces of
game feel, we can avoid constant reinvention. This requires us to wrap our brains
around the game feel system as a whole—including the player, the input device, the
programmed reaction from the game system and all the pieces (i.e., the Game Feel
Model of Interactivity described in Chapter 3)—and identify which elements enable
us to make a meaningful comparison between the feel of two games. Not only the
pieces, but the relationships between the pieces. If we can do that, we can understand how to construct similar systems by insight instead of emulation.
Soft Metrics vs. Hard Metrics
Before diving down into specific elements from the Game Feel Model of Interactivity
that we’re going to apply as metrics, a few words on measuring game experiences.
As every designer knows, the only valid way to take the temperature of a design in
progress is to watch players play it. There’s no way around it; the output of a game
system is player experience. To master it, you’ve got to measure it. To measure it,
you need live players.
Enter the dreaded play test. Nothing is more humbling. You have a vision in your
head of the experience the player should have playing the game. Perhaps this vision
lines up with the experience you as the game designer currently have when playing
your game. Perhaps you feel exceptionally skillful and adept as you play and you
think that playing your own game is pretty fun. Now put the game in front of some
players and watch as your tower of hope gets hit by the oily wrecking ball of player
reality. The players do unexpected things, are hung up on stupid little details or
can’t figure out the controls. They whine, they grunt, they say “this is stupid!” and
they walk away in disgust. They ignore all instructions, mash their way around, and
display all the insight and cognitive capacity of an indignant end table. They always
tell you, “Oh, it’s fun, but …” and list a litany of bizarre sounding changes they’d
like to see. Brutal!

-- 101 of 377 --
And it gets worse: this is not the player’s natural environment. If you weren’t
standing there, if you hadn’t invited or cajoled, or if the playtester weren’t your
friend or sibling or spouse, would they still be playing the game? The answer is
usually no. The closer you can get to seeing players in their natural environment,
displaying their actual, natural behavior, the further from “done” your design will
seem to be. But this is what you want. You want a realistic read on how players will
play your game in the wild, even though the closer you get to it, the more brutal
the feedback becomes. It’s horrid. Your game isn’t fun. Players hate it. Maybe you
should scrap the whole thing and start over.
For many designers, the solution is simply to drink from the fire hose. Put your
head up in the stream and just take the full blast of feedback in the face. Actually,
this works reasonably well. Big, serious issues tend to be very obvious, and the
designer can usually figure out how to modify the system to correct the problems.
Rinse, repeat, iterate. The more times you can iterate on this cycle of playtesting and
modification, the better you game will be. However, there are some things that can
be done to make this cycle take less time and be more effective.
Figure 5.1 is an example presented by Mick West in his article “Pushing Buttons”
for Game Developer. “All I did was add a simple ‘watcher’ class which would record
the value of a variable (such as a button up/down state or a physics state or flag)
every frame and then display this as a scrolling state graph across the top of the
screen, with a separate line for each variable that was being watched. To this state
graph I added an event recorder which recorded events (jump, land, fall, super
jump, late jump and crouch) and displayed them on the graph as a vertical line,
SOFT METRICS VS. HARD METRICS
F I G U R E 5.1 Measuring inputs over time: an excellent “hard” metric.

---

## Sección 29: Chapter 2 to answer these questions.

-- 102 of 377 --

CHAPTER FIVE • BEYOND INTUITION: METRICS FOR GAME FEEL
labeled with the event. Finally I made the graph able to be scrolled and zoomed in
and out by the joypad when the game is paused. So, whenever some control problem occurs, it’s very easy to pause the game and then scroll over and zoom into the
area on the graph that caused the problems.”
This is a sophisticated, data-driven measurement of player experience. West’s
millisecond-precise graphing of player input and system output provides a clear,
quantitative explanation for a soft, wishy-washy, subjective player experience. This
is great stuff. It enabled him to tune his system more quickly and to provide a clear,
unambiguous insight into a very nebulous problem of the controls not feeling right
for the player.
West’s graphing is an example of a “hard metric.” Hard metrics are quantifiable, finite measurements. The player pressed the button 57 ms after the computer
thought they were off the cliff. The final score was blue team 10, red team 3. The
player played the game for 27:03. Hard metrics provide specific, measurable data
that can be compared across playtests. Assigning meaning to the data is part of the
art of game design—should every game of Warcraft 3 take 20 minutes to complete?
Or is it okay to have a game that last seven hours? Answering that question depends
on the experience the designer intends to create.
Contrast hard metrics with “soft metrics”—things like fun, laughter and requests
for more play. Are your players really having fun? What does fun mean in the context of your game? It could be deep strategic thought, with players sitting in silence,
pondering the ramifications of their next move. Or it could be raucous laughter and
intense interpersonal connections. Or it could just mean a feeling of relief and relaxation, a nice escape after a hard day at work. These things are not easy to measure. Though it is possible to quantify certain aspects of behaviors—such as Nicole
Lazzaro’s excellent Four Fun Keys, which are based on videotaped recording of people’s faces and resulting emotional categorization—this is not the norm for game
designers. Usually, soft metrics combine to form a sense, nebulous but always evolving, about what the experience of playing the game is for all players everywhere.
It’s important to note that soft metrics are just as useful to game design as
hard metrics. People tend to assume that because hard metrics are fact-based, scientific and objective, they are somehow better. But it’s just as important to keep
track of whether and how people are enjoying themselves while playing the game.
Examining soft metrics is part of the game designer’s intuition, which gets honed as
he or she completes more and more designs. To have an intuitive grasp of what system dynamics will create enjoyable, meaningful experience is to be keenly attuned
to soft metrics. In our measurement of the game feel of various games, we will
employ both soft and hard metrics.
What’s Important to Measure
In the Game Feel Model of Interactivity, it is the pieces on the computer’s side of
the system that can be changed by the game designer. Out of these, certain aspects

-- 103 of 377 --
are obvious candidates for metrics. The six most useful aspects in this respect—the
most important to measure, in terms of framing principles for designing game feel
and for comparing games—are as follows.
● Input—The physical construction of the device through which player intent is
expressed to the system and how this changes game feel.
● Response—How the system processes, modulates and responds to player input in
real time.
● Context—The effect of simulated space on game feel. How collision code and
level design give meaning to real-time control.
● Polish—Effects that artificially enhance impression of a unique physical reality in
the game.
● Metaphor—How the game’s representation and treatment change player expectations about the behavior, movement and interactions of game objects.
● Rules—How arbitrary relationships between abstracted variables in the game
change player perception of game objects, define challenges and modify sensations of control.
These are summarized in Figure 5.2. Some enable data-driven “hard” metrics,
such as input, and others are on the “softer” side, such as metaphor. The rest of
this chapter introduces these six elements as metrics in a general way. Chapters 6
through 11 describe the metrics associated with each element in detail.
Armed with this information, we can quantify game feel in a way that lets us
design game feel from first principles instead of from a priori knowledge (i.e., by
emulation). We will also have a detailed set of criteria for comparing games.
Input
The input device is the instrument of expression for the player into the game world.
Therefore, the physical construction of the input device is important to the feel of
control. The layout of inputs on the device, the tactile feel of the materials it’s made
from, its weight, and the strength of springs in joysticks and other actuators—all
of these things affect the way it feels to hold, touch and use the input device. This
changes game feel. It’s like a musical instrument: while it’s possible to play Fur
Elise on a Playskool piano, there’s a much greater potential inherent in a Steinway
Grand Piano. When I create a prototype of a new control mechanic, it will almost
always feel better to control using my wired Xbox 360 controller than using just
buttons on the keyboard. At the highest level, this is because the Xbox controller
is a well-designed consumer product made of sturdy materials and smooth, porous
plastic.
WHAT’S IMPORTANT TO MEASURE

-- 104 of 377 --

CHAPTER FIVE • BEYOND INTUITION: METRICS FOR GAME FEEL
F I G U R E 5.2 The six most important elements of game feel to measure are input, response,
context, rules, polish and metaphor.
Playable Example
If you want to experience the difference and happen to have an Xbox 360 controller hooked up to your PC, try playing example CH05-1. You can control the
game with either the Xbox controller or the keyboard (WASD.) Controlling the
object with an Xbox controller feels better, all other factors being equal.
From the designer’s side of things choices about which parts of the input device
to use and how to use them affect the feel of control over virtual objects. The
designer rarely gets to choose which input device the player will use—this is almost
the same as making the choice about platform—but the designer can always choose
which inputs on the device will be valid and useful for controlling things in their
specific game. If the input device is a Playstation 3 controller, does the player use
the thumbsticks, the buttons or both? These decisions define what sensations of
control are possible in the game.

---

## Sección 30: Chapter 2 to answer these questions.

-- 105 of 377 --
By choosing which inputs will be used, the designer also makes a choice about
the sensitivity of their input space. Input devices have an inherent sensitivity. The
feel of using an NES controller to control something in a game is different from
a typical computer mouse, for example. The NES controller has more total inputs
than a mouse—eight separate buttons—but is less sensitive overall than a mouse.
Of these eight buttons, six are commonly used for real-time control, and each of
these buttons is a very simple two-state affair. It’s either on or off at any given time,
nowhere in between.
The mouse has two standard buttons. But it also has a rolling ball or laser mechanism that recognizes movement in two directions. This two-axis movement is
much more sensitive than a single button. The signals it sends to the computer are
much more complex than the simple ON or OFF of a button.
From the designer’s perspective, an input device translates the complex goals
and intentions of the player into a simple language a computer can understand and
interpret. This language is a stream of values that change over time. The movement of a thumbstick to the left, for example, can be interpreted by the computer
as a change in a single “float” value—a number between 1.00 and 1.00. As the
player moves the thumbstick, the numbers change. A button is much simpler in
terms of physical activation and in terms of the signals it sends. Having selected a
specific input device, the game designer then chooses which inputs on the device
will be used, and how they will be used. In other words, of the possible input space
inherent in the physical construction of the input device itself, the designer decides
which parts will be valid and applicable to control in his or her specific game.
To measure the effect these choices have on game feel in completed games, we
want to look at the properties of each individual input and at the input space as a
whole. As a whole, we want to know which inputs on an input device are used for
control, and to keep track of any physical constraints and limitations of the input
device. For example, on an NES controller most of the inputs can be combined with
one another, except for opposing directions on the directional pad. It’s impossible
to press both left and right on the directional pad at the same time. Ditto up and
down. But it is possible to press the A-button and left at the same time. This means
that a game controlled by a directional pad will feel very different than the same
game controlled by four keyboard keys simply because the inputs combine in different ways (see Figure 5.3). On a keyboard, it is possible to press left and right at the
same time.
For each individual input, it’s useful to examine how many possible states the
input has, the degrees of freedom and types of movement it permits, and how, if
at all, it’s bounded. For example, a simple button on my Xbox 360 controller has
two states, on and off. It moves in one axis, up and down, and it is bounded in two
places, at its maximum and minimum. A trigger button on the same controller still
moves along only one axis but has hundreds of discrete states between its boundaries of fully released and fully pressed. The thumbsticks on the same controller have
complete freedom of movement along two axes, X and Y, and are bounded by the
circular plastic casing of the controller, giving them almost unlimited possible states.
WHAT’S IMPORTANT TO MEASURE

-- 106 of 377 --

CHAPTER FIVE • BEYOND INTUITION: METRICS FOR GAME FEEL
F I G U R E 5.3 On a keyboard, it is possible—and likely—for a player to press left and right at
the same time.
F I G U R E 5.4 Differences in sensitivity between input devices.

-- 107 of 377 --
We can say then that a thumbstick is overall a more sensitive and expressive input
than a trigger button, which is in turn more sensitive than a standard button.
Another metric, though a soft one, is how the input provides proprioceptive feedback (spring strength, layout of buttons relative to one another). Joysticks, thumbsticks, triggers and buttons can feel very different depending on the strength and
quality of their spring mechanisms. This physical feel of interaction is very difficult
to quantify, but has some effect on the feel of control over virtual objects.
Response
Knowing all about the input device is half of real-time control. All inputs eventually become signals, which are mapped to the modulation of some parameter in the
game. This modulation can be thought of as the game’s response to input.
The game receives signals from the input device. Signals modify some parameter
in the game in some way, which is defined by the game designer. This is mapping:
hooking specific input signals up to parameters in the game and defining how the
parameters will be modulated over time. As Mick West says, “On the face of it, this
appears a simple problem: you just map buttons to events, [but] getting player control to work is inevitably a fiddly and complex task.”2 This is where most of the feel
of control in a game is created.
An input signal can modulate any parameter in a game and can do it over time
in many different ways. A button press can move an object a distance in a direction.
Press the button once and a cube moves five units to the right, for example. Or a
game can continuously move that object a small amount each time the feedback
loop is complete, as long as the button is held. Alternately, holding the button could
add a force to a simulation, which indirectly causes the cube to speed up and start
moving. All of these are different mappings of one button to the movement of one
object, and with each, the feel is different. But a press of a single button can also be
mapped to changes in global parameters. Pressing a button might reverse gravity or
holding it might change the friction value for a car’s tires, enabling a different kind
of control.
To measure the response of a particular game, we want to look at how each
signal coming in from the input device is mapped to a change in the game. What
parameter does it modulate, and how does it change that parameter over time? Or,
more generally, what parameters are changed by what inputs, and what are the
relationships between the parameters? For example, in Id Software’s Quake, rotation
of the avatar in 3D space is very closely translated from the mouse on the desk surface. Changes in the two signals coming in—X and Y for the left/right and up/down
movement of the mouse—rotate the avatar left, right, up and down (Figure 5.5).
There is very little processing of input. The movement of the mouse adds a value to
http://cowboyprogramming.com/2007/01/02/pushhing-buttons/
WHAT’S IMPORTANT TO MEASURE

---

## Sección 31: Chapter 2 to answer these questions.

-- 108 of 377 --

CHAPTER FIVE • BEYOND INTUITION: METRICS FOR GAME FEEL
the current rotation value of the avatar. Move the mouse an inch to the left and you
turn 90 degrees to the left, a fixed steering ratio.
But in Quake, the steering ratio between horizontal mouse movement and horizontal in-game rotation is different from the one between vertical mouse movement
and horizontal in-game rotation. For your up/down mouse movement, you get
much less vertical rotation in the game. The relationship between these two values
is just as important as the values themselves; in the context of Quake, the players
will want to adjust their horizontal aim more quickly and over a greater distance
than their vertical one.
Now compare the mapping of Quake with the classic Arkanoid, which maps
rotation of a knob to the left and right movement of the in-game “paddle” spaceship (Figure 5.6). This is again mapped directly, though instead of mapping a linear
movement to a rotation as Quake does, Arkanoid does the opposite, mapping the
F I G U R E 5.5 Moving the mouse in Quake rotates the avatar—input becomes response.
F I G U R E 5.6 In Arkanoid, rotating the input knob maps to the left-right movement of the
spaceship.

-- 109 of 377 --
rotation of the knob to a linear movement of the ship. One degree of rotation of
the wheel input is translated into a certain distance of movement for the Arkanoid
paddle.
Contrast this with the “warthog” driving mechanic in Bungie’s Halo, a more indirect mapping of input to motion. Moving left on the thumbstick changes the position of the “reticule.” This maps thumbstick displacement to a rate of movement
instead of to a change in position. Moving the thumbstick to the left a small amount
will move the reticule to the left at a slow rate. Pulling the thumbstick as far to the
left as it will go moves the reticule quickly, at a constant, maximum rate.
The reticule’s position represents a heading in the 3D game world, one which
the warthog vehicle will then attempt to seek on—imperfectly. Depending on the
distance between the reticule and the actual heading of the avatar, it will rotate
more or less per frame to try to return to being in line with the reticule, but it may
overshoot or undershoot. This obfuscation between intent and reaction is pleasurable rather than annoying because it defines both an interesting challenge and a
pleasurable sensation of control.
An input signal can also be mapped to a modulation across time, such as the
jumping mechanic in Super Mario Brothers. When jumping in Mario, holding down
the button longer yields a higher jump. There is a maximum height and an expressive range in between. A tiny tap on the button is a tiny little jump. To get a full
height jump, you must hold down the button longer.
After looking at what parameter each input modulates in the game and how it
changes it over time, the final thing to examine is the relationships between the
F I G U R E 5.7 In Halo, the degree of change of the thumbstick moves the reticule at varying
degrees of speed.
WHAT’S IMPORTANT TO MEASURE

-- 110 of 377 --

CHAPTER FIVE • BEYOND INTUITION: METRICS FOR GAME FEEL
various parameters. No mechanic is an island. Just as important as how each individual mechanic is defined—how each specific input is mapped to a response—is
the relationship between them. For example, the feel of Super Mario Brothers relies
on the relationship between how fast Mario can move on the ground and how fast
he can move in the air. In the air, he moves left and right, but more slowly than on
the ground. You still have some control over Mario’s trajectory in the air, but the
feel is one of precise adjustment, giving you a better shot at landing on that small
platform. The same kinds of relationships between parameters define the feel of
any system of real-time control, from the speed-to-turning-radius relationship in a
driving game to the size/speed tradeoffs present in most fighting games. As much
as the basic mapping values themselves, it is the relationships between parameters
that makes a game feel the way it does.
Context
Context includes simulated space and level design. Envision yourself playing
Super Mario 64. Now imagine that instead of being in the middle of Bomb-Omb
Battlefield, Mario is standing in a field of blank whiteness, with no objects around
him. With nothing but a field of blankness, does it matter that Mario can do a long
jump, a triple jump or wall kick?
If Mario has nothing to interact with, his acrobatic abilities are meaningless.
Without a wall, there can be no wall kick. In this way, the placement of objects in
the world is just another set of variables against which to balance movement speed,
jump height and all the other parameters that define motion. In game feel terms,
constraints define sensation. If objects are packed in, spaced tightly relative to the
avatar’s motion, the game will feel clumsy and oppressive, causing anxiety and
F I G U R E 5.8 Mario is sad because he has no context for all his fancy moves.

-- 111 of 377 --
frustration. As objects get spaced further apart, the mapping of input to response
becomes increasingly unimportant. It doesn’t matter how fast a car moves relative
to its turning speed when it’s driving across a featureless landscape. Of course, the
spacing of objects is irrelevant until two objects can interact. It could look as though
you’re driving in a densely packed forest, but if the car goes through the trees, it
makes no difference how many trees there are or how they’re laid out. In this sense,
collision code is the other part of context.
Context, then, is the unique physical reality of the game world—the simulated space—including the way that objects interact and the layout of space. Like
the abilities and actions of the avatar, it is designed. The game designer creates a
game space that has its own unique physics, extents and constraints. The designer
simultaneously creates the content that fills that world and defines its spatial
relationships.
Almost every game has a contextual aspect of some kind, be it tracks in Gran
Turismo or tracks in Guitar Hero. Tracks, puzzles, stages, levels, worlds: most
games have some kind of designed context against the mechanics’ functions. In
most cases, this is called level design. The objective is to find the most interesting
pieces of the mechanic and emphasize them by trying to provide the most interesting interactions possible with the mechanics.
The importance of this context will vary depending on the type of game, but
almost every game includes some kind of level design. My favorite example is the difference between Slim Tetris and regular Tetris, as shown in Figure 5.9. Level design
isn’t as important in Tetris as it is in, say, a Tony Hawk game, but Alexei Pajitnov still
F I G U R E 5.9 Normal versus Skinny Tetris: if the level design was different, it wouldn’t be the
same game.
WHAT’S IMPORTANT TO MEASURE

---

## Sección 32: Chapter 2 to answer these questions.

-- 112 of 377 --

CHAPTER FIVE • BEYOND INTUITION: METRICS FOR GAME FEEL
had to decide that the Tetris field would be 10 blocks wide by 24 blocks tall. If it
were three blocks wide, Tetris would be a very different game. Change the context,
change the game.
The default playfield of Tetris provided the right balance between constraint and
openness. It was an artistic choice and reinforces the important aspect of context:
spatial constraints define challenge. The sharpness of turns and spacing of obstacles
in Mario Kart DS defines the challenge of a particular course. The more difficult
courses have sharper turns that happen more frequently and include more obstacles, jumps and other challenge-making context.
The effect of context on game feel can only be expressed as soft metrics. There is
a change in the sensation of control when the overall landscape of the game world
is huge and open versus when it’s constrained and claustrophobic, but the exact
change is not quantifiable. It’s a general impression of space. The feel of control
also changes when objects are spaced closer together or further apart, and when
objects are sharp, round, organic or blocky. If you bump into things all the time,
the game feels different. At the lowest level, collision code again redefines feel as it
makes interactions feel a certain way. The interaction of objects can be smooth, as
they slide off one another or feel tacky, if they stick when they come into contact.
If an object explodes instantly when it runs into something, this again changes the
feel of the game. Steering around objects becomes much more important, and the
thing you’re controlling seems fragile.
The best way to measure these effects is to examine the feel of control in different contexts within the same game. In Asteroids, there are times when there are as
few as one asteroid on the screen. When that happens, the feel of control is different from when the screen is covered in tiny, high-speed asteroid fragments. In these
extremes, we see the way that the feel of Asteroids is changed when the playfield—
the spatial topology—goes from empty to full.
Polish
Polish is any effect that enhances the interactions between objects in the game
world, giving clues about the physical properties of objects. If all polish effects were
removed, the functionality of the game would be the same, but the player’s perception of the physical properties of the objects in the game would change. Perception
is active, and polish effects further define the interactions that occur because of a
game’s collision code.
Measuring polish is another soft metric. How does the feel of De Blob (the student game mentioned in Chapter 1) change when the squash-shader is applied?
This is not quantifiable as a hard metric. What we can measure is the resulting
impression of physicality. Specifically, what the polish effects seem to tell us about
the properties of the objects we’re observing. The blob squashing and stretching
is what makes it seem a blob. As Joost says, without the squash-shader, the game
feels like playing with a ball made of stone.

-- 113 of 377 --
This principle applies to all polish effects. All effects, even if they’re applied
only with the nebulous goal of making interaction more appealing, send signals
about the physical properties of the objects involved in the interaction. When it’s
passive—when you see two objects in the distance collide—the impression is the
same as in film or animation. When it’s active, the impression is much more powerful, like experiencing something with your own senses.
A violent spray of particles, the screen shaking or a loud noise lend the impression of weight, heft and solidness to objects. Any interaction that can happen in real
life, that has happened in film, or that can be imagined can be conveyed through
polish effects. The thing that’s interesting to measure is how the polish effects
impact a player’s perception of the objects in the game world.
Playable Example
See example CH05-2 for some different polish effects applied to the same
system.
Consider the game Burnout: Revenge, a game with an almost preposterous
amount of polish. A car in Burnout is a solid object traveling at high speed. When
it crashes, the force of the impact is palpable, and the results are catastrophic. The
car is deformed in a hail of glass and sparks. Its mass and high velocity carry it
high into the air, spinning and burning, eventually to crash back down with all the
weight of its two-ton frame. The crunching, shattering and scraping noises are gutwrenching. A car in Burnout is a solid object traveling at high speed which has now
been completely obliterated (Figure 5.10).
WHAT’S IMPORTANT TO MEASURE
F I G U R E 5.10 The cars in Burnout can be damaged to an amazing degree. This is some
serious polish.

-- 114 of 377 --

CHAPTER FIVE • BEYOND INTUITION: METRICS FOR GAME FEEL
But how do you know this? What tells your senses that this is the case? How
can you know the physical nature of this digital object? What clues are you using to
derive this understanding? Well, let’s break it down a bit. First, we have the visuals:
glass is spraying from the windows, pieces of metal and car parts are flying off in
every direction, and dust and smoke are spewing from the engine. These are probably simple particle effects—two-dimensional images displayed at a particular point
in the 3D scene but which are programmed to always be facing toward the camera.
Often, these are a series of frames which play back linearly with some randomization, causing little pieces of glass to spin and puffs of smoke to appear to billow
and froth. The sparks flying from where the car is contacting other pieces of metal
or scraping against the divider or pavement are probably generated the same way,
transitioning in color from white to yellow to red over time as they spray out. The
tires leaving skid marks on the pavement are probably alpha textures, being laid
down with created-on-the-fly geometry that has an alpha-blended tire tread texture
mapped to it. Maybe it has two or three different layers and randomizes the texture
so it’s hard to see the textures repeat.
And what about the sounds, the screeching, the skidding and the shattering glass? The sounds of rending metal are all created, blended and triggered in
real time. They even have locations in 3D space, using positional audio to further
emphasize the link between sound and visuals. And then there’s the controller rumble, adding a little bit of tactile sensation to the mix. It may not be especially logical,
but it helps the impact seem more, ah, impactful.
So where did all these clues come from? Did a game designer simply press a button that says “insert car” and knock off down to the pub for a pint or two? Sadly
not. Each tiny piece of interaction, each particle effect and sound, each deformation and broken piece of car sent flying is a hand-crafted response meant to do
one thing: convey the physical nature of this interaction to you, the player. It must
be a combination of various sights and sounds, too, because perception is a multisensory phenomenon. When you perceive things, you see, hear, touch and feel all
at once. Perceiving something involves your entire body, even when it’s an extension of your sense into a virtual body. More than that, your perception of something
includes the meaning you assign to it based on past experiences, ideas, feelings and
generalizations. If it looks like a car, you expect it to behave the way things that fit
your idea of car would behave. This might be your experience of a real car crash,
years of watching car crashes in movies, or both. The point is that the clues must
be designed by a designer, created by an artist and programmed by a programmer.
Often, all three will touch a complex effect. Often this is written off as “just polish”
but as applied to game feel its impact in terms of conveying a convincing, selfconsistent game world can’t be ignored. Polish is important.
Metaphor
Metaphor is where a player’s past experiences, ideas, feelings and generalizations
come into play. Not only from playing games, but from their total life experience.

---

## Sección 33: Chapter 2 to answer these questions.

-- 115 of 377 --
What does the thing you’re controlling look like, and how do you expect it to
behave based on your experience with similar things? If it looks like you’re controlling a real car, the expectation is that it will handle like a car, sound like a car and
crash like a car. But the expectations come from the idea of what a car is, not from
objective reality. Players bring with them all their life experience—riding in cars,
driving cars and so on—but they also bring their experiences of cars from films
and animations. Convincingly behaving like a car, then, might mean exploding after
being shot with one bullet or it might mean squashing and stretching as in a cartoon, taking no visible damage. Oftentimes, people will play a game—horse-riding
gameplay is my favorite example—and they’ll say, “This doesn’t feel like a horse.”
And you’ll ask them, “Well, have you ever ridden a horse before?” And they’ll say,
“No, but this doesn’t feel like a horse.” What this illustrates is that players carry
with them preconceived notions about the way certain things move and, by extension, how it should feel to control them.
The expectations about how interactions should play out are also influenced by
treatment—how the art is executed. A cartooned, iconic car has much more leeway
when it comes to how it can behave and interact than a photorealistic one.
Try this as a thought experiment: instead of the car in Burnout, substitute a giant,
balding fat guy running as fast as he possibly can, spraying sweat like a sprinkler
in August. Without altering the structure of the game, the tuning of the game or the
function of the game, the feel of the game has changed. All you’ve done is swap out
a 3D model of a car for a 3D model of a giant fat guy running and you’ve got Run
Fatty Run instead of Gran Turismo. This will change the feel of the game because
you have preconceived notions about the way a car should handle.
F I G U R E 5.11 Run, Fatty, Ruuuuuuun! This avatar sets up different expectations than a car
does, which changes the feel of the game even if the underlying functionality is identical.
WHAT’S IMPORTANT TO MEASURE

-- 116 of 377 --

CHAPTER FIVE • BEYOND INTUITION: METRICS FOR GAME FEEL
You know how a car should feel and move and turn based on your experience
driving a car and looking at cars. When thinking about a game feel system, it’s
important to understand the palette of preconceptions you’re working with. The
best designers use metaphor and treatment to set up expectations in the player that
can then be exceeded by the game’s interactions.
Rules
Returning to Super Mario 64, have you ever asked yourself “Why am I collecting these
coins?” If it didn’t refill Mario’s health or if 100 coins didn’t get you a star, would
you bother? Would it be worth it? For that matter, why is collecting a star important?
What “value” do these things have? Outside the system of the game, none whatsoever. They are abstract variables whose arbitrary relationships give them value
within the cohesive whole of the game system. In other words, the meaning of a
coin, a star or any other such part of a game is given only by its relationship to other
parts of the game. It’s manufactured from nothing. From thin air. Poof. It’s a system
that gives itself meaning. Isn’t that weird? It works, though. You want those coins,
and you want that star, and you’re willing to undergo a lot of frustration, tedium
and learning to get them. The intrinsic pleasure of learning and doing may be the
fundamental appeal, but it’s the carrot of the stars that gets you moving.
Traditionally, this is the role rules play in both game design and in game feel.
They provide motivation and a structured way to learn, defining for the player the
motions that are worth learning. Indeed, it is the seemingly arbitrary relationships
between variables that give the motion meaning. A gradual ramp of increasingly difficult challenges matches the player’s growing skill, keeping them in the flow state
(Figure 5.12), introduced in Chapter 1.
In the context of game feel, rules as we’ve defined them provide motivation,
challenge and meaning for motion. Context provides the immediate, spatial meaning
while rules provide the long-term, sustainable meaning that games are built out of.
F I G U R E 5.12 Csikzentmihayli’s Flow.

-- 117 of 377 --
As in our earlier example, rules provide some, if not all, of the intent in a game system, as shown in Figure 5.13.
Race from point A to point B, scale this tall mountain, rescue five wayward puppies, escape the compound. These kinds of higher-order goals define game feel at
the level of sustainability. They operate at multiple levels, with multiple goals and
types of goals active at any given time. This promotes a high level of engagement
and gives the player many choices about which activity to pursue at a given time.
The low-level sensation of control and physicality, which we’ve defined as game
feel, is a great foundation for quality game experiences, but it’s the higher-order
rules that provide the girders and scaffolding to build it out.
To measure the effect of rules have on game feel, we can look at rules in three
different ways. Again, these are soft metrics, as they are not measuring specific quantities. What we’re interested in is how seemingly arbitrary relationships
between variables can change the meaning players assign to objects in the game
world, changing the feel of control and interaction as they perceive that world.
At the highest level, goals focus the player on a particular subset of motions.
These high-level goals provide a trickle down effect, giving objects meaning at
various levels. High-level rules can also be things like health and damage systems,
which again trickle down to give meaning to moment-to-moment interactions.
Separate from but hooked into the high-level rules and goals, mid-level rules can
give meaning to objects in the game world, changing the feel of moving through it.
F I G U R E 5.13 High-level goals trickle down.
WHAT’S IMPORTANT TO MEASURE

---

## Sección 34: Chapter 2 to answer these questions.

-- 118 of 377 --

CHAPTER FIVE • BEYOND INTUITION: METRICS FOR GAME FEEL
The flag in a capture the flag multi-player game is one example; for the player currently holding the flag, the game feels different.
At the lowest level, rules can further define the physical properties of objects.
How much damage it takes an avatar to destroy an enemy changes the player’s
perception of how “tough” that enemy is. An enemy that takes one hit to destroy
will feel fragile, while a boss monster that takes 20 hits feels much more solid.
Summary
The six pieces of the game feel system that are malleable for the game designer are:
● Input—The physical construction of the device through which player intent is
expressed to the system and how this changes game feel.
● Response—How the system processes, modulates and responds to player input in
real time.
● Context—The effect of simulated space on game feel. How collision code and
level design give meaning to real-time control.
● Polish—Effects that artificially enhance impression of a unique physical reality in
the game.
● Metaphor—How the game’s representation and treatment change player expectations about the behavior, movement and interactions of game objects.
● Rules—How arbitrary relationships between abstracted variables in the game
change player perception of game objects, define challenges and modify sensations of control.
For each of the six pieces of the game feel system, I’ve pointed out a few different
things that are instructive to measure when examining a particular mechanic or a
particular game feel system.
Each of these is discussed in more detail in Chapters 6 through 11. We’ll be looking at what can be measured and what’s useful to measure. We will be pursuing
both soft and hard metrics. For each measurement, we’ll go through why this is
useful to know about a particular game and how it helps us compare the feel of two
games in a meaningful way.
The point of measurement is to derive general principles about game feel which
can be applied to future designs and to let us meaningfully compare the feel of two
games. Instead of taking shots in the dark, emulating existing mechanics or trying
to shoehorn someone else’s tuning into your system, you want to be able to understand the tools at your disposal. If you want your game to feel like Sonic, Megaman
or Burnout: Revenge, you’ll be able to do it with a deeper understanding. You might
not have the exact recipe—it’s probably secret—but at least you won’t be staring at
a finished cake wondering what kind of sugar was used.

-- 119 of 377 --
CHAPTER
Input Metrics
The pianos (think input devices) of Ludwig Van Beethoven’s day were flimsy, cheap
things. In the course of his exuberant performances, he often broke 10 to 15 piano
strings, sometimes damaging the piano beyond repair. It was not just his playing
that destroyed pianos, but the music itself: it was not written for the pianos of his
day. Part of Beethoven’s genius was his ability to look beyond the physical limitations of the piano and define a space of a greater virtuosity and musical expressivity than the one actually presented by the piano itself. When he looked at a rickety
Viennese piano, he saw the robust grand pianos of today.
What Beethoven was able to see clearly—and exceed—were the physical and
mental limitations imposed upon him. He understood that a tool or instrument
inherently shapes and influences the activities that can be carried out employing it,
both physically and mentally. Consider a screwdriver. A screwdriver is used to fasten things together. But it is a very specific kind of fastening, and the nature of that
fastening is implied by the screwdriver itself. For one, it must employ a screw that
matches the head of the screwdriver being used. If it’s a Phillips head screwdriver,
it needs a Phillips head screw, and the grooves in the screw head must be machined
to a size comparable to the head of the screwdriver. A large Phillips head screwdriver cannot be used to screw in a tiny screw. A screwdriver, like all tools, contains
within it a specific subset of possible uses, a possibility space for its use. As a tool,
it defines what it can do, and, more importantly, what people will expect to do with
it. If you buy a sports car, you’re likely to get speeding tickets. If you have a hammer, everything looks like a nail.
This is an interesting notion and one which we rarely apply to the input devices
used to control video games. Just how much does the design of a particular
input device affect the feel of a virtual object controlled with it, and to what
degree is game feel defined by the input device itself? In other words, to what
degree is the possibility space of a virtual object defined by the physical object used
to control it?
To answer this question, we need to be able to measure the input space represented by a particular input device. Next, we need to be able to compare the input
space of one input device to another in a meaningful way. Finally, we need to examine
SIX

-- 120 of 377 --

CHAPTER SIX • INPUT METRICS
how the feel of a particular game is affected by the physical construction of the
input used to control it. To do this, we’ll examine input at three levels:
● The micro level, examining each individual input that makes up the input device
● The macro level, examining the possibility space of the input device as a whole,
its layout and construction and the types of actions it implies
● The tactile level, examining how the construction of the input device affects of
input virtual feel of game objects controlled with it.
Micro Level: Individual Inputs
The first easily measurable thing about an input device is the number of separate,
individual inputs it contains. My Xbox 360 controller, for example, has 15 separate
inputs on it (Figure 6.1). This includes a couple thumbsticks; a directional pad; two
“trigger” buttons; two “shoulder” buttons; four standard buttons; and some flimsy,
seldom-used buttons for select, start, wireless resync and other miscellany. Culling
out the inputs that are rarely used for game control, this leaves 4 usable inputs.
F I G U R E 6.1 The Xbox 360 controller has 15 input options.

---

## Sección 35: Chapter 2 to answer these questions.

-- 121 of 377 --
● X-, Y-, A- and B-buttons (standard buttons)
● Right and left “shoulder” buttons
● Right and left “trigger” buttons
● Directional pad
● Left thumbstick
● Right thumbstick
The common element every input possesses is the potential for motion. A button can be pressed down, a thumbstick pulled away from center and a mouse slid
across a flat surface. In each of these cases, the input sends a specific type of signal
to the computer. It is interpreted, responded to and fed back via the output devices
(screen, speakers and so on). This potential for real-time manipulation and signalsending is the fundamental property of an input. If you can’t move it in some way
and have it send a corresponding signal to a computer, it’s not an input. The key to
correlating seemingly unrelated types of input, then, is in this motion.
The first way to classify an input is as either discrete or continuous. That is, does
it send signals continuously (joystick, mouse, steering wheel) or does it send individual, momentary signals (keyboard key, mouse button, controller button)?
Inputs that enable continuous input can also be categorized1 like this:
● Type of Motion: linear vs. rotation. A mouse measures movement linearly (in two
dimensions) while a steering wheel measures rotation.
● Type of Sensitivity: position vs. force. A mouse measures changes in position, while a joystick measures how much force is being applied against spring
resistance.
● Dimensions of Motion: A mouse measures linear movement in two dimensions,
as does a thumbstick. A trigger button measures linear movement in one dimension. A Wiimote measures rotational movement in three dimensions.
● Direct vs. Indirect Input: A mouse is indirect—you move the mouse on the desk
and the cursor moves on the screen. The touch screen on the DS enables players
to directly tap on or touch the thing they want to interact with.
● Boundaries on Motion: The thumbstick on an Xbox 360 controller has a round
casing enclosing it, while a mouse has no physical boundaries on its motion. The
way that the motion of an input is bounded can change what it feels like to use
it. For example, the slotted casing around the Nintendo 64’s thumbstick feels different from the smooth round casing of the Playstation 2’s.
● Sensitivity: Roughly, how many different states can the input exist in. A standard button is very low sensitivity; it has only two states (ON or OFF). A mouse
MICRO LEVEL: INDIVIDUAL INPUTS
1 This is adapted from Robert J.K. Jacob’s excellent 1996 paper “The Future of Input Devices.” Available
online at: http://www.cs.tufts.edu/jacob/papers/sdcr.pdf

-- 122 of 377 --

CHAPTER SIX • INPUT METRICS
is highly sensitive by comparison; it has no physical boundaries making each
tiny motion another possible state. Though inputs can be mapped to in-game
motions that make them more or less sensitive, individual inputs have an inherent sensitivity.
● Signals Sent: What is the format of the signals each input sends to the game, and
how do they change over time?
One way to visualize these properties for a particular input device is to hold out
your hand as shown in Figure 6.2. This will also be useful for comparing movement
of an input device to movement of the object being controlled, which can indicate
whether a mapping is natural (in the Donald Norman sense).
Imagine that lines extend outward from your index finger, middle finger and
thumb, as in Figure 6.2. Now imagine each finger as an axis. If you move your hand
along any of these axes, you’re moving it linearly in a single dimension, X, Y or Z. If
you rotate your hand around a particular finger you’re rotating in X, Y or Z. Mouse
movement is unbounded, so if you slide your hand around the plane described by
the X- and Z-axes (index and middle fingers) this is a good way to visualize the
unbounded movement of the mouse (Figure 6.3).
A Playstation 2 thumbstick has the same kind of motion, but it has a
boundary, so we can think about being able to move in that plane, but only so far
in a particular direction (Figure 6.4).
F I G U R E 6.2 Use three fingers to visualize axes of movement for input devices.

-- 123 of 377 --

MICRO LEVEL: INDIVIDUAL INPUTS
Every button has two boundaries—fully pressed and fully released—between
which it moves. Whether it’s a trigger button with a handful of states between the
extremes of ON and OFF or a mouse button with only two states, there is a limit on
movement. The same goes for thumbsticks and arcade joysticks with their circular
plastic housings. (In contrast, Wiimotes and computer mice are two general-use
input devices that have no built-in boundaries on their motion.) Boundaries are
important to take note of because they reduce the overall sensitivity of the input to
a particular range. Sometimes—as in the case of a thumbstick—the boundary can
play an important role in defining the types of controlled in-game motions that are
best suited to the input (Figure 6.5).
F I G U R E 6.3 The “axis hand” moving like a mouse.
F I G U R E 6.4 The “axis hand” moving like a thumbstick.

-- 124 of 377 --

CHAPTER SIX • INPUT METRICS
Now think about how many possible states there are between the boundaries as
you move your hand around. For a thumbstick, it’s a lot. For a mouse, even more.
For a “trigger” button, it’s more than 1, but less than with a thumbstick or mouse.
This is a rough measure of the sensitivity of the input device.
The amount of sensitivity an input possesses is a soft metric. It is possible to
calculate the actual, physical number of states an input can reside in—two for a
standard button, something like 1,920,000 for a mouse on a 1,600  1,200 desktop—but that comparison doesn’t accurately portray the sensation of using these
inputs. It’s more like the difference between an Etch A Sketch™ and a paintbrush.
You can paint a picture with either, but the paintbrush offers a lot more versatility.
The idea is that different inputs have different amounts of sensitivity inherent in
their design. A standard button has the absolute minimum amount of sensitivity.
It’s either fully on or fully off. The dial on a classic Breakout paddle has a bit more;
its one-axis rotation has a great deal of sensitivity in a limited way. More sensitive
than either of those is an arcade joystick, which moves freely in X and Z, but which
F I G U R E 6.5 The boundary of the Xbox thumbstick is important for the feel of Geometry
Wars: Retro Evolved.

---

## Sección 36: Chapter 2 to answer these questions.

-- 125 of 377 --

MICRO LEVEL: INDIVIDUAL INPUTS
is bounded on all sides by a circular plastic housing. Figure 6.6 shows a (rough)
scale for input sensitivity.
More or less sensitivity in an input can be desirable depending on the intended
feel, and how that feel is intended to fit in with the design as a whole. It’s like the
color blue—whether or not it’s appropriate to use it depends on the context and the
desired result.
The final thing to measure about an input is the types of signals it sends. This
is the data you will be mapping to some response in your game, so it’s important to keep track of the raw form in which it arrives in the computer. This is a
hard metric—an input signal always ends up in a simple, numeric format a computer can easily understand—but it also supports our understanding of the softmetric sensitivity of the input device. A single button sends a binary signal, “up” or
“down.” Measure this over time and you get signals for “up,” “pressed,” “down,”
and “released.” A mouse sends a pair of values, one for each axis, that get updated
every frame. So a mouse might send 60 different pairs of values in a second, like
Table 6.1.
The signals sent by the mouse are more complex than those sent by the button.
Figure 6.7 shows the types of signals sent by various input devices.
TA B L E 6.1
Frame Signal Sent
1 (0.52, 0.11)
2 (0.51, 0.21)
3 (0.50, 0.34)
4 (0.31, 0.42)
5 (-0.1, 0.61)
F I G U R E 6.6 Sensitivity of input devices.

-- 126 of 377 --

CHAPTER SIX • INPUT METRICS
Input Measurement Examples
Measuring all these properties for each input is useful for understanding game feel
because it is an immutable part of the interface to a particular game. Every game
played on the Nintendo Entertainment System was designed to respond to that particular configuration of eight simple, two-state buttons. If we understand just how
simple those buttons are in functionality, it becomes all the more remarkable that
expressive mechanics like the swinging in Bionic Commando or the slippery movement of Super Mario Brothers were created. More importantly, if we look at the
number, type and sensitivity of inputs used to create a mechanic, we can begin to
get much closer to a meaningful comparison between the feel of games created with
different input devices. Comparing the feel of Halo to the feel of Contra becomes a
F I G U R E 6.7 Signals sent by various inputs.

-- 127 of 377 --
lot more viable if you understand that Xbox thumbsticks are inherently much more
sensitive than the directional pad and two buttons of the NES controller.
Standard Button
The standard two-state button (Figure 6.8) is the most basic type of input in general
use today. The button moves only in one axis, the Y-axis, and the motion is linear.
A spring beneath the button pushes it upward constantly. A plastic housing or catch
stops it at a certain point, which represents the fully released state. When the player
presses the button, he or she overcomes the force of the spring and the button slides
downward, in the Y-axis, into the controller. It’s stopped at a certain point and then
sits in the fully depressed or OFF state. There are no states in between these hard plastic boundaries for Y-axis movement. The button, then, has only two states: ON or OFF.
These characteristics also describes the essential functionality of a keyboard key,
a mouse button or any other simple two-state button such as the “shoulder” buttons
on a typical modern controller, though these are larger and can be depressed only
a tiny amount. These buttons are remarkable for their lack of sensitivity. There’s
very little that can be expressed by a standard button alone. The feedback from the
button is discrete rather than continuous, meaning that the signals it sends happen
at one particular moment in time. The signals are binary; the button is either on or
off at any given time. As brilliant one-button games like Ominous Development’s
Strange Attractors prove, however, it’s possible to map a single button to a complex,
nuanced, sensitive response from the game, but the button by itself is very limited
as an input. It is not really possible to create functional input device with fewer
states, with less expressive potential than a single two-state button.
The Y-axis movement of a standard button has hard boundaries at the fully
released state (where the spring’s pushing force is stopped by a plastic catch) and at
the fully pressed state (where the player’s pressing force is stopped by a plastic catch).
F I G U R E 6.8 A standard two-state button. It has two states, moves only in the Y-axis and is
by itself a very low-sensitivity input.
INPUT MEASUREMENT EXAMPLES

-- 128 of 377 --

CHAPTER SIX • INPUT METRICS
Trigger Button
Like the standard button, the “trigger” button (Figure 6.9) typically found on modern controllers moves in only one axis. In this case, I’d call it the X-axis, as it’s usually on the front of the controller and is usually operated by the index finger. Again,
though, this is all relative to the controller’s position in space.
Trigger buttons are unlike standard buttons because they recognize many states
between their boundaries. Between the fully pressed and fully released states, there
is a zone of sensitivity inside which it’s possible to have many different positions of
the trigger. Fiddling around with my Xbox 360 controller, I estimate that there are
four or five discrete states including fully on and fully off. Like a standard button,
the trigger is spring-loaded and defaults to a fully extended released state. The major
difference is in the button’s range of motion. By carefully depressing the spring a
certain amount, the player can keep the button a quarter, half or three-quarters of
the way depressed without pushing it fully to one extreme or the other. This X-axis
movement has hard boundaries at the fully released state (where the spring pushing
force is stopped by a plastic catch) and at the fully pressed state (where the player’s
pressing force is stopped by a plastic catch).
A trigger button typically returns a float value, a number between 0.00 and 1.00.
For example, across three frames it might return 0.63, 0.81 and 0.97 as it is pulled
from off to on.
Paddle
Though they’re not in common use anymore, it’s interesting to note that the paddle controllers sold with many of the first home consoles used a hard-boundary,
F I G U R E 6.9 The motion of a trigger button.

---

## Sección 37: Chapter 2 to answer these questions.

-- 129 of 377 --
one-axis rotation. There was one spinner input on the front of the controller (Figure
6.10). It was gripped between the thumb and forefinger and could be rotated left
or right a certain amount before it reached a defined hard boundary point and the
plastic would catch and stop it. Through a combination of factors, this input type
fell out of vogue, but it was quite a sensitive input, with hundreds of possible states
between fully left rotation and fully right.
A paddle controller returns a float value, in a range from 1.00 to 1.00. When
the paddle knob is centered, it’s at 0.00. As it is rotated left of center, it goes negative (something like 0.26) and as it is rotated right it goes positive (something
like 0.41).
Thumbstick
A typical thumbstick is movable in two axes simultaneously, left-right and up-down
(Figure 6.11). It’s spring loaded in both directions, though, so it will always seek
back to its straight-standing centered position. In most cases, the housing containing the thumbstick provides the hard boundary against which it stops when pushed
fully in any direction, and it is usually smooth and round. With a thumbstick, it’s
no longer meaningful to track the total number of possible states. When using a
thumbstick to control something in a game, there is no notion of discrete states, but
a fluid, smooth sense of highly accurate positioning.
The thumbstick is often used as a direct or semi-direct stand in for the intended
in-game motion. Rolling the stick across the edge of its round casing creates a
carving turn for a ship in Geometry Wars, a quick heel-turn for Mario or a quick
Jab in Fight Night. With a thumbstick, one can be said to “feather” or “flick” a
F I G U R E 6.10 An old school paddle controller: bounded rotational control in one dimension.
INPUT MEASUREMENT EXAMPLES

-- 130 of 377 --

CHAPTER SIX • INPUT METRICS
control; these are properties of highly sensitive input, one which vastly more sensitive than a standard or trigger button. From its centered position, the thumbstick
can only be displaced until it comes into contact with the circular housing, which
constrains its movement.
The thumbstick can be displaced from its centered position left to right and up to
down, which creates a perceptually infinite number of possible states for the player.
The thumbstick returns two constantly changing float values at the same time,
one for each axis of motion. Left to right motion (in the X-axis) returns one float
value between 1.00 and 1.00, while up and down motion (in the Z-axis) returns
another. The format of the signal could be: (0.16, 0.93).
Mouse
A mouse—and here I’m talking about the input which detects positional movement,
not the clickable buttons—is similar to thumbstick in that it enables movement
in two axes. In the case of the mouse, however, there are no in-built boundaries
(Figure 6.12). There’s a sort of a soft boundary in the sense that you need a small
section of flat surface to rest the mouse on, and that potentially can lead to the
mouse falling off a table or running into something. In practice, the boundary most
often exists in software rather than hardware. The edge of the screen stops the cursor before the edge of the table.
Because there is no explicit boundary, the potential for different states is even
higher than with a thumbstick. All position is relative, and there is no spring pushing the mouse back into a neutral position. These factors combine to make the
mouse the most sensitive input device in common use today.
F I G U R E 6.11 A thumbstick controller offers fluid, accurate means of controlling game action.

-- 131 of 377 --
The boundaries for a mouse’s movement are in software, stopping the cursor
(the meaning of further mouse movement) at the four edges of the screen (top, bottom, left and right). Technically, there’s also a boundary at the edge of whatever
surface you’re mousing on, but this boundary is almost never reached due to the
typical ratio of physical mouse movement to computer space movement. You get a
lot of screen movement for a little mouse movement, so you don’t run your mouse
off the table very often.
The mouse is a highly sensitive input device. On my 1,200  1,600 pixel desktop, the mouse cursor can potentially rest on any one of 1.9-something million
pixels. In practice, a user can’t be expected to accurately hit targets smaller than a
certain size (checkbox on a dialog), but the sensitivity is there.
Like the thumbstick, the mouse returns two separate float values in the form
(0.18, 0.28). But in the mouse’s case, what’s being returned is a displacement.
How far the mouse has moved in both the X and Z directions since the last frame,
in other words. This is often mapped directly into screen space movement (as in the
movement of a cursor) but the movement is not absolute. If it were, you would not
be able to pick up the mouse, move it and put it back down to continuously move
the cursor in one direction.
Table 6.2 compares all these input devices.
F I G U R E 6.12 A mouse has tens of thousands of states and almost no boundaries.
INPUT MEASUREMENT EXAMPLES

-- 132 of 377 --

CHAPTER SIX • INPUT METRICS
TA B L E 6.2 Input Metrics
Standard
Button
Trigger
Button
Paddle Thumbstick Mouse
Type of
Motion
The button
moves in
only one
axis, the
vertical or
Y-axis.
Linear. The
button moves
along one axis
linearly.
Rotation.
The
paddle’s
motion is
rotational
around one
axis.
Linear. The
thumbstick
moves linearly
along the X- and
Z-axes.
Linear. The
mouse
moves
linearly
along the Xand Z-axes.
Dimensions
of Motion
The button
moves in only
one axis, the
forward or
X-axis.
Y-axis
rotation
only.
The thumbstick
moves in
the X and Z
dimensions.
The button
moves in
the X and Z
dimensions.
Direct or
Indirect
Input
Indirect; you
press the trigger
in your hand
and something
changes in the
game. You don’t
directly touch
the screen with
the trigger.
Indirect;
you don’t
directly
touch the
screen with
the trigger.
Indirect input. Indirect
input.
Boundaries
on Motion
Two hard
boundaries,
fully
pressed
or fully
released.
Two hard
boundaries, fully
pressed or fully
released.
Two hard
boundaries,
full left
rotation or
full right
rotation.
One boundary,
typically round
(but can also
be square or
grooved, which
changes the
feel of using the
joystick).
Four soft
boundaries.
Sensitivity The button
has only
two states,
on or off.
There are
no states
between
the hard
on/off
boundaries.
Four to five
possible states
between on and
off.
Hundreds
of possible
states
between
the two
extremes of
rotation.
Thousands of
possible states
between up/
down, left/right
movement, and
all the positions
in between fully
released and
pressed against
the housing.
Millions.
(Continued )

---

## Sección 38: Chapter 2 to answer these questions.

-- 133 of 377 --
Macro Level: The Input Device as a Whole
That takes care of the micro level of individual inputs. Now let’s recompose the
inputs into a complete input device and look at how inputs combine to create an
expressive potential greater than the sum of their parts. To keep things simple, let’s
return to the NES controller, as shown in Figure 6.13.
Examining each input, we must concede that this is very low-sensitivity input
device. There are six buttons for use in active gameplay, and each of them is a
standard two-state button. More than that, certain buttons are mutually exclusive
by design. You can’t press up and down on the D-pad at the same time, nor can you
press right and left simultaneously. But this controller has more sensitivity than its
individual inputs would at first indicate. Even with six buttons and the limitations
imposed by the D-pad, the possible combinations of buttons look something like
Figure 6.14.
In order to truly come to terms with the input space of an input device as a
whole, you have to consider it at both the macro and micro levels. How much sensitivity does each input have, and how do the layout and design of the controller
reduce and/or increase sensitivity? In the case of the NES controller, the sensitivity
is reduced by the mutually exclusive D-pad buttons and increased by the combined
possibilities of the buttons, laid out as they are for use with both thumbs.
TA B L E 6.2 (Continued )
Standard
Button
Trigger
Button
Paddle Thumbstick Mouse
Type of
Sensitivity
Force. The
button is
sensitive to
how far its
spring-loaded
mechanism has
been displaced
from its normal
position.
Force
(torque in
this case).
The paddle
knows
how far
it’s rotated
to the left
or right
of center
by spring
resistance.
Force. The
thumbstick
is sensitive
to how far its
spring-loaded
mechanism has
been displaced
from its normal
position.
Position.
The mouse
is sensitive
to changes
in position;
when it’s
dragged
left, right,
up or
down, this
changes the
signals it
sends.
Signals Binary; “up,”
“pressed,”
“down” or
“released.”
Float value
between 0.00
and 1.00.
Float value
between
 1.00 and
1.00.
Two float values,
each between
 1.00 and 1.00.
One for the left/
right axis, one for
the up/down axis.
Float value
between
 1.00 and
1.00
MACRO LEVEL: THE INPUT DEVICE AS A WHOLE

-- 134 of 377 --

CHAPTER SIX • INPUT METRICS
F I G U R E 6.13 The whole input device is greater than the sum of the parts because inputs
can be combined and overlap.
F I G U R E 6.14 Simple buttons combine to form a larger, more sensitive input space.

-- 135 of 377 --
Again, this isn’t a hard metric. We can measure the total number of inputs and
all the permutations of combining them as specific numbers, but that’s not especially useful. We’re interested in getting a rough idea of how the inherent sensitivity
of an input device compares to the sensitivity of another device. It suffices to know
that NES controller is much less sensitive than a computer mouse; from that point
it is possible to make design decisions relative to our intended feel and to compare
the feel of two games controlled with input devices of varying sensitivity.
Tactile Level: The Importance of Physical Design
It’s also useful to understand how the input feels physically. This is an overlooked
aspect of game feel: the tactile feel of the input device. Games played with a goodfeeling controller feel better. For example, the Xbox 360 controller feels good to hold;
it’s solid, has the proper weight and is pleasingly smooth to the touch. By contrast,
the first-run Playstation 3 controllers were lamented as being light and “cheap [feeling], like one of those third-party knockoffs.”2
This difference in tactile feel of the input device has surprising implications for
the feel of a given game. When I prototype something—platformer, racing game,
whatever—it will feel noticeably better if I hook up the inputs to my wired Xbox
360 controller instead of using simple keyboard inputs. Of course, this is a very soft
metric. It’s tempting to simply say “de gustibus non est disputandum” (there’s no
accounting for taste) and leave it at that, but there are some noticeable, measurable
qualities of various inputs that can be observed and taken into account.
Weight
The weight of a controller is an important quality for an input device. A heavier,
more solid-feeling controller is perceived as being of higher quality. For a game’s
feel, this can go a long way toward making actions feel weighty, powerful or satisfying. Of course, it’s also possible to push too far into the heavy direction, as the original Xbox controller seemed to, but in general input devices seem to trend toward
being too light, flimsy and cheap-feeling. This significantly affects the feel of control
of a virtual object.
Materials
The material used to construct the device has an impact on the way the user feels
about the controller and, therefore, the game. The white plastic that houses my
Xbox 360 controller has a smooth, pleasingly porous feel. It’s almost like skin.
My Wiimote and Playstation controllers feel like plastic. It’s a subtle difference
and measuring its impact on game feel is extremely difficult. All I can say is that
By “ Zeus” from http://forums.maxconsole.net/archive/index.php/t-19989.html
TACTILE LEVEL: THE IMPORTANCE OF PHYSICAL DESIGN

-- 136 of 377 --

CHAPTER SIX • INPUT METRICS
I prefer holding my Xbox controller. The Dell mouse I’m using currently has a similar porousness but is much coarser, making it less pleasurable to handle than my
Xbox controller. This has a mostly subconscious effect on my interaction with these
objects, and on how I perceive virtual objects controlled with them.
Button Quality
By “button quality,” I mean the feel of the spring resistance. Particular buttons on
input devices are often described the same way the feel of a game is described: tight
or loose, quick-responding or sluggish. This feel is contingent on the quality, construction and type of springs that drive the motion of the input, whether they’re on
a button or a joystick.
As James Goddard of Crunchtime Games says, “There is a huge difference in
how input devices—even similar ones—can have on the feel of a game. Most people can tell the difference in the feel of control when a game is cross-platform but
most do not know what exactly is causing it. Even a majority of developers really
are not trained to know. The usual argument is that a specific platform’s controller
is ‘just better.’ Assuming a game engine is truly ported equally across the platforms
and button layout is close to the same, what people are perceiving as better is the
actual mechanical differences in the sticks/buttons tension and mechanical ‘travel’
distance. This sensitivity can come down to millimeters.”
The design of controllers has a lot to do with industrial design and product
design. Controllers are consumer products after all, as are game consoles, computers, mice, keyboards and handhelds. Every piece of hardware upon which game feel
is built is a consumer product. The physical design of hardware can change the feel
of control over virtual objects.
Summary
To summarize, we can categorize an input device according to individual inputs,
the input space of the device as a whole, and tactile feel resulting from the materials and physical construction of the device itself.
Individual inputs can be measured according to their dimensions and types of
movement, whether they track position or force, whether they directly or indirectly
change things on the screen, the boundaries on their motion, and the signals they
send to the computer (hard metrics). They can also be measured according to their
sensitivity (soft metric).
The input space of the device as a whole can be measured by looking at how
many different inputs there are on the device, and the ways in which they can be
combined (hard metrics).
The tactile feel of the device can be measured by the feel of each input (the resistance to movement, springiness, etc.) and the feel of the input device as a whole
(heavy and solid versus light and flimsy, physical properties of the materials). Both
of these are soft metrics, affecting the feel of games in a mostly subconscious way.

---

## Sección 39: Chapter 2 to answer these questions.

-- 137 of 377 --
CHAPTER
Response Metrics
When I say response, I mean the game’s response to player input. The output, in
other words. There are many different ways an input signal, once received, can be
processed before returning to the player in the form of feedback, but the process
has three essential steps:
1. Input signal comes in
2. Input signal is interpreted and filtered
3. Input signal modulates some parameter in the game
To measure the response of a particular game to input, we begin by looking at
how each signal from the input device is mapped to a change in the game. What
parameter does it modulate, and how does it change that parameter over time? And
what are the relationships between those parameters?
There are many different ways an input signal can modulate a parameter in a
game. While an input device is a physical object constructed out of plastic and
springs, an avatar in a game has no such constraints. An input can be mapped to a
change in the position of an avatar, as it is in Megaman. Inputs can also be mapped
to rotation, as they are in Asteroids and Gran Turismo, where a forward thrust is
steered via angular rotation. Or rotation and positional changes can be mapped to
the same input, as they are in Jak and Daxter, Super Mario 64 and Geometry Wars,
where pressing a direction with the thumbstick rotates and moves simultaneously.
An input can also be mapped to the creation of a new entity, as when Megaman
fires his weapon and “spawns” a bullet or when Guile throws a sonic boom in Street
Fighter II. In this case, an entirely new entity is spawned by an input, often from the
position of another avatar. This entity often has its own properties of movement and
its own velocity.
Another possible response to input is the playback of a linear animation, as in
the games Soul Calibur, Samurai Showdown 4 and Street Fighter II. You press a button and a “move” happens. A move consists primarily of animation, created by a
professional animator, and some game-relevant spatial movement. It occurs at the
position in space and time of your choosing, but once triggered, the animation plays
back as a linear sequence of frames, as it would if it were an animation playing
SEVEN

-- 138 of 377 --

CHAPTER SEVEN • RESPONSE METRICS
back on a television. The duration of the animation may be short, but it’s interesting to note that what’s been mapped is still the linear playback of an animation to
a particular input. This can be taken to ridiculous extreme, as it is in the original
Prince of Persia, where the game can only be controlled via the playback of linear
animations. Your input serves only to change which animation is playing at a given
time, and you’re tasked with managing the movement of the character in that stiff,
robotic way.
Still another thing that input can be mapped to is a change in one or more
parameters in a simulation. For example, in Mario Kart DS, there’s a simulation
running every frame which computes the game’s internal model of the karts—their
relationships to one another, their weight, their mass, their velocity, their rotational
force and of course, their friction values—how the forces that are acting on the kart
are reconciled with the friction value of the surface they’re currently in contact with
and how that affects their motion. You can map an input not only to moving the
kart forward and rotating it, but to the friction value itself, altering the resulting
motion of the entire system. When you enter the “powerslide” state by pressing
the R-button, what you’re really doing is changing the friction value. It’s decreased,
enabling you to corner better by carving less (sliding sideways instead of gripping
the road, in other words).
Generalizing the possibilities, an input signal might:
● Set a new position for an object each frame.
● Set a new orientation for an object each frame.
● Add a force or torque to a simulated object, causing it to rotate or move.
● Modify a simulation variable, changing gravity or the friction of a car’s tires.
● Play back an animation from start to finish, like a single move in a fighting game.
● Change the speed at which a looping animation plays back.
The process of hooking up input signals to specific parameters and determining
how they will modulate those parameters over time is known as mapping. For realtime control, however, there is a specific subset of mapping required: mapping to
motion.
If there is real-time control, the input signals will be mapped, directly or indirectly, to the motion of an avatar. The movement of that avatar can, for the most
part, be measured using criteria similar to the ones we used to measure input.
● Type of motion: Linear vs. rotation. Does the avatar move linearly or rotate?
● Dimensions of motion: In what dimensions, X, Y or Z, does the avatar move or
rotate?
● Absolute or relative motion: What frame of reference does the motion use? Is
the motion relative to the avatar, as in Asteroids or the camera as in Mario 64, or
some other point in the world?

-- 139 of 377 --
● Position versus rate/magnitude: Does the input modify a position, a rate or a
magnitude? A mouse cursor is usually mapped to changes in position. Pushing
the thumbstick to the left in Halo changes the rate at which the avatar turns
(halfway causes a slow turn, while fully pressed turns very quickly).
● Direct or indirect control: Does the input modify the avatar directly or does it add
forces to a simulation or cause another object to move or rotate? For example,
in Zuma, movement of the mouse cursor determines which direction the frog
will face.
● Integrated or separate dimensions: Does the input change one parameter in the
game or many? For example, Geometry Wars maps both thrust and rotation of
the ship to the left thumbstick. Jak and Daxter does this as well, changing both
speed and rotation with one thumbstick.
The point of taking stock of the avatar’s movement in this way is to hone in on
exactly which parameter each input is mapped to. We can look at the Sonic avatar
and say he moves along in the XY plane. Or we can look at the movement of Crash
Bandicoot and say, he moves in an XZ plane, but he can also jump or fall in the
Y plane, as well as rotate in the Y-axis to change his direction. Kratos from God
of War moves in a similar way. Knowing which dimensions an avatar moves in,
we can identify which inputs control movement in which dimensions, and whether
that movement is linear or rotational. For example, Mario’s horizontal movement is
controlled by the left and right directional pad buttons, while his vertical movement
is controlled by the A-button.
Attack, Decay, Sustain and Release
Regardless what parameter an input is mapped to—position, rotation, animation
playback and so on—the modulation of a parameter over time will have some kind
ATTACK, DECAY, SUSTAIN AND RELEASE
F I G U R E 7.1 The Mario Avatar moves in two dimensions, X and Y.

---

## Sección 40: Chapter 2 to answer these questions.

-- 140 of 377 --

CHAPTER SEVEN • RESPONSE METRICS
of curve. One way to describe this curve is as an ADSR envelope. ADSR stands for
attack, decay, sustain and release. An ADSR envelope describes the modulation of a
parameter over time, in four distinct phases (Figure 7.2).
Such envelopes are used to describe the modulation of the sound of musical
instruments. For example, when you play a note on a guitar, the resulting sound
can be described in terms of attack, decay, sustain and response. The note is loudest just as the string is plucked, but it takes some time to go from silent to loud.
This is the attack. From the loudest volume, the sound then drops down again
before reaching a stasis point. This is the decay. The point at which the volume
stabilizes is the beginning of the sustain part of the envelope. This lasts until the
sound begins to fall off again, eventually returning to silence. This final period is
the release. Graphed over time, it looks like Figure 7.3.
Contrast this with a pipe organ. The note starts at a constant volume, continues
to play at that same volume and falls silent almost instantly when the button is
released (Figure 7.4).
ADSR envelopes are often used to modulate the output of digital instruments
to make them sound like their physical, real-world counterparts. They are also a
good way to think about the modulation of parameters in a game relative to specific
input. For example, look at the “left” input in Super Mario Brothers (Figure 7.5).
F I G U R E 7.2 An ADSR envelope; modulating a parameter over time in four phases.
F I G U R E 7.3 The ADSR envelope for a guitar’s volume when a string is plucked.

-- 141 of 377 --
In this case the vertical axis of the envelope is movement. There is an attack phase
as Mario ramps up to his maximum speed, no decay, a sustain as long as the button is held and a long release when the button is released. The result is that Mario
speeds up gradually over time (Figure 7.6).
Now compare Mario’s left motion to Donkey Kong’s, shown in Figure 7.7. When
Jumpman (the pre-Mario character from Donkey Kong) moves, he has no attack
and no release. The moment the joystick is activated, he moves at a constant speed
in the appropriate direction (Figure 7.8).
Once we know what parameter in a game is mapped to what input, we can
measure the modulation of that parameter over time relative to the input signals
coming in as an ADSR envelope. Assuming that the parameter being modulated
feeds into the real-time motion of an avatar, we can make generalizations about
how players are likely to experience the sensation of control based on this envelope.
F I G U R E 7.4 The envelope for a pipe organ is much more rigid.
F I G U R E 7.5 The ADSR envelope representing Mario’s horizontal movement.
ATTACK, DECAY, SUSTAIN AND RELEASE

-- 142 of 377 --

CHAPTER SEVEN • RESPONSE METRICS
A longer attack phase results in a floaty or loose feel. This is not necessarily a
bad thing; the thruster mechanic in Asteroids has a long attack, and players generally seem to enjoy that feel. When a long attack phase begins to cause trouble, however, is when there seems to be no immediate response to input (Figure 7.9).
This is problematic because it starts to erode the impression of instantaneous
response. There may be some small change happening immediately, but if the player
can’t perceive it, the game feels unresponsive. An envelope like the one in Figure
7.10, which has a rapid initial attack but a long attack phase in general, will have
both instantaneous-feeling response and a loose, organic feel. On the other end of
the spectrum, a short attack phase will tend to feel tight and responsive (Figure 7.11).
F I G U R E 7.6 Mario speeds up gradually from a standstill.
F I G U R E 7.7 The ADSR envelope representing Jumpman’s horizontal movement.
F I G U R E 7.8 Jumpman moves at a constant speed in the direction indicated by the input
device.

-- 143 of 377 --
F I G U R E 7.9 This feels unresponsive if the thing being controlled takes more than 100 ms to
move (or if the player perceives it this way).
F I G U R E 7.10 Even though the attack phase is very long (more than a second) there is an
obvious initial response.
F I G U R E 7.11 A short attack phase feels tight and responsive.
ATTACK, DECAY, SUSTAIN AND RELEASE

-- 144 of 377 --

CHAPTER SEVEN • RESPONSE METRICS
Even with tight, responsive controls, the attack phase usually has some
nonlinear curving to it. In other words, the attack phase is a curve, not a straight
line. This keeps the flowing, organic feel while enhancing the perception of instantaneous response. On the other hand, when the attack phase is short and when
there is a more linear progression from off to on, most players describe the feel as
twitchy (Figure 7.12). This too can be desirable depending on the intended effect. If
the attack is totally linear and very short, the controls can feel stiff.
What’s interesting is that these sensations—floaty, twitchy, tight, loose,
unresponsive—all exist on the same continuum. They’re just slightly different envelopes, slightly different modulations of motion over time. That motion could be
direct or indirect, a force or a rotation; regardless, changes in attack will alter the
feel of control.
Attack and release are often mirrored, as in the horizontal running of Super
Mario Brothers. After you release the button, it takes Mario the same amount of
time to slow back down to zero as it does to speed up from a standstill to his maximum speed. The soft release maintains the loose feel after the button is released.
Having no release, as in Donkey Kong, feels more abrupt.
When decay is present in game control, it’s usually by accident. Sometimes a
game designer will inadvertently make the speed of movement faster just after
a change in input than during the eventual sustain period. This means that to
maintain maximum speed, constant button pressing is necessary. This is almost
never desirable for the simple, practical reason that it fatigues the player’s hands.
Playable Example
You can experience the difference in example CH07-1. Press the “ 1 ” key for an
unresponsive, the “ 2 ” key for a responsive but loose feel.
F I G U R E 7.12 A short attack phase with a flat progression from on to off creates a twitchy feel.

---

## Sección 41: Chapter 2 to answer these questions.

-- 145 of 377 --
For example, in some of the earlier beta versions of Counter-Strike, it was possible
for those in the know to “skate” by angling slightly sideways and pressing forward
and sideways rapidly. When moving at a particular angle and switching between
going sideways and forward, there was a decay phase—the attack took the maximum speed above the level of sustain (Figure 7.13).
This gave experienced players a huge advantage because they could move one
and a half times more quickly. This was an exploit to be removed because it gave an
overwhelming advantage to veteran players and enabled the player to move faster
than intended.
The level of sustain can be thought of as a limit, such as the maximum speed of
a car or character.
Simulation
So where do these envelopes come from? For any game, it’s relatively easy to track
what parameter a particular input mapped to and how it modulates that parameter
over time. But it is often difficult to discern exactly what sort of system gave rise to
that modulation. Most often, envelopes are defined by relationships between variables in a simulation.
As a simple example, consider a cube that moves left and right. Both directions
of movement have an ADSR envelope that looks like Figure 7.14.
F I G U R E 7.13 The decay phase in Counter-Strike became an exploit.
Playable Example
To experience this, open example CH07-1. Move the cube left and right using
the A and D keys. Enter new values by clicking on a parameter (such as
“ Max Speed”), typing in numbers and pressing enter to see how the envelope
changes.
ATTACK, DECAY, SUSTAIN AND RELEASE

-- 146 of 377 --

CHAPTER SEVEN • RESPONSE METRICS
Currently, an acceleration value is added to the cube’s velocity each frame, creating a smooth quarter-second attack phase. This speeds the cube up gradually, giving it a loose, organic feel. Mirroring this, a drag value is also applied in each frame,
causing the cube to slow back to rest again when the button is released. Without
this drag value, the cube would keep going indefinitely (switch “Drag” to zero to
experience this). The Max Speed variable determines the level of sustain, the constant movement value the cube reaches after completing the attack phase.
This simple test demonstrates how simulations give rise to the different modulations of parameters, and how changes in that simulation modify the sensations
of control. It gets a lot more complex than this (as we’ll see in Chapters 12–17)
but simulations like this are the building blocks for sensations of control. How the
simulation is built determines the sensations of control possible. A particular tuning
can change the feel of control drastically, but the construction of the simulation—
which parameters are available to tune in the first place—determines what tunings
are possible.
For example, consider the feel of the left-right movement in Ghosts and Goblins,
Donkey Kong and the original Metroid. In all three of these games, horizontal movement has very little attack or release (Figure 7.15).
In the systems that create this kind of envelope, pushing the joystick or pressing the button directly overwrites the position of an avatar. Every frame in which
the game detects the button as held, it adds some amount to the current position of
the avatar in the appropriate direction and places the avatar in that new position.
In the same way, the release value brings the player to a halt instantly when the
button is released. The result is a system that feels stiff but responsive. It feels crisp
and is good for dealing with challenges that require precise positioning and accurate
jumping. This same kind of feel applies to other mechanics with little or no attack
F I G U R E 7.14 The cube has smooth, organic movement.

-- 147 of 377 --
and release, such as the movement of a mouse cursor in response to mouse movement. Sometimes players categorize this feel as twitchy.
Compare this to the “thruster” mechanic in Asteroids. Pressing the thruster button has a long attack (Figure 7.16). In this case, it’s because Asteroids keeps track
of a separate velocity value for the ship. Instead of the position of the ship being set
directly each frame, the ship keeps its own value for velocity and updates its own
position based on that value. Pressing the thruster button adds to the velocity value
in the direction the ship’s currently facing. The result is that the ship speeds up
gradually, a curved and gentle attack. It’s a different kind of simulation and a different kind of feel.
The other way to define an envelope is by filtering input before it is plugged into
the changes in the game system, as happens when rotating the Asteroids ship left
and right. The envelope looks like Figure 7.17.
While the left button is held, the ship’s orientation is changed by a certain
amount each frame. There’s a slight attack value, which is achieved by changing
F I G U R E 7.15 A responsive, but stiff, feel.
F I G U R E 7.16 A loose, fluid feel.
ATTACK, DECAY, SUSTAIN AND RELEASE

-- 148 of 377 --

CHAPTER SEVEN • RESPONSE METRICS
the input slightly as it comes in. At the first millisecond the button is pressed, the
amount by which the ship’s orientation changes is less than it is a few milliseconds later. The value gets increased over time. In this way, the feel is responsive
but slightly soft. The player can tap the button lightly to make small adjustments
or hold it down to turn full speed. The rotation is just a filtering of the input signal
over time. This is another way to modulate an envelope: just change the input signals as they come in.
State Changes
Another interesting, measurable feature of simulation is state changes. States are
artificially constructed changes in circumstance that modify the meaning of incoming signals. In Super Mario Brothers, for example, there are ostensibly three controls: left, right and jump. In Figure 7.18, we see different states that overlap and
interact in different ways.
Mario has a “ground” state and an “air” state. As far as the simulation is concerned, Mario’s potential for movement—his physical properties—change when
he’s on the ground or in the air. When in contact with the ground, the left and
right buttons map to certain additive force. When Mario is not in contact with the
ground, the strength of his left and right movement is greatly reduced, creating a
different state. This is a very simple example of increasing sensitivity through state
switching. Left and right movement means something different when Mario is in
the air, meaning that one input is actually mapped to two separate actions that
change depending on the state of the character. What’s interesting is that this creates additional sensitivity in the system: there is greater expressivity when inputs
are mapped to different responses across states which are altered and maintained
by the simulation itself. You’re getting two sets of responses mapped to one input,
essentially.
F I G U R E 7.17 A slight softness in the attack.

---

## Sección 42: Chapter 2 to answer these questions.

-- 149 of 377 --
This is used to great effect in the Tony Hawk games where there are as many as
six separate states, each of which assigns a different value to each button on the
controller. Every button means something different in each state. A relatively small
number of inputs becomes an interface to a huge number of moves. The game has
artificially created different physical states for the avatar to exist in. If these state
changes are clear to the player, they can correspond to a huge number of possible responses. The same principle is applied to fighting games, where being in the
ducking, blocking or jumping states changes the meaning of each input.
Examining the type and robustness of the simulation a game is running can yield
useful fodder for comparison. Without getting too crazy deep into the mathematical
intricacies of a given physics system, we can see that while Super Mario’s vertical movement uses a simple simulation, the jumping in Metroid is a predetermined
set of positions. This lends Metroid a crisper, more precise feel. It’s also useful to
catalog whether or not the avatars have different states they can exist in. If the avatars do have multiple states, how many states do they have and how do the different states cause different input signals to be interpreted by the simulation and
responded to?
Filtering
Input signals come in from the input device in various forms, such as Booleans and
changing float values. It is possible to map “raw” input either directly to a response
or to a force or other modification of a simulation. This rarely happens, because
to directly map raw signals is to forego the opportunity to tweak game feel. Most
often, an input signal is received raw and passes through a layer of code where it
F I G U R E 7.18 Overlapping states provide additional expressivity.
ATTACK, DECAY, SUSTAIN AND RELEASE

-- 150 of 377 --

CHAPTER SEVEN • RESPONSE METRICS
is filtered in some way, into a different value range. Even if it’s just multiplied by
2 or 3 in order to create a greater force value to pass along to a simulation, most
input signals are modified before being mapped to a response. Almost all input is
transposed in this way; this is a large part of what “tuning” means as it is applied to
mechanic design.
For example, the movement of a mouse-controlled cursor on any computer has
a control-display ratio. The change in position of the mouse on the desk is mapped
very closely to the movement of the cursor on the screen, but there is still a ratio
between physical movement and virtual movement. If the cursor moves 2 inches on
screen for every 1 inch the mouse slides across the desk, the control-display ratio is
1:2. In this case, the filtering of input is a simple multiplication. Inputs can also be
divided, added to, multiplied by themselves and so on.
It is also possible to have complex, non linear transformations applied to input
signals as they come in. This is especially true when the signals represent a range,
as with a thumbstick on a controller (which returns two float values, each in a
range from 1.00 to 1.00). This is employed in the driving mechanics Grand Theft
Auto 4 and other games featuring a driving metaphor. Instead of a constant car
steering ratio (1 degree of steering wheel turn  2 degrees of car turn) the amount
of turning changes across the input space. The steering ratio increases the farther
the thumbstick is pulled in a direction (Figure 7.19).
Pulling the stick about halfway to the right of center still yields a fairly small
turn. This mitigates “twitchiness” that is present in some harder-core driving games
like Vanishing Point or, to some extent, Grand Turismo. By making it much more
difficult to oversteer, the mechanism is much more forgiving and creates a nice
range between small avoidance adjustments and hairpin turns.
At this layer, there is the possibility not only for modifying input signals before
passing them on, but for creating entirely new signals by further interpretation of
the incoming signals. Think of the famous Konami code, which looks for a particular sequence of button presses over time. The game’s code examines the input
F I G U R E 7.19 Turning changes as the thumbstick is pulled farther from center.

-- 151 of 377 --
signals it receives for specific, predetermined patterns and responds differently when
it sees them. When a game is sensitive to patterns of inputs over time like this, the
input space becomes larger. Moves in fighting games are fundamentally the same
kind of interpretation. The Haduken in Street Fighter II or “Dark Metamorphosis” in
Castlevania: Symphony of the Night each require a certain sequence of inputs over
time to trigger. Ditto the gestures used in many games controlled by the Wiimote.
Fundamentally, what’s happening is that an additional process is running in the
layer between input and response. The signal comes in and a piece of code checks
to see if it recognizes the signal as the first part of a pattern. If it does, it moves
ahead and waits to see if the next part of the pattern is going to follow. Usually this
is time-based, enabling only a short window of time for the next input to occur
before resetting the sequence. Essentially, it’s building additional sensitivity into the
inputs coming through. After all, a sequence of inputs is not inherent in the signals
coming from the inputs themselves. It’s not a response per se, just the game listening for additional patterns among the input signals it’s receiving. Once a pattern is
identified, a special type of signal is generated by this interpretation layer and is
passed along to the simulation, where the response is carried out. This response
can be an animation, the unlocking of additional lives or the addition of a particular force into the game’s simulation. The same thing happens in most current Wii
games; it just happens to be a much more complex and sophisticated pattern-seeking algorithm because it has to make mathematical sense of all the crazy data that
flows when you spew accelerometer and pointer data from a free-floating controller.
Whether it’s a Haduken or a Wiimote sword slash, however, I would categorize any
time a game listens for a pattern of inputs across time as a “gesture.”
Another way in which it’s possible to create additional sensitivity through interpretation is spatially, either across game space or input space. For example, while
pressing the A-button may have one meaning and pressing the B-button may have
a different meaning, pressing both simultaneously yields a third response. This is
similar to a gesture, but instead of looking to correlate a sequence of inputs across
time, it looks for combinations of input signals happening at the same time. In other
words, it assigns a different meaning to a combination of inputs than it does to
each of those inputs individually. This is commonly called “chording” and is used
to great effect in games like Tony Hawk’s Underground, where every combination of
a button and a direction maps to a different trick. Remarkably, chording is present
even in early games such as Super Mario Brothers, where holding down the B-button modifies the meaning of pressing left or right (by adding more force).
The other type of spatial transposition happens across game space and is more
commonly known as context sensitivity. For example, in Resident Evil 4, the position of the character in the game world can alter the meaning of a particular input.
Standing by a window or a ladder changes the meaning of the A-button in a direct,
one-for-one kind of way. It’s not necessary for context sensitivity to be this rigid,
however, as proved by the game Strange Attractors. Strange Attractors has only one
input, which activates a series of gravity wells placed around the level. The gravity from a well will affect the ship relative to its distance from that well (following
ATTACK, DECAY, SUSTAIN AND RELEASE

---

## Sección 43: Chapter 2 to answer these questions.

-- 152 of 377 --

CHAPTER SEVEN • RESPONSE METRICS
the inverse square law, I assume) meaning that Strange Attractors features a fluid,
ever-changing sort of context sensitivity. The meaning of pressing the button is constantly changing as the ship moves around the game space, closer to some wells,
farther from others.
Drawing a generalization from all of this, transposition is either spatial or timebased. Spatial transposition can mean turning a linear curve into an exponential
one, or it can mean augmenting sensitivity by recognizing groups of input signals
from different inputs as unique, and passing along corresponding (new) signals.
Time-based transposition assigns different meaning to input signals across time,
forming gestures which themselves create new and different signals. This offers us
another way to compare one game to another: the types of transposition the input
signals undergo and the resulting values that get passed along.
Relationships
Examining individual mappings and envelopes takes us most of the way to understanding how a game’s feel is built. The final piece of the puzzle is the relationships
between parameters in a system. This is where much of the tuning of game feel
happens. For example, in the game Sonic the Hedgehog, there is a parameter for
gravity. Gravity is the foil of jumping; the two work in concert to produce the feel of
jumping in Sonic. In the same way, to create the feel of “carving” in a driving game
requires friction. Without friction, the car’s turning seems floaty, as if it’s driving
on ice. With sideways friction applied to the tires, they seem to carve and dig in, as
a real car would. Individual mechanics—mappings of one input to one response—
work in concert to produce an overall feeling of control.
The whole process looks something like Figure 7.20. As shown across the top,
input enters the system when the player manipulates an input device. From the
physical manipulations of various inputs, the input device generates and sends
to the game corresponding signals. A raw input signal can be mapped directly
to response, as with a mouse cursor, or it can feed directly into a simulation.
Alternately, some kind of filtering happens, where the input signal coming in is
altered in some way before being passed along to simulation and/or response. The
simulation layer represents the game’s internal model of reality, the one which the
player interacts with via input. Finally comes the game’s actual response to the signals it received, whether transpose, raw or from a simulation.
To summarize, to measure response we want to know what inputs are hooked
up to what parameters in the game. To do this, we want to know how many different things the player controls, how many avatars there are. We can then examine
each avatar in the game relative to its type and dimensions of motion, the frame
of reference for that motion, and whether the motion is direct or indirect. Knowing
this, we can identify how each input stream modulates the parameter over time and
can quantify this as an ADSR envelope. From this point, we can attempt to extrapolate the system that gave rise to this particular envelope. This could be a filtering

-- 153 of 377 --
of input signals directly, a change in a simulation or both. Ultimately, we want to
understand what variables are being tweaked, the relationships between those variables and how they become the envelopes we’ve identified.
Input and Response Sensitivity
Out of the games discussed earlier, Donkey Kong is particularly interesting because
it maps a relatively high-sensitivity input device (the joystick, which can return
float values from 1.00 to 1.00 along its horizontal axis) to a very low-sensitivity
response. Compare this to Super Mario Brothers, which has a very low-sensitivity
input device but has a very sensitive response.
If we record the positions of these characters over time and include jumping
as well, it’s obvious just how much more expressive Mario’s loose movement is
(Figure 7.21).
From this comparison, it’s apparent that Super Mario Brothers has a more
expressive mechanic than Donkey Kong. The combination of input and response
produces a fairly accurate picture of the overall “virtual sensitivity” of the system
(Figure 7.22). This is a soft metric, of course, but useful for comparing the expressivity of two different games.
F I G U R E 7.20 From input to response.
INPUT AND RESPONSE SENSITIVITY

-- 154 of 377 --

CHAPTER SEVEN • RESPONSE METRICS
F I G U R E 7.21 The position of Mario and Jumpman over time: Mario is much more expressive.
F I G U R E 7.22 Different games on a rough scale of input and response sensitivity.
Playable Example
To experience this first hand, check out example CH07-2. There are four
options for control that can be accessed by pressing keyboard keys 1-4.
To begin, press “ 1 ” and use the W, A, S and D keys to move the cube
around. These controls have low input sensitivity and low response sensitivity. The input sensitivity is low because there are only four buttons, each of
which only has two states, on or off. The reaction sensitivity is low because
the game’s reaction for each button has only two states, moving at full speed
or not moving at all. This is not a very good virtual sensation, very stiff with
very little fluidity or appeal. In some instances—the original Legend of Zelda,
for example—this grid-like rigidity is desirable because it creates a more

-- 155 of 377 --
contemplative, less visceral feel. As in Pacman, all rotation and superfluous
directions of movement have been stripped away for simplicity. The result,
however, is not a very compelling virtual sensation when removed from its
context.
Press “ 2 ” to experience low input sensitivity and high response sensitivity.
This time, the cube moves organically, loosely and smoothly. The simulation
is adding forces rather than overwriting position directly. This is a much better
feel, no? The lines of motion are flowing, curved and organic.
Press “ 3 ” to experience high input sensitivity and low response sensitivity.
With this combination, you have very high sensitivity with the input device,
the mouse, but almost zero reaction from the game. The cube has become
essentially a very large cursor. This is a natural mapping; the position of the
mouse on the screen matches the position of the mouse sitting on the desk,
so it’s very easy to feel oriented and get a sense of mastery and control. Bit
boring, isn’t it? Because the mapping is so internalized from years of computer use, there’s nothing to learn, no motion translation to master. The motion
is quick and snappy and leaves the cube with no feeling of mass, weight or
presence.
Press “ 4 ” to experience high input sensitivity and high response sensitivity. There’s a very interesting motion here, one that requires a bit of mastery.
It feels nice to whip the block around again and again to hit the red dot and
to experiment with trying to slow the block down again and reverse direction
or to make little figure eight patterns. Even a game with high input sensitivity
and low reaction sensitivity (a first-person shooter that ties mouse movement
directly to looking around a 3D space, for example), smoothes that snappy,
jerky input with a little bit of reaction from the game.
This is a simple demonstration of some of the different ways input and
response can be combined to create different sensations of control. This rough
measurement can be applied to any game.
Summary
Our final metrics are as follows:
● Hard
1. How many objects the player controls
2. The dimensions, type and frame of reference for the movement of each avatar
3. The ADSR envelope representing each modulation of a game parameter by an
input over time
● Soft
● The overall sensitivity of the system as a function of its input and response
sensitivity
SUMMARY

---

## Sección 44: Chapter 2 to answer these questions.

-- 156 of 377 --

CHAPTER SEVEN • RESPONSE METRICS
Understanding the simulation and input filtering that give rise to particular sensations of control is craft knowledge. If you want to build real-time control that feels
a certain way, it’s useful to know how simulations give rise to what sensations. For
measuring the sensation of control across games, however, measuring the output,
the envelope, is sufficient. For measurement, as for the player, the underlying simulation is mostly irrelevant. What is relevant is the output, the sensation of control
and the overall sensitivity of the controls.

-- 157 of 377 --
CHAPTER
Context Metrics
Context is a catchall term for the effect of simulated space on game feel. Simulated
space is comprised of collision code, which defines how objects interact physically,
and level design, the physical layout of space. Together, they give meaning to realtime control, providing a physical space for the player to perceive actively via the
avatar.
Hard metrics are difficult to apply to the way that space redefines sensations
of control because context is so bound up with the player’s subjective impressions, which are difficult to graph in any meaningful, consistent way. But we can
still identify some useful soft metrics. Let’s start at the highest level of context: the
impressions of space, speed, motion and size. Then we’ll touch on the feeling of
immediate space and object avoidance, which we’ll categorize as medium-level context. Finally, we’ll look at how context affects game feel at the low level of intimate,
personal space.
High-Level Context: The Impression of Space
At the highest level, exploring a game world with an avatar you control will always
experience some sense of space. With the freedom to explore and move about as
you see fit comes the ability to mentally map a virtual space the same way you
map your own physical space. In your mind, fed by the ever-on firehose of perception and against the backdrop of the perceptual field, you’re constantly building and
refining a concept of your surroundings. It’s not quite accurate, but not quite not,
and it enables you first and foremost to function and cope with your immediate surroundings. If you’re like me, and like most people generally, you have a pretty accurate map of all the streets and points of interest within a mile or three of your home.
Now think of a time when you took a trip, when your starting point was shifted to
a hotel or a friend’s guest room, somewhere new and unfamiliar. As you start to
explore and trace paths, you begin to populate your mental model with landmarks
and specifics. Before that, however, there is a period where your whole idea of this
new place, your whole mental model, is based on a generalization. A general, but
inchoate, spatial awareness. A feel.
EIGHT

-- 158 of 377 --

CHAPTER EIGHT • CONTEXT METRICS
This process of spatial learning, from macro to micro, is analogous to what
happens when a player begins exploring a game space with an avatar. This is the
highest level at which context affects feel: the general sense of space. It’s not possible to measure this in a hard metric, finite numbers kind of way, but it’s certainly
possible—and useful—to catalog the general feel conveyed by the overall structure
of a space. To illustrate this, let me share a personal experience.
Interested in the painterly textures and nursing a nostalgic fondness for Blizzard
games, I fired up World of Warcraft. I had no intention of actually playing the
game—an unfortunate, hygiene altering experience involving Ultima Online cured
me of the MMO bug a long time ago—but I was interested in at least poking around
and checking things out. What immediately struck me was the feeling of vast,
sprawling openness. There was a sense that this was a world with some interesting
and meaningful analogies to the world as I’ve experienced it. Specifically, trudging
around felt a bit like hiking up to catch the glorious, breathtaking view from the
top of the flatiron of Superstition Mountain, a grueling hike to the east of Phoenix,
Arizona, which my friends and I do from time to time (Figure 8.1). From the top,
there is no noise but there is plenty of wind. On a clear day you can see for hundreds of miles in every direction. The view is miraculous. Schlepping up to the top
of the highest mountain I could find in World of Warcraft somehow felt similar.
Here, in game form, was a little virtual taste of how it felt for me to stand at the top
of a mountain and stare out.
Oblivion, like World of Warcraft, felt open and sprawling. Climbing to the top
of something high, I could see for a great distance and, knowing that this was a
contiguous world instead of the Potemkin villages you so often see in single player
games, it felt like a realm of great possibility. If I saw something far away, I could
travel there. Neat. By contrast, the worlds of Counterstrike seem always hemmed
in, claustrophobic, and full of endlessly looping, twisting tunnels. Some levels
F I G U R E 8.1 Wide open space.

-- 159 of 377 --
have open areas, to be sure, but there’s never a sense that anything exists outside a
Counterstrike level. As a player, you intuit within the first round of play that those
far off buildings and skyboxes are just there for decoration.
To frame this concept another way, when the space is large and expansive, it
warrants pondering and exploration, encouraging players to look outside the self
and think about things like how small and insignificant they are. When it’s tight
and constrained, it causes more introspection.
With respect to game feel, this can mean the difference between an intense focus
on the immediate surroundings and on the sense of exploration and possibility
lauded by so many fans of Oblivion. Counterstrike does a great job of harmonizing
its tight, twisting environments with other rules and systems that further emphasize the need for intense, all-consuming focus on moving through the immediate,
medium-range space efficiently and effectively. Because one shot can kill you and
you know that five enemies could be waiting just around the corner, you’re careful,
calculating and hyper-aware of every nook and cranny of the environment.
Without delving deeply into the notion of space as it is studied and employed by
architects, we can at least appreciate the effect of high-level, large-scale construction
of game worlds on game feel. Georgia Leigh McGregor, an astute student of the role
of architectural concerns in video game design, observes the differences between
the architecture of World of Warcraft and The Battle for Middle Earth II:
An initial architectural reading of both video games reveals a dichotomy in the
way they portray or produce architecture. … Word of Warcraft privileges architecture as a spatial experience. It is concerned with the ability to move through space,
constructing architecture as a series of solids and voids. When we interact with
the architecture we are alternately channeled and impeded. … This is a spatial
architecture that mimics the ways in which we use architecture as containers
for specific purposes in the real world. The architecture has what architects call
program, so that Ironforge can be divided into circulation space and activity
space. … Conversely BFME II is not concerned with architecture as space.1
In terms of measurement, we can say, as a soft metric, that a space feels mostly
open, like a seashore or a large city, or closed and claustrophobic like a subway tunnel or a cave, and to roughly chart the effect of that overarching structure on the
feel of a game.
Impressions of Speed and Motion
The other high-level way a game’s feel is affected by context is in the impression of
speed of moving objects. Speed in a video game is a purely notional concept. There
is no standard unit of measure for the movement of objects in a game. There can’t
be. Unlike our reality, where miles per hour means the same thing to a swallow in
IMPRESSIONS OF SPEED AND MOTION
http://www.scribd.com/doc/268586/Architecture-Space-and-Gameplay

---

## Sección 45: Chapter 2 to answer these questions.

-- 160 of 377 --

CHAPTER EIGHT • CONTEXT METRICS
Saskatchewan, a bus in Burma or a Maserati in Munich, every game uses fundamentally different units to measure (and tune) the speed of objects. Even in games
such as Project Gotham Racing and Gran Turismo, where speed is measured ostensibly in miles per hour, the metric does not correlate across games. The problem lies
in relativity. Speed in a video game only has meaning relative to the number, placement and nature of the objects around it. Without at least one object to compare it
to, the speed at which something moves in a game has no meaning.
Playable Example
To illustrate just how powerful this effect is, I created an interactive test of
a car, example CH08-1. According to the game, the car moves at 100 miles
per hour. The game’s code says simply “when the space bar is pressed,
speed  100 mph.” As long as a camera follows that car at the same speed,
the number 100 is meaningless. The speed at which the car moves according
to the game’s code has no effect on the impression of speed for the player.
However, add an asphalt road texture beneath the car, and the impression of
speed springs to life. To experience this, press “ 2 ” on the keyboard. Simply
put, without a frame of reference there can be no impression of speed. Add in
trees and fences, cows and bridges, and the effect is enhanced. Have the field
of view of the camera change as the car speeds up and the impression of speed
is greater still.
So even if we could distill the speed of an object moving in a game to a measure of, say, distance across the screen per second and compare that to the speed
of movement in other games, the problem remains that what we’re tracking is the
game’s internal model of speed rather than the player’s. What we want to measure
is the impression of speed as it exists in the mind of the player. So how do we do
that? Again, this is a bit of a soft metric. We can never really know exactly how
players perceive speed, only what they will tell us or what we experience ourselves.
Thankfully, the impression of speed seems to have very little variability across different players, probably because we spend so much of our time interacting with a
world where things move around quickly, and where it’s important that one be able
to gauge the movement of those things accurately. Stepping off a curb three seconds earlier or later can mean the difference between a delicious muffin and grisly
death, so people are pretty great at judging the speed of moving objects at various
distances, especially with respect to their own visually verified point in space. That
oncoming bus is getting larger at a certain rate and the sound of its engine is getting
louder. The parked cars and lampposts it’s driving past help you verify its size, and
the rate at which it’s advancing past them gives you still more data about how fast
it’s coming. Other cars driving nearby also give me a frame of reference for speed;
if the bus is passing cars left and right, it’s probably going quite fast. All in all, there
are dozens of clues that enable me, in an instant, to judge, check and recheck my

-- 161 of 377 --
concept of the bus’ speed of approach. With that data I can decide whether a delicious muffin is worth the risk or whether it would be best to defer deliciousness for
another few minutes.
The impression of speed conveyed by a video game offers these same kinds
of clues (such as size of objects, their relative motion and changes in sound) to
actively fool the audiovisual system into thinking motion is occurring. Depending
on the apparent movement of objects across the screen, changes in perspective
and field of view and effects such as Doppler shift and screen blurring, that motion
will read as fast, slow or somewhere in between. For now, let’s focus on the apparent movement of objects on the screen and changes to perspective. Effects such as
Doppler shift and screen blurring are best categorized as polish because they are
layered on, and have no direct effect on the simulation.
The best way to come to terms with the speed of something in a game is in comparison, again, to real-world objects. Is the impression of speed in the game similar
to riding your bike or is it closer to driving on the freeway with the top down? For
me, the movement of Daxter in his PSP incarnation seems most like that of a squirrel. The motion is quick; rather than having a very high speed and taking a long
time to reach that speed, it is showing quick changes in direction and a quick ramp
up to maximum speed, as happens when something very small moves around a
small space very rapidly. Loco Roco seems like playing with a bunch of fast-rolling
water balloons. All of this comes back to the balance between the speed of movement of the avatar and the nature, size and spacing of the objects in the world that
avatar traverses. In this way, context is a second set of knobs for tuning real-time
control. Effectively tuning a game’s feel means tweaking a bunch of numbers which
govern the resulting movement of the avatar, but it is the placement of the objects
around, over and near which that motion that takes place that gives those numbers
meaning. To tune, you must have some context to tune against.
The other thing that profoundly affects the impression of speed in a game is perspective. Returning to the example of watching a bus from a street corner, imagine
instead being in one of the cars driving alongside the bus. How fast does the bus
appear to be moving now? And what if you were instead in a news helicopter flying hundreds of feet above the bus? In that case, both the cars and the bus would
appear to be positively plodding. Even if the helicopter was in a hover, the distance would make the traffic seem to crawl in the same way that a jet plane seems
to amble across the sky when you’re standing on the ground. Perspective changes
everything. In the case of a video game, though, there is no real meaning to absolute speed. It doesn’t really matter that the jet is actually moving at 600 miles per
hour; there is only the player’s impression of speed. From the point of view of a
game designer, this is great news. We can easily change the distance from which
objects are viewed, the size of objects and the speeds at which they move relative
to one another. In addition, we can change the angle view of the camera. Wikipedia
defines angle of view (perspective) as “As an effect, some first person games, especially racing games, widen the angle of view beyond 90º to exaggerate the distance
the player is travelling, thus exaggerating the player’s perceived speed. This effect
IMPRESSIONS OF SPEED AND MOTION

---

## Sección 46: Chapter 2 to answer these questions.

-- 162 of 377 --

CHAPTER EIGHT • CONTEXT METRICS
can be done progressively or upon the activation of some sort of ‘turbo boost.’
An interesting visual effect in itself, it also provides a way for game developers
to suggest speeds faster than the game engine or computer hardware is capable of
displaying. Some examples include Burnout 3: Takedown and Grand Theft Auto:
San Andreas.”
The Impression of Size
An extension of the impression of speed is the impression of size conveyed by the
impression of speed. In other words, the size of an object and its motion have a
relationship which can be used reciprocally to create an impression of slow speed
or of massive size. In the game Shadow of the Colossus, for example, the colossi
appear to move very slowly. When you watch a commercial airliner amble its way
across the sky, the same phenomenon is at work. It is in fact moving 600 miles per
hour, but the distance from which you are seeing it reduces the impression of speed
to a crawl. As the hero approaches the colossi, however, it becomes apparent that
they’re not slow-moving; they’re simply huge. The impression is created not only
by the added frame of reference of the character being suddenly near the colossus’
foot, but by the colossus’ hefty, plodding movement. The interesting part is that it’s
the contrast between being very close to the colossus or very far away from it that
conveys the impression of massive motion. The little avatar moves closer to the
colossus over time, giving a fluid set of data points with which to form and inform
a detailed concept of the mass and heft of the colossus based on its movement. The
game also does some neat things with perspective, constantly looking along a vector from the character to the colossi, effectively guaranteeing that the colossi will
always seem to be towering above you and bending the view angle nicely wide in
order to exaggerate the impression of distance. The effect is such that the closer the
player gets to a colossus, the larger it will seem and the greater the distance covered
by its expansive motions. The sounds, particle effects, screen shake and other polish
sell the notion of largeness, but it is the impression of speed which truly lends the
colossi their impression of mass and size.
To see what happens when such an attempt at impression of size goes wrong,
check out the bosses in the games Serious Sam and Painkiller. Both these bosses
were similar in size to the colossi, if not larger, at least, judging by the relative speed
of the avatar. Both of these games had the sounds, particle effects, screen shake and
other polish necessary to sell the notion of largeness, but the impression of speed
was lacking the requisite context to be effectively established. The motion was
wrong. Even when you got close to them, the impression was not one of a massive,
hulking beast. Rather, the impression was that a small creature had somehow been
enlarged, but had retained all of its physical properties. That is, physics were the
same for it at the size of a skyscraper as they were at the size of a dachshund. The
speed of the animation playback was paramount. The colossi moved very slowly
when you were far away from them but appeared to move appropriately quickly

-- 163 of 377 --
when your frame of reference was changed to a closer aspect. The bosses in Serious
Sam and Painkiller appeared to move quite quickly, even from a distance, thus
destroying the intended effect of the impression of size.
So that’s one great example of how the speed of movement of objects by providing context for one another can effectively sell the size, mass and weight of an
object. The sounds and particles and screen shake also speak to those properties,
but in this instance the sensation was really sold by the context of one moving
object relative to another.
This is the same essential principle that applies to the apparently slow motion of
Zangief relative to Chun Li in Street Fighter II. Zangief’s motion seems ponderously
slow relative to the motion of Chun Li. His movement would probably seem somewhat slow by itself, but with the added frame of reference of twitterbug Chun Li,
the effect is enhanced considerably. To contrast that, imagine an alternate universe
Street Fighter II where Zangief is the fastest character. Relative to those dullards, his
motion would seem zippy fast.
Medium-Level Context
The medium level of context refers to the feeling of immediate space and object
avoidance. At this level, changes in context can mean the difference between sensations similar to pushing through a crowded party, wandering an empty street or a
playing in a basketball game. It’s not space at the low level—intimate and interpersonal—and it’s not the sensation of openness you get from walking along a beach.
It’s the layer where, with respect to game feel, context is the “second set of knobs”
for game feel tuning. The first set of knobs is in the programmed response to input;
you tune the speed of motion of the character in absolute terms relative to the
game. For example, the character moves at 90 meters per second forward and can
turn somewhere between 0.1 and 5 degrees per second. None of these numbers has
any meaning, as we’ve said, unless they’re related to spatial context. In order for
the forward speed of a car in a racing game to have meaning relative to how fast it
can turn left and right, it must have a track. You have to have a track laid out that
has curves of a certain sharpness and that includes objects and obstacles to avoid.
It is at the intersection between the tuning of the individual response to input numbers and the spacing of the objects in the environment that the feel of a game gets
primarily tuned.
So this mid-level of context is about steering and object avoidance, about navigating an interesting spatial topology with enjoyable precision and deftness. In
order to compare the avoidance mid-level feel between games, what we need to
examine is:
● The number of objects
● The size of the objects
● The nature of the objects
MEDIUM-LEVEL CONTEXT

---

## Sección 47: Chapter 2 to answer these questions.

-- 164 of 377 --

CHAPTER EIGHT • CONTEXT METRICS
● The layout of objects
● The distance between objects
Across multiple games, we can compare how far apart objects are spaced relative
to the speed and motion of the avatar and can examine how this changes game feel
(Figure 8.2). A great example comes again from World of Warcraft. Moving through
WoW, I began to experience highway hypnosis. Highway hypnosis happens when,
while driving, you begin to zone out, and are to be lulled into a somnambulant state
by the flowing uninterestingness of it all. You’re sort of flying across the land and
your mind begins to expand in all directions, and you have this sort of powerful
alpha brain wave truncation of time. Before you know it you’ve driven 200 miles
and are suddenly nagged by the distinct feeling that yes, perhaps I should have
been paying more attention those last three hours. My driving instructor in high
school told us that 20-something percent of all accidents in some place during some
time period were caused by this. For me, it tends to happen when I’m driving cross
country. Traversing the landscape of WoW felt for all intents and purposes like driving the long stretch of straight, level freeway between Los Angeles and San Jose.
F I G U R E 8.2 Different configurations and types of space yield a different feel relative to the
controlled movement of the avatar.

-- 165 of 377 --
Because the objects in World of Warcraft are spaced so far apart relative to the speed
of movement of the avatar, and because the movement of the avatar across that terrain often has no gameplay function, running across this environment started to lull
me into the same zoned out state (Figure 8.3).
In contrast, playing Vanishing Point is like another section of the route between
San Jose and Los Angeles. After hours of mindless driving on Route 5, you arrive
at Pacheco Pass. The contrast is striking. In Pacheco Pass, the wind blows right off
the adjacent waters of Lexington Reservoir, buffeting your car and threatening to
uncouple it from its reassuring grip on the road. The road twists at dismayingly carcommercial-like angles, and there’s invariably some idiot who seems determined to
get his Jetta’s worth by driving the section at speeds he’s witnessed in such a commercial. Playing Vanishing Point is like being the idiot in the Jetta. It’s an insidiously
difficult racing game from the Dreamcast era, with the most twitchy, difficult controls. The game tasked you with accomplishing the most horrendous and knucklewhitening missions using those controls.
These two extremes, WoW and Vanishing Point, are two points on the scale of
mid-level spacing. This is the primary dimension in which it’s possible to create
challenge. Along the gamut from WoW to Vanishing Point, you can have objects
spaced farther apart or closer together. In tweaking that relationship, you also
increase the challenge of navigating that space. So the alteration of the spatial context in which an avatar moves is one of the primary vehicles with which it is possible to change challenge. Again, to measure at this level, we’re interested in the
spacing of objects.
Low-Level Context
Finally, context affects game feel at the low level of intimate, personal space,
at the level of tactile interaction between objects. At this level, what we’re interested in examining is collision. Now, the maths involved in collision detection and response is a little bit scary. At least, it is me (being a lowly brain-dead
F I G U R E 8.3 WoW-highway-hypnosis.
LOW-LEVEL CONTEXT

-- 166 of 377 --

CHAPTER EIGHT • CONTEXT METRICS
game designer). Regardless, there are several excellent books and online resources
dealing with different kinds of collision and how to implement them. For our purposes, we want to compare different ways it is possible to model collision and the
resulting feel is to simply draw comparisons to the interactions of physical objects
in our everyday lives. Again, this is something of a soft metric and requires some
conceptual leaps in terms of metaphorical relationships between objects moving in
a game and objects moving in the real world. But the analogies are usually sound,
and this is a useful tool for categorization and comparison.
For example, most racing games subscribe to the “waterslide” method of collision and response. The reason is that it really sucks if you’re playing a driving game
which requires a lot of precision and the car reacts like it’s coated in glue when it
comes into contact with another object. Or, you know, do something akin to what
it would do if you were to scrape a real car against a barrier at 200 miles per hour.
Instead of this quagmire, most modern racing games use collision schemes which
essentially feel like a waterslide. There’s almost no friction at all when the cars run
into something. When you bang into a barrier, instead of crumpling or exploding,
the car ricochets off and keeps on going. This is a very different feel from a collision
system with a huge amount of friction, where if a car runs into a wall it might roll
or get stuck or crumple sideways.
So essentially what we can do is look at the feel of collisions between
objects in a game and compare them to the feel of everyday things and so to one
another. For example, the collisions in Loco Roco feel like a big bowl of Jell-o or
a bunch of water balloons banging into one another. It feels very soft, very jiggly,
very spring-loaded. Very different from Gran Turismo, which has a very solid feeling to its collisions. It’s a rigid, unyielding solidity, and an interesting comparison
can be drawn between the crisp smooth solidity of the collisions in Gran Turismo
versus the dirty, broken, mushy collisions in Burnout Revenge. In Burnout, they
still employ the waterslide model at some level, but they’re doing some rather
sophisticated damage modeling. This causes the car to compress and mush up
even if there’s nearly zero friction applied to the collision so the car can continue
driving apace.
As a final example, consider the low-level feel of World of Warcraft. While the
high-level feel of WoW was open and boundless, it felt barren and empty. It was
tactilely sterile. When I climb Superstition, I can reach down and feel the rocks
beneath my hands. Indeed, doing so is mandatory—to make it to the top requires
a short section of light rock climbing. In WoW, I never really interacted with anything. It felt very sterile. There was no reason to pay attention to what was nearby
or whether I was running into a building, running through a desert or running off
a cliff. The collisions felt smooth but dead in the sense that there was no energy
coming back out of them. You can’t smack into something and rebound or indeed
see any interesting interaction. It’s a bit like playing only with Nerf toys. Everything
is soft and mushy and safe to play with indoors. You’re never going to put your eye
out with them.

---

## Sección 48: Chapter 2 to answer these questions.

-- 167 of 377 --
Summary
Context metrics can be categorized into three different levels:
● High-level context—The impression of space, speed and motion inherent in the
overall conception of the game world
● Medium-level context—The immediate space around a character and how the
character interacts with objects moving through that space, for example, object
avoidance
● Low-level context—The intimate, tactile, personal interaction between objects
At each of these levels, we identified soft metrics that, while not strictly quantifiable because of the subjectivity impressions of each individual player that must be
taken into account, are nevertheless useful in game design. At the high level, our
metric is the general sense of space, speed and motion as it relates to the player and
the effectiveness of the game world. At the medium level, our metric is the spacing
of objects. And at the low-level, our metric is how objects collide, and how these
collisions feel compared to everyday objects in the real world.
SUMMARY

-- 168 of 377 --

This page intentionally left blank

-- 169 of 377 --
CHAPTER
Polish Metrics
Polish is any effect that creates artificial cues about the physical properties of objects
through interaction. In this case, artificial means “not simulated.” When two objects
collide and the code tells them that they’re each solid and so should rebound with a
certain force in a certain direction, this is not polish. This is part of the simulation,
part of the game’s response to input. Instead of “artificial,” the terms “nonessential”
or “layered on” could also be used. The point is, if these effects were removed, the
essential functionality of the game would be unaltered. What would be changed
would be the player’s perception of the physical nature of the system. In this way,
polish has a huge impact on game feel: it provides the visual, aural and tactile clues
a player needs in order to create a detailed, expansive mental model of the physics
of virtual objects. Polish “sells” interaction, to put it another way.
The tendency is to wave a dismissive hand at polish, saying, “Oh, well, it’s not
actually a very good game, it’s just really polished.” This does a great disservice to
the impact that polish can have on game feel and on the experience of playing a
game generally. It is in the polish that much of the impression of a physical reality
different from our own exists. With that comes the sense of possibility and wonder
that attracts so many to games as a medium. In a few minutes spent feeling their way
around, players can extrapolate a universe of possible interactions based on their
observations and, in so doing, can experience a great joy of discovery and learning
which is rarely possible in everyday life. Much of what makes something interesting
and enjoyable to control is the perception that the thing is huge and weighty; lithe
and nimble; or that it is grinding, scraping, carving, blasting, smashing, caressing or
otherwise interacting with other things around it. The question is, how do we measure the effect of polish on a game’s feel and compare it to other games?
First, we need to define exactly what we mean by an effect. For example, the
squeal of car tires is separate from the smoke particles that shoot out when pedal
hits metal. This is obvious enough—these are separate effects. One is a visual effect;
one a sound effect. To create each requires entirely different skill sets. What’s interesting is that these two effects will be perceived as one by a player. As they are correlated in physical reality, so they are assembled into a single event in the mind of a
player. By an individual effect, then, we mean either the smoke or the squeal. Both
support the same perception of interaction—the friction of tires spinning against a
NINE

-- 170 of 377 --

CHAPTER NINE • POLISH METRICS
road under various powerful forces—but each is distinct and is constructed differently. At the higher level, we’re interested in the interactions that are supported by
these various effects. Many different effects, even across senses, can support and
enhance the perception of the same interaction.
Next we want to identify individual effects and categorize them according to the
impression of physical interaction they are designed to support. A neat ancillary benefit in doing this is that it provides a quick and dirty check of intent versus outcome.
A certain effect may be intended to enhance the impression of weight or mass,
but it may be clashing with other effects and conveying something different than
intended. Returning to Chapter 8’s example of the impression of size and weight in
Painkiller versus that in Shadow of the Colossus, the animated Colossus walking
has a much greater sense of weight and presence than that of the gigantic bosses in
Painkiller. In the case of Shadow of the Colossus, the sound effects featured deep,
reverberating booms and the sound of detritus being strewn in time with the Colossus’
footfalls. The particles were correspondingly huge plumes of dust and sprays of
gravel as the animated foot slammed into the ground. In addition, when the player
was within a certain distance of the colossus, the screen would shake to further indicate a massive impact. In Painkiller, the animation and effects clashed. The sounds
were similar to those in Shadow of the Colossus, but the animation lacked the slowmoving weight and follow-through necessary for the intended effect. Also, there
were too few particles spewing up to enhance the apparent impact of a massive
foot. Though the creatures themselves were technically massive, their motions and
accompanying effects tended to convey an impression of something much smaller.
Finally, before beginning our discussion of polish metrics, it’s important to note
once again that in the realm of polish, as with metaphor and many other areas of
game feel, we are dealing with soft metrics. This is because it’s very difficult to
aggregate and quantify players’ individual perceptions of the exact feel created by a
polish effect. Player perceptions are relative, not absolute, and arise almost entirely
from world-view created by game, rather than real-world physics. As we will see,
however, there are a number of soft metrics associated with polish that are extremely
useful to game design.
Let’s start by defining the kind of soft metrics we need to measure how polish
affects interactions between objects.
The Feel of Everyday Things
As we start to examine the interactions between objects, the temptation is to identify
each object simply, with respect to individual physical properties. But the properties of objects are not as simple as one might suppose. Under the heading “physical
properties,” Wikipedia offers the following list: absorption, acceleration, angle, areas,
capacitance, concentration, conductance, density, dielectric, displacement, distribution, efficacy, electric charge, electric current, electric field, electric potential, emission,
energy, expansion, exposure, flow rate, fluidity, frequency, force, gravitation, impedance,

---

## Sección 49: Chapter 2 to answer these questions.

-- 171 of 377 --
inductance, intensity, irradiance, length, location, luminance, magnetic field, magnetic flux, mass, molality, moment, momentum, permeability, permittivity, power,
pressure, radiance, solubility, shininess, resistance,spin, strength, temperature, tension, thermal transfer, time, velocity, viscosity, volume, scattering light.
Apart from being a rather exhaustive list, this isn’t quite what we want. Most of
these properties are not easily perceived by visual, aural or tactile observation; they
must instead be measured by sophisticated instruments. The problem, apart from our
inability to measure things like this meaningfully across games, is that these properties are mostly irrelevant. As far as the player is concerned, the perception is the reality. The game can think an object weighs ten tons, but if it moves like a squirrel the
player will perceive it as such. What we want are more things like Figure 9.1.
We need unscientific terms like “pointy” or “springy” because the feel arising
from polish effects is based on the individual player’s perception, which is subjective,
THE FEEL OF EVERYDAY THINGS
F I G U R E 9.1 The feel of some everyday things.

-- 172 of 377 --

CHAPTER NINE • POLISH METRICS
relative and general. This is in some ways the opposite of measuring something
in the real world, which is typically thought of as objective, absolute and specific.
We measure the weight of a brick by placing it on a scale. The scale (an objective,
impartial instrument) gives us a measurement in pounds or kilograms (an absolute
measurement—the same for all objects everywhere) of this (specific) brick. By contrast, the physical properties of a brick in a game are entirely based on a player’s
subjective perception.
This means that the properties of objects in the player’s mind can only be
measured in the way that the perception of color, loudness and temperature are
measured, by the expected response of a group of observers when perceiving
the specified physical event. For example, out of a group of 50 people who touch a
glass of ice water and a mug of hot tea, everyone will be able to identify that the
tea is the hotter of the two, but no one will be able to say with certainty what the
temperature of either is. The hotness of the thing is only measured against the other
thing (a relative measurement), and we cannot guess the specific temperature of
either object by only measuring them relative to each other (the measurement is
general, not specific). The same goes for polish effects. What we’re interested in
tweaking, and tracking, is the general, relative, subjective sense that players have
of the various objects they control and interact with in a game. With that, we can
examine the corresponding physical properties that the players are inferring in their
minds from the nebulous, general sensation and trace that down to the level of individual effects.
This means that what we’re actually interested in tracking are not the physical
properties of objects in a

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_EMIL_KOWALSKI_ANIMATIONS_ON_THE_WEB]] · [[CANON_2D_3D_GRAPHICS_SHADERS_AND_AESTHETICS_2026]] · [[CANON_HOLO_SHADERS_3D_PACK_CHOREOGRAPHY_AND_WEBAUDIO_SFX_2026]] · [[CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY]] · #motion_and_animation
