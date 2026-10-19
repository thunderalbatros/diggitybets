# 📚 Libro Completo: Level Up! The Guide to Great Video Game Design

**Alcance:** Fuente bibliográfica completa sobre Diseño de Controles, HUDs Limpios, Cámaras, Recompensas Visuales y Ritmo de Partida (Level Up! The Guide to Great Video Game Design — Scott Rogers). Aplicable a la Software Factory Web y DiggityBets. NO sustituye los contratos de API de Kick ni las reglas específicas de negocio en `CANON_*`.

> **Autor:** Scott Rogers  
> **Dominio:** Diseño de Controles, HUDs Limpios, Cámaras, Recompensas Visuales y Ritmo de Partida  
> **Archivo Fuente:** `dokumen.pub_level-up-the-guide-to-great-video-game-design-1nbsped-047068867x-9780470688670.pdf`  
> **Páginas Originales:** 517  
> **Secciones Extraídas:** 51  
> **Fecha de Ingesta:** 2026-10-19  

---

## Sección 1: Foundations & Introduction

-- 1 of 517 --

-- 2 of 517 --

-- 3 of 517 --

Copyright Information
Please note that the following characters are copyrighted to the following corporations:
Tennis for Two—This work is in the public domain in
the United States because it is a work of the United
States Federal Government under the terms of Title
17, Chapter 1, Section 105 of the US Code.
Space Invaders © 1978 Taito Corporation
Galaxian © 1979 Namco
Star Wars Arcade © 1983 Atari Inc.
PAC-MANTM & © 1980 NAMCO BANDAI Games Inc.
Space Panic © 1980 Universal
Popeye Arcade © 1982 Nintendo
Pitfall! and Pitfall Harry © 1982 Activision
Dark Castle © 1986 Silicon Beach Software
Donkey Kong and associated characters © 1981
Nintendo
Mario Bros. © 1983 Nintendo
Super Mario Bros., Mario, World 1-1, Super Mario
Bros. Theme © 1985 Nintendo
Ghost n’ Goblins © 1985 Capcom
Mega Man © 1987 Capcom
Mario 64 © 1996 Nintendo
Crash Bandicoot © 1996 Sony Computer
Entertainment
Wizard of Oz and associated characters © 1939
Metro-Goldwyn-Meyer
Monty Python and the Holy Grail and associated
characters © 1975
Star Wars and associated characters © 1977
Lucasfi lm Ltd
Robocop © 1987–1998 Orion (MGM) Pictures
Maximo vs Army of Zin © 2004 Capcom
Maximo: Ghost to Glory © 2002 Capcom
Team Fortress 2 and associated characters © 2007
Valve Corporation
Laura Croft © 1996 Eidos Interactive
Batman © 2010 DC comics
Resident Evil 2 and associated characters © 1998
Capcom
Army of Two © 2008 Electronic Arts
Ico © 2001 Sony Computer Entertainment
Doom © 1993 id software
Darksiders © 2010 THQ
Syndicate © 1993 Electronic Arts
Supreme Commander © 2007 THQ
Warriors © 1979 Vectorbeam
Castle Wolfenstein © 1981 Muse Software
GoldenEye 007 © 1997 Nintendo
LittleBigPlanet © 2008 Sony Computer Entertainment
Europe
Playstation Dual Shock controller © 1998 Sony
Computer Entertainment
XBOX 360 controller © 2005 Microsoft
World of Warcraft © 2004 Blizzard Entertainment
Dragon’s Lair © 1983 Cinematronics
Bad Dudes vs Dragon Ninja © 1988 Data East
Mortal Kombat © 2009 Warner Brothers Interactive
Entertainment
Sleeping Beauty’s Castle, Haunted Mansion, Pirates
of the Caribbean, Peter Pan’s Flight and
associated characters, Pirate’s Lair © 2010 Walt
Disney Company
Prince of Persia © 2010 Ubisoft
Kratos © 2010 Sony Computer Entertainment of
America
Solid Snake © 1987 Konami
Marcus Fenix © 2006 Epic Games
Gauntlet © 1985 Atari Games
Spider-Man, Rhino © 2010 Marvel Entertainment/Walt
Disney Company
Bioshock and associated characters © 2007 2K
Games 2007
Demolition Man and associated characters © 1993
Warner Brothers
Earthworm Jim © 1994 Virgin Interactive
Master Chief © 2001 Microsoft Game Studios
Holst, the Planets—Mars Bringer of War, copyright
unknown
All other characters displayed within this book are created by Scott Rogers and cannot be
reproduced without his permission. © 2010 Scott Rogers
Dude with Sword, Dude with Sword 832, Relic Relic Raider © 2010 Scott Rogers
Raider, Farm Wars © 2010 Scott Rogers Die Zombie Die © 2010 Scott Rogers
The Mighty Bedbug, Grave Robber © 2005 Scott Farm Wars © 2010 Scott Rogers
Rogers The Mighty Bedbug © 2005 Scott Rogers
Dude with Sword © 2010 Scott Rogers Grave Robber © 2005 Scott Rogers
Dude with Sword 2 © 2010 Scott Rogers

-- 4 of 517 --

LeveTI Up!
The Guide to Great Video
Game Design
Scott Rogers
A John Wiley & Sons, Ltd., Publication

-- 5 of 517 --

This edition first published 2010
© 2010 John Wiley & Sons, Ltd
Registered office
John Wiley & Sons Ltd, The Atrium, Southern Gate, Chichester, West Sussex, PO19 8SQ, United Kingdom
For details of our global editorial offices, for customer services and for information about how to apply for
permission to reuse the copyright material in this book please see our website at www.wiley.com.
The right of the author to be identified as the author of this work has been asserted in accordance with the
Copyright, Designs and Patents Act 1988.
All rights reserved. No part of this publication may be reproduced, stored in a retrieval system, or transmitted,
in any form or by any means, electronic, mechanical, photocopying, recording or otherwise, except as
permitted by the UK Copyright, Designs and Patents Act 1988, without the prior permission of the publisher.
Wiley also publishes its books in a variety of electronic formats. Some content that appears in print may not
be available in electronic books.
Designations used by companies to distinguish their products are often claimed as trademarks. All brand
names and product names used in this book are trade names, service marks, trademarks or registered
trademarks of their respective owners. The publisher is not associated with any product or vendor mentioned
in this book. This publication is designed to provide accurate and authoritative information in regard to the
subject matter covered. It is sold on the understanding that the publisher is not engaged in rendering
professional services. If professional advice or other expert assistance is required, the services of a
competent professional should be sought.
Refer to page ii for further copyright information pertaining to the content of this book.
ISBN 978-0-470-68867-0
A catalogue record for this book is available from the British Library.
Set in 10 on 12pt Swiss721BT-Light by Toppan Best-set Premedia Limited
Printed in the US by RR Donnelley

-- 6 of 517 --

To Brenda Lee
who always thought this would make a great book.
I love you.

-- 7 of 517 --

Publisher’s Acknowledgments
Some of the people who helped bring this book to market include the
following:
Editorial and Production
VP Consumer and Technology Publishing Director: Michelle Leete
Associate Director—Book Content Management: Martin Tribe
Associate Publisher: Chris Webb
Assistant Editor: Colleen Goldring
Publishing Assistant: Ellie Scott
Project Editor: Juliet Booker
Content Editor: Céline Durand-Watts
Development/Copy Editor: Gareth Haman
Technical Editor: Noah Stein
Marketing
Senior Marketing Manager: Louise Breinholt
Marketing Executive: Kate Batchelor
Composition Services
Compositor: Toppan Best-set Premedia Limited (HK)
Proof Readers: Sarah Lewis and Gill Whitley
Indexer: Robert Swanson

---

## Sección 2: Foundations & Introduction

-- 8 of 517 --

Contents
Foreword by Danny Bilson xiii
About the Author xiv
Press Start! xv
Acknowledgments: Everything I Learned about Writing a Book xxi
Level 1 Welcome, N00bs! 1
A Brief History of Video Games 4
Game Genres 9
Who Makes this Stuff? 12
Programmer 12
Artist 13
Designer 14
Producer 15
Tester 16
Composer 17
Sound Designer 18
Writer 19
Have You Thought about Publishing? 19
Product Manager 20
Creative Manager 20
Art Director 21
Technical Director 21
And the Rest . . . 21
Level 1’s Universal Truths and Clever Ideas 22

-- 9 of 517 --

viii Contents
Level 2 Ideas 23
Ideas: Where to Get Them and Where to Stick Them 24
What do Gamers Want? 28
Why I Hate “Fun” 30
Brainstorming 31
Breaking Writer’s Block 34
Level 2’s Universal Truths and Clever Ideas 36
Level 3 Writing the Story 37
The Triangle of Weirdness 44
Time to Wrap It Up 48
Creating Characters 50
A Few Pointers on Writing for Kids of All Ages 54
Writing for Licenses 54
Level 3’s Universal Truths and Clever Ideas 56
Level 4 You Can Design a Game, But Can You Do the Paperwork? 57
Writing the GDD, Step 1: The One-Sheet 60
ESRB Ratings 60
Writing the GDD, Step 2: The Ten-Pager 62
The Rule of Threes 63
Ten-Pager Outline 64
The Game Design Document (and the Awful Truth about Writing Them) 72
Gameplay Progression 76
The Beat Chart 77
Above All, Don’t Be a Schmuck 79
Level 4’s Universal Truths and Clever Ideas 81
Level 5 The Three Cs, Part 1—Character 83
Personality: Do We Really Need Another Badass? 85
Let’s Get Personal 88
Finally, We Talk about Gameplay 92
Why Walk When You Can Run? 95
The Art of Doing Nothing 99
Might as Well Jump 100
Hoists and Teeters 104
What Goes Up, Must Fall Down 105
Me and My Shadow 106

-- 10 of 517 --

Contents ix
The Water’s Fine… or Is It? 108
Be Kind to Our Four-Legged Friends 109
Using All of the Parts 110
We Are Not Alone 111
Who Are the People in Your Neighborhood? 116
Level 5’s Universal Truths and Clever Ideas 118
Level 6 The Three Cs, Part 2—Camera 121
Get It Right: Camera Views 121
So You’ve Decided to Not Let the Player Have Control Over
So You’ve Decided to Let the Player Sometimes Have Control
First Person Camera 127
Third Person Camera 130
Giving Up Control 133
So You’ve Decided to Let the Player Control the Camera 133
the Camera 135
Over the Camera 137
Two and a Half D 137
Isometric Camera 138
Top-Down Camera 139
Special Case Cameras 140
Tunnel Vision 141
Camera Shot Guide 141
Camera Angle Guide 145
Camera Movement Guide 146
Other Camera Notes 148
Always Point the Camera to the Objective 149
Never Let the Character Get Out of the Camera’s Sight 150
Multiple Player Cameras 151
Level 6’s Universal Truths and Clever Ideas 153
Level 7 The Three Cs, Part 3—Controls 155
Dance, Monkey, Dance 159
Character or Camera Relative? 164
Shake, Rattle and Roll 166
Level 7’s Universal Truths and Clever Ideas 168

-- 11 of 517 --

x Contents
Level 8 Sign Language—HUD and Icon Design 171
Health Bar 172
Targeting 173
Ammo Gauge 174
Inventory 174
Score 175
Radar/Map 176
Context-Sensitive Prompt 177
The Clean Screen 178
Icon Has Cheezburger? 179
Don’t Get QTE 183
HUDs, and Where to Stick ‘Em 185
There Are Other Screens Than the HUD 187
The Pause that Refreshes 189
A Final Word on Fonts 195
Level 8’s Universal Truths and Clever Ideas 196
Level 9 Everything I Learned about Level Design, I Learned from Level 9 197
The Top 10 Cliché Video Game Themes 200
The Name Game 207
Everything I Learned about Level Design, I Learned from Disneyland 208
The Beat Chart 214
Re-using Re-use 216
The Gary Gygax Memorial Mapping Section 217
The Dave Arnenson Memorial Mapping Section 223
Wrapping Up Mapping 229
Illusional Narrative 232
Gray Matters 233
Leave the Training Level for Last 239
Level 9’s Universal Truths and Clever Ideas 240
Level 10 The Elements of Combat 243
400 Quatloos on the Newcomer! 245
Now You have to Kiss Me 254
On Moving 255
On Guarding 258
State of the Art Bang Bang 261

-- 12 of 517 --

Contents xi
The Best Gun for You 265
Run and Gun 269
Not Just Shooting 271
Dammit Jones, Where Doesn’t It Hurt? 275
Death: What is It Good For? 277
Level 10’s Universal Truths and Clever Ideas 279
Level 11 They All Want You Dead 281
Bring on the Bad Guys 294
I Love Designing Enemies 304
I Hate You to Pieces 314
Non-Enemy Enemies 317
How to Create the World’s Greatest Boss Battle 318
Who’s the Boss? 319
Size Matters 321
Location, Location, Location 326
Why Not to Create the World’s Greatest Boss Battle 327
Level 11’s Universal Truths and Clever Ideas 329
Level 12 The Nuts and Bolts of Mechanics 331
Holy Death Trap! 335
Time to Die 339
The Music of Mechanics 341
A Nice Little Calm Spot 345
Riddle Me This 346
A Short Word on Minigames and Microgames 351
Level 12’s Universal Truths and Clever Ideas 353
Level 13 Now You’re Playing with Power 355
“Love Thy Player” 361
More Wealth Than You Can Imagine! 365
Level 13’s Universal Truths and Clever Ideas 378
Level 14 Multiplayer—the More the Merrier 381
How Many is the Right Number? 385
MMORPGS, or Hell is Other People 386
Level 14’s Universal Truths and Clever Ideas 391

-- 13 of 517 --

xii Contents
Level 15 Some Notes on Music 393
Sounds Like a Game to Me 400
Level 15’s Universal Truths and Clever Ideas 404
Level 16 Cutscenes, or No One’s Gonna Watch ‘Em Anyway 407
How to Write a Screenplay in Eight Easy Steps 410
Level 16’s Universal Truths and Clever Ideas 416
Level 17 And Now the Hard Part 417
No One Cares about Your Stupid Little World 418
Video Games is a Haaaard Business 421
What to Do for an Encore? 425
Level 17’s Universal Truths and Clever Ideas 427
Continue? 429
Bonus Level 1: The One-Sheet Sample 431
Bonus Level 2: The Ten-Page Design Document Sample 435
Bonus Level 3: Game Design Document Template 445
Bonus Level 4: The Medium-Sized List of Story Themes 459
Bonus Level 5: The Big List of Environments 461
Bonus Level 6: Mechanics and Hazards 465
Bonus Level 7: Enemy Design Template 467
Bonus Level 8: Boss Design Template 469
Bonus Level 9: High Concept Pitch Presentation 471
Achievement Unlocked: Exactly Like Making Chili 481
Index 483

---

## Sección 3: Foundations & Introduction

-- 14 of 517 --

Foreword
Scott set out to write a handbook; a general text that any designer can pull
off their shelf or call up on their PC or e- reader when they want to get back
to fundamentals. A sort of Scout Handbook or Farmer’ s Almanac for game
creation. Scott has even included the kind of clear and simple illustrations
you might find in these evergreen texts.
When any team in sports, any military unit, or any human endeavor wants
success, they start in one place: with the basics. How many times have we
heard after a big win, “ It ’s all about fundamentals.” One of those
fundamentals I’ ve found valuable in game design is the concept of “ doing
one thing, well.” Well, Mr. Rogers has done just that with his handbook.
Whether you are starting out as a new designer or are a veteran who’ s stuck
on a difficult problem, pull this handbook off the shelf, get back to the
fundamentals, and I’ ll bet they trigger some inspiration that will take you
beyond.
Danny Bilson
Executive Vice President of Core Games, THQ
February 2010

-- 15 of 517 --

About the Author
After discovering that game designers have more fun, Scott Rogers
embarked on a 16- year-(and counting) career in video games. He has
helped design many successful video games including: Pac -Man World, the
Maximo series, God of War, Drawn to Life series and Darksiders. Scott is
currently a creative manager for THQ and lives just outside nuclear strike
range of Los Angeles with his lovely wife, two children and many, many
action figures.

-- 16 of 517 --

Press Start!
If You Are Anything Like Me …
… then you’ll read the first page of a book before you buy it. I find that if I
like the first page, then I’ ll probably like the whole thing. I have noticed that
many books have an exciting excerpt on the first page in order to grab the
reader ’s interest, such as:
The zombie’s filthy claws clutched hungrily at Jack’ s shirt, even as his blade
split the creature’ s head like a ripe melon. A firm kick to its headless torso
sent it sprawling down the stairs into the greedy mob that surged forward
like a wave. The corpse’s undead brothers and sisters paused their onslaught
until they realized the decapitated body was just dead meat. Their hesitation
gave Jack a second to spare a glance over his shoulder and see that Evelyn
had finally reached the helicopter. Jack braced himself for the oncoming mob.
“Get that thing started! I can ’ t hold them off forever!” he yelled, as he severed
several greedily clutching hands from their wrists. “ But, Jack!” Evelyn screamed
back, frantically flipping switches. “ I don’ t know HOW to fly a helicopter!”
Not that I would ever resort to such cheap tactics in this book. I have also
noticed that some books try to gain respectability by publishing a positive
quote from an industry professional or famous person on their first page:
I learned more from reading the first page of Level Up! The Book of Great Video
Game Design than I learned in working for 25 years in the video game industry!
A very famous game designer1
1 No doubt you are smart enough to have realized that this isn’ t a real quote, because there
isn’ t a very famous game designer. Unless you count Shigeru Miyamoto, the creator of Mario.
Drat! I should have translated the above quote into Japanese!

-- 17 of 517 --

xvi Press Start!
You obviously don’t need someone else to tell you how to make up your
mind. Just by picking up this book, I can tell you are a discriminating
reader. I can also tell you are seeking the straight truth on the creation of
video games. This book will teach you the who, what, where and, most
importantly, how to design video games. If you have an interest in arcade
games, boss fights, chili, deadly traps, ergonomics, fun, giant hydras,
haunted mansions, islands and alleys, jumps, killer bunnies, leitmotifs,
Mexican pizza, non- player characters, one-sheet designs, pitch sessions,
quests, robotic chickens, smart bombs, the triangle of weirdness, un- fun,
violence, whack- a -mole, XXX, Y- axis and zombies, then this is the book
for you.
Before we start, keep in mind that there are many ways to approach game
design. All of them are valid, as long as they can communicate the
designer ’s ideas. The tricks and techniques found in Level Up! are MY
WAYS of creating game design.
Another quick reminder, when I say “ I designed a game” this is an
oversimplification. Video games are created by many, many, many talented
people (you’ll be introduced to them shortly) and to give the impression that
I did all the work myself is not only incorrect but egotistical2. There is no “ I ”
in team3.
The majority of the games I’ ve helped design were single player action
games, so many of the examples found in Level Up! will be skewed towards
that perspective. It’ s just the way I think. But I have also found that most of
the gameplay concepts are transferable to many different genres of games.
It won’ t be too hard for you to translate my advice to your own game, no
matter what the genre.
Another thing before we get started. If you are looking for a single chapter
about gameplay, don’t bother. Because EVERY chapter in this book is about
gameplay. You should be thinking about gameplay all the time and how
things affect the player, even when designing passive elements like
cutscenes and pause screens.
Since you have made it this far, I may as well start by actually telling you
the bad news first. Making video games is very hard work4. I have worked
in video games for over 16 years and on games that have sold millions of
copies.
2 It ’ s a small industry. No one can afford to piss anyone off! Be a nice, hardworking person
and you’ ll go far.
3 Ironically, there is a “ me.”
4 I once hadan employer who would walk the halls of our office muttering how “ video games
are a haaaard business.” I used to laugh at him back then, but I don’ t any more. He was
right.

-- 18 of 517 --

Press Start! xvii
But in that time, I have learned that making video games is also the best job
in the world. It can be thrilling, frustrating, rewarding, nerve- wracking, hectic,
boring, vomit- inducing, and just plain fun.
No, You Can ’ t Have My Job
Over the course of my career, I came up with some Clever Ideas and
learned some Universal Truths. For your convenience, I have added these
at the end of each “ level. ”
I also learned a couple of very important things. You can tell they are
very important because they are written in all bold letters. The first very
important thing I learned was:
GAME DESIGNERS HAVE MORE FUN
I know this, because my first job in the video game industry was as an
artist5. Back in those 16- bit days, video game artists drew images with
pixels. There are several great 16- bit artists, like Paul Robertson and the
teams that made the Metal Slug and classic Capcom fighting games; but
for me, drawing pictures out of pixels is like drawing with bathroom tiles.
Here is what a drawing I made out of pixels looks like:
Anyway, as I was “ pushing pixels” I heard the sound of raucous laughter
coming from the group of cubicles next to mine. I peered over the wall to
see a bunch of video game designers yukking it up and have a good ol’
time. For the record, I was not having a good ol’ time pushing pixels. I
realized, “Those game designers are having more fun than I am! Making
5 Actually we were called “ pixel pushers” and “ sprite monkeys”, neither of which, despite how
cute those terms sound, were ever meant as a compliment.

---

## Sección 4: Foundations & Introduction

-- 19 of 517 --

xviii Press Start!
video games should be fun! I want to have fun! I want to become a game
designer too!” And so I did. I eventually worked my way up the ladder to
become a game designer. After I became a real game designer, I learned
the second very important thing:
NO ONE ON YOUR TEAM WANTS TO READ YOUR DESIGN
This is a horrible thing to discover, but it is something every game designer
needs to hear. Here I was, a brand new game designer with brand new
game designs ready to go, and no one wanted to read any of them! What
was I to do? In order to solve this problem and get my colleagues to read
my design documents, I started drawing them as cartoons. And guess
what? It worked. They conveyed the ideas I wanted to get across to my
team mates. And I’ ve been designing games this way ever since, many of
which have gone on to become top-selling titles. That is why you will find
many cartoons, so you will continue reading and understand the ideas
presented. If you do, then you can apply them to your own design and
become a great designer, too.

-- 20 of 517 --

Press Start! xix
Who Is This Book For?
Why you, of course. Provided you are one of the following people.
A working video games professional. There are lots of books about
video games design, but most of them are full of THEORY, which I have
never found very helpful while making a game. Don’ t get me wrong, theory
is great when you are at a game developers conference or one of those
wine and cheese affairs we game designers always find ourselves at. But
when I am working on a game, with my sleeves rolled up and blood
splattered all over the walls6, I need practical nuts n’ bolts advice on how
to solve any problems I may encounter. I mention this because I assume
that some of you reading Level Up! will be experienced video game
professionals. I hope you find the techniques and tips in this book useful in
your day- to -day work. Not that this book doesn’ t have uses for beginners.
I ’ m talking about you, future video game designers. Remember, one
page ago when I told you I was a pixel pusher? There was a point to that
story, which is I was just like you. Maybe you’ re also an artist who is tired of
hearing the game designers laughing it up over in the other office. Or a
programmer who knows he can design a better enemy encounter than the
knucklehead currently doing it on your game. Or maybe you are a tester
who wants to move up in the world, but you don’ t know how to do it. When I
wanted to become a video game designer, there weren’ t any books on the
subject. We had to learn everything from other game designers. I was lucky
to have a mentor and an opportunity to work as a game designer. If you
don ’t have either of these things, don’ t fret. Read this book; I will be your
mentor. All you need to do is follow my advice, be prepared, and take
advantage of the opportunity when it finally arrives.
This book is also great for students of video game design. Back when I
started making games, I didn’ t take any classes on video game design—
because they didn’ t exist! I just made stuff up as I went along! And I made
a lot of mistakes. This is why I wrote this book: so you can learn from all my
mistakes before they become your mistakes too.
Finally, this book is for anyone who loves video games. I love video
games. I love to play them. I love to make them and I love to read about
making them. If you want to make video games, then you must love them
too. Ironically, I know several people who work in video games that freely
admit they do not like to play video games. That does not make any sense
6 Figurative blood. To my knowledge, no one has died from making a video game.

-- 21 of 517 --

xx Press Start!
to me. Why would you work in video games if you do not love video games?
They are fools. They should just step aside and let someone who loves
video games make video games. Someone like you.
Ready? Great! Let’ s find out how to make games!

-- 22 of 517 --

Acknowledgments:
Everything I Learned About
Writing A Book
I hope you found Level Up! The Guide to Great Video Game Design to be
educational and inspirational. What I’ ve learned is that books don ’ t write
themselves and writers can’t write without support and inspiration from lots
of great people. I couldn’ t have written Level Up! The Guide to Great Video
Game Design without the love, help, and support of the following family and
friends:
Brenda Lee Rogers, Evelyn Rogers, Jack Rogers, Noah Stein, Hardy LeBel,
Dr. Brett Rogers, Jackie Kashian, Danny Bilson, Laddie Ervin, Tim Campbell,
THQ games legal department, Jeremiah Slackza (for requesting the Platform
Primer), mentors William Anderson and David Siller, Mark Rogers, Eric
Williams, George Collins, Scott Frazier (my first test audience), Andy
Ashcraft, Paul Guirao, Tommy Tallarico, Joey Kuras, Ian Sedensky, Evan
Icenbice, Brian Kaiser, Jason Weezner, David O’ Connor, Jaclyn Rogers, Dr.
Christopher Rogers, Patricia Rogers, Anthony Rogers, The GDC selection
committee of 2008, Disneyland’ s original imagineers, the Los Angeles
customizing gang, the editors at John Wiley & Sons, Ltd: Juliet Booker,
Gareth Haman, Katherine Batchelor, Ellie Scott, and most importantly, Chris
Webb for making that call. And special thanks to Cory Doctrow for the
glowing GDC review that kicked all of this off. I owe you a drink, mate.
And a big thank you to YOU for buying this book. Now go and design some
great games! I can’ t wait to play them!

-- 23 of 517 --

-- 24 of 517 --

T
LeveI 1
Welcome, N00bs!
This chapter is written especially for people who are new to video games
and how they are made. If you are not a n00b1, then feel free to skip it.
However you are going to be missing out on a lot of great stuff. Don’ t say
I didn’ t warn you.
Within the academic gaming community, there are many different
definitions for what qualifies as a game. Some scholars insist that “ a
game needs to be a closed formal system that subjectively represents
a subset of reality2. ” Others say that games need to have “ players in
conflict with each other3. ” I think those definitions are trying too hard to
sound smart.
Games, while complex, are often simpler than that. Bernard Suits4 wrote
that “playing a game is a voluntary effort to overcome unnecessary
obstacles. ” This is a pretty amusing definition, but still a bit too scholarly
for my taste. Let’ s keep things simple. Let’ s consider hand ball. You only
need one player for hand ball— where ’s the other players to be in conflict
with? Bouncing a ball against a wall without missing it is hardly a
metaphor for reality; unless you lead a very boring life. Let’ s face it,
sometimes a ball bouncing against a wall is just a ball bouncing against
a wall.
1 A n00b is short for “newbie”, or someone who is new to a game. While the term predates
the Internet, it became popular with MO communities. Not a particularly flattering term, as
it implies inexperience and/or ignorance: only a real n00b would read a footnote defining
what a n00b is!
2 “What is a Game?”, Chris Crawford in The Art of Computer Game Design, 1982.
3 “What is a Game?”, Kevin Langdon in The New Thesaurus, 1979.
4 The Grasshopper: Games, Life and Utopia, Bernard Suits, 1978.

---

## Sección 5: Foundations & Introduction

-- 25 of 517 --

2 LEVEL 1 Welcome, N00bs!
Playing hand ball may therefore seem like a time- waster, but a time- waster
becomes a game when you add rules and an objective. A rule may be to
throw the ball with your right hand and catch it with your left, or to not drop
the ball. A victory condition could be that you have to catch the ball ten
times in a row. A failure state would be if you violated any of the rules or
victory conditions. Once those criteria have been met, you have created a
game. Ironically, while simple, hand ball was enough of a game to inspire
the creators of one of the earliest video games: Tennis for Two.

-- 26 of 517 --

3 Welcome, N00bs!
So, let’s ask this basic question:
Q: What is a game?
A: A game is an activity that:
• requires at least one player
• has rules
• has a victory condition.
That ’s pretty much it.
Now that you know what a game is, let’ s ask:
Q: What is a video game?
A: A video game is a game that is played on a video screen.
Sure, you can start complicating the definition and add requirements about
devices, peripherals, control schemes, player metrics, boss fights, and
zombies (and don’ t worry; we’ ll tackle these things soon enough). But by
my reckoning, that is pretty much as simple as it gets.
Oh, there’s one other thing to consider at this early stage. The game’ s
objective. You should be able to sum a game’ s objectives up quickly and
clearly. If you can’ t, you’ve got a problem.
Danny Bilson, THQ’ s EVP of Core Games, has a great rule of thumb about
a game’s objective. He says that you should be able to sum up the game’ s
objectives as easily as those old Milton Bradley board games did on the
front of their box. Check out these examples taken from real game boxes:
Battleship: sink all of your opponent ’ s ships.
Operation: successful operations earn “ Money. ” Failures set off alarms.
Mouse Trap: player turns the crank which rotates gears causing lever
to move and push the stop sign against shoe. Shoe tips bucket holding
metal ball. Ball rolls down rickety stairs and into rain pipe which leads
it to hit helping hand rod. This causes bowling ball to fall from top of
helping hand rod through thing- a - ma -jig and bathtub to land on diving
board. Weight of bowling ball catapults diver through the air and right into
wash tub causing cage to fall from top of post and trap unsuspecting
mouse.
Ok, so maybe not with that last one. The lesson is, you need to keep
your game objectives simple. Speaking of simple games, let’ s take a
moment to travel back to the dawn of video games. They had to start
somewhere, right?

-- 27 of 517 --

4 LEVEL 1 Welcome, N00bs!
A Brief History of Video Games
The 1950s. The dawn of television, 3- D movies, and rock ‘ n ’ roll. Video
games were invented in the 1950s too, only they were played by a very few
people on very large computers. The first video game programmers were
students in the computer labs of large universities like MIT and employees
of military facilities at Brookhaven National Laboratories. Early games like
OXO (1952), Spacewar! (1962), and Colossal Cave (1976) had very simple
or even no graphics at all. They were displayed on very small black and
white oscilloscope screens.
After playing Spacewar! at the University of Utah’ s computer lab, future
Atari founders Ted Dabney and Nolan Bushnell were inspired to create
Computer Space, the first arcade video game, in 1971. While (despite the
name) the first arcade games could be found in bars, arcades dedicated to
video games began appearing by the late 1970s.

-- 28 of 517 --

5 A Brief History of Video Games
Early arcade games like Asteroids, Battlezone, and Star Castle were
rendered in vector graphics (images constructed from lines). After color
raster graphics (images constructed from a grid of dots called pixels) were
introduced, cartoon-inspired video game characters appeared. Characters
like Pac- Man (Namco, 1980) and Donkey Kong (Nintendo, 1982) became
pop culture icons virtually overnight.
During the early 1980s, three styles of game machines dominated arcades:
uprights (cabinets which the player stood in front of while they played), cocktail
tables (arcade games set into the top of a small table, allowing the player to
sit down while playing), and cockpits (elaborate game cabinets that allowed
the player to lean or sit down to further enhance the gaming experience).
In the mid- 1980s, arcades began springing up everywhere and video games
took the world by storm. Game genres and themes became more varied,
while gaming controls and cabinets became more elaborate with realistic
controllers and beautiful graphics decorating uniquely designed cabinets.
You could sit back- to -back in a two- player spaceship cockpit while playing
Tail Gunner (Vectorbeam, 1979), battle Klingons from a replica of Captain
Kirk ’ s command chair in Star Trek (Sega, 1982) or drive in an actual Ferrari
Testarossa that moved and shook in Out Run (Sega, 1986). By the late
1990s, many arcade games started to resemble mini theme- park rides
complete with rideable race horses, gyroscopically- moving virtual simulators
and fighting booths that allowed players to battle virtual foes using actual
punches and kicks. The most elaborate of these arcades was Virtual World’ s
BattleTech Centers; steampunk- themed arcades with linked “ battle pods5”
5 In the mid-1990s, I had the pleasure of going to a BattleTech Center on several occasions. The
battle pods were a video gamer’s dream come true. The player sat in a photo booth-sized cockpit.
Dual control joysticks and foot pedals operated the mech’s movement. Triggers and thumb switches
fired the arsenal of weapons. Surrounding the pod’s video monitor were banks of dipswitches—
each one actually having a function within the game from activating tracking devices to venting
overheating weapons. It took at least one gaming session (about a half hour) just to learn what all
the switches did! It was as realistic a gaming experience as I’ve ever had.

---

## Sección 6: Foundations & Introduction

-- 29 of 517 --

6 LEVEL 1 Welcome, N00bs!
that allowed 8 players to fight each other while stomping around in giant
virtual “ mechs. ”
These elaborate arcade games required lots of floor space and were
very expensive to maintain. In the late 1990s, home systems began to rival
and eventually surpassed the graphics seen in most arcade games.
Arcades went out of business by the dozens. The video games became
replaced with more lucrative redemption machines6 and games of skill
like skeeball. With the liquidation of arcades, many cabinets ended up in
the hands of private collectors. The golden age of video game arcades
was over.
Most recently, arcades have become social and virtual experiences. LAN
gaming centers combine retail and social space to allow players to play
computer and console games on a per-hour basis. Many have upgraded
to feature large- scale gaming experiences held in movie theater- sized
venues. Internet cafes are similar to LAN centers but with an emphasis on
cultivating a café -style environment.
Social gaming has also expanded in another direction. Companies such as
Disney and the Sally Corporation have started merging traditional
amusement dark rides7 with gameplay to create new arcade- style
experiences. For example, Toy Story Midway Mania at Disney’ s California
Adventure (2008) whisks a four- player cart past a succession of giant
video screens where players compete in a variety of carnival-style shooting
games. Players are sprayed with air and water to simulate different visual
effects in the game. The circle of modern arcade gaming and home
gaming has come full circle with the release of a Wii version of the Toy Story
Midway Mania attraction.
Who knows? Perhaps these new attractions will become the backbone of a
new hybrid arcade/amusement park filled with virtual games and interactive
dark rides.
6 Redemption machines are those claw catcher “games” you see in American toy stores and
supermarkets. Personally, I would rather play the lottery than try my luck with one of these
vending machines, which are rigged to (almost) guarantee you to lose. However, if you are ever
in Japan, I recommend playing them as they are winnable and are usually stocked with some
very cool toys and prizes.
7 A “ dark ride” is an amusement park attraction that has guests ride past scenes of (usually)
audio- animatronic characters. Famous examples of dark rides include Disneyland’ s Pirates of
the Caribbean and Haunted Mansion.

-- 30 of 517 --

7 A Brief History of Video Games
A console is a gaming platform that can be used in the home. A
microprocessor runs the electronic device, which sends a video display
signal to the user’ s TV set or monitor8. Unlike the dedicated controllers of an
arcade machine, a home console controller has enough buttons, triggers,
and analog controls to allow for a variety of games to be played. And unlike
the dedicated motherboards in early arcade games, which could only hold
one game, console games use cartridge, CD, and DVD media to allow
players to quickly change games. From the late 1970s onwards, there have
been many home consoles. Some of the more popular and/or well known
previous generation ones include the Atari 2600 and Jaguar, the Mattel
Intellivision, the Colecovision, the Nintendo Entertainment System and Super
Nintendo, the Sega Genesis and Dreamcast, and the 3DO interactive player.
Current consoles such as the Playstation 3, Xbox 360, and Nintendo Wii
continue to bring gaming into the homes of millions of gamers worldwide.
Like arcade games, handheld games have a visual display, a processor,
and controller, but are small enough to fit in the hands of the player. The
first handheld titles were dedicated to only one game per unit. Auto Race
(Mattel Electronics, 1976) used a digital display while the Game & Watch
series (Nintendo, 1980) featured a more appealing liquid crystal display.
8 One console exception is the wonderful Vectrex portable game system (Smith Engineering,
1982). The Vectrex’ s processor, screen, controller and even one game were all in a self
contained, portable system.

