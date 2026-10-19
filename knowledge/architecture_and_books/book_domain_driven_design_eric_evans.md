# 📚 Libro Completo: Domain-Driven Design: Tackling Complexity in the Heart of Software

**Alcance:** Fuente bibliográfica completa sobre Lenguaje Ubicuo, Bounded Contexts, Entidades, Objetos de Valor, Agregados y Eventos de Dominio (Domain-Driven Design: Tackling Complexity in the Heart of Software — Eric Evans). Aplicable a la Software Factory Web y DiggityBets. NO sustituye los contratos de API de Kick ni las reglas específicas de negocio en `CANON_*`.

> **Autor:** Eric Evans  
> **Dominio:** Lenguaje Ubicuo, Bounded Contexts, Entidades, Objetos de Valor, Agregados y Eventos de Dominio  
> **Archivo Fuente:** `Domain-Driven-Design-Eric-Evans.pdf`  
> **Páginas Originales:** 324  
> **Secciones Extraídas:** 46  
> **Fecha de Ingesta:** 2026-10-19  

---

## Sección 1: Foundations & Introduction

-- 1 of 324 --

Chapter One. Crunching Knowledge
A few years ago, I set out to design a specialized software tool for printed-circuit board (PCB) design.
One catch: I didn't know anything about electronic hardware. I had access to some PCB designers,
of course, but they typically got my head spinning in three minutes. How was I going to understand
enough to write this software? I certainly wasn't going to become an electrical engineer before the
delivery deadline!
We tried having the PCB designers tell me exactly what the software should do. Bad idea. They
were great circuit designers, but their software ideas usually involved reading in an ASCII file, sorting
it, writing it back out with some annotation, and producing a report. This was clearly not going to
lead to the leap forward in productivity that they were looking for.
The first few meetings were discouraging, but there was a glimmer of hope in the reports they asked
for. They always involved “nets” and various details about them. A net, in this domain, is essentially
a wire conductor that can connect any number of components on a PCB and carry an electrical
signal to everything it is connected to. We had the first element of the domain model.
I started drawing diagrams for them as we discussed the things they wanted the software to do. I
used an informal variant of object interaction diagrams to walk through scenarios.
PCB Expert 1: The components wouldn't have to be chips.
Developer (Me): So I should just call them “components”?
Expert 1: We call them “component instances.” There could be many of the same component.
Expert 2: The “net” box looks just like a component instance.
-- 2 of 324 --

Expert 1: He's not using our notation. Everything is a box for them, I guess.
Developer: Sorry to say, yes. I guess I'd better explain this notation a little more.
They constantly corrected me, and as they did I started to learn. We ironed out collisions and ambiguities in their terminology and differences between their technical opinions, and they learned.
They began to explain things more precisely and consistently, and we started to develop a model
together.
Expert 1: It isn't enough to say a signal arrives at a ref-des, we have to know the pin.
Developer: Ref-des?
Expert 2: Same thing as a component instance. Ref-des is what it's called in a particular tool we use.
Expert 1: Anyhow, a net connects a particular pin of one instance to a particular pin of another.
Developer: Are you saying that a pin belongs to only one component instance and connects to only
one net?
Expert 1: Yes, that's right.
Expert 2: Also, every net has a topology, an arrangement that determines the way the elements of
the net connect.
Developer: OK, how about this?
To focus our exploration, we limited ourselves, for a while, to studying one particular feature. A
“probe simulation” would trace the propagation of a signal to detect likely sites of certain kinds of
problems in the design.
Developer: I understand how the signal gets carried by the Net to all the Pins attached, but how
does it go any further than that? Does the Topology have something to do with it?
Expert 2: No. The component pushes the signal through.
Developer: We certainly can't model the internal behavior of a chip. That's way too complicated.
Expert 2: We don't have to. We can use a simplification. Just a list of pushes through the component
from certain Pins to certain others.
Developer: Something like this?
[With considerable trial-and-error, together we sketched out a scenario.]
Crunching Knowledge 5

-- 3 of 324 --

Developer: But what exactly do you need to know from this computation?
Expert 2: We'd be looking for long signal delays—say, any signal path that was more than two or
three hops. It's a rule of thumb. If the path is too long, the signal may not arrive during the clock cycle.
Developer: More than three hops.... So we need to calculate the path lengths. And what counts as
a hop?
Expert 2: Each time the signal goes over a Net, that's one hop.
Developer: So we could pass the number of hops along, and a Net could increment it, like this.
Developer: The only part that isn't clear to me is where the “pushes” come from. Do we store that
data for every Component Instance?
Expert 2: The pushes would be the same for all the instances of a component.
Developer: So the type of component determines the pushes. They'll be the same for every instance?
Crunching Knowledge 6

-- 4 of 324 --

Expert 2: I'm not sure exactly what some of this means, but I would imagine storing push-throughs
for each component would look something like that.
Developer: Sorry, I got a little too detailed there. I was just thinking it through. . . . So, now, where
does the Topology come into it?
Expert 1: That's not used for the probe simulation.
Developer: Then I'm going to drop it out for now, OK? We can bring it back when we get to those
features.
And so it went (with much more stumbling than is shown here). Brainstorming and refining; questioning and explaining. The model developed along with my understanding of the domain and their
understanding of how the model would play into the solution. A class diagram representing that early
model looks something like this.
After a couple more part-time days of this, I felt I understood enough to attempt some code. I wrote
a very simple prototype, driven by an automated test framework. I avoided all infrastructure. There
was no persistence, and no user interface (UI). This allowed me to concentrate on the behavior. I
was able to demonstrate a simple probe simulation in just a few more days. Although it used dummy
data and wrote raw text to the console, it was nonetheless doing the actual computation of path
lengths using Java objects. Those Java objects reflected a model shared by the domain experts
and myself.
Crunching Knowledge 7

-- 5 of 324 --

The concreteness of this prototype made clearer to the domain experts what the model meant and
how it related to the functioning software. From that point, our model discussions became more
interactive, as they could see how I incorporated my newly acquired knowledge into the model and
then into the software. And they had concrete feedback from the prototype to evaluate their own
thoughts.
Embedded in that model, which naturally became much more complicated than the one shown here,
was knowledge about the domain of PCB relevant to the problems we were solving. It consolidated
many synonyms and slight variations in descriptions. It excluded hundreds of facts that the engineers understood but that were not directly relevant, such as the actual digital features of the components. A software specialist like me could look at the diagrams and in minutes start to get a grip
on what the software was about. He or she would have a framework to organize new information
and learn faster, to make better guesses about what was important and what was not, and to communicate better with the PCB engineers.
As the engineers described new features they needed, I made them walk me through scenarios of
how the objects interacted. When the model objects couldn't carry us through an important scenario,
we brainstormed new ones or changed old ones, crunching their knowledge. We refined the model;
the code coevolved. A few months later the PCB engineers had a rich tool that exceeded their
expectations.
Ingredients of Effective Modeling
Certain things we did led to the success I just described.
1.
 Binding the model and the implementation. That crude prototype forged the essential link
early, and it was maintained through all subsequent iterations.
2.
 Cultivating a language based on the model. At first, the engineers had to explain elementary
PCB issues to me, and I had to explain what a class diagram meant. But as the project proceeded, any of us could take terms straight out of the model, organize them into sentences
consistent with the structure of the model, and be un-ambiguously understood without translation.
3.
 Developing a knowledge-rich model. The objects had behavior and enforced rules. The model
wasn't just a data schema; it was integral to solving a complex problem. It captured knowledge
of various kinds.
4.
 Distilling the model. Important concepts were added to the model as it became more complete, but equally important, concepts were dropped when they didn't prove useful or central.
When an unneeded concept was tied to one that was needed, a new model was found that
distinguished the essential concept so that the other could be dropped.
5.
 Brainstorming and experimenting. The language, combined with sketches and a brainstorming attitude, turned our discussions into laboratories of the model, in which hundreds of experimental variations could be exercised, tried, and judged. As the team went through scenarios, the spoken expressions themselves provided a quick viability test of a proposed model,
as the ear could quickly detect either the clarity and ease or the awkwardness of expression.
It is the creativity of brainstorming and massive experimentation, leveraged through a model-based
language and disciplined by the feedback loop through implementation, that makes it possible to
find a knowledge-rich model and distill it. This kind of
knowledge crunching turns the knowledge of
the team into valuable models.
Crunching Knowledge 8

---

## Sección 2: Foundations & Introduction

-- 6 of 324 --

Knowledge Crunching
Financial analysts crunch numbers. They sift through reams of detailed figures, combining and recombining them looking for the underlying meaning, searching for a simple presentation that brings
out what is really important—an understanding that can be the basis of a financial decision.
Effective domain modelers are knowledge crunchers. They take a torrent of information and probe
for the relevant trickle. They try one organizing idea after another, searching for the simple view that
makes sense of the mass. Many models are tried and rejected or transformed. Success comes in
an emerging set of abstract concepts that makes sense of all the detail. This distillation is a rigorous
expression of the particular knowledge that has been found most relevant.
Knowledge crunching is not a solitary activity. A team of developers and domain experts collaborate,
typically led by developers. Together they draw in information and crunch it into a useful form. The
raw material comes from the minds of domain experts, from users of existing systems, from the prior
experience of the technical team with a related legacy system or another project in the same domain.
It comes in the form of documents written for the project or used in the business, and lots and lots
of talk. Early versions or prototypes feed experience back into the team and change interpretations.
In the old waterfall method, the business experts talk to the analysts, and analysts digest and abstract and pass the result along to the programmers, who code the software. This approach fails
because it completely lacks feedback. The analysts have full responsibility for creating the model,
based only on input from the business experts. They have no opportunity to learn from the programmers or gain experience with early versions of software. Knowledge trickles in one direction,
but does not accumulate.
Other projects use an iterative process, but they fail to build up knowledge because they don't
abstract. Developers get the experts to describe a desired feature and then they go build it. They
show the experts the result and ask what to do next. If the programmers practice refactoring, they
can keep the software clean enough to continue extending it, but if programmers are not interested
in the domain, they learn only what the application should do, not the principles behind it. Useful
software can be built that way, but the project will never arrive at a point where powerful new features
unfold as corollaries to older features.
Good programmers will naturally start to abstract and develop a model that can do more work. But
when this happens only in a technical setting, without collaboration with domain experts, the concepts are naive. That shallowness of knowledge produces software that does a basic job but lacks
a deep connection to the domain expert's way of thinking.
The interaction between team members changes as all members crunch the model together. The
constant refinement of the domain model forces the developers to learn the important principles of
the business they are assisting, rather than to produce functions mechanically. The domain experts
often refine their own understanding by being forced to distill what they know to essentials, and they
come to understand the conceptual rigor that software projects require.
All this makes the team members more competent knowledge crunchers. They winnow out the
extraneous. They recast the model into an ever more useful form. Because analysts and programmers are feeding into it, it is cleanly organized and abstracted, so it can provide leverage for the
implementation. Because the domain experts are feeding into it, the model reflects deep knowledge
of the business. The abstractions are true business principles.
As the model improves, it becomes a tool for organizing the information that continues to flow
through the project. The model focuses requirements analysis. It intimately interacts with programming and design. And in a virtuous cycle, it deepens team members' in-sight into the domain, letting
them see more clearly and leading to further refinement of the model. These models are never
perfect; they evolve. They must be practical and useful in making sense of the domain. They must
be rigorous enough to make the application simple to implement and understand.
Crunching Knowledge 9

-- 7 of 324 --

Continuous Learning
When we set out to write software, we never know enough. Knowledge on the project is fragmented,
scattered among many people and documents, and it's mixed with other information so that we don't
even know which bits of knowledge we really need. Domains that seem less technically daunting
can be deceiving: we don't realize how much we don't know. This ignorance leads us to make false
assumptions.
Meanwhile, all projects leak knowledge. People who have learned something move on. Reorganization scatters the team, and the knowledge is fragmented again. Crucial subsystems are outsourced in such a way that code is delivered but knowledge isn't. And with typical design approaches, the code and documents don't express this hard-earned knowledge in a usable form, so
when the oral tradition is interrupted for any reason, the knowledge is lost.
Highly productive teams grow their knowledge consciously, practicing
continuous learning (Kerievsky 2003). For developers, this means improving technical knowledge, along with general domainmodeling skills (such as those in this book). But it also includes serious learning about the specific
domain they are working in.
These self-educated team members form a stable core of people to focus on the development tasks
that involve the most critical areas. (For more on this, see Chapter 15.) The accumulated knowledge
in the minds of this core team makes them more effective knowledge crunchers.
At this point, stop and ask yourself a question. Did you learn something about the PCB design
process? Although this example has been a superficial treatment of that domain, there should be
some learning when a domain model is discussed. I learned an enormous amount. I did not learn
how to be a PCB engineer. That was not the goal. I learned to talk to PCB experts, understand the
major concepts relevant to the application, and sanity-check what we were building.
In fact, our team eventually discovered that the probe simulation was a low priority for development,
and the feature was eventually dropped altogether. With it went the parts of the model that captured
understanding of pushing signals through components and counting hops. The core of the application turned out to lie else-where, and the model changed to bring those aspects onto center stage.
The domain experts had learned more and had clarified the goal of the application. (Chapter 15
discusses these issues in depth.)
Even so, the early work was essential. Key model elements were retained, but more important, that
work set in motion the process of knowledge crunching that made all subsequent work effective:
the knowledge gained by team members, developers, and domain experts alike; the beginnings of
a shared language; and the closing of a feedback loop through implementation. A voyage of discovery has to start somewhere.
Knowledge-Rich Design
The kind of knowledge captured in a model such as the PCB example goes beyond “find the nouns.”
Business activities and rules are as central to a domain as are the entities involved; any domain will
have various categories of concepts. Knowledge crunching yields models that reflect this kind of
insight. In parallel with model changes, developers refactor the implementation to express the
model, giving the application use of that knowledge.
It is with this move beyond entities and values that knowledge crunching can get intense, because
there may be actual inconsistency among business rules. Domain experts are usually not aware of
how complex their mental processes are as, in the course of their work, they navigate all these rules,
reconcile contradictions, and fill in gaps with common sense. Software can't do this. It is through
knowledge crunching in close collaboration with software experts that the rules are clarified, fleshed
out, reconciled, or placed out of scope.
Crunching Knowledge 10

---

## Sección 3: Foundations & Introduction

-- 8 of 324 --

Example
Extracting a Hidden Concept
Let's start with a very simple domain model that could be the basis of an application for booking
cargos onto a voyage of a ship.
We can state that the booking application's responsibility is to associate each Cargo with a Voyage, recording and tracking that relationship. So far so good. Somewhere in the application code
there could be a method like this:
public int makeBooking(Cargo cargo, Voyage voyage) {
int confirmation = orderConfirmationSequence.next();
voyage.addCargo(cargo, confirmation);
return confirmation;
}
Because there are always last-minute cancellations, standard practice in the shipping industry is to
accept more cargo than a particular vessel can carry on a voyage. This is called “overbooking.”
Sometimes a simple percentage of capacity is used, such as booking 110 percent of capacity. In
other cases complex rules are applied, favoring major customers or certain kinds of cargo.
This is a basic strategy in the shipping domain that would be known to any businessperson in the
shipping industry, but it might not be understood by all technical people on a software team.
The requirements document contains this line:
Allow 10% overbooking.
The class diagram and code now look like this:
public int makeBooking(Cargo cargo, Voyage voyage) {
double maxBooking = voyage.capacity() * 1.1;
if ((voyage.bookedCargoSize() + cargo.size()) > maxBooking)
return –1;
int confirmation = orderConfirmationSequence.next();
voyage.addCargo(cargo, confirmation);
return confirmation;
}
Now an important business rule is hidden as a guard clause in an application method. Later, in

---

## Sección 4: Chapter 4, we'll look at the principle of

LAYERED ARCHITECTURE, which would guide us to move
the over-booking rule into a domain object, but for now let's concentrate on how we could make this
knowledge more explicit and accessible to everyone on the project. This will bring us to a similar
solution.
1. As written, it is unlikely that any business expert could read this code to verify the rule, even
with the guidance of a developer.
Crunching Knowledge 11

-- 9 of 324 --

2. It would be difficult for a technical, non-businessperson to connect the requirement text with
the code.
If the rule were more complex, that much more would be at stake.
We can change the design to better capture this knowledge. The overbooking rule is a policy.
Policy is another name for the design pattern known as
STRATEGY (Gamma et al. 1995). It is
usually motivated by the need to substitute different rules, which is not needed here, as far as we
know. But the concept we are trying to capture does fit the
meaning of a policy, which is an equally
important motivation in domain-driven design. (See Chapter 12, “Relating Design Patterns to the
Model.”)
The code is now:
public int makeBooking(Cargo cargo, Voyage voyage) {
if (!overbookingPolicy.isAllowed(cargo, voyage)) return –1;
int confirmation = orderConfirmationSequence.next();
voyage.addCargo(cargo, confirmation);
return confirmation;
}
The new Overbooking Policy class contains this method:
public boolean isAllowed(Cargo cargo, Voyage voyage) {
return (cargo.size() + voyage.bookedCargoSize()) <=
(voyage.capacity() * 1.1);
}
It will be clear to all that overbooking is a distinct policy, and the implementation of that rule is explicit
and separate.
Now,
I am not recommending that such an elaborate design be applied to every detail of the domain. Chapter 15, “Distillation,” goes into depth on how to focus on the important and minimize or
separate everything else. This example is meant to show that a domain model and corresponding
design can be used to secure and share knowledge. The more explicit design has these advantages:
1. In order to bring the design to this stage, the programmers and everyone else involved will
have come to understand the nature of overbooking as a distinct and important business rule,
not just an obscure calculation.
2. Programmers can show business experts technical artifacts, even code, that should be intelligible to domain experts (with guidance), thereby closing the feedback loop.
Crunching Knowledge 12

-- 10 of 324 --

Deep Models
Useful models seldom lie on the surface. As we come to understand the domain and the needs of
the application, we usually discard superficial model elements that seemed important in the beginning, or we shift their perspective. Subtle abstractions emerge that would not have occurred to us
at the outset but that pierce to the heart of the matter.
The preceding example is loosely based on one of the projects that I'll be drawing on for several
examples throughout the book: a container shipping system. The examples in this book will be kept
accessible to non-shipping experts. But on a real project, where continuous learning prepares the
team members, models of utility and clarity often call for sophistication both in the domain and in
modeling technique.
On that project, because a shipment begins with the act of booking cargo, we developed a model
that allowed us to describe the cargo, its itinerary, and so on. This was all necessary and useful,
yet the domain experts felt dissatisfied. There was a way they looked at their business that we were
missing.
Eventually, after months of knowledge crunching, we realized that the handling of cargo, the physical
loading and unloading, the movements from place to place, was largely carried out by subcontractors or by operational people in the company. In the view of our shipping experts, there was a series
of transfers of responsibility between parties. A process governed that transfer of legal and practical
responsibility, from the shipper to some local carrier, from one carrier to another, and finally to the
consignee. Often, the cargo would sit in a warehouse while important steps were being taken. At
other times, the cargo would move through complex physical steps that were not relevant to the
shipping company's business decisions. Rather than the logistics of the itinerary, what came to the
fore were legal documents such as the bill of lading, and processes leading to the release of payments.
This deeper view of the shipping business did not lead to the removal of the Itinerary object, but the
model changed profoundly. Our view of shipping changed from moving containers from place to
place, to transferring responsibility for cargo from entity to entity. Features for handling these transfers of responsibility were no longer awkwardly attached to loading operations, but were supported
by a model that came out of an understanding of the significant relationship between those operations and those responsibilities.
Knowledge crunching is an exploration, and you can't know where you will end up.
Crunching Knowledge 13

-- 11 of 324 --

Chapter Two. Communication and the Use of
Language
A domain model can be the core of a common language for a software project. The model is a set
of concepts built up in the heads of people on the project, with terms and relationships that reflect
domain insight. These terms and interrelationships provide the semantics of a language that is
tailored to the domain while being precise enough for technical development. This is a crucial cord
that weaves the model into development activity and binds it with the code.
This model-based communication is not limited to diagrams in Unified Modeling Language (UML).
To make most effective use of a model, it needs to pervade every medium of communication. It
increases the utility of written text documents, as well as the informal diagrams and casual conversation reemphasized in Agile processes. It improves communication through the code itself and
through the tests for that code.
The use of language on a project is subtle but all-important. . . .
Ubiquitous Language
For first you write a sentence,
And then you chop it small;
Then mix the bits, and sort them out
Just as they chance to fall:
The order of the phrases makes
No difference at all.
—Lewis Carroll, “Poeta Fit, Non Nascitur”
To create a supple, knowledge-rich design calls for a versatile, shared team language, and a lively
experimentation with language that seldom happens on software projects.
Domain experts have limited understanding of the technical jargon of software development, but
they use the jargon of their field—probably in various flavors. Developers, on the other hand, may
understand and discuss the system in descriptive, functional terms, devoid of the meaning carried
by the experts' language. Or developers may create abstractions that support their design but are
not understood by the domain experts. Developers working on different parts of the problem work
out their own design concepts and ways of describing the domain.
Across this linguistic divide, the domain experts vaguely describe what they want. Developers,
struggling to understand a domain new to them, vaguely understand. A few members of the team
manage to become bilingual, but they become bottlenecks of information flow, and their translations
are inexact.
-- 12 of 324 --

---

## Sección 5: Chapter 4, we'll look at the principle of

On a project without a common language, developers have to translate for domain experts. Domain
experts translate between developers and still other domain experts. Developers even translate for
each other. Translation muddles model concepts, which leads to destructive refactoring of code.
The indirectness of communication conceals the formation of schisms—different team members
use terms differently but don't realize it. This leads to unreliable software that doesn't fit together
(see Chapter 14). The effort of translation prevents the interplay of knowledge and ideas that lead
to deep model insights.
A project faces serious problems when its language is fractured. Domain experts use their jargon
while technical team members have their own language tuned for discussing the domain in terms
of design.
The terminology of day-to-day discussions is disconnected from the terminology embedded in the
code (ultimately the most important product of a software project). And even the same person uses
different language in speech and in writing, so that the most incisive expressions of the domain often
emerge in a transient form that is never captured in the code or even in writing.
Translation blunts communication and makes knowledge crunching anemic.
Yet none of these dialects can be a common language because none serves all needs.
The overhead cost of all the translation, plus the risk of misunderstanding, is just too high. A project
needs a common language that is more robust than the lowest common denominator. With a conscious effort by the team, the domain model can provide the backbone for that common language,
while connecting team communication to the software implementation. That language can be ubiquitous in the team's work.
The vocabulary of that
UBIQUITOUS LANGUAGE includes the names of classes and prominent
operations. The
LANGUAGE includes terms to discuss rules that have been made explicit in the
model. It is supplemented with terms from high-level organizing principles imposed on the model
(such as
CONTEXT MAPS and large-scale structures, which will be discussed in Chapters 14 and
16). Finally, this language is enriched with the names of patterns the team commonly applies to the
domain model.
The model relationships become the combinatory rules all languages have. The meanings of words
and phrases echo the semantics of the model.
The model-based language should be used among developers to describe not only artifacts in the
system, but tasks and functionality. This same model should supply the language for the developers
and domain experts to communicate with each other, and for the domain experts to communicate
among themselves about requirements, development planning, and features. The more pervasively
the language is used, the more smoothly understanding will flow.
At least, this is where we need to go. But initially the model may simply not be good enough to fill
these roles. It may lack the semantic richness of the specialized jargons of the field. But those
jargons can't be used unadulterated because they contain ambiguities and contradictions. It may
lack the more subtle and active features the developers have created in the code, either because
they do not think of those as part of a model, or because the coding style is procedural and only
implicitly carries those concepts of the domain.
But although the sequence seems circular, the knowledge crunching process that can produce a
more useful kind of model depends on the team's commitment to model-based language. Persistent
use of the
UBIQUITOUS LANGUAGE will force the model's weaknesses into the open. The team
will experiment and find alternatives to awkward terms or combinations. As gaps are found in the
language, new words will enter the discussion.
These changes to the language will be recognized
as changes in the domain model and will lead the team to update class diagrams and rename
classes and methods in the code, or even change behavior, when the meaning of a term changes.
Committed to using this language in the context of implementation, the developers will point out
imprecision or contradictions, engaging the domain experts in discovering workable alternatives.
Communication and the Use of Language 15

-- 13 of 324 --

Of course, domain experts will speak outside the scope of the
UBIQUITOUS LANGUAGE, to explain
and give broader context. But within the scope the model addresses, they should use
LANGUAGE and raise concerns when they find it awkward or incomplete—or wrong. By using the modelbased language pervasively and not being satisfied until it flows, we approach a model that is complete and comprehensible, made up of simple elements that combine to express complex ideas.
Therefore:
Use the model as the backbone of a language. Commit the team to exercising that language relentlessly in all communication within the team and in the code. Use the same language in diagrams,
writing, and especially speech.
Iron out difficulties by experimenting with alternative expressions, which reflect alternative models.
Then refactor the code, renaming classes, methods, and modules to conform to the new model.
Resolve confusion over terms in conversation, in just the way we come to agree on the meaning of
ordinary words.
Recognize that a change in the UBIQUITOUS LANGUAGE is a change to the model.
Domain experts should object to terms or structures that are awkward or inadequate to convey
domain understanding; developers should watch for ambiguity or inconsistency that will trip up design.
With a
UBIQUITOUS LANGUAGE, the model is not just a design artifact. It becomes integral to
everything the developers and domain experts do together. The
LANGUAGE carries knowledge in
a dynamic form. Discussion in the
LANGUAGE brings to life the meaning behind the diagrams and
code.
This discussion of
UBIQUITOUS LANGUAGE assumes that there is just one model in play. Chapter
14, “Maintaining Model Integrity,” deals with the coexistence of different models (and
LANGUAGES) and how to keep a model from splintering.
The
UBIQUITOUS LANGUAGE is the primary carrier of the aspects of design that don't appear in
code—large-scale structures that organize the whole system (see Chapter 16),
BOUNDED CONTEXTS that define the relationships of different systems and models (see Chapter 14), and other
patterns applied to the model and design.
Example
Working Out a Cargo Router
The following two dialogs have subtle, but important, differences. In each scenario, watch for how
much the speakers talk about what the software means to the business versus how it works technically. Are the user and developer speaking the same language? Is that language rich enough to
carry the discussion of what the application must do?
Communication and the Use of Language 16

---

## Sección 6: Chapter 4, we'll look at the principle of

-- 14 of 324 --

Scenario 1: Minimal Abstraction of the Domain
User: So when we change the customs clearance point, we need to redo the whole routing plan.
Developer: Right. We'll delete all the rows in the shipment table with that cargo id, then we'll pass
the origin, destination, and the new customs clearance point into the Routing Service, and it will repopulate the table. We'll have to have a Boolean in the Cargo so we'll know there is data in the
shipment table.
User: Delete the rows? OK, whatever. Anyway, if we didn't have a customs clearance point at all
before, we'll have to do the same thing.
Developer: Sure, anytime you change the origin, destination, or customs clearance point (or enter
one for the first time), we'll check to see if we have shipment data and then we'll delete it and then
let the Routing Service regenerate it.
User: Of course, if the old customs clearance just happened to be the right one, we wouldn't want
to do that.
Developer: Oh, no problem. It's easier to just make the Routing Service redo the loads and unloads
every time.
User: Yes, but it's extra work for us to make all the supporting plans for a new itinerary, so we don't
want to reroute unless the change necessitates it.
Developer:
Ugh. Well, then, if you are entering a customs clearance point for the first time, we'll
have to query the table to find the old derived customs clearance point, and then compare it to the
new one. Then we'll know if we need to redo it.
User: You won't have to worry about this on origin or destination, since the itinerary would always
change then.
Developer: Good. We won't.
Communication and the Use of Language 17

-- 15 of 324 --

Scenario 2: Domain Model Enriched to Support Discussion
User: So when we change the customs clearance point, we need to redo the whole routing plan.
Developer: Right. When you change any of the attributes in the Route Specification, we'll delete
the old Itinerary and ask the Routing Service to generate a new one based on the new Route Specification.
User: If we hadn't specified a customs clearance point at all before, we'll have to do that at the same
time.
Developer: Sure, anytime you change anything in the Route Spec, we'll regenerate the Itinerary.
That includes entering something for the first time.
User: Of course, if the old customs clearance just happened to be the right one, we wouldn't want
to do that.
Developer: Oh, no problem. It's easier to just make the Routing Service redo the Itinerary every
time.
User: Yes, but it's extra work for us to make all the supporting plans for a new Itinerary, so we don't
want to reroute unless the change necessitates it.
Developer: Oh. Then we'll have to add some functionality to the Route Specification. Then, whenever you change anything in the Spec, we'll see if the Itinerary still satisfies the Specification. If it
doesn't, we'll have the Routing Service regenerate the Itinerary.
User: You won't have to worry about this on origin or destination, since the Itinerary would always
change then.
Developer: Fine, but it will be simpler for us to just do the comparison every time. The Itinerary will
only be generated when the Route Specification is no longer satisfied.
The second dialog conveys more of the intent of the domain expert. The user employed the word
“itinerary” in both dialogs, but in the second it was an object the two could discuss precisely, concretely. They discussed the “route specification” explicitly, instead of describing it each time in terms
of attributes and procedures.
These two dialogs were deliberately constructed to closely parallel each other. Realistically, the first
would have been more verbose, bloated with explanations of application features and miscommunications. The domain-model-based terminology of the second design makes the second dialog
more concise.
Communication and the Use of Language 18

-- 16 of 324 --

Modeling Out Loud
The detachment of speech from other forms of communication is a particularly great loss because
we humans have a genius for spoken language. Unfortunately, when people speak, they usually
don't use the language of the domain model.
That statement may not ring true for you initially, and indeed there are exceptions. But the next time
you attend a requirements or design discussion, really listen. You'll hear descriptions of features in
business jargon or layman's versions of the jargon. You'll hear talk about technical artifacts and
concrete functionality. Sure, you'll hear terms from the domain model; obvious nouns in the common
language from the business jargon will typically be coded as objects, and so those terms will tend
to be mentioned. But do you hear phrases that could even remotely be described in terms of relationships and interactions in your current domain model?
One of the best ways to refine a model is to explore with speech, trying out loud various constructs
from possible model variations. Rough edges are easy to hear.
“If we give the Routing Service an origin, destination, and arrival time, it can look up the stops
the cargo will have to make and, well . . . stick them in the database.” (
vague and technical)
“The origin, destination, and so on . . . it all feeds into the Routing Service, and we get back an
Itinerary that has everything we need in it.” (
more complete, but verbose)
“A Routing Service finds an Itinerary that satisfies a Route Specification.” (
concise)
It is vital that we play around with words and phrases, harnessing our linguistic abilities to the modeling effort, just as it is vital to engage our visual/spatial reasoning by sketching diagrams. Just as
we employ our analytical abilities with methodical analysis and design, and that mysterious “feel” of
the code. These ways of thinking complement each other, and it takes all of them to find useful
models and designs. Of all of these, experimenting with language is most often overlooked. (Part
III of this book will delve into this discovery process and show this interplay in several dialogs.)
In fact, our brains seem to be somewhat specialized for dealing with complexity in spoken language
(one good treatment for laymen, like myself, is
The Language Instinct, by Steven Pinker [Pinker
1994]). For example, when people of different language backgrounds come together for commerce,
if they don't have a common language they invent one, called a
pidgin. The pidgin is not as comprehensive as the speakers' original languages, but it is suited to the task at hand. When people
are talking, they naturally discover differences in interpretation and the meaning of their words, and
they naturally resolve those differences. They find rough spots in the language and smooth them out.
Once I took an intensive Spanish class in college. The rule in the classroom was that not a word of
English could be spoken. At first, it was frustrating. It felt very unnatural, and required a lot of selfdiscipline. But eventually my classmates and I broke through to a level of fluency that we could never
have reached through exercises on paper.
As we use the
UBIQUITOUS LANGUAGE of the domain model in discussions—especially discussions in which developers and domain experts hash out scenarios and requirements—we become
more fluent in the language and teach each other its nuances. We naturally come to share the
language that we speak in a way that never happens with diagrams and documents.
Bringing about a
UBIQUITOUS LANGUAGE on a software project is easier said than done, and we
have to fully employ our natural talents to pull it off. Just as humans' visual and spatial capabilities
let us convey and process information rapidly in graphical overviews, we can exploit our innate talent
for grammatical, meaningful language to drive model development.
Therefore, as an addendum to the
UBIQUITOUS LANGUAGE pattern:
Play with the model as you talk about the system. Describe scenarios out loud using the elements
and interactions of the model, combining concepts in ways allowed by the model. Find easier ways
to say what you need to say, and then take those new ideas back down to the diagrams and code.
Communication and the Use of Language 19

---

## Sección 7: Chapter 4, we'll look at the principle of

