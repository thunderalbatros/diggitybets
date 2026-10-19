# 📚 Libro Completo: Designing Interfaces: Patterns for Effective Interaction Design

**Alcance:** Fuente bibliográfica completa sobre Patrones de Diseño de Interacción, Navegación, Tablas de Datos, Dashboards, Modales y Controles Visuales (Designing Interfaces: Patterns for Effective Interaction Design — Jenifer Tidwell (O'Reilly)). Aplicable a la Software Factory Web y DiggityBets. NO sustituye los contratos de API de Kick ni las reglas específicas de negocio en `CANON_*`.

> **Autor:** Jenifer Tidwell (O'Reilly)  
> **Dominio:** Patrones de Diseño de Interacción, Navegación, Tablas de Datos, Dashboards, Modales y Controles Visuales  
> **Archivo Fuente:** `Designing-Interfaces-2nd-Ed-Jenifer-Tidwell.pdf`  
> **Páginas Originales:** 577  
> **Secciones Extraídas:** 55  
> **Fecha de Ingesta:** 2026-10-19  

---

## Sección 1: Foundations & Introduction

-- 1 of 577 --

-- 2 of 577 --

Designing Interfaces
Download from Wow! eBook <www.wowebook.com>

-- 3 of 577 --

-- 4 of 577 --

Designing Interfaces
Second Edition
Jenifer Tidwell
Beijing · Cambridge · Farnham · Köln · Sebastopol · Tokyo

-- 5 of 577 --

Designing Interfaces, Second Edition
by Jenifer Tidwell
Copyright © 2011 Jenifer Tidwell. All rights reserved.
Printed in Canada.
Published by O’Reilly Media, Inc., 1005 Gravenstein Highway North, Sebastopol, CA 95472.
O’Reilly books may be purchased for educational, business, or sales promotional use. Online editions are
also available for most titles (http://my.safaribooksonline.com). For more information, contact our corporate/institutional sales department: 800-998-9938 or corporate@oreilly.com.
Editor: Mary Treseler
Production Editor: Rachel Monaghan
Copyeditor: Audrey Doyle
Proofreader: Emily Quill
Indexer: Lucie Haskins
Cover Designer: Karen Montgomery
Interior Designer: Ron Bilodeau
Illustrator: Robert Romano
Printing History:
November 2005: First Edition.
December 2010: Second Edition.
Nutshell Handbook, the Nutshell Handbook logo, and the O’Reilly logo are registered trademarks of
O’Reilly Media, Inc. Designing Interfaces, the image of a Mandarin duck, and related trade dress are trademarks of O’Reilly Media, Inc.
Many of the designations used by manufacturers and sellers to distinguish their products are claimed as
trademarks. Where those designations appear in this book, and O’Reilly Media, Inc. was aware of a trademark claim, the designations have been printed in caps or initial caps.
While every precaution has been taken in the preparation of this book, the publisher and author assume
no responsibility for errors or omissions, or for damages resulting from the use of the information contained herein.
ISBN: 978-1-449-37970-4
[TI]

-- 6 of 577 --

Contents
Introduction to the Second Edition.. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . xi
Preface. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . xv
1. What Users Do. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1
A Means to an End 2
The Basics of User Research 4
Users’ Motivation to Learn 6
The Patterns 8
Safe Exploration 9
Instant Gratification 10
Satisficing 11
Changes in Midstream 12
Deferred Choices 12
Incremental Construction 14
Habituation 14
Microbreaks 16
Spatial Memory 17
Prospective Memory 18
Streamlined Repetition 19
Keyboard Only 20
Other People’s Advice 21
Personal Recommendations 22

-- 7 of 577 --

vi Contents
2. Organizing the Content:
Information Architecture and Application Structure.. . . . . . . . . . . . . . . . . . . 25
The Big Picture 26
The Patterns 29
Feature, Search, and Browse 30
News Stream 34
Picture Manager 40
Dashboard 45
Canvas Plus Palette 50
Wizard 54
Settings Editor 59
Alternative Views 64
Many Workspaces 68
Multi-Level Help 71
3. Getting Around: Navigation, Signposts, and Wayfinding .. . . . . . . . . . . . . . . 77
Staying Found 77
The Cost of Navigation 78
Navigational Models 80
Design Conventions for Websites 85
The Patterns 86
Clear Entry Points 87
Menu Page 90
Pyramid 94
Modal Panel 97
Deep-linked State 100
Escape Hatch 104
Fat Menus 106
Sitemap Footer 110
Sign-in Tools 115
Sequence Map 118
Breadcrumbs 121
Annotated Scrollbar 124
Animated Transition 127

-- 8 of 577 --

Contents vii
4. Organizing the Page: Layout of Page Elements.. . . . . . . . . . . . . . . . . . . . . . . 131
The Basics of Page Layout 132
The Patterns 140
Visual Framework 141
Center Stage 145
Grid of Equals 149
Titled Sections 152
Module Tabs 155
Accordion 159
Collapsible Panels 163
Movable Panels 168
Right/Left Alignment 173
Diagonal Balance 176
Responsive Disclosure 179
Responsive Enabling 182
Liquid Layout 186
5. Lists of Things .. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 191
Use Cases for Lists 192
Back to Information Architecture 192
Some Solutions 194
The Patterns 197
Two-Panel Selector 198
One-Window Drilldown 202
List Inlay 206
Thumbnail Grid 210
Carousel 215
Row Striping 220
Pagination 224
Jump to Item 228
Alphabet Scroller 230
Cascading Lists 232
Tree Table 234
New-Item Row 236

-- 9 of 577 --

viii Contents
6. Doing Things: Actions and Commands.. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 239
Pushing the Boundaries 242
The Patterns 245
Button Groups 246
Hover Tools 249
Action Panel 252
Prominent “Done” Button 257
Smart Menu Items 261
Preview 263
Progress Indicator 266
Cancelability 269
Multi-Level Undo 271
Command History 275
Macros 278
7. Showing Complex Data:
Trees, Charts, and Other Information Graphics.. . . . . . . . . . . . . . . . . . . . . . . 281
The Basics of Information Graphics 281
The Patterns 294
Overview Plus Detail 296
Datatips 299
Data Spotlight 303
Dynamic Queries 308
Data Brushing 312
Local Zooming 316
Sortable Table 320
Radial Table 323
Multi-Y Graph 328
Small Multiples 331
Treemap 336

-- 10 of 577 --

Contents ix
8. Getting Input from Users: Forms and Controls.. . . . . . . . . . . . . . . . . . . . . . . . 341
The Basics of Form Design 341
Control Choice 344
The Patterns 356
Forgiving Format 357
Structured Format 360
Fill-in-the-Blanks 362
Input Hints 364
Input Prompt 369
Password Strength Meter 371
Autocompletion 375
Dropdown Chooser 380
List Builder 383
Good Defaults 385
Same-Page Error Messages 388
9. Using Social Media.. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 393
What This Chapter Does Not Cover 394
The Basics of Social Media 394
The Patterns 398
Editorial Mix 398
Personal Voices 402
Repost and Comment 406
Conversation Starters 410
Inverted Nano-pyramid 413
Timing Strategy 416
Specialized Streams 419
Social Links 423
Sharing Widget 426
News Box 430
Content Leaderboard 434
Recent Chatter 438
Download from Wow! eBook <www.wowebook.com>

-- 11 of 577 --

x Contents
10. Going Mobile. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 441
The Challenges of Mobile Design 442
The Patterns 448
Vertical Stack 449
Filmstrip 452
Touch Tools 454
Bottom Navigation 456
Thumbnail-and-Text List 459
Infinite List 462
Generous Borders 464
Text Clear Button 467
Loading Indicators 468
Richly Connected Apps 470
Streamlined Branding 473
11. Making It Look Good: Visual Style and Aesthetics.. . . . . . . . . . . . . . . . . . . . . 477
Same Content, Different Styles 479
The Basics of Visual Design 488
What This Means for Desktop Applications 496
The Patterns 498
Deep Background 499
Few Hues, Many Values 503
Corner Treatments 507
Borders That Echo Fonts 509
Hairlines 513
Contrasting Font Weights 516
Skins and Themes 519
References. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 523
Index.. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 527

---

## Sección 2: Foundations & Introduction

-- 12 of 577 --

Introduction to the Second Edition
In the five years since the first edition of Designing Interfaces was published, many things
have changed.
Most user interface designers—who might now play the roles of user experience (UX) designers, or interaction designers, or information architects, or any of several other titles—
now do their work on the Web. Countless websites, web services, web-delivered software,
blogs, and online stores need good design, and it’s becoming easier and easier to deliver
these finished products in ridiculously short turnaround times. Many of these are highly
interactive, but even traditional websites—static and straightforward in the past—now
contain components that are dynamic and interactive, such as video players and social
network content. There’s a lot of designing going on!
Compared to a few years ago, not as much of that designing is being done for desktop
applications. Of course, all of us technology users depend upon the complex software
installed on our laptops and desktops. Our email clients, browsers, document editors,
domain-specific software, and operating systems are still important parts of our online
lives. But many aspects of their interface designs have stabilized. As a result, since the
early 2000s, the audience for design books has shifted away from desktop design toward
web-based design.
Here’s another change: mobile design, which was still immature in 2005, has flourished.
With iPhones and other complex mobile devices now spreading everywhere, putting the
whole Web in our pockets, many designers have been forced to face the special problems
inherent to mobile design. How should mobile concerns change interface design, especially for websites? That’s a question we’re still collectively trying to answer, but the design
community has learned some approaches and techniques that work.
Also, designers cannot ignore the influence of online social networks. When I’m in the
early phase of a design project, I need to think about its connections to blogs, Twitter,
Facebook, comment areas, forums, and all the other ways that people talk to one another
online. I would be remiss not to do so. Users spend a lot of their online time “doing” social

-- 13 of 577 --

xii Introduction to the Second Edition
interaction, and sophisticated users expect social-network support as a matter of course.
It’s unusual now to find any website that doesn’t somehow connect to or from a social
service (and usually several).
But wait, there’s more! Since this book was first published, the UX design world has discovered the value of patterns, and other UX-related pattern collections have appeared on
the scene. Many of them are quite good. Some took patterns originally set forth here and
elaborated upon them, changed them, renamed them according to emergent conventions,
or presented new information about them. Others created new patterns in areas that this
book didn’t cover well—especially social, mobile, gestural, search, and RIA-style interfaces. (I list the best of these other pattern collections in the preface, in the References
section, and in the patterns themselves.)
So is the material written in 2005 still relevant?
To a large extent, yes. The human mind hasn’t changed—visual hierarchies still work,
progressive disclosure still works, and moving things still attract the attention of our reptilian brains. Good patterns based on fundamental design principles are just as valid now
as they were 5, 10, or 20 years ago. But other patterns weren’t as well grounded or have
fallen out of favor. This second edition gave me the privilege of hindsight: I was granted
the time to figure out how well these patterns have endured, and then report on them.
And, indeed, a few have been removed from this book.
But most of them remain, because they still work. They’ve been updated with fresh examples, and in some cases with fresh research into their effectiveness. In addition, I’ve
written (or borrowed) new patterns to reflect the changes of the last five years. The next
section describes these changes in some detail.
Changes in the Second Edition
Here’s what you’re getting in this book:
A chapter about social media
Chapter 9, Using Social Media, lays out some tactics and patterns for integrating social media into a site or application. The chapter does not cover all aspects of social
interfaces; it’s meant to be complementary to existing works on the subject, especially
Designing Social Interfaces (O’Reilly, http://oreilly.com/catalog/9780596154936/).
A chapter about mobile design

---

## Sección 3: Chapter 10, Going Mobile, contains some patterns that are specific to mobile devices.

In particular, the patterns are aimed at the platforms most designers are likely to target:
touch-screen devices with full connectivity, such as iPhones. Both apps and websites
are covered. Again, this is not intended to cover all aspects of mobile design—simply
the patterns and ideas that can help you create a graceful mobile interface even if you’re
not a mobile UI specialist.

-- 14 of 577 --

Introduction to the Second Edition xiii
The existence of this chapter brings up an interesting point. A “good” pattern should
be invariant across different platforms, perhaps including mobile ones. However,
mobile design introduces so many new constraints on screen size, interactive gestures, social expectations, and latency that some patterns simply don’t work well for
it. Conversely, most of the patterns written specifically for mobile contexts don’t work
well (or aren’t particularly salient design solutions) for larger screens; those patterns
have a home in Chapter 10.
Reorganized chapters and rewritten introductions
Because there were so many old and new patterns about how to present lists of items,
I chose to “refactor” three chapters to account for that. Chapter 5 is now simply
about lists. It pulled patterns from the first edition’s Chapter 2 (Two-Panel Selector,
One-Window Drilldown) and Chapter 7 (Row Striping and Cascading Lists). I also added
several new ones, such as List Inlay and Alphabetic Scroller.
Furthermore, the introductions to the chapters on information architecture (Chapter
2), navigation (Chapter 3), and page layout (Chapter 4) have been rewritten to reflect
recent design thinking and a new emphasis on web-based or web-like designs.
New patterns that capture popular new interactions
Some techniques have really caught on in the last five years, and the ones that seem to
be “pattern-like”—they are abstractable and cross-genre, they’re common enough to
be easy to find, and they can noticeably improve the user experience—are represented here. Examples include Fat Menus, Sitemap Footer, Hover Tools, Password Strength
Meter, Data Spotlight, and Radial Table.
New patterns that aren’t really “new,” but that were not included in the first edition
These ideas have been kicking around for a while, but either I didn’t recognize them
as being important back in 2005, or they weren’t especially salient back then. They
are now. This list of patterns includes Dashboard, News Stream, Carousel, Grid of Equals,
Microbreaks, Picture Manager, and Feature, Search, and Browse.
Renamed patterns, and patterns whose scope has changed
For instance, Card Stack was renamed to Module Tabs, and Closable Panels to Collapsible
Panels; I made these changes to conform to current terminology and other pattern
libraries. Similarly, Accordion was factored out from Collapsible Panels and made into
its own pattern, since other designers, design writers, and pattern collections have
converged on the term “accordion” for this particular technique. Meanwhile, OneWindow Drilldown and Two-Panel Selector—both from the original book’s chapter on
information architecture—have been narrowed down to deal specifically with lists of
items.
New examples, new research, and new connections to other pattern libraries
Almost every pattern has at least one new pictorial example, and many of them have
an “In other libraries” section that directs the reader to the same pattern (or patterns
that closely resemble it) in other collections. These might provide you with new insights or examples. Also, some patterns in this book have been slightly rewritten to

-- 15 of 577 --

xiv Introduction to the Second Edition
account for new thinking or research on the issue. Row Striping is one of these; some
experiments were run to find out the value of the technique, and the pattern refers
you to those results.
Some individual patterns have been removed
Many of these have passed into the realm of “blindingly obvious to everyone,” and
while they’re still useful as design tools, their value as part of this book is diminished. This list includes Extras on Demand, Intriguing Branches, Global Navigation, and
Illustrated Choices. Others are no longer used much in contemporary designs, such as
Color-Coded Sections.
The “Builders and Editors” chapter is gone
Designers still work on these types of applications, of course, but I honestly couldn’t
find much to change in that set of patterns in terms of new work and updated examples. I also discovered in a survey that readers found this to be one of the least valuable chapters. Because I wanted to keep the book size down to something reasonable,
I chose to remove that chapter to make room for the new material.
Finally, I want to talk briefly about what you won’t find in this new edition. The following
areas are so well covered by other published (or forthcoming) pattern collections that I
saw little need to put them into this edition:
• Search
• General social interfaces
• Gestural interfaces
• More depth in mobile design
• Types of animated transitions
• Help techniques
I hope that in the next few years, we’ll see new sets of patterns for other areas of design:
online games, geographic systems, online communities, and more. I see a rich and rewarding area of inquiry here, and that’s terrific. I encourage other design thinkers to jump in and
write other patterns—or challenge us pattern writers to make the existing collections better!

-- 16 of 577 --

Preface
Once upon a time, interface designers worked with a woefully small toolbox.
We had a handful of simple controls: text fields, buttons, menus, tiny icons, and modal
dialogs. We carefully put them together according to the Windows Style Guide or the
Macintosh Human Interface Guidelines, and we hoped that users would understand the
resulting interface—and too often, they didn’t. We designed for small screens, few colors,
slow CPUs, and slow networks (if the user was connected at all). We made them gray.
Things have changed. If you design interfaces today, you work with a much bigger palette
of components and ideas. You have a choice of many more user interface toolkits than before, such as the Java toolkits, HTML/CSS, JavaScript, Flash, and numerous open source
options. Apple’s and Microsoft’s native UI toolkits are richer and nicer-looking than they
used to be. Display technology is better. Web applications often look as professionally
designed as the websites they’re embedded in, and some of those web sensibilities have
migrated back into desktop applications in the form of blue underlined links, Back/Next
buttons, beautiful fonts and background images, and non-gray color schemes.
But it’s still not easy to design good interfaces. Let’s say you’re not a trained or self-taught
interface designer. If you just use the UI toolkits the way they should be used, and if you
follow the various style guides or imitate existing applications, you can probably create a
mediocre but passable interface.
Alas, that may not be enough anymore. Users’ expectations are higher than they used to
be—if your interface isn’t easy to use “out of the box,” users will not think well of it. Even if
the interface obeys all the standards, you may have misunderstood users’ preferred workflow, used the wrong vocabulary, or made it too hard to figure out what the software even
does. Impatient users often won’t give you the benefit of the doubt. Worse, if you’ve built
an unusable website or web application, frustrated users can give up and switch to your
competitor with just the click of a button. So the cost of building a mediocre interface is
higher than it used to be, too.

---

## Sección 4: Chapter 10, Going Mobile, contains some patterns that are specific to mobile devices.

-- 17 of 577 --

xvi Preface
Devices like phones, TVs, and car dashboards once were the exclusive domain of industrial designers. But now those devices have become smart. Increasingly powerful computers drive them, and software-based features and applications are multiplying in response
to market demands. They’re here to stay, whether or not they are easy to use. At this rate,
good interface and interaction design may be the only hope for our collective sanity in
10 years.
Small Interface Pieces, Loosely Joined
As an interface designer trying to make sense of all the technology changes in the last
few years, I see two big effects on the craft of interface design. One is the proliferation of
interface idioms: recognizable types or styles of interfaces, each with its own vocabulary of
objects, actions, and visuals. You probably recognize all the ones shown in Figure P-1, and
more are being invented all the time.
Forms Text editors Graphic editors
Spreadsheets Browsers Calendars
Media players Information graphics Immersive games
Web pages Social spaces E-commerce sites
Figure P-1. A sampler of interface idioms

-- 18 of 577 --

Preface xvii
The second effect is a loosening of the rules for putting together interfaces from these
idioms. It no longer surprises anyone to see several of these idioms mixed up in one
interface, for instance, or to see parts of some controls mixed up with parts of other controls. Online help pages, which long have been formatted in hypertext anyway, might now
include interactive applets, animations, or links to a web-based bulletin board. Interfaces
themselves might have help texts on them, interleaved with forms or editors; this situation
used to be rare. Combo boxes’ drop-down menus might have funky layouts, like color
grids or sliders, instead of the standard column of text items. You might see web applications that look like document-centered paint programs, but have no menu bars, and save
the finished work only to a database somewhere.
The freeform-ness of web pages seems to have taught users to relax their expectations
with respect to graphics and interactivity. It’s OK now to break the old Windows styleguide strictures, as long as users can figure out what you’re doing.
And that’s the hard part. Some applications, devices, and web applications are easy to use.
Many aren’t. Following style guides never guaranteed usability anyhow, but now designers
have even more choices than before (which, paradoxically, can make design a lot harder).
What characterizes interfaces that are easy to use?
One could say, “The applications that are easy to use are designed to be intuitive.” Well,
yes. That’s almost a tautology.
Except that the word “intuitive” is a little bit deceptive. Jef Raskin once pointed out that
when we say “intuitive” in the context of software, we really mean “familiar.” Computer
mice aren’t intuitive to someone who’s never seen one (though a growling grizzly bear
would be). There’s nothing innate or instinctive in the human brain to account for it. But
once you’ve taken ten seconds to learn to use a mouse, it’s familiar, and you’ll never forget
it. Same for blue underlined text, play/pause buttons, and so on.
Rephrased: “The applications that are easy to use are designed to be familiar.”
Now we’re getting somewhere. “Familiar” doesn’t necessarily mean that everything about
a given application is identical to some genre-defining product (e.g., Word, Photoshop,
Mac OS, or a Walkman). People are smarter than that. As long as the parts are recognizable enough and the relationships among the parts are clear, then people can apply their
previous knowledge to a novel interface and figure it out.
That’s where patterns come in. This book catalogs many of those familiar parts, in ways
you can reuse in many different contexts. Patterns capture a common structure—often a
very local one, such as a list layout—without being too concrete on the details, which gives
you the flexibility to be creative.
If you know what users expect of your application, and if you choose carefully from your
toolbox of idioms and frameworks (large-scale), individual elements (small-scale), and
patterns (covering the range), then you can put together something that “feels familiar”
while remaining original.
And that gets you the best of both worlds.

-- 19 of 577 --

xviii Preface
About Patterns in General
In essence, patterns are structural and behavioral features that improve the “habitability” of something—a user interface, a website, an object-oriented program, or a building.
They make things easier to understand or more beautiful; they make tools more useful
and usable.
As such, patterns can be a description of best practices within a given design domain.
They capture common solutions to design tensions (usually called “forces” in pattern literature) and thus, by definition, are not novel. They aren’t off-the-shelf components; each
implementation of a pattern differs a little from every other. They aren’t simple rules or
heuristics either. And they won’t walk you through an entire set of design decisions—if
you’re looking for a complete step-by-step description of how to design an interface, a
pattern catalog isn’t the place to find it!
Patterns are:
Concrete, not general
All designers depend upon good design principles, like “Prevent errors,” “Create a
strong visual hierarchy,” and “Don’t make the user think.” It’s rather hard, however,
to design an actual working interface starting from fundamental principles! Patterns
are concrete enough to help fill the space between high-level general principles and
the low-level “grammar” of user interface design (widgets, text, graphic elements,
alignment grids, and so on).
Valid across different platforms and systems
Patterns may be more concrete than principles or heuristics, but they do define abstractions—the best patterns aren’t specific to a single platform or idiom. Some even
work in both print and interactive systems. Ideally, each pattern captures some minor
truth about how people work best with a created artifact, and it remains true even
while the underlying technologies and media change.
Products, not processes
Unlike heuristics or user-centered design techniques, which usually advise on how to
go about finding a solution to an engineering or design problem, patterns are possible
solutions.
Suggestions, not requirements
You should almost always follow good design principles and heuristics, of course.
And organizations need designers to follow style guides so that their products stay
self-consistent. But patterns are intended to be only suggestions; you can follow them
or reject them, depending on your design context and user needs.

---

## Sección 5: Chapter 10, Going Mobile, contains some patterns that are specific to mobile devices.

-- 20 of 577 --

Preface xix
Relationships among elements, not single elements
A text field is not a pattern. The spatial relationships between a text field and a piece
of help text near it, however, might be a pattern. Likewise, changes in a set of elements
over time—as a user interacts with the software—may constitute a pattern, though
some patterns capture only static relationships.
Customized to each design context
When a pattern is instantiated in a design, the designer should adjust the pattern as
needed to fit the situation. You could use some of the pattern examples verbatim, but
as long as you understand why the pattern works, why not be creative? Fit the pattern
to your particular users and requirements.
Some very complete sets of patterns make up a “pattern language.” These patterns resemble visual languages in that they cover the entire vocabulary of elements used in a design
(though pattern languages are more abstract and behavioral; visual languages talk about
shapes, icons, colors, fonts, etc.). The set in this book isn’t nearly as complete, and it contains techniques that don’t qualify as traditional patterns. But at least it’s concise enough
to be manageable and useful.
Other Pattern Collections
The text that started it all dealt with physical buildings, not software. Christopher Alexander’s
A Pattern Language and its companion book The Timeless Way of Building established the
concept of patterns and described a 250-pattern multilayered pattern language. It is often
considered the gold standard for a pattern language because of its completeness, its rich
interconnectedness, and its grounding in the human response to our built world.
In the mid-1990s, the publication of Design Patterns by Erich Gamma, Richard Helm,
Ralph Johnson, and John Vlissides profoundly changed the practice of commercial software architecture. This book is a collection of patterns describing object-oriented “microarchitectures.” If you have a background in software engineering, this is the book that
probably introduced you to the idea of patterns. Many other authors have written books
about software patterns since this book. Software patterns such as these do make software
more habitable—for those who write the software, not those who use it!
The first substantial set of user-interface patterns was “Common Ground,” the predecessor to the book you’re reading now. Many other collections and languages followed,
notably Martijn van Welie’s Interaction Design Patterns; van Duyne, Landay, and Hong’s
The Design of Sites; the Little Springs mobile patterns, now known as Design4Mobile; the
Yahoo! Design Pattern Library, which morphed into Designing Web Interfaces; and the
rest of the O’Reilly design pattern library, including Designing Social Interfaces, Designing
Gestural Interfaces, and the first edition of this book.

-- 21 of 577 --

xx Preface
About the Patterns in This Book
So there’s nothing really new in here. If you’ve done any web or UI design, or even thought
much about it, you should say, “Oh, right, I know what that is” to most of these patterns.
But a few of them might be new to you, and some of the familiar ones may not be part of
your usual design repertoire.
These patterns work for both desktop applications and highly interactive websites. Many
patterns also apply to mobile devices or TV-based interfaces (like digital recorders).
Though this book won’t exhaustively describe all the interface idioms mentioned earlier, these idioms help to organize the book. Some chapters focus on the more common
idioms: forms, information graphics, mobile interfaces, and interactions with social networks. Other chapters address subjects that are useful across many idioms, such as organization, navigation, actions, and visual style. (The book does not address idioms such as
online games or communities, simply due to lack of space.)
This book is intended to be read by people who have some knowledge of such interface design concepts and terminology as dialog boxes, selection, combo boxes, navigation bars, and whitespace. It does not identify many widely accepted techniques, such as
copy-and-paste, since you already know what they are. But, at the risk of belaboring the
obvious, this book describes some common techniques to encourage their use in other
contexts or to discuss them alongside alternative solutions.
This book does not present a complete process for constructing an interface design. When
doing design, a sound process is critical. You need to have certain elements in a design process:
• Field research, to find out what the intended users are like and what they already do
• Goal and task analysis, to describe and clarify what users will do with what you’re
building
• Design models, such as personas (models of users), scenarios (models of common
tasks and situations), and prototypes (models of the interface itself)
• Empirical testing of the design at various points during development, like usability
testing and in situ observations of the design used by real users
• Enough time to iterate over several versions of the design, because you won’t get it
right the first time
These topics transcend the scope of this book, but there are plenty of other excellent resources and workshops out there that cover them in depth.
But there’s a deeper reason why this book won’t give you a recipe for designing an interface.
Good design can’t be reduced to a recipe. It’s a creative process, and one that changes under
you as you work—in any given project, for instance, you won’t understand some design issues until you’ve designed your way into a dead end. I’ve personally done that many times.
And design isn’t linear. Most chapters in this book are arranged more or less by scale,
and therefore by their approximate order in the design progression: large decisions about

-- 22 of 577 --

Preface xxi
content and scope are made first, followed by navigation, page design, and eventually
the details of interactions with forms and toolbars and such. But you’ll often find yourself moving back and forth through this progression. Maybe you’ll know very early in
a project how a certain screen should look, and that’s a “fixed point;” you may have to
work backward from there to figure out the right navigational structure. (It’s not ideal, but
things like this do happen in real life.)
Here are some ways you can use these patterns:
Learning
If you don’t have much design experience, a set of patterns can serve as a learning tool.
You may want to read over it to get ideas, or refer back to specific patterns as the need
arises. Just as expanding your vocabulary helps you express ideas in language, expanding your interface design “vocabulary” helps you create more expressive designs.
Examples
Each pattern in this book has at least one example. Some have many; they might be
useful to you as a sourcebook. You may find wisdom in the examples that is missing
in the text of the pattern. If you’re a designer who knows the patterns already, the
examples may be the most useful aspect of the book for you.
Terminology
If you talk to users, engineers, or managers about interface design, or if you write
specifications, then you could use the pattern names as a way of communicating and
discussing ideas. This is another well-known benefit of pattern languages. (The terms
“singleton” and “factory,” for instance, were originally pattern names, but they’re now
in common use among software engineers.)
Comparison of design alternatives
If you initially decided to use Module Tabs to organize material on a page and it’s not
working quite as well as you hoped, you might use these patterns to come up with alternatives, such as Titled Sections or an Accordion. Other sets of “either/or” patterns are
presented in this book, often with reasons to choose one pattern or another. Skilled
designers know that presenting alternative designs to clients frequently leads to a
better choice in the end.
Inspiration
Each pattern description tries to capture the reasons why the pattern works to make
an interface easier or more fun. If you get it, but want to do something a little different
from the examples, you can be creative with your “eyes open.” You could also use the
book to jumpstart your creative process by flipping through it for ideas.
One more word of caution: a catalog of patterns is not a checklist. You cannot measure the
quality of a thing by counting the patterns in it. Each design project has a unique context,
and even if you need to solve a common design problem (such as how to fit too much
content onto a page), a given pattern might be a poor solution within that context. No
reference can substitute for good design judgment. Nor can it substitute for a good design
process, which helps you find and recover from design mistakes.

---

## Sección 6: Chapter 10, Going Mobile, contains some patterns that are specific to mobile devices.

-- 23 of 577 --

xxii Preface
Ultimately, you should be able to leave a reference like this behind. As you become an experienced designer, you will internalize these ideas to the point that you don’t even notice
you’re using them anymore; the patterns become second nature and a permanent part of
your toolbox.
Audience
If you design user interfaces in any capacity, you might find this book useful. It’s intended
for people who work on:
• Desktop applications
• Websites
• Web applications or “rich internet applications” (RIAs)
• Software for mobile devices or other consumer electronics
• Turnkey systems like kiosks
• Operating systems
Of course, profound differences exist among these different design platforms. However,
I believe they have more in common than we generally think. You’ll see examples from
many different platforms in these patterns, and that’s deliberate—they often use the same
patterns to achieve the same ends.
From what readers said about the previous edition, this book has been more valuable to
less experienced designers than to those who have been designing sites or interfaces for a
while—they know this material already. However, even if you’re just starting out with design, you should already know the basic “grammar” of UI design, such as available toolkits
and control sets, concepts like drag-and-drop and focus, and the importance of usability
testing and user feedback. If you don’t, some excellent books listed in the References section can get you started with the essentials.
Specifically, this book targets the following audiences:
• Software developers who need to design the UIs that they build.
• Web page designers who are now asked to design web apps or sites with more
interactivity.
• New interface designers and usability specialists.
• More experienced designers who want to see how other designs solve certain problems; the examples can serve as a sourcebook for ideas.
• Professionals in adjacent fields, such as technical writing, product design, and information architecture.

-- 24 of 577 --

Preface xxiii
• Managers who want to understand what’s involved in good interface design.
• Open source developers and enthusiasts. This isn’t quite “open source design,” but the
idea is to open up interface design best practices for everyone’s benefit.
How This Book Is Organized
The patterns in this book are grouped into thematic chapters, and each chapter has an introduction that briefly covers the concepts those patterns are built upon. I want to emphasize briefly. Some of these concepts could have entire books written about them. But the
introductions will give you some context; if you already know this stuff, they’ll be review
material, and if not, they’ll tell you what topics you might want to learn more about. The first
set of chapters is applicable to almost any interface you might design, whether it’s a desktop
application, web application, website, hardware device, or whatever you can think of:
• Chapter 1, What Users Do, talks about common behavior and usage patterns supported by good interfaces.
• Chapter 2, Organizing the Content, discusses information architecture as it applies to
highly interactive interfaces. It deals with different organizational patterns, recognizable interface types, and “guilds” of patterns (groups of smaller-scale patterns that
work well together to support a certain type of interface).
• Chapter 3, Getting Around, discusses navigation. It describes patterns for moving around an interface—between pages, among windows, and within large virtual
spaces.
• Chapter 4, Organizing the Page, describes patterns for the layout and placement of
page elements. It talks about how to communicate meaning simply by putting things
in the right places.
• Chapter 5, Lists, enumerates a set of patterns for displaying lists of items, along with
criteria for choosing among them.
• Chapter 6, Doing Things, talks about how to present actions and commands; use these
patterns to handle the “verbs” of an interface.
Next comes a set of chapters that deal with specific idioms. It’s fine to read them all, but
real-life projects probably won’t use all of them. Chapters 7 and 8 are the most broadly
applicable, since most modern interfaces use trees, tables, or forms in some fashion.
• Chapter 7, Showing Complex Data, contains patterns for trees, tables, charts, and information graphics in general. It discusses the cognitive aspects of data presentation
and how to use them to communicate knowledge and meaning.
• Chapter 8, Getting Input from Users, deals with forms and controls. Along with the
patterns, this chapter has a table that maps data types to various controls that can
represent them.

-- 25 of 577 --

xxiv Preface
• Chapter 9, Using Social Media, discusses the ways that one might integrate contemporary social media into a website or application design. Although designers don’t
always make these choices for a site, they sometimes do, and social media may influence your design in any case.
• Chapter 10, Going Mobile, presents techniques and concepts that designers ought
to know in order to help their designs translate well to a mobile device. Patterns
throughout the book may contain examples from mobile devices, but the patterns in
this chapter are mobile-specific.
Finally, the last chapter comes at the end of the design progression, but it too applies to
almost anything you design.
• Chapter 11, Making It Look Good, deals with aesthetics and fit-and-finish. It uses
graphic design principles and patterns to show how (and why) to polish the lookand-feel of an interface once its behavior is established.
I chose this book’s examples based on many factors. The most important is how well an example demonstrates a given pattern or concept, of course, but other considerations include
general design fitness, printability, variety—desktop applications, websites, devices, etc.—and
how well known and accessible these applications might be to readers. As such, the examples
are weighted heavily toward Microsoft and Apple software, certain big-name websites such as
Google and Yahoo! properties, and easy-to-find consumer software and devices. This is not
to say that they always are paragons of good design—they’re not, and I do not mean to slight
the excellent work done by countless designers on lesser-known applications. If you know of
examples that might meet most of these criteria, please suggest them to me.
Comments and Questions
Please address comments and questions concerning this book to the publisher:
O’Reilly Media, Inc.
1005 Gravenstein Highway North
Sebastopol, CA 95472
(800) 998-9938 (in the United States or Canada)
(707) 829-0515 (international or local)
(707) 829-0104 (fax)
We have a web page for this book, where we list errata, examples, and any additional information. You can access this page at:
http://oreilly.com/catalog/9781449379704/
To comment or ask technical questions about this book, send email to:
bookquestions@oreilly.com
For more information about our books, conferences, Resource Centers, and the O’Reilly
Network, see our website at:
http://www.oreilly.com

---

## Sección 7: Chapter 10, Going Mobile, contains some patterns that are specific to mobile devices.

-- 26 of 577 --

Preface xxv
Safari® Books Online
Safari Books Online is an on-demand digital library that lets you
easily search over 7,500 technology and creative reference books
and videos to find the answers you need quickly.
With a subscription, you can read any page and watch any video from our library online.
Read books on your cell phone and mobile devices. Access new titles before they are available for print, and get exclusive access to manuscripts in development and post feedback
for the authors. Copy and paste code samples, organize your favorites, download chapters,
bookmark key sections, create notes, print out pages, and benefit from tons of other timesaving features.
O’Reilly Media has uploaded this book to the Safari Books Online service. To have full
digital access to this book and others on similar topics from O’Reilly and other publishers,
sign up for free at http://my.safaribooksonline.com.
Acknowledgments
First of all, I am indebted to my editor, Mary Treseler, who got this project rolling at just
the right time. You knew a second edition was needed, and with the patience of a saint,
you made sure I followed through with it. Thanks also to the rest of the O’Reilly production team: Rachel Monaghan, Audrey Doyle, Robert Romano, Ron Bilodeau, and anyone
else I may have inadvertently missed. You all rocked.
The technical reviewers for this edition gave me fantastic feedback. Barbara Ballard, Erin
Malone, Dan Saffer—thanks to you all!
The ideas in this second edition have been cooking for a long time. Both direct and indirect
conversations with other UI designers and pattern writers have helped shape my thinking:
Bill Scott, Luke Wroblewski, Martijn van Welie, Erin Malone, Christian Crumlish, Dan
Saffer, James Reffell, Scott Jenson, and my UX colleagues at Google. I learned a ridiculous
amount from all of you. I’m also grateful to the people who gave me feedback at the various and sundry presentations I’ve done for conferences and mini-conferences over the
last few years.
To all who bought or read the first edition: thanks to you too! Without you, there would
have been no second edition.
Finally, I am enormously grateful to Rich, who supported me wholeheartedly throughout
this second-edition project; and to Matthew, who right now is too young to understand
how helpful his sweet hugs actually were. I love you both!

-- 27 of 577 --

-- 28 of 577 --

---

## Sección 8: Chapter 1

What Users Do
This book is almost entirely about the look and behavior of applications, web apps, and
interactive devices. But this first chapter is the exception to the rule. No screenshots here;
no layouts, no navigation, no diagrams, no visuals at all.
Why not? After all, that’s probably why you picked up the book in the first place.
It’s because good interface design doesn’t start with pictures. It starts with an understanding of people: what they’re like, why they use a given piece of software, and how they
might interact with it. The more you know about them, and the more you empathize with
them, the more effectively you can design for them. Software, after all, is merely a means
to an end for the people who use it. The better you satisfy those ends, the happier those
users will be.
Each time someone uses an application, or any digital product, he carries on a conversation with the machine. It may be literal, as with a command line or phone menu, or
tacit, like the “conversation” an artist has with her paints and canvas—the give and take
between the craftsperson and the thing being built. With social software, it may even be a
conversation by proxy. Whatever the case, the user interface mediates that conversation,
helping users achieve whatever ends they had in mind.
As the user interface designer, then, you get to script that conversation, or at least define
its terms. And if you’re going to script a conversation, you should understand the human’s
side as well as possible. What are the user’s motives and intentions? What “vocabulary” of
words, icons, and gestures does the user expect to employ? How can the application set
expectations appropriately for the user? How do the user and the machine finally end up
communicating meaning to each other?
There’s a maxim in the field of interface design: “Know thy users, for they are not you!”
So, this chapter will talk about people. It covers a few fundamental ideas briefly in this
introduction, and then discusses some patterns that differ from those in the rest of the
book. They describe human behaviors—as opposed to system behaviors—that the software you design may need to support. Software that supports these human behaviors
better helps users achieve their goals.

-- 29 of 577 --

2 Chapter 1: What Users Do
A Means to an End
Everyone who uses a tool—software or otherwise—has a reason for using it. For instance:
• Finding some fact or object
• Learning something
• Performing a transaction
• Controlling or monitoring something
• Creating something
• Conversing with other people
• Being entertained
Well-known idioms, user behaviors, and design patterns can support each of these abstract goals. User experience designers have learned, for example, how to help people
search through vast amounts of online information for specific facts. They’ve learned how
to present tasks so that it’s easy to walk through them. They’re learning ways to support
the building of documents, illustrations, and code.
The first step in designing an interface is to figure out what its users are really trying to
accomplish. Filling out a form, for example, is almost never a goal in and of itself—people
only do it because they’re trying to buy something online, renew their driver’s license, or
install software. They’re performing some kind of transaction.
Asking the right questions can help you connect user goals to the design process. Users
and clients typically speak to you in terms of desired features and solutions, not of needs
and problems. When a user or client tells you he wants a certain feature, ask why he wants
it—determine his immediate goal. Then to the answer of this question, ask “why” again.
And again. Keep asking until you move well beyond the boundaries of the immediate
design problem. *
Why should you ask these questions if you have clear requirements? Because if you love
designing things, it’s easy to get caught up in an interesting interface design problem.
Maybe you’re good at building forms that ask for just the right information, with the
right controls, all laid out nicely. But the real art of interface design lies in solving the right
problem.
So, don’t get too fond of designing that form. If there’s any way to finish the transaction
without making the user go through that form at all, get rid of it altogether. That gets the
user closer to his goal, with less time and effort spent on his part (and maybe yours, too).
Let’s use the “why” approach to dig a little deeper into some typical design scenarios.
* This is the same principle that underlies a well-known technique called root-cause analysis. But root-cause
analysis is a tool for fixing organizational failures; here, we use its “five whys” (more or less) to understand
everyday user behaviors and feature requests.

-- 30 of 577 --

A Means to an End 3
• Why does a mid-level manager use an email client? Yes, of course—“to read email.”
Why does she read and send email in the first place? To converse with other people.
Of course, other means might achieve the same ends: the phone, a hallway conversation, a formal document. But apparently, email fills some needs that the other methods don’t. What are they, and why are they important to her? Privacy? The ability to
archive a conversation? Social convention? What else?
• A father goes to an online travel agent, types in the city where his family will be taking
a summer vacation, and tries to find plane ticket prices on various dates. He’s learning from what he finds, but his goal isn’t just to browse and explore different options.
Ask why. His goal is actually a transaction: to buy plane tickets. Again, he could have
done that at many different websites, or over the phone with a live travel agent. How
is this site better than those other options? Is it faster? Friendlier? More likely to find
a better deal?
• A mobile phone user wants a way to search through his contacts list more quickly.
You, as the designer, can come up with some clever ideas to save keystrokes while
searching. But why does he want it? It turns out that he makes a lot of calls while driving, and he doesn’t want to take his eyes off the road more than he has to—he wants to
make calls while staying safe (to the extent that that’s possible). The ideal case is that
he doesn’t have to look at the phone at all! A better solution is voice dialing: all he has
to do is speak the name, and the phone makes the call for him.
• Sometimes goal analysis really isn’t straightforward at all. A snowboarding site might
provide information (for learning), an online store (for transactions), and a set of
Flash movies (for entertainment). Let’s say someone visits the site for a purchase, but
she gets sidetracked into the information on snowboarding tricks—she has switched
goals from accomplishing a transaction to browsing and learning. Maybe she’ll go
back to purchasing something, maybe not. And does the entertainment part of the
site successfully entertain both the 12-year-old and the 35-year-old? Will the 35-yearold go elsewhere to buy his new board if he doesn’t feel at home there, or does he not
care?
It’s deceptively easy to model users as a single faceless entity—“The User”—walking
through a set of simple use cases, with one task-oriented goal in mind. But that won’t
necessarily reflect your users’ reality.
To do design well, you need to take many “softer” factors into account: gut reactions,
preferences, social context, beliefs, and values. All of these factors could affect the design
of an application or site. Among these softer factors, you may find the critical feature or
design factor that makes your application more appealing and successful.
So, be curious. Specialize in finding out what your users are really like, and what they
really think and feel.

---

## Sección 9: Chapter 1

-- 31 of 577 --

4 Chapter 1: What Users Do
The Basics of User Research
Empirical discovery is the only really good way to obtain this information. To get a design
started, you’ll need to characterize the kinds of people who will be using your design
(including the softer factors just mentioned), and the best way to do that is to go out and
meet them.
Each user group is unique, of course. The target audience for, say, a new mobile phone app
will differ dramatically from the target audience for a piece of scientific software. Even if
the same person uses both, his expectations for each are different—a researcher using scientific software might tolerate a less-polished interface in exchange for high functionality,
whereas that same person may stop using the mobile app if he finds its UI to be too hard
to use after a few days.
Each user is unique, too. What one person finds difficult, the next one won’t. The trick is
to figure out what’s generally true about your users, which means learning about enough
individual users to separate the quirks from the common behavior patterns.
Specifically, you’ll want to learn:
• Their goals in using the software or site
• The specific tasks they undertake in pursuit of those goals
• The language and words they use to describe what they’re doing
• Their skill at using software similar to what you’re designing
• Their attitudes toward the kind of thing you’re designing, and how different designs
might affect those attitudes
I can’t tell you what your particular target audience is like. You need to find out what they
might do with the software or site, and how it fits into the broader context of their lives.
Difficult though it may be, try to describe your potential audience in terms of how and
why they might use your software. You might get several distinct answers, representing
distinct user groups; that’s OK. You might be tempted to throw up your hands and say, “I
don’t know who the users are” or “Everyone is a potential user.” But that doesn’t help you
focus your design at all—without a concrete and honest description of those people, your
design will proceed with no grounding in reality.
Unfortunately, this user-discovery phase will consume serious time early in the design
cycle. It’s expensive. But it’s worth it, because you stand a better chance at solving the right
problem—you’ll build the right thing in the first place.
Fortunately, lots of books, courses, and methodologies now exist to help you. Although
this book does not address user research, here are some methods and topics to consider:

-- 32 of 577 --

The Basics of User Research 5
Direct observation
Interviews and onsite user visits put you directly into the user’s world. You can ask
users about what their goals are and what tasks they typically do. Usually done “on location,” where users would actually use the software (e.g., in a workplace or at home),
interviews can be structured—with a predefined set of questions—or unstructured,
where you probe whatever subject comes up. Interviews give you a lot of flexibility;
you can do many or a few, long or short, formal or informal, on the phone or in person.
These are great opportunities to learn what you don’t know. Ask why. Ask it again.
Case studies
Case studies give you deep, detailed views into a few representative users or groups of
users. You can sometimes use them to explore “extreme” users that push the boundaries of what the software can do, especially when the goal is a redesign of existing
software. You can also use them as longitudinal studies—exploring the context of use
over months or even years. Finally, if you’re designing custom software for a single
user or site, you’ll want to learn as much as possible about the actual context of use.
Surveys
Written surveys can collect information from many users. You can actually get statistically significant numbers of respondents with these. Since there’s no direct human contact, you will miss a lot of extra information—whatever you don’t ask about, you won’t
learn about—but you can get a very clear picture of certain aspects of your target audience. Careful survey design is essential. If you want reliable numbers instead of a qualitative “feel” for the target audience, you absolutely must write the questions correctly, pick
the survey recipients correctly, and analyze the answers correctly—and that’s a science.
Personas
Personas aren’t a data-gathering method, but they do help you figure out what to do
with your data once you’ve got it. This is a design technique that “models” the target
audiences. For each major user group, you create a fictional person that captures the
most important aspects of the users in that group: what tasks they’re trying to accomplish, their ultimate goals, and their experience levels in the subject domain and with
computers in general. Personas can help you stay focused. As your design proceeds,
you can ask yourself questions such as “Would this fictional person really do X? What
would she do instead?”
You might notice that some of these methods and topics, such as interviews and surveys,
sound suspiciously like marketing activities. That’s exactly what they are. Focus groups
can be useful, too (though not so much as the others), and the concept of market segmentation resembles the definition of target audiences used here. In both cases, the whole
point is to understand the audience as best you can.
The difference is that as a designer, you’re trying to understand the people who use the
software. A marketing professional tries to understand those who buy it.
Download from Wow! eBook <www.wowebook.com>

-- 33 of 577 --

6 Chapter 1: What Users Do
It’s not easy to understand the real issues that underlie users’ interactions with a system.
Users don’t always have the language or introspective skill to explain what they really need
to accomplish their goals, and it takes a lot of work on your part to ferret out useful design
concepts from what they can tell you—self-reported observations are usually biased in
subtle ways.
Some of these techniques are very formal, and some aren’t. Formal and quantitative methods are valuable because they’re good science. When applied correctly, they help you see
the world as it actually is, not how you think it is. If you do user research haphazardly,
without accounting for biases such as the self-selection of users, you may end up with
data that doesn’t reflect your actual target audience—and that can only hurt your design
in the long run.
But even if you don’t have time for formal methods, it’s better to just meet a few users
informally than to not do any discovery at all. Talking with users is good for the soul. If
you’re able to empathize with users and imagine those individuals actually using your
design, you’ll produce something much better.
Users’ Motivation to Learn
Before you start the design process, consider your overall approach. Think about how you
might design the interface’s overall interaction style—its personality, if you will.
When you carry on a conversation with someone about a given subject, you adjust what
you say according to your understanding of the other person. You might consider how
much he cares about the subject, how much he already knows about it, how receptive he is
to learning from you, and whether he’s even interested in the conversation in the first place.
If you get any of that wrong, bad things happen—he might feel patronized, uninterested,
impatient, or utterly baffled.
This analogy leads to some obvious design advice. The subject-specific vocabulary you
use in your interface, for instance, should match your users’ level of knowledge; if some
users won’t know that vocabulary, give them a way to learn the unfamiliar terms. If they
don’t know computers very well, don’t make them use sophisticated widgetry or uncommon
interface-design conventions. If their level of interest might be low, respect that, and don’t
ask for too much effort for too little reward.
Some of these concerns permeate the whole interface design in subtle ways. For example,
do your users expect a short, tightly focused exchange about something very specific, or
do they prefer a conversation that’s more of a free-ranging exploration? In other words,
how much openness is there in the interface? Too little, and your users feel trapped and
unsatisfied; too much, and they stand there paralyzed, not knowing what to do next, unprepared for that level of interaction.

---

## Sección 10: Chapter 1

-- 34 of 577 --

Users’ Motivation to Learn 7
Therefore, you need to choose how much freedom your users have to act arbitrarily. At
one end of the scale might be a software installation wizard: the user is carried through
it with no opportunity to use anything other than Next, Previous, or Cancel. It’s tightly
focused and specific, but quite efficient—and satisfying, to the extent that it works and is
quick. At the other end might be an application such as Excel, an “open floorplan” interface
that exposes a huge number of features in one place. At any given time, the user has about
872 things that he can do next, but that’s considered good, because self-directed, skilled
users can do a lot with that interface. Again, it’s satisfying, but for entirely different reasons.
Here’s an even more fundamental question: how much effort are your users willing to
spend to learn your interface?
It’s easy to overestimate. Maybe they’ll use it every day on the job—clearly they’d be motivated to learn it well in that case, but that’s rare. Maybe they’ll use it sometimes, and learn
it only well enough to get by (Satisficing). Maybe they’ll only see it once, for 30 seconds. Be
honest: can you expect most users to become intermediates or experts, or will most users
remain perpetual beginners?
Software designed for intermediate-to-expert users includes:
• Photoshop
• Dreamweaver
• Excel
• Code development environments
• System-administration tools for web servers
In contrast, here are some things designed for occasional users:
• Kiosks in tourist centers or museums
• Windows or Mac OS controls for setting desktop backgrounds
• Purchase pages for online stores
• Installation wizards
• Automated teller machines
The differences between the two groups are dramatic. Assumptions about users’ tool
knowledge permeate these interfaces, showing up in their screen-space usage, labeling,
and widget sophistication, and in the places where help is (or isn’t) offered.
The applications in the first group have lots of complex functionality, but they don’t generally walk the user through tasks step by step. They assume users already know what to
do, and they optimize for efficient operation, not learnability; they tend to be documentcentered or list-driven (with a few being command-line applications). They often have
entire books and courses written about them. Their learning curves are steep.

-- 35 of 577 --

8 Chapter 1: What Users Do
The applications in the second group are the opposite: restrained in functionality but
helpful about explaining it along the way. They present simplified interfaces, assuming no
prior knowledge of document- or list-centered application styles (e.g., menu bars, multiple selection, etc.). Wizards frequently show up, removing attention-focusing responsibility from the user. The key is that users aren’t motivated to work hard at learning these
applications—it’s usually just not worth it!
Now that you’ve seen the extremes, look at the applications in the middle of the continuum:
• Microsoft PowerPoint
• Email clients
• Facebook
• Blog-writing tools
The truth is that most applications fall into this middle ground. They need to serve people on both ends adequately—to help new users learn the tool (and satisfy their need
for instant gratification), while enabling frequent-user intermediates to get things done
smoothly. Their designers probably knew that people wouldn’t take a three-day course to
learn an email client. Yet the interfaces hold up under repeated usage. People quickly learn
the basics, reach a proficiency level that satisfies them, and don’t bother learning more
until they are motivated to do so for specific purposes.
You may someday find yourself in tension between the two ends of this spectrum.
Naturally you want people to be able to use your design “out of the box,” but you might
also want to support frequent or expert users as much as possible. Find a balance that
works for your situation. Organizational patterns in Chapter 2, such as Multi-Level Help,
can help you serve both constituencies.
The Patterns
Even though individuals are unique, people behave predictably. Designers have been
doing site visits and user observations for years; cognitive scientists and other researchers
have spent many hundreds of hours watching how people do things and how they think
about what they do.
So, when you observe people using your software, or doing whatever activity you want to
support with new software, you can expect them to do certain things. The behavioral patterns that follow are often seen in user observations. Odds are good that you’ll see them
too, especially if you look for them.
(A note for pattern enthusiasts: these patterns aren’t like the others in this book. They
describe human behaviors—not interface design elements—and they’re not prescriptive,
like the patterns in other chapters. Instead of being structured like the other patterns,
these are presented as small essays.)

-- 36 of 577 --

The Patterns 9
Again, an interface that supports these patterns well will help users achieve their goals
far more effectively than interfaces that don’t support them. And the patterns are not just
about the interface, either. Sometimes the entire package—interface, underlying architecture, feature choice, documentation, everything—needs to be considered in light of these
behaviors. But as the interface designer or interaction designer, you should think about
these as much as anyone on your team. You might be in a better place than anyone to
advocate for the users.
1. Safe Exploration
2. Instant Gratification
3. Satisficing
4. Changes in Midstream
5. Deferred Choices
6. Incremental Construction
7. Habituation
8. Microbreaks
9. Spatial Memory
10. Prospective Memory
11. Streamlined Repetition
12. Keyboard Only
13. Other People’s Advice
14. Personal Recommendations
Safe Exploration
“Let me explore without getting lost or getting into trouble.”
When someone feels like she can explore an interface and not suffer dire consequences,
she’s likely to learn more—and feel more positive about it—than someone who doesn’t explore. Good software allows people to try something unfamiliar, back out, and try something else, all without stress.
Those “dire consequences” don’t even have to be very bad. Mere annoyance can be enough
to deter someone from trying things out voluntarily. Clicking away pop-up windows, reentering data that was mistakenly erased, suddenly muting the volume on one’s laptop
when a website unexpectedly plays loud music—all can be discouraging. When you design almost any kind of software interface, make many avenues of exploration available
for users to experiment with, without costing the user anything.

---

## Sección 11: Chapter 1

-- 37 of 577 --

10 Chapter 1: What Users Do
Here are some examples:
• A photographer tries out a few image filters in an image-processing application. He
then decides he doesn’t like the results, and clicks Undo a few times to get back to
where he was. Then he tries another filter, and another, each time being able to back
out of what he did. (The pattern named Multi-Level Undo, in Chapter 6, describes how
this works.)
• A new visitor to a company’s home page clicks various links just to see what’s there,
trusting that the Back button will always get her back to the main page. No extra
windows or pop ups open, and the Back button keeps working predictably. You can
imagine that if a web app does something different in response to the Back button—
or if an application offers a button that seems like a Back button, but doesn’t behave
quite like it—confusion might ensue. The user can get disoriented while navigating,
and may abandon the app altogether.
Instant Gratification
“I want to accomplish something now, not later.”
People like to see immediate results from the actions they take—it’s human nature. If
someone starts using an application and gets a “success experience” within the first few
seconds, that’s gratifying! He’ll be more likely to keep using it, even if it gets harder later.
He will feel more confident in the application, and more confident in himself, than if it
had taken a while to figure things out.
The need to support instant gratification has many design ramifications. For instance, if
you can predict the first thing a new user is likely to do, you should design the UI to make
that first thing stunningly easy. If the user’s goal is to create something, for instance, then
create a new canvas, put a call to action on it, and place a palette next to it. If the user’s goal
is to accomplish some task, point the way toward a typical starting point.
This also means you shouldn’t hide introductory functionality behind anything that
needs to be read or waited for, such as registrations, long sets of instructions, slow-to-load
screens, advertisements, and so on. These are discouraging because they block users from
finishing that first task quickly.

-- 38 of 577 --

The Patterns 11
Satisficing
“This is good enough.
I don’t want to spend more time learning to do it better.”
When people look at a new interface, they don’t read every piece of it methodically and
then decide, “Hmmm, I think this button has the best chance of getting me what I want.”
Instead, a user will rapidly scan the interface, pick whatever he sees first that might get
him what he wants, and try it—even if it might be wrong.
The term satisficing is a combination of satisfying and sufficing. It was coined in 1957 by
the social scientist Herbert Simon, who used it to describe the behavior of people in all
kinds of economic and social situations. People are willing to accept “good enough” instead of “best” if learning all the alternatives might cost time or effort.
Satisficing is actually a very rational behavior, once you appreciate the mental work necessary to “parse” a complicated interface. As Steve Krug points out in his book Don’t Make
Me Think (New Riders), people don’t like to think any more than they have to—it’s work!
But if the interface presents an obvious option or two that the user sees immediately, he’ll
try it. Chances are good that it will be the right choice, and if not, there’s little cost in backing out and trying something else (assuming that the interface supports Safe Exploration).
This means several things for designers:
• Use “calls to action” in the interface. Give directions on what to do first: type here,
drag an image here, tap here to begin, and so forth.
• Make labels short, plainly worded, and quick to read. (This includes menu items,
buttons, links, and anything else identified by text.) They’ll be scanned and guessed
about; write them so that a user’s first guess about meaning is correct. If he guesses
wrong several times, he’ll be frustrated, and you’ll both be off to a bad start.
• Use the layout of the interface to communicate meaning. Chapter 4 explains how to
do so in detail. Users “parse” color and form on sight, and they follow these cues more
efficiently than labels that must be read.
• Make it easy to move around the interface, especially for going back to where a wrong
choice might have been made hastily. Provide “escape hatches” (see Chapter 3). On
typical websites, using the Back button is easy, so designing easy forward/backward
navigation is especially important for web apps, installed applications, and mobile
devices.
• Keep in mind that a complicated interface imposes a large cognitive cost on new
users. Visual complexity will often tempt nonexperts to satisfice: they look for the
first thing that may work.

-- 39 of 577 --

12 Chapter 1: What Users Do
Satisficing is why many users end up with odd habits after they’ve been using a system
for a while. Long ago, a user may have learned Path A to do something, and even though
a later version of the system offers Path B as a better alternative (or maybe it was there
all along), he sees no benefit in learning it—that takes effort, after all—and keeps using the
less-efficient Path A. It’s not necessarily an irrational choice. Breaking old habits and learning
something new takes energy, and a small improvement may not be worth the cost to the user.
Changes in Midstream
“I changed my mind about what I was doing.”
Occasionally, people change what they’re doing while in the middle of doing it. Someone
may walk into a room with the intent of finding a key she had left there, but while she’s there,
she finds a newspaper and starts reading it. Or she may visit Amazon.com to read product
reviews, but ends up buying a book instead. Maybe she’s just sidetracked; maybe the change
is deliberate. Either way, the user’s goal changes while she’s using the interface you designed.
This means designers should provide opportunities for people to do that. Make choices
available. Don’t lock users into a choice-poor environment with no connections to other
pages or functionality unless there’s a good reason to do so. Those reasons do exist. See
the patterns called Wizard (Chapter 2) and Modal Panel (Chapter 3) for examples.
You can also make it easy for someone to start a process, stop in the middle, and come
back to it later to pick up where he left off—a property often called reentrance. For instance, a lawyer may start entering information into a form on an iPad. Then, when a client comes into the room, the lawyer turns off the device, with the intent of coming back
to finish the form later. The entered information shouldn’t be lost.
To support reentrance, you can make dialogs and web forms remember values typed previously, and they don’t usually need to be modal; if they’re not modal, they can be dragged
aside on the screen for later use. Builder-style applications—text editors, code development environments, and paint programs—can let a user work on multiple projects at one
time, thus letting her put any number of projects aside while she works on another one.
See the Many Workspaces pattern in Chapter 2 for more information.
Deferred Choices
“I don’t want to answer that now; just let me finish!”
This follows from people’s desire for instant gratification. If you ask a task-focused user
unnecessary questions in the process, he may prefer to skip the questions and come back
to them later.

---

## Sección 12: Chapter 1

-- 40 of 577 --

The Patterns 13
For example, some web-based bulletin boards have long and complicated procedures
for registering users. Screen names, email addresses, privacy preferences, avatars, selfdescriptions…the list goes on and on. “But I just wanted to post one little thing,” says the
user plaintively. Why not allow him to skip most of the questions, answer the bare minimum, and come back later (if ever) to fill in the rest? Otherwise, he might be there for half
an hour answering essay questions and finding the perfect avatar image.
Another example is creating a new project in a website editor. There are some things you
do have to decide up front, such as the name of the project, but other choices—where on
the server are you going to put this when you’re done? I don’t know yet!—can easily be
deferred.
Sometimes it’s just a matter of not wanting to answer the questions. At other times, the
user may not have enough information to answer yet. What if a music-writing software
package asked you up front for the title, key, and tempo of a new song, before you’ve even
started writing it? (See Apple’s GarageBand for this bit of “good” design.)
The implications for interface design are simple to understand, though not always easy
to implement:
• Don’t accost the user with too many upfront choices in the first place.
• On the forms that he does have to use, clearly mark the required fields, and don’t
make too many of them required. Let him move on without answering the optional
ones.
• Sometimes you can separate the few important questions or options from others that
are less important. Present the short list; hide the long list.
• Use Good Defaults (Chapter 8) wherever possible, to give users some reasonable default answers to start with. But keep in mind that prefilled answers still require the
user to look at them, just in case they need to be changed. They have a small cost, too.
• Make it possible for users to return to the deferred fields later, and make them accessible in obvious places. Some dialog boxes show the user a short statement, such as
“You can always change this later by clicking the Edit Project button.” Some websites
store a user’s half-finished form entries or other persistent data, such as shopping
carts with unpurchased items.
• If registration is required at a website that provides useful services, users may be far
more likely to register if they’re first allowed to experience the website—drawn in
and engaged—and then asked later about who they are. Some sites let you complete
an entire purchase without registering, then ask you at the end if you want to create a
no-hassle login with the personal information provided in the purchase step.

-- 41 of 577 --

14 Chapter 1: What Users Do
Incremental Construction
“Let me change this. That doesn’t look right; let me change it again.
That’s better.”
When people create things, they don’t usually do it all in a precise order. Even an expert
doesn’t start at the beginning, work through the creation process methodically, and come
out with something perfect and finished at the end.
Quite the opposite. Instead, she starts with some small piece of it, works on it, steps back
and looks at it, tests it (if it’s code or some other “runnable” thing), fixes what’s wrong, and
starts to build other parts of it. Or maybe she starts over, if she really doesn’t like it. The
creative process goes in fits and starts. It moves backward as much as forward sometimes,
and it’s often incremental, done in a series of small changes instead of a few big ones.
Sometimes it’s top-down; sometimes it’s bottom-up.
Builder-style interfaces need to support that style of work. Make it easy for users to build
small pieces. Keep the interface responsive to quick changes and saves. Feedback is critical: constantly show the user what the whole thing looks and behaves like, while the user
works. If the user builds code, simulations, or other executable things, make the “compile”
part of the cycle as short as possible, so the operational feedback feels immediate—leave
little or no delay between the user making changes and seeing the results.
When creative activities are well supported by good tools, they can induce a state of flow
in the user. This is a state of full absorption in the activity, during which time distorts,
other distractions fall away, and the person can remain engaged for hours—the enjoyment
of the activity is its own reward. Artists, athletes, and programmers all know this state.
But bad tools will keep users distracted, guaranteed. If the user has to wait even half a
minute to see the results of the incremental change she just made, her concentration is
broken; flow is disrupted.
If you want to read more about flow, read the books by Mihaly Csikszentmihalyi, who
studied it for years.
Habituation
“That gesture works everywhere else; why doesn’t it work here, too?”
When one uses an interface repeatedly, some frequent physical actions become reflexive:
pressing Ctrl-S to save a document, clicking the Back button to leave a web page, pressing Return to close a modal dialog box, using gestures to show and hide windows—even
pressing a car’s brake pedal. The user no longer needs to think consciously about these
actions. They’ve become habitual.

-- 42 of 577 --

The Patterns 15
This tendency helps people become expert users of a tool (and helps create a sense of flow,
too). Habituation also measurably improves efficiency, as you can imagine. But it can also
lay traps for the user. If a gesture becomes a habit, and the user tries to use it in a situation
when it doesn’t work—or, worse, does something destructive—the user is caught short.
He suddenly has to think about the tool again (What did I just do? How do I do what I
intended?), and he might have to undo any damage done by the gesture.
For instance, Ctrl-X→Ctrl-S is the “save this file” key sequence used by the Emacs text
editor. Ctrl-A moves the text-entry cursor to the beginning of a line. These keystrokes
become habitual for Emacs users. When a user presses Ctrl-A→Ctrl-X→Ctrl-S in Emacs,
it performs a fairly innocuous pair of operations: move the cursor, save the file.
Now what happens when he types that same habituated sequence in Microsoft Word?
1. Ctrl-A: Select all
2. Ctrl-X: Cut the selection (the whole document, in this case)
3. Ctrl-S: Save the document (whoops)
This is why consistency across applications is important! (And also why a robust “undo”
is useful.)
Just as important, though, is consistency within an application. Some applications are evil
because they establish an expectation that some gesture will do Action X, except in one
special mode where it suddenly does Action Y. Don’t do that. It’s a sure bet that users will
make mistakes, and the more experienced they are—that is, the more habituated they
are—the more likely they are to make that mistake.
Consider this carefully if you’re developing gesture-based interfaces for mobile devices.
Once someone learns how to use his device and gets used to it, he will depend on the
standard gestures working consistently on all applications. Check that gestures in your
design all do the expected things.
This is also why confirmation dialog boxes often don’t work to protect a user against accidental changes. When modal dialog boxes pop up, the user can easily get rid of them just
by clicking OK or pressing Return (if the OK button is the default button). If the dialogs
pop up all the time when the user makes intended changes, such as deleting files, clicking
OK becomes a habituated response. Then, when it actually matters, the dialog box doesn’t
have any effect, because it slips right under the user’s consciousness.
(I’ve seen at least one application that sets up the confirmation dialog box’s buttons randomly from one invocation to another. One actually has to read the buttons to figure out
what to click! This isn’t necessarily the best way to do a confirmation dialog box—in fact,
it’s better to not have them at all under most circumstances—but at least this design sidesteps habituation creatively.)

---

## Sección 13: Chapter 1

-- 43 of 577 --

16 Chapter 1: What Users Do
Microbreaks
“I’m waiting for the train. Let me do something useful for two minutes.”
People often find themselves with a few minutes of down time. They might need a mental
break while working; they might be in line at a store or sitting in a traffic jam. They might
be bored or impatient. They want to do something constructive or entertaining to pass the
time, knowing they won’t have enough time to get deep into an online activity.
This pattern is especially applicable to mobile devices, because people can easily pull them
out at times such as these.
Here are some typical activities during microbreaks:
• Checking email
• Reading a News Stream (in Chapter 2) such as Facebook or Twitter
• Visiting a news site to find out what’s going on in the world
• Watching a short video
• Doing a quick web search
• Reading an online book
• Playing a short game
The key to supporting microbreaks is to make an activity easy and fast to reach—as easy
as turning on the device and selecting an application (or website). Don’t require complicated setup. Don’t take forever to load. And if the user needs to sign in to a service, try to
retain the previous authentication so that she doesn’t have to sign in every time.
For News Stream services, load the freshest content as quickly as possible and show it in
the first screen the user sees. Other activities, such as games, videos, or online books,
should remember where the user left them last time and restore the app or site to its previous state, without asking (thus supporting reentrance).
If you’re designing an email application, or anything else for which the user needs to do
“housekeeping” to maintain order, give her a way to triage items efficiently. This means
showing enough data per item so that she can identify, for instance, a message’s contents
and sender. You can also give her a chance to “star” or otherwise annotate items of interest, delete items easily, and write short responses and updates.
Long load times deserve another mention. Taking too long to load content is a sure way
to make users give up on your app—especially during microbreaks! Make sure the page is
engineered so that readable, useful content loads first, and with very little delay.

-- 44 of 577 --

The Patterns 17
Spatial Memory
“I swear that button was here a minute ago. Where did it go?”
When people manipulate objects and documents, they often find them again later by
remembering where they are, not what they’re named.
Take the Windows, Mac, or Linux desktop. Many people use the desktop background as a
place to put documents, frequently used applications, and other such things. It turns out
that people tend to use spatial memory to find things on the desktop, and it’s very effective. People devise their own groupings, for instance, or recall that “this document was
at the top right over by such-and-such.” (Naturally, there are real-world equivalents, too.
Many people’s desks are “organized chaos,” an apparent mess in which the office owner
can find anything instantly. But heaven forbid that someone should clean it up for him.)
Many applications put their dialog buttons—OK, Cancel, and so on—in predictable places, partly because spatial memory for them is so strong. In complex applications, people
may also find things by remembering where they are relative to other things: tools on
toolbars, objects in hierarchies, and so forth. Therefore, you should use patterns such as
Responsive Disclosure (Chapter 4) carefully. Adding items to blank spaces in an interface
doesn’t cause problems, but rearranging existing controls can disrupt spatial memory and
make things harder to find. It depends. Try it out on your users if you’re not sure.
Along with habituation, which is closely related, spatial memory is another reason why
consistency across and within a platform’s applications is good. People may expect to
find similar functionality in similar places. See the Sign-in Tools pattern (Chapter 3) for
an example.
Spatial memory explains why it’s good to provide user-arranged areas for storing documents and objects, such as the aforementioned desktop. Such things aren’t always practical, especially with large numbers of objects, but it works quite well with small numbers.
When people arrange things themselves, they’re likely to remember where they put them.
(Just don’t rearrange it for them unless they ask!) The Movable Panels pattern in Chapter 4
describes one particular way to do this.
Also, this is why changing menus dynamically can sometimes backfire. People get used to
seeing certain items on the tops and bottoms of menus. Rearranging or compacting menu
items “helpfully” can work against habituation and lead to user errors. So can changing
navigation menus on web pages. Try to keep menu items in the same place, and in the
same order, on all subpages in a site.
Incidentally, the tops and bottoms of lists and menus are special locations, cognitively
speaking. People notice and remember them more than items in the middle of a list. The
first and last items are perhaps the worst ones to change out from under the user.

-- 45 of 577 --

18 Chapter 1: What Users Do
Prospective Memory
“I’m putting this here to remind myself to deal with it later.”
Prospective memory is a well-known phenomenon in psychology that doesn’t seem to
have gained much traction yet in interface design. But I think it should.
We engage in prospective memory when we plan to do something in the future, and we
arrange some way of reminding ourselves to do it. For example, if you need to bring a
book to work the next day, you might put it on a table beside the front door the night
before. If you need to respond to someone’s email later (just not right now!), you might
leave that email on your screen as a physical reminder. Or if you tend to miss meetings,
you might arrange for Outlook or your mobile device to ring an alarm tone five minutes
before each meeting.
Basically, this is something almost everyone does. It’s a part of how we cope with our
complicated, highly scheduled, multitasked lives: we use knowledge “in the world” to aid
our own imperfect memories. We need to be able to do it well.
Some software does support prospective remembering. Outlook and most mobile platforms, as mentioned earlier, implement it directly and actively; they have calendars, and
they sound alarms. But what else can you use for prospective memory?
• Notes to oneself, like virtual “sticky notes”
• Windows left on-screen
• Annotations put directly into documents (such as “Finish me!”)
• Browser bookmarks, for websites to be viewed later
• Documents stored on the desktop, rather than in the usual places in the filesystem
• Email kept in an inbox (and maybe flagged) instead of filed away
People use all kinds of artifacts to support passive prospective remembering. But notice
that almost none of the techniques in the preceding list were designed with that in mind!
What they were designed for is flexibility—and a laissez-faire attitude toward how users
organize their stuff. A good email client lets you create folders with any names you want,
and it doesn’t care what you do with messages in your inbox. Text editors don’t care what
you type, or what giant bold magenta text means to you; code editors don’t care that you
have a “Finish this” comment in a method header. Browsers don’t care why you keep
certain bookmarks around.
In many cases, that kind of hands-off flexibility is all you really need. Give people the tools
to create their own reminder systems. Just don’t try to design a system that’s too smart for
its own good. For instance, don’t assume that just because a window’s been idle for a while,
that no one’s using it and it should be closed. In general, don’t “helpfully” clean up files or

---

## Sección 14: Chapter 1

-- 46 of 577 --

The Patterns 19
objects that the system may think are useless; someone may be leaving them around for
a reason. Also, don’t organize or sort things automatically unless the user asks the system
to do so.
As a designer, is there anything positive you can do for prospective memory? If someone
leaves a form half-finished and closes it temporarily, you could retain the data in it for
the next time—it will help remind the user where she left off. (See the Deferred Choices
pattern.) Similarly, many applications recall the last few objects or documents they edited. You could offer bookmark-like lists of “objects of interest”—both past and future—
and make those lists easily available for reading and editing. You can implement Many
Workspaces, which lets users leave unfinished pages open while they work on something
else.
Here’s a bigger challenge: if the user starts tasks and leaves them without finishing them,
think about how to leave some artifacts around, other than open windows, that identify
the unfinished tasks. Another idea: how might a user gather reminders from different
sources (email, documents, calendars, etc.) into one place? Be creative!
Streamlined Repetition
“I have to repeat this how many times?”
In many kinds of applications, users sometimes find themselves having to perform the
same operation over and over again. The easier it is for them, the better. If you can help
reduce that operation down to one keystroke or click per repetition—or, better, just a few
keystrokes or clicks for all repetitions—you will spare users much tedium.
Find and Replace dialog boxes, often found in text editors (Word, email composers, etc.),
are one good adaptation to this behavior. In these dialog boxes, the user types the old
phrase and the new phrase. Then it takes only one Replace button click per occurrence in
the whole document. And that’s only if the user wants to see or veto each replacement—if
she’s confident that she really should replace all occurrences, she can click the Replace All
button; one gesture does the whole job.
Here’s a more general example. Photoshop lets you record “actions” when you want to
perform some arbitrary sequence of actions with a single click. If you want to resize, crop,
brighten, and save 20 images, you can record those four steps as they’re done to the first
image, and then click that action’s Play button for each of the remaining 19. See the Macros
pattern in Chapter 6 for more information.
Scripting environments are even more general. Unix and its variants allow you to script
anything you can type into a shell. You can recall and execute single commands, even
long ones, with a Ctrl-P and Return. You can take any set of commands you issue to the
command line, put them in a for loop, and execute them by pressing the Return key once.

-- 47 of 577 --

20 Chapter 1: What Users Do
Or you can put them in a shell script (or in a for loop in a shell script) and execute them as
a single command. Scripting is very powerful, and when complex, it becomes full-fledged
programming.
Other variants include copy-and-paste capability (preventing the need to retype the same
thing in a million places), user-defined “shortcuts” to applications on operating-system
desktops (preventing the need to find those applications’ directories in the filesystem),
browser bookmarks (so users don’t have to type URLs), and even keyboard shortcuts.
Direct observation of users can help you figure out just what kinds of repetitive tasks you
need to support. Users won’t always tell you outright. They may not even be aware that
they’re doing repetitive things that could be streamlined with the right tools—they may
have been doing it so long that they don’t even notice anymore. By watching them work,
you may see what they don’t see.
In any case, the idea is to offer users ways to streamline the repetitive tasks that could
otherwise be time-consuming, tedious, and error-prone.
Keyboard Only
“Please don’t make me use the mouse.”
Some people have real physical trouble using a mouse. Others prefer not to keep switching between the mouse and keyboard because that takes time and effort—they’d rather
keep their hands on the keyboard at all times. Still others can’t see the screen, and their
assistive technologies often interact with the software using just the keyboard API.
For the sakes of these users, some applications are designed to be “driven” entirely via the
keyboard. They’re usually mouse-driven too, but there is no operation that must be done
with only the mouse—keyboard-only users aren’t shut out of any functionality.
Several standard techniques exist for keyboard-only usage:
• You can define keyboard shortcuts, accelerators, and mnemonics for operations
reachable via application menu bars, such as Ctrl-S for Save. See your platform style
guide for the standard ones.
• Selection from lists, even multiple selection, is usually possible using arrow keys in
combination with modifiers (such as the Shift key), though this depends on which
component set you use.
• The Tab key typically moves the keyboard focus—the control that gets keyboard entries at the moment—from one control to the next, and Shift-Tab moves backward.
This is sometimes called tab traversal. Many users expect it to work on form-style
interfaces.

-- 48 of 577 --

The Patterns 21
• Most standard controls, even radio buttons and combo boxes, let users change their
values from the keyboard by using arrow keys, the Return key, or the space bar.
• Dialog boxes and web pages often have a “default button”—a button representing
an action that says “I’m done with this task now.” On web pages, it’s often Submit or
Done; on dialog boxes, OK or Cancel. When users press the Return key on this page
or dialog box, that’s the operation that occurs. Then it moves the user to the next page
or returns him to the previous window.
There are more techniques. Forms, control panels, and standard web pages are fairly easy
to drive from the keyboard. Graphic editors, and anything else that’s mostly spatial, are
much harder, though not impossible.
Keyboard-only usage is particularly important for data-entry applications. In these,
speed of data entry is critical, and users can’t afford to move their hands off the keyboard
to the mouse every time they want to move from one field to another or even one page
to another. (In fact, many of these forms don’t even require users to press the Tab key to
traverse between controls; it’s done automatically.)
Other People’s Advice
“What did everyone else say about this?”
People are social. As strong as our opinions may sometimes be, we tend to be influenced
by what our peers think.
Witness the spectacular growth of online “user comments”: Amazon for books (and everything else), IMDb for movies, Flickr for photographs, and countless retailers who offer
space for user-submitted product reviews. Auction sites such as eBay formalize user opinions into actual prices. Blogs offer unlimited soapbox space for people to opine about and
discuss anything they want, from products to programming to politics.
The advice of peers, whether direct or indirect, influences people’s choices when they decide any number of things. Finding things online, performing transactions (Should I buy
this product?), playing games (What have other players done here?), and even building
things—people can be more effective when aided by others. If not, they might at least be
happier with the outcome.
Here’s a subtler example. Programmers use the MATLAB application to do scientific and
mathematical tasks. Every few months, the company that makes MATLAB holds a public
programming contest; for a few days, every contestant writes the best MATLAB code he
can to solve a difficult science problem. The fastest, most accurate code wins. The catch is
that every player can see everyone else’s code—and copying is encouraged! The “advice”
in this case is indirect, taking the form of shared code, but it’s quite influential. In the end,

---

## Sección 15: Chapter 1

-- 49 of 577 --

22 Chapter 1: What Users Do
the winning program is never truly original, but it’s undoubtedly better code than any solo
effort would have been. (In many respects, this is a microcosm of open source software
development, which is driven by a powerful set of social dynamics.)
Not all applications and software systems can accommodate a social component, and not
all should try. But consider whether it might enhance the user experience to do so. And
you could get more creative than just tacking a web-based bulletin board onto an ordinary
site—how can you persuade users to take part constructively? How can you integrate it
into the typical user’s workflow?
If the task is creative, maybe you can encourage people to post their creations for the public to view. If the goal is to find some fact or object, perhaps you can make it easy for users
to see what other people found in similar searches.
Of the patterns in this book, Multi-Level Help (Chapter 2) most directly addresses this
idea; an online support community is a valuable part of a complete help system for some
applications.
Personal Recommendations
“My friend told me to read this, so it must be pretty good.”
This pattern operates on the same principle as the previous one—we are strongly influenced by our peers. So much so, in fact, that we are much more likely to view the articles
and videos that someone refers us to than those we find in some other way. The personal
touch makes a big difference when we decide what to read online.
Therefore, support person-to-person sharing of content. Let people send a URL (or
the content itself) to friends and family, either via email or via a social network such as
Facebook or Buzz.
This implies a host of mechanisms that need to be used or designed in. First, what exactly
are users sharing? If the content doesn’t already have a URL, see if one can be constructed
for it. (The Deep-linked State pattern in Chapter 3 talks about this.) This URL should direct the recipient to a page with the same content that the sender was seeing, to avoid
confusion.
Second, whom will they share it with? Let users connect to a social network, or give them
a way to send email.
Third, what implications does this reference have? If a user sends email to a few “close ties,”
along with a personal message—one the user typed, not an automatic “personal message!—
that can potentially carry a very high recommendation. After all, someone cared enough
to think about you and take time to write a note. The specialness declines as the sender
CCs more and more email addresses, though.

-- 50 of 577 --

The Patterns 23
When a user posts a link to her Facebook or Twitter stream, that carries other implications: “I thought this was cool, and it represents something about who I am.” Followers
are still likely to read these links, especially if they trust that the poster has good taste.
Furthermore, followers may repost or retweet it themselves, as will their followers, ad
infinitum. This is how memes start, content goes viral, and the social web rolls on.

-- 51 of 577 --

-- 52 of 577 --

---

## Sección 16: Chapter 2

Organizing the Content: Information
Architecture and Application Structure
At this point, you know what your users want out of your application or site. You’re targeting a chosen platform: the Web, the desktop, a mobile device, or some combination. You
know which idiom or interface type to use—a form, an e-commerce site, an image viewer,
or something else—or you may realize that you need to combine several of them. If you’re
really on the ball, you’ve written down some typical scenarios that describe how people
might use high-level elements of the application to accomplish their goals. You have a
clear idea of what value this application adds to people’s lives.
Now what?
You could start making sketches of the interface. Many visual thinkers do that at this stage.
If you’re the kind of person who likes to think visually and needs to play with sketches
while working out the broad strokes of the design, go for it.
But if you’re not a visual thinker by nature (and sometimes even if you are), hold off on
the interface sketches. They might lock your thinking into the first visual designs you put
on paper. You need to stay flexible and creative for a little while, until you work out the
overall organization of the application.
It can be helpful to think about an application in terms of its underlying data and tasks.
What objects are being shown to the users? How are they categorized and ordered? What
do users need to do with them? And now that you’re thinking abstractly about them, how
many ways can you design a presentation of those things and tasks?
These lines of inquiry may help you think more creatively about the interface you’re
designing.
Information architecture (IA) is the art of organizing an information space. It encompasses
many things: presenting, searching, browsing, labeling, categorizing, sorting, manipulating, and strategically hiding information. Especially if you’re working with a new product,
this is where you should start.

-- 53 of 577 --

26 Chapter 2: Organizing the Content: Information Architecture and Application Structure
The Big Picture
Let’s look at the very highest level of your application first. From the designer’s perspective, your site or application probably serves several functions: a software service—maybe
several services—sharing information, selling a product, branding, social communication, or any number of other goals. Your home page or opening screen may need to convey all of these. Via text and imagery, users should be directed to the part of your site or
app that accomplishes their purposes.
At this level, you’ll make decisions about the whole package. What interaction model will
it use? The desktop metaphor? The simpler model of a traditional website? Or a richly interactive site that splits the difference? Is it a self-contained device such as a mobile phone
or digital video recorder, for which you must design the interactions from scratch? The
interaction model establishes consistency throughout the artifact, and it determines how
users move through and among the different pieces of functionality. I won’t go into more
detail at this level, because almost all of the patterns in this book apply at smaller scales.
Now let’s look at a smaller unit within an application or site: pages that serve single important functions. In an application, this might be a main screen or a major interactive
tool; in a richly interactive website, it might be a single page, such as Gmail’s main screen;
in a more static website, it might be a group of pages devoted to one process or function.
Any such page will primarily do one of these things:
1. Show one single thing, such as a map, book, video, or game
2. Show a list or set of things
3. Provide tools to create a thing
4. Facilitate a task
Most apps and sites do some combination of these things, of course. A website might
show a feature article (1), a list of additional articles (2), with a wiki area for members to
create pages (3), and a registration form for new members (4). That’s fine. Each of these
parts of the site should be designed using patterns and tools to fit that particular organizing principle.
This list mirrors some of the work done by Theresa Neil with application structures in the
context of rich Internet applications (RIAs). She defines three types of structures based on
the user’s primary goal: information, process, and creation. *
This list gives us a framework within which to fit the idioms and patterns we’ll talk about
in this and other chapters.
* “Rich Internet Screen Design,” in UX Magazine: http://www.uxmag.com/design/rich-internet-applicationscreen-design.

-- 54 of 577 --

The Big Picture 27
Show One Single Thing
Is this really what your page does? The whole point of the page’s design is to show or play a
single piece of content, with no list of other pieces that users could also see, no comments,
and no table of contents or anything like that?
Lucky you!
All you really need, then, is to manage the user’s interaction with this one thing. The
IA is probably straightforward. There might be small-scale tools clustered around the
content—scrollers and sliders, sign-in box, global navigation, headers and footers, and
so forth—but they are minor and easily designed. Your design might take one of these
shapes:
• A long, vertically scrolled page of flowed text (articles, books, and similar long-form
content).
• A zoomable interface for very large, fine-grained artifacts, such as maps, images,
or information graphics. Map sites such as Google Maps provide some well-known
examples.
• The “media player” idiom, including video and audio players.
As you design this interface, consider the following patterns and techniques to support
the design:
• Alternative Views, to show the content in more than one way.
• Many Workspaces, in case people want to see more than one place, state, or document
at one time.
• Deep-linked State, in Chapter 3. With this, a user can save a certain place or state
within the content so that he can come back to it later or send someone else a URL.
• Sharing Widget and other social patterns, in Chapter 9.
• Some of the mobile patterns described in Chapter 10, if one of your design goals is to
deliver the content on mobile devices.
Show a List of Things
This is what most of the world’s digital artifacts seem to do. Lists are everywhere! The
digital world has converged on many common idioms for showing lists, most of which
are familiar to you—simple text lists, menus, grids of images, search results, lists of email
messages or other communications, tables, trees. There are more, of course.
Lists present rich challenges in information architecture. How long is the list? Is it flat or
hierarchical, and if it is a hierarchy, what kind? How is it ordered, and can the user change
that ordering dynamically? Should it be filtered or searched? What information or operations are associated with each list item, and when and how should they be shown?

---

## Sección 17: Chapter 2

-- 55 of 577 --

28 Chapter 2: Organizing the Content: Information Architecture and Application Structure
Because lists are so common, a solid grasp of the different ways to present them can
benefit any designer. It’s the same theme again—by learning and formalizing these techniques, you can expand your own thinking about how to present content in different and
interesting ways.
A few patterns for designing an interface around a list are described in this chapter (others
are in Chapter 5). You can build either an entire app or site, or a small piece of a larger artifact, around one of these patterns. They set up a structure that other display techniques—
text lists, thumbnail lists, and so on—can fit into. Other top-level organizations not listed
here might include calendars, full-page menus, and search results.
• Feature, Search, and Browse is the pattern followed by countless websites that show
products and written content. Searching and browsing provide two ways for users to
find items of interest, while the front page features one item to attract interest.
• Blogs, news sites, email readers, and social sites such as Twitter all use the News Stream
pattern to list their content, with the most recent updates at the top.
• Picture Manager is a well-defined interface type for handling photos and other pictorial documents. It can accommodate hierarchies and flat lists, tools to arrange and
reorder documents, tools to operate directly on pictures, and so on.
Once you’ve chosen an overall design for the interface, you might look at other patterns
and techniques for displaying lists. These fit into the patterns mentioned earlier; for
instance, a Picture Manager might use a Thumbnail Grid, a Pagination, or both to show a
list of photos—all within a Two-Panel Selector framework. See Chapter 5 for a thorough
discussion.
Provide Tools to Create a Thing
Builders and editors are the great dynastic families of the software world. Microsoft
Word, Excel, PowerPoint, and other Office applications, in addition to Adobe Photoshop,
Illustrator, In Design, Dreamweaver, and other tools that support designers are all in this
category. So are the tools that support software engineers, such as the various code editors
and integrated development environments. These have long histories, large user bases,
and very well established interaction styles, honed over many years.
Most people are familiar with the idioms used by these tools: text editors, code editors,
image editors, editors that create vector graphics, and spreadsheets.

---

## Sección 18: Chapter 8 of the previous edition of this book discusses how to design different aspects of

these tools. But at the level of application structure or IA, the following patterns are often
found:
• Canvas Plus Palette describes most of these applications. This highly recognizable,
well-established pattern for visual editors sets user expectations very strongly.
• Almost all applications of this type provide Many Workspaces—usually windows containing different documents, which enable users to work on them in parallel.

-- 56 of 577 --

The Patterns 29
• Alternative Views let users see one document or workspace through different lenses, to
view various aspects of the thing they’re creating.
• “Blank Slate Invitation” is named and written about in Designing Web Interfaces
(http://oreilly.com/catalog/9780596516253/) by Bill Scott and Theresa Neil (O’Reilly),
and is a profoundly useful pattern for builders and editors. It is closely related to the
Input Hints pattern in Chapter 8.
Facilitate a Single Task
Maybe your interface’s job isn’t to show a list of anything or create anything, but simply to
get a job done. Signing in, registering, posting, printing, uploading, purchasing, changing
a setting—all such tasks fall into this category.
Forms do a lot of work here. Chapter 8 talks about forms at length and lists many controls
and patterns to support effective forms. Chapter 6 defines another useful set of patterns
that concentrate more on “verbs” than “nouns.”
Not much IA needs to be done if the user can do the necessary work in a small, contained
area, such as a sign-in box. But when the task gets more complicated than that—if it’s long,
or branched, or has too many possibilities—part of your job is to work out how the task
is structured.
• Much of the time, you’ll want to break the task down into smaller steps or groups of
steps. For these, a Wizard might work well for users who need to be walked through
the task.
• A Settings Editor is a very common type of interface that gives users a way to change
the settings or preferences of something—an application, a document, a product, and
so on. This isn’t a step-by-step task at all. Here, your job is to give users open access
to a wide variety of choices and switches and let them change only what they need,
when they need it, knowing that they will skip around.
The Patterns
Several of the patterns in this chapter are large-scale, defining the interactions for large
sections of applications or sites (or sometimes the entire thing). Some of these, including
Picture Manager, Canvas Plus Palette, and Feature, Search, and Browse, are really clusters of
other patterns that support each other in well-defined ways—they are “guilds” of smallerscale patterns.
1. Feature, Search, and Browse
2. News Stream
3. Picture Manager
4. Dashboard

-- 57 of 577 --

30 Chapter 2: Organizing the Content: Information Architecture and Application Structure
5. Canvas Plus Palette
6. Wizard
7. Settings Editor
The last three patterns are more “meta,” in the sense that they can apply to the other
patterns in the preceding list. For instance, almost any content, document, or list can be
shown in more than one way, and the ability to switch among those Alternative Views can
empower users.
8. Alternative Views
Likewise, a user may want to instantiate the interface more than once, to maintain several
trains of thought simultaneously—consider the tabs in a browser window, all showing different and unrelated websites. Offer the Many Workspaces pattern to these users.
9. Many Workspaces
Many patterns, here and elsewhere in the book, contribute in varying degrees to the learnability of an interface. Multi-Level Help sets out ways to integrate help into the application,
thus supporting learnability for a broad number of users and situations.
10. Multi-Level Help
Feature, Search, and Browse
Search Feature
Browse
Figure 2-1. EMS

-- 58 of 577 --

The Patterns 31
What
Put three elements on the main page of the site or app: a featured article or product, a
search box, and a list of items or categories that can be browsed.
Use when
Your site offers users long lists of items—articles, products, videos, and so on—that can be
browsed and searched. You want to engage incoming users immediately by giving them
something interesting to read or watch.
Why
These three elements are found together on many, many successful sites. Once you are
attuned to them, you can find them just about everywhere.
Searching and browsing go hand in hand as two ways to find desired items: some people
will know what they’re looking for and zero in on the search box, while others will do
more open-ended browsing through the lists and categories you show them.
Featured items are how you “hook” the user. They’re far more interesting than just category lists and search boxes, especially when you use appealing images and headlines.
A user who lands on your page now has something to read or experiment with, without
doing any additional work at all—and he may find it more interesting than whatever he
originally came for.
How
Place a search box in a prominent location, such as an upper corner, or in a banner across
the middle top of the site. Demarcate it well from the rest of the site—use whitespace to
set it off, and use a different surrounding background color if necessary.
Try to eliminate all other text fields above the fold (except the sign-in box, if you have
one), to make sure users don’t confuse those with the search box. People looking for a
search box tend to zero in on the first text field they come across. Make sure they find the
right one!
Set aside Center Stage (see Chapter 4) for the featured article, product, or video. Very near
it, and still above the fold, place an area for browsing the rest of the site’s content. Most
sites show a list of topics or product categories. These might be links to pages devoted to
those categories. Or they might change the current page’s content, replacing the feature
with a list of items in that category; see the Two-Panel Selector pattern in Chapter 5.
If the category labels open in place to show subcategories, the list behaves like a tree. Some
sites, such as Amazon, turn the category labels into menus: when the pointer rolls over the
label, a menu of subcategories appears.
Download from Wow! eBook <www.wowebook.com>

---

## Sección 19: Chapter 8 of the previous edition of this book discusses how to design different aspects of

-- 59 of 577 --

32 Chapter 2: Organizing the Content: Information Architecture and Application Structure
Choose the features well. Features are a good way to sell items, advertise specials, and call
attention to breaking news. However, they also define what your site is about. The items
you choose to feature say a lot about the site’s values. Features that talk about altruistic or
charitable efforts have a very different appeal from those that advertise specific products.
As always, know your users. What will they want to know about? What will capture their
attention and hold them at your site?
As the user browses through categories and subcategories, help him “stay found” with the
Breadcrumbs pattern (Chapter 3).
Examples
This pattern applies well to websites such as news outlets (CNET, Figure 2-2), publishers (Lulu), knowledge bases (About.com, Figure 2-3), and, of course, e-commerce sites
(Amazon, Figure 2-4; and EMS, at the top of the pattern in Figure 2-1).
Figure 2-2. CNET

-- 60 of 577 --

The Patterns 33
Figure 2-3. About.com
Figure 2-4. Amazon

-- 61 of 577 --

34 Chapter 2: Organizing the Content: Information Architecture and Application Structure
News Stream
Figure 2-5. Twitter
What
Show time-sensitive items in a reverse chronological list, with the latest items at the top.
Update it dynamically, and combine the items from different sources or people into one
single stream.
Use when
Your site or app uses one or more communication channels, such as blogs, email, social
site updates, or news sites, to deliver timely content to users.
This channel may be personal—a user “owns” it, like an email client or Facebook friends
list—or public, such as a website or public Twitter stream.
Why
People can keep up with a news stream easily, since the latest items reliably appear on top
with no effort on the part of the user. They can check in often and be assured of seeing
what they need to see.

-- 62 of 577 --

The Patterns 35
People go to many sites or apps each day to keep up with their friends’ activities, engage
in conversations, or follow topics or blogs of interest. When multiple “news” sources can
be blended in one place, it’s easier to keep track of it all.
This pattern supports the Microbreaks behavior pattern in Chapter 1. A glance at a News
Stream application can give a user lots of useful information (or entertainment) with very
little time or effort.
From the perspective of a publisher, such as a website, having a News Box (Chapter 9)
or the equivalent on your main page lets visitors see what’s new and noteworthy at your
organization. Large organizations in particular may have many initiatives going on that
would interest visitors: new products, blog entries, videos, news articles, charity work, and
other content.
How
List incoming items in reverse chronological order. If the technology permits, “push” new
items onto the top of the list without waiting for the user to request an update, but offer a
way for the user to get an immediate update or refresh anyway.
Very busy streams can be split up into manageable substreams by topic, sender, source,
search terms, or other factors—you could let the user choose which one(s) to show.
Services such as Facebook, FriendFeed, Twitter, and some RSS readers show clickable
lists of these substreams to the left or right of the incoming content (thus implementing
the Two-Panel Selector pattern). Others, such as Tweetdeck, use Many Workspaces to show
multiple parallel panels of incoming content.
Information shown with each item might include:
What
For short micro-updates, show the whole thing. Otherwise, show a title, a teaser that’s
a few words or sentences long, and a thumbnail picture if one is available.
Who
This might be the person who wrote an update, the blog where an article was posted,
the author of said article, or the sender of an email. Actual person names humanize
the interface, but balance this against recognition and authoritativeness—the names
of news outlets, blogs, companies, and so forth are important, too. Use both if that
makes sense.
When
Give a date or timestamp; consider using relative times, such as “Yesterday” and
“Eleven minutes ago.”
Where
If an item’s source is a website, link to that website. If it comes from one of your organization’s blogs, link to that. (But here’s another interpretation of “where”: can you
get geolocation data about the item, and show it on a map?)

-- 63 of 577 --

36 Chapter 2: Organizing the Content: Information Architecture and Application Structure
When there’s more to an item than can be shown easily in the list display, show a “More”
link or button. You might design a way to show the entire contents of an item within
the News Stream window. The News Stream is a list, so you can choose among Two-Panel
Selector, One-Window Drilldown, and List Inlay. Examples abound of each model.
Give the user ways to respond immediately to incoming items. Stars, thumbs-up, liking,
and favoriting are available in some systems—these all provide low-effort feedback and
“handshaking” among people who don’t have time to write out long replies. But allow
those long replies to be written, too! By placing controls and text fields immediately next
to an item in a News Stream, you encourage responsiveness and interaction. This is usually
a good thing in social systems.
Sharing of items, either privately via email or semipublicly via a provided social service, is
also common in these interfaces. See the Sharing Widget pattern in Chapter 9.
News Stream designs for mobile devices are fairly straightforward as of this writing. Almost
all of them devote the full screen to a single list—often a Thumbnail-and-Text List (Chapter
10) with richly formatted text—and users can drill down to an item by simply tapping or
clicking it in the list.
Many News Stream services, including Twitter and Facebook, use the Infinite List pattern
(see Chapter 10) for both their mobile and full-screen designs. This pattern lets users
load a page or two of the most recent updates, and gives the option of loading more to go
“backward in time.”
Some resources use the term activity stream for a very closely related concept: the timeordered stream of actions (usually social actions) performed by a single entity such as an
individual, system, or organization. This is a useful concept, and it doesn’t really conflict
with the News Stream pattern, which talks about the stream of activities that are of interest
to an individual or group of users, not generated by them. News Streams will usually have
multiple diverse sources.
Examples
Digg (Figure 2-6) and Google News (Figure 2-7) are both public News Streams. Their
purposes and designs are very different, but they share some of the features talked about
in this pattern. Digg shows all incoming items in one large list; Google News splits them

---

## Sección 20: Chapter 8 of the previous edition of this book discusses how to design different aspects of

-- 64 of 577 --

The Patterns 37
into topics, within which the most recent news articles are shown first. (Drilling down
into the topic shows a page with a single list.) Both show comparable item information:
title, teaser, linked source, and a relative timestamp. They use human names: Digg shows
the submitter’s name, while Google News shows the article author’s name. And on both
sites, you can mark items of interest—with a “digg” in one, a star in the other—and share
them via email.
Figure 2-6. Digg

-- 65 of 577 --

38 Chapter 2: Organizing the Content: Information Architecture and Application Structure
Figure 2-7. Google News
The previous two examples show public News Streams; the next two show personal News
Streams.
Social networking services, news aggregators, and private communications (such as
email) provide plenty of examples of personal News Streams. In Figures 2-8 and 2-9 we see
Facebook and Google Reader, which is an RSS-based aggregator. They both use a single
reverse chronological list of items, each of which shows a linked source, title and teaser
(when appropriate), author name, and relative timestamp. Users can “like” items, share
them, and follow links to read more.
But note the differences, too. Google Reader lets the user split a potentially huge combined stream into substreams, based on source and topic; these are displayed in a selectable tree list on the left, thus making the window a Two-Panel Selector. Facebook doesn’t
give the user this option by default, as of this writing. Instead, it automatically (and unpredictably) switches between a filtered “Top Stories” view, and a “Most Recent” view that
shows everything. However, Facebook excels at the immediate response. Posting a short
comment to a Facebook entry is almost as easy as thinking about it.

-- 66 of 577 --

The Patterns 39
Figure 2-8. Facebook
Figure 2-9. Google Reader

-- 67 of 577 --

40 Chapter 2: Organizing the Content: Information Architecture and Application Structure
Picture Manager
Figure 2-10. Two views of iPhoto
What
Use thumbnails, item views, and a browsing interface to create a familiar structure for
managing photos, videos, and other pictorial items.
Use when
People use your software to work with lists or collections of pictorial things: photos, drawings, video clips, and so on. The list might be in a web page, or in an application, or both.
It might allow editing by the owner of the content, or it might simply show the content to
the public for browsing, viewing, and comments.
Why
This is a distinct style of application that many people recognize. It is also a guild of patterns—
a set of patterns linked together and supporting each other in predictable ways. Once
someone sees a Thumbnail Grid of images or videos in the right context, she knows what to
expect: browse, click to view, set up slideshows or playlists, and so on.
Patterns and other components that often play parts in this guild include:
• Thumbnail Grid
• One-Window Drilldown
• Two-Panel Selector
• Pyramid
• Tabs and Collapsible Panels
• Button Groups
• Trees or outlines
• Keyboard Only
• Sharing Widget
• Search box
• Social comments and discussion

-- 68 of 577 --

The Patterns 41
How
Set up two principal views: a Thumbnail Grid of the items in the list, and a large view of a
single item. Users will go back and forth between these. Design a browsing interface and
associate it with the Thumbnail Grid to let users explore a large collection easily.
The Thumbnail Grid
Use this pattern to show a sequence of items. Many Picture Managers show a small amount
of metadata with each item, such as its filename or author, but do this with care, as it clutters the interface. You might offer a control to adjust the size of the thumbnails. There may
also be a way to sort the items by different criteria, such as date, label, or rating, or to filter
it and show only the starred items (for instance).
When a user clicks on an item, show it immediately in the single-item view. Applications
often let the user traverse the grid with the keyboard—for example, with the arrow keys
and space bar. (See the Keyboard Only pattern in Chapter 1.)
If the user owns the items, offer ways to move, reorder, and delete items at this level in the
interface. This implies having a multiple-selection interface, such as Shift-select, checkboxes, or lassoing a group of items with the pointer. Cut, copy, and paste should also work
in applications.
You can offer slideshow or playlist functionality to all users at the Thumbnail Grid level.
The single-item view
Show a large view of the selected image (or a player, for a video). Display metadata—information about the item—next to it. This view can be next to the Thumbnail Grid if the
window is large, or it might replace the area used by the grid. In practice, this means
choosing between a Two-Panel Selector and a One-Window Drilldown. See Chapter 5 for
these list-related patterns.
If the interface is a website or is otherwise web-connected, you might choose to offer
social features at this level. Comments, liking or thumbs-up, and sharing might be here;
see the Sharing Widget and other patterns in Chapter 9. Likewise, tagging or labeling can
also be done here, either privately or publicly. An “other items you may like” feature is
sometimes found in web-based public collections.
Editing features for individual items will live here, also. For instance, a photo manager
might offer simple functionality such as cropping, color and brightness adjustment, and
red-eye reduction. Metadata properties could be edited here, too. If a full editor is too
complex to present here, give the user a way to launch a “real” editor. (Adobe Bridge, for
example, lets the user launch Photoshop on a photo.) Use Button Groups to maintain a
simple, comprehensible visual grouping of all these features.
Link the item to the previous and next items in the list by providing “previous” and “next”
buttons, especially if you use One-Window Drilldown to display the single-item view (which
also requires a “back” button). See the Pyramid navigational pattern in Chapter 3.

---

## Sección 21: Chapter 8 of the previous edition of this book discusses how to design different aspects of

-- 69 of 577 --

42 Chapter 2: Organizing the Content: Information Architecture and Application Structure
The browsing interface
The contents of the Thumbnail Grid should be driven by a browsing interface that might be
complex, simple, or nearly nonexistent, depending on the nature of the application.
At minimum, most interfaces should offer a search box, either to search an individual
user’s items or to search all public items (or both).
Private photo and video management interfaces—especially desktop apps such as Picasa
and iPhoto—should let the user browse the filesystem for images stored in different directories. If users can group items into albums, sets, projects, or other types of collections,
these should be available in a browsing interface, too. Most also permit favoriting or starring of items.
Most apps and sites show the browsing interface above or to the left of the Thumbnail Grid.
For highly interactive software, they relate to each other as a Two-Panel Selector: when the
user selects a category or folder (or enters a search term), the contents immediately show
up in the Thumbnail Grid next to the browsing interface.
Filters are sometimes found here. Adobe Bridge puts filters into its browsing interface;
more than 10 properties can be used to slice through a large collection of items, including
keywords, modification date, camera type, and ISO.
Websites that host public collections, such as YouTube and Flickr, sometimes use the entire home page as a browsing interface. Sites such as these are faced with an interesting
choice: when a signed-in user who “owns” content visits the home page, should she see
her own personal collections, or the featured content that the rest of the public sees? Or
both?
Examples
Picasa and Adobe Bridge, along with iPhoto (shown in Figure 2-10), are desktop applications for managing personal collections of images. Their browsing interfaces—all TwoPanel Selectors—vary in complexity from iPhoto’s very simple design to Adobe Bridge’s
numerous panels and filters. Picasa (Figure 2-11) and iPhoto use One-Window Drilldown to
reach the single-item view, while Adobe Bridge (Figure 2-12) puts all three views together
on one page.

-- 70 of 577 --

The Patterns 43
Figure 2-11. Two views of Picasa
Figure 2-12. Adobe Bridge, which contains all views in one complex window
Flickr’s design (Figure 2-13) has been mimicked by many other web-based image and
video collections. Browsing images at Flickr is different from browsing in a private, desktop-based application—sets, pools, groups, and users’ public collections are the means
by which one explores the Flickr universe. Social elements are critical to Flickr’s vitality,
too. But you can still see a Thumbnail Grid, a single-item view reached via One-Window
Drilldown, item details, and a Pyramid navigational pattern (previous, next, up).

-- 71 of 577 --

44 Chapter 2: Organizing the Content: Information Architecture and Application Structure
Figure 2-13. Flickr
Even video sites fit this pattern. When you view someone’s YouTube channel, you can
choose to see either a Thumbnail Grid, or a list beside a video player (the default). (Both
options are shown in Figure 2-14.) Clicking a thumbnail brings you to the page for that
video, where detailed information and discussion are shown. Visitors can browse by looking at playlists, the latest videos added, the most-viewed videos, and the top-rated videos;
a search box is also provided, as it is everywhere.
Figure 2-14. The Sesame Street channel on YouTube
TED’s browsing interface is more complex (see Figure 2-15). Its home page offers a dynamically changeable infographic made up of thumbnails of different sizes. By toggling
fields on and off, visitors can narrow down the field of videos and find the ones they want.
Rolling over a thumbnail gives item details. Clicking on it brings you to a single-item
view, which looks a lot like YouTube’s.

-- 72 of 577 --

The Patterns 45
Figure 2-15. TED
In other libraries
The Image Browser pattern at Welie.com describes some aspects of a Picture Manager:
http://welie.com/patterns/showPattern.php?patternID=image-browsing
Dashboard
Figure 2-16. Fitbit

-- 73 of 577 --

46 Chapter 2: Organizing the Content: Information Architecture and Application Structure
What
Arrange data displays into a single information-dense page, updated regularly. Show users
relevant, actionable information, and let them customize the display as necessary.
Use when
Your site or application deals with an incoming flow of information from something—
web server data, social chatter, news, airline flights, business intelligence information,
or financials, for example. Your users would benefit from continuous monitoring of that
information.
Why
This is a familiar and recognizable page style. Dashboards have a long history, both online
and in the physical world, and people have well-established expectations about how they
work: they show useful information, they update themselves, they usually use graphics to
display data, and so on.
A dashboard is also a guild of interlocking patterns and components. Many online dashboards use these in predictable ways:
• Titled Sections
• Tabs and Collapsible Panels
• Movable Panels
• One-Window Drilldown
• Lists and tables of various kinds (see

---

## Sección 22: Chapter 5)

• Row Striping
• Information graphics (see Chapter 7)
• Datatips
How
Determine what information users need or want to see. This isn’t as simple as it sounds,
because you need an editorial eye—you can’t just splatter the screen with confusing or
unimportant data, or people won’t be able to pick out the parts that matter. Remove, or at
least deemphasize, information that doesn’t help the user.
Use a good visual hierarchy (see Chapter 4) to arrange lists, tables, and information graphics on the page. Try to keep the main information on one page, with little or no scrolling,
so people can keep the window on-screen and see everything at a glance. Group related
data into Titled Sections, and use tabs only when you’re confident that users won’t need to
see the tab contents side by side.
Use One-Window Drilldown to let users see additional details about the data—they should
be able to click on links or graphics to find out more. Datatips work well to show individual
data points when the pointer rolls over an information graphic.

-- 74 of 577 --

The Patterns 47
Choose appropriate and well-designed information graphics for the data you need to
show. Gauges, dials, pie charts, and 3D bar charts look nice, but they are rarely the best
way to show comparative information at a glance—simple line and bar charts express data
better, especially time-based data. When numbers and text are more relevant than graphics, use lists and tables. Row Striping is a common pattern for multicolumn data tables.
People will try to get actionable information from the dashboard at a glance, without
looking hard at every element on the page. So, when you show text, consider highlighting
keywords and numbers so that they stand out from surrounding text.
Should your users be able to customize their dashboard displays? Many dashboards do
offer customization, and your users may expect it. One way to customize a dashboard
page is to rearrange the sections—iGoogle and My Yahoo! both offer Movable Panels to
users, in addition to choosing which gadgets get shown.
Examples
My Yahoo! is a portal-style dashboard, showing weather, news, email, and other personalized information to a signed-in user (see Figure 2-17). This is the kind of window that
someone would check frequently throughout the day or week. It can be rearranged via
Movable Panels, and a user can decide which sections and widgets to show.
Figure 2-17. My Yahoo!

-- 75 of 577 --

48 Chapter 2: Organizing the Content: Information Architecture and Application Structure
Netvibes offers fully customizable dashboards that can be hooked up to a broad-based
web search (see Figure 2-18). With this, someone can stay abreast of conversations, pictures, and articles about a fast-moving topic. A tool tip shows the first few words of an
article, which can help the user to decide whether to click through or not.
Figure 2-18. Netvibes
Google Analytics is more like the Fitbit example in Figure 2-16 at the top of the pattern—
it uses information graphics to show a visual snapshot of a system. In Figure 2-19, the
system is a website, and the dashboard illustrates log data.
Download from Wow! eBook <www.wowebook.com>

-- 76 of 577 --

The Patterns 49
Figure 2-19. Google Analytics
In other libraries
http://quince.infragistics.com/Patterns/Dashboard.aspx
http://patternry.com/p=information-dashboard/
Dashboard is one of the canonical RIA screen layouts described by Bill Scott and Theresa
Neil. An article in UX Magazine explains these layouts:
http://www.uxmag.com/design/rich-internet-application-screen-design
Finally, you may be interested in Stephen Few’s book, Information Dashboard
Design: The Effective Visual Communication of Data (O’Reilly, http://oreilly.com/
catalog/9780596100162/).

-- 77 of 577 --

50 Chapter 2: Organizing the Content: Information Architecture and Application Structure
Canvas Plus Palette
Figure 2-20. Photoshop CS5
What
Place an iconic palette next to a blank canvas; the user clicks on the palette buttons to create objects on the canvas.
Use when
You’re designing any kind of graphical editor. A typical use case involves creating new
objects and arranging them on some virtual space.

-- 78 of 577 --

The Patterns 51
Why
This pair of panels—a palette with which to create things, and a canvas on which to put
them—is so common that almost every user of desktop software has seen it. It’s a natural
mapping from familiar physical objects to the virtual on-screen world. And the palette
takes advantage of visual recognition: the most common icons (paintbrush, hand, magnifying glass, etc.) are reused over and over again in different applications, with the same
meaning each time.
How
Present a large empty area to the user as a canvas. It might be in its own window, as in
Photoshop (Figure 2-20), or embedded in a single page with other tools. The user just
needs to see the canvas side by side with the palette. Place additional tools—property
panels, color swatches, and so on—to the right or bottom of the canvas, in small palettelike windows or panels.
The palette itself should be a grid of iconic buttons. They can have text in them if the icons
are too cryptic; some GUI-builder palettes list the names of GUI components alongside
their icons, for instance. So does Visio, with its palettes of complex visual constructs tailored for specific domains. But the presence of icons is necessary for users to recognize
the palette for what it is.
Place the palette to the left or top of the canvas. It can be divided into subgroups, and you
may want to use Module Tabs or Collapsible Panels to present those subgroups.
Most palette buttons should create the pictured object on the canvas. But many builders
have successfully integrated other things, such as zoom mode and lassoing, into the palette. This started early; MacPaint mixed its modes into its palette (see Figure 2-24) and
people have learned what the arrow, hand, and other icons do.
The gestures used to create items on a palette vary from one application to another. Some
use drag-and-drop only; some use a single click on the palette and a single click on the
canvas; and some use One-off Modes, Spring-Loaded Modes (see the previous edition of
this book for both of these patterns), and other carefully designed gestures. I have always
found that usability testing in this area is particularly important, since users’ expectations
vary greatly.
Examples
The Raven vector editor (Figure 2-21), by Aviary, and Sumo Paint (Figure 2-22) are two
web-based graphic editors that follow this pattern faithfully.

---

## Sección 23: Chapter 5)

-- 79 of 577 --

52 Chapter 2: Organizing the Content: Information Architecture and Application Structure
Figure 2-21. Raven
Figure 2-22. Sumo Paint

-- 80 of 577 --

The Patterns 53
Adobe Flash Builder places its palette of Flex UI components at the lower left, as shown in
Figure 2-23. Next to the icons, the palette shows text labels that clarify exactly what kind
of component will be created for each palette item. Users of this application are assumed
to be skilled enough to know the approximate names of the components they need. (Also
shown is a drag operation from the palette to the canvas.)
Figure 2-23. Flash Builder
Taking a trip back in time, let’s look at one of the interfaces that popularized this pattern:
MacPaint (see Figure 2-24). The pattern hasn’t changed much since 1984—the basic elements are all there, in the same spatial configuration used by contemporary software such
as Photoshop. Photoshop and other visual builders, in fact, still use many of MacPaint’s
icons more than 20 years later.

-- 81 of 577 --

54 Chapter 2: Organizing the Content: Information Architecture and Application Structure
Figure 2-24. MacPaint, circa 1984
In other libraries
Palette/Canvas is one of the canonical RIA screen layouts described by Bill Scott and
Theresa Neil. An article in UX Magazine explains these layouts:
http://www.uxmag.com/design/rich-internet-application-screen-design
Wizard
Figure 2-25. The first two steps of the My Yahoo! setup Wizard

-- 82 of 577 --

The Patterns 55
What
Lead the user through the interface step by step to do tasks in a prescribed order.
Use when
You are designing a UI for a task that is long or complicated, and that will usually be
novel for users—not something that they do often or want much fine-grained control
over (such as the installation of a software package). You’re reasonably certain that the
designer of the UI will know more than the user does about how best to get the task done.
Tasks that seem well suited for this approach tend to be either branched or very long and
tedious—they consist of a series of user-made decisions that affect downstream choices.
The catch is that the user must be willing to surrender control over what happens when.
In many contexts, that works out fine, since making decisions is an unwelcome burden for
people doing certain things: “Don’t make me think, just tell me what to do next.” Think
about moving through an unfamiliar airport—it’s often easier to follow a series of signs
than it is to figure out the airport’s overall structure. You don’t get to learn much about
how the airport is designed, but you don’t care about that.
But in other contexts, it backfires. Expert users often find Wizards frustratingly rigid and
limiting. This is particularly true for software that supports creative processes such as
writing, art, or coding. It’s also true for users who actually do want to learn the software;
Wizards don’t show users what their actions really do, or what application state gets changed
as choices are made. That can be infuriating to some people. Know your users well!
Why
Divide and conquer. By splitting up the task into a sequence of chunks, each of which can
be dealt with in a discrete “mental space” by the user, you effectively simplify the task. You
have put together a preplanned road map through the task, thus sparing the user the effort
of figuring out the task’s structure—all he needs to do is address each step in turn, trusting
that if he follows the instructions, things will turn out OK.
But the very need for a Wizard indicates that a task may be too complicated. If you can simplify a task to the point where a short form or a few button clicks can do the trick instead,
that’s a better solution. (Keep in mind, too, that Wizards are considered a bit patronizing
in some Asian cultures.)

-- 83 of 577 --

56 Chapter 2: Organizing the Content: Information Architecture and Application Structure
How
“Chunking” the task
Break up the operations constituting the task into a series of chunks, or groups of operations. You may need to present these groups in a strict sequence, or not; sometimes there
is value in breaking up a task into steps 1, 2, 3, and 4 just for convenience.
A thematic breakdown for an online purchase may include screens for product selection,
payment information, a billing address, and a shipping address. The presentation order
doesn’t much matter because later choices don’t depend on earlier choices. Putting related
choices together just simplifies things for people filling out those forms.
You may decide to split up the task at decision points so that choices made by the user can
change the downstream steps dynamically. In a software installation Wizard, for example,
the user may choose to install optional packages that require yet more choices; if she
chooses not to do a custom installation, those steps are skipped. Dynamic UIs are good at
presenting branched tasks such as this, because the user never has to see anything that’s
irrelevant to the choices she made.
In either case, the hard part of designing this kind of UI is striking a balance between the
sizes of the chunks and the number of them. It’s silly to have a 2-step Wizard, and a 15-step
Wizard is tedious. On the other hand, each chunk shouldn’t be overwhelmingly large, or
you’ve lost some benefits of this pattern.
Physical structure
Wizards that present each step in a separate page, usually navigated with Back and Next
buttons, are the most obvious and well-known implementation of this pattern. They’re
not always the right choice, though, because now each step is an isolated UI space that
shows no context—the user can’t see what went before or what comes next. But an advantage of such Wizards is that they can devote each page to that step completely, including
illustrations and explanations.
If you do this, allow the user to move back and forth at will through the task sequence.
Offer a way for the user to step backward, or to otherwise change her mind about an
earlier choice. Additionally, many UIs show a selectable map or overview of all the steps,
getting some of the benefits of a Two-Panel Selector. (In contrast to that pattern, a Wizards
implies a prescribed order—even if it’s merely suggested—as opposed to completely random access.)
If you instead choose to keep all the steps on one page, you could use one of several patterns from Chapter 4:
• Titled Sections, with prominent numbers in the titles. This is most useful for tasks that
aren’t heavily branched, since all steps can be visible at once.
• Responsive Enabling, in which all the steps are present on the page, but each one remains disabled until the user has finished the previous step.

---

## Sección 24: Chapter 5)

-- 84 of 577 --

The Patterns 57
• Responsive Disclosure, in which you wait to show a step on the UI until the user finishes the previous one. Personally, I think this is the most elegant way to implement
a short Wizard. It’s dynamic, compact, and easy to use.
Good Defaults (from Chapter 8) are useful no matter how you arrange the steps. If the user
is willing to turn over control of the process to you, odds are good she’s also willing to let
you pick reasonable defaults for choices she may not care much about, such as the location
of a software installation.
Examples
The My Yahoo! example in Figure 2-25 illustrates many good features of a contemporary
Wizard. It uses a “lightbox” technique to focus attention on the modal dialogs; it lays out a
clear Sequence Map (Chapter 3) of steps to show the user what will happen; it’s short, easy
to use, and visually interesting; and it has a Cancel button in the upper right, as an Escape
Hatch from the whole thing.
Mint’s add-a-bank dialog (see Figure 2-26) doesn’t use a numbered sequence of steps, nor
does it use a permanent Next button. But it still has the quintessential Wizard quality of
leading the user through a relatively complex series of steps, one screen at a time. Also,
the list of steps on the lefthand side (which can’t be clicked) gives the user an overview of
what to expect.
Figure 2-26. Mint’s add-a-bank Wizard

-- 85 of 577 --

58 Chapter 2: Organizing the Content: Information Architecture and Application Structure
The Microsoft Office designers have done away with many of its Wizards, but a few remain—
and for good reason. Importing data into Excel is a potentially bewildering task. The
Import Wizard (see Figure 2-27) is an old-school, traditional application Wizard with
Back/Next buttons, branching, and no sequence map. But it works. Each screen lets you
focus on the step at hand, without worrying about what comes next.
Figure 2-27. Excel data import Wizard
In other libraries
http://ui-patterns.com/patterns/Wizard
http://www.welie.com/patterns/showPattern.php?patternID=wizard
http://patternry.com/p=one-page-wizard/
http://patternry.com/p=multiple-page-wizard/
http://quince.infragistics.com/Patterns/Wizard.aspx
Wizard is one of the canonical RIA screen layouts described by Bill Scott and Theresa
Neil. An article in UX Magazine explains these layouts:
http://www.uxmag.com/design/rich-internet-application-screen-design

-- 86 of 577 --

The Patterns 59
Settings Editor
Figure 2-28. Mac OS system preferences
What
Provide an easy-to-find, self-contained page or window where users can change settings,
preferences, or properties. Divide the content into separate tabs or pages, if you need to
manage large numbers of settings.
Use when
You are designing any of the following applications or tools, or something similar:
• An application that has app-wide preferences.
• An operating system, mobile device, or platform that has system-wide preferences.
• A site or app for which a user must sign in—users will need to edit their accounts
and profiles.
• An open-ended tool to create documents or other complex work products. Users may
need to change a document’s properties, an object within a document, or another item.
• A product configurator, which allows people to customize a product online. (This
is really a different pattern, however, with slightly different requirements and constraints. See the Product Configurator pattern at http://www.welie.com/patterns/
showPattern.php?patternID=product-configurator.)
Why
Though both use forms, a Settings Editor is distinct from a Wizard, and it has very particular requirements. A user must be able to find and edit a desired property without
being forced to walk through a prescribed sequence of steps—random access is important.

-- 87 of 577 --

60 Chapter 2: Organizing the Content: Information Architecture and Application Structure
To aid findability, the properties should be grouped into categories that are well labeled
and make immediate sense.
Another important aspect of Settings Editor design is that people will use it for viewing
existing settings, not just changing them. The design needs to communicate the values of
those settings at a glance.
Experienced users have strong expectations for preference editors, account settings, and
user profiles being in familiar places and behaving in familiar ways. Break these expectations at your own peril!
How
First, make it findable. Most platforms, both mobile and desktop, have a standard place
to find application-wide preferences—follow the conventions, and don’t try to be overly
clever. Likewise, websites where people sign in usually put links to account settings and
profiles where the username is shown, often in the upper-right or -left corner.
Second, group the properties into pages, and give those pages names that make it easy
to guess what’s on them. (Sometimes all the properties or settings fit on one page, but
not often.) Card-sorting exercises with representative users can help you figure out the
categories and their names. An outrageously large number of properties may require a
three- or four-level hierarchy of groups, but be careful that users don’t get frustrated at
having to click 53 times to reach commonly needed properties.
Third, decide how to present these pages. Tabs, Two-Panel Selector, and One-Window
Drilldown (Chapter 5) with an extensive page “menu” on the top page seem to be the most
common layouts for Settings Editors.
The design of the forms themselves deserves an entire chapter. See Chapter 8 for patterns
and techniques used in forms.
Finally, should you immediately apply changes that the user makes, or offer Save and
Cancel buttons? That may depend on the type of settings you’re working with. Platformwide settings seem to be applied immediately when changed; settings on websites mostly
use Save buttons; and application settings and preferences can go either way. It may not be
a huge usability issue in any case. Follow an established convention if there is one, or see
what the underlying technology requires; test it with users if you still have open questions.
Examples
Windows 7 offers the “outrageously large number of properties” that require a deep hierarchy of pages. The screenshots in Figure 2-29 illustrate the journey from the top of the
Settings Editor down to the page that lets you change the desktop theme. (There’s one more
level, too—if you want to change the desktop icons or some other obscure thing, you need
to launch a dialog from a link on the last screen.)

---

## Sección 25: Chapter 5)

-- 88 of 577 --

The Patterns 61
The designers mitigated some of the problems with a deep hierarchy, however. For instance,
they put a list of shortcuts on the top-level page; these are probably the items users look for
most often. They put a search box on the top and clickable Breadcrumbs beside it. And by putting lists of items on the top two levels, they show users which items fall into which categories.
Figure 2-29. Windows 7 settings editor

-- 89 of 577 --

62 Chapter 2: Organizing the Content: Information Architecture and Application Structure
Yahoo! (Figure 2-30) and Facebook (Figure 2-31) both use tabs to present the pages of
their profile editors. The Yahoo! example is actually two-level; see the tabs across the top.
Figure 2-30. Yahoo! profile settings
Figure 2-31. Facebook profile settings

-- 90 of 577 --

The Patterns 63
Amazon has one single link for all account-related information: “Your Account” (see
Figure 2-32). This Menu Page (Chapter 3) lists account settings alongside order information, credit card management, digital content, and even community and wish-list activity. The clean, tight page organization is terrific—if I have any questions about what’s
going on with my relationship to Amazon, I know I can find it somewhere on this page.
(Contrast this to Facebook, which habitually obscures certain profile information behind
complicated design.)
Figure 2-32. Amazon account settings

-- 91 of 577 --

64 Chapter 2: Organizing the Content: Information Architecture and Application Structure
Alternative Views
Figure 2-33. Google Maps
What
Let the user choose among alternative views that are substantially different from the default view.
Use when
You’re building something that views or edits a complex document, list, website, map, or
other content. Maybe you already provide some customizability—font size, language, sort
order, zoom level, and so forth—but those lightweight changes don’t go far enough to accommodate all the things people typically do with it.
You may face design requirements that directly conflict with each other. You can’t find a
way to show both feature set A and feature set B at the same time, so you need to design
both separately and let the user choose between them.
Why
Try as you might, you can’t always accommodate all possible usage scenarios in a single
design. For instance, printing is typically problematic for websites because the information display requirements differ—navigation and interactive gizmos should be removed,
for instance, and the remaining content reformatted to fit the printer paper.
There are several other reasons for Alternative Views:
• Users have preferences with regard to speed, visual style, and other factors.
• A user might need to temporarily view data through a different “lens” or perspective in order to gain insight into a problem. Consider a map user switching between
views of street information and topographic information (see Figure 2-33 at the top
of the pattern).

-- 92 of 577 --

The Patterns 65
• If a user is editing a slideshow or website, for instance, he may do most of his editing
while using a “structural” view of the document, containing editing handles, markers
for invisible content, layout guides, private notes, and so on. But sometimes he will
want to see the work as an end user would see it.
How
Choose a few usage scenarios that cannot easily be served by the application’s or site’s normal mode of operation. Design specialized views for those scenarios, and present them as
alternatives within the same window or screen.
In these alternative views, some information might be added and some might be taken
away, but the core content should remain more or less the same. A common way to switch
views is to change the rendering of a list; file finders in both Windows and Mac OS let
users switch from lists to Thumbnail Grids to Tree Tables to Cascading Lists to Carousels, for
instance.
If you need to strip down the interface—for use by a printer or screen reader, for instance—
consider removing secondary content, shrinking or eliminating images, and cutting out
all navigation but the most basic.
Put a “switch” for the mode somewhere on the main interface. It doesn’t have to be prominent; PowerPoint and Word used to put their mode buttons in the lower-left corner, which
is an easily overlooked spot on any interface. Most applications represent the alternative
views with iconic buttons. Make sure it’s easy to switch back to the default view, too. As
the user switches back and forth, preserve all of the application’s current state—selections,
the user’s location in the document, uncommitted changes, undo/redo operations, and so
on—because losing them will surprise the user.
Applications that “remember” their users often retain the user’s alternative-view choice
from one use to the next. In other words, if a user decides to switch to an alternative view,
the application will just use that view by default next time. Websites can do this by using
cookies; desktop applications can keep track of preferences per user; an app on a mobile
device can simply remember what view it used the last time it was invoked. Web pages
may have the option of implementing Alternative Views as alternative CSS pages. This is
how some sites switch between ordinary pages and print-only pages, for example.
Examples
In Figures 2-34 and 2-35, two graphic editors, Microsoft PowerPoint and Adobe Illustrator,
show different views of a work product. In the slideshow, the user normally edits one slide
at a time, along with its notes, but sometimes the user needs to see all the slides laid out
on a virtual table. (Not shown is a third view, in which PowerPoint takes over the screen
and actually plays the slideshow.) In the website example, Illustrator shows an “outline”

-- 93 of 577 --

66 Chapter 2: Organizing the Content: Information Architecture and Application Structure
view of the graphic objects in the document—most useful if you have a lot of complex and
layered objects—and the normal, fully rendered view of the artwork. The outline view
speeds up work considerably.
Figure 2-34. PowerPoint alternative views
Figure 2-35. Illustrator alternative views
News sites and blogs often show lots of “extras” in the margins around an article, many of
which are animated or interactive. But some sites considerately provide a print view—a
version of the article that has none of that extra stuff. The formatting is simple, and the
branding is minimal. The example in Figure 2-36 is from CNN.

---

## Sección 26: Chapter 5)

-- 94 of 577 --

The Patterns 67
Figure 2-36. CNN web and print views of an article
In other libraries
http://quince.infragistics.com/Patterns/Alternative%20Views.aspx

-- 95 of 577 --

68 Chapter 2: Organizing the Content: Information Architecture and Application Structure
Many Workspaces
Figure 2-37. Firefox windows and tabs
What
Use multiple top-level tabs, tab groups, and windows so that users can view more than
one page, project, file, or context at a time. Let users place these workspaces side by side
if possible.
Use when
You’re building an application that views or edits any type of content—websites, documents, images, or entire projects that include many files.
Designers of conventional websites don’t generally need to think about this. All the common browsers supply perfectly good implementations of this pattern, using tabs and
browser windows (as shown in Figure 2-37 at the top of the pattern).
Applications whose central organizing structure is a personal News Stream may not need
Many Workspaces, either. Email clients, personal Facebook pages, and so forth only show
the one News Stream that matters to the user; multiple windows don’t add much value.
That being said, email clients often let a user launch multiple email messages in different
windows. Some Twitter applications can show several filtered streams side by side—they
might show a search-based feed, then a feed from a custom list, then a feed of popular
retweets, for instance. (See the TweetDeck example in Figure 2-38.)
Why
People multitask. They go off on tangents, abandon trains of thought, stop working on
task A to switch to task B, and eventually come back to something they left hanging. One
way or the other, they will multitask, so you might as well support it directly with a welldesigned interface for doing so.

-- 96 of 577 --

The Patterns 69
Side-by-side comparisons between two or more items can help people learn and gain
insight. Let users pull up pages or documents next to each other without having to laboriously switch context from one to another.
This pattern directly supports some Chapter 1 patterns, such as Prospective Memory (a
user may leave a window open as a self-reminder to finish something) and Safe Exploration
(because there’s no cost in opening up an additional workspace while leaving the original
one where it is).
How
Choose one or more ways to show multiple workspaces. Many well-known applications
use the following:
• Tabs
• Separate operating-system windows
• Columns or panels within a window
• Split windows, with the ability to adjust the splitters interactively
If you deal with fairly simple content in each workspace—such as text files, lists, or News
Streams—split windows or panels work fine. More complex content might warrant entire
tab pages or windows of their own so that a user can see a larger area at once.
The most complicated cases that I’ve seen involve development environments for entire
coding projects. When a project is open, a user might be looking at several code files,
stylesheets, command windows (where compilers and other tools get run), output or logfiles, or even visual editors. This means that many, many windows or panels can be open
at once.
(And then, perhaps, the user might temporarily switch to another project, with another
set of open files and editors! Some development environments can support that.)
When users close some web browsers, such as Chrome, the set of workspaces (all open
web pages, in tabs and windows) gets automatically saved for later use. Then when the
user restarts the browser, her entire set of previously opened web pages is restored, almost
as she left it. This is especially nice when the browser or machine has crashed. Consider
designing in this feature, as it would be a kindness to your users.
Examples
TweetDeck is a News Stream–type application that can show many streams at once: filtered
Twitter feeds, non-Twitter sources, and so on. The example in Figure 2-38 shows several
typical TweetDeck columns. This maintains the spirit of a News Stream by keeping all
the updates visible at once; had these columns been in different tabs or windows, a user
wouldn’t be able to see all the updates as they happen.
Download from Wow! eBook <www.wowebook.com>

-- 97 of 577 --

70 Chapter 2: Organizing the Content: Information Architecture and Application Structure
Figure 2-38. TweetDeck
On tiny mobile screens, you don’t have room to show anything side by side. Safari on the
iPhone has solved this problem by letting the user open up to eight websites at a time, then
using a Carousel to shuffle between them (see Figure 2-39). A user swipes to the right and
left to reach the other windows.
Figure 2-39. Safari’s browser windows on the iPhone

-- 98 of 577 --

The Patterns 71
Multi-Level Help
Traditional
help menu
Input
prompt
Content-specific
help
Online
resources
Tooltips Help queries
Figure 2-40. Many types of help in Excel
What
Use a mixture of lightweight and heavyweight help techniques to support users with varying needs.
Use when
You’re designing a complex application. Some users may need a full-fledged help system,
but you know most users won’t take the time to use it. You want to support the impatient
or occasional user too, to the extent you can. In particular, you might need to tailor your
design for intermediate-to-expert users—but how will you help beginners become experts?
Why
Users of almost any software artifact need varying levels of support for the tasks they’re
trying to accomplish. Someone approaching it for the first time ever (or the first time in
a while) needs different support than someone who uses it frequently. Even among firsttime users, enormous differences exist in commitment level and learning styles. Some
people want to read a tutorial, some won’t; most find tool tips helpful, but a few find them
irritating.

-- 99 of 577 --

72 Chapter 2: Organizing the Content: Information Architecture and Application Structure
Help texts that are provided on many levels at once—even when they don’t look like traditional “help systems”—reach everyone who needs them. Many good help techniques
put the help texts within easy reach, but not directly in the user’s face all the time, so users
don’t get irritated. However, the techniques need to be familiar to your users. If they don’t
notice or open a Collapsible Panel, for instance, they’ll never see what’s inside it.
How
Create help on several levels, including some (but not necessarily all) of the help types in
the following list. Think of it as a continuum: each requires more effort from the user than
the previous one, but can supply more detailed and nuanced information.
• Captions and instructions directly on the page, including patterns such as Input Hints
and Input Prompt (both found in Chapter 8). Be careful not to go overboard with
them. If done with brevity, frequent users won’t mind them, but don’t use entire paragraphs of text—few users will read them.
• Tool tips. Use them to show very brief, one- or two-line descriptions of interface
features that aren’t self-evident. For icon-only features, tool tips are critical; users can
take even nonsensical icons in stride if a rollover says what the icon does! (Not that I’d
recommend poor icon design, of course.) Tool tips’ disadvantages are that they hide
whatever’s under them and that some users don’t like them popping up all the time.
A short time delay for the mouse hover—for example, one or two seconds—removes
the irritation factor for most people.
• Hover Tools (Chapter 6). These can display slightly longer descriptions, shown dynamically as the user selects or rolls over certain interface elements. Set aside areas
on the page itself for this, rather than using a tiny tool tip.
• Longer help texts contained inside Collapsible Panels (see Chapter 4).
• Introductory material, such as static introductory screens, guided tours, and videos.
When a new user starts the application or service for the first time, these materials
can immediately orient him toward his first steps (see the Instant Gratification pattern
in Chapter 1). Users might also be interested in links to help resources. Offer a toggle
switch to turn off the introduction—users will eventually stop finding it useful—and
offer a way back to it elsewhere in the interface, in case a user wants to go back and
read it later.
• Help shown in a separate window, often in HTML via browsers, but sometimes
in WinHelp or Mac Help. The help resource is often an online manual—an entire
book—reached via menu items on a Help menu, or from Help buttons on dialog
boxes and HTML pages.
• “Live” technical support, usually via email, the Web, Twitter, or telephone.

---

## Sección 27: Chapter 5)

-- 100 of 577 --

The Patterns 73
• Informal community support. This applies only to the most heavily used and invested software—the likes of Photoshop, Linux, Mac OS X, or MATLAB—but users
may consider it a highly valuable resource. Use social networking resources for these,
or more traditional online forums.
Examples
Firefox is “merely” a web browser, and a free one at that, but its help systems are stellar.
Help is offered at most of the levels described in the preceding list, so both beginners and
experts are well supported. All of the following examples come from Firefox so that you
can see the range of help that can be offered for one product.
When you visit Firefox’s site in order to download the browser, you are greeted by an outline of the install process and a very clear call to action, as shown in Figure 2-41.
Figure 2-41. Firefox download page
When you launch it for the first time, you see an introductory screen that may intrigue
the user: easy ways to customize the Firefox look, connections to social media, and links
to help resources (see Figure 2-42). The page also confirms for the user that the install
was successful; if the user needs to do anything more, such as get security updates, the
introductory page will say so.

-- 101 of 577 --

74 Chapter 2: Organizing the Content: Information Architecture and Application Structure
Figure 2-42. Firefox startup page
Each tool on the browser window has a tool tip (see Figure 2-43). The basic buttons—
back, next, reload, home—will be familiar to almost all users, but the more obscure items
may need to be explained.
Figure 2-43. Firefox tool tips
The main text fields use Input Prompts to describe themselves (see Figure 2-44). This is a
more appropriate choice than Input Hints (which would be displayed beside the text fields)
because it keeps the window clean and uncluttered. Furthermore, not much knowledge
is lost when a user starts typing into the text field, erasing the prompt. See the pattern
descriptions for Input Hints and Input Prompt in Chapter 8.

-- 102 of 577 --

The Patterns 75
Figure 2-44. Firefox input prompts
Some dialogs attempt to describe themselves, as shown in Figure 2-45.
Figure 2-45. Firefox toolbars dialog
Other dialogs offer links to the formal help system; an appropriate help page is displayed
in a browser window when the user clicks the round purple button in the lower-left corner (see Figures 2-46 and 2-47).
Figure 2-46. Firefox preferences dialog

-- 103 of 577 --

76 Chapter 2: Organizing the Content: Information Architecture and Application Structure
Figure 2-47. Firefox preferences dialog help page
Finally, if all other sources of help are exhausted, a user can turn to the wider user community for advice. We’ve now moved beyond the realm of software design per se, but this
is still product design—the user experience extends beyond the bits installed on users’
computers. It includes the interactions they have with the organization, its employees or
other representatives, and its website (see Figure 2-48).
Community building like this happens only for products in which users become deeply
invested, perhaps because they use the product every day at work or at home—as is the
case with Firefox—or because they have some emotional attachment to it.
Figure 2-48. Firefox support forums

-- 104 of 577 --

---

## Sección 28: Chapter 3

Getting Around:
Navigation, Signposts, and Wayfinding
The patterns in this chapter deal with the problem of navigation. How do users know
where they are now, where to go next, and how to get there from here?
I call navigation a “problem” because navigating around a website or application is like
commuting. You have to do it to get where you need to go, but it’s dull, it’s sometimes
infuriating, and the time and energy you spend on it just seems wasted. Couldn’t you be
doing something better with your time, such as playing a game or getting some actual
work done?
The best kind of commuting is none at all. Having everything you need right at your fingertips without having to travel somewhere is pretty convenient. Likewise, keeping most
tools “within reach” on an interface is handy, especially for intermediate-to-expert users
(i.e., people who have already learned where everything is). Sometimes you do need to
put lesser-used tools on separate screens, where they don’t clutter things up; sometimes
you need to group content onto different pages so that the interface makes sense. All this
is fine, as long as the “distances” that a user must travel remain short.
So, less is better. Let’s talk terminology for a minute and come back to this concept.
Staying Found
Let’s say you’ve built a large website or application that you’ve had to break up into sections, subsections, specialized tools, pages, windows, wizards, and so forth. How do you
help users navigate?
Signposts are features that help users figure out their immediate surroundings. Common
signposts include page and window titles, web page logos and other branding devices,
tabs, and selection indicators. Patterns and techniques such as good global and local navigation links, Sequence Map, Breadcrumbs, and Annotated Scrollbar—all described in this
chapter—tell users where they currently are, and often where they can go with only one
more jump. They help a user to stay “found” and to plan his next steps.

-- 105 of 577 --

78 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
Wayfinding is what people do as they find their way toward their goal. The term is pretty
self-explanatory. But how people actually do it is quite a research subject—specialists
from cognitive science, environmental design, and website design have studied it. These
common-sense features help users with wayfinding:
Good signage
Clear, unambiguous labels anticipate what you’re looking for and tell you where to
go; signs are where you expect them to be, and you’re never left standing at a decision
point without guidance. You can check this by walking through the artifact you’re
designing and following the paths of all the major use cases. Make sure that each
point where a user must decide where to go next is signed or labeled appropriately.
Use strong “calls to action” on the first pages that a user sees.
Environmental clues
You’d look for restrooms in the back of a restaurant, for instance, or a gate where a
walkway intersects a fence. Likewise, you would look for an “X” close button at the
top right of a modal dialog and logos in the upper-left corner of a web page. Keep
in mind that these clues are often culturally determined, and someone new to the
culture (e.g., someone who’s never used a given operating system before) will not be
aware of them.
Maps
Sometimes people go from sign to sign or link to link without ever really knowing
where they’re going in a larger frame of reference. (If you’ve ever found your way
through a strange airport, that’s probably what you did.) But some people might prefer to have a mental picture of the whole space, especially if they’re there often. Also,
in badly signed or densely built spaces, such as urban neighborhoods, maps may be
the only navigational aids people have.
In this chapter, the Clear Entry Points pattern is an example of careful signage combined
with environmental clues—the links should be designed to stand out on the page. A
Sequence Map, obviously, is a map; you can use Overview Plus Detail (Chapter 7) to show
maps for virtual spaces, too. Modal Panel sort of qualifies as an environmental clue, since
the ways out of a modal panel take you right back to where you just were.
I’ve compared virtual spaces to physical ones here. But virtual spaces have the unique ability to provide a navigational trump card, one that physical spaces can’t (yet) provide: the
Escape Hatch. Wherever you are, click on that link, and you’re back to a familiar page. It’s
like carrying a wormhole with you. Or a pair of ruby slippers.
The Cost of Navigation
When you walk into an unfamiliar room, you look around. In a fraction of a second, you
take in the shape of the room, the furnishings, the light, the ways out, and other clues; very
quickly, you make some assumptions about what this room is and how it relates to why

-- 106 of 577 --

The Cost of Navigation 79
you walked in. Then you need to do what you came in to do. Where? How? You might be
able to answer immediately—or not. Or maybe you’re just distracted by other interesting
things in the room.
Similarly, bringing up a web page or opening a window incurs a cognitive cost. Again, you
need to figure out this new space: you take in its shape, its layout, its contents, its exits, and
how to do what you came to do. All of this takes energy and time. The “context switch”
forces you to refocus your attention and adjust to your new surroundings.
Even if you’re already familiar with the window (or room) you just went into, it still incurs
a cost. Not a large cost, but it adds up—especially when you figure in the actual time it
takes to display a window or load a page.
This is true whether you’re dealing with web pages, application windows, dialog boxes, or
device screens. The decisions that users make about where to go are similar—labels still
need to be read or icons decoded, and the users will still make leaps of faith by clicking on
links or buttons they’re not sure about.
Furthermore, loading time affects people’s decisions. If a user clicks through to a page that
takes too long to load—or fails to load altogether—he may be discouraged, and may just
close the page before he finds what he came for. (So, how many viewers is that sidebar
video player costing you?) Also, if a site’s pages take a chronically long time to load, users
will be less likely to explore that site.
There’s a reason that companies like Google work very hard to keep page loads as fast as
possible: latency costs viewers.
Keep Distances Short
Knowing that there’s a cost associated with jumping from page to page, you can understand now why it’s important to keep the number of those jumps down. When a common
task requires many page jumps, try to reduce it to one or two.
But the real efficiency gains come from the structure of the application. One of the nastiest things a designer can do is force a user to go into multiple levels of subpages, dialogs,
and so forth every time he needs to accomplish a simple and everyday task. (Worse is to
lead him there, tell him he can’t accomplish it because of some missing precondition, and
send him back to square one.)
Can you design your application so that the most common 80% of use cases can be done
in one page, without any context switches? (Or perhaps only one?)
This is hard to do with some kinds of applications. Is a certain tool too big to put on your
main page? Try shrinking it: eliminate controls, shorten labels, turn words into pictures,
or use specialized form controls that save space. Is it too distracting when combined with
everything else on the main page? Again, try shrinking it, isolating it with whitespace, or
putting it in an out-of-the-way spot. Can you use progressive disclosure to gradually show
more content on the same page? Can you use Module Tabs or an Accordion to hide some
content by default?

---

## Sección 29: Chapter 3

-- 107 of 577 --

80 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
Sometimes it’s appropriate to bury functionality inside pages that take more than one
jump to get to, such as that extra 20% of tasks left over from the 80% you made easily
available. It could also be that on your application, simplicity of presentation is more important than saving one or two jumps. You could put little-used functionality behind an
extra “door” (also using the 80/20 rule). As always, experiment with different designs, and
usability-test them if you have any doubts.
Navigational Models
What is the navigational model for your site or app? In other words, how do the different
screens (or pages, or spaces) link to each other, and how do users move between them?
First, some more terminology.
Global navigation is what’s found on every main screen. It usually takes the form of
menus, tabs, and/or sidebars, and this is how users move around the formal navigational
structure of the site. (In an earlier version of this book, global navigation was defined as a
pattern. But by now, it’s so common and well understood that it really doesn’t need to be
called out as such anymore.)
Utility navigation, also found on every main screen, contains links and tools related to
noncontent aspects of the site or application: sign-in, help, print, Settings Editors (see

---

## Sección 30: Chapter 2), language tools, and so on.

Associative and inline navigation embed links in or near the actual content. As the user
reads or interacts with the site, these links present options that might be immediately
relevant to the user. They tie content together thematically.
Now let’s look at a few models found in typical sites and apps:
Hub and spoke
Most often found on mobile devices, this architecture (Figure 3-1) lists all the major
parts of the site or app on the home screen, or “hub.” The user clicks or taps through
to them, does what she needs to do, and comes back to the hub to go somewhere else.
The “spoke” screens focus tightly on their jobs, making careful use of space—they
may not have room to list all the other major screens. The iPhone home screen is a
good example; the Menu Page pattern found on some websites is another.
Figure 3-1. Hub and spoke

-- 108 of 577 --

Navigational Models 81
Fully connected
Many websites follow this model. There’s a home page or screen, but it and every
other page link to all the others—they each have a global navigation feature, such as
a top menu. The global navigation may be a single level (as shown in Figure 3-2, with
only five pages), or it might be deep and complex, with multiple levels and deeply
buried content. As long as the user can reach any page from any other with a single
jump, it’s fully connected.
Figure 3-2. Fully connected
Multi-level
This is also common among websites (see Figure 3-3). The main pages are fully connected with each other, but the subpages are only connected among themselves (and
usually to the other main pages, via global navigation). You’ve seen this on sites that
have subpages listed only in sidebars or subtabs—users see these on menus that only
show up after they’ve clicked the link for the main page or category. It takes two or
more jumps to get from one arbitrary subpage to another. Using drop-down menus,
the Fat Menus pattern, or the Sitemap Footer pattern with a multi-level site converts it
to a fully connected one, which is preferable.
Figure 3-3. Multi-level

-- 109 of 577 --

82 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
Stepwise
Slideshows, process flows, and Wizards (see Chapter 2) lead the user step by step
through the screens in a prescribed sequence (see Figure 3-4). Back/Next links are
prominent on the page.
Figure 3-4. Stepwise
Pyramid
A variant on the stepwise model, a pyramid uses a hub page or menu page to list an
entire sequence of items or subpages in one place (see Figure 3-5). The user picks out
any item, jumps to it, and then has the option to use Back/Next links to step through
other items in order. He can go back to the hub page anytime. See the Pyramid pattern
in this chapter for more.
Figure 3-5. Pyramid
Pan-and-zoom
Some artifacts are best represented as single large spaces, not many small ones. Maps,
large images, large text documents, information graphics, and representations of timebased media (such as sound and video) fall into this category. Chapter 7 discusses
these in more detail. Panning and zooming are still navigation—so offer controls for
panning (moving horizontally or vertically), zooming in and out, and resetting to a
known position and state. Figure 3-6 shows an example of pan-and-zoom.
Figure 3-6. Pan-and-zoom

-- 110 of 577 --

Navigational Models 83
Flat navigation
Some types of applications need little or no navigation at all. Consider Canvas Plus
Palette applications such as Photoshop, or other complex apps such as Excel—these
offer tons of tools and functions that are easily reached via menus, toolbars, and palettes. Tools that don’t act immediately upon the work may be accessible via Modal
Panels or step-by-step progressions. These types of applications seem to be qualitatively different from the other navigation styles listed here: the user always knows
where he is, but he may not easily find the tools he needs because of the sheer number
of features available at one time.
Modal panel
This brings a user to a screen with no navigation options other than acknowledging its
message, completing its form, or clicking the panel away (Figure 3-7). Modal panels often
show up layered on top of a full screen or page, and are used for small, focused tasks that
require the user’s full attention. See the Modal Panel pattern for more discussion.
Figure 3-7. Modal panel
Clear entry points
How does a user know where to start in a complex site or app? The Clear Entry Points
pattern shows him where to go first (see Figure 3-8). For first-time and infrequent
users, it removes some of the burden of learning the site.
A
B
Figure 3-8. Clear entry points

-- 111 of 577 --

84 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
Bookmarks
Bookmarks (Figure 3-9), permalinks, deep links, and Deep-linked State are all ways
for a user to conveniently navigate to a point of his choice, anytime he wants, even
if it’s deep inside a navigational structure. These give him a way to avoid traversing
many links to get to a desired page or state.
http://
Figure 3-9. Bookmarks
Escape hatch
When a user is hopelessly entangled in an app, reaches an error state, or gets deeplinked into a page that he has no context for understanding, he needs an escape hatch
(Figure 3-10), a well-labeled link to get back to a known place. See the Escape Hatch
pattern.
Figure 3-10. Escape hatch
There are three things to notice about these navigational models. The first is that they’re
mix-and-match—an app or site might combine several of these, especially Modal Panel,
Clear Entry Points, bookmarks, and Escape Hatch, which are very local and don’t affect the
site-wide navigation strategy.
The second thing is that some of these mechanisms actually restrict a user’s navigation
options. Most of the time, open access and short jumps are good things. But when a user
is in the middle of a full-screen slideshow, she doesn’t want to see a complicated global
navigation menu! She would rather just focus on the slideshow itself, so Back/Next controls and an Escape Hatch are all that’s necessary. The presence of full navigation options is
not without cost: it takes up space, clutters the screen, incurs cognitive load, and signals
to the user that leaving the page doesn’t matter.

---

## Sección 31: Chapter 2), language tools, and so on.

-- 112 of 577 --

Design Conventions for Websites 85
Third, all these mechanisms and patterns can be rendered on-screen in different ways. A
complex site or app might use tabs, or menus, or a sidebar tree view to show the global navigation on each page—that’s something you don’t need to decide until you start laying out the
page. Likewise, a modal panel might be done with a lightbox or an actual modal dialog—but
you can postpone that until you know what needs to be modal and what doesn’t.
Visual design can come later in the design progression, after the information architecture
and navigational models.
Design Conventions for Websites
It’s a fine thing to separate the navigational model from its visual design. Doing so can
help you think more flexibly and deliberately about how to design the pages themselves.
But websites have certain conventions regarding visual placement of navigational features, and it’s probably unwise to ignore them.
Global navigation is almost always shown at the top or left of a web page, sometimes both.
Rarely, it can be found on the right—this placement can cause problems with page size
and horizontal scrolling, unless the designer uses a Liquid Layout (see Chapter 4).
Two relatively new approaches to global navigation are found in the Fat Menus and Sitemap
Footer patterns. In these, the whole structure of a hierarchical site is laid out for the user to
see, at the cost of screen space in the header or footer. As explained earlier, these patterns
turn a multi-level navigational model into a fully connected one.
When a site’s visitors are typically signed-in members, that site may offer a set of utility
navigation links in its upper-right corner. Users tend to look there for tools related to their
presence on the site: account settings, user profile, logout, help, and so on. See the Sign-in
Tools pattern for more.
A common form of associative navigation—when links are embedded in or near the content itself, linking items together thematically—is a “Related Articles” section or panel.
News sites and blogs use this a lot: when a user reads an article, a sidebar or footer shows
other articles that talk about similar topics or are written by the same author.
Tags, both user-defined and system-defined, can help support associative navigation and related articles or links. Tag clouds support topical findability on some sites, especially where
the number of articles is very large and the topics fine-grained. (On smaller sites and blogs,
they don’t work as well.) A more common navigational technique is to list an article’s tags at
the end; each tag is a link leading to a whole set of articles that share that tag.
When a site takes advantage of social media, even more navigation options come into
play. The front of a site may have a News Box, which links users to the items posted most
recently. Content Leaderboards show the most frequently shared or commented pieces,
while Recent Chatter directs users to ongoing conversations. And Social Links and Sharing
Widgets connect users directly to social media services. See Chapter 9 for these patterns.

-- 113 of 577 --

86 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
The Patterns
To recap, this chapter talks about several aspects of navigation: overall structure or model,
knowing where you are, figuring out where you’re going, and getting there efficiently.
The first set of patterns address the navigational model, and are more or less independent
of screen layout:
1. Clear Entry Points
2. Menu Page
3. Pyramid
4. Modal Panel
5. Deep-linked State
6. Escape Hatch
Combining layout and model on conventional websites, we get these patterns:
7. Fat Menus
8. Sitemap Footer
9. Sign-in Tools
The next few patterns work well as “You are here” signposts (as can a well-designed global
navigation). Sequence Map, Breadcrumbs, and Annotated Scrollbar also serve as interactive
maps of the content. Annotated Scrollbar is intended more for pan-and-zoom models than
for multiple interconnected pages.
10. Sequence Map
11. Breadcrumbs
12. Annotated Scrollbar
Animated Transition helps users stay oriented as they move from one place to another. It’s
a visual trick, nothing more, but it’s very effective at preserving a user’s sense of where he
is and what’s happening.
13. Animated Transition

-- 114 of 577 --

The Patterns 87
Clear Entry Points
A
B
Figure 3-11. Clear Entry Points schematic
What
Present only a few main entry points into the interface; make them task-oriented and
descriptive. Use clear calls to action.
Use when
You’re designing a site or app that has a lot of first-time or infrequent users. Most of these
users would be best served by reading a certain piece of introductory text, doing an initial
task, or choosing from a very small number of frequently used options.
However, if the purpose is clear to basically everyone who starts it, and if most users might
be irritated by one more navigation step than is necessary (like applications designed for
intermediate-to-expert users), this may not be the best design choice.
Why
Some applications and websites, when opened, present the user with what looks like a
morass of information and structure: lots of tiled panels, unfamiliar terms and phrases,
irrelevant ads, or toolbars that just sit there disabled. They don’t give the hesitant user any
clear guidance on what to do first. “OK, here I am. Now what?”
For the sake of these users, list a few options for getting started. If those options match a
user’s expectations, he can confidently choose one and begin working—this contributes
to immediate gratification. If not, at least he knows now what the site or app actually does,
because you’ve defined the important tasks or categories up front. You’ve made the application more self-explanatory.

-- 115 of 577 --

88 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
How
When the site is visited or the application started, present these entry points as “doors”
into the main content. From these starting points, guide the user gently and unambiguously into the application until he has enough of a context to continue by himself.
Collectively, these entry points should cover most of the reasons most users would be
there. There might only be one or two entry points, or many; it depends on what fits your
design. But you should phrase them with language first-time users can understand—this
is not the place for application-specific tool names.
Visually, you should show these entry points with emphasis proportional to their importance.
On the home page or starting page, most sites will additionally list other navigation links—
global navigation, utility navigation, and so on—and these should be smaller and less prominent than the Clear Entry Points. They’re more specialized, and don’t necessarily lead you
directly into the heart of the site, any more than a garage door leads you directly into the
living room. The Clear Entry Points should serve as the “front doors.”
Examples
The top of Apple’s main iPad page (Figure 3-12) needs to do only a few things: identify
itself, make the iPad look inviting, and direct the user toward resources for buying one
or learning more. The global navigation recedes visually, compared to the strong, welldefined entry points. On the rest of the page, more text and links make the page denser,
but this is all the user sees above the fold.
Figure 3-12. iPad page on Apple’s site

---

## Sección 32: Chapter 2), language tools, and so on.

-- 116 of 577 --

The Patterns 89
Fireworks and other applications show a startup dialog when the application is started (see
Figure 3-13). This orients a new or infrequent user to the possibilities for action; creating
something new, opening an existing document, or reading help resources are the most common items to be found here. (Appropriately, this startup dialog has a checkbox that lets the
user turn it off for future startups. Expert users may not want to bother with such a dialog,
since it adds one more step—and no value—to the process of getting started on their work.)
Figure 3-13. Fireworks startup dialog
In other libraries
http://quince.infragistics.com/Patterns/Clear%20Entry%20Points.aspx

-- 117 of 577 --

90 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
Menu Page
Figure 3-14. Craigslist
What
Fill the page with a list of links to content-rich pages in your site or app. Show enough
information about each link to enable the user to choose well. Show no other significant
content on the page.
Use when
You’re designing a home page, starting screen, or any other screen whose purpose is to be
just a “table of contents”—to show where users can go from here. You may not have room
for featured content (such as an article, video, or promotion), or you may simply want to
let the user pick a link with no distractions.
Mobile apps and sites especially need Menu Pages to make the best use of their small screens.
If your (full-size) site needs to “hook” visitors into staying on the page, it may be better to
use some of the page space for promotional items or other interesting content, and a Menu
Page wouldn’t be the right design choice. Likewise, a site that needs to explain its value
and purpose should use the space to do that instead.
It takes some audacity to design a Menu Page, because you must be very confident that:

-- 118 of 577 --

The Patterns 91
• Visitors know what the site or app is about.
• They know what they came for and how to find it.
• They wouldn’t be interested in news, updates, or features.
Why
With no distractions, users can focus all their attention on the available navigation options.
You get the entire screen (or most of it, anyway) to organize, explain, and illustrate those
links, and can thus direct users to the most appropriate destination page for their needs.
How
If you’re creating a mobile design, Menu Pages are one of your principal tools for designing
sites or apps with many levels of functionality. Keep list labels short, make targets large
enough to tap easily (for touch screens), and try not to make hierarchies too deep.
The rest of this applies to full-size sites and apps.
First, label the links well, and provide just enough contextual information for users to
decide where to go. This isn’t necessarily easy. Visitors may find it very helpful to have
a description or teaser with each link, but that could take up a lot of space on the page.
Likewise for thumbnail images—they can look great, but how much value do they add?
Look at Figures 3-15 and 3-16. Visitors to the MIT site already know the meanings of
these links—they’re the names of academic programs—so extra information is unnecessary. The designer is thus able to pack in more links above the fold. The result is an
information-dense, useful page.
On the other hand, the articles in the AIGA resources page do benefit from descriptive
text and images. The titles alone aren’t necessarily enough to persuade a visitor to click
through. (Keep in mind, too, that a user who clicks through and finds that the destination
page isn’t what he wanted will get frustrated quickly. Make sure your descriptions are accurate and fair!)
Second, consider the visual organization of the list of links. Do they come in categories, or
perhaps a two- or three-level hierarchy? Is it ordered by date? Express that organizational
scheme in the list. See Chapter 5 for more discussions on this topic.
Third, don’t forget a search box.
Finally, reconsider whether you have anything else to say on this page. Home page space,
in particular, is quite valuable for drawing in users. Is there an interesting article teaser
you can put there? A work of visual art? A News Box (see Chapter 9)? If such things would
annoy more than intrigue, continue designing a pure Menu Page.

-- 119 of 577 --

92 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
Examples
In the website for MIT (Figure 3-15), the “Education” page shows very little explanatory
text and a whole lot of links. When a user reaches this point in the website, she’s probably
looking for a specific department or resource, and she isn’t looking for, say, an explanation
of what MIT is about. The whole point of this page is to move the visitor along to a page
that answers a well-defined need. (The same is true of the Craigslist example in Figure
3-14 at the top of the pattern.)
Figure 3-15. A menu page from MIT’s website
The AIGA website contains many resources for design professionals. The site presents
several top-level categories for those resources, as shown in the global navigation, but the
landing page for each of those categories is a Menu Page (Figure 3-16). The articles are
shown with thumbnail images and summary text; the rich format gives the viewer enough
of a context to decide whether to invest time in clicking through to the article.

-- 120 of 577 --

The Patterns 93
Figure 3-16. A Menu Page from AIGA’s website
Last, the Museum of Modern Art uses large images and little text on this Menu Page (see
Figure 3-17). This page is intriguing enough to hook a user on its own, without featuring
any particular content at all.
Figure 3-17. A Menu Page from MoMA’s website

-- 121 of 577 --

94 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
In other libraries
The Directory Navigation pattern at the following URL describes one specialized use of
a Menu Page:
http://welie.com/patterns/showPattern.php?patternID=directory
Pyramid
Figure 3-18. Pyramid schematic
What
Link together a sequence of pages with Back/Next links. Create a parent page that links
to all of the pages in this sequence, and let the user view them either in sequence or out
of order.
Use when
The site or application contains a sequence of items that a user would normally view one
after another, such as a slideshow, a wizard, chapters in a book, or a set of products. Some
users would rather view them one at a time and out of order, however, and they need to
be able to pick from a full list of the items.
Almost all Picture Managers (see Chapter 2) use a Pyramid navigational model. Sometimes
people need to look at pictures individually; sometimes they would rather browse by
walking through the whole sequence. Pyramids support both use cases.
Why
This pattern reduces the number of clicks it takes to get around. It improves navigation
efficiency, and it expresses a sequential relationship among the pages.
Back/Next (or Previous/Next) links or buttons are all well and good. People know what to
do with them. But a user doesn’t necessarily want to be locked into a page sequence that
he can’t easily get out of: having gone seven pages in, will he need to click the Back button
seven times to get back where he started? Not fun!

---

## Sección 33: Chapter 2), language tools, and so on.

-- 122 of 577 --

The Patterns 95
By putting a link back to the parent page on each sequence page, you increase the user’s
options. You’ve now got three main navigation options instead of two—Back, Next, and
Up. You haven’t made it much more complex, but a casually browsing user (or one who’s
changed his mind in midstream) will need far fewer clicks to go where he wants to go. It’s
more convenient for users.
Likewise, chaining together a set of unconnected pages is kind to users who actually want
to see all the pages. Without the Back/Next links, they would be “pogo sticking” to the
parent page all the time; they might just give up and leave.
How
List all the items or pages, in order, on the parent page. Render the list in a way that suits
the types of items you’re dealing with (see Chapter 5), such as a Thumbnail Grid for photos,
or a rich text list for articles. A click on an item or link brings the user to that item’s page.
On each item page, put Back/Next links. Many sites show a small preview of the next item,
such as its title or a thumbnail (Flickr does this, as shown in Figure 3-19). In addition, put
in an Up link to bring the user back to the parent page, and label it with “Back to <Page
Title Here>” or something similar.
One Pyramid variation turns a static linear sequence into a loop by linking the last page
back to the first without going back to the parent. This can work, but does the user know
she’s looped all the way back around? Does she recognize the first page in the sequence?
Not necessarily. If the order of a sequence is important, you should link the last page to
the parent page, since it tells the user that she’s seen all there is to see.
Examples
Flickr’s item page is a classic Pyramid example. This Picture Manager shows pictures in a
sequence called a photostream, which can be seen in its entirety by clicking the labeled
link at the top of this widget (see Figure 3-19). The two thumbnails show the previous and
next pictures in the photostream.
Figure 3-19. Flickr
The New York Times interactive feature shown in Figure 3-20 is another Picture Manager.
The parent page shows an irregular Thumbnail Grid of clickable pictures; the item page
(shown in Figure 3-21) contains arrow buttons to traverse the series of photos. Note that

-- 123 of 577 --

96 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
this shows the user where she is in the sequence—“121 of 176”—which is a nice touch.
There is no “Up” button, but the only other control in that panel, “Close,” returns the user
to the parent page. (It thus makes an interesting use of a Modal Panel.)
Figure 3-20. A New York Times interactive feature; this is the parent page, where all the photos are
shown
Figure 3-21. A child page from the same feature, showing Back, Next, and Close buttons near the photo

-- 124 of 577 --

The Patterns 97
Modal Panel
Figure 3-22. Modal Panel schematic
What
Show only one page, with no other navigation options, until the user finishes the immediate task.
Use when
The app or site has gotten into a state from which it shouldn’t or can’t proceed without
input from the user. In a document-centric application, for instance, a “save” action might
need the user to supply a filename if one wasn’t already given. In other contexts, the user
may need to sign in before proceeding, or acknowledge an important message.
If the user simply initiates a minor action that may need further input, try to find a way
to ask for that input without a modal panel. You could show a text field right below the
button that the user clicked, for example, and leave it “hanging” there until the user comes
back to it—there’s no need to hold up the whole site or app until that input is given. Let the
user do something else, and then return to the question at a later time.
Why
A modal panel cuts off all other navigation options from the user. He can’t ignore it and
go somewhere else in the app or site: he must deal with it here and now. When that’s done,
he gets sent back to where he was before.
It’s an easy model to understand—and to program—though it was overused in applications of past years. A modal panel is disruptive. If the user isn’t prepared to answer
whatever the modal panel asks, it interrupts his workflow, possibly forcing him to make
a decision about something he just doesn’t care about. But when used appropriately, a
modal panel channels the user’s attention into the next decision that he needs to make.
There are no other navigation possibilities to distract him.
Download from Wow! eBook <www.wowebook.com>

-- 125 of 577 --

98 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
How
In the same space on the screen where the user’s attention lies, place a panel, dialog box,
or page that requests the needed information. It should prevent the user from bringing up
other pages in that application. This panel ought to be relatively uncluttered, in keeping
with the need to focus the user’s attention onto this new task with minimal distractions.
Remember that this is a navigation-related pattern. You should carefully mark and label
the ways out, and there shouldn’t be many of them; one, two, or maybe three. In most
cases, they are buttons with short, verbish labels, such as “Save” or “Don’t save.” There is
usually a “Close” or “X” button in the upper right. Upon clicking a button, the user should
be taken back to the page he came from.
The lightbox effect is a very effective visual presentation of a modal panel. By dimming
most of the screen, the designer highlights the bright modal panel and focuses attention
on it. (For this to work, the modal panel needs to be large enough for the user to find it
effortlessly. I’ve seen modal panels that were so small and off-center that it was hard to
find them in a large browser window.)
Instead of layering a modal panel on top of another page, some websites simply use
pages with extremely limited navigation. Sign-in and registration screens are commonly
done this way: global and local navigation are stripped out, and all that’s left are the exits
(Cancel, Continue, etc.) and an Escape Hatch.
Operating systems and GUI platforms usually offer OS-level modal dialog boxes. These
are best used in traditional desktop applications—websites should avoid them in favor
of lighter-weight overlay techniques, which are easier for the designer to control and less
disruptive to the user.
Examples
SlideShare uses a lightbox to draw attention to its login dialog. If you try to do something
on SlideShare that requires you to be signed in, the modal panel in Figure 3-23 appears.
There are only three ways to deal with it: sign in, register, or click the familiar “X” button
in the upper-right corner. This is very typical of many lightbox-highlighted modal panels
on the Web.

---

## Sección 34: Chapter 2), language tools, and so on.

-- 126 of 577 --

The Patterns 99
Figure 3-23. SlideShare’s login modal panel
Likewise, Kayak uses a similar lightbox for a modified search—but this one actually points
to the link that launched it, which helps the user connect her gesture with the resultant
modal panel (see Figure 3-24). It’s a nice touch.
Figure 3-24. Kayak’s modal panel for modifying searches
The “shade” form of a Mac modal dialog box draws attention to itself as it drops down from
the window title bar (animated, of course). These and other application-level modal dialogs
actually prevent the user from interacting with the rest of the application, so the user is forced
to finish or dismiss this thread of work before doing anything else (see Figure 3-25).

-- 127 of 577 --

100 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
Figure 3-25. A modal panel in a Mac application
In other libraries
http://quince.infragistics.com/Patterns/Modal%20Panel.aspx
http://patternry.com/p=overlay/
See also the Dialog Overlay pattern in Designing Web Interfaces by Bill Scott and Theresa
Neil (O’Reilly, http://oreilly.com/catalog/9780596516253/). Other types of overlays are described in that chapter as well.
Deep-linked State
http://
Figure 3-26. Deep-linked State schematic

-- 128 of 577 --

The Patterns 101
What
Capture the state of a site or app in a URL that can be saved or sent to other people. When
loaded, it restores the state of the app to what the user was seeing.
Use when
The site or app’s content is something large and interactive, such as a map, book, video,
or information graphic. A specific desired point or state might be hard to find, or it may
take many steps to get there from a typical starting point. The app may have many usersettable parameters or states, such as viewing modes, scales, data layers, and so on—these
may add to the complexity of finding a particular point and seeing it in the “right” way.
Why
Deep-linked State gives the user a way to jump directly to a desired point and application
state, thus saving time and work. It behaves like a “deep link” directly into a piece of content on a conventional site—or a permalink to a blog entry—in the sense that you end up
with a URL pointing directly to the desired content. But it can be more complex than a
permalink, because it can capture both application state and content position.
This pattern is useful for saving a state that the user might want to re-create later, especially if
he can “bookmark” it using well-known mechanisms (like browser bookmarks, sites such as
Delicious, etc.). It’s also handy for sharing with other people, and that’s where it really shines.
A URL representing a Deep-linked State can be emailed, tweeted, posted to a social network,
discussed in a forum, published in a blog entry, and talked about in any number of ways. It
might make a statement, or go viral, or become a “socially mediated object.”
How
Track the user’s position in the content, and put that into a URL. Track supporting data
there as well—comments, data layers, markers, highlighting, and so on—so that reloading
the URL will bring it all back.
Consider what other parameters or interface states you might want users to save: zoom levels,
magnification, viewing modes, search results, and so on. Not all of these should necessarily be captured, since loading the Deep-linked State shouldn’t trample on settings that a user
doesn’t want changed. Work carefully through some usage scenarios to figure this out.

-- 129 of 577 --

102 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
URLs are the best format for saving Deep-linked States: they are universally understood,
portable, short, and supported by a vast variety of tools, such as bookmarking services.
(If you’re dealing with nonweb applications, you may need to be more creative.) Other
formats can also be used, such as XML; a text-based format is generally much easier to
manage than a binary format.
As a user moves through the content and changes various parameters, immediately put
the updated URL in the browser’s URL field so that it can be easily seen and captured.
Not everyone will think to find it there, so you might also design a “Link” feature whose
existence tells the user, “Here’s how you create a link to this screen.” Some sites offer to
generate a JavaScript fragment that not only captures position and state, but also lets users
embed the whole thing into another website.
Examples
Google Books captures a large amount of state in its URLs (see Figure 3-27): the position in the book, the viewing mode (single page, two-up, thumbnails), the presence of
toolbars, and even search results. It does not capture magnification level, which makes
sense, as that’s a very individual setting. The URL as seen in the “Link” tool is actually
redundant—the URL shown by the browser itself is exactly the same.
Figure 3-27. Deep-linked State in Google Books, found in two places: the browser’s URL field, and the
“Link” feature
Many Eyes, the visualization tools published by IBM, gives visitors the ability to put together
their own custom information graphics, based on plot types and data sets offered by the site
(see Figure 3-28). They’re highly interactive and rich. To share one of these visualizations,
you can either generate JavaScript for it (for embedding), or create a snapshot image.

-- 130 of 577 --

The Patterns 103
Figure 3-28. Capturing the state of a visualization at Many Eyes
Its interface doesn’t advertise it, but YouTube lets you put a timestamp into the URL for a
video. When loaded, this brings the viewer directly to the specified time in the video. The
site http://youtubetime.com explains how to do it (see Figure 3-29): add #t=XmYs to the end
of the URL, where X is the number of minutes and Y the number of seconds.
Figure 3-29. YouTubeTime’s explanation of how to use the URL to deep-link into the middle of a video

-- 131 of 577 --

104 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
Escape Hatch
Figure 3-30. Escape Hatch schematic
What
On each screen that has limited navigation options, place a button or link that clearly gets
the user out of that screen and back to a known place.
Use when
You’ve got pages that constitute some sort of serial process, such as a wizard, or any pages
that lock the user into a limited navigation situation, such as a Modal Panel. These might
be pages that users can reach out of context, as they could do via search results.
(Escape Hatches sometimes aren’t necessary when you have Sequence Maps or Breadcrumbs
on a page. Users who understand them can use those to get back to some known place.)
Why
Limited navigation is one thing, but having no way out is quite another! If you give the
user a simple, obvious way to escape from a page, no strings attached, he’s less likely to
feel trapped there.
This is the kind of feature that helps people feel like they can safely explore an app or site.
It’s sort of like an undo feature—it encourages people to go down paths without feeling
like they’re committing to them. See the Safe Exploration pattern in Chapter 1.
Now, if these are pages that users can reach via search results, it’s doubly important that
Escape Hatches be put on each page. Visitors can click these to get to a “normal” page that
tells them more about where they actually are.
How
Put a button or link on the page that brings the user back to a “safe place.” This might be
a home page, a hub page in a hub-and-spoke design, or any page with full navigation and
something self-explanatory on it. Exactly what it links to will depend upon the application’s design.

---

## Sección 35: Chapter 2), language tools, and so on.

-- 132 of 577 --

The Patterns 105
Examples
Websites often use clickable site logos as home-page links, usually in the upper left of a
page. These provide an Escape Hatch in a familiar place, while helping with branding.
In some dialogs, a Cancel button or the equivalent can serve this purpose. These also let
the user say, “I’m done with this; forget I ever started it.”
Have you ever called a company—say, your bank—and had to work your way through a
set of phone menus? They can be long, confusing, and time-consuming. If you find yourself in the wrong menu, you may just hang up and try again from the top. But many phone
menu systems have a hidden Escape Hatch that they don’t tell you about: if you dial “0” at
any point, you might be connected to a human operator.
Many websites have certain pages that limit navigation options, such as Modal Panels and
pages without global navigation. The Netflix login screen is one example. If a user finds
herself here and doesn’t want to log in, she can click on the Netflix logo to go back to the
home page (see Figure 3-31).
Figure 3-31. Netflix sign-in page, with the logo as an Escape Hatch
Sometimes literalism works. Google Labs offers features that aren’t ready for release, and
they occasionally break. In the example shown in Figure 3-32, Google Maps gives the user
an explicit “escape hatch” URL to use when things go wrong.
Figure 3-32. Google Maps Labs Escape Hatch

-- 133 of 577 --

106 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
In other libraries
These two patterns are named “Home Link.” The concept is very similar to Escape Hatch.
http://ui-patterns.com/patterns/HomeLink
http://welie.com/patterns/showPattern.php?patternID=home
Fat Menus
Figure 3-33. Microsoft’s All Products menu
What
Display a long list of navigation options in drop-down or fly-out menus. Use these to
show all the subpages in site sections. Organize them with care, using well-chosen categories or a natural sorting order, and spread them out horizontally.
Use when
The site or app has many pages in many categories, possibly in a hierarchy with three or
more levels. You want to expose most of these pages to people casually exploring the site,
so they can see what’s available. Your users are comfortable with drop-down menus (click
to see them) or fly-outs (roll over them with the pointer).

-- 134 of 577 --

The Patterns 107
Why
Fat Menus make a complex site more discoverable. They expose many more navigation
options to visitors than they might otherwise find.
By showing so many links on every page, you make it possible for a user to jump directly
from any subpage to any other subpage (for most subpages, anyhow). You thus turn a
multi-level site—where subpages aren’t linked to the subpages in other site sections—into
a fully connected site.
Fat Menus are a form of progressive disclosure, an important concept in user interface design. Complexity is hidden until the user asks to see it. A visitor to a site that uses these
can look over the menu headings to get a high-level idea of what’s there, and when he’s
ready to dive in, he can open up a Fat Menu with a gesture. He isn’t shown millions of subpages before he’s ready to deal with them.
If you’re already using menus in your global navigation, you might consider expanding
them to Fat Menus if surfacing more links makes the content more attractive to casual
browsers. People won’t have to drill down into categories and subcategories of your site
hierarchy in order to discover interesting pages—they’ll see them there, right up front.
How
On each menu, present a well-organized list of links. Arrange them into Titled Sections
(Chapter 4) if they fit into subcategories; if not, use a sorting order that suits the nature of
the content, such as an alphabetical or time-based list.
Use headers, dividers, generous whitespace, modest graphic elements, and whatever else
you need to visually organize those links. And take advantage of horizontal space—you
can spread the menu across the entire page if you wish. Many sites make excellent use
of multiple columns to present categories. If you make the menu too tall, it might go
right off the end of the browser page. (The user controls how tall the browser is; guess
conservatively.)
The best sites have Fat Menus that work stylistically with the rest of the site. Design them
to fit well into the color scheme, grid, and so on of the page.
Some menu implementations don’t work well with accessibility technology such as screen
readers. Ensure that your Fat Menus can work with these. If they can’t, consider switching
to a more static strategy, such as a Sitemap Footer.
Examples
The Fat Menus on the Starbucks website are very well designed (see Figure 3-34). Each
menu is a different height but the same width, and follows a strict common page grid
(they’re all laid out the same way). The style blends in with the site, and the generous
whitespace makes it easy to read. Ads are worked into the design, but not obnoxiously.
The nonrectangular shape adds a polished look.

-- 135 of 577 --

108 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
Figure 3-34. Starbucks coffee menu
As shown in Figure 3-35, Slate’s menus are less readable and more crowded (in keeping
with the overall style of the site). These don’t take full advantage of horizontal space,
either. But the idea of using them to show featured articles is clever—the knowledgeable
user can skim a large number of headlines by rolling over the menus.
Figure 3-35. Slate’s News & Politics menu

-- 136 of 577 --

The Patterns 109
The American Red Cross doesn’t merely float its menus over the top of the page (see
Figure 3-36). When the user rolls over any top-level menu item, the resultant Fat Menu
actually replaces a carousel-style rotating news panel, taking its space in the page. The
menu is the same for all the top-level menu items, so all the subpages in every category
are visible at once.
Figure 3-36. The American Red Cross menus (all of them)
WebMD uses an alphabetical sorting order for its long, flat list of health topics, as shown
in Figure 3-37.
Figure 3-37. WebMD’s Health A–Z menu

---

## Sección 36: Chapter 2), language tools, and so on.

-- 137 of 577 --

110 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
Sitemap Footer
Figure 3-38. Whole Foods footer
What
Place a site map into the footer of every page in a site. Treat it as part of the global navigation, complementary to the header. Abridge the site map if you need to make it fit into a
compact space.
Use when
The site you’re designing uses a generous amount of space on each page, and you don’t
have severe constraints on page size or download time. You don’t want to take up too
much header or sidebar space with navigation.
The site has more than a handful of pages, but not an outrageously large number of categories and “important” pages (things that users will look for). You can fit a reasonably
complete site map—at least for pages that aren’t in the header—into a strip no taller than
about half of a browser window.
There may be a global navigation menu in the page header, but it doesn’t show all levels
in the site hierarchy—maybe it only shows the top-level categories. You prefer a simple,
well-laid-out footer instead of Fat Menus, perhaps because of implementation ease or accessibility issues.
Why
Sitemap Footers make a complex site more discoverable. They expose many more navigation options to visitors than they might otherwise have.
By showing so many links on every page, you make it possible for a user to jump directly
from any subpage to any other subpage (or major page, anyhow). You thus turn a multilevel site—where subpages aren’t linked to the subpages in other site sections—into a fully
connected site. The footer is where the user’s attention lands when she reads to the end of a
page. By placing interesting links there, you entice the user to stay on the site and read more.

-- 138 of 577 --

The Patterns 111
Finally, showing users the whole site map gives them a strong sense of how the site is constructed and where they might find relevant features. In complex sites, that could be valuable.
You may find yourself trying to choose between a Sitemap Footer design and a Fat Menus
design. In conventional websites, a Sitemap Footer would be easier to implement and
debug because it doesn’t depend on anything dynamic: instead of showing fly-out menus
when the user rolls over items or clicks on them, a Sitemap Footer is just a set of static links.
It’s also easier to use with screen readers and it doesn’t require fine pointer control, so it
wins on accessibility as well.
On the other hand, the footer may be ignored by busy or casual users who focus only on
the page content and the headers. Usability-test if you have any doubts, and watch the
click metrics to see if anyone even uses the Sitemap Footer.
How
Design a page-wide footer that contains the site’s major sections (categories) and their
most important subpages. Include utility navigation, tools such as language choice or
Social Links (Chapter 9), and other typical footer information such as copyright and privacy statements.
This might constitute a complete site map for your site, or it might not. The idea is to cover
most of what visitors need to find, without overloading the header or sidebar navigation.
In practice, what often happens is that the global navigation options at the top of the
page reflect a more task-oriented design—it tries to answer visitors’ immediate questions
regarding “What is this about?” and “Where do I find X right this second?” Meanwhile,
the Sitemap Footer shows the actual hierarchical structure of the site itself. This two-part
arrangement appears to work well.
If your site deals with content that itself requires complex navigation—such as a large set
of products, news articles, music, videos, books, and so on—you could use the top of the
page for content navigation and the Sitemap Footer for almost everything else.
Here are some features that can often be found in Sitemap Footers:
• Major content categories
• Information about the site or organization
• Partner or sister sites—for example, sites or brands owned by the same company
• Community links, such as forums
• Help and support
• Contact information
• Current promotions
• Donation or volunteer information, for nonprofits

-- 139 of 577 --

112 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
Examples
REI’s website demonstrates the difference between task-oriented top-of-page global navigation and an effective Sitemap Footer (see Figure 3-39). Shopping, learning, and travel
dominate the header, as they should—these are what most site visitors come for. The
footer handles secondary tasks that are nevertheless important: “about” information, customer support, membership, and so on.
Figure 3-39. REI header and footer
The Los Angeles Times footer shows much of the same content as the double tab in the
header, but flattened and organized somewhat differently (see Figure 3-40).

-- 140 of 577 --

The Patterns 113
Figure 3-40. Los Angeles Times header and footer
The Wall Street Journal has an immense footer (see Figure 3-41). This is probably larger
than you’ll want to make yours.
Figure 3-41. Wall Street Journal footer

-- 141 of 577 --

114 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
Flickr, as always, is minimalist (see Figure 3-42). It eschews the column structure that
most other sites use for their Sitemap Footers, and uses rows instead. MapQuest uses columns, but it also does a lovely job in a small amount of space (see Figure 3-43).
Figure 3-42. Flickr footer
Figure 3-43. MapQuest footer
In other libraries
http://welie.com/patterns/showPattern.php?patternID=sitemap-footer
http://ui-patterns.com/patterns/FatFooter
The name “Fat Footer” has sometimes been used for this pattern, with a slightly expanded definition. For some wonderful examples, see the Smashing Magazine article titled “Informative
and Usable Footers in Web Design”:
http://www.smashingmagazine.com/2009/06/17/informative-and-usable-footers-in-webdesign/

-- 142 of 577 --

The Patterns 115
Sign-in Tools
Figure 3-44. Flickr sign-in tools
What
Place utility navigation related to a signed-in user’s site experience in the upper-right
corner. Show tools such as shopping carts, profile and account settings, help, and sign-out
buttons.
Use when
Sign-in Tools are useful for any site or service where users often sign in.
Why
This pattern is purely convention; the upper-right corner is where many people expect
such tools to be, so they will often look there. Give users a successful experience by putting these tools where they expect them to be.
How
Reserve space near the upper-right corner of each page for Sign-in Tools. Place the user’s
sign-in name there first (and possibly a small version of her avatar, if it exists), unless the
name and avatar are already present elsewhere on the page. Make sure each tool works
exactly the same on every page in the site or app.
Cluster together tools such as the following:
• Sign-out button or link (this is important, so make sure it’s here)
• Account settings
• Profile settings
• Site help
Download from Wow! eBook <www.wowebook.com>

---

## Sección 37: Chapter 2), language tools, and so on.

-- 143 of 577 --

116 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
• Customer service
• Shopping cart
• Personal messages or other notifications
• A link to personal collections of items (e.g., image sets, favorites, or wish lists)
• Home
Don’t make this space too large or loud, lest it dominate the page—it shouldn’t. This is
utility navigation; it’s there when a user needs it, but is otherwise “invisible” (well, not
literally). For some items, you can use small icons instead of text—shopping carts, messages, and help all have standard visuals you can use, for instance. See the examples in this
pattern for some of them.
The site search box is often placed near the Sign-in Tools, although it needs to be in a consistent spot regardless of whether anyone is signed in.
When no user is signed in, this area of the page can be used for a sign-in box—name,
password, call to action, and possibly tools for retrieval of forgotten passwords.
Examples
Figure 3-45 shows an assortment of Sign-in Tools from Mint, Twitter, Amazon, and Gmail.
These are visually unobtrusive, but findable simply because they’re in the correct corner
of the page or window.
Figure 3-45. Clockwise from top left: Mint, Twitter, Amazon, and Gmail
Scribd uses almost all of the tools listed in this pattern (see Figure 3-46). Since there are
so many of them, a drop-down menu seems appropriate to keep them from cluttering the
corner of the page. iTunes also uses a drop down (see Figure 3-47).

-- 144 of 577 --

The Patterns 117
Figure 3-46. Scribd sign-in tools
Figure 3-47. iTunes sign-in tools

-- 145 of 577 --

118 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
Sequence Map
Figure 3-48. Hanna Andersson order sequence map
What
On each page in a sequence, show a map of all the pages in order, including a “You are
here” indicator.
Use when
You design a written narrative, a process flow, a Wizard, or anything else through which a
user progresses page by page. The user’s path is mainly linear.
If the navigation topology is large and hierarchical (as opposed to linear) you may want to
consider using Breadcrumbs instead. If you have a large number of steps or items and their
order doesn’t matter much, this morphs into a Two-Panel Selector (Chapter 5) or Overview
Plus Detail (Chapter 7).
Why
Sequence Maps tell a user how far he’s come through a series of steps—and, more importantly, how far he has yet to go before he’s finished. Knowing this helps him decide
whether to continue, estimate how long it will take, and stay oriented.
Sequence Maps also serve as navigational devices. If someone wants to go back to a previously completed step, he can do so by clicking that step in the map.
How
Near an edge of the page, place a small map of the pages in the sequence. Make it one line
or column if you can, to keep it from competing visually with the actual page content.
Give the current page’s indicator some special treatment, such as making it lighter or
darker than the others; do something similar with the already-visited pages.
For the user’s convenience, you might want to put the map near or next to the main navigation controls, usually Back and Next buttons.

-- 146 of 577 --

The Patterns 119
How should you label each page’s indicator on the map? If the pages or steps are numbered, use the numbers—they’re short and easy to understand. But you should also put
the page titles in the map. (Keep the titles short, so the map can accommodate them.) This
gives the user enough information to know which pages to go back to, and anticipate what
information he’ll need in upcoming pages.
Examples
The slideshow shown in Figure 3-49 has a Sequence Map at the bottom. It allows viewers
to move somewhat randomly through the images, though most users will probably use
the Prev and Next buttons at the top.
Figure 3-49. Boston Globe slideshow, with sequence map under photo
The Mini Cooper product configurator (see Figure 3-50) is a cross between a Settings
Editor and a Wizard in that it lets the user move back and forth at will, but organizes the
pages in a numbered sequence. The Sequence Map at the top is a critical control for “playing” with the app, for moving among the various pages and exploring different options.
Installation wizards usually require a lot of steps. The one shown in Figure 3-51, from
Adobe, has a typical Sequence Map on the lefthand side. Its steps are disabled when they’re
irrelevant or bypassed, such as this trial installation that has no Adobe ID.

-- 147 of 577 --

120 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
Figure 3-50. Mini Cooper product configurator, with sequence map in upper left
Figure 3-51. Adobe CS5 installer, with sequence map at left
In other libraries
http://ui-patterns.com/patterns/StepsLeft
http://developer.yahoo.com/ypatterns/navigation/bar/progress.html

-- 148 of 577 --

The Patterns 121
Breadcrumbs
Figure 3-52. Target breadcrumbs
What
On each page in a deep navigational hierarchy, show a list of all the parent pages, up to
the main or home page.
Use when
Your application or site has a hierarchical structure with two or more levels. Users move
around via direct navigation, browsing, filtering, searching within the site, or deep-linking
into it from elsewhere. Global navigation alone isn’t sufficient to show a “You are here”
signpost, because the hierarchy is too deep or large.
Alternatively, your site or app may have a set of browsing and filtering tools for a large data
set, such as products being sold online. The products are categorized in a hierarchy, but
that categorization doesn’t necessarily match the way people will look for those products.
Why
Breadcrumbs show each level of hierarchy leading to the current page, from the top of the
application all the way down. In a sense, they show a single linear “slice” of the overall map
of the site or app.
So, like a Sequence Map, Breadcrumbs help a user figure out where he is. This is especially
handy if he’s jumped abruptly to somewhere deep in the tree, as he would by following
search results or a faceted browsing tool. Unlike a Sequence Map, though, Breadcrumbs
don’t tell the user where he’s headed next. They deal only with the present.
Some texts tell you that Breadcrumbs—so named for the Hansel and Gretel story, in which
Hansel drops breadcrumbs on a forest trail to mark his way home—are most useful for
telling the user how he got to where he is from the top of the site or app. But that’s only
true if the user has drilled straight down from the top, with no sidetracking, or following
other branches, or dead ends, or searching, or linking directly from other pages…not
likely.

---

## Sección 38: Chapter 2), language tools, and so on.

-- 149 of 577 --

122 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
Instead, Breadcrumbs are best for telling you where you are relative to the rest of the app
or site—it’s about context, not just history. Look at the Target example in Figure 3-52.
Faceted browsing—searching for items with certain characteristics—brought me to this
page deep in the Target website. (A keyword search could have done the same.) But now
that I’m here, I can see where I am in the product hierarchy and I know what else I can
look at. I can use the Breadcrumbs to look at all of Target’s stand mixers and do some comparison shopping.
Finally, Breadcrumbs are usually clickable links or buttons. This turns them into a navigational device in their own right.
How
Near the top of the page, put a line of text or icons indicating the current level of hierarchy.
Start with the top level; to its right, put the next level and so on down to the current page.
Between the levels, put a graphic or text character to indicate the parent/child relationship
between them. This is usually a right-pointing arrow, triangle, greater-than sign (>), slash
(/), or right angle quotes (»).
The labels for each page should be the page titles. Users should recognize them if they’ve
been to those pages already; if not, the titles should at least be self-explanatory enough to
tell the user what those pages are about. The labels should be links to those pages.
Some Breadcrumbs show the current page as the last item in the chain; some don’t. If yours
do, make them visually different from the rest of the items, since they’re not links.
Examples
The Windows 7 control panel is a hierarchical Settings Editor that can be three levels deep. The screenshot in Figure 3-53 shows the Personalization settings within the
Appearance and Personalization category (which has at least six subcategories in addition
to Personalization).
Figure 3-53. Windows 7 control panel

-- 150 of 577 --

The Patterns 123
Online communities such as the one shown in Figure 3-54 often have deep hierarchies:
forum categories, forums, subforums, yet more subforums, and threads. Breadcrumbs help
users understand and traverse this hierarchy.
Figure 3-54. Mothering.com forums
Figure 3-55 shows an example of Breadcrumbs used outside a “page” context. The Chrome
developer tools, among many other such tools for software developers, provide a way for
users to manage very deep hierarchical structures (in this case, nested structural tags in
an HTML page). Breadcrumbs are invaluable here for keeping track of where one is in that
structure.
Figure 3-55. Chrome developer tools
In other libraries
http://developer.yahoo.com/ypatterns/navigation/breadcrumbs.html
http://ui-patterns.com/patterns/Breadcrumbs
http://www.welie.com/patterns/showPattern.php?patternID=crumbs
http://patternry.com/p=breadcrumbs/
http://quince.infragistics.com/Patterns/Breadcrumbs.aspx
http://www.smashingmagazine.com/2009/03/17/breadcrumbs-in-web-design-examplesand-best-practices-2/

-- 151 of 577 --

124 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
Annotated Scrollbar
Figure 3-56. MSNBC scrollbar showing page sections
What
Make the scrollbar serve double-duty as a map of the content, or as a “You are here”
indicator.
Use when
You’re designing either a document-centric application or a pan-and-zoom interface,
such as a map or large visualization. Users will scan this document or graphic for items of
note, such as specific page numbers or landmarks. They might have trouble keeping track
of where they are and where to go next as they scroll.

-- 152 of 577 --

The Patterns 125
Why
Even though the user remains within one navigational space as she scrolls through the
content, signposts are still useful. When scrolling quickly, it’s really hard to read the text
flying by (or impossible, if the screen can’t refresh quickly enough), so some other indicator of position is necessary. Even if she stops briefly, the part of the document she can see
may not contain anything she can orient herself by, like headers.
Why a scrollbar? Because that’s where the user’s attention is focused. If you put signposts
there, the user will see them and use them as she scrolls, rather than trying to look at two
different screen areas at once. You can put signposts close to the scrollbar and still get the
same effect; the closer, the better.
When the scrollbar shows indicators in the scrollbar track itself, you get something that
behaves just like a one-dimensional Overview Plus Detail (Chapter 7). The track is the overview; the scrolled window is the detail.
How
Put a position indicator on or near the scrollbar. Either static or dynamic indicators might
work—static indicators are those that don’t change from second to second, such as blocks
of color in the scrollbar track (see the tkdiff screenshot in Figure 3-57). Make sure their
purpose is clear, though; such things can baffle users that aren’t used to seeing graphics
in the scrollbar track!
Dynamic indicators change as the user scrolls, and they are often implemented as tool
tips. As the scroll position changes, the tool tip shown next to the scroll thumb changes
to show information about the content there. This will vary with the nature of the application. Microsoft Word, for instance, puts page numbers and headers in these tool tips.
In either case, you’ll need to figure out what a user will most likely be looking for, and
thus what you need to put into the annotations. The content structure is a good starting
point. If the content is code, you might show the name of the current function or method;
if it’s a spreadsheet, show the row number, and so on. Also consider whether the user is
currently performing a search—the scrollbar annotation should show where the search
results are in the document.
Examples
The tkdiff application shown in Figure 3-57 visually highlights the differences between
two versions of a text file: newly added sections are marked in green, changed sections are
in blue, and deleted sections are in red. An Annotated Scrollbar serves as an overall map,
thus making large file “diffs” easier to comprehend.

---

## Sección 39: Chapter 2), language tools, and so on.

-- 153 of 577 --

126 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
Figure 3-57. tkdiff
Chrome annotates its scrollbar with search results (see Figure 3-58). When you search for
a word on a web page, Chrome highlights the found words on the page with yellow, and
places a yellow indicator in the scrollbar wherever they are found. This way, the user can
scroll directly to those points in the document.
Figure 3-58. Chrome “Find” results
In other libraries
http://quince.infragistics.com/Patterns/Annotated%20Scrollbar.aspx

-- 154 of 577 --

The Patterns 127
Animated Transition
Figure 3-59. Mac OS dock transition
What
Smooth out a startling or dislocating transition with an animation that makes it feel natural.
Use when
Users move through a large virtual space, such as an image, spreadsheet, graph, or text
document. They might be able to zoom in to varying degrees, pan or scroll, or rotate the
whole thing. This is especially useful for information graphics, such as maps and plots.
(See Chapter 7 for more about information graphics.)
Alternatively, the interface might have sections that can be closed and opened again, either by the system or by the user—such as trees with closable parent nodes, standalone
windows that open and close, or an interface built with Collapsible Panels (Chapter 4).
Animated Transition might also be used when users jump from one separate page to another.

-- 155 of 577 --

128 Chapter 3: Getting Around: Navigation, Signposts, and Wayfinding
Why
All of these transformations can disrupt a user’s sense of where she is in the virtual space.
Zooming in and out, for instance, can throw off her spatial sense when it’s done instantaneously, as can rotation and the closing of entire sections that prompts a re-layout of the
screen. Even scrolling down a long page of text, when it’s jumpy, can slow down the reader.
But when the shift from one state to another is visually continuous, it’s not so bad. In other
words, you can animate the transition between states so that it looks smooth, not discontinuous. This helps keep the user oriented. We can guess that it works because it more
closely resembles physical reality—when was the last time you instantly jumped from the
ground to 20 feet in the air? Less fancifully, an animated transition gives the user’s eyes a
chance to track a location while the view changes, rather than trying to find the location
again after an abrupt change.
When done well, Animated Transitions bolster your application’s cool factor. They’re fun.
How
For each type of transformation that you use in your interface, design a short animation
that “connects” the first state with the second state. For zoom and rotate, you might show
the in-between zoom or rotate levels; for a closing panel, you might show it shrinking
while the other panels expand to take up the space it leaves behind. To whatever extent
possible, make it look like something physical is happening.
But this pattern is a double-edged sword. Beware of making the user motion-sick! The
animations should be quick and precise, with little or no lag time between the user’s initiating gesture and the beginning of the animation. Limit it to the affected part of the
screen; don’t animate the whole window. And keep it short. My preference would be to
keep it well under a second, and research shows that 300 milliseconds might be ideal for
smooth scrolling. Test it with your users to see what’s tolerable.
If the user issues multiple actions in quick succession, such as pressing the down arrow
key many times to scroll, combine them into one animated action. Otherwise, the user
might sit there through several seconds’ worth of animation as the punishment for pressing the down arrow key 10 times. Again: keep it quick and responsive.
Some of the types of transitions listed by the Yahoo! pattern library (http://developer.yahoo.
com/ypatterns/richinteraction/transition/) and Designing Web Interfaces are as follows:
• Brighten and dim
• Expand and collapse
• Fade in, fade out, and cross-fade
• Self-healing
• Slide
• Spotlight

-- 156 of 577 --

The Patterns 129
In other libraries
For more discussion and tons of great examples of the Animated Transitions in the preceding list, see the Transition cluster of patterns at the Yahoo! Design Pattern Library:
http://developer.yahoo.com/ypatterns/richinteraction/transition/
In addition, Scott and Neil’s Designing Web Interfaces contains an entire chapter on transitions. It covers some of the same ground as the Yahoo! site, but it’s worth reading.

-- 157 of 577 --

-- 158 of 577 --

---

## Sección 40: Chapter 4

Organizing the Page:
Layout of Page Elements
Page layout is the art of manipulating the user’s attention on a page to convey meaning,
sequence, and points of interaction.
If the word manipulating sounds unseemly to you, think about it this way. Film and television directors make their living by manipulating your attention on the movie or TV
screen, and you are presumably a willing participant. It is the same for editors who arrange articles, headlines, and ads in a newspaper. If all this content were presented in a
drab monotone, with no graphic emphasis to grab and move your attention, you would
find it harder to extract meaning—what’s supposed to be important, and what’s not?
Even though it is ultimately an art, there is more rationality to good page layout than
you might think there is. Some important ideas from graphic design are explained in
this chapter introduction; each can guide you in the layout of pages, screens, and dialog
boxes. We’ll talk about visual hierarchy, visual flow and focal points, and grouping and
alignment—all predictable and rational approaches to page design. This chapter’s patterns describe concrete ways to apply those high-level concepts to interface design.
But the changeable, interactive nature of computer displays makes layout easier in some
ways, harder in others. We’ll talk about why that’s true. Some of these patterns work as
well in print as they do on-screen, but most of them would be useless in print—they presume that the user will interact with the page.

-- 159 of 577 --

132 Chapter 4: Organizing the Page: Layout of Page Elements
The Basics of Page Layout
This section discusses several elements of page layout: visual hierarchy, visual flow, and
how to use dynamic displays.
Visual Hierarchy: What’s Important? What’s Related?
The concept of visual hierarchy plays a part in all forms of graphic design. Put simply, the
most important content should stand out the most, and the least important should stand
out the least. Also, titles ought to look like titles, subtitles ought to look like subtitles, and
lists ought to look like lists—in other words, a reader should be able to deduce the informational structure of the page from its layout.
What is the most important thing on the page you’re designing? Make that the center of
attention. Can you rank other things in declining order of importance? Arrange them on
the page in ways that draw progressively less attention; make them look less interesting.
In short, a good visual hierarchy gives instant clues about:
• The relative importance of page elements
• The relationships among them
How to make things look important
For short but large text—such as headlines and short phrases—use font size, contrasting
color, and visual weight (see Figure 4-1). You can also make text look very dramatic by
setting it off with generous whitespace or background color. Use two or more of these
characteristics at a time on emphasized text to differentiate it from body text.
Figure 4-1. Large text in a hierarchy
Blocks of smaller items—such as body text, links, or interactive tools—can be emphasized
or deemphasized with these tools. See Figure 4-2 for examples of each.

-- 160 of 577 --

The Basics of Page Layout 133
Density
A dense, heavy-looking block has stronger contrast with the surrounding page; an
open look has less contrast.
Background color
Contrast draws attention. Black on white, or vice versa, is the strongest contrast
possible.
Position and size
A medium or large text block, roughly in the center of the page, calls attention to itself as the primary content (like an article or blog post). But a small strip of text at the
bottom of the page says quietly, “I’m just a footer” and begs to be ignored!
Rhythm
Lists, grids, alternating elements such as headlines and summaries, and whitespace
separation can create a strong visual rhythm that irresistibly draws the eye.
Figure 4-2. Ways to emphasize blocks of text or small items (clockwise from upper left): density,
background color, rhythm, and position and size
Put small but important items at the top of the page, along the left side, or in the top-right
corner (see Figure 4-3). Give them high contrast and visual weight, and set them off with
whitespace. But note that in a text-heavy screen, like most websites, certain controls—especially search fields, sign-in fields, and large buttons—tend to stand out anyway! This is
less about raw visual characteristics than meaning: if someone is looking for a search box,
for instance, her eyes will go straight to the text fields on the page. (She may not even read
the labels for those text fields.)
Download from Wow! eBook <www.wowebook.com>

-- 161 of 577 --

134 Chapter 4: Organizing the Page: Layout of Page Elements
Figure 4-3. Emphasizing small items
High-contrast, dramatic images draw attention; so do pictures of faces. But much of the
time, images on websites get ignored by viewers motivated to get information out of a
page or to get a task done. Pictures are a wildcard in a visual hierarchy. Use them thoughtfully, and refer to Chapter 11 for a discussion on using visual elements to communicate
branding, emotion, and other nonrational attributes.
One more thing: don’t discount “ad blindness.” Users may consciously ignore elements
that look like ads, even if those elements carry important information! Again, this is about
meaning, not visuals. If you’ve ever brought up an ad-filled web page and pointedly ignored the brightly colored moving ads (so you could read the monotonous blocks of text
that you went there to read), you know that we’re not merely slaves to our hardwired visual systems! We can choose to ignore things that we think we don’t need to look at, and
zero in on what we think is the important part of the page.
How to show relationships among page elements
Grouped items look related (see Figure 4-4). Conversely, isolation implies distinction—
in the previous section, I recommended that small but important items be set off with
whitespace for this reason. This uses the Gestalt principles of proximity and closure (see
the sidebar “Four Important Gestalt Principles” on page 139).
Similar items look like peers (see Figure 4-5). If you have a few things “of a type” and you
want viewers to see them as equally interesting alternatives, give them an identical (and
distinctive) graphic treatment.

---

## Sección 41: Chapter 4

-- 162 of 577 --

The Basics of Page Layout 135
Is one item more “special” than the others like it? Give it a slightly different treatment,
such as a contrasting background color, but otherwise keep it consistent with the others
(see Figure 4-6). Or use a graphic element to disrupt the line along which the items are
aligned, such as a bump-out, overlap, or something at an angle.
A list of many similar items, arranged in a strong line or column, becomes a set of peer
items to be viewed in a certain order (see Figure 4-7). Align these items very precisely
with each other to create a visual line (see the Gestalt principle of continuity in the upcoming sidebar). Examples include bulleted lists, navigation menus, text fields in a form,
row-striped tables, and lists of headline/summary pairs. Note the alternating repetition
used in the latter two examples. Alternating repetition can look beautiful when done well,
and can set up a nice visual rhythm on the page.
Figure 4-4. Grouping related items Figure 4-5. Peer items
Figure 4-6. Distinguishing one item among peers Figure 4-7. Lists of items
Indented and shrunken text tucked under a stronger element modifies that stronger element.
Image captions, secondary text, comments, and so forth all behave this way (see Figure 4-8).

-- 163 of 577 --

136 Chapter 4: Organizing the Page: Layout of Page Elements
Containment implies a parent/child relationship (see Figure 4-9). Use boxes, blocks of
background color, Module Tabs, Accordions, and text blocks or tool groups surrounded by
whitespace to contain and nest related items (see the Gestalt principle of closure in the
upcoming sidebar). Indenting also implies parent/child relationships in the context of an
outline or a hierarchical menu.
Figure 4-8. Captions and comments Figure 4-9. Containment
Visual Flow: What Should I Look at Next?
Visual flow deals with the tracks that readers’ eyes tend to follow as they scan the page.
It’s intimately related to visual hierarchy, of course—a well-designed visual hierarchy sets
up focal points on the page wherever you need to draw attention to the most important
elements, and visual flow leads the eyes from those into the less important information.
As a designer, you want to be able to control visual flow on a page so that people follow it
in approximately the right sequence.
Several forces can work against each other when you try to set up a visual flow. One is our
tendency to read top to bottom and left to right. When faced with a monotonous page of
text, that’s what you’ll do naturally; but if there are strong focal points on the page, they
can distract you from the usual progression, for better or for worse.
Focal points are the spots your eyes can’t resist going to. You tend to follow them from
strongest to weakest, and skillfully designed pages have only a few—too many focal points
dilute the importance of each one. A good visual hierarchy uses focal points to pull eyes
to the right places in the right order.
The next time you pick up a magazine, look at some well-designed ads, and notice what
your eyes gravitate toward. The best commercial graphic artists are masters at setting up
focal points to manipulate what you see first.

-- 164 of 577 --

The Basics of Page Layout 137
So how do you create a good visual flow? One simple way is to use implied lines, either
curved or straight, to connect elements on the page (see Figure 4-10). This creates a visual
narrative for the viewer to follow.
Figure 4-10. Implied lines for visual flow
Put calls to action after the text you want viewers to read first. If you don’t care whether
they read it or not, you can isolate the calls to action with whitespace (see Figure 4-11).
Figure 4-11. Calls to action, both in the flow and out of it
Likewise, if you’re designing a form, arrange the controls along a continuous path and
put “I’m finished” buttons (OK, Cancel, Submit, Buy, etc.) at the end of that line (see
Figure 4-12). See the patterns Right/Left Alignment and Diagonal Balance for two concrete
approaches to form layout, and Prominent “Done” Button in Chapter 6.

-- 165 of 577 --

138 Chapter 4: Organizing the Page: Layout of Page Elements
Figure 4-12. OK button at the end of a form
It’s not hard to set up a layout that flows well, but be on your guard against layout choices
that work counter to flow. If you want viewers to read a site’s story and value proposition,
arrange the critical pieces of that narrative along a continuous line, and don’t interrupt it
with eye-catching extras. If you’re designing a form or set of interactive tools, don’t scatter
controls all over the page—that just forces the user to work harder to find them.
Figure 4-13 shows a distinctly poor example of visual flow and visual hierarchy. How
many focal points are there, and how do they compete with one another? Where does
your eye want to go first, and why? What does this page say is important?
Figure 4-13. Weather Underground’s jumbled visual hierarchy

-- 166 of 577 --

The Basics of Page Layout 139
Four Important Gestalt Principles
The.theory.behind.grouping.and.alignment.was.developed.early.in.the.20th.century.by.the.
Gestalt.psychologists..They.described.several.layout.properties.that.seem.to.be.hardwired.into.
our.visual.systems..Among.them.are.the.following:
Proximity
Put. things. close. together,. and. viewers. will. associate. them. with. one. another..This. is. the.
basis.for.strong.grouping.of.content.and.controls.on.a.UI.
Similarity
If.two.things.are.the.same.shape,.size,.color,.or.orientation,.for.instance,.viewers.will.also.
associate.them.with.each.other.
Continuity
Our.eyes.want.to.see.continuous.lines.and.curves.formed.by.the.alignment.of.smaller.
elements..
Closure
We.also.want.to.see.simple.closed.forms,.such.as.rectangles.and.blobs.of.whitespace,.that.
aren’t.explicitly.drawn.for.us..Groups.of.things.often.appear.to.be.closed.forms.
Figure.4-14.depicts.these.four.layouts.and.shows.how.you.can.combine.them.to.create.an.
effective.overall.design.
As.important.as.they.are.individually,.these.principles.are.best.used.in.combination.with.one.
another..Once.again,.redundancy.is.helpful;.the.fifth.grouping.looks.more.like.an.actual.page.
layout.than.a.retro-styled.mosaic.
Continuity.and.closure,.then,.explain.alignment..When.you.align.things,.you.form.a.continuous.
line.with.their.edges,.and.the.users.will.follow.that.line.and.(perhaps.subconsciously).assume.
a.relationship..If.the.aligned.items.are.coherent.enough.to.form.a.shape—or.to.form.one.out.
of.the.whitespace.or.“negative.space”.around.it—closure.is.also.at.work,.adding.to.the.effect..
Proximity Similarity
Continuity Closure
All together now
Figure 4-14. Four Gestalt principles

---

## Sección 42: Chapter 4

-- 167 of 577 --

140 Chapter 4: Organizing the Page: Layout of Page Elements
Using Dynamic Displays
Everything I’ve discussed so far applies equally to UIs, websites, posters, billboards, and
magazine pages. They deal with static aspects of layout. Ah, but you have a dynamic computer display to work with—and suddenly time becomes another dimension of design!
Just as importantly, computers permit user interaction with the layout to an extent that
most printed things can’t.
There are many, many ways you can take advantage of the dynamic nature of computer
displays. Consider space usage, for example—even the biggest consumer-grade computer
screens have less usable space than, say, a poster or a newspaper page. That’s life. If you
design for mobile devices, you’ve got an especially tiny space to work in. There are many
dynamic techniques for using that space to present more content than you can show at
one time.
Scrollbars, of course, are one very common way of presenting a small “viewport” onto a
large thing, such as text, an image, or a table. Scrollbars let the user move around at will,
in one or two dimensions (but refrain from using horizontal scrolling with text, please).
Or, if you can carve up the content into coherent sections, you have several options—
Module Tabs, Accordions, Collapsible Panels, and Movable Panels all put some layout control
into the user’s hands, unlike the more static Titled Sections. (You can also split up content over multiple virtual pages and let the user navigate between them; see Chapter 3.)
These patterns invoke time by letting the user see different content at different times of
his choosing.
If you want to direct the user through a sequence of steps, Responsive Enabling and
Responsive Disclosure are two time-honored ways of doing so.
The Patterns
This chapter’s patterns give you specific ways to put all these layout concepts into play.
The first three address the visual hierarchy of the whole page, screen, or window, regardless of the type of content you put into that page. You should consider Visual Framework
fairly early in a project, since it affects all the major pages and windows in an interface.
1. Visual Framework
Do you have a single important thing to show on the page, or several features or options
of similar importance? Center Stage applies to pages that contain a single main item or task
with other lesser items around it, whereas Grid of Equals makes several “peer” items look
similar. (You could use both in separate sections of a large page, of course.)
2. Center Stage
3. Grid of Equals

-- 168 of 577 --

The Patterns 141
The next group of patterns represents alternative ways of “chunking” content on a page
or window. They’re useful when you have more content than you can comfortably put
on the page at one time. Should the different sections all be visible at once, or can they
be viewed independently? Is it OK for users to manipulate those sections on the page, or
maybe overlook the hidden ones? These patterns deal with visual hierarchy too, but they
also involve interactivity, and they can help you choose among the specific mechanisms
available in UI toolkits.
4. Titled Sections
5. Module Tabs
6. Accordion
7. Collapsible Panels
8. Movable Panels
Right/Left Alignment and Diagonal Balance draw on the concepts of visual flow, alignment,
and other things discussed in the chapter introduction. They deal with the spatial relationships among the smaller, more static elements on a page, such as text and controls.
9. Right/Left Alignment
10. Diagonal Balance
The last three patterns deal with the dynamic aspects of content layout. Responsive
Disclosure and Responsive Enabling are two ways of directing a user through a series of steps
or a set of options; they indicate what can be done at any point in time, while preventing
the user from straying into areas that will get her into trouble. Liquid Layout is a technique
for arranging a page that can change size and shape at the user’s whim.
11. Responsive Disclosure
12. Responsive Enabling
13. Liquid Layout
Visual Framework
Figure 4-15. JAQK

-- 169 of 577 --

142 Chapter 4: Organizing the Page: Layout of Page Elements
What
Design each page to use the same basic layout, colors, and stylistic elements, but give the
design enough flexibility to handle varying page content.
Use when
You’re building a website with multiple pages, or a UI with multiple windows—in other
words, almost any complex software. You want it to “hang together” and look like one
thing, deliberately designed; you want it to be easy to use and navigate.
Why
When a UI uses consistent color, font, and layout, and when titles and navigational aids—
signposts—are in the same place every time, users know where they are and where to find
things. They don’t have to figure out a new layout each time they switch context from one
page or window to another.
Have you ever seen a book in which the page numbers and headings were in a different
place on each page?
A strong visual framework, repeated on each page, helps the page content stand out more.
That which is constant fades into the background of the user’s awareness; that which
changes is noticed. Furthermore, adding enough character to the design of the visual
framework helps with the branding of your website or product—the pages become recognizable as yours.
How
Draw up an overall look-and-feel that will be shared among all pages or windows. Home
pages and main windows are “special” and are usually laid out differently from inner pages,
but they should still share certain characteristics with the rest of the site. For example:
Color
Backgrounds, text colors, accent colors, and other colors
Fonts
For titles, subtitles, ordinary text, callout text, and minor text
Writing style and grammar
Titles, names, content, short descriptions, any long blocks of text, and anything else
that uses language

-- 170 of 577 --

The Patterns 143
All other pages or windows should also share the following, as appropriate:
• “You are here” signposts, such as titles, logos, Breadcrumb trails, global navigation
with indicators of the current page, and Module Tabs
• Navigational devices, including global and utility navigation, OK/Cancel buttons,
Back buttons, Quit or Exit buttons, and navigational patterns such as Sequence Map
and Breadcrumbs (all in Chapter 3)
• Techniques used to define Titled Sections
• Spacing and alignment, including page margins, line spacing, the gaps between labels
and their associated controls, and text and label justification
• Overall layout, or the placement of things on the page, in columns and/or rows, taking into account the margins and spacing issues listed previously
If you’re familiar with graphic design concepts, you may recognize some of these techniques as comprising a layout grid. A layout grid is a structural template for a set of pages
or layouts. Each individual page is different, but all use specified margins and align their
contents along invisible gridlines. A good Visual Framework does indeed include a layout
grid, but it also includes other aspects of look-and-feel such as colors, visual details, and
writing style.
Implementation of a Visual Framework should force you to separate stylistic aspects of the
UI from the content. This isn’t a bad thing. If you define the framework in only one
place—such as a CSS stylesheet or a Java class—it lets you change the framework independently from the content, which means you can tweak it and get it right more easily. (It’s
also good software engineering practice.)
Examples
JetBlue’s site employs a restricted color palette, a strong header, and consistent use of fonts
and curved rectangles in its Visual Framework (see Figure 4-16). Even the login page and
modal dialogs use these elements; they don’t look out of place.
In the same way, TED’s site uses limited color and a layout grid to maintain consistency
(see Figure 4-17). It has an interesting problem that’s more common than it might appear:
its subsidiary or related sites (such as its blog and its conference site) must look somewhat
like the main TED site, but still have distinct visual identities. In this case, the two related
sites share most of their framework elements with the TED site, with some key differences
(see Figure 4-18).

---

## Sección 43: Chapter 4

-- 171 of 577 --

144 Chapter 4: Organizing the Page: Layout of Page Elements
Figure 4-16. JetBlue website
Figure 4-17. TED website

-- 172 of 577 --

The Patterns 145
Figure 4-18. TED-associated websites, with related but slightly different visual frameworks
Center Stage
Figure 4-19. Flash editor
What
Put the most important part of the UI into the largest subsection of the page or window;
cluster secondary tools and content around it in smaller panels.

-- 173 of 577 --

146 Chapter 4: Organizing the Page: Layout of Page Elements
Use when
The page’s primary job is to show a single unit of coherent information to the user, let him
edit a document, or enable him to perform a certain task. Other content and functions
are secondary to this one. Many types of interfaces can use a Center Stage—tables and
spreadsheets, forms, and graphical editors all qualify. So do web pages that show single
articles, images, or features.
Why
The design should guide the user’s eyes immediately to the start of the most important
information (or task) rather than have them wandering over the page in confusion. An
unambiguous central entity anchors the user’s attention. Just as the lead sentence in a
news article establishes the subject matter and purpose of the article, so the entity in
Center Stage establishes the purpose of the UI.
Once that’s done, the user will assess the items in the periphery in terms of how they relate
to what’s in the center. This is easier for the user than repeatedly scanning the page, trying
to figure it out. What comes first? What’s second? How does this relate to that? And so on.
How
Establish a visual hierarchy with the primary content or document dominating everything else. See the chapter introduction for a discussion of visual hierarchy. When designing a Center Stage, consider these particular factors, though none of them are absolutely
required:
Size
The Center Stage content should be at least twice as wide as whatever’s in its side
margins, and twice as tall as its top and bottom margins. (The user may change its
size in some UIs, but this is how it should be when the user first sees it.) Keep the
fold in mind—when a small screen is used, where does the content get cut off at the
bottom? Make sure the Center Stage still takes up more of the above-the-fold space
than anything else.
Color
Use a color that contrasts with the items in the margins. In desktop UIs, white works
well against Windows gray, especially for tables and trees. As it happens, white often
works in web pages too, since ads and navigation bars usually use other colors as their
backgrounds; also, web users have been “trained” by convention to look for the plain
text on a white background.
Headlines
Big headlines are focal points, and can draw the user’s eye to the top of the Center
Stage. That happens in print media too, of course. See the chapter introduction and
Titled Sections for more.

-- 174 of 577 --

The Patterns 147
Context
What does the user expect to see when she opens up the page? A graphic editor? A long
text article? A map? A filesystem tree? Work with her preconceptions; put that in Center
Stage and make it recognizable. The user will look for it—this trumps all other rules
about visual perception. (But it doesn’t mean you can frustrate her by hiding what she’s
looking for! Some websites put their main content so far down the page that it’s below the
fold in short windows, requiring the user to scroll down to find it. That’s just sadistic.)
Notice that I didn’t mention one traditional layout variable: position. It doesn’t much matter
where you put the Center Stage—top, left, right, bottom, center, any can be made to work. If
it’s big enough, it ends up more or less in the center anyway. Note that well-established genres
have conventions about what goes into which margins, such as toolbars on top of graphic
editors, or navigation bars on the left sides of web pages. Be creative, but with your eyes open.
If you’re in doubt, take a screenshot of the layout, shrink it, blur it, and ask someone where
he thinks the main content should start. Again, see the chapter introduction for an example.
Examples
The Google Docs text editor devotes almost all of its horizontal space to the document
being edited; so does its spreadsheet editor. Even the tools at the top of the page don’t take
up a huge amount of space. The result is a clean and balanced look (see Figure 4-20).
Figure 4-20. Google Docs text editor
Text-based content such as blog articles is often crowded with too many items in the
margins. The sites for Newfangled (Figure 4-21) and Steepster (Figure 4-22) give their
main content enough space to compete with the navigation and other peripheral features.

-- 175 of 577 --

148 Chapter 4: Organizing the Page: Layout of Page Elements
Notice the percentage of space devoted to the main article for both of these sites, and how
high on the page the article starts.
Figure 4-21. Newfangled article
Figure 4-22. Steepster article
In other libraries
http://www.welie.com/patterns/showPattern.php?patternID=center-stage

-- 176 of 577 --

The Patterns 149
Grid of Equals
Figure 4-23. Nike
What
Arrange content items in a grid or matrix. Each item should follow a common template,
and each item’s visual weight should be similar. Link to jump pages as necessary.
Use when
The page contains many content items that have similar style and importance, such as
news articles, blog posts, products, or subject areas. You want to present the viewer with
rich opportunities to preview and select these items.
Why
A grid that gives each item equal space announces that they have equal importance. The
common template for items within the grid tells the user that the items are similar to each
other. Together, these techniques establish a powerful visual hierarchy that should match
the semantics of your content.
Grids look neat, ordered, and calming. That may suit the style of your site or app.
How
Figure out how to lay out each item in the grid. Do they have thumbnail images or graphics? Headlines, subheads, summary text? Links to jump pages (e.g., a page with the full
story)? Render them with more than just blocks of body text: make headlines of different colors, be creative with whitespace, and use images if you can do so evenly across all
items. Experiment with ways to fit all the right information into a relatively small space—
tall, wide, or square—and apply that template to the items you need to display.

---

## Sección 44: Chapter 4

-- 177 of 577 --

150 Chapter 4: Organizing the Page: Layout of Page Elements
Now arrange the items in a grid. You could use a single row, or a matrix that’s two, three,
or more items wide. Consider page width as you do this design work—what will your design look like in a narrow window? Will most of your users have large browser windows?
What happens on tiny mobile devices?
You may choose to highlight grid items, either statically (to emphasize one item over others) or dynamically, as a user hovers over those grid items. Use color and other stylistic
changes, but don’t change the positions, sizes, or other structural elements of the grid
items—you don’t want content jumping around as the user hovers over different items!
A related pattern is Thumbnail Grid, in Chapter 5. This is a way of rendering a list in a 2D
matrix of small pictures, perhaps with a small amount of text with each one. See also the
Thumbnail-and-Text List pattern for mobile design (Chapter 10). It’s about a single column,
not a grid, but the idea is the same: use a consistent, richly styled template for all the items
in a list.
Examples
Hulu (Figure 4-24), CNN (Figure 4-25), and Nike (Figure 4-23, shown at the top of the
pattern) use a rigid template for each item. The overall effect is rhythmic and calming.
Note how each site uses a different balance of text and imagery.
Figure 4-24. Hulu
Download from Wow! eBook <www.wowebook.com>

-- 178 of 577 --

The Patterns 151
Figure 4-25. CNN
The examples from MapQuest (Figure 4-26) and IBM (Figure 4-27) show how to do this
with only a single row of items. (Technically it’s still a “grid.”) The consistent visual treatment marks these items as peers of each other. Each item ends with one or more links—
and that’s true of the Hulu and CNN examples, too. Most of the examples I’ve seen of this
pattern use it to showcase linked content.
Figure 4-26. MapQuest

-- 179 of 577 --

152 Chapter 4: Organizing the Page: Layout of Page Elements
Figure 4-27. An inner page at IBM’s website
In other libraries
For some wonderful examples, see “15 Tips for Designing Terrific Tables,” by Joshua
Johnson:
http://designshack.co.uk/articles/css/15-tips-for-designing-terrific-tables
Titled Sections
Figure 4-28. JetBlue’s titled sections

-- 180 of 577 --

The Patterns 153
What
Define separate sections of content by giving each one a visually strong title, separating
the sections visually, and arranging them on the page.
Use when
You have a lot of content to show, but you want to make the page easy to scan and understand, with everything visible. You can group the content into thematic or task-based
sections that make sense to the user.
Why
Well-defined and well-named sections structure the content into easily digestible chunks,
each of which is now understandable at a glance. This makes the information architecture
obvious. (See this chapter’s introduction for a discussion of visual hierarchy, which is basically about rendering content in a way that communicates its actual structure. See also

---

## Sección 45: Chapter 2 for a definition of information architecture.)

When the user sees a page sectioned neatly into chunks like this, her eye is guided along
the page more comfortably. The human visual system always looks for bigger patterns,
whether they’re deliberate or not. So, put them in deliberately!
How
First, get the information architecture right—split up the content into coherent chunks, if
it hasn’t already been done for you, and give them short, memorable names. Next, choose
a presentation:
• For titles, use typography that stands out from the rest of the content—bolder, wider,
larger point size, stronger color, different font family, outdented text, and so on. See
the chapter introduction for more on visual hierarchy.
• Try reversing the title against a strip of contrasting color.
• Use whitespace to separate sections.
• Use blocks of contrasting background color behind the entire section.
• Boxes made from etched, beveled, or raised lines are familiar on desktop UIs. But
they can get lost—and just become visual noise—if they’re too big, too close to each
other, or deeply nested.

-- 181 of 577 --

154 Chapter 4: Organizing the Page: Layout of Page Elements
If the page is still too overwhelming, try using Module Tabs, an Accordion, or Collapsible
Panels to hide some of the content.
If you’re having trouble giving reasonable titles to these chunks of content, that may be a
sign that the grouping isn’t a natural fit for the content. Consider reorganizing it into different chunks that are easier to name and remember. “Miscellaneous” categories may also
be a sign of not-quite-right organization, though sometimes they’re genuinely necessary.
Examples
In its account settings page, Amazon shows three levels of titles corresponding to three
levels of the visual hierarchy: the page title, section titles (Orders, Payment, Settings), and
subtitles atop lists of links (see Figure 4-29). Note the use of whitespace, boxes, and alignment to structure the page.
Figure 4-29. Amazon account settings
The iPhone sync utility shown in Figure 4-30 shows one nice-looking way to put very
different kinds of content into titled boxes. These sections show very little internal consistency (other than typography)—they share no mutual grid, alignment, or layout plan.
But the boxes and whitespace break up the page so much that this doesn’t really matter.

-- 182 of 577 --

The Patterns 155
Figure 4-30. iPhone sync utility
In other libraries
http://quince.infragistics.com/Patterns/Titled%20Sections.aspx
http://patternry.com/p=content-groups/
Module Tabs
Figure 4-31. MapQuest

-- 183 of 577 --

156 Chapter 4: Organizing the Page: Layout of Page Elements
What
Put modules of content into a small tabbed area so that only one module is visible at a
time. The user clicks on tabs to bring different modules to the top.
Use when
You have a lot of heterogeneous content to show on the page, possibly including text
blocks, lists, buttons, form controls, or images. You don’t have room for everything.
Some of the page content comes in groups or modules (or can be sorted into coherent
groups). Those modules have the following characteristics:
• Users only need to see one module at a time.
• They are of similar length and height.
• There aren’t many modules—fewer than 10, and preferably a small handful.
• The set of modules is fairly static; new pages won’t be added frequently, nor will existing pages be changed or removed frequently.
• The modules’ contents may be related or similar to each other.
Why
Tabs are now ubiquitous in desktop interfaces and websites. No one is going to be confused by how they work.
In general, grouping and hiding chunks of content can be a very effective technique for
decluttering an interface. Tabs work well; so do Accordions, Movable Panels, Collapsible
Panels, and simply arranging things into a clean grid of Titled Sections.
How
First, get the information architecture right. Split up the content into coherent chunks,
if it hasn’t already been done for you, and give them short, memorable titles (one or two
words, if possible). Remember that if you split up the content incorrectly, users will be
forced to switch back and forth between tabs as they compare them or look for information they can’t find. Be kind to your users and test the way you’ve organized it.
Indicate the selected tab unambiguously, such as by making it contiguous with the panel
itself. (Color alone isn’t usually enough. If you have only two tabs, make sure it’s abundantly clear which one is selected and which one isn’t.)
But the tabs don’t have to be literal tabs, and they don’t have to be at the top of the stack
of modules. You can put them in a lefthand column, or underneath, or even turned 90
degrees with the text read sideways.

-- 184 of 577 --

The Patterns 157
When deployed on web pages, Module Tabs tend to be distinct from navigational tabs
(those used for global navigation, or separate documents, or for loading new pages). Tabs
are useful there too, of course, but this pattern is more about giving the user a lightweight
way to see alternative modules of content within a page.
If there are too many tabs to fit in a narrow space, you could do one of several things:
shorten the labels with an ellipsis (and thus make each tab narrower), or use Carousel-like
arrow buttons to scroll the tabs. You could also put the tab labels in a lefthand column,
instead of putting them on top. Never double-row the tabs.
(In the first edition of this book, this pattern was named Card Stack. Most people now
know this concept as simply “tabs,” however, and Module Tabs is a name used by at least
two other pattern libraries.)
Examples
Microsoft Office for Windows 7 uses a “ribbon” atop documents, instead of the traditional menu and toolbars (see Figure 4-32). The ribbon is essentially a set of Module Tabs.
Figure 4-32. Two tabs on the Excel ribbon

-- 185 of 577 --

158 Chapter 4: Organizing the Page: Layout of Page Elements
Some Module Tabs in Mac OS don’t look like tabs—they look like buttons. They behave
exactly like tabs, however. The tabs are across the top, labeled “Audio,” “Photos,” “Movies,”
and “Widgets,” as shown in Figure 4-33.
Figure 4-33. iWeb
Tabs can work along the sides of a module too, as shown in Figure 4-34.
Figure 4-34. SourceForge

---

## Sección 46: Chapter 2 for a definition of information architecture.)

-- 186 of 577 --

The Patterns 159
In other libraries
http://developer.yahoo.com/ypatterns/navigation/tabs/moduletabs.html
http://ui-patterns.com/patterns/ModuleTabs
http://www.welie.com/patterns/showPattern.php?patternID=tabbing
http://patternry.com/p=horizontal-module-tabs/
Accordion
Figure 4-35. Word palette
What
Put modules of content into a collinear stack of panels that can be closed and opened
independently of each other.
Use when
You have a lot of heterogeneous content to show on the page, possibly including text
blocks, lists, buttons, form controls, or images. You don’t have room for everything.
Some of the page content comes in groups or modules (or can be sorted into coherent
groups). Those modules have the following characteristics:

-- 187 of 577 --

160 Chapter 4: Organizing the Page: Layout of Page Elements
• Users may want to see more than one module at a time.
• Some modules are much taller or shorter than others, but they’re all of similar width.
• The modules are part of a tool palette, a two-level menu, or some other coherent
system of interactive elements.
• The modules’ contents may be otherwise related or similar.
• You may want to preserve the linear order of the modules.
Also note that when large modules are open or many modules are open, the labels on the
bottom of the Accordion may scroll off the screen or window. If that’s a problem for your
users, consider using a different solution.
Why
Accordions have become a familiar interactive element on web pages, almost as familiar
as Module Tabs and drop-down menus. (They aren’t quite as straightforward to use, however.) Many websites use Accordions in their menu systems to manage very long lists of
pages and categories.
In general, grouping and hiding chunks of content can be a very effective technique for
decluttering an interface. Accordions are part of a toolkit that includes Module Tabs, Movable
Panels, Collapsible Panels, and Titled Sections to do so.
Accordions may be useful in web page navigation systems, but they really shine in desktop
applications. Tool palettes in particular work well with Accordions (and Movable Panels
as well, for similar reasons). Because users can open any set of modules and leave them
open, Accordions help users modify their “living space” in a way that suits them. Yet it’s
easy to reopen a rarely used module when it becomes needed.
How
Arrange the modules vertically, in an order that makes sense for your particular application or site. Give each module a short and descriptive title, and put that title into a horizontal bar that the user can click to toggle the module open and closed. You could indicate
the “openability” of a module title bar with a rotating triangle icon: point it rightward
when closed, and downward when open.
Allow more than one module to be open at a time. There are differing opinions on this—
some designers prefer only one module to be open at a time, and some implementations
only allow one (or have a switch that developers can set, at least). But in my experience,
especially in applications, it’s better to let users open multiple modules at a time. It avoids
the abrupt and unexpected disappearance of a previously open module: “Hey, where’d that
other menu go? It was right here!”
When used in an application or when the user is signed in to a website, an Accordion ought
to preserve its state of opened and closed modules between sessions. This isn’t as important for navigation menus as it is for tool palettes.

-- 188 of 577 --

The Patterns 161
Accordions can be nested if the module contents need further subdivision, but they tend
to look confusing. Users find it hard to tell the difference between an “outer” accordion
panel and an “inner” accordion panel; with everything all in one column, there’s no clarity
to the containment hierarchy. It’s better to use just one flat set of accordion modules, and
to use some other structuring pattern inside a module (e.g., tabs) if necessary.
This technique has existed since at least 1993, and possibly earlier. The Motif-based GUI
builder called UIM/X used closable panels—even with the twist-down arrows—for its
widget palettes.
(In the first edition of this book, this pattern was named Closable Panels. During the years
since then, the user experience community seems to have settled on the name Accordion
instead.)
Examples
Picasa’s browsing window uses an Accordion to show several different ways of viewing a
person’s images. Within each pane, content might be further subdivided or organized,
which Picasa does in the example in Figure 4-36 with Titled Sections. Chrome’s developer
tools, on the other hand, nest Accordions inside each other (see Figure 4-37). You can figure out the nesting scheme if you stare at it hard enough, but it’s not easy.
Figure 4-36. Picasa lefthand sidebar

-- 189 of 577 --

162 Chapter 4: Organizing the Page: Layout of Page Elements
Figure 4-37. Chrome righthand sidebar, with nested accordions
CNN uses an Accordion to show personalized material (see Figure 4-38). Only one panel
can be open at once in this implementation. If it were up to me, I’d want to see both of
these panels open at the same time, but maybe CNN had a very limited amount of vertical
space to work with.
Figure 4-38. CNN sidebar

-- 190 of 577 --

The Patterns 163
As shown in Figure 4-39, the Yahoo! Developer Network uses an Accordion in its footer to
let users hide and show sections that they care about (or don’t). Note the use of a Sitemap
Footer, described in Chapter 3.
Figure 4-39. Yahoo! Developer Network page footer
In other libraries
http://developer.yahoo.com/ypatterns/navigation/accordion.html
http://ui-patterns.com/patterns/AccordionMenu
http://www.welie.com/patterns/showPattern.php?patternID=accordion
Designing Web Interfaces by Bill Scott and Theresa Neil (O’Reilly, http://oreilly.com/
catalog/9780596516253/) also describes an Accordion pattern.
Collapsible Panels
Figure 4-40. Google Maps

-- 191 of 577 --

164 Chapter 4: Organizing the Page: Layout of Page Elements
What
Put secondary or optional material into panels that can be opened and closed by the user.
Use when
You have a lot of heterogeneous content to show on the page, possibly including text
blocks, lists, buttons, form controls, or images. You don’t have room for everything. You
might, however, have Center Stage content that needs to take visual priority.
Some of the page content comes in groups or modules (or can be sorted into coherent
groups). Those modules have the following characteristics:
• Their content annotates, modifies, explains, or otherwise supports the content in the
main part of the page.
• The modules may not be important enough for any of them to be open by default.
• Their value may vary a lot from user to user. Some will really want to see a particular
module, and others won’t care about it at all.
• Even for one user, a module may be useful sometimes, but not other times. When it’s
not open, its space is better used by the page’s main content.
• Users may want to open more than one module at the same time.
• The modules have very little to do with each other. When Module Tabs or Accordions
are used, they group modules together, implying that they are somehow related;
Collapsible Panels do not group them.
Why
Hiding noncritical pieces of content helps to simplify the interface. When a user hides
a module that supports the main content, it simply collapses, giving its space back over
to the main content (or to whitespace). This is an example of the principle of progressive
disclosure—show hidden content “just in time,” when and where the user needs it.
In general, grouping and hiding chunks of content can be a very effective technique for
decluttering an interface. Collapsible Panels are part of a toolkit that includes Module Tabs,
Accordions, Movable Panels, and Titled Sections to do so.
How
Put each supporting module into a panel that the user can open and close via a single
click. Label the button or link with the module’s name or simply “More,” and consider
using a chevron or rotating triangle to indicate that more content is hidden there. When
the user closes the panel, collapse the space used by that panel and devote it to other content (such as by moving up the content below it on the page).

---

## Sección 47: Chapter 2 for a definition of information architecture.)

-- 192 of 577 --

The Patterns 165
Consider animating the panels as they open and close. It appears less dislocating when
they smoothly zip open and closed again.
If you have more than one module to hide in this way, you could either put the modules
together on one panel with Module Tabs or an Accordion, or put them in separate places on
the main page.
If you find that most users are opening up a Collapsible Panel that’s closed by default, switch
it to being open by default.
Examples
Google Maps, shown in Figure 4-40 at the top of the pattern, demonstrates how useful
it can be to collapse a panel that’s outlived its usefulness—the visible map area is significantly bigger without the sidebar.
Some discussion forums, such as that shown in Figure 4-41, place long comments into
Collapsible Panels. A visitor can skim the page’s short and truncated comments to get a
sense of the discussion, and if a long comment attracts her attention, she can open the
truncated comment to read the whole thing.
Figure 4-41. MSNBC article comments
Many applications show optional sidebars attached to their Center Stage windows.
Firefox’s sidebar, shown in Figure 4-42, is closed by a single click on the “X” button,
and a user can bring it back by selecting a menu item (or by using a keyboard shortcut).
Note the asymmetry—it’s much easier to hide it than to show it, at least until the user
memorizes the keyboard sequence! With a web page, or with an app that isn’t frequently
used, a visible button to bring back the panel would be a better choice.

-- 193 of 577 --

166 Chapter 4: Organizing the Page: Layout of Page Elements
Figure 4-42. Firefox bookmarks sidebar
At the time of this writing, YouTube places many Collapsible Panels on a video’s page (see
Figure 4-43). They contain extra content such as the video description, viewing statistics,
and more videos from this poster (not shown in the figure). The page draws attention
to these expandable areas by highlighting them in blue on rollover. They’re all closed by
default, and they close themselves when the page is reloaded. The resultant page is less
cluttered than it would otherwise be, while still providing interesting information to users
inspired enough to open these panels.

-- 194 of 577 --

The Patterns 167
Figure 4-43. YouTube’s collapsible panels; three states are shown: neither panel open, video description
panel open, and statistics panel open (both cannot be open at once)

-- 195 of 577 --

168 Chapter 4: Organizing the Page: Layout of Page Elements
In other libraries
http://www.welie.com/patterns/showPattern.php?patternID=collapsible-panels
http://www.welie.com/patterns/showPattern.php?patternID=details-on-demand
http://quince.infragistics.com/Patterns/Closable%20Panels.aspx
Movable Panels
Figure 4-44. My Yahoo!
What
Put modules of content into boxes that can be opened and closed independently of each
other. Arrange the boxes freely on the page, and let the user move them around into a
custom configuration.
Use when
You’re designing either a desktop application, or a website that most users sign in to. News
portals, Dashboards, and Canvas Plus Palette apps often use Movable Panels. You want users
to feel a sense of ownership of the software, or at least have fun playing with it.

-- 196 of 577 --

The Patterns 169
The page in question is a major part of the app or site—something that users see often
or for long periods of time. You have a lot of heterogeneous content to show on the page,
possibly including text blocks, lists, buttons, form controls, or images. You don’t have
room for everything.
Some of the page content comes in groups or modules (or can be sorted into coherent
groups). Those modules have some of the following characteristics:
• Users will almost certainly want to see more than one module at a time.
• Their value may vary a lot from user to user. Some people want modules A, B, and C,
while others don’t need those at all and only want to see D, E, and F.
• The modules vary a lot in size.
• Their position on the page isn’t terribly important to you, but it might be to users. (By
contrast, a page of static Titled Sections ought to be arranged with thought given to the
importance of page position; important things go to the top, for instance.)
• There are many modules—possibly so many that if all were shown at once, a viewer
would be overwhelmed. Either you or the user should pick and choose among them.
• You’re willing to let users hide some modules from view altogether (and offer a mechanism to bring them back).
• The modules may be part of a tool palette or some other coherent system of interactive elements.
Why
Different users have different interests. Websites such as dashboards and portals are most
useful to people when they can choose the content they see.
When they’ll be working on something for a while in a desktop application, people like to
rearrange their environment to suit their working style. They can place needed tools close
to where they work; they can hide things they don’t need; they can use Spatial Memory
(Chapter 1) to remember where they put things. Rationally speaking, Movable Panels help
users get things done more efficiently and comfortably (in the long run—once they’ve
spent time rearranging their environment the way they like it!).
But this kind of personalization seems to appeal to people on some other level, too. They
may do this on infrequently visited websites that provide some kind of entertainment, for
instance. Personalization can increase engagement and buy-in.
Finally, a Movable Panels design easily accommodates new modules introduced over time,
such as those contributed by third parties.

-- 197 of 577 --

170 Chapter 4: Organizing the Page: Layout of Page Elements
How
Give each module a name, a title bar, and a default size, and arrange them on the page in
a reasonable default configuration. Let the user move modules around the page at will,
via drag-and-drop if possible. Permit each module to be opened and closed with a simple
gesture, such as a mouse click on a title bar button.
Depending upon the design you’ve chosen, you may want to give the user freedom to
place these pieces anywhere at all, even if they overlap. Or you may want a predefined layout grid with “slots” where pieces can be dragged and dropped—this lets the page maintain alignment (and some sense of dignity!) without making the user spend too much
time fiddling with windows. Some designs use ghosting—big drop targets that appear dynamically; for example, dotted rectangles—to show where a dragged module would go
when dropped.
Consider letting users remove modules altogether. An “X” button in the title bar is the familiar way to remove one. Once a module is gone, how does a user bring it back? Let users
add modules—including brand-new ones, perhaps—from a list of available modules that
can be browsed and searched.
Modules may individually allow customization; they might offer Settings Editors (Chapter
2) to adjust various parameters for content or viewing. (A weather widget might ask the
user to set a desired location, for instance.) Some designs make this available via another
button or drop-down menu on the module title bar.
When used in an application or when the user is signed in to a website, Movable Panels
must preserve the state of opened and closed modules between sessions. People will expect that, and they will be startled if it doesn’t work. (You may also put a “revert to defaults” function somewhere, in case a user gets tangled up in the customization and wants
to start anew.)
Examples
iGoogle, shown in Figures 4-45 and 4-46, demonstrates the mechanics of dragging and
dropping a Movable Panel around a page. A user grabs the title bar of a panel; at the beginning of the drag operation, a dotted-line “ghost” shows the place where the panel had
been. As the panel is dragged near another drop zone between panels, another “ghost”
appears there—if the user lets go of the panel now, that’s where it will land.

---

## Sección 48: Chapter 2 for a definition of information architecture.)

-- 198 of 577 --

The Patterns 171
Figure 4-45. iGoogle, after starting a panel drag
Figure 4-46. iGoogle, about to finish a panel drag

-- 199 of 577 --

172 Chapter 4: Organizing the Page: Layout of Page Elements
Desktop applications might use Movable Panels in a couple of ways: to show all the major
tool windows in a complex application such as MATLAB, or to arrange small palette windows around a document, as Photoshop and other Canvas Plus Palette applications do.
MATLAB (Figure 4-47) tiles the panels within one window, much like My Yahoo! and
iGoogle—but each panel can be set to a custom size. Photoshop (Figure 4-48) puts the
palette windows out on the desktop, where a user can freely move them, resize them, and
stack them in Module Tabs.
Figure 4-47. MATLAB desktop
Figure 4-48. Photoshop desktop

-- 200 of 577 --

The Patterns 173
In other libraries
http://quince.infragistics.com/Patterns/Movable%20Panels.aspx
http://www.welie.com/patterns/showPattern.php?patternID=customization-window
http://patternry.com/p=drag-and-drop-modules/
http://developer.yahoo.com/ypatterns/richinteraction/dragdrop/modules.html
In developer-oriented references, the term portlet is commonly used to describe the actual
components that go into Movable Panels and thus compose a portal page.
Right/Left Alignment
Figure 4-49. Mac OS system preferences
What
When designing a two-column form or table, right-align the labels on the left and leftalign the items on the right.

-- 201 of 577 --

174 Chapter 4: Organizing the Page: Layout of Page Elements
Use when
You’re laying out a form or any other set of items that have text labels in front of them.
This could also apply to the internal structure of tables, or any other two-column structure
in which the rows should be read left to right.
The labels come in many lengths—some are short, some long, some line-wrapped. Leftaligning the labels would put some of them too far away from their associated fields,
leaving a gap too large for users’ eyes to span easily.
Why
When you put text right next to the thing it labels, you form a strong perceptual grouping
of that pair—much more so than if they were separated by a large amount of space. If you
align variable-length labels along their left sides, the short labels won’t be close enough
to their controls, and the side-to-side grouping is broken. (This is the Gestalt principle of
proximity at work.) In short, people will more easily connect each label to its associated
control when the UI uses right/left alignment.
Meanwhile, you should always left-align the controls themselves. When combined with
the right-aligned labels and a uniform spacing between them, they help form a nice strong
double edge down the middle of the whole thing (taking advantage of continuity, another
Gestalt principle). This powerful edge guides the viewer’s eyes smoothly down the page,
supporting a good visual flow.
There are several cases in which you would not want right-aligned labels. For instance,
there is good evidence that reading right-aligned labels is harder than reading left-aligned
labels (which makes sense, because the eye has to work harder to find the beginning of
the line). If your labels are long and need to be carefully read, consider left-aligning them
instead.
If the labels will be localized into different languages, they’ll become different lengths.
Layout becomes awkward when labels sit to the left of the controls—put them on top
instead. (This is harder to read, and makes the page longer.)
In some layouts, right-aligning the labels just doesn’t look good. There might be a column
of items just to the left of the labels, or perhaps the left-aligned titles separate the form’s
sections—all of these, and more, can ruin a right/left alignment. Go with what works.
How
Instead of left-aligning each text label, right-align it. Bring it right up close to its control,
separated by only a few pixels. The net effect will probably be a ragged (unaligned) left
edge—that’s usually OK. If some labels are too long to make this work, try breaking them
into multiple lines, or resort to putting the labels above the control, in which case this
pattern becomes irrelevant.

-- 202 of 577 --

The Patterns 175
Then left-align the controls against an imaginary line a few pixels away from the right
edges of the labels. Make them precisely aligned, pixel-perfect—if they’re not, the controls will look messy. (The human visual system is really good at picking out slight
misalignments!)
Again, the other edge of the control column may be ragged. That’s not so good if you’re
dealing with text fields, combo boxes, and other visually “heavy” objects, as in Figure
4-49. Try to stretch them so that their right edges are aligned too, to whatever extent you
can. You can try to align the short ones with one another, and the long ones with one
another.
Examples
Right/Left Alignment also works with layouts that have no input controls at all. The Mac
OS address book entry shown in Figure 4-50 has very little whitespace between the two
columns, but the difference in color helps to separate them visually. Notice that the label
“home page” is much longer than the others; this would have made a lefthand label alignment less pleasing to the eye and harder to read.
Figure 4-50. Mac OS address book entry
In other libraries
http://quince.infragistics.com/Patterns/Right%20Aligned%20Labels.aspx
http://www.uxmatters.com/mt/archives/2006/07/label-placement-in-forms.php

-- 203 of 577 --

176 Chapter 4: Organizing the Page: Layout of Page Elements
Diagonal Balance
Figure 4-51. Windows 7 control panel
What
Arrange page elements in an asymmetric fashion, but balance it by putting visual weight
into both the upper-left and lower-right corners.
Use when
You’re laying out a page or dialog box that has a title or header at the top, and some links
or action buttons—such as OK and Cancel, or Submit, or Back and Next—at the bottom.
The page is short enough to fit on the screen without scrolling.
Why
Visually prominent features such as titles, tabs, and buttons should contribute to a balanced composition on the screen. They’re already at opposite ends of the page; when you
put them on opposite sides, too, they often balance one another out. (Think of them as
weights—the bigger or more “contrasty” the features are, the heavier they are; the closer to
the edge they get, the more you need to put on the other side to compensate.)

---

## Sección 49: Chapter 2 for a definition of information architecture.)

-- 204 of 577 --

The Patterns 177
Besides being nicer to look at, a diagonal balance also sets up the page so that the user’s eye
moves easily from the top left to the bottom right—an ideal visual flow for users who speak
left-to-right languages. (See the chapter introduction for a discussion of visual flow.) The rest
of the page should support this visual flow, too. The eye finally comes to rest on elements
representing actions that the user might do next, such as close this UI or go somewhere else.
How
Place the title, tabs, or some other strong element at the upper left of the page; place the
button(s) at the lower right. Content of any width goes in between. If the content itself
contributes to the balance of the page, so much the better—don’t put too much whitespace
on only one side, for instance.
Consider what the color dialog box in Figure 4-51 would look like if you placed the OK
and Cancel buttons to the left edge instead of the right edge. The whole dialog would feel
left-weighted and precarious.
In Windows, the placement of the title in the upper left and the conventional placement
of buttons in the lower right do this for you automatically. In Mac OS, elements such as title
bars, tabs, and action buttons are centered, so Diagonal Balance is much less common there.
Kevin Mullet and Darrell Sano’s classic pre-Web book Designing Visual Interfaces (Sun
Microsystems) describes the ideas of diagonal balance:
Symmetrical layouts provide…visual equilibrium automatically. Asymmetrical layouts can achieve equilibrium as well, but their tenser, more dramatic form of balance,
depends on careful manipulation to compensate visually for differences in the size,
position, and value of major elements.
The following are examples of how you can achieve this balance.
Examples
The simple screen shown in Figure 4-52 directs the viewer’s attention to the lower right,
where the call to action sits.
Download from Wow! eBook <www.wowebook.com>

-- 205 of 577 --

178 Chapter 4: Organizing the Page: Layout of Page Elements
Figure 4-52. Starbucks WiFi screen
The focal points in the site shown in Figure 4-53 are the logo, the moving car, the “Let’s
Motor” tag line, and the dealer-locator text field at bottom right—all in a diagonal line
(approximately). The motion of the photograph pushes the eye down and right even more
forcefully than the other examples. Undoubtedly, the designers of the site wanted to encourage people to use the text field. If it were at the bottom left instead, the page would
lose much of its punch, and the text field might get lost in the page.
Figure 4-53. Mini Cooper website from 2005

-- 206 of 577 --

The Patterns 179
Responsive Disclosure
Figure 4-54. AutoTrader
What
Starting with a very minimal UI, guide a user through a series of steps by showing more
of the UI as he completes each step.
Use when
The user should be walked through a complex task step by step, perhaps because the task
is novel, rarely done, or outside the user’s domain knowledge. But you don’t want to force
the user to go page by page at each step—you’d rather keep the whole interface on one
single page.
Alternatively, the task may be branched, with different types of information required
“downstream” depending on a user’s earlier choices.
Why
In this pattern, the interface actually appears to be “created” in front of the user, one step
at a time. At first, the user sees only those elements that are necessary for the first step.
When the user takes that step, the next set of elements is displayed in addition to the first
ones, then the next, and so on.
As the user sees the task unfolding directly in front of him via a dynamically growing
UI, he can form a correct mental model of the task more quickly and easily. None of the
awkward context switches that separate wizard screens impose exist here: when a user is
yanked out of his workflow into a rigid set of modal screens shown one at a time, it feels
like more of an imposition than if the UI had stayed within the user’s working context.

-- 207 of 577 --

180 Chapter 4: Organizing the Page: Layout of Page Elements
Furthermore, since the UI is kept together on one page, the user can easily go back and
change his mind about earlier choices. As each step is redone, he immediately sees the
effect on subsequent steps. This is better than jumping from one content-starved wizard
screen to another.
For occasional tasks, Responsive Disclosure can work better than presenting a complex and
interlinked set of controls all at once, because it’s always obvious what the first step is—
and the next, and the next. The user never has to think too hard.
How should you choose between this pattern and Responsive Enabling? If you use Responsive
Enabling, you will have to put all the controls for all choices on the UI—you’ll just disable
the irrelevant ones until they become relevant (again, in response to the user’s choices).
Sometimes that can make the UI too cluttered or complicated-looking. It’s a judgment
call: if you need to fit the UI into a very small space, or if you think too many controls on
the UI might look bad or make users nervous, use Responsive Disclosure instead.
How
Start by showing the controls and text for only the first step. When the user completes that
step, show the controls for the next step, and so on. Leave the previous steps’ controls visible to let the user go backward if necessary. Keep it all on one page or dialog box so that
the user isn’t abruptly pushed into a separate “UI space.”
In many such step-by-step designs, the choices the user makes at one step alter the rest
of the task (i.e., the task is branched, not linear). For instance, an online order form asks
whether the billing address is the same as the shipping address. If the user says yes, the
UI doesn’t even bother showing entry fields for it. Otherwise, there’s one more step in the
process, and the UI shows the second set of entry fields when appropriate.
The concept of responsive disclosure isn’t new. It was used in 1981 in the first commercial WIMP interface, the Xerox Star. Its designers considered “progressive disclosure,” a
more general concept that includes responsive disclosure, to be a major design principle:
“Progressive disclosure dictates that detail be hidden from users until they ask or need to
see it. Thus, Star not only provides default settings, it hides settings that users are unlikely
to change until users indicate that they want to change them.”* Indeed.
In the Star’s property sheets, for instance, blank space was reserved for controls that would
appear as needed, in response to user choices. When a user chose from a set of values
including the word Other, for instance, an extra text field would appear for the user to
enter a number.
* Johnson, J.A., et al. 1989. “The Xerox ‘Star’: A Retrospective.” IEEE Computer 22(9), 11–29. See also http://
www.digibarn.com/friends/curbow/star/retrospect/.

---

## Sección 50: Chapter 2 for a definition of information architecture.)

-- 208 of 577 --

The Patterns 181
Examples
The Kayak example in Figure 4-55 hides the calendar and comparison box until the user
has filled out enough of the form. Once they appear, the user will shift attention to them.
Figure 4-55. Kayak
Another way to use Responsive Disclosure is to swap out a piece of a UI depending on the
selection made in a drop-down or other limited-choice control. The examples in Figure
4-56, from Google Docs, do this: when the user changes the “Question Type” selection,
the follow-on questions change accordingly. (So does the AutoTrader example, at the top
of the pattern in Figure 4-54.)

-- 209 of 577 --

182 Chapter 4: Organizing the Page: Layout of Page Elements
Figure 4-56. Google Docs form field creation
In other libraries
http://patternry.com/p=inline-input-adder/
http://quince.infragistics.com/Patterns/Responsive%20Disclosure.aspx
Responsive Enabling
Figure 4-57. TurboTax

-- 210 of 577 --

The Patterns 183
What
Starting with a UI that is mostly disabled, guide a user through a series of steps by enabling more of the UI as each step is done.
Use when
The user should be walked through a complex task step by step, perhaps because the user
is computer-naive or because the task is rarely done (as in a Wizard). But you don’t want to
force the user to go page by page at each step—you’d like to keep the whole interface on
one page. Furthermore, you want to keep the interface stable; you’d rather not dynamically reconfigure the page at each step, as you would with Responsive Disclosure.
Why
Like Responsive Disclosure, this pattern takes advantage of the malleability of computer
displays to interactively guide the user through the interface. The user thus gets a chance
to form a correct mental model about cause and effect. The UI itself tells her the consequences of some choices: if I turn this checkbox on, I have to fill in these four text fields
that just got enabled.
Furthermore, the user can’t do things that would get her into trouble, since the UI has
“locked out” those actions by disabling them. Unnecessary error messages are thus
avoided.
How
In some applications, most actions on the UI start off disabled—only the actions relevant
to the user’s first step are available. As the user makes choices and performs actions, more
disabled items should be enabled and brought into play. In this respect, it’s remarkably
like Responsive Disclosure, in that the machine specifies a particular sequence through the
interface.
A similar, less sequence-based technique is much more common in desktop UIs. As the
user does things on the interface, certain actions or settings become irrelevant or impossible, and those actions get disabled until the user does whatever is necessary to reenable
them. Overall sequence isn’t as important.
Whenever possible, put the disabled items in close proximity to whatever enables them.
That helps users find the magic enabling operation and understand the relationship between it and the disabled items. The examples in Figures 4-57 and 4-58 place that text
field (or checkbox, respectively) at the top or left of the disabled items, which follows the
natural top-to-bottom and left-to-right “flow” of the interface.
When you design an interface that uses Responsive Enabling or Responsive Disclosure,
be sure to disable only things that really can’t or shouldn’t be used. Be wary of overconstraining the user’s experience in an attempt to make the interface friendlier or easier

-- 211 of 577 --

184 Chapter 4: Organizing the Page: Layout of Page Elements
to understand. When you decide what to disable, carefully consider each item. Is it being
disabled for a really good reason? Can that functionality be enabled all the time? As usual,
usability testing gives users a chance to tell you that you’ve done it wrong.
Another usability problem to avoid is what Bruce Tognazzini once called the “Mysteriously
Dimmed Menu Items”—when the design offers no clue as to why a given item is disabled.
Again, minimize the set of things that have to be disabled, especially when they’re far
away from whatever operation turns them on. Also, somewhere in the interface or its help
system, tell the user what causes a feature to be unavailable. Again, this whole problem
can be avoided more easily when the disabled controls aren’t menus on a menu bar, but
instead sit out on the main UI, collocated with whatever switches them on. Spatial proximity is an important clue.
Examples
The Mac OS System Preferences, shown in Figure 4-58, provide a typical example of disabling based on a binary choice: should the desktop show the date and time on the menu
bar, or not? If the user chooses to show it, she gets a panoply of choices about how it ought
to be shown. If not, the choices are irrelevant, so they’re disabled. This behavior (plus the
indenting of the options under the checkbox) tells the user that these choices affect the
date/time display which the checkbox toggled—and nothing else.
Figure 4-58. Mac OS system preferences
You can also reverse the sense of this pattern and do “responsive disabling.” The navigation system used in Toyota’s Prius and Lexus cars employs this technique when a user enters a destination address (see Figure 4-59). Knowing what streets exist in a given search
area, the system narrows down the possible street names with each successive letter entered by the user. It then disables the letters that can’t possibly follow the currently typed
string; the user has fewer buttons to think about, plus some assurance that the system
“knows” what she’s trying to type. Address entry is thus made easier and more pleasant.
(When only a few streets match, the system takes away the keyboard altogether and shows
the streets as a list of choices—see the Autocompletion pattern in Chapter 8.)

-- 212 of 577 --

The Patterns 185
Figure 4-59. Lexus hybrid navigation system
In other libraries
http://quince.infragistics.com/Patterns/Responsive%20Enabling.aspx

-- 213 of 577 --

186 Chapter 4: Organizing the Page: Layout of Page Elements
Liquid Layout
Figure 4-60. Mac OS open dialog
What
As the user resizes the window, resize the page contents along with it so that the page is
constantly “filled.”
Use when
The user might want more space—or less—in which to show the content of a window,
dialog box, or page. This is likely to happen whenever a page contains a lot of text (as in
a web page), a high-information control such as a table or tree, or a graphic editor. This
pattern doesn’t work as well when the visual design requires a certain amount of screen
real estate, neither more nor less.
Why
Unless you’re designing a “closed” UI such as a kiosk or a full-screen video game, you can’t
predict the conditions under which users will view your UI. Screen size, font preferences,
other windows on the screen, or the importance of any particular page to the user—none
of this is under your control. How, then, can you decide the one optimal page size for all
users?
Giving the user a little control over the layout of the page makes your UI more flexible
under changing conditions. It may also make the user feel less antagonistic toward the UI,
since he can bend it to fit his immediate needs and contexts.

---

## Sección 51: Chapter 2 for a definition of information architecture.)

-- 214 of 577 --

The Patterns 187
If you need more convincing, consider what happens to a fixed-layout “nonliquid” UI
when the language or font size changes. Do columns still line up? Do pages suddenly
become too wide or even clipped at the margins? If not, great; you have a simple and
therefore robust design. But pages engineered to work nicely with window size changes
generally also accommodate language or font size changes.
How
Make the page contents continuously “fill” the window as it changes size. Multiline text
should wrap at the right margin until it becomes 10 to 12 words wide (more on that later).
Text, trees, tables, graphs, and editors at “center stage” should enlarge generously while
their margins stay compact. If the page has anything form-like on it, horizontal stretching should cause text fields to elongate—users will appreciate this if they need to type in
anything longer than the text field’s normal length. Likewise, anything scrolled (such as
lists or tables) should lengthen, and possibly widen, too.
Web pages and similar UIs should allow the body content to fill the new space, while keeping navigational devices and signposts anchored to the top and left margins. Background
colors and patterns should always fill the new space, even if the content itself cannot.
What happens when the window gets too small for its content? You could put scrollbars
around it. Otherwise, whitespace should shrink as necessary; outright clipping may occur
when the window gets really tiny, but the most important content should hang in there
to the end.
If the interface shows paragraphs of text, remember that they become nearly illegible
when they’re too wide. Graphic designers target an optimal line length for easy reading of
text; one metric is 10 to 12 average English words per line. Another metric is 30 to 35 em
widths—that is, the width of your font’s lowercase m. When your text gets much wider
than that, users’ eyes have to travel too far from the end of one line to the beginning of the
next one; if it gets narrower, it’s too choppy to read easily.
(That being said, there is evidence that text with a longer line length, such as 100 characters per line, is faster to read than shorter lines, even though users prefer to read lines
fewer than 55 characters long.*
)
Examples
Mac OS allows you to resize the standard Open dialog box, which uses a Liquid Layout.
This is good because the user can see as much of the filesystem hierarchy as he wants,
rather than being constrained to a tiny predetermined space. See Figure 4-60 at the top
of the pattern.
* “Use Reading Performance or User Preference,” from http://usability.gov/guidelines/.

-- 215 of 577 --

188 Chapter 4: Organizing the Page: Layout of Page Elements
When a Liquid Layout is used on text in a browser, the floated elements should handle the
resize gracefully, as in the Drupal.org example shown in Figure 4-61. Note also that the
text in this article never gets so wide as to be unreadable, even when the window itself is
very wide.
Figure 4-61. From Drupal.org
Google Docs allows the user to shrink the window to a very narrow size (see Figure 4-62).
Though it places long toolbars across the top of the document, those toolbars wrap around
and collapse gracefully as the window shrinks. (The user can’t resize it to be smaller than
the smallest size shown here.)

-- 216 of 577 --

The Patterns 189
Figure 4-62. Google Docs slideshow editor
In other libraries
http://www.welie.com/patterns/showPattern.php?patternID=liquid-layout
http://quince.infragistics.com/Patterns/Liquid%20Layout.aspx
http://www.designofsites.com/designing-effective-page-layouts/expanding-screen-width

-- 217 of 577 --

-- 218 of 577 --

---

## Sección 52: Chapter 5

Lists of Things
This chapter covers only one topic: how to display lists of items in an interactive setting. Just items. Actual data—complex and highly structured data sets—isn’t covered until

---

## Sección 53: Chapter 7.

Why do lists merit their own chapter, you may ask?
Consider the many types of items that get shown in lists: articles, pages, photos, videos,
maps, books, games, movies, TV shows, songs, products, email messages, blog entries,
status updates, forum posts, comments, search results, people, events, files, documents,
apps, links, URLs, tools, modes, actions. (Add your own!)
Practically every moderately complex interface or website ever designed includes lists.
This chapter will help you think about them logically and clearly, understand different
design aspects, and make good trade-offs when designing interfaces that use lists.
Since so many other interface design topics overlap with this one, this chapter will often
refer to other chapters and patterns. Menus are handled in Chapter 6, complicated data in

---

## Sección 54: Chapter 7, and links and other navigational mechanisms in Chapter 3. Mobile platforms

have very specific design constraints, so Chapter 10 will be referred to as well. But there’s
still a lot left over.

-- 219 of 577 --

192 Chapter 5: Lists of Things
Use Cases for Lists
Before jumping into a design, it’s useful to analyze the use cases for a list. What will people
need to do with it? Which of these scenarios apply?
Getting an overview
What impression will someone get from the list as a whole? In some cases, a user
should be able to skim down the list and understand what it’s about. Sometimes that
requires more than just words; it may require images or careful visual organization to
convey that impression.
Browsing item by item
Will the user peruse items, either randomly or in order? Does he need to click on
items to open them? If so, it should be easy to go back to the list and find another
item, or move directly to the next one.
Searching for a specific item
Is the user looking for something in particular? He should be able to find it quickly,
with a minimum of clicks, scrolling, and back-and-forth.
Sorting and filtering
If someone is looking for an item or group of items with a specific characteristic (e.g.,
“anything with a date between X and Y”) or is looking for general insight into a set
of data, sorting and filtering functions might help. This is addressed in more detail
in Chapter 7.
Rearranging, adding, deleting, or recategorizing items
Consider a Picture Manager containing the user’s photos: the user owns the list and the
items within it. Most apps and sites that show personal collections permit direct manipulation of those lists so that the user can drag items around into a desired order or
grouping scheme. He should also be able to select multiple items at a time for moving,
editing, or deleting; a design should either use the platform standards for multiple
selection (e.g., Shift-select), or supply checkboxes beside each item to permit the user
to select an arbitrary subset.
Back to Information Architecture
We discussed information architecture—the design of information, independent of its visual representation—in Chapter 2. Let’s return to it for a minute. If you have a list of things
to show in a page, what are the salient nonvisual characteristics of that list?
Length
• How long is the list? Can it fit in the space you’ve designed for it?
• Could the list sometimes be “bottomless”? For example, web search results often constitute such a long list that the user will never reach the end; likewise for items taken
from a very large and deep archive.

-- 220 of 577 --

Back to Information Architecture 193
Order
• Does the list have a natural order, such as alphabetical or by time?
• Would it make sense for a user to change the sorting order of the list? If so, what
would the user sort on?
• If you choose to put a list into an order, would it actually make more sense as a grouping scheme, or vice versa? As an example, think about a blog archive: the articles
are naturally ordered by time, and most blogs categorize them by month and year,
rather than offering a flat ordered list. Someone looking for a particular article might
remember that “it was before article X but after article Y,” but not remember exactly
which month it was published. A monthly grouping thus makes it hard to find that
article; a time-ordered flat list of titles might work better.
Grouping
• Do the items come in categories? Is it a natural categorization that users will immediately understand? If not, how can you explain it, either verbally or visually?
• Do these categories come in larger categories? More broadly, do the items fit into a
multi-level hierarchy, such as files in a filesystem?
• Are there several potential categorizations? Would they fit different use cases or user
personas? And can users create their own categories for their own purposes?
Item types
• What are the items like? Are they simple, or are they rich and complex? Are they
just stand-ins for larger things, such as headlines for articles or thumbnails for video
clips?
• Are the items in a list very different from each other (e.g., some are simple and some
are complex)? Or are they homogeneous?
• Does each item have an image or picture associated with it?
• Does each item have a strict field-like structure? Would it help the user to know that
structure, or possibly even sort the list based on different fields? (Email messages
typically have a strict and sortable structure—timestamp, from field, subject, and so
on—and this structure typically is shown in lists of messages.)
Interaction
• Should you show the whole item at once in the list, or can you just show a representation of the item (such as its name or the first few sentences) and hide the rest?
• What is the user supposed to do with those items? Should they be looked at? Should
they be selected for inspection, or for performing tasks on them? Or are they links or
buttons to be clicked on?
• Does it make sense for the user to select multiple items at a time?

-- 221 of 577 --

194 Chapter 5: Lists of Things
Dynamic behavior
• How long does it take to load the whole list? Can it be more or less immediate, or will
there be a noticeable delay as the list is put together somewhere and finally shown to
the user?
• Will the list change on the fly? Should you show the updates as they happen? Does
this mean inserting new items at the top of the list automatically?
The answers to these questions may suggest a variety of design solutions to you. Of course,
a solution should also take into account the type of content (blogs should look different
from, say, contact lists), the surrounding page layout, and implementation constraints.
Some Solutions
The interaction questions listed in the preceding section set the tone for almost all the
other decisions. For instance, a fully interactive list—multiple selection, drag-and-drop,
editing items, and so on—tends to dominate the interface. You may be building a Picture
Manager, an email client, or some other full-fledged application that people use to manage
and enjoy content that they own.
In this and other types of interfaces, a common requirement is to show only item names
or thumbnails in a list—just a representation of each item—and then display the whole
item when the user selects one from the list. There are at least three ways to do this.
“When the user selects an item from a list, where should I show the details of that item?”
• Two-Panel Selector shows the item details right next to the list. It supports the overview and browsing use cases quite well because everything’s visible at once; the surrounding page stays the same, so there’s no awkward context switch or page reload.
• List Inlay shows the item details embedded in the list itself. The details only open
up when the user requests them with a click or tap. This pattern supports the overview and browsing use cases, too—though an overview is harder if lots of items are
open—and searching on item contents can be done smoothly by automatically opening matched items.
• One-Window Drilldown replaces the list’s space with the item details. This is often
used for small spaces that cannot accommodate a Two-Panel Selector, such as mobile
screens or small module panels. It does lead to “pogo sticking” between the list screen
and the item screen, though, so browsing and searching are not so easy.

---

## Sección 55: Chapter 7, and links and other navigational mechanisms in Chapter 3. Mobile platforms

-- 222 of 577 --

Some Solutions 195
Now let’s shift our attention to the items themselves. How much detail should you show
with each item, assuming the user will click through to see the whole thing? Again, you
have three main use cases to serve: get a quick overview, browse the list, and find items
of interest. For really focused tasks, such as finding a person’s phone number in a long
contact list, all that’s needed is the item name. But for a broader, more browsing-oriented
experience—news articles on a web page, for instance—more information makes an item
more interesting (up to a point, anyway). And if you have visuals associated with each
item, show thumbnails!
“How can I show a list with heavy visuals?”
• Use fat rows. Instead of just one line per item, give each item row several lines’ worth
of text. Enhance it with a small graphic or image thumbnail, if available, and use rich
text formatting to express a miniature visual hierarchy within each row. See the Grid
of Equals pattern in Chapter 4 for the basis of this pattern.
• Thumbnail-and-Text List, in Chapter 10, is a specialization of fat rows for a mobile
device.
• Thumbnail Grid is a common pattern for pictorial objects. A 2D grid of small pictures
is visually powerful; it dominates the page and draws attention. Text data is often
shown with the thumbnails, but it tends to be small and less important than the pictures. Again, see the Grid of Equals pattern for a generalization.
• Carousel is an alternative to Thumbnail Grid that can use less space on the page. It is
strictly linear, not 2D, and the user must actively scroll through it to see more than a
few objects. Depending on its design, a Carousel implementation might actually give
you more space to show the selected or center object than a Thumbnail Grid.
Highly structured, homogeneous sets of items work well in a table layout, with a column
for each field of interest to users. Such a table might offer sorting via a Sortable Table, or a
“Sort by” drop down for a simpler implementation. Row Striping can help a viewer’s eyes
travel across a single item’s row, from left to right and back again. Tables are lists, but
they’re also complex data graphics that can be filtered and visualized with sophisticated
tools. So for other table-related patterns, I refer you to Chapter 7.
Very long lists can be difficult to design, especially on web pages. Certainly there are
technical challenges around loading times and page length, but interaction design might
be even harder—how does a user browse and move through such a list? How can he find
something specific, especially if a text search doesn’t behave as desired? The following
techniques and patterns apply to all the previously listed ways to show a list and its items
(except maybe a Carousel, which has tighter constraints):
Download from Wow! eBook <www.wowebook.com>

-- 223 of 577 --

196 Chapter 5: Lists of Things
“How can I manage a very long list?”
• Pagination lets you load the list in sections, putting the onus on the user to load those
sections as needed. This is, of course, quite common in websites—it’s easy to design
and implement. Pagination is most useful when the user is likely to find the desired
item(s) in the first page, since many people won’t bother going to subsequent pages
anyway. You could also resort to Pagination when loading the whole list will result in
a ridiculously long page or take a ridiculously long time. A good Pagination control
shows the user how many pages of items there are, as well as letting a user jump
among those pages.
• Infinite List is a single-page alternative to Pagination. The first section of a long list
gets loaded, and at the bottom the user

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[DESIGN_MASTERY_2026]] · [[AGENT_CREATIVE_AND_VISUAL_AWARENESS_2026]] · [[CANON_REFACTORING_UI_WATHAN_SCHOGER]] · [[CANON_PRACTICAL_UI_ADHAM_DANNAWAY]] · #ui_ux_design