-- 31 of 517 --

8 LEVEL 1 Welcome, N00bs!
Microvision (Milton Bradley, 1979) was one of the earliest handheld
systems to have switchable cartridges. Handheld gaming took off when
Tetris became a phenomenon on the Gameboy (Nintendo, 1989), the
forerunner of the Nintendo DS9. Recent handheld systems have become
quite powerful. The Sony PSP’s processor can run the equivalent of a
Playstation One game. That’ s quite a jump since the digital blips of
Mattel Football!
Handheld gaming, particularly on mobile devices, is becoming more
and more popular. Games for cellular phones are quick and less
expensive to make. In a few short years, the number of mobile game
developers has exploded. Are these mobile games and devices the future
of gaming?
As personal computers (or PCs) became popular in the late 1970s, both
video game programming and video game playing became more common.
An entire generation of game developers started off in their bedrooms,
programming games on their PCs. These early games were stored on tape
drives and floppy discs. While early computer video games attempted to
emulate games found at arcades, the addition of the keyboard allowed
greater user input, giving rise to unique game genres including the text
adventure game. Longer periods of time spent at the computer also meant
longer gaming experiences and simulations; construction and management
and strategy games started to become popular. As the computer hardware,
memory, and storage evolved to CD and DVD media, computer games
became more detailed, more involved, and more complex. The rise of the
first person shooter (or FPS) can be attributed to the popularity of the
mouse controller. By the mid- 1990s the computer was the ultimate
gaming platform. Several gaming genres, particularly strategy, FPSs, and
massively multiplayer online games (or MMOs) remain very strong on
the computer platform.
9 Not ironically, the Nintendo DS bears several design semblances to the original Game &
Watch series devices.

---

## Sección 7: Foundations & Introduction

-- 32 of 517 --

9 Game Genres
Game Genres
Over the years, gaming has splintered off into many different genres and
subgenres. A game genre is used to describe the style of gameplay.
Action: games that require hand/eye coordination to play. The action genre
has several subgenres:
• Action - adventure— this combination of genres features an emphasis
on item collection and usage, puzzle solving, and long- term story
related goals. Examples: the Prince of Persia and Tomb Raider series.
• Action - arcade— any game presented in the style of early arcade
games with an emphasis on “ twitch ” gameplay, scoring, and short
play time. Examples: Dig Dug, Diner Dash.
• Platformer—a platform game often features a mascot character
jumping (or swinging or bouncing) through challenging “ platform ”
environments. Shooting and fighting may also be involved. At one
time, the platformer was the most popular subgenre in gaming.
Examples: Nintendo’s Mario titles (Super Mario World, Mario 64, and
Super Mario Galaxy).
• Stealth— an action game with an emphasis on avoiding enemies
rather than directly fighting them. Examples: the Metal Gear series
and Thief: The Dark Project.
• Fighting— a game where two or more opponents battle in arena
settings. Fighting games are distinguished from action games for the
depth of their player controls. Examples: the Street Fighter series and
the Mortal Kombat series.
• Beat ‘em up/hack ‘ n ’ slash— these games have players battle
against wave after wave of enemies increasing in difficulty. Examples:
Double Dragon, Castle Crashers.
Shooter: shooters focus primarily on firing projectiles at enemies. While
fast- paced and “ twitch ” oriented, like action games, this genre has evolved
to include several subgenres that are distinguished by their camera view:
• First person shooter—a shooter as seen from the player’s perspective.
The tighter camera view is more limiting but more personal than in a
third person shooter. Examples: Quake, Team Fortress 2.
• Shoot ‘em up— shoot ‘ em ups (or shmups for short) are arcade- style
shooters where players shoot large quantities of enemies while
avoiding hazards. The player’s avatar in a shmup is usually a vehicle
(such as a spaceship) rather than a character. They can be presented
from several different camera angles. Examples: Space Invaders, the
Contra series.

-- 33 of 517 --

10 LEVEL 1 Welcome, N00bs!
• Third person shooter (TPS)—a shooter where the camera is placed
further behind the player, allowing for a partial or full view of the
player ’s character and their surroundings. Despite the wider view, the
emphasis on gameplay remains on shooting. Examples: the Star Wars
Battlefront and Grand Theft Auto series.
Adventure: adventure games focus on puzzle solving, and item collection
and inventory management. Early adventure games were solely text based.
Examples: Colossal Cave, the King ’s Quest, and Leisure Suit Larry series.
• Graphical adventure—this subgenre has players use a mouse or
cursor to click to uncover clues and navigate around. Examples: Myst,
Monkey Island, and the Sam and Max series.
• Role - playing game (RPG)— this subgenre is based on pen and
paper role-playing games like Dungeons and Dragons. Players
choose a character class and increase their statistical abilities
through combat, exploration, and treasure finding. Characters
can either be specific characters or generic character classes.
Examples: Star Wars: Knights of the Old Republic and the Mass
Effect series.
• Massively multiplayer online role-playing game (MMORPG)—
an RPG that can support hundreds of players together in one
environment. MMORPGs are known for player vs player gameplay,
repetitive gameplay or “ grinding ”, and group battles or “ raids. ”
Examples: World of Warcraft, DC Universe Online.
• Survival/horror—players attempt to survive a horror scenario with
limited resources, such as sparse ammunition. Examples: the
Resident Evil series, the Silent Hill series.
Construction/management: this genre has players build and expand a
location with limited resources. They can be based on stories or “ toys. ”
SimCity and Zoo Tycoon are examples of this genre.
Life simulation: similar to the management genre, but revolving around
building and nurturing relationships with artificial life forms. The Sims and
Princess Maker titles are both life simulators.
• Pet simulation— based on the Tamagotchi digital pet pocket games,
though often now much expanded, pet simulators revolve around
nurturing animals through feeding and relationships. World of Zoo is
an example of this.
Music/rhythm: the player tries to match a rhythm or beat to score
points. They can be as simple as the game Simon or as complex as Rock
Band.
Party: party games are specifically designed for multiple players and are
based on competitive play. More often than not, gameplay is presented in
the minigame format. Examples: Mario Party and Buzz!

-- 34 of 517 --

Game Genres 11
Puzzle: puzzle games are based on logic and pattern completion. They
can be slow, methodical or use hand/eye coordination. Examples: The
Incredible Machine or Tetris.
Sports: these are games based on athletic competitions, whether they are
traditional or extreme. It is common to see annual versions of these titles.
Examples: the Madden series, the Tony Hawk series.
• Sports management—rather than directly playing the sport, players
manage players or teams. Examples: the FIFA Manager series, the
NFL Head Coach series.
Strategy: from chess to Sid Meir’ s Civilization, thinking and planning are the
hallmarks of strategy games. They take place in both historical and fictitious
settings.
• Real time strategy (RTS)—similar to turn- based games, these
faster-paced games focus on the “four X’ s ” : expansion, exploration,
exploitation, and extermination. RTS has become the dominant
strategy subgenre. Examples: Command and Conquer series, the
Dawn of War series.
• Turn - based — the slower pace of these games allows players time to
think, providing more opportunity for strategy to be employed.
Examples: the X- Com series, the Advance Wars series.
• Tower defense— a relatively new subgenre on PC and handheld
systems where players create automated projectile- shooting “ towers ”
that keep enemies at bay. Examples: Defense Grid: The Awakening,
Lock ’ s Quest.
Vehicle simulation: players simulate piloting/driving a vehicle, from a
sports car to a spaceship. Emphasis is placed on making the experience
as “ real ” as possible. Examples: Lunar Lander, Densha de Go! 64.
• Driving— players race and upgrade vehicles, from motorcycles to
hovercrafts. Driving games can be ultra-realistic experiences or more
action oriented. Examples: the Gran Turismo series, the NASCAR
Racing series, Wave Race and SSX.
• Flying—players pilot aircraft either for the pleasure of flying as in the
Microsoft Flight Simulator series or into combat as seen in the Ace
Combat and Blazing Angels series. You can even fly into outer space
as in Starfox and the X-Wing/TIE Fighter series.
This list of genres and subgenres attempts to scratch the surface. Adult
games, serious games, advert games, and vehicular combat are other
classifications that fit within several of the genres above. As games combine
several genres and subgenres, new ones are constantly being created. For
example, the Grand Theft Auto series now combines action- adventure, third
person shooter, driving, life simulation, and action- arcade genres into one

---

## Sección 8: Foundations & Introduction

-- 35 of 517 --

12 LEVEL 1 Welcome, N00bs!
game! Tuper Tario Tros.10 seamly combines Super Mario Bros. and Tetris!
What ’s next? What will be the most popular game genre in the future? Who
knows? Perhaps you will create it!
Who Makes this Stuff?
Just as there are many types of games, there are many types of people who
make them. In the early days of video game development, games were
initially created by individuals; one example is the original Prince of Persia,
which was made by one person11 programming, designing and animating
the entire game. He even composed the game’ s music! Teams eventually
became bigger as commercial video game development became serious
and games required two or three programmers to make.
Artists joined development teams as players began to demand better
looking games. Games were initially designed by whichever team member
had the good idea. Finally, when game content became too involved to do
alone, a dedicated design position was created. While team members on
current teams can still wear many hats, specialization is becoming
increasingly necessary as games become bigger, more complex, and take
longer to make.
Video game teams that produce games are known as developers or
development teams. They are similar to a production team that makes a
movie or TV show— several creative people all working together to create
entertainment. An average production team includes numerous members,
as outlined in the following sections.
Programmer
Using programming languages such as C++ and Java, a programmer
writes the code that allows a game’ s text and graphics to be displayed,
develops the control systems that allow a player to interact with the
game, creates the camera system that allows the player to view the game
world, programs the physics system that affects the player and game world,
writes the AI system that controls enemies and object scripting … you get
the idea.
10 You can play Tuper Tario Tros. by Swing Swing Submarine at http://www.newgrounds.com/
portal/view/522276.
11 The one-man development team in question is Jordan Mechner.

-- 36 of 517 --

13 Who Makes this Stuff?
One programmer may work exclusively on
tools to help team members build the game
more efficiently. Another programmer may
write code to simulate real- world physics
making water look realistic or develop inverse
kinetics for characters. They may even work
solely on sound tools to play music and
effects.
Like many of the jobs in the game industry,
programming jobs are becoming more
specialized. Regardless of the position, a
programmer needs to have an excellent
understanding of mathematics, 2- D and 3- D
graphics, physics, particle systems, user
interface, artificial intelligence, input devices,
and computer networking. These skills are
always in high demand and some
programmers make a good living as contractors, moving from project to
project as “hired guns”, writing code and providing temporary solutions to
beleaguered teams.
Artist
In the early days of video games, programmers
created all a game’ s art. Because that early art
was so blocky and crude, we now call placeholder
game art “programmer art12. ” Thank goodness real
artists came along. One of the first artists working
in video games was Shigeru Miyamoto, who
created Mario and Donkey Kong. He was able to
create memorable cartoon characters with an 8- bit
CPU using only 2-bit pixels. That’ s a lot of
personality per pixel! There were a few exceptions
in the early days, such as Dragon ’s Lair
(Cinematronics, 1983) and Space Ace
(Cinematronics, 1984), beautifully animated games
created by ex- Disney animators like Don Bluth, but
those games were rare exceptions because they
employed laser discs to play the video footage.
Eventually, new, better hardware with more
12 I apologize to any programmers reading this, but I didn’ t make this term up.

-- 37 of 517 --

14 LEVEL 1 Welcome, N00bs!
memory, color depth and the ability to display larger graphics meant artists
could create more detailed images, backgrounds and characters like those
seen in beautifully hand- drawn and animated games such as Darkstalkers
(Capcom, 1994) and Metal Slug (SNK, 1996).
As high- end computer software became more affordable to developers,
3 -D graphics, which had been limited to movies like Tron (Disney, 1982) and
Pixar ’ s animated shorts like Luxo Jr. (1986), began appearing in games.
Myst (Broderbund, 1993) and Donkey Kong Country (Nintendo, 1994) used
prerendered 3-D graphics. True 3- D graphics had been in arcade games as
early as Battlezone (Atari, 1980), but when the Playstation arrived in 1994,
game developers became inspired to use 3- D to create more realistic
worlds and characters for home consoles.
Just like with programming, video game art has become a specialized job.
A concept artist uses both traditional medium and computers to draw
game characters, worlds, and enemies. Storyboard artists illustrate the
game ’ s cinematics and sometimes elements of gameplay design to be
passed along to other artists and animators. 3 -D Modelers and
environmental artists build characters and environments using programs
such as Maya and 3D Studio Max. Texture artists literally paint surfaces
onto 3-D models and locations. Visual effects artists create spectacular
visual effects using a combination of 2- D and 3- D art. A user interface (UI)
artist designs icons and elements that are used in the game’s interface and
HUD. Animators animate the player character and create cutscenes exactly
like they do in big budget animated movies. Technical artists help every
artist on the team by doing a variety of tasks, including rigging models to
allow animators to move them and teaching fellow artists the latest tools
and technology. The art director supervises the work of all the artists while
maintaining the artistic vision for the entire project. Regardless of what kind
of art position you are interested in, make sure you study the basics and
keep drawing!
Designer
Director, planner, producer13, lead designer, or senior game designer— no
matter what the job title is, the designer’ s role is the same: create the ideas
and rules that comprise a game. A game designer needs to possess
13 There’ s more to a producer’s job than game design and in some cases, a producer doesn’ t
even design the game. But what are you doing skipping ahead anyway?

---

## Sección 9: Foundations & Introduction

-- 38 of 517 --

15 Who Makes this Stuff?
many, many skills14, least of which is to love to
play games. As a game designer, you should be
able to tell the difference between a good and
bad game and, more importantly, communicate
why. Remember, “ because it sucks” is never an
acceptable answer.
Just like with programmers and artists, design is
becoming a specialized profession. Level
designers create paper maps, build “grey box”
worlds using 3-D programs, and populate the
levels with everything from enemies to treasure.
System designers develop how the game
elements relate to one another, whether it is the
game ’s economy or technology tree. Scripters
use tools to write code that allow things to
happen within the game, from springing a trap to
choreographing a camera movement. Combat
designers specialize in player vs enemy combat
and “ balancing ” the player’ s experience. The
creative director maintains the vision of the
game while supervising the other designers; often
offering suggestions for improving their work.
There is one other task that a designer is responsible for: that the game is
“ fun. ” However, I will leave this can of worms unopened until later in the
book. I hope you can stand the suspense.
Producer
Overseeing the entire game development team is a producer.
Originally, producers were designers who also managed the work of their
team members. A producer’ s role has expanded dramatically over the
years.
The producer’ s responsibilities include hiring and building teams, writing
contracts, contributing to the game’ s design, managing the team’ s work
schedule, balancing the game’ s budget, resolving disputes between
14 According to Jesse Schell in his book The Art of Game Design (Morgan Kaufmann, 2008),
a “well- rounded” game designer understands animation, anthropology, architecture,
brainstorming, business, cinematography, communication, creative writing, economics,
engineering, history, management, mathematics, music, psychology, public speaking, sound
design, technical writing, and visual arts. I think it’ s a pretty accurate list.

-- 39 of 517 --

16 LEVEL 1 Welcome, N00bs!
creative and programming leads, acting as
the team representative to upper
management and publishers, coordinating
the creation of outside resources such as
art, music and cutscenes, and arranging
testing and localization. Producers are
usually the first team member on and
the last team member off of a game’ s
production. More often than not, you
will find producers acting as the public
face of the game; talking to the press
and public about the game they are
managing15.
Because there are many things for a
producer to do, often you will find assistant
and associate producers helping out with
day- to -day tasks. Sometimes the task can
be as “ trivial ” as ordering dinner for a team
that is working late. Believe it or not, some
of those “ menial ” chores are some of the
most important that a producer can provide
to a team.
Regardless of how helpful producers can be, some development studios
consider producers to be an unnecessary part of development. Others feel
that producers should not have any creative control, just manage the
game ’ s production and schedule. As with designers, the role and influence
of a producer varies wildly across the industry.
Tester
Do you like to play games? Do you like to play games over and over? Do
you like to play the same level over and over and over and over and over
and over and over and over again? Then testing is for you!
While testers work long hours, work in cramped environments, and have to
play games to a degree that many would classify as mind-numbingly boring,
being a tester requires more skills than you may think. A good tester has
patience, persistence, and great communication skills to report back any
15 Producers often end up as the “ face of the game” because they are the one team member
that can keep all of the moving parts straight!

-- 40 of 517 --

17 Who Makes this Stuff?
problems (or “bugs”) they find in the
game. It’ s not a glamorous job, but
without testers, we would be plagued
with games that crash upon loading,
have crappy cameras, broken combat
systems, and unfair difficulty balances.
Quality assurance (or QA)16 is crucial
to the successful completion of a
game. Publishers hold games to a
rigorous standard of quality so the
game that you buy is (mostly) bug free.
That standard can only be met by
thoroughly testing a game for weeks, if
not months. Only once it has passed muster with the QA department is a
game truly ready to be released to the public.
Testing is a great gateway job position for newcomers to the game industry,
I have seen testers go on to become designers, artists, producers, and
even heads of studios. You can find out a lot about games in a short time
by working as a tester. Testers prevent games from sucking. Remember
that the next time you think about making fun of a tester.
Composer
In the earliest days of video games, music was nothing more than crude
beeps and bloops to accompany the game’ s action. But how many of you
can still hum the music to The Legend of Zelda or the Super Mario Bros.
theme?
Music is extremely important to the gaming experience, and a composer
creates that music. Most modern composers create their music on a
keyboard or synthesizer, as they can be used to simulate any musical
instrument. As sound technology has improved, many composers have
created actual “ live ” and orchestral pieces; this requires a whole new set of
skills, including conducting an orchestra. I won’t even pretend to know how
to do that— I have no idea what all that baton waving means!
Home versions of modern audio software are powerful enough to mix and
master professional - sounding samples. If you want to become a composer,
then write some music, record it, and get your samples into the hands of a
game producer. As someone who has reviewed lots and lots of composers ’
16 Quality assurance is just a fancy way of saying “ test department.”

---

## Sección 10: Foundations & Introduction

-- 41 of 517 --

18 LEVEL 1 Welcome, N00bs!
audio resumes, I can tell you it goes something like this: the designer has a
specific idea for the style or feel of music in his mind. If your music sample
matches what the designer wants, then they will contact you for the job.
What matters most is that your music is unique and fits the needs of the
game. Look at the success of a movie score composer like Danny Elfman. He
composed very distinct music for Beetlejuice and Pee Wee ’ s Big Adventure,
and soon everyone wanted his style of music in their own movies.
Writing music for games is somewhat different than writing music for
movies. Most game themes are either very short or have to repeat over and
over again. Being able to compose powerful and exciting music with these
limitations in mind will make your music more appealing than someone who
just writes “ songs17. ” Don’t worry, I’ ll cover more about music in Level 15.
Sound designer
Unlike a composer who creates the music for a game, the sound designer
creates all the sound effects that are used in a game. Go ahead and fire up
a game, turn off the sound and try playing it. Do you notice that the game
just isn’ t the same without sound effects? Often, there is a lot of information
that is delivered to the player via sound. These audio cues are the sound
designer ’s responsibility to create.
Personally, I think sound design is a lot of fun. Games tend to come to life
once sound is added to them. That is why it is important to even have
placeholder sound effects. Mixing and blending sounds to create something
no one has ever heard before is pretty cool. However, a good sound designer
needs to understand the game he is working on and how to create sounds
that help the player with the game. Some sound effects need to sound
“ positive ” to encourage the player that they are doing something right or
collecting something good. Other sounds warn players of danger or possible
bad choices. A sound designer can make a sound effect sound happy,
deadly, scary, or like a big pile of treasure. Or sometimes all the above!
If you want to be a sound designer, you also need to take direction from
people who may or may not know what they want. For example, see if you
can create a sound effect based on the following description: “ I need this
creature to sound like a phlegmy cougar from hell … but make it sound
more shriek- ey than growl- y18. ” Did you do it? Congratulations! You are now
ready to be a sound designer.
17 Don’ t let that comment cause you despair, songwriters. There are still plenty of games that
use traditional songs; in particular, sport and rhythm games.
18 Sadly, yes: this was an actual direction to a sound designer. And yet, he still delivered a
great sound effect.

-- 42 of 517 --

19 Have You Thought about Publishing?
Writer
Unlike Hollywood, where writers come up with the initial ideas for a movie,
video game writers are usually hired pretty late in the game’ s production
process. If you want to be the “idea guy” then I suggest sticking to game
design.
That ’s not to say that writers don’ t contribute to games. However, a writer is
not usually a full- time team position. Most likely they are a freelancer who is
brought into the game’ s production for one of the following reasons:
• To rewrite the design team’ s story into something that makes sense
once everyone on the team realizes that it is drivel.
• To write dialogue for the game characters and cutscenes once everyone
on the team realizes that writing good dialogue is actually hard to do.
• To make elements in the game clearer to understand, as in the case of
instructional or directional prompts.
• To write the games manual and any fictional support material, such as
character biographies, that will appear on the publisher’s website.
• To add some “star power” to the back of the box. This comes and goes
depending on how important the game industry is feeling about the
worth of “name writers” at the time.
The upside of being a writer in the game industry is that there is usually
plenty of work, as long as you don’ t mind doing different writing jobs and
working for different companies. If you want to be a game writer, you
obviously need to know how to write, use proper grammar, and know
how to write in screenplay format. But the most important thing to know is
how to write for video games. They are very different than writing a book
or movie. Fortunately, this book has a whole chapter19 on how to do this.
Good thing you are reading it!
Well, now you know all the different employment possibilities in video
games, right? Wrong! People don’ t generally know this, but there is a
second career path in video games: publishing.
Have You Thought about Publishing?
Publishers provide the funding for game development teams, manage the
game ’s production, handle any legal issues, manufacture the game, and
19 Level 3, to be exact.

-- 43 of 517 --

20 LEVEL 1 Welcome, N00bs!
provide public relations and marketing for the game. They even handle
distribution of the finished product. Here are some of the more common
positions found in publishing:
Product Manager
Much like a game producer, a product manager works with the
development team and manages them based on the agreed production
schedule. They help determine production priorities for the game’ s
production, act as an intermediary between the studio and the publisher’ s
legal department, review and approve milestones, and make payments
to the studio. They also work with the ESRB20 to secure a rating for
the game.
At some publishers, the product manager has extensive say in the game’ s
content. At others, the product manager is there to make sure the game’ s
development goes smoothly. All I know is, I’m glad I’ m not the one making
the schedule.
Creative Manager
When people ask me what I do as a creative manager for THQ, I tell them
“ I have the job that people think of when they think of working in video
games. ” To be honest, working as a creative manager isn’ t just “ thinking up
and playing games all day.” But sometimes it is.
Creative managers are usually game designers or writers who are working in
publishing. Like product managers, a creative manager’ s involvement on a
game can vary from publisher to publisher. In my own experience I have
worked with teams to create and develop games, written game pitches, and
worked with licensors to create game concepts. One of my most common
responsibilities is to play game builds21 and make sure that they remain true
to the core idea and are “ fun. ”
The best benefit a creative manager can provide is what I call the
“thousand foot view” (as in looking down on the game from a thousand
feet in the air, not looking at thousands of feet!); an unbiased viewpoint
on a game that can help root out weakness in the game’ s design and
construction. When they aren’ t solid I need to provide the team clear
20 ESRB stands for the Entertainment Software Ratings Board, an organization that
determines a game’ s rating (in the US, at least).
21 A “build” (or a “ burn” ) is an in-progress version of the game that can be played either on
a computer or a special console.

---

## Sección 11: Foundations & Introduction

-- 44 of 517 --

21 Have You Thought about Publishing?
feedback on how gameplay can be improved or give advice on how the
team can explore another creative direction.
Creative managers also work with marketing and public relation departments
to provide press materials to make sure a game is shown in the very best
light.
Art Director
An art director is similar to a creative manager, but only deals with the
game ’s art. Art directors can help a team create a visual style for their game
and take their game in directions that weren’ t previously considered by the
team. An art director can help the team globalize the visual language of their
game to make it clear to the player. Art directors also work with the
marketing teams to create packaging materials (such as the cover of a
game ’s box) or wrangle assets that are needed to publicize the game.
Technical Director
A technical director comes from a programming background. They review
and recommend tools and software to teams to help them work more
efficiently. They provide technical support and advice when there are
deficiencies in a team’ s programming staff. They also help perform due
diligence on a new team to help assess whether they can actually make
the game they are being hired to make.
And the rest . . .
There are other publishing positions that aren’ t directly involved in making
games, but are important to creating and selling a game nonetheless.
Business development staff build relationships with studios, hold game
pitch meetings and review prospective game demos. They make deals
with external studios and find emerging studios to acquire. If you ever own
a gaming studio, odds are you’ ll meet a lot of business developers. A
lawyer negotiates all the contracts and makes sure the production team
isn ’t creating content that will get the publisher into any legal trouble.
A brand manager creates the marketing strategy to promote and advertise
a game. They develop print material such as manuals and box covers. A
public relations manager talks to gaming magazines and organizes press
events to show the game off in the best possible light. A quality assurance
manager runs the test department, organizing and relaying the bug sheets
back to the developer.

-- 45 of 517 --

22 LEVEL 1 Welcome, N00bs!
In addition to production and publishing, there are many others who interact
with development teams and publishers. A talent recruiter searches for
new talent and helps get them employment with developers and publishers,
game reviewers play the games before they come out and write reviews
and interviews for magazines and online sites, and licensors work for major
entertainment companies to make sure their brands are properly
represented in games based on their properties.
As you can see, there are plenty of options if you want a career in games.
But I say forget all those other jobs. You want to find out how to make great
game designs, right? Trust me, game design is where the real fun is!
But to make great games, you need great ideas. Where do you get great
ideas? Let’ s find out!
Level 1’ s Universal Truths and Clever Ideas:
• A game is an activity with rules and a victory condition.
• Your game objective should be simple, like that of a
1950s board game.
• Game genres come in all shapes and sizes. Don’ t be afraid
to mix and match.
• Gaming technology is always improving. Adapt or get
left behind.
• It takes all kinds of people to make video games.

-- 46 of 517 --

T
LeveI 2
Ideas
Let ’s talk about making video games. To most people, making a video
game is a mystery. The average party conversation goes like this:
At this point in the conversation I then tell people that games are made by
elves. All I have to do is leave a game design idea in the middle of the room
overnight and in the morning the elves have made the game1.
OK, this is not entirely true.
You have to leave a good idea out for the elves to make into a game. Which
begs the question: “Where do good ideas come from?”
1 They also make shoes, Christmas toys and cookies the same way.

-- 47 of 517 --

24 LEVEL 2 Ideas
Ideas: Where to Get Them and Where to
Stick Them
Every good idea borders on the stupid.
Michel Gondry2
I like this quote because many game ideas often sound stupid. Try these on
for size:
• A yellow creature eats dots while being chased by ghost monsters.
• A plumber jumps on the heads of mushrooms to find his girlfriend.
• A prince rebuilds stars by rolling balls of junk into bigger balls of junk.
All of those stupid-sounding ideas ended up being games that made lots
and lots of money. I guess they aren’ t so stupid after all. To me, the lesson
is, never dismiss a game idea, even if it does sound stupid.
So, where do I get my own stupid ideas to turn into video games? The
traditional way to get an idea is to get inspired. The good news is that a
good game idea can come from anywhere. Here is a list of things I do to
get inspired. I suggest you try them yourself the next time you need to come
up with an idea.
1. Read something you normally wouldn’ t read. I once attended
a roundtable discussion with the famous game designer Will Wright.
Mr. Wright said he got his inspiration for his games from Japanese
gardening, architectural design, and biology. I replied that was great, as
long as you were into Japanese gardening, architectural design, and
biology; but what about “normal folks” who were into comic books,
sci - fi movies, and video games? But to tell the truth, I realized that I
knew what the answer to my question was even as I asked my
question.
One of the reasons why video games sometimes feel the same is that
many game developers love the same stuff. There’s nothing wrong with
liking video games, comics, and movies; however when developers all
get their inspiration from the same things, games start to feel the same.
When popular movies come out, their themes start to show up in
games. When popular games come out, you find their mechanics being
2 While Michel Gondry doesn’ t make video games, he does make excellent movies like Eternal
Sunshine of the Spotless Mind, The Science of Sleep, and Be Kind, Rewind. I suggest you
add them all to your Netflix lists immediately.

---

## Sección 12: Foundations & Introduction

-- 48 of 517 --

25 Ideas: Where to Get Them and Where to Stick Them
used in other games. Games start to feel derivative. You also get that
creepy synchronicity when developers put out similar games at the
same time3. Take the time to expand your educational horizons, even
just a little. You don’ t have to get a degree in the subject; just thumb
through a magazine or two, spend an afternoon at the library or
research something new on the Internet. In other words, stop reading
so much crap and break the cycle, fanboy!
2. Take a walk, drive or shower. When the active part of your brain is
being occupied by a familiar activity like walking or driving, then your
subconscious is free to start wandering and making connections it
would normally never make. These connections often lead to great
ideas. Besides, many game designers could stand an occasional
shower. Please make sure though that if you drive to get ideas, you
invest in a hands-free recording device or stop your car first before you
jot down your thoughts.
3. Attend a lecture. I love the Game Developer’s Conference because I
get inspired by the game design lectures and discussions. I often end
up with a notebook full of ideas. Make sure you share some of your
ideas with your fellow game designers, too. It’ s always good to “ stretch
your idea’ s legs” to find out where it bends and where it breaks. Just be
prepared to be told your ideas are stupid4.
4. Play a game, preferably a bad one. Playing a good5 video game has
its benefits, but I find it more educational to play a bad game. As you
play a bad game, look at the things in the game that were done poorly.
Then think about what you would do to improve them. Consider how
many people “ invented ” the airplane before the Wright Brothers built
and flew their plane. Sometimes it takes several iterations on an idea
before it works successfully.
5. Regardless of the above, follow your passion. You never know
when you’ ll get a chance to use something you love in a game design.
Even if you do read comics and play video games, if you really love
something, that love will shine through in your game. Satoshi Tajiri
designed Pok é mon as a game version of his love for collecting insects.
Dave Jaffe turned his love for Ray Harryhausen movies into God of War.
Shigeru Miyamoto often turns his real- world hobbies into game designs.
If you follow your passions, designing your game won’ t even feel like
work.
3 This is the same phenomenon that gave us two volcano- themed movies in one year, Dante ’ s
Peak and Volcano, back in 1997.
4 And then when someone tells you your idea is stupid, you can retort with Michel Gondry’s
quote!
5 I realize that “good” is extremely subjective. Good could mean highly rated, best- selling,
competently made or even just damn cool.

-- 49 of 517 --

26 LEVEL 2 Ideas
It ’s one thing to have a good idea; it’ s another thing to have a marketable
one. During the course of my career, I have been told many times (usually
by my colleagues in the marketing department) that my idea is a “ designer ’ s
idea ”, which means that they think my idea one that I would love to play but
it isn’ t marketable to the general gaming public. Personally, I am torn with
this assessment. On the one hand, I can understand their desire to make a
game that will sell. If your game sells, that means you can make more
games.
But on the other hand, before I am ready to give in to “the suits” I am reminded
of all of the innovative games that have been created over the years. I am sure
that at one point the designers of these games were told by their marketing
colleagues that their idea was too weird, too unmarketable, or too stupid. If
that were the case, then games like PaRappa the Rapper, The Sims or Braid
would have never been made.
However, let me tell you a little secret. Come a little closer … a little closer
… too close!
If you think something is innovative, it just means you haven’ t been paying
attention.
Scott Rogers
While I am sure there is probably still a completely original idea out there in
the galaxy of ideas, the majority of gameplay design works by each game
building upon its predecessor. I truly believe that this strategy is one of the
keys to creating great game design. Even the most innovative games like
the aforementioned PaRappa, Sims, and Braid had their predecessors in
Simon, Sim City6, and Blinx: the Time Sweeper.
Here ’s another secret. My idea isn’ t even original. Raph Koster charted
the evolution of the shoot ‘em up genre in his book A Theory of Fun for
Game Design (Paraglyph, 2004). Taking Raph’ s chart as inspiration, I
will show you the evolution of gameplay design within the platform game
genre.
6 Will Wright, the creator/designer of The Sims, is one of, if not the smartest guy in video
games. His genius is that his entire video game career appears to be dedicated to the
iteration of a single idea. His creations, Sim City, Sim Ant, Sim Earth, Sim City 2000, The
Sims, and Spore, showcase the natural evolution of a single idea (the world building
simulation) to literally galactic proportions. That he has been able to develop and polish this
idea over the years is a luxury of which any game designer would be envious.

-- 50 of 517 --

-- 51 of 517 --

28 LEVEL 2 Ideas
• Space Panic’s (Universal, 1980) walking character climbed ladders and
dug holes to temporarily stun enemies.
• Donkey Kong (Nintendo, 1981) added jumping and a power- up that
could defeat enemies.
• Popeye (Nintendo, 1982) introduced moving collectables and
environmental mechanics that the player could interact with.
• Pitfall! (Activision, 1982) added alternate moves including vine- swinging
and hopping on alligators’ heads.
• Mario Bros. (Nintendo, 1983) added a second player and enemies that
could be defeated by the player’ s skill rather than just a power- up.
• Pac - Land (Namco, 1984) featured a world map, a variety of themed
levels and dynamic hazards.
• Ghosts ‘ N ’ Goblins (Capcom, 1985) featured multiple weapons including
projectiles, health (in the form of armor that shattered off), and
combatable “ boss ” monsters.
• Super Mario Bros. (Nintendo, 1985) launched a wave of imitators who
were inspired by its tight controls, whimsical environments, and creative
level design.
• Dark Castle’s (Silicon Beach Software, 1986) hero Duncan could “ hide ”
from enemies. It was also the first game where players didn’ t
immediately die from falling, but rather ended up in the dungeon.
• Mega Man (Capcom, 1987) introduced themed stages ending with
similarly themed bosses who possessed powers that could be gained by
the player once they were defeated.
• Crash Bandicoot (Universal, 1996) used 3- D models and environments
to create the camera view called “ 2.5 -D.”
• Mario 64 (Nintendo, 1996) brought all of the gameplay of the Mario
platform games into true 3- D.
As you can see, each idea builds upon the next. Each game designer
inspires the one that comes after them. Or as Pablo Picasso once said,
“ Bad artists copy. Good artists steal.”
Now that you have a great game idea to start with, you have to ask
yourself:
What do Gamers Want?
I believe that most gamers don’ t know what they want until it is shown to
them. That is why it is important for game designers to have ideas born
from passion. To have a vision of what their game is supposed to be.

---

## Sección 13: Foundations & Introduction

-- 52 of 517 --