-- 17 of 324 --

One Team, One Language
Technical people often feel the need to “shield” the business experts from the domain model. They
say:
“Too abstract for them.”
“They don't understand objects.”
“We have to collect requirements in their terminology.”
These are just a few of the reasons I've heard for having two languages on the team. Forget them.
Of course there are technical components of the design that may not concern the domain experts,
but the core of the model had better interest them. Too abstract? Then how do you know the abstractions are sound? Do you understand the domain as deeply as they do? Sometimes specific
requirements are collected from lower-level users, and a subset of the more concrete terminology
may be needed for them, but a domain expert is assumed to be capable of thinking somewhat deeply
about his or her field.
If sophisticated domain experts don't understand the model, there is something
wrong with the model.
Now at the beginning, when the users are discussing future capabilities of the system that haven't
been modeled yet, there is no model for them to use. But as soon as they begin to work through
these new ideas with the developers, the process of groping toward a shared model begins. It may
start out awkward and incomplete, but it will gradually get refined. As the new language evolves,
the domain experts must make the extra effort to adopt it, and to retrofit any old documents that are
still important.
When domain experts use this
LANGUAGE in discussions with developers or among themselves,
they quickly discover areas where the model is inadequate for their needs or seems wrong to them.
The domain experts (with the help of the developers) will also find areas where the precision of the
model-based language exposes contradictions or vagueness in their thinking.
The developers and domain experts can informally test the model by walking through scenarios,
using the model objects step-by-step. Almost every discussion is an opportunity for the developers
and user experts to play with the model together, deepening each other's understanding and refining
concepts as they go.
The domain experts can use the language of the model in writing use cases, and can work even
more directly with the model by specifying acceptance tests.
Objections are sometimes raised to the idea of using the language of the model to collect requirements. After all, shouldn't requirements be independent of the design that fulfills them? This overlooks the reality that all language is based on some model. The meanings of words are slippery
things. The domain model will typically derive from the domain experts' own jargon but will have
been “cleaned up,” to have sharper, narrower definitions. Of course, the domain experts should
object if these definitions diverge from the meanings accepted in the field. In an Agile process,
requirements evolve as a project goes along because hardly ever does the knowledge exist up front
to specify an application adequately. Part of this evolution should be the reframing of the requirements in the refined
UBIQUITOUS LANGUAGE.
Multiplicity of languages is often necessary, but the linguistic division should never be between the
domain experts and the developers. (Chapter 12, “Maintaining Model Integrity,” deals with the coexistence of models on the same project.)
Communication and the Use of Language 20

-- 18 of 324 --

Of course, developers do use technical terminology that a domain expert wouldn't understand. Developers have an extensive jargon that they need to discuss the technical aspects of a system.
Almost certainly, the users will also have specialized jargon that goes well beyond the narrow scope
of the application and the understanding of the developers. But these are
extensions to the language. These dialects should not contain alternative vocabularies for the same domain that reflect
distinct models.
Figure 2.3. UBIQUITOUS LANGUAGE is cultivated in the intersection of jargons.
With a
UBIQUITOUS LANGUAGE, conversations among developers, discussions among domain
experts, and expressions in the code itself are all based on the same language, derived from a
shared domain model.
Documents and Diagrams
Whenever I'm in a meeting discussing a software design, I can hardly function without drawing on
a whiteboard or sketchpad. A good part of what I draw is UML diagrams, mostly class diagrams or
object-interactions.
Some people are naturally visual, and diagrams help people grasp certain kinds of information. UML
diagrams are pretty good at communicating relationships between objects, and they are fair at
showing interactions. But they do not convey the conceptual definitions of those objects. In a meeting, I would flesh out those meanings in speech as I sketched the diagram, or they would emerge
in a dialog with other participants.
Simple, informal UML diagrams can anchor a discussion. Sketch a diagram of three to five objects
central to the issue at hand, and everyone can stay focused. Everyone will share a view of the
relationships between the objects and, significantly, the objects' names. The spoken discussion can
be more effective with this aid. A diagram can be changed as people try different thought experiments, and the sketch will take on some of the fluidity of spoken words, a true part of the discussion.
After all, UML stands for Unified Modeling
Language.
The trouble comes when people feel compelled to convey the whole model or design through UML.
A lot of object model diagrams are too complete and, simultaneously, leave too much out. They are
too complete because people feel they have to put all the objects that they are going to code into a
modeling tool. With all that detail, no one can see the forest for the trees.
Communication and the Use of Language 21

-- 19 of 324 --

Yet in spite of all that detail, the attributes and relationships are only half the story of an object model.
The behavior of those objects and the constraints on them are not so easily illustrated. Object interaction diagrams can illustrate some tricky hotspots in the design, but the bulk of the interactions
can't be shown that way. It is just too much work, both to create the diagrams and to read them.
And an interaction diagram can still only imply the purpose behind the model. To include constraints
and assertions, UML falls back on text, placed in little brackets, inserted into the diagram.
The behavioral responsibilities of an object can be hinted at through operation names, and they can
be implicitly demonstrated with object interaction (or sequence) diagrams, but they cannot be
stated. So, this task falls to supplemental text or conversation. In other words, a UML diagram cannot
convey two of the most important aspects of a model: the meaning of the concepts it represents,
and what the objects are meant to do. This needn't trouble us, though, because careful use of English
(or Spanish, or whatever) can fill this role pretty well.
Nor is UML a very satisfying programming language. Every attempt I've seen to use the codegeneration capabilities of the modeling tools has been counterproductive. If you are constrained by
the capabilities of UML, you will often have to leave out the most crucial part of the model because
it is some rule that doesn't fit into a box-and-line diagram. And, of course, a code generator cannot
make use of those textual annotations. If you do use some technology that allows executable programs to be written in a UML-like diagramming language, then the UML diagram is reduced to merely
another way to view the program itself, and the very meaning of “model” is lost. If you use UML as
your implementation language, you will still need other means of communicating the uncluttered
model.
Diagrams are a means of communication and explanation, and they facilitate brainstorming. They
serve these ends best if they are minimal. Comprehensive diagrams of the entire object model fail
to communicate or explain; they overwhelm the reader with detail and they lack meaning. This leads
us away from the all-encompassing object model diagram, or even the all-encompassing database
repository of UML. It leads us toward simplified diagrams of conceptually important parts of the
object model that are essential to understanding the design. The diagrams in this book are typical
of those I use on projects. They simplify, they explain, and they even incorporate a bit of nonstandard
notation when it clarifies their point. They show design constraints, but they are not design specifications in every detail. They represent the skeletons of ideas.
The vital detail about the design is captured in the code. A well-written implementation should be
transparent, revealing the model underlying it. (Making sure that this happens is the subject of the
next chapter and much of the rest of this book.) Supplemental diagrams and documents can guide
people's attention to the central points. Natural language discussion can fill in the nuances of meaning. This is why I prefer to turn things inside out from the way a typical UML diagram handles them.
Rather than a diagram annotated with text, I write a text document illustrated with selective and
simplified diagrams.
Always remember that
the model is not the diagram. The diagram's purpose is to help communicate
and explain the model. The code can serve as a repository of the details of the design. Well-written
Java is as expressive as UML in its way. Carefully selected and constructed diagrams can serve to
focus attention and aid navigation if they are not obscured by a compulsion to represent the model
or design completely.
Written Design Documents
Spoken communication supplements the code's rigor and detail with meaning. But although talking
is critical to connecting everyone to the model, a group of any size will probably need the stability
and share-ability of some written documents. But making written documents that actually help the
team produce good software is a challenge.
Once a document takes on a persistent form, it often loses its connection with the flow of the project.
It is left behind by the evolution of the code, or by the evolution of the language of the project.
Communication and the Use of Language 22

---

## Sección 8: Chapter 4, we'll look at the principle of

-- 20 of 324 --

Many approaches can work. A few specific documents will be suggested much later, in Part IV of
this book, which address particular needs, but I make no attempt to prescribe a set of documents
a project should use. Instead, I will offer two general guidelines for evaluating a document.
Documents Should Complement Code and Speech
Each Agile process has its own philosophy about documents. Extreme Programming advocates
using no extra design documents at all and letting the code speak for itself. Running code doesn't
lie, as any other document might. The behavior of running code is unambiguous.
Extreme Programming concentrates exclusively on the
active elements of a program and executable tests. Even comments added to the code do not affect program behavior, so they always fall
out of sync with the active code and its driving model. External documents and diagrams do not
affect the behavior of the program, so they fall out of sync. On the other hand, spoken communication
and ephemeral diagrams on whiteboards do not linger to create confusion. This dependence on the
code as communication medium motivates developers to keep the code clean and transparent.
But code as a design document does have its limits. It can over-whelm the reader with detail. Although its behavior is unambiguous, that doesn't mean it is obvious. And the meaning behind a
behavior can be hard to convey. In other words, documenting exclusively through code has some
of the same basic problems as using comprehensive UML diagrams. Of course, massive spoken
communication within the team gives context and guidance around the code, but it is ephemeral
and localized. And developers are not the only people who need to understand the model.
A document shouldn't try to do what the code already does well. The code already supplies the
detail. It is an exact specification of program behavior.
Other documents need to illuminate meaning, to give insight into large-scale structures, and to focus
attention on core elements. Documents can clarify design intent when the programming language
does not support a straightforward implementation of a concept. Written documents should complement the code and the talking.
Documents Should Work for a Living and Stay Current
When I document a model in writing, I diagram small, carefully selected subsets of the model and
surround them with text. I define the classes and their responsibilities in words and frame them in
a context of meaning as only a natural language can. But the diagram shows some of the choices
that have been made in formalizing and paring down the concepts into an object model. These
diagrams can be somewhat casual—even hand-drawn. In addition to saving labor, hand-drawn
diagrams have the advantage of
feeling casual and temporary. These are good things to communicate because they are generally true of our model ideas.
The greatest value of a design document is to explain the concepts of the model, help in navigating
the detail of the code, and perhaps give some insight into the model's intended style of use. Depending on the philosophy of the team, the whole design document could be as simple as a set of
sketches posted on the walls, or it could be substantial.
A document must be involved in project activities. The easiest way to judge this is to observe the
document's interaction with the
UBIQUITOUS LANGUAGE. Is the document written in the language
people speak on the project (now)? Is it written in the language embedded in the code?
Listen to the
UBIQUITOUS LANGUAGE and how it is changing. If the terms explained in a design
document don't start showing up in conversations and code, the document is not fulfilling its purpose.
Maybe the document is too big or complicated. Maybe it is not focused on a sufficiently important
topic. People are either not reading it or not finding it compelling. If it is having no impact on the
UBIQUITOUS LANGUAGE, something is wrong.
Communication and the Use of Language 23

-- 21 of 324 --

Conversely, you may hear the
UBIQUITOUS LANGUAGE changing naturally while a document is
being left behind. Evidently the document does not seem relevant to people or does not seem
important enough to update. It could safely be archived as history, but left active it could create
confusion and hurt the project. And if a document isn't playing an important role, keeping it up to
date through sheer will and discipline wastes effort.
The
UBIQUITOUS LANGUAGE allows other documents, such as requirements specifications, to
be more concise and less ambiguous. As the domain model comes to reflect the most relevant
knowledge of the business, application requirements become scenarios within that model, and the
UBIQUITOUS LANGUAGE can be used to describe such a scenario in terms that directly connect
to the
MODEL-DRIVEN DESIGN (see Chapter 3). As a result, specifications can be written more
simply, because they do not have to convey the business knowledge that lies behind the model.
By keeping documents minimal and focusing them on
complementing code and conversation,
documents can stay connected to the project. Let the
UBIQUITOUS LANGUAGE and its evolution
be your guide to choosing documents that live and get woven into the project's activity.
Executable Bedrock
Now let's examine the choice of the XP community and some others, to rely almost exclusively on
the executable code and its tests. Much of this book discusses ways to make the code convey
meaning through a
MODEL-DRIVEN DESIGN (see Chapter 3). Well-written code can be very communicative, but the message it communicates is not guaranteed to be accurate. Oh, the reality of
the
behavior caused by a section of code is inescapable. But a method name can be ambiguous,
misleading, or out of date compared to the internals of the method. The assertions in a test are
rigorous, but the story told by variable names and the organization of the code is not. Good programming style keeps this connection as direct as possible, but it is still an exercise in self-discipline.
It takes fastidiousness to write code that doesn't just
do the right thing but also
says the right thing.
Elimination of those discrepancies is a major selling point of approaches such as declarative design
(discussed in Chapter 10), in which a statement of the purpose of a program element determines
its actual behavior in the program. The drive to generate programs from UML is partly motivated by
this, though it generally hasn't worked out well so far.
Still, while even code can mislead, it is closer to the ground than other documents. Aligning the
behavior, intent, and message of code using current standard technology requires discipline and a
certain way of thinking about design (discussed at length in Part III). To communicate effectively,
the code must be based on the same language used to write the requirements—the same language
that the developers speak with each other and with domain experts.
Explanatory Models
The thrust of this book is that one model should underlie implementation, design, and team communication. Having separate models for these separate purposes poses a hazard.
Models can also be valuable as education aids to teach about the domain. The model that drives
the design is one view of the domain, but it may aid learning to have other views, used only as
educational tools, to communicate general knowledge of the domain. For this purpose, people can
use pictures or words that convey other kinds of models unrelated to software design.
One particular reason that other models are needed is scope. The technical model that drives the
software development process must be strictly pared down to the necessary minimum to fulfill its
functions. An explanatory model can include aspects of the domain that provide context that clarifies
the more narrowly scoped model.
Communication and the Use of Language 24

---

## Sección 9: Chapter 4, we'll look at the principle of

-- 22 of 324 --

Explanatory models offer the freedom to create much more communicative styles tailored to a particular topic. Visual metaphors used by the domain experts in a field often present clearer explanations, educating developers and harmonizing experts. Explanatory models also present the domain
in a way that is simply different, and multiple, diverse explanations help people learn.
There is no need for explanatory models to be object models, and it is generally best if they are not.
It is actually helpful to avoid UML in these models, to avoid any false impression of correspondence
with the software design. Even though the explanatory model and the model that drives design do
often correspond, the similarities will seldom be exact. To avoid confusion, everyone must be conscious of the distinction.
Example
Shipping Operations and Routes
Consider an application that tracks cargos for a shipping company. The model includes a detailed
view of how port operations and vessel voyages are assembled into an operational plan for a cargo
(a “route”). But to the uninitiated, a class diagram may not be very illuminating.
Figure 2.4. A class diagram for a shipping route
In such a case, an explanatory model can help team members understand what the class diagram
actually means. Here is another way of looking at the same concepts:
Each line in Figure 2.5 represents either a port operation (loading or unloading the cargo), or cargo
sitting in storage on the ground, or cargo sitting on a ship en route. This does not correspond in
detail with the class diagram, but it reinforces key points from the domain.
Communication and the Use of Language 25

-- 23 of 324 --

Figure 2.5. An explanatory model for a shipping route
This sort of diagram, along with natural language explanations of the model it represents, can help
developers and domain experts alike understand the more rigorous software model diagrams. Together they are easier to understand than either view alone.
Communication and the Use of Language 26

-- 24 of 324 --

Chapter Three. Binding Model and
Implementation
The first thing I saw as I walked through the door was a complete class diagram printed on large
sheets of paper that covered a large wall. It was my first day on a project in which smart people had
spent months carefully researching and developing a detailed model of the domain. The typical
object in the model had intricate associations with three or four other objects, and this web of associations had few natural borders. In this respect, the analysts had been true to the nature of the
domain.
As overwhelming as the wall-size diagram was, the model did capture some knowledge. After a
moderate amount of study, I learned quite a bit (though that learning was hard to direct—much like
randomly browsing the Web). I was more troubled to find that my study gave no insight into the
application's code and design.
When the developers had begun implementing the application, they had quickly discovered that the
tangle of associations, although navigable by a human analyst, didn't translate into storable, retrievable units that could be manipulated with transactional integrity. Mind you, this project was using
an object database, so the developers didn't even have to face the challenges of mapping objects
into relational tables. At a fundamental level, the model did not provide a guide to implementation.
Because the model was “correct,” the result of extensive collaboration between technical analysts
and business experts, the developers reached the conclusion that conceptually based objects could
not be the foundation of their design. So they proceeded to develop an ad hoc design. Their design
did use a few of the same class names and attributes for data storage, but it was not based on the
existing, or any, model.
The project had a domain model, but what good is a model on paper unless it directly aids the
development of running software?
A few years later, I saw the same end result come from a completely different process. This project
was to replace an existing C++ application with a new design implemented in Java. The old application had been hacked together without any regard for object modeling. The design of the old
application, if there was one, had accreted as one capability after another had been laid on top of
the existing code, without any noticeable generalization or abstraction.
The eerie thing was that the end products of the two processes were very similar! Both had functionality, but were bloated, very hard to understand, and eventually unmaintainable. Though the
implementations had, in places, a kind of directness, you couldn't gain much insight about the purpose of the system by reading the code. Neither process took any advantage of the object paradigm
available in their development environment, except as fancy data structures.
Models come in many varieties and serve many roles, even those restricted to the context of a
software development project. Domain-driven design calls for a model that doesn't just aid early
analysis but is the very foundation of the design. This approach has some important implications
for the code. What is less obvious is that domain-driven design requires a different approach to
modeling. . . .
-- 25 of 324 --

Model-Driven Design
The astrolabe, used to compute star positions, is a mechanical implementation of a model of the sky.
Tightly relating the code to an underlying model gives the code meaning and makes the model
relevant.
A Medieval Sky Computer
Ancient Greek astronomers devised the astrolabe, which was perfected by medieval Islamic scientists. A rotating web (called a
rete) represented the positions of the fixed stars on the celestial sphere. Interchangeable
plates engraved with a local spherical coordinate system represented the views from different latitudes. Rotating the rete against the plate enabled a calculation of celestial positions for any time and day of the year.
Conversely, given a stellar or solar position, the time could be calculated. The astrolabe was a mechanical
implementation of an object-oriented model of the sky.
Projects that have no domain model at all, but just write code to fulfill one function after another,
gain few of the advantages of knowledge crunching and communication discussed in the previous
two chapters. A complex domain will swamp them.
On the other hand, many complex projects do attempt some sort of domain model, but they don't
maintain a tight connection between the model and the code. The model they develop, possibly
useful as an exploratory tool at the outset, becomes increasingly irrelevant and even misleading.
All the care lavished on the model provides little reassurance that the design is correct, because
the two are different.
This connection can break down in many ways, but the detachment is often a conscious choice.
Many design methodologies advocate an
analysis model, quite distinct from the design and usually
developed by different people. It is called an analysis model because it is the product of analyzing
the business domain to organize its concepts without any consideration of the part it will play in a
software system. An analysis model is meant as a tool for understanding only; mixing in implementation concerns is thought to muddy the waters. Later, a design is created that may have only a
loose correspondence to the analysis model. The analysis model is not created with design issues
in mind, and therefore it is likely to be quite impractical for those needs.
Binding Model and Implementation 28

---

## Sección 10: Chapter 4, we'll look at the principle of

-- 26 of 324 --

Some knowledge crunching happens during such an analysis, but most of it is lost when coding
begins, when the developers are forced to come up with new abstractions for the design. Then there
is no guarantee that the insights gained by the analysts and embedded in the model will be retained
or rediscovered. At this point, maintaining any mapping between the design and the loosely connected model is not cost-effective.
The pure analysis model even falls short of its primary goal of understanding the domain, because
crucial discoveries always emerge during the design/implementation effort. Very specific, unanticipated problems always arise. An up-front model will go into depth about some irrelevant subjects,
while it overlooks some important subjects. Other subjects will be represented in ways that are not
useful to the application. The result is that pure analysis models get abandoned soon after coding
starts, and most of the ground has to be covered again. But the second time around, if the developers
perceive analysis to be a separate process, modeling happens in a less disciplined way. If the
managers perceive analysis to be a separate process, the development team may not be given
adequate access to domain experts.
Whatever the cause, software that lacks a concept at the foundation of its design is, at best, a
mechanism that does useful things without explaining its actions.
If the design, or some central part of it, does not map to the domain model, that model is of little
value, and the correctness of the software is suspect. At the same time, complex mappings between
models and design functions are difficult to understand and, in practice, impossible to maintain as
the design changes. A deadly divide opens between analysis and design so that insight gained in
each of those activities does not feed into the other.
An analysis must capture fundamental concepts from the domain in a comprehensible, expressive
way. The design has to specify a set of components that can be constructed with the programming
tools in use on the project that will perform efficiently in the target deployment environment and will
correctly solve the problems posed for the application.
M
ODEL-DRIVEN DESIGN discards the dichotomy of analysis model and design to search out a
single model that serves both purposes. Setting aside purely technical issues, each object in the
design plays a conceptual role described in the model. This requires us to be more demanding of
the chosen model, since it must fulfill two quite different objectives.
There are always many ways of abstracting a domain, and there are always many designs that can
solve an application problem. This is what makes it practical to bind the model and design. This
binding mustn't come at the cost of a weakened analysis, fatally compromised by technical considerations. Nor can we accept clumsy designs, reflecting domain ideas but eschewing software design
principles. This approach demands a model that works well as both analysis and design. When a
model doesn't seem to be practical for implementation, we must search for a new one. When a
model doesn't faithfully express the key concepts of the domain, we must search for a new one.
The modeling and design process then becomes a single iterative loop.
The imperative to relate the domain model closely to the design adds one more criterion for choosing
the more useful models out of the universe of possible models. It calls for hard thinking and usually
takes multiple iterations and a lot of refactoring, but it makes the model
relevant.
Therefore:
Design a portion of the software system to reflect the domain model in a very literal way, so that
mapping is obvious. Revisit the model and modify it to be implemented more naturally in software,
even as you seek to make it reflect deeper insight into the domain. Demand a single model that
serves both purposes well, in addition to supporting a robust UBIQUITOUS LANGUAGE.
Draw from the model the terminology used in the design and the basic assignment of responsibilities.
The code becomes an expression of the model, so a change to the code may be a change to the
model. Its effect must ripple through the rest of the project's activities accordingly.
Binding Model and Implementation 29

-- 27 of 324 --

To tie the implementation slavishly to a model usually requires software development tools and
languages that support a modeling paradigm, such as object-oriented programming.
Sometimes there will be different models for different subsystems (see Chapter 14), but only one
model should apply to a particular part of the system, throughout all aspects of the development
effort, from the code to requirements analysis.
The single model reduces the chances of error, because the design is now a direct outgrowth of the
carefully considered model. The design, and even the code itself, has the communicativeness of a
model.
Developing a single model that captures the problem and provides a practical design is easier said
than done. You can't just take any model and turn it into a workable design. The model has to be
carefully crafted to make for a practical implementation. Design and implementation techniques
have to be employed that allow code to express a model effectively (see Part II). Knowledge
crunchers explore model options and refine them into practical software elements. Development
becomes an iterative process of refining the model, the design, and the code as a single activity
(see Part III).
Modeling Paradigms and Tool Support
To make a
MODEL-DRIVEN DESIGN pay off, the correspondence must be literal, exact within
bounds of human error. To make such a close correspondence of model and design possible, it is
almost essential to work within a modeling paradigm supported by software tools that allow you to
create direct analogs to the concepts in the model.
Object-oriented programming is powerful because it is based on a modeling paradigm, and it provides implementations of the model constructs. As far as the programmer is concerned, objects
really exist in memory, they have associations with other objects, they are organized into classes,
and they provide behavior available by messaging. Although many developers benefit from just
applying the technical capabilities of objects to organize program code, the real breakthrough of
object design comes when the code expresses the concepts of a model. Java and many other tools
allow the creation of objects and relationships directly analogous to conceptual object models.
Although it has never reached the mass usage that object-oriented languages have, the Prolog
language is a natural fit for
MODEL-DRIVEN DESIGN. In this case, the paradigm is logic, and the
model is a set of logical rules and facts they operate on.
Binding Model and Implementation 30

---

## Sección 11: Chapter 4, we'll look at the principle of

-- 28 of 324 --

M
ODEL-DRIVEN DESIGN has limited applicability using languages such as C, because there is no
modeling paradigm that corresponds to a purely
procedural language. Those languages are procedural in the sense that the programmer tells the computer a series of steps to follow. Although
the programmer may be thinking about the concepts of the domain, the program itself is a series of
technical manipulations of data. The result may be useful, but the program doesn't capture much
of the meaning. Procedural languages often support complex data types that begin to correspond
to more natural conceptions of the domain, but these complex types are only organized data, and
they don't capture the active aspects of the domain. The result is that software written in procedural
languages has complicated functions linked together based on anticipated paths of execution, rather
than by conceptual connections in the domain model.
Before I ever heard of object-oriented programming, I wrote fortran programs to solve mathematical
models, which is just the sort of domain in which fortran excels. Mathematical functions are the main
conceptual component of such a model and can be cleanly expressed in fortran. Even so, there is
no way to capture higher level meaning beyond the functions. Most non-mathematical domains don't
lend themselves to
MODEL-DRIVEN DESIGN in procedural languages because the domains are
not conceptualized as math functions or as steps in a procedure.
Object-oriented design, the paradigm that currently dominates the majority of ambitious projects, is
the approach used primarily in this book.
Example
From Procedural to MODEL-DRIVEN
As discussed in Chapter 1, a printed circuit board (PCB) can be viewed as a collection of electrical
conductors (called
nets) connecting the pins of various components. There are often tens of thousands of nets. Special software, called a PCB layout tool, finds a physical arrangement for all the
nets so that they don't cross or interfere with each other. It does this by optimizing their paths while
satisfying an enormous number of constraints placed by the human designers that restrict the way
they can be laid out. Although PCB layout tools are very sophisticated, they still have some shortcomings.
One problem is that each of these thousands of nets has its own set of layout rules. PCB engineers
see many nets as belonging to natural groupings that should share the same rules. For example,
some nets form
buses.
Figure 3.2. An explanatory diagram of buses and nets
Binding Model and Implementation 31

-- 29 of 324 --

By lumping nets into a bus, perhaps 8 or 16 or 256 at a time, the engineer cuts the job down to a
more manageable size, improving productivity and reducing errors. The trouble is, the layout tool
has no such concept as a bus. Rules have to be assigned to tens of thousands of nets, one net at
a time.
A Mechanistic Design
Desperate engineers worked around this limitation in the layout tool by writing scripts that parse the
layout tool's data files and insert rules directly into the file, applying them to an entire bus at a time.
The layout tool stores each circuit connection in a
net list file, which looks something like this:
Net Name Component.Pin
-------- -------------
Xyz0 A.0, B.0
Xyz1 A.1, B.1
Xyz2 A.2, B.2
. . .
It stores the layout rules in a file format something like this:
Net Name Rule Type Parameters
-------- --------- ----------
Xyz1 min_linewidth 5
Xyz1 max_delay 15
Xyz2 min_linewidth 5
Xyz2 max_delay 15
. . .
The engineers carefully use a naming convention for the nets so that an alphabetical sort of the data
file will place the nets of a bus together in a sorted file. Then their script can parse the file and modify
each net based on its bus. Actual code to parse, manipulate, and write the files is just too verbose
and opaque to serve this example, so I'll just list the steps in the procedure.
1. Sort net list file by net name.
2. Read each line in file, seeking first one that starts with bus name pattern.
3. For each line with matching name, parse line to get net name.
4. Append net name with rule text to rules file.
5. Repeat from 3 until left of line no longer matches bus name.
So the input of a bus rule such as this:
Bus Name Rule Type Parameters
-------- --------- ----------
Xyz max_vias 3
would result in adding net rules to the file like these:
Net Name Rule Type Parameters
-------- --------- ----------
. . .
Xyz0 max_vias 3
Xyz1 max_vias 3
Xyz2 max_vias 3
. . .
I imagine that the person who first wrote such a script had only this simple need, and if this were
the only requirement, a script like this would make a lot of sense. But in practice, there are now
dozens of scripts. They could, of course, be refactored to share sorting and string matching functions, and if the language supported function calls to encapsulate the details, the scripts could begin
Binding Model and Implementation 32

-- 30 of 324 --

to read almost like the summary steps above. But still, they are just file manipulations. A different
file format (and there are several) would require starting from scratch, even though the concept of
grouping buses and applying rules to them is the same. If you wanted richer functionality or interactivity, you would have to pay for every inch.
What the script writers were trying to do was to supplement the tool's domain model with the concept
of “bus.” Their implementation infers the bus's existence through sorts and string matches, but it
does not explicitly deal with the concept.
A Model-Driven Design
The preceding discussion has already described the concepts the domain experts use to think about
their problems. Now we need to organize those concepts explicitly into a model we can base software on.
Figure 3.3. A class diagram oriented toward efficient assignment of layout rules
With these objects implemented in an object-oriented language, the core functionality becomes
almost trivial.
The assignRule() method can be implemented on Abstract Net. The assignedRules()
method on Net takes its own rules and its Bus's rules.
abstract class AbstractNet {
private Set rules;
void assignRule(LayoutRule rule) {
rules.add(rule);
}
Set assignedRules() {
return rules;
}
}
class Net extends AbstractNet {
private Bus bus;
Set assignedRules() {
Set result = new HashSet();
result.addAll(super.assignedRules());
result.addAll(bus.assignedRules());
return result;
}
}
Binding Model and Implementation 33

---

## Sección 12: Chapter 4, we'll look at the principle of

-- 31 of 324 --

Of course, there would be a great deal of supporting code, but this covers the basic functionality of
the script.
The application requires import/export logic, which we'll encapsulate into some simple services.
Service Responsibility
Net List import Reads Net List file, creates instance of Net for each entry
Net Rule export Given a collection of Nets, writes all attached rules into the Rules File
We'll also need a few utilities:
Class Responsibility
Net Repository Provides access to Nets by name
Inferred Bus Factory Given a collection of Nets, uses naming conventions to infer Buses, creates instances
Bus Repository Provides access to Buses by name
Now, starting the application is a matter of initializing the repositories with imported data:
Collection nets = NetListImportService.read(aFile);
NetRepository.addAll(nets);
Collection buses = InferredBusFactory.groupIntoBuses(nets);
BusRepository.addAll(buses);
Each of the services and repositories can be unit-tested. Even more important, the core domain
logic can be tested. Here is a unit test of the most central behavior (using the JUnit test framework):
public void testBusRuleAssignment() {
Net a0 = new Net("a0");
Net a1 = new Net("a1");
Bus a = new Bus("a"); //Bus is not conceptually dependent
a.addNet(a0); //on name-based recognition, and so
a.addNet(a1); //its tests should not be either.
NetRule minWidth4 = NetRule.create(MIN_WIDTH, 4);
a.assignRule(minWidth4);
assertTrue(a0.assignedRules().contains(minWidth4));
assertEquals(minWidth4, a0.getRule(MIN_WIDTH));
assertEquals(minWidth4, a1.getRule(MIN_WIDTH));
}
An interactive user interface could present a list of buses, allowing the user to assign rules to each,
or it could read from a file of rules for backward compatibility. A façade makes access simple for
either interface. Its implementation echoes the test:
public void assignBusRule(String busName, String ruleType,
double parameter){
Bus bus = BusRepository.getByName(busName);
bus.assignRule(NetRule.create(ruleType, parameter));
}
Finishing:
NetRuleExport.write(aFileName, NetRepository.allNets());
(The service asks each Net for assignedRules(), and then writes them fully expanded.)
Of course, if there were only one operation (as in the example), the script-based approach might
be just as practical. But in reality, there were 20 or more. The
MODEL-DRIVEN DESIGN scales
easily and can include constraints on combining rules and other enhancements.
Binding Model and Implementation 34

-- 32 of 324 --

