# 📚 Libro Completo: Game Mechanics: Advanced Game Design

**Alcance:** Fuente bibliográfica completa sobre Economías Internas de Juegos, Bucles de Retroalimentación Positiva/Negativa, Balance Matemático y Progresión (Game Mechanics: Advanced Game Design — Ernest Adams & Joris Dormans). Aplicable a la Software Factory Web y DiggityBets. NO sustituye los contratos de API de Kick ni las reglas específicas de negocio en `CANON_*`.

> **Autor:** Ernest Adams & Joris Dormans  
> **Dominio:** Economías Internas de Juegos, Bucles de Retroalimentación Positiva/Negativa, Balance Matemático y Progresión  
> **Archivo Fuente:** `dokumen.pub_game-mechanics-advanced-game-design-0321820274-9780321820273.pdf`  
> **Páginas Originales:** 443  
> **Secciones Extraídas:** 103  
> **Fecha de Ingesta:** 2026-10-19  

---

## Sección 1: Foundations & Introduction

ptg8274339
Game Mechanics
Advanced Game Design
Ernest Adams
Joris Dormans

-- 1 of 443 --

Game Mechanics
Advanced Game Design
Ernest Adams
Joris Dormans

-- 2 of 443 --

Game Mechanics: Advanced Game Design
Ernest Adams and Joris Dormans
New Riders Games
1249 Eighth Street
Berkeley, CA 94710
(510) 524-2178
Fax: (510) 524-2221
Find us on the Web at www.newriders.com
To report errors, please send a note to errata@peachpit.com
New Riders Games is an imprint of Peachpit, a division of Pearson Education
Copyright © 2012 Ernest Adams and Joris Dormans
Senior Editor: Karyn Johnson
Developmental Editor: Robyn Thomas
Technical Editor: Tobi Saulnier
Copy Editor: Kim Wimpsett
Production Editor: Cory Borman
Composition: WolfsonDesign
Proofreader: Bethany Stough
Indexer: Valerie Perry
Interior Design: Charlene Will, WolfsonDesign
Cover Design: Peachpit Press/Charlene Will
Notice of Rights
All rights reserved. No part of this book may be reproduced or transmitted in any form by
any means, electronic, mechanical, photocopying, recording, or otherwise, without the prior
written permission of the publisher. For information on getting permission for reprints and
excerpts, contact permissions@peachpit.com. See the next page for image credits.
Notice of Liability
The information in this book is distributed on an “As Is” basis, without warranty. While every
precaution has been taken in the preparation of the book, neither the authors nor Peachpit
shall have any liability to any person or entity with respect to any loss or damage caused or
alleged to be caused directly or indirectly by the instructions contained in this book or by the
computer software and hardware products described in it.
Trademarks
Many of the designations used by manufacturers and sellers to distinguish their products are
claimed as trademarks. Where those designations appear in this book, and Peachpit was aware
of a trademark claim, the designations appear as requested by the owner of the trademark. All
other product names and services identified throughout this book are used in editorial fashion
only and for the benefit of such companies with no intention of infringement of the trademark. No such use, or the use of any trade name, is intended to convey endorsement or other
affiliation with this book.
ISBN-13: 978-0-321-82027-3
ISBN-10: 978-0-321-82027-4
9 8 7 6 5 4 3 2 1
Printed and bound in the United States of America

-- 3 of 443 --

Respectfully dedicated to the memory of Mabel Addis Mergardt,
principal designer of The Sumerian Game (later made famous
as HAMURABI), the first game with an internal economy that
I ever played.
— Ernest W. Adams
To Marije van Dodeweerd for love.
— Joris Dormans

-- 4 of 443 --

iv Game mechanics: advanced Game desiGn
Acknowledgments
The genesis of this book was a late-night meeting between the two of us during the
G-Ameland student game jam festival on a small island off the north coast of the
Netherlands. Joris Dormans showed the Machinations framework to Ernest Adams,
and Ernest Adams promptly said, “We should write a book about game mechanics.”
But it took nearly two years and the advice and assistance of many other people
before we were done. Now it is time to thank them.
Our deepest appreciation goes to Mary Ellen Foley and Marije van Dodeweerd, our
beloved mates, who patiently tolerated very late nights, missed holidays and weekends, and the occasional rant about the vagaries of the writing process. We’ll make
it up to you if we can!
Stéphane Bura suggested that Joris should create an interactive tool when he saw the
original, static version of the Machinations diagrams.
Jesper Juul made the invaluable distinction between games of emergence and games
of progression that informs the entire book.
Remko Scha had a big impact on the formal scrutiny of the Machinations framework in his capacity as Joris Dormans’s PhD supervisor.
Mary Ellen Foley kindly checked and corrected all our references.
The colleagues and students at the Amsterdam University of Applied Sciences always
have been willing test subjects for much of the material that ended up in this book.
We must also thank a number of people for permission to reproduce images:
Alexandre Duret-Lutz, for his photo of The Settlers of Catan; Andrew Holmes, for
his photo of Kriegsspiel; Jason Lander, for his photo of Power Grid; Johan Bichel
Lindegaard, for his photo of Johan Sebastian Joust; Wikimedia Commons contributor
popperipopp, for his or her photo of the game Connect Four. We are also grateful
to the Giant Bomb website (www.giantbomb.com), for permission to reproduce screen
shots from their collection.
Thanks to Mika Palmu, Philippe Elsass, and all other contributors to FlashDevelop,
for creating the open source development tool that was used to program the
Machinations Tool.
We are extremely grateful to the many anonymous people who have helped to build
Inkscape, the open source Scalable Vector Graphics editor, without which it would
have been much more difficult to produce our illustrations.

-- 5 of 443 --

v
As Elrond said, the last place is the place of honor. We thank Margot Hutchison,
Ernest Adams’s agent, for assistance with the contract. Tobi Saulnier was our wise
and sharp-eyed technical editor. Her suggestions are present but invisible throughout the book, and we’re deeply grateful that the CEO of a game company would be
willing to take the time to help us. Robyn G. Thomas, our tireless (and seemingly
sleepless) development editor, pleaded, cajoled, threatened, and oversaw the whole
process with her usual flair and attention to detail. And finally, special thanks to
Karyn Johnson, senior editor at Peachpit Press, for having the faith in us to let us
write the book in the first place.
We hasten to add that the blame for any errors or omissions belongs entirely to us
and not to any of the foregoing.
We welcome all comments, questions, and criticism; please write to Joris Dormans
at jd@jorisdormans.nl and to Ernest W. Adams at ewadams@designersnotebook.com.
About the Authors
Ernest W. Adams is an American game design consultant and teacher residing in
England. In addition to his consulting work, he gives game design workshops and
is a popular speaker at conferences and on college campuses. Mr. Adams has worked
in the interactive entertainment industry since 1989 and founded the International
Game Developers’ Association in 1994. He was most recently employed as a lead
designer at Bullfrog Productions, and for several years before that, he was the audio/
video producer on the Madden NFL line of football games at Electronic Arts. In his
early career, he was a software engineer, and he has developed online, computer,
and console games for machines from the IBM 360 mainframe to the present day.
Mr. Adams is the author of four other books, including Fundamentals of Game Design,
the companion volume to this book. He also writes the Designer’s Notebook series
of columns on the Gamasutra game developers’ webzine. His professional website is
at www.designersnotebook.com.
Joris Dormans (PhD) is a Dutch lecturer, researcher, and gameplay engineer based
in Amsterdam, the Netherlands, working in industry and higher education since
2005. For the past four years, he has been researching formal tools and methods to
design game mechanics. His other area of research focuses on how to leverage formal design methods to generate games procedurally. Dr. Dormans has presented
papers and hosted workshops on game design on many academic and industry
conferences. As an independent freelance game designer, he published and worked
on several video and board games. Among these are story-driven adventure games,
physical platform games, and a satirical political card game. He has also participated
in all Global Game Jams to date. His professional website is at www.jorisdormans.nl.

---

## Sección 2: Foundations & Introduction

-- 6 of 443 --

vi Game mechanics: advanced Game desiGn
About the Technical Editor
Tobi Saulnier is founder and CEO of 1st Playable Productions, a game development
studio that specializes in design and development of games tailored to specific
audiences. Games developed by 1st Playable span numerous genres to appeal to
play styles and preferences of each group and include games for young children,
girls, middle schoolers, young adults, and some that appeal to broad audiences.
The studio also creates games for education. Before joining the game industry in
2000, Tobi managed R&D in embedded and distributed systems at General Electric
Research and Development, where she also led initiatives in new product development, software quality, business strategy, and outsourcing. She earned her BS, MS,
and PhD in Electrical Engineering from Rensselaer Polytechnic Institute.

-- 7 of 443 --

ContEnts
Introduction ......................................................... xi
Who Is This Book For? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .xii
How Is This Book Organized? . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .xii
Companion Website . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . xiii

---

## Sección 3: ChAptEr 1

Designing Game Mechanics ...................................1
Rules Define Games . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1
Discrete Mechanics vs. Continuous Mechanics . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 9
Mechanics and the Game Design Process . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 12
Prototyping Techniques . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 15
Summary. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 21
Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .22

---

## Sección 4: ChAptEr 2

Emergence and progression................................ 23
The History of Emergence and Progression . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .23
Comparing Emergence and Progression . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .24
Games of Emergence . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .26
Games of Progression . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .30
Structural Differences. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 37
Emergence and Progression Integration . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 39
Summary. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 41
Exercise . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .42

---

## Sección 5: ChAptEr 3

Complex systems and the structure
of Emergence ..................................................... 43
Gameplay as an Emergent Property of Games . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 43
Structural Qualities of Complex Systems . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 47
Harnessing Emergence in Games . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 57
Summary. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 58
Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 58
vii
Contents

-- 8 of 443 --

viii Game mechanics: advanced Game desiGn

---

## Sección 6: ChAptEr 4

Internal Economy................................................59
Elements of Internal Economies . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 59
Economic Structure . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 62
Uses for Internal Economies in Games . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 71
Summary. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 78
Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 78

---

## Sección 7: ChAptEr 5

Machinations ...................................................... 79
The Machinations Framework . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 79
Machinations Diagram Basic Elements . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 82
Advanced Node Types . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 93
Modeling Pac-Man . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 98
Summary. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 104
Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 104

---

## Sección 8: ChAptEr 6

Common Mechanisms ....................................... 107
More Machinations Concepts . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 107
Feedback Structures in Games . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 113
Randomness vs. Emergence . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 126
Example Mechanics . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 130
Summary. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 144
Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 145

---

## Sección 9: ChAptEr 7

Design patterns ................................................ 147
Introducing Design Patterns . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 147
Machinations Design Pattern Language . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 151
Leveraging Patterns for Design . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 168
Summary. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 169
Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 170

-- 9 of 443 --

ix
ContEnts

---

## Sección 10: ChAptEr 8

simulating and Balancing Games......................... 171
Simulated Play Tests . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 171
Playing with Monopoly . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 179
Balancing SimWar . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 187
From Model to Game . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 195
Summary. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 195
Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 196

---

## Sección 11: ChAptEr 9

Building Economies............................................ 197
Economy-Building Games . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 197
Analyzing Caesar III . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 199
Designing Lunar Colony . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .206
Summary. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 219
Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .220

---

## Sección 12: ChAptEr 10

Integrating Level Design and Mechanics .............221
From Toys to Playgrounds . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 221
Missions and Game Spaces . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .229
Learning to Play . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .238
Summary. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .244
Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .246

---

## Sección 13: ChAptEr 11

progression Mechanisms .................................. 247
Lock-and-Key Mechanisms . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 247
Emergent Progression . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .258
Summary. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 270
Exercises . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 270

-- 10 of 443 --

x Game mechanics: advanced Game desiGn

---

## Sección 14: chapter 12

Meaningful Mechanics ....................................... 271
Serious Games 271
Communication Theory 276
The Semiotics of Games and Simulations 282
Multiple Layers of Meaning 294
Summary 299
Exercises 300
appendix a
Machinations Quick reference ........................... 301
appendix B
design pattern Library ...................................... 303
Static Engine 303
Dynamic Engine 305
Converter Engine 308
Engine Building 311
Static Friction 314
Dynamic Friction 316
Stopping Mechanism 319
Attrition 321
Escalating Challenge 325
Escalating Complexity 327
Arms Race 330
Playing Style Reinforcement 333
Multiple Feedback 336
Trade 336
Worker Placement 336
Slow Cycle 336
appendix c
Getting Started with Machinations ..................... 337
references....................................................... 338
index ................................................................. 341
Online appendix B...............................................B-1
Online appendix c ............................................... c-1

-- 11 of 443 --

IntroDuCtIon
This is a book about games at their deepest level. No matter how good a game looks,
it won’t be fun if its mechanics are boring or unbalanced. Game mechanics create
gameplay, and to build a great game, you must understand how this happens.
Game Mechanics will show you how to design, test, and tune the core mechanics of
a game—any game, from a huge role-playing game to a casual mobile phone game
to a board game. Along the way, we’ll use many examples from real games that you
may know: Pac-Man, Monopoly, Civilization, StarCraft II, and others.
This book isn’t about building Unreal mods or cloning somebody else’s app that’s
trending right now. It’s called Advanced Game Design for a reason. We wrote Game
Mechanics to teach you the timeless principles and practice of mechanics design
and, above all, to give you the tools to help you do it—for a class, for a career, for
a lifetime.
We also provide you with two unique features that you won’t find in any other
textbook on game design. One is a new tool called Machinations that you can use to
visualize and simulate game mechanics on your own computer, without writing any
code or using a spreadsheet. Machinations allows you to actually see what’s going
on inside your mechanics as they run and to collect statistical data. Not sure if your
internal economy is balanced correctly? Machinations will let you perform 1,000
runs in a few seconds to see what happens and put all the data at your fingertips.
Machinations was created by Joris Dormans and is easy to use on any computer
that has Adobe Flash Player installed in its web browser. You don’t have to use the
Machinations Tool to benefit from the book, though. It’s simply there to help reinforce the concepts.
The other unique feature of Game Mechanics is our design pattern library. Other authors
have tried to document game design patterns before, but ours is the first to distill
mechanics design to its essence: the deep structures of game economies that generate challenge and the many kinds of feedback loops. We have assembled a collection
of classic patterns in various categories: engines of growth, friction, and escalation,
plus additional mechanisms that create stability cycles, arms races, trading systems,
and many more. We’ve made these general enough that you can apply them to
any game you build, yet they’re practical enough that you can load them in the
Machinations Tool and see how they work.
Game mechanics lie at the heart of all game design. They implement the living
world of the game; they generate active challenges for players to solve in the game
world, and they determine the effects of the players’ actions on that world. It is the
game designer’s job to craft mechanics that generate challenging, enjoyable, and
well-balanced gameplay.
We wrote this book to help you do that.
xi
Introduction

-- 12 of 443 --

xii Game mechanics: advanced Game desiGn
Who Is This Book For?
Game Mechanics is aimed at game design students and industry professionals
who want to improve their understanding of how to design, build, and test the
mechanics of a game. Although we have tried to be as clear as we can, it is not
an introductory work. Our book expands on the ideas in another book by Ernest
Adams called Fundamentals of Game Design (New Riders). We refer to it from time
to time, and if you lack a grounding in the basics of game design, you might find it
helpful to read the current edition of Fundamentals of Game Design first.
The chapters in Game Mechanics end with exercises that let you practice the principles we teach. Unlike the exercises in Fundamentals of Game Design, many of them
require a computer to complete.
How Is This Book Organized?
Game Mechanics is divided into 12 chapters and 2 appendixes that contain valuable
reference information. There is also a quick reference guide to Machinations in
Appendix A.

---

## Sección 15: Chapter 1, “Designing Game Mechanics,” establishes key ideas and defines terms

that we use in the book, and it discusses when and how to go about designing game
mechanics. It also lists several forms of prototyping.

---

## Sección 16: Chapter 3, “Complex Systems and the Structure of Emergence,” describes the nature

concepts of emergence and progression.
of complexity and explains how complexity creates emergent, unpredictable game
systems.

---

## Sección 17: Chapter 4, “Internal Economy,” offers an overview of internal economies. We show

how the structure of an economy creates a game shape and produces different phases
of gameplay.

---

## Sección 18: Chapter 5, “Machinations,” introduces the Machinations visual design language and

the Machinations Tool for building and simulating mechanics. It includes an extensive example using Pac-Man as a model.

---

## Sección 19: Chapter 6, “Common Mechanisms,” describes a few of the more advanced features

of Machinations and shows how to use it to build and simulate a wide variety of
common mechanisms, with examples from many popular game genres.

---

## Sección 20: Chapter 7, “Design Patterns,” provides an overview of the design patterns in our

design pattern library and offers suggestions about how to use them to brainstorm
new ideas for your designs.

-- 13 of 443 --

xiii
IntroDuCtIon

---

## Sección 21: Chapter 8, “Simulating and Balancing Games,” explains how to use Machinations

to simulate and balance games, with case studies from Monopoly and Will Wright’s
SimWar.

---

## Sección 22: Chapter 9, “Building Economies,” explores economy-building games, using Caesar

III as an example, and takes you through the design and refinement process for a
new game of our own, Lunar Colony.

---

## Sección 23: Chapter 10, “Integrating Level Design and Mechanics,” moves into new territory,

looking at how game mechanics integrate with level design and how properly
sequenced challenges help the player learn to play.

---

## Sección 24: Chapter 11, “Progression Mechanisms,” discusses two kinds of progression. We start

with traditional lock-and-key mechanics and then consider emergent progression
systems in which progress is treated a resource within the economy of the game.

---

## Sección 25: Chapter 12, “Meaningful Mechanics,” concludes the book with an exploration of the

role of mechanics in transmitting meaning in games that have a real-world message
to send. This topic is increasingly important now that game developers are making
more serious games: games for health care, education, charity, and other purposes.
Appendix A, “Machinations Quick Reference,” lists the most commonly used
elements of the Machinations Tool.
Appendix B, “Design Pattern Library,” contains several patterns from our design
pattern library. You can find the completed design pattern library in the online
Appendix B at www.peachpit.com/gamemechanics and a much more extensive discussion of each design pattern in Chapter 7.
Appendix C, “Getting Started with Machinations,” is available online at
www.peachpit.com/gamemechanics and provides a tutorial for using the
Machinations Tool.
Companion Website
At www.peachpit.com/gamemechanics you’ll find material for instructors, digital copies
of many of the Machinations diagrams used in this book, more design patterns,
and a step-by-step tutorial to get you started with Machinations. To get access to
this bonus material, all you need to do is register yourself as a Peachpit reader. The
material on the website may be updated from time to time, so make sure you have
the latest versions.

-- 14 of 443 --

This page intentionally left blank

-- 15 of 443 --

---

## Sección 26: ChAptEr 1

Designing Game
Mechanics
Game mechanics are the rules, processes, and data at the heart of a game. They
define how play progresses, what happens when, and what conditions determine
victory or defeat. In this chapter, we’ll introduce five types of game mechanics and
show how they’re used in some of the more common video game genres. We’ll
also discuss at what stage during the game design process you should design and
prototype mechanics, and we’ll describe three kinds of prototyping, addressing
the strengths and weaknesses of each. By the end of the chapter, you should have
a clear understanding of what game mechanics are for and how to think about
designing them.
Rules Define Games
There are many different definitions of what a game is, but most of them agree that
rules are an essential feature of games. For example, in Fundamentals of Game Design,
Ernest Adams defines games as follows:
A game is a type of play activity, conducted in the context of a pretended reality, in
which the participants try to achieve at least one arbitrary, nontrivial goal by acting in
accordance with rules.
In Rules of Play, Katie Salen and Eric Zimmerman write the following:
A game is a system in which players engage in artificial conflict, defined by rules, that
results in a quantifiable outcome.
In Half-Real, Jesper Juul says this:
A game is a rule-based system with a variable and quantifiable outcome, where different outcomes are assigned different values, the player exerts effort in order to influence the
outcome, the player feels emotionally attached to the outcome, and the consequences of
the activity are negotiable.
(Emphasis added in all cases.) We don’t intend to compare these different definitions
or to claim that one of them is the best. The point is that they all refer to rules. In
games, rules determine what players can do and how the game will react.

---

## Sección 27: ChAptEr 1

-- 16 of 443 --

2 Game mechanics: advanced Game desiGn
Games as state machines
many games, and game components, can be understood as state machines (see, for
example, Järvinen 2003; Grünvogel 2005; Björk & holopainen 2005). a state machine
is a hypothetical machine that can exist in a certain number of different states, each
state having rules that control the machine’s transition from that state into other states.
Think of a dvd player: When a dvd is playing, the machine is in the play state. Pressing
the pause button changes it to the paused state, while pressing the stop button causes
it to return to the dvd menu—a different state. Pressing the play button does nothing
at all—the player remains in the play state.
a game begins in an initial state, and the actions of the player (and often the mechanics,
too) bring about new states until an end state is reached. in the case of many single-player
video games, the player either wins, loses, or quits. The game’s state usually reflects
the player’s location; the location of other players, allies, and enemies; and the current
distribution of vital game resources. By looking at games as state machines, researchers
can determine which rules cause the game to progress from one state to another. several
successful methods allow computer scientists to design, model, and implement state
machines with a limited (finite) number of states. however, in contrast to dvd players,
games can exist in a vast number of states, far too many to document.
Finite state machines are sometimes used in practice to define the behavior of simple
artificially intelligent non-player characters. Units in a war game often have states such
as attacking, defending, and patrolling. however, because this is not a book about artificial intelligence, we won’t be addressing those techniques here. state machine theory is
not useful for studying the kinds of complex mechanics that this book is about.
Games Are Unpredictable
A game’s outcome should not be clear from the start: To a certain extent, games
should be unpredictable. A game that is predictable is usually not much fun. A simple
way of creating unpredictable outcomes is to include an element of chance, such as
a throw of the dice or the twirl of a spinner in a board game. Short games such as
blackjack or Klondike (the most familiar form of solitaire played with cards) depend
almost entirely on chance. In longer games, however, players want their skills and
their strategic decisions to make more of a difference. When players feel that their
decisions and game-playing skills do not matter, they quickly become frustrated.
Pure games of chance have their place in a casino, but for most other games, skill
should also contribute to victory. The longer the game is, the more true this is.
In addition to chance, there are two other, and more sophisticated, ways to make
games unpredictable: choices made by players and complex gameplay created by the
game’s rules.
NOT E in games and
simulations, processes
that include elements
of chance (such as
moving a certain distance based upon a
die roll) are called
stochastic processes.
Processes that do not
include chance, and
whose outcome can be
determined from their
initial state, are called
deterministic processes.

-- 17 of 443 --

desiGninG Game mechanics 3

---

## Sección 28: ChAptEr 1

A simple game such as rock-paper-scissors (or roshambo/rochambeau) is unpredictable because its outcome depends on the decisions made by the players. The rules
do not favor one choice or another; they do not suggest a particular strategy. Trying
to second-guess or influence the choice of your opponent might involve empathy
or reverse psychology, but it remains largely outside the individual player’s control.
The classic board game Diplomacy uses a similar mechanism. In this game, players
control only a handful of armies and fleets. Victory in battle simply goes to the side
that committed the largest number of units to a battle. However, because all the
players write down their moves secretly and resolve their turns simultaneously, the
players must use their social skills to find out where their opponent will strike and
to convince their allies to support their offensive and defensive maneuvers.
When the rules of a game are complex, they can also make a game unpredictable,
at least to human beings. Complex systems usually have many interacting parts.
The behavior of individual parts might be easy to understand; their rules might be
simple. However, the behavior of all the parts combined can be quite surprising and
difficult to foresee. The game of chess is a classic example of this effect. The movement rules of the 16 chess pieces are simple, but those simple rules produce a game
of great complexity. Whole libraries have been written about chess strategies. Expert
players try to lure opponents into traps involving many pieces that might take multiple turns to execute. In this type of game, the ability to read a game’s current state
and understand its strategic complexities is the most important game-playing skill.
Most games mix these three sources of unpredictability. They include an element of
chance, player choices, and complex rules. Different players prefer different combinations of these techniques. Some like games that involve many random factors,
while others prefer games where complexity and strategy are key. Of these three
options, chance is the easiest to implement but not always the best source of unpredictability. On the other hand, complex rule systems that offer many player choices
are difficult to design well. This book will help you with that task. We devote most
of the chapters to designing rule systems that create, among other things, interesting choices for players. In Chapter 6, “Common Mechanisms,” we cover random
number generators (the software equivalent of dice) and discuss them at several other
points as well, but we feel that chance serves a supporting, rather than a central,
role in mechanics design.
From Rules to Mechanics
The video game design community usually prefers the term game mechanics to game
rules because rules are considered printed instructions that the player is aware of, while
the mechanics of video games are hidden from the player, that is, implemented in
software for which the player is given no direct user interface. Video game players
don’t have to know what the game’s rules are when they begin; unlike board and card
games, the video game teaches them as they play. Rules and mechanics are related
concepts, but mechanics are more detailed and concrete. For example, the rules of
Monopoly consist of only a few pages, but the mechanics of Monopoly include the

-- 18 of 443 --

4 Game mechanics: advanced Game desiGn
prices of all the properties and the text of all the Chance and Community Chest
cards—in other words, everything that affects the operation of the game. Mechanics
need to be detailed enough for game programmers to turn them into code without
confusion; mechanics specify all the required details.
The term core mechanics is often used to indicate mechanics that are the most influential, affecting many aspects of a game and interacting with mechanics of lesser
importance, such as those that control only a single game element. For example,
the mechanics that implement gravity in a platform game are core mechanics; they
affect almost all moving objects in the game and interact with mechanics for jumping or the mechanics that control damage to falling characters. On the other hand,
a mechanic that merely enables players to move items around in their inventories
would not be a core mechanic. The artificial intelligence routines that control the
behavior of autonomous non-player characters are also considered not core mechanics.
In video games, the core mechanics are mostly hidden, but players will learn to
understand them while playing. Expert players will deduce what the core mechanics must be by watching the behavior of the game many times; they will learn
how to use a game’s core mechanics to their advantage. The distinction between
core mechanics and non-core mechanics is not clear-cut; even for the same game,
interpretation of what is core and what is not can vary between designers or even
between different contexts within the game.
mechanic or mechanism
Game designers are perfectly comfortable talking about a game mechanic in the singular
form. They don’t mean a person who repairs game engines! instead, they are referring to
a single game mechanism that governs a certain game element. in this book, we prefer
to use mechanism as the singular form, indicating a single set of game rules associated
with a single game element or interaction. One such mechanism might include several
rules. For example, the mechanic of a moving platform in a side-scrolling platform game
might include the speed of the platform’s movement, the fact that creatures can stand on
it, the fact that they are moved along with it when they do, and the fact that the platform’s
velocity is reversed when it bounces into other game elements or perhaps after it has
traveled a particular distance.
Mechanics Are Media-Independent
The mechanics of a game can be implemented through many different media. In
the case of a board game, the mechanics are implemented through the medium of
the game’s paraphernalia: board, counters, playing pieces, spinners, and so on. The
same game can also be published as a video game. In that case, the same mechanics
will be implemented in software, which is a different medium.

---

## Sección 29: ChAptEr 1

-- 19 of 443 --

desiGninG Game mechanics 5
Because mechanics are media-independent, most game scholars do not distinguish
between video games, board games, and even physical games. The relationships
between different entities in the game is much the same whether implemented on a
board, with pieces you move by hand, or on a computer screen, with images moved
for you by software. Not only can the same game be played in different media,
sometimes a single game can use more than one medium. Today more and more
games are hybrids: board games that include simple computers, or physical games
facilitated by clever devices hooked up to remote computers.
In addition, the media independence of game mechanics allows designers to create
mechanics for one game but then implement that game in several different media;
this cuts down on development time, since the design work is done only once.
hybrid Game example
The game Johann Sebastian Joust, developed by the copenhagen Games collective, is an
excellent example of hybrid game design. The game uses no screen, only speakers, and
takes place in an open area in which each player holds a Playstation move controller
(Figure 1.1). Players who move their controller too fast are eliminated from the game, so
players try to eliminate each other by shoving other players’ controllers, while maneuvering
carefully to protect their own controllers, all in slow motion. Occasionally the tempo of
the background music speeds up, indicating the speed at which the player can move safely.
Johann Sebastian Joust is a hybrid multiplayer game that blends physical performance
with simple computer-implemented mechanics to create a satisfying player experience.
FIGURe 1.1 Johann Sebastian Joust in full swing.
image courtesy of Johan Bichel Lindegaard under a creative commons (cc BY 3.0) license.

-- 20 of 443 --

6 Game mechanics: advanced Game desiGn
Using different media can help when creating prototypes. Programming software
usually takes much more work than simply writing down mechanics as rules for
a board game. If the same game can be played in a board game or physical game
form, it’s a good idea to try the rules/mechanics in one of those forms before going
to the trouble and expense of implementing them on a computer. As you’ll see in
the next section, efficient prototyping techniques are important tools in the game
designer’s toolbox.
Five Different Types of Mechanics
The term mechanics has come to indicate many different types of underlying relationships between entities in games. Here are five different types of mechanics that
you might expect to find in a game:
n Physics. Game mechanics sometimes define physics—the science of motion and
force—in the game world (which can be different from the physics of the real world).
In games, characters commonly move from place to place, jump up and down, or
drive vehicles. Computing a game element’s position, the direction in which it is
moving, and whether it intersects or collides with other elements makes up the bulk
of the calculations in many games. Physics plays a large role in many modern games,
from ultrarealistic first-person shooters to the popular physics-puzzle games such
as Angry Birds. The implementation is seldom strict; however, games with so-called
cartoon physics use a modified version of Newtonian mechanics so that characters
can do non-Newtonian things such as change direction while in midair. (We also
consider such things as timing and rhythm challenges to be part of a game’s physics.)
n Internal economy. The mechanics of transactions involving game elements
that are collected, consumed, and traded constitute a game’s internal economy.
The internal economy of a game typically encompasses items easily identified as
resources: money, energy, ammunition, and so on. However, a game’s economy
is not limited to concrete, tangible items; it can also include abstractions such as
health, popularity, and magical power. In any Zelda game, Link’s hearts—a visible
measure of his life energy—are part of the internal economy. Skill points and other
quantified abilities in many role-playing games also qualify; these games have very
complex internal economies.
n Progression mechanisms. In many games, level design dictates how a player can
move through the game world. Traditionally, the player’s avatar needs to get to a
particular place to rescue someone or to defeat the main evil-doer and complete the
level. In this type of game, the progress of the player is tightly controlled by a number of mechanisms that block or unlock access to certain areas. Levers, switches, and
magical swords that allow you to destroy certain doors are typical examples of such
progression mechanisms.

-- 21 of 443 --

desiGninG Game mechanics 7

---

## Sección 30: ChAptEr 1

n Tactical maneuvering. Games can have mechanics that deal with the placement
of game units on a map for offensive or defensive advantages. Tactical maneuvering
is critical in most strategy games but also features in some role-playing and simulation games. The mechanics that govern tactical maneuvering typically specify what
strategic advantages each type of unit may gain from being in each possible location.
Many games restrict the location of units to discrete tiles, as is the case for a classic
board game like chess. Even modern strategy games played on the computer often
implement tiles, although they do a good job of hiding them behind a detailed
visual layer. Tactical maneuvering appears in many board games such as chess and
Go but also in computer strategy games such as StarCraft or Command & Conquer:
Red Alert.
n Social interaction. Until recently, most video games did not govern social interaction among the players, apart from prohibiting collusion or requiring that players
keep certain knowledge secret. Now, however, many online games include mechanics that reward giving gifts, inviting new friends to join, and participating in other
social interactions. In addition, role-playing games might have rules that govern
the play-acting of a character, and a strategy game might include rules that govern
the forming and breaking of alliances between players. Board games and folk games
played by children have a longer history of game mechanisms that guide the interactions among players.
Mechanics and Game Genres
The game industry categorizes games into genres based on the type of gameplay the
game offers. Some games derive their gameplay mostly from their economy, others
from physics, level progression, tactical maneuvering, or social dynamics. Because
the gameplay is generated by the mechanics, it follows that the genre of a game
has a significant effect on the kinds of rules it implements. Table 1.1 shows a typical game classification scheme and how these genres and their associated gameplay
relate to different types of mechanics. The game genres in the table are taken from
Fundamentals of Game Design, Second Edition and correlate to the five different types
of game rules or structures. The thickness of the outlines indicates relative importance of those types of rules for most games in that genre.