29 What do Gamers Want?
Gamers can feel when developers are passionate about their games. They
can smell it like a dog smells fear. Don’ t be afraid to hold onto your unique
vision: just be aware that it may not turn out exactly how you envisioned.
But that didn’ t really answer the question did it? Okay, here’ s a simple
answer:
GAMERS WANT GOOD GAMES7
Of course, there is no guarantee that your game will be good. While no one
sets out to make bad games, bad games still get made. You can lay the
blame of a bad game at the feet of a multitude of reasons, which we will be
covering later on.
Tim Schaefer, the designer of Psychonauts and Br ütal Legend, says that
all good game characters are wish fulfillment. They give the player a
chance to be something they aren’t in the real world. I think the same is true
about games in general. Games should make players feel something that
they aren’t in the real world: powerful, smart, sneaky, successful, rich, bad,
or heroic.
As you are developing your idea, you need to know “What audience is
my game for?” The rise of casual gaming has created an entirely new
market; gamers that aren’ t interested in grinding away at a game for hours
at a time. You need to decide who your game idea is for: the casual or the
hardcore player. You can rule out certain design decisions early on by
setting the audience in stone near the beginning of the idea development
process.
Don ’ t forget to ask this important question: “ What is the age of my
audience? ” Having made dozens of “ kid ’ s ” games, I have observed a useful
fact about kids and games. Kids always want what is made for an audience
older than their own age group. For example, an 8- year- old kid wants to
play a game that is made for a 10- year- old kid. A 10- year- old kid wants
to play a game that is made for a 13- year- old kid. A 13- year- old kid
wants to play a game that is made for an 18 year old. Many kids aren’ t
interested in playing games directly targeting their age range. If asked, they
will tell you “ that ’s a game for my little brother.” Believe me, in kid language,
there is no greater put down!
Developers, especially ones who have never made a game for kids before,
tend to oversimplify and talk down to younger audiences. They say “ we
don ’ t want this game to be too challenging because it is for kids.” Don’ t
make that mistake. Kids are far smarter and way better gamers than we give
7 Yes, this is in ALL CAPS and bold because it is a VERY IMPORTANT THING.

-- 53 of 517 --

30 LEVEL 2 Ideas
them credit for. Often, they pick up on concepts faster than many adults.
There are some limitations you have to consider when making games for
kids though. First is that their little hands can’ t perform overly complex
control schemes. The second is with an audience in first grade or younger
(6 to 7 years old), they may not be able to read many complex words or
long amounts of text. And watch the swearing.
Why I Hate “ Fun ”
“ Is it fun?” is the question I dread the most when coming up with new game
ideas. Many gaming academics have attempted to define what fun is.
Designer Marc LeBlanc breaks down fun into eight categories: Sensation,
Fellowship, Fantasy, Discovery, Narrative, Expression, Challenge, and
Submission8. While the classification of fun is an interesting exercise, I don’ t
find it that helpful “ in the field.” There are always problems. For example, a
game idea (or mechanic, or boss fight, or whatever) can sound fun “ on
paper ” but may not be fun once you get it working in the game. Or it may
work, but only be fun to you.
The problem with fun is, like humor, it is completely subjective. Even if I find
something fun the first time I play it, it will almost certainly not be fun on the
hundredth go. This ultimately happens to all game developers while working
on a game. You will play the same level hundreds of times over the course
of the production. Then you start to lose all objectivity. I distinctly remember
several times when a producer would come in and ask:
8 Taken from Mark’ s GDC lecture and corresponding website: http://www.8kindsoffun.
com/.

-- 54 of 517 --

Brainstorming 31
When it comes to fun and games I have found there is only one truth:
YOU HAVE NO GUARANTEE THAT YOUR GAME IDEA IS GOING TO BE FUN
You can try to skew the odds in your favor by basing your game on existing,
proven gameplay style, but more often than not, you end up with a “ clone ”
game. Look at how many lousy first person shooters and survival horror
games have been made.
Because developers always lose their objectivity during the course of
production, I have created the “Theory of Un- Fun. ”
The Theory of Un- Fun states: start with a “ fun ” idea. As you develop the game,
if you find something in the game that is not fun (or un- fun), then remove it.
When you have removed all of the un- fun, then all that should be left is the fun.
Seems like common sense, right? And yet I have encountered many
developers that have left bad gameplay mechanics and ugly art and broken
cameras in their games because they got used to them or couldn’ t
recognize them as problems. They just didn’ t possess the objectivity to see
that something in their game was not fun. Of course, you need to start with
a game idea that is fun to begin with. Otherwise, when you have removed
all of the un- fun you’ll be left with nothing!
The theory of un-fun must be applied several times during the game’ s
development. Stop what you are doing and take a look at the game.
Make a list to determine what is making the game “ un - fun. ” It could be a
crappy camera. Lousy controls. You could have bad animations. The game
may be too hard. The game may be too easy. A producer I once worked
with gave me a great piece of advice when it came to ideas. “ Don ’t be too
dear. ” And what he meant was don’ t be afraid to kill bad ideas. In other
words, kill the un-fun. Don’ t worry, there are plenty more ideas where those
came from.
Brainstorming
When coming up with ideas, I like to brainstorm. To brainstorm properly, you
need the following five things:
1. A working brain
2. Something to write with

---

## Sección 14: Foundations & Introduction

-- 55 of 517 --

32 LEVEL 2 Ideas
3. Something to write on
4. A place to work
5. Collaborators, preferably ones who also have working brains.
Before you start brainstorming, you need to set some ground rules. First,
there is no such thing as a stupid or bad idea. Say yes to everything at this
stage. Make sure you collaborate with people from other disciplines than
game design: programmers, artists, testers, writers. The more diverse your
brainstorming group is the better9. People always surprise me with what
they bring to the idea creation process.
Think about all the things you want your game to be. Then write them down.
Your goal is to free associate an idea as far as it can go. Milk the idea
completely. When you have reached the ridiculous, then squeeze it once
more and let it go. Here are some of the notes from one of my
brainstorming sessions:
9 Keep in mind that everyone you invite to your brainstorming session should understand how
to make a game though, otherwise you might waste a lot of time on unrealistic ideas.

-- 56 of 517 --

Brainstorming 33
As you can see, the topics didn’ t really relate exactly to each other; sure,
they are all things you may find a combat/driving game to have. The ideas
don ’t have to be original at this stage either; you are merely cataloging
ideas and concepts. As you design them further, then you can start thinking
of things like originality or even fun.
When I am brainstorming, I like to write on a very big whiteboard. You may
prefer to use lots of Post-It notes. Index cards work pretty well too. It doesn’ t
matter. What matters is that these ideas get recorded. Even if they don’ t
work out, you can always use them for some other game.
An excellent exercise you can use to brainstorm your game idea is to create
the box and the manual. What would the cover image be? What would the
bullet points on the back of the box read? How would you communicate the
game in a black and white, 16- page manual? By placing these limitations on
your idea, you can streamline your idea to the bare essentials. Here’ s an
example of the back of game box that you can use as a template.

-- 57 of 517 --

34 LEVEL 2 Ideas
Breaking Writer ’ s Block
What do you do when the ideas won’ t come? There’ s no need to be
ashamed. Everyone gets creatively stopped up from time to time. Here are
a few tricks to try when you are dealing with writer’ s block.
1. Narrow your focus. Maybe you are trying to think of too many things
at once. Tackle your problems one by one by making an outline or
breaking things down to a minute level if you have to. Give yourself a
time line to complete each of these tasks, but don’ t take days. Try to
get them done in hours.
2. Take a walk or exercise. Everyone knows the brain is fueled by
blood. Don’t let that blood coagulate in your butt; get outside and move
around. When your blood starts circulating again, the new ideas will be
coming back in no time.

-- 58 of 517 --

35 Breaking Writer’s Block
3. Deal with something else that may be distracting you. Sometimes
when I am stuck it is because I am worrying about something else. It
may be an unfiled expense report or a floor that needs vacuuming.
Take a break and deal with whatever is bothering you. When it is done,
it won’ t be a concern anymore!
4. Jump ahead to the good stuff. Sometimes you have to come up
with ideas for game features that may not excite you as much as other
parts of the game. If these are bogging you down, then go ahead and
jump to the good parts. Take some time to design a boss fight rather
than worrying about the UI design. However, I recommend this ONLY
as a last resort as it can be very dangerous! The truth is that games are
built around schedules, deadlines, and budgets. If you don’ t get your
work done on time and choose fun over the drudge work, the game,
the whole team, and even the company can suffer. Don’ t procrastinate.
Time management is very important, so be responsible.
5. Change your environment. I find that my office is full of distractions.
E- mail beckons, video games call out to be played, and game design
documents flutter their little pages at me, begging to be read. When this
happens, I get out of my office and go to the nearest conference room
to work. Or sometimes I go outside to sit in the sun and get some
“ vitamin Duh.”
Once you have your list of ideas, it is time to get critical. Start narrowing
down your list. Some items will immediately jump out as “ keepers ”, while

-- 59 of 517 --

36 LEVEL 2 Ideas
others are clear losers. Be merciless. It is better to have more good ideas
than you can use than to have a game be full of lots of bad ideas.
Present these ideas to another party. Miyamoto has his “ wife - o - meter ”
where he presents his ideas to his wife. If she hates them, they get thrown
away. I used to have the executive assistants in my office take a look at
game ideas. Someone who has no vested creative interest in your ideas will
often give you the clearest and most honest insight.
Now that you have your ideas, let’ s put them to good use!
Level 2’ s Universal Truths and Clever Ideas:
• All gamers want are good games.
• You have no guarantee that your game is going to be
fun.
• Start with a “ fun ” idea. As you develop the game,
remove the “un-fun. ” All that should be left is the fun.
• Don’ t be so dear with your ideas. Throw out some good
ideas along with the bad if they don’ t fit or have more
than you need.
• Ideas are cheap, it’ s how you use them that matters.
• If you’ re stuck, take a break— but don’ t procrastinate.

-- 60 of 517 --

T
Levei 3
Writing the Story
Almost since the dawn of gaming, designers have debated which is more
important: story or gameplay? Some designers believe games require a
story to engage the player. Other designers think a story is what people
use to describe play when it is finished. Pro- story designers reply that
games are an artistic medium used to tell a story. Anti- story designers
counter that a story is what you watch while the game loads. Designers at
Game Developer Conferences all around the world face off against each
other: one group yelling “Bioshock! ” while the other side shouts “Doom! ”
back. Silly designers. They are both right and wrong. A game doesn’ t need
to have a story, and yet it always has a story. Perplexing? While you are
chewing that over, let’ s look at the classical definition of “ story ” as taught
by everyone from Aristotle to very famous screenwriters. Here’ s the most
basic structure of a story:
1. First, there is a hero who has a desire.

---

## Sección 15: Foundations & Introduction

-- 61 of 517 --

38 LEVEL 3 Writing the Story
2. Our hero encounters an event that throws his life into disarray and
interferes with obtaining the desire. This event causes a problem for
the hero.
3. The hero tries to overcome the problem …

-- 62 of 517 --

Writing the Story 39
4. … but his method fails.
5. There is a reversal of fortune, which causes more trouble for the hero.

-- 63 of 517 --

40 LEVEL 3 Writing the Story
6. An even greater problem is created for the hero that puts the hero at
greater risk.
7. Finally, there is one last problem that threatens the hero with the most
risk of all.

-- 64 of 517 --

Writing the Story 41
8. The hero must resolve the final problem…
9. … in order to gain his object of desire. And
everyone lives happily ever after. Well, until the sequel
anyway.
Remember that no matter what your story is about, a story
ALWAYS has a beginning, middle, and end. Hollywood
has spent many years analyzing and deconstructing the
story. Don’ t feel like you have to reinvent the wheel; learn
what they have. Read screenwriting books, take classes,
visit screenwriting websites. But you don’ t have to feel
chained to a standard story structure like Joseph
Campbell ’s “ Hero ’s Journey” or Syd Field’s “ Three Act Structure.” Try
using another medium’ s structures to tell your story. How is a story told
in a song? In a TV news report? In a Homeric poem? Or try looking to
non-Western -world storytelling for inspiration.
Just remember that video games are an interactive medium, and as William
Shakespeare reminds us, “The play’ s the thing.” That was one guy who
knew story, and he was pretty smart for someone who never played a video
game. If gameplay is the meat of the game, then story should be the salt:
just enough will add flavor but too much can ruin everything and kill you.
Some games don’t even have stories. Games like Tetris or Bejeweled or
even Pac - Man don’ t need them to be engaging for the player. However,

-- 65 of 517 --

42 LEVEL 3 Writing the Story
they still generate a narrative, which literally
means “an order of events.” Since we humans
perceive time as linear, we express our
experiences linearly as well— even if they aren’ t
presented in a traditional story structure. Let’ s look
at it this way:
Every time a person plays a game they create a
narrative. There are an infinite number of narratives
that the player can create. As a designer, you
need to look at all1 of the narratives possible and
find out how to make them ALL fun. The goal is to
create multiple narratives that the player will enjoy
playing.
In a narrative, the player is the “ hero ” of the game.
The designer needs to look at the game from the
player ’s perspective and be aware of the ordering
of the events and experiences that will eventually
help the play create the narrative. As each experience builds on the next,
the goal is to create rising emotional states for the player. Then the designer
can design systems to choreograph these interesting experiences which in
turn create emotions. Savvy? How about an example instead?
Left 4 Dead uses an artificial intelligence called the “ Director ” to control
the game’ s pacing. Depending on the player’ s “ stress level”, which is
calculated using many variables including health, skill, and location, the
Director then adjusts the number of zombies that attack, what items like
ammo and health are generated, and even the music. In the end, the
game itself generates a unique and dynamic play experience for the player.
However, since most developers don’ t yet have technology like Left 4
Dead’s Director, it is up to the designer to create these situations as best
they can within their own games.
When you are designing a game, it is extremely important to know the
narrative that the player will experience. You’ ll find that the player’s narrative
can end up quite different to the game’s story. Remember to never mistake
story for gameplay, and similarly never mistake gameplay for story.
I am also a firm believer that almost ANYTHING can be made into
gameplay. Don’ t feel like you are limited by subject matter. Look at games
1 Or as many as you can guess will happen. It’ s like playing a massive session of “ what if.”
However, as these possibilities can stretch on to infinity, it might not be worth the time
investment to predict everything. That’ s why when something happens that the designer
didn’ t expect and doesn’ t break the game, we’ re more than happy to call it a “ feature” and
move on!

-- 66 of 517 --

Writing the Story 43
like Mr. Mosquito (the player is a mosquito who drinks the blood of a family),
SimCity (the player builds and manages a city), and PaRappa the Rapper
(dog raps to win the love of his flower girlfriend).
Still don’ t believe me? Let’ s look at the classic and simple story Little Red
Riding Hood. This children’ s story has all the elements you’ ll need to make
a great video game:
1. Little Red Riding Hood walks through the forest to Grandma’ s house =
classic player exploration. Give Red some goodies to collect to fill up
her picnic basket (inventory system) and have her jump over a fallen log
or two on her way.
2. Red meets the Big Bad Wolf = the player has her first enemy
encounter. Of course, you can’ t kill off the wolf yet … (unless the
enemies are “wolf minions” ).
3. Carrying a full basic set of goodies (gating mechanism), Red reaches
Grandma ’s house (next level), where she finds “ Grandma ” waiting in
bed.
4. Red questions “ Grandma ’ s ” true identity (“ what big eyes you have” ).
This can take the form of a quiz, a puzzle, or even a rhythm game.
5. “ Grandma ” is revealed as the Big Bad Wolf and Red and the wolf battle
to the death = boss fight2!
See? Even a “ simple ” classic story can still offer all the elements to make an
exciting and varied video game3!
2 We all know that Little Red Riding Hood ends with Red being eaten by the wolf and
having the woodcutter save her, but where is the fun in that? Why watch a cutscene when
you can have a boss fight? It’s not my fault boss fights weren’ t invented when they wrote
this story. Personally, I think my ending is better.
3 OK, the story of Little Red Riding Hood might not make for a very LONG video game, but
it can be made into a game nonetheless.

---

## Sección 16: Foundations & Introduction

-- 67 of 517 --

44 LEVEL 3 Writing the Story
The Triangle of Weirdness
I am sure you have heard of the
famous production triangle (see
opposite).
One of the best things about video
games is that, technical restraints of
your chosen platform aside, you are
limited only by your imagination.
Developers can craft virtual worlds that
feature non- Newtonian physics, bizarre
characters, and absurd quests. However,
it is possible to go crazy with creativity,
especially when writing the game story.
This is why I created the “Triangle of
Weirdness. ” Notice the difference in
the choices on the triangle of weirdness:
characters, activities, and world.
Unlike the production triangle where
you can have any two points, you
can only choose one corner on the
triangle of weirdness. Choose any
more than that and you risk alienating
your audience.
Let ’ s take a look at three examples of how to apply the Triangle of
Weirdness to your story and world:

-- 68 of 517 --

45 The Triangle of Weirdness
While the Wizard of Oz features weird characters such as a Tin Man, a
Lion, and a Scarecrow, the land of Oz was a pretty typical fairy tale
location when it was created in the 1900s. The characters of the Wizard
of Oz have desires readers can relate to: courage, love, and wanting to
return home.
While the main characters of Star Wars are familiar (the young hero, the
princess in distress, the charming rogue), and their desires are familiar (join
the war effort, defeat the villains, get the girl), it is the world of Star Wars that
is weird with its Jawas, Wookies, Jedis, and a Cantina populated by the
craziest-looking scum in the galaxy.
Monty Python and the Holy Grail features typical (if not archetypical)
characters: King Arthur and his knights of the round table. These stalwart
knights travel through medieval England on their quest for the Holy Grail.
However, that quest is filled with weird activities like designing shrubs for
the knights that say “ Ni! ” or being slaughtered by the killer rabbit of
Caerbannog.
It is possible to go too far. Movies like Dune (1984) and The City of Lost
Children (1995), or video games like SkullMonkeys or Muscle Man March,
while incredibly unique and creative, just left many audiences feeling like
they “ didn ’t get it.” And nobody likes to feel stupid.

-- 69 of 517 --

46 LEVEL 3 Writing the Story
What do these games and movies have in common? They all violate the
Triangle of Weirdness. Do so at your own peril …
When developing a game story, you will find there are three different types
of people in your audience.
1. Players that are into your story as it happens.
2. Players that want to get into your story in depth.
3. Players who don’ t care what the story is at all4.
Making your story appealing to all three types of players can be a challenge.
The best rule of thumb is to always make the story be in service of the
gameplay and not the other way around. Here are some tips on involving
story into the game.
• To satisfy players that are looking for a deeper experience, provide
details but make sure they don’ t get in the way of the story. For
example, Bioshock and Batman: Arkham Asylum both have non
mandatory collectable audiotapes that reveal deeper story details
to the player without intruding in on the main story.
• Players that are just along for the ride will “A button” their way
through audio cues and cutscenes that reveal story points. Make
sure your game’ s story is also revealed through gameplay and
level design to prevent it being skipped entirely by the player;
otherwise, the player will get lost and confused5. You can also
introduce story as gameplay by making them playable flashbacks
or puzzles.
• Start your story as late into the action as possible. This can be
in the middle of a boss fight, at the end of a level, or during
a car chase. Keep in mind, this works best for games with
traditional story. I’ m not sure it’ s such a good idea to start
a puzzle game of Tetris with dozens of tiles raining down on
the player.
• Always keep your stories lively and moving. Professional screenwriters
will introduce a change in the plot or action every 15 minutes. Even with
non -story games, play sessions are becoming “ bite - sized ” so they’ re
short enough for players to enjoy in short bursts.
4 I can’ t take credit for this observation. This statement was made by Ken Levine, the
director of Bioshock, during his excellent 2009 GDC speech.
5 Yeah, I know. It’ s their own damn fault if they get confused for skipping the cutscenes in
the first place, but remember the first rule of responsible game design: love thy player.

-- 70 of 517 --

47 The Triangle of Weirdness
Speaking of surprises, there is a trend in game stories that I blame squarely
on Hollywood: the twist/surprise ending. While it is fun to be taken by
surprise, I believe there is merit to a predictable ending. Remember that
wish fulfillment I said players want? People like it when the good guys win
and the bad guy lose, and yet that’ s the oldest story in the book.
Take, for example, the James Bond movies of the 1980s. When I was
growing up, I loved to go see those films. Even before I saw them, I knew
that Bond was going to use a cool new gadget and drive an awesome car,
defeat the villain’s scheme, save the world, and end up with the hot girl. So,
if I knew all of these things, why did I bother watching the movie? For me,
the fun was the twists and turns the story took. I knew the WHO, the WHAT
and the WHY, but I didn’ t know the HOW.
There is a delight in predicting how things will turn out. It makes the player
feel smart, like they “called it” in an election or solved a mystery. Besides,
life is unpredictable enough as it is, why not give your audience a little
predictability? The point I am making is you don’t have to be especially
clever when writing your story, just entertaining.
Conversely, something that I don’ t find very clever is a video game story
where the main character has amnesia. Amnesia ranks as the number one
video game cliché of all time, but I understand why game writers do this. It’ s
an attempt to approximate the lack of information about the characters and
the world as a player begins the game. However, it ultimately becomes an
excuse for the writer to be an “unreliable narrative” and intentionally omit
information to the player in order to create a “shock ending.” It just feels
forced and frankly, isn’ t fair to the player.
Instead, here is a great theory about the value of surprise vs suspense from
classic director Alfred Hitchcock. Imagine that there are two men sitting at a
table talking about baseball. The conversation lasts for about five minutes,
when suddenly, there is a huge explosion! This shocks the audience but
that surprise only lasts about 15 seconds.

---

## Sección 17: Foundations & Introduction

-- 71 of 517 --

48 LEVEL 3 Writing the Story
However, here is how you can get a greater impact from your audience.
Start the scene by showing the bomb under the table. The bomb is set to
explode in five minutes. The two men discuss baseball while the audience
is squirming in their seats thinking “ Don ’t just sit there talking about
baseball! There’ s a bomb under the table! Get out of there!” By making the
audience aware of the danger the characters are in, the audience gets
emotionally involved. By the time your scene reaches its climax, you have
created more excitement with your audience than just the surprise of the
bomb exploding6.
Another thing to consider when developing your story is “ what is at stake?”
Many video games are about saving the world from evil or destruction. But
just like every movie doesn’t have to be a slam-bang blockbuster, not every
video game has to be about saving the world. Small themes can be just as
important as big ones. In my opinion, using a theme for your story other
than “violence solves all problems” is a worthwhile pursuit. It worked for
games like Frogger, Zoo Tycoon, and Braid.
Time to Wrap It Up
Ending games can be just as hard as starting them. In the good old days,
there wasn’ t an end to a game, just a kill screen7. Or they just ran forever,
frequently wrapping their scores around like your car’ s odometer. Then
along came Dragon ’s Lair, and everyone wanted to know whether Dirk
rescued the Princess or not. The video game story was born.
How long should a game be? In the old days, the average was 20 hours. In
the really old days, it was 40. Nowadays, most games average 8– 10 hours
of playing time; however, depending on the game, this length might not
always be appropriate. You’ ll have barely scratched the surface of Fallout 3
after 8 hours. I recommend ending the game when you feel like you have
left the player feeling satisfied. You can leave plot points dangling to
encourage replayability or to open up storylines for sequels, but in the end
play fair with the player. Let them feel like they accomplished everything
they needed to do during the game.
6 Hitchcock also recommends that you don’ t actually kill the characters in this scenario. In the
case of video games, the game would be over!
7 A kill screen originally wasn’ t the “ game over” screen, but rather a screen that appeared
due to a programming error or design oversight. The most famous kill screen from classic
gaming is the 256th level of Pac-Man. At this point, due to a bug half the screen becomes
garbled data, which keeps the player from collecting all of the dots and clearing the board to
move on. Arcade owners had to unplug or “kill” the game to start it back up again.

-- 72 of 517 --

49 Time to Wrap It Up
Some games even offer extra experiences so the player can continue
playing after the story has ended. Multiple endings, minigames, unlockable
and downloadable content or “deleted levels” (akin to deleted scenes on a
DVD) will let your player return to your world without having to hear the
same story over again. If you create a world that the player wants to play in,
they will want to come back to play.
Or you can just throw away all of the previous advice and write your story
at the last minute. Some development teams concentrate solely on the
gameplay and create the storyline last. They claim it works. Personally, I
think it would make me nervous.
Oh, I almost forgot to talk about one of the most important things about
your game’ s story: the title! There are several ways to approach naming
your game. They include:
• The literal title
• The action/cool title
• The punny title
• The “purple cow” title8.
A literal title makes it easy to figure out where the title came from. It can be
the name of your main character, like Sonic the Hedgehog or Voodoo Vince.
It can be the main location of your game, like Castle Wolfenstein or Saint ’ s
Row. Or you can name your game after a gameplay activity or component
like Command and Conquer or Boom Blocks.
The action/cool title is a title that captures the spirit of the game without
mentioning any of the game characters or locations. I think games like
Darksiders, Brü tal Legend, and Gears of War all have cool titles.
The punny title is a title that makes you appreciate the cleverness of the
title. Just Cause, Half Life, and System Shock are all good examples of
punny titles. As puns are word play, you have to be careful as your
audience may not get the reference or think the pun is funny. Humor is
so subjective.
A purple cow title is one that makes your customer stop in their tracks and
stare. It compels the reader to wonder why the title was chosen. Once the
player has played the game, they understand the significance. Purple cow
titles include LittleBigPlanet, Far Cry, and Resident Evil. The advantage to a
purple cow title is once you’ ve associated the word with their titles, it’ s hard
for other people to use those words without conjuring up the image of the
8 The term “purple cow” comes from the poem by Gelett Burgess who wrote: “ I never saw a
purple cow, I never hope to see one. But I can tell you anyhow, I’ d rather see than be one.”

-- 73 of 517 --

50 LEVEL 3 Writing the Story
game. It’ s going to be a long time before anyone thinks of using the word
Halo in their game title …
No matter what naming convention you use, I think that shorter titles are
better than longer ones. First of all, they are easier to remember and say.
I like to keep them to two or three syllables like Star Wars, Don -kee Kong,
Pac - Man or Hey- lo. I think this started because of marquee sizes on
arcade cabinets: they needed to attract the player’ s attention, create
some mystery, and describe the gameplay. “ Defender ” is still one of
the best game names ever: it perfectly sums up the game in one
three - syllable word.
Secondly, shorter titles are easier to make into logos for your game’ s start
screen and read on the cover of a game’ s box. Don’ t forget to consider
marketing aspects when you are creating your game’ s title. If you have to
use a longer title or a subtitle, then still try to keep it short. Uncharted:
Drake ’s Fortune combines a couple of purple cows to make a pretty good
title. Players will want to know who Drake is and what his fortune is.
Uncharted gives you the image of exploring or sailing into unknown and
dangerous territory. Conversely, Batman: Arkham Asylum lets you know who
you are playing and where it takes place.
Try to name your game sooner than later. I have always preferred the titles
developers created over those made up by someone else in the team. If
you wait too long, a publisher’ s marketing department will have to come up
with the game’ s name for you— and believe me, you don’ t want that.
When you have finally named your game, you may discover that your great
title is already in use or trademarked by someone else. Make sure you do a
check with your publisher’ s legal department to make sure you can use your
title before you become too attached to it. Even a quick word search on the
Internet will help get you started.
Creating Characters
Fellow designer Andy Ashcraft believes that video game developers only
care about telling the second act of their story. I tend to agree with him.
However, games that do that are missing an important part of the
storytelling process9. In games, the second act is the grind that moves
the player towards the third act which is the completion of the story;
usually the last level and a boss fight. They skip the all- important first act
to “cut to the chase.” In video games, this is either done with a cutscene
9 Remember, all stories have what? A beginning, middle and end.

---

## Sección 18: Foundations & Introduction

-- 74 of 517 --

51 Creating Characters
or, even worse, the game’ s manual— which no one ever reads10! This is a
mistake. The first act is where the player is given an opportunity to find out
about and care about the character. However, I believe you need that first
act to get the player to bond with the character, even if you kill that
character off repeatedly (common in video games) or radically change
them into a killing machine. Case in point, you don’ t need to look any
further than the movie Robocop.
In the film Robocop, the audience is introduced to police officer Alex
Murphy. He’s an honest cop and a decent guy fighting crime in futuristic
Detroit. By page 25 of the script, you actually care about the guy and feel
bad when he’ s gunned down by criminal scumbags. The second act kicks
off when Murphy is rebuilt as the cyborg Robocop. Now this movie had
several video game adaptations made, and in all of them, Murphy’ s death
was only shown as a cutscene. The player would start the game as
Robocop and the killing of bad guys would commence immediately11.
But in our hypothetical Robocop game, why not start with Murphy as a cop?
The first level of the game would have Murphy tracking down the bad guys
and end with his death. The player would have time to bond with him,
making his death and resurrection have much more of an impact.
10 Maybe I am exaggerating a little, but c’ mon. When was the last time you really read a game
manual? Then again, when was a game manual worth reading?
11 Just so you realize that I’ m not a complete idiot, I do know why the developers of
Robocop began the player as Robocop. (1) It’s more appealing to play as a criminal- blasting
cyborg than as a fragile human; (2) game carts in 1988 didn’ t have the memory to store
two completely different player character models, and why would you go through all of the
work to create them, especially if you were only going to be the human player character for
one level; and (3) the game is called Robocop, not “ Guy who gets shot and eventually
becomes Robocop. ”

-- 75 of 517 --

52 LEVEL 3 Writing the Story
Death should mean something to the player, especially when it isn’ t the
main character dying. When was the last time you cried when a game
character died? (Other than when you accidently deleted your save file?)
Writers forget that you have to care about a character first if it is going to
mean anything when you kill him. And the solution isn’ t to make the
character a relative or part of a meaningful relationship, especially if that
character is killed off in the first cutscene. I remember playing a game
that opened with the player’ s relative getting murdered after interacting
with him for one level. I didn’ t feel the righteous anger that the player felt
for the rest of the game because I knew the character for such a short
time. Invest the time in these characters, even if the ultimate goal is to kill
them off.
Even better, make the character important to the player somehow. They can
provide information on how to play the game, be the economy system (like
the proprietor of the game’ s store), or provide health power- ups to the
player on a regular basis. When that character is taken out of the game, the
player will feel the impact. Spoiler alert, but in my humble opinion, the only
game character whose death felt impactful was Aeris in Final Fantasy VII.
Aeris filled many roles for the player; she was a damsel in distress, one part
of the hero’ s love triangle, a character who contributed solutions to the
problems in the plot, and a “ playable ” part of the gaming party. When she
died, her loss to the player was felt on many levels. Build up your game
characters before you tear them down. Make their loss count.
Your party members don’t have to be
human: the deaths of Agro the horse in
Shadow of the Colossus and Dogmeat
the dog in Fallout 3 have similar effects
on players. All that matters is that your
player has a bond with these characters
to feel the loss when it happens.
All this talk about death has bummed me out. So, what about humor in
games? Most writers agree that comedy is harder than drama. However, I
believe that the secret to humor is character. My favorite first person shooter
is Team Fortress 2, and I believe it is one of the funniest games I have ever
played. The game doesn’ t feature humor like other games have; you won’ t
find physical gags, “ hilarious ” jokes, or burping and farting. What makes the
game so funny is how true the characters are to themselves. From the wry
Australian sniper who has to defend his occupation to his parents, to the
Russian heavy gunner who is overly fond of “ sanviches. ” All of the game
characters ’ appearances, animations, and vocal barks reinforce their
personalities, raising them from stereotypes to truly original (and funny)
characters.

-- 76 of 517 --

53 Creating Characters
If your game character is defined by a profession or activity, then make
sure that the majority of the activities they do are related to that profession
or activity. For example, if your player character is a demolitions expert,
they aren’ t going to negotiate their way into a prison level to free their pal.
They are going to BLOW IT UP! Heck, they may even blow up a door
rather than turn the knob. When we were creating Maximo, we decided
that he was an impatient guy, always in a hurry to rescue the princess
or get into a fight. He didn’ t even stop to open a treasure chest; he just
kicked it open, collected the treasure, and went on his way. If you start
with your character’ s personality you will end up with some interesting
animations and gameplay. Remember, characters have many
motivations: success, revenge, love, acceptance, escape, hunger,
responsibility, knowledge. Many characters have more than one; often
conflicting motivations. Knowing their motivations will help you determine
what your character will do and say. The result will be a much richer
character.
Speaking of character, just like giving
your game the right title is important, it is
equally important to name your character
correctly. Would you name a strapping
barbarian hero Mortimer? Only if your
hero is a parody or it’ s a comedy game.
Names carry great weight. It is important
to give your character the right name.
Baby books are a great place to start. I
like names that have some significance
to the character’ s personality or what
their occupation is. Star Wars has some
of the best names. What does the name
Luke Skywalker tell you about the
character? Luke feels like a simple,
homespun name fitting for a farm boy
who yearns to “walk among the stars12. ”
It ’ s also fun to have characters’ names juxtapose each other. Two of my
favorite character names are from When Harry Met Sally. Billy Crystal’ s
character is named Harry Burns— a curmudgeonly, burned out name if ever
there was one. Meg Ryan’ s character is Sally Allbright. She’ s positive,
romantic, and a little naï ve. While these names are pretty blatantly obvious,
they give you a quick snapshot of the character’ s personality.
12 Did you know that Luke Skywalker’ s original name was Luke Starkiller? This name change
provides a great lesson: never give your character a name that gives away the ending of your
story!

---

## Sección 19: Foundations & Introduction

-- 77 of 517 --

54 LEVEL 3 Writing the Story
Comedic characters need appropriate names too. Guybrush Threepwood,
Spongebob Squarepants, and Larry Laffer aren’ t heroic sounding names,
but they are totally appropriate for the humorous games they are in. The
only rule of thumb is when you look at an image of the character; the name
fits what you see.
A Few Pointers on Writing for Kids of All Ages
Just because you are writing game stories for kids, doesn’t mean it has to
suck. The most common mistake kid game writers make is trying to make
the story too simple. I have often heard developers protest over using
complex ideas and themes because “ it ’s for kids!” But think about children’ s
literature. Children’ s classics like Where The Wild Things Are, Heidi or The
Chronicles of Narnia are full of complex themes, interactions, and emotions.
If it’ s good enough for kid’ s books, it should be good enough for kid’ s
games. Coming of age doesn’t only mean that the main character can carry
a sword!
Another great thing about kid’ s games (heck, this applies to all games) is
that you can teach your players things without them even knowing it. I am
not talking about “ edutainment ”, but the type of entertainment you used to
find in movies and comic books. As a kid, I remember a Batman comic
book in which I learned about famous comedians of the 1920s, the opera
Pagliacci, African masks, and how paraffin wax discolors with age. That’ s
some pretty impressive knowledge to gain from a “kiddie story.” Don’ t be
afraid to educate as well as entertain. Who knows, your players may learn
something while they are having fun … and you may learn something as
you are writing your story.
Writing for Licenses
A licensed game is when you create a game based on a pre- existing
intellectual property13. This can be a character or world first seen in a movie,
comic, real life, television, or even another video game. Star Wars, Batman,
Harry Potter, and Spongebob Squarepants are all licensed characters and
worlds, known as properties. The property is licensed by a publisher or
13 There are also plenty of IPs that exist in the public domain: Cinderella, The Wizard of Oz,
Dracula, The Three Musketeers, The Bible, Dante ’ s Inferno to name a few. Remember to base
your own work on the original material and not on someone else’ s interpretation.

-- 78 of 517 --