The second design also accommodates testing. Its components have well-defined interfaces that
can be unit-tested. The only way to test the script is to do an end-to-end file-in/file-out comparison.
Keep in mind that such a design does not emerge in a single step. It would take several iterations
of refactoring and knowledge crunching to distill the important concepts of the domain into a simple,
incisive model.
Letting the Bones Show: Why Models Matter to Users
In theory, perhaps, you could present a user with any view of a system, regardless of what lies
beneath. But in practice, a mismatch causes confusion at best—bugs at worst. Consider a very
simple example of how users are misled by superimposed models of bookmarks for Web sites in
current releases of Microsoft Internet Explorer.1
A user of Internet Explorer thinks of “Favorites” as a list of names of Web sites that persist from
session to session. But the implementation treats a Favorite as a file containing a URL, and whose
filename is put in the Favorites list. That's a problem if the Web page title contains characters that
are illegal in Windows filenames. Suppose a user tries to store a Favorite and types the following
name for it: “Laziness: The Secret to Happiness”. An error message will say: “A filename cannot
contain any of the following characters: \/ : * ? " < > |”. What filename? On the other hand, if the Web
page title already contains an illegal character, Internet Explorer will just quietly strip it out. The loss
of data may be benign in this case, but not what the user would have expected. Quietly changing
data is completely unacceptable in most applications.
M
ODEL-DRIVEN DESIGN calls for working with only one model (within any single context, as will
be discussed in Chapter 14). Most of the advice and examples go to the problems of having separate
analysis models and design models, but here we have a problem arising from a different pair of
models: the user model and the design/implementation model.
Of course, an unadorned view of the domain model would definitely not be convenient for the user
in most cases. But trying to create in the UI an illusion of a model other than the domain model will
cause confusion unless the illusion is perfect. If Web Favorites are actually just a collection of shortcut files, then expose this fact to the user and eliminate the confusing alternative model. Not only
will the feature be less confusing, but the user can then leverage what he knows about the file system
to deal with Web Favorites. He can reorganize them with the File Explorer, for example, rather than
use awkward tools built into the Web browser. Informed users would be more able to exploit the
flexibility of storing Web shortcuts anywhere in the file system. Just by removing the misleading
extra model, the power of the application would increase and become clearer. Why make the user
learn a new model when the programmers felt the old model was good enough?
Alternatively, store the Favorites in a different way, say in a data file, so that they can be subject to
their own rules. Those rules would presumably be the naming rules that apply to Web pages. That
would again provide a single model. This one tells the user that everything he knows about naming
Web sites applies to Favorites.
When a design is based on a model that reflects the basic concerns of the users and domain experts,
the bones of the design can be revealed to the user to a greater extent than with other design
approaches. Revealing the model gives the user more access to the potential of the software and
yields consistent, predictable behavior.
1Brian Marick mentioned this example to me.
Binding Model and Implementation 35

---

## Sección 13: Chapter 4, we'll look at the principle of

-- 33 of 324 --

Hands-On Modelers
Manufacturing is a popular metaphor for software development. One inference from this metaphor:
highly skilled engineers design; less skilled laborers assemble the products. This metaphor has
messed up a lot of projects for one simple reason—software development is
all design. All teams
have specialized roles for members, but overseparation of responsibility for analysis, modeling,
design, and programming interferes with
MODEL-DRIVEN DESIGN.
On one project, my job was to coordinate different application teams and help develop the domain
model that would drive the design. But the management thought that modelers should be modeling,
and that coding was a waste of those skills, so I was in effect forbidden to program or work on details
with programmers.
Things seemed to be OK for a while. Working with domain experts and the development leads of
the different teams, we crunched knowledge and refined a nice core model. But that model was
never put to work, for two reasons.
First, some of the model's intent was lost in the handoff. The overall effect of a model can be very
sensitive to details (as will be discussed in Parts II and III), and those details don't always come
across in a UML diagram or a general discussion. If I could have rolled up my sleeves and worked
with the other developers directly, providing some code to follow as examples, and providing some
close support, the team could have taken up the abstractions of the model and run with them.
The other problem was the indirectness of feedback from the interaction of the model with the implementation and the technology. For example, certain aspects of the model turned out to be wildly
in-efficient on our technology platform, but the full implications didn't trickle back to me for months.
Relatively minor changes could have fixed the problem, but by then it didn't matter. The developers
were well on their way to writing software that did work—without the model, which had been reduced
to a mere data structure, wherever it was still used at all. The developers had thrown the baby out
with the bathwater, but what choice did they have? They could no longer risk being saddled with
the dictates of the architect in the ivory tower.
The initial circumstances of this project were about as favorable to a hands-off modeler as they ever
are. I already had extensive hands-on experience with most of the technology used on the project.
I had even led a small development team on the same project before my role changed, so I was
familiar with the project's development process and programming environment. Even those factors
were not enough to make me effective, given the separation of modeler from implementation.
If the people who write the code do not feel responsible for the model, or don't understand how to
make the model work for an application, then the model has nothing to do with the software. If
developers don't realize that changing code changes the model, then their refactoring will weaken
the model rather than strengthen it. Meanwhile, when a modeler is separated from the implementation process, he or she never acquires, or quickly loses, a feel for the constraints of implementation. The basic constraint of MODEL-DRIVEN DESIGN—that the model supports an effective implementation and abstracts key domain knowledge—is half-gone, and the resulting models will be
impractical. Finally, the knowledge and skills of experienced designers won't be transferred to other
developers if the division of labor prevents the kind of collaboration that conveys the subtleties of
coding a MODEL-DRIVEN DESIGN.
The need for
HANDS-ON MODELERS does not mean that team members cannot have specialized
roles. Every Agile process, including Extreme Programming, defines roles for team members, and
other informal specializations tend to emerge naturally. The problem arises from separating two
tasks that are coupled in a
MODEL-DRIVEN DESIGN, modeling and implementation.
Binding Model and Implementation 36

-- 34 of 324 --

The effectiveness of an overall design is very sensitive to the quality and consistency of fine-grained
design and implementation decisions. With a
MODEL-DRIVEN DESIGN, a portion of the code is
an expression of the model; changing that code changes the model. Programmers are modelers,
whether anyone likes it or not. So it is better to set up the project so that the programmers do good
modeling work.
Therefore:
Any technical person contributing to the model must spend some time touching the code, whatever
primary role he or she plays on the project. Anyone responsible for changing code must learn to
express a model through the code. Every developer must be involved in some level of discussion
about the model and have contact with domain experts. Those who contribute in different ways must
consciously engage those who touch the code in a dynamic exchange of model ideas through the
UBIQUITOUS LANGUAGE.
The sharp separation of modeling and programming doesn't work, yet large projects still need technical leaders who coordinate high-level design and modeling and help work out the most difficult or
most critical decisions. Part IV, “Strategic Design,” deals with such decisions and should stimulate
ideas for more productive ways to define the roles and responsibilities of high-level technical people.
Domain-driven design puts a model to work to solve problems for an application. Through knowledge
crunching, a team distills a torrent of chaotic information into a practical model. A
MODEL-DRIVEN
DESIGN intimately connects the model and the implementation. The
UBIQUITOUS LANGUAGE is
the channel for all that information to flow between developers, domain experts, and the software.
The result is software that provides rich functionality based on a fundamental understanding of the
core domain.
As mentioned, success with
MODEL-DRIVEN DESIGN is sensitive to detailed design decisions,
which is the subject of the next several chapters.
Binding Model and Implementation 37

---

## Sección 14: Chapter 4, we'll look at the principle of

-- 35 of 324 --

Chapter Four. Isolating the Domain
The part of the software that specifically solves problems from the domain usually constitutes only
a small portion of the entire software system, although its importance is disproportionate to its size.
To apply our best thinking, we need to be able to look at the elements of our model and see them
as a system. We must not be forced to pick them out of a much larger mix of objects, like trying to
identify constellations in the night sky. We need to decouple the domain objects from other functions
of the system, so we can avoid confusing the domain concepts with other concepts related only to
software technology or losing sight of the domain altogether in the mass of the system.
Sophisticated techniques for this isolation have emerged. This is well-trodden ground, but it is so
critical to the successful application of domain-modeling principles that it must be reviewed briefly,
from a domain-driven point of view. . . .
Layered Architecture
-- 36 of 324 --

For a shipping application to support the simple user act of selecting a cargo's destination from a
list of cities, there must be program code that (1) draws a widget on the screen, (2) queries the
database for all the possible cities, (3) interprets the user's input and validates it, (4) associates the
selected city with the cargo, and (5) commits the change to the database. All of this code is part of
the same program, but only a little of it is related to the business of shipping.
Software programs involve design and code to carry out many different kinds of tasks. They accept
user input, carry out business logic, access databases, communicate over networks, display information to users, and so on. So the code involved in each program function can be substantial.
In an object-oriented program, UI, database, and other support code often gets written directly into
the business objects. Additional business logic is embedded in the behavior of UI widgets and database scripts. This happens because it is the easiest way to make things work, in the short run.
When the domain-related code is diffused through such a large amount of other code, it becomes
extremely difficult to see and to reason about. Superficial changes to the UI can actually change
business logic. To change a business rule may require meticulous tracing of UI code, database
code, or other program elements. Implementing coherent, model-driven objects becomes impractical. Automated testing is awkward. With all the technologies and logic involved in each activity, a
program must be kept very simple or it becomes impossible to understand.
Creating programs that can handle very complex tasks calls for separation of concerns, allowing
concentration on different parts of the design in isolation. At the same time, the intricate interactions
within the system must be maintained in spite of the separation.
There are all sorts of ways a software system might be divided, but through experience and convention, the industry has converged on
LAYERED ARCHITECTURES, and specifically a few fairly
standard layers. The metaphor of layering is so widely used that it feels intuitive to most developers.
Many good discussions of layering are available in the literature, sometimes in the format of a pattern
(as in Buschmann et al. 1996, pp. 31–51). The essential principle is that any element of a layer
depends only on other elements in the same layer or on elements of the layers “beneath” it. Communication upward must pass through some indirect mechanism, which I'll discuss a little later.
The value of layers is that each specializes in a particular aspect of a computer program. This
specialization allows more cohesive designs of each aspect, and it makes these designs much
easier to interpret. Of course, it is vital to choose layers that isolate the most important cohesive
design aspects. Again, experience and convention have led to some convergence. Although there
are many variations, most successful architectures use some version of these four conceptual layers:
User Interface
(or Presentation Layer)
Responsible for showing information to the user and interpreting the user's commands. The external actor might
sometimes be another computer system rather than a human user.
Application
Layer
Defines the jobs the software is supposed to do and directs the expressive domain objects to work out problems.
The tasks this layer is responsible for are meaningful to the business or necessary for interaction with the application
layers of other systems.
This layer is kept thin. It does not contain business rules or knowledge, but only coordinates tasks and delegates
work to collaborations of domain objects in the next layer down. It does not have state reflecting the business
situation, but it can have state that reflects the progress of a task for the user or the program.
Domain
Layer (or
Model Layer)
Responsible for representing concepts of the business, information about the business situation, and business rules.
State that reflects the business situation is controlled and used here, even though the technical details of storing it
are delegated to the infrastructure. This layer is the heart of business software.
Infrastructure Layer
Provides generic technical capabilities that support the higher layers: message sending for the application, persistence for the domain, drawing widgets for the UI, and so on. The infrastructure layer may also support the
pattern of interactions between the four layers through an architectural framework.
Isolating the Domain 41

-- 37 of 324 --

Some projects don't make a sharp distinction between the user interface and application layers.
Others have multiple infrastructure layers. But it is the crucial separation of the
domain layer that
enables
MODEL-DRIVEN DESIGN.
Therefore:
Partition a complex program into layers. Develop a design within each layer that is cohesive and
that depends only on the layers below. Follow standard architectural patterns to provide loose coupling to the layers above. Concentrate all the code related to the domain model in one layer and
isolate it from the user interface, application, and infrastructure code. The domain objects, free of
the responsibility of displaying themselves, storing themselves, managing application tasks, and so
forth, can be focused on expressing the domain model. This allows a model to evolve to be rich
enough and clear enough to capture essential business knowledge and put it to work.
Separating the domain layer from the infrastructure and user interface layers allows a much cleaner
design of each layer. Isolated layers are much less expensive to maintain, because they tend to
evolve at different rates and respond to different needs. The separation also helps with deployment
in a distributed system, by allowing different layers to be placed flexibly in different servers or clients,
in order to minimize communication overhead and improve performance (Fowler 1996).
Example
Partitioning Online Banking Functionality into Layers
An application provides various capabilities for maintaining bank accounts. One feature is funds
transfer, in which the user enters or chooses two account numbers and an amount of money and
then initiates a transfer.
To make this example manageable, I've omitted major technical features, most notably security.
The domain design is also oversimplified. (Realistic complexity would only increase the need for
layered architecture.) Furthermore, the particular infrastructure implied here is meant to be simple
and obvious to make the example clear—it is not a suggested design. The responsibilities of the
remaining functionality would be layered as shown in Figure 4.1.
Figure 4.1. Objects carry out responsibilities consistent with their layer and are more coupled to other objects in their layer.
Isolating the Domain 42

---

## Sección 15: Chapter 4, we'll look at the principle of

-- 38 of 324 --

Note that the domain layer,
not the application layer, is responsible for fundamental business rules
—in this case, the rule is “Every credit has a matching debit.”
The application also makes no assumptions about the source of the transfer request. The program
presumably includes a UI with entry fields for account numbers and amounts and with buttons for
commands. But that user interface could be replaced by a wire request in XML without affecting the
application layer or any of the lower layers. This decoupling is important not because projects frequently need to replace user interfaces with wire requests but because a clean separation of concerns keeps the design of each layer easy to understand and maintain.
In fact, Figure 4.1 itself mildly illustrates the problem of not isolating the domain. Because everything
from the request to transaction control had to be included, the domain layer had to be dumbed down
to keep the overall interaction simple enough to follow. If we were focused on the design of the
isolated domain layer, we would have space on the page and in our heads for a model that better
represented the domain's rules, perhaps including ledgers, credit and debit objects, or monetary
transaction objects.
Relating the Layers
So far the discussion has focused on the separation of layers and the way in which that partitioning
improves the design of each aspect of the program, particularly the domain layer. But of course, the
layers have to be connected. To do this without losing the benefit of the separation is the motivation
behind a number of patterns.
Layers are meant to be loosely coupled, with design dependencies in only one direction. Upper
layers can use or manipulate elements of lower ones straightforwardly by calling their public interfaces, holding references to them (at least temporarily), and generally using conventional means of
interaction. But when an object of a lower level needs to communicate upward (beyond answering
a direct query), we need another mechanism, drawing on architectural patterns for relating layers
such as callbacks or
OBSERVERS (Gamma et al. 1995).
The grandfather of patterns for connecting the UI to the application and domain layers is
MODELVIEW-CONTROLLER (MVC). It was pioneered in the Smalltalk world back in the 1970s and has
inspired many of the UI architectures that followed. Fowler (2002) discusses this pattern and several
useful variations on the theme. Larman (1998) explores these concerns in the
MODEL-VIEW SEPARATION PATTERN, and his
APPLICATION COORDINATOR is one approach to connecting the
application layer.
There are other styles of connecting the UI and the application. For our purposes, all approaches
are fine as long as they maintain the isolation of the domain layer, allowing domain objects to be
designed without simultaneously thinking about the user interface that might interact with them.
The infrastructure layer usually does not initiate action in the domain layer. Being “below” the domain
layer, it should have no specific knowledge of the domain it is serving. Indeed, such technical capabilities are most often offered as
SERVICES. For example, if an application needs to send an email, some message-sending interface can be located in the infrastructure layer and the application
layer elements can request the transmission of the message. This decoupling gives some extra
versatility. The message-sending interface might be connected to an e-mail sender, a fax sender,
or whatever else is available. But the main benefit is simplifying the application layer, keeping it
narrowly focused on its job: knowing
when to send a message, but not burdened with
how.
The application and domain layers call on the
SERVICES provided by the infrastructure layer. When
the scope of a
SERVICE has been well chosen and its interface well designed, the caller can remain
loosely coupled and uncomplicated by the elaborate behavior the
SERVICE interface encapsulates.
Isolating the Domain 43

-- 39 of 324 --