-- 22 of 443 --

8 Game mechanics: advanced Game desiGn
TAble 1.1
Game mechanics and
Game Genres

-- 23 of 443 --

desiGninG Game mechanics 9

---

## Sección 31: ChAptEr 1

Discrete Mechanics vs. Continuous Mechanics
We’ve listed five types of mechanics, but there’s another important distinction to
be made: Mechanics can be discrete or continuous. Modern games tend to simulate
physics (including timing and rhythm) with precise mechanics that create a smooth,
continuous flow of play. A game object might be positioned half a pixel more to the
left or right, and this can have a huge effect on the result of a jump. For maximum
accuracy, physical behaviors need to be computed with high-precision fractional
values; this is what we mean by continuous mechanics. In contrast, the rules of an
internal economy tend to be discrete and represented with integer (whole-number)
values. In an internal economy, game elements and actions often belong to a finite
set that does not allow any gradual transitions: In a game you usually cannot pick up
half a power-up. These are discrete mechanics. This difference between game physics
and game economies affects a game’s level of dependence on its medium, the nature
of the player interaction, and even the designer’s opportunities for innovation.
Understanding the Mechanics of Physics
Accurate physics computations, especially in real time, require a lot of high-speed
mathematical operations. This tends to mean that physics-based games must be
implemented on a computer. Creating a board game for Super Mario Bros., in which
the gameplay requires moving and jumping from platform to platform, would be
difficult. In platform games, physical dexterity matters, just as it does in playing
real-life football; those skills would be lost in a board game. Super Mario Bros. is probably better mediated as a physical course testing players’ real running and jumping
abilities. The point is, a rule that states that you can jump twice as high after picking up a certain item can be easily translated between different media, but actually
implementing that jump cannot. The continuous, physical mechanics of a game
need computing power more than the discrete rules that govern a game’s economy.
Interestingly, when you look back at the early history of platform games and other
early arcade games, the physics calculations were more discrete than they are today.
The moves in Donkey Kong were much less continuous than they were in Super Mario
Bros. In Boulder Dash, gravity is simulated by moving boulders down at a constant
speed of one tile every frame. It might play slowly, but it is possible to create a board
game for Boulder Dash. In those days, the rules that created the game’s physical
mechanics were not that different from other types of game rules. The early game
computers did not have any floating-point arithmetic instructions, so the game
physics had to be simple. But times have changed. Today the physics in a platform
game have grown so accurate and detailed that they have become impossible, or at
least inconvenient, to represent with a board game.

-- 24 of 443 --

10 Game mechanics: advanced Game desiGn
Mixing Physical Mechanics with Strategic Gameplay
With discrete rules, it is possible to look ahead, to plan moves, and to create and
execute complex strategies. Although this isn’t always easy, it is possible, and many
players enjoy doing it. Players interact with discrete mechanics on a mental, strategic level. Once players grasp the physics of a game, they can intuitively predict
movements and results, but with less certainty. Skill and dexterity become a more
important aspect of the interaction. This difference is crucial for gameplay and can
be seen in a comparison between Angry Birds and World of Goo, two games that mix
physical mechanics with strategic gameplay.
In Angry Birds, players shoot birds from a catapult at defensive structures protecting
pigs (Figure 1.2). The catapult is operated with a touch device, and because the
physical simulation is so precise, a small difference in launch speed or angle can have
a completely different effect on the structural damage the player causes. Catapulting
the birds is mostly a matter of physical skill. The strategy in Angry Birds involves
those aspects of the game that are governed by discrete rules. Players have to plan
to attack the pigs’ defenses most effectively using the number and types of birds
available in the level. This requires identifying weak spots and formulating a plan
of attack, but the execution itself is based on hand-eye coordination, and the effects
can never be foreseen in great detail.
FIGURe 1.2
Angry Birds

-- 25 of 443 --

desiGninG Game mechanics 11

---

## Sección 32: ChAptEr 1

Compare the mix of strategy and skill in Angry Birds with a similar mix in World of
Goo (Figure 1.3). In World of Goo, players build constructions from a limited supply
of goo balls. The game includes a detailed physical simulation that controls the
player-built constructions. Physical phenomena such as gravity, momentum, and
center of mass play an important role in the mechanics of the game. Indeed, players
can form an intuitive understanding of these notions from playing World of Goo. But
more importantly, players learn how to manage their most important (and discrete)
resource, goo balls, and use them to build successful constructions. The difference
between Angry Birds and World of Goo becomes very clear when you consider the
respective effects of both games’ continuous, pixel-precise physics. In Angry Birds,
the difference of a single pixel can translate into a critical hit or complete miss.
World of Goo is more forgiving. In that game, releasing a goo ball a little more to the
left or right usually does not matter, because the resulting construction is the same,
and spring forces push the ball into the same place. The game even shows what
connections will be made before the player releases a ball (as shown in Figure 1.3).
You can see that the gameplay is more strategic in World of Goo than it is in Angry
Birds. World of Goo depends more on its discrete mechanics than on its continuous
mechanics to create the player’s experience.
FIGURe 1.3
World of Goo

-- 26 of 443 --

12 Game mechanics: advanced Game desiGn
Innovating with Discrete Mechanics
Discrete mechanics offer more opportunities for innovation than many of the current
forms of continuous mechanics do. As games and genres change, designers’ definitions
of physical mechanics are all evolving into a handful of directions that correspond
closely with game genres. Most of the time there is little point in completely changing the physics of a first-person shooter. In fact, as games increasingly use physics
engine middleware to handle these mechanics, there is less room to innovate in
that area. On the other hand, all designers want to offer unique content, and many
first-person shooters do include a unique system of power-ups, or an economy of
items to collect and consume, to make their gameplay different from their competitor’s. There is more room for creativity and innovation in the mechanics that
govern these economies than in the physics of the game. This book concentrates on
discrete mechanics.
Looking back at four decades of computer game history, it’s clear that game physics
have evolved much faster than any other type of mechanics in games. Physics are
comparatively easy to design because of the clarity of Newton’s laws and the increasing computing power to simulate them. The laws of economics are far more complex
and difficult to work with. In this book, we hope to give you a solid theoretical
framework for nonphysical, discrete mechanics to make it easier.
Mechanics and the Game Design Process
There are almost as many different ways to design a game as there are game companies. In Fundamentals of Game Design, Ernest Adams advocates an approach
called player-centric game design, which concentrates on the players’ roles and the
gameplay that they will experience. Adams defines gameplay as consisting of the
challenges the game imposes on the player and the actions the game permits the
player to perform. The mechanics create the gameplay. When Mario jumps across
a canyon, the level design may define the shape of the canyon, but it is the game’s
laws of physics—its physical mechanics—that determine how far he jumps, how
gravity behaves, and whether he succeeds or fails.
Because the mechanics generate the gameplay, we encourage you to start designing
the mechanics as soon as you know what gameplay you want to offer. The development process outlined in this section is player-centric game design with an extra
emphasis on creating complex, but balanced, game mechanics.
Outlining the Game Design Process
Roughly speaking, the process of designing a game goes through three stages: the
concept stage, the elaboration stage, and the tuning stage. These stages are discussed
next, but you can find more details about these stages in Fundamentals of Game Design.
NOT E The mechanistic perspective on
gameplay used in
this book is a narrow
one and focuses on
mechanics over many
other aspects of games.
it is what you might
call a mechanistic perspective on games and
gameplay. however, we
do not want to argue
that this is the only
perspective on games
or that it is the best
one. in many games,
art, story, sound, and
music, among other
features, contribute just
as much to the player’s
experience as gameplay
does. sometimes they
contribute even more.
But we wrote this book
to explore the relationship between game
mechanics and gameplay, and that is what
we concentrate on.

-- 27 of 443 --

desiGninG Game mechanics 13

---

## Sección 33: ChAptEr 1

cOncePT sTaGe
During the concept stage, the design team will decide on the game’s general idea, the
target audience, and the player’s role. The results of this phase will be documented
in a vision document or a game treatment. Once you have made these key decisions,
you should not change them throughout the remainder of the design process.
In the concept stage, you might create a very quick, experimental version of the game’s
basic mechanics just to see if it produces fun gameplay, if you are not certain what
kind of game you want to make. These proof-of-concept prototypes can also help you
pitch your design vision to the rest of the team or to a funding agency, or playtest
key assumptions. However, you should assume that you will throw this work away
and do it again from scratch in the elaboration stage. This will enable you to work
faster in the concept stage, without worrying if you create something buggy. You
should not start to design the real, final mechanics until this stage is over, because
your plans may change and it would be wasted effort.
eLaBOraTiOn sTaGe
During the elaboration stage—which usually begins once the project has been
funded—the development of the game goes into full swing. During this phase, you
will create game mechanics and levels, draft the story, create art assets, and so on.
It is vital that during this phase the development team works in short, iterative
cycles. Each cycle will produce some playable product or prototype that must be
tested and evaluated before the design can move on. Do not expect to get everything
right the first time. You will have to redesign many features during this stage. It’s a
good idea to get players representative of the audience from outside your team to
playtest parts of your game during this stage, too. When a prototype is playtested
only by members of the development team, you will not get a good idea of how real
players will eventually play and approach the game. Your development team may
fall outside the game’s target audience, and they generally know the game too well
to be good test subjects.
TUninG sTaGe
The tuning stage starts with a feature freeze. At this point, you will decide as a team
that you are happy with the game’s feature set and you are not going to add any
more features. Instead, you focus on polishing what you have. Enforcing a feature
freeze can be difficult: You are still working on the game, and you will invariably
come up with some new clever ideas you did not think of during earlier stages.
However, at this late stage of development, even small changes can have devastating unseen effects on the game and add significantly to the debugging and tuning
process—so don’t do it! If anything, the tuning stage is a subtractive process: You
should take out anything that does not work, or has little value for the game, and
focus the design on the things that do work to make it really shine. In addition,

-- 28 of 443 --

14 Game mechanics: advanced Game desiGn
when planning a game project, it is easy to underestimate how much work tuning
actually is. In our experience, polishing and tuning can take anywhere between onethird and half of the entire development time.
documentinG desiGns
Game design documents are used to record designs as games are being built. every
game company has its own standard for these documents, and every game company uses
them in a different way. Typically, a game design document starts with a brief description of the game’s concept, target audience, core mechanics, and intended art style.
many companies keep the design document up-to-date. every mechanism that is added
and level that gets designed will be added to the document. For this reason, design
documents are often called living documents: They grow as the game grows.
documenting the design process is important for many reasons: Writing down goals
and vision will help you keep on track during later stages of development. Writing down
your design decisions during development will prevent you from having to reconsider
past decisions over and over again. Finally, when working in a team, it is very useful to
have one document that specifies the collective goal. This reduces the chances that the
team effort diverges and that you waste too much energy on features that end up being
incompatible.
For now, we suggest that you do get into the habit of documenting your design by
whatever method works best for you. You’ll find a longer discussion and some useful
templates for design documents in Fundamentals of Game Design.
Designing Mechanics early On
Game mechanics are not easy to create. We advise that you start working on your
game’s mechanics early in the elaboration phase. There are two reasons for this:
n Gameplay emerges from game mechanics. It is difficult, if not impossible, to tell
whether your gameplay will be fun simply by looking at the rules. The only way to
find out whether your mechanics work is by playing them or, even better, by having
somebody else play them for you. To make this possible, you may need to create a
number of prototypes. We will go into this in more detail in later chapters.
n The game mechanics that we focus on in this book are complex systems; gameplay relies on a delicate balance within this system. Once you have mechanics that
work, it is easy to destroy that balance by adding new features late in the development process or by making changes to existing mechanisms.
Once you have the core mechanics working and you are sure they are balanced and
fun, you can start working on levels and art assets to go with them.

-- 29 of 443 --

desiGninG Game mechanics 15

---

## Sección 34: ChAptEr 1

make the toy First
Game designer Kyle Gabler gave a video keynote for the first Global Game Jam in 2009.
in his talk, he gave seven useful tips to help develop a game in a short time span. These
tips are so useful that we suggest they apply to most game development projects, no
matter how much time there is.
One tip, which is very relevant for our discussion here, is make the toy first. Gabler suggests that before you spend any time on creating assets and content, you have to make
sure that your mechanics work. This means you should start by building a prototype or
proof of concept for those mechanics. The mechanics should be fun to play around with,
even without nice art, clear goals, or clever level design. in other words, you need to
design a toy that is fun to interact with in its own right and build the game from there.
Obviously, we agree, and we suggest that you follow Gabler’s advice.
You can find Gabler’s full (and witty) keynote online: www.youtube.com/
watch?v=aW6vgW8wc6c.
Getting It Right
As mentioned, to get game mechanics right, you must build them. The methods
and theory described in this book will help you understand how mechanics work,
and they will include new, efficient tools to create early prototypes, but they can
never be a substitute for the real thing. You must build prototypes and iterate as
much as you can to create games with balanced, novel mechanics.
Prototyping Techniques
A prototype is a preliminary, usually incomplete, model of a product or process
created to test its usability before building the real thing. Because prototypes don’t
have to be as polished as the final product, they are (usually) quicker and cheaper
to construct and modify. Game designers create prototypes of games to test their
mechanics and gameplay. Some of the more common prototyping techniques that
game designers use are software prototypes, paper prototypes, and physical prototypes.
A Few Terms
Over the years, software developers have devised a number of terms to describe different types of prototypes. A high-fidelity prototype resembles the intended product
closely in many ways. In some cases, a high-fidelity prototype ends up being refined
into the final product. A high-fidelity prototype is relatively time-consuming to build.

-- 30 of 443 --

16 Game mechanics: advanced Game desiGn
In contrast, a low-fidelity prototype is quicker to build and does not need to resemble
the end product as closely. A low-fidelity prototype typically uses a different technology from that used in the end product. You might use a 2D Flash game to
prototype a 3D console game, or you could even use PowerPoint to create an interactive storyboard for a game. Developers build low-fidelity prototypes to test ideas
quickly, and these prototypes tend to be focused on one particular aspect of the game.
Developers also create a vertical slice of the intended product with their prototype.
The term comes from a visual representation of a software project, as shown in
Figure 1.4. A vertical slice is a prototype that includes all the elements (code, art,
audio, and anything else) required to implement one or a small number of features
of a game. Vertical slices are useful for testing the moment-by-moment gameplay
of a game and to give people an impression of your game while not showing the
complete product. A horizontal slice is a prototype that includes all the parts of some
aspect of the game but none of the others. For example, a horizontal slice might
include a complete user interface but no functioning mechanics.
Software Prototyping
If you want to get a sense of how your video game will feel to your players, the best
way is to create a software prototype that approximates your designs, as quickly
as possible. To speed the prototyping process, it sometimes is a good idea to use
FIGURe 1.4
vertical and horizontal slices
of a game project

-- 31 of 443 --

desiGninG Game mechanics 17

---

## Sección 35: ChAptEr 1

open-source game engines or game development environments such as GameMaker
or Unity, even if your target platform will be something completely different.
The advantage of using software prototypes is that you can get a good indication
of the gameplay of your game, even if the art is only temporary and the features
might be buggy or incomplete. However, the disadvantage is that creating software
prototypes takes longer than creating the other kinds. Depending on the available
options and the skills of your development team, it might take almost as long as
making the real game. Still, it is a good idea to build software prototypes, even if
you end up throwing away all the art and code that was produced for them. Having
an early software prototype will help keep the project on course. Programmers will
know what type of game elements are needed, level designers will have an idea of
the direction the design takes, and game designers will have an environment to play
around in and test ideas. Software prototypes function almost as design documents:
The development team can refer to the prototype when building the real thing. The
prototype can illustrate some aspects of a game, such as interactive features, better
than a description in words can.
One critical factor of a successful software prototype is easy customization of the
game within the prototype. When a game’s gravity is vital for the gameplay of your
3D platformer, make sure designers can change the setting easily during play in
order to get a feel for what works best. If you have a factory producing resources for
a real-time strategy game, make sure you can change the production rate easily in
order to find the right balance quickly. Don’t waste time creating a fancy user interface for this; store key initial values in a text file that the program reads when it
starts up. This way, the designers can play with the values simply by editing the file
and rerunning the program. Or even better, include a simple, off-the-shelf console
in your game that allows you to make changes while playing the game. This will
speed up your development-test cycle even more.
Paper Prototyping
Because software prototypes are relatively slow and expensive to create, more and
more game studios are using paper prototyping techniques. A paper prototype is a
noncomputerized, tabletop game that resembles your game. Some game mechanics
are media-independent. If your game does not rely too heavily on precise timing,
physics, or other computation-intensive mechanics, you should be able to create a
board game from your video game concept. If your game does rely heavily on computation-intensive mechanics, it can still be worth your time and effort to create a
paper prototype for those aspects of the game that don’t. Remember, a prototype
typically zooms in on a particular aspect of the game, and you just might want to
zoom in on the internal economy of a game that otherwise derives most of its gameplay from its extended physics simulation. It’s important to know what aspect you
want to explore before you start designing a paper prototype.
T IP many of the
prototypes for Spore
are published online:
www.spore.com/comm/
prototypes. We suggest
you download a few
and play them for yourself. These prototypes
will give you an unique
insight in the development process for a
triple-a title by a professional game studio.

-- 32 of 443 --

18 Game mechanics: advanced Game desiGn
Paper prototyping is not trivial. Designing good board games is an art in itself, at
least as difficult as designing a good video game. It helps if you are familiar with a
wide variety of board games yourself. There are many more board game mechanics
than “role a die and move that many spaces.”
a Good paper prototypinG kit
corvus elrod, a professional game designer, recommends keeping the following items
together to use as a prototyping kit:
• Two near-identical decks of cards with different colored backs.
• A small notebook (not too big or it becomes distracting). Good pencils or pens, obviously.
• Tokens of some sort—poker chips, Go stones, or similar.
• Several dice; it doesn’t really matter how many sides they have, and you don’t need
a large number. if you design your mechanics using percentages, then two ten-sided
dice are useful for generating random numbers from 1 to 100 (elrod 2011).
To this we might also add the following:
• A pad of sticky notes
• A batch of blank cards, 3x5 or similar
We also recommend you add some card sleeves to your paper prototyping kit. card
sleeves are plastic sleeves that players sometimes use to protect cards for trading card
games such as Magic: The Gathering. They can be purchased from any specialist game
store. You can simply slide a marked piece of paper into the sleeve to create a playing
card that is easy to shuffle and handle. an additional benefit is that you can easily slide
in revisions on top of old cards. That way, the design history of your cards is preserved.
With these items, you have a way of generating random numbers, some tokens you can
use to represent the numbers (in a poker game, poker chips stand for money), some
blank materials for designating all sorts of things, possibly including a game board, and
a notebook to write down your ideas in. That’s really all you need to get started.
Paper prototyping has two important advantages: It is fast, and a paper prototype
is inherently customizable. Paper prototypes are quick to make because they do
not need to be programmed. When creating a paper prototype, you should not
waste time on creating nice art for cards or boards; instead, you should spend your
time drafting rules and testing them. With some skill and experience, you can put
together a decent paper prototype for any game in a matter of hours. That leaves
you a lot of time to start playtesting and balancing the mechanics.
With a paper prototype, it is easy to change the rules. You can even do this on
the fly. If during play you notice something does not work as intended, change it

---

## Sección 36: ChAptEr 1

-- 33 of 443 --

desiGninG Game mechanics 19
immediately. This way, you can almost create the game as you play. Iteration cycles
do not get shorter than this.
Paper prototyping has two disadvantages: It is more difficult to involve test players, and not all mechanics translate to board games easily. If you are going to test a
paper prototype with new players, you will need to explain the rules to them yourself—it’s not worth the time to write them down, because you’ll be changing them
all the time. In addition, test players, especially if they have little testing or board
game experience, might find it difficult to see how your paper prototype is related to
a video game.
More problematic is that not all mechanics translate to paper prototypes easily. As
we mentioned, mechanics that deal with a game’s physics are difficult to translate.
Continuous mechanics, which are computationally intensive, really need to be
implemented on a computer. This is something to take into account when creating
a paper prototype: It is best used to test discrete mechanics. Paper prototyping is
more suited to designing mechanics that govern a game’s economy or progression.
Physical Prototyping
Prototyping is not restricted to creating software or paper games; simply drafting
rules and playing the game out in real life can be just as effective. This is especially
true when a game has many continuous, physical mechanics. Running around an
office building armed with laser-tag guns can give you a fairly good idea of what a
first-person shooter game might feel like. Most of the time, this requires even less
preparation than paper prototyping. As with paper prototyping, physical prototyping is fast and adaptable. Some game designers mix physical and paper prototyping
techniques to great effect. However, again as with paper prototyping, physical prototyping is not easy: Getting it right requires some skill and expertise from both
designers and players.
Prototype Focus
Apart from choosing the appropriate medium for your prototype, another critical
aspect of effective prototyping is finding the right focus. Before you start building
a prototype, you must ask yourself what you intend to learn from the exercise. If
you are trying to find out something about the balance of the economy, you will
need a different prototype from one intended to test a new user interface. Look
at the prototypes of Spore (www.spore.com/comm/prototypes). Each was created for a
specific reason.
Choosing a single focus should help you create prototypes faster. If you are focusing
on one aspect, you do not have to prototype the entire game. A tight focus should
also help you get the right feedback from test players: They will be less distracted by
features (or bugs) that are unrelated to the issue you are studying.
T IP To appreciate the
opportunities offered
by physical prototyping,
it can be a good idea
to join (or observe) a
live-action role-play
(LarP) session. LarPers
employ a wide variety
of techniques to deal
with physical combat
safely and have come
up with ways to include
things that are not part
of our physical reality,
such as magic spells.
Because LarP takes
place in a specific location, you will have to
find a LarP community
near you. The website
http://larp.meetup.com
lists a few.

-- 34 of 443 --

20 Game mechanics: advanced Game desiGn
A prototype’s focus affects the choice of prototype technique. If you are trying to
design a balanced economy of power-ups in a physical platform game, a paper
prototype can work even though physics are hard to reproduce as a board game.
However, if you are trying control schemes with a new input device, you will need a
high-fidelity, software prototype that is close to the real game.
The following aspects of game design are typical focuses for prototyping, loosely
ordered from early to later prototypes:
n Tech demos. It is always a good idea to make sure you or the team of programmers can actually deal with the technology involved. For a tech demo, you should
try to tackle the most difficult and most novel aspect of the game technology and
prove to yourself, and ideally a publisher too, that you can build the game. Tech
demos should be built early to prevent surprises during later stages of development.
While building a tech demo, keep an eye out for interesting gameplay opportunities. Especially when you are working with novel technology, quickly building
something simple can lead to deeper insights later.
n Game economy. A game’s economy revolves around a number of vital resources.
You can prototype a game economy with low-fidelity, paper prototyping techniques;
this is best done early during the design process. The following are typical playtest
questions: Is the game balanced? Is there a dominant strategy that wins all the time?
Do the players have interesting choices? Can they sufficiently forsee the consequences
of their choices? Getting the right players for a game economy playtest is important. You and your team are good test subjects, although you will be handicapped
because you have an idea of how the game is intended to be played. In general, the
ideal test player for this type of prototype is an experienced power gamer who can
quickly grasp the mechanics and has experience in finding and using exploits. Make
sure you ask them to try to break the game. If it can be broken, you should know.
n Interface and control scheme. To find out whether players can control your
game, you must have a software prototype of your game. The prototype does not
need to have much content or complete levels; rather, it is a playground where players can try most of the game’s elements and interactions. These are typical playtest
questions: Can players perform the actions you offer them correctly? Are there other
actions they want or need? Are you giving them the information they need to make
correct decisions? Is the control scheme intuitive? Do the players have the information they need to play? Do they notice they are taking damage or that a vital game
state has changed?

---

## Sección 37: ChAptEr 1

-- 35 of 443 --

desiGninG Game mechanics 21
n Tutorials. To build a good tutorial, the game must be in its later stage of development. After all, nobody wants to waste time and resources to build a tutorial for
game mechanics that still might change. When testing a tutorial, it is important
your test players have not seen your game before. In many ways, developing a game
is like a long and detailed tutorial: Developers spend many hours tweaking mechanics, and during this time, they play a lot. It is easy to forget how skilled you have
become at your own game. Therefore, you cannot trust your own judgment of the
game’s initial difficulty and learning curve. You really need new players for that, and
while they play, do not interfere with their learning process. The most important
question for a tutorial prototype is this: Do my players understand the game and
how it should be played?
reFerence Games: Free prototypes
sometimes the most efficient way to prototype your game is to look at existing games
and use them as a model for your project. This way, you can take advantage of a lot of
work done by others. This is especially true of user interface design, controls, and basic
physics, in which players want consistency from game to game. There’s no point in
changing the traditional Wasd control scheme for first-person Pc games to esdF instead,
just for the sake of innovation.
Obviously, you should not steal designs, but there is no harm in learning from others or
avoiding mistakes they made. When picking reference games for your project, pay attention to the project scope. if you have only a couple of months to develop your game, don’t
pick a reference game that was created by a large professional team over a period of
years. Try to choose reference games that are similar in size and quality to the game you
plan to make, unless you are using the reference only to study a particular detail in the
game interface or mechanics.
Summary
Game mechanics are the precisely specified rules of a game, including not only
the entities and processes at the heart of the game but also the data necessary to
execute those processes. Mechanics may be categorized as continuous or discrete.
Continuous mechanics are usually implemented in real time, with many floatingpoint calculations every second, and are most often used to implement physics in a
game. Discrete mechanics may or may not operate in real time, and they use integer
values to implement a game’s internal economy. It is imperative to begin designing
game mechanics early, so you can create prototypes to playtest.

-- 36 of 443 --

22 Game mechanics: advanced Game desiGn
Particular structures exist in game mechanics that contribute strongly to emergent
gameplay. In the following two chapters, we will explore this structural perspective
on game mechanics in more detail, and we will use that perspective to create a practical method and design tool to help design game mechanics.
Exercises
1. Practice your prototype skills. Translate an existing video game to a paper
prototype.
2. Find a relevant reference game for a game that you want to build. Explain what
aspect of the reference game is useful in illustrating the kind of game you have
in mind.
3. Find examples of discrete mechanisms and continuous mechanisms in a published game for each of the five types of game mechanism described in this chapter
(physics, internal economy, progression, tactical maneuvering, and social interaction). Don’t use any of the examples given in this chapter.

-- 37 of 443 --

---

## Sección 38: ChAptEr 2

Emergence and
progression
In the previous chapter, we introduced five types of game mechanics: physics, internal economy, progression, tactical maneuvering, and social interaction. Of these
categories, the mechanics of progression create what in game studies are called
games of progression. The other four types of mechanics correspond fairly well to
another category, games of emergence. For ease of reference, we will call the other
four types of mechanics mechanics of emergence in this chapter.
The two categories of games of emergence and games of progression are considered
important, alternative ways of creating gameplay. In this chapter, we explore this
important distinction in more detail and provide examples of each category. We also
explore the structural differences in the mechanics that generate emergence and
progression and the problems and opportunities they create when a designer tries
to integrate emergence and progression in a single game.
The History of Emergence and Progression
The categories of emergence and progression were originally introduced by game
scholar Jesper Juul in his paper “The Open and the Closed: Games of Emergence and
Games of Progression” (2002). Put simply, games of emergence are those games that
have relatively simple rules but much variation. We use the term emergence because
the game’s challenges and its flow of events are not planned in advance but emerge
during play. Emergence is produced by the many possible combinations of rules
in board games, card games, strategy games, and some action games. According
to Juul, “Emergence is the primordial game structure” (p. 324); that is, the earliest
games were games of emergence, and in creating a new game, many people begin
with emergent designs.
Games of this type can be in many different configurations, or states, during play.
All possible arrangements of the playing pieces in chess constitute different game
states, because the displacement of a single pawn by even one square can make a
critical difference. The number of possible combinations of pieces on a chess board
is huge, yet the rules easily fit on a single page. Something similar can be said of the
placements of residential zones in the simulation game SimCity or the placement of
units in the strategy game StarCraft.

---

## Sección 39: ChAptEr 2

-- 38 of 443 --

24 Game mechanics: advanced Game desiGn
emerGence and proGression outside Video Games
in Juul’s categorization, all board games are games of emergence. Games that start with
randomized elements, such as cards or dominoes, also qualify. such games typically
have a small number of pieces and little or no predesigned data. The text on Monopoly’s
chance and community chest cards are examples of predesigned data, but they require
less than 1KB to store.
a game of progression requires a large amount of data, prepared in advance by the
designer, that the player can access at arbitrary points (called random access). This is
inconvenient for board games but easy for video games now that they can store many
gigabytes of data. Progression is the newer structure, starting with the text-adventure
games from the 1970s. however, progression is not limited to games running on computers.
Pen-and-paper role-playing games like Dungeons & Dragons offer published scenarios,
and these scenarios also constitute games of progression, as do the books in the choose
Your Own adventure book series. Books are another medium that can handle a large
amount of data and offer easy random access.
In contrast, games of progression offer many predesigned challenges that the
designer has ordered sequentially, usually through sophisticated level design.
Progression relies on a tightly controlled sequence of events. A game designer dictates the challenges that a player encounters by designing levels in such a way that
the player must encounter these events in a particular sequence. According to Juul,
any game that has a walkthrough is a game of progression. In its most extreme
form, the player is “railroaded” through a game, going from one challenge to the
next or failing in the attempt. In a game of progression, the number of game states
is relatively small, and the designer has total control over what is put in the game.
This makes games of progression well suited to games that tell stories.
Comparing Emergence and Progression
In his original article, Juul expresses a preference for games that include emergence:
“On a theoretical level, emergence is the more interesting structure” (2002, p. 328).
He regards emergence as an approach that allows designers to create games in which
the freedom of the player is balanced with the control of the designer. In a game of
emergence, designers do not specify every event in detail before the game is published, though the rules may make certain events very likely. In practice, however,
a game with an emergent structure often still follows fairly regular patterns. Juul
discusses the gun fights that almost always erupt in a game of Counter-Strike (p. 327).
Another example can be found in Risk, in which the players’ territories are initially
scattered all over the map, but over the course of play their ownership changes, and
the players generally end up controlling one or a few areas of neighboring territories.
T IP don’t confuse
the term games of
progression with other
ideas about progression in games, such as
leveling up, difficulty
curves, skill trees, and
so on. We use Juul’s
definition of the term:
a game of progression
is one that offers predesigned challenges,
each of which often has
exactly one solution, in
a fixed (or only slightly
variable) sequence.

-- 39 of 443 --

emerGence and PrOGressiOn 25

---

## Sección 40: ChAptEr 2

data and process intensity
The game designer chris crawford’s notions of process intensity and data intensity apply
to progression and emergence in games. computers differ from most other gaming media
because computers are good at processing numbers. computers also allow fast access
to random locations within a large database, an ability put to good use within games
of progression. But it is the ability to create new content on the fly and handle complex
simulations where computers really shine. Like no other medium before, computers have
the capacity to surprise players and designers with clever simulations and emergent
gameplay. crawford believes games should capitalize on this ability of the computer:
Games should be process-intensive, rather than data-intensive. he says that video games
should be games of emergence rather than games of progression.
In his later book Half-Real, Juul is more nuanced in his discussion of emergence and
progression (2005). Most modern video games are hybrids; they include some features of both. Grand Theft Auto: San Andreas provides a vast open world but also has
a mission structure that introduces new elements and unlocks this world piece by
piece. In the story-driven first-person shooter game Deus Ex, the storyline dictates
where the player needs to go next, but players have many different strategies and
tactics available to deal with the problems they encounter on the way. It is possible to write a walkthrough for Deus Ex, which would make it a game of progression
according to Juul’s classification, but there are many possible walkthroughs for Deus
Ex—just as, at least in theory, it is possible to create a walkthrough for a particular
map in SimCity, instructing the player to build certain zones or infrastructure at a
particular time in order to build an effective city. It would be hard to follow such a
walkthrough, but creating one is possible.
Emergence is not better than progression. They are simply different. Pure games of
emergence and pure games of progression represent two extremes on a bipolar scale.
Many casual games, such as Bejeweled, are pure games of emergence. Pure games
of progression are fairly rare. The most typical examples are adventure games such
as The Longest Journey, but they are no longer the dominant genre they once were.
Other games include elements of both, often by exhibiting emergent behavior
within a given level but offering their levels in a strict sequence from which the
player cannot depart (progressive behavior). Today, action-adventure games such
as Half-Life and the Legend of Zelda series are much more common than traditional
adventure games: Action-adventures include some form of emergent action as part
of the gameplay. Among large games, hybrid forms are the most popular.