55 Writing for Licenses
developer, which means that a fee is paid to use the property for a game
(or several games). The group who owns the original property is called the
licensor. Licensors are groups like Lucasfilm, DC Comics, J.K. Rowling
or Nickelodeon (to use examples from above). However, just because the
licensee has paid to make a game using the character, that doesn’t mean
they can make any game they want. A licensee has to work with the licensor
to adhere to the brand. For example, a licensor may not want their character
to kill enemies. Therefore, the developer has to design their game around
these “brand limitations.” Some properties are pretty lenient to what
developers can do with their properties, while others are very strictly
moderated.
Don ’ t dismay about having to stay within the confines of a license. With a
good licensing partner, you can design a game that allows room for
creativity. For example, I was working on a licensed game that had seen
over 10 games previously based on it. Not looking forward to making just
“ another installment” of the property, we talked with the licensor about
making the game in a genre that wasn’ t just a standard platformer. After
we made our pitch, the licensor confessed that they were tired of creating
the same style of game over and over, but had never considered taking
the gameplay in another direction. The licensor gave us a lot more freedom
than we had previously thought we had and, in the end, we produced a
solid game. Just because you are working on a licensed game, don’ t
assume that you are locked in to the “same old, same old.” It never
hurts to ask.
Here are a few tips I’ ve picked up from working on licensed games:
• Find out about the license inside and out. Read, watch, play everything
you can on it. Go deep whenever possible. If you go in directions that
aren ’t obvious or use characters that are more obscure, the fans of the
brand will appreciate it. Every licensed game should be a celebration of
the license and a big “thank you” to the fans.
• Uncover the “ big issues ” early. Talk to your licensor and find out what
the big “ no no ” issues are. Doing this will save you a lot of headaches
and prevent you from making resources that will have to be changed later
in production. For example, one game used hamburgers as a power- up.
When the character ate them, he became invulnerable. However, even
though it was never mentioned in any of the license ’ s episodes, one of
the main characters (one that was a playable character in our game)
was a vegetarian. We had to change the power- up because the show ’ s
creators didn ’ t like that we had their character “ eating meat. ”
• Get as much material as possible from the licensor. Television shows
have “ bibles ” —detailed documents that outline the show characters and
worlds. Established comic books have years of back issues that make

-- 79 of 517 --

56 LEVEL 3 Writing the Story
great reference material. If your license is still in production (for example,
if you are making a game for a movie with a simultaneous release) get
hold of scripts, animatics, storyboards, and production photos as soon
as possible.
• If you are working on a movie license, visit the set (if applicable) and
take your own reference pictures. Anything that helps you replicate the
world of the license as closely as possible.
• Respect the license, but find ways to make it your own. A two- hour
movie may not have enough material to allow you to create an 8– 10
hour game. Work with the licensor to expand the fiction to help you “fi ll
in the gaps.” Don’t be afraid to bring your own interests to the party;
those interests may fit in better to the brand’ s license than you may
think.
There is much more I could tell you about writing stories, but I won’t. This
should get you started with your stories. Now, let’ s get back on track and
talk about the foundations of gameplay: what I call the Three Cs!
Level 3’ s Universal Truths and Clever Ideas:
• Some games need a story. Some games don’ t. All games
need gameplay.
• A story always has a beginning, middle and end.
• Never mistake story for gameplay.
• Almost ANYTHING can be made into gameplay.
• Create a world the player will want to play in, and they
will come back to play.
• Make death matter.
• Keep names short and descriptive.
• Don’ t underestimate kids: they’ re smarter than you think.
• Stay true to a license, but don’ t be afraid to “ make it
your own.”

---

## Sección 20: Foundations & Introduction

-- 80 of 517 --

T
LeveI 4
You Can Design a Game, But
Can You Do the Paperwork?
A Japanese game director once
visited the studio where I worked to
impart his wisdom to our team about
his philosophy of game design, which
mainly had to do with how much
money his latest game had made. As
he was leaving, he asked our team a
cryptic question: “I believe making
games is like fishing” he said. “ When I return, you will tell me why this is
so. ” If he had been wearing a cape, I’m sure he would have swooshed it
mysteriously as he left.
I spent a lot of time thinking about just exactly how making games was like
fishing. In the end, I decided that making games is nothing like fishing.
Fishing is quiet and slow and involves waiting for something to happen that
may never happen1. I also decided that this game director was full of crap.
So I developed my own analogy.
Making games is like making chili
(bear with me— it ’ll make sense).
Like making chili, you first need a
recipe and that recipe is the game’ s
documentation. Having the right
recipe is important. You are not
making soup or stew. You want to
make sure your documentation not
only covers what is in it, but how it
can be made: just like a recipe. Be
sure to follow the recipe, but be
1 You may be able to tell from this statement that I do not enjoy fishing.

-- 81 of 517 --

58 LEVEL 4 You Can Design a Game, But Can You Do the Paperwork?
mindful that it will have to change, especially if something doesn’ t go right.
And, just like making chili, remember that you can season to taste. Some
parts of the game will be “ meatier ” than others and you will want to adjust
your game to make those parts more pronounced.
Next step is to assemble the ingredients. Just as a chili needs ingredients,
a game’s design needs people and tools to make the game. You’ ll also
need the right equipment to make your game, just like you’ ll need spoons
and pots and pans and a stove to make your chili. However, you might not
have exactly what you need at hand. Sometimes you will have the team
and resources you want, sometimes you have to improvise with what is
available. That’ s okay; I hear cowboys made some pretty good chili with
nothing more than a campfire and a tin can.
Add these ingredients together. The beauty of chili is that it usually works
no matter how you prepare the ingredients. You can carefully cut and chop
everything or just throw it together in a big pot. Some game productions
are very methodical and well organized. Others are a mad dash to get all
of the elements into the game as soon as possible. Just make sure you
follow the recipe so you don’ t forget anything. Prepare the ingredients in the
right order. Always brown the meat before you add it to the pot. (I learned
that one the hard way.)
In chili, everything is brought to a boil and then left to simmer. Crunch time
reminds me of boiling: a frantic burst of energy and effort to get everything
in and running. However, if you boil for too long, you can ruin the chili, burn
the pot, and catch the stove on fire. Games and studios have been
destroyed by too much crunch time, so be responsible. Game polishing
and bug squashing reminds me of chili simmering. Chili isn’ t ready the
moment you finish assembling it. You need to take the time to make it just
right. Games, just like chili, need time to be iterated on, improved, and
seasoned. Bugs, code, art and design problems with the game, need to
be found and fixed. That takes time. Allow for that time, just like you need
to allow for cooking time with chili. Sometimes it’ s good to let the team play
with a part of the game to find out what works and what doesn’ t. I find that
chili always tastes better the day after you have made it.
Your chili may need something added to it at the last minute to make it
work. Unless you’ ve royally screwed it up, chili can usually be salvaged.
I ’ve seen troubled games get turned around at the eleventh hour.
However, I don’ t recommend making games this way. It can lead to
stomach upset. Chili can also deceive. It may look horrible, but still taste
delicious. Some games may not be perfect, or even pretty, but if they have
good gameplay they can still entertain. Good games and good chili satisfy
the soul as well as the stomach. (Or the head, if you think with your
stomach.)

-- 82 of 517 --

59 You Can Design a Game, But Can You Do the Paperwork?
You see? Making games is exactly like making chili. Take that, Japanese
game director2!
So you’ ve learned how to make chili, but what about making games? To
make a game, you need to start with a game design document. There are
actually four documents that will guide you through preproduction:
1. The one- sheet
2. The ten- pager
3. The beat chart
4. The game design document.
Each of these documents has a specific use during the preproduction/
production of a game and eventually all evolve into the same document:
the game design document, or GDD for short.
Ironically, a typical GDD is anything but short; many of them average over
300 pages. Now, this is not a hard and fast number. Some are much
shorter, some are much longer. The GDD for Grand Theft Auto would be
significantly longer than the GDD for Tetris.
Game designers have struggled with just how long a game design
document should be. There is a movement within the game development
community to keep the game design document as short as possible, for
a variety of reasons. In the end, I believe a GDD should be just long
enough to accurately describe what is going on in the game. However,
don ’t let that intimidate you. The other documents— the one-sheet, the
ten -pager, and the beat chart— are all steps to help you reach your goal
of a completed GDD.
There is no official format for any of these documents. What I’ m showing
here is just one way to present the information. For example, video game
consultant Mark Cerny presents his GDD material in a single page per topic,
bullet point format. He claims this simple presentation is easier for his team
mates to read and digest. Use what works best for you. Just remember, the
goal of great game design documentation is communication:
communication to the player, to your team members, and to your
2 I don’ t blame him for his bad analogy. I am sure they don’ t have very good chili in Japan.

---

## Sección 21: Foundations & Introduction

-- 83 of 517 --

60 LEVEL 4 You Can Design a Game, But Can You Do the Paperwork?
publishing partners. The clearer the communication, the easier it is going to
be to get your coworkers excited about your ideas. Got it? Good. Let’ s start
writing!
Writing the GDD , Step 1: The One -Sheet
The one-sheet is a simple overview of your game. It is going to be read by
a variety of people including your team mates and publisher, so you need
to keep it interesting, informative and most importantly, short. It should be
no longer than … you guessed it … a single page. You will find two
examples of one- sheets in Bonus Levels 1 and 2 . You can create them
anyway you’d like, just as long as you include the following information:
• Game title
• Intended game systems
• Target age of players
• Intended Entertainment Software Rating Board (ESRB) rating
• A summary of the game’ s story, focusing on gameplay
• Distinct modes of gameplay
• Unique selling points
• Competitive products.
Most of these terms are self- explanatory, but here are a few you may not
know:
ESRB Ratings3
The ESRB is a self- regulatory organization that enforces a rating system as
well as advertising and online privacy principles for software in the United
States and Canada. The ESRB’ s creation is similar to the comic book
industry ’ s Comics Code, which was created to enforce content and morality
guidelines in conjunction with concerned parent groups. However, the
ESRB ’s rating system more closely resembles that of the MPAA’ s movie
rating system (G, PG, PG-13, R, X). Games are reviewed and assigned a
letter rating according to content.
3 The ESRB is the American rating system. There are several other international systems
including the Pan-European Games Information (PEGI), the UK’s British Board of Film
Classification (BBFC), and Germany’s Unterhaltungssoftware Selbstkontrolle (USK). Their age
and content restrictions vary by country.

-- 84 of 517 --

61 Writing the GDD, Step 1: The One-Sheet
Currently, there are six ratings that can be assigned by the ESRB:
eC (Early Childhood): contains no material parents would find
inappropriate.
E (Everyone): may contain fantasy, cartoon or mild violence, and
infrequent use of mild language.
E10 (Everyone 10+): may contain more fantasy, cartoon or mild violence,
and mild language and suggestive themes.
T (Teen): may contain violence, suggestive themes, crude humor, minimal
blood, and infrequent use of strong language.
M (Mature 17+): may contain intense violence, blood and gore, sexual
content, and strong language.
AO (Adults Only 18+): not suitable for people under 18— may contain
prolonged scenes of intense violence, graphic sexual content, and nudity.
While the ESRB’ s guidelines are effective in informing parents what titles are
appropriate for their children, there is stigma attached to some of the ratings
within the development community and fanbase.
Many gamers consider eC to be for “baby games”, as this rating most
frequently appears on edutainment and licensed titles for young audiences.
At the other end of the scale, no brick and mortar retailer in America will
carry a game with the AO rating. It’ s the industry’ s equivalent to an X rating
in film. Therefore most publishers and developers won’ t even consider
making games for this rating and will take great pains to prevent their titles
from having this rating4.
Competitive products (or “ comps ”) are games that are similar to your
game design idea that have already been released. Listing comps helps
your reader understand what your game is going to be about. However,
make sure that when you choose your comps you pick games that people
are (a) very familiar with or (b) are successful. Publishers and marketers are
very aware of how well or poorly a game sold. If you choose a comp of a
game that did badly, a potential publisher may get scared off. Like I say,
“always pick a winning horse.”
Unique selling points (or USPs) are the “bullet points” found on the
back of the box. As a rule of thumb, there should be around five USPs.
(A number I developed when I realized you can only really fit five bullet
4 This happened on The Punisher (THQ, 2005), where the player could curb- stomp and feed
criminals into a woodchipper during interrogations. The scenes were so graphic that the
developer changed the camera angles and displayed the action in black and white to bring the
AO rating down to an M.

-- 85 of 517 --

62 LEVEL 4 You Can Design a Game, But Can You Do the Paperwork?
points on the back of a game box.) Remember “amazing graphics” and
“awesome story” or “sequel to the award-winning game” don’ t count. All
games should have or be these things (though only if it actually is a sequel
in the case of the last one). Besides, gamers can smell that marketing BS a
mile away. USPs should be the unique features that make your game stand
out from the crowd. Here are some examples. Let the spin begin!
• Multiple gameplay modes, including 256- player cooperative gameplay.
• Over 1000 tunes from popular bands.
• Explore an open world and 200 levels that allows the player to go
anywhere.
• Mow through your enemies using the blastinator, the skull-defiler, and the
awesome fire-ant anguisher!
• Experience lifelike physics and groundbreaking special effects with the
new Realitech engine!
• Download additional costumes and content over the Internet.
As you can see, USPs should get the reader excited about the features of a
game without going into lengthy detail about them. Exposing more of that
detail is what the ten- pager is all about.
Writing the GDD , Step 2: the Ten - Pager
Now that you have completed you game outline, it is time to expand upon
that information and flesh out the details.
The ten - pager is a “broad stroke” design document that lays out the
spine of your game. The intent is for readers to quickly understand the
basics of the final product without going into excruciating detail. Keeping
your ten- pager interesting may be the most important part of your
document. Remember, the people that are going to finance your game are
going to be reading this. Be sure to provide plenty of visuals but keep them
relevant. Don’t go overboard with fancy fonts and ornate layouts. Readability
is the key. Creating your ten- pager in PowerPoint or a similar program will
assist you with formatting. This will allow you to present it electronically
during a pitch meeting or print it out as a “leave behind” handout.
No matter which document you are creating, the goal is to make it
interesting enough so your reader wants to continue reading it. Ask yourself
as you write your ten- pager, “who is my audience?” There is a big difference
between a ten- pager that is being circulated around your team vs one that
is going to be presented to a marketing department. Here are some

---

## Sección 22: Foundations & Introduction

-- 86 of 517 --

63 Writing the GDD, Step 2: The Ten-Pager
examples of how you should skew the information in your ten-pager for
each audience type:
Production Team Marketing/Executives
Provide clear diagrams of gameplay Show exciting conceptual images
Use short, punchy sentences Text in bullet points form
Use specific terminology to get your Use vivid, descriptive examples
intention clearly across
Compare gameplay to appropriate Use successful, modern games as
games, even vintage titles comparative titles
While the above table shows two different audiences for a ten-pager, that
doesn ’t mean you have to write two different documents. Just remember
that both audiences will be reading it5.
Keep in mind that the 10 pages of a ten- pager are more what you’ d
call “ guidelines ” than actual rules. Feel free to go over or under6 the 10
page count as long as you succinctly communicate the basics of your
game design. By the way, you will find an example of a ten-pager in Bonus
Level 3 .
The Rule of Threes
Before we start writing our ten-pager, here is a very important rule of
thumb, that I use when creating a ten- pager:
THREE IS A MAGIC NUMBER
History has observed that all good things come in threes. Don’ t believe me?
Observe!
• The Holy Trinity of Christianity
• The Star Wars trilogy (the original good ones)
• Goldilocks and the Three Bears
• Three ’ s a crowd
5 Then again, sometimes you might want to make a version that caters to one audience over
another … it never hurts to be prepared.
6 Preferably under.

-- 87 of 517 --

64 LEVEL 4 You Can Design a Game, But Can You Do the Paperwork?
• Asimov ’s three rules of robotics
• Three Men and a Baby
• Getting to third base.
This rule will be coming up further on in this book, but for now,
my point is that people like things in threes; especially when
you are providing examples. The logic behind the rule of threes
is this:
• The first example gives the reader an idea of what you are talking about,
but can still mislead them.
• The second example gives the reader something to compare or contrast
the first example with.
• The third example gives another example that can complement or
contrast the other two, keeping your examples from feeling binary or
contrived.
• Anything past three just gets too long and boring: never be too long or
boring.
Now that you know the rule of three, use this power for good! When you are
listing out your examples in your ten- pager, group them in threes. History
will thank you.
Ten - Pager Outline
PAGE 1: TITLE PAGE
• Game title
• Intended game systems
• Target age of players
• Intended ESRB rating
• Projected ship date.
Game Logos: When creating your game title for your ten- pager, I suggest
creating a placeholder logo. Choosing the proper font for your title
allows you to convey the genre of your game quickly without the need for
pictures.
Fun time! See if you can guess the game genres suggested by the fonts
below.

-- 88 of 517 --

65 Writing the GDD, Step 2: The Ten-Pager
PAGE 2: GAME OUTLINE
• Game story summary
• Game flow
Game Story Summary: Using your one- sheet ’s story outline as a starting
point, flesh out your game’ s story. Keep in mind, your story outline still
shouldn ’ t be more than a few paragraphs long; but that shouldn’ t stop you
from telling the beginning, middle, and end. Your readers will want to know if
your hero ever rescues the princess! (He does.)
Game Flow: Briefly describe the flow of the game’ s action in the context of
the locations the player will find themselves in. For example: “Tomb Raider:
Legend is a third person action- adventure that finds archeologist Lara Croft
searching the jungles of Bolivia to the mountains of Tibet for the mysterious
Ghalali key; an artifact which may be the key to finding Lara’ s own long lost
mother. ”
This brief game flow outline tells the player who they are playing (Lara
Croft), the camera angle (third person), and genre of gameplay (action
adventure) as well as painting a picture of game locations (Bolivia and
Tibet) and the player’ s goals (seek the Ghalali key and solve the mystery
of Lara’ s mother).
Go ahead and list the environments that the player will find themselves in.
Make sure you point out any special gameplay that may occur in these
locations.
Other questions that should be answered by the game flow include:
• What are the challenges the player encounters and the methods by
which they can overcome them?
• How does the progression/reward system work? How does the player
grow as the challenges increase?
• How does the gameplay tie into the story? Does the player encounter
puzzles that grant access to new areas when solved? Do players have
to fight bosses that bar their progression?

-- 89 of 517 --

66 LEVEL 4 You Can Design a Game, But Can You Do the Paperwork?
• What is the victory condition for the player? Save the universe? Kill all of
the enemies? Collect 100 stars? All of the above?
If your game doesn’t feature a character, then concentrate on the
environments the levels of play represent. For example, while the puzzle
game Peggle has no main character, each level represents the challenges
of a “Peggle Master” who lives in a particular location.
If you are working on a sports game, are there any special events like bowl
games or stadiums that the player will compete in? If you are making a
driving game, concentrate on tracks or races. The key is always to take the
reader through the gameplay experience while creating vivid images of the
game ’ s locales and activities.
PAGE 3: CHARACTER
Up to this point, you have gone into some detail about the character
the player is controlling (or the vehicle they are driving) in regards to
the story. Here is where you want to highlight a few specifics about
your character. Age, sex, and other “ dossier ” - style background material
can go here … as long as you feel it does your character justice. Don’ t
go listing your character’ s blood type if it doesn’ t add anything to your
game. But if it does, then mention it.
Concept art is a must when dealing with characters. What does your
character look like?
What is the character’ s backstory? How did they end up in this
predicament? What is their personality type? How do they respond to the
challenges in the game? For example, when I worked on God of War, we
were constantly referring to Kratos as “ brutal ” and everything he did in the
game, from killing enemies to opening treasure chests, had to reflect that
personality.
How does all of this information about the character relate back to
gameplay? Does the character have any signature moves, abilities, weapons
or attacks? For example, Mario has his jump and stomp attack while Simon
Belmont from Castlevania has his whip. What other gameplay does the
character do? Driving, flying or swimming? Make sure you allude to every
major style of play in your game.
Show a basic map of the character controls. Find an image of the controller
(it ’s easy to find these online) that will be used to play your game, whether
it ’s a mouse and a keyboard or a Wii Remote, and show where the
controls are going to go. For example, here is a control map for a PS3
action game:

---

## Sección 23: Foundations & Introduction

-- 90 of 517 --

67 Writing the GDD, Step 2: The Ten-Pager
PAGE 4: GAMEPLAY
Remember that big list of gameplay genres from Level 3? Here is where you
apply those game genres to your game. Start with the gameplay and detail
out how the sequence of play is presented. Are there multiple story
chapters? Or is your game divided up into levels or rounds? Are there any
cool scenarios like driving while shooting or running away from a giant
boulder? Call attention to them. Include your big set pieces, as they will get
your reader interested in your game. Use your USPs from your concept
overview here. Don’ t forget to outline any minigames, and include a short
description and illustration. Diagrams are a great way to illustrate otherwise
hard - to -imagine gameplay concepts.
Once you have written about your gameplay, go into detail about any
platform -specific features. What game features capitalize on the platform’ s
hardware? Does your game utilize a memory card or a hard drive or is it
downloadable? Does it use a camera or a motion controller? Is your
multiplayer mode played split screen? Cover these details because they will
be important for readers to understand what technology requirements will be
needed to produce your game.
PAGE 5: GAME WORLD
Present some images and descriptions of the game world. List out
environments mentioned in the story. Provide short descriptions that outline
what the player will find there. How do these locations tie into your story?
What mood is being invoked in each world? What music will be used? How

-- 91 of 517 --

68 LEVEL 4 You Can Design a Game, But Can You Do the Paperwork?
are all of the locations connected within the game world as well as for the
player? Include a simple map or flow chart diagram to show how the player
would navigate the world.
PAGE 6: GAME EXPERIENCE
There is a fancy German word, gestalt, which translates as “the whole” of
something. Gestalt can be found being used by stuffy film and art critics to
describe the overall feeling of a work of art or the ambiance of a restaurant.
But don’t let the term’ s fancy- pantsy-ness fool you; the concept of gestalt is
fantastic when applied to video games. To make a game feel like a
complete experience, you need to account for the feel of the starting
screens, your cinematics, your music, your sound design, the camera …
in other words, the whole, or the gestalt of your game.
So now that you know what gestalt means, what is the overall gestalt of
your game? Humorous? Horrific? Thrilling? Hardcore? Foreboding? Sexy?
How is this feeling going to be presented to the player from the very
beginning of your product? Look to DVD movie menus and packaging
(especially deluxe editions) as inspiration, as they usually do a great job
of capturing the feel of the movie with just a little music, some fonts, and a
few visuals.
Are there any special modes or interfaces for your gameplay? These can be
special modes such as the “attack copter” gameplay in Call of Duty 4:
Modern Warfare or Rubi’ s “Rage Mode” in Wet.
Here are a few other important questions about the game’ s experience you
should answer for the reader of your ten- pager:
• What does the player first see when they start the game?
• What emotions/moods are meant to be invoked by your game?

-- 92 of 517 --

69 Writing the GDD, Step 2: The Ten-Pager
• How is music and sound used to convey your game’ s feel?
• How does the player navigate the shell of the game? Include a simple
flow chart diagram of how the player would navigate this interface.
(You ’ d be surprised how many games have lousy interfaces because the
team never thought about it!)
PAGE 7: GAMEPLAY MECHANICS
Terminology time! Learn these two valuable terms to sound like a real game
designer! They are: mechanics and hazards. What’ s the difference?
A mechanic is something that the player interacts with to create or aid
with gameplay. Here are a few examples of mechanics to get you started:
moving platforms, opening doors, rope swings, slippery ice.

-- 93 of 517 --

70 LEVEL 4 You Can Design a Game, But Can You Do the Paperwork?
A hazard is a mechanic that can harm or kill the player but doesn’ t possess
intelligence. Here are a few examples of hazards: electrified platforms, spike
pits, swinging guillotine blades, jets of flame.
Describe some (you don’ t need all of them; I find that three are sufficient at
this stage of your outline). What kind of unique mechanics are in the game?
How do they relate to the player’s actions? How will they be used in the
environment?
A power- up is an item collected by the player to help them with gameplay.
Examples include: ammo, extra lives, invulnerability, and so on. While not all
games use power- ups, you can still find them in many different genres of
games from platformers to racing games. Provide some examples of your
power- ups and what they do.
Collectibles are items that are collected (well, duh) by the player that don’ t
have an immediate impact on gameplay. These can be coins, puzzle
pieces, or trophy items. What does the player collect? What is the benefit of
collecting them? Can they be used to buy items, access new abilities,
unlock material later in the game? Will they earn the player trophies or
achievements?
If your game has an economy system, then briefly touch on that as well.
Describe how players will be able to collect money and buy things in the
game. Briefly describe the shopping environment (is it via a store or a
peddler, and so on).

-- 94 of 517 --

71 Writing the GDD, Step 2: The Ten-Pager
PAGE 8: ENEMIES
If a hazard uses artificial intelligence (or AI), then it qualifies as an enemy
character. What enemies do we find in the game world? What makes them
unique? How does the player overcome them?
Boss characters are larger, more fearsome enemies usually found at the
end of levels or chapters. Bosses are different because many of them have
unique personalities. They are the villains of the story. Who are these boss
characters? What environments do they appear in? How does the player
defeat them? What does the player earn for defeating them? Your readers
will want to know! Boss characters are fun and make for great visuals in
your document. Show ‘em off!
PAGE 9: CUTSCENES
Does your game have movies or cutscenes? How will they be presented to
the player? Describe the method by which they will be created including
(but not limited to) CG, Flash animation, puppet show7. Describe when the
player will be seeing these— during the game, at the header and footers of
levels, and so on. Make sure to mention any attract mode movies.
PAGE 10: BONUS MATERIALS
Hooray! We’ve reached the last page of our ten- pager! Here’ s where we
talk about any bonus materials or unlockables that will encourage the player
to replay the game. Give some examples of things the players will be able
to unlock. What is the player’ s incentive to play your game again? This is
where you would mention things like multiplayer, downloadable content,
episodic content, and so on.
7 Don’t fear, we will be covering all of these terms later on in the book.

---

## Sección 24: Foundations & Introduction

-- 95 of 517 --

72 LEVEL 4 You Can Design a Game, But Can You Do the Paperwork?
If you need to see an example of what a ten- pager looks like in action, then
just jump over to “Bonus Level 3 ” at the back of the book. Don’ t worry; I’ ll
be waiting for you.
The Game Design Document (and the Awful
Truth about Writing Them)
Welcome back. Now that you have some meat on your game design’ s
bones, it’ s time to flesh it out with a GDD. A GDD outlines everything that
will be in the game. It’ s a very important document that the entire team will
refer to during the production of your game.
Some people confuse a game bible with a GDD. Don’ t make this mistake.
A show bible is a term taken from television production. The show bible’ s
emphasis is on the rules of the world and the backgrounds and
relationships of the characters. This is an important document to create,
especially if information about your world and characters is going to be
shared with other individuals (like those working on marketing materials
such as websites, comic book adaptations, and merchandising) but
remember that the game bible has nothing to do with gameplay. That’ s
what the GDD is for.
The horrible irony is, even though it takes lots of time and effort to write a
GDD, no one on your team wants to read it. Why? Because most GDDs are
very long and intimidating documents filled with information ranging from the
useful to the arcane. When I was writing GDDs, I found that everyone was
interested in them, but no one wanted to take the time to read them. So, if
no one wants to read my design, then why am I spending all of my time
writing it?
Well, eventually YOU will need to read your own GDD. Creating
documentation will help you as much as your team mates. If you keep the
game “in your head” I guarantee there is going to be a moment when you
have too much to keep track of and you will get overwhelmed or even
worse, you will forget about your great idea like the gun that shoots fire
ants.
Unlike scriptwriting for movies, there is no “offi cial” form of what a GDD
looks like. Each game designer usually finds what works best for them. For
example, because I like to draw, I illustrated my design documents. I found
that my team mates understood concepts quickly when I drew pictures for
them. This is what a single page from my GDD looked like:

-- 96 of 517 --

-- 97 of 517 --

74 LEVEL 4 You Can Design a Game, But Can You Do the Paperwork?
Remember, this is the way I created my GDD, because I found it easy
(and fun!) to create and it effectively communicated my ideas to the other
team members. Not all designers will want to work this way, and finding
your own way is always best. As a starting point, there is a GDD outline in
Bonus Level 4.
However, it doesn’ t matter how you communicate your ideas, just as long
as you are clear. There are plenty of techniques that you can use to get this
information across:
• Storyboards. Just like movies, gameplay can be storyboarded. It
doesn ’t matter if you can draw detailed images or stick figures, there is
truth to the old saying “a picture is worth a thousand words.” If you are
having trouble coming up with ideas, you can use published movie
storyboards, comic books, or even the gameplay diagrams in this book
for inspiration.
• Diagrams. If you are worried about your art skills (you shouldn’ t be;
even a stick figure conveys information) then you can always diagram
out your gameplay examples. Use consistent shapes and colors to
represent elements of your game. Make sure you include a legend so
readers know what your icons and shapes mean.
• Animatics. Using your storyboards or diagrams as a starting point,
you (or an artist friend) can animate them with programs like PowerPoint
or Flash. While this takes more time, seeing your gameplay examples in
motion leaves very little room for misinterpretation.
• The beat chart. A beat chart is a document that covers the entire span
of the game. The advantage is that it allows readers to grok8 a lot of
information on one page, and to compare and contrast the flow of
information within the game. Hold on to your horses, cowboy; we will be
talking more about beat charts in a moment.
• The team Wiki. Rather than killing trees, why not publish your GDD
electronically on a Wiki? It’ s a great way for your team members to be
kept up to date on the latest and greatest game material, especially
since they can contribute to its creation. But be careful; as preproduction
moves into production, a Wiki can very easily become neglected by the
design team and become out of date.
A GDD is first and foremost about gameplay. How the character interacts
with the world rather than relates to it; a subtle difference, but an important
difference nonetheless. I find bibles important, especially when
8 Grok means “ to understand completely” and is a slang term created by sci- fi writer Robert
Heinlein. Now do you grok?

-- 98 of 517 --

The Game Design Document (and the Awful Truth about Writing Them) 75
communicating your game’ s universe to other interested parties, but it really
should be done after you have started to flesh out your GDD.
While writing the game design document, always keep this very important
thing in mind:
EVERYTHING IS LIQUID
This means that game designs are living things. Game designs change,
they flow, they mutate and evolve. If you don’ t let your game idea simmer
(like chili!) you may not think of a great idea or you may miss an opportunity
to create some truly great gameplay. Eventually, many of the things you
write in your document will become obsolete. At a certain point, writing
things down becomes counterproductive and it all becomes about finishing
the game. But you need a starting point and a GDD gives you that
launching pad from which to soar.
Just like with your ten-pager, you need to know who your audience is. This
is a bit easier as your primary audience are four types of people: the
producer, the designer, the artist, and the programmer. Knowing how these
different disciplines think and work and prioritize information is very
important to getting your point across. Remember, the MOST IMPORTANT
PART OF A GAME DESIGNER’ S JOB IS COMMUNICATION. Take the time to
talk to your team mates to find out what they are most interested in about
the design. If you have to adjust some information in your GDD’ s format
then do so. In the long run, your team mates will appreciate your effort.
Speaking of communication, remember that words are very powerful. Make
sure you provide very specific examples and terms for the elements in
your game design document, especially when referring to characters and
game mechanics. If an accurate term doesn’ t exist, then go ahead and
make one up!

---

## Sección 25: Foundations & Introduction

-- 99 of 517 --

76 LEVEL 4 You Can Design a Game, But Can You Do the Paperwork?
For example, when I was first working on Maximo vs. Army of Zin, I first
referred to the game’ s enemies, the Zin, as robots. I quickly learned that
everyone on my team had a different mental image of what a robot was,
ranging from C- 3PO to the Iron Giant. I realized that my team would be on
the wrong page unless I provided a clearer description for them. The image
I had in my head of the Zin was of a metal skeleton made out of riveted
brass with turning gears for guts. I started using the term “ clockwork
undead ” to describe the Zin. I found that by focusing my language to
something very specific, my team mates were able to better visualize the
image I had in my head.
You also need to be specific when thinking about how the gameplay unfolds
to the player over the course of the game. How this happens is called
progression.
Gameplay Progression
Introducing gameplay to the player can be a tricky thing. Here are several
suggestions on how you can start your game:
• The player starts from ground zero (or level 1) with no skills, gear and
abilities.
• The player has several skills that are presented to them at the beginning
of the game but have to be unlocked over time. The gating mechanism
can be experience, money or some other factor.
• The player has several skills, but has no knowledge of how to use
them … yet9.
• The player has significant power that they can use immediately … only
to lose it after a boss fight or initial confrontation.
• The player has significant power that they can use immediately … only
to have to “start back at zero” as the game story is structured as a
fl ashback.
Just as you need to know how your game begins, you also need
to know how it ends. This is where the beat chart comes in extremely
helpful.
9 The character with amnesia is one of the oldest cliches in video games. Unless you have an
exceptionally clever way to use this story point, I highly recommend not using it. Nothing
makes gamers’ eyes roll faster. Except for maybe the character realizing that “ it was all a
dream.”

-- 100 of 517 --

The Beat Chart 77
The Beat Chart
The beat chart is a handy- dandy tool that can not only help you develop
the content of your GDD, but also provides a “ map ” of the structure of your
game; this is extremely important when examining the gameplay
progression. Every beat chart requires the following elements:
• Level/environment name
• File name (level/environment designation)
• Time of day (in context of the game)
• Story elements for level
• Progression: gameplay focus of the level
• Estimated play time of level
• Color scheme of level/environment
• Enemies/bosses introduced and used
• Mechanics introduced and used
• Hazards introduced and used
• Power- ups found in level/environment
• New abilities, weapons, or gear introduced/unlocked
• Treasure amount and type the player can find
• Bonus material found in level/environment
• Music track(s) to be used in this level/environment.
Here is an example of a beat chart of a couple of levels from Maximo:
Ghosts to Glory. Italics designate a new gameplay feature:
Level: World 1- 1 Level: World 1- 2
Name: Grave Danger (Boneyard) Name: Dead Heat (Boneyard)
TOD: Night TOD: Night
Story: Maximo enters the Story: Achille’s drill has cracked
graveyard, fighting his way open the earth, causing lava pits
through undead creatures that bar to open up throughout the
his way graveyard
Progression: Player taught basic Progression: Player masters
movement, combat and defensive hazardous jumps and more intense
moves. Player learns how to collect combat
and map abilities
Est. play time: 15 min Est. play time: 15 min

-- 101 of 517 --

78 LEVEL 4 You Can Design a Game, But Can You Do the Paperwork?
Color map: Green (trees), brown Color map: Red (lava), brown
(trees/rock), purples (tombstones) (trees/rock), purples (tombstones)
Enemies: Skeleton (basic), sword Enemies: Skeleton (basic),
skeleton (red), skeleton (axe), skeleton (axe), sword skeleton
ghost, zombie (basic), wooden (red), sword skeleton (blue),
coffin, chest mimic skeleton (guardian), zombie
(basic), raven, ghost
Mechanics: Holy ground, Mechanics: Holy ground,
breakable tombstone, breakable breakable tombstone, breakable
torch, breakable crypt lid, breakable torch, breakable crypt lid, key
rocks, Achille key statue, key lock, statue, key lock, opening gate
opening gate (door), opening gate (door), enemy coffin, floating
(cave), prize wheel, treasure chest, platform, prize wheel, treasure
locked chest, hidden chest, end chest, locked chest, hidden chest,
plinth end plinth
Hazards: Unholy ground, Achille Hazards: Unholy ground,
statue, fall-away ground, skull swinging gate, skull tower, flame
tower, breakaway bridge, deep jet, lava pit
water, lava pit
Power- ups: Koin, koin bag, Power- ups: Koin, koin bag,
diamond, death koin, spirit, life up, diamond, death koin, spirit, life up,
flametongue, shield recharge, flametongue, shield recharge,
sword recharge, half health, full sword recharge, half health, full
health, iron key, gold key, armor up health, gold key, armor up
Abilities: Second strike, mighty Abilities: Second strike, mighty
blow, magic bolt, doomstrike, foot blow, magic bolt, doomstrike,
cheese throw shield
Economy: 200 koins, 2 death koins Economy: 200 koins, 1 death koin
Bonus materials: N/A Bonus materials: N/A
Music track: Graveyard 1 Music track: Graveyard 2
When you compare two or more columns of a beat chart together, certain
patterns start to emerge regarding the introduction of new enemies,
mechanics, items, and abilities. You can then identify deficiencies in the
design and start to move elements around. Filling in holes here, shifting
bloated areas there.
Here are a few things to look out for:
• “ Clumping ” : too many new enemies or mechanics being introduced at
once. Spread these out over the course of the game. Remember, the
first level of the game is always going to have several elements, so it
technically doesn’ t count.

