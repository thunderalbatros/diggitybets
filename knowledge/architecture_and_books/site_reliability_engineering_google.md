**Alcance:** Libro completo Site Reliability Engineering (Google SRE): presupuestos de error, SLOs, eliminación de toil y respuesta a incidentes. (Fuente migrada y curada desde Centinela Studio Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

---
titulo: "Site Reliability Engineering: How Google Runs Production Systems"
autor: "Google SRE Team (Betsy Beyer et al.)"
dominio: "SLOs, SLIs, Presupuestos de Error y Automatización SRE"
tipo: "libro_tecnico_completo"
paginas_originales: 550
secciones_totales: 279
fecha_ingesta: "2026-10-06T02:43:18.610Z"
---

# 📖 Site Reliability Engineering: How Google Runs Production Systems
**Autor:** Google SRE Team (Betsy Beyer et al.) | **Dominio:** SLOs, SLIs, Presupuestos de Error y Automatización SRE | **Páginas originales:** 550

> **Nota de Arquitectura Centinela:** Este documento contiene el texto íntegro estructurado por secciones y capítulos para consulta profunda del equipo de agentes y búsqueda híbrida (BM25 + semántica).

---

## [Sección 1] Introducción y Fundamentos

Edited by Betsy Beyer, Chris Jones,
Jennifer Petoff & Niall Richard Murphy
Site
Reliability
Engineering
HOW GOOGLE RUNS PRODUCTION SYSTEMS
www.allitebooks.com

-- 1 of 550 --

www.allitebooks.com

-- 2 of 550 --

Praise for Site Reliability Engineering
Google’s SREs have done our industry an enormous service by writing up the principles,
practices and patterns—architectural and cultural—that enable their teams to combine
continuous delivery with world-class reliability at ludicrous scale. You owe it to yourself
and your organization to read this book and try out these ideas for yourself.
—Jez Humble, coauthor of Continuous Delivery and
Lean Enterprise
I remember when Google first started speaking at systems administration conferences.
It was like hearing a talk at a reptile show by a Gila monster expert. Sure, it was
entertaining to hear about a very different world, but in the end the audience
would go back to their geckos.
Now we live in a changed universe where the operational practices of Google are
not so removed from those who work on a smaller scale. All of a sudden, the best
practices of SRE that have been honed over the years are now of keen interest to
the rest of us. For those of us facing challenges around scale, reliability and
operations, this book comes none too soon.
—David N. Blank-Edelman, Director, USENIX Board of
Directors, and founding co-organizer of SREcon
I have been waiting for this book ever since I left Google’s enchanted castle.
It is the gospel I am preaching to my peers at work.
—Björn Rabenstein, Team Lead of Production Engineering at
SoundCloud, Prometheus developer, and Google SRE until 2013
www.allitebooks.com

-- 3 of 550 --

A thorough discussion of Site Reliability Engineering from the company that
invented the concept. Includes not only the technical details but also the
thought process, goals, principles, and lessons learned over time. If you want
to learn what SRE really means, start here.
—Russ Allbery, SRE and Security Engineer
With this book, Google employees have shared the processes they have taken,
including the missteps, that have allowed Google services to expand to both massive
scale and great reliability. I highly recommend that anyone who wants to create a
set of integrated services that they hope will scale to read this book. The book
provides an insider’s guide to building maintainable services.
—Rik Farrow, USENIX
Writing large-scale services like Gmail is hard. Running them with high reliability is
even harder, especially when you change them every day. This comprehensive
“recipe book” shows how Google does it, and you’ll find it much cheaper to learn
from our mistakes than to make them yourself.
—Urs Hölzle, SVP Technical Infrastructure, Google
www.allitebooks.com

-- 4 of 550 --

Edited by Betsy Beyer, Chris Jones, Jennifer Petoff,
and Niall Richard Murphy
Site Reliability Engineering
How Google Runs Production Systems
Boston Farnham Sebastopol Tokyo Beijing Boston Farnham Sebastopol Tokyo Beijing
www.allitebooks.com

-- 5 of 550 --

978-1-491-92912-4
[LSI]
Site Reliability Engineering
Edited by Betsy Beyer, Chris Jones, Jennifer Petoff, and Niall Richard Murphy
Copyright © 2016 Google, Inc. All rights reserved.
Printed in the United States of America.
Published by O’Reilly Media, Inc., 1005 Gravenstein Highway North, Sebastopol, CA 95472.
O’Reilly books may be purchased for educational, business, or sales promotional use. Online editions are
also available for most titles (http://safaribooksonline.com). For more information, contact our corporate/
institutional sales department: 800-998-9938 or corporate@oreilly.com.
Editor: Brian Anderson
Production Editor: Kristen Brown
Copyeditor: Kim Cofer
Proofreader: Rachel Monaghan
Indexer: Judy McConville
Interior Designer: David Futato
Cover Designer: Karen Montgomery
Illustrator: Rebecca Demarest
April 2016: First Edition
Revision History for the First Edition
2016-03-21: First Release
See http://oreilly.com/catalog/errata.csp?isbn=9781491929124 for release details.
The O’Reilly logo is a registered trademark of O’Reilly Media, Inc. Site Reliability Engineering, the cover
image, and related trade dress are trademarks of O’Reilly Media, Inc.
While the publisher and the authors have used good faith efforts to ensure that the information and
instructions contained in this work are accurate, the publisher and the authors disclaim all responsibility
for errors or omissions, including without limitation responsibility for damages resulting from the use of
or reliance on this work. Use of the information and instructions contained in this work is at your own
risk. If any code samples or other technology this work contains or describes is subject to open source
licenses or the intellectual property rights of others, it is your responsibility to ensure that your use
thereof complies with such licenses and/or rights.
www.allitebooks.com

---

## [Sección 2] Introducción y Fundamentos

-- 6 of 550 --

Table of Contents
Foreword. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . xiii
Preface. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . xv

---

## [Sección 3] Part I. Introduction

1. Introduction. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 3
The Sysadmin Approach to Service Management 3
Google’s Approach to Service Management: Site Reliability Engineering 5
Tenets of SRE 7
The End of the Beginning 12
2. The Production Environment at Google, from the Viewpoint of an SRE. . . . . . . . . . . . 13
Hardware 13
System Software That “Organizes” the Hardware 15
Other System Software 18
Our Software Infrastructure 19
Our Development Environment 19
Shakespeare: A Sample Service 20

---

## [Sección 4] Part II. Principles

3. Embracing Risk. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 25
Managing Risk 25
Measuring Service Risk 26
Risk Tolerance of Services 28
v
www.allitebooks.com

-- 7 of 550 --

Motivation for Error Budgets 33
4. Service Level Objectives. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 37
Service Level Terminology 37
Indicators in Practice 40
Objectives in Practice 43
Agreements in Practice 47
5. Eliminating Toil. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 49
Toil Defined 49
Why Less Toil Is Better 51
What Qualifies as Engineering? 52
Is Toil Always Bad? 52
Conclusion 54
6. Monitoring Distributed Systems. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 55
Definitions 55
Why Monitor? 56
Setting Reasonable Expectations for Monitoring 57
Symptoms Versus Causes 58
Black-Box Versus White-Box 59
The Four Golden Signals 60
Worrying About Your Tail (or, Instrumentation and Performance) 61
Choosing an Appropriate Resolution for Measurements 62
As Simple as Possible, No Simpler 62
Tying These Principles Together 63
Monitoring for the Long Term 64
Conclusion 66
7. The Evolution of Automation at Google. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 67
The Value of Automation 67
The Value for Google SRE 70
The Use Cases for Automation 70
Automate Yourself Out of a Job: Automate ALL the Things! 73
Soothing the Pain: Applying Automation to Cluster Turnups 75
Borg: Birth of the Warehouse-Scale Computer 81
Reliability Is the Fundamental Feature 83
Recommendations 84
8. Release Engineering. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 87
The Role of a Release Engineer 87
Philosophy 88
vi | Table of Contents
www.allitebooks.com

-- 8 of 550 --

Continuous Build and Deployment 90
Configuration Management 93
Conclusions 95
9. Simplicity. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 97
System Stability Versus Agility 97
The Virtue of Boring 98
I Won’t Give Up My Code! 98
The “Negative Lines of Code” Metric 99
Minimal APIs 99
Modularity 100
Release Simplicity 100
A Simple Conclusion 101

---

## [Sección 5] Part III. Practices

10. Practical Alerting from Time-Series Data. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 107
The Rise of Borgmon 108
Instrumentation of Applications 109
Collection of Exported Data 110
Storage in the Time-Series Arena 111
Rule Evaluation 114
Alerting 118
Sharding the Monitoring Topology 119
Black-Box Monitoring 120
Maintaining the Configuration 121
Ten Years On… 122
11. Being On-Call. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 125
Introduction 125
Life of an On-Call Engineer 126
Balanced On-Call 127
Feeling Safe 128
Avoiding Inappropriate Operational Load 130
Conclusions 132
12. Effective Troubleshooting. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 133
Theory 134
In Practice 136
Negative Results Are Magic 144
Case Study 146
Table of Contents | vii
www.allitebooks.com

-- 9 of 550 --

Making Troubleshooting Easier 150
Conclusion 150
13. Emergency Response. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 151
What to Do When Systems Break 151
Test-Induced Emergency 152
Change-Induced Emergency 153
Process-Induced Emergency 155
All Problems Have Solutions 158
Learn from the Past. Don’t Repeat It. 158
Conclusion 159
14. Managing Incidents. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 161
Unmanaged Incidents 161
The Anatomy of an Unmanaged Incident 162
Elements of Incident Management Process 163
A Managed Incident 165
When to Declare an Incident 166
In Summary 166
15. Postmortem Culture: Learning from Failure. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 169
Google’s Postmortem Philosophy 169
Collaborate and Share Knowledge 171
Introducing a Postmortem Culture 172
Conclusion and Ongoing Improvements 175
16. Tracking Outages. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 177
Escalator 178
Outalator 178
17. Testing for Reliability. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 183
Types of Software Testing 185
Creating a Test and Build Environment 190
Testing at Scale 192
Conclusion 204
18. Software Engineering in SRE. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 205
Why Is Software Engineering Within SRE Important? 205
Auxon Case Study: Project Background and Problem Space 207
Intent-Based Capacity Planning 209
Fostering Software Engineering in SRE 218
Conclusions 222
viii | Table of Contents
www.allitebooks.com

-- 10 of 550 --

19. Load Balancing at the Frontend. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 223
Power Isn’t the Answer 223
Load Balancing Using DNS 224
Load Balancing at the Virtual IP Address 227
20. Load Balancing in the Datacenter. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 231
The Ideal Case 232
Identifying Bad Tasks: Flow Control and Lame Ducks 233
Limiting the Connections Pool with Subsetting 235
Load Balancing Policies 240
21. Handling Overload. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 247
The Pitfalls of “Queries per Second” 248
Per-Customer Limits 248
Client-Side Throttling 249
Criticality 251
Utilization Signals 253
Handling Overload Errors 253
Load from Connections 257
Conclusions 258
22. Addressing Cascading Failures. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 259
Causes of Cascading Failures and Designing to Avoid Them 260
Preventing Server Overload 265
Slow Startup and Cold Caching 274
Triggering Conditions for Cascading Failures 276
Testing for Cascading Failures 278
Immediate Steps to Address Cascading Failures 280
Closing Remarks 283
23. Managing Critical State: Distributed Consensus for Reliability. . . . . . . . . . . . . . . . . . 285
Motivating the Use of Consensus: Distributed Systems Coordination Failure 288
How Distributed Consensus Works 289
System Architecture Patterns for Distributed Consensus 291
Distributed Consensus Performance 296
Deploying Distributed Consensus-Based Systems 304
Monitoring Distributed Consensus Systems 312
Conclusion 313
24. Distributed Periodic Scheduling with Cron. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 315
Cron 315
Cron Jobs and Idempotency 316
Table of Contents | ix

---

## [Sección 6] Part III. Practices

-- 11 of 550 --

Cron at Large Scale 317
Building Cron at Google 319
Summary 326
25. Data Processing Pipelines. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 327
Origin of the Pipeline Design Pattern 327
Initial Effect of Big Data on the Simple Pipeline Pattern 328
Challenges with the Periodic Pipeline Pattern 328
Trouble Caused By Uneven Work Distribution 328
Drawbacks of Periodic Pipelines in Distributed Environments 329
Introduction to Google Workflow 333
Stages of Execution in Workflow 335
Ensuring Business Continuity 337
Summary and Concluding Remarks 338
26. Data Integrity: What You Read Is What You Wrote. . . . . . . . . . . . . . . . . . . . . . . . . . . . 339
Data Integrity’s Strict Requirements 340
Google SRE Objectives in Maintaining Data Integrity and Availability 344
How Google SRE Faces the Challenges of Data Integrity 349
Case Studies 360
General Principles of SRE as Applied to Data Integrity 367
Conclusion 368
27. Reliable Product Launches at Scale. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 369
Launch Coordination Engineering 370
Setting Up a Launch Process 372
Developing a Launch Checklist 375
Selected Techniques for Reliable Launches 380
Development of LCE 384
Conclusion 387

---

## [Sección 7] Part IV. Management

28. Accelerating SREs to On-Call and Beyond. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 391
You’ve Hired Your Next SRE(s), Now What? 391
Initial Learning Experiences: The Case for Structure Over Chaos 394
Creating Stellar Reverse Engineers and Improvisational Thinkers 397
Five Practices for Aspiring On-Callers 400
On-Call and Beyond: Rites of Passage, and Practicing Continuing Education 406
Closing Thoughts 406
x | Table of Contents

-- 12 of 550 --

29. Dealing with Interrupts. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 407
Managing Operational Load 408
Factors in Determining How Interrupts Are Handled 408
Imperfect Machines 409
30. Embedding an SRE to Recover from Operational Overload. . . . . . . . . . . . . . . . . . . . . . 417
Phase 1: Learn the Service and Get Context 418
Phase 2: Sharing Context 420
Phase 3: Driving Change 421
Conclusion 423
31. Communication and Collaboration in SRE. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 425
Communications: Production Meetings 426
Collaboration within SRE 430
Case Study of Collaboration in SRE: Viceroy 432
Collaboration Outside SRE 437
Case Study: Migrating DFP to F1 437
Conclusion 440
32. The Evolving SRE Engagement Model. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 441
SRE Engagement: What, How, and Why 441
The PRR Model 442
The SRE Engagement Model 443
Production Readiness Reviews: Simple PRR Model 444
Evolving the Simple PRR Model: Early Engagement 448
Evolving Services Development: Frameworks and SRE Platform 451
Conclusion 456

---

## [Sección 8] Part V. Conclusions

33. Lessons Learned from Other Industries. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 459
Meet Our Industry Veterans 460
Preparedness and Disaster Testing 462
Postmortem Culture 465
Automating Away Repetitive Work and Operational Overhead 467
Structured and Rational Decision Making 469
Conclusions 470
34. Conclusion. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 473
Table of Contents | xi

-- 13 of 550 --

A. Availability Table. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 477
B. A Collection of Best Practices for Production Services. . . . . . . . . . . . . . . . . . . . . . . . . . . . 479
C. Example Incident State Document. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 485
D. Example Postmortem. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 487
E. Launch Coordination Checklist. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 493
F. Example Production Meeting Minutes. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 497
Bibliography. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 501
Index. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 511
xii | Table of Contents

-- 14 of 550 --

Foreword
Google’s story is a story of scaling up. It is one of the great success stories of the com‐
puting industry, marking a shift towards IT-centric business. Google was one of the
first companies to define what business-IT alignment meant in practice, and went on
to inform the concept of DevOps for a wider IT community. This book has been writ‐
ten by a broad cross-section of the very people who made that transition a reality.
Google grew at a time when the traditional role of the system administrator was being
transformed. It questioned system administration, as if to say: we can’t afford to hold
tradition as an authority, we have to think anew, and we don’t have time to wait for
everyone else to catch up. In the introduction to Principles of Network and System
Administration [Bur99], I claimed that system administration was a form of humancomputer engineering. This was strongly rejected by some reviewers, who said “we
are not yet at the stage where we can call it engineering.” At the time, I felt that the
field had become lost, trapped in its own wizard culture, and could not see a way for‐
ward. Then, Google drew a line in the silicon, forcing that fate into being. The revised
role was called SRE, or Site Reliability Engineer. Some of my friends were among the
first of this new generation of engineer; they formalized it using software and auto‐
mation. Initially, they were fiercely secretive, and what happened inside and outside
of Google was very different: Google’s experience was unique. Over time, information
and methods have flowed in both directions. This book shows a willingness to let SRE
thinking come out of the shadows.
Here, we see not only how Google built its legendary infrastructure, but also how it
studied, learned, and changed its mind about the tools and the technologies along the
way. We, too, can face up to daunting challenges with an open spirit. The tribal nature
of IT culture often entrenches practitioners in dogmatic positions that hold the
industry back. If Google overcame this inertia, so can we.
This book is a collection of essays by one company, with a single common vision. The
fact that the contributions are aligned around a single company’s goal is what makes
it special. There are common themes, and common characters (software systems)
xiii

-- 15 of 550 --

that reappear in several chapters. We see choices from different perspectives, and
know that they correlate to resolve competing interests. The articles are not rigorous,
academic pieces; they are personal accounts, written with pride, in a variety of per‐
sonal styles, and from the perspective of individual skill sets. They are written bravely,
and with an intellectual honesty that is refreshing and uncommon in industry litera‐
ture. Some claim “never do this, always do that,” others are more philosophical and
tentative, reflecting the variety of personalities within an IT culture, and how that too
plays a role in the story. We, in turn, read them with the humility of observers who
were not part of the journey, and do not have all the information about the myriad
conflicting challenges. Our many questions are the real legacy of the volume: Why
didn’t they do X? What if they’d done Y? How will we look back on this in years to
come? It is by comparing our own ideas to the reasoning here that we can measure
our own thoughts and experiences.
The most impressive thing of all about this book is its very existence. Today, we hear a
brazen culture of “just show me the code.” A culture of “ask no questions” has grown
up around open source, where community rather than expertise is championed. Goo‐
gle is a company that dared to think about the problems from first principles, and to
employ top talent with a high proportion of PhDs. Tools were only components in
processes, working alongside chains of software, people, and data. Nothing here tells
us how to solve problems universally, but that is the point. Stories like these are far
more valuable than the code or designs they resulted in. Implementations are ephem‐
eral, but the documented reasoning is priceless. Rarely do we have access to this kind
of insight.
This, then, is the story of how one company did it. The fact that it is many overlap‐
ping stories shows us that scaling is far more than just a photographic enlargement of
a textbook computer architecture. It is about scaling a business process, rather than
just the machinery. This lesson alone is worth its weight in electronic paper.
We do not engage much in self-critical review in the IT world; as such, there is much
reinvention and repetition. For many years, there was only the USENIX LISA confer‐
ence community discussing IT infrastructure, plus a few conferences about operating
systems. It is very different today, yet this book still feels like a rare offering: a detailed
documentation of Google’s step through a watershed epoch. The tale is not for copy‐
ing—though perhaps for emulating—but it can inspire the next step for all of us.
There is a unique intellectual honesty in these pages, expressing both leadership and
humility. These are stories of hopes, fears, successes, and failures. I salute the courage
of authors and editors in allowing such candor, so that we, who are not party to the
hands-on experiences, can also benefit from the lessons learned inside the cocoon.
— Mark Burgess
author of In Search of Certainty
Oslo, March 2016
xiv | Foreword

---

## [Sección 9] Part V. Conclusions

-- 16 of 550 --

1 The very fact that there is such large variance in these estimates tells you something about software engineer‐
ing as a discipline, but see, e.g., [Gla02] for more details.
Preface
Software engineering has this in common with having children: the labor before the
birth is painful and difficult, but the labor after the birth is where you actually spend
most of your effort. Yet software engineering as a discipline spends much more time
talking about the first period as opposed to the second, despite estimates that 40–90%
of the total costs of a system are incurred after birth.1 The popular industry model
that conceives of deployed, operational software as being “stabilized” in production,
and therefore needing much less attention from software engineers, is wrong.
Through this lens, then, we see that if software engineering tends to focus on design‐
ing and building software systems, there must be another discipline that focuses on
the whole lifecycle of software objects, from inception, through deployment and oper‐
ation, refinement, and eventual peaceful decommissioning. This discipline uses—and
needs to use—a wide range of skills, but has separate concerns from other kinds of
engineers. Today, our answer is the discipline Google calls Site Reliability Engineer‐
ing.
So what exactly is Site Reliability Engineering (SRE)? We admit that it’s not a particu‐
larly clear name for what we do—pretty much every site reliability engineer at Google
gets asked what exactly that is, and what they actually do, on a regular basis.
Unpacking the term a little, first and foremost, SREs are engineers. We apply the prin‐
ciples of computer science and engineering to the design and development of com‐
puting systems: generally, large distributed ones. Sometimes, our task is writing the
software for those systems alongside our product development counterparts; some‐
times, our task is building all the additional pieces those systems need, like backups
or load balancing, ideally so they can be reused across systems; and sometimes, our
task is figuring out how to apply existing solutions to new problems.
xv

-- 17 of 550 --

2 For our purposes, reliability is “The probability that [a system] will perform a required function without fail‐
ure under stated conditions for a stated period of time,” following the definition in [Oco12].
3 The software systems we’re concerned with are largely websites and similar services; we do not discuss the
reliability concerns that face software intended for nuclear power plants, aircraft, medical equipment, or other
safety-critical systems. We do, however, compare our approaches with those used in other industries in Chap‐
ter 33.
4 In this, we are distinct from the industry term DevOps, because although we definitely regard infrastructure
as code, we have reliability as our main focus. Additionally, we are strongly oriented toward removing the
necessity for operations—see Chapter 7 for more details.
Next, we focus on system reliability. Ben Treynor Sloss, Google’s VP for 24/7 Opera‐
tions, originator of the term SRE, claims that reliability is the most fundamental fea‐
ture of any product: a system isn’t very useful if nobody can use it! Because reliability2
is so critical, SREs are focused on finding ways to improve the design and operation
of systems to make them more scalable, more reliable, and more efficient. However,
we expend effort in this direction only up to a point: when systems are “reliable
enough,” we instead invest our efforts in adding features or building new products.3
Finally, SREs are focused on operating services built atop our distributed computing
systems, whether those services are planet-scale storage, email for hundreds of mil‐
lions of users, or where Google began, web search. The “site” in our name originally
referred to SRE’s role in keeping the google.com website running, though we now run
many more services, many of which aren’t themselves websites—from internal infra‐
structure such as Bigtable to products for external developers such as the Google
Cloud Platform.
Although we have represented SRE as a broad discipline, it is no surprise that it arose
in the fast-moving world of web services, and perhaps in origin owes something to
the peculiarities of our infrastructure. It is equally no surprise that of all the postdeployment characteristics of software that we could choose to devote special atten‐
tion to, reliability is the one we regard as primary.4 The domain of web services, both
because the process of improving and changing server-side software is comparatively
contained, and because managing change itself is so tightly coupled with failures of all
kinds, is a natural platform from which our approach might emerge.
Despite arising at Google, and in the web community more generally, we think that
this discipline has lessons applicable to other communities and other organizations.
This book is an attempt to explain how we do things: both so that other organizations
might make use of what we’ve learned, and so that we can better define the role and
what the term means. To that end, we have organized the book so that general princi‐
ples and more specific practices are separated where possible, and where it’s appropri‐
ate to discuss a particular topic with Google-specific information, we trust that the
reader will indulge us in this and will not be afraid to draw useful conclusions about
their own environment.
xvi | Preface

---

## [Sección 10] Part V. Conclusions

-- 18 of 550 --

5 In addition to this great story, she also has a substantial claim to popularizing the term “software engineering.”
We have also provided some orienting material—a description of Google’s production
environment and a mapping between some of our internal software and publicly
available software—which should help to contextualize what we are saying and make
it more directly usable.
Ultimately, of course, more reliability-oriented software and systems engineering is
inherently good. However, we acknowledge that smaller organizations may be won‐
dering how they can best use the experience represented here: much like security, the
earlier you care about reliability, the better. This implies that even though a small
organization has many pressing concerns and the software choices you make may dif‐
fer from those Google made, it’s still worth putting lightweight reliability support in
place early on, because it’s less costly to expand a structure later on than it is to intro‐
duce one that is not present. Part IV contains a number of best practices for training,
communication, and meetings that we’ve found to work well for us, many of which
should be immediately usable by your organization.
But for sizes between a startup and a multinational, there probably already is some‐
one in your organization who is doing SRE work, without it necessarily being called
that name, or recognized as such. Another way to get started on the path to improv‐
ing reliability for your organization is to formally recognize that work, or to find
these people and foster what they do—reward it. They are people who stand on the
cusp between one way of looking at the world and another one: like Newton, who is
sometimes called not the world’s first physicist, but the world’s last alchemist.
And taking the historical view, who, then, looking back, might be the first SRE?
We like to think that Margaret Hamilton, working on the Apollo program on loan
from MIT, had all of the significant traits of the first SRE.5 In her own words, “part of
the culture was to learn from everyone and everything, including from that which
one would least expect.”
A case in point was when her young daughter Lauren came to work with her one day,
while some of the team were running mission scenarios on the hybrid simulation
computer. As young children do, Lauren went exploring, and she caused a “mission”
to crash by selecting the DSKY keys in an unexpected way, alerting the team as to
what would happen if the prelaunch program, P01, were inadvertently selected by a
real astronaut during a real mission, during real midcourse. (Launching P01 inadver‐
tently on a real mission would be a major problem, because it wipes out navigation
data, and the computer was not equipped to pilot the craft with no navigation data.)
Preface | xvii

-- 19 of 550 --

With an SRE’s instincts, Margaret submitted a program change request to add special
error checking code in the onboard flight software in case an astronaut should, by
accident, happen to select P01 during flight. But this move was considered unneces‐
sary by the “higher-ups” at NASA: of course, that could never happen! So instead of
adding error checking code, Margaret updated the mission specifications documenta‐
tion to say the equivalent of “Do not select P01 during flight.” (Apparently the update
was amusing to many on the project, who had been told many times that astronauts
would not make any mistakes—after all, they were trained to be perfect.)
Well, Margaret’s suggested safeguard was only considered unnecessary until the very
next mission, on Apollo 8, just days after the specifications update. During midcourse
on the fourth day of flight with the astronauts Jim Lovell, William Anders, and Frank
Borman on board, Jim Lovell selected P01 by mistake—as it happens, on Christmas
Day—creating much havoc for all involved. This was a critical problem, because in
the absence of a workaround, no navigation data meant the astronauts were never
coming home. Thankfully, the documentation update had explicitly called this possi‐
bility out, and was invaluable in figuring out how to upload usable data and recover
the mission, with not much time to spare.
As Margaret says, “a thorough understanding of how to operate the systems was not
enough to prevent human errors,” and the change request to add error detection and
recovery software to the prelaunch program P01 was approved shortly afterwards.
Although the Apollo 8 incident occurred decades ago, there is much in the preceding
paragraphs directly relevant to engineers’ lives today, and much that will continue to
be directly relevant in the future. Accordingly, for the systems you look after, for the
groups you work in, or for the organizations you’re building, please bear the SRE Way
in mind: thoroughness and dedication, belief in the value of preparation and docu‐
mentation, and an awareness of what could go wrong, coupled with a strong desire to
prevent it. Welcome to our emerging profession!
xviii | Preface
www.allitebooks.com

---

## [Sección 11] Part V. Conclusions

-- 20 of 550 --

How to Read This Book
This book is a series of essays written by members and alumni of Google’s Site Relia‐
bility Engineering organization. It’s much more like conference proceedings than it is
like a standard book by an author or a small number of authors. Each chapter is
intended to be read as a part of a coherent whole, but a good deal can be gained by
reading on whatever subject particularly interests you. (If there are other articles that
support or inform the text, we reference them so you can follow up accordingly.)
You don’t need to read in any particular order, though we’d suggest at least starting
with Chapters 2 and 3, which describe Google’s production environment and outline
how SRE approaches risk, respectively. (Risk is, in many ways, the key quality of our
profession.) Reading cover-to-cover is, of course, also useful and possible; our chap‐
ters are grouped thematically, into Principles (Part II), Practices (Part III), and Man‐
agement (Part IV). Each has a small introduction that highlights what the individual
pieces are about, and references other articles published by Google SREs, covering
specific topics in more detail. Additionally, the companion website to this book,
https://g.co/SREBook, has a number of helpful resources.
We hope this will be at least as useful and interesting to you as putting it together was
for us.
— The Editors
Conventions Used in This Book
The following typographical conventions are used in this book:
Italic
Indicates new terms, URLs, email addresses, filenames, and file extensions.
Constant width
Used for program listings, as well as within paragraphs to refer to program ele‐
ments such as variable or function names, databases, data types, environment
variables, statements, and keywords.
Constant width bold
Shows commands or other text that should be typed literally by the user.
Constant width italic
Shows text that should be replaced with user-supplied values or by values deter‐
mined by context.
Preface | xix

-- 21 of 550 --

This element signifies a tip or suggestion.
This element signifies a general note.
This element indicates a warning or caution.
Using Code Examples
Supplemental material is available at https://g.co/SREBook.
This book is here to help you get your job done. In general, if example code is offered
with this book, you may use it in your programs and documentation. You do not
need to contact us for permission unless you’re reproducing a significant portion of
the code. For example, writing a program that uses several chunks of code from this
book does not require permission. Selling or distributing a CD-ROM of examples
from O’Reilly books does require permission. Answering a question by citing this
book and quoting example code does not require permission. Incorporating a signifi‐
cant amount of example code from this book into your product’s documentation does
require permission.
We appreciate, but do not require, attribution. An attribution usually includes the
title, author, publisher, and ISBN. For example: “Site Reliability Engineering, edited by
Betsy Beyer, Chris Jones, Jennifer Petoff, and Niall Richard Murphy (O’Reilly). Copy‐
right 2016 Google, Inc., 978-1-491-92912-4.”
If you feel your use of code examples falls outside fair use or the permission given
above, feel free to contact us at permissions@oreilly.com.
Safari® Books Online
Safari Books Online is an on-demand digital library that deliv‐
ers expert content in both book and video form from the
world’s leading authors in technology and business.
xx | Preface

-- 22 of 550 --

Technology professionals, software developers, web designers, and business and crea‐
tive professionals use Safari Books Online as their primary resource for research,
problem solving, learning, and certification training.
Safari Books Online offers a range of plans and pricing for enterprise, government,
education, and individuals.
Members have access to thousands of books, training videos, and prepublication
manuscripts in one fully searchable database from publishers like O’Reilly Media,
Prentice Hall Professional, Addison-Wesley Professional, Microsoft Press, Sams, Que,
Peachpit Press, Focal Press, Cisco Press, John Wiley & Sons, Syngress, Morgan Kauf‐
mann, IBM Redbooks, Packt, Adobe Press, FT Press, Apress, Manning, New Riders,
McGraw-Hill, Jones & Bartlett, Course Technology, and hundreds more. For more
information about Safari Books Online, please visit us online.
How to Contact Us
Please address comments and questions concerning this book to the publisher:
O’Reilly Media, Inc.
1005 Gravenstein Highway North
Sebastopol, CA 95472
800-998-9938 (in the United States or Canada)
707-829-0515 (international or local)
707-829-0104 (fax)
We have a web page for this book, where we list errata, examples, and any additional
information. You can access this page at http://bit.ly/site-reliability-engineering.
To comment or ask technical questions about this book, send email to bookques‐
tions@oreilly.com.
For more information about our books, courses, conferences, and news, see our web‐
site at http://www.oreilly.com.
Find us on Facebook: http://facebook.com/oreilly
Follow us on Twitter: http://twitter.com/oreillymedia
Watch us on YouTube: http://www.youtube.com/oreillymedia
Acknowledgments
This book would not have been possible without the tireless efforts of our authors
and technical writers. We’d also like thank the following internal reviewers for provid‐
ing especially valuable feedback: Alex Matey, Dermot Duffy, JC van Winkel, John T.
Preface | xxi

---

## [Sección 12] Part V. Conclusions

-- 23 of 550 --

Reese, Michael O’Reilly, Steve Carstensen, and Todd Underwood. Ben Lutch and Ben
Treynor Sloss were this book’s sponsors within Google; their belief in this project and
sharing what we’ve learned about running large-scale services was essential to making
this book happen.
We’d like to send special thanks to Rik Farrow, the editor of ;login:, for partnering
with us on a number of contributions for pre-publication via USENIX.
While the authors are specifically acknowledged in each chapter, we’d like to take time
to recognize those that contributed to each chapter by providing thoughtful input,
discussion, and review.

---

## [Sección 13] Chapter 3: Abe Rahey, Ben Treynor Sloss, Brian Stoler, Dave O’Connor, David Besb‐

ris, Jill Alvidrez, Mike Curtis, Nancy Chang, Tammy Capistrant, Tom Limoncelli

---

## [Sección 14] Chapter 5: Cody Smith, George Sadlier, Laurence Berland, Marc Alvidrez, Patrick

Stahlberg, Peter Duff, Pim van Pelt, Ryan Anderson, Sabrina Farmer, Seth Hettich

---

## [Sección 15] Chapter 8: David Schnur, JT Goldstone, Marc Alvidrez, Marcus Lara-Reinhold, Noah

Maxwell, Peter Dinges, Sumitran Raghunathan, Yutong Cho

---

## [Sección 16] Chapter 12: Charles Stephen Gunn, John Hedditch, Peter Nuttall, Rob Ewaschuk,

Sam Greenfield

---

## [Sección 17] Chapter 14: Amy Zhou, Carla Geisser, Grainne Sheerin, Hildo Biersma, Jelena Oertel,

Perry Lorier, Rune Kristian Viken

---

## [Sección 18] Chapter 15: Dan Wu, Heather Sherman, Jared Brick, Mike Louer, Štěpán Davidovič,

Tim Craig

---

## [Sección 19] Chapter 19: Debashish Chatterjee, Perry Lorier

Chapters 20 and 21: Adam Fletcher, Christoph Pfisterer, Lukáš Ježek, Manjot Pahwa,
Micha Riser, Noah Fiedel, Pavel Herrmann, Paweł Zuzelski, Perry Lorier, Ralf Wild‐
enhues, Tudor-Ioan Salomie, Witold Baryluk
xxii | Preface

-- 24 of 550 --

---

## [Sección 20] Chapter 25: Abdulrahman Salem, Alex Perry, Arnar Mar Hrafnkelsson, Dieter Pear‐

cey, Dylan Curley, Eivind Eklund, Eric Veach, Graham Poulter, Ingvar Mattsson, John
Looney, Ken Grant, Michelle Duffy, Mike Hochberg, Will Robinson

---

## [Sección 21] Chapter 26: Corey Vickrey, Dan Ardelean, Disney Luangsisongkham, Gordon Priore‐

schi, Kristina Bennett, Liang Lin, Michael Kelly, Sergey Ivanyuk

---

## [Sección 22] Chapter 31: Alex Kehlenbeck, Jeromy Carriere, Joel Becker, Sowmya Vijayaraghavan,

Trevor Mattson-Hamilton

---

## [Sección 23] Chapter 33: Adrian Hilton, Brad Kratochvil, Charles Ballowe, Dan Sheridan, Eddie

Kennedy, Erik Gross, Gus Hartmann, Jackson Stone, Jeff Stevenson, John Li, Kevin
Greer, Matt Toia, Michael Haynie, Mike Doherty, Peter Dahl, Ron Heiby
We are also grateful to the following contributors, who either provided significant
material, did an excellent job of reviewing, agreed to be interviewed, supplied signifi‐
cant expertise or resources, or had some otherwise excellent effect on this work:
Abe Hassan, Adam Rogoyski, Alex Hidalgo, Amaya Booker, Andrew Fikes, Andrew
Hurst, Ariel Goh, Ashleigh Rentz, Ayman Hourieh, Barclay Osborn, Ben Appleton,
Ben Love, Ben Winslow, Bernhard Beck, Bill Duane, Bill Patry, Blair Zajac, Bob
Gruber, Brian Gustafson, Bruce Murphy, Buck Clay, Cedric Cellier, Chiho Saito, Chris
Carlon, Christopher Hahn, Chris Kennelly, Chris Taylor, Ciara Kamahele-Sanfratello,
Colin Phipps, Colm Buckley, Craig Paterson, Daniel Eisenbud, Daniel V. Klein, Dan‐
iel Spoonhower, Dan Watson, Dave Phillips, David Hixson, Dina Betser, Doron
Meyer, Dmitry Fedoruk, Eric Grosse, Eric Schrock, Filip Zyzniewski, Francis Tang,
Gary Arneson, Georgina Wilcox, Gretta Bartels, Gustavo Franco, Harald Wagener,
Healfdene Goguen, Hugo Santos, Hyrum Wright, Ian Gulliver, Jakub Turski, James
Chivers, James O’Kane, James Youngman, Jan Monsch, Jason Parker-Burlingham,
Jason Petsod, Jeffry McNeil, Jeff Dean, Jeff Peck, Jennifer Mace, Jerry Cen, Jess Frame,
John Brady, John Gunderman, John Kochmar, John Tobin, Jordyn Buchanan, Joseph
Bironas, Julio Merino, Julius Plenz, Kate Ward, Kathy Polizzi, Katrina Sostek, Kenn
Hamm, Kirk Russell, Kripa Krishnan, Larry Greenfield, Lea Oliveira, Luca Cittadini,
Preface | xxiii

-- 25 of 550 --

Lucas Pereira, Magnus Ringman, Mahesh Palekar, Marco Paganini, Mario Bonilla,
Mathew Mills, Mathew Monroe, Matt D. Brown, Matt Proud, Max Saltonstall, Michal
Jaszczyk, Mihai Bivol, Misha Brukman, Olivier Oansaldi, Patrick Bernier, Pierre Pala‐
tin, Rob Shanley, Robert van Gent, Rory Ward, Rui Zhang-Shen, Salim Virji, Sanjay
Ghemawat, Sarah Coty, Sean Dorward, Sean Quinlan, Sean Sechrest, Shari TrumboMcHenry, Shawn Morrissey, Shun-Tak Leung, Stan Jedrus, Stefano Lattarini, Steven
Schirripa, Tanya Reilly, Terry Bolt, Tim Chaplin, Toby Weingartner, Tom Black, Udi
Meiri, Victor Terron, Vlad Grama, Wes Hertlein, and Zoltan Egyed.
We very much appreciate the thoughtful and in-depth feedback that we received from
external reviewers: Andrew Fong, Björn Rabenstein, Charles Border, David BlankEdelman, Frossie Economou, James Meickle, Josh Ryder, Mark Burgess, and Russ
Allbery.
We would like to extend special thanks to Cian Synnott, original book team member
and co-conspirator, who left Google before this project was completed but was deeply
influential to it, and Margaret Hamilton, who so graciously allowed us to reference
her story in our preface. Additionally, we would like to extend special thanks to Shy‐
laja Nukala, who generously gave of the time of her technical writers and supported
their necessary and valued efforts wholeheartedly.
The editors would also like to personally thank the following people:
Betsy Beyer: To Grandmother (my personal hero), for supplying endless amounts of
phone pep talks and popcorn, and to Riba, for supplying me with the sweatpants nec‐
essary to fuel several late nights. These, of course, in addition to the cast of SRE allstars who were indeed delightful collaborators.
Chris Jones: To Michelle, for saving me from a life of crime on the high seas and for
her uncanny ability to find manzanas in unexpected places, and to those who’ve
taught me about engineering over the years.
Jennifer Petoff: To my husband Scott for being incredibly supportive during the two
year process of writing this book and for keeping the editors supplied with plenty of
sugar on our “Dessert Island.”
Niall Murphy: To Léan, Oisín, and Fiachra, who were considerably more patient than
I had any right to expect with a substantially rantier father and husband than usual,
for years. To Dermot, for the transfer offer.
xxiv | Preface

---

## [Sección 24] Chapter 33: Adrian Hilton, Brad Kratochvil, Charles Ballowe, Dan Sheridan, Eddie

-- 26 of 550 --

---

## [Sección 25] PART I

Introduction
This section provides some high-level guidance on what SRE is and why it is different
from more conventional IT industry practices.
Ben Treynor Sloss, the senior VP overseeing technical operations at Google—and the
originator of the term “Site Reliability Engineering”—provides his view on what SRE
means, how it works, and how it compares to other ways of doing things in the indus‐
try, in Chapter 1.
We provide a guide to the production environment at Google in Chapter 2 as a way to
help acquaint you with the wealth of new terms and systems you are about to meet in
the rest of the book.

-- 27 of 550 --

-- 28 of 550 --

1 Vice President, Google Engineering, founder of Google SRE

---

## [Sección 26] CHAPTER 1

Introduction
Written by Benjamin Treynor Sloss1
Edited by Betsy Beyer
Hope is not a strategy.
—Traditional SRE saying
It is a truth universally acknowledged that systems do not run themselves. How, then,
should a system—particularly a complex computing system that operates at a large
scale—be run?
The Sysadmin Approach to Service Management
Historically, companies have employed systems administrators to run complex com‐
puting systems.
This systems administrator, or sysadmin, approach involves assembling existing soft‐
ware components and deploying them to work together to produce a service.
Sysadmins are then tasked with running the service and responding to events and
updates as they occur. As the system grows in complexity and traffic volume, generat‐
ing a corresponding increase in events and updates, the sysadmin team grows to
absorb the additional work. Because the sysadmin role requires a markedly different
skill set than that required of a product’s developers, developers and sysadmins are
divided into discrete teams: “development” and “operations” or “ops.”
The sysadmin model of service management has several advantages. For companies
deciding how to run and staff a service, this approach is relatively easy to implement:
as a familiar industry paradigm, there are many examples from which to learn and
-- 29 of 550 --

emulate. A relevant talent pool is already widely available. An array of existing tools,
software components (off the shelf or otherwise), and integration companies are
available to help run those assembled systems, so a novice sysadmin team doesn’t
have to reinvent the wheel and design a system from scratch.
The sysadmin approach and the accompanying development/ops split has a number
of disadvantages and pitfalls. These fall broadly into two categories: direct costs and
indirect costs.
Direct costs are neither subtle nor ambiguous. Running a service with a team that
relies on manual intervention for both change management and event handling
becomes expensive as the service and/or traffic to the service grows, because the size
of the team necessarily scales with the load generated by the system.
The indirect costs of the development/ops split can be subtle, but are often more
expensive to the organization than the direct costs. These costs arise from the fact
that the two teams are quite different in background, skill set, and incentives. They
use different vocabulary to describe situations; they carry different assumptions about
both risk and possibilities for technical solutions; they have different assumptions
about the target level of product stability. The split between the groups can easily
become one of not just incentives, but also communication, goals, and eventually,
trust and respect. This outcome is a pathology.
Traditional operations teams and their counterparts in product development thus
often end up in conflict, most visibly over how quickly software can be released to
production. At their core, the development teams want to launch new features and
see them adopted by users. At their core, the ops teams want to make sure the service
doesn’t break while they are holding the pager. Because most outages are caused by
some kind of change—a new configuration, a new feature launch, or a new type of
user traffic—the two teams’ goals are fundamentally in tension.
Both groups understand that it is unacceptable to state their interests in the baldest
possible terms (“We want to launch anything, any time, without hindrance” versus
“We won’t want to ever change anything in the system once it works”). And because
their vocabulary and risk assumptions differ, both groups often resort to a familiar
form of trench warfare to advance their interests. The ops team attempts to safeguard
the running system against the risk of change by introducing launch and change
gates. For example, launch reviews may contain an explicit check for every problem
that has ever caused an outage in the past—that could be an arbitrarily long list, with
not all elements providing equal value. The dev team quickly learns how to respond.
They have fewer “launches” and more “flag flips,” “incremental updates,” or “cherry‐
picks.” They adopt tactics such as sharding the product so that fewer features are sub‐
ject to the launch review.
4 | Chapter 1: Introduction
www.allitebooks.com

---

## [Sección 27] CHAPTER 1

-- 30 of 550 --

Google’s Approach to Service Management:
Site Reliability Engineering
Conflict isn’t an inevitable part of offering a software service. Google has chosen to
run our systems with a different approach: our Site Reliability Engineering teams
focus on hiring software engineers to run our products and to create systems to
accomplish the work that would otherwise be performed, often manually, by
sysadmins.
What exactly is Site Reliability Engineering, as it has come to be defined at Google?
My explanation is simple: SRE is what happens when you ask a software engineer to
design an operations team. When I joined Google in 2003 and was tasked with run‐
ning a “Production Team” of seven engineers, my entire life up to that point had been
software engineering. So I designed and managed the group the way I would want it
to work if I worked as an SRE myself. That group has since matured to become Goo‐
gle’s present-day SRE team, which remains true to its origins as envisioned by a life‐
long software engineer.
A primary building block of Google’s approach to service management is the compo‐
sition of each SRE team. As a whole, SRE can be broken down two main categories.
50–60% are Google Software Engineers, or more precisely, people who have been
hired via the standard procedure for Google Software Engineers. The other 40–50%
are candidates who were very close to the Google Software Engineering qualifications
(i.e., 85–99% of the skill set required), and who in addition had a set of technical skills
that is useful to SRE but is rare for most software engineers. By far, UNIX system
internals and networking (Layer 1 to Layer 3) expertise are the two most common
types of alternate technical skills we seek.
Common to all SREs is the belief in and aptitude for developing software systems to
solve complex problems. Within SRE, we track the career progress of both groups
closely, and have to date found no practical difference in performance between engi‐
neers from the two tracks. In fact, the somewhat diverse background of the SRE team
frequently results in clever, high-quality systems that are clearly the product of the
synthesis of several skill sets.
The result of our approach to hiring for SRE is that we end up with a team of people
who (a) will quickly become bored by performing tasks by hand, and (b) have the
skill set necessary to write software to replace their previously manual work, even
when the solution is complicated. SREs also end up sharing academic and intellectual
background with the rest of the development organization. Therefore, SRE is funda‐
mentally doing work that has historically been done by an operations team, but using
engineers with software expertise, and banking on the fact that these engineers are
Google’s Approach to Service Management: | 5

-- 31 of 550 --

inherently both predisposed to, and have the ability to, design and implement auto‐
mation with software to replace human labor.
By design, it is crucial that SRE teams are focused on engineering. Without constant
engineering, operations load increases and teams will need more people just to keep
pace with the workload. Eventually, a traditional ops-focused group scales linearly
with service size: if the products supported by the service succeed, the operational
load will grow with traffic. That means hiring more people to do the same tasks over
and over again.
To avoid this fate, the team tasked with managing a service needs to code or it will
drown. Therefore, Google places a 50% cap on the aggregate “ops” work for all SREs—
tickets, on-call, manual tasks, etc. This cap ensures that the SRE team has enough
time in their schedule to make the service stable and operable. This cap is an upper
bound; over time, left to their own devices, the SRE team should end up with very
little operational load and almost entirely engage in development tasks, because the
service basically runs and repairs itself: we want systems that are automatic, not just
automated. In practice, scale and new features keep SREs on their toes.
Google’s rule of thumb is that an SRE team must spend the remaining 50% of its time
actually doing development. So how do we enforce that threshold? In the first place,
we have to measure how SRE time is spent. With that measurement in hand, we
ensure that the teams consistently spending less than 50% of their time on develop‐
ment work change their practices. Often this means shifting some of the operations
burden back to the development team, or adding staff to the team without assigning
that team additional operational responsibilities. Consciously maintaining this bal‐
ance between ops and development work allows us to ensure that SREs have the
bandwidth to engage in creative, autonomous engineering, while still retaining the
wisdom gleaned from the operations side of running a service.
We’ve found that Google SRE’s approach to running large-scale systems has many
advantages. Because SREs are directly modifying code in their pursuit of making
Google’s systems run themselves, SRE teams are characterized by both rapid innova‐
tion and a large acceptance of change. Such teams are relatively inexpensive—sup‐
porting the same service with an ops-oriented team would require a significantly
larger number of people. Instead, the number of SREs needed to run, maintain, and
improve a system scales sublinearly with the size of the system. Finally, not only does
SRE circumvent the dysfunctionality of the dev/ops split, but this structure also
improves our product development teams: easy transfers between product develop‐
ment and SRE teams cross-train the entire group, and improve skills of developers
who otherwise may have difficulty learning how to build a million-core distributed
system.
Despite these net gains, the SRE model is characterized by its own distinct set of chal‐
lenges. One continual challenge Google faces is hiring SREs: not only does SRE
6 | Chapter 1: Introduction

---

## [Sección 28] CHAPTER 1

-- 32 of 550 --

compete for the same candidates as the product development hiring pipeline, but the
fact that we set the hiring bar so high in terms of both coding and system engineering
skills means that our hiring pool is necessarily small. As our discipline is relatively
new and unique, not much industry information exists on how to build and manage
an SRE team (although hopefully this book will make strides in that direction!). And
once an SRE team is in place, their potentially unorthodox approaches to service
management require strong management support. For example, the decision to stop
releases for the remainder of the quarter once an error budget is depleted might not
be embraced by a product development team unless mandated by their management.
DevOps or SRE?
The term “DevOps” emerged in industry in late 2008 and as of this writing (early
2016) is still in a state of flux. Its core principles—involvement of the IT function in
each phase of a system’s design and development, heavy reliance on automation ver‐
sus human effort, the application of engineering practices and tools to operations
tasks—are consistent with many of SRE’s principles and practices. One could view
DevOps as a generalization of several core SRE principles to a wider range of organi‐
zations, management structures, and personnel. One could equivalently view SRE as a
specific implementation of DevOps with some idiosyncratic extensions.
Tenets of SRE
While the nuances of workflows, priorities, and day-to-day operations vary from SRE
team to SRE team, all share a set of basic responsibilities for the service(s) they sup‐
port, and adhere to the same core tenets. In general, an SRE team is responsible for
the availability, latency, performance, efficiency, change management, monitoring,
emergency response, and capacity planning of their service(s). We have codified rules
of engagement and principles for how SRE teams interact with their environment—
not only the production environment, but also the product development teams, the
testing teams, the users, and so on. Those rules and work practices help us to main‐
tain our focus on engineering work, as opposed to operations work.
The following section discusses each of the core tenets of Google SRE.
Ensuring a Durable Focus on Engineering
As already discussed, Google caps operational work for SREs at 50% of their time.
Their remaining time should be spent using their coding skills on project work. In
practice, this is accomplished by monitoring the amount of operational work being
done by SREs, and redirecting excess operational work to the product development
teams: reassigning bugs and tickets to development managers, [re]integrating devel‐
opers into on-call pager rotations, and so on. The redirection ends when the opera‐
Tenets of SRE | 7

-- 33 of 550 --

tional load drops back to 50% or lower. This also provides an effective feedback
mechanism, guiding developers to build systems that don’t need manual intervention.
This approach works well when the entire organization—SRE and development alike
—understands why the safety valve mechanism exists, and supports the goal of hav‐
ing no overflow events because the product doesn’t generate enough operational load
to require it.
When they are focused on operations work, on average, SREs should receive a maxi‐
mum of two events per 8–12-hour on-call shift. This target volume gives the on-call
engineer enough time to handle the event accurately and quickly, clean up and
restore normal service, and then conduct a postmortem. If more than two events
occur regularly per on-call shift, problems can’t be investigated thoroughly and engi‐
neers are sufficiently overwhelmed to prevent them from learning from these events.
A scenario of pager fatigue also won’t improve with scale. Conversely, if on-call SREs
consistently receive fewer than one event per shift, keeping them on point is a waste
of their time.
Postmortems should be written for all significant incidents, regardless of whether or
not they paged; postmortems that did not trigger a page are even more valuable, as
they likely point to clear monitoring gaps. This investigation should establish what
happened in detail, find all root causes of the event, and assign actions to correct the
problem or improve how it is addressed next time. Google operates under a blamefree postmortem culture, with the goal of exposing faults and applying engineering to
fix these faults, rather than avoiding or minimizing them.
Pursuing Maximum Change Velocity Without Violating a Service’s SLO
Product development and SRE teams can enjoy a productive working relationship by
eliminating the structural conflict in their respective goals. The structural conflict is
between pace of innovation and product stability, and as described earlier, this con‐
flict often is expressed indirectly. In SRE we bring this conflict to the fore, and then
resolve it with the introduction of an error budget.
The error budget stems from the observation that 100% is the wrong reliability target
for basically everything (pacemakers and anti-lock brakes being notable exceptions).
In general, for any software service or system, 100% is not the right reliability target
because no user can tell the difference between a system being 100% available and
99.999% available. There are many other systems in the path between user and ser‐
vice (their laptop, their home WiFi, their ISP, the power grid…) and those systems
collectively are far less than 99.999% available. Thus, the marginal difference between
99.999% and 100% gets lost in the noise of other unavailability, and the user receives
no benefit from the enormous effort required to add that last 0.001% of availability.
8 | Chapter 1: Introduction

---

## [Sección 29] CHAPTER 1

-- 34 of 550 --

If 100% is the wrong reliability target for a system, what, then, is the right reliability
target for the system? This actually isn’t a technical question at all—it’s a product
question, which should take the following considerations into account:
• What level of availability will the users be happy with, given how they use the
product?
• What alternatives are available to users who are dissatisfied with the product’s
availability?
• What happens to users’ usage of the product at different availability levels?
The business or the product must establish the system’s availability target. Once that
target is established, the error budget is one minus the availability target. A service
that’s 99.99% available is 0.01% unavailable. That permitted 0.01% unavailability is
the service’s error budget. We can spend the budget on anything we want, as long as
we don’t overspend it.
So how do we want to spend the error budget? The development team wants to
launch features and attract new users. Ideally, we would spend all of our error budget
taking risks with things we launch in order to launch them quickly. This basic prem‐
ise describes the whole model of error budgets. As soon as SRE activities are concep‐
tualized in this framework, freeing up the error budget through tactics such as phased
rollouts and 1% experiments can optimize for quicker launches.
The use of an error budget resolves the structural conflict of incentives between
development and SRE. SRE’s goal is no longer “zero outages”; rather, SREs and prod‐
uct developers aim to spend the error budget getting maximum feature velocity. This
change makes all the difference. An outage is no longer a “bad” thing—it is an
expected part of the process of innovation, and an occurrence that both development
and SRE teams manage rather than fear.
Monitoring
Monitoring is one of the primary means by which service owners keep track of a sys‐
tem’s health and availability. As such, monitoring strategy should be constructed
thoughtfully. A classic and common approach to monitoring is to watch for a specific
value or condition, and then to trigger an email alert when that value is exceeded or
that condition occurs. However, this type of email alerting is not an effective solution:
a system that requires a human to read an email and decide whether or not some type
of action needs to be taken in response is fundamentally flawed. Monitoring should
never require a human to interpret any part of the alerting domain. Instead, software
should do the interpreting, and humans should be notified only when they need to
take action.
Tenets of SRE | 9

-- 35 of 550 --

2 See “Disaster Role Playing” on page 401.
There are three kinds of valid monitoring output:
Alerts
Signify that a human needs to take action immediately in response to something
that is either happening or about to happen, in order to improve the situation.
Tickets
Signify that a human needs to take action, but not immediately. The system can‐
not automatically handle the situation, but if a human takes action in a few days,
no damage will result.
Logging
No one needs to look at this information, but it is recorded for diagnostic or for‐
ensic purposes. The expectation is that no one reads logs unless something else
prompts them to do so.
Emergency Response
Reliability is a function of mean time to failure (MTTF) and mean time to repair
(MTTR) [Sch15]. The most relevant metric in evaluating the effectiveness of emer‐
gency response is how quickly the response team can bring the system back to health
—that is, the MTTR.
Humans add latency. Even if a given system experiences more actual failures, a sys‐
tem that can avoid emergencies that require human intervention will have higher
availability than a system that requires hands-on intervention. When humans are
necessary, we have found that thinking through and recording the best practices
ahead of time in a “playbook” produces roughly a 3x improvement in MTTR as com‐
pared to the strategy of “winging it.” The hero jack-of-all-trades on-call engineer does
work, but the practiced on-call engineer armed with a playbook works much better.
While no playbook, no matter how comprehensive it may be, is a substitute for smart
engineers able to think on the fly, clear and thorough troubleshooting steps and tips
are valuable when responding to a high-stakes or time-sensitive page. Thus, Google
SRE relies on on-call playbooks, in addition to exercises such as the “Wheel of Mis‐
fortune,”2 to prepare engineers to react to on-call events.
Change Management
SRE has found that roughly 70% of outages are due to changes in a live system. Best
practices in this domain use automation to accomplish the following:
10 | Chapter 1: Introduction

---

## [Sección 30] CHAPTER 1

-- 36 of 550 --

• Implementing progressive rollouts
• Quickly and accurately detecting problems
• Rolling back changes safely when problems arise
This trio of practices effectively minimizes the aggregate number of users and opera‐
tions exposed to bad changes. By removing humans from the loop, these practices
avoid the normal problems of fatigue, familiarity/contempt, and inattention to highly
repetitive tasks. As a result, both release velocity and safety increase.
Demand Forecasting and Capacity Planning
Demand forecasting and capacity planning can be viewed as ensuring that there is
sufficient capacity and redundancy to serve projected future demand with the
required availability. There’s nothing particularly special about these concepts, except
that a surprising number of services and teams don’t take the steps necessary to
ensure that the required capacity is in place by the time it is needed. Capacity plan‐
ning should take both organic growth (which stems from natural product adoption
and usage by customers) and inorganic growth (which results from events like feature
launches, marketing campaigns, or other business-driven changes) into account.
Several steps are mandatory in capacity planning:
• An accurate organic demand forecast, which extends beyond the lead time
required for acquiring capacity
• An accurate incorporation of inorganic demand sources into the demand
forecast
• Regular load testing of the system to correlate raw capacity (servers, disks, and so
on) to service capacity
Because capacity is critical to availability, it naturally follows that the SRE team must
be in charge of capacity planning, which means they also must be in charge of provi‐
sioning.
Provisioning
Provisioning combines both change management and capacity planning. In our
experience, provisioning must be conducted quickly and only when necessary, as
capacity is expensive. This exercise must also be done correctly or capacity doesn’t
work when needed. Adding new capacity often involves spinning up a new instance
or location, making significant modification to existing systems (configuration files,
load balancers, networking), and validating that the new capacity performs and deliv‐
ers correct results. Thus, it is a riskier operation than load shifting, which is often
Tenets of SRE | 11

-- 37 of 550 --

3 For further discussion of how this collaboration can work in practice, see “Communications: Production
Meetings” on page 426.
done multiple times per hour, and must be treated with a corresponding degree of
extra caution.
Efficiency and Performance
Efficient use of resources is important any time a service cares about money. Because
SRE ultimately controls provisioning, it must also be involved in any work on utiliza‐
tion, as utilization is a function of how a given service works and how it is provi‐
sioned. It follows that paying close attention to the provisioning strategy for a service,
and therefore its utilization, provides a very, very big lever on the service’s total costs.
Resource use is a function of demand (load), capacity, and software efficiency. SREs
predict demand, provision capacity, and can modify the software. These three factors
are a large part (though not the entirety) of a service’s efficiency.
Software systems become slower as load is added to them. A slowdown in a service
equates to a loss of capacity. At some point, a slowing system stops serving, which
corresponds to infinite slowness. SREs provision to meet a capacity target at a specific
response speed, and thus are keenly interested in a service’s performance. SREs and
product developers will (and should) monitor and modify a service to improve its
performance, thus adding capacity and improving efficiency.3
The End of the Beginning
Site Reliability Engineering represents a significant break from existing industry best
practices for managing large, complicated services. Motivated originally by familiarity
—“as a software engineer, this is how I would want to invest my time to accomplish a
set of repetitive tasks”—it has become much more: a set of principles, a set of practi‐
ces, a set of incentives, and a field of endeavor within the larger software engineering
discipline. The rest of the book explores the SRE Way in detail.
12 | Chapter 1: Introduction

---

## [Sección 31] CHAPTER 1

-- 38 of 550 --

1 Well, roughly the same. Mostly. Except for the stuff that is different. Some datacenters end up with multiple
generations of compute hardware, and sometimes we augment datacenters after they are built. But for the
most part, our datacenter hardware is homogeneous.

---

## [Sección 32] CHAPTER 2

The Production Environment at Google,
from the Viewpoint of an SRE
Written by JC van Winkel
Edited by Betsy Beyer
Google datacenters are very different from most conventional datacenters and smallscale server farms. These differences present both extra problems and opportunities.
This chapter discusses the challenges and opportunities that characterize Google
datacenters and introduces terminology that is used throughout the book.
Hardware
Most of Google’s compute resources are in Google-designed datacenters with propri‐
etary power distribution, cooling, networking, and compute hardware (see [Bar13]).
Unlike “standard” colocation datacenters, the compute hardware in a Googledesigned datacenter is the same across the board.1 To eliminate the confusion
between server hardware and server software, we use the following terminology
throughout the book:
Machine
A piece of hardware (or perhaps a VM)
Server
A piece of software that implements a service
-- 39 of 550 --

Machines can run any server, so we don’t dedicate specific machines to specific server
programs. There’s no specific machine that runs our mail server, for example. Instead,
resource allocation is handled by our cluster operating system, Borg.
We realize this use of the word server is unusual. The common use of the word con‐
flates “binary that accepts network connection” with machine, but differentiating
between the two is important when talking about computing at Google. Once you get
used to our usage of server, it becomes more apparent why it makes sense to use this
specialized terminology, not just within Google but also in the rest of this book.
Figure 2-1 illustrates the topology of a Google datacenter:
• Tens of machines are placed in a rack.
• Racks stand in a row.
• One or more rows form a cluster.
• Usually a datacenter building houses multiple clusters.
• Multiple datacenter buildings that are located close together form a campus.
Figure 2-1. Example Google datacenter campus topology
Machines within a given datacenter need to be able to talk with each other, so we cre‐
ated a very fast virtual switch with tens of thousands of ports. We accomplished this
by connecting hundreds of Google-built switches in a Clos network fabric [Clos53]
named Jupiter [Sin15]. In its largest configuration, Jupiter supports 1.3 Pbps bisection
bandwidth among servers.
14 | Chapter 2: The Production Environment at Google, from the Viewpoint of an SRE

-- 40 of 550 --

2 Some readers may be more familiar with Borg’s descendant, Kubernetes—an open source Container Cluster
orchestration framework started by Google in 2014; see http://kubernetes.io and [Bur16]. For more details on
the similarities between Borg and Apache Mesos, see [Ver15].
Datacenters are connected to each other with our globe-spanning backbone network
B4 [Jai13]. B4 is a software-defined networking architecture (and uses the OpenFlow
open-standard communications protocol). It supplies massive bandwidth to a modest
number of sites, and uses elastic bandwidth allocation to maximize average band‐
width [Kum15].
System Software That “Organizes” the Hardware
Our hardware must be controlled and administered by software that can handle mas‐
sive scale. Hardware failures are one notable problem that we manage with software.
Given the large number of hardware components in a cluster, hardware failures occur
quite frequently. In a single cluster in a typical year, thousands of machines fail and
thousands of hard disks break; when multiplied by the number of clusters we operate
globally, these numbers become somewhat breathtaking. Therefore, we want to
abstract such problems away from users, and the teams running our services similarly
don’t want to be bothered by hardware failures. Each datacenter campus has teams
dedicated to maintaining the hardware and datacenter infrastructure.
Managing Machines
Borg, illustrated in Figure 2-2, is a distributed cluster operating system [Ver15], simi‐
lar to Apache Mesos.2 Borg manages its jobs at the cluster level.
Figure 2-2. High-level Borg cluster architecture
System Software That “Organizes” the Hardware | 15

---

## [Sección 33] CHAPTER 2

-- 41 of 550 --

Borg is responsible for running users’ jobs, which can either be indefinitely running
servers or batch processes like a MapReduce [Dea04]. Jobs can consist of more than
one (and sometimes thousands) of identical tasks, both for reasons of reliability and
because a single process can’t usually handle all cluster traffic. When Borg starts a job,
it finds machines for the tasks and tells the machines to start the server program.
Borg then continually monitors these tasks. If a task malfunctions, it is killed and
restarted, possibly on a different machine.
Because tasks are fluidly allocated over machines, we can’t simply rely on IP addresses
and port numbers to refer to the tasks. We solve this problem with an extra level of
indirection: when starting a job, Borg allocates a name and index number to each task
using the Borg Naming Service (BNS). Rather than using the IP address and port
number, other processes connect to Borg tasks via the BNS name, which is translated
to an IP address and port number by BNS. For example, the BNS path might be a
string such as /bns/<cluster>/<user>/<job name>/<task number>, which would
resolve to <IP address>:<port>.
Borg is also responsible for the allocation of resources to jobs. Every job needs to
specify its required resources (e.g., 3 CPU cores, 2 GiB of RAM). Using the list of
requirements for all jobs, Borg can binpack the tasks over the machines in an optimal
way that also accounts for failure domains (for example: Borg won’t run all of a job’s
tasks on the same rack, as doing so means that the top of rack switch is a single point
of failure for that job).
If a task tries to use more resources than it requested, Borg kills the task and restarts
it (as a slowly crashlooping task is usually preferable to a task that hasn’t been restar‐
ted at all).
Storage
Tasks can use the local disk on machines as a scratch pad, but we have several cluster
storage options for permanent storage (and even scratch space will eventually move
to the cluster storage model). These are comparable to Lustre and the Hadoop Dis‐
tributed File System (HDFS), which are both open source cluster filesystems.
The storage layer is responsible for offering users easy and reliable access to the stor‐
age available for a cluster. As shown in Figure 2-3, storage has many layers:
1. The lowest layer is called D (for disk, although D uses both spinning disks and
flash storage). D is a fileserver running on almost all machines in a cluster. How‐
ever, users who want to access their data don’t want to have to remember which
machine is storing their data, which is where the next layer comes into play.
2. A layer on top of D called Colossus creates a cluster-wide filesystem that offers
usual filesystem semantics, as well as replication and encryption. Colossus is the
successor to GFS, the Google File System [Ghe03].
16 | Chapter 2: The Production Environment at Google, from the Viewpoint of an SRE

-- 42 of 550 --

3. There are several database-like services built on top of Colossus:
a. Bigtable [Cha06] is a NoSQL database system that can handle databases that
are petabytes in size. A Bigtable is a sparse, distributed, persistent multidi‐
mensional sorted map that is indexed by row key, column key, and timestamp;
each value in the map is an uninterpreted array of bytes. Bigtable supports
eventually consistent, cross-datacenter replication.
b. Spanner [Cor12] offers an SQL-like interface for users that require real con‐
sistency across the world.
c. Several other database systems, such as Blobstore, are available. Each of these
options comes with its own set of trade-offs (see Chapter 26).
Figure 2-3. Portions of the Google storage stack
Networking
Google’s network hardware is controlled in several ways. As discussed earlier, we use
an OpenFlow-based software-defined network. Instead of using “smart” routing
hardware, we rely on less expensive “dumb” switching components in combination
with a central (duplicated) controller that precomputes best paths across the network.
Therefore, we’re able to move compute-expensive routing decisions away from the
routers and use simple switching hardware.
Network bandwidth needs to be allocated wisely. Just as Borg limits the compute
resources that a task can use, the Bandwidth Enforcer (BwE) manages the available
bandwidth to maximize the average available bandwidth. Optimizing bandwidth isn’t
System Software That “Organizes” the Hardware | 17

---

## [Sección 34] CHAPTER 2

-- 43 of 550 --

just about cost: centralized traffic engineering has been shown to solve a number of
problems that are traditionally extremely difficult to solve through a combination of
distributed routing and traffic engineering [Kum15].
Some services have jobs running in multiple clusters, which are distributed across the
world. In order to minimize latency for globally distributed services, we want to
direct users to the closest datacenter with available capacity. Our Global Software
Load Balancer (GSLB) performs load balancing on three levels:
• Geographic load balancing for DNS requests (for example, to www.google.com),
described in Chapter 19
• Load balancing at a user service level (for example, YouTube or Google Maps)
• Load balancing at the Remote Procedure Call (RPC) level, described in Chap‐
ter 20
Service owners specify a symbolic name for a service, a list of BNS addresses of
servers, and the capacity available at each of the locations (typically measured in
queries per second). GSLB then directs traffic to the BNS addresses.
Other System Software
Several other components in a datacenter are also important.
Lock Service
The Chubby [Bur06] lock service provides a filesystem-like API for maintaining
locks. Chubby handles these locks across datacenter locations. It uses the Paxos pro‐
tocol for asynchronous Consensus (see Chapter 23).
Chubby also plays an important role in master election. When a service has five repli‐
cas of a job running for reliability purposes but only one replica may perform actual
work, Chubby is used to select which replica may proceed.
Data that must be consistent is well suited to storage in Chubby. For this reason, BNS
uses Chubby to store mapping between BNS paths and IP address:port pairs.
Monitoring and Alerting
We want to make sure that all services are running as required. Therefore, we run
many instances of our Borgmon monitoring program (see Chapter 10). Borgmon reg‐
ularly “scrapes” metrics from monitored servers. These metrics can be used instanta‐
neously for alerting and also stored for use in historic overviews (e.g., graphs). We
can use monitoring in several ways:
18 | Chapter 2: The Production Environment at Google, from the Viewpoint of an SRE

-- 44 of 550 --

3 See http://grpc.io.
4 Protocol buffers are a language-neutral, platform-neutral extensible mechanism for serializing structured
data. For more details, see https://developers.google.com/protocol-buffers/.
• Set up alerting for acute problems.
• Compare behavior: did a software update make the server faster?
• Examine how resource consumption behavior evolves over time, which is essen‐
tial for capacity planning.
Our Software Infrastructure
Our software architecture is designed to make the most efficient use of our hardware
infrastructure. Our code is heavily multithreaded, so one task can easily use many
cores. To facilitate dashboards, monitoring, and debugging, every server has an
HTTP server that provides diagnostics and statistics for a given task.
All of Google’s services communicate using a Remote Procedure Call (RPC) infra‐
structure named Stubby; an open source version, gRPC, is available.3 Often, an RPC
call is made even when a call to a subroutine in the local program needs to be per‐
formed. This makes it easier to refactor the call into a different server if more modu‐
larity is needed, or when a server’s codebase grows. GSLB can load balance RPCs in
the same way it load balances externally visible services.
A server receives RPC requests from its frontend and sends RPCs to its backend. In
traditional terms, the frontend is called the client and the backend is called the server.
Data is transferred to and from an RPC using protocol buffers,4 often abbreviated to
“protobufs,” which are similar to Apache’s Thrift. Protocol buffers have many advan‐
tages over XML for serializing structured data: they are simpler to use, 3 to 10 times
smaller, 20 to 100 times faster, and less ambiguous.
Our Development Environment
Development velocity is very important to Google, so we’ve built a complete develop‐
ment environment to make use of our infrastructure [Mor12b].
Apart from a few groups that have their own open source repositories (e.g., Android
and Chrome), Google Software Engineers work from a single shared repository
[Pot16]. This has a few important practical implications for our workflows:
Our Software Infrastructure | 19

---

## [Sección 35] CHAPTER 2

-- 45 of 550 --

• If engineers encounter a problem in a component outside of their project, they
can fix the problem, send the proposed changes (“changelist,” or CL) to the
owner for review, and submit the CL to the mainline.
• Changes to source code in an engineer’s own project require a review. All soft‐
ware is reviewed before being submitted.
When software is built, the build request is sent to build servers in a datacenter. Even
large builds are executed quickly, as many build servers can compile in parallel. This
infrastructure is also used for continuous testing. Each time a CL is submitted, tests
run on all software that may depend on that CL, either directly or indirectly. If the
framework determines that the change likely broke other parts in the system, it noti‐
fies the owner of the submitted change. Some projects use a push-on-green system,
where a new version is automatically pushed to production after passing tests.
Shakespeare: A Sample Service
To provide a model of how a service would hypothetically be deployed in the Google
production environment, let’s look at an example service that interacts with multiple
Google technologies. Suppose we want to offer a service that lets you determine
where a given word is used throughout all of Shakespeare’s works.
We can divide this system into two parts:
• A batch component that reads all of Shakespeare’s texts, creates an index, and
writes the index into a Bigtable. This job need only run once, or perhaps very
infrequently (as you never know if a new text might be discovered!).
• An application frontend that handles end-user requests. This job is always up, as
users in all time zones will want to search in Shakespeare’s books.
The batch component is a MapReduce comprising three phases.
The mapping phase reads Shakespeare’s texts and splits them into individual words.
This is faster if performed in parallel by multiple workers.
The shuffle phase sorts the tuples by word.
In the reduce phase, a tuple of (word, list of locations) is created.
Each tuple is written to a row in a Bigtable, using the word as the key.
20 | Chapter 2: The Production Environment at Google, from the Viewpoint of an SRE

-- 46 of 550 --

Life of a Request
Figure 2-4 shows how a user’s request is serviced: first, the user points their browser
to shakespeare.google.com. To obtain the corresponding IP address, the user’s device
resolves the address with its DNS server (1). This request ultimately ends up at Goo‐
gle’s DNS server, which talks to GSLB. As GSLB keeps track of traffic load among
frontend servers across regions, it picks which server IP address to send to this user.
Figure 2-4. The life of a request
The browser connects to the HTTP server on this IP. This server (named the Google
Frontend, or GFE) is a reverse proxy that terminates the TCP connection (2). The
GFE looks up which service is required (web search, maps, or—in this case—Shake‐
speare). Again using GSLB, the server finds an available Shakespeare frontend server,
and sends that server an RPC containing the HTML request (3).
The Shakespeare server analyzes the HTML request and constructs a protobuf con‐
taining the word to look up. The Shakespeare frontend server now needs to contact
the Shakespeare backend server: the frontend server contacts GSLB to obtain the BNS
address of a suitable and unloaded backend server (4). That Shakespeare backend
server now contacts a Bigtable server to obtain the requested data (5).
The answer is written to the reply protobuf and returned to the Shakespeare backend
server. The backend hands a protobuf containing the results to the Shakespeare
frontend server, which assembles the HTML and returns the answer to the user.
This entire chain of events is executed in the blink of an eye—just a few hundred mil‐
liseconds! Because many moving parts are involved, there are many potential points
of failure; in particular, a failing GSLB would wreak havoc. However, Google’s policies
of rigorous testing and careful rollout, in addition to our proactive error recovery
Shakespeare: A Sample Service | 21

---

## [Sección 36] CHAPTER 2

-- 47 of 550 --

5 We assume the probability of two simultaneous task failures in our environment is low enough to be negligi‐
ble. Single points of failure, such as top-of-rack switches or power distribution, may make this assumption
invalid in other environments.
methods such as graceful degradation, allow us to deliver the reliable service that our
users have come to expect. After all, people regularly use www.google.com to check if
their Internet connection is set up correctly.
Job and Data Organization
Load testing determined that our backend server can handle about 100 queries per
second (QPS). Trials performed with a limited set of users lead us to expect a peak
load of about 3,470 QPS, so we need at least 35 tasks. However, the following consid‐
erations mean that we need at least 37 tasks in the job, or N + 2:
• During updates, one task at a time will be unavailable, leaving 36 tasks.
• A machine failure might occur during a task update, leaving only 35 tasks, just
enough to serve peak load.5
A closer examination of user traffic shows our peak usage is distributed globally:
1,430 QPS from North America, 290 from South America, 1,400 from Europe and
Africa, and 350 from Asia and Australia. Instead of locating all backends at one site,
we distribute them across the USA, South America, Europe, and Asia. Allowing for
N + 2 redundancy per region means that we end up with 17 tasks in the USA, 16 in
Europe, and 6 in Asia. However, we decide to use 4 tasks (instead of 5) in South
America, to lower the overhead of N + 2 to N + 1. In this case, we’re willing to toler‐
ate a small risk of higher latency in exchange for lower hardware costs: if GSLB redi‐
rects traffic from one continent to another when our South American datacenter is
over capacity, we can save 20% of the resources we’d spend on hardware. In the larger
regions, we’ll spread tasks across two or three clusters for extra resiliency.
Because the backends need to contact the Bigtable holding the data, we need to also
design this storage element strategically. A backend in Asia contacting a Bigtable in
the USA adds a significant amount of latency, so we replicate the Bigtable in each
region. Bigtable replication helps us in two ways: it provides resilience should a
Bigtable server fail, and it lowers data-access latency. While Bigtable only offers even‐
tual consistency, it isn’t a major problem because we don’t need to update the contents
often.
We’ve introduced a lot of terminology here; while you don’t need to remember it all,
it’s useful for framing many of the other systems we’ll refer to later.
22 | Chapter 2: The Production Environment at Google, from the Viewpoint of an SRE

-- 48 of 550 --

---

## [Sección 37] PART II

Principles
This section examines the principles underlying how SRE teams typically work—the
patterns, behaviors, and areas of concern that influence the general domain of SRE
operations.
The first chapter in this section, and the most important piece to read if you want to
attain the widest-angle picture of what exactly SRE does, and how we reason about it,
is Chapter 3, Embracing Risk. It looks at SRE through the lens of risk—its assessment,
management, and the use of error budgets to provide usefully neutral approaches to
service management.
Service level objectives are another foundational conceptual unit for SRE. The indus‐
try commonly lumps disparate concepts under the general banner of service level
agreements, a tendency that makes it harder to think about these concepts clearly.

---

## [Sección 38] Chapter 4, Service Level Objectives, attempts to disentangle indicators from objectives

from agreements, examines how SRE uses each of these terms, and provides some
recommendations on how to find useful metrics for your own applications.
Eliminating toil is one of SRE’s most important tasks, and is the subject of Chapter 5,
Eliminating Toil. We define toil as mundane, repetitive operational work providing no
enduring value, which scales linearly with service growth.
Whether it is at Google or elsewhere, monitoring is an absolutely essential compo‐
nent of doing the right thing in production. If you can’t monitor a service, you don’t
know what’s happening, and if you’re blind to what’s happening, you can’t be reliable.
Read Chapter 6, Monitoring Distributed Systems, for some recommendations for what
and how to monitor, and some implementation-agnostic best practices.

-- 49 of 550 --

In Chapter 7, The Evolution of Automation at Google, we examine SRE’s approach to
automation, and walk through some case studies of how SRE has implemented auto‐
mation, both successfully and unsuccessfully.
Most companies treat release engineering as an afterthought. However, as you’ll learn
in Chapter 8, Release Engineering, release engineering is not just critical to overall sys‐
tem stability—as most outages result from pushing a change of some kind. It is also
the best way to ensure that releases are consistent.
A key principle of any effective software engineering, not only reliability-oriented
engineering, simplicity is a quality that, once lost, can be extraordinarily difficult to
recapture. Nevertheless, as the old adage goes, a complex system that works necessar‐
ily evolved from a simple system that works. Chapter 9, Simplicity, goes into this topic
in detail.
Further Reading from Google SRE
Increasing product velocity safely is a core principle for any organization. In “Making
Push On Green a Reality” [Kle14], published in October 2014, we show that taking
humans out of the release process can paradoxically reduce SREs’ toil while increasing
system reliability.
www.allitebooks.com

-- 50 of 550 --

---

## [Sección 39] CHAPTER 3

Embracing Risk
Written by Marc Alvidrez
Edited by Kavita Guliani
You might expect Google to try to build 100% reliable services—ones that never fail.
It turns out that past a certain point, however, increasing reliability is worse for a ser‐
vice (and its users) rather than better! Extreme reliability comes at a cost: maximizing
stability limits how fast new features can be developed and how quickly products can
be delivered to users, and dramatically increases their cost, which in turn reduces the
numbers of features a team can afford to offer. Further, users typically don’t notice the
difference between high reliability and extreme reliability in a service, because the
user experience is dominated by less reliable components like the cellular network or
the device they are working with. Put simply, a user on a 99% reliable smartphone
cannot tell the difference between 99.99% and 99.999% service reliability! With this
in mind, rather than simply maximizing uptime, Site Reliability Engineering seeks to
balance the risk of unavailability with the goals of rapid innovation and efficient ser‐
vice operations, so that users’ overall happiness—with features, service, and perfor‐
mance—is optimized.
Managing Risk
Unreliable systems can quickly erode users’ confidence, so we want to reduce the
chance of system failure. However, experience shows that as we build systems, cost
does not increase linearly as reliability increments—an incremental improvement in
reliability may cost 100x more than the previous increment. The costliness has two
dimensions:
-- 51 of 550 --

The cost of redundant machine/compute resources
The cost associated with redundant equipment that, for example, allows us to
take systems offline for routine or unforeseen maintenance, or provides space for
us to store parity code blocks that provide a minimum data durability guarantee.
The opportunity cost
The cost borne by an organization when it allocates engineering resources to
build systems or features that diminish risk instead of features that are directly
visible to or usable by end users. These engineers no longer work on new features
and products for end users.
In SRE, we manage service reliability largely by managing risk. We conceptualize risk
as a continuum. We give equal importance to figuring out how to engineer greater
reliability into Google systems and identifying the appropriate level of tolerance for
the services we run. Doing so allows us to perform a cost/benefit analysis to deter‐
mine, for example, where on the (nonlinear) risk continuum we should place Search,
Ads, Gmail, or Photos. Our goal is to explicitly align the risk taken by a given service
with the risk the business is willing to bear. We strive to make a service reliable
enough, but no more reliable than it needs to be. That is, when we set an availability
target of 99.99%,we want to exceed it, but not by much: that would waste opportuni‐
ties to add features to the system, clean up technical debt, or reduce its operational
costs. In a sense, we view the availability target as both a minimum and a maximum.
The key advantage of this framing is that it unlocks explicit, thoughtful risktaking.
Measuring Service Risk
As standard practice at Google, we are often best served by identifying an objective
metric to represent the property of a system we want to optimize. By setting a target,
we can assess our current performance and track improvements or degradations over
time. For service risk, it is not immediately clear how to reduce all of the potential
factors into a single metric. Service failures can have many potential effects, including
user dissatisfaction, harm, or loss of trust; direct or indirect revenue loss; brand or
reputational impact; and undesirable press coverage. Clearly, some of these factors
are very hard to measure. To make this problem tractable and consistent across many
types of systems we run, we focus on unplanned downtime.
For most services, the most straightforward way of representing risk tolerance is in
terms of the acceptable level of unplanned downtime. Unplanned downtime is cap‐
tured by the desired level of service availability, usually expressed in terms of the
number of “nines” we would like to provide: 99.9%, 99.99%, or 99.999% availability.
Each additional nine corresponds to an order of magnitude improvement toward
100% availability. For serving systems, this metric is traditionally calculated based on
the proportion of system uptime (see Equation 3-1).
26 | Chapter 3: Embracing Risk

---

## [Sección 40] CHAPTER 3

-- 52 of 550 --

Equation 3-1. Time-based availability
availability = uptime
uptime + downtime
Using this formula over the period of a year, we can calculate the acceptable number
of minutes of downtime to reach a given number of nines of availability. For example,
a system with an availability target of 99.99% can be down for up to 52.56 minutes in
a year and stay within its availability target; see Appendix A for a table.
At Google, however, a time-based metric for availability is usually not meaningful
because we are looking across globally distributed services. Our approach to fault iso‐
lation makes it very likely that we are serving at least a subset of traffic for a given
service somewhere in the world at any given time (i.e., we are at least partially “up” at
all times). Therefore, instead of using metrics around uptime, we define availability in
terms of the request success rate. Equation 3-2 shows how this yield-based metric is
calculated over a rolling window (i.e., proportion of successful requests over a oneday window).
Equation 3-2. Aggregate availability
availability = successful requests
total requests
For example, a system that serves 2.5M requests in a day with a daily availability tar‐
get of 99.99% can serve up to 250 errors and still hit its target for that given day.
In a typical application, not all requests are equal: failing a new user sign-up request is
different from failing a request polling for new email in the background. In many
cases, however, availability calculated as the request success rate over all requests is a
reasonable approximation of unplanned downtime, as viewed from the end-user per‐
spective.
Quantifying unplanned downtime as a request success rate also makes this availabil‐
ity metric more amenable for use in systems that do not typically serve end users
directly. Most nonserving systems (e.g., batch, pipeline, storage, and transactional
systems) have a well-defined notion of successful and unsuccessful units of work.
Indeed, while the systems discussed in this chapter are primarily consumer and infra‐
structure serving systems, many of the same principles also apply to nonserving sys‐
tems with minimal modification.
For example, a batch process that extracts, transforms, and inserts the contents of one
of our customer databases into a data warehouse to enable further analysis may be set
to run periodically. Using a request success rate defined in terms of records success‐
fully and unsuccessfully processed, we can calculate a useful availability metric
despite the fact that the batch system does not run constantly.
Measuring Service Risk | 27

-- 53 of 550 --

Most often, we set quarterly availability targets for a service and track our perfor‐
mance against those targets on a weekly, or even daily, basis. This strategy lets us
manage the service to a high-level availability objective by looking for, tracking down,
and fixing meaningful deviations as they inevitably arise. See Chapter 4 for more
details.
Risk Tolerance of Services
What does it mean to identify the risk tolerance of a service? In a formal environment
or in the case of safety-critical systems, the risk tolerance of services is typically built
directly into the basic product or service definition. At Google, services’ risk tolerance
tends to be less clearly defined.
To identify the risk tolerance of a service, SREs must work with the product owners
to turn a set of business goals into explicit objectives to which we can engineer. In this
case, the business goals we’re concerned about have a direct impact on the perfor‐
mance and reliability of the service offered. In practice, this translation is easier said
than done. While consumer services often have clear product owners, it is unusual
for infrastructure services (e.g., storage systems or a general-purpose HTTP caching
layer) to have a similar structure of product ownership. We’ll discuss the consumer
and infrastructure cases in turn.
Identifying the Risk Tolerance of Consumer Services
Our consumer services often have a product team that acts as the business owner for
an application. For example, Search, Google Maps, and Google Docs each have their
own product managers. These product managers are charged with understanding the
users and the business, and for shaping the product for success in the marketplace.
When a product team exists, that team is usually the best resource to discuss the reli‐
ability requirements for a service. In the absence of a dedicated product team, the
engineers building the system often play this role either knowingly or unknowingly.
There are many factors to consider when assessing the risk tolerance of services, such
as the following:
• What level of availability is required?
• Do different types of failures have different effects on the service?
• How can we use the service cost to help locate a service on the risk continuum?
• What other service metrics are important to take into account?
28 | Chapter 3: Embracing Risk

---

## [Sección 41] CHAPTER 3

-- 54 of 550 --

Target level of availability
The target level of availability for a given Google service usually depends on the func‐
tion it provides and how the service is positioned in the marketplace. The following
list includes issues to consider:
• What level of service will the users expect?
• Does this service tie directly to revenue (either our revenue, or our customers’
revenue)?
• Is this a paid service, or is it free?
• If there are competitors in the marketplace, what level of service do those com‐
petitors provide?
• Is this service targeted at consumers, or at enterprises?
Consider the requirements of Google Apps for Work. The majority of its users are
enterprise users, some large and some small. These enterprises depend on Google
Apps for Work services (e.g., Gmail, Calendar, Drive, Docs) to provide tools that
enable their employees to perform their daily work. Stated another way, an outage for
a Google Apps for Work service is an outage not only for Google, but also for all the
enterprises that critically depend on us. For a typical Google Apps for Work service,
we might set an external quarterly availability target of 99.9%, and back this target
with a stronger internal availability target and a contract that stipulates penalties if we
fail to deliver to the external target.
YouTube provides a contrasting set of considerations. When Google acquired You‐
Tube, we had to decide on the appropriate availability target for the website. In 2006,
YouTube was focused on consumers and was in a very different phase of its business
lifecycle than Google was at the time. While YouTube already had a great product, it
was still changing and growing rapidly. We set a lower availability target for YouTube
than for our enterprise products because rapid feature development was correspond‐
ingly more important.
Types of failures
The expected shape of failures for a given service is another important consideration.
How resilient is our business to service downtime? Which is worse for the service: a
constant low rate of failures, or an occasional full-site outage? Both types of failure
may result in the same absolute number of errors, but may have vastly different
impacts on the business.
An illustrative example of the difference between full and partial outages naturally
arises in systems that serve private information. Consider a contact management
application, and the difference between intermittent failures that cause profile pic‐
tures to fail to render, versus a failure case that results in a user’s private contacts
Risk Tolerance of Services | 29

-- 55 of 550 --

being shown to another user. The first case is clearly a poor user experience, and
SREs would work to remediate the problem quickly. In the second case, however, the
risk of exposing private data could easily undermine basic user trust in a significant
way. As a result, taking down the service entirely would be appropriate during the
debugging and potential clean-up phase for the second case.
At the other end of services offered by Google, it is sometimes acceptable to have reg‐
ular outages during maintenance windows. A number of years ago, the Ads Frontend
used to be one such service. It is used by advertisers and website publishers to set up,
configure, run, and monitor their advertising campaigns. Because most of this work
takes place during normal business hours, we determined that occasional, regular,
scheduled outages in the form of maintenance windows would be acceptable, and we
counted these scheduled outages as planned downtime, not unplanned downtime.
Cost
Cost is often the key factor in determining the appropriate availability target for a ser‐
vice. Ads is in a particularly good position to make this trade-off because request suc‐
cesses and failures can be directly translated into revenue gained or lost. In
determining the availability target for each service, we ask questions such as:
• If we were to build and operate these systems at one more nine of availability,
what would our incremental increase in revenue be?
• Does this additional revenue offset the cost of reaching that level of reliability?
To make this trade-off equation more concrete, consider the following cost/benefit
for an example service where each request has equal value:
Proposed improvement in availability target: 99.9% → 99.99%
Proposed increase in availability: 0.09%
Service revenue: $1M
Value of improved availability: $1M * 0.0009 = $900
In this case, if the cost of improving availability by one nine is less than $900, it is
worth the investment. If the cost is greater than $900, the costs will exceed the projec‐
ted increase in revenue.
It may be harder to set these targets when we do not have a simple translation func‐
tion between reliability and revenue. One useful strategy may be to consider the back‐
ground error rate of ISPs on the Internet. If failures are being measured from the
end-user perspective and it is possible to drive the error rate for the service below the
background error rate, those errors will fall within the noise for a given user’s Internet
connection. While there are significant differences between ISPs and protocols (e.g.,
30 | Chapter 3: Embracing Risk

---

## [Sección 42] CHAPTER 3

-- 56 of 550 --

TCP versus UDP, IPv4 versus IPv6), we’ve measured the typical background error
rate for ISPs as falling between 0.01% and 1%.
Other service metrics
Examining the risk tolerance of services in relation to metrics besides availability is
often fruitful. Understanding which metrics are important and which metrics aren’t
important provides us with degrees of freedom when attempting to take thoughtful
risks.
Service latency for our Ads systems provides an illustrative example. When Google
first launched Web Search, one of the service’s key distinguishing features was speed.
When we introduced AdWords, which displays advertisements next to search results,
a key requirement of the system was that the ads should not slow down the search
experience. This requirement has driven the engineering goals in each generation of
AdWords systems and is treated as an invariant.
AdSense, Google’s ads system that serves contextual ads in response to requests from
JavaScript code that publishers insert into their websites, has a very different latency
goal. The latency goal for AdSense is to avoid slowing down the rendering of the
third-party page when inserting contextual ads. The specific latency target, then, is
dependent on the speed at which a given publisher’s page renders. This means that
AdSense ads can generally be served hundreds of milliseconds slower than AdWords
ads.
This looser serving latency requirement has allowed us to make many smart tradeoffs in provisioning (i.e., determining the quantity and locations of serving resources
we use), which save us substantial cost over naive provisioning. In other words, given
the relative insensitivity of the AdSense service to moderate changes in latency per‐
formance, we are able to consolidate serving into fewer geographical locations, reduc‐
ing our operational overhead.
Identifying the Risk Tolerance of Infrastructure Services
The requirements for building and running infrastructure components differ from
the requirements for consumer products in a number of ways. A fundamental differ‐
ence is that, by definition, infrastructure components have multiple clients, often with
varying needs.
Target level of availability
Consider Bigtable [Cha06], a massive-scale distributed storage system for structured
data. Some consumer services serve data directly from Bigtable in the path of a user
request. Such services need low latency and high reliability. Other teams use Bigtable
as a repository for data that they use to perform offline analysis (e.g., MapReduce) on
Risk Tolerance of Services | 31

-- 57 of 550 --

a regular basis. These teams tend to be more concerned about throughput than relia‐
bility. Risk tolerance for these two use cases is quite distinct.
One approach to meeting the needs of both use cases is to engineer all infrastructure
services to be ultra-reliable. Given the fact that these infrastructure services also tend
to aggregate huge amounts of resources, such an approach is usually far too expensive
in practice. To understand the different needs of the different types of users, you can
look at the desired state of the request queue for each type of Bigtable user.
Types of failures
The low-latency user wants Bigtable’s request queues to be (almost always) empty so
that the system can process each outstanding request immediately upon arrival.
(Indeed, inefficient queuing is often a cause of high tail latency.) The user concerned
with offline analysis is more interested in system throughput, so that user wants
request queues to never be empty. To optimize for throughput, the Bigtable system
should never need to idle while waiting for its next request.
As you can see, success and failure are antithetical for these sets of users. Success for
the low-latency user is failure for the user concerned with offline analysis.
Cost
One way to satisfy these competing constraints in a cost-effective manner is to parti‐
tion the infrastructure and offer it at multiple independent levels of service. In the
Bigtable example, we can build two types of clusters: low-latency clusters and
throughput clusters. The low-latency clusters are designed to be operated and used by
services that need low latency and high reliability. To ensure short queue lengths and
satisfy more stringent client isolation requirements, the Bigtable system can be provi‐
sioned with a substantial amount of slack capacity for reduced contention and
increased redundancy. The throughput clusters, on the other hand, can be provi‐
sioned to run very hot and with less redundancy, optimizing throughput over latency.
In practice, we are able to satisfy these relaxed needs at a much lower cost, perhaps as
little as 10–50% of the cost of a low-latency cluster. Given Bigtable’s massive scale, this
cost savings becomes significant very quickly.
The key strategy with regards to infrastructure is to deliver services with explicitly
delineated levels of service, thus enabling the clients to make the right risk and cost
trade-offs when building their systems. With explicitly delineated levels of service, the
infrastructure providers can effectively externalize the difference in the cost it takes to
provide service at a given level to clients. Exposing cost in this way motivates the cli‐
ents to choose the level of service with the lowest cost that still meets their needs. For
example, Google+ can decide to put data critical to enforcing user privacy in a highavailability, globally consistent datastore (e.g., a globally replicated SQL-like system
like Spanner [Cor12]), while putting optional data (data that isn’t critical, but that
32 | Chapter 3: Embracing Risk

---

## [Sección 43] CHAPTER 3

-- 58 of 550 --

1 An early version of this section appeared as an article in ;login: (August 2015, vol. 40, no. 4).
enhances the user experience) in a cheaper, less reliable, less fresh, and eventually
consistent datastore (e.g., a NoSQL store with best-effort replication like Bigtable).
Note that we can run multiple classes of services using identical hardware and soft‐
ware. We can provide vastly different service guarantees by adjusting a variety of ser‐
vice characteristics, such as the quantities of resources, the degree of redundancy, the
geographical provisioning constraints, and, critically, the infrastructure software
configuration.
Example: Frontend infrastructure
To demonstrate that these risk-tolerance assessment principles do not just apply to
storage infrastructure, let’s look at another large class of service: Google’s frontend
infrastructure. The frontend infrastructure consists of reverse proxy and load balanc‐
ing systems running close to the edge of our network. These are the systems that,
among other things, serve as one endpoint of the connections from end users (e.g.,
terminate TCP from the user’s browser). Given their critical role, we engineer these
systems to deliver an extremely high level of reliability. While consumer services can
often limit the visibility of unreliability in backends, these infrastructure systems are
not so lucky. If a request never makes it to the application service frontend server, it is
lost.
We’ve explored the ways to identify the risk tolerance of both consumer and infra‐
structure services. Now, we’ll discuss using that tolerance level to manage unreliabil‐
ity via error budgets.
Motivation for Error Budgets1
Written by Mark Roth
Edited by Carmela Quinito
Other chapters in this book discuss how tensions can arise between product develop‐
ment teams and SRE teams, given that they are generally evaluated on different met‐
rics. Product development performance is largely evaluated on product velocity,
which creates an incentive to push new code as quickly as possible. Meanwhile, SRE
performance is (unsurprisingly) evaluated based upon reliability of a service, which
implies an incentive to push back against a high rate of change. Information asymme‐
try between the two teams further amplifies this inherent tension. The product devel‐
opers have more visibility into the time and effort involved in writing and releasing
their code, while the SREs have more visibility into the service’s reliability (and the
state of production in general).
Motivation for Error Budgets | 33

-- 59 of 550 --

These tensions often reflect themselves in different opinions about the level of effort
that should be put into engineering practices. The following list presents some typical
tensions:
Software fault tolerance
How hardened do we make the software to unexpected events? Too little, and we
have a brittle, unusable product. Too much, and we have a product no one wants
to use (but that runs very stably).
Testing
Again, not enough testing and you have embarrassing outages, privacy data leaks,
or a number of other press-worthy events. Too much testing, and you might lose
your market.
Push frequency
Every push is risky. How much should we work on reducing that risk, versus
doing other work?
Canary duration and size
It’s a best practice to test a new release on some small subset of a typical work‐
load, a practice often called canarying. How long do we wait, and how big is the
canary?
Usually, preexisting teams have worked out some kind of informal balance between
them as to where the risk/effort boundary lies. Unfortunately, one can rarely prove
that this balance is optimal, rather than just a function of the negotiating skills of the
engineers involved. Nor should such decisions be driven by politics, fear, or hope.
(Indeed, Google SRE’s unofficial motto is “Hope is not a strategy.”) Instead, our goal
is to define an objective metric, agreed upon by both sides, that can be used to guide
the negotiations in a reproducible way. The more data-based the decision can be, the
better.
Forming Your Error Budget
In order to base these decisions on objective data, the two teams jointly define a quar‐
terly error budget based on the service’s service level objective, or SLO (see Chap‐
ter 4). The error budget provides a clear, objective metric that determines how
unreliable the service is allowed to be within a single quarter. This metric removes the
politics from negotiations between the SREs and the product developers when decid‐
ing how much risk to allow.
Our practice is then as follows:
• Product Management defines an SLO, which sets an expectation of how much
uptime the service should have per quarter.
34 | Chapter 3: Embracing Risk

---

## [Sección 44] CHAPTER 3

-- 60 of 550 --

2 Known as “bang/bang” control—see https://en.wikipedia.org/wiki/Bang–bang_control.
• The actual uptime is measured by a neutral third party: our monitoring system.
• The difference between these two numbers is the “budget” of how much “unreli‐
ability” is remaining for the quarter.
• As long as the uptime measured is above the SLO—in other words, as long as
there is error budget remaining—new releases can be pushed.
For example, imagine that a service’s SLO is to successfully serve 99.999% of all quer‐
ies per quarter. This means that the service’s error budget is a failure rate of 0.001%
for a given quarter. If a problem causes us to fail 0.0002% of the expected queries for
the quarter, the problem spends 20% of the service’s quarterly error budget.
Benefits
The main benefit of an error budget is that it provides a common incentive that
allows both product development and SRE to focus on finding the right balance
between innovation and reliability.
Many products use this control loop to manage release velocity: as long as the sys‐
tem’s SLOs are met, releases can continue. If SLO violations occur frequently enough
to expend the error budget, releases are temporarily halted while additional resources
are invested in system testing and development to make the system more resilient,
improve its performance, and so on. More subtle and effective approaches are avail‐
able than this simple on/off technique:2 for instance, slowing down releases or rolling
them back when the SLO-violation error budget is close to being used up.
For example, if product development wants to skimp on testing or increase push
velocity and SRE is resistant, the error budget guides the decision. When the budget
is large, the product developers can take more risks. When the budget is nearly
drained, the product developers themselves will push for more testing or slower push
velocity, as they don’t want to risk using up the budget and stall their launch. In effect,
the product development team becomes self-policing. They know the budget and can
manage their own risk. (Of course, this outcome relies on an SRE team having the
authority to actually stop launches if the SLO is broken.)
What happens if a network outage or datacenter failure reduces the measured SLO?
Such events also eat into the error budget. As a result, the number of new pushes may
be reduced for the remainder of the quarter. The entire team supports this reduction
because everyone shares the responsibility for uptime.
The budget also helps to highlight some of the costs of overly high reliability targets,
in terms of both inflexibility and slow innovation. If the team is having trouble
Motivation for Error Budgets | 35

-- 61 of 550 --

launching new features, they may elect to loosen the SLO (thus increasing the error
budget) in order to increase innovation.
Key Insights
• Managing service reliability is largely about managing risk, and managing risk
can be costly.
• 100% is probably never the right reliability target: not only is it impossible to
achieve, it’s typically more reliability than a service’s users want or notice. Match
the profile of the service to the risk the business is willing to take.
• An error budget aligns incentives and emphasizes joint ownership between SRE
and product development. Error budgets make it easier to decide the rate of
releases and to effectively defuse discussions about outages with stakeholders,
and allows multiple teams to reach the same conclusion about production risk
without rancor.
36 | Chapter 3: Embracing Risk

-- 62 of 550 --

---

## [Sección 45] CHAPTER 4

Service Level Objectives
Written by Chris Jones, John Wilkes, and Niall Murphy
with Cody Smith
Edited by Betsy Beyer
It’s impossible to manage a service correctly, let alone well, without understanding
which behaviors really matter for that service and how to measure and evaluate those
behaviors. To this end, we would like to define and deliver a given level of service to
our users, whether they use an internal API or a public product.
We use intuition, experience, and an understanding of what users want to define ser‐
vice level indicators (SLIs), objectives (SLOs), and agreements (SLAs). These measure‐
ments describe basic properties of metrics that matter, what values we want those
metrics to have, and how we’ll react if we can’t provide the expected service. Ulti‐
mately, choosing appropriate metrics helps to drive the right action if something goes
wrong, and also gives an SRE team confidence that a service is healthy.
This chapter describes the framework we use to wrestle with the problems of metric
modeling, metric selection, and metric analysis. Much of this explanation would be
quite abstract without an example, so we’ll use the Shakespeare service outlined in
“Shakespeare: A Sample Service” on page 20 to illustrate our main points.
Service Level Terminology
Many readers are likely familiar with the concept of an SLA, but the terms SLI and
SLO are also worth careful definition, because in common use, the term SLA is over‐
loaded and has taken on a number of meanings depending on context. We prefer to
separate those meanings for clarity.
-- 63 of 550 --

Indicators
An SLI is a service level indicator—a carefully defined quantitative measure of some
aspect of the level of service that is provided.
Most services consider request latency—how long it takes to return a response to a
request—as a key SLI. Other common SLIs include the error rate, often expressed as a
fraction of all requests received, and system throughput, typically measured in
requests per second. The measurements are often aggregated: i.e., raw data is collec‐
ted over a measurement window and then turned into a rate, average, or percentile.
Ideally, the SLI directly measures a service level of interest, but sometimes only a
proxy is available because the desired measure may be hard to obtain or interpret. For
example, client-side latency is often the more user-relevant metric, but it might only
be possible to measure latency at the server.
Another kind of SLI important to SREs is availability, or the fraction of the time that
a service is usable. It is often defined in terms of the fraction of well-formed requests
that succeed, sometimes called yield. (Durability—the likelihood that data will be
retained over a long period of time—is equally important for data storage systems.)
Although 100% availability is impossible, near-100% availability is often readily ach‐
ievable, and the industry commonly expresses high-availability values in terms of the
number of “nines” in the availability percentage. For example, availabilities of 99%
and 99.999% can be referred to as “2 nines” and “5 nines” availability, respectively,
and the current published target for Google Compute Engine availability is “three and
a half nines”—99.95% availability.
Objectives
An SLO is a service level objective: a target value or range of values for a service level
that is measured by an SLI. A natural structure for SLOs is thus SLI ≤ target or lower
bound ≤ SLI ≤ upper bound. For example, we might decide that we will return Shake‐
speare search results “quickly,” adopting an SLO that our average search request
latency should be less than 100 milliseconds.
Choosing an appropriate SLO is complex. To begin with, you don’t always get to
choose its value! For incoming HTTP requests from the outside world to your ser‐
vice, the queries per second (QPS) metric is essentially determined by the desires of
your users, and you can’t really set an SLO for that.
On the other hand, you can say that you want the average latency per request to be
under 100 milliseconds, and setting such a goal could in turn motivate you to write
your frontend with low-latency behaviors of various kinds or to buy certain kinds of
low-latency equipment. (100 milliseconds is obviously an arbitrary value, but in gen‐
eral lower latency numbers are good. There are excellent reasons to believe that fast is
38 | Chapter 4: Service Level Objectives

---

## [Sección 46] CHAPTER 4

-- 64 of 550 --

better than slow, and that user-experienced latency above certain values actually
drives people away— see “Speed Matters” [Bru09] for more details.)
Again, this is more subtle than it might at first appear, in that those two SLIs—QPS
and latency—might be connected behind the scenes: higher QPS often leads to larger
latencies, and it’s common for services to have a performance cliff beyond some load
threshold.
Choosing and publishing SLOs to users sets expectations about how a service will
perform. This strategy can reduce unfounded complaints to service owners about, for
example, the service being slow. Without an explicit SLO, users often develop their
own beliefs about desired performance, which may be unrelated to the beliefs held by
the people designing and operating the service. This dynamic can lead to both overreliance on the service, when users incorrectly believe that a service will be more
available than it actually is (as happened with Chubby: see “The Global Chubby Plan‐
ned Outage”), and under-reliance, when prospective users believe a system is flakier
and less reliable than it actually is.
The Global Chubby Planned Outage
Written by Marc Alvidrez
Chubby [Bur06] is Google’s lock service for loosely coupled distributed systems. In
the global case, we distribute Chubby instances such that each replica is in a different
geographical region. Over time, we found that the failures of the global instance of
Chubby consistently generated service outages, many of which were visible to end
users. As it turns out, true global Chubby outages are so infrequent that service own‐
ers began to add dependencies to Chubby assuming that it would never go down. Its
high reliability provided a false sense of security because the services could not func‐
tion appropriately when Chubby was unavailable, however rarely that occurred.
The solution to this Chubby scenario is interesting: SRE makes sure that global
Chubby meets, but does not significantly exceed, its service level objective. In any
given quarter, if a true failure has not dropped availability below the target, a con‐
trolled outage will be synthesized by intentionally taking down the system. In this
way, we are able to flush out unreasonable dependencies on Chubby shortly after they
are added. Doing so forces service owners to reckon with the reality of distributed
systems sooner rather than later.
Agreements
Finally, SLAs are service level agreements: an explicit or implicit contract with your
users that includes consequences of meeting (or missing) the SLOs they contain. The
consequences are most easily recognized when they are financial—a rebate or a pen‐
Service Level Terminology | 39

-- 65 of 550 --

1 Most people really mean SLO when they say “SLA.” One giveaway: if somebody talks about an “SLA viola‐
tion,” they are almost always talking about a missed SLO. A real SLA violation might trigger a court case for
breach of contract.
alty—but they can take other forms. An easy way to tell the difference between an
SLO and an SLA is to ask “what happens if the SLOs aren’t met?”: if there is no
explicit consequence, then you are almost certainly looking at an SLO.1
SRE doesn’t typically get involved in constructing SLAs, because SLAs are closely tied
to business and product decisions. SRE does, however, get involved in helping to
avoid triggering the consequences of missed SLOs. They can also help to define the
SLIs: there obviously needs to be an objective way to measure the SLOs in the agree‐
ment, or disagreements will arise.
Google Search is an example of an important service that doesn’t have an SLA for the
public: we want everyone to use Search as fluidly and efficiently as possible, but we
haven’t signed a contract with the whole world. Even so, there are still consequences if
Search isn’t available—unavailability results in a hit to our reputation, as well as a
drop in advertising revenue. Many other Google services, such as Google for Work,
do have explicit SLAs with their users. Whether or not a particular service has an
SLA, it’s valuable to define SLIs and SLOs and use them to manage the service.
So much for the theory—now for the experience.
Indicators in Practice
Given that we’ve made the case for why choosing appropriate metrics to measure
your service is important, how do you go about identifying what metrics are mean‐
ingful to your service or system?
What Do You and Your Users Care About?
You shouldn’t use every metric you can track in your monitoring system as an SLI; an
understanding of what your users want from the system will inform the judicious
selection of a few indicators. Choosing too many indicators makes it hard to pay the
right level of attention to the indicators that matter, while choosing too few may leave
significant behaviors of your system unexamined. We typically find that a handful of
representative indicators are enough to evaluate and reason about a system’s health.
40 | Chapter 4: Service Level Objectives

---

## [Sección 47] CHAPTER 4

-- 66 of 550 --

Services tend to fall into a few broad categories in terms of the SLIs they find relevant:
• User-facing serving systems, such as the Shakespeare search frontends, generally
care about availability, latency, and throughput. In other words: Could we
respond to the request? How long did it take to respond? How many requests
could be handled?
• Storage systems often emphasize latency, availability, and durability. In other
words: How long does it take to read or write data? Can we access the data on
demand? Is the data still there when we need it? See Chapter 26 for an extended
discussion of these issues.
• Big data systems, such as data processing pipelines, tend to care about throughput
and end-to-end latency. In other words: How much data is being processed? How
long does it take the data to progress from ingestion to completion? (Some pipe‐
lines may also have targets for latency on individual processing stages.)
• All systems should care about correctness: was the right answer returned, the
right data retrieved, the right analysis done? Correctness is important to track as
an indicator of system health, even though it’s often a property of the data in the
system rather than the infrastructure per se, and so usually not an SRE responsi‐
bility to meet.
Collecting Indicators
Many indicator metrics are most naturally gathered on the server side, using a moni‐
toring system such as Borgmon (see Chapter 10) or Prometheus, or with periodic log
analysis—for instance, HTTP 500 responses as a fraction of all requests. However,
some systems should be instrumented with client-side collection, because not meas‐
uring behavior at the client can miss a range of problems that affect users but don’t
affect server-side metrics. For example, concentrating on the response latency of the
Shakespeare search backend might miss poor user latency due to problems with the
page’s JavaScript: in this case, measuring how long it takes for a page to become usa‐
ble in the browser is a better proxy for what the user actually experiences.
Aggregation
For simplicity and usability, we often aggregate raw measurements. This needs to be
done carefully.
Some metrics are seemingly straightforward, like the number of requests per second
served, but even this apparently straightforward measurement implicitly aggregates
data over the measurement window. Is the measurement obtained once a second, or
by averaging requests over a minute? The latter may hide much higher instantaneous
request rates in bursts that last for only a few seconds. Consider a system that serves
Indicators in Practice | 41

-- 67 of 550 --

200 requests/s in even-numbered seconds, and 0 in the others. It has the same average
load as one that serves a constant 100 requests/s, but has an instantaneous load that is
twice as large as the average one. Similarly, averaging request latencies may seem
attractive, but obscures an important detail: it’s entirely possible for most of the
requests to be fast, but for a long tail of requests to be much, much slower.
Most metrics are better thought of as distributions rather than averages. For example,
for a latency SLI, some requests will be serviced quickly, while others will invariably
take longer—sometimes much longer. A simple average can obscure these tail laten‐
cies, as well as changes in them. Figure 4-1 provides an example: although a typical
request is served in about 50 ms, 5% of requests are 20 times slower! Monitoring and
alerting based only on the average latency would show no change in behavior over
the course of the day, when there are in fact significant changes in the tail latency (the
topmost line).
Figure 4-1. 50th, 85th, 95th, and 99th percentile latencies for a system. Note that the Yaxis has a logarithmic scale.
Using percentiles for indicators allows you to consider the shape of the distribution
and its differing attributes: a high-order percentile, such as the 99th or 99.9th, shows
you a plausible worst-case value, while using the 50th percentile (also known as the
median) emphasizes the typical case. The higher the variance in response times, the
more the typical user experience is affected by long-tail behavior, an effect exacerba‐
ted at high load by queuing effects. User studies have shown that people typically pre‐
fer a slightly slower system to one with high variance in response time, so some SRE
teams focus only on high percentile values, on the grounds that if the 99.9th percen‐
tile behavior is good, then the typical experience is certainly going to be.
42 | Chapter 4: Service Level Objectives

---

## [Sección 48] CHAPTER 4

-- 68 of 550 --

A Note on Statistical Fallacies
We generally prefer to work with percentiles rather than the mean (arithmetic aver‐
age) of a set of values. Doing so makes it possible to consider the long tail of data
points, which often have significantly different (and more interesting) characteristics
than the average. Because of the artificial nature of computing systems, data points
are often skewed—for instance, no request can have a response in less than 0 ms, and
a timeout at 1,000 ms means that there can be no successful responses with values
greater than the timeout. As a result, we cannot assume that the mean and the median
are the same—or even close to each other!
We try not to assume that our data is normally distributed without verifying it first, in
case some standard intuitions and approximations don’t hold. For example, if the dis‐
tribution is not what’s expected, a process that takes action when it sees outliers (e.g.,
restarting a server with high request latencies) may do this too often, or not often
enough.
Standardize Indicators
We recommend that you standardize on common definitions for SLIs so that you
don’t have to reason about them from first principles each time. Any feature that con‐
forms to the standard definition templates can be omitted from the specification of
an individual SLI, e.g.:
• Aggregation intervals: “Averaged over 1 minute”
• Aggregation regions: “All the tasks in a cluster”
• How frequently measurements are made: “Every 10 seconds”
• Which requests are included: “HTTP GETs from black-box monitoring jobs”
• How the data is acquired: “Through our monitoring, measured at the server”
• Data-access latency: “Time to last byte”
To save effort, build a set of reusable SLI templates for each common metric; these
also make it simpler for everyone to understand what a specific SLI means.
Objectives in Practice
Start by thinking about (or finding out!) what your users care about, not what you
can measure. Often, what your users care about is difficult or impossible to measure,
so you’ll end up approximating users’ needs in some way. However, if you simply start
with what’s easy to measure, you’ll end up with less useful SLOs. As a result, we’ve
Objectives in Practice | 43

-- 69 of 550 --

sometimes found that working from desired objectives backward to specific indica‐
tors works better than choosing indicators and then coming up with targets.
Defining Objectives
For maximum clarity, SLOs should specify how they’re measured and the conditions
under which they’re valid. For instance, we might say the following (the second line is
the same as the first, but relies on the SLI defaults of the previous section to remove
redundancy):
• 99% (averaged over 1 minute) of Get RPC calls will complete in less than 100 ms
(measured across all the backend servers).
• 99% of Get RPC calls will complete in less than 100 ms.
If the shape of the performance curves are important, then you can specify multiple
SLO targets:
• 90% of Get RPC calls will complete in less than 1 ms.
• 99% of Get RPC calls will complete in less than 10 ms.
• 99.9% of Get RPC calls will complete in less than 100 ms.
If you have users with heterogeneous workloads such as a bulk processing pipeline
that cares about throughput and an interactive client that cares about latency, it may
be appropriate to define separate objectives for each class of workload:
• 95% of throughput clients’ Set RPC calls will complete in < 1 s.
• 99% of latency clients’ Set RPC calls with payloads < 1 kB will complete in < 10
ms.
It’s both unrealistic and undesirable to insist that SLOs will be met 100% of the time:
doing so can reduce the rate of innovation and deployment, require expensive, overly
conservative solutions, or both. Instead, it is better to allow an error budget—a rate at
which the SLOs can be missed—and track that on a daily or weekly basis. Upper
management will probably want a monthly or quarterly assessment, too. (An error
budget is just an SLO for meeting other SLOs!)
The rate at which SLOs are missed is a useful indicator for the user-perceived health
of the service. It is helpful to track SLOs (and SLO violations) on a daily or weekly
basis to see trends and get early warning of potential problems before they happen.
Upper management will probably want a monthly or quarterly assessment, too.
44 | Chapter 4: Service Level Objectives

---

## [Sección 49] CHAPTER 4

-- 70 of 550 --

2 If you can’t ever win a conversation about SLOs, it’s probably not worth having an SRE team for the product.
The SLO violation rate can be compared against the error budget (see “Motivation for
Error Budgets” on page 33), with the gap used as an input to the process that decides
when to roll out new releases.
Choosing Targets
Choosing targets (SLOs) is not a purely technical activity because of the product and
business implications, which should be reflected in both the SLIs and SLOs (and
maybe SLAs) that are selected. Similarly, it may be necessary to trade off certain prod‐
uct attributes against others within the constraints posed by staffing, time to market,
hardware availability, and funding. While SRE should be part of this conversation,
and advise on the risks and viability of different options, we’ve learned a few lessons
that can help make this a more productive discussion:
Don’t pick a target based on current performance
While understanding the merits and limits of a system is essential, adopting val‐
ues without reflection may lock you into supporting a system that requires heroic
efforts to meet its targets, and that cannot be improved without significant
redesign.
Keep it simple
Complicated aggregations in SLIs can obscure changes to system performance,
and are also harder to reason about.
Avoid absolutes
While it’s tempting to ask for a system that can scale its load “infinitely” without
any latency increase and that is “always” available, this requirement is unrealistic.
Even a system that approaches such ideals will probably take a long time to
design and build, and will be expensive to operate—and probably turn out to be
unnecessarily better than what users would be happy (or even delighted) to have.
Have as few SLOs as possible
Choose just enough SLOs to provide good coverage of your system’s attributes.
Defend the SLOs you pick: if you can’t ever win a conversation about priorities by
quoting a particular SLO, it’s probably not worth having that SLO.2 However, not
all product attributes are amenable to SLOs: it’s hard to specify “user delight”
with an SLO.
Perfection can wait
You can always refine SLO definitions and targets over time as you learn about a
system’s behavior. It’s better to start with a loose target that you tighten than to
Objectives in Practice | 45

-- 71 of 550 --

choose an overly strict target that has to be relaxed when you discover it’s unat‐
tainable.
SLOs can—and should—be a major driver in prioritizing work for SREs and product
developers, because they reflect what users care about. A good SLO is a helpful, legiti‐
mate forcing function for a development team. But a poorly thought-out SLO can
result in wasted work if a team uses heroic efforts to meet an overly aggressive SLO,
or a bad product if the SLO is too lax. SLOs are a massive lever: use them wisely.
Control Measures
SLIs and SLOs are crucial elements in the control loops used to manage systems:
1. Monitor and measure the system’s SLIs.
2. Compare the SLIs to the SLOs, and decide whether or not action is needed.
3. If action is needed, figure out what needs to happen in order to meet the target.
4. Take that action.
For example, if step 2 shows that request latency is increasing, and will miss the SLO
in a few hours unless something is done, step 3 might include testing the hypothesis
that the servers are CPU-bound, and deciding to add more of them to spread the
load. Without the SLO, you wouldn’t know whether (or when) to take action.
SLOs Set Expectations
Publishing SLOs sets expectations for system behavior. Users (and potential users)
often want to know what they can expect from a service in order to understand
whether it’s appropriate for their use case. For instance, a team wanting to build a
photo-sharing website might want to avoid using a service that promises very strong
durability and low cost in exchange for slightly lower availability, though the same
service might be a perfect fit for an archival records management system.
In order to set realistic expectations for your users, you might consider using one or
both of the following tactics:
Keep a safety margin
Using a tighter internal SLO than the SLO advertised to users gives you room to
respond to chronic problems before they become visible externally. An SLO
buffer also makes it possible to accommodate reimplementations that trade per‐
formance for other attributes, such as cost or ease of maintenance, without hav‐
ing to disappoint users.
46 | Chapter 4: Service Level Objectives

---

## [Sección 50] CHAPTER 4

-- 72 of 550 --

3 Failure injection [Ben12] serves a different purpose, but can also help set expectations.
Don’t overachieve
Users build on the reality of what you offer, rather than what you say you’ll sup‐
ply, particularly for infrastructure services. If your service’s actual performance is
much better than its stated SLO, users will come to rely on its current perfor‐
mance. You can avoid over-dependence by deliberately taking the system offline
occasionally (Google’s Chubby service introduced planned outages in response to
being overly available),3 throttling some requests, or designing the system so that
it isn’t faster under light loads.
Understanding how well a system is meeting its expectations helps decide whether to
invest in making the system faster, more available, and more resilient. Alternatively, if
the service is doing fine, perhaps staff time should be spent on other priorities, such
as paying off technical debt, adding new features, or introducing other products.
Agreements in Practice
Crafting an SLA requires business and legal teams to pick appropriate consequences
and penalties for a breach. SRE’s role is to help them understand the likelihood and
difficulty of meeting the SLOs contained in the SLA. Much of the advice on SLO con‐
struction is also applicable for SLAs. It is wise to be conservative in what you adver‐
tise to users, as the broader the constituency, the harder it is to change or delete SLAs
that prove to be unwise or difficult to work with.
Agreements in Practice | 47

-- 73 of 550 --

-- 74 of 550 --

1 We use the Objectives and Key Results system, pioneered by Andy Grove at Intel; see [Kla12].
2 Googlers record short free-form summaries, or “snippets,” of what we’ve worked on each week.

---

## [Sección 51] CHAPTER 5

Eliminating Toil
Written by Vivek Rau
Edited by Betsy Beyer
If a human operator needs to touch your system during normal operations, you have a bug.
The definition of normal changes as your systems grow.
—Carla Geisser, Google SRE
In SRE, we want to spend time on long-term engineering project work instead of
operational work. Because the term operational work may be misinterpreted, we use a
specific word: toil.
Toil Defined
Toil is not just “work I don’t like to do.” It’s also not simply equivalent to administra‐
tive chores or grungy work. Preferences as to what types of work are satisfying and
enjoyable vary from person to person, and some people even enjoy manual, repetitive
work. There are also administrative chores that have to get done, but should not be
categorized as toil: this is overhead. Overhead is often work not directly tied to run‐
ning a production service, and includes tasks like team meetings, setting and grading
goals,1 snippets,2 and HR paperwork. Grungy work can sometimes have long-term
value, and in that case, it’s not toil, either. Cleaning up the entire alerting configura‐
tion for your service and removing clutter may be grungy, but it’s not toil.
So what is toil? Toil is the kind of work tied to running a production service that
tends to be manual, repetitive, automatable, tactical, devoid of enduring value, and
-- 75 of 550 --

3 We have to be careful about saying a task is “not toil because it needs human judgment.” We need to think
carefully about whether the nature of the task intrinsically requires human judgment and cannot be addressed
by better design. For example, one could build (and some have built) a service that alerts its SREs several
times a day, where each alert requires a complex response involving plenty of human judgment. Such a service
is poorly designed, with unnecessary complexity. The system needs to be simplified and rebuilt to either elim‐
inate the underlying failure conditions or deal with these conditions automatically. Until the redesign and
reimplementation are finished, and the improved service is rolled out, the work of applying human judgment
to respond to each alert is definitely toil.
that scales linearly as a service grows. Not every task deemed toil has all these
attributes, but the more closely work matches one or more of the following descrip‐
tions, the more likely it is to be toil:
Manual
This includes work such as manually running a script that automates some task.
Running a script may be quicker than manually executing each step in the script,
but the hands-on time a human spends running that script (not the elapsed time)
is still toil time.
Repetitive
If you’re performing a task for the first time ever, or even the second time, this
work is not toil. Toil is work you do over and over. If you’re solving a novel prob‐
lem or inventing a new solution, this work is not toil.
Automatable
If a machine could accomplish the task just as well as a human, or the need for
the task could be designed away, that task is toil. If human judgment is essential
for the task, there’s a good chance it’s not toil.3
Tactical
Toil is interrupt-driven and reactive, rather than strategy-driven and proactive.
Handling pager alerts is toil. We may never be able to eliminate this type of work
completely, but we have to continually work toward minimizing it.
No enduring value
If your service remains in the same state after you have finished a task, the task
was probably toil. If the task produced a permanent improvement in your ser‐
vice, it probably wasn’t toil, even if some amount of grunt work—such as digging
into legacy code and configurations and straightening them out—was involved.
O(n) with service growth
If the work involved in a task scales up linearly with service size, traffic volume,
or user count, that task is probably toil. An ideally managed and designed service
can grow by at least one order of magnitude with zero additional work, other
than some one-time efforts to add resources.
50 | Chapter 5: Eliminating Toil

---

## [Sección 52] CHAPTER 5

-- 76 of 550 --

Why Less Toil Is Better
Our SRE organization has an advertised goal of keeping operational work (i.e., toil)
below 50% of each SRE’s time. At least 50% of each SRE’s time should be spent on
engineering project work that will either reduce future toil or add service features.
Feature development typically focuses on improving reliability, performance, or uti‐
lization, which often reduces toil as a second-order effect.
We share this 50% goal because toil tends to expand if left unchecked and can quickly
fill 100% of everyone’s time. The work of reducing toil and scaling up services is the
“Engineering” in Site Reliability Engineering. Engineering work is what enables the
SRE organization to scale up sublinearly with service size and to manage services
more efficiently than either a pure Dev team or a pure Ops team.
Furthermore, when we hire new SREs, we promise them that SRE is not a typical Ops
organization, quoting the 50% rule just mentioned. We need to keep that promise by
not allowing the SRE organization or any subteam within it to devolve into an Ops
team.
Calculating Toil
If we seek to cap the time an SRE spends on toil to 50%, how is that time spent?
There’s a floor on the amount of toil any SRE has to handle if they are on-call. A typi‐
cal SRE has one week of primary on-call and one week of secondary on-call in each
cycle (for discussion of primary versus secondary on-call shifts, see Chapter 11). It
follows that in a 6-person rotation, at least 2 of every 6 weeks are dedicated to on-call
shifts and interrupt handling, which means the lower bound on potential toil is 2/6 =
33% of an SRE’s time. In an 8-person rotation, the lower bound is 2/8 = 25%.
Consistent with this data, SREs report that their top source of toil is interrupts (that
is, non-urgent service-related messages and emails). The next leading source is oncall (urgent) response, followed by releases and pushes. Even though our release and
push processes are usually handled with a fair amount of automation, there’s still
plenty of room for improvement in this area.
Quarterly surveys of Google’s SREs show that the average time spent toiling is about
33%, so we do much better than our overall target of 50%. However, the average
doesn’t capture outliers: some SREs claim 0% toil (pure development projects with no
on-call work) and others claim 80% toil. When individual SREs report excessive toil,
it often indicates a need for managers to spread the toil load more evenly across the
team and to encourage those SREs to find satisfying engineering projects.
Why Less Toil Is Better | 51

-- 77 of 550 --

What Qualifies as Engineering?
Engineering work is novel and intrinsically requires human judgment. It produces a
permanent improvement in your service, and is guided by a strategy. It is frequently
creative and innovative, taking a design-driven approach to solving a problem—the
more generalized, the better. Engineering work helps your team or the SRE organiza‐
tion handle a larger service, or more services, with the same level of staffing.
Typical SRE activities fall into the following approximate categories:
Software engineering
Involves writing or modifying code, in addition to any associated design and
documentation work. Examples include writing automation scripts, creating
tools or frameworks, adding service features for scalability and reliability, or
modifying infrastructure code to make it more robust.
Systems engineering
Involves configuring production systems, modifying configurations, or docu‐
menting systems in a way that produces lasting improvements from a one-time
effort. Examples include monitoring setup and updates, load balancing configu‐
ration, server configuration, tuning of OS parameters, and load balancer setup.
Systems engineering also includes consulting on architecture, design, and pro‐
ductionization for developer teams.
Toil
Work directly tied to running a service that is repetitive, manual, etc.
Overhead
Administrative work not tied directly to running a service. Examples include hir‐
ing, HR paperwork, team/company meetings, bug queue hygiene, snippets, peer
reviews and self-assessments, and training courses.
Every SRE needs to spend at least 50% of their time on engineering work, when aver‐
aged over a few quarters or a year. Toil tends to be spiky, so a steady 50% of time
spent on engineering may not be realistic for some SRE teams, and they may dip
below that target in some quarters. But if the fraction of time spent on projects aver‐
ages significantly below 50% over the long haul, the affected team needs to step back
and figure out what’s wrong.
Is Toil Always Bad?
Toil doesn’t make everyone unhappy all the time, especially in small amounts. Pre‐
dictable and repetitive tasks can be quite calming. They produce a sense of accom‐
plishment and quick wins. They can be low-risk and low-stress activities. Some
people gravitate toward tasks involving toil and may even enjoy that type of work.
52 | Chapter 5: Eliminating Toil

---

## [Sección 53] CHAPTER 5

-- 78 of 550 --

Toil isn’t always and invariably bad, and everyone needs to be absolutely clear that
some amount of toil is unavoidable in the SRE role, and indeed in almost any engi‐
neering role. It’s fine in small doses, and if you’re happy with those small doses, toil is
not a problem. Toil becomes toxic when experienced in large quantities. If you’re bur‐
dened with too much toil, you should be very concerned and complain loudly.
Among the many reasons why too much toil is bad, consider the following:
Career stagnation
Your career progress will slow down or grind to a halt if you spend too little time
on projects. Google rewards grungy work when it’s inevitable and has a big posi‐
tive impact, but you can’t make a career out of grunge.
Low morale
People have different limits for how much toil they can tolerate, but everyone has
a limit. Too much toil leads to burnout, boredom, and discontent.
Additionally, spending too much time on toil at the expense of time spent engineer‐
ing hurts an SRE organization in the following ways:
Creates confusion
We work hard to ensure that everyone who works in or with the SRE organiza‐
tion understands that we are an engineering organization. Individuals or teams
within SRE that engage in too much toil undermine the clarity of that communi‐
cation and confuse people about our role.
Slows progress
Excessive toil makes a team less productive. A product’s feature velocity will slow
if the SRE team is too busy with manual work and firefighting to roll out new
features promptly.
Sets precedent
If you’re too willing to take on toil, your Dev counterparts will have incentives to
load you down with even more toil, sometimes shifting operational tasks that
should rightfully be performed by Devs to SRE. Other teams may also start
expecting SREs to take on such work, which is bad for obvious reasons.
Promotes attrition
Even if you’re not personally unhappy with toil, your current or future team‐
mates might like it much less. If you build too much toil into your team’s proce‐
dures, you motivate the team’s best engineers to start looking elsewhere for a
more rewarding job.
Causes breach of faith
New hires or transfers who joined SRE with the promise of project work will feel
cheated, which is bad for morale.
Is Toil Always Bad? | 53

-- 79 of 550 --

Conclusion
If we all commit to eliminate a bit of toil each week with some good engineering, we’ll
steadily clean up our services, and we can shift our collective efforts to engineering
for scale, architecting the next generation of services, and building cross-SRE tool‐
chains. Let’s invent more, and toil less.
54 | Chapter 5: Eliminating Toil

-- 80 of 550 --

---

## [Sección 54] CHAPTER 6

Monitoring Distributed Systems
Written by Rob Ewaschuk
Edited by Betsy Beyer
Google’s SRE teams have some basic principles and best practices for building suc‐
cessful monitoring and alerting systems. This chapter offers guidelines for what issues
should interrupt a human via a page, and how to deal with issues that aren’t serious
enough to trigger a page.
Definitions
There’s no uniformly shared vocabulary for discussing all topics related to monitor‐
ing. Even within Google, usage of the following terms varies, but the most common
interpretations are listed here.
Monitoring
Collecting, processing, aggregating, and displaying real-time quantitative data
about a system, such as query counts and types, error counts and types, process‐
ing times, and server lifetimes.
White-box monitoring
Monitoring based on metrics exposed by the internals of the system, including
logs, interfaces like the Java Virtual Machine Profiling Interface, or an HTTP
handler that emits internal statistics.
Black-box monitoring
Testing externally visible behavior as a user would see it.
Dashboard
An application (usually web-based) that provides a summary view of a service’s
core metrics. A dashboard may have filters, selectors, and so on, but is prebuilt to
-- 81 of 550 --

1 Sometimes known as “alert spam,” as they are rarely read or acted on.
expose the metrics most important to its users. The dashboard might also display
team information such as ticket queue length, a list of high-priority bugs, the
current on-call engineer for a given area of responsibility, or recent pushes.
Alert
A notification intended to be read by a human and that is pushed to a system
such as a bug or ticket queue, an email alias, or a pager. Respectively, these alerts
are classified as tickets, email alerts,1 and pages.
Root cause
A defect in a software or human system that, if repaired, instills confidence that
this event won’t happen again in the same way. A given incident might have mul‐
tiple root causes: for example, perhaps it was caused by a combination of insuffi‐
cient process automation, software that crashed on bogus input, and insufficient
testing of the script used to generate the configuration. Each of these factors
might stand alone as a root cause, and each should be repaired.
Node and machine
Used interchangeably to indicate a single instance of a running kernel in either a
physical server, virtual machine, or container. There might be multiple services
worth monitoring on a single machine. The services may either be:
• Related to each other: for example, a caching server and a web server
• Unrelated services sharing hardware: for example, a code repository and a
master for a configuration system like Puppet or Chef
Push
Any change to a service’s running software or its configuration.
Why Monitor?
There are many reasons to monitor a system, including:
Analyzing long-term trends
How big is my database and how fast is it growing? How quickly is my dailyactive user count growing?
Comparing over time or experiment groups
Are queries faster with Acme Bucket of Bytes 2.72 versus Ajax DB 3.14? How
much better is my memcache hit rate with an extra node? Is my site slower than
it was last week?
56 | Chapter 6: Monitoring Distributed Systems

-- 82 of 550 --

Alerting
Something is broken, and somebody needs to fix it right now! Or, something
might break soon, so somebody should look soon.
Building dashboards
Dashboards should answer basic questions about your service, and normally
include some form of the four golden signals (discussed in “The Four Golden
Signals” on page 60).
Conducting ad hoc retrospective analysis (i.e., debugging)
Our latency just shot up; what else happened around the same time?
System monitoring is also helpful in supplying raw input into business analytics and
in facilitating analysis of security breaches. Because this book focuses on the engi‐
neering domains in which SRE has particular expertise, we won’t discuss these appli‐
cations of monitoring here.
Monitoring and alerting enables a system to tell us when it’s broken, or perhaps to tell
us what’s about to break. When the system isn’t able to automatically fix itself, we
want a human to investigate the alert, determine if there’s a real problem at hand, mit‐
igate the problem, and determine the root cause of the problem. Unless you’re per‐
forming security auditing on very narrowly scoped components of a system, you
should never trigger an alert simply because “something seems a bit weird.”
Paging a human is a quite expensive use of an employee’s time. If an employee is at
work, a page interrupts their workflow. If the employee is at home, a page interrupts
their personal time, and perhaps even their sleep. When pages occur too frequently,
employees second-guess, skim, or even ignore incoming alerts, sometimes even
ignoring a “real” page that’s masked by the noise. Outages can be prolonged because
other noise interferes with a rapid diagnosis and fix. Effective alerting systems have
good signal and very low noise.
Setting Reasonable Expectations for Monitoring
Monitoring a complex application is a significant engineering endeavor in and of
itself. Even with substantial existing infrastructure for instrumentation, collection,
display, and alerting in place, a Google SRE team with 10–12 members typically has
one or sometimes two members whose primary assignment is to build and maintain
monitoring systems for their service. This number has decreased over time as we
generalize and centralize common monitoring infrastructure, but every SRE team
typically has at least one “monitoring person.” (That being said, while it can be fun to
have access to traffic graph dashboards and the like, SRE teams carefully avoid any
situation that requires someone to “stare at a screen to watch for problems.”)
Setting Reasonable Expectations for Monitoring | 57

---

## [Sección 55] CHAPTER 6

-- 83 of 550 --

In general, Google has trended toward simpler and faster monitoring systems, with
better tools for post hoc analysis. We avoid “magic” systems that try to learn thresh‐
olds or automatically detect causality. Rules that detect unexpected changes in enduser request rates are one counterexample; while these rules are still kept as simple as
possible, they give a very quick detection of a very simple, specific, severe anomaly.
Other uses of monitoring data such as capacity planning and traffic prediction can
tolerate more fragility, and thus, more complexity. Observational experiments con‐
ducted over a very long time horizon (months or years) with a low sampling rate
(hours or days) can also often tolerate more fragility because occasional missed sam‐
ples won’t hide a long-running trend.
Google SRE has experienced only limited success with complex dependency hierar‐
chies. We seldom use rules such as, “If I know the database is slow, alert for a slow
database; otherwise, alert for the website being generally slow.” Dependency-reliant
rules usually pertain to very stable parts of our system, such as our system for drain‐
ing user traffic away from a datacenter. For example, “If a datacenter is drained, then
don’t alert me on its latency” is one common datacenter alerting rule. Few teams at
Google maintain complex dependency hierarchies because our infrastructure has a
steady rate of continuous refactoring.
Some of the ideas described in this chapter are still aspirational: there is always room
to move more rapidly from symptom to root cause(s), especially in ever-changing
systems. So while this chapter sets out some goals for monitoring systems, and some
ways to achieve these goals, it’s important that monitoring systems—especially the
critical path from the onset of a production problem, through a page to a human,
through basic triage and deep debugging—be kept simple and comprehensible by
everyone on the team.
Similarly, to keep noise low and signal high, the elements of your monitoring system
that direct to a pager need to be very simple and robust. Rules that generate alerts for
humans should be simple to understand and represent a clear failure.
Symptoms Versus Causes
Your monitoring system should address two questions: what’s broken, and why?
The “what’s broken” indicates the symptom; the “why” indicates a (possibly inter‐
mediate) cause. Table 6-1 lists some hypothetical symptoms and corresponding
causes.
58 | Chapter 6: Monitoring Distributed Systems

-- 84 of 550 --

Table 6-1. Example symptoms and causes
Symptom Cause
I’m serving HTTP 500s or 404s Database servers are refusing connections
My responses are slow CPUs are overloaded by a bogosort, or an Ethernet cable is crimped under a rack,
visible as partial packet loss
Users in Antarctica aren’t receiving
animated cat GIFs
Your Content Distribution Network hates scientists and felines, and thus
blacklisted some client IPs
Private content is world-readable A new software push caused ACLs to be forgotten and allowed all requests
“What” versus “why” is one of the most important distinctions in writing good moni‐
toring with maximum signal and minimum noise.
Black-Box Versus White-Box
We combine heavy use of white-box monitoring with modest but critical uses of
black-box monitoring. The simplest way to think about black-box monitoring versus
white-box monitoring is that black-box monitoring is symptom-oriented and repre‐
sents active—not predicted—problems: “The system isn’t working correctly, right
now.” White-box monitoring depends on the ability to inspect the innards of the sys‐
tem, such as logs or HTTP endpoints, with instrumentation. White-box monitoring
therefore allows detection of imminent problems, failures masked by retries, and so
forth.
Note that in a multilayered system, one person’s symptom is another person’s cause.
For example, suppose that a database’s performance is slow. Slow database reads are a
symptom for the database SRE who detects them. However, for the frontend SRE
observing a slow website, the same slow database reads are a cause. Therefore, whitebox monitoring is sometimes symptom-oriented, and sometimes cause-oriented,
depending on just how informative your white-box is.
When collecting telemetry for debugging, white-box monitoring is essential. If web
servers seem slow on database-heavy requests, you need to know both how fast the
web server perceives the database to be, and how fast the database believes itself to be.
Otherwise, you can’t distinguish an actually slow database server from a network
problem between your web server and your database.
For paging, black-box monitoring has the key benefit of forcing discipline to only nag
a human when a problem is both already ongoing and contributing to real symptoms.
On the other hand, for not-yet-occurring but imminent problems, black-box moni‐
toring is fairly useless.
Black-Box Versus White-Box | 59

---

## [Sección 56] CHAPTER 6

-- 85 of 550 --

The Four Golden Signals
The four golden signals of monitoring are latency, traffic, errors, and saturation. If
you can only measure four metrics of your user-facing system, focus on these four.
Latency
The time it takes to service a request. It’s important to distinguish between the
latency of successful requests and the latency of failed requests. For example, an
HTTP 500 error triggered due to loss of connection to a database or other critical
backend might be served very quickly; however, as an HTTP 500 error indicates
a failed request, factoring 500s into your overall latency might result in mislead‐
ing calculations. On the other hand, a slow error is even worse than a fast error!
Therefore, it’s important to track error latency, as opposed to just filtering out
errors.
Traffic
A measure of how much demand is being placed on your system, measured in a
high-level system-specific metric. For a web service, this measurement is usually
HTTP requests per second, perhaps broken out by the nature of the requests
(e.g., static versus dynamic content). For an audio streaming system, this meas‐
urement might focus on network I/O rate or concurrent sessions. For a key-value
storage system, this measurement might be transactions and retrievals per
second.
Errors
The rate of requests that fail, either explicitly (e.g., HTTP 500s), implicitly (for
example, an HTTP 200 success response, but coupled with the wrong content),
or by policy (for example, “If you committed to one-second response times, any
request over one second is an error”). Where protocol response codes are insuffi‐
cient to express all failure conditions, secondary (internal) protocols may be nec‐
essary to track partial failure modes. Monitoring these cases can be drastically
different: catching HTTP 500s at your load balancer can do a decent job of catch‐
ing all completely failed requests, while only end-to-end system tests can detect
that you’re serving the wrong content.
Saturation
How “full” your service is. A measure of your system fraction, emphasizing the
resources that are most constrained (e.g., in a memory-constrained system, show
memory; in an I/O-constrained system, show I/O). Note that many systems
degrade in performance before they achieve 100% utilization, so having a utiliza‐
tion target is essential.
In complex systems, saturation can be supplemented with higher-level load
measurement: can your service properly handle double the traffic, handle only
10% more traffic, or handle even less traffic than it currently receives? For very
60 | Chapter 6: Monitoring Distributed Systems

-- 86 of 550 --

2 If 1% of your requests are 10x the average, it means that the rest of your requests are about twice as fast as the
average. But if you’re not measuring your distribution, the idea that most of your requests are near the mean
is just hopeful thinking.
simple services that have no parameters that alter the complexity of the request
(e.g., “Give me a nonce” or “I need a globally unique monotonic integer”) that
rarely change configuration, a static value from a load test might be adequate. As
discussed in the previous paragraph, however, most services need to use indirect
signals like CPU utilization or network bandwidth that have a known upper
bound. Latency increases are often a leading indicator of saturation. Measuring
your 99th percentile response time over some small window (e.g., one minute)
can give a very early signal of saturation.
Finally, saturation is also concerned with predictions of impending saturation,
such as “It looks like your database will fill its hard drive in 4 hours.”
If you measure all four golden signals and page a human when one signal is problem‐
atic (or, in the case of saturation, nearly problematic), your service will be at least
decently covered by monitoring.
Worrying About Your Tail (or, Instrumentation and
Performance)
When building a monitoring system from scratch, it’s tempting to design a system
based upon the mean of some quantity: the mean latency, the mean CPU usage of
your nodes, or the mean fullness of your databases. The danger presented by the lat‐
ter two cases is obvious: CPUs and databases can easily be utilized in a very imbal‐
anced way. The same holds for latency. If you run a web service with an average
latency of 100 ms at 1,000 requests per second, 1% of requests might easily take 5 sec‐
onds.2 If your users depend on several such web services to render their page, the
99th percentile of one backend can easily become the median response of your
frontend.
The simplest way to differentiate between a slow average and a very slow “tail” of
requests is to collect request counts bucketed by latencies (suitable for rendering a
histogram), rather than actual latencies: how many requests did I serve that took
between 0 ms and 10 ms, between 10 ms and 30 ms, between 30 ms and 100 ms,
between 100 ms and 300 ms, and so on? Distributing the histogram boundaries
approximately exponentially (in this case by factors of roughly 3) is often an easy way
to visualize the distribution of your requests.
Worrying About Your Tail (or, Instrumentation and Performance) | 61

---

## [Sección 57] CHAPTER 6

-- 87 of 550 --

Choosing an Appropriate Resolution for Measurements
Different aspects of a system should be measured with different levels of granularity.
For example:
• Observing CPU load over the time span of a minute won’t reveal even quite longlived spikes that drive high tail latencies.
• On the other hand, for a web service targeting no more than 9 hours aggregate
downtime per year (99.9% annual uptime), probing for a 200 (success) status
more than once or twice a minute is probably unnecessarily frequent.
• Similarly, checking hard drive fullness for a service targeting 99.9% availability
more than once every 1–2 minutes is probably unnecessary.
Take care in how you structure the granularity of your measurements. Collecting persecond measurements of CPU load might yield interesting data, but such frequent
measurements may be very expensive to collect, store, and analyze. If your monitor‐
ing goal calls for high resolution but doesn’t require extremely low latency, you can
reduce these costs by performing internal sampling on the server, then configuring an
external system to collect and aggregate that distribution over time or across servers.
You might:
1. Record the current CPU utilization each second.
2. Using buckets of 5% granularity, increment the appropriate CPU utilization
bucket each second.
3. Aggregate those values every minute.
This strategy allows you to observe brief CPU hotspots without incurring very high
cost due to collection and retention.
As Simple as Possible, No Simpler
Piling all these requirements on top of each other can add up to a very complex mon‐
itoring system—your system might end up with the following levels of complexity:
• Alerts on different latency thresholds, at different percentiles, on all kinds of dif‐
ferent metrics
• Extra code to detect and expose possible causes
• Associated dashboards for each of these possible causes
The sources of potential complexity are never-ending. Like all software systems,
monitoring can become so complex that it’s fragile, complicated to change, and a
maintenance burden.
62 | Chapter 6: Monitoring Distributed Systems

-- 88 of 550 --

3 See Applying Cardiac Alarm Management Techniques to Your On-Call [Hol14] for an example of alert fatigue
in another context.
4 Zero-redundancy (N + 0) situations count as imminent, as do “nearly full” parts of your service! For more
details about the concept of redundancy, see https://en.wikipedia.org/wiki/N%2B1_redundancy.
Therefore, design your monitoring system with an eye toward simplicity. In choosing
what to monitor, keep the following guidelines in mind:
• The rules that catch real incidents most often should be as simple, predictable,
and reliable as possible.
• Data collection, aggregation, and alerting configuration that is rarely exercised
(e.g., less than once a quarter for some SRE teams) should be up for removal.
• Signals that are collected, but not exposed in any prebaked dashboard nor used
by any alert, are candidates for removal.
In Google’s experience, basic collection and aggregation of metrics, paired with alert‐
ing and dashboards, has worked well as a relatively standalone system. (In fact Goo‐
gle’s monitoring system is broken up into several binaries, but typically people learn
about all aspects of these binaries.) It can be tempting to combine monitoring with
other aspects of inspecting complex systems, such as detailed system profiling, singleprocess debugging, tracking details about exceptions or crashes, load testing, log col‐
lection and analysis, or traffic inspection. While most of these subjects share
commonalities with basic monitoring, blending together too many results in overly
complex and fragile systems. As in many other aspects of software engineering, main‐
taining distinct systems with clear, simple, loosely coupled points of integration is a
better strategy (for example, using web APIs for pulling summary data in a format
that can remain constant over an extended period of time).
Tying These Principles Together
The principles discussed in this chapter can be tied together into a philosophy on
monitoring and alerting that’s widely endorsed and followed within Google SRE
teams. While this monitoring philosophy is a bit aspirational, it’s a good starting
point for writing or reviewing a new alert, and it can help your organization ask the
right questions, regardless of the size of your organization or the complexity of your
service or system.
When creating rules for monitoring and alerting, asking the following questions can
help you avoid false positives and pager burnout:3
• Does this rule detect an otherwise undetected condition that is urgent, actionable,
and actively or imminently user-visible?4
Tying These Principles Together | 63

---

## [Sección 58] CHAPTER 6

-- 89 of 550 --

• Will I ever be able to ignore this alert, knowing it’s benign? When and why will I
be able to ignore this alert, and how can I avoid this scenario?
• Does this alert definitely indicate that users are being negatively affected? Are
there detectable cases in which users aren’t being negatively impacted, such as
drained traffic or test deployments, that should be filtered out?
• Can I take action in response to this alert? Is that action urgent, or could it wait
until morning? Could the action be safely automated? Will that action be a longterm fix, or just a short-term workaround?
• Are other people getting paged for this issue, therefore rendering at least one of
the pages unnecessary?
These questions reflect a fundamental philosophy on pages and pagers:
• Every time the pager goes off, I should be able to react with a sense of urgency. I
can only react with a sense of urgency a few times a day before I become fatigued.
• Every page should be actionable.
• Every page response should require intelligence. If a page merely merits a robotic
response, it shouldn’t be a page.
• Pages should be about a novel problem or an event that hasn’t been seen before.
Such a perspective dissipates certain distinctions: if a page satisfies the preceding four
bullets, it’s irrelevant whether the page is triggered by white-box or black-box moni‐
toring. This perspective also amplifies certain distinctions: it’s better to spend much
more effort on catching symptoms than causes; when it comes to causes, only worry
about very definite, very imminent causes.
Monitoring for the Long Term
In modern production systems, monitoring systems track an ever-evolving system
with changing software architecture, load characteristics, and performance targets.
An alert that’s currently exceptionally rare and hard to automate might become fre‐
quent, perhaps even meriting a hacked-together script to resolve it. At this point,
someone should find and eliminate the root causes of the problem; if such resolution
isn’t possible, the alert response deserves to be fully automated.
It’s important that decisions about monitoring be made with long-term goals in mind.
Every page that happens today distracts a human from improving the system for
tomorrow, so there is often a case for taking a short-term hit to availability or perfor‐
mance in order to improve the long-term outlook for the system. Let’s take a look at
two case studies that illustrate this trade-off.
64 | Chapter 6: Monitoring Distributed Systems
www.allitebooks.com

-- 90 of 550 --

Bigtable SRE: A Tale of Over-Alerting
Google’s internal infrastructure is typically offered and measured against a service
level objective (SLO; see Chapter 4). Many years ago, the Bigtable service’s SLO was
based on a synthetic well-behaved client’s mean performance. Because of problems in
Bigtable and lower layers of the storage stack, the mean performance was driven by a
“large” tail: the worst 5% of requests were often significantly slower than the rest.
Email alerts were triggered as the SLO approached, and paging alerts were triggered
when the SLO was exceeded. Both types of alerts were firing voluminously, consum‐
ing unacceptable amounts of engineering time: the team spent significant amounts of
time triaging the alerts to find the few that were really actionable, and we often
missed the problems that actually affected users, because so few of them did. Many of
the pages were non-urgent, due to well-understood problems in the infrastructure,
and had either rote responses or received no response.
To remedy the situation, the team used a three-pronged approach: while making
great efforts to improve the performance of Bigtable, we also temporarily dialed back
our SLO target, using the 75th percentile request latency. We also disabled email
alerts, as there were so many that spending time diagnosing them was infeasible.
This strategy gave us enough breathing room to actually fix the longer-term problems
in Bigtable and the lower layers of the storage stack, rather than constantly fixing tac‐
tical problems. On-call engineers could actually accomplish work when they weren’t
being kept up by pages at all hours. Ultimately, temporarily backing off on our alerts
allowed us to make faster progress toward a better service.
Gmail: Predictable, Scriptable Responses from Humans
In the very early days of Gmail, the service was built on a retrofitted distributed pro‐
cess management system called Workqueue, which was originally created for batch
processing of pieces of the search index. Workqueue was “adapted” to long-lived pro‐
cesses and subsequently applied to Gmail, but certain bugs in the relatively opaque
codebase in the scheduler proved hard to beat.
At that time, the Gmail monitoring was structured such that alerts fired when indi‐
vidual tasks were “de-scheduled” by Workqueue. This setup was less than ideal
because even at that time, Gmail had many, many thousands of tasks, each task repre‐
senting a fraction of a percent of our users. We cared deeply about providing a good
user experience for Gmail users, but such an alerting setup was unmaintainable.
To address this problem, Gmail SRE built a tool that helped “poke” the scheduler in
just the right way to minimize impact to users. The team had several discussions
about whether or not we should simply automate the entire loop from detecting the
problem to nudging the rescheduler, until a better long-term solution was achieved,
but some worried this kind of workaround would delay a real fix.
Monitoring for the Long Term | 65

---

## [Sección 59] CHAPTER 6

-- 91 of 550 --

This kind of tension is common within a team, and often reflects an underlying mis‐
trust of the team’s self-discipline: while some team members want to implement a
“hack” to allow time for a proper fix, others worry that a hack will be forgotten or
that the proper fix will be deprioritized indefinitely. This concern is credible, as it’s
easy to build layers of unmaintainable technical debt by patching over problems
instead of making real fixes. Managers and technical leaders play a key role in imple‐
menting true, long-term fixes by supporting and prioritizing potentially timeconsuming long-term fixes even when the initial “pain” of paging subsides.
Pages with rote, algorithmic responses should be a red flag. Unwillingness on the part
of your team to automate such pages implies that the team lacks confidence that they
can clean up their technical debt. This is a major problem worth escalating.
The Long Run
A common theme connects the previous examples of Bigtable and Gmail: a tension
between short-term and long-term availability. Often, sheer force of effort can help a
rickety system achieve high availability, but this path is usually short-lived and
fraught with burnout and dependence on a small number of heroic team members.
Taking a controlled, short-term decrease in availability is often a painful, but strategic
trade for the long-run stability of the system. It’s important not to think of every page
as an event in isolation, but to consider whether the overall level of paging leads
toward a healthy, appropriately available system with a healthy, viable team and longterm outlook. We review statistics about page frequency (usually expressed as inci‐
dents per shift, where an incident might be composed of a few related pages) in
quarterly reports with management, ensuring that decision makers are kept up to
date on the pager load and overall health of their teams.
Conclusion
A healthy monitoring and alerting pipeline is simple and easy to reason about. It
focuses primarily on symptoms for paging, reserving cause-oriented heuristics to
serve as aids to debugging problems. Monitoring symptoms is easier the further “up”
your stack you monitor, though monitoring saturation and performance of subsys‐
tems such as databases often must be performed directly on the subsystem itself.
Email alerts are of very limited value and tend to easily become overrun with noise;
instead, you should favor a dashboard that monitors all ongoing subcritical problems
for the sort of information that typically ends up in email alerts. A dashboard might
also be paired with a log, in order to analyze historical correlations.
Over the long haul, achieving a successful on-call rotation and product includes
choosing to alert on symptoms or imminent real problems, adapting your targets to
goals that are actually achievable, and making sure that your monitoring supports
rapid diagnosis.
66 | Chapter 6: Monitoring Distributed Systems

-- 92 of 550 --

1 For readers who already feel they precisely understand the value of automation, skip ahead to “The Value for
Google SRE” on page 70. However, note that our description contains some nuances that might be useful to
keep in mind while reading the rest of the chapter.

---

## [Sección 60] CHAPTER 7

The Evolution of Automation at Google
Written by Niall Murphy with John Looney and Michael Kacirek
Edited by Betsy Beyer
Besides black art, there is only automation and mechanization.
—Federico García Lorca (1898–1936), Spanish poet and playwright
For SRE, automation is a force multiplier, not a panacea. Of course, just multiplying
force does not naturally change the accuracy of where that force is applied: doing
automation thoughtlessly can create as many problems as it solves. Therefore, while
we believe that software-based automation is superior to manual operation in most
circumstances, better than either option is a higher-level system design requiring nei‐
ther of them—an autonomous system. Or to put it another way, the value of automa‐
tion comes from both what it does and its judicious application. We’ll discuss both
the value of automation and how our attitude has evolved over time.
The Value of Automation
What exactly is the value of automation?1
Consistency
Although scale is an obvious motivation for automation, there are many other rea‐
sons to use it. Take the example of university computing systems, where many sys‐
tems engineering folks started their careers. Systems administrators of that
background were generally charged with running a collection of machines or some
-- 93 of 550 --

2 The expertise acquired in building such automation is also valuable in itself; engineers both deeply under‐
stand the existing processes they have automated and can later automate novel processes more quickly.
software, and were accustomed to manually performing various actions in the dis‐
charge of that duty. One common example is creating user accounts; others include
purely operational duties like making sure backups happen, managing server failover,
and small data manipulations like changing the upstream DNS servers’ resolv.conf,
DNS server zone data, and similar activities. Ultimately, however, this prevalence of
manual tasks is unsatisfactory for both the organizations and indeed the people
maintaining systems in this way. For a start, any action performed by a human or
humans hundreds of times won’t be performed the same way each time: even with the
best will in the world, very few of us will ever be as consistent as a machine. This
inevitable lack of consistency leads to mistakes, oversights, issues with data quality,
and, yes, reliability problems. In this domain—the execution of well-scoped, known
procedures—the value of consistency is in many ways the primary value of automa‐
tion.
A Platform
Automation doesn’t just provide consistency. Designed and done properly, automatic
systems also provide a platform that can be extended, applied to more systems, or
perhaps even spun out for profit.2 (The alternative, no automation, is neither cost
effective nor extensible: it is instead a tax levied on the operation of a system.)
A platform also centralizes mistakes. In other words, a bug fixed in the code will be
fixed there once and forever, unlike a sufficiently large set of humans performing the
same procedure, as discussed previously. A platform can be extended to perform
additional tasks more easily than humans can be instructed to perform them (or
sometimes even realize that they have to be done). Depending on the nature of the
task, it can run either continuously or much more frequently than humans could
appropriately accomplish the task, or at times that are inconvenient for humans. Fur‐
thermore, a platform can export metrics about its performance, or otherwise allow
you to discover details about your process you didn’t know previously, because these
details are more easily measurable within the context of a platform.
Faster Repairs
There’s an additional benefit for systems where automation is used to resolve com‐
mon faults in a system (a frequent situation for SRE-created automation). If automa‐
tion runs regularly and successfully enough, the result is a reduced mean time to
repair (MTTR) for those common faults. You can then spend your time on other
tasks instead, thereby achieving increased developer velocity because you don’t have
to spend time either preventing a problem or (more commonly) cleaning up after it.
68 | Chapter 7: The Evolution of Automation at Google

---

## [Sección 61] CHAPTER 7

-- 94 of 550 --

3 See the following XKCD cartoon: http://xkcd.com/1205/.
As is well understood in the industry, the later in the product lifecycle a problem is
discovered, the more expensive it is to fix; see Chapter 17. Generally, problems that
occur in actual production are most expensive to fix, both in terms of time and
money, which means that an automated system looking for problems as soon as they
arise has a good chance of lowering the total cost of the system, given that the system
is sufficiently large.
Faster Action
In the infrastructural situations where SRE automation tends to be deployed, humans
don’t usually react as fast as machines. In most common cases, where, for example,
failover or traffic switching can be well defined for a particular application, it makes
no sense to effectively require a human to intermittently press a button called “Allow
system to continue to run.” (Yes, it is true that sometimes automatic procedures can
end up making a bad situation worse, but that is why such procedures should be
scoped over well-defined domains.) Google has a large amount of automation; in
many cases, the services we support could not long survive without this automation
because they crossed the threshold of manageable manual operation long ago.
Time Saving
Finally, time saving is an oft-quoted rationale for automation. Although people cite
this rationale for automation more than the others, in many ways the benefit is often
less immediately calculable. Engineers often waver over whether a particular piece of
automation or code is worth writing, in terms of effort saved in not requiring a task
to be performed manually versus the effort required to write it.3 It’s easy to overlook
the fact that once you have encapsulated some task in automation, anyone can exe‐
cute the task. Therefore, the time savings apply across anyone who would plausibly
use the automation. Decoupling operator from operation is very powerful.
Joseph Bironas, an SRE who led Google’s datacenter turnup efforts
for a time, forcefully argued:
“If we are engineering processes and solutions that are not auto‐
matable, we continue having to staff humans to maintain the sys‐
tem. If we have to staff humans to do the work, we are feeding the
machines with the blood, sweat, and tears of human beings. Think
The Matrix with less special effects and more pissed off System
Administrators.”
The Value of Automation | 69

-- 95 of 550 --

4 See, for example, http://blog.engineyard.com/2014/pets-vs-cattle.
The Value for Google SRE
All of these benefits and trade-offs apply to us just as much as anyone else, and Goo‐
gle does have a strong bias toward automation. Part of our preference for automation
springs from our particular business challenges: the products and services we look
after are planet-spanning in scale, and we don’t typically have time to engage in the
same kind of machine or service hand-holding common in other organizations.4 For
truly large services, the factors of consistency, quickness, and reliability dominate
most conversations about the trade-offs of performing automation.
Another argument in favor of automation, particularly in the case of Google, is our
complicated yet surprisingly uniform production environment, described in Chap‐
ter 2. While other organizations might have an important piece of equipment without
a readily accessible API, software for which no source code is available, or another
impediment to complete control over production operations, Google generally avoids
such scenarios. We have built APIs for systems when no API was available from the
vendor. Even though purchasing software for a particular task would have been much
cheaper in the short term, we chose to write our own solutions, because doing so pro‐
duced APIs with the potential for much greater long-term benefits. We spent a lot of
time overcoming obstacles to automatic system management, and then resolutely
developed that automatic system management itself. Given how Google manages its
source code [Pot16], the availability of that code for more or less any system that SRE
touches also means that our mission to “own the product in production” is much eas‐
ier because we control the entirety of the stack.
Of course, although Google is ideologically bent upon using machines to manage
machines where possible, reality requires some modification of our approach. It isn’t
appropriate to automate every component of every system, and not everyone has the
ability or inclination to develop automation at a particular time. Some essential sys‐
tems started out as quick prototypes, not designed to last or to interface with automa‐
tion. The previous paragraphs state a maximalist view of our position, but one that
we have been broadly successful at putting into action within the Google context. In
general, we have chosen to create platforms where we could, or to position ourselves
so that we could create platforms over time. We view this platform-based approach as
necessary for manageability and scalability.
The Use Cases for Automation
In the industry, automation is the term generally used for writing code to solve a wide
variety of problems, although the motivations for writing this code, and the solutions
70 | Chapter 7: The Evolution of Automation at Google

---

## [Sección 62] CHAPTER 7

-- 96 of 550 --

5 Of course, not every system that needs to be managed actually provides callable APIs for management—forc‐
ing some tooling to use, e.g., CLI invocations or automated website clicks.
themselves, are often quite different. More broadly, in this view, automation is “metasoftware”—software to act on software.
As we implied earlier, there are a number of use cases for automation. Here is a nonexhaustive list of examples:
• User account creation
• Cluster turnup and turndown for services
• Software or hardware installation preparation and decommissioning
• Rollouts of new software versions
• Runtime configuration changes
• A special case of runtime config changes: changes to your dependencies
This list could continue essentially ad infinitum.
Google SRE’s Use Cases for Automation
In Google, we have all of the use cases just listed, and more.
However, within Google SRE, our primary affinity has typically been for running
infrastructure, as opposed to managing the quality of the data that passes over that
infrastructure. This line isn’t totally clear—for example, we care deeply if half of a
dataset vanishes after a push, and therefore we alert on coarse-grain differences like
this, but it’s rare for us to write the equivalent of changing the properties of some
arbitrary subset of accounts on a system. Therefore, the context for our automation is
often automation to manage the lifecycle of systems, not their data: for example,
deployments of a service in a new cluster.
To this extent, SRE’s automation efforts are not far off what many other people and
organizations do, except that we use different tools to manage it and have a different
focus (as we’ll discuss).
Widely available tools like Puppet, Chef, cfengine, and even Perl, which all provide
ways to automate particular tasks, differ mostly in terms of the level of abstraction of
the components provided to help the act of automating. A full language like Perl pro‐
vides POSIX-level affordances, which in theory provide an essentially unlimited
scope of automation across the APIs accessible to the system,5 whereas Chef and Pup‐
pet provide out-of-the-box abstractions with which services or other higher-level
entities can be manipulated. The trade-off here is classic: higher-level abstractions are
easier to manage and reason about, but when you encounter a “leaky abstraction,”
The Use Cases for Automation | 71

-- 97 of 550 --

you fail systemically, repeatedly, and potentially inconsistently. For example, we often
assume that pushing a new binary to a cluster is atomic; the cluster will either end up
with the old version, or the new version. However, real-world behavior is more com‐
plicated: that cluster’s network can fail halfway through; machines can fail; communi‐
cation to the cluster management layer can fail, leaving the system in an inconsistent
state; depending on the situation, new binaries could be staged but not pushed, or
pushed but not restarted, or restarted but not verifiable. Very few abstractions model
these kinds of outcomes successfully, and most generally end up halting themselves
and calling for intervention. Truly bad automation systems don’t even do that.
SRE has a number of philosophies and products in the domain of automation, some
of which look more like generic rollout tools without particularly detailed modeling
of higher-level entities, and some of which look more like languages for describing
service deployment (and so on) at a very abstract level. Work done in the latter tends
to be more reusable and be more of a common platform than the former, but the
complexity of our production environment sometimes means that the former
approach is the most immediately tractable option.
A Hierarchy of Automation Classes
Although all of these automation steps are valuable, and indeed an automation plat‐
form is valuable in and of itself, in an ideal world, we wouldn’t need externalized
automation. In fact, instead of having a system that has to have external glue logic, it
would be even better to have a system that needs no glue logic at all, not just because
internalization is more efficient (although such efficiency is useful), but because it has
been designed to not need glue logic in the first place. Accomplishing that involves
taking the use cases for glue logic—generally “first order” manipulations of a system,
such as adding accounts or performing system turnup—and finding a way to handle
those use cases directly within the application.
As a more detailed example, most turnup automation at Google is problematic
because it ends up being maintained separately from the core system and therefore
suffers from “bit rot,” i.e., not changing when the underlying systems change. Despite
the best of intentions, attempting to more tightly couple the two (turnup automation
and the core system) often fails due to unaligned priorities, as product developers
will, not unreasonably, resist a test deployment requirement for every change. Sec‐
ondly, automation that is crucial but only executed at infrequent intervals and there‐
fore difficult to test is often particularly fragile because of the extended feedback
cycle. Cluster failover is one classic example of infrequently executed automation:
failovers might only occur every few months, or infrequently enough that inconsis‐
tencies between instances are introduced. The evolution of automation follows a
path:
72 | Chapter 7: The Evolution of Automation at Google

---

## [Sección 63] CHAPTER 7

-- 98 of 550 --

1) No automation
Database master is failed over manually between locations.
2) Externally maintained system-specific automation
An SRE has a failover script in his or her home directory.
3) Externally maintained generic automation
The SRE adds database support to a “generic failover” script that everyone uses.
4) Internally maintained system-specific automation
The database ships with its own failover script.
5) Systems that don’t need any automation
The database notices problems, and automatically fails over without human
intervention.
SRE hates manual operations, so we obviously try to create systems that don’t require
them. However, sometimes manual operations are unavoidable.
There is additionally a subvariety of automation that applies changes not across the
domain of specific system-related configuration, but across the domain of production
as a whole. In a highly centralized proprietary production environment like Google’s,
there are a large number of changes that have a non–service-specific scope—e.g.,
changing upstream Chubby servers, a flag change to the Bigtable client library to
make access more reliable, and so on—which nonetheless need to be safely managed
and rolled back if necessary. Beyond a certain volume of changes, it is infeasible for
production-wide changes to be accomplished manually, and at some time before that
point, it’s a waste to have manual oversight for a process where a large proportion of
the changes are either trivial or accomplished successfully by basic relaunch-andcheck strategies.
Let’s use internal case studies to illustrate some of the preceding points in detail. The
first case study is about how, due to some diligent, far-sighted work, we managed to
achieve the self-professed nirvana of SRE: to automate ourselves out of a job.
Automate Yourself Out of a Job: Automate ALL the Things!
For a long while, the Ads products at Google stored their data in a MySQL database.
Because Ads data obviously has high reliability requirements, an SRE team was
charged with looking after that infrastructure. From 2005 to 2008, the Ads Database
mostly ran in what we considered to be a mature and managed state. For example, we
had automated away the worst, but not all, of the routine work for standard replica
replacements. We believed the Ads Database was well managed and that we had har‐
vested most of the low-hanging fruit in terms of optimization and scale. However, as
daily operations became comfortable, team members began to look at the next level
Automate Yourself Out of a Job: Automate ALL the Things! | 73

-- 99 of 550 --

of system development: migrating MySQL onto Google’s cluster scheduling system,
Borg.
We hoped this migration would provide two main benefits:
• Completely eliminate machine/replica maintenance: Borg would automatically
handle the setup/restart of new and broken tasks.
• Enable bin-packing of multiple MySQL instances on the same physical machine:
Borg would enable more efficient use of machine resources via Containers.
In late 2008, we successfully deployed a proof of concept MySQL instance on Borg.
Unfortunately, this was accompanied by a significant new difficulty. A core operating
characteristic of Borg is that its tasks move around automatically. Tasks commonly
move within Borg as frequently as once or twice per week. This frequency was tolera‐
ble for our database replicas, but unacceptable for our masters.
At that time, the process for master failover took 30–90 minutes per instance. Simply
because we ran on shared machines and were subject to reboots for kernel upgrades,
in addition to the normal rate of machine failure, we had to expect a number of
otherwise unrelated failovers every week. This factor, in combination with the num‐
ber of shards on which our system was hosted, meant that:
• Manual failovers would consume a substantial amount of human hours and
would give us best-case availability of 99% uptime, which fell short of the actual
business requirements of the product.
• In order to meet our error budgets, each failover would have to take less than 30
seconds of downtime. There was no way to optimize a human-dependent proce‐
dure to make downtime shorter than 30 seconds.
Therefore, our only choice was to automate failover. Actually, we needed to automate
more than just failover.
In 2009 Ads SRE completed our automated failover daemon, which we dubbed
“Decider.” Decider could complete MySQL failovers for both planned and unplanned
failovers in less than 30 seconds 95% of the time. With the creation of Decider,
MySQL on Borg (MoB) finally became a reality. We graduated from optimizing our
infrastructure for a lack of failover to embracing the idea that failure is inevitable, and
therefore optimizing to recover quickly through automation.
While automation let us achieve highly available MySQL in a world that forced up to
two restarts per week, it did come with its own set of costs. All of our applications had
to be changed to include significantly more failure-handling logic than before. Given
that the norm in the MySQL development world is to assume that the MySQL
instance will be the most stable component in the stack, this switch meant customiz‐
ing software like JDBC to be more tolerant of our failure-prone environment. How‐
74 | Chapter 7: The Evolution of Automation at Google

---

## [Sección 64] CHAPTER 7

-- 100 of 550 --

ever, the benefits of migrating to MoB with Decider were well worth these costs. Once
on MoB, the time our team spent on mundane operational tasks dropped by 95%.
Our failovers were automated, so an outage of a single database task no longer paged
a human.
The main upshot of this new automation was that we had a lot more free time to
spend on improving other parts of the infrastructure. Such improvements had a cas‐
cading effect: the more time we saved, the more time we were able to spend on opti‐
mizing and automating other tedious work. Eventually, we were able to automate
schema changes, causing the cost of total operational maintenance of the Ads Data‐
base to drop by nearly 95%. Some might say that we had successfully automated our‐
selves out of this job. The hardware side of our domain also saw improvement.
Migrating to MoB freed up considerable resources because we could schedule multi‐
ple MySQL instances on the same machines, which improved utilization of our hard‐
ware. In total, we were able to free up about 60% of our hardware. Our team was now
flush with hardware and engineering resources.
This example demonstrates the wisdom of going the extra mile to deliver a platform
rather than replacing existing manual procedures. The next example comes from the
cluster infrastructure group, and illustrates some of the more difficult trade-offs you
might encounter on your way to automating all the things.
Soothing the Pain: Applying Automation to Cluster
Turnups
Ten years ago, the Cluster Infrastructure SRE team seemed to get a new hire every
few months. As it turned out, that was approximately the same frequency at which we
turned up a new cluster. Because turning up a service in a new cluster gives new hires
exposure to a service’s internals, this task seemed like a natural and useful training
tool.
The steps taken to get a cluster ready for use were something like the following:
1. Fit out a datacenter building for power and cooling.
2. Install and configure core switches and connections to the backbone.
3. Install a few initial racks of servers.
4. Configure basic services such as DNS and installers, then configure a lock ser‐
vice, storage, and computing.
5. Deploy the remaining racks of machines.
6. Assign user-facing services resources, so their teams can set up the services.
Soothing the Pain: Applying Automation to Cluster Turnups | 75

-- 101 of 550 --

Steps 4 and 6 were extremely complex. While basic services like DNS are relatively
simple, the storage and compute subsystems at that time were still in heavy develop‐
ment, so new flags, components, and optimizations were added weekly.
Some services had more than a hundred different component subsystems, each with a
complex web of dependencies. Failing to configure one subsystem, or configuring a
system or component differently than other deployments, is a customer-impacting
outage waiting to happen.
In one case, a multi-petabyte Bigtable cluster was configured to not use the first (log‐
ging) disk on 12-disk systems, for latency reasons. A year later, some automation
assumed that if a machine’s first disk wasn’t being used, that machine didn’t have any
storage configured; therefore, it was safe to wipe the machine and set it up from
scratch. All of the Bigtable data was wiped, instantly. Thankfully we had multiple realtime replicas of the dataset, but such surprises are unwelcome. Automation needs to
be careful about relying on implicit “safety” signals.
Early automation focused on accelerating cluster delivery. This approach tended to
rely upon creative use of SSH for tedious package distribution and service initializa‐
tion problems. This strategy was an initial win, but those free-form scripts became a
cholesterol of technical debt.
Detecting Inconsistencies with Prodtest
As the numbers of clusters grew, some clusters required hand-tuned flags and set‐
tings. As a result, teams wasted more and more time chasing down difficult-to-spot
misconfigurations. If a flag that made GFS more responsive to log processing leaked
into the default templates, cells with many files could run out of memory under load.
Infuriating and time-consuming misconfigurations crept in with nearly every large
configuration change.
The creative—though brittle—shell scripts we used to configure clusters were neither
scaling to the number of people who wanted to make changes nor to the sheer num‐
ber of cluster permutations that needed to be built. These shell scripts also failed to
resolve more significant concerns before declaring that a service was good to take
customer-facing traffic, such as:
• Were all of the service’s dependencies available and correctly configured?
• Were all configurations and packages consistent with other deployments?
• Could the team confirm that every configuration exception was desired?
Prodtest (Production Test) was an ingenious solution to these unwelcome surprises.
We extended the Python unit test framework to allow for unit testing of real-world
services. These unit tests have dependencies, allowing a chain of tests, and a failure in
one test would quickly abort. Take the test shown in Figure 7-1 as an example.
76 | Chapter 7: The Evolution of Automation at Google

---

## [Sección 65] CHAPTER 7

-- 102 of 550 --

Figure 7-1. ProdTest for DNS Service, showing how one failed test aborts the subsequent
chain of tests
A given team’s Prodtest was given the cluster name, and it could validate that team’s
services in that cluster. Later additions allowed us to generate a graph of the unit tests
and their states. This functionality allowed an engineer to see quickly if their service
was correctly configured in all clusters, and if not, why. The graph highlighted the
failed step, and the failing Python unit test output a more verbose error message.
Any time a team encountered a delay due to another team’s unexpected misconfigura‐
tion, a bug could be filed to extend their Prodtest. This ensured that a similar prob‐
lem would be discovered earlier in the future. SREs were proud to be able to assure
their customers that all services—both newly turned up services and existing services
with new configuration—would reliably serve production traffic.
For the first time, our project managers could predict when a cluster could “go live,”
and had a complete understanding of why each clusters took six or more weeks to go
from “network-ready” to “serving live traffic.” Out of the blue, SRE received a mission
from senior management: In three months, five new clusters will reach network-ready
on the same day. Please turn them up in one week.
Soothing the Pain: Applying Automation to Cluster Turnups | 77

-- 103 of 550 --

Resolving Inconsistencies Idempotently
A “One Week Turnup” was a terrifying mission. We had tens of thousands of lines of
shell script owned by dozens of teams. We could quickly tell how unprepared any
given cluster was, but fixing it meant that the dozens of teams would have to file hun‐
dreds of bugs, and then we had to hope that these bugs would be promptly fixed.
We realized that evolving from “Python unit tests finding misconfigurations” to
“Python code fixing misconfigurations” could enable us to fix these issues faster.
The unit test already knew which cluster we were examining and the specific test that
was failing, so we paired each test with a fix. If each fix was written to be idempotent,
and could assume that all dependencies were met, resolving the problem should have
been easy—and safe—to resolve. Requiring idempotent fixes meant teams could run
their “fix script” every 15 minutes without fearing damage to the cluster’s configura‐
tion. If the DNS team’s test was blocked on the Machine Database team’s configura‐
tion of a new cluster, as soon as the cluster appeared in the database, the DNS team’s
tests and fixes would start working.
Take the test shown in Figure 7-2 as an example. If TestDnsMonitoringConfigExists
fails, as shown, we can call FixDnsMonitoringCreateConfig, which scrapes configu‐
ration from a database, then checks a skeleton configuration file into our revision
control system. Then TestDnsMonitoringConfigExists passes on retry, and
the TestDnsMonitoringConfigPushed test can be attempted. If the test fails, the
FixDnsMonitoringPushConfig step runs. If a fix fails multiple times, the automation
assumes that the fix failed and stops, notifying the user.
Armed with these scripts, a small group of engineers could ensure that we could go
from “The network works, and machines are listed in the database” to “Serving 1% of
websearch and ads traffic” in a matter of a week or two. At the time, this seemed to be
the apex of automation technology.
Looking back, this approach was deeply flawed; the latency between the test, the fix,
and then a second test introduced flaky tests that sometimes worked and sometimes
failed. Not all fixes were naturally idempotent, so a flaky test that was followed by a
fix might render the system in an inconsistent state.
78 | Chapter 7: The Evolution of Automation at Google

-- 104 of 550 --

Figure 7-2. ProdTest for DNS Service, showing that one failed test resulted in only run‐
ning one fix
The Inclination to Specialize
Automation processes can vary in three respects:
• Competence, i.e., their accuracy
• Latency, how quickly all steps are executed when initiated
• Relevance, or proportion of real-world process covered by automation
We began with a process that was highly competent (maintained and run by the ser‐
vice owners), high-latency (the service owners performed the process in their spare
time or assigned it to new engineers), and very relevant (the service owners knew
when the real world changed, and could fix the automation).
To reduce turnup latency, many service owning teams instructed a single “turnup
team” what automation to run. The turnup team used tickets to start each stage in the
turnup so that we could track the remaining tasks, and who those tasks were assigned
to. If the human interactions regarding automation modules occurred between peo‐
ple in the same room, cluster turnups could happen in a much shorter time. Finally,
we had our competent, accurate, and timely automation process!
Soothing the Pain: Applying Automation to Cluster Turnups | 79

---

## [Sección 66] CHAPTER 7

-- 105 of 550 --

But this state didn’t last long. The real world is chaotic: software, configuration, data,
etc. changed, resulting in over a thousand separate changes a day to affected systems.
The people most affected by automation bugs were no longer domain experts, so the
automation became less relevant (meaning that new steps were missed) and less com‐
petent (new flags might have caused automation to fail). However, it took a while for
this drop in quality to impact velocity.
Automation code, like unit test code, dies when the maintaining team isn’t obsessive
about keeping the code in sync with the codebase it covers. The world changes
around the code: the DNS team adds new configuration options, the storage team
changes their package names, and the networking team needs to support new devices.
By relieving teams who ran services of the responsibility to maintain and run their
automation code, we created ugly organizational incentives:
• A team whose primary task is to speed up the current turnup has no incentive to
reduce the technical debt of the service-owning team running the service in pro‐
duction later.
• A team not running automation has no incentive to build systems that are easy to
automate.
• A product manager whose schedule is not affected by low-quality automation
will always prioritize new features over simplicity and automation.
The most functional tools are usually written by those who use them. A similar argu‐
ment applies to why product development teams benefit from keeping at least some
operational awareness of their systems in production.
Turnups were again high-latency, inaccurate, and incompetent—the worst of all
worlds. However, an unrelated security mandate allowed us out of this trap. Much of
distributed automation relied at that time on SSH. This is clumsy from a security per‐
spective, because people must have root on many machines to run most commands.
A growing awareness of advanced, persistent security threats drove us to reduce the
privileges SREs enjoyed to the absolute minimum they needed to do their jobs. We
had to replace our use of sshd with an authenticated, ACL-driven, RPC-based Local
Admin Daemon, also known as Admin Servers, which had permissions to perform
those local changes. As a result, no one could install or modify a server without an
audit trail. Changes to the Local Admin Daemon and the Package Repo were gated on
code reviews, making it very difficult for someone to exceed their authority; giving
someone the access to install packages would not let them view colocated logs. The
Admin Server logged the RPC requestor, any parameters, and the results of all RPCs
to enhance debugging and security audits.
80 | Chapter 7: The Evolution of Automation at Google

-- 106 of 550 --

6 We have compressed and simplified this history to aid understanding.
Service-Oriented Cluster-Turnup
In the next iteration, Admin Servers became part of service teams’ workflows, both as
related to the machine-specific Admin Servers (for installing packages and rebooting)
and cluster-level Admin Servers (for actions like draining or turning up a service).
SREs moved from writing shell scripts in their home directories to building peerreviewed RPC servers with fine-grained ACLs.
Later on, after the realization that turnup processes had to be owned by the teams
that owned the services fully sank in, we saw this as a way to approach cluster turnup
as a Service-Oriented Architecture (SOA) problem: service owners would be respon‐
sible for creating an Admin Server to handle cluster turnup/turndown RPCs, sent by
the system that knew when clusters were ready. In turn, each team would provide the
contract (API) that the turnup automation needed, while still being free to change the
underlying implementation. As a cluster reached “network-ready,” automation sent
an RPC to each Admin Server that played a part in turning up the cluster.
We now have a low-latency, competent, and accurate process; most importantly, this
process has stayed strong as the rate of change, the number of teams, and the number
of services seem to double each year.
As mentioned earlier, our evolution of turnup automation followed a path:
1. Operator-triggered manual action (no automation)
2. Operator-written, system-specific automation
3. Externally maintained generic automation
4. Internally maintained, system-specific automation
5. Autonomous systems that need no human intervention
While this evolution has, broadly speaking, been a success, the Borg case study illus‐
trates another way we have come to think of the problem of automation.
Borg: Birth of the Warehouse-Scale Computer
Another way to understand the development of our attitude toward automation, and
when and where that automation is best deployed, is to consider the history of the
development of our cluster management systems.6 Like MySQL on Borg, which
demonstrated the success of converting manual operations to automatic ones, and the
cluster turnup process, which demonstrated the downside of not thinking carefully
enough about where and how automation was implemented, developing cluster man‐
Borg: Birth of the Warehouse-Scale Computer | 81

---

## [Sección 67] CHAPTER 7

-- 107 of 550 --

agement also ended up demonstrating another lesson about how automation should
be done. Like our previous two examples, something quite sophisticated was created
as the eventual result of continuous evolution from simpler beginnings.
Google’s clusters were initially deployed much like everyone else’s small networks of
the time: racks of machines with specific purposes and heterogeneous configurations.
Engineers would log in to some well-known “master” machine to perform adminis‐
trative tasks; “golden” binaries and configuration lived on these masters. As we had
only one colo provider, most naming logic implicitly assumed that location. As pro‐
duction grew, and we began to use multiple clusters, different domains (cluster
names) entered the picture. It became necessary to have a file describing what each
machine did, which grouped machines under some loose naming strategy. This
descriptor file, in combination with the equivalent of a parallel SSH, allowed us to
reboot (for example) all the search machines in one go. Around this time, it was com‐
mon to get tickets like “search is done with machine x1, crawl can have the machine
now.”
Automation development began. Initially automation consisted of simple Python
scripts for operations such as the following:
• Service management: keeping services running (e.g., restarts after segfaults)
• Tracking what services were supposed to run on which machines
• Log message parsing: SSHing into each machine and looking for regexps
Automation eventually mutated into a proper database that tracked machine state,
and also incorporated more sophisticated monitoring tools. With the union set of the
automation available, we could now automatically manage much of the lifecycle of
machines: noticing when machines were broken, removing the services, sending
them to repair, and restoring the configuration when they came back from repair.
But to take a step back, this automation was useful yet profoundly limited, due to the
fact that abstractions of the system were relentlessly tied to physical machines. We
needed a new approach, hence Borg [Ver15] was born: a system that moved away
from the relatively static host/port/job assignments of the previous world, toward
treating a collection of machines as a managed sea of resources. Central to its success
—and its conception—was the notion of turning cluster management into an entity
for which API calls could be issued, to some central coordinator. This liberated extra
dimensions of efficiency, flexibility, and reliability: unlike the previous model of
machine “ownership,” Borg could allow machines to schedule, for example, batch and
user-facing tasks on the same machine.
82 | Chapter 7: The Evolution of Automation at Google

-- 108 of 550 --

7 As in a small, unchanging number.
8 See, e.g., https://en.wikipedia.org/wiki/Air_France_Flight_447.
9 See, e.g., [Bai83] and [Sar97].
This functionality ultimately resulted in continuous and automatic operating system
upgrades with a very small amount of constant7 effort—effort that does not scale with
the total size of production deployments. Slight deviations in machine state are now
automatically fixed; brokenness and lifecycle management are essentially no-ops for
SRE at this point. Thousands of machines are born, die, and go into repairs daily with
no SRE effort. To echo the words of Ben Treynor Sloss: by taking the approach that
this was a software problem, the initial automation bought us enough time to turn
cluster management into something autonomous, as opposed to automated. We
achieved this goal by bringing ideas related to data distribution, APIs, hub-and-spoke
architectures, and classic distributed system software development to bear upon the
domain of infrastructure management.
An interesting analogy is possible here: we can make a direct mapping between the
single machine case and the development of cluster management abstractions. In this
view, rescheduling on another machine looks a lot like a process moving from one
CPU to another: of course, those compute resources happen to be at the other end of
a network link, but to what extent does that actually matter? Thinking in these terms,
rescheduling looks like an intrinsic feature of the system rather than something one
would “automate”—humans couldn’t react fast enough anyway. Similarly in the case
of cluster turnup: in this metaphor, cluster turnup is simply additional schedulable
capacity, a bit like adding disk or RAM to a single computer. However, a single-node
computer is not, in general, expected to continue operating when a large number of
components fail. The global computer is—it must be self-repairing to operate once it
grows past a certain size, due to the essentially statistically guaranteed large number
of failures taking place every second. This implies that as we move systems up the
hierarchy from manually triggered, to automatically triggered, to autonomous, some
capacity for self-introspection is necessary to survive.
Reliability Is the Fundamental Feature
Of course, for effective troubleshooting, the details of internal operation that the
introspection relies upon should also be exposed to the humans managing the overall
system. Analogous discussions about the impact of automation in the noncomputer
domain—for example, in airplane flight8 or industrial applications—often point out
the downside of highly effective automation:9 human operators are progressively
more relieved of useful direct contact with the system as the automation covers more
and more daily activities over time. Inevitably, then, a situation arises in which the
automation fails, and the humans are now unable to successfully operate the system.
Reliability Is the Fundamental Feature | 83

---

## [Sección 68] CHAPTER 7

-- 109 of 550 --

10 This is yet another good reason for regular practice drills; see “Disaster Role Playing” on page 401.
The fluidity of their reactions has been lost due to lack of practice, and their mental
models of what the system should be doing no longer reflect the reality of what it is
doing.10 This situation arises more when the system is nonautonomous—i.e., where
automation replaces manual actions, and the manual actions are presumed to be
always performable and available just as they were before. Sadly, over time, this ulti‐
mately becomes false: those manual actions are not always performable because the
functionality to permit them no longer exists.
We, too, have experienced situations where automation has been actively harmful on
a number of occasions—see “Automation: Enabling Failure at Scale” on page 85—but
in Google’s experience, there are more systems for which automation or autonomous
behavior are no longer optional extras. As you scale, this is of course the case, but
there are still strong arguments for more autonomous behavior of systems irrespec‐
tive of size. Reliability is the fundamental feature, and autonomous, resilient behavior
is one useful way to get that.
Recommendations
You might read the examples in this chapter and decide that you need to be Googlescale before you have anything to do with automation whatsoever. This is untrue, for
two reasons: automation provides more than just time saving, so it’s worth imple‐
menting in more cases than a simple time-expended versus time-saved calculation
might suggest. But the approach with the highest leverage actually occurs in the
design phase: shipping and iterating rapidly might allow you to implement function‐
ality faster, yet rarely makes for a resilient system. Autonomous operation is difficult
to convincingly retrofit to sufficiently large systems, but standard good practices in
software engineering will help considerably: having decoupled subsystems, introduc‐
ing APIs, minimizing side effects, and so on.
84 | Chapter 7: The Evolution of Automation at Google

-- 110 of 550 --

Automation: Enabling Failure at Scale
Google runs over a dozen of its own large datacenters, but we also depend on
machines in many third-party colocation facilities (or “colos”). Our machines in these
colos are used to terminate most incoming connections, or as a cache for our own
Content Delivery Network, in order to lower end-user latency. At any point in time, a
number of these racks are being installed or decommissioned; both of these processes
are largely automated. One step during decommission involves overwriting the full
content of the disk of all the machines in the rack, after which point an independent
system verifies the successful erase. We call this process “Diskerase.”
Once upon a time, the automation in charge of decommissioning a particular rack
failed, but only after the Diskerase step had completed successfully. Later, the decom‐
mission process was restarted from the beginning, to debug the failure. On that itera‐
tion, when trying to send the set of machines in the rack to Diskerase, the automation
determined that the set of machines that still needed to be Diskerased was (correctly)
empty. Unfortunately, the empty set was used as a special value, interpreted to mean
“everything.” This means the automation sent almost all the machines we have in all
colos to Diskerase.
Within minutes, the highly efficient Diskerase wiped the disks on all machines in our
CDN, and the machines were no longer able to terminate connections from users (or
do anything else useful). We were still able to serve all the users from our own data‐
centers, and after a few minutes the only effect visible externally was a slight increase
in latency. As far as we could tell, very few users noticed the problem at all, thanks to
good capacity planning (at least we got that right!). Meanwhile, we spent the better
part of two days reinstalling the machines in the affected colo racks; then we spent the
following weeks auditing and adding more sanity checks—including rate limiting—
into our automation, and making our decommission workflow idempotent.
Recommendations | 85

---

## [Sección 69] CHAPTER 7

-- 111 of 550 --

-- 112 of 550 --

---

## [Sección 70] CHAPTER 8

Release Engineering
Written by Dinah McNutt
Edited by Betsy Beyer and Tim Harvey
Release engineering is a relatively new and fast-growing discipline of software engi‐
neering that can be concisely described as building and delivering software
[McN14a]. Release engineers have a solid (if not expert) understanding of source
code management, compilers, build configuration languages, automated build tools,
package managers, and installers. Their skill set includes deep knowledge of multiple
domains: development, configuration management, test integration, system adminis‐
tration, and customer support.
Running reliable services requires reliable release processes. Site Reliability Engineers
(SREs) need to know that the binaries and configurations they use are built in a
reproducible, automated way so that releases are repeatable and aren’t “unique snow‐
flakes.” Changes to any aspect of the release process should be intentional, rather than
accidental. SREs care about this process from source code to deployment.
Release engineering is a specific job function at Google. Release engineers work with
software engineers (SWEs) in product development and SREs to define all the steps
required to release software—from how the software is stored in the source code
repository, to build rules for compilation, to how testing, packaging, and deployment
are conducted.
The Role of a Release Engineer
Google is a data-driven company and release engineering follows suit. We have tools
that report on a host of metrics, such as how much time it takes for a code change to
be deployed into production (in other words, release velocity) and statistics on what
-- 113 of 550 --

features are being used in build configuration files [Ada15]. Most of these tools were
envisioned and developed by release engineers.
Release engineers define best practices for using our tools in order to make sure
projects are released using consistent and repeatable methodologies. Our best practi‐
ces cover all elements of the release process. Examples include compiler flags, formats
for build identification tags, and required steps during a build. Making sure that our
tools behave correctly by default and are adequately documented makes it easy for
teams to stay focused on features and users, rather than spending time reinventing
the wheel (poorly) when it comes to releasing software.
Google has a large number of SREs who are charged with safely deploying products
and keeping Google services up and running. In order to make sure our release pro‐
cesses meet business requirements, release engineers and SREs work together to
develop strategies for canarying changes, pushing out new releases without interrupt‐
ing services, and rolling back features that demonstrate problems.
Philosophy
Release engineering is guided by an engineering and service philosophy that’s
expressed through four major principles, detailed in the following sections.
Self-Service Model
In order to work at scale, teams must be self-sufficient. Release engineering has devel‐
oped best practices and tools that allow our product development teams to control
and run their own release processes. Although we have thousands of engineers and
products, we can achieve a high release velocity because individual teams can decide
how often and when to release new versions of their products. Release processes can
be automated to the point that they require minimal involvement by the engineers,
and many projects are automatically built and released using a combination of our
automated build system and our deployment tools. Releases are truly automatic, and
only require engineer involvement if and when problems arise.
High Velocity
User-facing software (such as many components of Google Search) is rebuilt fre‐
quently, as we aim to roll out customer-facing features as quickly as possible. We have
embraced the philosophy that frequent releases result in fewer changes between ver‐
sions. This approach makes testing and troubleshooting easier. Some teams perform
hourly builds and then select the version to actually deploy to production from the
resulting pool of builds. Selection is based upon the test results and the features con‐
tained in a given build. Other teams have adopted a “Push on Green” release model
and deploy every build that passes all tests [Kle14].
88 | Chapter 8: Release Engineering

---

## [Sección 71] CHAPTER 8

-- 114 of 550 --

1 Google uses a monolithic unified source code repository; see [Pot16].
Hermetic Builds
Build tools must allow us to ensure consistency and repeatability. If two people
attempt to build the same product at the same revision number in the source code
repository on different machines, we expect identical results.1 Our builds are her‐
metic, meaning that they are insensitive to the libraries and other software installed
on the build machine. Instead, builds depend on known versions of build tools, such
as compilers, and dependencies, such as libraries. The build process is self-contained
and must not rely on services that are external to the build environment.
Rebuilding older releases when we need to fix a bug in software that’s running in pro‐
duction can be a challenge. We accomplish this task by rebuilding at the same revi‐
sion as the original build and including specific changes that were submitted after
that point in time. We call this tactic cherry picking. Our build tools are themselves
versioned based on the revision in the source code repository for the project being
built. Therefore, a project built last month won’t use this month’s version of the com‐
piler if a cherry pick is required, because that version may contain incompatible or
undesired features.
Enforcement of Policies and Procedures
Several layers of security and access control determine who can perform specific
operations when releasing a project. Gated operations include:
• Approving source code changes—this operation is managed through configura‐
tion files scattered throughout the codebase
• Specifying the actions to be performed during the release process
• Creating a new release
• Approving the initial integration proposal (which is a request to perform a build
at a specific revision number in the source code repository) and subsequent
cherry picks
• Deploying a new release
• Making changes to a project’s build configuration
Almost all changes to the codebase require a code review, which is a streamlined
action integrated into our normal developer workflow. Our automated release system
produces a report of all changes contained in a release, which is archived with other
build artifacts. By allowing SREs to understand what changes are included in a new
Philosophy | 89

-- 115 of 550 --

2 Blaze has been open sourced as Bazel. See “Bazel FAQ” on the Bazel website, http://bazel.io/faq.html.
release of a project, this report can expedite troubleshooting when there are problems
with a release.
Continuous Build and Deployment
Google has developed an automated release system called Rapid. Rapid is a system
that leverages a number of Google technologies to provide a framework that delivers
scalable, hermetic, and reliable releases. The following sections describe the software
lifecycle at Google and how it is managed using Rapid and other associated tools.
Building
Blaze2 is Google’s build tool of choice. It supports building binaries from a range of
languages, including our standard languages of C++, Java, Python, Go, and Java‐
Script. Engineers use Blaze to define build targets (e.g., the output of a build, such as a
JAR file), and to specify the dependencies for each target. When performing a build,
Blaze automatically builds the dependency targets.
Build targets for binaries and unit tests are defined in Rapid’s project configuration
files. Project-specific flags, such as a unique build identifier, are passed by Rapid to
Blaze. All binaries support a flag that displays the build date, the revision number,
and the build identifier, which allow us to easily associate a binary to a record of how
it was built.
Branching
All code is checked into the main branch of the source code tree (mainline). How‐
ever, most major projects don’t release directly from the mainline. Instead, we branch
from the mainline at a specific revision and never merge changes from the branch
back into the mainline. Bug fixes are submitted to the mainline and then cherry
picked into the branch for inclusion in the release. This practice avoids inadvertently
picking up unrelated changes submitted to the mainline since the original build
occurred. Using this branch and cherry pick method, we know the exact contents of
each release.
Testing
A continuous test system runs unit tests against the code in the mainline each time a
change is submitted, allowing us to detect build and test failures quickly. Release
engineering recommends that the continuous build test targets correspond to the
same test targets that gate the project release. We also recommend creating releases at
90 | Chapter 8: Release Engineering

---

## [Sección 72] CHAPTER 8

-- 116 of 550 --

the revision number (version) of the last continuous test build that successfully com‐
pleted all tests. These measures decrease the chance that subsequent changes made to
the mainline will cause failures during the build performed at release time.
During the release process, we re-run the unit tests using the release branch and cre‐
ate an audit trail showing that all the tests passed. This step is important because if a
release involves cherry picks, the release branch may contain a version of the code
that doesn’t exist anywhere on the mainline. We want to guarantee that the tests pass
in the context of what’s actually being released.
To complement the continuous test system, we use an independent testing environ‐
ment that runs system-level tests on packaged build artifacts. These tests can be
launched manually or from Rapid.
Packaging
Software is distributed to our production machines via the Midas Package Manager
(MPM) [McN14c]. MPM assembles packages based on Blaze rules that list the build
artifacts to include, along with their owners and permissions. Packages are named
(e.g., search/shakespeare/frontend), versioned with a unique hash, and signed to
ensure authenticity. MPM supports applying labels to a particular version of a pack‐
age. Rapid applies a label containing the build ID, which guarantees that a package
can be uniquely referenced using the name of the package and this label.
Labels can be applied to an MPM package to indicate a package’s location in the
release process (e.g., dev, canary, or production). If you apply an existing label to a
new package, the label is automatically moved from the old package to the new pack‐
age. For example: if a package is labeled as canary, someone subsequently installing
the canary version of that package will automatically receive the newest version of the
package with the label canary.
Rapid
Figure 8-1 shows the main components of the Rapid system. Rapid is configured with
files called blueprints. Blueprints are written in an internal configuration language
and are used to define build and test targets, rules for deployment, and administrative
information (like project owners). Role-based access control lists determine who can
perform specific actions on a Rapid project.
Continuous Build and Deployment | 91

-- 117 of 550 --

Figure 8-1. Simplified view of Rapid architecture showing the main components of the
system
Each Rapid project has workflows that define the actions to perform during the
release process. Workflow actions can be performed serially or in parallel, and a
workflow can launch other workflows. Rapid dispatches work requests to tasks run‐
ning as a Borg job on our production servers. Because Rapid uses our production
infrastructure, it can handle thousands of release requests simultaneously.
A typical release process proceeds as follows:
1. Rapid uses the requested integration revision number (often obtained automati‐
cally from our continuous test system) to create a release branch.
2. Rapid uses Blaze to compile all the binaries and execute the unit tests, often per‐
forming these two steps in parallel. Compilation and testing occur in environ‐
ments dedicated to those specific tasks, as opposed to taking place in the Borg job
where the Rapid workflow is executing. This separation allows us to parallelize
work easily.
3. Build artifacts are then available for system testing and canary deployments. A
typical canary deployment involves starting a few jobs in our production envi‐
ronment after the completion of system tests.
4. The results of each step of the process are logged. A report of all changes since
the last release is created.
Rapid allows us to manage our release branches and cherry picks; individual cherry
pick requests can be approved or rejected for inclusion in a release.
92 | Chapter 8: Release Engineering

-- 118 of 550 --

Deployment
Rapid is often used to drive simple deployments directly. It updates the Borg jobs to
use newly built MPM packages based on deployment definitions in the blueprint files
and specialized task executors.
For more complicated deployments, we use Sisyphus, which is a general-purpose roll‐
out automation framework developed by SRE. A rollout is a logical unit of work that
is composed of one or more individual tasks. Sisyphus provides a set of Python
classes that can be extended to support any deployment process. It has a dashboard
that allows for finer control on how the rollout is performed and provides a way to
monitor the rollout’s progress.
In a typical integration, Rapid creates a rollout in a long-running Sisyphus job. Rapid
knows the build label associated with the MPM package it created, and can specify
that build label when creating the rollout in Sisyphus. Sisyphus uses the build label to
specify which version of the MPM packages should be deployed.
With Sisyphus, the rollout process can be as simple or complicated as necessary. For
example, it can update all the associated jobs immediately or it can roll out a new
binary to successive clusters over a period of several hours.
Our goal is to fit the deployment process to the risk profile of a given service. In
development or pre-production environments, we may build hourly and push relea‐
ses automatically when all tests pass. For large user-facing services, we may push by
starting in one cluster and expand exponentially until all clusters are updated. For
sensitive pieces of infrastructure, we may extend the rollout over several days, inter‐
leaving them across instances in different geographic regions.
Configuration Management
Configuration management is one area of particularly close collaboration between
release engineers and SREs. Although configuration management may initially seem
a deceptively simple problem, configuration changes are a potential source of insta‐
bility. As a result, our approach to releasing and managing system and service config‐
urations has evolved substantially over time. Today we use several models for
distributing configuration files, as described in the following paragraphs. All schemes
involve storing configuration in our primary source code repository and enforcing a
strict code review requirement.
Use the mainline for configuration. This was the first method used to configure serv‐
ices in Borg (and the systems that pre-dated Borg). Using this scheme, developers and
SREs modify configuration files at the head of the main branch. The changes are
reviewed and then applied to the running system. As a result, binary releases and
configuration changes are decoupled. While conceptually and procedurally simple,
Configuration Management | 93

---

## [Sección 73] CHAPTER 8

-- 119 of 550 --

this technique often leads to skew between the checked-in version of the configura‐
tion files and the running version of the configuration file because jobs must be upda‐
ted in order to pick up the changes.
Include configuration files and binaries in the same MPM package. For projects with
few configuration files or projects where the files (or a subset of files) change with
each release cycle, the configuration files can be included in the MPM package with
the binaries. While this strategy limits flexibility by binding the binary and configura‐
tion files tightly, it simplifies deployment, because it only requires installing one
package.
Package configuration files into MPM “configuration packages.” We can apply the her‐
metic principle to configuration management. Binary configurations tend to be
tightly bound to particular versions of binaries, so we leverage the build and packag‐
ing systems to snapshot and release configuration files alongside their binaries. Simi‐
lar to our treatment of binaries, we can use the build ID to reconstruct the
configuration at a specific point in time.
For example, a change that implements a new feature can be released with a flag set‐
ting that configures that feature. By generating two MPM packages, one for the
binary and one for the configuration, we retain the ability to change each package
independently. That is, if the feature was released with a flag setting of first_folio
but we realize it should instead be bad_quarto, we can cherry pick that change onto
the release branch, rebuild the configuration package, and deploy it. This approach
has the advantage of not requiring a new binary build.
We can leverage MPM’s labeling feature to indicate which versions of MPM packages
should be installed together. A label of much_ado can be applied to the MPM packages
described in the previous paragraph, which allows us to fetch both packages using
this label. When a new version of the project is built, the much_ado label will be
applied to the new packages. Because these tags are unique within the namespace for
an MPM package, only the latest package with that tag will be used.
Read configuration files from an external store. Some projects have configuration files
that need to change frequently or dynamically (i.e., while the binary is running).
These files can be stored in Chubby, Bigtable, or our source-based filesystem
[Kem11].
In summary, project owners consider the different options for distributing and man‐
aging configuration files and decide which works best on a case-by-case basis.
94 | Chapter 8: Release Engineering

-- 120 of 550 --

Conclusions
While this chapter has specifically discussed Google’s approach to release engineering
and the ways in which release engineers work and collaborate with SREs, these practi‐
ces can also be applied more widely.
It’s Not Just for Googlers
When equipped with the right tools, proper automation, and well-defined policies,
developers and SREs shouldn’t have to worry about releasing software. Releases can
be as painless as simply pressing a button.
Most companies deal with the same set of release engineering problems regardless of
their size or the tools they use: How should you handle versioning of your packages?
Should you use a continuous build and deploy model, or perform periodic builds?
How often should you release? What configuration management policies should you
use? What release metrics are of interest?
Google Release Engineers have developed our own tools out of necessity because
open sourced or vendor-supplied tools don’t work at the scale we require. Custom
tools allow us to include functionality to support (and even enforce) release process
policies. However, these policies must first be defined in order to add appropriate fea‐
tures to our tools, and all companies should take the effort to define their release pro‐
cesses whether or not the processes can be automated and/or enforced.
Start Release Engineering at the Beginning
Release engineering has often been an afterthought, and this way of thinking must
change as platforms and services continue to grow in size and complexity.
Teams should budget for release engineering resources at the beginning of the prod‐
uct development cycle. It’s cheaper to put good practices and process in place early,
rather than have to retrofit your system later.
It is essential that the developers, SREs, and release engineers work together. The
release engineer needs to understand the intention of how the code should be built
and deployed. The developers shouldn’t build and “throw the results over the fence”
to be handled by the release engineers.
Individual project teams decide when release engineering becomes involved in a
project. Because release engineering is still a relatively young discipline, managers
don’t always plan and budget for release engineering in the early stages of a project.
Therefore, when considering how to incorporate release engineering practices, be
sure that you consider its role as applied to the entire lifecycle of your product or ser‐
vice—particularly the early stages.
Conclusions | 95

---

## [Sección 74] CHAPTER 8

-- 121 of 550 --

More Information
For more information on release engineering, see the following presentations, each of
which has video available online:
• How Embracing Continuous Release Reduced Change Complexity, USENIX
Release Engineering Summit West 2014, [Dic14]
• Maintaining Consistency in a Massively Parallel Environment, USENIX Configura‐
tion Management Summit 2013, [McN13]
• The 10 Commandments of Release Engineering, 2nd International Workshop on
Release Engineering 2014, [McN14b]
• Distributing Software in a Massively Parallel Environment, LISA 2014, [McN14c]
96 | Chapter 8: Release Engineering

-- 122 of 550 --

1 This is often true of complex systems in general; see [Per99] and [Coo00].
2 Coined by my former manager, Johan Anderson, around the time I became an SRE.

---

## [Sección 75] CHAPTER 9

Simplicity
Written by Max Luebbe
Edited by Tim Harvey
The price of reliability is the pursuit of the utmost simplicity.
—C.A.R. Hoare, Turing Award lecture
Software systems are inherently dynamic and unstable.1 A software system can only
be perfectly stable if it exists in a vacuum. If we stop changing the codebase, we stop
introducing bugs. If the underlying hardware or libraries never change, neither of
these components will introduce bugs. If we freeze the current user base, we’ll never
have to scale the system. In fact, a good summary of the SRE approach to managing
systems is: “At the end of the day, our job is to keep agility and stability in balance in
the system.”2
System Stability Versus Agility
It sometimes makes sense to sacrifice stability for the sake of agility. I’ve often
approached an unfamiliar problem domain by conducting what I call exploratory
coding—setting an explicit shelf life for whatever code I write with the understanding
that I’ll need to try and fail once in order to really understand the task I need to
accomplish. Code that comes with an expiration date can be much more liberal with
test coverage and release management because it will never be shipped to production
or be seen by users.
-- 123 of 550 --

For the majority of production software systems, we want a balanced mix of stability
and agility. SREs work to create procedures, practices, and tools that render software
more reliable. At the same time, SREs ensure that this work has as little impact on
developer agility as possible. In fact, SRE’s experience has found that reliable pro‐
cesses tend to actually increase developer agility: rapid, reliable production rollouts
make changes in production easier to see. As a result, once a bug surfaces, it takes less
time to find and fix that bug. Building reliability into development allows developers
to focus their attention on what we really do care about—the functionality and per‐
formance of their software and systems.
The Virtue of Boring
Unlike just about everything else in life, “boring” is actually a positive attribute when
it comes to software! We don’t want our programs to be spontaneous and interesting;
we want them to stick to the script and predictably accomplish their business goals.
In the words of Google engineer Robert Muth, “Unlike a detective story, the lack of
excitement, suspense, and puzzles is actually a desirable property of source code.”
Surprises in production are the nemeses of SRE.
As Fred Brooks suggests in his “No Silver Bullet” essay [Bro95], it is very important to
consider the difference between essential complexity and accidental complexity.
Essential complexity is the complexity inherent in a given situation that cannot be
removed from a problem definition, whereas accidental complexity is more fluid and
can be resolved with engineering effort. For example, writing a web server entails
dealing with the essential complexity of serving web pages quickly. However, if we
write a web server in Java, we may introduce accidental complexity when trying to
minimize the performance impact of garbage collection.
With an eye towards minimizing accidental complexity, SRE teams should:
• Push back when accidental complexity is introduced into the systems for which
they are responsible
• Constantly strive to eliminate complexity in systems they onboard and for which
they assume operational responsibility
I Won’t Give Up My Code!
Because engineers are human beings who often form an emotional attachment to
their creations, confrontations over large-scale purges of the source tree are not
uncommon. Some might protest, “What if we need that code later?” “Why don’t we
just comment the code out so we can easily add it again later?” or “Why don’t we gate
the code with a flag instead of deleting it?” These are all terrible suggestions. Source
98 | Chapter 9: Simplicity

-- 124 of 550 --

control systems make it easy to reverse changes, whereas hundreds of lines of com‐
mented code create distractions and confusion (especially as the source files continue
to evolve), and code that is never executed, gated by a flag that is always disabled, is a
metaphorical time bomb waiting to explode, as painfully experienced by Knight Cap‐
ital, for example (see “Order In the Matter of Knight Capital Americas LLC” [Sec13]).
At the risk of sounding extreme, when you consider a web service that’s expected to
be available 24/7, to some extent, every new line of code written is a liability. SRE pro‐
motes practices that make it more likely that all code has an essential purpose, such as
scrutinizing code to make sure that it actually drives business goals, routinely remov‐
ing dead code, and building bloat detection into all levels of testing.
The “Negative Lines of Code” Metric
The term “software bloat” was coined to describe the tendency of software to become
slower and bigger over time as a result of a constant stream of additional features.
While bloated software seems intuitively undesirable, its negative aspects become
even more clear when considered from the SRE perspective: every line of code
changed or added to a project creates the potential for introducing new defects and
bugs. A smaller project is easier to understand, easier to test, and frequently has fewer
defects. Bearing this perspective in mind, we should perhaps entertain reservations
when we have the urge to add new features to a project. Some of the most satisfying
coding I’ve ever done was deleting thousands of lines of code at a time when it was no
longer useful.
Minimal APIs
French poet Antoine de Saint Exupery wrote, “perfection is finally attained not when
there is no longer more to add, but when there is no longer anything to take away”
[Sai39]. This principle is also applicable to the design and construction of software.
APIs are a particularly clear expression of why this rule should be followed.
Writing clear, minimal APIs is an essential aspect of managing simplicity in a soft‐
ware system. The fewer methods and arguments we provide to consumers of the API,
the easier that API will be to understand, and the more effort we can devote to mak‐
ing those methods as good as they can possibly be. Again, a recurring theme appears:
the conscious decision to not take on certain problems allows us to focus on our core
problem and make the solutions we explicitly set out to create substantially better. In
software, less is more! A small, simple API is usually also a hallmark of a wellunderstood problem.
The “Negative Lines of Code” Metric | 99

---

## [Sección 76] CHAPTER 9

-- 125 of 550 --

3 Protocol buffers, also referred to as “protobufs,” are a language-neutral, platform-neutral extensible mecha‐
nism for serializing structured data. For more details, see https://developers.google.com/protocol-buffers/docs/
overview#a-bit-of-history.
Modularity
Expanding outward from APIs and single binaries, many of the rules of thumb that
apply to object-oriented programming also apply to the design of distributed systems.
The ability to make changes to parts of the system in isolation is essential to creating
a supportable system. Specifically, loose coupling between binaries, or between binar‐
ies and configuration, is a simplicity pattern that simultaneously promotes developer
agility and system stability. If a bug is discovered in one program that is a component
of a larger system, that bug can be fixed and pushed to production independent of the
rest of the system.
While the modularity that APIs offer may seem straightforward, it is not so apparent
that the notion of modularity also extends to how changes to APIs are introduced.
Just a single change to an API can force developers to rebuild their entire system and
run the risk of introducing new bugs. Versioning APIs allows developers to continue
to use the version that their system depends upon while they upgrade to a newer ver‐
sion in a safe and considered way. The release cadence can vary throughout a system,
instead of requiring a full production push of the entire system every time a feature is
added or improved.
As a system grows more complex, the separation of responsibility between APIs and
between binaries becomes increasingly important. This is a direct analogy to objectoriented class design: just as it is understood that it is poor practice to write a “grab
bag” class that contains unrelated functions, it is also poor practice to create and put
into production a “util” or “misc” binary. A well-designed distributed system consists
of collaborators, each of which has a clear and well-scoped purpose.
The concept of modularity also applies to data formats. One of the central strengths
and design goals of Google’s protocol buffers3 was to create a wire format that was
backward and forward compatible.
Release Simplicity
Simple releases are generally better than complicated releases. It is much easier to
measure and understand the impact of a single change rather than a batch of changes
released simultaneously. If we release 100 unrelated changes to a system at the same
time and performance gets worse, understanding which changes impacted perfor‐
mance, and how they did so, will take considerable effort or additional instrumenta‐
tion. If the release is performed in smaller batches, we can move faster with more
100 | Chapter 9: Simplicity

-- 126 of 550 --

confidence because each code change can be understood in isolation in the larger sys‐
tem. This approach to releases can be compared to gradient descent in machine
learning, in which we find an optimum solution by taking small steps at a time, and
considering if each change results in an improvement or degradation.
A Simple Conclusion
This chapter has repeated one theme over and over: software simplicity is a prerequi‐
site to reliability. We are not being lazy when we consider how we might simplify each
step of a given task. Instead, we are clarifying what it is we actually want to accom‐
plish and how we might most easily do so. Every time we say “no” to a feature, we are
not restricting innovation; we are keeping the environment uncluttered of distrac‐
tions so that focus remains squarely on innovation, and real engineering can proceed.
A Simple Conclusion | 101

-- 127 of 550 --

-- 128 of 550 --

1 Mikey left Google in summer 2014 to become the first administrator of the US Digital Service (https://
www.whitehouse.gov/digital/united-states-digital-service), an agency intended (in part) to bring SRE principles
and practices to the US government’s IT systems.

---

## [Sección 77] PART III

Practices
Put simply, SREs run services—a set of related systems, operated for users, who may
be internal or external—and are ultimately responsible for the health of these serv‐
ices. Successfully operating a service entails a wide range of activities: developing
monitoring systems, planning capacity, responding to incidents, ensuring the root
causes of outages are addressed, and so on. This section addresses the theory and
practice of an SRE’s day-to-day activity: building and operating large distributed
computing systems.
We can characterize the health of a service—in much the same way that Abraham
Maslow categorized human needs [Mas43]—from the most basic requirements
needed for a system to function as a service at all to the higher levels of function—
permitting self-actualization and taking active control of the direction of the service
rather than reactively fighting fires. This understanding is so fundamental to how we
evaluate services at Google that it wasn’t explicitly developed until a number of Goo‐
gle SREs, including our former colleague Mikey Dickerson,1 temporarily joined the
radically different culture of the United States government to help with the launch of
healthcare.gov in late 2013 and early 2014: they needed a way to explain how to
increase systems’ reliability.
We’ll use this hierarchy, illustrated in Figure III-1, to look at the elements that go into
making a service reliable, from most basic to most advanced.

-- 129 of 550 --

Figure III-1. Service Reliability Hierarchy
Monitoring
Without monitoring, you have no way to tell whether the service is even working;
absent a thoughtfully designed monitoring infrastructure, you’re flying blind. Maybe
everyone who tries to use the website gets an error, maybe not—but you want to be
aware of problems before your users notice them. We discuss tools and philosophy in

---

## [Sección 78] Chapter 10, Practical Alerting from Time-Series Data.

Incident Response
SREs don’t go on-call merely for the sake of it: rather, on-call support is a tool we use
to achieve our larger mission and remain in touch with how distributed computing
systems actually work (and fail!). If we could find a way to relieve ourselves of carry‐
ing a pager, we would. In Chapter 11, Being On-Call, we explain how we balance oncall duties with our other responsibilities.
Once you’re aware that there is a problem, how do you make it go away? That doesn’t
necessarily mean fixing it once and for all—maybe you can stop the bleeding by
reducing the system’s precision or turning off some features temporarily, allowing it
to gracefully degrade, or maybe you can direct traffic to another instance of the ser‐
vice that’s working properly. The details of the solution you choose to implement are
necessarily specific to your service and your organization. Responding effectively to
incidents, however, is something applicable to all teams.

-- 130 of 550 --

Figuring out what’s wrong is the first step; we offer a structured approach in Chap‐
ter 12, Effective Troubleshooting.
During an incident, it’s often tempting to give in to adrenalin and start responding ad
hoc. We advise against this temptation in Chapter 13, Emergency Response, and coun‐
sel in Chapter 14, Managing Incidents, that managing incidents effectively should
reduce their impact and limit outage-induced anxiety.
Postmortem and Root-Cause Analysis
We aim to be alerted on and manually solve only new and exciting problems presen‐
ted by our service; it’s woefully boring to “fix” the same issue over and over. In fact,
this mindset is one of the key differentiators between the SRE philosophy and some
more traditional operations-focused environments. This theme is explored in two
chapters.
Building a blameless postmortem culture is the first step in understanding what went
wrong (and what went right!), as described in Chapter 15, Postmortem Culture:
Learning from Failure.
Related to that discussion, in Chapter 16, Tracking Outages, we briefly describe an
internal tool, the outage tracker, that allows SRE teams to keep track of recent pro‐
duction incidents, their causes, and actions taken in response to them.
Testing
Once we understand what tends to go wrong, our next step is attempting to prevent
it, because an ounce of prevention is worth a pound of cure. Test suites offer some
assurance that our software isn’t making certain classes of errors before it’s released to
production; we talk about how best to use these in Chapter 17, Testing for Reliability.
Capacity Planning
In Chapter 18, Software Engineering in SRE, we offer a case study of software engi‐
neering in SRE with Auxon, a tool for automating capacity planning.
Naturally following capacity planning, load balancing ensures we’re properly using
the capacity we’ve built. We discuss how requests to our services get sent to datacen‐
ters in Chapter 19, Load Balancing at the Frontend. Then we continue the discussion
in Chapter 20, Load Balancing in the Datacenter and Chapter 21, Handling Overload,
both of which are essential for ensuring service reliability.
Finally, in Chapter 22, Addressing Cascading Failures, we offer advice for addressing
cascading failures, both in system design and should your service be caught in a cas‐
cading failure.

-- 131 of 550 --

Development
One of the key aspects of Google’s approach to Site Reliability Engineering is that we
do significant large-scale system design and software engineering work within the
organization.
In Chapter 23, Managing Critical State: Distributed Consensus for Reliability, we
explain distributed consensus, which (in the guise of Paxos) is at the core of many of
Google’s distributed systems, including our globally distributed Cron system. In

---

## [Sección 79] Chapter 24, Distributed Periodic Scheduling with Cron, we outline a system that scales

to whole datacenters and beyond, which is no easy task.

---

## [Sección 80] Chapter 25, Data Processing Pipelines, discusses the various forms that data process‐

ing pipelines can take: from one-shot MapReduce jobs running periodically to sys‐
tems that operate in near real-time. Different architectures can lead to surprising and
counterintuitive challenges.
Making sure that the data you stored is still there when you want to read it is the
heart of data integrity; in Chapter 26, Data Integrity: What You Read Is What You
Wrote, we explain how to keep data safe.
Product
Finally, having made our way up the reliability pyramid, we find ourselves at the
point of having a workable product. In Chapter 27, Reliable Product Launches at Scale,
we write about how Google does reliable product launches at scale to try to give users
the best possible experience starting from Day Zero.
Further Reading from Google SRE
As discussed previously, testing is subtle, and its improper execution can have large
effects on overall stability. In an ACM article [Kri12], we explain how Google per‐
forms company-wide resilience testing to ensure we’re capable of weathering the
unexpected should a zombie apocalypse or other disaster strike.
While it’s often thought of as a dark art, full of mystifying spreadsheets divining the
future, capacity planning is nonetheless vital, and as [Hix15a] shows, you don’t
actually need a crystal ball to do it right.
Finally, an interesting and new approach to corporate network security is detailed in
[War14], an initiative to replace privileged intranets with device and user credentials.
Driven by SREs at the infrastructure level, this is definitely an approach to keep in
mind when you’re creating your next network.

-- 132 of 550 --

---

## [Sección 81] CHAPTER 10

Practical Alerting from Time-Series Data
Written by Jamie Wilkinson
Edited by Kavita Guliani
May the queries flow, and the pager stay silent.
—Traditional SRE blessing
Monitoring, the bottom layer of the Hierarchy of Production Needs, is fundamental to
running a stable service. Monitoring enables service owners to make rational deci‐
sions about the impact of changes to the service, apply the scientific method to inci‐
dent response, and of course ensure their reason for existence: to measure the
service’s alignment with business goals (see Chapter 6).
Regardless of whether or not a service enjoys SRE support, it should be run in a sym‐
biotic relationship with its monitoring. But having been tasked with ultimate respon‐
sibility for Google Production, SREs develop a particularly intimate knowledge of the
monitoring infrastructure that supports their service.
Monitoring a very large system is challenging for a couple of reasons:
• The sheer number of components being analyzed
• The need to maintain a reasonably low maintenance burden on the engineers
responsible for the system
Google’s monitoring systems don’t just measure simple metrics, such as the average
response time of an unladen European web server; we also need to understand the
distribution of those response times across all web servers in that region. This knowl‐
edge enables us to identify the factors contributing to the latency tail.
-- 133 of 550 --

1 Prometheus is an open source monitoring and time-series database system available at http://prometheus.io.
At the scale our systems operate, being alerted for single-machine failures is unac‐
ceptable because such data is too noisy to be actionable. Instead we try to build sys‐
tems that are robust against failures in the systems they depend on. Rather than
requiring management of many individual components, a large system should be
designed to aggregate signals and prune outliers. We need monitoring systems that
allow us to alert for high-level service objectives, but retain the granularity to inspect
individual components as needed.
Google’s monitoring systems evolved over the course of 10 years from the traditional
model of custom scripts that check responses and alert, wholly separated from visual
display of trends, to a new paradigm. This new model made the collection of timeseries a first-class role of the monitoring system, and replaced those check scripts
with a rich language for manipulating time-series into charts and alerts.
The Rise of Borgmon
Shortly after the job scheduling infrastructure Borg [Ver15] was created in 2003, a
new monitoring system—Borgmon—was built to complement it.
Time-Series Monitoring Outside of Google
This chapter describes the architecture and programming interface of an internal
monitoring tool that was foundational for the growth and reliability of Google for
almost 10 years…but how does that help you, our dear reader?
In recent years, monitoring has undergone a Cambrian Explosion: Riemann, Heka,
Bosun, and Prometheus have emerged as open source tools that are very similar to
Borgmon’s time-series–based alerting. In particular, Prometheus1 shares many simi‐
larities with Borgmon, especially when you compare the two rule languages. The
principles of variable collection and rule evaluation remain the same across all these
tools and provide an environment with which you can experiment, and hopefully
launch into production, the ideas inspired by this chapter.
Instead of executing custom scripts to detect system failures, Borgmon relies on a
common data exposition format; this enables mass data collection with low over‐
heads and avoids the costs of subprocess execution and network connection setup.
We call this white-box monitoring (see Chapter 6 for a comparison of white-box and
black-box monitoring).
108 | Chapter 10: Practical Alerting from Time-Series Data

-- 134 of 550 --

2 Google was born in the USA, so we pronounce this “var-zee.”
3 The plural of Borgmon is Borgmon, like sheep.
The data is used both for rendering charts and creating alerts, which are accom‐
plished using simple arithmetic. Because collection is no longer in a short-lived pro‐
cess, the history of the collected data can be used for that alert computation as well.
These features help to meet the goal of simplicity described in Chapter 6. They allow
the system overhead to be kept low so that the people running the services can
remain agile and respond to continuous change in the system as it grows.
To facilitate mass collection, the metrics format had to be standardized. An older
method of exporting the internal state (known as varz)2 was formalized to allow the
collection of all metrics from a single target in one HTTP fetch. For example, to view
a page of metrics manually, you could use the following command:
% curl http://webserver:80/varz
http_requests 37
errors_total 12
A Borgmon can collect from other Borgmon,3 so we can build hierarchies that follow
the topology of the service, aggregating and summarizing information and discarding
some strategically at each level. Typically, a team runs a single Borgmon per cluster,
and a pair at the global level. Some very large services shard below the cluster level
into many scraper Borgmon, which in turn feed to the cluster-level Borgmon.
Instrumentation of Applications
The /varz HTTP handler simply lists all the exported variables in plain text, as spaceseparated keys and values, one per line. A later extension added a mapped variable,
which allows the exporter to define several labels on a variable name, and then export
a table of values or a histogram. An example map-valued variable looks like the fol‐
lowing, showing 25 HTTP 200 responses and 12 HTTP 500s:
http_responses map:code 200:25 404:0 500:12
Adding a metric to a program only requires a single declaration in the code where the
metric is needed.
In hindsight, it’s apparent that this schemaless textual interface makes the barrier to
adding new instrumentation very low, which is a positive for both the software engi‐
neering and SRE teams. However, this has a trade-off against ongoing maintenance;
the decoupling of the variable definition from its use in Borgmon rules requires care‐
Instrumentation of Applications | 109

---

## [Sección 82] CHAPTER 10

-- 135 of 550 --

4 Many non-SRE teams use a generator to stamp out the initial boilerplate and ongoing updates, and find the
generator much easier to use (though less powerful) than directly editing the rules.
5 Many other applications use their service protocol to export their internal state, as well. OpenLDAP exports it
through the cn=Monitor subtree; MySQL can report state with a SHOW VARIABLES query; Apache has its
mod_status handler.
6 https://golang.org/pkg/expvar/
7 The Borg Name System (BNS) is described in Chapter 2.
ful change management. In practice, this trade-off has been satisfactory because tools
to validate and generate rules have been written as well.4
Exporting Variables
Google’s web roots run deep: each of the major languages used at Google has an
implementation of the exported variable interface that automagically registers with
the HTTP server built into every Google binary by default.5 The instances of the vari‐
able to be exported allow the server author to perform obvious operations like adding
an amount to the current value, setting a key to a specific value, and so forth. The Go
expvar library6 and its JSON output form have a variant of this API.
Collection of Exported Data
To find its targets, a Borgmon instance is configured with a list of targets using one of
many name resolution methods.7 The target list is often dynamic, so using service
discovery reduces the cost of maintaining it and allows the monitoring to scale.
At predefined intervals, Borgmon fetches the /varz URI on each target, decodes the
results, and stores the values in memory. Borgmon also spreads the collection from
each instance in the target list over the whole interval, so that collection from each
target is not in lockstep with its peers.
Borgmon also records “synthetic” variables for each target in order to identify:
• If the name was resolved to a host and port
• If the target responded to a collection
• If the target responded to a health check
• What time the collection finished
These synthetic variables make it easy to write rules to detect if the monitored tasks
are unavailable.
110 | Chapter 10: Practical Alerting from Time-Series Data

-- 136 of 550 --

8 Recall in Chapter 6 the distinction between alerting on symptoms and on causes.
It’s interesting that varz is quite dissimilar to SNMP (Simple Networking Monitoring
Protocol), which “is designed […] to have minimal transport requirements and to
continue working when most other network applications fail” [Mic03]. Scraping tar‐
gets over HTTP seems to be at odds with this design principle; however, experience
shows that this is rarely an issue.8 The system itself is already designed to be robust
against network and machine failures, and Borgmon allows engineers to write
smarter alerting rules by using the collection failure itself as a signal.
Storage in the Time-Series Arena
A service is typically made up of many binaries running as many tasks, on many
machines, in many clusters. Borgmon needs to keep all that data organized, while
allowing flexible querying and slicing of that data.
Borgmon stores all the data in an in-memory database, regularly checkpointed to
disk. The data points have the form (timestamp, value), and are stored in chrono‐
logical lists called time-series, and each time-series is named by a unique set of labels,
of the form name=value.
As presented in Figure 10-1, a time-series is conceptually a one-dimensional matrix
of numbers, progressing through time. As you add permutations of labels to this
time-series, the matrix becomes multidimensional.
Figure 10-1. A time-series for errors labeled by the original host each was collected from
In practice, the structure is a fixed-sized block of memory, known as the time-series
arena, with a garbage collector that expires the oldest entries once the arena is full.
The time interval between the most recent and oldest entries in the arena is the hori‐
zon, which indicates how much queryable data is kept in RAM. Typically, datacenter
Storage in the Time-Series Arena | 111

---

## [Sección 83] CHAPTER 10

-- 137 of 550 --

9 This 12-hour horizon is a magic number that aims to have enough information for debugging an incident in
RAM for fast queries without costing too much RAM.
and global Borgmon are sized to hold about 12 hours of data9 for rendering consoles,
and much less time if they are the lowest-level collector shards. The memory require‐
ment for a single data point is about 24 bytes, so we can fit 1 million unique timeseries for 12 hours at 1-minute intervals in under 17 GB of RAM.
Periodically, the in-memory state is archived to an external system known as the
Time-Series Database (TSDB). Borgmon can query TSDB for older data and, while
slower, TSDB is cheaper and larger than a Borgmon’s RAM.
Labels and Vectors
As shown in the example time-series in Figure 10-2, time-series are stored as sequen‐
ces of numbers and timestamps, which are referred to as vectors. Like vectors in linear
algebra, these vectors are slices and cross-sections of the multidimensional matrix of
data points in the arena. Conceptually the timestamps can be ignored, because the
values are inserted in the vector at regular intervals in time—for example, 1 or 10 sec‐
onds or 1 minute apart.
Figure 10-2. An example time-series
The name of a time-series is a labelset, because it’s implemented as a set of labels
expressed as key=value pairs. One of these labels is the variable name itself, the key
that appears on the varz page.
A few label names are declared as important. For the time-series in the time-series
database to be identifiable, it must at minimum have the following labels:
var
The name of the variable
job
The name given to the type of server being monitored
service
A loosely defined collection of jobs that provide a service to users, either internal
or external
112 | Chapter 10: Practical Alerting from Time-Series Data

-- 138 of 550 --

10 The service and zone labels are elided here for space, but are present in the returned expression.
zone
A Google convention that refers to the location (typically the datacenter) of the
Borgmon that performed the collection of this variable
Together, these variables appear something like the following, called the variable
expression:
{var=http_requests,job=webserver,instance=host0:80,service=web,zone=us-west}
A query for a time-series does not require specification of all these labels, and a
search for a labelset returns all matching time-series in a vector. So we could return a
vector of results by removing the instance label in the preceding query, if there were
more than one instance in the cluster. For example:
{var=http_requests,job=webserver,service=web,zone=us-west}
might have a result of five rows in a vector, with the most recent value in the timeseries like so:
{var=http_requests,job=webserver,instance=host0:80,service=web,zone=us-west} 10
{var=http_requests,job=webserver,instance=host1:80,service=web,zone=us-west} 9
{var=http_requests,job=webserver,instance=host2:80,service=web,zone=us-west} 11
{var=http_requests,job=webserver,instance=host3:80,service=web,zone=us-west} 0
{var=http_requests,job=webserver,instance=host4:80,service=web,zone=us-west} 10
Labels can be added to a time-series from:
• The target’s name, e.g., the job and instance
• The target itself, e.g., via map-valued variables
• The Borgmon configuration, e.g., annotations about location or relabeling
• The Borgmon rules being evaluated
We can also query time-series in time, by specifying a duration to the variable expres‐
sion:
{var=http_requests,job=webserver,service=web,zone=us-west}[10m]
This returns the last 10 minutes of history of the time-series that matched the expres‐
sion. If we were collecting data points once per minute, we would expect to return 10
data points in a 10-minute window, like so:10
{var=http_requests,job=webserver,instance=host0:80, ...} 0 1 2 3 4 5 6 7 8 9 10
{var=http_requests,job=webserver,instance=host1:80, ...} 0 1 2 3 4 4 5 6 7 8 9
{var=http_requests,job=webserver,instance=host2:80, ...} 0 1 2 3 5 6 7 8 9 9 11
{var=http_requests,job=webserver,instance=host3:80, ...} 0 0 0 0 0 0 0 0 0 0 0
{var=http_requests,job=webserver,instance=host4:80, ...} 0 1 2 3 4 5 6 7 8 9 10
Storage in the Time-Series Arena | 113

---

## [Sección 84] CHAPTER 10

-- 139 of 550 --

11 Computing the sum of rates instead of the rate of sums defends the result against counter resets or missing
data, perhaps due to a task restart or failed collection of data.
12 Despite being untyped, the majority of varz are simple counters. Borgmon’s rate function handles all the cor‐
ner cases of counter resets.
Rule Evaluation
Borgmon is really just a programmable calculator, with some syntactic sugar that ena‐
bles it to generate alerts. The data collection and storage components already
described are just necessary evils to make that programmable calculator ultimately fit
for purpose here as a monitoring system. :)
Centralizing the rule evaluation in a monitoring system, rather
than delegating it to forked subprocesses, means that computations
can run in parallel against many similar targets. This practice keeps
the configuration relatively small in size (for example, by removing
duplication of code) yet more powerful through its expressiveness.
The Borgmon program code, also known as Borgmon rules, consists of simple alge‐
braic expressions that compute time-series from other time-series. These rules can be
quite powerful because they can query the history of a single time-series (i.e., the time
axis), query different subsets of labels from many time-series at once (i.e., the space
axis), and apply many mathematical operations.
Rules run in a parallel threadpool where possible, but are dependent on ordering
when using previously defined rules as input. The size of the vectors returned by their
query expressions also determines the overall runtime of a rule. Thus, it is typically
the case that one can add CPU resources to a Borgmon task in response to it running
slow. To assist more detailed analysis, internal metrics on the runtime of rules are
exported for performance debugging and for monitoring the monitoring.
Aggregation is the cornerstone of rule evaluation in a distributed environment.
Aggregation entails taking the sum of a set of time-series from the tasks in a job in
order to treat the job as a whole. From those sums, overall rates can be computed. For
example, the total queries-per-second rate of a job in a datacenter is the sum of all the
rates of change11 of all the query counters.12
114 | Chapter 10: Practical Alerting from Time-Series Data

-- 140 of 550 --

A counter is any nonmonotonically decreasing variable—which is
to say, counters only increase in value. Gauges, on the other hand,
may take any value they like. Counters measure increasing values,
such as the total number of kilometers driven, while gauges show
current state, such as the amount of fuel remaining or current
speed. When collecting Borgmon-style data, it’s better to use coun‐
ters, because they don’t lose meaning when events occur between
sampling intervals. Should any activity or changes occur between
sampling intervals, a gauge collection is likely to miss that activity.
For an example web server, we might want to alert when our web server cluster starts
to serve more errors as a percent of requests than we think is normal—or more tech‐
nically, when the sum of the rates of non-HTTP-200 return codes on all tasks in the
cluster, divided by the sum of the rates of requests to all tasks in that cluster, is greater
than some value.
This is accomplished by:
1. Aggregating the rates of response codes across all tasks, outputting a vector of
rates at that point in time, one for each code.
2. Computing the total error rate as the sum of that vector, outputting a single value
for the cluster at that point in time. This total error rate excludes the 200 code
from the sum, because it is not an error.
3. Computing the cluster-wide ratio of errors to requests, dividing the total error
rate by the rate of requests that arrived, and again outputting a single value for
the cluster at that point in time.
Each of these outputs at a point in time gets appended to its named variable expres‐
sion, which creates the new time-series. As a result, we will be able to inspect the his‐
tory of error rates and error ratios some other time.
The rate of requests rules would be written in Borgmon’s rule language as the
following:
rules <<<
# Compute the rate of requests for each task from the count of requests
{var=task:http_requests:rate10m,job=webserver} =
rate({var=http_requests,job=webserver}[10m]);
# Sum the rates to get the aggregate rate of queries for the cluster;
# ‘without instance’ instructs Borgmon to remove the instance label
# from the right hand side.
{var=dc:http_requests:rate10m,job=webserver} =
sum without instance({var=task:http_requests:rate10m,job=webserver})
>>>
Rule Evaluation | 115

---

## [Sección 85] CHAPTER 10

-- 141 of 550 --

13 The service and zone labels are elided for space.
The rate() function takes the enclosed expression and returns the total delta divided
by the total time between the earliest and latest values.
With the example time-series data from the query before, the results for the
task:http_requests:rate10m rule would look like:13
{var=task:http_requests:rate10m,job=webserver,instance=host0:80, ...} 1
{var=task:http_requests:rate10m,job=webserver,instance=host2:80, ...} 0.9
{var=task:http_requests:rate10m,job=webserver,instance=host3:80, ...} 1.1
{var=task:http_requests:rate10m,job=webserver,instance=host4:80, ...} 0
{var=task:http_requests:rate10m,job=webserver,instance=host5:80, ...} 1
and the results for the dc:http_requests:rate10m rule would be:
{var=dc:http_requests:rate10m,job=webserver,service=web,zone=us-west} 4
because the second rule uses the first one as input.
The instance label is missing in the output now, discarded by the
aggregation rule. If it had remained in the rule, then Borgmon
would not have been able to sum the five rows together.
In these examples, we use a time window because we’re dealing with discrete points in
the time-series, as opposed to continuous functions. Doing so makes the rate calcula‐
tion easier than performing calculus, but means that to compute a rate, we need to
select a sufficient number of data points. We also have to deal with the possibility that
some recent collections have failed. Recall that the historical variable expression nota‐
tion uses the range [10m] to avoid missing data points caused by collection errors.
The example also uses a Google convention that helps readability. Each computed
variable name contains a colon-separated triplet indicating the aggregation level,
the variable name, and the operation that created that name. In this example, the left‐
hand variables are “task HTTP requests 10-minute rate” and “datacenter HTTP
requests 10-minute rate.”
Now that we know how to create a rate of queries, we can build on that to also com‐
pute a rate of errors, and then we can calculate the ratio of responses to requests to
understand how much useful work the service is doing. We can compare the ratio
rate of errors to our service level objective (see Chapter 4) and alert if this objective is
missed or in danger of being missed:
116 | Chapter 10: Practical Alerting from Time-Series Data

-- 142 of 550 --

14 The service and zone labels are elided for space.
rules <<<
# Compute a rate pertask and per ‘code’ label
{var=task:http_responses:rate10m,job=webserver} =
rate by code({var=http_responses,job=webserver}[10m]);
# Compute a cluster level response rate per ‘code’ label
{var=dc:http_responses:rate10m,job=webserver} =
sum without instance({var=task:http_responses:rate10m,job=webserver});
# Compute a new cluster level rate summing all non 200 codes
{var=dc:http_errors:rate10m,job=webserver} = sum without code(
{var=dc:http_responses:rate10m,jobwebserver,code=!/200/};
# Compute the ratio of the rate of errors to the rate of requests
{var=dc:http_errors:ratio_rate10m,job=webserver} =
{var=dc:http_errors:rate10m,job=webserver}
/
{var=dc:http_requests:rate10m,job=webserver};
>>>
Again, this calculation demonstrates the convention of suffixing the new time-series
variable name with the operation that created it. This result is read as “datacenter
HTTP errors 10 minute ratio of rates.”
The output of these rules might look like:14
{var=task:http_responses:rate10m,job=webserver}
{var=task:http_responses:rate10m,job=webserver,code=200,instance=host0:80, ...} 1
{var=task:http_responses:rate10m,job=webserver,code=500,instance=host0:80, ...} 0
{var=task:http_responses:rate10m,job=webserver,code=200,instance=host1:80, ...} 0.5
{var=task:http_responses:rate10m,job=webserver,code=500,instance=host1:80, ...} 0.4
{var=task:http_responses:rate10m,job=webserver,code=200,instance=host2:80, ...} 1
{var=task:http_responses:rate10m,job=webserver,code=500,instance=host2:80, ...} 0.1
{var=task:http_responses:rate10m,job=webserver,code=200,instance=host3:80, ...} 0
{var=task:http_responses:rate10m,job=webserver,code=500,instance=host3:80, ...} 0
{var=task:http_responses:rate10m,job=webserver,code=200,instance=host4:80, ...} 0.9
{var=task:http_responses:rate10m,job=webserver,code=500,instance=host4:80, ...} 0.1
{var=dc:http_responses:rate10m,job=webserver}
{var=dc:http_responses:rate10m,job=webserver,code=200, ...} 3.4
{var=dc:http_responses:rate10m,job=webserver,code=500, ...} 0.6
{var=dc:http_responses:rate10m,jobwebserver,code=!/200/}
{var=dc:http_responses:rate10m,job=webserver,code=500, ...} 0.6
{var=dc:http_errors:rate10m,job=webserver}
{var=dc:http_errors:rate10m,job=webserver, ...} 0.6
Rule Evaluation | 117

---

## [Sección 86] CHAPTER 10

-- 143 of 550 --

{var=dc:http_errors:ratio_rate10m,job=webserver}
{var=dc:http_errors:ratio_rate10m,job=webserver} 0.15
The preceding output shows the intermediate query in the
dc:http_errors:rate10m rule that filters the non-200 error codes.
Though the value of the expressions are the same, observe that the
code label is retained in one but removed from the other.
As mentioned previously, Borgmon rules create new time-series, so the results of the
computations are kept in the time-series arena and can be inspected just as the source
time-series are. The ability to do so allows for ad hoc querying, evaluation, and explo‐
ration as tables or charts. This is a useful feature for debugging while on-call, and if
these ad hoc queries prove useful, they can be made permanent visualizations on a
service console.
Alerting
When an alerting rule is evaluated by a Borgmon, the result is either true, in which
case the alert is triggered, or false. Experience shows that alerts can “flap” (toggle their
state quickly); therefore, the rules allow a minimum duration for which the alerting
rule must be true before the alert is sent. Typically, this duration is set to at least two
rule evaluation cycles to ensure no missed collections cause a false alert.
The following example creates an alert when the error ratio over 10 minutes exceeds
1% and the total number of errors exceeds 1:
rules <<<
{var=dc:http_errors:ratio_rate10m,job=webserver} > 0.01
and by job, error
{var=dc:http_errors:rate10m,job=webserver} > 1
for 2m
=> ErrorRatioTooHigh
details "webserver error ratio at [[trigger_value]]"
labels {severity=page};
>>>
Our example holds the ratio rate at 0.15, which is well over the threshold of 0.01 in
the alerting rule. However, the number of errors is not greater than 1 at this moment,
so the alert won’t be active. Once the number of errors exceeds 1, the alert will go
pending for two minutes to ensure it isn’t a transient state, and only then will it fire.
The alert rule contains a small template for filling out a message containing contex‐
tual information: which job the alert is for, the name of the alert, the numerical value
of the triggering rule, and so on. The contextual information is filled out by Borgmon
when the alert fires and is sent in the Alert RPC.
118 | Chapter 10: Practical Alerting from Time-Series Data

-- 144 of 550 --

Borgmon is connected to a centrally run service, known as the Alertmanager, which
receives Alert RPCs when the rule first triggers, and then again when the alert is con‐
sidered to be “firing.” The Alertmanager is responsible for routing the alert notifica‐
tion to the correct destination. Alertmanager can be configured to do the following:
• Inhibit certain alerts when others are active
• Deduplicate alerts from multiple Borgmon that have the same labelsets
• Fan-in or fan-out alerts based on their labelsets when multiple alerts with similar
labelsets fire
As described in Chapter 6, teams send their page-worthy alerts to their on-call rota‐
tion and their important but subcritical alerts to their ticket queues. All other alerts
should be retained as informational data for status dashboards.
A more comprehensive guide to alert design can be found in Chapter 4.
Sharding the Monitoring Topology
A Borgmon can import time-series data from other Borgmon, as well. While one
could attempt to collect from all tasks in a service globally, doing so quickly becomes
a scaling bottleneck and introduces a single point of failure into the design. Instead, a
streaming protocol is used to transmit time-series data between Borgmon, saving
CPU time and network bytes compared to the text-based varz format. A typical such
deployment uses two or more global Borgmon for top-level aggregation and one
Borgmon in each datacenter to monitor all the jobs running at that location. (Google
divides the production network into zones for production changes, so having two or
more global replicas provides diversity in the face of maintenance and outages for
this otherwise single point of failure.)
As shown in Figure 10-3, more complicated deployments shard the datacenter Borg‐
mon further into a purely scraping-only layer (often due to RAM and CPU con‐
straints in a single Borgmon for very large services) and a DC aggregation layer that
performs mostly rule evaluation for aggregation. Sometimes the global layer is split
between rule evaluation and dashboarding. Upper-tier Borgmon can filter the data
they want to stream from the lower-tier Borgmon, so that the global Borgmon does
not fill its arena with all the per-task time-series from the lower tiers. Thus, the aggre‐
gation hierarchy builds local caches of relevant time-series that can be drilled down
into when required.
Sharding the Monitoring Topology | 119

---

## [Sección 87] CHAPTER 10

-- 145 of 550 --

Figure 10-3. A data flow model of a hierarchy of Borgmon in three clusters
Black-Box Monitoring
Borgmon is a white-box monitoring system—it inspects the internal state of the tar‐
get service, and the rules are written with knowledge of the internals in mind. The
transparent nature of this model provides great power to identify quickly what com‐
ponents are failing, which queues are full, and where bottlenecks occur, both when
responding to an incident and when testing a new feature deployment.
However, white-box monitoring does not provide a full picture of the system being
monitored; relying solely upon white-box monitoring means that you aren’t aware of
what the users see. You only see the queries that arrive at the target; the queries that
never make it due to a DNS error are invisible, while queries lost due to a server crash
never make a sound. You can only alert on the failures that you expected.
Teams at Google solve this coverage issue with Prober, which runs a protocol check
against a target and reports success or failure. The prober can send alerts directly to
Alertmanager, or its own varz can be collected by a Borgmon. Prober can validate the
response payload of the protocol (e.g., the HTML contents of an HTTP response) and
validate that the contents are expected, and even extract and export values as timeseries. Teams often use Prober to export histograms of response times by operation
type and payload size so that they can slice and dice the user-visible performance.
Prober is a hybrid of the check-and-test model with some richer variable extraction
to create time-series.
120 | Chapter 10: Practical Alerting from Time-Series Data

-- 146 of 550 --

Prober can be pointed at either the frontend domain or behind the load balancer. By
using both targets, we can detect localized failures and suppress alerts. For example,
we might monitor both the load balanced www.google.com and the web servers in
each datacenter behind the load balancer. This setup allows us to either know that
traffic is still served when a datacenter fails, or to quickly isolate an edge in the traffic
flow graph where a failure has occurred.
Maintaining the Configuration
Borgmon configuration separates the definition of the rules from the targets being
monitored. This means the same sets of rules can be applied to many targets at once,
instead of writing nearly identical configuration over and over. This separation of
concerns might seem incidental, but it greatly reduces the cost of maintaining the
monitoring by avoiding lots of repetition in describing the target systems.
Borgmon also supports language templates. This macro-like system enables engineers
to construct libraries of rules that can be reused. This functionality again reduces rep‐
etition, thus reducing the likelihood of bugs in the configuration.
Of course, any high-level programming environment creates the opportunity for
complexity, so Borgmon provides a way to build extensive unit and regression tests
by synthesizing time-series data, in order to ensure that the rules behave as the author
thinks they do. The Production Monitoring team runs a continuous integration ser‐
vice that executes a suite of these tests, packages the configuration, and ships the con‐
figuration to all the Borgmon in production, which then validate the configuration
before accepting it.
In the vast library of common templates that have been created, two classes of moni‐
toring configuration have emerged. The first class simply codifies the emergent
schema of variables exported from a given library of code, such that any user of the
library can reuse the template of its varz. Such templates exist for the HTTP server
library, memory allocation, the storage client library, and generic RPC services,
among others. (While the varz interface declares no schema, the rule library associ‐
ated with the code library ends up declaring a schema.)
The second class of library emerged as we built templates to manage the aggregation
of data from a single-server task to the global service footprint. These libraries con‐
tain generic aggregation rules for exported variables that engineers can use to model
the topology of their service.
Maintaining the Configuration | 121

---

## [Sección 88] CHAPTER 10

-- 147 of 550 --

For example, a service may provide a single global API, but be homed in many data‐
centers. Within each datacenter, the service is composed of several shards, and each
shard is composed of several jobs with various numbers of tasks. An engineer can
model this breakdown with Borgmon rules so that when debugging, subcomponents
can be isolated from the rest of the system. These groupings typically follow the
shared fate of components; e.g., individual tasks share fate due to configuration files,
jobs in a shard share fate because they’re homed in the same datacenter, and physical
sites share fate due to networking.
Labeling conventions make such division possible: a Borgmon adds labels indicating
the target’s instance name and the shard and datacenter it occupies, which can be
used to group and aggregate those time-series together.
Thus, we have multiple uses for labels on a time-series, though all are interchangea‐
ble:
• Labels that define breakdowns of the data itself (e.g., our HTTP response code on
the http_responses variable)
• Labels that define the source of the data (e.g., the instance or job name)
• Labels that indicate the locality or aggregation of the data within the service as a
whole (e.g., the zone label describing a physical location, a shard label describing
a logical grouping of tasks)
The templated nature of these libraries allows flexibility in their use. The same tem‐
plate can be used to aggregate from each tier.
Ten Years On…
Borgmon transposed the model of check-and-alert per target into mass variable col‐
lection and a centralized rule evaluation across the time-series for alerting and
diagnostics.
This decoupling allows the size of the system being monitored to scale independently
of the size of alerting rules. These rules cost less to maintain because they’re abstrac‐
ted over a common time-series format. New applications come ready with metric
exports in all components and libraries to which they link, and well-traveled aggrega‐
tion and console templates, which further reduces the burden of implementation.
Ensuring that the cost of maintenance scales sublinearly with the size of the service is
key to making monitoring (and all sustaining operations work) maintainable. This
theme recurs in all SRE work, as SREs work to scale all aspects of their work to the
global scale.
122 | Chapter 10: Practical Alerting from Time-Series Data

-- 148 of 550 --

Ten years is a long time, though, and of course today the shape of the monitoring
landscape within Google has evolved with experiments and changes, striving for con‐
tinual improvement as the company grows.
Even though Borgmon remains internal to Google, the idea of treating time-series
data as a data source for generating alerts is now accessible to everyone through those
open source tools like Prometheus, Riemann, Heka, and Bosun, and probably others
by the time you read this.
Ten Years On… | 123

-- 149 of 550 --

www.allitebooks.com

-- 150 of 550 --

1 An earlier version of this chapter appeared as an article in ;login: (October 2015, vol. 40, no. 5).

---

## [Sección 89] CHAPTER 11

Being On-Call
Written by Andrea Spadaccini1
Edited by Kavita Guliani
Being on-call is a critical duty that many operations and engineering teams must
undertake in order to keep their services reliable and available. However, there are
several pitfalls in the organization of on-call rotations and responsibilities that can
lead to serious consequences for the services and for the teams if not avoided. This
chapter describes the primary tenets of the approach to on-call that Google’s Site Reli‐
ability Engineers (SREs) have developed over years, and explains how that approach
has led to reliable services and sustainable workload over time.
Introduction
Several professions require employees to perform some sort of on-call duty, which
entails being available for calls during both working and nonworking hours. In the IT
context, on-call activities have historically been performed by dedicated Ops teams
tasked with the primary responsibility of keeping the service(s) for which they are
responsible in good health.
Many important services in Google, e.g., Search, Ads, and Gmail, have dedicated
teams of SREs responsible for the performance and reliability of these services. Thus,
SREs are on-call for the services they support. The SRE teams are quite different from
purely operational teams in that they place heavy emphasis on the use of engineering
to approach problems. These problems, which typically fall in the operational
domain, exist at a scale that would be intractable without software engineering
solutions.
-- 151 of 550 --

To enforce this type of problem solving, Google hires people with a diverse back‐
ground in systems and software engineering into SRE teams. We cap the amount of
time SREs spend on purely operational work at 50%; at minimum, 50% of an SRE’s
time should be allocated to engineering projects that further scale the impact of the
team through automation, in addition to improving the service.
Life of an On-Call Engineer
This section describes the typical activities of an on-call engineer and provides some
background for the rest of the chapter.
As the guardians of production systems, on-call engineers take care of their assigned
operations by managing outages that affect the team and performing and/or vetting
production changes.
When on-call, an engineer is available to perform operations on production systems
within minutes, according to the paging response times agreed to by the team and the
business system owners. Typical values are 5 minutes for user-facing or otherwise
highly time-critical services, and 30 minutes for less time-sensitive systems. The com‐
pany provides the page-receiving device, which is typically a phone. Google has flexi‐
ble alert delivery systems that can dispatch pages via multiple mechanisms (email,
SMS, robot call, app) across multiple devices.
Response times are related to desired service availability, as demonstrated by the fol‐
lowing simplistic example: if a user-facing system must obtain 4 nines of availability
in a given quarter (99.99%), the allowed quarterly downtime is around 13 minutes
(Appendix A). This constraint implies that the reaction time of on-call engineers has
to be in the order of minutes (strictly speaking, 13 minutes). For systems with more
relaxed SLOs, the reaction time can be on the order of tens of minutes.
As soon as a page is received and acknowledged, the on-call engineer is expected to
triage the problem and work toward its resolution, possibly involving other team
members and escalating as needed.
Nonpaging production events, such as lower priority alerts or software releases, can
also be handled and/or vetted by the on-call engineer during business hours. These
activities are less urgent than paging events, which take priority over almost every
other task, including project work. For more insight on interrupts and other nonpaging events that contribute to operational load, see Chapter 29.
Many teams have both a primary and a secondary on-call rotation. The distribution
of duties between the primary and the secondary varies from team to team. One team
might employ the secondary as a fall-through for the pages the primary on-call
misses. Another team might specify that the primary on-call handles only pages,
while the secondary handles all other non-urgent production activities.
126 | Chapter 11: Being On-Call

---

## [Sección 90] CHAPTER 11

-- 152 of 550 --

In teams for which a secondary rotation is not strictly required for duty distribution,
it is common for two related teams to serve as secondary on-call for each other, with
fall-through handling duties. This setup eliminates the need for an exclusive secon‐
dary on-call rotation.
There are many ways to organize on-call rotations; for detailed analysis, refer to the
“Oncall” chapter of [Lim14].
Balanced On-Call
SRE teams have specific constraints on the quantity and quality of on-call shifts. The
quantity of on-call can be calculated by the percent of time spent by engineers on oncall duties. The quality of on-call can be calculated by the number of incidents that
occur during an on-call shift.
SRE managers have the responsibility of keeping the on-call workload balanced and
sustainable across these two axes.
Balance in Quantity
We strongly believe that the “E” in “SRE” is a defining characteristic of our organiza‐
tion, so we strive to invest at least 50% of SRE time into engineering: of the remain‐
der, no more than 25% can be spent on-call, leaving up to another 25% on other types
of operational, nonproject work.
Using the 25% on-call rule, we can derive the minimum number of SREs required to
sustain a 24/7 on-call rotation. Assuming that there are always two people on-call
(primary and secondary, with different duties), the minimum number of engineers
needed for on-call duty from a single-site team is eight: assuming week-long shifts,
each engineer is on-call (primary or secondary) for one week every month. For dualsite teams, a reasonable minimum size of each team is six, both to honor the 25% rule
and to ensure a substantial and critical mass of engineers for the team.
If a service entails enough work to justify growing a single-site team, we prefer to cre‐
ate a multi-site team. A multi-site team is advantageous for two reasons:
• Night shifts have detrimental effects on people’s health [Dur05], and a multi-site
“follow the sun” rotation allows teams to avoid night shifts altogether.
• Limiting the number of engineers in the on-call rotation ensures that engineers
do not lose touch with the production systems (see “A Treacherous Enemy:
Operational Underload” on page 132).
However, multi-site teams incur communication and coordination overhead. There‐
fore, the decision to go multi-site or single-site should be based upon the trade-offs
Balanced On-Call | 127

-- 153 of 550 --

each option entails, the importance of the system, and the workload each system
generates.
Balance in Quality
For each on-call shift, an engineer should have sufficient time to deal with any inci‐
dents and follow-up activities such as writing postmortems [Loo10]. Let’s define an
incident as a sequence of events and alerts that are related to the same root cause and
would be discussed as part of the same postmortem. We’ve found that on average,
dealing with the tasks involved in an on-call incident—root-cause analysis, remedia‐
tion, and follow-up activities like writing a postmortem and fixing bugs—takes 6
hours. It follows that the maximum number of incidents per day is 2 per 12-hour oncall shift. In order to stay within this upper bound, the distribution of paging events
should be very flat over time, with a likely median value of 0: if a given component or
issue causes pages every day (median incidents/day > 1), it is likely that something
else will break at some point, thus causing more incidents than should be permitted.
If this limit is temporarily exceeded, e.g., for a quarter, corrective measures should be
put in place to make sure that the operational load returns to a sustainable state (see
“Operational Overload” on page 130 and Chapter 30).
Compensation
Adequate compensation needs to be considered for out-of-hours support. Different
organizations handle on-call compensation in different ways; Google offers time-offin-lieu or straight cash compensation, capped at some proportion of overall salary.
The compensation cap represents, in practice, a limit on the amount of on-call work
that will be taken on by any individual. This compensation structure ensures incen‐
tivization to be involved in on-call duties as required by the team, but also promotes a
balanced on-call work distribution and limits potential drawbacks of excessive on-call
work, such as burnout or inadequate time for project work.
Feeling Safe
As mentioned earlier, SRE teams support Google’s most critical systems. Being an
SRE on-call typically means assuming responsibility for user-facing, revenue-critical
systems or for the infrastructure required to keep these systems up and running. SRE
methodology for thinking about and tackling problems is vital for the appropriate
operation of services.
Modern research identifies two distinct ways of thinking that an individual may, con‐
sciously or subconsciously, choose when faced with challenges [Kah11]:
128 | Chapter 11: Being On-Call

---

## [Sección 91] CHAPTER 11

-- 154 of 550 --

• Intuitive, automatic, and rapid action
• Rational, focused, and deliberate cognitive functions
When one is dealing with the outages related to complex systems, the second of these
options is more likely to produce better results and lead to well-planned incident
handling.
To make sure that the engineers are in the appropriate frame of mind to leverage the
latter mindset, it’s important to reduce the stress related to being on-call. The impor‐
tance and the impact of the services and the consequences of potential outages can
create significant pressure on the on-call engineers, damaging the well-being of indi‐
vidual team members and possibly prompting SREs to make incorrect choices that
can endanger the availability of the service. Stress hormones like cortisol and
corticotropin-releasing hormone (CRH) are known to cause behavioral consequences
—including fear—that can impair cognitive functions and cause suboptimal decision
making [Chr09].
Under the influence of these stress hormones, the more deliberate cognitive approach
is typically subsumed by unreflective and unconsidered (but immediate) action, lead‐
ing to potential abuse of heuristics. Heuristics are very tempting behaviors when one
is on-call. For example, when the same alert pages for the fourth time in the week,
and the previous three pages were initiated by an external infrastructure system, it is
extremely tempting to exercise confirmation bias by automatically associating this
fourth occurrence of the problem with the previous cause.
While intuition and quick reactions can seem like desirable traits in the middle of
incident management, they have downsides. Intuition can be wrong and is often less
supportable by obvious data. Thus, following intuition can lead an engineer to waste
time pursuing a line of reasoning that is incorrect from the start. Quick reactions are
deep-rooted in habit, and habitual responses are unconsidered, which means they
can be disastrous. The ideal methodology in incident management strikes the perfect
balance of taking steps at the desired pace when enough data is available to make a
reasonable decision while simultaneously critically examining your assumptions.
It’s important that on-call SREs understand that they can rely on several resources
that make the experience of being on-call less daunting than it may seem. The most
important on-call resources are:
• Clear escalation paths
• Well-defined incident-management procedures
• A blameless postmortem culture ([Loo10], [All12])
The developer teams of SRE-supported systems usually participate in a 24/7 on-call
rotation, and it is always possible to escalate to these partner teams when necessary.
Feeling Safe | 129

-- 155 of 550 --

The appropriate escalation of outages is generally a principled way to react to serious
outages with significant unknown dimensions.
When one is handling incidents, if the issue is complex enough to involve multiple
teams or if, after some investigation, it is not yet possible to estimate an upper bound
for the incident’s time span, it can be useful to adopt a formal incident-management
protocol. Google SRE uses the protocol described in Chapter 14, which offers an
easy-to-follow and well-defined set of steps that aid an on-call engineer to rationally
pursue a satisfactory incident resolution with all the required help. This protocol is
internally supported by a web-based tool that automates most of the incident man‐
agement actions, such as handing off roles and recording and communicating status
updates. This tool allows incident managers to focus on dealing with the incident,
rather than spending time and cognitive effort on mundane actions such as format‐
ting emails or updating several communication channels at once.
Finally, when an incident occurs, it’s important to evaluate what went wrong, recog‐
nize what went well, and take action to prevent the same errors from recurring in the
future. SRE teams must write postmortems after significant incidents and detail a full
timeline of the events that occurred. By focusing on events rather than the people,
these postmortems provide significant value. Rather than placing blame on individu‐
als, they derive value from the systematic analysis of production incidents. Mistakes
happen, and software should make sure that we make as few mistakes as possible.
Recognizing automation opportunities is one of the best ways to prevent human
errors [Loo10].
Avoiding Inappropriate Operational Load
As mentioned in “Balanced On-Call” on page 127, SREs spend at most 50% of their
time on operational work. What happens if operational activities exceed this limit?
Operational Overload
The SRE team and leadership are responsible for including concrete objectives in
quarterly work planning in order to make sure that the workload returns to sustaina‐
ble levels. Temporarily loaning an experienced SRE to an overloaded team, discussed
in Chapter 30, can provide enough breathing room so that the team can make head‐
way in addressing issues.
Ideally, symptoms of operational overload should be measurable, so that the goals can
be quantified (e.g., number of daily tickets < 5, paging events per shift < 2).
Misconfigured monitoring is a common cause of operational overload. Paging alerts
should be aligned with the symptoms that threaten a service’s SLOs. All paging alerts
should also be actionable. Low-priority alerts that bother the on-call engineer every
hour (or more frequently) disrupt productivity, and the fatigue such alerts induce can
130 | Chapter 11: Being On-Call

---

## [Sección 92] CHAPTER 11

-- 156 of 550 --

2 For more discussion on the natural tension between SRE and product development teams, see Chapter 1.
also cause serious alerts to be treated with less attention than necessary. See Chap‐
ter 29 for further discussion.
It is also important to control the number of alerts that the on-call engineers receive
for a single incident. Sometimes a single abnormal condition can generate several
alerts, so it’s important to regulate the alert fan-out by ensuring that related alerts are
grouped together by the monitoring or alerting system. If, for any reason, duplicate
or uninformative alerts are generated during an incident, silencing those alerts can
provide the necessary quiet for the on-call engineer to focus on the incident itself.
Noisy alerts that systematically generate more than one alert per incident should be
tweaked to approach a 1:1 alert/incident ratio. Doing so allows the on-call engineer to
focus on the incident instead of triaging duplicate alerts.
Sometimes the changes that cause operational overload are not under the control of
the SRE teams. For example, the application developers might introduce changes that
cause the system to be more noisy, less reliable, or both. In this case, it is appropriate
to work together with the application developers to set common goals to improve the
system.
In extreme cases, SRE teams may have the option to “give back the pager”—SRE can
ask the developer team to be exclusively on-call for the system until it meets the
standards of the SRE team in question. Giving back the pager doesn’t happen very
frequently, because it’s almost always possible to work with the developer team to
reduce the operational load and make a given system more reliable. In some cases,
though, complex or architectural changes spanning multiple quarters might be
required to make a system sustainable from an operational point of view. In such
cases, the SRE team should not be subject to an excessive operational load. Instead, it
is appropriate to negotiate the reorganization of on-call responsibilities with the
development team, possibly routing some or all paging alerts to the developer on-call.
Such a solution is typically a temporary measure, during which time the SRE and
developer teams work together to get the service in shape to be on-boarded by the
SRE team again.
The possibility of renegotiating on-call responsibilities between SRE and product
development teams attests to the balance of powers between the teams.2 This working
relationship also exemplifies how the healthy tension between these two teams and
the values that they represent—reliability versus feature velocity—is typically resolved
by greatly benefiting the service and, by extension, the company as a whole.
Avoiding Inappropriate Operational Load | 131

-- 157 of 550 --

A Treacherous Enemy: Operational Underload
Being on-call for a quiet system is blissful, but what happens if the system is too quiet
or when SREs are not on-call often enough? An operational underload is undesirable
for an SRE team. Being out of touch with production for long periods of time can
lead to confidence issues, both in terms of overconfidence and underconfidence,
while knowledge gaps are discovered only when an incident occurs.
To counteract this eventuality, SRE teams should be sized to allow every engineer to
be on-call at least once or twice a quarter, thus ensuring that each team member is
sufficiently exposed to production. “Wheel of Misfortune” exercises (discussed in

---

## [Sección 93] Chapter 28) are also useful team activities that can help to hone and improve trouble‐

shooting skills and knowledge of the service. Google also has a company-wide annual
disaster recovery event called DiRT (Disaster Recovery Training) that combines theo‐
retical and practical drills to perform multiday testing of infrastructure systems and
individual services; see [Kri12].
Conclusions
The approach to on-call described in this chapter serves as a guideline for all SRE
teams in Google and is key to fostering a sustainable and manageable work environ‐
ment. Google’s approach to on-call has enabled us to use engineering work as the pri‐
mary means to scale production responsibilities and maintain high reliability and
availability despite the increasing complexity and number of systems and services for
which SREs are responsible.
While this approach might not be immediately applicable to all contexts in which
engineers need to be on-call for IT services, we believe it represents a solid model that
organizations can adopt in scaling to meet a growing volume of on-call work.
132 | Chapter 11: Being On-Call

-- 158 of 550 --

1 Indeed, using only first principles and troubleshooting skills is often an effective way to learn how a system
works; see Chapter 28.

---

## [Sección 94] CHAPTER 12

Effective Troubleshooting
Written by Chris Jones
Be warned that being an expert is more than understanding how a system is supposed to
work. Expertise is gained by investigating why a system doesn’t work.
—Brian Redman
Ways in which things go right are special cases of the ways in which things go wrong.
—John Allspaw
Troubleshooting is a critical skill for anyone who operates distributed computing sys‐
tems—especially SREs—but it’s often viewed as an innate skill that some people have
and others don’t. One reason for this assumption is that, for those who troubleshoot
often, it’s an ingrained process; explaining how to troubleshoot is difficult, much like
explaining how to ride a bike. However, we believe that troubleshooting is both learn‐
able and teachable.
Novices are often tripped up when troubleshooting because the exercise ideally
depends upon two factors: an understanding of how to troubleshoot generically (i.e.,
without any particular system knowledge) and a solid knowledge of the system.
While you can investigate a problem using only the generic process and derivation
from first principles,1 we usually find this approach to be less efficient and less effec‐
tive than understanding how things are supposed to work. Knowledge of the system
typically limits the effectiveness of an SRE new to a system; there’s little substitute to
learning how the system is designed and built.
-- 159 of 550 --

2 See https://en.wikipedia.org/wiki/Hypothetico-deductive_model.
3 For instance, exported variables as described in Chapter 10.
Let’s look at a general model of the troubleshooting process. Readers with expertise in
troubleshooting may quibble with our definitions and process; if your method is
effective for you, there’s no reason not to stick with it.
Theory
Formally, we can think of the troubleshooting process as an application of the
hypothetico-deductive method:2 given a set of observations about a system and a the‐
oretical basis for understanding system behavior, we iteratively hypothesize potential
causes for the failure and try to test those hypotheses.
In an idealized model such as that in Figure 12-1, we’d start with a problem report
telling us that something is wrong with the system. Then we can look at the system’s
telemetry3 and logs to understand its current state. This information, combined with
our knowledge of how the system is built, how it should operate, and its failure
modes, enables us to identify some possible causes.
Figure 12-1. A process for troubleshooting
134 | Chapter 12: Effective Troubleshooting

-- 160 of 550 --

4 Attributed to Theodore Woodward, of the University of Maryland School of Medicine, in the 1940s. See
https://en.wikipedia.org/wiki/Zebra_(medicine). This works in some domains, but in some systems, entire
classes of failures may be eliminable: for instance, using a well-designed cluster filesystem means that a
latency problem is unlikely to be due to a single dead disk.
5 Occam’s Razor; see https://en.wikipedia.org/wiki/Occam%27s_razor. But remember that it may still be the case
that there are multiple problems; in particular, it may be more likely that a system has a number of common
low-grade problems that, taken together, explain all the symptoms rather than a single rare problem that
causes them all. Cf https://en.wikipedia.org/wiki/Hickam%27s_dictum.
We can then test our hypotheses in one of two ways. We can compare the observed
state of the system against our theories to find confirming or disconfirming evidence.
Or, in some cases, we can actively “treat” the system—that is, change the system in a
controlled way—and observe the results. This second approach refines our under‐
standing of the system’s state and possible cause(s) of the reported problems. Using
either of these strategies, we repeatedly test until a root cause is identified, at which
point we can then take corrective action to prevent a recurrence and write a postmor‐
tem. Of course, fixing the proximate cause(s) needn’t always wait for root-causing or
postmortem writing.
Common Pitfalls
Ineffective troubleshooting sessions are plagued by problems at the Triage, Examine,
and Diagnose steps, often because of a lack of deep system understanding. The fol‐
lowing are common pitfalls to avoid:
• Looking at symptoms that aren’t relevant or misunderstanding the meaning of
system metrics. Wild goose chases often result.
• Misunderstanding how to change the system, its inputs, or its environment, so as
to safely and effectively test hypotheses.
• Coming up with wildly improbable theories about what’s wrong, or latching on
to causes of past problems, reasoning that since it happened once, it must be hap‐
pening again.
• Hunting down spurious correlations that are actually coincidences or are correla‐
ted with shared causes.
Fixing the first and second common pitfalls is a matter of learning the system in ques‐
tion and becoming experienced with the common patterns used in distributed sys‐
tems. The third trap is a set of logical fallacies that can be avoided by remembering
that not all failures are equally probable—as doctors are taught, “when you hear hoof‐
beats, think of horses not zebras.”4 Also remember that, all things being equal, we
should prefer simpler explanations.5
Theory | 135

---

## [Sección 95] CHAPTER 12

-- 161 of 550 --

6 Of course, see https://xkcd.com/552.
7 At least, we have no plausible theory to explain why the number of PhDs awarded in Computer Science in the
US should be extremely well correlated (r2 = 0.9416) with the per capita consumption of cheese, between 2000
and 2009: http://tylervigen.com/view_correlation?id=1099.
8 It may be useful to refer prospective bug reporters to [Tat99] to help them provide high-quality problem
reports.
Finally, we should remember that correlation is not causation:6 some correlated
events, say packet loss within a cluster and failed hard drives in the cluster, share
common causes—in this case, a power outage, though network failure clearly doesn’t
cause the hard drive failures nor vice versa. Even worse, as systems grow in size and
complexity and as more metrics are monitored, it’s inevitable that there will be events
that happen to correlate well with other events, purely by coincidence.7
Understanding failures in our reasoning process is the first step to avoiding them and
becoming more effective in solving problems. A methodical approach to knowing
what we do know, what we don’t know, and what we need to know, makes it simpler
and more straightforward to figure out what’s gone wrong and how to fix it.
In Practice
In practice, of course, troubleshooting is never as clean as our idealized model sug‐
gests it should be. There are some steps that can make the process less painful and
more productive for both those experiencing system problems and those responding
to them.
Problem Report
Every problem starts with a problem report, which might be an automated alert or
one of your colleagues saying, “The system is slow.” An effective report should tell
you the expected behavior, the actual behavior, and, if possible, how to reproduce the
behavior.8 Ideally, the reports should have a consistent form and be stored in a search‐
able location, such as a bug tracking system. Here, our teams often have customized
forms or small web apps that ask for information that’s relevant to diagnosing the
particular systems they support, which then automatically generate and route a bug.
This may also be a good point at which to provide tools for problem reporters to try
self-diagnosing or self-repairing common issues on their own.
It’s common practice at Google to open a bug for every issue, even those received via
email or instant messaging. Doing so creates a log of investigation and remediation
activities that can be referenced in the future. Many teams discourage reporting prob‐
lems directly to a person for several reasons: this practice introduces an additional
step of transcribing the report into a bug, produces lower-quality reports that aren’t
136 | Chapter 12: Effective Troubleshooting

-- 162 of 550 --

visible to other members of the team, and tends to concentrate the problem-solving
load on a handful of team members that the reporters happen to know, rather than
the person currently on duty (see also Chapter 29).
Shakespeare Has a Problem
You’re on-call for the Shakespeare search service and receive an alert, ShakespeareBlackboxProbe_SearchFailure: your black-box monitoring hasn’t been able to find
search results for “the forms of things unknown” for the past five minutes. The alert‐
ing system has filed a bug—with links to the black-box prober’s recent results and to
the playbook entry for this alert—and assigned it to you. Time to spring into action!
Triage
Once you receive a problem report, the next step is to figure out what to do about it.
Problems can vary in severity: an issue might affect only one user under very specific
circumstances (and might have a workaround), or it might entail a complete global
outage for a service. Your response should be appropriate for the problem’s impact:
it’s appropriate to declare an all-hands-on-deck emergency for the latter (see Chap‐
ter 14), but doing so for the former is overkill. Assessing an issue’s severity requires
an exercise of good engineering judgment and, often, a degree of calm under
pressure.
Your first response in a major outage may be to start troubleshooting and try to find a
root cause as quickly as possible. Ignore that instinct!
Instead, your course of action should be to make the system work as well as it can
under the circumstances. This may entail emergency options, such as diverting traffic
from a broken cluster to others that are still working, dropping traffic wholesale to
prevent a cascading failure, or disabling subsystems to lighten the load. Stopping the
bleeding should be your first priority; you aren’t helping your users if the system dies
while you’re root-causing. Of course, an emphasis on rapid triage doesn’t preclude
taking steps to preserve evidence of what’s going wrong, such as logs, to help with
subsequent root-cause analysis.
Novice pilots are taught that their first responsibility in an emergency is to fly the air‐
plane [Gaw09]; troubleshooting is secondary to getting the plane and everyone on it
safely onto the ground. This approach is also applicable to computer systems: for
example, if a bug is leading to possibly unrecoverable data corruption, freezing the
system to prevent further failure may be better than letting this behavior continue.
This realization is often quite unsettling and counterintuitive for new SREs, particu‐
larly those whose prior experience was in product development organizations.
In Practice | 137

---

## [Sección 96] CHAPTER 12

-- 163 of 550 --

9 But beware false correlations that can lead you down wrong paths!
Examine
We need to be able to examine what each component in the system is doing in order
to understand whether or not it’s behaving correctly.
Ideally, a monitoring system is recording metrics for your system as discussed in

---

## [Sección 97] Chapter 10. These metrics are a good place to start figuring out what’s wrong. Graph‐

ing time-series and operations on time-series can be an effective way to understand
the behavior of specific pieces of a system and find correlations that might suggest
where problems began.9
Logging is another invaluable tool. Exporting information about each operation and
about system state makes it possible to understand exactly what a process was doing
at a given point in time. You may need to analyze system logs across one or many
processes. Tracing requests through the whole stack using tools such as Dapper
[Sig10] provides a very powerful way to understand how a distributed system is
working, though varying use cases imply significantly different tracing designs
[Sam14].
Logging
Text logs are very helpful for reactive debugging in real time, while storing logs in a
structured binary format can make it possible to build tools to conduct retrospective
analysis with much more information.
It’s really useful to have multiple verbosity levels available, along with a way to
increase these levels on the fly. This functionality enables you to examine any or all
operations in incredible detail without having to restart your process, while still
allowing you to dial back the verbosity levels when your service is operating normally.
Depending of the volume of traffic your service receives, it might be better to use stat‐
istical sampling; for example, you might show one out of every 1,000 operations.
A next step is to include a selection language so that you can say “show me operations
that match X,” for a wide range of X—e.g., Set RPCs with a payload size below 1,024
bytes, or operations that took longer than 10 ms to return, or which called doSome
thingInteresting() in rpc_handler.py. You might even want to design your logging
infrastructure so that you can turn it on as needed, quickly and selectively.
Exposing current state is the third trick in our toolbox. For example, Google servers
have endpoints that show a sample of RPCs recently sent or received, so it’s possible
to understand how any one server is communicating with others without referencing
138 | Chapter 12: Effective Troubleshooting

-- 164 of 550 --

an architecture diagram. These endpoints also show histograms of error rates and
latency for each type of RPC, so that it’s possible to quickly tell what’s unhealthy.
Some systems have endpoints that show their current configuration or allow exami‐
nation of their data; for instance, Google’s Borgmon servers (Chapter 10) can show
the monitoring rules they’re using, and even allow tracing a particular computation
step-by-step to the source metrics from which a value is derived.
Finally, you may even need to instrument a client to experiment with, in order to dis‐
cover what a component is returning in response to requests.
Debugging Shakespeare
Using the link to the black-box monitoring results in the bug, you discover that the
prober sends an HTTP GET request to the /api/search endpoint:
{
‘search_text’: ‘the forms of things unknown’
}
It expects to receive a response with an HTTP 200 response code and a JSON payload
exactly matching:
[{
"work": "A Midsummer Night's Dream",
"act": 5,
"scene": 1,
"line": 2526,
"speaker": "Theseus"
}]
The system is set up to send a probe once a minute; over the past 10 minutes, about
half the probes have succeeded, though with no discernible pattern. Unfortunately,
the prober doesn’t show you what was returned when it failed; you make a note to fix
that for the future.
Using curl, you manually send requests to the search endpoint and get a failed
response with HTTP response code 502 (Bad Gateway) and no payload. It has an
HTTP header, X-Request-Trace, which lists the addresses of the backend servers
responsible for responding to that request. With this information, you can now exam‐
ine those backends to test whether they’re responding appropriately.
Diagnose
A thorough understanding of the system’s design is decidedly helpful for coming up
with plausible hypotheses about what’s gone wrong, but there are also some generic
practices that will help even without domain knowledge.
In Practice | 139

---

## [Sección 98] Chapter 10. These metrics are a good place to start figuring out what’s wrong. Graph‐

-- 165 of 550 --

10 In many respects, this is similar to the “Five Whys” technique [Ohn88] introduced by Taiichi Ohno to under‐
stand the root causes of manufacturing errors.
Simplify and reduce
Ideally, components in a system have well-defined interfaces and perform known
transformations from their input to their output (in our example, given an input
search text, a component might return output containing possible matches). It’s then
possible to look at the connections between components—or, equivalently, at the data
flowing between them—to determine whether a given component is working prop‐
erly. Injecting known test data in order to check that the resulting output is expected
(a form of black-box testing) at each step can be especially effective, as can injecting
data intended to probe possible causes of errors. Having a solid reproducible test case
makes debugging much faster, and it may be possible to use the case in a nonproduction environment where more invasive or riskier techniques are available than
would be possible in production.
Dividing and conquering is a very useful general-purpose solution technique. In a
multilayer system where work happens throughout a stack of components, it’s often
best to start systematically from one end of the stack and work toward the other end,
examining each component in turn. This strategy is also well-suited for use with data
processing pipelines. In exceptionally large systems, proceeding linearly may be too
slow; an alternative, bisection, splits the system in half and examines the communica‐
tion paths between components on one side and the other. After determining
whether one half seems to be working properly, repeat the process until you’re left
with a possibly faulty component.
Ask “what,” “where,” and “why”
A malfunctioning system is often still trying to do something—just not the thing you
want it to be doing. Finding out what it’s doing, then asking why it’s doing that and
where its resources are being used or where its output is going can help you under‐
stand how things have gone wrong.10
140 | Chapter 12: Effective Troubleshooting

-- 166 of 550 --

11 In contrast to RE2, PCRE can require exponential time to evaluate some regular expressions. RE2 is available
at https://github.com/google/re2.
12 [All15] observes this is a frequently used heuristic in resolving outages.
Unpacking the Causes of a Symptom
Symptom: A Spanner cluster has high latency and RPCs to its servers are timing out.
Why? The Spanner server tasks are using all their CPU time and can’t make progress
on all the requests the clients send.
Where in the server is the CPU time being used? Profiling the server shows it’s sort‐
ing entries in logs checkpointed to disk.
Where in the log-sorting code is it being used? When evaluating a regular expression
against paths to log files.
Solutions: Rewrite the regular expression to avoid backtracking. Look in the code‐
base for similar patterns. Consider using RE2, which does not backtrack and guaran‐
tees linear runtime growth with input size.11
What touched it last
Systems have inertia: we’ve found that a working computer system tends to remain in
motion until acted upon by an external force, such as a configuration change or a
shift in the type of load served. Recent changes to a system can be a productive place
to start identifying what’s going wrong.12
Well-designed systems should have extensive production logging to track new ver‐
sion deployments and configuration changes at all layers of the stack, from the server
binaries handling user traffic down to the packages installed on individual nodes in
the cluster. Correlating changes in a system’s performance and behavior with other
events in the system and environment can also be helpful in constructing monitoring
dashboards; for example, you might annotate a graph showing the system’s error rates
with the start and end times of a deployment of a new version, as seen in Figure 12-2.
In Practice | 141

-- 167 of 550 --

---

## [Sección 99] Chapter 10. These metrics are a good place to start figuring out what’s wrong. Graph‐

Figure 12-2. Error rates graphed against deployment start and end times
Manually sending a request to the /api/search endpoint (see “Debugging Shake‐
speare” on page 139) and seeing the failure listing backend servers that handled the
response lets you discount the likelihood that the problem is with the API frontend
server and with the load balancers: the response probably wouldn’t have included that
information if the request hadn’t at least made it to the search backends and failed
there. Now you can focus your efforts on the backends—analyzing their logs, sending
test queries to see what responses they return, and examining their exported metrics.
Specific diagnoses
While the generic tools described previously are helpful across a broad range of prob‐
lem domains, you will likely find it helpful to build tools and systems to help with
diagnosing your particular services. Google SREs spend much of their time building
such tools. While many of these tools are necessarily specific to a given system, be
sure to look for commonalities between services and teams to avoid duplicating
effort.
Test and Treat
Once you’ve come up with a short list of possible causes, it’s time to try to find which
factor is at the root of the actual problem. Using the experimental method, we can try
to rule in or rule out our hypotheses. For instance, suppose we think a problem is
caused by either a network failure between an application logic server and a database
server, or by the database refusing connections. Trying to connect to the database
with the same credentials the application logic server uses can refute the second
hypothesis, while pinging the database server may be able to refute the first, depend‐
142 | Chapter 12: Effective Troubleshooting

-- 168 of 550 --

13 Using a shared document or real-time chat for notes provides a timestamp of when you did something, which
is helpful for postmortems. It also shares that information with others, so they’re up to speed with the current
state of the world and don’t need to interrupt your troubleshooting.
14 See also “Negative Results Are Magic” on page 144 for more on this point.
ing on network topology, firewall rules, and other factors. Following the code and
trying to imitate the code flow, step-by-step, may point to exactly what’s going wrong.
There are a number of considerations to keep in mind when designing tests (which
may be as simple as sending a ping or as complicated as removing traffic from a clus‐
ter and injecting specially formed requests to find a race condition):
• An ideal test should have mutually exclusive alternatives, so that it can rule one
group of hypotheses in and rule another set out. In practice, this may be difficult
to achieve.
• Consider the obvious first: perform the tests in decreasing order of likelihood,
considering possible risks to the system from the test. It probably makes more
sense to test for network connectivity problems between two machines before
looking into whether a recent configuration change removed a user’s access to
the second machine.
• An experiment may provide misleading results due to confounding factors. For
example, a firewall rule might permit access only from a specific IP address,
which might make pinging the database from your workstation fail, even if ping‐
ing from the application logic server’s machine would have succeeded.
• Active tests may have side effects that change future test results. For instance,
allowing a process to use more CPUs may make operations faster, but might
increase the likelihood of encountering data races. Similarly, turning on verbose
logging might make a latency problem even worse and confuse your results: is
the problem getting worse on its own, or because of the logging?
• Some tests may not be definitive, only suggestive. It can be very difficult to make
race conditions or deadlocks happen in a timely and reproducible manner, so
you may have to settle for less certain evidence that these are the causes.
Take clear notes of what ideas you had, which tests you ran, and the results you saw.13
Particularly when you are dealing with more complicated and drawn-out cases, this
documentation may be crucial in helping you remember exactly what happened and
prevent having to repeat these steps.14 If you performed active testing by changing a
system—for instance by giving more resources to a process—making changes in a
systematic and documented fashion will help you return the system to its pre-test
setup, rather than running in an unknown hodge-podge configuration.
In Practice | 143

---

## [Sección 100] Chapter 10. These metrics are a good place to start figuring out what’s wrong. Graph‐

-- 169 of 550 --

Negative Results Are Magic
Written by Randall Bosetti
Edited by Joan Wendt
A “negative” result is an experimental outcome in which the expected effect is absent
—that is, any experiment that doesn’t work out as planned. This includes new
designs, heuristics, or human processes that fail to improve upon the systems they
replace.
Negative results should not be ignored or discounted. Realizing you’re wrong has
much value: a clear negative result can resolve some of the hardest design questions.
Often a team has two seemingly reasonable designs but progress in one direction has
to address vague and speculative questions about whether the other direction might
be better.
Experiments with negative results are conclusive. They tell us something certain
about production, or the design space, or the performance limits of an existing sys‐
tem. They can help others determine whether their own experiments or designs are
worthwhile. For example, a given development team might decide against using a
particular web server because it can handle only ~800 connections out of the needed
8,000 connections before failing due to lock contention. When a subsequent develop‐
ment team decides to evaluate web servers, instead of starting from scratch, they can
use this already well-documented negative result as a starting point to decide quickly
whether (a) they need fewer than 800 connections or (b) the lock contention prob‐
lems have been resolved.
Even when negative results do not apply directly to someone else’s experiment, the
supplementary data gathered can help others choose new experiments or avoid pit‐
falls in previous designs. Microbenchmarks, documented antipatterns, and project
postmortems all fit this category. You should consider the scope of the negative result
when designing an experiment, because a broad or especially robust negative result
will help your peers even more.
Tools and methods can outlive the experiment and inform future work. As an
example, benchmarking tools and load generators can result just as easily from a dis‐
confirming experiment as a supporting one. Many webmasters have benefited from
the difficult, detail-oriented work that produced Apache Bench, a web server loadtest,
even though its first results were likely disappointing.
Building tools for repeatable experiments can have indirect benefits as well: although
one application you build may not benefit from having its database on SSDs or from
creating indices for dense keys, the next one just might. Writing a script that allows
you to easily try out these configuration changes ensures you don’t forget or miss
optimizations in your next project.
144 | Chapter 12: Effective Troubleshooting

-- 170 of 550 --

15 See [Mea08] on how to think about systems, and also [Coo00] and [Dek14] on the limitations of finding a
single root cause instead of examining the system and its environment for causative factors.
Publishing negative results improves our industry’s data-driven culture. Account‐
ing for negative results and statistical insignificance reduces the bias in our metrics
and provides an example to others of how to maturely accept uncertainty. By publish‐
ing everything, you encourage others to do the same, and everyone in the industry
collectively learns much more quickly. SRE has already learned this lesson with highquality postmortems, which have had a large positive effect on production stability.
Publish your results. If you are interested in an experiment’s results, there’s a good
chance that other people are as well. When you publish the results, those people do
not have to design and run a similar experiment themselves. It’s tempting and com‐
mon to avoid reporting negative results because it’s easy to perceive that the experi‐
ment “failed.” Some experiments are doomed, and they tend to be caught by review.
Many more experiments are simply unreported because people mistakenly believe
that negative results are not progress.
Do your part by telling everyone about the designs, algorithms, and team workflows
you’ve ruled out. Encourage your peers by recognizing that negative results are part
of thoughtful risk taking and that every well-designed experiment has merit. Be skep‐
tical of any design document, performance review, or essay that doesn’t mention fail‐
ure. Such a document is potentially either too heavily filtered, or the author was not
rigorous in his or her methods.
Above all, publish the results you find surprising so that others—including your
future self—aren’t surprised.
Cure
Ideally, you’ve now narrowed the set of possible causes to one. Next, we’d like to prove
that it’s the actual cause. Definitively proving that a given factor caused a problem—
by reproducing it at will—can be difficult to do in production systems; often, we can
only find probable causal factors, for the following reasons:
• Systems are complex. It’s quite likely that there are multiple factors, each of which
individually is not the cause, but which taken jointly are causes.15 Real systems
are also often path-dependent, so that they must be in a specific state before a
failure occurs.
• Reproducing the problem in a live production system may not be an option, either
because of the complexity of getting the system into a state where the failure can
be triggered, or because further downtime may be unacceptable. Having a non‐
Negative Results Are Magic | 145

---

## [Sección 101] Chapter 10. These metrics are a good place to start figuring out what’s wrong. Graph‐

-- 171 of 550 --

16 See https://cloud.google.com/appengine.
17 We have compressed and simplified this case study to aid understanding.
production environment can mitigate these challenges, though at the cost of hav‐
ing another copy of the system to run.
Once you’ve found the factors that caused the problem, it’s time to write up notes on
what went wrong with the system, how you tracked down the problem, how you fixed
the problem, and how to prevent it from happening again. In other words, you need
to write a postmortem (although ideally, the system is alive at this point!).
Case Study
App Engine,16 part of Google’s Cloud Platform, is a platform-as-a-service product that
allows developers to build services atop Google’s infrastructure. One of our internal
customers filed a problem report indicating that they’d recently seen a dramatic
increase in latency, CPU usage, and number of running processes needed to serve
traffic for their app, a content-management system used to build documentation for
developers.17 The customer couldn’t find any recent changes to their code that corre‐
lated with the increase in resources, and there hadn’t been an increase in traffic to
their app (see Figure 12-3), so they were wondering if a change in the App Engine
service was responsible.
Our investigation discovered that latency had indeed increased by nearly an order of
magnitude (as shown in Figure 12-4). Simultaneously, the amount of CPU time
(Figure 12-5) and number of serving processes (Figure 12-6) had nearly quadrupled.
Clearly something was wrong. It was time to start troubleshooting.
Figure 12-3. Application’s requests received per second, showing a brief spike and return
to normal
146 | Chapter 12: Effective Troubleshooting

-- 172 of 550 --

Figure 12-4. Application’s latency, showing 50th, 95th, and 99th percentiles (lines) with a
heatmap showing how many requests fell into a given latency bucket at any point in time
(shade)
Figure 12-5. Aggregate CPU usage for the application
Figure 12-6. Number of instances for the application
Typically a sudden increase in latency and resource usage indicates either an increase
in traffic sent to the system or a change in system configuration. However, we could
easily rule out both of these possible causes: while a spike in traffic to the app around
20:45 could explain a brief surge in resource usage, we’d expect traffic to return to
baseline fairly soon after request volume normalized. This spike certainly shouldn’t
have continued for multiple days, beginning when the app’s developers filed the
report and we started looking into the problem. Second, the change in performance
happened on Saturday, when neither changes to the app nor the production environ‐
ment were in flight. The service’s most recent code pushes and configuration pushes
had completed days before. Furthermore, if the problem originated with the service,
we’d expect to see similar effects on other apps using the same infrastructure. How‐
ever, no other apps were experiencing similar effects.
Case Study | 147

-- 173 of 550 --

We referred the problem report to our counterparts, App Engine’s developers, to
investigate whether the customer was encountering any idiosyncrasies in the serving
infrastructure. The developers weren’t able to find any oddities, either. However, a
developer did notice a correlation between the latency increase and the increase of a
specific data storage API call, merge_join, which often indicates suboptimal indexing
when reading from the datastore. Adding a composite index on the properties the
app uses to select objects from the datastore would speed those requests, and in prin‐
ciple, speed the application as a whole—but we’d need to figure out which properties
needed indexing. A quick look at the application’s code didn’t reveal any obvious sus‐
pects.
It was time to pull out the heavy machinery in our toolkit: using Dapper [Sig10], we
traced the steps individual HTTP requests took—from their receipt by a frontend
reverse proxy through to the point where the app’s code returned a response—and
looked at the RPCs issued by each server involved in handling that request. Doing so
would allow us to see which properties were included in requests to the datastore,
then create the appropriate indices.
While investigating, we discovered that requests for static content such as images,
which weren’t served from the datastore, were also much slower than expected. Look‐
ing at graphs with file-level granularity, we saw their responses had been much faster
only a few days before. This implied that the observed correlation between
merge_join and the latency increase was spurious and that our suboptimal-indexing
theory was fatally flawed.
Examining the unexpectedly slow requests for static content, most of the RPCs sent
from the application were to a memcache service, so the requests should have been
very fast—on the order of a few milliseconds. These requests did turn out to be very
fast, so the problem didn’t seem to originate there. However, between the time the
app started working on a request and when it made the first RPCs, there was about a
250 ms period where the app was doing…well, something. Because App Engine runs
code provided by users, its SRE team does not profile or inspect app code, so we
couldn’t tell what the app was doing in that interval; similarly, Dapper couldn’t help
track down what was going on since it can only trace RPC calls, and none were made
during that period.
Faced with what was, by this point, quite a mystery, we decided not to solve it…yet.
The customer had a public launch scheduled for the following week, and we weren’t
sure how soon we’d be able to identify the problem and fix it. Instead, we recom‐
mended that the customer increase the resources allocated to their app to the most
CPU-rich instance type available. Doing so reduced the app’s latency to acceptable
levels, though not as low as we’d prefer. We concluded that the latency mitigation was
148 | Chapter 12: Effective Troubleshooting

---

## [Sección 102] Chapter 10. These metrics are a good place to start figuring out what’s wrong. Graph‐

-- 174 of 550 --

18 While launching with an unidentified bug isn’t ideal, it’s often impractical to eliminate all known bugs.
Instead, sometimes we have make do with second-best measures and mitigate risk as best we can, using good
engineering judgment.
19 The datastore lookup can use an index to speed the comparison, but a frequent in-memory implementation is
a simple for loop comparison across all the cached objects. If there are only a few objects, it won’t matter that
this takes linear time—but this can cause a significant increase in latency and resource usage as the number of
cached objects grows.
good enough that the team could conduct their launch successfully, then investigate
at leisure.18
At this point, we suspected that the app was a victim of yet another common cause of
sudden increases in latency and resource usage: a change in the type of work. We’d
seen an increase in writes to the datastore from the app, just before its latency
increased, but because this increase wasn’t very large—nor was it sustained—we’d
written it off as coincidental. However, this behavior did resemble a common pattern:
an instance of the app is initialized by reading objects from the datastore, then storing
them in the instance’s memory. By doing so, the instance avoids reading rarely chang‐
ing configuration from the datastore on each request, and instead checks the inmemory objects. Then, the time it takes to handle requests will often scale with the
amount of configuration data.19 We couldn’t prove that this behavior was the root of
the problem, but it’s a common antipattern.
The app developers added instrumentation to understand where the app was spend‐
ing its time. They identified a method that was called on every request, that checked
whether a user had whitelisted access to a given path. The method used a caching
layer that sought to minimize accesses to both the datastore and the memcache ser‐
vice, by holding whitelist objects in instances’ memory. As one of the app’s developers
noted in the investigation, “I don’t know where the fire is yet, but I’m blinded by
smoke coming from this whitelist cache.”
Some time later, the root cause was found: due to a long-standing bug in the app’s
access control system, whenever one specific path was accessed, a whitelist object
would be created and stored in the datastore. In the run-up to launch, an automated
security scanner had been testing the app for vulnerabilities, and as a side effect, its
scan produced thousands of whitelist objects over the course of half an hour. These
superfluous whitelist objects then had to be checked on every request to the app,
which led to pathologically slow responses—without causing any RPC calls from the
app to other services. Fixing the bug and removing those objects returned the app’s
performance to expected levels.
Case Study | 149

-- 175 of 550 --

Making Troubleshooting Easier
There are many ways to simplify and speed troubleshooting. Perhaps the most funda‐
mental are:
• Building observability—with both white-box metrics and structured logs—into
each component from the ground up.
• Designing systems with well-understood and observable interfaces between
components.
Ensuring that information is available in a consistent way throughout a system—for
instance, using a unique request identifier throughout the span of RPCs generated by
various components—reduces the need to figure out which log entry on an upstream
component matches a log entry on a downstream component, speeding the time to
diagnosis and recovery.
Problems in correctly representing the state of reality in a code change or an environ‐
ment change often lead to a need to troubleshoot. Simplifying, controlling, and log‐
ging such changes can reduce the need for troubleshooting, and make it easier when
it happens.
Conclusion
We’ve looked at some steps you can take to make the troubleshooting process clear
and understandable to novices, so that they, too, can become effective at solving prob‐
lems. Adopting a systematic approach to troubleshooting—as opposed to relying on
luck or experience—can help bound your services’ time to recovery, leading to a bet‐
ter experience for your users.
150 | Chapter 12: Effective Troubleshooting

---

## [Sección 103] Chapter 10. These metrics are a good place to start figuring out what’s wrong. Graph‐

-- 176 of 550 --

---

## [Sección 104] CHAPTER 13

Emergency Response
Written by Corey Adam Baye
Edited by Diane Bates
Things break; that’s life.
Regardless of the stakes involved or the size of an organization, one trait that’s vital to
the long-term health of an organization, and that consequently sets that organization
apart from others, is how the people involved respond to an emergency. Few of us
naturally respond well during an emergency. A proper response takes preparation
and periodic, pertinent, hands-on training. Establishing and maintaining thorough
training and testing processes requires the support of the board and management, in
addition to the careful attention of staff. All of these elements are essential in foster‐
ing an environment in which teams can spend money, time, energy, and possibly even
uptime to ensure that systems, processes, and people respond efficiently during an
emergency.
Note that the chapter on postmortem culture discusses the specifics of how to write
postmortems in order to make sure that incidents that require emergency response
also become a learning opportunity (see Chapter 15). This chapter provides more
concrete examples of such incidents.
What to Do When Systems Break
First of all, don’t panic! You aren’t alone, and the sky isn’t falling. You’re a professional
and trained to handle this sort of situation. Typically, no one is in physical danger—
only those poor electrons are in peril. At the very worst, half of the Internet is down.
So take a deep breath…and carry on.
-- 177 of 550 --

If you feel overwhelmed, pull in more people. Sometimes it may even be necessary to
page the entire company. If your company has an incident response process (see

---

## [Sección 105] Chapter 14), make sure that you’re familiar with it and follow that process.

Test-Induced Emergency
Google has adopted a proactive approach to disaster and emergency testing (see
[Kri12]). SREs break our systems, watch how they fail, and make changes to improve
reliability and prevent the failures from recurring. Most of the time, these controlled
failures go as planned, and the target system and dependent systems behave in
roughly the manner we expect. We identify some weaknesses or hidden dependencies
and document follow-up actions to rectify the flaws we uncover. However, sometimes
our assumptions and the actual results are worlds apart.
Here’s one example of a test that unearthed a number of unexpected dependencies.
Details
We wanted to flush out hidden dependencies on a test database within one of our
larger distributed MySQL databases. The plan was to block all access to just one data‐
base out of a hundred. No one foresaw the results that would unfold.
Response
Within minutes of commencing the test, numerous dependent services reported that
both external and internal users were unable to access key systems. Some systems
were intermittently or only partially accessible.
Assuming that the test was responsible, SRE immediately aborted the exercise. We
attempted to roll back the permissions change, but were unsuccessful. Instead of pan‐
icking, we immediately brainstormed how to restore proper access. Using an already
tested approach, we restored permissions to the replicas and failovers. In a parallel
effort, we reached out to key developers to correct the flaw in the database application
layer library.
Within an hour of the original decision, all access was fully restored, and all services
were able to connect once again. The broad impact of this test motivated a rapid and
thorough fix to the libraries and a plan for periodic retesting to prevent such a major
flaw from recurring.
152 | Chapter 13: Emergency Response

-- 178 of 550 --

Findings
What went well
Dependent services that were affected by the incident immediately escalated the
issues within the company. We assumed, correctly, that our controlled experiment
had gotten out of hand and immediately aborted the test.
We were able to fully restore permissions within an hour of the first report, at which
time systems started behaving properly. Some teams took a different approach and
reconfigured their systems to avoid the test database. These parallel efforts helped to
restore service as quickly as possible.
Follow-up action items were resolved quickly and thoroughly to avoid a similar out‐
age, and we instituted periodic testing to ensure that similar flaws do not recur.
What we learned
Although this test was thoroughly reviewed and thought to be well scoped, reality
revealed we had an insufficient understanding of this particular interaction among
the dependent systems.
We failed to follow the incident response process, which had been put in place only a
few weeks before and hadn’t been thoroughly disseminated. This process would have
ensured that all services and customers were aware of the outage. To avoid similar
scenarios in the future, SRE continually refines and tests our incident response tools
and processes, in addition to making sure that updates to our incident management
procedures are clearly communicated to all relevant parties.
Because we hadn’t tested our rollback procedures in a test environment, these proce‐
dures were flawed, which lengthened the outage. We now require thorough testing of
rollback procedures before such large-scale tests.
Change-Induced Emergency
As you can imagine, Google has a lot of configuration—complex configuration—and
we constantly make changes to that configuration. To prevent breaking our systems
outright, we perform numerous tests on configuration changes to make sure they
don’t result in unexpected and undesired behavior. However, the scale and complexity
of Google’s infrastructure make it impossible to anticipate every dependency or inter‐
action; sometimes configuration changes don’t go entirely according to plan.
The following is one such example.
Change-Induced Emergency | 153

---

## [Sección 106] Chapter 14), make sure that you’re familiar with it and follow that process.

-- 179 of 550 --

Details
A configuration change to the infrastructure that helps protect our services from
abuse was pushed globally on a Friday. This infrastructure interacts with essentially
all of our externally facing systems, and the change triggered a crash-loop bug in
those systems, which caused the entire fleet to begin to crash-loop almost simultane‐
ously. Because Google’s internal infrastructure also depends upon our own services,
many internal applications suddenly became unavailable as well.
Response
Within seconds, monitoring alerts started firing, indicating that certain sites were
down. Some on-call engineers simultaneously experienced what they believed to be a
failure of the corporate network and relocated to dedicated secure rooms (panic
rooms) with backup access to the production environment. They were joined by
additional engineers who were struggling with their corporate access.
Within five minutes of that first configuration push, the engineer responsible for the
push, having become aware of the corporate outage but still unaware of the broader
outage, pushed another configuration change to roll back the first change. At this
point, services began to recover.
Within 10 minutes of the first push, on-call engineers declared an incident and pro‐
ceeded to follow internal procedures for incident response. They began notifying the
rest of the company about the situation. The push engineer informed the on-call
engineers that the outage was likely due to the change that had been pushed and later
rolled back. Nevertheless, some services experienced unrelated bugs or misconfigura‐
tions triggered by the original event and didn’t fully recover for up to an hour.
Findings
What went well
There were several factors at play that prevented this incident from resulting in a
longer-term outage of many of Google’s internal systems.
To begin with, monitoring almost immediately detected and alerted us to the prob‐
lem. However, it should be noted that in this case, our monitoring was less than ideal:
alerts fired repeatedly and constantly, overwhelming the on-calls and spamming reg‐
ular and emergency communication channels.
Once the problem was detected, incident management generally went well and
updates were communicated often and clearly. Our out-of-band communications sys‐
tems kept everyone connected even while some of the more complicated software
stacks were unusable. This experience reminded us why SRE retains highly reliable,
low overhead backup systems, which we use regularly.
154 | Chapter 13: Emergency Response

-- 180 of 550 --

In addition to these out-of-band communications systems, Google has commandline tools and alternative access methods that enable us to perform updates and roll
back changes even when other interfaces are inaccessible. These tools and access
methods worked well during the outage, with the caveat that engineers needed to be
more familiar with the tools and to test them more routinely.
Google’s infrastructure provided yet another layer of protection in that the affected
system rate-limited how quickly it provided full updates to new clients. This behavior
may have throttled the crash-loop and prevented a complete outage, allowing jobs to
remain up long enough to service a few requests in between crashes.
Finally, we should not overlook the element of luck in the quick resolution of this
incident: the push engineer happened to be following real-time communication chan‐
nels—an additional level of diligence that’s not a normal part of the release process.
The push engineer noticed a large number of complaints about corporate access
directly following the push and rolled back the change almost immediately. Had this
swift rollback not occurred, the outage could have lasted considerably longer, becom‐
ing immensely more difficult to troubleshoot.
What we learned
An earlier push of the new feature had involved a thorough canary but didn’t trigger
the same bug, as it had not exercised a very rare and specific configuration keyword
in combination with the new feature. The specific change that triggered this bug
wasn’t considered risky, and therefore followed a less stringent canary process. When
the change was pushed globally, it used the untested keyword/feature combination
that triggered the failure.
Ironically, improvements to canarying and automation were slated to become higher
priority in the following quarter. This incident immediately raised their priority and
reinforced the need for thorough canarying, regardless of the perceived risk.
As one would expect, alerting was vocal during this incident because every location
was essentially offline for a few minutes. This disrupted the real work being per‐
formed by the on-call engineers and made communication among those involved in
the incident more difficult.
Google relies upon our own tools. Much of the software stack that we use for trouble‐
shooting and communicating lies behind jobs that were crash-looping. Had this out‐
age lasted any longer, debugging would have been severely hindered.
Process-Induced Emergency
We have poured a considerable amount of time and energy into the automation that
manages our machine fleet. It’s amazing how many jobs one can start, stop, or retool
Process-Induced Emergency | 155

---

## [Sección 107] Chapter 14), make sure that you’re familiar with it and follow that process.

-- 181 of 550 --

across the fleet with very little effort. Sometimes, the efficiency of our automation can
be a bit frightening when things do not go quite according to plan.
This is one example where moving fast was not such a good thing.
Details
As part of routine automation testing, two consecutive turndown requests for the
same soon-to-be-decommissioned server installation were submitted. In the case of
the second turndown request, a subtle bug in the automation sent all of the machines
in all of these installations globally to the Diskerase queue, where their hard drives
were destined to be wiped; see “Automation: Enabling Failure at Scale” on page 85 for
more details.
Response
Soon after the second turndown request was issued, the on-call engineers received a
page as the first small server installation was taken offline to be decommissioned.
Their investigation determined that the machines had been transferred to the Disker‐
ase queue, so following normal procedure, the on-call engineers drained traffic from
the location. Because the machines in that location had been wiped, they were unable
to respond to requests. To avoid failing those requests outright, on-call engineers
drained traffic away from that location. Traffic was redirected to locations that could
properly respond to the requests.
Before long, pagers everywhere were firing for all such server installations around the
world. In response, the on-call engineers disabled all team automation in order to
prevent further damage. They stopped or froze additional automation and produc‐
tion maintenance shortly thereafter.
Within an hour, all traffic had been diverted to other locations. Although users may
have experienced elevated latencies, their requests were fulfilled. The outage was offi‐
cially over.
Now the hard part began: recovery. Some network links were reporting heavy conges‐
tion, so network engineers implemented mitigations as choke points surfaced. A
server installation in one such location was chosen to be the first of many to rise from
the ashes. Within three hours of the initial outage, and thanks to the tenacity of sev‐
eral engineers, the installation was rebuilt and brought back online, happily accepting
user requests once again.
US teams handed off to their European counterparts, and SRE hatched a plan to pri‐
oritize reinstallations using a streamlined but manual process. The team was divided
into three parts, with each part responsible for one step in the manual reinstall pro‐
cess. Within three days, the vast majority of capacity was back online, while any strag‐
glers would be recovered over the next month or two.
156 | Chapter 13: Emergency Response

-- 182 of 550 --

1 BIOS: Basic Input/Output System. BIOS is the software built into a computer to send simple instructions to
the hardware, allowing input and output before the operating system has been loaded.
Findings
What went well
Reverse proxies in large server installations are managed very differently than reverse
proxies in these small installations, so large installations were not impacted. On-call
engineers were able to quickly move traffic from smaller installations to large installa‐
tions. By design, these large installations can handle a full load without difficulty.
However, some network links became congested, and therefore required network
engineers to develop workarounds. In order to reduce the impact on end users, oncall engineers targeted congested networks as their highest priority.
The turndown process for the small installations worked efficiently and well. From
start to finish, it took less than an hour to successfully turn down and securely wipe a
large number of these installations.
Although turndown automation quickly tore down monitoring for the small installa‐
tions, on-call engineers were able to promptly revert those monitoring changes.
Doing so helped them to assess the extent of the damage.
The engineers quickly followed incident response protocols, which had matured con‐
siderably in the year since the first outage described in this chapter. Communication
and collaboration throughout the company and across teams was superb—a real tes‐
tament to the incident management program and training. All hands within the
respective teams chipped in, bringing their vast experience to bear.
What we learned
The root cause was that the turndown automation server lacked the appropriate san‐
ity checks on the commands it sent. When the server ran again in response to the
initial failed turndown, it received an empty response for the machine rack. Instead
of filtering the response, it passed the empty filter to the machine database, telling the
machine database to Diskerase all machines involved. Yes, sometimes zero does mean
all. The machine database complied, so the turndown workflow started churning
through the machines as quickly as possible.
Reinstallations of machines were slow and unreliable. This behavior was due in large
part to the use of the Trivial File Transfer Protocol (TFTP) at the lowest network
Quality of Service (QoS) from the distant locations. The BIOS for each machine in
the system dealt poorly with the failures.1 Depending on the network cards involved,
the BIOS either halted or went into a constant reboot cycle. They were failing to
transfer the boot files on each cycle and were further taxing the installers. On-call
Process-Induced Emergency | 157

---

## [Sección 108] Chapter 14), make sure that you’re familiar with it and follow that process.

-- 183 of 550 --

engineers were able to fix these reinstall problems by reclassifying installation traffic
at slightly higher priority and using automation to restart any machines that were
stuck.
The machine reinstallation infrastructure was unable to handle the simultaneous
setup of thousands of machines. This inability was partly due to a regression that pre‐
vented the infrastructure from running more than two setup tasks per worker
machine. The regression also used improper QoS settings to transfer files and had
poorly tuned timeouts. It forced kernel reinstallation, even on machines that still had
the proper kernel and on which Diskerase had yet to occur. To remedy this situation,
on-call engineers escalated to parties responsible for this infrastructure who were able
to quickly retune it to support this unusual load.
All Problems Have Solutions
Time and experience have shown that systems will not only break, but will break in
ways that one could never previously imagine. One of the greatest lessons Google has
learned is that a solution exists, even if it may not be obvious, especially to the person
whose pager is screaming. If you can’t think of a solution, cast your net farther.
Involve more of your teammates, seek help, do whatever you have to do, but do it
quickly. The highest priority is to resolve the issue at hand quickly. Oftentimes, the
person with the most state is the one whose actions somehow triggered the event.
Utilize that person.
Very importantly, once the emergency has been mitigated, do not forget to set aside
time to clean up, write up the incident, and to…
Learn from the Past. Don’t Repeat It.
Keep a History of Outages
There is no better way to learn than to document what has broken in the past. His‐
tory is about learning from everyone’s mistakes. Be thorough, be honest, but most of
all, ask hard questions. Look for specific actions that might prevent such an outage
from recurring, not just tactically, but also strategically. Ensure that everyone within
the company can learn what you have learned by publishing and organizing
postmortems.
Hold yourself and others accountable to following up on the specific actions detailed
in these postmortems. Doing so will prevent a future outage that’s nearly identical to,
and caused by nearly the same triggers as, an outage that has already been docu‐
mented. Once you have a solid track record for learning from past outages, see what
you can do to prevent future ones.
158 | Chapter 13: Emergency Response

-- 184 of 550 --

Ask the Big, Even Improbable, Questions: What If…?
There is no greater test than reality. Ask yourself some big, open-ended questions.
What if the building power fails…? What if the network equipment racks are stand‐
ing in two feet of water…? What if the primary datacenter suddenly goes dark…?
What if someone compromises your web server…? What do you do? Who do you
call? Who will write the check? Do you have a plan? Do you know how to react? Do
you know how your systems will react? Could you minimize the impact if it were to
happen now? Could the person sitting next to you do the same?
Encourage Proactive Testing
When it comes to failures, theory and reality are two very different realms. Until your
system has actually failed, you don’t truly know how that system, its dependent sys‐
tems, or your users will react. Don’t rely on assumptions or what you can’t or haven’t
tested. Would you prefer that a failure happen at 2 a.m. Saturday morning when most
of the company is still away on a team-building offsite in the Black Forest—or when
you have your best and brightest close at hand, monitoring the test that they
painstakingly reviewed in the previous weeks?
Conclusion
We’ve reviewed three different cases where parts of our systems broke. Although all
three emergencies were triggered differently—one by a proactive test, another by a
configuration change, and yet another by turndown automation—the responses
shared many characteristics. The responders didn’t panic. They pulled in others when
they thought it necessary. The responders studied and learned from earlier outages.
Subsequently, they built their systems to better respond to those types of outages.
Each time new failure modes presented themselves, responders documented those
failure modes. This follow-up helped other teams learn how to better troubleshoot
and fortify their systems against similar outages. Responders proactively tested their
systems. Such testing ensured that the changes fixed the underlying problems, and
identified other weaknesses before they became outages.
And as our systems evolve the cycle continues, with each outage or test resulting in
incremental improvements to both processes and systems. While the case studies in
this chapter are specific to Google, this approach to emergency response can be
applied over time to any organization of any size.
Conclusion | 159

---

## [Sección 109] Chapter 14), make sure that you’re familiar with it and follow that process.

-- 185 of 550 --

-- 186 of 550 --

1 An earlier version of this chapter appeared as an article in ;login: (April 2015, vol. 40, no. 2).

---

## [Sección 110] CHAPTER 14

Managing Incidents
Written by Andrew Stribblehill1
Edited by Kavita Guliani
Effective incident management is key to limiting the disruption caused by an incident
and restoring normal business operations as quickly as possible. If you haven’t gamed
out your response to potential incidents in advance, principled incident management
can go out the window in real-life situations.
This chapter walks through a portrait of an incident that spirals out of control due to
ad hoc incident management practices, outlines a well-managed approach to the inci‐
dent, and reviews how the same incident might have played out if handled with wellfunctioning incident management.
Unmanaged Incidents
Put yourself in the shoes of Mary, the on-call engineer for The Firm. It’s 2 p.m. on a
Friday afternoon and your pager has just exploded. Black-box monitoring tells you
that your service has stopped serving any traffic in an entire datacenter. With a sigh,
you put down your coffee and set about the job of fixing it. A few minutes into the
task, another alert tells you that a second datacenter has stopped serving. Then the
third out of your five datacenters fails. To exacerbate the situation, there is more traf‐
fic than the remaining datacenters can handle, so they start to overload. Before you
know it, the service is overloaded and unable to serve any requests.
You stare at the logs for what seems like an eternity. Thousands of lines of logging
suggest there’s an error in one of the recently updated modules, so you decide to
-- 187 of 550 --

revert the servers to the previous release. When you see that the rollback hasn’t hel‐
ped, you call Josephine, who wrote most of the code for the now-hemorrhaging ser‐
vice. Reminding you that it’s 3:30 a.m. in her time zone, she blearily agrees to log in
and take a look. Your colleagues Sabrina and Robin start poking around from their
own terminals. “Just looking,” they tell you.
Now one of the suits has phoned your boss and is angrily demanding to know why he
wasn’t informed about the “total meltdown of this business-critical service.” Inde‐
pendently, the vice presidents are nagging you for an ETA, repeatedly asking you,
“How could this possibly have happened?” You would sympathize, but doing so
would require cognitive effort that you are holding in reserve for your job. The VPs
call on their prior engineering experience and make irrelevant but hard-to-refute
comments like, “Increase the page size!”
Time passes; the two remaining datacenters fail completely. Unbeknown to you,
sleep-addled Josephine called Malcolm. He had a brainwave: something about CPU
affinity. He felt certain that he could optimize the remaining server processes if he
could just deploy this one simple change to the production environment, so he did so.
Within seconds, the servers restarted, picking up the change. And then died.
The Anatomy of an Unmanaged Incident
Note that everybody in the preceding scenario was doing their job, as they saw it.
How could things go so wrong? A few common hazards caused this incident to spiral
out of control.
Sharp Focus on the Technical Problem
We tend to hire people like Mary for their technical prowess. So it’s not surprising
that she was busy making operational changes to the system, trying valiantly to solve
the problem. She wasn’t in a position to think about the bigger picture of how to miti‐
gate the problem because the technical task at hand was overwhelming.
Poor Communication
For the same reason, Mary was far too busy to communicate clearly. Nobody knew
what actions their coworkers were taking. Business leaders were angry, customers
were frustrated, and other engineers who could have lent a hand in debugging or fix‐
ing the issue weren’t used effectively.
Freelancing
Malcolm was making changes to the system with the best of intentions. However, he
didn’t coordinate with his coworkers—not even Mary, who was technically in charge
of troubleshooting. His changes made a bad situation far worse.
162 | Chapter 14: Managing Incidents

---

## [Sección 111] CHAPTER 14

-- 188 of 550 --

2 See http://www.fema.gov/national-incident-management-system for further details.
Elements of Incident Management Process
Incident management skills and practices exist to channel the energies of enthusiastic
individuals. Google’s incident management system is based on the Incident Com‐
mand System,2 which is known for its clarity and scalability.
A well-designed incident management process has the following features.
Recursive Separation of Responsibilities
It’s important to make sure that everybody involved in the incident knows their role
and doesn’t stray onto someone else’s turf. Somewhat counterintuitively, a clear sepa‐
ration of responsibilities allows individuals more autonomy than they might other‐
wise have, since they need not second-guess their colleagues.
If the load on a given member becomes excessive, that person needs to ask the plan‐
ning lead for more staff. They should then delegate work to others, a task that might
entail creating subincidents. Alternatively, a role leader might delegate system compo‐
nents to colleagues, who report high-level information back up to the leaders.
Several distinct roles should be delegated to particular individuals:
Incident Command
The incident commander holds the high-level state about the incident. They
structure the incident response task force, assigning responsibilities according to
need and priority. De facto, the commander holds all positions that they have not
delegated. If appropriate, they can remove roadblocks that prevent Ops from
working most effectively.
Operational Work
The Ops lead works with the incident commander to respond to the incident by
applying operational tools to the task at hand. The operations team should be the
only group modifying the system during an incident.
Communication
This person is the public face of the incident response task force. Their duties
most definitely include issuing periodic updates to the incident response team
and stakeholders (usually via email), and may extend to tasks such as keeping the
incident document accurate and up to date.
Elements of Incident Management Process | 163

-- 189 of 550 --

Planning
The planning role supports Ops by dealing with longer-term issues, such as filing
bugs, ordering dinner, arranging handoffs, and tracking how the system has
diverged from the norm so it can be reverted once the incident is resolved.
A Recognized Command Post
Interested parties need to understand where they can interact with the incident
commander. In many situations, locating the incident task force members into a cen‐
tral designated “War Room” is appropriate. Others teams may prefer to work at their
desks, keeping alert to incident updates via email and IRC.
Google has found IRC to be a huge boon in incident response. IRC is very reliable
and can be used as a log of communications about this event, and such a record is
invaluable in keeping detailed state changes in mind. We’ve also written bots that log
incident-related traffic (which is helpful for postmortem analysis), and other bots that
log events such as alerts to the channel. IRC is also a convenient medium over which
geographically distributed teams can coordinate.
Live Incident State Document
The incident commander’s most important responsibility is to keep a living incident
document. This can live in a wiki, but should ideally be editable by several people
concurrently. Most of our teams use Google Docs, though Google Docs SRE use Goo‐
gle Sites: after all, depending on the software you are trying to fix as part of your inci‐
dent management system is unlikely to end well.
See Appendix C for a sample incident document. This living doc can be messy, but
must be functional. Using a template makes generating this documentation easier,
and keeping the most important information at the top makes it more usable.Retain
this documentation for postmortem analysis and, if necessary, meta analysis.
Clear, Live Handoff
It’s essential that the post of incident commander be clearly handed off at the end of
the working day. If you’re handing off command to someone at another location, you
can simply and safely update the new incident commander over the phone or a video
call. Once the new incident commander is fully apprised, the outgoing commander
should be explicit in their handoff, specifically stating, “You’re now the incident
commander, okay?”, and should not leave the call until receiving firm acknowledg‐
ment of handoff. The handoff should be communicated to others working on the
incident so that it’s clear who is leading the incident management efforts at all times.
164 | Chapter 14: Managing Incidents

---

## [Sección 112] CHAPTER 14

-- 190 of 550 --

A Managed Incident
Now let’s examine how this incident might have played out if it were handled using
principles of incident management.
It’s 2 p.m., and Mary is into her third coffee of the day. The pager’s harsh tone sur‐
prises her, and she gulps the drink down. Problem: a datacenter has stopped serving
traffic. She starts to investigate. Shortly another alert fires, and the second datacenter
out of five is out of order. Because this is a rapidly growing issue, she knows that she’ll
benefit from the structure of her incident management framework.
Mary snags Sabrina. “Can you take command?” Nodding her agreement, Sabrina
quickly gets a rundown of what’s occurred thus far from Mary. She captures these
details in an email that she sends to a prearranged mailing list. Sabrina recognizes
that she can’t yet scope the impact of the incident, so she asks for Mary’s assessment.
Mary responds, “Users have yet to be impacted; let’s just hope we don’t lose a third
datacenter.” Sabrina records Mary’s response in a live incident document.
When the third alert fires, Sabrina sees the alert among the debugging chatter on IRC
and quickly follows up to the email thread with an update. The thread keeps VPs
abreast of the high-level status without bogging them down in minutiae. Sabrina asks
an external communications representative to start drafting user messaging. She then
follows up with Mary to see if they should contact the developer on-call (currently
Josephine). Receiving Mary’s approval, Sabrina loops in Josephine.
By the time Josephine logs in, Robin has already volunteered to help out. Sabrina
reminds both Robin and Josephine that they are to prioritize any tasks delegated to
them by Mary, and that they must keep Mary informed of any additional actions they
take. Robin and Josephine quickly familiarize themselves with the current situation
by reading the incident document.
By now, Mary has tried the old binary release and found it wanting: she mutters this
to Robin, who updates IRC to say that this attempted fix didn’t work. Sabrina pastes
this update into the live incident management document.
At 5 p.m., Sabrina starts finding replacement staff to take on the incident, as she and
her colleagues are about to go home. She updates the incident document. A brief
phone conference takes place at 5:45 so everyone is aware of the current situation. At
6 p.m., they hand off their responsibilities to their colleagues in the sister office.
Mary returns to work the following morning to find that her transatlantic colleagues
have assumed responsibility for the bug, mitigated the problem, closed the incident,
and started work on the postmortem. Problem solved, she brews some fresh coffee
and settles down to plan structural improvements so problems of this category don’t
afflict the team again.
A Managed Incident | 165

-- 191 of 550 --

When to Declare an Incident
It is better to declare an incident early and then find a simple fix and close out the
incident than to have to spin up the incident management framework hours into a
burgeoning problem. Set clear conditions for declaring an incident. My team follows
these broad guidelines—if any of the following is true, the event is an incident:
• Do you need to involve a second team in fixing the problem?
• Is the outage visible to customers?
• Is the issue unsolved even after an hour’s concentrated analysis?
Incident management proficiency atrophies quickly when it’s not in constant use. So
how can engineers keep their incident management skills up to date—handle more
incidents? Fortunately, the incident management framework can apply to other
operational changes that need to span time zones and/or teams. If you use the frame‐
work frequently as a regular part of your change management procedures, you can
easily follow this framework when an actual incident occurs. If your organization
performs disaster-recovery testing (you should, it’s fun: see [Kri12]), incident man‐
agement should be part of that testing process. We often role-play the response to an
on-call issue that has already been solved, perhaps by colleagues in another location,
to further familiarize ourselves with incident management.
In Summary
We’ve found that by formulating an incident management strategy in advance, struc‐
turing this plan to scale smoothly, and regularly putting the plan to use, we were able
to reduce our mean time to recovery and provide staff a less stressful way to work on
emergent problems. Any organization concerned with reliability would benefit from
pursuing a similar strategy.
166 | Chapter 14: Managing Incidents

---

## [Sección 113] CHAPTER 14

-- 192 of 550 --

Best Practices for Incident Management
Prioritize. Stop the bleeding, restore service, and preserve the evidence for rootcausing.
Prepare. Develop and document your incident management procedures in advance,
in consultation with incident participants.
Trust. Give full autonomy within the assigned role to all incident participants.
Introspect. Pay attention to your emotional state while responding to an incident. If
you start to feel panicky or overwhelmed, solicit more support.
Consider alternatives. Periodically consider your options and re-evaluate whether it
still makes sense to continue what you’re doing or whether you should be taking
another tack in incident response.
Practice. Use the process routinely so it becomes second nature.
Change it around. Were you incident commander last time? Take on a different role
this time. Encourage every team member to acquire familiarity with each role.
In Summary | 167

-- 193 of 550 --

-- 194 of 550 --

---

## [Sección 114] CHAPTER 15

Postmortem Culture: Learning from Failure
Written by John Lunney and Sue Lueder
Edited by Gary O’ Connor
The cost of failure is education.
—Devin Carraway
As SREs, we work with large-scale, complex, distributed systems. We constantly
enhance our services with new features and add new systems. Incidents and outages
are inevitable given our scale and velocity of change. When an incident occurs, we fix
the underlying issue, and services return to their normal operating conditions. Unless
we have some formalized process of learning from these incidents in place, they may
recur ad infinitum. Left unchecked, incidents can multiply in complexity or even cas‐
cade, overwhelming a system and its operators and ultimately impacting our users.
Therefore, postmortems are an essential tool for SRE.
The postmortem concept is well known in the technology industry [All12]. A post‐
mortem is a written record of an incident, its impact, the actions taken to mitigate or
resolve it, the root cause(s), and the follow-up actions to prevent the incident from
recurring. This chapter describes criteria for deciding when to conduct postmortems,
some best practices around postmortems, and advice on how to cultivate a postmor‐
tem culture based on the experience we’ve gained over the years.
Google’s Postmortem Philosophy
The primary goals of writing a postmortem are to ensure that the incident is docu‐
mented, that all contributing root cause(s) are well understood, and, especially, that
effective preventive actions are put in place to reduce the likelihood and/or impact of
recurrence. A detailed survey of root-cause analysis techniques is beyond the scope of
this chapter (instead, see [Roo04]); however, articles, best practices, and tools abound
-- 195 of 550 --

in the system quality domain. Our teams use a variety of techniques for root-cause
analysis and choose the technique best suited to their services. Postmortems are
expected after any significant undesirable event. Writing a postmortem is not punish‐
ment—it is a learning opportunity for the entire company. The postmortem process
does present an inherent cost in terms of time or effort, so we are deliberate in choos‐
ing when to write one. Teams have some internal flexibility, but common postmor‐
tem triggers include:
• User-visible downtime or degradation beyond a certain threshold
• Data loss of any kind
• On-call engineer intervention (release rollback, rerouting of traffic, etc.)
• A resolution time above some threshold
• A monitoring failure (which usually implies manual incident discovery)
It is important to define postmortem criteria before an incident occurs so that every‐
one knows when a postmortem is necessary. In addition to these objective triggers,
any stakeholder may request a postmortem for an event.
Blameless postmortems are a tenet of SRE culture. For a postmortem to be truly
blameless, it must focus on identifying the contributing causes of the incident without
indicting any individual or team for bad or inappropriate behavior. A blamelessly
written postmortem assumes that everyone involved in an incident had good inten‐
tions and did the right thing with the information they had. If a culture of finger
pointing and shaming individuals or teams for doing the “wrong” thing prevails, peo‐
ple will not bring issues to light for fear of punishment.
Blameless culture originated in the healthcare and avionics industries where mistakes
can be fatal. These industries nurture an environment where every “mistake” is seen
as an opportunity to strengthen the system. When postmortems shift from allocating
blame to investigating the systematic reasons why an individual or team had incom‐
plete or incorrect information, effective prevention plans can be put in place. You
can’t “fix” people, but you can fix systems and processes to better support people
making the right choices when designing and maintaining complex systems.
When an outage does occur, a postmortem is not written as a formality to be forgot‐
ten. Instead the postmortem is seen by engineers as an opportunity not only to fix a
weakness, but to make Google more resilient as a whole. While a blameless postmor‐
tem doesn’t simply vent frustration by pointing fingers, it should call out where and
how services can be improved. Here are two examples:
170 | Chapter 15: Postmortem Culture: Learning from Failure

---

## [Sección 115] CHAPTER 15

-- 196 of 550 --

Pointing fingers
“We need to rewrite the entire complicated backend system! It’s been breaking
weekly for the last three quarters and I’m sure we’re all tired of fixing things
onesy-twosy. Seriously, if I get paged one more time I’ll rewrite it myself…”
Blameless
“An action item to rewrite the entire backend system might actually prevent these
annoying pages from continuing to happen, and the maintenance manual for this
version is quite long and really difficult to be fully trained up on. I’m sure our
future on-callers will thank us!”
Best Practice: Avoid Blame and Keep It Constructive
Blameless postmortems can be challenging to write, because the postmortem format
clearly identifies the actions that led to the incident. Removing blame from a post‐
mortem gives people the confidence to escalate issues without fear. It is also impor‐
tant not to stigmatize frequent production of postmortems by a person or team. An
atmosphere of blame risks creating a culture in which incidents and issues are swept
under the rug, leading to greater risk for the organization [Boy13].
Collaborate and Share Knowledge
We value collaboration, and the postmortem process is no exception. The postmor‐
tem workflow includes collaboration and knowledge-sharing at every stage.
Our postmortem documents are Google Docs, with an in-house template (see Appen‐
dix D). Regardless of the specific tool you use, look for the following key features:
Real-time collaboration
Enables the rapid collection of data and ideas. Essential during the early creation
of a postmortem.
An open commenting/annotation system
Makes crowdsourcing solutions easy and improves coverage.
Email notifications
Can be directed at collaborators within the document or used to loop in others to
provide input.
Writing a postmortem also involves formal review and publication. In practice, teams
share the first postmortem draft internally and solicit a group of senior engineers to
assess the draft for completeness. Review criteria might include:
Collaborate and Share Knowledge | 171

-- 197 of 550 --

1 See http://www.google.com/policies/privacy/.
2 If you’d like to start your own repository, Etsy has released Morgue, a tool for managing postmortems.
• Was key incident data collected for posterity?
• Are the impact assessments complete?
• Was the root cause sufficiently deep?
• Is the action plan appropriate and are resulting bug fixes at appropriate priority?
• Did we share the outcome with relevant stakeholders?
Once the initial review is complete, the postmortem is shared more broadly, typically
with the larger engineering team or on an internal mailing list. Our goal is to share
postmortems to the widest possible audience that would benefit from the knowledge
or lessons imparted. Google has stringent rules around access to any piece of infor‐
mation that might identify a user,1 and even internal documents like postmortems
never include such information.
Best Practice: No Postmortem Left Unreviewed
An unreviewed postmortem might as well never have existed. To ensure that each
completed draft is reviewed, we encourage regular review sessions for postmortems.
In these meetings, it is important to close out any ongoing discussions and com‐
ments, to capture ideas, and to finalize the state.
Once those involved are satisfied with the document and its action items, the post‐
mortem is added to a team or organization repository of past incidents.2 Transparent
sharing makes it easier for others to find and learn from the postmortem.
Introducing a Postmortem Culture
Introducing a postmortem culture to your organization is easier said than done; such
an effort requires continuous cultivation and reinforcement. We reinforce a collabo‐
rative postmortem culture through senior management’s active participation in the
review and collaboration process. Management can encourage this culture, but
blameless postmortems are ideally the product of engineer self-motivation. In the spi‐
rit of nurturing the postmortem culture, SREs proactively create activities that dis‐
seminate what we learn about system infrastructure. Some example activities include:
Postmortem of the month
In a monthly newsletter, an interesting and well-written postmortem is shared
with the entire organization.
172 | Chapter 15: Postmortem Culture: Learning from Failure

---

## [Sección 1

---
> *[Truncated at 420 KB for optimal local RAG indexing speed]*