-- 40 of 443 --

26 Game mechanics: advanced Game desiGn
Games of Emergence
The use of the term emergence in games, which predates Juul’s categories, originates
from the use of the term in complexity theory. There it refers to behavior of a system
that cannot be derived (directly) from its constituent parts. At the same time, Juul
cautions us not to confuse emergent behavior with games that display behavior the
designer simply did not foresee (2002). In games, as in any complex system, the
whole is more than the sum of its parts. Go and chess are famous for generating
enormous depth of play with relatively simple elements and rules. Something similar
can be said of relatively simple computer games such as Tetris, Boulder Dash, or World
of Goo. These games consist of relatively simple parts, yet the number of strategies
and approaches that they allow is enormous. No two play-throughs will feel the
same. The emergent quality of the gameplay comes not from the complexity of
individual parts but from the complexity that is the result of the many interactions
among the parts.
Simple Parts in Complex Systems
The science of complexity studies all manner of complex systems in real life. While
the active agents or active elements in these complex systems can be quite sophisticated in themselves, they are typically simulated with simple models. For example,
to study the flow of pedestrians in different environments, great results have been
achieved by simulating pedestrians with only a few behavioral rules and goals (Ball,
2004, pp. 131–147). In this book, we take a similar approach to games. Although
it is possible to create emergent games with a few complex elements, we are more
interested in the mechanics of game systems that work with simple parts but still
create emergent gameplay. The advantage of our approach is that, in the end, these
games are efficient to build, even if they are initially more difficult to understand.
probability space
in the previous chapter, we mentioned that games are often regarded as state machines:
hypothetical machines that progress from one state to another based on their current
state and the input provided by players. in games, the number of states can grow very
fast, and yet not every state is possible. not every random placement of pieces on a chess
board represents a game state that can be reached through actual play. For example, it
is not possible to have pawns in your color on the row closest to you in a real game or
to have both your bishops on a square of the same color. When the number of possible
states is very large, game scholars refer to them collectively as a probability space. The
probability space represents all the possible states that can be reached from the current
state. The probability space can be described as having a wide or a deep shape. When
the shape of the space is wide, there are many different states that can be reached from
the current state: Usually this means that players have many options. if the shape is
deep, there are many different states that can be reached after many subsequent choices.

-- 41 of 443 --

emerGence and PrOGressiOn 27

---

## Sección 41: ChAptEr 2

C. E. Shannon, in his early paper “Programming a Computer for Playing Chess,”
estimated that there are more possible game states in games like chess and Go than
there are atoms on earth (1950). The rules of the game determine the number of
possible states, but it is not necessarily true that more rules will lead to more possible states. In addition, when a game can create a large number of possible states
without using many rules, the game will be more accessible to players.
Gameplay and Game States
When we speak of the path players take through the possible states of a game—its
probability space—we sometimes describe this path as a trajectory. The possible game
states and play trajectories through a game are emergent properties of the game
rule system. Games that allow many different, interesting trajectories arguably have
more gameplay than games that generate fewer trajectories or less interesting ones.
However, determining the type and quality of the gameplay is hard, if not impossible, by simply looking at the rules. Comparing the rules of tic-tac-toe and Connect
Four serves as a good illustration of these difficulties. The rules for tic-tac-toe are
as follows:
1. The game is played on a three-by-three grid.
2. The players take turns to occupy a square.
3. A square can be occupied only once.
4. The first player to occupy three squares in a row (orthogonally or diagonally) wins.
The rules for Connect Four are as follows (with the differences emphasized):
1. The game is played on a seven-by-six grid.
2. The players take turns to occupy a square.
3. A square can be occupied only once.
4. Only the bottom most unoccupied square in a given column can be occupied.
5. The first player to occupy four squares in a row (orthogonally or diagonally) wins.
While there are only a few differences in the rules for these two games, the differences in gameplay are immense, much greater than the amount of mental effort
needed to understand the rules. In the commercially available version of Connect
Four, the most complicated rule (number 4) is enforced by gravity: A player’s token
will automatically fall to the lowest available space in the upright playing area (see
Figure 2.1). This relieves players from manually enforcing this rule and allows them
to focus on the rule’s effects instead. Despite the small difference in the complexity
of the rules, tic-tac-toe is suited only for small children, whereas Connect Four can
also be enjoyed by adults. The latter game allows many different strategies, and
it takes much longer to master the game. When two experienced players play the

-- 42 of 443 --

28 Game mechanics: advanced Game desiGn
game, it will be an exciting match, instead of a certain draw as is the case with
tic-tac-toe. It is hard to explain these differences just by looking at the differences
in the rules.
example: Civilization
Sid Meier’s Civilization is a good example of a game of emergence. In Civilization,
you lead a civilization as it evolves over roughly six millennia. During the game,
you build cities, roads, farmlands, mines, and military units. You need to upgrade
your cities by building temples, barracks, courthouses, stock markets, and so on.
Cities produce money that you use to research new technology, to convert into
luxuries to keep the population happy, or to speed up the production of units and
upgrades. Civilization is a turn-based game set on a tile-based map, with each turn
representing a number of years of your civilization’s history. The choices you make
determine how fast your civilization will grow, how sophisticated its technology is,
and how powerful its military. Several other computer-controlled civilizations compete with you for space and resources on a finite map.
Civilization is a large game with many different game elements. However, the individual elements are surprisingly simple. The mechanics for city upgrades can easily
be expressed with a few simple rules. For example, a temple costs one gold per turn
and will reduce the number of unhappy citizens in a city by two. Units have simple
FIGURe 2.1
in Connect Four,
gravity makes sure
players can occupy
only the bottom most
unoccupied square
in each column.
(image by permission
of Wikimedia
commons contributor
Popperipopp under
a creative commons
3.0 license.)

-- 43 of 443 --

emerGence and PrOGressiOn 29

---

## Sección 42: ChAptEr 2

integer values representing the number of tiles they can move and their respective
offensive and defensive strengths. Some units have special capabilities. For example,
settlers can be used to build new cities, and artillery can be used to bombard enemy
units from a distance. Terrain modifies the capabilities of units. Mountains cost
extra movement points to cross but also double a unit’s defensive strength. Players
can build roads to negate the extra movement costs imposed by mountains.
the mechanics oF Civilization are discrete
inspecting Civilization reveals that most of its mechanics are discrete: The game is turnbased, the positions of units and locations of cities are restricted to tiles, and offensive
and defensive strength is represented with whole numbers. Because the mechanics are
discrete, they are easy to understand individually. You can, in principle, do all of the calculations to work out their effects in your head. still, the probability space of Civilization
is huge. Civilization is an excellent example of creating enormous variety with relatively
simple discrete mechanics that invite players to interact with the game on a strategic level.
A complete description of all the mechanics of Civilization easily fills a book, especially if all the details of all unit types and city upgrades are listed. The game comes
with its own encyclopedia to provide access to all these details. However, all these
elements are easy to understand. And more importantly, there are many relations
between the elements: Units are produced in cities, consuming vital resources that
could have been used toward other ends. After a unit is produced, you will often
have to pay gold for its upkeep every turn. Building roads also requires an investment in time and resources, but it allows you to deploy your forces more efficiently,
which reduces the need to keep a large military. You can also invest in researching
new technology to make sure your units are stronger than those of your opponent.
In short, everything in Civilization is connected to almost everything else. This
means that the choices you make will have many effects, sometimes unforeseen
ones. Building a strong military early on allows you to capture a larger part of the map
but will take a toll on other developments, which might set you back in the long
term. To add to the complexity, the choices made by the civilizations surrounding
yours will influence the effectiveness of your strategies.
There are many different strategies to play Civilization, and players often have to
switch between strategies as the game progresses. Early on, it is important to capture
territory so that your civilization can expand quickly. It also helps to develop technologies quickly so that you can identify and capture vital resources during this stage.
Once you encounter other civilizations, you can attack them or befriend them. In
the early stages of the game, it is easier to conquer other civilizations completely.
Later in the game this will be much harder, and other strategies work better. When
your civilization is wealthy and your neighbor is not, you can start a cultural offensive to persuade neighboring cities to join your realm. The game often progresses
through a number of distinct phases: early expansion, investing in your economy,

-- 44 of 443 --

30 Game mechanics: advanced Game desiGn
violent conflict, and eventually a technology and production race to space. The
Civilization setup causes all these strategies and game phases to emerge quite naturally from its mechanics.
Civilization Gameplay phases Vs. historical periods
and Golden aGes
in Civilization, your civilization will evolve through a number of historical periods in
the game. it starts in a classical period and eventually will grow into a medieval period,
renaissance, and modern period. The game uses these periods to keep the graphics and
representation of your civilization in tune with your progress. The triggers that cause
you to move into a new period are rather arbitrary. They don’t emerge from the game
mechanics as the different strategic phases of exploration, development, and conflict
do. The historical periods are a fairly superficial addition that provides visual color; they
aren’t emergent game phases.
a golden age, a mechanism that can trigger a 20-turn span of increased production for
your civilization, falls somewhere in between a gameplay phase and a historical period.
The events that trigger a golden age are nearly as arbitrary as the triggers for the historical periods. however, the player does have more control over these events and can aim
to trigger a golden age on purpose. Golden ages do not emerge from the gameplay but
do affect the gameplay phase.
Imagine that you are asked to design the mechanics for a game like Civilization.
How would you approach that task? You will probably have to design and tune the
mechanics over many different iterations and prototypes. If you are clever, you keep
all the elements as simple as possible, but you create several relationships among
them. In that way, you can be sure that the game will be complex, but that is little
guarantee that interesting gameplay will emerge. To get it right, you will need to be
aware of the structure of these mechanics. Some structures will cause more emergent
behavior than others. Structures like feedback loops in the game mechanics are a
good way of creating emergent behaviors, especially if this feedback operates on different scales and at different speeds. Right now, this will probably sound somewhat
vague. In this and later chapters, we will explore these structures and feedback in
much more detail.
Games of Progression
Despite the importance of emergence in games, no professional game designer can
ignore the mechanics of progression. Many games contain a story to drive the gameplay, often told over the course of many levels. Individual levels typically have clearly
defined missions that set the player’s goals and structure the tasks they must complete to finish the level. The designer should plan the game and its levels in such
a way that the game creates a coherent experience for the player. Often this means
NOT E We use the
word structures to refer
to the various ways that
a game designer can
set up game mechanics
to influence or control
one another. a feedback loop is a structure,
for example, and so is
a trigger that sets off
an event when certain
conditions are met.

---

## Sección 43: ChAptEr 2

-- 45 of 443 --

emerGence and PrOGressiOn 31
that designers use various mechanics to control how players can move through a
game. In this book, we call such mechanics mechanics of progression. Understanding
the mechanics of progression is key to designing games with great levels and games
with interesting interactive stories.
an academic battle
The topic of stories and games has been the subject of fierce debates between two different camps within the field of game studies. One camp, the narratologists, put games
in the tradition of other storytelling media, and they focus on the storytelling aspects of
games. The other camp, the ludologists, argue that to understand games you should start
by looking at the game mechanics and the gameplay first and foremost. For the ludologists, game stories are not an integral part of games. Angry Birds is a good example.
The game has a story, but the story is told only between levels, and the events within a
level aren’t part of it. The story and the gameplay have no effect on one another. in the
case of Angry Birds, the ludologists are right, but there are also games that make an
effort to integrate their gameplay with their stories—role-playing and adventure games,
in particular. When we talk about storytelling in games, we mean integrated stories that
provide more than just a superficial context for the gameplay.
The mechanics of progression are an important aspect of designing game levels.
They are a key instrument for the designer to dictate what game elements players
will encounter first, what resources they will start with, and what tasks they must
perform to proceed. As a game designer, you decide what abilities the player has,
and use the layout of a level, including the clever placement of locks, keys, and vital
power-ups, to control the player’s progress through the game. This way, players are
eased into the game. As players explore the game’s space and gain abilities and skill,
they will eventually have a storylike experience that consists of the events that take
place in the level, clues discovered throughout the game, or cut-scenes that are triggered at certain locations.
Tutorials
Game designers apply the mechanics of progression to create tutorials and level
designs to train the player in the skills necessary to complete a game. These days,
the number of rules, interface elements, and gameplay options of a modern retail
video game is usually larger than most players can grasp at once. Even smaller games
found on the Internet frequently require the player to learn a multitude of rules, to
recognize many different objects, and to try different strategies. Exposing a player to
all these at the same time can result in an overwhelming experience, and players will
quickly leave the game in favor of others. The best way to deal with these problems
is to design the levels in a way that teaches the player the rules in easy-to-handle
chunks. In early tutorial levels, players are allowed to experiment with the gameplay
options in a safe and controlled environment, where errors have few consequences.

-- 46 of 443 --

32 Game mechanics: advanced Game desiGn
narratiVe architecture
Using tutorials and level design to train the player illustrates one of the strengths of video
games: They can use the game’s simulated physical space to structure player experience.
Unlike literature or cinema, which are well suited to depict events in time, games are
well suited to depict space. in his paper “Game design as narrative architecture” (2004),
henry Jenkins calls this type of spatial storytelling technique narrative architecture and
places games in the tradition of spatial stories, an honor they share with traditional
myths and heroes’ quests as well as modern works by J.r.r. Tolkien (2004). simply by
traveling through the game space, a story is told.
Storytelling in Games
Many games have used storytelling to great effect. The Half-Life series stands out
as a particularly good example. The games from this series are first-person shooter
action games in which the player traverses a virtual world that seems to be vast but
which in reality is confined to a narrow path. The whole story of Half-Life is told
within the game. There are no cut-scenes that take the player out of the game, all
dialogue is performed by characters inside the game, and the player can choose to
listen or ignore them altogether. Half-Life has perfected the art of guiding the player
through the game, creating a well-structured experience for him. The practice is
often referred to as railroading; in this light, it is probably no coincidence that in
Half-Life and Half-Life 2 the player arrives on a train (see Figure 2.2). The disadvantage of railroading is that the player’s freedom is mostly an illusion. When players
go in a direction that was not intended by the game, the illusion can break down
very quickly. It takes a lot of design skill to prevent players from noticing the invisible boundaries that prevent the player from exploring in other directions.
Creating interactive stories for games is not easy. Traditional techniques such as using
branching story trees have proven inefficient. You have to create a lot of content the
player will not experience in a single play-through. Creating vast open worlds for
the player to explore, as is often the case in many of the Elder Scrolls games, offers
much freedom to the player but often means that the players lose track of the main
storyline altogether. To create a coherent, storylike game, a delicate balance between
offering players freedom and restricting their freedom through the design of your
levels is required.

-- 47 of 443 --

emerGence and PrOGressiOn 33

---

## Sección 44: ChAptEr 2

example: The Legend of Zelda
Almost all the games and levels in the Legend of Zelda series are good examples
of games of progression. To give a detailed example of how progression works in
games, let’s examine the Forest Temple level in The Legend of Zelda: Twilight Princess.
In this level, the player, controlling the game’s main character Link, sets out to
rescue eight monkeys from an evil presence that has infested an old temple in
the forest. The mission consists of the player freeing eight monkeys, defeating the
mini-boss (the misguided monkey king Ook), and finding and mastering the “gale
boomerang” before finally defeating the level boss (the Twilit Parasite Diababa).
Figure 2.3 displays the Forest Temple level map. Figure 2.4 summarizes the player’s
tasks and their interrelation in a graph. To reach the goal, Link needs to confront
the level boss in a final fight. To get to that fight, Link must find a key and rescue
four monkeys, for which he needs the gale boomerang, for which he needs to defeat
the monkey king, and so on. Some tasks can be executed in a different order: It does
not really matter in what order Link liberates the monkeys. Other tasks are optional
but lead to useful rewards.
FIGURe 2.2
in Half-Life 2 the player
arrives in the game by
train but never leaves
the rails.

-- 48 of 443 --

34 Game mechanics: advanced Game desiGn
FIGURe 2.3
a map of the
Forest Temple
FIGURe 2.4
a graph of the forest
temple mission

-- 49 of 443 --

emerGence and PrOGressiOn 35

---

## Sección 45: ChAptEr 2

Zelda is not a pure Game oF proGression
all games in the Legend of Zelda series combine mechanics of progression with emergent gameplay. combat, for example, features a lot of emergent mechanics in which
the players must learn and master many different fighting techniques and discover for
themselves which strategy works best against what enemy. as already noted, pure games
of progression are quite rare these days. however, the Legend of Zelda games do include
strong mechanics of progression: They have cleverly designed levels and a long story line
to structure the gameplay experience. as such, it is a prime example of progression in
games.
The mission structure for the Forest Temple level has a few striking features. One
is the bottleneck formed by the fight with the mini-boss and the retrieval of the
boomerang halfway through the mission and the two sections of parallel options
before and after the bottleneck. The game space features a hub-and-spoke layout
(see the “Hub-and-Spoke Layout in Zelda Games” sidebar) that supports the parallel
tasks of the mission structure. From the central hall (where the big spider is fought),
the player can go in three directions. The pathway that leads to the right quickly
branches into three more pathways. Three pathways lead to captured monkeys and
one to the mini-boss. The last pathway is open to Link only after he has freed the
first four monkeys. After the player has retrieved the gale boomerang, he can reach
additional spaces in the first hub-and-spoke structure and a new hub.
hub-and-spoke layout in Zelda Games
The dungeons of Zelda games are frequently arranged in a hub-and-spoke layout. One
central room in the dungeon acts as a hub. From this location the player can venture
into different parts of the dungeon: the spokes. Players frequently return to the hub after
completing a particular task in a spoke. The advantages of a hub-and-spoke layout are
that it lets players choose which tasks to complete first (and lets them choose a new one
if the first one they try is too difficult), and hubs are good locations for save points or
dungeon entrances. Using a hub-and-spoke layout minimizes backtracking through areas
players have already seen. For a more detailed discussion on the hub-and-spoke layout
technique, refer to chapter 12 of Fundamentals of Game Design.
The gale boomerang itself is a good example of the lock and key mechanisms typical
of the series. This is used in many action-adventure games, as Ashmore and Nietsche
observed in their paper “The Quest in a Generated World” (2007). Lock and key
mechanisms are one way to translate strong prerequisites in a mission into spatial
constructions that enforce the relationships between tasks. The boomerang is both a
weapon and a key that can be used in different ways. It has the capability to activate
switches operated by wind. Link needs to operate these switches to control a few
turning bridges to give him access to new areas. To get to the master key that unlocks

-- 50 of 443 --

36 Game mechanics: advanced Game desiGn
the door to the final room with the level boss, he must use the boomerang to activate
four switches in the correct order. At the same time, the boomerang can be used to
collect distant objects (it has the power to pick up small items and creatures) and
can be used as a weapon. This allows the designer to place elements of the second
half of the mission (after the mini-boss has been defeated) in the same space that is
used for the first half of the mission. This means players will initially run into obstacles they cannot overcome until they have found the right key—the boomerang.
discrete mechanics in Zelda Games
Zelda games mix discrete mechanics with continuous mechanics for physics. space in
Zelda is continuous, as are most physical challenges. however, a great many mechanics
in Zelda are discrete. The hearts on the health bar and the damage done by Link and his
enemies are discrete: a particular enemy will always cause the same damage to you, and
you will be able to defeat that enemy with a constant number of hits with your sword.
Likewise, the mechanics controlling progression are all discrete as well. You require a
small key to unlock a door, a particular number of monkeys to help you past a gap, and
so on.
Using this particular layout and lock and key elements, the Forest Temple level in
The Legend of Zelda: Twilight Princess is structured to generate play trajectories that
feel like heroic tales. When Link enters the temple, he receives a challenge to adventure as he finds the first of eight monkeys he needs to liberate. Shortly after this, he
encounters a large spider guarding the first hub in the level. Defeating this spider
grants access to many locations in the first part of the level. What follows are many
tests and obstacles, during which the hero Link meets new friends and enemies.
Halfway through the level, Link confronts the monkey king, but there is a twist in
the plot as he discovers that the monkey king is not his major adversary after all. He
escapes with a magic item, the gale boomerang, which unlocks the second part of
the dungeon and helps him defeat his real adversary in a final climactic battle. Just
as the same structure—the hero’s journey—never seems to grow stale for fairy tales
and adventure films, this structure can be found in many of Link’s adventures and
in many other games as well.
Each enemy, trigger, or lock serves as a simple mechanism to control access to the
next part of the story. Designing games of progression involves careful planning.
Remember that the physical layout of your level and the location of key items inside
it are your most important tools to control how players progress. You should use
these elements to create a smooth and coherent experience for the players. At the
same time, you must make sure that your players have had a chance to learn and
practice the skills required to complete a level, but most of all make sure that they
enjoy their own progress by letting them overcome obstacles that they were initially
unable to defeat.
NOT E We do not
have space to discuss
the hero’s journey
story-pattern in more
detail here, but there
are many resources
to guide you if you are
interested in learning
more about it. One
of the more popular
works is christopher
vogler’s book, The
Writer’s Journey:
Mythic Structure for
Writers (1998).

---

## Sección 46: ChAptEr 2

-- 51 of 443 --

emerGence and PrOGressiOn 37
Structural Differences
To understand the difference between progression and emergence a little better,
let’s look at the structure of the mechanics that create the two different types of
gameplay. Games of emergence are characterized by only a few rules. In a game of
emergence, complexity is created by many connections and interactions between the
rules, rather than large numbers of rules. What is interesting with this type of game
is that the complexity of the gameplay leaps up after reaching a certain point in
the complexity of the rules. We already saw a similar jump in gameplay complexity
in the discussion of tic-tac-toe and Connect Four. Figure 2.5 illustrates that turning
point, which we refer to as the complexity barrier. Beyond a certain point, interactions among the rules create an effect that is sometimes called the explosion of the
probability space. In general, mechanisms that contribute to emergence in games add
many different possible states to the game. Large probability spaces make games
more replayable; as a player, you can be confident no two games will be exactly
alike. This adds to a game’s appeal, especially if the outcome of each play-through is
as unpredictable as the first.
Games of progression usually possess many rules but far fewer interactions among
the rules. The mechanics that control player progress through a level hardly interact with similar mechanisms in the game. Many of the mechanisms serve a single
purpose: to keep players from reaching a certain place until they have accomplished
some other task first. In effect, these mechanisms can be in one of two simple states:
A door can be open or closed, a key can be found or not. Mechanisms that contribute to progression rarely add many different states to the game, but they are easily
controlled by the game designer. The advantage of progression is that the designer
can dictate the order in which players will face challenges and learn skills and can
FIGURe 2.5
The complexity barrier
is the region between
the two dotted lines.

-- 52 of 443 --

38 Game mechanics: advanced Game desiGn
integrate constantly increasing challenges into an overarching story line. The overall experience is much easier to design in a game of progression than it is in a game
of emergence.
The shape of the probability space generated by typical mechanics of emergence and
mechanics of progression is quite different. Games of emergence have a probability
space that is large and wide, because the game presents players with many options,
and the game’s direction is often subject to factors outside the player’s direct control
(such as die-rolling). In contrast, the probability space of games of progression tends
to be small but deep. For a designer, it is easier to create a sequence of many gameplay choices—but with fewer options at each decision point—and still have a good
idea of, and control over, the possible outcomes. This is why games of progression
are usually longer than games of emergence and can deliver coherent stories. Games
of emergence, such as checkers, tend to be shorter. In a long game of emergence,
you run the risk that the player will make a small mistake early on that makes the
game unwinnable hours later—a design flaw. X-COM: UFO Defense, although an
excellent game in many respects, exhibited this property.
The mechanics of emergence are efficient at creating a large probability space. The
mechanics that control progression do the opposite, restricting the probability space
by limiting the number of options that players have at any one time—they cannot
proceed until a particular problem is solved. As a designer, the mechanics of progression allow you to carefully structure the player’s experience and deliver a well-told
story. They also enable you to control the difficulty of the game so that players do
not encounter challenges for which they are not yet prepared. Table 2.1 summarizes
these differences.
TAble 2.1
structural differences
Between mechanics
of emergence
and mechanics of
Progression
ST Ru C T u R E EM E RG E N C E P RO G R E SS I O N
number of rules Low high
number of game elements high Low-high
interactions among elements high Low
Probability space Large, wide small, deep
replay value high Low
designer control of game sequence Low high
Length of game Tends to be short
(Civilization is a rare exception)
Tends to be long
Learning curve Tends to be steep Tends to be gentle

-- 53 of 443 --

emerGence and PrOGressiOn 39

---

## Sección 47: ChAptEr 2

Emergence and Progression Integration
Although emergence and progression are considered two different ways of creating
challenges in games, many games have elements of both. By integrating emergence
and progression, designers strive to combine the best of both worlds: freedom and
openness of play through emergence and the structured storylike experience through
progression. Progression is normally used for storytelling, but it is difficult to create
a coherent plot if the player has great freedom of action, as in emergent games. In
practice, these generally alternate: An emergent level or mission unlocks a little story
progress between levels, followed by another emergent level, and so on. The Grand
Theft Auto games provide good examples. In those games, players may achieve victory
in a mission by a wide variety of means, but their gameplay choices don’t really
affect the story; it occurs only between missions. So far, not many games have succeeded in integrating the two different structures so that players experience them
simultaneously. There are many reasons for this:
n Video games are still a relatively young medium. No one can expect all these
problems to be solved already.
n As Noah Wardrip-Fruin argues (see the “A Mismatch in the Mechanics of Games
and Stories” sidebar), there is a disparity between the level of sophistication of the
mechanics of progression and emergence: Mechanics of emergence have evolved
much further and quicker in the past years than mechanics of progression have.
n In the past, the lack of solid formal theory of what game mechanics are and how
they are structured made it difficult to approach such problems. One of the goals
of this book is to present a methodological approach to designing game mechanics
and to use this method to deal with these sorts of problems.
In addition, in the short history of video games there are a few interesting examples
of games that have come up with ways to combine the two structures. Let’s take a
look at one of the more recent examples.
a mismatch in the mechanics oF Games and stories
in his book Expressive Processing (2009), noah Wardrip-Fruin observes that the mechanics
that govern a game’s interactive story have not evolved as much as the mechanics to
handle movement, combat, and other aspects of the game’s (physics) simulation. simulation
mechanics are currently very evolved and detailed, but the player’s progress through a
story is simply tracked by setting up a few bottlenecks or gates to act as milestones. Once
the player fulfills the task associated with a milestone, the story advances. as Wardrip-Fruin
argues, the underlying shape of these story progression mechanics is not as interesting
as the underlying shape of the mechanics of the rest of the game.

-- 54 of 443 --

40 Game mechanics: advanced Game desiGn
example: From StarCraft to StarCraft 2
The original version of StarCraft is an excellent example of a game of emergence.
StarCraft helped define the real-time strategy genre. Like Civilization, the individual
game elements are fairly simple, but there are many interrelationships among them,
setting up a system of game mechanics that has many interesting emergent properties. During the single-player campaign, you play through 30 missions, which
nearly all have you build a base, manage your resources, and construct and upgrade
an attack force before obliterating your opponents. The progression within a single
StarCraft level is almost always the same, and because it is predictable, a given level
does not feel very storylike.
StarCraft also tells a story around the levels. In many ways, it is a good example of
storytelling in games, with a narrative that is more dramatic than most games of its
time. In fact, its storyline follows a structure similar to a classical tragedy, which is
definitely rare in games. However, the story is only a framing device around the
core gameplay. The player’s performance and choices have no impact on the plot,
apart from the fact that the player must complete missions to advance the story.
The story provides context and motivation for the game but is not an integrated
part of the gameplay.
When StarCraft 2 came out, more than a decade later, the story and its integration
into the game was probably the biggest change. StarCraft 2 changed little about the
core mechanics of the original game. You can still build a base, manage resources,
and construct and upgrade your force. However, the missions of the single-player
campaign are much more varied than they were in the original game. For example,
in the level “The Devil’s Playground,” the lower areas of the play field are periodically submerged in lava, destroying everything that is caught there (see Figure 2.6).
The mission’s objective is not to defeat an enemy base but to survive under these
harsh conditions and harvest a number of resources in the meantime. This creates
a different rhythm and progression from those of the typical missions in the original
version of StarCraft. Another good example is the earlier mission called “The
Evacuation.” In this mission, it is your objective to protect a number of civilian
colonists as they try to escape a planet overrun by aliens. To this end, you need to
escort four caravans of civilians trying to break through to the safety of a nearby
spaceport. You will build a base and an attack force but in this case, to protect the
route and civilians. Again, this creates a different play experience from the typical
StarCraft mission. In the single-player campaign of StarCraft 2, it is rare to find a
mission that progresses through the typical stages of the missions of the original
game. No longer can you simply build your base, carefully explore the map, and
attack enemy bases one by one. In StarCraft 2, you find yourself pressed by events
and scenarios that were predesigned—a classic progression mechanic. As a result,
the missions are much more varied and engaging, forcing players to adapt their
strategies and common patterns of play to new circumstances all the time. Because
they are not repetitive, they feel more storylike.

---

## Sección 48: ChAptEr 2

-- 55 of 443 --

emerGence and PrOGressiOn 41
In StarCraft 2, the player has more control over the larger story line of the game. To
a certain extent, players can choose the order of missions and sometimes can choose
between two options. Although this integrates the overall storyline into the game
slightly better than the original StarCraft did, it is not as sophisticated as the integration between progression and emergence on the level of the individual mission.
Summary
In this chapter, you explored the categories of games of emergence and games of
progression. These categories are frequently used in game studies to indicate two
alternative ways of creating gameplay and challenges in games. There seems to be a
tendency within game studies and among certain game designers to favor games of
emergence over games of progression. This tendency can be attributed to the more
interesting structure of the mechanics that create emergence in games and the size
of the possibility space created by mechanics of emergence.
Games of emergence are characterized by relatively few rules, many interrelated
game elements, and a large and wide possibility space. Games of progression are
characterized by relatively many rules, fewer interrelation between game elements,
and a smaller possibility space that is usually narrow and deep.
FIGURe 2.6
“The devil’s
Playground”
mission in
StarCraft 2

-- 56 of 443 --

42 Game mechanics: advanced Game desiGn
Modern video games include elements from both games of emergence and games
of progression. However, integrating emergence and progression so that the player
experiences both at once is not straightforward. It requires keen insight in the
structure of the mechanics that create them. In this book, we will teach you a more
structured method for looking at mechanics. In the later chapters, we will return to
the integration of emergence and progressions and use these methods to shed new
light on the problem of integrating them.
Exercise
Games of chess are commonly regarded to have three phases: the opening, the middle game, and the end game—and yet the rules never change throughout the game.
This effect is an emergent property of the rules themselves, not an artificial construct
created by mechanics of progression.
1. Find another game that progresses through different gameplay phases. (You
should consider tabletop games as well as video games in your search.)
2. What causes this to happen?
3. Are the different phases truly emergent, or are they the result of a predesigned
scenario or arbitrary triggers?

-- 57 of 443 --

---

## Sección 49: ChAptEr 3

Complex systems
and the structure of
Emergence
In the first chapter, we explained how gameplay emerges from the game’s mechanics. In Chapter 2, “Emergence and Progression,” we showed that the mechanics of
games of emergence possess a particular structure in which relatively simple rules
create many different gameplay situations. In general, this also means that a game
of emergence has a high replay value. In this chapter, we will explore the relationship between emergence, the structure of game mechanics, and gameplay in more
detail. We will see that for gameplay to emerge from them, the mechanics must be
balanced between order and chaos. This balance is easily upset, which creates a challenge for designers. In fact, designing emergence is something of a paradoxical task,
because one of the defining aspects of emergent behavior is that it occurs only after
a system is put into motion.
Emergence is not restricted to the domain of games. There are many different complex systems that display emergent behavior, and quite a few of these systems have
been studied in the past. The science of complexity, popularly known as chaos theory,
deals with emergent systems in other fields. In this chapter, we will take a look at
some of the advances from this discipline to learn more about the structures of complex systems that contribute to emergent behavior. But first we will discuss in more
detail the relationship between emergence and gameplay.
Gameplay as an Emergent Property of Games
We define gameplay as the challenges that a game poses to a player and the actions
the player can perform in the game. Most actions enable the player to overcome
challenges, although a few actions (such as changing the color of a racing car or
chatting) may not be related to challenges. The actions that are related to challenges
are governed by the game mechanics. An avatar can jump only when a jumping
mechanic has been implemented in the game, for example.