---

## Sección 26: Foundations & Introduction

-- 102 of 517 --

79 Above All, Don’t Be a Schmuck
• “ Samey- ness ” : too many identical combinations of enemies and
mechanics. You want to mix things up to keep interaction fresh.
• Alternate your time of day and color schemes. If you have too many of
the same lighting or color schemes in a row, things are going to feel and
look repetitive.
• Alternate your music tracks. The player is going to get bored listening to
the same music over and over again.
• Problems in game economy: make sure players have enough money to
buy items to use in the world. Make sure the player doesn’ t have so
much money that it becomes worthless.
• Mechanics and enemies should be introduced in conjunction with the
items and abilities required to defeat them.
• When will the player have “ everything ” in the game? All weapons, all
skills, all vehicles, all armor upgrades, etc.? Make sure the player has
time to play with them. I try to make sure the player has everything by
75% through the game so the last quarter lets the player use all of their
cool stuff.
• As a rule of thumb, I try to introduce two or three new mechanics,
enemies, and rewards per level.
There is some debate as to which is better: a shorter, “ bite - size ” play
experience or a longer, more involved one. With the rise of casual gaming,
it seems that most players prefer shorter gameplay sessions (averaging
around 15 minutes a session). However, this trend may change in
a few years if gamers’ tastes swing back to the hardcore market. What
I believe matters the most is that you give your players their money’ s
worth.
I usually advise teams to aim for a minimum of 8 to 10 hours of gameplay
time for action-based games. This doesn’ t include replay time or time spent
watching cutscenes or reading dialogue. Remember, it never hurts to have
more content. If the worst comes to the worst, you can always cut content if
you run into production delays. We talk about some tricks to help determine
playing time in Level 9 .
Above All, Don ’ t Be a Schmuck
Creating all of these design documents is important but your designs mean
nothing if you aren’ t a responsible game designer. Some of the following
advice may seem like common sense, but I’ ve also learned that common
sense isn’ t always that common:

-- 103 of 517 --

80 LEVEL 4 You Can Design a Game, But Can You Do the Paperwork?
• A good idea can come from anywhere. I have seen many teams
suffer from what I call “not invented here syndrome”, a belief that
any idea from someone who isn’ t on the design team isn’ t valid. Pardon
my French, but only a colossally arrogant idiot would believe that. A
good designer always has his/her ear to the ground for great
suggestions from others. Always share your ideas and designs to
others. They may disagree with you, but you don’ t always have to
take their advice either.
• Make a decision and stick with it. While game designs are always
changing, the worst thing you can do is keep redoing and redoing work.
It ’s no crime to be a perfectionist, but there are many design issues that
can be thought out and designed on paper first before a single pixel is
rendered or a line of code typed. I have seen many projects drain away
time, resources, and team morale when design leads are unable to
commit to a direction.
• Update often. Send out e- mails, make comments on documents, and
use different systems like comments or page colors to make sure your
colleagues are kept up to date when changes occur.
• Tackle the tough ones first. Talk to your art and programming leads
ahead of time about how they work and what issues in your design they
think are going to be trouble spots. Don’ t leave these difficult design
issues until the last minute. Sort them out first. If they don’ t work out,
then you will still have time to make course corrections with your design.
• Trust your instincts. There are moments when you are going to have
an idea for something in your game that no one else is going to believe
will work. Sometimes you just have to dig in and fight for it. Pick your
fights though. You don’ t want everything to become a drama. That will
just turn off your team mates and you’ ll get branded as a prima donna.
However, don’ t be afraid to fight for a good idea. You may be right in the
end.
• Respect the abilities of your peers and be mindful of their
limitations. Certain team members are better at certain things. Work
with your producer to find out who would be the best person for the job.
The last thing you want is a team mate working on an aspect of your
design that they don’t have the talent for or an interest in. Conversely,
talk to your team mates about what they’d like to work on. You will
always get better results if your team mate is into what they are
working on.
• Save often and always. Accidents happen, vacations are taken,
babies are born during the course of production. Any of these things can
cause designers to not be around at a critical moment in production.
Make sure your designs are accessible to all the pertinent team
members, especially your producer. Use programs like Perforce, Alien

-- 104 of 517 --

81 Level 4’s Universal Truths and Clever Ideas
Brain or Subversion to store documents on a drive that is backed up
regularly. Don’ t keep the contents of the game in your head. Write those
things down. Make sure you have some system of filing so you can find
your work too!
• Stay organized. When creating files and documents, use naming
conventions that humans can understand. For example, if you have a
forest level, then make sure the word “ forest ” or at least the letter “ f ” is
part of the name. I find that using the “ European ” method of dating a
document (DAY, MONTH in text, YEAR; for example 27 JUL 09) is a lot
easier to decipher, especially when multiple documents exist. Naming
files by date is helpful, especially when your project spans longer than
a single calendar year. Make sure you use consistent naming of
everything in your game.
• Be prepared. Eventually, you will need ways for others to get around
your game. Have your game include level skips, a flexible cheat camera
so others can take screenshots of your gameplay and cheat codes that
enable invulnerability, grant power- ups and money, and so on. Talk to
your publishing/marketing partners about their needs early on in the
development of your game. Sometimes they will want additional content
like extra levels, costumes, bonus materials to market and sell the
game. Be prepared to create this material; don’ t leave it until the last
minute of production. Be aware that you may have to make a demo of
your game. Think about what you would want to have in your game
demo to show it off in its best possible light. Earmark potential content
such as specific levels or experiences that may be used for a demo later
down the line.
Arm yourself with this advice, and I guarantee you, your project will go a lot
smoother in the long run.
Now that we have some good habits and documentation examples, let’ s dig
into and talk about one of the pillars of game design, something I call the
Three Cs.
Level 4 ’ s Universal Truths and Clever Ideas:
• A game is like chili: it needs the right recipe, tools,
ingredients, and time to come out right.
• A game design document should be just long enough to
describe the action in a game.

---

## Sección 27: Foundations & Introduction

-- 105 of 517 --

82 LEVEL 4 You Can Design a Game, But Can You Do the Paperwork?
• Know your intended ESRB target rating and design
towards it.
• Work your way up from one- sheet to ten- pager to game
design document.
• Use tools like beat charts to help find problems early on
in your game design.
• No one likes to read long design documents, so find the
best way to communicate your design ideas to your team.
• Everything is liquid; your game design WILL change over
the course of production.
• Give your player their money’ s worth.
• Be smart when naming and organizing documents and
files.

-- 106 of 517 --

T
LeveI 5
The Three Cs,

---

## Sección 28: Part 1 — Character

While much of your game design is always changing, there are three
fundamentals that need to be established early in your preproduction. I call
them the “Three Cs” :
1. Character
2. Camera
3. Control.
If you change any of the Three Cs during the course of your production,
you risk massive problems with your gameplay, which may require extra
reworking, and you risk endangering your game. Don’ t give me that look. I
know this sounds dramatic, but so many game elements hinge upon the
Three Cs that changing one thing will have a ripple effect through your
entire game. I have seen teams catastrophically screw up and cancel
their game because of their failure to stick to the plans of their
Three Cs.
While we talked about writing a character in Level 3 , I am now using the
term in a different context. I will be talking about how the character is
presented to the player and the activities the player does with that character.
The very important rule about character design is:
FORM FOLLOWS FUNCTION
Let this rule be your motto when designing anything. It will come into play
more importantly later on in the book, but should be your guide especially
when designing your game character. There are several great books on how

-- 107 of 517 --

84 LEVEL 5 The Three Cs, Part 1—Character
to design a character visually1, so I won’ t go into great detail about this, but
let me pass on some of the high level things to keep in mind.
As you are creating your character, you want to think about his or her
personality. What are the three personality traits that you would use to
describe your hero?
Mario: courageous, bouncy, happy
Sonic: fast, cool, edgy
Kratos: brutal, vicious, selfish
Apply these traits to your character’ s physical appearance. Animators have
known for decades that the shapes you use for your character’ s design will
help communicate their personality. Circles are used to make a character
feel friendly. Squares are often used for strong or dumb characters,
depending on just how big your square is. Triangles are interesting, a
point-down triangle is often used to give a heroic character a powerful
frame. However, use that same point- down triangle for a character’s head
and they seem sinister. Try rotating, mixing, and matching shapes to create
compelling characters.
Another old trick that all professional character designers and animators use
is the silhouette. A strong, clear silhouette of a character is important for
many reasons:
• Tells us the character’ s personality at a glance.
• Helps distinguish one character from another.
• Identifi es “ friendly ” or “ enemy ” characters.
• Helps the character stand out against background and world elements.
1 Some of my personal favorites include: Disney Animation: the Illusion of Life by Thomas &
Johnston (Abbeville Press, 1984), The Art of Star Wars (Episodes I– VI) series (Del Rey,
1976– 2007), and Ben Caldwell’ s cartooning series (Fantasy! Cartooning and Action
Cartooning) (Sterling Publishing, 2005).

-- 108 of 517 --

85 Personality: Do We Really Need Another Badass?
For example, let’ s look at the silhouettes of the player characters of Team
Fortress 2.
Due to their unique silhouettes, you can immediately distinguish one
character from another. In the image above, the Heavy is clearly
distinguished from the Pyro from the Spy. Body language plays a huge part
in creating unique personalities. Not only does their silhouette give you a
snapshot of their personality, but it provides the player with a quick way to
recognize the character. This is important during gameplay so you know
who is gunning for you and can adjust your strategy— or more importantly,
who is in your sights. Boom. Headshot.
If you’re designing several characters that appear on screen at once, like in
multiplayer games, design them together. Use their silhouettes to make your
characters “fi t together” even when they are standing apart. This is an
especially useful trick when creating “duo characters” like Jak and Daxter
(tall and short) or Spongebob Squarepants and Patrick Star (square and
pointy) or Mario and Luigi (fat and thin).
Other ways to distinguish your characters from each other is with color and
texture. Super heroes in early comic books usually wore bright patriotic
colors like red and blue, while villains were dressed in darker, “ opposite
colors ” like greens and purples. In the original Star Wars, the heroes (Luke,
Leia and Han) wore black and white clothing. Darth Vader and the
Stormtroopers also wore black and white, but their costumes were hard
edged and metallic: fitting for the villains.
Of course what determines whether your character is good or bad, noble or
evil, is their personality.
Personality: Do We Really Need Another Badass?
I have found that there are three types of video game characters. The first
two are humorous and heroic. Here are a couple of tips on creating these
types of characters:

-- 109 of 517 --

86 LEVEL 5 The Three Cs, Part 1—Character
Humorous character
• Says funny things: Writing funny dialogue is hard. If you can’ t write
something funny, hire a professional writer.
• Does funny things: Do me a favor and try not to resort to farting or
burping. Not only is it puerile, which makes you look like you couldn’ t
think of anything funny to write, but all that gas flying around impacts
your ESRB rating.
• Funny doesn’ t always mean jokes: Remember the 1960s Batman TV
program? Batman was a funny character, not because Adam West was
goofy, but because he played the character deadly serious; as if wearing
a bat- costume and driving around in a bat- shaped car and pulling
bat-shark repellent out of his belt were the most normal thing in the
world. It was the contrast of this absurdity that made it so funny.
Heroic character
• Does heroic things: Saves the princess, the world, the day. Whatever
your hero does, make sure it matters. But you can also make sure your
character is good without becoming sappy.
• A hero is always good at something: Lara Croft is good at finding treasure.
Sonic is good at running. Simon Belmont is an expert with a whip. Make
sure your hero has a specialty, whether it’ s a weapon or a skill.
• However … no one is perfect: A good hero is relatable and that means
they have problems just like us. Phobias, unrealized ambitions,
relationship issues: they all make the character more real. But it is one
thing for a character to have these problems and it’ s another thing to
make it part of your gameplay. Indiana Jones is afraid of snakes. What
happens when he comes across a chamber full of them? It can’ t just be
business as usual. The hero of Trauma Center: Under the Knife (Altus,
2005) lacks self- confidence in his own abilities, which adds to the drama
of the story. In the MMO Champions Online (Atari, 2009) players may
choose disadvantages, such as a vulnerability to fire or cold attacks. I
guarantee that these disadvantages will end up inspiring some
memorable moments in your game.
Go back to your three character traits. Let them guide your character’ s
creation and everything he does in the game. How does he walk? Fight?
Open a door? Celebrate? What does he do when he’ s bored and waiting for
you to continue playing?
There is one other kind of character that is very prevalent in video games
nowadays: the badass2. Remember, video games are all about wish
2 The badass is known in more scholarly circles as the “ anti- hero.”

---

## Sección 29: Part 1 — Character

-- 110 of 517 --

87 Personality: Do We Really Need Another Badass?
fulfillment. And like you, I wish I were a badass. To stride into a smoky bar
room full of bikers— not that I have anything against bikers … on second
thoughts, let’s make that criminals— to stride into a smoky bar room full of
criminals and gain their immediate respect with nothing more than narrowed
eyes and a crack of my knuckles. Of course, I would have to kill them all,
because they are bad guys. But you get my idea.
Anyway, like a humorous or heroic character, a badass has to be carefully
created —otherwise you just end up with a lame character.
Badass character
• Does badass things, no matter if it is killing enemies or opening doors.
Does it with style.
• Isn ’ t a nice person. Sure, just about everyone in video games kills and
steals3, but badasses seem to enjoy it a little bit more. They go out of
their way to add insult to injury and then revel in the results.
• Says cool things, but they (almost) never shout. They are so badass,
they never need to. Just be careful: a stoic character can be easily
mistaken for one without a personality.
The general public often gives video games a bad rap for teaching kids
bad behavior. True, there are some game characters that I don’ t think
are great role models. Unfortunately, beating the audience over the
head with morality is generally considered bad form. If you have an
issue with this, don’t fret— there are subtle (read: sneaky) ways you can
steer your character towards being good. Good doesn’ t always have to
equal dumb.
If you are like me, and like your good guys to be good, here is a trick I
pulled in Maximo vs. Army of Zin to sneak a little morality into the game. In
the original game, the main character Maximo was just in the adventure for
himself. He wanted to rescue the princess, defeat the bad guy, and collect
as much treasure as possible. But to me, he didn’ t really come off as a
heroic character. So in the sequel, I wanted him to act like a hero and do
good things. (Keep in mind this was in the days before the “ morality- driven
character pathing” you find in games like the Fable series and Star Wars:
Knights of the Old Republic.) But I couldn’ t force the player to do good
things. That just didn’t feel right.
3 I think that Link from the Legend of Zelda games is about the worst person around. This
adorable little elf (or whatever the hell he is) runs around chopping everyone’ s gardens to
bits, breaks into their houses, steals anything that isn’ t nailed down and breaks all of their
valuable crockery! And yet everyone is so happy to see him!

-- 111 of 517 --

88 LEVEL 5 The Three Cs, Part 1—Character
Instead, we created victims that the player encountered being
menaced by the Zin enemies throughout the levels. It was up to the player
to rescue them or not (sometimes they had to go out of their way to do
so) — there was no penalty for not saving them, but if you did save them,
they would give Maximo a reward: a few coins here, an armor power- up
there. When play testing the game, players immediately started to
become concerned about these villager characters and would feel bad if
they didn’ t rescue them in time. While progression was still the player’ s
primary objective, they would make sure to try to save the villagers. After the
session, they would mention that they liked being a “ hero ”; exactly the
feeling I wanted them to experience.
Of course, the other side of the coin is presenting the player with bad
deeds to avoid. In inFAMOUS (SCE, 2009) the player doesn’ t have to be
bad, but if he chooses to do bad things (like steal from NPCs or kill
civilians) and becomes “ evil ”, the locals start to shout abuse and throw
bricks!
Let’ s Get Personal
Remember when we talked about naming characters back in Level 3? First
of all, make sure your character’ s appearance matches his name. Which of
the following characters do you think looks like a “ Dirk Steele” ?
I learned an important lesson about naming characters while playing the
classic computer game X- Com: UFO Defense. In the game, you command

-- 112 of 517 --

89 Let’s Get Personal
an international military team that battles an invading alien threat. The team
members you recruit are given rather non- descript names. Then I learned
that you could rename them. All of a sudden, my team of previously generic
soldiers suddenly gained a personality. And something funny happened …
I started to care about them. Whereas I previously didn’ t care whether they
died or lived, I now wanted to give them good weapons, heal them and
make sure they returned safely from each mission. What this taught me was
the power of customization.
If you aren’t using a licensed character, then why not let the player name
him/her themselves? Heck, even though Link is one of the most loved
characters in gamedom, the designers of every Legend of Zelda game
allow you to rename him. Anything you can do to let the player customize
their character furthers their feeling of ownership.
Many games are now offering the player greater and deeper customization
tools to allow them to make just about any character they want. Champions
On - Line, Saints Row 2, and Oblivion all offer incredibly deep character
customization tools to build very detailed heroes; you can spend hours
before you even start “ playing ” the game. Grand Theft Auto: San Andreas
(Rockstar Games, 2004) allowed the player to customize their character’ s
physique. If you ate nothing but fast food, eventually your character would
get fat.
Spore’ s (EA, 2008) creature creator goes even further: players have used it to
build a staggeringly creative array of fantastical creatures from gorgeously
detailed dragons to living game controllers! No matter what you build in the
editor, the anatomy and physical traits of your character affect the way your

-- 113 of 517 --

90 LEVEL 5 The Three Cs, Part 1—Character
creature moves and acts within the game. You don ’ t even need talent to
create your hero in the Drawn to Life series (THQ, 2007), which allows
you to draw your character from scratch even if you can only draw a
stick figure.
The level of player customization will only increase as time goes on.
Graphitti Kingdom’s (Taito, 2004) deep customizing tools allow you to insert
your own sounds and choose your character’ s animations. LittleBigPlanet
(SCEE, 2008) even lets you “ customize ” your character’ s emotional state!
Did you grab the prize bubble before your friend? Make your Sackboy smile.
If your friend got it first, you can make him frown … or scowl and “ reward ”
your friend with a slap to the head!
Customization doesn’ t begin and end with the player character: it extends to
choosing costumes, picking weapons, or decorating their home base. As I
always say “Every player likes to play house.”
Give the player options for personalization. Allow the player to customize
any of the following:
• Name: not just of character, but of weapons, vehicles
• Appearance: hair/skin/eye color, ethnicity, height, weight
• Clothing, armor and gear: style, color, texture
• Vehicles: paint job, weapon and tech load outs, decals, hubcaps, even
the thing that hangs from the rear view mirror
• Home base: furnishing, lighting, decorations
• Weapons: appearance, decoration, ammo loads, special effects
Speaking of weapons and equipment, give your character a signature
weapon and gear/appearance. In this case, they shouldn’t be customizable.
These weapons are part of the character’ s identity. Most licensed characters
use these signature weapons and gear to keep them unique. Can you
imagine a Ghostbuster without his proton pack? Dante without his
trenchcoat? Cloud Strife without his humongous sword?
Think about how the player is going to be using these items for gameplay.
Make them appropriate to the action. While I advocate form following
function, sometimes these items can help inspire the design to determine
the player’ s actions.
Because most video game characters are viewed from behind, it’ s important
to have something that creates the feeling of movement. For example, many
characters have an object swinging from their back. With Lara Croft it was
her ponytail. With Batman it was his cape. These both required unique code
to create. Talk to your art and programming leads to make sure these visual
markers are feasible.

---

## Sección 30: Part 1 — Character

-- 114 of 517 --

91 Let’s Get Personal
While video game character design allows for a wide variety of stylization,
the goal of many video game art directors is to create realistic characters.
But be aware of the phenomenon called the “uncanny valley”, where a
character doesn’ t look quite right to the viewer. It can be distracting for the
player, especially during cutscenes, if this occurs. Here are a few tips to
remember when creating realistic- looking characters:
Facial proportions. Realistic human characters look odd if given features
used to enhance personality traits. Watch out for features like large eyes,
exaggerated chins, and wide mouths that can make characters look
inhuman.
Movement. The more realistic the model, the worse animation tends to
look precisely because of the uncanny valley. Be careful of stiff- limbed
movement in the arms and shoulders. Hands can be particularly
troublesome as most game art can’ t support jointed fingers and treat the
hands as simple objects, which end up looking like hams. A human is a
very flexible being, so make sure your character moves realistically. Put the
effort into rigging your character’ s skeleton to be so.
Humanity. If a character looks extremely human (especially a non- human
character, like an alien or robot), people will expect it to do human things
and have a human personality. However, R2- D2 from Star Wars is a great
example of playing against this expectation.
Now, for the other side of the coin, here are some tips to remember when
creating stylized characters:

-- 115 of 517 --

92 LEVEL 5 The Three Cs, Part 1—Character
Facial proportions. Enlarge facial features such as eyes, chins, and
mouths to convey greater expression and range of emotion. You find this all
the time in Japanese games and anime.
Movement. If you don’ t have the time and money to spend on fancy
inverse kinematics, motion capture and dynamics, you might be better off
choosing stylized representations for your characters. The more stylized
your character, the more exaggerated the movements can be. Watch and
learn from old Tex Avery cartoons (for example) to see just how far you can
go with exaggerated character movement.
Humanity. The great thing about stylized characters is that they don’ t have
to be human. Anthropomorphic characters like Ratchet (and Clank), Sly
Cooper and Aero the Acrobat can provide just as much emotion and player
investment as human ones can.
Realistic or stylized? It’s a choice that comes down to: what is best for your
game? For example, the Team Fortress 2 team started building their game
with realistically designed characters and then did a 180 with character
designs inspired by artists J. C. Leyendecker, Dean Cornwell, and Norman
Rockwell by way of Pixar. It was a great choice; one that changed the tone
of the entire franchise for the better.
Finally, We Talk about Gameplay
We’ ve discussed what the player looks like, now let’ s talk about what he
does. All gameplay flows from the main character. You have to think about
the player’s relationship to the world. How tall is your character? How tall or
short are all the other characters and enemies in relationship to the main
character? How long is the character’ s reach? If your character is a quadruped
or a vehicle, how long and wide is it? As you create your character, you
determine these proportions. These proportions become the basis of the
character ’s metrics: the cornerstone of your gameplay and design.
But before we dive into metrics, let’ s talk about fencing.
When you fence you learn how far you travel when you step forward, how
far your weapon goes when you extend your arm. A fencer learns that those

-- 116 of 517 --

93 Finally, We Talk about Gameplay
distances get greater as you lunge at an opponent. It’ s important to know
these distances to help you gauge how far away you are from your
opponent and how close you have to be in order to score a touch on them.
The fencer gets accustomed to these distances and adjusts their fencing
style to compensate for them.
Video game players do the same thing. Metrics are especially important to
players as they use them to gauge movement and jump distances “by eye” ,
whether they know it or not. When playing, they get a feel for what is and
isn ’t obtainable and anything that changes that constant will throw off the
player and feel wrong.
Determining metrics start with the basic height of the character, the speed
that character travels, and the height that the character can reach. I always
use the hero character as a yardstick for the rest of the world. For example,
in Maximo: Ghost to Glory, our measurement was called “1 Maximo unit” ,
which was obviously based on the height and width of the main character.
All game distances, widths and heights were expressed in this way.
Use metrics to determine:
• Height: the height of the player character
• Width of passage: usually wider than the player character
• Walking speed: how far the player travels per second or unit of time
• Running speed: same as above, but faster
• Jump distance: usually farther than a walk, but not as far as a run; can
also be based on the player’ s width (such as 5 player units across)
• Jump height: based on the player’ s height— a jump is half the player’ s
height, while a double jump can be twice as tall as the player
• Melee attack distance: usually not much farther than the length of the
player ’s arm and weapon
• Projectile distance: this can be as short as the player’s reach or width
to as far as the player can see

-- 117 of 517 --

94 LEVEL 5 The Three Cs, Part 1—Character
The cliff ledge shown in the above graphic is obviously completely
unobtainable with a normal jump/double jump distance. The player will know
that they won’ t ever be able to reach this height and will look for another
way to get to their destination.
When determining metrics, you will have to work with a programmer to
determine where and how the character is going to interact with the world.
This is done by determining collision— the code calculates where and how
the character is interacting with the world. The more collision points have to
be calculated, the slower the code runs. In some cases, collision is
determined from a primary point on the character model. There are
generally three locations on a character from which the player can interact
with the world: the head, the feet and the center of the body.
The head: while useful for attaching hats, treating the character’s head as
the main collision point can cause problems, especially when determining
ground collision. The player character can appear to not be rooted to the
ground, giving the appearance of slightly floating.
The feet: while detecting collision from the feet seems like the logical
location, it can cause issues if it is used to determine where a power- up
is collected (for example if it is in mid- air, the player will have to jump to
collect it).

---

## Sección 31: Part 1 — Character

-- 118 of 517 --

95 Why Walk When You Can Run?
The torso: IMHO, this is the best place to determine the character ’ s collision
with the world. It provides enough coverage for both halves of the body and
feels “ right ” when the player runs or jumps through an item for collection.
Why Walk When You Can Run?
Let ’s talk about bipedal characters for a moment. Every character walks.
But many gamers will complain if a character walks too slowly. Instead,
trying making the walk work for you. If you really want to screw with your
players, here is something I have learned.
Westerners are used to reading things left to right. You can use this impulse
to get players to go where you want them to go. In the image above,
players will usually go towards the interesting object on screen (in this case
the tree) rather than going to the left where I have hidden a goodie.
Why have I done this hateful thing? Because making the player walk to the
left makes people feel “ill at ease” and can be used to psychological effect.
If you really want to mess with your player’ s head, make them travel to the
left for the entire level. Most of them won’ t be able to figure out what is
“ wrong ” about the level, just that something is (quite literally) not right.
While it is fun to mess with the player’ s head, there is something that many
designers forget when designing their levels. If you are describing the
action in your level walkthroughs4 and you find yourself telling your colleagues
“and then the character walks through here” , this should set off very loud
klaxons. Why? Because:
4 Which we will talk about in Level 9 .

-- 119 of 517 --

96 LEVEL 5 The Three Cs, Part 1—Character
WALKING IS NOT GAMEPLAY!
Don ’ t fall into the trap of assuming your player will find gathering collectibles
as interesting as you find placing them. While alternating the pace of your
action is good, having your player travel for long stretches, no matter how
much beautiful art they look at, is just boring. Keep it interesting even if they
are just walking. Why have this:
When you can have this?
They both do the same thing: get the player from point A to point B.
However, the second path is more interesting as it allows the player to use a
variety of moves to traverse the terrain rather than just walking.
I often ask the developers I work with “ do you really need a walk? ” While it
would seem unusual to not have a walk cycle for your character, I have found
that a player will always choose a faster move over walking, be it jumping,
rolling, or dashing. For example, when we were making God of War, Kratos
could do a tumble/roll move. More often than not, the designers would roll
their way around the levels even though it looked stupid. We did it because it
felt faster than walking.
What I’ m ultimately getting at is that if you are going to have your player
walk, then make sure it is fast enough to be useful.
Where a walk does come in useful is when navigating edges and ledges. I
have found that most players will walk to an edge because they are afraid
that they may fall off. There are other tools that you can use in conjunction

-- 120 of 517 --

97 Why Walk When You Can Run?
with the edge— such as a teeter and hoist (more on those in a moment)—
but the walk is what the player will use most as it makes them feel safe and
in control. There is a trade off to the teeter. Players can’t attack during a
teeter state (at least, I’ ve never played a game that has allowed you to) and
a teeter reduces the player’s movement to zero, which is useful when
keeping the player from falling to their death, but not so useful for getting
away from that fast- approaching enemy! So maybe having that walk cycle
isn ’t such a bad thing after all.
If your character is a vehicle (as in a driving, flying, or rail shooter), or rides in a
vehicle, remember that driving (or flying or jet-skiing or whatever) should always
move faster than the player’s standard walk. When dealing with larger than normal
characters such as cars, hovertanks, motorbikes, etc., you will have to deal
with weight if you want to make them feel realistic. A car, for example, swings its
back out as it goes around a curve. If you don’t have this weight built in to your
basic movement and metrics, a vehicle is going to feel “floaty” and not realistic.
Weight in general makes a character, be it a car or a person, feel like they
are connected to the world. But with weight comes sliding and skidding.
These need to be compensated for in the player’ s metrics. In some games,
particularly platformers, the skid is part of the player’ s movement. In Little
Big Planet, a player can very easily skid off of a platform or ledge if they
don ’ t land in the right place.
I ’ m torn about the usefulness of the skid. I find them to be very frustrating,
but without them, the character movement feels stiff and artificial. Ultimately,
you need to choose what is best for your own game5.
Whether your game character is a person or a vehicle, a question you
should ask yourself is: what is the speed of my gameplay? Fast or slow?
If your game is fast, then the majority of your gameplay should be fast. This
includes:
• Running • Bouncing
• Jumping • Fighting
• Spinning • Flying • Falling
• Driving
• Shooting
Slow -moving moves include:
• Walking • Swimming
• Ducking • Hiding
• Crouching • Hoisting
• Sneaking • Climbing
5 Which seems to be a running theme in this chapter, doesn’ t it?

-- 121 of 517 --

98 LEVEL 5 The Three Cs, Part 1—Character
I find it best to alternate between fast experiences and slow ones to keep the
game ’ s pacing interesting.
When thinking about running, ask what is it being used for? I prefer
gameplay where the run speed is drastically different than the walk. The
Resident Evil series uses the run not only as a way to move fast but as a
way for the player to push through and escape from slow-moving zombies.
The dash is the run’ s cousin. A dash is usually a faster run that expires after
a time limit. It is often used to get through timing puzzles such as closing
doorways and fire jets, or as a
combat move either to escape an
enemy ’ s attack or drive home an
extra - powerful blow. To prevent your
player from exploiting a dash, give it
a cool down: a short period of time
(usually a few seconds) before the
player can use the dash move again.
Let ’s slow down and talk about “slow walking” , aka stealth.
I admit I have mixed feelings about characters moving stealthily in games.
As a general rule, I don’ t like the player
to move slowly, unless the entire game
(or a whole experience, like a level) is
based on stealth gameplay. Whenever I
have played games with stealth mixed
in (not dedicated) I always end up
running around blasting away at the
enemies because I get tired with
moving so slowly when I could be
moving quickly instead. As this isn’ t the
intention of the game, I usually lose a
lot of lives playing like this6. But I know my frustration comes from the
character moving agonizingly slowly.
6 When you are designing a stealth game, make sure your character looks, or at least acts,
stealthy. I once played a really well made game that featured a burly barbarian hero as the main
character. I fully anticipated the game to be a brawler, since the hero was armed with several
huge weapons that allowed me to cut the enemies up into messy chunks. However, as I played
the game, I continually found myself dying in battle after battle. I got so frustrated with the
game that I stopped playing it even though I really wanted to like it. I mentioned my regret
to a coworker and he said, “ You aren’ t playing the game correctly.” Before I could make him
take back such a dire insult, he said “ It ’ s not an action game, it’s a stealth game.” Armed with
that information, I replayed the game stealthily and eventually finished it. Which I may have
never otherwise done due to the mixed signals the game gave the player.

---

## Sección 32: Part 1 — Character

-- 122 of 517 --

99 The Art of Doing Nothing
When you make your character move stealthily, make it a significant
difference in speed. It’s the same principle as walking vs running. A creep
is useful if the player is ducking or is behind cover, is getting into position to
snipe, or for humor such as when the character is trying not to wake a sleeping
dragon. The creep move should be a mode that the player can activate at
any time, but a creep works best when it is given some context.
But creeping aside, I think that the instinct to make stealth gameplay
automatically equal a slow- moving character is incorrect. Have you ever
seen a SWAT team member or ninja move around? They don’ t really creep
as much as move in short bursts. Stealth comes into play when they have to
wait or hide as something happens or some clueless guard with a very
slitable neck passes by. This is where the tension that defines good stealth
gameplay comes from. The gameplay of waiting. We’ll talk more about
stealth combat gameplay later.
The Art of Doing Nothing
Even slower than stealth gameplay is no gameplay. However, just because
the character is standing still doesn’ t mean he has to do nothing. An idle
is an animation that plays while a character isn’ t moving, triggered after
a few seconds of the player being idle. Did you see that? How the word
describing the player’s in- action is also the name of the move? Pretty clever,
those early video game designers.
While idles were probably in other games before, the first idle that made an
impression on me was in Sonic the Hedgehog. When the player stopped
running, Sonic would look out at the player with an annoyed look on his face
and tap his foot impatiently. That guy wanted to run! Pretty soon humorous
idles were a staple of platform games through the 1990s. But they aren’ t
just for laughs; an idle can convey personality and even a little narrative to
the player. At the very least it provides some movement on the screen even
when nothing else is going on. Keep in mind, other than adding character or
humor, idles (usually) have no gameplay benefit whatsoever. You don’ t gain
ammo, experience or money by being idle7. That’ s ok, some things should
just be for fun.
Remember, when creating idles you don’ t want to create long and involved
animations, as the player can press a button at any time and interrupt the
idle. In fact, any idle that creates a poor transition into the player’ s moves
will cause a problem, no matter what the length. Keep them short and
snappy. Don’ t have any ideas for idles? Here are a few to start with:
7 Some more recent games do allow you to gain back health for being idle, but that’s just a
by-product of not being shot at and has nothing to do with the idle itself.

-- 123 of 517 --

100 LEVEL 5 The Three Cs, Part 1—Character
• Twirl, reload or “ shoulder ” weapon
• Stretch and jog in place
• Glance around or be startled at an imagined noise
• Shiver with cold or wipe sweat from their brow
• Knock dirt from the soles of their shoes
• Adjust armor or pack
• Crack neck or pop knuckles
• Play air guitar or do a little dance
• Check a map or guide or talk on a cell phone
• Whistle and rock on heels as if waiting
• Eat or drink something
• Scratch self in embarrassing location
• Check watch
• Yawn or fall asleep.
Might as Well Jump
Of all of the basic moves in video gaming, the jump is the most mysterious,
the most majestic, and the most misunderstood. In order for us to fully
understand the jump, let us take a look at one with the help of my patented
“ slo - mo ” graphic.

-- 124 of 517 --

Might as Well Jump 101
1. The player is at rest: this is when the player is walking, running, and
so on.
2. The player presses the action button. The jump has to happen
immediately, as so many jumps are the player’ s response to danger.
In some cases, the jump may need a brief animation to sell the
anticipation of the leap, but this animation should be kept as short
as possible.
3. Make sure the jump rises to the maximum height quickly.
A. Should the player be given the opportunity to do a double jump,
allow them to do so before reaching the apex (top height) of the
jump. Any time after the apex feels weird.
4. Falling is like jumping in reverse. Don’ t make the fall last too long or
it will feel “fl oaty”, which is a negative sensation to the player and
screws with the player’ s sense of metrics— unless the player has
some sort of power- up or ability that allows them to glide or float
down to safety.
5. The landing can take a little longer than the jump, but it needs to
“ stick ” to make it feel good and solid. I am not a fan of jumps that
end in skids or slides as it is easy for a player to make a jump
and still slide off the edge of a platform. This is one instance
where I have found that “game physics” works better than
“ real world physics.”
Let ’ s take a second to talk about physics. Should you model your game
physics on the real world or use “ game ” physics? Or should you abandon
the laws of physics entirely? Good questions! And you better know the
answer!
Since Sir Isaac Newton did all of the hard work back in 1687, one would
assume this would be easy, right? Real world physics are based on the
laws of physics we live with every day. But a certain fidelity to real life is
necessary to sell real world physics, and trying to create something that
precisely emulates real world physics usually ends up inferior to something
tweaked. For example, gravity in games is not 9.8 m/s2 no matter what the
real world says. In fact, some games even use different gravitational
constants on different objects!
This is where game physics come into play. The programmers “ tweak ”
the real- world values to fit the gameplay needs. Running speeds, jumping
heights and distances, and collision bounciness always feel better when
adjusted. Most people in the real world can’ t jump higher than their own
waist, while the average platform game character can easily double their
own height in a single bound.