But not all infrastructure comes in the form of
SERVICES callable from the higher layers. Some
technical components are designed to directly support the basic functions of other layers (such as
providing an abstract base class for all domain objects) and provide the mechanisms for them to
relate (such as implementations of MVC and the like). Such an “architectural framework” has much
more impact on the design of the other parts of the program.
Architectural Frameworks
When infrastructure is provided in the form of
SERVICES called on through interfaces, it is fairly
intuitive how the layering works and how to keep the layers loosely coupled. But some technical
problems call for more intrusive forms of infrastructure. Frameworks that integrate many infrastructure needs often require the other layers to be implemented in very particular ways, for example as
a subclass of a framework class or with structured method signatures. (It may seem counterintuitive
for a subclass to be in a layer higher than that of the parent class, but keep in mind which class
reflects more knowledge of the other.) The best architectural frameworks solve complex technical
problems while allowing the domain developer to concentrate on expressing a model. But frameworks can easily get in the way, either by making too many assumptions that constrain domain
design choices or by making the implementation so heavyweight that development slows down.
Some form of architectural framework usually is needed (though sometimes teams choose frameworks that don't serve them well). When applying a framework, the team needs to focus on its goal:
building an implementation that expresses a domain model and uses it to solve important problems.
The team must seek ways of employing the framework to those ends, even if it means not using all
of the framework's features. For example, early J2EE applications often implemented all domain
objects as “entity beans.” This approach bogged down both performance and the pace of development. Instead, current best practice is to use the J2EE framework for larger grain objects, implementing most business logic with generic Java objects. A lot of the downside of frameworks can be
avoided by applying them selectively to solve difficult problems without looking for a one-size-fitsall solution. Judiciously applying only the most valuable of framework features reduces the coupling
of the implementation and the framework, allowing more flexibility in later design decisions. More
important, given how very complicated many of the current frameworks are to use, this minimalism
helps keep the business objects readable and expressive.
Architectural frameworks and other tools will continue to evolve. Newer frameworks will automate
or prefabricate more and more of the technical aspects of an application. If this is done right, application developers will increasingly concentrate their time on modeling the core business problems,
greatly improving productivity and quality. But as we move in this direction, we must guard against
our enthusiasm for technical solutions; elaborate frameworks can also straitjacket application developers.
The Domain Layer Is Where the Model Lives
L
AYERED ARCHITECTURE is used in most systems today, under various layering schemes. Many
styles of development can also benefit from layering. However, domain-driven design requires only
one particular layer to exist.
The domain model is a set of concepts. The “domain layer” is the manifestation of that model and
all directly related design elements. The design and implementation of business logic constitute the
domain layer. In a
MODEL-DRIVEN DESIGN, the software constructs of the domain layer mirror
the model concepts.
It is not practical to achieve that correspondence when the domain logic is mixed with other concerns
of the program. Isolating the domain implementation is a prerequisite for domain-driven design.
Isolating the Domain 44

---

## Sección 16: Chapter 4, we'll look at the principle of

-- 40 of 324 --

The Smart UI “Anti-Pattern”
. . . That sums up the widely accepted
LAYERED ARCHITECTURE pattern for object applications.
But this separation of UI, application, and domain is so often attempted and so seldom accomplished
that its negation deserves a discussion in its own right.
Many software projects do take and should continue to take a much less sophisticated design approach that I call the
SMART UI. But
SMART UI is an alternate, mutually exclusive fork in the road,
incompatible with the approach of domain-driven design. If that road is taken, most of what is in this
book is not applicable. My interest is in the situations where the
SMART UI does not apply, which
is why I call it, with tongue in cheek, an “anti-pattern.” Discussing it here provides a useful contrast
and will help clarify the circumstances that justify the more difficult path taken in the rest of the book.
A project needs to deliver simple functionality, dominated by data entry and display, with few business rules. Staff is not composed of advanced object modelers.
If an unsophisticated team with a simple project decides to try a MODEL-DRIVEN DESIGN with
LAYERED ARCHITECTURE, it will face a difficult learning curve. Team members will have to master
complex new technologies and stumble through the process of learning object modeling (which is
challenging, even with the help of this book!). The overhead of managing infrastructure and layers
makes very simple tasks take longer. Simple projects come with short time lines and modest expectations. Long before the team completes the assigned task, much less demonstrates the exciting
possibilities of its approach, the project will have been canceled.
Even if the team is given more time, the team members are likely to fail to master the techniques
without expert help. And in the end, if they do surmount these challenges, they will have produced
a simple system. Rich capabilities were never requested.
A more experienced team would not face the same trade-offs. Seasoned developers could flatten
the learning curve and compress the time needed to manage the layers. Domain-driven design pays
off best for ambitious projects, and it does require strong skills. Not all projects are ambitious. Not
all project teams can muster those skills.
Therefore, when circumstances warrant:
Put all the business logic into the user interface. Chop the application into small functions and implement them as separate user interfaces, embedding the business rules into them. Use a relational
database as a shared repository of the data. Use the most automated UI building and visual programming tools available.
Heresy! The gospel (as advocated everywhere, including else-where in this book) is that domain
and UI should be separate. In fact, it is difficult to apply any of the methods discussed later in this
book without that separation, and so this
SMART UI can be considered an “anti-pattern” in the
context of domain-driven design. Yet it is a legitimate pattern in some other contexts. In truth, there
are advantages to the
SMART UI, and there are situations where it works best—which partially
accounts for why it is so common. Considering it here helps us understand why we need to separate
application from domain and, importantly, when we might not want to.
Advantages
• Productivity is high and immediate for simple applications.
• Less capable developers can work this way with little training.
• Even deficiencies in requirements analysis can be overcome by releasing a prototype to users
and then quickly changing the product to fit their requests.
Isolating the Domain 45

-- 41 of 324 --

• Applications are decoupled from each other, so that delivery schedules of small modules can
be planned relatively accurately. Expanding the system with additional, simple behavior can be
easy.
• Relational databases work well and provide integration at the data level.
• 4GL tools work well.
• When applications are handed off, maintenance programmers will be able to quickly redo portions they can't figure out, because the effects of the changes should be localized to each particular UI.
Disadvantages
• Integration of applications is difficult except through the database.
• There is no reuse of behavior and no abstraction of the business problem. Business rules have
to be duplicated in each operation to which they apply.
• Rapid prototyping and iteration reach a natural limit because the lack of abstraction limits refactoring options.
• Complexity buries you quickly, so the growth path is strictly toward additional simple applications. There is no graceful path to richer behavior.
If this pattern is applied consciously, a team can avoid taking on a great deal of overhead required
by other approaches. It is a common mistake to undertake a sophisticated design approach that the
team isn't committed to carrying all the way through. Another common, costly mistake is to build a
complex infrastructure and use industrial-strength tools for a project that doesn't need them.
Most flexible languages (such as Java) are overkill for these applications and will cost dearly. A
4GL-style tool is the way to go.
Remember, one of the consequences of this pattern is that you can't migrate to another design
approach except by replacing entire applications. Just using a general-purpose language such as
Java won't really put you in a position to later abandon the
SMART UI, so if you've chosen that path,
you should choose development tools geared to it. Don't bother hedging your bet. Just using a
flexible language doesn't create a flexible system, but it may well produce an expensive one.
By the same token, a team committed to a
MODEL-DRIVEN DESIGN needs to design that way
from the outset. Of course, even experienced project teams with big ambitions have to start with
simple functionality and work their way up through successive iterations. But those first tentative
steps will be
MODEL-DRIVEN with an isolated domain layer, or the project will most likely be stuck
with a
SMART UI. The
SMART UI is discussed only to clarify why and when a pattern such as
LAYERED ARCHITECTURE is needed in order to isolate a domain layer.
There are other solutions in between
SMART UI and
LAYERED ARCHITECTURE. For example,
Fowler (2002) describes the
TRANSACTION SCRIPT, which separates UI from application but does
not provide for an object model. The bottom line is this:
If the architecture isolates the domain-related
code in a way that allows a cohesive domain design loosely coupled to the rest of the system, then
that architecture can probably support domain-driven design.
Other development styles have their place, but you must accept varying limits on complexity and
flexibility. Failing to decouple the domain design can really be disastrous in certain settings. If you
have a complex application and are committing to
MODEL-DRIVEN DESIGN, bite the bullet, get
the necessary experts, and
avoid the
SMART UI.
Isolating the Domain 46

---

## Sección 17: Chapter 4, we'll look at the principle of

-- 42 of 324 --

Other Kinds of Isolation
Unfortunately, there are influences other than infrastructure and user interfaces that can corrupt
your delicate domain model. You must deal with other domain components that are not fully integrated into your model. You have to cope with other development teams who use different models
of the same domain. These and other factors can blur your model and rob it of its utility. Chapter
14, “Maintaining Model Integrity,” deals with this topic, introducing such patterns as
BOUNDED
CONTEXT and
ANTICORRUPTION LAYER. A really complicated domain model can become unwieldy all by itself. Chapter 15, “Distillation,” discusses how to make distinctions within the domain
layer that can unencumber the essential concepts of the domain from peripheral detail.
But all that comes later. Next, we'll look at the nuts and bolts of co-evolving an effective domain
model and an expressive implementation. After all, the best part of isolating the domain is getting
all that other stuff out of the way so that we can really focus on the domain design.
Isolating the Domain 47

-- 43 of 324 --

Chapter Five. A Model Expressed in Software
To compromise in implementation without losing the punch of a
MODEL-DRIVEN DESIGN requires
a reframing of the basics. Connecting model and implementation has to be done at the detail level.
This chapter focuses on those individual model elements, getting them in shape to support the
activities in later chapters.
This discussion will start with the issues of designing and streamlining associations. Associations
between objects are simple to conceive and to draw, but implementing them is a potential quagmire.
Associations illustrate how crucial detailed implementation decisions are to the viability of a
MODELDRIVEN DESIGN.
Turning to the objects themselves, but continuing to scrutinize the relationship between detailed
model choices and implementation concerns, we'll focus on making distinctions among the three
patterns of model elements that express the model:
ENTITIES,
VALUE OBJECTS, and
SERVICES.
Defining objects that capture concepts of the domain seems very intuitive on the surface, but serious
challenges are lurking in the shades of meaning. Certain distinctions have emerged that clarify the
meaning of model elements and tie into a body of design practices for carving out specific kinds of
objects.
Does an object represent something with continuity and identity—something that is tracked through
different states or even across different implementations? Or is it an attribute that describes the
state of something else? This is the basic distinction between an
ENTITY and a
VALUE OBJECT.
Defining objects that clearly follow one pattern or the other makes the objects less ambiguous and
lays out the path toward specific choices for robust design.
Then there are those aspects of the domain that are more clearly expressed as actions or operations, rather than as objects. Although it is a slight departure from object-oriented modeling tradition,
it is often best to express these as
SERVICES, rather than forcing responsibility for an operation
onto some
ENTITY or
VALUE OBJECT. A
SERVICE is something that is done for a client on request.
In the technical layers of the software, there are many
SERVICES. They emerge in the domain also,
when some activity is modeled that corresponds to something the software must do, but does not
correspond with state.
There are inevitable situations in which the purity of the object model must be compromised, such
as for storage in a relational database. This chapter will lay out some guidelines for staying on course
when you are forced to deal with these messy realities.
Finally, a discussion of
MODULES will drive home the point that every design decision should be
motivated by some insight into the domain. The ideas of high cohesion and low coupling, often
thought of as technical metrics, can be applied to the concepts themselves. In a
MODEL-DRIVEN
DESIGN,
MODULES are part of the model, and they should reflect concepts in the domain.
-- 44 of 324 --

This chapter brings together all of these building blocks, which embody the model in software. These
ideas are conventional, and the modeling and design biases that follow from them have been written
about before. But framing them in this context will help developers create detailed components that
will serve the priorities of domaindriven design when tackling the larger model and design issues.
Also, a sense of the basic principles will help developers stay on course through the inevitable
compromises.
Associations
The interaction between modeling and implementation is particularly tricky with the associations
between objects.
For every traversable association in the model, there is a mechanism in the software with the same
properties.
A model that shows an association between a customer and a sales representative corresponds to
two things. On one hand, it abstracts a relationship developers deemed relevant between two real
people. On the other hand, it corresponds to an object pointer between two Java objects, or an
encapsulation of a database lookup, or some comparable implementation.
For example, a one-to-many association might be implemented as a collection in an instance variable. But the design is not necessarily so direct. There may be no collection; an accessor method
may query a database to find the appropriate records and instantiate objects based on them. Both
of these designs would reflect the same model. The design has to specify a particular traversal
mechanism whose behavior is consistent with the association in the model.
In real life, there are lots of many-to-many associations, and a great number are naturally bidirectional. The same tends to be true of early forms of a model as we brainstorm and explore the domain.
But these general associations complicate implementation and maintenance. Furthermore, they
communicate very little about the nature of the relationship.
There are at least three ways of making associations more tractable.
1. Imposing a traversal direction
2. Adding a qualifier, effectively reducing multiplicity
3. Eliminating nonessential associations
It is important to constrain relationships as much as possible. A bidirectional association means that
both objects can be understood only together. When application requirements do not call for traversal in both directions, adding a traversal direction reduces interdependence and simplifies the
design. Understanding the domain may reveal a natural directional bias.
The United States has had many presidents, as have many other countries. This is a bidirectional,
one-to-many relationship. Yet we seldom would start out with the name “George Washington” and
ask, “Of which country was he president?” Pragmatically, we can reduce the relationship to a unidirectional association, traversable from country to president. This refinement actually reflects insight into the domain, as well as making a more practical design. It captures the understanding that
one direction of the association is much more meaningful and important than the other. It keeps the
“Person” class independent of the far less fundamental concept of “President.”
A Model Expressed in Software 49

---

## Sección 18: Chapter 4, we'll look at the principle of

-- 45 of 324 --

Figure 5.1. Some traversal directions reflect a natural bias in the domain.
Very often, deeper understanding leads to a “qualified” relationship. Looking deeper into presidents,
we realize that (except in a civil war, perhaps) a country has only one president at a time. This
qualifier reduces the multiplicity to one-to-one, and explicitly embeds an important rule into the
model. Who was president of the United States in 1790? George Washington.
Figure 5.2. Constrained associations communicate more knowledge and are more practical designs.
Constraining the traversal direction of a many-to-many association effectively reduces its implementation to one-to-many—a
much easier design.
Consistently constraining associations in ways that reflect the bias of the domain not only makes
those associations more communicative and simpler to implement, it also gives significance to the
remaining bidirectional associations. When the bidirectionality of a relationship is a semantic characteristic of the domain, when it's needed for application functionality, the retention of both traversal
directions conveys that.
Of course, the ultimate simplification is to eliminate an association altogether, if it is not essential to
the job at hand or the fundamental meaning of the model objects.
A Model Expressed in Software 50

-- 46 of 324 --

Example
Associations in a Brokerage Account
One Java implementation of Brokerage Account in this model would be
public class BrokerageAccount {
String accountNumber;
Customer customer;
Set investments;
// Constructors, etc. omitted
public Customer getCustomer() {
return customer;
}
public Set getInvestments() {
return investments;
}
}
But if we need to fetch the data from a relational database, another implementation, equally consistent with the model, would be the following:
Table: BROKERAGE_ACCOUNT
ACCOUNT_NUMBER CUSTOMER_SS_NUMBER
Table: CUSTOMER
SS_NUMBER NAME
Table: INVESTMENT
ACCOUNT_NUMBER STOCK_SYMBOL AMOUNT
A Model Expressed in Software 51

-- 47 of 324 --

public class BrokerageAccount {
String accountNumber;
String customerSocialSecurityNumber;
// Omit constructors, etc.
public Customer getCustomer() {
String sqlQuery =
"SELECT * FROM CUSTOMER WHERE" +
"SS_NUMBER='"+customerSocialSecurityNumber+"'";
return QueryService.findSingleCustomerFor(sqlQuery);
}
public Set getInvestments() {
String sqlQuery =
"SELECT * FROM INVESTMENT WHERE" +
"BROKERAGE_ACCOUNT='"+accountNumber+"'";
return QueryService.findInvestmentsFor(sqlQuery);
}
}
(
Note: The QueryService, a utility for fetching rows from the database and creating objects, is simple
for explaining examples, but it's not necessarily a good design for a real project.)
Let's refine the model by qualifying the association between Brokerage Account and Investment,
reducing its multiplicity. This says there can be only one investment per stock.
This wouldn't be true of all business situations (for example, if the lots need to be tracked), but
whatever the particular rules, as constraints on associations are discovered they should be included
in the model and implementation. They make the model more precise and the implementation easier
to maintain.
The Java implementation could become:
public class BrokerageAccount {
String accountNumber;
Customer customer;
Map investments;
// Omitting constructors, etc.
public Customer getCustomer() {
return customer;
}
A Model Expressed in Software 52

-- 48 of 324 --

public Investment getInvestment(String stockSymbol) {
return (Investment)investments.get(stockSymbol);
}
}
And an SQL-based implementation would be:
public class BrokerageAccount {
String accountNumber;
String customerSocialSecurityNumber;
//Omitting constructors, etc.
public Customer getCustomer() {
String sqlQuery = "SELECT * FROM CUSTOMER WHERE SS_NUMBER='"
+ customerSocialSecurityNumber + "'";
return QueryService.findSingleCustomerFor(sqlQuery);
}
public Investment getInvestment(String stockSymbol) {
String sqlQuery = "SELECT * FROM INVESTMENT "
+ "WHERE BROKERAGE_ACCOUNT='" + accountNumber + "'"
+ "AND STOCK_SYMBOL='" + stockSymbol +"'";
return QueryService.findInvestmentFor(sqlQuery);
}
}
Carefully distilling and constraining the model's associations will take you a long way toward a
MODEL-DRIVEN DESIGN. Now let's turn to the objects themselves. Certain distinctions clarify the
model while making for a more practical implementation. . . .
Entities (a.k.a. Reference Objects)
Many objects are not fundamentally defined by their attributes, but rather by a thread of continuity
and identity.
A landlady sued me, claiming major damages to her property. The papers I was served described
an apartment with holes in the walls, stains on the carpet, and a noxious liquid in the sink that gave
off caustic fumes that had made the kitchen wallpaper peel. The court documents named me as the
tenant responsible for the damages, identifying me by name and by my then-current address. This
was confusing to me, because I had never even visited that ruined place.
A Model Expressed in Software 53

-- 49 of 324 --

After a moment, I realized that it must be a case of mistaken identity. I called the plaintiff and told
her this, but she didn't believe me. The former tenant had been eluding her for months. How could
I prove that I was not the same person who had cost her so much money? I was the only Eric Evans
in the phone book.
Well, the phone book turned out to be my salvation. Because I had been living in the same apartment
for two years, I asked her if she still had the previous year's book. After she found it and verified that
my listing was the same (right next to my namesake's listing), she realized that I was not the person
she wanted to sue, apologized, and promised to drop the case.
Computers are not that resourceful. A case of mistaken identity in a software system leads to data
corruption and program errors.
There are special technical challenges here, which I'll discuss in a bit, but first let's look at the
fundamental issue: Many things are defined by their identity, and not by any attribute. In our typical
conception, a person (to continue with the nontechnical example) has an identity that stretches from
birth to death and even beyond. That person's physical attributes transform and ultimately disappear. The name may change. Financial relationships come and go. There is not a single attribute
of a person that cannot change; yet the identity persists. Am I the same person I was at age five?
This kind of metaphysical question is important in the search for effective domain models. Slightly
rephrased: Does the user of the application
care if I am the same person I was at age five?
In a software system for tracking accounts due, that modest “customer” object may have a more
colorful side. It accumulates status by prompt payment or is turned over to a bill-collection agency
for failure to pay. It may lead a double life in another system altogether when the sales force extracts
customer data into its contact management software. In any case, it is unceremoniously squashed
flat to be stored in a database table. When new business stops flowing from that source, the customer object will be retired to an archive, a shadow of its former self.
Each of these forms of the customer is a different implementation based on a different programming
language and technology. But when a phone call comes in with an order, it is important to know: Is
this the customer who has the delinquent account? Is this the customer that Jack (a particular sales
representative) has been working with for weeks? Is this a completely new customer?
A conceptual identity has to be matched between multiple implementations of the objects, its stored
forms, and real-world actors such as the phone caller. Attributes may not match. A sales representative may have entered an address update into the contact software, which is just being propagated
to accounts due. Two customer contacts may have the same name. In distributed software, multiple
users could be entering data from different sources, causing update transactions to propagate
through the system to be reconciled in different databases asynchronously.
Object modeling tends to lead us to focus on the attributes of an object, but the fundamental concept
of an
ENTITY is an abstract continuity threading through a life cycle and even passing through
multiple forms.
Some objects are not defined primarily by their attributes. They represent a thread of identity that
runs through time and often across distinct representations. Sometimes such an object must be
matched with another object even though attributes differ. An object must be distinguished from
other objects even though they might have the same attributes. Mistaken identity can lead to data
corruption.
A Model Expressed in Software 54

---

## Sección 19: Chapter 4, we'll look at the principle of

-- 50 of 324 --

An object defined primarily by its identity is called an
ENTITY.1 E
NTITIES have special modeling
and design considerations. They have life cycles that can radically change their form and content,
but a thread of continuity must be maintained. Their identities must be defined so that they can be
effectively tracked. Their class definitions, responsibilities, attributes, and associations should revolve around who they are, rather than the particular attributes they carry. Even for
ENTITIES that
don't transform so radically or have such complicated life cycles, placing them in the semantic category leads to more lucid models and more robust implementations.
Of course, most “
ENTITIES” in a software system are not people or entities in the usual sense of
the word. An
ENTITY is anything that has continuity through a life cycle and distinctions independent
of attributes that are important to the application's user. It could be a person, a city, a car, a lottery
ticket, or a bank transaction.
On the other hand, not all objects in the model are
ENTITIES, with meaningful identities. This issue
is confused by the fact that object-oriented languages build “identity” operations into every object
(for example, the “==” operator in Java). These operations determine if two references point to the
same object by comparing their location in memory or by some other mechanism. In this sense,
every object instance has identity. In the domain of, say, creating a Java runtime environment or a
technical framework for caching remote objects locally, every object instance may indeed be an
ENTITY. But this identity mechanism means very little in other application domains. Identity is a
subtle and meaningful attribute of
ENTITIES, which can't be turned over to the automatic features
of the language.
Consider transactions in a banking application. Two deposits of the same amount to the same
account on the same day are still distinct transactions, so they have identity and are
ENTITIES. On
the other hand, the amount attributes of those two transactions are probably instances of some
money object. These values have no identity, since there is no usefulness in distinguishing them.
In fact, two objects can have the same identity without having the same attributes or even, necessarily, being of the same class. When the bank customer is reconciling the transactions of the bank
statement with the transactions of the check registry, the task is, specifically, to match transactions
that have the same identity, even though they were recorded by different people on different dates
(the bank clearing date being later than the date on the check). The purpose of the check number
is to serve as a unique identifier for this purpose, whether the problem is being handled by a computer program or by hand. Deposits and cash withdrawals, which don't have an identifying number,
can be trickier, but the same principle applies: each transaction is an
ENTITY, which appears in at
least two forms.
It is common for identity to be significant outside a particular software system, as is the case with
the banking transactions and the apartment tenants. But sometimes the identity is important only in
the context of the system, such as the identity of a computer process.
Therefore:
When an object is distinguished by its identity, rather than its attributes, make this primary to its
definition in the model. Keep the class definition simple and focused on life cycle continuity and
identity. Define a means of distinguishing each object regardless of its form or history. Be alert to
requirements that call for matching objects by attributes. Define an operation that is guaranteed to
produce a unique result for each object, possibly by attaching a symbol that is guaranteed unique.
This means of identification may come from the outside, or it may be an arbitrary identifier created
by and for the system, but it must correspond to the identity distinctions in the model. The model
must define what it
means to be the same thing.
Identity is not intrinsic to a thing in the world; it is a meaning superimposed because it is useful. In
fact, the same real-world thing might or might not be represented as an
ENTITY in a domain model.
1A model
ENTITY is not the same thing as a Java “entity bean.” Entity beans were meant as a framework for implementing
ENTITIES, more
or less, but it hasn't worked out that way. Most
ENTITIES are implemented as ordinary objects. Regardless of how they are implemented,
ENTITIES are a fundamental distinction in a domain model.
A Model Expressed in Software 55

-- 51 of 324 --

An application for booking seats in a stadium might treat seats and attendees as
ENTITIES. In the
case of assigned seating, in which each ticket has a seat number on it, the seat is an
ENTITY. Its
identifier is the seat number, which is unique within the stadium. The seat may have many other
attributes, such as its location, whether the view is obstructed, and the price, but only the seat
number, or a unique row and position, is used to identify and distinguish seats.
On the other hand, if the event is “general admission,” meaning that ticket holders sit wherever they
find an empty seat, there is no need to distinguish individual seats. Only the total number of seats
is important. Although the seat numbers are still engraved on the physical seats, there is no need
for the software to track them. In fact, it would be erroneous for the model to associate specific seat
numbers with tickets, because there is no such constraint at a general admission event. In such a
case, seats are
not ENTITIES, and no identifier is needed.
Modeling ENTITIES
It is natural to think about the attributes when modeling an object, and it is quite important to think
about its behavior. But the most basic responsibility of
ENTITIES is to establish continuity so that
behavior can be clear and predictable. They do this best if they are kept spare. Rather than focusing
on the attributes or even the behavior, strip the
ENTITY object's definition down to the most intrinsic
characteristics, particularly those that identify it or are commonly used to find or match it. Add only
behavior that is essential to the concept and attributes that are required by that behavior. Beyond
that, look to remove behavior and attributes into other objects associated with the core
ENTITY.
Some of these will be other
ENTITIES. Some will be
VALUE OBJECTS, which is the next pattern
in this chapter. Beyond identity issues,
ENTITIES tend to fulfill their responsibilities by coordinating
the operations of objects they own.
The customerID is the one and only identifier of the Customer
ENTITY in Figure 5.5, but the phone
number and address would often be used to find or match a Customer. The name does not
define
a person's identity, but it is often used as part of the means of determining it. In this example, the
phone and address attributes moved into Customer, but on a real project, that choice would depend
on how the domain's customers are typically matched or distinguished. For example, if a Customer has many contact phone numbers for different purposes, then the phone number is not associated with identity and should stay with the Sales Contact.
Figure 5.5. Attributes associated with identity stay with the ENTITY.
A Model Expressed in Software 56

---

## Sección 20: Chapter 4, we'll look at the principle of

-- 52 of 324 --

Designing the Identity Operation
Each
ENTITY must have an operational way of establishing its identity with another object—distinguishable even from another object with the same descriptive attributes. An identifying attribute must
be guaranteed to be unique within the system however that system is defined—even if distributed,
even when objects are archived.
As mentioned earlier, object-oriented languages have “identity” operations that determine if two
references point to the same object by comparing the objects' locations in memory. This kind of
identity tracking is too fragile for our purposes. In most technologies for persistent storage of objects,
every time an object is retrieved from a database, a new instance is created, and so the initial identity
is lost. Every time an object is transmitted across a network, a new instance is created on the
destination, and once again the identity is lost. The problem can be even worse when multiple
versions of the same object exist in the system, such as when updates propagate through a distributed database.
Even with frameworks that simplify these technical problems, the fundamental issue exists: How do
you know that two objects represent the same conceptual
ENTITY? The definition of identity
emerges from the model. Defining identity demands understanding of the domain.
Sometimes certain data attributes, or combinations of attributes, can be guaranteed or simply constrained to be unique within the system. This approach provides a unique key for the
ENTITY. Daily
newspapers, for example, might be identified by the name of the newspaper, the city, and the date
of publication. (But watch out for extra editions and name changes!)
When there is no true unique key made up of the attributes of an object, another common solution
is to attach to each instance a symbol (such as a number or a string) that is unique within the class.
Once this ID symbol is created and stored as an attribute of the
ENTITY, it is designated immutable.
It must never change, even if the development system is unable to directly enforce this rule. For
example, the ID attribute is preserved as the object gets flattened into a database and reconstructed.
Sometimes a technical framework helps with this process, but otherwise it just takes engineering
discipline.
Often the ID is generated automatically by the system. The generation algorithm must guarantee
uniqueness within the system, which can be a challenge with concurrent processing and in distributed systems. Generating such an ID may require techniques that are beyond the scope of this
book. The goal here is to point out when the considerations arise, so that developers are aware they
have a problem to solve and know how to narrow down their concerns to the critical areas. The key
is to recognize that identity concerns hinge on specific aspects of the model. Often, the means of
identification demand a careful study of the domain, as well.
When the ID is automatically generated, the user may never need to see it. The ID may be needed
only internally, such as in a contact management application that lets the user find records by a
person's name. The program needs to be able to distinguish two contacts with exactly the same
name in a simple, unambiguous way. The unique, internal IDs let the system do just that. After
retrieving the two distinct items, the system will show two separate contacts to the user, but the IDs
may not be shown. The user will distinguish them on the basis of their company, their location, and
so on.
Finally, there are cases in which a generated ID
is of interest to the user. When I ship a package
through a parcel delivery service, I'm given a tracking number, generated by the shipping company's
software, which I can use to identify and follow up on my package. When I book airline tickets or
reserve a hotel, I'm given confirmation numbers that are unique identifiers for the transaction.
In some cases, the uniqueness of the ID must apply beyond the computer system's boundaries. For
example, if medical records are being exchanged between two hospitals that have separate computer systems, ideally each system will use the same patient ID, but this is difficult if they generate
their own symbol. Such systems often use an identifier issued by some other institution, typically a
A Model Expressed in Software 57

-- 53 of 324 --

government agency. In the United States, the Social Security number is often used by hospitals as
an identifier for a person. Such methods are not foolproof. Not everyone has a Social Security
number (children and nonresidents of the United States, especially), and many people object to its
use, for privacy reasons.
In less formal situations (say, video rental), telephone numbers are used as identifiers. But a telephone can be shared. The number can change. An old number can even be reassigned to a different
person.
For these reasons, specially assigned identifiers are often used (such as frequent flier numbers),
and other attributes, such as phone numbers and Social Security numbers, are used to match and
verify. In any case, when the application requires an external ID, the users of the system become
responsible for supplying IDs that are unique, and the system must give them adequate tools to
handle exceptions that arise.
Given all these technical problems, it is easy to lose sight of the underlying conceptual problem:
What does it mean for two objects to be the same thing? It is easy enough to stamp each object
with an ID, or to write an operation that compares two instances, but if these IDs or operations don't
correspond to some meaningful distinction in the domain, they just confuse matters more. This is
why identity-assigning operations often involve human input. Checkbook reconciliation software, for
instance, may offer likely matches, but the user is expected to make the final determination.
Value Objects
Many objects have no conceptual identity. These objects describe some characteristic of a thing.
When a child is drawing, he cares about the color of the marker he chooses, and he may care about
the sharpness of the tip. But if there are two markers of the same color and shape, he probably
won't care which one he uses. If a marker is lost and replaced by another of the same color from a
new pack, he can resume his work unconcerned about the switch.
Ask the child about the various drawings on the refrigerator, and he will quickly distinguish those he
made from those his sister made. He and his sister have useful identities, as do their completed
drawings. But imagine how complicated it would be if he had to track which lines in a drawing were
made by each marker. Drawing would no longer be child's play.
A Model Expressed in Software 58

---

## Sección 21: Chapter 4, we'll look at the principle of

-- 54 of 324 --

Because the most conspicuous objects in a model are usually
ENTITIES, and because it is so
important to track each
ENTITY's identity, it is natural to consider assigning an identity to all domain
objects. Indeed, some frameworks assign a unique ID to every object.
The system has to cope with all that tracking, and many possible performance optimizations are
ruled out. Analytical effort is required to define meaningful identities and work out foolproof ways to
track objects across distributed systems or in database storage. Equally important, taking on artificial
identities is misleading. It muddles the model, forcing all objects into the same mold.
Tracking the identity of ENTITIES is essential, but attaching identity to other objects can hurt system
performance, add analytical work, and muddle the model by making all objects look the same.
Software design is a constant battle with complexity. We must make distinctions so that special
handling is applied only where necessary.
However, if we think of this category of object as just the absence of identity, we haven't added
much to our toolbox or vocabulary. In fact, these objects have characteristics of their own and their
own significance to the model.
These are the objects that describe things.
An object that represents a descriptive aspect of the domain with no conceptual identity is called a
VALUE OBJECT. V
ALUE OBJECTS are instantiated to represent elements of the design that we
care about only for
what they are, not
who or
which they are.
Is “Address” a VALUE OBJECT? Who's Asking?
In software for a mail-order company, an address is needed to confirm the credit card, and to address the
parcel. But if a roommate also orders from the same company, it is not important to realize they are in the same
location. Address is a
VALUE OBJECT.
In software for the postal service, intended to organize delivery routes, the country could be formed into a
hierarchy of regions, cities, postal zones, and blocks, terminating in individual addresses. These address objects would derive their zip code from their parent in the hierarchy, and if the postal service decided to reassign
postal zones, all the addresses within would go along for the ride. Here, Address is an
ENTITY.
In software for an electric utility company, an address corresponds to a destination for the company's lines and
service. If roommates each called to order electrical service, the company would need to realize it. Address is
an
ENTITY. Alternatively, the model could associate utility service with a “dwelling,” an
ENTITY with an attribute
of address. Then Address would be a
VALUE OBJECT.
Colors are an example of
VALUE OBJECTS that are provided in the base libraries of many modern
development systems; so are strings and numbers. (You don't care which “4” you have or which
“Q”.) These basic examples are simple, but
VALUE OBJECTS are not necessarily simple. For example, a color-mixing program might have a rich model in which enhanced color objects could be
combined to produce other colors. These colors could have complex algorithms for collaborating to
derive the new resulting
VALUE OBJECT.
A
VALUE OBJECT can be an assemblage of other objects. In software for designing house plans,
an object could be created for each window style. This “window style” could be incorporated into a
“window” object, along with height and width, as well as rules governing how these attributes can
be changed and combined. These windows are intricate
VALUE OBJECTS made up of other
VALUE
OBJECTS. They in turn would be incorporated into larger elements of a plan, such as “wall” objects.
V
ALUE OBJECTS can even reference
ENTITIES. For example, if I ask an online map service for
a scenic driving route from San Francisco to Los Angeles, it might derive a Route object linking L.A.
and San Francisco via the Pacific Coast Highway. That Route object would be a
VALUE, even
though the three objects it references (two cities and a highway) are all
ENTITIES.
V
ALUE OBJECTS are often passed as parameters in messages between objects. They are frequently transient, created for an operation and then discarded. V
ALUE OBJECTS are used as attributes of
ENTITIES (and other
VALUES). A person may be modeled as an
ENTITY with an identity,
but that person's
name is a
VALUE.
A Model Expressed in Software 59

-- 55 of 324 --

When you care only about the attributes of an element of the model, classify it as a VALUE OBJECT. Make it express the meaning of the attributes it conveys and give it related functionality. Treat
the VALUE OBJECT as immutable. Don't give it any identity and avoid the design complexities
necessary to maintain ENTITIES.
The attributes that make up a
VALUE OBJECT should form a conceptual whole.2 For example,
street, city, and postal code shouldn't be separate attributes of a Person object. They are part of a
single, whole address, which makes a simpler Person, and a more coherent
VALUE OBJECT.
Figure 5.6. A VALUE OBJECT can give information about an ENTITY. It should be conceptually whole.
Designing VALUE OBJECTS
We don't care which instance we have of a
VALUE OBJECT. This lack of constraints gives us design
freedom we can use to simplify the design or optimize performance. This involves making choices
about copying, sharing, and immutability.
If two people have the same name, that does not make them the same person, or make them
interchangeable. But the object representing the name is interchangeable, because only the spelling
of the name matters. A Name object can be
copied from the first Person object to the second.
In fact, the two Person objects might not need their own name instances. The same Name object
could be
shared between the two Person objects (each with a pointer to the same name instance)
with no change in their behavior or identity. That is, their behavior will be correct until some change
is made to the name of one person. Then the other person's name would change also! To protect
against this, in order for an object to be shared safely, it must be
immutable: it cannot be changed
except by full replacement.
The same issues arise when an object passes one of its attributes to another object as an argument
or return value. Anything could happen to the wandering object while it is out of control of its owner.
The
VALUE could be changed in a way that corrupts the owner, by violating the owner's invariants.
This problem is avoided either by making the passed object immutable, or by passing a copy.
2The
WHOLE VALUE pattern, by Ward Cunningham.
A Model Expressed in Software 60

---

## Sección 22: Chapter 4, we'll look at the principle of

-- 56 of 324 --

Creating extra options for performance tuning can be important because
VALUE OBJECTS tend to
be numerous. The example of the house design software hints at this. If each electrical outlet is a
separate
VALUE OBJECT, there might be a hundred of them in a single version of a single house
plan. But if all outlets are considered interchangeable, we could share just one instance of an outlet
and point to it a hundred times (an example of
FLYWEIGHT [Gamma et al. 1995]). In large systems,
this kind of effect can be multiplied by thousands, and such an optimization can make the difference
between a usable system and one that slows to a crawl, choked on millions of redundant objects.
This is just one example of an optimization trick that is not available for
ENTITIES.
The economy of copying versus sharing depends on the implementation environment. Although
copies may clog the system with huge numbers of objects, sharing can slow down a distributed
system. When a copy is passed between two machines, a single message is sent and the copy lives
independently on the receiving machine. But if a single instance is being shared, only a reference
is passed, requiring a message back to the object for each interaction.
Sharing is best restricted to those cases in which it is most valuable and least troublesome:
• When saving space or object count in the database is critical
• When communication overhead is low (such as in a centralized server)
• When the shared object is strictly immutable
Immutability of an attribute or an object can be declared in some languages and environments but
not in others. Such features help communicate the design decision, but they are not essential. Many
of the distinctions we are making in the model cannot be explicitly declared in the implementation
with most current tools and programming languages. You can't declare
ENTITIES, for example, and
then have an identity operation automatically enforced. But the lack of direct language support for
a conceptual distinction does not mean that the distinction is not useful. It just means that more
discipline is needed to maintain the rules that will be only implicit in the implementation. This can
be reinforced with naming conventions, selective documentation, and
lots of discussion.
As long as a
VALUE OBJECT is immutable, change management is simple—there isn't any change
except full replacement. Immutable objects can be freely shared, as in the electrical outlet example.
If garbage collection is reliable, deletion is just a matter of dropping all references to the object.
When a
VALUE OBJECT is designated immutable in the design, developers are free to make decisions about issues such as copying and sharing on a purely technical basis, secure in the knowledge that the application does not rely on particular instances of the objects.
Special Cases: When to Allow Mutability
Immutability is a great simplifier in an implementation, making sharing and reference passing safe. It is also
consistent with the meaning of a value. If the value of an attribute changes, you use a different
VALUE OBJECT, rather than modifying the existing one. Even so, there are cases when performance considerations will
favor allowing a
VALUE OBJECT to be mutable. These factors would weigh in favor of a mutable implementation:
• If the
VALUE changes frequently
• If object creation or deletion is expensive
• If replacement (rather than modification) will disturb clustering (as discussed in the previous example)
• If there is not much sharing of
VALUES, or if such sharing is forgone to improve clustering or for some
other technical reason
Just to reiterate: If a
VALUE's implementation is to be mutable, then it
must not be shared. Whether you will
be sharing or not, design
VALUE OBJECTS as immutable when you can.
A Model Expressed in Software 61

-- 57 of 324 --

Defining
VALUE OBJECTS and designating them as immutable is a case of following a general
rule: Avoiding unnecessary constraints in a model leaves developers free to do purely technical
performance tuning. Explicitly defining the essential constraints lets developers tweak the design
while keeping safe from changing meaningful behavior. Such design tweaks are often very specific
to the technology in use on a particular project.
Example
Tuning a Database with VALUE OBJECTS
Databases, at the lowest level, have to place data in a physical location on a disk, and it takes time
for physical parts to move around and read that data. Sophisticated databases attempt to cluster
these physical addresses so that related data can be fetched from the disk in a single physical
operation.
If an object is referenced by many other objects, some of those objects will not be located nearby
(on the same page), requiring an additional physical operation to get the data. By making a copy,
rather than sharing a reference to the same instance, a
VALUE OBJECT that is acting as an attribute
of many
ENTITIES can be stored on the same page as each
ENTITY that uses it. This technique
of storing multiple copies of the same data is called
denormalization and is often used when access
time is more critical than storage space or simplicity of maintenance.
In a relational database, you might want to put a particular
VALUE in the table of the
ENTITY that
owns it, rather than creating an association to a separate table. In a distributed system, holding a
reference to a
VALUE OBJECT on another server will probably make for slow responses to messages; instead, a copy of the whole object should be passed to the other server. We can freely make
these copies because we are dealing with
VALUE OBJECTS.
Designing Associations That Involve VALUE OBJECTS
Most of the earlier discussion of associations applies to
ENTITIES and
VALUE OBJECTS alike. The
fewer and simpler the associations in the model, the better.
But, while bidirectional associations between
ENTITIES may be hard to maintain, bidirectional associations between two
VALUE OBJECTS just make no sense. Without identity, it is meaningless
to say that an object points back to the same
VALUE OBJECT that points to it. The most you could
say is that it points to an object that is
equal to the one pointing to it, but you would have to enforce
that invariant somewhere. And although you could do so, and set up pointers going both ways, it is
hard to think of examples where such an arrangement would be useful. Try to completely eliminate
bidirectional associations between
VALUE OBJECTS. If in the end such associations seem necessary in your model, rethink the decision to declare the object a
VALUE OBJECT in the first place.
Maybe it has an identity that hasn't been explicitly recognized yet.
E
NTITIES and
VALUE OBJECTS are the main elements of conventional object models, but pragmatic designers have come to use one element,
SERVICES. . . .
A Model Expressed in Software 62

---

## Sección 23: Chapter 4, we'll look at the principle of

-- 58 of 324 --

Services
Sometimes, it just isn't a thing.
In some cases, the clearest and most pragmatic design includes operations that do not conceptually
belong to any object. Rather than force the issue, we can follow the natural contours of the problem
space and include
SERVICES explicitly in the model.
There are important domain operations that can't find a natural home in an
ENTITY or
VALUE
OBJECT. Some of these are intrinsically activities or actions, not things, but since our modeling
paradigm is objects, we try to fit them into objects anyway.
Now, the more common mistake is to give up too easily on fitting the behavior into an appropriate
object, gradually slipping toward procedural programming. But when we force an operation into an
object that doesn't fit the object's definition, the object loses its conceptual clarity and becomes hard
to understand or refactor. Complex operations can easily swamp a simple object, obscuring its role.
And because these operations often draw together many domain objects, coordinating them and
putting them into action, the added responsibility will create dependencies on all those objects,
tangling concepts that could be understood independently.
Sometimes services masquerade as model objects, appearing as objects with no meaning beyond
doing some operation. These “doers” end up with names ending in “Manager” and the like. They
have no state of their own nor any meaning in the domain beyond the operation they host. Still, at
least this solution gives these distinct behaviors a home without messing up a real model object.
Some concepts from the domain aren't natural to model as objects. Forcing the required domain
functionality to be the responsibility of an ENTITY or VALUE either distorts the definition of a modelbased object or adds meaningless artificial objects.
A
SERVICE is an operation offered as an interface that stands alone in the model, without encapsulating state, as
ENTITIES and
VALUE OBJECTS do. S
ERVICES are a common pattern in technical frameworks, but they can also apply in the domain layer.
A Model Expressed in Software 63

-- 59 of 324 --

The name
service emphasizes the relationship with other objects. Unlike
ENTITIES and
VALUE
OBJECTS, it is defined purely in terms of what it can do for a client. A
SERVICE tends to be named
for an activity, rather than an entity—a verb rather than a noun. A
SERVICE can still have an abstract, intentional definition; it just has a different flavor than the definition of an object. A
SERVICE should still have a defined responsibility, and that responsibility and the interface fulfilling it
should be defined as part of the domain model. Operation names should come from the
UBIQUITOUS LANGUAGE or be introduced into it. Parameters and results should be domain objects.
S
ERVICES should be used judiciously and not allowed to strip the
ENTITIES and
VALUE OBJECTS of all their behavior. But when an operation is actually an important domain concept, a
SERVICE forms a natural part of a
MODEL-DRIVEN DESIGN. Declared in the model as a SERVICE, rather than as a phony object that doesn't actually represent anything, the standalone operation
will not mislead anyone.
A good
SERVICE has three characteristics.
1. The operation relates to a domain concept that is not a natural part of an
ENTITY or
VALUE
OBJECT.
2. The interface is defined in terms of other elements of the domain model.
3. The operation is stateless.
Statelessness here means that any client can use any instance of a particular
SERVICE without
regard to the instance's individual history. The execution of a
SERVICE will use information that is
accessible globally, and may even change that global information (that is, it may have side effects).
But the
SERVICE does not hold state of its own that affects its own behavior, as most domain objects
do.
When a significant process or transformation in the domain is not a natural responsibility of an
ENTITY or VALUE OBJECT, add an operation to the model as a standalone interface declared as
a SERVICE. Define the interface in terms of the language of the model and make sure the operation
name is part of the UBIQUITOUS LANGUAGE. Make the SERVICE stateless.
SERVICES and the Isolated Domain Layer
This pattern is focused on those
SERVICES that have an important meaning in the domain in their
own right, but of course
SERVICES are not used only in the domain layer. It takes care to distinguish
SERVICES that belong to the domain layer from those of other layers, and to factor responsibilities
to keep that distinction sharp.
Most
SERVICES discussed in the literature are purely technical and belong in the infrastructure
layer. Domain and application
SERVICES collaborate with these infrastructure
SERVICES. For
example, a bank might have an application that sends an e-mail to a customer when an account
balance falls below a specific threshold. The interface that encapsulates the e-mail system, and
perhaps alternate means of notification, is a
SERVICE in the infrastructure layer.
It can be harder to distinguish application
SERVICES from domain
SERVICES. The application
layer is responsible for ordering the notification. The domain layer is responsible for determining if
a threshold was met—though this task probably does not call for a
SERVICE, because it would fit
the responsibility of an “account” object. That banking application could be responsible for funds
transfers. If a
SERVICE were devised to make appropriate debits and credits for a funds transfer,
that capability would belong in the domain layer. Funds transfer has a meaning in the banking
domain language, and it involves fundamental business logic. Technical
SERVICES should lack
any business meaning at all.
A Model Expressed in Software 64

-- 60 of 324 --

Many domain or application
SERVICES are built on top of the populations of
ENTITIES and
VALUES, behaving like scripts that organize the potential of the domain to actually get something done.
E
NTITIES and
VALUE OBJECTS are often too fine-grained to provide a convenient access to the
capabilities of the domain layer. Here we encounter a very fine line between the domain layer and
the application layer. For example, if the banking application can convert and export our transactions
into a spreadsheet file for us to analyze, that export is an application
SERVICE. There is no meaning
of “file formats” in the domain of banking, and there are no business rules involved.
On the other hand, a feature that can transfer funds from one account to another is a domain
SERVICE because it embeds significant business rules (crediting and debiting the appropriate accounts, for example) and because a “funds transfer” is a meaningful banking term. In this case, the
SERVICE does not do much on its own; it would ask the two Account objects to do most of the work.
But to put the “transfer” operation on the Account object would be awkward, because the operation
involves two accounts and some global rules.
We might like to create a Funds Transfer object to represent the two entries plus the rules and history
around the transfer. But we are still left with calls to
SERVICES in the interbank networks. What's
more, in most development systems, it is awkward to make a direct interface between a domain
object and external resources. We can dress up such external
SERVICES with a
FACADE that
takes inputs in terms of the model, perhaps returning a Funds Transfer object as its result. But
whatever intermediaries we might have, and even though they don't belong to us, those
SERVICES are carrying out the domain responsibility of funds transfer.
Partitioning Services into Layers
Application Funds Transfer App Service
• Digests input (such as an XML request).
• Sends message to domain service for fulfillment.
• Listens for confirmation.
• Decides to send notification using infrastructure service.
Domain Funds Transfer Domain Service
• Interacts with necessary Account and Ledger objects, making appropriate debits and credits.
• Supplies confirmation of result (transfer allowed or not, and so on).
Infrastructure Send Notification Service
• Sends e-mails, letters, and other communications as directed by the application.
Granularity
Although this pattern discussion has emphasized the expressiveness of modeling a concept as a
SERVICE, the pattern is also valuable as a means of controlling granularity in the interfaces of the
domain layer, as well as decoupling clients from the
ENTITIES and
VALUE OBJECTS.
Medium-grained, stateless
SERVICES can be easier to reuse in large systems because they encapsulate significant functionality behind a simple interface. Also, fine-grained objects can lead to
inefficient messaging in a distributed system.
As previously discussed, fine-grained domain objects can contribute to knowledge leaks from the
domain into the application layer, where the domain object's behavior is coordinated. The complexity
of a highly detailed interaction ends up being handled in the application layer, allowing domain
knowledge to creep into the application or user interface code, where it is lost from the domain layer.
The judicious introduction of domain services can help maintain the bright line between layers.
This pattern favors interface simplicity over client control and versatility. It provides a medium grain
of functionality very useful in packaging components of large or distributed systems. And sometimes
a
SERVICE is the most natural way to express a domain concept.
A Model Expressed in Software 65

---

## Sección 24: Chapter 4, we'll look at the principle of

-- 61 of 324 --

Access to SERVICES
Distributed system architectures, such as J2EE and CORBA, provide special publishing mechanisms for
SERVICES, with conventions for their use, and they add distribution and access capabilities. But such frameworks are not always in use on a project, and even when they are, they are
likely to be overkill when the motivation is just a logical separation of concerns.
The means of providing access to a
SERVICE is not as important as the design decision to carve
off specific responsibilities. A “doer” object may be satisfactory as an implementation of a
SERVICE's interface. A simple
SINGLETON (Gamma et al. 1995) can be written easily to provide access.
Coding conventions can make it clear that these objects are just delivery mechanisms for
SERVICE interfaces, and not meaningful domain objects. Elaborate architectures should be used only
when there is a real need to distribute the system or otherwise draw on the framework's capabilities.
Modules (a.k.a. Packages)
M
ODULES are an old, established design element. There are technical considerations, but cognitive
overload is the primary motivation for modularity. M
ODULES give people two views of the model:
They can look at detail within a
MODULE without being overwhelmed by the whole, or they can look
at relationships between
MODULES in views that exclude interior detail.
The
MODULES in the domain layer should emerge as a meaningful part of the model, telling the
story of the domain on a larger scale.
Everyone uses MODULES, but few treat them as a full-fledged part of the model. Code gets broken
down into all sorts of categories, from aspects of the technical architecture to developers' work
assignments. Even developers who refactor a lot tend to content themselves with MODULES conceived early in the project.
It is a truism that there should be low coupling between MODULES and high cohesion within them.
Explanations of coupling and cohesion tend to make them sound like technical metrics, to be judged
mechanically based on the distributions of associations and interactions. Yet it isn't just code being
divided into MODULES, but concepts. There is a limit to how many things a person can think about
at once (hence low coupling). Incoherent fragments of ideas are as hard to understand as an undifferentiated soup of ideas (hence high cohesion).
Low coupling and high cohesion are general design principles that apply as much to individual
objects as to
MODULES, but they are particularly important at this larger grain of modeling and
design. These terms have been around for a long time; one patterns-style explanation can be found
in Larman 1998.
Whenever two model elements are separated into different modules, the relationships between
them become less direct than they were, which increases the overhead of understanding their place
in the design. Low coupling between
MODULES minimizes this cost, and makes it possible to analyze the contents of one
MODULE with a minimum of reference to others that interact.
At the same time, the elements of a good model have synergy, and well-chosen
MODULES bring
together elements of the model with particularly rich conceptual relationships. This high cohesion
of objects with related responsibilities allows modeling and design work to concentrate within a
single
MODULE, a scale of complexity a human mind can easily handle.
A Model Expressed in Software 66

-- 62 of 324 --

M
ODULES and the smaller elements should coevolve, but typically they do not. M
ODULES are
chosen to organize an early form of the objects. After that, the objects tend to change in ways that
keep them in the bounds of the existing
MODULE definition. Refactoring
MODULES is more work
and more disruptive than refactoring classes, and probably can't be as frequent. But just as model
objects tend to start out naive and concrete and then gradually transform to reveal deeper insight,
MODULES can become subtle and abstract. Letting the
MODULES reflect changing understanding
of the domain will also allow more freedom for the objects within them to evolve.
Like everything else in a domain-driven design,
MODULES are a
communications mechanism. The
meaning of the objects being partitioned needs to drive the choice of
MODULES. When you place
some classes together in a
MODULE, you are telling the next developer who looks at your design
to think about them together. If your model is telling a story, the
MODULES are chapters. The name
of the
MODULE conveys its meaning. These names enter the
UBIQUITOUS LANGUAGE. “Now
let's talk about the 'customer' module,” you might say to a business expert, and the context is set
for your conversation.
Therefore:
Choose MODULES that tell the story of the system and contain a cohesive set of concepts. This
often yields low coupling between MODULES, but if it doesn't, look for a way to change the model
to disentangle the concepts, or search for an overlooked concept that might be the basis of a
MODULE that would bring the elements together in a meaningful way. Seek low coupling in the
sense of concepts that can be understood and reasoned about independently of each other. Refine
the model until it partitions according to highlevel domain concepts and the corresponding code is
decoupled as well.
Give the MODULES names that become part of the UBIQUITOUS LANGUAGE. MODULES and
their names should reflect insight into the domain.
Looking at conceptual relationships is not an alternative to technical measures. They are different
levels of the same issue, and both have to be accomplished. But model-focused thinking produces
a deeper solution, rather than an incidental one. And when there has to be a trade-off, it is best to
go with the conceptual clarity, even if it means more references between
MODULES or occasional
ripple effects when changes are made to a
MODULE. Developers can handle these problems if they
understand the story the model is telling them.
Agile MODULES
M
ODULES need to coevolve with the rest of the model. This means refactoring
MODULES right
along with the model and code. But this refactoring often doesn't happen. Changing
MODULES
tends to require widespread updates to the code. Such changes can be disruptive to team communication and can even throw a monkey wrench into development tools, such as source code
control systems. As a result,
MODULE structures and names often reflect much earlier forms of the
model than the classes do.
Inevitable early mistakes in
MODULE choices lead to high coupling, which makes it hard to refactor.
The lack of refactoring just keeps increasing the inertia. It can only be overcome by biting the bullet
and reorganizing
MODULES based on experience of where the trouble spots lie.
Some development tools and programming systems exacerbate the problem. Whatever development technology the implementation will be based on, we need to look for ways of minimizing the
work of refactoring
MODULES, and minimizing clutter in communicating to other developers.
A Model Expressed in Software 67

---

## Sección 25: Chapter 4, we'll look at the principle of

-- 63 of 324 --

Example
Package Coding Conventions in Java
In Java, imports (dependencies) must be declared in some individual class. A modeler probably
thinks of packages as depending on other packages, but this can't be stated in Java. Common
coding conventions encourage the import of specific classes, resulting in code like this:
ClassA1
import packageB.ClassB1;
import packageB.ClassB2;
import packageB.ClassB3;
import packageC.ClassC1;
import packageC.ClassC2;
import packageC.ClassC3;
. . .
In Java, unfortunately, there is no escape from importing
into individual classes, but you can at least
import entire packages at a time, reflecting the intention that packages are highly cohesive units
while simultaneously reducing the effort of changing package names.
ClassA1
import packageB.*;
import packageC.*;
. . .
True, this technique means mixing two scales (classes depend on packages), but it communicates
more than the previous voluminous list of classes—it conveys the intent to create a dependency on
particular
MODULES.
If an individual class really does depend on a specific class in another package, and the local
MODULE doesn't seem to have a conceptual dependency on the other
MODULE, then maybe a
class should be moved, or the
MODULES themselves should be reconsidered.
The Pitfalls of Infrastructure-Driven Packaging
Strong forces on our packaging decisions come from technical frameworks. Some of these are
helpful, while others need to be resisted.
An example of a very useful framework standard is the enforcement of
LAYERED ARCHITECTURE by placing infrastructure and user interface code into separate groups of packages, leaving
the domain layer physically separated into its own set of packages.
On the other hand, tiered architectures can fragment the implementation of the model objects. Some
frameworks create tiers by spreading the responsibilities of a single domain object across multiple
objects and then placing those objects in separate packages. For example, with J2EE a common
practice is to place data and data access into an “entity bean” while placing associated business
logic into a “session bean.” In addition to the increased implementation complexity of each component, the separation immediately robs an object model of cohesion. One of the most fundamental
concepts of objects is to encapsulate data with the logic that operates on that data. This kind of
tiered implementation is not fatal, because both components can be viewed as together constituting
the implementation of a single model element, but to make matters worse, the entity and session
beans are often separated into different packages. At that point, viewing the various objects and
mentally fitting them back together as a single conceptual
ENTITY is just too much effort. We lose
the connection between the model and design. Best practice is to use EJBs at a larger grain than
ENTITY objects, reducing the downside of separating tiers. But fine-grain objects are often split into
tiers also.
A Model Expressed in Software 68

-- 64 of 324 --

For example, I encountered these problems on a rather intelligently run project in which each conceptual object was actually broken into four tiers. Each division had a good rationale. The first tier
was a data persistence layer, handling mapping and access to the relational database. Then came
a layer that handled behavior intrinsic to the object in all situations. Next was a layer for superimposing application-specific functionality. The fourth tier was meant as a public interface, decoupled
from all the implementation below. This scheme was a bit too complicated, but the layers were well
defined and there was some tidiness to the separation of concerns. We could have lived with mentally connecting all the physical objects making up one conceptual object. The separation of aspects
even helped at times. In particular, having the persistence code moved out removed a lot of clutter.
But on top of all this, the framework required each tier to be in a separate set of packages, named
according to a convention that identified the tier. This took up all the mental room for partitioning.
As a result, domain developers tended to avoid making too many
MODULES (each of which was
multiplied by four) and hardly ever changed one, because the effort of refactoring a
MODULE was
prohibitive. Worse, hunting down all the data and behavior that defined a single conceptual class
was so difficult (combined with the indirectness of the layering) that developers didn't have much
mental space left to think about models. The application was delivered, but with an anemic domain
model that basically fulfilled the database access requirements of the application, with behavior
supplied by a few
SERVICES. The leverage that should have derived from
MODEL-DRIVEN DESIGN was limited because the code did not transparently reveal the model and allow a developer
to work with it.
This kind of framework design is attempting to address two legitimate issues. One is the logical
division of concerns: One object has responsibility for database access, another for business logic,
and so on. Such divisions make it easier to understand the functioning of each tier (on a technical
level) and make it easier to switch out layers. The trouble is that the cost to application development
is not recognized. This is not a book on framework design, so I won't go into alternative solutions
to that problem, but they do exist. And even if there were no options, it would be better to trade off
these benefits for a more cohesive domain layer.
The other motivation for these packaging schemes is the distribution of tiers. This could be a strong
argument if the code actually got deployed on different servers. Usually it does not. The flexibility is
sought just in case it is needed. On a project that hopes to get leverage from
MODEL-DRIVEN
DESIGN, this sacrifice is too great unless it solves an immediate and pressing problem.
Elaborate technically driven packaging schemes impose two costs.
• If the framework's partitioning conventions pull apart the elements implementing the conceptual
objects, the code no longer reveals the model.
• There is only so much partitioning a mind can stitch back together, and if the framework uses it
all up, the domain developers lose their ability to chunk the model into meaningful pieces.
It is best to keep things simple. Choose a minimum of technical partitioning rules that are essential
to the technical environment or actually aid development. For example, decoupling complicated data
persistence code from the behavioral aspects of the objects may make refactoring easier.
Unless there is a real intention to distribute code on different servers, keep all the code that implements a single conceptual object in the same MODULE, if not the same object.
We could have come to the same conclusion by drawing on the old standard, “high cohesion/low
coupling.” The connections between an “object” implementing the business logic and the one responsible for database access are so extensive that the coupling is very high.
There are other pitfalls where framework design or just conventions of a company or project can
undermine
MODEL-DRIVEN DESIGN by obscuring the natural cohesion of the domain objects, but
the bottom line is the same. The restrictions, or just the large number of required packages, rules
out the use of other packaging schemes that are tailored to the needs of the domain model.
A Model Expressed in Software 69

---

## Sección 26: Chapter 4, we'll look at the principle of

-- 65 of 324 --

Use packaging to separate the domain layer from other code. Otherwise, leave as much freedom
as possible to the domain developers to package the domain objects in ways that support their
model and design choices.
One exception arises when code is generated based on a declarative design (discussed in Chapter
10). In that case, the developers do not need to read the code, and it is better to put it into a separate
package so that it is out of the way, not cluttering up the design elements developers actually have
to work with.
Modularity becomes more critical as the design gets bigger and more complex. This section presents
the basic considerations. Much of Part IV, “Strategic Design,” provides approaches to packaging
and breaking down big models and designs, and ways to give people focal points to guide understanding.
Each concept from the domain model should be reflected in an element of implementation. The
ENTITIES,
VALUE OBJECTS, and their associations, along with a few domain
SERVICES and the
organizing
MODULES, are points of direct correspondence between the implementation and the
model. The objects, pointers, and retrieval mechanisms in the implementation must map to model
elements straightforwardly, obviously. If they do not, clean up the code, go back and change the
model, or both.
Resist the temptation to add anything to the domain objects that does not closely relate to the
concepts they represent. These design elements have their job to do: they express the model. There
are other domain-related responsibilities that must be carried out and other data that must be managed in order to make the system work, but they don't belong in these objects. In Chapter 6, I will
discuss some supporting objects that fulfill the technical responsibilities of the domain layer, such
as defining database searches and encapsulating complex object creation.
The four patterns in this chapter provide the building blocks for an object model. But
MODELDRIVEN DESIGN does not necessarily mean forcing everything into an object mold. There are also
other model paradigms supported by tools, such as rules engines. Projects have to make pragmatic
trade-offs between them. These other tools and techniques are means to the end of a
MODELDRIVEN DESIGN, not alternatives to it.
Modeling Paradigms
M
ODEL-DRIVEN DESIGN calls for an implementation technology in tune with the particular modeling paradigm being applied. Many such paradigms have been experimented with, but only a few
have been widely used in practice. At present, the dominant paradigm is object-oriented design,
and most complex projects these days set out to use objects. This predominance has come about
for a variety of reasons: some factors are intrinsic to objects, some are circumstantial, and others
derive from the advantages that come from wide usage itself.
Why the Object Paradigm Predominates
Many of the reasons teams choose the object paradigm are not technical, or even intrinsic to objects.
But right out of the gate, object modeling does strike a nice balance of simplicity and sophistication.
If a modeling paradigm is too esoteric, not enough developers will master it, and they will use it
badly. If the nontechnical members of the team can't grasp at least the rudiments of the paradigm,
they will not understand the model, and the
UBIQUITOUS LANGUAGE will be lost. The fundamentals of object-oriented design seem to come naturally to most people. Although some developers
miss the subtleties of modeling, even nontechnologists can follow a diagram of an object model.
Yet, simple as the concept of object modeling is, it has proven rich enough to capture important
domain knowledge. And it has been supported from the outset by development tools that allowed
a model to be expressed in software.
A Model Expressed in Software 70

-- 66 of 324 --

Today, the object paradigm also has some significant circumstantial advantages deriving from maturity and widespread adoption. Without mature infrastructure and tool support, a project can get
sidetracked into technological R&D, delaying and diverting resources away from application development and introducing technical risks. Some technologies don't play well with others, and it may
not be possible to integrate them with industry-standard solutions, forcing the team to reinvent
common utilities. But over the years, many of these problems have been solved for objects, or made
irrelevant by widespread adoption. (Now it falls on other approaches to integrate with mainstream
object technology.) Most new technologies provide the means to integrate with the popular objectoriented platforms. This makes integration easier and even leaves open the option of mixing in
subsystems based on other modeling paradigms (which we will discuss later in this chapter).
Equally important is the maturity of the
developer community and the design culture itself. A project
that adopts a novel paradigm may be unable to find developers with expertise in the technology, or
with the experience to create effective models in the chosen paradigm. It may not be feasible to
educate developers in a reasonable amount of time because the patterns for making the most of
the paradigm and technology haven't gelled yet. Perhaps the pioneers of the field are effective but
haven't yet published their insights in an accessible form.
Objects are already understood by a community of thousands of developers, project managers, and
all the other specialists involved in project work.
A story from an object-oriented project of only a decade ago illustrates the risks of working in an
immature paradigm. In the early 1990s, this project committed itself to several cutting-edge technologies, including use of an object-oriented database on a large scale. It was exciting. People on
the team would proudly tell visitors that we were deploying the biggest database this technology
had ever supported. When I joined the project, different teams were spinning out object-oriented
designs and storing their objects in the database effortlessly. But gradually the realization crept upon
us that we were beginning to absorb a significant fraction of the database's capacity—with test data!
The actual database would be dozens of times larger. The actual transaction volume would be
dozens of times higher. Was it impossible to use this technology for this application? Had we used
it improperly? We were out of our depth.
Fortunately, we were able to bring onto the team one of a handful of people in the world with the
skills to extricate us from the problem. He named his price and we paid it. There were three sources
of the problem. First, the off-the-shelf infrastructure provided with the database simply didn't scale
up to our needs. Second, storage of fine-grained objects turned out to be much more costly than
we had realized. Third, parts of the object model had such a tangle of interdependencies that contention became a problem with a relatively small number of concurrent transactions.
With the help of this hired expert, we enhanced the infrastructure. The team, now aware of the impact
of fine-grained objects, began to find models that worked better with this technology. All of us deepened our thinking about the importance of limiting the web of relationships in a model, and we began
applying this new understanding to making better models with more decoupling between closely
interrelated aggregates.
Several months were lost in this recovery, in addition to the earlier months spent going down a failed
path. And this had not been the team's first setback resulting from the immaturity of the chosen
technologies and our own lack of experience with the associated learning curve. Sadly, this project
eventually retrenched and became quite conservative. To this day they use the exotic technologies,
but for cautiously scoped applications that probably don't really benefit from them.
A decade later, object-oriented technology is relatively mature. Most common infrastructure needs
can be met with off-the-shelf solutions that have been used in the field. Mission-critical tools come
from major vendors, often multiple vendors, or from stable open-source projects. Many of these
infrastructure pieces themselves are used widely enough that there is a base of people who already
understand them, as well as books explaining them, and so forth. The limitations of these established
technologies are fairly well understood, so that knowledgeable teams are less likely to overreach.
A Model Expressed in Software 71

---

## Sección 27: Chapter 4, we'll look at the principle of

-- 67 of 324 --

Other interesting modeling paradigms just don't have this maturity. Some are too hard to master
and will never be used outside small specialties. Others have potential, but the technical infrastructure is still patchy or shaky, and few people understand the subtleties of creating good models for
them. These may come of age, but they are not ready for most projects.
This is why, for the present, most projects attempting
MODEL-DRIVEN DESIGN are wise to use
object-oriented technology as the core of their system. They will not be locked into an object-only
system—because objects have become the mainstream of the industry, integration tools are available to connect with almost any other technology in current use.
Yet this doesn't mean that people should restrict themselves to objects forever. Traveling with the
crowd provides some safety, but it isn't always the way to go. Object models address a large number
of practical software problems, but there are domains that are not natural to model as discrete
packets of encapsulated behavior. For example, domains that are intensely mathematical or that
are dominated by global logical reasoning do not fit well into the object-oriented paradigm.
Nonobjects in an Object World
A domain model does not have to be an object model. There are
MODEL-DRIVEN DESIGNS implemented in Prolog, for example, with a model made up of logical rules and facts. Model paradigms
have been conceived to address certain ways people like to think about domains. Then the models
of those domains are shaped by the paradigm. The result is a model that conforms to the paradigm
so that it can be effectively implemented in the tools that support that modeling style.
Whatever the dominant model paradigm may be on a project, there are bound to be parts of the
domain that would be much easier to express in some other paradigm. When there are just a few
anomalous elements of a domain that otherwise works well in a paradigm, developers can live with
a few awkward objects in an otherwise consistent model. (Or, on the other extreme, if the greater
part of the problem domain is more naturally expressed in a particular other paradigm, it may make
sense to switch paradigms altogether and choose a different implementation platform.) But when
major parts of the domain seem to belong to different paradigms, it is intellectually appealing to
model each part in a paradigm that fits, using a mixture of tool sets to support implementation. When
the interdependence is small, a subsystem in the other paradigm can be encapsulated, such as a
complex math calculation that simply needs to be called by an object. Other times the different
aspects are more intertwined, such as when the interaction of the objects depends on some mathematical relationships.
This is what motivates the integration into object systems of such nonobject components as business rules engines and workflow engines. Mixing paradigms allows developers to model particular
concepts in the style that fits best. Furthermore, most systems must use some nonobject technical
infrastructure, most commonly relational databases. But making a coherent model that spans paradigms is hard, and making the supporting tools coexist is complicated. When developers can't clearly
see a coherent model embodied in the software,
MODEL-DRIVEN DESIGN can go out the window,
even as this mixture increases the need for it.
Sticking with MODEL-DRIVEN DESIGN When Mixing Paradigms
Rules engines will serve as an example of a technology sometimes mixed into an object-oriented
application development project. A knowledge-rich domain model probably contains explicit rules,
yet the object paradigm lacks specific semantics for stating rules and their interactions. Although
rules can be modeled as objects, and often are successfully, object encapsulation makes it awkward
to apply global rules that cross the whole system. Rules engine technology is appealing because it
promises to provide a more natural and declarative way to define rules, effectively allowing the rules
paradigm to be mixed into the object paradigm. The logic paradigm is well developed and powerful,
and it seems like a good complement to the strengths and weaknesses of objects.
A Model Expressed in Software 72

-- 68 of 324 --

But people don't always get what they hope for out of rules engines. Some products just don't work
very well. Some lack a seamless view that can show the relatedness of model concepts that run
between the two implementation environments. One common outcome is an application fractured
in two: a static data storage system using objects, and an ad hoc rules processing application that
has lost almost all connection with the object model.
It is important to continue to think in terms of models while working with rules. The team has to find
a single model that can work with both implementation paradigms. This is not easy, but it should be
possible if the rules engine allows expressive implementation. Otherwise, the data and the rules
become unconnected. The rules in the engine end up more like little programs than conceptual rules
in the domain model. With tight, clear relationships between the rules and the objects, the meaning
of both pieces is retained.
Without a seamless environment, it falls on the developers to distill a model made up of clear,
fundamental concepts to hold the whole design together.
The most effective tool for holding the parts together is a robust
UBIQUITOUS LANGUAGE that
underlies the whole heterogeneous model. Consistently applying names in the two environments
and exercising those names in the
UBIQUITOUS LANGUAGE can help bridge the gap.
This is a topic that deserves a book of its own. The goal of this section is merely to show that it isn't
necessary to give up
MODEL-DRIVEN DESIGN, and that it is worth the effort to keep it.
Although a
MODEL-DRIVEN DESIGN does not have to be object oriented, it
does depend on having
an expressive implementation of the model constructs, be they objects, rules, or workflows. If the
available tool does not facilitate that expressiveness, reconsider the choice of tools. An unexpressive implementation negates the advantage of the extra paradigm.
Here are four rules of thumb for mixing nonobject elements into a predominantly object-oriented
system:
•
Don't fight the implementation paradigm. There's always another way to think about a domain.
Find model concepts that fit the paradigm.
•
Lean on the ubiquitous language. Even when there is no rigorous connection between tools,
very consistent use of language can keep parts of the design from diverging.
•
Don't get hung up on UML. Sometimes the fixation on a tool, such as UML diagramming, leads
people to distort the model to make it fit what can easily be drawn. For example, UML does have
some features for representing constraints, but they are not always sufficient. Some other style
of drawing (perhaps conventional for the other paradigm), or simple English descriptions, are
better than tortuous adaptation of a drawing style intended for a certain view of objects.
•
Be skeptical. Is the tool really pulling its weight? Just because you have some rules, that doesn't
necessarily mean you need the overhead of a rules engine. Rules can be expressed as objects,
perhaps a little less neatly; multiple paradigms complicate matters enormously.
Before taking on the burden of mixed paradigms, the options within the dominant paradigm should
be exhausted. Even though some domain concepts don't present themselves as obvious objects,
they often can be modeled within the paradigm. Chapter 9 will discuss the modeling of unconventional types of concepts using object technology
The relational paradigm is a special case of paradigm mixing. The most common nonobject technology, the relational database is also more intimately related to the object model than other components, because it acts as the persistent store of the data that makes up the objects themselves.
Storing object data in relational databases will be discussed in Chapter 6, along with the many other
challenges of the object life cycle.
A Model Expressed in Software 73

---

## Sección 28: Chapter 4, we'll look at the principle of

-- 69 of 324 --

Chapter Six. The Life Cycle of a Domain
Object
Every object has a life cycle. An object is born, it likely goes through various states, and it eventually
dies—being either archived or deleted. Of course, many of these are simple, transient objects,
created with an easy call to their constructor, used in some computation, and then abandoned to
the garbage collector. There is no need to complicate such objects. But other objects have longer
lives, not all of which are spent in active memory. They have complex interdependencies with other
objects. They go through changes of state to which invariants apply. Managing these objects
presents challenges that can easily derail an attempt at
MODEL-DRIVEN DESIGN.
Figure 6.1. The life cycle of a domain object
The challenges fall into two categories.
1. Maintaining integrity throughout the life cycle
2. Preventing the model from getting swamped by the complexity of managing the life cycle
This chapter will address these issues through three patterns. First,
AGGREGATES tighten up the
model itself by defining clear ownership and boundaries, avoiding a chaotic, tangled web of objects.
This pattern is crucial to maintaining integrity in all phases of the life cycle.
-- 70 of 324 --

Next, the focus turns to the beginning of the life cycle, using
FACTORIES to create and reconstitute
complex objects and
AGGREGATES, keeping their internal structure encapsulated. Finally,
REPOSITORIES address the middle and end of the life cycle, providing the means of finding and
retrieving persistent objects while encapsulating the immense infrastructure involved.
Although
REPOSITORIES and
FACTORIES do not themselves come from the domain, they have
meaningful roles in the domain design. These constructs complete the
MODEL-DRIVEN DESIGN
by giving us accessible handles on the model objects.
Modeling
AGGREGATES and adding
FACTORIES and
REPOSITORIES to the design gives us the
ability to manipulate the model objects systematically and in meaningful units throughout their life
cycle.
AGGREGATES mark off the scope within which invariants have to be maintained at every
stage of the life cycle. F
ACTORIES and
REPOSITORIES operate on
AGGREGATES, encapsulating the complexity of specific life cycle transitions.
Aggregates
Minimalist design of associations helps simplify traversal and limit the explosion of relationships
somewhat, but most business domains are so interconnected that we still end up tracing long, deep
paths through object references. In a way, this tangle reflects the realities of the world, which seldom
obliges us with sharp boundaries. It is a problem in a software design.
Say you were deleting a Person object from a database. Along with the person go a name, birth
date, and job description. But what about the address? There could be other people at the same
address. If you delete the address, those Person objects will have references to a deleted object.
If you leave it, you accumulate junk addresses in the database. Automatic garbage collection could
eliminate the junk addresses, but that technical fix, even if available in your database system, ignores a basic modeling issue.
The Life Cycle of a Domain Object 75

-- 71 of 324 --

Even when considering an isolated transaction, the web of relationships in a typical object model
gives no clear limit to the potential effect of a change. It is not practical to refresh every object in the
system, just in case there is some dependency.
The problem is acute in a system with concurrent access to the same objects by multiple clients.
With many users consulting and updating different objects in the system, we have to prevent simultaneous changes to interdependent objects. Getting the scope wrong has serious consequences.
It is difficult to guarantee the consistency of changes to objects in a model with complex associations.
Invariants need to be maintained that apply to closely related groups of objects, not just discrete
objects. Yet cautious locking schemes cause multiple users to interfere pointlessly with each other
and make a system unusable.
Put another way, how do we know where an object made up of other objects begins and ends? In
any system with persistent storage of data, there must be a scope for a transaction that changes
data, and a way of maintaining the consistency of the data (that is, maintaining its invariants). Databases allow various locking schemes, and tests can be programmed. But these ad hoc solutions
divert attention away from the model, and soon you are back to hacking and hoping.
In fact, finding a balanced solution to these kinds of problems calls for deeper understanding of the
domain, this time extending to factors such as the frequency of change between the instances of
certain classes. We need to find a model that leaves high-contention points looser and strict invariants tighter.
Although this problem surfaces as technical difficulties in database transactions, it is rooted in the
model—in its lack of defined boundaries. A solution driven from the model will make the model easier
to understand and make the design easier to communicate. As the model is revised, it will guide
our changes to the implementation.
Schemes have been developed for defining ownership relationships in the model. The following
simple but rigorous system, distilled from those concepts, includes a set of rules for implementing
transactions that modify the objects and their owners.1
First we need an abstraction for encapsulating references within the model. An
AGGREGATE is a
cluster of associated objects that we treat as a unit for the purpose of data changes. Each
AGGREGATE has a root and a boundary. The boundary defines what is inside the
AGGREGATE. The
root is a single, specific
ENTITY contained in the
AGGREGATE. The root is the only member of the
AGGREGATE that outside objects are allowed to hold references to, although objects within the
boundary may hold references to each other.
ENTITIES other than the root have local identity, but
that identity needs to be distinguishable only within the
AGGREGATE, because no outside object
can ever see it out of the context of the root
ENTITY.
A model of a car might be used in software for an auto repair shop. The car is an
ENTITY with global
identity: we want to distinguish that car from all other cars in the world, even very similar ones. We
can use the vehicle identification number for this, a unique identifier assigned to each new car. We
might want to track the rotation history of the tires through the four wheel positions. We might want
to know the mileage and tread wear of each tire. To know which tire is which, the tires must be
identified
ENTITIES also. But it is very unlikely that we care about the identity of those tires outside
of the context of that particular car. If we replace the tires and send the old ones to a recycling plant,
either our software will no longer track them at all, or they will become anonymous members of a
heap of tires. No one will care about their rotation histories. More to the point, even while they are
attached to the car, no one will try to query the system to find a particular tire and then see which
car it is on. They will query the database to find a car and then ask it for a transient reference to the
1David Siegel devised and used this system on projects in the 1990s but has not published it.
The Life Cycle of a Domain Object 76

---

## Sección 29: Chapter 4, we'll look at the principle of

-- 72 of 324 --

tires. Therefore, the car is the root
ENTITY of the
AGGREGATE whose boundary encloses the tires
also. On the other hand, engine blocks have serial numbers engraved on them and are sometimes
tracked independently of the car. In some applications, the engine might be the root of its own
AGGREGATE.
Figure 6.2. Local versus global identity and object references
Invariants, which are consistency rules that must be maintained whenever data changes, will involve
relationships between members of the
AGGREGATE. Any rule that spans
AGGREGATES will not
be expected to be up-to-date at all times. Through event processing, batch processing, or other
update mechanisms, other dependencies can be resolved within some specified time. But the invariants applied within an
AGGREGATE will be enforced with the completion of each transaction.
Figure 6.3. AGGREGATE invariants
Now, to translate that conceptual
AGGREGATE into the implementation, we need a set of rules to
apply to all transactions.
• The root
ENTITY has global identity and is ultimately responsible for checking invariants.
• Root
ENTITIES have global identity. E
NTITIES inside the boundary have local identity, unique
only within the
AGGREGATE.
The Life Cycle of a Domain Object 77

-- 73 of 324 --

• Nothing outside the
AGGREGATE boundary can hold a reference to anything inside, except to
the root
ENTITY. The root
ENTITY can hand references to the internal
ENTITIES to other objects, but those objects can use them only transiently, and they may not hold on to the reference.
The root may hand a copy of a
VALUE OBJECT to another object, and it doesn't matter what
happens to it, because it's just a
VALUE and no longer will have any association with the
AGGREGATE.
• As a corollary to the previous rule, only
AGGREGATE roots can be obtained directly with database queries. All other objects must be found by traversal of associations.
• Objects within the
AGGREGATE can hold references to other
AGGREGATE roots.
• A delete operation must remove everything within the
AGGREGATE boundary at once. (With
garbage collection, this is easy. Because there are no outside references to anything but the
root, delete the root and everything else will be collected.)
• When a change to any object within the
AGGREGATE boundary is committed, all invariants of
the whole
AGGREGATE must be satisfied.
Cluster the ENTITIES and VALUE OBJECTS into AGGREGATES and define boundaries around
each. Choose one ENTITY to be the root of each AGGREGATE, and control all access to the objects
inside the boundary through the root. Allow external objects to hold references to the root only.
Transient references to internal members can be passed out for use within a single operation only.
Because the root controls access, it cannot be blindsided by changes to the internals. This arrangement makes it practical to enforce all invariants for objects in the AGGREGATE and for the
AGGREGATE as a whole in any state change.
It can be very helpful to have a technical framework that allows you to declare
AGGREGATES and
then automatically carries out the locking scheme and so forth. Without that assistance, the team
must have the self-discipline to agree on the
AGGREGATES and code consistently with them.
Example
Purchase Order Integrity
Consider the complications possible in a simplified purchase order system.
Figure 6.4. A model for a purchase order system
This diagram presents a pretty conventional view of a purchase order (PO), broken down into line
items, with an invariant rule that the sum of the line items can't exceed the limit for the PO as a
whole. The existing implementation has three interrelated problems.
1.
 Invariant enforcement. When a new line item is added, the PO checks the total and marks
itself invalid if an item pushes it over the limit. As we'll see, this is not adequate protection.
The Life Cycle of a Domain Object 78

-- 74 of 324 --

2.
 Change management. When the PO is deleted or archived, the line items are taken along,
but the model gives no guidance on where to stop following the relationships. There is also
confusion about the impact of changing the part price at different times.
3.
 Sharing the database. Multiple users are creating contention problems in the database.
Multiple users will be entering and updating various POs concurrently, and we have to prevent them
from messing up each other's work. Let's start with a very simple strategy, in which we lock any
object a user begins to edit until that user commits the transaction. So, when George is editing line
item 001, Amanda cannot access it. She can edit any other line item on any other PO (including
other items in the PO George is working on).
Figure 6.5. The initial condition of the PO stored in the database
Objects will be read from the database and instantiated in each user's memory space. There they
can be viewed and edited. Database locks will be requested only when an edit begins. So both
George and Amanda can work concurrently, as long as they stay away from each other's items. All
is well . . . until both George and Amanda start working on separate line items in the same PO.
Figure 6.6. Simultaneous edits in distinct transactions
Everything looks fine to both users and to their software because they ignore changes to other parts
of the database that happen during the transaction, and neither locked line item is involved in the
other user's change.
The Life Cycle of a Domain Object 79

-- 75 of 324 --

Figure 6.7. The resulting PO violates the approval limit (broken invariant).
After both users have saved their changes, a PO is stored in the database that violates the invariant
of the domain model. An important business rule has been broken. And nobody even knows.
Clearly, locking a single line item isn't an adequate safeguard. If instead we had locked an entire
PO at a time, the problem would have been prevented.
Figure 6.8. Locking the entire PO allows the invariant to be enforced.
The program will not allow this transaction to be saved until Amanda has resolved the problem,
perhaps by raising the limit or by eliminating a guitar. This mechanism prevents the problem, and it
may be a fine solution if work is mostly spread widely across many POs. But if multiple people
typically work simultaneously on different line items of a large PO, then this locking will get cumbersome.
Even assuming many small POs, there are other ways to violate the assertion. Consider that “part.”
If someone changed the price of a trombone while Amanda was adding to her order, wouldn't that
violate the invariant too?
Let's try locking the part in addition to the entire PO. Here's what happens when George, Amanda,
and Sam are working on
different POs:
The Life Cycle of a Domain Object 80

---

## Sección 30: Chapter 4, we'll look at the principle of

-- 76 of 324 --

Figure 6.9. Over-cautious locking is interfering with people's work.
The inconvenience is mounting, because there is a lot of contention for the instruments (the “parts”).
And then:
Figure 6.10. Deadlock
Those three will be waiting a while.
At this point we can begin to improve the model by incorporating the following knowledge of the
business:
1. Parts are used in many POs (high contention).
2. There are fewer changes to parts than there are to POs.
3. Changes to part prices do not necessarily propagate to existing POs. It depends on the time
of a price change relative to the status of the PO.
Point 3 is particularly obvious when we consider archived POs that have already been delivered.
They should, of course, show the prices as of the time they were filled, rather than current prices.
The Life Cycle of a Domain Object 81

-- 77 of 324 --

Figure 6.11. Price is copied into Line Item. AGGREGATE invariant can now be enforced.
An implementation consistent with this model would guarantee the invariant relating PO and its
items, while changes to the price of a part would not have to immediately affect the items that
reference it. Broader consistency rules could be addressed in other ways. For example, the system
could present a queue of items with outdated prices to the users each day, so they could update or
exempt each one. But this is not an invariant that must be enforced at all times. By making the
dependency of line items on parts looser, we avoid contention and reflect the realities of the business
better. At the same time, tightening the relationship of the PO and its line items guarantees that an
important business rule will be followed.
The
AGGREGATE imposes an ownership of the PO and its items that is consistent with business
practice. The creation and deletion of a PO and items are naturally tied together, while the creation
and deletion of parts is independent.
AGGREGATES mark off the scope within which invariants have to be maintained at every stage of
the life cycle. The following patterns,
FACTORIES and
REPOSITORIES, operate on
AGGREGATES, encapsulating the complexity of specific life cycle transitions. . . .
The Life Cycle of a Domain Object 82

-- 78 of 324 --

Factories
When creation of an object, or an entire
AGGREGATE, becomes complicated or reveals too much
of the internal structure,
FACTORIES provide encapsulation.
Much of the power of objects rests in the intricate configuration of their internals and their associations. An object should be distilled until nothing remains that does not relate to its meaning or support
its role in interactions. This mid-life cycle responsibility is plenty. Problems arise from overloading
a complex object with responsibility for its own creation.
A car engine is an intricate piece of machinery, with dozens of parts collaborating to perform the
engine's responsibility: to turn a shaft. One could imagine trying to design an engine block that could
grab on to a set of pistons and insert them into its cylinders, spark plugs that would find their sockets
and screw themselves in. But it seems unlikely that such a complicated machine would be as reliable
or as efficient as our typical engines are. Instead, we accept that something else will assemble the
pieces. Perhaps it will be a human mechanic or perhaps it will be an industrial robot. Both the robot
and the human are actually more complex than the engine they assemble. The job of assembling
parts is completely unrelated to the job of spinning a shaft. The assemblers function only during the
creation of the car—you don't need a robot or a mechanic with you when you're driving. Because
cars are never assembled and driven at the same time, there is no value in combining both of these
functions into the same mechanism. Likewise, assembling a complex compound object is a job that
is best separated from whatever job that object will have to do when it is finished.
But shifting responsibility to the other interested party, the client object in the application, leads to
even worse problems. The client knows what job needs to be done and relies on the domain objects
to carry out the necessary computations. If the client is expected to assemble the domain objects it
needs, it must know something about the internal structure of the object. In order to enforce all the
The Life Cycle of a Domain Object 83

-- 79 of 324 --

invariants that apply to the relationship of parts in the domain object, the client must know some of
the object's rules. Even calling constructors couples the client to the concrete classes of the objects
it is building. No change to the implementation of the domain objects can be made without changing
the client, making refactoring harder.
A client taking on object creation becomes unnecessarily complicated and blurs its responsibility. It
breaches the encapsulation of the domain objects and the
AGGREGATES being created. Even
worse, if the client is part of the application layer, then responsibilities have leaked out of the domain
layer altogether. This tight coupling of the application to the specifics of the implementation strips
away most of the benefits of abstraction in the domain layer and makes continuing changes ever
more expensive.
Creation of an object can be a major operation in itself, but complex assembly operations do not fit
the responsibility of the created objects. Combining such responsibilities can produce ungainly designs that are hard to understand. Making the client direct construction muddies the design of the
client, breaches encapsulation of the assembled object or AGGREGATE, and overly couples the
client to the implementation of the created object.
Complex object creation is a responsibility of the domain layer, yet that task does not belong to the
objects that express the model. There are some cases in which an object creation and assembly
corresponds to a milestone significant in the domain, such as “open a bank account.” But object
creation and assembly usually have no meaning in the domain; they are a necessity of the implementation. To solve this problem, we have to add constructs to the domain design that are not
ENTITIES, VALUE OBJECTS, or
SERVICES. This is a departure from the previous chapter, and it
is important to make the point clear: We are adding elements to the design that do not correspond
to anything in the model, but they are nonetheless part of the domain layer's responsibility.
Every object-oriented language provides a mechanism for creating objects (constructors in Java
and C++, instance creation class methods in Smalltalk, for example), but there is a need for more
abstract construction mechanisms that are decoupled from the other objects. A program element
whose responsibility is the creation of other objects is called a
FACTORY.
Figure 6.12. Basic interactions with a FACTORY
Just as the interface of an object should encapsulate its implementation, thus allowing a client to
use the object's behavior without knowing how it works, a
FACTORY encapsulates the knowledge
needed to create a complex object or
AGGREGATE. It provides an interface that reflects the goals
of the client and an abstract view of the created object.
Therefore:
Shift the responsibility for creating instances of complex objects and AGGREGATES to a separate
object, which may itself have no responsibility in the domain model but is still part of the domain
design. Provide an interface that encapsulates all complex assembly and that does not require the
client to reference the concrete classes of the objects being instantiated. Create entire AGGREGATES as a piece, enforcing their invariants.
The Life Cycle of a Domain Object 84

---

## Sección 31: Chapter 4, we'll look at the principle of

-- 80 of 324 --

There are many ways to design
FACTORIES. Several special-purpose creation patterns—
FACTORY METHOD, ABSTRACT FACTORY, and
BUILDER—were thoroughly treated in Gamma et
al. 1995. That book mostly explored patterns for the most difficult object construction problems. The
point here is not to delve deeply into designing
FACTORIES, but rather to show the place of
FACTORIES as important components of a domain design. Proper use of
FACTORIES can help keep
a
MODEL-DRIVEN DESIGN on track.
The two basic requirements for any good
FACTORY are
1. Each creation method is atomic and enforces all invariants of the created object or
AGGREGATE. A
FACTORY should only be able to produce an object in a consistent state. For an
ENTITY, this means the creation of the entire
AGGREGATE, with all invariants satisfied, but
probably with optional elements still to be added. For an immutable
VALUE OBJECT, this
means that all attributes are initialized to their correct final state. If the interface makes it
possible to request an object that can't be created correctly, then an exception should be raised
or some other mechanism should be invoked that will ensure that no improper return value is
possible.
2. The
FACTORY should be abstracted to the type desired, rather than the concrete class(es)
created. The sophisticated
FACTORY patterns in Gamma et al. 1995 help with this.
Choosing FACTORIES and Their Sites
Generally speaking, you create a factory to build something whose details you want to hide, and
you place the
FACTORY where you want the control to be. These decisions usually revolve around
AGGREGATES.
For example, if you needed to add elements inside a preexisting
AGGREGATE, you might create
a
FACTORY METHOD on the root of the
AGGREGATE. This hides the implementation of the interior
of the
AGGREGATE from any external client, while giving the root responsibility for ensuring the
integrity of the
AGGREGATE as elements are added, as shown in Figure 6.13 on the next page.
Figure 6.13. A FACTORY METHOD encapsulates expansion of an AGGREGATE.
The Life Cycle of a Domain Object 85

-- 81 of 324 --

Another example would be to place a
FACTORY METHOD on an object that is closely involved in
spawning another object, although it doesn't own the product once it is created. When the data and
possibly the rules of one object are very dominant in the creation of an object, this saves pulling
information out of the spawner to be used elsewhere to create the object. It also communicates the
special relationship between the spawner and the product.
In Figure 6.14, the Trade Order is not part of the same
AGGREGATE as the Brokerage Account
because, for a start, it will go on to interact with the trade execution application, where the Brokerage
Account would only be in the way. Even so, it seems natural to give the Brokerage Account control
over the creation of Trade Orders. The Brokerage Account contains information that will be embedded in the Trade Order (starting with its own identity), and it contains rules that govern what
trades are allowed. We might also benefit from hiding the implementation of Trade Order. For example, it might be refactored into a hierarchy, with separate subclasses for Buy Order and Sell
Order. The
FACTORY keeps the client from being coupled to the concrete classes.
Figure 6.14. A FACTORY METHOD spawns an ENTITY that is not part of the same AGGREGATE.
A
FACTORY is very tightly coupled to its product, so a
FACTORY should be attached only to an
object that has a close natural relationship with the product. When there is something we want to
hide—either the concrete implementation or the sheer complexity of construction—yet there doesn't
seem to be a natural host, we must create a dedicated
FACTORY object or
SERVICE. A standalone
FACTORY usually produces an entire
AGGREGATE, handing out a reference to the root, and ensuring that the product
AGGREGATE'S invariants are enforced. If an object interior to an
AGGREGATE needs a
FACTORY, and the
AGGREGATE root is not a reasonable home for it, then go
ahead and make a standalone
FACTORY. But respect the rules limiting access within an
AGGREGATE, and make sure there are only transient references to the product from outside the
AGGREGATE.
Figure 6.15. A standalone FACTORY builds AGGREGATE.
When a Constructor Is All You Need
I've seen far too much code in which
all instances are created by directly calling class constructors,
or whatever the primitive level of instance creation is for the programming language. The introduction
of
FACTORIES has great advantages, and is generally underused. Yet there are times when the
directness of a constructor makes it the best choice. F
ACTORIES can actually obscure simple objects that don't use polymorphism.
The trade-offs favor a bare, public constructor in the following circumstances.
The Life Cycle of a Domain Object 86

-- 82 of 324 --

• The class is the type. It is not part of any interesting hierarchy, and it isn't used polymorphically
by implementing an interface.
• The client cares about the implementation, perhaps as a way of choosing a
STRATEGY.
• All of the attributes of the object are available to the client, so that no object creation gets nested
inside the constructor exposed to the client.
• The construction is not complicated.
• A public constructor must follow the same rules as a
FACTORY: It must be an atomic operation
that satisfies all invariants of the created object.
Avoid calling constructors within constructors of other classes. Constructors should be dead simple.
Complex assemblies, especially of
AGGREGATES, call for
FACTORIES. The threshold for choosing to use a little
FACTORY METHOD isn't high.
The Java class library offers interesting examples. All collections implement interfaces that decouple
the client from the concrete implementation. Yet they are all created by direct calls to constructors.
A
FACTORY could have encapsulated the collection hierarchy. The
FACTORY's methods could
have allowed a client to ask for the features it needed, with the
FACTORY selecting the appropriate
class to instantiate. Code that created collections would be more expressive, and new collection
classes could be installed without breaking every Java program.
But there is a case in favor of the concrete constructors. First, the choice of implementation can be
performance sensitive for many applications, so an application might want control. (Even so, a really
smart
FACTORY could accommodate such factors.) Anyway, there aren't very many collection
classes, so it isn't that complicated to choose.
The abstract collection types preserve some value in spite of the lack of a
FACTORY because of
their usage patterns. Collections are very often created in one place and used in another. This
means that the client that ultimately uses the collection—adding, removing, and retrieving its contents—can still talk to the interface and be decoupled from the implementation. The selection of a
collection class typically falls to the object that owns the collection, or to the owning object's
FACTORY.
Designing the Interface
When designing the method signature of a
FACTORY, whether standalone or
FACTORY
METHOD, keep in mind these two points.
•
Each operation must be atomic. You have to pass in everything needed to create a complete
product in a single interaction with the
FACTORY. You also have to decide what will happen if
creation fails, in the event that some invariant isn't satisfied. You could throw an exception or
just return a null. To be consistent, consider adopting a coding standard for failures in
FACTORIES.
•
The FACTORY
will be coupled to its arguments. If you are not careful in your selection of input
parameters, you can create a rat's nest of dependencies. The degree of coupling will depend
on what you do with the argument. If it is simply plugged into the product, you've created a
modest dependency. If you are picking parts out of the argument to use in the construction, the
coupling gets tighter.
The safest parameters are those from a lower design layer. Even within a layer, there tend to be
natural strata with more basic objects that are used by higher level objects. (Such layering will be
discussed in different ways in Chapter 10, “Supple Design,” and again in Chapter 16, “Large-Scale
Structure.”)
The Life Cycle of a Domain Object 87

---

## Sección 32: Chapter 4, we'll look at the principle of

-- 83 of 324 --

Another good choice of parameter is an object that is closely related to the product in the model, so
that no new dependency is being added. In the earlier example of a Purchase Order Item, the
FACTORY METHOD takes a Catalog Part as an argument, which is an essential association for
the Item. This adds a direct dependency between the Purchase Order class and the Part. But these
three objects form a close conceptual group. The Purchase Order's
AGGREGATE already referenced the Part, anyway. So giving control to the
AGGREGATE root and encapsulating the
AGGREGATE'S internal structure is a good trade-off.
Use the abstract type of the arguments, not their concrete classes. The
FACTORY is coupled to the
concrete class of the products; it does not need to be coupled to concrete parameters also.
Where Does Invariant Logic Go?
A
FACTORY is responsible for ensuring that all invariants are met for the object or
AGGREGATE
it creates; yet you should always think twice before removing the rules applying to an object outside
that object. The
FACTORY can delegate invariant checking to the product, and this is often best.
But
FACTORIES have a special relationship with their products. They already know their product's
internal structure, and their entire reason for being involves the implementation of their product.
Under some circumstances, there are advantages to placing invariant logic in the
FACTORY and
reducing clutter in the product. This is especially appealing with
AGGREGATE rules (which span
many objects). It is especially
unappealing with
FACTORY METHODS attached to other domain
objects.
Although in principle invariants apply at the end of every operation, often the transformations allowed
to the object can never bring them into play. There might be a rule that applies to the assignment
of the identity attributes of an
ENTITY. But after creation that identity is immutable. V
ALUE OBJECTS are completely immutable. An object doesn't need to carry around logic that will never be
applied in its active lifetime. In such cases, the
FACTORY is a logical place to put invariants, keeping
the product simpler.
ENTITY FACTORIES Versus VALUE OBJECT FACTORIES
ENTITY FACTORIES differ from
VALUE OBJECT FACTORIES in two ways. V
ALUE OBJECTS are
Immutable; the product comes out complete in its final form. So the
FACTORY operations have to
allow for a full description of the product. E
NTITY FACTORIES tend to take just the essential attributes required to make a valid
AGGREGATE. Details can be added later if they are not required
by an invariant.
Then there are the issues involved in assigning identity to an
ENTITY—irrelevant to a
VALUE OBJECT. As pointed out in Chapter 5, an identifier can either be assigned automatically by the program
or supplied from the outside, typically by the user. If a customer's identity is to be tracked by the
telephone number, then that telephone number must obviously be passed in as an argument to the
FACTORY. When the program is assigning an identifier, the
FACTORY is a good place to control
it. Although the actual generation of a unique tracking ID is typically done by a database “sequence”
or other infrastructure mechanism, the
FACTORY knows what to ask for and where to put it.
Reconstituting Stored Objects
Up to this point, the
FACTORY has played its part in the very beginning of an object's life cycle. At
some point, most objects get stored in databases or transmitted through a network, and few current
database technologies retain the object character of their contents. Most transmission methods
flatten an object into an even more limited presentation. Therefore, retrieval requires a potentially
complex process of reassembling the parts into a live object.
The Life Cycle of a Domain Object 88

-- 84 of 324 --

A
FACTORY used for reconstitution is very similar to one used for creation, with two major differences.
1.
 An ENTITY FACTORY
used for reconstitution does not assign a new tracking ID. To do so
would lose the continuity with the object's previous incarnation. So identifying attributes must
be part of the input parameters in a FACTORY reconstituting a stored object.
2.
 A FACTORY
reconstituting an object will handle violation of an invariant differently. During
creation of a new object, a FACTORY should simply balk when an invariant isn't met, but a
more flexible response may be necessary in reconstitution. If an object already exists somewhere in the system (such as in the database), this fact cannot be ignored. Yet we also can't
ignore the rule violation. There has to be some strategy for repairing such inconsistencies,
which can make reconstitution more challenging than the creation of new objects.
Figures 6.16 and 6.17 (on the next page) show two kinds of reconstitution. Object-mapping technologies may provide some or all of these services in the case of database reconstitution, which is
convenient. Whenever there is exposed complexity in reconstituting an object from another medium,
the
FACTORY is a good option.
Figure 6.16. Reconstituting an ENTITY retrieved from a relational database
Figure 6.17. Reconstituting an ENTITY transmitted as XML
The Life Cycle of a Domain Object 89

-- 85 of 324 --

To sum up, the access points for creation of instances must be identified, and their scope must be
defined explicitly. They may simply be constructors, but often there is a need for a more abstract or
elaborate instance creation mechanism. This need introduces new constructs into the design:
FACTORIES. F
ACTORIES usually do not express any part of the model, yet they are a part of the domain
design that helps keep the model-expressing objects sharp.
A
FACTORY encapsulates the life cycle transitions of creation and reconstitution. Another transition
that exposes technical complexity that can swamp the domain design is the transition to and from
storage. This transition is the responsibility of another domain design construct, the
REPOSITORY.
Repositories
Associations allow us to find an object based on its relationship to another. But we must have a
starting point for a traversal to an
ENTITY or
VALUE in the middle of its life cycle.
To do anything with an object, you have to hold a reference to it. How do you get that reference?
One way is to create the object, as the creation operation will return a reference to the new object.
A second way is to traverse an association. You start with an object you already know and ask it for
an associated object. Any object-oriented program is going to do a lot of this, and these links give
object models much of their expressive power. But you have to get that first object.
I actually encountered a project once in which the team was attempting, in an enthusiastic embrace
of
MODEL-DRIVEN DESIGN, to do
all object access by creation or traversal! Their objects resided
in an object database, and they reasoned that existing conceptual relationships would provide all
necessary associations. They needed only to analyze them enough, making their entire domain
model cohesive. This self-imposed limitation forced them to create just the kind of endless tangle
The Life Cycle of a Domain Object 90

---

## Sección 33: Chapter 4, we'll look at the principle of

-- 86 of 324 --

that we have been trying to avert over the last few chapters, with careful implementation of
ENTITIES and application of
AGGREGATES. The team members didn't stick with this strategy long, but
they never replaced it with another coherent approach. They cobbled together ad hoc solutions and
became less ambitious.
Few would even think of this approach, much less be tempted by it, because they store most of their
objects in relational databases. This storage technology makes it natural to use the third way of
getting a reference: Execute a query to find the object in a database based on its attributes, or find
the constituents of an object and then reconstitute it.
A database search is globally accessible and makes it possible to go directly to any object. There
is no need for all objects to be interconnected, which allows us to keep the web of objects manageable. Whether to provide a traversal or depend on a search becomes a design decision, trading
off the decoupling of the search against the cohesiveness of the association. Should the Customer
object hold a collection of all the Orders placed? Or should the Orders be found in the database,
with a search on the Customer ID field? The right combination of search and association makes the
design comprehensible.
Unfortunately, developers don't usually get to think much about such design subtleties, because
they are swimming in the sea of mechanisms needed to pull off the trick of storing an object and
bringing it back—and eventually removing it from storage.
Now from a technical point of view, retrieval of a stored object is really a subset of creation, because
the data from the database is used to assemble new objects. Indeed, the code that usually has to
be written makes it hard to forget this reality. But conceptually, this is the
middle of the life cycle of
an
ENTITY. A Customer object does not represent a new customer just because we stored it in a
database and retrieved it. To keep this distinction in mind, I refer to the creation of an instance from
stored data as
reconstitution.
The goal of domain-driven design is to create better software by focusing on a model of the domain
rather than the technology. By the time a developer has constructed an SQL query, passed it to a
query service in the infrastructure layer, obtained a result set of table rows, pulled the necessary
information out, and passed it to a constructor or
FACTORY, the model focus is gone. It becomes
natural to think of the objects as containers for the data that the queries provide, and the whole
design shifts toward a data-processing style. The details of the technology vary, but the problem
remains that the client is dealing with technology, rather than model concepts. Infrastructure such
as
METADATA MAPPING LAYERS (Fowler 2002) help a great deal, by making easier the conversion of the query result into objects, but the developer is still thinking about technical mechanisms,
not the domain. Worse, as client code uses the database directly, developers are tempted to bypass
model features such as
AGGREGATES, or even object encapsulation, instead directly taking and
manipulating the data they need. More and more domain rules become embedded in query code
or simply lost. Object databases do eliminate the conversion problem, but search mechanisms are
usually still mechanistic, and developers are still tempted to grab whatever objects they want.
A client needs a practical means of acquiring references to preexisting domain objects. If the infrastructure makes it easy to do so, the developers of the client may add more traversable associations,
muddling the model. On the other hand, they may use queries to pull the exact data they need from
the database, or to pull a few specific objects rather than navigating from AGGREGATE roots.
Domain logic moves into queries and client code, and the ENTITIES and VALUE OBJECTS become
mere data containers. The sheer technical complexity of applying most database access infrastructure quickly swamps the client code, which leads developers to dumb down the domain layer, which
makes the model irrelevant.
Drawing on the design principles discussed so far, we can reduce the scope of the object access
problem somewhat, assuming that we find a method of access that keeps the model focus sharp
enough to employ those principles. For starters, we need not concern ourselves with transient objects. Transients (typically
VALUE OBJECTS) live brief lives, used in the client operation that created
The Life Cycle of a Domain Object 91

-- 87 of 324 --

them and then discarded. We also need no query access for persistent objects that are more convenient to find by traversal. For example, the address of a person could be requested from the
Person object. And most important,
any object internal to an AGGREGATE
is prohibited from access
except by traversal from the root.
Persistent
VALUE OBJECTS are usually found by traversal from some
ENTITY that acts as the root
of the
AGGREGATE that encapsulates them. In fact, a global search access to a
VALUE is often
meaningless, because finding a
VALUE by its properties would be equivalent to creating a new
instance with those properties. There are exceptions, though. For example, when I am planning
travel online, I sometimes save a few prospective itineraries and return later to select one to book.
Those itineraries are
VALUES (if there were two made up of the same flights, I would not care which
was which), but they have been associated with my user name and retrieved for me intact. Another
case would be an “enumeration,” when a type has a strictly limited, predetermined set of possible
values. Global access to
VALUE OBJECTS is much less common than for
ENTITIES, though, and
if you find you need to search the database for a preexisting
VALUE, it is worth considering the
possibility that you've really got an
ENTITY whose identity you haven't recognized.
From this discussion, it is clear that most objects should not be accessed by a global search. It would
be nice for the design to communicate those that do.
Now the problem can be restated more precisely.
A subset of persistent objects must be globally accessible through a search based on object attributes. Such access is needed for the roots of AGGREGATES that are not convenient to reach by
traversal. They are usually ENTITIES, sometimes VALUE OBJECTS with complex internal structure, and sometimes enumerated VALUES. Providing access to other objects muddies important
distinctions. Free database queries can actually breach the encapsulation of domain objects and
AGGREGATES. Exposure of technical infrastructure and database access mechanisms complicates the client and obscures the MODEL-DRIVEN DESIGN.
There is a raft of techniques for dealing with the technical challenges of database access. Examples
include encapsulating SQL into
QUERY OBJECTS or translating between objects and tables with
METADATA MAPPING LAYERS (Fowler 2002).
FACTORIES can help reconstitute stored objects
(as discussed later in this chapter). These and many other techniques help keep a lid on complexity.
But even so, take note of what has been lost. We are no longer thinking about concepts in our
domain model. Our code will not be communicating about the business; it will be manipulating the
technology of data retrieval. The
REPOSITORY pattern is a simple conceptual framework to encapsulate those solutions and bring back our model focus.
A
REPOSITORY represents all objects of a certain type as a conceptual set (usually emulated). It
acts like a collection, except with more elaborate querying capability. Objects of the appropriate type
are added and removed, and the machinery behind the
REPOSITORY inserts them or deletes them
from the database. This definition gathers a cohesive set of responsibilities for providing access to
the roots of
AGGREGATES from early life cycle through the end.
Clients request objects from the
REPOSITORY using query methods that select objects based on
criteria specified by the client, typically the value of certain attributes. The
REPOSITORY retrieves
the requested object, encapsulating the machinery of database queries and metadata mapping.
R
EPOSITORIES can implement a variety of queries that select objects based on whatever criteria
the client requires. They can also return summary information, such as a count of how many instances meet some criteria. They can even return summary calculations, such as the total across
all matching objects of some numerical attribute.
The Life Cycle of a Domain Object 92

---

## Sección 34: Chapter 4, we'll look at the principle of

-- 88 of 324 --

Figure 6.18. A REPOSITORY doing a search for a client
A
REPOSITORY lifts a huge burden from the client, which can now talk to a simple, intentionrevealing interface, and ask for what it needs in terms of the model. To support all this requires a
lot of complex technical infrastructure, but the interface is simple and conceptually connected to the
domain model.
Therefore:
For each type of object that needs global access, create an object that can provide the illusion of
an in-memory collection of all objects of that type. Set up access through a well-known global interface. Provide methods to add and remove objects, which will encapsulate the actual insertion or
removal of data in the data store. Provide methods that select objects based on some criteria and
return fully instantiated objects or collections of objects whose attribute values meet the criteria,
thereby encapsulating the actual storage and query technology. Provide REPOSITORIES only for
AGGREGATE roots that actually need direct access. Keep the client focused on the model, delegating all object storage and access to the REPOSITORIES.
R
EPOSITORIES have many advantages, including the following:
• They present clients with a simple model for obtaining persistent objects and managing their life
cycle.
• They decouple application and domain design from persistence technology, multiple database
strategies, or even multiple data sources.
• They communicate design decisions about object access.
• They allow easy substitution of a dummy implementation, for use in testing (typically using an
in-memory collection).
Querying a REPOSITORY
All repositories provide methods that allow a client to request objects matching some criteria, but
there is a range of options of how to design this interface.
The easiest
REPOSITORY to build has hard-coded queries with specific parameters. These queries
can be various: retrieving an
ENTITY by its identity (provided by almost all
REPOSITORIES); requesting a collection of objects with a particular attribute value or a complex combination of parameters; selecting objects based on value ranges (such as date ranges); and even performing some
calculations that fall within the general responsibility of a
REPOSITORY (especially drawing on
operations supported by the underlying database).
Although most queries return an object or a collection of objects, it also fits within the concept to
return some types of summary calculations, such as an object count, or a sum of a numerical attribute that was intended by the model to be tallied.
The Life Cycle of a Domain Object 93

-- 89 of 324 --

Figure 6.19. Hard-coded queries in a simple REPOSITORY
Hard-coded queries can be built on top of any infrastructure and without a lot of investment, because
they do just what some client would have had to do anyway.
On projects with a lot of querying, a
REPOSITORY framework can be built that allows more flexible
queries. This calls for a staff familiar with the necessary technology and is greatly aided by a supportive infrastructure.
One particularly apt approach to generalizing
REPOSITORIES through a framework is to use
SPECIFICATION-based queries. A
SPECIFICATION allows a client to describe (that is, specify)
what it wants without concern for how it will be obtained. In the process, an object that can actually
carry out the selection is created. This pattern will be discussed in depth in Chapter 9.
Figure 6.20. A flexible, declarative SPECIFICATION of search criteria in a sophisticated REPOSITORY
The
SPECIFICATION-based query is elegant and flexible. Depending on the infrastructure available, it may be a modest framework or it may be prohibitively difficult. Rob Mee and Edward Hieatt
discuss more of the technical issues involved in designing such
REPOSITORIES in Fowler 2002.
Even a
REPOSITORY design with flexible queries should allow for the addition of specialized hardcoded queries. They might be convenience methods that encapsulate an often-used query or a
query that doesn't return the objects themselves, such as a mathematical summary of selected
objects. Frameworks that don't allow for such contingencies tend to distort the domain design or get
bypassed by developers.
Client Code Ignores REPOSITORY Implementation; Developers Do Not
Encapsulation of the persistence technology allows the client to be very simple, completely decoupled from the implementation of the
REPOSITORY. But as is often the case with encapsulation, the
developer must understand what is happening under the hood. The performance implications can
be extreme when
REPOSITORIES are used in different ways or work in different ways.
Kyle Brown told me the story of getting called in on a manufacturing application based on WebSphere that was being rolled out to production. The system was mysteriously running out of memory
after a few hours of use. Kyle browsed through the code and found the reason: At one point, they
were summarizing some information about every item in the plant. The developers had done this
using a query called “all objects,” which instantiated each of the objects and then selected the bits
they needed. This code had the effect of bringing the entire database into memory at once! The
problem hadn't shown up in testing because of the small amount of test data.
The Life Cycle of a Domain Object 94

-- 90 of 324 --

This is an obvious nono, but much more subtle oversights can present equally serious problems.
Developers need to understand the implications of using encapsulated behavior. That does not have
to mean detailed familiarity with the implementation. Well-designed components can be characterized. (This is one of the main points of Chapter 10, “Supple Design.”)
As was discussed in Chapter 5, the underlying technology may constrain your modeling choices.
For example, a relational database can place a practical limit on deep compositional object structures. In just the same way, there must be feedback to developers in both directions between the
use of the
REPOSITORY and the implementation of its queries.
Implementing a REPOSITORY
Implementation will vary greatly, depending on the technology being used for persistence and the
infrastructure you have. The ideal is to hide all the inner workings from the client (although not from
the developer of the client), so that client code will be the same whether the data is stored in an
object database, stored in a relational database, or simply held in memory. The
REPOSITORY will
delegate to the appropriate infrastructure services to get the job done. Encapsulating the mechanisms of storage, retrieval, and query is the most basic feature of a
REPOSITORY implementation.
Figure 6.21. The REPOSITORY encapsulates the underlying data store.
The
REPOSITORY concept is adaptable to many situations. The possibilities of implementation are
so diverse that I can only list some concerns to keep in mind.
•
Abstract the type. A
REPOSITORY “contains” all instances of a specific type, but this does not
mean that you need one
REPOSITORY for each class. The type could be an abstract superclass
of a hierarchy (for example, a TradeOrder could be a BuyOrder or a Sell-Order). The type could
be an interface whose implementers are not even hierarchically related. Or it could be a specific
concrete class. Keep in mind that you may well face constraints imposed by the lack of such
polymorphism in your database technology.
•
Take advantage of the decoupling from the client. You have more freedom to change the implementation of a
REPOSITORY than you would if the client were calling the mechanisms directly. You can take advantage of this to optimize for performance, by varying the query technique or by caching objects in memory, freely switching persistence strategies at any time. You
can facilitate testing of the client code and the domain objects by providing an easily manipulated, dummy in-memory strategy.
The Life Cycle of a Domain Object 95

---

## Sección 35: Chapter 4, we'll look at the principle of

-- 91 of 324 --

•
Leave transaction control to the client. Although the
REPOSITORY will insert into and delete
from the database, it will ordinarily not commit anything. It is tempting to commit after saving,
for example, but the client presumably has the context to correctly initiate and commit units of
work. Transaction management will be simpler if the
REPOSITORY keeps its hands off.
Typically teams add a framework to the infrastructure layer to support the implementation of
REPOSITORIES. In addition to the collaboration with the lower level infrastructure components, the
REPOSITORY superclass might implement some basic queries, especially when a flexible query
is being implemented. Unfortunately, with a type system such as Java's, this approach would force
you to type returned objects as “Object,” leaving the client to cast them to the
REPOSITORY'S
contained type. But of course, this will have to be done with queries that return collections anyway
in Java.
Some additional guidance on implementing
REPOSITORIES and some of their supporting technical
patterns such as
QUERY OBJECT can be found in Fowler (2002).
Working Within Your Frameworks
Before implementing something like a
REPOSITORY, you need to think carefully about the infrastructure you are committed to, especially any architectural frameworks. You may find that the
framework provides services you can use to easily create a
REPOSITORY, or you may find that the
framework fights you all the way. You may discover that the architectural framework has already
defined an equivalent pattern of getting persistent objects. Or you may discover that it has defined
a pattern that is not like a
REPOSITORY at all.
For example, your project might be committed to J2EE. Looking for conceptual affinities between
the framework and the patterns of
MODEL-DRIVEN DESIGN (and keeping in mind that an entity
bean is
not the same thing as an
ENTITY), you may have chosen to use entity beans to correspond
to
AGGREGATE roots. The construct within the architectural framework of J2EE that is responsible
for providing access to these objects is the “EJB Home.” Trying to dress up the EJB Home to look
like a
REPOSITORY could lead to other problems.
In general, don't fight your frameworks. Seek ways to keep the fundamentals of domain-driven
design and let go of the specifics when the framework is antagonistic. Look for affinities between
the concepts of domain-driven design and the concepts in the framework. This is assuming that you
have no choice but to use the framework. Many J2EE projects don't use entity beans at all. If you
have the freedom, choose frameworks, or parts of frameworks, that are harmonious with the style
of design you want to use.
The Relationship with FACTORIES
A
FACTORY handles the beginning of an object's life; a
REPOSITORY helps manage the middle
and the end. When objects are being held in memory, or stored in an object database, this is
straightforward. But typically there is at least some object storage in relational databases, files, or
other, non-object-oriented systems. In such cases, the retrieved data must be reconstituted into
object form.
Because the
REPOSITORY is, in this case, creating objects based on data, many people consider
the
REPOSITORY to
be a
FACTORY—indeed it is, from a technical point of view. But it is more
useful to keep the model in the forefront, and as mentioned before, the reconstitution of a stored
object is not the creation of a new conceptual object. In this domain-driven view of the design,
FACTORIES and
REPOSITORIES have distinct responsibilities. The
FACTORY makes new objects; the
REPOSITORY finds old objects. The client of a
REPOSITORY should be given the illusion
that the objects are in memory. The object may have to be reconstituted (yes, a new instance may
be created), but it is the same conceptual object, still in the middle of its life cycle.
The Life Cycle of a Domain Object 96

-- 92 of 324 --

These two views can be reconciled by making the
REPOSITORY delegate object creation to a
FACTORY, which (in theory, though seldom in practice) could also be used to create objects from
scratch.
Figure 6.22. A REPOSITORY uses a FACTORY to reconstitute a preexisting object.
This clear separation also helps by unloading all responsibility for persistence from the
FACTORIES. A
FACTORY'S job is to instantiate a potentially complex object from data. If the product is a
new object, the client will know this and can add it to the
REPOSITORY, which will encapsulate the
storage of the object in the database.
Figure 6.23. A client uses a REPOSITORY to store a new object.
One other case that drives people to combine
FACTORY and
REPOSITORY is the desire for “find
or create” functionality, in which a client can describe an object it wants and, if no such object is
found, will be given a newly created one. This function should be avoided. It is a minor convenience
at best. A lot of cases in which it seems useful go away when
ENTITIES and
VALUE OBJECTS are
distinguished. A client that wants a
VALUE OBJECT can go straight to a
FACTORY and ask for a
new one. Usually, the distinction between a new object and an existing object is important in the
domain, and a framework that transparently combines them will actually muddle the situation.
The Life Cycle of a Domain Object 97

-- 93 of 324 --

Designing Objects for Relational Databases
The most common nonobject component of primarily object-oriented software systems is the relational database. This reality presents the usual problems of a mixture of paradigms (see Chapter
5). But the database is more intimately related to the object model than are most other components.
The database is not just interacting with the objects; it is storing the persistent form of the data that
makes up the objects themselves. A good deal has been written about the technical challenges of
mapping objects to relational tables and effectively storing and retrieving them. A recent discussion
can be found in Fowler 2002. There are reasonably refined tools for creating and managing mappings between the two. Apart from the technical concerns, this mismatch can have a significant
impact on the object model.
There are three common cases:
1. The database is primarily a repository for the objects.
2. The database was designed for another system.
3. The database is designed for this system but serves in roles other than object store.
When the database schema is being created specifically as a store for the objects, it is worth accepting some model limitations in order to keep the mapping very simple. Without other demands
on schema design, the database can be structured to make aggregate integrity safer and more
efficient as updates are made. Technically, the relational table design does not have to reflect the
domain model. Mapping tools are sophisticated enough to bridge significant differences. The trouble
is, multiple overlapping models are just too complicated. Many of the same arguments presented
for
MODEL-DRIVEN DESIGN—avoiding separate analysis and design models—apply to this mismatch. This does entail some sacrifice in the richness of the object model, and sometimes compromises have to be made in the database design (such as selective denormalization), but to do
otherwise is to risk losing the tight coupling of model and implementation. This approach doesn't
require a simplistic one-object/one-table mapping. Depending on the power of the mapping tool,
some aggregation or composition of objects may be possible. But it is crucial that the mappings be
transparent, easily understandable by inspecting the code or reading entries in the mapping tool.
• When the database is being viewed as an object store, don't let the data model and the object
model diverge far, regardless of the powers of the mapping tools. Sacrifice some richness of
object relationships to keep close to the relational model. Compromise some formal relational
standards, such as normalization, if it helps simplify the object mapping.
• Processes outside the object system should not access such an object store. They could violate
the invariants enforced by the objects. Also, their access will lock in the data model so that it is
hard to change when the objects are refactored.
On the other hand, there are many cases in which the data comes from a legacy or external system
that was never intended as a store of objects. In this situation, there are, in reality, two domain
models coexisting in the same system. Chapter 14, “Maintaining Model Integrity,” deals with this
issue in depth. It may make sense to conform to the model implicit in the other system, or it may be
better to make the model completely distinct.
Another reason for exceptions is performance. Quirky design changes may have to be introduced
to solve execution speed problems.
But for the important common case of a relational database acting as the persistent form of an
object-oriented domain, simple directness is best. A table row should contain an object, perhaps
along with subsidiaries in an
AGGREGATE. A foreign key in the table should translate to a reference
to another
ENTITY object. The necessity of sometimes deviating from this simple directness should
not lead to total abandonment of the principle of simple mappings.
The Life Cycle of a Domain Object 98

---

## Sección 36: Chapter 4, we'll look at the principle of

-- 94 of 324 --

The
UBIQUITOUS LANGUAGE can help tie the object and relational components together to a
single model. The names and associations of elements in the objects should correspond meticulously to those of the relational tables. Although the power of some mapping tools may make this
seem unnecessary, subtle differences in relationships will cause a lot of confusion.
The tradition of refactoring that has increasingly taken hold in the object world has not really affected
relational database design much. What's more, serious data migration issues discourage frequent
change. This may create a drag on the refactoring of the object model, but if the object model and
the database model start to diverge, transparency can be lost quickly.
Finally, there are some reasons to go with a schema that is quite distinct from the object model,
even when the database is being created specifically for your system. The database may also be
used by other software that will not instantiate objects. The database may require little change, even
while the behavior of the objects changes or evolves rapidly. Cutting the two loose from each other
is a seductive path. It is often taken unintentionally, when the team fails to keep the database current
with the model. If the separation is chosen consciously, it can result in a clean database schema—
not an awkward one full of compromises conforming to last year's object model.
The Life Cycle of a Domain Object 99

-- 95 of 324 --

Chapter Seven. Using the Language: An
Extended Example
The preceding three chapters introduced a pattern language for honing the fine detail of a model
and maintaining a tight
MODEL-DRIVEN DESIGN. In the earlier examples, the patterns were mostly
applied one at a time, but on a real project you have to combine them. This chapter presents one
elaborate example (still drastically simpler than a real project, of course). The example will step
through a succession of model and design refinements as a hypothetical team deals with requirements and implementation issues and develops a
MODEL-DRIVEN DESIGN, showing the forces
that apply and how the patterns of Part II can resolve them.
Introducing the Cargo Shipping System
We're developing new software for a cargo shipping company. The initial requirements are three
basic functions.
1. Track key handling of customer cargo
2. Book cargo in advance
3. Send invoices to customers automatically when the cargo reaches some point in its handling
In a real project, it would take some time and iteration to get to the clarity of this model. Part III of
this book will go into the discovery process in depth. But here we'll start with a model that has the
needed concepts in a reasonable form, and we'll focus on fine-tuning the details to support design.
-- 96 of 324 --

Figure 7.1. A class diagram representing a model of the shipping domain
This model organizes domain knowledge and provides a language for the team. We can make
statements like this:
“Multiple Customers are involved with a Cargo, each playing a different
role.”
“The Cargo delivery
goal is
specified.”
“A series of Carrier Movements satisfying the Specification will fulfill the delivery
goal.”
Each object in the model has a clear meaning:
A Handling Event is a discrete action taken with the Cargo, such as loading it onto a ship or clearing
it through customs. This class would probably be elaborated into a hierarchy of different kinds of
incidents, such as loading, unloading, or being claimed by the receiver.
Delivery Specification defines a delivery goal, which at minimum would include a destination and
an arrival date, but it can be more complex. This class follows the
SPECIFICATION pattern (see

---

## Sección 37: Chapter 9).

This responsibility could have been taken on by the Cargo object, but the abstraction of Delivery
Specification gives at least three advantages.
1. Without Delivery Specification, the Cargo object would be responsible for the detailed meaning
of all those attributes and associations for specifying the delivery goal. This would clutter up
Cargo and make it harder to understand or change.
2. This abstraction makes it easy and safe to suppress detail when explaining the model as a
whole. For example, there could be other criteria encapsulated in the Delivery Specification,
but a diagram at this level of detail would not have to expose it. The diagram is telling the
reader that there is a
SPECIFICATION of delivery, and the details of that are not important to
think about (and, in fact, could be easily changed later).
Using the Language: An Extended Example 101

-- 97 of 324 --

3. This model is more expressive. Adding Delivery Specification says explicitly that the exact
means of delivery of the Cargo is undetermined, but that it must accomplish the goal set out
in the Delivery Specification.
A
role distinguishes the different parts played by Customers in a shipment. One is the “shipper,”
one the “receiver,” one the “payer,” and so on. Because only one Customer can play a given role
for a particular Cargo, the association becomes a qualified many-to-one instead of many-to-many.
Role might be implemented as simply a string, or it could be a class if other behavior is needed.
Carrier Movement represents one particular trip by a particular Carrier (such as a truck or a ship)
from one Location to another. Cargoes can ride from place to place by being loaded onto Carriers
for the duration of one or more Carrier Movements.
Delivery History reflects what has actually happened to a Cargo, as opposed to the Delivery Specification, which describes goals. A Delivery History object can compute the current Location of the
Cargo by analyzing the last load or unload and the destination of the corresponding Carrier Movement. A successful delivery would end with a Delivery History that satisfied the goals of the Delivery
Specification.
All the concepts needed to work through the requirements just described are present in this model,
assuming appropriate mechanisms to persist the objects, find the relevant objects, and so on. Such
implementation issues are not dealt with in the model, but they must be in the design.
In order to frame up a solid implementation, this model still needs some clarification and tightening.
Remember, ordinarily, model refinement, design, and implementation should go hand-in-hand in an
iterative development process. But in this chapter, for clarity of explanation, we are starting with a
relatively mature model, and changes will be motivated strictly by the need to connect that model
with a practical implementation, employing the building block patterns.
Ordinarily, as the model is being refined to support the design better, is should also be refined to
reflect new insight into the domain. But in this chapter, for clarity of explanation, changes will be
strictly motivated by the need to connect with a practical implementation, employing the building
block patterns.
Isolating the Domain: Introducing the Applications
To prevent domain responsibilities from being mixed with those of other parts of the system, let's
apply
LAYERED ARCHITECTURE to mark off a domain layer.
Without going into deep analysis, we can identify three user-level application functions, which we
can assign to three application layer classes.
1. A Tracking Query that can access past and present handling of a particular Cargo
2. A Booking Application that allows a new Cargo to be registered and prepares the system for it
3. An Incident Logging Application that can record each handling of the Cargo (providing the
information that is found by the Tracking Query)
These application classes are coordinators. They should not work out the answers to the questions
they ask. That is the domain layer's job.
Distinguishing ENTITIES and VALUE Objects
Considering each object in turn, we'll look for identity that must be tracked or a basic value that is
represented. First we'll go through the clear-cut cases and then consider the more ambiguous ones.
Using the Language: An Extended Example 102

-- 98 of 324 --

Customer
Let's start with an easy one. A Customer object represents a person or a company, an entity in the
usual sense of the word. The Customer object clearly has identity that matters to the user, so it is
an
ENTITY in the model. How to track it? Tax ID might be appropriate in some cases, but an international company could not use that. This question calls for consultation with a domain expert. We
discuss the problem with a businessperson in the shipping company, and we discover that the
company already has a customer database in which each Customer is assigned an ID number at
first sales contact. This ID is already used throughout the company; using the number in our software
will establish continuity of identity between those systems. It will initially be a manual entry.
Cargo
Two identical crates must be distinguishable, so Cargo objects are
ENTITIES. In practice, all shipping companies assign tracking IDs to each piece of cargo. This ID will be automatically generated,
visible to the user, and in this case, probably conveyed to the customer at booking time.
Handling Event and Carrier Movement
We care about such individual incidents because they allow us to keep track of what is going on.
They reflect real-world events, which are not usually interchangeable, so they are
ENTITIES. Each
Carrier Movement will be identified by a code obtained from a shipping schedule.
Another discussion with a domain expert reveals that Handling Events can be uniquely identified by
the combination of Cargo ID, completion time, and type. For example, the same Cargo cannot be
both loaded and unloaded at the same time.
Location
Two places with the same name are not the same. Latitude and longitude could provide a unique
key, but probably not a very practical one, since those measurements are not of interest to most
purposes of this system, and they would be fairly complicated. More likely, the Location will be part
of a geographical model of some kind that will relate places according to shipping lanes and other
domain-specific concerns. So an arbitrary, internal, automatically generated identifier will suffice.
Delivery History
This is a tricky one. Delivery Histories are not interchangeable, so they are
ENTITIES. But a Delivery
History has a one-to-one relationship with its Cargo, so it doesn't really have an identity of its own.
Its identity is borrowed from the Cargo that owns it. This will become clearer when we model the
AGGREGATES.
Delivery Specification
Although it represents the goal of a Cargo, this abstraction does not depend on Cargo. It really
expresses a hypothetical state of some Delivery History. We hope that the Delivery History attached
to our Cargo will eventually satisfy the Delivery Specification attached to our Cargo. If we had two
Cargoes going to the same place, they could share the same Delivery Specification, but they could
not share the same Delivery History, even though the histories start out the same (empty). Delivery
Specifications are
VALUE OBJECTS.
Using the Language: An Extended Example 103

---

## Sección 38: Chapter 9).

-- 99 of 324 --

Role and Other Attributes
Role says something about the association it qualifies, but it has no history or continuity. It is a
VALUE OBJECT, and it could be shared among different Cargo/Customer associations.
Other attributes such as time stamps or names are
VALUE OBJECTS.
Designing Associations in the Shipping Domain
None of the associations in the original diagram specified a traversal direction, but bidirectional
associations are problematic in a design. Also, traversal direction often captures insight into the
domain, deepening the model itself.
If the Customer has a direct reference to every Cargo it has shipped, it will become cumbersome
for long-term, repeat Customers. Also, the concept of a Customer is not specific to Cargo. In a large
system, the Customer may have roles to play with many objects. Best to keep it free of such specific
responsibilities. If we need the ability to find Cargoes by Customer, this can be done through a
database query. We'll return to this issue later in this chapter, in the section on
REPOSITORIES.
If our application were tracking the inventory of ships, traversal from Carrier Movement to Handling
Event would be important. But our business needs to track only the Cargo. Making the association
traversable only from Handling Event to Carrier Movement captures that understanding of our business. This also reduces the implementation to a simple object reference, because the direction with
multiplicity was disallowed.
The rationale behind the remaining decisions is explained in Figure 7.2, on the next page.
Figure 7.2. Traversal direction has been constrained on some associations.
Using the Language: An Extended Example 104

-- 100 of 324 --

There is one circular reference in our model: Cargo knows its Delivery History, which holds a series
of Handling Events, which in turn point back to the Cargo. Circular references logically exist in many
domains and are sometimes necessary in design as well, but they are tricky to maintain. Implementation choices can help by avoiding holding the same information in two places that must be
kept synchronized. In this case, we can make a simple but fragile implementation (in Java) in an
initial prototype, by giving Delivery History a List object containing Handling Events. But at some
point we'll probably want to drop the collection in favor of a database lookup with Cargo as the key.
This discussion will be taken up again when choosing
REPOSITORIES. If the query to see the
history is relatively infrequent, this should give good performance, simplify maintenance, and reduce
the overhead of adding Handling Events. If this query is very frequent, then it is better to go ahead
and maintain the direct pointer. These design trade-offs balance simplicity of implementation against
performance. The model is the same; it contains the cycle and the bidirectional association.
AGGREGATE Boundaries
Customer, Location, and Carrier Movement have their own identities and are shared by many
Cargoes, so they must be the roots of their own
AGGREGATES, which contain their attributes and
possibly other objects below the level of detail of this discussion. Cargo is also an obvious
AGGREGATE root, but where to draw the boundary takes some thought.
The Cargo
AGGREGATE could sweep in everything that would not exist but for the particular
Cargo, which would include the Delivery History, the Delivery Specification, and the Handling
Events. This fits for Delivery History. No one would look up a Delivery History directly without wanting
the Cargo itself. With no need for direct global access, and with an identity that is really just derived
from the Cargo, the Delivery History fits nicely inside Cargo's boundary, and it does not need to be
a root. The Delivery Specification is a
VALUE OBJECT, so there are no complications from including
it in the Cargo
AGGREGATE.
The Handling Event is another matter. Previously we have considered two possible database queries that would search for these: one, to find the Handling Events for a Delivery History as a possible
alternative to the collection, would be local within the Cargo
AGGREGATE; the other would be used
to find all the operations to load and prepare for a particular Carrier Movement. In the second case,
it seems that the activity of
handling the Cargo has some meaning even when considered apart
from the Cargo itself. So the Handling Event should be the root of its own
AGGREGATE.
Using the Language: An Extended Example 105

-- 101 of 324 --

Figure 7.3. AGGREGATE boundaries imposed on the model. (Note: An ENTITY outside a drawn boundary is implied to be
the root of its own AGGREGATE.)
Selecting REPOSITORIES
There are five
ENTITIES in the design that are roots of
AGGREGATES, so we can limit our consideration to these, since none of the other objects is allowed to have
REPOSITORIES.
To decide which of these candidates should actually have a
REPOSITORY, we must go back to the
application requirements. In order to take a booking through the Booking Application, the user needs
to select the Customer(s) playing the various roles (shipper, receiver, and so on). So we need a
Customer Repository. We also need to find a Location to specify as the destination for the Cargo,
so we create a Location Repository.
The Activity Logging Application needs to allow the user to look up the Carrier Movement that a
Cargo is being loaded onto, so we need a Carrier Movement Repository. This user must also tell
the system which Cargo has been loaded, so we need a Cargo Repository.
Using the Language: An Extended Example 106

-- 102 of 324 --

Figure 7.4. REPOSITORIES give access to selected AGGREGATE roots.
For now there is no Handling Event Repository, because we decided to implement the association
with Delivery History as a collection in the first iteration, and we have no application requirement to
find out what has been loaded onto a Carrier Movement. Either of these reasons could change; if
they did, then we would add a
REPOSITORY.
Walking Through Scenarios
To cross-check all these decisions, we have to constantly step through scenarios to confirm that we
can solve application problems effectively.
Sample Application Feature: Changing the Destination of a Cargo
Occasionally a Customer calls up and says, “Oh no! We said to send our cargo to Hackensack, but
we really need it in Hoboken.” We are here to serve, so the system is required to provide for this
change.
Delivery Specification is a
VALUE OBJECT, so it would be simplest to just to throw it away and get
a new one, then use a setter method on Cargo to replace the old one with the new one.
Using the Language: An Extended Example 107

---

## Sección 39: Chapter 9).

-- 103 of 324 --

Sample Application Feature: Repeat Business
The users say that repeated bookings from the same Customers tend to be similar, so they want to
use old Cargoes as prototypes for new ones. The application will allow them to find a Cargo in the
REPOSITORY and then select a command to create a new Cargo based on the selected one. We'll
design this using the
PROTOTYPE pattern (Gamma et al. 1995).
Cargo is an
ENTITY and is the root of an
AGGREGATE. Therefore, it must be copied carefully; we
need to consider what should happen to each object or attribute enclosed by its
AGGREGATE
boundary. Let's go over each one:
• Delivery History: We should create a new, empty one, because the history of the old one doesn't
apply. This is the usual case with
ENTITIES inside the
AGGREGATE boundary.
• Customer Roles: We should copy the Map (or other collection) that holds the keyed references
to Customers, including the keys, because they are likely to play the same roles in the new
shipment. But we have to be careful
not to copy the Customer objects themselves. We must
end up with references to the same Customer objects as the old Cargo object referenced, because they are
ENTITIES outside the
AGGREGATE boundary.
• Tracking ID: We must provide a new Tracking ID from the same source as we would when
creating a new Cargo from scratch.
Notice that we have copied everything inside the Cargo
AGGREGATE boundary, we have made
some modifications to the copy, but we have
affected nothing outside the AGGREGATE
boundary at all.
Object Creation
FACTORIES and Constructors for Cargo
Even if we have a fancy
FACTORY for Cargo, or use another Cargo as the
FACTORY, as in the
“Repeat Business” scenario, we still have to have a primitive constructor. We would like the constructor to produce an object that fulfills its invariants or at least, in the case of an
ENTITY, has its
identity intact.
Given these decisions, we might create a
FACTORY method on Cargo such as this:
public Cargo copyPrototype(String newTrackingID)
Or we might make a method on a standalone
FACTORY such as this:
public Cargo newCargo(Cargo prototype, String newTrackingID)
A standalone
FACTORY could also encapsulate the process of obtaining a new (automatically
generated) ID for a new Cargo, in which case it would need only one argument:
public Cargo newCargo(Cargo prototype)
The result returned from any of these
FACTORIES would be the same: a Cargo with an empty
Delivery History, and a null Delivery Specification.
The two-way association between Cargo and Delivery History means that neither Cargo nor Delivery
History is complete without pointing to its counterpart, so they must be created together. Remember
that Cargo is the root of the
AGGREGATE that includes Delivery History. Therefore, we can allow
Cargo's constructor or
FACTORY to create a Delivery History. The Delivery History constructor will
take a Cargo as an argument. The result would be something like this:
Using the Language: An Extended Example 108

-- 104 of 324 --

public Cargo(String id) {
trackingID = id;
deliveryHistory = new DeliveryHistory(this);
customerRoles = new HashMap();
}
The result is a new Cargo with a new Delivery History that points back to the Cargo. The Delivery
History constructor is used exclusively by its
AGGREGATE root, namely Cargo, so that the composition of Cargo is encapsulated.
Adding a Handling Event
Each time the cargo is handled in the real world, some user will enter a Handling Event using the
Incident Logging Application.
Every class must have primitive constructors. Because the Handling Event is an
ENTITY, all attributes that define its identity must be passed to the constructor. As discussed previously, the Handling
Event is uniquely identified by the combination of the ID of its Cargo, the completion time, and the
event type. The only other attribute of Handling Event is the association to a Carrier Movement,
which some types of Handling Events don't even have. A basic constructor that creates a valid
Handling Event would be:
public HandlingEvent(Cargo c, String eventType, Date timeStamp) {
handled = c;
type = eventType;
completionTime = timeStamp;
}
Nonidentifying attributes of an
ENTITY can usually be added later. In this case, all attributes of the
Handling Event are going to be set in the initial transaction and never altered (except possibly for
correcting a data-entry error), so it could be convenient, and make client code more expressive, to
add a simple
FACTORY METHOD to Handling Event for each event type, taking all the necessary
arguments. For example, a “loading event” does involve a Carrier Movement:
public static HandlingEvent newLoading(
Cargo c, CarrierMovement loadedOnto, Date timeStamp) {
HandlingEvent result =
new HandlingEvent(c, LOADING_EVENT, timeStamp);
result.setCarrierMovement(loadedOnto);
return result;
}
The Handling Event in the model is an abstraction that might encapsulate a variety of specialized
Handling Event classes, ranging from loading and unloading to sealing, storing, and other activities
not related to Carriers. They might be implemented as multiple subclasses or have complicated
initialization—or both. By adding
FACTORY METHODS to the base class (Handling Event) for each
type, instance creation is abstracted, freeing the client from knowledge of the implementation. The
FACTORY is responsible for knowing what class was to be instantiated and how it should be initialized.
Unfortunately, the story isn't quite that simple. The cycle of references, from Cargo to Delivery History to History Event and back to Cargo, complicates instance creation. The Delivery History holds
a collection of Handling Events relevant to its Cargo, and the new object must be added to this
collection as part of the transaction. If this back-pointer were not created, the objects would be
inconsistent.
Using the Language: An Extended Example 109

-- 105 of 324 --

Figure 7.5. Adding a Handling Event requires inserting it into a Delivery History.
Creation of the back-pointer could be encapsulated in the
FACTORY (and kept in the domain layer
where it belongs), but now we'll look at an alternative design that eliminates this awkward interaction
altogether.
Pause for Refactoring: An Alternative Design of the Cargo
AGGREGATE
Modeling and design is not a constant forward process. It will grind to a halt unless there is frequent
refactoring to take advantage of new insights to improve the model and the design.
By now, there are a couple of cumbersome aspects to this design, although it does work and it does
reflect the model. Problems that didn't seem important when starting the design are beginning to be
annoying. Let's go back to one of them and, with the benefit of hindsight, stack the design deck in
our favor.
The need to update Delivery History when adding a Handling Event gets the Cargo
AGGREGATE involved in the transaction. If some other user was modifying Cargo at the same time, the
Handling Event transaction could fail or be delayed. Entering a Handling Event is an operational
activity that needs to be quick and simple, so an important application requirement is the ability to
enter Handling Events
without contention. This pushes us to consider a different design.
Replacing the Delivery History's collection of Handling Events with a query would allow Handling
Events to be added without raising any integrity issues outside its own
AGGREGATE. This change
would enable such transactions to complete without interference. If there are a lot of Handling
Events being entered and relatively few queries, this design is more efficient. In fact, if a relational
database is the underlying technology, a query was probably being used under the covers anyway
to emulate the collection. Using a query rather than a collection would also reduce the difficulty of
maintaining consistency in the cyclical reference between Cargo and Handling Event.
Using the Language: An Extended Example 110

---

## Sección 40: Chapter 9).

-- 106 of 324 --

To take responsibility for the queries, we'll add a
REPOSITORY for Handling Events. The Handling
Event Repository will support a query for the Events related to a certain Cargo. In addition, the
REPOSITORY can provide queries optimized to answer specific questions efficiently. For example,
if a frequent access path is the Delivery History finding the last reported load or unload, in order to
infer the current status of the Cargo, a query could be devised to return just that relevant Handling
Event. And if we wanted a query to find all Cargoes loaded on a particular Carrier Movement, we
could easily add it.
Figure 7.6. Implementing Delivery History's collection of Handling Events as a query makes insertion of Handling Events
simple and free of contention with the Cargo AGGREGATE.
This leaves the Delivery History with no persistent state. At this point, there is no real need to keep
it around. We could derive Delivery History itself whenever it is needed to answer some question.
We can derive this object because, although the
ENTITY will be repeatedly recreated, the association with the same Cargo object maintains the thread of continuity between incarnations.
The circular reference is no longer tricky to create and maintain. The Cargo Factory will be simplified
to no longer attach an empty Delivery History to new instances. Database space can be reduced
slightly, and the actual number of persistent objects might be reduced considerably, which is a
limited resource in some object databases. If the common usage pattern is that the user seldom
queries for the status of a Cargo until it arrives, then a lot of unneeded work will be avoided altogether.
On the other hand, if we are using an object database, traversing an association or an explicit
collection is probably much faster than a
REPOSITORY query. If the access pattern includes frequent listing of the full history, rather than the occasional targeted query of last position, the performance trade-off might favor the explicit collection. And remember that the added feature (“What
is on this Carrier Movement?”) hasn't been requested yet, and may never be, so we don't want to
pay much for that option.
Using the Language: An Extended Example 111

-- 107 of 324 --

These kinds of alternatives and design trade-offs are everywhere, and I could come up with lots of
examples just in this little simplified system. But the important point is that these are degrees of
freedom within the same model. By modeling
VALUES,
ENTITIES, and their
AGGREGATES as we
have, we have reduced the impact of such design changes. For example, in this case all changes
are encapsulated within the Cargo's
AGGREGATE boundary. It also required the addition of the
Handling Event Repository, but it did not call for any redesign of the Handling Event itself (although
some implementation changes might be involved, depending on the details of the
REPOSITORY
framework).
MODULES in the Shipping Model
So far we've been looking at so few objects that modularity is not an issue. Now let's look at a little
bigger part of a shipping model (though still simplified, of course) to see its organization into
MODULES that will affect the model.
Figure 7.7 shows a model neatly partitioned by a hypothetical enthusiastic reader of this book. This
diagram is a variation on the infrastructure-driven packaging problem raised in Chapter 5. In this
case, the objects have been grouped according to the pattern each follows. The result is that objects
that conceptually have little relationship (low cohesion) are crammed together, and associations run
willy-nilly between all the
MODULES (high coupling). The packages tell a story, but it is not the story
of shipping; it is the story of what the developer was reading at the time.
Using the Language: An Extended Example 112

-- 108 of 324 --

Figure 7.7. These MODULES do not convey domain knowledge.
Partitioning by pattern may seem like an obvious error, but it is not really any less sensible than
separating persistent objects from transient ones or any other methodical scheme that is not grounded in the meaning of the objects.
Instead, we should be looking for the cohesive concepts and focusing on what we want to communicate to others on the project. As with smaller scale modeling decisions, there are many ways to
do it. Figure 7.8 shows a straightforward one.
Using the Language: An Extended Example 113

-- 109 of 324 --

Figure 7.8. MODULES based on broad domain concepts
The
MODULE names in Figure 7.8 contribute to the team's language. Our company does
shipping for
customers so that we can
bill them. Our sales and marketing people deal with
customers,
and make agreements with them. The operations people do the
shipping, getting the cargo to its
specified destination. The back office takes care of
billing, submitting invoices according to the
pricing in the
customer's agreement. That's one story I can tell with this set of
MODULES.
This intuitive breakdown could be refined, certainly, in successive iterations, or even replaced entirely, but it is now aiding
MODEL-DRIVEN DESIGN and contributing to the
UBIQUITOUS LANGUAGE.
Introducing a New Feature: Allocation Checking
Up to this point, we've been working off the initial requirements and model. Now the first major new
functions are going to be added.
The sales division of the imaginary shipping company uses other software to manage client relationships, sales projections, and so forth. One feature supports yield management by allowing the
firm to allocate how much cargo of specific types they will attempt to book based on the type of
goods, the origin and destination, or any other factor they may choose that can be entered as a
category name. These constitute goals of how much will be sold of each type, so that more profitable
types of business will not be crowded out by less profitable cargoes, while at the same time avoiding
underbooking (not fully utilizing their shipping capacity) or excessive overbooking (resulting in
bumping cargo so often that it hurts customer relationships).
Now they want this feature to be integrated with the booking system. When a booking comes in,
they want it checked against these allocations to see if it should be accepted.
Using the Language: An Extended Example 114

---

## Sección 41: Chapter 9).

-- 110 of 324 --

The information needed resides in two places, which will have to be queried by the Booking Application so that it can either accept or reject the requested booking. A sketch of the general information
flows looks something like this.
Figure 7.9. Our Booking Application must use information from the Sales Management System and from our own domain
REPOSITORIES.
Connecting the Two Systems
The Sales Management System was not written with the same model in mind that we are working
with here. If the Booking Application interacts with it directly, our application will have to accommodate the other system's design, which will make it harder to keep a clear
MODEL-DRIVEN DESIGN and will confuse the
UBIQUITOUS LANGUAGE. Instead, let's create another class whose
job it will be to translate between our model and the language of the Sales Management System. It
will not be a general translation mechanism. It will expose just the features our application needs,
and it will reabstract them in terms of our domain model. This class will act as an
ANTICORRUPTION
LAYER (discussed in Chapter 14).
This is an interface to the Sales Management System, so we might first think of calling it something
like “Sales Management Interface.” But we would be missing an opportunity to use language to
recast the problem along lines more useful to us. Instead, let's define a
SERVICE for each of the
allocation functions we need to get from the other system. We'll implement the
SERVICES with a
class whose name reflects its responsibility in our system: “Allocation Checker.”
If some other integration is needed (for example, using the Sales Management System's customer
database instead of our own Customer
REPOSITORY), another translator can be created with
SERVICES fulfilling that responsibility. It might still be useful to have a lower level class like Sales
Management System Interface to handle the machinery of talking to the other program, but it
wouldn't be responsible for translation. Also, it would be hidden behind the Allocation Checker, so
it wouldn't show up in the domain design.
Enhancing the Model: Segmenting the Business
Now that we have outlined the interaction of the two systems, what kind of interface are we going
to supply that can answer the question “How much of this type of Cargo may be booked?” The tricky
issue is to define what the “type” of a Cargo is, because our domain model does not categorize
Cargoes yet. In the Sales Management System, Cargo types are just a set of category keywords,
and we could conform our types to that list. We could pass in a collection of strings as an argument.
But we would be passing up another opportunity: this time, to reabstract the domain of the other
system. We need to enrich our domain model to accommodate the knowledge that there are categories of cargo. We should brainstorm with a domain expert to work out the new concept.
Using the Language: An Extended Example 115

-- 111 of 324 --

Sometimes (as will be discussed in Chapter 11) an analysis pattern can give us an idea for a modeling solution. The book
Analysis Patterns (Fowler 1996) describes a pattern that addresses this
kind of problem: the
ENTERPRISE SEGMENT. An
ENTERPRISE SEGMENT is a set of dimensions
that define a way of breaking down a business. These dimensions could include all those mentioned
already for the shipping business, as well as time dimensions, such as month to date. Using this
concept in our model of allocation makes the model more expressive and simplifies the interfaces.
A class called “Enterprise Segment” will appear in our domain model and design as an additional
VALUE OBJECT, which will have to be derived for each Cargo.
Figure 7.10. The Allocation Checker acts as an ANTICORRUPTION LAYER presenting a selective interface to the Sales
Management System in terms of our domain model.
The Allocation Checker will translate between Enterprise Segments and the category names of the
external system. The Cargo Repository must also provide a query based on the Enterprise Segment. In both cases, collaboration with the Enterprise Segment object can be used to perform the
operations without breaching the Segment's encapsulation and complicating their own implementations. (Notice that the Cargo Repository is answering a query with a count, rather than a collection
of instances.)
There are still a few problems with this design.
1. We have given the Booking Application the job of applying this rule: “A Cargo is accepted if
the space allocated for its Enterprise Segment is greater than the quantity already booked
plus the size of the new Cargo.” Enforcing a business rule is domain responsibility and
shouldn't be performed in the application layer.
2. It isn't clear how the Booking Application derives the Enterprise Segment.
Both of these responsibilities seem to belong to the Allocation Checker. Changing its interface can
separate these two
SERVICES and make the interaction clear and explicit.
Using the Language: An Extended Example 116

-- 112 of 324 --

Figure 7.11. Domain responsibilities shifted from Booking Application to Allocation Checker
The only serious constraint imposed by this integration will be that the Sales Management System mustn't use dimensions that the Allocation Checker can't turn into Enterprise Segments. (Without applying the
ENTERPRISE SEGMENT pattern, the same constraint would force the sales system to use only dimensions that can be used in a query to the Cargo Repository. This approach is
feasible, but the sales system spills into other parts of the domain. In this design, the Cargo Repository need only be designed to handle Enterprise Segment, and changes in the sales system ripple
only as far as the Allocation Checker, which was conceived as a
FACADE in the first place.)
Performance Tuning
Although the Allocation Checker's interface is the only part that concerns the rest of the domain
design, its internal implementation can present opportunities to solve performance problems, if they
arise. For example, if the Sales Management System is running on another server, perhaps at
another location, the communications overhead could be significant, and there are two message
exchanges for each allocation check. There is no alternative to the second message, which invokes
the Sales Management System to answer the basic question of whether a certain cargo should be
accepted. But the first message, which derives the Enterprise Segment for a cargo, is based on
relatively static data and behavior compared to the allocation decisions themselves. One design
option would be to cache this information so that it could be relocated on the server with the Allocation Checker, reducing messaging overhead by half. There is a price for this flexibility. The design
is more complicated and the duplicated data must now be kept up to date somehow. But when
performance is critical in a distributed system, flexible deployment can be an important design goal.
A Final Look
That's it. This integration could have turned our simple, conceptually consistent design into a tangled
mess, but now, using an
ANTICORRUPTION LAYER, a
SERVICE, and some
ENTERPRISE SEGMENTS, we have integrated the functionality of the Sales Management System into our booking
system cleanly, enriching the domain.
A final design question: Why not give Cargo the responsibility of deriving the Enterprise Segment?
At first glance it seems elegant, if all the data the derivation is based on is in the Cargo, to make it
a derived attribute of Cargo. Unfortunately, it is not that simple. Enterprise Segments are defined
arbitrarily to divide along lines useful for business strategy. The same
ENTITIES could be segmented differently for different purposes. We are deriving the segment for a particular Cargo for
booking
allocation purposes, but it could have a completely different Enterprise Segment for tax accounting
purposes. Even the allocation Enterprise Segment could change if the Sales Management System is reconfigured because of a new sales strategy. So the Cargo would have to know about the
Allocation Checker, which is well outside its conceptual responsibility, and it would be laden with
methods for deriving specific types of Enterprise Segment. Therefore, the responsibility for deriving
Using the Language: An Extended Example 117

---

## Sección 42: Chapter 9).

-- 113 of 324 --

this value lies properly with the object that knows the rules for segmentation, rather than the object
that has the data to which those rules apply. Those rules could be split out into a separate “Strategy” object, which could be passed to a Cargo to allow it to derive an Enterprise Segment. That
solution seems to go beyond the requirements we have here, but it would be an option for a later
design and shouldn't be a very disruptive change.
Using the Language: An Extended Example 118

-- 114 of 324 --

Chapter Eight. Breakthrough
The returns from refactoring are not linear. Usually there is a marginal return for a small effort, and
the small improvements add up. They fight entropy, and they are the frontline protection against a
fossilized legacy. But some of the most important insights come abruptly and send a shock through
the project.
Slowly but surely, the team assimilates knowledge and crunches it into a model. Deep models can
emerge gradually through a sequence of small refactorings, an object at a time: a tweaked association here, a shifted responsibility there.
Often, though, continuous refactoring prepares the way for something less orderly. Each refinement
of code and model gives developers a clearer view. This clarity creates the potential for a breakthrough of insights. A rush of change leads to a model that corresponds on a deeper level to the
realities and priorities of the users. Versatility and explanatory power suddenly increase even as
complexity evaporates.
This sort of breakthrough is not a technique; it is an event. The challenge lies in recognizing what
is happening and deciding how to deal with it. To convey what this experience feels like, I'll tell a
true story of a project I worked on some years ago, and how we arrived at a very valuable deep
model.
-- 115 of 324 --

Story of a Breakthrough
After a long New York winter of refactoring, we had arrived at a model that captured some of the
key knowledge of the domain and a design that did some real work for the application. We were
developing a core part of a large application for managing syndicated loans in an investment bank.
When Intel wants to build a billion-dollar factory, they need a loan that is too big for any single lending
company to take on, so the lenders form a
syndicate that pools its resources to support a
facility
(see sidebar). An investment bank usually acts as syndicate leader, co-ordinating transactions and
other services. Our project was to build software to track and support this whole process.
A Decent Model, and Yet . . .
We were feeling pretty good. Four months before, we had been in deep trouble with a completely
unworkable, inherited code base, which we had since wrestled into a coherent
MODEL-DRIVEN
DESIGN.
The model reflected in Figure 8.1 makes the common case very simple. The Loan Investment is a
derived object that represents a particular investor's contribution to the Loan, proportional to its
share in the Facility.
Figure 8.1. A model that assumes lender shares are fixed
What Is a “Facility”?
A “facility” in this context is not a building. As on most projects, specialized terminology from the domain experts
entered our vocabulary and became part of the
UBIQUITOUS LANGUAGE. In the domain of commercial
banking,
a facility is a commitment by a company to lend. Your credit card is a facility that entitles you to borrow
on demand up to a prearranged limit at a predetermined interest rate. When you use the card, you create an
outstanding loan, and each additional charge is a
drawdown against your facility that increases the loan. Finally
you pay back the loan principal. You may also pay an annual fee. This is a fee for the privilege of having the
card (the facility) and is independent of your loan.
But there were some disconcerting signs. We kept stumbling over unexpected requirements that
complicated the design. A major example was the creeping understanding that the shares in a
Facility were only a
guideline to participation in any particular loan draw-down. When the borrower
requests its money, the leader of the syndicate calls all members for their shares.
When called, the investors usually cough up their share, but often they negotiate with other members
of the syndicate and invest less (or more). We had accommodated this by adding Loan Adjustments to the model.
Breakthrough 123

-- 116 of 324 --

Figure 8.2. A model incrementally changed to solve problems. Loan Adjustments track departures from the share a lender
originally agreed to in the Facility.
Refinements of this kind allowed us to keep up as the rules of various transactions became clearer.
But complexity was increasing, and we did not seem to be converging quickly onto really solid
functionality.
Even more troubling were subtle rounding inconsistencies that we had not been able to squash with
increasingly complex algorithms. True, in a $100 million (MM) deal, no one cares about where the
extra pennies go, but bankers don't trust software that cannot meticulously account for those pennies. We began to suspect that our difficulties were symptomatic of a basic design problem.
The Breakthrough
Suddenly one week it dawned on us what was wrong. Our model tied together the Facility and
Loan shares in a way that was
not appropriate to the business. This revelation had wide repercussions. With the business experts nodding, enthusiastically helping—and, I dare say, wondering what
took us so long—we hashed out a new model on a whiteboard. Although the details hadn't jelled
yet, we knew the crucial feature of the new model: shares of the Loan and those of the Facility could
change independently of each other. With that insight, we walked through numerous scenarios using
a visualization of the new model that looked something like this:
Figure 8.3. A drawdown distributed based on Facility shares
This diagram says that the borrower has chosen to draw an initial $50MM from the $100MM committed under the Facility. The three lenders chip in their shares in exact proportion to the Facility
shares, resulting in a $50MM Loan divided among the lenders.
Breakthrough 124

---

## Sección 43: Chapter 9).

-- 117 of 324 --

Then, in Figure 8.4, the borrower draws an additional $30MM, bringing his outstanding Loan to
$80MM, still under the $100MM limit of the Facility. This time, Company B chooses not to participate,
letting Company A take an extra share. The shares of the draw-down reflect these investment
choices. When the drawdown amounts are added to the Loan, the shares of the Loan are no longer
proportional to the shares of the Facility. This is common.
Figure 8.4. Lender B opts out of a second drawdown.
Figure 8.5. Principal payments are always distributed proportional to shares in the outstanding Loan.
When the borrower pays down the Loan, the money is divided among the lenders according to the
shares of the Loan, not the Facility. Likewise, interest payments will be divided according to the
Loan shares.
Figure 8.6. Fee payments are always distributed proportionally to shares in the Facility.
Breakthrough 125

-- 118 of 324 --

On the other hand, when the borrower pays a fee for the privilege of having the Facility available,
this money is divided according to the Facility shares, regardless of who actually has lent money.
The Loan is unchanged by fee payments. There are even scenarios in which lenders trade shares
of fees separately from their shares of interest, and so on.
A Deeper Model
We had two deep insights. First was the realization that our “Investments” and “Loan Investments”
were just two special cases of a general and fundamental concept: shares. Shares of a facility,
shares of a loan, shares of a
payment distribution. Shares, shares everywhere. Shares of any divisible value.
A few tumultuous days later I had sketched a model of shares, drawing on the language used in the
discussions with experts and the scenarios we had explored together.
Figure 8.7. An abstract model of shares
I also sketched a new loan model to go with it.
Figure 8.8. The Loan model using Share Pie
There were no longer specialized objects for the shares of a Facility or a Loan. They both were
broken down into the more intuitive “Share Pie.” This generalization allowed the introduction of
“shares math,” vastly simplifying the calculation of shares in any transaction, and making those
calculations more expressive, concise, and easily combined.
Breakthrough 126

-- 119 of 324 --

But most of all, problems went away because the new model removed an inappropriate constraint.
It freed the Loan's Shares to depart from the proportions of the Facility's Shares, while keeping in
place the valid constraints on totals, fee distributions, and so on. The Share Pie of the Loan could
be adjusted directly, so the Loan Adjustment was no longer needed, and a large amount of specialcase logic was eliminated.
The Loan Investment had disappeared, and at this point we realized that “loan investment” was not
a banking term. In fact, the business experts had told us a number of times that they didn't understand it. They had deferred to our software knowledge and assumed it was useful to the technical
design. Actually, we had created it based on our incomplete understanding of the domain.
Suddenly, on the basis of this new way of looking at the domain, we could run through every scenario
we had ever encountered relatively effortlessly, much more simply than ever before.
And our model
diagrams made perfect sense to the business experts, who had often indicated that the diagrams
were “too technical” for them. Even just sketching on a whiteboard, we could see that our most
persistent rounding problems would be pulled out by the roots, allowing us to scrap some of the
complicated rounding code.
Our new model worked well. Really, really well.
And we all felt sick!
A Sobering Decision
You might reasonably assume that we would have been elated at this point. We were not. We were
under a severe deadline; the project was already dangerously behind schedule. Our dominant
emotion was fear.
The gospel of refactoring is that you always go in small steps, always keeping everything working.
But to refactor our code to this new model would require changing a lot of supporting code, and
there would be few, if any, stable stopping points in between. We could see some small improvements we could make, but none that would take us closer to the new concept. We could see a
sequence of small steps to get there, but parts of the application would be disabled along the way.
And this was before the age when automated tests were widely used on such projects. We had
none, so there was bound to be unforeseen breakage.
And it was going to take effort. We were already exhausted from months of pushing.
At this point, we had a meeting with our project manager that I will never forget. Our manager was
an intelligent and bold man. He asked a series of questions:
Q1: How long would it take to get back to current functionality with the
new design?
A1: About three weeks.
Q2: Could we solve the problems without it?
A2: Probably. But no way to be sure.
Q3: Would we be able to move forward in the next release if we didn't
do it now?
A3: Forward movement would be slow without the change. And the
change would be much harder once we had an installed base.
Q4: Did
we think it was the right thing to do?
A4: We knew the political situation was unstable, so we'd cope if we had
to. And we were tired. But, yes, it was a simpler solution that fit the
business much better. In the long run it was lower risk.
He gave us the go-ahead and told us he would handle the heat. I've always had tremendous admiration for the courage and trust it took for him to make that decision.
Breakthrough 127

-- 120 of 324 --

We busted our butts and got it done in three weeks. It was a big job, but it went surprisingly smoothly.
The Payoff
The mystifyingly unexpected requirement changes stopped. The rounding logic, though never exactly simple, stabilized and made sense. We delivered version one and the way was clear to version
two. My nervous breakdown was narrowly averted.
As version two evolved, this Share Pie became the unifying theme of the whole application. Technical people and business experts used it to discuss the system.
Marketing people used it to explain
the features to prospective customers. Those prospects and customers immediately grasped it and
used it to discuss features. It truly became part of the
UBIQUITOUS LANGUAGE because it got to
the heart of what loan syndication is about.
Opportunities
When the prospect of a breakthrough to a deeper model presents itself, it is often scary. Such a
change has higher opportunity
and higher risk than most refactorings. And timing may be inopportune.
Much as we might like it to be otherwise, progress isn't a smooth ride. The transition to a really deep
model is a profound shift in your thinking and demands a major change to the design. On many
projects the most important progress in model and design come in these breakthroughs.
Focus on Basics
Don't become paralyzed trying to bring about a breakthrough. The possibility usually comes after
many modest refactorings. Most of the time is spent making piecemeal improvements, with model
insights emerging gradually during each successive refinement.
To set the stage for a breakthrough, concentrate on knowledge crunching and cultivating a robust
UBIQUITOUS LANGUAGE. Probe for important domain concepts and make them explicit in the
model (as discussed in Chapter 9). Refine the design to be suppler (see Chapter 10). Distill the
model (see Chapter 15). Push on these more predictable levers, which increase clarity—usually a
precursor of breakthroughs.
Don't hold back from modest improvements, which gradually deepen the model, even if confined
within the same general conceptual framework. Don't be paralyzed by looking too far forward. Just
be watchful for the opportunity.
Epilogue: A Cascade of New Insights
That breakthrough got us out of the woods, but it was not the end of the story. The deeper model
opened unexpected opportunities to make the application richer and the design clearer.
Just weeks after the release of the Share Pie version of the software, we noticed another awkward
aspect of the model that was complicating the design. An important
ENTITY was missing, its absence leaving extra responsibilities to be taken up by other objects. Specifically, there were significant rules governing loan drawdowns, fee payments, and so on, and all this logic was crammed
into various methods on the Facility and Loan. These design problems, which had been barely
noticeable before the Share Pie breakthrough, became obvious with our clearer field of vision. Now
we noticed terms popping up in our discussions that were nowhere to be found in the model—terms
such as “transaction” (meaning a financial transaction)—that we started to realize were being implied by all those complicated methods.
Breakthrough 128

---

## Sección 44: Chapter 9).

-- 121 of 324 --

Following a process similar to the one described earlier (although, thankfully, under much less time
pressure) led to yet another round of insights and a still deeper model. This new model made those
implicit concepts explicit, as kinds of Transactions, and at the same time simplified the Positions
(an abstraction including the Facility and Loan). It became easy to define the diverse transactions
we had, along with their rules, negotiating procedures, and approval processes, and all in relatively
self-explanatory code.
Figure 8.9. Another model break-through that followed several weeks later. Constraints on Transactions could be expressed
with easy precision.
As is often the case after a real breakthrough to a deep model, the clarity and simplicity of the new
design, combined with the enhanced communication based on the new
UBIQUITOUS LANGUAGE, had led to yet another modeling breakthrough.
Our pace of development was accelerating at a stage where most projects are beginning to bog
down in the mass and complexity of what has already been built.
Breakthrough 129

-- 122 of 324 --

Chapter Nine. Making Implicit Concepts
Explicit
Deep modeling sounds great, but how do you actually do it? A deep model has power because it
contains the central concepts and abstractions that can succinctly and flexibly express essential
knowledge of the users' activities, their problems, and their solutions. The first step is to somehow
represent the essential concepts of the domain in the model. Refinement comes later, after successive iterations of knowledge crunching and refactoring. But this process really gets into gear
when an important concept is recognized and made explicit in the model and design.
Many transformations of domain models and the corresponding code happen when developers
recognize a concept that has been hinted at in discussion or present implicitly in the design, and
they then represent it explicitly in the model with one or more objects or relationships.
Occasionally, this transformation of a formerly implicit concept into an explicit one is a breakthrough
that leads to a deep model. More often, though, the breakthrough comes later, after a number of
important concepts are explicit in the model; after successive refactorings have tweaked their responsibilities repeatedly, changed their relationships with other objects, and even changed their
names a few times. Everything finally snaps into focus. But the process starts with recognizing the
implied concepts in some form, however crude.
Digging Out Concepts
Developers have to sensitize themselves to the hints that reveal lurking implicit concepts, and
sometimes they have to proactively search them out. Most such discoveries come from listening to
the language of the team, scrutinizing awkwardness in the design and seeming contradictions in
the statements of experts, mining the literature of the domain, and doing lots and lots of experimentation.
Listen to Language
You may remember an experience like this: The users have always talked about some item on a
report. The item is compiled from attributes of various objects and maybe even a direct database
query. The same data set is assembled in another part of the application in order to present or report
or derive something. But you have never seen the need for an object. Probably, you have never
really understood what the users meant by a particular term and had not realized it was important.
Then suddenly a light comes on in your head. The name of the item on that report designates an
important domain concept. You talk excitedly with your experts about your new insight. Maybe they
show relief that you finally got it. Maybe they yawn because they've taken it for granted all along.
Either way, you start to draw model diagrams on the board that fill in for some hand waving that
you've always done before. The users correct you on the details of how the new model connects,
-- 123 of 324 --

but you can tell that there is a change in the quality of the discussion. You and the users understand
each other more precisely, and demonstrations of model interactions to solve specific scenarios
have become more natural. The language of the domain model has become more powerful. You
refactor the code to reflect the new model and find you have a cleaner design.
Listen to the language the domain experts use. Are there terms that succinctly state something
complicated? Are they correcting your word choice (perhaps diplomatically)? Do the puzzled looks
on their faces go away when you use a particular phrase? These are hints of a concept that might
benefit the model.
This is
not the old “nouns are objects” notion. Hearing a new word produces a lead, which you follow
up with conversation and knowledge crunching, with the goal of carving out a clean, useful concept.
When the users or domain experts use vocabulary that is nowhere in the design, that is a warning
sign. It is a doubly strong warning when both the developers and the domain experts are using terms
that are not in the design.
Or perhaps it is better to look at it as an opportunity. The
UBIQUITOUS LANGUAGE is made up of
the vocabulary that pervades speech, documents, model diagrams, and even code. If a term is
absent from the design, it is an opportunity to improve the model and design by including it.
Example
Hearing a Missing Concept in the Shipping Model
The team had already developed a working application that could book a cargo. They were starting
to build an “operations support” application that would help juggle the work orders for loading and
unloading cargos at the origin and destination and at transfers between ships.
The booking application used a routing engine to plan the trip for a cargo. Each leg of the journey
was stored in a row of a database table, indicating the ID of the vessel voyage (a particular voyage
by a particular ship) slated to carry the cargo, the location where it would be loaded, and the location
where it would be unloaded.
Let's eavesdrop on a conversation (heavily abbreviated) between the developer and a shipping
expert.
Developer: I want to make sure the “cargo bookings” table has all the data that the operations
application will need.
Expert: They're going to need the whole itinerary for the Cargo. What information does it have now?
Making Implicit Concepts Explicit 131

---

## Sección 45: Chapter 9).

-- 124 of 324 --

Developer: The cargo ID, the vessel voyage, the loading port, and the unloading port for each leg.
Expert: What about the date? Operations will need to contract handling work based on the expected
times.
Developer: Well, that can be derived from the schedule of the vessel voyage. The table data is
normalized.
Expert: Yes, it is normal to need the date. Operations people use these kinds of itineraries to plan
for upcoming handling work.
Developer: Yeah . . . OK, they'll definitely have access to the dates. The operations management
application will be able to provide the whole loading and unloading sequence, with the date of each
handling operation. The “itinerary,” I guess you would say.
Expert: Good. The itinerary is the main thing they'll need. Actually, you know, the booking application has a menu item that will print an itinerary or e-mail it to the customer. Can you use that somehow?
Developer: That's just a report, I think. We won't be able to base the operations application on that.
[
Developer looks thoughtful, then excited.]
Developer: So, this itinerary is really the link between booking and operations.
Expert: Yes, and some customer relations, too.
Developer: [
Sketching a diagram on the whiteboard.] So would you say it is something like this?
Expert: Yes, that looks basically right. For each leg you'd like to see the vessel voyage, the load
and unload location, and time.
Developer: So once we create the Leg object, it can derive the times from the vessel voyage
schedule. We can make the Itinerary object our main point of contact with the operations application.
And we can rewrite that itinerary report to use this, so we'll get the domain logic back into the domain
layer.
Expert: I didn't follow all of that, but you are right that the two main uses for the Itinerary are in the
report in booking and in the operations application.
Developer: Hey! We can make the Routing Service interface return an itinerary object instead of
putting the data in the database table. That way the routing engine doesn't need to know about our
tables.
Expert: Huh?
Developer: I mean, I'll make the routing engine just return an Itinerary. Then it can be saved in the
database by the booking application when the rest of the booking is saved.
Expert: You mean it isn't that way now?!
The developer then went off to talk with the other developers involved in the routing process. They
hashed out the changes to the model and the implications for the design, calling on the shipping
experts when needed. They came up with the diagram in Figure 9.3.
Making Implicit Concepts Explicit 132

-- 125 of 324 --

Next, the developers refactored the code to reflect the new model. They did it in a series of two or
three refactorings, but in quick succession, within a week, except for simplifying the itinerary report
in the booking application, which they took care of early the following week.
The developer had been listening closely enough to the shipping expert to notice how important the
concept of an “itinerary” was to him. True, all the data was already being collected, and the behavior
was implicit in the itinerary report, but the explicit Itinerary as part of the model opened up opportunities.
Benefits of refactoring to the explicit Itinerary object:
1. Defining the interface of the Routing Service more expressively
2. Decoupling the Routing Service from the booking database tables
3. Clarifying the relationship between the booking application and the operations support application (the sharing of the Itinerary object)
4. Reducing duplication, because the Itinerary derives loading/unloading times for both the
booking report and the operations support application
5. Removing domain logic from the booking report and placing it in the isolated domain layer
6. Expanding the
UBIQUITOUS LANGUAGE, allowing a more precise discussion of the model
and design between developers and domain experts and among the developers themselves
Scrutinize Awkwardness
The concept you need is not always floating on the surface, emerging in conversation or documents.
You may have to dig and invent. The place to dig is the most awkward part of your design. The place
where procedures are doing complicated things that are hard to explain. The place where every
new requirement seems to add complexity.
Making Implicit Concepts Explicit 133

-- 126 of 324 --

Sometimes it can be hard to recognize that there even is a missing concept. You may have objects
doing all the work but find some of the responsibilities awkward. Or, if you do realize something is
missing, a model solution may elude you.
Now you have to actively engage the domain experts in the search. If you are lucky, they may enjoy
playing with ideas and experimenting with the model. If you are not that lucky, you and your fellow
developers will have to come up with the ideas, using the domain expert as a validator, watching
for discomfort or recognition on his or her face.
Example
Earning Interest the Hard Way
The next story is set in a hypothetical financial company that invests in commercial loans and other
interest-bearing assets. An application that tracks those investments and the earnings from them
has been evolving incrementally, feature by feature. Each night, one component was to run as a
batch script, calculating all interest and fees for the day and then recording them appropriately in
the company's accounting software.
Figure 9.4. An awkward model
The nightly batch script iterated through each Asset, telling each to calculateInterestForDate() on that day's date. The script took the return value (the amount earned) and passed this
amount, along with the name of a specific ledger, to a
SERVICE that provided the public interface
of the accounting program. That software posted the amount to the named ledger. The script went
through a similar process to get the day's fees from each Asset, posting them to a different ledger.
A developer had been struggling with the increasing complexity of calculating interest. She started
to suspect an opportunity for a model better suited to the task. This developer asked her favorite
domain expert to help her dig into the problem area.
Developer: Our Interest Calculator is getting out of hand.
Expert: That is a complicated part. We still have more cases we've been holding back.
Developer: I know. We can add new interest types by substituting a different Interest Calculator.
But what we're having the most trouble with right now is all these special cases when they don't pay
the interest on schedule.
Expert: Those really aren't special cases. There's a lot of flexibility in when people pay.
Developer: Back when we factored out the Interest Calculator from the Asset, it helped a lot. We
may need to break it up more.
Expert: OK.
Developer: I was thinking you might have a way of talking about this interest calculation.
Expert: What do you mean?
Making Implicit Concepts Explicit 134

---

## Sección 46: Chapter 9).

-- 127 of 324 --

Developer: Well, for example, we're tracking the interest due but un-paid within an accounting period. Do you have a name for that?
Expert: Well, we don't really do it like that. The interest earned and the payment are quite separate
postings.
Developer: So you don't need that number?
Expert: Well, sometimes we might look at it, but it isn't the way we do business.
Developer: OK, so if the payment and interest are separate, maybe we should model them that
way. How does this look? [
Sketching on whiteboard]
Expert: It makes sense, I guess. But you just moved it from one place to another.
Developer: Except now the Interest Calculator only keeps track of interest earned, and the Payment keeps that number separately. It hasn't simplified it a lot, but does it better reflect your business
practice?
Expert: Ah. I see. Could we have interest history, too? Like the Payment History.
Developer: Yes, that has been requested as a new feature. But that could have been added onto
the original design.
Expert: Oh. Well, when I saw interest and Payment History separated like that, I thought you were
breaking up the interest to organize it more like the Payment History. Do you know anything about
accrual basis accounting?
Developer: Please explain.
Expert: Each day, or whenever the schedule calls for, we have an interest accrual that gets posted
to a ledger. The payments are posted a different way. This aggregate you have here is a little
awkward.
Developer: You're saying that if we keep a list of “accruals,” they could be aggregated or . . . “posted”
as needed.
Expert: Probably posted on the accrual date, but yes, aggregated any-time. Fees work the same
way, posted to a different ledger, of course.
Developer: Actually, the interest calculation would be simpler if it was done just for one day, or
period. And then we could just hang on to them all. How about this?
Making Implicit Concepts Explicit 135

-- 128 of 324 --

Expert: Sure. It looks good. I'm not sure why this would be easier for you. But basically, what makes
any asset valuable is what it can accrue in interest, fees, and so on.
Developer: You said fees work the same way? They . . . what was it . . . post to different ledgers?
Developer: With this model, we get the interest calculation, or rather, the accrual calculation logic
that was in the Interest Calculator separated from tracking. And I hadn't noticed until now how much
duplication there is in the Fee Calculator. Also, now the different kinds of fees can easily be added.
Expert: Yes, the calculation was correct before, but I can see everything now.
Because the Calculator classes hadn't been directly coupled with other parts of the design, this was
a fairly easy refactoring. The developer was able to rewrite the unit tests to use the new language
in a few hours and had the new design working late the next day. She ended up with this.
Making Implicit Concepts Explicit 136

-- 129 of 324 --

Figure 9.8. A deeper model after refactoring
In the refactored application, the nightly batch script tells each Asset to calculateAccrualsThroughDate(). The return value is a collection of Accruals, each of whose amounts it posts to
the indicated ledger.
The new model has several advantages. The change
1. Enriches the
UBIQUITOUS LANGUAGE with the term “accrual”
2. Decouples accrual from payment
3. Moves domain knowledge (such as which ledger to post to) from the script and into the domain
layer
4. Brings fees and interest together in a way that fits the business and eliminates duplication in
the code
5. Provides a straightforward path for adding new variations of fees and interest as Accrual
Schedules
This time, the developer had to dig for the new concepts she needed. She could see the awkwardness of the interest calculations and made a committed effort to look for a deeper answer.
She was lucky to have an intelligent and motivated partner in the banking expert. With a more
passive source of expertise, she would have made more false starts and depended more on other
developers as brainstorming partners. Progress would have been slower, but still possible.
Contemplate Contradictions
Different domain experts see things different ways based on their experience and needs. Even the
same person provides information that is logically inconsistent after careful analysis. Such pesky
contradictions, which we encounter all the time when digging into program requirements, can be
great clues to deeper models. Some are just variations in terminology or are based on misunderstanding. But there is a residue where two factual statements by experts seem to contradict.
The astronomer Galileo once posed a paradox. The evidence of the senses clearly indicates that
the Earth is stationary: people are not being blown off and falling behind. Yet Copernicus had made
a compelling argument that the Earth was moving around the sun quite rapidly. Reconciling this
might reveal something profound about how nature works.
Galileo devised a thought experiment. If a rider dropped a ball from a running horse, where would
it fall? Of course, the ball would move along with the horse until it hit the ground by the horse's feet,
just as if the horse were standing still. From this he deduced an early form of the idea of inertial
frames of reference, solving the paradox and leading to a much more useful model of the physics
of motion.
Making Implicit Concepts Explicit 137

-- 130 of 324 --

OK. Our contradictions are usually not so interesting, nor the implications so profound. Even so,
this same pattern of thought often helps pierce the superficial layers of a problem domain into a
deeper insight.
It is not practical to reconcile all contradictions, and it may not even be desirable. (Chapter 14 delves
into how to decide and how to manage the result.) However, even when a contradiction is left in
place, contemplation of how two statements could both apply to the same external reality can be
revealing.
Read the Book
Don't overlook the obvious when seeking model concepts. In many fields, you can find books that
explain the fundamental concepts and conventional wisdom. You still have to work with your own
domain experts to distill the part relevant to your problem and to crunch it into something suited to
object-oriented software. But you may be able to start with a coherent, deeply considered view.
Example
Earning Interest by the Book
Let's imagine a different scenario for the investment-tracking application discussed in the previous
example. Just as before, the story starts with the developer realizing that the design is getting unwieldy, particularly the Interest Calculator. But in this scenario, the domain expert's primary responsibilities lie elsewhere, and he doesn't have much interest in helping the software development
project. In this scenario, the developer couldn't turn to the expert for a brainstorming session to
probe for the missing concepts she suspected to be lurking under the surface.
Instead, she went to the bookstore. After a little browsing, she found an introductory accounting
book she liked, and she skimmed it. She discovered a whole system of well-defined concepts

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #architecture_and_books