---

## Sección 50: ChAptEr 3

-- 58 of 443 --

44 Game mechanics: advanced Game desiGn
It’s possible to program the game in such a way that every challenge has one unique
action that overcomes it. As we discussed in the previous chapter, classic games of
progression, such as text-adventure games, work this way—each challenge is a unique
puzzle, and each puzzle has a unique action that solves it. However, we also argued
that in most games at least some of the actions and challenges are created differently.
In Tetris, nobody programmed in all the possible combinations and sequences of
falling tetrominoes (Tetris blocks). The game simply releases tetrominoes at random.
In Tetris, the challenge is created by a combination of a random sequence of tetrominoes and the player’s previous actions in dealing with them. This combination is
different every time, and players have some level of control over the challenges they
face. The game requires very few actions to deal with the infinite variety of challenges
it can create. Solitaire card games do the same thing.
Other games implement mechanisms that allow players to act in unexpected ways.
In his 2001 article “The Future of Game Design,” game designer Harvey Smith discussed the need to set up game systems so that players have the opportunity to act
in a wide range of expressive ways (www.igda.org/articles/hsmith_future). To make
this possible, the game designer should move away from special-case solutions to
individual, predesigned challenges and toward simple, consistent game mechanics
that can be combined in interesting ways, even if this leads to some strange results.
Rocket jumping is one of those examples. Because an exploding rocket exerts a force
on nearby objects in most first-person shooter games, clever players have used that
extra force to jump greater heights and distances. Smith regards these emergent
player tactics not as problem but as an opportunity: He argues that more games
should be designed around the freedom and creativity that expressive systems allow.
consistency oVer realism
rocket jumping is an example of unintended, and rather weird, gameplay that is as
unrealistic as it is enjoyable. it illustrates the argument made by steven Poole in his book
Trigger Happy (2000) that in games it is more important to be consistent than to be realistic. Poole argues that to play a game is to immerse yourself into an artificial world created by game mechanics. Players do not want those mechanics to be perfectly realistic.
a realistic Formula 1 racing game, for example, would take players years of practice to
become skilled enough to race, and that wouldn’t be fun at all for most players. Players
expect all space shooter weapons to behave like the blasters in Star Wars, not like real
lasers where the beam moves at the speed of light and is invisible unless you are hit by
it. Players play games to do things that would be impossible or unsafe for them to do in
real life, and odd effects such as rocket jumps are all part of the fun. however, players
do expect game mechanics to be consistent. Players get frustrated when the mechanics
seem arbitrary, such as when a rocket can kill a tough enemy but fails to destroy a light
wooden door.

-- 59 of 443 --

cOmPLex sYsTems and The sTrUcTUre OF emerGence 45

---

## Sección 51: ChAptEr 3

Games of emergence have a high replay value because the challenges and possible
actions that occur while playing are different every time. Every session is the unique
result of the collaboration between the game and its players. However, it is very
hard to predict whether interesting gameplay will emerge from a particular game
simply by looking at the rules. From our discussion of tic-tac-toe and Connect-Four
in the previous chapter, it should be clear that creating emergence is not simply a
matter of having many rules. The relation between the complexity of the rules and
the complexity of the game’s behavior is not linear. You cannot create a more interesting game simply by adding more rules. In fact, sometimes it is more effective to
reduce the number of rules to create a system that displays truly interesting and
emergent gameplay.
between Order and Chaos
The behavior of complex systems (see the “What Are Complex Systems?” sidebar)
can be classified as ordered to chaotic and anything in between. Ordered systems
are simple to predict, while chaotic systems are impossible to predict, even when
you fully understand the way the parts work that make up the system. Emergence
thrives somewhere between order and chaos.
What are complex systems?
When we refer to complex systems in this book, we do not mean systems that are difficult
to understand. The word complex is used here to indicate that the system consists of
many parts. as is often the case with the systems studied by the science of complexity, these parts are often quite simple to understand and to model individually. When
these parts are put together, most complex systems display surprising and unpredictable
behavior that can be difficult to explain just by looking at the parts separately. in the
scientific literature on complex systems, games are a classic example. The individual
rules of these games tend to be fairly simple and easy to understand, yet the outcome of
a game is unpredictable. in this book, we explore in detail the relationship between the
individual parts of a game and the game’s overall behavior.
There are two stages between the extremes of order and chaos: periodic systems and
emergent systems (Figure 3.1). Periodic systems progress through a distinct number
of stages in an ongoing and easily predicted sequence. On a large scale, the weather
system and the cycle of seasons behave like this. Depending where you are on the
planet, you have a fixed number of seasons each year. In some areas, the rhythm
of the seasonal cycle is very strict, and a particular season will start almost on the
same day every year. Despite some variance in seasonal temperatures and the date
when seasons start, the weather system is mostly in balance and progresses through
the same cycle over and over again. (Global warming appears to be changing the

-- 60 of 443 --

46 Game mechanics: advanced Game desiGn
weather system at the moment, but there is considerable debate about whether it is
a permanent change or part of a very long cycle.)
Emergent systems are less ordered and more chaotic than periodic systems. Emergent
systems often display stable patterns of behavior, but the system might switch from
one pattern to another suddenly and unpredictably. The weather system is a good
example. Although the cycle of seasons has overall norms in a particular area, predicting the weather for a particular year is difficult. The date of the next hard frost
or the amount of snow in winter is nearly impossible to predict accurately because
of the complex interactions of pressure systems, ocean temperature, and air temperature. It is still possible to make assumptions and create rules of thumb based upon
statistical norms, such as “plant peas on Good Friday,” but these will not be reliable
in every year.
experiencinG emerGence in a simple experiment
You can experience the four categories of complex behavior through a simple experiment. all you need is a water tap (although this experiment works better with some
taps than with others). When you open a water tap very gently, at one point it will start
dripping drops of water at a slow, regular pace. sometimes it is easier to reach this
state by opening the tap and then gently closing it. a closed tap is an easily predictable,
ordered behavior: no water flows. a dripping tap is in a periodic state. now, when you
gently open the tap further, it will start dripping faster and faster. however, at a certain
point, not very long before you get a full stream of water, the pattern of water flow will
become irregular. at this stage, you are moving the system quickly toward a chaotic state.
somewhere in between the chaos and periodic dripping you might be able to get more
complicated periodic patterns, such as two quick successive drips followed by a longer
pause. sometimes the tap will alternate between fast drips and a slow, irregular trickle.
Opening the tap further will quickly push the tap state back to a steady, ordered flow
of water.
FIGURe 3.1
Four categories of
behavior of complex
systems

-- 61 of 443 --

cOmPLex sYsTems and The sTrUcTUre OF emerGence 47

---

## Sección 52: ChAptEr 3

In games, we can recognize patterns of behavior, and in many games we can recognize multiple patterns at the same time. Games of progression are ordered systems,
because all possible sequences of challenges and actions are predesigned. Although
the player cannot know what will happen next, a designer looking at the mechanics can determine it with certainty. In board games, taking turns creates a periodic
system but with more subtlety. The discrete unit of time (ticks) used in most massively
multiplayer online role-playing games (MMORPGs) affects the strategies of players.
The distinct development phases in Sid Meier’s Civilization (expansion, consolidation,
war, colonization, and the race to space) are clear examples of emergent behavior in
games. Finally, dice or random number generators, and other players, introduce a
chaotic element into games. To design an emergent game, the designer must ensure
that all these elements balance one another in such a way that the game’s overall
behavior falls somewhere in the emergence category.
Can emergence be Designed?
Emergence can occur in complex systems only after they have been set in motion.
This explains why game design depends heavily on building prototypes and testing
the game. Games are complex systems, and the only way to find out whether the
gameplay is interesting, enjoyable, and balanced is to have people play the game in
some form.
Normally we think of design as a process in which the designer knows what she
wants to produce and works to create it. Designing emergent systems is paradoxical
because designers may not know exactly what final state their system will produce
but will be designing the experience of getting there. However, as we explained in

---

## Sección 53: Chapter 1, “Designing Game Mechanics,” certain structures in a game’s mechanics

will tend to produce particular types of results. Understanding these structures helps
designers create the effects they want, even if the process still requires a lot of testing.
This book is all about identifying these structures, recognizing them in your (and
others’) games, and leveraging them to produce the gameplay you want.
Before we set our focus back on games in the following chapters, let’s take a look at
a few classic examples from the science of complexity.
Structural Qualities of Complex Systems
The science of complexity typically concerns itself with vast, complex systems. The
weather system is the classic example. In these systems, a small change can have
large effects over time. This is popularly known as the butterfly effect: A butterfly
that flaps its wings on one side of the planet might hypothetically trigger a motion
of air that accumulates into a hurricane on the far side of the planet. Other systems
studied by the science of complexity include stock markets, traffic, pedestrian flow,
the flocking of birds, and the motion of astronomical objects. These systems are

-- 62 of 443 --

48 Game mechanics: advanced Game desiGn
typically far more complex than the systems found in games. Luckily, there are also
many other, simpler systems that also display emergent behavior. It is easier to study
these systems and try to distill from them the relevant structural qualities that contribute to emergent behavior.
Active and Interconnected Parts
At the boundary of mathematics, computer science, and games lies a peculiar field
that studies cellular automata (the plural of cellular automaton). A cellular automaton is a simple set of rules governing the appearance of spaces, or cells, in a line or
on a grid. Each cell may be either black or white. The rules determine what causes a
cell to change from black to white (or vice versa) and how the color of a cell influences the cells around it. Normally the rules for changing a cell’s color only take
into account the cell’s current color and those of its eight immediate neighbors (on
a two-dimensional grid) or its two immediate neighbors (on a line).
Mathematicians think of such a collection of rules as a hypothetical machine that
operates by itself without human intervention. This is why they are called automata.
A cellular automaton starts with its cells in a given configuration (some white, some
black) and then applies the rules to each cell to determine whether its color should
change. It does not change a cell immediately; it checks every cell in the grid first,
marks the ones to be changed, and then changes them all before the next iteration.
Then it repeats the process. Each iteration is called a generation.
British scientist Stephen Wolfram has created a simple cellular automaton that
exhibits emergent behavior. It uses a line of cells. The state (or color) of each cell
is determined by the previous state of that cell and its two immediate neighbors.
Because cells have only two possible states, black and white, this creates eight possible combinations. Figure 3.2 displays one set of possible rules (on the bottom)
and the resulting, surprisingly complex pattern that is created by printing each new
generation of the system under the previous one. It begins with one black cell and
all the rest white.
The images at the bottom of the figure state the rules for converting the color of a
cell. The leftmost rule means “If a black cell is surrounded by black cells on either
side, in the next generation, the cell will turn white.” The fourth rule means “If a
white cell has a black cell on its left side only, in the next generation, the white cell
will turn black.”
Notice that even though there is nothing random in the rules, this cellular automaton produces a pattern with distinctive and apparently random features.

-- 63 of 443 --

cOmPLex sYsTems and The sTrUcTUre OF emerGence 49

---

## Sección 54: ChAptEr 3

Wolfram described his work in detail in his book A New Kind of Science (2002).
His extensive study has revealed three critical qualities of systems that exhibit
dynamic behavior:
n They must consist of simple cells whose rules are defined locally. This means
the system must consist of parts that can be describe relatively easily in isolation.
In Wolfram’s cellular automaton example, eight simple rules determine the behavior
of each individual cell.
n The system must allow for long-range communication. Changes in the state of
a single part of the complex system must be able to cause changes in parts distant
in space or time. Long-range communication is what makes the butterfly effect
possible. In Wolfram’s cellular automaton, communication between parts takes
place because each cell directly influences its immediate neighbors. Because those
neighbors also have neighbors, each cell is indirectly connected to every other cell
in the system.
FIGURe 3.2
stephen Wolfram’s
cellular automaton

-- 64 of 443 --

50 Game mechanics: advanced Game desiGn
n The level of activity of the cells is a good indicator for the complexity of the
behavior of the system. In a system that has only a very few active cells, interesting,
complex behavior is unlikely to emerge. In Wolfram’s automaton, activity is understood as changes to a cell’s state: A cell is active when it changes from black to white
or from white to black.
Interestingly, some of these qualities can be ”read” from the rules that govern each
cell’s behavior. The fact that each cell takes input from itself and two neighbors
indicates that there is a good chance at long-range communication: All the cells are
connected. In addition, four of the eight rules in Figure 3.2 cause the cell to change
its color, which indicates that there probably is going to be a fair amount of activity
in the system.
Cellular automata show us that the threshold for complexity is surprisingly low.
Relatively simple rules can give rise to complex behavior, as long as there are enough
parts, activity, and connections. Most games are built in a similar way. Games
consist of many different elements that are governed by fairly simple mechanics.
Usually there are many possible interactions between the individual game elements.
Obviously, the player is an important source of activity within the system, but as
cellular automata show, emergence can take place even without human input.
Tower defense games illustrate these properties well (Figure 3.3). Tower defense
games consist of a number of relatively simple parts. Enemies follow a predesigned
path toward the player’s fortress. Each enemy has a particular speed, a number of
hit points, and perhaps a few attributes to make it more interesting. The player
places towers to defend his position. Each tower fires projectiles at enemies within
a certain range and at a certain rate. Some towers deal damage while others produce
other effects, such as slowing enemies down. Sometimes towers will boost the performance of neighboring towers. In a tower defense game, there are many elements
defined by local mechanisms (enemies and towers). Like cellular automata, these
elements are active (enemies move, towers respond to enemies) and interconnected
(towers shoot at enemies, towers can boost each other’s performance).
The level of activity and the number of connections between elements are good
indicators that can be used to distinguish games of emergence from games of progression. In a typical game of progression, all elements (puzzles, characters, and so
on) interact only with the player’s avatar and not with each other, and they become
active only when they are on the screen. The elements not currently visible on the
screen in a game of progression are usually inactive. Similarly, the number of connections among the elements is low. Game elements can interact only in a limited
number of predesigned ways. Obviously, this gives the designer a lot of control over
the events in a game of progression, but, as we have shown in the previous chapter,
it also results in more predictable games that cease to be fun when all the predesigned
options have been explored.

-- 65 of 443 --

cOmPLex sYsTems and The sTrUcTUre OF emerGence 51

---

## Sección 55: ChAptEr 3

Feedback loops Can Stabilize or Destabilize a System
Ecosystems are another classic example of complex systems. Ecosystems seem to be
quite well balanced: The various animal populations within an ecosystem do not
change much over time. What’s more, nature seems to include all sorts of mechanisms to maintain this balance. This is best explained by looking at predator and
prey populations. When there are many prey, the predators will find food easily.
This will cause their number to increase. However, as more and more predators survive, the prey population will decrease. At a certain point, there will be too many
predators, and the situation reverses: Now the predators won’t find enough food,
and their population will decrease. Because there are fewer predators, more prey will
survive and produce offspring causing their population to rise again.
This particular balance between predators and prey in an ecosystem is attributed
to what is called a feedback loop. A feedback loop is created when the effects of a
change in one part of the system (such as the number of predators) come back and
affect the same part at a later moment in time. In this case, an increase of the number of predators will cause a decrease of prey, which in turn will cause a subsequent
decrease of predators. The effects of the changes to the predator population size are
quite literally fed back to the same population size.
FIGURe 3.3
Tower Defense:
Lost Earth HD

-- 66 of 443 --

52 Game mechanics: advanced Game desiGn
Feedback loops that work to maintain a balance within a system are called negative
feedback loops. Negative feedback loops are commonly used in the design of electrical
appliances. A thermostat is a typical example: A thermometer detects the temperature of the air, and when it becomes too low, it will activate a heater. The heater
will then cause the temperature to rise, which in turn will cause the thermostat to
turn the heater off again. A speed governor on a machine is another: When the
machine speeds up (perhaps because the load on it has been reduced), the governor
reduces the machine’s power source to make it slow down. When the machine slows
down, the governor increases the power source to make it speed up. This keeps the
machine’s speed constant. Speed governors are used to ensure that a machine works
at its most efficient rate of speed and cannot run dangerously fast if the load on it is
suddenly removed.
Negative feedback is frequently found in games. For example, in Civilization
(Figure 3.4), the population of a city is affected by negative feedback that is not
unlike the predator/prey example. As your cities grow, the growing population
demands more and more food. This causes the city to grow to a stable size that is
supported by the terrain and the player’s current level of technology.
FIGURe 3.4
Civilization V showing
population and food
supply of the city
of Thebes

-- 67 of 443 --

cOmPLex sYsTems and The sTrUcTUre OF emerGence 53

---

## Sección 56: ChAptEr 3

The opposite of a negative feedback loop is, unsurprisingly, called a positive feedback
loop. Instead of creating balance by acting against the changes that activated the
feedback loop, a positive feedback loop will strengthen the effects that caused it.
Audio feedback is a good example: A microphone picks up a sound, an amplifier
amplifies it, and speakers reproduce the original sound louder. The microphone
then picks up the new sound from the speakers, which gets amplified again, and
so on. The result is a high-pitched shriek that can be stopped only by moving the
microphone away from the speakers.
Positive feedback is also frequently found in games. For example, if you take one
of your opponent’s pieces in a game of chess, it becomes easier to take another one
because now you have more pieces than your opponent. Positive feedback creates
volatile systems that can change quickly.
We will be discussing feedback extensively throughout this book. In most games of
emergence, several different feedback loops operate at the same time. For now, it is
important to remember that in complex systems feedback loops can exist. Negative
feedback loops work toward maintaining a balance in the system, while positive feedback loops can destabilize the system.
Different behavioral Patterns emerge at Different Scales
Stephen Wolfram was not the only mathematician to study cellular automata.
Probably the most famous cellular automaton was invented by John Conway and
is called the Game of Life. Conway’s automaton consists of cells that are laid out on
a two-dimensional grid. In theory, this grid goes on indefinitely in all directions.
Each cell on the grid has eight neighbors: the cells that surround it orthogonally
and diagonally. Each cell can be in two different states: It is either dead or alive. In
most examples, dead cells are rendered white, while live cells are colored black. Each
iteration the following rules are applied to each cell:
n A live cell that has fewer than two live neighbors dies from loneliness.
n A live cell that has more than three live neighbors dies from overcrowding.
n A live cell that has two or three live neighbors stays alive.
n A dead cell that has exactly three live neighbors becomes alive.
To start the Game of Life, you need to set up a grid and choose a number of cells
that are initially alive. An example of the effects that emerge from applying these
rules is depicted in Figure 3.5. However, to really appreciate the emergent behavior
of the Game of Life, we advise you to take a look at one of the many interactive
versions available online.
T IP You can download an open-source,
cross-platform version
of the Game of Life at
http://golly.sourceforge.
net. Wikipedia’s entry,
“conway’s Game of
Life,” includes links to
a number of other versions available online.

-- 68 of 443 --

54 Game mechanics: advanced Game desiGn
Step 1 Step 2 Step 3 Step 0 Step 4 Step 5 Step 6
When set into motion, the Game of Life usually has quite chaotic results, with a lot
of activity exploding from its original live cells. Frequently after a number of iterations the Game of Life settles in a more or less stable configuration, sometimes with
a few groups of cells that oscillate between two states.
One of the earliest questions that the researchers studying the Game of Life asked
themselves was this: “Is there an initial configuration of live cells that expands forever?” They quickly started finding configurations that showed some surprising
behavior. One of those configurations is called a glider. It is a group of five live cells
that replicates itself one tile away after four iterations. The effect of a glider is that
of a little creature that moves across the grid (Figure 3.6). More interesting patterns
were found, such as a glider gun, a pattern that stays in one place but produces new
gliders that move off every 30 iterations.
Step 0 Step 1 Step 2 Step 3 Step 4
Gliders and glider guns show that in complex systems the most interesting behavior
takes place not at the scale of the individual parts but at the scale of groups of parts.
This is something that can be observed in many other complex systems as well. The
flocking of birds is a good example. A flock of birds moves as one; the group as a
whole seems to have a distinctive shape, direction, and purpose (Figure 3.7). In this
case, the “rules” that steer the birds operate on both scales. Flocking can be simulated by having individual birds balancing their movement between moving toward
the center of the group, matching speed and direction with their neighbors, and
avoiding getting too close to their neighbors.
FIGURe 3.5
a few iterations of the
Game of Life
FIGURe 3.6
a glider in the Game
of Life

-- 69 of 443 --

cOmPLex sYsTems and The sTrUcTUre OF emerGence 55

---

## Sección 57: ChAptEr 3

In games, we see similar effects. Over the years players have wondered if the ghosts
in Pac-Man are deliberately teaming up against the player and laying traps to catch
the player. In fact, the ghosts do not collaborate, and their collective behavior appears
to be much smarter than it actually is. The ghosts in Pac-Man are simple machines
that follow simple rules. The game alternates between two states: scatter and chase.
In the scatter state, the ghosts do not hunt the player, but each seeks out a different
corner of the maze. Most of the time, however, the game is in the chase state, when
the ghosts hunt the player. To hunt the player, the ghosts have to make a decision
at each intersection in the maze. The algorithm that is used chooses the direction
that brings the ghost closer to the player. It simply ignores any walls between the
ghost and the player. Their behavior is implemented just a little differently for every
ghost: Blinky (the red ghost) tries to go the player’s current position; Pinky (the
pink ghost) tries to go to a position four tiles ahead of the player; Inky (the blue
ghost) combines the player’s position and the position of Blinky to determine where
to go; and finally Clyde (the orange ghost) chases the player when he is far away
but tries to get to lower-left corner of the maze when he gets close. Together, the
effects of the movements seem surprisingly smart: Blinky will follow the player
while Pinky and Inky try to get ahead of the player, and Clyde adds in some noise.
As a group, the ghosts are fairly effective hunters even with no knowledge of where
the others are actually located. This combination of simple behaviors gives players
the impression they are being hunted collaboratively, when they simply have complementary strategies.
FIGURe 3.7
Flocking birds
T IP For an extended
discussion of the
ghost’s behavior in
Pac-Man, see http://
gameinternals.com/
post/2072558330/
understanding-pacmanghost-behavior.

-- 70 of 443 --

56 Game mechanics: advanced Game desiGn
Categorizing emergence
Scientists distinguish among various levels of emergence in a complex system. Some
effects are more emergent than others. Feedback loops and the different scales that
exist within a complex system together go a long way to describe and explain different levels of emergence. In his paper “Types and Forms of Emergence,” scientist
Jochen Fromm uses feedback and scales to build the following taxonomy of emergence (2005).
In the simplest form, nominal or intentional emergence, there is either no feedback or
feedback only between agents on the same level of organization. Examples of such
systems include most man-made machinery where the function of the machine is
an intentional (and designed) emergent property of its components. The behavior
of machines that exhibit intentional emergence is deterministic and predictable but
lacks flexibility or adaptability. A speed governor and a thermostat are examples of
this type of predictable feedback.
Fromm’s second type of emergence, weak emergence, introduces top-down feedback
between different levels within the system. He uses flocking to illustrate this type of
behavior. A bird reacts to the vicinity of other birds (agent-to-agent feedback) and at
the same time perceives the flock as a group (group-to-agent feedback). The entire
flock constitutes a different scale from the individual birds. A bird perceives and
reacts to both. This behavior is not confined to birds; schools of fish behave similarly. Flocking can be generalized to any kind of unit capable of perceiving both its
immediate surroundings and the state of its group as a whole.
One step up the complexity ladder from weakly emergent systems are systems that
exhibit multiple emergence. In these systems, multiple feedback traverses the different
levels of organization. Fromm illustrates this category by explaining how interesting emergence can be found in systems that have short-range positive feedback
and long-range negative feedback. The stock market exhibits such behavior. When
stocks are going up, people begin to notice and to buy more, driving the price up
further (short-term positive feedback). People also know from experience that the
stock will eventually reach a peak, and they make plans to sell the stock when they
believe it has reached its peak, thus driving the price down (long-term negative feedback). The phenomenon works in reverse, too: People will sell a stock when they see
it dropping but buy later when they think it has reached bottom and is a bargain.
John Conway’s Game of Life also exhibits this type of emergence. The Game of Life
includes both positive feedback (the rule that governs the birth of cells) and negative feedback (the rules that govern the death of cells). The Game of Life also shows
different scales of organization: At the lowest end there is the scale of the individual
cells; on a higher level of organization, you can recognize persistent patterns and
behaviors such as gliders and glider guns.

-- 71 of 443 --

cOmPLex sYsTems and The sTrUcTUre OF emerGence 57

---

## Sección 58: ChAptEr 3

Fromm’s last category is strong emergence. His two main examples are life as an emergent property of the genetic system and culture as an emergent property of language
and writing. Strong emergence is attributed to the large difference between the
scales on which the emergence operates and the existence of intermediate scales
within the system. Strong emergence is multilevel emergence in which the outcome
of the emergent behavior on the highest level can be separated from the agents on
the lowest level in the system. For example, it is possible to set up a grid of the cells
used for the Game of Life in such a way that on a higher level it acts as a computer
able to perform simple computations and from which new complex systems (such
as games) can be built. In this case, causal dependency between the behavior displayed by the computer and the Game of Life itself is minimal.
These categories suggest that in games different levels of emergent behavior also
exist, often at the same time. More importantly, it also shows that structural characteristics of the game’s mechanics (such as feedback loops and the existence of
different scales) play a vital role in the emergence of complex and interesting
behavior.
Harnessing Emergence in Games
Games are complex systems that can produce unpredictable results but must deliver a
well-designed, natural user experience. To achieve this, game designers must understand the nature of emergent behavior in general and of their game in particular.
We regard the many active and interconnected parts, feedback loops, and different
scales as structural qualities of the game as a system. In games, these structural qualities
play a vital role in the creation of emergent gameplay. Studying game mechanics
will reveal these (and other) structures in much more detail. The rest of this book is
dedicated to this study.
The three structural qualities that were the main subject of this chapter are also the
first stepping-stones toward the construction of an applied theoretical framework
called Machinations that deals with emergence in games head-on. The Machinations
framework allows you, as a game designer, to get a better grip on the elusive process
of building quality games displaying emergent behavior. In the following chapters, we
will zoom in on the game mechanics of the internal economy. We’ll explain how
the Machinations framework can be used to visualize game mechanics and how structural qualities of the mechanics can be read from these visualizations. In Chapter 10,
“Integrating Level Design and Mechanics,” and Chapter 11, “Progression Mechanisms,”
we will zoom out and show how on a larger scale mechanics can be grouped and
used to design interesting levels that use both progression and emergence.

-- 72 of 443 --

58 Game mechanics: advanced Game desiGn
Summary
In this chapter, we discussed the definition of complex systems and showed how
gameplay emerges from them. We described the continuum between strictly ordered
systems and entirely chaotic ones and showed that emergence takes place somewhere between the two. Three structural qualities of complex systems contribute
to emergence: active and interconnected parts; feedback loops; and interaction at
different scales.
We used cellular automata as an example of simple systems that can produce emergence, and we described how tower defense games work like cellular automata.
Finally, we introduced Fromm’s categories of emergence, which are produced by
different combinations of feedback loops and interactions among the parts of a
system at different scales.
Exercises
1. Revise some of Wolfram’s rules as shown in Figure 3.2 so that some of the eight
possible combinations shown produce a different outcome from Wolfram’s original.
Using graph paper and a pencil, start with a single occupied cell and apply your new
rules repeatedly down the page. How do the results differ from the ones in the
figure?
2. Conway’s Game of Life is set on a rectangular grid and uses rules that modify a
cell based on the state of the eight cells around it. On a hexagonal grid, each cell has
six neighbors rather than eight, and on a triangular grid, each cell has only three
neighbors. Try devising Game of Life–like rules for a hexagonal or triangular grid
and see what results you get.

-- 73 of 443 --

---

## Sección 59: ChAptEr 4

Internal Economy
In Chapter 1, we listed five types of mechanics that you might find in a game:
physics, internal economy, progression mechanisms, tactical maneuvering, and
social interaction. In this chapter, we’ll focus on the internal economy.
In real life, an economy is a system in which resources are produced, consumed, and
exchanged in quantifiable amounts. Many games also include an economy, consisting of the resources the game manipulates and the rules about how they are
produced and consumed. However, in games, the internal economy can include all
sorts of resources that are not part of a real-life economy. In games, things like health,
experience, and skill can be part of the economy just as easily as money, goods, and
services. You might not have money in Doom, but you do have weapons, ammunition,
health, and armor points. In the board game Risk, your armies are a vital resource that
you must use and risk in a gambit to conquer countries. In Mario Galaxy, you collect
stars and power-ups to gain extra lives and to get ahead in the game. Almost all genres
of games have an internal economy (see Table 1.1 in Chapter 1 for some more examples), even if it does not resemble a real-world economy.
To understand a game’s gameplay, it is essential to understand its economy. The
economies of some games are small and simple, but no matter how big or small
the economy is, creating it is an important design task. It is also one of the few
tasks that belongs exclusively to the designer and no one else. To get game physics right, you need to work closely with the programmers; to get a level right, you
need to work closely with the story writers and level designers; but you must design
the economy on your own. This is the core of the game designer’s trade: You craft
mechanics to create a game system that is fun and challenging to interact with.
In Fundamentals of Game Design, Ernest Adams discussed the internal economy of
games. The discussion in this book repeats some of those points and expands the
notion of internal economy.
Elements of Internal Economies
In this section, we briefly introduce the basic elements of game economies: resources,
entities, and the four mechanics that allow the resources to be produced, exchanged,
and consumed. This is only a summary; if you need a more in-depth introduction,
please see Chapter 10, “Core Mechanics,” in Fundamentals of Game Design.
NOT E We use a
very broad definition
of the word economy.
it’s not just about
money! in an information economy, there are
data producers, data
processors, and data
consumers. Political
economy studies the
way that political forces
influence government
policies. economies
about money are called
market economies.
But we use the term
in a more abstract way
to refer to any kind
of system in which
resources —of any
type—can be produced, exchanged,
and consumed.

---

## Sección 60: ChAptEr 4

-- 74 of 443 --

60 Game mechanics: advanced Game desiGn
Resources
All economies revolve around the flow of resources. Resources refer to any concept
that can be measured numerically. Almost anything in a game can function as a
resource: money, energy, time, or units under the player’s control all are examples
of resources, as are items, power-ups, and enemies that oppose the player. Anything
the player can produce, gather, collect, or destroy is probably a resource of some
sort, but not all resources are under the player’s control. Time is a resource that normally disappears by itself, and the player usually cannot change that. Speed is also
a resource, although it is generally used as part of a physics engine rather than part
of an internal economy. However, not everything in a game is a resource: platforms,
walls, and any other type of inactive or fixed-level features are not resources.
Resources can be tangible or intangible. Tangible resources have physical properties
in the game world. They exist in a particular location and often have to be moved
somewhere else. Examples include items the avatar carries around in an inventory
or trees that can be harvested in Warcraft. In a strategy game, the player’s units are
also tangible resources that must be directed through the world.
Intangible resources have no physical properties in the game world—they do not
occupy space or exist in a particular location. For example, once the trees in
Warcraft have been harvested, they are changed into lumber, which is intangible.
Lumber is just a number—it doesn’t exist in a location. The player doesn’t need to
physically direct lumber to a site to build a new building. Simply having the right
amount of lumber is enough to start building, even if the building is constructed far
away from the location where the lumber was harvested. Warcraft’s handling of trees
and lumber is a good example of how games can switch between tangible and intangible treatments of resources. Medical kits (tangible) and health points (intangible)
in shooter games are another example.
Sometimes it is useful to identify resources as either abstract or concrete. Abstract
resources do not really exist in the game but are computed from the current state
of the game. For example, in chess you might sacrifice a piece to gain a strategic
advantage over your opponent. In this case, “strategic advantage” can be treated
as an abstract resource. (Abstract resources are intangible too—obviously, “strategic
advantage” is not a thing stored in a location.) Similarly, the altitude of your avatar
or units can be advantageous in a platform or strategy game; in this case, it might
make sense to treat altitude as a resource, if only as a way of factoring it into the
equation for the strategic value of capturing particular positions. The game normally does not explicitly tell the player about abstract resources; they are used only
for internal computation.

-- 75 of 443 --

inTernaL ecOnOmY 61

---

## Sección 61: ChAptEr 4