---

## Sección 33: Part 1 — Character

-- 125 of 517 --

102 LEVEL 5 The Three Cs, Part 1—Character
What if your game takes place in space? Or occurs on a planet with low or
high gravity? Or you can make exceptionally powerful jumps like Jumping
Flash? You’ ll need to work all of this out ahead of time to make sure your
metrics match your physics. Tackle this early and don’ t change it, or you will
cause huge problems.
OK, let’ s jump back to jumping. As platform games were the most
popular game genre in the 16- bit days, you can understand how the art
of jumping has been taken to its furthest limits; more than any other
player character movement. By my count, there are five major ways to
jump:
• Single jump: The player jumps once— either vertically or horizontally.
• Double jump: a second vertical or horizontal jump that is chained after
the initial jump.
• Triple jump: a third jump that can be done after the second jump,
usually requiring something for the player to bounce off of and most
often horizontal.
• Contextual jump: an “ automatic ” jump that happens when the player
approaches a pre-tagged area such as a ledge.
• Wall jump: a special case jump that is performed after the player
jumps “ into ” or towards a wall. If the player presses a button as they
collide with the wall, they will jump off of the wall in the opposite
direction. The player can gain altitude by chaining wall jumps which
allows them to “ climb walls ” by wall jumping between two opposite
facing surfaces. A wall jump can be treated as either a “ natural move ”
that the player has from the beginning of the game (like in Prince of
Persia) or it can derive from an earned skill or equipment (as in Ratchet
and Clank).
Even as the player hurtles through the air, there are design decisions to be
made. Some games treat jumping realistically and don’ t allow the player to
change their trajectory after they jump, while others allow the player to
course correct the character. Other games will allow the player to jump
higher and further depending on the amount of time the button is
depressed.
After years of making “ hoppy- skippy ” games (as I call them) I have
discovered some curious things about jumping. Players usually do not jump
from the edge of a ledge, but from a little way back. Edges make players
nervous. They leap from an area I call the “jump zone”, which can be up to
half a jump’ s distance to the very edge of the platform.

-- 126 of 517 --

Might as Well Jump 103
The target the player is trying to hit is a safe spot about half a jump length
away from the edge of the opposite ledge. However, landing right on the
edge makes a player nervous! This means when you create your jump,
make sure to add one more jump length to your distances to make the
player feel confident and secure when landing.
For smaller and floating platforms, the target should be the dead center of
the platform— make sure there is enough space for them to land. There’ s
not a lot of room on most floating/single platforms, which is why I don’ t
recommend having a post- landing slide animation to your jump.
When a player gets nervous, they tend to jump again. If their target is too
small, they will usually jump themselves to their death. Save the really small
platforms for expert jumping puzzles. (Usually found late in the game.)

-- 127 of 517 --

104 LEVEL 5 The Three Cs, Part 1—Character
Hoists and Teeters
Hoists and teeters are two very
useful tools for players to help them
get around and avoid dying. The hoist
allows the player to reach a height
slightly higher than their jump allows.
The teeter acts as a warning to the
player that they are too close to an
edge and may fall.
Not all games have or need hoists
and teeters. However, if you are
going to use these moves, make
sure you account for them when
creating your player metrics. A hoist
generally adds anywhere to a full
body length of the character to their
jump height.
When a player is in a hoist position
but hasn ’ t moved back up onto the
ledge or dropped down to the ground
below, it is called a hang. Some games
will bypass this state entirely by having
a player automatically hoist themselves
back up, while other games use the
hang for gameplay, allowing players to
hang from objects and surfaces while
waiting for timing puzzles and other
hazards to pass on by.
I have found hoists, hangs, and teeters really good
opportunities to add character to your player. For example, you
can have a character react humorously to the fact that they are
hanging for their life or about to fall off a cliff! Remember, these
animations need to cycle as the player may leave their character
literally in a cliff- hanger!
You will have to be careful of what I call the “ Wily E.
Coyote effect. ” Remember in those old Chuck

-- 128 of 517 --

What Goes Up, Must Fall Down 105
Jones8 cartoons where Wily E. Coyote chases the Road Runner off of a cliff?
And then he stands on thin air for a beat before he plummets down into a little
poof of dust at the bottom of a canyon?
What Goes Up, Must Fall Down
Speaking of falling, let’ s talk about it. Using the power of the slo- mo
graphic, let’s examine a typical fall off of a cliff.
1. The player will usually approach an edge with caution. If they plan on
jumping, they will usually do it from the jump zone.
2. Does the character teeter? This acts as a warning to the player, but it
can also disrupt the player’ s control.
8 Charles “ Chuck” Jones 1912– 2002, director and animator of some of the best cartoons in
existence including What’s Opera, Doc?, Duck Amuck and How the Grinch Stole Christmas. He
created the characters of Road Runner and Wily E. Coyote among others. Shame on you for
not knowing this.

-- 129 of 517 --

106 LEVEL 5 The Three Cs, Part 1—Character
3. Give the player a chance to jump out of a teeter so they can get to
where they want to go. If the result of missing a jump is death, let them
see the bottom/death zone as they make the jump. Blind leaps of faith
make players very nervous.
4. Does the character have a hoist? If so, the player can use the hoist to
abort a jump or as a “last ditch effort” save option to keep from falling
to their death. As some games use distance to ground as a variable to
determine whether the player will take damage upon falling from a great
height, a hoist can make the difference between a safe drop and death.
5. When the player is falling, do they have control over the fall? Many games
allow for course correction and some allow for flat- out in - air maneuvering.
Make sure the animation of the character falling communicates whether
they have control or not. An out- of- control fall may have the character
flailing about or screaming in terror while an in - control fall may re - use the
same animation at the end of a jump.
6. Can the player “air jump” out of a fall? How will this ability be
communicated to the player? Make sure there are plenty of gameplay
situations that capitalize on this move.
7. What happens to the player when he hits the ground? Does he land on
his feet like a cat and take no damage? Does he land hard on the
ground and have a longer recovery animation, which would make him
vulnerable to approaching enemies? Does he bounce off the ground
like a rag doll and die? Make sure the player knows early on in the
game whether or not there is any penalty for hitting the ground.
8. Whether or not your player take damage from hitting the ground, let
them recover quickly so they can get back in control of their character
and get moving again. Nothing is worse than waiting for a “get up”
animation to finish playing.
Me and My Shadow
As you are building your character in the game, it is important not to forget
the player’s shadow. Having a shadow provides several benefits to the
player:
• A shadow acts as a reference point in 3-D space for the player—
particularly important when gauging jumps.
• A shadow grounds the player in the world; it adds to the illusion that the
character has weight and mass.
• A shadow helps players with edge detection. If their shadow doesn’ t
“ lie ” on ground, they will get one more hint that it’s not meant for them to
stand on.

---

## Sección 34: Part 1 — Character

-- 130 of 517 --

What Goes Up, Must Fall Down 107
• A shadow conveys lighting and mood. In some survival horror games,
the shadow can be a disquieting distraction to the player, literally making
them “jump at their own shadow.”
• A shadow can be used for gameplay: some games are starting to use
shadow detection as part of their enemy’ s AI. Especially important for
stealth gameplay.
• If you don’ t have a shadow, you don’ t have a soul! (At least according to
Egyptian mythology!)
There are many ways to technologically represent a shadow in video
games. It can be a complex shape that matches the silhouette and motions
of the player character, it can be a rough form that follows the player, or it
can be a simple black shadowy spot (or drop shadow) on the ground.
While a drop shadow looks less realistic, it is very effective as a device to let
the player know precisely where they are in the level, particularly while making
jumps, where the player can use the drop shadow to determine where they
are going to land. However, some gameplay mechanics, like small or moving
platforms, can make using the drop shadow as a guide tricky — just one more
instance where visual realism can be at odds with gameplay.
No matter what your character’s shadow looks like, you should still get one
in, preferably during the early stage of your production. A few things to keep
in mind about shadows:
• Watch out for your character’ s shadow being in two places at once.
While this phenomenon does happen in real life, it will look like it is a
bug in a game.
• Watch out for your shadow “ casting ” itself through surfaces, especially
onto platforms that are above other geometry.
• Shadows react in different ways under different lights and on different
surface textures. While you don’ t have to adhere to reality, it may seem
weird to a player if a shadow shows up underwater.

-- 131 of 517 --

108 LEVEL 5 The Three Cs, Part 1—Character
The Water ’ s Fine … or is it?
Speaking of water, swimming can still be a difficult thing to design gameplay
around. In the earlier days of game design, water traversal was avoided
altogether, resulting in a long tradition of “ water = death ” in video games.
If you choose to go that route, keep your messaging consistent otherwise
the player will get confused. Don ’ t expect players to be able to differentiate
between water that is safe and water that is deadly. My rule of thumb is that
water within a single environment should be one or the other. There is no
deep end to the pool. It ’ s either all shallow/safe or deep/deadly. If you
must have transitional water, give your player adequate cues and warnings
of the danger of swimming too far. One game I worked on had a shark
fin appear and swim near the player when they strayed out too far. If
they ignored the warning and kept going, they got chomped on by a
great white!
However, water gameplay can be quite interesting as it lends itself to
exploration and exotic environments. But you must always consider several
gameplay rules when considering swimming:
• How does the player enter/exit water? Always make sure water entrances
and exits are clearly marked for the player. This can take the form of
clearly marked ledges, sloping ramp geometry, or those little pool
ladders —just as long as the player can tell “this is where I get out.”
• Can the player swim under water or just on the surface? Sometimes the
ability to dive isn’ t given to the player until later in the game. Sometimes
not at all.
• If the player can swim underwater, can they stay underwater for an
extended period of time? Is there some sort of a timer that gauges air
supply or pressure that prevents the player from staying underwater for
extended periods of time?
• Does air matter? Can a player die due to lack of air? Do they need to
collect power- ups or have some other method to sustain their air supply?
• Can the player attack underwater? Do they carry their weapon and swim
at the same time? A typical swim stroke may look strange or cause
sorting issues if the player is carrying a weapon at the same time.

-- 132 of 517 --

Be Kind to Our Four-Legged Friends 109
• How does the player react when they reach the bottom? Can they glide
along the bottom? Or do they bob back towards the surface?
• Can the player do any actions underwater that they can do on land?
Can they pull switches, or operate those submarine hatches you always
seem to find in underwater levels?
• Does the player travel at a consistent speed or can they “swim faster?”
• Changing directions or elevation underwater can cause problems for the
camera as it attempts to match the player’s orientation. Quick
underwater moves can cause a camera to flip around as it struggles to
keep up with the character.
Be Kind to Our Four - Legged Friends
Not every game features a bipedal character. The beauty of video games
is that a player can be a dog, a spider or a spider-dog … just about
anything. But when creating non- bipedal characters, there are a few things
to keep in mind:
• Quadrupeds need a wider turning radius: build these wider- than - normal
lengths and turning times into your metrics.
• Four legs generally means a character can move faster than a bipedal one.
Take into account the character’s acceleration and deceleration.
• A longer character means more body mass to hang off of an edge or fill
up an environment. Adjust your character to world metrics accordingly.
Be doubly mindful of the Wile E. Coyote effect.
• Many quadruped characters are shorter than average human height.
Make sure you account for this difference when having characters
perform attacks or simple tasks like opening doors or chests.
Let me reiterate: the key to avoiding problems with a quadruped character
is to make sure your metrics are built around them.

-- 133 of 517 --

110 LEVEL 5 The Three Cs, Part 1—Character
Using All of the Parts
As you are designing your character, try using him or her to communicate
information to the player. Think about it: a player spends the majority of their
time looking at the character. What better way to display their in- game
status? Personally, I like this method as I find it extremely clear as to what
the player’s status is at all times. All aspects of the player can be treated
visually. Here are some other ways to communicate information through
visuals and animation:
Movement
• Give subtle clues, like the character’ s head turning to look at interesting
and interactable items in the world.
• Make a character automatically reach out for pickups or door
handles.
• Make your character respond positively to favorite things, negatively to
perilous things. Maybe go as far as to refuse to go into sure death
situations.
• A player’s health can be reflected by their movement. In the
Resident Evil series, wounded characters will limp and move at a
reduced speed.
Appearance
• Make a player’ s health be reflected by their appearance. Many games
have the player’s physical appearance become more battered and
bruised the more damage they take. In Batman: Arkham Asylum, the
more often the player “ dies ” the more tattered Batman’ s costume
becomes. Taking a cue from the Ghosts N’ Goblins series, we had
Maximo lose armor and clothes the closer he reached zero health.
• Make status part of the character design. Isaac, the main character in
Dead Space, wears a space suit with a glowing spine that doubles as a
health meter, as well as readouts that show oxygen and weapon status.
• Use visual effects to represent state. Have wounded characters bleed
out, leak oil, or shoot out sparks.
Inventory
• Player ’s gear can be part of the character, rather than hidden within an
inventory screen. When designing Maximo: Ghosts to Glory, we had
inventory items like keys appear on the main character’ s belt. This
allowed the player to always know what they had without having to
check their inventory system.
• Any major ability upgrade should have a model and/or animation
component to it. An evolving character keeps thing interesting to the

---

## Sección 35: Part 1 — Character

-- 134 of 517 --

We Are Not Alone 111
player, who is looking at the same character for the entire game. Even
better, take a page from World of Warcraft and allow players to dress up
and customize their characters whenever they gain new gear and
abilities.
Weapons
• Rather than just adding a +3 upgrade to a weapon, give it a
physical manifestation of that new power. Have it glow, gout flame,
add runes, sights, nozzles or other “ bits ” to reflect the weapon’ s new
capabilities.
• If you don’ t want to change the weapon’ s appearance, consider
changing the animation of the player character. A more powerful gun
requires a different shooting stance than a lighter one.
In short: keep it clear, expressive, and visual and you can’ t go wrong.
We Are Not Alone
In early video games players were a single hero battling against computer
enemies or a human opponent. Games like Double Dragon and Teenage
Mutant Ninja Turtles allowed a friend to help out, as long as you didn’ t mind
them bumping into you as you played. While cooperative gameplay with
multiple players has advanced greatly in the MMO and FPS space, console
games have pushed the envelope in the other direction; the second
character. When creating gameplay with a second character, you have to
decide whether the character is playable or a companion.

-- 135 of 517 --

112 LEVEL 5 The Three Cs, Part 1—Character
A second playable character (or SPC) lets the player swap between
controlling multiple characters. When control is relinquished on one
character, the second becomes controlled by artificial intelligence. This
concept originates from Japanese RPGs where the player can “ control ”
each of the party members to battle enemies during the combat sequence.
The idea quickly spread across the Pacific to American action and sports
games like The Goonies (Datasoft, 1985) and Speedball (Imageworks, 1988)
and over the Atlantic to the UK with Head over Heels (Ocean, 1987).
However, control would revert back to a single character for navigation
purposes during the rise of consoles like the Famicom (aka the Nintendo
Entertainment System), partially due to hardware limitations.
In Mario & Luigi: Superstar Saga (Nintendo, 2003), the player can control
either Mario or Luigi for the duration of the game; though there isn’ t too
much difference between them. However, the characters in Lego Batman
(WBI, 2008) have unique abilities used to solve puzzles. Keep the “ player
zapping9” to a single button press to allow players to quickly jump to the
other character. If the player can swap with more than one SPC, determine
the method by which the player will be able to make the choice quickly:
• Player chooses the SPC positioned closest to the player.
• The player cycles through a preset list of characters.
• Use a “ compass - style ” selection window which allows the player to
select directly rather than in a cyclic order.
• A predetermined location in the level automatically switches characters.
The difference between a SPC and a companion character is that a
companion is controlled by the game’ s AI. In some cases, a companion
is the second player character, as in the Lego Star Wars games or Army
of Two.
Originally, AI - controlled characters were a bit of a pain — standing right
where you wanted to be and being pretty useless in a fight. But thankfully
games have evolved. Companions can be useful in combat (Resident
Evil 2, F.E.A.R. 2), provide navigational support and advice (The Legend
of Zelda: The Wind Waker, Darksiders), can aid the player in puzzle solving
(GoldenEye, Mark of Kri), or even heal or help the player when they are in
physical danger (Ghostbusters, Gears of War 2). They don ’ t even have
to be human; like the canines Shadow in Dead to Rights 2 (Namco, 2005),
Dogmeat in Fallout 3 (Bethesda, 2008), or the weighted companion cube in
Portal (Valve, 2007).
9 “Player Zapping” was the charming term used for SPC switching in Resident Evil 0
(Capcom, 2002).

-- 136 of 517 --

We Are Not Alone 113
While companion characters are helpful in gameplay, be aware that creating
a companion character is often a significant dedication to game assets as
they require complex AI and animations as robust as the main character.
However, the more varied and intelligent these characters are, the more real
these characters will become. And the more real the companions are, the
more the player is going to care about them.
When creating these companions, remember that opposites attract. Give
character abilities, strengths, and limitations that complement and contrast
each other. A perfect example can be found in Resident Evil 2 with Claire
Redfield and Sherry Birkin. The two characters couldn’t be more different:
Claire is a capable fighter and Sherry is a scared and defenseless little girl.
Claire wields two guns to take out zombies while Sherry can crawl into
hiding places and access areas to find puzzle pieces and items. Each
character couldn’ t survive without the other, and that’ s the feeling you have
to convey with a companion.
A game’ s puzzles and progression can be designed around how to utilize
the companion to help both characters progress. Ico and Army of Two’ s
heroes need their companion’ s help to complete the game. As the player is
going to be spending the entire game with the companion character, you
want to create a relationship early in the game so you don’ t have to do
much AI programming to sell the companion’s personalities later. Sully in
Uncharted: Drake’s Fortune and Captain Pierce in Call of Duty: Modern
Warfare are two strong examples of companions with well- written
personalities and motivations.
Sometimes two characters aren’ t enough. Mortal Kombat: Armageddon
(Midway, 2006) has 63 unique playable characters! Games with large casts
can be found in many game genres: fighting, car combat, RPG, RTS, FPS,
and survival horror games.

-- 137 of 517 --

114 LEVEL 5 The Three Cs, Part 1—Character
Start your character creation process by creating a stereotype: the old
“ fi ghter, magic- user, thief, cleric” class/profession model, for example. Wait
a second, what about creating unique, compelling characters? Yeah, yeah,
that stuff’s all great, but sometimes a player will need to judge a book by its
cover. At the beginning of many games, the player doesn’ t have the luxury
of a storyline— they ’ re just gonna pick the character that looks the coolest or
that they identify with the most.
But that doesn’t mean your characters have to be stereotypes, particularly
in the way they play. Your characters should have something significantly
different to offer to gameplay. It helps to build an abilities matrix to
compare and contrast your characters so none of them have abilities
that are the same. The characters in Team Fortress 2 live in one of three
classes: offensive, defensive, and support. They have three categories
that impact gameplay: health, speed, and attack. Let’ s see how they
stack up:
Offensive Class Defensive Class Support Class
Soldier DemoMan Medic
High health
Mid to strong attack
Medium speed
Medium health
Slow to mid speed
Strong attack
Medium health
Medium speed
Medium attack
Heavy Pyro Sniper
High health
Slow speed
Strong attack
Medium health
Medium speed
Strong short-range/weak
long-range attack
Weak health
Medium speed
Medium attack
(headshot does
instant kill)

---

## Sección 36: Part 1 — Character

-- 138 of 517 --

We Are Not Alone 115
Scout Engineer Spy
Weak health
Very fast speed
Weak to mid attack
Weak health
Medium speed
Medium attack (gun turret can
be improved from weak to very
strong attack)
Weak health
Fast speed
Weak attack (backstab
does instant kill)
As you can see, the characters in TF2 are very finely balanced. No two
characters share the same attribute specs, and weaknesses are
counterbalanced with strengths. Where the heavy is slow, he has the
strongest attack. Where the scout has a weak attack, he is very fast. Even
the most statistically average character in the game, the medic, can heal
and grant temporary invulnerability to the other players; an ability that is
totally unique to the other classes in the game. This balancing act is like a
game of “rock, paper, scissors” , where each character has a weakness
and a strength. These characters also support different types of gameplay:
the sniper, heavy, and engineer all work best when they root themselves in
place —notice how there are one of these types in each class? Your
characters will become more balanced the more classifications there are
to gauge them against, such as:
• Movement speed
• Movement type
• Attack speed and rate
• Attack strength
• Attack range and duration
• Armor strength
• Health
• Encumbrance
• Advantages (like health or puzzle solving).
Be careful to make sure these values and traits are easily editable; if you
need to make a global change in your game, you don’ t want to spend all
your time tweaking values.

-- 139 of 517 --

116 LEVEL 5 The Three Cs, Part 1—Character
Who Are the People in Your Neighborhood?
The general. The hooker. The innkeeper. The service robot.
Non - player characters (or NPCs, as the kids call them) come from all
walks of life: kings that assign quests and award trophies for completing
them, blacksmiths that craft new weapons and armor. You know what the
great thing is about them? YOU (as the player) are the center of their
universe! They solely exist to help (or hinder) you! How’ s that for stroking
your ego? That’s why, in some way, every NPC needs to provide the
answer to this question:
WHAT DOES THE PLAYER NEED TO SUCCEED?
What does the player need to succeed? Good question. I’ m glad you asked.
Every NPC needs a role. A job. A reason for living. All NPCs should provide
one or more of the following:
• Objectives for the player
• Access to new locations where objectives await (anything from keys to
maps to pointing in the right direction)
• Methods for the player to travel to said locations
• Rewards for completing objectives (can be economic or pride rewards)
• Tools to defeat enemies
• Gear to protect players from said enemies
• Answers to puzzles and problems
• Backstory about the world and its characters— just don’t be too long
winded

-- 140 of 517 --

Who Are the People in Your Neighborhood? 117
• Players ’ instruction on gameplay (though never tell the player something
they already know)
• A compliment to your hero on their awesomeness (or suitably quake in
fear if your hero is a badass)
• Humor.
While your NPC is waiting to provide help to the player, give them something
to do. NPCs are the “ extras ” in the video game universe, and just like
extras, they need to be given “ business. ” In movie- making lingo, business is
what extras do in the background of a scene to make it look like life is going
on regardless of what the actors are doing: eating, talking, chopping wood,
washing the floors. Simple animations are a good start. Complex activities
are even better. In some games NPCs perform different activities depending
on the time of day10. Just don’ t make the player have to chase the NPC
around to talk to them.
When putting NPCs into your game worlds and levels, be sure to place
them within eyesight of where the player is traveling. Make them easy to
find. Place them on the game’ s mini- map if you have one. Don’ t make the
player have to hunt them down. Unless your story calls for it, don’ t put them
10 In life simulators like Harvest Moon and Animal Crossing, NPCs will go to bed if it’ s late
enough. That means that many players will not be able to interact with some characters
because they’ re sleeping. Make sure you take this into account, as you don’t want to waste
production time creating assets that the player will never see!

-- 141 of 517 --

118 LEVEL 5 The Three Cs, Part 1—Character
in strange locations either: an innkeeper should be found in the inn, the
police captain in the police station, and so on. If needs be, put a large
arrow over their head.
Have your NPCs be physically distinct in dress and body language. A
soldier is going to look and act very differently to a gang member. Use as
many visual cues as possible to help the player remember which character
has what information or which guy is gonna sell them that phase plasma
pistol for a good price.
If having unique NPCs isn’ t possible due to budget or time, you can still
distinguish them with different “ voices. ” This can be done via text as well as
voice acting. The lead designer of Bioshock told a story of how players had
trouble distinguishing the NPCs from one another until they spoke with
strong international accents. Not all NPCs tend bar, dispensing advice in
outrageous accents. Try making NPCs gameplay function surrogates like the
game ’ s store or save file system. Replacing a gameplay mechanic like a
switch or crate with an NPC makes your game feel less contrived and
predictable. Just be aware that talking to an NPC will slow down the pace of
your game as the player will have to actually have a conversation to open a
door rather than just turn a handle.
Interaction with an NPC can also initiate a puzzle, activate a mechanic, or
start a countdown clock. Protecting an NPC on escort missions or in battle
arenas is another common gameplay mechanic. Or if you don’ t want your
NPC to be so helpless, have them taunt and spur your player into action. In
Darksiders, a counter pops up when the smith Ulthane challenges War to
see who can kill the most enemies. Not only does this indicate the start of
the contest, but it changes the player’s mind set into one of competition.
Study other games and see what they do with their NPCs. Use any good
ideas you find and create your own. Making your NPCs less predictable will
keep the player on their toes and curious to see who they will meet around
the next corner. And around the corner of this book is the next of the Three
Cs: the camera.
Level 5’ s Universal Truths and Clever Ideas:
• Form follows function: your character’ s actions and
personality should determine their appearance.
• Give your characters distinct shapes, silhouettes, colors,
and textures.
• Name your hero appropriately.

---

## Sección 37: Part 1 — Character

-- 142 of 517 --

Level 5’s Universal Truths and Clever Ideas 119
• Customization will increase player attachment.
• Use the player character to determine game metrics.
• Walking is NOT gameplay.
• Use the player character to reflect their in-game status.
• Companions and SPCs require a fair amount of work to
get right. Make them compliment the player character.
• Balance multiple player characters to maximize
effectiveness.
• Give your NPCs gameplay functions.

-- 143 of 517 --

-- 144 of 517 --

T
Levei 6
The Three Cs, Part 2 — Camera
Do you hear that crashing sound? That is the sound of a video game
controller being thrown through a 50″ 1080p HDTV plasma panel with a
600Hz subfield drive. And why was this fine piece of technology utterly
pulverized? Because your game has a really bad camera.
Did you know that over 1 billion TVs are destroyed a year because of
really bad game cameras1? Nothing will cause a player to stop playing
your game faster than a poor camera. This is why it is so important to
get it right.
Get It Right: Camera Views
Choosing the right camera for your game is not only very important
for determining how to program the camera, but it also impacts
how you design your game, map your controls, and create your
1 This is a completely made- up statistic.

-- 145 of 517 --

122 LEVEL 6 The Three Cs, Part 2—Camera
artwork. It’s pretty common for a game to have more than one style of
camera, but you should stick with one “ main ” camera style for the majority
of your gameplay and only use other camera views for specific gameplay
situations.
Static camera. A static camera does not move position and stays fixed
onto a single screen, location, and image. The earliest video games used
static cameras because (a) they hadn’t invented the scrolling camera yet
(duh!), (b) it allowed the player to keep their eyes on several game elements
at once and, in the case of early 3-D games, (c) it allowed teams to
maximize the game’ s artwork by creating art that would only be seen
“ from certain angles.” An item in a game world that is only viewed from
one angle doesn’ t need a backside, which saves on production and
processing time.
Even though they’re old school, static cameras can still be found in use
today in many Flash- based arcade/puzzle games like Peggle and those
“ find the object” games that your mom likes to play. Another advantage to
using a static camera is that you can use it to set the mood. A clever
use of the static camera to help mood can be found in early survival horror
titles like Alone in the Dark and Resident Evil. These developers not only
used the static camera shot to represent a single room, but also used it
to set up the camera for maximum effectiveness. Another advantage is that
you can easily use it to set up events in your game world, because you
don ’ t run the risk of a player looking the other way when it happens.
However, you have to be careful with a static screen because they aren’ t
very dynamic. Make sure to compensate for this problem with lots of
animation and effects to keep your screen lively.
If you aren’ t satisfied with a camera that stays put, you can always ask your
programmer nicely to make it into a scrolling camera instead.

-- 146 of 517 --

Get It Right: Camera Views 123
Scrollable camera. Pretend you are looking down at a desktop. Or use the
above picture if you are bad at pretending. On this hypothetical desktop you
can interact with all of the elements on the desk, but hey— you just can’ t
find your pen. In the picture, what you can see is represented by the gray
box. By moving or “ scrolling ” the camera (in this case your eyes) to
another part of the desk— voil à ! You find your missing pen beside a book.
Amazing!
A scrollable camera offers all of the advantages of static screen
but with the added advantages of (a) movement, which keeps
the player engaged in the act of moving the camera, and (b) allowing
you to hide stuff off screen or reveal it in a big dramatic way. This is
why you will find it being used in many old- school adventure games
like Day of the Tentacle. If you use a scrollable camera with a God- mode
camera or in isometric view (which I’ ll be talking about later), then you can
simulate a table top to simulate miniature games. This is why a scrollable
camera is used in RTS and dungeon crawl games like Dawn of War and
Diablo III. Make sure your controls for moving your camera are simple and
relative to the player’ s controller. You don’ t need anything fancy to move a
camera around.
Work with your programmer to tune the hydraulics of your camera: the
speed at which the camera accelerates/decelerates. A scrollable camera
that moves too fast will overshoot the player’ s target, which gets very

-- 147 of 517 --

124 LEVEL 6 The Three Cs, Part 2—Camera
frustrating as the player goes through a process of overshooting
back and forth, a condition that eventually leads to insanity and/or
a destroyed monitor. Conversely, don’t make your camera scroll
too slowly. This can be particularly catastrophic in a game where
your little army’ s platoons are in danger of being wiped out by enemy
tanks and your damn scrolling camera is too slow to get to them
in time. Oh the humanity!
You can always let the player decide what speed they want the screen
to scroll at. Just make sure they know where to find this option in your
game and give them several speeds to choose from. Just “ fast ” and
“ slow ” won’t cut it.
In the beginning, there was the static screen. The static screen was
fine for Invaders from Space and the Kongs of Donkey. But that was
in 1981 when no one knew any better. And then game players
cried out for more. So in 1982, the great Irem descended from the
heavens in a purple moon buggy and introduced parallax scrolling to the
video games world.
Parallax scrolling. As a parallax scrolling camera moves, the world
moves with it. This camera view revolutionized video games, allowing
game developers to create longer and deeper game worlds in which
to play. There are two different ways you can treat parallax scrolling.
First is plain ol’ scrolling. The camera is controlled by the player’ s
movement —the player essentially stays in the center of the screen
as the world moves past them just like in those old-fashioned western
fi lms. Giddyup!

---

## Sección 38: Part 1 — Character

-- 148 of 517 --

Get It Right: Camera Views 125
When using this type of scrolling, be careful to play out how your game level
loads as your player may be able to “outrun the load.” Always play your
game level backwards to make sure that your player can’ t break your game.
The second type of parallax scrolling is the forced scroll. The player is
forced to “ keep up ” with a scrolling camera, which is why it was first used on
driving and flying games like Moon Patrol or Scramble. It became popular
with first person shooters like Operation Wolf and third person rail shooters
like Panzer Dragoon and was later used for “ chase ” sequences like those
found in Crash Bandicoot. More often than not, if a player fails to keep up
with the camera, something horrible (such as death) happens to them. This
makes a forced scroll camera great for gameplay where you really want to
put pressure on a player, but keep in mind that you don ’ t want to use it
consistently in a game; that is, unless your whole game is based on this idea.

-- 149 of 517 --

126 LEVEL 6 The Three Cs, Part 2—Camera
Parallax scrolling games dominated home video games throughout the
1990s (really— I was there). There were tons of them! When you have a
bunch of people making a genre of game over and over again, innovation
eventually sneaks in. And it happened. Twice, in fact.
The first was Mode 7, named after the 7th (out of 8) background layer on
the Super Nintendo entertainment system2. Artists drew the background
layer in perspective stretching to the horizon. Scrolling the artwork (which
was drawn to look like the ground), created the illusion of a background
infinitely moving towards or away from the horizon. Add a forward- facing or
rear- facing sprite and you would create the illusion of a car or character
travelling towards or away from the screen. Excellent examples of Mode 7
can be seen in Mario Kart, F- Zero, and Super Star Wars. However, designing
a level for Mode 7 gameplay can be tricky, as your level has no true back
wall; the effect only works with an infinite background. While technology
has advanced to allow programmers to easily create 3- D worlds without any
special graphic mode, the term still remains in use by some (albeit ancient)
game developers.
2 The camera effect called “ Mode 7” actually existed before the SNES. Racing games like
Night Racer (Micronetics, 1977) and Pole Position (Namco, 1982) were some of the first
games to feature a scrolling ground plane that gave the illusion of 3- D space.

-- 150 of 517 --

First Person Camera 127
In addition to scrolling the camera along the parallax, programmers
found inspiration from the multi -plane camera used in traditional
animation. This camera gives the illusion of depth by zooming the camera
towards and away from the screen. By having a camera that tracked in
and out of the Z- axis, developers were able to create level designs with
parallel paths. Games like Disney’ s Hercules Action Game (Virgin Interactive,
1997) used the multi- plane camera to create bi - dimensional gameplay;
the forerunner to what is known as two and a half D. A side effect of
the zooming effect in bi- dimensional games was severe pixilation that
occurred when the camera zoomed in on a non- scaling sprite. You can still
find this effect being intentionally imitated in “ retro ” -style games.
First Person Camera

-- 151 of 517 --

128 LEVEL 6 The Three Cs, Part 2—Camera
As gameplay moved into the Z- axis, game creators explored more cinematic
camera views. While a few games in the 1970s featured a first person
camera, it wasn’t until Wolfenstein 3D (Apogee Software, 1992) and its
successor, Doom (id Software, 1993) that the camera view became
popularized. The camera is used in a variety of game genres, from racing to
platform; it became most associated with the first person shooter. Despite
its popularity, it’s hard to discern if the first person camera is really the best
camera for gameplay. Here’ s a quick comparison of the pros and cons of
the first person camera:
Advantages Disadvantages
Easier to aim weapons at targets Hard to gauge jump and movement distance
Player views character as “ self” , Players can’ t see their character and can
allowing for greater immersion in lose emotional connection
game world
Easier to create atmospheric Player is not always looking where the
situations (like horror) designer wants them to look
Player gets close look at weapons, Game objects (like pickups) have to be
world objects, and puzzle items exaggerated in scale to compensate for
distance
As you can see, the arguments for and against the first person camera are
pretty darn even. But regardless, there are some pretty fun visual effects you
can pull off when using a first person camera.
• Blood splatter: many current FPSs use a blood splatter effect on the
screen to show that a player has taken damage. You can also have the
screen start to “grow dark” or dim to represent the player dying. Some
games use this effect heavily and some games do it light, but I feel it’ s
pretty unfair to punish a dying player with the additional disadvantage
of not being able to see the gameplay (or where the damage is coming
from!).
• Raindrops/mist/lens flare: based on, for example, images seen on
TV news camera lenses, the effects of weather can be shown. Some
driving games even include windshield wiper controls to clear away these
effects.
• “ Predator vision” : based on the thermal camera effect seen in the
movie Predator, you can simulate these effects in a first person view to
make the player actually feel like they are using high- tech or alien gear,
such as night vision goggles. Just make sure the effect actually gives
the player a gameplay advantage in addition to looking cool.

-- 152 of 517 --

First Person Camera 129
• Blurry/drunken cam: first person view gives the designer a chance to
put the player in the character’ s shoes. As long as the altered state
doesn ’t interfere too much with the player’ s control of the game for too
long, there’ s no problem with giving the player a good whack in the
head now and then— or at least an awful simulated hangover.
Those make the first person camera view sound pretty fun, right?
Remember, many of these effects can be used with a third person camera
too, but using them with the first person camera really makes you feel like
you are “ in - the - action. ” But wait, before you pass judgment, let’ s “ toss ” one
more “ chunk ” of information into the “ pot ” :
DIMS stands for Doom - induced motion
sickness and it is a very real thing. It ’ s what
happens when your eyes register movement
and your inner ear (responsible for balance)
doesn ’ t. Motion sickness is heavily influenced by
the field of view of the game ’ s camera. So, the
larger the field of view, the more people will feel
motion sick3. Victims of this form of motion
sickness can suffer from clammy skin, sweating,
dizziness, headache, and nausea.
To avoid having your players vomit all over your
game, try the following remedies: get the game’ s
frame rate as close to 60 frames per second as possible. Avoid bobbing
foreground elements, like your player’ s weapon. Keep your level’ s floor as
flat as possible4. Add large stationary objects to your environments which
give the player something to focus on. Don’t whip the camera around too
much. Try not to have your player change their elevation view (looking up
and down) too quickly or often.
And while I am not a doctor, and don’t even play one on television, I
recommend getting some fresh air, drinking a glass of water, and taking
non -drowsy motion sickness medicine if you have to play an FPS for long
periods of time.
3 This is the reason why I never sit closer than the seventh row from the front when I go to
the movies.
4 This is what killed me when I played Goldeneye on the N64. Don’ t get me wrong, this is a
brilliant game, but there was one level with an undulating floor that, after I played it for a
half hour, I threw up like it was Christmas.

---

## Sección 39: Part 1 — Character

-- 153 of 517 --

130 LEVEL 6 The Three Cs, Part 2—Camera
Third Person Camera
Another good way to avoid turning your game into a puke- a - rama is to pull
the view back into the third person view. Now remember, this isn’ t a
solve -all solution, but I have found that when the player has something to
focus on, the effects of DIMS seems to reduce. A third person camera also
lets the player get a better view of the world, the action, and what’ s coming
up behind you. Watch out War! That skeleton’ s got a sword!
Pulling the camera back behind the player offers many advantages over the
first person view. First off, you get a clear view of your character … ’ s butt5.
Well, that can be fixed by allowing the character to turn around and run
towards the camera. But then you have to make sure the camera can track
backwards with the player. Does that mean the controls become camera
relative or player relative? And how does the player restore the camera back
to its original position? Hmmm. This may be more complicated than I first
thought.
Getting a third person camera to work correctly may be the biggest
challenge a team has to face. While there are many things that can go
wrong with your camera, let’s try to work through them to get them right.
Camera movement. When I was in high school, I had an after- school job
of videotaping sporting events. As I concentrated on filming the game, I lost
track of everything else that was going on around me. As a result, I tended
to back into the coaches and trip over the gear lying on the sidelines, which
5 The story goes that Toby Gard, one of the designers of Tomb Raider (Eidos Interactive,
1996), made his lead character a woman because he didn’t want to spend the entire game’ s
production staring at a guy’s ass.

-- 154 of 517 --

Third Person Camera 131
(a) didn’ t result in great footage, and (b) generally pissed off the coaching
staff. To solve this, I recruited a friend to act as a spotter as I filmed to make
sure the collisions were kept to a minimum.
Having that experience made me realize that every camera needs a
spotter —even ones that live within video games, which is why I say “ treat
the camera like it’ s a person.” As you program your camera and build your
world, give the camera room to maneuver and the player a way to
manipulate it. This style of camera is commonly called a follow cam
because it follows after the player. After years of working on 3- D follow
cams, here’ s what I’ve learned to watch out for:
Sorting. Sorting is what happens when a camera moves through a
character or geometry. Nothing breaks the illusion of a real world faster than
this. What’ s worse, in many cases, the sorting camera will show the
background layer of the world, which in most cases is a sky or flat color
layer. It looks crappy and great pains should be taken to make sure this
doesn ’t happen in your game.
You can avoid sorting by paying attention to the camera and the geometry.
One way is to give your camera a detection radius so that it can avoid
passing through world objects by moving over, under, or around objects. If
you don’ t want your game to process that much collision detection (which
causes the game to slow down), have world objects turn transparent. It
works pretty well with objects within the confines of the walls, but shouldn’ t
be used for perimeter walls. Avoid having objects in the world disappear
completely as players get disoriented when elements in the level flicker in
and out of existence! (And it looks bad.)
Controls. Think about how your camera is going to operate in regards to
controls. Many games won’ t work properly if the player is pointing the
camera straight up or straight down. Another annoyance for me is the great
“airplane controls vs. player- relative controls” debate. Personally, unless I’ m
flying a plane, don’ t make me push up on the analog stick to make my

-- 155 of 517 --

132 LEVEL 6 The Three Cs, Part 2—Camera
character go down. Many FPSs do this and frankly, it’ s just stupid since in
most FPSs you are playing a character, not an airplane. If you have to have
this camera- relative control option, at least give me the option of changing
it. Even better, make the character- relative controls the default and make the
airplane controls the option.
Corners. The number one cause of camera flipping (when the camera
tries to find a good place to come to rest but ends up bouncing between
two or more objects) are corners. Rather than trying to come up with an
overly complicated camera system to combat flipping (and believe me, it
usually ends up being overly complicated), just keep players out of corners
in the first place. But rather than creating invisible geometry (oh how I hate
invisible geometry; more ranting on this later), build blocking geometry like
small retaining walls, shrubberies, boulders, or fencing which tell the player
to “stay out!” of corners. Don’t invite trouble: keep your collectables out
of corners. Keep your enemy’s AI path/detection zones out of corners.
Move your gameplay elements to the middle of the room. Stay out of
corners! I mean it!
OK, so you didn’ t listen to me. You HAVE to have that one power-up nestled
in the corner of that room. Then, as your character walks into the corner
make sure your camera goes up. Imagine that the Amazing Spider- Man is
your camera man. What does Spidey do when he reaches a wall? He
climbs up. Have the camera scoot up along the surface of the wall to look
at the player from a bird’ s - eye view (or would that be spider’ s - eye view?).
But avoid having the camera show the player from a direct top- down view.
Not only does it look bad, but it just invites flipping once the camera tries to
decide where to look at the player.
Position. A topic of disagreement among the world’ s greatest designers is
whether the camera should strictly follow the player as if it were attached to

-- 156 of 517 --

Giving Up Control 133
a stick stuck to the character OR whether the camera should be more laid
back and follow the character around freely. Don’ t stress it dude, the
camera will catch up with the player when it feels like it. (Or when the player
chooses to reset it.)
Maybe it’ s because I grew up in Southern California, but I am definitely in
favor of the second method for the following reasons: there are fewer
chances for obstruction, you see the character’ s face from time to time, you
can set up gameplay where the player has to deal with enemies that sneak
up behind them, and it’ s easier to orchestrate “ chase ” -style gameplay. Why
this is such a contentious topic is not because the world’ s greatest
designers are against such concepts but because they have to give up
control of the camera.
Giving Up Control
Bad things happen when players are given control of the game camera.
They start sticking it in places they shouldn’ t be sticking it. They find ways to
get the camera stuck into geometry. They generally screw things up. And I
can tell you that nothing pisses off a game designer faster than watching
some idiot screw around with the camera. So you, the game designer, have
three choices to solve this issue. Loosen up your sphincter and let the
player take control of the camera or screw ‘em, take the control away, and
make that camera all yours! Or you could decide when they need control
and when they don’ t. You are the designer, you call the shots!
Make your choice, adventurer!
TURN TO PAGE (133) to let players have control of the game camera.
TURN TO PAGE (135) to take control of the game camera away.
TURN TO PAGE (137) to let the player sometimes have control and
sometimes not.
So You ’ ve Decided to Let the Player Control
the Camera
In the past I’ve used three methods to give the player control over the game
camera.
The first method is to allow the player complete control over the follow cam.
By using the analog stick (or a mouse for PC games), the player can move
the game camera to look around 360 degrees at any time; while running,

---

## Sección 40: Part 1 — Character

-- 157 of 517 --

134 LEVEL 6 The Three Cs, Part 2—Camera
standing still, while in combat, whatever. The disadvantage of this is that
players can get quickly disoriented, miss interesting and important level
events and clues, or suffer DIMS.
The second method is a free -look camera. This camera allows the player
to stop and look around the world (effectively a first person view). The
free - look camera is usually initiated by a button press, which activates a
mode in which the player can use the analog stick (the one that is usually
used to move the player) to rotate the camera around 360 degrees. I have
seen versions of this camera where the free- look cam is restricted to a little
less than 180 degrees in an attempt to mimic the natural rotation of the
human neck. When the player presses the button to return back to the third
person view, they are usually reoriented in the direction that the free- look
cam was facing.
Reorientation. Speaking of reorientation, giving the player the option to
reorient the camera to its default position (behind the character in the case
of a third person camera) is usually appreciated by the player. It comes in
particularly useful during combat and platform jumping scenarios. Reorientation
is usually achieved with a quick, single button press by the player.
Speed. Be mindful of the speed of your third person camera as it is rotated
around by the player. A good camera feels like it has hydraulics; it never
stops dead, but rather slows down slightly as it decelerates. This will keep
the player from suffering from DIMS. As a player character is usually in
motion, another trick I learned is to have the camera slightly overshoot its
target when the player stops and creep back to center on the player if they
stay still long enough. Just remember, you NEVER want the player to get
out of the camera’ s view.
The third method is to give the player selective control over the camera. Like
with the first person free-look cam, this mode is activated by a button press
which brings the camera in for a closer look at an object’ s detail or into a

-- 158 of 517 --

Giving Up Control 135
special mode like a sniper’ s scope. The difference between selective control
and a free- look camera is context.
With the free- look camera, you are simulating the turning of the character’ s
head. With selective control, you are simulating a piece of equipment, like
binoculars or a telescope. Any limitations this camera may have should
mirror the limitations of the object the character is using. This realism sells
this view, so let reality be your guide.
Some game designers find the transition from third person to first person to
be jarring, and feel it risks taking the player out of the carefully constructed
atmosphere they’ ve created. Resident Evil 4 created a unique solution for
their shooting gameplay. As the player aims their firearm, the camera
viewpoint shifts down to hover behind the character’s shoulder.
Another infrequently used alternative is to use second person view, where
the camera mode is given to an entirely different character. In the Mark of Kri
(SCEA, 2002), the player “ sees ” through the eyes of Kuzo, a bird that can
be flown on spy missions. In The Darkness (2K Games, 2007), the player
can control a “tentacle cam” to see around corners and further than the
player ’s POV. When the player has seen what they want, a button press
returns the view back to the third player view.
So You ’ ve Decided to Not Let the Player Have
Control over the Camera
Good call. The last thing you need is someone screwing around with the
camera making your game look bad. You will realize that there are many
benefits to taking away the player’ s control over the camera.

-- 159 of 517 --

136 LEVEL 6 The Three Cs, Part 2—Camera
• Removing camera control gives the player one less thing to worry about.
If they aren’ t wrestling with the camera, the player is free to concentrate
on what’ s important: playing your game.
• More visual bang for your buck. A camera where YOU determine what
it ’s looking at means that game art can be built to maximize polygon
and texturing limitations. In God of War, the environments were built like
theater sets, not in full 3- D. Why build the back of a building if you are
never going to see it?
• You can treat your game like a dark ride. Disneyland’s Haunted Mansion
is the perfect real- world example of a designer-controlled camera, as its
omni - mover carts6 always have the guest looking at the most interesting
scenes in the ride. You commonly find this kind of rail camera in first
person shooters like Time Crisis (Namco, 1995) and House of the Dead.
(Sega, 1996).
• Your game world simply looks better. Taking away camera control
means you can set up shots. Want a worm’ s -eye view to make the boss
look more menacing? No problem. Want to skew the camera to make
the world look demented or creepy. Go right ahead. No one is going to
be able to screw it up.
• What did I miss? Have an important clue or event happening in your
game world? Want the player to be able to see the Tower of Doom
looming in the background or that giant spider that is creeping up on
them? No problem. Without camera control, you don’ t risk the player
missing anything important in your game.
• Want to have the camera do a barrel roll? Zip in and out between
columns? Move around pillars or over or under objects? Match the
player ’s movement as they crawl under obstacles and through
narrow passages? Go right ahead and go nuts with those complex
camera moves. Using a rail camera you can set up elaborate and
cinematic camera angles. You don’ t have to worry about the player
wrestling to regain control of the camera. Just make sure your
gameplay controls remain consistent during any of these fancy
camera moves.
• If you decide to obstruct or let the character get out of the player’ s view,
make sure that your character-relative controls let the player guide
the character back into view. For example, if the player moves the
character behind a fence, the player should be able to keep pushing
the control stick in the same direction with the assumption that the
character will eventually emerge on the other side. Don’ t place hazards
6 Which they call “ doom buggies.” Heh.

---

## Sección 41: Part 1 — Character

-- 160 of 517 --

Two and a Half D 137
behind the obstruction or widen the path in these areas, which would
allow for movement in the Z- axis: the player could get unjustly hurt or
lost when not in view. These situations, however, are great places to
hide goodies.
But the most important thing to remember when removing the player’ s
control of the camera is to make it clear they don’ t have control over it.
Once this is established to the player, they can focus on the gameplay and
not worry about the camera.
2 - D vs 3- D? In the end, all that matters is that you use the camera that is
best for your gameplay.
So You ’ ve Decided to Let the Player Sometimes
Have Control over the Camera
You are a fair and balanced individual who knows the meaning of
moderation. Now go back and read about the other two options so you can
actually learn something, you know- it- all.
Two and a Half D
Crash Bandicoot (SCEA, 1996) was one of the first games to take two
dimensional platform gameplay and move it into the third dimension. Unlike
bi -dimensional gameplay which uses sprites for the game world and
characters, two and a half D uses three- dimensional character and world

-- 161 of 517 --

138 LEVEL 6 The Three Cs, Part 2—Camera
models but limits the camera movement in the same manner as a
bi -dimensional game: up, down, and in/out on the Z- axis.
When making your two and a half D games just follow the same rules as
with a parallax scrolling camera, with the guidelines of taking control away
from the player as listed above.
Isometric Camera
Introduced with Zaxxon (Sega, 1982), the isometric camera gave the player
a new way to look at the playing field. Not quite side view and not quite top
down, the end result creates a rather toy-like view of the world. This, and the
smooth scrolling 3- D world on a 2- D display, contribute to why the isometric
view is popular with building and simulation games.
There are some advantages to an isometric (or iso) camera. Players get a
quick snapshot of an environment’ s layout and the relationship of items
within it, which makes it good for environmental puzzle solving. Hordes of
enemies seem more impressive when seen from this camera view, as
exhibited in games like Diablo and Starcraft. That said, elevation can cause
some problems in iso view. Determining whether something is higher up
and closer than something farther away and lower can be difficult, as they
both appear to be in the same spot on screen. Regardless of how small
their subjects look compared to their first and third person cousins, iso
games can still be quite detailed and beautiful. However, if your gameplay
is less concerned about getting a detailed look at the inhabitants of
your world, then go ahead and steps into the sandals of the divine with
God view.

-- 162 of 517 --

Top-Down Camera 139
Because details aren’ t as important in God view you will find it in games
that are concerned with controlling cities or dominating land masses like
Spore or Supreme Commander. God view is essentially an isometric camera
but where the player is given a wider field of vision over the world,
sometimes as high as low orbit.
Top - Down Camera
Considered to be an “ old - fashioned ” camera view, you can still occasionally
find action arcade games presented in a top -down view. Classic games

-- 163 of 517 --

140 LEVEL 6 The Three Cs, Part 2—Camera
like Smash TV and Gauntlet are examples of games that used this camera
view. There are some disadvantages to this view, such as not being able to
get a good look at the game character or the game world, and concepts
like depth should be avoided from this perspective.
An interesting variation on the top- down camera view is the top - down/side
view camera. While some elements in the game level are presented from a
top -down view (usually world elements and power- ups), other elements (like
characters) are presented from a side view. This view has a certain charm to
it, similar to how characters in Egyptian tomb art are always shown from the
side view. Games like Snake and Tower Defense are some of the more
recent types of games that use this quirky camera view.
Special Case Cameras
OK, so you’ ve decided on what camera to use for your game. You’ re ready
to go, right? Wrong! What about the camera for special instances?
Designing a camera to work underwater or while flying adds another layer of
complexity.
Here are a few red flags and tricks to keep in mind when adding these extra
layers to your own game:
• Make sure your camera is always moving along with the player while
flying or swimming. Don’ t let the player rise or fall off screen.
• If your player flies or swims straight up or down, make sure your camera
doesn ’t sort through floor geometry.

-- 164 of 517 --

Camera Shot Guide 141
• While swimming, keep your camera underwater with the player. Don’ t
have it pop out of the water unless the player is swimming on the
surface. Try to keep a clear distinction between “ in water” and “ on
land. ”
• Try to resist the urge to have your camera realistically bob while
underwater. It’s effects like this that make players suffer from DIMS.
Tunnel Vision
Another tricky camera angle is when the player is moving through
environments like caves, sewers, or dungeons. Low ceilings, narrow
passageways, and tight doorways can cause all sorts of trouble to the
camera.
I find that if you restrict the movement of the camera using a rail camera in
these troublesome locations, not only do you alleviate any camera
problems, but it also helps maintain the feeling of claustrophobia. Avoid low
angles, rather keep the camera at the character’ s shoulder height or slightly
above the player— but watch out for low- hanging stalagtites that will cause
camera sorting issues.
Camera Shot Guide
Now that we’ ve seen all the ways a camera can present the game, let’s go
to the 5- second film school and find out how to set up your camera to get
the best shot— just like those Hollywood professionals!
Extreme wide shot (EWS). This
shows a character or location from a
very far distance. This shot is perfect
for showing castles looming in the
distance or a planet-killing space
station in orbit.
Very wide shot (VWS). Closer than
an extreme wide shot so that you can
make out some details. Usually used
for establishing shots of buildings or
other large things like space ships or
to set the tone that the player is
stranded out at sea or in a desert.

---

## Sección 42: Part 1 — Character

-- 165 of 517 --

142 LEVEL 6 The Three Cs, Part 2—Camera
Wide shot (WS). The entire subject
(be it a car or person) can be seen
in frame on a wide shot. Usually
used when first establishing a main
character or vehicle so the player
can get a good look at it in its
entirety.
Medium shot (MS). About half of
the figure of the subject can be seen
in frame: usually your character from
the waist up. Which means your
character doesn’ t need to wear pants
that day.
Medium close up (MCU). Also
called a “head and shoulders shot.”
This view is most commonly used
when a character is talking. Make
sure to animate hands to
keep the character on the screen
lively.
Close up (CU). Also called a “ head
shot ” : the camera is tight into a
character ’s face to show expression.
When you get this close to a CG
character model, you start to see
flaws (such as in the interiors of
mouths or close views on textures).
I recommend using this shot
sparingly.
Extreme close up (ECU). Wham!
Right up the nose with this one. It’ s
great for focusing on the expression
in eyes like in spaghetti westerns and
old horror movies. Or you can use it
to show details on objects such as
puzzle clues, or even the puzzles
themselves.

-- 166 of 517 --

Camera Shot Guide 143
Cutaway. You know when the hero says “ I need to get that magic sword”
and the next shot is a magic sword? That’ s a cutaway. A cutaway can be
used for a character reaction shot too.
Cut in. Here, our hero says “I need to examine this clue” and then the
camera shows a close- up detail of the clue. That’ s a cut in.
Two shot. This is called a two shot because it features two elements
(usually talking characters) shown on screen at the same time.

-- 167 of 517 --

144 LEVEL 6 The Three Cs, Part 2—Camera
Over the shoulder shot (OSS). A shot taken from over the shoulder of a
character. It’ s a good opportunity to show hidden things too, like characters
revealing that they have a gun strapped to their back or are crossing their
fingers as they promise not to kill the bad guy.
Noddy. A shot in which a character is reacting to what someone else is
saying (they are “ nodding ” in response to the speaker). You see this shot a
lot with news interviews.

-- 168 of 517 --

Camera Angle Guide 145
Point of view shot (POV). A shot from the perspective of someone or
something. Usually shown from the eyes of the player, but can be from the
point of view of a watching enemy, a floating power-up, whatever you want!
Camera Angle Guide
Now that you know what kind of camera you are using and what your shot
is going to look like, let’ s place the camera to make things look as cool as
possible.
Eye level: the camera is aiming
level at the eyes of your subject.
High angle: the camera is above
the subject, looking down on it.
This can make things look less
impressive. A good shot for showing
elements in relationship to each
other.
Low angle: the camera is below
the subject, looking up at it. This
makes things look more menacing
or impressive. Great for boss
fi ghts.
Worm ’ s -eye view: the camera is
literally on the floor looking up,
as if a worm were watching the
action.
Bird ’ s - eye view: a shot taken from
high up in the sky, as if a bird were
watching the action.

-- 169 of 517 --

146 LEVEL 6 The Three Cs, Part 2—Camera
Dutch tilt: we did this trick in
Maximo: Ghosts to Glory. We wanted
our in-game camera to feel slightly
creepy or wacky, like shots you see in
a Sam Raimi horror movie or the
1960s Batman TV show. Tilt the
camera so everything seems to be
cockeyed. If you do a Dutch tilt subtly, it has a great effect on the player
who realizes something is wrong, but isn’ t sure what. If you do it severely, it
really makes things feel screwed up.
Camera Movement Guide
Moving the camera is an art all unto itself. Here are the most common ways
to move a camera. See if you can incorporate these moves into your game
camera to make it feel more cinematic.
Arc: where the camera follows or dollies around a subject in an arc. A
common technique is to have the camera arc around the player for 360
degrees if something amazing or wondrous is happening to the character
(for example, they’ ve just gained a new power).
Dolly zoom: the camera adjusts the focal length but is moved forward or
back to keep the subject the same size on camera. You see this shot a lot
in Steven Spielberg movies where a character is amazed by something or
comes to a realization that something bad is going to happen.

-- 170 of 517 --

Camera Movement Guide 147
Follow: the camera moves with the subject. Depending on the style of your
cutscene, you can try to make your follow a little shaky as if it was taken by
a hand- held camera.
Pedestal: moving the camera up to match the subject. Like a tracking shot
but vertical. Having the camera pedestal past objects in the foreground
helps add to the illusion of speed, especially if you are trying to show
something rise up suddenly or powerfully.
Pan: when the camera moves to the left or the right. Play around with your
pans: move them around and past objects. Place items in the foreground to
make more interesting shots.
Tilt: where the camera’ s focus is moved up or down but the camera’ s
position stays the same. Effects like lens flare can make a tilt more
interesting.

-- 171 of 517 --

148 LEVEL 6 The Three Cs, Part 2—Camera
Dolly: where the camera is moved smoothly towards or away from the
subject. This is also called a tracking or crab shot. Speed can really make a
dolly more interesting; a slow crawl if something is mysterious or
suspenseful, or really rocket forward if something is dangerous or dramatic.
Play around with starting and ending your tracking before your subject starts
moving to make things feel more dynamic.
Zoom: the focal length of the lens changes, giving the illusion of the camera
moving. Be careful not to zoom in through items (sorting) or zoom too close
to characters or world objects that aren’ t very detailed. Seeing textures go
from fine to pixilated breaks reality for the viewer.
Other Camera Notes
Now that you are an expert cinematographer, let’ s work on your directing
skills.
Nothing kills a good shot faster than having unappealing composition. The
most basic guideline for composition is called the rule of thirds.
See in the above image how the screen has three imaginary lines running
through it? The rule is that you want to put the item of focus either a third of

---

## Sección 43: Part 1 — Character

-- 172 of 517 --

Other Camera Notes 149
the way up or a third of the way to one side or another. Of course, once you
have mastered the rule of thirds, you will want to break it. That’ s OK too.
After all, you are an ar- teest.
Another tried and true rule is called crossing the line. Just like in the rule
of thirds, there is an imaginary line that cuts through the middle of your
scene or environment. Let’s say you have your hero running away from a
deadly trap.
The hero has just crossed the line, which makes it look like he is running
first to the right and then to the left, which just looks weird and doesn’ t
convey that our hero is running in the same direction. Instead, add a shot
of our hero from the front to show that this is the same guy in the same
place.
You also want to apply crossing the line when you have two characters
talking to each other, otherwise they’ ll look like they are talking to someone
else off screen.
Always Point the Camera to the Objective
An excellent rule of directing your shot, whether it is in- game or in a
cutscene, is that the camera should tell the player what they should be
looking at. For example, you enter a mysterious, underground chamber. The
player can be told any number of things by the camera’ s movement: where
puzzle elements can be found, the appearance or location of enemies, a
dramatic reveal of a beautiful piece of architecture, or where the exit is. Or

-- 173 of 517 --

150 LEVEL 6 The Three Cs, Part 2—Camera
even better, all of the above. Playwright Anton Chekhov said “ If in the first
act you have hung a pistol on the wall, then in the following one it should be
fired. Otherwise don’ t put it there7. ” In other words, show everything that the
player needs for the entire room or scene. You can spool clues out to them,
but don’ t make them blindly guess.
Even if the objective can’ t be seen by the player, give them tools to find
another way to see it. Batman: Arkham Asylum uses a “detective mode”
(literally a pair of X-ray specs) that allows Batman (the player) to see hostiles
as well as points the way to secret paths. Heavenly Sword (SCEE, 2007)
displays a picture- in -picture view to show puzzle clues and “ beauty shots”
of the enemies during boss fights.
Never Let the Character Get out of the
Camera’ s Sight
Oy. I can hear all of the kvetching now. “ How can I keep my camera on the
character ALL of the time? But what if my character goes behind a wall or
hides behind a very dense shrub?” Feh. Not a problem. There are several
tricks you can do to help the player keep track of where they are in the
game. Observe:
• Show an arrow, name tag, or “ ghost image” outline of the player through
geometry.
• Have the screen react as if it were an X-ray or thermal imaging device
and show the player’s skeleton or heat signature while they are behind
the object.
• Make the wall or object turn transparent to show the character behind it.
• If your character gets off screen (this can happen in multiplayer mode8),
have an arrow or icon point to where they are.
• Zoom into first person mode to show the character’ s POV.
• Build your geometry to make sure you can always see a little bit of the
character; tinted windows, arrow slits, grating with gaps all goes a long
way to show the movement of the player behind it.
While the player is in this obscured view, the camera should NOT act any
differently: the last thing the player needs is to have to wrestle with the
camera when they can’t see their character.
7 Anton Chekhov: A Life, Donald Rayfield (Henry Holt and Company, 1997).
8 But it won’ t because you aren’ t going to let your main character get out of the camera’ s
sight, right?

-- 174 of 517 --

Multiple Player Cameras 151
Multiple Player Cameras
Keeping a camera on a player is tricky enough but what if you have
more than one player? I have seen many a game designer go mad trying
to determine a workable camera scheme for multiple players. Fortunately,
I have done all the hard work for you and will save you a trip to a padded
cell.
Split screen: GoldenEye 007 (Nintendo, 1997) had a great four-player split
screen mode that worked pretty well as long as you didn’ t expect to make
out any detail on the screen. War of the Monsters (SCEA, 2003) used a split
screen that only engaged when the two combatants were far enough away
from each other to trigger it. Now, in the age of giant plasma screens, split
screen works better because each player can actually see what is going on.

-- 175 of 517 --

152 LEVEL 6 The Three Cs, Part 2—Camera
Zooming screen: LittleBigPlanet zooms out whenever there is more than
one character on screen. If any of the characters get off-screen, they use an
arrow to keep track of the player’ s location. If they stay off screen for too
long, the player is “ killed ” until the next checkpoint is reached. Power Stone
does something similar, but dynamically scales in and out as there can be
up to four players on screen at once. The characters get pretty tiny at times,
but coupled with an indicator arrow system you can keep track of your
character pretty well.
Camera in picture: You can also go with the camera- in -picture route. A
main character is represented on the “big screen” with additional characters
shown on smaller insert camera views. It’ s not the best solution for some
types of multiplayer games like FPSs, but it works pretty well for sports titles.
Whew. I think we’ ve exhausted the topic of cameras. Time to move on to the
last of the Three Cs … Controls.

-- 176 of 517 --

Level 6’s Universal Truths and Clever Ideas 153
Level 6 ’ s Universal Truths and Clever Ideas:
• Choose the right camera for your game.
• Prevent DIMS by minding frame rate, speed of camera
movement, and level topography.
• First person camera allows for greater player immersion.
• Third person camera allows the player to get a good view
of their character and the world.
• Treat the camera like it is the player’ s “ spotter.”
• Remove camera control whenever it becomes a problem.
• When removing camera control, make sure the player
knows it.
• Use Hollywood- style camera angles and shots to heighten
game visuals and drama.
• Never let the character out of the camera’s sight.
• Accommodate multiple players using the game camera.

---

## Sección 44: Part 3 — Controls

-- 177 of 517 --

-- 178 of 517 --

T
Levei 7
The Three Cs,
Once upon a time, I joined the team of a console game that had been in
production for three years. I was asked to take a look at the current state of
the game and report back any issues I had. Overall, the game was really
good but there was one thing that bothered me. One of the enemies could
only be defeated with a quick time event (see Level 8 for more on these),
and even though I’m awesome at playing action games, I just couldn’ t seem
to press the button fast enough to win the contest and kill the monster.
I went to the creative director and told him that I thought the controls for the
minigame were too hard. He asked me “How did you hold the controller?”
This is what I showed him:
He said “Oh, no wonder. You are holding the controller wrong.” Whaaa? As
far as I knew, there was only one way to hold the controller. Keeping things
respectful, I asked: how did he recommend I hold it? This is what he
showed me:

-- 179 of 517 --

156 LEVEL 7 The Three Cs, Part 3—Controls
I wasn’t sure if he was joking. “ I don’ t believe that players would change
their hand positions midway through the game. It just doesn’ t seem very
natural. ” He became insulted and proceeded to tell me that not only was it
the proper way to hold it, but that everyone else on the team held it that way
as well. “Hmm. Did you tell them how to hold it that way?” I asked. “ Yes. ”
He replied. I gave his way a try but still didn’ t win the fight. If anything, the
new hand position made things worse. I returned to his office and told him
“Sorry, but I think players are going to have difficulty playing this.” Pointing
his finger at me, he said “You are 100% WRONG!” and stormed off.
Three months later, after testing revealed that the quick time event was too
hard to play, the controls were adjusted. What very important thing did I
take away from this experience?
ALWAYS REMEMBER THAT HUMANS ARE PLAYING THESE GAMES
Not six-fingered mutants or multi- tentacled squid men from Praxis Prime.
It ’ s Homo sapiens who play video games; most of them possessing short
if not stubby fingers and mediocre motor skills coordination, which is why
it is important to consider ergonomics when creating your control
schemes.
Ergonomics is the study of fitting equipment to fit the worker. Great pains
are made by hardware developers to see how the player holds and uses the
controller. Which is why it never made any sense to me that a developer
would create a control scheme that forced the player to twist up their hands
like pretzels. To help with this, I created this rule of thumb (BAA DUM!
TISH!1) that I call the “Gamers ’ Guide to Flex-O- Fingering. ”
1 Thankyou, thankyou. I’ ll be here all week, folks. Try the veal.

-- 180 of 517 --

The Three Cs, Part 3—Controls 157
When you are designing controls, try establishing design rules for your
controls schemes based on hand placement (for example, in FPS games it’ s
common to use the keyboard for character movement and the mouse for
aiming and shooting). Not only is it helpful when determining what controls
go where on the controller, but the player will begin to associate muscle
movement with a certain action even if they don ’ t realize they are doing it.
Speaking of keyboards, just because you have a whole keyboard available
for use, doesn’t mean you have to use every single key. Keeping your
keyboard controls localized around commonly used key groupings like
QWERTY or ASWD makes it easier for players to adapt to.

-- 181 of 517 --

158 LEVEL 7 The Three Cs, Part 3—Controls
Another way to assign controls is thematically. In Tak and the Guardians of
Gross (THQ, 2008) the motion-controlled Wii Remote was used for all of the
player ’ s magic powers while the analog stick/nunchuck controlled all Tak’ s
real - world abilities like interacting with objects and fighting. If the player had
any question on how to perform a move, they would usually try the
thematically related controller first. Just make sure that you don’ t cross
signals and start intermingling your themes. That just leads to confusion and
sadness.
The tricks above are really no big secret; it boils down to this: you just need
to understand the control needs of your audience. Here are a few more tips
(exclusive to buyers of this book2!):
• If you are designing for younger players, keep the button presses
simple. Don’ t create complex combinations as these younger fingers just
can ’t make them. Or if you are designing a kid’ s game using the
keyboard, try not to spread out your key commands too far as most kids
tend to “hunt and peck” the keys— which isn’ t good if you want them to
make quick actions.
• MMO and FPS players often create hotkeys and macros to chain attacks
or spell effects. Give them the option to customize their controls. You
never know when you’ ll need to cast “Combustion, Icy Veins” and
“ Fireball ” to boost your dps. In addition, customizable controls have the
benefit of being disabled gamer friendly.
• Fighting gamers, like fans of the Street Fighter series, pride themselves
on mastering ultracomplex control schemes, but remember, not
everyone can pull off the dragon punch move in Street Fighter II. If you
want to keep your game accessible to other types of players, don’ t go
nuts with the ubercomplex controls.
• Track and Field (Konami, 1983) was a
very popular game that required
manic button pressing to make the
little athlete character run. However, it
was impossible to accurately do this
move without the aid of a pencil (see
image), resulting in what us kids
called the “pencil trick. ” However,
the pencil trick destroyed game
controllers. While I’ m sure that
controller manufacturers loved the
pencil trick, it’s unfair to your players
to make them resort to it.
2 Please do not use these tips if you are just looking at this page in the bookstore. Thanks.

-- 182 of 517 --