Note that in video games some resources that might appear to be abstract are in
fact quite concrete. For example, experience points are not an abstract resource in a
role-playing game. Instead, they are an intangible, but real, commodity that must
be earned and (sometimes) spent like money. Happiness and reputation are two more
resources used by many games that, although they are intangible, are nevertheless
concrete parts of the game.
To design a game’s internal economy or to study the internal economy of an existing game, it is most useful to start identifying the main resources and only then
describe the mechanisms that govern the relationships between them and how they
are produced or consumed.
entities
Specific quantities of a resource are stored in entities. (If you are a programmer, an
entity is essentially a variable.) A resource is a general concept, but an entity stores
a specific amount of a resource. An entity named “Timer,” for example, stores the
resource time—probably the number of seconds remaining before the end of the
game. In Monopoly, each player has an entity that stores available cash resources.
As the player buys and sells, pays rent and fines, and so on, the amount of cash in
the entity changes. When a player pays rent to another player, cash flows from the
first player’s entity to the second player’s entity.
Entities that store one value are called simple entities. Compound entities are groups
of related simple entities, so a compound entity can contain more than one value.
For example, a unit in a strategy game normally includes many simple entities that
describe its health, damage capability, maximum speed, and so on. Collectively,
these make up a compound entity, and the simple entities that make it up are known
as its attributes. Thus, a unit’s health is an attribute of the unit.
Four economic Functions
Economies commonly include four functions that affect resources and move them
around. These are mechanics called sources, drains, converters, and traders. We describe
them here. Again, this is a summary; for further details, see Chapter 10 of Fundamentals
of Game Design.
n Sources are mechanics that create new resources out of nothing. At a certain
time, or upon certain conditions, a source will generate a new resource and store it
in an entity somewhere. Sources may be triggered by events in the game, or they
may operate continuously, producing resources at a certain production rate. They
may also be switched on and off. In simulation games, money is often generated
by a source at intervals, with the amount of money created proportional to the
population. As another example, some games that involve combat automatically
regenerate health over time.

-- 76 of 443 --

62 Game mechanics: advanced Game desiGn
n Drains are the opposite of sources: They take resources out of the game, reducing the amount stored in an entity and removing them permanently. In simulation
games in which it is necessary to feed a population, the food is drained at a rate proportional to the population. It does not go anywhere or turn into anything else; it
simply disappears. In shooter games, ammunition is drained by firing weapons.
n Converters turn resources of one kind into another. As we mentioned, in
Warcraft, trees (a tangible resource) turn into lumber (an intangible one) when the
trees are harvested. The act of harvesting is a converter mechanic that converts trees
into lumber at a specific rate: A given number of trees will produce a given amount
of lumber. Many simulation games include technology upgrades that enable players
to improve the efficiency of the converter mechanics in the game, causing them to
produce more of the new resource from the old one.
n Traders are mechanics that move a resource from one entity to another, and
another resource back in the opposite direction, according to an exchange rule. If
a player buys a shield from a blacksmith for three gold pieces, the trader mechanic
transfers the gold from the player’s cash entity to the blacksmith’s and transfers the
shield from the blacksmith’s inventory to the player’s. Traders are not the same as
converters. Nothing is created or destroyed; things are just exchanged.
Economic Structure
It is not particularly difficult to identify the entities and the resources that comprise
an economy, but it is harder to get a good perspective on the system as a whole. If
you were to make graphs of the elements in your economy, what shapes would the
graphs reveal? Is the amount of a given resource increasing over time? How does the
distribution of resources change? Do resources tend to accumulate in the hands of
a particular player, or does the system tend to spread them out? Understanding the
structure of your economy will help you find the answers.
economic Shapes
In the real world, people represent features of an economy with charts and figures
(Figure 4.1). These graphs have a few interesting properties. At the small scale, their
lines move chaotically, but at larger scales, patterns become visible. It is easy to see
whether a line is going up or down in the long run and to identify good and bad
periods. In other words, we can recognize and identify distinctive shapes and patterns from these types of charts.

-- 77 of 443 --

inTernaL ecOnOmY 63

---

## Sección 62: ChAptEr 4

Wall Street Crash on the Dow Jones Industrial Average, 1929
200
400
Oct Jan Apr Jul Oct Jan Apr Jul Oct
1929 1930
We can draw similar charts displaying the fortunes of players in a game. As you will
see, distinctive shapes and patterns emerge from the internal economy of a game.
However, there is no one shape that identifies quality gameplay. What constitutes
good gameplay depends on the goals you set for your game and the context that
surrounds it. For example, in one game you might want the player to struggle for a
long time before managing to come out on top (Figure 4.2). In another, you might
aim for quick reversals in fortune and a much shorter play-through (Figure 4.3).
FIGURe 4.1
Graph of the stock
market crash leading to
the Great depression.
most movement is
chaotic, but the crash
is clearly visible.
FIGURe 4.2
a long game in which
the player triumphs
after an extended
struggle against a
powerful opponent

-- 78 of 443 --

64 Game mechanics: advanced Game desiGn
The Shape of a Game of Chess
We can take the development of players’ fortunes in a game of chess as a basis for
studying shapes in game economies. In chess, the important resources are the players’
pieces. Chess players (and computer chess programs) assign a point value to each
piece depending on what kind it is. For example, in one system, pawns are worth
one point, rooks five, and the queen nine. Adding up the value of all the pieces one
player has on the board produces a number called material. Players use their pieces
to maneuver on the board to gain strategic positions. Strategic advantage can be
measured as an abstract resource in the game. Figure 4.4 depicts what might be the
course of play between two players in a game of chess.
FIGURe 4.3
a short game with
quick reversals of
fortune
FIGURe 4.4
The course of a particular game of chess.
The color of a line indicates the color of the
player it refers to.

-- 79 of 443 --

inTernaL ecOnOmY 65

---

## Sección 63: ChAptEr 4

You can discover a few important patterns in this chart. To start with, the long-term
trend of both players’ main resource (material) is downward. As play progresses,
players will lose and sacrifice pieces. Gaining material is very difficult. In chess, the
only way to gain a piece is to bring a pawn to the other side of the board to be promoted to another, stronger piece, which would lead to an increase of material. This
is a rare event that usually initiates a dramatic change of fortune for the players. If
we consider only the material, chess appears to be a battle of attrition: Players who
can make their material last longest will probably come out on top.
Strategic advantage is more dynamic in the game; it is gained and lost over the
course of play. Players use their material to gain strategic advantage or reduce the
strategic advantage of their opponents. There is an indirect relationship between
the different amounts of material the players have and their ability to gain strategic
advantage: If a player has more material, then gaining strategic advantage becomes
easier. In turn, strategic advantage might be leveraged to take more pieces of an
opponent and reduce that player’s material. Sometimes it is possible to sacrifice
one of your pieces to gain strategic advantage or to lure your opponent into losing
strategic advantage.
A game of chess generally progresses through three different stages: the opening, the
middle game, and the endgame. Each stage plays a particular role in the game and is
analyzed differently. The opening usually consists of a sequence of prepared and
well-studied moves. During the opening, players try to maneuver themselves into a
position of advantage. The endgame starts when there are relatively few pieces left,
and it becomes safer to involve the king in the game. The middle game falls somewhere between the opening and the endgame, but the boundaries between the stages
are not clear. These three stages can also be identified from the economic analysis in
Figure 4.4. During the opening, the number of pieces decreases only slowly, while
both players build up strategic advantage. The middle game starts when players are
exploiting their strategic advantage to take their opponents’ pieces; it is characterized
by a sharper decline of material. During the endgame, the material stabilizes again
as the players focus on their final attempts to push the strategic advantage to a win.
From Mechanics to Shapes
To produce a particular economic shape, you need to know what type of mechanical structures create what shapes. Fortunately, there is a direct relationship between
shapes in a game’s economy and the structure of its mechanics. In the next sections,
we discuss and illustrate the most important building blocks of economic shapes.
neGaTive FeedBacK creaTes an eqUiLiBriUm
Negative feedback (as discussed in Chapter 3, “Complex Systems and the Structure of
Emergence”) is used to create stability in dynamic systems. Negative feedback makes
a system resistant to changes: The temperature of your refrigerator is kept constant
NOT E This analysis
of chess is a highlevel abstraction to
illustrate an economic
principle using a
familiar game. classic
texts on the theory
of chess do not treat
it in economic terms,
because chess is about
checkmating the king,
not taking the most
pieces. however, our
illustration shows that
gameplay and game
progress can be understood in economic
terms even if the game
itself is not about
economy.

-- 80 of 443 --

66 Game mechanics: advanced Game desiGn
even if the temperature outside the refrigerator changes. The point at which
the system stabilizes is called the equilibrium. Figure 4.5 displays the effects of
negative feedback.
The simplest shape of the equilibrium is a straight horizontal line, but some systems
might have different equilibriums. An equilibrium might change steadily over time
or be periodical (Figure 4.6). Changing equilibriums requires a dynamic factor that
changes more or less independently of the negative feedback mechanism. The outside temperature throughout the year is an example of a periodical equilibrium that
is caused by the periodic waxing and waning of the available hours of daylight and
the relative strength of the sun.
POsiTive FeedBacK creaTes an arms race
Positive feedback creates an exponential curve (Figure 4.7). Collecting interest on
your savings account is a classic example of such a curve. If the interest is the only
source of money going into your savings account, the money will spiral upward,
gaining speed as the accumulated sum creates more and more interest over time.
In games, this type of positive feedback is often used to create an arms race between
multiple players. A good example is the harvesting of raw materials in StarCraft (or
similar constructions in many other RTS games). In StarCraft, you can spend 50
FIGURe 4.5
The effect of negative
feedback
FIGURe 4.6
negative feedback on
changing equilibriums.
On the left, a rising
equilibrium; on the
right, a periodically
changing equilibrium.

-- 81 of 443 --

inTernaL ecOnOmY 67

---

## Sección 64: ChAptEr 4

minerals to build a mining unit (called an SCV, for Space Construction Vehicle) that
can be used to collect new minerals. If StarCraft players set aside a certain portion
of their mineral income to build new SCVs, they get the same curve as money in a
savings account.
Obviously, StarCraft players do not spend their resources only on SCV units. They
also need to spend resources to build military units, to expand their bases, and to
develop new technology. However, the economic growth potential of a base in
StarCraft is vital in the long run. Many players build up their defenses first and
harvest many resources before pushing to destroy their enemy with a superior
capacity to produce military units.
deadlocks and mutual dependencies
Positive feedback mechanisms can create deadlocks and mutual dependencies. in StarCraft,
to get minerals, you need scv units, and to get scv units, you need minerals. These
two resources are mutually dependent, and this dependency can lead to a deadlock
situation: if you are left without minerals and scv units, you can never get production
started. in fact, you need enough minerals and at least one scv unit to be able to build
a headquarters, a third resource that enables this feedback loop. This deadlock situation
is a potential threat. an enemy player might destroy all your scv units. if this happens
when you have spent all your minerals on military units, you are in trouble. it can also
be used as a basis for level design. Perhaps you start a mission with military units, some
minerals, but no scv units or headquarters. in this case, you must find and rescue scv
units. deadlocks and mutual dependencies are characteristics of particular structures
in mechanics.
FIGURe 4.7
Positive feedback
creates exponential
curves.

-- 82 of 443 --

68 Game mechanics: advanced Game desiGn
One of the most useful applications of positive feedback in games is that it can be
used to make players win quickly once a critical difference is created. As should
become clear from Figure 4.7, positive feedback works to amplify small differences:
The difference between the balances of two bank accounts with equal interest rates
but different initial deposits will only grow over time. This effect of positive feedback can be used to drive a game toward a conclusion after the critical difference
has been made. After all, nobody likes to keep playing for long once it has become
clear who will win the game.
positiVe Feedback on destructiVe mechanisms
Positive feedback does not always work to make a player win; it can also make a player
lose. For example, losing pieces in a game of chess weakens your position and increases
the chance that you will lose more pieces; this is the result of a positive feedback loop.
Positive feedback can be applied to a destructive mechanism (as is the case with losing
material in chess). in this case, it is sometimes called a downward spiral. it is important
to understand that positive feedback on a destructive mechanism is not the same as negative feedback—negative feedback tends to damp out effects and produce equilibrium.
You can also have negative feedback attached to a destructive mechanism. The shooter
game Half-Life starts spawning more health packs when a player is low on hit points.
LOnG-Term invesTmenTs vs. shOrT-Term Gains
If StarCraft were a race to collect as many minerals as possible without any other
considerations, would the best strategy be to build a new SCV unit every time
you’ve collected enough minerals? No, not exactly. If you keep spending all your
income on new SCVs, you would never save any minerals, which is what you need
to win the game. To collect minerals, at some point you need to stop producing
SCVs and start stockpiling. The best moment to do this depends on the goals and
the constraints of the game—and what the other players do. If the goal is to accumulate the biggest pile of minerals in a limited amount of time or to accumulate a
specific number of minerals as quickly as possible, there is an ideal number of SCV
units you should produce.
To understand this effect, look at Figure 4.8. It shows that as long as you’re investing in new SCVs, your minerals do not accumulate. However, as soon as you stop
investing, the minerals increase at a steady pace. This pace depends on the number
of SCV units you have. The more you have, the faster your minerals will increase.
The longer you keep investing, the later you will start accumulating minerals, but
you will eventually catch up and overtake anybody who started accumulating before
you did. Depending on the target goal, one of those lines is the most effective.

-- 83 of 443 --

inTernaL ecOnOmY 69

---

## Sección 65: ChAptEr 4

It is a good thing StarCraft is about more than just collecting minerals. Spending
all your minerals on SCV units is a poor strategy because eventually you will be
attacked. You have to balance your long-term goals with short-term requirements
such as the protection of your base. In addition, some players favor a tactic in which
they build up an offensive force quickly in a gambit to overwhelm their opponent
before they can build up their defenses—the “tank rush,” which was first made
famous in Command & Conquer: Red Alert. On some maps, initial access to resources
is limited, and you must move around the map quickly to consolidate your access
to future resources. Investing in SCV units is a good strategy in the long run, but it
requires you take some risk in the beginning, possibly giving up on quick military
gains via the tank rush.
Variation From player perFormance
and resource distribution
in StarCraft, it is not only the number of scv units that determines the pace at which
you harvest minerals. minerals come from deposits of crystals, which have a particular
location on the map. Finding the best location for your base, and micro-managing your
scv units to harvest minerals from crystals effectively, is a skill in itself. These are good
examples of how player skill and game world terrain can produce input variation that
affects the economic behavior of your game. Of course, the players’ inputs must influence the economy, but it is best if the player’s inputs occur frequently but no one input
has too large an effect.
FIGURe 4.8
a race of accumulation

-- 84 of 443 --

70 Game mechanics: advanced Game desiGn
FeedBacK Based On reLaTive scOres
During Marc LeBlanc’s talk on feedback mechanisms in games at the Game Developers
Conference in 1999, he described two alternate versions of basketball. In “negative
feedback basketball,” for every five points that the leading team is ahead, the trailing team is allowed to field one extra player. In “positive feedback basketball,” this
effect is reversed: The leading team is allowed to field one extra player for every
five points they are ahead. The effects of using the difference between two players
to create a feedback mechanism are slightly different from using absolute values to
feed this mechanism: The effects of the feedback mechanisms affect the difference
between the players, not their absolute resources. This can produce some counterintuitive effects. The economic chart of negative feedback basketball, for example,
shows the lead of the better team settling on a stable distance at which the lack of
the skill of the trailing team is offset by the extra players they can field (Figure 4.9).
dynamic equilibrium
The equilibrium that is created by a negative feedback mechanism that is fed by the difference in resources between two players is a dynamic equilibrium: it is not set to a fixed
value but is dependent on other, changing factors in the game. You will find that most
interesting applications of negative feedback in games are dynamic in this way. making
the equilibrium of a negative feedback loop dynamic by making it dependent on the relative fortune of multiple players, or other factors in the game, is a good way to move away
from a too predictable balance created by a nondynamic equilibrium. With experience,
knowledge, and skill, you will be able to combine several factors to compose dynamic
equilibriums that are periodic, are progressive, or follow another desired shape.
FIGURe 4.9
score graph of
negative feedback
basketball

-- 85 of 443 --

inTernaL ecOnOmY 71

---

## Sección 66: ChAptEr 4

When two teams are playing positive feedback basketball, the differences in skills are
aggravated. When one side is better than the other, this will result in a very one-sided
match. However, when both sides are closely matched, a different pattern emerges:
The game will probably remain close, until one side manages to take a decisive lead
after which the match becomes very one-sided again. In this latter case, a small difference in skill, an extra effort, or sheer luck can become the decisive factor.
In Chapter 6, we explore the gameplay effects of positive and negative feedback on
basketball in more detail.
rubberbandinG is neGatiVe Feedback
on relatiVe position
racing games frequently use negative feedback based on the players’ position in the
field to keep the race tight and exciting. This mechanism is often referred to as rubberbanding, because it seems to players as if the other cars are attached to theirs by a rubber band—they never get too far ahead or too far behind. some games implement rubberbanding by simply slowing leading cars down and speeding trailing cars up. Other games
use more subtle negative feedback mechanics to reach similar effects. in MarioKart,
players are awarded with a random power after picking up a power-up. however, trailing
players have a better chance of picking up a more powerful power-up than leading ones
do. in addition, because most weapon power-ups in MarioKart are used on opponents in
front of the player, the leader of the field is a target more often than the player in the last
position. This causes the lead to change hands frequently and increases the excitement
of the game, increasing the likelihood of a last-minute surge past the leader.
uses for Internal Economies in Games
In the previous sections, we discussed the elements and common structures of
internal game economies. In this section, we will discuss how game economies are
typically used in games of different genres. Table 1.1 provided a quick overview of
some mechanics that are typically part of that economy. Now, we will discuss the
typical economic structures found across game genres in more detail.
Use an Internal economy to Complement Physics
Obviously, physics make up the largest part of action games’ core mechanics. Physics
are used to test the player’s dexterity, timing, and accuracy. Still, most action games
add an internal economy to create an integral reward system or to establish a system
of power-ups that requires resources. In a way, the simple use of a scoring system
adds economic mechanics to many action games. If you collect points for taking out
enemies, players will have to consider how much they will invest to take out that

-- 86 of 443 --

72 Game mechanics: advanced Game desiGn
enemy. Will they put their avatars at risk, or will they waste ammunition or some
sort of energy that cannot easily be regained?
Super Mario Brothers and many other similar platform games use a simple economy
to create a reward system. In Super Mario Brothers, you can collect coins to gain extra
lives. Because you need to collect quite a few coins, the designer can place them
liberally throughout a level and add or remove them during play-testing without
affecting the economy significantly. In this way, coins can be used to guide a player
through a level. (Collectible objects that are used to guide players are often called
breadcrumbs.) It is safe to assume that you are able to reach all coins, so if you spot a
coin, there must be a way to reach it. This creates the opportunity to reward skillful
players for reaching difficult places in the game. Used in this way, the internal economy
of the game can be very simple. However, even a simple economy like this already
involves a feedback loop. If players go out of their way to collect many coins, they
will gain more lives, thus allowing them to take more risks to collect more coins.
When setting up a system like this, you must be careful to balance the risks and
rewards. If you lure players into deadly traps with just a single coin, you are inviting them to risk a life to gain a single coin. That simply isn’t fair, and the player will
probably feel cheated. As a designer, you have a responsibility to match the risks
and rewards, especially when they are placed close to the path novice players will
take. (Creating a reward that the player can see but never reach is even worse—it
causes players to take risks for rewards they can never obtain.)
Power-ups, including weapons and ammunition in first-person shooters, create a
similar economy. Power-ups and ammo can be rewards in themselves, challenging
the player to try to eliminate all enemies in a level. As a game designer, you have to
make sure that the balance is right. In some games, it is perfectly all right if killing
enemies will, on average, cost more bullets than the players can loot from their
remains. However, if this leads to a situation in which the player is eventually short
on the proper ammo for the big confrontation with a boss character, you risk penalizing players for making an effort in the game. In survival-oriented first-person
shooters, creating a scarce economy of weapons and ammo is generally a good thing
because it adds to the tension and the drama, but it is a difficult balance to create.
If your shooter is more action-oriented, then it is probably best to make sure there
is plenty of ammo for the player, and you should make sure that taking out extra
enemies is properly rewarded.
Use an Internal economy to Influence Progression
The internal economy of a game can also be used to influence progression through
a game that involves movement. For example, power-ups and unique weapons can
play a special role in an action game’s economy. They can be used to gain access
to new locations. A double-jump ability in a platform game will allow the player
to reach higher platforms that were initially unreachable. In economic terms, you
can think of these abilities as new resources to produce the abstract resource access.

---

## Sección 67: ChAptEr 4

-- 87 of 443 --

inTernaL ecOnOmY 73
Access can be used to gain more rewards or can be required to progress through
the game.
In both cases, as a designer, you should be wary of a deadlock situation. For example,
you might have a special enemy guard the exit of a level. Somewhere in the same
level there is a unique weapon that is required to kill that enemy with a single shot.
The weapon is usable throughout the level. When the player finds the weapon, it is
loaded with ten bullets, and there are no more until the next level—but the player
doesn’t know this the first time playing. Now, a first-time player finds the weapon,
fires a couple of shots to experiment with it, uses it on a couple of other enemies,
and finds himself at the exit with one bullet left. The player fires and misses. You
have just created a deadlock situation. The player needs access to the next level to
gain bullets but needs bullets to gain access.
deadlock resolution in Zelda
in many Zelda games, players frequently must use consumable items—arrows or
bombs—to gain access to new areas. This creates a risk of deadlocks, if the player runs
out of the items needed. The designers of Zelda games prevent these no-win situations
by making sure there are plenty of renewable sources for the required resources.
dungeons are littered with useful pots that yield these resources if the player destroys
them (Figure 4.10). Broken pots are mysteriously restored as the player moves from room
to room, creating a source that is replenished from time to time. Because the pots can
contain anything, as a designer you can use a mechanism like this to provide the player
with any resource required. You can even use it as a way of providing gameplay hints:
if players are finding a lot of arrows, they are probably going to need a bow soon.
FIGURe 4.10 Pottery is a useful source in Zelda games.

-- 88 of 443 --

74 Game mechanics: advanced Game desiGn
Use an Internal economy to Add Strategic Gameplay
It is surprising how many of the strategic challenges in real-time strategy games are
economic in nature. In a typical game of StarCraft, you probably spend more time
managing the economy than fighting the battle. Including an internal economy is
a good way to introduce a strategic dimension to a game that operates on a larger
time span than most physical and/or tactical action.
One of the reasons that most real-time strategy games have elaborate internal
economies is that these economies allow the games to reward planning and longterm investments. A game about military conflict with little forward planning and
no long-term investments would be a game of tactics rather than strategy, because
it would probably be more about maneuvering units on the battle field. To sustain
a level of strategic interaction, a game’s internal economy needs to be more complicated than the internal economies that simply complement the physics of an action
game. Economies in strategy games usually involve multiple resources and involve
many feedback loops and interrelationships. Setting up an economy like that for
the first time is challenging, and finding the right balance is even more difficult.
As a designer, you need to understand the elements of the economy and develop a
keen sense to judge its dynamic effects. Even if you have years of experience, it is
easy to make mistakes: There have been many tweaks to the economy of games like
StarCraft to retain the right balance after players developed new strategies, even after
the game had been long published!
Even without a focus on the economics of production (such as StarCraft’s minerals
and SCV units), internal economies can add strategic depth to almost any game. In
most cases, this involves planning to use the available resources wisely. As already
discussed, the economy of chess can be understood in terms of material (playing
pieces) and strategic advantage. Chess is not about production, and gaining a piece
in chess is unusual. Rather, the game is about using and sometimes sacrificing your
material in order to produce as much strategic advantage as possible. In other words,
chess is all about getting the most mileage out of your pieces.
You can find something similar in the game Prince of Persia: The Sands of Time. In
this action-adventure game, the player progresses through many levels filled with
dexterity and combat challenges. Early in the game, the player is awarded a magical
dagger that allows that player to control time. If anything goes wrong, the player
can use sand from the dagger to rewind time and to try again. This power can also
be used during combat, for example just after the player has taken a big hit. In addition, the player can use sand as a magical power to freeze time. This helps when
battling multiple enemies. The sand is not limitless, however. The player can rewind
time only so often, but fortunately, defeating enemies provides the player with new
sand. This means that, in additional to the usual action-oriented gameplay, the
player has to manage a vital resource. The player must decide when is the best time
to invest some sand. Different players will have different ideas about when they
should use their sand. Some will use it more often to help out with combat, while

-- 89 of 443 --

inTernaL ecOnOmY 75

---

## Sección 68: ChAptEr 4

others will prefer to save it for challenging jumping puzzles. In this way, the sand is
a versatile resource: Players are able to use it to boost their performance where they
need it most.
Use an Internal economy to Create large Probability Spaces
As internal economies grow more complex, the probability space of your game
expands quickly. Games with a large probability space tend to offer more replay
value, because players will have more options to explore than is generally achievable with a single play-through. Another benefit is that these games can also create
a more personal experience, because the performance of players and their choices
directly affect what parts of the probability space open up for exploration.
Games that use an internal economy to govern character development, technology,
growth, or vehicle upgrades often use an internal currency to provide options to
the player. This is a typical gameplay feature found in role-playing games, in which
players spend in-game money to outfit their characters and spend experience points
to develop skills and abilities. It is also found in certain racing games that allow
players to tune or upgrade their vehicles between (or sometimes even during) races.
As long as there are enough options and the options present really different solutions
to problems encountered in the game, or are otherwise important to the player, this
is a good strategy.
When using an internal economy to customize the gameplay, there are three things
you need to watch out for. First, in an online role-playing game, if a particular
combination of items and skills is more efficient than others, players will quickly
identify and share this information, and the economy will be thrown off-balance.
Either players will choose only that option, effectively reducing the probability
space and creating a monotonous experience, or they will complain that they cannot keep up with players who did. In games like this, it is important to understand
that customization features are best balanced by some sort of negative feedback.
Role-playing games usually implement many negative feedback mechanisms for
this reason: Every time characters gain a level and improved skills, they need more
experience points to get to the next level. This effectively works to reduce the differences in levels and abilities and requires more investment from a player for each
level earned.
Second, you have to be sure that the probability space is large enough that players do
not end up exploring it entirely in one play session. For example, if in a role-playing
game players have a rating between 1 and 5 for the attributes of strength, dexterity,
and wisdom, and the player can choose which one to increase from time to time, it
is generally a poor design decision to require them to upgrade all these attributes to
the maximum in order to finish the game. Similarly, if the player has only limited
choice over what order to upgrade her attributes, the consequences of those choices
are reduced. A good way to include choices that have real consequences is to create
choices that exclude each other. For example, players can generally choose only one

-- 90 of 443 --

76 Game mechanics: advanced Game desiGn
class for their character in a role-playing game. Each class should have a unique set
of different skills and abilities. In Deus Ex, the player is also presented with choices
to improve the cyborg character that have gameplay consequences: The player
might be forced to choose between installing a module that will render the character invisible for short periods and a special type of subdermal armor that will make
the character much more resistant to damage.
Third, you should ideally design your levels in such a way that players can use different strategies to complete them. For example, in Deus Ex, the player can choose
to develop a character in different ways. The player can focus on combat, stealth,
or hacking as alternative ways of solving the many challenges in the game. This
means that almost every level has multiple solutions. This is not an easy balance to
strike. If you estimate that the player has managed to upgrade three options before
a certain level, you have to take into account that the player upgraded the combat
abilities three times, stealth three times, hacking three times, or perhaps all of them
once. In Deus Ex, this problem is even more pronounced because all the sources of
experience points that you require to upgrade are not renewable: You gain them for
progressing and performing certain side quests. Going back to a previous area to
harvest some more experience is not an option.
This example illustrates that the levels in games that permit customization must
be more flexible, and more general, than in conventional action games, because
you don’t know exactly what abilities the player’s avatar will have. Deus Ex Human
Revolution contained a flaw: It allowed the players different ways to play the game
but only one way to beat the boss characters, which defeated the point of allowing
the players to customize their avatars.
Tips for economy Construction Games
Games in which the player builds an economy, such as construction and management simulations, tend to have large and complex internal economies. SimCity is a
good example. As players zone areas and build infrastructure, they use these building blocks to craft an economic structure that produces the resources they need to
increase it even further. Building a game like this requires the designer to assemble a
toolbox of mechanics that the player can combine in many interesting ways. This is
even harder than designing a complete, functional, and balanced economy yourself. You have to be aware of all the different ways your economic building blocks
combine. When successful, playing the game can be very rewarding, because the
economy the players build up through play directly reflects their choices and strategies. This is why no two cities in SimCity are alike.

---

## Sección 69: ChAptEr 4

-- 91 of 443 --

inTernaL ecOnOmY 77
If you are designing an economy construction game, there are three strategies that
can help you keep the complexity of your task under control:
n Don’t introduce all the player’s building blocks at once. Construction and
management simulations typically allow the player to build something—a farm,
factory, or city, for example—out of elementary units, building blocks, that play a
role in the economy. (In SimCity, these are zoned land and specialized buildings.) It
is a good idea to gently introduce players to the different elements in your game, a
few at a time. This makes it easier to control the probability space, at least initially.
By allowing certain building blocks and disallowing others, you can craft scenarios
and create special challenges. If your game has no distinct levels or special scenarios,
make sure that not all building options are available from the start. Have players
accumulate resources before they can use the more advanced building blocks that
unlock new options. Civilization is an excellent example of an economy construction game in which most of the building blocks are locked at the beginning of the
game and must be unlocked one by one before the players can use them.
n Be aware of the meta-economic structure. In an ideal economy construction
game, the number of ways of putting the economic building blocks together is endless. However, in most such games, certain approaches are better than others (and
in games with a victory condition, some approaches are unwinnable). As a designer,
you should be aware of typical constructions that might be called meta-economic
structures. For example, in SimCity, a particular mix of industrial, residential, and
commercial zones will prove to be very effective. Players will probably discover
these structures quickly and follow them closely. One difficult, but effective, way of
dealing with patterns that could become too dominant is to make sure that patterns
that are effective early in the game cease to be effective later. For example, a particular layout of zones might be an effective way to grow your population initially but
causes a lot of pollution in the long run. Slow-working, destructive positive feedback
is a good mechanism to create this sort of effect.
n Use maps to produce variety and constrain the possibility space. SimCity and
Civilization wouldn’t be nearly as much fun if you could build your city or empire
on an ideal piece of land. Part of the challenge of these games is to deal with the
limitations of the virtual environment’s initial state. As a designer, you can use the
design of the map to constrain players or to present opportunities. So, although
there might be a best way of building the economy (something that we might call
a dominant meta-economic structure), it is simply not possible to do so in particular
terrain. This forces players to improvise, and rewards players who are more flexible
and versatile. In SimCity, the disaster scenarios in which players can unleash several
natural disasters on their cities challenges their improvisation and flexibility in a
similar vein; and of course, SimCity also generates disasters at random, setting back
the player’s progress.

-- 92 of 443 --

78 Game mechanics: advanced Game desiGn
Summary
In this chapter, we introduced the essential elements of an internal economy:
resources, entities, and some of the mechanics that manipulate them, including
sources, drains, converters, and traders. We examined the concept of economic
shapes as seen through graphs and showed how different mechanical structures can
produce different shapes. Negative feedback creates equilibrium, while positive feedback creates an arms race among opponents. Implemented another way, positive
feedback can produce a downward spiral, because a player finds it harder and harder
to grow his economy. Feedback systems based on relationships between two players
can produce effects that keep games close or tend to cause the player in the lead to
stay in the lead.
Game designers can use internal economics in many ways to make games interesting,
enriching both the progression of a game and the strategic choices a player has to
make. The internal economy also affects the competitive landscape between diverse
or closely matched players in multiplayer games. The chapter ended with specific
suggestions about how to build games in which players construct an economy, as
in SimCity.
Exercises
1. Identify the resources and economic functions in a published game. (Your
instructor may specify particular games to study.)
2. Find an example of a game (not referred to in this chapter) that exhibits one of
these properties: negative feedback with periodic equilibrium, a downward spiral,
a short-term versus long-term investment trade-off, feedback based on players’
relative scores, or rubberbanding. Explain which resources are involved, and show
how the game’s mechanics produce the effect you discovered.
3. Find an example of a game (other than a Zelda game) in which a deadlock may
occur. Does the game provide a means of breaking the deadlock? Explain.