Dance, Monkey, Dance 159
• While it’ s fine to experiment with unconventional control schemes,
make sure the player has the option to revert it back to a more
traditional one.
• On that note, offer the player several control options. Or, even
better, let the players map their own controls in the options
screen.
• For Zeus’ sake, don’ t reverse your flight controls! Pulling back on
the stick should make the plane go up and pushing forward should
make the plane go down. Nobody likes those reversed controls
and anyone who tells you otherwise should be forced to play
the super- awful Superman 64 and fly through rings for a week
straight.
Dance, Monkey, Dance
A good designer will think about how
the game is played in the real world as
well as in the game world. Think about
how the player is going to move those
fingers over the controller. Avoid
repetition and strive for an uncomplicated
control scheme. If you get it right, you
create what I call the “dance of the
buttons ” for the player. If your controls
get too complex or repetitive, you end up
with the players resorting to button
mashing.
Button mashing is a derogatory term to describe when a player isn’ t sure
how to control the game, resulting in them wildly and/or rapidly hitting the
buttons randomly to get any sort of positive result. This usually happens in
action and fighting games when either the control scheme is too complex or
they aren’ t getting satisfactory feedback.
Button mashing contributes to player fatigue and “ gamers ’ thumb”
(otherwise known as “occupational overuse syndrome” ), characterized by
stiffness, burning or cold sensations, numbness or weakness. The American
Physical Therapy Association3 recommends the following exercises and
advice:
3 Exercises courtesy of the APTA website (http://www.apta.org).

---

## Sección 45: Part 3 — Controls

-- 183 of 517 --

160 LEVEL 7 The Three Cs, Part 3—Controls
• Keep your wrists straight (don’ t let them droop) as you hold the
controller.
• Sit comfortably in a chair with good back support.
• Stretch every 20 minutes to give your head, neck and shoulders muscles
a break.
• Tap each finger with the thumb of the
same hand. Repeat five times.
• Alternate tapping your palm and the back of your hand against your
thigh as quickly as you can. Repeat 20 times.
• Open your hands and spread fingers as far apart as possible. Hold for
10 seconds. Repeat eight times.

-- 184 of 517 --

Dance, Monkey, Dance 161
• Clasp your hands together and turn your hands away from your body
and extend your arms forward. Hold for 10 seconds and repeat eight
times.
• Fold your hands together; turn your palms away from your body and
extend your arms overhead. You should feel the stretch in your upper
torso and shoulyders to hands. Hold for 10 seconds. Repeat eight times.
However, not all button mashing is bad; you may be able to use it to your
advantage. I have observed that the first thing a player does when they start
a game is to press all of the buttons on the controller. This is because (a)
players want to see what happens and (b) no one ever reads the game
manual. So how do you get a player to learn if their first instinct is to just
mash buttons?
Simple. Have the character do something cool whenever they press a
button, even if the player doesn’ t understand how they’ re doing it. God of
War does this fantastically well: Kratos pulls off some awesome attack
moves even when you just mash buttons— and it’ s completely intentional.
Once the player sees these moves happen a few times, they will slow down
to try to dissect how they pulled them off.
Never have a button do nothing when pressed. Here are some ways to deal
with this:

-- 185 of 517 --

162 LEVEL 7 The Three Cs, Part 3—Controls
• Play a “negative response” sound effect or animation to make it clear to
the player that this control isn’ t available. I always liked that the character
in Dark Castle shrugged his shoulders if he was out of ammo or missing
a key.
• Make it clear during your training mode that a button is inactive.
Then make a big deal when it is unlocked. Br ütal Legend stops the
game dead and shows a full- screen graphic whenever the main
character gets a new move. Just remember (a) not to teach more than
one new move at a time, and (b) don’ t jam new moves down the
player ’s throat too quickly. Players tune out if they get overloaded with
information.
• Assign a redundant but related function. If the triangle button is slated
for a projectile attack that the player doesn’t have yet, assign the melee
attack to the button until they find that kill- o -zap blaster. The player will
mentally equate the triangle button with combat until the “ true ” move is
unlocked.
With the advent of motion controls like the Wii Remote and Project Natal,
designers now have an opportunity to recreate real- world controls for
moves. But before we get into that, let’ s talk about how to get the most
reality out of traditional controllers.
One of the best examples of recreating real - world moves using an analog
stick can be found in Pitfall: The Lost Expedition. (Activision, 2004). In the
game, water is health and the player carries a canteen to hold water.
Whenever the player comes across a cistern, he pushes the stick forward
to fill the canteen. When he pulls back on the stick, the hero Harry takes a
drink from the canteen to replenish his health. The clever combination of
intention and animation makes this feel very satisfying. Mapping the moves
to logical control locations helps immerse the player into the game world.
In Maximo: Ghosts to Glory, the goal was to create an “ out- of- game ”
correlation between Maximo ’ s moves and the real - world Playstation 2
controller.

-- 186 of 517 --

Dance, Monkey, Dance 163
Maximo ’s overhead swing is performed by pressing the triangle, the button
at the “ top ” of the controller— echoing the swing from high to low, while
the horizontal swing is mapped to the square button on the horizontal
plane of the buttons. The jump, which starts on the ground, is mapped to
the X button, the lowest button on the pad; while the shield throw is mapped
to the circle button— the shape of the button icon matching that of the
shield.
Some genres of games like FPS, RTS, and platformers have widely
accepted control schemes. For example, the space bar, X or A button
usually makes the character jump in a platformer. The more your control
scheme resembles that of other successful games in the same genre, the
more easily your player will embrace it.
Shoulder buttons can be found on most modern console controllers but
consider the actual button size when mapping controls. For example, on an

-- 187 of 517 --

164 LEVEL 7 The Three Cs, Part 3—Controls
Xbox 360 controller, the left and right shoulder buttons are physically
smaller than the left and right shoulder triggers. You should assign “ quick
move ” functions to the shoulder triggers such as shooting, braking, and
acceleration or melee attacks. Why? In the heat of combat or as the
player skids around a corner, the player will want to quickly respond to
the situation. With the smaller shoulder button, there is a risk of the
player ’ s finger slipping off. Use these smaller buttons for “ slow move”
functions, such as precision aiming, looking at a map screen, or swapping
inventory.
Speaking of “quick moves,” I can’ t believe I’ ve gone this far into the chapter
without mentioning this very important thing about controls:
AS THE BUTTON IS PRESSED, THE ACTION SHOULD HAPPEN
Don ’ t get me wrong, I love beautiful character animation as much as the
next guy, but nothing pisses off a player faster than pressing a button and
then having to wait for the gorgeous animation to finish playing. The only
thing that happens quickly in these situations is the player dying due to
misjudged timing or stray enemy attacks. Save the nice animation for the
finish of the move. Or in other words, when the player presses jump, the
game should say “how high?”
Long animation and controls do have their place, as long as there is a
balance between the risk and reward. Mark of Kri has some very long
wind - ups for attacks, but they are the most powerful attacks in the game.
When you hit an enemy with one of those suckers, they aren’ t getting
back up again. The risk is the wind- up; the reward is the high damage or
instant kill.
Character or Camera Relative?
A common snare that game designers can get into is creating controls
that alternate between being character relative and camera relative.
Because of the frustration it can cause to the player, the designer needs to
pick one control scheme or the other for the duration of the game and
STICK WITH IT.
With a camera- relative control scheme, the controls change depending on
which way the character is facing the camera. Say we are playing a survival
horror game: “Terror Zombie Death Mansion 3”, and our stalwart hero
stands in a hallway.

---

## Sección 46: Part 3 — Controls

-- 188 of 517 --

Character or Camera Relative? 165
When the player presses left on the analog stick, the character walks to the
left. The room he enters has the camera pointing at our hero— in the
opposite direction from the shot in the hallway4.
4 Tsk, tsk! Someone has “ crossed the line” with their camera. Didn’ t you read Level 6 ?

-- 189 of 517 --

166 LEVEL 7 The Three Cs, Part 3—Controls
Now when the character presses the stick to
the left, the character walks to the right—
because the controls have been mapped to
how the game camera sees the character,
rather than from the character’s orientation.
Unfortunately, thanks to the backwards
controls, our hero has walked right into the
arms of a zombie, who proceeds to chew out
his brains.
This is why I’ m not such a big fan of the
camera -relative control scheme. I much prefer
a character-relative control scheme. In a
character-relative control scheme, the game
controls are always relative to the player
character. If the control stick is moved to the
left, the character will always move to the left
no matter where the camera is facing. The game compensates for the
player ’ s movement even if the camera turns 180 degrees around.
There ’s no need to get fancy with the controls … unless you are designing
for one of those new- fangled motion controllers.
Shake, Rattle and Roll
Most modern game controllers are outfitted with actuators and
gyroscopes. They are the devices that make most motion controllers like
the ones found on the Wii or the PS3 possible.
An actuator gives feedback to the player
in the form of vibrations. Like with control
schemes, make sure the language of
your actuator usage is consistent. Rather
than blasting the thing off all of the time,
limit it to when a player takes damage or
when they earn a reward. You can have
a lot of fun with actuators, if you take the
time to play with them.
My favorite use of an actuator was in
Silent Hill (Konami, 1999). The developer
figured out how to vibrate the two
actuators at different frequencies to
simulate a heartbeat. Whenever the

-- 190 of 517 --

Shake, Rattle and Roll 167
character was scared or hurt, the controller’ s “ heart ” would vibrate, telling
the player that they were in trouble. It was really creepy and effective.
A gyroscope allows the player to rotate the controller as another way to
manipulate an on- screen element. The control applications for gyroscopes
can be quite robust. I have played games that allow the player to nudge
arrows while in flight (Heavenly Sword), maneuver falling characters (Ratchet
and Clank: Tools of Destruction), or even flip over an entire level (Super
Mario Galaxy).
The most important thing to remember about having the player use
gyroscopes is to clearly communicate the direction they have to turn the
controller in. As the gyroscope is “ hidden ” within the mechanism of the
controller, it’ s easy for a player to forget that this is a control option; make
sure to remind the player that this function is available.
Whatever the action, I find that players respond best when the moves match
a real-world action. If you tell players to swing the controller like a sword (or
a tennis racket, or a bowling ball, or a conductor’ s baton … ) they get it. The
trick is to design and tune your in- game sword to feel like a sword through
animation and physics. Game animations with the right timing, speed and
feel of friction in the world will make them feel less “fl oaty ” and “ gamey ” — a
feeling which is always less desirable to the player.
The fun thing about gyroscopic controls is that you can get away with
silliness. No game plays with the user more than WarioWare: Smooth Moves
(Nintendo, 2006). While there are only about 20 “ moves ” (and half of them
are button presses) that the Wii Remote/nunchuck combo can do, the
designers of WarioWare encourage players to hold the controller in bizarre
ways to play their microgames. But it’ s all part of the fun; the goal is to
make the user look stupid, whether it’ s placing the Wii Remote on your head
like a Mohawk haircut or flipping it like a spatula tossing a pancake.
True motion controls are still in their infancy, especially in the home market,
but here are a few things to keep in mind as we march forward into the
future:
• Many players don’t play video games to exercise. Unless the goal of
your game is for players to lose weight, don’ t forget to build in breaks
and changes in control motions to keep players from wearing out or
suffering repetitive stress injuries.
• Always account for lag: the time it takes between performing an action
and when it happens on screen. As most games are based on timing,
nothing is more frustrating than an action not happening when the player
does it. This is especially true for rhythm games like Rock Band and
fighting games like Street Fighter, where lag issues can screw up the

-- 191 of 517 --

168 LEVEL 7 The Three Cs, Part 3—Controls
player ’s timing and the game becomes too frustrating to play. Guitar
Hero even allows the player to adjust the lag to match the player’ s skill
level.
• An issue with on- line games is latency: a communication delay in the
time it takes for game data to be received and decoded. Latency can
cause lag or in worse cases, control lock- up, sound distortion, game
freeze, or crashes. This is less of a design issue and more of a
programming issue, as tightly written code prevents unnecessary
transmission of data that can cause latency issues.
• Keep your player’ s movements broad. Precise and subtle motions tend
not to register on the game cameras.
• When drawing shapes or glyphs, keep the shapes simple, like circles,
triangles, and lines. Even seemingly uncomplicated shapes like figures
of eight and squares can get misinterpreted by motion- detecting
controllers.
• Don ’ t overdo it. Already many motion-controlled games are getting
dinged for being “waggle - fests”, where the designers make every game
action use the motion control for the sake of it. Make your game controls
a mix of traditional analog stick, button press, and controller motions.
Congratulations! You’ve mastered the Three Cs! But how are you going to
communicate these newly minted design ideas to the player? Come with me
to the remarkable Level 8 …
Level 7’ s Universal Truths and Clever Ideas:
• Let ergonomics play a role in designing control schemes.
• Consider assigning control functions thematically.
• Consider emulating control schemes of other games in
the same genre. Familiarity relieves confusion.
• As the button is pressed, the action should happen.
• Use negative responses as well as positive ones.
• Give your player a break to avoid “ gamer ’ s thumb” and
other health problems (take a break yourself while you
are at it).

---

## Sección 47: Part 3 — Controls

-- 192 of 517 --

Level 7’s Universal Truths and Clever Ideas 169
• Camera- relative controls or character-relative controls?
Pick one and stick with it.
• Avoid creating controls that are contrary to the game’ s
visuals.
• Use the game controller’ s special features to make your
controls more intuitive to the player.
• Beware of lag and latency issues.
• Player ’ s movement with motion controllers should be
broad and mimic reality.

-- 193 of 517 --

-- 194 of 517 --

T
Leve I 8
Sign Language —HUD and
Icon Design
Picture, if you will, another dimension balanced between game and the real;
a dimension of sight and sound, a realm of things and ideas. No, it isn’ t the
Twilight Zone, but the zone known as the HUD.
Named after the heads -up display found in modern aircraft, the HUD is the
most effective way of communicating with the player. The HUD refers to any
visual element that communicates information to the player. The mini
screens and icons found in a HUD are some of the best tools in a video
game designer’ s bag of tricks. They can communicate information, emotion,
even tell the player where to go and what to do. Let’ s look at some of the
HUD elements found on an average game screen:

-- 195 of 517 --

172 LEVEL 8 Sign Language—HUD and Icon Design
1. Health bar/lives
2. Targeting reticule
3. Ammunition gauge
4. Inventory
5. Score/experience
6. Radar/map
7. Context-sensitive prompt.
Health bar
A staple of action, adventure, platform, and shooter games, the health bar
represents how close the player is to death, or having to restart for some
other reason. Health bars are the most flexible of the HUD elements and
come in a variety of forms and imagery depending on the game:
• Many health bars are bars “fi lled ” with color (often red) or icons. As the
player takes damage, they lose a percentage of the bar or the color
empties from the icon. When the bar is gone, the player dies …
• or vice versa, you can have a damage bar. When this bar is full, the
player dies.
• The health bar may represent the status of some sort of on- board
defense system, as seen in the Metroid games.
• Health can be represented as shields. When all of your shields are gone,
the last hit destroys the player, as seen in Star Wars: X-Wing (Lucasarts,
1993). Shields can also be represented as a numeric percentage.
• Health can be represented as a story device. In Assassin ’s Creed (EA,
2007), the health bar represents the game’ s narrative. Stray too far from
the “correct story” and the narrator says “ that ’ s not the way it happened.”
Then the character is “ reset ” back to the proper point in the story.
• Just because a player loses health, it doesn’ t mean they can’ t get it
back. If Halo players find cover and wait, their health bar eventually
recharges back to full. This “wait for health” technique is becoming
increasingly popular in action games and I think it’ s a pretty good
compromise in lieu of a game over/death screen, which pulls the player
out of the game.

-- 196 of 517 --

Targeting 173
• Recently, health bars have become replaced by first person style effects
which are also used in third person view. In Uncharted 2: Among Thieves
(SCEA, 2009), damage is indicated by blood smears or a red blur effect
that “ point ” in the direction of the source of damage. Just don’ t obscure
the player’s view so much that they can’t see the action.
• In Metroid Prime and Batman: Arkham Asylum, if the player is hit by an
electrical attack, the screen “ fritzes ” for a brief moment.
• As the player takes damage in the Call of Duty titles as well as
Uncharted 2, the screen darkens, accompanied by heavy breathing and
a heartbeat sound effect. In Silent Hill the controller’s actuator simulates
a heartbeat as the player is dying.
Targeting
A targeting reticule helps players locate and/or lock onto ranged targets.
They can vary from as simple as the “ dot ” of a laser sight to a complex lock- on
system that also provides target information such as health and range.
• A reticule shouldn’ t dominate the screen, but don’ t make it so small that
it ’ s hard to see.
• I have seen many reticules rendered in white, but this can make them
hard to see on some surfaces and backgrounds.
• Reticules are commonly activated in a zoomed-in mode, such as a
sniper ’ s scope. Some reticules change size to allow for more precise
targeting when zoomed in, as seen in Red Faction: Guerrilla (THQ, 2009).
• Have the reticule change color or “sharpen focus” when over a target.
This gives the player a clue when to fire.
• Give your reticule some “ stickiness ”, also known as “ aim assist.” When
aimed at a target, make the reticule gravitate towards it, allowing for
faster targeting. This works great for vehicular weapon targeting.
• Build in gameplay to your reticule. Team Fortress 2’ s zoomed- in sniper’ s
reticule also projects a laser pointer spot. Enemy players see this spot
and can make efforts to avoid being shot.

-- 197 of 517 --

174 LEVEL 8 Sign Language—HUD and Icon Design
Ammo gauge
Whether your ammunition gauge
displays bullets or a simple number,
it will be one of the most watched
gauges onscreen. As some games
sparsely distribute ammo (Resident Evil 2, I’ m looking at you!), placing this
gauge in an easy to see location is particularly important.
• If you have the screen space, display both clips and individual bullets,
like in Operation Wolf (Taito, 1987).
• If the player has to track multiple types of ammo, such as grenades or
rockets, make sure that they can be brought up with a button press (as
they are in Ratchet and Clank: Tools of Destruction).
• I know this one seems like a no- brainer, but always display the ammo
gauge of the weapon currently armed by the player.
• Even if your player’s weapon has infinite shots, you can still display it to
let them know what weapon is armed. (The Metal Slug games do this.)
Inventory
A staple in adventure and RPGs,
inventory allows players to track
and manipulate objects collected
during the game. Keys, potions,
puzzle items, and weapons are
common inventory items.
• Players need quick access to
items like potions and spell
components. Hotkey or dragand -drop systems will help
players grab items quickly.
• Allow the player a location to
see their inventory items in all
of their glory. Tomb Raider
(Eidos, 1995) shows the items in Lara’ s backpack on a larger scale for
easier inspection.
• Diablo has a limited inventory where each item has a specific size.
Inventory becomes a bit of a puzzle where the player has to fit as many
items as possible into a limited space.

---

## Sección 48: Part 3 — Controls

-- 198 of 517 --

Score 175
• Inventory items can be represented either realistically or as icons.
Whichever graphic style you choose, make sure that they have clear
silhouettes and use simple color schemes.
• If you are going to create a restricted inventory system, allow the player
to expand it later in the game. For example, start with a pouch; expand
to a backpack and eventually a magic bag of infinite holding.
• Make sure the player has another permanent location in the game (like
their home base) where they can store their items. No one likes losing
what they found or bought.
• Why not use a “magic box” like in Resident Evil 2? Whatever items are
stored in the box appear in boxes found further in the game. That way
the player never has to run back and forth through the game world.
Score
In the beginning, there was scoring.
Can you believe the earliest video games only had single- digit scores (Pong
and Computer Space)? It quickly jumped to four (Space Invaders), then six
(Galaxian), and by the time the arcade boom started in the early 1980s the
high score was king. Entering your three-letter handle into a game’ s high
score table was the sign of true mastery— provided the arcade owner didn’ t
reset the machine and wipe it out!
As the home market grew, high score became less important and stat
tracking started to replace it. Text- based combo meters replaced score
bars in games like Devil May Cry (Capcom, 2001). However, with the
increased popularity of online gaming leaderboards, scoring has returned
to live harmoniously alongside combo meters, stats, and achievements.
Scoring indicators can take a variety of forms. They are still most commonly
found in arcade- style games and Japanese RPGs like the Final Fantasy
series, but scoring is starting to creep into western- developed RPGs like
Borderlands1 (2K Games, 2009).
Whatever form your scoring takes, make sure that when it happens, it’ s big
and flashy. Video game developers are great at making players feel
1 Borderlands’ developers call it a RPS— a role- playing shooter— but would that qualify as
picking nits?

-- 199 of 517 --

176 LEVEL 8 Sign Language—HUD and Icon Design
unskilled and stupid, but bad at making them feel good. There’ s no such
thing as overdoing it when congratulating the player. Zack and Wiki: Quest
for Barbaros’ Treasure (Capcom, 2007) does a great job of making even the
worst player feel like the smartest, most skilled player in the world. Every
little successful action results in a shower of fireworks, congratulatory text,
and happy pirate rabbits flipping through the air! And let me tell you,
nothing stokes your ego more than back-fl ipping bunnies!
Here are a few pointers to make your rewards feel rewarding:
• Use voice and sound effects to call attention to whenever a player gets
a reward.
• Freeze gameplay to allow for the player to savor the moment of reward
or have the hero celebrate along with the player with victory animations,
sounds, and effects.
• You can never have too many particles, especially when celebrating an
achievement or awarding a high score.
• The player needs to see a clear “cause and effect” for scoring, so they
understand how they achieved their score. For example, as the player
collects a gold coin in the world, the coin “ travels ” up to a tally. Don’ t
forget the cool “Las Vegas- style ” sound effects. Cha- ching!
• Choose an easy to read font. Ornate fonts (like medieval script) with
heavy stylization or even serifs can be hard to read. Watch text length as
you may run out of screen space!
• Fill up as much of the screen as possible with your celebratory effects,
but don’ t interrupt or cover up gameplay.
Radar/map
The first game radar/map was found in Rally-X (Namco, 1980), which
allowed players to see the location of power- ups without seeing the game
map or enemy cars. Since then, map screens have provided much more
detail to players, from outlining the playfield to revealing secret clues.

-- 200 of 517 --

Context-Sensitive Prompt 177
• Make your map large enough to be legible, but not so big it fills up the
whole screen; if you must have the map fill up the whole screen, do your
player a favor and pause the gameplay.
• Make it easy for the player to move/travel and look at the map at the
same time. It’ s too much of a chore to open a map, memorize the
locations, and then close the map to return to the game. The smart
designers of GTA4 let the players add markers onto the map, which
lead the player right to the objective!
• Create a legend for your map’ s icons so the player can easily identify
and find checkpoints, doorways, quest items, traversal goals, or story
points.
• Be sure to indicate changes in elevation on your map if you have them
in your game world. It’ s too easy for players to get confused when
dealing with levels with multiple elevations. Use a color code or an
“ onion - skin ” effect to show what layer the player is currently on.
• Show the player’ s direction using an arrow or some other icon. This way
the player will know if they have to reorientate themselves in relationship
to goals.
• The fog of war is when a map is obscured until the player actually
“clears the fog” from an area by moving through it. You can always give
your players ways to expose the whole map. Avoid refogging areas as
the player will get confused and turned around on the very thing that is
supposed to help them navigate.
• Add other information to your map to aid the player. Batman: Arkham
Asylum provides a distance-to-goal counter while the Metal Gear series
shows the “detection cone” of enemy guards. Harry Potter and the Order
of the Phoenix (EA, 2007) displays the names of NPCs on the “Marauder’s
Map.”
• Incorporate visual themes into your mini- map. Fantasy maps look good
on parchment, use a high- tech holographic display for a sci- fi game,
and so on. Even the map can add to the game’s gestalt.
Context-sensitive prompt
The context -sensitive prompt is an icon or text that
appears when the player is next to an object or
character with which it interacts. The most common
context-sensitive prompt displays the icon of the
button or control that the player has to use to have
the event happen. For example, in Grand Theft Auto 3,
an icon of the “ Y ” button appears whenever the player
stands next to a car they can hijack.

---

## Sección 49: Part 3 — Controls

-- 201 of 517 --

178 LEVEL 8 Sign Language—HUD and Icon Design
In Maximo: Ghosts to Glory, we created a variation of
context prompts called “plings”: emoticons that told
the player when they couldn’t do an action as well as
when they could. Need ideas for when to use these
guys? Here’s a short list of suggested uses for context
prompts:
• Doors, gates, and/or hatches.
• Mechanics such as cranks, levers, and pushable
objects.
• NPCs: not only for talking anymore, you can use
plings and emoticons to show their emotional
state. Catch them in a good mood and you’ ll get a
better response/reward than if they’ re angry,
scared, or sad.
• Items and weapons that can be collected by the
player.
• Use of vehicle or minigame. There are numerous
games that allow the player to man a machine
gun turret during the middle of regular gameplay.
• Jump locations: The Legend of Zelda games do this.
• Quick time event prompts, as seen in the God of War series: a preset
sequence of events that progress if you press the right button (see the
quick time event section further on in this chapter).
• Combat notification: icons that show when an enemy is vulnerable to a
certain type of attack.
• Secret treasure items: have your icon appear when the player is close to
a hidden item.
In addition, there are HUD elements that are self- explanatory, like fuel
gauges, speedometers, and countdown timers. Just like the others
mentioned above, keeping it clear, clean, and simple is the winning formula
for making a successful HUD system.
The Clean Screen
Ah reality. It’ s a double- edged sword. You want your game to look like
a … dare I say … cinematic experience … but you still need to
communicate gameplay and controls to your player. What to do, what
to do?

-- 202 of 517 --

Icon Has Cheezburger? 179
Well, the first step in keeping your screen clear is to make your HUD
elements move or fade off screen while they are inactive. Of course, they
need to reappear whenever they are valid (such as when the player is taking
damage or collecting treasure) and always make sure that the player has a
quick and easy way to bring them back up if they need to know the
information. A simple shoulder button press usually does the trick.
Some games strive to remove HUD elements altogether. Peter Jackson’ s
King Kong: The Official Game of the Movie (Ubisoft, 2005) utilized a few
prompts at the beginning of the game, but mostly conveyed game
information via sound, animation, and visual effects. The result made for a
very cinematic and immersive experience. If you want to go this route, here
are some suggestions:
• Have characters react to things in the world to indicate function or
interaction. Have them look at collectable items, reach for places they
can get to, comment on things in the world that they are supposed to
interact with, and so on.
• Opt for full- screen -sized effects over smaller or subtle ones. It never
hurts to overemphasize. Use whatever you can to get your point
across — sound, voice, visual effects, color, and lighting.
• Use glows or other attention- drawing effects on items to make them
stand out. Or use what I call the “Scooby Doo effect2. ”
• Use cinematic characters to lead your players through the world. If you
don ’t want to do that much work, have a big ol’ glowey arrow or path
markers show the way.
If video game interfaces were a galaxy of planets and on one side of the
galaxy was the planet “No Interface” then all the way on the other side of
the galaxy would be the planet “Gobs of Interface.” I might add that both of
these are very dumb names for planets, I mean what do the inhabitants of
these planets call themselves? “No Interfacians?” or “ Goblings? ” But I
digress … This is where the RPGs, RTSs, simulations, adventure games,
and some slumming shooters all live. Hello there friendly life forms of planet
Gobs of Interface; let’ s examine your interesting markings and plumage.
Icon Has Cheezburger3
?
2 The “Scooby Doo effect” is named after a by- product seen in Hanna Barbara cartoons of the
late 1960s and 1970s. While the background image of the cartoon is beautifully painted, the
animated elements (such as a character or prop) are more flatly colored (usually lacking
shading), making them unintentionally stand out against the more detailed background.
3 Yeah I know, that was a really really bad pun. Sorry.

-- 203 of 517 --

-- 204 of 517 --

Icon Has Cheezburger? 181
The first thing you ’ ll notice on many RTS and adventure games is that there
are a lot of icons on screen. Icons for tracking stats; icons for weapons;
icons for magic spells; icons for the contents of bags of holding and whatnot.
I believe part of the allure of these icon - heavy games is that the player makes
lots of choices, has lots of things to build and collect. That ’ s OK — not every
game needs to be like one made by Oscar winner Peter Jackson4.
So as you are making icons for your game, here are 1575 things to think about.
• Pick the right image for your icon. If pressing your icon builds tanks,
then guess what picture should be on the icon6?
• Make sure the image that you use is current and accurate. I was working
with a team who had an icon for a stamp function (like an ink stamp)
that looked like a postage stamp. Many of the younger testers didn’ t
even know what a postage stamp was!
• Color-code your icons. Fiery punch? Make it red! (Or at least orange.)
Chilling hand of frost? I’ll give you one guess (blue). You can take color
coding one step further and make the image or background of the icon
a representative color. For example, all the icons that advance the player
to the next screen could be green, and your sword combat icons could
all have a red background or feature that color in the artwork (make sure
it ’ s a different shade of red than the one you are using for fire attacks!).
The goal is for the player to understand similarities between icons and
be able to choose the correct one at a glance.
• If color isn’ t enough, then use shapes as a differentiator.
• Try and avoid text in your icons. Not only will you have to change them
for localization, but they may be too small to read.
• If you are going to use text (like a word) as an icon, make sure it is
legible and looks more like a button than straight text.
• Never, ever combine several visual elements (like text and a character
and a logo) on one icon.
• Surround your icon with a strong black or white outline to make them
“ pop ” off the background.
• Look at all of your icons together to make sure you aren’ t creating any
similar- looking ones. Try to make each of them as individual as possible.
• A good trick is to have text of an item’ s name (spell or whatever) appear
if the player moves their cursor over the icon. A reminder from time to
time never hurts!
4 In 2004 for The Lord of the Rings: Return of the King. He did that HUD- less King Kong
game too. Weren’ t you paying attention?
5 Give or take 150 or so.
6 I can’ t believe you are actually looking down here for an answer!

---

## Sección 50: Part 3 — Controls

-- 205 of 517 --

182 LEVEL 8 Sign Language—HUD and Icon Design
• Don ’t leave creating icons to the programmers. They only care about the
functionality, not the design or the art.
• Learn from the experts. Apple, Adobe, and Microsoft have dedicated icon
artists that create clear and clever icons for their software and operating
systems. You can find great graphic design books and font sets that
incorporate icons. Games that use lots of icons like RTSs and sims are
great sources of inspiration. When we were making Maximo’ s ability
icons we were inspired by the designs on Boy Scout merit badges. Icons
can be found everywhere, don’ t feel you have to reinvent the wheel.
• When the player selects the icon make it do SOMETHING. Change
color, make a clicky sound effect— anything to register user interaction. I
would avoid using a voice effect though, as no one wants to hear “ Good
choice, commander!” every time they press a button. If you need voice,
then only repeat it once every three or so clicks. And make sure to
record a few extra voice cues to avoid repetition. So, to make this
clearer7, think of it this way: click no. 1, “Yes sir!” ; click no. 2, “ Right
away! ”; click no. 3, “ I ’ m on it!” ; click no. 4, “ Yes sir!” ; click no. 5, “ Right
away! … you get the idea.
• The most important button on the interface should be the biggest. This
goes for the most- used button as well.
• Make the most- used buttons easy to reach from the middle of the
screen or wherever the player’ s cursor will spend the most time.
• Make your icons a little “ sticky ” so the cursor will easily gravitate towards
the buttons.
Ultimately, the rule of thumb when creating icons is:
KYSS = KEEP YOUR SYMBOLS SIMPLE8
Today ’ s audiences are very familiar with icons, from comics and cartoons9
to the desktop of their computer, so take advantage of it! Over the years,
video games have developed their own vocabulary of icons. Here are a few
classic examples:
7 Or possibly to make this understandable at all.
8 That’ s Your with an “ I ”.
9 Icons in comics and cartoons? Sure! From stars and tweeting birds over Daffy Duck’ s head
to Pow! bursts when Batman throws a punch, to scratchy marks over Charlie Brown’s head to
show that he’ s mad to those swirly circular “ rootbeer-ootles” coming out of Opus the
penguin to show that he’ s tanked on A& W, you can find icons all over comics and cartoons.

-- 206 of 517 --

Don’t Get QTE 183
• Red cross: used to designate healing items10.
• 1 Up: universal video game- ese for an extra life. Also the head or little
“ doll ” version of the character works well for this.
• Heart: can be used as a replacement for red cross or 1 up.
• Food/soda can/pills: energy or healing. As in “Elf needs food badly11. ”
• Exclamation point: put one above enemies’ heads to show surprise. Put
it above your hero’s head to show they can interact with something.
• “ No ” symbol: which means that the player cannot use or does not need
this. Also used for busting ghosts.
• Skull: poison, death, danger. And sometimes pirates.
• Coin: money, gelt, dough- rey-mi. Howabout a nice big sack o’ cash
lusted after by bank robbers?
• Controller icons: used as a shorthand to prompt the player to press the
specific control for a specific action. You find these a lot in quick time
events, which we’ll come to next. And here we are!
Don ’ t Get QTE
Quick, press the button!
Now press it again. Too late! You died.
Congratulations. You have just lost the first book
based quick time event.
A quick time event, or QTE, is a prompt that forces
the player to make a split-second action or suffer
usually painful or fatal consequences.
10 The Canadian Red Cross has contacted game developers about using the red- colored cross
image in “ violent video games.” The organization interprets the use of the image as a misuse
of their trademark. The video game industry as a whole has not officially addressed their
complaint.
11 I wonder what game has “Elf needs pills badly” ?

-- 207 of 517 --

184 LEVEL 8 Sign Language—HUD and Icon Design
Dragon ’ s Lair (Cinematronics, 1983) first
featured QTE gameplay— hell, the entire
game is a quick time event— but after a brief
spurt of similar arcade games (Cliffhanger,
Space Ace, Thayer’s Quest) QTEs almost
went the way of the text adventure.
Shenmue (Sega, 1999) brought them back
and christened them QTEs at the same
time. They’ve become a gameplay staple
since Resident Evil 4 and God of War made
them popular.
Players either love or hate QTEs, but they
are here to stay. There’ s no need to hate them though; they’ re just one
more gameplay tool in a designer’ s tool kit. The trick is to use them
responsibly:
• Never use a QTE for something the player can do for themselves in
the game. I prefer to use them as shortcuts to cinematic sequences.
Save QTEs for big exciting moments and nigh- impossible actions.
• Timing is everything. Give the player a “ beat ” to process the appearance
of a QTE icon and another “ beat ” to press the appropriate button.
• Don ’t string them out for too long; as most QTEs need to be repeated if
the player fails the sequence, there is nothing worse than having to
repeat the QTE over and over and over again.
• There ’s something worse than repeating a QTE, and that’s a QTE that
doesn ’t play fair. While random QTE icons sound like a good way to
introduce variety, this is the one time you want predictability in your
game. Once the player memorizes the pattern, they can concentrate
on watching the cool actions. Now I know what you are saying. “ Wait
a second! There are video games with random QTEs in them.” And I’ d
say “You are correct.” However, I just don’ t like them. They make the
player feel like they won because they were lucky, not by their own
skill.
• Keep your QTE controls to a single set of controls. Most games use the
buttons or sometimes a stick. Try not to use the harder- to - reach
shoulder buttons.
• Make sure the QTE icons are big and easy to see. Keep their placement
consistent: don’ t move them around.
• Try not making the QTE mandatory. Both Uncharted 2 and Batman:
Arkham Asylum offer QTEs as options for dispatching enemies, however,
if the player misses that opportunity they still have plenty of other ways
to take the bad guys out.

---

## Sección 51: Part 3 — Controls

-- 208 of 517 --

HUDs, and Where to Stick ‘Em 185
• When using motion- controlled QTEs, keep the waggling short. And if
you are going to make them waggle the controller, don’ t do it too
many times in a row. Gamers want to play your game, not get wrist
injuries.
HUDs , and Where To Stick ‘ Em
Now that you have created a whole mess of beautiful icons, what are you
going to do with ‘em? Why slap ‘ em up onto the screen, of course! But
before you are going to display them willy- nilly, let’ s see where they can go.
Our zombie friend is going to help us out with this one.
This part of the screen is sometimes
known as the “safe frame” because
screen objects almost never get
obscured out here in the middle.
Since the middle of the screen is
where the action is, please refrain
from putting your HUD there. (Unless
it ’ s for targeting, a reticule, or id’ ing
game objects.) If you have to bring
up a full- screen display, consider
making it translucent like the
holographic screen in Dead Space
(EA, 2008). This way, the player
doesn ’t get disjointed from their
environment and “lose their place” in
the game world.
The upper left side of the screen is
traditionally used for the most
important information: health, score,
and so on. As the (westerner’ s12) eye
travels from left to right when reading
information, putting icons to the left
so the eye can travel back “ into ” the
game on the right usually feels pretty
good to the player.
12 While many Asian and Middle Eastern languages read right to left, I can’t think of a single
video game that displays information on the screen in this way.

-- 209 of 517 --

186 LEVEL 8 Sign Language—HUD and Icon Design
Displaying icons along the bottom of
the screen works well too, as long as
you watch out for clipping that can
occur if a player is using a monitor or
TV screen that isn’ t calibrated for your
game. Assume at