-- 93 of 443 --

---

## Sección 70: ChAptEr 5

Machinations
In the previous chapter, we showed how a game’s internal economy is one important aspect of its mechanics. We used diagrams to visualize economic structures
and their effects. In this chapter, we introduce the Machinations framework, or
visual language, to formalize this perspective on game mechanics. Machinations
was devised by Joris Dormans to help designers and students of game design create,
document, simulate, and test the internal economy of a game. At the core of this
framework are Machinations diagrams, a way of representing the internal economy
of a game visually. The advantage of Machinations diagrams is that they have a
clearly defined syntax. This lets you use Machinations diagrams to record and communicate designs in a clear and consistent way.
We will be using Machinations diagrams throughout this book, so it is important
that you learn how to read them. This chapter will take you through most of the
elements that make up a Machinations diagram. However, a word of caution: The
Machinations framework is a lot to take in at once. The framework comprises many
interrelated concepts that are best understood together. This means there is no real
natural starting point to explain all these concepts. We have tried to introduce the
elements of a Machinations diagram in a logical order, but don’t be surprised if you
find yourself referring to earlier concepts on occasion.
Machinations is more than just a visual language for creating diagrams, however.
Dormans has built an online tool for drawing the diagrams and simulating them
in real time. With it, you can construct and save Machinations diagrams easily, and
you can also study the behavior of your internal economy. You can find the tool at
www.jorisdormans.nl/machinations.
Appendix C (which you can find online at www.peachpit.com/gamemechanics) includes
a tutorial on how to use the Machinations Tool. You can find a quick reference
guide to the most important elements of Machinations diagrams in Appendix A.
The Machinations Framework
Game mechanics and their structural features are not immediately visible in most
games. Some mechanics might be apparent to the player, but many are hidden
within the game code. We need a way to describe and discuss them.
Unfortunately, the models that are sometimes used to represent game mechanics,
such as program code, finite state diagrams, or Petri nets, are complex and not
really accessible for designers. Moreover, they are ill-suited to represent games at a

---

## Sección 71: ChAptEr 5

-- 94 of 443 --

80 Game mechanics: advanced Game desiGn
sufficient level of abstraction, in which structural features such as feedback loops
are immediately apparent. Machinations diagrams are designed to represent game
mechanics in a way that is accessible yet retains the structural features and dynamic
behavior of the games they represent.
The theoretical vision that drives the Machinations framework is that gameplay is
ultimately determined by the flow of tangible, intangible, and abstract resources
through the game system. Machinations diagrams represent these flows, and they
let you see and study the feedback structures that might exist within the game
system. These feedback structures determine much of the dynamic behavior of
game economies. By using Machinations diagrams, a designer can observe game
systems that would normally be invisible. Figure 5.1 provides an overview of the
Machinations framework and its most important components.
The Machinations Tool
You can draw Machinations diagrams on paper or with a computerized drawing tool.
At the same time, the syntax of the language is exact. It describes unambiguously how
different elements of an internal economy interact. The syntax of the Machinations
language is formal enough to be interpreted and executed on a computer; it is close
to a visual programming language designed to represent game mechanics.
FIGURe 5.1
The machinations
framework

-- 95 of 443 --

machinaT iOns 81

---

## Sección 72: ChAptEr 5

Digital Machinations diagrams are dynamic and interactive representations of game
mechanics. Unfortunately, we can’t show their dynamic and interactive nature in the
static illustrations printed in this book. However, Dormans has created a free, online
application named the Machinations Tool. The tool lets you draw Machinations
diagrams, simulate their operation in real time, and interact with them. On the
Machinations website, you can find interactive versions of many of the examples
that we discuss in this and later chapters. To a certain extent, the digital versions
of Machinations diagrams are playable. Some diagrams are so much like playing an
actual game that experimenting with them is fun and challenging in itself.
How the Machinations Tool Works
A static Machinations diagram, such as the ones printed in this book, can display
only one distribution of resources. However, the Machinations Tool allows you to
load digital versions of the diagrams and see how they change over time.
The Machinations Tool looks similar to an object-oriented 2D drawing application
such as Microsoft Visio. It has a workspace in the middle and a variety of selectable
tools in a side panel. You can create diagrams in the workspace or load them from
a file.
When you tell the tool to run, it performs the events that are specified by the diagram in a series of time steps or iterations (we use the terms interchangeably). The
tool changes the state of the diagram. When it has completed one iteration, the tool
then executes another with the diagram in its new state, and so on, repeatedly until
you tell it to stop. (You can also build a feature into the diagram that will cause iteration to stop automatically when certain conditions are met—like when the clock
runs out in basketball.) You can control the length of each time step by setting an
interval value; if you want the tool to run slowly, you can set the interval to several
seconds per time step.
Scope and level of Detail
In earlier chapters, we discussed the notion of abstraction: the process of simplifying
or eliminating details of a system to make it less complex and easier to study and
tune. For example, the computers that ran the early versions of SimCity did not have
enough CPU power to represent each automobile individually. Instead, the game
simply computed traffic density in a general way along each stretch of road and displayed an animation that showed how dense it was.
Machinations diagrams permit you to abstract as much or as little as you like. You can
use them to focus on all, or only part, of a game’s mechanics. Using Machinations
diagrams, you can design and test your game’s mechanics at different levels of
detail. How you use them depends on what you want to achieve. For example, it’s
often sufficient to model a game from the perspective of a single player, even if the
NOT E You can find
the machinations Tool,
and many resources
for using it, at www.
jorisdormans.nl/
machinations.
NOT E appendix a
contains a tutorial
explaining how to use
the machinations Tool.

-- 96 of 443 --

82 Game mechanics: advanced Game desiGn
game is actually played by multiple players. Once you’ve done that, it’s fairly easy to
imagine how a diagram might be duplicated and the duplicates combined to represent the multiplayer situation.
In other cases, it’s useful to model the mechanics for one player at a higher level of
detail than other players. Or you can leave out certain aspects of the game, such as
players taking turns. At a high level of abstraction, there is often little difference in
the effects of real-time play and turn-based play.
For the examples in this book, we have tried to keep the level of detail low and the
level of abstraction high so the diagrams don’t get too complex. This way, you can
easily see the structural features of the internal economy, which will help you to
understand how these structures create emergent gameplay. For this reason, the
natural scope of a Machinations diagram is that of a single player and that player’s
individual perspective on the game system. Although it is certainly possible to
model multiplayer systems and turn-based play, the framework, as it currently
stands, does not include features designed to support multiplayer games in particular. For example, the main input device for interaction with a Machinations diagram
is the mouse; there is no support for multiple players using multiple input devices.
The tool has no means of enforcing whose turn it is to interact or to prevent one
player from clicking a part of the diagram that belongs to another player. It’s a simulation tool, not a tool for building playable games.
Finally, a word of caution: We have used Machinations diagrams to model a number
of real games, but as we said, we have intentionally simplified them in this book.
The Machinations framework and diagrams only facilitate understanding of games;
they aren’t a substitute for studying the game itself.
Machinations Diagram Basic Elements
The Machinations framework is designed to model activity, interaction, and communication between the parts of a game’s internal economy. As shown in the
previous chapter, a game’s economic system is dominated by the flow of resources.
To model a game’s internal economy, Machinations diagrams use several types of
nodes that pull, push, gather, and distribute resources. Resource connections determine
how resources move between elements, and state connections determine how the
current distribution of resources modifies other elements in the diagram. Together,
these elements form the essential core of Machinations diagrams. Let’s take a look
at these basic elements.

-- 97 of 443 --

machinaT iOns 83

---

## Sección 73: ChAptEr 5

Pools and Resources
The most basic node type in a Machinations diagram is the pool. A pool is a location
in the diagram where resources gather. Pools are represented as open circles, while
the resources that are stored in a pool are represented as smaller, colored circles that
stack on them (Figure 5.2). If there are too many resources in a pool to show them
as stacks, the tool displays a number instead.
   

  
 

Pools are used to model entities. For example, if you have a resource called money
and an entity called the player’s bank account, you would use a pool to model the
bank account. Note, however, that pools cannot store fractional values, only integers.
The bank account would have to contain only whole dollars or to be characterized
in terms of cents rather than dollars.
Machinations uses different colors to distinguish among different types of resources.
A pool can contain resources of more than one type, which means that it can
be used to model compound entities. However, until you are familiar with the
Machinations framework, it is best not to mix different resources in a single pool.
It is easier to have separate pools to, for instance, represent the health, energy, and
ammunition of a single player, than it is to have one pool with different colored
resources to represent all of them.
Resource Connections
Individual resources can move from node to node through a Machinations diagram
along resource connections that are represented as solid arrows connecting the nodes
of the diagram (Figure 5.3).
Resource connections can transfer resources at different rates. A label beside the
resource connection indicates how many resources can move along the connection
in a single time step. If a resource connection has no label, its rate is considered
to be 1. You can also make a resource connection transfer an unlimited number of
resources in a single time step by using the word all as the resource connection’s label.
To help you see how an internal economy works, the Machinations Tool shows
the resource flow by animating the movement of the resources along the resource
connections. When the tool runs, you will see the resources traveling along the connection lines from one node to another.
T IP You can change
the threshold at which
the tool switches from
displaying stacks to
displaying numbers in
a pool. With the pool
highlighted, enter a
value in the display
Limit box at the side
panel. The default is
25. if you enter a value
of zero, the pool will
always display a number, unless it is empty.
You can set a different
value for each pool you
create.
FIGURe 5.3
resource connections
FIGURe 5.2
Pools and resources

-- 98 of 443 --

84 Game mechanics: advanced Game desiGn
inputs, outputs, sources, and tarGets
any connection leading into a node is called an input to that node, while any connection
leaving a node is called an output of that node. similarly, the origin of a connection is the
node where the connection starts, and its target is the node where it ends (Figure 5.4).

  
 
FIGURe 5.4 inputs, outputs, origins, and targets
random FloW rates
as we have explained, games frequently use random number generators to create uncertainty. To model these kinds of games accurately, you can specify random flow rates in
machinations diagrams by entering them in the Label box. random rates are represented
in different ways. if you simply enter d, a die symbol ( ) will appear beside the resource connection to indicate an unspecified random factor. it means that the rate varies
somewhat, but you don’t want to specify the details precisely. (if you actually simulate
the diagram in the machinations Tool, it will use the default value given in the dice box
in the side panel.)
The machinations Tool can generate random numbers using the same dice notation that
is commonly used in pen-and-paper role-playing games. in these games, d6 stands for a
random number produced by a roll of one 6-sided die, whereas d6+3 adds 3 to the same
dice roll, and 2d6 adds the results of two 6-sided dice and thus will produce a number
between 2 and 12. Other types of dice can be used as well: 2d4+d8+d12 indicates the
result of two 4-sided dice added with the results of an 8- and 12-sided die. Unlike penand-paper role-playing games, the machinations Tool is not restricted to dice that are
commercially available. For example, it can use 5-, 7- or 35-sided dice.
You can also create random values using percentages. a resource connection labeled
25% indicates that there is a 25% chance that one resource can flow along that connection at each time step. When using percentages, it is possible to use percentages higher
than 100%. For example, 250% indicates a flow rate of at least two plus a 50% chance of
one more.
Figure 5.5 shows various examples of random flow rates.
   
FIGURe 5.5 different notations for random flow rates
T IP if you do not
want to watch the
resources move along
the resource connections, you can run the
machinations Tool in
quick run mode. You
will find this under the
run tab in the side
panel. This will make
the tool run much
faster.
NOT E remember that
a pool is one type of
node. There are seven
other types of nodes,
each of which serves
a specialized purpose.
They are described in
the section “advanced
node Types.”
T IP To enter a fixed
flow rate for a resource
connection in the
machinations Tool,
select the resource connection and then type a
number or the word all
in the Label box in the
side panel.

-- 99 of 443 --

machinaT iOns 85

---

## Sección 74: ChAptEr 5

Activation Modes
In each iteration, the nodes in a Machinations diagram may fire. When a node
fires, it pushes or pulls resources along the connections that are connected to
it (we explain this in the next section). Whether a node fires depends on its
activation mode. A node in a Machinations diagram can be in one of four different
activation modes:
n A node can fire automatically, which means it simply fires every iteration.
All automatic nodes fire simultaneously.
n A node can be interactive, which means it represents a player action and fires in
response to that action. In a digital version of a Machinations diagram, interactive
nodes fire after the user clicks them.
n A node can be a starting action, which means that it fires only once, before the
first iteration. In the Machinations Tool, starting actions fire immediately after the
user clicks the run button.
n A node can be passive, which means it can fire only in response to a trigger generated by another element (we discuss triggers shortly).
Each type of node looks different so you can tell them apart (Figure 5.6). Automatic
nodes are marked with an asterisk (*), interactive nodes have a double outline, starting actions are marked with an s, and a passive node has no special mark.
   

    
Pulling and Pushing Resources
When a pool fires, it will try to pull resources through any inputs connected to it.
The number of resources it pulls is determined by the rate of the individual input
resource connection—the number beside the line. Alternatively, a pool can be set in
push mode. In this mode, when the pool fires, it pushes resources along its output connections. Again, the number of resources pushed is determined by the flow rate of
the output resource connection. A pool in push mode is marked with a p (Figure 5.7).
A pool that has only outputs is always considered to be in push mode, in which case
the p marker is omitted.
FIGURe 5.6
activation modes

-- 100 of 443 --

86 Game mechanics: advanced Game desiGn
If a pool is trying to pull more resources than exist at the far end of its inputs, it will
handle it in one of two ways:
n By default, a node pulls as many resources as it can, up to the flow rates of its
inputs. If not enough resources are available, it still pulls those that are.
n Alternatively, a node can be set to pull all or no resources. In this mode, when
not all resources are available, none are pulled. Nodes that are in all or none pull
mode are marked with an & sign (Figure 5.7).
These rules also apply to pushing nodes: By default, a pushing node sends as many
resources as are available out along its output resource connection up to the output’s
flow rate. A pushing node in all or none mode sends resources only when it can supply all of its outputs. This means that nodes in push mode might be marked with
both a p and an &.
  
     
Figure 5.8 illustrates two situations in which there are not enough resources to
meet the demand. Node A is user-activated (which is why you see the double line).
It wants to pull three resources from its upper input and two from its lower one, but
the pools they are connected to do not contain enough resources to do it. When
clicked, node A will simply pull the resources that are available.
When node B is clicked, it tries to pull a random number, from one to six, of
resources from its input. If the random number is four, five, or six, it will pull the
three that are available.


 
 
FIGURe 5.7
Pull and push modes
FIGURe 5.8
Two examples showing
fewer resources than
requested

-- 101 of 443 --

machinaT iOns 87

---

## Sección 75: ChAptEr 5

hourGlass example
Using pools and resource connections, we can construct a simple hourglass (Figure 5.9).
in this case, two pools are connected by a single resource connection. The top pool (a)
is passive and contains five resources, while the bottom pool (B) is automatic and starts
without any resources. after each iteration, B will pull one resource from a until all
resources have moved from a to B. after that, there are no further changes to the state of
this diagram.


 





   
 
   
  

Time Modes
Games can handle time in different ways. Board games are often turn-based, while
in many video games the game is active even if the player doesn’t do anything. To
represent different types of games, a Machinations diagram can operate in one of
three different time modes:
n In synchronous time mode, all automatic nodes fire at a regular interval that you
can specify for the whole system. All interactive nodes that you click fire at the next
time step, at the same time when automatic nodes fire. In this mode, all actions in
one time step take place simultaneously. It is possible for a user to activate several
different interactive nodes during a time step, but each interactive node can be activated only once in a time step.
n In asynchronous time mode, automatic nodes in the diagram are still activated at
regular intervals of arbitrary length specified by the user. However, players can activate interactive nodes at any time within the intervals, and the resulting actions are
executed immediately, without waiting for the next time step. In this case, an interactive node can be activated multiple times during a time step. This is the default
setting of the Machinations Tool.
T IP You can set the
time mode of a diagram
in the machinations
Tool by using the Time
mode pull-down menu
visible in the side panel
when no element of the
diagram is selected. in
either synchronous or
asynchronous mode,
you can set the length
of the interval in the
interval box, in units of
a second. The interval
box also accepts fractional values, so 2.5
means each time step
lasts 2.5 seconds.
FIGURe 5.9
hour glass example

-- 102 of 443 --

88 Game mechanics: advanced Game desiGn
n Alternatively, a Machinations diagram can be in turn-based mode. In this mode,
time steps do not occur at regular intervals. Instead, a new time step occurs after the
player has executed a specified number of actions. This is implemented by assigning
a number of action points to each interactive node and allotting players a fixed budget of action points each turn. After all the action points are used, all the automatic
nodes fire, and a new turn starts.
resolVinG pullinG conFlicts
it might happen that two pools try to pull resources from the same source simultaneously. When there are not enough resources to serve both pools, this will lead to a conflict.
For example, in Figure 5.10 every time step pool B automatically pulls one resource from
a, both c and d attempt to pull one resource from B. This means that after one time step,
B will have one resource and c and d will both try to pull it. how this is resolved depends
on the time mode. in synchronous time mode, neither c nor d can pull the resource. after
two iterations when B has pulled a second resource, both c and d will pull one resource
from B. While the diagram runs, c and d will both pull a resource once every two time
steps simultaneously. as a starts with nine resources, after nine time steps c and d will
have four resources, and one resource will remain on B. The state of the diagram will
then no longer change.
in asynchronous or turn-based mode, either c or d will pull one resource. Which pool
has priority is initially random; subsequently, the priority alternates every time step. This
means that c and d will both pull one resource from B on alternating time steps, and
eventually there will be four resources on c and five on d, or vice versa.







FIGURe 5.10 how simultaneous pulls are handled in a
machinations diagram depends on the diagram’s time mode.
T IP if you set the time
mode to turn-based
in the machinations
Tool, the interval box is
replaced by an actions/
Turn box, in which you
can specify the number
of action points permitted in a single turn. To
specify the number of
action points that an
interactive node consumes when clicked,
select the node and
enter a value in the
actions box in the side
panel. You may also
enter a value of zero.
When all interactive
nodes cost no action
points, except a single
interactive node named
“end turn” (that has
no other effect), this
can be used to create
a game where players
can take any number
of actions until they
indicate that they are
finished.

-- 103 of 443 --

machinaT iOns 89

---

## Sección 76: ChAptEr 5

State Changes
The state of a Machinations diagram refers to the current distribution of resources
among its nodes. When the resources move from one place to another, the state
changes. In the Machinations framework, you can use state changes to modify the
flow rates of resource connections. In addition, you can trigger nodes to fire, or activate or deactivate them, in response to changes in resource distribution.
To make this possible, Machinations offers a second class of connections called state
connections. State connections indicate how changes to the current state of a node
(the number of resources in it) affect something else in the diagram. State connections are shown as dotted arrows, leading from the controlling node (called the origin)
and going to a target, which can be either a node, a resource connection, or, rarely,
another state connection. Labels on the state connection indicate how it changes
the target. There are four types of state connections that are characterized by the
type of elements they connect and their labels. The four types are label modifiers,
node modifiers, triggers, and activators. We explain them in each of the following
four sections.
LaBeL mOdiFiers
Remember that a label on a resource connection determines how many resources
may move through that connection in a given time step. Label modifiers connect
an origin node to a target label (L) of a resource connection (or even another state
connection). A label modifier indicates how state changes in the origin node (∆S)
modify the current value of the target label at a current time step (Lt ) as indicated
by the state connection’s own label (M). The new value takes effect in the next time
step (Lt+1 ). The amount of the change in the origin node is multiplied by the label
multiplier’s own label. So, if the label modifier says +3 and the origin node increases
by 2, then the target label will increase by 6 in the next time step (it will add 3
twice, once for each change in the origin node). However, if the label modifier says
+3 and the origin node decreases by 2, then the target label will decrease by 6. Thus,
the new value of label (Lt+1 ) that is the target of a single label modifier is given by
the following formula:
Lt+1 = L t + M × ∆S
If the label is the target of multiple label modifiers, you will have to take the sum of
all the changes to find the new value:
Lt+1 = Lt + ∑ (M × ∆S)
The label of a label modifier always starts with a plus or minus symbol. For example,
in Figure 5.11, every resource added to pool A adds 2 to the value of the resource
flow between pools B and C. Thus, the first time B is activated, one resource flows to
A and three resources flow to C. The second time, one resource still flows to A, but
now five resources flow to C.
T IP it can be confusing to run the
machinations Tool and
watch a label modifier
causing its target to
decrease even though
the label modifier’s
own label is positive.
Think of it this way: a
positive label on the
label modifier causes
its target to follow the
origin node, going up
when the origin goes
up and going down
when it goes down. a
negative label on the
label modifier causes
its target to invert the
origin node, going
down when the origin
goes up, and vice versa.
NOT E This is the
first time we have
used color in a
machinations diagram.
here, it is used only for
visual clarity. however,
the diagrams can also
be color-coded, a
special feature of the
machinations Tool.
We explain colorcoding in more detail
in chapter 6.

-- 104 of 443 --

90 Game mechanics: advanced Game desiGn
Label modifiers are frequently used to model different aspects of game behavior.
For example, a pool might be used to represent a player’s accumulated property in a
game of Monopoly. The more property a player has, the more likely it is that player
will collect money from other players. This can be represented by the diagram in
Figure 5.12. Note that in this case the exact value of the label modifier is unspecified; it indicates only that the effect on the random flow rate is positive. Also note
that many mechanics of Monopoly are omitted in this diagram—for example, the
diagram does not show how a player acquires property. You will find diagrams that
paint a more complete picture of Monopoly in Chapters 6 and 8.
nOde mOdiFiers
Node modifiers connect two nodes. They enable changes in the state of one node
(its origin) to modify the number of resources in another node (the target node),
according to the node modifier’s label (M). When the origin node changes, it influences the target node in the next time step. More than one origin node can modify
a target node. The formula for this is nearly identical to the formula used for label
modifiers:
Nt+1 = Nt + ∑ (M × ∆S)
node modiFiers can create shortaGes
By using negative node modifiers or redistributing resources from a node that has positive input node modifiers, it becomes possible that the number of resources on a node
becomes negative. in this case, the negative number of resources indicates a shortage.
no resources can be pulled from a node that has a shortage, and resources that flow into
a node with a shortage are used to compensate for the shortage first.
NOT E Figure 5.12
is not meant to be
simulated in the
machinations Tool;
it only illustrates the
principle.
NOT E notice that
node modifiers can
create and destroy
resources if their target is a pool. This
is all right for an
abstract resource such
as “threat level” but
is best avoided for
tangible and intangible resources such
as “keys” or “health.”
To create and destroy
those kinds of
resources, use other
types of nodes called
sources and drains,
described later in this
chapter.
FIGURe 5.11
a label modifier affecting the flow rate
between two pools. at a given time
step, the flow from B to c is 3 + 2 times
the number of items in a.
FIGURe 5.12
in Monopoly the state of your property positively affects the chance other players’ money
flows to you.

-- 105 of 443 --

machinaT iOns 91

---

## Sección 77: ChAptEr 5

Figure 5.13 illustrates a node with two modifiers. The number of resources in C will
be equal to three times the number in A, minus two times the number in B.
Node modifiers can have labels that are fractions, for example +1/3 or -2/4. In this
case, the number of resources of a target node is modified by the value indicated by
the fraction’s numerator every time there is a change to the number of resources on
the origin divided by the fraction’s denominator and rounded down. Thus, when
the number of resources on an origin node changes from 7 to 8, the number of
resources on the target is lowered by 2 if the modifier is -2/4, but if the modifier is
+1/3, the number of resources on the target node does not change.
This sounds complex, but a simple example of the use of node modifiers can be
found in a real game. In The Settlers of Catan, players gain one point for every village
in their possession and two points for every city in their possession. The number of
villages is one origin node, the number of cities is a second origin node, and both
modify the target node, which is the player’s number of points.
TriGGers
Triggers are state connections that connect two nodes or connect an origin node to
the label of a resource connection. Triggers are identified by their label, which is an
asterisk (*). Triggers do not change numeric values the way label and node modifiers do. Rather, a trigger fires when all the inputs of its origin node become satisfied:
when each input brings in the number of resources to the node as indicated by its
flow rate. A firing trigger will in turn fire its target. When the target is a resource
connection, the resource connection will pull resources as indicated by its flow rate.
A node that has no inputs will fire outgoing triggers whenever it fires (either automatically or in response to a player action or to another trigger).
Triggers are commonly used in games to react to the redistribution of resources. For
example, in Monopoly players might transfer money to the bank in order to trigger
the transfer of property from the bank into their possession. This can be represented
as the diagram in Figure 5.14.
FIGURe 5.13
node modifiers
affect the number of
resources in a pool.
NOT E Triggers are
commonly used to fire
passive nodes that do
nothing until the trigger fires them. This
enables you to set up
a passive node that
fires only when certain
circumstances arise in
the game.

-- 106 of 443 --

92 Game mechanics: advanced Game desiGn
acTivaTOrs
Activators connect two nodes. They activate or inhibit their target node based on the
state of their origin node and a specific condition. The activator’s label specifies this
condition. Conditions are written as an arithmetic expression (for example, ==0, <3,
>=4, or !=2) or a range of values (for example, 3-6). If the state of the origin node
meets this condition, then the target node is activated (it can fire). When the condition is not met, the target node is inhibited (it cannot fire).
Activators are used to model many different game mechanics. For example, in the
board game Caylus, players place their laborers (a resource) at particular buildings on
the board to enable them to execute special actions associated with that building.
For example, a player might place a laborer at a gold mine to collect gold (Figure
5.15). However, as indicated by the trigger in the figure, in Caylus every time a
player mines gold, the laborer then returns to the player’s Workers pool.
FIGURe 5.14
a trigger in Monopoly
enables the acquisition
of property by spending money.
FIGURe 5.15
Caylus

-- 107 of 443 --

machinaT iOns 93

---

## Sección 78: ChAptEr 5

Advanced Node Types
Pools are not the only possible nodes in a Machinations diagram. In this section, we
will describe seven more types of nodes that you can use, including special nodes
for the four economic functions (sources, drains, converters, and traders) discussed
in the previous chapter. However, as you will see, some of these nodes can actually be re-created by using clever constructions of pools, resource connections, and
state connections. Dormans has created these specialized node types to make the
diagrams easier to read. If Machinations diagrams were restricted only to pools, the
diagrams would quickly become cluttered.
Gates
In contrast to a pool, a gate does not collect resources. Instead, it immediately redistributes them. Gates are represented as diamond shapes that often have multiple
outputs (Figure 5.16). Instead of a flow rate, each output is labeled with a probability or a condition. The first type of outputs are referred to as probable outputs while
the others are referred to as conditional outputs. All outputs of a single gate must be
of the same type: When one output is probable, all must be probable, and when one
output is conditional, all must be conditional.
 
 
 



 
 
   
 
  
 
   
  
   
  
   
! !
!! !!
!! !!
! !
"  # 
   $%$$
"  # 
   $%$$



&  '
  
  
  
  
&  '
 
  $%$$
() () * *
FIGURe 5.16
different types of gates
in a machinations
diagram

-- 108 of 443 --

94 Game mechanics: advanced Game desiGn
Probabilities can be represented as percentages (for example, 20%) or weights indicated by single numbers (for example, 1 or 3). In the first case, a resource flowing
into a gate will have a probability equal to the percentage indicated by each output.
The sum of these probabilities should not add up to more than 100%. If the total is
less than 100%, there is a chance that the resource will not be sent along any output
and be destroyed instead. In the case of weights, the chance that a resource will flow
through a particular output is equal to the weight of that output divided by the sum
of the weights of all outputs of the gate. In other words, if there are two outputs,
one with a weight of 1 and the other with a weight of 3, the chance that a resource
will flow out the first one is 1 in 4, and the chance that it will flow out the second
one is 3 in 4.
Gates with probable outputs can be used to represent chances and risks. For example, in Risk players put armies in danger to gain territories. This type of risk can be
represented easily by a gate with probable outputs indicating the rates for success or
failure.
An output is conditional when it is labeled with a condition (such as >3 or ==0 or
3-5). In this case, all conditions are checked every time a resource arrives at the gate,
and one resource is sent along every output whose condition is met. The conditions
might overlap; this can lead to duplication of resources or, when no condition is
met, to the destruction of the resource.
Like pools, gates have four activation modes: Gates can be passive, interactive, or
automatic, or they can be a starting action. Interactive gates have a double outline,
automatic gates are marked with a star, and gates that are activated once before the
diagram starts are marked with an s. When a gate has no inputs, it triggers every
time it fires. This way gates can be used to produce triggers either automatically or
in response to player actions.
Gates have one of two distribution modes: deterministic distribution and random
distribution. A deterministic gate will distribute resources evenly according to the distribution probabilities indicated by percentages or weights if it has probable outputs.
When it has conditional outputs, it will count the number of resources that have
passed through it every time step and will use that number to check the conditions
of its outputs. (It can be convenient to think of a deterministic gate with conditional outputs as a counting gate.) A deterministic gate has no special symbol and is
represented as a small open diamond.
A random gate generates a random value to determine where it will distribute incoming resources. When it has probable outputs, it will generate a suitable number
(either a value between 0% and 100% or a number below the total weights of the
outputs). When its outputs are conditional, it will produce a value between 1 and 6
to check against the conditions, just as if the diagram rolled a normal six-sided die
(later we will show you how this value can be changed to represent other types of
random distribution). Random gates are marked with a die symbol.
T IP When you place a
gate in a machinations
diagram in the tool, you
may set the gate’s type
by clicking one of the
Type icons in the side
panel. The hollow diamond (the default) is a
deterministic gate. The
die symbol converts it
to a random gate.

-- 109 of 443 --

machinaT iOns 95

---

## Sección 79: ChAptEr 5

Gates might have only one output. Gates with one output act the same way as gates
with multiple outputs. The gates on the middle row of Figure 5.16 will (from left to
right) randomly let 30% of all the resources pass, immediately pass the resource to the
output regardless of the output’s flow rate, and let only the first two resources pass.
All output state connections from a gate are triggers; gates do not accumulate
resources, and therefore label modifiers, node modifiers, and activators originating
from a gate serve no purpose. These triggers can also be conditional or probabilistic.
In this way, gates can be used to control the flow of resources (Figure 5.17).
 

 

Sources
Sources are nodes that create resources. They are represented as a triangle pointing
upward (Figure 5.18). Any node in a Machinations diagram can be automatic (the
default), interactive, or passive, or it can activate once before a diagram starts. An
example of an automatic source is the steady regeneration of the protective shields
of the player’s star fighter in Star Wars: X-Wing Alliance. The action to build armies
in Risk would be modeled as an interactive source of armies, and passing Go in
Monopoly would be a passive source of money that is triggered by a game event. The
rate at which a source produces resources is a fundamental property of a source and
is indicated by the flow rates of its outputs.


 
 
 

In many ways, a source acts just as a pool without inputs that starts with a sufficiently large (or even infinite) supply of resources. However, to model limited
sources (see the section “Four Economic Functions” in Chapter 4), it is better to use
a pool with a specified number of resources in it.
Drains
Drains are nodes that consume resources; a resource that goes into a drain disappears permanently. The Machinations framework includes a special drain node
represented as a triangle pointing downward (Figure 5.19). The rate of a drain is
determined by the flow rate of its input resource connection. Some drains consume
FIGURe 5.17
an automatic, random gate controlling
the flow of resources
between two passive
pools. in this case,
there is a 30% chance
that three resources
will flow from a to B
every time step.
FIGURe 5.18
Unlimited and limited
sources

-- 110 of 443 --

96 Game mechanics: advanced Game desiGn
resources at a steady rate, while others consume resources at random rates or intervals. You can also make a drain consume everything its input resource connection is
attached to by labeling the resource connection with all. (A toilet is a good example:
When flushed, it drains all the water in the cistern, no matter how much it is.) You
could in principle represent a drain as a pool with no outputs, but to indicate that
the resources that flow to a drain are consumed and have no further impact on the
game, it is better to use a drain node.
    
Drains are useful for representing processes that remove resources from an economy
permanently. This might include the effect of wear or friction in a physical system
or the consumption of ammunition when a weapon is fired in a shooter game.
Converters
Converters convert one resource into another. They are represented as a triangle
pointing to the right with a vertical line through it (Figure 5.20). Converters are
designed to model things like factories that turn raw materials into finished products. A windmill, for example, turns wheat into flour. Converters act exactly as a
drain that triggers a source, consuming one resource to produce another. As with
sources and drains, converters can have different types
of rates to consume and produce resources as specified by their inputs and outputs.
For example, a converter representing a sawmill might turn one tree into 50 boards
of lumber.

  
Since converters are constructed from drains and sources, it is possible to create a
special construction that might be called a limited converter that can produce only a
limited amount of something as its output. A limited converter is the combination
of a drain and a limited source. Figure 5.21 shows two equivalent alternatives to
construct a limited converter.


 
FIGURe 5.19
drains
FIGURe 5.20
converters
FIGURe 5.21
Two ways to build a
limited converter

-- 111 of 443 --

machinaT iOns 97

---

## Sección 80: ChAptEr 5

Traders
Traders are nodes that cause resources to change ownership when fired: Two players
could use a trader to exchange resources. Machinations diagrams represent a trader
as a vertical line over two triangles that point left and right (Figure 5.22). Use traders when a given number of resources of one type is exchanged for (not converted
into) a given number of another type. This is ideal for any situation that resembles
shopping: the merchant receives money, and the customer receives goods in a stated
proportion (the price). If either the merchant or the customer does not have the
necessary resources, the trade cannot take place. Fallout 3, in which all traders’ supplies are limited, is a good example. A trading mechanism can be constructed by
two gates connected by a trigger ensuring that when one resource is received, the
other is returned in exchange.
conVerters Vs. traders
From the perspective of a player, converters and traders have almost the same function:
Pass a number of resources to it and get a number of other resources in return. From
the designer’s perspective, however, they are definitely not the same. The difference becomes clear from looking at their equivalent constructions in a machinations diagram. a
converter is a combination of a drain and a source. When activating a converter, resources are actually consumed and produced, and therefore the total number of resources in
the game might change. in contrast, activating a trader leads only to an exchange; the
number of resources in the game always stays the same.
end Conditions
Games end when certain conditions are fulfilled. Sometimes they end when a
player reaches a certain goal or when time runs out or when all players but one
are eliminated. Machinations diagrams use end conditions to specify end states. The
Machinations Tool checks the end conditions in a diagram at each time step and
stops running immediately when any end condition is fulfilled. End conditions are
square nodes with a smaller, filled square inside (the same symbol that is used to
indicate the stop button on most audio and video players). End conditions must
be activated by an activator. The activators are used to specify the end state of the
NOT E This is an
example of a colorcoded diagram, which
uses color to represent different kinds of
resources. in Figure
5.22, think of red as
representing money
and blue as representing goods. When
the interactive Trader
icon is clicked, three
money resources are
exchanged for two
goods resources. We
explain color-coded
diagrams in more detail
in chapter 6.
FIGURe 5.22
Traders

-- 112 of 443 --

98 Game mechanics: advanced Game desiGn
game. Figure 5.23 shows a couple of examples. The diagram on the left stops after
the 25 resources are drained automatically. In the example on the right, you win by
growing more than three apples and oranges.
Modeling Pac-Man
Let’s see how you can use Machinations diagrams to simulate the mechanics of a
simple game—the arcade classic Pac-Man. We’ll break down the process of modeling
Pac-Man into six steps and add them to a Machinations diagram, one at a time to
show how they work. First we’ll identify the game’s most important resources, and
then we’ll model the individual mechanisms. We’ll give each major mechanism its
own color for ease of identification. The last of these mechanisms ties everything
together into a full diagram for Pac-Man.
We have to warn you that our model is an approximation, not a literal simulation
of what Pac-Man’s software does. For example, we implemented a system in which
the ghosts come out of the ghost house at a regular rate, one every five time steps.
The real game uses a more complex algorithm to determine when they come out.
We could have modeled it, but it would have made the diagram too complex. Our
goal here is to teach you to use the Machinations framework, not to create an exact
copy of the real game, so we have simplified it a bit.
Resources
We will use the following resources to model Pac-Man:
n Dots. Scattered along the maze are the dots that Pac-Man must eat to complete a
level. Dots are tangible resources in Pac-Man that must all be destroyed to win. The
game starts with a fixed number of dots. Dots are not produced during play (except
when going to the next level).
FIGURe 5.23
end conditions

-- 113 of 443 --

machinaT iOns 99

---

## Sección 81: ChAptEr 5

n Power Pills. Every level starts with four power pills, which Pac-Man can eat to be
able to eat the ghosts. These power pills are a scarce but tangible resource the player
must use wisely. Like dots, they are only consumed, never produced during play.
n Fruits. Occasionally a fruit appears in the maze. Pac-Man can eat the fruit to
score extra points.
n Ghosts. There are four ghosts that chase Pac-Man around the maze. The ghosts
can be in one of two locations: Either they are in the “ghost house” (the area in the
middle of the screen) or they are in the maze giving chase. The ghosts are also a tangible resource. (Notice that resources are not always positive things for the player!)
n Lives. Pac-Man starts the game with three lives. Lives are intangible resources in
Pac-Man. If Pac-Man loses all lives, the game ends.
n Threat. To simulate the effect of the ghosts giving chase, we will model an
abstract resource called threat. When the threat passes a certain threshold, Pac-Man
is caught, and he loses a life. Note that we are not modeling the shape of the maze
itself (which Machinations cannot do), only the flow of resources and states the
game can be in.
n Points. Every time Pac-Man eats a dot, a fruit, or a ghost, he will consume them
and score a number of points. The objective of the game is to score as many points
as possible. Points are intangible resources.
These are all the obvious resources in the Pac-Man economy, and we’ll start our
model by constructing systems around them. Notice that threat is one we made up
for the purposes of the simulation, and our decisions about how to model threat are
subjective and not part of the original game.
Dots
We start with a simple mechanic: Pac-Man eats dots, converting them into points.
It can be represented with two pools and a converter (Figure 5.24). One pool starts
with 50 resources in it representing the dots in the maze. The pool that collects
points starts empty. We also added an end condition that determines that you have
completed a level after eating all the dots. The converter representing the eating
action is an interactive node. You can click it to eat the dots. Notice, however, that
the input of the converter has a random flow rate. Every time you click, there is
only a partial chance that the action succeeds. The more dots there are, the easier
it is to eat them. Initially the chance to eat a dot starts at 100%, but every iteration,
for every dot that is eaten, the chance is lowered by 1%. This reflects the challenge
to the player in moving around the maze and eating every single dot.
NOT E The real game
has exactly 240 dots on
every level. We reduced
this to 50 to make the
game shorter.

-- 114 of 443 --

100 Game mechanics: advanced Game desiGn
In the real game, Pac-Man eats dots 100% of the time until he returns to a place he
has already been, at which point he eats dots 0% of the time. We had to approximate this somehow, so we used a diminishing probability of successfully eating a
dot every time the Eat Dot converter is clicked. In our model, the probability of eating a dot is initially set to 100%, modified by a label modifier that reflects changes
in the Dots pool. If the number of dots in the Dots pool changes between one time
step and the next, that change is multiplied by the label on the state connection,
and the result is applied to the percentage on the resource connection. When a dot
is consumed (say, from 50 dots to 49), the change in the state of the Dots pool is -1.
Multiply that by +1% and you get -1%, and that reduces the probability of successfully eating a dot by 1% on the next time step.
The process of creating these approximations is one of the trickier aspects of modeling a game with Machinations, and you have to think carefully about what your
decisions mean. We chose numbers that feel good to us, but we could have used
others. For example, we could have chosen a rate of change of 0.25% instead of 1%
for successfully eating a dot. This would represent a very skilled player who spends
little time in parts of the maze where he has already been—he’s eating new dots
most of the time.
In some respects, it’s easier to model a new game than an existing one. When you
use Machinations to design a new game, you can set up anything you want. The
tool’s greatest strength is that you can experiment and adjust the details as much
as you like.
The Fruit Mechanism
The fruit mechanism (Figure 5.25) works similarly to the dot mechanism. However,
in contrast to dots, a fruit will appear from time to time and disappear automatically if Pac-Man doesn’t eat it. These extra mechanics are represented by the source
and the drain that are connected to the fruit pool. The fractional rates indicate that
the fruit source produces a fruit once every 20 iterations and is drained once every
5 iterations. This means a fruit will appear once every 20 iterations and disappear 5
iterations later. The interactive node that represents the Eat Fruit action has a fixed
chance of 50% to actually succeed. This approximates the difficulty of catching the
fruit as it moves through the maze. However, eating a fruit will produce 5 points
instead of 1 as eating a dot does.
FIGURe 5.24
eating dots to score
points
T IP don’t be confused
by the fact that the
probability of successfully eating a dot goes
down even though the
state connection that
controls it is labeled
+1%. remember that
the function of the state
connection is to transmit the change in its
origin pool (multiplied
by its label). Because
in this case the change
is always negative,
the state connection
actually transmits a
negative value.
NOT E in the real
game, fruit appears
only twice in a level
and offers an escalating
number of bonus points
depending on which
level it is. We don’t
implement multiple levels of the game, so we
made the fruit process
shorter, simpler, and
more frequent so that it
is easier to observe.

-- 115 of 443 --

machinaT iOns 101

---

## Sección 82: ChAptEr 5

Ghosts Produce Threat
The four ghosts start in the ghost house, and they enter the maze at a fixed rate of
one ghost every five iterations. Each ghost that is in the maze will produce a threat,
which we represent as a black resource generated by an automatic source. Figure 5.26
represents these mechanics. In this diagram, the Maze pool pulls one ghost every
five iterations. Each ghost in the maze increases the output of the source that produces the threat. The player has a chance to lower the threat by clicking the random
interactive Evade gate. When clicked, it has a 50% percent chance of triggering a
drain that drains nine threat resources. (If this fails, the Evade gate does nothing, but
the player may click it again to try again.) We arbitrarily chose this value to indicate
that trying to evade the ghosts doesn’t always work. If you wanted to change the
diagram to represent a more skilled player, you could increase this percentage.
Capture and loss of life
When the number of threat resources in the Threat pool passes 100, Pac-Man is
caught, and the player loses a life (Figure 5.27). In the meantime, the ghosts return
to the ghost house, and the player can start again, unless it was his last life in which
case the game is over. This process is represented by an automatic trigger (the black
dotted line) that is activated when the number of threat resources passes the threshold of 100. It goes to a Reset gate, which passes the trigger on in three directions
FIGURe 5.25
Fruit mechanism
(purple) added to the
diagram
NOT E in the real
game, the algorithm
that determines when
ghosts leave their
house is quite complex.
We made it simpler
for teaching purposes.
also, the ghosts have
limited artificial intelligence that governs how
they move; that doesn’t
appear in our diagram
because we don’t simulate the layout of the
maze.
FIGURe 5.26
Ghosts create threat
but can be evaded.

-- 116 of 443 --

102 Game mechanics: advanced Game desiGn
(the green dotted lines): to a drain that drains a life, to a resource connection that
returns the ghosts from the maze to their house, and to a drain that drains all the
built-up threat.
Power Pills
The last mechanism to be added to the diagram is the mechanism that allows players to eat the ghosts by eating power pills. Figure 5.28 adds this mechanism (light
blue) to the diagram and represents the full game. Power pills start as a limited supply. The player can choose to use them by clicking the Eat Power Pill converter to
convert a power pill into power-up time, an abstract resource that is automatically
drained. While some power-up time remains, the ghosts stop producing threat,
and a drain on the threat is activated. At the same time, a new action to eat a ghost
becomes available. Eating ghosts returns a ghost to the ghost house and also produces five bonus points.
The Complete Diagram
Figure 5.28 represents a playable approximation of Pac-Man. As we have said,
certain mechanisms have been omitted, and the game is different in various details.
It is possible to add these details to a Machinations diagram, but you would be
unlikely to learn anything new from them. However, you can discover a few important things from studying even this simplified diagram. For one thing, players of
Pac-Man must balance their activities among different tasks: eating dots, evading
FIGURe 5.27
reset when caught
NOT E Because we
don’t simulate the
layout of the maze, we
arbitrarily assigned
a value of 100 to the
threat level to determine when the player
is caught by a ghost.
But as in the real game,
the player can evade
(using the interactive
evade gate), which lowers the threat.
T IP note the label
reading >100 on the
state connection to
the reset gate. This
indicates that the state
connection is an activator. activators connect
two nodes. The first
node activates the
second node when the
condition is met, which,
in this case, is when the
Threat pool contains
more than 100 threat
resources.

-- 117 of 443 --

machinaT iOns 103

---

## Sección 83: ChAptEr 5

ghosts, and eating fruit. One of these actions, eating fruit, is fairly isolated from the
rest of the game. Eating fruit scores bonus points but doesn’t help with anything
else, which means that novice players who have their hands full with the tasks of
eating and evading can safely ignore the fruit. The power pills are an important
resource that must be spent wisely.
Playing around with the digital version of the Pac-Man diagram even gives you a feel
of some of the strategic options available in the real game: You can use power pills
to eat ghosts and score bonus points, but you can also use power pills to safely go
for the final dots and progress faster.
FIGURe 5.28
complete diagram for
Pac-Man
NOT E in the real
game, the duration
of the power pill and
the number of points
earned for eating a
ghost are level-dependent factors, so we
simplified those
aspects.

-- 118 of 443 --

104 Game mechanics: advanced Game desiGn
Summary
In this chapter, we described the Machinations framework in some detail.
Machinations diagrams consist of nodes that perform functions on resources. The
most basic type of node is the pool, which stores resources. Nodes are joined to each
other by arrows called resource connections, which govern where, when, and how
many resources travel from one node to another. State connections, shown as a dotted arrow, permit the operation of the mechanics to change the behavior of resource
connections and the number of items in a pool and to trigger (or inhibit) events.
A number of specialized nodes perform common functions within an internal
economy: Sources create new resources, while drains destroy them again, and converters turn one kind of resource into another. Gates distribute the flow of resources
through them and can also be used to produce triggers.
At the end of the chapter, we built a Machinations model of Pac-Man, adding systems one at a time to show you how they work. As we have shown, you can use
Machinations to simulate many, many kinds of game mechanics and economies,
even those of action games.
In the next chapter, we’ll introduce a few more specialized nodes and then show
you how to use Machinations to model feedback and randomness. We also discuss
how you can apply Machinations to several different game genres, with numerous
examples.
Exercises
The following exercises are designed to test your familiarity with the Machinations
framework and your understanding of how the tool operates. For clarity, we have
drawn the diagrams so that all pools show how many resources they contain in
digits, rather than in stacks.

-- 119 of 443 --

machinaT iOns 105

---

## Sección 84: ChAptEr 5

1. In each of the following eight diagrams, how many resources will be in pool A
after one click?
  
  
 



 
2. In each of the following six diagrams, what is the minimum number of clicks
required to move all resources to pool A?





 








 

 



  
  

-- 120 of 443 --

106 Game mechanics: advanced Game desiGn
3. In each of the following six diagrams, what is the minimum number of clicks
required to move all resources to pool A?

 




   

 



  
  
  
4. In each of the following six diagrams, what is the minimum number of clicks
needed to win the game? Note that some diagrams have more than one interactive
element.
   
 

  


     
  


  














-- 121 of 443 --

---

## Sección 85: ChAptEr 6

Common Mechanisms
In the previous chapter, we introduced the Machinations framework and showed
how you can use Machinations diagrams to model the internal economy of games.
In this chapter, we introduce some advanced features of the Machinations framework
that will permit you to simulate and study more complex economies. We also discuss how feedback structures can be read from a Machinations diagram. As we
discussed in Chapter 3, “Complex Systems and the Structure of Emergence,” feedback plays an important role in the creation of emergent behavior, and in this
chapter we outline seven important characteristics of feedback structures. Finally,
we address ways you can use randomness to add unpredictability and variation to
the behavior of your internal economy. This way, Machinations diagrams, both
static and digital versions, become an essential tool to help designers understand
the nature of the dynamic system of game mechanics that drives the gameplay of
their game.
More Machinations Concepts
To start with, we introduce a few additional features of digital Machinations diagrams that we didn’t include in Chapter 5, “Machinations.” In this section, we’ll
explain these extra features.
Registers
Sometimes you’ll want to make simple calculations in a Machinations diagram
or use numeric values that come from player input. While it is possible to model
most of these features with pools, interactive sources, interactive drains, and state
connections, the resulting diagram is awkward to read. To simplify things, digital
Machinations diagrams offer an additional node type: registers. Registers are represented as solid squares with a number indicating their current value.
In many ways, a register acts just like a pool that always displays its value as a number. A register can be passive or interactive. A passive register has a value that is set
by input state connections. When a diagram is not running, this value is displayed
as x because it is not yet determined. An interactive register has an initial value that
you can set while designing the diagram. In addition, it has two buttons that allow
the user to modify its value while the diagram is running. An interactive register is
the equivalent of a pool connected to an interactive source and an interactive drain
(Figure 6.1).

---

## Sección 86: ChAptEr 6

-- 122 of 443 --

108 Game mechanics: advanced Game desiGn
 
 

 
 
     
     
   
     
       
   
Registers do not collect resources like pools do, so you should not connect resource
connections to a register. You can connect node modifier state connections to registers in the same way you can connect state connections to a pool.
Passive registers allow you to perform more complex calculations. Every state connection that you connect to a register as an input is assigned a letter automatically.
You can give the register a formula that uses these letters to determine the value of
the register (Figure 6.2). In addition, you can also use the labels max and min to set
a passive register to the maximum or minimum value of its inputs.
  




 
 
   
Intervals
Sometimes you want a node in a Machinations diagram to be activated less often
than every time step. You can accomplish this by creating flow rates with an interval. Intervals are created by using a slash (/) in the flow rate: A source that has an
output rate of 1/5 will produce 1 resource every 5 time steps. (See Figure 6.3 for
three examples.) A similar effect can be created when the output rate is set to 0.2.
However, using intervals allows you more control over the interval and allows you
to produce resources in bursts. For example, a production rate of 5/10 would produce 5 resources at once every 10 steps.
 
          
  
 
  
 
 
FIGURe 6.1
an interactive register and its equivalent
construction
FIGURe 6.2
Performing calculations using passive
registers
FIGURe 6.3
intervals

-- 123 of 443 --

cOmmOn mechanisms 109

---

## Sección 87: ChAptEr 6

You can use random flow rates with intervals. A production rate of D6/3 will produce between one and six resources every three steps. Intervals can be random as
well. A production rate of 1/(D4+2) indicates that one resource is produced every
three to six steps. Random intervals can be a good way to keep the player’s attention
on the game (see the “Random Intervals in Games” sidebar). You can even use a production rate of D6/D6, which indicates between one and six resources are produced
every one to six steps.
random interVals in Games
in his article “Behavioral Game design,” John hopson (2001) reports that experiments in
behavioral psychology suggest that player behavior is affected by chance and the interval
at which the player is rewarded for actions. When a player has a chance to be rewarded
at regular intervals, the player’s attention and activity will spike at those intervals. When
those intervals have random lengths, players will be active most of the time because they
never quite know when their next action might lead to a new reward. Use this powerful
knowledge with caution.
Intervals can also be modified dynamically. Label modifiers that have an i as a unit
of their modification (for example, +1i or -3i) will change their target’s interval. For
example, in Figure 6.4, the interval of the output of the source A is increased as
more resources arrive in pool B.
 
 

 
Multipliers
When working with random flow rates, it is often useful to combine multiple
chances into one value. For example, a source might have two chances to produce
a resource during every time step. You can represent this with two outputs with a
probable flow rate for each (Figure 6.5, left side), but as long as the probabilities are
equal for each chance, using a multiplier is more convenient. A multiplier is created
by adding n* before the flow rate, for example 3*50%, 2*10%, or 3*D3 (Figure 6.5,
right side). The two constructions are equivalent, but the one on the right is less
cluttered. If you need to use different probabilities, however, you will have to create
a construction like the one on the left.
  
 
  
FIGURe 6.4
dynamic intervals
FIGURe 6.5
multiplying a flow rate

-- 124 of 443 --

110 Game mechanics: advanced Game desiGn
Like intervals, multipliers can also be modified dynamically. Label modifiers that
have an m as a unit of their modification (for example, +2m or -1m) will change
their target’s multiplier. For example, the multiplier of the input of the drain A in
Figure 6.6 is controlled by the register B. If you run this diagram in the tool and
click A (an interactive drain), it will attempt to drain two items from the pool, with
a 50% chance of success for each one. If you change the value in the B register, you
can raise or lower the number of items that A attempts to drain.
Just like any other label modifier, a label modifier with an m on its own label transmits the change in the source node. Although the value of register B in Figure 6.6 is
the same as that on the resource connection, it doesn’t have to be. If the label modifier’s connection were +2m, it would transmit double the change in B.
  


 
Delays and Queues
In many games, producing, consuming, and trading resources takes time. The
time it requires to complete an action might be crucial for the game balance. In a
Machinations diagram, a special node can be used to delay the flow of resources as
they travel. A delay is represented as a small circle with an hourglass inside (Figure
6.7).
The label on the delay’s output indicates how many time steps a resource is delayed.
(Note that this is different from most labels on resource connections, which ordinarily represent a flow rate.) This time is dynamic. Other elements in the diagram
can change the delay setting through label modifiers. You can also specify a random
delay time using dice notation. A delay can process multiple resources simultaneously. This means that all incoming resources are delayed for the specified number
of time steps irrespective of the number of resources currently being delayed.
A delay can also be turned into a queue. A queue has two hourglass symbols instead
of one. Queues process only one resource at a time. For Figure 6.8, this would mean
that only one resource is passed every five time steps.
FIGURe 6.6
a dynamic multiplier
FIGURe 6.7
Producing soldiers takes time and
resources.

-- 125 of 443 --

cOmmOn mechanisms 111

---

## Sección 88: ChAptEr 6

Delays and queues can use state connections that communicate the number of
resources they are currently processing (including the number of resources waiting
in a queue to be processed). This can be useful to create timed effects. For example
in Figure 6.9, activating delay A will activate source B for 10 steps. You can activate
the delay as long as there are resources on pool C. A construction like this can be
used to improve the construction discussed for power pills in Pac-Man in the section
“Power Pills” in Chapter 5.
 
 




Reverse Triggers
In some games, bad things happen when the player doesn’t have the resources
required by an automatic or randomly triggered element. For example, in Civilization
when the player runs out of gold to pay the upkeep for his cities’ improvements,
the game automatically sells some of them. To simulate this type of event, the
Machinations diagrams include a reverse trigger. A reverse trigger is a state connection that is labeled with a !. If its source node tries to pull resources but cannot pull
all resources as indicated by the source’s input connections, the reverse trigger will
fire its target node. Figure 6.10 illustrates how a reverse trigger can be used to model
the automatic sale of city improvements in Civilization.
 

 

   


FIGURe 6.8
Building orders are
queued and executed
one at a time.
FIGURe 6.9
Using a delay to create
a timed effect
FIGURe 6.10
automatic sale of a city
improvement when the
player runs out of gold
in Civilization

-- 126 of 443 --

112 Game mechanics: advanced Game desiGn
Reverse triggers can also be used to trigger end conditions to make a game stop. For
example, in Figure 6.11 this construction is used to end a game when a player takes
more damage after she has lost all hit points. (In the figure the damage is caused by
the user clicking the interactive damage drain. Obviously in most games damage will
be caused by triggers produced by other mechanisms.)
Color-Coded Diagrams
Machinations diagrams can include color coding to help you distinguish among different types of resources as they flow around. To create a color-coded diagram in the
online tool, simply select the Color-Coded option in the diagram settings dialog in
the side panel.
In a color-coded Machinations diagram, the color of resources and connections is
meaningful. If a resource connection has a different color than its source, it will
pull only resources of its own color. Likewise, if a state connection has a different
color from its source, it will respond only to the resources of that color and ignore
all other resources. Color-coding allows you to store different resources in the same
pool, and for certain games this is very useful. Later in this chapter, we’ll show how
color-coding can be used to effectively model different unit types in a strategy game.
In a color-coded diagram, one source or converter can produce different colored
resources if its outputs are of a different color than the source or converter itself.
Gates can use different colored outputs to sort resources of different colors.
Figure 6.12 illustrates how color coding can be used. In this figure, source A produces a random number of orange and blue resources every time it is activated. Both
are collected at pool B. The number of orange resources in B increases the number
of blue resources produced at A, and vice versa. The user can activate drain C only
when there are at least 20 orange and 20 blue resources in pool B.
In a color-coded diagram, a gate can be used to change the colors of resources that
pass it. If the gate has color-coded outputs, it will try to sort resources by their
color, sending red resources along a red output, and so on. However, if the incoming resource color doesn’t match any of the outputs, the gate selects an appropriate
output (based on random numbers if it is a random gate or spreading the resources
according to the weighting of the outputs if it is a deterministic gate) and changes
FIGURe 6.11
ending a game when
a player takes damage
when she is out of
hit points.
T IP if you don’t check
the color-coded option
in the tool, you can still
color elements of your
diagram for illustration purposes, but the
simulation will act as
if everything is all the
same color.
FIGURe 6.12
a color-coded diagram

-- 127 of 443 --

cOmmOn mechanisms 113

---

## Sección 89: ChAptEr 6

the resource to that color. For example, Figure 6.13 uses this construction to randomly produce red and blue resources with an average proportion of 7/2.
Delays and queues can use color coding. By giving them outputs with different colors, they will delay resources of the corresponding color by a number of time steps
indicated by that output. For example, Figure 6.14 represents the mechanics of a
game where players can build knights and soldiers. Knights are represented as red
resources, and soldiers are represented as blue resources. Knights cost more gold and
take more time to build.
Feedback Structures in Games
The structure of a game’s internal economy plays an important role in a game’s
dynamic behavior and gameplay. In this structure, feedback loops play a special
role. A classic example of feedback in games can be found in Monopoly where the
money spent to buy property is returned with a profit because more property will
generate more income. This feedback loop can be easily read from the Machinations
diagram of Monopoly (Figure 6.15): It is formed by the closed circuit of resource and
state connections between the Money and Property pools.
FIGURe 6.13
Producing resources
with random colors
FIGURe 6.14
Using color coding to
build different units
with one building
queue
FIGURe 6.15
Monopoly

-- 128 of 443 --

114 Game mechanics: advanced Game desiGn
Closed Circuits Create Feedback
A feedback loop in a Machinations diagram is created by a closed circuit of connections. Remember that feedback occurs when state changes create effects that
ultimately feed back to the original element. A closed circuit of connections will
cause this effect.
A closed circuit of only resource connections (as in Figure 6.16) cannot display very
complex behavior. The resource is pulled through the pools in circles creating a simple periodic system, but nothing more interesting can happen.

 

The most interesting feedback loops consist of a closed circuit that mixes resource
connections and state connections. The loop should contain at least one label modifier or activator. For example, the mechanism in Figure 6.17 uses an activator to
maintain the resources in the pool at about 20. It acts the way a heating system does
to keep a room warm in cold climates: It turns on a heater with a fixed output when
the temperature drops below 20. The graph in the same figure displays the temperature over time.
charts in machinations diaGrams
Using the online tool for machinations diagrams, it is very easy to produce charts tracking the number of resources in a pool over time. The chart in Figure 6.17 is produced by
the tool. You can add a chart to a diagram like any other element. To start measuring the
number of resources, simply connect a pool to the chart with a state connection. When
selected, this connection is displayed as normal, but when it is not selected, it is reduced
to two small arrows to avoid visual clutter.
FIGURe 6.16
Feedback created by
only resource connections. The resource
simply goes round
and round.
FIGURe 6.17
heater feedback
mechanism using
an activator

-- 129 of 443 --

cOmmOn mechanisms 115

---

## Sección 90: ChAptEr 6

You can build a similar system using a label modifier instead (Figure 6.18). In this
case, the heater’s output rate is adjusted by the actual temperature, creating a more
subtle temperature curve. This simulates a heater that can produce varying amounts
of heat rather than a fixed amount, as in Figure 6.17.
Feedback by Affecting Outputs
A feedback loop can also be created by a circuit of connections that affects the output
of an element. For example, consider a Machinations diagram for an air conditioner
(Figure 6.19). The higher the temperature, the faster the temperature is drained.
Any changes that affect the output of a node can also close a feedback loop. In this
case, output can be affected directly by a label modifier or by a trigger or activator
affecting an element at the end of the resource that is able to pull resources (such as
a drain, converter, or gate, as in Figure 6.20).
  
    
FIGURe 6.18
heater feedback
mechanism using a
label modifier
FIGURe 6.19
an air conditioner
in machinations
FIGURe 6.20
closing a feedback
loop by affecting
the output

-- 130 of 443 --

116 Game mechanics: advanced Game desiGn
Positive and Negative Feedback basketball
In Chapter 4, we briefly introduced Marc LeBlanc’s concept of positive and negative feedback basketball to explain the effects of positive and negative feedback on
games. In this section, we’ll discuss the idea in more detail and show how to model
it in Machinations.
Positive feedback basketball is played like normal basketball but with the following extra rule: “For every N points of difference in the score, the team that is ahead
may have an extra player in play.” Figure 6.21 shows a model of positive feedback
basketball. It uses a very simple construction to model basketball itself: Every player
on a team has a particular chance to score every time step. Teams initially consist of
five players, so their chance to score is represented as a source with an initial production rate of five (for simplicity, we assume that a basket is worth one point, not
two, and we ignore three-point shots and free throws). Next comes a gate with a
percentage; this indicates the percentage of player attempts that actually succeed in
scoring. As you can see, the blue team is much better than the red team is; the blue
team’s chance of scoring is 40% while the red team’s chance is only 20%. A pool
called Difference keeps track of the difference in the points scored, because every time
blue scores, a point is added to the Difference pool, and every time red scores, a point
is subtracted. Each team can field one more player for every five points that it leads
by—if it’s ahead by five, it gets one more player; if it’s ahead by 10, it gets two; and
so on. The development of the scores and the difference in the scores are plotted
over time in the chart. As you can see, the score of the better team quickly spirals
upward as the difference increases, allowing them to field more and more players.
In negative feedback basketball, the extra rule is reversed: The losing, rather than
the leading, team can field an extra player for every N points of difference. Again,
this can be easily modeled as a Machinations diagram, simply by reversing the signs
of a few state connections. The chart that is produced by running the diagram is
FIGURe 6.21
Positive feedback
basketball. Team sizes
are prevented from
dropping below 5 by
setting their minimal
value to 5.

-- 131 of 443 --

cOmmOn mechanisms 117

---

## Sección 91: ChAptEr 6

harder to predict. Without looking at Figure 6.22, can you guess what happens to
the points of both teams and the difference in scores?
The chart in Figure 6.22 surprised us when we first produced it. Where you might
expect the negative feedback to cause the poorer team to get ahead of the better
team, it never does. What happens is that the negative feedback stabilizes the difference between the two teams. At some point, the poorer team is so far behind that
their lack of skill is compensated for by their team size, and beyond this point, the
difference doesn’t change much.
Another interesting effect of feedback occurs when you have two teams of similar
skill play positive feedback basketball. In that case, both teams will score at a more
or less equal rate. However, once one of the teams by chance takes a lead, the positive feedback kicks in, and they can field more and more players. The result might
look something like Figure 6.23.
FIGURe 6.22
negative feedback
basketball
FIGURe 6.23
Positive feedback basketball between two
equal teams. notice
the distinctive slope
in the line that depicts
the difference between
the scores after
roughly 30 steps.

-- 132 of 443 --

118 Game mechanics: advanced Game desiGn
Multiple Feedback loops
In the section “Categorizing Emergence” in Chapter 3, we discussed Jochen Fromm’s
typology of emergent systems. According to Fromm, systems with multiple feedback
loops display more emergent behavior than systems with only one feedback loop.
This is also true for games. Most games need more than one feedback loop to provide interesting emergent behavior. The board game Risk is an excellent example of
this. In Risk, no fewer than four feedback loops interact.
the ideal number oF Feedback loops
it is clear that games with multiple feedback loops exhibit more emergence than games
with only one or even no feedback loop at all. however, the ideal number of feedback
loops is much harder to determine. We have found that somewhere between two and
four major feedback loops seems to be sufficient for most types of games. depending on
how complex you want the game to be, you can try more feedback loops, but you have
to be careful not to create a game that is too hard to understand. remember that as a
designer you have a good grasp over the feedback loops that operate within your game,
but your players do not.
another important distinction here is the difference between major and minor feedback
loops. sometimes a feedback loop acts only locally and has little effect on any other
mechanism—a minor feedback loop. in contrast, a major feedback loop involves multiple
important mechanisms of your game and has a much greater impact on the gameplay.
You might have more than four minor feedback loops without complicating the rules too
much, but including more than four major feedback loops will make your game difficult
to master.
The core feedback loop in Risk involves the resources armies and territories: The more
territories a player holds, the more armies he can build. Figure 6.24 depicts this core
feedback loop. The player expends armies to gain territories by clicking the interactive Attack gate. The armies that succeed pass to the converter, which turns them
into territories. The label +1/3 of the label modifier that sets the output flow rate of
the interactive source Build indicates that the output of the source goes up by one
for every three territories the player has.
T IP Like Monopoly,
Risk is a classic board
game that illustrates
certain principles of
mechanics design well.
if you are not familiar with Risk, you can
download a copy of the
rules at www.hasbro.
com/common/instruct/
risk.pdf. The Wikipedia
entry for Risk also
includes an extensive
analysis.
FIGURe 6.24
The core feedback loop
involving armies and
territories in Risk

-- 133 of 443 --

cOmmOn mechanisms 119

---

## Sección 92: ChAptEr 6

When a player gains a territory, he receives a card. These may be collected into sets
and exchanged for more armies. The second feedback loop in Risk is formed by the
cards that are gained from a successful attack (Figure 6.25). Only one card can be
gained every turn, so the flow of cards passes through a limiter gate first. Collecting
a set of three cards can be used to generate new armies. The interactive converter
Trade Cards changes three cards into a random number of armies.
The third feedback loop is activated when a player manages to capture an entire
continent, which will give the player bonus armies every turn (Figure 6.26). In Risk,
predefined groups of territories form continents as indicated by the design of the
game board. In the diagram, this level of detail is not possible, so instead the construction is represented as a pool connected to another pool with a node modifier.
In this particular case, five territories count as one continent, which will in turn
activate the bonus source.
Finally, the fourth feedback loop is activated by the loss of territories because of the
actions of other players. Which player chooses to attack which other player depends
on many factors, including the attacker’s position, strategy, and preferences.
NOT E in the real
game, not every trio of
cards generates armies,
and some trios generate more armies than
others. We have simplified this by making the
exchange rate of cards
for armies random. in
Figure 6.25, this is indicated by the die symbol
labeling the output
of the Trade cards
converter.
FIGURe 6.25
The second feedback loop in
Risk, involving cards and armies
FIGURe 6.26
The third feedback loop in
Risk: bonus armies through
the possession of continents

-- 134 of 443 --

120 Game mechanics: advanced Game desiGn
Sometimes it makes sense to prey on weaker players in order to gain territories or
cards, and sometimes it is important to oppose stronger players to keep them from
winning. The number of continents a player holds has a strong influence on this.
Because continents generate bonus armies, players will generally attack aggressively
to prevent others from keeping a continent (Figure 6.27). The important thing is
that in Risk there is some form of friction caused by other players, and the influence
of this friction increases when the player has captured continents. This type of friction is a good example of the negative feedback that can almost always be found in
multiplayer games where players can act against each other, especially if they are
allowed to collude against the lead player.
Figure 6.28 shows the entire Risk diagram. It does not model the entire game
exactly; like our Pac-Man example in Chapter 5, this is an approximation. See the
“Level of Detail” sidebar.
FIGURe 6.27
The fourth feedback
loop in Risk: capturing
continents provokes
increased attacks by
other players.
FIGURe 6.28
The complete
Risk diagram
NOT E in the diagram,
the loss of territories
taken by other players’ attacks is indicated
by the multiplayer
dynamic label (an icon
depicting two pawns)
affecting the resource
flow to the Opposition
drain. see table 6.2 for
more information about
this and other types
of nondeterministic
behavior.

-- 135 of 443 --

cOmmOn mechanisms 121

---

## Sección 93: ChAptEr 6

leVel oF detail
You might have noticed that in the diagram in Figure 6.28, we use different levels of
detail. many of the game’s details are specified by the diagram: You can build one more
army for every three territories, continents give you a bonus of two armies every turn,
and so on. at the same time, some details are omitted: how many armies are generated
by the cards and how many territories are lost to the opposition are both represented by
symbols indicating a random value (the die and the multiplayer dynamic). in addition,
the positive effect on the consumption rate of the opposition drain is not precisely specified. as long as machinations diagrams are purely static, this is not a problem. in this
case, we are just interested in the structure of the mechanics, not in the exact details. For
this structure, it is only important to know that having a continent will cause opponents
to fight more fiercely. in many cases, omitting some of the details makes the structure
easier to understand. however, to run the diagram in the machinations Tool, you would
have to specify these items.
Feedback Profiles
The first three feedback loops in Risk all are positive: More territories or cards lead
to more armies, which lead to more territories and cards. Yet they are not the same:
They have different profiles. The feedback of capturing territories to be able to build
more armies is straightforward, is fairly slow, and involves a considerable investment of armies. Often players lose more armies in an attempt to conquer territories
than they regain with one build. This leads to the common strategy to build during
multiple, consecutive turns. The feedback of cards is much slower than the feedback
of territories. A player can get only one card each turn, and she needs at least three
to create a complete set. At the same time, the feedback of the cards is also much
stronger: A player might get between four and ten armies depending on the set she
collects. Feedback from capturing continents operates faster and more strongly still,
because it generates bonus armies every turn. This feedback is so strong and obvious
that it typically inspires fierce countermeasures from other players.
These properties are important characteristics of the feedback loops that have a
big impact on the dynamics of the game. Players are more willing to risk an attack
when it is likely that the next card they will get completes a valuable set: It does not
improve their chances of winning a battle, but it will increase the reward if they do.
Likewise, the chance of capturing a continent can inspire a player to take more risk
than the player should. In Risk the player’s risks and rewards constantly shift, making the ability to understand these dynamics and to read the game a critical skill.
These three positive feedback loops play an important role, but simply classifying
them as positive does not do justice to the subtlety of the mechanics. It is important
to understand how quickly and how strongly each operates.

-- 136 of 443 --

122 Game mechanics: advanced Game desiGn
Seven Feedback Characteristics
Table 6.1 lists seven characteristics that, together with the determinability characteristic discussed next, form a more detailed profile of a feedback loop. At first
glance, some of these characteristics might seem as if they overlap, but they do not.
It is easy to confuse positive feedback with constructive feedback and negative feedback with destructive feedback. However, positive destructive feedback does exist.
For example, losing pieces in a game of chess will increase the chance of losing more
pieces and losing the game. Likewise, in Civilization, the growth of a city is slowed
down by the corruption that is caused by large cities: negative feedback on a constructive effect.
TAble 6.1
seven characteristics
of Feedback

-- 137 of 443 --

cOmmOn mechanisms 123

---

## Sección 94: ChAptEr 6

The strength of a feedback loop is an informal indication of its impact on the game.
Strength cannot be attributed to a single characteristic; it is created by the interactions of several. For example, permanent feedback with a little return can have a
strong effect on the game.
Changes to the characteristics of a game’s feedback loops can have a dramatic effect
on the game. Feedback that is indirect and slow but with a lot of return and not
durable has a strong destabilizing effect. In this way, even negative feedback can be
used to destabilize a system if it is applied erratically or when its effects are strong
but slow and indirect. It means that at a much later point in the game something
big will happen that is difficult to predict or prevent.
The profile of feedback created by direct interaction in a multiplayer game, such
as the ability to target specific players for an attack in Risk, can change depending
on the players’ strategies. Feedback from direct interaction often is negative and
destructive: Players act against, or even conspire against, the leader. At the same
time, it can turn into positive and destructive feedback when someone starts to prey
on the weaker players.
Feedback characteristics can be read from a Machinations diagram, although this
is easier for some characteristics than it is for others. In general, use the following
guidelines:
n To determine a feedback loop’s effect, look at how it is connected to different
end conditions. If the feedback mechanism is directly connected to a winning condition, it is probably constructive; if it is directly connected to a losing condition,
it is probably destructive.
n A feedback loop’s investment can be determined by looking at how many
resources are consumed to activate the mechanism. In addition, feedback mechanisms that require players to activate many elements usually have a high
investment, as these mechanisms generally require more time or turns to activate.
n A feedback loop’s return can be determined by looking at how many resources
are produced by the mechanism. Return must be compared to investment to paint
a complete picture.
n The speed of a feedback loop is determined by the number of actions and elements involved to activate the feedback loop. Feedback loops that contain delays
and queues are obviously slower than those loops that do not include these elements. Feedback loops that involve only automatic nodes tend to be faster than
feedback loops that include many interactive nodes. Likewise, in most cases, feedback loops that consist of mostly state connections tend to be faster than feedback
loops that consist of mostly resource connections.
n The range of a feedback loop is easily determined by the number of elements it
consists of. Feedback loops that consist of many elements have a high range.

-- 138 of 443 --

124 Game mechanics: advanced Game desiGn
n Most feedback loops are fundamental parts of their game’s economy, so their
durability is extended or permanent. To identify a feedback loop with limited durability, see whether any part of the loop depends on limited resources that can never
be recovered or are recovered only at long intervals.
n The feedback loop’s type is probably the trickiest characteristic to determine
simply by looking at a Machinations diagram. Positive label modifiers affecting the
flow of production mechanisms create positive feedback, but positive label modifiers affecting the flow toward a drain or a converter tend to create negative feedback.
The type of feedback is much harder to determine when the feedback loop involves
activators. To determine the type of a feedback mechanism, you must really consider the entire mechanism and all its details.
Determinability
In many games, the strength of a feedback loop is affected by factors such as chance,
player skill, and the actions of other players. Machinations diagrams represent these
factors by different symbols that stand for nondeterministic mechanisms. Table 6.2
lists the symbols used to indicate different types of nondeterministic behaviors.
You can use these icons to annotate connections and gates in a diagram. A single
feedback loop can be affected by multiple and different types of nondeterministic
resource connections or gates. For example, the feedback through cards in Risk
(Figure 6.25) is affected by a random gate and a random flow, increasing its unpredictability. The loss of territories is affected by a multiplayer dynamic, namely,
attacks by other players.
TAble 6.2
Types of
determinability

-- 139 of 443 --

cOmmOn mechanisms 125

---

## Sección 95: ChAptEr 6

The skill of a player in performing a particular task can also be a decisive factor in
the nature of feedback, as is the case in many computer games. For example, Tetris
gets more difficult as the blocks pile up, and the rate at which players can get rid
of the blocks is determined by their skill. Figure 6.29 shows this as an interactive gate that controls a converter. Skillful players will be able to keep up with the
game much longer than players with less skill. Here player skill is a factor on the
operational or tactical level of the game. In games of chance, tactics, or games that
involve only deterministic feedback, a whole set of strategic skills can be quite decisive for the outcome. This feedback loop in Tetris is also affected by randomness.
The shape of the block is randomly determined by the game. Although the skill is
generally more decisive in Tetris, the player just might get lucky.
usinG nondeterministic symbols
in the machinations tool
You can use the symbols for deterministic behavior in digital machinations diagrams.
if you set the label of a connection to D, it will display a dice symbol. The multiplayer
symbol is created by setting the label to M, the player skill symbol is created by setting
the label to S, and the strategy symbol is created by setting the label to ST (for strategy).
Because the machinations Tool cannot actually simulate the effects of player skill or
other players’ actions, functionally these symbols all work the same way when the tool
is running: They produce a random value from 1 to 6. By changing the diagram settings,
you can specify other values as you wish. even though they work the same way, Joris
dormans has provided the nondeterministic symbols so that the diagrams are easier to
read. When you see the joystick symbol, you know that it stands for effects influenced by
variations in player skill.
FIGURe 6.29
Tetris

-- 140 of 443 --

126 Game mechanics: advanced Game desiGn
Randomness vs. Emergence
Games with many random factors become hard, if not impossible, to predict. In
games that have too many random factors, players often feel that their actions have
little impact on the game. One of the strengths of creating games with emergent
gameplay is that most of the dynamic behavior of the game arises from the complexity of the systems, not from the number of dice rolled.
It is our conviction that a well-designed game relies on pure chance only sparingly.
A game with only a few deterministic feedback loops can show surprisingly dynamic
behavior. When you use emergence rather than randomness to create dynamic
gameplay with uncertain outcomes, all decisions made by the player will matter.
This encourages her to pay attention and engage with the game.
Frequency and impact oF randomness
When using randomness, you should be aware of how its frequency and impact affect
the game. The impact of the randomness of a mechanic is often related to the range and
distribution of random numbers created. For example, in some board games, players roll
one die to move, and in others they roll two. With one die, they have an equal chance of
moving from 1–6 spaces. With two, they can move much farther, from 2–12 spaces, but
the probability distribution is not equal; they are more likely to roll a 7 than any other
number.
When designing games of emergence, it is almost always best to aim for random mechanics that operate frequently but have a relatively low impact on the game. increasing
the frequency of a random mechanism is generally a good way of reducing its impact:
You can expect that in the long run the odds even out.
There are two situations in which adding randomness is a useful design strategy:
It can force players to improvise, and it can help counter dominant strategies.
Use Randomness to Force Improvisation
Many games use randomness to create a situation in which the player is forced to
improvise. For example, the random maps generated for games such as Civilization
and SimCity create new and unique sets of challenges each time players start a new
game. In the collectible trading card game Magic: The Gathering, each player builds
his own deck by selecting 40 or so cards from his collection. But every time he starts
a new game, he needs to shuffle them. Players might control the cards in the deck,
but they must deal with them in a random order. Planning and building your deck
is one part of the skill that goes into playing Magic: The Gathering. Improvising and
spotting opportunities as they occur while the game develops is another.

-- 141 of 443 --

cOmmOn mechanisms 127

---

## Sección 96: ChAptEr 6

Improvisation works very well in a game that offers a random but level playing field
for all players. If a game generates random events that affect all players equally, the
decisive factor in dealing with the events comes from the players’ reaction to and
preparation for these events. Many modern, European-style board games tend to use
randomness in this way.
FIGURe 6.30
Power Grid, German
edition. image courtesy of Jason Lander
under a creative
commons (cc BY 2.0)
attribution license.

-- 142 of 443 --

128 Game mechanics: advanced Game desiGn
randomness Vs. emerGence in modern board Games
modern, european-style board games are often designed to create dynamic systems in
which players’ skill and strategy are more decisive than luck is. an excellent example is
the game Power Grid (Figure 6.30). in this game, players buy fuels to produce energy and
sell the energy to a growing network of cities connected to their power grid. There are
only two random factors in the game: The initial player order is randomly determined,
and a shuffled deck of cards determines what power plants are available for players to
buy. The game has mechanisms in place to counter the effects of this initial randomness:
With each turn the player order is changed in such a way that is disadvantageous to the
players in the lead (a form of negative feedback), and for the most part, only the cheaper
power plants are available, and the most expensive ones are returned to the deck (to
come back for the end game). none of the decisions players make during a game involves
rolling dice or other random factors. Buying power plants requires a player to outbid
her opponents, which is a multiplayer dynamic mechanism but not a random one. many
other popular and critically acclaimed board games, such as Puerto Rico, Caylus, and
Agricola, are similar in this respect. each of these games’ mechanics are worth analyzing.
Use Randomness to Counter Dominant Strategies
A dominant strategy is a course of action that is always the best one available to a
player in all circumstances. (It doesn’t guarantee that the player will win; it’s just his
best option.) As a designer, it is essential to avoid setting up mechanics that establish
a dominant strategy. Games with a dominant strategy aren’t any fun to play, because
the players end up doing the same thing over and over again. If you have a dominant strategy in your game, you need to balance your mechanics better (which we’ll
discuss in Chapter 8). Sometimes this is too difficult or too time-consuming. In that
case, adding more randomness to the mechanism can be an easy way out.
For example, consider the following simple two-player, energy-harvesting game.
Each player starts with a harvester that collects 0.1 energy every turn. Players can
buy an additional harvester by spending three energy, which increases their harvesting rate. The goal is to collect 30 energy, and whoever collects it first wins. In Figure
6.31, two players (red and blue) are playing. Red’s strategy is to spend all energy
to build seven new harvesters before starting to collect energy. Blue’s strategy is to
build two new harvesters before collecting.
Because this game is completely deterministic, the outcome is always the same: Red
wins every time. With her strategy, it will take her 119 turns to collect 30 energy,
while it will take blue, with his strategy, 146 turns to collect 30 energy. In fact, if we
use a Machinations diagram to determine the time it takes to collect 30 energy for
all possible options to build between 0 and 11 harvesters, it should become clear
that building 7 extra harvesters is the dominant strategy: It simply allows the player
to get to the goal the fastest (Table 6.3).

-- 143 of 443 --

cOmmOn mechanisms 129

---

## Sección 97: ChAptEr 6

Randomness can be used to break this pattern. If the same game were played but
instead of harvesting 0.1 energy every turn, a harvester would increase the chance
that energy is harvested by 10%, the results completely change. Figure 6.32 shows
a sample run of the harvesting game set up in this way. From simulating and running this game 1,000 times, we determined that now blue has roughly a 15%
chance to win.
FIGURe 6.31
a simple deterministic
harvester game. red
wins all the time.
ST R AT EG y ( N u m b e r o f
A d d i t i o n a l H a r v e s t e r s B u i l t )
T u R N S R EQ u I R E D
T O CO M P l E T E G O A l
0 300
1 181
2 146
3 133
4 125
5 121
6 120
7 119
8 120
9 120
10 121
11 121
12 122
TAble 6.3
comparison of the
different strategies
in the deterministic
harvesting Game
NOT E You might
recognize the pattern
in the chart from
the section “Longterm investments vs.
short-term gains” in

---

## Sección 98: chapter 4. it’s the same

phenomenon.

-- 144 of 443 --

130 Game mechanics: advanced Game desiGn
Example Mechanics
In this section, we’ll discuss some mechanics commonly found in games across different genres. We’ll use Machinations diagrams to show how these mechanics can
be modeled, but we’ll also use the diagrams to discuss the mechanisms themselves
in more detail. You can also find digital versions of all these examples online.
When reading through the example mechanics, you will notice that we often isolate
and model different mechanisms individually. This is done partly because models of
complete games grow complex very quickly. It would be difficult to grasp all these
mechanics from a single diagram for a game, especially because the printed diagrams in the book are static. In many cases, it is simply not necessary to look at all
the mechanics in a game to understand the most important ones. After all, games
are often built from several dynamic components. Thoroughly understanding each
component is the first and most important step toward understanding the dynamic
behavior of a game as a whole, even when (as in most games of emergence) the
whole is definitely more than the sum of its parts.
FIGURe 6.32
The random harvester
game. now blue has a
15% chance to win.

-- 145 of 443 --

cOmmOn mechanisms 131

---

## Sección 99: ChAptEr 6

Power-Ups and Collectibles in Action Games
The gameplay of action games emerges primarily from interesting physics and good
player interaction. The levels of many action games are fairly linear: The player
simply needs to perform a number of tasks, each with a certain chance to fail. His
objective is to reach the end of a level before running out of lives. Figure 6.33
represents a small level for an action game with three tasks (A, B, and C). Each is
represented by a skill gate that generates a number between 1 and 100. The player
is represented by a resource that moves from pool to pool. If the player fails to perform a task, there are two options: Either he dies (as is the case with tasks A and C)
or he is sent back to a previous location in the level (as is the case with task B).
Most action games are more than just a series of tasks, however. They usually have
an internal economy that revolves around power-ups and collectible items. For
example, in Super Mario Bros., the player can collect coins to gain extra points and
lives, while power-ups grant the player special powers, some of which have a limited
duration. Power-ups and collectibles can be represented in Machinations diagrams
by resources that are harvested from certain locations. Figure 6.34 shows how this
might be modeled using different colored resources to indicate different power-ups
or collectibles. In this diagram, the player must be present at a certain location to
be able to collect the power-up. This diagram also shows how power-ups and collectibles can be used to offer players different strategic options. In this case, the
player can progress through the level quickly and fairly easily if she goes from location I to II and V immediately. However, she can also opt for the more dangerous
route through III and IV, in which case she can collect one red and two extra yellow
resources.
FIGURe 6.33
Level progression in an
action game

-- 146 of 443 --

132 Game mechanics: advanced Game desiGn
Power-ups might be needed to progress through a game, and in that case, finding
the right power-ups is a requirement to complete a level. Other power-ups might
not be needed but are helpful all the same; in this case, the player must decide how
much risk she will take to collect one and how much she stands to gain from it. For
example, in Figure 6.34, the blue power-up is required to perform the final task to
complete the level, while the red power-up makes that task a little easier.
limited-duration poWer-ups
Power-ups frequently operate for only a limited amount of time. The construction in
Figure 6.35 shows how you can use delays to create a temporal power-up to aid in a task.
The power-up respawns to be available again after it has been consumed.
FIGURe 6.35 Limited-duration power-up
FIGURe 6.34
collecting power-ups
from different locations
in an action game
(lives are omitted from
this diagram)
T IP in Figure 6.34,
the blue power-up and
the task that requires it
constitute an example
of a lock-and-key
mechanism. Lockand-key mechanisms
are the most important mechanisms that
games of progression
use to control how
a player progresses
through a level. Lockand-key mechanisms
rarely incorporate
feedback loops and
so seldom exhibit
emergent behavior. We will examine
lock and key mechanisms in more detail in

---

## Sección 100: ChAptEr 6

Level design and
mechanics.”

-- 147 of 443 --

cOmmOn mechanisms 133
Collectibles also offer a player a strategic option. For example, if the player must risk
lives to collect coins and must collect coins to gain lives, the balance between the
effort and risk the player takes and the number of coins to be collected is crucial. In
this case, if a player has collected nearly enough coins to gain an extra life, taking
more risk becomes a viable strategy. Figure 6.36 represents this mechanism. Note
that it forms a feedback loop. In this case, the feedback is positive, but the player’s
skill determines whether the return on the investment is enough to balance the risk
she takes.
Racing Games and Rubber banding
Racing games can be easily framed in economic terms as a game where the player’s
objective is to “produce” distance. The first player to collect enough distance wins
the game. Figure 6.37 illustrates this mechanism. Depending on the implementation, the production mechanism might be influenced by chance, skill, strategy, the
quality of the player’s vehicle, or any combination of these factors. The Game of
Goose is an example of a racing game in which chance exclusively determines the
outcome of the game. Most arcade racing video games rely heavily on skill to determine a winner. More representative racing games that include vehicle tuning will
probably involve some long-term strategy as well.
 
 

A simple racing mechanism as represented in Figure 6.37 has a huge disadvantage. If
skill or strategy is the decisive factor, the outcome of the game will nearly always be
the same. Consider the mechanisms in Figure 6.38. It shows two players racing, and
their skill is represented by different chances to produce distance. The chart displays
FIGURe 6.36
Feedback in collecting coins that gain new
lives
FIGURe 6.37
racing mechanism

-- 148 of 443 --

134 Game mechanics: advanced Game desiGn
a typical game session and indicates spreads of possible outcome. Obviously, the
blue player is going to win nearly all the time.
Many racing games use a technique called rubber banding to counter this effect.
Rubber banding is a technique of applying negative constructive feedback based on
the distance between the player and his artificial opponents in order to make sure
that they stay close. We have seen a construction like this already with LeBlanc’s
example of negative feedback basketball. In that discussion, we pointed out that
while negative feedback used like this might keep the players close together, it will
not really make a poorer player win more often. However, there are adjustments
that can be made to the rubber-banding mechanism to change that. If the negative feedback is made stronger and lasts for a time, its effects are changed. Figure
6.39 represents this type of rubber banding. The blue player has a skill level of 60%,
while the red player has a skill level of 40%, so blue generates distance more quickly
than red. The register at the right computes the difference in distance and, depending on which one is ahead, will signal their Boost source to generate a boost. The
boost lasts for 20 time steps, and each boost will improve the player’s performance
by 5%. The chart displays a typical game session that results from this mechanism.
Note that the chart shows a race in which red and blue take the lead alternately.
FIGURe 6.38
an unequal race
NOT E We have intentionally implemented
an extreme form of rubber banding to make
it more visible. real
games would use more
subtle boosting.
FIGURe 6.39
rubber banding with
strong and durable
negative feedback

-- 149 of 443 --

cOmmOn mechanisms 135

---

## Sección 101: ChAptEr 6

RPG elements
Many games allow players to build up and customize the attributes of their avatars or of a party of characters. Often the mechanics involved are referred to as RPG
elements of the game. In this economy, skills and other attributes of player characters are important resources that affect their ability to perform particular tasks. The
most important structure of the RPG economy is a positive feedback loop: Player
characters must perform tasks successfully to increase their abilities, which in turn
increases their chance to perform more tasks successfully.
In classic role-playing games, experience points and character levels act as separate
resources that structure the economy. Figure 6.40 shows how these mechanics might
be modeled for a typical fantasy role-playing game. In this case, the player can perform
three different actions: combat, magic, and stealth. Successfully executing these
actions will produce experience points. When a player has collected 10 experience
points, he can level up. The experience points are converted into a higher character level and two upgrades that he can use to increase his abilities. (In some games,
experience points are not consumed, but trigger upgrades at stated thresholds. You
can do this with a source that produces upgrades and an activator to fire it.) To spice
up things a little, this diagram also contains a construction that occasionally increases
the difficulty of the tasks. Using color-coding, the difficulty of each different task progresses differently. Normally a dungeon master (in the case of a tabletop role-playing
game) or the game system would make sure players are presented with suitable tasks.
FIGURe 6.40
rPG economy with
experience points
and levels

-- 150 of 443 --

136 Game mechanics: advanced Game desiGn
In Figure 6.40, the positive feedback loop is countered partially by a negative feedback loop that is created by increasing the number of experience points required to
reach the next level every time the player levels up. This is a common design feature
in the internal economies of many role-playing games. Such a structure strongly
favors specialization: As players need more and more experience points to level
up, they will favor the task they are better at, because these tasks will have a bigger
chance to produce new experience points. This can be countered by applying negative feedback to the upgrade cost or impact for each ability separately (Figure 6.41),
either instead of, or in addition to, the increasing costs to level up.






 
    
Some RPG economies work differently; they give experience points whether an
action succeeds or not. For example, in The Elder Scrolls series, performing an action
often increases the player character’s ability, even if that action is unsuccessful. In
The Elder Scrolls, negative feedback is applied by requiring the action to be performed more times in order to advance to the next level of ability. This type of
mechanism is illustrated in Figure 6.42.
 
 



 
    
FPS economy
At the heart of the economy of most first-person shooters there is a direct relationship between fighting aggressively (thus consuming ammo) and losing health. To
compensate for this, enemies might drop ammo and health pick-ups when they are
FIGURe 6.41
alternative ways of
applying negative
feedback in an rPG
economy
FIGURe 6.42
an rPG economy
without experience
points controlled by
the player

-- 151 of 443 --

cOmmOn mechanisms 137

---

## Sección 102: ChAptEr 6

killed. We’ll show how to model this structure in a Machinations diagram in two
steps (Figure 6.43 and Figure 6.44).
In the first step, ammunition is represented by a pool of resources. When the player
chooses to engage an enemy, he wastes between two and four ammunition units
and has a chance to kill an enemy. This is modeled by the skill gate between the
Engage and Kill drains. In this case, the skill gate is set to generate a random number between 1 and 100 every time it fires. If the generated value is larger than 50,
the Kill drain is activated, and one enemy is removed. The register labeled Skill can
be used to increase or decrease this chance; it can be used to reflect more or less
skilled players. Once an enemy is killed, a similar construction is used to create a
50% chance that five more ammunition resources are generated by the Drop Ammo
source, which go into the Ammo pool. To keep things interesting, new enemies are
spawned occasionally.
Figure 6.44 adds player health to the diagram. In this case, poor performance by
the player when engaging an enemy (such as when a number below 75 is generated
by the skill gate) activates a drain on the player’s health. In addition to dropping
ammunition, there now is also a 20% chance a killed enemy drops a medical kit
(medkit) that the player can use to restore health.
FIGURe 6.43
ammunition and enemies in an FPs game
FIGURe 6.44
health added to the
FPs game economy.
skill gates and random gates generate
numbers between 1
and 100.

-- 152 of 443 --

138 Game mechanics: advanced Game desiGn
Analyzing the mechanics in Figure 6.44 reveals that in the basic FPS game economy
there are two related positive feedback loops. However, the effectiveness of the return
of each feedback loop depends on the skill of the player. A highly skilled player
will waste less ammunition, lose less health, and gain ammunition from engaging
enemies, whereas a poorly skilled player might be better off avoiding enemies. The
amount of ammunition a player needs to kill an enemy and the chance that killed
enemies drop new ammunition or medkits obviously is vital for this balance.
You could add a number of additional feedback loops to make this basic game
economy more complex. For example, the number of enemies might increase the
difficulty of killing enemies or increase the chance players will lose health fighting
them, thus creating positive destructive feedback (a downward spiral). Negative
constructive feedback could be created by having the player’s ammunition level
negatively impact the player’s chance of killing an enemy. Players with little ammunition would magically fight a bit better, while those with a lot wouldn’t fight quite
so well. This would tend to damp down the effect of large fluctuations in ammunition availability.
RTS Harvesting
In a real-time strategy game, you typically build workers to harvest resources.
Figure 6.45 represents a simple version of this mechanism with only one resource:
gold. In this case, gold is a limited resource. Instead of using a source, the available
gold is represented with a pool named Mine that starts with 100 resources. Note that
the pool is made automatic so that it starts pushing gold toward the player’s inventory (the pool named Gold). The flow rate is determined by the number of workers
the player has. Building workers costs two gold units. Note that the converter to
build workers pulls gold only when there are two gold available: It is in “pull all”
mode as indicated by the & sign.
FIGURe 6.45
mining for gold in
an rTs

-- 153 of 443 --

cOmmOn mechanisms 139

---

## Sección 103: ChAptEr 6

Most real-time strategy games have multiple resources to harvest, forcing players
to assign different tasks to their workers. Figure 6.46 expands upon the previous
one to include a second resource: timber. In this diagram, players can move workers between two locations by activating the two pools representing those locations.
Workers in each location contribute to the harvesting of one of the resources. In
this case, timber is also a limited resource (the Forest pool). The initial harvesting
rate for timber is slightly higher than the harvesting rate for gold. However, as the
workers clear the forest, the harvesting rate drops because they have to travel longer distances (you might recognize this situation from Warcraft). This mechanism
is modeled by applying a little negative feedback on the harvesting rate of timber
based on the number of resources left in the forest.
RTS building
In real-time strategy games, all those resources are harvested for a reason: You need
them to build your base and military units. Figure 6.47 illustrates how resources
can be used to construct a number of buildings and units. The diagram uses colorcoding, and each unit type has its own color. Soldiers are blue, and archers are
purple. Building types have their own color too: Barracks are blue, the mill is purple,
and towers are red. Different colored activators are used to create dependencies
between the building options: You need a barracks to be able to build units and a
mill to produce archers and towers.
FIGURe 6.46
mining gold and harvesting timber

-- 154 of 443 --

140 Game mechanics: advanced Game desiGn
RTS Fighting
An efficient way of modeling mechanics for combat between units is to give every
unit a chance to destroy one unit of the opposition in each time step. This is best
implemented with a multiplier. Figure 6.48 illustrates this mechanism. It features
generic units from two armies (red versus blue), each in a pool; blue has 20 units,
and red has 30. Every unit has a 50% chance of destroying an enemy unit in each
time step. This is implemented with a state connection from the pool (the dotted line marked +1m) that controls how many units the blue army will try to drain
from the red army, and vice versa. As blue has 20 units at the beginning of the run,
the resource connection between the red pool, and its drain reads 20*50%—that is,
the 20 blue units each have a 50% chance of killing (draining) a red unit. Similarly,
the 30 red units each have a 50% chance of killing a blue unit. In the first time step,
the calculation will run, and some number of each armies units will be drained. The
state connection will then update the flow rate of the resource connection to reflect
the new number of units in each pool.
FIGURe 6.47
rTs building
mechanics
NOT E remember
that a state connection always tracks
changes in the node
that is its origin. in
Figure 6.48, the state
connections reduce the
multipliers that they
point to because their
origin pools are being
drained.

-- 155 of 443 --

cOmmOn mechanism
